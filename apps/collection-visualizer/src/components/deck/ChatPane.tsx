import { useEffect, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";
import type { DeckChat } from "~/lib/deck/use-deck-chat";
import { ChatMessage } from "./ChatMessage";
import { BatchBlock } from "./BatchBlock";
import { ApprovalCard } from "./ApprovalCard";
import { FinalListReview } from "./FinalListReview";
import { Button } from "~/components/ui/button";

interface ChatPaneProps {
  chat: DeckChat;
}

export function ChatPane(props: ChatPaneProps) {
  const { chat } = props;
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const pinnedToBottom = useRef(true);

  // Auto-scroll on new content unless the user scrolled up to read history.
  useEffect(() => {
    const el = scrollRef.current;

    if (el && pinnedToBottom.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [chat.state]);

  function send() {
    const text = draft.trim();
    if (text.length === 0 || chat.state.busy) return;

    chat.sendText(text);
    setDraft("");
    pinnedToBottom.current = true;
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        ref={scrollRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          pinnedToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
        }}
        className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3"
      >
        {!chat.ready && <div className="text-sm text-muted-foreground">Connecting…</div>}
        {chat.ready && chat.state.items.length === 0 && (
          <div className="text-sm text-muted-foreground">
            Talk to your deck agent — research cards, price the list, or say "let's finalize the deck".
          </div>
        )}

        {chat.state.items.map((item) => {
          switch (item.type) {
            case "user":
              return <ChatMessage key={item.id} role="user" text={item.text} />;
            case "assistant":
              return <ChatMessage key={item.id} role="assistant" text={item.text} streaming={item.streaming} />;
            case "batch":
              return (
                <BatchBlock
                  key={item.id}
                  input={item.input}
                  submitted={item.submitted}
                  onSubmit={(calls) => chat.submitBatch(item.id, item.input.batchNumber, calls)}
                />
              );
            case "final-list":
              return (
                <FinalListReview
                  key={item.id}
                  input={item.input}
                  signedOff={item.signedOff}
                  onSignOff={() => chat.signOff(item.id)}
                />
              );
            case "approval":
              return (
                <ApprovalCard
                  key={item.id}
                  tool={item.tool}
                  path={item.path}
                  preview={item.preview}
                  decision={item.decision}
                  onDecide={(decision) => chat.approve(item.requestId, decision)}
                />
              );
            case "activity":
              return (
                <div key={item.id} className="truncate font-mono text-[11px] text-muted-foreground/70">
                  {item.label}
                </div>
              );
            case "notice":
              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs ${
                    item.level === "error" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <span className="min-w-0 flex-1">{item.text}</span>
                  {item.level === "error" && (
                    <Button size="sm" variant="outline" onClick={() => chat.retryLast()}>
                      Retry
                    </Button>
                  )}
                </div>
              );
          }
        })}

        {chat.state.busy && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> thinking…
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="flex shrink-0 items-end gap-2 border-t p-3"
      >
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          rows={Math.min(5, Math.max(1, draft.split("\n").length))}
          placeholder={chat.state.busy ? "Agent is working…" : "Message the deck agent"}
          className="max-h-40 min-h-9 w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Button type="submit" size="icon" disabled={draft.trim().length === 0 || chat.state.busy}>
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
