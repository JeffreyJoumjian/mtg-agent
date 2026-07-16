import { useState } from "react";
import { Maximize2 } from "lucide-react";
import type { Baseline, CardTile as Tile, Currency } from "~/lib/types";
import { effectivePrice, tileValue, unitDelta } from "~/lib/pricing";
import { formatMoney, formatDelta } from "~/lib/format";
import { groupTotals, variantsWorstFirst } from "~/lib/stacks";
import { facesOf, faceImage } from "~/lib/faces";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { FlipImage } from "./FlipImage";
import { FlipButton } from "./FlipButton";
import { ImageModal } from "./ImageModal";
import { OracleText } from "./OracleText";

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
  /** Controlled flip — the drawer seeds this from the tile's shown face, then owns it. When omitted
   *  the flip is local (the list hover-card preview uses this). */
  flipped?: boolean;
  onFlipChange?: (flipped: boolean) => void;
}

export function CardDetails(props: CardDetailsProps) {
  const { tile, currency, baseline } = props;
  const value = tileValue(tile, currency);
  const delta = unitDelta(tile, currency, baseline);

  const faces = facesOf(tile);
  const twoSided = faces.length >= 2;
  const [localFlipped, setLocalFlipped] = useState(false);
  const flipped = props.flipped ?? localFlipped;
  const setFlipped = props.onFlipChange ?? setLocalFlipped;
  const activeFace = twoSided ? faces[flipped ? 1 : 0] : null;

  const front = twoSided ? faceImage(faces[0], "normal") : tile.enriched.imageNormal ?? tile.enriched.imageSmall;
  const back = twoSided ? faceImage(faces[1], "normal") : null;
  const shownImg = flipped ? back : front;
  // The sidebar text follows the shown face so a MDFC's back reads cleanly (not the joined blob).
  const typeLine = activeFace ? activeFace.typeLine : tile.enriched.typeLine;
  const oracleText = activeFace ? activeFace.oracleText : tile.enriched.oracleText;

  const variants = props.variants ?? [];
  const showStrip = variants.length > 1 ? variantsWorstFirst(variants, currency) : null;

  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="relative mx-auto w-3/4">
          <div className="relative aspect-[488/680] w-full overflow-hidden rounded-lg bg-muted">
            {twoSided ? (
              <FlipImage front={front} back={back} flipped={flipped} alt={tile.name} />
            ) : shownImg ? (
              <img src={shownImg} alt={tile.name} className="absolute inset-0 h-full w-full object-contain" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-sm text-muted-foreground">
                {tile.name}
              </div>
            )}
          </div>
          {shownImg && (
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
          {twoSided && (
            <FlipButton onFlip={() => setFlipped(!flipped)} className="absolute bottom-1.5 left-1.5" />
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

        <div className="space-y-0.5">
          <div className="font-semibold leading-snug">{tile.name}</div>
          {typeLine && <div className="text-sm text-muted-foreground">{typeLine}</div>}
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
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-lg font-semibold">{formatMoney(value, currency)}</span>
          {delta && (
            <span className={delta.value < 0 ? "text-sm text-red-400" : "text-sm text-emerald-400"}>
              {delta.value < 0 ? "▼" : "▲"} {formatDelta(delta.value, delta.currency)}
            </span>
          )}
        </div>
        {props.full && oracleText && <OracleText text={oracleText} />}
      </div>

      {expanded && shownImg && (
        <ImageModal
          src={shownImg}
          back={twoSided ? (flipped ? front : back) : null}
          alt={tile.name}
          onClose={() => setExpanded(false)}
        />
      )}
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
