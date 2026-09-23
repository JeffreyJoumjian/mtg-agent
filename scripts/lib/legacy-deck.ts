/**
 * Readers for the Markdown deck files that predate `deck.json` — `DECK*.md` (the list, grouped
 * under `## Role (n)` headings) and `STATUS.md` (the same cards with acquisition status).
 *
 * Used by the one-time migration and by the history view for snapshots written before the
 * migration. Nothing writes these formats any more.
 */
import { CARD_LINE, cleanCardName } from "./decklist.ts";
import { type CardStatus, type DeckList, type ListSection } from "./deck-model.ts";

export interface LegacyDeck {
  /** The `# ` title with any ` — Decklist` suffix removed. */
  title: string;
  /** Contents of the `Commander: …` preamble line, if present. */
  commanderLine: string | null;
  bracket: number | null;
  /** Preamble prose (identity, engine notes) with the bookkeeping lines removed. */
  description: string;
  list: DeckList;
  /** Cards that carried a `*GC*` marker — informational only; the model derives GC from Scryfall. */
  gameChangers: string[];
}

const TITLE_SUFFIX = /\s+[—–-]\s+Decklist\s*$/i;

/** Lines in the preamble that are bookkeeping, not description. */
function isBookkeeping(line: string): boolean {
  return (
    /^Commander:/i.test(line) ||
    /^Bracket:?\s*\d/.test(line) ||
    /^Total:/i.test(line) ||
    /^Game Changers\b/i.test(line) ||
    /^Authoritative current list/i.test(line) ||
    /^Mirror of DECK\.md/i.test(line) ||
    /^Generated from DECK\.md/i.test(line) ||
    /^Prices are Scryfall/i.test(line)
  );
}

/** `## Lands (36)` / `## Ramp (~10)` → `Lands` / `Ramp`. */
function headingName(line: string): string {
  return line
    .replace(/^#+\s*/, "")
    .replace(/\s*\([^)]*\)\s*$/, "")
    .trim();
}

export function parseLegacyDeckMd(text: string, label: string): LegacyDeck {
  const lines = text.split("\n");
  let title = "";
  let commanderLine: string | null = null;
  let bracket: number | null = null;
  const descriptionLines: string[] = [];
  const sections: ListSection[] = [];
  const gameChangers: string[] = [];
  let current: ListSection | null = null;

  for (const raw of lines) {
    const line = raw.trim();

    if (line.startsWith("## ")) {
      current = { name: headingName(line), cards: [] };
      sections.push(current);
      continue;
    }
    if (line.startsWith("<!--")) continue;

    const cardLine = line.match(CARD_LINE);
    if (!current && cardLine && !/^[0-9]+\s*(cards?|lands?|spells?)\b/i.test(line)) {
      // A flat list with no `## ` headings (some early snapshots): file everything under one section.
      current = { name: "Cards", cards: [] };
      sections.push(current);
    }

    if (current) {
      if (!cardLine) continue;

      const name = cleanCardName(cardLine[2]);
      if (!name) continue;

      if (/\*GC\*/i.test(cardLine[2])) gameChangers.push(name);
      current.cards.push({ name, qty: Number(cardLine[1]) });
      continue;
    }

    // Still in the preamble.
    if (!line) {
      descriptionLines.push("");
      continue;
    }
    if (line.startsWith("# ") && !title) {
      title = line.slice(2).replace(TITLE_SUFFIX, "").trim();
      continue;
    }

    const unquoted = line.replace(/^>\s?/, "").trim();
    const commander = unquoted.match(/^Commander:\s*(.+)$/i);
    if (commander) {
      commanderLine = commander[1].trim();
    }
    const bracketMatch = unquoted.match(/Bracket:?\s*(\d)/i);
    if (bracketMatch && bracket === null) {
      bracket = Number(bracketMatch[1]);
    }
    if (isBookkeeping(unquoted)) continue;

    descriptionLines.push(unquoted);
  }

  const description = descriptionLines.join("\n").replace(/\n{3,}/g, "\n\n").trim();

  return {
    title,
    commanderLine,
    bracket,
    description,
    list: { label, kind: "deck", ...(bracket !== null ? { bracket } : {}), sections },
    gameChangers,
  };
}

const STATUS_WORD = /\b(OWNED|HAVE|BUY|PROXY|CONSIDERING|CUT)\b/;
/** Where the card name ends: an em-dash separator, an emoji marker, or a bare status word. */
const NAME_END = /\s+(?:—|–|✅|🛒|💰|(?:OWNED|HAVE|BUY|PROXY|CONSIDERING|CUT)\b)/;

/** Parenthetical right after the status that is a price snapshot rather than a note. */
const PRICE_NOTE = /^\(\s*(?:\$|USD|no USD|—|\?)[^)]*\)\s*/i;

/**
 * Read a STATUS.md into `name → { status, note? }`. Lenient by necessity: real files mix
 * `1x Name — OWNED`, `1 Name ✅`, `1 Name 🛒 BUY ($4.62)`, `1 Name 💰 PROXY ($64) — Game Changer 3/3`
 * and `1 Name — PROXY  ← Game Changer`. `HAVE` maps to `OWNED`; `CUT` lines are dropped; price
 * snapshots and Game Changer arrows are not notes. Lines with no status are skipped.
 */
export function parseLegacyStatusMd(text: string): Record<string, { status: CardStatus; note?: string }> {
  const out: Record<string, { status: CardStatus; note?: string }> = {};
  let sectionDefault: CardStatus | null = null;

  for (const raw of text.split("\n")) {
    const line = raw.trim();

    if (line.startsWith("## ")) {
      // `## Lands (33) — all PROXY per your standing rule` sets a default for the section.
      const dflt = line.match(/—\s*all\s+(OWNED|HAVE|BUY|PROXY|CONSIDERING)\b/i);
      sectionDefault = dflt ? (dflt[1].toUpperCase() === "HAVE" ? "OWNED" : (dflt[1].toUpperCase() as CardStatus)) : null;
      continue;
    }

    // Compact files put several cards on one line separated by ` · `; bold wraps some names.
    for (const segment of line.split(/\s+·\s+/)) {
      readStatusSegment(segment.replace(/\*\*/g, ""), sectionDefault, out);
    }
  }
  return out;
}

function readStatusSegment(
  segment: string,
  sectionDefault: CardStatus | null,
  out: Record<string, { status: CardStatus; note?: string }>,
): void {
  {
    // Price snapshots (`($51.90)`) sit anywhere in a segment and are never part of a name.
    const m = segment.replace(/\s*\(\$[^)]*\)/g, "").trim().match(CARD_LINE);
    if (!m) return;

    const rest = m[2];
    const end = rest.search(NAME_END);
    const name = cleanCardName(end === -1 ? rest : rest.slice(0, end));
    const tail = end === -1 ? "" : rest.slice(end);
    if (!name) return;

    let status: CardStatus | "CUT" | null = null;
    const word = tail.match(STATUS_WORD);
    if (word) status = word[1] === "HAVE" ? "OWNED" : (word[1] as CardStatus | "CUT");
    else if (tail.includes("✅")) status = "OWNED";
    else if (tail.includes("🛒")) status = "BUY";
    else if (sectionDefault) status = sectionDefault;
    if (!status || status === "CUT") return;

    let note = word ? tail.slice((word.index ?? 0) + word[0].length) : "";
    note = note
      .replace(/←\s*Game Changer.*$/i, "")
      .replace(/\s*[—–-]\s*Game Changer.*$/i, "")
      .replace(/💰\s*proxy\?/i, "")
      .trim()
      .replace(PRICE_NOTE, "")
      .trim()
      // `← best value in the deck` is a real note; only the Game Changer arrow was bookkeeping.
      .replace(/^←\s*/, "")
      .trim();
    const noteText = note.replace(/^\((.*)\)$/, "$1").trim();

    out[name] = { status, ...(noteText ? { note: noteText } : {}) };
  }
}

/** `DECK.md` → main; `DECK-B4.md` → `b4` / `B4`; `DECK-KRATOS-ATREUS.md` → `kratos-atreus` / `Kratos Atreus`. */
export function variantFromFilename(file: string): { id: string; label: string } {
  const m = file.match(/^DECK(?:-([^/]+))?\.md$/);
  const variant = m?.[1];
  if (!variant) return { id: "main", label: "Main" };

  const id = variant.toLowerCase();
  const words = variant.split("-");
  const label = words.length === 1 && /\d/.test(variant)
    ? variant.toUpperCase()
    : words.map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(" ");
  return { id, label };
}
