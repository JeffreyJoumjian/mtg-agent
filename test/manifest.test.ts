import { test, expect } from "bun:test";
import { buildKeywords, extractCrossRefs } from "../scripts/lib/manifest.ts";

test("extractCrossRefs captures rule/section references and excludes self", () => {
  const text =
    "100.2c Commander decks. See rule 903, 'Commander.' Also see rule 201.3 and section 717. " +
    "This is rule 100 itself.";
  expect(extractCrossRefs(text, "100")).toEqual(["201", "717", "903"]);
});

test("extractCrossRefs returns empty when there are no references", () => {
  expect(extractCrossRefs("A plain rule with no cross references.", "500")).toEqual([]);
});

test("buildKeywords includes title words and matching glossary terms", () => {
  const termRegexes = [
    { term: "Deathtouch", re: /\bDeathtouch\b/i },
    { term: "Trample", re: /\bTrample\b/i },
  ].sort((a, b) => b.term.length - a.term.length);

  const keywords = buildKeywords(
    "Keyword Abilities",
    "702.2. Deathtouch is a keyword. Nothing here about the other one.",
    termRegexes,
  );

  expect(keywords).toContain("keyword");
  expect(keywords).toContain("abilities");
  expect(keywords).toContain("Deathtouch");
  expect(keywords).not.toContain("Trample");
});

test("buildKeywords drops stopwords and short tokens from the title", () => {
  const keywords = buildKeywords("The Magic Golden Rules", "Some text.", []);
  expect(keywords).not.toContain("the");
  expect(keywords).toContain("magic");
  expect(keywords).toContain("golden");
  expect(keywords).toContain("rules");
});

test("renderRulesIndex lists every section file by chapter, with each part's rule range and keyword labels", () => {
  const { renderRulesIndex } = require("../scripts/lib/manifest.ts");
  const out = renderRulesIndex({
    version: "2026-08-07",
    effectiveDate: "August 7, 2026",
    chapters: [
      { num: 1, title: "Game Concepts", sections: ["100"] },
      { num: 7, title: "Additional Rules", sections: ["702"] },
    ],
    chunks: [
      { num: "100", title: "General", chapter: 1, file: "rules/sections/100-general.md" },
      {
        num: "702", title: "Keyword Abilities", chapter: 7, file: "rules/sections/702-keyword-abilities.part1.md", part: 1,
        ruleRange: ["702.1", "702.19f"], labels: ["Most abilities describe exactly what they do in the card’...", "Deathtouch", "Trample"],
      },
    ],
  });
  expect(out).toContain("Version 2026-08-07 (effective August 7, 2026)");
  expect(out).toContain("## 1. Game Concepts\n\n- 100 General → 100-general.md\n");
  expect(out).toContain("- 702 Keyword Abilities, part 1 (702.1–702.19f) → 702-keyword-abilities.part1.md: Deathtouch, Trample\n");
  expect(out).not.toContain("Most abilities describe");
});
