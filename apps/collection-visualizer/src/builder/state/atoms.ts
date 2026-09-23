/** Client state for the builder. The React Query cache owns everything fetched; these atoms own
 *  what is purely client-side: the staged change set, the preview toggle, the selection, and the
 *  per-deck choices that persist across reloads. */
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { Staged } from "./staged";

/** Staged change set per deck slug. Null = nothing staged. */
export const stagedAtom = atom<Record<string, Staged | null>>({});

/** Board rendering: the list as on disk, or with the staged set applied. */
export const previewModeAtom = atom<"current" | "after">("current");

/** Card highlighted on the board (from a chat chip click or the popover). */
export const selectedCardAtom = atom<string | null>(null);

/** Tag the rail is filtering the board by, if any. */
export const highlightTagAtom = atom<string | null>(null);

/** Which list each deck last had open. Persisted; the atom reads storage on mount (SSR-safe). */
export const activeListAtom = atomWithStorage<Record<string, string>>("mtg-workbench.activeList", {});

/** Per-deck model and effort for the chat. Null = Claude Code's default. */
export const chatModelAtom = atomWithStorage<Record<string, { model: string | null; effort: string | null }>>(
  "mtg-workbench.chatModel",
  {},
);

/** Board view mode per deck. */
export const boardViewAtom = atomWithStorage<Record<string, "board" | "table" | "curve">>(
  "mtg-workbench.boardView",
  {},
);

/** The three-pane split (rail / board / chat), as the panels library reports it. */
export const paneLayoutAtom = atomWithStorage<Record<string, number> | null>("mtg-workbench.panes", null);
