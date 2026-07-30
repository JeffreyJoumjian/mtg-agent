/** Pure permission policy for the deck agent — the decision half of canUseTool.
 *  Only server code and tests import this; kept dependency-free anyway. */

export interface GateDecision {
  verdict: "allow" | "ask" | "deny";
  reason?: string;
  /** Set for "ask": the file the agent wants to touch, shown in the approval card. */
  path?: string;
}

const ALWAYS_ALLOWED = ["Read", "Glob", "Grep", "TodoWrite"];

/** Card lookups and the finalizer's own helper scripts — read-only by construction. */
const BASH_ALLOWLIST = [
  /^bun run card(\s|$)/,
  /^bun run scripts\/card\.ts\s/,
  /^python3?\s+\.claude\/skills\/deck-finalizer\/scripts\/(carddata|deckcheck)\.py(\s|$)/,
];

/** Shell operators that would chain an allowed command into something else. */
const BASH_CHAINING = [";", "&&", "||", "|", "`", "$(", ">", "<"];

export function classifyToolUse(
  tool: string,
  input: Record<string, unknown>,
  decksDir: string,
): GateDecision {
  if (ALWAYS_ALLOWED.includes(tool) || tool.startsWith("mcp__deck-ui__")) {
    return { verdict: "allow" };
  }

  if (tool === "Bash") {
    const command = typeof input.command === "string" ? input.command.trim().replace(/\s+/g, " ") : "";
    const chained = BASH_CHAINING.some((op) => command.includes(op));

    if (!chained && BASH_ALLOWLIST.some((re) => re.test(command))) {
      return { verdict: "allow" };
    }
    return { verdict: "deny", reason: "Only card-lookup commands (bun run card, scripts/card.ts, the finalizer's carddata/deckcheck scripts) are allowed here. Ask the user to run anything else in the terminal." };
  }

  if (tool === "Write" || tool === "Edit" || tool === "MultiEdit") {
    const filePath = typeof input.file_path === "string" ? input.file_path : "";

    if (filePath.includes("..")) {
      return { verdict: "deny", reason: "Path traversal is not allowed." };
    }
    if (filePath.startsWith(decksDir + "/")) {
      return { verdict: "ask", path: filePath };
    }
    return { verdict: "deny", reason: "The deck agent may only write inside decks/. Ask the user to make other changes in the terminal." };
  }

  return { verdict: "deny", reason: "Not available in the deck workbench — ask the user to do this in the terminal." };
}
