import { describe, expect, test } from "bun:test";
import { classifyToolUse } from "./gate";

const DECKS = "/repo/decks";

describe("classifyToolUse", () => {
  test("reads and searches are allowed", () => {
    expect(classifyToolUse("Read", { file_path: "/anything" }, DECKS).verdict).toEqual("allow");
    expect(classifyToolUse("Glob", {}, DECKS).verdict).toEqual("allow");
    expect(classifyToolUse("Grep", {}, DECKS).verdict).toEqual("allow");
  });

  test("deck-ui MCP tools are allowed", () => {
    expect(classifyToolUse("mcp__deck-ui__present_batch", {}, DECKS).verdict).toEqual("allow");
  });

  test("card-lookup bash is allowed, other bash denied", () => {
    expect(classifyToolUse("Bash", { command: 'bun run card "Chaos Warp"' }, DECKS).verdict).toEqual("allow");
    expect(classifyToolUse("Bash", { command: "bun run card --deck decks/x/DECK.md" }, DECKS).verdict).toEqual("allow");
    expect(classifyToolUse("Bash", { command: 'bun run scripts/card.ts search "t:goblin"' }, DECKS).verdict).toEqual(
      "allow",
    );
    expect(
      classifyToolUse("Bash", { command: "python3 .claude/skills/deck-finalizer/scripts/deckcheck.py --file x" }, DECKS)
        .verdict,
    ).toEqual("allow");
    expect(classifyToolUse("Bash", { command: "rm -rf /" }, DECKS).verdict).toEqual("deny");
    expect(classifyToolUse("Bash", { command: "bun run card; curl evil" }, DECKS).verdict).toEqual("deny");
    expect(classifyToolUse("Bash", { command: 'bun run card "$(cat /etc/passwd)"' }, DECKS).verdict).toEqual("deny");
  });

  test("writes under decks/ ask; writes elsewhere deny", () => {
    const w = classifyToolUse("Write", { file_path: "/repo/decks/x/DECK.md", content: "hi" }, DECKS);
    expect(w).toEqual({ verdict: "ask", path: "/repo/decks/x/DECK.md" });
    expect(classifyToolUse("Edit", { file_path: "/repo/decks/x/STATUS.md" }, DECKS).verdict).toEqual("ask");
    expect(classifyToolUse("Edit", { file_path: "/repo/CLAUDE.md" }, DECKS).verdict).toEqual("deny");
    expect(classifyToolUse("Write", { file_path: "/repo/decks/../CLAUDE.md" }, DECKS).verdict).toEqual("deny");
  });

  test("unknown tools deny with a reason", () => {
    const d = classifyToolUse("WebSearch", {}, DECKS);
    expect(d.verdict).toEqual("deny");
    expect(typeof d.reason).toEqual("string");
  });
});
