// Server only — one live Agent SDK session per deck. The query() stays open across turns
// (streaming-input mode); user messages are pushed into an async generator, SDK messages are
// translated into TranscriptEvents and fanned out to SSE subscribers. Blocking UI tools park on
// `pending` until the browser resolves them.
import { randomUUID } from "node:crypto";
import {
  createSdkMcpServer,
  query as sdkQuery,
  type SDKMessage,
  type SDKUserMessage,
} from "@anthropic-ai/claude-agent-sdk";
import { REPO_ROOT } from "@mtg/paths.ts";
import type { CardMeta, CardStatus } from "@mtg/deck-model.ts";
import { DATA_DIR } from "~/lib/server/price-cache";
import type { RequestKind, SdkQuestion, TranscriptEvent } from "../../chat/events";
import { updateCardMeta } from "../store";
import { classifyToolUse } from "./gate";
import { loadAppendPrompt } from "./system-prompt";
import { buildDeckUiTools, UI_TOOL_PREFIX, type ToolBridge } from "./tools";
import { appendTranscript, archiveTranscript, loadSessionIds, readTranscript, saveSessionId } from "./transcripts";

export interface SessionDeps {
  query?: typeof sdkQuery;
  dataDir?: string;
  repoRoot?: string;
  loadPrompt?: (slug: string) => Promise<string>;
  setMeta?: (slug: string, updates: { name: string; meta: Partial<CardMeta> }[]) => Promise<unknown>;
}

/** What travels with a user message besides the text: which list is open in the workbench. */
export interface MessageContext {
  listId?: string;
}

interface Pending {
  kind: RequestKind;
  meta: Record<string, unknown>;
  resolve: (outcome: unknown) => void;
}

export interface SessionStatus {
  model: string | null;
  effort: string | null;
  sessionId: string | null;
  busy: boolean;
  pending: { requestId: string; kind: RequestKind } | null;
}

/** Six hours: a proposal can sit in the UI for as long as the user likes. */
const MCP_TOOL_TIMEOUT_MS = 6 * 60 * 60 * 1000;

type QueryHandle = ReturnType<typeof sdkQuery>;

export class DeckSession {
  private transcript: TranscriptEvent[] = [];
  private subscribers: ((ev: TranscriptEvent) => void)[] = [];
  private queue: string[] = [];
  private wake: (() => void) | null = null;
  private pending: Record<string, Pending> = {};
  private running = false;
  private turnActive = false;
  private handle: QueryHandle | null = null;
  /** Handles closed on purpose (new conversation) — their end must not announce "session closed". */
  private closedOnPurpose: QueryHandle[] = [];
  private sessionId: string | null = null;
  private model: string | null = null;
  private effort: string | null = null;
  private readonly deps: Required<SessionDeps>;
  private readonly tools: ReturnType<typeof buildDeckUiTools>;

  private constructor(
    readonly slug: string,
    deps: SessionDeps,
  ) {
    this.deps = {
      query: deps.query ?? sdkQuery,
      dataDir: deps.dataDir ?? DATA_DIR,
      repoRoot: deps.repoRoot ?? REPO_ROOT,
      loadPrompt: deps.loadPrompt ?? loadAppendPrompt,
      setMeta: deps.setMeta ?? ((s, updates) => updateCardMeta(s, updates)),
    };
    this.tools = buildDeckUiTools(this.bridge());
  }

  static async create(slug: string, deps: SessionDeps = {}): Promise<DeckSession> {
    const session = new DeckSession(slug, deps);
    session.transcript = await readTranscript(session.deps.dataDir, slug);
    const ids = await loadSessionIds(session.deps.dataDir);
    session.sessionId = ids[slug] ?? null;
    session.dismissStaleRequests();
    return session;
  }

  /** Requests an earlier server run left unanswered can never be answered now — the tool call
   *  that waited on them died with that process. Close them in the transcript so the UI does not
   *  show a card nothing can resolve. */
  private dismissStaleRequests(): void {
    const resolved: Record<string, true> = {};
    for (const e of this.transcript) {
      if (e.kind === "request-resolved" || e.kind === "approval-resolved") resolved[e.requestId] = true;
    }
    for (const e of [...this.transcript]) {
      if (e.kind === "approval-request" && !resolved[e.requestId]) {
        this.emit({ kind: "approval-resolved", id: randomUUID(), requestId: e.requestId, decision: "deny" });
      } else if (
        (e.kind === "tool-proposal" || e.kind === "tool-picker" || e.kind === "tool-question") &&
        !resolved[e.requestId]
      ) {
        this.emit({
          kind: "request-resolved",
          id: randomUUID(),
          requestId: e.requestId,
          outcome: { status: "dismissed", reason: "the app restarted while this was waiting" },
        });
      }
    }
  }

  history(): TranscriptEvent[] {
    return this.transcript;
  }

  status(): SessionStatus {
    const first = Object.entries(this.pending)[0];
    return {
      model: this.model,
      effort: this.effort,
      sessionId: this.sessionId,
      busy: this.turnActive,
      pending: first ? { requestId: first[0], kind: first[1].kind } : null,
    };
  }

  subscribe(cb: (ev: TranscriptEvent) => void): () => void {
    this.subscribers.push(cb);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== cb);
    };
  }

  private emit(ev: TranscriptEvent): void {
    this.transcript.push(ev);
    if (ev.kind !== "text-delta") {
      // Persistence is best effort: a failed append must never take the live session down.
      appendTranscript(this.deps.dataDir, this.slug, ev).catch((err) => {
        console.error(`[agent:${this.slug}] transcript write failed:`, err instanceof Error ? err.message : err);
      });
    }
    for (const cb of this.subscribers) cb(ev);
  }

  private bridge(): ToolBridge {
    return {
      emit: (ev) => this.emit({ ...ev, id: ev.id ?? randomUUID() } as TranscriptEvent),
      waitFor: <T>(requestId: string, kind: RequestKind, meta: Record<string, unknown> = {}) =>
        new Promise<T>((resolve) => {
          this.pending[requestId] = { kind, meta, resolve: resolve as (o: unknown) => void };
        }),
      newId: () => randomUUID(),
      setMeta: async (updates) => {
        await this.deps.setMeta(
          this.slug,
          updates.map((u) => ({
            name: u.name,
            meta: {
              ...(u.tags !== undefined ? { tags: u.tags } : {}),
              ...(u.status !== undefined ? { status: u.status as CardStatus } : {}),
              ...(u.note !== undefined ? { note: u.note } : {}),
            },
          })),
        );
      },
    };
  }

  /** A user message. Anything the agent is waiting on is resolved first — as a dismissal that
   *  carries the text — so the agent always learns what the user did. The transcript keeps the
   *  text as typed; the agent additionally receives which list is open. */
  sendText(text: string, context?: MessageContext): void {
    this.emit({ kind: "user-text", id: randomUUID(), text });
    this.dismissPending(text);

    const prefix = context?.listId
      ? `(The user has list "${context.listId}" open in the workbench. Proposals should target it unless they say otherwise.)\n\n`
      : "";
    this.queue.push(prefix + text);
    this.wake?.();
    if (!this.running) void this.run();
  }

  private dismissPending(text: string | null): void {
    for (const [requestId, p] of Object.entries(this.pending)) {
      const reason = text === null ? "the session was interrupted" : `user replied instead: ${text}`;
      const outcome =
        p.kind === "question"
          ? {
              answers:
                text === null
                  ? {}
                  : { [String((p.meta.questions as SdkQuestion[] | undefined)?.[0]?.question ?? "reply")]: text },
            }
          : p.kind === "approval"
            ? "deny"
            : { status: "dismissed", reason };
      this.resolveRequest(requestId, outcome);
    }
  }

  /** The browser answered a pending request. False when nothing was waiting under that id. */
  resolveRequest(requestId: string, outcome: unknown): boolean {
    const p = this.pending[requestId];
    if (!p) return false;

    delete this.pending[requestId];
    if (p.kind === "approval") {
      this.emit({
        kind: "approval-resolved",
        id: randomUUID(),
        requestId,
        decision: outcome === "allow" ? "allow" : "deny",
      });
    } else {
      this.emit({ kind: "request-resolved", id: randomUUID(), requestId, outcome });
    }
    p.resolve(outcome);
    return true;
  }

  resolveApproval(requestId: string, decision: "allow" | "deny"): boolean {
    return this.resolveRequest(requestId, decision);
  }

  async interrupt(): Promise<void> {
    this.dismissPending(null);
    try {
      await this.handle?.interrupt();
    } catch (err) {
      this.emit({
        kind: "notice",
        id: randomUUID(),
        level: "error",
        text: `Could not interrupt: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
  }

  /** Model applies live when a session is open; effort applies at the next session start. */
  async setModel(model: string | null, effort: string | null): Promise<void> {
    this.model = model;
    this.effort = effort;
    if (this.handle) {
      try {
        await this.handle.setModel(model ?? undefined);
      } catch {
        // The next session start picks it up.
      }
    }
    this.emit({ kind: "session", id: randomUUID(), model, effort, sessionId: this.sessionId });
  }

  /** Archive the transcript and forget the SDK session; the next message starts fresh. */
  async newConversation(): Promise<void> {
    this.dismissPending(null);
    const old = this.handle;
    if (old) {
      this.closedOnPurpose.push(old);
      old.close();
    }
    this.handle = null;
    this.running = false;
    this.turnActive = false;
    this.queue = [];
    this.sessionId = null;
    await saveSessionId(this.deps.dataDir, this.slug, null);
    await archiveTranscript(this.deps.dataDir, this.slug);
    this.transcript = [];
    for (const cb of this.subscribers) {
      cb({ kind: "session", id: randomUUID(), model: this.model, effort: this.effort, sessionId: null });
    }
  }

  /** Streaming input: yields queued user messages forever, so the session survives across turns.
   *  Each run gets its own generator; a generator whose run has been superseded stops yielding. */
  private async *input(owner: { handle: QueryHandle | null }): AsyncGenerator<SDKUserMessage> {
    while (true) {
      if (this.queue.length === 0) {
        await new Promise<void>((resolve) => {
          this.wake = resolve;
        });
        this.wake = null;
      }
      if (owner.handle !== null && this.handle !== owner.handle) return;

      const text = this.queue.shift();
      if (text !== undefined) {
        yield { type: "user", message: { role: "user", content: text }, parent_tool_use_id: null };
      }
    }
  }

  private async run(): Promise<void> {
    this.running = true;
    const owner: { handle: QueryHandle | null } = { handle: null };
    let q: QueryHandle | null = null;

    try {
      const append = await this.deps.loadPrompt(this.slug);
      q = this.deps.query({
        prompt: this.input(owner),
        options: {
          cwd: this.deps.repoRoot,
          ...(this.sessionId ? { resume: this.sessionId } : {}),
          includePartialMessages: true,
          settingSources: ["project"],
          systemPrompt: { type: "preset", preset: "claude_code", append },
          mcpServers: { "deck-ui": createSdkMcpServer({ name: "deck-ui", version: "1.0.0", tools: this.tools }) },
          ...(this.model ? { model: this.model } : {}),
          ...(this.effort ? { effort: this.effort as "low" | "medium" | "high" | "xhigh" | "max" } : {}),
          env: { ...process.env, MTG_AGENT_EMBEDDED: "1", MCP_TOOL_TIMEOUT: String(MCP_TOOL_TIMEOUT_MS) },
          // No allowedTools: bare entries there auto-approve BEFORE canUseTool. The gate is the
          // single authority.
          canUseTool: async (toolName, input) => this.decide(toolName, input),
        },
      });
      this.handle = q;
      owner.handle = q;
      await this.pump(q);

      if (!this.closedOnPurpose.includes(q)) {
        this.emit({
          kind: "notice",
          id: randomUUID(),
          level: "info",
          text: "Session closed — your next message starts it again.",
        });
      }
    } catch (err) {
      this.emit({ kind: "notice", id: randomUUID(), level: "error", text: String(err) });
    } finally {
      if (q) this.closedOnPurpose = this.closedOnPurpose.filter((h) => h !== q);
      // A newer run may already own the session; only the current one resets it.
      if (q === null || this.handle === q) {
        this.running = false;
        this.turnActive = false;
        this.handle = null;
      }
    }
  }

  private async decide(toolName: string, input: Record<string, unknown>) {
    if (toolName === "AskUserQuestion") {
      const requestId = randomUUID();
      const questions = (input.questions ?? []) as SdkQuestion[];
      this.emit({ kind: "tool-question", id: randomUUID(), requestId, questions });
      const outcome = (await this.waitFor(requestId, "question", { questions })) as {
        answers?: Record<string, string>;
      };
      return { behavior: "allow" as const, updatedInput: { questions, answers: outcome.answers ?? {} } };
    }

    const decision = classifyToolUse(toolName, input, { slug: this.slug, repoRoot: this.deps.repoRoot });
    if (decision.verdict === "allow") return { behavior: "allow" as const, updatedInput: input };
    if (decision.verdict === "allow-notify") {
      this.emit({ kind: "tool-activity", id: randomUUID(), label: `${toolName} ${decision.path}` });
      return { behavior: "allow" as const, updatedInput: input };
    }
    if (decision.verdict === "deny")
      return { behavior: "deny" as const, message: decision.reason ?? "Not allowed here." };

    const requestId = randomUUID();
    const preview =
      typeof input.content === "string"
        ? input.content.slice(0, 4000)
        : typeof input.new_string === "string"
          ? input.new_string.slice(0, 4000)
          : "";
    this.emit({
      kind: "approval-request",
      id: randomUUID(),
      requestId,
      tool: toolName,
      path: decision.path ?? "?",
      preview,
    });
    const userDecision = await this.waitFor(requestId, "approval");
    if (userDecision === "allow") return { behavior: "allow" as const, updatedInput: input };
    return { behavior: "deny" as const, message: "The user declined this write in the UI." };
  }

  private waitFor(requestId: string, kind: RequestKind, meta: Record<string, unknown> = {}): Promise<unknown> {
    return new Promise((resolve) => {
      this.pending[requestId] = { kind, meta, resolve };
    });
  }

  /** Translate SDK messages into TranscriptEvents. */
  private async pump(q: AsyncIterable<SDKMessage>): Promise<void> {
    let turnId: string | null = null;
    let currentTextId: string | null = null;
    let currentText = "";

    for await (const msg of q) {
      if (msg.type === "system" && msg.subtype === "init") {
        this.sessionId = msg.session_id;
        void saveSessionId(this.deps.dataDir, this.slug, msg.session_id);
        this.emit({
          kind: "session",
          id: randomUUID(),
          model: this.model ?? msg.model ?? null,
          effort: this.effort,
          sessionId: msg.session_id,
        });
      } else if (msg.type === "stream_event") {
        const ev = msg.event;
        if (turnId === null) {
          turnId = randomUUID();
          this.turnActive = true;
          this.emit({ kind: "turn-start", id: turnId });
        }
        if (ev.type === "content_block_start" && ev.content_block.type === "text") {
          currentTextId = randomUUID();
          currentText = "";
        } else if (ev.type === "content_block_delta" && ev.delta.type === "text_delta" && currentTextId) {
          currentText += ev.delta.text;
          this.emit({ kind: "text-delta", id: currentTextId, text: ev.delta.text });
        } else if (ev.type === "content_block_stop" && currentTextId) {
          if (currentText.trim()) {
            this.emit({ kind: "text-final", id: currentTextId, text: currentText });
            // Deltas served their purpose; the final text replaces them in memory and in replays.
            const finalId = currentTextId;
            this.transcript = this.transcript.filter((e) => !(e.kind === "text-delta" && e.id === finalId));
          }
          currentTextId = null;
        }
      } else if (msg.type === "assistant") {
        for (const block of msg.message.content) {
          if (block.type !== "tool_use" || block.name.startsWith(UI_TOOL_PREFIX) || block.name === "AskUserQuestion")
            continue;

          this.emit({
            kind: "tool-activity",
            id: randomUUID(),
            label: describeToolUse(block.name, block.input as Record<string, unknown>),
          });
        }
      } else if (msg.type === "result") {
        if (msg.subtype !== "success") {
          const hint =
            msg.subtype.includes("budget") || msg.subtype.includes("limit")
              ? " — you may have hit a usage limit; try again in a bit."
              : "";
          this.emit({
            kind: "notice",
            id: randomUUID(),
            level: "error",
            text: `Turn ended with: ${msg.subtype}${hint}`,
          });
        }
        if (turnId) {
          this.emit({ kind: "turn-end", id: turnId });
          turnId = null;
        }
        this.turnActive = false;
      }
    }

    if (turnId) this.emit({ kind: "turn-end", id: turnId });
  }

  /** Test hooks: invoke a deck-ui tool the way the CLI would. */
  readonly __testable__ = {
    callTool: async (name: string, input: Record<string, unknown>): Promise<unknown> => {
      const def = this.tools.find((t) => t.name === name);
      if (!def) throw new Error(`no tool ${name}`);

      const result = (await def.handler(input as never, {})) as { content: { type: string; text?: string }[] };
      const text = result.content[0]?.text ?? "";
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    },
  };
}

function describeToolUse(name: string, input: Record<string, unknown>): string {
  if (name === "Bash" && typeof input.command === "string") return `$ ${input.command}`;
  if (name === "Skill" && typeof input.skill === "string") return `Skill ${input.skill}`;
  if (name === "Task" && typeof input.subagent_type === "string") return `Subagent ${input.subagent_type}`;
  if (typeof input.file_path === "string") return `${name} ${input.file_path}`;
  if (name === "Grep" && typeof input.pattern === "string") return `Grep /${input.pattern}/`;
  if (name === "Glob" && typeof input.pattern === "string") return `Glob ${input.pattern}`;
  return name;
}
