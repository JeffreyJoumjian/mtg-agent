/** Combo lists and the decklist drawer, shared by the game report and the player pages. */
import { useState, type ReactNode } from "react";
import type { Combo } from "@mtg/spellbook.ts";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";
import type { OpponentDeckView } from "./server";
import { CardImage, Chip, CommanderAvatar, ROLE_TEXT, producesText } from "./ui";

export function ComboList(props: { combos: Combo[]; almost?: boolean }) {
  return (
    <ul className="flex flex-col gap-1.5">
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
          <span className="text-muted-foreground"> → {producesText(c.produces)}</span>
          {props.almost && c.missing.length > 0 && <span className="text-warn"> (missing {c.missing.join(", ")})</span>}
        </li>
      ))}
    </ul>
  );
}

/** Type groups in the order a decklist reads. A card joins the first group its type line names,
 *  so an artifact creature sits with the creatures. */
const TYPE_GROUPS = [
  { name: "Creatures", match: /\bCreature\b/ },
  { name: "Planeswalkers", match: /\bPlaneswalker\b/ },
  { name: "Battles", match: /\bBattle\b/ },
  { name: "Instants", match: /\bInstant\b/ },
  { name: "Sorceries", match: /\bSorcery\b/ },
  { name: "Artifacts", match: /\bArtifact\b/ },
  { name: "Enchantments", match: /\bEnchantment\b/ },
  { name: "Lands", match: /\bLand\b/ },
];

type Filter = { kind: "all" } | { kind: "played" } | { kind: "role"; role: string };

/** An opponent's full list sliding in from the right as a card grid grouped by type. Cards with a
 *  `playedRound` (played in the game the drawer was opened from) are outlined green and tagged
 *  with the round; with none, the "Played this game" filter is hidden. */
export function DecklistDrawer(props: {
  deck: OpponentDeckView;
  player: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const d = props.deck;
  const [filter, setFilter] = useState<Filter>({ kind: "all" });
  const total = d.cards.reduce((a, c) => a + c.quantity, 0) + d.commanders.length;
  const playedCount = d.cards.filter((c) => c.playedRound !== undefined).length;
  const roles = Object.entries(d.roleCounts)
    .filter(([r]) => r !== "land")
    .sort((a, b) => b[1] - a[1]);

  const shown = d.cards.filter((c) => {
    if (filter.kind === "played") return c.playedRound !== undefined;
    if (filter.kind === "role") return c.roles.includes(filter.role);
    return true;
  });
  const groups: { name: string; cards: typeof shown }[] = [];
  for (const card of shown) {
    const name = TYPE_GROUPS.find((g) => g.match.test(card.typeLine))?.name ?? "Other";
    const group = groups.find((g) => g.name === name);
    if (group) group.cards.push(card);
    else groups.push({ name, cards: [card] });
  }
  const order = [...TYPE_GROUPS.map((g) => g.name), "Other"];
  groups.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  for (const g of groups) {
    g.cards.sort((a, b) => (a.playedRound ?? 99) - (b.playedRound ?? 99) || a.name.localeCompare(b.name));
  }

  const meta = [
    props.player,
    `${total} cards`,
    d.bracket !== undefined && `bracket ${d.bracket}`,
    d.isPrecon && "precon",
    `saved ${new Date(d.fetchedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Europe/Bucharest" })}`,
  ].filter(Boolean);

  return (
    <Sheet open={props.open} onOpenChange={props.onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-[680px] max-w-full gap-0 bg-card p-0 sm:max-w-[680px]"
      >
        <div className="flex items-center gap-3 border-b px-5 py-[18px]">
          <CommanderAvatar name={d.commanders[0]} size={44} />
          <div className="flex min-w-0 flex-col">
            <SheetTitle className="truncate font-display text-[24px] leading-none font-bold uppercase">
              {d.name || "Unnamed deck"}
            </SheetTitle>
            <SheetDescription className="text-[12px] text-muted-foreground">{meta.join(" · ")}</SheetDescription>
          </div>
          <a
            href={`https://edhplay.com/decks/${d.deckId}`}
            target="_blank"
            rel="noreferrer"
            className="ml-auto shrink-0 rounded-[10px] bg-muted px-3 py-2 text-[13px] hover:bg-accent"
          >
            On EDHPlay ↗
          </a>
          <button
            type="button"
            aria-label="Close decklist"
            onClick={() => props.onOpenChange(false)}
            className="size-9 shrink-0 cursor-pointer rounded-[10px] bg-muted text-[18px] hover:bg-accent"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-3 border-b px-5 py-3.5">
          <div role="group" aria-label="Show" className="flex flex-wrap gap-1.5">
            <Chip on={filter.kind === "all"} onClick={() => setFilter({ kind: "all" })}>
              All {total}
            </Chip>
            {playedCount > 0 && (
              <Chip tone="good" on={filter.kind === "played"} onClick={() => setFilter({ kind: "played" })}>
                Played this game · {playedCount}
              </Chip>
            )}
            {roles.map(([role, n]) => {
              const on = filter.kind === "role" && filter.role === role;
              return (
                <Chip
                  key={role}
                  tone="role"
                  on={on}
                  onClick={() => setFilter(on ? { kind: "all" } : { kind: "role", role })}
                >
                  {ROLE_TEXT[role] ?? role} {n}
                </Chip>
              );
            })}
          </div>
          {d.combos.included.length > 0 && (
            <div className="rounded-[10px] bg-bad/10 px-3 py-2 text-[12px]">
              <b className="text-bad">
                {d.combos.included.length} {d.combos.included.length === 1 ? "combo" : "combos"} in this list:
              </b>{" "}
              {d.combos.included.map((c, i) => (
                <span key={c.id}>
                  {i > 0 && " · "}
                  <a
                    href={`https://commanderspellbook.com/combo/${c.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {c.cards.join(" + ")}
                  </a>
                </span>
              ))}
            </div>
          )}
          {d.combos.error && (
            <span className="text-[12px] text-muted-foreground">
              Commander Spellbook didn't answer, so combos in this list aren't shown. They'll appear on the next visit.
            </span>
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-[18px] overflow-y-auto px-5 py-4">
          {filter.kind === "all" && d.commanders.length > 0 && (
            <CardGroup name="Commander" count={d.commanders.length}>
              {d.commanders.map((name) => (
                <CardImage key={name} name={name} />
              ))}
            </CardGroup>
          )}
          {groups.map((g) => (
            <CardGroup key={g.name} name={g.name} count={g.cards.reduce((a, c) => a + c.quantity, 0)}>
              {g.cards.map((c) => (
                <div key={c.name} className="relative">
                  <CardImage name={c.name} round={c.playedRound} className={cn(c.playedRound === undefined && "opacity-90")} />
                  {c.quantity > 1 && (
                    <span className="absolute right-1.5 bottom-1.5 rounded bg-background/85 px-1.5 text-[11px] font-bold">
                      ×{c.quantity}
                    </span>
                  )}
                </div>
              ))}
            </CardGroup>
          ))}
          {groups.length === 0 && (
            <span className="text-[13px] text-muted-foreground">No card in this list matches that filter.</span>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function CardGroup(props: { name: string; count: number; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="font-display text-[16px] font-semibold text-muted-foreground uppercase">
        {props.name} <span className="text-muted-foreground/60">{props.count}</span>
      </span>
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">{props.children}</div>
    </div>
  );
}
