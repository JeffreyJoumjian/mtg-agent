/** Pure logic of the extension, kept apart from the browser glue so it can be tested in Bun:
 *  matching playtest seats to the decks the page loaded, and turning the live game into what the
 *  side panel shows. */
import type { LobbyView, ParsedGame, ParsedPlayer } from "../../../scripts/lib/edhplay-parse.ts";
import { revealedCards, type Dossier } from "../../../scripts/lib/edhplay-games.ts";
import type { Combo } from "../../../scripts/lib/spellbook.ts";

export interface LoadedDeck {
  deckId: string;
  name: string;
  cards: string[];
}

/** Which loaded deck each playtest seat is playing: the deck holding the most of the cards that
 *  seat has played. A seat that played nothing from any loaded deck stays unmatched. */
export function matchSeatsToDecks(playedBySeat: Record<string, string[]>, decks: LoadedDeck[]): Record<string, LoadedDeck> {
  const out: Record<string, LoadedDeck> = {};
  for (const [seat, played] of Object.entries(playedBySeat)) {
    let best: { deck: LoadedDeck; hits: number } | undefined;
    // Newest first, so a tie on shared staples goes to the deck loaded most recently.
    for (const deck of [...decks].reverse()) {
      const hits = played.filter((name) => deck.cards.some((c) => c === name || c.split(" // ")[0] === name)).length;
      if (hits > 0 && (!best || hits > best.hits)) {
        best = { deck, hits };
      }
    }
    if (best) {
      out[seat] = best.deck;
    }
  }
  return out;
}

export interface LiveComboView {
  included: Combo[];
  almostIncluded: Combo[];
}

export interface PanelPlayer {
  playerId: string;
  username: string;
  isMe: boolean;
  life: number;
  lifeTrend: number[];
  /** Life gained or lost since this seat's own turn last began (see `lifeChangeThisRound`). */
  lifeDelta: number;
  eliminatedRound?: number;
  /** Turn sequence of the elimination, to order seats that went out in the same round. */
  eliminatedSeq?: number;
  /** Round of the first commander cast, when the panel saw one. */
  commanderFirstRound?: number;
  /** The deck a playtest seat is playing, matched by the page from the cards it played. */
  deckName?: string;
  status: string;
  commanders: string[];
  commanderTax: number;
  commanderCasts: number;
  commanderDamage: { from: string; amount: number }[];
  handCount?: number;
  libraryCount?: number;
  onBattlefield: number;
  cardsPlayed: number;
  landDrops: number;
  mulligans: number;
  dossier?: Dossier;
  combos?: LiveComboView;
}

/** One combo-watch line pinned at the top of the panel. `assembled`: every piece is shown.
 *  `one-away`: all but one piece is shown. */
export interface ComboAlert {
  level: "assembled" | "one-away";
  username: string;
  cards: string[];
  produces: string[];
  shown: string[];
  missing: string[];
}

export interface PanelView {
  phase: "idle" | "lobby" | "game";
  /** The room closed; the panel shows the game as it ended. */
  ended?: boolean;
  /** The capture this view is for, so the panel can link the finished game's report. */
  captureId?: string;
  mode?: ParsedGame["mode"];
  round?: number;
  activePlayer?: string;
  /** True when `activePlayer` is the pilot's own seat. */
  activeIsMe?: boolean;
  /** The last player standing, once every other seat is out. */
  winner?: string;
  durationMin?: number;
  alerts: ComboAlert[];
  /** Alerts left out by the cap in `comboAlerts`. */
  moreAlerts: number;
  joinedMidGame?: boolean;
  players: PanelPlayer[];
  recent: { round: number; username: string; card: string; kind: string }[];
}

/** The live request the background sends the Workbench: who is at the table and what they have
 *  shown. Spectated and solo games ask for no history of the pilot's own seat. */
export function liveRequest(game: ParsedGame | null, lobby: LobbyView | null): { players: string[]; revealed: { username: string; commanders: string[]; cards: string[] }[] } {
  if (game) {
    return {
      players: game.players.filter((p) => !p.isMe && p.username).map((p) => p.username),
      revealed: game.players
        .filter((p) => p.username)
        .map((p) => {
          const r = revealedCards(p);
          return { username: p.username, commanders: r.commanders, cards: r.main.slice(0, 200) };
        }),
    };
  }
  return { players: (lobby?.players ?? []).filter((p) => !p.isMe && p.username).map((p) => p.username), revealed: [] };
}

/** A stable key for a live request, so the background only re-asks the Workbench when the table
 *  or the revealed cards changed. */
export function liveKey(req: ReturnType<typeof liveRequest>): string {
  return JSON.stringify([req.players, req.revealed.map((r) => [r.username, r.commanders, [...r.cards].sort()])]);
}

/** Life gained or lost "this round" for one seat: since its own turn last began, so it resets
 *  when the turn passes back to that seat. Changes during the seat's own turn count. Before the
 *  seat has taken a turn, the change since the game started. */
export function lifeChangeThisRound(p: ParsedPlayer, turns: ParsedGame["turns"]): number {
  const ownTurns = turns.filter((t) => t.playerId === p.playerId);
  const last = ownTurns[ownTurns.length - 1];
  if (!last) {
    return p.finalLife - p.startLife;
  }

  let baseline = p.startLife;
  for (const point of p.lifeTimeline) {
    if (point.seq >= last.seq) {
      break;
    }
    baseline = point.life;
  }
  return p.finalLife - baseline;
}

/** At most this many combo alerts show; the rest are counted in `moreAlerts`. */
const MAX_ALERTS = 4;

/** The combo watch: every combo whose pieces a seat has all shown, then every combo one card
 *  away, assembled first and the most popular combos first within a level. The pilot's own seat
 *  is left out of real games (it's their own deck) but kept in playtests, where every seat is
 *  one of their decks, and in spectated games. */
export function comboAlerts(
  players: { username: string; isMe: boolean; combos?: LiveComboView }[],
  mode: ParsedGame["mode"] | undefined,
): { alerts: ComboAlert[]; more: number } {
  const assembled: (ComboAlert & { popularity: number })[] = [];
  const oneAway: (ComboAlert & { popularity: number })[] = [];
  for (const p of players) {
    if (!p.combos || (p.isMe && mode === "player")) {
      continue;
    }
    for (const c of p.combos.included) {
      assembled.push({ level: "assembled", username: p.username, cards: c.cards, produces: c.produces, shown: c.cards, missing: [], popularity: c.popularity });
    }
    for (const c of p.combos.almostIncluded) {
      if (c.missing.length !== 1) {
        continue;
      }
      const shown = c.cards.filter((name) => !c.missing.includes(name));
      oneAway.push({ level: "one-away", username: p.username, cards: c.cards, produces: c.produces, shown, missing: c.missing, popularity: c.popularity });
    }
  }

  const byPopularity = (a: { popularity: number }, b: { popularity: number }) => b.popularity - a.popularity;
  const all = [...assembled.sort(byPopularity), ...oneAway.sort(byPopularity)];
  return {
    alerts: all.slice(0, MAX_ALERTS).map((a) => ({ level: a.level, username: a.username, cards: a.cards, produces: a.produces, shown: a.shown, missing: a.missing })),
    more: Math.max(0, all.length - MAX_ALERTS),
  };
}

export type BadgeState = { text: ""; color: "" } | { text: "REC" | "TEST" | "!"; color: string };

/** The toolbar badge for one tab: REC while a game or a spectated game records, TEST while a
 *  playtest records, ! when records are waiting because the Workbench is down, else nothing.
 *  Recording wins over waiting, because the panel already shows the offline banner. */
export function badgeFor(recording: "game" | "playtest" | null, queued: number, workbench: "ok" | "down" | "unknown"): BadgeState {
  if (recording === "playtest") return { text: "TEST", color: "#b7791f" };
  if (recording === "game") return { text: "REC", color: "#2f855a" };
  if (queued > 0 && workbench === "down") return { text: "!", color: "#c53030" };
  return { text: "", color: "" };
}

function panelPlayer(p: ParsedPlayer, game: ParsedGame): PanelPlayer {
  const cards = Object.values(p.cards);
  const nameOf = (id: string) => {
    const attacker = game.players.find((x) => x.playerId === id);
    return attacker?.commanders[0]?.name.split(",")[0] ?? attacker?.username ?? "?";
  };
  const firstCasts = p.commanders.map((c) => p.cards[c.name]?.playedRounds[0]).filter((r): r is number => r !== undefined);
  return {
    playerId: p.playerId,
    username: p.username,
    isMe: p.isMe,
    life: p.finalLife,
    lifeTrend: [p.startLife, ...p.lifeTimeline.map((l) => l.life)].slice(-30),
    lifeDelta: lifeChangeThisRound(p, game.turns),
    eliminatedRound: p.eliminatedRound,
    eliminatedSeq: p.eliminatedSeq,
    commanderFirstRound: firstCasts.length > 0 ? Math.min(...firstCasts) : undefined,
    status: p.status,
    commanders: p.commanders.map((c) => c.name),
    commanderTax: p.commanderTax || Math.max(0, p.commanderCasts - 1) * 2,
    commanderCasts: p.commanderCasts,
    commanderDamage: Object.entries(p.commanderDamageTaken)
      .filter(([, n]) => n > 0)
      .map(([from, amount]) => ({ from: nameOf(from), amount })),
    handCount: p.handCount,
    libraryCount: p.libraryCount,
    onBattlefield: cards.filter((c) => c.onBattlefieldAtEnd).length,
    cardsPlayed: cards.filter((c) => c.timesPlayed > 0).length,
    landDrops: p.landDrops.length,
    mulligans: p.mulligans,
  };
}

export function panelView(
  game: ParsedGame | null,
  lobby: LobbyView | null,
  live: { dossiers: Dossier[]; combos: Record<string, LiveComboView> } | null,
  seatDecks: { playerId: string; deckName?: string }[] = [],
): PanelView {
  const dossierOf = (username: string) => live?.dossiers.find((d) => d.username.toLowerCase() === username.toLowerCase());

  if (game) {
    const players = game.players.map((p) => ({
      ...panelPlayer(p, game),
      deckName: seatDecks.find((s) => s.playerId === p.playerId)?.deckName,
      dossier: dossierOf(p.username),
      combos: live?.combos[p.username],
    }));
    const nameOf = (id: string | undefined) => game.players.find((p) => p.playerId === id)?.username ?? "";
    const last = game.turns[game.turns.length - 1];
    const { alerts, more } = comboAlerts(players, game.mode);
    return {
      phase: "game",
      captureId: game.captureId,
      mode: game.mode,
      round: game.rounds,
      activePlayer: nameOf(last?.playerId),
      activeIsMe: game.players.some((p) => p.isMe && p.playerId === last?.playerId),
      winner: game.survivorId ? nameOf(game.survivorId) : undefined,
      durationMin: Math.round((game.endedAt - game.startedAt) / 60_000),
      joinedMidGame: game.joinedMidGame,
      players,
      alerts,
      moreAlerts: more,
      recent: game.events
        .filter((e) => (e.kind === "play" || e.kind === "put" || e.kind === "token") && e.card)
        .slice(-15)
        .reverse()
        .map((e) => ({ round: e.round, username: nameOf(e.playerId), card: e.card ?? "", kind: e.kind })),
    };
  }

  if (lobby && lobby.players.length > 0) {
    return {
      phase: "lobby",
      players: lobby.players.map((p) => ({
        playerId: p.playerId,
        username: p.username,
        isMe: p.isMe,
        life: 40,
        lifeTrend: [],
        lifeDelta: 0,
        status: "lobby",
        commanders: [],
        commanderTax: 0,
        commanderCasts: 0,
        commanderDamage: [],
        onBattlefield: 0,
        cardsPlayed: 0,
        landDrops: 0,
        mulligans: 0,
        dossier: dossierOf(p.username),
      })),
      alerts: [],
      moreAlerts: 0,
      recent: [],
    };
  }

  return { phase: "idle", players: [], alerts: [], moreAlerts: 0, recent: [] };
}

/** Whether the panel shows the last game as it ended. It does once the room closes, or once every
 *  opponent is out while the room stays open, until a new game starts or a lobby `game_state`
 *  newer than the game's end arrives for a rematch (so the new table's history shows first). */
export function showsFinishedGame(input: {
  live: boolean;
  finished: { endReason?: string; endedAt: number } | null;
  roomOpen: boolean;
  lobby: { phase: string; updatedAt: number } | null;
}): boolean {
  if (input.live || input.finished === null) return false;
  if (!input.roomOpen) return true;
  const rematchLobby = input.lobby !== null && input.lobby.phase === "lobby" && input.lobby.updatedAt > input.finished.endedAt;
  return input.finished.endReason === "eliminations" && !rematchLobby;
}
