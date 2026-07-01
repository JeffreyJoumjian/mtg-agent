/** Local, git-ignored card cache over the Scryfall client.
 *
 *  Prices update on Scryfall roughly daily, so each entry carries a fetch timestamp and is
 *  considered stale after `TTL_MS` (24 h). Reads auto-refresh stale/missing cards; a decklist
 *  lookup coalesces all misses into one batch `/cards/collection` request. `refreshAll()`
 *  re-pulls everything on command. The cache is a single JSON file for fast whole-file reads
 *  and trivial inspection — a deck's worth of cards is only a few hundred KB.
 *
 *  This is a snapshot/convenience layer, not source of truth: delete `data/card-cache.json`
 *  and it rebuilds itself on the next lookup. */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { CARD_CACHE_PATH } from "./paths.ts";
import { fetchCardByName, fetchCollection, type CardSummary } from "./scryfall.ts";

const TTL_MS = 24 * 60 * 60 * 1000;

interface CacheEntry {
  summary: CardSummary;
  fetchedAt: number;
}
type CacheFile = Record<string, CacheEntry>;

const key = (name: string): string => name.trim().toLowerCase();
const isFresh = (entry: CacheEntry, now: number): boolean => now - entry.fetchedAt < TTL_MS;

async function load(): Promise<CacheFile> {
  try {
    return JSON.parse(await readFile(CARD_CACHE_PATH, "utf8")) as CacheFile;
  } catch {
    return {};
  }
}

async function save(cache: CacheFile): Promise<void> {
  await mkdir(dirname(CARD_CACHE_PATH), { recursive: true });
  await writeFile(CARD_CACHE_PATH, JSON.stringify(cache, null, 2) + "\n");
}

/** Get one card, using the cache when fresh and falling back to a named lookup otherwise. */
export async function getCard(name: string, now = Date.now()): Promise<CardSummary> {
  const cache = await load();
  const hit = cache[key(name)];
  if (hit && isFresh(hit, now)) return hit.summary;

  const summary = await fetchCardByName(name);
  // Store under both the requested name and Scryfall's canonical name, so future lookups hit.
  cache[key(name)] = { summary, fetchedAt: now };
  cache[key(summary.name)] = { summary, fetchedAt: now };
  await save(cache);
  return summary;
}

export interface DeckLookup {
  found: CardSummary[];
  notFound: string[];
}

/** Get many cards; fresh ones come from cache, the rest are fetched in one batched call. */
export async function getCards(names: string[], now = Date.now()): Promise<DeckLookup> {
  const cache = await load();
  const found: CardSummary[] = [];
  const misses: string[] = [];

  for (const name of names) {
    const hit = cache[key(name)];
    if (hit && isFresh(hit, now)) found.push(hit.summary);
    else misses.push(name);
  }

  const notFound: string[] = [];
  if (misses.length > 0) {
    const result = await fetchCollection(misses);
    for (const summary of result.found) {
      cache[key(summary.name)] = { summary, fetchedAt: now };
      found.push(summary);
    }
    notFound.push(...result.notFound);
    // Also key any miss whose canonical name we resolved, so the raw input hits next time.
    for (const name of misses) {
      const match = result.found.find((c) => key(c.name) === key(name));
      if (match) cache[key(name)] = { summary: match, fetchedAt: now };
    }
    await save(cache);
  }

  return { found, notFound };
}

/** Re-fetch every card currently in the cache (prices + oracle) in batched requests. */
export async function refreshAll(now = Date.now()): Promise<number> {
  const cache = await load();
  const names = [...new Set(Object.values(cache).map((e) => e.summary.name))];
  if (names.length === 0) return 0;

  const { found } = await fetchCollection(names);
  const fresh: CacheFile = {};
  for (const summary of found) fresh[key(summary.name)] = { summary, fetchedAt: now };
  await save(fresh);
  return found.length;
}
