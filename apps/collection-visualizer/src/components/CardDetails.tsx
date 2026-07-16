import { useState } from "react";
import { Maximize2 } from "lucide-react";
import type { Baseline, CardTile as Tile, Currency } from "~/lib/types";
import { effectivePrice, tileValue, unitDelta } from "~/lib/pricing";
import { formatMoney, formatDelta } from "~/lib/format";
import { groupTotals, variantsWorstFirst } from "~/lib/stacks";
import { facesOf, cardImage } from "~/lib/faces";
import { imageFilename } from "~/lib/download";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { ManaCost } from "./ManaCost";
import { FlipImage } from "./FlipImage";
import { FlipButton } from "./FlipButton";
import { DownloadButton } from "./DownloadButton";
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
  /** Controlled flip count — the drawer seeds this from the tile's shown face, then owns it. When
   *  omitted the flip is local (the list hover-card preview uses this). Even = front, odd = back. */
  rotations?: number;
  onFlip?: () => void;
}

export function CardDetails(props: CardDetailsProps) {
  const { tile, currency, baseline } = props;
  const value = tileValue(tile, currency);
  const delta = unitDelta(tile, currency, baseline);

  const faces = facesOf(tile);
  const twoSided = faces.length >= 2;
  const [localFlips, setLocalFlips] = useState(0);
  const rotations = props.rotations ?? localFlips;
  const flip = props.onFlip ?? (() => setLocalFlips((n) => n + 1));
  const flipped = rotations % 2 === 1;
  const activeFace = twoSided ? faces[flipped ? 1 : 0] : null;

  // The sidebar shows the crisp 'large' image; the modal preview and download use the best 'png'.
  const front = twoSided ? cardImage(faces[0], "large") : cardImage(tile.enriched, "large");
  const back = twoSided ? cardImage(faces[1], "large") : null;
  const shownImg = flipped ? back : front;

  const frontFull = twoSided ? cardImage(faces[0], "png") : cardImage(tile.enriched, "png");
  const backFull = twoSided ? cardImage(faces[1], "png") : null;
  const shownFull = flipped ? backFull : frontFull;
  const otherFull = flipped ? frontFull : backFull;
  const downloadName = imageFilename(activeFace ? activeFace.name || tile.name : tile.name);

  // The sidebar text follows the shown face so a MDFC's back reads cleanly (not the joined blob).
  const typeLine = activeFace ? activeFace.typeLine : tile.enriched.typeLine;
  const oracleText = activeFace ? activeFace.oracleText : tile.enriched.oracleText;
  const manaCost = activeFace ? activeFace.manaCost : tile.enriched.manaCost;

  const variants = props.variants ?? [];
  const showStrip = variants.length > 1 ? variantsWorstFirst(variants, currency) : null;

  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="relative mx-auto w-3/4">
          <div className="relative aspect-[488/680] w-full overflow-hidden rounded-lg bg-muted">
            {twoSided ? (
              <FlipImage front={front} back={back} rotations={rotations} alt={tile.name} />
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
                  className="absolute bottom-1.5 left-1.5 flex size-7 cursor-pointer items-center justify-center rounded-md bg-black/60 text-white transition hover:bg-black/80"
                >
                  <Maximize2 className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Expand image</TooltipContent>
            </Tooltip>
          )}
          {twoSided && (
            <FlipButton onFlip={flip} className="absolute left-1.5 top-1.5" />
          )}
          {shownFull && (
            <DownloadButton url={shownFull} filename={downloadName} className="absolute bottom-1.5 right-1.5" />
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
          <div className="flex items-start justify-between gap-2">
            <div className="font-semibold leading-snug">{tile.name}</div>
            <span className="mt-0.5">
              <ManaCost cost={manaCost} size="size-4" />
            </span>
          </div>
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

      {expanded && shownFull && (
        <ImageModal
          src={shownFull}
          back={twoSided ? otherFull : null}
          alt={tile.name}
          filename={downloadName}
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
