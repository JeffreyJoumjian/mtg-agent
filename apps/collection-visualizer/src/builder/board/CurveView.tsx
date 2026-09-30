import type { DeckList } from "@mtg/deck-model.ts";
import type { CardView } from "../model/cards";
import { bucketByMv } from "./layout";
import { DeckCard } from "./DeckCard";
import { STACK_PEEK, STACK_WIDTH, cardHeightFor } from "./tokens";

interface CurveViewProps {
  list: DeckList;
  cards: Record<string, CardView>;
  selected: string | null;
  onSelect: (name: string) => void;
}

/** Cards stacked by mana value — the curve you can see, not a bar chart. */
export function CurveView(props: CurveViewProps) {
  const buckets = bucketByMv(props.list, props.cards);
  const height = cardHeightFor(STACK_WIDTH);

  return (
    <div className="flex h-full gap-3 overflow-x-auto p-3">
      {buckets.map((b) => (
        <div key={b.mv} style={{ width: STACK_WIDTH }} className="shrink-0">
          <div className="mb-1.5 flex items-baseline justify-between px-0.5">
            <span className="text-[13px] font-medium">{b.mv === "Lands" ? "Lands" : `MV ${b.mv}`}</span>
            <span className="text-[12px] text-muted-foreground tabular-nums">
              {b.cards.reduce((n, c) => n + c.qty, 0)}
            </span>
          </div>
          <div className="relative">
            {b.cards.map((c, i) => (
              <DeckCard
                key={`${c.section}|${c.name}`}
                name={c.name}
                qty={c.qty}
                state="current"
                card={props.cards[c.name]}
                width={STACK_WIDTH}
                selected={props.selected === c.name}
                onClick={() => props.onSelect(c.name)}
                style={{ marginTop: i === 0 ? 0 : -(height - STACK_PEEK) }}
                className="hover:z-40 focus-visible:z-40"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
