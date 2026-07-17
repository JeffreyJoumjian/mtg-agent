import { test, expect } from 'bun:test'
import { facesOf, isTwoSided, cardImage } from './faces'
import type { CardFace, CardTile } from '~/lib/types'

const FACE: CardFace = {
  name: 'Back',
  typeLine: 'Land',
  oracleText: '',
  manaCost: '',
  imageSmall: 's',
  imageNormal: 'n',
  imageLarge: 'l',
  imagePng: 'p',
}

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
    enriched: { cmc: 0, colors: [], colorIdentity: [], typeLine: '', oracleText: '', manaCost: '', imageSmall: null, imageNormal: null, imageLarge: null, imagePng: null, faces },
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

test('cardImage picks the requested quality, degrading to what exists', () => {
  expect(cardImage(FACE, 'png')).toEqual('p')
  expect(cardImage(FACE, 'large')).toEqual('l')
  expect(cardImage(FACE, 'normal')).toEqual('n')
  expect(cardImage({ ...FACE, imagePng: null, imageLarge: null }, 'png')).toEqual('n')
  expect(cardImage({ ...FACE, imageSmall: null, imageNormal: null, imageLarge: null, imagePng: null }, 'normal')).toEqual(null)
})
