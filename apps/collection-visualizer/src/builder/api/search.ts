// Server function for the add-a-card box: Scryfall search through the root client.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { printingsFor, resolveCards, searchCards } from "../server/cards";

/** Resolve a few names for chat chips and galleries — cards that may not be in the deck. */
export const lookupCardsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ names: z.array(z.string().min(1)).max(50) }).parse(data))
  .handler(async ({ data }) => resolveCards(data.names));

export const searchCardsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ query: z.string().trim().min(1) }).parse(data))
  .handler(async ({ data }) => {
    try {
      return { cards: await searchCards(data.query), error: null };
    } catch (err) {
      // Scryfall returns 404 for "no cards match"; anything else is worth showing.
      const message = err instanceof Error ? err.message : String(err);
      return { cards: [], error: /no cards|404/i.test(message) ? null : message };
    }
  });

/** Every printing of a card, oldest first, for the printing picker. */
export const printingsFn = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ name: z.string().trim().min(1) }).parse(data))
  .handler(async ({ data }) => printingsFor(data.name));
