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
    for (const deck of decks) {
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

export interface PanelView {
  phase: "idle" | "lobby" | "game";
  /** The room closed; the panel shows the game as it ended. */
  ended?: boolean;
  mode?: ParsedGame["mode"];
  round?: number;
  activePlayer?: string;
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

function panelPlayer(p: ParsedPlayer, game: ParsedGame): PanelPlayer {
  const cards = Object.values(p.cards);
  const nameOf = (id: string) => game.players.find((x) => x.playerId === id)?.username ?? "?";
  return {
    playerId: p.playerId,
    username: p.username,
    isMe: p.isMe,
    life: p.finalLife,
    lifeTrend: [p.startLife, ...p.lifeTimeline.map((l) => l.life)].slice(-30),
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
): PanelView {
  const dossierOf = (username: string) => live?.dossiers.find((d) => d.username.toLowerCase() === username.toLowerCase());

  if (game) {
    const players = game.players.map((p) => ({ ...panelPlayer(p, game), dossier: dossierOf(p.username), combos: live?.combos[p.username] }));
    const nameOf = (id: string | undefined) => game.players.find((p) => p.playerId === id)?.username ?? "";
    const last = game.turns[game.turns.length - 1];
    return {
      phase: "game",
      mode: game.mode,
      round: game.rounds,
      activePlayer: nameOf(last?.playerId),
      joinedMidGame: game.joinedMidGame,
      players,
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
      recent: [],
    };
  }

  return { phase: "idle", players: [], recent: [] };
}
