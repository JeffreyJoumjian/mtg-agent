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

    const m = line.match(/^(\d+)\s*[xX]?\s+(.+)$/);
    if (!m) continue; // no leading count -> header/comment, skip

    const name = m[2]
      .replace(/\s*\*[^*]+\*\s*$/, "") // trailing "*F*" foil marker (may sit after the set)
      .replace(/\s*\((?:[a-z0-9]{2,5})\)\s*[\d—-]*\s*$/i, "") // trailing "(set) 123"
      .trim();
    if (name) names.push(name);
  }
  return names;
}
