import type { DeckStats } from "@mtg/deck-stats.ts";

import { TYPE_LABELS, TYPE_ORDER, type TypeKey } from "../model/card-types";

/** Muted categorical fills: the card art stays the loudest colour on screen. */
const TYPE_COLORS: Record<TypeKey, string> = {
  creature: "#d6d6d6",
  instant: "#9ec5e8",
  sorcery: "#c9a0dc",
  artifact: "#8f8f8f",
  enchantment: "#a3c095",
  planeswalker: "#e0b06a",
  battle: "#e08a8a",
  land: "#555555",
};

interface CompositionBarProps {
  types: DeckStats["types"];
}

/** One stacked bar for what the list is made of, with a legend that carries the counts. */
export function CompositionBar(props: CompositionBarProps) {
  const present = TYPE_ORDER.filter((t) => props.types[t] > 0);
  const total = present.reduce((n, t) => n + props.types[t], 0);
  if (total === 0) return <p className="px-1 text-[12px] text-muted-foreground">No cards yet.</p>;

  return (
    <div className="space-y-2">
      <div className="flex h-3.5 gap-0.5 overflow-hidden rounded-[4px]">
        {present.map((t) => (
          <div
            key={t}
            data-segment={t}
            style={{ width: `${Math.round((props.types[t] / total) * 100)}%`, background: TYPE_COLORS[t] }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
        {present.map((t) => (
          <span key={t} className="inline-flex items-center gap-1">
            <span className="inline-block size-2 rounded-[2px]" style={{ background: TYPE_COLORS[t] }} />
            {TYPE_LABELS[t]} <span className="font-semibold text-foreground tabular-nums">{props.types[t]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
