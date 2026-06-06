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
