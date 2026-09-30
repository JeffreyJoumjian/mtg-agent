import { useSetAtom } from "jotai";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
import { ManaCost } from "~/components/symbols/Mana";
import { manaToShow } from "~/lib/card/mana";
import { cardImage } from "../../model/cards";
import { selectedCardAtom } from "../../state/atoms";
import { useCardView } from "../cards-context";
import { CARD_RADIUS } from "../../board/tokens";

interface CardChipProps {
  name: string;
}

/** A card name in chat: the name with its cost, the card on hover, the board highlight on click. */
export function CardChip(props: CardChipProps) {
  const card = useCardView(props.name);
  const select = useSetAtom(selectedCardAtom);
  const src = cardImage(card, "normal");

  return (
    <HoverCard openDelay={150} closeDelay={80}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          onClick={() => select(props.name)}
          className="inline-flex max-w-full items-center gap-1 rounded-md border border-border/70 bg-muted/60 px-1.5 py-px align-baseline text-[0.92em] font-medium leading-tight text-foreground hover:bg-accent"
        >
          <span className="truncate">{props.name}</span>
          {card && <ManaCost cost={manaToShow(card.manaCost.split(" // ")[0], card.producedMana)} size="size-3" />}
        </button>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="w-auto border-0 bg-transparent p-0 shadow-none">
        {src ? (
          <img src={src} alt={props.name} className={`w-[244px] ${CARD_RADIUS} shadow-xl`} />
        ) : (
          <div className="rounded-md border bg-popover px-3 py-2 text-[13px] text-muted-foreground">
            {card ? "No image" : "Looking up…"}
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
