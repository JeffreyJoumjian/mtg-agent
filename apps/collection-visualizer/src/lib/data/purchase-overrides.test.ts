import { test, expect } from 'bun:test'
import { overrideKey, applyOverrides, setOverride, clearOverride, type PurchaseOverrides } from './purchase-overrides'
import type { CardTile } from '~/lib/types'

const tile = (over: Partial<CardTile>): CardTile => ({
  key: over.key ?? 'k', scryfallId: over.scryfallId ?? 'a', name: 'C', setCode: 'S', setName: 'Set',
  collectorNumber: '1', rarity: 'rare', finish: over.finish ?? 'normal', quantity: 1,
  weightedPurchase: over.weightedPurchase ?? null, prices: { usd: null, usdFoil: null, eur: null, eurFoil: null },
  previousPrices: null,
  enriched: { cmc: 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
  fetchedAt: 0, breakdown: [],
})

test('overrideKey joins scryfallId and finish', () => {
  expect(overrideKey('abc', 'foil')).toEqual('abc:foil')
})

test('applyOverrides attaches only the matching tile’s override', () => {
  const overrides: PurchaseOverrides = { 'a:normal': { price: 8, currency: 'usd' } }
  const [normal, foil] = applyOverrides(
    [tile({ scryfallId: 'a', finish: 'normal' }), tile({ scryfallId: 'a', finish: 'foil' })],
    overrides,
  )
  expect(normal.purchaseOverride).toEqual({ price: 8, currency: 'usd' })
  // Same card, different finish → different key → left untouched.
  expect(foil.purchaseOverride).toEqual(undefined)
})

test('setOverride adds or replaces without mutating the input', () => {
  const before: PurchaseOverrides = {}
  const after = setOverride(before, 'a', 'foil', 3.5, 'eur')
  expect(after).toEqual({ 'a:foil': { price: 3.5, currency: 'eur' } })
  expect(before).toEqual({}) // input untouched

  const replaced = setOverride(after, 'a', 'foil', 9, 'usd')
  expect(replaced['a:foil']).toEqual({ price: 9, currency: 'usd' })
})

test('clearOverride removes just that key, leaving others', () => {
  const overrides: PurchaseOverrides = {
    'a:normal': { price: 1, currency: 'usd' },
    'b:foil': { price: 2, currency: 'usd' },
  }
  expect(clearOverride(overrides, 'a', 'normal')).toEqual({ 'b:foil': { price: 2, currency: 'usd' } })
})
