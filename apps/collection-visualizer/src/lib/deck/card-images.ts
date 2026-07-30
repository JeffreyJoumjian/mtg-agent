/** Client-side card-image service over Scryfall lookups. Exists because raw per-component
 *  fetching proved fragile in practice: Scryfall's edge intermittently fails bursts with
 *  CORS-headerless responses (fetch hard-rejects), and React StrictMode double-fires effects.
 *  So: one session cache, all lookups serialized through a queue (no parallel bursts), retry
 *  with backoff on rejection, and known-missing tracking so nothing refetches forever. */
import { fetchCardsByNames } from "~/lib/data/scryfall";

type Fetcher = (names: string[]) => Promise<Record<string, any>>;

/** lowercased name → card, or null = confirmed not-found (don't refetch). */
let cache: Record<string, any> = {};
/** Serializes all lookups; a queued call sees the previous call's cache writes. */
let queue: Promise<unknown> = Promise.resolve();

export interface CardLookup {
  /** Keyed by lowercased name (front-face names included, per fetchCardsByNames). */
  cards: Record<string, any>;
  /** Names we could not resolve this call — not-found, or Scryfall unreachable. */
  missing: string[];
}

export function resetCardImagesForTests(): void {
  cache = {};
  queue = Promise.resolve();
}

async function load(
  names: string[],
  fetcher: Fetcher,
  retryDelayMs: number,
): Promise<CardLookup> {
  const wanted = [...new Set(names.filter(Boolean).map((n) => n.trim().toLowerCase()))];
  const unknown = wanted.filter((n) => !(n in cache));

  if (unknown.length > 0) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const fetched = await fetcher(unknown);
        Object.assign(cache, fetched);

        // Only after a SUCCESSFUL response may absent names be marked not-found; a thrown
        // fetch says nothing about the cards, and caching null there would poison retries.
        for (const n of unknown) {
          if (!(n in cache)) cache[n] = null;
        }
        break;
      } catch {
        if (attempt < 2) {
          await new Promise((r) => setTimeout(r, (attempt + 1) * retryDelayMs));
        }
      }
    }
  }

  const cards: Record<string, any> = {};
  const missing: string[] = [];

  for (const n of wanted) {
    const card = cache[n];
    if (card) cards[n] = card;
    else missing.push(n);
  }
  return { cards, missing };
}

export function getCardsByNames(
  names: string[],
  fetcher: Fetcher = fetchCardsByNames,
  opts: { retryDelayMs?: number } = {},
): Promise<CardLookup> {
  const run = queue.then(() => load(names, fetcher, opts.retryDelayMs ?? 2500));
  queue = run.catch(() => {});
  return run;
}
