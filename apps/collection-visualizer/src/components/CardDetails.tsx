import type { Baseline, CardTile as Tile, Currency } from "~/lib/types";
import { tileValue, unitDelta } from "~/lib/pricing";
import { formatMoney, formatDelta } from "~/lib/format";
import { groupTotals, variantsWorstFirst } from "~/lib/stacks";

interface CardDetailsProps {
  tile: Tile;
  currency: Currency;
  baseline: Baseline;
  /** Sidebar variant: also render the oracle text. */
  full?: boolean;
  /** When more than one is given, render a strip of these printings below the details — highlighting
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

  return (
    <div className="space-y-2">
      <div className="relative aspect-[488/680] w-full overflow-hidden rounded-lg bg-muted">
        {img ? (
          <img src={img} alt={tile.name} className="absolute inset-0 h-full w-full object-contain" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-sm text-muted-foreground">
            {tile.name}
          </div>
        )}
      </div>
      {showStrip && (
        <div>
          <div className="mb-1.5 text-xs text-muted-foreground">
            {variants.length} printings · total {formatMoney(groupTotals(variants, currency).value, currency)}
          </div>
          <VariantStrip
            variants={showStrip}
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
        {tile.setName} · {tile.collectorNumber} · {tile.rarity}
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
  );
}

interface VariantStripProps {
  variants: Tile[];
  activeKey: string;
  onHover?: (key: string) => void;
  onSelect?: (key: string) => void;
}

/** A plain horizontal strip of a card's printings (ordered worst → best), wrapping as needed. No
 *  rotation or zoom — hovering a printing just highlights it and (via onHover) previews it in the
 *  details above; clicking pins it. */
function VariantStrip(props: VariantStripProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {props.variants.map((v) => {
        const active = v.key === props.activeKey;
        return (
          <button
            key={v.key}
            onMouseEnter={() => props.onHover?.(v.key)}
            onClick={() => props.onSelect?.(v.key)}
            title={`${v.setName} #${v.collectorNumber}`}
            className={`relative aspect-[488/680] w-[42px] shrink-0 cursor-pointer overflow-hidden rounded border bg-muted ${active ? "border-primary ring-2 ring-primary" : "border-border"}`}
          >
            {v.enriched.imageSmall && (
              <img src={v.enriched.imageSmall} alt={v.name} className="absolute inset-0 h-full w-full object-contain" />
            )}
            {v.finish !== "normal" && (
              <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-amber-400" />
            )}
          </button>
        );
      })}
    </div>
  );
}
