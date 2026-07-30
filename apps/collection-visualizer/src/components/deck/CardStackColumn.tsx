import type { ReactNode } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card'

export function scryImage(card: any): string | null {
  return card?.image_uris?.normal ?? card?.card_faces?.[0]?.image_uris?.normal ?? null
}

export interface StackCard {
  name: string
  /** Chips rendered on the card's top-right corner (qty, status). */
  overlay?: ReactNode
  /** Grayscale + faded — cut cards. */
  dim?: boolean
}

interface CardStackColumnProps {
  title: string
  count: number
  cards: StackCard[]
  /** Scryfall lookup keyed by lowercased name (fetchCardsByNames result). */
  images: Record<string, any>
  /** Extra classes for the header text (e.g. a pile tint). */
  headerClassName?: string
  /** Stick the header to the top of the nearest scrollport (board view). */
  stickyHeader?: boolean
}

/** One deck-builder column: a title and card images stacked so each card's printed name bar
 *  stays visible. Card aspect is 488:680 (≈139% of width tall); -125% leaves a ~14% band. */
export function CardStackColumn(props: CardStackColumnProps) {
  return (
    <div className="w-44 shrink-0">
      <div
        className={`${
          props.stickyHeader ? 'sticky top-0 z-20 -mt-3 bg-background pb-1 pt-3' : 'pb-1'
        } text-xs font-semibold uppercase tracking-wide text-muted-foreground ${props.headerClassName ?? ''}`}
      >
        {props.title} ({props.count})
      </div>

      <div className="[&>*+*]:mt-[-125%]">
        {props.cards.map((card) => {
          const image = scryImage(props.images[card.name.toLowerCase()])

          return (
            <HoverCard key={card.name} openDelay={250} closeDelay={50}>
              <HoverCardTrigger asChild>
                <div className={`relative transition hover:z-10 hover:-translate-y-1 ${card.dim ? 'opacity-60 grayscale' : ''}`}>
                  {image ? (
                    <img src={image} alt={card.name} loading="lazy" className="aspect-[488/680] w-full rounded-lg shadow-sm" />
                  ) : (
                    <div className="flex aspect-[488/680] w-full items-start justify-center rounded-lg border bg-muted p-2 text-center text-xs">
                      {card.name}
                    </div>
                  )}
                  {card.overlay && <span className="absolute right-1 top-1 flex gap-1">{card.overlay}</span>}
                </div>
              </HoverCardTrigger>
              {image && (
                <HoverCardContent side="right" className="w-64 p-1">
                  <img src={image} alt={card.name} className="w-full rounded-md" loading="lazy" />
                </HoverCardContent>
              )}
            </HoverCard>
          )
        })}
      </div>
    </div>
  )
}
