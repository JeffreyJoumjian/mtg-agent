import type { ReactNode } from "react";
import { Check, Clock, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { ChatItem } from "../chat/events";
import type { CardView } from "../model/cards";
import { DiffColumns } from "./DiffColumns";

type ProposalItem = Extract<ChatItem, { type: "proposal" }>;

interface ChangeSetCardProps {
  item: ProposalItem;
  cards: Record<string, CardView>;
  renderMarkdown: (text: string) => ReactNode;
  /** Pending: the staged panel holds it; this only offers a dismiss. Otherwise: re-stage it. */
  onDismiss: (reason: string) => void;
  onLoad: () => void;
}

/** An agent proposal in the chat: label, why, the diff, and where it stands. The staged panel is
 *  where it is applied; this card mirrors the state and offers the two shortcuts. */
export function ChangeSetCard(props: ChangeSetCardProps) {
  const { item, cards } = props;
  const { changeSet } = item;

  const status =
    item.status === "applied" ? (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
        <Check className="size-3" /> Applied
      </span>
    ) : item.status === "dismissed" ? (
      <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
        <X className="size-3" /> Dismissed
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-0.5 text-[11px] font-medium text-amber-300">
        <Clock className="size-3" /> Waiting in the staged panel
      </span>
    );

  return (
    <div className="rounded-lg border bg-card p-3">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <div className="text-[14px] font-semibold">{changeSet.label}</div>
          <div className="text-[11px] text-muted-foreground">
            list {changeSet.listId} · {changeSet.entries.length} {changeSet.entries.length === 1 ? "change" : "changes"}
          </div>
        </div>
        {status}
      </div>
      {changeSet.rationale && (
        <div className="mb-2 text-[13px] leading-snug [&_p]:mb-1">{props.renderMarkdown(changeSet.rationale)}</div>
      )}
      <DiffColumns entries={changeSet.entries} cards={cards} compact />
      <div className="mt-2 flex justify-end gap-2">
        {item.status === "pending" ? (
          <Button variant="ghost" size="sm" onClick={() => props.onDismiss("dismissed from the chat")}>
            Dismiss
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={props.onLoad}>
            Stage again
          </Button>
        )}
      </div>
      {item.status === "dismissed" && item.outcome && "reason" in item.outcome && (
        <p className="mt-1 text-[11px] text-muted-foreground">{item.outcome.reason}</p>
      )}
    </div>
  );
}
