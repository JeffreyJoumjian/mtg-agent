import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

interface CardGridProps {
  count: number
  /** Cap on columns; null = auto (as many as fit responsively). */
  maxPerRow: number | null
  /** Render the cell at `index`; must return a keyed element. */
  renderCell: (index: number) => ReactNode
}

/** Grid geometry. Row height is derived DETERMINISTICALLY from the column width (every row is
 *  identical), so a resize updates all rows uniformly — no per-row measurement cache to go stale
 *  and overlap, which is what breaks measured virtual grids when every item resizes at once. */
const MIN_TILE = 165 // target minimum tile width (px)
const GAP = 12 // gap-3, between tiles and between rows
const PAGE_PAD = 16 // px-2 on the scroll container (8px each side)
const TILE_PAD = 6 // p-1.5 inside each tile (each side)
const CARD_ASPECT = 680 / 488 // MTG card height / width
const FOOTER = 4 + 20 + 16 + 16 + 24 // mt-1 + name(h-5) + type(h-4) + meta(h-4) + price(h-6) — see TileFooter

interface Geometry {
  columns: number
  rowHeight: number
}

function computeGeometry(gridWidth: number, maxPerRow: number | null): Geometry {
  const auto = Math.max(1, Math.floor((gridWidth + GAP) / (MIN_TILE + GAP)))
  const columns = maxPerRow ? Math.min(auto, maxPerRow) : auto
  const tileWidth = (gridWidth - GAP * (columns - 1)) / columns
  const imageHeight = (tileWidth - TILE_PAD * 2) * CARD_ASPECT
  const rowHeight = TILE_PAD * 2 + imageHeight + FOOTER + GAP
  return { columns, rowHeight }
}

export function CardGrid(props: CardGridProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const [geo, setGeo] = useState<Geometry>({ columns: 6, rowHeight: 320 })

  useLayoutEffect(() => {
    const el = parentRef.current
    if (!el) return
    const measure = () => {
      const gridWidth = el.clientWidth - PAGE_PAD
      if (gridWidth <= 0) return
      const next = computeGeometry(gridWidth, props.maxPerRow)
      setGeo((prev) =>
        prev.columns === next.columns && Math.abs(prev.rowHeight - next.rowHeight) < 0.5 ? prev : next,
      )
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [props.maxPerRow])

  const rowCount = Math.ceil(props.count / geo.columns)

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => geo.rowHeight,
    overscan: 6,
  })

  useLayoutEffect(() => {
    virtualizer.measure()
  }, [geo.columns, geo.rowHeight, virtualizer])

  return (
    <div ref={parentRef} className="h-full overflow-y-auto overflow-x-hidden px-2">
      <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((row) => {
          const start = row.index * geo.columns
          const end = Math.min(start + geo.columns, props.count)
          const cells: ReactNode[] = []
          for (let i = start; i < end; i++) cells.push(props.renderCell(i))
          return (
            <div
              key={row.key}
              className="absolute left-0 top-0 grid w-full gap-3"
              style={{
                transform: `translateY(${row.start}px)`,
                gridTemplateColumns: `repeat(${geo.columns}, minmax(0, 1fr))`,
              }}
            >
              {cells}
            </div>
          )
        })}
      </div>
    </div>
  )
}
