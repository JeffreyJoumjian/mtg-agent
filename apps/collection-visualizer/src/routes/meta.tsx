import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Checkbox } from "~/components/ui/checkbox";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "~/components/ui/chart";
import type { CardRole } from "@mtg/card-roles.ts";
import { useMeta } from "~/edhplay/queries";
import {
  CardName,
  EmptyState,
  PageHeader,
  PlayerLink,
  ROLE_TEXT,
  RoleTags,
  Section,
  StatTile,
  num1,
  pct,
} from "~/edhplay/ui";

export const Route = createFileRoute("/meta")({
  component: MetaPage,
});

const COLOR_NAMES: Record<string, string> = {
  W: "White",
  U: "Blue",
  B: "Black",
  R: "Red",
  G: "Green",
  C: "Colourless",
};

function MetaPage() {
  const [includeSpectated, setIncludeSpectated] = useState(false);
  const query = useMeta(includeSpectated);
  const data = query.data;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader
        title="Meta"
        subtitle="What the pods you play in bring to the table. Playtests never count here."
        actions={
          <label className="flex cursor-pointer items-center gap-2 text-[13px]">
            <Checkbox checked={includeSpectated} onCheckedChange={(v) => setIncludeSpectated(v === true)} />
            Include spectated games
          </label>
        }
      />
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
        {query.isPending && (
          <p className="text-[13px] text-muted-foreground">
            Reading every recorded game… the first load also looks up combos, so it can take a moment.
          </p>
        )}
        {query.error && <p className="text-[13px] text-bad">{String(query.error)}</p>}
        {data && data.meta.games === 0 && (
          <EmptyState>
            No games recorded yet, so there's no meta to show. Play a few games with the EDHPlay Lens extension running.
          </EmptyState>
        )}
        {data && data.meta.games > 0 && <MetaReport data={data} />}
      </div>
    </div>
  );
}

type MetaData = NonNullable<ReturnType<typeof useMeta>["data"]>;

function MetaReport(props: { data: MetaData }) {
  const m = props.data.meta;
  const [roleFilter, setRoleFilter] = useState<CardRole | null>(null);
  const cards = roleFilter ? m.cards.filter((c) => c.roles.includes(roleFilter)) : m.cards;

  const roundsConfig = { games: { label: "Games", color: "var(--primary)" } } satisfies ChartConfig;
  const elimConfig = { players: { label: "Players out", color: "var(--bad)" } } satisfies ChartConfig;

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-3">
        <StatTile label="Games" value={m.games} hint={`${m.opponentSeats} opponent seats`} />
        <StatTile label="Average length" value={`${num1(m.avgRounds)} rounds`} />
        <StatTile label="First player wins" value={pct(m.firstPlayerWinRate)} />
        <StatTile label="Precon decks" value={pct(m.preconShare)} />
        <StatTile label="Game Changers seen" value={num1(m.gameChangersPerSeat)} hint="Per opponent, per game" />
        <StatTile label="Distinct commanders" value={m.commanders.length} />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Section title="Commanders you face" hint="Seats, and how often that commander won">
          <div className="max-h-[360px] overflow-y-auto">
            <table className="w-full text-[13px]">
              <tbody>
                {m.commanders.map((c) => (
                  <tr key={c.name} className="border-t">
                    <td className="py-1">
                      <CardName name={c.name} imageUri={c.imageUri} />
                      <span className="ml-2 text-[11px] text-muted-foreground">{c.identity || "C"}</span>
                    </td>
                    <td className="py-1 text-[12px] text-muted-foreground">
                      {c.players.slice(0, 3).map((u, i) => (
                        <span key={u}>
                          {i > 0 && ", "}
                          <PlayerLink username={u} />
                        </span>
                      ))}
                      {c.players.length > 3 && ` +${c.players.length - 3}`}
                    </td>
                    <td className="py-1 text-right tabular-nums">{c.seats}</td>
                    <td className="py-1 text-right text-[12px] tabular-nums text-muted-foreground">
                      {c.wins > 0 ? `${c.wins} won` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <div className="space-y-3">
          <Section title="Colours" hint="Opponent seats with each colour in their identity">
            <div className="grid grid-cols-6 gap-2 text-center text-[12px]">
              {m.colors.map((c) => (
                <div key={c.color}>
                  <div className="text-[18px] font-semibold tabular-nums">{c.seats}</div>
                  <div className="text-muted-foreground">{COLOR_NAMES[c.color]}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-1 text-[12px]">
              {m.identities.map((i) => (
                <span key={i.identity} className="rounded bg-muted px-1.5 py-0.5">
                  {i.identity} · {i.seats}
                </span>
              ))}
            </div>
          </Section>
          <Section title="Brackets" hint="From EDHPlay's own bracket estimate per deck">
            <div className="flex flex-wrap gap-3 text-[13px]">
              {m.brackets.map((b) => (
                <div key={b.bracket}>
                  <span className="font-semibold tabular-nums">{b.seats}</span>{" "}
                  <span className="text-muted-foreground">
                    {b.bracket === "unknown" ? "unknown" : `bracket ${b.bracket}`}
                  </span>
                </div>
              ))}
            </div>
            {props.data.lobby.snapshots > 0 && (
              <div className="mt-2 text-[12px] text-muted-foreground">
                Public lobby names over {props.data.lobby.snapshots} snapshots:{" "}
                {Object.entries(props.data.lobby.roomBrackets)
                  .sort((a, b) => b[1] - a[1])
                  .map(([b, n]) => `${n} ${b === "unlabelled" ? "unlabelled" : `B${b}`}`)
                  .join(" · ")}
              </div>
            )}
          </Section>
          <Section title="Interaction per opponent" hint="Distinct cards with each role shown per opponent, per game">
            <div className="flex flex-wrap gap-1.5">
              {m.rolesPerSeat.map((r) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => setRoleFilter(roleFilter === r.role ? null : r.role)}
                  className={`cursor-pointer rounded border px-2 py-1 text-[12px] ${roleFilter === r.role ? "bg-primary text-primary-foreground" : ""}`}
                >
                  {ROLE_TEXT[r.role] ?? r.role} <span className="tabular-nums">{r.perSeat.toFixed(1)}</span>
                </button>
              ))}
            </div>
          </Section>
        </div>
      </div>

      <Section
        title={roleFilter ? `${ROLE_TEXT[roleFilter] ?? roleFilter} cards seen` : "Cards seen most"}
        hint="Opponent games each card was shown in, and played in"
        actions={
          roleFilter && (
            <button
              type="button"
              className="cursor-pointer text-[12px] text-muted-foreground hover:underline"
              onClick={() => setRoleFilter(null)}
            >
              Show all
            </button>
          )
        }
      >
        <div className="max-h-[480px] overflow-y-auto">
          <table className="w-full text-[13px]">
            <thead className="text-left text-[12px] text-muted-foreground">
              <tr>
                <th className="py-1 font-normal">Card</th>
                <th className="py-1 font-normal">Roles</th>
                <th className="py-1 font-normal">Players</th>
                <th className="py-1 text-right font-normal">Seen</th>
                <th className="py-1 text-right font-normal">Played</th>
              </tr>
            </thead>
            <tbody>
              {cards.slice(0, 200).map((c) => (
                <tr key={c.name} className="border-t">
                  <td className="py-1">
                    <CardName name={c.name} imageUri={c.imageUri} />
                    {c.gameChanger && <span className="ml-1 text-[10px] text-warn">GC</span>}
                  </td>
                  <td className="py-1">
                    <RoleTags roles={c.roles} />
                  </td>
                  <td className="py-1 text-[12px] text-muted-foreground">{c.players.length}</td>
                  <td className="py-1 text-right tabular-nums">{c.games}</td>
                  <td className="py-1 text-right tabular-nums">{c.played}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {cards.length === 0 && (
            <p className="text-[13px] text-muted-foreground">No cards recorded for this filter yet.</p>
          )}
        </div>
      </Section>

      <div className="grid gap-3 lg:grid-cols-3">
        <Section title="Combos assembled" hint="Every piece shown by one opponent in one game">
          {props.data.combosSeen.length === 0 ? (
            <p className="text-[13px] text-muted-foreground">No opponent has shown every piece of a known combo yet.</p>
          ) : (
            <ul className="space-y-1.5 text-[13px]">
              {props.data.combosSeen.map((c) => (
                <li key={c.combo.id}>
                  <a
                    href={`https://commanderspellbook.com/combo/${c.combo.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium hover:underline"
                  >
                    {c.combo.cards.join(" + ")}
                  </a>
                  <span className="text-muted-foreground">
                    {" "}
                    → {c.combo.produces.join(", ")} · {c.games} games · {c.players.join(", ")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>
        <Section title="Game length" hint="Rounds">
          <ChartContainer config={roundsConfig} className="aspect-auto h-[160px] w-full">
            <BarChart data={m.roundsHistogram} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} className="stroke-border" />
              <XAxis dataKey="rounds" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={24} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="games" fill="var(--color-games)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </Section>
        <Section title="When players get knocked out" hint="Round">
          <ChartContainer config={elimConfig} className="aspect-auto h-[160px] w-full">
            <BarChart data={m.eliminationRounds} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} className="stroke-border" />
              <XAxis dataKey="round" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={24} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="players" fill="var(--color-players)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </Section>
      </div>
    </>
  );
}
