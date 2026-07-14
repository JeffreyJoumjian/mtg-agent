import { test, expect } from 'bun:test'
import { groupRows, enrichTiles, ownedIds } from './grouping'
import type { CollectionRow, PriceCache } from './types'

const row = (over: Partial<CollectionRow>): CollectionRow => ({
  scryfallId: 'id-1', name: 'Bolt', setCode: 'LEA', setName: 'Alpha', collectorNumber: '161',
  rarity: 'common', finish: 'normal', quantity: 1, purchasePrice: 1, purchaseCurrency: 'USD',
  condition: 'near_mint', language: 'en', binderName: 'A', ...over,
})

test('merges same printing+finish across binders, summing quantity', () => {
  const groups = groupRows([
    row({ quantity: 2, binderName: 'A', condition: 'near_mint', purchasePrice: 1 }),
    row({ quantity: 1, binderName: 'B', condition: 'lightly_played', purchasePrice: 4 }),
  ])
  expect(groups.length).toEqual(1)
  expect(groups[0].quantity).toEqual(3)
  expect(groups[0].key).toEqual('id-1:normal')
  // weighted avg purchase = (1*2 + 4*1) / 3 = 2
  expect(groups[0].weightedPurchase).toEqual({ price: 2, currency: 'USD' })
  expect(groups[0].breakdown.length).toEqual(2)
})

test('keeps different finishes and different printings as separate groups', () => {
  const groups = groupRows([
    row({ finish: 'normal' }),
    row({ finish: 'foil' }),
    row({ scryfallId: 'id-2', finish: 'normal' }),
  ])
  expect(groups.map((g) => g.key).sort()).toEqual(['id-1:foil', 'id-1:normal', 'id-2:normal'])
})

test('weightedPurchase is null when no row has a purchase price', () => {
  const groups = groupRows([row({ purchasePrice: null }), row({ purchasePrice: null })])
  expect(groups[0].weightedPurchase).toEqual(null)
})

test('enrichTiles joins cached prices and enriched by scryfallId', () => {
  const groups = groupRows([row({})])
  const cache: PriceCache = {
    'id-1': {
      current: { usd: 2, usdFoil: 5, eur: 1.5, eurFoil: 4 },
      previous: { usd: 1.5, usdFoil: null, eur: null, eurFoil: null },
      enriched: { cmc: 1, colors: ['R'], colorIdentity: ['R'], typeLine: 'Instant', oracleText: 'deal 3', manaCost: '{R}', imageSmall: 's', imageNormal: 'n' },
      fetchedAt: 10,
    },
  }
  const tiles = enrichTiles(groups, cache)
  expect(tiles[0].prices.usd).toEqual(2)
  expect(tiles[0].previousPrices?.usd).toEqual(1.5)
  expect(tiles[0].enriched.typeLine).toEqual('Instant')
  expect(tiles[0].fetchedAt).toEqual(10)
})

test('enrichTiles tolerates a missing cache entry', () => {
  const tiles = enrichTiles(groupRows([row({})]), {})
  expect(tiles[0].prices).toEqual({ usd: null, usdFoil: null, eur: null, eurFoil: null })
  expect(tiles[0].enriched.cmc).toEqual(0)
})

test('ownedIds returns unique ids', () => {
  expect(ownedIds([row({}), row({ finish: 'foil' }), row({ scryfallId: 'id-2' })]).sort()).toEqual(['id-1', 'id-2'])
})
