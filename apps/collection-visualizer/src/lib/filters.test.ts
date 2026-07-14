import { test, expect } from 'bun:test'
import { applyFilters, emptyFilters, ownedSets, priceBounds, cmcBounds, activeFilterCount } from './filters'
import type { CardTile, ColorSymbol } from './types'

const tile = (over: Partial<CardTile> & { colors?: ColorSymbol[]; cmc?: number }): CardTile => ({
  key: over.key ?? 'k', scryfallId: 'id', name: 'C', setCode: over.setCode ?? 'AAA', setName: over.setName ?? 'Set A',
  collectorNumber: '1', rarity: 'rare', finish: 'normal', quantity: 1, weightedPurchase: null,
  prices: over.prices ?? { usd: 2, usdFoil: null, eur: null, eurFoil: null }, previousPrices: null,
  enriched: { cmc: over.cmc ?? 2, colors: over.colors ?? [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
  fetchedAt: 0, breakdown: [],
})

test('empty filters pass everything', () => {
  const tiles = [tile({}), tile({ setCode: 'BBB' })]
  expect(applyFilters(tiles, emptyFilters(), 'usd').length).toEqual(2)
})

test('priceBounds returns floor(min)/ceil(max) effective price, skipping nulls', () => {
  const tiles = [
    tile({ prices: { usd: 0.07, usdFoil: null, eur: null, eurFoil: null } }),
    tile({ prices: { usd: 12.4, usdFoil: null, eur: null, eurFoil: null } }),
    tile({ prices: { usd: null, usdFoil: null, eur: null, eurFoil: null } }),
  ]
  expect(priceBounds(tiles, 'usd')).toEqual([0, 13])
  expect(priceBounds([], 'usd')).toEqual([0, 0])
})

test('cmcBounds returns min/max cmc', () => {
  expect(cmcBounds([tile({ cmc: 1 }), tile({ cmc: 6 }), tile({ cmc: 3 })])).toEqual([1, 6])
})

test('activeFilterCount counts active dimensions', () => {
  expect(activeFilterCount(emptyFilters())).toEqual(0)
  expect(activeFilterCount({ ...emptyFilters(), colors: ['R'], priceMin: 5, multicolor: true })).toEqual(3)
})

test('set filter keeps only selected sets', () => {
  const tiles = [tile({ setCode: 'AAA' }), tile({ setCode: 'BBB' })]
  const out = applyFilters(tiles, { ...emptyFilters(), sets: ['BBB'] }, 'usd')
  expect(out.map((t) => t.setCode)).toEqual(['BBB'])
})

test('price range filters on the effective price in the selected currency', () => {
  const tiles = [
    tile({ prices: { usd: 1, usdFoil: null, eur: null, eurFoil: null } }),
    tile({ prices: { usd: 10, usdFoil: null, eur: null, eurFoil: null } }),
  ]
  const out = applyFilters(tiles, { ...emptyFilters(), priceMin: 5, priceMax: null }, 'usd')
  expect(out.length).toEqual(1)
})

test('color mode any/all/exactly', () => {
  const wu = tile({ colors: ['W', 'U'] })
  const w = tile({ colors: ['W'] })
  const base = emptyFilters()
  expect(applyFilters([wu, w], { ...base, colors: ['U'], colorMode: 'any' }, 'usd')).toEqual([wu])
  expect(applyFilters([wu, w], { ...base, colors: ['W', 'U'], colorMode: 'all' }, 'usd')).toEqual([wu])
  expect(applyFilters([wu, w], { ...base, colors: ['W'], colorMode: 'exactly' }, 'usd')).toEqual([w])
})

test('colorless and multicolor toggles', () => {
  const colorless = tile({ colors: [] })
  const multi = tile({ colors: ['W', 'U'] })
  const mono = tile({ colors: ['R'] })
  expect(applyFilters([colorless, multi, mono], { ...emptyFilters(), colorless: true }, 'usd')).toEqual([colorless])
  expect(applyFilters([colorless, multi, mono], { ...emptyFilters(), multicolor: true }, 'usd')).toEqual([multi])
})

test('cmc range', () => {
  const tiles = [tile({ cmc: 1 }), tile({ cmc: 5 })]
  expect(applyFilters(tiles, { ...emptyFilters(), cmcMin: 3, cmcMax: null }, 'usd').map((t) => t.enriched.cmc)).toEqual([5])
})

test('ownedSets lists unique sets sorted by name', () => {
  const tiles = [tile({ setCode: 'BBB', setName: 'Zed' }), tile({ setCode: 'AAA', setName: 'Alpha' }), tile({ setCode: 'AAA', setName: 'Alpha' })]
  expect(ownedSets(tiles)).toEqual([{ code: 'AAA', name: 'Alpha' }, { code: 'BBB', name: 'Zed' }])
})
