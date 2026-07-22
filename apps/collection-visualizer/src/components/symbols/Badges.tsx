import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import type { Finish } from "~/lib/types";
import { rarityStyle } from "~/lib/card/rarity";
import { cn } from "~/lib/utils";

interface FinishBadgeProps {
  finish: Finish;
  className?: string;
}

// The hues are the same spectrum the card's own foil shimmer uses (see `.foil` in app.css), so the
// badge and the effect it describes visibly agree. Etched gets the silvery pass instead of the
// rainbow, matching how etched foil actually looks — and how `.foil-etched` renders it.
const FINISH: Record<string, { letter: string; label: string; badge: string }> = {
  foil: {
    letter: "F",
    label: "Foil",
    badge:
      "bg-[linear-gradient(110deg,#ff7773_0%,#ffed5f_18%,#a8ff5f_36%,#83fff7_54%,#7894ff_72%,#d875ff_90%,#ff7773_100%)] text-black",
  },
  etched: {
    letter: "E",
    label: "Etched",
    badge: "bg-[linear-gradient(110deg,#ffffff_0%,#bed2e6_25%,#fff5dc_50%,#aabed2_75%,#ffffff_100%)] text-black",
  },
};

/** The printing's finish as a single-letter chip — rainbow F for foil, silvery E for etched. Renders
 *  nothing for a normal printing, since "not foil" isn't worth a badge. Unlike the rarity chip this
 *  keeps a tooltip: a lone F isn't self-explanatory the way "Mythic" is. The letter stays black —
 *  both gradients are bright throughout, so white would be unreadable. */
export function FinishBadge(props: FinishBadgeProps) {
  const finish = FINISH[props.finish];
  if (!finish) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          aria-label={finish.label}
          className={cn(
            "inline-flex size-3.5 shrink-0 cursor-default items-center justify-center rounded-[3px] text-[9px] font-medium leading-none text-black",
            finish.badge,
            props.className,
          )}
        >
          {finish.letter}
        </span>
      </TooltipTrigger>
      <TooltipContent>{finish.label}</TooltipContent>
    </Tooltip>
  );
}

interface RarityBadgeProps {
  rarity: string;
  className?: string;
}

/** The card's rarity as a metallic chip, echoing how a real card colors its set symbol. The shine is
 *  entirely in the rarity's gradient — deliberately no inset highlight or edge ring, which is what
 *  reads as embossed. Height is locked to 14px so it fits the tile's 16px meta row (which CardGrid's
 *  FOOTER math depends on) — only the width grows with the label. */
export function RarityBadge(props: RarityBadgeProps) {
  const style = rarityStyle(props.rarity);

  return (
    <span
      className={cn(
        "inline-flex size-3.5 shrink-0 cursor-default items-center justify-center rounded-[3px] text-[9px] font-medium leading-none tracking-wide",
        style.badge,
        props.className,
      )}
    >
      {style.letter}
    </span>
  );
}

interface FaceBadgeProps {
  /** Which of the two faces is shown (odd flip = back / face-down). */
  back: boolean;
  className?: string;
}

/** The double-faced indicator MTG prints on the card: a triangle pointing up for the face-up side and
 *  down for the face-down side, flipping as you turn the card over. */
export function FaceBadge(props: FaceBadgeProps) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden className={cn("size-3.5 shrink-0", props.className)}>
      {props.back ? <path d="M2.5 4.5 L9.5 4.5 L6 9.5 Z" /> : <path d="M6 2.5 L9.5 7.5 L2.5 7.5 Z" />}
    </svg>
  );
}
