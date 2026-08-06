---
name: deck-brain
description: The accumulated decision-making method and knowledge base for this repo's Magic decks. Read this BEFORE answering any Magic question or making any deck decision — card evaluation, cuts, swaps, upgrades, rules interactions, manabase calls, bracket questions, "should I run X", "is the deck final", "what about card Y". It carries the verified rulings, the evaluation patterns, and the mistakes already made so they aren't made twice. It is also APPEND-ONLY LEARNING — every session that produces a durable lesson writes it back into LEDGER.md before finishing.
---

# Deck Brain

The method and the memory behind every deck in `decks/`. Two files:

- **`SKILL.md`** (this file) — *how to decide*. Stable. Changes rarely.
- **`LEDGER.md`** — *what we've learned*. *Append-only.* Grows every session.

**Read `LEDGER.md` before you reason about a card.** It is grep-friendly — search the card
name, the rule number, or the pattern name before working anything out from scratch. Half the
questions that come up have already been settled once, and re-deriving them is how contradictions
get introduced.

---

## 1. The rules that are not negotiable

These exist because each one was violated at real cost. They are ordered by how much damage
breaking them did.

### 1.1 Verify, never recall

**Every card claim goes through `bun run card "<name>"`. Every rules claim goes through
`rules/sections/`** (grep it, or dispatch `mtg-rules-expert`).

This is rule one because recalling instead of checking put a fabricated "free-cast" clause on
**Apex of Power** into four documents and cost the user a real game. The card says *"you may
**cast** spells from among them"* — you pay normally. Nothing about a card is too well-known to
check; the cards that feel most familiar are the ones you'll misremember.

Corollary: **when the user pushes back on a card, re-read the oracle text before defending your
position.** Every contested call in the Scarlet Witch build that the user won was one where the
actual text contained something not in the recalled version — most sharply **Return the Favor**,
whose copy mode has no *"you control"* clause and can therefore copy an opponent's spell.

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
lesson, second form: the sideboard lived in **three** places (`DECK.md`, `SIDEBOARD.md`,
`pdf.json`) with three different counts, and the `DECK.md` copy still listed two cards as
sideboard material two days after they were moved into the 100.

**One source of truth; everything else is a pointer.** If two files must both carry a fact,
generate one from the other or reconcile them in the same edit.

### 1.5 Snapshot, then validate

Before a destructive edit: `cp DECK.md versions/YYYY-MM-DD-<label>.md`.
After any change to a list:

```bash
bun run card --deck decks/<slug>/DECK.md --id <colors>   # legality + colour identity + price
bun run deck:pdf <slug>                                   # regenerate, or the PDF silently lies
```

Also verify **section headers match their contents** and **both bracket lists still total 100** —
header counts drift silently.

---

## 2. How to decide

### 2.1 Role skeleton, never a ranked list

Ranking a whole deck is useless — comparing a land to a win condition is meaningless, and the
Scarlet Witch build stalled for a full pass trying. What works:

1. Assign **target slot counts per role** (lands / ramp / draw / removal / protection / payoffs).
2. Count what's actually in each role.
3. **Only compare cards within an over-subscribed role.**

This immediately isolated win conditions (11 against a target of 8) as the sole bloated role and
made every cut obvious. Use it every time a deck is over the limit.

### 2.2 Measure the field before committing to an archetype

The Scarlet Witch deck was nearly built as a storm deck. Measuring the sample decks showed
**0 of 10 ran a single traditional storm card**, which redirected the whole build to big-mana
haymaker. One script beat a confident assumption.

Field signal, once a sample exists: **4+/6 comparable decks = consensus staple** (strong keep);
**0/6 = personal tech or a trap** — judge on merit, don't auto-cut. No sample → say so and skip
the lens rather than inventing one.

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

### 2.5 Redundancy in payoffs is good; redundancy in multipliers is not

A multiplier alone does nothing — it needs a payoff to multiply. Two multipliers is two potential
blanks. **One is right, two is greedy** — *unless* both are genuinely multiplicative, in which
case they commute and stack cleanly (see LEDGER §Replacement-effect ordering).

---

## 3. Writing it down

Every deck carries the same documentation shape (see `decks/README.md` for the full layout). The
non-obvious parts:

- **`research/decisions.md`** is append-only. Never rewrite history; add a dated entry. Include
  what was **rejected and why**, not just what was taken — the rejections are what stops the same
  card being re-litigated in three weeks.
- **`SIDEBOARD.md`** carries the "displaces" card for every entry, so a swap is never ambiguous.
- **`research/gameplan.md`** is for the pilot: hold-lists, sequencing, scenarios.
  **`research/formulas.md`** is for the math.
- Log **corrections** in the decision log, plainly. The Apex correction is more valuable than
  most of the card choices around it.

---

## 4. The capture protocol — this is what makes it learn

**Before you finish any session that produced a durable lesson, append it to `LEDGER.md`.**

Durable means it would change a future decision on a *different* card or a *different* deck.
Deck-specific choices go in that deck's `research/decisions.md` instead.

Capture when any of these happen:

| Trigger | Goes to |
|---|---|
| A rules interaction was verified against the CR | `LEDGER.md` → **Verified rulings** |
| An evaluation heuristic proved itself (or failed) | `LEDGER.md` → **Evaluation patterns** |
| You got something wrong | `LEDGER.md` → **Corrections** |
| The user overrode you and was right | `LEDGER.md` → **Corrections** |
| A card was rejected for a transferable reason | `LEDGER.md` → **Evaluation patterns** |
| A tooling or process failure | `LEDGER.md` → **Corrections** |

Entry format — keep it strict so the file stays greppable:

```markdown
### <Short title> — <YYYY-MM-DD>

**Claim:** one sentence.
**Evidence:** CR citation, oracle text, or the measurement.
**Changes:** what a future decision should do differently.
**Source:** deck slug / what prompted it.
```

Rules for the ledger:

- **Append, don't rewrite.** If an entry turns out wrong, add a new entry that supersedes it and
  edit the old one to say `SUPERSEDED by <title>` — never delete the record of the mistake.
- **One fact per entry.** No omnibus entries.
- **Cite or don't claim.** An entry with no CR number, no oracle quote, and no measurement is a
  hunch, and hunches are what this file exists to replace.
- If `LEDGER.md` passes ~600 lines, split it into `rulings.md` / `patterns.md` / `corrections.md`
  and leave `LEDGER.md` as an index.
