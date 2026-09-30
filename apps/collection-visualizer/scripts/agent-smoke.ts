#!/usr/bin/env bun
/**
 * Headless smoke test of the deck agent — no dev server, real Claude Code session on your login.
 *
 *   bun run agent:smoke            (from apps/collection-visualizer)
 *
 * Three checks, each one subscription turn: a plain reply, a non-blocking UI tool call, and the
 * blocking propose_changes round trip (the proposal is dismissed after a delay to prove nothing
 * times out while the UI would be waiting). Uses the chatterfang deck read-only — a dismissed
 * proposal writes nothing.
 */
import { DeckSession } from "../src/builder/server/agent/session";
import type { TranscriptEvent } from "../src/builder/chat/events";

const SLUG = process.argv[2] ?? "chatterfang";
const TURN_TIMEOUT_MS = 180_000;

const session = await DeckSession.create(SLUG);
const events: TranscriptEvent[] = [];
session.subscribe((ev) => {
  events.push(ev);
  if (ev.kind !== "text-delta")
    console.log(`  · ${ev.kind}${"text" in ev ? `: ${String(ev.text).slice(0, 80).replace(/\n/g, " ")}` : ""}`);
});

function waitFor(
  pred: (ev: TranscriptEvent) => boolean,
  label: string,
  timeoutMs = TURN_TIMEOUT_MS,
): Promise<TranscriptEvent> {
  return new Promise((resolve, reject) => {
    const already = events.find(pred);
    if (already) return resolve(already);

    const timer = setTimeout(() => {
      unsubscribe();
      reject(new Error(`timed out waiting for ${label}`));
    }, timeoutMs);
    const unsubscribe = session.subscribe((ev) => {
      if (pred(ev)) {
        clearTimeout(timer);
        unsubscribe();
        resolve(ev);
      }
    });
  });
}

const sinceIndex = () => events.length;
const after = (from: number, pred: (ev: TranscriptEvent) => boolean) => (ev: TranscriptEvent) =>
  events.indexOf(ev) >= from && pred(ev);

function pass(label: string): void {
  console.log(`PASS ${label}`);
}

await session.newConversation();
console.log(`deck: ${SLUG} — fresh conversation`);

// 1. Plain reply.
let mark = sinceIndex();
session.sendText("Reply with exactly the word PONG and nothing else. Do not use any tools.");
await waitFor(
  after(mark, (e) => e.kind === "turn-end"),
  "turn 1 end",
);
const pong = events.slice(mark).find((e) => e.kind === "text-final" && /PONG/.test(e.text));
if (!pong) throw new Error("no PONG in the reply");
pass("plain reply");

// 2. Non-blocking UI tool.
mark = sinceIndex();
session.sendText(
  "Call the mcp__deck-ui__show_cards tool once with a single card, Sol Ring, and then reply 'done'. Do not use any other tool.",
);
await waitFor(
  after(mark, (e) => e.kind === "tool-cards"),
  "show_cards event",
);
await waitFor(
  after(mark, (e) => e.kind === "turn-end"),
  "turn 2 end",
);
pass("show_cards rendered");

// 3. Blocking proposal, dismissed after a delay.
mark = sinceIndex();
session.sendText(
  'Using mcp__deck-ui__propose_changes, propose removing Sol Ring from the list with id "main", label "smoke test", and a one-line rationale. Do not read any files first. After the tool returns, reply with one sentence saying whether it was applied or dismissed.',
);
const proposal = await waitFor(
  after(mark, (e) => e.kind === "tool-proposal"),
  "tool-proposal event",
);
if (proposal.kind !== "tool-proposal") throw new Error("unreachable");
console.log(`  proposal ${proposal.requestId}: ${JSON.stringify(proposal.changeSet.entries)}`);
console.log("  waiting 8 s before dismissing, to prove the tool call holds…");
await new Promise((r) => setTimeout(r, 8_000));
const startedWait = Date.now();
if (!session.resolveRequest(proposal.requestId, { status: "dismissed", reason: "smoke test — nothing applied" })) {
  throw new Error("resolveRequest found no pending request");
}
await waitFor(
  after(mark, (e) => e.kind === "turn-end"),
  "turn 3 end",
);
const reply = events
  .slice(mark)
  .filter((e) => e.kind === "text-final")
  .map((e) => (e as { text: string }).text)
  .join("\n");
if (!/dismiss|declin|not applied|wasn.t applied|did not apply/i.test(reply)) {
  throw new Error(`the agent did not acknowledge the dismissal: ${reply}`);
}
pass(`propose_changes blocked, dismissed, acknowledged (${Date.now() - startedWait} ms from dismissal to turn end)`);

await session.newConversation();
console.log("all smoke checks passed");
process.exit(0);
