import { test, expect } from "bun:test";
import { parseDecklist } from "../scripts/lib/decklist.ts";

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
