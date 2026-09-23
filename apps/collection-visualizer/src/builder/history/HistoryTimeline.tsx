import type { HistoryEntry, VersionRef } from "@mtg/deck-store.ts";
import { summarizeEntries } from "@mtg/change-set.ts";

export interface TimelineItem {
  file: string;
  label: string;
  at: string;
  listId: string | null;
  author: "user" | "agent" | null;
  legacy: boolean;
  restorable: boolean;
  entry: HistoryEntry | null;
}

/** Merge history entries (rich) with snapshot files the log does not know (terminal-era). */
export function buildTimeline(entries: HistoryEntry[], versions: VersionRef[]): TimelineItem[] {
  const byFile: Record<string, HistoryEntry> = {};
  for (const e of entries) byFile[e.snapshot.replace(/^versions\//, "")] = e;

  return versions.map((v) => {
    const entry = byFile[v.file] ?? null;
    return {
      file: v.file,
      label: entry?.label ?? v.label,
      at: entry?.at ?? v.takenAt,
      listId: entry?.listId ?? v.listId,
      author: entry?.author ?? null,
      legacy: v.legacy,
      restorable: v.restorable,
      entry,
    };
  });
}

interface HistoryTimelineProps {
  items: TimelineItem[];
  selected: string | null;
  onSelect: (file: string) => void;
}

function when(iso: string): string {
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

/** Newest first, top to bottom. Each stop is the state the deck was in *before* that change. */
export function HistoryTimeline(props: HistoryTimelineProps) {
  if (props.items.length === 0)
    return (
      <p className="p-3 text-[13px] text-muted-foreground">No versions yet. The first applied change creates one.</p>
    );

  return (
    <ol className="relative ml-3 border-l border-border/60">
      {props.items.map((item) => {
        const counts = item.entry ? summarizeEntries(item.entry.entries) : null;
        const headline =
          item.entry?.changes
            .filter((c) => c.key === "curve.avgMv" || c.key === "size.total" || c.key === "size.lands")
            .slice(0, 2) ?? [];
        const active = props.selected === item.file;
        return (
          <li key={item.file} className="relative pl-4">
            <span
              className={`absolute top-3 -left-[5px] size-2.5 rounded-full border-2 border-background ${active ? "bg-primary" : "bg-muted-foreground"}`}
            />
            <button
              type="button"
              onClick={() => props.onSelect(item.file)}
              className={`my-1 w-full rounded-md px-2 py-1.5 text-left transition hover:bg-accent ${active ? "bg-accent" : ""}`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[13px] font-medium">{item.label}</span>
                <span className="shrink-0 text-[11px] text-muted-foreground">{when(item.at)}</span>
              </div>
              <div className="flex flex-wrap gap-x-2 text-[11px] text-muted-foreground">
                {item.listId && <span>{item.listId}</span>}
                {item.author && <span>{item.author === "agent" ? "agent" : "you"}</span>}
                {item.legacy && <span>{item.restorable ? "terminal snapshot" : "status/sideboard copy"}</span>}
                {counts && (
                  <span className="tabular-nums">
                    <span className="text-emerald-300">+{counts.added}</span>{" "}
                    <span className="text-rose-300">−{counts.removed}</span>
                    {counts.moved ? ` ↔${counts.moved}` : ""}
                  </span>
                )}
                {headline.map((c) => (
                  <span key={c.key} className="tabular-nums">
                    {c.label} {c.before}→{c.after}
                  </span>
                ))}
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
