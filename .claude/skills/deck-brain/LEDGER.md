# Deck Brain — Ledger

Append-only. Every entry is a fact that should change a future decision. Format and rules in
`SKILL.md` §4. Grep this before reasoning from scratch.

Seeded 2026-08-06 from the Edgar Markov and Scarlet Witch builds.

---

# Verified rulings

Each of these was checked against `rules/sections/` or oracle text. Cite the number, not the memory.

### Replacement effects are ordered by the AFFECTED player — 2026-08-06

**Claim:** When two or more replacement effects want to modify the same damage event, the player
being dealt the damage chooses the order. For damage aimed at an opponent, **they** choose, and
they will always choose the order that hurts them least.
**Evidence:** CR 616.1 — *"the affected object's controller (or its owner if it has no controller)
or the affected player chooses one to apply."*
**Changes:** This decides every damage-booster comparison. Work out the two orders and assume the
opponent picks the minimum.

- **Multiplier × multiplier — stacks cleanly.** Multiplication commutes, so order is irrelevant.
  A doubler and a tripler are genuinely 6×.
- **Floor + multiplier — does NOT stack.** Ojer Axonil (floor of 4) with Fiery Emancipation
  (triple), on a 2-damage source: floor first is 2 → 4 → **12**; multiplier first is 2 → 6, and the
  floor no longer applies because 6 isn't less than 4 → **6**. They take 6, which is what the
  multiplier does alone. **A floor contributes zero alongside a multiplier.**
- **Additive + multiplier — nets out ahead.** Torbran (+2) with the same tripler: +2 first is
  2 → 4 → 12; triple first is 2 → 6 → **8**. They take 8, still better than 6. An additive booster
  genuinely adds, and it also applies to damage already far above any floor.

**Source:** scarlet-witch, Ojer Axonil evaluation.

### Free-casting an X-spell forces X = 0; cost reduction does not — 2026-08-04

**Claim:** Casting a spell with {X} in its cost while paying neither its mana cost nor an
alternative cost that includes X locks X at 0. Cost *reduction* is unaffected, even to zero.
**Evidence:** CR 107.3b, quoted nearly verbatim.
**Changes:** Three distinct categories, and they are constantly confused:

- **True free-casts force X = 0** — "without paying its mana cost." Never point these at an
  X-spell.
- **Cost reducers are fine.** A commander that reduces cost by its power, a Medallion, a Class
  level — all fine, X is whatever you announce.
- **Alternative costs that *include* X are fine.** Escape and flashback are alternative costs
  (CR 702.34a / 702.138a), and if the printed cost contains {X} you still choose and pay X.
  Escaping a Crackle with Power at full size is legal and correct.

**Source:** scarlet-witch. Caused the deck's worst documentation error — see Corrections.

### Mana value is not what you paid — 2026-08-06

**Claim:** Cost reduction never changes a spell's mana value. Anything keyed to MV reads the
printed/announced value.
**Evidence:** Oracle behaviour; MV is a characteristic, reductions modify the cost paid.
**Changes:** Cuts both ways and both directions came up in one session. In favour: Prismari
Pianist's "mana value 5 or greater" clause still triggers off discounted spells. Against:
Manaform Hellkite's token is sized by *mana actually spent*, so a discount **shrinks** it. Read
which one a card uses before evaluating it.
**Source:** scarlet-witch, token-maker evaluation.

### The postcombat main phase happens whether or not you attack — 2026-08-02

**Claim:** You always get a second main phase, with no attack required.
**Evidence:** CR 500.1 — *"Each of these phases takes place every turn, even if nothing happens
during the phase."*
**Changes:** Enables the two-stage turn for any "at the beginning of your postcombat main" payoff
(Neheb, the Eternal): burn precombat, collect in the postcombat main, spend it there. Pass through
combat without attacking.
**Source:** scarlet-witch.

### Mana empties only at end of step/phase, so "don't lose unspent" banks across turns — 2026-08-04

**Claim:** A card saying *"you don't lose unspent red mana as steps and phases end"* means that
mana persists **indefinitely, across turns**, until spent.
**Evidence:** CR 500.5 — end of step/phase is the only thing that empties a pool, so removing that
one trigger removes all of them. Same pattern as Omnath, Locus of Mana.
**Changes:** Reframes the manabase in a mono-colour deck. Every land becomes a battery under such
an effect, and **coloured mana is strictly better than colourless** — colourless empties normally.
Combined with colour-hungry costs and devotion, this is why the deck ran 21 basics over utility
lands.
**Source:** scarlet-witch. The user raised the colourless-vs-coloured point first and was right.

### One instance of "target" can't hit the same thing twice — 2026-08-02

**Claim:** Within a single instance of the word "target," the same object or player may only be
chosen once. Across *different* instances of the word, the same target may be reused.
**Evidence:** CR 601.2c — *"The same target can't be chosen multiple times for any one instance of
the word 'target'."*
**Changes:** Caps burst damage from "X damage to each of up to three targets" spells at three
distinct targets — you cannot stack all three on one player.
**Source:** scarlet-witch, Jaya's Immolating Inferno.

### Copies inherit X and every other choice — 2026-08-02

**Claim:** A copy of a spell copies all decisions made for it, including the value of X, modes and
targets (targets may then be changed if the copy effect says so).
**Evidence:** CR 707.10.
**Changes:** Copy effects on a big X-spell are full-value, which is why copiers rate as high as a
second X-spell. Note the copy **isn't cast**, so cast-triggers don't fire.
**Source:** scarlet-witch.

### Modal spells with a repeated mode deal separate damage instances — 2026-08-06

**Claim:** "Choose three, you may choose the same mode more than once" resolves that instruction
that many times, as separate events.
**Evidence:** Fiery Confluence taking "2 damage to each opponent" three times is 2+2+2 as three
events, not one 6.
**Changes:** Matters enormously with per-instance boosters — a floor or additive effect applies to
**each** instance separately. Also means such a spell is three chances to be modified, not one.
**Source:** scarlet-witch.

### Dies-triggers look back; "whenever you gain life" does not — 2026-07-31

**Claim:** Leaves-the-battlefield abilities trigger even if the source died in the same event.
Triggers keyed to *gaining life* require the permanent to survive.
**Evidence:** CR 603.10a for the look-back list.
**Changes:** In a board wipe, Blood Artist and Cruel Celebrant still trigger; Marauding
Blight-Priest and Vito do **not**. Changes which drain pieces you count on through a wipe.
**Source:** edgar-markov.

### Anthems apply as a creature enters, before ETB triggers check it — 2026-07-31

**Claim:** A token is never on the battlefield unmodified. Static buffs are applied simultaneously
with entry; "enters with a counter" effects are replacement effects, so they also apply on entry —
but *triggered* counter-adders land afterwards.
**Evidence:** CR 611.3c (continuous effects apply as it enters, before trigger checks) and
CR 614.1d ("[This permanent] enters…" effects are replacement effects).
**Changes:** Distinguishes Vampire Socialite (replacement — counts for power-based checks on
entry) from Cathars' Crusade (triggered — never affects the ETB check that just happened).
**Source:** edgar-markov.

### Simultaneous lifelink sources are separate life-gain events — 2026-07-31

**Claim:** Multiple lifelink sources dealing damage at once cause separate life-gain events; one
source hitting many things is a single event.
**Evidence:** CR 702.15e.
**Changes:** Determines how many times a "whenever you gain life" payoff triggers off an alpha
strike.
**Source:** edgar-markov.

### Toughness 0 ignores indestructible — 2026-07-31

**Claim:** A creature with toughness 0 or less goes to the graveyard as a state-based action;
indestructible and regeneration don't save it.
**Evidence:** CR 704.5f.
**Changes:** −X/−X wipes beat the indestructible protection package. Pick protection accordingly:
phasing outclasses conditional indestructible against them.
**Source:** edgar-markov.

### Eminence triggers on cast, from the command zone — 2026-07-31

**Claim:** Eminence works from the command zone and keys off **casting**.
**Evidence:** Oracle text of the eminence keyword.
**Changes:** Reanimation and "put onto the battlefield" effects miss it entirely. Every creature
*spell* is two entry triggers, which is what makes cast-count payoffs scale.
**Source:** edgar-markov.

---

# Evaluation patterns

Heuristics that earned their place by changing a real decision.

### Role skeleton beats ranked lists — 2026-08-02

**Claim:** To cut a deck to size, assign target slot counts per role, then compare **only within**
an over-subscribed role.
**Evidence:** Ranking the whole Scarlet Witch list produced nothing usable for a full pass;
switching to role targets isolated win conditions (11 vs a target of 8) immediately.
**Changes:** Default method for any "we're over 100" problem. Never rank a whole deck again —
comparing a land to a win condition is meaningless.
**Source:** scarlet-witch.

### Measure the sample field before committing to an archetype — 2026-07-30

**Claim:** Check what comparable decks actually run before accepting the archetype label.
**Evidence:** The Scarlet Witch deck was about to be built as storm. **0 of 10** sample decks ran
a single traditional storm card. The build became big-mana haymaker instead.
**Changes:** Write the script, count the field, then commit. One measurement beat a confident
assumption about the whole deck.
**Source:** scarlet-witch.

### Field signal thresholds — 2026-07-31

**Claim:** With a comparable-deck sample: **4+/6 = consensus staple** (strong keep); **0/6 =
personal tech or a trap**, judge on merit rather than auto-cutting.
**Evidence:** Used throughout both finalizer passes; Captivating Vampire was kept on a 3/3 signal
after an earlier plan to cut it.
**Changes:** Apply it as one lens among several, and **say so and skip it** when no sample exists
rather than inventing a number.
**Source:** edgar-markov, scarlet-witch.

### One multiplier is right, two is greedy — 2026-08-04

**Claim:** A damage/token multiplier does nothing alone; it needs a payoff. The second one is a
second potential blank.
**Evidence:** Fire Servant, Solphim and Ojer Axonil were each rejected as second multipliers.
Redundancy in **payoffs** is good — the deck deliberately runs two table-killers.
**Changes:** Before adding a second multiplier, ask whether it stacks *multiplicatively* with the
first (fine — they commute) or is a floor/additive (check the ordering rule above).
**Source:** scarlet-witch.

### A card that requires attacking is dead in a deck that doesn't attack — 2026-08-04

**Claim:** Filter the whole candidate pool by whether its trigger condition ever happens.
**Evidence:** Backdraft Hellkite and Dreadhorde Arcanist both rejected on this alone. The mirror
image: Silent Arbiter's "no more than one creature can attack" is nearly one-sided *because* you
never attack.
**Changes:** Check the trigger condition against the deck's actual behaviour before evaluating
power level.
**Source:** scarlet-witch.

### Coloured mana beats colourless in a mono-colour deck, by more than it looks — 2026-08-04

**Claim:** A land producing 1 colourless is strictly worse than one producing 1 of your colour.
**Evidence:** Colour-hungry costs ({R}{R} or more on 25 of 66 nonland cards), devotion, **and**
the banking interaction above, which only applies to coloured mana. A utility land must buy
something a basic can't to justify the slot.
**Changes:** Default to basics. Each nonbasic must name what it buys. Also: reject life-cost lands
in a colour with no lifegain and a deck already bleeding 15–25 a game.
**Source:** scarlet-witch. Raised by the user.

### Check the enabling synergy still exists after the cut that removed it — 2026-08-04

**Claim:** When card A was justified by synergy with card B, and B gets cut, re-derive A.
**Evidence:** Ramunap Ruins was proposed for its Desert synergy in the same pass that cut
Scavenger Grounds — the only other Desert. It had to be walked back.
**Changes:** After any cut, scan for cards whose stated justification referenced it.
**Source:** scarlet-witch.

### One-shot rituals belong to explosive-turn decks only — 2026-06

**Claim:** A one-shot ritual spends a card for a one-time mana gain, then is a dead draw.
**Evidence:** Dark Ritual rejected for Edgar (Bracket 3 midrange grind wanting card advantage and
repeatable mana) and accepted for Scarlet Witch (one explosive turn). Same card, opposite verdicts.
**Changes:** Ritual evaluation is entirely archetype-dependent. Never carry the verdict across
decks.
**Source:** edgar-markov, scarlet-witch.

### Prefer the permanent answer over the one-shot when the role is structural — 2026-08-06

**Claim:** Where a deck has a *structural* weakness rather than a card-specific one, a permanent
that taxes or caps beats an instant that answers one thing once.
**Evidence:** Abrade (MV 2, undiscounted, 3 damage) traded for Kazuul, which taxes every attacker
for the rest of the game.
**Changes:** Diagnose whether the gap is "I lose to *this card*" (one-shot answer) or "I lose to
*this pattern*" (permanent). Only the second justifies the slot.
**Source:** scarlet-witch.

### Name the deciding axis out loud — 2026-08-04

**Claim:** State which factor drove a call, because most bad calls are good analysis on the wrong
axis.
**Evidence:** Fiery Emancipation vs Solphim was argued twice on **mana** and decided on
**resilience**. Arcane Bombardment vs Improvisation Capstone was decided on **where the cards come
from** (graveyard = already spent, no loss; library = permanent loss), not rate.
**Changes:** Every recommendation names its deciding factor. It also makes the user's counter-
argument possible, which is the point.
**Source:** scarlet-witch.

### Card advantage is the stat most often under-built — 2026-06

**Claim:** Measure draw against comparable decks explicitly; it is the most commonly deficient
category.
**Evidence:** Edgar had 3 draw sources against premium decks' 8–12, and six were added.
**Changes:** Count draw against the field early, before payoff optimisation.
**Source:** edgar-markov.

---

# Corrections

Mistakes, root causes, and the guard that prevents a recurrence. Never delete these.

### Fabricated a free-cast clause on Apex of Power — 2026-08-04

**What happened:** Claimed Apex of Power forces X = 0, in **four** documents. Its actual text is
*"you may **cast** spells from among them"* — no "without paying" clause. You pay normally, which
is why it adds ten mana. The user hit this in a real game.
**Root cause:** Recalled the card instead of pulling it, then propagated the error by citing my own
documents.
**Guard:** `bun run card` before any claim about a card, no matter how familiar. The real Apex risk
is different and is now documented: anything you don't cast **that turn** stays exiled permanently.

### Hand-maintained a derived list; it drifted three times — 2026-08-04

**What happened:** The Bracket 3 → Bracket 4 swap list was hand-edited and fell out of sync with
the two decklists on three separate occasions.
**Root cause:** Maintaining by hand a fact that is computable from two files.
**Guard:** Diff the two files by script every time. Never write a derived list by hand.

### The same content in three files produced three different counts — 2026-08-06

**What happened:** The sideboard lived in `DECK.md`, `SIDEBOARD.md` and `pdf.json`, claiming 20,
20 and 24 while actually holding 22, 26 and 24. The `DECK.md` copy still listed Fiery Emancipation
and Hit the Mother Lode as sideboard cards two days after both were moved into the 100.
**Root cause:** Duplication with no generation step.
**Guard:** One source of truth, everything else a pointer. When a count appears in a header,
verify it against the contents programmatically — header counts drift silently.

### Assumed a file format instead of checking it — 2026-08-03

**What happened:** `scripts/deck-pdf.ts` parsed decklists with `/^\d+ /` (digit, space) while the
repo convention is `1x Card Name`. It matched zero cards and produced a blank first page.
**Root cause:** Assumed the format rather than reading `decks/README.md` or `lib/decklist.ts`.
**Guard:** Read the existing parser before writing a second one. The regex is now a shared named
constant with a comment tying it to `lib/decklist.ts`.

### Under-read oracle text on a card the user was defending — 2026-08-05

**What happened:** Dismissed **Return the Favor** as a redundant third redirect. Its copy mode has
no *"you control"* clause — it's the only card in the deck that can copy an **opponent's** spell,
or an activated/triggered ability. Bolt Bend was the correct cut instead.
**Root cause:** Pattern-matched a card into a role from its half-remembered gist.
**Guard:** When the user pushes back on a card, **re-read the full oracle text before defending**.
This is the single most reliable predictor of being wrong.

### Filed a card in the wrong role and cut it on that basis — 2026-08-04

**What happened:** Jaya's Immolating Inferno was sidelined as "a fourth X-spell behind Crackle,
Storm King's Thunder and Electrodominance." But Storm King's Thunder is a *copier* and
Electrodominance hits **one** target. Jaya's is the deck's **second table-killer**.
**Root cause:** Grouped by card template ("X-spell") rather than by function.
**Guard:** Classify by what a card *does in this deck*, not by its type line or cost template.

### Called a sorcery a defensive card — 2026-08-02

**What happened:** Described Insurrection as part of the defensive package. It's a **sorcery** and
cannot be cast in response to an attack.
**Root cause:** Reasoned about the effect without checking the timing.
**Guard:** For anything claimed as an answer, check the card type first. A defensive package made
entirely of sorceries can only pre-empt, never respond — which is exactly the gap that later
justified a permanent.

### Wrote a destructive glob without a guard — 2026-08-03

**What happened:** Ran `rm -f "$SP"/*.png`. It was verified afterwards to have deleted nothing
unexpected, and the command was unnecessary anyway (`qlmanage` overwrites), but the pattern is
unsafe if the variable is ever unset.
**Root cause:** Convenience cleanup with no guard.
**Guard:** `${VAR:?}` on any interpolated path in a destructive command, and prefer writing to a
fresh subdirectory over deleting.

### Broke a template literal with backticks inside a CSS comment — 2026-08-03

**What happened:** Put backticks around a CSS selector inside a comment that was itself inside a
JS template literal, terminating the literal and breaking PDF generation for both decks.
**Root cause:** Markdown habits inside a code string.
**Guard:** No backticks inside template literals. Regenerate **both** decks' PDFs after touching
shared tooling — the Edgar regression is what caught it.

### Argued the wrong side and the user's counter-argument won — 2026-08-04

**What happened:** Defended Solphim over Fiery Emancipation on "two mana cheaper, no friendly
fire, has a body." All three were wrong or minor: the gap was one mana (Longshot reduces
noncreature spells, so it applies to the enchantment but not the creature), the triple lets X be
smaller and pays the mana back, and an enchantment survives a format that runs far more creature
removal.
**Root cause:** Compared on the cheapest-to-measure axis (mana) rather than the deciding one
(resilience).
**Guard:** Before defending a position twice, ask which axis actually decides it. See "Name the
deciding axis out loud."
