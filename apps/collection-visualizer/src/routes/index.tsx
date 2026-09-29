import { createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { ArchivedDecks } from "~/builder/index/ArchivedDecks";
import { DeckCardTile } from "~/builder/index/DeckCardTile";
import { DeckSortControl } from "~/builder/index/DeckSortControl";
import { NewDeckForm } from "~/builder/index/NewDeckForm";
import { sortDecks } from "~/builder/index/sort";
import { deckSortAtom } from "~/builder/state/atoms";
import { useDeckIndex } from "~/builder/state/queries";

export const Route = createFileRoute("/")({
  component: DecksHome,
});

function DecksHome() {
  const index = useDeckIndex();
  const [sort, setSort] = useAtom(deckSortAtom);
  const decks = index.data ? sortDecks(index.data, sort) : [];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-[61px] items-center gap-3 border-b px-3">
        <SidebarTrigger />
        <h1 className="text-[15px] font-semibold">Decks</h1>
        <span className="text-[13px] text-muted-foreground">{index.data ? `${index.data.length} in decks/` : ""}</span>
        <div className="ml-auto flex items-center gap-2">
          <DeckSortControl sort={sort} onChange={setSort} />
          <NewDeckForm />
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {index.isPending && <p className="text-[13px] text-muted-foreground">Loading decks…</p>}
        {index.error && <p className="text-[13px] text-bad">{String(index.error)}</p>}
        {index.data && index.data.length === 0 && (
          <div className="rounded-lg border border-dashed p-6 text-[13px] text-muted-foreground">
            No decks yet. Create one and the agent will help you build it.
          </div>
        )}
        {decks.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-3">
            {decks.map((entry) => (
              <DeckCardTile key={entry.slug} entry={entry} />
            ))}
          </div>
        )}
        <ArchivedDecks />
      </div>
    </div>
  );
}
