# FRA + FRC set review: Ultron (Artificial Malevolence), 2026-09-28

**Sets:** Reality Fracture (FRA) and Reality Fracture Commander (FRC), both releasing 2026-10-02.

**Method:** deck-brain SKILL.md. Every verdict comes from verified Scryfall oracle text
(`data/fra-candidates-ultron.json` + `data/frc-candidates-ultron.json`), never from memory. Each
card is costed against the deck's actual discounts:

- **Reducers:** Foundry Inspector and Cloud Key read *"artifact spells"* / a chosen type; Jhoira's
  Familiar reads *"historic spells"*; Semblance Anvil reads *"share a card type"*; Ugin, the
  Ineffable reads *"colorless spells"*; Mycosynth Golem grants affinity to *"artifact creature
  spells"*.
- **Restricted mana:** Mishra's Workshop and Karn, Legacy Reforged pay only for artifact spells.
- **Deployers:** Thran Temporal Gateway (historic) and Quicksilver Amulet (creature).

Each card is also checked against the commander's trigger (*"Whenever another **nontoken** artifact
you control enters, you may pay {2}… If the token isn't a creature, it becomes a 2/2 Robot Villain
creature"*) and against Echoes of Eternity, which doubles triggers of colourless permanents.

**List:** `main`, the only list, last changed 2026-09-16 (Hangarback Walker).

**Field lens:** unavailable. EDHREC has no FRA/FRC data until the sets release.

**Bracket:** FRA and FRC contain **no Game Changers**, so the list stays at 3/3 (Ancient Tomb,
Mishra's Workshop, The One Ring).

## Pool

28 cards fit a colourless identity and are commander-legal: 14 FRA + 14 FRC. 17 are new and 11 are
reprints. Sol Ring is already in the list.

## Result

| List | MAIN | SIDE | IN | NO |
|---|---|---|---|---|
| main | **2** | 3 | 1 | 22 |

- **MAIN:** Memnarch, the Warden in, Canoptek Spyder out. Hall of Echoes in, one Wastes out.
- **SIDE:** Ginger, Queen of Sweets (the curve-friendlier answer for the Spyder slot), Darksteel
  Angel (swap for Platinum Angel against destroy-heavy pods), Living Library (displaces Null
  Elemental Blast).
- **Traps:** Karn, Argent Defender turns the commander off. The Echoverse Fulcrum wipes your
  copied rocks. Command Tower, Arcane Signet and Path of Ancestry tap for nothing under a
  colourless commander.
- **Loops:** none of the 28 creates a loop with the copy engines, Unwinding Clock, Deserted Temple
  or Forsaken Monument. Basalt Monolith stays out, and nothing here replaces it.

---

## Set mechanics as they matter to this deck

- **Colourless identity cuts the pool to 28, and three of those produce no mana.** Command Tower,
  Arcane Signet and Path of Ancestry all add *"one mana of any color in your commander's color
  identity"*. A colourless identity has no colour, so they add nothing. This is Command Tower's
  official ruling, and it's the same scope-clause reading as LEDGER 2026-09-03 (Commander's Plate on
  a colourless commander).
- **Ultron's copies of rocks are creatures.** Anything that says *"destroy all creatures"* (The
  Echoverse Fulcrum) or *"artifacts and creatures entering don't trigger"* (Karn, Argent Defender)
  hits the engine itself, not a side piece.
- **Echoes of Eternity doubles colourless-permanent triggers.** That applies to both new draw bodies:
  Memnarch's attack draw and Ginger's upkeep Gingerbrute. It is a real deck-out risk with Memnarch
  (see below).
- **Prepare / Empower Jace / Surveil:** none of the colourless cards is a prepare creature, so
  Hexhaven Dueling Arena is blank. The one Jace-token card (Keeper of the Quiet Hour) has no payoff.
- **"Becomes a copy" is not "enters".** Hall of Echoes turning into a creature fires no ETB.
  Everything it gains is static or triggered text the copied creature already has, which is exactly
  why copying the commander works.

---

## Classification table — all 28

Verdicts: **MAIN** = displace a named card now · **SIDE** = bench with a named displacement ·
**IN** = already in the list · **NO** = pass.

### Colorless

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 1 | Currency Converter | 1 | REPRINT | NO | Loot plus a Rogue or Treasure token from discards. Selection; the tokens are never Ultron triggers (nontoken only) |
| 2 | Eye of Jace | 1 | NEW | NO | Upkeep surveil 1 that sacrifices itself at seven cards in the graveyard. The Ultron copy is a 2/2 that surveils: no payoff |
| 3 | Sol Ring | 1 | REPRINT | IN | Already in the list |
| 4 | Afterthought Sentry | 2 | NEW | NO | 2/2 that exiles a graveyard card on attack |
| 5 | Arcane Signet | 2 | REPRINT | NO | **Trap.** *"One mana of any color in your commander's color identity"*: Ultron's identity has no colour, so it taps for nothing (the Command Tower ruling) |
| 6 | Fellwar Stone | 2 | REPRINT | NO | Coloured mana only, which can't pay the deck's {C} pips (Echoes, Eldrazi Confluence, Kozilek's Command, Null Elemental Blast, Fleshraker). Rocks are at 13 |
| 7 | Karn, Argent Defender | 2 | NEW | NO | **Trap.** *"Artifacts and creatures entering the battlefield don't cause abilities to trigger"*. The commander's trigger reads *"Whenever another nontoken artifact you control enters"*, so Karn switches Ultron off, along with Panharmonicon, Canoptek Spyder, Fleshraker and every copyable ETB |
| 8 | Living Library | 2 | NEW | **SIDE** | {2} 0/4 artifact creature: *"{6}, Sacrifice this creature: … Its owner shuffles it into their library"*, at instant speed. Every Ultron copy is another Library, and it's a surplus-mana sink (the pilot's axis). Displaces Null Elemental Blast; see Bench |
| 9 | Medic's Kitesail | 2 | NEW | NO | Equipment. The Ultron token copy is a creature that can't equip (CR 301.5c), and the deck is not voltron |
| 10 | The Echoverse Fulcrum | 2 | NEW | NO | **Trap.** *"Destroy all creatures"*: every Ultron copy of a rock is a 2/2 Robot Villain creature, so it wipes your own mana base |
| 11 | Chromatic Lantern | 3 | REPRINT | NO | {3} for one mana; colour-fixing is dead text in a colourless deck |
| 12 | Keeper of the Quiet Hour | 3 | NEW | NO | 3/2 plus a Jace token. The copy re-empowers it, but no Jace payoff exists |
| 13 | Murmuring Volume | 3 | NEW | NO | {3} rock for one mana; Worn Powerstone makes two in the same slot |
| 14 | Traxos, Scourge Eternal | 4 | NEW | NO | Construct, so Machine Overlord makes it a 7/6 trampler. But it's a legendary vanilla beater: the copy dies to the legend rule without Mirror Box |
| 15 | Archive Arbiter | 6 | NEW | NO | Copyable ETB noncreature removal on a 4/4 flier. Meteor Golem (any nonland permanent) and Cityscape Leveler already hold that role, and the Bombs & ETB role is at 10 |
| 16 | Ginger, Queen of Sweets | 6 | NEW | **SIDE** | {6}: monarch, plus *"At the beginning of each upkeep, if you're the monarch, create a Gingerbrute"*: four artifact-creature tokens per cycle, eight under Echoes, each a Fleshraker ping. The curve-friendlier alternative to Memnarch for the Canoptek Spyder slot. See Bench |
| 17 | Omnath, Locus of the Void | 7 | NEW | NO | Near-miss. With Unwinding Clock it banks every opponent-turn rock activation (*"that mana becomes colorless instead"*), a huge Walking Ballista line. But it's off-type twice: not an artifact, so no Ultron copy and no Workshop or artifact-reducer discount. And the constraint recorded on 2026-09-09/16 is mana sinks, not mana |
| 18 | Darksteel Angel | 9 | NEW | **SIDE** | {9} nonlegendary 4/4 flier, indestructible, *"You can't lose the game and your opponents can't win the game."* Platinum Angel's lock with indestructible built in, and Ultron copies it cleanly. Swap for Platinum Angel against destroy-heavy pods. See Bench |
| 19 | Emrakul, the Exigent Doom | 10 | REPRINT | NO | Near-miss. The cast trigger *"untap all lands you control"* refunds Tron, and {3}: exile it to make a land tap for {C}{C}. But it's not an artifact (no copy, no Workshop), the Bombs role is at 10, and 13 cards already sit at MV 7+ |
| 20 | Memnarch, the Warden | 10 | NEW | **MAIN** | {10} legendary artifact creature, indestructible 8/9, ETB two Myr, *"Whenever Memnarch attacks, draw a card for each artifact you control"*. Displaces Canoptek Spyder. See Proposed swaps |

### Land

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 21 | Command Tower | 0 | REPRINT | NO | **Trap.** Taps for nothing under a colourless commander (same clause as Arcane Signet) |
| 22 | Exotic Orchard | 0 | REPRINT | NO | Coloured mana only; a Wastes pays the {C} pips and this can't |
| 23 | Fabled Passage | 0 | REPRINT | NO | Fetches a Wastes. Nothing here rewards landfall or thinning |
| 24 | Hall of Echoes | 0 | NEW | **MAIN** | {T}: Add {C}; *"{5}: This land becomes a copy of target creature you control until end of turn. The 'legend rule' doesn't apply to permanents you control this turn."* On a deploy turn it becomes a second Ultron. Displaces one Wastes. See Proposed swaps |
| 25 | Hexhaven Dueling Arena | 0 | NEW | NO | Its abilities only prepare creatures with prepare spells, and the deck has none |
| 26 | Path of Ancestry | 0 | REPRINT | NO | **Trap.** Enters tapped and taps for nothing under a colourless commander |
| 27 | Reflecting Pool | 0 | REPRINT | NO | Only ever produces {C} here: a Wastes that isn't basic (Solemn Simulacrum and Extraplanar Lens both want the basic) |
| 28 | Room of Refuge | 0 | NEW | NO | Tapped land that makes one colour; {5} for two +1/+1 counters |

---

## Proposed swaps

### 1. Memnarch, the Warden in, Canoptek Spyder out

**The card:** Memnarch, the Warden `{10}`, Legendary Artifact Creature — Wizard 8/9. *"Indestructible.
When Memnarch enters, create two 1/1 colorless Myr artifact creature tokens. Whenever Memnarch
attacks, draw a card for each artifact you control."* FRC, new, not a Game Changer.

**Role table: Card Draw (7 cards + the candidate), scored against the current list.**

| Card | MV | Cards per turn cycle here | Needs (in deck?) | Ultron copy for {2} | Survives a destroy-wipe | Notes |
|---|---|---|---|---|---|---|
| **Canoptek Spyder** | 5 | ~1 per turn: triggers on *"another **nontoken** artifact creature or Vehicle"*; Ultron's copies never count | nontoken artifact creatures entering (25 in the 99) | a second Spyder, so a second trigger | no | named weakest draw piece in the 2026-09-09, 09-10 and 09-16 cut tables |
| Chimil, the Inner Sun | 6 | 1 per turn (discover 5, often a free cast) | — | legendary (Mirror Box) | no | also makes your spells uncounterable |
| Idol of Oblivion | 2 | up to 4 with Clock, on turns you made a token | tokens (yes) | 2/2 that also draws | no | {8}: 10/10 |
| Iron Spider, Stark Upgrade | 3 | {2} per card, paid in counters | +1/+1 counters (yes) | legendary | no | also the team counter engine |
| Mind's Eye | 5 | 3+ for {1} each | opponents' draws; Clock (yes) | Robot, so Roaming Throne doubles it | no | the surplus-mana sink (2026-09-09) |
| The One Ring | 4 | escalating | — | the token resets burden | **yes** | Game Changer |
| The Ten Rings | 8 | refills to 10 at end step | an empty-ish hand | legendary | no | |
| **Memnarch, the Warden** | 10 (see cost-out) | **one card per artifact you control per attack**: 10–25 on a normal Ultron board, doubled by Echoes | attacking (Krang gives haste; otherwise wait a turn) | ETB = **2 more Myr** (the token Memnarch then dies to the legend rule without Mirror Box) | **yes (indestructible)** | 8/9 body; the Myr feed Myr Battlesphere |

**Deciding axis: ceiling of card flow, plus survival.** Spyder is ~1 card a turn and dies with the
board. Memnarch turns the board Ultron already builds into cards on every attack, and the 8/9
indestructible body survives the destroy-wipes that end Ultron games. Krang gives it haste and
flying; Darksteel Forge is redundant on it.

**Cost-out in this deck's mana (§1.2).** It's `{10}` generic and an artifact spell, so every
discount applies:

- Foundry Inspector −1, Cloud Key (artifact) −1, Jhoira's Familiar −1 (historic), Semblance Anvil
  −2 (artifact imprinted), Ugin, the Ineffable −2 (colourless). Floor {3}. Mycosynth Golem's
  affinity goes further.
- Mishra's Workshop's `{C}{C}{C}` and Karn, Legacy Reforged's mana both pay for it.
- **Thran Temporal Gateway or Quicksilver Amulet put it in for `{4}`**, at instant speed.
- Hard-casting it triggers **Sanctum of Ugin** (a colourless spell with MV ≥ 7 tutors Krang or
  Blightsteel), and it's an **Ugin's Labyrinth** imprint target.
- Realistic cost: 4–6.

**Interactions:**

- **Glaring Fleshraker** pings each opponent three times on entry: Memnarch plus two Myr are three
  colourless creatures entering, doubled under Echoes.
- **Panharmonicon** and **Echoes** make the ETB four Myr.
- **Cybermen Squadron's** myriad does *not* apply, because Memnarch is legendary.

**Self-hits (§1.3):**

- **The attack draw is mandatory.** Under Echoes it triggers twice, so a 20-artifact board draws
  40 cards. Attacking is optional, so this is counting discipline, not a structural risk, but it's
  the easiest way in this deck to deck yourself. With The Ten Rings and Mind's Eye also online,
  count before attacking.
- The Ultron copy runs into the legend rule unless Mirror Box is out. You keep one Memnarch and
  still get the copy's two Myr.
- No trigger in the list is switched off by it.

**Curve (nonland, measured):** avg MV 4.492 → **4.569**; MV ≤ 2 12 → 12; MV ≤ 3 23 → 23; cards at
MV 7+ 13 → **14**. That is the cost, stated up front: the deck is already the heaviest in the repo.
Ginger, Queen of Sweets (Bench) is the lower-curve answer to the same slot (4.492 → 4.508).

**Alternatives considered:**

- **Ginger instead:** see Bench.
- **The Ten Rings out:** not recommended. With the hand emptied by deployers it refills for 5–10.
- **Hedron Archive out:** it's a rock, not draw, and was declined 2026-09-09/10.

### 2. Hall of Echoes in, one Wastes out (Wastes 8 → 7)

**The card:** Hall of Echoes, Land. *"{T}: Add {C}. {5}: This land becomes a copy of target creature
you control until end of turn. The 'legend rule' doesn't apply to permanents you control this
turn."* FRA, new.

**Role check: Lands (34).** Every land in the list except the 8 Wastes already does a second job:
Tron ×3, the Tron fetchers and copiers (Urza's Cave, Thespian's Stage, Vesuva), Mishra's
Workshop, Ancient Tomb, Urza's Saga, Urza's Workshop, the artifact lands, Buried Ruin, Inventors'
Fair, Fomori Vault, War Room, Mirrorpool, Rogue's Passage, Sanctum of Ugin, Ugin's Labyrinth,
Scavenger Grounds, Shrine, The Mycosynth Gardens, Deserted Temple, Command Beacon and Treasure
Vault. A Wastes is the only land whose whole text is `{T}: Add {C}`, so it's the only honest cut.
Hall of Echoes enters untapped and taps for `{C}`, so it still pays the deck's `{C}` pips.

**Deciding axis: a second job at zero deck cost.** For `{5}`, at **instant speed** (no timing
restriction), the land becomes a copy of any creature you control. With the legend rule off, the
best targets are:

- **Ultron:** a second commander trigger for the rest of the turn. Every nontoken artifact that
  enters offers **two** `{2}` copies. Roaming Throne (Robot) doubles the Hall-Ultron's trigger too.
  Activate it before a Thran Temporal Gateway or Quicksilver Amulet deploy on an opponent's turn,
  with Unwinding Clock-refreshed mana.
- **Glaring Fleshraker:** double pings on a big token turn.
- **Krang, Myr Battlesphere or Blightsteel:** a second attacker for one turn.

**Rules notes:**

- Becoming a copy is not entering, so the Hall gets no ETB. Copying Meteor Golem does nothing.
- While it's a copy it isn't a land, and loses `{T}: Add {C}`. So tap it for mana first, then use
  that mana toward the `{5}`: a tapped copy of Ultron still triggers.
- The copy has been under your control since the turn began, so it can attack (CR 302.6).

**Costs:** one fewer basic. Extraplanar Lens has one fewer Wastes to double (8 → 7 by name), and
Solemn Simulacrum has one fewer basic to fetch. If the Hall-copy dies to removal that turn, you lose
a land. **No loop:** the copy's trigger costs `{2}` per token, like the original.

**Curve:** unchanged (a land for a land).

---

## Bench (SIDE)

### Ginger, Queen of Sweets: displaces Canoptek Spyder (alternative to Memnarch)

`{6}` Legendary Artifact Creature — Food Noble 6/4. *"When Ginger enters, you become the monarch.
{2}, {T}, Sacrifice Ginger: You gain 6 life. At the beginning of each upkeep, if you're the monarch,
create a Gingerbrute token."* The Gingerbrute is a 1/1 artifact creature (Food Golem) with haste
and *"{1}: can't be blocked except by creatures with haste."*

- **What it makes:** four artifact-creature tokens per turn cycle, including on opponents'
  upkeeps, and **eight under Echoes** (Ginger is a colourless permanent). Plus the monarch's end-step
  card (CR 725.2).
- **What the tokens feed:** each Gingerbrute is a Glaring Fleshraker ping to every opponent, a
  token for Idol of Oblivion, a 3/3 under Forsaken Monument, and myriad under Cybermen Squadron
  (nonlegendary artifact creatures).
- **vs Memnarch:** MV 6 (avg MV 4.492 → 4.508, against Memnarch's 4.569).
- **Why second, not first:** monarch changes hands to any creature that connects, and being monarch
  paints a target. Copying Ginger is worth nothing without Mirror Box (becoming monarch again gains
  nothing). If the pilot prefers the curve, this is the pick for the slot.

### Darksteel Angel: swap for Platinum Angel in destroy-heavy pods

`{9}` Artifact Creature — Angel 4/4. *"Flying, indestructible. You can't lose the game and your
opponents can't win the game. Creatures you control can't have -1/-1 counters put on them."*

- **The upgrade:** it's the lock the pilot added on 2026-09-12 (*"good luck trying to remove 2 of
  her"*) with indestructible built in rather than borrowed from Darksteel Forge or Krang.
  Nonlegendary, so Ultron copies it cleanly.
- **Mana:** MV 9 triggers Sanctum of Ugin, fits Ugin's Labyrinth, and costs `{4}` off a deployer.
- **The cost:** two more mana than Platinum Angel on a hard cast.
- **When:** bring it in where the pod's removal is *destroy*. Exile, bounce and edicts beat both
  Angels equally.
- **Flag:** some pods dislike "can't lose" locks (the same note as Platinum Angel).

### Living Library: displaces Null Elemental Blast

`{2}` Artifact Creature — Book Illusion 0/4. *"{6}, Sacrifice this creature: Choose target creature or
planeswalker an opponent controls. Its owner shuffles it into their library."*

- **The upgrade:** instant speed, and it answers indestructible and recursive threats. Each Ultron
  copy is another Library, it's a 0/4 early blocker, Steel Overseer grows it, and it's MV 2 in a
  4.49 deck.
- **Why it fits:** it's a surplus-mana sink, the axis the pilot used for Mind's Eye and Hangarback
  Walker.
- **Why Null Elemental Blast:** it tops every recent cut table. *"Multicolored"* only, so it's
  pod-dependent, and Workshop can't pay for it.
- **The cost:** 8 mana all-in per answer, against NEB's `{C}`. It stays on the bench because the
  interaction role is already nine deep with six one-sided answers.

---

## Near-misses

- **Omnath, Locus of the Void**:
  - **The line:** with Unwinding Clock it banks every opponent-turn rock activation (*"If you would
    lose unspent mana, that mana becomes colorless instead"*). That's a Walking Ballista kill line
    and no loop. Deploys for `{4}` (historic, creature).
  - **Why not:** it's off-type twice (not an artifact: no Ultron copy, no Workshop mana, no artifact
    reducers), the same grounds that cut Karn, Scion of Urza on 2026-09-10. And the deck's recorded
    constraint is sinks for surplus mana, not more mana.
- **Emrakul, the Exigent Doom** (reprint):
  - **The line:** *"When you cast this spell, untap all lands you control"* refunds Tron. The hand
    mode (`{3}`, exile it: a land gains `{T}: Add {C}{C}`) is Sol-Ring-on-a-land ramp. Sanctum and
    Labyrinth both like it.
  - **Why not:** it isn't an artifact, Bombs is at 10, and 13 cards already sit at MV 7+.
- **Archive Arbiter**: copyable ETB noncreature removal on a 4/4 flier. Meteor Golem already does
  it on any nonland permanent.

---

## Traps

- **Karn, Argent Defender**: *"Artifacts and creatures entering the battlefield don't cause
  abilities to trigger."* Ultron's whole ability is an artifact-enters trigger, so this card turns
  the commander off. It also blanks Panharmonicon, Canoptek Spyder, Glaring Fleshraker, Mirrorworks
  and every copyable ETB (Meteor Golem, Duplicant, Myr Battlesphere, Portal to Phyrexia, Solemn).
  Colourless, cheap and on-theme, which is exactly why it's dangerous.
- **The Echoverse Fulcrum**: *"Destroy all creatures."* Every Ultron copy of a Sol Ring, Thran Dynamo
  or Gilded Lotus is a 2/2 Robot Villain *creature*, so the one-sided wipe you imagine is really a
  wipe of your own mana. One-sided only under Darksteel Forge or Krang.
- **Command Tower, Arcane Signet, Path of Ancestry**: *"any color in your commander's color
  identity"* names nothing under a colourless commander, so they produce no mana.

## Follow-up after the pilot's first pass (2026-09-28)

Pilot's notes: Memnarch *"can be a bit expensive for ultron innit? … not sure if replacing canoptek
spyder tho because of the mv change … what if we add him to iron man instead?"* Hall of Echoes: *"will
weaken that card that allows us to exile a waste and double the production of mana from wastes …
worth doing a manabase optimization pass to remove lands that we don't get to trigger often."*

### Memnarch, the Warden — the real cost in this list

Verified text: *"Indestructible. When Memnarch enters, create two 1/1 colorless Myr artifact creature
tokens. Whenever Memnarch attacks, draw a card for each artifact you control."* `{10}`, colourless
legendary artifact creature.

What this 99 actually does to a `{10}` artifact creature (every line below is in the list):

| Route | Cards | Effective cost |
|---|---|---|
| Reducers | Foundry Inspector (artifact −1), Cloud Key (artifact −1), Jhoira's Familiar (historic −1), Semblance Anvil (artifact imprinted −2), Ugin, the Ineffable (colourless −2), Mycosynth Golem (affinity: −1 per artifact) | one reducer → 8–9; two → 6–7; Golem → near 0 |
| Deployers (not a cast) | Thran Temporal Gateway (historic), Quicksilver Amulet (creature) — `{4}`, instant speed | **4** |
| Cheat from library | Kuldotha Forgemaster (sacrifice three artifacts) | 0 mana |
| Big mana | Tron (7 from three lands), Mishra's Workshop `{C}{C}{C}` (artifact spells — Memnarch qualifies), Ancient Tomb, Ugin's Labyrinth, Forsaken Monument (+{C} per {C} tap), Gilded Lotus, Thran Dynamo, Arc Reactor, Karn Legacy Reforged and Mightstone (artifact-only mana) | — |
| Tutors | Sanctum of Ugin (on any colourless MV 7+ cast), Inventors' Fair | — |

**Typical landing:** turn 5–6 hard-cast (Tron or Workshop plus one reducer), turn 4–5 off a deployer.
It is not "too expensive" *for this deck* — 13 cards already sit at MV 7+, three of them at 9–12, and
Memnarch's effective cost is 4–7. The honest cost is **hand clog**: a 14th card at 7+ makes more
opening hands carry two uncastables.

**Curve (nonland, measured from deck.json):** Canoptek Spyder → Memnarch moves avg MV **4.470 →
4.545**, MV ≤ 2 **12 → 12**, MV ≤ 3 **24 → 24**, MV 7+ **13 → 14**. The early curve — what a win-turn
estimate reads — does not move; the top end grows by one.

**If the Spyder cut is the sticking point — the 7+ slot ranked (§2.1 step 4):**

| Card | MV | Role here | Cut for Memnarch? |
|---|---|---|---|
| Blightsteel Colossus | 12 | infect finisher, deployer/Forgemaster target | no |
| Mycosynth Golem | 11 | affinity engine — pilot kept it 2026-09-08 | no |
| Krang, Utrom Warlord | 9 | team haste/flying/trample/indestructible — also gives Memnarch haste | no |
| Portal to Phyrexia | 9 | triple edict + reanimation engine | no |
| Darksteel Forge | 9 | the anti-wipe piece | no |
| The Ten Rings | 8 | draw to ten every end step, no attack needed | only same-role option (avg → 4.500, 7+ stays 13) — **not recommended**: it draws every turn without attacking, and has been kept every time it was nominated |
| Cityscape Leveler | 8 | removal on cast and each attack | no (Removal 9 → 8) |
| All Is Dust | 7 | one-sided wipe here | no |
| Meteor Golem | 7 | copyable ETB removal | no |
| Ugin, Eye of the Storms | 7 | exile per colourless spell | no |
| Cybermen Squadron | 7 | myriad finisher | no |
| Myr Battlesphere | 7 | best copy target in the deck | no |
| Platinum Angel | 7 | pilot's pick 2026-09-12 | no |

Every 7+ card has a job; none is a cleaner cut than Spyder, which three prior cut tables named the
weakest draw piece (~1 card a turn; tokens never count). **So the choice is Spyder, or pass.** If the
top end is the worry, **Ginger, Queen of Sweets** `{6}` is the curve-friendly alternative for the same
slot (avg 4.470 → 4.485).

**Synergy worth naming:** Hall of Echoes (below) can become a copy of Memnarch; the copy has been
under your control since the turn began, so it can attack (CR 302.6) and draws a second time. The
attack draw is mandatory — count the library before attacking with both, especially under Echoes of
Eternity (doubled trigger).

### Memnarch in Iron Man instead? No — see the Iron Man follow-up

Short version: Iron Man v3 runs **Silent Arbiter** (*"No more than one creature can attack each
combat"*), and the commander is that one attacker every combat. Memnarch's draw is an attack trigger,
so it never fires there — the exact grounds on which Iron Man, Master of Machines was cut on
2026-09-08. **Recommended home: Ultron only.** Deciding axis: whether the draw trigger can fire at all.

### Manabase optimization pass

**The card the pilot means is Extraplanar Lens** — *"Imprint — When this artifact enters, you may
exile target land you control. Whenever a land with the same name as the exiled card is tapped for
mana, its controller adds one mana of any type that land produced."* Imprinting a Wastes exiles one,
so the Lens does nothing until a **second** Wastes is on the battlefield.

**What a Wastes is worth to the Lens** (hypergeometric, 99-card library, no extra draw counted):

| Cards seen | 7 Wastes | 8 Wastes (now) | 9 Wastes |
|---|---|---|---|
| 12 (≈ turn 6 on the play) | P(≥2) 0.20 · +0.24 {C}/turn | P(≥2) 0.25 · +0.31 | P(≥2) 0.30 · +0.39 |
| 16 (≈ turn 8–9) | 0.32 · +0.41 | 0.38 · +0.52 | 0.45 · +0.64 |

So the pilot is right about the direction — each Wastes cut costs the Lens about **0.07–0.11 {C} a
turn** — and the size is small either way. Lens-on-Wastes is a modest mode at eight Wastes; the other
mode in the gameplan (imprint a Vesuva/Stage copy of Urza's Tower once Tron is up) is the bigger one.

**Ultron's own tax, for costing "the mana is better spent on the trigger":** *"Whenever another
nontoken artifact you control enters, you may pay {2}. If you do, create a token that's a copy of it."*
Every nontoken artifact is a `{2}` ask, plus Mirrorworks' `{2}`, Prototype Portal's `{X}`, the
deployers' `{4}`, Mind's Eye's `{1}` per card. **Mishra's Workshop's mana can't pay any of those**
("only to cast artifact spells").

**Every land, checked:**

| Land | Taps for | Enters | Ability and cost | How often a developing Ultron board pays it | Verdict |
|---|---|---|---|---|---|
| Ancient Tomb | {C}{C} (2 damage) | untapped | — | every turn | KEEP |
| Mishra's Workshop | {C}{C}{C}, artifact spells only | untapped | — | every turn | KEEP |
| Urza's Mine / Power Plant / Tower | {C} → 2/2/3 with Tron | untapped | — | every turn | KEEP |
| Urza's Workshop | {C}; metalcraft: {C} per Urza's land | untapped | — | every turn with 3+ artifacts | KEEP |
| Ugin's Labyrinth | {C}{C} with a 7+ imprint | untapped | {T}: return the card | 13 imprint targets | KEEP |
| Shrine of the Forsaken Gods | {C}; {C}{C} for colourless spells at 7+ lands | untapped | — | every late turn | KEEP |
| Urza's Saga | {C} (ch. I) | — | ch. II {2}: Construct; ch. III free tutor for a 0/1-drop | the tutor is free | KEEP |
| Urza's Cave | {C} | untapped | {3}, sac: fetch a land tapped | early, to assemble Tron (it can fetch Planar Nexus too) | KEEP |
| Thespian's Stage | {C} | untapped | {2}: permanently copy a land | once (Tower, Workshop, Tomb) | KEEP |
| Vesuva | copy of a land | tapped | — | — | KEEP |
| Deserted Temple | {C} | untapped | {1}: untap target land | it is ramp: net +1 (Tomb) to +5 (Tower under Monument) | KEEP |
| Darksteel Citadel | {C} | untapped | — (indestructible artifact) | artifact count; Ultron copies it into a mana creature | KEEP |
| Treasure Vault | {C} | untapped | {X}{X}, sac: X Treasures | rarely — but it is an untapped artifact land, so it costs nothing to keep | KEEP |
| The Mycosynth Gardens | {C} | untapped | {X}: permanently becomes a copy of an artifact with MV X | once, high value (a second Unwinding Clock / Panharmonicon / Thran Dynamo) | KEEP |
| Sanctum of Ugin | {C} | untapped | free trigger on colourless MV 7+ casts: tutor a colourless creature | 13 enablers | KEEP |
| Inventors' Fair | {C} | untapped | {4}, sac: artifact tutor (3+ artifacts) | once, high value | KEEP |
| Buried Ruin | {C} | untapped | {2}, sac: artifact from graveyard to hand | after removal; the list's only artifact recursion besides Portal | KEEP |
| Command Beacon | {C} | untapped | sac: commander to hand | after Ultron's 2nd death — saves {4}+ tax | KEEP |
| War Room | {C} | untapped | {3}: draw a card (life = colours in identity = **0**) | late-game sink; the only land that makes a card | KEEP — the weakest keep |
| Power Depot | {C} (its any-colour mode is irrelevant here) | **tapped** | modular 1 | — | **FLAG** — keep for artifact count (Mox Opal, Urza's Workshop metalcraft, Karn, Memnarch); first cut if tapped lands hurt |
| **Fomori Vault** | {C} | untapped | {3}, discard: look at top X, take one | rarely — card-neutral for {3}, competing with Ultron's {2} | **SWAP → Planar Nexus** |
| **Mirrorpool** | {C} | **tapped** | {2}{C} copy a spell / {4}{C} copy a creature, sac | rarely — Ultron copies artifacts for {2} | **SWAP → Hall of Echoes** |
| **Rogue's Passage** | {C} | untapped | {4}: unblockable | rarely — Blightsteel already tramples (a chump still lets ~10 poison through), Krang grants flying and trample | **SWAP → a 9th Wastes** |
| Scavenger Grounds | {C} | untapped | {2}, sac a Desert: exile all graveyards | pod-dependent; also exiles Portal to Phyrexia's reanimation targets and Buried Ruin's | **FLAG** — a hate piece, so the pilot's pod call; Kozilek's Command already has a graveyard-exile mode |
| Wastes ×8 | {C} | untapped | — | Lens by name, Solemn's basic | KEEP (→ 9) |

**The three swaps:**

1. **Planar Nexus in, Fomori Vault out.** *"This land is every nonbasic land type. {T}: Add {C}.
   {1}, {T}: Add one mana of any color."* Every nonbasic type includes **Urza's, Mine, Power-Plant and
   Tower** (CR 205.3i), so Nexus is an Urza's Mine, Power-Plant and Tower at once: **any single Tron
   land plus Nexus is Tron** (Tower + Nexus = 4 from two lands; Mine + Tower + Nexus = 6 from three).
   It also counts for Urza's Workshop's metalcraft. Urza's Cave, Thespian's Stage and Vesuva all find
   or copy it. This is the "more mana, no activation" land the pilot described. *(Confidence: high on
   205.3i; the "one permanent satisfies both halves of the Tron clause" reading matches the MH3 release
   notes as I recall them — worth a one-line `mtg-rules-expert` check before relying on it.)*
2. **Hall of Echoes in, Mirrorpool out** — *not* a Wastes. Hall does Mirrorpool's creature-copy job
   better (untapped, no sacrifice, repeatable every turn, legend rule off for the turn: a second Ultron
   trigger, or a second Memnarch attack). Tapped lands 3 → 2. **Wastes stays at 8, so the Lens loses
   nothing.**
3. **A 9th Wastes in, Rogue's Passage out.** Lens-on-Wastes goes from +0.31 to +0.39 {C}/turn at
   turn 6 (+0.52 → +0.64 by turn 8–9), Solemn has another basic. `gameplan.md` names "Rogue's Passage
   makes one unblockable" in the Blightsteel line; that line still works through trample against a
   single chump.

**Passed:** Temple of the False God (a blank land before five lands in a turn-3-commander deck),
Crystal Vein (one-shot), Cloudpost (enters tapped; needs other Locus lands — only Nexus would be one),
Eldrazi Temple (three Eldrazi cards), Cavern of Souls (Chimil already makes spells uncounterable).

**Loop audit:** none of the three new lands untaps anything. Deserted Temple (untaps one land for {1},
taps itself) stays bounded; Basalt Monolith stays out.

**Curve:** lands for lands — nonland curve unchanged; land count 34, Wastes 8 → 9.

Out of scope, noted: `gameplan.md` calls The Mycosynth Gardens "a repeatable fifth copy of Forsaken
Monument" — Monument is legendary, so that copy dies to the legend rule unless Mirror Box is out.
