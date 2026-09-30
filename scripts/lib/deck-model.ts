/**
 * The deck model behind `decks/<slug>/deck.json` — one file per deck holding every list (the main
 * 100, variants, pools) plus per-card status, tags, notes and printing pins.
 *
 * Zero dependencies on purpose: this module is imported by the repo-root CLIs and by the app's
 * server through a path alias, so validation is hand-written rather than schema-library driven.
 * Card names in a deck are always Scryfall's canonical spelling (front face for double-faced
 * cards); every writer canonicalises through `card-cache.ts` before calling into here.
 */

/** Acquisition status of a card in this deck. The pilot proxies by default (deck-brain §0.1). */
export type CardStatus = "OWNED" | "BUY" | "PROXY" | "CONSIDERING";
export const CARD_STATUSES: CardStatus[] = ["OWNED", "BUY", "PROXY", "CONSIDERING"];

/** One line of a list: a card, how many copies, and an optional per-list note (a sideboard
 *  entry's "bring in against …", say). */
export interface ListEntry {
  name: string;
  qty: number;
  note?: string;
}

/** A role heading and the cards filed under it — `Lands`, `Ramp`, `Win Conditions`. */
export interface ListSection {
  name: string;
  cards: ListEntry[];
}

/** One list inside a deck. `deck` lists target 100 cards; `pool` lists (sideboard, pocket, cut)
 *  have no size target. */
export interface DeckList {
  label: string;
  kind: "deck" | "pool";
  /** Commander bracket this list is built for (1–5). Per list because variants differ. */
  bracket?: number;
  sections: ListSection[];
}

/** A pinned printing, as Moxfield wants it: set code + collector number (+ foil). */
export interface Printing {
  set: string;
  collectorNumber: string;
  foil?: boolean;
}

/** Per-deck metadata for one card. Survives the card leaving every list, so a card that comes
 *  back keeps its tags. Game Changer status is *not* here — it is derived from Scryfall. */
export interface CardMeta {
  status?: CardStatus;
  tags?: string[];
  note?: string;
  printing?: Printing;
}

/** The whole `deck.json`. */
export interface Deck {
  schema: 1;
  name: string;
  format: "commander";
  /** Short markdown blurb — the deck's identity and gameplan in a paragraph or two. */
  description?: string;
  /** Lists keyed by kebab-case id; `main` is the primary list. */
  lists: Record<string, DeckList>;
  /** Card metadata keyed by canonical card name. */
  cards: Record<string, CardMeta>;
}

export const MAIN_LIST = "main";

/** The role skeleton a new deck starts with (matches `decks/README.md`). */
export const DEFAULT_SECTIONS = [
  "Commander",
  "Lands",
  "Ramp",
  "Card Draw",
  "Removal",
  "Board Wipes",
  "Theme / Synergy",
  "Win Conditions",
];

/** Tags offered as chips. Free-form tags are allowed too; these are just the common vocabulary. */
export const SUGGESTED_TAGS = [
  "ramp",
  "fast-mana",
  "draw",
  "removal",
  "wipe",
  "interaction",
  "protection",
  "tutor",
  "recursion",
  "drain",
  "lifegain",
  "sac-outlet",
  "token",
  "aristocrat",
  "anthem",
  "evasion",
  "engine",
  "combo-piece",
  "wincon",
  "finisher",
  "utility-land",
  "stax",
  "synergy",
];

export class DeckParseError extends Error {
  constructor(readonly errors: string[]) {
    super(errors.join("; "));
    this.name = "DeckParseError";
  }
}

/** Check an arbitrary JSON value against the deck shape, reporting every problem at once. */
export function validateDeck(raw: unknown): { ok: true; deck: Deck } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  const d = raw as any;

  if (!d || typeof d !== "object" || Array.isArray(d)) {
    return { ok: false, errors: ["deck must be an object"] };
  }
  if (d.schema !== 1) {
    errors.push(`schema must be 1 (got ${JSON.stringify(d.schema)})`);
  }
  if (typeof d.name !== "string" || !d.name.trim()) {
    errors.push("name must be a non-empty string");
  }
  if (d.format !== undefined && d.format !== "commander") {
    errors.push('format must be "commander"');
  }
  if (d.description !== undefined && typeof d.description !== "string") {
    errors.push("description must be a string");
  }

  if (!d.lists || typeof d.lists !== "object" || Array.isArray(d.lists)) {
    errors.push("lists must be an object keyed by list id");
  } else {
    for (const [id, list] of Object.entries<any>(d.lists)) {
      validateList(id, list, errors);
    }
  }

  if (d.cards !== undefined && (typeof d.cards !== "object" || Array.isArray(d.cards))) {
    errors.push("cards must be an object keyed by card name");
  } else if (d.cards) {
    for (const [name, meta] of Object.entries<any>(d.cards)) {
      validateMeta(name, meta, errors);
    }
  }

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    deck: {
      schema: 1,
      name: d.name,
      format: "commander",
      ...(d.description ? { description: d.description } : {}),
      lists: d.lists,
      cards: d.cards ?? {},
    },
  };
}

function validateList(id: string, list: any, errors: string[]): void {
  if (!/^[a-z0-9-]+$/.test(id)) errors.push(`list id "${id}" must be kebab-case`);
  if (typeof list?.label !== "string" || !list.label) errors.push(`lists.${id}.label must be a non-empty string`);
  if (list?.kind !== "deck" && list?.kind !== "pool") errors.push(`lists.${id}.kind must be "deck" or "pool"`);
  if (list?.bracket !== undefined && !(Number.isInteger(list.bracket) && list.bracket >= 1 && list.bracket <= 5)) {
    errors.push(`lists.${id}.bracket must be an integer from 1 to 5`);
  }
  if (!Array.isArray(list?.sections)) {
    errors.push(`lists.${id}.sections must be an array`);
    return;
  }

  list.sections.forEach((s: any, i: number) => {
    if (typeof s?.name !== "string" || !s.name) errors.push(`lists.${id}.sections[${i}].name must be a non-empty string`);
    if (!Array.isArray(s?.cards)) {
      errors.push(`lists.${id}.sections[${i}].cards must be an array`);
      return;
    }
    s.cards.forEach((c: any, j: number) => {
      const at = `lists.${id}.sections[${i}].cards[${j}]`;
      if (typeof c?.name !== "string" || !c.name.trim()) errors.push(`${at}.name must be a non-empty string`);
      if (!Number.isInteger(c?.qty) || c.qty < 1) errors.push(`${at}.qty must be a positive integer`);
      if (c?.note !== undefined && typeof c.note !== "string") errors.push(`${at}.note must be a string`);
    });
  });
}

function validateMeta(name: string, meta: any, errors: string[]): void {
  if (!meta || typeof meta !== "object") {
    errors.push(`cards["${name}"] must be an object`);
    return;
  }
  if (meta.status !== undefined && !CARD_STATUSES.includes(meta.status)) {
    errors.push(`cards["${name}"].status must be one of ${CARD_STATUSES.join(", ")}`);
  }
  if (meta.tags !== undefined && (!Array.isArray(meta.tags) || meta.tags.some((t: unknown) => typeof t !== "string"))) {
    errors.push(`cards["${name}"].tags must be an array of strings`);
  }
  if (meta.note !== undefined && typeof meta.note !== "string") {
    errors.push(`cards["${name}"].note must be a string`);
  }
  if (meta.printing !== undefined) {
    const p = meta.printing;
    if (typeof p?.set !== "string" || typeof p?.collectorNumber !== "string") {
      errors.push(`cards["${name}"].printing must have string set and collectorNumber`);
    }
  }
}

/** Parse `deck.json` text. Throws {@link DeckParseError} carrying every problem found. */
export function parseDeck(text: string): Deck {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch (err) {
    throw new DeckParseError([`invalid JSON: ${err instanceof Error ? err.message : String(err)}`]);
  }

  const res = validateDeck(raw);
  if (!res.ok) throw new DeckParseError(res.errors);

  return res.deck;
}

/** Sort each non-Commander section's cards by name and drop entries with no copies. The
 *  Commander section keeps its order (partner order is meaningful). Returns a new object. */
export function normalizeList(list: DeckList): DeckList {
  return {
    ...list,
    sections: list.sections.map((s) => {
      const cards = s.cards.filter((c) => c.qty >= 1).map((c) => ({ ...c }));

      if (!isCommanderSection(s.name)) cards.sort((a, b) => a.name.localeCompare(b.name));
      return { name: s.name, cards };
    }),
  };
}

const j = (v: unknown): string => JSON.stringify(v);

/** Serialise a deck with a fixed key order and one card entry per line, so a swap is a two-line
 *  git diff and the file stays readable by people and models alike. */
export function formatDeck(deck: Deck): string {
  const out: string[] = ["{", `  "schema": 1,`, `  "name": ${j(deck.name)},`, `  "format": "commander",`];
  if (deck.description) out.push(`  "description": ${j(deck.description)},`);

  out.push(`  "lists": {`);
  const listIds = Object.keys(deck.lists);
  listIds.forEach((id, li) => {
    const list = normalizeList(deck.lists[id]);
    out.push(`    ${j(id)}: {`, `      "label": ${j(list.label)},`, `      "kind": ${j(list.kind)},`);
    if (list.bracket !== undefined) out.push(`      "bracket": ${list.bracket},`);
    out.push(`      "sections": [`);

    list.sections.forEach((s, si) => {
      out.push(`        {`, `          "name": ${j(s.name)},`, `          "cards": [`);
      s.cards.forEach((c, ci) => {
        const fields = [`"name": ${j(c.name)}`, `"qty": ${c.qty}`, ...(c.note ? [`"note": ${j(c.note)}`] : [])];
        out.push(`            { ${fields.join(", ")} }${ci < s.cards.length - 1 ? "," : ""}`);
      });
      out.push(`          ]`, `        }${si < list.sections.length - 1 ? "," : ""}`);
    });

    out.push(`      ]`, `    }${li < listIds.length - 1 ? "," : ""}`);
  });
  out.push(`  },`, `  "cards": {`);

  const names = Object.keys(deck.cards).sort((a, b) => a.localeCompare(b));
  names.forEach((name, ni) => {
    const m = deck.cards[name];
    const fields: string[] = [];
    if (m.status) fields.push(`"status": ${j(m.status)}`);
    if (m.tags && m.tags.length > 0) fields.push(`"tags": ${j(m.tags)}`);
    if (m.note) fields.push(`"note": ${j(m.note)}`);
    if (m.printing) fields.push(`"printing": ${j(m.printing)}`);
    out.push(`    ${j(name)}: { ${fields.join(", ")} }${ni < names.length - 1 ? "," : ""}`);
  });

  out.push(`  }`, `}`);
  return out.join("\n") + "\n";
}

/** A brand-new deck: the default role skeleton, no cards. */
export function emptyDeck(name: string): Deck {
  return {
    schema: 1,
    name,
    format: "commander",
    lists: {
      [MAIN_LIST]: { label: "Main", kind: "deck", sections: DEFAULT_SECTIONS.map((n) => ({ name: n, cards: [] })) },
    },
    cards: {},
  };
}

export function isCommanderSection(name: string): boolean {
  return /^commander/i.test(name.trim());
}

/** Every entry with the section it sits in, in list order. */
export function listEntries(list: DeckList): (ListEntry & { section: string })[] {
  return list.sections.flatMap((s) => s.cards.map((c) => ({ ...c, section: s.name })));
}

/** Unique card names in list order — `7 Forest` contributes one name. */
export function listNames(list: DeckList): string[] {
  const seen: Record<string, true> = {};
  const names: string[] = [];

  for (const entry of listEntries(list)) {
    if (seen[entry.name]) continue;

    seen[entry.name] = true;
    names.push(entry.name);
  }
  return names;
}

/** Total cards counting copies — the number that should read 100. */
export function listSize(list: DeckList): number {
  return listEntries(list).reduce((sum, e) => sum + e.qty, 0);
}

export function commandersOf(list: DeckList): string[] {
  return list.sections.filter((s) => isCommanderSection(s.name)).flatMap((s) => s.cards.map((c) => c.name));
}

/** Locate a card in a list by name, case-insensitively. */
export function findEntry(list: DeckList, name: string): { section: string; entry: ListEntry } | null {
  const wanted = name.trim().toLowerCase();

  for (const section of list.sections) {
    const entry = section.cards.find((c) => c.name.toLowerCase() === wanted);
    if (entry) return { section: section.name, entry };
  }
  return null;
}

const BASIC_LANDS = ["plains", "island", "swamp", "mountain", "forest", "wastes"];

/** Basic lands are the one place multiple copies are normal. */
export function isBasicLand(name: string): boolean {
  const bare = name.trim().toLowerCase().replace(/^snow-covered /, "");
  return BASIC_LANDS.includes(bare);
}

/** The list a command should act on: the explicit id, else `main`, else the first list. Throws
 *  with the available ids when the explicit id does not exist. */
export function pickList(deck: Deck, listId?: string): { id: string; list: DeckList } {
  const ids = Object.keys(deck.lists);
  const id = listId ?? (deck.lists[MAIN_LIST] ? MAIN_LIST : ids[0]);
  const list = id === undefined ? undefined : deck.lists[id];

  if (!list) throw new Error(`no list "${listId ?? id}" in this deck (have: ${ids.join(", ") || "none"})`);
  return { id, list };
}

/** `"Bracket 4"` → `"bracket-4"`; the id a new list gets from its label. */
export function listIdFromLabel(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
