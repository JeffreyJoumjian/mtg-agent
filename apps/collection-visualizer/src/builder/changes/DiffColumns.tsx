import { ArrowLeftRight, X } from "lucide-react";
import type { ChangeEntry } from "@mtg/change-set.ts";
import { cardImage, type CardView } from "../model/cards";
import { pairEntries, type AddEntry, type RemoveEntry } from "./pairs";

interface DiffColumnsProps<T extends ChangeEntry> {
  entries: T[];
  cards: Record<string, CardView>;
  /** Present in the staged panel; absent in the chat card. */
  onRemoveEntry?: (entry: T) => void;
  compact?: boolean;
}

/** The diff: what leaves on the left in rose, what arrives on the right in emerald, a swap on one
 *  row and swaps first. Moves and quantity changes are single lines beneath. */
export function DiffColumns<T extends ChangeEntry>(props: DiffColumnsProps<T>) {
  const rows = pairEntries(props.entries);
  const size = props.compact ? "h-11 w-8" : "h-16 w-[46px]";

  const Tile = (p: { name: string; tone: "out" | "in"; detail?: string; entry: T }) => {
    const src = cardImage(props.cards[p.name], "small");
    return (
      <div
        className={`flex min-w-0 flex-1 items-center gap-2 rounded-md px-1.5 py-1 ${p.tone === "in" ? "bg-good/10" : "bg-bad/10"}`}
      >
        {src ? (
          <img src={src} alt="" className={`${size} shrink-0 rounded-[2px] object-cover`} loading="lazy" />
        ) : (
          <div className={`${size} shrink-0 rounded-[2px] bg-muted`} />
        )}
        <div className="min-w-0 flex-1">
          <div
            className={`line-clamp-2 text-[13px] leading-tight font-medium break-words ${p.tone === "in" ? "text-good" : "text-bad"}`}
          >
            {p.name}
          </div>
          {p.detail && <div className="truncate text-[11px] text-muted-foreground">{p.detail}</div>}
        </div>
        {props.onRemoveEntry && (
          <button
            type="button"
            aria-label="Drop this change"
            onClick={() => props.onRemoveEntry?.(p.entry)}
            className="rounded p-0.5 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    );
  };

  const addDetail = (e: AddEntry) => `to ${e.section}${e.qty && e.qty > 1 ? ` ×${e.qty}` : ""}`;

  return (
    <div className="space-y-1.5">
      {rows.map((row, i) => {
        if (row.kind === "swap") {
          return (
            <div key={i} className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <Tile name={row.out.name} tone="out" entry={row.out as unknown as T} />
                <ArrowLeftRight className="size-4 shrink-0 text-muted-foreground" />
                <Tile name={row.in.name} tone="in" detail={addDetail(row.in)} entry={row.in as unknown as T} />
              </div>
              {row.why && !props.compact && <p className="px-1.5 text-[12px] text-muted-foreground">{row.why}</p>}
            </div>
          );
        }
        if (row.kind === "remove") {
          return (
            <div key={i} className="flex items-center gap-1.5">
              <Tile name={row.out.name} tone="out" detail={row.out.why} entry={row.out as unknown as T} />
              <div className="w-4 shrink-0" />
              <div className="flex-1" />
            </div>
          );
        }
        if (row.kind === "add") {
          return (
            <div key={i} className="flex items-center gap-1.5">
              <div className="flex-1" />
              <div className="w-4 shrink-0" />
              <Tile
                name={row.in.name}
                tone="in"
                detail={`${addDetail(row.in)}${row.in.why ? ` — ${row.in.why}` : ""}`}
                entry={row.in as unknown as T}
              />
            </div>
          );
        }
        const entry = row.entry as unknown as T;
        const text =
          row.kind === "move" ? `${row.entry.name} → ${row.entry.section}` : `${row.entry.name} ×${row.entry.qty}`;
        const cls = row.kind === "move" ? "text-move" : "text-warn";
        return (
          <div key={i} className="flex items-center justify-between gap-2 px-1.5 text-[13px]">
            <span className={cls}>{text}</span>
            {props.onRemoveEntry && (
              <button
                type="button"
                aria-label="Drop this change"
                onClick={() => props.onRemoveEntry?.(entry)}
                className="rounded p-0.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export type { AddEntry, RemoveEntry };
