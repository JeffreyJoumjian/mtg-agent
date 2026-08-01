import type { CardTile, Currency } from '~/lib/types'
import { compileQuery } from './search-query'
import { applyFilters, type FilterState } from './filters'
import { sortTiles, type SortKey } from './sort'

export interface ViewState {
  query: string
  filters: FilterState
  sortKey: SortKey
  sortDir: 'asc' | 'desc'
  currency: Currency
}

export function computeView(tiles: CardTile[], view: ViewState): CardTile[] {
  const matches = compileQuery(view.query)
  const searched = tiles.filter(matches)
  const filtered = applyFilters(searched, view.filters, view.currency)
  return sortTiles(filtered, view.sortKey, view.sortDir, view.currency)
}
