// The in-process MCP tools that drive the structured UI. A blocking tool emits its event and then
// waits on the bridge until the browser resolves the request; its result tells the agent exactly
// what the user did. Non-blocking tools emit and return at once.
import { z } from "zod";
import { tool, type SdkMcpToolDefinition } from "@anthropic-ai/claude-agent-sdk";
import { CARD_STATUSES } from "@mtg/deck-model.ts";
import type { ChangeSet } from "@mtg/change-set.ts";
import { changeEntrySchema } from "../../model/types";
import type { RequestKind, TranscriptEvent } from "../../chat/events";

/** `Omit` over a discriminated union must distribute, or the discriminant collapses. */
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

export type EmittedEvent = DistributiveOmit<TranscriptEvent, "id"> & { id?: string };

export interface ToolBridge {
  emit(ev: EmittedEvent): void;
  /** Resolves when the browser answers the request (or the user types instead). */
  waitFor<T>(requestId: string, kind: RequestKind, meta?: Record<string, unknown>): Promise<T>;
  newId(): string;
  /** Apply tags/status/notes immediately (unversioned bookkeeping). */
  setMeta(updates: { name: string; tags?: string[]; status?: string; note?: string }[]): Promise<void>;
}

export const UI_TOOL_PREFIX = "mcp__deck-ui__";

const text = (payload: unknown) => ({
  content: [{ type: "text" as const, text: typeof payload === "string" ? payload : JSON.stringify(payload) }],
});

export function buildDeckUiTools(bridge: ToolBridge): SdkMcpToolDefinition<any>[] {
  return [
    tool(
      "show_cards",
      "Render cards in the chat as a gallery with images. Use it whenever you discuss two or more specific cards, so the user sees them instead of reading names.",
      {
        title: z.string().optional().describe("Short heading for the gallery"),
        cards: z
          .array(
            z.object({
              name: z.string().min(1),
              note: z.string().optional().describe("One clause: why this card is here"),
            }),
          )
          .min(1),
      },
      async (args) => {
        bridge.emit({ kind: "tool-cards", ...(args.title ? { title: args.title } : {}), cards: args.cards });
        return text("Shown.");
      },
    ),
    tool(
      "propose_changes",
      "Propose a change set to one list of the deck. It renders as a diff with stat deltas and a with/without preview, and this call BLOCKS until the user applies or dismisses it. The result says what happened; never assume it was applied. Use `replaces` on an add to pair it with a remove as a swap.",
      {
        listId: z.string().min(1).describe('Which list — usually "main"'),
        label: z.string().min(1).describe("Short label for the history line, e.g. 'Skullclamp in, Idol out'"),
        rationale: z.string().optional().describe("Why, in markdown — this is what the user reads before deciding"),
        entries: z.array(changeEntrySchema).min(1),
      },
      async (args) => {
        const requestId = bridge.newId();
        const changeSet: ChangeSet = {
          listId: args.listId,
          label: args.label,
          ...(args.rationale ? { rationale: args.rationale } : {}),
          author: "agent",
          entries: args.entries,
        };
        bridge.emit({ kind: "tool-proposal", requestId, changeSet });
        const outcome = await bridge.waitFor<unknown>(requestId, "proposal");
        return text(outcome);
      },
    ),
    tool(
      "pick_cards",
      "Ask the user to choose among cards, visually. mode 'one' = pick exactly one; 'many' = any number; 'label' = give every card one of `labels` (e.g. Keep/Cut/Pocket). BLOCKS until they answer; the result holds their picks.",
      {
        title: z.string().min(1),
        prompt: z.string().optional(),
        cards: z.array(z.object({ name: z.string().min(1), blurb: z.string().optional() })).min(1),
        mode: z.enum(["one", "many", "label"]),
        labels: z.array(z.string().min(1)).optional().describe("Required for mode 'label'"),
      },
      async (args) => {
        if (args.mode === "label" && !(args.labels && args.labels.length > 0)) {
          return text({ error: "mode 'label' needs a non-empty `labels` array" });
        }
        const requestId = bridge.newId();
        bridge.emit({
          kind: "tool-picker",
          requestId,
          title: args.title,
          ...(args.prompt ? { prompt: args.prompt } : {}),
          cards: args.cards,
          mode: args.mode,
          ...(args.labels ? { labels: args.labels } : {}),
        });
        const outcome = await bridge.waitFor<unknown>(requestId, "picker");
        return text(outcome);
      },
    ),
    tool(
      "set_card_meta",
      "Set tags, acquisition status or a note on cards of this deck. Immediate and unversioned. Tags are free-form; prefer the suggested vocabulary (ramp, draw, removal, wipe, drain, sac-outlet, token, aristocrat, protection, tutor, recursion, wincon, engine…). Passing an empty tags array clears the tags.",
      {
        cards: z
          .array(
            z.object({
              name: z.string().min(1),
              tags: z.array(z.string()).optional(),
              status: z.enum(CARD_STATUSES as [string, ...string[]]).optional(),
              note: z.string().optional(),
            }),
          )
          .min(1),
      },
      async (args) => {
        try {
          await bridge.setMeta(args.cards);
        } catch (err) {
          return text({ error: err instanceof Error ? err.message : String(err) });
        }
        bridge.emit({ kind: "tool-meta", cards: args.cards });
        return text("Updated.");
      },
    ),
  ];
}
