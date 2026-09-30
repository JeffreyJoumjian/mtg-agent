import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, Archive } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { ManaSymbol } from "~/components/symbols/Mana";
import type { ColorSymbol } from "~/lib/types";
import type { DeckIndexEntry } from "../model/types";
import { useArchiveDeck } from "../state/queries";

interface DeckCardTileProps {
  entry: DeckIndexEntry;
}

function relative(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(ms / 60_000);
  if (minutes < 60) return `${Math.max(1, minutes)} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours} h ago`;
  return `${Math.round(hours / 24)} d ago`;
}

/** One deck on the index: the commander's art, the name, colours, bracket, size and last change.
 *  An archive button appears on hover; it sits beside the link, not inside it. */
export function DeckCardTile(props: DeckCardTileProps) {
  const { entry } = props;
  const main = entry.lists.find((l) => l.id === "main") ?? entry.lists[0];
  const [confirm, setConfirm] = useState(false);
  const archive = useArchiveDeck();

  return (
    <div className="group relative">
      <Link
        to="/decks/$slug"
        params={{ slug: entry.slug }}
        // `isolate` makes the rounded overflow clip its own stacking context, so a composited child
        // (the zooming art) stays clipped to the corners in every browser instead of spilling out
        // mid-transition and snapping back.
        className="isolate block overflow-hidden rounded-lg border bg-card transition hover:border-ring"
      >
        <div className="relative aspect-[4/1.9] w-full overflow-hidden bg-muted">
          {entry.commanderArt && (
            <img
              src={entry.commanderArt}
              alt=""
              // will-change keeps the image on its own compositing layer at rest too; without it the
              // browser re-rasterises the (fractional-width) image when the scale transition ends,
              // which shows as a one-pixel sideways snap.
              className="h-full w-full object-cover will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] motion-reduce:transition-none"
              loading="lazy"
            />
          )}
          {entry.error && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/80 text-[13px] text-warn">
              <AlertTriangle className="size-4" /> deck.json needs fixing
            </div>
          )}
        </div>
        <div className="space-y-1 p-3">
          <div className="flex items-start justify-between gap-2">
            <h2 className="truncate text-[15px] font-semibold leading-tight">{entry.name}</h2>
            <span className="flex shrink-0 gap-0.5">
              {entry.identity.map((c) => (
                <ManaSymbol key={c} sym={c as ColorSymbol} className="size-3.5" />
              ))}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
            {main && (
              <span>
                <span className="font-medium text-foreground tabular-nums">{main.size}</span>
                {main.kind === "deck" ? "/100" : ""}
              </span>
            )}
            {entry.bracket && <span>bracket {entry.bracket}</span>}
            {entry.lists.length > 1 && <span>{entry.lists.length} lists</span>}
          </div>
          <p className="truncate text-[12px] text-muted-foreground">
            {entry.lastChange
              ? `${entry.lastChange.label} · ${relative(entry.lastChange.at)}`
              : "No changes recorded yet"}
          </p>
        </div>
      </Link>
      <Popover open={confirm} onOpenChange={setConfirm}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={`Archive ${entry.name}`}
            className="absolute top-2 right-2 rounded-md bg-background/80 p-1.5 text-muted-foreground opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100 hover:text-foreground focus-visible:opacity-100 data-[state=open]:opacity-100"
          >
            <Archive className="size-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-72">
          <p className="text-[13px] font-medium">Archive this deck?</p>
          <p className="mt-1 text-[12px] text-muted-foreground">
            The folder moves to decks/_archive/ with everything in it. Restore it any time from the bottom of this page.
          </p>
          {archive.error && <p className="mt-1 text-[12px] text-bad">{String(archive.error)}</p>}
          <div className="mt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setConfirm(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={archive.isPending}
              onClick={() => archive.mutate(entry.slug, { onSuccess: () => setConfirm(false) })}
            >
              {archive.isPending ? "Archiving…" : "Archive"}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
