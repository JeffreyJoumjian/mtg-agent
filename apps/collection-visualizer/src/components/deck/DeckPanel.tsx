import { useEffect, useState } from 'react'
import type { CardStatus, DeckStatus, ParsedDeck } from '~/lib/deck/parse'
import type { TallyInput } from '~/lib/deck/chat-events'
import type { DeckViewMode } from '~/lib/state/settings'
import { fetchCardsByNames } from '~/lib/data/scryfall'
import { GuardrailRail } from './GuardrailRail'
import { CardStackColumn, scryImage } from './CardStackColumn'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card'

const STATUS_STYLE: Record<DeckStatus, string> = {
  HAVE: 'text-muted-foreground',
  BUY: 'text-amber-500',
  PROXY: 'text-violet-400',
  CONSIDERING: 'text-sky-400',
  CUT: 'text-muted-foreground line-through',
}

/** Board-view chip colors — on top of card art, so they need solid backgrounds. */
const STATUS_CHIP: Record<DeckStatus, string> = {
  HAVE: 'bg-black/60 text-white',
  BUY: 'bg-amber-500 text-black',
  PROXY: 'bg-violet-500 text-white',
  CONSIDERING: 'bg-sky-500 text-black',
  CUT: 'bg-black/60 text-white line-through',
}

interface DeckPanelProps {
  deck: ParsedDeck
  statuses: Record<string, CardStatus>
  tally: TallyInput | null
  view: DeckViewMode
}

export function DeckPanel(props: DeckPanelProps) {
  const { deck, statuses, view } = props
  const [cards, setCards] = useState<Record<string, any>>({})

  const allNames = deck.groups.flatMap((g) => g.cards.map((c) => c.name))
  // One batched lookup per deck load; names are stable for a given parsed deck.
  const namesKey = allNames.join('|')

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
      {view === 'board' ? (
        <BoardView deck={deck} statuses={statuses} cards={cards} />
      ) : (
        <ListView deck={deck} statuses={statuses} cards={cards} />
      )}
    </div>
  )
}

interface ViewProps {
  deck: ParsedDeck
  statuses: Record<string, CardStatus>
  cards: Record<string, any>
}

/** Deck-builder board: one column per category, card images stacked so the printed name bar of
 *  each card stays visible. Scrolls both ways; column headers stick to the top edge. */
function BoardView(props: ViewProps) {
  const { deck, statuses, cards } = props

  return (
    <div className="min-h-0 flex-1 overflow-auto">
      <div className="flex items-start gap-3 p-3">
        {deck.groups.map((group) => (
          <CardStackColumn
            key={group.name}
            title={group.name}
            count={group.cards.reduce((n, c) => n + c.qty, 0)}
            images={cards}
            stickyHeader
            cards={group.cards.map((card) => {
              const status = statuses[card.name]
              return {
                name: card.name,
                overlay: (
                  <>
                    {card.qty > 1 && (
                      <span className="rounded bg-black/60 px-1 text-[10px] font-semibold text-white">{card.qty}x</span>
                    )}
                    {status && status.status !== 'HAVE' && (
                      <span className={`rounded px-1 text-[10px] font-semibold ${STATUS_CHIP[status.status]}`}>
                        {status.status}
                        {status.proxyCandidate ? ' 💰' : ''}
                      </span>
                    )}
                  </>
                ),
              }
            })}
          />
        ))}
      </div>
    </div>
  )
}

/** Compact text rows. Headers are full-bleed and opaque so rows disappear cleanly under them. */
function ListView(props: ViewProps) {
  const { deck, statuses, cards } = props

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      {deck.groups.map((group) => (
        <div key={group.name}>
          <div className="sticky top-0 z-10 border-b bg-background px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {group.name} ({group.cards.reduce((n, c) => n + c.qty, 0)})
          </div>
          <ul className="px-3 py-1">
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
  )
}
