#!/usr/bin/env bun
/**
 * carddata.ts — print card descriptions from a deck's local cache, fetching + caching misses.
 *
 * Cache-first: every name is looked up in `decks/<slug>/research/cards.txt` and only genuine
 * misses go to Scryfall, in one batched call, and are appended to the cache. The cache stays
 * the source of truth (see `decks/README.md`).
 *
 * The deck comes from `--deck <slug>`, or is inferred from a `--file` path inside `decks/<slug>/`.
 * With no names, no file and no stdin, the deck's own list (main, or `--list id`) is used.
 *
 * Usage (from the repo root):
 *   bun run carddata --deck edgar-markov "Blood Artist" "Sol Ring"
 *   bun run carddata --deck edgar-markov                      # every card of the main list
 *   bun run carddata --deck edgar-markov --list combat        # another list
 *   bun run carddata --file decks/edgar-markov/research/pool.txt   # a pasted list; slug inferred
 *   echo "1 Mirkwood Bats" | bun run carddata --deck edgar-markov
 */
import { appendFileSync, mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname } from "node:path";
import { request } from "./lib/scryfall.ts";
import {
  blockFor,
  cacheBlock,
  cardsCachePath,
  cleanEntryName,
  deckSlugFrom,
  frontFace,
  parseKeepPile,
  readCacheText,
  slugFromDeckArg,
} from "./lib/deck-research.ts";
import { listNames, pickList } from "./lib/deck-model.ts";
import { readDeck } from "./lib/deck-store.ts";
import { popFlag, readStdin } from "./lib/cli.ts";

const USAGE =
  "usage: carddata --deck <slug> [--list id] [<names…>]  |  carddata --file <list file>  (or pipe a list on stdin)";

/** Fetch the misses in one `/cards/collection` call and append them to the cache.
 *  Network failure is reported but not fatal — the caller still prints whatever was cached. */
/** Scryfall's `/cards/collection` rejects more than 75 identifiers per request. */
const COLLECTION_BATCH = 75;

async function fetchAndCache(missing: string[], cachePath: string, deck: string): Promise<void> {
  const fetched: any[] = [];
  const notFound: string[] = [];

  for (let i = 0; i < missing.length; i += COLLECTION_BATCH) {
    const batch = missing.slice(i, i + COLLECTION_BATCH);
    let body: any;

    try {
      body = await request("/cards/collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifiers: batch.map((n) => ({ name: frontFace(n) })) }),
      });
    } catch (err) {
      console.error(`[fetch error: ${err instanceof Error ? err.message : err}]`);
      continue; // Keep going: a later batch may still succeed, and the cache stays valid.
    }

    fetched.push(...(body.data ?? []));
    notFound.push(...(body.not_found ?? []).map((nf: any) => nf.name ?? JSON.stringify(nf)));
  }

  if (fetched.length === 0 && notFound.length === 0) return;

  mkdirSync(dirname(cachePath), { recursive: true });

  // Seed a fresh cache with the same header the established decks carry, so a new deck's
  // cards.txt is self-describing rather than starting with a bare blank line.
  if (!existsSync(cachePath)) {
    writeFileSync(
      cachePath,
      `# LOCAL CARD CACHE — ${deck}\n` +
        `# Prices are a USD snapshot from Scryfall at the time each card was first cached.\n` +
        `# Format:  ## Name / cost|type|CI|produces|usd / oracle\n`,
    );
  }

  for (const card of fetched) {
    appendFileSync(cachePath, "\n" + cacheBlock(card));
  }

  if (notFound.length > 0) {
    console.error(`[not found on Scryfall: ${notFound.join(", ")}]`);
  }
}

/** Collect the requested names: from `--file`, from positional arguments, or from stdin. */
function readNames(filePath: string | undefined, positional: string[]): string[] {
  const names: string[] = [];

  if (filePath) {
    if (!existsSync(filePath)) {
      console.error(`no such file: ${filePath}`);
      process.exit(1);
    }
    names.push(...parseKeepPile(readFileSync(filePath, "utf8")).map((e) => e.name));
  }
  names.push(...positional.map(cleanEntryName));

  if (names.length === 0) {
    names.push(...parseKeepPile(readStdin()).map((e) => e.name));
  }
  return names.filter(Boolean);
}

const argv = process.argv.slice(2);
const [deckFlag, afterDeck] = popFlag(argv, "--deck");
const [fileFlag, afterFile] = popFlag(afterDeck, "--file");
const [listFlag, rest] = popFlag(afterFile, "--list");

const slug = deckSlugFrom(deckFlag ? slugFromDeckArg(deckFlag) : undefined, fileFlag);
if (!slug) {
  console.error(USAGE);
  process.exit(1);
}

let names = readNames(fileFlag, rest.filter((a) => !a.startsWith("--")));
if (names.length === 0 && deckFlag) {
  // No explicit names: describe the deck's own list.
  const deck = await readDeck(slug);
  names = listNames(pickList(deck, listFlag).list);
}
if (names.length === 0) {
  console.error(USAGE);
  process.exit(1);
}

const cachePath = cardsCachePath(slug);
let cacheText = readCacheText(slug);

// Dedupe before fetching so a decklist with repeats costs one identifier, not several.
const missing = [...new Set(names.filter((n) => !blockFor(n, cacheText)))];
if (missing.length > 0) {
  await fetchAndCache(missing, cachePath, slug);
  cacheText = readCacheText(slug);
}

for (const name of names) {
  const block = blockFor(name, cacheText);
  console.log(block ?? `## ${name}\n[no data — not in cache or on Scryfall]`);
  console.log();
}
