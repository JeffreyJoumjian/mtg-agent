import { createServerFn } from '@tanstack/react-start'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import type { CardTile, CollectionRow, PriceCache, PriceSet, SetIcon } from '~/lib/types'
import { parseManaBoxCsv } from '~/lib/data/csv'
import { groupRows, enrichTiles, ownedIds } from '~/lib/data/grouping'
import { ownedSets } from '~/lib/view/filters'
import { loadCache, saveCache, staleIds, mergeRefresh, DATA_DIR } from '~/lib/server/price-cache'
import { loadHistory, saveHistory, recordPrices, seedFromCache } from '~/lib/server/price-history'
import { fetchCardsByIds } from '~/lib/data/scryfall'
import { iconsForSets, emptyIconCache } from '~/lib/data/set-icons'
import { loadIconCache, refreshSetIcons } from '~/lib/server/set-icon-cache'
import { getSets } from '~/lib/server/set-cache'

export interface CollectionResponse {
  tiles: CardTile[]
  pricesUpdatedAt: number | null
  sets: { code: string; name: string }[]
  /** Symbols for the owned sets only, keyed by set code. */
  setIcons: Record<string, SetIcon>
}

const CSV_PATH = join(DATA_DIR, 'collection.csv')

/** Pure: assemble a response from rows + caches (group, enrich, sets, symbols, oldest fetchedAt). */
export function buildResponse(rows: CollectionRow[], cache: PriceCache, icons = emptyIconCache()): CollectionResponse {
  const tiles = enrichTiles(groupRows(rows), cache)
  const fetchedTimes = tiles.map((t) => t.fetchedAt).filter((n) => n > 0)
  const sets = ownedSets(tiles)
  return {
    tiles,
    sets,
    setIcons: iconsForSets(icons, sets.map((s) => s.code)),
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

/** Set symbols are decoration, so a problem fetching them must never fail the price refresh that
 *  triggered it — fall back to whatever is already vendored. */
async function refreshIcons(now: number) {
  try {
    return await refreshSetIcons(now)
  } catch {
    return loadIconCache()
  }
}

/** Append this refresh's prices to the permanent history.
 *
 *  Only the ids we actually fetched have prices new enough to file under today. On the very first
 *  run the history file doesn't exist yet, so it's seeded from the prices already cached — the
 *  pre-refresh cache, so those points keep the dates they were fetched on rather than all landing
 *  on today.
 *
 *  A failure here must not take the refresh down with it: the prices themselves are already saved,
 *  and a chart missing a day is a far smaller problem than a refresh that won't complete. It's
 *  logged rather than swallowed, since a history that silently stops recording defeats the point. */
async function recordHistory(before: PriceCache, after: PriceCache, fetched: string[], now: number) {
  try {
    const stored = await loadHistory()
    const history = Object.keys(stored).length === 0 ? seedFromCache(before) : stored

    const priceById: Record<string, PriceSet> = {}
    for (const id of fetched) {
      const entry = after[id]
      if (entry) priceById[id] = entry.current
    }

    await saveHistory(recordPrices(history, priceById, now))
  } catch (err) {
    console.error('[price-history] failed to record this refresh:', err)
  }
}

/** Refresh any stale/missing owned prices, persist, and return the assembled response. */
async function refresh(rows: CollectionRow[], force: boolean): Promise<CollectionResponse> {
  const cache = await loadCache()
  const ids = ownedIds(rows)
  const now = Date.now()
  const toFetch = force ? ids : staleIds(cache, ids, now)
  // Only an explicit refresh goes looking for new symbols; a page load serves what's already
  // vendored, so a first run never blocks rendering on ~360 icon downloads.
  const icons = force ? await refreshIcons(now) : await loadIconCache()

  if (toFetch.length === 0) return buildResponse(rows, cache, icons)

  try {
    const raw = await fetchCardsByIds(toFetch)
    const nextCache = mergeRefresh(cache, raw, now)
    await saveCache(nextCache)
    await recordHistory(cache, nextCache, Object.keys(raw), now)
    return buildResponse(rows, nextCache, icons)
  } catch (err) {
    // A manual refresh surfaces the error to its mutation; an automatic (stale-TTL) load
    // must never crash the page — serve whatever prices we already have cached.
    if (force) throw err
    return buildResponse(rows, cache, icons)
  }
}

export const getCollection = createServerFn({ method: 'GET' }).handler(async () => {
  const rows = await readRows()
  return refresh(rows, false)
})

/** The collection plus Scryfall's set list, which the Collections page needs for its denominators. */
export const getCollectionWithSets = createServerFn({ method: 'GET' }).handler(async () => {
  const rows = await readRows()
  const collection = await refresh(rows, false)
  const sets = await getSets(Date.now())

  return { ...collection, setInfo: sets }
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
