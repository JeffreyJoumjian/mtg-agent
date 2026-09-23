import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { CardMeta, DeckList } from "@mtg/deck-model.ts";
import type { ChangeEntry } from "@mtg/change-set.ts";
import { Button } from "~/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import type { CardView } from "../model/cards";
import type { Staged } from "../state/staged";
import { CardPopover } from "./CardPopover";
import { CurveView } from "./CurveView";
import { DeckCard } from "./DeckCard";
import { layoutSections, type LaidOutSection } from "./layout";
import { SearchAdd } from "./SearchAdd";
import { TableView } from "./TableView";
import { STACK_PEEK, STACK_WIDTH, cardHeightFor } from "./tokens";
import { ViewSwitcher, type BoardView } from "./ViewSwitcher";

interface DeckBoardProps {
  slug: string;
  list: DeckList;
  cards: Record<string, CardView>;
  meta: Record<string, CardMeta>;
  staged: Staged | null;
  previewMode: "current" | "after";
  view: BoardView;
  selected: string | null;
  highlightTag: string | null;
  onView: (view: BoardView) => void;
  onSelect: (name: string | null) => void;
  onStage: (entry: ChangeEntry) => void;
  /** Slot for the list tabs, rendered in the board's top bar. */
  tabs?: React.ReactNode;
}

/** The centre pane: the list as stacks of real cards, one column per section. Every edit here
 *  goes to the staged set — nothing is written until Apply. */
export function DeckBoard(props: DeckBoardProps) {
  const { slug, list, cards, meta, staged, previewMode, view, selected, highlightTag } = props;
  const [adding, setAdding] = useState(false);
  const sections = layoutSections(list, staged, previewMode);
  const sectionNames = list.sections.map((s) => s.name);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2">
        {props.tabs}
        <div className="ml-auto flex items-center gap-2">
          <ViewSwitcher value={view} onChange={props.onView} />
          <Button variant={adding ? "secondary" : "outline"} size="sm" onClick={() => setAdding((a) => !a)}>
            {adding ? <X /> : <Plus />} {adding ? "Close" : "Add cards"}
          </Button>
        </div>
      </div>
      {adding && (
        <div className="border-b px-3 py-2">
          <SearchAdd slug={slug} sections={sectionNames} onStage={props.onStage} />
        </div>
      )}

      <div className="min-h-0 flex-1">
        {view === "table" && (
          <TableView
            sections={sections}
            cards={cards}
            meta={meta}
            selected={selected}
            onSelect={(n) => props.onSelect(n)}
          />
        )}
        {view === "curve" && (
          <CurveView list={list} cards={cards} selected={selected} onSelect={(n) => props.onSelect(n)} />
        )}
        {view === "board" && (
          <StackBoard
            slug={slug}
            sections={sections}
            sectionNames={sectionNames}
            cards={cards}
            meta={meta}
            selected={selected}
            highlightTag={highlightTag}
            onSelect={props.onSelect}
            onStage={props.onStage}
          />
        )}
      </div>
    </div>
  );
}

interface StackBoardProps {
  slug: string;
  sections: LaidOutSection[];
  sectionNames: string[];
  cards: Record<string, CardView>;
  meta: Record<string, CardMeta>;
  selected: string | null;
  highlightTag: string | null;
  onSelect: (name: string | null) => void;
  onStage: (entry: ChangeEntry) => void;
}

function StackBoard(props: StackBoardProps) {
  const { sections, cards, meta, selected, highlightTag } = props;
  const height = cardHeightFor(STACK_WIDTH);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="flex h-full gap-3 overflow-auto p-3">
      {sections.map((section) => {
        const count = section.cards.filter((c) => c.state !== "removed").reduce((n, c) => n + c.qty, 0);
        return (
          <div
            key={section.name}
            style={{ width: STACK_WIDTH }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(section.name);
            }}
            onDragLeave={() => setDragOver((d) => (d === section.name ? null : d))}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(null);
              const name = e.dataTransfer.getData("text/card");
              if (name) props.onStage({ op: "move", name, section: section.name });
            }}
            className={`shrink-0 rounded-md transition ${dragOver === section.name ? "bg-accent/60 ring-1 ring-ring" : ""}`}
          >
            <div className="mb-1.5 flex items-baseline justify-between px-0.5">
              <span className="truncate text-[13px] font-medium">{section.name}</span>
              <span className="text-[12px] text-muted-foreground tabular-nums">{count}</span>
            </div>
            <div className="relative pb-2">
              {section.cards.map((c, i) => {
                const key = `${section.name}|${c.name}|${c.state}`;
                const muted = highlightTag !== null && !(meta[c.name]?.tags ?? []).includes(highlightTag);
                return (
                  <Popover key={key} open={open === key} onOpenChange={(o) => setOpen(o ? key : null)}>
                    <PopoverTrigger asChild>
                      <DeckCard
                        name={c.name}
                        qty={c.qty}
                        state={c.state}
                        card={cards[c.name]}
                        width={STACK_WIDTH}
                        selected={selected === c.name}
                        muted={muted}
                        draggable={c.state !== "removed"}
                        onDragStart={(e) => e.dataTransfer.setData("text/card", c.name)}
                        onClick={() => {
                          props.onSelect(c.name);
                          setOpen(key);
                        }}
                        style={{ marginTop: i === 0 ? 0 : -(height - STACK_PEEK) }}
                        className={`hover:z-40 focus-visible:z-40 ${open === key ? "z-40" : ""}`}
                      />
                    </PopoverTrigger>
                    <PopoverContent side="right" align="start" className="w-auto p-3">
                      <CardPopover
                        slug={props.slug}
                        name={c.name}
                        qty={c.qty}
                        card={cards[c.name]}
                        meta={meta[c.name]}
                        section={section.name}
                        sections={props.sectionNames}
                        onStage={(entry) => {
                          props.onStage(entry);
                          setOpen(null);
                        }}
                        onClose={() => setOpen(null)}
                      />
                    </PopoverContent>
                  </Popover>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
