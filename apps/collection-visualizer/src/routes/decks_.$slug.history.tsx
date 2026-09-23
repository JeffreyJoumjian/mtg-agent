import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import { ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { buildTimeline, HistoryTimeline } from "~/builder/history/HistoryTimeline";
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
  const version = useVersion(slug, selected);
  const setStaged = useSetAtom(stagedAtom);
  const setPreviewMode = useSetAtom(previewModeAtom);
  const setActiveList = useSetAtom(activeListAtom);
  const navigate = useNavigate();

  const items = history.data ? buildTimeline(history.data.entries, history.data.versions) : [];
  const selectedItem = items.find((i) => i.file === selected) ?? null;

  const restore = () => {
    const v = version.data;
    if (!v) return;
    setStaged((all) => ({
      ...all,
      [slug]: {
        listId: v.listId,
        label: `restore ${v.file.replace(/\.(json|md)$/, "")}`,
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
          {history.error && <p className="text-[13px] text-rose-300">{String(history.error)}</p>}
          {history.data && <HistoryTimeline items={items} selected={selected} onSelect={setSelected} />}
        </div>
        <div className="min-h-0">
          {!selected && (
            <p className="p-4 text-[13px] text-muted-foreground">
              Pick a version on the left to see the deck as it was, compare it with today, or restore it.
            </p>
          )}
          {selected && version.isPending && <p className="p-4 text-[13px] text-muted-foreground">Loading version…</p>}
          {selected && version.error && <p className="p-4 text-[13px] text-rose-300">{String(version.error)}</p>}
          {version.data && (
            <VersionView version={version.data} restorable={selectedItem?.restorable ?? true} onRestore={restore} />
          )}
        </div>
      </div>
    </div>
  );
}
