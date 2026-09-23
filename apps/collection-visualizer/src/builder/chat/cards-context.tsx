import { createContext, useContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { CardView } from "../model/cards";
import { lookupCardsFn } from "../api/search";

/** The open deck's resolved cards, so chips and galleries in the chat render without a fetch. */
const DeckCardsContext = createContext<Record<string, CardView>>({});

export function DeckCardsProvider(props: { cards: Record<string, CardView>; children: ReactNode }) {
  return <DeckCardsContext.Provider value={props.cards}>{props.children}</DeckCardsContext.Provider>;
}

export function useDeckCards(): Record<string, CardView> {
  return useContext(DeckCardsContext);
}

/** One card by name: from the deck when it is there, otherwise looked up (cached per name). */
export function useCardView(name: string): CardView | undefined {
  const deckCards = useDeckCards();
  const known = deckCards[name];
  const query = useQuery({
    queryKey: ["card", name],
    queryFn: async () => {
      const res = await lookupCardsFn({ data: { names: [name] } });
      return res.cards[name] ?? null;
    },
    enabled: !known,
    staleTime: 60 * 60_000,
  });
  return known ?? query.data ?? undefined;
}
