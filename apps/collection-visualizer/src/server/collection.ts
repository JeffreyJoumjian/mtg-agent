import { createServerFn } from '@tanstack/react-start'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import type { CardTile, CollectionRow, PriceCache } from '~/lib/types'
import { parseManaBoxCsv } from '~/lib/csv'
import { groupRows, enrichTiles, ownedIds } from '~/lib/grouping'
import { ownedSets } from '~/lib/filters'
import { loadCache, saveCache, staleIds, mergeRefresh, DATA_DIR } from '~/lib/price-cache'
import { fetchCardsByIds } from '~/lib/scryfall'

export interface CollectionResponse {
  tiles: CardTile[]
  pricesUpdatedAt: number | null
  sets: { code: string; name: string }[]
}

const CSV_PATH = join(DATA_DIR, 'collection.csv')

/** Pure: assemble a response from rows + cache (group, enrich, sets, oldest fetchedAt). */
export function buildResponse(rows: CollectionRow[], cache: PriceCache): CollectionResponse {
  const tiles = enrichTiles(groupRows(rows), cache)
  const fetchedTimes = tiles.map((t) => t.fetchedAt).filter((n) => n > 0)
  return {
    tiles,
    sets: ownedSets(tiles),
    pricesUpdatedAt: fetchedTimes.length > 0 ? Math.min(...fetchedTimes) : null,
  }
}

async function readRows(): Promise<CollectionRow[]> {
  try {
    return parseManaBoxCsv(await readFile(CSV_PATH, 'utf8'))
  } catch {
    return []
  }
}

/** Refresh any stale/missing owned prices, persist, and return the assembled response. */
async function refresh(rows: CollectionRow[], force: boolean): Promise<CollectionResponse> {
  const cache = await loadCache()
  const ids = ownedIds(rows)
  const now = Date.now()
  const toFetch = force ? ids : staleIds(cache, ids, now)

  let nextCache = cache
  if (toFetch.length > 0) {
    const raw = await fetchCardsByIds(toFetch)
    nextCache = mergeRefresh(cache, raw, now)
    await saveCache(nextCache)
  }
  return buildResponse(rows, nextCache)
}

export const getCollection = createServerFn({ method: 'GET' }).handler(async () => {
  const rows = await readRows()
  return refresh(rows, false)
})

export const refreshPrices = createServerFn({ method: 'POST' }).handler(async () => {
  const rows = await readRows()
  return refresh(rows, true)
})

export const uploadCsv = createServerFn({ method: 'POST' })
  .validator((data: unknown) => {
    if (!(data instanceof FormData)) throw new Error('Expected FormData')
    const file = data.get('file')
    if (!(file instanceof File)) throw new Error('Missing file')
    return file
  })
  .handler(async ({ data: file }) => {
    const text = await file.text()
    // Validate it looks like a ManaBox export before overwriting.
    if (!text.includes('Scryfall ID')) throw new Error('Not a ManaBox CSV (missing "Scryfall ID" column)')
    await mkdir(DATA_DIR, { recursive: true })
    await writeFile(CSV_PATH, text)
    const rows = parseManaBoxCsv(text)
    return refresh(rows, false)
  })
