/** Card types as the workbench orders and names them — the bar's glyph row, the composition bar
 *  and the board's group-by-type all read from here so they never disagree. */
import type { DeckStats } from "@mtg/deck-stats.ts";

export type TypeKey = keyof DeckStats["types"];

/** Display order everywhere: creatures first, lands last. */
export const TYPE_ORDER: TypeKey[] = [
  "creature",
  "artifact",
  "instant",
  "sorcery",
  "enchantment",
  "planeswalker",
  "battle",
  "land",
];

export const TYPE_LABELS: Record<TypeKey, string> = {
  creature: "Creature",
  artifact: "Artifact",
  instant: "Instant",
  sorcery: "Sorcery",
  enchantment: "Enchantment",
  planeswalker: "Planeswalker",
  battle: "Battle",
  land: "Land",
};

export const TYPE_PLURALS: Record<TypeKey, string> = {
  creature: "Creatures",
  artifact: "Artifacts",
  instant: "Instants",
  sorcery: "Sorceries",
  enchantment: "Enchantments",
  planeswalker: "Planeswalkers",
  battle: "Battles",
  land: "Lands",
};

/** The one bucket a card belongs to when the board groups by type. The stats engine counts an
 *  artifact creature under both types; a column can hold it only once, so lands win first (as in
 *  the engine), then creatures, then the rest in a fixed precedence. Front face only. */
export function primaryType(typeLine: string): TypeKey | null {
  const front = typeLine.split(" // ")[0];
  if (/\bLand\b/.test(front)) return "land";
  if (/\bCreature\b/.test(front)) return "creature";
  if (/\bPlaneswalker\b/.test(front)) return "planeswalker";
  if (/\bBattle\b/.test(front)) return "battle";
  if (/\bInstant\b/.test(front)) return "instant";
  if (/\bSorcery\b/.test(front)) return "sorcery";
  if (/\bArtifact\b/.test(front)) return "artifact";
  if (/\bEnchantment\b/.test(front)) return "enchantment";
  return null;
}
