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

const key = (name: string): string => normalizeCardName(name).toLowerCase();
const isFresh = (entry: CacheEntry, now: number): boolean => now - entry.fetchedAt < TTL_MS;

/** Canonical spelling for matching and storage: NFC, straight quotes, single spaces. Accents are
 *  kept — Scryfall's own name for the card has them. */
export function normalizeCardName(name: string): string {
  return name
    .normalize("NFC")
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/** Match key: normalised, lower-cased, accents stripped — so `Bartolome` finds `Bartolomé`. Only
 *  ever used for comparison; the stored name is always Scryfall's. */
export function matchKey(name: string): string {
  return normalizeCardName(name).toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

/** The name a deck file uses for a card: the front face. `Valakut Awakening`, never
 *  `Valakut Awakening // Valakut Stoneforge` — the convention every tool here shares. */
export function deckName(summary: { name: string }): string {
  return summary.name.split(" // ")[0].trim();
}

export interface ResolveResult {
  /** Keyed by the name exactly as the caller requested it, so no caller re-derives a key. */
  found: Record<string, CardSummary>;
  /** Requested names nothing matched — a typo, a card Scryfall does not know, or Scryfall being
   *  unreachable. Never persisted: the next lookup tries again. */
  unresolved: string[];
  /** Set when Scryfall could not be reached: stale cache entries were served instead, and names
   *  with no cached entry at all are in `unresolved` only for that reason. */
  degraded?: string;
}

/** Pair requested names with fetched cards. A card matches its full name and its front face, and
 *  a real card whose name equals another card's front face is never shadowed by the alias. Pure. */
export function matchRequested(requested: string[], cards: CardSummary[]): ResolveResult {
  const byKey: Record<string, CardSummary> = {};
  for (const card of cards) {
    byKey[matchKey(card.name)] = card;
  }
  for (const card of cards) {
    const front = card.name.split(" // ")[0];
    const frontKey = matchKey(front);

    if (front !== card.name && !(frontKey in byKey)) {
      byKey[frontKey] = card;
    }
  }

  const found: Record<string, CardSummary> = {};
  const unresolved: string[] = [];
  for (const name of requested) {
    const hit = byKey[matchKey(name)];

    if (hit) found[name] = hit;
    else unresolved.push(name);
  }
  return { found, unresolved };
}

async function load(path = CARD_CACHE_PATH): Promise<CacheFile> {
  try {
    return JSON.parse(await readFile(path, "utf8")) as CacheFile;
  } catch {
    return {};
  }
}

async function save(cache: CacheFile, path = CARD_CACHE_PATH): Promise<void> {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(cache, null, 2) + "\n");
}

/** The keys a fetched card is stored under: its full name, and its front face unless another
 *  fetched card owns that name outright (same shadowing rule as {@link matchRequested}). Without
 *  the front-face key every deck line for a double-faced card would miss the cache forever. */
export function cacheKeysFor(summary: { name: string }, others: { name: string }[]): string[] {
  const keys = [key(summary.name)];
  const front = deckName(summary);

  if (front !== summary.name && !others.some((o) => o.name !== summary.name && key(o.name) === key(front))) {
    keys.push(key(front));
  }
  return keys;
}

/** Network and storage seams, injectable for tests. */
export interface ResolveDeps {
  cachePath?: string;
  fetchCollection?: typeof fetchCollection;
  fetchCardByName?: typeof fetchCardByName;
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

/** Resolve names through the cache, then one batched fetch for the misses, then a fuzzy single
 *  lookup for anything still missing (typos, accents Scryfall spells differently). Entries cached
 *  before `id` existed are treated as misses so they pick up the new fields.
 *
 *  Never stores a negative result — an absent card is reported in `unresolved` and retried on the
 *  next call. Persisting "not found" is what made cards vanish from the old workbench for good. */
export async function resolveNames(names: string[], now = Date.now(), deps: ResolveDeps = {}): Promise<ResolveResult> {
  const cachePath = deps.cachePath ?? CARD_CACHE_PATH;
  const fetchMany = deps.fetchCollection ?? fetchCollection;
  const fetchOne = deps.fetchCardByName ?? fetchCardByName;

  const unique = [...new Set(names.map(normalizeCardName).filter(Boolean))];
  const cache = await load(cachePath);
  const cached: CardSummary[] = [];
  const stale: CardSummary[] = [];
  const misses: string[] = [];

  for (const name of unique) {
    const hit = cache[key(name)] ?? cache[key(name.split(" // ")[0])];

    if (hit && isFresh(hit, now) && hit.summary.id) cached.push(hit.summary);
    else {
      misses.push(name);
      if (hit) stale.push(hit.summary);
    }
  }

  const fetched: CardSummary[] = [];
  let degraded: string | undefined;
  if (misses.length > 0) {
    try {
      const batch = await fetchMany(misses.map((n) => n.split(" // ")[0]));
      fetched.push(...batch.found);

      const stillMissing = matchRequested(misses, batch.found).unresolved;
      for (const name of stillMissing) {
        try {
          const fuzzy = await fetchOne(name);
          fetched.push(fuzzy);
        } catch {
          // Genuinely unknown: report it, store nothing.
        }
      }
    } catch (err) {
      // Scryfall unreachable: serve what the cache has, however old, and say so.
      degraded = `Scryfall unreachable (${err instanceof Error ? err.message : String(err)}); showing cached card data`;
    }

    if (fetched.length > 0) {
      for (const summary of fetched) {
        for (const k of cacheKeysFor(summary, fetched)) cache[k] = { summary, fetchedAt: now };
      }
      await save(cache, cachePath);
    }
  }

  const matched = matchRequested(unique, [...cached, ...fetched, ...(degraded ? stale : [])]);
  const found: Record<string, CardSummary> = {};
  const unresolved: string[] = [];
  for (const original of names) {
    const hit = matched.found[normalizeCardName(original)];

    if (hit) found[original] = hit;
    else unresolved.push(original);
  }
  return { found, unresolved, ...(degraded ? { degraded } : {}) };
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
