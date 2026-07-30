import { useEffect, useState } from 'react'
import type { CardStatus, DeckStatus, ParsedDeck } from '~/lib/deck/parse'
import type { TallyInput } from '~/lib/deck/chat-events'
import { fetchCardsByNames } from '~/lib/data/scryfall'
import { GuardrailRail } from './GuardrailRail'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card'

const STATUS_STYLE: Record<DeckStatus, string> = {
  HAVE: 'text-muted-foreground',
  BUY: 'text-amber-500',
  PROXY: 'text-violet-400',
  CONSIDERING: 'text-sky-400',
  CUT: 'text-muted-foreground line-through',
}

function scryImage(card: any): string | null {
  return card?.image_uris?.normal ?? card?.card_faces?.[0]?.image_uris?.normal ?? null
}

interface DeckPanelProps {
  deck: ParsedDeck
  statuses: Record<string, CardStatus>
  tally: TallyInput | null
}

export function DeckPanel(props: DeckPanelProps) {
  const { deck, statuses } = props
  const [cards, setCards] = useState<Record<string, any>>({})

  const allNames = deck.groups.flatMap((g) => g.cards.map((c) => c.name))
  // One batched lookup per deck load; names are stable for a given parsed deck.
  const namesKey = allNames.join("|")

  useEffect(() => {
    let cancelled = false

    fetchCardsByNames(allNames)
      .then((byName) => {
        if (!cancelled) setCards(byName)
      })
      .catch(() => {}) // images are decoration — the panel works without them

    return () => {
      cancelled = true
    }
  }, [namesKey])

  return (
    <div className="flex h-full min-h-0 flex-col">
      {props.tally && <GuardrailRail tally={props.tally} />}

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-2">
        {deck.groups.map((group) => (
          <div key={group.name} className="mb-3">
            <div className="sticky top-0 z-10 bg-background/95 py--1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {group.name} ({group.cards.reduce((n, c) => n + c.qty, 0)})
            </div>
            <ul>
              {group.cards.map((card) => {
                const status = statuses[card.name]
                const image = scryImage(cards[card.name.toLowerCase()])

                const row = (
                  <li key={card.name} className="flex items-baseline gap-2 rounded px-1 py-0.5 text-sm hover:bg-accent">
                    <span className="w-6 shrink-0 text-right text-xs text-muted-foreground">{card.qty}x</span>
                    <span className="truncate">{card.name}</span>
                    {status && (
                      <span className={`ml-auto shrink-0 text-[10px] ${STATUS_STYLE[status.status]}`}>
                        {status.status}
                        {status.proxyCandidate ? ' 💰' : ''}
                      </span>
                    )}
                  </li>
                )

                if (!image) return row
                return (
                  <HoverCard key={card.name} openDelay={300} closeDelay={50}>
                    <HoverCardTrigger asChild>{row}</HoverCardTrigger>
                    <HoverCardContent side="right" className="w-56 p-1">
                      <img src={image} alt={card.name} className="w-full rounded-md" loading="lazy" />
                    </HoverCardContent>
                  </HoverCard>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
