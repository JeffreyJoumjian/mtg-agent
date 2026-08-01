import type { Currency } from '~/lib/types'
import { seriesDelta, type CardValuePoint } from '~/lib/view/history'
import { formatMoney, formatDelta } from '~/lib/format'
import { PriceChart } from './PriceChart'

interface TrendPanelProps {
  points: CardValuePoint[]
  currency: Currency
  /** Names what's plotted. Stands in for the legend a single-series chart doesn't need. */
  title: string
  height?: number
  /** Shown under the title — the caveat about what the numbers do and don't mean. */
  note?: string
}

/** A titled value-over-time chart, with the states a sparse history actually produces.
 *
 *  History is only recorded on refresh, so a fresh install genuinely has one point, and one point is
 *  a dot rather than a trend. Saying so beats drawing a chart that looks broken. */
export function TrendPanel(props: TrendPanelProps) {
  const delta = seriesDelta(props.points)
  const latest = props.points[props.points.length - 1]

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">{props.title}</span>
        {delta && (
          <span className={`text-xs tabular-nums ${delta.absolute < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {delta.absolute < 0 ? '▼' : '▲'} {formatDelta(delta.absolute, props.currency)}
            {delta.ratio != null && <span className="ml-1 opacity-80">({(delta.ratio * 100).toFixed(1)}%)</span>}
          </span>
        )}
      </div>

      {props.points.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          No price history recorded yet — it starts filling in on the next price refresh.
        </p>
      ) : props.points.length === 1 ? (
        <p className="text-xs text-muted-foreground">
          Recording since {new Date(`${latest.date}T00:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC' })}.
          One day so far ({formatMoney(latest.value, props.currency)}) — the chart draws once there are
          two, and a day where nothing moves isn't recorded.
        </p>
      ) : (
        <>
          <PriceChart points={props.points} currency={props.currency} height={props.height} />
          {props.note && <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{props.note}</p>}
        </>
      )}
    </div>
  )
}
