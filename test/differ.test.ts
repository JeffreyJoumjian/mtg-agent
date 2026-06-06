import { test, expect } from "bun:test";
import { compareRuleIds, diff, renderChangelog } from "../scripts/lib/differ.ts";

test("compareRuleIds orders by section, rule number, then letter", () => {
  const ids = ["702.10a", "702.2", "100.1", "702.2a", "100.1b"];
  expect([...ids].sort(compareRuleIds)).toEqual([
    "100.1",
    "100.1b",
    "702.2",
    "702.2a",
    "702.10a",
  ]);
});

test("diff detects added, removed, and changed rules", () => {
  const oldRules = { "100.1": "old text", "100.2": "stable", "100.3": "gone" };
  const newRules = { "100.1": "new text", "100.2": "stable", "100.4": "brand new" };
  const result = diff(oldRules, newRules);
  expect(result.added).toEqual(["100.4"]);
  expect(result.removed).toEqual(["100.3"]);
  expect(result.changed).toEqual([{ id: "100.1", before: "old text", after: "new text" }]);
});

test("diff against an empty map marks everything added", () => {
  const result = diff({}, { "100.1": "a", "100.2": "b" });
  expect(result.added).toEqual(["100.1", "100.2"]);
  expect(result.removed).toEqual([]);
  expect(result.changed).toEqual([]);
});

test("renderChangelog emits an initial-build note", () => {
  const md = renderChangelog(diff({}, { "100.1": "a" }), {
    version: "2026-04-17",
    effectiveDate: "April 17, 2026",
    isInitial: true,
  });
  expect(md).toContain("Initial build");
  expect(md).toContain("2026-04-17");
});

test("renderChangelog lists added/removed/changed ids", () => {
  const result = diff(
    { "100.1": "old", "100.3": "gone" },
    { "100.1": "new", "100.4": "fresh" },
  );
  const md = renderChangelog(result, {
    version: "2026-05-01",
    effectiveDate: "May 1, 2026",
    isInitial: false,
  });
  expect(md).toContain("1 added · 1 removed · 1 changed");
  expect(md).toContain("`100.4`");
  expect(md).toContain("`100.3`");
  expect(md).toContain("before: old");
  expect(md).toContain("after: new");
});
