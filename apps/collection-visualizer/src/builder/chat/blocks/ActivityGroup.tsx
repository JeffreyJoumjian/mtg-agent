import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface ActivityGroupProps {
  labels: string[];
}

/** Consecutive tool calls fold into one line — "4 tool calls" — that expands to the commands. */
export function ActivityGroup(props: ActivityGroupProps) {
  const [open, setOpen] = useState(false);
  const n = props.labels.length;

  return (
    <div className="text-[12px] text-muted-foreground">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1 hover:text-foreground"
      >
        <ChevronRight className={`size-3 transition-transform ${open ? "rotate-90" : ""}`} />
        {n === 1 ? props.labels[0] : `${n} tool calls`}
      </button>
      {open && n > 1 && (
        <ul className="mt-0.5 ml-4 space-y-0.5 font-mono text-[11px]">
          {props.labels.map((l, i) => (
            <li key={i} className="truncate">
              {l}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
