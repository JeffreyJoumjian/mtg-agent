# Scarlet Witch — Decision log

Append-only. Newest at bottom.

## 2026-07-01 — Initial 100-card build

**Commander:** Scarlet Witch, Chaotic Avenger (Izzet U/R). See strategy.md.

**Cut from the in-hand pile (3):**
- Wonder Man, Hollywood Hero — Power-up payoff with ~no Power-up cards; off-plan.
- Quicksilver, Brash Blur — weak 1/1 aggro; Quicksilver, Speedster is more useful (flash enabler).
- Grapeshot — pure storm payoff, win-more in a control shell. (Sideboard if we pivot to storm.)

**Kept the whole rest of the pile (16)** including the former "sideboard": Vision Quest tutors the
artifact-Visions onto the battlefield buffed; Vision, Spectral Synthezoid is a free-spell engine;
Hex Magic / Vision of Love are cheap card advantage. Scarlet Witch, Wanda Maximoff (2/3 menace) and
Viv Vision are the weakest keeps — kept for flavor + as cheap evasive equipment-carriers.

**Bracket 3, "no Game Changers":** deliberately avoided the GC list — no Rhystic Study, Mystic
Remora, Cyclonic Rift, Fierce Guardianship, Jeweled Lotus, Mana Crypt. (Sol Ring is not a GC.)

**Token flavor rule honored:** token-makers only produce "energy made flesh" — Young Pyromancer
(Elementals), Saheeli (Servo/artifact), Metallurgic Summonings (Constructs), Murmuring Mystic
(Bird Illusions). No goblins/dragons. Skipped Talrand (Drakes) for flavor.

**Extra turns kept light (2):** Temporal Manipulation + Karn's Temporal Sundering. No loop.

**Wanda-equivalent-wins rule:** maxed the Wanda/Vision cards as the creature base even where a
generic would be marginally better (e.g., the Vision suite over vanilla value creatures).

**Tool caught two build errors before finalizing** (`bun run card --deck ... --id ur`):
- Mystic Monastery was off-identity (Jeskai, CI:RUW) → swapped to Frostboil Snarl.
- List was 99; added an Island → 35 lands / 100 total.

**Cost:** sticker ≈ $319; ≈ $70–90 cash after proxying lands + the big cards (see STATUS.md).

**Open / to tune after playtesting:** land count (35) vs the top-end; whether Wanda Maximoff / Viv
Vision earn their slots; whether to add a second finisher or more early interaction.

---

## 2026-08-02 — Bracket 3 finalizer pass

Snapshot of the prior list: `versions/2026-08-02-pre-finalizer-b3.md`.

### Locked in (4 in / 4 out)

| In | Out | Why |
|---|---|---|
| Wiccan, Young Avenger | Call Forth the Tempest | Impulse-draws a card on **every noncreature spell**; a six-spell turn draws six extra cards. $0.24. Tempest was 8 mana with a random cascade. |
| Neheb, the Eternal | Comet Storm | Adds {R} per 1 life opponents lost this turn, at your postcombat main. A Fiery-Confluence turn pays 18 red mana. Comet Storm was redundant with Crackle. |
| Disrupt Decorum | Blazing Crescendo | **Reversal of an earlier bad cut.** Goad all creatures you don't control = a one-sided fog; the deck had no other way to avoid being attacked. 5/11 sample decks run it. |
| Champion's Helm | Swiftfoot Boots | Not redundancy — a **swap**. Haste is worthless here (Wanda's discount is static). +2/+2 is +2 to every discount, and 10 of our 12 creatures are legendary. Hexproof doesn't stack. |

### Reasoning worth keeping

- **Molten-Core Maestro was cut earlier for a measurable reason:** its mana ability needs 5+ mana
  *spent*, and only 6 of 37 fixed-cost instants/sorceries still cost that much after a 2-power
  discount. Wanda's discount actively turns it off.
- **Fellwar Stone was a build error.** In mono-red it often cannot produce {R} at all, and the deck
  has {R}{R} and {R}{R}{R} costs throughout.
- **Pump ranking is Blazing Shoal > Monstrous Rage > Blazing Crescendo.** Shoal is free (pitch a
  red card of mana value X; ~14 legal targets averaging MV 6). Monstrous Rage is +3/+1 for one mana
  *and* leaves a permanent +1/+1 Role. Crescendo is the same +3/+1 for twice the mana.
- **X-spell trap (rule 107.3b):** casting an X-spell "without paying its mana cost" forces X = 0.
  Never point Apex of Power, Improvisation Capstone, Mizzix's Mastery, Electrodominance, or Hit the
  Mother Lode's discover at Crackle with Power, Storm King's Thunder, or Jaya's.
- **Neheb sequencing (rule 500.1):** the postcombat main phase happens every turn whether or not
  you attack. Burn precombat, collect mana postcombat, cast the X-spell there.
- **Whispersilk Cloak is anti-synergistic here** — shroud stops *us* targeting Wanda, turning off
  Livaan, Cait Sith, Blazing Shoal, Chandra's Ignition and Nova Flame. Hexproof only.

### Method change

Ranked whole-deck lists proved useless for deciding cuts — comparing a land to a win condition is
meaningless. Switched to a **role skeleton**: assign target slot counts per role, then compare only
within an over-subscribed role. That immediately isolated win conditions (11 against a target of 8)
as the sole bloated role and made the decision tractable.

### Still unresolved

Six recommended upgrades from the sample study were never seated — Fiery Confluence, Volcanic
Vision, Jaya's Immolating Inferno, Hit the Mother Lode, Fiery Inscription, Solphim. They are logged
in `SIDEBOARD.md` under "Unseated candidates" with the card each would displace. The live decision
is **Solphim vs Fiery Emancipation** — one damage multiplier is right, two is greedy.

## 2026-08-02 (part 2) — the six unseated candidates resolved

Snapshots: `versions/2026-08-02-b3-before-final-six.md` and `-b4-`.

**Taken (4 in / 4 out):**

| In | Out | Why |
|---|---|---|
| Fiery Confluence | Insurrection | MV 4 → **{R}{R}**. Three modes, repeats allowed: 6 damage to each opponent, or a 3-damage sweeper. Best rate in the pool. Insurrection is an 8-mana sorcery that wins through combat and is blank vs creature-light tables. |
| Volcanic Vision | Wild Ricochet | MV 7 → {3}{R}{R}. Regrow a spell **and** deal its MV to each creature *opponents* control — a one-sided wipe that spares our engines. Wild Ricochet was the fourth redirect behind Deflecting Swat, Bolt Bend and Return the Favor. |
| Fiery Inscription | Double Vision | 3 mana, 2 to each opponent per instant/sorcery; a five-spell turn is 30 damage across the table, and it's an enchantment so it survives creature removal. Double Vision was 5 mana to copy one spell a turn. |
| Solphim, Mayhem Dominus | Fiery Emancipation | 4 mana vs 6, and Solphim doubles **only** damage aimed at opponents — Fiery Emancipation triples damage to our own board too, making Blasphemous Act read 39 to each creature. Neither is discounted (creature / enchantment). |

**Withdrawn — two of my own earlier recommendations that the deck outgrew:**

- **Jaya's Immolating Inferno.** Proposed as a Comet Storm upgrade, but Comet Storm was already
  gone. What remained was a fourth X-spell behind Crackle, Storm King's Thunder and
  Electrodominance — and Electrodominance is better than I'd rated it (instant speed, plus a free
  cast of mana value X or less).
- **Hit the Mother Lode.** Its Treasures enter **tapped**, so the mana is for next turn, and
  **Brass's Bounty already fills the huge-mana role better** — ~14 *untapped* Treasures for the
  same 5 mana after the discount. Its free-cast half also loses to Improvisation Capstone's
  Paradigm, which gives a free copy from exile at the start of every first main phase.

**Correction logged:** I had described Insurrection as a protection spell. It is a **sorcery** and
cannot be cast in response to an attack, so it does no defensive work. The actual defensive package
is Disrupt Decorum (goad lasts until your next turn, so it covers opponents' turns), Volcanic
Vision, Fiery Confluence's sweeper mode, and Blasphemous Act.

**Final state:** Bracket 3 = 100 cards, 3/3 Game Changers, $779.35 sticker. Bracket 4 = 100 cards,
10 Game Changers, rebuilt from the finalized B3 and sharing 86 cards. Sideboard = 20 cards,
hard-cut = 8.

## 2026-08-02 (part 3) — Mithril Coat in, Blasphemous Act to the sideboard

Snapshot: `versions/2026-08-02-b3-before-mithril-coat.md`.

**The gap:** the deck had essentially no answer to a board wipe. Champion's Helm grants hexproof,
which does nothing against a wrath (a wrath doesn't target). Commander's Plate grants protection
from W/U/B/G, which doesn't stop a destroy effect that neither targets nor deals damage — and gives
nothing against red. The three redirect spells all require a spell "with a single target," which a
wrath doesn't have. Tyrite Sanctum was the only answer, at 6 mana across two turns.

**Mithril Coat** fixes it: {3}, **flash**, indestructible itself, and it auto-attaches to a
legendary on entry with no equip cost. 10 of our 12 creatures are legendary. Flash is the key —
you hold it up and deploy in response to the wrath.

**Blasphemous Act was the cut, and the premise for keeping it didn't survive checking.** The claim
was that it pairs with the damage doublers. Solphim does double it against opponents' creatures
(26 instead of 13) — but **13 already kills essentially every creature in Commander**, and
Blasphemous Act deals **no damage to players**, so the doubler contributes nothing toward winning.
Solphim's real partners are Chandra's Ignition, Fiery Confluence, Crackle, Thor, Longshot and
Fiery Inscription.

More importantly, Blasphemous Act was **the only sweeper that kills Wanda**. The three that remain
all spare her: Volcanic Vision is one-sided, Chandra's Ignition hits "each *other* creature," and
Fiery Confluence does 3.

**The cost, stated plainly:** the deck now has no *unconditional* wrath. The remaining three all
depend on something — what's in the graveyard, or Wanda's power. Board Blasphemous Act back in
against tables with large creatures.

## 2026-08-04 — Jaya's Immolating Inferno in, Pirate's Pillage out

Snapshot: `versions/2026-08-04-b3-before-jayas.md`. Prompted by a playtest where Apex of Power
exiled the deck's payoffs.

**The real problem wasn't damage volume, it was concentration.** Counting face-damage sources gives
ten, which is plenty — but only **two** could kill a table alone (Crackle with Power, and
Chandra's Ignition once Wanda is pumped). I had filed Jaya's in the sideboard as "a fourth X-spell
behind Crackle, Storm King's Thunder and Electrodominance," which was wrong: Storm King's Thunder
is a *copier*, and Electrodominance hits **one** target. Jaya's is the **second table-killer**.

**Pirate's Pillage was the cut.** It is word-for-word identical to Big Score — discard a card, draw
two, two Treasures — at the same {3}{R}, but a **sorcery** instead of an instant. There is no board
state where you'd rather have it. Card draw 12 → 11, still above the 8–10 most decks run, and the
remaining package keeps five true refills (The One Ring, both wheels, Will of the Jeskai, Hex
Magic) plus Wiccan's per-spell impulse.

**Correction logged — Apex of Power does NOT free-cast.** Its text is "you may **cast** spells from
among them," with no "without paying their mana costs" clause; that's why it adds ten mana. X-spells
exiled by Apex **can** be cast at a real X. I had wrongly listed it alongside the true free-cast
cards (Improvisation Capstone, Mizzix's Mastery, Electrodominance, Arcane Bombardment) in four
documents, all now fixed. The genuine Apex risk is different: anything you don't cast **that turn**
stays exiled permanently, so cast it early in the turn and deploy what you'd hate to lose first.

## 2026-08-04 (part 2) — damage multiplier reversed, and a manabase pass

Snapshots: `versions/2026-08-04-b3-before-emancipation.md`, `-before-manabase.md`.

### Fiery Emancipation back in, Solphim to the sideboard

I originally cut Emancipation for Solphim on "two mana cheaper, no friendly fire, has a body."
All three were weak:

- **The gap is one mana, not two.** Longshot reduces *noncreature* spells, so it applies to
  Emancipation ({1}{R}{R}{R} with Ruby + Longshot) but **not** to a creature like Solphim
  ({1}{R}{R} with Ruby alone).
- **The triple lets X be smaller.** 40 damage needs Crackle at X=4 under a doubler but only X=3
  under a tripler — three mana back on the payoff, against one more to deploy. Net two ahead.
- **Resilience is the real argument.** Commander runs vastly more creature removal than enchantment
  removal. Solphim's indestructible costs {1} + 4 life + **discarding two cards**, and doesn't stop
  exile. Friendly fire from the triple is minor — by the time you're comboing your creatures are
  expendable.

### Manabase: colourless is worse than red, and worse than it looks

**Red mana banks; colourless doesn't.** Electro and Ashling both say *"You don't lose unspent **red**
mana as steps and phases end,"* and rule 500.5 makes end-of-step/phase the only thing that empties
a pool — so red persists indefinitely, across turns, until spent (the Omnath, Locus of Mana
pattern). Every Mountain is a battery under either creature. Colourless mana empties normally.

Against that, 25 of 66 nonland cards need {R}{R} or more.

| Out | In | Why |
|---|---|---|
| Cori Mountain Monastery | Castle Embereth | Cori enters tapped unless you control a Plains or Island — in mono-red, **always tapped**. |
| Scavenger Grounds | a Mountain | Symmetric graveyard hate against a deck that *needs* its graveyard, on a colourless land. |
| Demolition Field | Mines of Moria | Kills one nonbasic and hands them a basic; Mines taps for red and is untapped with any of our ten legendary creatures. |
| Sokenzan, Crucible of Defiance | a Mountain | Taps red, but isn't a **Mountain** (no Valakut trigger) and its channel makes 1/1s in a deck that doesn't attack. |

**Mountains 19 → 21**, which also makes Valakut better. Colourless lands 8 → 5, and the survivors
each buy something a Mountain can't: Ancient Tomb (two mana off one land), Nykthos (its devotion
ability makes *red*, which banks), Tyrite Sanctum (one of only two wrath answers), Forge of Heroes
(a free permanent +1 to the discount), Rogue's Passage and War Room kept on the pilot's call.

**Ramunap Ruins was considered and rejected** — it costs 1 life for red, isn't a Mountain so it
misses Valakut, and the Desert synergy that justified it disappeared when Scavenger Grounds was cut.
Barbarian Ring and Fogwell's Gym were rejected for the same reason: **mono-red has essentially no
lifegain** (a format-wide search returns three unplayable cards), and the deck already bleeds 15–25
a game from Ancient Tomb, The One Ring, War Room and Shatterskull Smashing.

## 2026-08-04 (part 3) — upgrade sweep, 3 in / 3 out

Snapshot: `versions/2026-08-04-b3-before-upgrades.md`. Full research in `upgrade-candidates.md`.

| In | Out | Why |
|---|---|---|
| **Artist's Talent** | Improvisation Capstone | Level 2 is a **third cost reducer** — only two exist in mono-red — plus L1 looting that feeds Past in Flames and L3's +2 to every damage instance. Costs just {R} with Ruby out. |
| **Gauntlet of Power** | Monstrous Rage | All 21 Mountains tap for {R}{R}, and the surplus **banks** under Electro or Ashling. Only affects **basic** lands, and it's symmetric. |
| **Hit the Mother Lode** | Bolt Bend | ~3 mana after reducers. Undiscovered cards go to the **bottom of the library**, not exile, and *"or put it into your hand"* dodges the X=0 trap entirely. |

### Rejected, with reasons

- **Fire Servant** ($0.39, doubles red instant/sorcery damage) — cost it out and it's **4 mana with
  Ruby**, exactly the same as Fiery Emancipation with Ruby + Longshot, which **triples everything**.
  At equal cost the tripler wins, so Fire Servant is only a *second* multiplier — and multipliers
  are win-more. Redundancy in payoffs is good; redundancy in multipliers is not, because a
  multiplier alone does nothing.
- **Comet Storm** — third multi-target X-spell and the worst of the three: multikicker charges {1}
  per extra target while Jaya's gets three free. At 12 mana: Crackle 20 each, Jaya's 14, Comet 12.
- **Call Forth the Tempest** — a genuine second one-sided wrath, but it would be the **third** 8-plus
  mana card alongside Apex and Brass's Bounty, and its cascades free-cast (≈18% to whiff into one of
  the six X-spells). Stays in the sideboard.
- **Delayed Blast Fireball** — 5 to each opponent when cast from exile, which happens often here, but
  Fiery Confluence already does 6 to each for {R}{R} after discount. Overlap, at $16.
- **Fury Storm / Primal Amulet / Lithoform Engine / Twinning Staff** — all marginal upgrades over
  copy effects already in the list.

### Two calls the pilot won on their own read

- **Return the Favor stays.** Its copy mode has **no "you control" clause**, so it can copy an
  *opponent's* spell — and *activated or triggered abilities* as well. Nothing else in the deck does
  either. Bolt Bend, which is redirect-only, was the correct cut instead.
- **Arcane Bombardment stays over Improvisation Capstone.** The deciding factor is where the cards
  come from: Bombardment exiles from the **graveyard** (already-spent cards, so no loss), while
  Capstone strip-mines the **library** every turn and permanently loses whatever you can't cast.

## 2026-08-06 — Kazuul in, Abrade out; and Ojer Axonil rejected

Snapshots: `versions/2026-08-06-b3-before-kazuul.md`, `-b4-`.

### Ojer Axonil, Deepest Might — rejected on a rules interaction

Ojer is a **damage floor of 4** (red sources, noncombat, opponents only), not a multiplier. It would
have doubled Longshot and Fiery Inscription from 2 to 4 and turned Fiery Confluence's 6 into 12.

It fails for two reasons:

- **It cancels out with Fiery Emancipation, and the opponent picks the order.** Rule 616.1: when
  two replacement effects want to modify one event, *the affected player* chooses — and damage to an
  opponent means **they** choose. Ojer first: 2 → 4 → **12**. Emancipation first: 2 → 6, and Ojer no
  longer applies because 6 isn't less than 4 → **6**. They always take 6, which is what Emancipation
  does alone. With Emancipation out, Ojer contributes **zero**.
- **It misses every X line.** Crackle deals 5X, so at X ≥ 1 it's already past the floor; same for
  Jaya's, Electrodominance, Storm King's Thunder, Apex. Ojer touches one of five kill lines.
  Emancipation touches all five, plus damage to creatures.

**Torbran, Thane of Red Fell is the version that would work** and is logged as the alternative:
additive rather than a floor, so it nets +2 per instance *even under the tripler* (opponent's best
order is 2 → 6 → 8, still better than 6), it adds +2 to a 40-damage Crackle where Ojer adds nothing,
and it boosts damage to **permanents opponents control** — which makes Fiery Confluence's "1 damage
to each creature" a one-sided 3-to-theirs, 1-to-ours sweeper. $4.27 against Ojer's $23. Not seated
because it's still a *second* damage booster in a role deliberately trimmed to one; the trigger to
revisit is a game where Longshot/Inscription chip is what kills the table rather than an X-spell.

### Kazuul, Tyrant of the Cliffs in, Abrade out

The question that prompted this was whether to run a token-per-spell maker as chump-block fodder.
The instinct was right — **defence is the deck's one real structural weakness** — but the 1/1
version is self-defeating here: Fiery Confluence's "1 damage to each creature" mode taken three
times is 3 to each creature, and Chandra's Ignition hits "each *other* creature". Your own two most
castable sweepers wipe your own blockers. And 1/1s don't stop Commander-sized attackers.

**Kazuul is the token maker that actually defends.** Whenever an opponent's creature attacks and
you're the defending player, they pay {3} or you get a **3/3 Ogre**. The trigger resolves during
declare attackers, so the Ogres are available to block **that same combat** — the only option found
that produces blockers at the moment they're needed. Either outcome is good: the attack gets taxed,
or you build a board. Plus a 5/4 body, and it's 34¢.

Known costs, accepted: it's five mana (four with Ruby Medallion; Wanda doesn't discount creatures),
it dies to removal, and your own **Chandra's Ignition kills it** once Wanda's power is 4 or more —
the Ogres die to a 3-power Ignition too. Fiery Confluence at 3 does *not* kill Kazuul.

**Abrade was the cut**: mana value 2, so Wanda never discounts it, and 3 damage kills very little in
this format. Trading a small one-shot answer for a permanent one. Abrade stays in the **Bracket 4**
list, where five mana of pure defence is the wrong shape — B4 intends to be dead or victorious
before anyone's attack step matters. B3/B4 shared count drops 86 → 85, swap 14 → 15.

**Crawlspace was the runner-up** ({3} artifact, max two attackers at you per combat). Its genuine
edge is that it's an **artifact**, so unlike every creature-based defence plan it survives your own
sweepers. It lost on price — $9.93 against $0.34 — and on doing nothing when nobody attacks.

### Documentation fix found while editing

The sideboard existed in **three** places with three different counts: `DECK.md` claimed 20 and
listed 22, `SIDEBOARD.md` claimed 20 and listed 26, `pdf.json` carried 24. The `DECK.md` copy had
drifted worst — it still listed **Fiery Emancipation and Hit the Mother Lode as sideboard cards**
after both were moved into the 100 on 2026-08-04. `DECK.md`'s copy is now a pointer;
**`SIDEBOARD.md` is the single source of truth**, and `pdf.json` is synced from it.

## 2026-08-07 — The Fire Crystal + Iron Man in; Mind Stone + Apex out

Snapshots: `versions/2026-08-07-b3-before-ironman.md` and `-STATUS.md`.

### The Fire Crystal in, Mind Stone out

The Fire Crystal's first line is **word-for-word Ruby Medallion** — *"Red spells you cast cost {1}
less to cast."* Cost reducers are the one category where redundancy is unambiguously correct: they
stack additively and can never blank each other, unlike multipliers.

**Correction, caught by the pilot:** I first claimed it could cost 1 mana. It can't. **Reductions
only eat the generic portion of a cost** — `formulas.md` line 30 already said *"generic portion
only"* and I ignored it. {2}{R}{R} has just {2} of generic, so Ruby and Longshot take it to
{R}{R} and **Artist's Talent L2 then does nothing.** Floor is 2; realistically **3 mana**.

Ramp was ranked whole before naming a cut. **Mind Stone came last**: the only pure-colourless rock
left, and colourless doesn't bank under Electro or Ashling. Accepted cost — this trades a two-drop
for a three-drop; Ruby Medallion already holds the cheap-reducer slot.

### Iron Man in, Apex of Power out

Iron Man makes a **2/1 flier per red spell** — the broadest trigger of any token maker in the pool,
and permanent tokens rather than end-step sacrifices. The reason it's a real win condition and not
win-more: **Fiery Emancipation has no noncombat restriction**, so it triples *combat* damage too.
Six Robots is 12 power, **36 with Emancipation**. Note the asymmetry — Artist's Talent L3 *is*
noncombat-only, so it does **not** pump them.

**Apex of Power was the cut, and its own text made the case:**

- *"If this spell was cast from your **hand**, add ten mana."* From the graveyard it adds **zero** —
  dead off Past in Flames, Mizzix's Mastery and Will of the Jeskai, in a deck built to recur.
- **Seething Song nets the same +4 mana for 1 mana instead of 6** (Song is MV 3, so Wanda doesn't
  apply; Apex is 10 − 2 − 1 − 1 = 6 and adds 10).
- Its exile window ends **that turn**. Every other impulse effect in the deck — Commune with Lava,
  Ignite the Future, Hex Magic, Wiccan — runs until the end of your *next* turn. Apex is the only
  one with a same-turn deadline, which is the mechanism that cost a real game, not bad luck.

What was genuinely lost: the only big-mana card **not contingent on the table** (Mana Geyser needs
tapped opponent lands, Brass's Bounty scales with your lands, Jeska's Will with their hand), and the
widest single dig. Judged acceptable because at 6 mana you already need the board that turns those
conditional cards on.

### Kazuul stays; dropping a Mountain was rejected

**Blackblade Reforged is the decisive number** — *"+1/+1 for each land you control."* At 33 lands
that's +33/+33 on Wanda, and her power **is** the discount, so **every land cut is one more mana on
every MV 4+ spell.** Add Valakut needing *"at least five other Mountains"*, Gauntlet of Power
doubling **basics** only, Brass's Bounty scaling per land, and red banking so an untapped Mountain
is never dead. (Correction: **Nykthos scales off devotion, not lands** — neutral here.)

### Sideboard hygiene

Two "Displaces" pointers went stale the moment this swap landed — Call Forth the Tempest pointed at
Apex and Fellwar Stone at Mind Stone, both now out of the deck. Repointed to Brass's Bounty and
Arcane Signet. **Runaway Steam-Kin moved from hard cut to sideboard** with corrected grounds, and
**Thought Vessel** was hard-cut (strictly worse than Mind Stone, which itself just lost its slot).

### Stats were recomputed, not adjusted

The PDF's *"Discounted (MV 4+) = 25"* reproduced under no definition — X-spells were being counted
at X = 0. Now computed as instants/sorceries with MV 4+ **or** an {X} in the cost = **24**.
Creatures corrected 14 → **16**; the hand-set figure had missed the Artifact Creatures.

### Open question flagged, not changed

**Bracket 4 still runs Apex**, and the from-hand-only clause bites *harder* there — that list is
built around Underworld Breach recursion. Noted in `DECK-B4.md`; not changed without a decision.

## 2026-08-19 — Conqueror's Flail in, Hexing Squelcher out

Prompted by the rival-list diff (`rival-lists-2026-08-09.md`) plus a direct request to evaluate
the Flail. User's call after discussion of three cut doors.

**Grounds for the add:** the deck's whole plan is *survive to one turn, resolve one enormous
spell*, and every common way that fails is an opponent casting during our turn — a counter on
Crackle, instant-speed removal on Wanda mid-Ignition, an artifact wipe on Emancipation.
*"Opponents can't cast spells during your turn"* answers all of it proactively from an Equipment
our own sweepers can't kill. The pump clause is a flat +1/+1 here (mono-red; colorless isn't a
color) and played no part in the decision.

**Grounds for Squelcher as the cut** (not Champion's Helm, not a win condition): (1) its 2/2 body
dies to our own Fiery Confluence and Chandra's Ignition on exactly the turn it's needed; (2) its
on-turn counter-coverage is a subset of the Flail's lockout, leaving only off-turn protection of a
flashed Mithril Coat / Deflecting Swat as unique value — judged too narrow; (3) Champion's Helm
keeps covering what nothing else does: red and colorless targeted removal on opponents' turns,
which Commander's Plate's W/U/B/G protection misses. Protection stays at 6; Win Conditions stays
at 10 (the door of taking the slot from the over-target wincon role was raised and not taken).

**Rejected alternative:** cutting Champion's Helm instead — right only for counterspell-heavy
pods, so Squelcher's sideboard entry displaces the Helm, not the Flail.

Applied to both `DECK.md` and `DECK-B4.md`. Play note: don't equip Wanda by default — the lockout
needs the Flail on *a* creature, and she's the removal magnet; a Robot token or Storm-Kiln Artist
holds it through her dying.

## 2026-08-21 — V2 recomposition: damage conversion (side-by-side with V1)

Prompted by a play report, not a card question: *"I can't do anything the whole game for 8+ turns
until I draw enough damage output … very strong when it gets going, but they had to leave me
alone for 8 whole turns."* Per LEDGER 2026-08-20 (a repeated in-game failure outranks the
list-derived verdicts it touches), the structure was re-derived before any card was named. Full
workings: `damage-pass-2026-08-21.md`. **Applied as `DECK-V2.md`; `DECK.md` (V1), `STATUS.md` and
`SIDEBOARD.md` are untouched so both versions can be tested** — the Iron Man V2 precedent.

**Diagnosis (measured):** 54 of 99 slots make or discount mana; 12 draw; **5 permanents turn a
cast spell into damage** (Longshot, Fiery Inscription, Thor, Urabrask, Ashling); 6 of ~35
instants/sorceries hurt an opponent. P(at least one converter in the first 12 cards) = 48%. That
is the eight turns. Verdicts overturned: "T6+ look for the turn" (it's T8+), "commander damage is
backup only", "the pinger package is a different deck" (the grounds hold for 2/2 bodies; the
conclusion was the reported failure), and — implicitly — "more mana is better".

**Seven swaps (grounds in one line each; the full row-by-row table is §7 of the pass doc):**

| Out | In | Grounds |
|---|---|---|
| Ancient Tomb → a Mountain | — | Keeps Game Changers at 3/3 once Gamble is in; a Mountain under Gauntlet is an Ancient Tomb in red that banks and costs no life. Cost: the Tomb-into-turn-2-Wanda opener (~8% of games). |
| Iron Man, Tony Stark | Gamble (GC) | Pilot's call. Win Conditions was the one role over its own target (10 vs 8); Iron Man was seated 2026-08-07 as insurance against not finding the X-spell kill — the job Gamble plus two converters now does directly — and its Robots die to Confluence's creature mode and Ignition (the Young Pyromancer grounds). |
| Increasing Vengeance | Boltwave | Fifth-best of five Crackle-copiers (Goggles free, Reverberation two copies for the same {R}{R}, Storm King's Thunder, Return the Favor); copies aren't *cast* so it never triggers a pinger. Boltwave is 3 to each opponent on turn 2, 9+ with converters out, and copies the way the pilot already copies rituals. |
| Birgi, God of Storytelling | Fated Firepower | Birgi and The Vision and Scarlet Witch have the same trigger (any spell → {R}; both bank under Electro); the Vision grows into a threat and is the flavour piece; Birgi's extra text is blank here. Firepower: {X}{R}{R}{R}, flash, enchantment, +X to every damage instance to opponents and their permanents; X=4 for {R}{R}{R} with Ruby + Fire Crystal + Longshot + Artist's Talent L2. **0% on every EDHREC view — a merit pick**, stated as such. |
| Blazing Shoal | Guttersnipe | Shoal is two cards for one bigger X-spell — the axis V2 stops leaning on. Guttersnipe is the field's top missing card (53% in the Burn sub-field, 5/10 samples): Fiery Inscription on a body for {R} after the medallions. Dies to Ignition after it has triggered. |
| Cait Sith, Fortune Teller | Nico Minoru, Runaway | Pilot's suggestion. Cait was the lowest-impact pump (one impulse a turn, a pump timed for postcombat). Nico: 2 to each opponent per spell cast from anywhere other than hand — 14 enablers already in the list — a 2/4 that survives Confluence ×3, and a Marvel witch. $18 💰, 0% field. |

**Pilot overrides logged (all correct, all in LEDGER):** the rituals stay — under Electro/Ashling
every red mana banks across turns and the pilot copies rituals for "+10 just sitting there", so
"dead until the kill turn" was wrong for a banking deck; Wheel of Fortune over Fervent Mastery
(hand-size-taxed tutor in a hand-dumping deck); Hit the Mother Lode stays (tapped Treasures are
banked mana, which this deck wants); Inventors' Fair declined (a 4-mana-plus-a-land tutor that is
never the mid-stack save it looks like); Rogue's Passage stays (the voltron road).

**Corrections:** Blackblade Reforged's "+33/+33" in the 2026-08-07 entry conflated lands in the
*deck* with lands *controlled* — it is +6 to +10 in practice (LEDGER 2026-08-21). The
commander-damage road is a two-swing kill on one player at 10–12 power, and Crackle at X=4 for
{R}{R}, not X=11. Sword of Wealth and Power was asked about and declined: protection from
instants and sorceries blanks *our own* Chandra's Ignition on Wanda (the Whispersilk Cloak
failure, narrower); noted in the pass doc.

**Rejected for the package, with grounds:** Torbran (creature version of Torture Pit, Ignition
kills it, −0.16 synergy); Hawkeye / Thor, Asgard's Avenger (Marvel, but +2/+1 on a body loses to
+X on an enchantment); Aria of Flame (30 life to the table); Sentinel Tower / Caldera Pyremaw
(single target); the Chandra walkers (copy/role mismatch, attack magnets — Hope's Beacon noted as
the strongest copy-role upgrade found); Electrodominance as a cut (55% in Burn, one of six damage
spells); Fervent Mastery, Inventors' Fair, Imperial Recruiter, Goblin Engineer (tutor pass).
Thor, Guardian of Midgard is the payoff follow-on once converters are seated, never a swap for
Thor, God of Thunder. Go-further tier: Electrostatic Field, Enraged Flamecaster, Torture Pit,
Khorvath's Fury, Delayed Blast Fireball, Passionate Archaeologist ← for Gauntlet of Power, the
Vision, Tablet of Discovery.

**Validation:** `bun run card --deck decks/scarlet-witch/DECK-V2.md --id r` — 100 cards,
commander-legal, mono-red, 3/3 GCs. `DECK-B4.md` untouched (already runs Gamble, no GC cap,
different structure). Moxfield export of V2 with the pilot's preferred printings:
`research/v2-moxfield-2026-08-21.txt`.

**Revisit trigger:** three to five games on each list. V2's questions are whether a converter is
on the board by turn 4–5 (it should be ~2 games in 3), whether Firepower ever feels like a blank
(it needs a damage source — it shouldn't with eight), and whether the pump role at two (Livaan,
Blackblade) is too thin for the X-spell turn.

## 2026-08-21 (part 2) — Runechanter's Pike and Path of the Pyromancer into both lists

Prompted by the pilot's closing list (Pike, Path, Spider-Punk, Gandalf Goblins' Bane, Venser's
Journal); all five verified with `bun run card` and checked on the base, Burn, Spellslinger,
X-Spells and Storm EDHREC views. Snapshot: `versions/2026-08-21-b3-before-pike-path.md` (+STATUS).

| List | Out | In | Grounds |
|---|---|---|---|
| V1 (`DECK.md`) | Blazing Shoal | Runechanter's Pike | *"+X/+0 and first strike, X = instants and sorceries in your graveyard; equip {2}."* A **permanent** pump = permanent discount, ~+6 to +12 by turn 7 (same magnitude as Blackblade, which is +1/+1 per land *controlled*), free to cast after Longshot + Artist's Talent. Shoal was the same +X for one turn at the cost of two cards. 36% base / 23% Burn / 67% Big Mana — higher than Blackblade's 25%. Known costs: Past in Flames, Will of the Jeskai, Mizzix's Mastery and Arcane Bombardment exile from the yard and shrink X; graveyard hate; no toughness. Pike + Blackblade on Wanda (~18–20 power by turn 7) makes the Rogue's Passage road a one-swing kill. |
| V2 (`DECK-V2.md`) | Tablet of Discovery | Runechanter's Pike | V2's pump role was at two (Livaan, Blackblade); Tablet was the fifth 1–3-mana rock behind Sol Ring, Signet, Ruby, Fire Crystal with 33 lands, and the pilot's report says mana was never the bottleneck. Converters untouched. |
| both | Reforge the Soul | Path of the Pyromancer | *"Discard your hand. Add {R} for each card discarded, then draw that many cards plus one."* MV 5, so Wanda discounts it to **{R}**; the vote does nothing outside Planechase. An asymmetric wheel that pays you — the {R} × H banks under Electro / Ashling — where Reforge refilled three opponents for your seven. 34% base / 42% Spellslinger / 59% X-Spells / 60% Storm. **Honest floor:** on an empty hand Path draws one, Wheel draws seven, so Wheel of Fortune stays as the empty-hand refill and Path is for the hand of 3–5 stranded cards. The miracle cost is the loss. |

**Declined, with grounds:** Spider-Punk (sideboard for counterspell pods — *damage can't be
prevented* switches off The One Ring's protection-from-everything fog and Commander's Plate's
prevention; 2/1 body; 13% base / 17% Burn); Gandalf, Goblins' Bane (half Guttersnipe's rate on a
creature, $8, Flameshape gated on a Wizard the deck doesn't otherwise have — behind Electrostatic
Field and Enraged Flamecaster in the go-further tier); Venser's Journal (the hand is empty by design
— Reliquary Tower and Thought Vessel already lost on those grounds; 1 life per card in hand at five
mana).

**Knock-ons handled:** `STATUS.md` lines and a dated buy block; `SIDEBOARD.md` rows for Blazing
Shoal (displaces Pike) and Reforge the Soul (displaces Path), count 32 → 34; `pdf.json` swaps +
sideboard synced; `formulas.md` §7 pump row; `gameplan.md` cheat sheet, §4 pump list, §6 HOLD rows,
§13 mistake #10, scenario 12 rewritten for Path; `DECK-V2.md` swap section and
`research/v2-moxfield-2026-08-21.txt` (Pike ISD 231, Path MOC 34). **`DECK-B4.md` was not changed**
— it still runs Blazing Shoal and never ran Reforge, so the computed B3↔B4 swap is now 17 cards /
83 shared (its swap section and the PDF's upgrade page were recomputed to say so). Validation:
`bun run card --deck … --id r` on both lists; `bun run deck:pdf scarlet-witch` rebuilt.

## 2026-08-21 (part 3) — Reforge the Soul stays; Path of the Pyromancer reverted

**Pilot's call, same day:** *"I don't want to get rid of Reforge the Soul — it's a good bit of hand
denial."* Reverted Path of the Pyromancer → Reforge the Soul in **both** lists (the Pike swaps
stand). The grounds are real and were under-weighted in part 2: a symmetric wheel cast the turn
before the kill turn makes every opponent **discard their sculpted hand** — the held counterspell,
the assembled combo — and seven random cards rarely contain the exact answer again. For a deck
whose one big turn dies to a single counter, that's protection-by-discard, the closest mono-red
gets to a Thoughtseize, and it's the axis that distinguishes a symmetric wheel from a self-only
one like Path. Part 2 scored the two wheels only on the refill axis. Logged in LEDGER.

Knock-ons undone: `DECK.md`, `DECK-V2.md`, `STATUS.md` line + buy block, `SIDEBOARD.md` (Reforge
row removed, count 33), `pdf.json` (Path swap and Reforge sideboard entry removed; Mox Amber ↔
Reforge row restored), `DECK-B4.md` swap text, `gameplan.md` (cheat sheet, HOLD rows, scenario 12 —
now also states the hand-denial reason), the Moxfield export. Path of the Pyromancer remains a
noted candidate for a *different* draw slot if one opens.

## 2026-09-08 — V2 promoted to `DECK.md`; Bracket 4 retired; `DECK-V3.md` (the chain build) added

Prompted by a play report, again: the pilot lost to an opponent playing the same commander who put
Wanda at ~25 power and ended the game on **turn 5**, with three Game Changers and no banking
engines. Investigation first, cards second — `research/turn-5-chain-2026-09-08.md` carries the
mechanism, the simulation and every verified candidate. Three decisions came out of it.

### 1. V2 → `DECK.md` (pilot's call)

`DECK-V2.md` had been sitting side by side with V1 since 2026-08-21. Promoted verbatim — **no
card changed in the promotion itself**. V1 is snapshotted to `versions/2026-09-08-v1-retired.md`
(+ `-STATUS.md`), `STATUS.md` and `SIDEBOARD.md` now mirror the promoted list, and the six
displaced cards (Ancient Tomb, Iron Man, Increasing Vengeance, Birgi, Cait Sith, Tablet of
Discovery) moved into `SIDEBOARD.md` with a "displaces" pointer each, per the 2026-08-21 plan.

### 2. `DECK-B4.md` retired to `versions/2026-09-08-b4-retired.md` (pilot's call)

The pilot asked what actually made it Bracket 4. Computed from the two files rather than recalled:
the 17-card swap added **six Game Changers** (Underworld Breach, Lion's Eye Diamond, Grim Monolith,
Mana Vault, Chrome Mox, Mox Diamond) plus Gamble, on top of V1's three — **ten against a cap of
three**. That is the whole reason. Its one two-card infinite, **Reiterate + Mana Geyser**, is a
loop whose iteration count the pilot chooses, which by their own line (2026-09-06, LEDGER) is not
an "automatic or unstoppable" infinite; it was never the deciding factor. The B4 pointers are gone
from `DECK.md`, `SIDEBOARD.md` and `pdf.json`, and none of its distinctive cards is on a buy list.

### 3. `DECK-V3.md` — a second Bracket 3 list built on the recurrence

**The finding, in one line:** with Livaan out, an X-spell costs only its coloured pips and roughly
*doubles* Wanda before it resolves, because X counts toward mana value while the spell is on the
stack (CR 202.3e) and reductions eat only generic (CR 601.2f). `X = ⌊(W+r)/k⌋`, `W' = W + kX + p`.
Storm King's Thunder into Jaya's Immolating Inferno is **five red pips** for 21 to each opponent
from an unpumped Wanda, 55 with one Bonesplitter down first, 171 from a seed of 8.

**This was castable from our own list since 2026-07-01 and no document said so.** `gameplan.md` §5
told the pilot to wait for turn 6 and 12+ mana; `formulas.md` §7 scored Livaan as "+5 off your next
spell"; `considered-and-cut.md` cut one-shot pump as "roughly one extra discount — a bad trade".
Each was right about its own card and wrong about the sum. Logged as a Correction in LEDGER.

**Role skeleton (deck-brain §2.1), targets vs. final:**

| Role | Target | Final | Notes |
|---|---|---|---|
| Lands | 32 | 32 | 27 red sources (21 Mountain + 6 red utility). War Room cut — colourless utility competes with pips. |
| Pips: rocks, rituals, reducers | 9 | 9 | Sol Ring and Signet pay the generic halves; the three rituals are the extra chain links. |
| Per-spell engines | 4–5 | 5 | Storm-Kiln and Ashling read *"cast **or copy**"*, so they scale with the chain; the other three refund one pip per cast. |
| **Seed** (power before the first X-spell) | 8–10 | 9 | Bonesplitter, Shuko, Coral Sword, Inventor's Axe, Hero's Blade, Blackblade, Pike, Monstrous Rage, Gauntlet of Power. Plus Forge of Heroes and Tyrite Sanctum in the lands. |
| Pump engine | 1 | 1 | Livaan. The `{X}{R}` instants are its redundancy, counted under doublers. |
| **Doublers** | 10–12 | 11 | SKT, Jaya's, Crackle, Commune, Electrodominance, Comet Storm, Lunar Frenzy, Frantic Confrontation, Bionic Blow, Unleash Fury, Bulk Up. |
| Copy and recur | 5–6 | 6 | Past in Flames and Will of the Jeskai keep X (flashback cost = mana cost), so they are a second chain out of the graveyard. |
| Draw / refuel | 8–10 | 8 | |
| Conversion / closers | 2–3 | 3 | **Thor is the converter that belongs here** — his damage is the spell's *mana value*, the number the chain inflates. Longshot also reduces. Chandra's Ignition reads her power directly. |
| Protection | 5–6 | 5 | Conqueror's Flail is the best card in the deck for this plan. |
| Removal / defence | 4–5 | 5 | Kazuul kept as the permanent defence — the deck still has to reach turn 5. |
| Cheap seeds that refuel | — | 5 | Twinferno, Blazing Crescendo, Titan's Strength, Fists of Flame, Ignite the Future. |

**Game Changers 3/3: Ancient Tomb · Jeska's Will · Gamble.** Ancient Tomb replaces The One Ring
here on the deciding axis of *speed*: this list wants Wanda on turn 2–3 and Livaan the turn after,
and colourless mana pays for exactly the generic costs it has (Wanda's {2}, Livaan's {2}, equips,
ritual halves). The One Ring is better in a grind and worse in a race.

**Rejected for V3, with grounds:**

- **Mizzix's Mastery, Hit the Mother Lode, Nico Minoru, Electrodominance's rider** — every
  free-cast forces X = 0 (CR 107.3b). A chain deck must not point one at its own X-spells.
  Electrodominance stays for its *own* X; its free cast is for a fixed-cost card only.
- **Fiery Emancipation** — six mana to triple a turn already dealing hundreds. Fair-turn card.
- **Guttersnipe, Fiery Inscription, Fated Firepower** — per-*cast* damage, and a chain turn is
  few casts and many copies. Strictly better in `DECK.md`, strictly worse here.
- **Neheb** (mana arrives postcombat, after damage), **Brass's Bounty / Inspired Tinkering** (big
  *mana*, and the constraint is pips), **Arcane Bombardment / Volcanic Vision / Disrupt Decorum /
  Zuko's Exile** (too slow for a turn-5 plan).
- **Colossus Hammer** — +10/+10 for {1} is the best seed in the pool on rate, but equip {8} needs
  Magnetic Theft ($5.16) or Brass Squire to be real. Two cards for one seed; flagged, not taken.
- **Blazing Shoal** — a free +X, but it costs a second card. Left in the sideboard.
- **Reiterate** — allowed at the pilot's Bracket 3 tables (2026-09-06) and genuinely strong here
  as a buyback copier. Out on **price** ($18.77), the same grounds as before. Re-raise it if the
  budget moves.
- **The One Ring** — see the Game Changer note above.

**Not changed, deliberately:** `DECK.md` keeps its whole conversion package. The two lists answer
different questions and the pilot has said they enjoy Bracket 3 — this is two Bracket 3 lists at
3/3 Game Changers, not a step up in bracket. The chain uses no Game Changer at all.

**Validation:** both lists at exactly 100, all commander-legal, all mono-red, 3/3 Game Changers
(`bun run card --deck … --id r`, plus a scripted Game Changer audit). `MOXFIELD.txt` and
`MOXFIELD-V3.txt` regenerated; `pdf.json` stats recomputed from the list rather than adjusted, the
Bracket 4 upgrade page replaced by a chain-build page, PDF rebuilt at 21 pages.

**Tooling defect found while validating, and fixed.** `bun run card --deck` was **silently
skipping every double-faced card** — it indexed Scryfall's full `"Front // Back"` name and looked
up the decklist's front face, missing, and `continue`-ing. For this deck that was Shatterskull
Smashing, Valakut Awakening and **Urabrask**: three cards that had never been priced,
legality-checked or identity-checked by the tool the repo uses as its validation gate. Fixed in
`scripts/card.ts` via a new `indexByDeckName` helper in `scripts/lib/decklist.ts`, with three
regression tests. The deck's sticker total moved $694.97 → $738.32 as a result; nothing was
illegal or off-identity.

### Preferred printings pinned (2026-09-08, same day)

The pilot supplied a full printing list for `DECK.md`. It is saved as
`research/printings.txt` — the path `bun run deck:moxfield` reads by default — so both exports
pin it and neither is hand-edited (deck-brain §1.4). **All 81 references were verified against
Scryfall by set and collector number before the export**; every one resolves to the right card,
including the treatments the pilot chose deliberately: The Scarlet Witch (MSH) 368 borderless,
Chaos Warp (MAR) 69 borderless, Pyretic Ritual (SLD) 1064 borderless, Storm-Kiln Artist (CMM) 644
borderless, Sol Ring (SLD) 2683 inverted, Fiery Emancipation (M21) 366 extended art, and Nykthos
(PPRO) 2022-3, a promo.

`MOXFIELD.txt` is now **fully pinned** (79/79 lines). `MOXFIELD-V3.txt` is pinned for the 63 cards
it shares with `DECK.md` and exports the other **17 as bare names** — Moxfield resolves those to
its own default printing. They are the cards unique to the chain build: Ancient Tomb, Bonesplitter,
Shuko, Coral Sword, Inventor's Axe, Hero's Blade, Monstrous Rage, Lunar Frenzy, Frantic
Confrontation, Bionic Blow, Unleash Fury, Comet Storm, Twinferno, Blazing Crescendo, Titan's
Strength, Fists of Flame, Increasing Vengeance. Add lines for them to `printings.txt` and re-run
the exporter if the chain build gets sleeved.

### Fiery Emancipation in the chain build — the grounds, sharpened (2026-09-08)

The pilot asked whether the chain build needs damage multipliers at all. Modelled rather than
asserted (`scratchpad` sim, method identical to `turn-5-chain-2026-09-08.md` §2 but with the
**MV ≥ 4 gate on Wanda's discount** correctly applied, zero spare generic, Livaan out):

| Line | Red pips | Damage to each of three targets |
|---|---|---|
| Storm King's Thunder → Jaya's, seed 2 | 5 | 21 (not lethal) |
| Storm King's Thunder → Jaya's, seed 4 | 5 | **55** |
| Emancipation → SKT → Jaya's, seed 4 | 8 | 759 |
| Lunar Frenzy → SKT → Jaya's, seed 4 | 6 | 406 |

**The original grounds ("six mana to triple a turn that already deals hundreds") were right in
conclusion and lazy in reasoning.** Emancipation is *not* a blank in the chain — at mana value 6 it
is a noncreature spell, so Livaan pumps Wanda by 6 as it resolves, and it is a genuine link. It
loses on **pips per point of power**: at seed 4 Lunar Frenzy is +9 power for one red pip,
Emancipation is +6 for three. And the ×3 is applied to a number already several times past lethal,
which cannot be banked — three opponents at 40 is a hard ceiling on what any multiplier converts.

**Generalised into LEDGER:** a damage multiplier earns its slot where the deck's damage is *flat*
(per-cast triggers) and is dead weight where the damage is *exponential* (an X that the deck's own
engine inflates). `DECK.md` keeps Emancipation for exactly the reason `DECK-V3.md` cuts it.

**If the pilot wants Emancipation in V3 anyway, the cut is Kazuul, Tyrant of the Cliffs.** It is
the only five-mana card in the list that contributes nothing to the chain, and its Ogre tokens die
to the deck's own Chandra's Ignition and Fiery Confluence. The honest cost of that swap: Kazuul is
V3's **only permanent deterrent to being attacked**, so the swap trades the one structural answer
in that row for a multiplier (compare the 2026-08-24 correction — cutting the only cover for a row
and calling it "weakest"). The cut that costs nothing structural is **Twinferno**, which at mana
value 2 gets no discount at all and is the fifth copy effect.

**Second finding, now in `DECK-V3.md`'s play notes:** the `{X}{R}` pump instants need a little
generic mana before Wanda is big. Her discount is gated at mana value 4+, so Lunar Frenzy must be
announced at X ≥ 3 to be discounted at all; at base power 2 with only red pips available it
announces X=0 and does nothing. From power 3 up it is free and enormous. This strengthens the case
for Forge of Heroes and Tyrite Sanctum, which put permanent counters on her for no coloured mana.

### Boosters re-derived with the right reducers, and Solphim overtakes Emancipation for V3 (2026-09-08)

**Correction first.** The model behind the entry above applied Wanda's discount to Fiery
Emancipation. It is an **Enchantment**; her reduction is *instants and sorceries* only, so she
gives it nothing. Corrected costs on a Wanda-4 board with Ruby Medallion out:

| Card | Type | Reducers that apply | Real cost |
|---|---|---|---|
| Fiery Emancipation | Enchantment | Ruby, Fire Crystal, Longshot, Artist's L2 | {R}{R}{R} + 2 generic |
| Solphim, Mayhem Dominus | Creature | Ruby, Fire Crystal only | {R}{R} + 1 generic |
| Chandra's Ignition | Sorcery | all of them, incl. Wanda | {R}{R} |
| Jaya's Immolating Inferno | Sorcery | all of them, incl. Wanda | {R}{R} |

Livaan reads *"whenever you cast a **noncreature** spell"*, so Emancipation pumps Wanda by 6 and
**Solphim pumps her by nothing**. The pips-per-power conclusion is unchanged; the quoted costs
were wrong by two mana and are fixed here and in LEDGER.

**Solphim is the better booster for this list, reversing the 2026-08-04 sideboard verdict.** That
verdict ("doubles instead of triples, and it's a creature that dies to removal") was made for the
V1 grind list. Re-derived against V3 (§1.1b — verdicts expire, facts keep):

- **Two red pips against three.** On the turn that matters, pips are the budget.
- **It is opponent-restricted** — *"damage to an opponent or a permanent an opponent controls"* —
  where Emancipation is *"a permanent or player"*. **V3 runs Ancient Tomb**, so Emancipation turns
  every Tomb activation into **6 damage to your own face** (LEDGER 2026-08-23, only
  opponent-restricted amplifiers are safe in a deck that damages itself).
- **The creature drawback is gone on the pilot's own reading**: this list finishes with Chandra's
  Ignition, so the board dying is the win condition firing, not a cost. And Solphim **doubles the
  Ignition damage before it dies** — a replacement effect applies as the damage is dealt, and
  CR 704.4 says state-based actions pay no attention to what happens during the resolution of a
  spell, so Solphim is not removed until Ignition has finished resolving.

**Against adding either:** on an assembled chain the booster converts nothing. Modelled at seed 2
with two spare generic, the bare chain is already 66 to each opponent; Solphim makes it 132. Three
opponents at 40 is a hard ceiling and overkill cannot be banked. The booster earns its slot only in
the narrow band where the chain half-assembles — few pips, no seed — and in that band it is
competing with a cheap seed that would have prevented the problem.

**Leyline Tyrant, evaluated on the pilot's prompt.** {2}{R}{R} 4/4 flier: *"You don't lose unspent
red mana as steps and phases end. When this creature dies, you may pay any amount of {R}. When you
do, it deals that much damage to any target."* It is a **third banker** — banked red is exactly the
resource that limits chain length — **and** the outlet that converts a leftover pool into damage,
which is a real problem in a deck that over-produces mana on the kill turn. It combos with the
pilot's own point about creatures dying: Chandra's Ignition kills the Tyrant, and the death trigger
then dumps the whole banked pool at one target, doubled if Solphim is out. Single target only.
$2.43. LEDGER 2026-09-03 already establishes that Tyrant keeps banked mana **red**, where Horizon
Stone would strip the colour.

**Proposed, not applied** (standing rule: swaps are discussed first): Solphim + Leyline Tyrant IN,
Comet Storm + Kazuul OUT. Comet Storm is demoted by the kicker finding above — kicked twice to
reach three opponents it costs X + 2 generic where Jaya's covers three targets for X flat, with
instant speed the only thing it buys back. Kazuul contributes nothing to the chain, but it is the
list's only permanent deterrent to being attacked, and that row goes empty.

### Applied to `DECK-V3.md`: Kazuul out, Solphim in (2026-09-08, pilot's call)

One swap, not the two proposed. **Comet Storm stays** — the pilot keeps it as a finisher, and the
kicker finding demotes it against Jaya's without making it bad: it is still X damage to three
opponents at instant speed, and the second copy of that effect matters when the first is countered
or the graveyard is exiled. **Leyline Tyrant was not added** this pass.

| Out | In | Grounds |
|---|---|---|
| Kazuul, Tyrant of the Cliffs | Solphim, Mayhem Dominus | Kazuul was five mana contributing nothing to the chain. Solphim is the hedge for the turns the chain only half-assembles: two red pips against Fiery Emancipation's three, and *opponent-restricted*, so Ancient Tomb keeps costing two life instead of six. |

Snapshot: `versions/2026-09-08-v3-before-solphim.md`. Sections moved Damage conversion & closers
3 → 4 and Removal & Defence 5 → 4; still 100 cards, all commander-legal, mono-red, 3/3 Game
Changers (Ancient Tomb · Jeska's Will · Gamble). Solphim is $28.00 → proxy. `MOXFIELD-V3.txt`
regenerated.

**The hole this opens, recorded so it isn't rediscovered as a surprise:** V3 now has **no deterrent
to being attacked at all**. Fiery Confluence and Chandra's Ignition are sweepers cast on your own
turn, not a reason for anyone to attack elsewhere. The deck's answer to a board is to end the game
before it matters. Kazuul is the first card back in if that proves wrong — and note that the only
Bracket-3-legal upgrade to that row in mono-red is Glacial Chasm, which is itself a Game Changer.

### Arcane Bombardment's cut from V3 — grounds restated properly (2026-09-08)

The pilot asked why it left. The original entry filed it with the "big-mana slots", which is not
the reason and would not survive re-derivation. The real grounds, in order:

1. **Wanda does not discount it.** It is an Enchantment at {4}{R}{R}; her reduction is instants and
   sorceries only. Only Ruby Medallion, The Fire Crystal, Longshot and Artist's Talent L2 apply, so
   without all four it is four to six real mana — spent on the turn the deck wants to spend on
   pips. (Second card this pass where that mattered; see the LEDGER correction of the same date.)
2. **Its value curve is backwards for this list.** The exiled pile grows by one card per turn and
   every trigger recopies the whole pile (LEDGER 2026-08-19), so it is strongest on turn 9 and
   weakest on the turn you cast it. V3 intends to be finished on turn 5.
3. **The free-cast problem, measured rather than asserted.** Copies are cast without paying mana
   costs, so X = 0 (CR 107.3b). Counted: **10 of V3's 41 instants and sorceries carry {X}** (24%),
   against 6 of 37 in `DECK.md` (16%). So the random exile is a blank about a quarter of the time
   here — a real cost, but *not* the decisive one, and the remaining 76% includes free copies of
   Chandra's Ignition, Wheel of Fortune and Past in Flames.

It remains correct in `DECK.md`. Revisit for V3 only if the chain build's losses come from being
ground out rather than from interaction on the chain turn.

## 2026-09-08 (part 2) — `DECK-B4.md` rebuilt as the chain deck; and V3's weakest slot named

### The Bracket 4 list

Rebuilt from `DECK-V3.md` with the Game Changer cap lifted, **not** from the retired grind deck.
Ten Game Changers: Ancient Tomb · Mana Vault · Grim Monolith · Chrome Mox · Mox Diamond · Lion's
Eye Diamond · Underworld Breach · The One Ring · Gamble · Jeska's Will. Verified against
`is:gamechanger id<=r legal:commander`, which returns exactly **15** cards a mono-red deck may run.

**The finding worth keeping: Bracket 4 does not make this deck's kill bigger, only earlier.** The
chain's ceiling is set by red pips and by Wanda's power, and most of the Bracket 4 pool is
*colourless* fast mana. Mana Vault, Grim Monolith, Ancient Tomb and City of Traitors buy deployment
speed (Wanda turn 1–2) and add nothing to chain length. Only seven cards in the whole upgrade
actually make red: Lotus Petal, Mox Amber, Chrome Mox, Mox Diamond, Simian Spirit Guide, Lion's Eye
Diamond and Rite of Flame. **Underworld Breach is the only card that improves the kill itself** —
escape costs the mana cost plus exiling three, and that cost *includes X* (CR 107.3b), so a
recurred Storm King's Thunder or Jaya's is cast at a real X.

**Rejected, with grounds:** **Mana Crypt** and **Jeweled Lotus** are **banned** in Commander —
checked, not assumed (`commanderLegal: banned`). Panoptic Mirror free-casts, forcing X = 0. Field
of the Dead wants many differently named lands against this list's 18 Mountains. Mishra's Workshop
pays only for artifacts. The Tabernacle at Pendrell Vale taxes Wanda, Livaan and every engine.
Glacial Chasm was considered for the empty "deterrent" row and passed over: cumulative upkeep, and
a deck aiming at turn 3–4 does not expect to be attacked.

**Loops, stated rather than hidden:** Reiterate with buyback on Mana Geyser, and Lion's Eye Diamond
escaped repeatedly off Underworld Breach, are both **chosen-N** and graveyard-bounded. Legal at
Bracket 4 without qualification, and not "automatic or unstoppable" by the pilot's 2026-09-06 line
either.

**Cut from V3 (16 slots):** Nykthos, Rogue's Passage and 3 Mountains (28 lands, not 32) · Urabrask
and The Vision and Scarlet Witch (cast-only engines that do not scale with copies) · Blackblade
Reforged and Gauntlet of Power (scale with lands, or cost 5 — neither is live on turn 3) · Fiery
Confluence · Twinferno · Fists of Flame · Reforge the Soul. **Arcane Bombardment stays out** on the
pilot's call: it belongs in the Bracket 3 grind list, not in either chain build.

Validation: 100 cards, all commander-legal, mono-red, headers matching contents.
`MOXFIELD-B4.txt` regenerated.

### V3's weakest slot is Shuko, not Titan's Strength

The pilot's question — *"titan is +3, if we have something that's just doing basic +1 should that
be replaced instead?"* — is the right instinct, and the answer splits two ways:

| Card | What it gives | What it costs on the chain turn |
|---|---|---|
| Titan's Strength | +3 from the spell, +1 more from Livaan (MV 1) = **+4** | **one red pip** |
| Lunar Frenzy (already in) | at Wanda 4: X=4 from the spell, +5 from Livaan = **+9** | **one red pip** |
| Shuko | **+1**, permanent | **nothing** — it was paid for on an earlier turn |

So they fail different tests. **Titan's Strength is the most redundant card**: Lunar Frenzy and
Frantic Confrontation cost the same single pip and give more than twice as much, once Wanda is at 3
or better. Its one genuine edge is the case those two cannot cover — at base power 2 with no spare
generic, an `{X}{R}` pump announces X = 0 and does nothing, while Titan's Strength still gives +3.

**Shuko is the weakest by effect size**, and its distinguishing feature is already covered: equip
{0} matters only when Wanda is killed and recast, and **Hero's Blade re-attaches for free on every
legendary entering** — no activation, no mana. Coral Sword gives the same +1 with flash and a free
attach on entry. So Shuko is the third-best answer to a question two other cards already answer.

**Recommendation if a slot is needed in V3: cut Shuko, keep Titan's Strength** for the
low-power-no-generic case. Proposed, not applied.

### Applied to `DECK-V3.md`: Shuko out, Arcane Bombardment in (2026-09-08, pilot's call)

Read as: Bombardment belongs in the **Bracket 3** builds, not the Bracket 4 one. It was already in
`DECK.md`; it now also sits in `DECK-V3.md`, and `DECK-B4.md` stays without it.

| Out | In | Grounds |
|---|---|---|
| Shuko | Arcane Bombardment | Shuko was the smallest effect in the list (+1/+0), and its one distinguishing feature — equip {0} to re-suit after Wanda is killed — is already covered for free by Hero's Blade, which re-attaches on every legendary entering, and by Coral Sword, which auto-attaches on entry with flash. |

Snapshot: `versions/2026-09-08-v3-before-bombardment.md`. Seed 9 → 8, Copy and recur 6 → 7. Still
100 cards, commander-legal, mono-red, 3/3 Game Changers. `MOXFIELD-V3.txt` regenerated;
Bombardment is already covered by `research/printings.txt` at (SNC) 101.

**Titan's Strength was kept**, per the analysis above: it is the more *redundant* card but it
covers the one case Lunar Frenzy and Frantic Confrontation cannot — at base power 2 with no spare
generic, an `{X}{R}` pump announces X = 0 and does nothing, while Titan's Strength still gives +3.

**The standing argument against Bombardment here has not gone away, and is recorded so a future
pass does not mistake this for a reversal on the merits.** It is a {4}{R}{R} *enchantment*, so
Wanda does not discount it at all, and 10 of the list's 41 instants and sorceries carry {X}, so
about one exile in four free-casts into X = 0. **The "slow value curve" half of this argument was
wrong and is withdrawn** — see the 2026-09-08 entry below. The pilot's counter is that the chain build's real
losses come from grind and interaction rather than from running out of damage, and a repeatable
free spell each turn is insurance against exactly that. That is a play-experience call, and it
outranks a list-derived verdict (LEDGER 2026-08-20). **Revisit trigger:** if the pile is regularly
being cast on the turn it matters and hitting X-spells, or if Bombardment is stranded in hand on
turn 5, it comes back out for Shuko or a cheap seed.

### Arcane Bombardment into `DECK-B4.md` as well, and my grounds against it partly withdrawn (2026-09-08)

**The pilot's argument, which is correct:** *"it's spell each turn so I can cast a random instant on
someone's turn and rerun the whole playlist every turn."* Arcane Bombardment reads *"whenever you
cast your **first instant or sorcery spell each turn**"* — each turn **of the game**, not each of
your turns. A cheap instant on every opponent's turn fires it again, so a four-player pod is up to
**four triggers a turn cycle**, and every trigger exiles one more card and then recopies the entire
accumulated pile. Both facts were already verified in LEDGER (2026-08-23 and 2026-08-19, the latter
written from this very deck); I wrote "the pile grows by one card per turn" without grepping for
them. Logged as a Correction.

**What that changes.** The engine is *turn count × pile size*, not one copy a turn, and in this
deck the pile is full of **rituals** — a Seething Song in the pile is five red pips on every
trigger, and red pips are the resource that limits chain length. Deflecting Swat, free with a
commander out, is the ideal opponent's-turn trigger. That makes Bombardment a *mana* engine here as
much as a spell engine, which is not how it was scored.

**What survives of the argument against it:** it is an enchantment, so Wanda's discount does not
apply and it is four to six real mana on a setup turn; and free casting forces X = 0, so roughly
one exile in four is a blank in a list that is 10 X-spells out of 41 instants and sorceries.

| List | Out | In |
|---|---|---|
| `DECK-B4.md` | Shuko | Arcane Bombardment |

Same cut as V3 and for the same reason: Shuko's +1/+0 is the smallest effect in the list and its
free re-equip is already covered by Hero's Blade (auto-attaches on every legendary entering) and
Coral Sword (auto-attaches on entry, with flash). Snapshot:
`versions/2026-09-08-b4-before-bombardment.md`. Seed 7 → 6, Copy and recur 8 → 9; still 100 cards,
10 Game Changers, all commander-legal and mono-red.

### Applied to `DECK-B4.md`: Simian Spirit Guide out, Explosive Welcome in (2026-09-08, pilot's call)

Prompted by the pilot: *"why is this card in the bracket 4 deck? surely there's gotta be something
better that can net you mana and is also a sorcery/instant?"* Correct, and the search
(`id:r (t:instant or t:sorcery) o:"Add {R}"`, 28 results) found a straight upgrade.

**Simian Spirit Guide's job here was turn-1 acceleration** — a red pip for zero mana investment.
Exiling it from hand is **not casting a spell**, so it triggers nothing: not Livaan, Storm-Kiln,
Ashling, Arcane Bombardment, Thor or Longshot. And this list already carries seven other turn-1
accelerants (Sol Ring, Ancient Tomb, City of Traitors, Mana Vault, Grim Monolith, Lotus Petal, the
moxen), so it was the least necessary copy of that effect.

**Explosive Welcome** ({7}{R} instant, $0.19): *"deals 5 damage to any target and 3 damage to any
other target. Add {R}{R}{R}."* Mana value **8**, so Wanda discounts it hard — at her power 4 with
Ruby Medallion and Longshot the reduction is 6 and it costs `{1}{R}`, then it adds three red.
**Net +2 red for two mana, converting colourless into red**, which is the deck's actual bottleneck
(the whole Bracket 4 finding above is that most of the upgrade pool is colourless). Mana value 8 is
also the largest single Livaan trigger in the list, and as an instant it feeds Storm-Kiln, Ashling,
Bombardment, Thor and Longshot on the way past. Its two damage instances must hit different targets.

**Also found, not taken:**

- **Glóin the Mighty // Easy Pickings** ({3}{R} creature 4/3 // {2}{R} sorcery adventure) — the
  adventure-shaped answer the pilot asked about. Its sorcery half sweeps 1 damage off opponents'
  creatures and triggers everything; the creature then adds **{R}{R} at the beginning of your first
  main phase every turn**, permanently, and that mana banks under Electro or Ashling. A repeatable
  pip source, but four mana for a body — better suited to `DECK-V3.md` than to a turn-3 list.
  Flagged as the first candidate if V3 ever wants a permanent mana engine.
- **Blazing Firesinger // Seething Song** — literally a 2/3 body that comes with a free Seething
  Song "prepared" (casting the prepared copy is a normal cast, LEDGER 2026-08-06). Loses because
  the song half is mana value 3, so Wanda never discounts it, and the body costs three up front.
- **Geosurge** (7 red, artifact/creature spells only), **Brightstone Ritual** (Goblin count),
  **Seismic Spike** (net −2 mana plus land destruction), **Dragonrage** (needs attackers),
  **Treasonous Ogre** (3 life per red is a genuine pip battery, but four mana, a creature, and $21).

Snapshot: `versions/2026-09-08-b4-before-explosive-welcome.md`. Section counts unchanged (the swap
is in place within Fast mana, rituals and cost reduction). 100 cards, 10 Game Changers, all
commander-legal and mono-red. Explosive Welcome has no entry in `research/printings.txt`, so it
exports as a bare name until the pilot picks a printing.

## 2026-09-16 — Birgi + Neheb into `DECK-B4.md`; Apex of Power and Brass's Bounty re-derived

Prompted by play reports: the pilot has been running the Bracket 4 list in Bracket 4 lobbies and
asked why five cards were missing from it.

### Applied: Birgi and Neheb in, the two one-turn pumps out

| Out | In | Grounds |
|---|---|---|
| Titan's Strength | Birgi, God of Storytelling | Titan's is dominated by Lunar Frenzy and Frantic Confrontation — same one red pip, more than twice the power, once Wanda is at 3+. Birgi triggers on **any** spell (B4 has 24 artifacts and enchantments that Urabrask would never see), costs 3 rather than 4 so she lands a turn earlier in a turn-3 deck, and her mana self-banks until end of turn without needing Electro or Ashling. 48% of the X-Spells sub-field against Urabrask's 29%. |
| Blazing Crescendo | Neheb, the Eternal | Crescendo is mana value 2, so Wanda never discounts it: two real mana for +3/+1 and an impulse. Neheb is the second main phase — see the correction below. |

**Birgi over Urabrask, on the pilot's "only take one" constraint.** The deciding axis is deployment
speed, not trigger breadth: a 3-mana engine taxes the kill turn in a turn-3 deck, a 4-mana one
taxes turn 4. The trigger-count argument is weaker than it looks, because 18 of B4's 24 non-I/S
spells are mana value ≤ 2 and get cast on turns 1–2, *before* Birgi is out. **Urabrask stays in
`DECK-V3.md`**, where four mana is comfortable on a turn-5 clock and the 4/4 first-strike body and
the per-cast ping both matter over a longer game. Each list keeps the engine that suits its speed.

Snapshot: `versions/2026-09-16-b4-before-birgi-neheb.md`. Per-spell engines 3 → 5 (renamed
"Per-spell and per-damage engines"), Reach and refuel 4 → 2. Still 100 cards, 10 Game Changers,
all commander-legal and mono-red.

### Correction: Neheb was cut on the wrong axis

The grounds on record were *"mana arrives postcombat, after damage"*. That is backwards — **the
damage is the input.** Neheb reads *"add {R} for each 1 life your opponents have lost this turn"*,
combined across all opponents, and damage to a player is life loss (CR 120.3a). Modelled at the pip
floor with Wanda at 2 and five red: the precombat chain is 21 to each opponent, which is **not**
lethal, and is **63 life lost** — so Neheb adds 63 red at the postcombat main (CR 500.1: that phase
happens whether or not you attack), and Past in Flames into a re-cast Jaya's at X=80 kills the
table. Neheb converts the chain build's most common failure mode into a win. Logged in LEDGER.

### Flagged, not applied: Apex of Power and Brass's Bounty

The pilot asked why neither is in any chain list. Both were cut as "big mana", which is the same
category error as Neheb — judged by their type rather than by what they produce.

- **Apex of Power** ({7}{R}{R}{R} sorcery, mana value 10) — *"Exile the top seven cards of your
  library. Until end of turn, you may cast spells from among them. If this spell was cast from your
  hand, add ten mana of any one color."* Wanda discounts sorceries at MV ≥ 4, so at her power 7 it
  costs **{R}{R}{R} for ten red mana plus seven cards** — net +7 red pips, by far the largest pip
  injection in the colour. **81% inclusion and +0.79 synergy on the X-Spells page, the highest of
  any card there.** The 2026-08-07 grounds ("dead off Past in Flames / Mizzix's Mastery" and
  "Seething Song nets the same +4 for 1 mana instead of 6") hold only for the *grind* deck: Seething
  Song nets +4 red pips, Apex nets +7 **and** draws seven. The from-hand clause costs you the
  recursion mode, which a chain deck uses once from hand anyway, and the exile window ending that
  turn is near-free on a turn you are spending everything.
- **Brass's Bounty** ({6}{R} sorcery, MV 7) — Treasures tap for any colour, so this is a *red pip*
  card, not a "big mana" card. At Wanda 6 it costs {R} for one Treasure per land. **Good in V3**
  (32 lands, turn 5–6, so 5–6 Treasures for one pip) and **weak in B4** (28 lands on a turn-3 clock
  means 3 lands and 3 Treasures).

**Electrodominance is already in all three lists** — the pilot's third query was a false alarm; it
sits in the Doublers section of each.

### On "do we have enough big X spells?"

B4 runs **10 X-spells**, but only four of them end a game at the table: Jaya's Immolating Inferno
(three targets), Crackle with Power (X targets), Comet Storm (one plus kicks), and Chandra's
Ignition (not an X-spell, but it reads Wanda's power and hits each opponent). The rest are pumps
(Lunar Frenzy, Frantic Confrontation, Bionic Blow), a multiplier (Storm King's Thunder), card draw
(Commune with Lava), single-target (Electrodominance) or creature-only (Shatterskull Smashing).

**Four is enough, and the answer to "do we need more" is no.** Every finisher in the list already
deals several times lethal once the chain resolves — the modelled floor is 21 to each opponent and
the ceiling is in the hundreds. What the deck actually runs short of is **mana and cards to reach
the finisher it already holds**, which is precisely why Apex of Power is the strongest addition
available and a fifth X-spell is not.

### `DECK-B4.md` — Apex in for Wiccan, Blazing Crescendo back in for Rite of Flame (2026-09-16)

Two more swaps from the same conversation, both the pilot's call.

| Out | In | Grounds |
|---|---|---|
| Wiccan, Young Avenger | Apex of Power | Pilot: *"wiccan is just too slow for bracket 4."* Agreed — both are "see more cards", but Wiccan pays out one impulse per noncreature spell over several turns while Apex is seven cards **and ten red mana** in one burst. Apex is a sorcery at MV 10, so Wanda discounts it hard: at her power 7 it is `{R}{R}{R}` for ten red, net **+7 red pips**, the largest single pip injection in the colour. 81% inclusion and the highest synergy score on the X-Spells page. |
| Rite of Flame | Blazing Crescendo | Pilot's call, against my recommendation — grounds for both sides below. |

**Blazing Crescendo's restoration corrects my own bad cut.** I had cut it alongside Titan's
Strength as "one-turn pumps". Run side by side with Ruby Medallion out, Crescendo is `{R}` — the
same single red pip as Titan's Strength — for **+3 from the spell and +2 more from Livaan** (mana
value 2 rather than 1), *plus* an impulsed card. Same cost, more power, more card. I cut the better
of the two.

**Rite of Flame: I argued to keep it and was overruled; recording both sides.** By net pips it is
the weakest ritual in the list — Seething Song is +4, Pyretic and Desperate are +2, Rite of Flame is
+1, and its "for each card named Rite of Flame in each graveyard" clause is dead in singleton. My
counter-argument was **Underworld Breach**: escape costs the card's mana cost plus exiling three, so
Rite of Flame escapes for `{R}` and produces `{R}{R}` — the **cheapest escape target in the deck**,
net +1 red per iteration and a *cast* each time, so it also feeds Livaan, Birgi, Storm-Kiln,
Ashling, Thor and Longshot. With Birgi out it is +2 per escape. That line needs Breach on the
battlefield and a stocked graveyard, which is the conditionality the pilot is trading away.

**Revisit trigger:** if Breach turns are happening regularly and the limit is cheap escape fodder
rather than cards, Rite of Flame is the first card back in.

**Also raised and declined this pass, with the pilot's grounds:**

- **Thor, God of Thunder** — proposed as too slow for Bracket 4 at five mana. Kept, and the premise
  was corrected: B4 is the list where five mana is *easiest*, not hardest, since it runs ten
  accelerants (Sol Ring, Ancient Tomb, City of Traitors, Mana Vault, Grim Monolith, four moxen,
  Lion's Eye Diamond). A Mountain plus Sol Ring on turn one is four or five available on turn two.
  The real arguments against Thor are that his damage is single-target and that Neheb now covers
  the "chain fell short" role harder — neither is about mana.
- **Mana Geyser** — pilot: *"really good because you can refund quite a lot especially if you copy
  it."* Kept.
- **Comet Storm** — pilot: *"we need all the finishers we can get."* Kept despite the kicker finding.
- **Unexpected Windfall** — pilot: *"one of our draw cards, especially with flashback or escape out
  on the field."* Correct, and it is the better half of that argument: two copies of draw-two-plus-
  two-Treasures is two recursion targets for Past in Flames and Breach. Kept.
- **Increasing Vengeance, Hex Magic, Bionic Blow** — all flagged as iffy by the pilot, none cut.
- **Unleash Fury** — my recommendation, not taken. It is **strictly dominated by Bulk Up**: same
  `{1}{R}`, same instant, same "double target creature's power until end of turn", and Bulk Up has
  flashback `{4}{R}{R}`, which also makes it a second Breach and Past in Flames target. Still the
  cleanest remaining cut in the list if a slot is ever needed.
- **Mox Amber / Pyromancer's Goggles / Champion's Helm** — the artifact candidates, ranked. Mox
  Amber is blank on turn one and switches off if Wanda dies with no other legendary out; Goggles is
  five mana in a turn-three deck; Champion's Helm is the third protection Equipment and the row it
  uniquely covers (red targeted removal on an opponent's turn) matters little to a deck with very
  few opponent turns.

Snapshots: `versions/2026-09-16-b4-before-apex.md` and
`versions/2026-09-16-b4-before-rite-of-flame-cut.md`. B4 still 100 cards, 10 Game Changers, all
commander-legal, mono-red, headers matching contents.

---

## 2026-09-28 — Widening Wanda's discount to permanents: nothing to take

**Question (pilot):** is there a card, red or otherwise, that makes every card you control count as
an instant or sorcery, so the permanents also get The Scarlet Witch's discount?

**Finding:** no printed card does it, and one would blank the creatures it touched: an instant or
sorcery can't be a permanent (CR 110.4), so the spell would resolve into the graveyard (CR 608.3e).
The only route is a card with a separately cast spell half at MV 4+ (Adventure / Omen / MDFC /
Prepare). Red options were Amethyst Dragon, Smaug, Song-Mad Treachery and Strife Scholar. Full
search and citations are in deck-brain LEDGER, "No effect makes permanents instants/sorceries".

**Declined, pilot's grounds:** *"they're all too slow."* Each has a spell half costing five or six
printed mana, and the permanent half costs full price with no discount from her. None added to any
list.

---

## 2026-09-28 — Reality Fracture (FRA/FRC) set review: pilot's calls

Full review: `research/fra-set-review-2026-09-28.md`.

- **Declined: Command the Stage for `main`** (pilot: yes for WandaVision, *"not scarlet witch"*).
- **Declined: Stingcaster Mage** in all three lists. Pilot: *"it's a slow card not worth it"*. It was
  SIDE for `v3` only.
- **Open (pilot's question):** should Braid of Fire, just cut from WandaVision, go into `v3` and
  `b4`? Evaluated in the review file's follow-up section. Pyre Rhymer // Molten Tide is the parent
  review's competing SIDE pick for `v3`.
