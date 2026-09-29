import { useEffect, useRef, type ReactNode } from "react";
import type { ChangeSet } from "@mtg/change-set.ts";
import type { CardView } from "../model/cards";
import { ChangeSetCard } from "../changes/ChangeSetCard";
import { ActivityGroup } from "./blocks/ActivityGroup";
import { ApprovalBlock } from "./blocks/ApprovalBlock";
import { CardsGallery } from "./blocks/CardsGallery";
import { Markdown } from "./blocks/Markdown";
import { PickerBlock } from "./blocks/PickerBlock";
import { QuestionBlock } from "./blocks/QuestionBlock";
import { Composer, type Effort } from "./Composer";
import type { ChatItem, ChatState } from "./events";

interface ChatPaneProps {
  state: ChatState;
  ready: boolean;
  reconnecting: boolean;
  cards: Record<string, CardView>;
  model: string | null;
  effort: Effort | null;
  onSend: (text: string) => void;
  onResolve: (requestId: string, outcome: unknown) => void;
  onApprove: (requestId: string, decision: "allow" | "deny") => void;
  onStop: () => void;
  onModel: (model: string | null, effort: Effort | null) => void;
  onNewConversation: () => void;
  onStageProposal: (requestId: string, changeSet: ChangeSet) => void;
  onDismissProposal: (requestId: string, reason: string) => void;
}

/** Group consecutive activity lines so a research burst reads as one collapsed line. */
function groupItems(items: ChatItem[]): (ChatItem | { type: "activity-group"; id: string; labels: string[] })[] {
  const out: (ChatItem | { type: "activity-group"; id: string; labels: string[] })[] = [];
  for (const item of items) {
    const last = out[out.length - 1];
    if (item.type === "activity" && last && last.type === "activity-group") {
      last.labels.push(item.label);
      continue;
    }
    if (item.type === "activity") {
      out.push({ type: "activity-group", id: item.id, labels: [item.label] });
      continue;
    }
    out.push(item);
  }
  return out;
}

export function ChatPane(props: ChatPaneProps) {
  const { state } = props;
  const scroller = useRef<HTMLDivElement>(null);
  const pinned = useRef(true);

  useEffect(() => {
    const el = scroller.current;
    if (el && pinned.current) el.scrollTop = el.scrollHeight;
  }, [state.items]);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    pinned.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };

  const renderMarkdown = (text: string): ReactNode => <Markdown text={text} />;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div ref={scroller} onScroll={onScroll} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3">
        {!props.ready && <p className="text-[13px] text-muted-foreground">Connecting…</p>}
        {props.ready && state.items.length === 0 && (
          <div className="rounded-lg border border-dashed p-4 text-[13px] text-muted-foreground">
            <p className="mb-1 font-medium text-foreground">Start with the deck in front of you.</p>
            <p>
              Ask what to cut for a card, which four cards are the weakest, or for a tagging pass. Proposals land on the
              board as a diff you apply or dismiss.
            </p>
          </div>
        )}
        {groupItems(state.items).map((item) => {
          switch (item.type) {
            case "user":
              return (
                <div key={item.id} className="ml-8 rounded-lg bg-primary/10 px-3 py-2 text-[14px] whitespace-pre-wrap">
                  {item.text}
                </div>
              );
            case "assistant":
              return (
                <div key={item.id} className={item.streaming ? "opacity-90" : ""}>
                  <Markdown text={item.text} />
                </div>
              );
            case "cards":
              return <CardsGallery key={item.id} title={item.title} cards={item.cards} />;
            case "proposal":
              return (
                <ChangeSetCard
                  key={item.id}
                  item={item}
                  cards={props.cards}
                  renderMarkdown={renderMarkdown}
                  onDismiss={(reason) => props.onDismissProposal(item.requestId, reason)}
                  onLoad={() => props.onStageProposal(item.requestId, item.changeSet)}
                />
              );
            case "picker":
              return (
                <PickerBlock
                  key={item.id}
                  item={item}
                  onResolve={(picks) => props.onResolve(item.requestId, { picks })}
                />
              );
            case "question":
              return (
                <QuestionBlock
                  key={item.id}
                  item={item}
                  onResolve={(answers) => props.onResolve(item.requestId, { answers })}
                />
              );
            case "meta":
              return (
                <p key={item.id} className="text-[12px] text-muted-foreground">
                  Tagged {item.cards.map((c) => c.name).join(", ")}
                </p>
              );
            case "activity-group":
              return <ActivityGroup key={item.id} labels={item.labels} />;
            case "approval":
              return <ApprovalBlock key={item.id} item={item} onDecide={(d) => props.onApprove(item.requestId, d)} />;
            case "notice":
              return (
                <p
                  key={item.id}
                  className={`text-[12px] ${item.level === "error" ? "text-bad" : "text-muted-foreground"}`}
                >
                  {item.text}
                </p>
              );
            default:
              return null;
          }
        })}
        {state.busy && (
          <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-muted-foreground" /> thinking
          </div>
        )}
        {props.reconnecting && <p className="text-[12px] text-warn">Reconnecting to the deck session…</p>}
      </div>
      <Composer
        busy={state.busy}
        pendingKind={state.pending?.kind ?? null}
        model={props.model}
        effort={props.effort}
        onSend={props.onSend}
        onStop={props.onStop}
        onModel={props.onModel}
        onNewConversation={props.onNewConversation}
      />
    </div>
  );
}
