import { useEffect, useState } from 'react'
import type { LiveState } from '~/lib/deck/live-state'
import { fetchCardsByNames } from '~/lib/data/scryfall'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card'

function scryImage(card: any): string | null {
  return card?.image_uris?.normal ?? card?.card_faces?.[0]?.image_uris?.normal ?? null
}

interface LiveBoardProps {
  state: LiveState
}

/** Read-only mirror of the terminal exercise: the debated batch big on top, then the piles. */
export function LiveBoard(props: LiveBoardProps) {
  const { state } = props
  const [cards, setCards] = useState<Record<string, any>>({})

  const allNames = [
    ...(state.batch?.cards.map((c) => c.name) ?? []),
    ...state.keep.flatMap((g) => g.cards),
    ...state.considering,
    ...state.pocket,
    ...state.cut,
  ]
  const namesKey = allNames.join('|')

  useEffect(() => {
    if (allNames.length === 0) return
    let cancelled = false

    fetchCardsByNames(allNames)
      .then((byName) => {
        if (!cancelled) setCards((prev) => ({ ...prev, ...byName }))
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [namesKey])

  const t = state.tally

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      {t && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b bg-card px-4 py-2 text-xs">
          <span className={`font-medium ${t.keeps > t.target ? 'text-amber-500' : ''}`}>keeps {t.keeps}/{t.target}</span>
          <span className="text-muted-foreground">cuts {t.cuts}</span>
          <span className="text-muted-foreground">pocket {t.pockets}</span>
          <span className={t.gcCeiling !== undefined && t.gameChangers > t.gcCeiling ? 'font-medium text-destructive' : ''}>
            GC {t.gameChangers}{t.gcCeiling !== undefined ? `/${t.gcCeiling}` : ''}
          </span>
          {t.manaSources !== undefined && <span className="text-muted-foreground">sources {t.manaSources}</span>}
          {state.note && <span className="ml-auto italic text-muted-foreground">{state.note}</span>}
        </div>
      )}
      {!t && state.note && <div className="border-b bg-card px-4 py-2 text-xs italic text-muted-foreground">{state.note}</div>}

      {state.batch && (
        <section className="border-b p-4">
          <h2 className="mb-2 text-sm font-semibold">
            On the table — batch {state.batch.batchNumber}
            {state.batch.totalBatches !== null && <span className="text-muted-foreground"> of {state.batch.totalBatches}</span>}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {state.batch.cards.map((card) => {
              const image = scryImage(cards[card.name.toLowerCase()])
              return (
                <div key={card.name} className="flex flex-col gap-1">
                  {image ? (
                    <img src={image} alt={card.name} loading="lazy" className="aspect-[488/680] w-full rounded-lg shadow" />
                  ) : (
                    <div className="flex aspect-[488/680] items-center justify-center rounded-lg border bg-muted p-2 text-center text-sm">
                      {card.name}
                    </div>
                  )}
                  {card.blurb && <span className="line-clamp-2 text-[11px] text-muted-foreground">{card.blurb}</span>}
                </div>
              )
            })}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-[2fr_1fr]">
        <section>
          <h2 className="mb-2 text-sm font-semibold">
            Keeping <span className="text-muted-foreground">({state.keep.reduce((n, g) => n + g.cards.length, 0)})</span>
          </h2>
          {state.keep.length === 0 && <p className="text-xs text-muted-foreground">Nothing locked in yet.</p>}
          <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
            {state.keep.map((group) => (
              <div key={group.name} className="mb-3 break-inside-avoid">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.name} ({group.cards.length})
                </div>
                <ul>
                  {group.cards.map((name) => (
                    <CardRow key={name} name={name} card={cards[name.toLowerCase()]} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-4">
          <PileList title="Considering" names={state.considering} cards={cards} tone="text-sky-400" />
          <PileList title="Pocket / subs" names={state.pocket} cards={cards} tone="text-violet-400" />
          <PileList title="Cut" names={state.cut} cards={cards} tone="text-muted-foreground" strike />
        </div>
      </div>
    </div>
  )
}

function CardRow(props: { name: string; card: any; strike?: boolean }) {
  const image = scryImage(props.card)
  const row = (
    <li className={`truncate rounded px-1 py-0.5 text-sm hover:bg-accent ${props.strike ? 'text-muted-foreground line-through' : ''}`}>
      {props.name}
    </li>
  )

  if (!image) return row
  return (
    <HoverCard openDelay={250} closeDelay={50}>
      <HoverCardTrigger asChild>{row}</HoverCardTrigger>
      <HoverCardContent side="left" className="w-56 p-1">
        <img src={image} alt={props.name} className="w-full rounded-md" loading="lazy" />
      </HoverCardContent>
    </HoverCard>
  )
}

function PileList(props: { title: string; names: string[]; cards: Record<string, any>; tone: string; strike?: boolean }) {
  return (
    <section>
      <h2 className={`mb-1 text-sm font-semibold ${props.tone}`}>
        {props.title} <span className="text-muted-foreground">({props.names.length})</span>
      </h2>
      {props.names.length === 0 ? (
        <p className="text-xs text-muted-foreground">Empty.</p>
      ) : (
        <ul>
          {props.names.map((name) => (
            <CardRow key={name} name={name} card={props.cards[name.toLowerCase()]} strike={props.strike} />
          ))}
        </ul>
      )}
    </section>
  )
}
