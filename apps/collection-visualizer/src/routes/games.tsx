import { useState, type ReactNode } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import type { GameRecord, PlayerRecord } from "@mtg/edhplay-games.ts";
import { useOverview } from "~/edhplay/queries";
import {
  Chip,
  CommanderAvatar,
  ErrorPanel,
  FormStrip,
  KindToggle,
  Label,
  Legend,
  LoadingBlocks,
  NoGamesYet,
  Page,
  PlaytestBanner,
  RateBar,
  RecordText,
  ResultBadge,
  Section,
  StatTile,
  TestTag,
  WeekBars,
  agoLabel,
  artCrop,
  formatDuration,
  num1,
  pct,
  readKind,
  whenLabel,
  type Kind,
} from "~/edhplay/ui";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/games")({
  validateSearch: (search: Record<string, unknown>): { kind?: Kind } =>
    readKind(search) === "playtests" ? { kind: "playtests" } : {},
  component: GamesPage,
});

function GamesPage() {
  const kind = readKind(Route.useSearch());
  const navigate = useNavigate();
  const query = useOverview(kind);
  const data = query.data;

  const last = data?.records[0];
  const subtitle = !data
    ? query.isPending
      ? `Loading ${kind}…`
      : undefined
    : kind === "games"
      ? `${data.records.length} recorded${data.me ? ` as ${data.me}` : ""}${last ? ` · last game ${agoLabel(last.startedAt)}` : ""}`
      : `${data.records.length} solo playtest${data.records.length === 1 ? "" : "s"}${last ? ` · last one ${agoLabel(last.startedAt)}` : ""}`;

  return (
    <Page
      title={kind === "games" ? "Games" : "Playtests"}
      subtitle={subtitle}
      busy={query.isPending}
      actions={
        <KindToggle
          kind={kind}
          onChange={(k) => void navigate({ to: "/games", search: k === "playtests" ? { kind: k } : {} })}
        />
      }
    >
      {query.isPending && <LoadingBlocks label={`Loading ${kind}`} />}
      {query.error && (
        <ErrorPanel title={`Couldn't load your ${kind}`} error={query.error} onRetry={() => void query.refetch()} />
      )}
      {data && data.records.length === 0 && <NoGamesYet kind={kind} />}
      {data && data.records.length > 0 && (kind === "games" ? <RealGames data={data} /> : <Playtests data={data} />)}
    </Page>
  );
}

type OverviewData = NonNullable<ReturnType<typeof useOverview>["data"]>;

function RealGames(props: { data: OverviewData }) {
  const { overview: o, records } = props.data;
  const played = records.filter((r) => r.mode === "player");
  const form = played.slice(0, 10).map((r) => r.result);
  // The last eight weeks up to the latest game, empty weeks included so the axis doesn't skip.
  const weeks: { week: string; wins: number; losses: number }[] = [];
  const latest = o.byWeek[o.byWeek.length - 1]?.week;
  for (let i = 7; latest && i >= 0; i--) {
    const d = new Date(`${latest}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() - i * 7);
    const week = d.toISOString().slice(0, 10);
    if (week < o.byWeek[0].week) continue;
    const row = o.byWeek.find((w) => w.week === week);
    weeks.push({ week, wins: row?.record.wins ?? 0, losses: row?.record.losses ?? 0 });
  }

  return (
    <>
      <section className="grid gap-4 lg:grid-cols-12">
        <div className="flex min-w-0 flex-col gap-2.5 rounded-2xl bg-card p-6 lg:col-span-5">
          <Label>Your record</Label>
          <div className="flex flex-wrap items-baseline gap-3.5">
            <RecordText wins={o.record.wins} losses={o.record.losses} className="text-[104px] leading-[0.9]" />
            <span className="font-display text-[40px] font-semibold text-good">{pct(o.record.winRate)}</span>
          </div>
          <span className="text-muted-foreground">
            {o.record.unknown > 0
              ? `${o.record.unknown} game${o.record.unknown === 1 ? "" : "s"} with no result. Spectated games never count.`
              : "Spectated games never count."}
          </span>
          <div className="mt-1.5">
            <FormStrip results={form} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-7">
          <StatTile
            label="Avg game"
            value={`${num1(o.avgRounds)} rds`}
            hint={o.avgDurationMin ? minutesText(o.avgDurationMin) : "No game length yet"}
          />
          <StatTile label="First player wins" value={pct(o.firstPlayerWinRate)} hint="of decided games" />
          <StatTile
            label="Commander out"
            value={o.avgCommanderRound === null ? "–" : `R${num1(o.avgCommanderRound)}`}
            hint="average first cast"
          />
          <StatTile label="Mulligans" value={num1(o.avgMulligans)} hint="per game" />
          <StatTile
            label="Players met"
            value={o.playersMet}
            hint={o.playersMetAgain > 0 ? `${o.playersMetAgain} more than once` : "none twice yet"}
          />
          <StatTile
            label="Combos seen"
            value={props.data.combosSeen}
            hint={
              played.length > props.data.combosScannedGames
                ? `every piece shown, in your last ${props.data.combosScannedGames} games`
                : "every piece shown in a game"
            }
          />
        </div>
      </section>

      {weeks.length > 0 && (
        <Section
          card
          title="Week by week"
          actions={
            <Legend
              items={[
                { label: "wins", className: "bg-good" },
                { label: "losses", className: "bg-bad" },
              ]}
            />
          }
        >
          <WeekBars weeks={weeks} />
        </Section>
      )}

      {o.byDeck.length > 0 && (
        <Section title="Your decks">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {o.byDeck.map((d) => (
              <DeckTile
                key={d.deckId}
                name={d.deckName}
                list={d.listLabel}
                slug={d.slug}
                commander={props.data.deckCommanders[d.deckId]?.[0]?.name}
              >
                <div className="flex items-baseline gap-2.5">
                  <RecordText wins={d.record.wins} losses={d.record.losses} className="text-[30px]" />
                  <span className="text-muted-foreground">
                    {pct(d.record.winRate)} · {d.record.games} game{d.record.games === 1 ? "" : "s"}
                  </span>
                </div>
                <RateBar rate={d.record.winRate} />
              </DeckTile>
            ))}
          </div>
        </Section>
      )}

      <RecentGames records={records} comboRecordIds={props.data.comboRecordIds} />
    </>
  );
}

type GameFilter = "all" | "played" | "spectated";

function RecentGames(props: { records: GameRecord[]; comboRecordIds: string[] }) {
  const [filter, setFilter] = useState<GameFilter>("all");
  const hasSpectated = props.records.some((r) => r.mode === "spectator");
  const shown = props.records.filter(
    (r) => filter === "all" || (filter === "played" ? r.mode === "player" : r.mode === "spectator"),
  );

  return (
    <Section
      title="Recent games"
      hint="Spectated games are listed but never count"
      actions={
        hasSpectated && (
          <div role="group" aria-label="Filter games" className="flex gap-1.5">
            <Chip on={filter === "all"} onClick={() => setFilter("all")}>
              All
            </Chip>
            <Chip on={filter === "played"} onClick={() => setFilter("played")}>
              Played
            </Chip>
            <Chip on={filter === "spectated"} onClick={() => setFilter("spectated")}>
              Spectated
            </Chip>
          </div>
        )
      }
    >
      <div className="flex flex-col gap-2.5">
        {shown.map((r) => (
          <GameRow key={r.id} record={r} comboSeen={props.comboRecordIds.includes(r.id)} />
        ))}
      </div>
    </Section>
  );
}

function GameRow(props: { record: GameRecord; comboSeen: boolean }) {
  const r = props.record;
  const watched = r.mode === "spectator";
  const me = r.players.find((p) => p.isMe);
  // A spectated table has no "you": its first seat takes the left slot with the blue ring.
  const left = watched ? r.players[0] : me;
  const others = r.players.filter((p) => p !== left);

  const tags: string[] = [];
  if (r.inProgress) tags.push("In progress");
  if (props.comboSeen) tags.push("Combo seen");
  if (watched) tags.push("Spectated");
  if (r.joinedMidGame) tags.push("Joined late");
  if (r.result === "unknown" && !r.inProgress) tags.push("No result");
  if (r.source === "match") tags.push("History only");

  return (
    <Link
      to="/games/$id"
      params={{ id: r.id }}
      className="group grid grid-cols-[44px_minmax(0,1fr)] items-center gap-x-[18px] gap-y-3 rounded-[14px] bg-card px-4 py-3 transition hover:-translate-y-px hover:bg-accent focus-visible:-translate-y-px focus-visible:bg-accent md:grid-cols-[44px_130px_minmax(0,1fr)_auto]"
    >
      <ResultBadge result={r.result} live={r.inProgress} />
      <div className="flex w-[130px] flex-col gap-0.5">
        <span className="font-semibold">{whenLabel(r.startedAt)}</span>
        <span className="text-[12px] text-muted-foreground">
          {r.rounds ? `${r.rounds} rounds` : "No rounds yet"} · {formatDuration(r.durationSec)}
        </span>
      </div>
      <div className="col-span-2 flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-2 md:col-span-1">
        <CommanderAvatar
          name={left?.commanders[0]?.name}
          size={52}
          ring={watched ? "watch" : "me"}
        />
        <span className="font-display text-[18px] font-semibold text-muted-foreground/60">VS</span>
        {others.map((p) => (
          <Seat key={p.username} player={p} />
        ))}
      </div>
      <div className="col-span-2 flex flex-wrap items-center justify-end gap-2 md:col-span-1 md:max-w-[220px]">
        {tags.map((t) => (
          <span key={t} className="rounded-full bg-muted px-2.5 py-1 text-[12px]">
            {t}
          </span>
        ))}
        <span className="hidden text-[13px] font-semibold group-hover:inline group-focus-visible:inline">
          Open report →
        </span>
      </div>
    </Link>
  );
}

function Seat(props: { player: PlayerRecord }) {
  const p = props.player;
  return (
    <div className="flex items-center gap-2 pr-2.5">
      <CommanderAvatar name={p.commanders[0]?.name} ring={p.isWinner ? "won" : undefined} />
      <div className="flex flex-col">
        <span className="text-[13px] font-medium">
          {p.commanders.length > 0 ? p.commanders.map((c) => c.name).join(" + ") : "Unknown commander"}
        </span>
        <span className="text-[12px] text-muted-foreground">
          {p.username}
          {p.isWinner && " · won"}
        </span>
      </div>
    </div>
  );
}

/** A deck tile with its commander's art across the top, linking to the deck's Games page. */
function DeckTile(props: {
  name: string;
  list?: string;
  slug?: string;
  commander?: string;
  kind?: Kind;
  children: ReactNode;
}) {
  const body = (
    <>
      <div className="relative h-[132px] overflow-hidden bg-muted">
        {props.commander && (
          <img
            src={artCrop(props.commander)}
            alt={props.commander}
            loading="lazy"
            className="block size-full object-cover object-[50%_17%]"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 h-[70px] bg-gradient-to-t from-card to-transparent" />
      </div>
      <div className="relative -mt-[18px] flex flex-col gap-2 px-[18px] pb-[18px]">
        <span className="text-[16px] font-semibold">
          {props.name} {props.list && <span className="text-[13px] font-normal text-muted-foreground">{props.list}</span>}
        </span>
        {props.children}
      </div>
    </>
  );
  const className = "flex flex-col overflow-hidden rounded-2xl bg-card transition hover:-translate-y-px";
  if (!props.slug) return <div className={className}>{body}</div>;
  return (
    <Link
      to="/decks/$slug/games"
      params={{ slug: props.slug }}
      search={props.kind === "playtests" ? { kind: "playtests" } : {}}
      className={cn(className, "focus-visible:-translate-y-px")}
    >
      {body}
    </Link>
  );
}

function Playtests(props: { data: OverviewData }) {
  const records = props.data.records;
  const decks = props.data.testedDecks;
  const avgRounds = props.data.overview.avgRounds ?? avgOf(records.map((r) => r.rounds).filter((n) => n > 0));
  const avgMinutes = avgOf(records.map((r) => r.durationSec / 60).filter((n) => n > 0));
  return (
    <>
      <PlaytestBanner />
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Playtests" value={records.length} hint="never counted with real games" />
        <StatTile label="Decks tested" value={decks.length} hint="matched by the deck each seat loaded" />
        <StatTile
          label="Avg length"
          value={`${num1(avgRounds)} rds`}
          hint={avgMinutes !== null ? minutesText(avgMinutes) : "No length yet"}
        />
        <StatTile label="Lands by R4" value={num1(props.data.landsByRound4)} hint="across every seat" />
      </section>

      {decks.length > 0 && (
        <Section title="Decks tested">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {decks.map((d) => (
              <DeckTile
                key={d.deckId}
                name={d.deckName}
                list={d.listLabel}
                slug={d.slug}
                kind="playtests"
                commander={props.data.deckCommanders[d.deckId]?.[0]?.name}
              >
                <span className="text-[13px] text-muted-foreground">
                  {d.playtests} playtest{d.playtests === 1 ? "" : "s"}
                  {d.landsByRound4 !== null && ` · ${num1(d.landsByRound4)} lands by round 4`}
                </span>
                <span className="text-[13px] text-muted-foreground">
                  {d.commanderRound !== null
                    ? `Commander out by round ${num1(d.commanderRound)}`
                    : "Commander not cast yet"}
                </span>
              </DeckTile>
            ))}
          </div>
        </Section>
      )}

      <Section title="All playtests">
        <div className="flex flex-col gap-2.5">
          {records.map((r) => (
            <Link
              key={r.id}
              to="/games/$id"
              params={{ id: r.id }}
              search={{ kind: "playtests" }}
              className="group flex flex-wrap items-center gap-[18px] rounded-[14px] bg-card px-4 py-3 transition hover:-translate-y-px hover:bg-accent focus-visible:-translate-y-px focus-visible:bg-accent"
            >
              {r.inProgress ? <ResultBadge result="solo" live /> : <TestTag />}
              <div className="flex w-[130px] flex-col gap-0.5">
                <span className="font-semibold">{whenLabel(r.startedAt)}</span>
                <span className="text-[12px] text-muted-foreground">
                  {r.rounds ? `${r.rounds} rounds` : "No rounds yet"} · {formatDuration(r.durationSec)}
                </span>
              </div>
              {r.players.map((p, i) => (
                <div key={p.username} className="flex items-center gap-2">
                  <CommanderAvatar name={p.commanders[0]?.name} />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-medium">
                      {p.deckName ?? p.commanders[0]?.name ?? "Unknown deck"}
                    </span>
                    <span className="text-[12px] text-muted-foreground">{p.username || `Player ${i + 1}`}</span>
                  </div>
                </div>
              ))}
              <span className="ml-auto hidden text-[13px] font-semibold group-hover:inline group-focus-visible:inline">
                Open report →
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

function avgOf(xs: number[]): number | null {
  return xs.length > 0 ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
}

function minutesText(minutes: number): string {
  const m = Math.max(1, Math.round(minutes));
  return `${m} minute${m === 1 ? "" : "s"}`;
}
