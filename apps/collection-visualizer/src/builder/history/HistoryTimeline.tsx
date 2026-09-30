import { ChangeSummary } from "../changes/ChangeSummary";
import type { TimelineItem } from "./timeline";

interface HistoryTimelineProps {
  items: TimelineItem[];
  selected: string | null;
  onSelect: (key: string) => void;
}

function when(iso: string): string {
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function kindNote(item: TimelineItem): string | null {
  if (item.file === null) return "now";
  if (item.kind === "start") return "before the first recorded change";
  if (item.legacy) return item.restorable ? "terminal snapshot" : "status/sideboard copy";
  if (item.kind === "snapshot") return "snapshot";
  return null;
}

/** Newest first, top to bottom. Each stop is a change and the list as it stood after it. */
export function HistoryTimeline(props: HistoryTimelineProps) {
  if (props.items.length === 0)
    return (
      <p className="p-3 text-[13px] text-muted-foreground">No versions yet. The first applied change creates one.</p>
    );

  return (
    <ol className="relative ml-3 border-l border-border/60">
      {props.items.map((item) => {
        const headline =
          item.entry?.changes
            .filter((c) => c.key === "curve.avgMv" || c.key === "size.total" || c.key === "size.lands")
            .slice(0, 2) ?? [];
        const active = props.selected === item.key;
        const note = kindNote(item);
        return (
          <li key={item.key} className="relative pl-4">
            <span
              className={`absolute top-3 -left-[5px] size-2.5 rounded-full border-2 border-background ${active ? "bg-primary" : "bg-muted-foreground"}`}
            />
            <button
              type="button"
              onClick={() => props.onSelect(item.key)}
              className={`my-1 w-full rounded-md px-2 py-1.5 text-left transition hover:bg-accent ${active ? "bg-accent" : ""}`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[13px] font-medium">{item.label}</span>
                <span className="shrink-0 text-[11px] text-muted-foreground">{when(item.at)}</span>
              </div>
              <div className="flex flex-wrap gap-x-2 text-[11px] text-muted-foreground">
                {item.listId && <span>{item.listId}</span>}
                {item.author && <span>{item.author === "agent" ? "agent" : "you"}</span>}
                {note && <span>{note}</span>}
                {item.entry && <ChangeSummary entries={item.entry.entries} />}
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
