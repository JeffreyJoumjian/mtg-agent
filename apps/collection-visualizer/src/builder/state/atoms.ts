/** Client state for the builder. The React Query cache owns everything fetched; these atoms own
 *  what is purely client-side: the staged change set, the preview toggle, the selection, and the
 *  per-deck choices that persist across reloads. */
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { GroupBy } from "../board/grouping";
import type { DeckSort } from "../index/sort";
import type { BoardView } from "../board/ViewSwitcher";
import type { PaneState } from "./panes";
import type { Staged } from "./staged";

/** How the decks page orders its tiles. */
export const deckSortAtom = atomWithStorage<DeckSort>("mtg-workbench.deckSort", { by: "edited", dir: "desc" });

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
export const boardViewAtom = atomWithStorage<Record<string, BoardView>>("mtg-workbench.boardView", {});

/** The board / chat split, as the panels library reports it. The key carries a version because
 *  the panel set changed when the stats rail became the bottom bar; an old layout would name a
 *  panel that no longer exists. */
export const paneLayoutAtom = atomWithStorage<Record<string, number> | null>("mtg-workbench.panes.v2", null);

/** Whether each deck shows the stats rail and the chat. Missing = both open. */
export const panesAtom = atomWithStorage<Record<string, PaneState>>("mtg-workbench.panesOpen", {});

/** How the board groups its columns per deck: by card type unless the deck says otherwise. */
export const boardGroupAtom = atomWithStorage<Record<string, GroupBy>>("mtg-workbench.boardGroup", {});

/** Groups folded shut in the rows view, per deck. */
export const collapsedGroupsAtom = atomWithStorage<Record<string, string[]>>("mtg-workbench.collapsedGroups", {});

/** Height of the bottom panel — the staged panel on the deck page, the change panel on the history
 *  page — as a percentage of its split, keyed by page. Missing = the default height. */
export const bottomPaneAtom = atomWithStorage<Record<string, number>>("mtg-workbench.bottomPane.v1", {});
