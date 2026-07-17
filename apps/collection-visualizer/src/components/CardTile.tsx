import { memo, useState } from "react";
import type { Baseline, CardTile as Tile, Currency } from "~/lib/types";
import type { CardPin } from "~/lib/pins";
import { tileValue, unitDelta } from "~/lib/pricing";
import { facesOf, cardImage } from "~/lib/faces";
import { manaToShow } from "~/lib/mana";
import { useHoverPrefetch } from "~/lib/image-prefetch";
import { TileFooter } from "./TileFooter";
import { FlipImage } from "./FlipImage";
import { FlipButton } from "./FlipButton";
import { FoilCard } from "./FoilCard";

interface CardTileProps {
  tile: Tile;
  currency: Currency;
  baseline: Baseline;
  selected?: boolean;
  /** This card's pin, if any. The whole object rather than just its face: pinning is what resets the
   *  local flip, and the face alone can't signal that (unpinned -> pinned-front is `undefined -> 0`,
   *  which looks like no change). A pin action always produces a new object. */
  pin?: CardPin;
  onSelect?: (key: string, flipped?: boolean) => void;
}

// Memoized so the tile (with its Radix tooltips) doesn't re-render on every grid geometry change —
// e.g. each frame of the sidebar width animation. Props are referentially stable between those.
export const CardTile = memo(function CardTile(props: CardTileProps) {
  const { tile, currency, baseline } = props;
  const value = tileValue(tile, currency);
  const delta = unitDelta(tile, currency, baseline);

  const faces = facesOf(tile);
  const twoSided = faces.length >= 2;
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
  const prefetch = useHoverPrefetch(tile);
  // Use the higher-res 'normal' image — the 'small' one is only 146px wide and looks blurry at tile size.
  const front = twoSided ? cardImage(faces[0], "normal") : cardImage(tile.enriched, "normal");
  const back = twoSided ? cardImage(faces[1], "normal") : null;
  // Name, mana, and face badge all follow the shown face; lands show the mana they produce.
  const face = twoSided ? faces[rotations % 2] : null;
  const name = face ? face.name : tile.name;
  const manaCost = manaToShow(face ? face.manaCost : tile.enriched.manaCost, tile.enriched.producedMana);

  return (
    <div
      data-card
      onClick={() => props.onSelect?.(tile.key, rotations % 2 === 1)}
      {...prefetch}
      className={`group flex cursor-pointer flex-col rounded-lg bg-card p-1.5 transition hover:bg-accent ${props.selected ? "ring-2 ring-primary" : ""}`}
    >
      {/* Card-aspect box reserves height from width; object-contain never crops. The footer rows
          below have FIXED heights so CardGrid's deterministic row-height math stays exact. */}
      <FoilCard
        foil={tile.finish !== "normal"}
        etched={tile.finish === "etched"}
        className="relative aspect-[488/680] w-full overflow-hidden rounded bg-muted"
      >
        {twoSided ? (
          <FlipImage front={front} back={back} rotations={rotations} alt={tile.name} loading="lazy" />
        ) : front ? (
          <img src={front} alt={tile.name} loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-2 text-center text-xs text-muted-foreground">
            {tile.name}
          </div>
        )}
        {/* No FOIL badge: the shimmer says it. Badges sit above the foil layers (z-1/z-2) so the
            shimmer never blends into them. */}
        {tile.quantity > 1 && (
          <span className="absolute bottom-1 left-1/2 z-10 -translate-x-1/2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-white">
            ×{tile.quantity}
          </span>
        )}
        {twoSided && (
          <FlipButton
            onFlip={() => setFlips((n) => n + 1)}
            className="absolute left-1 top-1 z-10 opacity-0 transition-opacity group-hover:opacity-100"
          />
        )}
      </FoilCard>
      <TileFooter
        name={name}
        faceBack={twoSided ? rotations % 2 === 1 : undefined}
        manaCost={manaCost}
        typeLine={tile.enriched.typeLine}
        setCode={tile.setCode}
        setName={tile.setName}
        collectorNumber={tile.collectorNumber}
        rarity={tile.rarity}
        finish={tile.finish}
        value={value}
        delta={delta}
        currency={currency}
      />
    </div>
  );
});
