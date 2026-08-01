import { useId } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import type { Currency } from '~/lib/types'
import type { CardValuePoint } from '~/lib/view/history'
import { formatMoney, formatTick } from '~/lib/format'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '~/components/ui/chart'

interface PriceChartProps {
  points: CardValuePoint[]
  currency: Currency
  /** Chart height in px, axis band included. */
  height?: number
}

const shortDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })

const fullDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { dateStyle: 'medium', timeZone: 'UTC' })

/** A single-series value-over-time chart.
 *
 *  One series, so there's no legend — the heading above it names what's plotted. The line wears
 *  `primary` rather than a `--chart-N` slot: this palette is deliberately zero-chroma so the card art
 *  is the only colour in the app, and one series needs one colour, not a categorical ramp. */
export function PriceChart(props: PriceChartProps) {
  const gradientId = useId().replace(/:/g, '')

  const config = {
    value: { label: 'Value', color: 'var(--primary)' },
  } satisfies ChartConfig

  return (
    <ChartContainer
      config={config}
      className="aspect-auto w-full"
      style={{ height: props.height ?? 140 }}
    >
      <AreaChart data={props.points} margin={{ left: 4, right: 12, top: 8, bottom: 0 }}>
        <defs>
          {/* An area wash, not a saturated block — it reads as the line's shadow, not a second mark. */}
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-value)" stopOpacity={0.18} />
            <stop offset="100%" stopColor="var(--color-value)" stopOpacity={0.02} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} strokeDasharray="0" className="stroke-border" />

        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={48}
          tickFormatter={shortDate}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={56}
          tickMargin={4}
          domain={['auto', 'auto']}
          tickFormatter={(v: number) => formatTick(v, props.currency)}
        />

        <ChartTooltip
          cursor={{ strokeWidth: 1 }}
          content={
            <ChartTooltipContent
              labelFormatter={(label) => fullDate(String(label))}
              formatter={(value) => formatMoney(Number(value), props.currency)}
            />
          }
        />

        <Area
          dataKey="value"
          type="monotone"
          stroke="var(--color-value)"
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          // No dot per point — 60 of them is noise; the active point appears on hover instead.
          dot={false}
          activeDot={{ r: 4, strokeWidth: 2, className: 'stroke-card' }}
          isAnimationActive={false}
        />
      </AreaChart>
    </ChartContainer>
  )
}
