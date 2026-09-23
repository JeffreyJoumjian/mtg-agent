import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cardImage } from "../../model/cards";
import { useCardView } from "../cards-context";
import { CARD_ASPECT, CARD_RADIUS } from "../../board/tokens";
import type { ChatItem } from "../events";

type PickerItem = Extract<ChatItem, { type: "picker" }>;

interface PickerBlockProps {
  item: PickerItem;
  onResolve: (picks: Record<string, string | boolean>) => void;
}

/** `pick_cards`: choose one, choose many, or give every card a label — with the cards in view. */
export function PickerBlock(props: PickerBlockProps) {
  const { item } = props;
  const [picks, setPicks] = useState<Record<string, string | boolean>>({});
  const done = item.status !== "pending";
  const answered = item.picks ?? {};
  const current = done ? answered : picks;

  const toggle = (name: string, value: string | boolean) => {
    if (done) return;
    setPicks((p) => {
      if (item.mode === "one") return { [name]: true };
      if (item.mode === "many") return { ...p, [name]: !p[name] };
      return { ...p, [name]: value };
    });
  };

  const complete =
    item.mode === "label"
      ? item.cards.every((c) => typeof current[c.name] === "string")
      : Object.values(current).some(Boolean);

  return (
    <div className="rounded-lg border bg-card p-3">
      <div className="mb-2">
        <div className="text-[14px] font-semibold">{item.title}</div>
        {item.prompt && <p className="text-[13px] text-muted-foreground">{item.prompt}</p>}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {item.cards.map((c) => (
          <PickTile
            key={c.name}
            name={c.name}
            blurb={c.blurb}
            mode={item.mode}
            labels={item.labels ?? []}
            value={current[c.name]}
            disabled={done}
            onPick={(v) => toggle(c.name, v)}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-end gap-2">
        {done ? (
          <span className="text-[12px] text-muted-foreground">
            {item.status === "answered" ? "Answered" : "Dismissed"}
          </span>
        ) : (
          <Button size="sm" disabled={!complete} onClick={() => props.onResolve(picks)}>
            <Check /> Send picks
          </Button>
        )}
      </div>
    </div>
  );
}

function PickTile(props: {
  name: string;
  blurb?: string;
  mode: "one" | "many" | "label";
  labels: string[];
  value: string | boolean | undefined;
  disabled: boolean;
  onPick: (value: string | boolean) => void;
}) {
  const card = useCardView(props.name);
  const src = cardImage(card, "normal");
  const chosen = props.mode === "label" ? typeof props.value === "string" : props.value === true;

  return (
    <div className={`rounded-md p-1 ${chosen ? "bg-primary/10 ring-1 ring-primary" : ""}`}>
      <button
        type="button"
        disabled={props.disabled || props.mode === "label"}
        onClick={() => props.onPick(true)}
        className="w-full text-left disabled:cursor-default"
      >
        {src ? (
          <img src={src} alt={props.name} loading="lazy" className={`w-full ${CARD_RADIUS}`} />
        ) : (
          <div
            className={`flex w-full items-center justify-center bg-muted p-2 text-center text-[12px] ${CARD_ASPECT} ${CARD_RADIUS}`}
          >
            {props.name}
          </div>
        )}
      </button>
      {props.blurb && <p className="mt-1 text-[12px] leading-snug text-muted-foreground">{props.blurb}</p>}
      {props.mode === "label" && (
        <div className="mt-1 flex flex-wrap gap-1">
          {props.labels.map((label) => (
            <button
              key={label}
              type="button"
              disabled={props.disabled}
              onClick={() => props.onPick(label)}
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium transition ${
                props.value === label
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              } disabled:cursor-default`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
