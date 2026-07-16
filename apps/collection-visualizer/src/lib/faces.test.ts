import { test, expect } from 'bun:test'
import { facesOf, isTwoSided, faceImage } from './faces'
import type { CardFace, CardTile } from './types'

const FACE: CardFace = { name: 'Back', typeLine: 'Land', oracleText: '', manaCost: '', imageSmall: 's', imageNormal: 'n' }

function tile(faces?: CardFace[]): CardTile {
  return {
    key: 'k',
    scryfallId: 'id',
    name: 'Card',
    setCode: 'set',
    setName: 'Set',
    collectorNumber: '1',
    rarity: 'rare',
    finish: 'normal',
    quantity: 1,
    weightedPurchase: null,
    prices: { usd: null, usdFoil: null, eur: null, eurFoil: null },
    previousPrices: null,
    enriched: { cmc: 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null, faces },
    fetchedAt: 0,
    breakdown: [],
  }
}

test('facesOf returns the faces or an empty array', () => {
  expect(facesOf(tile([FACE]))).toEqual([FACE])
  expect(facesOf(tile())).toEqual([])
})

test('isTwoSided requires at least two faces', () => {
  expect(isTwoSided(tile([FACE, FACE]))).toEqual(true)
  expect(isTwoSided(tile([FACE]))).toEqual(false)
  expect(isTwoSided(tile())).toEqual(false)
})

test('faceImage prefers the requested size and falls back to the other', () => {
  expect(faceImage({ ...FACE, imageSmall: 's', imageNormal: 'n' }, 'normal')).toEqual('n')
  expect(faceImage({ ...FACE, imageSmall: 's', imageNormal: null }, 'normal')).toEqual('s')
  expect(faceImage({ ...FACE, imageSmall: null, imageNormal: 'n' }, 'small')).toEqual('n')
})
