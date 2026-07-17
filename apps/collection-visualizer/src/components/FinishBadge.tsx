import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import type { Finish } from "~/lib/types";
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
