import { rarityStyle } from "~/lib/rarity";
import { cn } from "~/lib/utils";

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
