# Ledger: Costs and mana

Mana value and {X}; cost reduction and what it can and can't reduce; free, alternative and additional costs; commander tax; mana abilities, banked mana and the colour of mana. Entry format and capture rules: `../SKILL.md` §4.
Search every topic at once with `bun run lookup "<card | rule number | term>"`.

---

### Free-casting an X-spell forces X = 0; cost reduction does not {#cost-001}

**Kind:** ruling · **Verified:** 2026-08-04 against CR 2026-04-17
**Cards:** Crackle with Power
**Rules:** 107.3b, 702.34a, 702.138a
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

**See also:** cost-003, cost-009, cost-015, cost-019, eval-006
**Source:** scarlet-witch (2026-08-04). Caused the deck's worst documentation error — see Corrections.

### Mana empties only at end of step/phase, so "don't lose unspent" banks across turns {#cost-002}

**Kind:** ruling · **Verified:** 2026-08-04 against CR 2026-04-17
**Cards:** Omnath, Locus of Mana
**Rules:** 500.5
**Claim:** A card saying *"you don't lose unspent red mana as steps and phases end"* means that
mana persists **indefinitely, across turns**, until spent.
**Evidence:** CR 500.5 — end of step/phase is the only thing that empties a pool, so removing that
one trigger removes all of them. Same pattern as Omnath, Locus of Mana.
**Changes:** Reframes the manabase in a mono-colour deck. Every land becomes a battery under such
an effect, and **coloured mana is strictly better than colourless** — colourless empties normally.
Combined with colour-hungry costs and devotion, this is why the deck ran 21 basics over utility
lands.
**See also:** cost-010, cost-014, build-006
**Source:** scarlet-witch (2026-08-04). The user raised the colourless-vs-coloured point first and
was right.

### Mana value is not what you paid — reductions, alternative costs and free casts leave the printed value {#cost-003}

**Kind:** ruling · **Verified:** 2026-09-08 against CR 2026-08-07
**Cards:** Prismari Pianist; Manaform Hellkite; Fierce Guardianship; Deadly Rollick; The Lord of Pain; Kaervek the Merciless; The Frightful Four; Helm of Awakening; Excalibur, Sword of Eden
**Rules:** 107.3b, 118.7, 118.8d, 118.9c, 120.8, 202.3, 202.3e, 601.2f
**Claim:** Cost reduction never changes a spell's mana value, and neither does an alternative cost
(including a free cast) — anything keyed to MV reads the printed/announced value, and a permanent's
mana value is derived from its printed mana cost, unaffected by anything you paid. Only {X} moves it:
X must be 0 under a free cast, and an `{X}` in a mana cost counts as **0** while the object isn't on
the stack.
**Evidence:** CR 202.3 — *"The mana value of an object is a number equal to the total amount of mana
in its mana cost."* CR 118.7 — *"Paying a cost changed or reduced by an effect counts as paying the
original cost."* CR 601.2f applies reductions only while determining a spell's total cost. CR 118.9c
("an alternative cost… doesn't change a spell's mana cost"), 118.8d (additional costs likewise),
202.3e (X as chosen on the stack; off the stack *"an {X} in a mana cost is treated as 0"*), 107.3b
(X = 0 when free-cast). CR 120.8 — a source dealing 0 damage deals no damage at all, so no damage
triggers fire either. The first version of this entry (2026-08-06) rested on "Oracle behaviour; MV is
a characteristic, reductions modify the cost paid" without a CR citation — cite CR 202.3 / 118.7 from
here on.
**Changes:** Cuts both ways. Read which one a card uses before evaluating it.
- **Cost reduction (2026-08-06).** Both directions came up in one session. In favour: Prismari
  Pianist's "mana value 5 or greater" clause still triggers off discounted spells. Against: Manaform
  Hellkite's token is sized by *mana actually spent*, so a discount **shrinks** it.
- **Alternative costs and free casts (2026-08-23).** A spell cast for an alternative cost — Fierce
  Guardianship for free, Deadly Rollick free, "without paying its mana cost" — keeps its printed mana
  value. MV-keyed punishers (Lord of Pain, Kaervek, Frightful Four) bill the full printed number; only
  {X} spells shrink, because X must be 0 under a free cast. When evaluating a "damage equal to mana
  value" punisher, count opponents' free spells at full value. Conversely Helm of Awakening-style
  reducers raise the *number* of spells cast without lowering the bill on each.
- **Permanents on the battlefield (2026-09-08).** Any payoff keyed to "that permanent's mana value"
  reads an X-cost permanent as 0. Excalibur, Sword of Eden has **MV 12 on the battlefield** even when
  its historic-permanents discount casts it for {0}, making it the largest Throw payload in a Captain
  America deck; and **any X-cost Equipment is a dead payload** (MV 0 → zero damage), so exclude the
  whole class before building a payload list.

**See also:** cost-001, cost-005, build-043
**Source:** scarlet-witch (2026-08-06), token-maker evaluation; lord-of-pain (2026-08-23, merged from
"An alternative cost (incl. free casts) leaves mana value unchanged"), mtg-rules-expert;
captain-america (2026-09-08, merged from "Mana value on the battlefield is the PRINTED cost, and {X}
there counts as zero"), sizing Throw damage by payload mana value.

### Cost reduction only eats the GENERIC portion of a cost — count generic symbols before stacking or seating reducers {#cost-004}

**Kind:** ruling · **Verified:** 2026-09-03 against CR 2026-08-07
**Cards:** The Fire Crystal; Ruby Medallion; Longshot, Rebel Bowman; Helm of Awakening; The Vision and Scarlet Witch; Crash Through; Expedite; Crimson Wisps; Might of the Meek; Grapeshot
**Rules:** 601.2f
**Claim:** A "costs {1} less" effect can never reduce a coloured pip. The floor of any spell is its
coloured requirement, so the number of generic symbols caps how many reducers can ever apply — and a
one-pip spell gets nothing from a Medallion at all.
**Evidence:** CR 601.2f — total cost is the mana cost "minus all cost reductions... If the mana
component of the total cost is reduced to nothing by cost reduction effects, it is considered to be
{0}." The reduction applies to the generic component; coloured requirements survive. Worked case:
The Fire Crystal at {2}{R}{R} has only {2} of generic, so Ruby Medallion and Longshot take it to
{R}{R} and a **third** reducer does nothing at all. One-pip case (2026-09-03) — Oracle: Crash Through
`{R}`, Expedite `{R}`, Crimson Wisps `{R}`, Might of the Meek `{R}` — 0 generic each. Ruby Medallion:
*"Red spells you cast cost {1} less"*; 601.2f reduces the generic component only. The
vision-scarlet-witch list holds 10 such cantrips and 7 reducer-eligible red spells.
**Changes:** Count the generic symbols **before** stacking reducers, then apply at most that many
reductions. A deck with four reducers does not make a {1}{R}{R}{R} spell free — it makes it
{R}{R}{R}. This also means heavily-pipped cards benefit least from a reducer package, which is a real
argument against them in a reducer deck. When the repo has already written a formula down, use it
rather than re-deriving from scratch.
- **Cheap-spell decks (2026-09-03).** In a deck whose engine is `{R}` cantrips, Ruby Medallion / The
  Fire Crystal / Helm of Awakening reduce **none** of the engine spells — there is no generic to eat.
  Their whole value is on the two-plus-mana half of the list. Conversely a commander that *refunds* a
  mana per cast (The Vision and Scarlet Witch) is the only "discount" that reaches a one-pip spell,
  and it makes them net-free. Before seating a reducer, count the cards in the list with ≥1 generic
  symbol; if the deck's engine is one-pip spells, the reducer is a support card for the other half,
  and a symmetric one (Helm of Awakening) is a pure gift to opponents. Same arithmetic decides
  Grapeshot decks, Cheerios lists and any "storm off cantrips" build.

**History:** On 2026-08-07 I said The Fire Crystal ({2}{R}{R}) "costs 1 mana with all three reducers
out." Impossible — only {2} is generic, so the floor is {R}{R} = 2, and realistically 3. Root cause:
stacked reducers arithmetically without checking what they were allowed to reduce.
`research/formulas.md` line 30 **already said** *"printed cost − R (generic portion only)"* — the
deck had documented the rule and I ignored its own note. Caught by the pilot.
**See also:** cost-005, cost-013, cost-018, eval-002
**Source:** scarlet-witch (2026-08-07), The Fire Crystal, caught by the pilot; scarlet-witch
(2026-08-07, merged from "Claimed a cost below a spell's coloured floor"); vision-scarlet-witch
(2026-09-03, merged from "A one-pip cantrip gets nothing from a Medallion — count generic symbols
before valuing reducers in a cheap-spell deck"), Helm of Awakening rejected.

### Generic reducers apply to the whole total cost — commander tax, buyback and kicker included {#cost-005}

**Kind:** ruling · **Verified:** 2026-09-08 against CR 2026-08-07
**Cards:** Tony Stark; Reiterate; Ruby Medallion; The Fire Crystal; Longshot, Rebel Bowman; Artist's Talent; Comet Storm; The Scarlet Witch; Jaya's Immolating Inferno
**Rules:** 118.7a, 118.8d, 202.4, 601.2b, 601.2f, 601.2h, 702.27a, 702.33a, 702.33c, 707.10, 707.10c, 903.8
**Claim:** A generic cost reduction applies to the *total* cost, which includes every additional cost
— the {2}-per-previous-cast commander tax, buyback, kicker and multikicker — so it is not limited to
the printed mana cost. The total is assembled first and reduced afterwards, so under a fixed
reduction kicks and X draw on the *same* pool of discount: each kick you pay costs you exactly one
point of X.
**Evidence:** CR 601.2f — *"The total cost is the mana cost or alternative cost..., plus all
additional costs and cost increases, and minus all cost reductions."* CR 903.8 makes the tax an
**additional cost**, so it sits inside that total before reductions apply. CR 702.27a (buyback is
paid "following the rules for paying additional costs in 601.2b and 601.2f–h"); CR 702.33a/c make
(multi)kicker an additional cost. CR 118.7a confines a generic reduction to the generic component,
floored at {0} (CR 601.2f). Worked: Reiterate ({1}{R}{R}, buyback {3}) under Ruby Medallion, The Fire
Crystal, Longshot and Artist's Talent L2 is {4}{R}{R} − {4} = **{R}{R} with buyback**; under the two
medallions alone it is {2}{R}{R}. Comet Storm ({X}{R}{R}, multikicker {1}) at X=5 kicked twice is
{5}{R}{R} + {1} + {1} = {7}{R}{R}; The Scarlet Witch at power 8 wipes all 7 generic and wastes the
8th, so it costs {R}{R} — and **X + kicks = 8** is the real constraint. Mana value is unchanged (CR
118.8d); CR 202.4 / 118.8d: the kicker payments do **not** raise mana value, so kicking can never
switch on an MV-gated discount (Comet Storm at X=1 is MV 3, kicked or not). And CR 601.2f locks the
total in, so killing the commander with the spell already on the stack does not raise what you pay.
Copies keep X and targets can be changed (CR 707.10, 707.10c) but a copy is **not cast** — no
cast-triggers, magecraft-style "cast or copy" only.
**Changes:**
- **Commander tax (2026-08-18).** Price a reducer against the *whole recast curve*, not one cast. A
  -{2} reducer on a {4}{U}{R} commander turns 6 / 8 / 10 into 4 / 6 / 8 — it is worth three cards'
  worth of mana over a game where the commander eats removal twice, which is far more than the same
  reducer is worth on any single spell in the 99.
- **Buyback (2026-09-06).** In any reducer-dense deck, cost a buyback spell at its *reduced buyback
  total* — that is the price of a repeatable effect, and it decides whether the card is a one-shot or
  an engine. Same arithmetic applies to kicker, escalate and splice costs.
- **Kicker vs X (2026-09-08).** When a deck's reducer is large but finite, price a kicked spell as
  `X + kicks` against one budget, then compare it to the unkicked card that does the same job. In
  scarlet-witch that comparison demotes Comet Storm: kicked twice it hits three targets for `X + 2`
  generic, where Jaya's Immolating Inferno hits *up to three targets* for `X` at the same {X}{R}{R} —
  strictly two generic cheaper for the same board, with instant speed the only thing Comet Storm buys
  back.

**See also:** cost-003, cost-004, cost-006, cost-012, trig-004, eval-022
**Source:** iron-man (2026-08-18), Tony Stark // The Invincible Iron Man; scarlet-witch (2026-09-06,
merged from "Cost reducers eat the GENERIC part of buyback too — Reiterate with buyback is {R}{R}
under four reducers"), Reiterate re-evaluated for the Bracket 3 list under the pilot's chosen-N loop
line; scarlet-witch (2026-09-08, merged from "Kicker payments share ONE discount budget with X —
every kick costs a point of X"), the pilot's "are you sure the kicker cost gets eaten by the
discount?"

### Commander tax is face-agnostic; the face choice is remade every cast {#cost-006}

**Kind:** ruling · **Verified:** 2026-08-18 against CR 2026-08-07
**Cards:** Tony Stark; Command Beacon
**Rules:** 712.11b, 903.8
**Claim:** For a modal DFC commander you pick the face fresh on every cast, with no lock-in from
previous casts — but the commander tax counts *casts of the card* and rises no matter which face
you chose. Casting the cheap face therefore taxes the expensive one.
**Evidence:** CR 712.11b — *"A player casting a modal double-faced card... chooses which face they
are casting before putting it onto the stack."* CR 903.8 — *"costs an additional {2} for each
previous time the player casting it has cast **it** from the command zone that game"* — "it" is the
card, not the face.
**Changes:** Price the cheap face's *option cost*, not just its mana cost. A 2-mana front face that
trades with a removal spell has raised the real threat's price by {2}; that is a genuine reason to
skip an "obviously free" early commander deploy. Two corollaries: a **transform ability is not a
cast**, so flipping never adds tax and converts an escalating cost into a flat one; and Command
Beacon zeroes the counter *and* still allows either face (712.11b is zone-agnostic).
**See also:** cost-012, zone-003
**Source:** iron-man (2026-08-18), Tony Stark // The Invincible Iron Man.

### A triggered ability that adds mana is not a mana ability — targeted or not, it uses the stack {#cost-007}

**Kind:** ruling · **Verified:** 2026-09-03 against CR 2026-08-07
**Cards:** Urabrask; Sorin's Thirst; The Vision and Scarlet Witch; Birgi, God of Storytelling; Electro, Assaulting Battery; Leyline Tyrant; Ashling, Flame Dancer
**Rules:** 106.4, 500.5, 601.2h, 601.2i, 603.2c, 603.2h, 603.3, 603.3d, 605.1b, 605.5a, 608.2b
**Claim:** Urabrask's *"Whenever you cast an instant or sorcery spell, Urabrask deals 1 damage to
target opponent. Add {R}"* is one ordinary triggered ability, not a mana ability: it uses the
stack, can be responded to or Stifled, and the {R} arrives only on resolution; if the target is
illegal at resolution — or no opponent is targetable when it triggers — NOTHING happens, mana
included. The targetless version (*"Whenever you cast a spell, add {R}…"* — The Vision and Scarlet
Witch, Birgi, Electro) is still not a mana ability: the mana arrives when the trigger resolves,
above and before the spell that caused it, so it can never pay for that spell.
**Evidence:** CR 605.5a — "An ability with a target is not a mana ability, even if it could put
mana into a player's mana pool when it resolves"; an ability that could add mana but triggers from
another event follows normal trigger rules. CR 605.1b (triggered mana abilities must be targetless
AND triggered by mana — from a mana ability or from mana being added). CR 608.2b — if all targets are
illegal the ability doesn't resolve and none of its effects happen, untargeted riders included (the
rule's own Sorin's Thirst example); CR 603.3d — no legal target when it triggers → removed from the
stack entirely. CR 601.2h–i, 603.3 (costs paid, then cast-triggers go on the stack above the spell).
Timing upside: the trigger sits ABOVE the spell that caused it (CR 603.3) and resolves first, so the
{R} is available while that spell is still on the stack — but pools empty each step/phase (CR
106.4 / 500.5).
**Changes:**
- **Counting it as ramp (2026-08-19).** Discount it by the fizzle risk (opponent hexproof effects,
  players leaving) and by CR 106.4 — the mana must be spent in the same step/phase. Frequency read:
  "whenever you cast" = once per cast, every cast, no per-turn cap (CR 603.2c); only explicit "only
  once each turn" wording caps a trigger (CR 603.2h).
- **Cast-refund commanders (2026-09-03).** The refund pays only for the next spell or a response, and
  it empties at end of step/phase unless something banks it. Count a cast-refund commander as
  **net-zero on one-mana spells, never as free casting** — the first spell of the chain is paid in
  full. And the refund is only "banked" under a Leyline Tyrant / Electro / Ashling clause; without one
  it is a same-phase resource.

**See also:** cost-002, cost-014
**Source:** scarlet-witch (2026-08-19) — user asked if Urabrask adds {R} once or each time;
vision-scarlet-witch (2026-09-03, merged from "A cast-triggered "add mana" ability is not a mana
ability, even with no target"), founding build; verified by mtg-rules-expert.

### Artifact tokens are legal bounce-fodder for Master Transmuter-style costs {#cost-008}

**Kind:** ruling · **Verified:** 2026-08-20 against CR 2026-08-07
**Cards:** Master Transmuter
**Rules:** 110.1, 111.6, 111.7, 111.8, 111.10a, 113.7a, 602.1a, 602.2, 704.5d
**Claim:** A Treasure (or any artifact token) can pay a cost like Master Transmuter's *"Return an
artifact you control to its owner's hand"* — the token ceases to exist on the way to hand, but the
cost is fully paid and the ability resolves normally. The bounced token itself can never be the
thing put onto the battlefield, because the effect asks for an artifact **card** and a token isn't
a card.
**Evidence:** CR 111.10a (a Treasure token is an artifact token) + CR 110.1/111.6 make it an
artifact you control, so it satisfies the activation cost (CR 602.1a). CR 111.7 / 704.5d — a token
in any zone other than the battlefield ceases to exist (a state-based action), and CR 111.8 — it
can never come back. CR 602.2 — announcements and payments can't be altered after they're made, so
the SBA deleting the token doesn't undo the payment; CR 113.7a — the ability on the stack exists
independently. CR 111.6 — *"A token isn't a card,"* so it can't be the "artifact card from your
hand."
**Changes:** Treat expendable artifact tokens (Treasures, Clues, Food, blink-copies) as premium
fodder for any "return/sacrifice an artifact" activation cost — the deck loses an object it was
going to spend anyway. Generalizes to all bounce-as-cost cards; the token evaporating is a feature,
not a bug.
**See also:** cost-011
**Source:** rules question (2026-08-20) — can Master Transmuter be used on a Treasure token?

### "Without paying its mana cost" never waives ADDITIONAL costs {#cost-009}

**Kind:** ruling · **Verified:** 2026-08-20 against CR 2026-08-07
**Cards:** Big Score; Arcane Bombardment; Mizzix's Mastery
**Rules:** 118.9, 118.9d
**Claim:** Casting a spell (or copy) "without paying its mana cost" is an alternative cost that
replaces only the mana cost — additional costs still apply and must be paid. A Big Score copy off
Arcane Bombardment still costs "discard a card" every single time; with nothing to discard, that
copy can't be cast at all (the cast is optional, so you simply decline it).
**Evidence:** CR 118.9 — "without paying its mana cost" is the standard phrasing of an alternative
cost; CR 118.9d — "If an alternative cost is being paid to cast a spell, any **additional costs**,
cost increases, and cost reductions that affect that spell **are applied** to that alternative
cost." Oracle: Big Score (msc #802) — "As an additional cost to cast this spell, discard a card."
**Changes:** When pricing "free cast" engines (Bombardment piles, cascade, Mizzix's Mastery),
audit each candidate spell for additional costs — discard/sacrifice riders keep charging on every
free cast, which flips cards like Big Score from "pure value" to "value minus a card each loop."
Companion fact already ledgered: free-casting an X-spell forces X = 0 (cost-001).
**See also:** cost-001, cost-015
**Source:** scarlet-witch (2026-08-20) — auditing a real game's Arcane Bombardment loop with Big Score
in the pile.

### Banked "doesn't-empty" mana survives its source dying — long enough to pay the LTB trigger {#cost-010}

**Kind:** ruling · **Verified:** 2026-09-30 against CR 2026-08-07
**Cards:** Electro, Assaulting Battery; Omnath, Locus of Mana; Omnath, Locus of the Void; Kruphix, God of Horizons
**Rules:** 106.4b, 500.2, 500.5, 604.2, 611.3b, 703.4q, 704.5g
**Claim:** When a permanent with an Omnath-style effect ("you don't lose unspent red mana as steps
and phases end" — Electro, Assaulting Battery) leaves the battlefield, the banked mana is NOT lost
immediately: pools empty only as a step or phase ends, so the mana stays available for the rest of
that step/phase — and the step can't end while Electro's own leave trigger is on the stack, so the
whole bank can be spent on his {X} damage trigger.
**Evidence:** CR 500.5 / 703.4q (emptying is a turn-based action that happens only as a step/phase
ends); CR 604.2 / 611.3b (the static effect stops the moment the permanent leaves); CR 500.2 (a
step/phase in which players receive priority can't end while the stack is nonempty). Rider:
CR 106.4b — a player retaining mana must announce their pool contents whenever they pass priority.
The Kruphix wording (*"If you would lose unspent mana, that mana becomes colorless instead"*, also on
Omnath, Locus of the Void) works the same way. The bank stays until the current step or phase ends,
so the controller can spend it in response to the removal spell (Kruphix and Omnath, Locus of Mana
rulings). Lethal damage gives no chance to respond before the creature dies (CR 704.5g), but the
mana still stays in the pool for the rest of that step.
**Changes:** Removal in response doesn't strand the battery — evaluate Electro-style cards knowing
the stored mana converts into the leave-trigger X even when he's killed. Pilot note: announce the
pool when passing priority. Under Omnath, Locus of the Void, which has no leave trigger, keep an
instant-speed sink ready (Walking Ballista's {4} counter ability, Kozilek's Command) so removal
turns the bank into damage instead of losing it.
**See also:** cost-002, cost-014, cost-023
**Source:** iron-man (2026-08-20) — user rules question on Electro, Assaulting Battery (spm / iron-man
context); verified by mtg-rules-expert against rules version 2026-08-07. Extended with the Kruphix
wording for ultron (2026-09-30, Omnath, Locus of the Void proposal), verified by mtg-rules-expert.

### Master Transmuter self-blink: cost is paid at activation, so the same card can come back {#cost-011}

**Kind:** ruling · **Verified:** 2026-08-24 against CR 2026-08-07
**Cards:** Master Transmuter
**Rules:** 117.3c, 302.6, 400.7, 601.2h, 602.1a, 602.2b, 603.6a, 608.2b, 608.2c
**Claim:** Master Transmuter can return artifact X to hand and put that same card X back onto the
battlefield with the same activation — the return is part of the cost (paid immediately, no
response window), the ability's resolution chooses "an artifact card from your hand" only at
resolution time, and the card re-enters as a new object whose ETB abilities trigger again. Riders:
it re-enters with no counters/attachments and is summoning-sick (CR 302.6); and because the return
happens at activation, a single-target spell aimed at X fizzles under CR 608.2b even though the
"same" card is back on the battlefield — the new object has no relation to the old target
(CR 400.7). The redeploy is also not casting, so it can't be countered on the way back in.
**Evidence:** CR 602.1a (everything before the colon is cost) + 602.2b/601.2h (costs paid during
activation, before resolution, no priority in between per 117.3c); CR 608.2c (resolution-time
choice); CR 400.7 (zone change = new object); CR 603.6a (ETB triggers fire); CR 608.2b (spell with
only illegal targets doesn't resolve). Oracle verified 2026-08-24: "{U}, {T}, Return an artifact
you control to its owner's hand: You may put an artifact card from your hand onto the battlefield."
**Changes:** Count Master Transmuter-style bounce activations as BOTH an ETB-retrigger engine and
single-target removal protection for artifacts — one card, two roles. The protection only beats
battlefield-targeting effects; it does nothing against counterspells or sacrifice/edict effects.
**See also:** cost-008, zone-003
**Source:** iron-man (2026-08-24) — rules question about re-triggering ETBs and dodging targeted
removal.

### Commander tax applies only to command-zone casts {#cost-012}

**Kind:** ruling · **Verified:** 2026-08-24 against CR 2026-08-07
**Cards:** Master Transmuter
**Rules:** 903.8
**Claim:** The {2}-per-previous-cast "commander tax" applies ONLY when casting the commander from
the command zone. A commander cast from hand (after a bounce, discard-recursion, etc.) costs its
plain mana cost, and that cast doesn't increase the tax counter either — the counter counts only
previous command-zone casts.
**Evidence:** CR 903.8 — "A commander cast from the command zone costs an additional {2} for each
previous time the player casting it has cast it from the command zone that game."
**Changes:** When costing a commander rescue line (bounce-to-hand vs. letting it die to the
command zone), the hand path costs base mana with NO tax — this is a real point in favor of
bounce-to-save effects for commander decks. Verify 903.8 before ever adding tax to a
non-command-zone cast.
**History:** On 2026-08-24 I asserted "+ tax" for a commander recast from hand (Master Transmuter
rescue costing) and the user corrected me.
**See also:** cost-006, cost-005, zone-003
**Source:** iron-man (2026-08-24) — Master Transmuter rescue costing; the user's pushback, they were
right.

### A reducer that eats only COLOURED mana is a colour-fixer, not "costs 5 less" {#cost-013}

**Kind:** correction · **Recorded:** 2026-09-02
**Cards:** Morophon, the Boundless; Heliod, God of the Sun; Iroas, God of Victory; Zodiark, Umbral God; Tom Bombadil; God-Eternal Oketra
**Claim:** "Costs {W}{U}{B}{R}{G} less" is not "costs 5 less": a reducer that touches only coloured
pips saves at most one mana per colour present in the cost. It is primarily a **fixing** effect, not
a cost reduction — its value is that the coloured *requirement* disappears, so the spell casts off
any mana, decisive in a five-colour deck and near-irrelevant as "one mana saved."
**Evidence:** Morophon, the Boundless — *"Spells of the chosen type you cast cost {W}{U}{B}{R}{G}
less to cast. This effect reduces only the amount of colored mana you pay."* Heliod, God of the
Sun `{3}{W}` → `{3}` (saves 1); Iroas `{2}{R}{W}` → `{2}` (saves 2); Zodiark `{B}{B}{B}{B}{B}` →
`{B}{B}{B}{B}` (saves 1). Mirror of "Cost reduction only eats the GENERIC portion of a cost"
(cost-004). Morophon naming God, measured across all 95 commander-legal Gods: **61 become fully
generic** (no coloured pip left — Heliod `{3}{W}` → `{3}` casts off three Islands; Tom Bombadil
`{W}{U}{B}{R}{G}` → `{0}`), 34 keep at least one pip (double-pip cards: Oketra `{3}{W}{W}` →
`{3}{W}`, Zodiark → `{B}{B}{B}{B}`). Of the 61, 38 are real creatures rather than devotion-gated
enchantments. The user caught it: *"the whole point of that is to convert colored gods to generic
gods instead so you can use any mana."*
**Changes:** For a coloured-only reducer, count **how many cards in the pool become castable with no
coloured mana at all**; that is the deck it enables. It also inverts the pool choice: the Morophon
list had been pushed toward multicolour Theros gods "for the bigger discount", which is exactly
backwards — the discount is the same for every single-pip God, so pick the best *creatures* among
the 61, not the most colours.
**History:** On 2026-09-02 this ledger's guidance read: "When a reducer names coloured symbols, cost
each candidate by counting *distinct colours in its cost*, not its mana value. It also steers the
card pool: a coloured-only reducer rewards multicolour cards, which in a God deck means Theros
devotion gods — a consequence worth seeing before committing to the commander." Superseded the same
day, on user pushback, because counting distinct colours measured the wrong thing: the reducer is a
colour-fixer. The claim that it is not "costs 5 less" stands.
**See also:** cost-004
**Source:** god-tribal build-off (2026-09-02), Morophon list; god-tribal build-off (2026-09-02, merged
from "Scored a coloured-pip reducer as a discount and missed that it is a colour-FIXER"), corrected on
user pushback.

### Horizon Stone turns banked coloured mana colourless; Leyline Tyrant keeps red red {#cost-014}

**Kind:** ruling · **Verified:** 2026-09-30 against CR 2026-08-07
**Cards:** Horizon Stone; Leyline Tyrant; Electro, Assaulting Battery; Ashling, Flame Dancer; Omnath, Locus of the Void; Kruphix, God of Horizons
**Rules:** 106.4, 107.4a, 107.4b, 107.4c, 500.5, 614.1a, 614.5
**Claim:** Horizon Stone (*"If you would lose unspent mana, that mana becomes colorless instead"*)
banks mana but strips its colour at each step/phase end, so the bank can pay generic and `{C}` only —
never a `{R}` pip. Leyline Tyrant / Electro / Ashling (*"you don't lose unspent red mana"*) keep
the colour. With both out, red stays red (nothing is "lost", so the Stone has no event to replace).
**Evidence:** CR 107.4a (coloured costs can be paid only with mana of that colour); CR 107.4b–c;
CR 614.1a (the Stone is a replacement on the "lose" event); CR 106.4.
The same wording on Kruphix, God of Horizons and Omnath, Locus of the Void banks already-colourless
mana indefinitely. Every step or phase end (CR 500.5) is a new "lose" event, and CR 614.5 limits a
replacement to one application per event, so it applies again at each one (Kruphix ruling
2014-04-26).
**Changes:** In a mono-colour deck with coloured pips on its payoffs, Horizon Stone is a strict
downgrade on a colour-keyed banker; take it only in a colourless or generic-heavy shell. Also
sharpens the 2026-08-04 entry (cost-002): "colourless empties normally" is true, and under Horizon
Stone "coloured becomes colourless" is the equivalent loss. In a colourless deck the colour loss
costs nothing, so the Kruphix wording is a full bank.
**See also:** cost-002, cost-007, cost-023
**Source:** vision-scarlet-witch (2026-09-03) — founding build; verified by mtg-rules-expert. Omnath,
Locus of the Void added for ultron (2026-09-30), verified by mtg-rules-expert.

### A spell cast during an ability's resolution ignores card-type timing; "without paying its mana cost" is the only cost that permission allows {#cost-015}

**Kind:** ruling · **Verified:** 2026-09-04 against CR 2026-08-07
**Cards:** Cosmic Cube; Wanda's Vision; Arcane Bombardment; Possibility Storm; Crackle with Power
**Rules:** 107.3b, 118.9, 118.9b, 118.9d, 307.1, 601.2a, 601.2i, 601.3, 608.2g, 701.57a
**Claim:** When an effect lets you cast a spell *during its own resolution* (Cosmic Cube's attack
trigger, discover, Wanda's Vision, Arcane Bombardment), you may cast a sorcery, creature or
enchantment at that moment even in combat — the sorcery restriction (307.1) governs casting from
hand with priority, and the resolving effect is its own permission. And when the permission reads
"without paying its mana cost," that alternative cost is the only way it lets you cast the card;
you cannot elect to pay full price through it. Discover is the one template that offers an out —
"if you don't cast it, put that card into your hand."
**Evidence:** CR 608.2g — *"If an effect specifically instructs or allows a player to cast a spell
during resolution, they do so by following the steps in rules 601.2a–i, except no player receives
priority after it's cast. That spell becomes the topmost object on the stack, and the currently
resolving spell or ability continues to resolve."* CR 601.3 (a spell may be cast only if a rule or
effect allows it). CR 118.9 (the wording is an alternative cost) and 118.9b — *"An effect that
allows you to cast a spell may require a certain alternative cost to be paid."* CR 701.57a (discover:
*"If you don't cast it, put that card into your hand"*). Riders already ledgered: 118.9d (additional
costs still apply, cost-009), 107.3b (X = 0, cost-001).
**Changes:** Score attack-trigger and end-step free-cast engines as *unrestricted* card access — a
Cube can drop a wrath or a multiplier mid-combat. And in a deck with X spells or discard-cost
draw, prefer the *choose-from-N* engines (Cube) and discover (hand fallback) over random single-card
engines (Wanda's Vision, Possibility Storm), where a Crackle hit is a lost card.
**See also:** cost-001, cost-009
**Source:** vision-scarlet-witch (2026-09-04) — the pilot's two Cosmic Cube questions; rules grepped
directly from `rules/sections/` (608, 118, 601, 701).

### One-mana cost-reduction floors do NOT stack, and Training Grounds misses equip costs {#cost-016}

**Kind:** ruling · **Verified:** 2026-09-08 against CR 2026-08-07
**Cards:** Training Grounds; Zirda, the Dawnwaker; Fighter Class; Bureau Headmaster; Puresteel Paladin
**Rules:** 118.7a, 601.2f, 702.6a, 702.151a
**Claim:** Training Grounds and Zirda, the Dawnwaker each carry their own *"can't reduce the mana in
that cost to less than one mana"* clause. Running both never reaches {0} in any application order.
They also cover **different sets of abilities**: Training Grounds hits only creatures' activated
abilities; Zirda hits every non-mana ability you activate, including equip.
**Evidence:** CR 601.2f — *"If multiple cost reductions apply, the player may apply them in any
order"* — but each floor is evaluated as its own reduction applies, so {3} → {1} and the second
reducer can go no further. CR 702.6a — *"Equip is an activated ability of Equipment cards"*; an
Equipment is an artifact, so equip is not an activated ability of a creature you control and Training
Grounds does nothing for it. CR 118.7a — generic-mana reductions touch only the generic component,
never a nonmana cost like "unattach an Equipment." Narrow exception: an Equipment that is *itself* a
creature (reconfigure, living weapon body) does have its activated abilities reduced by Training
Grounds (CR 702.151a).
**Changes:** This is SKILL.md §1.2 ("cost the card out in *this deck's* mana") applied to **activated**
costs, where the reducers differ far more than the spell-side ones do. Before pricing an activation
engine, check each reducer's exact subject — *creatures' activated abilities* (Training Grounds) vs
*any non-mana ability you activate* (Zirda) vs *equip abilities only* (Fighter Class L2, Bureau
Headmaster) — and never assume two floored reducers reach free. A "free activation" engine has to come
from a granted equip {0} (Puresteel Paladin metalcraft) or a free-attach trigger, not from stacking
reducers.
**See also:** cost-004
**Source:** captain-america (2026-09-08) — pricing the Throw engine at {3} base.

### An X-spell under a cast-MV pump is a self-doubler — file X-spells as PUMP in a power-discount deck {#cost-017}

**Kind:** pattern · **Recorded:** 2026-09-08
**Cards:** Livaan, Cultist of Tiamat; The Scarlet Witch; Storm King's Thunder; Jaya's Immolating Inferno
**Rules:** 202.3e, 601.2f
**Claim:** When a commander discounts spells by its own power and a permanent adds "+MV/+0" on
cast, every {X} instant or sorcery doubles the commander's power for the price of its coloured
pips, because X is set by the discount and the resulting MV is added straight back to the power.
**Evidence:** CR 202.3e (*"X is treated as the number chosen for it while the object is on the
stack"* — Livaan's trigger resolves above the spell and reads the full MV) · CR 601.2f (reductions
come off generic) · Livaan, Cultist of Tiamat: *"target creature gets +X/+0 … where X is that
spell's mana value"* · The Scarlet Witch: *"cost {X} less … where X is The Scarlet Witch's power."*
Recurrence: X = ⌊(W + r)/k⌋, W' = W + kX + p ≈ 2W + r + p. Simulated (research/turn-5-chain-
2026-09-08.md): seed 2, Storm King's Thunder X=2 for {R}{R}{R} → Wanda 7 → Jaya's X=7 for {R}{R},
copied ×2 → 21 to each opponent; seed 4 → 55 each; seed 8 → 171 each. Five red pips in every row.
**Changes:** In any deck pairing "costs less by power" with "+MV on cast", every X-spell goes in
the pump role as well as its payoff role, and the seed (power on the commander before the first
X-spell) is scored as a multiplier on the whole chain, never as "+N mana off one spell". Write the
recurrence before assigning roles.
**See also:** cost-005, eval-036, build-024
**Source:** scarlet-witch (2026-09-08) — an opponent's turn-5 table kill with the same commander.

### A reducer's card-type wording must match the card's type line — check before counting the discount {#cost-018}

**Kind:** correction · **Recorded:** 2026-09-08
**Cards:** The Scarlet Witch; Fiery Emancipation; Ruby Medallion; The Fire Crystal; Longshot, Rebel Bowman; Artist's Talent; Solphim, Mayhem Dominus; Livaan, Cultist of Tiamat; Tony Stark; Etherium Sculptor; Enthusiastic Mechanaut; Cloud Key
**Claim:** A cost reducer keyed to a card *type* misses every card of another type, so evaluate the
reducer's wording against the card's **type line** as well as its mana value before quoting a
discounted cost — including the commander's front face. No reducer ever touches an **activated**
ability such as a transform, because it is not a spell.
**Evidence:**
- **scarlet-witch (2026-09-08).** Modelling whether the Scarlet Witch chain build wants Fiery
  Emancipation, I let The Scarlet Witch's reduction apply to it. Her text is *"**Instant and sorcery
  spells** you cast with mana value 4 or greater cost {X} less."* Fiery Emancipation is an
  **Enchantment**, so she reduces it by nothing; only Ruby Medallion / The Fire Crystal (red spells)
  and Longshot / Artist's Talent L2 (noncreature spells) touch it. The model priced it at {R}{R}{R} + 1
  generic when the real cost with Ruby alone is {R}{R}{R} + 2, and it is 6 mana with no reducers at
  all. Solphim, a *creature*, gets no discount from her either **and** no Livaan pump, since Livaan
  reads *"whenever you cast a **noncreature** spell."*
- **iron-man (2026-09-09).** The deck ran three reducers — Etherium Sculptor and Enthusiastic
  Mechanaut (*"Artifact spells you cast cost {1} less"*) and Cloud Key (same, naming artifact) — under
  a standing worry that "the commander lands late." But Tony Stark's front face is `{1}{U}`
  **Legendary Creature — Human Artificer Hero**, not an artifact, and the back face is reached by
  `{4}{U}{R}: Transform`, an **activated ability**. So none of the three reduce either half of the
  exact cost the deck most wants cheaper. Their real window is narrow: turns 1–4 before the flip, and
  after a board wipe, when artifacts must be hard-cast because the free-deploy trigger is unavailable.

**Changes:**
- In any cost model, store each reducer as (applies-to predicate, amount) and evaluate the predicate
  against the card's **type line** as well as its mana value. Before quoting a discounted cost for a
  permanent, say out loud which reducers are creature-legal, noncreature-only, or
  instant/sorcery-only.
- When a deck's stated problem is "the commander is too slow", verify the reducers actually apply to
  it before treating the reducer count as the fix. If they do not, the levers are ramp, a
  cost-reduction effect keyed to the right type, or a command-zone cheat — not more reducers. Also use
  this to rank within the reducer role: when none of them help the commander, the tiebreaker is what
  else each brings (a body that blocks and taps for mana beats a bare enchantment-like rock).

**Root cause (2026-09-08):** The sim carried one `reduction = wanda + others` term for every card and
gated it only on mana value, never on card type. SKILL §1.2 already says in as many words: *"Watch
the reducer's exact wording: red spells vs noncreature spells vs instants and sorceries MV 4+. They
cover different sets."* I wrote the gate for the MV half of her text and dropped the type half. The
conclusion here survived the bug — a multiplier still loses on pips per point of power — but the
quoted costs were wrong by two mana and I published them.
**See also:** cost-004, eval-017, eval-022
**Source:** scarlet-witch (2026-09-08) — the pilot asking whether to add a damage doubler back;
iron-man (2026-09-09, merged from "A cost reducer that reads "artifact spells" does NOT reduce an
artifact-themed COMMANDER — check the front face's type line"), ranking Cloud Key against Etherium
Sculptor and Enthusiastic Mechanaut.

### Affinity makes an {X}{X} artifact creature free at X = artifacts ÷ 2 — X is chosen before the reduction {#cost-019}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Mycosynth Golem; Walking Ballista; Hangarback Walker
**Rules:** 601.2b, 601.2f, 702.41a
**Claim:** Under an affinity-for-artifacts grant (Mycosynth Golem: *"Artifact creature spells you
cast have affinity for artifacts"*), Walking Ballista or Hangarback Walker is cast at X = half your
artifact count for {0}, because X is announced first and the affinity reduction is applied to the
total afterwards.
**Evidence:** CR 601.2b (X is announced as the spell is cast) · CR 601.2f (the total cost is the mana
cost, then increases, then reductions, floored at {0}) · CR 702.41a (*"This spell costs {1} less to
cast for each [artifact] you control"*). Ten artifacts: X = 5, total {10}, reduced by {10}.
**Changes:** In an artifact deck with an affinity grant, score X-cost artifact creatures as *free
bodies sized to the board*, not as mana sinks — the affinity card is their best enabler, and the
deck's own gameplan should say so.
**See also:** cost-001, zone-009
**Source:** ultron (2026-09-16) — Hangarback Walker evaluation; the Mycosynth Golem line was missing
from the gameplan for Ballista too.

### A damage-prevention shield makes painful fast mana free — and the mana ability still resolves {#cost-020}

**Kind:** ruling · **Verified:** 2026-09-22 against CR 2026-08-07
**Cards:** Ancient Tomb; Mana Vault; Grim Monolith; City of Traitors; Glacial Chasm; No Mercy; Stuffy Doll; Seizan, Perverter of Truth; Sheoldred, the Apocalypse
**Rules:** 119.3, 603.2b, 603.2g, 603.4, 605.1, 605.1a, 605.3b, 615.1a, 615.6
**Claim:** Under a "prevent all damage that would be dealt to you" effect, every self-damaging
accelerant (Ancient Tomb, Mana Vault, Grim Monolith, City of Traitors, painlands) costs nothing,
because the damage is erased but the mana is still added. The same shield simultaneously turns OFF
any card of yours that triggers on a creature dealing damage to you (No Mercy).
**Evidence:** CR 615.6 — *"If damage that would be dealt is prevented, it never happens."* CR 603.2g
— *"An event that's prevented or replaced won't trigger anything,"* whose own example is an ability
that triggers on damage being dealt. But Ancient Tomb's *"{T}: Add {C}{C}. This land deals 2 damage
to you"* is a single **activated mana ability** (CR 605.1a — no target, could add mana, and CR 605.1
*"regardless of what other effects they may generate"*), which resolves immediately without the
stack (CR 605.3b), so the mana is added and only the damage event is erased. Mana Vault's trigger
event is *the beginning of your draw step*, not damage (CR 603.2b), so it still triggers, goes on
the stack and resolves (CR 603.4) — with the damage prevented. Verified against
`rules/sections/615-prevention-effects.md`, `603-handling-triggered-abilities.md`,
`605-mana-abilities.md`.
**Changes:** In a deck running Glacial Chasm (or any personal damage shield), score painful fast
mana as strictly better than in a generic deck — the drawback is deleted while the acceleration is
not. Apply the same check in reverse before seating any "whenever a creature deals damage to you"
card (No Mercy, Stuffy Doll redirects) alongside the shield: the shield blanks it. Note the shield
does **not** stop life loss (CR 615.1a, 119.3), so Seizan/Sheoldred-style drains still land.
**Source:** lord-of-pain (2026-09-22) — "we don't have enough fast mana" in the Bracket 4 list.

### Blasphemous Edict counts ALL creatures for its alternative cost and is locked on cast {#cost-021}

**Kind:** ruling · **Verified:** 2026-09-25 against CR 2026-08-07
**Cards:** Blasphemous Edict
**Rules:** 101.3, 101.4, 601.2b, 601.2e, 601.2f, 603.2c, 603.10a, 608.2b, 608.2f, 701.21a
**Claim:** In a go-wide deck this is a one-mana sweeper that only ever points the wrong way for
opponents, and it cannot be fizzled by shrinking the board in response.
**Evidence:** "You may pay {B} rather than pay this spell's mana cost if there are thirteen or more
creatures on the battlefield" has no controller restriction, so it counts every creature in play.
CR 601.2b/601.2e/601.2f — the alternative cost is announced, checked and **locked in** while casting;
CR 608.2b only rechecks targets on resolution, so killing creatures in response does not stop it.
CR 701.21a — each player sacrifices from among permanents **they** control, so you choose your own
thirteen; CR 101.3 — a player with fewer sacrifices all of them; CR 101.4/608.2f — all sacrifices are
simultaneous; CR 603.2c — a "whenever a creature you control dies" payoff triggers once per creature;
CR 603.10a — those triggers look back in time, so a payoff you sacrificed yourself still sees all
thirteen deaths including its own.
**Changes:** Rate this as a sweeper *and* a converter in any deck that reliably holds 13+ bodies —
it banks thirteen death triggers while clearing opponents' boards. Keep the commander out of your
own thirteen so the board rebuilds.
**Source:** chatterfang (2026-09-25).

### "Commander's colour identity" mana makes nothing under a colourless commander {#cost-022}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** Command Tower; Arcane Signet; Path of Ancestry
**Rules:** 105.4, 106.5, 903.4, 903.4f
**Claim:** Command Tower, Arcane Signet and Path of Ancestry produce no mana when the commander's
identity is colourless. They look like auto-includes in a colourless pool.
**Evidence:** CR 106.5: *"If an ability would produce one or more mana of an undefined type, it
produces no mana instead."* CR 105.4 (colourless is not a colour); CR 903.4. (903.4f covers having
*no* commander; this is a commander with an empty identity, but the outcome is the same.) Confirmed
by `mtg-rules-expert` 2026-09-28.
**Changes:** Strike these from Ultron's and any colourless deck's pool before counting mana sources.
**Source:** ultron (2026-09-28), FRA review.

### Banked mana keeps its spending restriction {#cost-023}

**Kind:** ruling · **Verified:** 2026-09-30 against CR 2026-08-07
**Cards:** Omnath, Locus of the Void; Kruphix, God of Horizons; Mishra's Workshop; The Mightstone and Weakstone; Karn, Legacy Reforged
**Rules:** 106.6, 500.5, 514.2, 614.7, 616.1
**Claim:** Mana that a banker keeps across steps and turns (Omnath, Locus of the Void, Kruphix, Horizon
Stone) keeps the spending restriction it was made with, so a banked Mishra's Workshop {C}{C}{C} still
casts only artifact spells on a later turn.
**Evidence:** CR 106.6 says a restriction "doesn't affect the mana's type", so making the mana
colourless leaves the restriction on. The Kruphix ruling (2014-04-26) says restrictions and riders
stay with the mana, and the Omnath, Locus of Mana ruling (2010-03-01) says they apply "no matter when
you spend it". Karn, Legacy Reforged's upkeep mana (*"can't be spent to cast nonartifact spells. Until
end of turn, you don't lose this mana"*) hands over to the banker at cleanup. CR 514.2 ends Karn's
clause first, then CR 500.5 empties the pool, and only the banker's replacement is left to apply
(CR 614.7, 616.1), so Karn's mana banks with its restriction.
**Changes:** Count a bank by what it can pay, not by its size. Banked Workshop mana can't pay
Ultron's {2}, an ability cost or a nonartifact spell. Banked Karn and Mightstone mana pays anything
except a nonartifact spell (Kozilek's Command, Omnath itself). Spend restricted mana on artifact
spells first and keep unrestricted mana for triggers and abilities.
**See also:** cost-010, cost-014
**Source:** ultron (2026-09-30), Omnath, Locus of the Void proposal; verified by mtg-rules-expert.
