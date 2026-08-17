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

/** Parse a plain-text decklist into card names.
 *
 *  Accepts the common `1x Card Name` / `1 Card Name` / `10x Card Name` shapes, ignores blank
 *  lines, `#` and `//` comments, and section headers (any line without a leading count).
 *  Strips trailing printing annotations like `(mar) 69` and foil markers like `*F*`, so a list
 *  copied from a deck editor still resolves. */
export function parseDecklist(text: string): string[] {
  const names: string[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#") || line.startsWith("//")) continue;

    const m = line.match(CARD_LINE);
    if (!m) continue; // no leading count -> header/comment, skip

    const name = cleanCardName(m[2]);
    if (name) names.push(name);
  }
  return names;
}
