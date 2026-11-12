# TRK and TRC set review: Captain America, First Avenger (2026-11-10)

## Header

- **Sets.** Star Trek (TRK, 311 cards) and Star Trek Commander (TRC, 336 cards). Both release on 2026-11-13. Scryfall already lists every card in both as Commander-legal, so no card is waiting on a legality update.
- **Deck and lists.** `captain-america`, [Captain America, First Avenger](https://scryfall.com/search?q=%21%22Captain+America%2C+First+Avenger%22) ({R}{W}{U}), an Equipment voltron deck around Throw. Only `main` gets verdicts, and it's also the target list.
- **Method.** deck-brain `SKILL.md` §1 and §2, following `.claude/skills/set-review/reviewer.md`. Set cards' oracle text comes from `data/trk-candidates-captain-america.json` and `data/trc-candidates-captain-america.json`. The deck's own cards come from the bundle's `oracle.txt`, and rules come from `rules/sections/` (CR 2026-08-07). I read `research/decisions.md` in full, the 2026-09-28 FRA review and the captain-america section of `decks/_notes.md`. The deck has no `research/sideboard.md`. I checked each candidate's rules text, not only its name, against the decision log (ledger tool-017), and gave reprints the same reading as new cards (tool-007).
- **The commander's two abilities**, which every verdict is scored against:
  - Throw: "{3}, Unattach an Equipment from Captain America: He deals damage equal to that Equipment's mana value divided as you choose among one, two, or three targets." [Zirda, the Dawnwaker](https://scryfall.com/search?q=%21%22Zirda%2C+the+Dawnwaker%22) or [Training Grounds](https://scryfall.com/search?q=%21%22Training+Grounds%22) bring the cost to {1}.
  - Catch: "At the beginning of combat on your turn, attach up to one target Equipment you control to Captain America."
- **EDHREC.** Neither set has EDHREC data yet, so this review skips that lens (deck-brain §2.2).
- **Game Changers.** 3 before ([Enlightened Tutor](https://scryfall.com/search?q=%21%22Enlightened+Tutor%22), [Fierce Guardianship](https://scryfall.com/search?q=%21%22Fierce+Guardianship%22), [Teferi's Protection](https://scryfall.com/search?q=%21%22Teferi's+Protection%22)) and 3 after. Neither set has a Game Changer.
- **Card draw.** The 99 has 7 draw sources today, one short of the pilot's aim of 8 to 10: [Sram, Senior Edificer](https://scryfall.com/search?q=%21%22Sram%2C+Senior+Edificer%22), [The Mighty Thor, Jane Foster](https://scryfall.com/search?q=%21%22The+Mighty+Thor%2C+Jane+Foster%22), [Puresteel Paladin](https://scryfall.com/search?q=%21%22Puresteel+Paladin%22), [Swordsman's Steel](https://scryfall.com/search?q=%21%22Swordsman's+Steel%22), [Buster Sword](https://scryfall.com/search?q=%21%22Buster+Sword%22), [Akiri, Fearless Voyager](https://scryfall.com/search?q=%21%22Akiri%2C+Fearless+Voyager%22) and [Esper Sentinel](https://scryfall.com/search?q=%21%22Esper+Sentinel%22).

## Pool

- 408 cards fit Jeskai and are Commander-legal: 176 from TRK and 232 from TRC. No card appears in both pool files.
- 300 are new and 108 are reprints (8 in TRK, 100 in TRC).
- 20 are already in `main`, all of them reprints: 12 lands ([Hallowed Fountain](https://scryfall.com/search?q=%21%22Hallowed+Fountain%22), [Sacred Foundry](https://scryfall.com/search?q=%21%22Sacred+Foundry%22), [Steam Vents](https://scryfall.com/search?q=%21%22Steam+Vents%22), [Plains](https://scryfall.com/search?q=%21%22Plains%22), [Island](https://scryfall.com/search?q=%21%22Island%22), [Mountain](https://scryfall.com/search?q=%21%22Mountain%22), [Academy Ruins](https://scryfall.com/search?q=%21%22Academy+Ruins%22), [Battlefield Forge](https://scryfall.com/search?q=%21%22Battlefield+Forge%22), [Command Tower](https://scryfall.com/search?q=%21%22Command+Tower%22), [Rogue's Passage](https://scryfall.com/search?q=%21%22Rogue's+Passage%22), [Sea of Clouds](https://scryfall.com/search?q=%21%22Sea+of+Clouds%22), [Training Center](https://scryfall.com/search?q=%21%22Training+Center%22)) and 8 spells ([Dispatch](https://scryfall.com/search?q=%21%22Dispatch%22), [Path to Exile](https://scryfall.com/search?q=%21%22Path+to+Exile%22), [Swords to Plowshares](https://scryfall.com/search?q=%21%22Swords+to+Plowshares%22), [Arcane Signet](https://scryfall.com/search?q=%21%22Arcane+Signet%22), [Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22), [Swiftfoot Boots](https://scryfall.com/search?q=%21%22Swiftfoot+Boots%22), [Talisman of Conviction](https://scryfall.com/search?q=%21%22Talisman+of+Conviction%22), [Talisman of Creativity](https://scryfall.com/search?q=%21%22Talisman+of+Creativity%22)).
- Scryfall lists every card in both sets as Commander-legal already, so no card needs a re-check on release day.

## Result

| List | MAIN | SIDE | IN | NO |
|---|---|---|---|---|
| main (target) | 1 | 11 | 20 | 376 |

MAIN:

- [Anthropological Mission](https://scryfall.com/search?q=%21%22Anthropological+Mission%22) in, [Commander's Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22) out. The swap brings the draw role from 7 sources to 8. [Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22) is the weakest of the 15 cards that protect Cap, and its protection from black and green is a subset of [Sword of Feast and Famine](https://scryfall.com/search?q=%21%22Sword+of+Feast+and+Famine%22)'s.

SIDE, in the order I'd take them:

- [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) would displace [Thorin, Mountain-king](https://scryfall.com/search?q=%21%22Thorin%2C+Mountain-king%22). It untaps the rocks and the three artifact creatures on every opponent's turn, which pays for instant-speed Throws.
- [Seven of Nine, Unassimilated](https://scryfall.com/search?q=%21%22Seven+of+Nine%2C+Unassimilated%22) would displace [Esper Sentinel](https://scryfall.com/search?q=%21%22Esper+Sentinel%22). It draws a card every turn from the fifth land drop, for {1}{U}.
- [Mr. Spock, Science Officer](https://scryfall.com/search?q=%21%22Mr.+Spock%2C+Science+Officer%22) would displace [Esper Sentinel](https://scryfall.com/search?q=%21%22Esper+Sentinel%22). It doubles every draw, the draw step included.
- [Jean-Luc Picard, Luminary](https://scryfall.com/search?q=%21%22Jean-Luc+Picard%2C+Luminary%22) would displace [Esper Sentinel](https://scryfall.com/search?q=%21%22Esper+Sentinel%22). It draws on 26 of the 99 entering.
- [U.S.S. Defiant, Mirror Migrant](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Mirror+Migrant%22) would displace [Commander's Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22) if the pilot wants that slot to stay in protection instead of moving to draw.
- [Starfleet Communicator](https://scryfall.com/search?q=%21%22Starfleet+Communicator%22) would displace [Commander's Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22) if the pilot declines [Mission](https://scryfall.com/search?q=%21%22Anthropological+Mission%22) but wants a draw source that keeps the slot an Equipment.
- [Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22) would displace [Thorin, Mountain-king](https://scryfall.com/search?q=%21%22Thorin%2C+Mountain-king%22) if the pilot passes on the [Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22). It makes Catch trigger twice every combat.
- [Transwarp Hub](https://scryfall.com/search?q=%21%22Transwarp+Hub%22) would displace [Dalakos, Crafter of Wonders](https://scryfall.com/search?q=%21%22Dalakos%2C+Crafter+of+Wonders%22). It finds artifacts and then makes Cap unblockable every turn.
- [Federation Resupply](https://scryfall.com/search?q=%21%22Federation+Resupply%22) would displace [Steelshaper's Gift](https://scryfall.com/search?q=%21%22Steelshaper's+Gift%22). It's two tutors in one card for {1} more.
- [Talisman of Progress](https://scryfall.com/search?q=%21%22Talisman+of+Progress%22) would displace [Axgard Armory](https://scryfall.com/search?q=%21%22Axgard+Armory%22). It's the 2026-09-09 trial cut, and nothing about it has changed.
- [Spire of Industry](https://scryfall.com/search?q=%21%22Spire+of+Industry%22) would displace one basic [Mountain](https://scryfall.com/search?q=%21%22Mountain%22). It makes any colour in a list with 30 artifacts.

## Set mechanics as they matter to this deck

- **Station and Spacecraft.** Spacecraft are artifacts, so they count for metalcraft and for [Excalibur, Sword of Eden](https://scryfall.com/search?q=%21%22Excalibur%2C+Sword+of+Eden%22)'s historic discount. None is an Equipment, so none is Throw fodder, and [Sram, Senior Edificer](https://scryfall.com/search?q=%21%22Sram%2C+Senior+Edificer%22) draws on "Aura, Equipment, or Vehicle" spells, which leaves Spacecraft out. Station taps another creature and adds charge counters equal to its power, at sorcery speed (CR 702.184a). This list's creatures have 1 to 5 power, and Cap tapping to station means Cap doesn't attack, so most thresholds (6+ up to 16+) are out of reach. [Transwarp Hub](https://scryfall.com/search?q=%21%22Transwarp+Hub%22)'s 3+ is the one that matters. [Captain America, Living Legend](https://scryfall.com/search?q=%21%22Captain+America%2C+Living+Legend%22) untaps a creature the first time it taps on your turn, so one station activation per creature costs nothing.
- **Beam me up.** You cast the card from your graveyard for its beam me up cost and return a creature you control to its owner's hand. Returning Cap drops all his Equipment (CR 701.3d), so return a creature with an ETB instead: [Stoneforge Mystic](https://scryfall.com/search?q=%21%22Stoneforge+Mystic%22) tutors again and [Thorin, Mountain-king](https://scryfall.com/search?q=%21%22Thorin%2C+Mountain-king%22) re-attaches everything.
- **Seek out** ("whenever you draw your second card each turn"). The deck draws a second card on most of its own turns once [Sram](https://scryfall.com/search?q=%21%22Sram%2C+Senior+Edificer%22), [Puresteel Paladin](https://scryfall.com/search?q=%21%22Puresteel+Paladin%22) or [The Mighty Thor, Jane Foster](https://scryfall.com/search?q=%21%22The+Mighty+Thor%2C+Jane+Foster%22) is out. The seek-out payoffs in the pool are counters, Faerie tokens, small pings and Treasures, though. [Tom Paris, Risk-Taker](https://scryfall.com/search?q=%21%22Tom+Paris%2C+Risk-Taker%22) is the only one that would matter (team flying and double strike), and it costs six.
- **Strange new worlds** counts differently named lands you control. This manabase has 31 names among 35 lands, so the count runs close to the land count. [Seven of Nine, Unassimilated](https://scryfall.com/search?q=%21%22Seven+of+Nine%2C+Unassimilated%22) is the one card where that matters.
- **Federation** counts creature types among your non-Borg creatures. This list's creatures are mostly Humans, Kor and Dwarves, so X stays at 2 or 3.
- **Communicators.** [Combadge](https://scryfall.com/search?q=%21%22Combadge%22) and [Starfleet Communicator](https://scryfall.com/search?q=%21%22Starfleet+Communicator%22) copy themselves when cast, and the copy becomes a token with the same mana cost (CR 111.13, 608.3f), so each card is two MV 3 Throw payloads. Both permanents enter, so [Puresteel Paladin](https://scryfall.com/search?q=%21%22Puresteel+Paladin%22), [The Mighty Thor](https://scryfall.com/search?q=%21%22The+Mighty+Thor%2C+Jane+Foster%22), [Hammer of Nazahn](https://scryfall.com/search?q=%21%22Hammer+of+Nazahn%22) and [Sigarda's Aid](https://scryfall.com/search?q=%21%22Sigarda's+Aid%22) trigger twice. [Sram](https://scryfall.com/search?q=%21%22Sram%2C+Senior+Edificer%22) triggers once, because a copy of a spell isn't cast (CR 707.10).
- **"Total power 8 or greater" triggers** switch on easily, since Cap with [Colossus Hammer](https://scryfall.com/search?q=%21%22Colossus+Hammer%22) alone has 14 power. Most of their payoffs are counters or small pumps, though.
- **Dilemma and battlefront.** Dilemma counts modal choices, and [Boros Charm](https://scryfall.com/search?q=%21%22Boros+Charm%22) is the deck's only modal spell. Battlefront counts opponents attacked, and Cap usually attacks one.
- **Borg and artifact-creature payoffs** ([Primary Unimatrix Adjunct](https://scryfall.com/search?q=%21%22Primary+Unimatrix+Adjunct%22), [Co-Option Adjutant](https://scryfall.com/search?q=%21%22Co-Option+Adjutant%22), [Borg Incursion](https://scryfall.com/search?q=%21%22Borg+Incursion%22), [Supplementation Node](https://scryfall.com/search?q=%21%22Supplementation+Node%22)) skip Cap, who isn't an artifact creature.
- **Wipes that kill Cap.** [Crystalline Entity](https://scryfall.com/search?q=%21%22Crystalline+Entity%22), [Join the Collective](https://scryfall.com/search?q=%21%22Join+the+Collective%22), [Wrath of God](https://scryfall.com/search?q=%21%22Wrath+of+God%22), [Supreme Verdict](https://scryfall.com/search?q=%21%22Supreme+Verdict%22), [Vanquish the Horde](https://scryfall.com/search?q=%21%22Vanquish+the+Horde%22), [Chain Reaction](https://scryfall.com/search?q=%21%22Chain+Reaction%22) and [U.S.S. Enterprise-E, Sovereign](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-E%2C+Sovereign%22), which destroys all tapped creatures, fail the test [Blasphemous Act](https://scryfall.com/search?q=%21%22Blasphemous+Act%22) failed at founding.

## Classification table

In the verdict column, MAIN displaces a named card in `main` now, SIDE is worth benching and names its displaced card under Bench, IN means `main` already runs it, and NO is a pass.

### TRK, Star Trek (#1 to #176)

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 1 | [70,000 Light-Years from Home](https://scryfall.com/search?q=%21%2270%2C000+Light-Years+from+Home%22) | 2 | NEW | NO | It exiles at sorcery speed and hands them a land, while Swords to Plowshares and Path to Exile do the job at instant speed for {W}. |
| 2 | [Andromedan Automatons](https://scryfall.com/search?q=%21%22Andromedan+Automatons%22) | 3 | NEW | NO | It's a 3/1 that only tutors copies of itself, and a singleton deck has none. |
| 3 | [Antagonist Incorporator](https://scryfall.com/search?q=%21%22Antagonist+Incorporator%22) | 2 | NEW | NO | It makes Borg tokens when artifact creatures connect, and Cap isn't an artifact creature. |
| 4 | [Assembly Specialist](https://scryfall.com/search?q=%21%22Assembly+Specialist%22) | 2 | NEW | NO | Two small artifact bodies do nothing for the Equipment plan. |
| 5 | [Brad Boimler, Eager Ensign](https://scryfall.com/search?q=%21%22Brad+Boimler%2C+Eager+Ensign%22) | 2 | NEW | NO | It adds extra counters when it taps, and the deck has no counters plan. |
| 6 | [Captain Jean-Luc Picard](https://scryfall.com/search?q=%21%22Captain+Jean-Luc+Picard%22) | 3 | NEW | NO | A +1/+1 anthem and Officer tokens off creature spells add little to a one-attacker Equipment deck. |
| 7 | [Command Decision](https://scryfall.com/search?q=%21%22Command+Decision%22) | 2 | NEW | NO | It's a sorcery that kills only power 4 or more, behind the one-mana instant removal already in the list. |
| 8 | [Command Subadjunct](https://scryfall.com/search?q=%21%22Command+Subadjunct%22) | 1 | NEW | NO | It gives vigilance to artifact creatures, and Cap isn't one. |
| 9 | [Conquest Mission](https://scryfall.com/search?q=%21%22Conquest+Mission%22) | 3 | NEW | NO | Its 1/1 Borg tokens can't carry anything the deck needs. |
| 10 | [Deanna Troi, Psychic Counsel](https://scryfall.com/search?q=%21%22Deanna+Troi%2C+Psychic+Counsel%22) | 2 | NEW | NO | Counters on entering creatures don't help an Equipment deck. |
| 11 | [DOT-7 Repair Squad](https://scryfall.com/search?q=%21%22DOT-7+Repair+Squad%22) | 4 | NEW | NO | Its sorcery-speed untap repeats what Captain America, Living Legend already does for the tap creatures, on a four-mana body. |
| 12 | [Dr. Beverly Crusher](https://scryfall.com/search?q=%21%22Dr.+Beverly+Crusher%22) | 3 | NEW | NO | It doubles lifegain triggers, and the deck has none worth doubling. |
| 13 | [Dr. McCoy, Surly Surgeon](https://scryfall.com/search?q=%21%22Dr.+McCoy%2C+Surly+Surgeon%22) | 4 | NEW | NO | Its protection works only on creatures with +1/+1 counters, and Cap rarely has one. |
| 14 | [Emergency Medical Hologram](https://scryfall.com/search?q=%21%22Emergency+Medical+Hologram%22) | 1 | NEW | NO | It's a 0/1 that puts one counter on a creature. |
| 15 | [Excalbian Gamemaster](https://scryfall.com/search?q=%21%22Excalbian+Gamemaster%22) | 6 | NEW | NO | Six mana for Officer tokens and death counters does nothing for the Throw engine. |
| 16 | [Federation Field Medic](https://scryfall.com/search?q=%21%22Federation+Field+Medic%22) | 4 | NEW | NO | Its draw needs a permanent with a counter on it, which the deck rarely has. |
| 17 | [Federation Resupply](https://scryfall.com/search?q=%21%22Federation+Resupply%22) | 2 | NEW | SIDE | It tutors an Equipment or Aura like Steelshaper's Gift and can be cast again from the graveyard with beam me up, but it costs {1} more up front. |
| 18 | [Free Borg Revolutionaries](https://scryfall.com/search?q=%21%22Free+Borg+Revolutionaries%22) | 5 | NEW | NO | It's a five-mana team pump or a basic landcycler the deck doesn't need. |
| 19 | [Ghost of Illyria](https://scryfall.com/search?q=%21%22Ghost+of+Illyria%22) | 4 | NEW | NO | It blinks one permanent once, which re-fires Meteor Sword a single time. |
| 20 | [Hologram Janeway](https://scryfall.com/search?q=%21%22Hologram+Janeway%22) | 3 | NEW | NO | Its counters on attack don't help an Equipment deck. |
| 21 | [Malfunctioning Holodeck](https://scryfall.com/search?q=%21%22Malfunctioning+Holodeck%22) | 3 | NEW | NO | It's a sorcery-speed O-ring, and Generous Gift and Chaos Warp already answer any permanent at instant speed. |
| 22 | [The Measure of a Man](https://scryfall.com/search?q=%21%22The+Measure+of+a+Man%22) | 3 | NEW | NO | The exile is temporary and its Clue doesn't count as draw for this pilot. |
| 23 | [Miles O'Brien, Transporter Ops](https://scryfall.com/search?q=%21%22Miles+O'Brien%2C+Transporter+Ops%22) | 3 | NEW | NO | Its end-step draw needs a permanent returned to hand each turn, and Master Transmuter is the only card here that does that. |
| 24 | [The Needs of the Many](https://scryfall.com/search?q=%21%22The+Needs+of+the+Many%22) | 2 | NEW | NO | It costs a creature to protect the rest, while Flawless Maneuver protects them for free. |
| 25 | [Oberth-Class Starship](https://scryfall.com/search?q=%21%22Oberth-Class+Starship%22) | 2 | NEW | NO | It tutors a Plains and needs 6 power of stationing before it can attack. |
| 26 | [Peace in Our Time](https://scryfall.com/search?q=%21%22Peace+in+Our+Time%22) | 4 | NEW | NO | It pays every player to skip attacking, and this deck wins by attacking. |
| 27 | [Pet Sehlat](https://scryfall.com/search?q=%21%22Pet+Sehlat%22) | 3 | NEW | NO | It's a vanilla 4/3 that can't attack alone. |
| 28 | [Picard, Leading by Example](https://scryfall.com/search?q=%21%22Picard%2C+Leading+by+Example%22) | 2 | NEW | NO | A sorcery-speed +2/+2 is noise next to Colossus Hammer and Excalibur. |
| 29 | [Primary Unimatrix Adjunct](https://scryfall.com/search?q=%21%22Primary+Unimatrix+Adjunct%22) | 4 | NEW | NO | It gives double strike only to artifact creatures, and Cap isn't one. |
| 30 | [Pure Energy](https://scryfall.com/search?q=%21%22Pure+Energy%22) | 2 | NEW | NO | Two +1/+1 counters are filler in an Equipment deck. |
| 31 | [Rutherford, Upgraded Ensign](https://scryfall.com/search?q=%21%22Rutherford%2C+Upgraded+Ensign%22) | 3 | NEW | NO | It digs six for one artifact once, which the draw cards on the bench beat. |
| 32 | [Saavik, Stoic Student](https://scryfall.com/search?q=%21%22Saavik%2C+Stoic+Student%22) | 5 | NEW | NO | Its damage counts creature types among your creatures, which is two or three in this list. |
| 33 | [Set Phasers to . . .](https://scryfall.com/search?q=%21%22Set+Phasers+to+.+.+.%22) | 1 | NEW | NO | The one-mana instant removal slots are full with stronger cards. |
| 34 | [Shields Up!](https://scryfall.com/search?q=%21%22Shields+Up!%22) | 2 | NEW | NO | It protects one permanent for {1}{W}, and U.S.S. Defiant, Mirror Migrant also beats exile and wipes for {2}. |
| 35 | [Shuttle Ace](https://scryfall.com/search?q=%21%22Shuttle+Ace%22) | 5 | NEW | NO | It's a five-mana 4/4 with incidental lifegain. |
| 36 | [Sulu, Space Swashbuckler](https://scryfall.com/search?q=%21%22Sulu%2C+Space+Swashbuckler%22) | 2 | NEW | NO | It draws only when Sulu himself becomes tapped on a turn an Equipment entered, so Sulu has to attack. |
| 37 | [Tactical Officer](https://scryfall.com/search?q=%21%22Tactical+Officer%22) | 2 | NEW | NO | Counters on a 2/1 don't help the Equipment plan. |
| 38 | [Test of Conviction](https://scryfall.com/search?q=%21%22Test+of+Conviction%22) | 2 | NEW | NO | It's a one-shot draw two that also gives an opponent a card. |
| 39 | [There's Coffee in that Nebula](https://scryfall.com/search?q=%21%22There's+Coffee+in+that+Nebula%22) | 2 | NEW | NO | It digs for a permanent with MV 3 or less, which misses every payload. |
| 40 | [Troubling Tribbles](https://scryfall.com/search?q=%21%22Troubling+Tribbles%22) | 3 | NEW | NO | Tokens that can't block do nothing for voltron. |
| 41 | [Una Chin-Riley, Number One](https://scryfall.com/search?q=%21%22Una+Chin-Riley%2C+Number+One%22) | 5 | NEW | NO | A +2/+0 and first strike on one attacker is small next to the deck's gear. |
| 42 | [U.S.S. Enterprise-A, Free Spirit](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-A%2C+Free+Spirit%22) | 5 | NEW | NO | It's a five-mana Spacecraft that needs 6 power of stationing to fight. |
| 43 | [U.S.S. Excelsior, Cutting Edge](https://scryfall.com/search?q=%21%22U.S.S.+Excelsior%2C+Cutting+Edge%22) | 4 | NEW | NO | Its ETB kills only a tapped creature, and the body needs 8 power of stationing. |
| 44 | [Vexing Drone](https://scryfall.com/search?q=%21%22Vexing+Drone%22) | 2 | NEW | NO | It's a 2/2 that taps one creature once. |
| 45 | [Anthropological Mission](https://scryfall.com/search?q=%21%22Anthropological+Mission%22) | 3 | NEW | MAIN | It loots twice, then draws a card for every noncreature spell, and 44 of the 64 spells in the 99 qualify. It's Whirlwind of Thought at {2}{U}, and that card was cut for its {1}{U}{R}{W} cost. |
| 46 | [The Caretaker](https://scryfall.com/search?q=%21%22The+Caretaker%22) | 6 | NEW | NO | Its dilemma payoff needs modal spells, and Boros Charm is the only one in the list. |
| 47 | [Cetacean Ops](https://scryfall.com/search?q=%21%22Cetacean+Ops%22) | 4 | NEW | NO | It grows from noncreature spells with no use for the counters. |
| 48 | [Cloak and Phaser](https://scryfall.com/search?q=%21%22Cloak+and+Phaser%22) | 9 | NEW | NO | Romulan tokens and a loot don't help the plan. |
| 49 | [Cloistered Telepath](https://scryfall.com/search?q=%21%22Cloistered+Telepath%22) | 2 | NEW | NO | A flash loot on a 2/1 is filler. |
| 50 | [Consider the Prime Directive](https://scryfall.com/search?q=%21%22Consider+the+Prime+Directive%22) | 3 | NEW | NO | It's a soft counter or a stun, both behind the free hard counter in Fierce Guardianship. |
| 51 | [Data, New Life](https://scryfall.com/search?q=%21%22Data%2C+New+Life%22) | 2 | NEW | NO | It's a 0/1 that grows from draws and does nothing for the Equipment plan. |
| 52 | [Deep Space Scan](https://scryfall.com/search?q=%21%22Deep+Space+Scan%22) | 6 | NEW | NO | It draws about six once for {4}{U}{U}, and double blue at six mana is hard with 7 blue pips in the list. |
| 53 | [Dominion Saboteur](https://scryfall.com/search?q=%21%22Dominion+Saboteur%22) | 5 | NEW | NO | It can copy Meteor Sword for one more ETB, but it costs five and the copy isn't an Equipment you'd keep. |
| 54 | [Emergency Holographic Crew](https://scryfall.com/search?q=%21%22Emergency+Holographic+Crew%22) | 4 | NEW | NO | It's Spacecraft recursion or a surveil 2 on a four-mana body. |
| 55 | [Energize](https://scryfall.com/search?q=%21%22Energize%22) | 2 | NEW | NO | Sorcery-speed bounce is tempo, not removal. |
| 56 | [Ensign Pavel Chekov](https://scryfall.com/search?q=%21%22Ensign+Pavel+Chekov%22) | 4 | NEW | NO | It steals one land per opponent on a four-mana 1/5. |
| 57 | [Enterprise NX-01](https://scryfall.com/search?q=%21%22Enterprise+NX-01%22) | 4 | NEW | NO | It's one stun plus a Spacecraft the deck can't station well. |
| 58 | [Federation Probe](https://scryfall.com/search?q=%21%22Federation+Probe%22) | 1 | NEW | NO | It's a 1/1 flier with a small ETB. |
| 59 | [Guidance Failure](https://scryfall.com/search?q=%21%22Guidance+Failure%22) | 4 | NEW | NO | It's four-mana creature removal behind the one-mana instants. |
| 60 | [Gwyndala, the Progeny](https://scryfall.com/search?q=%21%22Gwyndala%2C+the+Progeny%22) | 2 | NEW | NO | Its token can copy Meteor Sword for a 7-damage Throw, but Puresteel Paladin and Forge Anew already make re-attaching the real payload free. |
| 61 | [Highly Illogical](https://scryfall.com/search?q=%21%22Highly+Illogical%22) | 2 | NEW | NO | It's a narrow counter, or a four-mana kicked one, behind Fierce Guardianship. |
| 62 | [H.M.S. Bounty, Unlikely Timeship](https://scryfall.com/search?q=%21%22H.M.S.+Bounty%2C+Unlikely+Timeship%22) | 5 | NEW | NO | Its payoff needs a Whale and 8 power of stationing. |
| 63 | [Hoshi Sato, Exolinguist](https://scryfall.com/search?q=%21%22Hoshi+Sato%2C+Exolinguist%22) | 5 | NEW | NO | It counts creature types, which is two or three in this list. |
| 64 | [Humpback Whales](https://scryfall.com/search?q=%21%22Humpback+Whales%22) | 6 | NEW | NO | It's a six-mana vanilla or a landcycler. |
| 65 | [Interstellar Effigy](https://scryfall.com/search?q=%21%22Interstellar+Effigy%22) | 5 | NEW | NO | It's five-mana bounce on a body. |
| 66 | [Jett Reno, Problem Solver](https://scryfall.com/search?q=%21%22Jett+Reno%2C+Problem+Solver%22) | 2 | NEW | NO | It surveils when tapped and draws only at power 4, which needs gear the deck wants on Cap. |
| 67 | [Kobayashi Maru Scenario](https://scryfall.com/search?q=%21%22Kobayashi+Maru+Scenario%22) | 3 | NEW | NO | It draws two once and then makes you lose the game if it's still around. |
| 68 | [Lieutenant Commander Data](https://scryfall.com/search?q=%21%22Lieutenant+Commander+Data%22) | 3 | NEW | NO | It's a counters engine with no use for the counters. |
| 69 | [Lt. Cmdr. Geordi La Forge](https://scryfall.com/search?q=%21%22Lt.+Cmdr.+Geordi+La+Forge%22) | 3 | NEW | NO | It doubles charge counters, and the deck uses none. |
| 70 | [Make It So](https://scryfall.com/search?q=%21%22Make+It+So%22) | 4 | NEW | NO | It's a one-shot draw two at sorcery speed. |
| 71 | [Marooned](https://scryfall.com/search?q=%21%22Marooned%22) | 1 | NEW | NO | A tapping Aura is soft removal behind Swords to Plowshares and Path to Exile. |
| 72 | [Melkotian Adjudicator](https://scryfall.com/search?q=%21%22Melkotian+Adjudicator%22) | 3 | NEW | NO | Its counters need modal spells, and the list has one. |
| 73 | [Mr. Spock, Science Officer](https://scryfall.com/search?q=%21%22Mr.+Spock%2C+Science+Officer%22) | 4 | NEW | SIDE | Every draw becomes two, the draw step included, so it's never blank. Double blue at four mana in a white list is the cost. |
| 74 | [Nyota Uhura, Communications](https://scryfall.com/search?q=%21%22Nyota+Uhura%2C+Communications%22) | 3 | NEW | NO | It draws only off one chosen mana value of opponents' spells. |
| 75 | [Open Communications](https://scryfall.com/search?q=%21%22Open+Communications%22) | 1 | NEW | NO | It's a sorcery cantrip. |
| 76 | [Romulan Bird-of-Prey](https://scryfall.com/search?q=%21%22Romulan+Bird-of-Prey%22) | 2 | NEW | NO | It's a Spacecraft that needs 8 power of stationing. |
| 77 | [Rules of Acquisition](https://scryfall.com/search?q=%21%22Rules+of+Acquisition%22) | 5 | NEW | NO | It steals a permanent for five and hands that opponent three cards. |
| 78 | [Scotty, Miracle Worker](https://scryfall.com/search?q=%21%22Scotty%2C+Miracle+Worker%22) | 3 | NEW | NO | It recasts instants and sorceries from the graveyard, and the deck has few worth recasting. |
| 79 | [Seven of Nine, Unassimilated](https://scryfall.com/search?q=%21%22Seven+of+Nine%2C+Unassimilated%22) | 2 | NEW | SIDE | It loots in every first main phase and draws outright once you control five differently named lands, which this manabase reaches by the fifth land drop. |
| 80 | [Starfleet Spanner Jockey](https://scryfall.com/search?q=%21%22Starfleet+Spanner+Jockey%22) | 2 | NEW | NO | It's a 3/3 defender that does nothing for Cap. |
| 81 | [Subcommander T'Pol](https://scryfall.com/search?q=%21%22Subcommander+T'Pol%22) | 3 | NEW | NO | It counters one triggered or activated ability, narrower than the free protection in the list. |
| 82 | [Suurok-Class Science Vessel](https://scryfall.com/search?q=%21%22Suurok-Class+Science+Vessel%22) | 3 | NEW | NO | It's a cantrip artifact that needs 5 power of stationing to attack. |
| 83 | [Suus Mahna Practitioner](https://scryfall.com/search?q=%21%22Suus+Mahna+Practitioner%22) | 3 | NEW | NO | It's a tapper on a three-mana body. |
| 84 | [Test of Priorities](https://scryfall.com/search?q=%21%22Test+of+Priorities%22) | 2 | NEW | NO | It's a one-shot draw or a single blink. |
| 85 | [Those Old Scientists](https://scryfall.com/search?q=%21%22Those+Old+Scientists%22) | 3 | NEW | NO | It's a loot plus one artifact back over three turns. |
| 86 | [V'Ger, the Intruder](https://scryfall.com/search?q=%21%22V'Ger%2C+the+Intruder%22) | 7 | NEW | NO | It's a seven-mana flier with a small trigger. |
| 87 | [Vulcan Mind-Meld](https://scryfall.com/search?q=%21%22Vulcan+Mind-Meld%22) | 1 | NEW | NO | It swaps cards with an opponent and helps them as much as you. |
| 88 | [Wesley Crusher, Starfleet Cadet](https://scryfall.com/search?q=%21%22Wesley+Crusher%2C+Starfleet+Cadet%22) | 4 | NEW | NO | Its modes are small for a four-mana body. |
| 89 | [Zefram Cochrane, Warp Pioneer](https://scryfall.com/search?q=%21%22Zefram+Cochrane%2C+Warp+Pioneer%22) | 3 | NEW | NO | It casts one artifact off the top per turn, and about a third of the library is artifacts, so it's roughly one card every three turns. |
| 90 | [Academy Instructor](https://scryfall.com/search?q=%21%22Academy+Instructor%22) | 3 | NEW | NO | Officer tokens from noncreature spells can't carry Equipment usefully. |
| 91 | [Beckett Mariner, Impetuous Ensign](https://scryfall.com/search?q=%21%22Beckett+Mariner%2C+Impetuous+Ensign%22) | 2 | NEW | NO | It's a 2/1 first striker that pings after three taps. |
| 92 | [Boarding Action](https://scryfall.com/search?q=%21%22Boarding+Action%22) | 2 | NEW | NO | It's a 2/1 haste token. |
| 93 | [Brazen Bluff](https://scryfall.com/search?q=%21%22Brazen+Bluff%22) | 2 | NEW | NO | Its free cast depends on an opponent's choice. |
| 94 | [Cantankerous Captain](https://scryfall.com/search?q=%21%22Cantankerous+Captain%22) | 3 | NEW | NO | A +1/+0 and menace on one creature is small. |
| 95 | [Captain James T. Kirk](https://scryfall.com/search?q=%21%22Captain+James+T.+Kirk%22) | 3 | NEW | NO | Its loot, token or +1/+0 on ETB and attack are all small. |
| 96 | [Captain Michael Burnham](https://scryfall.com/search?q=%21%22Captain+Michael+Burnham%22) | 3 | NEW | NO | It's a landfall pinger with no Equipment use. |
| 97 | [Captain's Tutelage](https://scryfall.com/search?q=%21%22Captain's+Tutelage%22) | 2 | NEW | NO | It's a +2/+0 Aura, and Super-Soldier Serum is the Aura the deck wants. |
| 98 | [D-7 Battle Cruiser](https://scryfall.com/search?q=%21%22D-7+Battle+Cruiser%22) | 2 | NEW | NO | It's a Spacecraft that makes a temporary 2/1. |
| 99 | [Dahar Master](https://scryfall.com/search?q=%21%22Dahar+Master%22) | 4 | NEW | NO | It sacrifices one of your permanents for 2 damage. |
| 100 | [Dominion Infiltration](https://scryfall.com/search?q=%21%22Dominion+Infiltration%22) | 3 | NEW | NO | It makes temporary copies of opponents' creatures for {X}{R}{R}{R}. |
| 101 | [Encounter the Unknown](https://scryfall.com/search?q=%21%22Encounter+the+Unknown%22) | 3 | NEW | NO | It's an impulse two or 2 damage to each creature, which can kill your own engines. |
| 102 | [Erica Ortegas, Plucky Pilot](https://scryfall.com/search?q=%21%22Erica+Ortegas%2C+Plucky+Pilot%22) | 4 | NEW | NO | It's a land-cheating 3/3 haste body. |
| 103 | [Exploratory Mission](https://scryfall.com/search?q=%21%22Exploratory+Mission%22) | 4 | NEW | NO | Its landfall impulse costs {2}{R}{R}, and the deck makes few land drops after turn five. |
| 104 | [Genesis Effect](https://scryfall.com/search?q=%21%22Genesis+Effect%22) | 5 | NEW | NO | It's five-mana creature removal that costs you a land. |
| 105 | [Horta](https://scryfall.com/search?q=%21%22Horta%22) | 6 | NEW | NO | It's a six-mana vanilla or a landcycler. |
| 106 | [Infinite Diversity](https://scryfall.com/search?q=%21%22Infinite+Diversity%22) | 9 | NEW | NO | It costs nine and counts creature types. |
| 107 | [Khaaaaaaaaaaaannn!](https://scryfall.com/search?q=%21%22Khaaaaaaaaaaaannn!%22) | 1 | NEW | NO | It's X damage removal behind the one-mana exile spells. |
| 108 | [Khan, Despot by Design](https://scryfall.com/search?q=%21%22Khan%2C+Despot+by+Design%22) | 5 | NEW | NO | It's a five-mana ping. |
| 109 | [La'An Noonien-Singh, Security](https://scryfall.com/search?q=%21%22La'An+Noonien-Singh%2C+Security%22) | 4 | NEW | NO | It stops one blocker for {2}{R}{R}. |
| 110 | [Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22) | 2 | NEW | SIDE | Tapped with Cap as its target, it makes Catch trigger twice every combat, which is a second free re-attach or Throw. It can target Sram or Puresteel Paladin to double their draws instead. |
| 111 | [Munitions Enthusiast](https://scryfall.com/search?q=%21%22Munitions+Enthusiast%22) | 2 | NEW | NO | It's a 3/2 that pings on death. |
| 112 | [The Naked Time](https://scryfall.com/search?q=%21%22The+Naked+Time%22) | 2 | NEW | NO | It fetches a Mountain and sacrifices a land later. |
| 113 | [Pah-Wraith](https://scryfall.com/search?q=%21%22Pah-Wraith%22) | 7 | NEW | NO | It's a seven-mana team pump. |
| 114 | [Perils of the Past](https://scryfall.com/search?q=%21%22Perils+of+the+Past%22) | 2 | NEW | NO | It's a pump or artifact removal, both small. |
| 115 | [Planetary Bombardment](https://scryfall.com/search?q=%21%22Planetary+Bombardment%22) | 1 | NEW | NO | It's 2 or 4 damage at sorcery speed. |
| 116 | [Planetary Patrol](https://scryfall.com/search?q=%21%22Planetary+Patrol%22) | 2 | NEW | NO | It's a landfall 2/2. |
| 117 | [Plasma Cascade](https://scryfall.com/search?q=%21%22Plasma+Cascade%22) | 3 | NEW | NO | It's 3 damage plus a rummage for three mana. |
| 118 | [Q, Stacking the Deck](https://scryfall.com/search?q=%21%22Q%2C+Stacking+the+Deck%22) | 4 | NEW | NO | It makes one random nonland card repeatable by exiling cards from your hand. |
| 119 | [Quark, Humble Proprietor](https://scryfall.com/search?q=%21%22Quark%2C+Humble+Proprietor%22) | 3 | NEW | NO | It stops you sacrificing Treasures, which locks The Reaver Cleaver's Treasures too. |
| 120 | [Ravenous Cosmozoan](https://scryfall.com/search?q=%21%22Ravenous+Cosmozoan%22) | 6 | NEW | NO | It's a 3/3 haste flier that gets cheap late. |
| 121 | [Reckless Impulse](https://scryfall.com/search?q=%21%22Reckless+Impulse%22) | 2 | REPRINT | NO | It's a one-shot impulse two. |
| 122 | [Red Alert!](https://scryfall.com/search?q=%21%22Red+Alert!%22) | 3 | NEW | NO | It's a one-turn team pump. |
| 123 | [Sarcophagus, Ship of the Dead](https://scryfall.com/search?q=%21%22Sarcophagus%2C+Ship+of+the+Dead%22) | 3 | NEW | NO | Its +1/+0 anthem skips nothing Cap needs, and the body needs 10 power of stationing. |
| 124 | [Savvy Profiteer](https://scryfall.com/search?q=%21%22Savvy+Profiteer%22) | 2 | NEW | NO | It's a mana dork that dies to everything. |
| 125 | [Silicate Surveyor](https://scryfall.com/search?q=%21%22Silicate+Surveyor%22) | 5 | NEW | NO | It's a five-mana impulse one. |
| 126 | [Starfleet Security](https://scryfall.com/search?q=%21%22Starfleet+Security%22) | 1 | NEW | NO | It leaves a Clue on death, and Clues don't count as draw for this pilot. |
| 127 | [Tal Shiar Analyst](https://scryfall.com/search?q=%21%22Tal+Shiar+Analyst%22) | 3 | NEW | NO | It's a pinger. |
| 128 | [Targ Wrangler](https://scryfall.com/search?q=%21%22Targ+Wrangler%22) | 3 | NEW | NO | It makes you sacrifice a nonland permanent each turn it attacks. |
| 129 | [Tasha Yar, Out of Time](https://scryfall.com/search?q=%21%22Tasha+Yar%2C+Out+of+Time%22) | 2 | NEW | NO | It's a 2/1 haste with an impulse on death. |
| 130 | [Test of Identity](https://scryfall.com/search?q=%21%22Test+of+Identity%22) | 2 | NEW | NO | Its double strike needs a Klingon, and the list has none. |
| 131 | [Transporter Malfunction](https://scryfall.com/search?q=%21%22Transporter+Malfunction%22) | 2 | NEW | NO | It's 3 damage at sorcery speed. |
| 132 | [Will Riker, First in the Field](https://scryfall.com/search?q=%21%22Will+Riker%2C+First+in+the+Field%22) | 4 | NEW | NO | Its lands are temporary. |
| 133 | [Worf, Intelligence Contractor](https://scryfall.com/search?q=%21%22Worf%2C+Intelligence+Contractor%22) | 3 | NEW | NO | It borrows small creatures for a turn. |
| 134 | [The Wrath of Khan](https://scryfall.com/search?q=%21%22The+Wrath+of+Khan%22) | 3 | NEW | NO | It spreads removal and an edict over three turns. |
| 135 | [Constable Odo](https://scryfall.com/search?q=%21%22Constable+Odo%22) | 5 | NEW | NO | It's a stun or two Clues, and Clues don't count as draw for this pilot. |
| 136 | [Gray and Adira, Forever Joined](https://scryfall.com/search?q=%21%22Gray+and+Adira%2C+Forever+Joined%22) | 4 | NEW | NO | Its copy of Cap enters after Catch has triggered, so the token only adds a hasty attack. |
| 137 | [Hemmer, Fixing What Is Broken](https://scryfall.com/search?q=%21%22Hemmer%2C+Fixing+What+Is+Broken%22) | 2 | NEW | NO | It's a loot on tap. |
| 138 | [Kira Nerys, Firebrand](https://scryfall.com/search?q=%21%22Kira+Nerys%2C+Firebrand%22) | 3 | NEW | NO | Creatures entering attacking don't help a one-attacker deck. |
| 139 | [Kirk, Commanding Officer](https://scryfall.com/search?q=%21%22Kirk%2C+Commanding+Officer%22) | 3 | NEW | NO | Its impulse is lost if Throw mana leaves nothing to cast it, and Seven of Nine draws more for less on the bench. |
| 140 | [Live Long and Prosper](https://scryfall.com/search?q=%21%22Live+Long+and+Prosper%22) | 7 | NEW | NO | It costs seven. |
| 141 | [Spock, Always Your Friend](https://scryfall.com/search?q=%21%22Spock%2C+Always+Your+Friend%22) | 2 | NEW | NO | It's a one-shot dig four on a 2/2. |
| 142 | [Worf, Honor-Bound Warrior](https://scryfall.com/search?q=%21%22Worf%2C+Honor-Bound+Warrior%22) | 2 | NEW | NO | It grows itself, not Cap. |
| 143 | [Year of Hell](https://scryfall.com/search?q=%21%22Year+of+Hell%22) | 3 | NEW | NO | Its draw and damage are symmetric. |
| 144 | [Class-F Shuttlecraft](https://scryfall.com/search?q=%21%22Class-F+Shuttlecraft%22) | 3 | NEW | NO | It's a three-mana rock, behind the deck's two-mana ones. |
| 145 | [Combadge](https://scryfall.com/search?q=%21%22Combadge%22) | 3 | NEW | NO | Cap is unblockable only while a second creature wears the token copy, and Brotherhood Regalia gives unblockable alone, with ward. |
| 146 | [Crystalline Entity](https://scryfall.com/search?q=%21%22Crystalline+Entity%22) | 8 | NEW | NO | It destroys all nonartifact creatures, Cap included. |
| 147 | [Cybernetic Specialist](https://scryfall.com/search?q=%21%22Cybernetic+Specialist%22) | 2 | NEW | NO | It's a surveil and a graveyard tuck on a 2/1. |
| 148 | [Deep Space 9](https://scryfall.com/search?q=%21%22Deep+Space+9%22) | 9 | NEW | NO | It costs nine and isn't an Equipment, so Throw can't use its mana value. |
| 149 | [Engineered Explosives](https://scryfall.com/search?q=%21%22Engineered+Explosives%22) | 0 | REPRINT | NO | Sunburst caps it at three counters here, and a 0 to 3 setting hits the deck's own cheap Equipment and rocks. |
| 150 | [The Holodeck](https://scryfall.com/search?q=%21%22The+Holodeck%22) | 7 | NEW | NO | It costs seven and isn't an Equipment, so Throw can't use its mana value. |
| 151 | [Isolinear Processor](https://scryfall.com/search?q=%21%22Isolinear+Processor%22) | 2 | NEW | NO | It's a restricted rock with a two-mana loot. |
| 152 | [Replicator](https://scryfall.com/search?q=%21%22Replicator%22) | 2 | NEW | NO | It copies tokens, and the deck makes few. |
| 153 | [Sickbay](https://scryfall.com/search?q=%21%22Sickbay%22) | 5 | NEW | NO | Its counters scale with lifegain, and the deck gains little. |
| 154 | [Tea, Earl Grey, Hot](https://scryfall.com/search?q=%21%22Tea%2C+Earl+Grey%2C+Hot%22) | 2 | NEW | NO | It's a cantrip artifact, a one-shot card. |
| 155 | [Tricorder](https://scryfall.com/search?q=%21%22Tricorder%22) | 1 | NEW | NO | It's MV 1 Throw fodder with +1/+1 and a surveil. |
| 156 | [Type-2 Phaser](https://scryfall.com/search?q=%21%22Type-2+Phaser%22) | 2 | NEW | NO | It's MV 2 Throw fodder with a one-shot stun. |
| 157 | [U.S.S. Cerritos, Following Up](https://scryfall.com/search?q=%21%22U.S.S.+Cerritos%2C+Following+Up%22) | 5 | NEW | NO | It's two Officers and a Spacecraft for five. |
| 158 | [U.S.S. Enterprise-D, Galaxy-Class](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-D%2C+Galaxy-Class%22) | 3 | NEW | NO | Its impulse needs fresh charge counters each turn, which means stationing every turn. |
| 159 | [Warp Core](https://scryfall.com/search?q=%21%22Warp+Core%22) | 2 | NEW | NO | It's a basic land tutor on a two-mana artifact. |
| 160 | [Andoria](https://scryfall.com/search?q=%21%22Andoria%22) | 0 | NEW | NO | It's a tapped dual, and the 2026-09-09 manabase pass cut tapped lands. |
| 161 | [Bajor](https://scryfall.com/search?q=%21%22Bajor%22) | 0 | NEW | NO | It's a tapped dual, and the 2026-09-09 manabase pass cut tapped lands. |
| 162 | [Federation Outpost](https://scryfall.com/search?q=%21%22Federation+Outpost%22) | 0 | NEW | NO | It enters tapped on turns one and two, the turns the deck wants an untapped land. |
| 163 | [Gaseous Anomaly](https://scryfall.com/search?q=%21%22Gaseous+Anomaly%22) | 0 | NEW | NO | It's a colourless land with a six-mana draw two. |
| 164 | [Hallowed Fountain](https://scryfall.com/search?q=%21%22Hallowed+Fountain%22) | 0 | REPRINT | IN | It's already in main. |
| 165 | [Ni'Var Science Academy](https://scryfall.com/search?q=%21%22Ni'Var+Science+Academy%22) | 0 | NEW | NO | It enters tapped on turns one and two, the turns the deck wants an untapped land. |
| 166 | [Quark's Bar](https://scryfall.com/search?q=%21%22Quark's+Bar%22) | 0 | NEW | NO | It enters tapped on turns one and two, the turns the deck wants an untapped land. |
| 167 | [Sacred Foundry](https://scryfall.com/search?q=%21%22Sacred+Foundry%22) | 0 | REPRINT | IN | It's already in main. |
| 168 | [Spatial Anomaly](https://scryfall.com/search?q=%21%22Spatial+Anomaly%22) | 0 | NEW | NO | It's a colourless land with a five-mana Shock. |
| 169 | [Starfleet Academy](https://scryfall.com/search?q=%21%22Starfleet+Academy%22) | 0 | NEW | NO | Its mana counts creature types, which is two or three in this list. |
| 170 | [Steam Vents](https://scryfall.com/search?q=%21%22Steam+Vents%22) | 0 | REPRINT | IN | It's already in main. |
| 171 | [Subspace Anomaly](https://scryfall.com/search?q=%21%22Subspace+Anomaly%22) | 0 | NEW | NO | It's a colourless land that makes two Officers for five. |
| 172 | [Unexplored Territory](https://scryfall.com/search?q=%21%22Unexplored+Territory%22) | 0 | NEW | NO | It's a slow basic fetch. |
| 173 | [Vulcan](https://scryfall.com/search?q=%21%22Vulcan%22) | 0 | NEW | NO | It's a tapped dual, and the 2026-09-09 manabase pass cut tapped lands. |
| 174 | [Plains](https://scryfall.com/search?q=%21%22Plains%22) | 0 | REPRINT | IN | It's already in main. |
| 175 | [Island](https://scryfall.com/search?q=%21%22Island%22) | 0 | REPRINT | IN | It's already in main. |
| 176 | [Mountain](https://scryfall.com/search?q=%21%22Mountain%22) | 0 | REPRINT | IN | It's already in main. |

### TRC, Star Trek Commander (#177 to #408)

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 177 | [Jean-Luc Picard, Luminary](https://scryfall.com/search?q=%21%22Jean-Luc+Picard%2C+Luminary%22) | 4 | NEW | SIDE | It draws whenever a historic permanent with MV 3 or more enters, which is 26 cards in the 99 plus Cap on a recast. It's a creature at {1}{U}{R}{W}, so it sits behind Mission and Seven of Nine. |
| 178 | [Ambassador K'Ehleyr](https://scryfall.com/search?q=%21%22Ambassador+K'Ehleyr%22) | 3 | NEW | NO | Its draw every combat is symmetric. |
| 179 | [Balance of Terror](https://scryfall.com/search?q=%21%22Balance+of+Terror%22) | 3 | NEW | NO | Its blinks can re-fire Meteor Sword, but at Saga pace and sorcery timing. |
| 180 | [Beverly Crusher, Ship's Doctor](https://scryfall.com/search?q=%21%22Beverly+Crusher%2C+Ship's+Doctor%22) | 3 | NEW | NO | It puts counters on second draw, and the deck has no counters payoff. |
| 181 | [Borg Incursion](https://scryfall.com/search?q=%21%22Borg+Incursion%22) | 3 | NEW | NO | Its protection covers artifact creatures only, and Cap isn't one. |
| 182 | [Dr. Pulaski, Cynical Clinician](https://scryfall.com/search?q=%21%22Dr.+Pulaski%2C+Cynical+Clinician%22) | 2 | NEW | NO | It gains life on second draw. |
| 183 | [Emergency Regeneration](https://scryfall.com/search?q=%21%22Emergency+Regeneration%22) | 2 | NEW | NO | It protects artifacts, and Boros Charm already covers an artifact wipe with two more modes. |
| 184 | [Ensign Harry Kim, Operations](https://scryfall.com/search?q=%21%22Ensign+Harry+Kim%2C+Operations%22) | 2 | NEW | NO | It's a counters draw engine with no counters to spend. |
| 185 | [Ezri Dax, Newly Joined](https://scryfall.com/search?q=%21%22Ezri+Dax%2C+Newly+Joined%22) | 2 | NEW | NO | It can copy Cap only if you leave him in the graveyard instead of the command zone, which gives up recasting him. |
| 186 | [Guinan, Ancient Advisor](https://scryfall.com/search?q=%21%22Guinan%2C+Ancient+Advisor%22) | 3 | NEW | NO | It counters creatures that entered this turn. |
| 187 | [Imperial Hullbreachers](https://scryfall.com/search?q=%21%22Imperial+Hullbreachers%22) | 3 | NEW | NO | Its fliers and battle cry suit a go-wide deck. |
| 188 | [Indelicate Healer](https://scryfall.com/search?q=%21%22Indelicate+Healer%22) | 3 | NEW | NO | It gives team lifelink on Klingon entries. |
| 189 | [Join the Collective](https://scryfall.com/search?q=%21%22Join+the+Collective%22) | 7 | NEW | NO | It destroys all creatures, Cap included. |
| 190 | [Julian Bashir, Frontier Doctor](https://scryfall.com/search?q=%21%22Julian+Bashir%2C+Frontier+Doctor%22) | 3 | NEW | NO | It reanimates small creatures on attack. |
| 191 | [Korok, Liberated Rage](https://scryfall.com/search?q=%21%22Korok%2C+Liberated+Rage%22) | 4 | NEW | NO | It's a team pump on attack. |
| 192 | [Martok, Hero of the Empire](https://scryfall.com/search?q=%21%22Martok%2C+Hero+of+the+Empire%22) | 3 | NEW | NO | It puts counters on attack. |
| 193 | [Maturation Chamber](https://scryfall.com/search?q=%21%22Maturation+Chamber%22) | 2 | NEW | NO | Its Borg tokens come slowly from artifact casts. |
| 194 | [Merciful Mandate](https://scryfall.com/search?q=%21%22Merciful+Mandate%22) | 2 | NEW | NO | It ends a combat, a fog effect. |
| 195 | [M'Ress, Crew Coordinator](https://scryfall.com/search?q=%21%22M'Ress%2C+Crew+Coordinator%22) | 5 | NEW | NO | It makes landfall tokens. |
| 196 | [Right of Vengeance](https://scryfall.com/search?q=%21%22Right+of+Vengeance%22) | 4 | NEW | NO | It's a defensive trick. |
| 197 | [Shuttlecraft Galileo](https://scryfall.com/search?q=%21%22Shuttlecraft+Galileo%22) | 4 | NEW | NO | It makes landfall tokens and needs 6 power of stationing. |
| 198 | [Spot, Felis catus](https://scryfall.com/search?q=%21%22Spot%2C+Felis+catus%22) | 3 | NEW | NO | It makes Food on legendary ETBs and has slow artifact removal. |
| 199 | [Stratagem Emulator](https://scryfall.com/search?q=%21%22Stratagem+Emulator%22) | 3 | NEW | NO | It makes tokens on death. |
| 200 | [Supplementation Node](https://scryfall.com/search?q=%21%22Supplementation+Node%22) | 3 | NEW | NO | It counters artifact creatures, and Cap isn't one. |
| 201 | [Tribble Cluster](https://scryfall.com/search?q=%21%22Tribble+Cluster%22) | 3 | NEW | NO | It makes tokens on death. |
| 202 | [Type-03 Borg Vessel](https://scryfall.com/search?q=%21%22Type-03+Borg+Vessel%22) | 4 | NEW | NO | It costs four for an artifact discount, and Bureau Headmaster gives a discount at two that also cuts equip. |
| 203 | [U.S.S. Enterprise-E, Sovereign](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-E%2C+Sovereign%22) | 5 | NEW | NO | It destroys all tapped creatures, which includes Cap after he attacks without vigilance. |
| 204 | [Ambulatory Reactor](https://scryfall.com/search?q=%21%22Ambulatory+Reactor%22) | 4 | NEW | NO | Its mana works only through artifact creatures. |
| 205 | [Borg Scout Sphere](https://scryfall.com/search?q=%21%22Borg+Scout+Sphere%22) | 3 | NEW | NO | It's a cantrip Spacecraft. |
| 206 | [Chief Miles O'Brien](https://scryfall.com/search?q=%21%22Chief+Miles+O'Brien%22) | 3 | NEW | NO | It doubles counters, and the deck uses none. |
| 207 | [Colossal Clone Master](https://scryfall.com/search?q=%21%22Colossal+Clone+Master%22) | 6 | NEW | NO | It's a nonlegendary clone whose size depends on lands. |
| 208 | [Co-Option Adjutant](https://scryfall.com/search?q=%21%22Co-Option+Adjutant%22) | 4 | NEW | NO | It draws only when artifact creatures connect, and Cap isn't one. |
| 209 | [Data, Exploring Humanity](https://scryfall.com/search?q=%21%22Data%2C+Exploring+Humanity%22) | 5 | NEW | NO | It's a discover 4 on second draw at five mana. |
| 210 | [Fleet Captain Christopher Pike](https://scryfall.com/search?q=%21%22Fleet+Captain+Christopher+Pike%22) | 3 | NEW | NO | It untaps two creatures once a turn, a weaker Captain America, Living Legend for this list. |
| 211 | [Geordi La Forge, Innovator](https://scryfall.com/search?q=%21%22Geordi+La+Forge%2C+Innovator%22) | 3 | NEW | NO | It's unblockable only with a Spacecraft. |
| 212 | [Giant Space Amoeba](https://scryfall.com/search?q=%21%22Giant+Space+Amoeba%22) | 5 | NEW | NO | It's a self-copying flier. |
| 213 | [Gift of Perfection](https://scryfall.com/search?q=%21%22Gift+of+Perfection%22) | 5 | NEW | NO | It steals a random creature for five. |
| 214 | [Kes, Evolving Telepath](https://scryfall.com/search?q=%21%22Kes%2C+Evolving+Telepath%22) | 5 | NEW | NO | It costs five and takes three turns to pay off, behind Mission and Seven of Nine. |
| 215 | [Lieutenant Nyota Uhura](https://scryfall.com/search?q=%21%22Lieutenant+Nyota+Uhura%22) | 3 | NEW | NO | Its free spells come randomly from an opponent's library. |
| 216 | [On the Shoulders of Giants](https://scryfall.com/search?q=%21%22On+the+Shoulders+of+Giants%22) | 3 | NEW | NO | It gives flying to legendary creatures, a Dalakos without the haste or the mana. |
| 217 | [Optimization Annex](https://scryfall.com/search?q=%21%22Optimization+Annex%22) | 2 | NEW | NO | It adds charge counters, and the deck uses none. |
| 218 | [Sam Kirk, Xenoanthropologist](https://scryfall.com/search?q=%21%22Sam+Kirk%2C+Xenoanthropologist%22) | 4 | NEW | NO | It makes Clues, and Clues don't count as draw for this pilot. |
| 219 | [Seven of Nine, Tertiary Adjunct](https://scryfall.com/search?q=%21%22Seven+of+Nine%2C+Tertiary+Adjunct%22) | 3 | NEW | NO | It's a tap loot that charges artifacts. |
| 220 | [Temporal Tribulation](https://scryfall.com/search?q=%21%22Temporal+Tribulation%22) | 3 | NEW | NO | It blinks two permanents, and Equipment comes back unattached at end step. |
| 221 | [Transwarp Hub](https://scryfall.com/search?q=%21%22Transwarp+Hub%22) | 3 | NEW | SIDE | It mills five and keeps up to two artifacts, then taps to make Cap unblockable once a 3-power creature has stationed it. |
| 222 | [Tuvok, Chief Tactical Officer](https://scryfall.com/search?q=%21%22Tuvok%2C+Chief+Tactical+Officer%22) | 3 | NEW | NO | It redirects attackers once. |
| 223 | [Võx, Child of the Collective](https://scryfall.com/search?q=%21%22V%C3%B5x%2C+Child+of+the+Collective%22) | 5 | NEW | NO | It discounts artifact creatures and Spacecraft only. |
| 224 | [The Beacon of Kahless](https://scryfall.com/search?q=%21%22The+Beacon+of+Kahless%22) | 3 | NEW | NO | It's a three-mana rock. |
| 225 | [Ferocious Colonist](https://scryfall.com/search?q=%21%22Ferocious+Colonist%22) | 2 | NEW | NO | It's a double-strike 0/1. |
| 226 | [Gagh Slinger](https://scryfall.com/search?q=%21%22Gagh+Slinger%22) | 3 | NEW | NO | It's a Klingon payoff. |
| 227 | [Galvanizing Tenor](https://scryfall.com/search?q=%21%22Galvanizing+Tenor%22) | 4 | NEW | NO | It goads on attack. |
| 228 | [Glory to the Empire!](https://scryfall.com/search?q=%21%22Glory+to+the+Empire!%22) | 6 | NEW | NO | It makes tokens and grants melee for six. |
| 229 | [Gnarling Targ](https://scryfall.com/search?q=%21%22Gnarling+Targ%22) | 5 | NEW | NO | It's a Klingon pump. |
| 230 | [Grilka, Widowed Warrior](https://scryfall.com/search?q=%21%22Grilka%2C+Widowed+Warrior%22) | 6 | NEW | NO | It's a six-mana threaten. |
| 231 | [Kang, Suspicious Captain](https://scryfall.com/search?q=%21%22Kang%2C+Suspicious+Captain%22) | 4 | NEW | NO | It goads. |
| 232 | [Koloth, Tribble Hunter](https://scryfall.com/search?q=%21%22Koloth%2C+Tribble+Hunter%22) | 4 | NEW | NO | Its tokens and goad are symmetric. |
| 233 | [Own the Day](https://scryfall.com/search?q=%21%22Own+the+Day%22) | 6 | NEW | NO | An extra combat gives a second Catch, but it's a one-shot at {3}{R}{R} or more, while Genji Glove does it every turn and is tutorable. |
| 234 | [Qo'noS Quartermaster](https://scryfall.com/search?q=%21%22Qo'noS+Quartermaster%22) | 2 | NEW | NO | It's a 2/2 that makes one mana on attack. |
| 235 | [Ro Laren, Double Agent](https://scryfall.com/search?q=%21%22Ro+Laren%2C+Double+Agent%22) | 3 | NEW | NO | It pings on second draw. |
| 236 | [Rom and Leeta, Unlikely Pair](https://scryfall.com/search?q=%21%22Rom+and+Leeta%2C+Unlikely+Pair%22) | 4 | NEW | NO | It makes tapped Treasures on second draw. |
| 237 | [Alexander, Ship's Fool](https://scryfall.com/search?q=%21%22Alexander%2C+Ship's+Fool%22) | 5 | NEW | NO | Its draw is symmetric and its damage is random. |
| 238 | [B'Elanna Torres, Scrapper](https://scryfall.com/search?q=%21%22B'Elanna+Torres%2C+Scrapper%22) | 3 | NEW | NO | It draws only when it reveals an artifact, for {2} and a tap. |
| 239 | [The Best of Both Worlds](https://scryfall.com/search?q=%21%22The+Best+of+Both+Worlds%22) | 6 | NEW | NO | It's a six-mana temporary steal. |
| 240 | [Captain Janeway, Endgame](https://scryfall.com/search?q=%21%22Captain+Janeway%2C+Endgame%22) | 4 | NEW | NO | It's an Officer payoff. |
| 241 | [Chief Kyle, Transporter Tech](https://scryfall.com/search?q=%21%22Chief+Kyle%2C+Transporter+Tech%22) | 4 | NEW | NO | Its landfall blink strips Cap's gear if aimed at him. |
| 242 | [Cmdr. Troi, Outgoing Empath](https://scryfall.com/search?q=%21%22Cmdr.+Troi%2C+Outgoing+Empath%22) | 4 | NEW | NO | It lets an opponent cast a spell for free. |
| 243 | [Collective Override](https://scryfall.com/search?q=%21%22Collective+Override%22) | 4 | NEW | NO | It draws one card per attacker, and Cap attacks alone. |
| 244 | [Commander William Riker](https://scryfall.com/search?q=%21%22Commander+William+Riker%22) | 3 | NEW | NO | Its draw two is symmetric. |
| 245 | [Curzon Dax, Bound by Blood](https://scryfall.com/search?q=%21%22Curzon+Dax%2C+Bound+by+Blood%22) | 4 | NEW | NO | It's a Warrior death payoff. |
| 246 | [Jurati, Cordial Queen](https://scryfall.com/search?q=%21%22Jurati%2C+Cordial+Queen%22) | 3 | NEW | NO | It copies tokens when artifact creatures connect. |
| 247 | [Reg Barclay, Fidgety Fantasist](https://scryfall.com/search?q=%21%22Reg+Barclay%2C+Fidgety+Fantasist%22) | 4 | NEW | NO | Its copy of a creature is temporary, and a copy of Cap arrives with no Equipment. |
| 248 | [Rite of Ascension](https://scryfall.com/search?q=%21%22Rite+of+Ascension%22) | 4 | NEW | NO | It makes attacking tokens. |
| 249 | [Tom Paris, Risk-Taker](https://scryfall.com/search?q=%21%22Tom+Paris%2C+Risk-Taker%22) | 6 | NEW | NO | Team double strike and flying on second draw is real, but it costs six. |
| 250 | [Unification](https://scryfall.com/search?q=%21%22Unification%22) | 5 | NEW | NO | It's a Spacecraft Saga. |
| 251 | [Vic Fontaine, One Night Only](https://scryfall.com/search?q=%21%22Vic+Fontaine%2C+One+Night+Only%22) | 3 | NEW | NO | It's a +2/+0 and lifelink on second draw. |
| 252 | [Worf, Son of Mogh](https://scryfall.com/search?q=%21%22Worf%2C+Son+of+Mogh%22) | 3 | NEW | NO | It's an Officer anthem. |
| 253 | [Class-4 Tactical Cube](https://scryfall.com/search?q=%21%22Class-4+Tactical+Cube%22) | 4 | NEW | NO | It makes Borg tokens. |
| 254 | [Command Chair](https://scryfall.com/search?q=%21%22Command+Chair%22) | 6 | NEW | NO | It's a six-mana rock that enters tapped. |
| 255 | [The Guardian of Forever](https://scryfall.com/search?q=%21%22The+Guardian+of+Forever%22) | 3 | NEW | NO | Its blink costs a creature. |
| 256 | [I.K.S. Negh'Var, Imperial Flagship](https://scryfall.com/search?q=%21%22I.K.S.+Negh'Var%2C+Imperial+Flagship%22) | 3 | NEW | NO | It gives Klingons vigilance. |
| 257 | [Jefferies Tube](https://scryfall.com/search?q=%21%22Jefferies+Tube%22) | 1 | NEW | NO | Its unblockable and draw abilities get cheap only under Zirda, and without him it's a Rogue's Passage in a spell slot. |
| 258 | [K't'inga-Class Battle Cruiser](https://scryfall.com/search?q=%21%22K't'inga-Class+Battle+Cruiser%22) | 3 | NEW | NO | It gives Klingons flying. |
| 259 | [K'Vort-Class Raider](https://scryfall.com/search?q=%21%22K'Vort-Class+Raider%22) | 4 | NEW | NO | Its hexproof works only on your turn, which Grand Abolisher already covers more widely. |
| 260 | [Planet Killer](https://scryfall.com/search?q=%21%22Planet+Killer%22) | 8 | NEW | NO | It's an eight-mana artifact creature. |
| 261 | [Queen's Diamond](https://scryfall.com/search?q=%21%22Queen's+Diamond%22) | 4 | NEW | NO | Its mana works only for your commander and needs stationing. |
| 262 | [Reconnaissance Partition](https://scryfall.com/search?q=%21%22Reconnaissance+Partition%22) | 4 | NEW | NO | It's two draws or ramps on a four-mana body. |
| 263 | [S.S. Botany Bay](https://scryfall.com/search?q=%21%22S.S.+Botany+Bay%22) | 3 | NEW | NO | It's graveyard hate. |
| 264 | [Starfleet Communicator](https://scryfall.com/search?q=%21%22Starfleet+Communicator%22) | 3 | NEW | SIDE | It's two MV 3 Equipment for one card, and Cap draws on each attack while another creature wears the token copy. |
| 265 | [Starship Enterprise](https://scryfall.com/search?q=%21%22Starship+Enterprise%22) | 5 | NEW | NO | It needs 16 power of stationing. |
| 266 | [The Sword of Kahless](https://scryfall.com/search?q=%21%22The+Sword+of+Kahless%22) | 4 | NEW | NO | It's an MV 4 legendary Equipment whose attack trigger finds one of three Warriors in the list. |
| 267 | [U.S.S. Defiant, Mirror Migrant](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Mirror+Migrant%22) | 2 | NEW | SIDE | For {2} at instant speed it phases Cap out with all his Equipment, which beats exile, wipes and damage. |
| 268 | [U.S.S. Defiant, Tough Little Ship](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Tough+Little+Ship%22) | 6 | NEW | NO | It's six mana for artifact or enchantment removal. |
| 269 | [U.S.S. Enterprise-C, Time-Tossed](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-C%2C+Time-Tossed%22) | 5 | NEW | NO | It's a wheel on a five-mana Spacecraft. |
| 270 | [U.S.S. Farragut, Bold Explorer](https://scryfall.com/search?q=%21%22U.S.S.+Farragut%2C+Bold+Explorer%22) | 6 | NEW | NO | It cheats creatures in on landfall. |
| 271 | [U.S.S. Prometheus, Prototype](https://scryfall.com/search?q=%21%22U.S.S.+Prometheus%2C+Prototype%22) | 5 | NEW | NO | It's a five-mana Spacecraft. |
| 272 | [U.S.S. Stargazer, Here and There](https://scryfall.com/search?q=%21%22U.S.S.+Stargazer%2C+Here+and+There%22) | 3 | NEW | NO | It needs 6 power of stationing. |
| 273 | [Shore Leave Planet](https://scryfall.com/search?q=%21%22Shore+Leave+Planet%22) | 0 | NEW | NO | It's a tapped mono-blue land. |
| 274 | [Evasive Maneuvers](https://scryfall.com/search?q=%21%22Evasive+Maneuvers%22) | 1 | NEW | NO | It's a blocking trick. |
| 275 | [Head of Security](https://scryfall.com/search?q=%21%22Head+of+Security%22) | 2 | NEW | NO | It's a vanilla first striker. |
| 276 | [Shuttle Crew](https://scryfall.com/search?q=%21%22Shuttle+Crew%22) | 3 | NEW | NO | It kills only a tapped creature. |
| 277 | [Sickbay Orderly](https://scryfall.com/search?q=%21%22Sickbay+Orderly%22) | 3 | NEW | NO | It's a vanilla lifelinker. |
| 278 | [Starfleet Crew](https://scryfall.com/search?q=%21%22Starfleet+Crew%22) | 2 | NEW | NO | It's a vanilla 2/3. |
| 279 | [Will Riker, Assuming Command](https://scryfall.com/search?q=%21%22Will+Riker%2C+Assuming+Command%22) | 5 | NEW | NO | It puts one counter on a creature. |
| 280 | [Worf, Chief Tactical Officer](https://scryfall.com/search?q=%21%22Worf%2C+Chief+Tactical+Officer%22) | 3 | NEW | NO | It's a vanilla vigilance body. |
| 281 | [Cryogenic Stasis](https://scryfall.com/search?q=%21%22Cryogenic+Stasis%22) | 2 | NEW | NO | It's a stun cantrip. |
| 282 | [Exocomp](https://scryfall.com/search?q=%21%22Exocomp%22) | 3 | NEW | NO | It's a 3/1 flier. |
| 283 | [Kolinahr Priest](https://scryfall.com/search?q=%21%22Kolinahr+Priest%22) | 3 | NEW | NO | It's a flash 3/2. |
| 284 | [La Forge, Perceptive Engineer](https://scryfall.com/search?q=%21%22La+Forge%2C+Perceptive+Engineer%22) | 2 | NEW | NO | It's a mana dork for artifact spells only. |
| 285 | [Pelia, Immortal Innovator](https://scryfall.com/search?q=%21%22Pelia%2C+Immortal+Innovator%22) | 4 | NEW | NO | It's bounce on a body. |
| 286 | [T'Pol, Vulcan Representative](https://scryfall.com/search?q=%21%22T'Pol%2C+Vulcan+Representative%22) | 5 | NEW | NO | It's a stun on a body. |
| 287 | [Defense Force Aggressor](https://scryfall.com/search?q=%21%22Defense+Force+Aggressor%22) | 1 | NEW | NO | It's a vanilla 2/1. |
| 288 | [Direct Hit](https://scryfall.com/search?q=%21%22Direct+Hit%22) | 3 | NEW | NO | It's creature damage at sorcery speed. |
| 289 | [Gin'tak Charge](https://scryfall.com/search?q=%21%22Gin'tak+Charge%22) | 1 | NEW | NO | It's a Shock at sorcery speed. |
| 290 | [Kruge, Genesis Seeker](https://scryfall.com/search?q=%21%22Kruge%2C+Genesis+Seeker%22) | 3 | NEW | NO | It's a Klingon pump. |
| 291 | [Mek'leth Berserker](https://scryfall.com/search?q=%21%22Mek'leth+Berserker%22) | 4 | NEW | NO | It's a vanilla menace body. |
| 292 | [Warship Flight Crew](https://scryfall.com/search?q=%21%22Warship+Flight+Crew%22) | 2 | NEW | NO | It's a vanilla 2/2. |
| 293 | [Disruptor Pistol](https://scryfall.com/search?q=%21%22Disruptor+Pistol%22) | 2 | NEW | NO | It's slow artifact removal. |
| 294 | [Spock, Voice of Reason](https://scryfall.com/search?q=%21%22Spock%2C+Voice+of+Reason%22) | 3 | NEW | NO | Its draw counts permanents that entered this turn, usually one or two here. |
| 295 | [Uhura, Xenolinguist](https://scryfall.com/search?q=%21%22Uhura%2C+Xenolinguist%22) | 5 | NEW | NO | It pays for draws on non-Human creatures entering. |
| 296 | [Scotty, Chief Engineer](https://scryfall.com/search?q=%21%22Scotty%2C+Chief+Engineer%22) | 4 | NEW | NO | It makes Cap unblockable by tapping an artifact, but it's a four-mana creature and Transwarp Hub does the job on the bench while drawing artifacts. |
| 297 | [Sulu, Heroic Helmsman](https://scryfall.com/search?q=%21%22Sulu%2C+Heroic+Helmsman%22) | 2 | NEW | NO | It stations and crews, which the deck doesn't do. |
| 298 | [Worf, Still Not Merry](https://scryfall.com/search?q=%21%22Worf%2C+Still+Not+Merry%22) | 5 | NEW | NO | It makes Faerie tokens on attack. |
| 299 | [La Forge, Thoughtful as Ever](https://scryfall.com/search?q=%21%22La+Forge%2C+Thoughtful+as+Ever%22) | 4 | NEW | NO | It makes Faeries for counters. |
| 300 | [Data, Professor of Humanities](https://scryfall.com/search?q=%21%22Data%2C+Professor+of+Humanities%22) | 4 | NEW | NO | It makes Faeries on second draw. |
| 301 | [Jean-Luc, Mon Capitaine](https://scryfall.com/search?q=%21%22Jean-Luc%2C+Mon+Capitaine%22) | 5 | NEW | NO | It's a Faerie payoff. |
| 302 | [Troi, Winging It](https://scryfall.com/search?q=%21%22Troi%2C+Winging+It%22) | 4 | NEW | NO | It makes Faeries when opponents draw on your turn. |
| 303 | [Operations Officer](https://scryfall.com/search?q=%21%22Operations+Officer%22) | 4 | NEW | NO | It's a four-mana cantrip body. |
| 304 | [Picard, Steadfast Captain](https://scryfall.com/search?q=%21%22Picard%2C+Steadfast+Captain%22) | 6 | NEW | NO | It puts counters on creatures for six. |
| 305 | [Spock, Logical Choice](https://scryfall.com/search?q=%21%22Spock%2C+Logical+Choice%22) | 5 | NEW | NO | It's a tap-to-draw at {3}{U}{U}, behind Mr. Spock and Seven of Nine. |
| 306 | [Trelane, Squire of Gothos](https://scryfall.com/search?q=%21%22Trelane%2C+Squire+of+Gothos%22) | 6 | NEW | NO | It's an unblockable six-drop that isn't Cap. |
| 307 | [Kirk, Enterprising Captain](https://scryfall.com/search?q=%21%22Kirk%2C+Enterprising+Captain%22) | 4 | NEW | NO | Its impulse needs Kirk himself to attack. |
| 308 | [Klingon Strike Force](https://scryfall.com/search?q=%21%22Klingon+Strike+Force%22) | 5 | NEW | NO | It's a five-mana haste body. |
| 309 | [Austere Command](https://scryfall.com/search?q=%21%22Austere+Command%22) | 6 | REPRINT | NO | Its best pair here, creatures MV 4 or more plus enchantments, spares Cap but destroys Bruenor, Thorin, Master Transmuter, Stonehewer Giant, all five enchantments and Urza's Saga. |
| 310 | [Chronomantic Escape](https://scryfall.com/search?q=%21%22Chronomantic+Escape%22) | 6 | REPRINT | NO | It's a fog. |
| 311 | [Concerted Effort](https://scryfall.com/search?q=%21%22Concerted+Effort%22) | 4 | REPRINT | NO | It shares keywords across a team the deck doesn't build. |
| 312 | [Dispatch](https://scryfall.com/search?q=%21%22Dispatch%22) | 1 | REPRINT | IN | It's already in main. |
| 313 | [Duelist's Heritage](https://scryfall.com/search?q=%21%22Duelist's+Heritage%22) | 3 | REPRINT | NO | It gives double strike to one attacker, and Genji Glove, Boros Charm and Mjölnir already double the same hit. |
| 314 | [Grand Crescendo](https://scryfall.com/search?q=%21%22Grand+Crescendo%22) | 2 | REPRINT | NO | At X=0 it's a {W}{W} Flawless Maneuver, and the real one is free. |
| 315 | [Loran of the Third Path](https://scryfall.com/search?q=%21%22Loran+of+the+Third+Path%22) | 3 | REPRINT | NO | Its artifact removal comes with symmetric draw. |
| 316 | [Path to Exile](https://scryfall.com/search?q=%21%22Path+to+Exile%22) | 1 | REPRINT | IN | It's already in main. |
| 317 | [Promise of Loyalty](https://scryfall.com/search?q=%21%22Promise+of+Loyalty%22) | 5 | REPRINT | NO | Its symmetric sacrifice kills your own engines. |
| 318 | [Return to Dust](https://scryfall.com/search?q=%21%22Return+to+Dust%22) | 4 | REPRINT | NO | It's four-mana artifact and enchantment removal behind Generous Gift. |
| 319 | [Sun Titan](https://scryfall.com/search?q=%21%22Sun+Titan%22) | 6 | REPRINT | NO | It returns MV 3 or less, which misses every payload, at six mana. |
| 320 | [Swords to Plowshares](https://scryfall.com/search?q=%21%22Swords+to+Plowshares%22) | 1 | REPRINT | IN | It's already in main. |
| 321 | [Tempered Steel](https://scryfall.com/search?q=%21%22Tempered+Steel%22) | 3 | REPRINT | NO | It pumps artifact creatures only. |
| 322 | [Valorous Stance](https://scryfall.com/search?q=%21%22Valorous+Stance%22) | 2 | REPRINT | NO | It's indestructible for one creature or a kill, behind Flawless Maneuver and Boros Charm. |
| 323 | [Vanquish the Horde](https://scryfall.com/search?q=%21%22Vanquish+the+Horde%22) | 8 | REPRINT | NO | It destroys all creatures, Cap included. |
| 324 | [Wrath of God](https://scryfall.com/search?q=%21%22Wrath+of+God%22) | 4 | REPRINT | NO | It destroys all creatures, Cap included. |
| 325 | [Brainstorm](https://scryfall.com/search?q=%21%22Brainstorm%22) | 1 | REPRINT | NO | It's a cantrip. |
| 326 | [Cryptic Command](https://scryfall.com/search?q=%21%22Cryptic+Command%22) | 4 | REPRINT | NO | It costs triple blue. |
| 327 | [Disallow](https://scryfall.com/search?q=%21%22Disallow%22) | 3 | REPRINT | NO | It's a {1}{U}{U} counter behind the free Fierce Guardianship. |
| 328 | [Echo of Eons](https://scryfall.com/search?q=%21%22Echo+of+Eons%22) | 6 | REPRINT | NO | It's a symmetric wheel. |
| 329 | [Frantic Search](https://scryfall.com/search?q=%21%22Frantic+Search%22) | 3 | REPRINT | NO | It's a loot that untaps lands. |
| 330 | [Negate](https://scryfall.com/search?q=%21%22Negate%22) | 2 | REPRINT | NO | It's a counter behind the free Fierce Guardianship. |
| 331 | [Ponder](https://scryfall.com/search?q=%21%22Ponder%22) | 1 | REPRINT | NO | It's a cantrip. |
| 332 | [Pongify](https://scryfall.com/search?q=%21%22Pongify%22) | 1 | REPRINT | NO | It's removal that leaves a 3/3, behind Swords to Plowshares and Path to Exile. |
| 333 | [Reality Shift](https://scryfall.com/search?q=%21%22Reality+Shift%22) | 2 | REPRINT | NO | It's removal that leaves a 2/2. |
| 334 | [Thirst for Knowledge](https://scryfall.com/search?q=%21%22Thirst+for+Knowledge%22) | 3 | REPRINT | NO | It's a one-shot draw three, discard two. |
| 335 | [Thoughtcast](https://scryfall.com/search?q=%21%22Thoughtcast%22) | 5 | REPRINT | NO | It's a one-shot draw two. |
| 336 | [Abrade](https://scryfall.com/search?q=%21%22Abrade%22) | 2 | REPRINT | NO | It's 3 damage or artifact removal. |
| 337 | [Chain Reaction](https://scryfall.com/search?q=%21%22Chain+Reaction%22) | 4 | REPRINT | NO | Its damage scales with the creature count and can kill Cap. |
| 338 | [Combat Celebrant](https://scryfall.com/search?q=%21%22Combat+Celebrant%22) | 3 | REPRINT | NO | An extra combat gives a second Catch, but the 4/1 has to attack and usually dies to the first blocker. |
| 339 | [Disrupt Decorum](https://scryfall.com/search?q=%21%22Disrupt+Decorum%22) | 4 | REPRINT | NO | It goads everything once. |
| 340 | [Professional Face-Breaker](https://scryfall.com/search?q=%21%22Professional+Face-Breaker%22) | 3 | REPRINT | NO | It makes a Treasure on combat damage, which The Reaver Cleaver does better. |
| 341 | [Shared Animosity](https://scryfall.com/search?q=%21%22Shared+Animosity%22) | 3 | REPRINT | NO | It needs a team that shares types. |
| 342 | [Thrill of Possibility](https://scryfall.com/search?q=%21%22Thrill+of+Possibility%22) | 2 | REPRINT | NO | It's a rummage two. |
| 343 | [World at War](https://scryfall.com/search?q=%21%22World+at+War%22) | 5 | REPRINT | NO | It's two extra combats over two turns for {3}{R}{R}, while Genji Glove gives one every turn. |
| 344 | [Faithful Mending](https://scryfall.com/search?q=%21%22Faithful+Mending%22) | 2 | REPRINT | NO | It's a loot. |
| 345 | [Fevered Visions](https://scryfall.com/search?q=%21%22Fevered+Visions%22) | 3 | REPRINT | NO | Its draw is symmetric. |
| 346 | [Fractured Identity](https://scryfall.com/search?q=%21%22Fractured+Identity%22) | 5 | REPRINT | NO | It exiles one permanent for five and gives every other player a copy. |
| 347 | [Supreme Verdict](https://scryfall.com/search?q=%21%22Supreme+Verdict%22) | 4 | REPRINT | NO | It destroys all creatures, Cap included. |
| 348 | [Warleader's Call](https://scryfall.com/search?q=%21%22Warleader's+Call%22) | 3 | REPRINT | NO | It's a token anthem. |
| 349 | [Alhammarret's Archive](https://scryfall.com/search?q=%21%22Alhammarret's+Archive%22) | 5 | REPRINT | NO | It doubles draws after the first for five, with no body. |
| 350 | [Arcane Signet](https://scryfall.com/search?q=%21%22Arcane+Signet%22) | 2 | REPRINT | IN | It's already in main. |
| 351 | [Astral Cornucopia](https://scryfall.com/search?q=%21%22Astral+Cornucopia%22) | 0 | REPRINT | NO | It's an expensive rock. |
| 352 | [Commander's Sphere](https://scryfall.com/search?q=%21%22Commander's+Sphere%22) | 3 | REPRINT | NO | It's a three-mana rock. |
| 353 | [Darksteel Plate](https://scryfall.com/search?q=%21%22Darksteel+Plate%22) | 3 | REPRINT | NO | It grants indestructible for equip {2}, and Mithril Coat does the same with flash and a free attach to Cap. |
| 354 | [Door of Destinies](https://scryfall.com/search?q=%21%22Door+of+Destinies%22) | 4 | REPRINT | NO | It's a tribal pump. |
| 355 | [Everflowing Chalice](https://scryfall.com/search?q=%21%22Everflowing+Chalice%22) | 0 | REPRINT | NO | It's a rock that's worse than Sol Ring at every price. |
| 356 | [Forsaken Monument](https://scryfall.com/search?q=%21%22Forsaken+Monument%22) | 5 | REPRINT | NO | It pumps colourless creatures. |
| 357 | [Hedron Archive](https://scryfall.com/search?q=%21%22Hedron+Archive%22) | 4 | REPRINT | NO | It's a four-mana rock. |
| 358 | [Herald's Horn](https://scryfall.com/search?q=%21%22Herald's+Horn%22) | 3 | REPRINT | NO | It's a tribal discount. |
| 359 | [Howling Mine](https://scryfall.com/search?q=%21%22Howling+Mine%22) | 2 | REPRINT | NO | Its draw is symmetric. |
| 360 | [The Immortal Sun](https://scryfall.com/search?q=%21%22The+Immortal+Sun%22) | 6 | REPRINT | NO | Its draw, discount and anthem cost six, too slow for the curve. |
| 361 | [Lightning Greaves](https://scryfall.com/search?q=%21%22Lightning+Greaves%22) | 2 | REPRINT | NO | Shroud blocks your own equip abilities onto Cap, the 2026-09-08 grounds, and they still hold. |
| 362 | [Mind Stone](https://scryfall.com/search?q=%21%22Mind+Stone%22) | 2 | REPRINT | NO | It's a colourless rock with a sacrifice cantrip. |
| 363 | [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) | 1 | REPRINT | NO | Only Esper Sentinel dies to the -1 toughness, and the deck makes no tokens worth clamping. |
| 364 | [Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22) | 1 | REPRINT | IN | It's already in main. |
| 365 | [Stonespeaker Crystal](https://scryfall.com/search?q=%21%22Stonespeaker+Crystal%22) | 4 | REPRINT | NO | It's a four-mana rock. |
| 366 | [Swiftfoot Boots](https://scryfall.com/search?q=%21%22Swiftfoot+Boots%22) | 2 | REPRINT | IN | It's already in main. |
| 367 | [Sword of Light and Shadow](https://scryfall.com/search?q=%21%22Sword+of+Light+and+Shadow%22) | 3 | REPRINT | NO | Protection from white knocks Super-Soldier Serum off Cap, since Serum is a white Aura (CR 702.16c). |
| 368 | [Talisman of Conviction](https://scryfall.com/search?q=%21%22Talisman+of+Conviction%22) | 2 | REPRINT | IN | It's already in main. |
| 369 | [Talisman of Creativity](https://scryfall.com/search?q=%21%22Talisman+of+Creativity%22) | 2 | REPRINT | IN | It's already in main. |
| 370 | [Talisman of Progress](https://scryfall.com/search?q=%21%22Talisman+of+Progress%22) | 2 | REPRINT | SIDE | It was cut on 2026-09-09 as a trial to revisit if colour screw showed up, and no play report has shown it. |
| 371 | [Thought Vessel](https://scryfall.com/search?q=%21%22Thought+Vessel%22) | 2 | REPRINT | NO | It's a colourless rock. |
| 372 | [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) | 4 | REPRINT | SIDE | It untaps the five rocks, Brass Squire, Codsworth and Master Transmuter on each opponent's turn, which pays for instant-speed Throws and re-attaches. |
| 373 | [Wayfarer's Bauble](https://scryfall.com/search?q=%21%22Wayfarer's+Bauble%22) | 1 | REPRINT | NO | It's ramp the deck doesn't need. |
| 374 | [Academy Ruins](https://scryfall.com/search?q=%21%22Academy+Ruins%22) | 0 | REPRINT | IN | It's already in main. |
| 375 | [Battlefield Forge](https://scryfall.com/search?q=%21%22Battlefield+Forge%22) | 0 | REPRINT | IN | It's already in main. |
| 376 | [Clifftop Retreat](https://scryfall.com/search?q=%21%22Clifftop+Retreat%22) | 0 | REPRINT | NO | Checklands can enter tapped on turns one and two, the 2026-09-09 grounds for the painlands. |
| 377 | [Coastal Peak](https://scryfall.com/search?q=%21%22Coastal+Peak%22) | 0 | REPRINT | NO | It's a tapped dual. |
| 378 | [Command Beacon](https://scryfall.com/search?q=%21%22Command+Beacon%22) | 0 | REPRINT | NO | It saves commander tax once, by giving up a land. |
| 379 | [Command Tower](https://scryfall.com/search?q=%21%22Command+Tower%22) | 0 | REPRINT | IN | It's already in main. |
| 380 | [Desolate Lighthouse](https://scryfall.com/search?q=%21%22Desolate+Lighthouse%22) | 0 | REPRINT | NO | It's a colourless land with a loot. |
| 381 | [Evolving Wilds](https://scryfall.com/search?q=%21%22Evolving+Wilds%22) | 0 | REPRINT | NO | It's a tapped basic fetch. |
| 382 | [Exotic Orchard](https://scryfall.com/search?q=%21%22Exotic+Orchard%22) | 0 | REPRINT | NO | Its colours depend on opponents' lands. |
| 383 | [Fabled Passage](https://scryfall.com/search?q=%21%22Fabled+Passage%22) | 0 | REPRINT | NO | It's a basic fetch that enters tapped early. |
| 384 | [Frostboil Snarl](https://scryfall.com/search?q=%21%22Frostboil+Snarl%22) | 0 | REPRINT | NO | It needs a typed land in hand on turns one and two. |
| 385 | [Furycalm Snarl](https://scryfall.com/search?q=%21%22Furycalm+Snarl%22) | 0 | REPRINT | NO | It needs a typed land in hand on turns one and two. |
| 386 | [Glacial Fortress](https://scryfall.com/search?q=%21%22Glacial+Fortress%22) | 0 | REPRINT | NO | Checklands can enter tapped on turns one and two, the 2026-09-09 grounds for the painlands. |
| 387 | [Glittering Massif](https://scryfall.com/search?q=%21%22Glittering+Massif%22) | 0 | REPRINT | NO | It's a tapped dual. |
| 388 | [Irrigated Farmland](https://scryfall.com/search?q=%21%22Irrigated+Farmland%22) | 0 | REPRINT | NO | It's a tapped dual. |
| 389 | [Mutavault](https://scryfall.com/search?q=%21%22Mutavault%22) | 0 | REPRINT | NO | It's a colourless creature land. |
| 390 | [Mystic Monastery](https://scryfall.com/search?q=%21%22Mystic+Monastery%22) | 0 | REPRINT | NO | It's a tapped tri-land. |
| 391 | [Path of Ancestry](https://scryfall.com/search?q=%21%22Path+of+Ancestry%22) | 0 | REPRINT | NO | It enters tapped. |
| 392 | [Perilous Landscape](https://scryfall.com/search?q=%21%22Perilous+Landscape%22) | 0 | REPRINT | NO | It's a slow fetch. |
| 393 | [Port Town](https://scryfall.com/search?q=%21%22Port+Town%22) | 0 | REPRINT | NO | It needs a typed land in hand on turns one and two. |
| 394 | [Prairie Stream](https://scryfall.com/search?q=%21%22Prairie+Stream%22) | 0 | REPRINT | NO | It enters tapped until you control two basics, and the list runs only seven. |
| 395 | [Radiant Summit](https://scryfall.com/search?q=%21%22Radiant+Summit%22) | 0 | REPRINT | NO | It enters tapped until you control two basics, and the list runs only seven. |
| 396 | [Reliquary Tower](https://scryfall.com/search?q=%21%22Reliquary+Tower%22) | 0 | REPRINT | NO | It's a colourless land. |
| 397 | [Rogue's Passage](https://scryfall.com/search?q=%21%22Rogue's+Passage%22) | 0 | REPRINT | IN | It's already in main. |
| 398 | [Scorched Geyser](https://scryfall.com/search?q=%21%22Scorched+Geyser%22) | 0 | REPRINT | NO | It enters tapped until you control two basics, and the list runs only seven. |
| 399 | [Sea of Clouds](https://scryfall.com/search?q=%21%22Sea+of+Clouds%22) | 0 | REPRINT | IN | It's already in main. |
| 400 | [Skycloud Expanse](https://scryfall.com/search?q=%21%22Skycloud+Expanse%22) | 0 | REPRINT | NO | It's a filter land that costs {1} to use. |
| 401 | [Spire of Industry](https://scryfall.com/search?q=%21%22Spire+of+Industry%22) | 0 | REPRINT | SIDE | It makes colourless for free and any colour for 1 life once you control an artifact, in a list with 30 artifacts. |
| 402 | [Sulfur Falls](https://scryfall.com/search?q=%21%22Sulfur+Falls%22) | 0 | REPRINT | NO | Checklands can enter tapped on turns one and two, the 2026-09-09 grounds for the painlands. |
| 403 | [Temple of Enlightenment](https://scryfall.com/search?q=%21%22Temple+of+Enlightenment%22) | 0 | REPRINT | NO | It's a tapped dual. |
| 404 | [Temple of the False God](https://scryfall.com/search?q=%21%22Temple+of+the+False+God%22) | 0 | REPRINT | NO | It needs five lands to work. |
| 405 | [Terramorphic Expanse](https://scryfall.com/search?q=%21%22Terramorphic+Expanse%22) | 0 | REPRINT | NO | It's a tapped basic fetch. |
| 406 | [Training Center](https://scryfall.com/search?q=%21%22Training+Center%22) | 0 | REPRINT | IN | It's already in main. |
| 407 | [Refute](https://scryfall.com/search?q=%21%22Refute%22) | 3 | REPRINT | NO | It's a {1}{U}{U} counter behind the free Fierce Guardianship. |
| 408 | [Run Amok](https://scryfall.com/search?q=%21%22Run+Amok%22) | 2 | REPRINT | NO | It's a combat trick. |

## Proposed swaps

### Anthropological Mission in, Commander's Plate out (MAIN)

Oracle text:

- [Anthropological Mission](https://scryfall.com/search?q=%21%22Anthropological+Mission%22) {2}{U}, enchantment: "Whenever you cast a noncreature spell, put a quest counter on this enchantment. Draw a card. Then discard a card unless this enchantment has three or more quest counters on it."
- [Commander's Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22) {1}, Equipment: "Equipped creature gets +3/+3 and has protection from each color that's not in your commander's color identity. Equip commander {3}. Equip {5}."

**The deciding axis is role balance (§2.3).** Draw is the one role below a target the pilot has set (8 to 10 sources, and the deck has 7). Protection is the deepest role in the list, with 15 cards that protect Cap counted across the `deck:show` sections, and [Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22) ranks last in it. §2.1 says to compare cards only inside an over-subscribed role, so the cut comes from protection and the slot moves to draw.

What [Mission](https://scryfall.com/search?q=%21%22Anthropological+Mission%22) does in this list:

- 45 of the 64 nonland cards in the 99 are noncreature spells, and 44 remain after the swap, since [Mission](https://scryfall.com/search?q=%21%22Anthropological+Mission%22) doesn't trigger on its own cast.
- The first two triggers loot, which is selection, not card advantage. From the third trigger on, each noncreature spell draws a card.
- Free casts count, because [Mission](https://scryfall.com/search?q=%21%22Anthropological+Mission%22) says "cast": [Fierce Guardianship](https://scryfall.com/search?q=%21%22Fierce+Guardianship%22), [Flawless Maneuver](https://scryfall.com/search?q=%21%22Flawless+Maneuver%22) and [Deflecting Swat](https://scryfall.com/search?q=%21%22Deflecting+Swat%22) with Cap out, the instant [Sunforger](https://scryfall.com/search?q=%21%22Sunforger%22) fetches, [Buster Sword](https://scryfall.com/search?q=%21%22Buster+Sword%22)'s free spell, and [Excalibur, Sword of Eden](https://scryfall.com/search?q=%21%22Excalibur%2C+Sword+of+Eden%22) cast for {0}.
- It stacks with [Sram, Senior Edificer](https://scryfall.com/search?q=%21%22Sram%2C+Senior+Edificer%22), so each Equipment cast draws two with both out.
- It's an enchantment, so it survives the creature removal and creature wipes that take out [Sram](https://scryfall.com/search?q=%21%22Sram%2C+Senior+Edificer%22), [Puresteel Paladin](https://scryfall.com/search?q=%21%22Puresteel+Paladin%22) and [The Mighty Thor, Jane Foster](https://scryfall.com/search?q=%21%22The+Mighty+Thor%2C+Jane+Foster%22). It also survives the deck's own [Single Combat](https://scryfall.com/search?q=%21%22Single+Combat%22), which makes you sacrifice every creature but one.

**Functional reprint check (tool-017).** [Mission](https://scryfall.com/search?q=%21%22Anthropological+Mission%22) is close to [Whirlwind of Thought](https://scryfall.com/search?q=%21%22Whirlwind+of+Thought%22) ({1}{U}{R}{W}: "Whenever you cast a noncreature spell, draw a card."), which the 2026-09-09 package cut for [Captain America, Super-Soldier](https://scryfall.com/search?q=%21%22Captain+America%2C+Super-Soldier%22). The recorded ground was cost: "{1}{U}{R}{W} was the clunkiest cost in the deck." [Mission](https://scryfall.com/search?q=%21%22Anthropological+Mission%22) costs {2}{U} with one coloured pip, so that ground doesn't carry over (§1.1b). The 2026-09-28 review re-checked [Whirlwind](https://scryfall.com/search?q=%21%22Whirlwind+of+Thought%22)'s own cost and found it still held, which stays true for [Whirlwind](https://scryfall.com/search?q=%21%22Whirlwind+of+Thought%22).

**Cost-out (§1.2).** [Mission](https://scryfall.com/search?q=%21%22Anthropological+Mission%22) costs {2}{U} flat. [Bureau Headmaster](https://scryfall.com/search?q=%21%22Bureau+Headmaster%22) cuts only Equipment spells, and [Zirda](https://scryfall.com/search?q=%21%22Zirda%2C+the+Dawnwaker%22) and [Training Grounds](https://scryfall.com/search?q=%21%22Training+Grounds%22) cut activated abilities, so nothing in the list reduces it. [Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22) costs {1}, or {0} with [Bureau Headmaster](https://scryfall.com/search?q=%21%22Bureau+Headmaster%22), and Catch attaches it for free.

**Board check (§1.3).** Nothing in the list turns [Mission](https://scryfall.com/search?q=%21%22Anthropological+Mission%22) off, and it turns nothing off. Its two early discards can bin an Equipment, which [Forge Anew](https://scryfall.com/search?q=%21%22Forge+Anew%22) and [Academy Ruins](https://scryfall.com/search?q=%21%22Academy+Ruins%22) can bring back. [Teferi's Protection](https://scryfall.com/search?q=%21%22Teferi's+Protection%22) phases it out until your next turn, and its quest counters stay on it (CR 702.26d).

**What the cut leaves behind (eval-011, tool-019).**

- [Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22)'s text holds none of [Mission](https://scryfall.com/search?q=%21%22Anthropological+Mission%22)'s trigger words, but [Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22) is itself a cheap noncreature spell, so [Mission](https://scryfall.com/search?q=%21%22Anthropological+Mission%22)'s trigger pool drops from 45 to 44.
- [Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22) is an [Urza's Saga](https://scryfall.com/search?q=%21%22Urza's+Saga%22) chapter III target (mana cost {1}). Five targets remain: [Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22), [Mox Opal](https://scryfall.com/search?q=%21%22Mox+Opal%22), [Colossus Hammer](https://scryfall.com/search?q=%21%22Colossus+Hammer%22), [Basilisk Collar](https://scryfall.com/search?q=%21%22Basilisk+Collar%22) and [Shadowspear](https://scryfall.com/search?q=%21%22Shadowspear%22).
- The Equipment count drops from 21 to 20 for [Swordsman's Steel](https://scryfall.com/search?q=%21%22Swordsman's+Steel%22), [Bruenor Battlehammer](https://scryfall.com/search?q=%21%22Bruenor+Battlehammer%22) and [The Lonely Mountain](https://scryfall.com/search?q=%21%22The+Lonely+Mountain%22).
- The deck's records mention [Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22) twice. `decisions.md` (2026-09-08) lists it as safe under CR 702.16d, because its protection can never strip [Mjölnir, Hammer of Thor](https://scryfall.com/search?q=%21%22Mj%C3%B6lnir%2C+Hammer+of+Thor%22). The 2026-09-28 review called it the weakest rider on the Throw axis and said ranking it against an engine would compare across roles, which is why this proposal ranks it inside protection instead. Neither record says the pilot protects it.

Draw role, the current 99 plus the candidate:

| Card | MV | What it draws | Needs |
|---|---|---|---|
| [Sram, Senior Edificer](https://scryfall.com/search?q=%21%22Sram%2C+Senior+Edificer%22) | 2 | One per Equipment or Aura cast. | 22 Equipment and Auras, present. |
| [The Mighty Thor, Jane Foster](https://scryfall.com/search?q=%21%22The+Mighty+Thor%2C+Jane+Foster%22) | 3 | One per Equipment entering. | Present. |
| [Puresteel Paladin](https://scryfall.com/search?q=%21%22Puresteel+Paladin%22) | 2 | One per Equipment entering. | Present. |
| [Anthropological Mission](https://scryfall.com/search?q=%21%22Anthropological+Mission%22) (candidate) | 3 | Two loots, then one per noncreature spell. | 44 noncreature spells. |
| [Swordsman's Steel](https://scryfall.com/search?q=%21%22Swordsman's+Steel%22) | 4 | One per Equipment you control, once. | Equipment on the battlefield. |
| [Buster Sword](https://scryfall.com/search?q=%21%22Buster+Sword%22) | 3 | One per connected hit, plus a free spell. | Cap connecting. |
| [Akiri, Fearless Voyager](https://scryfall.com/search?q=%21%22Akiri%2C+Fearless+Voyager%22) | 3 | One per attack with an equipped creature. | An attack. |
| [Esper Sentinel](https://scryfall.com/search?q=%21%22Esper+Sentinel%22) | 1 | One per opponent's first noncreature spell each turn, unless they pay {X}. | Nothing. |

Protection role, the current 99, ranked:

| Rank | Card | What it stops | Other jobs |
|---|---|---|---|
| 1 | [Teferi's Protection](https://scryfall.com/search?q=%21%22Teferi's+Protection%22) | Everything for a turn cycle, exile wipes included. | None. |
| 2 | [Fierce Guardianship](https://scryfall.com/search?q=%21%22Fierce+Guardianship%22) | Any noncreature spell, free with Cap out. | None. |
| 3 | [Flawless Maneuver](https://scryfall.com/search?q=%21%22Flawless+Maneuver%22) | Destroy effects on all your creatures, free with Cap out. | None. |
| 4 | [Grand Abolisher](https://scryfall.com/search?q=%21%22Grand+Abolisher%22) | Opponents' spells and most abilities on your turn. | None. |
| 5 | [Boros Charm](https://scryfall.com/search?q=%21%22Boros+Charm%22) | Destroy effects on all your permanents, artifact wipes included. | Double strike, or 4 damage to a player. |
| 6 | [Captain America, Super-Soldier](https://scryfall.com/search?q=%21%22Captain+America%2C+Super-Soldier%22) | Opponents targeting Cap or you while the shield counter holds. | A 3/2 first striker. |
| 7 | [Deflecting Swat](https://scryfall.com/search?q=%21%22Deflecting+Swat%22) | One targeted spell or ability, redirected, free with Cap out. | None. |
| 8 | [Mithril Coat](https://scryfall.com/search?q=%21%22Mithril+Coat%22) | Destroy effects. | Flash, attaches itself to Cap, MV 3 payload. |
| 9 | [Hammer of Nazahn](https://scryfall.com/search?q=%21%22Hammer+of+Nazahn%22) | Destroy effects. | Attaches every Equipment as it enters, MV 4 payload. |
| 10 | [Swiftfoot Boots](https://scryfall.com/search?q=%21%22Swiftfoot+Boots%22) | Opponents targeting Cap. | Haste. |
| 11 | [Akiri, Fearless Voyager](https://scryfall.com/search?q=%21%22Akiri%2C+Fearless+Voyager%22) | Destroy effects and damage, through its {W} unattach. | Draws on equipped attacks. |
| 12 | [Codsworth, Handy Helper](https://scryfall.com/search?q=%21%22Codsworth%2C+Handy+Helper%22) | Ward {2} on Cap. | {W}{W} for Equipment, and an attach. |
| 13 | [Brotherhood Regalia](https://scryfall.com/search?q=%21%22Brotherhood+Regalia%22) | Ward {2}. | Unblockable. |
| 14 | [Sword of Feast and Famine](https://scryfall.com/search?q=%21%22Sword+of+Feast+and+Famine%22) | Black and green spells, damage and blockers. | +2/+2, discard, untaps your lands, MV 3 payload. |
| 15 | [Commander's Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22) | Black and green spells, damage and blockers. | +3/+3, MV 1 payload. |

[Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22)'s protection is a subset of the Sword's, since both stop black and green. [Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22)'s other job is +3/+3 on a creature that already carries [Colossus Hammer](https://scryfall.com/search?q=%21%22Colossus+Hammer%22) or [Excalibur](https://scryfall.com/search?q=%21%22Excalibur%2C+Sword+of+Eden%22), and its Throw deals 1 damage.

**Counter-argument (§2.5).** [Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22) is a substitute for the Sword's protection, and a spare key for a load-bearing effect is consistency, not waste. That holds when the effect is scarce. Here protection has 14 other cards, Catch moves one Equipment per combat so [Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22) competes with the payloads for that move, and the deck's draw sits below the pilot's aim. If the pilot reads protection as the scarcer resource, [U.S.S. Defiant, Mirror Migrant](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Mirror+Migrant%22) on the bench is the in-kind replacement for [Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22).

Other cuts considered:

- [Esper Sentinel](https://scryfall.com/search?q=%21%22Esper+Sentinel%22) is the weakest draw card, but swapping it keeps the draw count at 7. The 2026-09-28 [Windcrag Siege](https://scryfall.com/search?q=%21%22Windcrag+Siege%22) swap that named [Sentinel](https://scryfall.com/search?q=%21%22Esper+Sentinel%22) was dropped on the Siege's grounds ("only a payoff doubler"), not on [Sentinel](https://scryfall.com/search?q=%21%22Esper+Sentinel%22)'s.
- A land (35 down to 34). The founding log's grounds for a land cut were flooding, and no play report has shown it.
- [Single Combat](https://scryfall.com/search?q=%21%22Single+Combat%22). Wipes are at 2, which isn't over any target, and it's the deck's only answer to a wide board below six mana.
- [Swiftfoot Boots](https://scryfall.com/search?q=%21%22Swiftfoot+Boots%22) ranks 10th in protection, and its haste matters on the turn Cap is recast.

Effect on the curve (the 64 nonland cards in the 99, printed MV):

- Average MV goes from 2.875 to 2.906.
- MV ≤ 2 goes from 29 to 28.
- MV ≤ 3 stays at 50.
- One MV 1 card becomes an MV 3 card, and that's the cost the pilot's win-turn estimate will show.
- Blue pips go from 7 to 8, Game Changers stay at 3, and draw sources go from 7 to 8.

## Bench

### Unwinding Clock, which would displace Thorin, Mountain-king

- [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) {4}: "Untap all artifacts you control during each other player's untap step."
- In this list it untaps 5 rocks (6 mana), [Brass Squire](https://scryfall.com/search?q=%21%22Brass+Squire%22) ("{T}: Attach target Equipment you control to target creature you control", with no timing limit), [Codsworth, Handy Helper](https://scryfall.com/search?q=%21%22Codsworth%2C+Handy+Helper%22) and [Master Transmuter](https://scryfall.com/search?q=%21%22Master+Transmuter%22) three extra times per round (ledger tap-006).
- Throw has no timing limit either, so rock mana on opponents' turns becomes instant-speed Throws at {1} under [Zirda](https://scryfall.com/search?q=%21%22Zirda%2C+the+Dawnwaker%22) or [Training Grounds](https://scryfall.com/search?q=%21%22Training+Grounds%22), and [Squire](https://scryfall.com/search?q=%21%22Brass+Squire%22) re-attaches after each one. With [Excalibur, Sword of Eden](https://scryfall.com/search?q=%21%22Excalibur%2C+Sword+of+Eden%22) on Cap that's up to 12 damage on every opponent's turn.
- [Master Transmuter](https://scryfall.com/search?q=%21%22Master+Transmuter%22) with [Meteor Sword](https://scryfall.com/search?q=%21%22Meteor+Sword%22) returns the Sword and puts it back for {U} on each opponent's turn, and each ETB destroys a permanent.
- None of this is a loop, because each piece untaps once per opponent's untap step.
- It's bench rather than MAIN because it does nothing the turn it lands, and its value depends on the rocks or the three artifact creatures already being out. [Thorin, Mountain-king](https://scryfall.com/search?q=%21%22Thorin%2C+Mountain-king%22) ranks last in the attach role on repeatability, since it's the only one-shot there, but its ETB re-suits Cap at once and deals his power to a creature. The pilot brought [Thorin](https://scryfall.com/search?q=%21%22Thorin%2C+Mountain-king%22) in on 2026-09-09 and watches the win turn, and [Thorin](https://scryfall.com/search?q=%21%22Thorin%2C+Mountain-king%22) is the faster card.
- [Thorin](https://scryfall.com/search?q=%21%22Thorin%2C+Mountain-king%22)'s text has none of [Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22)'s trigger words. [Brass Squire](https://scryfall.com/search?q=%21%22Brass+Squire%22), [Codsworth](https://scryfall.com/search?q=%21%22Codsworth%2C+Handy+Helper%22) and [Master Transmuter](https://scryfall.com/search?q=%21%22Master+Transmuter%22) all get better with [Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22), so none of them should be its cut (eval-011).

### Seven of Nine, Unassimilated, which would displace Esper Sentinel

- [Seven of Nine, Unassimilated](https://scryfall.com/search?q=%21%22Seven+of+Nine%2C+Unassimilated%22) {1}{U}, 0/4 legendary artifact creature: "At the beginning of your first main phase, draw a card. Then discard a card unless you control five or more differently named lands."
- This manabase has 31 names among 35 lands, so from the fifth land drop it's an extra card every turn. Before that it loots.
- Like [Esper Sentinel](https://scryfall.com/search?q=%21%22Esper+Sentinel%22) it's an artifact for metalcraft, and the 0/4 body can carry gear.
- [Sentinel](https://scryfall.com/search?q=%21%22Esper+Sentinel%22)'s draw is a tax each opponent can switch off for {1}, and it fades as the game goes on, while Seven's draw starts late and keeps going. The cost is a blue pip on turn two instead of a white one on turn one.

### Mr. Spock, Science Officer, which would displace Esper Sentinel

- [Mr. Spock, Science Officer](https://scryfall.com/search?q=%21%22Mr.+Spock%2C+Science+Officer%22) {2}{U}{U}, 2/4: "If you would draw a card, draw two cards instead."
- The draw step alone makes it one extra card a turn, so it's never a blank multiplier (§2.5). With [Sram](https://scryfall.com/search?q=%21%22Sram%2C+Senior+Edificer%22), [Puresteel Paladin](https://scryfall.com/search?q=%21%22Puresteel+Paladin%22) or [The Mighty Thor](https://scryfall.com/search?q=%21%22The+Mighty+Thor%2C+Jane+Foster%22) out, each of their draws becomes two.
- Double blue at four mana is the cost in a list with 7 blue pips and 17 blue sources. It's also a creature, so the deck's own [Single Combat](https://scryfall.com/search?q=%21%22Single+Combat%22) kills it.

### Jean-Luc Picard, Luminary, which would displace Esper Sentinel

- [Jean-Luc Picard, Luminary](https://scryfall.com/search?q=%21%22Jean-Luc+Picard%2C+Luminary%22) {1}{U}{R}{W}, 2/4: "Whenever another historic permanent you control with mana value 3 or greater enters, draw a card." Its seek-out ability adds a +1/+1 counter to another creature.
- 26 cards in the 99 qualify (14 Equipment, 3 artifact creatures and 9 legendary creatures), plus Cap on a recast. [Excalibur](https://scryfall.com/search?q=%21%22Excalibur%2C+Sword+of+Eden%22) counts at MV 12 even when it costs {0}.
- It shares a trigger family with [Puresteel Paladin](https://scryfall.com/search?q=%21%22Puresteel+Paladin%22) and [The Mighty Thor](https://scryfall.com/search?q=%21%22The+Mighty+Thor%2C+Jane+Foster%22) and dies to the same removal, at four mana in three colours. [Mission](https://scryfall.com/search?q=%21%22Anthropological+Mission%22) and [Seven of Nine](https://scryfall.com/search?q=%21%22Seven+of+Nine%2C+Unassimilated%22) draw as much for less.

### U.S.S. Defiant, Mirror Migrant, which would displace Commander's Plate

- [U.S.S. Defiant, Mirror Migrant](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Mirror+Migrant%22) {2}, flash: "When U.S.S. Defiant enters, it and up to one target creature you control phase out."
- Equipment on Cap phases out with him and comes back attached (CR 702.26g). A phased-out permanent can't be affected by anything (CR 702.26b), so it beats exile, wipes, damage and edicts, where [Commander's Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22) stops only black and green.
- Take this instead of the MAIN if the pilot wants [Plate](https://scryfall.com/search?q=%21%22Commander's+Plate%22)'s slot to stay in protection. Cast during your own combat it also removes Cap from combat (CR 702.26b), so it's mainly an opponent's-turn card.
- It's an artifact, so it also counts for metalcraft and [Excalibur](https://scryfall.com/search?q=%21%22Excalibur%2C+Sword+of+Eden%22)'s discount.

### Starfleet Communicator, which would displace Commander's Plate

- [Starfleet Communicator](https://scryfall.com/search?q=%21%22Starfleet+Communicator%22) {3}: "When you cast this spell, copy it. (The copy becomes a token.) Equipped creature has 'Whenever this creature attacks, draw X cards, then you may put up to X land cards from your hand onto the battlefield tapped, where X is the number of other creatures you control with a Communicator attached to them.' Equip {1}"
- One card is two MV 3 Equipment. Both entering draws two with [Puresteel Paladin](https://scryfall.com/search?q=%21%22Puresteel+Paladin%22) or [The Mighty Thor](https://scryfall.com/search?q=%21%22The+Mighty+Thor%2C+Jane+Foster%22) out, and both are Throw payloads.
- Cap draws one card per attack once another creature wears the token, which costs one equip.
- Take this if the pilot declines [Mission](https://scryfall.com/search?q=%21%22Anthropological+Mission%22) but wants a draw source that keeps the slot an Equipment.

### Lwaxana Troi, Charming Guest, which would displace Thorin, Mountain-king

- [Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22) {1}{R}, 2/2: "You may choose not to untap Lwaxana Troi during your untap step. {2}, {T}: Choose another target creature you control. For as long as Lwaxana Troi remains tapped, if a triggered ability of that creature triggers, that ability triggers an additional time."
- Aimed at Cap, Catch triggers twice each combat (CR 603.2d), and each instance picks its own target (ledger trig-014). Point both at the Equipment on Cap, Throw before the first trigger resolves, let it re-attach, then Throw again before the second resolves. That's two free re-attaches of the same payload, or four with [Genji Glove](https://scryfall.com/search?q=%21%22Genji+Glove%22)'s extra combat.
- It also doubles abilities granted to Cap (ledger equip-018), such as [The Reaver Cleaver](https://scryfall.com/search?q=%21%22The+Reaver+Cleaver%22)'s Treasures. Aimed at [Sram](https://scryfall.com/search?q=%21%22Sram%2C+Senior+Edificer%22) or [Puresteel Paladin](https://scryfall.com/search?q=%21%22Puresteel+Paladin%22) instead, it doubles their draws.
- The activation costs {1} under [Zirda](https://scryfall.com/search?q=%21%22Zirda%2C+the+Dawnwaker%22) or [Training Grounds](https://scryfall.com/search?q=%21%22Training+Grounds%22).
- Board check (§1.3). [Captain America, Living Legend](https://scryfall.com/search?q=%21%22Captain+America%2C+Living+Legend%22) untaps [Lwaxana](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22) the first time she taps on your turn, which ends the effect, so activate her on an opponent's turn or twice on yours. [Teferi's Protection](https://scryfall.com/search?q=%21%22Teferi's+Protection%22) phases her out, which also ends it (CR 702.26f). If Cap dies and is recast he's a new object and needs a new activation (CR 400.7).
- It's the alternative to [Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) for [Thorin](https://scryfall.com/search?q=%21%22Thorin%2C+Mountain-king%22)'s slot. [Brass Squire](https://scryfall.com/search?q=%21%22Brass+Squire%22) is close to it in output, but [Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) would make [Squire](https://scryfall.com/search?q=%21%22Brass+Squire%22) a payoff.

### Transwarp Hub, which would displace Dalakos, Crafter of Wonders

- [Transwarp Hub](https://scryfall.com/search?q=%21%22Transwarp+Hub%22) {2}{U}: "When this Spacecraft enters, mill five cards. You may put up to two artifact cards from among them into your hand." Station, then at 3+: "{T}: Target creature can't be blocked this turn."
- About a third of the library is artifacts, so it usually finds one or two. Milled Equipment is a target for [Forge Anew](https://scryfall.com/search?q=%21%22Forge+Anew%22) and [Academy Ruins](https://scryfall.com/search?q=%21%22Academy+Ruins%22).
- One station activation from a 3-power creature unlocks unblockable for Cap every turn. The [Hub](https://scryfall.com/search?q=%21%22Transwarp+Hub%22) has no power and toughness box, so it never becomes a creature, and its {T} works the turn it lands (CR 302.6 covers creatures only). [Captain America, Living Legend](https://scryfall.com/search?q=%21%22Captain+America%2C+Living+Legend%22) untaps the stationing creature.
- [Dalakos, Crafter of Wonders](https://scryfall.com/search?q=%21%22Dalakos%2C+Crafter+of+Wonders%22) gives equipped creatures flying and haste and taps for {C}{C} toward artifacts. The haste on a recast turn and the mana keep it ahead, even though unblockable beats flying.

### Federation Resupply, which would displace Steelshaper's Gift

- [Federation Resupply](https://scryfall.com/search?q=%21%22Federation+Resupply%22) {1}{W}: "Search your library for an Aura, Equipment, or Spacecraft card, reveal it, put it into your hand, then shuffle. Beam me up {3}{W}"
- It's [Steelshaper's Gift](https://scryfall.com/search?q=%21%22Steelshaper's+Gift%22) for one more mana, plus a second tutor later from the graveyard. The beam me up cost returns a creature to hand, so pick [Stoneforge Mystic](https://scryfall.com/search?q=%21%22Stoneforge+Mystic%22) (another tutor on the recast) or [Esper Sentinel](https://scryfall.com/search?q=%21%22Esper+Sentinel%22), never Cap.
- [Gift](https://scryfall.com/search?q=%21%22Steelshaper's+Gift%22) is the cheapest tutor in the list and a turn-one play, and the deck already runs nine tutors counting the three tutor lands, so this stays on the bench.

### Talisman of Progress, which would displace Axgard Armory

- [Talisman of Progress](https://scryfall.com/search?q=%21%22Talisman+of+Progress%22) {2}: "{T}: Add {C}. {T}: Add {W} or {U}. This artifact deals 1 damage to you."
- The 2026-09-09 log cut it as a trial and said to revisit it if colour screw showed up. No play report shows colour screw, so the grounds haven't changed. [Axgard Armory](https://scryfall.com/search?q=%21%22Axgard+Armory%22) is the land the 2026-09-09 manabase pass flagged as the next slot to look at if the deck feels slow.

### Spire of Industry, which would displace one Mountain

- [Spire of Industry](https://scryfall.com/search?q=%21%22Spire+of+Industry%22): "{T}: Add {C}. {T}, Pay 1 life: Add one mana of any color. Activate only if you control an artifact."
- The list has 30 artifacts, so [Spire](https://scryfall.com/search?q=%21%22Spire+of+Industry%22) makes any colour from about turn two, and colourless for free, which the deck spends on equips and Throw.
- A basic [Mountain](https://scryfall.com/search?q=%21%22Mountain%22) is the cut because red has 19 sources, the most after white. The list keeps six basics for [Prismatic Vista](https://scryfall.com/search?q=%21%22Prismatic+Vista%22), and seven Mountains remain for [Arena of Glory](https://scryfall.com/search?q=%21%22Arena+of+Glory%22).

## Near-misses and traps

- [Sword of Light and Shadow](https://scryfall.com/search?q=%21%22Sword+of+Light+and+Shadow%22) reads like a second [Sword of Feast and Famine](https://scryfall.com/search?q=%21%22Sword+of+Feast+and+Famine%22), but protection from white puts [Super-Soldier Serum](https://scryfall.com/search?q=%21%22Super-Soldier+Serum%22), a white Aura, into the graveyard (CR 702.16c). It also stops [Boros Charm](https://scryfall.com/search?q=%21%22Boros+Charm%22)'s double-strike mode from targeting Cap.
- [Quark, Humble Proprietor](https://scryfall.com/search?q=%21%22Quark%2C+Humble+Proprietor%22) makes a Treasure every upkeep, but its "You can't sacrifice Treasure tokens" also locks [The Reaver Cleaver](https://scryfall.com/search?q=%21%22The+Reaver+Cleaver%22)'s Treasures, the deck's Throw fuel.
- [Austere Command](https://scryfall.com/search?q=%21%22Austere+Command%22)'s best pair for this list, creatures MV 4 or more plus enchantments, spares Cap and the Equipment. It still destroys [Bruenor](https://scryfall.com/search?q=%21%22Bruenor+Battlehammer%22), [Thorin](https://scryfall.com/search?q=%21%22Thorin%2C+Mountain-king%22), [Master Transmuter](https://scryfall.com/search?q=%21%22Master+Transmuter%22), [Stonehewer Giant](https://scryfall.com/search?q=%21%22Stonehewer+Giant%22), all five enchantments ([Super-Soldier Serum](https://scryfall.com/search?q=%21%22Super-Soldier+Serum%22) on Cap among them) and [Urza's Saga](https://scryfall.com/search?q=%21%22Urza's+Saga%22) (ledger eval-045).
- [Gwyndala, the Progeny](https://scryfall.com/search?q=%21%22Gwyndala%2C+the+Progeny%22)'s Equipment token can become a copy of a payload, but a copy of a legendary payload is legendary too, and the legend rule removes one of the two at once (ledger equip-009). Only [Meteor Sword](https://scryfall.com/search?q=%21%22Meteor+Sword%22) and [Argentum Armor](https://scryfall.com/search?q=%21%22Argentum+Armor%22) work as targets.
- [Gray and Adira, Forever Joined](https://scryfall.com/search?q=%21%22Gray+and+Adira%2C+Forever+Joined%22) can copy Cap, but the token arrives at the beginning of combat after Catch has triggered, and it carries no Equipment.
- [Lightning Greaves](https://scryfall.com/search?q=%21%22Lightning+Greaves%22) still blocks your own equip abilities onto Cap with shroud (the 2026-09-08 grounds).
- [Darksteel Plate](https://scryfall.com/search?q=%21%22Darksteel+Plate%22) and [Duelist's Heritage](https://scryfall.com/search?q=%21%22Duelist's+Heritage%22) read like upgrades, but they only repeat what [Mithril Coat](https://scryfall.com/search?q=%21%22Mithril+Coat%22), [Genji Glove](https://scryfall.com/search?q=%21%22Genji+Glove%22), [Boros Charm](https://scryfall.com/search?q=%21%22Boros+Charm%22) and [Mjölnir](https://scryfall.com/search?q=%21%22Mj%C3%B6lnir%2C+Hammer+of+Thor%22) already do.
- [Kirk, Commanding Officer](https://scryfall.com/search?q=%21%22Kirk%2C+Commanding+Officer%22) and [Sulu, Space Swashbuckler](https://scryfall.com/search?q=%21%22Sulu%2C+Space+Swashbuckler%22) read like Equipment draw engines. [Kirk](https://scryfall.com/search?q=%21%22Kirk%2C+Commanding+Officer%22)'s card is an impulse that's lost when Throw has spent the mana, and [Sulu](https://scryfall.com/search?q=%21%22Sulu%2C+Space+Swashbuckler%22) draws only when [Sulu](https://scryfall.com/search?q=%21%22Sulu%2C+Space+Swashbuckler%22) himself taps.
- [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) kills only [Esper Sentinel](https://scryfall.com/search?q=%21%22Esper+Sentinel%22) here, and the deck makes no tokens worth clamping.
- [Engineered Explosives](https://scryfall.com/search?q=%21%22Engineered+Explosives%22) tops out at three counters, and every setting from 0 to 3 hits the deck's own cheap Equipment or rocks.
- Spacecraft aren't Vehicles, so [Sram](https://scryfall.com/search?q=%21%22Sram%2C+Senior+Edificer%22) doesn't draw on them.
- Cute lines worth keeping, even though none of these cards is proposed:
  - [Combat Celebrant](https://scryfall.com/search?q=%21%22Combat+Celebrant%22) with [Captain America, Living Legend](https://scryfall.com/search?q=%21%22Captain+America%2C+Living+Legend%22). [Living Legend](https://scryfall.com/search?q=%21%22Captain+America%2C+Living+Legend%22) untaps [Celebrant](https://scryfall.com/search?q=%21%22Combat+Celebrant%22) after it attacks, so the exert never costs it an untap step, and it can exert every turn it survives. Each exert is an extra combat, which means a second Catch and a second attack for Cap. A 4/1 attacking every turn rarely survives, though.
  - [Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22) aimed at Cap with [Genji Glove](https://scryfall.com/search?q=%21%22Genji+Glove%22) out gives four Catch triggers a turn, each one a free re-attach for another Throw.
  - [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) with [Master Transmuter](https://scryfall.com/search?q=%21%22Master+Transmuter%22) and [Meteor Sword](https://scryfall.com/search?q=%21%22Meteor+Sword%22) destroys a permanent on each opponent's turn for {U}.
