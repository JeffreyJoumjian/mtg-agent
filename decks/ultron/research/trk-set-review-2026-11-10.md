# TRK + TRC set review: Ultron (Artificial Malevolence), 2026-11-10

**Sets:** Star Trek (TRK, 311 cards) and Star Trek Commander (TRC, 336 cards), both releasing
2026-11-13. Scryfall already lists every card in both as Commander-legal, so no card here is waiting
on legality.

**Method:** deck-brain SKILL.md §1 and §2. Set cards' text comes from the pool files
(`data/trk-candidates-ultron.json`, `data/trc-candidates-ultron.json`), the deck's own cards from the
bundle's oracle dump, and rules from `rules/sections/`. Each card is costed against the deck's real
discounts:

- **Reducers:** Foundry Inspector and Cloud Key (artifact spells), Jhoira's Familiar (historic, which
  covers every artifact and every legendary), Semblance Anvil (shares a card type), Ugin, the
  Ineffable (colourless spells), Mycosynth Golem (affinity for artifact creature spells).
- **Restricted mana:** Mishra's Workshop, Karn, Legacy Reforged and The Mightstone and Weakstone pay
  only for artifact spells.
- **Deployer:** Thran Temporal Gateway (`{4},{T}`, any historic permanent card). Quicksilver Amulet
  left today.

Every card is also checked against the commander's trigger (*"Whenever another **nontoken** artifact
you control enters, you may pay {2}. If you do, create a token that's a copy of it. If the token
isn't a creature, it becomes a 2/2 Robot Villain creature"*) and against the three trigger doublers
in the list (Echoes of Eternity, Panharmonicon, Roaming Throne naming Robot).

**Lists:** `main` is the only list and the target. It last changed today: Ugin, the Spirit Dragon in
for Quicksilver Amulet and Tezzeret, Cruel Captain in for Thought Vessel, both trials. Omnath, Locus
of the Void has been on trial since 2026-09-30. No proposal below cuts a trial card.

**Field lens:** EDHREC has no TRK or TRC data before release, so that lens is skipped.

**Bracket:** neither set has a Game Changer. The count is 3 before and 3 after every proposed swap
(Ancient Tomb, Mishra's Workshop, The One Ring).

## Pool

73 cards fit a colourless identity and are Commander-legal: 18 TRK and 55 TRC, with no card in both.
38 are new (17 TRK, 21 TRC) and 35 are reprints (Engineered Explosives is the only TRK one). 14 are
lands. Six are already in `main`: Sol Ring, Mind Stone, Hedron Archive, Unwinding Clock, Forsaken
Monument and Command Beacon.

## Result

| List | MAIN | SIDE | IN | NO |
|---|---|---|---|---|
| main | **4** | 2 | 6 | 61 |

- **MAIN:** [Replicator](https://scryfall.com/search?q=%21%22Replicator%22) in,
  [Sculpting Steel](https://scryfall.com/search?q=%21%22Sculpting+Steel%22) out. It makes a tapped
  token copy of any token for a flat {2}, every untap, and Ultron turns every artifact into a token.
- **MAIN:** [The Guardian of Forever](https://scryfall.com/search?q=%21%22The+Guardian+of+Forever%22)
  in, [Palladium Myr](https://scryfall.com/search?q=%21%22Palladium+Myr%22) out. It saves Ultron from
  any removal at instant speed, and each {4} re-buys an ETB creature with a fresh Ultron trigger.
- **MAIN:** [U.S.S. Enterprise-D, Galaxy-Class](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-D%2C+Galaxy-Class%22)
  in, [Hangarback Walker](https://scryfall.com/search?q=%21%22Hangarback+Walker%22) out. Tapping
  Ultron to station it exiles a card to play every turn, which takes Card Draw from 7 to 8.
- **MAIN:** [Deep Space 9](https://scryfall.com/search?q=%21%22Deep+Space+9%22) in,
  [The Ten Rings](https://scryfall.com/search?q=%21%22The+Ten+Rings%22) out. It puts about four
  permanents onto the battlefield on entry and again every upkeep, for no mana.
- **SIDE:** [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) displaces Hangarback
  Walker. It's the higher-ceiling, board-dependent alternative to Enterprise-D for that slot.
- **SIDE:** [Thought Vessel](https://scryfall.com/search?q=%21%22Thought+Vessel%22) displaces
  [Tezzeret, Cruel Captain](https://scryfall.com/search?q=%21%22Tezzeret%2C+Cruel+Captain%22). It has
  been on the bench since today's cut, and its row doesn't change.
- **Traps:** [The Immortal Sun](https://scryfall.com/search?q=%21%22The+Immortal+Sun%22) switches off
  all three Ugins and Tezzeret.
  [Isolinear Processor](https://scryfall.com/search?q=%21%22Isolinear+Processor%22) can't pay
  Ultron's {2}. [Engineered Explosives](https://scryfall.com/search?q=%21%22Engineered+Explosives%22)
  at zero counters wipes our own tokens. Arcane Signet, Commander's Sphere, Command Tower and Path of
  Ancestry tap for nothing.
- **Loops:** none of the 73 loops with the copy engines, Unwinding Clock, Tezzeret's 0, Deserted
  Temple or Forsaken Monument. Basalt Monolith stays out, and nothing here replaces it.

**All four together** (measured from the bundle's oracle dump, commander included, as `deck:show`
counts it):

| | Now | After all four |
|---|---|---|
| Average MV | 4.712 | 4.758 |
| MV ≤ 2 | 10 | 10 |
| MV ≤ 3 | 23 | 23 |
| MV 7+ | 16 | 16 |
| Ramp / Mana Rocks | 13 | 12 |
| Card Draw | 7 | 8 (Deep Space 9 counted as card flow, like Chimil's discover) |
| Copy Engines | 7 | 7 |
| Bombs & ETB Artifacts | 10 | 9 |
| Protection & Recursion | 3 | 4 |
| Mana sources (lands + rocks) | 47 | 46 |

Records the main session would update on applying: Karn, the Great Creator's and Myr Retriever's
bench rows both displace Palladium Myr, Scrap Trawler's displaces Hangarback Walker, and
`gameplan.md` names Sculpting Steel (line 59), The Ten Rings (Sanctum list, line 102) and Hangarback
Walker (lines 28, 102, 108, 118 to 124, 126).

---

## Set mechanics as they matter to this deck

- **Station is sorcery-speed and taps another creature as a cost.** CR 702.184a: *"Tap another
  untapped creature you control: Put a number of charge counters on this permanent equal to the
  tapped creature's power. Activate only as a sorcery."* The tap is a cost of the Spacecraft's
  ability, not the creature's own `{T}` ability, so CR 302.6 doesn't stop a summoning-sick creature
  from stationing. Ultron's fresh token rocks can't tap for mana the turn they arrive (ledger
  tap-007), so that turn they're free station fuel. Power is what counts (ledger equip-016).
- **Ultron's copy of a Spacecraft is a bare 2/2.** Copies get no counters (CR 707.2, ledger
  zone-009), so the token has none of the `{N+}` abilities, and because a Spacecraft below its
  threshold isn't a creature, Ultron's clause makes the token a 2/2 Robot Villain. Most Spacecraft
  here are legendary, so the copy also meets the legend rule. Deep Space 9 is the one exception
  worth paying for, because its entry trigger fires before the legend rule applies.
- **A Spacecraft with no power/toughness box never becomes a creature** (CR 721.2a). That's Deep
  Space 9, so creature wipes and creature removal can't touch it.
- **Communicators copy themselves on cast.** The card is nontoken, so it triggers Ultron. The copy is
  a token, so it doesn't (ledger zone-008). Ultron's copy of any Equipment is a creature, and an
  Equipment that's a creature can't equip (CR 301.5c).
- **A colourless identity blanks "any color in your commander's color identity".** Arcane Signet,
  Commander's Sphere, Command Tower and Path of Ancestry produce nothing here (Command Tower's
  official ruling, the same reading as the FRA review). The cards that make coloured mana (Class-F
  Shuttlecraft, Astral Cornucopia, Command Chair, Exotic Orchard, Spire of Industry, Starfleet
  Academy) pay generic costs but none of the `{C}` pips on Echoes of Eternity, Eldrazi Confluence,
  Kozilek's Command and Glaring Fleshraker.
- **"From outside the game" is blank in Commander** (CR 903.11, ledger zone-027), which halves The
  Holodeck.
- **The tribal payoffs (Klingon, Warrior, Federation, Borg) have nothing to read.** The deck has no
  Klingons or Warriors.

---

## Classification table: all 73

Verdicts: MAIN = displace a named card now · SIDE = bench with a named displacement · IN = already
in the list · NO = pass.

### Colorless nonland

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 1 | Astral Cornucopia | 0 | REPRINT | NO | {3} for one coloured mana at X = 1, which can't pay `{C}` pips. Ultron's copy enters with no counters and taps for nothing (zone-009) |
| 2 | Engineered Explosives | 0 | REPRINT | NO | Trap. At zero counters it destroys every MV 0 permanent: our Myr, Spawn, Thopter and Food tokens, plus Walking Ballista and Hangarback Walker (X is 0 on the battlefield, CR 107.3g). Blast Zone is already the bench answer to token decks |
| 3 | Everflowing Chalice | 0 | REPRINT | NO | Cut 2026-09-08 for Worn Powerstone. The grounds hold: Ultron's copy enters with zero charge counters and taps for nothing (zone-009) |
| 4 | Jefferies Tube | 1 | NEW | NO | Near-miss. `{4},{T}` draws a card and drops a land (an Omnath landfall), four times a cycle under Unwinding Clock. Four mana a card competes with Ultron's {2}, and its charge-counter mode has no target in the list. See Near-misses |
| 5 | Skullclamp | 1 | REPRINT | SIDE | The 2026-09-04 cut said Steel Overseer's counters outgrow the 1/1s. True of Myr and Thopters, false of Eldrazi Spawn and Scions, which Overseer skips and which sacrifice themselves. Alternative to Enterprise-D for the Hangarback Walker slot. See Bench |
| 6 | Sol Ring | 1 | REPRINT | IN | Already in main |
| 7 | Tricorder | 1 | NEW | NO | Equipment, +1/+1 and surveil 1 on attack. Ultron's copy can't equip (CR 301.5c), and the deck isn't voltron |
| 8 | Wayfarer's Bauble | 1 | REPRINT | NO | {3} all-in for a tapped Wastes, and Ramp is already over its target (13 against 12) |
| 9 | Arcane Signet | 2 | REPRINT | NO | Trap. *"One mana of any color in your commander's color identity"* names nothing under a colourless commander |
| 10 | Cybernetic Specialist | 2 | NEW | NO | A 2/1 with surveil 1 and a graveyard-to-bottom ability. Nothing here pays either off |
| 11 | Disruptor Pistol | 2 | NEW | NO | {6} all-in for 5 damage to one creature. Meteor Golem and Duplicant answer any size, and Removal is at its target of 9 |
| 12 | Howling Mine | 2 | REPRINT | NO | Symmetric draw, the group-hug grounds that rejected Scrawling Crawler at founding. The Mind's Eye line is recorded under Near-misses |
| 13 | Isolinear Processor | 2 | NEW | NO | Trap. Its mana is *"only to cast an artifact spell or activate an ability of an artifact source"*, and Ultron's {2} is paid while a triggered ability resolves (CR 113.3c), so it can't pay the copy. Mind Stone is the unrestricted 2-mana rock |
| 14 | Lightning Greaves | 2 | REPRINT | NO | Rejected at founding because shroud blocks our own targeting of Ultron. Stronger now, since Tezzeret's 0 (*"Untap target artifact or creature"*) is in the list |
| 15 | Mind Stone | 2 | REPRINT | IN | Already in main |
| 16 | Replicator | 2 | NEW | MAIN | `{2},{T}`: a tapped token copy of target token you control. Every Ultron copy is a token, so it repeats the best one for a flat {2}, four times a cycle under Unwinding Clock. Displaces Sculpting Steel. See Proposed swaps |
| 17 | Swiftfoot Boots | 2 | REPRINT | NO | Commander's Plate beat it at founding (protection from all five colours), and Cryptothrall already gives Ultron hexproof. Ultron's copy can't equip |
| 18 | Tea, Earl Grey, Hot | 2 | NEW | NO | A cantrip artifact whose Ultron copy draws one more for {2}. Ichor Wellspring, which also drew on death, was cut on 2026-09-04 as the lowest-output draw card |
| 19 | Thought Vessel | 2 | REPRINT | SIDE | Cut today for Tezzeret, Cruel Captain (the pilot's pick). Already on the bench, displacing Tezzeret. Row unchanged |
| 20 | Type-2 Phaser | 2 | NEW | NO | Equipment whose copy's ETB stuns one creature. The deck isn't voltron |
| 21 | U.S.S. Defiant, Mirror Migrant | 2 | NEW | NO | Near-miss. Flash, and its ETB phases out itself and Ultron through a wipe for {2}. It's one-shot, and The Guardian of Forever does the same save repeatedly. See Near-misses |
| 22 | Warp Core | 2 | NEW | NO | A basic land to hand, and charge counters only for Spacecraft |
| 23 | Class-F Shuttlecraft | 3 | NEW | NO | A {3} rock for one coloured mana. Worn Powerstone makes two colourless in the same slot |
| 24 | Combadge | 3 | NEW | NO | Two Communicators per cast, and unblockable only while another creature carries one. Equipment in a non-voltron deck |
| 25 | Commander's Sphere | 3 | REPRINT | NO | Trap. It taps for nothing under a colourless commander, which leaves a {3} cantrip |
| 26 | Darksteel Plate | 3 | REPRINT | NO | Darksteel Forge and Krang already give every artifact indestructible |
| 27 | Herald's Horn | 3 | REPRINT | NO | −1 for one creature type. Foundry Inspector covers every artifact spell, and Cost Reduction is at its target of 4 |
| 28 | I.K.S. Negh'Var, Imperial Flagship | 3 | NEW | NO | A Klingon and Warrior payoff with none in the deck, and it needs 10 station |
| 29 | K't'inga-Class Battle Cruiser | 3 | NEW | NO | A Klingon and Warrior payoff with none in the deck |
| 30 | S.S. Botany Bay | 3 | NEW | NO | One graveyard card per tap, and the return needs 8 station and a connecting hit. Scavenger Grounds and Kozilek's Command cover graveyards |
| 31 | Starfleet Communicator | 3 | NEW | NO | Trap. It draws only for equipped attackers, X = other Communicator-equipped creatures: two cards a combat for {5} of setup at sorcery speed. See Traps |
| 32 | Sword of Light and Shadow | 3 | REPRINT | NO | Voltron Equipment, which the pilot's brief excludes |
| 33 | The Guardian of Forever | 3 | NEW | MAIN | `{4}`, sacrifice another nontoken creature: it returns at the next end step. That saves Ultron from any removal at instant speed and re-buys Meteor Golem, Myr Battlesphere, Duplicant, Solemn and Wurmcoil, each return an Ultron trigger. Displaces Palladium Myr. See Proposed swaps |
| 34 | U.S.S. Enterprise-D, Galaxy-Class | 3 | NEW | MAIN | The first charge counters each turn exile the top card to play that turn. Ultron never needs to tap, so stationing with him is about a card a turn for a one-time {3}. Displaces Hangarback Walker. See Proposed swaps |
| 35 | U.S.S. Stargazer, Here and There | 3 | NEW | NO | A legendary beater that needs 6 station before it attacks with a temporary 4/3 |
| 36 | Class-4 Tactical Cube | 4 | NEW | NO | Near-miss. Two 1/1 Borg on entry (two more on Ultron's copy), and 7 station gives flying and *"Artifact creatures you control get +1/+1"*. Myr Battlesphere does the go-wide job, and Bombs is over its target. See Near-misses |
| 37 | Door of Destinies | 4 | REPRINT | NO | It counts spells cast of the chosen type. Ultron's tokens are Robots, but few Robot spells get cast, and Machine Overlord already pumps them |
| 38 | Hedron Archive | 4 | REPRINT | IN | Already in main |
| 39 | K'Vort-Class Raider | 4 | NEW | NO | Hexproof only during your turn, when sorcery-speed wipes don't happen |
| 40 | Queen's Diamond | 4 | NEW | NO | Its mana only casts the commander, a {3} spell |
| 41 | Reconnaissance Partition | 4 | NEW | NO | A 3/3 Borg with two uses of land-or-card, a turn late. Ultron's copy gets two counters too (CR 614.12, zone-009), but that's slow card flow for {4} |
| 42 | Stonespeaker Crystal | 4 | REPRINT | NO | Hedron Archive's slot with one card instead of two, plus graveyard exile |
| 43 | The Sword of Kahless | 4 | NEW | NO | A Klingon and Warrior payoff |
| 44 | Unwinding Clock | 4 | REPRINT | IN | Already in main |
| 45 | Alhammarret's Archive | 5 | REPRINT | NO | Reviewed today: it does nothing alone at 5, and its Ultron copy dies to the legend rule. Grounds unchanged |
| 46 | Forsaken Monument | 5 | REPRINT | IN | Already in main |
| 47 | Sickbay | 5 | NEW | NO | +1/+1 counters on one creature each combat. Voltron |
| 48 | Starship Enterprise | 5 | NEW | NO | Needs 16 station (four landfalls) before its combat-damage draw |
| 49 | U.S.S. Cerritos, Following Up | 5 | NEW | NO | Its Officer tokens are red, so our own All Is Dust and Ugin, the Spirit Dragon sweep them, and the body needs 6 station |
| 50 | U.S.S. Enterprise-C, Time-Tossed | 5 | NEW | NO | A wheel on entry and death, which is card-neutral. Its Ultron copy meets the legend rule |
| 51 | U.S.S. Prometheus, Prototype | 5 | NEW | NO | A beater whose damage spread needs 8 station |
| 52 | Command Chair | 6 | NEW | NO | Enters tapped for three coloured mana (X = Ultron's MV of 3, the same). Gilded Lotus is that mana for one less, untapped |
| 53 | The Immortal Sun | 6 | REPRINT | NO | Trap. *"Players can't activate planeswalkers' loyalty abilities"* switches off all three Ugins and Tezzeret |
| 54 | U.S.S. Defiant, Tough Little Ship | 6 | NEW | NO | A copyable ETB that destroys an artifact or enchantment. Meteor Golem hits any nonland permanent |
| 55 | U.S.S. Farragut, Bold Explorer | 6 | NEW | NO | Landfall cheats a creature in for one turn, and it needs 7 station |
| 56 | The Holodeck | 7 | NEW | NO | *"From outside the game"* is blank (CR 903.11). The graveyard half replays one permanent a turn at full cost on a legendary 7-drop. The Guardian of Forever is the cheaper recursion |
| 57 | Crystalline Entity | 8 | NEW | NO | Near-miss. It destroys all nonartifact creatures, but only when cast, so Gateway, Ultron's copy and Echoes' copy (not cast, CR 707.10) all skip it. It kills our Omnath and Glaring Fleshraker. See Near-misses |
| 58 | Planet Killer | 8 | NEW | NO | A 9/9 flying indestructible Construct with no ETB that must attack each combat. Metalwork Colossus's founding grounds apply (a {2} copy is a body with nothing attached), and Krang already gives the team flying and indestructible |
| 59 | Deep Space 9 | 9 | NEW | MAIN | ETB and each upkeep: exile the top four and put every permanent onto the battlefield. 96 of the 99 are permanents, and each artifact is an Ultron trigger. Displaces The Ten Rings. See Proposed swaps |

### Land

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 60 | Command Beacon | 0 | REPRINT | IN | Already in main |
| 61 | Command Tower | 0 | REPRINT | NO | Trap. Taps for nothing under a colourless commander |
| 62 | Evolving Wilds | 0 | REPRINT | NO | A tapped Wastes. Omnath (on trial) would turn it into two landfalls, but only while Omnath is out |
| 63 | Exotic Orchard | 0 | REPRINT | NO | Coloured mana only, which can't pay the `{C}` pips |
| 64 | Fabled Passage | 0 | REPRINT | NO | The FRA grounds (*"nothing here rewards landfall"*) no longer hold: Omnath, on trial, makes its two landfalls four mana. It's still a Wastes that enters tapped until four lands are out. Revisit if Omnath stays |
| 65 | Mutavault | 0 | REPRINT | NO | All creature types makes it a Robot and a Construct (Machine Overlord +2/+2), but an attacking land isn't the plan, and the 2026-09-28 pass kept the Wastes for Extraplanar Lens |
| 66 | Path of Ancestry | 0 | REPRINT | NO | Trap. Enters tapped and taps for nothing under a colourless commander |
| 67 | Reliquary Tower | 0 | REPRINT | NO | The Ten Rings covers hand size today (zone-012). If Deep Space 9 replaces it, Thought Vessel's bench row covers hand size without costing a Wastes |
| 68 | Rogue's Passage | 0 | REPRINT | NO | Cut 2026-09-28 because its {4} was rarely paid and Blightsteel already tramples. Unchanged |
| 69 | Spire of Industry | 0 | REPRINT | NO | A nonbasic Wastes (Extraplanar Lens and Solemn want the basic), and its colours aren't needed |
| 70 | Starfleet Academy | 0 | NEW | NO | Federation `{5},{T}` returns coloured mana equal to the creature types among non-Borg creatures, about break-even midgame. The Wastes slot is worth more to Extraplanar Lens |
| 71 | Temple of the False God | 0 | REPRINT | NO | Passed 2026-09-28 as a blank before five lands in a turn-3-commander deck. Unchanged |
| 72 | Terramorphic Expanse | 0 | REPRINT | NO | Same as Evolving Wilds |
| 73 | Unexplored Territory | 0 | NEW | NO | Taps for `{C}`, or `{1}` and itself become a tapped basic. That gains no land, only an Omnath landfall |

---

## Proposed swaps

### 1. Replicator in, Sculpting Steel out

**In:** [Replicator](https://scryfall.com/search?q=%21%22Replicator%22) `{2}`, Artifact (TRK, new, not
a Game Changer). *"When this artifact enters, create a Food token. {2}, {T}: Create a tapped token
that's a copy of target token you control."*

**Out:** [Sculpting Steel](https://scryfall.com/search?q=%21%22Sculpting+Steel%22) `{3}`, Artifact.
*"You may have this artifact enter as a copy of any artifact on the battlefield."*

**Deciding axis: repeatability.** The copy role was ranked on permanence on 2026-09-04, and Steel
copies once while Replicator copies every untap.

**Grounds:**

- [Ultron, Artificial Malevolence](https://scryfall.com/search?q=%21%22Ultron%2C+Artificial+Malevolence%22)
  turns every nontoken artifact into a token, so Replicator always has the best artifact on the
  board as a target. The price is a flat {2} whatever the token's mana value.
  [Prototype Portal](https://scryfall.com/search?q=%21%22Prototype+Portal%22) pays `{X}` equal to the
  mana value, so {9} for a [Portal to Phyrexia](https://scryfall.com/search?q=%21%22Portal+to+Phyrexia%22),
  where Replicator pays {2}.
- Targets by the turn they're realistically copied (ledger eval-034):
  - Turns 4 and 5: Ultron's token [Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22),
    [Thran Dynamo](https://scryfall.com/search?q=%21%22Thran+Dynamo%22) or
    [Gilded Lotus](https://scryfall.com/search?q=%21%22Gilded+Lotus%22). Each {2} is a permanent rock
    worth two or three mana, so it pays for itself the next turn.
  - Later: token [Meteor Golem](https://scryfall.com/search?q=%21%22Meteor+Golem%22) (destroy a nonland
    permanent), token Portal to Phyrexia (each opponent sacrifices three creatures), token
    [Myr Battlesphere](https://scryfall.com/search?q=%21%22Myr+Battlesphere%22) (four Myr), token
    [The Mightstone and Weakstone](https://scryfall.com/search?q=%21%22The+Mightstone+and+Weakstone%22)
    (draw two), token [Wurmcoil Engine](https://scryfall.com/search?q=%21%22Wurmcoil+Engine%22), token
    [Platinum Angel](https://scryfall.com/search?q=%21%22Platinum+Angel%22).
- [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) untaps it on each
  opponent's untap step, so it copies four times a turn cycle. Tezzeret's 0 adds a fifth.
- Ultron copies Replicator itself for {2}. The token Replicator can't use its `{T}` until your next
  turn (CR 302.6), and [Marvin, Murderous Mimic](https://scryfall.com/search?q=%21%22Marvin%2C+Murderous+Mimic%22)
  borrows the token's ability.
- Every token it makes gets its ETB doubled by
  [Panharmonicon](https://scryfall.com/search?q=%21%22Panharmonicon%22), and is a [Glaring Fleshraker](https://scryfall.com/search?q=%21%22Glaring+Fleshraker%22) ping when it's a
  creature, an [Idol of Oblivion](https://scryfall.com/search?q=%21%22Idol+of+Oblivion%22) turn-on and
  a Tezzeret loyalty counter.
- **Cost-out:** `{2}` artifact, so Inspector, Cloud Key, Jhoira's Familiar (artifacts are historic),
  Anvil and Ugin all apply, and two of them make it free. Workshop mana pays for it.

**Rules notes:**

- The copy is a token, so it never triggers Ultron or
  [Mirrorworks](https://scryfall.com/search?q=%21%22Mirrorworks%22) (both read *"nontoken"*, ledger
  zone-008).
- Copies enter tapped, so a rock copy taps from your next untap step.
- **Not verified:** whether Replicator's copy of a noncreature Ultron token is also a 2/2 Robot
  Villain. CR 707.2 doesn't copy type-changing effects, and Ultron's clause is a separate "becomes"
  sentence rather than an "except" exception (CR 707.9b), which reads as not copied. The verdict
  doesn't depend on it, since only summoning sickness on copies made during opponents' turns differs.
  Worth a one-line `mtg-rules-expert` check before the gameplan records it.

**Self-hits (§1.3):** nothing in the list turns it off, and it only copies your own tokens.

**Loop audit:** Replicator untaps nothing, and its copies enter tapped. Each untapper in the list
fires a fixed number of times (Unwinding Clock once per opponent's untap step, Tezzeret's 0 once a
turn, Deserted Temple only lands). Replicators copying token Replicators grow over turns at {2}
each, but nothing repeats inside one step. No loop.

**The copy role ranked (§2.1 step 4):**

| Card | MV | What one use buys | Repeats | The card itself triggers Ultron | Notes |
|---|---|---|---|---|---|
| Mirrorworks | 5 | a second {2} copy of every nontoken artifact | every artifact | yes | Panharmonicon and Echoes double it |
| Roaming Throne | 4 | an extra Ultron trigger per artifact | every artifact | yes | 4/4 ward 2 |
| Panharmonicon | 4 | an extra Ultron trigger and every ETB doubled | every artifact | yes | |
| Echoes of Eternity | 6 | a copy of every colourless spell, triggers doubled | every spell | no (not an artifact) | |
| **Replicator** | 2 | a token copy of any token for {2} | every untap, four a cycle with Clock | yes | needs a token on the board |
| Prototype Portal | 4 | a token of the imprinted card for `{X}` = its MV | every untap | yes | needs an artifact from hand, and works without Ultron |
| Mirror Box | 3 | legend rule off, +1/+1 per same-named creature | static | yes | makes legendary copies stay |
| **Sculpting Steel** | 3 | one copy of any artifact | once | yes, so the target ends up three times for {5} | can copy an opponent's artifact |

**Why Steel:** it's the only one-shot engine in the role. Replicator matches its output by the
second activation and keeps going. **Cost named:** Steel is a card entering, so it triggers Ultron
and Mirrorworks itself, it works with no token on the board, and it can copy an opponent's
artifact. Replicator needs Ultron (or another token maker) to have acted first.

**Other cuts considered:** Prototype Portal (repeatable and independent of Ultron, so keep it),
Palladium Myr (swap 2's cut), Hangarback Walker (swap 3's cut). No incoming card feeds Steel beyond
what it feeds any artifact.

**Curve:** average MV 4.712 → 4.697. MV ≤ 2 10 → 11. MV ≤ 3 23 → 23. MV 7+ unchanged at 16.

### 2. The Guardian of Forever in, Palladium Myr out

**In:** [The Guardian of Forever](https://scryfall.com/search?q=%21%22The+Guardian+of+Forever%22)
`{3}`, `Legendary Artifact Creature — Construct` 0/6 (TRC, new, not a Game Changer). *"Defender. {4},
Sacrifice another nontoken creature: Return that card to the battlefield under its owner's control
at the beginning of the next end step."*

**Out:** [Palladium Myr](https://scryfall.com/search?q=%21%22Palladium+Myr%22) `{3}`, `Artifact
Creature — Myr` 2/2. *"{T}: Add {C}{C}."*

**Deciding axis: keeping the engine alive.** Protection & Recursion is at 3 against its founding
target of 4, and Ramp is at 13 against 12, so the slot moves from the over-full role to the short
one.

**Grounds:**

- **Protection.** The ability has no `{T}`, so it works the turn Guardian lands and as often as you
  have {4} and a creature. In response to removal or a wipe, sacrifice Ultron. Moving a commander to
  the command zone is optional (CR 903.9a), so leave him in the graveyard and he returns at the
  beginning of the next end step. He isn't cast, so commander tax doesn't rise. This answers exile,
  destroy, bounce, −X/−X and theft, the cases [Darksteel Forge](https://scryfall.com/search?q=%21%22Darksteel+Forge%22)
  (destroy only), [Cryptothrall](https://scryfall.com/search?q=%21%22Cryptothrall%22) (targeted only)
  and [Commander's Plate](https://scryfall.com/search?q=%21%22Commander%27s+Plate%22) (coloured only)
  leave open. The same save works for [Memnarch, the Warden](https://scryfall.com/search?q=%21%22Memnarch%2C+the+Warden%22),
  [Krang, Utrom Warlord](https://scryfall.com/search?q=%21%22Krang%2C+Utrom+Warlord%22) and Platinum
  Angel.
- **Value.** Every return is a nontoken artifact entering, so it's an Ultron trigger, a Tezzeret
  loyalty counter and a Panharmonicon-doubled ETB. The re-buys in the list:
  - Meteor Golem: destroy a nonland permanent every turn for {4}, and {2} more for the token's
    second destroy.
  - Myr Battlesphere: four Myr, eight with the copy.
  - [Duplicant](https://scryfall.com/search?q=%21%22Duplicant%22): exile another nontoken creature.
  - [Solemn Simulacrum](https://scryfall.com/search?q=%21%22Solemn+Simulacrum%22): it draws when
    sacrificed and fetches a basic when it returns (an Omnath landfall).
  - Wurmcoil Engine: two Wurm tokens on death, and Wurmcoil comes back.
  - Memnarch: two Myr.
- **Cost-out:** `{3}` artifact creature, so every reducer applies, including Jhoira's Familiar and
  Mycosynth Golem's affinity. Thran Temporal Gateway deploys it.
- It's a Construct, so [Ultron, Machine Overlord](https://scryfall.com/search?q=%21%22Ultron%2C+Machine+Overlord%22)
  makes it a 2/8, and with [Forsaken Monument](https://scryfall.com/search?q=%21%22Forsaken+Monument%22)
  too a 4/10 wall.

**Rules notes:**

- *"Another nontoken creature"* means Ultron's token copies can't be sacrificed to it.
- If the card leaves the graveyard before the end step (graveyard exile, or you move Ultron to the
  command zone), it doesn't return (CR 603.7c).
  [Blightsteel Colossus](https://scryfall.com/search?q=%21%22Blightsteel+Colossus%22) shuffles itself
  into the library instead of reaching the graveyard, so Guardian can't save it.
- A returned card is a new object. Commander's Plate falls off, counters are gone, and a returned
  [Walking Ballista](https://scryfall.com/search?q=%21%22Walking+Ballista%22) or Hangarback Walker is
  a 0/0 unless Machine Overlord or Forsaken Monument is out.
- It's legendary, so Ultron's copy meets the legend rule without Mirror Box. Don't pay the {2}.

**Loop audit:** returns wait for the end step, so nothing comes back in the step it left, and a
creature sacrificed during the end step returns a turn later (ledger loop-006 lists end-step
returners as safe). Each use costs {4}. No loop.

**The ramp role ranked (§2.1 step 4):**

| Card | MV | Mana | Ultron copy | Dies to a creature wipe | Notes |
|---|---|---|---|---|---|
| Sol Ring | 1 | +2 | 2/2 that taps for two | no | |
| Mox Opal | 0 | +1 any colour (metalcraft) | legendary | no | |
| Mind Stone | 2 | +1, or sacrifice to draw | yes | no | |
| Worn Powerstone | 3 | +2, enters tapped | yes | no | |
| Extraplanar Lens | 3 | doubles Wastes or Tower | yes | no | |
| Tezzeret, Cruel Captain | 3 | 0: untap Lotus or Dynamo for +3 | no (planeswalker) | no | trial since today |
| **Palladium Myr** | 3 | +2, summoning-sick on arrival | yes | **yes** | the only fixed-output rock that's a creature |
| Thran Dynamo | 4 | +3 | yes | no | |
| Hedron Archive | 4 | +2, or sacrifice to draw two | yes | no | declined as a cut 2026-09-09 and 09-10 |
| Arc Reactor | 5 (improvise) | +3, enters tapped | yes | no | |
| Gilded Lotus | 5 | +3 of one colour | yes | no | |
| The Mightstone and Weakstone | 5 | +2 artifact-only, ETB draw two or −5/−5 | yes | no | |
| Karn, Legacy Reforged | 5 | +1 per artifact, artifact-only | legendary | yes | scales with the board |

**Why Palladium Myr:** this was the recommended cut for Tezzeret this morning, on the 2026-09-30
grounds that it's a rock that dies to wipes, and the pilot chose Thought Vessel instead. Re-derived:
it's still the only fixed-output rock that's a creature, so it can't tap the turn it lands and every
creature wipe takes it. Mana sources go 47 → 46.

**Costs named:** Myr Battlesphere's attack taps untapped Myr, and Palladium Myr is one. The bench
rows for [Karn, the Great Creator](https://scryfall.com/search?q=%21%22Karn%2C+the+Great+Creator%22)
and [Myr Retriever](https://scryfall.com/search?q=%21%22Myr+Retriever%22) both name it and need a new
displacement.

**Other cuts considered:** Solemn Simulacrum (on the 2026-09-10, 09-16 and 09-30 cut tables) is
**not** recommended here, because Guardian feeds both its triggers (ledger eval-011). Hedron Archive
was declined twice.

**Curve:** unchanged, a 3 for a 3 (4.712, MV ≤ 2 10, MV ≤ 3 23, MV 7+ 16).

### 3. U.S.S. Enterprise-D, Galaxy-Class in, Hangarback Walker out

**In:** [U.S.S. Enterprise-D, Galaxy-Class](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-D%2C+Galaxy-Class%22)
`{3}`, `Legendary Artifact — Spacecraft`, 4/5 at 7+ (TRK, new, not a Game Changer). *"Whenever one or
more charge counters are put on U.S.S. Enterprise-D for the first time each turn, exile the top card
of your library. You may play that card this turn. Station (Tap another creature you control: Put
charge counters equal to its power on this Spacecraft. Station only as a sorcery. It's an artifact
creature at 7+.) 7+ | Flying, vigilance"*

**Out:** [Hangarback Walker](https://scryfall.com/search?q=%21%22Hangarback+Walker%22) `{X}{X}`,
`Artifact Creature — Construct` 0/0. *"This creature enters with X +1/+1 counters on it. When this
creature dies, create a 1/1 colorless Thopter artifact creature token with flying for each +1/+1
counter on this creature. {1}, {T}: Put a +1/+1 counter on this creature."*

**Deciding axis: card flow.** Card Draw is at 7 against the pilot's aim of 8 to 10, and Bombs & ETB
is at 10 against its target of 9.

**Grounds:**

- **Ultron is the station fuel.** He's a 2/4 who never needs to tap, since his trigger isn't a tap
  ability. Tapping him in your first main phase puts two counters on (four under Machine Overlord,
  because Ultron is a Robot) and exiles a card to play. After the one-time {3}, each card costs no
  mana.
- Ultron's fresh token rocks can't tap for mana the turn they arrive (ledger tap-007), but they can
  station (CR 702.184a taps them as a cost of the Spacecraft's ability, and 302.6 restricts only
  their own `{T}`). So the turn's new copies are free fuel too.
- [Echoes of Eternity](https://scryfall.com/search?q=%21%22Echoes+of+Eternity%22) doubles its trigger
  (it's a colourless permanent), so that's two cards a turn.
- After four stations from Ultron it reaches 7 counters and becomes a 4/5 flying, vigilance
  artifact creature (6/7 under Forsaken Monument).
- **Cost-out:** `{3}` legendary artifact, so every reducer applies and two make it free. Workshop
  mana pays for it.

**The impulse cost:** the card has to be played that turn. Station before your land drop so a land
hit is playable. A big card you can't afford that turn is lost, so expect a bit under one card a
turn, and only on your own turn (station is sorcery-speed).

**Self-hits (§1.3):** none. It's legendary, so don't pay Ultron's {2} for it unless Mirror Box is
out (then the Robot token is a second engine that Roaming Throne doubles).

**The draw role ranked (§2.1 step 4), with swap 4 applied:**

| Card | MV | Cards per turn cycle | Needs (in deck?) | Mana per card |
|---|---|---|---|---|
| The One Ring | 4 | 1, then 2, then 3 | nothing | 0 |
| [Mind's Eye](https://scryfall.com/search?q=%21%22Mind%27s+Eye%22) | 5 | 3 or more | opponents' draws, Unwinding Clock (yes) | {1} |
| Idol of Oblivion | 2 | up to 4 with Clock | a token that turn (yes) | 0 |
| [Chimil, the Inner Sun](https://scryfall.com/search?q=%21%22Chimil%2C+the+Inner+Sun%22) | 6 | 1, often a free cast | nothing | 0 |
| [Iron Spider, Stark Upgrade](https://scryfall.com/search?q=%21%22Iron+Spider%2C+Stark+Upgrade%22) | 3 | one per {2} and two counters | +1/+1 counters (yes) | {2} |
| Memnarch, the Warden | 10 | one per artifact, per attack | attacking | 0 |
| Deep Space 9 (swap 4) | 9 | about four permanents onto the battlefield | nothing | 0 |
| **U.S.S. Enterprise-D** | 3 | about one on your turn, two under Echoes | a creature with power ≥ 1 (Ultron, yes) | 0 |

**The Bombs & ETB role ranked (§2.1 step 4):**

| Card | MV | Job | Pay Ultron's {2}? | Fed by this package? |
|---|---|---|---|---|
| Blightsteel Colossus | 12 | infect finisher, Forgemaster and Sanctum target | yes | no |
| Mycosynth Golem | 11 | affinity for every artifact creature | yes | no (the pilot kept it 2026-09-08) |
| Portal to Phyrexia | 9 | triple edict and reanimation | yes | Replicator copies its token |
| Myr Battlesphere | 7 | 4/7 and four Myr | yes | Guardian and Replicator |
| Platinum Angel | 7 | the lock (pilot's pick 2026-09-12) | yes | Replicator |
| Wurmcoil Engine | 6 | resilient body | yes | Guardian and Replicator |
| Kuldotha Forgemaster | 5 | sacrifice three for Blightsteel | yes | no |
| Solemn Simulacrum | 4 | land and a card | yes | Guardian feeds both triggers |
| Walking Ballista | X | X sink, pings, the Monument kill line | never, unless an anthem is out | no |
| **Hangarback Walker** | X | {1}-per-counter sink, Thopters | never, unless an anthem is out | Deep Space 9 puts it in as a 0/0 |

**Why Hangarback Walker:** its 2026-09-16 verdict was "medium", a surplus-mana outlet rather than a
copy card. Re-derived against the list after the package:

- This package adds two better outlets for the same mana. Replicator's {2} buys a permanent token
  copy, and Guardian's {4} re-buys an ETB. A better sink re-prices the ones already in the list
  (ledger eval-009), and a {1} +1/+1 counter is now the weakest use of spare mana.
- Six cards in the list put it in as a 0/0 that dies without an anthem: Ultron, Mirrorworks, Thran
  Temporal Gateway, Kuldotha Forgemaster, Prototype Portal and a Chimil discover, plus Sculpting Steel
  while it stays. Deep Space 9 would add another.
- The pilot added it *"to see if I regret it"*. No verdict is recorded yet, so this is the pilot's
  call.

**Costs named:** MV ≤ 2 drops 10 → 9 at its printed MV of 0, though its real cast is {2} to {6}
(X of 1 to 3). Its death Thopters feed Glaring Fleshraker and Idol of Oblivion. Guardian could
sacrifice it to cash in Thopters, a line this swap gives up. Scrap Trawler's bench row names it.

**Other cuts considered:** Walking Ballista (the Monument kill line and the pings, keep), Solemn
Simulacrum (fed by Guardian), Kuldotha Forgemaster (the Blightsteel line).

**Curve:** average MV 4.712 → 4.758. MV ≤ 2 10 → 9. MV ≤ 3 23 → 23. MV 7+ unchanged at 16.

### 4. Deep Space 9 in, The Ten Rings out

**In:** [Deep Space 9](https://scryfall.com/search?q=%21%22Deep+Space+9%22) `{9}`, `Legendary Artifact
— Spacecraft`, no power/toughness box (TRK, new, not a Game Changer). *"When Deep Space 9 enters and
at the beginning of your upkeep, exile the top four cards of your library. Put all permanent cards
exiled this way onto the battlefield. Station (…) 9+ | Creatures you control get +3/+3."*

**Out:** [The Ten Rings](https://scryfall.com/search?q=%21%22The+Ten+Rings%22) `{8}`, Legendary
Artifact. *"Your maximum hand size is ten. At the beginning of your end step, if you have fewer than
ten cards in hand, draw cards equal to the difference."*

**Deciding axis: card flow per mana.** Deep Space 9's cards arrive on the battlefield for nothing.
The Ten Rings' cards arrive in hand, and each still costs mana in a list whose average MV is 4.7.

**Grounds:**

- 96 of the 99 are permanent cards. Only [All Is Dust](https://scryfall.com/search?q=%21%22All+Is+Dust%22),
  [Eldrazi Confluence](https://scryfall.com/search?q=%21%22Eldrazi+Confluence%22) and
  [Kozilek's Command](https://scryfall.com/search?q=%21%22Kozilek%27s+Command%22) aren't. So each
  trigger puts about four permanents onto the battlefield, roughly 1.4 lands and 2.5 nonland
  permanents.
- It triggers on entry, so the turn it lands already pays out four, then four more every upkeep.
- Each nontoken artifact it puts in is an Ultron trigger ({2} each), a Mirrorworks trigger and a
  Tezzeret loyalty counter. Each land is an Omnath landfall and adds mana that upkeep (Power Depot
  and a Vesuva copy aside, they enter untapped).
- Echoes of Eternity doubles both of its triggers (a colourless permanent), so eight per upkeep.
  Panharmonicon doubles the entry trigger (an artifact entering).
- Ultron copies it for {2}. The token's entry trigger fires before the legend rule removes one of the
  two (CR 603.6a, 704.5j), and it resolves anyway (CR 113.7a). That's four more permanents for {2}.
- The Ten Rings doesn't scale this way. Its Ultron copy dies to the legend rule, and a second
  instance from Echoes draws nothing, because the first refills to ten and the second's "fewer than
  ten" check fails (CR 603.4).
- **Cost-out:** `{9}`, an artifact and legendary, so Inspector, Cloud Key, Jhoira's Familiar, Anvil
  and Ugin take it to a floor of {2}. It isn't a creature, so Mycosynth Golem's affinity doesn't
  apply. Thran Temporal Gateway puts it in for `{4}` at instant speed, and the entry trigger still
  fires, because it says "enters", not "if you cast it". A hard cast fires
  [Sanctum of Ugin](https://scryfall.com/search?q=%21%22Sanctum+of+Ugin%22), and it's an
  [Ugin's Labyrinth](https://scryfall.com/search?q=%21%22Ugin%27s+Labyrinth%22) imprint. Workshop and
  Karn mana pay for it.
- It never becomes a creature (CR 721.2a), so creature wipes and creature removal miss it. Nine
  station (one tap from Krang) gives the team +3/+3.

**Self-hits (§1.3):**

- **The trigger is mandatory.** It mills four a turn, eight under Echoes, on top of Memnarch's
  mandatory attack draw, The One Ring and Mind's Eye. Count the library. With Mirror Box out, keeping
  both the card and Ultron's token doubles the mill again, so keep one unless the game ends that
  turn.
- Walking Ballista and Hangarback Walker enter as 0/0 and die unless Machine Overlord or Forsaken
  Monument is out (both are Constructs). The three non-permanents it exiles are lost.
- [Cityscape Leveler](https://scryfall.com/search?q=%21%22Cityscape+Leveler%22)'s and
  [Ugin, Eye of the Storms](https://scryfall.com/search?q=%21%22Ugin%2C+Eye+of+the+Storms%22)' cast
  triggers don't fire, because they're put onto the battlefield, not cast.
- **Hand size.** The Ten Rings sets the maximum to ten, and Thought Vessel left today, so without
  the Rings it's seven. Deep Space 9 doesn't fill the hand, which shrinks the problem, and Thought
  Vessel's bench row is the answer if it bites.

**How the draw count reads:** if Deep Space 9 counts as card flow the way Chimil's discover does,
Card Draw stays at 7 with this swap and reaches 8 with swap 3. If the pilot counts only draws to
hand, it drops to 6, and 7 with swap 3. That's for the pilot to call.

**The MV 7+ group ranked (§2.1 step 4):** the swap keeps the group at 16, so the cut comes from it.

| Card | MV | Job | Cut for Deep Space 9? |
|---|---|---|---|
| Blightsteel Colossus | 12 | infect finisher | no |
| Mycosynth Golem | 11 | affinity engine, kept by the pilot 2026-09-08 | no |
| Memnarch, the Warden | 10 | draw per artifact on attack | no |
| Krang, Utrom Warlord | 9 | team flying, trample, indestructible, haste | no |
| Portal to Phyrexia | 9 | triple edict and reanimation | no |
| Darksteel Forge | 9 | the anti-wipe piece | no |
| **The Ten Rings** | 8 | refill to ten at end step | **yes**: the same kind of slot (an 8 or 9 mana legendary card-flow artifact whose Ultron copy is worthless), and Deep Space 9 beats it on mana per card |
| Cityscape Leveler | 8 | removal on cast and each attack | no, offered and declined as a cut this morning |
| Ugin, the Spirit Dragon | 8 | one-sided wipe, repeatable 3 damage | no, trial since today |
| All Is Dust | 7 | one-sided wipe | no |
| Meteor Golem | 7 | copyable removal | no |
| Ugin, Eye of the Storms | 7 | exile per colourless spell | no |
| [Cybermen Squadron](https://scryfall.com/search?q=%21%22Cybermen+Squadron%22) | 7 | myriad finisher | second-best cut, not recommended, because Deep Space 9's +3/+3 isn't evasion |
| Myr Battlesphere | 7 | the best copy target in the deck | no |
| Platinum Angel | 7 | the lock, pilot's pick 2026-09-12 | no |
| Omnath, Locus of the Void | 7 | mana bank | no, trial since 2026-09-30 |

**The Ten Rings' records, re-derived:** the 2026-09-04 pass ranked it third in the draw role, and
the FRA review kept it over Memnarch because *"it draws every turn without attacking"*. Deep Space 9
also works every turn without attacking, and its cards need no mana. No incoming card feeds The Ten
Rings.

**Curve:** average MV 4.712 → 4.727. MV ≤ 2 and MV ≤ 3 unchanged (10, 23). MV 7+ unchanged at 16.

---

## Bench

### Skullclamp: displaces Hangarback Walker (the alternative to swap 3)

[Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) `{1}`, `Artifact — Equipment` (TRC
reprint, not a Game Changer). *"Equipped creature gets +1/-1. Whenever equipped creature dies, draw
two cards. Equip {1}"*

- **History:** it was in the founding build and left on 2026-09-04 for The Vision (which itself left
  on 2026-09-08). The recorded ground was *"Skullclamp needed 1/1s that Steel Overseer's counters
  outgrow."*
- **Re-derived:** that's true of Myr and Thopters, which are artifact creatures, so Steel Overseer,
  Iron Spider and Forsaken Monument all grow them past dying (ledger equip-027). It's false of
  Eldrazi Spawn and Scions. They aren't artifacts, so Overseer and Iron Spider skip them, and they
  sacrifice themselves for `{C}`, so they die even when Monument makes them 2/3 (the sacrifice route,
  ledger eval-010).
- **The engine:** Glaring Fleshraker makes a Spawn for every colourless spell. Equip {1}, sacrifice
  the Spawn for `{C}`, and that's two cards for no net mana. Kozilek's Command (X Spawns), Eldrazi
  Confluence (Scions), Ultron's token Mind Stone and Hedron Archive (they sacrifice themselves, a turn
  after arriving) and Kuldotha Forgemaster's three sacrifices feed it too.
- MV 1, so [Urza's Saga](https://scryfall.com/search?q=%21%22Urza%27s+Saga%22)'s chapter III and
  Tezzeret's −3 both find it.
- **Why second:** without Fleshraker or a Spawn maker on the board it's often dead, and Monument
  turns off the Myr and Thopter half. Enterprise-D draws every turn with nothing else out. If the
  pilot prefers the higher ceiling, Skullclamp takes the slot instead (average MV 4.712 → 4.727,
  MV ≤ 2 stays 10).
- Ultron's copy is a creature that can't equip (CR 301.5c), so never pay for it.

### Thought Vessel: displaces Tezzeret, Cruel Captain (row unchanged)

The pilot cut it today, and its bench row stands. If Deep Space 9 replaces The Ten Rings, its *"You
have no maximum hand size"* becomes the deck's only hand-size relief, which makes the row more
likely to be used.

---

## Near-misses and traps

### Near-misses

- [Jefferies Tube](https://scryfall.com/search?q=%21%22Jefferies+Tube%22) `{1}`:
  - **The line:** *"{4}, {T}: Draw a card. You may put a land card from your hand onto the
    battlefield tapped."* Unwinding Clock untaps it on each opponent's turn (four cards a cycle for
    {16}), the land is an Omnath landfall, MV 1 puts it in reach of Urza's Saga and Tezzeret's −3, and
    *"{3}, {T}: Target creature can't be blocked this turn"* works on Blightsteel.
  - **Why not:** four mana a card competes with Ultron's {2}, the 2026-09-28 manabase principle, and
    Mind's Eye is already the {1}-a-card sink.
  - **Cute line:** its *"{2}, {T}: Put two charge counters on target artifact"* triggers Enterprise-D
    at instant speed on an opponent's turn, and [Liberator, Urza's Battlethopter](https://scryfall.com/search?q=%21%22Liberator%2C+Urza%27s+Battlethopter%22)
    lets you cast the exiled artifact right there.
- [U.S.S. Defiant, Mirror Migrant](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Mirror+Migrant%22)
  `{2}`: flash, and *"it and up to one target creature you control phase out"* saves Ultron from a
  wipe. Ultron's copy (another {2}) phases out a second creature. It's one-shot, then a Spacecraft
  that needs 8 station to do anything. The Guardian of Forever covers the same save repeatedly.
- [Class-4 Tactical Cube](https://scryfall.com/search?q=%21%22Class-4+Tactical+Cube%22) `{4}`: two
  1/1 Borg on entry, two more from Ultron's copy, doubled by Panharmonicon. At 7 station it gives
  *"Artifact creatures you control get +1/+1"*, and the token copy can be stationed for a second
  anthem. Myr Battlesphere's four Myr and a 4/7 cost one more mana, and Bombs is already over target.
- [Crystalline Entity](https://scryfall.com/search?q=%21%22Crystalline+Entity%22) `{8}`: *"When this
  creature enters, if you cast it, destroy all nonartifact creatures."* Every Ultron token is an
  artifact, so it's close to one-sided, and it's the one card here that answers colourless Eldrazi
  creatures, which All Is Dust and both wiping Ugins skip. Only the cast fires it, though, and it
  kills our Omnath and Glaring Fleshraker.
- [Howling Mine](https://scryfall.com/search?q=%21%22Howling+Mine%22) (cute line): each opponent's
  extra card is a Mind's Eye trigger, so you draw one plus three more for {3} a cycle, and Ultron's
  Robot copy of Mind's Eye with Roaming Throne multiplies that. It's still symmetric, and the
  group-hug grounds stand.

### Traps

- [The Immortal Sun](https://scryfall.com/search?q=%21%22The+Immortal+Sun%22): the cost reduction
  and the anthem read like an upgrade, but *"Players can't activate planeswalkers' loyalty
  abilities"* switches off Ugin, the Ineffable, Ugin, Eye of the Storms, Ugin, the Spirit Dragon and
  Tezzeret.
- [Isolinear Processor](https://scryfall.com/search?q=%21%22Isolinear+Processor%22): it looks like
  the 2-mana rock the deck lost today, but its mana can't pay Ultron's {2}, which is paid while a
  triggered ability resolves rather than to cast a spell or activate an ability (CR 113.3c).
- [Engineered Explosives](https://scryfall.com/search?q=%21%22Engineered+Explosives%22): the easy
  cast is zero counters, which destroys every MV 0 permanent we have (Myr, Spawn, Thopter and Food
  tokens, Walking Ballista, Hangarback Walker).
- [Starfleet Communicator](https://scryfall.com/search?q=%21%22Starfleet+Communicator%22): it reads
  as a draw engine, but it draws only for equipped attackers, X is the other Communicator-equipped
  creatures, equip is sorcery-speed, and Ultron's copy is a creature that can't equip.
- [Arcane Signet](https://scryfall.com/search?q=%21%22Arcane+Signet%22),
  [Commander's Sphere](https://scryfall.com/search?q=%21%22Commander%27s+Sphere%22),
  [Command Tower](https://scryfall.com/search?q=%21%22Command+Tower%22) and
  [Path of Ancestry](https://scryfall.com/search?q=%21%22Path+of+Ancestry%22): *"any color in your
  commander's color identity"* names nothing under a colourless commander.
- [U.S.S. Cerritos, Following Up](https://scryfall.com/search?q=%21%22U.S.S.+Cerritos%2C+Following+Up%22):
  its Officer tokens are red, so our own All Is Dust and Ugin, the Spirit Dragon wipe them.
- [Everflowing Chalice](https://scryfall.com/search?q=%21%22Everflowing+Chalice%22) and
  [Astral Cornucopia](https://scryfall.com/search?q=%21%22Astral+Cornucopia%22): Ultron's copy enters
  with zero counters and taps for nothing (zone-009).
- Paying Ultron's {2} for any Spacecraft other than Deep Space 9 buys a bare 2/2, and a legendary one
  meets the legend rule.
