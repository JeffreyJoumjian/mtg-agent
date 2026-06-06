import { test, expect } from "bun:test";
import { parseRules } from "../scripts/lib/parser.ts";

/** A miniature rules document that mirrors the real file's structure:
 *  intro, a table of contents (which repeats chapter titles + Glossary/Credits),
 *  the body, the glossary, and credits. */
const FIXTURE = `Magic: The Gathering Comprehensive Rules

These rules are effective as of April 17, 2026.

Introduction

You can download the most recent version from Magic.Wizards.com/Rules.

Contents

1. Game Concepts
100. General
101. The Magic Golden Rules

2. Parts of a Card
200. General

Glossary

Credits

1. Game Concepts

100. General

100.1. These rules apply to any game. See rule 200.

100.1a A two-player game has two players.

100.1m Subrule using a non-sequential letter (l and o are skipped).

100.2. A rule with an example. See section 2 and rule 101.

Example: This is the example for rule 100.2.

101. The Magic Golden Rules

101.1. Whenever a card contradicts these rules, the card wins.

2. Parts of a Card

200. General

200.1. A card has parts. See rule 100.1.

Glossary

Active Player
The player whose turn it is. See rule 102.

Ability
1. Text on an object that explains what it does.
2. An activated or triggered ability on the stack.
See rule 113, "Abilities."

Credits

Designed by lots of people.
`;

test("parses the effective date", () => {
  const parsed = parseRules(FIXTURE);
  expect(parsed.effectiveDate).toEqual("April 17, 2026");
});

test("locates the body, not the table of contents", () => {
  const parsed = parseRules(FIXTURE);
  // Two chapters in the body, each parsed once (not the TOC copy).
  expect(parsed.chapters.map((c) => c.num)).toEqual([1, 2]);
  expect(parsed.chapters[0].title).toEqual("Game Concepts");
  expect(parsed.chapters[0].sections).toEqual(["100", "101"]);
  expect(parsed.chapters[1].sections).toEqual(["200"]);
});

test("parses sections with their chapter and title", () => {
  const parsed = parseRules(FIXTURE);
  expect(parsed.sections.map((s) => s.num)).toEqual(["100", "101", "200"]);
  const s100 = parsed.sections[0];
  expect(s100.title).toEqual("General");
  expect(s100.chapter).toEqual(1);
});

test("parses rules and subrules including non-sequential letters", () => {
  const parsed = parseRules(FIXTURE);
  const ids = parsed.sections[0].rules.map((r) => r.id);
  expect(ids).toEqual(["100.1", "100.1a", "100.1m", "100.2"]);
});

test("attaches examples to the correct rule", () => {
  const parsed = parseRules(FIXTURE);
  const rule = parsed.sections[0].rules.find((r) => r.id === "100.2");
  expect(rule?.examples).toEqual(["This is the example for rule 100.2."]);
});

test("builds a flat rules map with examples appended (for diffing)", () => {
  const parsed = parseRules(FIXTURE);
  expect(parsed.rules["100.1a"]).toEqual("A two-player game has two players.");
  expect(parsed.rules["100.2"]).toEqual(
    'A rule with an example. See section 2 and rule 101.\nExample: This is the example for rule 100.2.',
  );
});

test("captures each section's raw lines for chunk output", () => {
  const parsed = parseRules(FIXTURE);
  const raw = parsed.sections[0].rawLines.join("\n");
  expect(raw).toContain("100. General");
  expect(raw).toContain("100.1a A two-player game");
  expect(raw).not.toContain("101. The Magic Golden Rules");
});

test("parses glossary entries as term + definition blocks", () => {
  const parsed = parseRules(FIXTURE);
  const terms = parsed.glossary.map((g) => g.term);
  expect(terms).toEqual(["Active Player", "Ability"]);
  const ability = parsed.glossary.find((g) => g.term === "Ability");
  expect(ability?.definition).toContain("Text on an object");
  expect(ability?.definition).toContain('See rule 113, "Abilities."');
});
