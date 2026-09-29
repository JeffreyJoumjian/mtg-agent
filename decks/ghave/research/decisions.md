# Ghave, Guru of Spores — Decision log

Append-only. Newest entries at the bottom. Record the **grounds**, not the verdict.

---

## 2026-09-24 — Founded. Brief, commander choice, and the whole 100

### The brief

This deck replaces `decks/teysa-karlov/`. After a 10-game test and a 7-card rebuild, the pilot
concluded: *"the teysa deck is just not working, our cards that actually contribute to us building our
board state in a reliable way seem all high in mv… i feel like the commander needs to generate tokens
as opposed to relying on drawing token generators."* Chatterfang is taken (it is the other deck), so
the ask was a different commander that **makes tokens itself**. The pilot chose to build two decks,
this one and `decks/caesar/`. Their words on this one: *"for ghave we can get the token doublers of
both black and white so it's very nice."* Black has no token doublers (LEDGER 2026-09-23 "Drain is a
mono-black mechanic"), so the doublers here are the white and green ones.

Pilot answers given before the build:
- **Grave Pact and Dictate of Erebos: in.** This settles the question that was open since the
  Teysa founding.
- **The Ghave + doubler + mana-altar loop: keep it and declare it.** It is a chosen-N loop, and
  the pilot allows those (memory `loop-policy-chosen-n`).

Constraints carried over: Bracket 3 with at most 3 Game Changers, everything proxied, drain as the
primary plan with a wide-board attack kept live (memory `keep-combat-as-second-axis`), and never
silently excluding a card on pod grounds.

### Why Ghave

*"Ghave enters with five +1/+1 counters on it. {1}, Remove a +1/+1 counter from a creature you
control: Create a 1/1 green Saproling creature token. {1}, Sacrifice a creature: Put a +1/+1 counter
on target creature."*

- **He does two of the loop's three jobs from the command zone** (LEDGER 2026-09-22 "three jobs"):
  bodies and an instant-speed sacrifice outlet. The 99 only has to supply the drain. Teysa did one
  job, and it wasn't bodies.
- **The token supply stops depending on the draw.** Ghave arrives with five Saprolings' worth of
  counters. He can take counters off **any** creature you control, so every +1/+1 counter in the
  deck is a future Saproling.
- **Colours.** White and green have every token doubler (Anointed Procession, Mondrak, Elspeth Storm
  Slayer, Doubling Season, Parallel Lives). Black has the drain. Every WB card from the Teysa pool
  stays legal.
- **Field:** 8,185 decks, EDHREC rank #321. Themes: +1/+1 Counters, Tokens, Combo, Aristocrats.
  **Salt 0.29/4**, lower than Teysa (0.53) and far below Edgar (2.05). The field lens was
  `bun run edhrec commander "Ghave, Guru of Spores" --all`, 2026-09-24.

### Role skeleton (SKILL §2.1) — targets set before any card was picked

| Role | Target | Built |
|---|---|---|
| Commander | 1 | 1 |
| Lands | 35 | 35 |
| Ramp & Mana | 10 | 10 |
| Card Draw | 8 | 8 |
| Removal & Interaction | 8 | 8 |
| Board Wipes | 2 | 2 |
| Token Engines | 13 | 13 |
| Counter Engines (Ghave fuel) | 3 | 3 |
| Token Doublers | 5 | 5 |
| Sacrifice Outlets | 5 | 5 |
| Drain Payoffs | 10 | 10 |

Lands are one lower than Teysa's 36 because green ramp now carries four land-fetchers and two
dorks. The curve is 2.75. **Cards that make tokens without anything dying first: 16**, plus the
commander (Teysa had 6). The odds of drawing one by turn 3 on the draw are **84%**, and 11 of them
cost 3 or less (71%). Ghave himself covers the rest. The list is in gameplan.md §3.

### The declared combos — chosen-N, stated up front

All of these are activated abilities the pilot announces one iteration at a time. Opponents get
priority between iterations and can shorten the loop (CR 732.2a–b). None is mandatory, so none is a
draw under CR 732.4. Each needs **Ghave plus two cards** from the 99. **There is no Ghave-plus-one
loop in the list.** Basking Broodscale was rejected partly to keep it that way (below).

Worked math per iteration. Ghave must keep at least one counter, or he is a 0/0 (CR 704.5f).

1. **Ghave + any token doubler + Ashnod's Altar.** Pay {1} and remove a counter to make 2 Saprolings.
   Sacrifice one to the Altar for {C}{C}. Pay {1} to sacrifice the other to Ghave and put the counter
   back. **Net: 0 mana, 0 counters, 2 deaths.** Any of the five doublers works.
2. **Ghave + Doubling Season + Phyrexian Altar or Utopia Mycon.** Doubling Season also doubles the
   counter Ghave puts back. Over two removals: 4 Saprolings, 3 into the Altar ({3}), 1 into Ghave
   ({1}, 2 counters back). **Net: 0 mana, 0 counters, 4 deaths.**
   - **With one token-only doubler (Procession, Parallel Lives, Mondrak, Elspeth) and Phyrexian Altar
     it is NOT a loop.** It loses {1} per iteration. It takes two token doublers: 4 Saprolings, 3
     into the Altar, 1 into Ghave, **net +{1}**.
3. **Ghave + Pitiless Plunderer + any token doubler.** No altar is needed. Pay {1} and remove a
   counter for 2 Saprolings. Pay {1} to sacrifice one to Ghave and put the counter back. Plunderer's
   Treasure is doubled into 2 Treasures, which pay for both activations. **Net: 0 mana, 0 counters,
   +1 Saproling, 1 death.** This one grows the board.
4. **Ghave + Cathars' Crusade + Ashnod's Altar** (net +{1} per iteration, **infinite colourless
   mana**) or **+ Phyrexian Altar / Utopia Mycon** (net 0). Removing Ghave's counter makes a
   Saproling, and Crusade puts a counter back on every creature, Ghave included.
5. **Ghave + Rosie Cotton of South Lane + Ashnod's Altar** (net +{1}) or **+ Phyrexian Altar /
   Utopia Mycon** (net 0). Rosie's *"Whenever you create a token, put a +1/+1 counter on target
   creature you control other than Rosie Cotton"* puts Ghave's counter back.
6. **Sprout Swarm + three token doublers.** Buyback plus convoke costs 5 creatures tapped. With
   three doublers each cast makes 8 Saprolings. Convoke may tap summoning-sick tokens (CR 702.51a;
   302.6 only restricts {T} abilities). Two doublers make 4 Saprolings, which is short, so it is
   not a loop.

**What any of them wins with:** every death drains through Blood Artist, Zulaport Cutthroat,
Cruel Celebrant, Bastion, Mirkwood Bats (twice per token: once on creation and once on
sacrifice), Marionette Apprentice, Meathook and **Slimefoot, which deals 1 to each opponent per
Saproling death**. Grave Pact and Dictate clear every opposing creature along the way.

**Honest timing:** Ghave comes down turn 4 with a dork or land-fetcher, and the Altar or a doubler
costs 3–5. So the earliest assembly is **turn 5–6**, earlier than the "turn 8+" in the original
Teysa brief. The pilot saw "from turn 6 or so" before answering and kept it. **Redundancy is high:**
Ashnod's Altar has seven partners. If the table finds that too much, cut Ashnod's Altar first. It
is in 4 of the 6 lines, and the deck plays fairly without it.

### Cards rejected on their merits, with the grounds

- **Chatterfang, Squirrel General.** It is the other deck's commander, and Chatterfang + Pitiless
  Plunderer is the automatic infinite the Chatterfang build excluded (LEDGER 2026-09-22 fair-build
  entry). It is the best green doubler on EDHREC's Ghave page (33%) and is still out.
- **Primal Vigor.** *"If one or more tokens would be created, twice that many"* has no "under your
  control". It doubles every opponent's tokens and +1/+1 counters too (SKILL §1.3).
- **Basking Broodscale.** 34% of Ghave decks run it. With Rosie Cotton in the list, Rosie's counter
  lands on Broodscale, Broodscale makes a Spawn, the Spawn is a token, and Rosie triggers again. That
  is a **two-card** loop inside the 99, which the brief ruled out. One of the two had to go, and
  Rosie does more in a fair game.
- **Juniper Order Ranger, Ivy Lane Denizen, Good-Fortune Unicorn, Corpsejack Menace, Branching
  Evolution.** More counter engines. Each is another partner for the altar loops. Counter engines
  were capped at three (Hardened Scales, Kami of Whispered Hopes, Cathars' Crusade) so the deck
  wins by drain first.
- **Winding Constrictor.** Kami of Whispered Hopes took the slot because it also taps for mana
  equal to its power, and Ghave needs {1} per activation. Constrictor's *"If you would get one or
  more counters, you get that many plus one"* also adds poison and other player counters to **you**
  (§1.3).
- **Mazirek, Kraul Death Priest.** A strong engine at 5 MV. Kept out on curve, since the pilot's
  complaint was board-building locked behind high MV.
- **Ojer Taq.** 6 MV, and it only triples *creature* tokens, so no extra Treasure from Plunderer or
  Food from Rosie.
- **Exalted Sunborn.** It was a real option, since warp {1}{W} makes it a two-mana doubler for a
  turn. Five doublers already fill the role.
- **Demonic, Vampiric and Worldly Tutor.** All Game Changers. A deck with six loop lines doesn't
  need tutors to find them, and tutors would push it toward Bracket 4 play patterns. The three
  Game Changer slots went to Gaea's Cradle, Teferi's Protection and Aura Shards.
- **Toxic Deluge and Kaya's Wrath.** They kill our own board with no choice. Austere Command's
  "creatures MV 4+" mode spares every Saproling and every 1–3 MV drainer, and never touches the
  enchantment doublers. **It does kill Ghave (MV 5)**, so recast him after. Pair it with
  "artifacts" only if the Altars are worth losing.
- **Teysa carry-overs not taken:** the afterlife and leave-a-token bodies (Doomed Traveler, Imperious
  Oligarch, Orzhov Enforcer, Ministrant) and Teysa, Orzhov Scion. They were the one-shot bodies that
  failed the Teysa test (LEDGER 2026-09-24). Sengir Autocrat lost to Rosie Cotton, which is cheaper
  and repeats. Luminous Broodmoth didn't fit.
- **Ophiomancer.** The pilot didn't like it in the Teysa list.

### Tensions named, not vetoes

- **Skullclamp vs. counters.** Cathars' Crusade, Hardened Scales/Kami on Mycoloth, and Tendershoot's
  city's blessing (+2/+2 to Saprolings) all raise toughness, so a clamped creature survives (CR
  704.5f). Ghave softens this: he can **remove** a +1/+1 counter from any creature to make a
  Saproling, which drops a 2/2 back to a 1/1.
- **The Meathook Massacre with X ≥ 1** kills Birds, Avacyn's Pilgrim and our own 1/1s. That's
  accepted because every death drains.
- **Aura Shards** (Game Changer) lets every Saproling destroy an artifact or enchantment. With Ghave
  making Saprolings at instant speed, it can dismantle a table's artifacts and enchantments. The pod
  may read it as oppressive. Swap it for Abrupt Decay if so.

### Rules facts this list is built on (verified 2026-09-24 against the 2026-08-07 CR)

- **Hardened Scales, Kami of Whispered Hopes and Doubling Season all apply to Ghave's "enters with
  five counters".** CR 122.6: counters "given… as it enters" count as counters put on it. CR 614.1c:
  "enters with" is a replacement effect. So Ghave enters with 6, 7 with both +1 effects, and 10 under
  Doubling Season.
- **Two replacement effects on one event are applied in the order the affected player chooses**
  (CR 616.1e). Put +1 effects before Doubling Season: 5 → 6 → 12, not 5 → 10 → 11.
- **Summoning-sick tokens can't tap for Cryptolith Rite or Gaea's Cradle-style {T} abilities**
  (CR 302.6). They can be sacrificed, and they can convoke (CR 702.51a).
- **Mycoloth's devour** sacrifices as it enters (CR 702.82a). Every creature devoured is a death
  trigger, and each one adds 2 counters (3 with Hardened Scales).
- **Tendershoot Dryad triggers on every player's upkeep** (*"each upkeep"*), so it makes 4 Saprolings
  per round in a four-player pod.

### Validation

`bun run card --deck ghave`: 93 of 93 unique names found, with no illegal or off-identity cards.
`bun run deck:show ghave`: **Total 100/100**, lands 35, avg MV 2.75, pips W25 B28 G28, sources
W24 B27 G26. **Game Changers 3/3: Gaea's Cradle, Aura Shards, Teferi's Protection.** That's the
Bracket 3 ceiling, so any fourth Game Changer means one of these comes out. MOXFIELD.txt was
regenerated by the apply.

---

## 2026-09-24 — Chatterfang in, Utopia Mycon out

The pilot opted in to combos (*"if people complain too often then i'll consider taking them out"*)
and asked for Chatterfang in the 99. The founding entry rejected it on two grounds: it is the other
deck's commander, and *"Chatterfang + Pitiless Plunderer is the automatic infinite"*. The second ground
was wrong, since the loop is chosen-N (LEDGER 2026-09-24). The first is not a rules problem, and the
pilot proxies everything.

**What Chatterfang does here:**
- A sixth token doubler: a Squirrel with every Saproling, Spirit, Treasure and Food.
- It counts as a doubler in every declared Ghave loop.
- A Squirrel sacrifice outlet that doubles as removal.
- **Chatterfang + Pitiless Plunderer** is now a two-card chosen-N loop inside the 99 that doesn't need
  Ghave (gameplan §8).

**Cut: Utopia Mycon**, the slowest token maker (one Saproling per three upkeeps). Its outlet only takes
Saprolings. The pilot approved the cut. Death-independent token makers drop 16 → 15, and the chance of
a cheap one by turn 3 on the draw drops 71% → 67%.

Validated: `bun run card --deck ghave` 93/93 found, no flags. 100/100, Game Changers 3/3.

## 2026-09-24 — Llanowar Elves in, Austere Command out

The pilot asked for Llanowar Elves and turned down my first cut (Avacyn's Pilgrim). On a second look,
**Austere Command hit our own board in every mode**: all enchantments (16 of ours, including every
green and white doubler and both Pacts), all artifacts (Sol Ring, both Altars, Skullclamp), creatures
with MV ≤ 3 (every token, since tokens are MV 0), or MV ≥ 4 (Ghave, Mondrak, Plunderer, Tendershoot,
Mycoloth). The founding entry's "MV 4+ spares the doublers" held for one mode only, and the card makes
you choose two. Meathook stays as the single wipe, because it drains on every death. Aura Shards and spot
removal cover the rest. The alternative offered was Cultivate, which would have kept two wipes. Avg MV
2.78 → 2.71. Validated 93/93, 100/100.

## 2026-09-24 — Sprout Swarm banned by the pilot; Brightcap Badger in

The pilot: *"fuck off sproute swarm from ghave it sucks pls stop using that card."* It had been cut from
Chatterfang before, and the build fork re-added it here without knowing. It is now on the pilot's
banned list (memory `banned-cards-pilot`), and **declared combo #6 above (Sprout Swarm + three
doublers) no longer exists.**

**In: Brightcap Badger // Fungus Frolic** (pilot's pick of three). The Adventure makes 2 Saprolings at
instant speed for {2}{G}, then the Badger makes a Saproling every end step. It also gives every Fungus
and Saproling "{T}: Add {G}", Ghave included, so non-summoning-sick Saprolings pay Ghave's {1}
activations. Alternatives offered: Tireless Provisioner (its tokens are artifacts, which Ghave can't
sacrifice) and Utopia Mycon (too slow). Avg MV 2.71 → 2.74. Validated 93/93, 100/100, Game Changers 3/3.

## 2026-09-25 — Burst + landfall package (6 swaps)

**The pilot's brief:** fewer fixed one-per-turn token makers, more that scale ("create X tokens as
opposed to fixed slow tokens"). Other ways to draw cards than the monarch. Lean into landfall with
extra land drops: *"mv being high doesn't matter if we have proper fixing or landcycling or playing
multiple lands per turn."* The pilot approved all six cuts from my ranked pool and kept Mirkwood Bats
out of it. Rosie Cotton was explicitly protected (*"by far one of the best cards in the deck"*). It is
an X engine here, because each token trigger puts a counter back on Ghave.

| In | Out | Grounds |
|---|---|---|
| Springheart Nantuko | Ocelot Pride | A 1/1 per land, or bestowed on a nonlegendary engine, a copy of it per land for {1}{G}. Ocelot made one Cat, and only on turns you gained life. |
| Tireless Tracker | Court of Grace | A Clue per land (doubled by the doublers, plus a Squirrel from Chatterfang) replaces the monarch as the draw that works on an empty board. |
| March of the Multitudes | Bitterbloom Bearer | X lifelinkers at instant speed with convoke, so the tokens pay for more tokens. Bearer was a fixed one per upkeep. The pilot kept Bitterblossom as the turn-2 play. |
| Avenger of Zendikar | Cathars' Crusade | One Plant per land, then a counter on every Plant per land. Those counters are Saprolings via Ghave. Crusade was 5 MV and blocked Skullclamp. **Declared loop #4 (Crusade + Ashnod's) is gone.** Rosie + Ashnod's is the same math and stays. |
| Pest Infestation | Mycoloth | X artifact/enchantment removal plus 2X Pests, one-sided. It also covers what Austere Command's enchantment mode was meant to do. Mycoloth had to eat the board first. |
| Oracle of Mul Daya | Avacyn's Pilgrim | An extra land drop and lands off the top of the library, which is card advantage. Pilgrim made only {W}. |

Result: avg MV 2.74 → 2.77 (X spells count at X = 0). 15 death-independent token makers plus Ghave,
now with three burst cards (March, Pest Infestation, Avenger) beside Second Harvest. Card Draw 8 → 9.
Counter Engines 3 → 2. Validated 93/93, 100/100, Game Changers 3/3.

**Still open:** a second extra-land card (Icetill Explorer or Dryad of the Ilysian Grove) and a 36th
land. Each needs one more cut, and the pilot hasn't named one yet.

## 2026-09-25 — Icetill Explorer in, Arcane Signet out

This closes the open item above. The pilot approved it. Icetill is the second extra land drop and lets
you play lands from the graveyard, so each of the three fetchlands becomes two landfall triggers every
turn. Arcane Signet was the weakest ramp piece once the deck ramps through land drops. Dryad of the
Ilysian Grove (fixing) was the alternative, but the mana is already well fixed (W21 B25 G26 sources).
Holding at 35 lands, because Oracle plays lands off the top. Avg MV 2.77 → 2.80. Validated 93/93,
100/100, Game Changers 3/3.

---

## 2026-09-28 — Reality Fracture (FRA/FRC) set review: nothing taken

Full review: `research/fra-set-review-2026-09-28.md` (191-card pool). The pilot's rule for this pass
was *"if i don't comment on it then we can drop it"*, and Ghave's three proposals got no comment, so
all three are **dropped, not rejected on grounds**:
- Bloodline Recollector for Mentor of the Meek.
- Unflinching Hortimancer for Cultivate. Note the combo flag with Ghave + Ashnod's Altar + Elas
  il-Kor.
- Fabled Passage for a Swamp.

They remain in the review file with their grounds if the deck is revisited. The pilot's named cards
stood as reviewed: Gardenize SIDE, Hexhaven Invigorator NO (Golden Guardian package noted), Edgar,
Ancient Bloodlord NO.
