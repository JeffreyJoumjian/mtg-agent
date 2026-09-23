/** The whole tool-permission policy for the browser agent, as one pure function. Tested as a table. */
import { isAbsolute, normalize, relative, resolve } from "node:path";

export interface GateContext {
  slug: string;
  repoRoot: string;
}

export interface GateDecision {
  verdict: "allow" | "allow-notify" | "ask" | "deny";
  reason?: string;
  /** Repo-relative path for writes, shown in the approval card / activity line. */
  path?: string;
}

const ALWAYS_ALLOWED = ["Read", "Glob", "Grep", "TodoWrite", "Skill", "Task", "WebFetch", "WebSearch", "LS"];

/** Read-only commands the agent may run from the repo root. Everything else is denied. */
const BASH_ALLOWLIST = [/^bun run (card|edhrec|carddata|deckcheck|deck:show)(\s|$)/, /^bun run scripts\/card\.ts\s/];
const BASH_CHAINING = /[;&|`$<>]/;

const WRITE_TOOLS = ["Write", "Edit", "MultiEdit"];

/** A repo-relative POSIX path, or null when the path escapes the repo. */
function repoPath(raw: string, repoRoot: string): string | null {
  const abs = isAbsolute(raw) ? normalize(raw) : resolve(repoRoot, raw);
  const rel = relative(repoRoot, abs).split("\\").join("/");

  if (rel === "" || rel.startsWith("..") || isAbsolute(rel)) return null;
  return rel;
}

export function classifyToolUse(tool: string, input: Record<string, unknown>, ctx: GateContext): GateDecision {
  if (ALWAYS_ALLOWED.includes(tool) || tool.startsWith("mcp__deck-ui__")) return { verdict: "allow" };

  if (tool === "Bash") {
    const command = typeof input.command === "string" ? input.command.trim() : "";
    // Quoted arguments may legitimately hold `<`/`>` (Scryfall's `id<=bg`); chaining lives outside quotes.
    const unquoted = command.replace(/"[^"]*"|'[^']*'/g, '""');
    if (BASH_CHAINING.test(unquoted))
      return {
        verdict: "deny",
        reason: "Only a single read-only command is allowed here — no chaining or redirection.",
      };
    if (BASH_ALLOWLIST.some((re) => re.test(command))) return { verdict: "allow" };

    return {
      verdict: "deny",
      reason:
        "Only `bun run card`, `bun run edhrec`, `bun run carddata`, `bun run deckcheck` and `bun run deck:show` are allowed here. To change the deck, call mcp__deck-ui__propose_changes.",
    };
  }

  if (WRITE_TOOLS.includes(tool)) {
    const raw = typeof input.file_path === "string" ? input.file_path : "";
    const path = repoPath(raw, ctx.repoRoot);
    if (!path) return { verdict: "deny", reason: "Writes outside the repo are not allowed." };

    // The ledger is append-only knowledge: an Edit adds to it, a whole-file Write could erase it.
    if (path === ".claude/skills/deck-brain/LEDGER.md")
      return tool === "Write" ? { verdict: "ask", path } : { verdict: "allow-notify", path };

    const deckPrefix = `decks/${ctx.slug}/`;
    if (path.startsWith(deckPrefix)) {
      const inside = path.slice(deckPrefix.length);
      if (inside === "deck.json" || inside === "history.jsonl" || inside.startsWith("versions/")) {
        return {
          verdict: "deny",
          reason: `${inside} is owned by the app. Propose list changes with mcp__deck-ui__propose_changes and tags/status with mcp__deck-ui__set_card_meta.`,
          path,
        };
      }
      if (inside.startsWith("research/")) return { verdict: "allow-notify", path };

      return { verdict: "ask", path };
    }

    return {
      verdict: "deny",
      reason: `The deck agent may only write inside decks/${ctx.slug}/research/ (and append to the deck-brain ledger).`,
      path,
    };
  }

  return { verdict: "deny", reason: "Not available in the deck workbench — ask the user to do this in the terminal." };
}
