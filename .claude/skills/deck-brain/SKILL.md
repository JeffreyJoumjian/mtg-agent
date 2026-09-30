---
name: deck-brain
description: The accumulated decision-making method and knowledge base for this repo's Magic decks. Read this BEFORE answering any Magic question or making any deck decision — card evaluation, cuts, swaps, upgrades, rules interactions, manabase calls, bracket questions, "should I run X", "is the deck final", "what about card Y". It carries the verified rulings, the evaluation patterns, and the mistakes already made so they aren't made twice. It also LEARNS — every session that produces a durable lesson files it in the ledger before finishing.
---

# Deck Brain

The method and the memory behind every deck in `decks/`:

- **`SKILL.md`** (this file) — *how to decide*. Stable. Changes rarely.
- **`ledger/`** — *what we've learned*: one file per topic, every entry with an id, a Kind (ruling,
  pattern or correction) and the cards and rules it names. `ledger/INDEX.md` lists every entry and
  `ledger/CARDS.md` maps each card to its entries. Grows every session (§4).

**Look it up before you reason about a card:** `bun run lookup "<card | rule number | term>"` prints
every matching ledger entry whole, plus the decision-log sections of every deck that mention it.

But read it for **facts, not verdicts.** A rules citation, an oracle quote or a measurement stays
true; *"card X beats card Y here"* was only ever true of the list as it stood that day, and every
swap since has quietly changed the list. **Re-derive every verdict against the deck in front of
you** — see §1.1b, which is the rule this skill most often gets broken on.

---

## 0. Standing constraints from the pilot

Facts about how *this* pilot plays, which override any default assumption. Confirmed directly by
the user; they hold until the user says otherwise.

### 0.1 Everything is proxied — price is not a build constraint

**The pilot proxies every card unless they say otherwise for a specific deck** (confirmed
2026-09-08). So:

- **Never cut, downgrade, or avoid a card because of its price.** No "budget alternative" unless
  the user asks for one. Build the best version of the list, then let bracket and the role
  skeleton (§2.1) do the trimming.
- **Never present price as an argument in a swap or a cut.** It is not a deciding axis (§2.3).
  Reporting a total for information is fine; using it as a reason is not.
- `bun run card --deck` is still run on every edit — but for **legality and colour identity**
  (§1.5), not for the price column.
- In `deck.json`, a card's `cards[name].status` **defaults to `PROXY` when absent** — leave it
  unset unless there is a reason. `OWNED` is for cards the user has actually said they own
  (`bun run deck:meta <slug> --card "Name" --status OWNED`); `BUY` and `CONSIDERING` are the other
  two values. There is no 💰 marker any more.
- The real constraints that remain are **bracket, colour identity, the role skeleton, and the
  pod** — not money.

---

## 1. The rules that are not negotiable

These exist because each one was violated at real cost. They are ordered by how much damage
breaking them did.

### 1.1 Verify, never recall

**Every card claim goes through `bun run card "<name>"`. Every rules claim goes through
`rules/sections/`**: a ruling the ledger already holds, re-checked against the rules it cites (lookup
shows no ⚠), or a fresh answer from `mtg-rules-expert` for a new interaction, a ⚠ ruling, or one the
pilot disputes.

This is rule one because recalling instead of checking put a fabricated "free-cast" clause on
**Apex of Power** into four documents and cost the user a real game. The card says *"you may
**cast** spells from among them"* — you pay normally. Nothing about a card is too well-known to
check; the cards that feel most familiar are the ones you'll misremember.

Corollary: **when the user pushes back on a card, re-read the oracle text before defending your
position.** Every contested call in the Scarlet Witch build that the user won was one where the
actual text contained something not in the recalled version — most sharply **Return the Favor**,
whose copy mode has no *"you control"* clause and can therefore copy an opponent's spell.

### 1.1b A past verdict is evidence, not a ruling — re-derive it

**Facts keep. Verdicts expire.** Split every prior note into the two, and treat them differently:

| | Examples | Lifetime |
|---|---|---|
| **Facts** | A CR citation · oracle text · a price · a measured count ("0 of 10 ran a storm card") | Durable. Cite and reuse. |
| **Verdicts** | "X is better than Y here" · "weakest card in the deck" · "0/6 field, cut it" · "outlets are capped" | **Perishable.** They were true *of a list that has since changed.* |

A verdict is a function of the deck around it. Every swap changes that deck, so every swap silently
invalidates some verdicts. The Edgar list re-derived **Sorin** and found the "8-card 5-drop tier"
that justified it had shrunk to two targets; it re-derived **Captivating Vampire** and found a use
(steal → sacrifice as removal) the original evaluation never considered; and it re-derived
**Sangromancer**, which a prior pass had ranked below the MV4 band before Anowon existed to feed it.

So:

- **Never cite a prior verdict as a reason.** "Evaluated and passed", "already settled",
  "don't re-litigate" are not arguments. Say instead: *"Settled 2026-08-03 on the grounds that
  X, Y, Z — X and Y still hold, Z no longer does."* If you can't name the grounds, you have no
  finding, only a memory.
- **Re-read the oracle text on both sides of every comparison, every time.** Cheap; `bun run card`
  is one call. Pattern-matching a card from its gist is the single most reliable predictor of being
  wrong (see Corrections).
- **Re-score every *cut* against the post-package board**, not the pre-package one. A card can look
  redundant while the same swap package is adding its payoff.
- **When the user questions a call, re-derive it from scratch.** Do not defend it from the notes —
  the notes are what you're checking.

Look up the *facts* (`bun run lookup`). Re-derive the *verdicts*.

### 1.2 Cost the card out in *this deck's* mana before comparing anything

Printed mana cost is not what you pay. Apply the deck's actual reduction stack, then compare.

Two calls flipped on this and one nearly went the wrong way:

- **Fire Servant** looked like a 39¢ steal until costed: {3}{R}{R} − Ruby = **4 mana**, exactly
  what Fiery Emancipation costs after Ruby + Longshot — and Emancipation *triples*. At equal cost
  the tripler wins outright.
- **Solphim vs Fiery Emancipation** — the "two mana cheaper" argument was wrong. Longshot reduces
  *noncreature* spells, so it applies to the enchantment and **not** to the creature. The real gap
  was one mana, and the tripler lets X be smaller, which pays the mana back on the payoff.

Watch the reducer's exact wording: *red spells* (Ruby Medallion, all spells) vs *noncreature
spells* (Longshot, Artist's Talent) vs *instants and sorceries MV 4+* (The Scarlet Witch). They
cover different sets and stack differently on each card.

### 1.3 Check the card against your own board before adding it

Symmetric and self-hitting effects are the most-missed failure mode. Ask: *what in my own deck
turns this off, and what does this turn off in my own deck?*

- **Token chump-blockers** die to your own Fiery Confluence (1 damage to each creature, taken
  three times) and Chandra's Ignition ("each *other* creature"). You'd be building blockers with
  one hand and burning them with the other.
- **Whispersilk Cloak** grants *shroud*, which stops **you** targeting your own commander — it
  turns off every pump and Chandra's Ignition. Hexproof only.
- **Blasphemous Act** was the only sweeper that killed the commander the whole mana engine runs
  through.
- **Manaform Hellkite**'s token scales with mana *actually spent*, so the deck's own cost
  reduction shrinks it.

### 1.4 Never hand-maintain anything derivable

Compute it. The Bracket 3 → Bracket 4 swap list drifted **three separate times** while it was
hand-edited; it stopped drifting the moment it was diffed from the two files by script. Same
lesson, second form: in the Markdown era the sideboard lived in **three** places (`DECK.md`,
`SIDEBOARD.md`, `pdf.json`) with three different counts, and the `DECK.md` copy still listed two
cards as sideboard material two days after they were moved into the 100.

**One source of truth; everything else is a pointer.** If two files must both carry a fact,
generate one from the other or reconcile them in the same edit. Today the list lives only in
`deck.json`; `MOXFIELD*.txt` is generated from it and `research/sideboard.md` is prose about it.

### 1.5 Snapshot, then validate

Read a list with `bun run deck:show <slug> [--list <id>]`. Change it with **`bun run deck:edit`**
— it is the snapshot: every apply writes the list it replaces to `versions/`, appends a line to
`history.jsonl`, and regenerates `MOXFIELD*.txt`, so there is no "copy the file first" step to
forget. Prefer it over hand-editing `deck.json`; `--dry-run` previews the stat deltas without
writing.

```bash
bun run deck:edit <slug> --label "<label>" --why "<grounds>" \
    --add "New Card@Section" --remove "Old Card" --replaces "Old Card->New Card"
bun run card --deck <slug> [--list <id>]   # legality + colour identity (defaults to the commanders')
bun run deck:pdf <slug> [list-id]          # regenerate, or the PDF silently lies
```

`MOXFIELD*.txt` is **derived from `deck.json`** — never hand-edit it. It is the same §1.4 trap as
the swap list and the sideboard: a second copy of the 100 that drifts the moment it is maintained
by hand. If you did hand-edit `deck.json` (a new pool list, a rename), run
`bun run deck:moxfield <slug>` afterwards, because only the apply path regenerates it for you.

Also check the `deck:show` stats footer for **every `"kind": "deck"` list still totalling 100** —
the CLI prints the total after each apply, and a variant list that nobody re-ran drifts silently.

---

## 2. How to decide

### 2.1 Role skeleton, never a ranked list

Ranking a whole deck is useless — comparing a land to a win condition is meaningless, and the
Scarlet Witch build stalled for a full pass trying. What works:

1. Assign **target slot counts per role** (lands / ramp / draw / removal / protection / payoffs).
2. Count what's actually in each role.
3. **Only compare cards within an over-subscribed role.**
4. **Rank every card in that role, in a table, before naming a cut.**

This immediately isolated win conditions (11 against a target of 8) as the sole bloated role and
made every cut obvious. Use it every time a deck is over the limit.

**Step 4 is not optional.** Nominating one card out of a group is how the wrong one gets cut.
Edgar had four Vampire lords; Stromkirk Captain was nominated for the cut without Markov Baron ever
being put beside it. Side by side the answer flips — Stromkirk grants **the whole team first
strike**, while Baron's lifelink is on itself alone and its madness is dead in a deck with no
discard outlet. The real (unstated) reason for the nomination was *castability*, not power.

The table has one row per card in the role and one column per rider, scored **against the current
list**. If a rider needs an enabler, write down whether that enabler is in the deck right now.

### 2.2 Measure the field before committing to an archetype

The Scarlet Witch deck was nearly built as a storm deck. Measuring the sample decks showed
**0 of 10 ran a single traditional storm card**, which redirected the whole build to big-mana
haymaker. One script beat a confident assumption.

Field signal, once a sample exists: **4+/6 comparable decks = consensus staple** (strong keep);
**0/6 = personal tech or a trap** — judge on merit, don't auto-cut.

**EDHREC is the second instrument on this axis** (`bun run edhrec` — commands in
`decks/README.md`). A local sample stays primary when one exists (it was curated for this
deck's power level and archetype); EDHREC is always available: `--deck` cross-references the
whole list against the commander's page (inclusion % + synergy per card) and ranks the
high-synergy cards the deck *doesn't* run — the idea-generation lens. Read it with its biases
named:

- **Popularity is evidence, not a verdict** — §1.1b applies to the crowd too. High inclusion
  means "the field found this good in the *average* build of this commander"; it knows nothing
  about this deck's mana, bracket, or plan. Low inclusion on a card this deck's own math likes
  is not a cut.
- It **averages across brackets and budgets**, and **lags new sets** — the page's New Cards
  list is the early-adoption view.
- It substitutes for **no** verification: oracle text still goes through `bun run card` (§1.1),
  costs still get re-derived in this deck's mana (§1.2), self-hits still get checked (§1.3).

No signal at all (no sample, commander too new or obscure on EDHREC) → say so and skip the
lens rather than inventing one.

### 2.3 Say which axis is driving the call

State the deciding factor explicitly, because most bad calls are the right analysis on the wrong
axis. The Emancipation reversal turned on **resilience** (an enchantment survives a format full of
creature removal) after two rounds arguing about **mana**. Arcane Bombardment beat Improvisation
Capstone on **where the cards come from** — graveyard (already spent, no loss) versus library
(permanently loses whatever you can't cast) — not on rate.

### 2.4 Argue, then defer

The user asks for friction on purpose ("argue back if you feel confident"). Give the real
counter-argument once, with evidence. Then respect the call — it's their deck, and a card being
fun is a legitimate reason.

Be honest that **the user has won most contested calls.** The pattern in every loss was one of
three things: a clause missed in the oracle text, the wrong axis weighted, or a card filed in the
wrong role (Jaya's Immolating Inferno was dismissed as "a fourth X-spell" when it is the deck's
**second table-killer**). When you feel most certain, check those three first.

### 2.5 "Redundant" is not a cut reason — in singleton, access is the scarce thing

**Corrected 2026-09-09 by the pilot, after this rule was over-applied three times in one build.**
In a 100-card singleton deck, one copy of an effect is no guarantee you ever draw it. A second card
doing the same job is **consistency**, not waste: it roughly doubles how often the deck has the
effect available at all, and it is insurance against the first being answered. **Never cut a card
with "we already have one of these."**

The real test is two questions, in order:

1. **How load-bearing is the effect?** If the plan needs it to win or to survive, more copies is
   correct *even when they do not stack*.
2. **What does the surplus copy cost once you have the first?** Sort it into one of three:
   - **Substitute** — non-stacking but interchangeable (a second double-strike granter, a second
     cost reducer, a second unblockable enabler). The surplus copy costs almost nothing; it is a
     spare key. **Run both.**
   - **Blank** — does nothing without a payoff you may not have. A bare *multiplier* is the classic
     case: it needs something to multiply, so two can be two dead cards. This is the **only** case
     where "one is right, two is greedy" holds, and even then only where payoff density is low.
   - **Genuinely multiplicative** — they commute and stack cleanly (ledger
     repl-001). Run as many as the curve allows.

So the phrase to reach for is never "redundant." It is *"this is a blank alongside the first,
because X"* — and if you cannot name X, there is no argument for the cut.

---

## 3. Writing it down

Every deck carries the same documentation shape (see `decks/README.md` for the full layout). The
non-obvious parts:

- **`deck.json`** is the list. Read it with `bun run deck:show`, change it with `bun run deck:edit`
  (its `--why` becomes the history line's rationale — put the grounds there, not just the label),
  and keep per-card tags / status / notes in `cards[name]` via `bun run deck:meta`. Never write a
  `DECK.md` or `STATUS.md`; they no longer exist.
- **`research/decisions.md`** is append-only. Never rewrite history; add a dated entry. Include
  what was **rejected and why**, not just what was taken. Record the rejection as **the grounds,
  not the verdict** — *"passed because the deck had 6 sac outlets and 21 cards at MV4+"* beats
  *"passed, do not re-litigate."* Grounds can be re-checked; a bare verdict can only be obeyed.
  **Never write "do not re-litigate."** Per §1.1b the next reader's job is to re-derive, and the
  entry's value is handing them the grounds to test.
- **`research/sideboard.md`** carries the "displaces" card for every entry, so a swap is never
  ambiguous. (The cards themselves may also sit in a `"kind": "pool"` list in `deck.json`.)
- **`research/gameplan.md`** is for the pilot: hold-lists, sequencing, scenarios.
  **`research/formulas.md`** is for the math.
- Log **corrections** in the decision log, plainly. The Apex correction is more valuable than
  most of the card choices around it.

### 3.1 Every upgrade pass gets a proposal artifact — and it is updated, never re-created

The pilot reads proposals on a published page, not in chat scrollback (*"i'm afraid to use the chat
there and lose history"*). **One artifact per deck, updated in place for the life of that deck.**

The split is the §1.4 rule again: the **grounds** are hand-written, **everything else is generated.**

| File | Who writes it |
|---|---|
| `decks/<slug>/research/proposal.json` | **You.** Waves, swaps, the deciding axis, the grounds, the interaction list, the self-hit cost, and the passed-over cards with reasons. |
| `decks/<slug>/artifact/proposal.json` + `img/` | **`bun run deck:proposal <slug>`.** Oracle text, mana cost, P/T, salt, inclusion %, Game Changer status, card art, and the current/approved/projected deck stats — all from `deck.json` and the caches. |
| `decks/<slug>/artifact/index.html` | Written once per deck, then left alone. |

The loop for any swap conversation:

1. Edit `research/proposal.json` — add a wave, or move a wave's `status`.
2. `bun run deck:proposal <slug>` — regenerates data and pulls any new card art.
3. Republish the artifact **to the same URL** (`url` from a different conversation; the same
   `file_path` within the one that created it). Never publish a second artifact for the same deck.
4. Only after the pilot approves, run `bun run deck:edit` and set that wave to `"applied"`.

`status` per wave drives the page and the maths: `proposed` (on the table), `approved` (pilot said
yes, not yet applied), `applied` (in `deck.json`), `declined` (kept visible with its reason — the
record of what was considered is the point). The stat rail shows **current → projected** across
every non-declined wave, so the pilot sees what the whole package does to the curve, the role counts
and the Game Changer budget before agreeing to any of it.

Two things this catches that chat does not: a package that quietly raises average mana value (the
Chatterfang pass moved it 2.73 → 3.00, which is exactly the "too slow" complaint it was meant to
fix), and a role skeleton going out of balance (§2.1) while you are looking at individual cards.

**One thing it did not catch, so state these by hand.** Average MV alone hid a real regression —
report **MV ≤ 2 and MV ≤ 3 counts** beside it, because that is what a win-turn estimate actually
reads, and name the realistic cast cost of any `{X}` spell, which every tool counts at its printed
mana value. Each swap carries an optional `verdict` (`kept` / `reverted` / `pending`) with
`verdictWhy`, set after the list has been played or measured — that is how the page stays a record
of what was learned rather than only what was proposed. `compareTo` in the proposal file names a
second deck (the playtest fork) whose stats are **measured from its own `deck.json`**, never
projected.

Each deck's artifact URLs live in its section of `decks/_notes.md`, so a future session can find
the page without re-publishing.

---

## 4. The capture protocol — this is what makes it learn

**Before you finish any session that produced a durable lesson, file it in the ledger.**

Durable means it would change a future decision on a *different* card or a *different* deck.
Deck-specific choices go in that deck's `research/decisions.md` instead.

Capture when any of these happen:

| Trigger | Kind |
|---|---|
| A rules interaction was verified against the CR | ruling |
| An evaluation heuristic proved itself (or failed) | pattern |
| A card was rejected for a transferable reason | pattern |
| You got something wrong, or the user overrode you and was right | correction |
| A tooling or process failure | correction, in `tooling-and-process.md` |

**Where it goes:** the topic file that owns the subject (`ledger/INDEX.md` lists them). Run
`bun run lookup` first: when an entry already states the fact, extend that entry with the new case,
example, source and date instead of writing a second one.

**Entry format** — strict, so lookups and the indexes work (`bun run ledger:index --check` and the
test suite enforce it):

```markdown
### <Short title> {#<file prefix>-<next free number>}

**Kind:** ruling · **Verified:** <YYYY-MM-DD> against CR <version in rules/meta.json>
**Cards:** every card named, Scryfall spelling, front face only, separated by `; `
**Rules:** every CR number cited, ascending
**Claim:** one sentence.
**Evidence:** CR citation, oracle text, or the measurement.
**Changes:** what a future decision should do differently.
**Source:** deck slug (date) / what prompted it.
```

A pattern or correction uses `**Kind:** pattern · **Recorded:** <YYYY-MM-DD>` (or `correction`).
Drop the Cards or Rules line when there are none. Add new entries at the end of the topic file, then
run `bun run ledger:index` to refresh `INDEX.md` and `CARDS.md`.

Rules for the ledger:

- **Keep the record of a mistake.** When an entry turns out wrong, correct it in place and add a
  `**History:**` line with what it used to claim, when, and why it changed. The pre-split
  `LEDGER.md` is kept whole in `ledger/archive/`.
- **One fact per entry.** No omnibus entries.
- **Cite or don't claim.** An entry with no CR number, no oracle quote, and no measurement is a
  hunch, and hunches are what the ledger exists to replace.
- **A ruling names the rules version it was checked against.** After a rules update,
  `bun run lookup` marks each older ruling ✓ (none of its cited rules changed) or ⚠ (re-check them).
  Re-verify a ⚠ entry before relying on it, then update its Verified line.
