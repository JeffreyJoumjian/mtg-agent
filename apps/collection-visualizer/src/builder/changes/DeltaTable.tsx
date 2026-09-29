import type { StatChange } from "@mtg/deck-stats.ts";
import { formatMoney } from "~/lib/format";

interface DeltaTableProps {
  changes: StatChange[];
  /** Hide the noisier rows (per-status money, per-MV buckets) unless asked. */
  full?: boolean;
}

const GROUP_LABEL: Record<StatChange["group"], string> = {
  size: "Size",
  curve: "Curve",
  types: "Types",
  color: "Colour",
  roles: "Roles",
  tags: "Tags",
  flags: "Checks",
  money: "Money",
};

function fmt(key: string, n: number): string {
  if (key.startsWith("money.")) return formatMoney(n, "usd");
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

/** Every number that moves, before → after, grouped. Amber means changed — not good or bad. */
export function DeltaTable(props: DeltaTableProps) {
  const rows = props.full
    ? props.changes
    : props.changes.filter((c) => !/^money\.(OWNED|BUY|PROXY|CONSIDERING)\./.test(c.key));
  if (rows.length === 0) return <p className="text-[12px] text-muted-foreground">No numbers change.</p>;

  const groups: { group: StatChange["group"]; rows: StatChange[] }[] = [];
  for (const row of rows) {
    const last = groups[groups.length - 1];
    if (last && last.group === row.group) last.rows.push(row);
    else groups.push({ group: row.group, rows: [row] });
  }

  return (
    <div className="space-y-2">
      {groups.map((g) => (
        <div key={g.group}>
          <div className="mb-0.5 text-[11px] text-muted-foreground">{GROUP_LABEL[g.group]}</div>
          {g.rows.map((c) => (
            <div
              key={c.key}
              className="flex items-baseline justify-between gap-3 text-[13px] leading-tight tabular-nums"
            >
              <span className="truncate">{c.label}</span>
              <span className="shrink-0">
                <span className="text-muted-foreground">{fmt(c.key, c.before)}</span>
                <span className="mx-1 text-muted-foreground">→</span>
                <span className="font-medium text-warn">{fmt(c.key, c.after)}</span>
                <span className="ml-1 text-[11px] text-warn/80">
                  ({c.delta > 0 ? "+" : ""}
                  {fmt(c.key, c.delta)})
                </span>
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
