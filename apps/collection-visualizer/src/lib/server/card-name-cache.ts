// Server only — see lib/server/README.md. Persistent card-by-name cache (data/card-names.json),
// same pattern as price-cache: serve from disk, fetch only misses, write back. The browser never
// talks to Scryfall for card data — that's what killed the live board with CORS-headerless edge
// failures. Image BYTES still come from Scryfall's CDN straight into the browser (immutable
// cache headers), exactly like the collection grid.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { DATA_DIR } from "./price-cache";
import { fetchCardsByNames } from "~/lib/data/scryfall";

const CACHE_PATH = join(DATA_DIR, "card-names.json");

/** Slim Scryfall shape — same field paths the UI reads (scryImage, art banners), nothing else. */
export interface NamedCard {
  name: string;
  image_uris?: { normal?: string; art_crop?: string };
  card_faces?: { name?: string; image_uris?: { normal?: string; art_crop?: string } }[];
}

/** Keep only what the UI renders; a full Scryfall card is ~8KB of mostly unused fields. */
export function trimCard(card: any): NamedCard {
  const face = (f: any) => ({
    ...(typeof f?.name === "string" ? { name: f.name } : {}),
    ...(f?.image_uris ? { image_uris: { normal: f.image_uris.normal, art_crop: f.image_uris.art_crop } } : {}),
  });

  return {
    name: card.name,
    ...(card.image_uris ? { image_uris: { normal: card.image_uris.normal, art_crop: card.image_uris.art_crop } } : {}),
    ...(Array.isArray(card.card_faces) ? { card_faces: card.card_faces.map(face) } : {}),
  };
}

async function loadCache(): Promise<Record<string, NamedCard | null>> {
  try {
    const raw = await readFile(CACHE_PATH, "utf8");
    return JSON.parse(raw) as Record<string, NamedCard | null>;
  } catch {
    return {};
  }
}

/** Cached lookup keyed by lowercased name (front-face keys included). `null` = confirmed
 *  not-found; misses are fetched, trimmed, and persisted. Throws only if Scryfall is down AND
 *  the names aren't cached — callers treat that as "no images this round". */
export async function lookupCardsByNames(names: string[]): Promise<Record<string, NamedCard>> {
  const wanted = [...new Set(names.filter(Boolean).map((n) => n.trim().toLowerCase()))];
  const cache = await loadCache();
  const unknown = wanted.filter((n) => !(n in cache));

  if (unknown.length > 0) {
    const fetched = await fetchCardsByNames(unknown);

    for (const [key, card] of Object.entries(fetched)) {
      cache[key] = trimCard(card);
    }
    // Only after a successful response may absent names be marked not-found.
    for (const n of unknown) {
      if (!(n in cache)) cache[n] = null;
    }

    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(CACHE_PATH, JSON.stringify(cache) + "\n");
  }

  const out: Record<string, NamedCard> = {};
  for (const n of wanted) {
    const card = cache[n];
    if (card) out[n] = card;
  }
  return out;
}
