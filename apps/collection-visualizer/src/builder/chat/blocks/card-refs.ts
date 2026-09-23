/** Pure: find card references in assistant text. Two forms are recognised — the app's `[[Name]]`
 *  and CLAUDE.md's Scryfall exact-name link `[Name](https://scryfall.com/search?q=%21%22Name%22)`. */

export type TextPart = { type: "text"; text: string } | { type: "card"; name: string };

const REF = /\[\[([^\]]+)\]\]|\[([^\]]+)\]\(https?:\/\/scryfall\.com\/search\?q=%21%22[^)]*%22\)/g;

export function splitCardRefs(text: string): TextPart[] {
  const parts: TextPart[] = [];
  let last = 0;

  for (const m of text.matchAll(REF)) {
    const start = m.index ?? 0;
    if (start > last) parts.push({ type: "text", text: text.slice(last, start) });
    parts.push({ type: "card", name: (m[1] ?? m[2]).trim() });
    last = start + m[0].length;
  }
  if (last < text.length) parts.push({ type: "text", text: text.slice(last) });
  if (parts.length === 0) parts.push({ type: "text", text });
  return parts;
}

/** Rewrite both reference forms into `[Name](card:Name)` links, which the markdown renderer turns
 *  into chips. Done as a text pass so references inside lists, tables and emphasis all work. */
export function cardRefsToMarkdown(text: string): string {
  return text.replace(REF, (_m, doubleBracket: string | undefined, linked: string | undefined) => {
    const name = (doubleBracket ?? linked ?? "").trim();
    return `[${name}](card:${encodeURIComponent(name)})`;
  });
}
