import { describe, expect, test } from "bun:test";
import { buildAppendPrompt } from "./system-prompt";

describe("buildAppendPrompt", () => {
  test("embeds skill, conventions, deck paths, tool names, and the stop instruction", () => {
    const prompt = buildAppendPrompt({
      slug: "scarlet-witch",
      skillText: "SKILL_BODY_MARKER",
      conventionsText: "CONVENTIONS_MARKER",
    });

    expect(prompt).toContain("SKILL_BODY_MARKER");
    expect(prompt).toContain("CONVENTIONS_MARKER");
    expect(prompt).toContain("decks/scarlet-witch/DECK.md");
    expect(prompt).toContain("mcp__deck-ui__present_batch");
    expect(prompt).toContain("mcp__deck-ui__update_tally");
    expect(prompt).toContain("mcp__deck-ui__propose_final_list");
    expect(prompt).toContain("END YOUR TURN");
  });
});
