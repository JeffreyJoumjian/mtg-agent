import { test, expect } from "bun:test";
import { buildAppendPrompt } from "./system-prompt";

test("the append prompt names the deck, its lists, the tools and the chat conventions", () => {
  const p = buildAppendPrompt({
    slug: "chatterfang",
    deckName: "Chatterfang — Acorn Economy",
    listIds: ["main", "b4"],
    activeListId: "main",
  });
  expect(p).toContain("decks/chatterfang/");
  expect(p).toContain("Chatterfang — Acorn Economy");
  expect(p).toContain("main, b4");
  expect(p).toContain("[[Card Name]]");
  expect(p).toContain("mcp__deck-ui__propose_changes");
  expect(p).toContain("mcp__deck-ui__show_cards");
  expect(p).toContain("mcp__deck-ui__pick_cards");
  expect(p).toContain("mcp__deck-ui__set_card_meta");
  expect(p).toContain("AskUserQuestion");
  expect(p).toContain("deck-brain");
  expect(p).toContain("bun run deck:show chatterfang");
  expect(p).toContain("deck.json");
});
