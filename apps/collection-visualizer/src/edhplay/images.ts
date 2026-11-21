// Server only. Card images for the game pages without hitting Scryfall's rate limit: a page asks
// for dozens of images at once, and Scryfall's `cards/named?format=image` answers 429 past ~10 a
// second. Requests arriving within BATCH_MS share one `resolveNames` call (cache first, then one
// collection request for the misses), and the route redirects to the cards.scryfall.io CDN URL,
// which isn't rate limited.
import { resolveNames } from "@mtg/card-cache.ts";
import type { CardSummary } from "@mtg/scryfall.ts";

const BATCH_MS = 40;

let queue: { name: string; resolve: (card: CardSummary | undefined) => void }[] = [];
let timer: ReturnType<typeof setTimeout> | undefined;

async function flush(): Promise<void> {
  const batch = queue;
  queue = [];
  timer = undefined;
  try {
    const { found } = await resolveNames(batch.map((b) => b.name));
    for (const b of batch) b.resolve(found[b.name]);
  } catch (err) {
    console.error("[edhplay] image lookup failed:", err instanceof Error ? err.message : String(err));
    for (const b of batch) b.resolve(undefined);
  }
}

function lookup(name: string): Promise<CardSummary | undefined> {
  return new Promise((resolve) => {
    queue.push({ name, resolve });
    timer ??= setTimeout(() => void flush(), BATCH_MS);
  });
}

export type ImageVersion = "art" | "normal";

/** The CDN URL of a card's front-face image, or null when Scryfall doesn't know the name. */
export async function cardImageUrl(name: string, version: ImageVersion): Promise<string | null> {
  const card = await lookup(name);
  if (!card) return null;
  return version === "art" ? (card.images.artCrop ?? card.images.normal) : (card.images.normal ?? card.imageUri);
}
