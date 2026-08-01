/** Client-side card-lookup service. Card DATA comes from our own server (persistent
 *  data/card-names.json cache — the browser never talks to Scryfall for data; direct calls
 *  proved fragile: Scryfall's edge intermittently fails bursts with CORS-headerless responses).
 *  Image BYTES still load from Scryfall's CDN via <img> with immutable cache headers, like the
 *  collection grid. This layer adds: session memo, serialization (StrictMode double-fires
 *  effects), retry with backoff, and known-missing tracking. */
import { lookupCards } from "~/server/decks";

function serverLookup(names: string[]): Promise<Record<string, any>> {
  return lookupCards({ data: { names } });
}

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

async function load(names: string[], fetcher: Fetcher, retryDelayMs: number): Promise<CardLookup> {
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
  fetcher: Fetcher = serverLookup,
  opts: { retryDelayMs?: number } = {},
): Promise<CardLookup> {
  const run = queue.then(() => load(names, fetcher, opts.retryDelayMs ?? 2500));
  queue = run.catch(() => {});
  return run;
}
