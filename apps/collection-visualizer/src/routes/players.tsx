import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import type { PlayerSummary } from "@mtg/edhplay-games.ts";
import { Search } from "lucide-react";
import { usePlayers } from "~/edhplay/queries";
import { CommanderAvatar, EmptyPanel, ErrorPanel, Page, RecordText, agoLabel } from "~/edhplay/ui";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/players")({
  component: PlayersPage,
});

type Sort = "last" | "games" | "toughest";

const SORTS: { id: Sort; label: string; title: string }[] = [
  { id: "last", label: "Last seen", title: "The players you saw most recently first" },
  { id: "games", label: "Most games", title: "The players you've shared the most games with first" },
  { id: "toughest", label: "Toughest", title: "The players you have the worst record against first" },
];

/** Toughest: the widest losing margin against them first, then the most wins they've taken. */
function compare(sort: Sort, a: PlayerSummary, b: PlayerSummary): number {
  if (sort === "games") return b.games + b.spectated - (a.games + a.spectated) || b.lastSeen - a.lastSeen;
  if (sort === "toughest") {
    return b.myLosses - b.myWins - (a.myLosses - a.myWins) || b.theirWins - a.theirWins || b.lastSeen - a.lastSeen;
  }
  return b.lastSeen - a.lastSeen;
}

function PlayersPage() {
  const query = usePlayers();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("last");
  const players = query.data?.players ?? [];
  const notes = query.data?.notes ?? {};
  const again = players.filter((p) => p.games + p.spectated > 1).length;

  const needle = search.trim().toLowerCase();
  const shown = players
    .filter(
      (p) =>
        !needle ||
        p.username.toLowerCase().includes(needle) ||
        p.commanders.some((c) => c.name.toLowerCase().includes(needle)),
    )
    .sort((a, b) => compare(sort, a, b));

  return (
    <Page
      title="Players"
      busy={query.isPending}
      subtitle={
        query.isPending
          ? "Loading players…"
          : players.length > 0
            ? `${players.length} player${players.length === 1 ? "" : "s"} seen on EDHPlay, spectated tables included · ${again} more than once`
            : undefined
      }
      actions={
        players.length > 0 && (
          <>
            <label className="flex items-center gap-2 rounded-full bg-muted px-3.5 py-2 text-muted-foreground">
              <Search className="size-4" aria-hidden />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find a player or commander"
                aria-label="Find a player or commander"
                className="w-[220px] bg-transparent text-[13px] text-foreground outline-none"
              />
            </label>
            <div role="group" aria-label="Sort players" className="flex gap-1 rounded-full bg-muted p-1">
              {SORTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  title={s.title}
                  aria-pressed={sort === s.id}
                  onClick={() => setSort(s.id)}
                  className={cn(
                    "cursor-pointer rounded-full px-3 py-1.5 text-[12px]",
                    sort === s.id
                      ? "bg-foreground font-semibold text-background"
                      : "font-medium text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </>
        )
      }
    >
      {query.isPending && (
        <section className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading players">
          {["a", "b", "c", "d", "e", "f"].map((k) => (
            <Skeleton key={k} className="h-[150px] rounded-2xl" />
          ))}
        </section>
      )}
      {query.error && (
        <ErrorPanel title="Couldn't load players" error={query.error} onRetry={() => void query.refetch()} />
      )}
      {query.data && players.length === 0 && (
        <EmptyPanel title="Nobody yet">
          Everyone you play with or watch on EDHPlay shows up here after your first recorded game or the first
          match-history sync. You can keep private notes and tags on each of them, and the side panel shows those notes
          when you sit down together again.
        </EmptyPanel>
      )}
      {players.length > 0 && shown.length === 0 && (
        <section className="flex flex-col items-start gap-2.5 rounded-2xl bg-card px-8 py-6">
          <span className="font-display text-[22px] font-semibold uppercase">No match for "{search.trim()}"</span>
          <span className="text-muted-foreground">
            Nobody you've met matches that name or commander. Clear the search to see everyone.
          </span>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="cursor-pointer rounded-lg bg-muted px-4 py-2 text-[13px] font-semibold"
          >
            Clear search
          </button>
        </section>
      )}
      {shown.length > 0 && (
        <section className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <PlayerCard key={p.username} player={p} tags={notes[p.username.toLowerCase()]?.tags ?? []} />
          ))}
        </section>
      )}
    </Page>
  );
}

function PlayerCard(props: { player: PlayerSummary; tags: string[] }) {
  const p = props.player;
  const main = p.commanders[0]?.name;
  const decided = p.myWins + p.myLosses > 0;
  return (
    <Link
      to="/players/$username"
      params={{ username: p.username }}
      className="flex flex-col gap-3 rounded-2xl bg-card p-4 transition-transform hover:-translate-y-0.5 hover:shadow-lg focus-visible:-translate-y-0.5"
    >
      <div className="flex items-center gap-3">
        <CommanderAvatar name={main?.split(" + ")[0]} size={52} />
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-[16px] font-semibold">{p.username}</span>
          <span className="text-[12px] text-muted-foreground">last seen {agoLabel(p.lastSeen)}</span>
        </div>
        <div className="ml-auto flex flex-col text-right">
          {decided ? (
            <RecordText
              wins={p.myWins}
              losses={p.myLosses}
              className={cn(
                "text-[28px] leading-none",
                p.myWins > p.myLosses && "text-good",
                p.myWins < p.myLosses && "text-bad",
              )}
            />
          ) : (
            <span className="font-display text-[28px] leading-none font-bold text-muted-foreground">–</span>
          )}
          <span className="text-[11px] text-muted-foreground">you vs them</span>
        </div>
      </div>
      {(props.tags.length > 0 || p.spectated > 0) && (
        <div className="flex flex-wrap gap-1.5">
          {props.tags.map((t) => (
            <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-[12px]">
              {t}
            </span>
          ))}
          {p.spectated > 0 && (
            <span className="rounded-full bg-move/15 px-2.5 py-0.5 text-[12px] text-move">watched {p.spectated}×</span>
          )}
        </div>
      )}
      <div className="mt-auto flex justify-between gap-3 border-t border-border pt-2.5 text-[12px] text-muted-foreground">
        <span>
          {p.games} game{p.games === 1 ? "" : "s"} · they won {p.theirWins}
        </span>
        {main && <span className="truncate">plays {main.split(" + ").map((n) => n.split(",")[0]).join(" + ")}</span>}
      </div>
    </Link>
  );
}
