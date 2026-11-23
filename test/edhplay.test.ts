import { test, expect } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { GameTracker, parseCapture, soloLogToFrames, withoutChat, type CaptureMeta, type RawFrame } from "../scripts/lib/edhplay-parse.ts";
import { buildRecords, deckPerformance, fillTypeLines, matchups, meta, overview, playerSummaries, dossierFor, weekOf, type LocalListRef } from "../scripts/lib/edhplay-games.ts";
import { groupSessions, ingest, listCaptures, loadParsedGames, mergeStoredJson, readFrames, readLog, listDeckSnapshots } from "../scripts/lib/edhplay-store.ts";

// Player ids and shapes follow real EDHPlay frames (2026-11-21); names are made up.
const ME = "11111111-1111-1111-1111-111111111111";
const OPP = "22222222-2222-2222-2222-222222222222";
const META: CaptureMeta = {
  captureId: "cap1",
  source: "ws",
  roomId: "room1",
  spectator: false,
  pageUrl: "https://edhplay.com/games/room1",
  startedAt: 1000,
  me: { id: ME, username: "pilot" },
};

const card = (name: string, id: string, owner: string, zone: string, type_line = "Creature") => ({ name, type_line, mana_cost: "{1}", card_print_id: "p-" + id, id, zone, owner_id: owner, front_image_uri: `img/${id}` });

function frames(): RawFrame[] {
  let t = 1000;
  const f = (data: unknown, dir: "in" | "out" = "in"): RawFrame => ({ t: (t += 1000), dir, data });
  return [
    f({ type: "game_state", phase: "lobby", game_started: false, players: [{ player_id: ME, username: "pilot", lobby_seat: 0 }, { player_id: OPP, username: "rival", lobby_seat: 1 }] }),
    f({ type: "set_lobby_deck", deck_id: "deck-mine" }, "out"),
    f({
      type: "game_state",
      phase: "playing",
      game_started: true,
      round_count: 1,
      turn_seq: 1,
      current_turn_player_id: ME,
      starting_player_id: ME,
      mulligan_type: "commander",
      players: [
        { player_id: ME, username: "pilot", life: 40, status: "active", lobby_seat: 0, mulligan_count: 1, commandZone: [card("Chatterfang, Squirrel General", "cmd1", ME, "commandZone", "Legendary Creature — Squirrel Warrior")], hand: [card("Forest", "h1", ME, "hand", "Basic Land — Forest"), card("Skullclamp", "h2", ME, "hand", "Artifact — Equipment")], hand_count: 2, library_count: 92 },
        { player_id: OPP, username: "rival", life: 40, status: "active", lobby_seat: 1, mulligan_count: 0, commandZone: [card("Kotis, the Fangkeeper", "cmd2", OPP, "commandZone")], hand_count: 7, library_count: 92 },
      ],
    }),
    f({ type: "move_card", player_id: ME, from_player_id: ME, id: "h1", zone: "battlefield", from_zone: "hand", to: { x: 0.3, y: 0.9 }, hand_count: 1, card: card("Forest", "h1", ME, "battlefield", "Basic Land — Forest") }),
    f({ type: "cards_moved", player_id: OPP, from_zone: "library", to_zone: "hand", cards: [], count: 1, drawn: true, hand_count: 8, library_count: 91 }),
    f({ type: "turn_passed", new_turn_player_id: OPP, round_count: 1, turn_seq: 2, phase: "beginning" }),
    f({ type: "move_card", player_id: OPP, from_player_id: OPP, id: "o1", zone: "battlefield", from_zone: "hand", card: card("Sol Ring", "o1", OPP, "battlefield", "Artifact") }),
    f({ type: "card_created", player_id: OPP, token: { name: "Treasure", type_line: "Token Artifact — Treasure", mana_cost: "", id: "token-1", zone: "battlefield", owner_id: OPP, is_token: true } }),
    f({ type: "chat_message_received", player_id: OPP, message: "gl hf", timestamp: "2026-11-21T00:00:00Z", message_id: "m1" }),
    f({ type: "turn_passed", new_turn_player_id: ME, round_count: 2, turn_seq: 3, phase: "beginning" }),
    f({ type: "cards_moved", player_id: ME, from_zone: "library", to_zone: "hand", cards: [card("Lightning Greaves", "h3", ME, "hand", "Artifact — Equipment")], count: 1, drawn: true }),
    f({ type: "cards_moved", player_id: ME, to_zone: "battlefield", from_zone: "commandZone", cards: [card("Chatterfang, Squirrel General", "cmd1", ME, "battlefield", "Legendary Creature — Squirrel Warrior")] }),
    f({ type: "set_player_stats", player_id: OPP, previous_values: { life: 40, commander_damage: {} }, life: 37, commander_damage: { [ME]: { commander: 3 } } }),
    f({ type: "ping" }),
    f({ type: "player_eliminated", player_id: OPP }),
  ];
}

test("the tracker reads a two-player game: plays, draws, life, commander damage, tokens and the survivor", () => {
  const games = parseCapture(META, frames());
  expect(games.length).toEqual(1);

  const g = games[0];
  expect(g.mode).toEqual("player");
  expect(g.endReason).toEqual("eliminations");
  expect(g.rounds).toEqual(2);
  expect(g.survivorId).toEqual(ME);
  expect(g.myDeckId).toEqual("deck-mine");

  const me = g.players.find((p) => p.isMe);
  expect(me?.username).toEqual("pilot");
  expect(me?.mulligans).toEqual(1);
  expect(me?.commanderCasts).toEqual(1);
  expect(me?.landDrops).toEqual([{ seq: 1, round: 1, name: "Forest" }]);
  expect(me?.cards["Forest"].timesPlayed).toEqual(1);
  expect(me?.cards["Forest"].onBattlefieldAtEnd).toEqual(true);
  expect(me?.cards["Lightning Greaves"].drawnRounds).toEqual([2]);
  expect(me?.cards["Lightning Greaves"].timesPlayed).toEqual(0);
  expect(me?.cards["Skullclamp"].firstZone).toEqual("hand");
  expect(me?.cards["Chatterfang, Squirrel General"].playedRounds).toEqual([2]);
  expect(me?.deckId).toEqual("deck-mine");

  const opp = g.players.find((p) => p.playerId === OPP);
  expect(opp?.finalLife).toEqual(37);
  expect(opp?.minLife).toEqual(37);
  expect(opp?.commanderDamageTaken).toEqual({ [ME]: 3 });
  expect(opp?.tokensCreated).toEqual(1);
  expect(opp?.cards["Treasure"].isToken).toEqual(true);
  expect(opp?.cards["Sol Ring"].playedRounds).toEqual([1]);
  expect(opp?.eliminatedRound).toEqual(2);
  expect(opp?.commanders.map((c) => c.name)).toEqual(["Kotis, the Fangkeeper"]);

  expect(g.turns.map((t) => [t.seq, t.round, t.playerId])).toEqual([
    [1, 1, ME],
    [2, 1, OPP],
    [3, 2, ME],
  ]);
  expect(g.turns[1].played).toEqual({ [OPP]: ["Sol Ring"] });
  expect(g.events.filter((e) => e.kind === "draw_hidden")).toEqual([{ seq: 1, round: 1, t: 6000, kind: "draw_hidden", playerId: OPP, from: "library", to: "hand", value: 1 }]);
  expect(g.eventCounts["ping"]).toEqual(undefined);
});

test("a resync game_state keeps the game; a round count that goes backwards starts a new one", () => {
  const tracker = new GameTracker(META);
  for (const f of frames().slice(0, 7)) tracker.push(f);

  const state = (round: number) => ({ type: "game_state", game_started: true, round_count: round, turn_seq: round, current_turn_player_id: ME, players: [{ player_id: ME, username: "pilot", life: 30 }, { player_id: OPP, username: "rival", life: 40 }] });
  tracker.push({ t: 50_000, dir: "in", data: state(1) });
  expect(tracker.games().length).toEqual(1);
  expect(tracker.live()?.players.find((p) => p.isMe)?.finalLife).toEqual(30);

  tracker.push({ t: 60_000, dir: "in", data: { type: "turn_passed", new_turn_player_id: OPP, round_count: 3, turn_seq: 5 } });
  tracker.push({ t: 70_000, dir: "in", data: state(1) });
  const games = tracker.games();
  expect(games.length).toEqual(2);
  expect(games[0].endReason).toEqual("new_game");
  expect(games[1].gameId).toEqual("cap1:1");
});

test("a spectator capture never marks a seat as the pilot's", () => {
  const games = parseCapture({ ...META, spectator: true }, frames());
  expect(games[0].mode).toEqual("spectator");
  expect(games[0].players.some((p) => p.isMe)).toEqual(false);
});

test("a game started from the lobby takes its players, commanders and first turn from lobby_game_start", () => {
  // Real order (2026-11-23): the pilot joins a room whose lobby game_state doesn't name them yet,
  // a third player arrives with player_joined only, then lobby_game_start lists every seat in full.
  // No game_state follows, so that frame is the only place the names and commanders appear.
  const THIRD = "33333333-3333-3333-3333-333333333333";
  let t = 1000;
  const f = (data: unknown): RawFrame => ({ t: (t += 1000), dir: "in", data });
  const seat = (player_id: string, username: string, commander: string, lobby_seat: number) => ({
    player_id,
    username,
    life: 40,
    status: "active",
    lobby_seat,
    mulligan_count: 0,
    commanders: { commander: { name: commander, card_id: `c-${player_id}` } },
    commandZone: [card(commander, `c-${player_id}`, player_id, "commandZone", "Legendary Creature")],
    hand_count: 7,
    library_count: 92,
  });
  const games = parseCapture(META, [
    f({ type: "game_state", phase: "lobby", players: [{ player_id: OPP, username: "rival", lobby_seat: 0 }, { player_id: ME, username: null, lobby_seat: 1 }] }),
    f({ type: "player_joined", player_id: THIRD, lobby_seat: 2 }),
    f({
      type: "lobby_game_start",
      starting_player_id: OPP,
      turn_seq: 1,
      mulligan_type: "commander",
      players: [seat(OPP, "rival", "Kotis, the Fangkeeper", 0), seat(ME, "pilot", "Chatterfang, Squirrel General", 1), seat(THIRD, "third", "Lumra, Bellow of the Woods", 2)],
    }),
    f({ type: "move_card", player_id: OPP, from_player_id: OPP, id: "o1", zone: "battlefield", from_zone: "hand", card: card("Sol Ring", "o1", OPP, "battlefield", "Artifact") }),
  ]);

  const g = games[0];
  expect(g.players.map((p) => [p.username, p.isMe, p.commanders.map((c) => c.name)])).toEqual([
    ["rival", false, ["Kotis, the Fangkeeper"]],
    ["pilot", true, ["Chatterfang, Squirrel General"]],
    ["third", false, ["Lumra, Bellow of the Woods"]],
  ]);
  expect(g.startingPlayerId).toEqual(OPP);
  expect(g.turns.map((turn) => [turn.seq, turn.round, turn.playerId, turn.played])).toEqual([[1, 1, OPP, { [OPP]: ["Sol Ring"] }]]);
});

test("a game joined mid-way is flagged", () => {
  const games = parseCapture(META, [{ t: 1, dir: "in", data: { type: "game_state", game_started: true, round_count: 4, turn_seq: 13, current_turn_player_id: OPP, players: [{ player_id: OPP, username: "rival", life: 22 }] } }]);
  expect(games[0].joinedMidGame).toEqual(true);
  expect(games[0].firstRoundSeen).toEqual(4);
});

test("solo Event Log lines become frames the tracker can read", () => {
  const players = [
    { playerId: ME, username: "Player 1" },
    { playerId: OPP, username: "Player 2" },
  ];
  // Lines as EDHPlay's Event Log store holds them (2026-11-21): its own lines come from "system".
  const log = [
    { id: "0", playerId: "system", message: "New game started!\nPlayer 1 goes first\nMulligan type: commander", timestamp: "2026-11-21T00:00:00Z" },
    { id: "1", playerId: ME, message: "Played {card} from Hand", timestamp: "2026-11-21T00:00:01Z", cardName: "Forest", cardId: "c1", metadata: { from_zone: "hand", to_zone: "battlefield" } },
    { id: "1b", playerId: ME, message: "Played {card} from Commander", timestamp: "2026-11-21T00:00:01Z", cardName: "Chatterfang, Squirrel General", metadata: { from_zone: "commandZone", to_zone: "battlefield" } },
    { id: "2", playerId: "system", message: "Turn passed to Player 2", timestamp: "2026-11-21T00:00:02Z" },
    { id: "3", playerId: OPP, message: "Drew 1 card", timestamp: "2026-11-21T00:00:03Z" },
    { id: "4", playerId: OPP, message: "Updated Set life total to 35 (-5)", timestamp: "2026-11-21T00:00:04Z" },
    { id: "5", playerId: "system", message: "Turn passed to Player 1", timestamp: "2026-11-21T00:00:05Z" },
  ];
  const games = parseCapture({ ...META, source: "solo", me: { id: ME, username: "Player 1" } }, soloLogToFrames(log, players));
  const g = games[0];
  expect(g.mode).toEqual("solo");
  expect(g.rounds).toEqual(2);
  // The log carries no type lines, so the land drop only counts once the card cache fills them.
  expect(g.players.find((p) => p.playerId === ME)?.landDrops.length).toEqual(0);
  expect(g.players.find((p) => p.playerId === ME)?.cards["Forest"].timesPlayed).toEqual(1);
  const filled = fillTypeLines(g, { Forest: "Basic Land — Forest" });
  expect(filled.players.find((p) => p.playerId === ME)?.landDrops).toEqual([{ seq: 1, round: 1, name: "Forest" }]);
  expect(g.players.find((p) => p.playerId === ME)?.cards["Forest"].typeLine).toEqual("");
  expect(g.players.find((p) => p.playerId === OPP)?.finalLife).toEqual(35);
  expect(g.players.find((p) => p.playerId === ME)?.commanders.map((c) => c.name)).toEqual(["Chatterfang, Squirrel General"]);
  expect(g.players.find((p) => p.playerId === ME)?.commanderCasts).toEqual(1);
  expect(g.players.map((p) => p.playerId)).toEqual([ME, OPP]);
});

const MATCH = {
  id: "match-1",
  format: "commander",
  outcome: "completed",
  round_count: 2,
  started_at: "1970-01-01T00:00:02.000Z",
  ended_at: "1970-01-01T00:00:20.000Z",
  duration_seconds: 18,
  starting_seat: 0,
  winner_seat: 0,
  viewer_seat: 0,
  players: [
    { seat: 0, is_viewer: true, username: "pilot", eliminated: false, deck_id: "deck-mine", deck_name: "Squirrels", deck_is_precon: false, deck_bracket: 3, commanders: [{ name: "Chatterfang, Squirrel General", image_uri: "x" }], life: 40, poison: 0, mulligan_count: 1 },
    { seat: 1, is_viewer: false, username: "rival", eliminated: true, eliminated_at_round: 2, deck_id: "deck-opp", deck_name: "KOTIS", deck_is_precon: true, deck_bracket: 4, commanders: [{ name: "Kotis, the Fangkeeper", image_uri: "y" }], life: 0, poison: 0, mulligan_count: 0 },
  ],
};
const OLD_MATCH = {
  ...MATCH,
  id: "match-old",
  started_at: "1969-12-31T00:00:00.000Z",
  ended_at: "1969-12-31T00:30:00.000Z",
  winner_seat: 1,
};
const LIST: LocalListRef = { slug: "chatterfang", deckName: "Chatterfang", listId: "main", label: "Main", edhplayId: "deck-mine", cards: ["Chatterfang, Squirrel General", "Forest", "Skullclamp", "Lightning Greaves", "Pitiless Plunderer"] };

test("a match spanning a restart links to the game that was played, so its result counts once", () => {
  // Real case (2026-11-22): EDHPlay kept one match while the table restarted after round 1, so the
  // capture holds a one-round false start and then the real game inside that match's time span.
  const seats = [
    { player_id: ME, username: "pilot", life: 40, status: "active", lobby_seat: 0 },
    { player_id: OPP, username: "rival", life: 40, status: "active", lobby_seat: 1 },
  ];
  const start = (t: number): RawFrame => ({ t, dir: "in", data: { type: "lobby_game_start", starting_player_id: ME, turn_seq: 1, players: seats } });
  const games = parseCapture(META, [
    start(2000),
    start(4000),
    { t: 8000, dir: "in", data: { type: "turn_passed", new_turn_player_id: OPP, round_count: 1, turn_seq: 2 } },
    { t: 12_000, dir: "in", data: { type: "turn_passed", new_turn_player_id: ME, round_count: 2, turn_seq: 3 } },
    { t: 19_000, dir: "in", data: { type: "player_eliminated", player_id: OPP } },
  ]);
  expect(games.map((g) => [g.gameId, g.endReason])).toEqual([
    ["cap1:0", "new_game"],
    ["cap1:1", "eliminations"],
  ]);

  const { records } = buildRecords({ captures: [{ games }], matches: [MATCH], lists: [LIST] });
  expect(records.map((r) => [r.id, r.gameId, r.result])).toEqual([
    ["g:cap1:0", "cap1:0", "unknown"],
    ["m:match-1", "cap1:1", "win"],
  ]);
});

test("buildRecords links a captured game to its match and keeps unseen matches as match-only records", () => {
  const { records, parsed } = buildRecords({ captures: [{ games: parseCapture(META, frames()) }], matches: [MATCH, OLD_MATCH], lists: [LIST] });
  expect(records.map((r) => [r.id, r.source, r.result, r.winner])).toEqual([
    ["m:match-1", "both", "win", "pilot"],
    ["m:match-old", "match", "loss", "rival"],
  ]);

  const linked = records[0];
  expect(linked.myDeck).toEqual({ deckId: "deck-mine", deckName: "Squirrels", slug: "chatterfang", listId: "main", listLabel: "Main" });
  expect(linked.startingPlayer).toEqual("pilot");
  expect(linked.players.find((p) => p.username === "rival")).toEqual({
    username: "rival",
    playerId: OPP,
    seat: 1,
    isMe: false,
    isWinner: false,
    commanders: [{ name: "Kotis, the Fangkeeper", imageUri: "y" }],
    deckId: "deck-opp",
    deckName: "KOTIS",
    deckBracket: 4,
    deckIsPrecon: true,
    finalLife: 0,
    poison: 0,
    eliminatedRound: 2,
    mulligans: 0,
    departure: undefined,
    cardsPlayed: 1,
    cardsSeen: 3,
    landDrops: 0,
    commanderCasts: 0,
    tokensCreated: 1,
  });
  expect(Object.keys(parsed)).toEqual(["cap1:0"]);

  const o = overview(records);
  expect(o.record).toEqual({ games: 2, wins: 1, losses: 1, unknown: 0, winRate: 0.5 });
  expect(o.captured).toEqual(1);
  expect(o.matchOnly).toEqual(1);
  expect(o.firstPlayerWinRate).toEqual(0.5);
  expect(o.avgCommanderRound).toEqual(null);
  expect(overview(records, parsed).avgCommanderRound).toEqual(2);
  expect(o.avgMulligans).toEqual(1);
  expect(o.playersMet).toEqual(1);
  expect(o.playersMetAgain).toEqual(1);

  expect(matchups(records)).toEqual([{ commander: "Kotis, the Fangkeeper", imageUri: "y", record: { games: 2, wins: 1, losses: 1, unknown: 0, winRate: 0.5 } }]);
});

test("deckPerformance counts plays, draws and never-played cards per captured game", () => {
  const capture = (id: string) => ({ games: parseCapture({ ...META, captureId: id }, frames()) });
  const { records, parsed } = buildRecords({ captures: [capture("a"), capture("b"), capture("c")], matches: [], me: "pilot", lists: [LIST] });
  const perf = deckPerformance("deck-mine", records, parsed, LIST);

  expect(perf.record).toEqual({ games: 3, wins: 3, losses: 0, unknown: 0, winRate: 1 });
  expect(perf.capturedGames).toEqual(3);
  expect(perf.commander).toEqual({ avgFirstCastRound: 2, castInGames: 3, avgCasts: 1 });
  expect(perf.landsByRound.slice(0, 3)).toEqual([
    { round: 1, avgLands: 1 },
    { round: 2, avgLands: 1 },
    { round: 3, avgLands: null },
  ]);

  const byName = Object.fromEntries(perf.cards.map((c) => [c.name, [c.seen, c.drawn, c.played, c.neverPlayed]]));
  expect(byName).toEqual({
    "Chatterfang, Squirrel General": [3, 0, 3, false],
    Forest: [3, 0, 3, false],
    "Lightning Greaves": [3, 3, 0, true],
    Skullclamp: [3, 0, 0, true],
    "Pitiless Plunderer": [0, 0, 0, true],
  });
});

test("meta, player summaries and the live dossier read the opponents' side", () => {
  const { records, parsed } = buildRecords({ captures: [{ games: parseCapture(META, frames()) }], matches: [MATCH], lists: [LIST] });
  const m = meta(records, parsed, { "Sol Ring": { roles: ["ramp"], colorIdentity: [], typeLine: "Artifact", cmc: 1, gameChanger: false }, "Kotis, the Fangkeeper": { roles: [], colorIdentity: ["U", "B", "R"], typeLine: "", cmc: 4, gameChanger: false } }, { includeSpectated: false });
  expect(m.commanders).toEqual([{ name: "Kotis, the Fangkeeper", imageUri: "y", seats: 1, wins: 0, players: ["rival"], identity: "UBR", myWins: 1, myLosses: 0 }]);
  expect(m.brackets).toEqual([{ bracket: "4", seats: 1 }]);
  expect(m.preconShare).toEqual(1);
  expect(m.cards.map((c) => [c.name, c.games, c.played])).toEqual([["Sol Ring", 1, 1]]);
  expect(m.rolesPerSeat).toEqual([{ role: "ramp", perSeat: 1 }]);

  const summaries = playerSummaries(records, parsed);
  expect(summaries.map((s) => [s.username, s.games, s.theirWins, s.myWins, s.myLosses])).toEqual([["rival", 1, 0, 1, 0]]);
  expect(summaries[0].topCards).toEqual([{ name: "Sol Ring", games: 1, played: 1 }]);

  expect(dossierFor("RIVAL", summaries, { rival: { note: "loves Sol Ring", tags: ["combo"] } })).toEqual({
    username: "RIVAL",
    known: true,
    games: 1,
    theirWins: 0,
    myWins: 1,
    myLosses: 0,
    lastSeen: 2000,
    commanders: [{ name: "Kotis, the Fangkeeper", games: 1 }],
    topCards: [{ name: "Sol Ring", games: 1, played: 1 }],
    note: "loves Sol Ring",
    tags: ["combo"],
  });
});

test("the store appends frames once per index, dedupes deck snapshots and parses captures back", async () => {
  const dir = await mkdtemp(join(tmpdir(), "edhplay-"));
  try {
    const fs = frames().map((f, i) => ({ ...f, i }));
    await ingest({ kind: "capture", meta: META, frames: fs.slice(0, 5) }, dir);
    // A retried batch overlapping the first must not duplicate frames 3 and 4.
    await ingest({ kind: "capture", meta: META, frames: fs.slice(3) }, dir);
    const stored = await readFrames("cap1", "games", dir);
    // Frame 8 is the opponent's "gl hf" chat line, which never reaches disk.
    expect(stored.map((f) => f.i)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14]);

    const captures = await listCaptures("games", dir);
    expect(captures.map((c) => [c.captureId, c.frameCount, c.lastIndex])).toEqual([["cap1", 14, 14]]);

    await ingest({ kind: "deck", deckId: "deck-opp", fetchedAt: 1, deck: { cards: [] }, reason: "opponent" }, dir);
    await ingest({ kind: "deck", deckId: "deck-opp", fetchedAt: 2, deck: { cards: [] }, reason: "opponent" }, dir);
    await ingest({ kind: "deck", deckId: "deck-opp", fetchedAt: 3, deck: { cards: [{ name: "Sol Ring" }] }, reason: "opponent" }, dir);
    expect((await listDeckSnapshots("deck-opp", dir)).map((s) => s.fetchedAt)).toEqual([1, 3]);

    const parsed = await loadParsedGames("games", dir);
    expect(parsed.map((p) => p.games.map((g) => g.gameId))).toEqual([["cap1:0"]]);

    await expect(ingest({ kind: "capture_end", captureId: "../escape", endedAt: 1 }, dir)).rejects.toThrow("isn't a safe file name");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("playtests are stored apart from real games and never reach real-game stats", async () => {
  const dir = await mkdtemp(join(tmpdir(), "edhplay-"));
  try {
    const solo: CaptureMeta = { ...META, captureId: "solo1", source: "solo", me: { id: ME, username: "Player 1" }, players: [{ playerId: ME, username: "Player 1", deckId: "deck-mine" }, { playerId: OPP, username: "Player 2", deckId: "deck-other" }] };
    const log = [{ i: 0, id: "1", playerId: ME, message: "Played {card} from Hand", timestamp: "2026-11-21T00:00:01Z", channel: "event", cardName: "Skullclamp", cardId: "c1", metadata: { from_zone: "hand", to_zone: "battlefield" } }];
    await ingest({ kind: "capture", meta: solo, frames: [], log }, dir);
    await ingest({ kind: "capture", meta: META, frames: frames().map((f, i) => ({ ...f, i })) }, dir);

    expect((await listCaptures("games", dir)).map((c) => c.captureId)).toEqual(["cap1"]);
    expect((await listCaptures("playtests", dir)).map((c) => c.captureId)).toEqual(["solo1"]);

    const real = buildRecords({ captures: await loadParsedGames("games", dir), matches: [], me: "pilot", lists: [LIST] });
    expect(real.records.map((r) => r.mode)).toEqual(["player"]);
    expect(overview(real.records).solo).toEqual(0);

    const tests = buildRecords({ captures: await loadParsedGames("playtests", dir), matches: [], me: "pilot", lists: [LIST] });
    expect(tests.records.map((r) => [r.mode, r.result])).toEqual([["solo", "solo"]]);
    expect(overview(tests.records).record.games).toEqual(0);

    const perf = deckPerformance("deck-mine", tests.records, tests.parsed, LIST, "solo");
    expect(perf.capturedGames).toEqual(1);
    expect(perf.cards.find((c) => c.name === "Skullclamp")?.played).toEqual(1);
    expect(deckPerformance("deck-mine", tests.records, tests.parsed, LIST).capturedGames).toEqual(0);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("a reconnect mid-game is one game, not two, and an open capture counts as in progress", async () => {
  const dir = await mkdtemp(join(tmpdir(), "edhplay-"));
  try {
    const all = frames();
    // The socket drops after the first turn pass and a new one opens 30 seconds later, starting
    // with a fresh game_state for the same game (round 1, pilot at 38 life).
    const first = all.slice(0, 7).map((f, i) => ({ ...f, i }));
    const resync = {
      type: "game_state",
      game_started: true,
      round_count: 1,
      turn_seq: 2,
      current_turn_player_id: OPP,
      players: [
        { player_id: ME, username: "pilot", life: 38 },
        { player_id: OPP, username: "rival", life: 40 },
      ],
    };
    const t0 = all[6].t + 30_000;
    const second = [{ t: t0, dir: "in" as const, data: resync }, ...all.slice(7).map((f) => ({ ...f, t: f.t + 31_000 }))].map((f, i) => ({ ...f, i }));

    await ingest({ kind: "capture", meta: META, frames: first }, dir);
    await ingest({ kind: "capture_end", captureId: "cap1", endedAt: all[6].t }, dir);
    await ingest({ kind: "capture", meta: { ...META, captureId: "cap2", startedAt: t0 }, frames: second }, dir);

    const sessions = await loadParsedGames("games", dir);
    expect(sessions.map((s) => [s.captureIds, s.inProgress, s.games.length])).toEqual([[["cap1", "cap2"], true, 1]]);

    const { records } = buildRecords({ captures: sessions, matches: [], me: "pilot", lists: [LIST] });
    expect(records.map((r) => [r.result, r.inProgress, r.captureIds])).toEqual([["win", undefined, ["cap1", "cap2"]]]);
    expect(records[0].players.find((p) => p.username === "pilot")?.finalLife).toEqual(38);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("captures in the same room more than 15 minutes apart are separate sittings", () => {
  const meta = (captureId: string, startedAt: number, endedAt: number) => ({ ...META, captureId, startedAt, endedAt, lastIndex: 0, lastLogIndex: -1, frameCount: 1, updatedAt: endedAt });
  const groups = groupSessions([meta("a", 0, 60_000), meta("b", 120_000, 200_000), meta("c", 200_000 + 16 * 60_000, 2_000_000)]);
  expect(groups.map((g) => g.map((m) => m.captureId))).toEqual([["a", "b"], ["c"]]);
});

test("a game with a winner but no seat for the pilot is unknown, not a loss", () => {
  const stranger: CaptureMeta = { ...META, me: { id: "someone-else", username: "nobody" } };
  const { records } = buildRecords({ captures: [{ games: parseCapture(stranger, frames()) }], matches: [], lists: [] });
  expect(records.map((r) => [r.result, r.winner])).toEqual([["unknown", "pilot"]]);
});

test("a commander faced twice in one game counts that game once, and spectated wins don't count as theirs", () => {
  const seat = (username: string, isMe: boolean, isWinner: boolean) => ({ username, isMe, isWinner, commanders: [{ name: "Kotis, the Fangkeeper" }] });
  const base = { source: "match" as const, endedAt: 2, durationSec: 0, rounds: 5, joinedMidGame: false };
  const records = [
    { ...base, id: "m:a", mode: "player" as const, startedAt: 2, result: "win" as const, players: [seat("pilot", true, true), seat("rival", false, false), seat("twin", false, false)] },
    { ...base, id: "m:b", mode: "spectator" as const, startedAt: 1, result: "spectated" as const, players: [seat("rival", false, true), seat("other", false, false)] },
  ];

  const m = meta(records, {}, {}, { includeSpectated: false });
  expect(m.commanders.map((c) => [c.name, c.seats, c.myWins, c.myLosses])).toEqual([["Kotis, the Fangkeeper", 2, 1, 0]]);

  const rival = playerSummaries(records, {}).find((s) => s.username === "rival");
  expect([rival?.games, rival?.theirWins, rival?.spectated]).toEqual([1, 0, 1]);
});

test("weeks start on Monday in Bucharest time", () => {
  // Monday 2026-11-16 01:30 in Bucharest is Sunday 23:30 UTC.
  expect(weekOf(Date.parse("2026-11-15T23:30:00Z"))).toEqual("2026-11-16");
  expect(weekOf(Date.parse("2026-11-15T21:30:00Z"))).toEqual("2026-11-09");
  expect(weekOf(Date.parse("2026-11-22T12:00:00Z"))).toEqual("2026-11-16");
});

test("chat never survives: chat frames are dropped and chat keys are stripped at any depth", () => {
  expect(withoutChat({ type: "chat_message_received", player_id: OPP, message: "gl hf" })).toEqual(null);
  expect(withoutChat({ type: "send_chat", message: "ty" })).toEqual(null);
  expect(
    withoutChat({
      type: "game_state",
      chat_messages: [{ message: "gl hf" }],
      room: { communication_preference: "chat_only", chatHistory: ["hi"] },
      players: [{ username: "rival", life: 40, chatMessages: 3 }],
    }),
  ).toEqual({ type: "game_state", room: { communication_preference: "chat_only" }, players: [{ username: "rival", life: 40 }] });
  expect(withoutChat({ type: "move_card", id: "h1" })).toEqual({ type: "move_card", id: "h1" });
});

test("the store drops chat lines from the Event Log and from an older extension's frames", async () => {
  const dir = await mkdtemp(join(tmpdir(), "edhplay-"));
  try {
    const log = [
      { i: 0, id: "e1", playerId: ME, message: "Played {card}", timestamp: "2026-11-21T00:00:01Z", channel: "event", cardName: "Forest" },
      { i: 1, id: "c1", playerId: OPP, message: "gl hf", timestamp: "2026-11-21T00:00:02Z", channel: "chat" },
    ];
    await ingest({ kind: "capture", meta: META, frames: frames().map((f, i) => ({ ...f, i })), log }, dir);
    const [storedFrames, storedLog] = await Promise.all([readFrames("cap1", "games", dir), readLog("cap1", "games", dir)]);
    const stored = JSON.stringify([storedFrames, storedLog]);
    expect(stored.includes("gl hf")).toEqual(false);
    expect(stored.includes("Played {card}")).toEqual(true);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("a sync conflict keeps the newer stamped file and merges player notes by username", () => {
  expect(mergeStoredJson({ fetchedAt: 2, match: { id: "a" } }, { fetchedAt: 3, match: { id: "b" } })).toEqual({ fetchedAt: 3, match: { id: "b" } });
  expect(mergeStoredJson({ updatedAt: 9, lastIndex: 40 }, { updatedAt: 5, lastIndex: 12 })).toEqual({ updatedAt: 9, lastIndex: 40 });
  expect(
    mergeStoredJson(
      { alice: { note: "plays stax", tags: [], updatedAt: 100 }, carol: { note: "", tags: ["salty"], updatedAt: 10 } },
      { alice: { note: "old", tags: [], updatedAt: 50 }, bob: { note: "combo", tags: [], updatedAt: 60 } },
    ),
  ).toEqual({
    alice: { note: "plays stax", tags: [], updatedAt: 100 },
    carol: { note: "", tags: ["salty"], updatedAt: 10 },
    bob: { note: "combo", tags: [], updatedAt: 60 },
  });
  expect(mergeStoredJson({ a: 1 }, { a: 2 })).toEqual(null);
  expect(mergeStoredJson([1], [2])).toEqual(null);
});
