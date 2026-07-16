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
