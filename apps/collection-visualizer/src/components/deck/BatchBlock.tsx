import { useEffect, useState } from "react";
import type { BatchInput } from "~/lib/deck/chat-events";
import type { BatchCall } from "~/lib/deck/use-deck-chat";
import { getCardsByNames } from "~/lib/deck/card-images";
import { ManaCost } from "~/components/symbols/Mana";
import { Button } from "~/components/ui/button";

const CALLS = ["keep", "cut", "pocket"] as const;
type Call = (typeof CALLS)[number];

const CALL_STYLE: Record<Call, string> = {
  keep: "bg-emerald-600 text-white",
  cut: "bg-destructive text-white",
  pocket: "bg-sky-600 text-white",
};

function scryImage(card: any): string | null {
  return card?.image_uris?.normal ?? card?.card_faces?.[0]?.image_uris?.normal ?? null;
}

interface BatchBlockProps {
  input: BatchInput;
  submitted: boolean;
  onSubmit: (calls: BatchCall[]) => void;
}

export function BatchBlock(props: BatchBlockProps) {
  const { input, submitted } = props;
  const [calls, setCalls] = useState<Record<string, Call>>({});
  const [images, setImages] = useState<Record<string, any>>({});

  useEffect(() => {
    let cancelled = false;

    void getCardsByNames(input.cards.map((c) => c.name)).then((result) => {
      if (!cancelled) setImages((prev) => ({ ...prev, ...result.cards }));
    });

    return () => {
      cancelled = true;
    };
  }, [input]);

  const called = input.cards.filter((c) => calls[c.name] !== undefined).length;
  const complete = called === input.cards.length;

  return (
    <div className="rounded-lg border bg-card p-3">
      <div className="mb-2 flex items-baseline gap-2">
        <span className="font-semibold">Batch {input.batchNumber}</span>
        {input.totalBatches !== undefined && (
          <span className="text-xs text-muted-foreground">of {input.totalBatches}</span>
        )}
        <span className="ml-auto text-xs text-muted-foreground">
          {submitted ? "submitted" : `called ${called}/${input.cards.length}`}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {input.cards.map((card) => {
          const image = scryImage(images[card.name.toLowerCase()]);
          const call = calls[card.name];

          return (
            <div key={card.name} className="flex flex-col overflow-hidden rounded-md border">
              {image ? (
                <img src={image} alt={card.name} loading="lazy" className="aspect-[488/680] w-full object-contain" />
              ) : (
                <div className="flex aspect-[488/680] items-center justify-center bg-muted p-2 text-center text-xs">
                  {card.name}
                </div>
              )}
              <div className="flex flex-col gap-1 p-1.5">
                <div className="flex items-center gap-1">
                  <span className="truncate text-xs font-medium">{card.name}</span>
                  {card.manaCost && <ManaCost cost={card.manaCost} />}
                </div>
                {card.blurb && <span className="line-clamp-2 text-[10px] text-muted-foreground">{card.blurb}</span>}
                <div className="grid grid-cols-3 gap-1">
                  {CALLS.map((option) => {
                    const active = call === option;
                    return (
                      <button
                        key={option}
                        disabled={submitted}
                        onClick={() => setCalls({ ...calls, [card.name]: option })}
                        className={`rounded px-1 py-1 text-[10px] font-medium uppercase transition ${
                          active ? CALL_STYLE[option] : "bg-muted text-muted-foreground hover:bg-accent"
                        } ${submitted && !active ? "opacity-40" : ""}`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="mt-2 flex justify-end">
          <Button
            size="sm"
            disabled={!complete}
            onClick={() => props.onSubmit(input.cards.map((c) => ({ name: c.name, call: calls[c.name] })))}
          >
            Submit calls
          </Button>
        </div>
      )}
    </div>
  );
}
