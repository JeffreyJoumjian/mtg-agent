import { test, expect } from 'bun:test'
import { formatMoney, formatDelta, truncate } from './format'

test('formatMoney renders currency symbol and 2 decimals, — for null', () => {
  expect(formatMoney(1.5, 'usd')).toEqual('$1.50')
  expect(formatMoney(2.4, 'eur')).toEqual('€2.40')
  expect(formatMoney(null, 'usd')).toEqual('—')
})

test('formatDelta is signed with a leading + or − and a minus glyph', () => {
  expect(formatDelta(0.12, 'usd')).toEqual('+$0.12')
  expect(formatDelta(-0.05, 'usd')).toEqual('−$0.05')
  expect(formatDelta(0, 'usd')).toEqual('+$0.00')
})

test('truncate adds an ellipsis past max', () => {
  expect(truncate('Short', 10)).toEqual('Short')
  expect(truncate('A Very Long Card Name', 10)).toEqual('A Very Lo…')
})
