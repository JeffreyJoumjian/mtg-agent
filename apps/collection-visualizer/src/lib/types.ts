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
