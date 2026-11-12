---
name: set-review
description: Set review. Read every card in a new Magic set against the pilot's decks and bring back the upgrades worth discussing. Use when the pilot asks what a new or upcoming set offers their decks, or asks for a set review.
---

# Set review

Read every card in a new set against each chosen deck, give each card a verdict per list, and
bring back the swaps worth discussing. Load `deck-brain` first: its rules decide every verdict.
Ledger entries tool-007, tool-016 and tool-017 record what earlier reviews learned.

A review proposes and changes no list. Every MAIN verdict comes back as a swap for the pilot to
take one at a time (CLAUDE.md, "Deck changes").

## 1. Scan the set

Run the scan once per set code. Scryfall files a set's Commander product under its own code
(Star Trek is `trk` and `trc`), so scan both.

```bash
bun run set-scan <code>
```

It writes `data/<code>-index.json` and one pool per deck, `data/<code>-candidates-<slug>.json`.
Each pool card carries `reprint` and `inLists`, the ids of the deck's lists that already run it.

If the set hasn't released, look in the index for cards whose `commanderLegal` is `not_legal`. The
scan leaves them out of every pool, and before release that is Scryfall's data lagging, not a
verdict (tool-016). List them in each review as "unreleased, re-check on <date>".

Done when every scan printed a candidate line for every deck without aborting.

## 2. Pick the decks and lists with the pilot

The pilot picks by clicking, so ask both rounds as `AskUserQuestion` multi-select questions. One
call holds four questions of four options each, and a longer picker continues in a second call.

1. **Decks.** One option per deck in the scan output, sorted by commander name (`commandersOf` in
   `scripts/lib/deck-model.ts`), four to a question. The answer joins the picked labels with
   commas, so keep commas out of a label: use the commander's name up to its first comma, with the
   slug in brackets when two decks share that name. Each description gives the slug, the colours,
   the pool size and new-card count across every scanned code (a card counts once), and whether
   the deck's section of `decks/_notes.md` calls it played or a record. Say in the first question
   that each deck costs one Opus subagent.
2. **Lists.** One question per chosen deck that has more than one `"kind": "deck"` list, in the
   same commander order, with one option per list. Pool lists stay out, and a deck with more than
   four lists takes two questions. Label each option with the list id, and add "(target)" to the
   target list: the newest list in `deck.json`, judged by the dates in `research/decisions.md` and
   the deck's section of `decks/_notes.md`. Each description gives the list's label, its bracket
   and what `_notes.md` says about it, such as abandoned or on trial. A deck with one list gets
   that list without a question, and the first lists question names those decks.

Done when the pilot has picked the decks and every chosen deck's lists.

## 3. Prepare each deck's bundle

Reviewers run in parallel, and `bun run card`, `edhrec` and `deck:*` write `data/card-cache.json`
without a lock, so two at once can wipe it (tool-007). The main session runs them first, one at a
time, and writes the results to `<scratchpad>/set-review/<slug>/`:

1. `bun run card --deck <slug> --list <id>` for every list getting verdicts. This fills the cache.
2. `lists.txt`: the output of `bun run deck:show <slug> --list <id>` for each of those lists.
3. `oracle.txt`: the output of `bun run card --deck <slug> --list <target> --oracle`, the oracle
   text of every card in the target list. Write `oracle-<id>.txt` the same way for each other list
   getting verdicts, so a reviewer can quote a cut's text in any list.

Done when every chosen deck has its files and no command reported a card it couldn't find.

## 4. Review every deck in parallel

Dispatch one `Agent` per deck in a single message, with `model: "opus"` and
`run_in_background: false`. Each prompt names:

- the deck slug, the target list and the other lists to verdict
- the set codes and the pool files
- the bundle folder
- the review file: `decks/<slug>/research/<code>-set-review-<YYYY-MM-DD>.md`, named after the
  first code when one file covers a set and its Commander product
- the banned cards from CLAUDE.md, pasted in full
- the instruction "Read `.claude/skills/set-review/reviewer.md` and follow it."

A forked deck that shares its parent's colours and plan (upgrade-test and chatterfang) can share
one reviewer and one file, with a verdict column per deck.

Done when every reviewer has returned.

## 5. Verify

Check the files, not the reviewers' reports.

1. Run the coverage check on every review file. It exits 1 and names each pool card that has no
   verdict row. Send a failing file back to its reviewer with the names.
   ```bash
   bun run set-scan <code>[,<code>] --check <review-file> [--deck <slug>]
   ```
2. Run `git status`. The new review files are the only changes allowed.
3. For every MAIN, re-read both cards with `bun run card` (deck-brain §1.1). Grep the cut's oracle
   text for the incoming card's trigger words (eval-011), and grep the deck's records for the cut
   (tool-019).

Done when every file passes the check, nothing else changed, and every MAIN survived step 3.

## 6. Report

Report one deck per round, in commander-name order, with the `card-visualizer` skill. Each round
shows that deck's card pages, and its reply covers:

- every MAIN as a swap: card in, card out, the deciding axis, the grounds, and its effect on
  average MV and the MV ≤ 2 and MV ≤ 3 counts
- the SIDE cards, each with the card it would displace
- the traps, cards that read like upgrades and aren't

Link every card to Scryfall and the deck's review file by absolute path, and name the decks still
to come. Then wait: the pilot takes each swap as its own decision, and the next deck's round
starts after they've answered for this one. Before the first round, file in the ledger any lesson
that would change a decision on another deck (deck-brain §4).
