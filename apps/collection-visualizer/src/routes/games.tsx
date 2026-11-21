import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { GameRecord } from "@mtg/edhplay-games.ts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "~/components/ui/chart";
import { useOverview } from "~/edhplay/queries";
import {
  Commanders,
  KindToggle,
  NoGamesYet,
  PageHeader,
  PlayerLink,
  ResultBadge,
  Section,
  StatTile,
  formatDate,
  formatDuration,
  num1,
  pct,
  readKind,
  winLossText,
  type Kind,
} from "~/edhplay/ui";

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

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader
        title={kind === "games" ? "Games" : "Playtests"}
        subtitle={data ? `${data.records.length} recorded${data.me ? ` as ${data.me}` : ""}` : undefined}
        actions={
          <KindToggle
            kind={kind}
            onChange={(k) => void navigate({ to: "/games", search: k === "playtests" ? { kind: k } : {} })}
          />
        }
      />
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
        {query.isPending && <p className="text-[13px] text-muted-foreground">Loading games…</p>}
        {query.error && <p className="text-[13px] text-bad">{String(query.error)}</p>}
        {data && data.records.length === 0 && <NoGamesYet kind={kind} />}
        {data &&
          data.records.length > 0 &&
          (kind === "games" ? <RealGames data={data} /> : <Playtests records={data.records} />)}
      </div>
    </div>
  );
}

type OverviewData = NonNullable<ReturnType<typeof useOverview>["data"]>;

function RealGames(props: { data: OverviewData }) {
  const { overview: o, records } = props.data;
  const weekConfig = {
    wins: { label: "Wins", color: "var(--good)" },
    losses: { label: "Losses", color: "var(--bad)" },
  } satisfies ChartConfig;
  const weeks = o.byWeek.map((w) => ({ week: w.week, wins: w.record.wins, losses: w.record.losses }));

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-3">
        <StatTile
          label="Record"
          value={`${o.record.wins}–${o.record.losses}`}
          hint={`${o.record.games} games${o.record.unknown > 0 ? `, ${o.record.unknown} with no result` : ""}`}
        />
        <StatTile label="Win rate" value={pct(o.record.winRate)} hint="Decided games only" />
        <StatTile label="Recorded by Lens" value={o.captured} hint={`${o.matchOnly} from EDHPlay history only`} />
        <StatTile
          label="Average length"
          value={`${num1(o.avgRounds)} rounds`}
          hint={o.avgDurationMin ? `${Math.round(o.avgDurationMin)} minutes` : undefined}
        />
        <StatTile label="First player wins" value={pct(o.firstPlayerWinRate)} />
        <StatTile label="Spectated" value={o.spectated} hint="Kept out of your record" />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Section title="By deck">
          <table className="w-full text-[13px]">
            <thead className="text-left text-[12px] text-muted-foreground">
              <tr>
                <th className="py-1 font-normal">Deck</th>
                <th className="py-1 font-normal">Record</th>
                <th className="py-1 text-right font-normal">Win rate</th>
              </tr>
            </thead>
            <tbody>
              {o.byDeck.map((d) => (
                <tr key={d.deckId} className="border-t">
                  <td className="py-1.5">
                    {d.slug ? (
                      <Link to="/decks/$slug/games" params={{ slug: d.slug }} className="hover:underline">
                        {d.deckName}
                      </Link>
                    ) : (
                      d.deckName
                    )}
                    {d.listLabel && <span className="ml-1 text-[12px] text-muted-foreground">{d.listLabel}</span>}
                  </td>
                  <td className="py-1.5 tabular-nums">{winLossText(d.record)}</td>
                  <td className="py-1.5 text-right tabular-nums">{pct(d.record.winRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="Results by week">
          {weeks.length < 2 ? (
            <p className="text-[13px] text-muted-foreground">The weekly chart starts once games span two weeks.</p>
          ) : (
            <ChartContainer config={weekConfig} className="aspect-auto h-[180px] w-full">
              <BarChart data={weeks} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} className="stroke-border" />
                <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={28} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="wins" stackId="r" fill="var(--color-wins)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="losses" stackId="r" fill="var(--color-losses)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ChartContainer>
          )}
        </Section>
      </div>

      <Section title="All games" hint="Spectated games are listed but never count toward your record">
        <GameTable records={records} kind="games" />
      </Section>
    </>
  );
}

function Playtests(props: { records: GameRecord[] }) {
  const avgRounds =
    props.records.length > 0 ? props.records.reduce((a, r) => a + r.rounds, 0) / props.records.length : null;
  const decks = new Set(props.records.flatMap((r) => r.players.map((p) => p.deckId).filter(Boolean)));
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-3">
        <StatTile label="Playtests" value={props.records.length} hint="Never counted with real games" />
        <StatTile label="Average length" value={`${num1(avgRounds)} rounds`} />
        <StatTile label="Decks tested" value={decks.size} />
      </div>
      <Section title="All playtests">
        <GameTable records={props.records} kind="playtests" />
      </Section>
    </>
  );
}

function GameTable(props: { records: GameRecord[]; kind: Kind }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-[13px]">
        <thead className="text-left text-[12px] text-muted-foreground">
          <tr>
            <th className="py-1 font-normal">When</th>
            <th className="py-1 font-normal">Result</th>
            <th className="py-1 font-normal">{props.kind === "games" ? "Your deck" : "Seats"}</th>
            <th className="py-1 font-normal">{props.kind === "games" ? "Opponents" : ""}</th>
            <th className="py-1 text-right font-normal">Rounds</th>
            <th className="py-1 text-right font-normal">Length</th>
            <th className="py-1 text-right font-normal">Data</th>
          </tr>
        </thead>
        <tbody>
          {props.records.map((r) => (
            <tr key={r.id} className="border-t align-top">
              <td className="py-1.5 whitespace-nowrap">
                <Link
                  to="/games/$id"
                  params={{ id: r.id }}
                  search={props.kind === "playtests" ? { kind: "playtests" } : {}}
                  className="hover:underline"
                >
                  {formatDate(r.startedAt)}
                </Link>
              </td>
              <td className="py-1.5">
                <ResultBadge result={r.result} />
              </td>
              <td className="py-1.5">
                {props.kind === "games" ? (
                  r.mode === "spectator" ? (
                    <span className="text-muted-foreground">You watched</span>
                  ) : (
                    (r.myDeck?.deckName ?? <Commanders commanders={r.players.find((p) => p.isMe)?.commanders ?? []} />)
                  )
                ) : (
                  <div className="space-y-0.5">
                    {r.players.map((p) => (
                      <div key={p.username}>
                        <Commanders commanders={p.commanders} />
                      </div>
                    ))}
                  </div>
                )}
              </td>
              <td className="py-1.5">
                {props.kind === "games" && (
                  <div className="space-y-0.5">
                    {r.players
                      .filter((p) => !p.isMe)
                      .map((p) => (
                        <div key={p.username}>
                          <Commanders commanders={p.commanders} /> <span className="text-muted-foreground">·</span>{" "}
                          <PlayerLink username={p.username} className="text-muted-foreground" />
                          {p.isWinner && <span className="ml-1 text-[11px] text-good">won</span>}
                        </div>
                      ))}
                  </div>
                )}
              </td>
              <td className="py-1.5 text-right tabular-nums">{r.rounds || "–"}</td>
              <td className="py-1.5 text-right tabular-nums">{formatDuration(r.durationSec)}</td>
              <td className="py-1.5 text-right text-[12px] text-muted-foreground">
                {r.source === "match" ? "History only" : r.joinedMidGame ? "Joined late" : "Recorded"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
