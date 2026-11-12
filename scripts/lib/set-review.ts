/** Helpers behind `bun run set-scan` and the set-review skill: which of a deck's lists already run a
 *  card from the set, and which pool cards a review file never gave a verdict. */
import { listNames, type Deck } from "./deck-model.ts";
import { frontFace } from "./deck-research.ts";

/** Ids of every list in the deck (deck and pool lists alike) that already runs the card, matched on
 *  the front face so a double-faced card matches however the list spells it. */
export function listsHolding(deck: Deck, cardName: string): string[] {
  const front = frontFace(cardName).toLowerCase();

  return Object.entries(deck.lists)
    .filter(([, list]) => listNames(list).some((name) => frontFace(name).toLowerCase() === front))
    .map(([id]) => id);
}

/** Cell text without markdown links, bold, italics or code ticks, and with curly apostrophes
 *  straightened, so `**[Sol Ring](url)**` and `Sol Ring` compare equal. */
function stripMarkup(text: string): string {
  return text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*`]/g, "")
    .replace(/[‘’]/g, "'")
    .trim();
}

/** The verdict cells a review table row can carry, case-sensitive so a comparison table's
 *  lowercase "no" doesn't count: MAIN, SIDE, NO, IN (already run), plus `=` ("same as the other
 *  deck") and `in list`, which the 2026-09-28 reviews used. */
const VERDICTS = ["MAIN", "SIDE", "NO", "IN", "=", "in list"];

/** Pool cards that no verdict row in the review names. A card counts as covered only when one
 *  markdown table row has a whole cell that is its full name or front face AND a verdict cell: the
 *  review method gives every card a verdict row (ledger tool-007), so a card named only in prose or
 *  in a comparison table has no verdict. */
export function uncoveredCards(reviewText: string, poolNames: string[]): string[] {
  const named: Record<string, true> = {};

  for (const line of reviewText.split("\n")) {
    if (!line.trimStart().startsWith("|")) continue;

    const cells = line.split("|").map(stripMarkup);
    if (!cells.some((cell) => VERDICTS.includes(cell))) continue;

    for (const cell of cells) named[cell.toLowerCase()] = true;
  }
  return poolNames.filter((name) => {
    const full = stripMarkup(name).toLowerCase();
    const front = stripMarkup(frontFace(name)).toLowerCase();
    return !named[full] && !named[front];
  });
}
