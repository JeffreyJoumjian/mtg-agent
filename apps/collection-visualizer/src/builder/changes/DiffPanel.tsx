import type { ChangeEntry } from "@mtg/change-set.ts";
import type { StatChange } from "@mtg/deck-stats.ts";
import type { CardView } from "../model/cards";
import { DeltaTable } from "./DeltaTable";
import { DiffColumns } from "./DiffColumns";

interface DiffPanelProps<T extends ChangeEntry> {
  entries: T[];
  cards: Record<string, CardView>;
  /** Every number the entries move. Undefined while `loading`, or when there is nothing to show. */
  changes: StatChange[] | undefined;
  loading?: boolean;
  rationale?: string;
  onRemoveEntry?: (entry: T) => void;
}

/** The body the staged panel and the history share: the diff on the left — swaps first — and every
 *  number that moves on the right. */
export function DiffPanel<T extends ChangeEntry>(props: DiffPanelProps<T>) {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,3fr)_minmax(0,2fr)] content-start gap-4 overflow-y-auto px-3 py-2">
      <div>
        {props.rationale && <p className="mb-2 text-[13px] leading-snug text-muted-foreground">{props.rationale}</p>}
        <DiffColumns entries={props.entries} cards={props.cards} onRemoveEntry={props.onRemoveEntry} />
      </div>
      <div>
        {props.loading && <p className="text-[12px] text-muted-foreground">Computing…</p>}
        {props.changes && <DeltaTable changes={props.changes} />}
      </div>
    </div>
  );
}
