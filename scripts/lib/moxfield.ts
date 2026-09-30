/**
 * Turn a list from `deck.json` into a Moxfield/Archidekt-importable list.
 *
 * The export is **derived, never hand-maintained** (deck-brain §1.4): `deck.json` stays the
 * single source of truth and `MOXFIELD*.txt` is regenerated from it by the apply path. Editing
 * the export by hand is how the two drift apart.
 */
import { isCommanderSection, type CardMeta, type DeckList, type Printing } from "./deck-model.ts";

/** A printing reference as Moxfield wants it appended: `(LTC) 264`, optionally `(SLD) 7010 *F*`. */
type PrintingRef = string;

/**
 * The cross-deck reserve of preferred printings — the copies the user actually owns, keyed by
 * card. Every deck's export reads it; a deck's own `cards[name].printing` pin overrides it.
 */
export const GLOBAL_PRINTINGS_PATH = "decks/_printings.txt";

/**
 * `1 Sol Ring (LTC) 264` — a line of a preferred-printings file.
 *
 * The collector number may carry letters or hyphens (`C18-232`, `260p`), and an optional foil
 * marker may trail it (`1 Counterspell (SLD) 7010 *F*`). The marker is captured **with** the
 * printing so it survives into the export; Moxfield reads it as "this copy is foil".
 */
const PRINTING_LINE = /^\d+\s+(.+?)\s+(\([A-Z0-9]+\)\s+\S+(?:\s+\*[^*]+\*)?)\s*$/;
const PRINTING_REF = /^\(([A-Za-z0-9]+)\)\s+(\S+?)(?:\s+\*F\*)?$/;

/** The front face is the whole card for lookup purposes — `!"Tony Stark"` resolves the DFC. */
function frontFace(name: string): string {
  return name.split(" // ")[0].trim();
}

/** Read a preferred-printings file into a `front face name -> "(SET) 123"` map. Lines that
 *  aren't printing references (headers, prose, bare `1 Sol Ring`) are ignored. */
export function parsePrintings(text: string): Record<string, PrintingRef> {
  const printings: Record<string, PrintingRef> = {};

  for (const raw of text.split("\n")) {
    const m = raw.trim().match(PRINTING_LINE);
    if (!m) continue;

    printings[frontFace(m[1])] = m[2];
  }
  return printings;
}

/** `"(SLD) 7010 *F*"` → `{ set: "sld", collectorNumber: "7010", foil: true }`; null if malformed. */
export function parsePrintingRef(ref: string): Printing | null {
  const m = ref.trim().match(PRINTING_REF);
  if (!m) return null;

  const foil = /\*F\*\s*$/.test(ref.trim());
  return { set: m[1].toLowerCase(), collectorNumber: m[2], ...(foil ? { foil: true } : {}) };
}

export function printingToRef(p: Printing): PrintingRef {
  return `(${p.set.toUpperCase()}) ${p.collectorNumber}${p.foil ? " *F*" : ""}`;
}

/** The printings pinned in a deck's card metadata, keyed by front face like the file form. */
export function printingsFromMeta(cards: Record<string, CardMeta>): Record<string, PrintingRef> {
  const out: Record<string, PrintingRef> = {};

  for (const [name, meta] of Object.entries(cards)) {
    if (meta.printing) out[frontFace(name)] = printingToRef(meta.printing);
  }
  return out;
}

/** Layer two printings maps: every entry in `override` wins, and `base` fills the gaps. */
export function mergePrintings(
  base: Record<string, PrintingRef>,
  override: Record<string, PrintingRef>,
): Record<string, PrintingRef> {
  return { ...base, ...override };
}

export interface MoxfieldExport {
  /** Import lines, commander first, then the rest alphabetically. */
  lines: string[];
  /** Total cards, counting copies — should be 100 for a legal Commander deck. */
  total: number;
  /** Names with no entry in the printings map, so the caller can report them. */
  missingPrintings: string[];
}

/** Build the import list. Cards under a Commander section lead, in list order; everything else
 *  follows sorted by name. A card with no printing is emitted bare, and Moxfield picks a default. */
export function toMoxfield(list: DeckList, printings: Record<string, PrintingRef> = {}): MoxfieldExport {
  const commanders = list.sections.filter((s) => isCommanderSection(s.name)).flatMap((s) => s.cards);
  const rest = list.sections
    .filter((s) => !isCommanderSection(s.name))
    .flatMap((s) => s.cards)
    .sort((a, b) => a.name.localeCompare(b.name));

  const lines: string[] = [];
  const missingPrintings: string[] = [];
  for (const entry of [...commanders, ...rest]) {
    const printing = printings[frontFace(entry.name)];
    lines.push(printing ? `${entry.qty} ${entry.name} ${printing}` : `${entry.qty} ${entry.name}`);
    if (!printing) missingPrintings.push(entry.name);
  }

  const total = [...commanders, ...rest].reduce((sum, e) => sum + e.qty, 0);
  return { lines, total, missingPrintings };
}

/** `main` → `MOXFIELD.txt`; `b4` → `MOXFIELD-B4.txt`. */
export function moxfieldFileFor(listId: string): string {
  return listId === "main" ? "MOXFIELD.txt" : `MOXFIELD-${listId.toUpperCase()}.txt`;
}
