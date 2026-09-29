import { useState, type KeyboardEvent } from "react";
import { MessageSquarePlus, Send, Square } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

export const MODELS: { id: string; label: string }[] = [
  { id: "claude-fable-5-1", label: "Fable 5.1" },
  { id: "claude-opus-5-5", label: "Opus 5.5" },
  { id: "claude-sonnet-5", label: "Sonnet 5" },
  { id: "claude-haiku-4-5-20251001", label: "Haiku 4.5" },
];
export const EFFORTS = ["low", "medium", "high", "xhigh", "max"] as const;
export type Effort = (typeof EFFORTS)[number];

interface ComposerProps {
  busy: boolean;
  pendingKind: string | null;
  model: string | null;
  effort: Effort | null;
  onSend: (text: string) => void;
  onStop: () => void;
  onModel: (model: string | null, effort: Effort | null) => void;
  onNewConversation: () => void;
}

/** The input row: message, model and effort, stop while a turn runs, and a fresh conversation. */
export function Composer(props: ComposerProps) {
  const [text, setText] = useState("");

  const send = () => {
    const t = text.trim();
    if (!t) return;
    props.onSend(t);
    setText("");
  };

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="border-t p-2">
      {props.pendingKind && (
        <p className="mb-1 px-1 text-[12px] text-warn">
          The agent is waiting on the {props.pendingKind === "proposal" ? "staged change" : props.pendingKind} above.
          Typing here answers it with your words instead.
        </p>
      )}
      <div className="flex items-end gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKey}
          rows={2}
          placeholder="Ask about the deck, or tell the agent what to change…"
          className="min-h-[3.25rem] flex-1 resize-none rounded-md border bg-transparent px-3 py-2 text-[14px] outline-none placeholder:text-muted-foreground focus-visible:border-ring"
        />
        {props.busy ? (
          <Button variant="outline" size="icon" onClick={props.onStop} aria-label="Stop">
            <Square />
          </Button>
        ) : (
          <Button size="icon" onClick={send} disabled={!text.trim()} aria-label="Send">
            <Send />
          </Button>
        )}
      </div>
      <div className="mt-1.5 flex items-center gap-1.5">
        <Select
          value={props.model ?? "default"}
          onValueChange={(v) => props.onModel(v === "default" ? null : v, props.effort)}
        >
          <SelectTrigger size="sm" className="h-7 text-[12px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default model</SelectItem>
            {MODELS.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={props.effort ?? "default"}
          onValueChange={(v) => props.onModel(props.model, v === "default" ? null : (v as Effort))}
        >
          <SelectTrigger size="sm" className="h-7 text-[12px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default effort</SelectItem>
            {EFFORTS.map((e) => (
              <SelectItem key={e} value={e}>
                {e}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="ghost" size="sm" className="ml-auto h-7 text-[12px]" onClick={props.onNewConversation}>
          <MessageSquarePlus /> New conversation
        </Button>
      </div>
    </div>
  );
}
