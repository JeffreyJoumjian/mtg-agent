# Captain America — Decision Log

Append-only. Never rewrite an entry; add a dated one. Record **grounds, not verdicts** — the next
reader's job is to re-derive (deck-brain §1.1b).

---

## 2026-09-08 — Deck founded: Jeskai Equipment Voltron on the Throw engine

**Commander:** Captain America, First Avenger {R}{W}{U}, 4/4.
- *Throw* — {3}, Unattach an Equipment from him: he deals damage equal to that Equipment's mana
  value, divided among one, two, or three targets.
- *Catch* — At the beginning of combat on your turn, attach up to one target Equipment you control
  to him.

**Bracket 3**, Game Changers held at exactly 3/3. Everything is proxied (deck-brain §0.1), so price
was not a factor in a single inclusion.

### Why this commander at all

The repo already learned, on 2026-09-02 in iron-man V3, that an Equipment paying *"Unattach this"*
as a cost is a **two-card engine** — it needs a re-attacher that works on Equipment already on the
battlefield, and effects keyed to an Equipment *entering* or coming *from hand* do not qualify.
Surestrike Trident was dead there because Tony's trigger and Hammer of Nazahn are both
"on enter / from hand" effects.

Cap ships that re-attacher **in the command zone**. Catch is a free, from-the-battlefield attach
every combat. That converts the whole unattach-cost class from two-card engines into one-card
engines — which is why Sunforger is in the tutor slot rather than the sideboard.

### The core line (verified, CR-cited)

Every turn, for zero equip mana:

1. Beginning of combat — Catch triggers, **target the Equipment already on Cap**.
2. **Hold priority.** Activate Throw, unattaching that same Equipment to pay the cost.
3. Catch resolves; the Equipment is still a legal target and re-attaches.

Grounds: CR 701.3b — attaching an Equipment to what it is *already* attached to **does nothing**,
so letting Catch resolve first wastes the trigger outright. CR 701.3d — unattaching leaves it "on
the battlefield but not equipping anything." CR 608.2b — targets are rechecked on resolution and an
unattached Equipment you control is still legal.

Consequence for slot allocation: Puresteel Paladin, Forge Anew, Bruenor Battlehammer and Brass
Squire buy the **second and third** Throw of a turn, not the first. They were costed on that basis,
not as though they enabled the engine from zero.

### Win conditions, and which is primary

**Primary — commander damage.** Cap 4/4 + Excalibur (+10/+0) = 14 power; Mjölnir, Hammer of Thor
("Double all damage equipped creature would deal") makes that **28 in one connected hit**, which is
a one-swing 21. Verified against LEDGER 2026-09-08 ("A replacement-effect additive on already-combat
damage counts in FULL as commander damage") — a doubler modifies the amount of an event that was
already combat damage, so the whole doubled total counts toward the 21.

**Secondary — Throw as reach and as removal.** Note explicitly, because it is easy to get wrong:
**Throw damage is not commander damage.** CR 903.10a counts combat damage only, and LEDGER
2026-09-02 already settled this shape for Chandra's Ignition. Score Throw against 40 life × 3, never
against the 21.

**Tertiary — Basilisk Collar machine gun.** With the Collar attached and a *different* Equipment
thrown, Cap is the damage source, so the Throw damage carries deathtouch (CR 702.2b — explicitly
not combat-only) and lifelink (CR 702.15b, gaining life equal to the **total** across all targets).
At {1} a shot that is repeatable removal, and arguably stronger than the face plan.

**Removal insurance, which is the real reason the commander is good.** CR 113.7a / 608.2h — once
Throw is on the stack it resolves in full even if Cap is killed in response. Voltron's standard
failure mode is losing the turn's investment to a Swords; here it converts to 7–12 damage instead.

### Payload chosen by mana value, not by rate

Throw damage = the Equipment's mana value, and **cost reduction never changes mana value** (CR
202.3, CR 118.7). So Excalibur, Sword of Eden is a 12-damage payload even when its historic-permanent
discount casts it for {0} — the single best card in the deck on this axis.

Payload tier as built: Excalibur (12) · Kaldra Compleat / Ultima Weapon / Meteor Sword (7) ·
Argentum Armor (6) · Batterskull (5).

**Excluded as a class:** any Equipment with `{X}` in its mana cost. CR 202.3e treats `{X}` as 0 off
the stack, and CR 120.8 means a 0-damage Throw deals no damage at all and fires no damage triggers.

### Cards the field runs that were deliberately cut

- **Sword of War and Peace (69% EDHREC) — cut.** It grants protection from red *and* white, and
  CR 702.16d unattaches your own Equipment of a protected colour as a state-based action. It would
  strip Mjölnir, Hammer of Thor ({3}{R}) on sight. **Sword of Fire and Ice (29%) cut for the same
  reason** (pro red). This is LEDGER 2026-08-07, re-derived against this list rather than recalled.
  The two protection Equipment that survived the check are Sword of Feast and Famine (pro B/G) and
  Commander's Plate, which grants protection from colours *not* in the commander's identity and so
  can never conflict. Mjölnir is the deck's **only** coloured Equipment, which is what makes the
  rest of the suite safe.
- **Lightning Greaves (34%) — cut**, Swiftfoot Boots kept. Shroud blocks your own equip abilities
  and your own protection spells (LEDGER 2026-08-07). Greaves is *less* bad here than usual, since
  Catch targets the Equipment rather than Cap, but it still turns off Mother-of-Runes-style
  targeted saves and every equip ability, and hexproof costs nothing.
- **Blasphemous Act (33%) — cut.** deck-brain §1.3: it is the sweeper that kills the commander the
  whole plan runs through. The two wipes kept — Winds of Abandon (overloaded, fully one-sided) and
  Single Combat (Cap survives and nobody can rebuild for a turn) — were chosen on the axis of
  *clears blockers without killing Cap*, not on rate.
- **Basalt Monolith (11%) / the Zirda infinite — cut.** Zirda + Basalt Monolith is infinite
  colourless mana, and with Puresteel's equip {0} that is arbitrarily large Throw. It is a four-card
  assembly whose fourth card (Basalt Monolith) is a dead draw outside it, and the deck does not need
  it to close. Grounds are the dead-card cost, not a bracket problem.

### Zirda is maindeck, never a companion

Its companion clause ("each permanent card in your starting deck has an activated ability") is
**opt-in** — a Zirda in the 99 imposes no restriction at all, because companion functions outside
the game (CR 702.139a).

Taking the companion route would cost the four highest-inclusion cards in the archetype: Puresteel
Paladin (87%), Sigarda's Aid (86%), Sram (75%) and Forge Anew (69%) all have only static and/or
triggered abilities, as do Esper Sentinel, Masterwork of Ingenuity, Bureau Headmaster, Training
Grounds and Urza's Saga. Note also CR 702.139b — in Commander the condition is checked **including
the commander** (Cap himself passes; Throw is an activated ability) — and CR 903.11a, which makes a
maindeck copy illegal as a companion, so it is strictly either/or. In exchange for all that you get
guaranteed access to a 5-mana 3/3 ({3} special action, then cast it). Not close.

### Both Zirda and Training Grounds are run, on purpose

They **do not stack** on Throw — each carries its own "can't reduce below one mana" clause, so the
floor is {1} in any application order (CR 601.2f). Running both is **redundancy in an enabler**, not
greed: the deck is priced around a {1} Throw and wants to find one of the two reliably. They are not
identical — Zirda also cuts equip costs, while Training Grounds does not touch equip at all (CR
702.6a: equip belongs to the Equipment, an artifact, not to a creature), but Training Grounds is an
enchantment and so dodges creature removal. Pilot confirmed 2026-09-08.

### Game Changer slots (3/3)

Enlightened Tutor · Fierce Guardianship · Teferi's Protection. All three chosen on **resilience**:
a voltron deck's losses come from the commander being answered, so the slots went to finding the
piece, countering the answer, and phasing out in response to a wipe. Smothering Tithe and Rhystic
Study were the value-engine alternatives and were passed over on that axis, not on power.

### Open questions for the first goldfish

- 35 lands with a 2.7-ish average MV may be one too many; Blackblade Reforged was the 101st card cut
  and is the first thing to try back if the deck floods.
- Whether Mystic Remora earns its slot at this table, or wants to be Rhystic Study at the cost of a
  fourth Game Changer (which would make the list Bracket 4).

---

## 2026-09-09 — Attach package in (5 swaps), on the pilot's read of the engine

**Pilot's correction, accepted in full:** dismissing Hammer of Nazahn as doing "nothing for the
Throw loop" was wrong. The on-enter / from-battlefield bucket test (LEDGER 2026-09-02) answers only
*"can this re-attach after an unattach cost?"* — it is not a verdict on whether a card is good here.
Getting Equipment **onto** Cap is the other half of the loop and I scored only one half.

The mechanical reason the pilot is right: **Catch moves exactly one Equipment per combat**
("attach up to *one* target Equipment"). Cap can never build a stack of gear by himself, so attach
effects are the shared bottleneck on *both* win conditions — more Equipment on Cap is simultaneously
more commander damage and more Throw fodder to choose from.

| IN | OUT | Grounds |
|---|---|---|
| Hammer of Nazahn | Sword of the Animist | Free attach on every Equipment ETB + indestructible. The Sword was the weakest Equipment on both axes: MV 2 is near-worthless as Throw fodder and its ramp is redundant at 42 mana sources. |
| Super-Soldier Serum | Mask of Memory | Attaches **any number** of Equipment on attack *or block*, every turn — the only repeatable mass-attach in white at this cost. |
| Inventory Management | Mystic Remora | Split second mass attach at instant speed: uncounterable, and it re-suits Cap through a removal window. Remora's cumulative upkeep competes with curving out on Equipment. |
| Genji Glove | Batterskull | Same MV 5 payload slot. Verified: an additional combat **phase** carries its own beginning-of-combat step (CR 506.1 / 500.8 / 500.6), so the Glove is a **second Catch trigger** — a second free Throw every turn — plus double strike. Batterskull was the worst rate in the tier (equip {5}, living weapon lands it on a Germ). |
| Stonehewer Giant | Reyav, Master Smith | Tutors an Equipment onto the battlefield **already attached** — attach and selection in one activation. Reyav was cut on deck-brain §2.5: double strike is a *multiplier*, Halvar already grants it statically to every equipped creature, and the two do not stack. Reyav's only edge is being a 2-drop to Halvar's 4, which is a real but insufficient reason to keep a non-stacking second copy. **Reversible** — if Halvar keeps eating removal, Reyav is the first card back. |

### Masterwork of Ingenuity — evaluated and passed, on new grounds

A copy takes the copied **mana cost** (CR 707.2 → 202.3), so Masterwork copying Excalibur genuinely
has mana value 12. But copies also take **name and supertypes**, so you would control two legendary
permanents named Excalibur and CR 704.5j puts one in the graveyard as a state-based action, checked
before any player gets priority (CR 704.3) — you cannot even Throw the doomed one in response. Same
trap for Kaldra Compleat, Ultima Weapon and Mjölnir. Its real ceiling is the best *nonlegendary*
payload (Meteor Sword, MV 7), which did not clear the bar. Not a bracket or price call — re-derive
it if the payload tier ever loses its legendary top end.

### On Sword of War and Peace — the earlier reasoning was overstated

The CR 702.16d interaction is real (pro-red unattaches Mjölnir, a red card), but three things were
wrong with how it was argued:

1. **EDHREC inclusion % is per-card, never co-occurrence.** "69% run the Sword, 51% run Mjölnir"
   says nothing about whether the *same* deck runs both. Two separate percentages were being read as
   evidence about one list.
2. **The conflict is conditional, not fatal** — it only fires when both are attached to the same
   creature. Sword on Cap with Mjölnir elsewhere or in hand is fine. The true cost is "pick one per
   turn," not "these cards break."
3. **Protection from red and white is genuinely enormous** — it dodges Swords to Plowshares, Path to
   Exile, Generous Gift and most red burn, *and* grants evasion. For a combat-first Cap build the
   Sword is probably correct.

The call to keep Mjölnir over the Sword stands, but on a stated axis: **Mjölnir doubles Throw damage
as well as combat damage**, which is unique to how this list wins. In a combat-only build, flip it.

---

## 2026-09-09 — Manabase: three tapped duals out for painlands

The pilot flagged that too many lands entered tapped. Audit of the 35: 9 untapped nonbasic duals
already (3 true duals, 3 shocks, 3 bondlands — the last untapped in any multiplayer pod) plus 4
fetches, but **5 entered tapped unconditionally**.

| IN | OUT |
|---|---|
| Adarkar Wastes | Meticulous Archive |
| Battlefield Forge | Elegant Parlor |
| Shivan Reef | Thundering Falls |

**Painlands over the checkland cycle**, on an axis specific to this deck: it spends enormous amounts
of *generic and colourless* mana — every equip cost, Throw itself ({3}, or {1} under Zirda), and a
fifth of the deck being colourless artifacts. The painlands' free `{T}: Add {C}` mode means they
frequently cost **zero** life, which is not true in a spell-heavy deck. Checklands
(Glacial Fortress / Clifftop Retreat / Sulfur Falls) can still whiff on turns 1–2, exactly the turns
this deck wants a land untapped for Sol Ring into a cheap Equipment.

The surveil duals' only real virtue was being fetchable, and 14 fetchable targets remain for 4
fetches. Unconditionally-tapped lands: 5 → 2 (Raugrin Triome, the three-colour anchor and also
fetchable; Axgard Armory, which sacs to tutor an Equipment). Axgard is the weaker of the two and is
the next slot to look at if the deck still feels slow.

---

## 2026-09-09 — Marvel/attach package: 7 swaps, driven by the pilot's card list

Pilot brought a list of cards the build had missed. Working through it produced three corrections to
my own reasoning, all logged in the ledger:

1. **Argentum Armor and Ultima Weapon were nominated for the cut on the wrong axis.** I ranked them
   as Throw payloads (mana value ÷ equip cost) and ignored that *"destroy target permanent when
   equipped creature attacks"* is repeatable removal on a stat stick. Both stay.
2. **Boros Charm vs Flawless Maneuver is not an overlap.** Flawless Maneuver is *"**creatures** you
   control gain indestructible"*; Boros Charm is *"**permanents** you control"* — in an Equipment
   deck that is the only answer to an artifact wipe. Boros Charm stays.
3. **Halvar, God of Battle was filed in the wrong role for three passes.** Its text is *"attach
   target Aura or Equipment **attached to a creature you control**"* — it can only relocate gear
   already on a creature, so it cannot pick up a thrown (unattached, CR 701.3d) Equipment. It is a
   double-strike anthem plus a rescue effect, never a Throw enabler. Cut.

| IN | OUT | Grounds |
|---|---|---|
| Captain America, Super-Soldier | Whirlwind of Thought | Cap's type line is Human Soldier **Hero**, so Super-Soldier's *"you and other Heroes you control have hexproof"* covers the commander **and** the pilot, gated behind a shield counter an opponent must strip first. {1}{U}{R}{W} was the clunkiest cost in the deck. |
| Swordsman's Steel | Open the Armory | Steel does three jobs (draw per Equipment on ETB, +2/+2 per Equipment, MV 4 payload). Open the Armory cost {1} more than Steelshaper's Gift for the same job, its only edge being Auras — of which the deck runs one. |
| Thorin, Mountain-king | Inventory Management | Same one-shot mass attach, plus Cap's power as targeted removal (deathtouch under Basilisk Collar) and a 3/4 trample body. Inventory Management's only edge was split second. |
| The Reaver Cleaver | Nahiri, Forged in Fury | Treasures equal to combat damage: a 14-power Cap connecting is 14 mana, which is exactly what a mana-hungry Throw engine wants. Nahiri was the most expensive non-payload card and needed an equipped attack before doing anything. |
| Master Transmuter | Halvar, God of Battle | Transmuter cheats a payload onto the battlefield, which triggers Hammer of Nazahn / Sigarda's Aid to attach it **free** and Puresteel / Mighty Thor to draw two — and it rescues gear from removal by bouncing it. Credit to the pilot; the first evaluation scored only its obvious "cheat in something big" use. |
| Captain America, Living Legend | Talisman of Progress | Untaps Brass Squire, Stonehewer Giant, Codsworth and Master Transmuter after they use their tap abilities — two activations each per turn, straight at the attach bottleneck. Talisman cut on trial: the curve averages 2.84 and cutting Whirlwind of Thought left the deck light on blue. **Revisit if colour screw shows up.** |
| The Lonely Mountain | 1x Mountain | Free. Still a fetchable `Land — Mountain`, enters untapped whenever you control an Equipment, plus a late Dwarf mana sink. |

**Result:** 100 cards, 41 mana sources (35 lands + 6 rocks), Game Changers 3/3, Bracket 3 intact.

### Benched, in priority order, if the deck underperforms

Jhoira, Weatherlight Captain · Danitha Capashen, Paragon · Silent Arbiter · Conqueror's Flail ·
Embercleave · Adaptive Omnitool · Captain America's Shield · Aettir and Priwen.

**Passed with grounds:** Golem-Skin Gauntlets (Bruenor already gives +2/+0 per attached Equipment to
every creature, for free; MV 1 is the worst Throw fodder in the format). Goblin Engineer (recursion
capped at mana value 3 — the payloads here are MV 4–12, so it literally cannot return them). Goblin
Welder (no self-mill to set it up; Academy Ruins does the job reliably). Adelbert Steiner (a Danitha
without the cost reduction). Cass, Hand of Vengeance (moves gear to *another creature*, never to the
commander — he is in the command zone — so it suits a backup body rather than rebuilding Cap).
Captain America Team Leader / Wings of Freedom (both key off *other Heroes*; there are three).
Captain America Liberator (its tutor caps at mana value 3, missing every payload).
