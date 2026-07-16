import type { CardTile, Currency } from './types'
import { effectivePrice } from './pricing'

/** A "stack": all owned tiles (printings/finishes) that are the same card by name. */
export interface NameGroup {
  name: string
  variants: CardTile[]
}

/** Group tiles by card name, preserving first-appearance order (so a pre-sorted input stays sorted). */
export function groupByName(tiles: CardTile[]): NameGroup[] {
  const map: Record<string, CardTile[]> = {}
  const order: string[] = []
  for (const t of tiles) {
    if (!map[t.name]) {
      map[t.name] = []
      order.push(t.name)
    }
    map[t.name].push(t)
  }
  return order.map((name) => ({ name, variants: map[name] }))
}

const isFoil = (t: CardTile): boolean => t.finish !== 'normal'

/** Ranking used to pick the stack "face": most expensive first, foil breaking ties. */
function byBestFirst(currency: Currency) {
  return (a: CardTile, b: CardTile): number => {
    const pa = effectivePrice(a.prices, currency, a.finish) ?? -1
    const pb = effectivePrice(b.prices, currency, b.finish) ?? -1
    if (pb !== pa) return pb - pa // most expensive first
    if (isFoil(a) !== isFoil(b)) return isFoil(a) ? -1 : 1 // foil before regular
    return 0
  }
}

/** The tile shown as the stack's "face": the pinned variant if set, else most expensive (foil breaks ties). */
export function representative(group: NameGroup, currency: Currency, pins: Record<string, string>): CardTile {
  const pinnedKey = pins[group.name]
  if (pinnedKey) {
    const pinned = group.variants.find((v) => v.key === pinnedKey)
    if (pinned) return pinned
  }
  return [...group.variants].sort(byBestFirst(currency))[0]
}

/** Variants ordered best → worst (most valuable first, foil breaking ties), so the most important
 *  printing leads the variant strip. */
export function variantsBestFirst(variants: CardTile[], currency: Currency): CardTile[] {
  return [...variants].sort(byBestFirst(currency))
}

/** Total quantity and value across the given variants (in the given currency). */
export function groupTotals(variants: CardTile[], currency: Currency): { quantity: number; value: number } {
  let quantity = 0
  let value = 0
  for (const v of variants) {
    quantity += v.quantity
    const p = effectivePrice(v.prices, currency, v.finish)
    if (p != null) value += p * v.quantity
  }
  return { quantity, value }
}
