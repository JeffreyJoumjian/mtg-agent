/** Which side panes a deck's workbench shows. Pure helpers over the per-deck record that
 *  `panesAtom` persists, so the toggle logic is testable without React. */

export type Pane = "chat";

export interface PaneState {
  /** The chat on the right. */
  chat: boolean;
}

/** A deck with nothing stored shows the chat. */
export function paneState(all: Record<string, PaneState>, slug: string): PaneState {
  return all[slug] ?? { chat: true };
}

/** Returns the same object when nothing changes, so a resize that reports the current state does
 *  not write storage or re-render. */
export function setPane(
  all: Record<string, PaneState>,
  slug: string,
  pane: Pane,
  open: boolean,
): Record<string, PaneState> {
  const current = paneState(all, slug);
  if (current[pane] === open) return all;

  return { ...all, [slug]: { ...current, [pane]: open } };
}
