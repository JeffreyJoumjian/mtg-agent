/** Scan an entire Scryfall set and emit per-deck candidate pools, then check reviews cover them.
 *
 *  Usage:
 *    bun run set-scan <set-code>                                   # e.g. bun run set-scan trk
 *    bun run set-scan <code>[,<code>…] --check <review-file> [--deck <slug>]
 *
 *  The scan fetches every unique card in the set (alt-art extras excluded), writes a searchable
 *  index to `data/<code>-index.json`, then filters it by colour identity into
 *  `data/<code>-candidates-<deck>.json` — one file per deck that `listDeckSlugs()` returns, each
 *  filtered by the colour identity of the commanders on that deck's main list. Every card carries
 *  `reprint` (Scryfall's flag: printed before this set) and every candidate carries `inLists`, the
 *  ids of the deck's lists that already run it. Those per-deck files are what the set-review skill
 *  classifies card by card.
 *
 *  `--check` reads the review file and exits 1 if any card in the deck's pool (the union of every
 *  code given, so one review can cover a set and its Commander companion) has no table row in it.
 *  The deck is the `decks/<slug>/` folder the file sits in unless `--deck` names another, which is
 *  how one review file covering two decks gets checked against each.
 *
 *  The fetch asserts completeness against Scryfall's own total before writing anything —
 *  a partial index silently poisons every count derived from it (see the deck-brain
 *  LEDGER, "Trusted a stale cached field instead of the authoritative list"). */

import { request, toSummary, type CardSummary } from "./lib/scryfall";
import { DATA_DIR } from "./lib/paths";
import { resolveNames } from "./lib/card-cache";
import { commandersOf, pickList } from "./lib/deck-model";
import { listDeckSlugs, readDeck } from "./lib/deck-store";
import { listsHolding, uncoveredCards } from "./lib/set-review";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

type SetCard = CardSummary & { reprint: boolean };

const args = process.argv.slice(2);
const codes = (args[0] ?? "")
  .toLowerCase()
  .split(",")
  .filter((c) => c.length > 0);

if (codes.length === 0 || args[0].startsWith("--")) {
  console.error("Usage: bun run set-scan <set-code>   e.g. bun run set-scan trk");
  console.error("       bun run set-scan <code>[,<code>…] --check <review-file> [--deck <slug>]");
  process.exit(1);
}

const checkAt = args.indexOf("--check");

if (checkAt !== -1) {
  const file = args[checkAt + 1];
  const deckAt = args.indexOf("--deck");
  const slug = deckAt !== -1 ? args[deckAt + 1] : file?.match(/decks\/([^/]+)\/research\//)?.[1];

  if (!file || !existsSync(file) || !slug) {
    console.error(`--check needs an existing review file under decks/<slug>/research/, or --deck <slug>.`);
    process.exit(1);
  }

  const pool: Record<string, true> = {};

  for (const code of codes) {
    const poolPath = resolve(DATA_DIR, `${code}-candidates-${slug}.json`);

    if (!existsSync(poolPath)) {
      console.error(`No pool at data/${code}-candidates-${slug}.json. Run bun run set-scan ${code} first.`);
      process.exit(1);
    }
    for (const card of JSON.parse(readFileSync(poolPath, "utf8")) as CardSummary[]) pool[card.name] = true;
  }

  const names = Object.keys(pool);
  const missing = uncoveredCards(readFileSync(file, "utf8"), names);
  console.log(`${file}: ${names.length - missing.length} of ${names.length} ${slug} pool cards have a verdict row.`);

  if (missing.length > 0) {
    console.log(`No verdict for ${missing.length}: ${missing.join("; ")}`);
    process.exit(1);
  }
  process.exit(0);
}

if (codes.length > 1) {
  console.error("Scan one set at a time; a comma-separated list of codes only works with --check.");
  process.exit(1);
}

const code = codes[0];
const set = await request(`/sets/${code}`);
console.log(`${set.name} (${code.toUpperCase()}) — ${set.set_type}, released ${set.released_at}, ${set.card_count} printings`);

const cards: SetCard[] = [];
let expected = 0;
let path: string | null = `/cards/search?${new URLSearchParams({ q: `e:${code}`, unique: "cards", order: "set" })}`;

while (path) {
  const body: any = await request(path);
  expected = body.total_cards;
  for (const card of body.data ?? []) cards.push({ ...toSummary(card), reprint: card.reprint === true });
  path = body.has_more ? new URL(body.next_page).pathname + new URL(body.next_page).search : null;
}

if (cards.length !== expected) {
  throw new Error(`Fetched ${cards.length} of ${expected} cards — aborting rather than writing a partial index.`);
}

await Bun.write(resolve(DATA_DIR, `${code}-index.json`), JSON.stringify(cards, null, 1));
const reprintCount = cards.filter((c) => c.reprint).length;
console.log(`\n${cards.length} unique cards (${cards.length - reprintCount} new, ${reprintCount} reprints) → data/${code}-index.json`);

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

const slugs = await listDeckSlugs();

for (const slug of slugs) {
  const deck = await readDeck(slug);
  const { found } = await resolveNames(commandersOf(pickList(deck).list));
  const colours: Record<string, true> = {};

  for (const card of Object.values(found)) {
    for (const c of card.colorIdentity) colours[c] = true;
  }

  // A card fits a deck when its colour identity is a subset of the commanders' identity.
  const identity = ["W", "U", "B", "R", "G"].filter((c) => colours[c]);
  const fits = cards
    .filter((c) => c.commanderLegal === "legal" && !c.colorIdentity.some((color) => !identity.includes(color)))
    .map((c) => ({ ...c, inLists: listsHolding(deck, c.name) }));

  await Bun.write(resolve(DATA_DIR, `${code}-candidates-${slug}.json`), JSON.stringify(fits, null, 1));

  const reprints = fits.filter((c) => c.reprint).length;
  const already = fits.filter((c) => c.inLists.length > 0).length;
  console.log(
    `${slug} (${identity.join("") || "C"}): ${fits.length} candidates, ${fits.length - reprints} new, ${reprints} reprints, ` +
      `${already} already in a list → data/${code}-candidates-${slug}.json`,
  );
}
