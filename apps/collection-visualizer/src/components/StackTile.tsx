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

/** Position for one card in the stack. Everything pivots from the BOTTOM (like a held hand of
 *  cards): a visible cascade at rest, a rotated fan on hover, and a scaled-forward "focus" pose for
 *  the hovered card. Cards are slightly inset (scale < 1) so the cascade stays inside the cell,
 *  and the fan spreads up + outward — overflowing earlier rows (behind) rather than the row below. */
function cardStyle(index: number, open: boolean, focused: boolean): CSSProperties {
  // Fan slot: the face (index 0) sits centered; the others alternate to the sides.
  const slot = index === 0 ? 0 : index % 2 === 1 ? -Math.ceil(index / 2) : Math.ceil(index / 2)

  let transform: string
  let zIndex: number
  if (open && focused) {
    transform = 'translateY(-14%) scale(1.02) rotate(0deg)'
    zIndex = 40
  } else if (open) {
    transform = `translateX(${slot * 34}%) translateY(-16%) rotate(${slot * 11}deg) scale(0.84)`
    zIndex = 20 - index
  } else {
    transform = `translateX(${index * 6}%) translateY(${-index * 11}%) rotate(${index * 2}deg) scale(0.82)`
    zIndex = 20 - index
  }
  return { transform, transformOrigin: 'bottom center', zIndex, transition: TRANSITION }
}

export function StackTile(props: StackTileProps) {
  const { group, rep, currency, baseline } = props
  const totals = groupTotals(group, currency)

  const others = group.variants.filter((v) => v.key !== rep.key)
  const shown = [rep, ...others].slice(0, 3) // up to 3 visible in the tile; the flyout lists them all
  const many = group.variants.length > 1

  const [open, setOpen] = useState(false)
  const [hoveredKey, setHoveredKey] = useState(rep.key)

  return (
    <HoverCard openDelay={120} closeDelay={120}>
      <HoverCardTrigger asChild>
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => {
            setOpen(false)
            setHoveredKey(rep.key)
          }}
          className={`relative flex cursor-pointer flex-col rounded-lg p-1.5 transition-[z-index] ${open ? 'z-20' : 'z-0'}`}
        >
          {/* Stack area is card-aspect (keeps the grid's deterministic row height) but not clipped,
              so the fan can spread beyond it on hover. */}
          <div className="relative aspect-[488/680] w-full">
            {shown.map((v, i) => {
              const focused = hoveredKey === v.key
              return (
                <button
                  key={v.key}
                  onMouseEnter={() => setHoveredKey(v.key)}
                  onClick={(e) => {
                    e.stopPropagation()
                    props.onSelect(v.key)
                  }}
                  style={cardStyle(i, open, focused)}
                  className={`absolute inset-0 cursor-pointer overflow-hidden rounded-md border bg-muted shadow-md ${props.selected && focused ? 'border-primary' : 'border-black/40'}`}
                >
                  {v.enriched.imageSmall ? (
                    <img src={v.enriched.imageSmall} alt={v.name} loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-xs text-muted-foreground">{v.name}</div>
                  )}
                  {v.finish !== 'normal' && (i === 0 || focused) && (
                    <span className="absolute left-1 top-1 rounded bg-gradient-to-r from-fuchsia-500 to-amber-400 px-1 py-0.5 text-[10px] font-bold text-black">
                      {v.finish === 'etched' ? 'ETCH' : 'FOIL'}
                    </span>
                  )}
                  {/* Total count badge only on the face while at rest. */}
                  {i === 0 && !open && (
                    <span className="absolute right-1 top-1 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white">×{totals.quantity}</span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-1 h-5 min-w-0 truncate text-sm leading-5" title={rep.name}>{rep.name}</div>
          <div className="flex h-6 items-baseline justify-between gap-1 leading-6">
            <span className="font-semibold">{formatMoney(totals.value, currency)}</span>
            {many && <span className="shrink-0 text-xs text-muted-foreground">{group.variants.length} printings</span>}
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="right" className="w-72">
        <StackFlyout
          group={group}
          currency={currency}
          baseline={baseline}
          hoveredKey={hoveredKey}
          onHover={setHoveredKey}
          onSelect={props.onSelect}
        />
      </HoverCardContent>
    </HoverCard>
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
