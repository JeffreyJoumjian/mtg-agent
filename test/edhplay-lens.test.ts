import { test, expect } from "bun:test";
import { GameTracker, type CaptureMeta } from "../scripts/lib/edhplay-parse.ts";
import { liveKey, liveRequest, matchSeatsToDecks, panelView } from "../apps/edhplay-lens/src/core.ts";

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
