import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { DATA_DIR, TTL_MS } from "./price-cache";
import { fetchAllSets, fetchSvg } from "~/lib/data/scryfall";
import { emptyIconCache, iconId, missingIcons, parseSetIcon, type SetIconCache } from "~/lib/data/set-icons";

// Fetching + disk for the vendored set symbols. Kept apart from set-icons.ts (the pure half) because
// that one is reachable from the client bundle, and these node imports must not follow it there.

const CACHE_PATH = join(DATA_DIR, "set-icons.json");
const DOWNLOAD_CONCURRENCY = 8;

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;

  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i]);
    }
  };

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

export async function loadIconCache(): Promise<SetIconCache> {
  try {
    const parsed = JSON.parse(await readFile(CACHE_PATH, "utf8"));
    return { ...emptyIconCache(), ...parsed };
  } catch {
    return emptyIconCache();
  }
}

export async function saveIconCache(cache: SetIconCache): Promise<void> {
  await mkdir(dirname(CACHE_PATH), { recursive: true });
  await writeFile(CACHE_PATH, JSON.stringify(cache) + "\n");
}

/** Bring the vendored symbols up to date: re-pull the set list once a day (picking up sets released
 *  since last time), then download any symbol still missing. Downloads are driven off the cached URL
 *  map rather than only a fresh list, so a symbol that failed last time is retried on the next
 *  refresh instead of waiting out the list's TTL. Individual failures are skipped — a missing symbol
 *  just doesn't render. */
export async function refreshSetIcons(now: number): Promise<SetIconCache> {
  const cache = await loadIconCache();
  const listStale = now - cache.fetchedAt >= TTL_MS;
  const next: SetIconCache = { ...cache, sets: { ...cache.sets }, uris: { ...cache.uris }, icons: { ...cache.icons } };

  if (listStale) {
    const sets = await fetchAllSets();
    for (const s of sets) {
      const id = iconId(s.iconUri);
      next.sets[s.code] = id;
      next.uris[id] = s.iconUri;
    }
    next.fetchedAt = now;
  }

  const missing = missingIcons(next);
  if (missing.length === 0 && !listStale) return cache;

  const fetched = await mapLimit(missing, DOWNLOAD_CONCURRENCY, async (m) => {
    try {
      const icon = parseSetIcon(await fetchSvg(m.uri));
      return icon ? { id: m.id, icon } : null;
    } catch {
      return null;
    }
  });

  for (const f of fetched) {
    if (f) next.icons[f.id] = f.icon;
  }

  await saveIconCache(next);
  return next;
}
