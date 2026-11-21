import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import type { GameRecord } from "@mtg/edhplay-games.ts";
import { Skeleton } from "~/components/ui/skeleton";
import { DecklistDrawer } from "~/edhplay/decks";
import { usePlayer, useSetPlayerNote } from "~/edhplay/queries";
import type { OpponentDeckView } from "~/edhplay/server";
import {
  BACK_LINK_CLASS,
  CardName,
  CommanderAvatar,
  ErrorPanel,
  NotFoundPanel,
  RecordText,
  ResultBadge,
  SectionTitle,
  agoLabel,
  artCrop,
  num1,
  whenLabel,
} from "~/edhplay/ui";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/players_/$username")({
  component: PlayerPage,
});

/** "Tezzeret" from "Tezzeret, Cruel Captain"; partners keep both. */
const shortName = (name: string) =>
  name
    .split(" + ")
    .map((n) => n.split(",")[0])
    .join(" + ");

function PlayerPage() {
  const params = Route.useParams();
  const query = usePlayer(params.username);
  const data = query.data;

  // The hero replaces the usual page title, so this page builds its own scaffold.
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-11 shrink-0 items-center gap-2 px-3">
        <SidebarTrigger />
        <Link to="/players" className={BACK_LINK_CLASS}>
          ← Players
        </Link>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-[22px] px-5 pt-2 pb-12" aria-busy={query.isPending || undefined}>
          {query.isPending && (
            <div className="flex flex-col gap-[22px]" aria-label={`Loading ${params.username}`}>
              <Skeleton className="h-[240px] rounded-[20px]" />
              <Skeleton className="h-[150px] rounded-2xl" />
              <div className="grid gap-5 lg:grid-cols-2">
                <Skeleton className="h-[220px] rounded-2xl" />
                <Skeleton className="h-[220px] rounded-2xl" />
              </div>
            </div>
          )}
          {query.error && (
            <ErrorPanel
              title={`Couldn't load ${params.username}`}
              error={query.error}
              onRetry={() => void query.refetch()}
            />
          )}
          {data === null && (
            <NotFoundPanel
              title="Player not found"
              link={<Link to="/players">Back to Players →</Link>}
            >
              There's no recorded game with {params.username} yet. They show up once you play or watch a game together.
            </NotFoundPanel>
          )}
          {data && <Dossier data={data} username={data.summary.username} />}
        </div>
      </div>
    </div>
  );
}

type PlayerData = NonNullable<NonNullable<ReturnType<typeof usePlayer>["data"]>>;

function Dossier(props: { data: PlayerData; username: string }) {
  const s = props.data.summary;
  const main = s.commanders[0]?.name;
  const tags = props.data.note?.tags ?? [];
  const decided = s.myWins + s.myLosses > 0;
  const firstMet = new Date(s.firstSeen).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "Europe/Bucharest",
  });

  return (
    <>
      <section className="relative h-[240px] overflow-hidden rounded-[20px] bg-card">
        {main && (
          <img
            src={artCrop(main.split(" + ")[0])}
            alt={main}
            className="block size-full object-cover object-[50%_22%]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/10" />
        <div className="absolute inset-7 flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="font-display text-[48px] leading-none font-bold uppercase">{props.username}</h1>
            <span className="text-foreground/80">
              First met {firstMet} · last seen {agoLabel(s.lastSeen)}
              {main && ` · usually plays ${shortName(main)}`}
            </span>
            {(tags.length > 0 || s.spectated > 0) && (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-[12px]">
                    {t}
                  </span>
                ))}
                {s.spectated > 0 && (
                  <span className="rounded-full bg-move/15 px-2.5 py-0.5 text-[12px] text-move">
                    watched {s.spectated}×
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-7">
            <div className="flex flex-col">
              {decided ? (
                <RecordText
                  wins={s.myWins}
                  losses={s.myLosses}
                  className={cn(
                    "text-[48px] leading-none",
                    s.myWins > s.myLosses && "text-good",
                    s.myWins < s.myLosses && "text-bad",
                  )}
                />
              ) : (
                <span className="font-display text-[48px] leading-none font-bold text-muted-foreground">–</span>
              )}
              <span className="text-[12px] text-muted-foreground">you vs them</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[48px] leading-none font-bold">{s.theirWins}</span>
              <span className="text-[12px] text-muted-foreground">games they won</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[48px] leading-none font-bold">
                {s.avgEliminationRound === null ? "–" : `R${num1(s.avgEliminationRound)}`}
              </span>
              <span className="text-[12px] text-muted-foreground">
                {s.avgEliminationRound === null ? "never knocked out yet" : "usually out by"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <Notes username={props.username} note={props.data.note} />

      <div className="flex flex-wrap gap-5">
        <TheirDecks data={props.data} />
        <TopCards cards={s.topCards} />
      </div>

      <GamesTogether games={props.data.games} username={props.username} />

      <Decklists decks={props.data.decks} username={props.username} hiddenWhileLive={props.data.hiddenWhileLive} />
    </>
  );
}

function Notes(props: { username: string; note: PlayerData["note"] }) {
  const save = useSetPlayerNote();
  const [note, setNote] = useState(props.note?.note ?? "");
  const [tags, setTags] = useState((props.note?.tags ?? []).join(", "));
  const savedAt = props.note?.updatedAt;

  // A note saved elsewhere (another tab) replaces the draft only when the stored one changes.
  useEffect(() => {
    setNote(props.note?.note ?? "");
    setTags((props.note?.tags ?? []).join(", "));
  }, [savedAt]); // eslint-disable-line react-hooks/exhaustive-deps

  // Editing after a save clears "Saved ✓" so the button never claims an unsaved draft is stored.
  const edit = (apply: () => void) => {
    apply();
    if (save.isSuccess || save.isError) save.reset();
  };

  return (
    <section className="flex flex-col gap-2.5 rounded-2xl bg-card px-5 py-[18px]">
      <div className="flex flex-wrap items-baseline gap-2.5">
        <SectionTitle className="text-[20px]">Your notes</SectionTitle>
        <span className="text-[12px] text-muted-foreground">
          private · shown in the side panel when you sit down with them
        </span>
      </div>
      <label htmlFor="player-note" className="sr-only">
        Note about {props.username}
      </label>
      <textarea
        id="player-note"
        value={note}
        onChange={(e) => edit(() => setNote(e.target.value))}
        rows={3}
        placeholder="What do you want to remember about this player?"
        className="resize-y rounded-[10px] border border-border bg-background px-3 py-2.5 text-[14px] leading-normal outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      />
      <div className="flex flex-wrap items-center gap-2.5">
        <label htmlFor="player-tags" className="text-[12px] text-muted-foreground">
          Tags
        </label>
        <input
          id="player-tags"
          value={tags}
          onChange={(e) => edit(() => setTags(e.target.value))}
          placeholder="combo, salty, fun"
          className="min-w-[200px] flex-1 rounded-[10px] border border-border bg-background px-3 py-2 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        />
        <button
          type="button"
          disabled={save.isPending}
          onClick={() =>
            save.mutate({
              username: props.username,
              note,
              tags: tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            })
          }
          className={cn(
            "inline-flex cursor-pointer items-center gap-2 rounded-[10px] px-[18px] py-[9px] text-[13px] font-semibold disabled:cursor-default",
            save.isSuccess ? "bg-good/15 text-good" : "bg-foreground text-background disabled:opacity-80",
          )}
        >
          {save.isPending && (
            <span
              aria-hidden
              className="size-3.5 animate-spin rounded-full border-2 border-background/40 border-t-background"
            />
          )}
          {save.isPending ? "Saving…" : save.isSuccess ? "Saved ✓" : "Save"}
        </button>
      </div>
      {save.isError && (
        <p role="alert" className="text-[12px] text-bad">
          The note didn't save. Check that the Workbench is still running, then try again.
        </p>
      )}
    </section>
  );
}

function TheirDecks(props: { data: PlayerData }) {
  const s = props.data.summary;
  // A deck's commanders: the saved list when there is one, else the seat that brought it.
  const commanderOf = (deckId: string): string | undefined => {
    const saved = props.data.decks.find((d) => d.deckId === deckId)?.commanders;
    if (saved && saved.length > 0) return saved.join(" + ");
    for (const r of props.data.games) {
      const seat = r.players.find((p) => p.deckId === deckId && p.commanders.length > 0);
      if (seat) return seat.commanders.map((c) => c.name).join(" + ");
    }
    return undefined;
  };

  return (
    <section className="flex min-w-0 flex-[1_1_520px] flex-col gap-3 rounded-2xl bg-card px-5 py-[18px]">
      <SectionTitle className="text-[20px]">Their decks</SectionTitle>
      {s.decks.length === 0 && (
        <span className="text-[13px] text-muted-foreground">
          EDHPlay didn't name a deck for them yet. Their commanders show up in the games below.
        </span>
      )}
      {s.decks.map((d) => {
        const commander = commanderOf(d.deckId);
        const meta = [
          d.bracket !== undefined ? `bracket ${d.bracket}` : undefined,
          d.precon ? "precon" : undefined,
        ].filter(Boolean);
        return (
          <div key={d.deckId} className="flex items-center gap-3 border-t border-border pt-2.5">
            {commander ? (
              <img
                src={artCrop(commander.split(" + ")[0])}
                alt={commander}
                loading="lazy"
                className="size-14 shrink-0 rounded-xl bg-muted object-cover object-[50%_18%]"
              />
            ) : (
              <span className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                ?
              </span>
            )}
            <div className="flex min-w-0 flex-col gap-0.5">
              <a
                href={`https://edhplay.com/decks/${d.deckId}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold hover:underline"
              >
                {d.deckName ?? "Unnamed deck"}
              </a>
              <span className="text-[12px] text-muted-foreground">
                {[commander ?? "Unknown commander", ...meta].join(" · ")}
              </span>
            </div>
            <span className="ml-auto font-display text-[22px] font-bold">{d.games}×</span>
          </div>
        );
      })}
    </section>
  );
}

function TopCards(props: { cards: PlayerData["summary"]["topCards"] }) {
  return (
    <section className="flex min-w-0 flex-[1_1_520px] flex-col gap-2.5 rounded-2xl bg-card px-5 py-[18px]">
      <div className="flex flex-wrap items-baseline gap-2.5">
        <SectionTitle className="text-[20px]">Cards they play most</SectionTitle>
        <span className="text-[12px] text-muted-foreground">games shown · games played</span>
      </div>
      {props.cards.length === 0 && (
        <span className="text-[13px] text-muted-foreground">No recorded game with card detail yet.</span>
      )}
      {props.cards.slice(0, 10).map((c) => (
        <div key={c.name} className="flex items-center gap-2.5">
          <img
            src={artCrop(c.name)}
            alt=""
            loading="lazy"
            className="h-7 w-10 shrink-0 rounded bg-muted object-cover object-[50%_20%]"
          />
          <CardName name={c.name} className="font-medium" />
          <span className="ml-auto text-[13px] whitespace-nowrap text-muted-foreground tabular-nums">
            {c.games} · {c.played}
          </span>
        </div>
      ))}
    </section>
  );
}

function GamesTogether(props: { games: GameRecord[]; username: string }) {
  return (
    <section className="flex flex-col gap-2.5">
      <SectionTitle>Games together</SectionTitle>
      {props.games.map((r) => {
        const them = r.players.find((p) => p.username.toLowerCase() === props.username.toLowerCase());
        const mine = r.players.find((p) => p.isMe);
        const theirs = r.inProgress
          ? "they're still playing"
          : them?.isWinner
            ? "they won"
            : them?.eliminatedRound !== undefined
              ? `they went out in round ${them.eliminatedRound}`
              : r.winner
                ? "they lost"
                : "no result";
        return (
          <Link
            key={r.id}
            to="/games/$id"
            params={{ id: r.id }}
            className="flex flex-wrap items-center gap-4 rounded-[14px] bg-card px-4 py-3 transition-transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            <ResultBadge result={r.result} live={r.inProgress} className="size-9 rounded-[10px] text-[18px]" />
            <span className="w-[130px] font-semibold">{whenLabel(r.startedAt)}</span>
            {r.mode === "spectator" ? (
              <span className="text-muted-foreground">You watched</span>
            ) : (
              <span className="flex items-center gap-2">
                <CommanderAvatar name={mine?.commanders[0]?.name} size={24} />
                You on {r.myDeck?.deckName ?? (mine?.commanders[0] ? shortName(mine.commanders[0].name) : "an unknown deck")}
              </span>
            )}
            <span className="flex items-center gap-2 text-muted-foreground">
              <CommanderAvatar name={them?.commanders[0]?.name} size={24} ring={them?.isWinner ? "won" : undefined} />
              {theirs}
            </span>
            <span className="ml-auto text-[12px] text-muted-foreground">{r.rounds ? `${r.rounds} rounds` : ""}</span>
          </Link>
        );
      })}
    </section>
  );
}

function Decklists(props: { decks: OpponentDeckView[]; username: string; hiddenWhileLive: boolean }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = props.decks.find((d) => d.deckId === openId);

  return (
    <section className="flex flex-col gap-2.5">
      <div className="flex flex-wrap items-baseline gap-2.5">
        <SectionTitle>Their decklists</SectionTitle>
        <span className="text-[12px] text-muted-foreground">saved after your games together</span>
      </div>
      {props.hiddenWhileLive && (
        <span className="rounded-[14px] bg-move/10 px-[18px] py-3.5 text-[13px]">
          You're in a game with {props.username} right now, so the deck they're playing stays hidden until the game
          ends.
        </span>
      )}
      {props.decks.length === 0 && !props.hiddenWhileLive && (
        <span className="rounded-[14px] bg-card px-[18px] py-3.5 text-[13px] text-muted-foreground">
          No decklist saved yet. Lens saves an opponent's public list once a game with them ends.
        </span>
      )}
      {props.decks.map((d) => {
        const cards = d.cards.reduce((a, c) => a + c.quantity, 0) + d.commanders.length;
        const combos = d.combos.included.length;
        const details = [
          `saved ${agoLabel(d.fetchedAt)}`,
          `${cards} cards`,
          d.bracket !== undefined ? `bracket ${d.bracket}` : undefined,
          combos > 0 ? `${combos} combo${combos === 1 ? "" : "s"}` : undefined,
        ].filter(Boolean);
        return (
          <div key={d.deckId} className="flex flex-wrap items-center gap-3 rounded-[14px] bg-card px-[18px] py-3.5">
            <CommanderAvatar name={d.commanders[0]} size={36} />
            <b>{d.name || "Unnamed deck"}</b>
            <span className="text-muted-foreground">{details.join(" · ")}</span>
            <div className="ml-auto flex gap-2">
              <a
                href={`https://edhplay.com/decks/${d.deckId}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-muted px-3 py-1.5 text-[12px]"
              >
                On EDHPlay ↗
              </a>
              <button
                type="button"
                onClick={() => setOpenId(d.deckId)}
                className="cursor-pointer rounded-lg bg-foreground px-3 py-1.5 text-[12px] font-semibold text-background"
              >
                Open decklist
              </button>
            </div>
          </div>
        );
      })}
      {open && (
        <DecklistDrawer
          deck={open}
          player={props.username}
          open
          onOpenChange={(o) => {
            if (!o) setOpenId(null);
          }}
        />
      )}
    </section>
  );
}
