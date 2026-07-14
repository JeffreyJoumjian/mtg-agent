import type { CardTile, ColorSymbol, Currency } from './types'
import { effectivePrice } from './pricing'

export type ColorMode = 'any' | 'all' | 'exactly'

export interface FilterState {
  sets: string[]
  colors: ColorSymbol[]
  colorMode: ColorMode
  colorless: boolean
  multicolor: boolean
  priceMin: number | null
  priceMax: number | null
  cmcMin: number | null
  cmcMax: number | null
}

export function emptyFilters(): FilterState {
  return { sets: [], colors: [], colorMode: 'any', colorless: false, multicolor: false, priceMin: null, priceMax: null, cmcMin: null, cmcMax: null }
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
