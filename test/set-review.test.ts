import { test, expect } from "bun:test";
import { listsHolding, uncoveredCards } from "../scripts/lib/set-review.ts";
import type { Deck } from "../scripts/lib/deck-model.ts";

const REVIEW = `# TRK set review: Iron Man

Prose that mentions Lightning Bolt without giving it a verdict.

| # | Name | MV | New? | main | v3 | Reason |
|---|---|---|---|---|---|---|
| 1 | Sol Ring | 1 | REPRINT | IN | IN | Already run |
| 2 | Delver of Secrets | 1 | NEW | NO | NO | Front face only, back face left off |
| 3 | **[Arcane Signet](https://scryfall.com/search?q=%21%22Arcane+Signet%22)** | 2 | REPRINT | NO | **MAIN** | Linked and bold |
| 4 | Jace’s Archivist | 3 | NEW | NO | NO | Curly apostrophe |
| 5 | Unsummon the Dead | 2 | NEW | NO | NO | Longer name that contains another card's name |
| 6 | Ponder | 1 | REPRINT | NO | = | Second list marked the same as the first |

## Proposed swap

| Card | Cost | Artifact? |
|---|---|---|
| Counterspell | {U}{U} | no |
`;

test("uncoveredCards lists only the pool cards with no verdict row of their own", () => {
  const pool = [
    "Sol Ring",
    "Delver of Secrets // Insectile Aberration",
    "Arcane Signet",
    "Jace's Archivist",
    "Ponder",
    "Lightning Bolt",
    "Unsummon",
    "Counterspell",
  ];

  expect(uncoveredCards(REVIEW, pool)).toEqual(["Lightning Bolt", "Unsummon", "Counterspell"]);
});

test("uncoveredCards returns nothing when every pool card has a row", () => {
  expect(uncoveredCards(REVIEW, ["Sol Ring", "Arcane Signet"])).toEqual([]);
});

const DECK: Deck = {
  schema: 1,
  name: "Iron Man",
  format: "commander",
  lists: {
    main: {
      label: "Main",
      kind: "deck",
      sections: [
        { name: "Commander", cards: [{ name: "Tony Stark // The Invincible Iron Man", qty: 1 }] },
        { name: "Ramp", cards: [{ name: "Sol Ring", qty: 1 }] },
      ],
    },
    v3: {
      label: "V3",
      kind: "deck",
      sections: [{ name: "Ramp", cards: [{ name: "Sol Ring", qty: 1 }, { name: "Arcane Signet", qty: 1 }] }],
    },
    sideboard: {
      label: "Sideboard",
      kind: "pool",
      sections: [{ name: "Bench", cards: [{ name: "delver of secrets", qty: 1 }] }],
    },
  },
  cards: {},
};

test("listsHolding names every list that runs the card, matching front faces case-insensitively", () => {
  expect(listsHolding(DECK, "Sol Ring")).toEqual(["main", "v3"]);
  expect(listsHolding(DECK, "Arcane Signet")).toEqual(["v3"]);
  expect(listsHolding(DECK, "Delver of Secrets // Insectile Aberration")).toEqual(["sideboard"]);
  expect(listsHolding(DECK, "Tony Stark")).toEqual(["main"]);
  expect(listsHolding(DECK, "Lightning Bolt")).toEqual([]);
});
