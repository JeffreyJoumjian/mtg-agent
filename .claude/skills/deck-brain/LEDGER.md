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

### Cost reduction only eats the GENERIC portion of a cost — 2026-08-07

**Claim:** A "costs {1} less" effect can never reduce a coloured pip. The floor of any spell is its
coloured requirement, so the number of generic symbols caps how many reducers can ever apply.
**Evidence:** CR 601.2f — total cost is the mana cost "minus all cost reductions... If the mana
component of the total cost is reduced to nothing by cost reduction effects, it is considered to be
{0}." The reduction applies to the generic component; coloured requirements survive. Worked case:
The Fire Crystal at {2}{R}{R} has only {2} of generic, so Ruby Medallion and Longshot take it to
{R}{R} and a **third** reducer does nothing at all.
**Changes:** Count the generic symbols **before** stacking reducers. A deck with four reducers does
not make a {1}{R}{R}{R} spell free — it makes it {R}{R}{R}. This also means heavily-pipped cards
benefit least from a reducer package, which is a real argument against them in a reducer deck.
**Source:** scarlet-witch, The Fire Crystal. Caught by the pilot; see Corrections.

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

### Casting a "prepared" copy is a normal cast, and the copy is only the back face — 2026-08-06

**Claim:** When a permanent is *prepared* and you cast a copy of its spell, you announce and pay X
yourself and pay the full cost; the copy has **only the prepare spell's characteristics**.
**Evidence:** CR 722.3c (the copy "has only the characteristics of that permanent's prepare spell"),
CR 601.2b (announce X), CR 601.2f (normal cost modification), CR 601.2i (it becomes cast, so
cast-triggers fire). CR 107.3b does **not** apply — prepared grants *permission to cast*, not a cost
waiver or an alternative cost.
**Changes:** Three consequences, all easy to get backwards:
- An `{X}` prepare spell is **full-size**, not X = 0. Stensian Sanguinist's Exsanguinate is a real
  scalable finisher.
- The copy is **not a creature spell** and has no creature types, so it misses eminence and every
  other tribal cast-trigger — and misses "creature spells of the chosen type cost less" reducers
  (Herald's Horn, Urza's Incubator). Cost the copy at **full price**.
- It is still *cast*, so storm/magecraft-style "whenever you cast a spell" triggers do fire.

**Source:** edgar-markov, evaluating Stensian Sanguinist alongside the in-deck Emeritus of Woe and
Scheming Silvertongue.

### Bloodthirst keys on damage; drain decks never turn it on — 2026-08-06

**Claim:** Bloodthirst checks *"an opponent was **dealt damage** this turn."* Life **loss** is not
damage, so a deck that wins by draining does not satisfy it.
**Evidence:** Bloodthirst reminder text vs the effects in question — Blood Artist, Vein Ripper,
Meathook, Vito and Sanctum Seeker all cause opponents to *lose life*, never to be dealt damage.
**Changes:** Rejected Bloodlord of Vaasgoth for Edgar. The general form: **read whether a condition
says *damage*, *life loss*, or *lifegain*, and check it against what the deck actually produces** —
they are three different sets. Vampire Socialite's *"an opponent lost life"* is nearly always on in
the same deck where bloodthirst is nearly always off.
**Source:** edgar-markov.

### A type-restricted edict is skipped entirely, never substituted — 2026-08-06

**Claim:** "Each player sacrifices a non-X creature of their choice" — a player controlling only X
(or no creatures) sacrifices **nothing**, and can never be made to sacrifice an X.
**Evidence:** CR 608.2d (can't choose an illegal/impossible option), CR 101.3 and CR 609.3
(impossible instructions are ignored / done as much as possible). Choices are made in APNAP order,
then all sacrifices happen simultaneously (CR 608.2e).
**Changes:** Makes Anowon-style effects genuinely one-sided in a tribal deck — but *each player*
includes **you**, so audit your own off-type permanents first (in Edgar: Mirkwood Bats, Elspeth's
Soldier tokens, Purphoros above devotion 5). Changelings and "is the chosen type in addition"
effects (Roaming Throne) are immune.
**Source:** edgar-markov.

### End-step graveyard recursion is an intervening-if — the step doesn't back up — 2026-08-06

**Claim:** "At the beginning of your end step, if [condition], return this from your graveyard" needs
the card **already in the graveyard** and the condition **already met** *before* the end step begins.
**Evidence:** CR 603.4 (intervening-if: checked on trigger *and* on resolution), CR 113.6m (the
ability functions only in the graveyard), CR 513.2 (*"the step doesn't 'back up'"*).
**Changes:** These cards are sequenced in the **second main phase**, not at end of turn. Sacrificing
in response to the trigger, or gaining the life in response, does nothing — the ability never
triggered. Applies to Silversmote Ghoul and every card of that template.
**Source:** edgar-markov.

### Protection from a colour UNATTACHES your own Equipment of that colour — 2026-08-07

**Claim:** Granting your commander protection from a colour rips off every Equipment of that
colour already attached, as a state-based action. This is the most-missed anti-synergy in voltron.
**Evidence:** CR 702.16d — *"A permanent with protection can't be equipped by Equipment that have
the stated quality... Such Equipment become unattached from that permanent as a state-based
action, but remain on the battlefield."*
**Changes:** Before adding a protection-granting Equipment, check the **colours of the Equipment
already in the deck**, not just the colours of the threats you're dodging. Sword of Fire and Ice
(pro red + blue) unattaches Mjölnir {3}{R}, The Reaver Cleaver {2}{R} and Embercleave {4}{R}{R} —
all three are red *cards*, even though Equipment "feels" colourless.
Commander's Plate is the safe template: it grants protection from each colour **not** in your
commander's identity, so it can never conflict with on-colour Equipment.
**Source:** iron-man. The chosen base list ran SoFI alongside all three red Equipment.

---

### Living weapon and For Mirrodin! walk the Equipment off onto their own token — 2026-08-07

**PARTIALLY SUPERSEDED by "A relocated Equipment still delivers its GLOBAL clauses" (Corrections,
2026-08-07).** The rules claim below is correct; the *conclusion* drawn from it — that the whole
cycle is anti-synergy — was wrong for any Equipment whose payoff is a global effect rather than a
buff to the equipped creature.


**Claim:** Any Equipment with Living weapon or For Mirrodin! cannot be used to suit up a specific
creature via an "attach it to X" effect — the ETB trigger creates a token and moves the Equipment
to it afterwards.
**Evidence:** CR 702.92a — *"When this Equipment enters, create a 0/0 black Phyrexian Germ creature
token, then **attach this Equipment to it**."* CR 702.163a is identical for For Mirrodin! with a
2/2 red Rebel.
**Changes:** The attach-on-ETB effect resolves first, then the keyword trigger resolves and steals
the Equipment. Rules out Kaldra Compleat, Nettlecyst, Hexplate Wallbreaker and the rest of the
cycle as voltron payload for any "put an Equipment onto the battlefield attached" commander. They
remain fine as standalone bodies.
**Source:** iron-man, Tony Stark // The Invincible Iron Man.

---

### A MODAL DFC commander can be recast as either face from the command zone — 2026-08-07

**Claim:** Check `layout` before assuming a two-faced commander is expensive to rebuild. Modal
DFCs let you cast the back face directly; transforming DFCs do not.
**Evidence:** CR 712.11b — *"A player casting a modal double-faced card... chooses which face they
are casting before putting it onto the stack."* Contrast CR 712.11 — a **nonmodal** double-faced
spell "is cast with its front face up by default", so a transforming commander must be recast as
its small front face and re-flipped.
**Changes:** For Tony Stark // The Invincible Iron Man this is the difference between 8 mana
(recast the 5/5 directly, {4}{U}{R} + tax) and 10 mana across two turns (recast the 1/3 for
{1}{U} + tax, then pay {4}{U}{R} at sorcery speed). Scryfall's `layout` field settles it —
`modal_dfc` vs `transform`. Note CR 712.8a still applies: in the command zone the card shows only
its **front** face's characteristics, which is what determines colour identity questions, not
what you may cast.
**Source:** iron-man.

---

### Equipment survives its creature leaving — it unattaches and stays — 2026-08-07

**Claim:** When the equipped creature dies, is exiled or otherwise leaves, the Equipment is **not**
lost. It stays on the battlefield unattached and must be re-equipped for its normal cost.
**Evidence:** CR 704.5n — *"If an Equipment or Fortification is attached to an illegal permanent or
to a player, it becomes unattached from that permanent or player. It remains on the battlefield."*
**Changes:** Reframes what commander removal actually costs a voltron deck: not the gear, but the
**equip costs to re-suit**. So a commander that attaches Equipment for free *from hand* wants
Equipment held in hand, not cast onto the battlefield early — the free attach is the whole value,
and it only applies to cards coming from hand.
**Source:** iron-man.

---

### "Attach" is not "target", so shroud doesn't stop an attach effect — 2026-08-07

**Claim:** An effect that says "attach it to X" without the word *target* works on a permanent with
shroud or hexproof. An equip **ability** does target and does not.
**Evidence:** CR 701.3a defines attach as a keyword action with no targeting requirement; CR
702.16b/702.18 make shroud and hexproof restrictions on **targeting** only.
**Changes:** Sharpens the existing Whispersilk Cloak warning (SKILL.md §1.3). Shroud on your own
commander still lets a free "attach on ETB" trigger work, but blocks every equip ability, every
pump and every protection spell you control. Prefer hexproof (Swiftfoot Boots, Champion's Helm) to
shroud (Lightning Greaves, Whispersilk Cloak) in any deck that equips or targets its own commander
— even against 3/5 field signal for Greaves.
**Source:** iron-man.

### Trample assignment ignores damage-modifying effects, so tramplers beat chump blocks — 2026-08-07

**Claim:** When assigning trample damage you use the creature's raw power and ignore any doubler,
floor or prevention effect. The multiplier then applies to each assigned chunk separately, so a
damage doubler pushes almost its full value through a chump block.
**Evidence:** CR 702.19b — assign lethal to blockers, then excess to the player, and *"when checking
for assigned lethal damage, take into account damage already marked... **but not any abilities or
effects that might change the amount of damage that's actually dealt**."*
**Changes:** A 12/12 with trample and a damage doubler, chump-blocked by a 2/2: assign **2** to the
blocker and **10** to the player, then double both — the blocker takes 4 and the **player takes 20**.
Trample is therefore a *better* evasion answer than protection-from-a-colour in any deck with a
damage multiplier, and it is the only evasion that beats **colorless** blockers, which protection
never stops. In artifact formats full of Constructs, Thopters and Servos that gap is large.
**Source:** iron-man, choosing between Sword of Fire and Ice and the Mjölnir package.

---

### Doubling a commander's trigger: match the CREATURE TYPE, not the trigger event — 2026-08-07

**Claim:** Before reaching for a trigger-doubler, check *what kind of event* the trigger keys on.
Panharmonicon-style effects only double triggers caused by something **entering**, and miss
"at the beginning of combat" or "whenever this attacks" triggers entirely.
**Evidence:** Panharmonicon — *"If an artifact or creature **entering** causes a triggered ability of
a permanent you control to trigger..."* vs Roaming Throne — *"As this creature enters, choose a
creature type... If a triggered ability of another creature you control **of the chosen type**
triggers, it triggers an additional time."*
**Changes:** For a commander whose engine is a combat or attack trigger, the doubler you want is
**typed, not evented**: Roaming Throne naming the commander's creature type doubles it permanently
and free, where Strionic Resonator / Lithoform Engine cost {2} every turn. Check the back face's
full type line — Tony Stark's is *Legendary Artifact Creature — Human Hero*, so naming **Hero**
also caught a second Hero in the 99.
**Source:** iron-man.

---

### Trigger-doublers ADD one instance each; they never compound — 2026-08-09

**Claim:** Two effects that each make an ability "trigger an additional time" yield three
instances, not four — each doubler applies to the original trigger event and never to another
doubler's additions.
**Evidence:** CR 603.2d — *"An effect that states that an ability triggers additional times
doesn't invoke itself repeatedly and doesn't apply to other effects that affect how many times an
ability triggers."*
**Changes:** Price the Nth trigger-doubler as +1 instance, not ×2. Roaming Throne + Wizard's Staff
on Tony Stark is exactly 3 deploy triggers per combat. Contrast damage multipliers, which commute
and genuinely multiply (see the replacement-effect ordering entry) — the two families scale
differently and must not be priced alike.
**Source:** iron-man, HOB set review (Wizard's Staff).

---

### An Adventure half is its own cast, with only its own characteristics — 2026-08-09

**Claim:** Casting a card's Adventure half is casting an instant/sorcery with only the Adventure's
characteristics — it is not a creature spell, has no creature types, and its MV is the Adventure's.
Casting the creature later from exile is the mirror image.
**Evidence:** CR 715.3a — *"When casting an adventurer card as an Adventure, only the alternative
characteristics are evaluated to see if it can be cast."*
**Changes:** Cost and classify the two halves separately: the Adventure half gets noncreature
reducers (Longshot, Artist's Talent) and fires spellslinger triggers, but misses eminence and
creature-spell reducers (Herald's Horn, Urza's Incubator); the creature half is the reverse.
MV-gated reducers (The Scarlet Witch) read whichever half is being cast.
**Source:** edgar-markov + scarlet-witch, HOB set review (Glóin the Mighty // Easy Pickings).

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

### A justification that named a COUNT expires when the count changes — 2026-08-06

**Claim:** When a card was seated because of how *many* of something the deck had, re-derive it
whenever that tier gets rebuilt — not just when a single named synergy piece is cut.
**Evidence:** Sorin, Imperious Bloodlord was seated on *"−3 cheats the deck's heavy 5-drop tier
(8 cards) into play."* Two rebuild phases later the list had **two** legal `−3` targets above MV4,
and Herald's Horn + Urza's Incubator had taken `{3}` off every Vampire creature spell, so `−3` was
saving one mana. The stated reason had silently evaporated.
**Changes:** Extends "Check the enabling synergy still exists after the cut that removed it" from
*card A referenced card B* to *card A referenced a population*. After any curve or tier change, grep
the decision log for justifications containing a number and re-count them.
**Source:** edgar-markov, 45-card vampire upgrade pass.

### A lord keyed to COLOUR, not tribe, can wipe your own tokens — 2026-08-06

**Claim:** Before adding a global static that buffs or shrinks by **colour**, list the colours of
every token your deck makes.
**Evidence:** Ascendant Evincar (*"other black creatures get +1/+1; nonblack creatures get −1/−1"*)
rejected for Edgar: Charismatic Conqueror's tokens, Elenda's death tokens and Elspeth's Soldiers are
all **white** 1/1s and would die on the spot. Two-colour tokens (Edgar's Coffin makes white *and*
black) are safe — "nonblack" excludes them.
**Changes:** Specific instance of "check the card against your own board" (SKILL §1.3), sharpened:
tribal decks read colour-keyed lords as tribe-keyed lords by habit. Read the actual noun.
**Source:** edgar-markov.

### A mana sink competes with the engine when the engine is "cast spells" — 2026-08-06

**Claim:** A repeatable X-spell or activated sink is only "free value" in a deck with spare mana. In
a deck whose payoff triggers on *casting*, every point spent on the sink is a trigger not generated.
**Evidence:** Stensian Sanguinist's Exsanguinate was recommended for Edgar Markov as a scalable
finisher and rejected by the pilot: Edgar's eminence makes a token per Vampire *spell cast*, so mana
routed into Exsanguinate is tokens, lords-scaling and drain triggers not made. The card is excellent
in a deck that floods mana and has nothing to spend it on — the opposite deck.
**Changes:** Before adding a sink, ask **what the deck already does with that mana.** Cost-reduction
decks and cast-trigger decks want *more castable cards*, not a place to dump mana. Big-mana decks
with a low card count want the sink. Same card, opposite verdicts — cf. the ritual entry above.
**Source:** edgar-markov. Raised by the user.

### Measure your own curve against the field BEFORE adding top-end — 2026-08-06

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
**Source:** edgar-markov. The user asked the question; the script answered it.

### Cost reducers are the one effect where redundancy is unambiguously right — 2026-08-07

**Claim:** Unlike multipliers, extra cost reducers never blank each other — they stack additively
and every copy pays off on every subsequent spell.
**Evidence:** The Fire Crystal's reduction line is word-for-word Ruby Medallion's. Running both is
−2 generic on every red spell; in a six-spell turn that is six mana. Contrast the multiplier rule
("one is right, two is greedy"), where the second copy is a blank without a payoff to multiply.
**Changes:** Never apply the multiplier-redundancy warning to reducers. The only ceiling on reducer
count is the generic-symbol cap above, not diminishing returns.
**Source:** scarlet-witch.

### Before cutting a resource, check what scales off its COUNT — 2026-08-07

**Claim:** Cutting one unit of a resource (a land, a creature, an artifact) can cost far more than
the unit, if cards in the deck read "for each".
**Evidence:** Cutting a Mountain looked nearly free until Blackblade Reforged was re-read:
*"+1/+1 for each land you control."* On a commander whose power **is** the cost discount, every land
is one mana off every MV 4+ spell — so a single land cut taxes every haymaker for the rest of the
game. Valakut also needs *"at least five other Mountains"*, and Gauntlet of Power only doubles
**basics**.
**Changes:** Grep the list for "for each" and "if you control" before trimming any resource. The
count-scaling cards, not the average, set the real floor.
**Source:** scarlet-witch, the "should we drop a Mountain?" question.

### Card advantage is the stat most often under-built — 2026-06

**Claim:** Measure draw against comparable decks explicitly; it is the most commonly deficient
category.
**Evidence:** Edgar had 3 draw sources against premium decks' 8–12, and six were added.
**Changes:** Count draw against the field early, before payoff optimisation.
**Source:** edgar-markov.

### Price-tier the sample field BEFORE counting card frequency — 2026-08-07

**Claim:** Mixing budget and unconstrained decks into one frequency count doesn't just add noise —
it can **inverse** the signal, because budget lists systematically over-represent whatever is cheap
in a role and under-represent the expensive cards that define the archetype.
**Evidence:** Across 7 Iron Man lists, the single $128 budget deck ran **22 Equipment and 3
artifacts at MV6+**, while all five unconstrained lists ($645–$1,369) ran **12–19 Equipment and
5–10 at MV6+**. Counted together, the budget outlier is the loudest voice for "pure Equipment
voltron"; counted separately, 5/5 of the real field is hybrid. The expensive cards it drops
(Darksteel Forge $46, Portal to Phyrexia $45, Blightsteel Colossus $39) are precisely the
archetype's payoffs.
**Changes:** Price every sample deck first, tier them, and compute field signal **only** within the
tier that matches the build's constraints. State n for that tier. A budget deck is evidence about
budgets, not about the archetype.
**Source:** iron-man.

---

### Improve the strongest single list; don't average the field — 2026-08-07

**Claim:** When a sample contains one clearly-strongest list, use it as the base and make targeted
swaps. Building from "what most decks run" produces a list that is coherent with none of them.
**Evidence:** User's call, and the metrics backed it: the chosen base led its tier on tutors (8 vs
3–4), was near-top on counterspells (5 vs 3–6), had the best manabase, and was the only list with a
deliberate extra-combat package rather than a pile of individually-good cards. Averaging would have
kept the good cards and thrown away the package that made them work.
**Changes:** After measuring the field, rank the tier-matched decks on substance (interaction
count, tutor density, manabase, internal coherence) — **not price** — and check whether one
dominates. If one does, base + targeted swaps beats synthesis. Reserve synthesis for a flat field.
**Source:** iron-man.

---

### A commander's own free-deployment trigger changes which tutors are good — 2026-08-07

**Claim:** When the commander puts permanents onto the battlefield **from hand** for free, tutors
that fetch **to hand** become better than tutors that fetch **onto the battlefield** — the reverse
of the normal ranking.
**Evidence:** Tony Stark's back face puts an artifact from hand onto the battlefield each combat,
free, and auto-attaches Equipment. Fabricate ({2}{U}, to hand) therefore deploys a {12} Excalibur
for two mana total, whereas Whir of Invention would need X=12.
**Changes:** Check where a tutor deposits the card against what the deck already deploys for free
before ranking tutors by rate. Same logic applies to any "cheat from hand" commander.
**Source:** iron-man.

---

### A creature copy of a noncreature effect costs MORE in a deck with noncreature reducers — 2026-08-09

**Claim:** When the same effect exists on both a creature and a noncreature permanent, the creature
version is the more expensive one in any deck running "noncreature spells cost {1} less" reducers —
even at identical printed cost. Check the body's card type against the reducer's wording before
calling two versions equivalent.
**Evidence:** Guttersnipe ({2}{R}, 2/2, "whenever you cast an instant or sorcery spell, deals 2
damage to each opponent") and Fiery Inscription ({2}{R}, enchantment, same trigger, same 2 damage)
are the same card at the same printed cost. In scarlet-witch, Longshot ("noncreature spells you cast
cost {1} less") and Artist's Talent L2 (same wording) apply to Inscription and not to Guttersnipe;
only Ruby Medallion ("red spells") hits both. With all three out, Inscription floors at **{R}** and
Guttersnipe at **{1}{R}** — the creature version costs double.
**Changes:** Add "does the body's card type match the reducer's wording?" to the §1.2 cost-out step.
The same asymmetry compounds with §1.3: the creature version also dies to the deck's own Fiery
Confluence and Chandra's Ignition, which the enchantment survives. Two independent penalties for the
identical printed effect.
**Source:** scarlet-witch — "why don't we have Guttersnipe?"

---

### "Exiles it instead" removal switches off a death-trigger deck's own engine — 2026-08-09

**Claim:** A permanent that replaces opponents' creature deaths with exile is anti-synergy in any
deck whose payoffs read "whenever a creature dies" — however good its stats, it deletes the deck's
own drain triggers for as long as it survives.
**Evidence:** Head of the Hunt (HOB) — *"If a creature an opponent controls would die, exile it
instead."* Under it, Blood Artist, Cordial Vampire, Sangromancer, Blade of the Bloodchief and The
Meathook Massacre never see an opponent's creature die.
**Changes:** Extends SKILL §1.3 from "check the card against your own board" to "check it against
your own **triggers**": grep candidates for die-replacement clauses before seating them in an
aristocrats shell.
**Source:** edgar-markov, HOB set review.

---

### Sweep a new set by indexing once, filtering by identity, classifying 100% — 2026-08-09

**Claim:** The tractable way to honour "go through every card" for a new set: fetch the whole set
into one verified index, filter per deck by colour identity (discarding by rule, not judgment),
then classify every remaining card MAIN/SIDE/NO with a one-line reason — no sampling, no keyword
pre-screens.
**Evidence:** First run on HOB: 193 unique cards → 116 (Mardu) / 74 (Izzet) / 44 (mono-R) pools,
100% of each pool classified, surfacing 5 MAIN + 11 SIDE candidates. The two strongest finds
(Wizard's Staff, Glamdring) match no tribal or keyword screen — they surfaced only because every
card was read, the same gap as the "oracle-text sweep missed a card" correction.
**Changes:** `bun run set-scan <code>` is the tool (scripts/set-scan.ts — update its DECKS map when
a deck is added); review files follow decks/<slug>/research/<code>-set-review-<date>.md.
**Source:** all three decks, HOB set review.

---

### WHEN a pump triggers decides whether it can discount anything — 2026-08-09

**Claim:** For a commander whose cost reduction scales with its power, two pump effects with
identical text are not equivalent if they trigger in different steps. A pump that lands at
**beginning of combat** cannot discount a **precombat main phase** spell; one that lands at
**upkeep** covers both main phases. Compare the trigger step, not just the effect.
**Evidence:** Cait Sith, Fortune Teller ("At the beginning of combat on your turn, scry 1, then
exile the top card… target creature you control gets +X/+0 until end of turn, where X is that
card's mana value") and Tavern Brawler ("Commander creatures you own have 'At the beginning of your
upkeep, exile the top card of your library. This creature gets +X/+0 until end of turn, where X is
that card's mana value'") are the same effect. The Scarlet Witch applies her discount as a spell is
cast, so Cait Sith's pump is unavailable for every precombat cast that turn.
**Changes:** When ranking pumps for a power-scales-discount commander, add the trigger step as its
own column in the role table. A combat-timed pump still covers the postcombat main phase per the
Neheb sequencing rule (CR 500.1), so it is half a card, not a dead one.
**Source:** scarlet-witch — diffing two rival Moxfield lists.

---

### A cut-on-principle group's grounds may not cover every card it names — 2026-08-09

**Claim:** Before rejecting a card because it belongs to a group cut "on principle", read the
grounds the group actually recorded and check they describe *that* card. Group labels over-reach.
**Evidence:** scarlet-witch cut a "one-shot combat pump" group whose stated grounds were *"these
cost a card to add +2 or +3 power for one turn, which is roughly one extra discount — a bad
trade."* Unleash Fury ({1}{R}, "Double the power of target creature until end of turn") sits in
that archetype but adds nothing like +2/+3 — on a commander at 10 power it adds 10, which is ten
mana off every discounted spell for the rest of the turn. The recorded grounds simply do not
describe it.
**Changes:** Treat a principle group as an index, not a verdict — §1.1b applied to groups rather
than single cards. Re-derive any member whose numbers differ from the ones the grounds cite.
**Source:** scarlet-witch — diffing two rival Moxfield lists.

---

### A rider that counts COLORS is near-dead in a mono-color deck — read each ability separately — 2026-08-10

**Claim:** When a card has two unrelated abilities, score them independently — one can be blank
while the other carries the card. In particular, any rider scaling with *"each color among
permanents you control"* is worth exactly 1 in a mono-color deck, because **colorless is not a
color**, so Treasures and colorless tokens add nothing.
**Evidence:** Conqueror's Flail ({2} Equipment) reads *"Equipped creature gets +1/+1 for each color
among permanents you control"* and *"As long as this Equipment is attached to a creature, your
opponents can't cast spells during your turn."* In mono-red scarlet-witch the first clause is a
flat +1/+1 — against Blackblade Reforged's +1/+1 per land, roughly +8. The card is still a strong
include, entirely on the second clause.
**Changes:** Never rate a two-ability card on its headline clause. Score each ability against the
deck, then decide — and treat "for each color" as 1 in mono-color before comparing anything.
**Source:** scarlet-witch — evaluating Conqueror's Flail.

---

# Corrections

Mistakes, root causes, and the guard that prevents a recurrence. Never delete these.

### Repeated the "gap the deck had already filled" mistake twice in one document — 2026-08-10

**What happened:** In a 67-card comparison write-up, recommended **Boseiju, Who Shelters All** as
"the cleanest insurance on the list" for protecting our one big spell, and **Ojer Axonil** as
turning Fiery Inscription and Longshot "from 2 into 4." Both axes were already covered from inside
the 100: **Hexing Squelcher** grants *"spells you control can't be countered"*, and **Artist's
Talent Level 3** already adds +2 to noncombat damage to opponents — and per **CR 616.1** the
affected opponent chooses replacement order, so they apply Artist's Talent first (2 → 4) and Ojer,
needing damage *less than* its power of 4, then does nothing at all.
**Root cause:** This is the same error as *"Recommended a card as filling a gap the deck had already
filled" (2026-08-07)*, whose guard was **"grep the current list for the effect, not just the card
name."** The guard was not run — because the verdicts were written in bulk, 67 at a time, and a
per-card check felt too expensive to repeat. Volume is exactly when it matters most.
**Guard:** When writing more than a handful of verdicts in one pass, do the effect-grep as a
**batch step before writing any of them** — extract the effect phrases from the candidate list and
grep the current 100 once for all of them. A per-card guard that is skipped under volume is not a
guard.

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

### Evaluated an activated ability for only its obvious use — 2026-08-06

**What happened:** Proposed cutting **Captivating Vampire** from Edgar Markov, arguing its ability
("Tap five untapped Vampires: gain control of target creature") competes with attacking and so is
rarely used. The user pointed out the use I hadn't considered: **steal it, then sacrifice it.** With
Viscera Seer, Ashnod's Altar and Master of Dark Rites as free outlets, that is unconditional removal
that also feeds every death trigger in the deck — and it works on hexproof, indestructible and
regenerating creatures.
**Root cause:** Evaluated the ability inside one plan (combat) instead of against the whole deck.
**Guard:** For any activated ability, enumerate its uses **against every other engine in the deck**
before judging it. Steal effects in a deck with a sac outlet are removal, not combat tricks; the same
goes for tap effects, bounce, and "gains control until end of turn."

### Proposed cutting a card that the same swap package makes better — 2026-08-06

**What happened:** Recommended cutting **Sanguine Bond** to make room for Anowon, calling it a
redundant third *gain → they lose* converter with no body. The user vetoed it. They were right, and
the cut was actively backwards: the same pass added **Sangromancer**, which generates a lifegain
event per opponent creature death — exactly what Sanguine Bond converts. The package raised Bond's
value while I was arguing to cut it.
**Root cause:** Evaluated each swap in isolation against the *current* list rather than against the
list as it would exist after the whole package resolved.
**Guard:** Once a swap package is drafted, re-score every proposed **cut** against the post-package
board, not the pre-package one. A card that looks redundant today can be the payoff for something
arriving in the same breath.

### Nominated a cut from a group of four without ranking the group — 2026-08-06

**What happened:** Edgar Markov had four Vampire lords. I nominated **Stromkirk Captain** for the cut
("the 4th lord") and separately wrote of **Markov Baron** *"convoke makes it cheap in practice, keep"*
— never putting the two side by side. The user asked why. Side by side it flips: Stromkirk grants
**the whole team first strike** (a combat multiplier that scales with the go-wide plan and Edgar's
attack counters), while Baron's lifelink is on itself alone and its **madness is dead** in a deck
with no discard outlet. Convoke saves 1–2 mana and only with untapped creatures you weren't
attacking with.
**Root cause:** Two failures compounding. (1) I ranked *one* card against the role instead of
ranking the whole role. (2) The real basis for the nomination was **castability** — Baron is
mono-black, Stromkirk needs red off 15–16 sources — which I never stated, so it never got tested.
**Guard:** SKILL.md §2.1 step 4 is now mandatory: **when a role is over-subscribed, put every card
in it in a table with one column per rider, scored against the current list, before naming a cut.**
And if castability is doing the work, say so — it is a legitimate axis, but only when named.

### The skill's own "don't re-litigate" framing was causing the anchoring — 2026-08-06

**What happened:** Across a 45-card upgrade pass I repeatedly deferred to prior verdicts instead of
re-deriving them — quoting "evaluated and passed", "previously cut, confirmed", "outlets are capped"
as if they were findings. The user identified the cause: the skill *told* me to. SKILL.md's preamble
read *"half the questions have already been settled once, and re-deriving them is how contradictions
get introduced,"* and `decisions.md` carried a heading literally reading **"do not re-litigate."**
**Root cause:** The skill did not distinguish **facts** (a CR citation, oracle text, a measurement —
durable) from **verdicts** ("X beats Y here" — true only of the list as it stood that day). Every
swap since silently invalidated some verdicts, but the framing treated all prior notes as settled.
**Evidence it was doing real damage, all in one session:** Sorin's justification named an 8-card
tier that had shrunk to two targets · Captivating Vampire's steal→sacrifice-as-removal use was never
considered by the original evaluation · Sangromancer had been ranked below the MV4 band before
Anowon existed to feed it · Stromkirk vs Markov Baron above.
**Guard:** New **SKILL.md §1.1b — "A past verdict is evidence, not a ruling."** Facts keep, verdicts
expire; never cite a prior verdict as a reason, cite its *grounds* and check whether they still hold;
re-read oracle text on both sides of every comparison; re-score cuts against the **post-package**
board; and when the user questions a call, re-derive from scratch rather than defending from the
notes. The preamble and §3 were rewritten to match, and **"do not re-litigate" is now banned
phrasing** in the decision logs.

---

### Trusted a stale cached field instead of the authoritative list — 2026-08-07

**What happened:** Reported that the base deck ran 2 Game Changers. It runs 3 — Ancient Tomb was
missed because the per-card `game_changer` boolean was read from a partially-populated local cache
written during a failed fetch. The number mattered: 3 is exactly the bracket 3 cap, so the deck had
**zero** headroom for another Game Changer, not one slot.
**Root cause:** Derived a count from a cached per-object flag rather than from the authoritative
set. The first bulk fetch had 400'd on a missing `Accept` header and written a partial file.
**Guard:** For any list-membership question (Game Changers, banned lists, format legality), fetch
the **list** once and test membership by name — don't read a per-card boolean out of a cache that
may have been written by a partial run. Assert the fetch count matches the request count before
using the result.
**Source:** iron-man.

---

### Claimed a cost below a spell's coloured floor — 2026-08-07

**What happened:** Said The Fire Crystal ({2}{R}{R}) "costs 1 mana with all three reducers out."
Impossible — only {2} is generic, so the floor is {R}{R} = 2, and realistically 3.
**Root cause:** Stacked reducers arithmetically without checking what they were allowed to reduce.
`research/formulas.md` line 30 **already said** *"printed cost − R (generic portion only)"* — the
deck had documented the rule and I ignored its own note.
**Guard:** Count generic symbols first, then apply at most that many reductions. When the repo has
already written a formula down, use it rather than re-deriving from scratch.

### A cut's stated grounds were arithmetically wrong — 2026-08-07

**What happened:** Runaway Steam-Kin was hard-cut on the grounds *"caps at three counters"* while
rivals "add {R} per spell with no cap." Re-deriving: over six red spells it accrues 3 → {R}{R}{R} →
3 → {R}{R}{R} = **one mana per spell, identical to Electro.** The cap limits *storage*, not
*throughput*.
**Root cause:** A rate claim asserted from the card's shape rather than computed over a real turn.
**Guard:** When a cut's reason is a rate, compute the rate over a representative turn. The verdict
survived here on fragility (a 1/1 dies to your own sweeper), but it was filed under the wrong reason
for weeks — and a wrong reason is what gets copied forward.

### An oracle-text sweep missed a card because only two trigger wordings were searched — 2026-08-07

**What happened:** A "token maker" sweep searched `o:"whenever you cast a noncreature spell"` and
`o:"whenever you cast an instant or sorcery spell"` and concluded the pool was four weak cards. It
missed **Iron Man, Tony Stark** — *"whenever you cast a **red spell**"* — which turned out to be the
best of them.
**Root cause:** Treating one phrasing of a mechanic as the mechanic.
**Guard:** Vary the trigger wording across at least the common forms (`noncreature spell` ·
`instant or sorcery` · `<colour> spell` · `spell`) and say which forms were run, so the gap is
visible in the writeup rather than invisible in the result.

### Recommended a card as filling a gap the deck had already filled — 2026-08-07

**What happened:** Recommended Torbran as "the additive damage booster that works, unlike Ojer."
**Artist's Talent Level 3** — already in the deck — reads *"if a source you control would deal
noncombat damage to an opponent or a permanent an opponent controls, it deals that much damage plus
2 instead."* In a mono-red deck that never attacks that is the same card. Torbran would be a second
copy, not a first.
**Root cause:** Evaluated the candidate against the card it was replacing (Ojer) and never against
the cards already on the list — in particular one added four days earlier.
**Guard:** Before calling anything a gap-filler, grep the current list for the effect, not just for
the card name.

---

### A relocated Equipment still delivers its GLOBAL clauses — 2026-08-07

**What happened:** Cut Hexplate Wallbreaker from a voltron deck after verifying that For Mirrodin!
(CR 702.163a) attaches it to a token it creates rather than to the commander. The rules check was
right and the conclusion was wrong: the card's payoff is *"untap **each attacking creature**. After
this phase, **there is an additional combat phase**"* — both **global**. The commander gets the extra
combat no matter who holds the sword. The user caught it.
**Root cause:** Verified the mechanism (where does the Equipment end up?) and never re-read the
payoff (what does it do from there?). Stopped at the first surprising fact.
**Guard:** When a rules interaction moves a permanent somewhere unexpected, **re-read the whole card
from the new location** before judging it. Split the text into *"buffs the equipped creature"* vs
*"global effect"* — only the first is lost when the Equipment relocates. Kaldra Compleat and
Nettlecyst really are dead weight for voltron because every clause is on the equipped creature;
Hexplate Wallbreaker is not.
**Source:** iron-man.

---

### Judged a card by its splashiest ability and missed that it was a free board wipe — 2026-08-07

**What happened:** Proposed cutting Extinguisher Battleship because Station (tap creatures to
animate it) is awkward in a creature-light deck. The user pointed out it isn't in the deck as a
Spacecraft at all — it's there as a **free, fetchable wipe**: *"destroy target noncreature
permanent. Then deal 4 damage to each creature"*, deployed for **zero mana** by a commander that
puts artifacts onto the battlefield from hand.
**Root cause:** Read the mechanically novel ability first and let it define the card's role.
**Guard:** For any card in a "cheat it into play" deck, price the **ETB alone at zero mana** before
judging the rest. Also check the sweeper's number against **your own commander's toughness** — 4
damage doesn't kill a 5/5, which makes it asymmetric in your favour by default, unlike Blasphemous
Act. And a symmetric effect you deploy **from hand at a time of your choosing** is far less
symmetric in practice than one you're forced to cast.
**Source:** iron-man.

---

### Compared cards head-to-head before counting roles, and nearly rebuilt a coherent deck into an average one — 2026-08-07

**What happened:** Proposed a 12-card swap package for a strong sample deck, justified card by
card. The user pushed back that the swaps "aren't 1-for-1, they serve different functions" — which
was exactly right: cutting a counterspell for a cost reducer is moving a slot between roles, not
upgrading a card. Building the role table afterwards showed the base deck's four biggest deviations
from the field (**most tutors, most extra combats, fewest creatures 10 vs 18.6, lowest cost
reduction 6 vs 9.2**) were **one deliberate decision** — it cheats artifacts into play instead of
casting them — and that the package would have moved creatures 10 → 14, converting a committed deck
into the sample average and making its own sweepers worse. Nine of twelve swaps were withdrawn.
**Root cause:** Skipped SKILL.md §2.1 (role skeleton first, compare only within an over-subscribed
role) and went straight to card-vs-card, which makes structural changes look like quality upgrades.
**Guard:** Before proposing **any** swap to an existing list, build the role table and compare it to
the field. Then ask of each deviation: *is this a hole, or is it load-bearing?* A deck that deviates
from the field in several roles **in the same direction** is usually expressing one design decision,
not accumulating several mistakes. Name that decision out loud before touching anything, and treat
every swap that moves a role count as a structural change requiring its own justification.
**Source:** iron-man. The single most valuable correction in this file for evaluating *other
people's* decks.

---
