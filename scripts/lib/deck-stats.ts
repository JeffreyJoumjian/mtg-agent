/**
 * Deck statistics — the numbers on the stats rail and the deltas on every staged change.
 *
 * Pure and dependency-free so the same function runs in the CLI, the app's server (for history
 * entries) and the browser (for live previews). A card missing from `cards` is counted in the
 * size and role numbers, flagged as unresolved, and left out of everything that needs its data.
 */
import {
  MAIN_LIST,
  isBasicLand,
  isCommanderSection,
  listEntries,
  type CardMeta,
  type CardStatus,
  type Deck,
  type DeckList,
} from "./deck-model.ts";

export type Color = "W" | "U" | "B" | "R" | "G";
export const COLORS: Color[] = ["W", "U", "B", "R", "G"];

/** The slice of a Scryfall summary the stats need — exactly what the app sends over the wire. */
export interface CardInfo {
  name: string;
  cmc: number;
  manaCost: string;
  typeLine: string;
  colors: string[];
  colorIdentity: string[];
  producedMana: string[];
  gameChanger: boolean;
  usd: number | null;
  commanderLegal: string;
}

export interface DeckStats {
  size: { total: number; target: number | null; lands: number; nonland: number; commanders: number };
  curve: {
    /** Average mana value of nonland cards, copies weighted. */
    avgMv: number;
    /** The same, ignoring MV 0 cards (free spells, some artifacts) — the number most sites quote. */
    avgMvNonZero: number;
    /** Buckets `"0"`…`"6"`, `"7+"`, nonland only, split creature / noncreature. */
    histogram: { mv: string; creature: number; noncreature: number }[];
  };
  types: {
    creature: number;
    instant: number;
    sorcery: number;
    artifact: number;
    enchantment: number;
    planeswalker: number;
    battle: number;
    land: number;
  };
  color: {
    identity: Color[];
    /** Coloured mana symbols across nonland mana costs; hybrid counts each half. */
    pips: Record<Color, number>;
    /** Permanents that produce each colour, copies counted. */
    sources: Record<Color, number>;
  };
  roles: { sections: Record<string, number>; tags: Record<string, number> };
  flags: {
    gameChangers: string[];
    offIdentity: string[];
    illegal: string[];
    unresolved: string[];
    /** Non-basic cards with more than one copy. */
    duplicates: string[];
  };
  money: { total: number; byStatus: Record<CardStatus, { count: number; usd: number }> };
}

export interface StatChange {
  group: "size" | "curve" | "types" | "color" | "roles" | "tags" | "flags" | "money";
  /** Dotted path, stable across versions — `"tags.drain"`, `"curve.avgMv"`. */
  key: string;
  label: string;
  before: number;
  after: number;
  delta: number;
}

const zeroColors = (): Record<Color, number> => ({ W: 0, U: 0, B: 0, R: 0, G: 0 });

/** The front face's type line — what the card is when it enters. */
function frontTypeLine(card: CardInfo): string {
  return card.typeLine.split(" // ")[0];
}

function isLand(card: CardInfo): boolean {
  return /\bLand\b/.test(frontTypeLine(card));
}

/** Colour identity: the union of the commanders' identities, in WUBRG order. Empty for a list
 *  whose commanders are unresolved or absent. */
export function identityOf(list: DeckList, cards: Record<string, CardInfo | undefined>): Color[] {
  const seen: Record<string, true> = {};

  for (const section of list.sections) {
    if (!isCommanderSection(section.name)) continue;

    for (const entry of section.cards) {
      for (const c of cards[entry.name]?.colorIdentity ?? []) seen[c] = true;
    }
  }
  return COLORS.filter((c) => seen[c]);
}

/** The deck's colour identity: that of the main list (or the first `deck` list). Pools have no
 *  commander of their own, so they are checked against this rather than against nothing. */
export function deckIdentity(deck: Deck, cards: Record<string, CardInfo | undefined>): Color[] {
  const primary = deck.lists[MAIN_LIST] ?? Object.values(deck.lists).find((l) => l.kind === "deck") ?? Object.values(deck.lists)[0];
  return primary ? identityOf(primary, cards) : [];
}

/** Count coloured symbols in a mana cost: `{W/U}` counts one W and one U; `{G/P}` counts G. */
function pipsOf(manaCost: string): Record<Color, number> {
  const pips = zeroColors();

  for (const m of manaCost.matchAll(/\{([^}]+)\}/g)) {
    for (const part of m[1].split("/")) {
      if (COLORS.includes(part as Color)) pips[part as Color] += 1;
    }
  }
  return pips;
}

function mvBucket(cmc: number): string {
  return cmc >= 7 ? "7+" : String(Math.max(0, Math.floor(cmc)));
}

export function computeStats(
  list: DeckList,
  cards: Record<string, CardInfo | undefined>,
  meta: Record<string, CardMeta>,
  identity?: Color[],
): DeckStats {
  const entries = listEntries(list);
  const id = identity ?? identityOf(list, cards);

  const stats: DeckStats = {
    size: { total: 0, target: list.kind === "deck" ? 100 : null, lands: 0, nonland: 0, commanders: 0 },
    curve: {
      avgMv: 0,
      avgMvNonZero: 0,
      histogram: ["0", "1", "2", "3", "4", "5", "6", "7+"].map((mv) => ({ mv, creature: 0, noncreature: 0 })),
    },
    types: { creature: 0, instant: 0, sorcery: 0, artifact: 0, enchantment: 0, planeswalker: 0, battle: 0, land: 0 },
    color: { identity: id, pips: zeroColors(), sources: zeroColors() },
    roles: { sections: {}, tags: {} },
    flags: { gameChangers: [], offIdentity: [], illegal: [], unresolved: [], duplicates: [] },
    money: {
      total: 0,
      byStatus: { OWNED: { count: 0, usd: 0 }, BUY: { count: 0, usd: 0 }, PROXY: { count: 0, usd: 0 }, CONSIDERING: { count: 0, usd: 0 } },
    },
  };

  let mvSum = 0;
  let mvCount = 0;
  let mvSumNonZero = 0;
  let mvCountNonZero = 0;

  for (const entry of entries) {
    const qty = entry.qty;
    stats.size.total += qty;
    stats.roles.sections[entry.section] = (stats.roles.sections[entry.section] ?? 0) + qty;
    if (isCommanderSection(entry.section)) stats.size.commanders += qty;

    for (const tag of meta[entry.name]?.tags ?? []) {
      stats.roles.tags[tag] = (stats.roles.tags[tag] ?? 0) + qty;
    }
    if (qty > 1 && !isBasicLand(entry.name)) stats.flags.duplicates.push(entry.name);

    const card = cards[entry.name];
    if (!card) {
      stats.flags.unresolved.push(entry.name);
      continue;
    }

    const status: CardStatus = meta[entry.name]?.status ?? "PROXY";
    stats.money.byStatus[status].count += qty;
    if (card.usd != null) {
      stats.money.total += card.usd * qty;
      stats.money.byStatus[status].usd += card.usd * qty;
    }

    if (card.gameChanger) stats.flags.gameChangers.push(entry.name);
    if (card.commanderLegal !== "legal") stats.flags.illegal.push(entry.name);
    if (card.colorIdentity.some((c) => !id.includes(c as Color))) stats.flags.offIdentity.push(entry.name);

    for (const c of card.producedMana) {
      if (COLORS.includes(c as Color)) stats.color.sources[c as Color] += qty;
    }

    const type = frontTypeLine(card);
    if (isLand(card)) {
      stats.size.lands += qty;
      stats.types.land += qty;
      continue;
    }

    if (/\bCreature\b/.test(type)) stats.types.creature += qty;
    if (/\bInstant\b/.test(type)) stats.types.instant += qty;
    if (/\bSorcery\b/.test(type)) stats.types.sorcery += qty;
    if (/\bArtifact\b/.test(type)) stats.types.artifact += qty;
    if (/\bEnchantment\b/.test(type)) stats.types.enchantment += qty;
    if (/\bPlaneswalker\b/.test(type)) stats.types.planeswalker += qty;
    if (/\bBattle\b/.test(type)) stats.types.battle += qty;

    const bucket = stats.curve.histogram.find((h) => h.mv === mvBucket(card.cmc));
    if (bucket) {
      if (/\bCreature\b/.test(type)) bucket.creature += qty;
      else bucket.noncreature += qty;
    }

    mvSum += card.cmc * qty;
    mvCount += qty;
    if (card.cmc > 0) {
      mvSumNonZero += card.cmc * qty;
      mvCountNonZero += qty;
    }

    const pips = pipsOf(card.manaCost.split(" // ")[0]);
    for (const c of COLORS) stats.color.pips[c] += pips[c] * qty;
  }

  stats.size.nonland = stats.size.total - stats.size.lands;
  stats.curve.avgMv = mvCount > 0 ? round2(mvSum / mvCount) : 0;
  stats.curve.avgMvNonZero = mvCountNonZero > 0 ? round2(mvSumNonZero / mvCountNonZero) : 0;
  stats.money.total = round2(stats.money.total);
  for (const status of Object.keys(stats.money.byStatus) as CardStatus[]) {
    stats.money.byStatus[status].usd = round2(stats.money.byStatus[status].usd);
  }
  return stats;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Flatten the numeric leaves of a stats object into `{ group, key, label, value }` rows. */
function rows(s: DeckStats): { group: StatChange["group"]; key: string; label: string; value: number }[] {
  const out: { group: StatChange["group"]; key: string; label: string; value: number }[] = [];
  const push = (group: StatChange["group"], key: string, label: string, value: number) => out.push({ group, key, label, value });

  push("size", "size.total", "Cards", s.size.total);
  push("size", "size.lands", "Lands", s.size.lands);
  push("size", "size.nonland", "Nonland", s.size.nonland);
  push("curve", "curve.avgMv", "Avg MV", s.curve.avgMv);
  push("curve", "curve.avgMvNonZero", "Avg MV (no 0s)", s.curve.avgMvNonZero);
  for (const h of s.curve.histogram) push("curve", `curve.mv.${h.mv}`, `MV ${h.mv}`, h.creature + h.noncreature);
  for (const [type, n] of Object.entries(s.types)) push("types", `types.${type}`, type[0].toUpperCase() + type.slice(1), n);
  for (const c of COLORS) push("color", `color.pips.${c}`, `${c} pips`, s.color.pips[c]);
  for (const c of COLORS) push("color", `color.sources.${c}`, `${c} sources`, s.color.sources[c]);
  for (const [name, n] of Object.entries(s.roles.sections)) push("roles", `roles.${name}`, name, n);
  for (const [tag, n] of Object.entries(s.roles.tags)) push("tags", `tags.${tag}`, tag, n);
  push("flags", "flags.gameChangers", "Game Changers", s.flags.gameChangers.length);
  push("flags", "flags.offIdentity", "Off-identity", s.flags.offIdentity.length);
  push("flags", "flags.illegal", "Not legal", s.flags.illegal.length);
  push("flags", "flags.unresolved", "Unresolved", s.flags.unresolved.length);
  push("flags", "flags.duplicates", "Duplicates", s.flags.duplicates.length);
  push("money", "money.total", "USD", s.money.total);
  for (const [status, v] of Object.entries(s.money.byStatus)) {
    push("money", `money.${status}.count`, `${status} cards`, v.count);
    push("money", `money.${status}.usd`, `${status} USD`, v.usd);
  }
  return out;
}

/** The rows whose value changed between two stats objects, in display order, with signed deltas.
 *  A role or tag present on only one side is compared against 0. */
export function diffStats(before: DeckStats, after: DeckStats): StatChange[] {
  const b = rows(before);
  const a = rows(after);
  const byKeyB: Record<string, (typeof b)[number]> = Object.fromEntries(b.map((r) => [r.key, r]));
  const byKeyA: Record<string, (typeof a)[number]> = Object.fromEntries(a.map((r) => [r.key, r]));

  const keys: string[] = [];
  for (const r of [...b, ...a]) {
    if (!keys.includes(r.key)) keys.push(r.key);
  }

  // Display order is by group, then by first appearance — a role that exists only on one side
  // must sit with the other roles, not trail the money rows.
  const groupOrder: StatChange["group"][] = ["size", "curve", "types", "color", "roles", "tags", "flags", "money"];
  const groupOf = (key: string) => (byKeyB[key] ?? byKeyA[key]).group;
  keys.sort((x, y) => groupOrder.indexOf(groupOf(x)) - groupOrder.indexOf(groupOf(y)));

  const changes: StatChange[] = [];
  for (const key of keys) {
    const row = byKeyB[key] ?? byKeyA[key];
    const prev = byKeyB[key]?.value ?? 0;
    const next = byKeyA[key]?.value ?? 0;
    if (prev === next) continue;

    changes.push({ group: row.group, key, label: row.label, before: prev, after: next, delta: round2(next - prev) });
  }
  return changes;
}
