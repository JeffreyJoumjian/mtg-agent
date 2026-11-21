import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import type { MetaCard } from "@mtg/edhplay-games.ts";
import { MANA_COLORS, ManaCost, ManaSymbol } from "~/components/symbols/Mana";
import { useMeta } from "~/edhplay/queries";
import {
  CardName,
  Chip,
  EmptyPanel,
  ErrorPanel,
  LoadingBlocks,
  Page,
  PlayerLink,
  ROLE_TEXT,
  RecordText,
  Section,
  SortHeader,
  StatTile,
  artCrop,
  num1,
  pct,
  type SortDir,
} from "~/edhplay/ui";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/meta")({
  component: MetaPage,
});

function MetaPage() {
  const [includeSpectated, setIncludeSpectated] = useState(false);
  const query = useMeta(includeSpectated);
  const data = query.data;
  const empty = data !== undefined && data.meta.games === 0;
  const spectated = data?.spectatedGames ?? 0;

  return (
    <Page
      title="Meta"
      busy={query.isPending}
      subtitle={
        query.isPending
          ? "Loading the meta…"
          : data && !empty
            ? `What your pods bring · ${data.meta.games} ${includeSpectated ? "games" : "games you played"} · playtests never count`
            : undefined
      }
      actions={
        <label
          className={cn(
            "flex items-center gap-2.5 text-[13px]",
            spectated === 0 ? "text-muted-foreground/60" : "cursor-pointer text-muted-foreground",
          )}
        >
          <input
            type="checkbox"
            className="size-[18px] accent-foreground"
            checked={includeSpectated}
            disabled={spectated === 0}
            onChange={(e) => setIncludeSpectated(e.target.checked)}
          />
          {spectated === 0 ? "Include spectated games" : `Include ${spectated} spectated game${spectated === 1 ? "" : "s"}`}
        </label>
      }
    >
      {query.isPending && <LoadingBlocks label="Loading the meta" />}
      {query.error && <ErrorPanel title="Couldn't load the meta" error={query.error} onRetry={() => void query.refetch()} />}
      {empty && (
        <EmptyPanel title="No meta yet">
          The meta is built from the games you play: the commanders, colours and cards your pods bring. It fills in
          after your first recorded game. Spectated games can be added once there are some.
        </EmptyPanel>
      )}
      {data && !empty && <MetaBody data={data} />}
    </Page>
  );
}

type MetaData = NonNullable<ReturnType<typeof useMeta>["data"]>;

function MetaBody(props: { data: MetaData }) {
  const m = props.data.meta;
  const [role, setRole] = useState<string | null>(null);

  return (
    <>
      <section className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 xl:grid-cols-6">
        <StatTile label="Games" value={m.games} hint={`${m.opponentSeats} opponent seats`} />
        <StatTile label="Avg length" value={num1(m.avgRounds)} hint="rounds" />
        <StatTile label="First player" value={pct(m.firstPlayerWinRate)} hint="wins when going first" />
        <StatTile label="Precons" value={pct(m.preconShare)} hint="of opponents" />
        <StatTile label="Game Changers" value={num1(m.gameChangersPerSeat)} hint="per opponent, per game" />
        <StatTile label="Commanders" value={m.commanders.length} hint="different ones faced" />
      </section>

      <CommandersFaced commanders={m.commanders} />

      <div className="grid gap-3.5 lg:grid-cols-3">
        <Colours colors={m.colors} />
        <Brackets data={props.data} />
        <Interaction roles={m.rolesPerSeat} active={role} onPick={(r) => setRole(role === r ? null : r)} />
      </div>

      <CardsSeen cards={m.cards} role={role} onClearRole={() => setRole(null)} />

      <div className="grid gap-3.5 lg:grid-cols-3">
        <Combos combos={props.data.combosSeen} />
        <GameLength histogram={m.roundsHistogram} />
        <Eliminations rounds={m.eliminationRounds} />
      </div>
    </>
  );
}

function CommandersFaced(props: { commanders: MetaData["meta"]["commanders"] }) {
  const [all, setAll] = useState(false);
  const shown = all ? props.commanders : props.commanders.slice(0, 8);
  return (
    <Section title="Commanders you face">
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((c) => {
          const first = c.name.split(" + ")[0];
          return (
            <div key={c.name} className="overflow-hidden rounded-[14px] bg-card">
              <div className="relative h-[110px]">
                <img
                  src={artCrop(first)}
                  alt={first}
                  loading="lazy"
                  className="block size-full bg-muted object-cover object-[50%_17%]"
                />
                <span className="absolute top-2.5 right-2.5 rounded-lg bg-background/85 px-2 py-0.5 font-display text-[20px] font-bold">
                  {c.seats}×
                </span>
              </div>
              <div className="flex flex-col gap-1 px-3.5 pt-2.5 pb-3.5">
                <span className="font-semibold">
                  {c.name.split(" + ").map((n, i) => (
                    <span key={n}>
                      {i > 0 && " + "}
                      <CardName name={n} imageUri={i === 0 ? c.imageUri : undefined} className="no-underline" />
                    </span>
                  ))}
                </span>
                <span className="flex flex-wrap items-center gap-1 text-[12px] text-muted-foreground">
                  <ManaCost cost={c.identity ? c.identity.split("").map((x) => `{${x}}`).join("") : "{C}"} size="size-3" />
                  <span>
                    won {c.wins} of {c.seats} ·{" "}
                    {c.players.map((p, i) => (
                      <span key={p}>
                        {i > 0 && ", "}
                        <PlayerLink username={p} />
                      </span>
                    ))}
                  </span>
                </span>
                <span className="text-[12px]">
                  {c.myWins + c.myLosses === 0 ? (
                    <span className="text-muted-foreground">No decided game of yours against it yet</span>
                  ) : (
                    <>
                      You're{" "}
                      <RecordText
                        wins={c.myWins}
                        losses={c.myLosses}
                        className={cn(
                          "text-[14px]",
                          c.myWins > c.myLosses && "text-good",
                          c.myWins < c.myLosses && "text-bad",
                        )}
                      />{" "}
                      against it
                    </>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {props.commanders.length > 8 && (
        <button
          type="button"
          onClick={() => setAll(!all)}
          className="cursor-pointer self-start text-[13px] text-muted-foreground hover:text-foreground"
        >
          {all ? "Show the top 8 only" : `Show all ${props.commanders.length} commanders →`}
        </button>
      )}
    </Section>
  );
}

function Colours(props: { colors: { color: string; seats: number }[] }) {
  const max = Math.max(1, ...props.colors.map((c) => c.seats));
  return (
    <Section card title="Colours at the table" hint="opponent seats with each colour">
      <div className="flex flex-col gap-3">
        {props.colors.map((c) => {
          const sym = c.color === "W" || c.color === "U" || c.color === "B" || c.color === "R" || c.color === "G" ? c.color : null;
          return (
            <div key={c.color} className="flex items-center gap-2.5">
              {sym ? <ManaSymbol sym={sym} className="size-6" /> : <ManaCost cost="{C}" size="size-6" />}
              <div className="h-2 flex-1 overflow-hidden rounded bg-muted">
                <div
                  className={cn("h-full", !sym && "bg-muted-foreground")}
                  style={{ width: `${Math.round((c.seats / max) * 100)}%`, background: sym ? MANA_COLORS[sym] : undefined }}
                />
              </div>
              <span className="w-7 text-right font-display text-[16px] font-semibold">{c.seats}</span>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const BRACKET_STYLE: Record<string, string> = {
  "1": "bg-muted text-foreground",
  "2": "bg-muted-foreground/40 text-foreground",
  "3": "bg-move text-move-foreground",
  "4": "bg-warn text-warn-foreground",
  "5": "bg-bad text-bad-foreground",
  unknown: "bg-muted text-muted-foreground",
};

function Brackets(props: { data: MetaData }) {
  const m = props.data.meta;
  const total = m.brackets.reduce((a, b) => a + b.seats, 0);
  const lobby = Object.entries(props.data.lobby.roomBrackets).sort((a, b) => b[1] - a[1]);
  return (
    <Section card title="Brackets">
      {total === 0 ? (
        <span className="text-[13px] text-muted-foreground">No bracket estimate yet.</span>
      ) : (
        <div className="flex h-9 overflow-hidden rounded-lg">
          {m.brackets.map((b) => (
            <div
              key={b.bracket}
              title={`${b.seats} opponent deck${b.seats === 1 ? "" : "s"} ${b.bracket === "unknown" ? "with no estimate" : `in bracket ${b.bracket}`}`}
              className={cn(
                "flex min-w-0 items-center justify-center overflow-hidden text-[13px] font-semibold whitespace-nowrap",
                BRACKET_STYLE[b.bracket] ?? BRACKET_STYLE.unknown,
              )}
              style={{ flex: b.seats }}
            >
              {b.bracket === "unknown" ? "?" : `B${b.bracket}`} · {b.seats}
            </div>
          ))}
        </div>
      )}
      <span className="text-[12px] text-muted-foreground">
        EDHPlay's own estimate per deck.
        {m.preconShare !== null && ` ${pct(m.preconShare)} of opponents brought a precon.`}
      </span>
      {lobby.length > 0 && (
        <span className="text-[12px] text-muted-foreground">
          Public lobby names over {props.data.lobby.snapshots} snapshots:{" "}
          {lobby
            .map(([b, n]) => `${n} ${b === "unlabelled" ? "unlabelled" : b === "5" ? "cEDH or B5" : `B${b}`}`)
            .join(", ")}
          .
        </span>
      )}
    </Section>
  );
}

function Interaction(props: {
  roles: { role: string; perSeat: number }[];
  active: string | null;
  onPick: (role: string) => void;
}) {
  const max = Math.max(1, ...props.roles.map((r) => r.perSeat));
  return (
    <Section card title="Interaction per opponent">
      <span className="-mt-1 text-[12px] text-muted-foreground">
        Cards with each role shown per opponent, per game. Click a role to filter the card list.
      </span>
      {props.roles.length === 0 && (
        <span className="text-[13px] text-muted-foreground">No opponent cards recorded yet.</span>
      )}
      <div className="flex flex-col gap-0.5">
        {props.roles.map((r) => {
          const on = props.active === r.role;
          return (
            <button
              key={r.role}
              type="button"
              aria-pressed={on}
              onClick={() => props.onPick(r.role)}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1 text-[13px] font-medium",
                on ? "bg-foreground text-background" : "hover:bg-muted",
              )}
            >
              <span className="w-[82px] text-left">{ROLE_TEXT[r.role] ?? r.role}</span>
              <span className={cn("block h-2 flex-1 overflow-hidden rounded", on ? "bg-background/25" : "bg-muted")}>
                <span
                  className={cn("block h-full", on ? "bg-background" : "bg-muted-foreground")}
                  style={{ width: `${Math.round((r.perSeat / max) * 100)}%` }}
                />
              </span>
              <span className="w-[30px] text-right font-display text-[15px] font-semibold">{num1(r.perSeat)}</span>
            </button>
          );
        })}
      </div>
    </Section>
  );
}

type CardSort = "games" | "played" | "players";

function CardsSeen(props: { cards: MetaCard[]; role: string | null; onClearRole: () => void }) {
  const [sort, setSort] = useState<{ key: CardSort; dir: SortDir }>({ key: "games", dir: "desc" });
  const [limit, setLimit] = useState(30);
  const value = (c: MetaCard) => (sort.key === "players" ? c.players.length : c[sort.key]);
  const rows = props.cards
    .filter((c) => !props.role || c.roles.some((r) => r === props.role))
    .sort((a, b) => (sort.dir === "desc" ? value(b) - value(a) : value(a) - value(b)) || a.name.localeCompare(b.name));
  const header = (key: CardSort, label: string) => (
    <SortHeader
      label={label}
      active={sort.key === key}
      dir={sort.dir}
      className="text-right"
      onClick={() => setSort({ key, dir: sort.key === key && sort.dir === "desc" ? "asc" : "desc" })}
    />
  );

  return (
    <Section
      card
      title="Cards you see most"
      hint="opponent games each card was shown in, and played in"
      actions={
        props.role && (
          <Chip on tone="role" onClick={props.onClearRole} title="Clear the role filter">
            {ROLE_TEXT[props.role] ?? props.role}
          </Chip>
        )
      }
    >
      {rows.length === 0 ? (
        <span className="text-[13px] text-muted-foreground">
          {props.role ? "No card with that role has shown up yet." : "No opponent cards recorded yet."}
        </span>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse">
            <thead>
              <tr className="text-left text-[11px] tracking-[1px] text-muted-foreground uppercase">
                <th className="py-2 font-medium">Card</th>
                <th className="py-2 font-medium">Roles</th>
                {header("players", "Players")}
                {header("games", "Seen")}
                {header("played", "Played")}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, limit).map((c) => (
                <tr key={c.name} className="border-t border-border">
                  <td className="py-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={artCrop(c.name)}
                        alt=""
                        loading="lazy"
                        className="h-7 w-10 shrink-0 rounded bg-muted object-cover object-[50%_20%]"
                      />
                      <CardName name={c.name} imageUri={c.imageUri} className="font-medium" />
                      {c.gameChanger && (
                        <span
                          title="Game Changer"
                          className="rounded bg-warn/15 px-1.5 py-px text-[10px] font-bold text-warn"
                        >
                          GC
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 text-[13px] text-muted-foreground">
                    {c.roles.filter((r) => r !== "land").map((r) => ROLE_TEXT[r] ?? r).join(", ") || "–"}
                  </td>
                  <td className="py-2 text-right text-[13px] text-muted-foreground" title={c.players.join(", ")}>
                    {c.players.length}
                  </td>
                  <td className="py-2 text-right font-display text-[17px] font-semibold">{c.games}</td>
                  <td className="py-2 text-right font-display text-[17px] font-semibold">{c.played}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {rows.length > limit && (
        <button
          type="button"
          onClick={() => setLimit(limit + 50)}
          className="cursor-pointer self-start text-[13px] text-muted-foreground hover:text-foreground"
        >
          Show {Math.min(50, rows.length - limit)} more of {rows.length - limit} →
        </button>
      )}
    </Section>
  );
}

function Combos(props: { combos: MetaData["combosSeen"] }) {
  return (
    <section className="flex flex-col gap-2.5 rounded-2xl bg-bad/10 p-[18px]">
      <h2 className="font-display text-[20px] font-semibold tracking-[0.6px] text-bad uppercase">Combos assembled</h2>
      {props.combos.length === 0 && (
        <span className="text-[13px] text-muted-foreground">
          No opponent has shown every piece of a combo in one game yet.
        </span>
      )}
      {props.combos.map((c) => (
        <div key={c.combo.id} className="flex flex-col gap-0.5">
          <a
            href={`https://commanderspellbook.com/combo/${c.combo.id}`}
            target="_blank"
            rel="noreferrer"
            className="font-semibold hover:underline"
          >
            {c.combo.cards.join(" + ")}
          </a>
          <span className="text-[12px] text-muted-foreground">
            {c.combo.produces.join(", ")} · {c.games} game{c.games === 1 ? "" : "s"}, {c.players.join(", ")}
          </span>
        </div>
      ))}
    </section>
  );
}

/** Buckets `[value, count]` pairs from `from` up to `cap`, folding everything above into "cap+". */
function buckets(pairs: { at: number; n: number }[], from: number, cap: number) {
  if (pairs.length === 0) return [];
  const lo = Math.max(1, Math.min(from, ...pairs.map((p) => p.at)));
  const out: { label: string; n: number }[] = [];
  for (let at = lo; at <= cap; at++) {
    const n =
      at === cap
        ? pairs.filter((p) => p.at >= cap).reduce((a, p) => a + p.n, 0)
        : (pairs.find((p) => p.at === at)?.n ?? 0);
    out.push({ label: at === cap ? `${cap}+` : String(at), n });
  }
  return out;
}

function Histogram(props: { bars: { label: string; n: number }[]; tone: (bar: { label: string; n: number }) => string; unit: string }) {
  const max = Math.max(1, ...props.bars.map((b) => b.n));
  return (
    <div
      className="grid h-[110px] items-end gap-1.5"
      style={{ gridTemplateColumns: `repeat(${props.bars.length}, minmax(0, 1fr))` }}
    >
      {props.bars.map((b) => (
        <div key={b.label} className="flex h-full flex-col items-center justify-end gap-1" title={`${b.n} ${props.unit}`}>
          <div
            className={cn("w-full rounded-t-[3px]", props.tone(b))}
            style={{ height: `${b.n === 0 ? 2 : Math.max(4, (b.n / max) * 86)}px` }}
          />
          <span className="text-[11px] text-muted-foreground">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

function GameLength(props: { histogram: { rounds: number; games: number }[] }) {
  const bars = buckets(
    props.histogram.map((h) => ({ at: h.rounds, n: h.games })),
    4,
    11,
  );
  // The two most common lengths are drawn bright; the caption names them.
  const top = [...bars].sort((a, b) => b.n - a.n).filter((b) => b.n > 0).slice(0, 2);
  return (
    <Section card title="Game length">
      {bars.length === 0 ? (
        <span className="text-[13px] text-muted-foreground">No game with a round count yet.</span>
      ) : (
        <>
          <Histogram
            bars={bars}
            unit="games"
            tone={(b) => (top.some((t) => t === b) ? "bg-foreground/80" : "bg-muted")}
          />
          <span className="text-[12px] text-muted-foreground">
            Rounds per game.
            {top.length === 2 &&
              ` Most end in round ${top.map((t) => t.label).sort((a, b) => parseInt(a) - parseInt(b)).join(" or ")}.`}
            {top.length === 1 && ` Most end in round ${top[0].label}.`}
          </span>
        </>
      )}
    </Section>
  );
}

function Eliminations(props: { rounds: { round: number; players: number }[] }) {
  const bars = buckets(
    props.rounds.map((r) => ({ at: r.round, n: r.players })),
    3,
    10,
  );
  return (
    <Section card title="When players go out">
      {bars.length === 0 ? (
        <span className="text-[13px] text-muted-foreground">Nobody has been knocked out in a recorded game yet.</span>
      ) : (
        <>
          <Histogram bars={bars} unit="players" tone={() => "bg-bad"} />
          <span className="text-[12px] text-muted-foreground">The round each eliminated player went out.</span>
        </>
      )}
    </Section>
  );
}
