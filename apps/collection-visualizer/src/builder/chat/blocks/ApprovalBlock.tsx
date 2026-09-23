import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { ChatItem } from "../events";

type ApprovalItem = Extract<ChatItem, { type: "approval" }>;

interface ApprovalBlockProps {
  item: ApprovalItem;
  onDecide: (decision: "allow" | "deny") => void;
}

/** A file write the agent wants to make outside its free zone: the path, the content, two buttons. */
export function ApprovalBlock(props: ApprovalBlockProps) {
  const { item } = props;
  const [open, setOpen] = useState(false);
  const decided = item.decision !== null;

  return (
    <div className={`rounded-lg border p-3 ${decided ? "border-dashed opacity-70" : "border-amber-400/50"}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 text-[13px]">
          <span className="font-medium">{item.tool}</span> <span className="text-muted-foreground">{item.path}</span>
        </div>
        {decided ? (
          <span className="text-[12px] text-muted-foreground">{item.decision === "allow" ? "Allowed" : "Denied"}</span>
        ) : (
          <div className="flex gap-1">
            <Button size="sm" variant="outline" onClick={() => props.onDecide("deny")}>
              <X /> Deny
            </Button>
            <Button size="sm" onClick={() => props.onDecide("allow")}>
              <Check /> Allow
            </Button>
          </div>
        )}
      </div>
      {item.preview && (
        <div className="mt-1.5">
          <button
            type="button"
            className="text-[12px] text-muted-foreground hover:text-foreground"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Hide" : "Show"} content
          </button>
          {open && (
            <pre className="mt-1 max-h-48 overflow-auto rounded-md bg-muted p-2 text-[12px] whitespace-pre-wrap">
              {item.preview}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
