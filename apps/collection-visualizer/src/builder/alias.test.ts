import { test, expect } from "bun:test";
import { parseDeck, emptyDeck, formatDeck } from "@mtg/deck-model.ts";

test("the @mtg alias resolves the root deck library", () => {
  expect(parseDeck(formatDeck(emptyDeck("x"))).name).toEqual("x");
});
