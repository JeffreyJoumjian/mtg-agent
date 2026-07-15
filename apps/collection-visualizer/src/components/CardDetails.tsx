import type { ReactNode } from 'react'
import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'
import { tileValue, unitDelta } from '~/lib/pricing'
import { formatMoney, formatDelta } from '~/lib/format'

interface CardDetailsProps {
  tile: Tile
  currency: Currency
  baseline: Baseline
  /** Sidebar variant: also render the oracle text. */
  full?: boolean
  /** Optional node overlaid on the card image (e.g. the stack's variant selector), not clipped by it. */
  imageOverlay?: ReactNode
}

export function CardDetails(props: CardDetailsProps) {
  const { tile, currency, baseline } = props
  const value = tileValue(tile, currency)
  const delta = unitDelta(tile, currency, baseline)
  const img = tile.enriched.imageNormal ?? tile.enriched.imageSmall

  return (
    <div className="space-y-2">
      <div className="relative aspect-[488/680] w-full">
        <div className="absolute inset-0 overflow-hidden rounded-lg bg-muted">
          {img ? (
            <img src={img} alt={tile.name} className="absolute inset-0 h-full w-full object-contain" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-sm text-muted-foreground">
              {tile.name}
            </div>
          )}
        </div>
        {props.imageOverlay}
      </div>
      <div>
        <div className="font-semibold leading-tight">{tile.name}</div>
        {tile.enriched.typeLine && <div className="text-xs text-muted-foreground">{tile.enriched.typeLine}</div>}
      </div>
      <div className="text-xs text-muted-foreground">
        {tile.setName} · {tile.collectorNumber} · {tile.rarity}
        {tile.finish !== 'normal' && ` · ${tile.finish}`}
        {tile.quantity > 1 && ` · ×${tile.quantity}`}
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-lg font-semibold">{formatMoney(value, currency)}</span>
        {delta && (
          <span className={delta.value < 0 ? 'text-sm text-red-400' : 'text-sm text-emerald-400'}>
            {delta.value < 0 ? '▼' : '▲'} {formatDelta(delta.value, delta.currency)}
          </span>
        )}
      </div>
      {props.full && tile.enriched.oracleText && (
        <p className="border-t pt-2 text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground">
          {tile.enriched.oracleText}
        </p>
      )}
    </div>
  )
}
