/** Small pieces shared by the EDHPlay game pages: the page header, stat tiles, result badges,
 *  card names with a hover image, and the Games / Playtests toggle. Client-safe: types only from
 *  the repo-root game library. */
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { GameRecord, GameResult, WinLoss } from "@mtg/edhplay-games.ts";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { cn } from "~/lib/utils";

export type Kind = "games" | "playtests";

export function readKind(search: Record<string, unknown>): Kind {
  return search.kind === "playtests" ? "playtests" : "games";
}

export function PageHeader(props: { title: string; subtitle?: ReactNode; actions?: ReactNode; back?: ReactNode }) {
  return (
    <div className="flex h-[61px] shrink-0 items-center gap-3 border-b px-3">
      <SidebarTrigger />
      {props.back}
      <div className="min-w-0">
        <h1 className="truncate text-[15px] font-semibold leading-tight">{props.title}</h1>
        {props.subtitle && <p className="truncate text-[12px] text-muted-foreground">{props.subtitle}</p>}
      </div>
      <div className="ml-auto flex items-center gap-2">{props.actions}</div>
    </div>
  );
}

/** Real games or solo playtests. Playtests are stored and counted apart, so this switches which
 *  data set the whole page reads. */
export function KindToggle(props: { kind: Kind; onChange: (kind: Kind) => void }) {
  return (
    <ToggleGroup
      type="single"
      size="sm"
      variant="outline"
      value={props.kind}
      onValueChange={(v) => {
        if (v === "games" || v === "playtests") props.onChange(v);
      }}
    >
      <ToggleGroupItem value="games" className="px-3 text-[13px]">
        Games
      </ToggleGroupItem>
      <ToggleGroupItem value="playtests" className="px-3 text-[13px]">
        Playtests
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function Section(props: {
  title: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}) {
  return (
    <section className={cn("rounded-lg border bg-card p-3", props.className)}>
      <div className="mb-2 flex items-baseline gap-2">
        <h2 className="text-[13px] font-semibold">{props.title}</h2>
        {props.hint && <span className="text-[12px] text-muted-foreground">{props.hint}</span>}
        <div className="ml-auto">{props.actions}</div>
      </div>
      {props.children}
    </section>
  );
}

export function StatTile(props: { label: string; value: ReactNode; hint?: ReactNode }) {
  return (
    <div className="rounded-lg border bg-card px-3 py-2">
      <div className="text-[12px] text-muted-foreground">{props.label}</div>
      <div className="text-[20px] font-semibold tabular-nums leading-tight">{props.value}</div>
      {props.hint && <div className="text-[12px] text-muted-foreground">{props.hint}</div>}
    </div>
  );
}

export const pct = (v: number | null | undefined): string =>
  v === null || v === undefined ? "–" : `${Math.round(v * 100)}%`;
export const num1 = (v: number | null | undefined): string => (v === null || v === undefined ? "–" : v.toFixed(1));

export function winLossText(r: WinLoss): string {
  const base = `${r.wins}–${r.losses}`;
  return r.unknown > 0 ? `${base} (+${r.unknown} undecided)` : base;
}

export function formatDate(t: number): string {
  return new Date(t).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Bucharest" });
}

export function formatDuration(sec: number): string {
  if (!sec) return "–";
  const m = Math.round(sec / 60);
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`;
}

const RESULT_STYLE: Record<GameResult, string> = {
  win: "bg-good text-good-foreground",
  loss: "bg-bad text-bad-foreground",
  unknown: "bg-muted text-muted-foreground",
  spectated: "bg-move text-move-foreground",
  solo: "bg-warn text-warn-foreground",
};
const RESULT_LABEL: Record<GameResult, string> = {
  win: "Win",
  loss: "Loss",
  unknown: "No result",
  spectated: "Spectated",
  solo: "Playtest",
};

export function ResultBadge(props: { result: GameResult }) {
  return (
    <span className={cn("inline-flex rounded px-1.5 py-0.5 text-[11px] font-medium", RESULT_STYLE[props.result])}>
      {RESULT_LABEL[props.result]}
    </span>
  );
}

/** Scryfall serves a card's image straight from its name, the fallback when EDHPlay sent none. */
export function scryfallImage(name: string): string {
  return `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name.split(" // ")[0])}&format=image&version=normal`;
}

export function CardName(props: { name: string; imageUri?: string; className?: string }) {
  return (
    <HoverCard openDelay={150} closeDelay={50}>
      <HoverCardTrigger asChild>
        <span
          className={cn(
            "cursor-default underline decoration-dotted decoration-muted-foreground/50 underline-offset-2",
            props.className,
          )}
        >
          {props.name}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto p-1" side="right">
        <img
          src={props.imageUri ?? scryfallImage(props.name)}
          alt={props.name}
          className="h-[310px] w-[223px] rounded-[10px]"
          loading="lazy"
        />
      </HoverCardContent>
    </HoverCard>
  );
}

export function Commanders(props: { commanders: { name: string; imageUri?: string }[] }) {
  if (props.commanders.length === 0) return <span className="text-muted-foreground">Unknown commander</span>;
  return (
    <span>
      {props.commanders.map((c, i) => (
        <span key={c.name}>
          {i > 0 && " + "}
          <CardName name={c.name} imageUri={c.imageUri} />
        </span>
      ))}
    </span>
  );
}

export function PlayerLink(props: { username: string; className?: string }) {
  return (
    <Link
      to="/players/$username"
      params={{ username: props.username }}
      className={cn("hover:underline", props.className)}
    >
      {props.username}
    </Link>
  );
}

export function EmptyState(props: { children: ReactNode }) {
  return <div className="rounded-lg border border-dashed p-6 text-[13px] text-muted-foreground">{props.children}</div>;
}

/** What to do when nothing has been recorded yet. */
export function NoGamesYet(props: { kind: Kind }) {
  return (
    <EmptyState>
      {props.kind === "games" ? (
        <>
          No games recorded yet. Load the EDHPlay Lens extension from <code>apps/edhplay-lens/dist</code>, keep this
          Workbench running, and play or spectate a game on edhplay.com. Your last five EDHPlay matches come in on the
          first visit too.
        </>
      ) : (
        <>
          No playtests recorded yet. Start a solo playtest on edhplay.com with the EDHPlay Lens extension loaded and it
          shows up here, apart from your real games.
        </>
      )}
    </EmptyState>
  );
}

/** Opponents of a game, as `Commander (player)` lines. */
export function opponentsOf(r: GameRecord) {
  return r.players.filter((p) => !p.isMe);
}

export const ROLE_TEXT: Record<string, string> = {
  land: "Land",
  ramp: "Ramp",
  draw: "Draw",
  tutor: "Tutor",
  removal: "Removal",
  wipe: "Wipe",
  counter: "Counter",
  protection: "Protection",
  recursion: "Recursion",
  tokens: "Tokens",
  drain: "Drain",
  stax: "Stax",
  "extra-turn": "Extra turn",
  wincon: "Alt win",
};

export function RoleTags(props: { roles: string[] | undefined }) {
  if (!props.roles || props.roles.length === 0) return null;
  return (
    <span className="inline-flex flex-wrap gap-1">
      {props.roles
        .filter((r) => r !== "land")
        .map((r) => (
          <span key={r} className="rounded bg-muted px-1 text-[10px] text-muted-foreground">
            {ROLE_TEXT[r] ?? r}
          </span>
        ))}
    </span>
  );
}
