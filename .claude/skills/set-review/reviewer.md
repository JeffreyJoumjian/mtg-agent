# Set review: one deck

You review one Magic set against one Commander deck. Your prompt names the deck, its target list
and the other lists to verdict, the pool files, a bundle folder, the review file to write and the
banned cards.

## Ground rules

- Read `.claude/skills/deck-brain/SKILL.md` first. Its sections 1 and 2 decide every verdict.
- Set cards' text comes from the pool files. The deck's own cards come from the bundle's
  `oracle.txt` and `oracle-<id>.txt` files. Rules come from `rules/sections/`.
- Run only two commands: `bun run lookup "<card | rule | term>"`, which searches the ledger and
  every deck's decision log, and the coverage check under "Finish". Every other `bun run` command
  writes a cache that the other reviewers share.
- Write one file, the review file. Leave staging and commits to the main session.
- Keep scratch scripts and notes in your bundle folder. The other reviewers run at the same time
  and share the rest of the scratchpad.
- Propose only cards outside the banned list in your prompt.

## Read the deck

- `decks/<slug>/research/decisions.md`, `research/sideboard.md` and the deck's section of
  `decks/_notes.md`: the plan, the pilot's constraints, and what was cut and why.
- The bundle's `lists.txt`: the lists and their stats.

## Give every card a verdict

Every card in the pool gets one verdict per list:

- **MAIN**: it should displace a named card in that list now.
- **SIDE**: worth benching, with the card it would displace.
- **IN**: the list already runs it (`inLists` in the pool).
- **NO**: a pass, with a one-line reason.

Before each verdict:

- Cost it in this deck's mana, with the deck's own reducers applied (deck-brain §1.2).
- Check it against the deck's board: what in the list turns it off, and what it turns off (§1.3).
- Score each ability on its own (ledger eval-021).
- Grep its rules text, as well as its name, in decisions.md and sideboard.md. A new card can be a
  functional reprint of a card the deck already cut (tool-017). Re-derive from the recorded
  grounds, not the old verdict (§1.1b).
- Give reprints the same reading as new cards, since the deck may never have looked at them
  (tool-007).
- For a MAIN, grep the cut's oracle text for the incoming card's trigger words, and grep the
  deck's records for the cut, before naming it (eval-011, tool-019).
- EDHREC has no data for an unreleased set. Say so and skip that lens.

## Write the review file

Sections, in order:

1. **Header.** The sets and their release dates, the method, the lists and which one is the
   target, whether EDHREC data exists, and the Game Changer count before and after.
2. **Pool.** How many cards fit, how many are new, how many are reprints, and how many are
   already in a list.
3. **Result.** A table of MAIN, SIDE, IN and NO counts per list, then one line per MAIN and SIDE.
4. **Set mechanics as they matter to this deck.**
5. **Classification table.** One row for every pool card:
   `| # | Name | MV | New? | <one column per list> | Reason |`. Write each verdict as exactly MAIN,
   SIDE, IN or NO, and each name as the pool spells it.
6. **Proposed swaps.** One subsection per MAIN: the card in and the card out with both oracle
   texts, the deciding axis (§2.3), the grounds, the other cuts considered, and the effect on
   average MV and the MV ≤ 2 and MV ≤ 3 counts.
7. **Bench.** One subsection per SIDE, naming the card it would displace.
8. **Near-misses and traps.** Good cards in the wrong deck, and cards that read like upgrades but
   aren't.

Follow the repo's writing rules: no em dashes, active voice, plain words, and a Scryfall link on
every card name in prose.

## Finish

Run the coverage check and fix every card it names until it exits 0:

```bash
bun run set-scan <codes> --check <your review file> [--deck <slug>]
```

Then return the Result table, each MAIN with its cut and grounds, and the check's output line.
