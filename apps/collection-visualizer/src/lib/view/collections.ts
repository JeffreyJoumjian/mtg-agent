import type { CardTile, Currency, SetInfo } from '~/lib/types'
import { tilesValue } from '~/lib/card/pricing'

/** How far along one set is, ready to render. */
export interface SetProgress {
  code: string
  name: string
  /** Distinct main-set cards owned. Printings of the same card in different finishes count once —
   *  a foil and a non-foil Lightning Bolt is one card towards the set, not two. */
  owned: number
  /** What `owned` is measured against, or null when Scryfall knows nothing about the set at all.
   *  Read it together with `basis` — the two denominators mean different things. */
  total: number | null
  /** Which denominator `total` is.
   *
   *  `printed` is the number on the card ("123/281") and is what people mean by completing a set,
   *  but Scryfall publishes it for only ~1 set in 6. `all` is every printing filed under the set
   *  code, variants included, so it runs well past the printed run and 100% is a much taller order.
   *  Surfaced rather than hidden because a 4/302 and a 4/398 on the same screen are not comparable. */
  basis: 'printed' | 'all' | null
  /** 0–1, or null when `total` is. Capped at 1 — see `mainSetOnly`. */
  ratio: number | null
  /** Owned printings including variants and duplicate finishes — what the Library actually shows if
   *  you filter to this set, which would otherwise not match `owned`. */
  printings: number
  /** Total quantity of physical cards owned from the set. */
  quantity: number
  /** Summed value of everything owned from the set, in the active currency. */
  value: number
  releasedAt: string | null
}

export type CollectionSort = 'completion' | 'value' | 'name'

/** The leading integer of a collector number: `"81"`, `"81a"` and `"★81"` are all card 81.
 *  Returns null when there's no number to read at all. */
function collectorIndex(collectorNumber: string): number | null {
  const digits = /\d+/.exec(collectorNumber)
  return digits ? Number(digits[0]) : null
}

/** Whether a printing belongs to the numbered main set rather than sitting above it.
 *
 *  Modern sets file showcase, borderless and promo printings under the same set code but number them
 *  past the printed size, so counting every owned printing would happily report 300/281. Anything
 *  numbered beyond the printed size is therefore a variant for completion purposes — it still shows
 *  in the Library, it just isn't a step towards finishing the set. */
function mainSetOnly(tile: CardTile, printedSize: number | null): boolean {
  if (printedSize == null) return true

  const index = collectorIndex(tile.collectorNumber)
  return index != null && index <= printedSize
}

/** Per-set progress for every set the collection touches.
 *
 *  Sets Scryfall doesn't know about are still listed — with `total: null` — rather than dropped,
 *  because a card you own going missing from a view is far more confusing than a set with no
 *  denominator. */
export function setProgress(tiles: CardTile[], sets: Record<string, SetInfo>, currency: Currency): SetProgress[] {
  const byCode: Record<string, { tiles: CardTile[]; ids: Record<string, boolean> }> = {}

  for (const tile of tiles) {
    const bucket = (byCode[tile.setCode] ??= { tiles: [], ids: {} })
    bucket.tiles.push(tile)
  }

  return Object.entries(byCode).map(([code, bucket]) => {
    // ManaBox exports set codes uppercase, Scryfall keys them lowercase — the same mismatch
    // `iconsForSets` has to handle. Miss it and every set silently looks unknown.
    const info = sets[code.toLowerCase()]
    // Prefer the printed run, but Scryfall only publishes it for a minority of sets; fall back to
    // the full printing count rather than showing no progress at all.
    const printed = info?.printedSize ?? null
    const basis = printed != null ? 'printed' : info ? 'all' : null
    const total = printed ?? info?.cardCount ?? null

    for (const tile of bucket.tiles) {
      // Only the printed basis excludes variants — against `all` they're part of the denominator,
      // so they have to count towards the numerator too.
      if (basis !== 'printed' || mainSetOnly(tile, printed)) bucket.ids[tile.scryfallId] = true
    }

    const owned = Object.keys(bucket.ids).length

    return {
      code,
      name: info?.name ?? bucket.tiles[0].setName,
      owned,
      total,
      basis,
      ratio: total == null || total === 0 ? null : Math.min(owned / total, 1),
      printings: bucket.tiles.length,
      quantity: bucket.tiles.reduce((n, t) => n + t.quantity, 0),
      value: tilesValue(bucket.tiles, currency),
      releasedAt: info?.releasedAt ?? null,
    }
  })
}

/** Sets whose name or code matches the query, case-insensitively. */
export function searchSets(sets: SetProgress[], query: string): SetProgress[] {
  const q = query.trim().toLowerCase()
  if (q === '') return sets

  return sets.filter((s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q))
}

/** Sorted copy. Sets with no known total sort last on completion — they aren't 0% complete, we just
 *  can't say — and ties fall back to name so the order is stable rather than arbitrary. */
export function sortSets(sets: SetProgress[], sort: CollectionSort): SetProgress[] {
  const byName = (a: SetProgress, b: SetProgress) => a.name.localeCompare(b.name)

  return [...sets].sort((a, b) => {
    if (sort === 'name') return byName(a, b)
    if (sort === 'value') return b.value - a.value || byName(a, b)

    if (a.ratio == null && b.ratio == null) return byName(a, b)
    if (a.ratio == null) return 1
    if (b.ratio == null) return -1
    return b.ratio - a.ratio || byName(a, b)
  })
}
