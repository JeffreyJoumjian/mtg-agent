import { useEffect, useState } from "react";
import type { LiveState } from "~/lib/deck/live-state";
import { getCardsByNames } from "~/lib/deck/card-images";
import { CardStackColumn, CopiedChip, scryImage, useCopyCardName } from "./CardStackColumn";

interface LiveBoardProps {
  state: LiveState;
}

/** Read-only mirror of the terminal exercise: the debated batch big on top, then every pile as
 *  deck-builder image columns — keep categories first, then Considering / Pocket / Cut. */
export function LiveBoard(props: LiveBoardProps) {
  const { state } = props;
  const [cards, setCards] = useState<Record<string, any>>({});
  const [imagesDegraded, setImagesDegraded] = useState(false);
  const { copiedName, copy } = useCopyCardName();

  const allNames = [
    ...(state.batch?.cards.map((c) => c.name) ?? []),
    ...state.keep.flatMap((g) => g.cards),
    ...state.considering,
    ...state.pocket,
    ...state.cut,
  ];
  const namesKey = allNames.join("|");

  useEffect(() => {
    if (allNames.length === 0) return;
    let cancelled = false;

    void getCardsByNames(allNames).then((result) => {
      if (cancelled) return;
      setCards((prev) => ({ ...prev, ...result.cards }));
      setImagesDegraded(result.missing.length > 0);
    });

    return () => {
      cancelled = true;
    };
  }, [namesKey]);

  const t = state.tally;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      {t && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b bg-card px-4 py-2 text-xs">
          <span className={`font-medium ${t.keeps > t.target ? "text-amber-500" : ""}`}>
            keeps {t.keeps}/{t.target}
          </span>
          <span className="text-muted-foreground">cuts {t.cuts}</span>
          <span className="text-muted-foreground">pocket {t.pockets}</span>
          <span
            className={t.gcCeiling !== undefined && t.gameChangers > t.gcCeiling ? "font-medium text-destructive" : ""}
          >
            GC {t.gameChangers}
            {t.gcCeiling !== undefined ? `/${t.gcCeiling}` : ""}
          </span>
          {t.manaSources !== undefined && <span className="text-muted-foreground">sources {t.manaSources}</span>}
          {state.note && <span className="ml-auto italic text-muted-foreground">{state.note}</span>}
        </div>
      )}
      {!t && state.note && (
        <div className="border-b bg-card px-4 py-2 text-xs italic text-muted-foreground">{state.note}</div>
      )}
      {imagesDegraded && (
        <div className="border-b bg-amber-500/10 px-4 py-1 text-xs text-amber-500">
          Some card images unavailable (Scryfall hiccup) — they retry on the next update.
        </div>
      )}

      {state.batch && (
        <section className="border-b p-4">
          <h2 className="mb-2 text-sm font-semibold">
            On the table — batch {state.batch.batchNumber}
            {state.batch.totalBatches !== null && (
              <span className="text-muted-foreground"> of {state.batch.totalBatches}</span>
            )}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {state.batch.cards.map((card) => {
              const image = scryImage(cards[card.name.toLowerCase()]);
              return (
                <div key={card.name} className="flex flex-col gap-1">
                  <div className="relative cursor-pointer" onClick={() => copy(card.name)}>
                    {image ? (
                      <img
                        src={image}
                        alt={card.name}
                        loading="lazy"
                        className="aspect-[488/680] w-full rounded-lg shadow"
                      />
                    ) : (
                      <div className="flex aspect-[488/680] items-center justify-center rounded-lg border bg-muted p-2 text-center text-sm">
                        {card.name}
                      </div>
                    )}
                    {copiedName === card.name && <CopiedChip />}
                  </div>
                  {card.blurb && <span className="line-clamp-2 text-[11px] text-muted-foreground">{card.blurb}</span>}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* The piles, deck-builder style: keep categories first, then the holding piles. */}
      <div className="overflow-x-auto">
        <div className="flex items-start gap-3 p-4">
          {state.keep.map((group) => (
            <CardStackColumn
              key={group.name}
              // The terminal sometimes writes counts into group names ("Lands (35)") — strip
              // them; the column renders its own count.
              title={group.name.replace(/\s*\(\d+\)\s*$/, "")}
              count={group.cards.length}
              cards={group.cards.map((name) => ({ name }))}
              images={cards}
            />
          ))}
          {state.keep.length === 0 && (
            <div className="w-44 shrink-0 pt-1 text-xs text-muted-foreground">Nothing locked in yet.</div>
          )}

          {state.considering.length > 0 && (
            <CardStackColumn
              title="Considering"
              count={state.considering.length}
              cards={state.considering.map((name) => ({ name }))}
              images={cards}
              headerClassName="!text-sky-400"
            />
          )}
          {state.pocket.length > 0 && (
            <CardStackColumn
              title="Pocket / subs"
              count={state.pocket.length}
              cards={state.pocket.map((name) => ({ name }))}
              images={cards}
              headerClassName="!text-violet-400"
            />
          )}
          {state.cut.length > 0 && (
            <CardStackColumn
              title="Cut"
              count={state.cut.length}
              cards={state.cut.map((name) => ({ name, dim: true }))}
              images={cards}
            />
          )}
        </div>
      </div>
    </div>
  );
}
