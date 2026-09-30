import { test, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import type { DeckStats } from "@mtg/deck-stats.ts";
import { MANA_COLORS } from "~/components/symbols/Mana";
import { ColourBreakdown } from "./ColourBreakdown";

const color: DeckStats["color"] = {
  identity: ["B", "G"],
  pips: { W: 0, U: 0, B: 34, R: 0, G: 39 },
  sources: { W: 8, U: 8, B: 31, R: 8, G: 28 },
};

test("one tile per identity colour: share of pips as the big number, share of sources under it", () => {
  const html = renderToStaticMarkup(<ColourBreakdown color={color} />);

  // Shares are of the identity colours only, so the eight off-colour sources Command Tower
  // makes do not dilute the picture: B 34/73 pips, 31/59 sources.
  expect(html).toMatch(/data-tile="B"[\s\S]*?47%[\s\S]*?53% of sources/);
  expect(html).toMatch(/data-tile="G"[\s\S]*?53%[\s\S]*?47% of sources/);
  expect(html).not.toContain('data-tile="W"');
});

test("the two stacked bars read cost over production in the mana symbol colours", () => {
  const html = renderToStaticMarkup(<ColourBreakdown color={color} />);

  const cost = new RegExp(
    `data-bar="cost"[\\s\\S]*?background:${MANA_COLORS.B}[\\s\\S]*?B 34[\\s\\S]*?background:${MANA_COLORS.G}[\\s\\S]*?G 39`,
  );
  const production = new RegExp(`data-bar="production"[\\s\\S]*?B 31[\\s\\S]*?G 28`);
  expect(html).toMatch(cost);
  expect(html).toMatch(production);
});

test("a colourless list says so instead of drawing empty bars", () => {
  const html = renderToStaticMarkup(
    <ColourBreakdown color={{ identity: [], pips: { W: 0, U: 0, B: 0, R: 0, G: 0 }, sources: color.sources }} />,
  );

  expect(html).toContain("Colourless");
  expect(html).not.toContain('data-bar="cost"');
});

test("the bar colours are the circle fills of the bundled pip SVGs", () => {
  for (const [sym, hex] of Object.entries(MANA_COLORS)) {
    const svg = readFileSync(new URL(`../../assets/mana/${sym}.svg`, import.meta.url), "utf8");
    expect(svg.toUpperCase()).toContain(hex.toUpperCase());
  }
});
