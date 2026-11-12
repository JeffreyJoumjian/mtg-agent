import { test, expect } from "bun:test";
import { manaSymbols, packPage, render, type OutPage, type PageSpec, type Rows } from "../scripts/card-viz.ts";
import type { CardSummary } from "../scripts/lib/scryfall.ts";

const swap = (name: string) => ({ in: name, out: "Plains" });
// Fixed row heights make the packing deterministic: 500 per swap entry, 200 per grid row.
const fixed = (row: Rows): number => (row.kind === "swaps" ? 500 : 200);
const summary = (pages: ReturnType<typeof packPage>) =>
  pages.map((p) => ({ title: p.title, parts: p.parts.map((part) => [part.heading, part.rows.flatMap((r) => r.items.map((i) => ("card" in i ? i.card : i.in)))]) }));

test("packPage breaks before a row that would pass the cap and repeats the section heading", () => {
  const page: PageSpec = {
    title: "Caesar",
    sections: [
      { heading: "Swaps", swaps: [swap("A"), swap("B"), swap("C"), swap("D")] },
      { heading: "Bench", pairs: [{ in: "E", out: "F" }, { in: "G", out: "H" }, { in: "I", out: "J" }, { in: "K", out: "L" }] },
    ],
  };

  // Title 40, heading 34, three entries 1500 = 1574. A fourth entry would make 2074, past 1850.
  expect(summary(packPage(page, fixed, 1850))).toEqual([
    { title: "Caesar", parts: [["Swaps", ["A", "B", "C"]]] },
    { title: "Caesar (continued)", parts: [["Swaps", ["D"]], ["Bench", ["E", "G", "I", "K"]]] },
  ]);
});

test("packPage keeps a grid row whole: three pairs to a row at the reply width", () => {
  const page: PageSpec = { title: "Bench", sections: [{ pairs: [1, 2, 3, 4, 5, 6, 7].map((n) => ({ in: `In${n}`, out: `Out${n}` })) }] };

  // Rows of 3, 3 and 1 at 200 each: 40 + 400 fits a 600 cap, and the third row would make 640.
  // Slack 0 turns off the small-remainder rule, so the break shows.
  expect(summary(packPage(page, fixed, 600, 0))).toEqual([
    { title: "Bench", parts: [[undefined, ["In1", "In2", "In3", "In4", "In5", "In6"]]] },
    { title: "Bench (continued)", parts: [[undefined, ["In7"]]] },
  ]);
});

test("packPage keeps a remainder that fits in the slack on the current page", () => {
  const page: PageSpec = {
    title: "Caesar",
    sections: [
      { heading: "Swaps", swaps: [swap("A"), swap("B"), swap("C")] },
      { heading: "Bench", pairs: [{ in: "E", out: "F" }] },
    ],
  };

  // 40 + 34 + 1500 = 1574 before the bench. Its heading and one row (234) would pass 1700, but
  // that's all that's left and it fits the 400 slack, so it stays instead of making a scrap page.
  expect(summary(packPage(page, fixed, 1700))).toEqual([
    { title: "Caesar", parts: [["Swaps", ["A", "B", "C"]], ["Bench", ["E"]]] },
  ]);
  // With no slack the same remainder breaks onto its own page.
  expect(summary(packPage(page, fixed, 1700, 0))).toEqual([
    { title: "Caesar", parts: [["Swaps", ["A", "B", "C"]]] },
    { title: "Caesar (continued)", parts: [["Bench", ["E"]]] },
  ]);
});

test("packPage never leaves a page empty when one row is taller than the cap", () => {
  const page: PageSpec = { title: "Tall", sections: [{ swaps: [swap("A"), swap("B")] }] };

  expect(summary(packPage(page, fixed, 300))).toEqual([
    { title: "Tall", parts: [[undefined, ["A"]]] },
    { title: "Tall (continued)", parts: [[undefined, ["B"]]] },
  ]);
});

test("manaSymbols turns each pip into a Scryfall symbol, hybrid and Phyrexian included", () => {
  expect(manaSymbols("{1}{R/P}")).toEqual(
    '<img class="sym" src="https://svgs.scryfall.io/card-symbols/1.svg" alt="{1}">' +
      '<img class="sym" src="https://svgs.scryfall.io/card-symbols/RP.svg" alt="{R/P}">',
  );
  expect(manaSymbols("{U} // {2}")).toEqual(
    '<img class="sym" src="https://svgs.scryfall.io/card-symbols/U.svg" alt="{U}">' +
      '<span class="slash">//</span>' +
      '<img class="sym" src="https://svgs.scryfall.io/card-symbols/2.svg" alt="{2}">',
  );
  expect(manaSymbols("")).toEqual("");
});

const fakeCard = (name: string): CardSummary => {
  const images = { small: null, normal: `https://img.test/${name}.jpg`, artCrop: null };
  return {
    id: "", oracleId: "", name, manaCost: "{1}", cmc: 1, typeLine: "Artifact", oracleText: "",
    colors: [], colorIdentity: [], producedMana: [], keywords: [], layout: "normal", gameChanger: false,
    set: "tst", setName: "Test", collectorNumber: "1", rarity: "common", usd: null, commanderLegal: "legal",
    artist: "", scryfallUri: `https://scryfall.com/card/tst/${name}`, imageUri: images.normal, images,
    faces: [{ name, manaCost: "{1}", typeLine: "Artifact", oracleText: "", images }],
  };
};

test("render leaves card images unlinked and puts a Scryfall link icon beside every card name", () => {
  const page: OutPage = {
    title: "Viz",
    height: 0,
    parts: [
      { kind: "swaps", rows: [{ kind: "swaps", items: [{ in: "A", out: "B", options: [{ card: "C", note: "Other cut." }] }] }] },
      { kind: "pairs", rows: [{ kind: "pairs", items: [{ in: "D", out: "E" }] }] },
      { kind: "tiles", rows: [{ kind: "tiles", items: [{ card: "F", verdict: "trap" }] }] },
    ],
  };
  const html = render(page, fakeCard);

  // A link wrapped around an image would make a click open Scryfall instead of zooming the card.
  expect(/<a [^>]*>\s*<img/.test(html)).toEqual(false);
  // The swap's headline, its In and Out names, the option, both pair names and the tile name.
  expect([...html.matchAll(/<a class="ext" href="https:\/\/scryfall\.com\/card\/tst\/(\w)"/g)].map((m) => m[1])).toEqual([
    "A", "A", "B", "C", "D", "E", "F",
  ]);
});
