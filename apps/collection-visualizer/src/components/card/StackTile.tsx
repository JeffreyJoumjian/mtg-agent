import { memo, useState, type CSSProperties } from "react";
import type { Baseline, CardTile as Tile, Currency } from "~/lib/types";
import type { CardPin } from "~/lib/state/pins";
import { groupTotals, type NameGroup } from "~/lib/card/stacks";
import { totals } from "~/lib/card/pricing";
import { facesOf, cardImage } from "~/lib/card/faces";
import { manaToShow } from "~/lib/card/mana";
import { useHoverPrefetch } from "~/lib/card/image-prefetch";
import { TileFooter } from "./TileFooter";
import { FlipButton, FlipImage } from "./Flip";
import { FoilCard } from "./FoilCard";

interface StackTileProps {
  group: NameGroup;
  /** The stack's face (pinned or picked by the rule). */
  rep: Tile;
  currency: Currency;
  baseline: Baseline;
  selected?: boolean;
  /** This card's pin, if any. The whole object rather than just its face: pinning is what resets the
   *  local flip, and the face alone can't signal that (unpinned -> pinned-front is `undefined -> 0`,
   *  which looks like no change). A pin action always produces a new object. */
  pin?: CardPin;
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
  // Local flips are an offset on top of the pinned face, so pinning has to clear them — otherwise a
  // tile flipped in the grid lands one face off from whatever was just pinned. Adjusting state
  // during render (rather than in an effect) so the tile never paints the wrong face first.
  const [flips, setFlips] = useState(0);
  const [seenPin, setSeenPin] = useState(props.pin);
  if (seenPin !== props.pin) {
    setSeenPin(props.pin);
    setFlips(0);
  }
  const rotations = (props.pin?.face ?? 0) + flips;
  const single = printings === 1;
  const prefetch = useHoverPrefetch(rep);
  // Name, mana, and face badge all follow the shown face; lands show the mana they produce.
  const face = repTwoSided ? repFaces[rotations % 2] : null;
  const name = face ? face.name : rep.name;
  const manaCost = manaToShow(face ? face.manaCost : rep.enriched.manaCost, rep.enriched.producedMana);

  const renderFace = (v: Tile, isRep: boolean) => {
    if (isRep && repTwoSided) {
      return (
        <FlipImage
          front={cardImage(repFaces[0], "normal")}
          back={cardImage(repFaces[1], "normal")}
          rotations={rotations}
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

  // ×quantity rides on the face card itself, above the foil layers (z-1/z-2) so the shimmer never
  // blends into it. There's no FOIL badge — the shimmer says that.
  const badges = quantity > 1 && (
    <span className="absolute bottom-1 left-1/2 z-10 -translate-x-1/2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white">
      ×{quantity}
    </span>
  );

  return (
    <div
      data-card
      onClick={() => props.onSelect(rep.key, rotations % 2 === 1)}
      {...prefetch}
      className={`group flex cursor-pointer flex-col rounded-lg bg-card p-1.5 transition hover:bg-accent ${props.selected ? "ring-2 ring-primary" : ""}`}
    >
      {/* Card-aspect box keeps the grid's deterministic row height. A lone printing fills the tile like
          the non-grouped view; multiples fan into a cascade of up to 3 of the stack's printings. */}
      <div className="relative aspect-[488/680] w-full">
        {single ? (
          <FoilCard
            foil={rep.finish !== "normal"}
            etched={rep.finish === "etched"}
            className="absolute inset-0 overflow-hidden rounded bg-muted"
          >
            {renderFace(rep, true)}
            {badges}
          </FoilCard>
        ) : (
          shown.map((v, i) => (
            <div
              key={v.key}
              style={tileCardStyle(i)}
              className="absolute inset-0 overflow-hidden rounded-md border border-black/40 bg-muted shadow-md"
            >
              {/* Only the face card gets the foil treatment, and without tilt: this slot already
                  carries the cascade's own transform, and tilting inside it would clip on the
                  parent's rounded corners. */}
              {i === 0 ? (
                <FoilCard
                  foil={v.finish !== "normal"}
                  etched={v.finish === "etched"}
                  tilt={false}
                  className="absolute inset-0"
                >
                  {renderFace(v, true)}
                </FoilCard>
              ) : (
                renderFace(v, false)
              )}
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
        faceBack={repTwoSided ? rotations % 2 === 1 : undefined}
        manaCost={manaCost}
        typeLine={rep.enriched.typeLine}
        setCode={rep.setCode}
        setName={rep.setName}
        collectorNumber={rep.collectorNumber}
        rarity={rep.rarity}
        finish={rep.finish}
        value={value}
        delta={{ value: delta, currency: deltaCurrency }}
        currency={currency}
      />
    </div>
  );
});
