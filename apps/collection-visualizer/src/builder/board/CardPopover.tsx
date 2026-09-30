import { useState } from "react";
import { ExternalLink, RefreshCw, Search, Trash2 } from "lucide-react";
import type { CardMeta, CardStatus } from "@mtg/deck-model.ts";
import { CARD_STATUSES, SUGGESTED_TAGS, isCommanderSection } from "@mtg/deck-model.ts";
import type { ChangeEntry } from "@mtg/change-set.ts";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { ManaCost } from "~/components/symbols/Mana";
import { manaToShow } from "~/lib/card/mana";
import { cardImage, type CardView, printingKey } from "../model/cards";
import { usePrintings, useRenameCard, useSetCardMeta } from "../state/queries";
import { OracleText } from "./OracleText";
import { CARD_RADIUS } from "./tokens";
import { SearchAdd } from "./SearchAdd";

interface CardPopoverProps {
  slug: string;
  name: string;
  qty: number;
  card: CardView | undefined;
  meta: CardMeta | undefined;
  section: string;
  sections: string[];
  /** Pools have no commander; the move menu stays inside the list's own sections either way. */
  onStage: (entry: ChangeEntry) => void;
  onClose: () => void;
  /** `panel` lays the card out in one column to fill a side pane; the default is the popover's two columns. */
  layout?: "popover" | "panel";
}

/** Everything about one card in the deck: the image, the text, its tags, status and printing, and
 *  the edits that stage a change (move, remove) or apply at once (tags, status, note, printing,
 *  fix name). */
export function CardPopover(props: CardPopoverProps) {
  const { slug, name, card, meta, section, sections } = props;
  const panel = props.layout === "panel";
  const setMeta = useSetCardMeta(slug);
  const rename = useRenameCard(slug);
  const printings = usePrintings(name, Boolean(card));
  const [face, setFace] = useState(0);
  const [note, setNote] = useState(meta?.note ?? "");
  const [customTag, setCustomTag] = useState("");
  const [finding, setFinding] = useState(!card);

  const tags = meta?.tags ?? [];
  const status: CardStatus = meta?.status ?? "PROXY";
  const pinned = meta?.printing ?? null;
  const pinnedKey = pinned ? printingKey(pinned) : "default";
  // The image follows the pinned printing once its data is here; the default printing until then.
  const pinnedView = pinned ? printings.data?.find((p) => printingKey(p) === pinnedKey) : undefined;
  const shownCard = pinnedView ?? card;
  const twoFaces = (shownCard?.faces.length ?? 0) > 1;
  const shownFace = shownCard?.faces[face] ?? shownCard?.faces[0];
  const src = cardImage(shownCard, "normal", face);

  const toggleTag = (tag: string) => {
    const next = tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag];
    setMeta.mutate([{ name, meta: { tags: next } }]);
  };

  const saveNote = () => {
    if ((meta?.note ?? "") !== note) setMeta.mutate([{ name, meta: { note } }]);
  };

  const pickPrinting = (key: string) => {
    if (key === "default") {
      setMeta.mutate([{ name, meta: { printing: null } }]);
      return;
    }

    const [set, collectorNumber] = key.split("|");
    setMeta.mutate([{ name, meta: { printing: { set, collectorNumber } } }]);
  };

  if (finding) {
    return (
      <div
        className={
          panel
            ? "w-full space-y-2"
            : "w-[420px] max-w-[var(--radix-popover-content-available-width,calc(100vw-56px))] space-y-2"
        }
      >
        <p className="text-sm">
          <span className="font-medium">{name}</span> is not a card Scryfall knows. Pick the right one and the entry is
          renamed everywhere in the deck.
        </p>
        <SearchAdd
          slug={slug}
          sections={sections}
          mode="rename"
          initialQuery={name}
          onPick={(picked) => {
            rename.mutate({ from: name, to: picked }, { onSuccess: props.onClose });
          }}
          onStage={() => {}}
        />
        {card && (
          <Button variant="ghost" size="sm" onClick={() => setFinding(false)}>
            Back
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      className={
        panel
          ? "flex w-full flex-col gap-3"
          : "flex w-[560px] max-w-[var(--radix-popover-content-available-width,calc(100vw-56px))] flex-wrap gap-3"
      }
    >
      <div className={panel ? "w-full" : "w-[200px] shrink-0"}>
        {src ? (
          <img src={src} alt={shownFace?.name ?? name} className={`w-full ${CARD_RADIUS}`} />
        ) : (
          <div className={`aspect-[63/88] w-full bg-muted ${CARD_RADIUS}`} />
        )}
        {twoFaces && (
          <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => setFace((f) => (f + 1) % 2)}>
            <RefreshCw /> Flip
          </Button>
        )}
      </div>

      <div className="min-w-[260px] flex-1 space-y-2 text-sm">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base leading-tight font-semibold">{shownFace?.name ?? name}</h3>
            <ManaCost
              cost={manaToShow(shownFace?.manaCost ?? card?.manaCost ?? "", card?.producedMana)}
              size="size-4"
            />
          </div>
          <p className="text-muted-foreground">{shownFace?.typeLine ?? card?.typeLine}</p>
          {card && (card.power !== undefined || card.gameChanger) && (
            <p className="text-muted-foreground">
              {card.power !== undefined ? `${card.power}/${card.toughness}` : ""}
              {card.gameChanger ? " · Game Changer" : ""}
            </p>
          )}
        </div>
        {shownFace?.oracleText && (
          <OracleText text={shownFace.oracleText} className="max-h-32 overflow-y-auto text-[13px] leading-snug" />
        )}

        <div className="flex flex-wrap gap-1">
          {[...new Set([...SUGGESTED_TAGS, ...tags])].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`rounded-full px-2 py-0.5 text-[11px] transition ${
                tags.includes(tag)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
          <form
            className="contents"
            onSubmit={(e) => {
              e.preventDefault();
              const tag = customTag.trim().toLowerCase();
              if (tag && !tags.includes(tag)) setMeta.mutate([{ name, meta: { tags: [...tags, tag] } }]);
              setCustomTag("");
            }}
          >
            <input
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="+ tag"
              className="w-16 rounded-full bg-transparent px-2 py-0.5 text-[11px] outline-none placeholder:text-muted-foreground focus:bg-muted"
            />
          </form>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2">
          <Select value={status} onValueChange={(v) => setMeta.mutate([{ name, meta: { status: v } }])}>
            <SelectTrigger size="sm" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CARD_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s.charAt(0) + s.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={section}
            onValueChange={(v) => {
              if (v !== section) props.onStage({ op: "move", name, section: v });
            }}
          >
            <SelectTrigger size="sm" className="w-full">
              <SelectValue placeholder="Section" />
            </SelectTrigger>
            <SelectContent align="end">
              {sections
                .filter((s) => !isCommanderSection(s) || isCommanderSection(section))
                .map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {card && (
          <Select value={pinnedKey} onValueChange={pickPrinting}>
            <SelectTrigger size="sm" className="w-full" aria-label="Printing">
              <SelectValue placeholder="Printing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default printing</SelectItem>
              {pinned && !pinnedView && (
                <SelectItem value={pinnedKey}>
                  {pinned.set.toUpperCase()} #{pinned.collectorNumber}
                </SelectItem>
              )}
              {printings.data?.map((p) => (
                <SelectItem key={p.id} value={printingKey(p)}>
                  {p.set.toUpperCase()} #{p.collectorNumber}
                  {p.setName ? ` · ${p.setName}` : ""}
                </SelectItem>
              ))}
              {printings.isFetching && !printings.data && (
                <div className="px-2 py-1.5 text-[12px] text-muted-foreground">Loading printings…</div>
              )}
            </SelectContent>
          </Select>
        )}

        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onBlur={saveNote}
          placeholder="Note for this deck"
          className="h-8 text-[13px]"
        />

        <div className="flex flex-wrap items-center gap-1 pt-1">
          <Button variant="outline" size="sm" onClick={() => props.onStage({ op: "remove", name })}>
            <Trash2 /> Remove
          </Button>
          {props.qty > 1 && (
            <Button variant="outline" size="sm" onClick={() => props.onStage({ op: "qty", name, qty: props.qty - 1 })}>
              −1
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => props.onStage({ op: "add", name, section, qty: 1 })}>
            +1
          </Button>
          <div className="ml-auto flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => setFinding(true)}>
              <Search /> Fix name
            </Button>
            {card?.scryfallUri && (
              <Button variant="ghost" size="sm" asChild>
                <a href={card.scryfallUri} target="_blank" rel="noreferrer">
                  <ExternalLink /> Scryfall
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
