import { test, expect } from "bun:test";
import {
  blockFor,
  cacheBlock,
  cleanEntryName,
  commanderFromDeck,
  deckSlugFrom,
  frontFace,
  isBasicLand,
  parseCacheInfo,
  parseKeepPile,
} from "../scripts/lib/deck-research.ts";
import { popFlag } from "../scripts/lib/cli.ts";

// ---------------------------------------------------------------- slug resolution

test("deckSlugFrom prefers an explicit --deck over the file path", () => {
  expect(deckSlugFrom("iron-man", "decks/edgar-markov/DECK.md")).toEqual("iron-man");
});

test("deckSlugFrom infers the slug from a path inside decks/", () => {
  expect(deckSlugFrom(undefined, "decks/edgar-markov/DECK.md")).toEqual("edgar-markov");
  expect(deckSlugFrom(undefined, "/Users/x/mtg-agent/decks/scarlet-witch/DECK-B4.md")).toEqual(
    "scarlet-witch",
  );
});

test("deckSlugFrom infers the slug from a Windows-style path", () => {
  expect(deckSlugFrom(undefined, "decks\\iron-man\\DECK.md")).toEqual("iron-man");
});

test("deckSlugFrom returns null when neither source yields a slug", () => {
  expect(deckSlugFrom(undefined, undefined)).toEqual(null);
  expect(deckSlugFrom(undefined, "some/other/file.md")).toEqual(null);
});

// ---------------------------------------------------------------- name handling

test("frontFace reduces a double-faced name to its front", () => {
  expect(frontFace("Agadeem's Awakening // Agadeem, the Undercrypt")).toEqual(
    "Agadeem's Awakening",
  );
  expect(frontFace("Sol Ring")).toEqual("Sol Ring");
});

test("cleanEntryName strips counts, treatments, and printing references", () => {
  expect(cleanEntryName("1 Blood Artist")).toEqual("Blood Artist");
  expect(cleanEntryName("2x Sol Ring")).toEqual("Sol Ring");
  expect(cleanEntryName("Bloodline Keeper (Showcase)")).toEqual("Bloodline Keeper");
  expect(cleanEntryName("Chaos Warp [DSK] 138")).toEqual("Chaos Warp");
  expect(cleanEntryName("1 Ponder (m10) 66 *F*")).toEqual("Ponder");
});

test("isBasicLand recognises only the five basics", () => {
  expect(isBasicLand("Mountain")).toEqual(true);
  expect(isBasicLand("Snow-Covered Mountain")).toEqual(false);
  expect(isBasicLand("Sol Ring")).toEqual(false);
});

// ---------------------------------------------------------------- keep-pile parsing

test("parseKeepPile reads counts and skips comments, quotes, and header lines", () => {
  const text = [
    "# a comment",
    "> a quote",
    "Commander: Edgar Markov",
    "Total: 100",
    "",
    "1x Blood Artist",
    "10 Swamp",
  ].join("\n");

  expect(parseKeepPile(text)).toEqual([
    { name: "Blood Artist", qty: 1 },
    { name: "Swamp", qty: 10 },
  ]);
});

test("parseKeepPile accumulates repeated names in first-seen order", () => {
  expect(parseKeepPile("1 Sol Ring\n1 Mountain\n2 Sol Ring")).toEqual([
    { name: "Sol Ring", qty: 3 },
    { name: "Mountain", qty: 1 },
  ]);
});

test("parseKeepPile returns empty for prose with no cards", () => {
  expect(parseKeepPile("# Just headers\n\n> and a quote\n")).toEqual([]);
});

test("parseKeepPile ignores uncounted prose once the list has counts (DECK.md metadata)", () => {
  const deckMd = [
    "# Iron Man — Izzet Artifact Voltron",
    "",
    "Commander: Tony Stark // The Invincible Iron Man (UR)",
    "Bracket: 3   ·   Total: 100/100",
    "",
    "Game Changers (3/3 — at the bracket 3 cap): Ancient Tomb · Fierce Guardianship · The One Ring",
    "",
    "## Commander (1)",
    "",
    "1x Tony Stark",
    "",
    "## Lands (37)",
    "",
    "8 Island",
  ].join("\n");

  expect(parseKeepPile(deckMd)).toEqual([
    { name: "Tony Stark", qty: 1 },
    { name: "Island", qty: 8 },
  ]);
});

test("parseKeepPile still accepts bare names when no line carries a count", () => {
  expect(parseKeepPile("Sol Ring\nBlood Artist\nMountain")).toEqual([
    { name: "Sol Ring", qty: 1 },
    { name: "Blood Artist", qty: 1 },
    { name: "Mountain", qty: 1 },
  ]);
});

// ---------------------------------------------------------------- cache blocks

const CACHE = [
  "# LOCAL CARD CACHE",
  "",
  "## Agadeem's Awakening // Agadeem, the Undercrypt",
  "cost={X}{B}{B}{B} | type=Sorcery // Land | CI=B | produces=B | usd=$28.89",
  "Return from your graveyard... // As this land enters... {T}: Add {B}.",
  "",
  "## Sol Ring",
  "cost={1} | type=Artifact | CI=- | produces=C | usd=$1.50",
  "{T}: Add {C}{C}.",
  "",
  "## Blood Artist",
  "cost={1}{B} | type=Creature — Vampire | CI=B | produces=- | usd=$4.20",
  "Whenever Blood Artist or another creature dies, target player loses 1 life.",
  "",
].join("\n");

test("blockFor finds a single-faced card and trims it", () => {
  expect(blockFor("Sol Ring", CACHE)).toEqual(
    "## Sol Ring\ncost={1} | type=Artifact | CI=- | produces=C | usd=$1.50\n{T}: Add {C}{C}.",
  );
});

test("blockFor matches a double-faced card by its front face alone", () => {
  const block = blockFor("Agadeem's Awakening", CACHE);
  expect(block?.startsWith("## Agadeem's Awakening // Agadeem, the Undercrypt")).toEqual(true);
});

test("blockFor returns null for an uncached card", () => {
  expect(blockFor("Lightning Bolt", CACHE)).toEqual(null);
});

test("blockFor does not partially match a longer name", () => {
  expect(blockFor("Sol", CACHE)).toEqual(null);
});

test("parseCacheInfo indexes a DFC under both its full name and its front face", () => {
  const info = parseCacheInfo(CACHE);

  expect(info["Agadeem's Awakening"].typeLine).toEqual("Sorcery // Land");
  expect(info["Agadeem's Awakening // Agadeem, the Undercrypt"].typeLine).toEqual("Sorcery // Land");
  expect(info["Sol Ring"]).toEqual({ typeLine: "Artifact", produces: "C" });
  expect(info["Blood Artist"].produces).toEqual("-");
});

test("cacheBlock renders a single-faced card in the cache format", () => {
  const block = cacheBlock({
    name: "Sol Ring",
    mana_cost: "{1}",
    type_line: "Artifact",
    color_identity: [],
    produced_mana: ["C"],
    prices: { usd: "1.50" },
    oracle_text: "{T}: Add {C}{C}.",
  });

  expect(block).toEqual(
    "## Sol Ring\ncost={1} | type=Artifact | CI=- | produces=C | usd=$1.50\n{T}: Add {C}{C}.\n",
  );
});

test("cacheBlock flattens newlines and falls back to - and ? for absent fields", () => {
  const block = cacheBlock({
    name: "Mystery Card",
    type_line: "Enchantment",
    color_identity: ["B", "R"],
    oracle_text: "First line.\nSecond line.",
  });

  expect(block).toEqual(
    "## Mystery Card\ncost=- | type=Enchantment | CI=BR | produces=- | usd=$?\nFirst line. Second line.\n",
  );
});

test("cacheBlock joins faces of a double-faced card as Name: text", () => {
  const block = cacheBlock({
    name: "Agadeem's Awakening // Agadeem, the Undercrypt",
    type_line: "Sorcery // Land",
    color_identity: ["B"],
    produced_mana: ["B"],
    prices: { usd: "28.89" },
    card_faces: [
      { name: "Agadeem's Awakening", mana_cost: "{X}{B}{B}{B}", oracle_text: "Return..." },
      { name: "Agadeem, the Undercrypt", mana_cost: "", oracle_text: "{T}: Add {B}." },
    ],
  });

  expect(block).toEqual(
    "## Agadeem's Awakening // Agadeem, the Undercrypt\n" +
      "cost={X}{B}{B}{B} | type=Sorcery // Land | CI=B | produces=B | usd=$28.89\n" +
      "Agadeem's Awakening: Return... // Agadeem, the Undercrypt: {T}: Add {B}.\n",
  );
});

test("cacheBlock output is parseable by parseCacheInfo (round trip)", () => {
  const block = cacheBlock({
    name: "Arcane Signet",
    mana_cost: "{2}",
    type_line: "Artifact",
    color_identity: [],
    produced_mana: ["W", "U"],
    prices: { usd: "0.99" },
    oracle_text: "{T}: Add one mana of any color in your commander's identity.",
  });

  expect(parseCacheInfo(block)["Arcane Signet"]).toEqual({
    typeLine: "Artifact",
    produces: "W,U",
  });
});

// ---------------------------------------------------------------- argument parsing

test("popFlag extracts a flag value and returns the remaining arguments", () => {
  expect(popFlag(["--deck", "iron-man", "Sol Ring"], "--deck")).toEqual([
    "iron-man",
    ["Sol Ring"],
  ]);
});

test("popFlag leaves the list untouched when the flag is absent", () => {
  expect(popFlag(["Sol Ring"], "--deck")).toEqual([undefined, ["Sol Ring"]]);
});

test("popFlag handles two flags being popped in sequence", () => {
  const [deck, afterDeck] = popFlag(["--deck", "iron-man", "--file", "a.md", "x"], "--deck");
  const [file, rest] = popFlag(afterDeck, "--file");

  expect(deck).toEqual("iron-man");
  expect(file).toEqual("a.md");
  expect(rest).toEqual(["x"]);
});


// ---------------------------------------------------------------- deck.json era

test("slugFromDeckArg accepts a bare slug, a deck folder, or a deck.json path", () => {
  const { slugFromDeckArg } = require("../scripts/lib/deck-research.ts");
  expect(slugFromDeckArg("chatterfang")).toEqual("chatterfang");
  expect(slugFromDeckArg("decks/chatterfang")).toEqual("chatterfang");
  expect(slugFromDeckArg("decks/chatterfang/")).toEqual("chatterfang");
  expect(slugFromDeckArg("decks/chatterfang/deck.json")).toEqual("chatterfang");
  expect(slugFromDeckArg("/abs/mtg-agent/decks/iron-man/deck.json")).toEqual("iron-man");
});

test("commanderFromDeck reads the Commander section of the chosen list", () => {
  const deck = {
    schema: 1,
    name: "x",
    format: "commander",
    lists: {
      main: { label: "Main", kind: "deck", sections: [{ name: "Commander (1)", cards: [{ name: "Edgar Markov", qty: 1 }] }] },
      alt: { label: "Alt", kind: "deck", sections: [{ name: "Commander", cards: [{ name: "Zed", qty: 1 }] }] },
      none: { label: "None", kind: "pool", sections: [{ name: "Pocket", cards: [{ name: "Sol Ring", qty: 1 }] }] },
    },
    cards: {},
  } as any;
  expect(commanderFromDeck(deck)).toEqual("Edgar Markov");
  expect(commanderFromDeck(deck, "alt")).toEqual("Zed");
  expect(commanderFromDeck(deck, "none")).toEqual(null);
});
