import { useState, type CSSProperties } from 'react'
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

const TRANSITION = 'transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1)'

/** Static cascade for a card in the TILE — a held-hand look, pivoting from the bottom, kept inside
 *  the cell (scale < 1). The tile itself never animates on hover; the fan lives in the popover. */
function tileCardStyle(index: number): CSSProperties {
  return {
    transform: `translateX(${index * 6}%) translateY(${-index * 11}%) rotate(${index * 2}deg) scale(0.82)`,
    transformOrigin: 'bottom center',
    zIndex: 20 - index,
  }
}

export function StackTile(props: StackTileProps) {
  const { group, rep, currency, baseline } = props
  const totals = groupTotals(group, currency)

  const others = group.variants.filter((v) => v.key !== rep.key)
  const shown = [rep, ...others].slice(0, 3) // up to 3 visible in the tile
  const many = group.variants.length > 1

  const [hoveredKey, setHoveredKey] = useState(rep.key)

  return (
    <HoverCard openDelay={120} closeDelay={120} onOpenChange={(o) => !o && setHoveredKey(rep.key)}>
      <HoverCardTrigger asChild>
        <div
          onClick={() => props.onSelect(rep.key)}
          className={`flex cursor-pointer flex-col rounded-lg bg-card p-1.5 transition hover:bg-accent ${props.selected ? 'ring-2 ring-primary' : ''}`}
        >
          {/* Card-aspect box keeps the grid's deterministic row height; the bg-card behind the
              cascade makes the whole cell a clear, obvious hover target. */}
          <div className="relative aspect-[488/680] w-full">
            {shown.map((v, i) => (
              <div
                key={v.key}
                style={tileCardStyle(i)}
                className="absolute inset-0 overflow-hidden rounded-md border border-black/40 bg-muted shadow-md"
              >
                {v.enriched.imageSmall ? (
                  <img src={v.enriched.imageSmall} alt={v.name} loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-xs text-muted-foreground">{v.name}</div>
                )}
                {i === 0 && (
                  <span className="absolute right-1 top-1 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white">×{totals.quantity}</span>
                )}
                {i === 0 && rep.finish !== 'normal' && (
                  <span className="absolute left-1 top-1 rounded bg-gradient-to-r from-fuchsia-500 to-amber-400 px-1 py-0.5 text-[10px] font-bold text-black">
                    {rep.finish === 'etched' ? 'ETCH' : 'FOIL'}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-1 h-5 min-w-0 truncate text-sm leading-5" title={rep.name}>{rep.name}</div>
          <div className="flex h-6 items-baseline justify-between gap-1 leading-6">
            <span className="font-semibold">{formatMoney(totals.value, currency)}</span>
            {many && <span className="shrink-0 text-xs text-muted-foreground">{group.variants.length} printings</span>}
          </div>
        </div>
      </HoverCardTrigger>

      {/* Two separate boxes: a centered fan (the hover mechanism) and the card-details popover. */}
      <HoverCardContent side="right" align="center" className="flex w-auto items-start gap-3 border-0 bg-transparent p-0 shadow-none">
        <FanBox variants={group.variants} hoveredKey={hoveredKey} onHover={setHoveredKey} onSelect={props.onSelect} />
        <div className="w-72 rounded-md border bg-popover p-4 text-sm text-popover-foreground shadow-md">
          <StackFlyout group={group} currency={currency} baseline={baseline} hoveredKey={hoveredKey} onHover={setHoveredKey} onSelect={props.onSelect} />
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

interface FanBoxProps {
  variants: Tile[]
  hoveredKey: string
  onHover: (key: string) => void
  onSelect: (key: string) => void
}

/** A centered fan of the stack's cards — always anchored to the box centre, so it reads the same no
 *  matter where the tile sits in the grid. Hovering a card straightens + lifts it to the front. */
function FanBox(props: FanBoxProps) {
  const vs = props.variants
  const n = vs.length
  const center = (n - 1) / 2
  const spread = Math.min(13, 52 / Math.max(1, n - 1)) // rotation (deg) per card
  const offset = Math.min(42, 232 / Math.max(1, n - 1)) // horizontal separation (px) per card
  const width = 132 + (n - 1) * offset

  return (
    <div className="rounded-md border bg-popover p-4 shadow-md">
      <div className="relative mx-auto h-[184px]" style={{ width }}>
        {vs.map((v, i) => {
          const focused = props.hoveredKey === v.key
          const x = (i - center) * offset
          const angle = (i - center) * spread
          // Cards spread horizontally AND rotate (so each exposes a hoverable strip); the focused
          // one straightens, lifts and scales up in place — no jumping.
          const transform = focused
            ? `translateX(calc(-50% + ${x}px)) translateY(-22px) rotate(0deg) scale(1.1)`
            : `translateX(calc(-50% + ${x}px)) rotate(${angle}deg)`
          return (
            <button
              key={v.key}
              onMouseEnter={() => props.onHover(v.key)}
              onClick={() => props.onSelect(v.key)}
              style={{ transform, transformOrigin: 'bottom center', zIndex: focused ? 50 : 10 + i, transition: TRANSITION }}
              className={`absolute bottom-0 left-1/2 h-[150px] w-[104px] cursor-pointer overflow-hidden rounded-md border-2 bg-muted shadow-lg ${focused ? 'border-primary' : 'border-background'}`}
            >
              {v.enriched.imageSmall && <img src={v.enriched.imageSmall} alt={v.name} className="absolute inset-0 h-full w-full object-contain" />}
              {v.finish !== 'normal' && (
                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-amber-400" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface StackFlyoutProps {
  group: NameGroup
  currency: Currency
  baseline: Baseline
  hoveredKey: string
  onHover: (key: string) => void
  onSelect: (key: string) => void
}

function StackFlyout(props: StackFlyoutProps) {
  const hovered = props.group.variants.find((v) => v.key === props.hoveredKey) ?? props.group.variants[0]
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
            const active = v.key === props.hoveredKey
            const price = effectivePrice(v.prices, props.currency, v.finish)
            return (
              <button
                key={v.key}
                onMouseEnter={() => props.onHover(v.key)}
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
      </div>
    </div>
  )
}
