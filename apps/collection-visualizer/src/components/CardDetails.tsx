import { useState } from "react";
import { Maximize2, Pin } from "lucide-react";
import type { Baseline, CardTile as Tile, Currency } from "~/lib/types";
import { effectivePrice, tileValue, unitDelta } from "~/lib/pricing";
import { formatMoney, formatDelta } from "~/lib/format";
import { variantsBestFirst } from "~/lib/stacks";
import { facesOf, cardImage } from "~/lib/faces";
import { manaToShow } from "~/lib/mana";
import { rarityStyle } from "~/lib/rarity";
import { imageFilename } from "~/lib/download";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { ScrollArea } from "~/components/ui/scroll-area";
import { ManaCost } from "./ManaCost";
import { FaceBadge } from "./FaceBadge";
import { SetIcon } from "./SetIcon";
import { RarityBadge } from "./RarityBadge";
import { FinishBadge } from "./FinishBadge";
import { FlipImage } from "./FlipImage";
import { FlipButton } from "./FlipButton";
import { FoilCard } from "./FoilCard";
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
  /** `key` of the printing pinned to the tile, if any — marked in the strip. */
  pinnedKey?: string;
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

  // Name, type, oracle, and mana all follow the shown face, so a MDFC's back reads as its own card
  // instead of the joined "Front // Back" blob.
  const displayName = activeFace ? activeFace.name : tile.name;
  const typeLine = activeFace ? activeFace.typeLine : tile.enriched.typeLine;
  const oracleText = activeFace ? activeFace.oracleText : tile.enriched.oracleText;
  const manaCost = manaToShow(activeFace ? activeFace.manaCost : tile.enriched.manaCost, tile.enriched.producedMana);

  const variants = props.variants ?? [];
  const showStrip = variants.length > 1 ? variantsBestFirst(variants, currency) : null;

  const [expanded, setExpanded] = useState(false);
  // Expand's tooltip is controlled so it can be forced shut while the lightbox is open. It has to
  // be: this button opens the lightbox, and the drawer traps focus — so the button keeps focus the
  // whole time the lightbox is up, and Radix opens tooltips on focus. Left alone, its tooltip
  // surfaces over the lightbox whenever anything re-triggers that (clicking Flip does).
  const [expandTip, setExpandTip] = useState(false);

  const preview = (
    <>
      <FoilCard
        foil={tile.finish !== "normal"}
        etched={tile.finish === "etched"}
        className="relative aspect-[488/680] w-full overflow-hidden rounded-lg bg-muted"
      >
        {twoSided ? (
          <FlipImage front={front} back={back} rotations={rotations} alt={tile.name} />
        ) : shownImg ? (
          <img src={shownImg} alt={tile.name} className="absolute inset-0 h-full w-full object-contain" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-sm text-muted-foreground">
            {tile.name}
          </div>
        )}
      </FoilCard>
      {shownImg && (
        <Tooltip open={expandTip && !expanded} onOpenChange={setExpandTip}>
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
      {twoSided && <FlipButton onFlip={flip} className="absolute left-1.5 top-1.5" />}
    </>
  );

  return (
    <>
      <div className="space-y-2">
        {showStrip ? (
          // Cards with printings: image on the left, variants in a vertical scrolling column on the
          // right, filling the space the centered image would otherwise waste.
          <div className="flex gap-3">
            <div className="relative min-w-0 flex-1">{preview}</div>
            <div className="relative w-20 shrink-0">
              <div className="absolute inset-0 flex flex-col">
                <div className="mb-1.5 shrink-0 text-xs text-muted-foreground">{variants.length} printings</div>
                <ScrollArea type="always" className="min-h-0 flex-1">
                  <div className="pr-2.5">
                    <VariantStrip
                      variants={showStrip}
                      currency={currency}
                      activeKey={tile.key}
                      pinnedKey={props.pinnedKey}
                      onHover={props.onHoverVariant}
                      onSelect={props.onSelectVariant}
                    />
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative mx-auto w-3/4">{preview}</div>
        )}

        <div className="space-y-0.5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1.5">
              {twoSided && <FaceBadge back={flipped} className="text-muted-foreground" />}
              <div className="font-semibold leading-snug">{displayName}</div>
            </div>
            <span className="mt-1">
              <ManaCost cost={manaCost} size="size-3.5" />
            </span>
          </div>
          {typeLine && <div className="text-sm text-muted-foreground">{typeLine}</div>}
          <div className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex min-w-0 cursor-default items-center gap-1">
                  <SetIcon setCode={tile.setCode} className={rarityStyle(tile.rarity).icon} />
                  <span className="truncate">{tile.setCode.toUpperCase()}</span>
                </span>
              </TooltipTrigger>
              <TooltipContent>{tile.setName}</TooltipContent>
            </Tooltip>
            <span className="shrink-0">· #{tile.collectorNumber}</span>
            <RarityBadge rarity={tile.rarity} />
            <FinishBadge finish={tile.finish} />
            {tile.quantity > 1 && <span className="shrink-0">· ×{tile.quantity}</span>}
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
          finish={tile.finish}
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
  pinnedKey?: string;
  onHover?: (key: string) => void;
  onSelect?: (key: string) => void;
}

/** A vertical column of a card's printings (most important first), scrolling within its container.
 *  Each shows its price so the column reads as a comparison; the printing being viewed is
 *  highlighted, and the one pinned to the tile (if any) is marked. Clicking switches the drawer to a
 *  printing — it doesn't pin it; that's the header's pin button. */
function VariantStrip(props: VariantStripProps) {
  return (
    <div className="flex flex-col gap-2">
      {props.variants.map((v) => {
        const active = v.key === props.activeKey;
        const pinned = v.key === props.pinnedKey;
        const price = effectivePrice(v.prices, props.currency, v.finish);
        const label = `${v.setName} #${v.collectorNumber}${v.finish !== "normal" ? ` · ${v.finish}` : ""}${v.quantity > 1 ? ` ×${v.quantity}` : ""}${pinned ? " · pinned to tile" : ""}`;
        return (
          <Tooltip key={v.key}>
            <TooltipTrigger asChild>
              <button
                onMouseEnter={() => props.onHover?.(v.key)}
                onClick={() => props.onSelect?.(v.key)}
                className="flex w-full cursor-pointer flex-col"
              >
                <div
                  className={`relative aspect-[488/680] w-full overflow-hidden rounded border bg-muted ${active ? "border-primary ring-2 ring-primary" : "border-border"}`}
                >
                  {v.enriched.imageSmall && (
                    <img
                      src={v.enriched.imageSmall}
                      alt={v.name}
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  )}
                  {v.finish !== "normal" && (
                    <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-amber-400" />
                  )}
                  {pinned && (
                    <span className="absolute left-0.5 top-0.5 flex size-3.5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Pin className="size-2" />
                    </span>
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
