#!/usr/bin/env bun
/**
 * deckcheck.ts — validate a keep-pile / decklist against the project's guardrails.
 *
 * Reports total card count, mana sources (lands + mana-producing artifacts), Game Changers and
 * the bracket they imply, and — when the deck folder holds a comparison sample — per-card field
 * coverage across it.
 *
 * Type and mana information comes from `decks/<slug>/research/cards.txt`, so run
 * `bun run carddata` first if the cache is cold; uncached cards simply don't count toward the
 * mana totals. Field samples come from `premium_*_decks.json` / `new_*_decks_clean.json`.
 *
 * The deck comes from `--deck <slug>`, or is inferred from a `--file` path inside `decks/<slug>/`.
 *
 * Usage (from the repo root):
 *   bun run deckcheck --file decks/edgar-markov/DECK.md
 *   cat keeppile.txt | bun run deckcheck --deck edgar-markov
 */
import { existsSync, readFileSync } from "node:fs";
import { searchCards } from "./lib/scryfall.ts";
import {
  deckSlugFrom,
  frontFace,
  isBasicLand,
  loadFieldSamples,
  parseCacheInfo,
  parseKeepPile,
  readCacheText,
  type DeckEntry,
} from "./lib/deck-research.ts";
import { popFlag, readStdin } from "./lib/cli.ts";

const USAGE =
  "usage: deckcheck --file decks/<slug>/<list>  |  deckcheck --deck <slug> (list on stdin)";

/** A Commander deck is 100 cards, and ~40 mana sources is this repo's floor (see deck-brain). */
const DECK_SIZE = 100;
const MIN_MANA_SOURCES = 40;
/** Wizards' bracket rule: more than three Game Changers pushes a deck out of bracket 3. */
const BRACKET_3_MAX_GAME_CHANGERS = 3;
/** Appearing in 4+ of the sample decks marks a card as a consensus staple. */
const STAPLE_THRESHOLD = 4;

/** Count lands and mana rocks, using the cached type line and `produces` field. */
function countManaSources(entries: DeckEntry[], cacheText: string): { lands: number; rocks: number } {
  const info = parseCacheInfo(cacheText);
  let lands = 0;
  let rocks = 0;

  for (const { name, qty } of entries) {
    const card = info[frontFace(name)];
    if (!card) continue;

    const producesMana = card.produces !== "-" && card.produces !== "";

    if (card.typeLine.includes("Land")) lands += qty;
    else if (card.typeLine.includes("Artifact") && producesMana) rocks += qty;
  }
  return { lands, rocks };
}

/** Fetch Wizards' Game Changer list. A network failure degrades to "none found" with a warning
 *  rather than aborting the whole report — the count and mana lines are still worth printing. */
async function fetchGameChangers(): Promise<string[]> {
  try {
    const cards = await searchCards("is:gamechanger");
    return cards.map((c) => frontFace(c.name));
  } catch (err) {
    console.error(`[gamechanger fetch error: ${err instanceof Error ? err.message : err}]`);
    return [];
  }
}

function readEntries(filePath: string | undefined): DeckEntry[] {
  if (!filePath) return parseKeepPile(readStdin());

  if (!existsSync(filePath)) {
    console.error(`no such file: ${filePath}`);
    process.exit(1);
  }
  return parseKeepPile(readFileSync(filePath, "utf8"));
}

const argv = process.argv.slice(2);
const [deckFlag, afterDeck] = popFlag(argv, "--deck");
const [fileFlag] = popFlag(afterDeck, "--file");

const slug = deckSlugFrom(deckFlag, fileFlag);
if (!slug) {
  console.error(USAGE);
  process.exit(1);
}

const entries = readEntries(fileFlag);
if (entries.length === 0) {
  console.error(USAGE);
  process.exit(1);
}

const cacheText = readCacheText(slug);
const total = entries.reduce((sum, e) => sum + e.qty, 0);
const { lands, rocks } = countManaSources(entries, cacheText);

const gameChangers = await fetchGameChangers();
const inDeck = entries
  .map((e) => e.name)
  .filter((name) => gameChangers.includes(frontFace(name)))
  .sort();
const bracket = inDeck.length <= BRACKET_3_MAX_GAME_CHANGERS ? "3 (or lower)" : "4+";

console.log("=== DECK CHECK ===");
console.log(`Total cards: ${total}${total === DECK_SIZE ? "" : "   ⚠️ not 100"}`);
console.log(
  `Mana sources: lands ${lands} + rocks ${rocks} = ${lands + rocks}` +
    (lands + rocks < MIN_MANA_SOURCES ? `   ⚠️ low (<${MIN_MANA_SOURCES})` : ""),
);
console.log(`Game Changers: ${inDeck.length} -> Bracket ${bracket}`);
for (const name of inDeck) console.log(`    🔴 ${name}`);

const samples = loadFieldSamples(slug);
if (samples.length === 0) {
  console.log(`\n[no field sample under decks/${slug}/research/ — skipping coverage]`);
} else {
  console.log(`\nField coverage (of ${samples.length} sample decks):`);

  for (const { name } of [...entries].sort((a, b) => a.name.localeCompare(b.name))) {
    if (isBasicLand(name)) continue;

    const count = samples.filter((deck) => deck.includes(frontFace(name))).length;
    const flag =
      count >= STAPLE_THRESHOLD ? " 🟢staple" : count === 0 ? ` ⚪0/${samples.length}` : "";

    console.log(`   ${count}/${samples.length}  ${name}${flag}`);
  }
}
