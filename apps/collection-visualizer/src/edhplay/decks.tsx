/** Combo lists and a collapsible decklist, shared by the game report and the player pages. */
import { useState } from "react";
import type { Combo } from "@mtg/spellbook.ts";
import type { OpponentDeckView } from "./server";
import { CardName, RoleTags } from "./ui";

export function ComboList(props: { combos: Combo[]; almost?: boolean }) {
  return (
    <ul className="space-y-1.5">
      {props.combos.map((c) => (
        <li key={c.id} className="text-[13px]">
          <a
            href={`https://commanderspellbook.com/combo/${c.id}`}
            target="_blank"
            rel="noreferrer"
            className="font-medium hover:underline"
          >
            {c.cards.join(" + ")}
          </a>
          <span className="text-muted-foreground"> → {c.produces.join(", ")}</span>
          {props.almost && c.missing.length > 0 && <span className="text-warn"> (missing {c.missing.join(", ")})</span>}
        </li>
      ))}
    </ul>
  );
}

export function DeckDetails(props: { title: string; deck: OpponentDeckView }) {
  const [open, setOpen] = useState(false);
  const d = props.deck;
  return (
    <div className="rounded-md border">
      <button
        type="button"
        className="flex w-full cursor-pointer items-baseline gap-2 px-3 py-2 text-left text-[13px]"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium">{props.title}</span>
        <span className="text-[12px] text-muted-foreground">
          {d.cards.reduce((a, c) => a + c.quantity, 0)} cards
          {d.bracket !== undefined && ` · Bracket ${d.bracket}`}
          {d.combos.included.length > 0 && ` · ${d.combos.included.length} combos`}
        </span>
        <span className="ml-auto text-[12px] text-muted-foreground">
          {Object.entries(d.roleCounts)
            .filter(([r]) => r !== "land")
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([r, n]) => `${n} ${r}`)
            .join(" · ")}
        </span>
      </button>
      {open && (
        <div className="space-y-2 border-t px-3 py-2">
          {d.combos.included.length > 0 && <ComboList combos={d.combos.included} />}
          <ul className="columns-1 gap-4 text-[13px] sm:columns-2 lg:columns-3">
            {d.cards.map((c) => (
              <li key={c.name} className={c.playedInGame ? "font-semibold" : ""}>
                {c.quantity > 1 && `${c.quantity} `}
                <CardName name={c.name} /> <RoleTags roles={c.roles} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
