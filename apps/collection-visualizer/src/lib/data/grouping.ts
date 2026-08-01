import type { CardTile, CollectionRow, Enriched, PriceCache, PriceSet } from '~/lib/types'

export interface GroupedRow {
  key: string
  scryfallId: string
  name: string
  setCode: string
  setName: string
  collectorNumber: string
  rarity: string
  finish: CollectionRow['finish']
  quantity: number
  weightedPurchase: { price: number | null; currency: string } | null
  breakdown: CardTile['breakdown']
}

const EMPTY_PRICES: PriceSet = { usd: null, usdFoil: null, eur: null, eurFoil: null }
const EMPTY_ENRICHED: Enriched = {
  cmc: 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null,
}

export function ownedIds(rows: CollectionRow[]): string[] {
  return [...new Set(rows.map((r) => r.scryfallId).filter(Boolean))]
}

/** Group rows by scryfallId + finish, summing quantity and computing a weighted-avg purchase price. */
export function groupRows(rows: CollectionRow[]): GroupedRow[] {
  const groups: Record<string, GroupedRow> = {}

  for (const r of rows) {
    const key = `${r.scryfallId}:${r.finish}`
    const g =
      groups[key] ??
      (groups[key] = {
        key,
        scryfallId: r.scryfallId,
        name: r.name,
        setCode: r.setCode,
        setName: r.setName,
        collectorNumber: r.collectorNumber,
        rarity: r.rarity,
        finish: r.finish,
        quantity: 0,
        weightedPurchase: null,
        breakdown: [],
      })
    g.quantity += r.quantity
    g.breakdown.push({ condition: r.condition, language: r.language, binder: r.binderName, quantity: r.quantity, purchasePrice: r.purchasePrice })
  }

  for (const g of Object.values(groups)) {
    const priced = g.breakdown.filter((b) => b.purchasePrice != null)
    if (priced.length > 0) {
      const qty = priced.reduce((s, b) => s + b.quantity, 0)
      const total = priced.reduce((s, b) => s + (b.purchasePrice as number) * b.quantity, 0)
      g.weightedPurchase = { price: qty > 0 ? total / qty : null, currency: 'USD' }
    }
  }

  return Object.values(groups)
}

/** Join cached prices + enriched card data onto grouped rows to produce render-ready tiles. */
export function enrichTiles(groups: GroupedRow[], cache: PriceCache): CardTile[] {
  return groups.map((g) => {
    const hit = cache[g.scryfallId]
    return {
      ...g,
      prices: hit ? hit.current : EMPTY_PRICES,
      previousPrices: hit ? hit.previous : null,
      enriched: hit ? hit.enriched : EMPTY_ENRICHED,
      fetchedAt: hit ? hit.fetchedAt : 0,
    }
  })
}
