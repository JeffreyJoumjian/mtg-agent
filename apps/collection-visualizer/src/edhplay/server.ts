// Server only — see lib/server/README.md. Loads everything the EDHPlay extension recorded and runs
// the repo-root game library over it. Every page and the extension's live endpoint go through here.
import { resolveNames } from "@mtg/card-cache.ts";
import { listDeckSlugs, readDeck } from "@mtg/deck-store.ts";
import { commandersOf } from "@mtg/deck-model.ts";
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

/** Combos assembled on the table: every combo whose pieces one opponent showed in one game, with
 *  the records it showed up in. Spellbook answers are cached, so repeat calls are cheap. */
async function combosOnTable(records: GameRecord[], parsed: Record<string, ParsedGame>, includeSpectated: boolean) {
  const seen: Record<string, { combo: ComboResult["included"][number]; games: number; players: string[] }> = {};
  const recordIds: string[] = [];
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
        const row = (seen[c.id] ??= { combo: c, games: 0, players: [] });
        row.games += 1;
        if (!row.players.includes(p.username)) row.players.push(p.username);
        if (!recordIds.includes(r.id)) recordIds.push(r.id);
      }
    }
  }
  return { combos: Object.values(seen).sort((a, b) => b.games - a.games), recordIds };
}

export async function getOverview(kind: CaptureKind) {
  const { records, parsed, lists, me } = await loadGames(kind);
  const captures = await listCaptures(kind);
  const last = captures[captures.length - 1];
  const table = kind === "games" ? await combosOnTable(records, parsed, false) : { combos: [], recordIds: [] };

  // Each deck's commanders, for the deck tiles: the latest game that names them.
  const deckCommanders: Record<string, { name: string; imageUri?: string }[]> = {};
  for (const r of records) {
    for (const p of r.players) {
      const deckId = p.isMe ? r.myDeck?.deckId : kind === "playtests" ? p.deckId : undefined;
      if (deckId && !deckCommanders[deckId] && p.commanders.length > 0) deckCommanders[deckId] = p.commanders;
    }
  }

  // Playtests: each tested deck's lands by round 4 and first commander cast, measured on its seat.
  const testedDecks: {
    deckId: string;
    deckName: string;
    slug?: string;
    listLabel?: string;
    playtests: number;
    landsByRound4: number | null;
    commanderRound: number | null;
  }[] = [];
  if (kind === "playtests") {
    const deckIds = [...new Set(records.flatMap((r) => r.players.map((p) => p.deckId).filter((d): d is string => !!d)))];
    for (const deckId of deckIds) {
      const list = lists.find((l) => l.edhplayId === deckId);
      const perf = deckPerformance(deckId, records, parsed, list, "solo");
      // An unlinked deck takes its name from the snapshot EDHPlay sent when the playtest loaded it.
      const snaps = list ? [] : await listDeckSnapshots(deckId);
      const snapshot = snaps[snaps.length - 1];
      testedDecks.push({
        deckId,
        deckName: list?.deckName || (snapshot ? deckCards(snapshot.deck).name : "") || "Unknown deck",
        slug: list?.slug,
        listLabel: list?.label,
        playtests: perf.record.games,
        landsByRound4: perf.landsByRound[3]?.avgLands ?? null,
        commanderRound: perf.commander.avgFirstCastRound,
      });
    }
    testedDecks.sort((a, b) => b.playtests - a.playtests);
  }

  // Lands by round 4 across every seat of every playtest recorded from the start that got there.
  const seatLands: number[] = [];
  for (const r of kind === "playtests" ? records : []) {
    const game = r.gameId ? parsed[r.gameId] : undefined;
    if (!game || game.joinedMidGame || game.rounds < 4) continue;
    for (const p of game.players) seatLands.push(p.landDrops.filter((l) => l.round <= 4).length);
  }
  const landsByRound4 = seatLands.length > 0 ? seatLands.reduce((a, b) => a + b, 0) / seatLands.length : null;

  // Deck tiles use the local deck's name: EDHPlay names carry bracket prefixes like "[B4]".
  const ov = overview(records, parsed);
  ov.byDeck = ov.byDeck.map((d) => {
    const list = lists.find((l) => l.edhplayId === d.deckId);
    return list ? { ...d, deckName: list.deckName, listLabel: list.label } : d;
  });

  return {
    overview: ov,
    testedDecks,
    landsByRound4,
    combosSeen: table.combos.length,
    /** "Combos seen" reads the newest 60 games; the page says so once there are more. */
    combosScannedGames: Math.min(60, records.filter((r) => r.mode === "player").length),
    comboRecordIds: table.recordIds,
    deckCommanders,
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
  /** Every card but the commanders, with the type line the drawer groups by. `playedRound` is the
   *  first round the owner played the card in the game the view was built for; a view built with
   *  no game leaves it out everywhere. */
  cards: { name: string; quantity: number; roles: string[]; typeLine: string; playedRound?: number }[];
  roleCounts: Record<string, number>;
  bracket?: number;
  isPrecon?: boolean;
  combos: ComboResult & { error?: string };
}

/** The latest snapshot of an EDHPlay deck, with roles and the combos the list contains.
 *  `playedRounds` maps card names to the round they were first played in one game. */
export async function deckView(deckId: string, playedRounds: Record<string, number> = {}): Promise<OpponentDeckView | null> {
  const snaps = await listDeckSnapshots(deckId);
  const latest = snaps[snaps.length - 1];
  if (!latest) {
    return null;
  }

  // The game names a double-faced card in full ("A // B") while a list may name its front face.
  const played: Record<string, number> = {};
  for (const [name, round] of Object.entries(playedRounds)) {
    played[name.split(" // ")[0].toLowerCase()] = round;
  }

  const parsedDeck = deckCards(latest.deck);
  const info = await cardInfoFor([...parsedDeck.commanders, ...parsedDeck.main.map((c) => c.name)]);
  const roleCounts: Record<string, number> = {};
  const cards = parsedDeck.main.map((c) => {
    const roles = info[c.name]?.roles ?? [];
    for (const r of roles) {
      roleCounts[r] = (roleCounts[r] ?? 0) + c.quantity;
    }
    const round = played[c.name.split(" // ")[0].toLowerCase()];
    return {
      name: c.name,
      quantity: c.quantity,
      roles,
      typeLine: info[c.name]?.typeLine ?? "",
      ...(round !== undefined ? { playedRound: round } : {}),
    };
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
    isPrecon: parsedDeck.isPrecon,
    combos: { included: combos.included, almostIncluded: [], error: combos.error },
  };
}

/** The record and parsed game behind one report, or null when the id is gone. */
async function findGame(id: string, kind: CaptureKind) {
  const { records, parsed } = await loadGames(kind);
  const record = records.find((r) => r.id === id);
  if (!record) {
    return null;
  }
  return { record, game: record.gameId ? parsed[record.gameId] : undefined };
}

/** The first stage of a game report: the record, the parsed game and the Event Log. Card roles
 *  (`getGameCards`) and combos with decklists (`getGameCombos`) load as their own stages, so the
 *  page can show the report while Scryfall and Commander Spellbook answer. */
export async function getGame(id: string, kind: CaptureKind) {
  const found = await findGame(id, kind);
  if (!found) {
    return null;
  }

  const { record, game } = found;
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
  return { record, game: game ?? null, log };
}

/** The second stage: roles for every card anyone showed. */
export async function getGameCards(id: string, kind: CaptureKind) {
  const found = await findGame(id, kind);
  if (!found) {
    return null;
  }

  const names = found.game ? found.game.players.flatMap((p) => Object.keys(p.cards)) : [];
  const info = await cardInfoFor(names);
  const roles: Record<string, string[]> = {};
  for (const [name, i] of Object.entries(info)) {
    roles[name] = i.roles;
  }
  return { roles, cardCount: new Set(names).size };
}

/** The third stage: combos among each player's shown cards, and opponents' saved decklists. */
export async function getGameCombos(id: string, kind: CaptureKind) {
  const found = await findGame(id, kind);
  if (!found) {
    return null;
  }

  const { record, game } = found;
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
    const playedRounds: Record<string, number> = {};
    for (const card of Object.values(gp?.cards ?? {})) {
      if (card.timesPlayed > 0 && card.playedRounds.length > 0) {
        playedRounds[card.name] = card.playedRounds[0];
      }
    }
    decks[p.deckId] = await deckView(p.deckId, playedRounds);
  }
  return { combos, decks };
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

  const table = await combosOnTable(records, parsed, includeSpectated);

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
    combosSeen: table.combos,
    lobby: { snapshots: rooms.length, roomBrackets },
    /** For the "Include N spectated games" label, whichever way the toggle is set. */
    spectatedGames: records.filter((r) => r.mode === "spectator").length,
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
  // Decklists never show while a game is being played. A list saved after an earlier match is
  // hidden too when the player sat down with the same deck in the game that's open now.
  const liveDeckIds = games.filter((r) => r.inProgress).flatMap((r) => r.players.map((p) => p.deckId).filter((d): d is string => !!d));
  const decks: OpponentDeckView[] = [];
  for (const d of summary.decks) {
    if (liveDeckIds.includes(d.deckId)) continue;
    const view = await deckView(d.deckId);
    if (view) decks.push(view);
  }
  return {
    summary,
    games,
    decks,
    hiddenWhileLive: liveDeckIds.length > 0,
    note: notes[username.toLowerCase()] ?? null,
  };
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

  // The deck's own name and commanders head the page even when no list is linked or played yet.
  // A broken or missing deck.json leaves the header to the slug instead of failing the whole page.
  const deck = await readDeck(slug).catch(() => null);
  const firstList = deck ? (deck.lists.main ?? Object.values(deck.lists)[0]) : undefined;
  const commanders: Record<string, string[]> = {};
  for (const [listId, list] of Object.entries(deck?.lists ?? {})) {
    commanders[listId] = commandersOf(list);
  }
  return {
    deckName: deck?.name ?? slug,
    deckCommanders: firstList ? commandersOf(firstList) : [],
    commanders,
    performances,
    roles,
  };
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

/** The extension's health check. `withSummary` adds the idle side panel's record and last real
 *  game, which needs a full read of the records, so the extension asks only while a panel is open. */
export async function getStatus(withSummary = false) {
  const captures = await listCaptures("games");
  const playtests = await listCaptures("playtests");
  const matches = await listMatches();
  const decks = await listSnapshotDeckIds();
  const profile = await readProfile();
  const last = captures[captures.length - 1];
  const base = {
    ok: true,
    dataDir: EDHPLAY_DIR,
    captures: captures.length,
    playtests: playtests.length,
    matches: matches.length,
    deckSnapshots: decks.length,
    me: profile?.username ?? null,
    lastCaptureAt: last?.updatedAt ?? null,
  };
  if (!withSummary) {
    return base;
  }

  const { records } = await loadGames("games");
  const mine = records.filter((r) => r.mode === "player");
  const latest = mine[0];
  return {
    ...base,
    summary: {
      record: {
        games: mine.length,
        wins: mine.filter((r) => r.result === "win").length,
        losses: mine.filter((r) => r.result === "loss").length,
      },
      lastGame: latest
        ? {
            id: latest.id,
            captureIds: latest.captureIds ?? (latest.captureId ? [latest.captureId] : []),
            result: latest.result,
            startedAt: latest.startedAt,
            rounds: latest.rounds,
            myCommander: latest.players.find((p) => p.isMe)?.commanders[0]?.name,
            opponents: latest.players
              .filter((p) => !p.isMe)
              .map((p) => p.commanders[0]?.name.split(",")[0] ?? p.username),
          }
        : null,
    },
  };
}
