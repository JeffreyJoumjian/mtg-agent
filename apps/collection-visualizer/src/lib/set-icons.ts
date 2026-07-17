import type { SetIcon } from "./types";

// Pure half of the set-symbol feature: no node/IO imports, because `buildResponse` reaches this
// module and `buildResponse` is reachable from the client bundle. Fetching and disk live in
// set-icon-cache.ts, which only server handlers touch.

/** Vendored set symbols for every set Scryfall knows about, not just the owned ones — so a set that
 *  shows up in a future CSV upload already has its symbol. Deduped by symbol file: ~1000 sets share
 *  only ~360 distinct symbols. */
export interface SetIconCache {
  /** When the set *list* was last pulled. Symbol artwork never changes, so only the list needs a TTL. */
  fetchedAt: number;
  /** Set code -> icon id. Many codes map to one id (e.g. every Secret Lair -> `star`). */
  sets: Record<string, string>;
  /** Icon id -> the URL to fetch it from, exactly as Scryfall reported it. Kept rather than rebuilt
   *  from the id, because the CDN 404s some symbols unless the original query string is present. */
  uris: Record<string, string>;
  /** Icon id -> parsed symbol. */
  icons: Record<string, SetIcon>;
}

// The symbols we've seen use only these; anything else means the markup changed shape and we refuse
// to vendor it, because `body` is injected as raw HTML on the client.
const ALLOWED_TAGS = ["svg", "g", "path"];

export function emptyIconCache(): SetIconCache {
  return { fetchedAt: 0, sets: {}, uris: {}, icons: {} };
}

/** The stable id for a symbol URL — its filename, minus the cache-busting query. */
export function iconId(iconUri: string): string {
  const file = iconUri.split("?")[0].split("/").pop() ?? "";
  return file.replace(/\.svg$/i, "");
}

/** Parse a Scryfall set symbol into inlinable form, or null if it isn't the shape we expect.
 *  Scryfall hard-codes near-black fills, which would be invisible in dark mode and would defeat the
 *  rarity coloring, so every hex fill is stripped and `fill: currentColor` on the root takes over.
 *  `fill="none"` and gradient fills are left alone — those carve out shapes rather than color them. */
export function parseSetIcon(svg: string): SetIcon | null {
  const viewBox = /viewBox="([^"]+)"/.exec(svg)?.[1];
  if (!viewBox) return null;

  const tags = [...svg.matchAll(/<\s*([a-zA-Z][\w-]*)/g)].map((m) => m[1].toLowerCase());
  if (tags.some((t) => !ALLOWED_TAGS.includes(t))) return null;

  const inner = /<svg[^>]*>([\s\S]*)<\/svg>/.exec(svg)?.[1];
  if (inner == null) return null;

  return { viewBox, body: inner.replace(/\s*fill="#[0-9a-fA-F]{3,8}"/g, "") };
}

/** Symbols the cache knows the URL of but hasn't downloaded yet. */
export function missingIcons(cache: SetIconCache): { id: string; uri: string }[] {
  return Object.entries(cache.uris)
    .filter(([id]) => !cache.icons[id])
    .map(([id, uri]) => ({ id, uri }));
}

/** Just the symbols for the given set codes, keyed by code — what the client actually needs. Sending
 *  all ~360 would be ~680 KB for a collection that spans a few dozen sets. */
export function iconsForSets(cache: SetIconCache, codes: string[]): Record<string, SetIcon> {
  const out: Record<string, SetIcon> = {};
  for (const code of codes) {
    const icon = cache.icons[cache.sets[code.toLowerCase()]];
    if (icon) out[code] = icon;
  }
  return out;
}

