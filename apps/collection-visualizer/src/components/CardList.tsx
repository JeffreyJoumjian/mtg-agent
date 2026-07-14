import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'
import { tileValue, unitDelta } from '~/lib/pricing'
import { formatMoney, formatDelta } from '~/lib/format'
import { ManaSymbol } from './ManaSymbol'

interface CardListProps {
  tiles: Tile[]
  currency: Currency
  baseline: Baseline
}

const ROW = 56

export function CardList(props: CardListProps) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: props.tiles.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW,
    overscan: 12,
  })

  return (
    <div ref={parentRef} className="h-full overflow-y-auto">
      <div className="relative w-full" style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((row) => {
          const t = props.tiles[row.index]
          const value = tileValue(t, props.currency)
          const delta = unitDelta(t, props.currency, props.baseline)
          return (
            <div
              key={row.key}
              className="absolute left-0 top-0 flex w-full items-center gap-3 border-b px-3"
              style={{ height: ROW, transform: `translateY(${row.start}px)` }}
            >
              <div className="relative h-11 w-8 shrink-0 overflow-hidden rounded bg-muted">
                {t.enriched.imageSmall && (
                  <img src={t.enriched.imageSmall} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate">{t.name}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {t.setName} · {t.collectorNumber}
                  {t.finish !== 'normal' && ` · ${t.finish === 'etched' ? 'Etched' : 'Foil'}`}
                  {t.quantity > 1 && ` · ×${t.quantity}`}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-0.5">
                {t.enriched.colors.map((c) => (
                  <ManaSymbol key={c} sym={c} className="h-4 w-4" />
                ))}
              </div>
              <div className="w-24 shrink-0 text-right">
                <div className="font-semibold">{formatMoney(value, props.currency)}</div>
                {delta && (
                  <div className={delta.value < 0 ? 'text-xs text-red-400' : 'text-xs text-emerald-400'}>
                    {delta.value < 0 ? '▼' : '▲'} {formatDelta(delta.value, delta.currency)}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
