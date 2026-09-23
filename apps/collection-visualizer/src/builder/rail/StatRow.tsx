import type { StatChange } from "@mtg/deck-stats.ts";

interface StatRowProps {
  label: string;
  value: string | number;
  /** The change row for this stat when a change set is staged, if it changed. */
  change?: StatChange;
  format?: (n: number) => string;
  onClick?: () => void;
  active?: boolean;
}

/** One line of the rail: a label, its number, and — while a change is staged — where it goes. */
export function StatRow(props: StatRowProps) {
  const fmt = props.format ?? ((n: number) => String(n));
  const change = props.change;

  // A changed row takes two lines — label, then before → after — so neither side ever truncates
  // in a narrow rail.
  return (
    <div
      onClick={props.onClick}
      className={`px-1 py-0.5 text-[13px] leading-tight ${props.onClick ? "cursor-pointer rounded hover:bg-accent" : ""} ${
        props.active ? "bg-accent" : ""
      } ${change ? "" : "flex items-baseline justify-between gap-2"}`}
    >
      <span className={`text-muted-foreground ${change ? "block" : "truncate"}`}>{props.label}</span>
      {change ? (
        <span className="block text-right tabular-nums">
          <span className="text-muted-foreground line-through decoration-muted-foreground/60">
            {fmt(change.before)}
          </span>
          <span className="mx-1 text-muted-foreground">→</span>
          <span className="font-medium text-amber-400">{fmt(change.after)}</span>
          <span className="ml-1 text-[11px] text-amber-400/80">
            ({change.delta > 0 ? "+" : ""}
            {fmt(change.delta)})
          </span>
        </span>
      ) : (
        <span className="shrink-0 font-medium tabular-nums">{props.value}</span>
      )}
    </div>
  );
}
