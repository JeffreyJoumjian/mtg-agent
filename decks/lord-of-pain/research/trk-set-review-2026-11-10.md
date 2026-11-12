# TRK + TRC (Star Trek + Star Trek Commander) set review: The Lord of Pain, 2026-11-10

**Sets.** TRK (Star Trek, 311 cards) and TRC (Star Trek Commander, 336 cards). Both release
2026-11-13, and Scryfall already lists every card in both as Commander-legal.

**Lists.** The target is `main` (Bracket 4), the only list the pilot picked for this review, so the
classification table has one verdict column. `b3` is `main` minus the seven documented Game Changer
and combo swaps in `research/sideboard.md` (checked by diffing the two lists in `deck.json` today),
so each MAIN below says whether `b3` takes it too.

**Method.** `.claude/skills/set-review/reviewer.md` and deck-brain §1 and §2. Set cards' text comes
from the pool files (`data/trk-candidates-lord-of-pain.json`, `data/trc-candidates-lord-of-pain.json`),
the deck's own cards from the bundle's oracle dump, and rules from `rules/sections/` (CR 2026-08-07).
Every card was costed with [Jet Medallion](https://scryfall.com/search?q=%21%22Jet+Medallion%22)
(black spells cost {1} less), [Ruby Medallion](https://scryfall.com/search?q=%21%22Ruby+Medallion%22)
(red spells cost {1} less) and [Rakdos, Lord of Riots](https://scryfall.com/search?q=%21%22Rakdos%2C+Lord+of+Riots%22)
(creature spells cost {1} less per life opponents lost this turn, generic only), checked against
the deck's own board, and held to the two standing rules in `decks/_notes.md`:

1. Amplifiers must be opponent-restricted, because the gift engines
   ([Spiteful Visions](https://scryfall.com/search?q=%21%22Spiteful+Visions%22),
   [Descent into Avernus](https://scryfall.com/search?q=%21%22Descent+into+Avernus%22),
   [Manabarbs](https://scryfall.com/search?q=%21%22Manabarbs%22),
   [Seizan, Perverter of Truth](https://scryfall.com/search?q=%21%22Seizan%2C+Perverter+of+Truth%22))
   hit the pilot too.
2. No "players can't gain life" cards, because the deck lives on its own lifegain.

No card in either pool breaks rule 1 or rule 2: a grep of every pool card's text for "can't gain
life", "would deal" and "double that" found no symmetric amplifier and no lifegain hate.

Rules read for this review: CR 603.2d (an ability that triggers additional times), 603.3b (we order
our own simultaneous triggers), 611.2b ("for as long as" durations), 400.7 (a card that changes
zones is a new object), 302.6 (summoning sickness on {T} abilities), 113.7a (a trigger resolves
without its source), 704.5a and 117.5 (0 life loses at the next state-based check, before triggers
go on the stack), 903.9a (moving a commander to the command zone is optional), 118.3 and 118.12a.
Ledger entries used: trig-008 (end-step repeaters read each opponent's own gross loss, and a second
one sees the first one's loss), eval-028 (opponent-only amplifiers), eval-032 (trigger doublers),
eval-061 (an opponent's-choice punisher under our own gifts), eval-011 and tool-019 (grep the cut),
tool-017 (functional reprints). `bun run lookup` found no entry for Lwaxana Troi, Gul Dukat,
Georgiou, Ro Laren, Tal Shiar Analyst, Kai Winn or Bitter Triumph.

**EDHREC.** Neither set has data before release, so the field lens is skipped (§2.2).

**Game Changers.** Neither pool contains one. `main` stays at 9 (Ancient Tomb, Glacial Chasm, Grim
Monolith, Mana Vault, Mox Diamond, Jeska's Will, Demonic Tutor, Vampiric Tutor, Orcish Bowmasters)
before and after, and `b3` stays at 3 of 3.

## Pool

231 unique cards fit {B}{R} identity: 120 from TRK and 111 from TRC, with no card in both files.
171 are new (TRK 115, TRC 56) and 60 are reprints (TRK 5, TRC 55). 14 are already in `main`; `b3`
also runs Mind Stone and Thought Vessel, so 16 are in `b3`.

## Result

| List | MAIN | SIDE | IN (already in list) | NO |
|---|---|---|---|---|
| `main` | 2 | 4 | 14 | 211 |

- **MAIN:** [Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22)
  in, [Painful Quandary](https://scryfall.com/search?q=%21%22Painful+Quandary%22) out. `b3` takes it
  too, unchanged.
- **MAIN:** [Gul Dukat, Colonial Prefect](https://scryfall.com/search?q=%21%22Gul+Dukat%2C+Colonial+Prefect%22)
  in, [Wound Reflection](https://scryfall.com/search?q=%21%22Wound+Reflection%22) out. `b3` takes it
  too, unchanged.
- **SIDE:** [The Guardian of Forever](https://scryfall.com/search?q=%21%22The+Guardian+of+Forever%22),
  displacing [Fraying Omnipotence](https://scryfall.com/search?q=%21%22Fraying+Omnipotence%22).
- **SIDE:** [Ro Laren, Double Agent](https://scryfall.com/search?q=%21%22Ro+Laren%2C+Double+Agent%22),
  displacing [Vial Smasher the Fierce](https://scryfall.com/search?q=%21%22Vial+Smasher+the+Fierce%22).
- **SIDE:** [Georgiou, Terran Emperor](https://scryfall.com/search?q=%21%22Georgiou%2C+Terran+Emperor%22),
  displacing [No Mercy](https://scryfall.com/search?q=%21%22No+Mercy%22).
- **SIDE:** [Lightning Greaves](https://scryfall.com/search?q=%21%22Lightning+Greaves%22) (a reprint
  of an existing pocket card), displacing [Swiftfoot Boots](https://scryfall.com/search?q=%21%22Swiftfoot+Boots%22).

Both cuts sit in `main` and `b3` alike and neither incoming card is a Game Changer, so the B4 to B3
derivation stays exactly the seven swaps in `research/sideboard.md`. Neither swap changes the draw
count: [Valgavoth, Harrower of Souls](https://scryfall.com/search?q=%21%22Valgavoth%2C+Harrower+of+Souls%22),
[Jeska's Will](https://scryfall.com/search?q=%21%22Jeska%27s+Will%22),
[Howling Mine](https://scryfall.com/search?q=%21%22Howling+Mine%22),
[Font of Mythos](https://scryfall.com/search?q=%21%22Font+of+Mythos%22),
[Temple Bell](https://scryfall.com/search?q=%21%22Temple+Bell%22), Spiteful Visions, Seizan and
[Wheel of Fortune](https://scryfall.com/search?q=%21%22Wheel+of+Fortune%22) make 8, plus the
[Bloodsoaked Insight](https://scryfall.com/search?q=%21%22Bloodsoaked+Insight%22) half, inside the
8 to 10 aim.

## Set mechanics as they matter to this deck

- **Station and Spacecraft (20 cards).** Station taps another creature for charge counters. Tapping
  a punisher doesn't switch off its triggers, so station would cost this deck little, but every
  Spacecraft payoff is a combat body or a Klingon/Borg tribal piece. None made the cut.
- **Seek out (2 cards: Ro Laren, Rom and Leeta).** "Whenever you draw your second card each turn"
  is automatic on our own turn: the natural draw plus any one of Howling Mine, Font of Mythos,
  Spiteful Visions or Seizan gets there. On opponents' turns it needs two of Valgavoth's draw,
  Temple Bell and a rummage.
- **Dilemma (4 cards).** "Whenever you face a dilemma" fires when we choose modes. `main` has two
  modal cards ([Rakdos Charm](https://scryfall.com/search?q=%21%22Rakdos+Charm%22) and Jeska's Will),
  so Elim Garak, Obsidian Order Operative, Gabriel Lorca and Tell Me What You See rarely trigger.
- **Strange new worlds (2 cards).** X counts differently named lands. Nearly every land in this
  manabase has its own name, so X runs high, which turns
  [The Destruction of Praxis](https://scryfall.com/search?q=%21%22The+Destruction+of+Praxis%22) into
  a self-wipe (see Traps).
- **Battlefront (4), landfall (5), Beam me up (3), assimilate (4), Federation (2).** These count
  opponents attacked, our own land drops, bounced creatures, graveyard creatures and creature types.
  None of them bills an opponent's action.
- **Investigate.** Several cards make Clues, and Clues never count toward the draw aim.
- **The one punisher-shaped mechanic is a single card.** [Kai Winn, Faithless Leader](https://scryfall.com/search?q=%21%22Kai+Winn%2C+Faithless+Leader%22)
  bills an opponent 3 life for casting or activating one named card. Nothing else in either set
  bills what an opponent does. The damage cards that fit here (Gul Dukat, Ro Laren, Tal Shiar
  Analyst) pay off the turn's total loss, our own draws or our own spells.

## Classification table: all 231 cards

Verdict key: **MAIN** displaces a named card in `main` now. **SIDE** is worth a pocket slot and names
the card it displaces. **IN** is already in `main`. **NO** is a pass. Sorted by colour identity, then
mana value.

### Black (64)

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 1 | A Good Day to Die | 1 | TRK NEW | NO | It's a combat trick. |
| 2 | Collation Trimatrix | 1 | TRK NEW | NO | It needs three artifact creatures. |
| 3 | General Chang, Cold Warrior | 1 | TRK NEW | NO | It's a Klingon sacrifice anthem. |
| 4 | Relentless Drednok | 1 | TRK NEW | NO | A lifelink 1/1 with a graveyard cantrip bills nobody. |
| 5 | Storied Veteran | 1 | TRK NEW | NO | It's a recursive 2/1 attacker that can't block. |
| 6 | Test of Loyalty | 1 | TRK NEW | NO | It's a cantrip graveyard exile or a creature regrowth, one card either way. |
| 7 | Battle-Scarred Survivalist | 2 | TRK NEW | NO | It grows off deaths to attack. |
| 8 | Bitter Triumph | 2 | TRC REPRINT | NO | It's Infernal Grasp with planeswalker reach for 3 life or a discard. Bedevil, Lich's Relic, Chaos Warp and Fell the Profane already hit planeswalkers, and Removal is at its target. |
| 9 | Blood-Sport Champion | 2 | TRC NEW | NO | It's a deathtouch 2/2. |
| 10 | Collective Drone | 2 | TRK NEW | NO | It counts artifact creatures, and the deck runs none. |
| 11 | De-evolve | 2 | TRK NEW | NO | Its exile needs threshold, and the list's removal kills outright. |
| 12 | Eject the Warp Core | 2 | TRK NEW | NO | It's -2/-2, or -6/-6 for a sacrifice, below the list's removal. |
| 13 | Extraction Integrant | 2 | TRC NEW | NO | It's a Borg attack anthem. |
| 14 | Kai Winn, Faithless Leader | 2 | TRK NEW | NO | It bills one named card. Naming a common rock such as Sol Ring bills every tap, but only at tables where someone runs it. |
| 15 | Last Gasp | 2 | TRC REPRINT | NO | It's -3/-3, and the list's removal kills any toughness for 1 to 2 mana. |
| 16 | Night's Whisper | 2 | TRC REPRINT | NO | It's one-shot draw for us, cut 2026-08-23 because the engines draw, and the draw count is still inside 8 to 10. |
| 17 | Pattern Buffer Preservation | 2 | TRK NEW | NO | It's card selection with a bounce-flashback, off-plan. |
| 18 | Resistance Is Futile | 2 | TRK NEW | NO | It's a sorcery creature kill, and Infernal Grasp is an instant for {B} here. |
| 19 | Salt Vampire | 2 | TRK NEW | NO | Its ETB forces one punished draw on one opponent, once, on a 2/2. |
| 20 | Tal Shiar Operative | 2 | TRK NEW | NO | It's an attack trigger. |
| 21 | Tell Me What You See | 2 | TRK NEW | NO | The opponent picks the cheaper branch, which is usually a card for us, and its dilemma return needs modal spells we barely run. |
| 22 | Tenacious Drone | 2 | TRK NEW | NO | It's a Borg chump blocker. |
| 23 | Assimilate the Wounded | 3 | TRC NEW | NO | It needs creatures to die this turn, and the deck has no sacrifice engine. |
| 24 | Automated Warfare System | 3 | TRK NEW | NO | It's an attack trigger. |
| 25 | Bat'leth | 3 | TRK NEW | NO | It's a -2/-2 on entry and combat equipment. |
| 26 | Commander Raffi Musiker | 3 | TRK NEW | NO | It's a Clue or one graveyard exile on a 3/2, and Clues never count as draw. |
| 27 | D'Ghor Bloodletter | 3 | TRK NEW | NO | Both modes are symmetric. -1/-1 kills our Kederekt Parasite and Bowmasters, and the edict hits us too. |
| 28 | Elim Garak, Simple Tailor | 3 | TRK NEW | NO | Dilemma needs modal spells, and only Rakdos Charm and Jeska's Will are modal here. |
| 29 | Fugitive Listener | 3 | TRK NEW | NO | One discard each on a 3/1 has no payoff in the list. |
| 30 | Grand Nagus Zek | 3 | TRK NEW | NO | Its Treasures come off deaths, and the deck has no sacrifice engine. |
| 31 | Impossible Choice | 3 | TRK NEW | NO | The removal mode hands its controller two 1/1s, and the draw mode costs us 2 life too. |
| 32 | Kurn, Son of Mogh | 3 | TRC NEW | NO | Its draw needs attacks. |
| 33 | Organic Avulsion Unit | 3 | TRK NEW | NO | It's a Borg menace granter. |
| 34 | Overflow Submatrix | 3 | TRK NEW | NO | It recurs artifact creatures, and the deck runs none. |
| 35 | Painful Truths | 3 | TRC REPRINT | NO | It's a one-shot draw 2 in two colours, and the engines draw. |
| 36 | Reclamation Specialist | 3 | TRC NEW | NO | It sacrifices artifact creatures, and the deck runs none. |
| 37 | Stray from History | 3 | TRK NEW | NO | It's a regrowth or one card exiled from a hand. |
| 38 | Toxic Deluge | 3 | TRC REPRINT | IN | Already in main. |
| 39 | Vengeance Mission | 3 | TRK NEW | NO | It pings on deaths, and without a sacrifice engine that is only on wipe turns. |
| 40 | Assault Drone | 4 | TRK NEW | NO | It's a Borg anthem. |
| 41 | Badgey, Malicious Glitch | 4 | TRC NEW | NO | It drains only when it becomes tapped, which means attacking. |
| 42 | Blastoneuron | 4 | TRK NEW | NO | Cards rarely leave our graveyard, since Whip of Erebos is the only card that moves them. |
| 43 | Ceti Eel | 4 | TRC NEW | NO | It's a self-mill beater. |
| 44 | He's Dead, Jim | 4 | TRK NEW | NO | It's a 4-mana instant kill, and Infernal Grasp costs {B} here. |
| 45 | Khan, Vengeful Heart | 4 | TRK NEW | NO | It wants a sacrifice for cards, and nothing in the list is spare fodder. |
| 46 | Obsidian Order Operative | 4 | TRK NEW | NO | Its drain needs dilemmas, and the list has two modal cards. |
| 47 | Sela, Tal Shiar Paradox | 4 | TRK NEW | NO | Its tokens come from cards leaving our graveyard, which rarely happens here. |
| 48 | U.S.S. Reliant, From Hell's Heart | 4 | TRK NEW | NO | It's one reanimation plus a station body. |
| 49 | Voq, Torchbearer | 4 | TRC NEW | NO | It's a graveyard clone with menace. |
| 50 | Assimilation Assessor | 5 | TRC NEW | NO | Its payoff is an attack trigger. |
| 51 | Battle of Wolf 359 | 5 | TRC NEW | NO | It counts artifact creatures, and the deck runs none. |
| 52 | Bio-Asset Allocator | 5 | TRC NEW | NO | Its drain is an attack trigger. |
| 53 | Cha'DIch Investigator | 5 | TRK NEW | NO | It's two vanilla bodies. |
| 54 | Gabriel Lorca, Mirror Menace | 5 | TRK NEW | NO | Its recursion needs dilemmas. |
| 55 | Hive Mind Coprocessor | 5 | TRK NEW | NO | Its draw needs combat damage. |
| 56 | In the Pale Moonlight | 5 | TRK NEW | NO | Its edict lets each opponent sacrifice their worst creature, where Lich's Relic destroys the best ones for 3. |
| 57 | The Destruction of Praxis | 5 | TRK NEW | NO | Trap: X counts differently named lands, nearly every land here has its own name, and it hits every creature including the commander. |
| 58 | The Promise of Kahless | 5 | TRC NEW | NO | It's Klingon reanimation. |
| 59 | Borg Queen, Perfection Manifest | 6 | TRC NEW | NO | It's an artifact anthem plus one reanimation. |
| 60 | Georgiou, Terran Emperor | 6 | TRK NEW | **SIDE** | We don't lose at 0 or less life while it lives, and it draws a card each end step. Pocket for pods where the symmetric pieces are what kills you, displacing No Mercy. |
| 61 | Rogue Artificial Intelligence | 6 | TRK NEW | NO | It's a 6-mana body whose best mode is basic landcycling. |
| 62 | Armus, Skin of Evil | 7 | TRK NEW | NO | Seven mana for two discards from one opponent a turn has no discard payoff here. |
| 63 | Gul Dukat, Colonial Prefect | 7 | TRK NEW | **MAIN** | Wound Reflection's end-step repeat plus the life it drains, 3 black devotion, and a creature cost that Rakdos, Lord of Riots can take to {B}{B}{B}. Displaces Wound Reflection (see Proposed swaps). |
| 64 | Death Is Irrelevant | 8 | TRK NEW | NO | It's an 8-mana Borg engine. |

### Red (75)

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 65 | Defense Force Aggressor | 1 | TRC NEW | NO | It's a vanilla 2/1. |
| 66 | Gin'tak Charge | 1 | TRC NEW | NO | It's 2 damage at sorcery speed. |
| 67 | Khaaaaaaaaaaaannn! | 1 | TRK NEW | NO | It's X creature removal, and the list kills creatures for less. |
| 68 | Planetary Bombardment | 1 | TRK NEW | NO | It's small creature burn. |
| 69 | Starfleet Security | 1 | TRK NEW | NO | It leaves a Clue, and Clues never count as draw. |
| 70 | Abrade | 2 | TRC REPRINT | NO | It's 3 damage or an artifact kill, and Bedevil and Rakdos Charm already cover artifacts. |
| 71 | Beckett Mariner, Impetuous Ensign | 2 | TRK NEW | NO | It needs to become tapped, which means attacking. |
| 72 | Boarding Action | 2 | TRK NEW | NO | It's a hasty token. |
| 73 | Brazen Bluff | 2 | TRK NEW | NO | The opponent chooses, so they exile a cheap spell rather than give us a free cast. |
| 74 | Captain's Tutelage | 2 | TRK NEW | NO | It's a combat aura. |
| 75 | D-7 Battle Cruiser | 2 | TRK NEW | NO | Its tokens are for combat. |
| 76 | Ferocious Colonist | 2 | TRC NEW | NO | It's an attacker. |
| 77 | Lwaxana Troi, Charming Guest | 2 | TRK NEW | **MAIN** | {2}, tap, stay tapped: every trigger of the commander (or Kaervek, or Sheoldred) triggers twice (CR 603.2d). {R} to cast here. Displaces Painful Quandary (see Proposed swaps). |
| 78 | Munitions Enthusiast | 2 | TRK NEW | NO | It's an attacker with a 1-damage death ping. |
| 79 | Perils of the Past | 2 | TRK NEW | NO | It's a pump or an artifact kill. |
| 80 | Planetary Patrol | 2 | TRK NEW | NO | It's a landfall attacker. |
| 81 | Qo'noS Quartermaster | 2 | TRC NEW | NO | Its mana needs an attack. |
| 82 | Reckless Impulse | 2 | TRK REPRINT | NO | It's one-shot impulse draw, and the engines draw. |
| 83 | Run Amok | 2 | TRC REPRINT | NO | It's a combat trick. |
| 84 | Savvy Profiteer | 2 | TRK NEW | NO | It's a mana creature, and Ramp is over target. |
| 85 | Tasha Yar, Out of Time | 2 | TRK NEW | NO | It's a hasty 2/1. |
| 86 | Test of Identity | 2 | TRK NEW | NO | It's a Klingon trick or a rummage. |
| 87 | The Naked Time | 2 | TRK NEW | NO | It ramps one Mountain, then makes us sacrifice a land in chapter III. |
| 88 | Thrill of Possibility | 2 | TRC REPRINT | NO | It's one-shot draw, cut 2026-08-23 because the engines draw. |
| 89 | Transporter Malfunction | 2 | TRK NEW | NO | It's 3 damage at sorcery speed. |
| 90 | Warship Flight Crew | 2 | TRC NEW | NO | It's a vanilla 2/2. |
| 91 | Academy Instructor | 3 | TRK NEW | NO | Its Officer tokens bill nobody and die to our own wipes. |
| 92 | Cantankerous Captain | 3 | TRK NEW | NO | It's a combat buff. |
| 93 | Captain James T. Kirk | 3 | TRK NEW | NO | It's a rummage or a token on entry. |
| 94 | Captain Michael Burnham | 3 | TRK NEW | NO | It bills our own land drops, about 1 per opponent a turn. |
| 95 | Combat Celebrant | 3 | TRC REPRINT | NO | It's an extra-combat attacker. |
| 96 | Direct Hit | 3 | TRC NEW | NO | It's creature burn at sorcery speed. |
| 97 | Dominion Infiltration | 3 | TRK NEW | NO | It copies opponents' creatures to attack with. |
| 98 | Encounter the Unknown | 3 | TRK NEW | NO | Shoot to Kill deals 2 to each player, us included, and kills our x/2s. The impulse mode is a one-shot. |
| 99 | Gagh Slinger | 3 | TRC NEW | NO | It pings only when Klingons or Warriors enter, and the deck has none. |
| 100 | Kruge, Genesis Seeker | 3 | TRC NEW | NO | It's a Klingon attack buff. |
| 101 | Plasma Cascade | 3 | TRK NEW | NO | It's 3 damage plus a rummage. |
| 102 | Professional Face-Breaker | 3 | TRC REPRINT | NO | Its Treasures need combat damage. |
| 103 | Quark, Humble Proprietor | 3 | TRK NEW | NO | Trap: "You can't sacrifice Treasure tokens" means neither its Treasures nor Descent into Avernus's can be spent. |
| 104 | Red Alert! | 3 | TRK NEW | NO | It's a combat buff. |
| 105 | Ro Laren, Double Agent | 3 | TRC NEW | **SIDE** | 2 to each opponent whenever we draw our second card in a turn, which the gifts guarantee on our turn. Red and noncombat, so every amplifier applies. Bench for the Vial Smasher slot. |
| 106 | Sarcophagus, Ship of the Dead | 3 | TRK NEW | NO | It's an anthem and a station body. |
| 107 | Shared Animosity | 3 | TRC REPRINT | NO | It's an attack anthem. |
| 108 | Tal Shiar Analyst | 3 | TRK NEW | NO | It pings each opponent for 1 per tap and untaps on noncreature spells, but it's summoning sick on arrival, and Ro Laren is the bench pick for this slot. |
| 109 | Targ Wrangler | 3 | TRK NEW | NO | It's an attacker that eats a permanent. |
| 110 | The Beacon of Kahless | 3 | TRC NEW | NO | It's a 3-mana rock. |
| 111 | The Wrath of Khan | 3 | TRK NEW | NO | Chapter III lets opponents sacrifice their worst nontoken permanent, and 4 damage to one creature is below the list's removal. |
| 112 | Worf, Intelligence Contractor | 3 | TRK NEW | NO | It's a threaten for attackers. |
| 113 | Chain Reaction | 4 | TRC REPRINT | NO | It scales with our own creatures too, and Wipes is 3 of 3. |
| 114 | Dahar Master | 4 | TRK NEW | NO | It trades a permanent for 2 damage. |
| 115 | Disrupt Decorum | 4 | TRC REPRINT | NO | Cut 2026-08-23 with the combat package. Goad protects us for a turn, but Kardur, Doomscourge is already the goad pocket. |
| 116 | Erica Ortegas, Plucky Pilot | 4 | TRK NEW | NO | Its land trick needs tapping, which means attacking. |
| 117 | Exploratory Mission | 4 | TRK NEW | NO | It's a landfall engine for our own land drops. |
| 118 | Galvanizing Tenor | 4 | TRC NEW | NO | Its goad needs attacks. |
| 119 | Kang, Suspicious Captain | 4 | TRC NEW | NO | It goads one creature and itself into combat. |
| 120 | Kirk, Enterprising Captain | 4 | TRC NEW | NO | Its impulse needs attacks. |
| 121 | Koloth, Tribble Hunter | 4 | TRC NEW | NO | It hands every player two goaded bodies a turn, which feeds opponents' boards. |
| 122 | La'An Noonien-Singh, Security | 4 | TRK NEW | NO | It's an attack enabler. |
| 123 | Mek'leth Berserker | 4 | TRC NEW | NO | It's a vanilla menace body. |
| 124 | Q, Stacking the Deck | 4 | TRK NEW | NO | It's a 4/4 with random card value. |
| 125 | Rom and Leeta, Unlikely Pair | 4 | TRC NEW | NO | Seek out makes Treasures here every turn, but Ramp is over target. |
| 126 | Will Riker, First in the Field | 4 | TRK NEW | NO | Its temporary lands are for an attack turn. |
| 127 | Genesis Effect | 5 | TRK NEW | NO | It's 5-mana creature burn that also destroys our own land. |
| 128 | Gnarling Targ | 5 | TRC NEW | NO | It's an attack anthem. |
| 129 | Khan, Despot by Design | 5 | TRK NEW | NO | It pings each opponent and their creatures once on entry, then it's a beater. |
| 130 | Klingon Strike Force | 5 | TRC NEW | NO | It pings each opponent only when it dies. |
| 131 | Silicate Surveyor | 5 | TRK NEW | NO | It's a 5-mana body with one impulse draw. |
| 132 | World at War | 5 | TRC REPRINT | NO | It's extra combat. |
| 133 | Glory to the Empire! | 6 | TRC NEW | NO | It's a combat anthem. |
| 134 | Grilka, Widowed Warrior | 6 | TRC NEW | NO | It's a threaten for attackers. |
| 135 | Horta | 6 | TRK NEW | NO | It's a body with landcycling. |
| 136 | Own the Day | 6 | TRC NEW | NO | It's extra combat. |
| 137 | Ravenous Cosmozoan | 6 | TRK NEW | NO | It's a hasty flier. |
| 138 | Pah-Wraith | 7 | TRK NEW | NO | It's an attack anthem. |
| 139 | Infinite Diversity | 9 | TRK NEW | NO | It costs 9, and Federation counts creature types. |

### Multicolour B/R (6)

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 140 | Talisman of Indulgence | 2 | TRC REPRINT | IN | Already in main. |
| 141 | Terminate | 2 | TRC REPRINT | NO | Cut 2026-09-28 for Lich's Relic as the lowest removal row, and its grounds still hold: neither Medallion reduces it and Infernal Grasp does the same job for {B}. |
| 142 | The Duras Sisters | 2 | TRK NEW | NO | They're combat bodies. |
| 143 | L'Rell, Fierce Visionary | 3 | TRK NEW | NO | Its tokens are for combat. |
| 144 | Gowron, Eager for Battle | 4 | TRK NEW | NO | It's a sacrifice payoff, and the deck has no sacrifice engine. |
| 145 | Sins of the Father | 5 | TRC NEW | NO | Its edicts let opponents choose what dies, and Lich's Relic chooses for us at 3 mana. |

### Colourless (59)

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 146 | Astral Cornucopia | 0 | TRC REPRINT | NO | It costs three mana per counter, so it's a slow rock, and Ramp is already 11 against a target of 8. |
| 147 | Engineered Explosives | 0 | TRK REPRINT | NO | Sunburst caps it at two counters in a two-colour deck, so it only sweeps MV 0 to 2 and takes our own rocks with it. |
| 148 | Everflowing Chalice | 0 | TRC REPRINT | NO | It's a rock that scales only by overpaying, and Ramp is 11 against a target of 8. |
| 149 | Jefferies Tube | 1 | TRC NEW | NO | Every mode costs {2} to {4} for a small effect, and its draw is ours, so nothing bills it. |
| 150 | Skullclamp | 1 | TRC REPRINT | NO | The only fodder is Kederekt Parasite, the Bowmasters Army and the Spiked Corridor Devils, and equip is sorcery speed. The draw count is already inside 8 to 10. Line recorded below. |
| 151 | Sol Ring | 1 | TRC REPRINT | IN | Already in main. |
| 152 | Tricorder | 1 | TRK NEW | NO | Its surveil needs an attacker, and this deck doesn't attack. |
| 153 | Wayfarer's Bauble | 1 | TRC REPRINT | NO | The 2026-08-23 build passed it as slow ramp, and Ramp is now 11 against 8. |
| 154 | Arcane Signet | 2 | TRC REPRINT | IN | Already in main. |
| 155 | Cybernetic Specialist | 2 | TRK NEW | NO | A 2/1 with surveil and graveyard tuck bills nobody. |
| 156 | Disruptor Pistol | 2 | TRC NEW | NO | It takes six mana over two turns to deal 5 to one creature, which is worse than every removal spell in the list. |
| 157 | Howling Mine | 2 | TRC REPRINT | IN | Already in main. |
| 158 | Isolinear Processor | 2 | TRK NEW | NO | Its mana only casts artifacts and its rummage is card-neutral. |
| 159 | Lightning Greaves | 2 | TRC REPRINT | **SIDE** | Existing pocket entry, re-derived. Shroud stops our own Kaya's Ghostform, Mithril Coat's attach, the Collar's equip and Lwaxana's target, so it stays a per-table swap for Swiftfoot Boots. |
| 160 | Mind Stone | 2 | TRC REPRINT | NO | It's in b3 as the non-Game-Changer stand-in for Mana Vault. Main runs Mana Vault. |
| 161 | Replicator | 2 | TRK NEW | NO | Food and token copies do nothing for a punisher deck. |
| 162 | Swiftfoot Boots | 2 | TRC REPRINT | IN | Already in main. |
| 163 | Tea, Earl Grey, Hot | 2 | TRK NEW | NO | A cantrip artifact that later pings for 2 or gains 3 is below every card in the list. |
| 164 | Thought Vessel | 2 | TRC REPRINT | NO | It's in b3 as the non-Game-Changer stand-in for Mox Diamond. Main runs Mox Diamond and Reliquary Tower. |
| 165 | Type-2 Phaser | 2 | TRK NEW | NO | The stun hits one creature once, and the rest of the card is an attack bonus. |
| 166 | U.S.S. Defiant, Mirror Migrant | 2 | TRC NEW | NO | Phasing out the commander dodges a wipe but also switches off its trigger until our next turn, and the ship needs station to fly. |
| 167 | Warp Core | 2 | TRK NEW | NO | It's a basic-land tutor whose other half charges Spacecraft, and the deck runs none. |
| 168 | Class-F Shuttlecraft | 3 | TRK NEW | NO | It's a 3-mana rock that needs our creatures tapped for station to become anything more. |
| 169 | Combadge | 3 | TRK NEW | NO | Communicator unblockability is for attackers. |
| 170 | Commander's Sphere | 3 | TRC REPRINT | NO | It's a 3-mana rock, and Ramp is 11 against 8 with better 2-drops. |
| 171 | Darksteel Plate | 3 | TRC REPRINT | NO | Mithril Coat already gives indestructible with flash and a free attach. |
| 172 | Herald's Horn | 3 | TRC REPRINT | NO | The deck isn't tribal, so it discounts a handful of creatures at best. |
| 173 | I.K.S. Negh'Var, Imperial Flagship | 3 | TRC NEW | NO | It's a Klingon Spacecraft that needs 10 station counters. |
| 174 | K't'inga-Class Battle Cruiser | 3 | TRC NEW | NO | It's a Klingon combat Spacecraft. |
| 175 | S.S. Botany Bay | 3 | TRC NEW | NO | It exiles one graveyard card a tap, and its payoff needs combat damage. |
| 176 | Starfleet Communicator | 3 | TRC NEW | NO | Its draw needs attackers that carry Communicators. |
| 177 | Sword of Light and Shadow | 3 | TRC REPRINT | NO | It's combat equipment, and the deck doesn't attack. |
| 178 | The Guardian of Forever | 3 | TRC NEW | **SIDE** | {4} and a sacrifice blink Gray Merchant back at the next end step, so it drains the table every turn Gary is out, and the same ability saves any creature from removal. Grindy pods only, displacing Fraying Omnipotence. |
| 179 | U.S.S. Enterprise-D, Galaxy-Class | 3 | TRK NEW | NO | It needs 7 station counters before it does anything. |
| 180 | U.S.S. Stargazer, Here and There | 3 | TRC NEW | NO | It's an attacking Spacecraft. |
| 181 | Class-4 Tactical Cube | 4 | TRC NEW | NO | Borg tokens and an artifact anthem serve an attack plan. |
| 182 | Door of Destinies | 4 | TRC REPRINT | NO | It's a tribal anthem, and the deck isn't tribal. |
| 183 | Hedron Archive | 4 | TRC REPRINT | NO | It's a 4-mana rock, and Ramp is over target. |
| 184 | K'Vort-Class Raider | 4 | TRC NEW | NO | Hexproof only on our own turn doesn't stop removal on theirs, and the rest is a station attacker. |
| 185 | Queen's Diamond | 4 | TRC NEW | NO | Its mana only casts the commander, which both Medallions already bring to {1}{B}{R}. |
| 186 | Reconnaissance Partition | 4 | TRC NEW | NO | A 4-mana 3/3 that draws or ramps twice is below the list's draw engines. |
| 187 | Stonespeaker Crystal | 4 | TRC REPRINT | NO | It's a 4-mana rock with graveyard hate. Rakdos Charm covers the hate and Ramp is over target. |
| 188 | The Sword of Kahless | 4 | TRC NEW | NO | It's Klingon combat equipment. |
| 189 | Unwinding Clock | 4 | TRC REPRINT | NO | It untaps Temple Bell, Mana Vault and Grim Monolith on every opponent's turn, but it's 4 colourless mana for value in an over-target Ramp role. Line recorded below. |
| 190 | Alhammarret's Archive | 5 | TRC REPRINT | NO | It doubles our lifegain and our extra draws, but it's 5 generic that no Medallion reduces, in a deck that already has an infinite lifegain combo and 8 to 9 draw sources. |
| 191 | Forsaken Monument | 5 | TRC REPRINT | NO | It rewards colourless permanents, and our only colourless permanents are rocks. |
| 192 | Sickbay | 5 | TRK NEW | NO | Its counters are for combat. |
| 193 | Starship Enterprise | 5 | TRC NEW | NO | It's a landfall Spacecraft that needs 16 counters. |
| 194 | U.S.S. Cerritos, Following Up | 5 | TRK NEW | NO | Two 1/1s and a station flier bill nobody. |
| 195 | U.S.S. Enterprise-C, Time-Tossed | 5 | TRC NEW | NO | Its wheel is ours alone, so no draw-punisher fires. |
| 196 | U.S.S. Prometheus, Prototype | 5 | TRC NEW | NO | Its payoff needs combat damage. |
| 197 | Command Chair | 6 | TRC NEW | NO | It costs 6, enters tapped and makes 3 to 5 mana, and Ramp is over target. |
| 198 | The Immortal Sun | 6 | TRC REPRINT | NO | Six colourless for a draw, a discount and an anthem, and its loyalty lock is the kind of stax the pod removes on sight. |
| 199 | U.S.S. Defiant, Tough Little Ship | 6 | TRC NEW | NO | It's 6-mana artifact or enchantment removal on a station body, and Chaos Warp and Bedevil cover that job. |
| 200 | U.S.S. Farragut, Bold Explorer | 6 | TRC NEW | NO | It's a landfall creature cheat on a station body. |
| 201 | The Holodeck | 7 | TRK NEW | NO | Seven mana to replay one permanent a turn is too slow here. |
| 202 | Crystalline Entity | 8 | TRK NEW | NO | Trap: if cast, it destroys all nonartifact creatures, including the commander and every creature punisher. |
| 203 | Planet Killer | 8 | TRC NEW | NO | It must attack each combat, which Glacial Chasm forbids and the plan doesn't want. |
| 204 | Deep Space 9 | 9 | TRK NEW | NO | Nine mana for random permanents is off-plan. |

### Lands (27)

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 205 | Artificial Anomaly | 0 | TRK NEW | NO | It's a colourless land whose one-shot drain of 2 costs {3}{B} and the land. |
| 206 | Blood Crypt | 0 | TRK REPRINT | IN | Already in main. |
| 207 | Canyon Slough | 0 | TRC REPRINT | NO | It's typed and fetchable but always enters tapped, and the manabase is built for untapped duals. |
| 208 | Command Beacon | 0 | TRC REPRINT | NO | It's a colourless land, and both Medallions plus Kaya's Ghostform already keep recasts cheap. |
| 209 | Command Tower | 0 | TRC REPRINT | IN | Already in main. |
| 210 | Dragonskull Summit | 0 | TRC REPRINT | IN | Already in main. |
| 211 | Evolving Wilds | 0 | TRC REPRINT | NO | It fetches a tapped basic, and the five fetches already find typed duals untapped. |
| 212 | Exotic Orchard | 0 | TRC REPRINT | NO | In a two-colour deck a dual is equal or better. |
| 213 | Fabled Passage | 0 | TRC REPRINT | NO | It finds basics only, tapped early, and the five fetches find typed duals untapped. |
| 214 | Foreboding Ruins | 0 | TRC REPRINT | IN | Already in main. |
| 215 | Mountain | 0 | TRK REPRINT | IN | Already in main (basic). |
| 216 | Mutavault | 0 | TRC REPRINT | NO | It's a colourless manland for an attack plan. |
| 217 | Path of Ancestry | 0 | TRC REPRINT | NO | It enters tapped, and its scry needs a Human or Assassin creature spell. |
| 218 | Qo'noS | 0 | TRK NEW | NO | It's a tapped dual. |
| 219 | Quark's Bar | 0 | TRK NEW | NO | One ping on entry doesn't beat a basic Mountain, which is fetchable and counts for Smoldering Marsh. |
| 220 | Reliquary Tower | 0 | TRC REPRINT | IN | Already in main. |
| 221 | Rogue's Passage | 0 | TRC REPRINT | NO | It's colourless, and its ability makes an attacker unblockable. |
| 222 | Smoldering Marsh | 0 | TRC REPRINT | IN | Already in main. |
| 223 | Spatial Anomaly | 0 | TRK NEW | NO | It's colourless, and 5 mana plus the land for 2 damage is poor removal. |
| 224 | Spire of Industry | 0 | TRC REPRINT | NO | The duals already make both colours without the life payment. |
| 225 | Starfleet Academy | 0 | TRK NEW | NO | Federation counts creature types, and the land is colourless otherwise. |
| 226 | Swamp | 0 | TRK REPRINT | IN | Already in main (basic). |
| 227 | Temple of Malice | 0 | TRC REPRINT | NO | It's a tapped dual. |
| 228 | Temple of the False God | 0 | TRC REPRINT | NO | It's colourless and dead before five lands. |
| 229 | Terramorphic Expanse | 0 | TRC REPRINT | NO | It fetches a tapped basic, and the five fetches find typed duals untapped. |
| 230 | The Unicomplex | 0 | TRK NEW | NO | A Swamp is fetchable and counts for Smoldering Marsh, and this mono-black land is neither. |
| 231 | Unexplored Territory | 0 | TRK NEW | NO | It's colourless, and its basic fetch costs {1} and enters tapped. |

## Proposed swaps (the pilot approves each one separately)

Curve method, the same as the FRA review: the 65 nonland cards outside the Lands section (the MDFC
spell-lands count as lands), at Scryfall's mana value, so Spiked Corridor // Torture Pit counts 8.
Today `main` is **avg MV 3.20, MV ≤ 2: 27, MV ≤ 3: 38** and `b3` is **3.22, 27, 39**. The
`deck:show` footer reads 3.26 because it counts differently, so read the deltas.

### 1. Lwaxana Troi, Charming Guest in, Painful Quandary out

> **Lwaxana Troi, Charming Guest** {1}{R} · Legendary Creature — Betazoid Advisor 2/2. *You may
> choose not to untap Lwaxana Troi during your untap step. {2}, {T}: Choose another target creature
> you control. For as long as Lwaxana Troi remains tapped, if a triggered ability of that creature
> triggers, that ability triggers an additional time.*

> **Painful Quandary** {3}{B}{B} · Enchantment. *Whenever an opponent casts a spell, that player
> loses 5 life unless they discard a card.*

**Deciding axis: rate on the commander's engine.** For {R} and then {2}, every trigger of
[The Lord of Pain](https://scryfall.com/search?q=%21%22The+Lord+of+Pain%22) happens twice for as
long as Lwaxana stays tapped. The deck's whole brief runs through that trigger.

**Cost here.** {1}{R} minus Ruby Medallion is {R}, and Rakdos, Lord of Riots discounts it too. The
{2} activation isn't reduced. It has {T} in its cost, so summoning sickness (CR 302.6) delays it a
turn unless Swiftfoot Boots gives haste (equip {1}). After that the pilot declines to untap it,
which the card allows.

**How it works (rules).** CR 603.2d: the effect makes the ability trigger twice. Each copy chooses
its own target player as it goes on the stack (CR 603.3d), so the two hits can go to different
opponents, and each is its own damage event. Torbran and Torture Pit therefore add +2 to each, and
Solphim and Twinflame double each. The effect lasts "for as long as" Lwaxana stays tapped
(CR 611.2b), and it follows that one object: when the commander dies and comes back it is a new
object (CR 400.7), so the pilot untaps Lwaxana in the next untap step and pays {2} again.

**What it doubles in `main`, by target** (raw numbers from formulas.md, before amplifiers):

| Target | Trigger | Extra output per round |
|---|---|---|
| The Lord of Pain | each player's first spell each turn, ~4 a cycle at MV ~3 | +12 damage, aimed, or +40 under Solphim + Torbran + Torture Pit (10 per trigger) |
| [Kaervek the Merciless](https://scryfall.com/search?q=%21%22Kaervek+the+Merciless%22) | every opponent spell, its MV to any target | +18 to +27 at 6 to 9 opponent spells a cycle |
| [Sheoldred, the Apocalypse](https://scryfall.com/search?q=%21%22Sheoldred%2C+the+Apocalypse%22) | each opponent draw: 4 life instead of 2; each of our draws: 4 life | about +10 per opponent at 5 draws each a turn (life loss, so only Bloodletter and the end-step repeaters raise it) |
| Gul Dukat (swap 2) | the end-step repeat | each opponent loses 4 times the turn's loss instead of 2 times |
| Valgavoth | first life loss on each opponent's turn | two cards per opponent turn instead of one |

**Rule 1 check.** Lwaxana multiplies only the chosen creature's triggers, and every target above
hits opponents or a target we choose. It never touches Spiteful Visions, Descent or Manabarbs,
because they aren't creatures. The one wrong target is Seizan, whose upkeep trigger is symmetric.
**Rule 2:** not applicable.

**Self-hits.** A 2/2 dies to our own [Blasphemous Act](https://scryfall.com/search?q=%21%22Blasphemous+Act%22)
and [Toxic Deluge](https://scryfall.com/search?q=%21%22Toxic+Deluge%22) at X ≥ 2, like Kederekt
Parasite, Razorkin Needlehead and Hexing Squelcher. Lightning Greaves (pocket) would stop it from
targeting a creature that wears Greaves, since shroud blocks our own targeting.

**Why Painful Quandary is the cut.** Its role, cast/upkeep/mana punishers, has run one over its
target of 5 since Powerbalance went in on 2026-10-10. Ranked against the current list:

| Card | Cost here | Trigger | Raw output per opponent per cycle | Amplified by | Status |
|---|---|---|---|---|---|
| Kaervek the Merciless | {3}{B}{R} (both Medallions) | every opponent spell, MV to any target | ~6 | every amplifier (red) | biggest punisher |
| [Powerbalance](https://scryfall.com/search?q=%21%22Powerbalance%22) | {R}{R} | free cast on a matching MV | ~0.6 free spells a turn cycle, each firing the Lord and Vial Smasher | via the Lord | pilot's call 2026-10-10 |
| Manabarbs | {2}{R} (Ruby) | every land tap, 1 | ~5 | every amplifier (red) | pilot keep 2026-08-23 |
| [Mogis, God of Slaughter](https://scryfall.com/search?q=%21%22Mogis%2C+God+of+Slaughter%22) | {B}{R} (both Medallions) | each opponent upkeep, 2 or a sacrifice | 2 | every amplifier (red) | indestructible |
| Vial Smasher the Fierce | {B}{R} (both Medallions) | our first spell, MV to a random opponent | ~1.25 | every amplifier (red) | pilot keep 2026-09-22 and 2026-09-28 |
| **Painful Quandary** | {2}{B}{B} (Jet) | every opponent spell, 5 life or a discard | mostly a discard (eval-061) | Bloodletter and Wound Reflection only | **the cut** |

The grounds, re-derived (§1.1b):

- Under Howling Mine, Font of Mythos and Seizan the table overflows its hand, so opponents take the
  discard, often a card they'd lose at cleanup anyway (ledger eval-061).
- Its life loss isn't damage, so Solphim, Torbran, Torture Pit and Twinflame never touch it.
- Its 2026-08-23 reason ("discards feed Bloodchief Ascension") lapsed when Bloodchief went to the
  pocket the same day.
- It was my nomination on 2026-10-10. The pilot cut Fellwar Stone instead but didn't name Quandary
  as protected, so this asks the question again on new grounds.

Against the cut: it gives Gray Merchant 2 devotion, an opponent with an empty hand can't take the
discard and loses the 5 (CR 118.3, 118.12a), it is an enchantment that survives our wipes, and the
pocket lines with [Bloodchief Ascension](https://scryfall.com/search?q=%21%22Bloodchief+Ascension%22),
[Wild Evocation](https://scryfall.com/search?q=%21%22Wild+Evocation%22) and the FRA bench's
[Tinybones, Pocket Nuisance](https://scryfall.com/search?q=%21%22Tinybones%2C+Pocket+Nuisance%22)
lose a partner. eval-011 check: Lwaxana targets creatures only, so cutting an enchantment's trigger
loses nothing Lwaxana could have doubled.

**Other cuts considered:**

- [Talisman of Indulgence](https://scryfall.com/search?q=%21%22Talisman+of+Indulgence%22): the
  curve-neutral option, the same shape as the pilot's own Powerbalance-for-Fellwar choice. It costs
  a mana source (41 to 40) and pulls against the 2026-09-22 fast-mana premise. Avg MV stays 3.20.
- Vial Smasher the Fierce: the lowest-output punisher, but the pilot has kept it twice.
- [Basilisk Collar](https://scryfall.com/search?q=%21%22Basilisk+Collar%22): Lifeline is 5 against
  3, but the Collar was the pilot's own request on 2026-08-23.
- [Torbran, Thane of Red Fell](https://scryfall.com/search?q=%21%22Torbran%2C+Thane+of+Red+Fell%22),
  the amplifier Lwaxana most resembles on the commander: its +2 lands on every red instance,
  Spiteful Visions' ping on each opponent draw included, which out-produces a commander-only doubler.

**Effect.** MV 5 out, MV 2 in. `main`: avg MV 3.20 to **3.15**, MV ≤ 2 27 to **28**, MV ≤ 3 38 to
**39**. Pips B59 R35 to B57 R36, black devotion -2. Roles: cast/upkeep/mana punishers 6 to 5 (at
target), amplifiers 6 to 7. Game Changers stay at 9.

**`b3`: takes it too.** Painful Quandary is in `b3` and Lwaxana isn't a Game Changer, so the
derivation is unchanged. `b3` avg MV 3.22 to 3.17, MV ≤ 2 27 to 28, MV ≤ 3 39 to 40.

### 2. Gul Dukat, Colonial Prefect in, Wound Reflection out

> **Gul Dukat, Colonial Prefect** {4}{B}{B}{B} · Legendary Creature — Cardassian Rogue 6/6. *Menace.
> At the beginning of each end step, each opponent loses life equal to the life that player lost
> this turn. You gain life equal to the life lost this way. (Damage causes loss of life.)*

> **Wound Reflection** {5}{B} · Enchantment. *At the beginning of each end step, each opponent loses
> life equal to the life they lost this turn. (Damage causes loss of life.)*

**Deciding axis: lifeline.** The end-step repeat is the same effect (ledger trig-008: each opponent
repeats their own whole turn's gross loss, at every end step). Gul Dukat adds the life.

| | Wound Reflection | Gul Dukat |
|---|---|---|
| Cost here | {4}{B} (Jet), and Rakdos can't reduce it | {3}{B}{B}{B} (Jet), down to {B}{B}{B} under Rakdos, Lord of Riots once opponents lost 3+ this turn |
| End-step repeat | yes | yes |
| Life for us | none | everything it drains: three opponents who lost 5 each means 15 drained and 15 gained, every end step |
| [Sanguine Bond](https://scryfall.com/search?q=%21%22Sanguine+Bond%22) (`main`) | nothing | fires once for the total at one opponent |
| Gray Merchant devotion | 1 | 3 |
| Type | enchantment: survives our own Blasphemous Act and Toxic Deluge and the pod's creature removal | creature: dies to all of those, but dodges the enchantment wipes the gameplan lists as a threat |
| Body | none | 6/6 menace, a blocker |

**Rule 1 check.** "Each opponent loses" is opponent-only, and it is life loss, so no damage
amplifier is involved. On our turn [Bloodletter of Aclazotz](https://scryfall.com/search?q=%21%22Bloodletter+of+Aclazotz%22)
doubles the end-step loss, because it is life loss during our turn. **Rule 2:** it gains life, so it
helps.

**Self-hits and cover.** Our own Blasphemous Act kills it, and Toxic Deluge does at X ≥ 6. Fraying
Omnipotence's sacrifice is our choice. It is legendary, so [Mithril Coat](https://scryfall.com/search?q=%21%22Mithril+Coat%22)
can attach to it for indestructible, and [Kaya's Ghostform](https://scryfall.com/search?q=%21%22Kaya%27s+Ghostform%22)
returns it. Wound Reflection needs none of that cover, which is the real cost of this swap: after
one of our own wipes, Torture Pit would be the only amplifier left standing.

**Grounds for Wound Reflection as the cut.** This is an upgrade in place, not a "redundant" cut
(§2.5): Gul Dukat does the whole of Wound Reflection's job and adds the life, the devotion and the
Rakdos discount. The gameplan's first kill line ("doubled again at end step by Wound Reflection")
keeps working with Gul Dukat in that seat. The FRA follow-up already named Wound Reflection, at
5 mana, as the amplifier to watch for being slow, and under Rakdos Gul Dukat is often the cheaper
card. eval-011 check: no card in `main` reads Wound Reflection's end-step trigger. If the swap is applied,
the pocket [Archfiend of Despair](https://scryfall.com/search?q=%21%22Archfiend+of+Despair%22) row in
`research/sideboard.md`, which displaces Wound Reflection, needs Gul Dukat as its displaced card.

**The stronger ceiling is running both, and here is what it costs.** trig-008's corollary: a second
end-step repeater sees the first one's loss. We order our own simultaneous triggers (CR 603.3b), so
with Gul Dukat resolving first, each opponent loses the turn's loss, then that again, then double
the new total: 4 times the turn's loss, and we gain the Gul Dukat part. Keeping both needs a
different cut:

| Second cut, keeping Wound Reflection | `main` avg MV · MV ≤ 2 · MV ≤ 3 | Cost |
|---|---|---|
| Painful Quandary (if swap 1 isn't taken) | 3.23 · 27 · 38 | as in swap 1 |
| Talisman of Indulgence (with swap 1 taken) | 3.23 · 27 · 38 for the whole package | a mana source, 41 to 40 |
| Basilisk Collar | 3.29 · 26 · 37 | the pilot's own request, and the biggest curve jump |

I recommend the in-place swap because it holds the curve and the role counts flat, and Lwaxana on
Gul Dukat already reaches the 4 times line inside the recommended package. If the pilot wants the
top end more than the curve, Talisman of Indulgence is the right second cut.

**Effect.** MV 6 out, MV 7 in. `main`: avg MV 3.20 to **3.22**, MV ≤ 2 and MV ≤ 3 unchanged at 27
and 38. With swap 1 as well: **3.17, 28, 39**. Pips B59 to B61, black devotion +2. Roles:
amplifiers unchanged in count, and the lifeline gains a source. Game Changers stay at 9.

**`b3`: takes it too.** Wound Reflection is in `b3` and Gul Dukat isn't a Game Changer, so the
derivation is unchanged. Without Sanguine Bond in `b3` the life is survival only, which is the job
`b3` needs most. `b3` avg MV 3.22 to 3.23, 27, 39, or 3.18, 28, 40 with swap 1.

**Combos.** Neither MAIN creates an infinite. Lwaxana on Gul Dukat is a bounded 4 times per end
step. Lwaxana on [Bloodthirsty Conqueror](https://scryfall.com/search?q=%21%22Bloodthirsty+Conqueror%22)
with Sanguine Bond is the existing B4 loop, which [Exquisite Blood](https://scryfall.com/search?q=%21%22Exquisite+Blood%22)
already makes infinite. `b3` has no Sanguine Bond, so neither swap adds a combo there.

## Bench (SIDE)

| Card | Bring in when… | Displaces |
|---|---|---|
| The Guardian of Forever | Grindy pods. {3} for a 0/6 defender, then *"{4}, Sacrifice another nontoken creature: Return that card to the battlefield under its owner's control at the beginning of the next end step."* Sacrificing [Gray Merchant of Asphodel](https://scryfall.com/search?q=%21%22Gray+Merchant+of+Asphodel%22) gives a fresh entry at the next end step, a full devotion drain for {4} once a turn, opponents' turns included. The same ability saves any creature from removal or a wipe, and for the commander the move to the command zone is optional (CR 903.9a), so it returns untaxed. Costs: the drain needs Gary on board, and a returned creature is a new object (CR 400.7), so equipment and Lwaxana's doubling fall off. | Fraying Omnipotence (the list's usual flex slot for grindy-pod pockets) |
| Ro Laren, Double Agent | You'd rather run a third red pinger than Vial Smasher. *"Seek out — Whenever you draw your second card each turn, Ro Laren deals 2 damage to each opponent."* Our own turn always counts, and Valgavoth plus Temple Bell or its own rummage ({1}, {T}, discard: draw) reach a second card on opponents' turns. About 2 to 3 triggers a round is 4 to 6 raw per opponent, against Vial Smasher's ~1.25 (FRA table). It is red and noncombat, so each 2 is 4 under Torbran or Solphim and 6 under both. A 3/2 dies to our own wipes, and its rummage is card-neutral, so it adds nothing to the draw count. | Vial Smasher the Fierce (a pilot keep, so this is the reserve beside the FRA bench's Tinybones and Gideon) |
| Georgiou, Terran Emperor | Pods where our own symmetric pieces are what kills us. *"You don't lose the game for having 0 or less life. At the beginning of your end step, you lose 3 life and draw a card. Then if your life total is 0 or less, create ten 1/1 red Officer creature tokens."* {B}{B} under Jet and Rakdos mid-game, and its card a turn takes the draw count to 9 or 10. Risks: if it leaves while we're at 0 or less we lose at the next state-based check (CR 704.5a, 117.5), before Kaya's Ghostform's return can resolve, so cover it with Mithril Coat. Paying a big X for Toxic Deluge with it out is a trap, because the -X/-X kills Georgiou. | No Mercy (alternative shields, like Darksteel Angel on the FRA bench) |
| Lightning Greaves | Reprint of the existing pocket entry, unchanged: haste and shroud matter more than targeting our own commander. Shroud also stops Lwaxana from targeting a creature wearing it. | Swiftfoot Boots |

## Near-misses and traps

**Near-misses (good cards, wrong deck or wrong moment):**

- [Tal Shiar Analyst](https://scryfall.com/search?q=%21%22Tal+Shiar+Analyst%22): 1 to each opponent
  per tap, untapped by each noncreature spell, so 2 to 3 red instances a round. It loses to Ro Laren
  for the bench slot because it is summoning sick on arrival and needs our spells to untap.
- Kai Winn, Faithless Leader: naming the table's most common rock (Sol Ring) bills 3 life per tap,
  but it bills one card at one table and dies as a 3/1.
- [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22): Infernal Grasp plus
  planeswalkers, for 3 life or a discard. Four cards in `main` already hit planeswalkers and Removal
  is at its target.
- [Alhammarret's Archive](https://scryfall.com/search?q=%21%22Alhammarret%27s+Archive%22): doubles our
  lifegain and every extra draw, but it is 5 generic no Medallion reduces, in a deck that already
  has an infinite lifegain combo.
- [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) and
  [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22): real lines (below), but
  one needs fodder the deck barely makes and the other is a 4-mana value engine in an over-target
  Ramp role.
- [Salt Vampire](https://scryfall.com/search?q=%21%22Salt+Vampire%22): its ETB makes an opponent draw
  one punished card, once.
- [Captain Michael Burnham](https://scryfall.com/search?q=%21%22Captain+Michael+Burnham%22): 1 to each
  opponent per land we play bills our action, not theirs.

**Traps (they read like upgrades and hurt this deck):**

- [Quark, Humble Proprietor](https://scryfall.com/search?q=%21%22Quark%2C+Humble+Proprietor%22) looks
  like a Treasure gift engine, but "You can't sacrifice Treasure tokens" stops us from spending its
  Treasures and Descent into Avernus's.
- The Destruction of Praxis reads like a scalable wipe, and here X is huge, but it hits every
  creature, the commander included.
- [Crystalline Entity](https://scryfall.com/search?q=%21%22Crystalline+Entity%22) destroys all
  nonartifact creatures when cast, which is the commander and every creature punisher.
- [D'Ghor Bloodletter](https://scryfall.com/search?q=%21%22D%27Ghor+Bloodletter%22) has two symmetric
  modes, and -1/-1 kills our Kederekt Parasite and Orcish Bowmasters.
- [Encounter the Unknown](https://scryfall.com/search?q=%21%22Encounter+the+Unknown%22): Shoot to Kill
  hits each player, us included.
- [Impossible Choice](https://scryfall.com/search?q=%21%22Impossible+Choice%22): the kill mode gives
  the victim two 1/1s and the draw mode costs us 2.
- [Elim Garak, Simple Tailor](https://scryfall.com/search?q=%21%22Elim+Garak%2C+Simple+Tailor%22) and
  [Obsidian Order Operative](https://scryfall.com/search?q=%21%22Obsidian+Order+Operative%22) drain
  each opponent, but only on dilemmas, and `main` has two modal cards.
- [U.S.S. Defiant, Mirror Migrant](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Mirror+Migrant%22)
  can phase the commander out of a wipe, but a phased-out Lord has no trigger until our next turn.

## Lines recorded (kept even where the card isn't taken)

- **Lwaxana on Gul Dukat:** the end-step trigger happens twice, the second sees the first's loss, so
  each opponent loses 4 times the turn's loss and we gain 3 times it, every end step.
- **Gul Dukat + Wound Reflection** (if both run): 4 times by ordering, and 8 times with Lwaxana on
  Gul Dukat as well.
- **[Whip of Erebos](https://scryfall.com/search?q=%21%22Whip+of+Erebos%22) on Gul Dukat:** the
  reanimated Gul Dukat's end-step trigger and Whip's exile trigger fire at the same end step, and
  Gul Dukat's resolves even after it is exiled (CR 113.7a).
- **The Guardian of Forever + Gray Merchant:** a full devotion drain every turn for {4}.
- **Skullclamp + Spiked Corridor's Devils:** each Devil that dies pings for 1 (3 under Torbran) and
  draws two.
- **Unwinding Clock + Temple Bell:** Temple Bell untaps on every opponent's turn, so every player
  takes a punished draw each turn, and Mana Vault and Grim Monolith untap each opponent's turn too.
- **Kai Winn naming Sol Ring:** every Sol Ring tap at the table costs its controller 3 life.
