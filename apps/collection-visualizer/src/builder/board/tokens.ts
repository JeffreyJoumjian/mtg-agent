/** The few colours the builder adds on top of the neutral chrome. One meaning each: emerald = coming
 *  in, rose = going out, sky = moving, amber = quantity change / warning. Nothing else is coloured. */
import type { CardState } from "./layout";

export const STATE_RING: Record<Exclude<CardState, "current">, string> = {
  added: "ring-2 ring-emerald-400",
  removed: "ring-2 ring-rose-400",
  moved: "ring-2 ring-sky-400",
  changed: "ring-2 ring-amber-400",
};

export const STATE_PILL: Record<Exclude<CardState, "current">, { text: string; className: string }> = {
  added: { text: "in", className: "bg-emerald-400 text-emerald-950" },
  removed: { text: "out", className: "bg-rose-400 text-rose-950" },
  moved: { text: "moved", className: "bg-sky-400 text-sky-950" },
  changed: { text: "qty", className: "bg-amber-400 text-amber-950" },
};

export const DELTA_CLASS = { up: "text-emerald-400", down: "text-rose-400", flat: "text-muted-foreground" };

/** Magic cards have a 63:88 face; Scryfall scans include the black border, whose corners this radius matches. */
export const CARD_ASPECT = "aspect-[63/88]";
export const CARD_RADIUS = "rounded-[4.5%/3.2%]";

/** Board stack geometry: column width in px, and how much of each buried card stays visible. */
export const STACK_WIDTH = 148;
export const STACK_PEEK = 27;
export const cardHeightFor = (width: number): number => Math.round((width * 88) / 63);
