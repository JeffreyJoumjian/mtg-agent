import { test, expect } from "bun:test";
import { GameTracker, type CaptureMeta } from "../scripts/lib/edhplay-parse.ts";
import { badgeFor, comboAlerts, liveKey, liveRequest, matchSeatsToDecks, panelView, showsFinishedGame } from "../apps/edhplay-lens/src/core.ts";
import type { Combo } from "../scripts/lib/spellbook.ts";

const ME = "11111111-1111-1111-1111-111111111111";
const OPP = "22222222-2222-2222-2222-222222222222";
const META: CaptureMeta = { captureId: "c", source: "ws", roomId: "r", spectator: false, pageUrl: "", startedAt: 0, me: { id: ME, username: "pilot" } };

test("playtest seats match the loaded deck holding most of what they played", () => {
  const decks = [
    { deckId: "squirrels", name: "Chatterfang", cards: ["Chatterfang, Squirrel General", "Skullclamp", "Forest"] },
    { deckId: "witch", name: "Scarlet Witch", cards: ["The Scarlet Witch", "Hex Magic", "Mountain", "Forest"] },
  ];
  const matched = matchSeatsToDecks({ seat1: ["Forest", "Skullclamp"], seat2: ["Mountain", "Hex Magic"], seat3: ["Island"] }, decks);
  expect(Object.fromEntries(Object.entries(matched).map(([seat, d]) => [seat, d.deckId]))).toEqual({ seat1: "squirrels", seat2: "witch" });
});

function liveTracker(): GameTracker {
  const t = new GameTracker(META);
  t.push({
    t: 1,
    dir: "in",
    data: {
      type: "game_state",
      game_started: true,
      round_count: 1,
      turn_seq: 1,
      current_turn_player_id: OPP,
      players: [
        { player_id: ME, username: "pilot", life: 40, commandZone: [{ name: "Chatterfang, Squirrel General", id: "c1", owner_id: ME, type_line: "Legendary Creature" }] },
        { player_id: OPP, username: "rival", life: 40, commandZone: [{ name: "Kotis, the Fangkeeper", id: "c2", owner_id: OPP, type_line: "Legendary Creature" }] },
      ],
    },
  });
  t.push({ t: 2, dir: "in", data: { type: "move_card", player_id: OPP, id: "o1", from_zone: "hand", zone: "battlefield", card: { name: "Sol Ring", id: "o1", owner_id: OPP, type_line: "Artifact" } } });
  t.push({ t: 3, dir: "in", data: { type: "move_card", player_id: OPP, id: "o2", from_zone: "hand", zone: "battlefield", card: { name: "Forest", id: "o2", owner_id: OPP, type_line: "Basic Land — Forest" } } });
  t.push({ t: 4, dir: "in", data: { type: "set_player_stats", player_id: ME, life: 35 } });
  return t;
}

test("the live request names the opponents and the non-basic cards each player has shown", () => {
  const t = liveTracker();
  const req = liveRequest(t.live(), t.lobby());
  expect(req).toEqual({
    players: ["rival"],
    revealed: [
      { username: "pilot", commanders: ["Chatterfang, Squirrel General"], cards: [] },
      { username: "rival", commanders: ["Kotis, the Fangkeeper"], cards: ["Sol Ring"] },
    ],
  });
  // The same table and cards in another order ask nothing new of the Workbench.
  expect(liveKey(req)).toEqual(liveKey({ ...req, revealed: [...req.revealed] }));
});

test("the panel view shows life, board and history for each seat", () => {
  const t = liveTracker();
  const view = panelView(t.live(), t.lobby(), {
    dossiers: [{ username: "rival", known: true, games: 2, theirWins: 1, myWins: 1, myLosses: 1, commanders: [{ name: "Kotis, the Fangkeeper", games: 2 }], topCards: [] }],
    combos: { rival: { included: [], almostIncluded: [] } },
  });
  expect(view.phase).toEqual("game");
  expect(view.activePlayer).toEqual("rival");
  expect(view.players.map((p) => [p.username, p.isMe, p.life, p.onBattlefield, p.cardsPlayed, p.landDrops, p.dossier?.games])).toEqual([
    ["pilot", true, 35, 0, 0, 0, undefined],
    ["rival", false, 40, 2, 2, 1, 2],
  ]);
  expect(view.players[0].lifeTrend).toEqual([40, 40, 35]);
  expect(view.recent.map((r) => r.card)).toEqual(["Forest", "Sol Ring"]);
});

test("a lobby with no game yet shows the seated players", () => {
  const t = new GameTracker(META);
  t.push({ t: 1, dir: "in", data: { type: "game_state", game_started: false, phase: "lobby", players: [{ player_id: ME, username: "pilot" }, { player_id: OPP, username: "rival" }] } });
  const view = panelView(t.live(), t.lobby(), null);
  expect(view.phase).toEqual("lobby");
  expect(view.players.map((p) => [p.username, p.isMe])).toEqual([
    ["pilot", true],
    ["rival", false],
  ]);
  expect(liveRequest(t.live(), t.lobby())).toEqual({ players: ["rival"], revealed: [] });
});

test("life change this round resets when the turn passes back to that seat", () => {
  const t = liveTracker();
  const deltas = () => {
    const view = panelView(t.live(), t.lobby(), null);
    return view.players.map((p) => [p.username, p.life, p.lifeDelta]);
  };
  // Round 1 is rival's turn. The pilot hasn't had a turn, so the change counts from the start.
  expect(deltas()).toEqual([
    ["pilot", 35, -5],
    ["rival", 40, 0],
  ]);

  // The pilot's turn starts: their counter resets, and rival's keeps running through it.
  t.push({ t: 5, dir: "in", data: { type: "turn_passed", new_turn_player_id: ME, turn_seq: 2, round_count: 1 } });
  t.push({ t: 6, dir: "in", data: { type: "set_player_stats", player_id: ME, life: 33 } });
  t.push({ t: 7, dir: "in", data: { type: "set_player_stats", player_id: OPP, life: 30 } });
  expect(deltas()).toEqual([
    ["pilot", 33, -2],
    ["rival", 30, -10],
  ]);

  // Back to rival: theirs resets, the pilot's still shows what happened since their own turn began.
  t.push({ t: 8, dir: "in", data: { type: "turn_passed", new_turn_player_id: OPP, turn_seq: 3, round_count: 2 } });
  t.push({ t: 9, dir: "in", data: { type: "set_player_stats", player_id: OPP, life: 32 } });
  expect(deltas()).toEqual([
    ["pilot", 33, -2],
    ["rival", 32, 2],
  ]);
  expect(panelView(t.live(), t.lobby(), null).activeIsMe).toEqual(false);
});

const combo = (id: string, cards: string[], popularity: number, missing: string[] = []): Combo => ({
  id,
  cards,
  produces: ["Infinite death triggers"],
  description: "",
  manaNeeded: "",
  bracketTag: "S",
  popularity,
  missing,
});

test("combo watch lists assembled combos first, then one card away, and skips the pilot's own seat in real games", () => {
  const players = [
    { username: "pilot", isMe: true, combos: { included: [combo("mine", ["A", "B"], 999)], almostIncluded: [] } },
    {
      username: "rival",
      isMe: false,
      combos: {
        included: [combo("full", ["Plunderer", "Altar", "Skullclamp"], 10)],
        almostIncluded: [
          combo("near-rare", ["X", "Y", "Z"], 5, ["Z"]),
          combo("near-popular", ["Plunderer", "Skullclamp", "Altar"], 50, ["Altar"]),
          combo("two-away", ["P", "Q", "R"], 100, ["Q", "R"]),
        ],
      },
    },
  ];
  const { alerts, more } = comboAlerts(players, "player");
  expect(alerts.map((a) => [a.level, a.username, a.shown, a.missing])).toEqual([
    ["assembled", "rival", ["Plunderer", "Altar", "Skullclamp"], []],
    ["one-away", "rival", ["Plunderer", "Skullclamp"], ["Altar"]],
    ["one-away", "rival", ["X", "Y"], ["Z"]],
  ]);
  expect(more).toEqual(0);

  // In a playtest every seat is one of the pilot's decks, so their own seat is watched too.
  expect(comboAlerts(players, "solo").alerts[0].username).toEqual("pilot");

  // More than four alerts: the rest are counted, not shown.
  const crowded = [{ username: "rival", isMe: false, combos: { included: ["a", "b", "c", "d", "e", "f"].map((id, i) => combo(id, [id], i)), almostIncluded: [] } }];
  const capped = comboAlerts(crowded, "player");
  expect(capped.alerts.map((a) => a.cards[0])).toEqual(["f", "e", "d", "c"]);
  expect(capped.more).toEqual(2);
});

test("the toolbar badge shows recording first, then records waiting for the Workbench", () => {
  expect(badgeFor(null, 0, "ok")).toEqual({ text: "", color: "" });
  expect(badgeFor("game", 0, "ok")).toEqual({ text: "REC", color: "#2f855a" });
  expect(badgeFor("playtest", 3, "down")).toEqual({ text: "TEST", color: "#b7791f" });
  expect(badgeFor(null, 3, "down")).toEqual({ text: "!", color: "#c53030" });
  // Queued records while the Workbench is up are about to send, so no alarm.
  expect(badgeFor(null, 3, "ok")).toEqual({ text: "", color: "" });
  expect(badgeFor(null, 0, "down")).toEqual({ text: "", color: "" });
});

test("the panel keeps a finished game up until the room closes, a new game starts or a rematch lobby arrives", () => {
  const finished = { endReason: "eliminations", endedAt: 5000 };
  const preGameLobby = { phase: "lobby", updatedAt: 1000 };
  const rematchLobby = { phase: "lobby", updatedAt: 6000 };
  expect(showsFinishedGame({ live: false, finished, roomOpen: true, lobby: preGameLobby })).toEqual(true);
  expect(showsFinishedGame({ live: false, finished, roomOpen: true, lobby: rematchLobby })).toEqual(false);
  expect(showsFinishedGame({ live: true, finished, roomOpen: true, lobby: null })).toEqual(false);
  expect(showsFinishedGame({ live: false, finished: null, roomOpen: false, lobby: null })).toEqual(false);
  expect(showsFinishedGame({ live: false, finished: { endReason: "new_game", endedAt: 5000 }, roomOpen: true, lobby: null })).toEqual(false);
  expect(showsFinishedGame({ live: false, finished: { endReason: "new_game", endedAt: 5000 }, roomOpen: false, lobby: rematchLobby })).toEqual(true);
});
