import { useLayoutEffect, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { CardTile } from './CardTile'
import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'

interface CardGridProps {
  tiles: Tile[]
  currency: Currency
  baseline: Baseline
}

/** Target minimum tile width (px). Columns are derived from the container width so the grid
 *  reflows on resize; row heights are MEASURED, so a taller image never overlaps its neighbours. */
const MIN_TILE = 165
const GAP = 12

export function CardGrid(props: CardGridProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(6)

  // Derive the column count from the live container width.
  useLayoutEffect(() => {
    const el = parentRef.current
    if (!el) return
    const compute = () => {
      const w = el.clientWidth
      if (w <= 0) return
      setColumns(Math.max(1, Math.floor((w + GAP) / (MIN_TILE + GAP))))
    }
    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const rowCount = Math.ceil(props.tiles.length / columns)

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 300,
    overscan: 6,
  })

  // Row heights scale with column width, so re-measure whenever the column count changes.
  useLayoutEffect(() => {
    virtualizer.measure()
  }, [columns, virtualizer])

  return (
    <div ref={parentRef} className="h-full overflow-auto px-2">
      <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((row) => {
          const start = row.index * columns
          const rowTiles = props.tiles.slice(start, start + columns)
          return (
            <div
              key={row.key}
              data-index={row.index}
              ref={virtualizer.measureElement}
              className="absolute left-0 top-0 grid w-full gap-3 pb-3"
              style={{
                transform: `translateY(${row.start}px)`,
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {rowTiles.map((tile) => (
                <CardTile key={tile.key} tile={tile} currency={props.currency} baseline={props.baseline} />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
