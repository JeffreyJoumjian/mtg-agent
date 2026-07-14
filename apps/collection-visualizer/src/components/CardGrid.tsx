import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { CardTile } from './CardTile'
import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'

interface CardGridProps {
  tiles: Tile[]
  currency: Currency
  baseline: Baseline
  columns?: number
}

export function CardGrid(props: CardGridProps) {
  const columns = props.columns ?? 6
  const parentRef = useRef<HTMLDivElement>(null)
  const rowCount = Math.ceil(props.tiles.length / columns)

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 320,
    overscan: 4,
  })

  return (
    <div ref={parentRef} className="h-[calc(100vh-9rem)] overflow-auto">
      <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((row) => {
          const start = row.index * columns
          const rowTiles = props.tiles.slice(start, start + columns)
          return (
            <div
              key={row.key}
              className="absolute left-0 top-0 grid w-full gap-3 px-1"
              style={{ transform: `translateY(${row.start}px)`, gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
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
