import { useState } from "react";
import { Maximize2 } from "lucide-react";
import type { Baseline, CardTile as Tile, Currency } from "~/lib/types";
import { effectivePrice, tileValue, unitDelta } from "~/lib/pricing";
import { formatMoney, formatDelta } from "~/lib/format";
import { groupTotals, variantsWorstFirst } from "~/lib/stacks";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { ImageModal } from "./ImageModal";

interface CardDetailsProps {
  tile: Tile;
  currency: Currency;
  baseline: Baseline;
  /** Sidebar variant: also render the oracle text. */
  full?: boolean;
  /** When more than one is given, render a strip of these printings below the image — highlighting
   *  `tile` (the printing shown) and letting the user hover/click another. */
  variants?: Tile[];
  onHoverVariant?: (key: string) => void;
  onSelectVariant?: (key: string) => void;
}

export function CardDetails(props: CardDetailsProps) {
  const { tile, currency, baseline } = props;
  const value = tileValue(tile, currency);
  const delta = unitDelta(tile, currency, baseline);
  const img = tile.enriched.imageNormal ?? tile.enriched.imageSmall;

  const variants = props.variants ?? [];
  const showStrip = variants.length > 1 ? variantsWorstFirst(variants, currency) : null;

  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="relative mx-auto w-2/3">
          <div className="relative aspect-[488/680] w-full overflow-hidden rounded-lg bg-muted">
            {img ? (
              <img src={img} alt={tile.name} className="absolute inset-0 h-full w-full object-contain" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-sm text-muted-foreground">
                {tile.name}
              </div>
            )}
          </div>
          {img && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setExpanded(true)}
                  aria-label="Expand image"
                  className="absolute right-1.5 top-1.5 flex size-7 cursor-pointer items-center justify-center rounded-md bg-black/60 text-white transition hover:bg-black/80"
                >
                  <Maximize2 className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Expand image</TooltipContent>
            </Tooltip>
          )}
        </div>

        {showStrip && (
          <div>
            <div className="mb-2 text-xs text-muted-foreground">
              {variants.length} printings · total {formatMoney(groupTotals(variants, currency).value, currency)}
            </div>
            <VariantStrip
              variants={showStrip}
              currency={currency}
              activeKey={tile.key}
              onHover={props.onHoverVariant}
              onSelect={props.onSelectVariant}
            />
          </div>
        )}

        <div>
          <div className="font-semibold leading-tight">{tile.name}</div>
          {tile.enriched.typeLine && <div className="text-xs text-muted-foreground">{tile.enriched.typeLine}</div>}
        </div>
        <div className="text-xs text-muted-foreground">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-default">{tile.setCode.toUpperCase()}</span>
            </TooltipTrigger>
            <TooltipContent>{tile.setName}</TooltipContent>
          </Tooltip>
          {" "}· #{tile.collectorNumber} · {tile.rarity}
          {tile.finish !== "normal" && ` · ${tile.finish}`}
          {tile.quantity > 1 && ` · ×${tile.quantity}`}
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-lg font-semibold">{formatMoney(value, currency)}</span>
          {delta && (
            <span className={delta.value < 0 ? "text-sm text-red-400" : "text-sm text-emerald-400"}>
              {delta.value < 0 ? "▼" : "▲"} {formatDelta(delta.value, delta.currency)}
            </span>
          )}
        </div>
        {props.full && tile.enriched.oracleText && (
          <p className="border-t pt-2 text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground">
            {tile.enriched.oracleText}
          </p>
        )}
      </div>

      {expanded && img && <ImageModal src={img} alt={tile.name} onClose={() => setExpanded(false)} />}
    </>
  );
}

interface VariantStripProps {
  variants: Tile[];
  currency: Currency;
  activeKey: string;
  onHover?: (key: string) => void;
  onSelect?: (key: string) => void;
}

/** A strip of a card's printings (ordered worst → best), wrapping as needed. Each shows its price so
 *  the strip reads as a comparison; the active printing is highlighted. Hovering previews it (via
 *  onHover) and clicking pins it. */
function VariantStrip(props: VariantStripProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {props.variants.map((v) => {
        const active = v.key === props.activeKey;
        const price = effectivePrice(v.prices, props.currency, v.finish);
        const label = `${v.setName} #${v.collectorNumber}${v.finish !== "normal" ? ` · ${v.finish}` : ""}${v.quantity > 1 ? ` ×${v.quantity}` : ""}`;
        return (
          <Tooltip key={v.key}>
            <TooltipTrigger asChild>
              <button
                onMouseEnter={() => props.onHover?.(v.key)}
                onClick={() => props.onSelect?.(v.key)}
                className="flex w-14 shrink-0 cursor-pointer flex-col items-center"
              >
                <div
                  className={`relative aspect-[488/680] w-full overflow-hidden rounded border bg-muted ${active ? "border-primary ring-2 ring-primary" : "border-border"}`}
                >
                  {v.enriched.imageSmall && (
                    <img src={v.enriched.imageSmall} alt={v.name} className="absolute inset-0 h-full w-full object-contain" />
                  )}
                  {v.finish !== "normal" && (
                    <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-amber-400" />
                  )}
                </div>
                <div
                  className={`mt-0.5 w-full truncate text-center text-[10px] leading-tight ${active ? "font-medium text-foreground" : "text-muted-foreground"}`}
                >
                  {formatMoney(price, props.currency)}
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
