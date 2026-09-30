import { test, expect, beforeEach, afterEach } from "bun:test";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DeckSession, type SessionDeps } from "./session";
import type { TranscriptEvent } from "../../chat/events";

let dataDir = "";

/** A query() stand-in: never yields SDK messages on its own, ends when `close()` is called, and
 *  exposes what it was given so the test can drive `canUseTool`, the in-process tools and the
 *  prompt stream exactly as the CLI would. */
function fakeQuery() {
  const captured: { options: any; prompt: AsyncGenerator<any> | null; starts: number } = {
    options: null,
    prompt: null,
    starts: 0,
  };
  const q: SessionDeps["query"] = (params: any) => {
    captured.options = params.options;
    captured.prompt = params.prompt;
    captured.starts += 1;
    let end!: () => void;
    const closed = new Promise<void>((resolve) => {
      end = resolve;
    });
    const handle = {
      async *[Symbol.asyncIterator]() {
        await closed;
      },
      interrupt: async () => undefined,
      setModel: async () => undefined,
      close: () => end(),
    };
    return handle as any;
  };
  return { q, captured };
}

beforeEach(async () => {
  dataDir = await mkdtemp(join(tmpdir(), "agent-session-"));
});

afterEach(async () => {
  // Let fire-and-forget transcript appends land before the directory disappears.
  await new Promise((r) => setTimeout(r, 30));
  await rm(dataDir, { recursive: true, force: true });
});

const waitFor = async (pred: () => boolean, ms = 1000) => {
  const until = Date.now() + ms;
  while (!pred() && Date.now() < until) await new Promise((r) => setTimeout(r, 10));
  expect(pred()).toEqual(true);
};

const deps = (q: SessionDeps["query"]): SessionDeps => ({ query: q, dataDir, loadPrompt: async () => "prompt" });

test("propose_changes blocks until the user acts; typing instead dismisses it and the text is still delivered", async () => {
  const { q, captured } = fakeQuery();
  const session = await DeckSession.create("chatterfang", deps(q));
  const seen: TranscriptEvent[] = [];
  session.subscribe((ev) => seen.push(ev));

  session.sendText("propose something");
  await waitFor(() => captured.options !== null);

  const changeSet = {
    listId: "main",
    label: "swap",
    author: "agent" as const,
    entries: [{ op: "remove" as const, name: "Sol Ring" }],
  };
  const resultPromise = session.__testable__.callTool("propose_changes", changeSet);

  await waitFor(() => seen.some((e) => e.kind === "tool-proposal"));
  const proposal = seen.find((e) => e.kind === "tool-proposal");
  expect(proposal && proposal.kind === "tool-proposal" && proposal.changeSet.label).toEqual("swap");
  expect(session.status().pending?.kind).toEqual("proposal");

  session.sendText("actually no");
  const result = await resultPromise;
  expect(result).toEqual({ status: "dismissed", reason: "user replied instead: actually no" });
  expect(seen.some((e) => e.kind === "request-resolved")).toEqual(true);
  expect(seen.filter((e) => e.kind === "user-text").map((e) => (e as any).text)).toEqual([
    "propose something",
    "actually no",
  ]);
  expect(session.status().pending).toEqual(null);
});

test("resolveRequest hands the client's outcome to the waiting tool", async () => {
  const { q } = fakeQuery();
  const session = await DeckSession.create("chatterfang", deps(q));
  const seen: TranscriptEvent[] = [];
  session.subscribe((ev) => seen.push(ev));
  session.sendText("go");

  const resultPromise = session.__testable__.callTool("pick_cards", {
    title: "Pick one",
    cards: [{ name: "A" }, { name: "B" }],
    mode: "one",
  });
  await waitFor(() => seen.some((e) => e.kind === "tool-picker"));
  const picker = seen.find((e) => e.kind === "tool-picker") as Extract<TranscriptEvent, { kind: "tool-picker" }>;

  expect(session.resolveRequest(picker.requestId, { picks: { A: true } })).toEqual(true);
  expect(await resultPromise).toEqual({ picks: { A: true } });
  expect(session.resolveRequest(picker.requestId, { picks: {} })).toEqual(false);
});

test("AskUserQuestion goes through canUseTool and returns the answers as updatedInput", async () => {
  const { q, captured } = fakeQuery();
  const session = await DeckSession.create("chatterfang", deps(q));
  const seen: TranscriptEvent[] = [];
  session.subscribe((ev) => seen.push(ev));
  session.sendText("ask me");
  await waitFor(() => captured.options !== null);

  const questions = [
    {
      question: "Bracket?",
      header: "Bracket",
      options: [
        { label: "3", description: "" },
        { label: "4", description: "" },
      ],
      multiSelect: false,
    },
  ];
  const decision = captured.options.canUseTool(
    "AskUserQuestion",
    { questions },
    { signal: new AbortController().signal },
  );
  await waitFor(() => seen.some((e) => e.kind === "tool-question"));
  const question = seen.find((e) => e.kind === "tool-question") as Extract<TranscriptEvent, { kind: "tool-question" }>;

  session.resolveRequest(question.requestId, { answers: { "Bracket?": "4" } });
  expect(await decision).toEqual({ behavior: "allow", updatedInput: { questions, answers: { "Bracket?": "4" } } });
});

test("the gate's verdicts flow through canUseTool: deny carries a message, allow-notify emits an activity line", async () => {
  const { q, captured } = fakeQuery();
  const session = await DeckSession.create("chatterfang", deps(q));
  const seen: TranscriptEvent[] = [];
  session.subscribe((ev) => seen.push(ev));
  session.sendText("write");
  await waitFor(() => captured.options !== null);

  const denied = await captured.options.canUseTool("Edit", { file_path: "decks/chatterfang/deck.json" }, {});
  expect(denied.behavior).toEqual("deny");
  expect(denied.message).toContain("propose_changes");

  const allowed = await captured.options.canUseTool(
    "Write",
    { file_path: "decks/chatterfang/research/n.md", content: "x" },
    {},
  );
  expect(allowed.behavior).toEqual("allow");
  expect(seen.some((e) => e.kind === "tool-activity" && e.label.includes("research/n.md"))).toEqual(true);
});

test("the SDK session is started with the project settings, the embedded env flag and the MCP timeout", async () => {
  const { q, captured } = fakeQuery();
  const session = await DeckSession.create("chatterfang", deps(q));
  session.sendText("hi");
  await waitFor(() => captured.options !== null);

  expect(captured.options.settingSources).toEqual(["project"]);
  expect(captured.options.env.MTG_AGENT_EMBEDDED).toEqual("1");
  expect(Number(captured.options.env.MCP_TOOL_TIMEOUT)).toBeGreaterThan(60 * 60 * 1000);
  expect(captured.options.includePartialMessages).toEqual(true);
  expect(captured.options.systemPrompt).toEqual({ type: "preset", preset: "claude_code", append: "prompt" });
  expect(captured.options.model).toBeUndefined();
});

test("model and effort choices reach the next session start", async () => {
  const { q, captured } = fakeQuery();
  const session = await DeckSession.create("chatterfang", deps(q));
  await session.setModel("claude-opus-5-5", "high");
  session.sendText("hi");
  await waitFor(() => captured.options !== null);

  expect(captured.options.model).toEqual("claude-opus-5-5");
  expect(captured.options.effort).toEqual("high");
  expect(session.status().model).toEqual("claude-opus-5-5");
});

test("the open list travels with the message so the agent proposes against the right list", async () => {
  const { q, captured } = fakeQuery();
  const session = await DeckSession.create("chatterfang", deps(q));
  const seen: TranscriptEvent[] = [];
  session.subscribe((ev) => seen.push(ev));
  session.sendText("cut X for Y", { listId: "b4" });
  await waitFor(() => captured.prompt !== null);

  const { value } = await captured.prompt!.next();
  expect(String(value.message.content)).toContain('"b4"');
  expect(String(value.message.content)).toContain("cut X for Y");
  // The transcript keeps what the user typed, not the context prefix.
  expect((seen.find((e) => e.kind === "user-text") as any).text).toEqual("cut X for Y");
});

test("a new conversation starts a fresh query and the old one closes silently", async () => {
  const { q, captured } = fakeQuery();
  const session = await DeckSession.create("chatterfang", deps(q));
  session.sendText("first");
  await waitFor(() => captured.starts === 1);

  await session.newConversation();
  const seen: TranscriptEvent[] = [];
  session.subscribe((ev) => seen.push(ev));
  session.sendText("second");
  await waitFor(() => captured.starts === 2);
  await new Promise((r) => setTimeout(r, 50));

  expect(seen.some((e) => e.kind === "notice" && /closed/i.test(e.text))).toEqual(false);
  expect(session.status().busy).toEqual(false);
  const { value } = await captured.prompt!.next();
  expect(String(value.message.content)).toContain("second");
});

test("a request left pending in the transcript by an earlier server run is dismissed on start", async () => {
  await mkdir(join(dataDir, "agent", "transcripts"), { recursive: true });
  const events: TranscriptEvent[] = [
    { kind: "user-text", id: "u", text: "propose" },
    {
      kind: "tool-proposal",
      id: "p",
      requestId: "r-old",
      changeSet: { listId: "main", label: "x", author: "agent", entries: [] },
    },
    { kind: "tool-question", id: "q", requestId: "r-q", questions: [] },
    { kind: "request-resolved", id: "x", requestId: "r-q", outcome: { answers: {} } },
  ];
  await writeFile(
    join(dataDir, "agent", "transcripts", "chatterfang.jsonl"),
    events.map((e) => JSON.stringify(e)).join("\n") + "\n",
  );

  const { q } = fakeQuery();
  const session = await DeckSession.create("chatterfang", deps(q));
  const resolved = session.history().filter((e) => e.kind === "request-resolved") as Extract<
    TranscriptEvent,
    { kind: "request-resolved" }
  >[];
  expect(resolved.map((e) => e.requestId)).toEqual(["r-q", "r-old"]);
  expect((resolved[1].outcome as any).reason).toMatch(/restart/i);
  expect(session.status().pending).toEqual(null);
});
