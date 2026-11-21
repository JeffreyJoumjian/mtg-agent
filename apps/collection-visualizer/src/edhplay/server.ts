// Server only — see lib/server/README.md. Loads everything the EDHPlay extension recorded and runs
// the repo-root game library over it. Every page and the extension's live endpoint go through here.
import { resolveNames } from "@mtg/card-cache.ts";
import { listDeckSlugs, readDeck } from "@mtg/deck-store.ts";
import { rolesFor } from "@mtg/card-roles.ts";
import { findCombos, type ComboResult } from "@mtg/spellbook.ts";
import type { ParsedGame } from "@mtg/edhplay-parse.ts";
import {
  buildRecords,
  deckCards,
  deckPerformance,
  dossierFor,
  fillTypeLines,
  meta,
  overview,
  playerSummaries,
  revealedCards,
  type CardInfo,
  type GameRecord,
  type LocalListRef,
} from "@mtg/edhplay-games.ts";
import {
  EDHPLAY_DIR,
  listCaptures,
  listDeckSnapshots,
  listMatches,
  listRoomSnapshots,
  listSnapshotDeckIds,
  loadParsedGames,
  readLog,
  readPlayerNotes,
  readProfile,
  type CaptureKind,
  type LogLine,
} from "@mtg/edhplay-store.ts";

export interface LoadedGames {
  records: GameRecord[];
  parsed: Record<string, ParsedGame>;
  lists: LocalListRef[];
  me?: string;
}

/** Every local list that is pushed to EDHPlay, with its current cards. */
async function loadLists(): Promise<LocalListRef[]> {
  const slugs = await listDeckSlugs();
  const out: LocalListRef[] = [];
  for (const slug of slugs) {
    try {
      const deck = await readDeck(slug);
      for (const [listId, list] of Object.entries(deck.lists)) {
        if (!list.edhplay) {
          continue;
        }
        out.push({
          slug,
          deckName: deck.name,
          listId,
          label: list.label,
          edhplayId: list.edhplay,
          cards: list.sections.flatMap((s) => s.cards.map((c) => c.name)),
        });
      }
    } catch {
      // A broken deck.json is the deck page's problem to report; the game views skip it.
    }
  }
  return out;
}

/** Real games or playtests, never both: a playtest must not reach a real-game number. Playtests
 *  are never linked to EDHPlay matches either. */
export async function loadGames(kind: CaptureKind = "games"): Promise<LoadedGames> {
  const [captures, matches, profile, lists] = await Promise.all([
    loadParsedGames(kind),
    listMatches(),
    readProfile(),
    loadLists(),
  ]);
  const filled = kind === "playtests" ? await withTypeLines(captures) : captures;
  const { records, parsed } = buildRecords({
    captures: filled,
    matches: kind === "games" ? matches.map((m) => m.match) : [],
    me: profile?.username,
    lists,
  });
  return { records, parsed, lists, me: profile?.username };
}

/** Playtests know card names but not types; the card cache fills them so land drops count. */
async function withTypeLines<T extends { games: ParsedGame[] }>(captures: T[]): Promise<T[]> {
  const names = captures.flatMap((c) =>
    c.games.flatMap((g) =>
      g.players.flatMap((p) =>
        Object.values(p.cards)
          .filter((card) => !card.typeLine)
          .map((card) => card.name),
      ),
    ),
  );
  const info = await cardInfoFor(names);
  const typeLines: Record<string, string> = {};
  for (const [name, i] of Object.entries(info)) {
    typeLines[name] = i.typeLine;
  }
  return captures.map((c) => ({ ...c, games: c.games.map((g) => fillTypeLines(g, typeLines)) }));
}

/** Roles, colour identity and Game Changer status for card names, from the shared card cache.
 *  Never throws: names Scryfall doesn't know are left out. */
export async function cardInfoFor(names: string[]): Promise<Record<string, CardInfo>> {
  const unique = [...new Set(names.filter(Boolean))];
  if (unique.length === 0) {
    return {};
  }

  try {
    const { found } = await resolveNames(unique);
    const out: Record<string, CardInfo> = {};
    for (const [name, card] of Object.entries(found)) {
      out[name] = {
        roles: rolesFor({
          typeLine: card.typeLine,
          oracleText: card.oracleText || card.faces.map((f) => f.oracleText).join("\n"),
          producedMana: card.producedMana,
        }),
        colorIdentity: card.colorIdentity,
        typeLine: card.typeLine,
        cmc: card.cmc,
        gameChanger: card.gameChanger,
      };
    }
    return out;
  } catch (err) {
    console.error("[edhplay] card resolution failed:", err instanceof Error ? err.message : String(err));
    return {};
  }
}

export async function getOverview(kind: CaptureKind) {
  const { records, lists, me } = await loadGames(kind);
  const captures = await listCaptures(kind);
  const last = captures[captures.length - 1];
  return {
    overview: overview(records),
    records,
    me,
    linkedLists: lists.length,
    dataDir: EDHPLAY_DIR,
    lastCaptureAt: last ? last.updatedAt : null,
    captureCount: captures.length,
  };
}

export interface OpponentDeckView {
  deckId: string;
  fetchedAt: number;
  name: string;
  commanders: string[];
  cards: { name: string; quantity: number; roles: string[]; playedInGame: boolean }[];
  roleCounts: Record<string, number>;
  bracket?: number;
  combos: ComboResult & { error?: string };
}

/** The latest snapshot of an EDHPlay deck, with roles and the combos the list contains. */
export async function deckView(deckId: string, playedNames: string[] = []): Promise<OpponentDeckView | null> {
  const snaps = await listDeckSnapshots(deckId);
  const latest = snaps[snaps.length - 1];
  if (!latest) {
    return null;
  }

  const parsedDeck = deckCards(latest.deck);
  const info = await cardInfoFor([...parsedDeck.commanders, ...parsedDeck.main.map((c) => c.name)]);
  const roleCounts: Record<string, number> = {};
  const cards = parsedDeck.main.map((c) => {
    const roles = info[c.name]?.roles ?? [];
    for (const r of roles) {
      roleCounts[r] = (roleCounts[r] ?? 0) + c.quantity;
    }
    return { name: c.name, quantity: c.quantity, roles, playedInGame: playedNames.includes(c.name) };
  });
  const combos = await findCombos(
    parsedDeck.commanders,
    parsedDeck.main.map((c) => c.name),
  );
  return {
    deckId,
    fetchedAt: latest.fetchedAt,
    name: parsedDeck.name,
    commanders: parsedDeck.commanders,
    cards,
    roleCounts,
    bracket: parsedDeck.bracket,
    combos: { included: combos.included, almostIncluded: [], error: combos.error },
  };
}

export async function getGame(id: string, kind: CaptureKind) {
  const { records, parsed } = await loadGames(kind);
  const record = records.find((r) => r.id === id);
  if (!record) {
    return null;
  }

  const game = record.gameId ? parsed[record.gameId] : undefined;
  const rawLog: LogLine[] = [];
  for (const captureId of record.captureIds ?? (record.captureId ? [record.captureId] : [])) {
    const lines = await readLog(captureId, kind);
    rawLog.push(...lines);
  }
  // The page only needs the text and the zones; metadata is untyped JSON and can't cross the RPC.
  const log = rawLog.map((l) => ({
    id: l.id,
    playerId: l.playerId,
    message: l.message,
    timestamp: l.timestamp,
    channel: l.channel,
    cardName: l.cardName,
    from: typeof l.metadata?.from_zone === "string" ? l.metadata.from_zone : undefined,
    to: typeof l.metadata?.to_zone === "string" ? l.metadata.to_zone : undefined,
  }));
  const names = game ? game.players.flatMap((p) => Object.keys(p.cards)) : [];
  const info = await cardInfoFor(names);

  const combos: Record<string, ComboResult & { error?: string }> = {};
  for (const p of game?.players ?? []) {
    const r = revealedCards(p);
    combos[p.playerId] = await findCombos(r.commanders, r.main);
  }

  // Decklists are shown only after the game: a game still being played gets none, even when an
  // earlier match already saved a snapshot of an opponent's deck.
  const decks: Record<string, OpponentDeckView | null> = {};
  for (const p of record.inProgress ? [] : record.players) {
    if (!p.deckId || decks[p.deckId] !== undefined) {
      continue;
    }
    const gp = game?.players.find((x) => x.username.toLowerCase() === p.username.toLowerCase());
    decks[p.deckId] = await deckView(p.deckId, Object.keys(gp?.cards ?? {}));
  }

  const roles: Record<string, string[]> = {};
  for (const [name, i] of Object.entries(info)) {
    roles[name] = i.roles;
  }
  return { record, game: game ?? null, log, combos, decks, roles };
}

export async function getMeta(includeSpectated: boolean) {
  const { records, parsed } = await loadGames();
  const names: string[] = [];
  for (const g of Object.values(parsed)) {
    for (const p of g.players) {
      names.push(...Object.keys(p.cards), ...p.commanders.map((c) => c.name));
    }
  }
  for (const r of records) {
    for (const p of r.players) {
      names.push(...p.commanders.map((c) => c.name));
    }
  }

  const info = await cardInfoFor(names);
  const m = meta(records, parsed, info, { includeSpectated });

  // Combos assembled on the table: every combo whose pieces one opponent showed in one game.
  const combosSeen: Record<string, { combo: ComboResult["included"][number]; games: number; players: string[] }> = {};
  const scoped = records
    .filter((r) => r.mode === "player" || (includeSpectated && r.mode === "spectator"))
    .slice(0, 60);
  for (const r of scoped) {
    const game = r.gameId ? parsed[r.gameId] : undefined;
    for (const p of game?.players ?? []) {
      if (p.isMe) continue;
      const rc = revealedCards(p);
      const found = await findCombos(rc.commanders, rc.main);
      for (const c of found.included) {
        const row = (combosSeen[c.id] ??= { combo: c, games: 0, players: [] });
        row.games += 1;
        if (!row.players.includes(p.username)) row.players.push(p.username);
      }
    }
  }

  const rooms = await listRoomSnapshots();
  const roomBrackets: Record<string, number> = {};
  const latestRooms = rooms.slice(-50);
  for (const snap of latestRooms) {
    for (const room of snap.rooms) {
      if (typeof room !== "object" || room === null || !("name" in room)) continue;
      const name = typeof room.name === "string" ? room.name : "";
      const b = /\b(?:b|br|bracket)\s?([1-5])\b/i.exec(name)?.[1] ?? (/cedh/i.test(name) ? "5" : "unlabelled");
      roomBrackets[b] = (roomBrackets[b] ?? 0) + 1;
    }
  }

  return {
    meta: m,
    combosSeen: Object.values(combosSeen).sort((a, b) => b.games - a.games),
    lobby: { snapshots: rooms.length, roomBrackets },
  };
}

export async function getPlayers() {
  const { records, parsed } = await loadGames();
  const notes = await readPlayerNotes();
  return { players: playerSummaries(records, parsed), notes };
}

export async function getPlayer(username: string) {
  const { records, parsed } = await loadGames();
  const summary = playerSummaries(records, parsed).find((s) => s.username.toLowerCase() === username.toLowerCase());
  if (!summary) {
    return null;
  }

  const notes = await readPlayerNotes();
  const games = records.filter((r) =>
    r.players.some((p) => !p.isMe && p.username.toLowerCase() === username.toLowerCase()),
  );
  const decks: OpponentDeckView[] = [];
  for (const d of summary.decks) {
    const view = await deckView(d.deckId);
    if (view) decks.push(view);
  }
  return { summary, games, decks, note: notes[username.toLowerCase()] ?? null };
}

export async function getDeckGames(slug: string, kind: CaptureKind) {
  const { records, parsed, lists } = await loadGames(kind);
  const mine = lists.filter((l) => l.slug === slug);
  const performances = mine.map((list) =>
    deckPerformance(list.edhplayId, records, parsed, list, kind === "games" ? "player" : "solo"),
  );
  const names = performances.flatMap((p) => p.cards.map((c) => c.name));
  const info = await cardInfoFor(names);
  const roles: Record<string, string[]> = {};
  for (const [name, i] of Object.entries(info)) {
    roles[name] = i.roles;
  }
  return { performances, roles };
}

// ---------------------------------------------------------------------------------------------
// The extension's live panel.

export interface LiveRequest {
  /** The capture being played right now, left out of the history so it can't count itself. */
  captureId?: string;
  players: string[];
  revealed: { username: string; commanders: string[]; cards: string[] }[];
}

/** History for the players at the table and combos among the cards they've revealed. Decklists
 *  are never part of this answer: the pilot doesn't want them during a game. */
export async function getLive(req: LiveRequest) {
  const loaded = await loadGames();
  // The game being played (every capture of its sitting) must not count toward its own history.
  const records = loaded.records.filter(
    (r) => !req.captureId || !(r.captureIds ?? [r.captureId]).includes(req.captureId),
  );
  const summaries = playerSummaries(records, loaded.parsed);
  const notes = await readPlayerNotes();
  const dossiers = req.players.map((u) => dossierFor(u, summaries, notes));

  const combos: Record<string, ComboResult & { error?: string }> = {};
  for (const r of req.revealed) {
    combos[r.username] = await findCombos(r.commanders, r.cards);
  }
  return { dossiers, combos };
}

export async function getStatus() {
  const captures = await listCaptures("games");
  const playtests = await listCaptures("playtests");
  const matches = await listMatches();
  const decks = await listSnapshotDeckIds();
  const profile = await readProfile();
  const last = captures[captures.length - 1];
  return {
    ok: true,
    dataDir: EDHPLAY_DIR,
    captures: captures.length,
    playtests: playtests.length,
    matches: matches.length,
    deckSnapshots: decks.length,
    me: profile?.username ?? null,
    lastCaptureAt: last?.updatedAt ?? null,
  };
}
