import { test, expect } from 'bun:test'
import { sortTiles, sortGroups } from './sort'
import { groupByName } from '~/lib/card/stacks'
import type { CardTile } from '~/lib/types'

const tile = (over: Partial<CardTile> & { cmc?: number }): CardTile => ({
  key: over.key ?? Math.random().toString(), scryfallId: 'id', name: over.name ?? 'C', setCode: 'S',
  setName: over.setName ?? 'Set', collectorNumber: over.collectorNumber ?? '1', rarity: over.rarity ?? 'common',
  finish: 'normal', quantity: over.quantity ?? 1, weightedPurchase: null, prices: over.prices ?? { usd: 1, usdFoil: null, eur: null, eurFoil: null },
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

const priced = (name: string, usd: number, over: Partial<CardTile> = {}): CardTile =>
  tile({ name, key: `${name}:${over.key ?? usd}`, prices: { usd, usdFoil: null, eur: null, eurFoil: null }, ...over })

test('sortGroups by price ranks a stack on its summed total, not one printing’s unit price', () => {
  // "Stack" is three copies (as three printings) of a $24.67 card = $74.01 owned; "Single" is one
  // $35 card. By unit price the single wins; by what the stack tile actually shows, the stack wins.
  const tiles = [
    priced('Single', 35),
    priced('Stack', 24.67, { key: 'a' }),
    priced('Stack', 24.67, { key: 'b' }),
    priced('Stack', 24.67, { key: 'c' }),
  ]
  const order = sortGroups(groupByName(tiles), 'price', 'desc', 'usd', {}).map((g) => g.name)
  expect(order).toEqual(['Stack', 'Single'])
})

test('sortGroups by price respects direction and quantity', () => {
  // One printing owned ×3 (quantity, not separate printings) is still $74.01 of value.
  const tiles = [priced('Single', 35), priced('Stack', 24.67, { quantity: 3 })]
  expect(sortGroups(groupByName(tiles), 'price', 'desc', 'usd', {}).map((g) => g.name)).toEqual(['Stack', 'Single'])
  expect(sortGroups(groupByName(tiles), 'price', 'asc', 'usd', {}).map((g) => g.name)).toEqual(['Single', 'Stack'])
})

test('sortGroups by name keys off the card name, ignoring per-printing prices', () => {
  const tiles = [priced('Zed', 1), priced('Ana', 99)]
  expect(sortGroups(groupByName(tiles), 'name', 'asc', 'usd', {}).map((g) => g.name)).toEqual(['Ana', 'Zed'])
})
