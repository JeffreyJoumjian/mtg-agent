// Server only — see lib/server/README.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { SetCache, SetInfo } from '~/lib/types'
import { fetchAllSets } from '~/lib/data/scryfall'
import { DATA_DIR } from './price-cache'

const CACHE_PATH = join(DATA_DIR, 'sets.json')

// A week, not the price TTL. Set sizes are fixed once a set is out; the only thing this misses is a
// set released since the last pull, and one stale week of that is harmless.
const SET_TTL_MS = 7 * 24 * 60 * 60 * 1000

export async function loadSetCache(): Promise<SetCache> {
  try {
    const raw = await readFile(CACHE_PATH, 'utf8')
    return JSON.parse(raw) as SetCache
  } catch {
    return { fetchedAt: 0, sets: {} }
  }
}

async function saveSetCache(cache: SetCache): Promise<void> {
  await mkdir(dirname(CACHE_PATH), { recursive: true })
  await writeFile(CACHE_PATH, JSON.stringify(cache) + '\n')
}

/** The set list, refetched only when it's older than a week.
 *
 *  Unlike the symbols — where a cold cache means ~360 downloads, so a page load never triggers one —
 *  this is a single request, cheap enough to fill in on demand the first time the Collections page
 *  is opened rather than making you press Refresh to see any totals at all.
 *
 *  A failed fetch serves whatever is cached (possibly nothing): the page still lists your sets, it
 *  just can't say how far along they are. */
export async function getSets(now: number): Promise<Record<string, SetInfo>> {
  const cache = await loadSetCache()
  if (now - cache.fetchedAt < SET_TTL_MS && Object.keys(cache.sets).length > 0) return cache.sets

  try {
    const list = await fetchAllSets()
    const sets: Record<string, SetInfo> = {}
    for (const s of list) {
      if (s.digital) continue
      sets[s.code] = {
        name: s.name,
        printedSize: s.printedSize,
        cardCount: s.cardCount,
        releasedAt: s.releasedAt,
        setType: s.setType,
      }
    }

    await saveSetCache({ fetchedAt: now, sets })
    return sets
  } catch (err) {
    console.error('[set-cache] failed to fetch the set list:', err)
    return cache.sets
  }
}
