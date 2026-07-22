import type { CardTile, Currency, Finish, PriceHistory, PricePoint, PriceSet } from '~/lib/types'
import { effectivePrice } from '~/lib/card/pricing'

/** One day on a chart. `usd`/`eur` are carried side by side so switching currency doesn't refetch. */
export interface ValuePoint {
  date: string
  usd: number
  eur: number
}

/** A single card's price on one day, already resolved to the displayed currency and finish. */
export interface CardValuePoint {
  date: string
  value: number
}

/** Daily total value of the given tiles, oldest first.
 *
 *  History only records a point when a price moves, so a card contributes its last known price on
 *  every day until it changes — that carry-forward is what makes a sparse file plottable.
 *
 *  Two things this is honestly *not*: it prices today's quantities all the way back (nothing records
 *  when a card entered the collection, so a card bought yesterday looks owned all along), and a card
 *  is worth nothing on days before its first recorded price rather than being guessed backwards. */
export function valueSeries(tiles: CardTile[], history: PriceHistory): ValuePoint[] {
  const byDate: Record<string, Record<string, PriceSet>> = {}
  for (const [id, series] of Object.entries(history)) {
    for (const point of series) {
      byDate[point.date] ??= {}
      byDate[point.date][id] = point
    }
  }

  const current: Record<string, PriceSet> = {}

  return Object.keys(byDate)
    .sort()
    .map((date) => {
      Object.assign(current, byDate[date])

      let usd = 0
      let eur = 0
      for (const tile of tiles) {
        const prices = current[tile.scryfallId]
        if (!prices) continue

        const inUsd = effectivePrice(prices, 'usd', tile.finish)
        const inEur = effectivePrice(prices, 'eur', tile.finish)
        if (inUsd != null) usd += inUsd * tile.quantity
        if (inEur != null) eur += inEur * tile.quantity
      }

      return { date, usd, eur }
    })
}

/** One card's recorded prices, resolved for a currency and finish. Days where that combination has
 *  no price (a EUR-less printing, say) are dropped rather than plotted as zero. */
export function cardSeries(points: PricePoint[], currency: Currency, finish: Finish): CardValuePoint[] {
  const out: CardValuePoint[] = []
  for (const point of points) {
    const value = effectivePrice(point, currency, finish)
    if (value != null) out.push({ date: point.date, value })
  }
  return out
}

/** Pick the currency's side of a value series. */
export function inCurrency(points: ValuePoint[], currency: Currency): CardValuePoint[] {
  return points.map((p) => ({ date: p.date, value: currency === 'usd' ? p.usd : p.eur }))
}

/** Change between the first and last point — the figure a chart's caption quotes. Null when there's
 *  nothing to compare against yet, which is different from a change of zero. */
export function seriesDelta(points: CardValuePoint[]): { absolute: number; ratio: number | null } | null {
  if (points.length < 2) return null

  const first = points[0].value
  const last = points[points.length - 1].value

  return { absolute: last - first, ratio: first === 0 ? null : (last - first) / first }
}
