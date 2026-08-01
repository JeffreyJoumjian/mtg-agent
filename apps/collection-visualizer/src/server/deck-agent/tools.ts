// The three in-process MCP tools that drive the structured UI. Handlers are just acks — the
// browser renders from the tool_use blocks in the message stream, not from these results.
import { createSdkMcpServer, tool } from "@anthropic-ai/claude-agent-sdk";
import { batchSchema, tallySchema, finalListSchema } from "~/lib/deck/ui-tools";

export function deckUiServer() {
  return createSdkMcpServer({
    name: "deck-ui",
    version: "1.0.0",
    tools: [
      tool(
        "present_batch",
        "Show a batch of cards in the UI with Keep/Cut/Pocket buttons. End your turn right after calling this — the user clicks their calls and submits them as their next message.",
        batchSchema,
        async () => ({
          content: [{ type: "text", text: "Batch displayed. STOP: end your turn now and wait for the user's calls." }],
        }),
      ),
      tool(
        "update_tally",
        "Update the on-screen guardrail tally (keeps/cuts/pockets vs target, Game Changers vs ceiling, mana sources, category counts).",
        tallySchema,
        async () => ({
          content: [{ type: "text", text: "Tally updated on screen." }],
        }),
      ),
      tool(
        "propose_final_list",
        "Show the final decklist for explicit user sign-off before any file writes.",
        finalListSchema,
        async () => ({
          content: [{ type: "text", text: "Final list displayed. STOP: end your turn and wait for sign-off." }],
        }),
      ),
    ],
  });
}
