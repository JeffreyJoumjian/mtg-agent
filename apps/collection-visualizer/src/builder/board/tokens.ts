/** The few colours the builder adds on top of the neutral chrome. One meaning each: emerald = coming
 *  in, rose = going out, sky = moving, amber = quantity change / warning. Nothing else is coloured. */
import type { CardState } from "./layout";

export const STATE_RING: Record<Exclude<CardState, "current">, string> = {
  added: "ring-2 ring-good",
  removed: "ring-2 ring-bad",
  moved: "ring-2 ring-move",
  changed: "ring-2 ring-warn",
};

export const STATE_PILL: Record<Exclude<CardState, "current">, { text: string; className: string }> = {
  added: { text: "in", className: "bg-good text-good-foreground" },
  removed: { text: "out", className: "bg-bad text-bad-foreground" },
  moved: { text: "moved", className: "bg-move text-move-foreground" },
  changed: { text: "qty", className: "bg-warn text-warn-foreground" },
};

export const DELTA_CLASS = { up: "text-good", down: "text-bad", flat: "text-muted-foreground" };

/** Magic cards have a 63:88 face; Scryfall scans include the black border, whose corners this radius matches. */
export const CARD_ASPECT = "aspect-[63/88]";
export const CARD_RADIUS = "rounded-[4.5%/3.2%]";

/** Board stack geometry: column width in px, and how much of each buried card stays visible. */
export const STACK_WIDTH = 180;
export const STACK_PEEK = 33;
export const cardHeightFor = (width: number): number => Math.round((width * 88) / 63);
