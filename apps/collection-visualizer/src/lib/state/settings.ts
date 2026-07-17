import type { Baseline, Currency } from '~/lib/types'
import type { SortKey } from '~/lib/view/sort'

export type ViewMode = 'grid' | 'list'
export type Theme = 'dark' | 'light'

/** Display/view settings (as opposed to the search + filters that narrow the collection). */
export interface ViewSettings {
  view: ViewMode
  /** Cap on grid columns; null = auto (as many as fit responsively). */
  maxPerRow: number | null
  /** Fold all printings of the same card into one stack tile (grid view). */
  grouped: boolean
  currency: Currency
  baseline: Baseline
  sortKey: SortKey
  sortDir: 'asc' | 'desc'
  theme: Theme
  /** Render the holographic shimmer on foil printings. Off falls back to the F/E badge alone. */
  foil: boolean
}

export function defaultSettings(): ViewSettings {
  // Sort by price (high → low) by default — search handles finding specific cards, so surfacing
  // the most valuable cards first is more useful than alphabetical. Group variants by default so a
  // card's printings fold into one stack.
  return { view: 'grid', maxPerRow: null, grouped: true, currency: 'usd', baseline: 'sinceRefresh', sortKey: 'price', sortDir: 'desc', theme: 'dark', foil: true }
}

/** Apply a theme by toggling the `dark` class on <html> (matches the pre-paint script in __root). */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', theme === 'dark')
}
