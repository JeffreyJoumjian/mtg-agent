import { test, expect } from 'bun:test'
import { buildResponse } from './collection'
import type { CollectionRow, PriceCache } from '~/lib/types'

const row = (over: Partial<CollectionRow>): CollectionRow => ({
  scryfallId: 'id-1', name: 'Bolt', setCode: 'LEA', setName: 'Alpha', collectorNumber: '161',
  rarity: 'common', finish: 'normal', quantity: 1, purchasePrice: 1, purchaseCurrency: 'USD',
  condition: 'near_mint', language: 'en', binderName: 'A', ...over,
})

test('buildResponse groups, enriches, lists sets, and reports oldest fetchedAt', () => {
  const cache: PriceCache = {
    'id-1': { current: { usd: 2, usdFoil: null, eur: null, eurFoil: null }, previous: null, enriched: { cmc: 1, colors: ['R'], colorIdentity: ['R'], typeLine: 'Instant', oracleText: '', manaCost: '{R}', imageSmall: null, imageNormal: null }, fetchedAt: 100 },
    'id-2': { current: { usd: 5, usdFoil: null, eur: null, eurFoil: null }, previous: null, enriched: { cmc: 2, colors: [], colorIdentity: [], typeLine: 'Artifact', oracleText: '', manaCost: '{2}', imageSmall: null, imageNormal: null }, fetchedAt: 50 },
  }
  const res = buildResponse([row({}), row({ scryfallId: 'id-2', setCode: 'ARN', setName: 'Arabian', name: 'Bottle' })], cache)
  expect(res.tiles.length).toEqual(2)
  expect(res.sets.map((s) => s.code).sort()).toEqual(['ARN', 'LEA'])
  expect(res.pricesUpdatedAt).toEqual(50)
})

test('buildResponse reports null pricesUpdatedAt when nothing is cached', () => {
  const res = buildResponse([row({})], {})
  expect(res.pricesUpdatedAt).toEqual(null)
})
