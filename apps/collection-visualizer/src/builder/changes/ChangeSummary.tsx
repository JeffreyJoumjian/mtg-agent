import type { ChangeEntry } from "@mtg/change-set.ts";
import { countPaired } from "./pairs";

interface ChangeSummaryProps {
  entries: ChangeEntry[];
  className?: string;
}

/** `7 swaps · +1 · −2 · 1 moved`: the shape of a change set at a glance, in the diff's colours. */
export function ChangeSummary(props: ChangeSummaryProps) {
  const c = countPaired(props.entries);
  const parts = [
    c.swaps > 0 && (
      <span key="swaps">
        {c.swaps} {c.swaps === 1 ? "swap" : "swaps"}
      </span>
    ),
    c.added > 0 && (
      <span key="added" className="text-good">
        +{c.added}
      </span>
    ),
    c.removed > 0 && (
      <span key="removed" className="text-bad">
        −{c.removed}
      </span>
    ),
    c.moved > 0 && (
      <span key="moved" className="text-move">
        {c.moved} moved
      </span>
    ),
    c.qty > 0 && (
      <span key="qty" className="text-warn">
        {c.qty} qty
      </span>
    ),
  ].filter(Boolean);
  if (parts.length === 0) return null;

  return <span className={`inline-flex flex-wrap gap-x-1.5 tabular-nums ${props.className ?? ""}`}>{parts}</span>;
}
