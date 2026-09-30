# Ledger: Deck construction

Building the list as a whole: the role skeleton, field signal (sample decks and EDHREC), brackets and Game Changers, curve and win-turn measurement, mana and colour, commander choice and archetypes. Entry format and capture rules: `../SKILL.md` §4.
Search every topic at once with `bun run lookup "<card | rule number | term>"`.

---

### One-shot rituals belong to explosive-turn decks only {#build-001}

**Kind:** pattern · **Recorded:** 2026-06
**Cards:** Dark Ritual
**Claim:** A one-shot ritual spends a card for a one-time mana gain, then is a dead draw.
**Evidence:** Dark Ritual rejected for Edgar (Bracket 3 midrange grind wanting card advantage and
repeatable mana) and accepted for Scarlet Witch (one explosive turn). Same card, opposite verdicts.
**Changes:** Ritual evaluation is entirely archetype-dependent. Never carry the verdict across
decks.
**History:** Narrowed on 2026-08-21 (eval-025): in a deck that banks mana (Electro, Ashling, the Omnath pattern, Kruphix, Horizon Stone, Upwelling) or copies its rituals, a ritual is early-game ramp with a delayed spend. The explosive-turn-only rule holds only when the mana can't be kept.
**See also:** eval-025
**Source:** edgar-markov, scarlet-witch (2026-06).

### Card advantage is the stat most often under-built {#build-002}

**Kind:** pattern · **Recorded:** 2026-06
**Claim:** Measure draw against comparable decks explicitly; it is the most commonly deficient
category.
**Evidence:** Edgar had 3 draw sources against premium decks' 8–12, and six were added.
**Changes:** Count draw against the field early, before payoff optimisation.
**See also:** build-032
**Source:** edgar-markov (2026-06).

### Measure the sample field before committing to an archetype {#build-003}

**Kind:** pattern · **Recorded:** 2026-07-30
**Cards:** The Scarlet Witch
**Claim:** Check what comparable decks actually run before accepting the archetype label.
**Evidence:** The Scarlet Witch deck was about to be built as storm. **0 of 10** sample decks ran
a single traditional storm card. The build became big-mana haymaker instead.
**Changes:** Write the script, count the field, then commit. One measurement beat a confident
assumption about the whole deck.
**See also:** build-004, build-009
**Source:** scarlet-witch (2026-07-30).

### Field signal thresholds {#build-004}

**Kind:** pattern · **Recorded:** 2026-07-31
**Cards:** Captivating Vampire
**Claim:** With a comparable-deck sample: **4+/6 = consensus staple** (strong keep); **0/6 =
personal tech or a trap**, judge on merit rather than auto-cutting.
**Evidence:** Used throughout both finalizer passes; Captivating Vampire was kept on a 3/3 signal
after an earlier plan to cut it.
**Changes:** Apply it as one lens among several, and **say so and skip it** when no sample exists
rather than inventing a number.
**See also:** build-003, build-009
**Source:** edgar-markov, scarlet-witch (2026-07-31), both finalizer passes.

### Role skeleton beats ranked lists {#build-005}

**Kind:** pattern · **Recorded:** 2026-08-02
**Claim:** To cut a deck to size, assign target slot counts per role, then compare **only within**
an over-subscribed role.
**Evidence:** Ranking the whole Scarlet Witch list produced nothing usable for a full pass;
switching to role targets isolated win conditions (11 vs a target of 8) immediately.
**Changes:** Default method for any "we're over 100" problem. Never rank a whole deck again —
comparing a land to a win condition is meaningless.
**See also:** build-012, eval-012
**Source:** scarlet-witch (2026-08-02).

### Coloured mana beats colourless in a mono-colour deck, by more than it looks {#build-006}

**Kind:** pattern · **Recorded:** 2026-08-04
**Claim:** A land producing 1 colourless is strictly worse than one producing 1 of your colour.
**Evidence:** Colour-hungry costs ({R}{R} or more on 25 of 66 nonland cards), devotion, **and**
the banking interaction (the ruling "Mana empties only at end of step/phase, so 'don't lose
unspent' banks across turns"), which only applies to coloured mana. A utility land must buy
something a basic can't to justify the slot.
**Changes:** Default to basics. Each nonbasic must name what it buys. Also: reject life-cost lands
in a colour with no lifegain and a deck already bleeding 15–25 a game.
**See also:** build-024, cost-002
**Source:** scarlet-witch (2026-08-04). Raised by the user.

### Prefer the permanent answer over the one-shot when the role is structural {#build-007}

**Kind:** pattern · **Recorded:** 2026-08-06
**Cards:** Abrade; Kazuul, Tyrant of the Cliffs
**Claim:** Where a deck has a *structural* weakness rather than a card-specific one, a permanent
that taxes or caps beats an instant that answers one thing once.
**Evidence:** Abrade (MV 2, undiscounted, 3 damage) traded for Kazuul, which taxes every attacker
for the rest of the game.
**Changes:** Diagnose whether the gap is "I lose to *this card*" (one-shot answer) or "I lose to
*this pattern*" (permanent). Only the second justifies the slot.
**Source:** scarlet-witch (2026-08-06).

### Measure your own curve against the field BEFORE adding top-end {#build-008}

**Kind:** pattern · **Recorded:** 2026-08-06
**Claim:** "Is this getting too top-heavy?" is a measurement, not a judgement. Script the curve for
the deck and the comparison sample, then decide.
**Evidence:** Edgar was about to take four adds at MV3–6. Scripting the nonland curve against the
3-deck sample showed the deck was **already the heaviest in the field before the pass** — 24 cards
at MV≤2 against the field's 27/29/32, and 20 at MV4+ against 12/18/19. That reframed the whole
question: the adds weren't the problem, the existing list was. Two cards were held to the sideboard
and a standing "cheap-cards pass" was logged instead.
**Changes:** Report six numbers — the MV1–6+ buckets, MV≤2, MV4+ and average — for the deck and each
sample deck. Also check whether the field runs the mitigations you're relying on: **zero** Edgar
decks run cost reducers, so ours is real edge, but 2 cards in 99 is ~23% to see one by turn 5 — a
bonus, not a plan. Do not build a curve around a card you usually don't have.
**See also:** build-032, build-042
**Source:** edgar-markov (2026-08-06). The user asked the question; the script answered it.

### Price-tier the sample field BEFORE counting card frequency — land slots included {#build-009}

**Kind:** pattern · **Recorded:** 2026-08-07
**Cards:** Darksteel Forge; Portal to Phyrexia; Blightsteel Colossus; The Lord of Pain; Bloodstained Mire; Marsh Flats; Polluted Delta; Arid Mesa
**Claim:** Mixing budget and unconstrained decks into one frequency count doesn't just add noise —
it can **inverse** the signal, because budget lists systematically over-represent whatever is cheap
in a role and under-represent the expensive cards that define the archetype. The same
budget-weighting hides lands: an EDHREC land list under-rates fetchlands on price, not play.
**Evidence:** Across 7 Iron Man lists, the single $128 budget deck ran **22 Equipment and 3
artifacts at MV6+**, while all five unconstrained lists ($645–$1,369) ran **12–19 Equipment and
5–10 at MV6+**. Counted together, the budget outlier is the loudest voice for "pure Equipment
voltron"; counted separately, 5/5 of the real field is hybrid. The expensive cards it drops
(Darksteel Forge $46, Portal to Phyrexia $45, Blightsteel Colossus $39) are precisely the
archetype's payoffs.
**Changes:** Price every sample deck first, tier them, and compute field signal **only** within the
tier that matches the build's constraints. State n for that tier. A budget deck is evidence about
budgets, not about the archetype.
- **Land slots too (2026-08-23, lord-of-pain):** building a two-colour proxy manabase from the
  commander's EDHREC land list left out every off-colour fetchland, because they show at ~6%
  inclusion. The low number is price (they are $17–40 cards and the page is 85% Bracket 2–3), not
  play: any fetch that finds either of the deck's basic types fetches its shock/dual untapped and is
  a perfect dual. The Lord of Pain page: Bloodstained Mire 34%, Marsh Flats / Polluted Delta / Arid
  Mesa ~6%; bracket_counts on the average-deck JSON = 849 B2 / 576 B3 / 214 B4. For any proxy or
  unconstrained build, evaluate fetchlands explicitly and ignore their inclusion %; apply this
  price-tiering to the **land** slots too, not just spells.
**See also:** build-004, build-010, build-016
**Source:** iron-man (2026-08-07); lord-of-pain (2026-08-23, merged from "Took a manabase from the
EDHREC page and missed fetchlands — budget-weighted field signal, again"), caught when the user
asked "are there other duals left?".

### Improve the strongest single list; don't average the field {#build-010}

**Kind:** pattern · **Recorded:** 2026-08-07
**Claim:** When a sample contains one clearly-strongest list, use it as the base and make targeted
swaps. Building from "what most decks run" produces a list that is coherent with none of them.
**Evidence:** User's call, and the metrics backed it: the chosen base led its tier on tutors (8 vs
3–4), was near-top on counterspells (5 vs 3–6), had the best manabase, and was the only list with a
deliberate extra-combat package rather than a pile of individually-good cards. Averaging would have
kept the good cards and thrown away the package that made them work.
**Changes:** After measuring the field, rank the tier-matched decks on substance (interaction
count, tutor density, manabase, internal coherence) — **not price** — and check whether one
dominates. If one does, base + targeted swaps beats synthesis. Reserve synthesis for a flat field.
**See also:** build-009, build-012
**Source:** iron-man (2026-08-07), the user's call.

### A commander's own free-deployment trigger changes which tutors are good {#build-011}

**Kind:** pattern · **Recorded:** 2026-08-07
**Cards:** Tony Stark; Fabricate; Excalibur, Sword of Eden; Whir of Invention
**Claim:** When the commander puts permanents onto the battlefield **from hand** for free, tutors
that fetch **to hand** become better than tutors that fetch **onto the battlefield** — the reverse
of the normal ranking.
**Evidence:** Tony Stark's back face puts an artifact from hand onto the battlefield each combat,
free, and auto-attaches Equipment. Fabricate ({2}{U}, to hand) therefore deploys a {12} Excalibur
for two mana total, whereas Whir of Invention would need X=12.
**Changes:** Check where a tutor deposits the card against what the deck already deploys for free
before ranking tutors by rate. Same logic applies to any "cheat from hand" commander.
**See also:** build-014
**Source:** iron-man (2026-08-07).

### Compared cards head-to-head before counting roles, and nearly rebuilt a coherent deck into an average one {#build-012}

**Kind:** correction · **Recorded:** 2026-08-07
**Claim:** Justifying swaps card by card before building the role table makes a structural change
(moving a slot between roles) look like a quality upgrade, and nearly converted a committed deck
into the sample average.
**Evidence:** Proposed a 12-card swap package for a strong sample deck, justified card by card. The
user pushed back that the swaps "aren't 1-for-1, they serve different functions" — which was
exactly right: cutting a counterspell for a cost reducer is moving a slot between roles, not
upgrading a card. Building the role table afterwards showed the base deck's four biggest deviations
from the field (**most tutors, most extra combats, fewest creatures 10 vs 18.6, lowest cost
reduction 6 vs 9.2**) were **one deliberate decision** — it cheats artifacts into play instead of
casting them — and that the package would have moved creatures 10 → 14, converting a committed deck
into the sample average and making its own sweepers worse. Nine of twelve swaps were withdrawn.
Root cause: skipped SKILL.md §2.1 (role skeleton first, compare only within an over-subscribed
role) and went straight to card-vs-card, which makes structural changes look like quality upgrades.
**Changes:** Before proposing **any** swap to an existing list, build the role table and compare it to
the field. Then ask of each deviation: *is this a hole, or is it load-bearing?* A deck that deviates
from the field in several roles **in the same direction** is usually expressing one design decision,
not accumulating several mistakes. Name that decision out loud before touching anything, and treat
every swap that moves a role count as a structural change requiring its own justification.
**See also:** build-005, build-010
**Source:** iron-man (2026-08-07), the user's pushback. The single most valuable correction in the
ledger for evaluating *other people's* decks.

### "Protection" is not one role — creature protection does not cover the combat step {#build-013}

**Kind:** pattern · **Recorded:** 2026-08-19
**Cards:** Champion's Helm; Mithril Coat; Commander's Plate; Darksteel Forge; Deflecting Swat; Fierce Guardianship; Conqueror's Flail; Big Score
**Claim:** Hexproof, indestructible and protection-from-colour all protect the *creature*; none of
them stop the interaction that actually beats a voltron deck mid-swing. Count the two as separate
roles before calling a deck well-protected.
**Evidence:** iron-man's whole protection suite — Champion's Helm (hexproof), Mithril Coat
(indestructible), Commander's Plate (pro W/B/G), Darksteel Forge (indestructible artifacts), plus
one-shot Deflecting Swat / Fierce Guardianship — leaves **Fogs, flashed-in blockers, instant-speed
wipes, and counterspells on the deck's six combat spells** completely unanswered. Conqueror's
Flail's *"your opponents can't cast spells during your turn"* covers exactly that set and nothing
the others already cover. Its own limits are equally sharp: turn-limited, and **spells only**, so
activated abilities still resolve.
**Changes:** When the plan is one alpha strike, split the protection role into **"keeps the
creature alive"** and **"lets the swing resolve"**, and count each separately. A deck can be
saturated on the first and hold zero of the second — which is invisible if "protection" is scored
as a single number.
**See also:** eval-026, dmg-027
**Source:** iron-man (2026-08-19) — Conqueror's Flail over Big Score.

### Mono-red's to-hand tutor pool is two cards, and one is a Game Changer {#build-014}

**Kind:** pattern · **Recorded:** 2026-08-20
**Cards:** Ring of Three Wishes; Planar Portal; Gamble; Fervent Mastery; Inventors' Fair; Imperial Recruiter; Firemind's Foresight
**Claim:** A mono-red Commander deck has exactly two unconditional "search for a card, put it in
your hand" effects, and adding the better one is a Game Changer budget question before it is a
slot question.
**Evidence:** Scryfall `id<=r f:commander o:"search your library" -t:land` returns 114 cards;
classified, every hit is type-restricted (Goblin/Dwarf/Dragon/Elemental/Equipment/artifact/land/
creature-with-power-≤2) or a colourless 10–12-mana activation (Ring of Three Wishes {5}+{5},
Planar Portal {6}+{6}) except **Gamble** ({R}, any card, random discard) and **Fervent Mastery**
({3}{R}{R} sorcery, MV 5: up to three cards, then discard three at random). `is:gamechanger
id<=r` lists Gamble; Fervent Mastery, Inventors' Fair and Imperial Recruiter are not on it.
Firemind's Foresight is CI:RU — not legal in mono-red, despite reading as a red card.
**Changes:** When a mono-red deck asks for tutors, check the Game Changer count first (a Bracket 3
list at 3/3 must drop a GC to seat Gamble), then cost Fervent Mastery under the deck's MV-4+
reducers — it is the one tutor those reducers touch. Rank the random-discard tax against the
deck's own recursion before calling it a downside.
**History:** The same pass (2026-08-20, eval-024) corrected this entry's last line for hand-dumping decks: state the deck's typical hand size when the tutor would be cast. In a deck that empties its hand, Fervent Mastery's random-discard tax is the wrong shape however good the recursion is.
**See also:** build-011, build-025, eval-024
**Source:** scarlet-witch (2026-08-20) — the "should we add tutors" pass.

### Count the conversion layer before the mana layer in a spellslinger deck {#build-015}

**Kind:** pattern · **Recorded:** 2026-08-21
**Cards:** Longshot, Rebel Bowman; Fiery Inscription; Thor, God of Thunder; Urabrask; Ashling, Flame Dancer
**Claim:** In a deck whose plan is "cast spells, deal damage," the role that decides whether the
deck does anything before its big turn is the number of permanents that turn a cast spell into
damage to opponents (the *conversion layer*), not the number of mana sources or draw spells. Count
it as its own role and target enough of it that one is on the board by turn 4–5.
**Evidence:** Scarlet Witch pilot report 2026-08-21: "8+ turns doing nothing, then very strong."
The list had 54 of 99 slots making or discounting mana, 12 draw, and **5** converters (Longshot,
Fiery Inscription, Thor, Urabrask, Ashling); 6 of ~35 instants/sorceries dealt damage. With 5
converters in 99, P(at least one in the first 12 cards) = 1 − C(94,12)/C(99,12) ≈ **48%** — half the
games reach turn 5 with draw spells resolving into a board that converts none of them. 7 → 61%,
8 → 66%, 9 → 70%.
**Changes:** When a spellslinger pilot reports "nothing happens for N turns," count converters
first and compare to mana slots; the fix is moving slots from the mana role into converters and
cheap each-opponent burn, not adding more mana or draw. Re-derive any "pinger package is the wrong
deck" verdict against that count — the self-sweep grounds may hold for 2/2 bodies while the
conclusion is exactly the reported failure.
**Source:** scarlet-witch (2026-08-21) — pilot report "8+ turns doing nothing, then very strong";
`research/damage-pass-2026-08-21.md`.

### Theme-filter the EDHREC page when a pass moves a deck toward a sub-archetype {#build-016}

**Kind:** pattern · **Recorded:** 2026-08-21
**Cards:** Electrostatic Field; Kessig Flamebreather; Longshot, Rebel Bowman; Fiery Inscription; Electrodominance; Enraged Flamecaster; Desperate Ritual
**Claim:** When a pass is pushing a deck toward one of its commander's EDHREC sub-themes, run
`bun run edhrec commander "<name>" --theme <slug> --all` and read candidates against *that* list;
the base page averages the target sub-field away and under-rates exactly the cards the pass is
looking for.
**Evidence:** Scarlet Witch damage pass: base page (1,721 decks) vs Burn theme (64 decks) —
Electrostatic Field 13% → 22%, Kessig Flamebreather 9% → 17%, Longshot 36% → 47%, Fiery
Inscription 30% → 41%, Electrodominance 48% → 55%; Enraged Flamecaster (11% Burn) was absent from
the base page entirely; Desperate Ritual fell 27% → 17% (sharpening it as the weakest ritual to
cut). The user had to prompt for this lens; the first pass used only the base page and `--deck`.
**Changes:** Any pass that names a direction ("more burn", "more voltron", "more stax") pulls the
matching theme view first and reports both numbers. A card at 0% on the theme view too is
personal tech even when its math is right — say so. Absence from the base page is not absence
from the sub-field.
**See also:** build-023, tool-015
**Source:** scarlet-witch (2026-08-21) — `research/damage-pass-2026-08-21.md` §6; prompted by the
pilot.

### Glacial Chasm is a Game Changer — check the flag on lands too {#build-017}

**Kind:** correction · **Recorded:** 2026-08-23
**Cards:** Glacial Chasm
**Claim:** A re-derived Bracket 3 list picked up a fourth Game Changer because Glacial Chasm was
added as "just a land". Scryfall's `game_changer` flag (surfaced by `bun run card --json` and
counted by `bun run deckcheck`) is true for it.
**Evidence:** `bun run card "Glacial Chasm" --json` → `"gameChanger": true`; `deckcheck` on the B3
list reported 4 → Bracket 4+. Caught by re-running deckcheck on both lists after the edit.
**Changes:** Every add — lands and artifacts included — goes through deckcheck on **every** list
that carries it before the session ends; never assume the Game Changers list is spells-only.
**See also:** build-025, tool-005
**Source:** lord-of-pain (2026-08-23), lifegain pass.

### Rank commander candidates by "what does this do next turn, ALONE?" {#build-018}

**Kind:** pattern · **Recorded:** 2026-09-02
**Cards:** Inquisitor Greyfax; Derevi, Empyrial Tactician; Hylda of the Icy Crown
**Claim:** The commander is the only card you are guaranteed to have, so the first screen on any
commander choice is self-sufficiency — what it does the turn after it resolves with no other card.
A **payoff** commander with no built-in enabler is *more* draw-dependent than a conditional one,
which is the opposite of how it feels.
**Evidence:** Choosing between three tap/untap commanders. Inquisitor Greyfax: `{1},{T}: Tap target
creature an opponent controls. Investigate.` — complete engine, alone, every turn. Derevi, Empyrial
Tactician: one tap/untap per deployment, repeatable trigger gated on combat damage. Hylda of the Icy
Crown: *"Whenever **you tap** an untapped creature an opponent controls…"* — contains **zero**
ability to tap anything; on an empty board she is a 3/4 vanilla forever. The user's instinct ranked
Hylda as one of the two "immediately repeatable" options precisely because her payoff per trigger is
large.
**Changes:** Size of payoff is not self-sufficiency. Before comparing commanders on power, write the
one-line answer to "alone, next turn, this does ___" for each. Applies to any engine-vs-payoff
choice, not just commanders.
**Source:** inquisitor-greyfax (2026-09-02) — Greyfax over Hylda and Derevi.

### When a colour's case rests on one staple, check whether that staple is a Game Changer {#build-019}

**Kind:** pattern · **Recorded:** 2026-09-02
**Cards:** Seedborn Muse; Murkfiend Liege; Glare of Subdual; Rhystic Study; Smothering Tithe; Cyclonic Rift; Unwinding Clock
**Claim:** A bracket-capped deck should price a colour by *what it uniquely adds after the Game
Changer tax*, not by its reputation. A single GC staple can be most of a colour's argument, and at
Bracket 3 it costs a third of the budget.
**Evidence:** Green's case for a tap/untap deck is essentially Seedborn Muse, Murkfiend Liege and
Glare of Subdual. `is:gamechanger` (54 cards) returns **Seedborn Muse**. At the Bracket 3 cap of 3,
it competes head-on with Rhystic Study / Smothering Tithe / Cyclonic Rift. The colourless
replacement, Unwinding Clock (*"Untap all artifacts you control during each other player's untap
step"*), is **not** a Game Changer and untaps the deck's actual tappers, which are artifacts.
**Changes:** When a colour-inclusion argument names 2–4 specific cards, run `is:gamechanger` over
them before committing to the colour. A GC-taxed staple plus a colourless near-equivalent often
collapses the case for the splash entirely.
**See also:** build-025, build-035
**Source:** inquisitor-greyfax (2026-09-02) — dropping green for black in an Esper vs Bant decision.

### Measure creature power before claiming a combat kill — and count UNBLOCKABLE power in a deck that taps blockers {#build-020}

**Kind:** pattern · **Recorded:** 2026-09-02
**Cards:** Merieke Ri Berit; Stalking Assassin; Esper Sentinel; Fatestitcher; Vizier of Tumbling Sands; Spider-Woman, Secret Agent; Elesh Norn, Grand Cenobite; Inquisitor Greyfax
**Claim:** "The board attacks and wins" is an assertion, not a plan: count actual power against the
120 life a four-player pod represents, and count how many creatures are engine parts rather than a
clock. Raw creature power only measures a clock when the defender can block — in a tap-down deck
the denominator is "damage that connects", and small utility bodies stop being a liability.
**Evidence:** An Esper tap/untap deck read as having a fine combat kill — 28 creatures. Pulling
power/toughness for every one gave **69 total power**, with **12 creatures at power ≤ 2** (both
assassins, Merieke Ri Berit, Stalking Assassin, Esper Sentinel, Fatestitcher, Vizier of Tumbling
Sands, Spider-Woman…). A realistic seven-creature board is ~14 power — about nine unopposed swings
to kill one table. Re-derived with blockers tapped: a realistic seven-creature board is ~22
power, **+6 from Inquisitor Greyfax's own "other creatures you control get +1/+0"** = **28
unblockable**, or ~34 under Elesh Norn. That is a two-swing kill on one opponent, not the nine
swings the raw count implied.
**Changes:** In any engine/toolbox deck, creature *count* is not a clock: utility bodies with
`{T}` abilities are 1/1s. Run the power count before writing a "how the game ends" note, and size
the Win Conditions role from that number rather than from a default of 3. It also reprices anthems
— an anthem over twelve small utility bodies (Elesh Norn, +2/+2 and −2/−2) is a combo piece, not
a fatty.
- Measuring is right, but raw power is the wrong denominator in a deck that taps blockers. Before
  adding fatties to a deck that can deny blocks (tappers, stun, "can't block", evasion granters),
  ask whether the bottleneck is *power* or *connecting*. If it is connecting, the correct additions
  are **enablers** (mass-tap, mass-evasion), not multipliers — a multiplier only doubles damage you
  could already deal. Also count the commander's own anthem clause; a `+1/+0` across six bodies is
  +6 that is easy to overlook.
**History:** On 2026-09-02 this ledger judged the Esper tap/untap list to have a weak combat kill
on 69 raw power ("about nine unopposed swings to kill one table"); corrected the same day because
with blockers tapped the realistic board connects for ~28 unblockable power, a two-swing kill on
one opponent.
**Source:** inquisitor-greyfax (2026-09-02) — "how do we win with this deck?"; inquisitor-greyfax
(2026-09-02, merged from "Count UNBLOCKABLE power, not raw power, in a deck that taps blockers") —
the user's "if we're tapping people's cards we can always connect on damage."

### In a commander build-off, hold the shell constant {#build-021}

**Kind:** pattern · **Recorded:** 2026-09-02
**Cards:** Sisay, Weatherlight Captain; Esika, God of the Tree
**Claim:** Comparing commanders is only meaningful if the 99 around them is the same wherever the
colours allow; otherwise the comparison measures five manabases and five removal suites at once.
**Evidence:** Four 5C God-tribal lists on one identical 69-card shell produced measurably
different decks purely from commander + God selection — avg MV **3.02** (Sisay, everything must
be fetchable) to **3.70** (Esika, everything should be cheat-worthy), devotion-gated Gods **5–11**.
Those deltas are attributable *because* the shell was fixed.
**Changes:** Build variants from shared part-files and an assembler (`research/parts/build.sh`)
so the shared portion cannot drift between variants (§1.4), then report the deltas as the result.
**See also:** build-022, tool-004
**Source:** god-tribal build-off (2026-09-02).

### Five-colour "God tribal" must count the devotion-gated Gods — they are enchantments there {#build-022}

**Kind:** pattern · **Recorded:** 2026-09-02
**Cards:** Morophon, the Boundless; Sisay, Weatherlight Captain; Purphoros, God of the Forge; Iroas, God of Victory; Kruphix, God of Horizons; Jodah, the Unifier
**Claim:** 25 of the 95 commander-legal Gods are Theros-style enchantment creatures that are only
creatures at devotion ≥5 (mono) or ≥7 (two-colour). In a five-colour pile that threshold is
rarely met, so each one is an indestructible enchantment with a static, not a body.
**Evidence:** `t:god t:enchantment legal:commander` = 25; `-t:enchantment` = 70. The Morophon
list, pushed multicolour by its reducer, carried **11** of them; Sisay's carried 6.
**Changes:** For any multicolour God deck, report the devotion-gated count next to the God count,
and value those cards on their static text (Purphoros's ETB damage, Iroas's damage prevention,
Kruphix's mana bank) rather than their P/T. Tribal anthems and Jodah-style "legendary
*creatures*" effects skip them entirely.
**See also:** build-021
**Source:** god-tribal build-off (2026-09-02).

### EDHREC under-rates a mono-colour banker because the field doesn't bank {#build-023}

**Kind:** pattern · **Recorded:** 2026-09-03
**Cards:** Leyline Tyrant; The Vision and Scarlet Witch; Birgi, God of Storytelling; Electro, Assaulting Battery; Braid of Fire
**Claim:** Leyline Tyrant sits at 8% on The Vision and Scarlet Witch's page (278 decks) while
Birgi (63%) and Electro (76%) lead — yet Tyrant is the only one of the three whose bank has no
"until end of turn" clause *and* no colour-fizzle risk, and the pilot's stated plan is "bank mana."
The crowd builds the commander as one-turn storm, so a cross-turn bank looks like a do-nothing
4-drop to it.
**Evidence:** EDHREC base/burn/storm views 2026-09-03 (Tyrant 8 / – / –; Braid of Fire 6%); oracle
text of Tyrant, Birgi (*"Until end of turn, you don't lose this mana"*), Electro.
**Changes:** When the pilot's plan names a mechanic the field's average build doesn't use (banking,
tapping, edicts), read the low-inclusion cards for that mechanic explicitly instead of trusting the
page order — same family as "Theme-filter the EDHREC page" (2026-08-21) and "Ranked a hate piece on
average text" (2026-09-03).
**See also:** build-016, tool-015
**Source:** vision-scarlet-witch (2026-09-03) — founding build.

### In a power-discount deck the kill turn is bounded by COLOURED PIPS, not mana {#build-024}

**Kind:** pattern · **Recorded:** 2026-09-08
**Cards:** Storm King's Thunder; Jaya's Immolating Inferno; Seething Song; Sol Ring; Nykthos, Shrine to Nyx; War Room; Rogue's Passage; Tyrite Sanctum; Forge of Heroes; Storm-Kiln Artist; Ashling, Flame Dancer; Electro, Assaulting Battery; Urabrask; The Vision
**Claim:** Once the commander's power exceeds the generic of the next spell, each further spell
costs only its coloured pips; chain length is the count of red sources, and colourless mana
cannot extend it.
**Evidence:** Storm King's Thunder → Jaya's Immolating Inferno is {R}{R}{R} + {R}{R} whether the
chain deals 21 or 1,378. Seething Song ({2}{R} → {R}{R}{R}{R}{R}) is +4 red pips when its {2} is
paid with Sol Ring; Sol Ring, Nykthos' base ability, War Room, Rogue's Passage, Tyrite Sanctum and
Forge of Heroes pay for nothing in the chain. Storm-Kiln Artist (*"cast or copy"*) and Ashling's
magecraft fire per copy, so under a ×8 copy they are nine Treasures / nine loots; Electro,
Urabrask and The Vision refund one pip per cast.
**Changes:** For the kill turn count red sources, not total mana; rank rocks by colour; score
per-spell engines as pip refunds and copy-triggered ones (Storm-Kiln, Ashling) above cast-only
ones. Companion to "Coloured mana beats colourless in a mono-colour deck" (2026-08-04), which
argued from banking; this is the stronger reason.
**See also:** build-006, cost-017, eval-036
**Source:** scarlet-witch (2026-09-08) — turn-5 chain investigation.

### The Game Changer count usually makes a list Bracket 4 — but bracket is how reliably the deck wins {#build-025}

**Kind:** pattern · **Recorded:** 2026-09-08
**Cards:** Underworld Breach; Lion's Eye Diamond; Grim Monolith; Mana Vault; Chrome Mox; Mox Diamond; Gamble; Reiterate; Mana Geyser; Ancient Tomb; Persistent Petitioners
**Claim:** When asked why an existing list is Bracket 4, compute the Game Changer count first: a
cap of three is the constraint most lists actually break, while infinite combos and mass land
denial are rarer and often absent entirely. But the hard criteria are a **floor** that forces a deck
upward, not a measure of power — a deck that wins on a fixed early turn every game is Bracket 4
with zero Game Changers.
**Evidence:** scarlet-witch `DECK-B4.md` vs `DECK.md`, diffed by script: the 17-card swap added six
Game Changers (Underworld Breach, Lion's Eye Diamond, Grim Monolith, Mana Vault, Chrome Mox, Mox
Diamond) plus Gamble, on top of the base list's three — **ten against a cap of three**. Its only
two-card infinite (Reiterate + Mana Geyser, buyback {3} for five mana copying a Geyser that adds
six or more) is a *chosen-N* loop, which this pilot does not count as an "automatic or unstoppable"
infinite (2026-09-06). So the combo was never the deciding factor; the count was.
Wizards' own text for Bracket 4 is about power and consistency ("Bring out your strongest decks and
cards", "explosive starts, strong tutors, cheap combos"), and a deck that wins on a fixed early
turn every game belongs there regardless of what its card list trips.
**Changes:** Answer "what makes this Bracket 4?" with `is:gamechanger` over the diff before
reaching for combo analysis, and say which of the three B3 constraints (GC cap, mass land denial,
chained extra turns, early two-card infinites) each card actually trips. Check the flag on lands
and cheap rocks too — Ancient Tomb, Chrome Mox and Mox Diamond are all flagged.
- **Refined 2026-09-16:** answer "what bracket is this?" in two parts, always: (1) the hard
  criteria that set a floor, and (2) the honest power read — what turn does it win, how
  consistently, and can the table interact with the plan. Never give (1) alone. The Game Changer
  count is a diagnosis heuristic for an existing list, not a definition of bracket.
**History:** On 2026-09-16, asked whether a Persistent Petitioners deck would be Bracket 4, I
answered "Bracket 2 or 3" because the entire mill core carries zero Game Changers, presenting the
hard criteria (GC cap, two-card infinites, mass land denial, chained extra turns) as the definition.
Corrected the same day by the pilot: *"an engine is actually more important to what qualifies as a
bracket 4 than what GCs you're running. you can have 0 GCs and win every single time on turn 5,
that's not a bracket 3 deck, that's a bracket 4 deck."*
**See also:** build-017, build-019, build-035, tool-005
**Source:** scarlet-witch (2026-09-08) — the pilot's "what is the main difference that's making it
bracket 4?"; cap-living-legend (2026-09-16, merged from "Bracket is how reliably the deck wins, not
its Game Changer count") — Petitioners deck bracket question.

### Count the payoffs stacked on one enabler before adding another — name the dependency out loud {#build-026}

**Kind:** pattern · **Recorded:** 2026-09-09
**Cards:** Unwinding Clock; Insight Engine; Surestrike Trident; Mind's Eye; Goblin Engineer; Fabricate; Padeem, Consul of Innovation; Darksteel Forge; Goblin Welder
**Claim:** When several adds are each justified by the same single permanent, the deck has
acquired a concentration risk that no individual evaluation shows. Before the third such add,
count them, name the enabler, and check how many ways the deck can find and protect it.
**Evidence:** iron-man V3 justified Insight Engine (four activations a cycle instead of one),
Surestrike Trident (three shots a cycle instead of one), and Mind's Eye (payable at all under the
pilot's mana rule) on Unwinding Clock — one {4} artifact. The first two degrade gracefully without
it (once per turn); Mind's Eye degrades to "hold {1}s on their turns," which the deck's own rule
forbids. The count was only made explicit on the third add, by which point the deck had also cut
one of its two Clock-finders (Goblin Engineer). Named as the residual risk; Fabricate, Padeem,
Darksteel Forge and Goblin Welder recorded as the find/protect/recur set.
**Changes:** Keep a running "depends on" note per engine card in the deck's decisions log. When an
add's grounds start with "with X out…", write the count of cards already resting on X, and grade
the add by how it plays *without* X — "once per turn" is acceptable, "dead under the mana rule" is
a real cost that must be named.
**Source:** iron-man (2026-09-09) — Mind's Eye into V3.

### EDHREC inclusion % is PER CARD, never co-occurrence — it can't tell you if one deck runs both {#build-027}

**Kind:** pattern · **Recorded:** 2026-09-09
**Cards:** Sword of War and Peace; Mjölnir, Hammer of Thor; Swords to Plowshares; Path to Exile; Generous Gift
**Rules:** 702.16d
**Claim:** Two inclusion percentages from the same commander page are not evidence about the same
list — "69% run A and 51% run B" is fully consistent with almost no deck running both. Any argument
of the form *"the field runs this anti-synergy, so it must be fine"* — or *"the field is wrong"* — is
unsupported by the numbers on their own.
**Evidence:** `bun run edhrec` reports per-card inclusion and synergy against the commander's deck
pool; there is no pairwise or conditional statistic in the output. Worked case: Sword of War and
Peace (69%) grants protection from red and unattaches Mjölnir, Hammer of Thor (51%, a {3}{R} card)
under CR 702.16d — but the two percentages cannot say whether the overlap is 51% of decks or 5%.
**Related, verified same pass:** a protection-Equipment anti-synergy is **conditional, not fatal** —
CR 702.16d only fires while both are attached to the same creature. The real cost is "pick one per
turn," which is a dead-configuration cost, not a broken card. Weigh that against what the protection
buys: pro-red-and-white on a commander dodges Swords to Plowshares, Path to Exile, Generous Gift and
most red burn, *and* grants evasion — which is why the field runs it.
**Changes:** Never cite an inclusion percentage as evidence that two specific cards coexist, and
never cite one to claim the field has made a mistake. State the interaction from the CR, state
whether it is conditional or fatal, then decide on a named axis (§2.3). Here the axis was **which
protection Equipment the deck's own damage multiplier survives** — Mjölnir doubles Throw damage as
well as combat damage, unique to this build — and the answer flips in a combat-only list.
**See also:** equip-001
**Source:** captain-america (2026-09-09) — the pilot's "if they were really that problematic, how
come most decks are running it?"

### Presented an engine and a finisher as two mutually exclusive archetypes {#build-028}

**Kind:** correction · **Recorded:** 2026-09-09
**Claim:** I offered the pilot a choice between "Vehicles/Spacecraft beatdown" and "tap-trigger
value engine" as if they were alternatives. They are not — the second is the draw package the first
requires, and both were always going in the deck.
**Evidence:** The pilot answered the question with a question — *"so you think we should go with
either 1 or 2?"* — which is the tell that the options weren't actually disjoint. The built list
contains 10 tap-trigger draw cards and 13 Vehicles/Spacecraft; neither half was ever optional.
**Changes:** Before putting archetype options to the pilot, check that each one names a **different
answer to the same question**. Win-condition options must differ in *what kills*; engine options in
*what draws*. If two options would coexist in one list, they are role slots, not archetypes — say so
and ask about the top end instead.
**See also:** build-029
**Source:** cap-living-legend (2026-09-09), the pilot's "so you think we should go with either 1 or
2?".

### Dismissed an archetype as "weak" — the same error class as "redundant" {#build-029}

**Kind:** correction · **Recorded:** 2026-09-09
**Claim:** I described a token-flood spine as one where "the individual cards are weakest," which is
a bare verdict with no mechanism behind it, exactly what SKILL.md §2.5 forbids for "redundant."
**Evidence:** The pilot pushed back — *"3 you're saying can be weak?"* Re-derived, the real
statement is specific and falsifiable: the plan needs critical mass and a single wrath resets it.
That is a *resilience* claim, and it does not argue against the token-makers themselves, which are
the best crew and Station fuel in the deck because every token is another free tap.
**Changes:** "Weak," "win-more," "durdly" and "not good enough" are the same failure as "redundant."
Replace each with the mechanism — *"it needs N permanents and loses to one sweeper"*, *"it costs 4
and does nothing without a payoff"*. If you can't name the mechanism, there is no argument.
**See also:** build-028
**Source:** cap-living-legend (2026-09-09), the pilot's "3 you're saying can be weak?".

### Damage doublers are effectively red-only — outside red, amplify COUNTERS instead {#build-030}

**Kind:** pattern · **Recorded:** 2026-09-10
**Cards:** Inquisitor's Flail; Pyromancer's Gauntlet; Goblin Charbelcher; Lae'zel, Vlaakith's Champion; Prairie Dog; Aetheric Amplifier; Walking Ballista; Triskelion; Monoskelion; Iron Spider, Stark Upgrade; Steel Overseer; Prodigal Sorcerer
**Claim:** A non-red deck cannot build a damage-doubler plan; the non-red analogue is +1/+1-counter
amplification feeding a counter-to-damage converter.
**Evidence:** Scryfall, commander-legal, "double that damage" / "twice that much damage" / "that much
damage plus" / triple wording: 62 cards. Only 3 are W/U-legal — Inquisitor's Flail (combat damage,
one creature), Pyromancer's Gauntlet (red spells only), Goblin Charbelcher (not a doubler) — and all
three do nothing for pingers. The other 59 need red. Meanwhile white has real counter amplifiers
(Lae'zel, Prairie Dog, Aetheric Amplifier) and colourless has converters (Walking Ballista,
Triskelion, Monoskelion). Modelled in cap-living-legend: one Walking Ballista under Iron Spider +
Steel Overseer + Lae'zel with an opponent-turn untapper ≈ 20 damage per round, versus 5 per round
for a Prodigal Sorcerer.
**Changes:** When a pilot asks for "damage doublers" in a deck without red, say so immediately with
the measurement, then offer the counters route. Also: a `t:creature o:"{T}" o:"damage to"` search
is full of false positives — prevention text and "attacking or blocking creature" archers. Classify
by the target clause before counting the pool.
**Source:** cap-living-legend (2026-09-10) — pilot asked for a tap-pinger + doubler variant of an
Azorius deck.

### A deck's real fragility is often the TYPE of its finishers, not how many it draws {#build-031}

**Kind:** pattern · **Recorded:** 2026-09-10
**Cards:** Vandalblast; Austere Command; Farewell; Bane of Progress; Stark's Ingenuity; Wizard Class; Proft's Eidetic Memory; Iron Man, Armored Avenger; Lyla, Holographic Assistant
**Claim:** "What if we don't draw the win condition?" should be answered with a hypergeometric count
*and* a card-type audit. Density is usually fine; concentration of type is usually the real risk.
**Evidence:** cap-living-legend: 20 finisher-or-tutor cards in 99. Probability of seeing at least one
from natural draws alone (ignoring its 10 draw engines): 88% by turn 3, 91% by turn 4, 96% by turn 7.
But **13 of its 17 finishers are artifacts** — a single Vandalblast, Austere Command (artifact mode),
Farewell or Bane of Progress blanks the whole plan, and the commander (a 3/4) is the only
non-artifact threat left.
**Changes:** When a pilot worries about a narrow win plan, run both numbers. If density is high but
type concentration is high too, the fix is a **second axis of a different card type**, not more
copies of the same finisher. For a hedge against artifact hate, prefer enchantment-based engines
(Stark's Ingenuity, Wizard Class, Proft's Eidetic Memory) over artifact creatures that do the same
job (Iron Man, Armored Avenger; Lyla) — the artifact versions die to the same sweeper.
**See also:** build-034
**Source:** cap-living-legend (2026-09-10) — "what are the other win cons if we don't draw those? Cap
can't reliably attack."

### "Runs out of gas" is a card-flow problem — a cheaper curve makes it worse {#build-032}

**Kind:** pattern · **Recorded:** 2026-09-10
**Claim:** When a pilot says the deck runs out of cards mid-game, lowering the curve is the wrong fix:
cheaper cards spend the hand faster for almost no extra plays. Measure repeatable draw first.
**Evidence:** Edgar SACRIFICE, avg MV 2.90 (exactly the 6-deck field median), 20k-game goldfish.
Swapping 3 MV4–5 cards for 3 cheap Vampires: cards in hand at T5 3.76 → 3.61, at T8 2.94 → 2.76,
no spells in hand at T6 4.0% → 4.9%, spells cast by T8 8.4 → 8.6. An MV-neutral draw package instead
held T8 at 3.42. The deck had 7 repeatable draw engines, so P(at least one by turn 5) = 57% on the
play (hypergeometric, 99 cards): about 4 games in 10 had no engine at all.
**Changes:** On an out-of-gas complaint, report (1) the curve against the field, (2) repeatable draw
engines and P(>=1 by T5), noting which are conditional or sit at MV5+, before proposing anything. A
cheap card earns its slot on this axis only if it replaces itself (a cantrip body) or stays a live
topdeck late (a mana sink). Rummage effects (discard → draw, Blood tokens) are card-neutral and need a
card in hand, so they do nothing in the empty-hand state — see the hand-size guard in "Recommended a
hand-size-taxed tutor to a deck that empties its hand".
**See also:** build-002, build-008, build-033
**Source:** edgar-markov (2026-09-10) — pilot: "runs out of cards to play at about turn 5".

### A flood complaint is answered by spell//land MDFCs, not by cutting lands {#build-033}

**Kind:** pattern · **Recorded:** 2026-09-10
**Cards:** Agadeem's Awakening; Bloodghast
**Claim:** Swapping basics for spell//land MDFCs gives the flood profile of a lower land count while
keeping the land-drop rate of the higher one. Cutting a land buys very little flood relief for a
real cost in missed drops.
**Evidence:** 200k-game sim, 99 cards, on the play. 36 → 34 lands: hitting the turn-4 land drop 62.2%
→ 56.9%; five lands in a row across draws T2–T10 only 1.9% → 1.4%; late lands drawn 1.80 → 1.70
per five draws. 34 lands + 2 MDFCs: turn-4 land drop 61.9% (≈36) and 9+ lands in the first 17 cards
7.8% (better than 34). "Five in a row" at 36 lands is ~1 game in 50 — memorable, not structural.
**Changes:** When a pilot reports flood, quantify the run probability first, then prefer MDFC-for-
basic swaps. Rank MDFCs on the LAND face first (untapped for 3 life > always tapped), then the spell.
In cast-trigger decks, remember reanimation MDFCs (Agadeem's Awakening) put creatures onto the
battlefield — no cast triggers (see the Bloodghast correction, "Battlefield-recursion bypasses
cast-triggers; hand-recursion preserves them").
**See also:** build-032
**Source:** edgar-markov (2026-09-10) — "some games I only draw lands, like 5 in a row".

### Optimised taps-per-creature and filed sweepers under "trade-offs" — one T4-5 wipe ended the game {#build-034}

**Kind:** correction · **Recorded:** 2026-09-15
**Cards:** Extinguisher Battleship; Archivist; Captain America, Living Legend
**Claim:** DECK-ENGINE optimised the metric (value per creature on the board) instead of the
constraint (the board surviving to produce it), and a single turn 4–5 board wipe put it out of the
game.
**Evidence:** DECK-ENGINE maximised "creatures that use their second tap" (25/30) and listed
sweepers as a bullet under honest trade-offs. The pilot played it: *"takes so long to set up a usable
board only to get boardwiped on turn 4-5 and basically you're out of the game after that, especially
if captain america also got wiped and now he's in the command zone costing 5"* — and said it felt
Bracket 2. Measured afterwards: 32 creatures, 19 with toughness ≤2 and 15 with power ≤1; 24 of the 28
ramp/draw/utility cards were creatures; 4 real wipe answers; Extinguisher Battleship's ETB (4 damage
to each creature) killed every creature in the deck including the commander.
Cause: I optimised the metric (value per creature on the board) instead of the constraint (the
board surviving to produce it), and scored "Vehicles dodge sorcery-speed wipes" as resilience without
asking what crews them afterwards. Each engine piece was also weak alone (Archivist: a 4-mana 1/1).
**Changes:** For any board-dependent engine, before calling it done, write down the pod's wipe turn and
count (1) answers to a wipe, (2) noncreature sources of bodies or threats that survive one, and
(3) how much of the value engine is creatures. Then run §1.3 on every symmetric ETB in the list. See
"A crew-dependent win condition is only wipe-proof if its crew is".
**See also:** build-031, tap-017, equip-025
**Source:** cap-living-legend (2026-09-15) — pilot's play report on DECK-ENGINE.

### Bracket 2 allows zero Game Changers — dropping to B2 removes the cards that protect a fragile board {#build-035}

**Kind:** pattern · **Recorded:** 2026-09-15
**Cards:** Teferi's Protection; Fierce Guardianship; Cyclonic Rift
**Claim:** Commander Brackets: Brackets 1–2 exclude Game Changers; Bracket 3 allows up to three. The
repo's `deckcheck` only encodes the Bracket 3 cap.
**Evidence:** Wizards, "Introducing Commander Brackets Beta" (magic.wizards.com): Bracket 2 "Core" has
"no Game Changers, two-card combos, or mass land denial"; Bracket 3 "Upgraded" allows "up to three
Game Changers". `scripts/deckcheck.ts` line 40: `BRACKET_3_MAX_GAME_CHANGERS = 3`, printing "3 (or lower)".
**Changes:** When a pilot suggests "just make it Bracket 2" to fix a weak deck, list which Game Changers
the move removes first. It usually strips protection (Teferi's Protection, Fierce Guardianship) or a
reset (Cyclonic Rift), which makes a fragile deck worse, not more fairly matched.
**See also:** build-019, build-025
**Source:** cap-living-legend (2026-09-15) — pilot weighing B2 vs improving at B3.

### In a self-mill deck, count recursion by WHERE it can be cast from {#build-036}

**Kind:** pattern · **Recorded:** 2026-09-17
**Cards:** Raise the Past; Return to the Ranks; Sevinne's Reclamation; Dusk // Dawn; Jace, Wielder of Mysteries
**Claim:** Hand-only recursion (Raise the Past, Return to the Ranks) fails in exactly the situation a
self-mill deck creates: an empty hand and a full graveyard. Only recursion castable from the graveyard —
flashback (Sevinne's Reclamation), aftermath (Dusk // Dawn's Dawn half) — is load-bearing there.
**Evidence:** Oracle text. Raise the Past and Return to the Ranks have no graveyard-casting clause. Sevinne's
Reclamation: "Flashback {4}{W}", and "If this spell was cast from a graveyard, you may copy this spell."
Dawn: "Aftermath (Cast this spell only from your graveyard. Then exile it.) Return all creature cards with
power 2 or less from your graveyard to your hand." Once a library is empty, every card the player owns is in
hand, graveyard, on the battlefield or in exile — so a graveyard-castable recursion spell is guaranteed to be
reachable unless it has already been used.
**Changes:** When building a win-by-self-mill list, run at least two graveyard-castable recursion spells that
reach the win condition, and check each win piece's mana value and card type against them (a planeswalker
like Jace, Wielder of Mysteries is reachable by none of these).
**Source:** cap-living-legend (2026-09-17) — "can I start milling myself and pick them up from the
graveyard?"

### Replacing a commander: measure identity loss, page coverage and salt before arguing {#build-037}

**Kind:** pattern · **Recorded:** 2026-09-22
**Cards:** Edgar Markov; Chaos Warp; Infantry Shield; Purphoros, God of the Forge; Florian, Voldaren Scion; Shared Animosity; Stromkirk Captain; Vampire Socialite; Warleader's Call; Zurgo Stormrender; Elenda, the Dusk Rose; Edgar, Charmed Groom; Vito, Fanatic of Aclazotz; Elas il-Kor, Sadistic Pilgrim; Teysa Karlov; Olivia's Wrath; Anowon, the Ruin Sage
**Claim:** Three scripted measurements settle most of a "swap the commander, keep the deck" question
before any card argument: `bun run card --deck <list> --id <new identity>` (exactly which cards
leave), `bun run edhrec --deck <list> --commander "<candidate>"` (how much of the list that
candidate's field already runs), and `bun run edhrec card "<candidate>"` (salt).
**Evidence:** Edgar Markov (salt 2.05/4 — every candidate below is under 0.6) → Orzhov costs the
SACRIFICE list 13 cards (9 red lands, Edgar, Chaos Warp, Infantry Shield, Purphoros) and the live
list 19 (12 lands/Edgar + Florian, Chaos Warp, Purphoros, Shared Animosity, Stromkirk Captain,
Vampire Socialite, Warleader's Call). A Scryfall scan of all 37 exact-Mardu commanders found no
drain commander except Zurgo Stormrender (drains only when a *token* leaves while not attacking), so
the archetype's commanders are Orzhov. Coverage of the SACRIFICE list on each candidate's page:
Elenda 69/94 · Edgar, Charmed Groom 61/94 · Vito, Fanatic 56/95 · Elas il-Kor 49/95 · Teysa Karlov
49/95.
**Changes:** Run the three measurements first. The "keep all three colours" instinct was wrong here:
the drain half of a Mardu list was already Orzhov, and red was mostly mana. A non-Vampire commander
in a Vampire list also needs the SKILL §1.3 self-hit audit — Olivia's Wrath (−X/−X to each
non-Vampire) and Anowon (each player sacrifices a non-Vampire) both punish Elas / Teysa in the
command zone.
**See also:** build-038, build-039, build-040
**Source:** edgar-markov (2026-09-22) — lower-salt commander search.

### A commander swap must replace the commander's JOB — and only death-independent token makers replace a body-making job {#build-038}

**Kind:** correction · **Recorded:** 2026-09-22
**Cards:** Edgar Markov; Elas il-Kor, Sadistic Pilgrim; Teysa Karlov; Vito, Fanatic of Aclazotz; Bloodline Keeper; Charismatic Conqueror; Elenda, the Dusk Rose; Clavileño, First of the Blessed; Edgar, Charmed Groom; Carrier Thrall; Elspeth, Storm Slayer; Black Market Connections; Infantry Shield; Oketra's Monument; Bitterblossom; Ophiomancer; Sorin, Lord of Innistrad; Legion's Landing; Mavren Fein, Dusk Apostle; Pawn of Ulamog; Caesar, Legion's Emperor; Teysa, Orzhov Scion; Denethor, Ruling Steward; Doomed Traveler; Hunted Witness; Skullclamp; Deadly Dispute; Grim Haruspex; Midnight Reaper; Morbid Opportunist; Phyrexian Arena; Drivnod, Carnage Dominus
**Claim:** Before ranking replacement commanders, measure which half of the engine the old commander
supplied and check that the new commander or the 99 replaces that output; Edgar's job in the drain
list was the bodies, not the drain. In a sacrifice deck whose commander makes no bodies, only cards
that make tokens **without anything dying first** start the loop — "dies → leaves a token" bodies are
finite fodder, not engines.
**Evidence:** Asked for a lower-salt commander for the Edgar drain list, I ranked Orzhov *drain*
commanders (Elas il-Kor, Teysa Karlov, Vito Fanatic) on salt, identity loss and page coverage. The
pilot asked "how do we have token makers?" — and the measurement shows the drain was never Edgar's
job. The 99 drains; Edgar supplied the **bodies**. `bun run carddata --file DECK-SACRIFICE.md`: 33
of the 37 creature cards are Vampires, so eminence is 33 free 1/1 Vampire tokens per deck, one per
Vampire cast. With Edgar gone the list holds 9 creature-token sources (Bloodline Keeper, Charismatic
Conqueror, Elenda, Clavileño, Edgar Charmed Groom's Coffin, Carrier Thrall, Elspeth's +1, Black
Market Connections, Infantry Shield — the last is red and leaves) of which only Bloodline Keeper,
Elspeth and the Coffin repeat every turn. Every drain candidate I ranked adds zero bodies.
Recorded 2026-09-24: decks/teysa-karlov as founded had 14 "token engines", but only **6** made tokens
without a death (Bitterblossom, Ophiomancer, Oketra's Monument, Black Market Connections, Sorin,
Elspeth Storm Slayer), each making 1 per turn. Seven more were one-shot death-gated bodies. On the
other side, ~30 cards needed fodder: 11 drain payoffs, ~10 outlets, and 7 of the 9 card-draw cards
(Skullclamp, the Rites spells, Deadly Dispute, Haruspex, Reaper, Opportunist). Only Phyrexian Arena
and Black Market Connections draw with an empty board. Hypergeometric: 48% to see even one
death-independent maker by turn 3 on the draw. **Measured result: the pilot played 10 games and was
on turn 10 unable to do anything in all of them.**
**Changes:** Before ranking replacement commanders, write down what the old commander *produced per
game* (bodies, mana, cards, damage) and check that either the new commander or the 99 replaces that
output. Fodder engines that fill an eminence-sized hole in Orzhov: Oketra's Monument (token per
creature spell cast — the closest 99-card analogue to eminence), Bitterblossom and Ophiomancer (per
upkeep), Sorin, Lord of Innistrad and Legion's Landing // Adanto (Vampire tokens per turn), Mavren
Fein (per attack), Pawn of Ulamog (per nontoken death). Commanders that supply bodies themselves:
Caesar, Legion's Emperor (Mardu — two tokens per attack for one sacrifice, 98 of 99 cards unchanged),
Teysa, Orzhov Scion (Spirit per black creature death — 32 of the 37 creatures qualify), Edgar,
Charmed Groom (Coffin token per upkeep), Denethor (token per turn a creature died + drain outlet).
- **Refined 2026-09-24:** split the "token engines" role in two: cards that make tokens **without
  anything dying first**, and bodies that leave a token **when they die** (afterlife, Doomed
  Traveler, Hunted Witness). A list with too few of the first kind stalls however many payoffs it
  has. When building around a payoff-only commander (Teysa Karlov, Drivnod-style doublers), count
  death-independent token makers and aim for ~12 or more, including some that make 3+ bodies at
  once. Also count how many draw cards still work on an empty board. If fodder-gated draw is most of
  the draw suite, one wipe turns the deck off.
**History:** On 2026-09-22 this entry named the fodder engines that would replace Edgar's bodies;
corrected on 2026-09-24 because it was right about *what* to replace but counted the wrong things as
having replaced it — decks/teysa-karlov as founded had only 6 death-independent makers among its 14
"token engines", and the pilot was on turn 10 unable to do anything in all 10 games.
**See also:** build-037, build-039
**Source:** edgar-markov (2026-09-22) — the pilot's question "how do we have token makers?" caught
it; teysa-karlov (2026-09-24, merged from ""Dies → leaves a token" bodies are not token engines —
count death-independent makers separately") — pilot: "no reliable way to create tokens at all… on
turn 10 and I genuinely can't do anything."

### Score an aristocrats commander by which of the loop's three jobs it does from the command zone {#build-039}

**Kind:** pattern · **Recorded:** 2026-09-22
**Cards:** Zurgo Stormrender; Caesar, Legion's Emperor; Slimefoot, the Stowaway; Chatterfang, Squirrel General; Dina, Soul Steeper; Ayara, First of Locthwain; Anje, Maid of Dishonor; Bontu the Glorified; Ghave, Guru of Spores; Wilhelt, the Rotcleaver; Ghoulcaller Gisa; Teysa Karlov; Elas il-Kor, Sadistic Pilgrim; Thalisse, Reverent Medium; Endrek Sahr, Master Breeder; Sek'Kuar, Deathkeeper; Mazirek, Kraul Death Priest; Korvold, Fae-Cursed King; Lathril, Blade of the Elves; Marneus Calgar; Prossh, Skyraider of Kher; Meren of Clan Nel Toth; Edgar Markov; Pitiless Plunderer
**Claim:** The tokens → sacrifice → drain loop has exactly three jobs (make bodies, an outlet, a
per-death payoff). A commander is worth ranking by how many of the three it covers itself, because
every job it covers is one the 99 need not draw into; salt and colour depth are the tie-breaks.
**Evidence:** Scryfall scan of every commander-legal legend with a token-making or death/sacrifice
drain clause (`is:commander o:create o:token (o:"each opponent loses" …)` and the dies/sacrifice
variant), EDHREC salt via `bun run edhrec card`, oracle via `bun run card`. Two-job commanders,
salt out of 4: Zurgo Stormrender WBR 0.28 (mobilize bodies + "creature token leaves the
battlefield: draw if it was attacking, otherwise each opponent loses 1"), Caesar WBR 0.48 (two
Soldiers + a forced sacrifice per attack), Slimefoot BG 0.22 ({4}: Saproling + 1 damage each
opponent per Saproling death), Chatterfang BG 0.96 (extra Squirrel per token event + {B} sac-X
outlet), Dina BG 0.40 (gain → each opponent loses 1 + {1} sac outlet), Ayara B 0.41 (black creature
enters → drain + tap-sac draw), Anje BR 0.35 ({2} sac → 2 each), Bontu B 0.00 ({1}{B} sac → 1
each), Ghave WBG 0.29 (counter → Saproling, sac → counter), Wilhelt UB 0.52 (decayed Zombie per
Zombie death + end-step sac draw), Gisa B 0.19 (sac → X Zombies). One-job: Teysa Karlov WB 0.53,
Elas WB 0.43, Thalisse WB 0.29, Endrek Sahr B 0.27, Sek'Kuar BRG 0.22, Mazirek BG 0.36. Over 0.7 and
therefore off the table for a "no salt" brief: Korvold 1.65, Chatterfang 0.96, Lathril 0.91,
Marneus 0.87, Prossh 0.80, Meren 0.74. Edgar Markov sits at 2.05.
**Changes:** Ask "which of the three jobs does the commander do?" before "which colours?". A
one-job drain commander (Elas, Teysa) leaves both bodies and outlet to the 99 — the trap fallen into
earlier this same day (see the "replace the commander's JOB" correction).
**History:** On 2026-09-22 this ledger claimed "Chatterfang + Pitiless Plunderer + any free outlet is
an automatic infinite (each Squirrel death makes a Treasure token, which makes a Squirrel), so that
pairing is out under the pilot's loop policy"; that part was superseded on 2026-09-24 because the
loop is chosen-N, not automatic (loop entry "Chatterfang + Pitiless Plunderer is chosen-N, not
automatic").
**See also:** build-038, build-040, loop-010
**Source:** drain-from-scratch brief (2026-09-22) — "squirrels or fish or whatever, create tokens,
sac em, drain".

### Salt is a constraint to REPORT, not an objective to minimise — rank on power first {#build-040}

**Kind:** correction · **Recorded:** 2026-09-22
**Cards:** Zurgo Stormrender; Korvold, Fae-Cursed King; Chatterfang, Squirrel General; Prossh, Skyraider of Kher; Teysa Karlov; Caesar, Legion's Emperor; Ghave, Guru of Spores; Edgar Markov
**Claim:** "Avoid X's saltiness" means "don't hand me another X", not "minimise the number": rank
commanders on power first and report salt as a flag for the pilot to weigh.
**Evidence:** The brief was "a drain deck that avoids the saltiness of Edgar". I read that as
"pick the lowest-salt commander" and led with Zurgo Stormrender (0.28) over stronger engines. The
pilot: *"we don't also just want the lowest salt one. we want something that's the best but if it has
a high salty factor let me know."* EDHREC salt out of 4 for the loop's strongest commanders — Korvold
1.65, Chatterfang 0.96, Prossh 0.80, Teysa Karlov 0.53, Caesar 0.48, Ghave 0.29, Zurgo 0.28 —
against Edgar at 2.05. Everything on the list is under half of Edgar; only Korvold is in the format's
genuinely salty band.
**Changes:** Rank commanders on what they do for the plan, then attach the salt score and the *play
pattern* the pod will actually object to (a two-card infinite reputation, free command-zone value,
mass edicts). Present the flag; let the pilot decide the trade. "Avoid X's saltiness" means "don't
hand me another X", not "minimise the number".
**See also:** build-037, build-039
**Source:** drain-from-scratch brief (2026-09-22). The pilot corrected the axis.

### Drain is a mono-black mechanic — a drain deck's second colour buys MULTIPLICATION, not more drain {#build-041}

**Kind:** pattern · **Recorded:** 2026-09-23
**Cards:** Parallel Lives; Doubling Season; Primal Vigor; Anointed Procession; Mondrak, Glory Dominus; Ojer Taq, Deepest Foundation; Exalted Sunborn; Kaya, Geist Hunter; Wilhelt, the Rotcleaver; Gisa and Geralf; Grimgrin, Corpse-Born; The Scarab God; Chatterfang, Squirrel General
**Claim:** When picking colours for a tokens → sacrifice → drain deck, do not compare colour pairs on
how many drain payoffs they unlock, because black already has essentially all of them. Compare them on
**token doublers and token engines**, where the pairs differ enormously.
**Evidence:** Scryfall counts, 2026-09-23. Drain payoffs (`(o:"dies" …) (o:"each opponent loses" …)
-t:land`, commander-legal): mono-B **46**, BG **51**, WB **50**, UB **49** — the second colour adds
three to five cards. Token doublers (`o:"twice that many of those tokens"`): mono-B **0**, UB **0**,
BG **3** (Parallel Lives, Doubling Season, Primal Vigor), WB **5** (Anointed Procession, Mondrak,
Ojer Taq, Exalted Sunborn, Kaya Geist Hunter).
**Changes:** **Blue is the worst second colour for this archetype** — zero doublers and ~3 extra
drainers — which rules out the best Zombie commanders (Wilhelt 0.52 salt rank #50, Gisa and Geralf,
Grimgrin, The Scarab God) on colour rather than on the Zombie theme, and it is why Golgari and Orzhov
won. Green and white are the colours that multiply. The corollary: **the token creature TYPE is almost
never the deciding factor** — Zombies, Squirrels, Spirits and Saprolings all sacrifice identically.
What matters is whether the commander attaches a body to *every* token event (Chatterfang) or only to
a closed subset (Wilhelt needs a Zombie to die to make a Zombie).
**See also:** build-039
**Source:** chatterfang / teysa-karlov (2026-09-23) — pilot asked "why squirrels and not zombies?".

### Section counts measure slots, not function — a ramp count can rise while ramp gets worse {#build-042}

**Kind:** pattern · **Recorded:** 2026-09-25
**Cards:** Cultivate; Sakura-Tribe Elder; Awaken the Woods; Circle of Dreams Druid; Ancient Greenwarden
**Claim:** "Ramp & Mana 10 → 13" looked like a strict improvement and concealed a real regression,
because three of the new entries were conditional late-game mana and the two cut were unconditional
early ramp.
**Evidence:** chatterfang → upgrade-test. Cut Cultivate (3, puts a land onto the battlefield, no
board needed) and Sakura-Tribe Elder (2, same, plus a body). Added Awaken the Woods (`{X}{G}{G}`,
produces nothing at X=0), Circle of Dreams Druid (needs a wide board *and* a turn of summoning
sickness) and Ancient Greenwarden (6). A deck reviewer put the estimated win turn at 6.6 vs 7.5,
and the measured cause was MV ≤ 2 falling **30 → 24**.
**Changes:** When a swap package claims to fix speed, report **MV ≤ 2 and MV ≤ 3 counts** beside
average MV, and split the ramp role into *unconditional* (lands to battlefield, rocks) versus
*conditional* (needs a board, needs a turn, needs X mana). Never accept a role count as evidence
that a role got better.
**See also:** build-043, build-044, tool-013
**Source:** chatterfang / upgrade-test (2026-09-25) — the pilot ran a deck reviewer and asked "are you
sure this deck is better?" It was not.

### An {X} spell is counted at its printed mana value and silently understates the curve {#build-043}

**Kind:** ruling · **Verified:** 2026-09-25 against CR 2026-08-07
**Cards:** Awaken the Woods
**Rules:** 202.3b
**Claim:** Awaken the Woods (`{X}{G}{G}`) reports **mana value 2** in Scryfall data, in
`bun run deck:show`, in the proposal artifact and in every third-party deck reviewer — but costs 5
for X=3. A list with X spells is more expensive than every automated curve reading says.
**Evidence:** CR 202.3b — X is 0 while the card is not on the stack, so cmc = 2. Verified against
`data/card-cache.json` (`cmc: 2`) and against `deck:show`'s avg-MV calculation.
**Changes:** When an {X} card is added or evaluated, state its **realistic cast cost** next to its
mana value, and discount any avg-MV or win-turn figure for a deck carrying several. This cuts both
ways: a win-turn estimate that already looks bad for an X-heavy deck is optimistic, not harsh.
**See also:** build-042, cost-003
**Source:** chatterfang / upgrade-test (2026-09-25).

### A death-counter mana enchantment is wipe-proof ramp; file it as an engine slot, never as early ramp {#build-044}

**Kind:** pattern · **Recorded:** 2026-09-28
**Cards:** Gardenize; Doubling Season; Cultivate; From Beyond
**Rules:** 106.4, 505.1a
**Claim:** A permanent that stores a counter per death and pays mana from them every turn grows for
the rest of the game, and a board wipe *loads* it instead of resetting it. It is late and conditional,
so it replaces an engine slot, never an unconditional early ramp card.
**Evidence:** Gardenize: *"Whenever a creature you control dies, put a charge counter on this
enchantment. At the beginning of your first main phase, add {G} for each charge counter."* Nothing
removes the counters. The mana lasts only through the precombat main phase (CR 505.1a, 106.4;
confirmed by `mtg-rules-expert`). Doubling Season doubles the counters. The wave-4 lesson (upgrade-test,
2026-09-25): swapping unconditional early ramp for conditional ramp slowed the win turn 6.6 → 7.5.
**Changes:** Rate these on two axes, ramp and wipe resilience, and nominate an engine or one-shot as
the cut. The chatterfang review took From Beyond; the ghave review kept it as first reserve rather
than cut Cultivate.
**See also:** build-042, tool-016
**Source:** chatterfang / ghave (2026-09-28), FRA review.
