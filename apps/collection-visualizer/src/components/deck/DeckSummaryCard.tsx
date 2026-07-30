import { Link } from '@tanstack/react-router'
import type { DeckSummary } from '~/lib/deck/parse'
import { ManaSymbol } from '~/components/symbols/Mana'

const WUBRG = ['W', 'U', 'B', 'R', 'G'] as const
type ColorSym = (typeof WUBRG)[number]

interface DeckSummaryCardProps {
  summary: DeckSummary
}

export function DeckSummaryCard(props: DeckSummaryCardProps) {
  const { summary } = props
  const colors = (summary.colors ?? '')
    .split('/')
    .filter((c): c is ColorSym => (WUBRG as readonly string[]).includes(c))

  const owned = summary.statusCounts.HAVE + summary.statusCounts.PROXY

  return (
    <Link
      to="/decks/$slug"
      params={{ slug: summary.slug }}
      className="flex flex-col gap-2 rounded-lg border bg-card p-4 transition hover:bg-accent"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate font-semibold">{summary.name}</span>
        <span className="flex shrink-0 gap-0.5">
          {colors.map((c) => (
            <ManaSymbol key={c} sym={c} className="h-4 w-4" />
          ))}
        </span>
      </div>

      {summary.commander && <div className="truncate text-sm text-muted-foreground">{summary.commander}</div>}

      <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
        <span className={summary.total === 100 ? '' : 'text-amber-500'}>{summary.total}/100</span>
        <span>HAVE {summary.statusCounts.HAVE}</span>
        {summary.statusCounts.BUY > 0 && <span className="text-amber-500">BUY {summary.statusCounts.BUY}</span>}
        {summary.statusCounts.PROXY > 0 && <span className="text-violet-400">PROXY {summary.statusCounts.PROXY}</span>}
        <span className="ml-auto">{owned}/{summary.total} in hand</span>
      </div>
    </Link>
  )
}
