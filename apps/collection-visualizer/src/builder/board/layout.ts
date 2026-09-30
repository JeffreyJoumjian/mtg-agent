/** Pure layout for the board: which cards sit in which column, and in what staged state. */
import { applyChangeSet, type ChangeEntry } from "@mtg/change-set.ts";
import { isLandCard, type CardInfo } from "../model/cards";
import { isCommanderSection, type DeckList, type ListEntry } from "@mtg/deck-model.ts";

export type CardState = "current" | "added" | "removed" | "moved" | "changed";

export interface LaidOutCard {
  name: string;
  qty: number;
  note?: string;
  state: CardState;
}

export interface LaidOutSection {
  name: string;
  cards: LaidOutCard[];
}

const key = (name: string): string => name.trim().toLowerCase();

/** The commander section(s) stay in view while the rest of the board scrolls: split them out,
 *  keeping the list's own order on both sides. */
export function pinCommanders(sections: LaidOutSection[]): { pinned: LaidOutSection[]; scrolling: LaidOutSection[] } {
  return {
    pinned: sections.filter((s) => isCommanderSection(s.name)),
    scrolling: sections.filter((s) => !isCommanderSection(s.name)),
  };
}

/**
 * `current`: the list as on disk. `after`: the staged set applied — added cards in their new
 * section, removed cards still in their old spot but marked, moved cards in their destination,
 * quantity changes reflected. With nothing staged the two modes are identical.
 */
export function layoutSections(
  list: DeckList,
  staged: { entries: ChangeEntry[] } | null,
  mode: "current" | "after",
): LaidOutSection[] {
  const asIs = list.sections.map((s) => ({
    name: s.name,
    cards: s.cards.map((c) => ({ ...c, state: "current" as const })),
  }));
  if (mode === "current" || !staged || staged.entries.length === 0) return asIs;

  const applied = applyChangeSet(list, staged.entries);
  if (!applied.ok) return asIs;

  const added: Record<string, true> = {};
  const removed: Record<string, true> = {};
  const moved: Record<string, true> = {};
  const changed: Record<string, true> = {};
  for (const e of staged.entries) {
    if (e.op === "add") added[key(e.name)] = true;
    else if (e.op === "remove") removed[key(e.name)] = true;
    else if (e.op === "move") moved[key(e.name)] = true;
    else if (e.op === "qty") changed[key(e.name)] = true;
  }

  const stateOf = (entry: ListEntry): CardState => {
    const k = key(entry.name);
    if (added[k]) return "added";
    if (moved[k]) return "moved";
    if (changed[k]) return "changed";
    return "current";
  };

  const out: LaidOutSection[] = applied.list.sections.map((s) => ({
    name: s.name,
    cards: s.cards.map((c) => ({ ...c, state: stateOf(c) })),
  }));

  // Removed cards stay visible where they were, dimmed, so the eye sees what leaves.
  for (const section of list.sections) {
    for (const card of section.cards) {
      if (!removed[key(card.name)]) continue;

      let target = out.find((s) => s.name.toLowerCase() === section.name.toLowerCase());
      if (!target) {
        target = { name: section.name, cards: [] };
        out.push(target);
      }
      target.cards.push({ ...card, state: "removed" });
    }
  }
  return out;
}

export interface MvBucket {
  mv: string;
  cards: (ListEntry & { section: string })[];
}

/** Nonland cards by mana value (`0`…`6`, `7+`), lands in their own bucket at the end. */
export function bucketByMv(list: DeckList, cards: Record<string, CardInfo | undefined>): MvBucket[] {
  const buckets: MvBucket[] = ["0", "1", "2", "3", "4", "5", "6", "7+", "Lands"].map((mv) => ({ mv, cards: [] }));

  for (const section of list.sections) {
    for (const entry of section.cards) {
      const card = cards[entry.name];
      const item = { ...entry, section: section.name };
      if (!card) {
        buckets[0].cards.push(item);
        continue;
      }
      if (isLandCard(card)) {
        buckets[8].cards.push(item);
        continue;
      }
      const i = Math.min(7, Math.max(0, Math.floor(card.cmc)));
      buckets[i].cards.push(item);
    }
  }
  return buckets;
}
