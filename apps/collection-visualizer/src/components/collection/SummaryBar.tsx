import type { Baseline, CardTile, Currency } from '~/lib/types'
import { totals } from '~/lib/card/pricing'
import { formatMoney, formatDelta } from '~/lib/format'

interface SummaryBarProps {
  tiles: CardTile[]
  currency: Currency
  baseline: Baseline
}

export function SummaryBar(props: SummaryBarProps) {
  const { value, delta, deltaCurrency } = totals(props.tiles, props.currency, props.baseline)
  const count = props.tiles.reduce((s, t) => s + t.quantity, 0)
  return (
    <div className="flex gap-6 text-sm">
      <span>{count} cards</span>
      <span>Value: <b>{formatMoney(value, props.currency)}</b></span>
      <span className={delta < 0 ? 'text-red-400' : 'text-emerald-400'}>
        {props.baseline === 'sinceRefresh' ? 'Since refresh' : 'Vs purchase'}: {formatDelta(delta, deltaCurrency)}
      </span>
    </div>
  )
}
