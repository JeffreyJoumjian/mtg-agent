import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { ChatItem } from "../events";

type QuestionItem = Extract<ChatItem, { type: "question" }>;

interface QuestionBlockProps {
  item: QuestionItem;
  onResolve: (answers: Record<string, string>) => void;
}

/** The SDK's AskUserQuestion: options as buttons, a free-text line under each, one send. */
export function QuestionBlock(props: QuestionBlockProps) {
  const { item } = props;
  const done = item.status !== "pending";
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [free, setFree] = useState<Record<string, string>>({});

  const choose = (q: string, label: string, multi: boolean) => {
    if (done) return;
    setAnswers((a) => {
      const current = a[q] ?? [];
      if (!multi) return { ...a, [q]: [label] };
      return { ...a, [q]: current.includes(label) ? current.filter((l) => l !== label) : [...current, label] };
    });
  };

  const compiled: Record<string, string> = {};
  for (const q of item.questions) {
    const typed = (free[q.question] ?? "").trim();
    const chosen = answers[q.question] ?? [];
    compiled[q.question] = typed || chosen.join(", ");
  }
  const complete = item.questions.every((q) => compiled[q.question]);

  return (
    <div className="rounded-lg border bg-card p-3">
      <div className="space-y-3">
        {item.questions.map((q) => {
          const chosen = done ? (item.answers?.[q.question] ?? "").split(", ") : (answers[q.question] ?? []);
          return (
            <div key={q.question}>
              <div className="text-[11px] text-muted-foreground">{q.header}</div>
              <div className="mb-1.5 text-[14px] font-medium">{q.question}</div>
              <div className="flex flex-wrap gap-1.5">
                {q.options.map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    disabled={done}
                    onClick={() => choose(q.question, o.label, q.multiSelect)}
                    title={undefined}
                    className={`rounded-md border px-2 py-1 text-left text-[13px] transition disabled:cursor-default ${
                      chosen.includes(o.label) ? "border-primary bg-primary/10" : "hover:bg-accent"
                    }`}
                  >
                    <div className="font-medium">{o.label}</div>
                    {o.description && <div className="text-[12px] text-muted-foreground">{o.description}</div>}
                  </button>
                ))}
              </div>
              {!done && (
                <Input
                  value={free[q.question] ?? ""}
                  onChange={(e) => setFree((f) => ({ ...f, [q.question]: e.target.value }))}
                  placeholder="Or answer in your own words"
                  className="mt-1.5 h-8 text-[13px]"
                />
              )}
              {done && item.answers?.[q.question] && !q.options.some((o) => chosen.includes(o.label)) && (
                <p className="mt-1 text-[13px]">{item.answers[q.question]}</p>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-end">
        {done ? (
          <span className="text-[12px] text-muted-foreground">Answered</span>
        ) : (
          <Button size="sm" disabled={!complete} onClick={() => props.onResolve(compiled)}>
            <Check /> Answer
          </Button>
        )}
      </div>
    </div>
  );
}
