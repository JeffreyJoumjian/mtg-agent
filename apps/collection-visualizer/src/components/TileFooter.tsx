import type { Currency } from '~/lib/types'
import { formatMoney, formatDelta } from '~/lib/format'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'

interface TileFooterProps {
  name: string
  typeLine: string
  /** Short set code (shown) + full set name (revealed on hover). */
  setCode: string
  setName: string
  collectorNumber: string
  rarity: string
  value: number | null
  delta: { value: number; currency: Currency | string } | null
  currency: Currency
  /** Stacks only: number of printings, shown after the value. */
  printings?: number
}

/** The text block under a card tile's image. Every line has a LOCKED height so CardGrid's
 *  deterministic row-height math (its FOOTER constant) stays exact — keep the two in sync. */
export function TileFooter(props: TileFooterProps) {
  return (
    <>
      <div className="mt-1 h-5 min-w-0 truncate text-sm leading-5">
        {/* Longer open delay on the name/type reveals so they don't flash while scanning the grid. */}
        <Tooltip delayDuration={700}>
          <TooltipTrigger asChild>
            <span>{props.name}</span>
          </TooltipTrigger>
          <TooltipContent>{props.name}</TooltipContent>
        </Tooltip>
      </div>
      <div className="h-4 min-w-0 truncate text-xs leading-4 text-muted-foreground">
        {props.typeLine && (
          <Tooltip delayDuration={700}>
            <TooltipTrigger asChild>
              <span>{props.typeLine}</span>
            </TooltipTrigger>
            <TooltipContent>{props.typeLine}</TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="h-4 min-w-0 truncate text-xs leading-4 text-muted-foreground">
        <Tooltip>
          <TooltipTrigger asChild>
            <span>{props.setCode.toUpperCase()}</span>
          </TooltipTrigger>
          <TooltipContent>{props.setName}</TooltipContent>
        </Tooltip>
        {' '}· #{props.collectorNumber} · {props.rarity}
      </div>
      <div className="flex h-6 items-baseline justify-between gap-1 leading-6">
        <span className="min-w-0 truncate">
          <span className="font-semibold">{formatMoney(props.value, props.currency)}</span>
          {props.printings != null && (
            <span className="text-xs text-muted-foreground"> · {props.printings} printings</span>
          )}
        </span>
        {props.delta && (
          <span className={props.delta.value < 0 ? 'shrink-0 text-xs text-red-400' : 'shrink-0 text-xs text-emerald-400'}>
            {props.delta.value < 0 ? '▼' : '▲'} {formatDelta(props.delta.value, props.delta.currency)}
          </span>
        )}
      </div>
    </>
  )
}
