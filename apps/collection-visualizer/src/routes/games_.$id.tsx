import { useState, type ReactNode } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { CartesianGrid, Line, LineChart, ReferenceDot, ReferenceLine, XAxis, YAxis } from "recharts";
import type { CardSeen, ParsedGame, ParsedPlayer } from "@mtg/edhplay-parse.ts";
import type { GameRecord, GameResult, PlayerRecord } from "@mtg/edhplay-games.ts";
import type { Combo } from "@mtg/spellbook.ts";
import { Skeleton } from "~/components/ui/skeleton";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "~/components/ui/chart";
import { useGame, useGameCards, useGameCombos } from "~/edhplay/queries";
import { DecklistDrawer } from "~/edhplay/decks";
import type { OpponentDeckView } from "~/edhplay/server";
import {
  BACK_LINK_CLASS,
  CardImage,
  CardName,
  CommanderAvatar,
  ErrorPanel,
  NotFoundPanel,
  Page,
  PlayerLink,
  ROLE_TEXT,
  Section,
  SectionTitle,
  TestTag,
  artCrop,
  producesText,
  readKind,
  whenLabel,
  type Kind,
} from "~/edhplay/ui";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/games_/$id")({
  validateSearch: (search: Record<string, unknown>): { kind?: Kind } =>
    readKind(search) === "playtests" ? { kind: "playtests" } : {},
  component: GamePage,
});

/** One colour per seat, in seat order: the pilot's seat is drawn thicker, so the hues only need to
 *  tell seats apart. All are theme tokens, so both themes work. */
const SEAT_COLORS = ["var(--foreground)", "var(--move)", "var(--warn)", "var(--bad)", "var(--good)", "var(--muted-foreground)"];

type GameData = NonNullable<NonNullable<ReturnType<typeof useGame>["data"]>>;
type CardsQuery = ReturnType<typeof useGameCards>;
type CombosQuery = ReturnType<typeof useGameCombos>;

function GamePage() {
  const params = Route.useParams();
  const kind = readKind(Route.useSearch());
  const core = useGame(params.id, kind);
  const live = core.data?.record.inProgress === true;
  const cards = useGameCards(params.id, kind, live);
  const combos = useGameCombos(params.id, kind, live, core.data?.record.endedAt);

  const back = (
    <Link to="/games" search={kind === "playtests" ? { kind } : {}} className={BACK_LINK_CLASS}>
      ← {kind === "playtests" ? "Playtests" : "Games"}
    </Link>
  );

  if (core.isPending) {
    return (
      <Page title="Game" subtitle="Loading the game…" back={back} busy>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {["a", "b", "c", "d"].map((k) => (
            <Skeleton key={k} className="h-[240px] rounded-2xl" />
          ))}
        </div>
        <BuildingReport core={core} cards={cards} combos={combos} />
        <Skeleton className="h-[220px] rounded-2xl" />
      </Page>
    );
  }

  if (core.error) {
    return (
      <Page title="Game" back={back}>
        <ErrorPanel title="Couldn't load this game" error={core.error} onRetry={() => void core.refetch()} />
      </Page>
    );
  }

  if (!core.data) {
    return (
      <Page title="Game" back={back}>
        <NotFoundPanel
          title="Game not found"
          link={
            <Link to="/games" search={kind === "playtests" ? { kind } : {}}>
              Back to {kind === "playtests" ? "Playtests" : "Games"} →
            </Link>
          }
        >
          This game isn't in the records anymore. It may have been merged into another game after a reconnect.
        </NotFoundPanel>
      </Page>
    );
  }

  const data = core.data;
  return (
    <Page title={titleOf(data.record)} subtitle={subtitleOf(data)} back={back} actions={<ResultTag record={data.record} />}>
      <Report data={data} core={core} cards={cards} combos={combos} />
    </Page>
  );
}

// ---------------------------------------------------------------------------------------------
// Header text

function deckLabel(record: GameRecord): string | undefined {
  const d = record.myDeck;
  if (!d?.deckName) return undefined;
  // EDHPlay deck names often carry the list already ("[B4] The Scarlet Witch" for list B4).
  const named = d.listLabel !== undefined && d.deckName.toLowerCase().includes(d.listLabel.toLowerCase());
  return d.listId && d.listId !== "main" && d.listLabel && !named ? `${d.deckName} ${d.listLabel}` : d.deckName;
}

function titleOf(record: GameRecord): string {
  const when = record.inProgress ? "Now" : whenLabel(record.startedAt);
  if (record.mode === "spectator") return `${when} · Spectated`;
  if (record.mode === "solo") {
    const decks = record.players.map((p) => p.deckName ?? p.commanders[0]?.name).filter(Boolean);
    return `${when} · ${decks.join(" vs ") || "Playtest"}`;
  }
  const me = record.players.find((p) => p.isMe);
  return `${when} · ${deckLabel(record) ?? me?.commanders[0]?.name ?? "Your deck"}`;
}

function minutesText(sec: number): string {
  const m = Math.round(sec / 60);
  if (m >= 60) return `${Math.floor(m / 60)}h ${m % 60}m`;
  return `${m} minute${m === 1 ? "" : "s"}`;
}

function subtitleOf(data: GameData): string {
  const r = data.record;
  if (r.inProgress) {
    return [`round ${r.rounds || 1}`, `${minutesText(r.durationSec)} so far`, "updates every 20 seconds"].join(" · ");
  }

  const parts = [`${r.rounds} round${r.rounds === 1 ? "" : "s"}`];
  if (r.durationSec) parts.push(minutesText(r.durationSec));
  if (r.startingPlayer) {
    const first = r.players.find((p) => p.username.toLowerCase() === r.startingPlayer?.toLowerCase());
    parts.push(first?.isMe ? "you went first" : `${r.startingPlayer} went first`);
  }
  if (r.joinedMidGame && data.game) parts.push(`recorded from round ${data.game.firstRoundSeen}`);
  if (r.source === "both") parts.push("matched to EDHPlay's result");
  else if (r.source === "match") parts.push("from EDHPlay's match history");
  else if (r.mode === "solo") parts.push("solo playtest");
  else parts.push("recorded by Lens");
  return parts.join(" · ");
}

const TAG_TEXT: Record<GameResult, string> = {
  win: "WIN",
  loss: "LOSS",
  unknown: "NO RESULT",
  spectated: "SPECTATED",
  solo: "PLAYTEST",
};
const TAG_STYLE: Record<GameResult, string> = {
  win: "bg-good text-good-foreground",
  loss: "bg-bad text-bad-foreground",
  unknown: "bg-muted text-muted-foreground",
  spectated: "bg-move/15 text-move",
  solo: "bg-warn text-warn-foreground",
};

/** The big result pill at the right of the header. A game being played shows LIVE instead. */
function ResultTag(props: { record: GameRecord }) {
  const live = props.record.inProgress === true;
  return (
    <span
      className={cn(
        "rounded-xl px-[18px] py-1.5 font-display font-bold tracking-[1px]",
        live ? "bg-bad text-[20px] text-bad-foreground" : cn("text-[26px]", TAG_STYLE[props.record.result]),
      )}
    >
      {live ? "LIVE" : TAG_TEXT[props.record.result]}
    </span>
  );
}

// ---------------------------------------------------------------------------------------------
// The report

function Report(props: { data: GameData; core: ReturnType<typeof useGame>; cards: CardsQuery; combos: CombosQuery }) {
  const { record, game } = props.data;
  const live = record.inProgress === true;
  const roles = props.cards.data?.roles ?? {};
  const building = props.cards.isPending || props.combos.isPending;

  return (
    <>
      {live && (
        <Notice>This game is still being played. The report fills in as it goes. Opponents' decklists appear once it ends.</Notice>
      )}
      {record.mode === "solo" && (
        <div className="flex items-center gap-3 rounded-xl bg-warn/12 px-4 py-3 text-[13px]">
          <TestTag />
          This is a solo playtest. It's kept apart and never counts toward your record, the meta or anyone's history.
        </div>
      )}
      {record.joinedMidGame && game && (
        <Notice>
          Lens started recording in round {game.firstRoundSeen}, so the turns before that are missing from this report.
        </Notice>
      )}

      <Seats record={record} game={game} />

      {building && <BuildingReport core={props.core} cards={props.cards} combos={props.combos} />}
      {props.cards.error && (
        <ErrorPanel title="Couldn't look up the cards" error={props.cards.error} onRetry={() => void props.cards.refetch()}>
          The report is here, but card roles are missing. Try again, and if it keeps failing the details below say what
          went wrong.
        </ErrorPanel>
      )}
      {props.combos.error && (
        <ErrorPanel title="Couldn't check for combos" error={props.combos.error} onRetry={() => void props.combos.refetch()}>
          Combos and decklists are missing from this report. Try again, and if it keeps failing the details below say
          what went wrong.
        </ErrorPanel>
      )}

      {game ? (
        <>
          <LifeChart game={game} live={live} />
          <div className="flex flex-wrap gap-5">
            <Turns game={game} live={live} combos={props.combos.data?.combos} />
            <aside className="flex min-w-0 flex-[1_1_340px] flex-col gap-5">
              <CombosOnTable game={game} query={props.combos} />
              {record.mode === "player" && <StuckInHand game={game} />}
            </aside>
          </div>
          <EveryCardShown game={game} roles={roles} />
        </>
      ) : (
        <section className="flex flex-col items-start gap-2.5 rounded-2xl bg-card p-7">
          <SectionTitle>No turn-by-turn detail for this one</SectionTitle>
          <p className="max-w-[640px] leading-relaxed text-muted-foreground">
            This game was played before Lens was recording, so all that's known is EDHPlay's own result: who won, the
            decks, final life and mulligans. Games played with the extension running get the full report.
          </p>
        </section>
      )}

      {record.mode !== "solo" && <TheirDecks record={record} game={game} query={props.combos} />}
      {game && <Logs game={game} log={props.data.log} />}
    </>
  );
}

function Notice(props: { children: ReactNode }) {
  return <div className="rounded-xl bg-move/15 px-4 py-3 text-[14px]">{props.children}</div>;
}

/** The staged loading panel: one line per server stage, ticked as each one answers. */
function BuildingReport(props: { core: ReturnType<typeof useGame>; cards: CardsQuery; combos: CombosQuery }) {
  const game = props.core.data?.game;
  const events = game ? Object.values(game.eventCounts).reduce((a, n) => a + n, 0) : 0;
  const names = game ? new Set(game.players.flatMap((p) => Object.keys(p.cards))).size : 0;
  const stages = [
    {
      key: "core",
      done: !props.core.isPending,
      text: events > 0 ? `Reading ${events.toLocaleString("en-GB")} recorded events` : "Reading the recorded events",
    },
    {
      key: "cards",
      done: !props.cards.isPending,
      text: names > 0 ? `Looking up ${names} cards` : "Looking up the cards",
    },
    { key: "combos", done: !props.combos.isPending, text: "Checking Commander Spellbook for combos and decklists" },
  ];
  return (
    <section aria-busy="true" className="flex max-w-[520px] flex-col gap-3 rounded-2xl bg-card px-6 py-[22px]">
      <SectionTitle>Building the report</SectionTitle>
      {stages.map((s) => (
        <div key={s.key} className="flex items-center gap-2.5">
          {s.done ? (
            <span className="flex size-5 items-center justify-center rounded-full bg-good text-[12px] font-bold text-good-foreground">
              ✓
            </span>
          ) : (
            <span className="size-5 animate-spin rounded-full border-2 border-foreground border-r-transparent" />
          )}
          {s.text}
        </div>
      ))}
      <span className="text-[12px] text-muted-foreground">
        The first time a game opens this takes a few seconds. After that it's instant.
      </span>
    </section>
  );
}

// ---------------------------------------------------------------------------------------------
// Seats

function Seats(props: { record: GameRecord; game: ParsedGame | null }) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {props.record.players.map((p) => (
        <SeatCard
          key={p.username}
          player={p}
          record={props.record}
          game={props.game}
          parsed={props.game?.players.find((x) => x.username.toLowerCase() === p.username.toLowerCase())}
        />
      ))}
    </section>
  );
}

function SeatCard(props: { player: PlayerRecord; record: GameRecord; game: ParsedGame | null; parsed?: ParsedPlayer }) {
  const p = props.player;
  const gp = props.parsed;
  const live = props.record.inProgress === true;
  const commander = p.commanders[0]?.name;
  const tag = p.isWinner
    ? { text: "WINNER", style: "bg-good text-good-foreground" }
    : p.eliminatedRound !== undefined
      ? { text: `OUT · R${p.eliminatedRound}`, style: "bg-muted text-muted-foreground" }
      : undefined;
  const nameOf = (playerId: string) => props.game?.players.find((x) => x.playerId === playerId)?.username ?? "someone";
  const damage = Object.entries(gp?.commanderDamageTaken ?? {}).filter(([, n]) => n > 0);
  const deck = [
    p.isMe && props.record.mode === "player" ? (deckLabel(props.record) ?? p.deckName) : p.deckName,
    p.deckBracket !== undefined && `bracket ${p.deckBracket}`,
    p.deckIsPrecon && "precon",
  ].filter(Boolean);
  const life = gp?.finalLife ?? p.finalLife;

  return (
    <div className={cn("overflow-hidden rounded-2xl bg-card", p.isMe && "ring-2 ring-foreground ring-inset")}>
      <div className={cn("relative overflow-hidden", gp && !live ? "h-[170px]" : "h-[150px]")}>
        {commander ? (
          <img src={artCrop(commander)} alt={commander} className="block size-full object-cover object-[50%_17%]" />
        ) : (
          <div className="size-full bg-muted" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--card)_4%,transparent_60%)]" />
        {tag && (
          <span className={cn("absolute top-2.5 left-2.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-[0.6px]", tag.style)}>
            {tag.text}
          </span>
        )}
        <div className="absolute inset-x-3.5 bottom-2.5 flex items-end gap-2">
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[15px] font-semibold">
              {p.isMe ? `${p.username} (you)` : <PlayerLink username={p.username} />}
            </span>
            <span className="truncate text-[12px] text-muted-foreground">
              {p.commanders.length > 0 ? p.commanders.map((c) => c.name).join(" + ") : "Unknown commander"}
            </span>
          </div>
          <span className="ml-auto font-display text-[44px] leading-[0.9] font-bold tabular-nums">{life ?? "–"}</span>
        </div>
      </div>

      {gp && live && (
        <div className="px-3.5 py-2.5 text-[12px] text-muted-foreground">
          Hand {gp.handCount ?? "–"} · board {Object.values(gp.cards).filter((c) => c.onBattlefieldAtEnd).length} · lands{" "}
          {gp.landDrops.length} · tax {gp.commanderTax}
        </div>
      )}
      {gp && !live && (
        <div className="grid grid-cols-3 gap-x-1.5 gap-y-2 px-3.5 pt-2.5 pb-3.5">
          {[
            { k: "cards played", v: p.cardsPlayed ?? Object.values(gp.cards).filter((c) => c.timesPlayed > 0).length },
            { k: "land drops", v: gp.landDrops.length },
            { k: "commander casts", v: gp.commanderCasts },
            { k: "tokens", v: gp.tokensCreated },
            { k: "mulligans", v: p.mulligans ?? gp.mulligans },
            { k: "most permanents", v: gp.maxBattlefield },
          ].map((st) => (
            <div key={st.k} className="flex flex-col">
              <span className="font-display text-[20px] font-bold tabular-nums">{st.v}</span>
              <span className="text-[11px] text-muted-foreground">{st.k}</span>
            </div>
          ))}
        </div>
      )}

      <div className={cn("flex flex-col gap-1 px-3.5 pb-3 text-[12px] text-muted-foreground", !gp && "pt-2.5")}>
        <span>
          {deck.length > 0 ? deck.join(" · ") : p.deckId ? "Deck" : "Private deck"}
          {!gp && ` · ${p.mulligans ?? 0} mulligan${p.mulligans === 1 ? "" : "s"}`}
        </span>
        {damage.length > 0 && (
          <span>Commander damage taken: {damage.map(([from, n]) => `${n} from ${nameOf(from)}`).join(", ")}</span>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Life chart

function LifeChart(props: { game: ParsedGame; live: boolean }) {
  const players = props.game.players;
  const turns = props.game.turns;
  if (turns.length < 2) return null;

  const config: ChartConfig = {};
  players.forEach((p, i) => {
    config[`p${i}`] = { label: p.isMe ? "you" : p.username || `Seat ${i + 1}`, color: SEAT_COLORS[i % SEAT_COLORS.length] };
  });

  // One point per turn: each player's life at the end of that turn.
  const rows = turns.map((turn) => {
    const row: Record<string, number> = { seq: turn.seq };
    players.forEach((p, i) => {
      let life = p.startLife;
      for (const point of p.lifeTimeline) {
        if (point.seq > turn.seq) break;
        life = point.life;
      }
      row[`p${i}`] = life;
    });
    return row;
  });
  const roundOf: Record<number, number> = {};
  const roundTicks: number[] = [];
  for (const t of turns) {
    roundOf[t.seq] = t.round;
    if (!roundTicks.some((seq) => roundOf[seq] === t.round)) roundTicks.push(t.seq);
  }
  const top = Math.max(40, ...rows.flatMap((r) => players.map((_, i) => r[`p${i}`] ?? 0)));
  const outs = players
    .map((p, i) => ({ player: p, i }))
    .filter((x) => x.player.eliminatedSeq !== undefined && turns.some((t) => t.seq === x.player.eliminatedSeq));
  const lastSeq = turns[turns.length - 1].seq;

  return (
    <Section card title={props.live ? "Life so far" : "Life by turn"} hint={<Legend players={players} />}>
      <ChartContainer config={config} className="aspect-auto h-[220px] w-full">
        <LineChart data={rows} margin={{ left: 0, right: 16, top: 12, bottom: 4 }}>
          <CartesianGrid vertical={false} className="stroke-border" />
          <XAxis
            dataKey="seq"
            type="number"
            domain={["dataMin", "dataMax"]}
            ticks={roundTicks}
            tickFormatter={(seq: number) => `R${roundOf[seq] ?? ""}`}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} width={32} domain={[0, top]} ticks={[0, 20, 40].filter((n) => n <= top)} />
          <ChartTooltip
            content={<ChartTooltipContent labelFormatter={(_, payload) => `Round ${roundOf[Number(payload?.[0]?.payload?.seq)] ?? ""}`} />}
          />
          {players.map((p, i) => (
            <Line
              key={p.playerId}
              dataKey={`p${i}`}
              type="stepAfter"
              stroke={`var(--color-p${i})`}
              strokeWidth={p.isMe ? 3 : 2}
              dot={false}
              isAnimationActive={false}
            />
          ))}
          {outs.map((o) => (
            <ReferenceDot
              key={o.player.playerId}
              x={o.player.eliminatedSeq}
              y={0}
              r={5}
              fill={SEAT_COLORS[o.i % SEAT_COLORS.length]}
              stroke="none"
              label={{ value: `${o.player.isMe ? "you" : o.player.username} out`, position: "top", fontSize: 11, fill: SEAT_COLORS[o.i % SEAT_COLORS.length] }}
            />
          ))}
          {props.live && (
            <ReferenceLine
              x={lastSeq}
              stroke="var(--bad)"
              strokeDasharray="4 4"
              label={{ value: "now", position: "insideBottomRight", fontSize: 11, fill: "var(--bad)" }}
            />
          )}
        </LineChart>
      </ChartContainer>
    </Section>
  );
}

function Legend(props: { players: ParsedPlayer[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      {props.players.map((p, i) => (
        <span key={p.playerId} className="inline-flex items-center gap-1.5 text-[12px]">
          <span className="size-2.5 rounded-full" style={{ background: SEAT_COLORS[i % SEAT_COLORS.length] }} />
          {p.isMe ? "you" : p.username}
        </span>
      ))}
    </span>
  );
}

// ---------------------------------------------------------------------------------------------
// How it played out

const isLand = (card: CardSeen | undefined) => !!card && /\bLand\b/.test(card.typeLine);

/** Notes the data can back up, keyed by turn seq: a first commander cast, an elimination, and the
 *  turn the last piece of a combo was shown. */
function turnNotes(game: ParsedGame, combos: Record<string, { included: Combo[] }> | undefined): Record<number, string[]> {
  const notes: Record<number, string[]> = {};
  const add = (seq: number | undefined, text: string) => {
    if (seq === undefined || !game.turns.some((t) => t.seq === seq)) return;
    (notes[seq] ??= []).push(text);
  };
  const label = (p: ParsedPlayer | undefined) => (p?.isMe ? "you" : (p?.username ?? "someone"));
  const byId = (id: string | undefined) => game.players.find((p) => p.playerId === id);
  const activeOf = (seq: number) => game.turns.find((t) => t.seq === seq)?.playerId;

  for (const p of game.players) {
    const first = game.events.find((e) => e.kind === "play" && e.from === "command" && e.playerId === p.playerId);
    if (first) add(first.seq, activeOf(first.seq) === p.playerId ? "commander out" : `${label(p)}'s commander out`);
  }

  const outs: Record<number, string[]> = {};
  for (const e of game.events) {
    if (e.kind === "eliminated") (outs[e.seq] ??= []).push(label(byId(e.playerId)));
  }
  for (const [seq, names] of Object.entries(outs)) {
    const text = names.length === 1 && names[0] === "you" ? "you're out" : `${names.join(" and ")} out`;
    add(Number(seq), text);
  }

  for (const p of game.players) {
    for (const combo of combos?.[p.playerId]?.included ?? []) {
      const seqs = combo.cards.map((name) => p.cards[name]?.firstSeenSeq).filter((n): n is number => n !== undefined);
      if (seqs.length === 0) continue;
      const seq = Math.max(...seqs);
      add(seq, activeOf(seq) === p.playerId ? "combo assembled" : `${label(p)}: combo assembled`);
    }
  }
  return notes;
}

function Turns(props: { game: ParsedGame; live: boolean; combos: Record<string, { included: Combo[] }> | undefined }) {
  const game = props.game;
  const notes = turnNotes(game, props.combos);
  const byId = (id: string) => game.players.find((p) => p.playerId === id);

  return (
    <section className="flex min-w-0 flex-[999_1_640px] flex-col gap-1 rounded-2xl bg-card px-5 py-[18px]">
      <div className="mb-2 flex flex-wrap items-baseline gap-3">
        <SectionTitle>{props.live ? "How it's going" : "How it played out"}</SectionTitle>
        <span className="text-[12px] text-muted-foreground">everything played each turn, land drops included</span>
      </div>
      {game.turns.length === 0 && <span className="text-[13px] text-muted-foreground">No turn has been passed yet.</span>}
      {game.turns.map((t) => {
        const active = byId(t.playerId);
        const own = t.played[t.playerId] ?? [];
        const lands = own.filter((n) => isLand(active?.cards[n]));
        const spells = own.filter((n) => !isLand(active?.cards[n]));
        const others = Object.entries(t.played).filter(([pid, names]) => pid !== t.playerId && names.length > 0);
        const note = notes[t.seq]?.join(" · ");
        return (
          <div key={t.seq} className="flex items-center gap-3 border-t py-2">
            <span className="w-[34px] shrink-0 font-display text-[16px] font-semibold text-muted-foreground">R{t.round}</span>
            <CommanderAvatar name={active?.commanders[0]?.name} size={28} />
            <span className="w-[130px] shrink-0 truncate font-medium" title={active?.username}>{active?.isMe ? "You" : (active?.username ?? "?")}</span>
            <div className="flex min-w-0 flex-wrap gap-1.5">
              {lands.map((n, i) => (
                <span
                  // A land can be played twice in one turn (two basics), so its position keeps keys apart.
                  // eslint-disable-next-line react/no-array-index-key
                  key={`land-${n}-${i}`}
                  className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[13px] text-muted-foreground ring-1 ring-border ring-inset"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-good" aria-hidden>
                    <path d="M3 20h18L14 6l-4 7-2-3z" />
                  </svg>
                  <CardName name={n} imageUri={active?.cards[n]?.imageUri} className="no-underline" />
                </span>
              ))}
              {spells.map((n, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <span key={`spell-${n}-${i}`} className="rounded-md bg-muted px-2 py-0.5 text-[13px]">
                  <CardName name={n} imageUri={active?.cards[n]?.imageUri} className="no-underline" />
                </span>
              ))}
              {others.map(([pid, names]) => {
                const who = byId(pid);
                return names.map((n, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <span key={`${pid}-${n}-${i}`} className="rounded-md bg-muted/60 px-2 py-0.5 text-[13px] text-muted-foreground">
                    {who?.isMe ? "you" : who?.username}: <CardName name={n} imageUri={who?.cards[n]?.imageUri} className="no-underline" />
                  </span>
                ));
              })}
              {own.length === 0 && others.length === 0 && <span className="text-muted-foreground/70">Nothing cast</span>}
            </div>
            {note && <span className="ml-auto shrink-0 pl-2 text-right text-[12px] text-muted-foreground">{note}</span>}
          </div>
        );
      })}
    </section>
  );
}

// ---------------------------------------------------------------------------------------------
// Aside: combos and the pilot's hand

function CombosOnTable(props: { game: ParsedGame; query: CombosQuery }) {
  if (props.query.isPending) return <Skeleton className="h-[160px] rounded-2xl" />;
  if (!props.query.data) return null;

  const results = props.query.data.combos;
  const rows = props.game.players
    .map((p) => ({ player: p, result: results[p.playerId] }))
    .filter((r) => r.result && (r.result.included.length > 0 || r.result.almostIncluded.length > 0));
  const failed = props.game.players.some((p) => results[p.playerId]?.error);
  const label = (p: ParsedPlayer) => (p.isMe ? "You" : p.username);

  return (
    <section className={cn("flex flex-col gap-2 rounded-2xl px-[18px] py-4", rows.length > 0 ? "bg-bad/10" : "bg-card")}>
      <span className={cn("text-[12px] font-semibold tracking-[1px] uppercase", rows.length > 0 ? "text-bad" : "text-muted-foreground")}>
        Combos on the table
      </span>
      {rows.length === 0 && (
        <span className="text-[13px] text-muted-foreground">
          {failed
            ? "Commander Spellbook didn't answer, so combos aren't shown. They'll appear on the next visit."
            : "No known combo among the cards anyone showed."}
        </span>
      )}
      {rows.map(({ player, result }) => (
        <div key={player.playerId} className="flex flex-col gap-2">
          {result.included.map((c) => {
            const rounds = c.cards.map((n) => player.cards[n]?.firstSeenRound).filter((n): n is number => n !== undefined);
            return (
              <div key={c.id} className="flex flex-col gap-0.5">
                <a href={`https://commanderspellbook.com/combo/${c.id}`} target="_blank" rel="noreferrer" className="font-semibold hover:underline">
                  {label(player)}: {c.cards.join(" + ")}
                </a>
                <span className="text-[13px] text-muted-foreground">
                  {producesText(c.produces)}.
                  {rounds.length > 0 && ` All ${c.cards.length} pieces were shown by round ${Math.max(...rounds)}.`}
                </span>
              </div>
            );
          })}
          {result.almostIncluded.slice(0, 3).map((c) => (
            <div key={c.id} className="flex flex-col gap-0.5">
              <a href={`https://commanderspellbook.com/combo/${c.id}`} target="_blank" rel="noreferrer" className="font-semibold hover:underline">
                {label(player)}: {c.cards.filter((n) => !c.missing.includes(n)).join(" + ")}
              </a>
              <span className="text-[13px] text-muted-foreground">
                One card away: needs {c.missing.join(" or ")} for {producesText(c.produces).toLowerCase()}.
              </span>
            </div>
          ))}
          {result.almostIncluded.length > 3 && (
            <span className="text-[12px] text-muted-foreground">
              {result.almostIncluded.length - 3} more combos were one card away for {label(player).toLowerCase() === "you" ? "you" : label(player)}.
            </span>
          )}
        </div>
      ))}
    </section>
  );
}

/** What the pilot drew and never cast, the clearest sign of a dead card. */
function StuckInHand(props: { game: ParsedGame }) {
  const me = props.game.players.find((p) => p.isMe);
  if (!me) return null;
  const cards = Object.values(me.cards).filter((c) => !c.isToken);
  const stuck = cards.filter((c) => c.timesPlayed === 0 && c.timesPut === 0 && !c.zonesVisited.some((z) => z !== "hand"));
  const drawn = cards.filter((c) => c.drawnRounds.length > 0);

  return (
    <section className="flex flex-col gap-2.5 rounded-2xl bg-card px-[18px] py-4">
      <div className="flex items-baseline gap-2">
        <SectionTitle className="text-[20px]">Stuck in your hand</SectionTitle>
        <span className="text-[12px] text-muted-foreground">drawn, never cast</span>
      </div>
      {stuck.length === 0 ? (
        <span className="text-[13px] text-muted-foreground">Every card you held got played or moved somewhere.</span>
      ) : (
        <div className="flex flex-wrap gap-2.5">
          {stuck.map((c) => (
            <CardImage key={c.name} name={c.name} imageUri={c.imageUri} width={92} />
          ))}
        </div>
      )}
      <span className="text-[12px] text-muted-foreground">
        {drawn.length} card{drawn.length === 1 ? "" : "s"} drawn this game, {drawn.filter((c) => c.timesPlayed > 0).length} of
        them played.
      </span>
    </section>
  );
}

// ---------------------------------------------------------------------------------------------
// Every card shown

function EveryCardShown(props: { game: ParsedGame; roles: Record<string, string[]> }) {
  return (
    <Section card title="Every card shown" hint="played first, then cards only seen · hover a name for the card">
      <div className="grid gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        {props.game.players.map((p) => (
          <ShownColumn key={p.playerId} player={p} roles={props.roles} />
        ))}
      </div>
    </Section>
  );
}

function ShownColumn(props: { player: ParsedPlayer; roles: Record<string, string[]> }) {
  const p = props.player;
  const cards = Object.values(p.cards).sort(
    (a, b) =>
      Number(b.timesPlayed > 0) - Number(a.timesPlayed > 0) ||
      (a.playedRounds[0] ?? 0) - (b.playedRounds[0] ?? 0) ||
      a.firstSeenSeq - b.firstSeenSeq,
  );
  const played = cards.filter((c) => c.timesPlayed > 0);
  const counts: Record<string, number> = {};
  for (const c of played) {
    for (const r of props.roles[c.name] ?? []) {
      if (r !== "land") counts[r] = (counts[r] ?? 0) + 1;
    }
  }
  const summary = [
    `${played.length} played`,
    ...Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([r, n]) => `${n} ${(ROLE_TEXT[r] ?? r).toLowerCase()}`),
  ].join(" · ");
  const isCommander = (name: string) => p.commanders.some((c) => c.name === name);
  const roleOf = (c: CardSeen) => {
    if (isCommander(c.name)) return "Commander";
    if (c.isToken) return "Token";
    const r = (props.roles[c.name] ?? []).find((x) => x !== "land");
    if (r) return ROLE_TEXT[r] ?? r;
    return isLand(c) ? "Land" : undefined;
  };

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <span className="font-semibold">{p.isMe ? "You" : p.username}</span>
      <span className="text-[12px] text-muted-foreground">{summary}</span>
      {cards.length === 0 && <span className="text-[13px] text-muted-foreground">Nothing shown.</span>}
      {cards.map((c) => {
        const role = roleOf(c);
        return (
          <div key={c.name} className="flex items-center gap-2 text-[13px]">
            <span className="w-[26px] shrink-0 font-display text-[13px] font-semibold text-muted-foreground">
              {c.timesPlayed > 0 ? `R${c.playedRounds[0]}` : ""}
            </span>
            <CardName name={c.name} imageUri={c.imageUri} className={cn("truncate", c.timesPlayed === 0 && "text-muted-foreground")} />
            {role && <span className="ml-auto shrink-0 rounded bg-muted px-1.5 py-px text-[11px] text-muted-foreground">{role}</span>}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Their decks

function TheirDecks(props: { record: GameRecord; game: ParsedGame | null; query: CombosQuery }) {
  const opponents = props.record.players.filter((p) => !p.isMe);
  if (opponents.length === 0) return null;

  if (props.record.inProgress) {
    return (
      <section className="flex items-center gap-3 rounded-2xl bg-card px-5 py-4 text-muted-foreground">
        <SectionTitle className="text-[20px] text-foreground">Decklists</SectionTitle>
        Hidden until the game ends.
      </section>
    );
  }

  return (
    <Section
      title="Their decks"
      hint={
        props.game
          ? "what each opponent played this game · the full list opens beside the report"
          : "the full list opens beside the report"
      }
    >
      {opponents.map((p) => (
        <DeckRow
          key={p.username}
          player={p}
          parsed={props.game?.players.find((x) => x.username.toLowerCase() === p.username.toLowerCase())}
          deck={p.deckId ? props.query.data?.decks[p.deckId] : undefined}
          loading={props.query.isPending}
          failed={props.query.isError}
        />
      ))}
    </Section>
  );
}

function DeckRow(props: { player: PlayerRecord; parsed?: ParsedPlayer; deck: OpponentDeckView | null | undefined; loading: boolean; failed: boolean }) {
  const [open, setOpen] = useState(false);
  const p = props.player;
  const d = props.deck;
  const played = Object.values(props.parsed?.cards ?? {})
    .filter((c) => c.timesPlayed > 0 && !c.isToken && !isLand(c))
    .sort((a, b) => a.playedRounds[0] - b.playedRounds[0] || a.firstSeenSeq - b.firstSeenSeq);
  const total = d ? d.cards.reduce((a, c) => a + c.quantity, 0) + d.commanders.length : undefined;
  const bracket = d?.bracket ?? p.deckBracket;
  const meta = [
    total !== undefined && `${total} cards`,
    bracket !== undefined && `bracket ${bracket}`,
    (d?.isPrecon ?? p.deckIsPrecon) && "precon",
    d && d.combos.included.length > 0 && `${d.combos.included.length} ${d.combos.included.length === 1 ? "combo" : "combos"} in the list`,
    props.parsed && `${Object.values(props.parsed.cards).filter((c) => c.timesPlayed > 0 && !c.isToken).length} cards played`,
  ].filter(Boolean);

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-card px-4 py-3.5">
      <div className="flex flex-wrap items-center gap-3">
        <CommanderAvatar name={p.commanders[0]?.name} size={40} />
        <div className="flex min-w-0 flex-col">
          <span className="font-semibold">
            <PlayerLink username={p.username} /> · {d?.name || p.deckName || (p.deckId ? "Deck" : "Private deck")}
          </span>
          <span className="text-[12px] text-muted-foreground">
            {!p.deckId
              ? "Their deck is private, so EDHPlay didn't share the list."
              : props.loading
                ? "Loading the saved list…"
                : props.failed
                  ? "The saved list couldn't be loaded. Try again from the message above."
                  : !d
                  ? `Lens didn't save this list. ${meta.join(" · ")}`
                  : meta.join(" · ")}
          </span>
        </div>
        {p.deckId && (
          <div className="ml-auto flex gap-2">
            {d && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="cursor-pointer rounded-[10px] bg-foreground px-3.5 py-2 text-[13px] font-semibold text-background"
              >
                Open decklist
              </button>
            )}
            <a
              href={`https://edhplay.com/decks/${p.deckId}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-[10px] bg-muted px-3.5 py-2 text-[13px] font-medium hover:bg-accent"
            >
              On EDHPlay ↗
            </a>
          </div>
        )}
      </div>
      {props.parsed && (
        <div className="flex gap-2.5 overflow-x-auto pb-0.5">
          {played.length === 0 && <span className="text-[13px] text-muted-foreground">Nothing but lands played this game.</span>}
          {played.map((c) => (
            <div key={c.name} className="flex w-[104px] shrink-0 flex-col gap-1">
              <CardImage name={c.name} imageUri={c.imageUri} width={104} />
              <span className="text-[11px] text-muted-foreground">R{c.playedRounds[0]}</span>
            </div>
          ))}
        </div>
      )}
      {d && <DecklistDrawer deck={d} player={p.username} open={open} onOpenChange={setOpen} />}
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Logs

function Logs(props: { game: ParsedGame; log: GameData["log"] }) {
  const [tab, setTab] = useState<"chat" | "events" | "raw">("chat");
  const nameOf = (id: string) => {
    const p = props.game.players.find((x) => x.playerId === id);
    return p?.isMe ? "you" : (p?.username ?? "");
  };
  const events = props.log.filter((l) => l.channel === "event");
  const counts = Object.entries(props.game.eventCounts).sort((a, b) => b[1] - a[1]);
  const tabs = [
    { key: "chat" as const, label: `Chat · ${props.game.chat.length}` },
    { key: "events" as const, label: `Event log · ${events.length}` },
    { key: "raw" as const, label: `Raw events · ${counts.length} types` },
  ];

  return (
    <section className="flex flex-col gap-3 rounded-2xl bg-card px-5 py-[18px]">
      <div role="tablist" aria-label="Logs" className="flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "cursor-pointer rounded-full px-3.5 py-1.5 text-[13px]",
              tab === t.key ? "bg-foreground font-semibold text-background" : "bg-muted font-medium text-muted-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="max-h-[360px] overflow-y-auto text-[13px]">
        {tab === "chat" && (
          <div className="flex flex-col gap-1.5">
            {props.game.chat.length === 0 && <span className="text-muted-foreground">Nobody typed in chat.</span>}
            {props.game.chat.map((c) => (
              <span key={`${c.t}-${c.playerId}-${c.message}`}>
                <b>{nameOf(c.playerId)}</b> {c.message}
              </span>
            ))}
          </div>
        )}
        {tab === "events" && (
          <div className="flex flex-col gap-0.5 text-[12px]">
            {events.length === 0 && <span className="text-muted-foreground">No Event Log lines were recorded.</span>}
            {events.map((l) => (
              <span key={l.id}>
                <span className="text-muted-foreground">{nameOf(l.playerId) || "System"}:</span>{" "}
                {l.message.replace("{card}", l.cardName ?? "a card")}
              </span>
            ))}
          </div>
        )}
        {tab === "raw" && (
          <div className="grid grid-cols-2 gap-x-6 text-[12px] sm:grid-cols-3">
            {counts.map(([type, n]) => (
              <div key={type} className="flex justify-between gap-2">
                <span className="truncate text-muted-foreground">{type}</span>
                <span className="tabular-nums">{n}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
