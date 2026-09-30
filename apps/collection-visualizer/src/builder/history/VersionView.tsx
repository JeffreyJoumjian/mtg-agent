import { useState, type ReactNode } from "react";
import { GitCompareArrows, RotateCcw } from "lucide-react";
import { diffStats } from "@mtg/deck-stats.ts";
import { Button } from "~/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import type { VersionPayload } from "../api/history";
import { BottomSplit } from "../board/BottomSplit";
import { DeckCard } from "../board/DeckCard";
import { layoutSections, type LaidOutSection } from "../board/layout";
import { STACK_PEEK, STACK_WIDTH, cardHeightFor } from "../board/tokens";
import { ChangeSummary } from "../changes/ChangeSummary";
import { DiffPanel } from "../changes/DiffPanel";
import type { CardView } from "../model/cards";
import type { TimelineItem } from "./timeline";

interface VersionViewProps {
  item: TimelineItem;
  version: VersionPayload;
  onRestore: () => void;
}

/** `change`: the list after this change, with what the change did ringed. `version`: the list as it
 *  stood, plain. `diff`: today's list with what a restore would do ringed. */
type Mode = "change" | "version" | "diff";

function when(iso: string): string {
  return new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

/**
 * One stop of the history: the board on top, and beneath it — in the same draggable split — the
 * panel the deck page shows for a staged change: the diff with swaps first, the numbers beside it.
 * What a change did, and what a restore would do, read exactly as they will when a restore lands.
 */
export function VersionView(props: VersionViewProps) {
  const { item, version } = props;
  const entry = item.entry;
  const change = entry && version.before ? { entry, before: version.before } : null;
  const [chosen, setChosen] = useState<Mode>(change ? "change" : "version");
  const mode: Mode = chosen === "change" && !change ? "version" : chosen;
  const sameAsCurrent = version.restoreEntries.length === 0;

  const sections: LaidOutSection[] =
    mode === "change" && change
      ? layoutSections(change.before, { entries: change.entry.entries }, "after")
      : mode === "diff"
        ? layoutSections(version.current, { entries: version.restoreEntries }, "after")
        : layoutSections(version.list, null, "current");

  const panel =
    mode === "change" && change ? (
      <BottomPanel
        title={`This change · by ${change.entry.author === "agent" ? "the agent" : "you"}`}
        entries={change.entry.entries}
      >
        <DiffPanel
          entries={change.entry.entries}
          cards={version.cards}
          changes={change.entry.changes}
          rationale={change.entry.rationale}
        />
      </BottomPanel>
    ) : mode === "diff" && !sameAsCurrent ? (
      <BottomPanel
        title={`Restore stages ${version.restoreEntries.length} changes into ${version.listId}`}
        entries={version.restoreEntries}
        note={
          item.restorable
            ? "They land in the staged panel of the deck page, where you Apply or Discard them — nothing is written until then. Cards, sections and quantities are restored; per-card notes and section order are not compared."
            : "This snapshot is not a decklist, so it cannot be restored; this is what bringing it back would take."
        }
      >
        <DiffPanel
          entries={version.restoreEntries}
          cards={version.cards}
          changes={diffStats(version.currentStats, version.stats)}
        />
      </BottomPanel>
    ) : null;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2">
        <span className="text-[13px] font-medium">{item.label}</span>
        <span className="text-[12px] text-muted-foreground">
          {version.listId} · {when(item.at)}
          {item.file === null ? " · the list as it is now" : ""}
        </span>
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          value={mode}
          onValueChange={(v) => v && setChosen(v as Mode)}
        >
          {change && <ToggleGroupItem value="change">This change</ToggleGroupItem>}
          <ToggleGroupItem value="version">Full list</ToggleGroupItem>
          <ToggleGroupItem value="diff">
            <GitCompareArrows /> Diff vs current
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="ml-auto">
          {item.restorable ? (
            <Button size="sm" onClick={props.onRestore} disabled={sameAsCurrent}>
              <RotateCcw /> {sameAsCurrent ? "Same as current" : "Restore this version"}
            </Button>
          ) : (
            <span className="text-[12px] text-muted-foreground">Not a decklist — kept for reading only</span>
          )}
        </div>
      </div>
      <BottomSplit id="history" top={<Stacks sections={sections} cards={version.cards} />} bottom={panel} />
      {mode === "diff" && sameAsCurrent && (
        <p className="border-t px-3 py-2 text-[13px] text-muted-foreground">
          Same as the current list — there is nothing to restore.
        </p>
      )}
    </div>
  );
}

function Stacks(props: { sections: LaidOutSection[]; cards: Record<string, CardView> }) {
  const height = cardHeightFor(STACK_WIDTH);

  return (
    <div className="flex h-full min-h-0 gap-3 overflow-auto p-3">
      {props.sections.map((section) => (
        <div key={section.name} style={{ width: STACK_WIDTH }} className="shrink-0">
          <div className="mb-1.5 flex items-baseline justify-between px-0.5">
            <span className="truncate text-[13px] font-medium">{section.name}</span>
            <span className="text-[12px] text-muted-foreground tabular-nums">
              {section.cards.filter((c) => c.state !== "removed").reduce((n, c) => n + c.qty, 0)}
            </span>
          </div>
          <div className="relative pb-2">
            {section.cards.map((c, i) => (
              <DeckCard
                key={c.name}
                name={c.name}
                qty={c.qty}
                state={c.state}
                card={props.cards[c.name]}
                width={STACK_WIDTH}
                style={{ marginTop: i === 0 ? 0 : -(height - STACK_PEEK) }}
                className="cursor-default hover:z-40"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** The staged panel's chrome — a header line with the summary counts, then the body filling the rest. */
function BottomPanel(props: {
  title: string;
  entries: VersionPayload["restoreEntries"];
  note?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="shrink-0 border-b px-3 py-2">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
          <span className="text-[13px] font-medium">{props.title}</span>
          <ChangeSummary entries={props.entries} className="text-[12px] text-muted-foreground" />
        </div>
        {props.note && <p className="text-[12px] text-muted-foreground">{props.note}</p>}
      </div>
      {props.children}
    </div>
  );
}
