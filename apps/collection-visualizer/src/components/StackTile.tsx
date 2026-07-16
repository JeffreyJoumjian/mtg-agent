import { memo, useState, type CSSProperties } from "react";
import type { Baseline, CardTile as Tile, Currency } from "~/lib/types";
import { groupTotals, type NameGroup } from "~/lib/stacks";
import { totals } from "~/lib/pricing";
import { facesOf, cardImage } from "~/lib/faces";
import { manaToShow } from "~/lib/mana";
import { useHoverPrefetch } from "~/lib/image-prefetch";
import { TileFooter } from "./TileFooter";
import { FlipImage } from "./FlipImage";
import { FlipButton } from "./FlipButton";

interface StackTileProps {
  group: NameGroup;
  /** The stack's face (pinned or picked by the rule). */
  rep: Tile;
  currency: Currency;
  baseline: Baseline;
  selected?: boolean;
  onSelect: (key: string, flipped?: boolean) => void;
}

/** Static cascade for a card in the TILE — a held-hand look, pivoting from the bottom, kept inside
 *  the cell (scale < 1). */
function tileCardStyle(index: number): CSSProperties {
  return {
    transform: `translateX(${index * 6}%) translateY(${-index * 11}%) rotate(${index * 2}deg) scale(0.82)`,
    transformOrigin: "bottom center",
    zIndex: 20 - index,
  };
}

// Memoized so the tile (with its Radix tooltips) doesn't re-render on every grid geometry change —
// e.g. each frame of the sidebar width animation. Props are referentially stable between those.
export const StackTile = memo(function StackTile(props: StackTileProps) {
  const { group, rep, currency, baseline } = props;
  const { quantity } = groupTotals(group.variants, currency);
  const { value, delta, deltaCurrency } = totals(group.variants, currency, baseline);

  const others = group.variants.filter((v) => v.key !== rep.key);
  const shown = [rep, ...others].slice(0, 3); // up to 3 visible in the tile
  const printings = group.variants.length;

  // Only the face-up card (the rep) flips; the cascade behind it stays put.
  const repFaces = facesOf(rep);
  const repTwoSided = repFaces.length >= 2;
  const [flips, setFlips] = useState(0);
  const single = printings === 1;
  const prefetch = useHoverPrefetch(rep);
  // Name, mana, and face badge all follow the shown face; lands show the mana they produce.
  const face = repTwoSided ? repFaces[flips % 2] : null;
  const name = face ? face.name : rep.name;
  const manaCost = manaToShow(face ? face.manaCost : rep.enriched.manaCost, rep.enriched.producedMana);

  const renderFace = (v: Tile, isRep: boolean) => {
    if (isRep && repTwoSided) {
      return (
        <FlipImage
          front={cardImage(repFaces[0], "normal")}
          back={cardImage(repFaces[1], "normal")}
          rotations={flips}
          alt={v.name}
          loading="lazy"
        />
      );
    }
    const src = v.enriched.imageNormal ?? v.enriched.imageSmall;
    if (src)
      return <img src={src} alt={v.name} loading="lazy" className="absolute inset-0 h-full w-full object-contain" />;
    return (
      <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-xs text-muted-foreground">
        {v.name}
      </div>
    );
  };

  // ×quantity (bottom-center) and the finish badge (bottom-left) ride on the face card itself.
  const badges = (
    <>
      {quantity > 1 && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white">
          ×{quantity}
        </span>
      )}
      {rep.finish !== "normal" && (
        <span className="absolute bottom-1 left-1 rounded bg-gradient-to-r from-fuchsia-500 to-amber-400 px-1 py-0.5 text-[10px] font-bold text-black">
          {rep.finish === "etched" ? "ETCH" : "FOIL"}
        </span>
      )}
    </>
  );

  return (
    <div
      data-card
      onClick={() => props.onSelect(rep.key, flips % 2 === 1)}
      {...prefetch}
      className={`group flex cursor-pointer flex-col rounded-lg bg-card p-1.5 transition hover:bg-accent ${props.selected ? "ring-2 ring-primary" : ""}`}
    >
      {/* Card-aspect box keeps the grid's deterministic row height. A lone printing fills the tile like
          the non-grouped view; multiples fan into a cascade of up to 3 of the stack's printings. */}
      <div className="relative aspect-[488/680] w-full">
        {single ? (
          <div className="absolute inset-0 overflow-hidden rounded bg-muted">
            {renderFace(rep, true)}
            {badges}
          </div>
        ) : (
          shown.map((v, i) => (
            <div
              key={v.key}
              style={tileCardStyle(i)}
              className="absolute inset-0 overflow-hidden rounded-md border border-black/40 bg-muted shadow-md"
            >
              {renderFace(v, i === 0)}
              {i === 0 && badges}
            </div>
          ))
        )}
        {repTwoSided && (
          <FlipButton
            onFlip={() => setFlips((n) => n + 1)}
            className="absolute left-1 top-1 z-30 opacity-0 transition-opacity group-hover:opacity-100"
          />
        )}
      </div>

      <TileFooter
        name={name}
        faceBack={repTwoSided ? flips % 2 === 1 : undefined}
        manaCost={manaCost}
        typeLine={rep.enriched.typeLine}
        setCode={rep.setCode}
        setName={rep.setName}
        collectorNumber={rep.collectorNumber}
        rarity={rep.rarity}
        value={value}
        delta={{ value: delta, currency: deltaCurrency }}
        currency={currency}
      />
    </div>
  );
});
