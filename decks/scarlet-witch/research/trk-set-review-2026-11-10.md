# TRK and TRC set review: The Scarlet Witch, 2026-11-10

**Sets.** Star Trek (TRK, 311 cards) and Star Trek Commander (TRC, 336 cards), both releasing
2026-11-13. Scryfall already lists every card in both as Commander-legal, so no card here waits on
its release date.

**Lists.** `b4` is the target: the X-spell chain at Bracket 4, which the pilot has played as no holds
barred for combos since 2026-10-13. `v3` is the same chain at Bracket 3 and gets its own verdict
column. The pilot deleted `main` today, so decision-log entries and older reviews that name `main`
describe a list that no longer exists.

**Method.** deck-brain `SKILL.md` §1 and §2, following `.claude/skills/set-review/reviewer.md`. Set
cards' text comes from `data/trk-candidates-scarlet-witch.json` and
`data/trc-candidates-scarlet-witch.json`, the deck's own cards from the bundle's `oracle.txt` and
`oracle-v3.txt`, and rules from `rules/sections/` (CR 2026-08-07). That CR predates the set, so
Federation, Battlefront, Seek out and Beam me up are read from the cards' own reminder text. Every
card was costed in this deck's mana (§1.2): [Ruby Medallion](https://scryfall.com/search?q=%21%22Ruby+Medallion%22) and [The Fire Crystal](https://scryfall.com/search?q=%21%22The+Fire+Crystal%22) cut red
spells by {1}, [Longshot, Rebel Bowman](https://scryfall.com/search?q=%21%22Longshot%2C+Rebel+Bowman%22) and [Artist's Talent](https://scryfall.com/search?q=%21%22Artist's+Talent%22) level 2 cut noncreature spells by
{1}, and [The Scarlet Witch](https://scryfall.com/search?q=%21%22The+Scarlet+Witch%22) cuts instants and sorceries of mana value 4 or more by her power, in
generic mana only. Every card was checked against the deck's own board (§1.3). Each name and each
card's key rules text was grepped in `research/decisions.md` and `research/sideboard.md`, and the
ledger was searched with `bun run lookup`. Reprints got the same reading as new cards (tool-007).
Price is never an axis, because everything is proxied.

**Field lens.** EDHREC has no data for TRK or TRC yet, so that lens is skipped (§2.2).

**Game Changers.** Neither set has one. `b4` stays at 9 and `v3` at 3 after every proposal here.

No deck file was changed. Every swap below waits for the pilot.

---

## Pool

151 cards fit mono-red identity: 66 from TRK and 85 from TRC, and no card appears in both files.
105 are new and 46 are reprints (Scryfall's reprint flag). Four are already in a list: Mountain and
Sol Ring in both, and Arcane Signet and Rogue's Passage in `v3`.

## Result

| List | MAIN | SIDE | IN | NO |
|---|---|---|---|---|
| b4 (target, Bracket 4) | 1 | 2 | 2 | 146 |
| v3 (Bracket 3) | 1 | 3 | 4 | 143 |

- **MAIN for `b4`.** [Infinite Diversity](https://scryfall.com/search?q=%21%22Infinite+Diversity%22) in for [Solphim, Mayhem Dominus](https://scryfall.com/search?q=%21%22Solphim%2C+Mayhem+Dominus%22). Once Wanda's power plus
  the reducers reaches 7 it costs {R}{R}, and it copies one instant or sorcery from your graveyard
  five times (Wanda and Livaan are five creature types). That turns a chain that falls short into a
  kill from hand, where Solphim has to be on the battlefield already and covers a narrower band.
- **MAIN for `v3`.** [Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22) in for [Solphim, Mayhem Dominus](https://scryfall.com/search?q=%21%22Solphim%2C+Mayhem+Dominus%22). Her {2}
  activation makes one creature's triggered abilities fire twice: Livaan's pump on every noncreature
  spell, or the per-spell payoff of Wiccan, Thor, Urabrask, The Vision, Electro or Storm-Kiln Artist.
  She multiplies the chain's inputs (power and red pips), where Solphim multiplies an output that
  is usually past lethal already.
- **SIDE for `b4`.** [Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22), displacing [Runaway Steam-Kin](https://scryfall.com/search?q=%21%22Runaway+Steam-Kin%22) if its trial
  ends.
- **SIDE for `b4`.** [Dominion Infiltration](https://scryfall.com/search?q=%21%22Dominion+Infiltration%22), displacing [Unleash Fury](https://scryfall.com/search?q=%21%22Unleash+Fury%22). The pilot already holds it
  in the `b4` sideboard.
- **SIDE for `v3`.** [Infinite Diversity](https://scryfall.com/search?q=%21%22Infinite+Diversity%22), displacing [Pyromancer's Goggles](https://scryfall.com/search?q=%21%22Pyromancer's+Goggles%22).
- **SIDE for `v3`.** [Dominion Infiltration](https://scryfall.com/search?q=%21%22Dominion+Infiltration%22), displacing [Bionic Blow](https://scryfall.com/search?q=%21%22Bionic+Blow%22).
- **SIDE for `v3`.** [Disrupt Decorum](https://scryfall.com/search?q=%21%22Disrupt+Decorum%22), displacing [Vandalblast](https://scryfall.com/search?q=%21%22Vandalblast%22).

---

## Set mechanics as they matter to this deck

- **Federation** ([Infinite Diversity](https://scryfall.com/search?q=%21%22Infinite+Diversity%22), [Starfleet Academy](https://scryfall.com/search?q=%21%22Starfleet+Academy%22)) counts creature types among non-Borg
  creatures you control. Wanda alone is three (Mutant, Warlock, Hero) and [Livaan, Cultist of Tiamat](https://scryfall.com/search?q=%21%22Livaan%2C+Cultist+of+Tiamat%22)
  adds two (Dragon, Shaman), so the chain's usual board counts five. Each engine adds more: Electro
  two (Human, Villain), Neheb three, Longshot up to three, Storm-Kiln Artist, Ashling
  and Birgi one each, and [Tyrite Sanctum](https://scryfall.com/search?q=%21%22Tyrite+Sanctum%22) makes Wanda a God. Changeling creatures and
  [Mutavault](https://scryfall.com/search?q=%21%22Mutavault%22) are every creature type (CR 702.73a), Borg included, so they count for nothing.
- **Station and Spacecraft** (CR 721, 702.184). Station taps another creature to put charge counters
  equal to its power on the Spacecraft, so a mid-chain Wanda stations anything in one tap. Station
  is sorcery-speed, and every Spacecraft payoff in the pool needs combat damage or a later turn, so
  none earns a slot.
- **Beam me up** ([Boarding Action](https://scryfall.com/search?q=%21%22Boarding+Action%22), [Transporter Malfunction](https://scryfall.com/search?q=%21%22Transporter+Malfunction%22)) casts the card from your
  graveyard if you also return a creature you control to hand. Nothing in either list wants that.
- **Battlefront** ([The Beacon of Kahless](https://scryfall.com/search?q=%21%22The+Beacon+of+Kahless%22), [Galvanizing Tenor](https://scryfall.com/search?q=%21%22Galvanizing+Tenor%22), [Own the Day](https://scryfall.com/search?q=%21%22Own+the+Day%22)) counts the
  opponents you attacked this turn. This deck doesn't attack.
- **Seek out** ([Ro Laren, Double Agent](https://scryfall.com/search?q=%21%22Ro+Laren%2C+Double+Agent%22), [Rom and Leeta, Unlikely Pair](https://scryfall.com/search?q=%21%22Rom+and+Leeta%2C+Unlikely+Pair%22)) triggers on your second
  draw each turn, so it pays once a turn however many cards the chain draws.
- **Free casts.** [Brazen Bluff](https://scryfall.com/search?q=%21%22Brazen+Bluff%22) and [Infinite Diversity](https://scryfall.com/search?q=%21%22Infinite+Diversity%22) cast spells without paying their mana
  costs. An X-spell cast that way has X = 0 (CR 107.3b, ledger cost-001), and additional costs such
  as [Big Score](https://scryfall.com/search?q=%21%22Big+Score%22)'s discard still apply (CR 118.9d, ledger cost-009).
- **The TRC commanders' themes** are Klingon and Warrior tribal, goad and attack triggers. They miss a
  deck that wins in its own main phase.

---

## Classification table

Verdict key: MAIN displaces a named card in that list now. SIDE is bench, with the card it would
displace. IN means the list already runs it. NO is a pass. "Never discounted" means Wanda doesn't
reduce it, because she only reduces instants and sorceries of mana value 4 or more.

| # | Name | MV | New? | b4 | v3 | Reason |
|---|---|---|---|---|---|---|
| 1 | Academy Instructor | 3 | NEW | NO | NO | Its 1/1 Officer tokens die to your own Fiery Confluence and Chandra's Ignition, the Young Pyromancer grounds in the hard-cut table. It's a creature spell, so Livaan never sees it. |
| 2 | Beckett Mariner, Impetuous Ensign | 2 | NEW | NO | NO | It has to become tapped three times for 2 damage to each opponent, and this deck doesn't attack. |
| 3 | Boarding Action | 2 | NEW | NO | NO | It makes a 2/1 haste token and recasts by returning a creature to hand. Neither list wants either half. |
| 4 | Brazen Bluff | 2 | NEW | NO | NO | It needs an opponent's noncreature spell to target, so it does nothing on your turn while Conqueror's Flail is attached, and the opponent picks the outcome. Its free cast forces X = 0 (CR 107.3b). See traps. |
| 5 | Cantankerous Captain | 3 | NEW | NO | NO | +1/+0 at the beginning of combat is too small, and it's a creature spell Livaan never sees. |
| 6 | Captain James T. Kirk | 3 | NEW | NO | NO | Its modes are a loot, a 1/1 or a one-turn team +1/+0, on a three-mana creature. |
| 7 | Captain Michael Burnham | 3 | NEW | NO | NO | It pings 1 per land drop, and both lists play one land a turn. |
| 8 | Captain's Tutelage | 2 | NEW | NO | NO | +2/+0 as an Aura goes to the graveyard when Wanda dies (CR 704.5m), while Bonesplitter and Inventor's Axe stay on the battlefield (CR 704.5n). Mana value 2, never discounted. |
| 9 | D-7 Battle Cruiser | 2 | NEW | NO | NO | Stationing it taps your creatures, and its payoff is a combat token. |
| 10 | Dahar Master | 4 | NEW | NO | NO | It's a four-mana creature that sacrifices a permanent for 2 damage. |
| 11 | Dominion Infiltration | 3 | NEW | SIDE | SIDE | The pilot already holds it in the `b4` sideboard for pods with creatures worth copying. Its X can't exceed the number of creatures opponents control (CR 601.2c), so as a three-pip Livaan link it caps at the opposing board. It's bench over Unleash Fury in `b4` and over Bionic Blow in `v3`. |
| 12 | Encounter the Unknown | 3 | NEW | NO | NO | It costs two red pips at mana value 3 (never discounted) for the two impulse cards Reckless Impulse gives for one. Its sweeper mode kills your own Storm-Kiln Artist and hits you. |
| 13 | Erica Ortegas, Plucky Pilot | 4 | NEW | NO | NO | It's four mana for a land trick when it taps, and nothing for the chain. |
| 14 | Exploratory Mission | 4 | NEW | NO | NO | It's an enchantment, so never discounted, and gives one impulse card per land drop. |
| 15 | Genesis Effect | 5 | NEW | NO | NO | It costs {R} at Wanda's power 4 for 6 to a creature and +5 from Livaan, but it destroys one of your lands for a tapped one. As a link it loses to Lunar Frenzy and as removal to Khaaaaaaaaaaaannn!. |
| 16 | Horta | 6 | NEW | NO | NO | It's a 7/6 trampler, and its basic landcycling only finds a Mountain. |
| 17 | Infinite Diversity | 9 | NEW | MAIN | SIDE | It costs {R}{R} once Wanda's power plus reducers reaches 7, and its X is 5 with Wanda and Livaan. Five copies of Seething Song are 25 red, of Jeska's Will 15 cards, of Fiery Confluence 30 to each opponent. It goes in for Solphim in `b4` and benches over Pyromancer's Goggles in `v3`. |
| 18 | Khaaaaaaaaaaaannn! | 1 | NEW | NO | NO | As a link it gives only Livaan's X + 1, while Lunar Frenzy adds X more for the same one pip and works without Livaan. Its damage only hits creatures. See near-misses. |
| 19 | Khan, Despot by Design | 5 | NEW | NO | NO | It's a five-mana creature whose entry deals 1 to each opponent and their creatures. |
| 20 | La'An Noonien-Singh, Security | 4 | NEW | NO | NO | Its payoff is an attack trigger, and this deck doesn't attack. |
| 21 | Lwaxana Troi, Charming Guest | 2 | NEW | SIDE | MAIN | Her {2}, {T} ability makes one creature's triggered abilities trigger twice (CR 603.2d) while she stays tapped. On Livaan every link roughly triples Wanda instead of doubling her. It goes in for Solphim in `v3` and benches over Runaway Steam-Kin in `b4`. |
| 22 | Munitions Enthusiast | 2 | NEW | NO | NO | It's a 3/2 trampler that pings 1 when it dies. |
| 23 | The Naked Time | 2 | NEW | NO | NO | Chapter I fetches a tapped Mountain and chapter III sacrifices a land, so it nets no land. |
| 24 | Pah-Wraith | 7 | NEW | NO | NO | Its attack trigger counts differently named lands, and both lists are mostly Mountains. |
| 25 | Perils of the Past | 2 | NEW | NO | NO | It gives +3/+2 for {R} under Ruby, or destroys an artifact. Blazing Crescendo and Monstrous Rage already do the one-pip pump job, and Fiery Confluence and Untimely Malfunction already kill artifacts. |
| 26 | Planetary Bombardment | 1 | NEW | NO | NO | It deals 2 damage to a creature, or 4 if a creature died this turn. |
| 27 | Planetary Patrol | 2 | NEW | NO | NO | It's a 2/2 with a landfall pump. |
| 28 | Plasma Cascade | 3 | NEW | NO | NO | It deals 3 damage with an optional rummage for {2}{R}, at mana value 3, never discounted. |
| 29 | Q, Stacking the Deck | 4 | NEW | NO | NO | It copies one random nonland card, each copy costing a card from hand plus its full mana cost, on a four-mana creature Livaan never sees. |
| 30 | Quark, Humble Proprietor | 3 | NEW | NO | NO | It's a trap, because "You can't sacrifice Treasure tokens" switches off every Treasure the deck makes. See traps. |
| 31 | Ravenous Cosmozoan | 6 | NEW | NO | NO | It's a 3/3 flying haste creature. |
| 32 | Reckless Impulse | 2 | REPRINT | NO | NO | It gives two impulse cards for {1}{R}, even from an empty hand, but it's mana value 2 and adds no power to Wanda. See near-misses. |
| 33 | Red Alert! | 3 | NEW | NO | NO | It's a one-turn team +2/+0 at mana value 3, never discounted. |
| 34 | Sarcophagus, Ship of the Dead | 3 | NEW | NO | NO | Its anthem gives Wanda +1/+0 for {1}{R} under Ruby. Coral Sword gives the same +1 for {R}, and the seed slots hold +2 and +3 cards. |
| 35 | Savvy Profiteer | 2 | NEW | NO | NO | It's a red mana creature, summoning-sick without The Fire Crystal and killed by your own Fiery Confluence. `b4` gets its red from 0-mana pieces and `v3` runs Arcane Signet. |
| 36 | Silicate Surveyor | 5 | NEW | NO | NO | It's a five-mana 4/4 with one impulse card. |
| 37 | Starfleet Security | 1 | NEW | NO | NO | Its card comes as a Clue, and Clue makers don't count as draw for this pilot. |
| 38 | Tal Shiar Analyst | 3 | NEW | NO | NO | It deals 1 damage to each opponent per noncreature spell. Per-cast damage scales badly in a chain turn of few casts and many copies (the 2026-09-08 converter grounds). |
| 39 | Targ Wrangler | 3 | NEW | NO | NO | It's an attacker that eats one of your permanents. |
| 40 | Tasha Yar, Out of Time | 2 | NEW | NO | NO | It's a 2/1 haste creature that impulses one card when it dies. |
| 41 | Test of Identity | 2 | NEW | NO | NO | Its Starfleet mode is discard one, draw two, and from an empty hand it draws nothing. Big Score and Unexpected Windfall do that job and make Treasures. |
| 42 | Transporter Malfunction | 2 | NEW | NO | NO | It deals 3 damage for {1}{R}, never discounted. |
| 43 | Will Riker, First in the Field | 4 | NEW | NO | NO | It puts temporary lands in at combat, on a four-mana creature. |
| 44 | Worf, Intelligence Contractor | 3 | NEW | NO | NO | It steals small creatures for an attack. |
| 45 | The Wrath of Khan | 3 | NEW | NO | NO | It's a three-turn Saga of removal, a rummage and an edict, and as an enchantment it's never discounted. |
| 46 | Class-F Shuttlecraft | 3 | NEW | NO | NO | It's a {3} rock for any colour, and Arcane Signet does that for {2}. |
| 47 | Combadge | 3 | NEW | NO | NO | It makes attackers unblockable, and this deck doesn't attack. |
| 48 | Crystalline Entity | 8 | NEW | NO | NO | It costs eight colourless and destroys all nonartifact creatures, Wanda and Livaan included. |
| 49 | Cybernetic Specialist | 2 | NEW | NO | NO | It's a 2/1 that surveils 1. |
| 50 | Deep Space 9 | 9 | NEW | NO | NO | It costs nine colourless, never discounted. |
| 51 | Engineered Explosives | 0 | REPRINT | NO | NO | Sunburst gives at most one counter in mono-red, so it only hits permanents of mana value 0 or 1. |
| 52 | The Holodeck | 7 | NEW | NO | NO | It costs seven colourless for one permanent a turn from your graveyard. |
| 53 | Isolinear Processor | 2 | NEW | NO | NO | Its colourless mana only pays for artifacts, and its rummage costs {2}. |
| 54 | Replicator | 2 | NEW | NO | NO | It makes a tapped copy of a token for {2}, and a tapped Treasure pays nothing that turn. |
| 55 | Sickbay | 5 | NEW | NO | NO | It costs five colourless for counters scaled by life gained. |
| 56 | Tea, Earl Grey, Hot | 2 | NEW | NO | NO | It's a card-neutral artifact cantrip with no power for Wanda. |
| 57 | Tricorder | 1 | NEW | NO | NO | It gives +1/+1 for {1} plus equip {1}, which is Shuko's +1 with a worse equip, and Shuko left both chain lists on 2026-09-08 as the smallest seed. |
| 58 | Type-2 Phaser | 2 | NEW | NO | NO | It gives +3/+0 but has equip {3} and no auto-attach, so it's five mana before it seeds. That's the "4 mana to do anything" ground Runechanter's Pike left `b4` on. |
| 59 | U.S.S. Cerritos, Following Up | 5 | NEW | NO | NO | It costs five colourless for two 1/1s and a Spacecraft. |
| 60 | U.S.S. Enterprise-D, Galaxy-Class | 3 | NEW | NO | NO | Its impulse needs a sorcery-speed station each turn. |
| 61 | Warp Core | 2 | NEW | NO | NO | It fetches a basic to hand and charges Spacecraft. |
| 62 | Quark's Bar | 0 | NEW | NO | NO | It enters tapped on turns 1 and 2, and it isn't a Mountain for Arena of Glory, Castle Embereth or `v3`'s Valakut. |
| 63 | Spatial Anomaly | 0 | NEW | NO | NO | It's a colourless land whose ability is five mana for 2 damage. |
| 64 | Starfleet Academy | 0 | NEW | NO | NO | Its {5}, {T} ability makes red equal to your creature types, so it turns five colourless into five red only when five colourless sit beside it. Otherwise it's a colourless land in a red slot. See near-misses. |
| 65 | Unexplored Territory | 0 | NEW | NO | NO | It's a colourless land that fetches a tapped Mountain for {1}. |
| 66 | Mountain | 0 | REPRINT | IN | IN | It's a reprint, and `b4` runs 19 while `v3` runs 21. |
| 67 | The Beacon of Kahless | 3 | NEW | NO | NO | It's a {2}{R} rock for any colour. Arcane Signet is the same rock for {2} without a pip, and battlefront needs attacks. |
| 68 | Ferocious Colonist | 2 | NEW | NO | NO | It's a combat creature. |
| 69 | Gagh Slinger | 3 | NEW | NO | NO | It's a Klingon and Warrior tribal card. |
| 70 | Galvanizing Tenor | 4 | NEW | NO | NO | It goads on attack, and this deck doesn't attack. |
| 71 | Glory to the Empire! | 6 | NEW | NO | NO | It makes tokens and grants melee, for a combat deck. |
| 72 | Gnarling Targ | 5 | NEW | NO | NO | It's a Klingon and Warrior attack pump. |
| 73 | Grilka, Widowed Warrior | 6 | NEW | NO | NO | It's a six-mana creature that borrows an opponent's creature for a turn. |
| 74 | Kang, Suspicious Captain | 4 | NEW | NO | NO | It goads itself, and its counters need goaded creatures attacking. |
| 75 | Koloth, Tribble Hunter | 4 | NEW | NO | NO | It gives every player two tokens each turn. |
| 76 | Own the Day | 6 | NEW | NO | NO | It's an extra combat whose discount counts opponents attacked. |
| 77 | Qo'noS Quartermaster | 2 | NEW | NO | NO | Its mana only comes when it attacks. |
| 78 | Ro Laren, Double Agent | 3 | NEW | NO | NO | It deals 2 damage to each opponent once a turn on your second draw, which is chip damage. |
| 79 | Rom and Leeta, Unlikely Pair | 4 | NEW | NO | NO | It makes two tapped Treasures once a turn, which pay nothing that turn, on a four-mana creature. |
| 80 | Class-4 Tactical Cube | 4 | NEW | NO | NO | It costs four colourless for two 1/1 Borg tokens and a Spacecraft. |
| 81 | Command Chair | 6 | NEW | NO | NO | It costs six colourless and enters tapped. |
| 82 | The Guardian of Forever | 3 | NEW | NO | NO | It's a defender that blinks a creature for {4} a use. |
| 83 | I.K.S. Negh'Var, Imperial Flagship | 3 | NEW | NO | NO | It gives Klingons vigilance and needs 10 counters to fly. |
| 84 | Jefferies Tube | 1 | NEW | NO | NO | {4}, {T} to draw a card is too slow, and the rest is unblockability. |
| 85 | K't'inga-Class Battle Cruiser | 3 | NEW | NO | NO | It gives Klingons flying. |
| 86 | K'Vort-Class Raider | 4 | NEW | NO | NO | Hexproof for every creature you control during your turn, for four colourless. Conqueror's Flail already stops their spells on your turn, so it adds only targeted activated abilities. See near-misses. |
| 87 | Planet Killer | 8 | NEW | NO | NO | It costs eight colourless. |
| 88 | Queen's Diamond | 4 | NEW | NO | NO | Its mana only casts your commander and needs charge counters first. |
| 89 | Reconnaissance Partition | 4 | NEW | NO | NO | It costs four colourless for two land-or-card activations. |
| 90 | S.S. Botany Bay | 3 | NEW | NO | NO | It's one card of graveyard hate a turn, and your graveyard is your second chain. |
| 91 | Starfleet Communicator | 3 | NEW | NO | NO | It draws only on attack. |
| 92 | Starship Enterprise | 5 | NEW | NO | NO | Wanda stations it in one tap, but its draw needs combat damage. |
| 93 | The Sword of Kahless | 4 | NEW | NO | NO | It gives +2/+2 for {4} plus equip {2}, and its attack trigger finds Klingons and Warriors. |
| 94 | U.S.S. Defiant, Mirror Migrant | 2 | NEW | NO | NO | Cast at flash speed for {2}, it phases out Wanda with her Equipment until your next turn. It's one use, and the five protection cards already cover targeted removal and destroy. See near-misses. |
| 95 | U.S.S. Defiant, Tough Little Ship | 6 | NEW | NO | NO | It costs six colourless for one artifact or enchantment kill. |
| 96 | U.S.S. Enterprise-C, Time-Tossed | 5 | NEW | NO | NO | It costs five colourless to wheel your own hand, and Wheel of Fortune does more for {2}{R}. |
| 97 | U.S.S. Farragut, Bold Explorer | 6 | NEW | NO | NO | It cheats creatures in on land drops. |
| 98 | U.S.S. Prometheus, Prototype | 5 | NEW | NO | NO | It copies combat damage. |
| 99 | U.S.S. Stargazer, Here and There | 3 | NEW | NO | NO | It makes an attack token. |
| 100 | Defense Force Aggressor | 1 | NEW | NO | NO | It's a vanilla 2/1. |
| 101 | Direct Hit | 3 | NEW | NO | NO | It deals 5 to a creature for {2}{R}, never discounted. |
| 102 | Gin'tak Charge | 1 | NEW | NO | NO | It deals 2 damage for {R}. |
| 103 | Kruge, Genesis Seeker | 3 | NEW | NO | NO | It's a Klingon attack pump. |
| 104 | Mek'leth Berserker | 4 | NEW | NO | NO | It's a vanilla 4/3 with menace. |
| 105 | Warship Flight Crew | 2 | NEW | NO | NO | It's a vanilla 2/2. |
| 106 | Disruptor Pistol | 2 | NEW | NO | NO | It costs {4} and a sacrifice for 5 to a creature. |
| 107 | Kirk, Enterprising Captain | 4 | NEW | NO | NO | It impulses a card on attack. |
| 108 | Klingon Strike Force | 5 | NEW | NO | NO | It's a 5/5 haste trampler. |
| 109 | Abrade | 2 | REPRINT | NO | NO | It left on 2026-08-06 because Wanda never discounts mana value 2 and 3 damage kills little. Both grounds still hold, and Fiery Confluence and Untimely Malfunction cover artifacts in both lists. |
| 110 | Chain Reaction | 4 | REPRINT | NO | NO | X is every creature on the battlefield, so on a crowded board it kills Wanda and Livaan. See traps. |
| 111 | Combat Celebrant | 3 | REPRINT | NO | NO | It adds an extra combat, and this deck doesn't attack. |
| 112 | Disrupt Decorum | 4 | REPRINT | NO | SIDE | It costs {R}{R} with Wanda out, so the 2026-09-08 "too slow for a turn-5 plan" ground no longer holds. In `v3` it covers the recorded "no deterrent to being attacked" hole for the cycle before the kill turn. It benches over Vandalblast in `v3`, and `b4` kills before most opponents attack. |
| 113 | Professional Face-Breaker | 3 | REPRINT | NO | NO | Its Treasures need combat damage. |
| 114 | Shared Animosity | 3 | REPRINT | NO | NO | It's an attack pump. |
| 115 | Thrill of Possibility | 2 | REPRINT | NO | NO | It's discard one, draw two at mana value 2, never discounted (the 2026-07-30 grounds). Big Score and Unexpected Windfall do it and add two Treasures. |
| 116 | World at War | 5 | REPRINT | NO | NO | It adds an extra combat, and this deck doesn't attack. |
| 117 | Alhammarret's Archive | 5 | REPRINT | NO | NO | It costs five colourless and does nothing the turn it lands. Cute line for the record: Wheel of Fortune draws 14 with it out. |
| 118 | Arcane Signet | 2 | REPRINT | NO | IN | `v3` runs it. In `b4` it's one red a turn for {2}, while the moxen give one red for {0}, and the fast-mana role is protected. |
| 119 | Astral Cornucopia | 0 | REPRINT | NO | NO | At X = 1 it's {3} for one red a turn, worse than Arcane Signet. At X = 2 it's six mana. |
| 120 | Commander's Sphere | 3 | REPRINT | NO | NO | It's Arcane Signet for one more mana. |
| 121 | Darksteel Plate | 3 | REPRINT | NO | NO | It's a second indestructible source at five mana with no flash, and Mithril Coat already does this. |
| 122 | Door of Destinies | 4 | REPRINT | NO | NO | It counts spells of one creature type. |
| 123 | Everflowing Chalice | 0 | REPRINT | NO | NO | Colourless mana doesn't pay pips. |
| 124 | Forsaken Monument | 5 | REPRINT | NO | NO | It doubles colourless mana, which doesn't pay pips. |
| 125 | Hedron Archive | 4 | REPRINT | NO | NO | It's a four-mana colourless rock. |
| 126 | Herald's Horn | 3 | REPRINT | NO | NO | It's a creature-type tribal card. |
| 127 | Howling Mine | 2 | REPRINT | NO | NO | Every opponent draws the same extra card. |
| 128 | The Immortal Sun | 6 | REPRINT | NO | NO | It costs six colourless. See traps. |
| 129 | Lightning Greaves | 2 | REPRINT | NO | NO | It's a trap, because shroud stops you targeting Wanda (the Whispersilk Cloak grounds). |
| 130 | Mind Stone | 2 | REPRINT | NO | NO | It left on 2026-08-07 as the colourless rock whose mana doesn't bank under Electro or Ashling. That still holds. |
| 131 | Skullclamp | 1 | REPRINT | NO | NO | +1 power on Wanda for {1} plus equip {1}, and it draws only when your own creatures die. Neither list has fodder. |
| 132 | Sol Ring | 1 | REPRINT | IN | IN | It's a reprint, and both lists run it. |
| 133 | Stonespeaker Crystal | 4 | REPRINT | NO | NO | It's a four-mana colourless rock. |
| 134 | Swiftfoot Boots | 2 | REPRINT | NO | NO | Champion's Helm gives Wanda the same hexproof plus +2/+2, and The Fire Crystal already grants haste. |
| 135 | Sword of Light and Shadow | 3 | REPRINT | NO | NO | +2/+2 and protection from two colours for five mana. Commander's Plate gives +3/+3 and protection from four. |
| 136 | Thought Vessel | 2 | REPRINT | NO | NO | It was hard-cut on 2026-08-07 because it's colourless and its hand-size clause is blank in a deck that empties its hand. |
| 137 | Unwinding Clock | 4 | REPRINT | NO | NO | It untaps artifacts on other players' turns, when their mana empties. |
| 138 | Wayfarer's Bauble | 1 | REPRINT | NO | NO | It's land ramp for {2}. |
| 139 | Command Beacon | 0 | REPRINT | NO | NO | It's a colourless land. |
| 140 | Command Tower | 0 | REPRINT | NO | NO | It only makes {R}, and it isn't a Mountain. |
| 141 | Evolving Wilds | 0 | REPRINT | NO | NO | It's a tapped Mountain. |
| 142 | Exotic Orchard | 0 | REPRINT | NO | NO | It makes red only if an opponent's land does. |
| 143 | Fabled Passage | 0 | REPRINT | NO | NO | It's a tapped Mountain on turns 1 to 3. |
| 144 | Mutavault | 0 | REPRINT | NO | NO | It's a colourless land. |
| 145 | Path of Ancestry | 0 | REPRINT | NO | NO | It enters tapped. |
| 146 | Reliquary Tower | 0 | REPRINT | NO | NO | It's a colourless land, and the deck empties its hand. |
| 147 | Rogue's Passage | 0 | REPRINT | NO | IN | `v3` runs it. `b4` cut it at the 2026-09-08 rebuild as colourless utility, and a turn-3 plan doesn't attack. |
| 148 | Spire of Industry | 0 | REPRINT | NO | NO | It makes red for 1 life with an artifact out, which a Mountain does for free. |
| 149 | Temple of the False God | 0 | REPRINT | NO | NO | It needs five lands. |
| 150 | Terramorphic Expanse | 0 | REPRINT | NO | NO | It's a tapped Mountain. |
| 151 | Run Amok | 2 | REPRINT | NO | NO | It only pumps an attacking creature. |

---

## Proposed swaps

### Infinite Diversity in for Solphim (`b4`)

**In.** [Infinite Diversity](https://scryfall.com/search?q=%21%22Infinite+Diversity%22), {7}{R}{R} Sorcery, mana value 9: *"Federation — Exile target instant
or sorcery card from your graveyard. Copy that card X times, where X is the number of creature types
among non-Borg creatures you control. You may cast the copies without paying their mana costs. Exile
Infinite Diversity."*

**Out.** [Solphim, Mayhem Dominus](https://scryfall.com/search?q=%21%22Solphim%2C+Mayhem+Dominus%22), {2}{R}{R} Legendary Creature, 5/4: *"If a source you control
would deal noncombat damage to an opponent or a permanent an opponent controls, it deals double that
damage to that player or permanent instead. {1}{R/P}{R/P}, Discard two cards: Put an indestructible
counter on Solphim."*

**Deciding axis (§2.3).** What the card does on the turn the chain runs short of red pips or cards,
and whether it has to be on the battlefield already to do it.

**Cost in this deck (§1.2).** Wanda discounts sorceries of mana value 4 or more, and Ruby Medallion,
The Fire Crystal, Longshot and Artist's Talent level 2 each take {1} more. So it costs {R}{R} once
Wanda's power plus those reducers reaches 7, which is after one pump on most kill turns. At her base
power 2 with no reducer it costs {5}{R}{R}, so it's a dead card before the chain starts. That's the
same profile as [Apex of Power](https://scryfall.com/search?q=%21%22Apex+of+Power%22) (mana value 10), which the pilot took on 2026-09-16. Livaan gives
Wanda +9 as it's cast.

**What it does here.**

- Its X is 5 with Wanda and Livaan alone, and 6 to 8 with an engine out.
- Its copies are cast from exile (CR 707.12, ledger zone-010), so each one triggers Livaan, Birgi,
  Electro, Storm-Kiln Artist, Ashling and Longshot.
- A copy of an X-spell has X = 0 (CR 107.3b), but 32 of `b4`'s 41 instants and sorceries (counting
  the two land MDFCs) have no X (ledger eval-063). A copy of Big Score or Unexpected Windfall still
  costs a discard (CR 118.9d).
- Five copies of [Seething Song](https://scryfall.com/search?q=%21%22Seething+Song%22) are 25 red, of [Pyretic Ritual](https://scryfall.com/search?q=%21%22Pyretic+Ritual%22) or [Desperate Ritual](https://scryfall.com/search?q=%21%22Desperate+Ritual%22) 15 red,
  and of [Jeska's Will](https://scryfall.com/search?q=%21%22Jeska's+Will%22) (both modes with Wanda out) 15 cards plus five times the red for one
  opponent's hand. Five copies of [Inspired Tinkering](https://scryfall.com/search?q=%21%22Inspired+Tinkering%22) are 15 cards and 15 Treasures, of
  [Fiery Confluence](https://scryfall.com/search?q=%21%22Fiery+Confluence%22) 30 to each opponent, and of [Soul's Fire](https://scryfall.com/search?q=%21%22Soul's+Fire%22) Wanda's power to five targets.

**Modelled kill turn** (turn 3, three Mountains and [Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22), Wanda and Livaan out, no seed and no
Ruby, with a hand of [Pyretic Ritual](https://scryfall.com/search?q=%21%22Pyretic+Ritual%22), [Lunar Frenzy](https://scryfall.com/search?q=%21%22Lunar+Frenzy%22), [Jaya's Immolating Inferno](https://scryfall.com/search?q=%21%22Jaya's+Immolating+Inferno%22)):

| Step | Pays | Wanda's power | Pool after |
|---|---|---|---|
| Pyretic Ritual | {1}{R} | 2 + 2 = 4 | 5 red, 1 colourless |
| Lunar Frenzy, X = 4 (mana value 5) | {R} | 4 + 4 + 5 = 13 | 4 red, 1 colourless |
| Without Infinite Diversity: Jaya's, X = 13 + 3 spare | {R}{R} | | 16 to each of three. Not lethal. Solphim makes it 32, still not lethal. |
| With Infinite Diversity, X = 5, copying Pyretic Ritual | {R}{R} | 13 + 9 + (5 × 2) = 32 | 17 red, 1 colourless |
| Then Jaya's, X = 32 + 16 spare | {R}{R} | | 48 to each of three. Lethal. |

With [Bonesplitter](https://scryfall.com/search?q=%21%22Bonesplitter%22) on Wanda the same hand reads 22 without it, 44 with Solphim and 54 with
Infinite Diversity. So both cards cover the seeded case. Only Infinite Diversity covers the unseeded
one, and it does it from hand instead of from a creature that had to be cast on an earlier turn and
survive.

**Why Solphim is the cut (§2.1, closers role, target 2 to 3 from `turn-5-chain-2026-09-08.md` §7,
currently 4).**

| Card | Cost under Ruby | Kill-turn job | Livaan sees it | Unique |
|---|---|---|---|---|
| Chandra's Ignition | {R}{R} at Wanda's power 3 | Wanda's power to each opponent and each other creature | yes, +5 | the non-targeting finisher (beats player hexproof) |
| Longshot, Rebel Bowman | {2}{R} | {1} off every noncreature spell, 2 to each opponent per noncreature spell | no | a reducer |
| Soul's Fire | {1}{R}, {R} with two reducers | Wanda's power to any target, each copy retargets | yes, +3 | instant-speed finisher, on trial |
| Solphim, Mayhem Dominus | {1}{R}{R} | doubles noncombat damage to opponents | no | the half-assembled-chain hedge |

Solphim is last. Ledger dmg-019 (recorded from this deck) says a damage multiplier is dead weight
where the damage is exponential, and that the slot belongs to whatever extends the engine. The
2026-09-08 entry that put Solphim into the chain build said the same thing about its narrow band:
*"in that band it is competing with a cheap seed that would have prevented the problem."* Infinite
Diversity extends the engine, with red pips or cards, in a wider band than Solphim's.

**Checks.**

- Grep (eval-011, tool-019). Infinite Diversity's words are "instant or sorcery card", "creature
  types" and "cast". Solphim's text has none of them. Solphim is two creature types (Phyrexian,
  Horror), so the swap lowers Infinite Diversity's X by 2 on a board where Solphim would have been
  out. Solphim's records are the 2026-08-04 sideboard row (written for the grind list), the
  2026-09-08 V3 entry, and the 2026-10-13 Pirate's Pillage entry, which considered him as a cut.
- Self-hits (§1.3): none. It only touches your own graveyard. It needs a legal target (CR 601.2c),
  so it can't be cast with no instant or sorcery in your graveyard. It exiles the card it copies, so
  Past in Flames and Underworld Breach lose that card, and it exiles itself, so neither can recast it.
- Loops: none new. Cute lines: Storm King's Thunder copying it makes each copy exile a different
  card and copy it X times, and under Bonus Round every cast copy is copied again.
- Against [Mizzix's Mastery](https://scryfall.com/search?q=%21%22Mizzix's+Mastery%22), held in the `b4` sideboard since this morning: Mastery's overload
  copies every card in the graveyard once, and Infinite Diversity copies one card five times. On a
  turn-3 graveyard of one or two rituals, five copies of one ritual make more red. Mastery doesn't
  need Wanda at 7. The pilot may want to re-order that held row, which this review leaves alone.

**Other cuts considered.**

- [Neheb, the Eternal](https://scryfall.com/search?q=%21%22Neheb%2C+the+Eternal%22). The engines role holds 6 against a target of 3 to 4, and the 2026-10-13
  entry nominated him for Pirate's Pillage. He stays because the pilot asked for him on 2026-09-16,
  and his postcombat mana is a different hedge (it needs a recast card, where Solphim needs none).
  He's the runner-up if the pilot would rather keep Solphim.
- [Unleash Fury](https://scryfall.com/search?q=%21%22Unleash+Fury%22). Doublers sit at 10, the floor of the 10 to 12 target, and Twinning Staff and
  Mizzix's Mastery are already queued for its slot.
- [Bonus Round](https://scryfall.com/search?q=%21%22Bonus+Round%22) and [Increasing Vengeance](https://scryfall.com/search?q=%21%22Increasing+Vengeance%22). Copy and recur is over its target (8 against 5 to 6),
  but both start the Increasing Vengeance loop (ledger loop-017), and Bonus Round is on trial.
- [Runaway Steam-Kin](https://scryfall.com/search?q=%21%22Runaway+Steam-Kin%22) (on trial) and [Champion's Helm](https://scryfall.com/search?q=%21%22Champion's+Helm%22) (Hexing Squelcher's waiting slot) are the
  pilot's calls after play.
- Fast mana and cantrip fuel are protected, so none was nominated.

**Effect on the list.** Average mana value 2.70 → 2.77, MV ≤ 2 stays 36, MV ≤ 3 stays 54 (nonland
cards, commander included, the same count `deck:show` prints). Infinite Diversity counts as 9 but
costs {R}{R} on the turn it's cast. Copy and recur 8 → 9, Damage conversion & closers 4 → 3,
creatures 12 → 11. Draw stays at 9 of the pilot's 8 to 10 aim, and Infinite Diversity copying a draw
spell is a conditional tenth. Game Changers stay at 9.

### Lwaxana Troi in for Solphim (`v3`)

**In.** [Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22), {1}{R} Legendary Creature, 2/2: *"You may choose not to
untap Lwaxana Troi during your untap step. {2}, {T}: Choose another target creature you control. For
as long as Lwaxana Troi remains tapped, if a triggered ability of that creature triggers, that
ability triggers an additional time."*

**Out.** [Solphim, Mayhem Dominus](https://scryfall.com/search?q=%21%22Solphim%2C+Mayhem+Dominus%22) (text above).

**Deciding axis (§2.3).** Whether the card multiplies the chain's inputs (Wanda's power and red
pips) or its output, and what it does on the turns before the kill, where `v3`'s recorded losses
are. The pilot's 2026-09-08 counter on Arcane Bombardment was that the chain build loses to grind
and interaction rather than running out of damage.

**Cost in this deck.** {R} under Ruby Medallion or The Fire Crystal. The activation is {2} of any
colour, so Sol Ring and Arcane Signet pay it, and it's instant speed. She needs one turn to lose
summoning sickness (her ability has {T}) unless The Fire Crystal or Arena of Glory's haste mana is
out. Once tapped she stays tapped, so the doubling lasts until you choose to untap her (CR 502.3).

**What she doubles in `v3`.** CR 603.2d covers each of these, and none carries a "triggers only once each
turn" cap (ledger trig-020).

- [Livaan, Cultist of Tiamat](https://scryfall.com/search?q=%21%22Livaan%2C+Cultist+of+Tiamat%22): every noncreature spell pumps Wanda by twice its mana value. A
  Lunar Frenzy at Wanda's power W makes her 4W + 2 instead of 3W + 1, and Storm King's Thunder makes
  her 3W + 6 instead of 2W + 3.
- [Wiccan, Young Avenger](https://scryfall.com/search?q=%21%22Wiccan%2C+Young+Avenger%22): two impulse cards per noncreature spell, which is the grind-game refuel
  `v3` needs.
- [Thor, God of Thunder](https://scryfall.com/search?q=%21%22Thor%2C+God+of+Thunder%22): twice the spell's mana value as damage per noncreature spell, and the
  chain inflates mana value.
- [Urabrask](https://scryfall.com/search?q=%21%22Urabrask%22), [The Vision and Scarlet Witch](https://scryfall.com/search?q=%21%22The+Vision+and+Scarlet+Witch%22) and [Electro, Assaulting Battery](https://scryfall.com/search?q=%21%22Electro%2C+Assaulting+Battery%22): two red per
  spell, so a second pip per cast on the chain turn.
- [Storm-Kiln Artist](https://scryfall.com/search?q=%21%22Storm-Kiln+Artist%22): two Treasures per instant or sorcery cast or copied, and the existing
  Increasing Vengeance loop (ledger loop-017) makes two per step.

**Modelled half-assembled chains** (Storm King's Thunder into Jaya's Immolating Inferno, pips only,
the `turn-5-chain-2026-09-08.md` model):

| Start | Bare chain | With Solphim | With Lwaxana on Livaan |
|---|---|---|---|
| Wanda 2, no reducer | 21 each | 42 each | 36 each |
| Wanda 2, Ruby out | 36 each | 72 each | 60 each |
| Wanda 2, one mana value 2 spell cast first | 55 each | 110 each | 168 each |

The case against, stated plainly: in the barest row Solphim kills (42 against 40 life) and Lwaxana
doesn't (36). In every other row both kill. Solphim also doubles Thor, Longshot, Urabrask, Valakut,
Fiery Confluence and Chandra's Ignition all at once, needs no activation, and is a 5/4 that can get
an indestructible counter.

**Why Lwaxana wins the slot anyway.** Ledger dmg-019 says a multiplier on exponential damage loses
to whatever extends the engine, and Lwaxana extends both of the chain's limits, Wanda's power and
red pips. On the turns before the kill, Solphim does nothing until damage is dealt, while Lwaxana on
Wiccan or Urabrask is card advantage or mana every turn. She also lowers the curve by two.

**Why Solphim is the cut (§2.1, closers role, target 2 to 3, currently 4).**

| Card | Cost under Ruby | Kill-turn job | Livaan sees it | Unique |
|---|---|---|---|---|
| Chandra's Ignition | {R}{R} at Wanda's power 3 | Wanda's power to each opponent and each other creature | yes, +5 | the non-targeting finisher |
| Thor, God of Thunder | {2}{R}{R} | spell mana value as damage per noncreature spell, 5/5 flier | no | replays an instant, sorcery or Equipment from the graveyard |
| Longshot, Rebel Bowman | {2}{R} | {1} off noncreature spells, 2 to each opponent per noncreature spell | no | a reducer |
| Solphim, Mayhem Dominus | {1}{R}{R} | doubles noncombat damage to opponents | no | the half-assembled-chain hedge |

**Checks.**

- Grep (eval-011, tool-019). Lwaxana's words are "triggered ability" and "triggers". Solphim has
  only a replacement effect and an activated ability, so she couldn't double him, and no `v3` card
  loses a payoff. What the swap loses is the stack of both: Lwaxana doubling Thor's trigger with
  Solphim doubling each hit would have been four times the damage. Solphim's records are as for `b4`.
- Self-hits (§1.3). Fiery Confluence's creature mode chosen twice kills her, so pick the opponent and
  artifact modes while she or Livaan is out (the same instruction the 2026-10-13 entry gave for
  Steam-Kin). Chandra's Ignition kills her, which is fine because it's the finisher. She turns
  nothing in the list off.
- Bonus: she's a sensible carrier for Conqueror's Flail, which the 2026-08-19 note keeps off Wanda,
  because she stays tapped and never attacks anyway.
- Loops: none new. `v3` runs no Reiterate, and the existing Increasing Vengeance loop only gets
  faster. Bracket 3 is unaffected.

**Other cuts considered.**

- [Twinferno](https://scryfall.com/search?q=%21%22Twinferno%22), the 2026-09-08 "cut that costs nothing structural". Re-derived: under Ruby it's a
  one-pip copier, and copying Storm King's Thunder doubles the finisher's copies. Copiers sit at 6
  against a target of 5 to 6, so it isn't surplus enough to lose.
- [Titan's Strength](https://scryfall.com/search?q=%21%22Titan's+Strength%22). It's the one pump that works at Wanda's base power with only red mana, the
  reason it was kept on 2026-09-08.
- [Pyromancer's Goggles](https://scryfall.com/search?q=%21%22Pyromancer's+Goggles%22). Copy and recur is over by one, but Goggles repeats every turn in a grind
  game. It's the bench pointer for Infinite Diversity below instead.
- Urabrask and The Vision are engines Lwaxana doubles, so they aren't cuts (eval-011).

**Effect on the list.** Average mana value 2.77 → 2.74, MV ≤ 2 35 → 36, MV ≤ 3 48 → 49. The pump
engine 1 → 2, Damage conversion & closers 4 → 3, creatures unchanged at 11. Draw unchanged. Game
Changers stay at 3.

---

## Bench

| Card | List | Displaces | Grounds |
|---|---|---|---|
| Lwaxana Troi, Charming Guest | b4 | Runaway Steam-Kin, if its trial ends | Both are {R} under Ruby. Steam-Kin makes one red per red spell. Lwaxana's {2} activation, paid with the colourless mana `b4` has in surplus (2026-10-10), doubles Birgi or Electro to two red per spell, Storm-Kiln Artist to two Treasures per cast or copy, or Livaan to roughly tripling Wanda per link. She's also a legendary red creature, so Mox Amber stays on if Wanda dies. Bench rather than MAIN because on a turn-3 clock she needs a turn to lose summoning sickness unless The Fire Crystal is out, she's a bare multiplier until another engine lands, and the engines role already holds 6 against 3 to 4. With Birgi out, the existing Reiterate, Seething Song and Ruby Medallion loop (ledger loop-018) already nets one red a step from Birgi's trigger, and Lwaxana on Birgi makes it two. It stays chosen-N. |
| Dominion Infiltration | b4 | Unleash Fury | The pilot's own hold (2026-11-10) says "the weakest seed or pump at the time", and Unleash Fury is Bulk Up without the flashback. New fact for that row: X can't exceed the number of creatures opponents control (CR 601.2c, distinct targets), so as a Livaan link it costs three pips and caps at the opposing board. Its value is the copies' enter abilities and one hasty swing. Unleash Fury's slot already has Twinning Staff and Mizzix's Mastery queued, and this ranks third there. |
| Infinite Diversity | v3 | Pyromancer's Goggles | The same card as the `b4` MAIN, and `v3`'s turn-5 graveyard and wider creature base (Wiccan, Thor, Urabrask) give it a larger X. Goggles costs five colourless on an earlier turn for one red and one copy a turn, and Infinite Diversity costs {R}{R} on the kill turn for five copies. Bench rather than MAIN because `v3` already recasts its graveyard three ways (Arcane Bombardment, Past in Flames, Will of the Jeskai), Goggles keeps paying in the grind games `v3` is built to survive, and Lwaxana takes this pass's slot. |
| Dominion Infiltration | v3 | Bionic Blow | Bionic Blow is `v3`'s one X-spell that answers a creature. Dominion Infiltration uses opposing creatures instead, copying X of them with haste and their enter abilities. Turn-5 boards are bigger, so its X cap bites less than in `b4`. It's a pod swap for tables whose creatures are worth copying. |
| Disrupt Decorum | v3 | Vandalblast | It's {2}{R}{R} at mana value 4, so it costs {R}{R} with Wanda out at any power, and Livaan gives +4. The 2026-09-08 rejection filed it as "too slow for a turn-5 plan", which no longer holds at {R}{R}. Cast on turn 4, its goad lasts until your next turn and covers the one cycle before the kill. That fills the hole the 2026-09-08 Kazuul entry recorded: "V3 now has no deterrent to being attacked at all." Vandalblast was never cast in the pilot's `b4` games, and Fiery Confluence and Untimely Malfunction keep single-artifact removal in `v3`. Its overload is the only answer to a wide artifact board, so this is a swap for creature-heavy pods, not a MAIN. |

---

## Near-misses and traps

### Near-misses

- [Khaaaaaaaaaaaannn!](https://scryfall.com/search?q=%21%22Khaaaaaaaaaaaannn%21%22) is one-pip instant removal that deals twice X damage to a creature and exiles
  it if it would die, and it's a Livaan link worth Wanda's power plus one. `b4`'s interaction is at 3 against a 4 to 5 target, so
  it's the first card to look at if removal is wanted. As a link it is half a [Lunar Frenzy](https://scryfall.com/search?q=%21%22Lunar+Frenzy%22).
- [Reckless Impulse](https://scryfall.com/search?q=%21%22Reckless+Impulse%22) gives two cards from an empty hand for one pip under Ruby. `b4`'s draw is at 9
  and Inspired Tinkering filled the empty-hand gap on 2026-10-13. `v3`'s cheap refuel slots (Fists of
  Flame, Blazing Crescendo, Titan's Strength) also seed Wanda, and this doesn't.
- [U.S.S. Defiant, Mirror Migrant](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Mirror+Migrant%22) costs {2} with flash, and its entry phases out Wanda and her Equipment
  until your next turn, which beats exile, bounce and wraths on opponents' turns. The existing protection covers
  targeted removal (Champion's Helm, Commander's Plate, Deflecting Swat) and destroy (Mithril Coat,
  Tyrite Sanctum). This is the card if mass exile starts costing games.
- [Starfleet Academy](https://scryfall.com/search?q=%21%22Starfleet+Academy%22) turns five colourless into five or more red with Wanda and Livaan out. `b4`
  rarely has five colourless beside it by turn 3 without both Sol Ring and Mana Vault.
- [K'Vort-Class Raider](https://scryfall.com/search?q=%21%22K'Vort-Class+Raider%22) gives every creature you control hexproof during your turn, so it also
  covers Livaan against targeted activated abilities on the chain turn, which Conqueror's Flail
  doesn't stop. It costs four colourless, and Flail already stops their spells.
- [Arcane Signet](https://scryfall.com/search?q=%21%22Arcane+Signet%22) for `b4` is a red-producing rock in a list short of red, but it's a two-mana rock
  in a role of zero-mana ones.

### Traps

- [Quark, Humble Proprietor](https://scryfall.com/search?q=%21%22Quark%2C+Humble+Proprietor%22) reads like a Treasure engine. "You can't sacrifice Treasure tokens"
  means no Treasure can pay for anything while it's out, so it switches off Storm-Kiln Artist, Big
  Score, Unexpected Windfall, Inspired Tinkering and Mines of Moria.
- [Lightning Greaves](https://scryfall.com/search?q=%21%22Lightning+Greaves%22) grants shroud (CR 702.18a), which stops you targeting Wanda with Livaan, Lunar
  Frenzy, Frantic Confrontation and Chandra's Ignition. That's the Whispersilk Cloak hard cut again.
- [Brazen Bluff](https://scryfall.com/search?q=%21%22Brazen+Bluff%22) reads like a free spell. It needs an opponent's noncreature spell as its target,
  the opponent chooses whether you get the free cast, and a free X-spell has X = 0. Cute line for the
  record: with Electro or Ashling out, a free [Apex of Power](https://scryfall.com/search?q=%21%22Apex+of+Power%22) is cast from hand, so its ten red
  banks into your turn.
- [Chain Reaction](https://scryfall.com/search?q=%21%22Chain+Reaction%22) deals damage equal to the number of creatures to each creature, so it kills
  Wanda and Livaan on any board big enough to matter.
- [The Immortal Sun](https://scryfall.com/search?q=%21%22The+Immortal+Sun%22) reads like Ruby Medallion, a seed and a draw engine in one. It's six colourless
  that Wanda never discounts, on a turn-3 or turn-5 clock.
- [Infinite Diversity](https://scryfall.com/search?q=%21%22Infinite+Diversity%22) with [Dominion Infiltration](https://scryfall.com/search?q=%21%22Dominion+Infiltration%22)'s changeling copies looks like an infinite X.
  Changeling makes them Borg too, and Federation only counts non-Borg creatures. [Mutavault](https://scryfall.com/search?q=%21%22Mutavault%22) fails
  the same way.
- [Command Tower](https://scryfall.com/search?q=%21%22Command+Tower%22), [Exotic Orchard](https://scryfall.com/search?q=%21%22Exotic+Orchard%22) and [Quark's Bar](https://scryfall.com/search?q=%21%22Quark's+Bar%22) make red but aren't Mountains, so in `v3`
  they weaken Valakut, Arena of Glory and Castle Embereth.
- [Captain's Tutelage](https://scryfall.com/search?q=%21%22Captain's+Tutelage%22) reads like a cheap seed, but an Aura falls off for good when Wanda dies,
  where Equipment stays to re-attach.
- [Encounter the Unknown](https://scryfall.com/search?q=%21%22Encounter+the+Unknown%22)'s sweeper mode deals 2 to each creature and each player, so it kills your
  own Storm-Kiln Artist, and Runaway Steam-Kin in `b4`.
