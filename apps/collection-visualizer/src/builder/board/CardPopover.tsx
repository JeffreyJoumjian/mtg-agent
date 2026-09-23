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
import { cardImage, type CardView } from "../model/cards";
import { useRenameCard, useSetCardMeta } from "../state/queries";
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
}

/** Everything about one card in the deck: the image, the text, its tags and status, and the
 *  edits that stage a change (move, remove) or apply at once (tags, status, note, fix name). */
export function CardPopover(props: CardPopoverProps) {
  const { slug, name, card, meta, section, sections } = props;
  const setMeta = useSetCardMeta(slug);
  const rename = useRenameCard(slug);
  const [face, setFace] = useState(0);
  const [note, setNote] = useState(meta?.note ?? "");
  const [customTag, setCustomTag] = useState("");
  const [finding, setFinding] = useState(!card);

  const tags = meta?.tags ?? [];
  const status: CardStatus = meta?.status ?? "PROXY";
  const twoFaces = (card?.faces.length ?? 0) > 1;
  const shownFace = card?.faces[face] ?? card?.faces[0];
  const src = cardImage(card, "normal", face);

  const toggleTag = (tag: string) => {
    const next = tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag];
    setMeta.mutate([{ name, meta: { tags: next } }]);
  };

  const saveNote = () => {
    if ((meta?.note ?? "") !== note) setMeta.mutate([{ name, meta: { note } }]);
  };

  if (finding) {
    return (
      <div className="w-[420px] space-y-2">
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
    <div className="flex w-[520px] gap-3">
      <div className="w-[200px] shrink-0">
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

      <div className="min-w-0 flex-1 space-y-2 text-sm">
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
          <p className="max-h-32 overflow-y-auto text-[13px] leading-snug whitespace-pre-wrap">
            {shownFace.oracleText}
          </p>
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

        <div className="grid grid-cols-2 gap-2">
          <Select value={status} onValueChange={(v) => setMeta.mutate([{ name, meta: { status: v } }])}>
            <SelectTrigger size="sm">
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
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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

        <Input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onBlur={saveNote}
          placeholder="Note for this deck"
          className="h-8 text-[13px]"
        />

        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex gap-1">
            <Button variant="outline" size="sm" onClick={() => props.onStage({ op: "remove", name })}>
              <Trash2 /> Remove
            </Button>
            {props.qty > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => props.onStage({ op: "qty", name, qty: props.qty - 1 })}
              >
                −1
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => props.onStage({ op: "add", name, section, qty: 1 })}>
              +1
            </Button>
          </div>
          <div className="flex gap-1">
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
