import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import type { CardMeta } from "@mtg/deck-model.ts";
import { ManaCost } from "~/components/symbols/Mana";
import { manaToShow } from "~/lib/card/mana";
import { formatMoney } from "~/lib/format";
import type { CardView } from "../model/cards";
import type { LaidOutSection } from "./layout";
import { STATE_PILL } from "./tokens";

type SortKey = "section" | "name" | "cmc" | "type" | "status" | "usd";

interface TableViewProps {
  sections: LaidOutSection[];
  cards: Record<string, CardView>;
  meta: Record<string, CardMeta>;
  selected: string | null;
  onSelect: (name: string) => void;
}

/** The deck as sortable rows — the view for scanning tags, statuses and prices at once. */
export function TableView(props: TableViewProps) {
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "section", dir: 1 });

  const rows = props.sections.flatMap((s, si) =>
    s.cards.map((c) => ({ ...c, section: s.name, sectionIndex: si, card: props.cards[c.name], m: props.meta[c.name] })),
  );
  const value = (r: (typeof rows)[number]): string | number => {
    if (sort.key === "section") return r.sectionIndex;
    if (sort.key === "name") return r.name.toLowerCase();
    if (sort.key === "cmc") return r.card?.cmc ?? -1;
    if (sort.key === "type") return r.card?.typeLine ?? "";
    if (sort.key === "status") return r.m?.status ?? "PROXY";
    return r.card?.usd ?? -1;
  };
  rows.sort((a, b) => {
    const va = value(a);
    const vb = value(b);
    const cmp = typeof va === "number" && typeof vb === "number" ? va - vb : String(va).localeCompare(String(vb));
    return (cmp || a.name.localeCompare(b.name)) * sort.dir;
  });

  const header = (key: SortKey, label: string, align = "text-left") => (
    <th
      className={`cursor-pointer px-2 py-1.5 text-[12px] font-medium text-muted-foreground select-none hover:text-foreground ${align}`}
      onClick={() => setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: 1 }))}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {sort.key === key && (sort.dir === 1 ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />)}
      </span>
    </th>
  );

  return (
    <div className="overflow-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead className="sticky top-0 bg-background">
          <tr className="border-b">
            {header("section", "Section")}
            {header("name", "Card")}
            <th className="px-2 py-1.5 text-left text-[12px] font-medium text-muted-foreground">Cost</th>
            {header("cmc", "MV", "text-right")}
            {header("type", "Type")}
            <th className="px-2 py-1.5 text-left text-[12px] font-medium text-muted-foreground">Tags</th>
            {header("status", "Status")}
            {header("usd", "USD", "text-right")}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const pill = r.state === "current" ? null : STATE_PILL[r.state];
            return (
              <tr
                key={`${r.section}|${r.name}|${r.state}`}
                onClick={() => props.onSelect(r.name)}
                className={`cursor-pointer border-b border-border/60 hover:bg-accent ${props.selected === r.name ? "bg-accent" : ""} ${r.state === "removed" ? "opacity-50 line-through" : ""}`}
              >
                <td className="px-2 py-1 text-muted-foreground">{r.section}</td>
                <td className="px-2 py-1 font-medium">
                  {r.qty > 1 ? `${r.qty}× ` : ""}
                  {r.name}
                  {pill && (
                    <span className={`ml-2 rounded px-1 py-px text-[10px] font-semibold ${pill.className}`}>
                      {pill.text}
                    </span>
                  )}
                  {!r.card && <span className="ml-2 text-[11px] text-warn">unresolved</span>}
                </td>
                <td className="px-2 py-1">
                  <ManaCost cost={manaToShow(r.card?.manaCost ?? "", r.card?.producedMana)} size="size-3" />
                </td>
                <td className="px-2 py-1 text-right tabular-nums">
                  {r.card && !/\bLand\b/.test(r.card.typeLine.split(" // ")[0]) ? r.card.cmc : ""}
                </td>
                <td className="max-w-56 truncate px-2 py-1 text-muted-foreground">{r.card?.typeLine}</td>
                <td className="px-2 py-1 text-[11px] text-muted-foreground">{(r.m?.tags ?? []).join(", ")}</td>
                <td className="px-2 py-1 text-[11px]">{(r.m?.status ?? "PROXY").toLowerCase()}</td>
                <td className="px-2 py-1 text-right tabular-nums text-muted-foreground">
                  {r.card?.usd != null ? formatMoney(r.card.usd * r.qty, "usd") : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
