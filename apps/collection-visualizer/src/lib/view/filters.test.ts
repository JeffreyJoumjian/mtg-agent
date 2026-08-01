import { test, expect } from 'bun:test'
import { applyFilters, emptyFilters, ownedSets, ownedTypes, priceBounds, cmcBounds, activeFilterCount } from './filters'
import type { CardTile, ColorSymbol } from '~/lib/types'

const tile = (over: Partial<CardTile> & { colors?: ColorSymbol[]; cmc?: number; typeLine?: string }): CardTile => ({
  key: over.key ?? 'k', scryfallId: 'id', name: 'C', setCode: over.setCode ?? 'AAA', setName: over.setName ?? 'Set A',
  collectorNumber: '1', rarity: 'rare', finish: 'normal', quantity: 1, weightedPurchase: null,
  prices: over.prices ?? { usd: 2, usdFoil: null, eur: null, eurFoil: null }, previousPrices: null,
  enriched: { cmc: over.cmc ?? 2, colors: over.colors ?? [], colorIdentity: [], typeLine: over.typeLine ?? '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
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
  expect(activeFilterCount({ ...emptyFilters(), types: ['Creature'] })).toEqual(1)
})

test('type filter keeps cards matching any selected type', () => {
  const creature = tile({ key: 'c', typeLine: 'Creature — Human Soldier' })
  const instant = tile({ key: 'i', typeLine: 'Instant' })
  const land = tile({ key: 'l', typeLine: 'Basic Land — Island' })
  const tiles = [creature, instant, land]

  expect(applyFilters(tiles, { ...emptyFilters(), types: ['Instant'] }, 'usd')).toEqual([instant])
  expect(applyFilters(tiles, { ...emptyFilters(), types: ['Creature', 'Instant'] }, 'usd')).toEqual([creature, instant])
})

test('type filter matches a multi-type card under either of its types', () => {
  const golem = tile({ typeLine: 'Artifact Creature — Golem' })
  expect(applyFilters([golem], { ...emptyFilters(), types: ['Artifact'] }, 'usd')).toEqual([golem])
  expect(applyFilters([golem], { ...emptyFilters(), types: ['Creature'] }, 'usd')).toEqual([golem])
})

test('ownedTypes lists only the types present, in canonical order', () => {
  const tiles = [tile({ typeLine: 'Basic Land — Island' }), tile({ typeLine: 'Instant' }), tile({ typeLine: 'Instant' })]
  expect(ownedTypes(tiles)).toEqual(['Instant', 'Land'])
  expect(ownedTypes([])).toEqual([])
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
