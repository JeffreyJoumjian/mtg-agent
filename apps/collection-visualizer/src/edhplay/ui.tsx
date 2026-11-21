/** The Broadcast kit shared by the EDHPlay game pages: page scaffold, panels, stat tiles, result
 *  badges, commander avatars, card images, chips, the weekly bar chart and the loading, empty and
 *  error blocks. Colours come from the app's theme tokens (good, bad, move, warn), so every page
 *  follows the light/dark toggle. Client-safe: types only from the repo-root game library. */
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { GameRecord, GameResult, WinLoss } from "@mtg/edhplay-games.ts";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";

export type Kind = "games" | "playtests";

export function readKind(search: Record<string, unknown>): Kind {
  return search.kind === "playtests" ? "playtests" : "games";
}

// ---------------------------------------------------------------------------------------------
// Page scaffold

/** A game page: a thin bar with the sidebar toggle, then one scrolling column with the big
 *  uppercase title. `back` sits above the title (a link to the parent page). */
export function Page(props: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  back?: ReactNode;
  children: ReactNode;
  busy?: boolean;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-11 shrink-0 items-center gap-2 px-3">
        <SidebarTrigger />
        {props.back}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-7 px-5 pt-2 pb-12" aria-busy={props.busy || undefined}>
          <header className="flex flex-wrap items-center gap-4">
            <div className="flex min-w-0 flex-col gap-0.5">
              <h1 className="font-display text-[34px] leading-tight font-bold tracking-[0.5px] uppercase">
                {props.title}
              </h1>
              {props.subtitle && <span className="text-[13px] text-muted-foreground">{props.subtitle}</span>}
            </div>
            {props.actions && <div className="ml-auto flex flex-wrap items-center gap-3">{props.actions}</div>}
          </header>
          {props.children}
        </div>
      </div>
    </div>
  );
}

/** The small link above a page title, back to its parent page. */
export const BACK_LINK_CLASS = "text-[13px] text-muted-foreground hover:text-foreground";

/** Real games or solo playtests. Playtests are stored and counted apart, so this switches which
 *  data set the whole page reads. It turns amber while Playtests is on. */
export function KindToggle(props: { kind: Kind; onChange: (kind: Kind) => void }) {
  const item = (value: Kind, label: string) => {
    const on = props.kind === value;
    return (
      <button
        type="button"
        aria-pressed={on}
        onClick={() => props.onChange(value)}
        className={cn(
          "cursor-pointer rounded-full px-[18px] py-2 text-[13px] transition-colors",
          on && value === "games" && "bg-foreground font-semibold text-background",
          on && value === "playtests" && "bg-warn font-semibold text-warn-foreground",
          !on && "font-medium text-muted-foreground hover:text-foreground",
        )}
      >
        {label}
      </button>
    );
  };
  return (
    <div role="group" aria-label="Data set" className="flex gap-1 rounded-full bg-muted p-1">
      {item("games", "Games")}
      {item("playtests", "Playtests")}
    </div>
  );
}

/** The amber strip every playtest view carries, so test numbers are never mistaken for real ones. */
export function PlaytestBanner(props: { children?: ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-warn/12 px-4 py-3 text-[13px]">
      <TestTag />
      <span>
        {props.children ??
          "Playtests are kept apart. They never count toward your record, the meta or anyone's history."}
      </span>
    </div>
  );
}

export function TestTag() {
  return (
    <span className="rounded-md bg-warn px-2 py-0.5 text-[11px] font-bold tracking-wide text-warn-foreground">
      TEST
    </span>
  );
}

// ---------------------------------------------------------------------------------------------
// Panels, headings and tiles

export function SectionTitle(props: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn("font-display text-[22px] font-semibold tracking-[0.6px] uppercase", props.className)}>
      {props.children}
    </h2>
  );
}

/** A titled block of the page. `card` puts it on a raised surface; without it the heading sits on
 *  the page and the children bring their own surfaces (rows, tiles). */
export function Section(props: {
  title?: ReactNode;
  hint?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  card?: boolean;
  className?: string;
}) {
  return (
    <section
      className={cn("flex min-w-0 flex-col gap-3", props.card && "rounded-2xl bg-card px-5 py-[18px]", props.className)}
    >
      {(props.title || props.actions) && (
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {props.title && <SectionTitle className={props.card ? "text-[20px]" : undefined}>{props.title}</SectionTitle>}
          {props.hint && <span className="text-[13px] text-muted-foreground">{props.hint}</span>}
          {props.actions && <div className="ml-auto flex flex-wrap items-center gap-1.5">{props.actions}</div>}
        </div>
      )}
      {props.children}
    </section>
  );
}

export function Label(props: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("text-[12px] tracking-[1.2px] text-muted-foreground uppercase", props.className)}>
      {props.children}
    </span>
  );
}

export function StatTile(props: { label: ReactNode; value: ReactNode; hint?: ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5 rounded-2xl bg-card p-[18px]", props.className)}>
      <Label>{props.label}</Label>
      <span className="font-display text-[40px] leading-none font-bold tabular-nums">{props.value}</span>
      {props.hint && <span className="text-[12px] text-muted-foreground">{props.hint}</span>}
    </div>
  );
}

/** "14–9" in the display face with a dimmed dash. */
export function RecordText(props: { wins: number; losses: number; className?: string }) {
  return (
    <span className={cn("font-display font-bold tabular-nums", props.className)}>
      {props.wins}
      <span className="text-muted-foreground/60">–</span>
      {props.losses}
    </span>
  );
}

/** A win-rate bar: green share of a muted track. */
export function RateBar(props: { rate: number | null; className?: string }) {
  return (
    <div className={cn("h-1.5 overflow-hidden rounded-full bg-muted", props.className)}>
      <div className="h-full bg-good" style={{ width: `${Math.round((props.rate ?? 0) * 100)}%` }} />
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Results

const BADGE_TEXT: Record<GameResult, string> = { win: "W", loss: "L", unknown: "–", spectated: "S", solo: "TEST" };
const BADGE_LABEL: Record<GameResult, string> = {
  win: "Win",
  loss: "Loss",
  unknown: "No result",
  spectated: "Spectated",
  solo: "Playtest",
};
const BADGE_STYLE: Record<GameResult, string> = {
  win: "bg-good text-good-foreground",
  loss: "bg-bad text-bad-foreground",
  unknown: "bg-muted text-muted-foreground",
  spectated: "bg-move/15 text-move",
  solo: "bg-warn text-warn-foreground",
};

/** The result square on game rows and report headers. `live` wins over the result: a game being
 *  played has none yet. `sm` is the chip in the last-ten strip. */
export function ResultBadge(props: { result: GameResult; live?: boolean; size?: "sm" | "lg"; className?: string }) {
  const sm = props.size === "sm";
  const text = props.live ? "LIVE" : BADGE_TEXT[props.result];
  return (
    <span
      role="img"
      title={props.live ? "Being played now" : BADGE_LABEL[props.result]}
      aria-label={props.live ? "Being played now" : BADGE_LABEL[props.result]}
      className={cn(
        "inline-flex shrink-0 items-center justify-center font-bold",
        sm ? "size-[26px] rounded-md text-[13px]" : "size-11 rounded-xl font-display text-[22px]",
        text.length > 1 && (sm ? "w-auto px-1.5 text-[10px]" : "w-auto px-2 text-[15px] tracking-wide"),
        props.live ? "bg-bad text-bad-foreground" : BADGE_STYLE[props.result],
        props.className,
      )}
    >
      {text}
    </span>
  );
}

/** Last results as small chips, newest first. */
export function FormStrip(props: { results: GameResult[] }) {
  if (props.results.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5" aria-label={`Last ${props.results.length} results, newest first`}>
      {props.results.map((r, i) => (
        // Order is the meaning here and the list never reorders, so the index is a stable key.
        // eslint-disable-next-line react/no-array-index-key
        <ResultBadge key={i} result={r} size="sm" />
      ))}
      <span className="ml-1.5 text-[12px] text-muted-foreground">last {props.results.length}</span>
    </div>
  );
}

export function winLossText(r: WinLoss): string {
  const base = `${r.wins}–${r.losses}`;
  return r.unknown > 0 ? `${base} (+${r.unknown} undecided)` : base;
}

// ---------------------------------------------------------------------------------------------
// Formatting

export const pct = (v: number | null | undefined): string =>
  v === null || v === undefined ? "–" : `${Math.round(v * 100)}%`;
export const num1 = (v: number | null | undefined): string => (v === null || v === undefined ? "–" : v.toFixed(1));

const TZ = "Europe/Bucharest";

export function formatDate(t: number): string {
  return new Date(t).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: TZ });
}

/** "Today, 21:40", "Yesterday, 22:05" or "14 Nov, 21:15", in Bucharest time. */
export function whenLabel(t: number, now = Date.now()): string {
  const day = (x: number) => new Date(x).toLocaleDateString("en-CA", { timeZone: TZ });
  const time = new Date(t).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: TZ });
  if (day(t) === day(now)) return `Today, ${time}`;
  if (day(t) === day(now - 86_400_000)) return `Yesterday, ${time}`;
  const date = new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: TZ });
  return `${date}, ${time}`;
}

/** "2 hours ago", "yesterday", "3 days ago". */
export function agoLabel(t: number, now = Date.now()): string {
  const min = Math.round((now - t) / 60_000);
  if (min < 1) return "just now";
  if (min < 60) return `${min} minute${min === 1 ? "" : "s"} ago`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.round(h / 24);
  return d === 1 ? "yesterday" : `${d} days ago`;
}

export function formatDuration(sec: number): string {
  if (!sec) return "–";
  const m = Math.round(sec / 60);
  return m >= 60 ? `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m` : `${m}m`;
}

/** "29 Sep" from a `YYYY-MM-DD` week key. */
export function weekLabel(week: string): string {
  return new Date(`${week}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

// ---------------------------------------------------------------------------------------------
// Cards and commanders

/** A card's image by name, through the Workbench's batched image route (see edhplay/images.ts),
 *  the fallback when EDHPlay sent no image URL. */
export function scryfallImage(name: string): string {
  return `/api/card-image?v=normal&name=${encodeURIComponent(name.split(" // ")[0])}`;
}

/** The art crop, for round avatars and deck tile headers. */
export function artCrop(name: string): string {
  return `/api/card-image?v=art&name=${encodeURIComponent(name.split(" // ")[0])}`;
}

export function CardName(props: { name: string; imageUri?: string; className?: string }) {
  return (
    <HoverCard openDelay={150} closeDelay={50}>
      <HoverCardTrigger asChild>
        <span
          // Focusable so keyboard users get the card image too.
          tabIndex={0}
          className={cn(
            "cursor-default underline decoration-muted-foreground/50 decoration-dotted underline-offset-2",
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

/** A commander's art in a circle. `ring` marks the pilot (`me`), the winner (`won`) or a spectated
 *  table (`watch`). No commander shows a muted placeholder with a question mark. */
export function CommanderAvatar(props: {
  name?: string;
  size?: number;
  ring?: "me" | "won" | "watch";
  className?: string;
}) {
  const size = props.size ?? 40;
  const ring = {
    me: "outline-2 outline-offset-2 outline-foreground",
    won: "outline-2 outline-offset-2 outline-good",
    watch: "outline-2 outline-offset-2 outline-move",
  };
  if (!props.name) {
    return (
      <span
        aria-label="Unknown commander"
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground",
          props.ring && ring[props.ring],
          props.className,
        )}
        style={{ width: size, height: size }}
      >
        ?
      </span>
    );
  }
  return (
    <img
      src={artCrop(props.name)}
      alt={props.name}
      loading="lazy"
      className={cn("shrink-0 rounded-full bg-muted object-cover object-[50%_18%]", props.ring && ring[props.ring], props.className)}
      style={{ width: size, height: size }}
    />
  );
}

/** A card image tile. `round` tags it with the round it came down and outlines it green. */
export function CardImage(props: { name: string; imageUri?: string; round?: number; width?: number; className?: string }) {
  return (
    <div className={cn("relative shrink-0", props.className)} style={props.width ? { width: props.width } : undefined}>
      <img
        src={props.imageUri ?? scryfallImage(props.name)}
        alt={props.name}
        title={props.name}
        loading="lazy"
        className={cn(
          "block aspect-[488/680] w-full rounded-[5px] bg-muted",
          props.round !== undefined && "ring-2 ring-good",
        )}
      />
      {props.round !== undefined && (
        <span className="absolute top-1.5 left-1.5 rounded bg-good px-1.5 text-[11px] font-bold text-good-foreground">
          R{props.round}
        </span>
      )}
    </div>
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

/** Opponents of a game. */
export function opponentsOf(r: GameRecord) {
  return r.players.filter((p) => !p.isMe);
}

// ---------------------------------------------------------------------------------------------
// Chips and sorting

/** A pill filter. `tone` colours it while on: `view` (neutral), `good` (played-this-game), `role`
 *  (a role filter, shows ✕ to clear). */
export function Chip(props: {
  on: boolean;
  onClick: () => void;
  children: ReactNode;
  tone?: "view" | "good" | "role";
  title?: string;
}) {
  const tone = props.tone ?? "view";
  return (
    <button
      type="button"
      aria-pressed={props.on}
      title={props.title}
      onClick={props.onClick}
      className={cn(
        "cursor-pointer rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors",
        !props.on && "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
        props.on && tone === "view" && "bg-muted text-foreground",
        props.on && tone === "good" && "bg-good/15 text-good",
        props.on && tone === "role" && "bg-foreground text-background",
      )}
    >
      {props.children}
      {props.on && tone === "role" && " ✕"}
    </button>
  );
}

export type SortDir = "desc" | "asc";

/** A sortable column header: ▾ high to low, ▴ low to high. Clicking a sorted header flips it. */
export function SortHeader(props: {
  label: ReactNode;
  active: boolean;
  dir: SortDir;
  onClick: () => void;
  className?: string;
}) {
  return (
    <th
      className={cn("py-2 font-normal", props.className)}
      aria-sort={props.active ? (props.dir === "desc" ? "descending" : "ascending") : undefined}
    >
      <button
        type="button"
        onClick={props.onClick}
        className={cn("cursor-pointer hover:text-foreground", props.active && "font-semibold text-foreground")}
      >
        {props.label}
        {props.active && (props.dir === "desc" ? " ▾" : " ▴")}
      </button>
    </th>
  );
}

// ---------------------------------------------------------------------------------------------
// Charts

/** Wins and losses side by side per week, with the count on each bar and a 0..max axis. Pass
 *  consecutive weeks (empty ones as zeros) so the axis doesn't skip dates. */
export function WeekBars(props: { weeks: { week: string; wins: number; losses: number }[] }) {
  const top = Math.max(3, ...props.weeks.flatMap((w) => [w.wins, w.losses]));
  // At most five tick labels, so a busy week doesn't stack them on top of each other.
  const step = Math.ceil(top / 4);
  const max = step * Math.ceil(top / step);
  const ticks = Array.from({ length: max / step + 1 }, (_, i) => max - i * step);
  const height = 120;
  const columns = { gridTemplateColumns: `repeat(${props.weeks.length}, minmax(0, 1fr))` };
  const bar = (n: number, tone: string) => (
    <div className="flex max-w-[22px] flex-1 flex-col items-center gap-0.5">
      <span className="font-display text-[12px] font-semibold text-muted-foreground">{n}</span>
      <div className={cn("w-full rounded-t-[3px]", tone)} style={{ height: Math.max((n / max) * height, 2) }} />
    </div>
  );
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2.5">
        <div
          className="flex w-4 flex-col justify-between text-right text-[11px] text-muted-foreground/70"
          style={{ height }}
        >
          {ticks.map((t) => (
            <span key={t} className="leading-none">
              {t}
            </span>
          ))}
        </div>
        <div className="relative grid flex-1 items-end gap-3 border-b border-border" style={{ height, ...columns }}>
          {ticks.slice(0, -1).map((t) => (
            <div
              key={t}
              aria-hidden
              className="absolute inset-x-0 border-t border-border/60"
              style={{ bottom: (t / max) * height }}
            />
          ))}
          {props.weeks.map((w) => (
            <div
              key={w.week}
              role="img"
              className="relative flex h-full items-end justify-center gap-1"
              aria-label={`Week of ${weekLabel(w.week)}: ${w.wins} wins, ${w.losses} losses`}
            >
              {bar(w.wins, "bg-good")}
              {bar(w.losses, "bg-bad")}
            </div>
          ))}
        </div>
      </div>
      <div className="ml-[26px] grid gap-3" style={columns}>
        {props.weeks.map((w) => (
          <span key={w.week} className="text-center text-[11px] text-muted-foreground">
            {weekLabel(w.week)}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Legend(props: { items: { label: string; className: string }[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      {props.items.map((i) => (
        <span key={i.label} className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <span className={cn("size-2.5 rounded-[2px]", i.className)} />
          {i.label}
        </span>
      ))}
    </span>
  );
}

// ---------------------------------------------------------------------------------------------
// Loading, empty and error

/** Skeleton blocks in the shape of a page: a hero row, a tile grid and rows. */
export function LoadingBlocks(props: { label: string }) {
  return (
    <div className="flex flex-col gap-7" aria-busy="true" aria-label={props.label}>
      <div className="grid gap-4 lg:grid-cols-12">
        <Skeleton className="h-[220px] rounded-2xl lg:col-span-5" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-7">
          {["a", "b", "c", "d", "e", "f"].map((k) => (
            <Skeleton key={k} className="h-[102px] rounded-2xl" />
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {["a", "b", "c"].map((k) => (
          <Skeleton key={k} className="h-[190px] rounded-2xl" />
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        {["a", "b", "c"].map((k) => (
          <Skeleton key={k} className="h-[68px] rounded-[14px]" />
        ))}
      </div>
    </div>
  );
}

export function ErrorPanel(props: { title: string; error: unknown; onRetry?: () => void; children?: ReactNode }) {
  return (
    <section role="alert" className="flex flex-col gap-3 rounded-2xl bg-bad/10 p-6">
      <span className="font-display text-[24px] font-bold uppercase">{props.title}</span>
      <span className="max-w-[640px] text-[14px]">
        {props.children ??
          "The Workbench couldn't read the game records. Your data is still in edhplay-data/. Try again, and if it keeps failing the details below say what went wrong."}
      </span>
      <div className="flex flex-wrap items-start gap-3">
        {props.onRetry && (
          <button
            type="button"
            onClick={props.onRetry}
            className="cursor-pointer rounded-lg bg-foreground px-4 py-2 text-[13px] font-semibold text-background"
          >
            Try again
          </button>
        )}
        <details className="text-[13px] text-muted-foreground">
          <summary className="cursor-pointer py-2">Show details</summary>
          <code className="block max-w-[720px] rounded-md bg-muted p-2 text-[12px] break-all whitespace-pre-wrap">
            {props.error instanceof Error ? props.error.message : String(props.error)}
          </code>
        </details>
      </div>
    </section>
  );
}

/** `link` is a router Link styled by the caller's route, e.g. "Back to Games →". */
export function NotFoundPanel(props: { title: string; children: ReactNode; link: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl bg-card p-6">
      <span className="font-display text-[24px] font-bold uppercase">{props.title}</span>
      <span className="max-w-[640px] text-[14px] text-muted-foreground">{props.children}</span>
      <span className="text-[14px] font-semibold hover:underline">{props.link}</span>
    </section>
  );
}

/** An empty page or section: a title, one or two sentences and optional numbered steps. */
export function EmptyPanel(props: { title: string; children: ReactNode; steps?: { title: string; detail: ReactNode }[] }) {
  return (
    <section className="flex flex-col gap-5 rounded-2xl bg-card p-6">
      <div className="flex flex-col gap-2">
        <span className="font-display text-[26px] font-bold uppercase">{props.title}</span>
        <span className="max-w-[680px] text-[14px] text-muted-foreground">{props.children}</span>
      </div>
      {props.steps && (
        <ol className="flex flex-col gap-3">
          {props.steps.map((s, i) => (
            <li key={s.title} className="flex items-start gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted font-display text-[15px] font-bold">
                {i + 1}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold">{s.title}</span>
                <span className="text-[13px] text-muted-foreground">{s.detail}</span>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

/** A small empty line inside a section. */
export function EmptyState(props: { children: ReactNode }) {
  return <div className="rounded-xl border border-dashed p-5 text-[13px] text-muted-foreground">{props.children}</div>;
}

/** What to do when nothing has been recorded yet. */
export function NoGamesYet(props: { kind: Kind }) {
  if (props.kind === "playtests") {
    return (
      <EmptyPanel title="No playtests yet">
        Start a solo playtest on edhplay.com with the EDHPlay Lens extension loaded. It shows up here, apart from your
        real games, and never counts toward your record.
      </EmptyPanel>
    );
  }
  return (
    <EmptyPanel
      title="No games yet"
      steps={[
        { title: "Build the extension", detail: <code>bun run lens:build</code> },
        {
          title: "Load it in your browser",
          detail: "Open the extensions page, turn on Developer mode, choose Load unpacked and pick apps/edhplay-lens/dist.",
        },
        {
          title: "Open edhplay.com with this Workbench running",
          detail: "This page fills in on its own within 20 seconds.",
        },
      ]}
    >
      Lens hasn't recorded anything. Load the extension and open edhplay.com. Your last five EDHPlay matches come in on
      the first visit, and every game after that is recorded as you play.
    </EmptyPanel>
  );
}

// ---------------------------------------------------------------------------------------------
// Roles

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

/** A combo's results, capped: Spellbook lists a dozen near-identical effects for big loops, so
 *  show the first three and count the rest. */
export function producesText(produces: string[], max = 3): string {
  if (produces.length <= max) return produces.join(", ");
  return `${produces.slice(0, max).join(", ")} and ${produces.length - max} more`;
}
