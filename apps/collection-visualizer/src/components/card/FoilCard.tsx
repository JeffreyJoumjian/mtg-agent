import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import { useAtomValue } from "jotai";
import { settingsAtom } from "~/lib/store";
import { cn } from "~/lib/utils";

interface FoilCardProps {
  /** Whether this printing is actually foil. A non-foil card renders as a plain box — no overlays,
   *  no listeners, no cost — so the shimmer stays a fact about the card, not decoration. */
  foil: boolean;
  /** Etched foil gets a coarser, silvery shimmer instead of the full spectrum. */
  etched?: boolean;
  /** Lift and tilt toward the cursor. Off for a card sitting in a stack's cascade, which is already
   *  transformed into its slot and clipped by it. */
  tilt?: boolean;
  className?: string;
  children: ReactNode;
}

/** Gives a foil printing the holographic shimmer and cursor-tracked tilt of a real card turned in
 *  the light.
 *
 *  At rest this is pure CSS — a fixed, low-opacity sheen that costs nothing to sit there. The tilt
 *  and glare only spin up while the pointer is over this particular card, and wind back down the
 *  moment it leaves, so a grid of 50 foils never has 50 cards animating.
 *
 *  Pointer tracking writes CSS variables straight to the node rather than going through state: at
 *  60fps, a state update would re-render the tile and every tooltip in it on each mouse move. */
export function FoilCard(props: FoilCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const box = useRef<DOMRect | null>(null);
  const frame = useRef(0);
  // `foil` is a fact about the printing; the setting is whether we render the effect at all. Read
  // straight from the store so the flag doesn't have to be threaded through the grid, the stack
  // tiles, the drawer, the list preview, and the lightbox.
  const enabled = useAtomValue(settingsAtom).foil;

  // Let only on-screen cards shimmer. The grid keeps roughly 4x more tiles mounted than fit on
  // screen (the virtualizer's overscan), and the drift is the expensive part — so without this,
  // most of the work goes into cards nobody can see. An observer rather than the virtualizer's
  // range, so this keeps working in the list, drawer, and lightbox too. The class is toggled
  // directly rather than through state: this fires while scrolling, and a re-render per card per
  // scroll would cost more than it saves.
  useEffect(() => {
    const el = ref.current;
    if (!el) return; // not foil (or turned off) — no ref attached, nothing to observe

    const io = new IntersectionObserver(([entry]) => {
      el.classList.toggle("foil-onscreen", entry.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [props.foil, enabled]);

  // A plain box: no overlays, no listeners, nothing running. Either this printing isn't foil, or the
  // effect is turned off.
  if (!props.foil || !enabled) return <div className={props.className}>{props.children}</div>;

  const enter = () => {
    const el = ref.current;
    if (!el) return;

    // Measured once per hover: the card can't move while the cursor is on it, and reading layout on
    // every pointermove would force a reflow every frame.
    box.current = el.getBoundingClientRect();
    el.classList.add("foil-active");
    el.style.setProperty("--active", "1");
  };

  const move = (e: PointerEvent<HTMLDivElement>) => {
    // pointermove fires faster than the screen paints — coalesce to one write per frame.
    if (frame.current) return;

    const { clientX, clientY } = e;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const el = ref.current;
      const r = box.current;
      if (!el || !r) return;

      const px = (clientX - r.left) / r.width;
      const py = (clientY - r.top) / r.height;
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      // Tilt away from the cursor, as though that corner were being pressed down.
      el.style.setProperty("--rx", `${((0.5 - py) * 14).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((px - 0.5) * 14).toFixed(2)}deg`);
    });
  };

  const leave = () => {
    const el = ref.current;
    if (!el) return;

    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }

    // Dropping `foil-active` restores the transition so the card eases flat instead of snapping, and
    // releases `will-change` so an idle tile isn't holding a compositor layer. The sheen keeps its
    // last position — resetting it would visibly jump as the card settles.
    el.classList.remove("foil-active");
    el.style.setProperty("--active", "0");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    box.current = null;
  };

  return (
    <div
      ref={ref}
      onPointerEnter={enter}
      onPointerMove={move}
      onPointerLeave={leave}
      className={cn("foil", props.tilt !== false && "foil-tilt", props.etched && "foil-etched", props.className)}
    >
      {props.children}
    </div>
  );
}
