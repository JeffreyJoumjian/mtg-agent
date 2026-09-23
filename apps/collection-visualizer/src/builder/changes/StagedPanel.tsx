import { Check, Eye, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import type { PreviewResult } from "../api/changes";
import type { CardView } from "../model/cards";
import type { Staged, StagedEntry } from "../state/staged";
import { DeltaTable } from "./DeltaTable";
import { DiffColumns } from "./DiffColumns";

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

/** Slides up over the board when something is staged: the diff, every number that moves, the
 *  with/without toggle, and the two buttons that end it — Apply writes, Discard forgets. */
export function StagedPanel(props: StagedPanelProps) {
  const { staged, preview } = props;
  const failures = preview && !preview.ok ? preview.failures : [];
  const count = staged.entries.length;
  const fromAgent = staged.origin !== null;

  return (
    <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2">
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

      {props.error && <p className="border-b bg-rose-400/10 px-3 py-1.5 text-[13px] text-rose-300">{props.error}</p>}
      {failures.length > 0 && (
        <ul className="border-b bg-rose-400/10 px-3 py-1.5 text-[13px] text-rose-300">
          {failures.map((f, i) => (
            <li key={i}>
              {f.entry.op} {f.entry.name}: {f.reason}
            </li>
          ))}
        </ul>
      )}

      <div className="grid max-h-72 grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-4 overflow-y-auto px-3 py-2">
        <div>
          {staged.origin?.rationale && (
            <p className="mb-2 text-[13px] leading-snug text-muted-foreground">{staged.origin.rationale}</p>
          )}
          <DiffColumns entries={staged.entries} cards={props.cards} onRemoveEntry={props.onRemoveEntry} />
        </div>
        <div>
          {props.previewLoading && !preview && <p className="text-[12px] text-muted-foreground">Computing…</p>}
          {preview?.ok && <DeltaTable changes={preview.changes} />}
        </div>
      </div>
    </div>
  );
}
