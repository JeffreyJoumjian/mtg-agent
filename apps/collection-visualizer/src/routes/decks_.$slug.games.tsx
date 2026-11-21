import { useState, type ReactNode } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import type { CardPerformance, DeckPerformance, GameRecord } from "@mtg/edhplay-games.ts";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { Skeleton } from "~/components/ui/skeleton";
import { useDeckGames } from "~/edhplay/queries";
import {
  BACK_LINK_CLASS,
  CardImage,
  CardName,
  Chip,
  CommanderAvatar,
  ErrorPanel,
  KindToggle,
  Legend,
  RecordText,
  ResultBadge,
  ROLE_TEXT,
  Section,
  SortHeader,
  TestTag,
  artCrop,
  formatDuration,
  num1,
  pct,
  readKind,
  whenLabel,
  type Kind,
  type SortDir,
} from "~/edhplay/ui";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/decks_/$slug/games")({
  validateSearch: (search: Record<string, unknown>): { kind?: Kind } =>
    readKind(search) === "playtests" ? { kind: "playtests" } : {},
  component: DeckGamesPage,
});

type DeckGamesData = NonNullable<ReturnType<typeof useDeckGames>["data"]>;

function DeckGamesPage() {
  const { slug } = Route.useParams();
  const kind = readKind(Route.useSearch());
  const navigate = useNavigate();
  const query = useDeckGames(slug, kind);
  const [listId, setListId] = useState<string | null>(null);

  const data = query.data;
  const perfs = data?.performances ?? [];
  const perf = perfs.find((p) => p.list?.listId === listId) ?? perfs[0];
  const deckName = data?.deckName ?? slug;
  const listCommanders = perf?.list ? (data?.commanders[perf.list.listId] ?? []) : [];
  const commanders = listCommanders.length > 0 ? listCommanders : (data?.deckCommanders ?? []);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-11 shrink-0 items-center gap-2 px-3">
        <SidebarTrigger />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-[22px] px-5 pt-1 pb-12">
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/decks/$slug" params={{ slug }} className={BACK_LINK_CLASS}>
              ← {deckName} deck
            </Link>
            {(perfs.length > 0 || query.isPending) && (
              <div className="ml-auto">
                <KindToggle
                  kind={kind}
                  onChange={(k) =>
                    void navigate({
                      to: "/decks/$slug/games",
                      params: { slug },
                      search: k === "playtests" ? { kind: k } : {},
                    })
                  }
                />
              </div>
            )}
          </div>

          {query.isPending && <DeckLoading />}
          {query.error && (
            <ErrorPanel title="Couldn't load this deck's games" error={query.error} onRetry={() => void query.refetch()} />
          )}
          {data && perfs.length === 0 && <NotLinked slug={slug} />}
          {data && perf && (
            <>
              <Hero
                deckName={deckName}
                commander={commanders[0]}
                perfs={perfs}
                perf={perf}
                kind={kind}
                onPickList={setListId}
              />
              {perf.record.games === 0 ? (
                <NoGamesWithList label={perf.list?.label ?? "this list"} kind={kind} />
              ) : (
                <Performance perf={perf} data={data} commanders={commanders} kind={kind} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Header

/** The commander's art with the deck's name, list chips and headline numbers over it. A list with
 *  no games gets a shorter, greyed header. */
function Hero(props: {
  deckName: string;
  commander?: string;
  perfs: DeckPerformance[];
  perf: DeckPerformance;
  kind: Kind;
  onPickList: (listId: string) => void;
}) {
  const p = props.perf;
  const empty = p.record.games === 0;
  const games = props.kind === "games";
  const unit = games ? "games" : "playtests";
  const landsR4 = p.landsByRound.find((r) => r.round === 4)?.avgLands ?? null;
  const commanderOut = p.commander.avgFirstCastRound === null ? "–" : `R${num1(p.commander.avgFirstCastRound)}`;

  return (
    <section
      className={cn("relative overflow-hidden rounded-[20px] bg-card", empty ? "h-[140px]" : games ? "h-[220px]" : "h-[200px]")}
    >
      {props.commander && (
        <img
          src={artCrop(props.commander)}
          alt={props.commander}
          className={cn("block size-full object-cover object-[50%_20%]", empty && "grayscale-[0.6]")}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/15" />
      <div className="absolute inset-y-6 left-7 flex flex-col justify-between">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-[44px] leading-none font-bold uppercase">{props.deckName}</h1>
            {!games && (
              <span className="rounded bg-warn px-2 py-0.5 text-[11px] font-bold tracking-[1px] text-warn-foreground">
                PLAYTESTS
              </span>
            )}
          </div>
          {props.perfs.length > 1 && (
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="List">
              {props.perfs.map((x) => {
                const on = x === p;
                return (
                  <button
                    key={x.list?.listId ?? x.deckId}
                    type="button"
                    aria-pressed={on}
                    onClick={() => x.list && props.onPickList(x.list.listId)}
                    className={cn(
                      "cursor-pointer rounded-full px-3 py-[5px] text-[12px]",
                      on ? "bg-foreground font-semibold text-background" : "bg-muted/90 font-medium text-foreground",
                    )}
                  >
                    {x.list?.label ?? x.deckName} · {x.record.games} {unit}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        {!empty && (
          <div className="flex flex-wrap items-end gap-[30px]">
            {games ? (
              <div className="flex flex-col">
                <RecordText wins={p.record.wins} losses={p.record.losses} className="text-[64px] leading-[0.9]" />
                <span
                  className={cn(
                    "font-semibold",
                    p.record.winRate === null ? "text-muted-foreground" : p.record.winRate >= 0.5 ? "text-good" : "text-bad",
                  )}
                >
                  {p.record.winRate === null ? "no decided games yet" : `${pct(p.record.winRate)} win rate`}
                  {p.record.unknown > 0 && (
                    <span className="font-normal text-muted-foreground"> · {p.record.unknown} with no result</span>
                  )}
                </span>
              </div>
            ) : (
              <HeroNumber value={p.record.games} label="playtests" big />
            )}
            <HeroNumber value={commanderOut} label="commander out" />
            {games ? (
              <>
                <HeroNumber value={num1(p.avgRounds)} label="rounds a game" />
                <HeroNumber value={num1(p.avgMulligans)} label="mulligans" />
              </>
            ) : (
              <>
                <HeroNumber value={num1(landsR4)} label="lands by round 4" />
                <HeroNumber value={num1(p.avgRounds)} label="rounds a playtest" />
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function HeroNumber(props: { value: ReactNode; label: string; big?: boolean }) {
  return (
    <div className="flex flex-col">
      <span
        className={cn(
          "font-display font-bold tabular-nums",
          props.big ? "text-[56px] leading-[0.9]" : "text-[32px] leading-none",
        )}
      >
        {props.value}
      </span>
      <span className="text-[12px] text-muted-foreground">{props.label}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Body

function Performance(props: { perf: DeckPerformance; data: DeckGamesData; commanders: string[]; kind: Kind }) {
  const p = props.perf;
  const games = props.kind === "games";

  return (
    <>
      {games ? (
        <Spotlights perf={p} commanders={props.commanders} />
      ) : (
        <div className="rounded-xl bg-warn/12 px-4 py-3 text-[14px]">
          Playtests show how the deck draws and develops. They have no opponents' decisions in them, so there are no win
          rates here.
        </div>
      )}

      <div className={cn("grid gap-3.5", games && "lg:grid-cols-2")}>
        <LandsByRound perf={p} kind={props.kind} />
        {games && <LifeByRound perf={p} />}
      </div>

      <CardTable perf={p} roles={props.data.roles} commanders={props.commanders} kind={props.kind} />

      {games && <Matchups perf={p} />}

      <GameList perf={p} kind={props.kind} />
    </>
  );
}

/** "Never played" cut candidates and the cards "Pulling weight", side by side. */
function Spotlights(props: { perf: DeckPerformance; commanders: string[] }) {
  const p = props.perf;
  const never = p.cards.filter((c) => c.neverPlayed).sort((a, b) => b.drawn - a.drawn || b.seen - a.seen);
  const weight = p.cards
    // Lands are left out: a land drop happens nearly every game, so its "win rate when cast" is just
    // the deck's win rate and crowds out the spells worth looking at.
    .filter(
      (c) =>
        !props.commanders.includes(c.name) &&
        !/\bLand\b/.test(c.typeLine) &&
        c.winsWhenPlayed + c.lossesWhenPlayed >= 3,
    )
    .sort((a, b) => (b.winRateWhenPlayed ?? 0) - (a.winRateWhenPlayed ?? 0) || b.played - a.played)
    .slice(0, 4);

  return (
    <section className="grid gap-3.5 lg:grid-cols-2">
      <div className="flex flex-col gap-3 rounded-2xl bg-warn/12 p-[18px]">
        <div className="flex flex-wrap items-baseline gap-x-2.5">
          <h2 className="font-display text-[20px] font-semibold text-warn uppercase">Never played</h2>
          <span className="text-[12px] text-muted-foreground">
            in the list, {p.capturedGames} recorded games, never cast · cut candidates to discuss
          </span>
        </div>
        {never.length === 0 ? (
          <span className="text-[13px] text-muted-foreground">
            {p.capturedGames < 3
              ? "This shows up after three recorded games with the list."
              : "Every card in the list has been cast at least once."}
          </span>
        ) : (
          <div className="flex flex-wrap gap-3">
            {never.slice(0, 8).map((c) => (
              <SpotlightCard key={c.name} card={c} caption={`drawn in ${c.drawn} games`} />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 rounded-2xl bg-good/12 p-[18px]">
        <div className="flex flex-wrap items-baseline gap-x-2.5">
          <h2 className="font-display text-[20px] font-semibold text-good uppercase">Pulling weight</h2>
          <span className="text-[12px] text-muted-foreground">highest win rate when cast, at least 3 games</span>
        </div>
        {weight.length === 0 ? (
          <span className="text-[13px] text-muted-foreground">
            No card has been cast in three decided games yet. This fills in as you play the list.
          </span>
        ) : (
          <div className="flex flex-wrap gap-3">
            {weight.map((c) => (
              <SpotlightCard
                key={c.name}
                card={c}
                caption={`${pct(c.winRateWhenPlayed)} when cast · ${c.played} games`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SpotlightCard(props: { card: CardPerformance; caption: string }) {
  return (
    <div className="flex w-[120px] flex-col gap-1.5">
      <CardImage name={props.card.name} imageUri={props.card.imageUri} className="[&_img]:rounded-[7px]" />
      <span className="text-[12px] text-muted-foreground">{props.caption}</span>
    </div>
  );
}

function LandsByRound(props: { perf: DeckPerformance; kind: Kind }) {
  const rounds = props.perf.landsByRound.filter((r) => r.round <= 8 && r.avgLands !== null);
  const max = Math.max(1, ...rounds.map((r) => r.avgLands ?? 0));
  return (
    <Section card title="Lands by round" hint="average lands played by the end of each round">
      {rounds.length === 0 ? (
        <span className="text-[13px] text-muted-foreground">This needs a game recorded from the start.</span>
      ) : (
        <div
          className="grid h-[130px] items-end gap-2"
          // Eight columns even when fewer rounds were reached, so two rounds don't make two giant bars.
          style={{ gridTemplateColumns: "repeat(8, minmax(0, 1fr))" }}
        >
          {rounds.map((r) => (
            <div key={r.round} className="flex flex-col items-center gap-1">
              <span className="font-display text-[13px] font-semibold">{num1(r.avgLands)}</span>
              <div
                className={cn("w-full max-w-16 rounded-t-[3px]", props.kind === "games" ? "bg-foreground/70" : "bg-warn")}
                style={{ height: Math.round(((r.avgLands ?? 0) / max) * 86) }}
              />
              <span className="text-[11px] text-muted-foreground">R{r.round}</span>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

/** This deck's life against the opponents' average, rounds 1 to 12. */
function LifeByRound(props: { perf: DeckPerformance }) {
  const points = props.perf.lifeByRound.filter((r) => r.me !== null || r.opponents !== null);
  const top = Math.max(40, ...points.flatMap((r) => [r.me ?? 0, r.opponents ?? 0]));
  const w = 520;
  const h = 140;
  const x = (round: number) => ((round - 1) / Math.max(1, points.length - 1)) * (w - 20) + 10;
  const y = (life: number) => 10 + (1 - Math.max(0, life) / top) * (h - 30);
  const line = (key: "me" | "opponents") =>
    points
      .filter((r) => r[key] !== null)
      .map((r) => `${x(r.round)},${y(r[key] ?? 0)}`)
      .join(" ");
  const last = points[points.length - 1];

  return (
    <Section
      card
      title="Life by round"
      actions={
        <Legend
          items={[
            { label: "this deck", className: "h-[3px] bg-foreground" },
            { label: "opponents' average", className: "h-[3px] bg-move" },
          ]}
        />
      }
    >
      {points.length === 0 ? (
        <span className="text-[13px] text-muted-foreground">This needs a game recorded from the start.</span>
      ) : (
        <svg
          viewBox={`0 0 ${w} ${h}`}
          width="100%"
          height={h}
          role="img"
          aria-label={
            last
              ? `By round ${last.round} this deck averages ${num1(last.me)} life and opponents ${num1(last.opponents)}`
              : "Life by round"
          }
        >
          <line x1="0" y1={y(top)} x2={w} y2={y(top)} className="stroke-border" />
          <line x1="0" y1={y(0)} x2={w} y2={y(0)} className="stroke-border" />
          <text x="2" y={y(top) + 12} className="fill-muted-foreground text-[10px]">
            {top}
          </text>
          <polyline points={line("me")} fill="none" className="stroke-foreground" strokeWidth={3} />
          <polyline points={line("opponents")} fill="none" className="stroke-move" strokeWidth={2} />
          {points.map((r) => (
            <text key={r.round} x={x(r.round)} y={h - 4} textAnchor="middle" className="fill-muted-foreground text-[10px]">
              R{r.round}
            </text>
          ))}
        </svg>
      )}
    </Section>
  );
}

type SortKey = "name" | "seen" | "drawn" | "played" | "round" | "board" | "winPlayed" | "winNot";
type CardView = "list" | "never" | "cut";

/** Every card the deck has shown, sortable, filtered to the list now, never played, or cut since. */
function CardTable(props: { perf: DeckPerformance; roles: Record<string, string[]>; commanders: string[]; kind: Kind }) {
  const games = props.kind === "games";
  const [sort, setSort] = useState<{ key: SortKey; dir: SortDir }>({ key: "played", dir: "desc" });
  const [view, setView] = useState<CardView>("list");

  const value = (c: CardPerformance): number | string => {
    switch (sort.key) {
      case "name":
        return c.name;
      case "seen":
        return c.seen;
      case "drawn":
        return c.drawn;
      case "played":
        return c.played;
      case "round":
        return c.avgFirstPlayRound ?? -1;
      case "board":
        return c.onBoardAtEnd;
      case "winPlayed":
        return c.winRateWhenPlayed ?? -1;
      case "winNot":
        return c.winRateWhenNotPlayed ?? -1;
      default: {
        const _exhaustive: never = sort.key;
        return _exhaustive;
      }
    }
  };
  const rows = props.perf.cards
    .filter((c) => (view === "list" ? c.inList : view === "never" ? c.neverPlayed : !c.inList))
    .sort((a, b) => {
      const va = value(a);
      const vb = value(b);
      const cmp = typeof va === "string" && typeof vb === "string" ? va.localeCompare(vb) : Number(va) - Number(vb);
      return sort.dir === "desc" ? -cmp : cmp;
    });

  // A first click sorts names A to Z and numbers high to low; clicking the sorted header flips it.
  const header = (key: SortKey, label: string, className = "text-right") => (
    <SortHeader
      label={label}
      active={sort.key === key}
      dir={sort.dir}
      className={cn(className, "[&_button]:tracking-[1px] [&_button]:uppercase")}
      onClick={() =>
        setSort(
          sort.key === key
            ? { key, dir: sort.dir === "desc" ? "asc" : "desc" }
            : { key, dir: key === "name" || key === "round" ? "asc" : "desc" },
        )
      }
    />
  );
  const roleOf = (name: string) => {
    if (props.commanders.includes(name)) return "Commander";
    const role = (props.roles[name] ?? []).find((r) => r !== "land") ?? props.roles[name]?.[0];
    return role ? (ROLE_TEXT[role] ?? role) : "";
  };
  const winTone = (v: number | null) =>
    v === null ? "text-muted-foreground" : v >= 0.6 ? "text-good" : v < 0.45 ? "text-bad" : "";

  return (
    <Section
      card
      title="Every card"
      hint={`${props.perf.capturedGames} ${games ? "recorded game" : "playtest"}${props.perf.capturedGames === 1 ? "" : "s"} · click a column to sort`}
      actions={
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter cards">
          <Chip on={view === "list"} onClick={() => setView("list")}>
            In the list now
          </Chip>
          <Chip on={view === "never"} onClick={() => setView("never")}>
            Never played
          </Chip>
          <Chip on={view === "cut"} onClick={() => setView("cut")}>
            Cut since
          </Chip>
        </div>
      }
    >
      {props.perf.capturedGames === 0 ? (
        <span className="text-[13px] text-muted-foreground">
          None of these {games ? "games" : "playtests"} was recorded by Lens from the start, so there's no card data yet.
          Games that come only from EDHPlay's history carry the result and the commanders, not the cards.
        </span>
      ) : rows.length === 0 ? (
        <span className="text-[13px] text-muted-foreground">
          {view === "never"
            ? "No card is flagged yet. A card shows up here once it's sat in the list for three recorded games without being cast."
            : view === "cut"
              ? "Every card these games showed is still in the list."
              : "No card from the list has shown up in a recorded game yet."}
        </span>
      ) : (
        <div className="max-h-[640px] overflow-auto">
          <table className="w-full min-w-[820px] border-collapse text-[14px]">
            <thead className="sticky top-0 z-10 bg-card text-right text-[11px] tracking-[1px] text-muted-foreground uppercase">
              <tr>
                {header("name", "Card", "text-left")}
                {games && <th className="py-2 text-left font-normal">Role</th>}
                {header("seen", "Seen")}
                {header("drawn", "Drawn")}
                {header("played", "Played")}
                {header("round", "First round")}
                {header("board", "On board at end")}
                {games && header("winPlayed", "Win % cast")}
                {games && header("winNot", "Win % not")}
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.name} className={cn("border-t border-border", c.neverPlayed && "bg-warn/10")}>
                  <td className="py-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={artCrop(c.name)}
                        alt=""
                        loading="lazy"
                        className="h-7 w-10 shrink-0 rounded bg-muted object-cover object-[50%_20%]"
                      />
                      <CardName name={c.name} imageUri={c.imageUri} className="font-medium" />
                      {!c.inList && <span className="text-[11px] text-muted-foreground">cut</span>}
                    </div>
                  </td>
                  {games && <td className="py-2 text-[13px] text-muted-foreground">{roleOf(c.name)}</td>}
                  <td className="py-2 text-right tabular-nums">{c.seen}</td>
                  <td className="py-2 text-right tabular-nums">{c.drawn}</td>
                  <td className="py-2 text-right font-semibold tabular-nums">{c.played}</td>
                  <td className="py-2 text-right tabular-nums">{num1(c.avgFirstPlayRound)}</td>
                  <td className="py-2 text-right tabular-nums">{c.onBoardAtEnd}</td>
                  {games && (
                    <td className={cn("py-2 text-right font-semibold tabular-nums", winTone(c.winRateWhenPlayed))}>
                      {pct(c.winRateWhenPlayed)}
                    </td>
                  )}
                  {games && (
                    <td className="py-2 text-right text-muted-foreground tabular-nums">{pct(c.winRateWhenNotPlayed)}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}

function Matchups(props: { perf: DeckPerformance }) {
  return (
    <Section card title="Matchups" hint="your record with this list against each commander">
      {props.perf.matchups.length === 0 ? (
        <span className="text-[13px] text-muted-foreground">No opponents recorded yet.</span>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {props.perf.matchups.map((m) => {
            const first = m.commander.split(" + ")[0];
            return (
              <div key={m.commander} className="flex items-center gap-3 rounded-xl bg-background px-3 py-2.5">
                <CommanderAvatar name={first} size={44} />
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <CardName name={first} imageUri={m.imageUri} className="truncate font-medium" />
                  {m.commander.includes(" + ") && (
                    <span className="truncate text-[12px] text-muted-foreground">
                      + {m.commander.split(" + ").slice(1).join(" + ")}
                    </span>
                  )}
                  {m.record.unknown > 0 && (
                    <span className="text-[12px] text-muted-foreground">
                      {m.record.unknown} {m.record.unknown === 1 ? "game" : "games"} with no result
                    </span>
                  )}
                  <div className="flex h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="bg-good" style={{ flex: m.record.wins }} />
                    <div className="bg-bad" style={{ flex: m.record.losses }} />
                  </div>
                </div>
                <RecordText wins={m.record.wins} losses={m.record.losses} className="text-[22px]" />
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}

/** The games or playtests behind the numbers, newest first, each linking to its report. */
function GameList(props: { perf: DeckPerformance; kind: Kind }) {
  const games = props.kind === "games";
  const others = (r: GameRecord) =>
    r.players.filter((x) => (games ? !x.isMe : x.deckId !== props.perf.deckId));

  return (
    <Section title={games ? "Games" : "Playtests"}>
      <div className="flex flex-col gap-2.5">
        {props.perf.games.map((r) => {
          const opp = others(r);
          const detail = [
            opp.length === 0
              ? "goldfish"
              : `vs ${opp.map((x) => x.commanders.map((c) => c.name).join(" + ") || x.deckName || x.username).join(", ")}`,
            r.rounds ? `${r.rounds} rounds` : null,
            r.durationSec ? formatDuration(r.durationSec) : null,
          ]
            .filter(Boolean)
            .join(" · ");
          return (
            <Link
              key={r.id}
              to="/games/$id"
              params={{ id: r.id }}
              search={games ? {} : { kind: "playtests" }}
              className="group flex items-center gap-4 rounded-[14px] bg-card px-4 py-3 transition-transform hover:-translate-y-px focus-visible:-translate-y-px"
            >
              {games ? <ResultBadge result={r.result} live={r.inProgress} /> : <TestTag />}
              <span className="w-[140px] shrink-0 font-semibold">{whenLabel(r.startedAt)}</span>
              {games && opp.length > 0 && (
                <span className="flex shrink-0 -space-x-2">
                  {opp.map((x) => (
                    <CommanderAvatar
                      key={x.username}
                      name={x.commanders[0]?.name}
                      size={32}
                      ring={x.isWinner ? "won" : undefined}
                      className="ring-2 ring-card"
                    />
                  ))}
                </span>
              )}
              <span className="min-w-0 truncate text-muted-foreground">{detail}</span>
              <span className="ml-auto hidden text-[13px] text-muted-foreground group-hover:inline group-focus-visible:inline">
                Open report →
              </span>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}

// ---------------------------------------------------------------------------------------------
// Empty and loading

function NotLinked(props: { slug: string }) {
  return (
    <section className="flex flex-col items-start gap-3 rounded-[20px] bg-card px-8 py-9">
      <span className="font-display text-[40px] leading-none font-bold uppercase">Not on EDHPlay yet</span>
      <span className="max-w-[640px] leading-normal text-muted-foreground">
        None of this deck's lists is linked to an EDHPlay deck yet, so its games can't be matched to it. Link the list you
        play and its games show up here from then on.
      </span>
      <code className="rounded-lg bg-background px-3 py-2 text-[12px] text-muted-foreground">
        bun run edhplay link {props.slug} --list main --deck &lt;EDHPlay deck id&gt;
      </code>
    </section>
  );
}

function NoGamesWithList(props: { label: string; kind: Kind }) {
  const games = props.kind === "games";
  return (
    <section className="flex flex-col items-start gap-2.5 rounded-[20px] bg-card p-8">
      <span className="font-display text-[34px] leading-none font-bold uppercase">
        No {games ? "games" : "playtests"} with {props.label} yet
      </span>
      <span className="max-w-[620px] leading-normal text-muted-foreground">
        {games
          ? "This list is linked to EDHPlay but hasn't been played since. Pick it in a lobby and its games show up here. The other lists of this deck have their own numbers above."
          : "This list hasn't been playtested yet. Start a solo playtest with it on edhplay.com and it shows up here, apart from your real games."}
      </span>
    </section>
  );
}

function DeckLoading() {
  return (
    <div className="flex flex-col gap-[22px]" aria-busy="true" aria-label="Loading this deck's games">
      <Skeleton className="h-[220px] rounded-[20px]" />
      <div className="grid gap-3.5 lg:grid-cols-2">
        <Skeleton className="h-[240px] rounded-2xl" />
        <Skeleton className="h-[240px] rounded-2xl" />
      </div>
      <div className="grid gap-3.5 lg:grid-cols-2">
        <Skeleton className="h-[190px] rounded-2xl" />
        <Skeleton className="h-[190px] rounded-2xl" />
      </div>
      <Skeleton className="h-[360px] rounded-2xl" />
    </div>
  );
}
