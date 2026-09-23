import { test, expect } from "bun:test";
import { computeStats, diffStats, identityOf, type CardInfo } from "../scripts/lib/deck-stats.ts";
import type { CardMeta, DeckList } from "../scripts/lib/deck-model.ts";

const card = (over: Partial<CardInfo> & { name: string }): CardInfo => ({
  cmc: 0,
  manaCost: "",
  typeLine: "",
  colors: [],
  colorIdentity: [],
  producedMana: [],
  gameChanger: false,
  usd: null,
  commanderLegal: "legal",
  ...over,
});

const cards: Record<string, CardInfo | undefined> = {
  Zed: card({ name: "Zed", cmc: 2, manaCost: "{B}{G}", typeLine: "Legendary Creature — Squirrel", colors: ["B", "G"], colorIdentity: ["B", "G"], usd: 2 }),
  Forest: card({ name: "Forest", typeLine: "Basic Land — Forest", colorIdentity: ["G"], producedMana: ["G"], usd: 0.1 }),
  "Command Tower": card({ name: "Command Tower", typeLine: "Land", producedMana: ["W", "U", "B", "R", "G"], usd: 0.5 }),
  "Sol Ring": card({ name: "Sol Ring", cmc: 1, manaCost: "{1}", typeLine: "Artifact", producedMana: ["C"], usd: 1 }),
  Skullclamp: card({ name: "Skullclamp", cmc: 1, manaCost: "{1}", typeLine: "Artifact — Equipment", usd: 2 }),
  "Blood Artist": card({ name: "Blood Artist", cmc: 2, manaCost: "{1}{B}", typeLine: "Creature — Vampire", colors: ["B"], colorIdentity: ["B"], usd: 1.5 }),
};

const meta: Record<string, CardMeta> = {
  "Blood Artist": { status: "OWNED", tags: ["drain", "aristocrat"] },
  Zed: { tags: ["engine"] },
};

const list = (): DeckList => ({
  label: "Main",
  kind: "deck",
  sections: [
    { name: "Commander", cards: [{ name: "Zed", qty: 1 }] },
    { name: "Lands", cards: [{ name: "Forest", qty: 2 }, { name: "Command Tower", qty: 1 }] },
    { name: "Ramp", cards: [{ name: "Sol Ring", qty: 1 }] },
    { name: "Card Draw", cards: [{ name: "Skullclamp", qty: 1 }] },
    { name: "Theme", cards: [{ name: "Blood Artist", qty: 1 }, { name: "Unknown Card", qty: 1 }] },
  ],
});

test("identityOf is the union of the commanders' identities in WUBRG order", () => {
  expect(identityOf(list(), cards)).toEqual(["B", "G"]);
});

test("computeStats: size, curve, types", () => {
  const s = computeStats(list(), cards, meta);
  expect(s.size).toEqual({ total: 8, target: 100, lands: 3, nonland: 5, commanders: 1 });
  expect(s.curve.avgMv).toEqual(1.5);
  expect(s.curve.avgMvNonZero).toEqual(1.5);
  expect(s.curve.histogram.find((h) => h.mv === "1")).toEqual({ mv: "1", creature: 0, noncreature: 2 });
  expect(s.curve.histogram.find((h) => h.mv === "2")).toEqual({ mv: "2", creature: 2, noncreature: 0 });
  expect(s.curve.histogram.map((h) => h.mv)).toEqual(["0", "1", "2", "3", "4", "5", "6", "7+"]);
  expect(s.types).toEqual({ creature: 2, instant: 0, sorcery: 0, artifact: 2, enchantment: 0, planeswalker: 0, battle: 0, land: 3 });
});

test("computeStats: colour pips and sources, roles and tags", () => {
  const s = computeStats(list(), cards, meta);
  expect(s.color.identity).toEqual(["B", "G"]);
  expect(s.color.pips).toEqual({ W: 0, U: 0, B: 2, R: 0, G: 1 });
  expect(s.color.sources).toEqual({ W: 1, U: 1, B: 1, R: 1, G: 3 });
  expect(s.roles.sections).toEqual({ Commander: 1, Lands: 3, Ramp: 1, "Card Draw": 1, Theme: 2 });
  expect(s.roles.tags).toEqual({ drain: 1, aristocrat: 1, engine: 1 });
});

test("computeStats: hybrid and phyrexian pips count each colour once", () => {
  const hybrid: Record<string, CardInfo | undefined> = {
    ...cards,
    Hy: card({ name: "Hy", cmc: 2, manaCost: "{W/U}{G/P}", typeLine: "Instant" }),
  };
  const l = list();
  l.sections[3].cards.push({ name: "Hy", qty: 1 });
  expect(computeStats(l, hybrid, meta).color.pips).toEqual({ W: 1, U: 1, B: 2, R: 0, G: 2 });
});

test("computeStats: flags", () => {
  const withProblems: Record<string, CardInfo | undefined> = {
    ...cards,
    Skullclamp: card({ name: "Skullclamp", cmc: 1, manaCost: "{1}", typeLine: "Artifact", gameChanger: true, commanderLegal: "banned", usd: 2 }),
    Forest: card({ name: "Forest", typeLine: "Basic Land — Forest", colorIdentity: ["G"], producedMana: ["G"] }),
    "Blood Artist": card({ name: "Blood Artist", cmc: 2, manaCost: "{1}{R}", typeLine: "Creature", colors: ["R"], colorIdentity: ["R"] }),
  };
  const l = list();
  l.sections[2].cards[0].qty = 2;
  const s = computeStats(l, withProblems, meta);
  expect(s.flags).toEqual({
    gameChangers: ["Skullclamp"],
    offIdentity: ["Blood Artist"],
    illegal: ["Skullclamp"],
    unresolved: ["Unknown Card"],
    duplicates: ["Sol Ring"],
  });
});

test("computeStats: money by status, copies counted, unresolved excluded", () => {
  const s = computeStats(list(), cards, meta);
  expect(s.money.total).toBeCloseTo(7.2, 5);
  expect(s.money.byStatus.OWNED).toEqual({ count: 1, usd: 1.5 });
  expect(s.money.byStatus.PROXY.count).toEqual(6);
  expect(s.money.byStatus.PROXY.usd).toBeCloseTo(5.7, 5);
  expect(s.money.byStatus.BUY).toEqual({ count: 0, usd: 0 });
});

test("pool lists have no target", () => {
  expect(computeStats({ ...list(), kind: "pool" }, cards, meta).size.target).toEqual(null);
});

test("diffStats returns only the rows that changed, with signed deltas", () => {
  const before = computeStats(list(), cards, meta);
  const l = list();
  l.sections[4].cards = [{ name: "Unknown Card", qty: 1 }];
  l.sections[2].cards[0].qty = 2;
  const after = computeStats(l, cards, meta);
  const changes = diffStats(before, after);

  const byKey = Object.fromEntries(changes.map((c) => [c.key, c]));
  expect(byKey["tags.drain"]).toEqual({ group: "tags", key: "tags.drain", label: "drain", before: 1, after: 0, delta: -1 });
  expect(byKey["curve.avgMv"]).toEqual({ group: "curve", key: "curve.avgMv", label: "Avg MV", before: 1.5, after: 1.25, delta: -0.25 });
  expect(byKey["flags.duplicates"]).toEqual({ group: "flags", key: "flags.duplicates", label: "Duplicates", before: 0, after: 1, delta: 1 });
  expect(byKey["types.creature"].delta).toEqual(-1);
  expect(byKey["size.total"]).toBeUndefined();
  expect(byKey["size.lands"]).toBeUndefined();
  expect(changes.some((c) => c.delta === 0)).toEqual(false);
});

test("diffStats keeps rows in group order even when a role or tag exists only on one side", () => {
  const before = computeStats(list(), cards, meta);
  const l = list();
  l.sections.push({ name: "Finishers", cards: [{ name: "Sol Ring", qty: 1 }] });
  l.sections[2].cards = [];
  l.sections[4].cards = [{ name: "Unknown Card", qty: 1 }];
  const after = computeStats(l, cards, meta);
  const groups = diffStats(before, after).map((c) => c.group);

  const order = ["size", "curve", "types", "color", "roles", "tags", "flags", "money"];
  const indices = groups.map((g) => order.indexOf(g));
  expect([...indices].sort((a, b) => a - b)).toEqual(indices);
  expect(groups).toContain("roles");
  expect(groups.lastIndexOf("roles") < groups.indexOf("money") || groups.indexOf("money") === -1).toEqual(true);
});

test("deckIdentity comes from the main list, and a pool checked against it flags nothing wrongly", () => {
  const { deckIdentity } = require("../scripts/lib/deck-stats.ts");
  const deck = { schema: 1, name: "x", format: "commander", lists: { main: list(), pocket: { label: "Pocket", kind: "pool", sections: [{ name: "Pocket", cards: [{ name: "Blood Artist", qty: 1 }] }] } }, cards: {} } as any;
  const identity = deckIdentity(deck, cards);
  expect(identity).toEqual(["B", "G"]);
  expect(computeStats(deck.lists.pocket, cards, {}, identity).flags.offIdentity).toEqual([]);
  expect(computeStats(deck.lists.pocket, cards, {}).flags.offIdentity).toEqual(["Blood Artist"]);
});
