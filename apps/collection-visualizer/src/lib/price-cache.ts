import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { PriceCache } from './types'
import { toPriceSet, toEnriched } from './scryfall'

export const TTL_MS = 24 * 60 * 60 * 1000

export const DATA_DIR = process.env.DATA_DIR ?? join(process.cwd(), 'data')
const CACHE_PATH = join(DATA_DIR, 'prices.json')

/** Owned ids that are missing from the cache or older than the TTL. */
export function staleIds(cache: PriceCache, ownedIds: string[], now: number): string[] {
  return [...new Set(ownedIds)].filter((id) => {
    const hit = cache[id]
    return !hit || now - hit.fetchedAt >= TTL_MS
  })
}

/** Pure: fold freshly-fetched raw cards into the cache, rotating current→previous. */
export function mergeRefresh(cache: PriceCache, rawById: Record<string, any>, now: number): PriceCache {
  const next: PriceCache = { ...cache }
  for (const [id, raw] of Object.entries(rawById)) {
    const prior = cache[id]
    next[id] = {
      current: toPriceSet(raw),
      previous: prior ? prior.current : null,
      enriched: toEnriched(raw),
      fetchedAt: now,
    }
  }
  return next
}

export async function loadCache(): Promise<PriceCache> {
  try {
    return JSON.parse(await readFile(CACHE_PATH, 'utf8')) as PriceCache
  } catch {
    return {}
  }
}

export async function saveCache(cache: PriceCache): Promise<void> {
  await mkdir(dirname(CACHE_PATH), { recursive: true })
  await writeFile(CACHE_PATH, JSON.stringify(cache, null, 2) + '\n')
}
