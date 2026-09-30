/**
 * One decklist line: `1 Sol Ring` or `1x Sol Ring` (the convention in `decks/README.md`).
 * Capture 1 is the quantity, capture 2 the still-annotated name — run it through
 * {@link cleanCardName} before looking the card up.
 */
export const CARD_LINE = /^(\d+)\s*[xX]?\s+(.+)$/;

/**
 * Strip the trailing annotations deck editors add, so a pasted list still resolves:
 * printing refs like `(mar) 69`, foil markers like `*F*`, and any other `*...*` tag a
 * decklist may carry (e.g. a `*GC*` Game Changer marker).
 *
 * Every consumer of {@link CARD_LINE} must apply this — a raw capture 2 will silently fail
 * to match a card name.
 */
export function cleanCardName(raw: string): string {
  return raw
    .replace(/\s*\*[^*]+\*\s*$/, "") // trailing "*F*" foil / "*GC*" marker (may sit after the set)
    .replace(/\s*\((?:[a-z0-9]{2,5})\)\s*[\d—-]*\s*$/i, "") // trailing "(set) 123"
    .trim();
}

/** One parsed decklist line, with the `## ` section heading it sits under. */
export interface DeckEntry {
  /** Copies of this card on the line — the `4` in `4x Island`. */
  qty: number;
  /** Card name, already run through {@link cleanCardName}. */
  name: string;
  /** Text of the nearest preceding `## ` heading, e.g. `Lands (36)`. Empty before the first one. */
  section: string;
}

/** Parse a plain-text decklist into {@link DeckEntry} records, preserving quantity and section.
 *
 *  Same line grammar as {@link parseDecklist} — this is the richer form, for consumers that need
 *  the count (an export) or the role a card was filed under (commander detection). */
export function parseDecklistEntries(text: string): DeckEntry[] {
  const entries: DeckEntry[] = [];
  let section = "";

  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;

    if (line.startsWith("##")) {
      section = line.replace(/^#+\s*/, "").trim();
      continue;
    }
    if (line.startsWith("#") || line.startsWith("//")) continue;

    const m = line.match(CARD_LINE);
    if (!m) continue; // no leading count -> header/comment/prose, skip

    const name = cleanCardName(m[2]);
    if (name) entries.push({ qty: Number(m[1]), name, section });
  }
  return entries;
}

/** Parse a plain-text decklist into card names.
 *
 *  Accepts the common `1x Card Name` / `1 Card Name` / `10x Card Name` shapes, ignores blank
 *  lines, `#` and `//` comments, and section headers (any line without a leading count).
 *  Strips trailing printing annotations like `(mar) 69` and foil markers like `*F*`, so a list
 *  copied from a deck editor still resolves.
 *
 *  One name per *line*, not per copy — `4x Island` yields a single `"Island"`. */
export function parseDecklist(text: string): string[] {
  return parseDecklistEntries(text).map((e) => e.name);
}

/** Index looked-up cards by the name a decklist line would use.
 *
 *  Scryfall keys a double-faced card under its full `"Front // Back"` name, while a decklist
 *  carries only the front face (`1x Valakut Awakening`). Both keys are indexed, full names
 *  first, so a card whose real name equals another card's front face is never shadowed by the
 *  alias. Consumers that match decklist lines against Scryfall results must use this — a plain
 *  `name.toLowerCase()` map misses every DFC, and a caller that skips the miss loses that card's
 *  price *and* its legality and colour-identity checks with no warning. */
export function indexByDeckName<T extends { name: string }>(cards: T[]): Map<string, T> {
  const byName = new Map<string, T>();
  for (const c of cards) byName.set(c.name.toLowerCase(), c);

  for (const c of cards) {
    const alias = cleanCardName(c.name).split(" // ")[0].split(" / ")[0].trim().toLowerCase();
    if (!byName.has(alias)) byName.set(alias, c);
  }
  return byName;
}
