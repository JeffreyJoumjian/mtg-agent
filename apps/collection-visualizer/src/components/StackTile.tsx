import { useState } from 'react'
import type { Baseline, CardTile as Tile, Currency } from '~/lib/types'
import { effectivePrice } from '~/lib/pricing'
import { formatMoney } from '~/lib/format'
import { groupTotals, type NameGroup } from '~/lib/stacks'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card'
import { CardDetails } from './CardDetails'

interface StackTileProps {
  group: NameGroup
  /** The stack's face (pinned or picked by the rule). */
  rep: Tile
  currency: Currency
  baseline: Baseline
  selected?: boolean
  onSelect: (key: string) => void
}

export function StackTile(props: StackTileProps) {
  const { group, rep, currency, baseline } = props
  const totals = groupTotals(group, currency)
  const many = group.variants.length > 1

  return (
    <HoverCard openDelay={120} closeDelay={120}>
      <HoverCardTrigger asChild>
        <div
          onClick={() => props.onSelect(rep.key)}
          className={`flex cursor-pointer flex-col rounded-lg bg-card p-1.5 transition hover:ring-2 hover:ring-ring ${props.selected ? 'ring-2 ring-primary' : ''}`}
        >
          {/* Box stays card-aspect so the grid's deterministic row-height math is unchanged; the
              "held stack" layers all live inside it (front top-left, backs cascade bottom-right). */}
          <div className="relative aspect-[488/680] w-full">
            {many && <div className="absolute inset-y-[6px] left-[6px] right-0 rounded-md border border-border bg-muted" />}
            {many && <div className="absolute inset-y-[3px] left-[3px] right-[3px] rounded-md border border-border bg-muted" />}
            <div className={`absolute overflow-hidden rounded bg-muted ${many ? 'bottom-[6px] left-0 right-[6px] top-0' : 'inset-0'}`}>
              {rep.enriched.imageSmall ? (
                <img src={rep.enriched.imageSmall} alt={rep.name} loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-xs text-muted-foreground">{rep.name}</div>
              )}
              <span className="absolute right-1 top-1 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white">×{totals.quantity}</span>
              {rep.finish !== 'normal' && (
                <span className="absolute left-1 top-1 rounded bg-gradient-to-r from-fuchsia-500 to-amber-400 px-1 py-0.5 text-[10px] font-bold text-black">
                  {rep.finish === 'etched' ? 'ETCH' : 'FOIL'}
                </span>
              )}
            </div>
          </div>
          <div className="mt-1 h-5 min-w-0 truncate text-sm leading-5" title={rep.name}>{rep.name}</div>
          <div className="flex h-6 items-baseline justify-between gap-1 leading-6">
            <span className="font-semibold">{formatMoney(totals.value, currency)}</span>
            {many && <span className="shrink-0 text-xs text-muted-foreground">{group.variants.length} printings</span>}
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="right" className="w-72">
        <StackFlyout group={group} rep={rep} currency={currency} baseline={baseline} onSelect={props.onSelect} />
      </HoverCardContent>
    </HoverCard>
  )
}

interface StackFlyoutProps {
  group: NameGroup
  rep: Tile
  currency: Currency
  baseline: Baseline
  onSelect: (key: string) => void
}

function StackFlyout(props: StackFlyoutProps) {
  const [hoveredKey, setHoveredKey] = useState(props.rep.key)
  const hovered = props.group.variants.find((v) => v.key === hoveredKey) ?? props.rep
  const totals = groupTotals(props.group, props.currency)

  return (
    <div>
      <CardDetails tile={hovered} currency={props.currency} baseline={props.baseline} />
      <div className="mt-3 border-t pt-2">
        <div className="mb-2 text-xs text-muted-foreground">
          {props.group.variants.length} printings · total {formatMoney(totals.value, props.currency)}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {props.group.variants.map((v) => {
            const active = v.key === hoveredKey
            const price = effectivePrice(v.prices, props.currency, v.finish)
            return (
              <button
                key={v.key}
                onMouseEnter={() => setHoveredKey(v.key)}
                onClick={() => props.onSelect(v.key)}
                title={`${v.setName} #${v.collectorNumber} · ${formatMoney(price, props.currency)}`}
                className={`relative h-16 w-[46px] shrink-0 cursor-pointer overflow-hidden rounded border bg-muted transition ${active ? '-translate-y-0.5 border-ring ring-2 ring-ring' : 'border-border'}`}
              >
                {v.enriched.imageSmall && <img src={v.enriched.imageSmall} alt="" className="absolute inset-0 h-full w-full object-contain" />}
                {v.finish !== 'normal' && (
                  <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-amber-400" />
                )}
              </button>
            )
          })}
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          {hovered.setName} · #{hovered.collectorNumber}
          {hovered.finish !== 'normal' && ` · ${hovered.finish}`} ·{' '}
          {formatMoney(effectivePrice(hovered.prices, props.currency, hovered.finish), props.currency)}
          {hovered.quantity > 1 && ` · ×${hovered.quantity}`}
        </div>
      </div>
    </div>
  )
}
