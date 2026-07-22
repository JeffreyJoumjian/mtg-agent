// Server only — see lib/server/README. Reaching this from a component (even transitively, through
// something that looks pure) breaks the client build.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { PriceCache, PriceHistory, PriceSet } from '~/lib/types'
import { DATA_DIR } from './price-cache'

// Kept out of prices.json deliberately. That file is read on every page load and is already ~1 MB
// of oracle text and image URLs; history is append-only and only a chart ever wants it, so the two
// shouldn't grow — or be parsed — together.
const HISTORY_PATH = join(DATA_DIR, 'price-history.json')

/** The UTC day a timestamp falls in — the bucket a point is filed under. */
export function dayOf(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10)
}

function samePrices(a: PriceSet, b: PriceSet): boolean {
  return a.usd === b.usd && a.usdFoil === b.usdFoil && a.eur === b.eur && a.eurFoil === b.eurFoil
}

/** Pure: fold a refresh's prices into the history.
 *
 *  Two rules keep the file from growing with every refresh forever. A second refresh on a day
 *  replaces that day's point instead of adding one, and a price that hasn't moved isn't recorded at
 *  all — a card that holds its price for a year costs one entry, not 365. Both are safe because a
 *  reader carries the last point forward across gaps. */
export function recordPrices(history: PriceHistory, priceById: Record<string, PriceSet>, now: number): PriceHistory {
  const date = dayOf(now)
  const next: PriceHistory = { ...history }

  for (const [id, prices] of Object.entries(priceById)) {
    const series = next[id] ?? []
    const last = series[series.length - 1]

    if (last?.date === date) {
      next[id] = [...series.slice(0, -1), { date, ...prices }]
      continue
    }

    if (last && samePrices(last, prices)) continue

    next[id] = [...series, { date, ...prices }]
  }

  return next
}

/** Pure: seed a history from the prices already sitting in the cache, so the first run starts from
 *  what we know instead of from nothing.
 *
 *  Only `current` can be seeded. `previous` is a real earlier price, but the cache stamps just one
 *  `fetchedAt` — the one belonging to `current` — so there is no date to file it under, and a
 *  plotted point at an invented date would be worse than a missing one. */
export function seedFromCache(cache: PriceCache): PriceHistory {
  const history: PriceHistory = {}

  for (const [id, entry] of Object.entries(cache)) {
    if (entry.fetchedAt > 0) history[id] = [{ date: dayOf(entry.fetchedAt), ...entry.current }]
  }

  return history
}

export async function loadHistory(): Promise<PriceHistory> {
  try {
    const raw = await readFile(HISTORY_PATH, 'utf8')
    return JSON.parse(raw) as PriceHistory
  } catch {
    return {}
  }
}

/** Written compact rather than indented like prices.json: this file only grows, and pretty-printing
 *  a few hundred thousand points costs several times the bytes for output nobody reads by hand. */
export async function saveHistory(history: PriceHistory): Promise<void> {
  await mkdir(dirname(HISTORY_PATH), { recursive: true })
  await writeFile(HISTORY_PATH, JSON.stringify(history) + '\n')
}
