import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { usePlayer, useSetPlayerNote } from "~/edhplay/queries";
import { DeckDetails } from "~/edhplay/decks";
import {
  CardName,
  Commanders,
  EmptyState,
  PageHeader,
  ResultBadge,
  Section,
  StatTile,
  formatDate,
  num1,
} from "~/edhplay/ui";

export const Route = createFileRoute("/players_/$username")({
  component: PlayerPage,
});

function PlayerPage() {
  const { username } = Route.useParams();
  const query = usePlayer(username);
  const data = query.data;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader
        title={username}
        subtitle={
          data
            ? `First seen ${formatDate(data.summary.firstSeen)} · last seen ${formatDate(data.summary.lastSeen)}`
            : undefined
        }
        back={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/players">
              <ArrowLeft /> Players
            </Link>
          </Button>
        }
      />
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
        {query.isPending && <p className="text-[13px] text-muted-foreground">Loading {username}…</p>}
        {query.error && <p className="text-[13px] text-bad">{String(query.error)}</p>}
        {query.data === null && <EmptyState>There's no recorded game with {username} yet.</EmptyState>}
        {data && <Dossier data={data} username={username} />}
      </div>
    </div>
  );
}

type PlayerData = NonNullable<NonNullable<ReturnType<typeof usePlayer>["data"]>>;

function Dossier(props: { data: PlayerData; username: string }) {
  const s = props.data.summary;
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] gap-3">
        <StatTile
          label="Games together"
          value={s.games}
          hint={s.spectated > 0 ? `plus ${s.spectated} watched` : undefined}
        />
        <StatTile label="You vs them" value={`${s.myWins}–${s.myLosses}`} hint="Your wins and losses at their table" />
        <StatTile label="Their wins" value={s.theirWins} />
        <StatTile
          label="Usually out by"
          value={s.avgEliminationRound === null ? "–" : `round ${num1(s.avgEliminationRound)}`}
        />
      </div>

      <Notes username={props.username} note={props.data.note} />

      <div className="grid gap-3 lg:grid-cols-2">
        <Section title="Commanders">
          <ul className="space-y-1 text-[13px]">
            {s.commanders.map((c) => (
              <li key={c.name} className="flex justify-between">
                <CardName name={c.name} imageUri={c.imageUri} />
                <span className="tabular-nums text-muted-foreground">{c.games}</span>
              </li>
            ))}
          </ul>
          {s.decks.length > 0 && (
            <div className="mt-3 space-y-0.5 text-[12px] text-muted-foreground">
              {s.decks.map((d) => (
                <div key={d.deckId}>
                  <a
                    href={`https://edhplay.com/decks/${d.deckId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {d.deckName ?? d.deckId}
                  </a>
                  {d.bracket !== undefined && ` · Bracket ${d.bracket}`}
                  {d.precon && " · precon"} · {d.games} games
                </div>
              ))}
            </div>
          )}
        </Section>
        <Section title="Cards they play most" hint="Games shown · games played">
          {s.topCards.length === 0 ? (
            <p className="text-[13px] text-muted-foreground">No recorded game with card detail yet.</p>
          ) : (
            <ul className="columns-2 gap-4 text-[13px]">
              {s.topCards.map((c) => (
                <li key={c.name} className="flex justify-between gap-2">
                  <CardName name={c.name} />
                  <span className="tabular-nums text-muted-foreground">
                    {c.games}·{c.played}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>

      <Section title="Games">
        <table className="w-full text-[13px]">
          <tbody>
            {props.data.games.map((r) => {
              const them = r.players.find((p) => p.username.toLowerCase() === props.username.toLowerCase());
              return (
                <tr key={r.id} className="border-t">
                  <td className="py-1.5 whitespace-nowrap">
                    <Link to="/games/$id" params={{ id: r.id }} className="hover:underline">
                      {formatDate(r.startedAt)}
                    </Link>
                  </td>
                  <td className="py-1.5">
                    <ResultBadge result={r.result} />
                  </td>
                  <td className="py-1.5">{them && <Commanders commanders={them.commanders} />}</td>
                  <td className="py-1.5 text-[12px] text-muted-foreground">
                    {them?.isWinner
                      ? "won"
                      : them?.eliminatedRound !== undefined
                        ? `out in round ${them.eliminatedRound}`
                        : ""}
                  </td>
                  <td className="py-1.5 text-right text-[12px] text-muted-foreground">{r.myDeck?.deckName ?? ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Section>

      {props.data.decks.length > 0 && (
        <Section title="Their decklists" hint="Public lists the extension saved after your games">
          <div className="space-y-2">
            {props.data.decks.map((d) => (
              <DeckDetails key={d.deckId} title={d.name || d.deckId} deck={d} />
            ))}
          </div>
        </Section>
      )}
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

  return (
    <Section
      title="Your notes"
      hint="Private, stored in edhplay-data/players.json. The live panel shows them at the table"
    >
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        placeholder="What do you want to remember about this player?"
        className="w-full rounded-md border bg-transparent p-2 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      />
      <div className="mt-2 flex items-center gap-2">
        <Input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags, comma separated (combo, salty, fun)"
          className="h-8 text-[13px]"
        />
        <Button
          size="sm"
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
        >
          {save.isPending ? "Saving…" : "Save"}
        </Button>
      </div>
      {save.error && (
        <p className="mt-1 text-[12px] text-bad">
          The note didn't save. Check that the Workbench is still running, then try again.
        </p>
      )}
    </Section>
  );
}
