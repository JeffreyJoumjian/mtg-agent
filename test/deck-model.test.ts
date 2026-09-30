import { test, expect } from "bun:test";
import {
  emptyDeck,
  formatDeck,
  parseDeck,
  validateDeck,
  normalizeList,
  listSize,
  listNames,
  listEntries,
  commandersOf,
  findEntry,
  isBasicLand,
  listIdFromLabel,
  DeckParseError,
  MAIN_LIST,
  type Deck,
} from "../scripts/lib/deck-model.ts";

const sample = (): Deck => {
  const deck = emptyDeck("Test — Deck");
  deck.lists[MAIN_LIST].sections = [
    { name: "Commander", cards: [{ name: "Chatterfang, Squirrel General", qty: 1 }] },
    { name: "Lands", cards: [{ name: "Forest", qty: 7 }, { name: "Bojuka Bog", qty: 1 }] },
    { name: "Ramp", cards: [{ name: "Sol Ring", qty: 1, note: "obviously" }] },
  ];
  deck.cards["Sol Ring"] = { status: "OWNED", tags: ["ramp", "fast-mana"] };
  return deck;
};

test("formatDeck puts each card entry on one line and round-trips through parseDeck", () => {
  const text = formatDeck(sample());
  expect(text).toContain('{ "name": "Forest", "qty": 7 }');
  expect(text).toContain('{ "name": "Sol Ring", "qty": 1, "note": "obviously" }');

  const expected = sample();
  expected.lists[MAIN_LIST] = normalizeList(expected.lists[MAIN_LIST]);
  expect(parseDeck(text)).toEqual(expected);
});

test("formatDeck sorts cards within a section, keeps the commander section order, sorts the cards map", () => {
  const deck = sample();
  deck.lists[MAIN_LIST].sections[0].cards.push({ name: "Aardvark Partner", qty: 1 });
  deck.cards["Bojuka Bog"] = { status: "PROXY" };
  const text = formatDeck(deck);

  expect(text.indexOf('"Bojuka Bog", "qty": 1')).toBeLessThan(text.indexOf('"Forest", "qty": 7'));
  expect(text.indexOf('"Chatterfang, Squirrel General"')).toBeLessThan(text.indexOf('"Aardvark Partner"'));
  expect(text.indexOf('"Bojuka Bog": {')).toBeLessThan(text.indexOf('"Sol Ring": {'));
});

test("formatDeck emits a fixed top-level key order and omits empty optionals", () => {
  const text = formatDeck(sample());
  const keys = ["\"schema\"", "\"name\"", "\"format\"", "\"lists\"", "\"cards\""].map((k) => text.indexOf(k));
  expect([...keys].sort((a, b) => a - b)).toEqual(keys);
  expect(text).not.toContain('"description"');
  expect(text).not.toContain('"bracket"');
});

test("validateDeck reports every problem instead of the first", () => {
  const res = validateDeck({
    schema: 2,
    name: "",
    lists: { main: { label: "Main", kind: "weird", sections: [{ name: "Lands", cards: [{ name: "", qty: 0 }] }] } },
    cards: { "Sol Ring": { status: "MAYBE", tags: "ramp" } },
  });
  expect(res.ok).toEqual(false);
  if (!res.ok) {
    expect(res.errors.some((e) => e.includes("schema"))).toEqual(true);
    expect(res.errors.some((e) => e.includes("name"))).toEqual(true);
    expect(res.errors.some((e) => e.includes("kind"))).toEqual(true);
    expect(res.errors.some((e) => e.includes("qty"))).toEqual(true);
    expect(res.errors.some((e) => e.includes("status"))).toEqual(true);
    expect(res.errors.some((e) => e.includes("tags"))).toEqual(true);
  }
});

test("validateDeck accepts a minimal deck and fills defaults", () => {
  const res = validateDeck({ schema: 1, name: "X", lists: { main: { label: "Main", kind: "deck", sections: [] } } });
  expect(res.ok).toEqual(true);
  if (res.ok) {
    expect(res.deck.format).toEqual("commander");
    expect(res.deck.cards).toEqual({});
  }
});

test("parseDeck throws DeckParseError with the errors on bad JSON and on bad shape", () => {
  expect(() => parseDeck("{ not json")).toThrow(DeckParseError);
  expect(() => parseDeck('{"schema":1}')).toThrow(/lists/);
});

test("list helpers", () => {
  const list = sample().lists[MAIN_LIST];
  expect(listSize(list)).toEqual(10);
  expect(listNames(list)).toEqual(["Chatterfang, Squirrel General", "Forest", "Bojuka Bog", "Sol Ring"]);
  expect(listEntries(list)[3]).toEqual({ name: "Sol Ring", qty: 1, note: "obviously", section: "Ramp" });
  expect(commandersOf(list)).toEqual(["Chatterfang, Squirrel General"]);
  expect(findEntry(list, "sol ring")?.section).toEqual("Ramp");
  expect(findEntry(list, "Nope")).toEqual(null);
});

test("isBasicLand and listIdFromLabel", () => {
  expect(isBasicLand("Snow-Covered Forest")).toEqual(true);
  expect(isBasicLand("Forest")).toEqual(true);
  expect(isBasicLand("Wastes")).toEqual(true);
  expect(isBasicLand("Gaea's Cradle")).toEqual(false);
  expect(listIdFromLabel("Bracket 4")).toEqual("bracket-4");
  expect(listIdFromLabel("  Kratos & Atreus ")).toEqual("kratos-atreus");
});

test("normalizeList drops zero-quantity entries and sorts non-commander sections", () => {
  const list = normalizeList({
    label: "Main",
    kind: "deck",
    sections: [
      { name: "Commander", cards: [{ name: "Zur", qty: 1 }, { name: "Ayli", qty: 1 }] },
      { name: "Lands", cards: [{ name: "Swamp", qty: 0 }, { name: "Plains", qty: 3 }, { name: "Command Tower", qty: 1 }] },
    ],
  });
  expect(list.sections[0].cards.map((c) => c.name)).toEqual(["Zur", "Ayli"]);
  expect(list.sections[1].cards.map((c) => c.name)).toEqual(["Command Tower", "Plains"]);
});

test("pickList prefers main, falls back to the first list, and honours an explicit id", () => {
  const { pickList } = require("../scripts/lib/deck-model.ts");
  const deck = { ...sample(), lists: { b4: { ...sample().lists[MAIN_LIST], label: "B4" }, main: sample().lists[MAIN_LIST] } };
  expect(pickList(deck).id).toEqual("main");
  expect(pickList(deck, "b4").id).toEqual("b4");
  expect(pickList({ ...deck, lists: { b4: deck.lists.b4 } }).id).toEqual("b4");
  expect(() => pickList(deck, "nope")).toThrow(/no list "nope"/);
});
