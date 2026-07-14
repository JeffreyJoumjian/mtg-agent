import type { CardTile, Currency } from './types'
import { tileValue } from './pricing'

export type SortKey = 'name' | 'set' | 'rarity' | 'number' | 'cmc' | 'price'

const RARITY_ORDER: Record<string, number> = { common: 0, uncommon: 1, rare: 2, mythic: 3, special: 4, bonus: 5 }

/** Comparable value for a tile+key. Nulls become +Infinity so they sort last on ascending. */
function keyValue(tile: CardTile, key: SortKey, currency: Currency): number | string {
  switch (key) {
    case 'name':
      return tile.name.toLowerCase()
    case 'set':
      return tile.setName.toLowerCase()
    case 'rarity':
      return RARITY_ORDER[tile.rarity] ?? 99
    case 'number':
      return Number(tile.collectorNumber) || 0
    case 'cmc':
      return tile.enriched.cmc
    case 'price': {
      const v = tileValue(tile, currency)
      return v == null ? Number.POSITIVE_INFINITY : v
    }
  }
}

export function sortTiles(tiles: CardTile[], key: SortKey, dir: 'asc' | 'desc', currency: Currency): CardTile[] {
  const factor = dir === 'asc' ? 1 : -1
  return [...tiles].sort((a, b) => {
    const av = keyValue(a, key, currency)
    const bv = keyValue(b, key, currency)
    if (av < bv) return -1 * factor
    if (av > bv) return 1 * factor
    return 0
  })
}
