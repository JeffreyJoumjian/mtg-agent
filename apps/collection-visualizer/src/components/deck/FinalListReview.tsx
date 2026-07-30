import type { FinalListInput } from '~/lib/deck/chat-events'
import { Button } from '~/components/ui/button'

interface FinalListReviewProps {
  input: FinalListInput
  signedOff: boolean
  onSignOff: () => void
}

export function FinalListReview(props: FinalListReviewProps) {
  const { input, signedOff } = props
  const counted = input.groups.reduce(
    (n, g) => n + g.cards.reduce((s, c) => s + (Number(c.match(/^(\d+)x\s/)?.[1]) || 1), 0),
    0,
  )
  const mismatch = counted !== input.total

  return (
    <div className="rounded-lg border-2 border-primary/50 bg-card p-3">
      <div className="mb-2 flex items-baseline gap-2">
        <span className="font-semibold">Final list</span>
        <span className={`text-sm ${mismatch ? 'text-destructive' : 'text-muted-foreground'}`}>
          {input.total} cards{mismatch ? ` (groups sum to ${counted})` : ''}
        </span>
        {signedOff && <span className="ml-auto text-xs text-emerald-500">✓ signed off</span>}
      </div>

      <div className="columns-2 gap-4 text-sm sm:columns-3">
        {input.groups.map((group) => (
          <div key={group.name} className="mb-2 break-inside-avoid">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {group.name} ({group.cards.length})
            </div>
            <ul>
              {group.cards.map((card) => (
                <li key={card} className="truncate">
                  {card}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {input.summary && <p className="mt-2 text-sm text-muted-foreground">{input.summary}</p>}

      {!signedOff && (
        <div className="mt-3 flex justify-end">
          <Button onClick={() => props.onSignOff()}>Sign off — write the files</Button>
        </div>
      )}
    </div>
  )
}
