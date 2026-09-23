import { useState } from "react";
import { GitCompareArrows, RotateCcw } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import type { VersionPayload } from "../api/history";
import { DeckCard } from "../board/DeckCard";
import type { CardState } from "../board/layout";
import { STACK_PEEK, STACK_WIDTH, cardHeightFor } from "../board/tokens";
import { DeltaTable } from "../changes/DeltaTable";
import { diffStats } from "@mtg/deck-stats.ts";

interface VersionViewProps {
  version: VersionPayload;
  /** False for an old STATUS.md or SIDEBOARD.md copy — readable, but not a decklist to restore. */
  restorable: boolean;
  onRestore: () => void;
}

const key = (name: string): string => name.trim().toLowerCase();

/** A past version as stacks, read-only. "Diff vs current" rings what restoring would bring back
 *  (emerald) and lists what it would remove (rose). */
export function VersionView(props: VersionViewProps) {
  const { version, restorable } = props;
  const [mode, setMode] = useState<"version" | "diff">("version");
  const height = cardHeightFor(STACK_WIDTH);

  const state: Record<string, CardState> = {};
  const wouldRemove: string[] = [];
  for (const e of version.restoreEntries) {
    if (e.op === "add") state[key(e.name)] = "added";
    else if (e.op === "move") state[key(e.name)] = "moved";
    else if (e.op === "qty") state[key(e.name)] = "changed";
    else wouldRemove.push(e.name);
  }
  const changes = diffStats(version.currentStats, version.stats);
  const sameAsCurrent = version.restoreEntries.length === 0;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2">
        <span className="text-[13px] font-medium">{version.file.replace(/\.(json|md)$/, "")}</span>
        <span className="text-[12px] text-muted-foreground">list {version.listId}</span>
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          value={mode}
          onValueChange={(v) => v && setMode(v as "version" | "diff")}
        >
          <ToggleGroupItem value="version">As it was</ToggleGroupItem>
          <ToggleGroupItem value="diff">
            <GitCompareArrows /> Diff vs current
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="ml-auto">
          {restorable ? (
            <Button size="sm" onClick={props.onRestore} disabled={sameAsCurrent}>
              <RotateCcw /> {sameAsCurrent ? "Same as current" : `Restore into ${version.listId}`}
            </Button>
          ) : (
            <span className="text-[12px] text-muted-foreground">Not a decklist — kept for reading only</span>
          )}
        </div>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_260px]">
        <div className="flex h-full gap-3 overflow-auto p-3">
          {version.list.sections.map((section) => (
            <div key={section.name} style={{ width: STACK_WIDTH }} className="shrink-0">
              <div className="mb-1.5 flex items-baseline justify-between px-0.5">
                <span className="truncate text-[13px] font-medium">{section.name}</span>
                <span className="text-[12px] text-muted-foreground tabular-nums">
                  {section.cards.reduce((n, c) => n + c.qty, 0)}
                </span>
              </div>
              <div className="relative pb-2">
                {section.cards.map((c, i) => (
                  <DeckCard
                    key={c.name}
                    name={c.name}
                    qty={c.qty}
                    state={mode === "diff" ? (state[key(c.name)] ?? "current") : "current"}
                    card={version.cards[c.name]}
                    width={STACK_WIDTH}
                    style={{ marginTop: i === 0 ? 0 : -(height - STACK_PEEK) }}
                    className="cursor-default hover:z-40"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3 overflow-y-auto border-l p-3">
          <div>
            <div className="mb-1 text-[12px] text-muted-foreground">Restoring changes</div>
            <DeltaTable changes={changes} />
          </div>
          {wouldRemove.length > 0 && (
            <div>
              <div className="mb-1 text-[12px] text-muted-foreground">Leaves the deck ({wouldRemove.length})</div>
              <ul className="text-[13px] text-rose-300">
                {wouldRemove.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-[11px] text-muted-foreground">
            A restore reproduces the cards, sections and quantities of this version; per-card notes and section order
            are not compared.
          </p>
        </div>
      </div>
    </div>
  );
}
