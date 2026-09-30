import { test, expect } from "bun:test";
import { classifyToolUse } from "./gate";

const ctx = { slug: "chatterfang", repoRoot: "/repo" };
const verdict = (tool: string, input: Record<string, unknown>) => classifyToolUse(tool, input, ctx).verdict;

test("reads, skills, subagents and web lookups are allowed", () => {
  expect(verdict("Read", { file_path: "/repo/decks/chatterfang/deck.json" })).toEqual("allow");
  expect(verdict("Glob", { pattern: "**/*.md" })).toEqual("allow");
  expect(verdict("Grep", { pattern: "Sol Ring" })).toEqual("allow");
  expect(verdict("TodoWrite", {})).toEqual("allow");
  expect(verdict("Skill", { skill: "deck-brain" })).toEqual("allow");
  expect(verdict("Task", { subagent_type: "mtg-rules-expert" })).toEqual("allow");
  expect(verdict("WebFetch", { url: "https://scryfall.com" })).toEqual("allow");
  expect(verdict("WebSearch", { query: "x" })).toEqual("allow");
  expect(verdict("mcp__deck-ui__propose_changes", {})).toEqual("allow");
});

test("Bash: only the read-only card, EDHREC and deck commands, never chained", () => {
  expect(verdict("Bash", { command: 'bun run card "Sol Ring"' })).toEqual("allow");
  expect(verdict("Bash", { command: "bun run card --deck chatterfang --list b4" })).toEqual("allow");
  expect(verdict("Bash", { command: 'bun run scripts/card.ts search "id<=bg t:squirrel"' })).toEqual("allow");
  expect(verdict("Bash", { command: 'bun run edhrec commander "Chatterfang"' })).toEqual("allow");
  expect(verdict("Bash", { command: 'bun run carddata --deck chatterfang "Sol Ring"' })).toEqual("allow");
  expect(verdict("Bash", { command: "bun run deckcheck --deck chatterfang" })).toEqual("allow");
  expect(verdict("Bash", { command: "bun run deck:show chatterfang" })).toEqual("allow");
  expect(verdict("Bash", { command: "bun run deck:edit chatterfang --label x --add A@B" })).toEqual("deny");
  expect(verdict("Bash", { command: "bun run card x && rm -rf /" })).toEqual("deny");
  expect(verdict("Bash", { command: "bun run card x | tee out" })).toEqual("deny");
  expect(verdict("Bash", { command: "git status" })).toEqual("deny");
  expect(verdict("Bash", { command: "ls decks" })).toEqual("deny");
});

test("writes: research and the ledger pass with a notice, other deck files ask, deck.json and elsewhere deny", () => {
  expect(classifyToolUse("Write", { file_path: "decks/chatterfang/research/notes.md" }, ctx)).toEqual({
    verdict: "allow-notify",
    path: "decks/chatterfang/research/notes.md",
  });
  expect(verdict("Edit", { file_path: "/repo/decks/chatterfang/research/decisions.md" })).toEqual("allow-notify");
  expect(verdict("Edit", { file_path: ".claude/skills/deck-brain/ledger/triggers.md" })).toEqual("allow-notify");
  expect(verdict("Write", { file_path: "decks/chatterfang/pdf.json" })).toEqual("ask");
  expect(verdict("Edit", { file_path: "decks/chatterfang/deck.json" })).toEqual("deny");
  expect(verdict("Write", { file_path: "decks/chatterfang/history.jsonl" })).toEqual("deny");
  expect(verdict("Write", { file_path: "decks/chatterfang/versions/x.json" })).toEqual("deny");
  expect(verdict("Write", { file_path: "decks/other-deck/research/notes.md" })).toEqual("deny");
  expect(verdict("Write", { file_path: "decks/chatterfang/../../etc/passwd" })).toEqual("deny");
  expect(verdict("Write", { file_path: "/etc/hosts" })).toEqual("deny");
  expect(verdict("Write", { file_path: ".claude/skills/deck-brain/SKILL.md" })).toEqual("deny");
  expect(verdict("MultiEdit", { file_path: "decks/chatterfang/deck.json" })).toEqual("deny");
});

test("deny carries a reason the agent can act on", () => {
  const d = classifyToolUse("Edit", { file_path: "decks/chatterfang/deck.json" }, ctx);
  expect(d.verdict).toEqual("deny");
  expect(d.reason).toContain("propose_changes");
});

test("anything else is denied", () => {
  expect(verdict("NotebookEdit", {})).toEqual("deny");
  expect(verdict("KillShell", {})).toEqual("deny");
});

test("ledger topic files take edits with a notice, a whole-file Write asks, generated and archived files are refused", () => {
  expect(verdict("Edit", { file_path: ".claude/skills/deck-brain/ledger/triggers.md" })).toEqual("allow-notify");
  expect(verdict("MultiEdit", { file_path: ".claude/skills/deck-brain/ledger/card-evaluation.md" })).toEqual("allow-notify");
  expect(verdict("Write", { file_path: ".claude/skills/deck-brain/ledger/triggers.md" })).toEqual("ask");
  expect(verdict("Edit", { file_path: ".claude/skills/deck-brain/ledger/INDEX.md" })).toEqual("deny");
  expect(verdict("Edit", { file_path: ".claude/skills/deck-brain/ledger/CARDS.md" })).toEqual("deny");
  expect(verdict("Edit", { file_path: ".claude/skills/deck-brain/ledger/archive/LEDGER-2026-09-29.md" })).toEqual("deny");
});

test("the agent may look up the ledger and refresh its indexes", () => {
  expect(verdict("Bash", { command: 'bun run lookup "Roaming Throne"' })).toEqual("allow");
  expect(verdict("Bash", { command: "bun run ledger:index" })).toEqual("allow");
});
