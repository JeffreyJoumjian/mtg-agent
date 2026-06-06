import { test, expect } from "bun:test";
import { planSectionChunks, slug } from "../scripts/lib/chunker.ts";
import type { Section } from "../scripts/lib/types.ts";

function makeSection(num: string, title: string, rawLines: string[]): Section {
  const rules = rawLines
    .map((l) => /^(\d{3}\.\d+[a-z]*)/.exec(l)?.[1])
    .filter((id): id is string => Boolean(id))
    .map((id) => ({ id, text: "", examples: [] }));
  return { num, title, chapter: 7, rules, rawLines };
}

test("slug normalizes titles", () => {
  expect(slug("Keyword Abilities")).toEqual("keyword-abilities");
  expect(slug("Power/Toughness")).toEqual("power-toughness");
});

test("small sections stay in a single chunk", () => {
  const section = makeSection("100", "General", [
    "100. General",
    "",
    "100.1. A rule.",
    "",
    "100.1a A subrule.",
  ]);
  const plans = planSectionChunks(section, 400);
  expect(plans.length).toEqual(1);
  expect(plans[0].part).toEqual(undefined);
  expect(plans[0].ruleIds).toEqual(["100.1", "100.1a"]);
});

test("large sections split at top-level rule boundaries with labels", () => {
  // Build a 702-like section that exceeds a small threshold.
  const raw: string[] = ["702. Keyword Abilities", ""];
  const keywords = ["Deathtouch", "Defender", "Double Strike", "Enchant", "Equip", "Flash"];
  keywords.forEach((kw, i) => {
    const n = i + 2; // 702.2, 702.3, ...
    raw.push(`702.${n}. ${kw}`);
    raw.push(`702.${n}a Reminder text for ${kw}.`);
    raw.push(`702.${n}b More about ${kw}.`);
    raw.push("");
  });

  const section = makeSection("702", "Keyword Abilities", raw);
  const plans = planSectionChunks(section, 12); // force multiple parts

  expect(plans.length).toBeGreaterThan(1);
  // Parts are 1-indexed and contiguous.
  expect(plans.map((p) => p.part)).toEqual(plans.map((_, i) => i + 1));
  // Every keyword label appears in exactly one part.
  const allLabels = plans.flatMap((p) => p.labels);
  for (const kw of keywords) expect(allLabels).toContain(kw);
  // Preamble (section header) is carried into part 1.
  expect(plans[0].lines[0]).toEqual("702. Keyword Abilities");
  // Subrules are tracked alongside their top-level rule.
  const allRuleIds = plans.flatMap((p) => p.ruleIds);
  expect(allRuleIds).toContain("702.2");
  expect(allRuleIds).toContain("702.2a");
});
