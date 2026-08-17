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
