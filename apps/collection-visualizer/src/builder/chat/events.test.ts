import { test, expect } from "bun:test";
import { applyEvent, initialChatState, type ChatState, type TranscriptEvent } from "./events";

const run = (events: TranscriptEvent[], start: ChatState = initialChatState): ChatState =>
  events.reduce((s, e) => applyEvent(s, e), start);

test("text deltas accumulate into one streaming assistant item, finalised by text-final", () => {
  const s = run([
    { kind: "user-text", id: "u1", text: "hi" },
    { kind: "turn-start", id: "t1" },
    { kind: "text-delta", id: "a1", text: "Hel" },
    { kind: "text-delta", id: "a1", text: "lo" },
    { kind: "text-final", id: "a1", text: "Hello" },
    { kind: "turn-end", id: "t1" },
  ]);
  expect(s.items).toEqual([
    { type: "user", id: "u1", text: "hi" },
    { type: "assistant", id: "a1", text: "Hello", streaming: false },
  ]);
  expect(s.busy).toEqual(false);
});

test("a replayed text-final with no deltas still creates the item; busy tracks turns", () => {
  const s = run([
    { kind: "turn-start", id: "t1" },
    { kind: "text-final", id: "a1", text: "Hello" },
  ]);
  expect(s.items).toEqual([{ type: "assistant", id: "a1", text: "Hello", streaming: false }]);
  expect(s.busy).toEqual(true);
});

test("a proposal sets pending; request-resolved clears it and records the outcome on the item", () => {
  const cs = { listId: "main", label: "x", author: "agent" as const, entries: [] };
  let s = run([{ kind: "tool-proposal", id: "p1", requestId: "r1", changeSet: cs }]);
  expect(s.pending).toEqual({ requestId: "r1", kind: "proposal" });
  expect(s.items[0]).toEqual({
    type: "proposal",
    id: "p1",
    requestId: "r1",
    changeSet: cs,
    status: "pending",
    outcome: null,
  });

  s = run([{ kind: "request-resolved", id: "x", requestId: "r1", outcome: { status: "applied", entries: [] } }], s);
  expect(s.pending).toEqual(null);
  expect(s.items[0]).toMatchObject({ status: "applied", outcome: { status: "applied" } });
});

test("pickers and questions follow the same pending protocol", () => {
  let s = run([{ kind: "tool-picker", id: "k1", requestId: "r2", title: "Pick", cards: [{ name: "A" }], mode: "one" }]);
  expect(s.pending).toEqual({ requestId: "r2", kind: "picker" });
  s = run([{ kind: "request-resolved", id: "x", requestId: "r2", outcome: { picks: { A: true } } }], s);
  expect(s.pending).toEqual(null);

  s = run(
    [
      {
        kind: "tool-question",
        id: "q1",
        requestId: "r3",
        questions: [{ question: "Q?", header: "H", options: [], multiSelect: false }],
      },
    ],
    s,
  );
  expect(s.pending).toEqual({ requestId: "r3", kind: "question" });
  s = run([{ kind: "request-resolved", id: "x", requestId: "r3", outcome: { answers: { "Q?": "yes" } } }], s);
  expect(s.pending).toEqual(null);
  expect(s.items[1]).toMatchObject({ type: "question", status: "answered", answers: { "Q?": "yes" } });
});

test("a dismissed outcome marks the item dismissed", () => {
  const cs = { listId: "main", label: "x", author: "agent" as const, entries: [] };
  const s = run([
    { kind: "tool-proposal", id: "p1", requestId: "r1", changeSet: cs },
    { kind: "request-resolved", id: "x", requestId: "r1", outcome: { status: "dismissed", reason: "no" } },
  ]);
  expect(s.items[0]).toMatchObject({ status: "dismissed" });
});

test("approvals, activity, cards, meta, notices and session info", () => {
  const s = run([
    { kind: "approval-request", id: "ap", requestId: "r9", tool: "Write", path: "decks/x/pdf.json", preview: "{}" },
    { kind: "approval-resolved", id: "y", requestId: "r9", decision: "allow" },
    { kind: "tool-activity", id: "t", label: "$ bun run card x" },
    { kind: "tool-cards", id: "c", title: "Options", cards: [{ name: "A", note: "n" }] },
    { kind: "tool-meta", id: "m", cards: [{ name: "A", tags: ["drain"] }] },
    { kind: "notice", id: "n", level: "error", text: "rate limit" },
    { kind: "session", id: "s", model: "claude-fable-5-1", effort: "high", sessionId: "abc" },
    { kind: "deck-changed", id: "d" },
  ]);
  expect(s.items.map((i) => i.type)).toEqual(["approval", "activity", "cards", "meta", "notice"]);
  expect(s.items[0]).toMatchObject({ decision: "allow" });
  expect(s.pending).toEqual(null);
  expect(s.session).toEqual({ model: "claude-fable-5-1", effort: "high", sessionId: "abc" });
});

test("hello replaces the whole state from the replayed events", () => {
  const s = applyEvent({ ...initialChatState, items: [{ type: "notice", id: "old", level: "info", text: "stale" }] }, {
    kind: "hello",
    events: [{ kind: "user-text", id: "u", text: "again" }],
  } as never);
  expect(s.items).toEqual([{ type: "user", id: "u", text: "again" }]);
});
