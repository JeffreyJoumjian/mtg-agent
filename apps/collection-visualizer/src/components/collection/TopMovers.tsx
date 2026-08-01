import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import type { Currency } from '~/lib/types'
import { getTopMovers, type Mover } from '~/server/collection'
import { formatDelta, scryfallUrl } from '~/lib/format'

interface TopMoversProps {
  currency: Currency
  /** Set to scope to, or null for the whole library. */
  setCode: string | null
}

function MoverRow(props: { mover: Mover; currency: Currency }) {
  const m = props.mover
  const down = m.absolute < 0

  return (
    <a
      href={scryfallUrl(m.setCode, m.collectorNumber)}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between gap-2 text-xs hover:underline"
    >
      <span className="min-w-0 truncate">
        {m.name}
        {m.finish !== 'normal' && <span className="ml-1 text-muted-foreground">{m.finish}</span>}
      </span>
      <span className={`shrink-0 tabular-nums ${down ? 'text-red-400' : 'text-emerald-400'}`}>
        {down ? '▼' : '▲'} {formatDelta(m.absolute, props.currency)}
        {m.ratio != null && <span className="ml-1 opacity-80">({(m.ratio * 100).toFixed(0)}%)</span>}
      </span>
    </a>
  )
}

function MoverColumn(props: { label: string; movers: Mover[]; currency: Currency }) {
  return (
    <div className="min-w-0 space-y-1">
      <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{props.label}</div>
      {props.movers.length === 0 ? (
        <div className="text-xs text-muted-foreground/70">—</div>
      ) : (
        props.movers.map((m) => <MoverRow key={m.key} mover={m} currency={props.currency} />)
      )}
    </div>
  )
}

/** Biggest price gainers and losers over a recent window, for whatever the Library is scoped to.
 *
 *  Like the value chart, this follows the set scope rather than the search — and it's thin until a
 *  few refreshes have accumulated history, since a "move" needs a recorded price on both ends. */
export function TopMovers(props: TopMoversProps) {
  const fetchMovers = useServerFn(getTopMovers)

  const { data, isPending } = useQuery({
    // Currency is in the key: ranking is by price change, which differs per currency, so it refetches.
    queryKey: ['top-movers', props.setCode, props.currency],
    queryFn: () => fetchMovers({ data: { setCode: props.setCode ?? undefined, currency: props.currency } }),
    staleTime: 5 * 60 * 1000,
  })

  if (isPending) return <div className="h-16" aria-hidden />

  const gainers = data?.gainers ?? []
  const losers = data?.losers ?? []
  const days = data?.days ?? 7

  if (gainers.length === 0 && losers.length === 0) {
    return (
      <p className="text-xs text-muted-foreground">
        No price moves recorded in the last {days} days yet — movers appear once refreshes build up
        history.
      </p>
    )
  }

  return (
    <div>
      <div className="mb-1.5 text-xs font-medium text-muted-foreground">Biggest movers · {days}d</div>
      <div className="grid grid-cols-2 gap-x-6">
        <MoverColumn label="Gainers" movers={gainers} currency={props.currency} />
        <MoverColumn label="Losers" movers={losers} currency={props.currency} />
      </div>
    </div>
  )
}
