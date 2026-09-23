import { useSetAtom } from "jotai";
import { cardImage } from "../../model/cards";
import { selectedCardAtom } from "../../state/atoms";
import { useCardView } from "../cards-context";
import { CARD_ASPECT, CARD_RADIUS } from "../../board/tokens";
import type { ShownCard } from "../events";

interface CardsGalleryProps {
  title?: string;
  cards: ShownCard[];
}

/** What `show_cards` renders: the cards themselves, with the agent's one-line note under each. */
export function CardsGallery(props: CardsGalleryProps) {
  return (
    <div>
      {props.title && <div className="mb-1.5 text-[13px] font-medium">{props.title}</div>}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {props.cards.map((c) => (
          <GalleryTile key={c.name} name={c.name} note={c.note} />
        ))}
      </div>
    </div>
  );
}

function GalleryTile(props: { name: string; note?: string }) {
  const card = useCardView(props.name);
  const select = useSetAtom(selectedCardAtom);
  const src = cardImage(card, "normal");

  return (
    <button type="button" onClick={() => select(props.name)} className="group text-left">
      {src ? (
        <img
          src={src}
          alt={props.name}
          loading="lazy"
          className={`w-full ${CARD_RADIUS} transition group-hover:brightness-110`}
        />
      ) : (
        <div
          className={`flex w-full items-center justify-center bg-muted p-2 text-center text-[12px] ${CARD_ASPECT} ${CARD_RADIUS}`}
        >
          {props.name}
        </div>
      )}
      {props.note && <p className="mt-1 text-[12px] leading-snug text-muted-foreground">{props.note}</p>}
    </button>
  );
}
