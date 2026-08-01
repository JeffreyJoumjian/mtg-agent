import { describe, expect, test } from "bun:test";
import {
  applyEvent,
  applyWire,
  initialChatState,
  markSubmitted,
  type ChatState,
  type TranscriptEvent,
} from "./chat-events";

function fold(events: TranscriptEvent[], from: ChatState = initialChatState): ChatState {
  return events.reduce(applyEvent, from);
}

describe("applyEvent", () => {
  test("deltas accumulate then finalize; turn-end clears busy and streaming", () => {
    let s = fold([
      { kind: "turn-start", id: "t1" },
      { kind: "text-delta", id: "m1", text: "Hel" },
      { kind: "text-delta", id: "m1", text: "lo" },
    ]);
    expect(s.busy).toEqual(true);
    expect(s.items).toEqual([{ type: "assistant", id: "m1", text: "Hello", streaming: true }]);

    s = fold([{ kind: "text-final", id: "m1", text: "Hello!" }, { kind: "turn-end", id: "t1" }], s);
    expect(s.items).toEqual([{ type: "assistant", id: "m1", text: "Hello!", streaming: false }]);
    expect(s.busy).toEqual(false);
  });

  test("text-final for an unseen id appends (replayed transcripts have no deltas)", () => {
    const s = fold([{ kind: "text-final", id: "m9", text: "replayed" }]);
    expect(s.items).toEqual([{ type: "assistant", id: "m9", text: "replayed", streaming: false }]);
  });

  test("tally updates state without adding an item", () => {
    const tally = { keeps: 71, cuts: 20, pockets: 3, target: 99, gameChangers: 2 };
    const s = fold([{ kind: "tool-tally", id: "x", input: tally }]);
    expect(s.tally).toEqual(tally);
    expect(s.items).toEqual([]);
  });

  test("approval request then resolution", () => {
    let s = fold([
      { kind: "approval-request", id: "a1", requestId: "r1", tool: "Write", path: "/d/DECK.md", preview: "…" },
    ]);
    expect(s.items[0]).toEqual({
      type: "approval", id: "a1", requestId: "r1", tool: "Write", path: "/d/DECK.md", preview: "…", decision: null,
    });

    s = fold([{ kind: "approval-resolved", id: "a2", requestId: "r1", decision: "allow" }], s);
    expect(s.items[0].type === "approval" && s.items[0].decision).toEqual("allow");
  });

  test("user text, batch, activity, notice all append items", () => {
    const batch = { batchNumber: 1, cards: [{ name: "Sol Ring" }] };
    const s = fold([
      { kind: "user-text", id: "u1", text: "hi" },
      { kind: "tool-batch", id: "b1", input: batch },
      { kind: "tool-activity", id: "act1", label: "$ bun run card" },
      { kind: "notice", id: "n1", level: "error", text: "boom" },
    ]);
    expect(s.items.map((i) => i.type)).toEqual(["user", "batch", "activity", "notice"]);
    expect(s.items[1]).toEqual({ type: "batch", id: "b1", input: batch, submitted: false });
  });
});

describe("applyWire", () => {
  test("hello rebuilds from scratch — reconnect replay is idempotent", () => {
    const events: TranscriptEvent[] = [
      { kind: "user-text", id: "u1", text: "hi" },
      { kind: "text-final", id: "m1", text: "hello" },
    ];
    const once = applyWire(initialChatState, { kind: "hello", events });
    const twice = applyWire(once, { kind: "hello", events });
    expect(twice).toEqual(once);
    expect(twice.items.length).toEqual(2);
  });
});

describe("markSubmitted", () => {
  test("flips the batch flag", () => {
    const s = fold([{ kind: "tool-batch", id: "b1", input: { batchNumber: 1, cards: [{ name: "A" }] } }]);
    const marked = markSubmitted(s, "b1");
    expect(marked.items[0].type === "batch" && marked.items[0].submitted).toEqual(true);
  });
});
