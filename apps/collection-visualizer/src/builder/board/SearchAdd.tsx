import { useEffect, useRef, useState } from "react";
import { Plus, Search } from "lucide-react";
import { isCommanderSection } from "@mtg/deck-model.ts";
import type { ChangeEntry } from "@mtg/change-set.ts";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { ManaCost } from "~/components/symbols/Mana";
import { manaToShow } from "~/lib/card/mana";
import { cardImage, deckNameOf as deckName } from "../model/cards";
import { useSearchCards } from "../state/queries";

interface SearchAddProps {
  slug: string;
  sections: string[];
  /** `add` stages an add into the chosen section; `rename` hands the picked name to `onPick`. */
  mode?: "add" | "rename";
  /** `block` lays the results out under the input, pushing content down (a popover, a dialog).
   *  `inline` is the always-on toolbar search: a compact input whose results drop down over the
   *  board and go away on Escape or a click elsewhere. */
  layout?: "block" | "inline";
  initialQuery?: string;
  onStage: (entry: ChangeEntry) => void;
  onPick?: (name: string) => void;
}

/** Scryfall search with a section target. Results are tiles; a click stages the add (nothing is
 *  written until Apply). Scryfall syntax works: `t:squirrel id<=bg`, `o:"each opponent loses"`. */
export function SearchAdd(props: SearchAddProps) {
  const mode = props.mode ?? "add";
  const inline = props.layout === "inline";
  const [query, setQuery] = useState(props.initialQuery ?? "");
  const [debounced, setDebounced] = useState(query);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const nonCommander = props.sections.filter((s) => !isCommanderSection(s));
  const landSection = nonCommander.find((s) => /\bland/i.test(s)) ?? null;
  const spellDefault =
    nonCommander.find((s) => s !== landSection) ?? nonCommander[0] ?? props.sections[0] ?? "Theme / Synergy";
  const [section, setSection] = useState(spellDefault);
  const [touched, setTouched] = useState(false);
  const [newSection, setNewSection] = useState("");

  /** Until the user picks a section, a land goes to the land section and a spell to the default. */
  const sectionFor = (card: { typeLine: string }): string => {
    if (touched || section === "__new__") return section === "__new__" ? newSection.trim() : section;
    return /\bLand\b/.test(card.typeLine.split(" // ")[0]) && landSection ? landSection : section;
  };

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // The inline dropdown closes on a click anywhere outside the search, like a menu.
  useEffect(() => {
    if (!inline || !open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [inline, open]);

  const results = useSearchCards(debounced);
  const target = section === "__new__" ? newSection.trim() : section;
  const hasResults = Boolean(results.data && results.data.cards.length > 0);

  const resultsPanel = (
    <>
      {results.isFetching && <p className="text-[12px] text-muted-foreground">Searching…</p>}
      {results.data?.error && <p className="text-[12px] text-bad">{results.data.error}</p>}
      {results.data && results.data.cards.length === 0 && !results.isFetching && debounced.length >= 2 && (
        <p className="text-[12px] text-muted-foreground">
          {"No cards match. Scryfall syntax works here: t:creature id<=bg o:sacrifice."}
        </p>
      )}
      {hasResults && (
        <ul className="max-h-72 divide-y overflow-y-auto rounded-md border">
          {results.data?.cards.slice(0, 60).map((card) => {
            const name = deckName(card);
            return (
              <li key={card.id}>
                <button
                  type="button"
                  disabled={mode === "add" && !target}
                  onClick={() =>
                    mode === "add"
                      ? props.onStage({ op: "add", name, section: sectionFor(card) })
                      : props.onPick?.(name)
                  }
                  className="flex w-full items-center gap-3 px-2 py-1.5 text-left hover:bg-accent disabled:opacity-50"
                >
                  {cardImage(card, "small") ? (
                    <img
                      src={cardImage(card, "small") ?? ""}
                      alt=""
                      className="h-12 w-[34px] shrink-0 rounded-[2px] object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-12 w-[34px] shrink-0 rounded-[2px] bg-muted" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[13px] font-medium">{name}</span>
                      <ManaCost cost={manaToShow(card.manaCost, card.producedMana)} size="size-3" />
                    </div>
                    <div className="truncate text-[12px] text-muted-foreground">
                      {card.typeLine}
                      {card.gameChanger ? " · Game Changer" : ""}
                      {card.commanderLegal !== "legal" ? ` · ${card.commanderLegal.replace("_", " ")}` : ""}
                    </div>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-[12px] text-muted-foreground">
                    <Plus className="size-3.5" /> {mode === "add" ? sectionFor(card) || "…" : "Use this"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );

  return (
    <div ref={root} className={inline ? "relative" : "space-y-2"}>
      <div className="flex items-center gap-2">
        <div className={inline ? "relative w-80" : "relative flex-1"}>
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoFocus={!inline}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
                e.currentTarget.blur();
              }
            }}
            placeholder={
              mode !== "add"
                ? "Search for the right card"
                : inline
                  ? "Add a card — name, t:creature, o:drain, id<=bg…"
                  : "Search Scryfall — name, t:creature, o:drain, id<=bg…"
            }
            className="h-8 pl-8 text-[13px]"
          />
        </div>
        {mode === "add" && (
          <>
            <Select
              value={section}
              onValueChange={(v) => {
                setSection(v);
                setTouched(true);
              }}
            >
              <SelectTrigger size="sm" className="w-44">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                {props.sections.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
                <SelectItem value="__new__">New section…</SelectItem>
              </SelectContent>
            </Select>
            {section === "__new__" && (
              <Input
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                placeholder="Section name"
                className="h-8 w-40 text-[13px]"
              />
            )}
          </>
        )}
      </div>

      {inline
        ? open &&
          debounced.length >= 2 && (
            <div className="absolute top-full left-0 z-50 mt-1 w-[560px] space-y-2 rounded-md border bg-popover p-2 shadow-lg">
              {resultsPanel}
            </div>
          )
        : resultsPanel}
    </div>
  );
}
