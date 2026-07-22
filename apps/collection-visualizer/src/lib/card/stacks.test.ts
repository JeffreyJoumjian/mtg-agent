import { test, expect } from 'bun:test'
import { groupByName, representative, variantsBestFirst, groupTotals, type NameGroup } from './stacks'
import type { CardTile } from '~/lib/types'

const tile = (over: Partial<CardTile> & { usd?: number }): CardTile => ({
  key: over.key ?? 'k', scryfallId: over.scryfallId ?? 'id', name: over.name ?? 'Bolt', setCode: 'S', setName: 'Set',
  collectorNumber: '1', rarity: 'common', finish: over.finish ?? 'normal', quantity: over.quantity ?? 1, weightedPurchase: null,
  prices: { usd: over.usd ?? 1, usdFoil: over.usd ?? 1, eur: null, eurFoil: null }, previousPrices: null,
  enriched: { cmc: 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
  fetchedAt: 0, breakdown: [],
})

test('groupByName groups same-name tiles, preserving first-appearance order', () => {
  const groups = groupByName([
    tile({ key: 'a', name: 'Bolt' }),
    tile({ key: 'b', name: 'Bears' }),
    tile({ key: 'c', name: 'Bolt', finish: 'foil' }),
  ])
  expect(groups.map((g) => g.name)).toEqual(['Bolt', 'Bears'])
  expect(groups[0].variants.map((v) => v.key)).toEqual(['a', 'c'])
})

test('representative picks the most expensive, foil breaking ties', () => {
  const g: NameGroup = {
    name: 'Bolt',
    variants: [tile({ key: 'cheap', usd: 1 }), tile({ key: 'dear', usd: 5 }), tile({ key: 'dear-foil', usd: 5, finish: 'foil' })],
  }
  expect(representative(g, 'usd', {}).key).toEqual('dear-foil')
})

test('representative honors a pin over the rule', () => {
  const g: NameGroup = { name: 'Bolt', variants: [tile({ key: 'a', usd: 5 }), tile({ key: 'b', usd: 1 })] }
  expect(representative(g, 'usd', { Bolt: { variantKey: 'b', face: 0 } }).key).toEqual('b')
  // a stale pin (printing no longer owned) falls back to the rule
  expect(representative(g, 'usd', { Bolt: { variantKey: 'gone', face: 0 } }).key).toEqual('a')
})

test('variantsBestFirst orders best → worst so the most important printing leads', () => {
  const g: NameGroup = {
    name: 'Bolt',
    variants: [tile({ key: 'dear', usd: 5 }), tile({ key: 'cheap', usd: 1 }), tile({ key: 'dear-foil', usd: 5, finish: 'foil' })],
  }
  expect(variantsBestFirst(g.variants, 'usd').map((v) => v.key)).toEqual(['dear-foil', 'dear', 'cheap'])
})

test('groupTotals sums quantity and value across variants', () => {
  const g: NameGroup = { name: 'Bolt', variants: [tile({ usd: 2, quantity: 3 }), tile({ usd: 5, quantity: 1 })] }
  expect(groupTotals(g.variants, 'usd')).toEqual({ quantity: 4, value: 11 })
})
