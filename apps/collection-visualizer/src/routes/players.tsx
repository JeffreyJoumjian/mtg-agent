import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Input } from "~/components/ui/input";
import { usePlayers } from "~/edhplay/queries";
import { CardName, EmptyState, PageHeader, PlayerLink, Section, formatDate, num1 } from "~/edhplay/ui";

export const Route = createFileRoute("/players")({
  component: PlayersPage,
});

function PlayersPage() {
  const query = usePlayers();
  const [filter, setFilter] = useState("");
  const players = (query.data?.players ?? []).filter(
    (p) =>
      !filter ||
      p.username.toLowerCase().includes(filter.toLowerCase()) ||
      p.commanders.some((c) => c.name.toLowerCase().includes(filter.toLowerCase())),
  );

  return (
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader
        title="Players"
        subtitle={query.data ? `${query.data.players.length} players met on EDHPlay` : undefined}
        actions={
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Find a player or commander"
            className="h-8 w-64 text-[13px]"
          />
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {query.isPending && <p className="text-[13px] text-muted-foreground">Loading players…</p>}
        {query.error && <p className="text-[13px] text-bad">{String(query.error)}</p>}
        {query.data && query.data.players.length === 0 && (
          <EmptyState>
            Nobody yet. Players show up here after your first recorded game or the first match history sync.
          </EmptyState>
        )}
        {players.length > 0 && (
          <Section title="Everyone you've played with or watched">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-[13px]">
                <thead className="text-left text-[12px] text-muted-foreground">
                  <tr>
                    <th className="py-1 font-normal">Player</th>
                    <th className="py-1 font-normal">Commanders</th>
                    <th className="py-1 text-right font-normal">Games</th>
                    <th className="py-1 text-right font-normal">You vs them</th>
                    <th className="py-1 text-right font-normal">Their wins</th>
                    <th className="py-1 text-right font-normal">Out by round</th>
                    <th className="py-1 text-right font-normal">Last seen</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((p) => {
                    const note = query.data?.notes[p.username.toLowerCase()];
                    return (
                      <tr key={p.username} className="border-t align-top">
                        <td className="py-1.5">
                          <PlayerLink username={p.username} className="font-medium" />
                          {note?.tags.map((t) => (
                            <span key={t} className="ml-1 rounded bg-muted px-1 text-[10px] text-muted-foreground">
                              {t}
                            </span>
                          ))}
                          {p.spectated > 0 && (
                            <div className="text-[11px] text-muted-foreground">watched {p.spectated}×</div>
                          )}
                        </td>
                        <td className="py-1.5">
                          {p.commanders.slice(0, 3).map((c) => (
                            <div key={c.name}>
                              <CardName name={c.name} imageUri={c.imageUri} />
                              {c.games > 1 && (
                                <span className="ml-1 text-[11px] text-muted-foreground">×{c.games}</span>
                              )}
                            </div>
                          ))}
                        </td>
                        <td className="py-1.5 text-right tabular-nums">{p.games}</td>
                        <td className="py-1.5 text-right tabular-nums">
                          {p.myWins}–{p.myLosses}
                        </td>
                        <td className="py-1.5 text-right tabular-nums">{p.theirWins}</td>
                        <td className="py-1.5 text-right tabular-nums">{num1(p.avgEliminationRound)}</td>
                        <td className="py-1.5 text-right text-[12px] text-muted-foreground whitespace-nowrap">
                          {formatDate(p.lastSeen)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}
