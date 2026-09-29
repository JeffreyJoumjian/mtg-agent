import { Check, Eye, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import type { PreviewResult } from "../api/changes";
import type { CardView } from "../model/cards";
import type { Staged, StagedEntry } from "../state/staged";
import { DiffPanel } from "./DiffPanel";

interface StagedPanelProps {
  staged: Staged;
  cards: Record<string, CardView>;
  preview: PreviewResult | undefined;
  previewLoading: boolean;
  previewMode: "current" | "after";
  label: string;
  applying: boolean;
  error: string | null;
  onPreviewMode: (mode: "current" | "after") => void;
  onLabel: (label: string) => void;
  onRemoveEntry: (entry: StagedEntry) => void;
  onApply: () => void;
  onDiscard: () => void;
}

/** Sits beneath the board when something is staged, in a split the user can drag: the diff, every
 *  number that moves, the with/without toggle, and the two buttons that end it — Apply writes,
 *  Discard forgets. */
export function StagedPanel(props: StagedPanelProps) {
  const { staged, preview } = props;
  const failures = preview && !preview.ok ? preview.failures : [];
  const count = staged.entries.length;
  const fromAgent = staged.origin !== null;

  return (
    <div className="flex h-full min-h-0 flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b px-3 py-2">
        <span className="text-[13px] font-medium">
          {count} staged {count === 1 ? "change" : "changes"}
          {fromAgent && <span className="ml-1.5 text-[12px] font-normal text-muted-foreground">from the agent</span>}
        </span>
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          value={props.previewMode}
          onValueChange={(v) => v && props.onPreviewMode(v as "current" | "after")}
        >
          <ToggleGroupItem value="current" aria-label="Show the current list">
            Current
          </ToggleGroupItem>
          <ToggleGroupItem value="after" aria-label="Show the list after the change">
            <Eye /> After
          </ToggleGroupItem>
        </ToggleGroup>
        <Input
          value={props.label}
          onChange={(e) => props.onLabel(e.target.value)}
          placeholder={staged.label || "Label for the history"}
          className="h-8 max-w-72 flex-1 text-[13px]"
        />
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={props.onDiscard} disabled={props.applying}>
            <Trash2 /> Discard
          </Button>
          <Button size="sm" onClick={props.onApply} disabled={props.applying || failures.length > 0 || count === 0}>
            <Check /> {props.applying ? "Applying…" : "Apply"}
          </Button>
        </div>
      </div>

      {props.error && <p className="shrink-0 border-b bg-bad/10 px-3 py-1.5 text-[13px] text-bad">{props.error}</p>}
      {failures.length > 0 && (
        <ul className="shrink-0 border-b bg-bad/10 px-3 py-1.5 text-[13px] text-bad">
          {failures.map((f, i) => (
            <li key={i}>
              {f.entry.op} {f.entry.name}: {f.reason}
            </li>
          ))}
        </ul>
      )}

      <DiffPanel
        entries={staged.entries}
        cards={props.cards}
        changes={preview?.ok ? preview.changes : undefined}
        loading={props.previewLoading && !preview}
        rationale={staged.origin?.rationale}
        onRemoveEntry={props.onRemoveEntry}
      />
    </div>
  );
}
