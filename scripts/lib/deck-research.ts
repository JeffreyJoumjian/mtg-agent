/**
 * Shared helpers for the deck-finalizer tooling (`scripts/carddata.ts`, `scripts/deckcheck.ts`).
 *
 * Both commands read the same two things out of a deck's `research/` folder:
 *
 *   - `cards.txt`   — the local card cache. Cache-first is the rule: it is the source of truth,
 *                     and only genuine misses go to Scryfall (see `decks/README.md`).
 *   - `*_decks.json` — comparison samples used for the "field signal" lens in deck-finalizer.
 *
 * The `cards.txt` block format is load-bearing in both directions: `carddata` writes it and
 * `deckcheck` parses it back for type/mana information, so {@link cacheBlock} and
 * {@link parseCacheInfo} must stay in agreement.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { DECKS_DIR } from "./paths.ts";
import { cleanCardName } from "./decklist.ts";

/** One entry in a decklist or keep-pile: a cleaned card name and how many copies. */
export interface DeckEntry {
  name: string;
  qty: number;
}

/** The subset of a cached card block that `deckcheck` reasons about. */
export interface CachedCardInfo {
  typeLine: string;
  /** Comma-joined mana symbols this card produces, or `"-"` when it produces none. */
  produces: string;
}

/** Lines that are structural rather than cards — `deck-finalizer` points these tools straight
 *  at a `DECK.md`, whose header block would otherwise parse as four nonexistent cards. */
const HEADER_LINE = /^(Commander|Bracket|Total|Strategy)\b/;

/** `1 Sol Ring` / `1x Sol Ring`, with the count optional so bare keep-pile lines still parse. */
const COUNTED_LINE = /^(\d+)\s*[xX]?\s+(.*\S)$/;

/** Basic lands carry no signal in a field-coverage comparison — every deck runs them. */
const BASIC_LANDS = ["Swamp", "Plains", "Mountain", "Island", "Forest"];

export function researchDir(slug: string): string {
  return join(DECKS_DIR, slug, "research");
}

export function cardsCachePath(slug: string): string {
  return join(researchDir(slug), "cards.txt");
}

/**
 * Scryfall keys double-faced cards under the full `"Front // Back"` name, but decklists and
 * the cache are both looked up by front face. Everything that compares names goes through here.
 */
export function frontFace(name: string): string {
  return name.split(" // ")[0].split(" / ")[0].trim();
}

export function isBasicLand(name: string): boolean {
  return BASIC_LANDS.includes(frontFace(name));
}

/**
 * Resolve the deck slug from an explicit `--deck` flag, else infer it from a `--file` path that
 * points inside `decks/<slug>/`. Returns null when neither yields one, so the caller can print
 * its own usage message.
 */
export function deckSlugFrom(deck?: string, filePath?: string): string | null {
  if (deck) return deck;
  if (!filePath) return null;

  // Match on a POSIX-ified path so a Windows `decks\edgar-markov\DECK.md` still resolves.
  const posix = filePath.split("\\").join("/");
  return posix.match(/(?:^|\/)decks\/([a-z0-9-]+)\//)?.[1] ?? null;
}

/**
 * Strip the annotations deck editors and research notes attach to a name: a leading count,
 * parenthetical treatments like `(Showcase)`, and a trailing `[DSK] 138` printing reference.
 *
 * {@link cleanCardName} runs *before* the parenthesis strip, not after. It matches a set code
 * and its collector number as one unit (`(m10) 66`), so removing the parentheses first would
 * orphan the number and leave `Ponder 66`.
 *
 * No Magic card name contains a parenthesis or a bracket, so stripping those globally is safe.
 */
export function cleanEntryName(raw: string): string {
  const withoutCount = raw.replace(/^\s*\d+\s*[xX]?\s+/, "");
  const withoutPrintingRef = cleanCardName(withoutCount);
  const withoutTreatment = withoutPrintingRef.replace(/\s*\([^)]*\)\s*/g, " ");

  return withoutTreatment.replace(/\s*\[[A-Za-z0-9]+\]\s*\d*\s*$/, "").trim();
}

/**
 * Parse a decklist or an unstructured keep-pile into entries, in first-seen order, accumulating
 * repeated names.
 *
 * More permissive than `parseDecklist` in `decklist.ts`, which discards any line without a
 * leading count: a keep-pile is often pasted as bare names, and those must still parse.
 *
 * That leniency can't be unconditional, though. A `DECK.md` carries prose metadata like
 * `Game Changers (3/3 — at the bracket 3 cap): Ancient Tomb · …`, which would otherwise land in
 * the list as one absurd card. So the rule is decided per input: **if any line carries a count,
 * the list is a structured decklist and every card line must carry one.** Only a list with no
 * counts anywhere is treated as a bare keep-pile.
 */
export function parseKeepPile(text: string): DeckEntry[] {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) => line && !line.startsWith("#") && !line.startsWith(">") && !HEADER_LINE.test(line),
    );

  const requireCounts = lines.some((line) => COUNTED_LINE.test(line));

  const entries: DeckEntry[] = [];
  const indexByName: Record<string, number> = {};

  for (const line of lines) {
    const counted = line.match(COUNTED_LINE);
    if (requireCounts && !counted) continue;

    const name = cleanEntryName(counted ? counted[2] : line);
    if (!name) continue;

    const qty = counted ? Number(counted[1]) : 1;
    const existing = indexByName[name];

    if (existing === undefined) {
      indexByName[name] = entries.length;
      entries.push({ name, qty });
    } else {
      entries[existing].qty += qty;
    }
  }
  return entries;
}

export function readCacheText(slug: string): string {
  const path = cardsCachePath(slug);
  return existsSync(path) ? readFileSync(path, "utf8") : "";
}

/**
 * Pull one card's full cache block out of `cards.txt`, matched on front face so that asking for
 * `Agadeem's Awakening` finds the `## Agadeem's Awakening // Agadeem, the Undercrypt` heading.
 * Returns null when the card isn't cached.
 */
export function blockFor(name: string, cacheText: string): string | null {
  const escaped = frontFace(name).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const block = new RegExp(`^## ${escaped}(?: //.*)?\\n[\\s\\S]*?(?=^## |$(?![\\s\\S]))`, "m");

  return cacheText.match(block)?.[0].trim() ?? null;
}

/**
 * Index the cache by card name for the type/mana lookups `deckcheck` needs.
 *
 * Double-faced cards are indexed under **both** the full `"Front // Back"` heading and the front
 * face alone. Indexing only the full name (as the original Python did) meant a DFC land was
 * never recognised as a land, because every lookup comes in front-face-first.
 */
export function parseCacheInfo(cacheText: string): Record<string, CachedCardInfo> {
  const info: Record<string, CachedCardInfo> = {};
  const entry = /^## (.+?)\ncost=(.*?) \| type=(.*?) \| CI=(.*?) \| produces=(.*?) \|/gm;

  for (const match of cacheText.matchAll(entry)) {
    const [, name, , typeLine, , produces] = match;
    const parsed = { typeLine, produces };

    info[name] = parsed;
    info[frontFace(name)] = parsed;
  }
  return info;
}

/**
 * Render one Scryfall card into a `cards.txt` block.
 *
 * Takes the raw Scryfall object rather than a `CardSummary` because the cache format predates
 * that projection and differs from it: faces are joined as `Name: text` with ` // `, and the
 * price stays the API's raw string so cached values don't drift by re-formatting.
 */
export function cacheBlock(card: any): string {
  const faces: any[] = Array.isArray(card.card_faces) ? card.card_faces : [];

  const cost = card.mana_cost || faces.map((f) => f.mana_cost ?? "").join("") || "-";
  const colorIdentity = (card.color_identity ?? []).join("") || "-";
  const produces = (card.produced_mana ?? []).join(",") || "-";
  const usd = card.prices?.usd || "?";
  const oracle =
    card.oracle_text ??
    faces.map((f) => `${f.name ?? ""}: ${f.oracle_text ?? ""}`).join(" // ");

  const stats = `cost=${cost} | type=${card.type_line ?? ""} | CI=${colorIdentity} | produces=${produces} | usd=$${usd}`;

  return `## ${card.name}\n${stats}\n${(oracle ?? "").replace(/\n/g, " ")}\n`;
}

/**
 * Read every comparison sample under a deck's `research/` folder, as one name-set per sample
 * deck. Two shapes exist in the repo: `premium_*_decks.json` (each value has `main`/`cmd`
 * arrays of `{n: name}`) and `new_*_decks_clean.json` (each value is either that same shape or
 * a plain name-keyed object). Returns an empty array when the deck has no sample.
 */
export function loadFieldSamples(slug: string): string[][] {
  const dir = researchDir(slug);
  if (!existsSync(dir)) return [];

  const samples: string[][] = [];
  const files = readdirSync(dir).sort();

  for (const file of files) {
    const isPremium = /^premium_.*_decks\.json$/.test(file);
    const isClean = /^new_.*_decks_clean\.json$/.test(file);
    if (!isPremium && !isClean) continue;

    let parsed: Record<string, any>;
    try {
      parsed = JSON.parse(readFileSync(join(dir, file), "utf8"));
    } catch {
      console.error(`[skipping unreadable sample: ${file}]`);
      continue;
    }

    for (const deck of Object.values(parsed)) {
      const names = Array.isArray(deck?.main)
        ? [...deck.main, ...(deck.cmd ?? [])].map((c: any) => c.n)
        : Object.keys(deck ?? {});

      samples.push(names.filter(Boolean).map(frontFace));
    }
  }
  return samples;
}
