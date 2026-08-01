import type { CardTile, Finish } from '~/lib/types'

/** A manually-set purchase price for one printing + finish. */
export interface PurchaseOverride {
  price: number
  currency: string
}

/** All overrides, keyed by `overrideKey(scryfallId, finish)`. */
export type PurchaseOverrides = Record<string, PurchaseOverride>

/** The key an override is filed under: a printing + finish is exactly one tile, so the two together
 *  identify it stably — nothing about a CSV re-upload changes either. */
export function overrideKey(scryfallId: string, finish: Finish): string {
  return `${scryfallId}:${finish}`
}

/** Attach each tile's override, if it has one. Tiles without one are returned untouched.
 *
 *  Pure, and kept here in `lib/data` rather than beside the file I/O in `lib/server` on purpose: it's
 *  called from `buildResponse`, which the client bundle pulls in, so it must not drag `node:fs` along. */
export function applyOverrides(tiles: CardTile[], overrides: PurchaseOverrides): CardTile[] {
  return tiles.map((tile) => {
    const override = overrides[overrideKey(tile.scryfallId, tile.finish)]
    return override ? { ...tile, purchaseOverride: override } : tile
  })
}

/** Set (or replace) one override, returning a new map. */
export function setOverride(
  overrides: PurchaseOverrides,
  scryfallId: string,
  finish: Finish,
  price: number,
  currency: string,
): PurchaseOverrides {
  return { ...overrides, [overrideKey(scryfallId, finish)]: { price, currency } }
}

/** Drop one override, returning a new map. Falls back to the CSV purchase — not to $0. */
export function clearOverride(overrides: PurchaseOverrides, scryfallId: string, finish: Finish): PurchaseOverrides {
  const next = { ...overrides }
  delete next[overrideKey(scryfallId, finish)]
  return next
}
