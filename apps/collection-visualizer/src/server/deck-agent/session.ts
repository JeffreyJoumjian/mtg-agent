// Server only — one live Agent SDK session per deck. The query() stays open across turns
// (streaming-input mode); user messages are pushed into an async generator, SDK messages are
// translated into TranscriptEvents and fanned out to SSE subscribers.
import { randomUUID } from "node:crypto";
import { query, type SDKMessage, type SDKUserMessage } from "@anthropic-ai/claude-agent-sdk";
import { REPO_ROOT, DECKS_DIR } from "~/lib/server/repo-paths";
import { loadSessionIds, saveSessionId } from "~/lib/server/deck-files";
import { appendTranscript, readTranscript } from "~/lib/server/deck-transcripts";
import { classifyToolUse } from "~/lib/deck/gate";
import type { TranscriptEvent } from "~/lib/deck/chat-events";
import { loadAppendPrompt } from "./system-prompt";
import { deckUiServer } from "./tools";

export class DeckSession {
  private transcript: TranscriptEvent[] = [];
  private subscribers: ((ev: TranscriptEvent) => void)[] = [];
  private queue: string[] = [];
  private wake: (() => void) | null = null;
  private pending: Record<string, (d: "allow" | "deny") => void> = {};
  private running = false;

  constructor(readonly slug: string) {}

  static async create(slug: string): Promise<DeckSession> {
    const session = new DeckSession(slug);
    session.transcript = await readTranscript(slug);
    return session;
  }

  history(): TranscriptEvent[] {
    return this.transcript;
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
      void appendTranscript(this.slug, ev);
    }
    for (const cb of this.subscribers) cb(ev);
  }

  sendText(text: string): void {
    this.emit({ kind: "user-text", id: randomUUID(), text });
    this.queue.push(text);
    this.wake?.();

    if (!this.running) {
      void this.run();
    }
  }

  resolveApproval(requestId: string, decision: "allow" | "deny"): void {
    const resolve = this.pending[requestId];
    if (!resolve) return;

    delete this.pending[requestId];
    this.emit({ kind: "approval-resolved", id: randomUUID(), requestId, decision });
    resolve(decision);
  }

  /** Streaming input: yields queued user messages forever, so the session survives across turns. */
  private async *input(): AsyncGenerator<SDKUserMessage> {
    while (true) {
      if (this.queue.length === 0) {
        await new Promise<void>((resolve) => {
          this.wake = resolve;
        });
        this.wake = null;
      }

      const text = this.queue.shift();
      if (text !== undefined) {
        yield { type: "user", message: { role: "user", content: text }, parent_tool_use_id: null };
      }
    }
  }

  private async run(): Promise<void> {
    this.running = true;

    try {
      const ids = await loadSessionIds();
      const append = await loadAppendPrompt(this.slug);

      const q = query({
        prompt: this.input(),
        options: {
          cwd: REPO_ROOT,
          resume: ids[this.slug],
          includePartialMessages: true,
          systemPrompt: { type: "preset", preset: "claude_code", append },
          mcpServers: { "deck-ui": deckUiServer() },
          allowedTools: [
            "Read",
            "Glob",
            "Grep",
            "TodoWrite",
            "mcp__deck-ui__present_batch",
            "mcp__deck-ui__update_tally",
            "mcp__deck-ui__propose_final_list",
          ],
          canUseTool: async (toolName, input) => {
            const decision = classifyToolUse(toolName, input, DECKS_DIR);

            if (decision.verdict === "allow") {
              return { behavior: "allow", updatedInput: input };
            }
            if (decision.verdict === "deny") {
              return { behavior: "deny", message: decision.reason ?? "Not allowed here." };
            }

            const requestId = randomUUID();
            const preview =
              typeof input.content === "string" ? input.content.slice(0, 4000)
              : typeof input.new_string === "string" ? input.new_string.slice(0, 4000)
              : "";
            this.emit({
              kind: "approval-request",
              id: randomUUID(),
              requestId,
              tool: toolName,
              path: decision.path ?? "?",
              preview,
            });

            const userDecision = await new Promise<"allow" | "deny">((resolve) => {
              this.pending[requestId] = resolve;
            });

            if (userDecision === "allow") {
              return { behavior: "allow", updatedInput: input };
            }
            return { behavior: "deny", message: "The user declined this write in the UI." };
          },
        },
      });

      await this.pump(q);
      // The input generator never ends, so reaching here means the SDK closed the stream.
      this.emit({ kind: "notice", id: randomUUID(), level: "info", text: "Session closed — your next message starts it again." });
    } catch (err) {
      this.emit({ kind: "notice", id: randomUUID(), level: "error", text: String(err) });
    } finally {
      this.running = false;
    }
  }

  /** Translate SDK messages into TranscriptEvents. */
  private async pump(q: AsyncIterable<SDKMessage>): Promise<void> {
    let turnId: string | null = null;
    let currentTextId: string | null = null;
    let currentText = "";

    for await (const msg of q) {
      if (msg.type === "system" && msg.subtype === "init") {
        void saveSessionId(this.slug, msg.session_id);
      } else if (msg.type === "stream_event") {
        const ev = msg.event;

        if (turnId === null) {
          turnId = randomUUID();
          this.emit({ kind: "turn-start", id: turnId });
        }
        if (ev.type === "content_block_start" && ev.content_block.type === "text") {
          currentTextId = randomUUID();
          currentText = "";
        } else if (ev.type === "content_block_delta" && ev.delta.type === "text_delta" && currentTextId) {
          currentText += ev.delta.text;
          this.emit({ kind: "text-delta", id: currentTextId, text: ev.delta.text });
        } else if (ev.type === "content_block_stop" && currentTextId) {
          this.emit({ kind: "text-final", id: currentTextId, text: currentText });
          currentTextId = null;
        }
      } else if (msg.type === "assistant") {
        for (const block of msg.message.content) {
          if (block.type !== "tool_use") continue;

          const id = randomUUID();
          const input = block.input as never;
          if (block.name === "mcp__deck-ui__present_batch") this.emit({ kind: "tool-batch", id, input });
          else if (block.name === "mcp__deck-ui__update_tally") this.emit({ kind: "tool-tally", id, input });
          else if (block.name === "mcp__deck-ui__propose_final_list") this.emit({ kind: "tool-final-list", id, input });
          else this.emit({ kind: "tool-activity", id, label: describeToolUse(block.name, block.input as Record<string, unknown>) });
        }
      } else if (msg.type === "result") {
        if (msg.subtype !== "success") {
          const hint = msg.subtype.includes("budget") || msg.subtype.includes("limit")
            ? " — you may have hit a usage limit; try again in a bit."
            : "";
          this.emit({ kind: "notice", id: randomUUID(), level: "error", text: "Turn ended with: " + msg.subtype + hint });
        }
        if (turnId) {
          this.emit({ kind: "turn-end", id: turnId });
          turnId = null;
        }
      }
    }

    if (turnId) {
      this.emit({ kind: "turn-end", id: turnId });
    }
  }
}

function describeToolUse(name: string, input: Record<string, unknown>): string {
  if (name === "Bash" && typeof input.command === "string") return "$ " + input.command;
  if (typeof input.file_path === "string") return name + " " + input.file_path;
  if (name === "Grep" && typeof input.pattern === "string") return "Grep /" + input.pattern + "/";
  return name;
}
