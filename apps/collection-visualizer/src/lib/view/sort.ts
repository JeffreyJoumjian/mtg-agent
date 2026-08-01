import type { CardTile, Currency } from "~/lib/types";
import type { Pins } from "~/lib/state/pins";
import type { NameGroup } from "~/lib/card/stacks";
import { tileValue } from "~/lib/card/pricing";
import { groupTotals, representative } from "~/lib/card/stacks";

export type SortKey = "name" | "set" | "rarity" | "number" | "cmc" | "price";

const RARITY_ORDER: Record<string, number> = { common: 0, uncommon: 1, rare: 2, mythic: 3, special: 4, bonus: 5 };

/** Comparable value for a tile+key. Nulls become +Infinity so they sort last on ascending. */
function keyValue(tile: CardTile, key: SortKey, currency: Currency): number | string {
  switch (key) {
    case "name":
      return tile.name.toLowerCase();
    case "set":
      return `${tile.setName.toLowerCase()} ${String(Number(tile.collectorNumber) || 0).padStart(6, "0")}`;
    case "rarity":
      return RARITY_ORDER[tile.rarity] ?? 99;
    case "number":
      return Number(tile.collectorNumber) || 0;
    case "cmc":
      return tile.enriched.cmc;
    case "price": {
      const v = tileValue(tile, currency);
      return v == null ? Number.POSITIVE_INFINITY : v;
    }
  }
}

export function sortTiles(tiles: CardTile[], key: SortKey, dir: "asc" | "desc", currency: Currency): CardTile[] {
  const factor = dir === "asc" ? 1 : -1;
  return [...tiles].sort((a, b) => {
    const av = keyValue(a, key, currency);
    const bv = keyValue(b, key, currency);
    if (av < bv) return -1 * factor;
    if (av > bv) return 1 * factor;
    return 0;
  });
}

/** Comparable value for a whole stack under `key`.
 *
 *  A stack tile shows its *summed* value (unit × quantity across every printing), so price keys off
 *  that total — a $74 three-card stack has to outrank a $35 single, which sorting on one printing's
 *  unit price got wrong. Every other key follows the stack's face — the representative printing, pins
 *  included — so the order matches the set/number/rarity the footer prints. */
function groupValue(group: NameGroup, key: SortKey, currency: Currency, pins: Pins): number | string {
  if (key === "price") return groupTotals(group.variants, currency).value;
  if (key === "name") return group.name.toLowerCase();
  return keyValue(representative(group, currency, pins), key, currency);
}

/** Sort stacks (the grouped grid) by the same metric their tile displays — see `groupValue`. Groups
 *  arrive in first-appearance order from `groupByName`, which keys off unit price and so can't order
 *  stacks by total on its own; this is the pass that fixes that. */
export function sortGroups(
  groups: NameGroup[],
  key: SortKey,
  dir: "asc" | "desc",
  currency: Currency,
  pins: Pins,
): NameGroup[] {
  const factor = dir === "asc" ? 1 : -1;
  return [...groups].sort((a, b) => {
    const av = groupValue(a, key, currency, pins);
    const bv = groupValue(b, key, currency, pins);
    if (av < bv) return -1 * factor;
    if (av > bv) return 1 * factor;
    return 0;
  });
}
