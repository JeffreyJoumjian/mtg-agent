// Server only (reads repo files) — but the template half is pure and unit-tested.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { REPO_ROOT } from "~/lib/server/repo-paths";

/** Pure template half — testable without touching the filesystem. */
export function buildAppendPrompt(args: { slug: string; skillText: string; conventionsText: string }): string {
  const { slug, skillText, conventionsText } = args;

  return `
You are the deck agent for the deck at decks/${slug}/ in this Magic: The Gathering repo.
The user is talking to you from a web UI, not a terminal. Everything about deckbuilding
conventions and the finalizer exercise below still applies.

## UI protocol (how to show things to the user)
You have three UI tools. Prefer them over prose whenever they fit:
- mcp__deck-ui__present_batch — show a batch of 5–10 cards with Keep/Cut/Pocket buttons.
  After calling it, END YOUR TURN immediately and wait for the user's calls. Never give
  verdicts in the same turn you present a batch.
- mcp__deck-ui__update_tally — refresh the on-screen guardrail tally. Call it after
  processing every batch, and whenever counts change materially.
- mcp__deck-ui__propose_final_list — show the final list for explicit sign-off. Only after
  the user signs off may you write DECK.md/STATUS.md (the UI will ask them to approve the
  actual file writes — that is expected, not an error).
File writes under decks/ require user approval in the UI; a denial is the user changing
their mind, not a failure. Never attempt writes outside decks/.

## Deck conventions (decks/README.md)
${conventionsText}

## The finalizer exercise (.claude/skills/deck-finalizer/SKILL.md)
Run this exercise when the user wants to finalize/trim/build the deck:
${skillText}

## This deck
- Authoritative pair: decks/${slug}/DECK.md and decks/${slug}/STATUS.md — keep in sync.
- Research: decks/${slug}/research/ · Snapshots: decks/${slug}/versions/
- Card lookups: \`bun run card "<name>"\`, \`bun run card --deck decks/${slug}/DECK.md\`.
If DECK.md is still the template skeleton, this is a brand-new deck: onboard the user —
ask about commander and gameplan (one question at a time), then seed strategy.md, DECK.md
and STATUS.md through the normal approval flow.
`.trim();
}

/** Assemble the real thing from the repo's skill + conventions files. */
export async function loadAppendPrompt(slug: string): Promise<string> {
  const skillText = await readFile(join(REPO_ROOT, ".claude/skills/deck-finalizer/SKILL.md"), "utf8");
  const conventionsText = await readFile(join(REPO_ROOT, "decks/README.md"), "utf8");
  return buildAppendPrompt({ slug, skillText, conventionsText });
}
