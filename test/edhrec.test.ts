import { test, expect } from "bun:test";
import {
  slugify,
  projectCommanderPage,
  projectCardPage,
  crossRefDeck,
} from "../scripts/lib/edhrec.ts";

test("slugify lowercases, strips punctuation, and hyphenates spaces", () => {
  expect(slugify("Sol Ring")).toEqual("sol-ring");
  expect(slugify("Atraxa, Praetors' Voice")).toEqual("atraxa-praetors-voice");
  expect(slugify("Borrowing 100,000 Arrows")).toEqual("borrowing-100000-arrows");
});

test("slugify uses the front face of a double-faced name and keeps in-name hyphens", () => {
  expect(slugify("Tony Stark // The Invincible Iron Man")).toEqual("tony-stark");
  expect(slugify("Fable of the Mirror-Breaker // Reflection of Kiki-Jiki")).toEqual(
    "fable-of-the-mirror-breaker",
  );
});

test("slugify folds accented characters to ASCII", () => {
  expect(slugify("Mjölnir, Hammer of Thor")).toEqual("mjolnir-hammer-of-thor");
});

/** A trimmed raw commander page in the shape json.edhrec.com actually serves. */
const rawCommanderPage = {
  container: {
    json_dict: {
      card: { name: "The Scarlet Witch", sanitized: "the-scarlet-witch", num_decks: 1721, rank: 1214 },
      cardlists: [
        {
          header: "High Synergy Cards",
          tag: "highsynergycards",
          cardviews: [
            { name: "Repercussion", synergy: 0.62, num_decks: 1100, potential_decks: 1721 },
            { name: "Chandra's Ignition", synergy: 0.41, num_decks: 860, potential_decks: 1721 },
          ],
        },
        {
          header: "Top Cards",
          tag: "topcards",
          cardviews: [
            { name: "Sol Ring", synergy: 0.01, num_decks: 1600, potential_decks: 1721 },
            {
              name: "Valakut Awakening // Valakut Stoneforge",
              synergy: 0.35,
              num_decks: 900,
              potential_decks: 1721,
            },
          ],
        },
      ],
    },
  },
  tag_counts: [
    { value: "Spellslinger", slug: "spellslinger", count: 141 },
    { value: "Burn", slug: "burn", count: 64 },
  ],
};

test("projectCommanderPage extracts commander stats, themes, and per-list card stats", () => {
  expect(projectCommanderPage(rawCommanderPage)).toEqual({
    name: "The Scarlet Witch",
    slug: "the-scarlet-witch",
    numDecks: 1721,
    rank: 1214,
    url: "https://edhrec.com/commanders/the-scarlet-witch",
    themes: [
      { name: "Spellslinger", slug: "spellslinger", count: 141 },
      { name: "Burn", slug: "burn", count: 64 },
    ],
    lists: [
      {
        header: "High Synergy Cards",
        tag: "highsynergycards",
        cards: [
          { name: "Repercussion", synergy: 0.62, numDecks: 1100, potentialDecks: 1721, inclusionPct: 64 },
          { name: "Chandra's Ignition", synergy: 0.41, numDecks: 860, potentialDecks: 1721, inclusionPct: 50 },
        ],
      },
      {
        header: "Top Cards",
        tag: "topcards",
        cards: [
          { name: "Sol Ring", synergy: 0.01, numDecks: 1600, potentialDecks: 1721, inclusionPct: 93 },
          {
            name: "Valakut Awakening // Valakut Stoneforge",
            synergy: 0.35,
            numDecks: 900,
            potentialDecks: 1721,
            inclusionPct: 52,
          },
        ],
      },
    ],
  });
});

/** A trimmed raw card page: the card object carries totals + salt; lists carry commanders. */
const rawCardPage = {
  container: {
    json_dict: {
      card: {
        name: "Sol Ring",
        sanitized: "sol-ring",
        num_decks: 8106617,
        potential_decks: 9000000,
        salt: 1.46,
      },
      cardlists: [
        {
          header: "Top Commanders",
          tag: "topcommanders",
          cardviews: [
            { name: "Atraxa, Praetors' Voice", synergy: 0.02, num_decks: 40000, potential_decks: 42000 },
          ],
        },
      ],
    },
  },
};

test("projectCardPage extracts inclusion, salt, and top commanders", () => {
  expect(projectCardPage(rawCardPage)).toEqual({
    name: "Sol Ring",
    slug: "sol-ring",
    numDecks: 8106617,
    potentialDecks: 9000000,
    inclusionPct: 90,
    salt: 1.46,
    url: "https://edhrec.com/cards/sol-ring",
    topCommanders: [
      { name: "Atraxa, Praetors' Voice", synergy: 0.02, numDecks: 40000, potentialDecks: 42000, inclusionPct: 95 },
    ],
  });
});

test("crossRefDeck matches deck cards front-face-first and ranks absent cards as ideas by synergy", () => {
  const page = projectCommanderPage(rawCommanderPage);
  const result = crossRefDeck(page, ["Repercussion", "Valakut Awakening", "Mountain", "Weird Pet Card"]);

  expect(result).toEqual({
    // Basic lands carry no field signal and are skipped entirely.
    inDeck: [
      {
        name: "Repercussion",
        stat: {
          name: "Repercussion",
          synergy: 0.62,
          numDecks: 1100,
          potentialDecks: 1721,
          inclusionPct: 64,
          list: "High Synergy Cards",
        },
      },
      {
        name: "Valakut Awakening",
        stat: {
          name: "Valakut Awakening // Valakut Stoneforge",
          synergy: 0.35,
          numDecks: 900,
          potentialDecks: 1721,
          inclusionPct: 52,
          list: "Top Cards",
        },
      },
      { name: "Weird Pet Card", stat: null },
    ],
    ideas: [
      {
        name: "Chandra's Ignition",
        synergy: 0.41,
        numDecks: 860,
        potentialDecks: 1721,
        inclusionPct: 50,
        list: "High Synergy Cards",
      },
      { name: "Sol Ring", synergy: 0.01, numDecks: 1600, potentialDecks: 1721, inclusionPct: 93, list: "Top Cards" },
    ],
  });
});

test("crossRefDeck keeps a card's first-list stats when it appears in several lists", () => {
  const page = projectCommanderPage({
    container: {
      json_dict: {
        card: { name: "X", sanitized: "x", num_decks: 100, rank: 1 },
        cardlists: [
          {
            header: "High Synergy Cards",
            tag: "highsynergycards",
            cardviews: [{ name: "Twice Listed", synergy: 0.5, num_decks: 60, potential_decks: 100 }],
          },
          {
            header: "Creatures",
            tag: "creatures",
            cardviews: [{ name: "Twice Listed", synergy: 0.5, num_decks: 60, potential_decks: 100 }],
          },
        ],
      },
    },
    tag_counts: [],
  });

  expect(crossRefDeck(page, []).ideas).toEqual([
    { name: "Twice Listed", synergy: 0.5, numDecks: 60, potentialDecks: 100, inclusionPct: 60, list: "High Synergy Cards" },
  ]);
});
