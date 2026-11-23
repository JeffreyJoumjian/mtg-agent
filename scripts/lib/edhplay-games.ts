/** EDHPlay game records and stats. Joins the parsed captures (what the extension saw) with
 *  EDHPlay's match history (who won, which decks, brackets) and the repo's deck lists, then
 *  computes every view the Workbench shows: deck performance, card performance, matchups, the
 *  pod meta and player dossiers.
 *
 *  Pure: callers load the inputs (`edhplay-store.ts`, the deck store, the card cache) and pass
 *  them in, so the same functions run in the Workbench, the CLI and the tests. */
import type { GameMode, ParsedGame, ParsedPlayer } from "./edhplay-parse.ts";
import { CARD_ROLES, type CardRole } from "./card-roles.ts";

// ---------------------------------------------------------------------------------------------
// EDHPlay's match history entry, read field by field.

export interface MatchPlayer {
  seat: number;
  username: string;
  isViewer: boolean;
  eliminated: boolean;
  eliminatedAtRound?: number;
  departure?: string;
  deckId?: string;
  deckName?: string;
  deckIsPrecon: boolean;
  deckBracket?: number;
  commanders: { name: string; imageUri?: string }[];
  life?: number;
  poison?: number;
  mulligans?: number;
  commanderDamage: Record<string, unknown>;
}

export interface MatchView {
  id: string;
  format: string;
  bracket?: number;
  outcome: string;
  roundCount: number;
  startedAt: number;
  endedAt: number;
  durationSec: number;
  startingSeat?: number;
  winnerSeat?: number;
  viewerSeat?: number;
  players: MatchPlayer[];
}

type Json = Record<string, unknown>;
const isObj = (v: unknown): v is Json => typeof v === "object" && v !== null && !Array.isArray(v);
const str = (v: unknown): string | undefined => (typeof v === "string" ? v : undefined);
const num = (v: unknown): number | undefined => (typeof v === "number" && Number.isFinite(v) ? v : undefined);

export function readMatch(raw: unknown): MatchView | null {
  if (!isObj(raw) || typeof raw.id !== "string") {
    return null;
  }

  const players: MatchPlayer[] = [];
  for (const p of Array.isArray(raw.players) ? raw.players : []) {
    if (!isObj(p)) {
      continue;
    }

    const commanders: MatchPlayer["commanders"] = [];
    for (const c of Array.isArray(p.commanders) ? p.commanders : []) {
      if (isObj(c) && typeof c.name === "string") {
        commanders.push({ name: c.name, imageUri: str(c.image_uri) });
      }
    }

    players.push({
      seat: num(p.seat) ?? players.length,
      username: str(p.username) ?? "",
      isViewer: p.is_viewer === true,
      eliminated: p.eliminated === true,
      eliminatedAtRound: num(p.eliminated_at_round),
      departure: str(p.departure),
      deckId: str(p.deck_id),
      deckName: str(p.deck_name),
      deckIsPrecon: p.deck_is_precon === true,
      deckBracket: num(p.deck_bracket),
      commanders,
      life: num(p.life),
      poison: num(p.poison),
      mulligans: num(p.mulligan_count),
      commanderDamage: isObj(p.commander_damage) ? p.commander_damage : {},
    });
  }

  const startedAt = Date.parse(str(raw.started_at) ?? "");
  const endedAt = Date.parse(str(raw.ended_at) ?? "");
  return {
    id: raw.id,
    format: str(raw.format) ?? "",
    bracket: num(raw.bracket),
    outcome: str(raw.outcome) ?? "",
    roundCount: num(raw.round_count) ?? 0,
    startedAt: Number.isFinite(startedAt) ? startedAt : 0,
    endedAt: Number.isFinite(endedAt) ? endedAt : 0,
    durationSec: num(raw.duration_seconds) ?? 0,
    startingSeat: num(raw.starting_seat),
    winnerSeat: num(raw.winner_seat),
    viewerSeat: num(raw.viewer_seat),
    players,
  };
}

// ---------------------------------------------------------------------------------------------
// Game records.

/** A local deck list that is pushed to EDHPlay, so a game played with that EDHPlay deck can be
 *  shown next to the list. */
export interface LocalListRef {
  slug: string;
  deckName: string;
  listId: string;
  label: string;
  edhplayId: string;
  /** Every card name in the list now. */
  cards: string[];
}

export type GameResult = "win" | "loss" | "unknown" | "spectated" | "solo";

export interface PlayerRecord {
  username: string;
  playerId?: string;
  seat?: number;
  isMe: boolean;
  isWinner: boolean;
  commanders: { name: string; imageUri?: string }[];
  deckId?: string;
  deckName?: string;
  deckBracket?: number;
  deckIsPrecon?: boolean;
  finalLife?: number;
  poison?: number;
  eliminatedRound?: number;
  mulligans?: number;
  departure?: string;
  /** Detail only a capture has. */
  cardsPlayed?: number;
  cardsSeen?: number;
  landDrops?: number;
  commanderCasts?: number;
  tokensCreated?: number;
}

export interface GameRecord {
  /** `m:<matchId>` when linked to a match, else `g:<gameId>`. Stable for URLs. */
  id: string;
  source: "capture" | "match" | "both";
  mode: GameMode;
  startedAt: number;
  endedAt: number;
  durationSec: number;
  rounds: number;
  joinedMidGame: boolean;
  /** The game's capture is still open: it's being played right now. */
  inProgress?: boolean;
  captureId?: string;
  /** Every capture the game spans (a reconnect mid-game opens a second one). */
  captureIds?: string[];
  gameId?: string;
  matchId?: string;
  roomId?: string | null;
  winner?: string;
  result: GameResult;
  me?: string;
  /** Who went first. */
  startingPlayer?: string;
  myDeck?: { deckId?: string; deckName?: string; slug?: string; listId?: string; listLabel?: string };
  players: PlayerRecord[];
}

export interface RecordInputs {
  captures: { games: ParsedGame[]; captureIds?: string[]; inProgress?: boolean }[];
  matches: unknown[];
  /** The pilot's EDHPlay username, so match-only games know which seat is theirs. */
  me?: string;
  lists: LocalListRef[];
}

const sameName = (a: string | undefined, b: string | undefined): boolean => !!a && !!b && a.toLowerCase() === b.toLowerCase();

/** Pair captured games with the matches EDHPlay recorded for them: the most players in common,
 *  then the longest time overlap, then the closest start, within 30 minutes. One match per game and
 *  one game per match, settled over every pair at once: EDHPlay can keep one match across a table
 *  restart, and linking in time order would hand the match (and its result) to the one-round false
 *  start while the real game inside it counted its own result again. */
export function linkGames(games: ParsedGame[], matches: MatchView[]): Map<string, MatchView> {
  const pairs: { gameId: string; match: MatchView; common: number; overlap: number; gap: number }[] = [];
  for (const game of games) {
    const names = game.players.map((p) => p.username.toLowerCase()).filter(Boolean);
    for (const match of matches) {
      const common = match.players.filter((p) => names.includes(p.username.toLowerCase())).length;
      const needed = Math.min(2, names.length);
      if (common < needed || common === 0) {
        continue;
      }

      const overlaps = match.startedAt <= game.endedAt + 60_000 && match.endedAt >= game.startedAt - 60_000;
      const gap = Math.abs(match.startedAt - game.startedAt);
      if (!overlaps && gap > 30 * 60_000) {
        continue;
      }

      const overlap = Math.max(0, Math.min(match.endedAt, game.endedAt) - Math.max(match.startedAt, game.startedAt));
      pairs.push({ gameId: game.gameId, match, common, overlap, gap });
    }
  }

  pairs.sort((a, b) => b.common - a.common || b.overlap - a.overlap || a.gap - b.gap);
  const links = new Map<string, MatchView>();
  const used = new Set<string>();
  for (const pair of pairs) {
    if (links.has(pair.gameId) || used.has(pair.match.id)) {
      continue;
    }
    links.set(pair.gameId, pair.match);
    used.add(pair.match.id);
  }
  return links;
}

/** The pilot's result. When their seat can't be found (no profile yet, or a spectate URL without
 *  the spectator flag) the answer is "unknown", never a loss by default. */
function resultFor(mode: GameMode, mySeat: string | undefined, winner: string | undefined, meEliminated: boolean): GameResult {
  if (mode === "spectator") return "spectated";
  if (mode === "solo") return "solo";
  if (!mySeat) return "unknown";
  if (winner && sameName(winner, mySeat)) return "win";
  if (winner || meEliminated) return "loss";
  return "unknown";
}

function capturedDetail(p: ParsedPlayer): Pick<PlayerRecord, "cardsPlayed" | "cardsSeen" | "landDrops" | "commanderCasts" | "tokensCreated"> {
  const cards = Object.values(p.cards);
  return {
    cardsPlayed: cards.filter((c) => c.timesPlayed > 0).length,
    cardsSeen: cards.length,
    landDrops: p.landDrops.length,
    commanderCasts: p.commanderCasts,
    tokensCreated: p.tokensCreated,
  };
}

export function buildRecords(inputs: RecordInputs): { records: GameRecord[]; parsed: Record<string, ParsedGame> } {
  const matches = inputs.matches.map(readMatch).filter((m): m is MatchView => m !== null);
  const me = inputs.me ?? matches.flatMap((m) => m.players).find((p) => p.isViewer)?.username;
  const used: string[] = [];
  const records: GameRecord[] = [];
  const parsed: Record<string, ParsedGame> = {};

  const listFor = (deckId: string | undefined): LocalListRef | undefined => (deckId ? inputs.lists.find((l) => l.edhplayId === deckId) : undefined);

  const allGames = inputs.captures.flatMap((c) =>
    c.games
      .filter((g) => g.players.length > 0)
      .map((g) => ({ game: g, captureIds: c.captureIds, inProgress: c.inProgress === true && g.endReason === "capture_end" })),
  );
  const links = linkGames(
    allGames.filter(({ game }) => game.mode === "player").map(({ game }) => game),
    matches,
  );
  for (const { game, captureIds, inProgress } of allGames) {
    parsed[game.gameId] = game;
    const match = links.get(game.gameId);
    if (match) {
      used.push(match.id);
    }

    const winnerSeat = match?.winnerSeat;
    const matchWinner = winnerSeat === undefined ? undefined : match?.players.find((p) => p.seat === winnerSeat)?.username;
    const survivor = game.players.find((p) => p.playerId === game.survivorId)?.username;
    const winner = matchWinner ?? survivor;

    const players: PlayerRecord[] = game.players.map((p) => {
      const mp = match?.players.find((x) => sameName(x.username, p.username));
      return {
        username: p.username,
        playerId: p.playerId,
        seat: mp?.seat ?? p.lobbySeat,
        isMe: p.isMe || (sameName(p.username, me) && game.mode === "player"),
        isWinner: sameName(p.username, winner),
        commanders: mp?.commanders.length ? mp.commanders : p.commanders.map((c) => ({ name: c.name, imageUri: c.imageUri })),
        deckId: mp?.deckId ?? p.deckId,
        deckName: mp?.deckName,
        deckBracket: mp?.deckBracket,
        deckIsPrecon: mp?.deckIsPrecon,
        finalLife: mp?.life ?? p.finalLife,
        poison: mp?.poison ?? p.stats.poison,
        eliminatedRound: mp?.eliminatedAtRound ?? p.eliminatedRound,
        mulligans: mp?.mulligans ?? p.mulligans,
        departure: mp?.departure,
        ...capturedDetail(p),
      };
    });

    const mine = players.find((p) => p.isMe);
    const list = listFor(mine?.deckId ?? game.myDeckId);
    const starting = game.players.find((p) => p.playerId === game.startingPlayerId)?.username ?? match?.players.find((p) => p.seat === match.startingSeat)?.username;

    records.push({
      id: match ? `m:${match.id}` : `g:${game.gameId}`,
      source: match ? "both" : "capture",
      mode: game.mode,
      startedAt: match?.startedAt || game.startedAt,
      endedAt: match?.endedAt || game.endedAt,
      durationSec: match?.durationSec || Math.round((game.endedAt - game.startedAt) / 1000),
      rounds: match?.roundCount || game.rounds,
      joinedMidGame: game.joinedMidGame,
      captureId: game.captureId,
      gameId: game.gameId,
      matchId: match?.id,
      roomId: game.roomId,
      winner,
      result: inProgress && game.mode === "player" ? "unknown" : resultFor(game.mode, mine?.username, winner, mine?.eliminatedRound !== undefined),
      me: game.mode === "player" ? mine?.username ?? me : undefined,
      inProgress: inProgress || undefined,
      captureIds,
      startingPlayer: starting,
      myDeck: mine ? { deckId: mine.deckId ?? game.myDeckId, deckName: mine.deckName ?? list?.deckName, slug: list?.slug, listId: list?.listId, listLabel: list?.label } : undefined,
      players,
    });
  }

  // Matches the extension never saw (played before it was installed, or with it off).
  for (const match of matches) {
    if (used.includes(match.id)) {
      continue;
    }

    const winner = match.winnerSeat === undefined ? undefined : match.players.find((p) => p.seat === match.winnerSeat)?.username;
    const players: PlayerRecord[] = match.players.map((p) => ({
      username: p.username,
      seat: p.seat,
      isMe: p.isViewer,
      isWinner: sameName(p.username, winner),
      commanders: p.commanders,
      deckId: p.deckId,
      deckName: p.deckName,
      deckBracket: p.deckBracket,
      deckIsPrecon: p.deckIsPrecon,
      finalLife: p.life,
      poison: p.poison,
      eliminatedRound: p.eliminatedAtRound,
      mulligans: p.mulligans,
      departure: p.departure,
    }));
    const mine = players.find((p) => p.isMe);
    const list = listFor(mine?.deckId);

    records.push({
      id: `m:${match.id}`,
      source: "match",
      mode: "player",
      startedAt: match.startedAt,
      endedAt: match.endedAt,
      durationSec: match.durationSec,
      rounds: match.roundCount,
      joinedMidGame: false,
      matchId: match.id,
      winner,
      result: resultFor("player", mine?.username, winner, mine?.eliminatedRound !== undefined),
      me: mine?.username ?? me,
      startingPlayer: match.players.find((p) => p.seat === match.startingSeat)?.username,
      myDeck: mine ? { deckId: mine.deckId, deckName: mine.deckName, slug: list?.slug, listId: list?.listId, listLabel: list?.label } : undefined,
      players,
    });
  }

  records.sort((a, b) => b.startedAt - a.startedAt);
  return { records, parsed };
}

// ---------------------------------------------------------------------------------------------
// Stats.

export interface WinLoss {
  games: number;
  wins: number;
  losses: number;
  unknown: number;
  /** wins / (wins + losses), or null before any decided game. */
  winRate: number | null;
}

function tally(results: GameResult[]): WinLoss {
  const wins = results.filter((r) => r === "win").length;
  const losses = results.filter((r) => r === "loss").length;
  return { games: results.length, wins, losses, unknown: results.length - wins - losses, winRate: wins + losses > 0 ? wins / (wins + losses) : null };
}

const avg = (xs: number[]): number | null => (xs.length > 0 ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

export interface Overview {
  record: WinLoss;
  spectated: number;
  solo: number;
  captured: number;
  matchOnly: number;
  avgRounds: number | null;
  avgDurationMin: number | null;
  firstPlayerWinRate: number | null;
  byDeck: { deckId: string; deckName: string; slug?: string; listId?: string; listLabel?: string; record: WinLoss }[];
  byWeek: { week: string; record: WinLoss }[];
  /** Average round of the pilot's first commander cast, over captured games that saw one. */
  avgCommanderRound: number | null;
  avgMulligans: number | null;
  /** Distinct opponents across the pilot's games, and how many of them sat down more than once. */
  playersMet: number;
  playersMetAgain: number;
}

/** Monday of the record's week in Bucharest time (the pilot's), `YYYY-MM-DD`. A Monday 01:30 game
 *  is still Sunday in UTC, which would put it in the previous week. */
export function weekOf(t: number): string {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Bucharest", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(t));
  const part = (type: string): string => parts.find((p) => p.type === type)?.value ?? "";
  const d = new Date(`${part("year")}-${part("month")}-${part("day")}T00:00:00Z`);
  const day = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - day);
  return d.toISOString().slice(0, 10);
}

export function overview(records: GameRecord[], parsed: Record<string, ParsedGame> = {}): Overview {
  const mine = records.filter((r) => r.mode === "player");

  const commanderRounds: number[] = [];
  for (const r of mine) {
    // A late join can miss the first cast and see a recast, so those games are left out.
    const game = r.gameId ? parsed[r.gameId] : undefined;
    const me = game && !game.joinedMidGame ? game.players.find((p) => p.isMe) : undefined;
    const firsts = (me?.commanders ?? []).map((c) => me?.cards[c.name]?.playedRounds[0]).filter((n): n is number => n !== undefined);
    if (firsts.length > 0) commanderRounds.push(Math.min(...firsts));
  }

  const meetings: Record<string, number> = {};
  for (const r of mine) {
    for (const p of r.players) {
      if (!p.isMe) meetings[p.username.toLowerCase()] = (meetings[p.username.toLowerCase()] ?? 0) + 1;
    }
  }

  const byDeck: Record<string, GameRecord[]> = {};
  const byWeek: Record<string, GameRecord[]> = {};
  for (const r of mine) {
    const key = r.myDeck?.deckId ?? "unknown";
    (byDeck[key] ??= []).push(r);
    (byWeek[weekOf(r.startedAt)] ??= []).push(r);
  }

  const decided = mine.filter((r) => r.winner && r.startingPlayer);
  return {
    record: tally(mine.map((r) => r.result)),
    spectated: records.filter((r) => r.mode === "spectator").length,
    solo: records.filter((r) => r.mode === "solo").length,
    captured: records.filter((r) => r.source !== "match").length,
    matchOnly: records.filter((r) => r.source === "match").length,
    avgRounds: avg(mine.map((r) => r.rounds).filter((n) => n > 0)),
    avgDurationMin: avg(mine.map((r) => r.durationSec / 60).filter((n) => n > 0)),
    firstPlayerWinRate: decided.length > 0 ? decided.filter((r) => sameName(r.winner, r.startingPlayer)).length / decided.length : null,
    byDeck: Object.entries(byDeck)
      .map(([deckId, rs]) => ({
        deckId,
        deckName: rs.find((r) => r.myDeck?.deckName)?.myDeck?.deckName ?? (deckId === "unknown" ? "Unknown deck" : deckId),
        slug: rs[0].myDeck?.slug,
        listId: rs[0].myDeck?.listId,
        listLabel: rs[0].myDeck?.listLabel,
        record: tally(rs.map((r) => r.result)),
      }))
      .sort((a, b) => b.record.games - a.record.games),
    byWeek: Object.entries(byWeek)
      .map(([week, rs]) => ({ week, record: tally(rs.map((r) => r.result)) }))
      .sort((a, b) => a.week.localeCompare(b.week)),
    avgCommanderRound: avg(commanderRounds),
    avgMulligans: avg(mine.map((r) => r.players.find((p) => p.isMe)?.mulligans).filter((n): n is number => n !== undefined)),
    playersMet: Object.keys(meetings).length,
    playersMetAgain: Object.values(meetings).filter((n) => n > 1).length,
  };
}

export interface CardPerformance {
  name: string;
  inList: boolean;
  /** Captured games played with this deck, the denominator for the rates below. */
  games: number;
  /** Games where the card showed up anywhere the pilot could see it (hand, board, graveyard…). */
  seen: number;
  /** Games where it entered the pilot's hand from the library. */
  drawn: number;
  played: number;
  avgFirstPlayRound: number | null;
  onBoardAtEnd: number;
  winsWhenPlayed: number;
  lossesWhenPlayed: number;
  winRateWhenPlayed: number | null;
  winRateWhenNotPlayed: number | null;
  /** In the list, at least 3 captured games, never played. A cut candidate to discuss. */
  neverPlayed: boolean;
  typeLine: string;
  imageUri?: string;
}

export interface DeckPerformance {
  deckId: string;
  deckName: string;
  list?: LocalListRef;
  record: WinLoss;
  capturedGames: number;
  avgRounds: number | null;
  avgMulligans: number | null;
  commander: { avgFirstCastRound: number | null; castInGames: number; avgCasts: number | null };
  /** Average lands on the battlefield by the end of each round, rounds 1 to 10. */
  landsByRound: { round: number; avgLands: number | null }[];
  /** Average life by round, the pilot against the opponents' average. */
  lifeByRound: { round: number; me: number | null; opponents: number | null }[];
  cards: CardPerformance[];
  matchups: Matchup[];
  games: GameRecord[];
}

export interface Matchup {
  commander: string;
  imageUri?: string;
  record: WinLoss;
}

function lifeAt(p: ParsedPlayer, round: number): number | null {
  let life: number | null = p.lifeTimeline.length > 0 ? p.startLife : null;
  for (const point of p.lifeTimeline) {
    if (point.round > round) {
      break;
    }
    life = point.life;
  }
  return life;
}

/** How a deck performs, from real games (`player`) or from solo playtests (`solo`). The two are
 *  never mixed: playtests have no opponents' decisions in them, so their numbers would skew the
 *  real ones. In a playtest every seat is one of the pilot's decks, so the seat holding `deckId`
 *  is the one measured. */
export function deckPerformance(deckId: string, records: GameRecord[], parsed: Record<string, ParsedGame>, list?: LocalListRef, mode: "player" | "solo" = "player"): DeckPerformance {
  const games = records.filter((r) => (mode === "player" ? r.mode === "player" && r.myDeck?.deckId === deckId : r.mode === "solo" && r.players.some((p) => p.deckId === deckId)));
  const detailed = games
    .map((r) => ({ record: r, game: r.gameId ? parsed[r.gameId] : undefined }))
    .filter((x): x is { record: GameRecord; game: ParsedGame } => x.game !== undefined && !x.game.joinedMidGame);

  const myPlayer = (g: ParsedGame): ParsedPlayer | undefined => g.players.find((p) => (mode === "player" ? p.isMe : p.deckId === deckId));

  // Card table: every card in the list now, plus anything the pilot showed in a captured game.
  const names: string[] = [...(list?.cards ?? [])];
  for (const { game } of detailed) {
    for (const name of Object.keys(myPlayer(game)?.cards ?? {})) {
      if (!names.includes(name)) {
        names.push(name);
      }
    }
  }

  const cards: CardPerformance[] = names.map((name) => {
    let seen = 0;
    let drawn = 0;
    let played = 0;
    let onBoardAtEnd = 0;
    let winsWhenPlayed = 0;
    let lossesWhenPlayed = 0;
    let winsNotPlayed = 0;
    let lossesNotPlayed = 0;
    const firstRounds: number[] = [];
    let typeLine = "";
    let imageUri: string | undefined;

    for (const { record, game } of detailed) {
      const card = myPlayer(game)?.cards[name] ?? myPlayer(game)?.cards[Object.keys(myPlayer(game)?.cards ?? {}).find((k) => k.split(" // ")[0] === name) ?? ""];
      const wasPlayed = (card?.timesPlayed ?? 0) > 0;
      if (card) {
        seen += 1;
        typeLine = typeLine || card.typeLine;
        imageUri = imageUri ?? card.imageUri;
        if (card.drawnRounds.length > 0) drawn += 1;
        if (card.onBattlefieldAtEnd) onBoardAtEnd += 1;
      }
      if (wasPlayed && card) {
        played += 1;
        firstRounds.push(card.playedRounds[0]);
        if (record.result === "win") winsWhenPlayed += 1;
        if (record.result === "loss") lossesWhenPlayed += 1;
      } else {
        if (record.result === "win") winsNotPlayed += 1;
        if (record.result === "loss") lossesNotPlayed += 1;
      }
    }

    const inList = list?.cards.includes(name) ?? false;
    return {
      name,
      inList,
      games: detailed.length,
      seen,
      drawn,
      played,
      avgFirstPlayRound: avg(firstRounds),
      onBoardAtEnd,
      winsWhenPlayed,
      lossesWhenPlayed,
      winRateWhenPlayed: winsWhenPlayed + lossesWhenPlayed > 0 ? winsWhenPlayed / (winsWhenPlayed + lossesWhenPlayed) : null,
      winRateWhenNotPlayed: winsNotPlayed + lossesNotPlayed > 0 ? winsNotPlayed / (winsNotPlayed + lossesNotPlayed) : null,
      neverPlayed: inList && detailed.length >= 3 && played === 0,
      typeLine,
      imageUri,
    };
  });
  cards.sort((a, b) => b.played - a.played || b.seen - a.seen || a.name.localeCompare(b.name));

  const measured = (r: GameRecord): PlayerRecord | undefined => r.players.find((p) => (mode === "player" ? p.isMe : p.deckId === deckId));
  const commanderNames = games.flatMap((r) => measured(r)?.commanders.map((c) => c.name) ?? []);
  const castRounds: number[] = [];
  const casts: number[] = [];
  for (const { game } of detailed) {
    const me = myPlayer(game);
    if (!me) continue;
    casts.push(me.commanderCasts);
    const firsts = commanderNames.map((n) => me.cards[n]?.playedRounds[0]).filter((r): r is number => r !== undefined);
    if (firsts.length > 0) castRounds.push(Math.min(...firsts));
  }

  const landsByRound = Array.from({ length: 10 }, (_, i) => i + 1).map((round) => {
    const values = detailed
      .filter(({ game }) => game.rounds >= round)
      .map(({ game }) => myPlayer(game)?.landDrops.filter((l) => l.round <= round).length ?? 0);
    return { round, avgLands: avg(values) };
  });

  const lifeByRound = Array.from({ length: 12 }, (_, i) => i + 1).map((round) => {
    const meLife: number[] = [];
    const oppLife: number[] = [];
    for (const { game } of detailed) {
      if (game.rounds < round) continue;
      for (const p of game.players) {
        const life = lifeAt(p, round);
        if (life === null) continue;
        (p.playerId === myPlayer(game)?.playerId ? meLife : oppLife).push(life);
      }
    }
    return { round, me: avg(meLife), opponents: avg(oppLife) };
  });

  return {
    deckId,
    deckName: games.find((r) => r.myDeck?.deckName)?.myDeck?.deckName ?? list?.deckName ?? deckId,
    list,
    record: tally(games.map((r) => r.result)),
    capturedGames: detailed.length,
    avgRounds: avg(games.map((r) => r.rounds).filter((n) => n > 0)),
    avgMulligans: avg(games.map((r) => measured(r)?.mulligans).filter((n): n is number => n !== undefined)),
    commander: { avgFirstCastRound: avg(castRounds), castInGames: castRounds.length, avgCasts: avg(casts) },
    landsByRound,
    lifeByRound,
    cards,
    matchups: mode === "player" ? matchups(games) : [],
    games,
  };
}

/** The pilot's record against each opposing commander. A pairing of two commanders counts as one
 *  entry, named `A + B`. */
export function matchups(records: GameRecord[]): Matchup[] {
  const rows: Record<string, { imageUri?: string; results: GameResult[] }> = {};
  for (const r of records) {
    if (r.mode !== "player") continue;
    for (const p of r.players) {
      if (p.isMe || p.commanders.length === 0) continue;
      const key = p.commanders.map((c) => c.name).join(" + ");
      const row = (rows[key] ??= { imageUri: p.commanders[0].imageUri, results: [] });
      row.results.push(r.result);
    }
  }
  return Object.entries(rows)
    .map(([commander, row]) => ({ commander, imageUri: row.imageUri, record: tally(row.results) }))
    .sort((a, b) => b.record.games - a.record.games || a.commander.localeCompare(b.commander));
}

// ---------------------------------------------------------------------------------------------
// Meta: what the pods play.

/** What the meta needs to know about a card, resolved from the card cache by the caller. */
export interface CardInfo {
  roles: CardRole[];
  colorIdentity: string[];
  typeLine: string;
  cmc: number;
  gameChanger: boolean;
}

export interface MetaOptions {
  includeSpectated: boolean;
}

export interface MetaCard {
  name: string;
  /** Opponent-games the card was revealed in. */
  games: number;
  /** Opponent-games it was played in. */
  played: number;
  players: string[];
  roles: CardRole[];
  typeLine: string;
  imageUri?: string;
  gameChanger: boolean;
}

export interface Meta {
  games: number;
  opponentSeats: number;
  /** `myWins`/`myLosses`: the pilot's record in the games they played with this commander at the
   *  table (spectated games never count). */
  commanders: { name: string; imageUri?: string; seats: number; wins: number; players: string[]; identity: string; myWins: number; myLosses: number }[];
  identities: { identity: string; seats: number }[];
  colors: { color: string; seats: number }[];
  brackets: { bracket: string; seats: number }[];
  preconShare: number | null;
  cards: MetaCard[];
  /** Distinct revealed cards with each role, averaged per opponent seat in captured games. */
  rolesPerSeat: { role: CardRole; perSeat: number }[];
  roundsHistogram: { rounds: number; games: number }[];
  eliminationRounds: { round: number; players: number }[];
  firstPlayerWinRate: number | null;
  avgRounds: number | null;
  gameChangersPerSeat: number | null;
}

export function meta(records: GameRecord[], parsed: Record<string, ParsedGame>, cardInfo: Record<string, CardInfo>, opts: MetaOptions): Meta {
  const scope = records.filter((r) => r.mode === "player" || (opts.includeSpectated && r.mode === "spectator"));

  const commanders: Record<string, { imageUri?: string; seats: number; wins: number; players: string[]; identity: string; myWins: number; myLosses: number }> = {};
  const identities: Record<string, number> = {};
  const colors: Record<string, number> = { W: 0, U: 0, B: 0, R: 0, G: 0, C: 0 };
  const brackets: Record<string, number> = {};
  let precon = 0;
  let deckKnown = 0;
  let seats = 0;
  const countedGames: Record<string, string[]> = {};

  for (const r of scope) {
    for (const p of r.players) {
      if (p.isMe) continue;
      seats += 1;
      if (p.commanders.length > 0) {
        const key = p.commanders.map((c) => c.name).join(" + ");
        const ident = ["W", "U", "B", "R", "G"].filter((c) => p.commanders.some((cm) => (cardInfo[cm.name]?.colorIdentity ?? []).includes(c))).join("");
        const row = (commanders[key] ??= { imageUri: p.commanders[0].imageUri, seats: 0, wins: 0, players: [], identity: ident, myWins: 0, myLosses: 0 });
        row.seats += 1;
        if (p.isWinner) row.wins += 1;
        // Two opponents on the same commander in one game still count that game once.
        const counted = (countedGames[key] ??= []);
        if (r.mode === "player" && !counted.includes(r.id)) {
          counted.push(r.id);
          if (r.result === "win") row.myWins += 1;
          if (r.result === "loss") row.myLosses += 1;
        }
        if (!row.players.includes(p.username)) row.players.push(p.username);
        identities[ident || "C"] = (identities[ident || "C"] ?? 0) + 1;
        for (const c of ident ? ident.split("") : ["C"]) colors[c] += 1;
      }
      brackets[p.deckBracket === undefined ? "unknown" : String(p.deckBracket)] = (brackets[p.deckBracket === undefined ? "unknown" : String(p.deckBracket)] ?? 0) + 1;
      if (p.deckIsPrecon !== undefined) {
        deckKnown += 1;
        if (p.deckIsPrecon) precon += 1;
      }
    }
  }

  const cards: Record<string, MetaCard> = {};
  const roleCounts: Partial<Record<CardRole, number>> = {};
  let capturedSeats = 0;
  let gameChangers = 0;
  for (const r of scope) {
    const game = r.gameId ? parsed[r.gameId] : undefined;
    if (!game) continue;
    for (const p of game.players) {
      if (p.isMe) continue;
      capturedSeats += 1;
      const commanderNames = p.commanders.map((c) => c.name);
      for (const c of Object.values(p.cards)) {
        // Tokens, commanders and basic lands say nothing about what a deck plays.
        if (c.isToken || commanderNames.includes(c.name) || /\bBasic\b/.test(c.typeLine)) continue;
        const info = cardInfo[c.name];
        const row = (cards[c.name] ??= { name: c.name, games: 0, played: 0, players: [], roles: info?.roles ?? [], typeLine: c.typeLine || info?.typeLine || "", imageUri: c.imageUri, gameChanger: info?.gameChanger ?? false });
        row.games += 1;
        if (c.timesPlayed > 0) row.played += 1;
        if (!row.players.includes(p.username)) row.players.push(p.username);
        for (const role of info?.roles ?? []) roleCounts[role] = (roleCounts[role] ?? 0) + 1;
        if (info?.gameChanger) gameChangers += 1;
      }
    }
  }

  const rounds: Record<number, number> = {};
  const elim: Record<number, number> = {};
  for (const r of scope) {
    if (r.rounds > 0) rounds[r.rounds] = (rounds[r.rounds] ?? 0) + 1;
    for (const p of r.players) {
      if (p.eliminatedRound !== undefined) elim[p.eliminatedRound] = (elim[p.eliminatedRound] ?? 0) + 1;
    }
  }

  const decided = scope.filter((r) => r.winner && r.startingPlayer);
  return {
    games: scope.length,
    opponentSeats: seats,
    commanders: Object.entries(commanders)
      .map(([name, row]) => ({ name, ...row }))
      .sort((a, b) => b.seats - a.seats || a.name.localeCompare(b.name)),
    identities: Object.entries(identities)
      .map(([identity, n]) => ({ identity, seats: n }))
      .sort((a, b) => b.seats - a.seats),
    colors: Object.entries(colors).map(([color, n]) => ({ color, seats: n })),
    brackets: Object.entries(brackets)
      .map(([bracket, n]) => ({ bracket, seats: n }))
      .sort((a, b) => a.bracket.localeCompare(b.bracket)),
    preconShare: deckKnown > 0 ? precon / deckKnown : null,
    cards: Object.values(cards).sort((a, b) => b.games - a.games || b.played - a.played || a.name.localeCompare(b.name)),
    rolesPerSeat: CARD_ROLES.filter((role) => role !== "land" && roleCounts[role] !== undefined)
      .map((role) => ({ role, perSeat: capturedSeats > 0 ? (roleCounts[role] ?? 0) / capturedSeats : 0 }))
      .sort((a, b) => b.perSeat - a.perSeat),
    roundsHistogram: Object.entries(rounds)
      .map(([n, games]) => ({ rounds: Number(n), games }))
      .sort((a, b) => a.rounds - b.rounds),
    eliminationRounds: Object.entries(elim)
      .map(([n, players]) => ({ round: Number(n), players }))
      .sort((a, b) => a.round - b.round),
    firstPlayerWinRate: decided.length > 0 ? decided.filter((r) => sameName(r.winner, r.startingPlayer)).length / decided.length : null,
    avgRounds: avg(scope.map((r) => r.rounds).filter((n) => n > 0)),
    gameChangersPerSeat: capturedSeats > 0 ? gameChangers / capturedSeats : null,
  };
}

// ---------------------------------------------------------------------------------------------
// Players.

export interface PlayerSummary {
  username: string;
  games: number;
  /** Games this player won. */
  theirWins: number;
  /** Games the pilot won with this player at the table. */
  myWins: number;
  myLosses: number;
  spectated: number;
  lastSeen: number;
  firstSeen: number;
  commanders: { name: string; games: number; imageUri?: string }[];
  decks: { deckId: string; deckName?: string; games: number; bracket?: number; precon?: boolean }[];
  avgEliminationRound: number | null;
  topCards: { name: string; games: number; played: number }[];
}

export function playerSummaries(records: GameRecord[], parsed: Record<string, ParsedGame>): PlayerSummary[] {
  const rows: Record<string, { username: string; rs: { r: GameRecord; p: PlayerRecord }[] }> = {};
  for (const r of records) {
    if (r.mode === "solo") continue;
    for (const p of r.players) {
      if (p.isMe || !p.username) continue;
      const key = p.username.toLowerCase();
      (rows[key] ??= { username: p.username, rs: [] }).rs.push({ r, p });
    }
  }

  return Object.values(rows)
    .map(({ username, rs }) => {
      const commanders: Record<string, { games: number; imageUri?: string }> = {};
      const decks: Record<string, { deckName?: string; games: number; bracket?: number; precon?: boolean }> = {};
      const cards: Record<string, { games: number; played: number }> = {};
      for (const { r, p } of rs) {
        if (p.commanders.length > 0) {
          const key = p.commanders.map((c) => c.name).join(" + ");
          const row = (commanders[key] ??= { games: 0, imageUri: p.commanders[0].imageUri });
          row.games += 1;
        }
        if (p.deckId) {
          const row = (decks[p.deckId] ??= { deckName: p.deckName, games: 0, bracket: p.deckBracket, precon: p.deckIsPrecon });
          row.games += 1;
          row.deckName = row.deckName ?? p.deckName;
        }
        const game = r.gameId ? parsed[r.gameId] : undefined;
        const gp = game?.players.find((x) => sameName(x.username, username));
        const commanderNames = gp?.commanders.map((c) => c.name) ?? [];
        for (const c of Object.values(gp?.cards ?? {})) {
          if (c.isToken || commanderNames.includes(c.name) || /\bBasic\b/.test(c.typeLine)) continue;
          const row = (cards[c.name] ??= { games: 0, played: 0 });
          row.games += 1;
          if (c.timesPlayed > 0) row.played += 1;
        }
      }

      const played = rs.filter(({ r }) => r.mode === "player");
      return {
        username,
        games: played.length,
        // Over the games you played, so it sits next to `games` and the record without spectated
        // wins inflating it.
        theirWins: played.filter(({ p }) => p.isWinner).length,
        myWins: played.filter(({ r }) => r.result === "win").length,
        myLosses: played.filter(({ r }) => r.result === "loss").length,
        spectated: rs.length - played.length,
        lastSeen: Math.max(...rs.map(({ r }) => r.startedAt)),
        firstSeen: Math.min(...rs.map(({ r }) => r.startedAt)),
        commanders: Object.entries(commanders)
          .map(([name, row]) => ({ name, ...row }))
          .sort((a, b) => b.games - a.games),
        decks: Object.entries(decks)
          .map(([deckId, row]) => ({ deckId, ...row }))
          .sort((a, b) => b.games - a.games),
        avgEliminationRound: avg(rs.map(({ p }) => p.eliminatedRound).filter((n): n is number => n !== undefined)),
        topCards: Object.entries(cards)
          .map(([name, row]) => ({ name, ...row }))
          .sort((a, b) => b.played - a.played || b.games - a.games)
          .slice(0, 20),
      };
    })
    .sort((a, b) => b.lastSeen - a.lastSeen);
}

/** The history the live panel shows for the players at the table: no decklists, only what past
 *  games showed. */
export interface Dossier {
  username: string;
  known: boolean;
  games: number;
  theirWins: number;
  myWins: number;
  myLosses: number;
  lastSeen?: number;
  commanders: { name: string; games: number }[];
  topCards: { name: string; games: number; played: number }[];
  note?: string;
  tags?: string[];
}

export function dossierFor(username: string, summaries: PlayerSummary[], notes: Record<string, { note: string; tags: string[] }>): Dossier {
  const s = summaries.find((x) => sameName(x.username, username));
  const n = notes[username.toLowerCase()];
  return {
    username,
    known: !!s,
    games: s?.games ?? 0,
    theirWins: s?.theirWins ?? 0,
    myWins: s?.myWins ?? 0,
    myLosses: s?.myLosses ?? 0,
    lastSeen: s?.lastSeen,
    commanders: (s?.commanders ?? []).map((c) => ({ name: c.name, games: c.games })),
    topCards: (s?.topCards ?? []).slice(0, 8),
    note: n?.note,
    tags: n?.tags,
  };
}

/** The non-token, non-commander cards a player showed in a game, the input for combo lookups. */
export function revealedCards(p: ParsedPlayer): { commanders: string[]; main: string[] } {
  const commanders = p.commanders.map((c) => c.name);
  const main = Object.values(p.cards)
    .filter((c) => !c.isToken && !commanders.includes(c.name) && !/\bBasic\b/.test(c.typeLine))
    .map((c) => c.name);
  return { commanders, main };
}

/** Card names in an EDHPlay `/decks/{id}` answer, split into commanders and the rest. */
export function deckCards(raw: unknown): { name: string; commanders: string[]; main: { name: string; quantity: number }[]; bracket?: number; isPrecon?: boolean } {
  const d = isObj(raw) ? raw : {};
  const commanders: string[] = [];
  const main: { name: string; quantity: number }[] = [];
  for (const c of Array.isArray(d.cards) ? d.cards : []) {
    if (!isObj(c)) continue;
    const name = str(c.name) ?? (isObj(c.card) ? str(c.card.name) : undefined);
    if (!name) continue;
    const zone = str(c.zone) ?? "main";
    if (zone === "commander") commanders.push(name);
    else if (zone === "main") main.push({ name, quantity: num(c.quantity) ?? 1 });
  }
  return { name: str(d.name) ?? "", commanders, main, bracket: num(d.bracket_level), isPrecon: d.is_precon === true ? true : undefined };
}

/** Solo playtests come from Event Log lines, which name cards but not their types, so land drops
 *  can't be told apart. Given type lines from the card cache, fill the missing ones and rebuild each
 *  player's land drops from the play events. Returns a new game; the input is left untouched. */
export function fillTypeLines(game: ParsedGame, typeLines: Record<string, string>): ParsedGame {
  const copy: ParsedGame = structuredClone(game);
  for (const p of copy.players) {
    for (const c of Object.values(p.cards)) {
      if (!c.typeLine && typeLines[c.name]) c.typeLine = typeLines[c.name];
    }
    p.landDrops = copy.events
      .filter((e) => e.kind === "play" && e.to === "battlefield" && e.playerId === p.playerId && e.card && /\bLand\b/.test(p.cards[e.card]?.typeLine ?? ""))
      .map((e) => ({ seq: e.seq, round: e.round, name: e.card ?? "" }));
  }
  return copy;
}
