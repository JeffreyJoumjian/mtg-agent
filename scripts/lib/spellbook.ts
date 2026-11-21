/** Commander Spellbook client: which known combos a set of cards contains, or is one card away
 *  from. Used by the EDHPlay views (combos a pod assembled, combos in an opponent's list) and the
 *  extension's live combo watch, which only ever sends cards already revealed on the table.
 *
 *  `POST https://backend.commanderspellbook.com/find-my-combos` with `{commanders, main}` answers
 *  `{results: {included, almostIncluded, …}}`. Answers are cached in `data/spellbook-cache.json`
 *  for 7 days, keyed by the sorted card list; delete the file and it rebuilds. */
import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { DATA_DIR } from "./paths.ts";

const ENDPOINT = "https://backend.commanderspellbook.com/find-my-combos";
const CACHE_PATH = resolve(DATA_DIR, "spellbook-cache.json");
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

export interface Combo {
  id: string;
  /** Card names the combo uses. */
  cards: string[];
  /** What it produces ("Infinite mana", "Win the game"). */
  produces: string[];
  description: string;
  manaNeeded: string;
  /** Spellbook's bracket tag (`R`uthless, `S`picy, `P`owerful, `O`ddball, `E`xhibition…). */
  bracketTag: string;
  popularity: number;
  /** For an "almost" combo, the cards from the combo that weren't in the list. */
  missing: string[];
}

export interface ComboResult {
  included: Combo[];
  almostIncluded: Combo[];
}

type Json = Record<string, unknown>;

function isObj(v: unknown): v is Json {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function toCombo(v: unknown, have: string[]): Combo | null {
  if (!isObj(v) || typeof v.id !== "string") {
    return null;
  }

  const cards: string[] = [];
  for (const use of Array.isArray(v.uses) ? v.uses : []) {
    if (isObj(use) && isObj(use.card) && typeof use.card.name === "string") {
      cards.push(use.card.name);
    }
  }

  const produces: string[] = [];
  for (const p of Array.isArray(v.produces) ? v.produces : []) {
    if (isObj(p) && isObj(p.feature) && typeof p.feature.name === "string") {
      produces.push(p.feature.name);
    }
  }

  const haveKeys = have.map((h) => h.toLowerCase());
  return {
    id: v.id,
    cards,
    produces,
    description: typeof v.description === "string" ? v.description : "",
    manaNeeded: typeof v.manaNeeded === "string" ? v.manaNeeded : "",
    bracketTag: typeof v.bracketTag === "string" ? v.bracketTag : "",
    popularity: typeof v.popularity === "number" ? v.popularity : 0,
    missing: cards.filter((c) => !haveKeys.includes(c.toLowerCase()) && !haveKeys.includes(c.split(" // ")[0].toLowerCase())),
  };
}

/** Project Spellbook's raw answer. `almostIncluded` keeps only combos of at most `maxSize` cards
 *  that already share at least two cards with the list, most popular first, so a 100-card list
 *  doesn't come back with hundreds of far-fetched near-misses. */
export function projectResult(raw: unknown, have: string[], maxSize = 4, maxAlmost = 25): ComboResult {
  const results = isObj(raw) && isObj(raw.results) ? raw.results : {};
  const included = (Array.isArray(results.included) ? results.included : [])
    .map((v) => toCombo(v, have))
    .filter((c): c is Combo => c !== null)
    .sort((a, b) => b.popularity - a.popularity);
  const almost = (Array.isArray(results.almostIncluded) ? results.almostIncluded : [])
    .map((v) => toCombo(v, have))
    .filter((c): c is Combo => c !== null && c.cards.length <= maxSize && c.cards.length - c.missing.length >= 2)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, maxAlmost);
  return { included, almostIncluded: almost };
}

interface CacheEntry {
  fetchedAt: number;
  result: ComboResult;
}

function isCacheEntry(v: unknown): v is CacheEntry {
  return isObj(v) && typeof v.fetchedAt === "number" && isObj(v.result) && Array.isArray(v.result.included) && Array.isArray(v.result.almostIncluded);
}

async function loadCache(): Promise<Record<string, CacheEntry>> {
  let raw: unknown = null;
  try {
    const text = await readFile(CACHE_PATH, "utf8");
    raw = JSON.parse(text);
  } catch {
    return {};
  }
  const out: Record<string, CacheEntry> = {};
  for (const [k, v] of Object.entries(isObj(raw) ? raw : {})) {
    if (isCacheEntry(v)) out[k] = v;
  }
  return out;
}

async function saveCache(cache: Record<string, CacheEntry>): Promise<void> {
  await mkdir(dirname(CACHE_PATH), { recursive: true });
  const tmp = `${CACHE_PATH}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(cache));
  await rename(tmp, CACHE_PATH);
}

/** Combos in a card list. Never throws: when Spellbook is unreachable it answers empty with
 *  `error` set, so a page still renders without its combo section. */
export async function findCombos(commanders: string[], main: string[], now = Date.now()): Promise<ComboResult & { error?: string }> {
  const all = [...new Set([...commanders, ...main])].sort();
  if (all.length < 2) {
    return { included: [], almostIncluded: [] };
  }

  const key = createHash("sha1").update(JSON.stringify({ c: [...commanders].sort(), m: [...main].sort() })).digest("hex");
  const cache = await loadCache();
  const hit = cache[key];
  if (hit && now - hit.fetchedAt < TTL_MS) {
    return hit.result;
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "mtg-agent/1.0" },
      body: JSON.stringify({ commanders: commanders.map((card) => ({ card })), main: main.map((card) => ({ card })) }),
    });
    if (!res.ok) {
      return { included: [], almostIncluded: [], error: `Commander Spellbook answered ${res.status}` };
    }

    const raw: unknown = await res.json();
    const result = projectResult(raw, all);
    cache[key] = { fetchedAt: now, result };
    await saveCache(cache);
    return result;
  } catch (err) {
    return { included: [], almostIncluded: [], error: `Commander Spellbook unreachable: ${String(err)}` };
  }
}
