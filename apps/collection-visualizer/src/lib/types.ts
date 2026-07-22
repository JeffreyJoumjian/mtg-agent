export type Finish = 'normal' | 'foil' | 'etched'
export type Currency = 'usd' | 'eur'
export type Baseline = 'sinceRefresh' | 'vsPurchase'
export type ColorSymbol = 'W' | 'U' | 'B' | 'R' | 'G'

/** One parsed ManaBox CSV line. */
export interface CollectionRow {
  scryfallId: string
  name: string
  setCode: string
  setName: string
  collectorNumber: string
  rarity: string
  finish: Finish
  quantity: number
  purchasePrice: number | null
  purchaseCurrency: string
  condition: string
  language: string
  binderName: string
}

export interface PriceSet {
  usd: number | null
  usdFoil: number | null
  eur: number | null
  eurFoil: number | null
}

/** One side of a genuinely two-faced card (transform / MDFC / reversible), each with its own image. */
export interface CardFace {
  name: string
  typeLine: string
  oracleText: string
  manaCost: string
  imageSmall: string | null
  imageNormal: string | null
  imageLarge: string | null
  imagePng: string | null
}

/** Scryfall fields cached for display, sorting, and search. */
export interface Enriched {
  cmc: number
  colors: ColorSymbol[]
  colorIdentity: ColorSymbol[]
  typeLine: string
  oracleText: string
  manaCost: string
  /** Mana this card can produce (e.g. `["W","U"]`, `["C"]`) — shown in the cost spot for lands and
   *  other cost-less producers. Optional (older caches lack it until re-enriched). */
  producedMana?: string[]
  imageSmall: string | null
  imageNormal: string | null
  /** Higher-res images used by the sidebar (`large`) and modal/download (`png`). Optional because a
   *  cache written before this field existed won't have them until the next refresh re-enriches. */
  imageLarge?: string | null
  imagePng?: string | null
  /** The individual sides, present only for genuinely two-sided cards (each side has its own image).
   *  Absent for single-image cards — including split / adventure / flip layouts, which are one image. */
  faces?: CardFace[]
}

/** A set's symbol, kept as the innards of its `<svg>` so it can be inlined and take its color from
 *  `currentColor` (which is what lets it follow the theme and the card's rarity). */
export interface SetIcon {
  viewBox: string
  /** Raw inner markup (`<path>`/`<g>` only — validated when vendored). */
  body: string
}

export interface CacheEntry {
  current: PriceSet
  previous: PriceSet | null
  enriched: Enriched
  fetchedAt: number
}

export type PriceCache = Record<string, CacheEntry>

/** What we keep about a Magic set itself, as opposed to the cards from it that you own. */
export interface SetInfo {
  name: string
  /** The denominator printed on the card ("123/281"), or null for sets that never had one. */
  printedSize: number | null
  /** Every printing filed under the set, variants included — runs past `printedSize`. */
  cardCount: number
  releasedAt: string | null
  setType: string
}

/** Scryfall's set list, keyed by set code, with the timestamp it was pulled. */
export interface SetCache {
  fetchedAt: number
  sets: Record<string, SetInfo>
}

/** A card's prices on one day. */
export interface PricePoint extends PriceSet {
  /** UTC `YYYY-MM-DD`. At most one point per card per day — a second refresh the same day
   *  overwrites it rather than adding a second entry. */
  date: string
}

/** Every price we've ever recorded, per Scryfall id, oldest first. Unlike `PriceCache` — which
 *  holds only the latest two prices — this is never overwritten, because Scryfall can't tell us
 *  what a card cost last week. Points are only written when a price actually moves, so a gap
 *  means "unchanged", and a reader carries the last point forward. */
export type PriceHistory = Record<string, PricePoint[]>

export interface CardTile {
  key: string
  scryfallId: string
  name: string
  setCode: string
  setName: string
  collectorNumber: string
  rarity: string
  finish: Finish
  quantity: number
  weightedPurchase: { price: number | null; currency: string } | null
  prices: PriceSet
  previousPrices: PriceSet | null
  enriched: Enriched
  fetchedAt: number
  breakdown: { condition: string; language: string; binder: string; quantity: number; purchasePrice: number | null }[]
}
