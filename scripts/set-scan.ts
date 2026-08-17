/** Scan an entire Scryfall set and emit per-deck candidate pools.
 *
 *  `bun run set-scan <set-code>` fetches every unique card in the set (alt-art extras
 *  excluded), writes a searchable index to `data/<code>-index.json`, then filters it by
 *  colour identity into `data/<code>-candidates-<deck>.json` — one file per deck in DECKS
 *  below. Those per-deck files are what a new-set review pass classifies card by card;
 *  the first run of the workflow is decks/<slug>/research/hob-set-review-2026-08-09.md.
 *
 *  The fetch asserts completeness against Scryfall's own total before writing anything —
 *  a partial index silently poisons every count derived from it (see the deck-brain
 *  LEDGER, "Trusted a stale cached field instead of the authoritative list"). */

import { request, toSummary, type CardSummary } from "./lib/scryfall";
import { DATA_DIR } from "./lib/paths";
import { resolve } from "node:path";

/** Colour identity per deck, maintained by hand because DECK.md doesn't encode it.
 *  Keep in sync with the commanders in decks/. A card fits a deck when its colour
 *  identity is a subset of the deck's. */
const DECKS: Record<string, string[]> = {
  "edgar-markov": ["W", "B", "R"],
  "iron-man": ["U", "R"],
  "scarlet-witch": ["R"],
};

const code = (process.argv[2] ?? "").toLowerCase();

if (!code) {
  console.error("Usage: bun run set-scan <set-code>   e.g. bun run set-scan hob");
  process.exit(1);
}

const set = await request(`/sets/${code}`);
console.log(`${set.name} (${code.toUpperCase()}) — ${set.set_type}, released ${set.released_at}, ${set.card_count} printings`);

const cards: CardSummary[] = [];
let expected = 0;
let path: string | null = `/cards/search?${new URLSearchParams({ q: `e:${code}`, unique: "cards", order: "set" })}`;

while (path) {
  const body: any = await request(path);
  expected = body.total_cards;
  for (const card of body.data ?? []) cards.push(toSummary(card));
  path = body.has_more ? new URL(body.next_page).pathname + new URL(body.next_page).search : null;
}

if (cards.length !== expected) {
  throw new Error(`Fetched ${cards.length} of ${expected} cards — aborting rather than writing a partial index.`);
}

await Bun.write(resolve(DATA_DIR, `${code}-index.json`), JSON.stringify(cards, null, 1));
console.log(`\n${cards.length} unique cards → data/${code}-index.json`);

const gameChangers = cards.filter((c) => c.gameChanger).map((c) => c.name);
console.log(`Game Changers: ${gameChangers.length ? gameChangers.join(", ") : "none"}`);

const keywordCounts: Record<string, number> = {};

for (const card of cards) {
  for (const keyword of card.keywords) {
    keywordCounts[keyword] = (keywordCounts[keyword] ?? 0) + 1;
  }
}

const topKeywords = Object.entries(keywordCounts)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 10)
  .map(([keyword, count]) => `${keyword} ${count}`)
  .join(" · ");
console.log(`Top keywords: ${topKeywords}\n`);

for (const [slug, identity] of Object.entries(DECKS)) {
  const fits = cards.filter(
    (c) => c.commanderLegal === "legal" && !c.colorIdentity.some((color) => !identity.includes(color)),
  );

  await Bun.write(resolve(DATA_DIR, `${code}-candidates-${slug}.json`), JSON.stringify(fits, null, 1));
  console.log(`${slug} (${identity.join("")}): ${fits.length} candidates → data/${code}-candidates-${slug}.json`);
}
