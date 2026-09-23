import { useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { History } from "lucide-react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { MAIN_LIST } from "@mtg/deck-model.ts";
import type { ChangeEntry, ChangeSet } from "@mtg/change-set.ts";
import { computeStats, deckIdentity } from "@mtg/deck-stats.ts";
import { Button } from "~/components/ui/button";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { DeckBoard } from "~/builder/board/DeckBoard";
import { StatsRail } from "~/builder/rail/StatsRail";
import { StagedPanel } from "~/builder/changes/StagedPanel";
import { ChatPane } from "~/builder/chat/ChatPane";
import { DeckCardsProvider } from "~/builder/chat/cards-context";
import { useDeckChat } from "~/builder/chat/use-deck-chat";
import type { Effort } from "~/builder/chat/Composer";
import { ListTabs } from "~/builder/ListTabs";
import {
  activeListAtom,
  boardViewAtom,
  chatModelAtom,
  highlightTagAtom,
  paneLayoutAtom,
  previewModeAtom,
  selectedCardAtom,
  stagedAtom,
} from "~/builder/state/atoms";
import { useApplyChanges, useChatActions, useDeck, usePreview } from "~/builder/state/queries";
import { addEntry, clearStaged, mergeAgentProposal, removeEntryAt, toChangeSet } from "~/builder/state/staged";

export const Route = createFileRoute("/decks/$slug")({
  validateSearch: (search: Record<string, unknown>): { intro?: string } => ({
    intro: typeof search.intro === "string" ? search.intro : undefined,
  }),
  component: Workbench,
});

function Workbench() {
  const { slug } = Route.useParams();
  const { intro } = Route.useSearch();
  const deckQuery = useDeck(slug);

  const [stagedAll, setStagedAll] = useAtom(stagedAtom);
  const staged = stagedAll[slug] ?? null;
  const setStaged = (next: ReturnType<typeof addEntry> | null) => setStagedAll((all) => ({ ...all, [slug]: next }));
  const [previewMode, setPreviewMode] = useAtom(previewModeAtom);
  const [selected, setSelected] = useAtom(selectedCardAtom);
  const [highlightTag, setHighlightTag] = useAtom(highlightTagAtom);
  const [activeAll, setActiveAll] = useAtom(activeListAtom);
  const [viewAll, setViewAll] = useAtom(boardViewAtom);
  const [modelAll, setModelAll] = useAtom(chatModelAtom);
  const [layout, setLayout] = useAtom(paneLayoutAtom);
  const [label, setLabel] = useState("");
  const [applyError, setApplyError] = useState<string | null>(null);

  const chat = useDeckChat(slug, {
    onProposal: (requestId, changeSet) => {
      setStagedAll((all) => ({ ...all, [slug]: mergeAgentProposal(all[slug] ?? null, { requestId, changeSet }) }));
      // The staged panel belongs to the open list; open the one the agent proposed against.
      setActiveAll((a) => ({ ...a, [slug]: changeSet.listId }));
      setPreviewMode("after");
    },
  });
  const actions = useChatActions(slug);
  const apply = useApplyChanges(slug);

  const deck = deckQuery.data?.deck;
  const listIds = deck ? Object.keys(deck.lists) : [];
  const activeId =
    deck && activeAll[slug] && deck.lists[activeAll[slug]]
      ? activeAll[slug]
      : deck?.lists[MAIN_LIST]
        ? MAIN_LIST
        : listIds[0];

  // A brand-new deck opens with the agent's onboarding question.
  const introSent = useRef(false);
  useEffect(() => {
    if (intro && chat.ready && chat.state.items.length === 0 && !introSent.current) {
      introSent.current = true;
      void actions.send(
        "This is a brand-new deck. Ask me about the commander and the gameplan, one question at a time, then propose a first skeleton.",
        activeId,
      );
    }
  }, [intro, chat.ready, chat.state.items.length, actions, activeId]);

  // A chip click in the chat scrolls the board to that card.
  useEffect(() => {
    if (!selected) return;
    const el = document.querySelector<HTMLElement>(`[data-card="${CSS.escape(selected)}"]`);
    el?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [selected]);

  const changeSet: ChangeSet | null = staged && staged.entries.length > 0 ? toChangeSet(staged, label) : null;
  const preview = usePreview(slug, changeSet);

  if (deckQuery.isPending) return <p className="p-4 text-[13px] text-muted-foreground">Loading {slug}…</p>;
  if (deckQuery.error || !deckQuery.data || !deck) {
    return <p className="p-4 text-[13px] text-rose-300">{String(deckQuery.error ?? "not found")}</p>;
  }

  const { cards, error, cardDataError } = deckQuery.data;
  if (error) {
    return (
      <div className="p-4 text-[13px]">
        <p className="mb-1 font-medium text-rose-300">decks/{slug}/deck.json could not be read.</p>
        <pre className="rounded-md bg-muted p-2 text-[12px] whitespace-pre-wrap">{error}</pre>
      </div>
    );
  }
  if (!activeId) {
    return <p className="p-4 text-[13px] text-muted-foreground">This deck has no lists yet.</p>;
  }

  const list = deck.lists[activeId];
  const stagedHere = staged && staged.listId === activeId ? staged : null;
  const allCards = { ...cards, ...(preview.data?.ok ? preview.data.cards : {}) };
  const identity = deckIdentity(deck, cards);
  const stats = computeStats(list, cards, deck.cards, identity);
  const view = viewAll[slug] ?? "board";
  const chatModel = modelAll[slug] ?? { model: null, effort: null };

  const stage = (entry: ChangeEntry) => {
    setStaged(addEntry(staged, activeId, entry));
    setApplyError(null);
  };

  const finish = () => {
    setStaged(clearStaged());
    setLabel("");
    setPreviewMode("current");
    setApplyError(null);
  };

  const answerAgent = (requestId: string, outcome: unknown, whenGone: string) => {
    void actions.resolve(requestId, outcome).then((res) => {
      if (!res.ok) setApplyError(whenGone);
    });
  };

  const onApply = () => {
    if (!staged || !changeSet) return;
    apply.mutate(changeSet, {
      onSuccess: (outcome) => {
        if (!outcome.ok) {
          setApplyError(outcome.failures.map((f) => `${f.entry.op} ${f.entry.name}: ${f.reason}`).join("\n"));
          return;
        }
        const origin = staged.origin;
        finish();
        if (origin) {
          answerAgent(
            origin.requestId,
            { status: "applied", entries: outcome.entry.entries, historyId: outcome.entry.id },
            "Applied. The agent was no longer waiting on this proposal (the session had restarted), so tell it in the chat.",
          );
        }
      },
      onError: (err) => setApplyError(String(err)),
    });
  };

  const onDiscard = () => {
    const origin = staged?.origin;
    finish();
    if (origin) answerAgent(origin.requestId, { status: "dismissed", reason: "discarded in the staged panel" }, "");
  };

  return (
    <DeckCardsProvider cards={allCards}>
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex h-[61px] items-center gap-3 border-b px-3">
          <SidebarTrigger />
          <div className="min-w-0">
            <h1 className="truncate text-[15px] font-semibold leading-tight">{deck.name}</h1>
            {list.bracket && <p className="text-[12px] text-muted-foreground">Bracket {list.bracket}</p>}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/decks/$slug/history" params={{ slug }}>
                <History /> History
              </Link>
            </Button>
          </div>
        </div>
        {cardDataError && (
          <p className="border-b bg-amber-400/10 px-3 py-1.5 text-[12px] text-amber-300">
            Card data may be stale: {cardDataError}
          </p>
        )}

        <Group
          orientation="horizontal"
          className="min-h-0 flex-1"
          defaultLayout={layout ?? undefined}
          onLayoutChanged={(next) => setLayout(next as Record<string, number>)}
        >
          <Panel id="rail" defaultSize="19%" minSize="14%" className="h-full min-w-0 border-r">
            <StatsRail
              stats={stats}
              after={preview.data?.ok && stagedHere ? preview.data.after : null}
              changes={preview.data?.ok && stagedHere ? preview.data.changes : []}
              highlightTag={highlightTag}
              onHighlightTag={setHighlightTag}
              header={
                <div className="border-b px-2 py-1.5">
                  <ListTabs
                    slug={slug}
                    deck={deck}
                    active={activeId}
                    onChange={(id) => setActiveAll((a) => ({ ...a, [slug]: id }))}
                  />
                </div>
              }
            />
          </Panel>
          <Separator className="w-1 bg-border/40 transition hover:bg-ring data-[resize-handle-active]:bg-ring" />
          <Panel id="board" minSize="30%" className="flex h-full min-w-0 flex-col">
            <div className="min-h-0 flex-1">
              <DeckBoard
                slug={slug}
                list={list}
                cards={allCards}
                meta={deck.cards}
                staged={stagedHere}
                previewMode={previewMode}
                view={view}
                selected={selected}
                highlightTag={highlightTag}
                onView={(v) => setViewAll((a) => ({ ...a, [slug]: v }))}
                onSelect={setSelected}
                onStage={stage}
              />
            </div>
            {stagedHere && stagedHere.entries.length > 0 && (
              <StagedPanel
                staged={stagedHere}
                cards={allCards}
                preview={preview.data}
                previewLoading={preview.isFetching}
                previewMode={previewMode}
                label={label}
                applying={apply.isPending}
                error={applyError}
                onPreviewMode={setPreviewMode}
                onLabel={setLabel}
                onRemoveEntry={(entry) => setStaged(removeEntryAt(staged, stagedHere.entries.indexOf(entry)))}
                onApply={onApply}
                onDiscard={onDiscard}
              />
            )}
          </Panel>
          <Separator className="w-1 bg-border/40 transition hover:bg-ring data-[resize-handle-active]:bg-ring" />
          <Panel id="chat" defaultSize="30%" minSize="20%" className="h-full min-w-0 border-l">
            <ChatPane
              state={chat.state}
              ready={chat.ready}
              reconnecting={chat.reconnecting}
              cards={allCards}
              model={chatModel.model}
              effort={chatModel.effort as Effort | null}
              onSend={(text) => void actions.send(text, activeId)}
              onResolve={(requestId, outcome) =>
                answerAgent(requestId, outcome, "The agent was no longer waiting on that request.")
              }
              onApprove={(requestId, decision) => void actions.approve(requestId, decision)}
              onStop={() => void actions.interrupt()}
              onModel={(model, effort) => {
                setModelAll((a) => ({ ...a, [slug]: { model, effort } }));
                void actions.setModel(model, effort);
              }}
              onNewConversation={() => {
                if (window.confirm("Start a new conversation? The current one is archived, not deleted.")) {
                  void actions.newConversation();
                }
              }}
              onStageProposal={(requestId, cs) => {
                setStaged(mergeAgentProposal(staged, { requestId, changeSet: cs }));
                setActiveAll((a) => ({ ...a, [slug]: cs.listId }));
                setPreviewMode("after");
              }}
              onDismissProposal={(requestId, reason) => {
                answerAgent(requestId, { status: "dismissed", reason }, "");
                if (staged?.origin?.requestId === requestId) finish();
              }}
            />
          </Panel>
        </Group>
      </div>
    </DeckCardsProvider>
  );
}
