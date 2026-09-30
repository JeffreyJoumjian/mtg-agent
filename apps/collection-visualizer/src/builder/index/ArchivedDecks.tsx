import { useState } from "react";
import { ArchiveRestore, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useArchivedDecks, useRestoreDeck } from "../state/queries";

/** The decks moved to `decks/_archive/`, folded away under the grid, each with a Restore. */
export function ArchivedDecks() {
  const archived = useArchivedDecks();
  const restore = useRestoreDeck();
  const [open, setOpen] = useState(false);
  const decks = archived.data ?? [];
  if (decks.length === 0) return null;

  return (
    <div className="mt-6 border-t pt-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronRight className={`size-4 transition ${open ? "rotate-90" : ""}`} />
        Archived ({decks.length})
      </button>
      {open && (
        <ul className="mt-2 divide-y rounded-lg border">
          {decks.map((d) => (
            <li key={d.slug} className="flex items-center gap-3 px-3 py-2 text-[13px]">
              <span className="font-medium">{d.name}</span>
              <span className="truncate text-muted-foreground">decks/_archive/{d.slug}</span>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto"
                disabled={restore.isPending}
                onClick={() => restore.mutate(d.slug)}
              >
                <ArchiveRestore /> Restore
              </Button>
            </li>
          ))}
        </ul>
      )}
      {restore.error && <p className="mt-1 text-[12px] text-bad">{String(restore.error)}</p>}
    </div>
  );
}
