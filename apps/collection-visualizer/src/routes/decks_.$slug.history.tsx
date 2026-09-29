import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { HistoryTimeline } from "~/builder/history/HistoryTimeline";
import { buildTimeline } from "~/builder/history/timeline";
import { VersionView } from "~/builder/history/VersionView";
import { activeListAtom, previewModeAtom, stagedAtom } from "~/builder/state/atoms";
import { useHistory, useVersion } from "~/builder/state/queries";

export const Route = createFileRoute("/decks_/$slug/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const { slug } = Route.useParams();
  const history = useHistory(slug);
  const [selected, setSelected] = useState<string | null>(null);
  const setStaged = useSetAtom(stagedAtom);
  const setPreviewMode = useSetAtom(previewModeAtom);
  const setActiveList = useSetAtom(activeListAtom);
  const navigate = useNavigate();

  const items = history.data ? buildTimeline(history.data.entries, history.data.versions) : [];
  const selectedItem = items.find((i) => i.key === selected) ?? null;
  const version = useVersion(
    slug,
    selectedItem
      ? {
          listId: selectedItem.listId,
          file: selectedItem.file,
          changeFile: selectedItem.entry?.snapshot.replace(/^versions\//, "") ?? null,
        }
      : null,
  );

  const restore = () => {
    const v = version.data;
    if (!v || !selectedItem) return;
    setStaged((all) => ({
      ...all,
      [slug]: {
        listId: v.listId,
        label: `restore “${selectedItem.label}”`,
        origin: null,
        entries: v.restoreEntries.map((e) => ({ ...e, author: "user" as const })),
      },
    }));
    // The staged panel only shows for the open list, so open the list the restore targets.
    setActiveList((a) => ({ ...a, [slug]: v.listId }));
    setPreviewMode("after");
    void navigate({ to: "/decks/$slug", params: { slug }, search: {} });
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-[61px] items-center gap-3 border-b px-3">
        <SidebarTrigger />
        <Button variant="ghost" size="sm" asChild>
          <Link to="/decks/$slug" params={{ slug }} search={{}}>
            <ArrowLeft /> {slug}
          </Link>
        </Button>
        <h1 className="text-[15px] font-semibold">History</h1>
        <span className="text-[13px] text-muted-foreground">{items.length ? `${items.length} versions` : ""}</span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[320px_minmax(0,1fr)]">
        <div className="overflow-y-auto border-r p-3">
          {history.isPending && <p className="text-[13px] text-muted-foreground">Loading…</p>}
          {history.error && <p className="text-[13px] text-bad">{String(history.error)}</p>}
          {history.data && <HistoryTimeline items={items} selected={selected} onSelect={setSelected} />}
        </div>
        <div className="min-h-0">
          {!selectedItem && (
            <p className="p-4 text-[13px] text-muted-foreground">
              Pick a change on the left to see what it did, the list as it stood after it, how that differs from today,
              or to restore it.
            </p>
          )}
          {selectedItem && version.isPending && (
            <p className="p-4 text-[13px] text-muted-foreground">Loading version…</p>
          )}
          {selectedItem && version.error && <p className="p-4 text-[13px] text-bad">{String(version.error)}</p>}
          {selectedItem && version.data && (
            <VersionView key={selectedItem.key} item={selectedItem} version={version.data} onRestore={restore} />
          )}
        </div>
      </div>
    </div>
  );
}
