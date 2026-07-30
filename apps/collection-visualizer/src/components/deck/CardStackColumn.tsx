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
        {props.cards.map((card, i) => {
          const image = scryImage(props.images[card.name.toLowerCase()])
          // Showcase/full-art printings don't keep their name at the top of the card, so the
          // visible band of a stacked card can be an anonymous art sliver. Stamp our own name
          // chip on every card that's partially hidden; the fully-visible last card needs none.
          const buried = i < props.cards.length - 1

          return (
            <HoverCard key={card.name} openDelay={250} closeDelay={50}>
              <HoverCardTrigger asChild>
                <div className={`relative ${card.dim ? 'opacity-60 grayscale' : ''}`}>
                  {image ? (
                    <img src={image} alt={card.name} loading="lazy" className="aspect-[488/680] w-full rounded-lg bg-muted shadow-sm" />
                  ) : (
                    <div className="flex aspect-[488/680] w-full items-start justify-center rounded-lg border bg-muted p-2 text-center text-xs">
                      {card.name}
                    </div>
                  )}
                  {buried && image && (
                    <span className="absolute left-1 top-1 max-w-[70%] truncate rounded bg-black/70 px-1 text-[10px] font-medium text-white">
                      {card.name}
                    </span>
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
