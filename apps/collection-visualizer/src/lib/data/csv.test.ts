import { test, expect } from 'bun:test'
import { parseManaBoxCsv } from './csv'

const HEADER =
  'Binder Name,Binder Type,Name,Set code,Set name,Collector number,Foil,Rarity,Quantity,ManaBox ID,Scryfall ID,Purchase price,Misprint,Altered,Condition,Language,Purchase price currency,Added'

test('parses a basic ManaBox row into a CollectionRow', () => {
  const csv = `${HEADER}\nInnistrad: Remastered,binder,Thraben Inspector,INR,Innistrad Remastered,301,foil,common,1,101864,4b03e3d4-aa62-428b-9f99-3ed93506defa,1.32,false,false,near_mint,en,USD,2026-06-25T18:48:51.772Z`
  expect(parseManaBoxCsv(csv)).toEqual([
    {
      scryfallId: '4b03e3d4-aa62-428b-9f99-3ed93506defa',
      name: 'Thraben Inspector',
      setCode: 'INR',
      setName: 'Innistrad Remastered',
      collectorNumber: '301',
      rarity: 'common',
      finish: 'foil',
      quantity: 1,
      purchasePrice: 1.32,
      purchaseCurrency: 'USD',
      condition: 'near_mint',
      language: 'en',
      binderName: 'Innistrad: Remastered',
    },
  ])
})

test('handles quoted fields containing commas and empty purchase price', () => {
  const csv = `${HEADER}\n"Rares, misc",binder,"Borrowing 100,000 Arrows",CHK,Champions,52,normal,uncommon,2,1,abc-123,,false,false,near_mint,en,USD,2026-01-01T00:00:00.000Z`
  const rows = parseManaBoxCsv(csv)
  expect(rows[0].name).toEqual('Borrowing 100,000 Arrows')
  expect(rows[0].binderName).toEqual('Rares, misc')
  expect(rows[0].quantity).toEqual(2)
  expect(rows[0].purchasePrice).toEqual(null)
})

test('skips rows from ManaBox lists, which are not part of the collection, and keeps binders and decks', () => {
  const csv = [
    HEADER,
    'Innistrad: Remastered,binder,The Meathook Massacre,INR,Innistrad Remastered,486,foil,mythic,1,101879,996e6444,28.99,false,false,near_mint,en,USD,2026-06-25T18:48:51.772Z',
    'Edgar Deck,list,The Meathook Massacre,INR,Innistrad Remastered,486,foil,mythic,1,101879,996e6444,41.25,false,false,near_mint,en,USD,2026-07-14T03:49:58.175Z',
    'Edgar Deck,List,Cathars\' Crusade,INR,Innistrad Remastered,10,normal,rare,1,1,id-2,1.00,false,false,near_mint,en,USD,2026-07-14T03:49:58.175Z',
    'Edgar,deck,Sol Ring,CMM,Commander Masters,1,normal,uncommon,1,1,id-3,1.00,false,false,near_mint,en,USD,2026-07-14T03:49:58.175Z',
  ].join('\n')
  expect(parseManaBoxCsv(csv).map((r) => `${r.binderName}: ${r.name}`)).toEqual([
    'Innistrad: Remastered: The Meathook Massacre',
    'Edgar: Sol Ring',
  ])
})

test('keeps every row when the export has no Binder Type column', () => {
  const csv = 'Binder Name,Name,Set code,Quantity,Scryfall ID\nB,Card X,SET,1,id-1'
  expect(parseManaBoxCsv(csv).map((r) => r.name)).toEqual(['Card X'])
})

test('maps unknown finish values to normal and skips blank lines', () => {
  const csv = `${HEADER}\nB,binder,Card X,SET,Set,1,,common,1,1,id-1,0.10,false,false,near_mint,en,USD,2026-01-01T00:00:00.000Z\n`
  const rows = parseManaBoxCsv(csv)
  expect(rows.length).toEqual(1)
  expect(rows[0].finish).toEqual('normal')
})
