import { test, expect } from 'bun:test'
import { effectivePrice, unitDelta, totals } from './pricing'
import type { CardTile } from './types'

const tile = (over: Partial<CardTile>): CardTile => ({
  key: 'k', scryfallId: 'id', name: 'C', setCode: 'S', setName: 'Set', collectorNumber: '1',
  rarity: 'rare', finish: 'normal', quantity: 1, weightedPurchase: null,
  prices: { usd: 2, usdFoil: 5, eur: 1.5, eurFoil: 4 },
  previousPrices: { usd: 1.5, usdFoil: 4, eur: 1, eurFoil: 3 },
  enriched: { cmc: 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
  fetchedAt: 0, breakdown: [], ...over,
})

test('effectivePrice picks nonfoil vs foil by finish, with fallback', () => {
  expect(effectivePrice({ usd: 2, usdFoil: 5, eur: null, eurFoil: null }, 'usd', 'normal')).toEqual(2)
  expect(effectivePrice({ usd: 2, usdFoil: 5, eur: null, eurFoil: null }, 'usd', 'foil')).toEqual(5)
  expect(effectivePrice({ usd: 2, usdFoil: null, eur: null, eurFoil: null }, 'usd', 'etched')).toEqual(2)
  expect(effectivePrice(null, 'usd', 'normal')).toEqual(null)
})

test('unitDelta since refresh = current - previous', () => {
  expect(unitDelta(tile({}), 'usd', 'sinceRefresh')).toEqual({ value: 0.5, currency: 'usd' })
})

test('unitDelta vs purchase uses the purchase currency', () => {
  const t = tile({ weightedPurchase: { price: 1.25, currency: 'USD' } })
  expect(unitDelta(t, 'usd', 'vsPurchase')).toEqual({ value: 0.75, currency: 'USD' })
})

test('unitDelta is null when the baseline data is missing', () => {
  expect(unitDelta(tile({ previousPrices: null }), 'usd', 'sinceRefresh')).toEqual(null)
  expect(unitDelta(tile({ weightedPurchase: null }), 'usd', 'vsPurchase')).toEqual(null)
})

test('totals sum value and delta across quantity, skipping nulls', () => {
  const tiles = [
    tile({ quantity: 2 }),
    tile({ prices: { usd: null, usdFoil: null, eur: null, eurFoil: null }, quantity: 3 }),
  ]
  // value: 2*2 = 4 ; second tile has null price -> skipped
  // delta sinceRefresh: (2-1.5)*2 = 1
  expect(totals(tiles, 'usd', 'sinceRefresh')).toEqual({ value: 4, delta: 1, deltaCurrency: 'usd' })
})

test('totals labels the vsPurchase delta in the purchase currency', () => {
  const t = tile({
    quantity: 2,
    weightedPurchase: { price: 1.25, currency: 'USD' },
    prices: { usd: 2, usdFoil: null, eur: 1, eurFoil: null },
    previousPrices: null,
  })
  // Display EUR, but the vsPurchase ± is computed & labeled in USD (the purchase currency):
  // value = eur 1 × 2 = 2 ; delta = (usd 2 − 1.25) × 2 = 1.5
  expect(totals([t], 'eur', 'vsPurchase')).toEqual({ value: 2, delta: 1.5, deltaCurrency: 'USD' })
})
