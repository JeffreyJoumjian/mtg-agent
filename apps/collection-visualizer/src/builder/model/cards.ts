/** Card shapes the builder passes over the wire and renders. Pure — importable from either side. */
import type { CardFace, CardImages, CardSummary } from "@mtg/scryfall.ts";
import type { CardInfo } from "@mtg/deck-stats.ts";

export type { CardInfo };

/** What the board, the chat chips and the popover render: the stats slice plus images, faces,
 *  oracle text and printing details. Comes from the shared root card cache via `server/cards.ts`. */
export interface CardView extends CardInfo {
  id: string;
  oracleId: string;
  oracleText: string;
  images: CardImages;
  faces: CardFace[];
  layout: string;
  rarity: string;
  set: string;
  collectorNumber: string;
  scryfallUri: string;
  power?: string;
  toughness?: string;
  keywords: string[];
}

/** The slice `computeStats` reads — sent alongside the deck so the client can compute previews. */
export function toCardInfo(s: CardSummary): CardInfo {
  return {
    name: s.name,
    cmc: s.cmc,
    manaCost: s.manaCost,
    typeLine: s.typeLine,
    colors: s.colors,
    colorIdentity: s.colorIdentity,
    producedMana: s.producedMana,
    gameChanger: s.gameChanger,
    usd: s.usd,
    commanderLegal: s.commanderLegal,
  };
}

export function toCardView(s: CardSummary): CardView {
  return {
    ...toCardInfo(s),
    id: s.id,
    oracleId: s.oracleId,
    oracleText: s.oracleText,
    images: s.images,
    faces: s.faces,
    layout: s.layout,
    rarity: s.rarity,
    set: s.set,
    collectorNumber: s.collectorNumber,
    scryfallUri: s.scryfallUri,
    ...(s.power !== undefined ? { power: s.power } : {}),
    ...(s.toughness !== undefined ? { toughness: s.toughness } : {}),
    keywords: s.keywords,
  };
}

/** An image URL for a card at a size, for a face index (out-of-range faces fall back to the front). */
export function cardImage(card: CardView | undefined, size: keyof CardImages, face = 0): string | null {
  if (!card) return null;

  const chosen = card.faces[face] ?? card.faces[0];
  const fromFace = chosen?.images[size] ?? null;
  return fromFace ?? card.images[size] ?? null;
}

/** The name a deck file uses for a card: the front face. Pure twin of the server cache's `deckName`. */
export function deckNameOf(card: { name: string }): string {
  return card.name.split(" // ")[0].trim();
}

/** The front face's type line — what the card is when it enters. */
export function frontTypeLine(card: CardInfo): string {
  return card.typeLine.split(" // ")[0];
}

export function isLandCard(card: CardInfo | undefined): boolean {
  return card ? /\bLand\b/.test(frontTypeLine(card)) : false;
}
