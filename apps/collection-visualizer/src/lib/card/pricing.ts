import type { Baseline, CardTile, Currency, Finish, PriceSet } from '~/lib/types'

/** The market price for a tile given currency + finish (foil/etched → *_foil with fallback). */
export function effectivePrice(prices: PriceSet | null, currency: Currency, finish: Finish): number | null {
  if (!prices) return null
  if (currency === 'usd') return finish === 'normal' ? prices.usd : (prices.usdFoil ?? prices.usd)
  return finish === 'normal' ? prices.eur : (prices.eurFoil ?? prices.eur)
}

/** Unit effective current price for a tile. */
export function tileValue(tile: CardTile, currency: Currency): number | null {
  return effectivePrice(tile.prices, currency, tile.finish)
}

/** Per-unit ± for the selected baseline. vsPurchase is reported in the purchase currency. */
export function unitDelta(
  tile: CardTile,
  currency: Currency,
  baseline: Baseline,
): { value: number; currency: Currency | string } | null {
  const current = effectivePrice(tile.prices, currency, tile.finish)
  if (current == null) return null

  if (baseline === 'sinceRefresh') {
    const prev = effectivePrice(tile.previousPrices, currency, tile.finish)
    if (prev == null) return null
    return { value: current - prev, currency }
  }

  const purchase = tile.weightedPurchase
  if (!purchase || purchase.price == null) return null
  const purchaseCurrency = purchase.currency.toLowerCase() === 'eur' ? 'eur' : 'usd'
  const currentInPurchaseCcy = effectivePrice(tile.prices, purchaseCurrency, tile.finish)
  if (currentInPurchaseCcy == null) return null
  return { value: currentInPurchaseCcy - purchase.price, currency: purchase.currency }
}

/** Portfolio totals (× quantity), skipping tiles with no price / no baseline. */
export function totals(
  tiles: CardTile[],
  currency: Currency,
  baseline: Baseline,
): { value: number; delta: number; deltaCurrency: string } {
  let value = 0
  let delta = 0
  // sinceRefresh deltas are in the display currency; vsPurchase deltas are in the purchase
  // currency (uniform across a ManaBox export). Track it so the summary labels the ± with the
  // same currency the tiles do, instead of the display currency.
  let deltaCurrency: string = currency
  for (const t of tiles) {
    const unit = tileValue(t, currency)
    if (unit != null) value += unit * t.quantity
    const d = unitDelta(t, currency, baseline)
    if (d != null) {
      delta += d.value * t.quantity
      deltaCurrency = d.currency
    }
  }
  return { value, delta, deltaCurrency }
}
