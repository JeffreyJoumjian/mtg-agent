/** How the board's columns are formed. `role` is the list's own sections; the others regroup the
 *  same laid-out cards (staged state and all) into fixed buckets. */
import type { CardInfo } from "@mtg/deck-stats.ts";
import { TYPE_ORDER, TYPE_PLURALS, primaryType } from "../model/card-types";
import type { LaidOutCard, LaidOutSection } from "./layout";

export type GroupBy = "role" | "type" | "color";

export const GROUP_OPTIONS: { value: GroupBy; label: string }[] = [
  { value: "type", label: "Type" },
  { value: "role", label: "Role" },
  { value: "color", label: "Colour" },
];

const COLOR_BUCKETS: { key: string; label: string }[] = [
  { key: "W", label: "White" },
  { key: "U", label: "Blue" },
  { key: "B", label: "Black" },
  { key: "R", label: "Red" },
  { key: "G", label: "Green" },
  { key: "multi", label: "Multicolour" },
  { key: "colorless", label: "Colourless" },
  { key: "land", label: "Lands" },
];

function colorBucket(card: CardInfo): string {
  if (primaryType(card.typeLine) === "land") return "land";
  if (card.colors.length === 0) return "colorless";
  if (card.colors.length > 1) return "multi";
  return card.colors[0];
}

/** Bucket every card by `keyOf`, emit the buckets in `order` (empty ones dropped), then an
 *  "Other" column for cards with no card data. Cards inside a bucket sort by name. */
function regroup(
  sections: LaidOutSection[],
  cards: Record<string, CardInfo | undefined>,
  order: { key: string; label: string }[],
  keyOf: (card: CardInfo) => string | null,
): LaidOutSection[] {
  const buckets: Record<string, LaidOutCard[]> = {};
  const other: LaidOutCard[] = [];
  for (const section of sections) {
    for (const card of section.cards) {
      const info = cards[card.name];
      const key = info ? keyOf(info) : null;
      if (key === null) {
        other.push(card);
        continue;
      }

      (buckets[key] ??= []).push(card);
    }
  }

  const byName = (a: LaidOutCard, b: LaidOutCard) => a.name.localeCompare(b.name);
  const out: LaidOutSection[] = [];
  for (const { key, label } of order) {
    const list = buckets[key];
    if (list && list.length > 0) out.push({ name: label, cards: list.sort(byName) });
  }
  if (other.length > 0) out.push({ name: "Other", cards: other.sort(byName) });
  return out;
}

export function groupCards(
  sections: LaidOutSection[],
  by: GroupBy,
  cards: Record<string, CardInfo | undefined>,
): LaidOutSection[] {
  if (by === "role") {
    // The list's own order, except land sections, which read better after the spells.
    const isLands = (s: LaidOutSection) => /\bland/i.test(s.name);
    const lands = sections.filter(isLands);
    const tail = sections.slice(sections.length - lands.length);
    if (lands.length === 0 || !tail.some((s) => !isLands(s))) return sections;

    return [...sections.filter((s) => !isLands(s)), ...lands];
  }
  if (by === "type") {
    return regroup(
      sections,
      cards,
      TYPE_ORDER.map((t) => ({ key: t, label: TYPE_PLURALS[t] })),
      (card) => primaryType(card.typeLine),
    );
  }
  return regroup(sections, cards, COLOR_BUCKETS, colorBucket);
}
