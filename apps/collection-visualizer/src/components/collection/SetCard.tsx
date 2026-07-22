import { Link } from '@tanstack/react-router'
import type { Currency } from '~/lib/types'
import type { SetProgress } from '~/lib/view/collections'
import { formatMoney } from '~/lib/format'
import { SetIcon } from '~/components/symbols/SetIcon'

interface SetCardProps {
  set: SetProgress
  currency: Currency
}

/** One set in the Collections grid. Clicking it opens the Library scoped to that set. */
export function SetCard(props: SetCardProps) {
  const { set } = props
  const pct = set.ratio == null ? null : Math.round(set.ratio * 100)
  const complete = set.ratio === 1

  return (
    <Link
      to="/"
      search={{ set: set.code }}
      className="flex cursor-pointer flex-col gap-3 rounded-lg border bg-card p-3 transition hover:bg-accent"
    >
      <div className="flex min-w-0 items-start gap-2">
        <SetIcon setCode={set.code} className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <div className="truncate font-medium" title={set.name}>
            {set.name}
          </div>
          <div className="text-xs uppercase text-muted-foreground">{set.code}</div>
        </div>
        {pct != null && (
          <span className={`shrink-0 text-sm font-semibold tabular-nums ${complete ? 'text-emerald-400' : ''}`}>
            {pct}%
          </span>
        )}
      </div>

      <div>
        {/* A set with no printed size gets a muted, empty track rather than a 0% bar — we don't know
            how far along it is, and an empty bar would claim we do. */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          {set.ratio != null && (
            <div
              className={`h-full rounded-full ${complete ? 'bg-emerald-400' : 'bg-primary'}`}
              style={{ width: `${set.ratio * 100}%` }}
            />
          )}
        </div>
        <div className="mt-1.5 flex items-baseline justify-between gap-2 text-xs text-muted-foreground">
          <span className="min-w-0 truncate tabular-nums">
            {set.total == null ? `${set.owned} owned` : `${set.owned} / ${set.total}`}
            {/* Two sets side by side can be counted against different denominators, so say which. */}
            {set.basis === 'all' && (
              <span className="ml-1 opacity-70" title="Scryfall publishes no printed set size, so this counts every printing including variant art">
                all printings
              </span>
            )}
          </span>
          <span className="shrink-0 tabular-nums">{formatMoney(set.value, props.currency)}</span>
        </div>
      </div>
    </Link>
  )
}
