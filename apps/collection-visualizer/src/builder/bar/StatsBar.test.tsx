import { test, expect } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { DeckStats, StatChange } from "@mtg/deck-stats.ts";
import { formatMoney } from "~/lib/format";
import { StatsBar } from "./StatsBar";

const stats: DeckStats = {
  size: { total: 100, target: 100, lands: 36, nonland: 64, commanders: 1 },
  curve: {
    avgMv: 2.73,
    avgMvNonZero: 2.73,
    histogram: [
      { mv: "0", creature: 1, noncreature: 1 },
      { mv: "1", creature: 7, noncreature: 5 },
      { mv: "2", creature: 12, noncreature: 10 },
      { mv: "3", creature: 9, noncreature: 8 },
      { mv: "4", creature: 2, noncreature: 5 },
      { mv: "5", creature: 0, noncreature: 2 },
      { mv: "6", creature: 0, noncreature: 1 },
      { mv: "7+", creature: 0, noncreature: 1 },
    ],
  },
  types: { creature: 31, instant: 10, sorcery: 4, artifact: 9, enchantment: 11, planeswalker: 0, battle: 0, land: 36 },
  color: {
    identity: ["B", "G"],
    pips: { W: 0, U: 0, B: 34, R: 0, G: 39 },
    sources: { W: 8, U: 8, B: 31, R: 8, G: 28 },
  },
  roles: { sections: { Lands: 36, "Token Engines": 18 }, tags: {} },
  flags: { gameChangers: ["Gaea's Cradle"], offIdentity: [], illegal: [], unresolved: [], duplicates: [] },
  money: {
    total: 2233.26,
    byStatus: {
      OWNED: { count: 0, usd: 0 },
      PROXY: { count: 89, usd: 2233.26 },
      BUY: { count: 0, usd: 0 },
      CONSIDERING: { count: 0, usd: 0 },
    },
  },
};

const render = (after: DeckStats | null = null, changes: StatChange[] = []) =>
  renderToStaticMarkup(<StatsBar stats={stats} after={after} changes={changes} onDetails={() => {}} />);

test("the bar carries the headline numbers, one glyph per type the list has, and a Details button", () => {
  const html = render();

  expect(html).toMatch(/data-chip="size"[\s\S]*?100[\s\S]*?\/ 100/);
  expect(html).toMatch(/data-chip="lands"[\s\S]*?36[\s\S]*?lands[\s\S]*?64[\s\S]*?spells/);
  expect(html).toMatch(/data-chip="avgmv"[\s\S]*?2\.73/);
  expect(html).toMatch(/data-chip="color-B"[\s\S]*?34[\s\S]*?31/);
  expect(html).toMatch(/data-chip="color-G"[\s\S]*?39[\s\S]*?28/);
  expect(html).toContain('aria-label="31 creatures"');
  expect(html).toContain('aria-label="36 lands"');
  expect(html).not.toContain("planeswalker");
  expect(html).toMatch(/data-chip="checks"[\s\S]*?1 game changer/);
  expect(html).toContain(formatMoney(2233.26, "usd"));
  expect(html).toMatch(/<button[^>]*>[\s\S]*?Details[\s\S]*?<\/button>/);
});

test("while a change is staged, a chip whose number moves shows before → after", () => {
  const after: DeckStats = {
    ...stats,
    curve: { ...stats.curve, avgMv: 2.76 },
    types: { ...stats.types, enchantment: 12 },
  };
  const changes: StatChange[] = [
    { group: "curve", key: "curve.avgMv", label: "Avg MV", before: 2.73, after: 2.76, delta: 0.03 },
    { group: "types", key: "types.enchantment", label: "Enchantment", before: 11, after: 12, delta: 1 },
  ];
  const html = render(after, changes);

  expect(html).toMatch(/data-chip="avgmv"[\s\S]*?2\.73[\s\S]*?→[\s\S]*?2\.76/);
  expect(html).toContain('aria-label="11 enchantments, 12 after the staged change"');
  // Unchanged chips stay plain.
  expect(html).toMatch(/data-chip="size"[\s\S]*?100/);
  expect(html).not.toMatch(/data-chip="size"[^>]*>[\s\S]*?→[\s\S]*?data-chip="lands"/);
});

test("a problem in the checks turns the chip into a count of things to fix", () => {
  const html = renderToStaticMarkup(
    <StatsBar
      stats={{ ...stats, flags: { ...stats.flags, offIdentity: ["Lightning Bolt"], unresolved: ["Sol Rng"] } }}
      after={null}
      changes={[]}
      onDetails={() => {}}
    />,
  );

  expect(html).toMatch(/data-chip="checks"[\s\S]*?2 to fix/);
});

test("chips that share a breakdown are one target: one button per group, never one per chip", () => {
  const html = render();

  expect(html.match(/data-group="[a-z]+"/g)).toEqual([
    'data-group="size"',
    'data-group="curve"',
    'data-group="colour"',
    'data-group="types"',
    'data-group="checks"',
    'data-group="money"',
  ]);
  // The size and lands chips share the Size popover, so they live in the same button …
  expect(html).toMatch(
    /<button[^>]*data-group="size"[^>]*>[\s\S]*?data-chip="size"[\s\S]*?data-chip="lands"[\s\S]*?<\/button>/,
  );
  // … and every type glyph shares Composition. The first </button> after the group's open tag must
  // be its own, i.e. nothing clickable is nested inside it.
  const types = html.match(/<button[^>]*data-group="types"[^>]*>([\s\S]*?)<\/button>/);
  expect(types?.[1]).toContain('data-chip="type-creature"');
  expect(types?.[1]).toContain('data-chip="type-land"');
  expect(types?.[1]).not.toContain("<button");
});
