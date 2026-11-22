/** `bun run games`: the EDHPlay game records from the terminal, the same numbers the Workbench's
 *  Games, Meta and Players pages show. Deck-brain reads card performance from here.
 *
 *    bun run games                          recent games and the overall record
 *    bun run games deck <slug> [--playtests]  card performance and matchups per EDHPlay-linked list
 *    bun run games player <username>        history with one player
 *    bun run games status                   what is stored and where
 *    bun run games sync                     commit edhplay-data/, pull the other machine's games, push
 *
 *  Playtests are never mixed into real games: `deck --playtests` reads only playtests. */
import { listDeckSlugs, readDeck } from "./lib/deck-store.ts";
import { buildRecords, deckPerformance, overview, playerSummaries, type GameRecord, type LocalListRef } from "./lib/edhplay-games.ts";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { hostname } from "node:os";
import { join } from "node:path";
import { EDHPLAY_DIR, listCaptures, listMatches, loadParsedGames, mergeStoredJson, readProfile, type CaptureKind } from "./lib/edhplay-store.ts";

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
} else if (cmd === "sync") {
  await sync();
} else if (cmd === "merge-json") {
  // Git's merge driver for edhplay-data's JSON files (set up by `sync`): %A holds our side and
  // receives the result, %B is theirs. A non-zero exit leaves the conflict for a manual merge.
  const [ours, theirs] = process.argv.slice(3);
  const [ourText, theirText] = await Promise.all([readFile(ours, "utf8"), readFile(theirs, "utf8")]);
  const merged = mergeStoredJson(JSON.parse(ourText), JSON.parse(theirText));
  if (merged === null) {
    process.exit(1);
  }
  await writeFile(ours, JSON.stringify(merged, null, 2) + "\n");
} else {
  console.log("usage: bun run games [list | deck <slug> [--playtests] | player <username> | status | sync]");
}

/** edhplay-data/ is its own private repo (this one is public). Commits whatever the Workbench
 *  wrote, merges the other machine's games and pushes. `.jsonl` files merge as a union because
 *  they're append-only, and JSON files go through `merge-json`, so a sync never stops on a file
 *  both machines touched unless `mergeStoredJson` can't settle it. */
async function sync(): Promise<void> {
  if (!existsSync(join(EDHPLAY_DIR, ".git"))) {
    console.log(`${EDHPLAY_DIR} isn't a git repo yet. Clone the private data repo into it first:`);
    console.log("  gh repo clone JeffreyJoumjian/mtg-agent-data edhplay-data");
    process.exit(1);
  }

  const git = (...args: string[]) => {
    const r = Bun.spawnSync(["git", "-C", EDHPLAY_DIR, ...args], { stdout: "pipe", stderr: "pipe" });
    return { ok: r.exitCode === 0, out: r.stdout.toString().trim() + r.stderr.toString().trim() };
  };
  const must = (...args: string[]) => {
    const r = git(...args);
    if (!r.ok) {
      console.log(`git ${args.join(" ")} failed:\n${r.out}`);
      process.exit(1);
    }
    return r.out;
  };

  // The driver command holds this checkout's absolute path, so each machine sets its own.
  const script = join(import.meta.dir, "games.ts").replaceAll("\\", "/");
  must("config", "merge.edhplay-json.name", "edhplay-data JSON merge");
  must("config", "merge.edhplay-json.driver", `bun "${script}" merge-json %A %B`);

  must("add", "-A");
  const staged = git("diff", "--cached", "--quiet");
  if (!staged.ok) {
    must("commit", "-q", "-m", `Sync from ${hostname()}`);
  }

  const pulled = git("pull", "--no-rebase", "--no-edit", "-q");
  if (!pulled.ok) {
    console.log(`The pull hit a conflict that couldn't be merged automatically. Resolve it in ${EDHPLAY_DIR}, commit, then run this again.\n${pulled.out}`);
    process.exit(1);
  }
  must("push", "-q");
  console.log(`edhplay-data is in sync (${must("rev-parse", "--short", "HEAD")}).`);
}
