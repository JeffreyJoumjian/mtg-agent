import type { Baseline, Currency } from './types'
import type { SortKey } from './sort'

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
}

export function defaultSettings(): ViewSettings {
  // Sort by price (high → low) by default — search handles finding specific cards, so surfacing
  // the most valuable cards first is more useful than alphabetical. Group variants by default so a
  // card's printings fold into one stack.
  return { view: 'grid', maxPerRow: null, grouped: true, currency: 'usd', baseline: 'sinceRefresh', sortKey: 'price', sortDir: 'desc', theme: 'dark' }
}

const STORAGE_KEY = 'mtg-collection.settings'

/** Load persisted settings from localStorage, merged over the defaults (so fields added later still
 *  get a value). Returns null on the server or when nothing is stored / parsing fails. */
export function loadSettings(): ViewSettings | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as Partial<ViewSettings>
    return { ...defaultSettings(), ...parsed }
  } catch {
    return null
  }
}

/** Persist settings to localStorage (no-op on the server or when storage is unavailable). */
export function saveSettings(settings: ViewSettings): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    // ignore write failures (private mode, quota, etc.)
  }
}

/** Apply a theme by toggling the `dark` class on <html> (matches the pre-paint script in __root). */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', theme === 'dark')
}
