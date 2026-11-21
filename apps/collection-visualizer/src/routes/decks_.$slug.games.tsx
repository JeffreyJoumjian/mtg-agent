import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import type { CardPerformance, DeckPerformance } from "@mtg/edhplay-games.ts";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { useDeckGames } from "~/edhplay/queries";
import {
  CardName,
  EmptyState,
  KindToggle,
  PageHeader,
  ResultBadge,
  RoleTags,
  Section,
  StatTile,
  formatDate,
  num1,
  pct,
  readKind,
  winLossText,
  type Kind,
} from "~/edhplay/ui";

export const Route = createFileRoute("/decks_/$slug/games")({
  validateSearch: (search: Record<string, unknown>): { kind?: Kind } =>
    readKind(search) === "playtests" ? { kind: "playtests" } : {},
  component: DeckGamesPage,
});

function DeckGamesPage() {
  const { slug } = Route.useParams();
  const kind = readKind(Route.useSearch());
  const navigate = useNavigate();
  const query = useDeckGames(slug, kind);
  const [listId, setListId] = useState<string | null>(null);
  const perfs = query.data?.performances ?? [];
  const perf = perfs.find((p) => p.list?.listId === listId) ?? perfs[0];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader
        title={perf ? `${perf.list?.deckName ?? slug} · ${kind === "games" ? "games" : "playtests"}` : slug}
        subtitle={
          kind === "playtests" ? "Solo playtests only. None of this counts toward real games." : "Real games on EDHPlay"
        }
        back={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/decks/$slug" params={{ slug }}>
              <ArrowLeft /> Deck
            </Link>
          </Button>
        }
        actions={
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
        }
      />
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
        {query.isPending && <p className="text-[13px] text-muted-foreground">Loading games for {slug}…</p>}
        {query.error && <p className="text-[13px] text-bad">{String(query.error)}</p>}
        {query.data && perfs.length === 0 && (
          <EmptyState>
            None of this deck's lists is linked to an EDHPlay deck, so its games can't be matched. Link a list with `bun
            run edhplay link`.
          </EmptyState>
        )}
        {perfs.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            {perfs.map((p) => (
              <Button
                key={p.list?.listId}
                size="sm"
                variant={p === perf ? "default" : "outline"}
                onClick={() => setListId(p.list?.listId ?? null)}
              >
                {p.list?.label} <span className="text-[11px] opacity-70">{p.record.games}</span>
              </Button>
            ))}
          </div>
        )}
        {perf &&
          (perf.record.games === 0 ? (
            <EmptyState>
              No {kind === "games" ? "games" : "playtests"} recorded with the {perf.list?.label} list yet.
            </EmptyState>
          ) : (
            <Performance perf={perf} roles={query.data?.roles ?? {}} kind={kind} />
          ))}
      </div>
    </div>
  );
}

function Performance(props: { perf: DeckPerformance; roles: Record<string, string[]>; kind: Kind }) {
  const p = props.perf;
  const landsConfig = { avgLands: { label: "Lands", color: "var(--primary)" } } satisfies ChartConfig;
  const lifeConfig = {
    me: { label: "This deck", color: "var(--primary)" },
    opponents: { label: "Others (average)", color: "var(--move)" },
  } satisfies ChartConfig;
  const lands = p.landsByRound.filter((r) => r.avgLands !== null);
  const life = p.lifeByRound.filter((r) => r.me !== null);

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-3">
        {props.kind === "games" && (
          <StatTile
            label="Record"
            value={`${p.record.wins}–${p.record.losses}`}
            hint={`Win rate ${pct(p.record.winRate)}${p.record.unknown > 0 ? `, ${p.record.unknown} with no result` : ""}`}
          />
        )}
        <StatTile
          label={props.kind === "games" ? "Games with detail" : "Playtests"}
          value={p.capturedGames}
          hint={props.kind === "games" ? `${p.record.games} games in total` : undefined}
        />
        <StatTile label="Average length" value={`${num1(p.avgRounds)} rounds`} />
        <StatTile label="Mulligans" value={num1(p.avgMulligans)} hint="Per game" />
        <StatTile
          label="Commander out"
          value={p.commander.avgFirstCastRound === null ? "–" : `round ${num1(p.commander.avgFirstCastRound)}`}
          hint={`Cast in ${p.commander.castInGames} games, ${num1(p.commander.avgCasts)} times each`}
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Section title="Lands by round" hint="Average lands played by the end of each round">
          {lands.length === 0 ? (
            <p className="text-[13px] text-muted-foreground">Needs a recorded game.</p>
          ) : (
            <ChartContainer config={landsConfig} className="aspect-auto h-[180px] w-full">
              <BarChart data={lands} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} className="stroke-border" />
                <XAxis dataKey="round" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={24} />
                <ChartTooltip content={<ChartTooltipContent formatter={(v) => Number(v).toFixed(1)} />} />
                <Bar dataKey="avgLands" fill="var(--color-avgLands)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ChartContainer>
          )}
        </Section>
        <Section title="Life by round" hint="This deck against the other seats">
          {life.length === 0 ? (
            <p className="text-[13px] text-muted-foreground">Needs a recorded game.</p>
          ) : (
            <ChartContainer config={lifeConfig} className="aspect-auto h-[180px] w-full">
              <LineChart data={life} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
                <CartesianGrid vertical={false} className="stroke-border" />
                <XAxis dataKey="round" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={28} domain={["auto", "auto"]} />
                <ChartTooltip content={<ChartTooltipContent formatter={(v) => Number(v).toFixed(1)} />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line dataKey="me" stroke="var(--color-me)" strokeWidth={2.5} dot={false} />
                <Line dataKey="opponents" stroke="var(--color-opponents)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ChartContainer>
          )}
        </Section>
      </div>

      <CardTable cards={p.cards} roles={props.roles} kind={props.kind} games={p.capturedGames} />

      {props.kind === "games" && (
        <Section title="Matchups" hint="Your record with this list against each commander">
          {p.matchups.length === 0 ? (
            <p className="text-[13px] text-muted-foreground">No opponents recorded yet.</p>
          ) : (
            <table className="w-full text-[13px]">
              <tbody>
                {p.matchups.map((m) => (
                  <tr key={m.commander} className="border-t">
                    <td className="py-1">
                      <CardName name={m.commander.split(" + ")[0]} imageUri={m.imageUri} />
                      {m.commander.includes(" + ") && (
                        <span className="text-muted-foreground">
                          {" "}
                          + {m.commander.split(" + ").slice(1).join(" + ")}
                        </span>
                      )}
                    </td>
                    <td className="py-1 text-right tabular-nums">{winLossText(m.record)}</td>
                    <td className="py-1 text-right tabular-nums text-muted-foreground">{pct(m.record.winRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Section>
      )}

      <Section title={props.kind === "games" ? "Games" : "Playtests"}>
        <table className="w-full text-[13px]">
          <tbody>
            {p.games.map((r) => (
              <tr key={r.id} className="border-t">
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
                <td className="py-1.5 text-muted-foreground">
                  {r.players
                    .filter((x) => (props.kind === "games" ? !x.isMe : x.deckId !== p.deckId))
                    .map((x) => x.commanders.map((c) => c.name).join(" + "))
                    .join(" · ")}
                </td>
                <td className="py-1.5 text-right tabular-nums">{r.rounds} rounds</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </>
  );
}

type SortKey = "name" | "seen" | "drawn" | "played" | "round" | "board" | "winPlayed" | "winNot";

function CardTable(props: { cards: CardPerformance[]; roles: Record<string, string[]>; kind: Kind; games: number }) {
  const [sort, setSort] = useState<SortKey>("played");
  const [onlyNever, setOnlyNever] = useState(false);
  const [onlyList, setOnlyList] = useState(true);

  const value = (c: CardPerformance): number | string => {
    switch (sort) {
      case "name":
        return c.name;
      case "seen":
        return c.seen;
      case "drawn":
        return c.drawn;
      case "played":
        return c.played;
      case "round":
        return c.avgFirstPlayRound ?? 99;
      case "board":
        return c.onBoardAtEnd;
      case "winPlayed":
        return c.winRateWhenPlayed ?? -1;
      case "winNot":
        return c.winRateWhenNotPlayed ?? -1;
      default: {
        const _exhaustive: never = sort;
        return _exhaustive;
      }
    }
  };
  const rows = props.cards
    .filter((c) => (!onlyNever || c.neverPlayed) && (!onlyList || c.inList))
    .sort((a, b) => {
      const va = value(a);
      const vb = value(b);
      if (typeof va === "string" && typeof vb === "string") return va.localeCompare(vb);
      if (sort === "round") return Number(va) - Number(vb);
      return Number(vb) - Number(va);
    });

  const header = (key: SortKey, label: string, right = true) => (
    <th className={`py-1 font-normal ${right ? "text-right" : ""}`}>
      <button
        type="button"
        className={`cursor-pointer hover:underline ${sort === key ? "font-semibold text-foreground" : ""}`}
        onClick={() => setSort(key)}
      >
        {label}
      </button>
    </th>
  );

  return (
    <Section
      title="Card performance"
      hint={`Across ${props.games} ${props.kind === "games" ? "recorded games" : "playtests"}. Rates count decided games only`}
      actions={
        <div className="flex items-center gap-3 text-[12px]">
          <label className="flex cursor-pointer items-center gap-1.5">
            <Checkbox checked={onlyList} onCheckedChange={(v) => setOnlyList(v === true)} /> In the list now
          </label>
          <label className="flex cursor-pointer items-center gap-1.5">
            <Checkbox checked={onlyNever} onCheckedChange={(v) => setOnlyNever(v === true)} /> Never played
          </label>
        </div>
      }
    >
      <div className="max-h-[560px] overflow-auto">
        <table className="w-full min-w-[760px] text-[13px]">
          <thead className="sticky top-0 bg-card text-left text-[12px] text-muted-foreground">
            <tr>
              {header("name", "Card", false)}
              <th className="py-1 font-normal">Roles</th>
              {header("seen", "Seen")}
              {header("drawn", "Drawn")}
              {header("played", "Played")}
              {header("round", "First round")}
              {header("board", "On board at end")}
              {props.kind === "games" && header("winPlayed", "Win % played")}
              {props.kind === "games" && header("winNot", "Win % not")}
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.name} className={`border-t ${c.neverPlayed ? "bg-warn/10" : ""}`}>
                <td className="py-1">
                  <CardName name={c.name} imageUri={c.imageUri} />
                  {!c.inList && <span className="ml-1 text-[10px] text-muted-foreground">cut</span>}
                </td>
                <td className="py-1">
                  <RoleTags roles={props.roles[c.name]} />
                </td>
                <td className="py-1 text-right tabular-nums">{c.seen}</td>
                <td className="py-1 text-right tabular-nums">{c.drawn}</td>
                <td className="py-1 text-right tabular-nums">{c.played}</td>
                <td className="py-1 text-right tabular-nums">{num1(c.avgFirstPlayRound)}</td>
                <td className="py-1 text-right tabular-nums">{c.onBoardAtEnd}</td>
                {props.kind === "games" && <td className="py-1 text-right tabular-nums">{pct(c.winRateWhenPlayed)}</td>}
                {props.kind === "games" && (
                  <td className="py-1 text-right tabular-nums">{pct(c.winRateWhenNotPlayed)}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
