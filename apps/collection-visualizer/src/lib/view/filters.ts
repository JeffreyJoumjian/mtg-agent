import type { CardTile, ColorSymbol, Currency } from '~/lib/types'
import { effectivePrice } from '~/lib/card/pricing'
import { CARD_TYPES, typesOf, type CardType } from '~/lib/card/type-line'

export type ColorMode = 'any' | 'all' | 'exactly'

export interface FilterState {
  sets: string[]
  colors: ColorSymbol[]
  colorMode: ColorMode
  colorless: boolean
  multicolor: boolean
  /** Selected card types, matched as OR — picking Creature and Instant shows both. There's no
   *  any/all/exactly mode like colors have: "all" only means anything for the few multi-type cards,
   *  and the search box already spells that case as `t:artifact t:creature`. */
  types: CardType[]
  priceMin: number | null
  priceMax: number | null
  cmcMin: number | null
  cmcMax: number | null
}

export function emptyFilters(): FilterState {
  return { sets: [], colors: [], colorMode: 'any', colorless: false, multicolor: false, types: [], priceMin: null, priceMax: null, cmcMin: null, cmcMax: null }
}

function colorMatch(tileColors: ColorSymbol[], selected: ColorSymbol[], mode: ColorMode): boolean {
  if (selected.length === 0) return true
  if (mode === 'any') return selected.some((c) => tileColors.includes(c))
  if (mode === 'all') return !selected.some((c) => !tileColors.includes(c))
  // exactly
  return tileColors.length === selected.length && !selected.some((c) => !tileColors.includes(c))
}

export function applyFilters(tiles: CardTile[], filters: FilterState, currency: Currency): CardTile[] {
  return tiles.filter((t) => {
    if (filters.sets.length > 0 && !filters.sets.includes(t.setCode)) return false

    const colors = t.enriched.colors
    if (filters.colorless && colors.length !== 0) return false
    if (filters.multicolor && colors.length < 2) return false
    if (!colorMatch(colors, filters.colors, filters.colorMode)) return false

    if (filters.types.length > 0) {
      const have = typesOf(t)
      if (!filters.types.some((type) => have.includes(type))) return false
    }

    const price = effectivePrice(t.prices, currency, t.finish)
    if (filters.priceMin != null && (price == null || price < filters.priceMin)) return false
    if (filters.priceMax != null && (price == null || price > filters.priceMax)) return false

    const cmc = t.enriched.cmc
    if (filters.cmcMin != null && cmc < filters.cmcMin) return false
    if (filters.cmcMax != null && cmc > filters.cmcMax) return false

    return true
  })
}

export function ownedSets(tiles: CardTile[]): { code: string; name: string }[] {
  const map: Record<string, string> = {}
  for (const t of tiles) map[t.setCode] = t.setName
  return Object.entries(map)
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

/** The card types actually present in the collection, in `CARD_TYPES` order — so the chip row only
 *  ever offers a type that filters to something. */
export function ownedTypes(tiles: CardTile[]): CardType[] {
  const seen: Record<string, boolean> = {}
  for (const t of tiles) {
    for (const type of typesOf(t)) seen[type] = true
  }
  return CARD_TYPES.filter((type) => seen[type])
}

/** [min, max] effective price across owned tiles in the given currency (floor/ceil, nulls skipped). */
export function priceBounds(tiles: CardTile[], currency: Currency): [number, number] {
  let min = Infinity
  let max = -Infinity
  for (const t of tiles) {
    const p = effectivePrice(t.prices, currency, t.finish)
    if (p == null) continue
    if (p < min) min = p
    if (p > max) max = p
  }
  if (!Number.isFinite(min)) return [0, 0]
  return [Math.floor(min), Math.ceil(max)]
}

/** [min, max] mana value (cmc) across owned tiles. */
export function cmcBounds(tiles: CardTile[]): [number, number] {
  let min = Infinity
  let max = -Infinity
  for (const t of tiles) {
    const c = t.enriched.cmc
    if (c < min) min = c
    if (c > max) max = c
  }
  if (!Number.isFinite(min)) return [0, 0]
  return [Math.floor(min), Math.ceil(max)]
}

/** Number of active filter dimensions (for the "Filters" button badge). */
export function activeFilterCount(f: FilterState): number {
  let n = 0
  if (f.sets.length > 0) n++
  if (f.colors.length > 0) n++
  if (f.colorless) n++
  if (f.multicolor) n++
  if (f.types.length > 0) n++
  if (f.priceMin != null || f.priceMax != null) n++
  if (f.cmcMin != null || f.cmcMax != null) n++
  return n
}
