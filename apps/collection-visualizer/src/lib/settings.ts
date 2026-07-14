import type { Baseline, Currency } from './types'
import type { SortKey } from './sort'

export type ViewMode = 'grid' | 'list'

/** Display/view settings (as opposed to the search + filters that narrow the collection). */
export interface ViewSettings {
  view: ViewMode
  /** Cap on grid columns; null = auto (as many as fit responsively). */
  maxPerRow: number | null
  currency: Currency
  baseline: Baseline
  sortKey: SortKey
  sortDir: 'asc' | 'desc'
}

export function defaultSettings(): ViewSettings {
  // Sort by price (high → low) by default — search handles finding specific cards, so surfacing
  // the most valuable cards first is more useful than alphabetical.
  return { view: 'grid', maxPerRow: null, currency: 'usd', baseline: 'sinceRefresh', sortKey: 'price', sortDir: 'desc' }
}
