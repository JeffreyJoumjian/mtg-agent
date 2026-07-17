/** An explicit choice, made from the drawer, of how a card should render in the grid/list. */
export interface CardPin {
  /** `key` of the pinned printing. Read only when printings are grouped into one stack tile;
   *  ungrouped, every printing gets its own tile, so there's nothing to choose between. */
  variantKey: string;
  /** Which face to show: 0 = front, 1 = back. Ignored for single-faced cards. */
  face: number;
}

/** Pins keyed by card NAME (not printing), so the choice survives toggling grouping on and off and
 *  reads the same for every copy of a card. Persisted by `pinsAtom` (see lib/store.ts). */
export type Pins = Record<string, CardPin>;
