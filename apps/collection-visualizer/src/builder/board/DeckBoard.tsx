import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import type { CardMeta, DeckList } from "@mtg/deck-model.ts";
import type { ChangeEntry } from "@mtg/change-set.ts";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { cardImage, type CardView } from "../model/cards";
import type { Staged } from "../state/staged";
import { CardPopover } from "./CardPopover";
import { CurveView } from "./CurveView";
import { DeckCard } from "./DeckCard";
import { GROUP_OPTIONS, groupCards, type GroupBy } from "./grouping";
import { layoutSections, pinCommanders, type LaidOutCard, type LaidOutSection } from "./layout";
import { SearchAdd } from "./SearchAdd";
import { TableView } from "./TableView";
import { CARD_RADIUS, STACK_PEEK, STACK_WIDTH, cardHeightFor } from "./tokens";
import { ViewSwitcher, type BoardView } from "./ViewSwitcher";

interface DeckBoardProps {
  slug: string;
  list: DeckList;
  cards: Record<string, CardView>;
  meta: Record<string, CardMeta>;
  staged: Staged | null;
  previewMode: "current" | "after";
  view: BoardView;
  groupBy: GroupBy;
  /** Groups folded shut in the rows view. */
  collapsed: string[];
  selected: string | null;
  highlightTag: string | null;
  onView: (view: BoardView) => void;
  onGroupBy: (groupBy: GroupBy) => void;
  onToggleGroup: (name: string) => void;
  onSelect: (name: string | null) => void;
  onStage: (entry: ChangeEntry) => void;
  /** Slot for the list tabs, rendered in the board's top bar. */
  tabs?: React.ReactNode;
}

/** The centre pane: the list as real cards, grouped into columns or rows, with the search that adds
 *  cards always open in the top bar. Every edit here goes to the staged set — nothing is written
 *  until Apply. */
export function DeckBoard(props: DeckBoardProps) {
  const { slug, list, cards, meta, staged, previewMode, view, groupBy, selected, highlightTag } = props;
  const sections = layoutSections(list, staged, previewMode);
  const sectionNames = list.sections.map((s) => s.name);
  // The commander stays pinned whatever the grouping; the rest regroups.
  const { pinned, scrolling } = pinCommanders(sections);
  const columns = groupCards(scrolling, groupBy, cards);
  // The section a card sits in for the popover's move menu: the list's own, not the column's name,
  // since a column is a type or colour bucket under the other groupings.
  const sectionOf = (name: string) => sections.find((s) => s.cards.some((c) => c.name === name))?.name ?? "";

  const shared: BoardCardsProps = {
    slug,
    sectionNames,
    sectionOf,
    droppable: groupBy === "role",
    cards,
    meta,
    selected,
    highlightTag,
    onSelect: props.onSelect,
    onStage: props.onStage,
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-wrap items-center gap-3 border-b px-3 py-1.5">
        {props.tabs}
        <SearchAdd layout="inline" slug={slug} sections={sectionNames} onStage={props.onStage} />
        <div className="ml-auto flex items-center gap-2">
          <Select value={groupBy} onValueChange={(v) => props.onGroupBy(v as GroupBy)}>
            <SelectTrigger size="sm" aria-label="Group cards by" className="w-[150px]">
              <span className="text-muted-foreground">Group</span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GROUP_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ViewSwitcher value={view} onChange={props.onView} />
        </div>
      </div>

      <div className="min-h-0 flex-1">
        {view === "table" && (
          <TableView
            sections={[...pinned, ...columns]}
            cards={cards}
            meta={meta}
            selected={selected}
            onSelect={(n) => props.onSelect(n)}
          />
        )}
        {view === "curve" && (
          <CurveView list={list} cards={cards} selected={selected} onSelect={(n) => props.onSelect(n)} />
        )}
        {view === "board" && <StackBoard {...shared} pinned={pinned} columns={columns} />}
        {view === "rows" && (
          <RowBoard
            {...shared}
            groups={[...pinned, ...columns]}
            defaultCard={pinned[0]?.cards[0]?.name ?? null}
            collapsed={props.collapsed}
            onToggleGroup={props.onToggleGroup}
          />
        )}
      </div>
    </div>
  );
}

/** What every card-rendering view needs. */
interface BoardCardsProps {
  slug: string;
  /** The list's own sections, for the move menu — whatever the board is grouped by. */
  sectionNames: string[];
  /** The list section a card sits in, for the move menu. */
  sectionOf: (name: string) => string;
  /** Dropping a card on a group moves it to that section, which only means something when the
   *  groups are the sections. */
  droppable: boolean;
  cards: Record<string, CardView>;
  meta: Record<string, CardMeta>;
  selected: string | null;
  highlightTag: string | null;
  onSelect: (name: string | null) => void;
  onStage: (entry: ChangeEntry) => void;
}

/** Drop handlers that move a dragged card into `section`, or nothing when groups are not sections. */
function useDropTargets(droppable: boolean, onStage: (entry: ChangeEntry) => void) {
  const [dragOver, setDragOver] = useState<string | null>(null);
  const handlersFor = (section: string) =>
    droppable
      ? {
          onDragOver: (e: React.DragEvent) => {
            e.preventDefault();
            setDragOver(section);
          },
          onDragLeave: () => setDragOver((d) => (d === section ? null : d)),
          onDrop: (e: React.DragEvent) => {
            e.preventDefault();
            setDragOver(null);
            const name = e.dataTransfer.getData("text/card");
            if (name) onStage({ op: "move", name, section });
          },
        }
      : {};
  return { dragOver, handlersFor };
}

const liveCount = (section: LaidOutSection) =>
  section.cards.filter((c) => c.state !== "removed").reduce((n, c) => n + c.qty, 0);

/** The details editor for one card, shared by the popover and the inspector pane. */
function CardEditor(props: BoardCardsProps & { card: LaidOutCard; layout: "popover" | "panel"; onDone: () => void }) {
  const { card: c, cards, meta } = props;
  return (
    <CardPopover
      layout={props.layout}
      slug={props.slug}
      name={c.name}
      qty={c.qty}
      card={cards[c.name]}
      meta={meta[c.name]}
      section={props.sectionOf(c.name)}
      sections={props.sectionNames}
      onStage={(entry) => {
        props.onStage(entry);
        props.onDone();
      }}
      onClose={props.onDone}
    />
  );
}

/** The popover / preview state the board view shares: which card is open, which is being previewed. */
function useCardState() {
  const [open, setOpen] = useState<string | null>(null);
  // The card whose hover preview is showing; it stays lifted until the preview closes.
  const [previewed, setPreviewed] = useState<string | null>(null);
  return { open, setOpen, previewed, setPreviewed };
}

interface PopoverCardProps extends BoardCardsProps {
  card: LaidOutCard;
  /** Unique across the board: group, name and staged state. */
  cardKey: string;
  state: ReturnType<typeof useCardState>;
  style?: React.CSSProperties;
}

/** One card on the board: the card itself, its hover preview to the right, and its details popover
 *  on click. The card stays lifted while either is open. */
function PopoverCard(props: PopoverCardProps) {
  const { card: c, cardKey: key, cards, meta, state } = props;
  const muted = props.highlightTag !== null && !(meta[c.name]?.tags ?? []).includes(props.highlightTag);
  const isOpen = state.open === key;

  return (
    <Popover open={isOpen} onOpenChange={(o) => state.setOpen(o ? key : null)}>
      <HoverCard
        openDelay={200}
        closeDelay={150}
        onOpenChange={(o) => state.setPreviewed((p) => (o ? key : p === key ? null : p))}
      >
        <HoverCardTrigger asChild>
          <PopoverTrigger asChild>
            <DeckCard
              name={c.name}
              qty={c.qty}
              state={c.state}
              card={cards[c.name]}
              width={STACK_WIDTH}
              selected={props.selected === c.name}
              muted={muted}
              lifted={state.previewed === key || isOpen}
              draggable={props.droppable && c.state !== "removed"}
              onDragStart={(e) => e.dataTransfer.setData("text/card", c.name)}
              onClick={() => {
                props.onSelect(c.name);
                state.setOpen(key);
              }}
              style={props.style}
              className={isOpen ? "z-40" : ""}
            />
          </PopoverTrigger>
        </HoverCardTrigger>
        {!isOpen && (
          <HoverCardContent
            side="right"
            align="start"
            sideOffset={10}
            collisionPadding={12}
            className="w-auto border-0 bg-transparent p-0 shadow-none"
          >
            <CardPreview name={c.name} card={cards[c.name]} />
          </HoverCardContent>
        )}
      </HoverCard>
      <PopoverContent
        side="right"
        align="start"
        collisionPadding={12}
        className="max-h-[var(--radix-popover-content-available-height)] w-auto max-w-[var(--radix-popover-content-available-width)] overflow-y-auto p-3"
      >
        <CardEditor {...props} card={c} layout="popover" onDone={() => state.setOpen(null)} />
      </PopoverContent>
    </Popover>
  );
}

interface StackBoardProps extends BoardCardsProps {
  /** The commander column(s), kept outside the scrolling area. */
  pinned: LaidOutSection[];
  columns: LaidOutSection[];
}

/** Columns of stacked cards. The commander column sits outside the scrolling area, so it stays in
 *  view however far the board is scrolled. */
function StackBoard(props: StackBoardProps) {
  const { pinned, columns } = props;
  const height = cardHeightFor(STACK_WIDTH);
  const state = useCardState();
  const { dragOver, handlersFor } = useDropTargets(props.droppable, props.onStage);

  const column = (section: LaidOutSection) => (
    <div
      key={section.name}
      style={{ width: STACK_WIDTH }}
      {...handlersFor(section.name)}
      className={`shrink-0 rounded-md transition ${dragOver === section.name ? "bg-accent/60 ring-1 ring-ring" : ""}`}
    >
      <div className="mb-1.5 flex items-baseline justify-between px-0.5">
        <span className="truncate text-[13px] font-medium">{section.name}</span>
        <span className="text-[12px] text-muted-foreground tabular-nums">{liveCount(section)}</span>
      </div>
      <div className="relative pb-2">
        {section.cards.map((c, i) => (
          <PopoverCard
            key={`${section.name}|${c.name}|${c.state}`}
            {...props}
            card={c}
            cardKey={`${section.name}|${c.name}|${c.state}`}
            state={state}
            style={{ marginTop: i === 0 ? 0 : -(height - STACK_PEEK) }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-full min-h-0">
      {pinned.length > 0 && (
        <div data-pinned="commander" className="flex shrink-0 gap-3 overflow-hidden border-r p-3">
          {pinned.map(column)}
        </div>
      )}
      <div className="flex min-w-0 flex-1 gap-3 overflow-auto p-3">{columns.map(column)}</div>
    </div>
  );
}

interface RowBoardProps extends BoardCardsProps {
  groups: LaidOutSection[];
  /** What the inspector shows when nothing is hovered or being edited: the commander. */
  defaultCard: string | null;
  collapsed: string[];
  onToggleGroup: (name: string) => void;
}

/** Groups stacked top to bottom, each a row of full cards that wraps, beside a fixed inspector pane
 *  on the left. Nothing floats: hovering a card previews it in the pane, clicking one turns the
 *  pane into its editor until it is closed. The rows scroll vertically; nothing scrolls sideways. */
function RowBoard(props: RowBoardProps) {
  const { cards, meta } = props;
  const [hovered, setHovered] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const { dragOver, handlersFor } = useDropTargets(props.droppable, props.onStage);
  const allCards = props.groups.flatMap((g) => g.cards);
  const editingCard = editing ? (allCards.find((c) => c.name === editing) ?? null) : null;
  const shownName = editingCard?.name ?? hovered ?? props.defaultCard;

  // Escape leaves the editor, the way it closes the popover on the board.
  useEffect(() => {
    if (!editing) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEditing(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [editing]);

  // A card that left the list (applied, discarded) takes its editor with it.
  useEffect(() => {
    if (editing && !editingCard) setEditing(null);
  }, [editing, editingCard]);

  return (
    <div className="flex h-full min-h-0">
      <aside data-inspector className="flex w-[360px] shrink-0 flex-col border-r">
        <div className="flex h-9 shrink-0 items-center gap-2 border-b px-3 text-[12px]">
          <span className="font-medium text-muted-foreground">{editingCard ? "Editing" : "Preview"}</span>
          {editingCard && (
            <button
              type="button"
              aria-label="Close editor"
              onClick={() => setEditing(null)}
              className="ml-auto rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-3">
          {editingCard ? (
            <CardEditor {...props} card={editingCard} layout="panel" onDone={() => setEditing(null)} />
          ) : shownName ? (
            <InspectorPreview name={shownName} card={cards[shownName]} />
          ) : (
            <p className="text-[13px] text-muted-foreground">Hover a card to preview it, click one to edit it.</p>
          )}
        </div>
      </aside>

      <div data-rows className="min-h-0 min-w-0 flex-1 space-y-3 overflow-y-auto p-3">
        {props.groups.map((section) => {
          const shut = props.collapsed.includes(section.name);
          return (
            <section
              key={section.name}
              data-group={section.name}
              {...handlersFor(section.name)}
              className={`rounded-md transition ${dragOver === section.name ? "bg-accent/60 ring-1 ring-ring" : ""}`}
            >
              <button
                type="button"
                aria-expanded={!shut}
                onClick={() => props.onToggleGroup(section.name)}
                className="flex w-full items-center gap-2 rounded-md px-1 py-1 text-left hover:bg-accent"
              >
                {shut ? (
                  <ChevronRight className="size-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-4 text-muted-foreground" />
                )}
                <span className="text-[13px] font-medium">{section.name}</span>
                <span className="text-[12px] text-muted-foreground tabular-nums">{liveCount(section)}</span>
                {shut && (
                  <span className="ml-2 truncate text-[12px] text-muted-foreground">
                    {section.cards
                      .filter((c) => c.state !== "removed")
                      .map((c) => c.name)
                      .join(", ")}
                  </span>
                )}
              </button>
              {!shut && (
                <div className="grid grid-cols-5 gap-3 px-1 pt-2 pb-3">
                  {section.cards.map((c) => {
                    const muted =
                      props.highlightTag !== null && !(meta[c.name]?.tags ?? []).includes(props.highlightTag);
                    return (
                      <DeckCard
                        key={`${section.name}|${c.name}|${c.state}`}
                        name={c.name}
                        qty={c.qty}
                        state={c.state}
                        card={cards[c.name]}
                        width="100%"
                        selected={props.selected === c.name}
                        muted={muted}
                        lifted={editing === c.name}
                        draggable={props.droppable && c.state !== "removed"}
                        onDragStart={(e) => e.dataTransfer.setData("text/card", c.name)}
                        onPointerEnter={() => setHovered(c.name)}
                        onPointerLeave={() => setHovered((h) => (h === c.name ? null : h))}
                        onClick={() => {
                          props.onSelect(c.name);
                          setEditing(c.name);
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

/** The inspector's resting face: the card at reading size, with its name and type under it. */
function InspectorPreview(props: { name: string; card: CardView | undefined }) {
  const src = cardImage(props.card, "normal");
  return (
    <div className="space-y-2">
      {src ? (
        <img src={src} alt={props.name} className={`w-full ${CARD_RADIUS} shadow-xl`} />
      ) : (
        <div className={`aspect-[63/88] w-full bg-muted ${CARD_RADIUS}`} />
      )}
      <div>
        <p className="text-[14px] font-semibold leading-tight">{props.name}</p>
        {props.card && <p className="text-[12px] text-muted-foreground">{props.card.typeLine}</p>}
      </div>
    </div>
  );
}

/** The hover preview on the board: the card at reading size, to the right of the stack. */
function CardPreview(props: { name: string; card: CardView | undefined }) {
  const src = cardImage(props.card, "normal");
  if (!src) return null;

  return <img src={src} alt={props.name} className={`w-[300px] ${CARD_RADIUS} shadow-2xl`} />;
}
