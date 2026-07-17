/** How one rarity is rendered: the letter badge, and the color the set symbol takes. */
export interface RarityStyle {
  /** Single letter shown in the badge (`C`, `U`, `R`, `M`, …). */
  letter: string;
  /** Full rarity name, for the badge's tooltip / accessible label. */
  label: string;
  /** Badge gradient + text classes. */
  badge: string;
  /** Text color class for the set symbol, which inherits it via `fill: currentColor`. */
  icon: string;
}

// Real cards encode rarity in the set symbol's color, so badge and symbol share one palette here.
// `icon` is the base hue on its own, since a set symbol is flat.
//
// Each badge is lit by a radial highlight off its top-RIGHT corner, falling away through the rarity's
// tones: pale -> bright -> base -> deep. The spot sits right rather than left on purpose — the label
// is centered but the light isn't, so the glint lands after the text and the chip reads as catching
// light from the price column beside it. The shine lives entirely in the gradient; a bevel (inset
// light top / dark bottom) is what made this look embossed, so there deliberately isn't one.
//
// Common is the card's own black and has no metal to catch light, so it inverts per-theme instead:
// a dark chip on light, a light chip on dark, with `text-background` following along. The label
// stays black on every colored badge — each ramp is light enough that white would fall to ~3:1.
// Every gradient is spelled out in full rather than composed from a shared `circle at 74% 16%`
// constant: Tailwind scans this file as plain text for class names, so an interpolated class would
// never get its CSS generated. Keep the `circle_at_74%_16%` origin identical across all six.
const STYLES: Record<string, RarityStyle> = {
  common: {
    letter: "C",
    label: "Common",
    badge:
      "bg-[radial-gradient(circle_at_74%_16%,#4b4b4b_0%,#1c1c1c_34%,#000000_66%,#2f2f2f_100%)] dark:bg-[radial-gradient(circle_at_74%_16%,#ffffff_0%,#f0f0f0_34%,#c9c9c9_66%,#a8a8a8_100%)] text-background",
    icon: "text-foreground",
  },
  uncommon: {
    letter: "U",
    label: "Uncommon",
    badge: "bg-[radial-gradient(circle_at_74%_16%,#eef4f9_0%,#b7c5d2_34%,#7c8b99_66%,#5d6b78_100%)] text-black",
    icon: "text-[#8b9aa8]",
  },
  rare: {
    letter: "R",
    label: "Rare",
    badge: "bg-[radial-gradient(circle_at_74%_16%,#fdf6cf_0%,#e6c85e_34%,#c8a02c_66%,#8a6a12_100%)] text-black",
    icon: "text-[#c8a02c]",
  },
  mythic: {
    letter: "M",
    label: "Mythic",
    badge: "bg-[radial-gradient(circle_at_74%_16%,#ffe0c2_0%,#fda560_34%,#f97316_66%,#c2410c_100%)] text-black",
    icon: "text-[#f97316]",
  },
  special: {
    letter: "S",
    label: "Special",
    badge: "bg-[radial-gradient(circle_at_74%_16%,#f0dbf7_0%,#b681c8_34%,#8a4f9e_66%,#663878_100%)] text-black",
    icon: "text-[#8a4f9e]",
  },
  bonus: {
    letter: "B",
    label: "Bonus",
    badge: "bg-[radial-gradient(circle_at_74%_16%,#d7f2f2_0%,#6fbdbd_34%,#3f8f8f_66%,#2a6363_100%)] text-black",
    icon: "text-[#3f8f8f]",
  },
};

const UNKNOWN: RarityStyle = {
  letter: "?",
  label: "Unknown rarity",
  badge: "bg-muted text-muted-foreground",
  icon: "text-muted-foreground",
};

/** Look up a rarity's badge letter/colors. Unknown or missing rarities fall back to a muted `?`
 *  rather than throwing — the rarity string comes straight from the CSV, so it isn't guaranteed. */
export function rarityStyle(rarity: string): RarityStyle {
  return STYLES[rarity?.toLowerCase()] ?? UNKNOWN;
}
