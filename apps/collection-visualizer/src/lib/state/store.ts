import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import type { SetIcon } from "~/lib/types";
import type { Pins } from "./pins";
import { defaultSettings, type ViewSettings } from "./settings";

// Global state lives here as jotai atoms rather than in React context, so a component that needs a
// setting reads it directly instead of every layer between passing it down.
//
// Both persisted atoms deliberately read localStorage on mount rather than during init: this page is
// server-rendered, and touching storage while initialising would make the server's HTML (defaults)
// disagree with the client's first render (stored values) — a hydration mismatch. atomWithStorage's
// default behaviour is exactly right, so `getOnInit` stays off.

/** localStorage-backed, merged over the current defaults on read so a settings object written before
 *  a field existed still gets a value for it instead of `undefined`. */
const settingsStorage = createJSONStorage<ViewSettings>(() => localStorage);

export const settingsAtom = atomWithStorage<ViewSettings>("mtg-collection.settings", defaultSettings(), {
  ...settingsStorage,
  getItem: (key, initial) => ({ ...defaultSettings(), ...settingsStorage.getItem(key, initial) }),
});

/** Which printing + face each card renders as, set by the drawer's pin button. */
export const pinsAtom = atomWithStorage<Pins>("mtg-collection.pins", {});

/** Set symbols for the owned sets, keyed by set code. Not persisted — it comes from the route loader
 *  on every load, and is hydrated during render (see useHydrateAtoms) so symbols are there on the
 *  first paint rather than popping in afterwards. */
export const setIconsAtom = atom<Record<string, SetIcon>>({});
