/** EDHPlay game parser: turns the raw websocket frames of one EDHPlay room connection (a "capture")
 *  into structured games.
 *
 *  Pure on purpose: the browser extension bundles this file for its live side panel, and the
 *  Workbench server runs the same code over the stored frames, so a game reads the same in both.
 *  No `node:` imports here.
 *
 *  EDHPlay is a manual sandbox with no rules engine. A card "played" is a card moved from a hand
 *  or the command zone to the battlefield or the stack. Hidden cards come through with no name
 *  (`cards: []` on a draw the viewer can't see), so everything below only ever knows what the
 *  viewer saw. The protocol notes this is built on live in `.claude/skills/edhplay-sync/REFERENCE.md`. */

/** One websocket frame as the extension stores it. `data` is the parsed JSON message. */
export interface RawFrame {
  /** Epoch ms when the extension saw the frame. */
  t: number;
  dir: "in" | "out";
  data: unknown;
}

/** What the extension records about one room connection, next to its frames. */
export interface CaptureMeta {
  captureId: string;
  /** `ws` for an online room, `solo` for a solo playtest read from the Event Log. */
  source: "ws" | "solo";
  roomId: string | null;
  spectator: boolean;
  pageUrl: string;
  startedAt: number;
  endedAt?: number;
  /** The signed-in EDHPlay user, so the parser knows which seat is the pilot. */
  me?: { id: string; username: string };
  extensionVersion?: string;
  protocolVersion?: number;
  /** Seats of a solo playtest, which has no `game_state` to read them from. `deckId` is the
   *  EDHPlay deck loaded into the seat, when the extension saw it load. */
  players?: { playerId: string; username: string; deckId?: string; deckName?: string }[];
}

export type GameMode = "player" | "spectator" | "solo";

export interface CardRef {
  name: string;
  typeLine: string;
  manaCost: string;
  imageUri?: string;
  cardPrintId?: string;
}

/** Everything one player showed of one card during a game. Keyed by card name on the player. */
export interface CardSeen extends CardRef {
  firstSeenSeq: number;
  firstSeenRound: number;
  /** The zone the card was first seen in (`battlefield`, `graveyard`, `stack`, `hand`…). */
  firstZone: string;
  /** Times it moved from hand or command zone to the battlefield or stack. */
  timesPlayed: number;
  playedRounds: number[];
  /** Times it was put onto the battlefield from anywhere else (library, graveyard, exile). */
  timesPut: number;
  /** Rounds it entered the pilot's hand from the library. Only filled for the pilot's own cards. */
  drawnRounds: number[];
  zonesVisited: string[];
  isToken: boolean;
  /** On the battlefield when the game ended. */
  onBattlefieldAtEnd: boolean;
}

export interface LifePoint {
  seq: number;
  round: number;
  t: number;
  life: number;
}

export interface ParsedPlayer {
  playerId: string;
  username: string;
  lobbySeat?: number;
  isMe: boolean;
  /** The EDHPlay deck id, when a lobby event named it. */
  deckId?: string;
  commanders: CardRef[];
  startLife: number;
  finalLife: number;
  minLife: number;
  lifeTimeline: LifePoint[];
  /** Other numeric stats `set_player_stats` reported (poison, energy, experience…), last value. */
  stats: Record<string, number>;
  /** Commander damage this player has taken, by the attacking player's id (all their commanders summed). */
  commanderDamageTaken: Record<string, number>;
  commanderTax: number;
  commanderCasts: number;
  mulligans: number;
  status: string;
  eliminatedRound?: number;
  eliminatedSeq?: number;
  revived: number;
  cards: Record<string, CardSeen>;
  landDrops: { seq: number; round: number; name: string }[];
  tokensCreated: number;
  maxBattlefield: number;
  handCount?: number;
  libraryCount?: number;
  /** Turns this player took, by turn sequence number. */
  turnsTaken: number;
  chatMessages: number;
  disconnects: number;
}

export interface GameEvent {
  seq: number;
  round: number;
  t: number;
  kind: string;
  playerId?: string;
  card?: string;
  from?: string;
  to?: string;
  value?: number;
  detail?: string;
}

export interface TurnRecord {
  seq: number;
  round: number;
  playerId: string;
  startedAt: number;
  endedAt?: number;
  /** Cards each player played during this turn, by player id. */
  played: Record<string, string[]>;
}

export interface ChatLine {
  t: number;
  playerId: string;
  message: string;
}

export interface ParsedGame {
  /** `<captureId>:<index>`, stable for a stored capture. */
  gameId: string;
  captureId: string;
  roomId: string | null;
  mode: GameMode;
  startedAt: number;
  endedAt: number;
  /** The capture began after round 1, so early turns are missing. */
  joinedMidGame: boolean;
  firstRoundSeen: number;
  rounds: number;
  turnSeq: number;
  startingPlayerId?: string;
  mulliganType?: string;
  players: ParsedPlayer[];
  turns: TurnRecord[];
  events: GameEvent[];
  chat: ChatLine[];
  eventCounts: Record<string, number>;
  /** Why the parser closed this game. */
  endReason: "eliminations" | "new_game" | "capture_end";
  /** The last player standing when every other player was eliminated. The match API's winner
   *  overrides this when the game is linked to a match. */
  survivorId?: string;
  /** Players seen in the lobby before the game started (usernames by player id). */
  lobby: Record<string, string>;
  /** The deck the pilot picked in the lobby, from their own outgoing frames. */
  myDeckId?: string;
}

/** The lobby before a game starts: who is seated. The live panel shows history for these. */
export interface LobbyView {
  roomId: string | null;
  phase: string;
  /** When this `game_state` arrived, so a lobby after a finished game can be told from the one before it. */
  updatedAt: number;
  players: { playerId: string; username: string; lobbySeat?: number; isMe: boolean }[];
}

// ---------------------------------------------------------------------------------------------
// Small readers over untyped JSON. The protocol isn't ours, so every field is checked, never cast.

type Json = Record<string, unknown>;

function isObj(v: unknown): v is Json {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function str(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

function num(v: unknown): number | undefined {
  return typeof v === "number" && Number.isFinite(v) ? v : undefined;
}

function arr(v: unknown): unknown[] {
  return Array.isArray(v) ? v : [];
}

/** A card object as EDHPlay sends it, or undefined when the object has no name (a hidden card). */
function readCard(v: unknown): (CardRef & { id?: string; zone?: string; ownerId?: string; isToken: boolean }) | undefined {
  if (!isObj(v)) {
    return undefined;
  }

  const name = str(v.name);
  if (!name) {
    return undefined;
  }

  const typeLine = str(v.type_line) ?? "";
  return {
    name,
    typeLine,
    manaCost: str(v.mana_cost) ?? "",
    imageUri: str(v.front_image_uri),
    cardPrintId: str(v.card_print_id),
    id: str(v.id),
    zone: v.zone === undefined ? undefined : zoneName(v.zone),
    ownerId: str(v.owner_id),
    isToken: v.is_token === true || /\bToken\b/.test(typeLine),
  };
}

const PLAY_TARGETS = ["battlefield", "stack"];
const PLAY_SOURCES = ["hand", "command"];

/** EDHPlay names the command zone `commandZone` in some events and `command` in others. */
function zoneName(v: unknown): string {
  const z = str(v) ?? "";
  return z === "commandZone" ? "command" : z;
}
/** Player keys in `game_state` that hold arrays of card objects, mapped to a zone name. */
const ZONE_KEYS: Record<string, string> = {
  battlefield: "battlefield",
  commandZone: "command",
  graveyard: "graveyard",
  exile: "exile",
  hand: "hand",
  stack: "stack",
  library_top: "library",
  revealed: "revealed",
};
/** Frame types that carry no game information. */
const NOISE = ["ping", "pong"];

// ---------------------------------------------------------------------------------------------

interface InstanceInfo {
  name?: string;
  ownerId?: string;
  zone?: string;
}

/** Incremental parser over one capture. Feed frames in order with `push`; read `games()` for
 *  every finished and current game, or `live()` for the game in progress. The extension calls
 *  `push` per frame; the server builds one per stored capture. */
export class GameTracker {
  private readonly meta: CaptureMeta;
  private readonly finished: ParsedGame[] = [];
  private current: ParsedGame | null = null;
  private lobbyView: LobbyView | null = null;
  private seq = 0;
  private round = 0;
  private activePlayerId = "";
  private instances: Record<string, InstanceInfo> = {};
  private lastT = 0;
  private myDeckId: string | undefined;
  /** Deck ids by player id, from any lobby event that names one. */
  private deckIds: Record<string, string> = {};

  constructor(meta: CaptureMeta) {
    this.meta = meta;
  }

  /** Feed one frame. Outgoing frames only count toward `eventCounts`; the server echoes every
   *  action back as an incoming event, so parsing both would double-count. */
  push(frame: RawFrame): void {
    if (!isObj(frame.data)) {
      return;
    }

    const msg = frame.data;
    const type = str(msg.type) ?? "unknown";
    if (NOISE.includes(type)) {
      return;
    }

    this.lastT = frame.t;
    const deckId = str(msg.deck_id);
    if (frame.dir === "out") {
      // The pilot picking a deck in the lobby is the one place the socket says which deck they play.
      if (deckId && (type === "set_lobby_deck" || type === "submit_deck")) {
        this.myDeckId = deckId;
      }
      if (this.current) {
        this.count(`out:${type}`);
      }
      return;
    }

    const deckPlayer = str(msg.player_id);
    if (deckId && deckPlayer) {
      this.deckIds[deckPlayer] = deckId;
    }

    if (type === "game_state") {
      this.onGameState(msg, frame.t);
      return;
    }

    if (type === "new_game_started" || type === "lobby_game_start") {
      this.closeCurrent("new_game", frame.t);
      this.openGame(frame.t, msg);
      return;
    }

    if (!this.current) {
      return;
    }

    this.count(type);
    this.onEvent(type, msg, frame.t);
  }

  /** Every game in the capture so far, the one in progress last (closed as `capture_end`). */
  games(): ParsedGame[] {
    if (!this.current) {
      return [...this.finished];
    }

    return [...this.finished, this.snapshot(this.current, "capture_end", this.lastT)];
  }

  /** The game in progress, or null in a lobby or after the last game ended. */
  live(): ParsedGame | null {
    return this.current ? this.snapshot(this.current, "capture_end", this.lastT) : null;
  }

  lobby(): LobbyView | null {
    return this.lobbyView;
  }

  // -------------------------------------------------------------------------------------------

  private isMe(playerId: string, username: string): boolean {
    const me = this.meta.me;
    if (!me || this.meta.spectator) {
      return false;
    }

    return me.id === playerId || me.username.toLowerCase() === username.toLowerCase();
  }

  private mode(): GameMode {
    if (this.meta.source === "solo") return "solo";
    if (this.meta.spectator) return "spectator";
    return "player";
  }

  private onGameState(msg: Json, t: number): void {
    const players = arr(msg.players).filter(isObj);
    const started = msg.game_started === true;
    const phase = str(msg.phase) ?? "";
    const round = num(msg.round_count) ?? 0;

    this.lobbyView = {
      roomId: this.meta.roomId,
      phase,
      updatedAt: t,
      players: players.map((p) => {
        const playerId = str(p.player_id) ?? "";
        const username = str(p.username) ?? "";
        return { playerId, username, lobbySeat: num(p.lobby_seat), isMe: this.isMe(playerId, username) };
      }),
    };

    if (!started) {
      // A lobby (or a room between games): a running game ended without a new-game event.
      if (this.current) {
        this.closeCurrent("new_game", t);
      }
      return;
    }

    // A game_state for a game already open is a resync or reconnect, unless the round count went
    // backwards, which only happens when a new game began while we weren't looking.
    if (this.current && round >= this.round) {
      this.seedFromState(msg, t, false);
      return;
    }

    if (this.current) {
      this.closeCurrent("new_game", t);
    }

    this.openGame(t, msg);
    this.seedFromState(msg, t, true);
  }

  private openGame(t: number, msg: Json): void {
    const index = this.finished.length;
    this.instances = {};
    this.seq = num(msg.turn_seq) ?? 0;
    this.round = num(msg.round_count) ?? 1;
    this.activePlayerId = str(msg.current_turn_player_id) ?? "";

    const lobby: Record<string, string> = {};
    for (const p of this.lobbyView?.players ?? []) {
      lobby[p.playerId] = p.username;
    }

    this.current = {
      gameId: `${this.meta.captureId}:${index}`,
      captureId: this.meta.captureId,
      roomId: this.meta.roomId,
      mode: this.mode(),
      startedAt: t,
      endedAt: t,
      joinedMidGame: false,
      firstRoundSeen: this.round,
      rounds: this.round,
      turnSeq: this.seq,
      players: [],
      turns: [],
      events: [],
      chat: [],
      eventCounts: {},
      endReason: "capture_end",
      lobby,
    };
  }

  /** Load players and zones from a full `game_state`. On the first state of a game this also
   *  records the starting point (life, commanders, mid-game join); on a resync it only refreshes
   *  zones and counts so nothing already tracked is lost. */
  private seedFromState(msg: Json, t: number, first: boolean): void {
    const game = this.current;
    if (!game) {
      return;
    }

    this.seq = num(msg.turn_seq) ?? this.seq;
    this.round = num(msg.round_count) ?? this.round;
    this.activePlayerId = str(msg.current_turn_player_id) ?? this.activePlayerId;
    game.startingPlayerId = str(msg.starting_player_id) ?? game.startingPlayerId;
    game.mulliganType = str(msg.mulligan_type) ?? game.mulliganType;

    if (first) {
      game.joinedMidGame = this.round > 1;
      game.firstRoundSeen = this.round;
      this.startTurn(t);
    }

    for (const p of arr(msg.players).filter(isObj)) {
      const playerId = str(p.player_id);
      if (!playerId) {
        continue;
      }

      const player = this.player(playerId, str(p.username) ?? "");
      player.lobbySeat = num(p.lobby_seat) ?? player.lobbySeat;
      player.status = str(p.status) ?? player.status;
      player.mulligans = num(p.mulligan_count) ?? player.mulligans;
      player.handCount = num(p.hand_count) ?? player.handCount;
      player.libraryCount = num(p.library_count) ?? player.libraryCount;
      player.commanderTax = num(p.commander_tax) ?? player.commanderTax;

      const life = num(p.life);
      if (life !== undefined) {
        if (first && player.lifeTimeline.length === 0) {
          player.startLife = life;
          player.minLife = life;
        }
        this.recordLife(player, life, t);
      }

      if (player.status === "eliminated" && player.eliminatedRound === undefined) {
        player.eliminatedRound = this.round;
        player.eliminatedSeq = this.seq;
      }

      for (const [key, zone] of Object.entries(ZONE_KEYS)) {
        for (const raw of arr(p[key])) {
          const card = readCard(raw);
          if (!card) {
            continue;
          }

          if (card.id) {
            this.instances[card.id] = { name: card.name, ownerId: card.ownerId ?? playerId, zone };
          }
          this.see(player, card, zone);
          if (zone === "command" && !player.commanders.some((c) => c.name === card.name)) {
            player.commanders.push(stripCard(card));
          }
        }
      }

      for (const raw of arr(isObj(p.commanders) ? Object.values(p.commanders) : p.commanders)) {
        const card = readCard(raw);
        if (card && !player.commanders.some((c) => c.name === card.name)) {
          player.commanders.push(stripCard(card));
        }
      }

      player.maxBattlefield = Math.max(player.maxBattlefield, arr(p.battlefield).length);
    }
  }

  private player(playerId: string, username: string): ParsedPlayer {
    const game = this.current;
    if (!game) {
      throw new Error("no game open");
    }

    const found = game.players.find((p) => p.playerId === playerId);
    if (found) {
      if (username && !found.username) {
        found.username = username;
        found.isMe = this.isMe(playerId, username);
      }
      return found;
    }

    const name = username || game.lobby[playerId] || "";
    const isMe = this.isMe(playerId, name);
    const created: ParsedPlayer = {
      playerId,
      username: name,
      isMe,
      deckId: this.deckIds[playerId] ?? (isMe ? this.myDeckId : undefined),
      commanders: [],
      startLife: 40,
      finalLife: 40,
      minLife: 40,
      lifeTimeline: [],
      stats: {},
      commanderDamageTaken: {},
      commanderTax: 0,
      commanderCasts: 0,
      mulligans: 0,
      status: "active",
      revived: 0,
      cards: {},
      landDrops: [],
      tokensCreated: 0,
      maxBattlefield: 0,
      turnsTaken: 0,
      chatMessages: 0,
      disconnects: 0,
    };
    game.players.push(created);
    return created;
  }

  private count(type: string): void {
    const counts = this.current?.eventCounts;
    if (counts) {
      counts[type] = (counts[type] ?? 0) + 1;
    }
  }

  private event(e: Omit<GameEvent, "seq" | "round">): void {
    this.current?.events.push({ seq: this.seq, round: this.round, ...e });
  }

  private recordLife(player: ParsedPlayer, life: number, t: number): void {
    const last = player.lifeTimeline[player.lifeTimeline.length - 1];
    if (last && last.life === life) {
      return;
    }

    player.lifeTimeline.push({ seq: this.seq, round: this.round, t, life });
    player.finalLife = life;
    player.minLife = Math.min(player.minLife, life);
  }

  private see(player: ParsedPlayer, card: CardRef & { isToken: boolean }, zone: string): CardSeen {
    const existing = player.cards[card.name];
    if (existing) {
      if (!existing.zonesVisited.includes(zone)) {
        existing.zonesVisited.push(zone);
      }
      existing.imageUri = existing.imageUri ?? card.imageUri;
      return existing;
    }

    const seen: CardSeen = {
      ...stripCard(card),
      firstSeenSeq: this.seq,
      firstSeenRound: this.round,
      firstZone: zone,
      timesPlayed: 0,
      playedRounds: [],
      timesPut: 0,
      drawnRounds: [],
      zonesVisited: [zone],
      isToken: card.isToken,
      onBattlefieldAtEnd: false,
    };
    player.cards[card.name] = seen;
    return seen;
  }

  private startTurn(t: number): void {
    const game = this.current;
    if (!game || !this.activePlayerId) {
      return;
    }

    const prev = game.turns[game.turns.length - 1];
    if (prev && prev.seq === this.seq) {
      return;
    }
    if (prev) {
      prev.endedAt = t;
    }

    game.turns.push({ seq: this.seq, round: this.round, playerId: this.activePlayerId, startedAt: t, played: {} });
    const active = game.players.find((p) => p.playerId === this.activePlayerId);
    if (active) {
      active.turnsTaken += 1;
    }
  }

  /** A card changed zones. Shared by `move_card`, `cards_moved` and the rest so "played" means
   *  the same thing whichever event carried it. */
  private moved(playerId: string, raw: unknown, from: string, to: string, t: number, instanceId?: string): void {
    const card = readCard(raw);
    const id = card?.id ?? instanceId;
    const known = id ? this.instances[id] : undefined;
    const name = card?.name ?? known?.name;
    const ownerId = card?.ownerId ?? known?.ownerId ?? playerId;

    if (id) {
      this.instances[id] = { name, ownerId, zone: to };
    }

    if (!name) {
      this.event({ t, kind: "move_hidden", playerId, from, to });
      return;
    }

    const player = this.player(ownerId, "");
    const seen = this.see(player, card ?? { name, typeLine: "", manaCost: "", isToken: false }, to);
    const isPlay = PLAY_SOURCES.includes(from) && PLAY_TARGETS.includes(to);

    if (isPlay) {
      seen.timesPlayed += 1;
      seen.playedRounds.push(this.round);

      if (from === "command") {
        player.commanderCasts += 1;
        // A solo playtest has no command-zone snapshot, so its first cast is how the commander is learnt.
        if (!player.commanders.some((c) => c.name === name)) {
          player.commanders.push(stripCard(seen));
        }
      }
      if (to === "battlefield" && /\bLand\b/.test(seen.typeLine)) {
        player.landDrops.push({ seq: this.seq, round: this.round, name });
      }

      const turn = this.current?.turns[this.current.turns.length - 1];
      if (turn) {
        (turn.played[ownerId] ??= []).push(name);
      }
      this.event({ t, kind: "play", playerId: ownerId, card: name, from, to });
    } else if (to === "battlefield") {
      seen.timesPut += 1;
      this.event({ t, kind: "put", playerId: ownerId, card: name, from, to });
    } else if (from === "library" && to === "hand") {
      seen.drawnRounds.push(this.round);
      this.event({ t, kind: "draw", playerId: ownerId, card: name, from, to });
    } else {
      this.event({ t, kind: "move", playerId: ownerId, card: name, from, to });
    }

    const onBoard = Object.values(this.instances).filter((i) => i.ownerId === ownerId && i.zone === "battlefield").length;
    player.maxBattlefield = Math.max(player.maxBattlefield, onBoard);
  }

  private onEvent(type: string, msg: Json, t: number): void {
    const playerId = str(msg.player_id) ?? "";
    const game = this.current;
    if (!game) {
      return;
    }

    switch (type) {
      case "turn_passed": {
        this.seq = num(msg.turn_seq) ?? this.seq + 1;
        this.round = num(msg.round_count) ?? this.round;
        this.activePlayerId = str(msg.new_turn_player_id) ?? this.activePlayerId;
        this.startTurn(t);
        this.event({ t, kind: "turn", playerId: this.activePlayerId, detail: str(msg.phase) });
        return;
      }
      case "phase_changed": {
        this.event({ t, kind: "phase", playerId: this.activePlayerId, detail: str(msg.phase) });
        return;
      }
      case "move_card": {
        this.moved(playerId, msg.card, zoneName(msg.from_zone), zoneName(msg.zone ?? msg.to_zone), t, str(msg.id));
        this.updateCounts(playerId, msg);
        return;
      }
      case "cards_moved": {
        const from = zoneName(msg.from_zone);
        const to = zoneName(msg.to_zone ?? msg.zone);
        const cards = arr(msg.cards);
        for (const raw of cards) {
          this.moved(playerId, raw, from, to, t);
        }
        const hiddenCount = (num(msg.count) ?? cards.length) - cards.length;
        if (hiddenCount > 0) {
          this.event({ t, kind: msg.drawn === true ? "draw_hidden" : "move_hidden", playerId, from, to, value: hiddenCount });
        }
        this.updateCounts(playerId, msg);
        return;
      }
      case "card_added_to_stack": {
        const card = readCard(msg.card);
        if (card) {
          this.see(this.player(card.ownerId ?? playerId, ""), card, "stack");
        }
        this.event({ t, kind: "stack", playerId, card: card?.name });
        return;
      }
      case "card_created":
      case "stack_copy_created": {
        const card = readCard(msg.token ?? msg.card);
        const owner = this.player(card?.ownerId ?? playerId, "");
        if (card) {
          if (card.id) {
            this.instances[card.id] = { name: card.name, ownerId: owner.playerId, zone: zoneName(card.zone) || "battlefield" };
          }
          this.see(owner, { ...card, isToken: true }, zoneName(card.zone) || "battlefield");
        }
        owner.tokensCreated += Math.max(1, num(msg.count) ?? 1);
        this.event({ t, kind: "token", playerId: owner.playerId, card: card?.name, value: num(msg.count) });
        return;
      }
      case "remove_card": {
        const id = str(msg.id) ?? str(msg.card_id);
        const known = id ? this.instances[id] : undefined;
        if (id) {
          delete this.instances[id];
        }
        this.event({ t, kind: "remove", playerId, card: known?.name });
        return;
      }
      case "set_player_stats": {
        const player = this.player(playerId, "");
        if (isObj(msg.commander_damage)) {
          for (const [sourceId, slots] of Object.entries(msg.commander_damage)) {
            const total = isObj(slots) ? Object.values(slots).reduce<number>((sum, v) => sum + (num(v) ?? 0), 0) : (num(slots) ?? 0);
            const before = player.commanderDamageTaken[sourceId] ?? 0;
            player.commanderDamageTaken[sourceId] = total;
            if (total !== before) {
              this.event({ t, kind: "commander_damage", playerId, value: total - before, detail: sourceId });
            }
          }
        }
        for (const [key, value] of Object.entries(msg)) {
          const n = num(value);
          if (n === undefined) {
            continue;
          }
          if (key === "life") {
            const before = player.finalLife;
            this.recordLife(player, n, t);
            this.event({ t, kind: "life", playerId, value: n - before, detail: String(n) });
          } else {
            player.stats[key] = n;
            this.event({ t, kind: "stat", playerId, value: n, detail: key });
          }
        }
        return;
      }
      case "set_commander_tax": {
        const player = this.player(playerId, "");
        const tax = num(msg.commander_tax) ?? num(msg.tax) ?? num(msg.value);
        if (tax !== undefined) {
          player.commanderTax = tax;
        }
        this.event({ t, kind: "commander_tax", playerId, value: tax });
        return;
      }
      case "mulligan": {
        const player = this.player(playerId, "");
        player.mulligans = num(msg.mulligan_count) ?? player.mulligans + 1;
        this.event({ t, kind: "mulligan", playerId, value: player.mulligans });
        return;
      }
      case "keep_hand": {
        this.event({ t, kind: "keep", playerId });
        return;
      }
      case "player_eliminated": {
        const player = this.player(playerId || str(msg.eliminated_player_id) || "", "");
        player.status = "eliminated";
        player.eliminatedRound = this.round;
        player.eliminatedSeq = this.seq;
        this.event({ t, kind: "eliminated", playerId: player.playerId });
        this.checkSurvivor(t);
        return;
      }
      case "player_revived": {
        const player = this.player(playerId, "");
        player.status = "active";
        player.revived += 1;
        player.eliminatedRound = undefined;
        player.eliminatedSeq = undefined;
        this.event({ t, kind: "revived", playerId });
        return;
      }
      case "chat_message_received": {
        const message = str(msg.message) ?? "";
        game.chat.push({ t, playerId, message });
        const player = game.players.find((p) => p.playerId === playerId);
        if (player) {
          player.chatMessages += 1;
        }
        return;
      }
      case "dice_rolled":
      case "planar_die_rolled": {
        this.event({ t, kind: "dice", playerId, value: num(msg.result) ?? num(msg.value), detail: str(msg.die) ?? str(msg.sides) });
        return;
      }
      case "player_disconnected": {
        const player = game.players.find((p) => p.playerId === playerId);
        if (player) {
          player.disconnects += 1;
        }
        this.event({ t, kind: "disconnect", playerId });
        return;
      }
      case "player_reconnected": {
        this.event({ t, kind: "reconnect", playerId });
        return;
      }
      case "library_shuffled": {
        this.event({ t, kind: "shuffle", playerId });
        this.updateCounts(playerId, msg);
        return;
      }
      default: {
        // Every other type (taps, arrows, counters, library views, pings) is counted in
        // eventCounts and kept in the raw frames, but has no field in the summary yet.
        return;
      }
    }
  }

  private updateCounts(playerId: string, msg: Json): void {
    const player = this.current?.players.find((p) => p.playerId === playerId);
    if (!player) {
      return;
    }

    player.handCount = num(msg.hand_count) ?? player.handCount;
    player.libraryCount = num(msg.library_count) ?? player.libraryCount;
  }

  private checkSurvivor(t: number): void {
    const game = this.current;
    if (!game || game.players.length < 2) {
      return;
    }

    const alive = game.players.filter((p) => p.status !== "eliminated");
    if (alive.length === 1) {
      game.survivorId = alive[0].playerId;
      this.closeCurrent("eliminations", t);
    }
  }

  private closeCurrent(reason: ParsedGame["endReason"], t: number): void {
    if (!this.current) {
      return;
    }

    this.finished.push(this.snapshot(this.current, reason, t));
    this.current = null;
  }

  /** A finished copy of the game: end time, end reason and which cards were still on the
   *  battlefield. Copies, so the live game keeps changing without touching earlier snapshots. */
  private snapshot(game: ParsedGame, reason: ParsedGame["endReason"], t: number): ParsedGame {
    const copy: ParsedGame = structuredClone(game);
    copy.endedAt = t;
    copy.endReason = reason;
    copy.rounds = this.round;
    copy.turnSeq = this.seq;
    copy.myDeckId = this.myDeckId;
    for (const p of copy.players) {
      p.deckId = p.deckId ?? this.deckIds[p.playerId] ?? (p.isMe ? this.myDeckId : undefined);
    }

    const last = copy.turns[copy.turns.length - 1];
    if (last && last.endedAt === undefined) {
      last.endedAt = t;
    }

    for (const info of Object.values(this.instances)) {
      if (info.zone !== "battlefield" || !info.name || !info.ownerId) {
        continue;
      }

      const card = copy.players.find((p) => p.playerId === info.ownerId)?.cards[info.name];
      if (card) {
        card.onBattlefieldAtEnd = true;
      }
    }
    return copy;
  }
}

function stripCard(card: CardRef): CardRef {
  const out: CardRef = { name: card.name, typeLine: card.typeLine, manaCost: card.manaCost };
  if (card.imageUri) out.imageUri = card.imageUri;
  if (card.cardPrintId) out.cardPrintId = card.cardPrintId;
  return out;
}

/** Parse a whole stored capture. */
export function parseCapture(meta: CaptureMeta, frames: RawFrame[]): ParsedGame[] {
  const tracker = new GameTracker(meta);
  for (const frame of frames) {
    tracker.push(frame);
  }
  return tracker.games();
}

/** Frames from a solo playtest come from the Event Log, not a socket. The extension converts each
 *  log entry into this shape so the same tracker reads it. See `soloLogToFrames`. */
export interface SoloLogEntry {
  id: string;
  playerId: string;
  message: string;
  timestamp: string;
  cardName?: string;
  cardId?: string;
  metadata?: Record<string, unknown>;
}

/** Translate Event Log entries into synthetic frames. The log names the card and both zones on
 *  every move, so moves map onto `move_card`; turn passes and life changes are read from the
 *  message text, the only place the log states them. */
export function soloLogToFrames(entries: SoloLogEntry[], players: { playerId: string; username: string; deckId?: string }[]): RawFrame[] {
  const frames: RawFrame[] = [];
  const first = entries[0];
  const t0 = first ? Date.parse(first.timestamp) : Date.now();
  for (const p of players) {
    if (p.deckId) {
      frames.push({ t: t0, dir: "in", data: { type: "lobby_deck_set", player_id: p.playerId, deck_id: p.deckId } });
    }
  }
  frames.push({
    t: t0,
    dir: "in",
    data: {
      type: "game_state",
      game_started: true,
      round_count: 1,
      turn_seq: 1,
      current_turn_player_id: players[0]?.playerId ?? "",
      players: players.map((p) => ({ player_id: p.playerId, username: p.username, life: 40, status: "active" })),
    },
  });

  let seq = 1;
  let round = 1;
  for (const e of entries) {
    const t = Date.parse(e.timestamp);
    const from = zoneName(e.metadata?.from_zone);
    const to = zoneName(e.metadata?.to_zone);

    if (e.cardName && from && to) {
      frames.push({
        t,
        dir: "in",
        data: { type: "move_card", player_id: e.playerId, from_zone: from, zone: to, card: { name: e.cardName, id: e.cardId, owner_id: e.playerId, type_line: "" } },
      });
      continue;
    }

    const life = /life (?:total )?(?:to|is now) (-?\d+)/i.exec(e.message);
    if (life) {
      frames.push({ t, dir: "in", data: { type: "set_player_stats", player_id: e.playerId, life: Number(life[1]) } });
      continue;
    }

    const pass = /^Turn passed to (.+)$/i.exec(e.message.trim());
    if (pass) {
      seq += 1;
      const next = players.find((p) => p.username === pass[1]) ?? players[(players.findIndex((p) => p.playerId === e.playerId) + 1) % Math.max(1, players.length)];
      if (next && next.playerId === players[0]?.playerId) {
        round += 1;
      }
      frames.push({ t, dir: "in", data: { type: "turn_passed", new_turn_player_id: next?.playerId ?? "", round_count: round, turn_seq: seq } });
      continue;
    }

    // EDHPlay's own lines come from "system"; only the turn pass above means anything for a seat.
    if (e.playerId === "system" || !e.playerId) {
      continue;
    }

    const drew = /^Drew (\d+) cards?$/i.exec(e.message.trim());
    if (drew) {
      frames.push({ t, dir: "in", data: { type: "cards_moved", player_id: e.playerId, from_zone: "library", to_zone: "hand", cards: [], count: Number(drew[1]), drawn: true } });
      continue;
    }

    if (/mulligan/i.test(e.message) && !/kept/i.test(e.message)) {
      frames.push({ t, dir: "in", data: { type: "mulligan", player_id: e.playerId } });
      continue;
    }

    frames.push({ t, dir: "in", data: { type: "log_message", player_id: e.playerId, message: e.message } });
  }
  return frames;
}
