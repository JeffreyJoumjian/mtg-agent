import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import type { CardSeen, ParsedGame, ParsedPlayer } from "@mtg/edhplay-parse.ts";
import type { PlayerRecord } from "@mtg/edhplay-games.ts";
import { Button } from "~/components/ui/button";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { useGame } from "~/edhplay/queries";
import { ComboList, DeckDetails } from "~/edhplay/decks";
import {
  CardName,
  Commanders,
  EmptyState,
  PageHeader,
  PlayerLink,
  ResultBadge,
  RoleTags,
  Section,
  formatDate,
  formatDuration,
  readKind,
  type Kind,
} from "~/edhplay/ui";

export const Route = createFileRoute("/games_/$id")({
  validateSearch: (search: Record<string, unknown>): { kind?: Kind } =>
    readKind(search) === "playtests" ? { kind: "playtests" } : {},
  component: GamePage,
});

/** One colour per seat: the pilot in the foreground colour, opponents in the app's status hues. */
const SEAT_COLORS = [
  "var(--primary)",
  "var(--move)",
  "var(--warn)",
  "var(--bad)",
  "var(--good)",
  "var(--muted-foreground)",
];

type GameData = NonNullable<NonNullable<ReturnType<typeof useGame>["data"]>>;

function GamePage() {
  const { id } = Route.useParams();
  const kind = readKind(Route.useSearch());
  const query = useGame(id, kind);
  const data = query.data;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader
        title={data ? formatDate(data.record.startedAt) : "Game"}
        subtitle={
          data
            ? `${data.record.rounds} rounds · ${formatDuration(data.record.durationSec)}${data.record.winner ? ` · ${data.record.winner} won` : ""}`
            : undefined
        }
        back={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/games" search={kind === "playtests" ? { kind } : {}}>
              <ArrowLeft /> {kind === "playtests" ? "Playtests" : "Games"}
            </Link>
          </Button>
        }
        actions={data && <ResultBadge result={data.record.result} />}
      />
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
        {query.isPending && <p className="text-[13px] text-muted-foreground">Loading the game…</p>}
        {query.error && <p className="text-[13px] text-bad">{String(query.error)}</p>}
        {query.data === null && <EmptyState>This game isn't in the records anymore.</EmptyState>}
        {data && <GameReport data={data} />}
      </div>
    </div>
  );
}

function GameReport(props: { data: GameData }) {
  const { record, game } = props.data;
  const seatColor = (username: string) =>
    SEAT_COLORS[
      Math.max(
        0,
        record.players.findIndex((p) => p.username === username),
      ) % SEAT_COLORS.length
    ];

  return (
    <>
      {record.inProgress && (
        <EmptyState>
          This game is still being played. The report fills in as it goes, and decklists appear once it ends.
        </EmptyState>
      )}
      {record.joinedMidGame && (
        <EmptyState>
          Lens started recording in round {game?.firstRoundSeen}, so earlier turns are missing from this game.
        </EmptyState>
      )}
      {!game && (
        <EmptyState>
          This game came from EDHPlay's match history only, so there's no turn-by-turn detail. Games played with the
          extension running get the full report.
        </EmptyState>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-3">
        {record.players.map((p) => (
          <PlayerCard key={p.username} player={p} game={game} color={seatColor(p.username)} data={props.data} />
        ))}
      </div>

      {game && (
        <>
          <LifeChart game={game} color={seatColor} />
          {record.mode !== "spectator" && <MyHand game={game} roles={props.data.roles} />}
          <Turns game={game} />
          <Revealed game={game} roles={props.data.roles} />
          <Combos game={game} combos={props.data.combos} />
        </>
      )}
      <Decklists data={props.data} />
      {game && <Logs game={game} log={props.data.log} />}
    </>
  );
}

function PlayerCard(props: { player: PlayerRecord; game: ParsedGame | null; color: string; data: GameData }) {
  const p = props.player;
  const gp = props.game?.players.find((x) => x.username === p.username);
  const nameOf = (playerId: string) => props.game?.players.find((x) => x.playerId === playerId)?.username ?? "someone";
  const damage = Object.entries(gp?.commanderDamageTaken ?? {}).filter(([, n]) => n > 0);

  return (
    <div className="rounded-lg border bg-card p-3 text-[13px]" style={{ borderLeft: `3px solid ${props.color}` }}>
      <div className="flex items-baseline gap-2">
        {p.isMe ? (
          <span className="font-semibold">{p.username} (you)</span>
        ) : (
          <PlayerLink username={p.username} className="font-semibold" />
        )}
        {p.isWinner && <span className="rounded bg-good px-1.5 text-[11px] text-good-foreground">Winner</span>}
        {p.eliminatedRound !== undefined && (
          <span className="text-[12px] text-muted-foreground">out in round {p.eliminatedRound}</span>
        )}
      </div>
      <div className="mt-1">
        <Commanders commanders={p.commanders} />
      </div>
      {p.deckId && (
        <div className="mt-1 text-[12px] text-muted-foreground">
          <a
            href={`https://edhplay.com/decks/${p.deckId}`}
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            {p.deckName ?? "Deck"}
          </a>
          {p.deckBracket !== undefined && ` · Bracket ${p.deckBracket}`}
          {p.deckIsPrecon && " · precon"}
        </div>
      )}
      <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-0.5 text-[12px]">
        <dt className="text-muted-foreground">Final life</dt>
        <dd className="text-right tabular-nums">{p.finalLife ?? "–"}</dd>
        <dt className="text-muted-foreground">Mulligans</dt>
        <dd className="text-right tabular-nums">{p.mulligans ?? "–"}</dd>
        {p.cardsPlayed !== undefined && (
          <>
            <dt className="text-muted-foreground">Cards played</dt>
            <dd className="text-right tabular-nums">{p.cardsPlayed}</dd>
            <dt className="text-muted-foreground">Cards seen</dt>
            <dd className="text-right tabular-nums">{p.cardsSeen}</dd>
            <dt className="text-muted-foreground">Land drops</dt>
            <dd className="text-right tabular-nums">{p.landDrops}</dd>
            <dt className="text-muted-foreground">Commander casts</dt>
            <dd className="text-right tabular-nums">{p.commanderCasts}</dd>
            <dt className="text-muted-foreground">Tokens made</dt>
            <dd className="text-right tabular-nums">{p.tokensCreated}</dd>
          </>
        )}
        {gp && (
          <>
            <dt className="text-muted-foreground">Lowest life</dt>
            <dd className="text-right tabular-nums">{gp.minLife}</dd>
            <dt className="text-muted-foreground">Most permanents</dt>
            <dd className="text-right tabular-nums">{gp.maxBattlefield}</dd>
            <dt className="text-muted-foreground">Chat lines</dt>
            <dd className="text-right tabular-nums">{gp.chatMessages}</dd>
          </>
        )}
      </dl>
      {damage.length > 0 && (
        <div className="mt-2 text-[12px] text-muted-foreground">
          Commander damage taken: {damage.map(([from, n]) => `${n} from ${nameOf(from)}`).join(", ")}
        </div>
      )}
    </div>
  );
}

function LifeChart(props: { game: ParsedGame; color: (username: string) => string }) {
  const players = props.game.players;
  const config: ChartConfig = {};
  players.forEach((p, i) => {
    config[`p${i}`] = { label: p.username || `Seat ${i + 1}`, color: props.color(p.username) };
  });

  // One point per turn: each player's life at the end of that turn.
  const rows = props.game.turns.map((turn) => {
    const row: Record<string, number | string> = { turn: `R${turn.round}·${turn.seq}` };
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

  if (rows.length < 2) return null;
  return (
    <Section title="Life by turn" hint="Round · turn number">
      <ChartContainer config={config} className="aspect-auto h-[220px] w-full">
        <LineChart data={rows} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
          <CartesianGrid vertical={false} className="stroke-border" />
          <XAxis dataKey="turn" tickLine={false} axisLine={false} tickMargin={8} minTickGap={24} />
          <YAxis tickLine={false} axisLine={false} width={32} domain={["auto", "auto"]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          {players.map((p, i) => (
            <Line
              key={p.playerId}
              dataKey={`p${i}`}
              type="stepAfter"
              stroke={`var(--color-p${i})`}
              strokeWidth={p.isMe ? 2.5 : 1.5}
              dot={false}
            />
          ))}
        </LineChart>
      </ChartContainer>
    </Section>
  );
}

/** The pilot's own cards: what they drew and never cast, the clearest sign of a dead card. */
function MyHand(props: { game: ParsedGame; roles: Record<string, string[]> }) {
  const me = props.game.players.find((p) => p.isMe);
  if (!me) return null;
  const cards = Object.values(me.cards).filter((c) => !c.isToken);
  const stuck = cards.filter(
    (c) => c.timesPlayed === 0 && c.timesPut === 0 && c.zonesVisited.every((z) => z === "hand"),
  );
  const drawn = cards.filter((c) => c.drawnRounds.length > 0);

  return (
    <Section title="Your hand" hint={`${drawn.length} cards drawn · ${stuck.length} never left your hand`}>
      {stuck.length === 0 ? (
        <p className="text-[13px] text-muted-foreground">Every card you held got played or moved somewhere.</p>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-1 text-[13px]">
          {stuck.map((c) => (
            <li key={c.name} className="flex items-center gap-2">
              <CardName name={c.name} imageUri={c.imageUri} />
              <RoleTags roles={props.roles[c.name]} />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

function Turns(props: { game: ParsedGame }) {
  const nameOf = (id: string) => props.game.players.find((p) => p.playerId === id)?.username ?? "?";
  const cardOf = (playerId: string, name: string): CardSeen | undefined =>
    props.game.players.find((p) => p.playerId === playerId)?.cards[name];
  return (
    <Section title="Turn by turn" hint="Cards played from hand or the command zone">
      <div className="max-h-[420px] overflow-y-auto">
        <table className="w-full text-[13px]">
          <tbody>
            {props.game.turns.map((t) => {
              const plays = Object.entries(t.played);
              return (
                <tr key={t.seq} className="border-t align-top">
                  <td className="w-16 py-1 text-[12px] text-muted-foreground whitespace-nowrap">Round {t.round}</td>
                  <td className="w-40 py-1 font-medium">{nameOf(t.playerId)}</td>
                  <td className="py-1">
                    {plays.length === 0 ? (
                      <span className="text-muted-foreground">Nothing played</span>
                    ) : (
                      plays.map(([pid, names]) => (
                        <div key={pid}>
                          {pid !== t.playerId && (
                            <span className="text-[12px] text-muted-foreground">{nameOf(pid)}: </span>
                          )}
                          {names.map((n, i) => (
                            <span key={`${n}-${i}`}>
                              {i > 0 && ", "}
                              <CardName name={n} imageUri={cardOf(pid, n)?.imageUri} />
                            </span>
                          ))}
                        </div>
                      ))
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function Revealed(props: { game: ParsedGame; roles: Record<string, string[]> }) {
  return (
    <Section title="Cards seen" hint="Everything each player showed, played cards first">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {props.game.players.map((p) => (
          <PlayerCards key={p.playerId} player={p} roles={props.roles} />
        ))}
      </div>
    </Section>
  );
}

function PlayerCards(props: { player: ParsedPlayer; roles: Record<string, string[]> }) {
  const cards = Object.values(props.player.cards).sort(
    (a, b) => b.timesPlayed - a.timesPlayed || a.firstSeenSeq - b.firstSeenSeq,
  );
  const roleCount: Record<string, number> = {};
  for (const c of cards) {
    for (const r of props.roles[c.name] ?? []) roleCount[r] = (roleCount[r] ?? 0) + 1;
  }
  return (
    <div className="text-[13px]">
      <div className="mb-1 font-medium">{props.player.username}</div>
      <div className="mb-1 text-[11px] text-muted-foreground">
        {Object.entries(roleCount)
          .filter(([r]) => r !== "land")
          .map(([r, n]) => `${n} ${r}`)
          .join(" · ") || "No roles tagged yet"}
      </div>
      <ul className="space-y-0.5">
        {cards.map((c) => (
          <li key={c.name} className="flex items-center gap-1.5">
            <span className="w-8 shrink-0 text-right text-[11px] tabular-nums text-muted-foreground">
              {c.timesPlayed > 0 ? `R${c.playedRounds[0]}` : ""}
            </span>
            <CardName
              name={c.name}
              imageUri={c.imageUri}
              className={c.timesPlayed > 0 ? "" : "text-muted-foreground"}
            />
            {c.isToken && <span className="text-[10px] text-muted-foreground">token</span>}
            <RoleTags roles={props.roles[c.name]} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Combos(props: { game: ParsedGame; combos: GameData["combos"] }) {
  const rows = props.game.players
    .map((p) => ({ player: p, result: props.combos[p.playerId] }))
    .filter((r) => r.result && (r.result.included.length > 0 || r.result.almostIncluded.length > 0));
  return (
    <Section title="Combos" hint="From Commander Spellbook, using only cards each player showed this game">
      {rows.length === 0 ? (
        <p className="text-[13px] text-muted-foreground">No known combo among the cards anyone showed.</p>
      ) : (
        <div className="space-y-3">
          {rows.map(({ player, result }) => (
            <div key={player.playerId}>
              <div className="mb-1 text-[13px] font-medium">{player.username}</div>
              {result.included.length > 0 && <ComboList combos={result.included} />}
              {result.almostIncluded.length > 0 && (
                <details className="mt-1">
                  <summary className="cursor-pointer text-[12px] text-muted-foreground">
                    One card away ({result.almostIncluded.length})
                  </summary>
                  <ComboList combos={result.almostIncluded} almost />
                </details>
              )}
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

/** Opponents' public lists, fetched by the extension after the game ended. */
function Decklists(props: { data: GameData }) {
  const decks = Object.values(props.data.decks).filter((d): d is NonNullable<typeof d> => d !== null);
  const owner = (deckId: string) => props.data.record.players.find((p) => p.deckId === deckId);
  if (decks.length === 0) return null;
  return (
    <Section title="Decklists" hint="Public lists, fetched after the game. Cards played this game are bold">
      <div className="space-y-2">
        {decks.map((d) => {
          const p = owner(d.deckId);
          return (
            <DeckDetails
              key={d.deckId}
              title={`${p?.isMe ? "Your deck" : (p?.username ?? "Unknown")} · ${d.name}`}
              deck={d}
            />
          );
        })}
      </div>
    </Section>
  );
}

function Logs(props: { game: ParsedGame; log: GameData["log"] }) {
  const nameOf = (id: string) => props.game.players.find((p) => p.playerId === id)?.username ?? "";
  const counts = Object.entries(props.game.eventCounts).sort((a, b) => b[1] - a[1]);
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <Section title="Chat" hint={`${props.game.chat.length} lines`}>
        <div className="max-h-[300px] space-y-0.5 overflow-y-auto text-[13px]">
          {props.game.chat.length === 0 && <p className="text-muted-foreground">Nobody typed in chat.</p>}
          {props.game.chat.map((c, i) => (
            <div key={i}>
              <span className="font-medium">{nameOf(c.playerId)}:</span> {c.message}
            </div>
          ))}
        </div>
      </Section>
      <Section title="Event log" hint={`${props.log.length} lines from EDHPlay`}>
        <div className="max-h-[300px] space-y-0.5 overflow-y-auto text-[12px]">
          {props.log.length === 0 && <p className="text-muted-foreground">No Event Log lines were recorded.</p>}
          {props.log
            .filter((l) => l.channel === "event")
            .map((l) => (
              <div key={l.id}>
                <span className="text-muted-foreground">{nameOf(l.playerId) || "System"}:</span>{" "}
                {l.message.replace("{card}", l.cardName ?? "a card")}
              </div>
            ))}
        </div>
      </Section>
      <Section title="Raw events" hint="Every message type the game sent">
        <div className="grid grid-cols-2 gap-x-3 text-[12px]">
          {counts.map(([type, n]) => (
            <div key={type} className="flex justify-between">
              <span className="truncate text-muted-foreground">{type}</span>
              <span className="tabular-nums">{n}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
