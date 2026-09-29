import { test, expect } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import type { DeckStats } from "@mtg/deck-stats.ts";
import { CompositionBar } from "./CompositionBar";

const types: DeckStats["types"] = {
  creature: 31,
  instant: 10,
  sorcery: 4,
  artifact: 9,
  enchantment: 11,
  planeswalker: 0,
  battle: 0,
  land: 36,
};

test("one segment per type the list has, sized by share, with the count in the legend", () => {
  const html = renderToStaticMarkup(<CompositionBar types={types} />);

  // 31 of 101 cards → 31% wide (rounded), and the legend names it with its count.
  expect(html).toMatch(/data-segment="creature"[^>]*width:31%/);
  expect(html).toMatch(/data-segment="land"[^>]*width:36%/);
  expect(html).toMatch(/Creature[\s\S]{0,80}31/);
  expect(html).not.toContain('data-segment="planeswalker"');
  expect(html).not.toContain("Battle");
});

test("an empty list renders no bar rather than dividing by zero", () => {
  const empty = { ...types, creature: 0, instant: 0, sorcery: 0, artifact: 0, enchantment: 0, land: 0 };
  const html = renderToStaticMarkup(<CompositionBar types={empty} />);

  expect(html).not.toContain("data-segment");
  expect(html).toContain("No cards yet");
});
