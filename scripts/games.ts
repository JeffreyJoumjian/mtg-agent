/** `bun run games`: the EDHPlay game records from the terminal, the same numbers the Workbench's
 *  Games, Meta and Players pages show. Deck-brain reads card performance from here.
 *
 *    bun run games                          recent games and the overall record
 *    bun run games deck <slug> [--playtests]  card performance and matchups per EDHPlay-linked list
 *    bun run games player <username>        history with one player
 *    bun run games status                   what is stored and where
 *
 *  Playtests are never mixed into real games: `deck --playtests` reads only playtests. */
import { listDeckSlugs, readDeck } from "./lib/deck-store.ts";
import { buildRecords, deckPerformance, overview, playerSummaries, type GameRecord, type LocalListRef } from "./lib/edhplay-games.ts";
import { EDHPLAY_DIR, listCaptures, listMatches, loadParsedGames, readProfile, type CaptureKind } from "./lib/edhplay-store.ts";

async function lists(): Promise<LocalListRef[]> {
  const out: LocalListRef[] = [];
  for (const slug of await listDeckSlugs()) {
    const deck = await readDeck(slug).catch(() => null);
    for (const [listId, list] of Object.entries(deck?.lists ?? {})) {
      if (deck && list.edhplay) {
        out.push({ slug, deckName: deck.name, listId, label: list.label, edhplayId: list.edhplay, cards: list.sections.flatMap((s) => s.cards.map((c) => c.name)) });
      }
    }
  }
  return out;
}

async function load(kind: CaptureKind) {
  const [captures, matches, profile, localLists] = await Promise.all([loadParsedGames(kind), listMatches(), readProfile(), lists()]);
  const built = buildRecords({ captures, matches: kind === "games" ? matches.map((m) => m.match) : [], me: profile?.username, lists: localLists });
  return { ...built, lists: localLists };
}

const pct = (v: number | null) => (v === null ? "–" : `${Math.round(v * 100)}%`);
const date = (t: number) => new Date(t).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Bucharest" });
const opponents = (r: GameRecord) => r.players.filter((p) => !p.isMe).map((p) => `${p.commanders.map((c) => c.name).join(" + ") || "?"} (${p.username})`).join(", ");

const [cmd, arg] = process.argv.slice(2);
const playtests = process.argv.includes("--playtests");

if (!cmd || cmd === "list") {
  const { records } = await load("games");
  const o = overview(records);
  console.log(`Record ${o.record.wins}-${o.record.losses} (${pct(o.record.winRate)}), ${o.record.unknown} undecided, ${o.spectated} spectated, ${o.captured} recorded by Lens, ${o.matchOnly} from EDHPlay history only.`);
  for (const r of records.slice(0, 20)) {
    console.log(`${date(r.startedAt)}  ${r.result.padEnd(9)} ${String(r.rounds).padStart(2)}r  ${r.myDeck?.deckName ?? (r.mode === "spectator" ? "(spectated)" : "?")}  vs ${opponents(r)}`);
  }
} else if (cmd === "deck" && arg) {
  const { records, parsed, lists: all } = await load(playtests ? "playtests" : "games");
  const mine = all.filter((l) => l.slug === arg);
  if (mine.length === 0) {
    console.log(`No list of ${arg} is linked to EDHPlay, so its games can't be matched.`);
  }
  for (const list of mine) {
    const p = deckPerformance(list.edhplayId, records, parsed, list, playtests ? "solo" : "player");
    console.log(`\n${list.deckName} / ${list.label}: ${p.record.games} ${playtests ? "playtests" : "games"}, ${p.capturedGames} with card detail${playtests ? "" : `, record ${p.record.wins}-${p.record.losses} (${pct(p.record.winRate)})`}`);
    console.log(`Commander out by round ${p.commander.avgFirstCastRound?.toFixed(1) ?? "–"}, mulligans ${p.avgMulligans?.toFixed(1) ?? "–"} per game`);
    console.log("card | seen | drawn | played | first round | win% played | win% not");
    for (const c of p.cards.filter((x) => x.inList)) {
      console.log(`${c.name} | ${c.seen} | ${c.drawn} | ${c.played} | ${c.avgFirstPlayRound?.toFixed(1) ?? "–"} | ${pct(c.winRateWhenPlayed)} | ${pct(c.winRateWhenNotPlayed)}${c.neverPlayed ? " | NEVER PLAYED" : ""}`);
    }
    if (p.matchups.length > 0) {
      console.log("matchups: " + p.matchups.map((m) => `${m.commander} ${m.record.wins}-${m.record.losses}`).join(", "));
    }
  }
} else if (cmd === "player" && arg) {
  const { records, parsed } = await load("games");
  const s = playerSummaries(records, parsed).find((x) => x.username.toLowerCase() === arg.toLowerCase());
  if (!s) {
    console.log(`No recorded game with ${arg}.`);
  } else {
    console.log(`${s.username}: ${s.games} games together, you're ${s.myWins}-${s.myLosses}, they won ${s.theirWins}. Last seen ${date(s.lastSeen)}.`);
    console.log("Commanders: " + s.commanders.map((c) => `${c.name} ×${c.games}`).join(", "));
    console.log("Cards shown most: " + s.topCards.slice(0, 15).map((c) => c.name).join(", "));
  }
} else if (cmd === "status") {
  const [g, t, m] = await Promise.all([listCaptures("games"), listCaptures("playtests"), listMatches()]);
  console.log(`${EDHPLAY_DIR}: ${g.length} game captures, ${t.length} playtests, ${m.length} EDHPlay matches.`);
} else {
  console.log("usage: bun run games [list | deck <slug> [--playtests] | player <username> | status]");
}
