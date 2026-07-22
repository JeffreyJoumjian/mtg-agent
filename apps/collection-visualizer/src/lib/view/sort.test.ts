import { test, expect } from 'bun:test'
import { sortTiles } from './sort'
import type { CardTile } from '~/lib/types'

const tile = (over: Partial<CardTile> & { cmc?: number }): CardTile => ({
  key: over.key ?? Math.random().toString(), scryfallId: 'id', name: over.name ?? 'C', setCode: 'S',
  setName: over.setName ?? 'Set', collectorNumber: over.collectorNumber ?? '1', rarity: over.rarity ?? 'common',
  finish: 'normal', quantity: 1, weightedPurchase: null, prices: over.prices ?? { usd: 1, usdFoil: null, eur: null, eurFoil: null },
  previousPrices: null, enriched: { cmc: over.cmc ?? 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null },
  fetchedAt: 0, breakdown: [],
})

test('sort by name asc/desc', () => {
  const tiles = [tile({ name: 'Zed' }), tile({ name: 'Ana' })]
  expect(sortTiles(tiles, 'name', 'asc', 'usd').map((t) => t.name)).toEqual(['Ana', 'Zed'])
  expect(sortTiles(tiles, 'name', 'desc', 'usd').map((t) => t.name)).toEqual(['Zed', 'Ana'])
})

test('sort by rarity uses common<uncommon<rare<mythic', () => {
  const tiles = [tile({ rarity: 'mythic', name: 'M' }), tile({ rarity: 'common', name: 'C' }), tile({ rarity: 'rare', name: 'R' })]
  expect(sortTiles(tiles, 'rarity', 'asc', 'usd').map((t) => t.name)).toEqual(['C', 'R', 'M'])
})

test('sort by collector number is numeric', () => {
  const tiles = [tile({ collectorNumber: '10', name: 'ten' }), tile({ collectorNumber: '2', name: 'two' })]
  expect(sortTiles(tiles, 'number', 'asc', 'usd').map((t) => t.name)).toEqual(['two', 'ten'])
})

test('sort by price uses the selected currency; nulls sort last on asc', () => {
  const tiles = [
    tile({ name: 'cheap', prices: { usd: 1, usdFoil: null, eur: null, eurFoil: null } }),
    tile({ name: 'none', prices: { usd: null, usdFoil: null, eur: null, eurFoil: null } }),
    tile({ name: 'pricey', prices: { usd: 9, usdFoil: null, eur: null, eurFoil: null } }),
  ]
  expect(sortTiles(tiles, 'price', 'asc', 'usd').map((t) => t.name)).toEqual(['cheap', 'pricey', 'none'])
})

test('sort by cmc', () => {
  const tiles = [tile({ cmc: 5, name: 'five' }), tile({ cmc: 1, name: 'one' })]
  expect(sortTiles(tiles, 'cmc', 'asc', 'usd').map((t) => t.name)).toEqual(['one', 'five'])
})

test('sort by set orders by set name then numeric collector number', () => {
  const tiles = [
    tile({ setName: 'Beta', collectorNumber: '5', name: 'b5' }),
    tile({ setName: 'Alpha', collectorNumber: '10', name: 'a10' }),
    tile({ setName: 'Alpha', collectorNumber: '2', name: 'a2' }),
  ]
  expect(sortTiles(tiles, 'set', 'asc', 'usd').map((t) => t.name)).toEqual(['a2', 'a10', 'b5'])
})
