import { forwardRef, type ComponentProps } from "react";
import { cardImage, type CardView } from "../model/cards";
import type { CardState } from "./layout";
import { CARD_ASPECT, CARD_RADIUS, STATE_PILL, STATE_RING } from "./tokens";

interface DeckCardProps extends Omit<ComponentProps<"div">, "onClick"> {
  name: string;
  qty: number;
  state: CardState;
  card: CardView | undefined;
  /** Pixels, or a CSS length such as "100%" when a grid column sets the size. */
  width: number | string;
  selected?: boolean;
  /** Faded because a tag filter is active and this card lacks the tag. */
  muted?: boolean;
  /** Held up as if hovered — while its preview or its popover is open, so it does not drop the
   *  moment the pointer crosses into them. */
  lifted?: boolean;
  onClick?: () => void;
}

/**
 * One card on the board. Resolved cards are their Scryfall image; an unresolved name renders as a
 * grey tile that says so, never as nothing. Staged state shows as a ring and a small pill — an
 * outgoing card keeps its full colour; the rose ring and "out" pill are the whole signal.
 */
export const DeckCard = forwardRef<HTMLDivElement, DeckCardProps>(function DeckCard(props, ref) {
  const { name, qty, state, card, width, selected, muted, lifted, onClick, className, style, ...rest } = props;
  const src = cardImage(card, "normal");
  const ring = state === "current" ? (selected ? "ring-2 ring-primary" : "") : STATE_RING[state];
  const pill = state === "current" ? null : STATE_PILL[state];

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      data-card={name}
      style={{ width, ...style }}
      className={`group relative shrink-0 cursor-pointer select-none outline-none transition-[opacity,translate,box-shadow] duration-150 hover:-translate-y-1.5 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring ${lifted ? "-translate-y-1.5 shadow-xl" : ""} ${CARD_ASPECT} ${CARD_RADIUS} ${ring} ${muted ? "opacity-30" : ""} ${className ?? ""}`}
      {...rest}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          draggable={false}
          className={`block h-full w-full object-cover ${CARD_RADIUS} bg-muted`}
        />
      ) : (
        <div
          className={`flex h-full w-full flex-col justify-between border border-dashed border-muted-foreground/40 bg-muted/60 p-2 ${CARD_RADIUS}`}
        >
          <span className="text-[13px] leading-tight font-medium">{name}</span>
          <span className="text-[11px] leading-tight text-muted-foreground">
            {card ? "no image" : "Not found on Scryfall — open to fix"}
          </span>
        </div>
      )}
      {qty > 1 && (
        <span className="absolute right-1.5 bottom-1.5 rounded-md bg-black/75 px-1.5 py-0.5 text-[11px] font-semibold text-white tabular-nums">
          ×{qty}
        </span>
      )}
      {pill && (
        <span
          className={`absolute top-1.5 left-1.5 rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${pill.className}`}
        >
          {pill.text}
        </span>
      )}
    </div>
  );
});
