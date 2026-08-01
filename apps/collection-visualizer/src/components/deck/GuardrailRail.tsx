import type { TallyInput } from '~/lib/deck/chat-events'

interface GuardrailRailProps {
  tally: TallyInput
}

/** The finalizer's running guardrails, pinned above the deck panel while the exercise runs. */
export function GuardrailRail(props: GuardrailRailProps) {
  const t = props.tally
  const gcOver = t.gcCeiling !== undefined && t.gameChangers > t.gcCeiling

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b bg-card px-3 py-2 text-xs">
      <span className={t.keeps > t.target ? 'font-medium text-amber-500' : 'font-medium'}>
        keeps {t.keeps}/{t.target}
      </span>
      <span className="text-muted-foreground">cuts {t.cuts}</span>
      <span className="text-muted-foreground">pocket {t.pockets}</span>
      <span className={gcOver ? 'font-medium text-destructive' : ''}>
        GC {t.gameChangers}
        {t.gcCeiling !== undefined ? `/${t.gcCeiling}` : ''}
      </span>
      {t.manaSources !== undefined && <span className="text-muted-foreground">sources {t.manaSources}</span>}
      {t.categories?.map((c) => {
        const under = c.target !== undefined && c.count < c.target
        return (
          <span key={c.name} className={under ? 'rounded bg-amber-500/15 px-1.5 py-0.5 text-amber-500' : 'rounded bg-muted px-1.5 py-0.5 text-muted-foreground'}>
            {c.name} {c.count}
            {c.target !== undefined ? `/${c.target}` : ''}
          </span>
        )
      })}
    </div>
  )
}
