import type { Currency } from "~/lib/types";
import { formatMoney, formatDelta } from "~/lib/format";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { ManaCost } from "./ManaCost";
import { FaceBadge } from "./FaceBadge";

interface TileFooterProps {
  /** Name of the shown face (for a double-faced card) or the whole card. */
  name: string;
  /** For a double-faced card, which face is shown (renders a face badge). Undefined = single-faced. */
  faceBack?: boolean;
  /** Mana cost of the shown face, rendered as symbols on the line below the name. */
  manaCost: string;
  typeLine: string;
  /** Short set code (shown) + full set name (revealed on hover). */
  setCode: string;
  setName: string;
  collectorNumber: string;
  rarity: string;
  value: number | null;
  delta: { value: number; currency: Currency | string } | null;
  currency: Currency;
}

/** The text block under a card tile's image. Every line has a LOCKED height so CardGrid's
 *  deterministic row-height math (its FOOTER constant) stays exact — keep the two in sync. */
export function TileFooter(props: TileFooterProps) {
  return (
    <>
      <div className="flex h-4 mt-1 items-center w-full ">
        <ManaCost cost={props.manaCost} size="size-3" />
      </div>
      <div className="flex h-5 items-center gap-1">
        {props.faceBack !== undefined && <FaceBadge back={props.faceBack} className="text-muted-foreground" />}
        {/* Longer open delay on the name/type reveals so they don't flash while scanning the grid. */}
        <div className="min-w-0 flex-1 truncate text-sm leading-5">
          <Tooltip delayDuration={700}>
            <TooltipTrigger asChild>
              <span>{props.name}</span>
            </TooltipTrigger>
            <TooltipContent>{props.name}</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="h-4 min-w-0 truncate text-xs leading-4 text-muted-foreground">
        {props.typeLine && (
          <Tooltip delayDuration={700}>
            <TooltipTrigger asChild>
              <span>{props.typeLine}</span>
            </TooltipTrigger>
            <TooltipContent>{props.typeLine}</TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="h-4 min-w-0 truncate text-xs leading-4 text-muted-foreground">
        <Tooltip>
          <TooltipTrigger asChild>
            <span>{props.setCode.toUpperCase()}</span>
          </TooltipTrigger>
          <TooltipContent>{props.setName}</TooltipContent>
        </Tooltip>{" "}
        · #{props.collectorNumber} · {props.rarity}
      </div>
      <div className="flex h-6 items-baseline justify-between gap-1 leading-6">
        <span className="min-w-0 truncate font-semibold">{formatMoney(props.value, props.currency)}</span>
        {props.delta && (
          <span
            className={props.delta.value < 0 ? "shrink-0 text-xs text-red-400" : "shrink-0 text-xs text-emerald-400"}
          >
            {props.delta.value < 0 ? "▼" : "▲"} {formatDelta(props.delta.value, props.delta.currency)}
          </span>
        )}
      </div>
    </>
  );
}
