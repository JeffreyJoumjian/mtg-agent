import { test, expect } from "bun:test";
import { parseDecklist, indexByDeckName } from "../scripts/lib/decklist.ts";

test("parseDecklist reads counts and skips headers, comments, and blanks", () => {
  const text = [
    "## Commander",
    "1x Scarlet Witch, Chaotic Avenger",
    "",
    "# a comment",
    "// another comment",
    "1 Chaos Warp",
    "10x Mountain",
  ].join("\n");
  expect(parseDecklist(text)).toEqual([
    "Scarlet Witch, Chaotic Avenger",
    "Chaos Warp",
    "Mountain",
  ]);
});

test("parseDecklist strips trailing set annotations and foil markers", () => {
  const text = ["1x Chaos Warp (mar) 69", "1 Ponder (m10) 66 *F*", "2x Lightning Bolt *F*"].join("\n");
  expect(parseDecklist(text)).toEqual(["Chaos Warp", "Ponder", "Lightning Bolt"]);
});

test("parseDecklist returns empty for a list with no counted lines", () => {
  expect(parseDecklist("## Just headers\nand prose\n")).toEqual([]);
});

test("indexByDeckName finds a double-faced card by its front face", () => {
  const cards = [
    { name: "Valakut Awakening // Valakut Stoneforge" },
    { name: "Urabrask // The Great Work" },
    { name: "Sol Ring" },
  ];
  const byName = indexByDeckName(cards);

  // The decklist line carries the front face only — this is the lookup that used to miss,
  // silently costing the card its price and its legality/identity checks.
  expect(byName.get("valakut awakening")).toEqual(cards[0]);
  expect(byName.get("urabrask")).toEqual(cards[1]);
  expect(byName.get("sol ring")).toEqual(cards[2]);
  // The full Scryfall name still resolves.
  expect(byName.get("urabrask // the great work")).toEqual(cards[1]);
});

test("indexByDeckName never lets a front-face alias shadow a real card of that name", () => {
  const cards = [
    { name: "Bala Ged Recovery // Bala Ged Sanctuary" },
    { name: "Bala Ged Recovery" }, // a real card sharing the alias
  ];
  const byName = indexByDeckName(cards);
  expect(byName.get("bala ged recovery")).toEqual(cards[1]);
});

test("indexByDeckName leaves an unknown name unresolved", () => {
  expect(indexByDeckName([{ name: "Sol Ring" }]).get("mox emerald")).toEqual(undefined);
});
