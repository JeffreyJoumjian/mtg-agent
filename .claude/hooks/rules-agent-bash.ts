#!/usr/bin/env bun
/** PreToolUse guard on the mtg-rules-expert agent's Bash (wired in its frontmatter). It allows one
 *  card-data or ledger command, optionally behind `mise exec --`, and denies everything else with a
 *  reason the agent can act on. Quoted arguments may hold `<` or `>` (Scryfall's `id<=bg`), so
 *  chaining and redirection are only looked for outside quotes. */
const input = JSON.parse(await Bun.stdin.text());
const command = String(input?.tool_input?.command ?? "").trim();
const unquoted = command.replace(/"[^"]*"|'[^']*'/g, '""');
const allowed = /^(mise exec -- )?bun run (card|lookup|scripts\/card\.ts)(\s|$)/.test(command) && !/[;&|`$<>]/.test(unquoted);

const decision = allowed
  ? { permissionDecision: "allow" }
  : {
      permissionDecision: "deny",
      permissionDecisionReason:
        'This agent runs one command at a time from this list: bun run card "<name>" [--rulings], bun run scripts/card.ts search "<query>", or bun run lookup "<term>". Drop any pipe, redirect or second command and try again.',
    };
console.log(JSON.stringify({ hookSpecificOutput: { hookEventName: "PreToolUse", ...decision } }));
