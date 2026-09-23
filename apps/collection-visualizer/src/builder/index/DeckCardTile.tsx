import { Link } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";
import { ManaSymbol } from "~/components/symbols/Mana";
import type { ColorSymbol } from "~/lib/types";
import type { DeckIndexEntry } from "../model/types";

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

/** One deck on the index: the commander's art, the name, colours, bracket, size and last change. */
export function DeckCardTile(props: DeckCardTileProps) {
  const { entry } = props;
  const main = entry.lists.find((l) => l.id === "main") ?? entry.lists[0];

  return (
    <Link
      to="/decks/$slug"
      params={{ slug: entry.slug }}
      className="group block overflow-hidden rounded-lg border bg-card transition hover:border-ring"
    >
      <div className="relative aspect-[4/1.9] w-full overflow-hidden bg-muted">
        {entry.commanderArt && (
          <img
            src={entry.commanderArt}
            alt=""
            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
            loading="lazy"
          />
        )}
        {entry.error && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/80 text-[13px] text-amber-300">
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
  );
}
