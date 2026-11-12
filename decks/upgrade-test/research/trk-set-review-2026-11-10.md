# Star Trek (TRK + TRC) set review: upgrade-test, 2026-11-10

## Header

This review reads Star Trek (TRK, 311 cards) and Star Trek Commander (TRC, 336 cards) against
`decks/upgrade-test`, the pilot's live Chatterfang list. Both sets release on 2026-11-13. Scryfall
already lists every card in both as Commander-legal, so no verdict below waits on a legality change.

**Method.** I followed `.claude/skills/set-review/reviewer.md` and deck-brain §1 and §2. Set cards'
text comes from the pool files `data/trk-candidates-upgrade-test.json` and
`data/trc-candidates-upgrade-test.json`, the deck's own cards from the bundle's oracle text, and rules
from `rules/sections/` (CR 2026-08-07). Each card was costed in this deck's mana. The list runs no cost
reducers, so printed cost is the real cost except for X spells. Each card was checked against the list's
own board, scored ability by ability (ledger eval-021), and grepped by name and by rules text against
this deck's `research/decisions.md` and `research/gameplan.md` and the parent's `decisions.md`,
`proposal.json` and FRA review (tool-017). For each MAIN, I grepped the cut's oracle text for the
incoming card's trigger words and read every record of the cut before naming it (eval-011, tool-019).
Every MAIN has its role ranked in a table first (§2.1 step 4).

**Lists.** One list gets a verdict: `main`, the target (Bracket 3, avg MV 2.88 counted with the
commander as `deck:show` does, MV ≤ 2 27, MV ≤ 3 49). `decks/chatterfang` is the pre-fork record and
has no column.

**Field lens.** EDHREC has no data for TRK or TRC before release, so this review skips that lens
(§2.2).

**Game Changers.** 1 before ([Gaea's Cradle](https://scryfall.com/search?q=%21%22Gaea%27s+Cradle%22)) and 1 after. Neither set has a Game Changer.

## Pool

215 cards fit Golgari identity and are Commander-legal: 118 from TRK and 97 from TRC. No card is in
both files. 156 are new and 59 are reprints, 4 in TRK ([Engineered Explosives](https://scryfall.com/search?q=%21%22Engineered+Explosives%22), [Forest](https://scryfall.com/search?q=%21%22Forest%22),
[Overgrown Tomb](https://scryfall.com/search?q=%21%22Overgrown+Tomb%22), [Swamp](https://scryfall.com/search?q=%21%22Swamp%22)) and 55 in TRC. 10 are already in `main`: [Beast Within](https://scryfall.com/search?q=%21%22Beast+Within%22),
[Command Tower](https://scryfall.com/search?q=%21%22Command+Tower%22), [Cultivate](https://scryfall.com/search?q=%21%22Cultivate%22), [Forest](https://scryfall.com/search?q=%21%22Forest%22), [Heroic Intervention](https://scryfall.com/search?q=%21%22Heroic+Intervention%22), [Overgrown Tomb](https://scryfall.com/search?q=%21%22Overgrown+Tomb%22),
[Scute Swarm](https://scryfall.com/search?q=%21%22Scute+Swarm%22), [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22), [Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22) and [Swamp](https://scryfall.com/search?q=%21%22Swamp%22).

## Result

| List | MAIN | SIDE | IN | NO |
|---|---|---|---|---|
| main | 2 | 8 | 10 | 195 |

Each MAIN is its own decision.

- MAIN: [Kurn, Son of Mogh](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) in, [Gruesome Fate](https://scryfall.com/search?q=%21%22Gruesome+Fate%22) out. [Kurn](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) draws up to three a turn for no mana,
  which takes draw by the pilot's count from 7 to 8. Finishers holds one more card than its founding
  target, and the decision log already names [Gruesome Fate](https://scryfall.com/search?q=%21%22Gruesome+Fate%22) as the cut for an eighth draw source.
- MAIN: [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22) in, [Gardenize](https://scryfall.com/search?q=%21%22Gardenize%22) out. Real removal goes from 3 to 4. Ramp & Mana holds 15
  against a founding target of 8, and [Gardenize](https://scryfall.com/search?q=%21%22Gardenize%22) is the lowest-ranked ramp card nobody has protected.
- SIDE: [Augur of Autumn](https://scryfall.com/search?q=%21%22Augur+of+Autumn%22) would displace [Gardenize](https://scryfall.com/search?q=%21%22Gardenize%22). It competes with [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22) for that
  slot.
- SIDE: [Guardian Project](https://scryfall.com/search?q=%21%22Guardian+Project%22) would displace [Gruesome Fate](https://scryfall.com/search?q=%21%22Gruesome+Fate%22). It competes with [Kurn](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) for that slot.
- SIDE: [Eject the Warp Core](https://scryfall.com/search?q=%21%22Eject+the+Warp+Core%22) would displace [Gardenize](https://scryfall.com/search?q=%21%22Gardenize%22). It's the drain-synergy alternative to
  [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22).
- SIDE: [Grand Nagus Zek](https://scryfall.com/search?q=%21%22Grand+Nagus+Zek%22) would displace [Tireless Provisioner](https://scryfall.com/search?q=%21%22Tireless+Provisioner%22).
- SIDE: [Exploration](https://scryfall.com/search?q=%21%22Exploration%22) would displace [Dryad of the Ilysian Grove](https://scryfall.com/search?q=%21%22Dryad+of+the+Ilysian+Grove%22), the pilot's own hold.
- SIDE: [Jadzia Dax, Living Legacy](https://scryfall.com/search?q=%21%22Jadzia+Dax%2C+Living+Legacy%22) would displace [Twitching Doll](https://scryfall.com/search?q=%21%22Twitching+Doll%22).
- SIDE: [Fabled Passage](https://scryfall.com/search?q=%21%22Fabled+Passage%22) would displace a basic [Forest](https://scryfall.com/search?q=%21%22Forest%22).
- SIDE: [Mosswort Bridge](https://scryfall.com/search?q=%21%22Mosswort+Bridge%22) would displace a basic [Forest](https://scryfall.com/search?q=%21%22Forest%22).

Both MAINs together move avg MV 2.88 → 2.86, MV ≤ 2 27 → 28 and MV ≤ 3 49 → 49. Draw by the pilot's
count goes 7 → 8 and real removal 3 → 4. Game Changers stay at 1.

One open item from the last set review: the FRA review (2026-09-28) rated [Lich's Relic](https://scryfall.com/search?q=%21%22Lich%27s+Relic%22) MAIN for
this list, and `research/decisions.md` never records it as applied or declined. See swap 2.

## Set mechanics as they matter to this deck

- **Station** (CR 702.184a) taps another creature and adds charge counters equal to its power, at
  sorcery speed. A 1/1 token adds one counter, so a station-8 Spacecraft costs eight taps, and a token
  tapped to station can't tap for [Cryptolith Rite](https://scryfall.com/search?q=%21%22Cryptolith+Rite%22) or [Springleaf Parade](https://scryfall.com/search?q=%21%22Springleaf+Parade%22) mana. No Spacecraft here
  improves this list.
- **Planet land tokens** ("New Planet", from [David and Carol Marcus, Creators](https://scryfall.com/search?q=%21%22David+and+Carol+Marcus%2C+Creators%22), [Stable Wormhole](https://scryfall.com/search?q=%21%22Stable+Wormhole%22),
  [Saurian Explorer](https://scryfall.com/search?q=%21%22Saurian+Explorer%22), [Artificial Anomaly](https://scryfall.com/search?q=%21%22Artificial+Anomaly%22) and [Temporal Anomaly](https://scryfall.com/search?q=%21%22Temporal+Anomaly%22)) are tokens, so [Chatterfang](https://scryfall.com/search?q=%21%22Chatterfang%2C+Squirrel+General%22)
  adds a Squirrel. They're also lands entering, so they fire [Tireless Provisioner](https://scryfall.com/search?q=%21%22Tireless+Provisioner%22), [Scute Swarm](https://scryfall.com/search?q=%21%22Scute+Swarm%22)
  and [Avenger of Zendikar](https://scryfall.com/search?q=%21%22Avenger+of+Zendikar%22). None of those sources earns a slot on this alone.
- **Communicators** ([Combadge](https://scryfall.com/search?q=%21%22Combadge%22), [Starfleet Communicator](https://scryfall.com/search?q=%21%22Starfleet+Communicator%22)) copy themselves on cast. A copy of a
  permanent spell becomes a token that isn't "created" (CR 111.13, ledger repl-011), so [Chatterfang](https://scryfall.com/search?q=%21%22Chatterfang%2C+Squirrel+General%22),
  [Peregrin Took](https://scryfall.com/search?q=%21%22Peregrin+Took%22), [Tippy-Toe](https://scryfall.com/search?q=%21%22Tippy-Toe%2C+Terrific+Partner%22) and [Mirkwood Bats](https://scryfall.com/search?q=%21%22Mirkwood+Bats%22) ignore it.
- **Dilemma** is choosing modes for a spell or ability. In this list only [Black Market Connections](https://scryfall.com/search?q=%21%22Black+Market+Connections%22)'
  trigger ("choose one or more") is a dilemma, so the dilemma payoffs fire once a turn.
- **Beam me up** casts a card from the graveyard by returning a creature you control to hand. A token
  returned to hand ceases to exist (CR 111.7). That's a token leaving the battlefield, which fires
  [Nadier's Nightblade](https://scryfall.com/search?q=%21%22Nadier%27s+Nightblade%22), but it isn't a death.
- **Strange new worlds** counts differently named lands. This list has 27 land names (25 nonbasics plus
  Forest and Swamp), so a board of six lands usually counts 5 or 6.
- **Federation** counts creature types among non-Borg creatures. Changelings have every creature type,
  Borg included, so the Shapeshifters from [Springleaf Parade](https://scryfall.com/search?q=%21%22Springleaf+Parade%22) and [Black Market Connections](https://scryfall.com/search?q=%21%22Black+Market+Connections%22) count for
  nothing.
- **Finality counters** exile a creature instead of letting it die, so a creature returned with one
  fires no death trigger the second time.
- **Assimilate** steals creature cards from opponents' graveyards. This list has no use for it.
- **Battlefront** ([Kurn, Son of Mogh](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22)) isn't in CR 2026-08-07 and reads as an ability word: the text
  after it is complete on its own. X is the number of opponents you attacked that turn.

## Classification table

Verdicts: MAIN would displace a named card now, SIDE is bench-worthy and names the card it would
displace, IN means `main` already runs it, NO is a pass. Rows are grouped by colour and sorted by MV.

### Black

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 1 | [A Good Day to Die](https://scryfall.com/search?q=%21%22A+Good+Day+to+Die%22) | 1 | NEW (TRK) | NO | A one-shot pump that draws a card if the creature dies. [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) already draws two per death for {1}. |
| 2 | [Collation Trimatrix](https://scryfall.com/search?q=%21%22Collation+Trimatrix%22) | 1 | NEW (TRK) | NO | It taps three artifact creatures per card, and this list's creature tokens aren't artifacts. |
| 3 | [General Chang, Cold Warrior](https://scryfall.com/search?q=%21%22General+Chang%2C+Cold+Warrior%22) | 1 | NEW (TRK) | NO | A sacrifice outlet that costs {1} a use and pumps only Klingons. [Ashnod's Altar](https://scryfall.com/search?q=%21%22Ashnod%27s+Altar%22) pays mana for the same sacrifice. |
| 4 | [Relentless Drednok](https://scryfall.com/search?q=%21%22Relentless+Drednok%22) | 1 | NEW (TRK) | NO | A 1/1 lifelink with a {2}{B} graveyard cantrip. Neither half beats a card already in the list. |
| 5 | [Storied Veteran](https://scryfall.com/search?q=%21%22Storied+Veteran%22) | 1 | NEW (TRK) | NO | A 2/1 that can't block, and its second life carries a finality counter, so it's exiled instead of dying. |
| 6 | [Test of Loyalty](https://scryfall.com/search?q=%21%22Test+of+Loyalty%22) | 1 | NEW (TRK) | NO | A sorcery that exiles one card from a graveyard and draws. One card is too little graveyard hate, and [Bojuka Bog](https://scryfall.com/search?q=%21%22Bojuka+Bog%22) takes a whole graveyard. |
| 7 | [Battle-Scarred Survivalist](https://scryfall.com/search?q=%21%22Battle-Scarred+Survivalist%22) | 2 | NEW (TRK) | NO | It grows once a turn, four times a round here (ledger trig-037), but it's a combat body with no token and no drain. |
| 8 | [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22) | 2 | REPRINT (TRC) | MAIN | A {1}{B} instant that destroys any creature or planeswalker for 3 life. Real removal goes from 3 to 4. See Proposed swaps. |
| 9 | [Blood-Sport Champion](https://scryfall.com/search?q=%21%22Blood-Sport+Champion%22) | 2 | NEW (TRC) | NO | Kicked, it gives the team deathtouch for one turn. That's a combat trick on a 2/2, and [Craterhoof Behemoth](https://scryfall.com/search?q=%21%22Craterhoof+Behemoth%22) already closes combat. |
| 10 | [Collective Drone](https://scryfall.com/search?q=%21%22Collective+Drone%22) | 2 | NEW (TRK) | NO | Its power counts artifact creatures, and this list runs two. |
| 11 | [De-evolve](https://scryfall.com/search?q=%21%22De-evolve%22) | 2 | NEW (TRK) | NO | A -4/-0 Aura that only exiles at threshold, and tokens never fill the graveyard. |
| 12 | [Eject the Warp Core](https://scryfall.com/search?q=%21%22Eject+the+Warp+Core%22) | 2 | NEW (TRK) | SIDE | A {1}{B} instant whose kicker sacrifice is free here and fires every drain. -6/-6 kills indestructible creatures but misses planeswalkers and toughness 7 or more. Bench behind [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22). |
| 13 | [Extraction Integrant](https://scryfall.com/search?q=%21%22Extraction+Integrant%22) | 2 | NEW (TRC) | NO | It gives menace to artifact creatures only. |
| 14 | [Kai Winn, Faithless Leader](https://scryfall.com/search?q=%21%22Kai+Winn%2C+Faithless+Leader%22) | 2 | NEW (TRK) | NO | It punishes one named card, so it depends on knowing an opponent's list. |
| 15 | [Last Gasp](https://scryfall.com/search?q=%21%22Last+Gasp%22) | 2 | REPRINT (TRC) | NO | A -3/-3 instant. [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22) kills a creature of any size for the same mana. |
| 16 | [Night's Whisper](https://scryfall.com/search?q=%21%22Night%27s+Whisper%22) | 2 | REPRINT (TRC) | NO | Draw two once for 2 life. [Deadly Dispute](https://scryfall.com/search?q=%21%22Deadly+Dispute%22) does that plus a Treasure, which is a token event here, and it's the recorded undo for this slot. |
| 17 | [Pattern Buffer Preservation](https://scryfall.com/search?q=%21%22Pattern+Buffer+Preservation%22) | 2 | NEW (TRK) | NO | Card selection at sorcery speed. Beam me up costs a creature back to hand. |
| 18 | [Resistance Is Futile](https://scryfall.com/search?q=%21%22Resistance+Is+Futile%22) | 2 | NEW (TRK) | NO | A sorcery kill that misses artifact creatures. [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22) is an instant and also hits planeswalkers. |
| 19 | [Salt Vampire](https://scryfall.com/search?q=%21%22Salt+Vampire%22) | 2 | NEW (TRK) | NO | A 2/2 lifelink whose hand disruption gives the opponent a replacement card. |
| 20 | [Tal Shiar Operative](https://scryfall.com/search?q=%21%22Tal+Shiar+Operative%22) | 2 | NEW (TRK) | NO | An attack trigger that grants deathtouch or surveils. It makes no token and drains nothing. |
| 21 | [Tell Me What You See](https://scryfall.com/search?q=%21%22Tell+Me+What+You+See%22) | 2 | NEW (TRK) | NO | The opponent chooses the mode, so they pick whichever hurts you less. |
| 22 | [Tenacious Drone](https://scryfall.com/search?q=%21%22Tenacious+Drone%22) | 2 | NEW (TRK) | NO | Two bodies and two deaths for 2 mana, but each is one token event. The list's seeds make more per card. |
| 23 | [Assimilate the Wounded](https://scryfall.com/search?q=%21%22Assimilate+the+Wounded%22) | 3 | NEW (TRC) | NO | It needs opponents' creatures to have died this turn. Too situational for a slot. |
| 24 | [Automated Warfare System](https://scryfall.com/search?q=%21%22Automated+Warfare+System%22) | 3 | NEW (TRK) | NO | It draws only when it attacks and you sacrifice something, once per combat. |
| 25 | [Bat'leth](https://scryfall.com/search?q=%21%22Bat%27leth%22) | 3 | NEW (TRK) | NO | A one-time -2/-2 and a +2/+0 equip. Neither helps a list of 1/1s. |
| 26 | [Commander Raffi Musiker](https://scryfall.com/search?q=%21%22Commander+Raffi+Musiker%22) | 3 | NEW (TRK) | NO | Its graveyard exile takes one card, and its other mode is a Clue, which the pilot doesn't crack. |
| 27 | [D'Ghor Bloodletter](https://scryfall.com/search?q=%21%22D%27Ghor+Bloodletter%22) | 3 | NEW (TRK) | NO | Its -1/-1 mode kills every token and every X/1 payoff here ([Zulaport Cutthroat](https://scryfall.com/search?q=%21%22Zulaport+Cutthroat%22), [Blood Artist](https://scryfall.com/search?q=%21%22Blood+Artist%22), [Prosperous Innkeeper](https://scryfall.com/search?q=%21%22Prosperous+Innkeeper%22), both elves). [The Meathook Massacre](https://scryfall.com/search?q=%21%22The+Meathook+Massacre%22) does that job and stays as a drainer. |
| 28 | [Elim Garak, Simple Tailor](https://scryfall.com/search?q=%21%22Elim+Garak%2C+Simple+Tailor%22) | 3 | NEW (TRK) | NO | It drains 2 per dilemma, and [Black Market Connections](https://scryfall.com/search?q=%21%22Black+Market+Connections%22) is the list's only dilemma, so it fires once a turn. |
| 29 | [Fugitive Listener](https://scryfall.com/search?q=%21%22Fugitive+Listener%22) | 3 | NEW (TRK) | NO | A 3/1 with an ETB discard. |
| 30 | [Grand Nagus Zek](https://scryfall.com/search?q=%21%22Grand+Nagus+Zek%22) | 3 | NEW (TRK) | SIDE | A Treasure the first time another creature dies each turn. This list kills at instant speed, so that's a Treasure event on every player's turn (ledger trig-037). It's the [Pitiless Plunderer](https://scryfall.com/search?q=%21%22Pitiless+Plunderer%22) shape the pilot asked for in wave 10. |
| 31 | [Impossible Choice](https://scryfall.com/search?q=%21%22Impossible+Choice%22) | 3 | NEW (TRK) | NO | Each mode is a weaker copy of a MAIN. The kill gives the opponent two 1/1 blockers, and the draw costs you 2 life as well. |
| 32 | [Kurn, Son of Mogh](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) | 3 | NEW (TRC) | MAIN | It draws a card per opponent attacked, up to three a turn, with no mana per card. Draw goes from 7 to 8. See Proposed swaps. |
| 33 | [Organic Avulsion Unit](https://scryfall.com/search?q=%21%22Organic+Avulsion+Unit%22) | 3 | NEW (TRK) | NO | Menace for artifact creatures only. |
| 34 | [Overflow Submatrix](https://scryfall.com/search?q=%21%22Overflow+Submatrix%22) | 3 | NEW (TRK) | NO | It recasts artifact creatures from the graveyard, and this list runs two. |
| 35 | [Painful Truths](https://scryfall.com/search?q=%21%22Painful+Truths%22) | 3 | REPRINT (TRC) | NO | Draw two, or three with a Treasure for a third colour, once for 3 mana. A one-shot. |
| 36 | [Reclamation Specialist](https://scryfall.com/search?q=%21%22Reclamation+Specialist%22) | 3 | NEW (TRC) | NO | It sacrifices artifact creatures only. Treasures, Foods and Clues aren't creatures, and Squirrels aren't artifacts. |
| 37 | [Stray from History](https://scryfall.com/search?q=%21%22Stray+from+History%22) | 3 | NEW (TRK) | NO | Regrowth or hand disruption at sorcery speed. |
| 38 | [Toxic Deluge](https://scryfall.com/search?q=%21%22Toxic+Deluge%22) | 3 | REPRINT (TRC) | NO | A reprint of the wipe this list cut in wave 3. The grounds hold: [Blasphemous Edict](https://scryfall.com/search?q=%21%22Blasphemous+Edict%22) costs {B} with 13 creatures out and lets you choose your thirteen, while Deluge kills your own payoffs. |
| 39 | [Vengeance Mission](https://scryfall.com/search?q=%21%22Vengeance+Mission%22) | 3 | NEW (TRK) | NO | 2 to one opponent per death once it has seven counters, and no lifegain. [Zulaport Cutthroat](https://scryfall.com/search?q=%21%22Zulaport+Cutthroat%22), [Bastion of Remembrance](https://scryfall.com/search?q=%21%22Bastion+of+Remembrance%22) and [Cauldron of Essence](https://scryfall.com/search?q=%21%22Cauldron+of+Essence%22) deal 3 per death and each gain feeds three converters. |
| 40 | [Assault Drone](https://scryfall.com/search?q=%21%22Assault+Drone%22) | 4 | NEW (TRK) | NO | An anthem for artifact creatures. |
| 41 | [Badgey, Malicious Glitch](https://scryfall.com/search?q=%21%22Badgey%2C+Malicious+Glitch%22) | 4 | NEW (TRC) | NO | One drain each time it taps, so once a turn for 4 mana. |
| 42 | [Blastoneuron](https://scryfall.com/search?q=%21%22Blastoneuron%22) | 4 | NEW (TRK) | NO | A payoff for cards leaving your graveyard, which this list rarely does. |
| 43 | [Ceti Eel](https://scryfall.com/search?q=%21%22Ceti+Eel%22) | 4 | NEW (TRC) | NO | A self-mill body with no engine. |
| 44 | [He's Dead, Jim](https://scryfall.com/search?q=%21%22He%27s+Dead%2C+Jim%22) | 4 | NEW (TRK) | NO | A 4-mana instant kill. [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22) does it for 2. |
| 45 | [Khan, Vengeful Heart](https://scryfall.com/search?q=%21%22Khan%2C+Vengeful+Heart%22) | 4 | NEW (TRK) | NO | Draw two once, for a sacrifice, on a 4-mana 5/3. A one-shot draw. |
| 46 | [Obsidian Order Operative](https://scryfall.com/search?q=%21%22Obsidian+Order+Operative%22) | 4 | NEW (TRK) | NO | It drains 1 per dilemma, and the list has one dilemma a turn. |
| 47 | [Sela, Tal Shiar Paradox](https://scryfall.com/search?q=%21%22Sela%2C+Tal+Shiar+Paradox%22) | 4 | NEW (TRK) | NO | Its tokens come from cards leaving your graveyard, which this list rarely does. |
| 48 | [U.S.S. Reliant, From Hell's Heart](https://scryfall.com/search?q=%21%22U.S.S.+Reliant%2C+From+Hell%27s+Heart%22) | 4 | NEW (TRK) | NO | It reanimates on ETB, but stationing it to 10 with 1-power tokens takes ten taps. |
| 49 | [Voq, Torchbearer](https://scryfall.com/search?q=%21%22Voq%2C+Torchbearer%22) | 4 | NEW (TRC) | NO | A clone of a creature card in a graveyard. No engine. |
| 50 | [Assimilation Assessor](https://scryfall.com/search?q=%21%22Assimilation+Assessor%22) | 5 | NEW (TRC) | NO | 5 mana for graveyard hate and attack-gated theft. |
| 51 | [Battle of Wolf 359](https://scryfall.com/search?q=%21%22Battle+of+Wolf+359%22) | 5 | NEW (TRC) | NO | X counts artifact creatures, and this list runs two. |
| 52 | [Bio-Asset Allocator](https://scryfall.com/search?q=%21%22Bio-Asset+Allocator%22) | 5 | NEW (TRC) | NO | Attack drains for artifact creatures only. |
| 53 | [Cha'DIch Investigator](https://scryfall.com/search?q=%21%22Cha%27DIch+Investigator%22) | 5 | NEW (TRK) | NO | 5 mana for a 4/4 and one token. |
| 54 | [Gabriel Lorca, Mirror Menace](https://scryfall.com/search?q=%21%22Gabriel+Lorca%2C+Mirror+Menace%22) | 5 | NEW (TRK) | NO | A 5/4 menace that recurs on dilemmas. |
| 55 | [Hive Mind Coprocessor](https://scryfall.com/search?q=%21%22Hive+Mind+Coprocessor%22) | 5 | NEW (TRK) | NO | Combat-damage draw for artifact creatures only. |
| 56 | [In the Pale Moonlight](https://scryfall.com/search?q=%21%22In+the+Pale+Moonlight%22) | 5 | NEW (TRK) | NO | A 5-mana saga: an edict, a Clue, then two 2/2s, spread over three turns. |
| 57 | [The Destruction of Praxis](https://scryfall.com/search?q=%21%22The+Destruction+of+Praxis%22) | 5 | NEW (TRK) | NO | A symmetric -X/-X wipe at 5 mana. [The Meathook Massacre](https://scryfall.com/search?q=%21%22The+Meathook+Massacre%22) wipes and drains. |
| 58 | [The Promise of Kahless](https://scryfall.com/search?q=%21%22The+Promise+of+Kahless%22) | 5 | NEW (TRC) | NO | Klingon and Warrior recursion, and the 99 hold one Warrior card. |
| 59 | [Borg Queen, Perfection Manifest](https://scryfall.com/search?q=%21%22Borg+Queen%2C+Perfection+Manifest%22) | 6 | NEW (TRC) | NO | 6 mana for an artifact-creature anthem and one stolen graveyard creature. |
| 60 | [Georgiou, Terran Emperor](https://scryfall.com/search?q=%21%22Georgiou%2C+Terran+Emperor%22) | 6 | NEW (TRK) | NO | Ten Officers each end step at 0 life or less is 20 tokens with [Chatterfang](https://scryfall.com/search?q=%21%22Chatterfang%2C+Squirrel+General%22), but you lose the moment she leaves. See Near-misses and traps. |
| 61 | [Rogue Artificial Intelligence](https://scryfall.com/search?q=%21%22Rogue+Artificial+Intelligence%22) | 6 | NEW (TRK) | NO | A 6-mana 6/5. Basic landcycling is its only use here. |
| 62 | [Armus, Skin of Evil](https://scryfall.com/search?q=%21%22Armus%2C+Skin+of+Evil%22) | 7 | NEW (TRK) | NO | A 7-mana 6/6 discard engine. |
| 63 | [Gul Dukat, Colonial Prefect](https://scryfall.com/search?q=%21%22Gul+Dukat%2C+Colonial+Prefect%22) | 7 | NEW (TRK) | NO | It repeats each opponent's life loss at every end step, but [Bloodletter of Aclazotz](https://scryfall.com/search?q=%21%22Bloodletter+of+Aclazotz%22) doubles loss as it happens for 4 mana. See Near-misses and traps. |
| 64 | [Death Is Irrelevant](https://scryfall.com/search?q=%21%22Death+Is+Irrelevant%22) | 8 | NEW (TRK) | NO | 8 mana for artifact-creature indestructible and graveyard theft. |

### Green

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 65 | [Exploration](https://scryfall.com/search?q=%21%22Exploration%22) | 1 | REPRINT (TRC) | SIDE | The pilot's own hold, for [Dryad of the Ilysian Grove](https://scryfall.com/search?q=%21%22Dryad+of+the+Ilysian+Grove%22). Measured 2026-11-10: a turn-2 three-drop in 51% of games where it's in the opening hand, about 4% of all games. |
| 66 | [I'm a Doctor, Not a . . .](https://scryfall.com/search?q=%21%22I%27m+a+Doctor%2C+Not+a+.+.+.%22) | 1 | NEW (TRK) | NO | A one-shot counter and untap trick. |
| 67 | [MACO Strike Team](https://scryfall.com/search?q=%21%22MACO+Strike+Team%22) | 1 | NEW (TRK) | NO | Its tokens depend on opponents targeting your creatures. |
| 68 | [Moopsy](https://scryfall.com/search?q=%21%22Moopsy%22) | 1 | NEW (TRK) | NO | A 1/1 deathtouch blocker. |
| 69 | [Test of Courage](https://scryfall.com/search?q=%21%22Test+of+Courage%22) | 1 | NEW (TRK) | NO | One card of graveyard exile, or a kill on an artifact or enchantment with MV 3 or less. [Assassin's Trophy](https://scryfall.com/search?q=%21%22Assassin%27s+Trophy%22), [Beast Within](https://scryfall.com/search?q=%21%22Beast+Within%22) and [Tear Asunder](https://scryfall.com/search?q=%21%22Tear+Asunder%22) already cover those permanents. |
| 70 | [Astute Terraformer](https://scryfall.com/search?q=%21%22Astute+Terraformer%22) | 2 | NEW (TRK) | NO | A 2/2 with a pump ability. |
| 71 | [Common Goal](https://scryfall.com/search?q=%21%22Common+Goal%22) | 2 | NEW (TRK) | NO | Removal that uses your creatures' power, and this list's bodies are 1/1s. |
| 72 | [Farseek](https://scryfall.com/search?q=%21%22Farseek%22) | 2 | REPRINT (TRC) | NO | A land-fetch spell. The pilot asked for fewer of these in wave 10, when [Nature's Lore](https://scryfall.com/search?q=%21%22Nature%27s+Lore%22) left. |
| 73 | [First Contact](https://scryfall.com/search?q=%21%22First+Contact%22) | 2 | NEW (TRK) | NO | Mill four and keep a permanent. Card selection below the draw suite. |
| 74 | [Heroic Intervention](https://scryfall.com/search?q=%21%22Heroic+Intervention%22) | 2 | REPRINT (TRC) | IN | Already in main. |
| 75 | [Jadzia Dax, Living Legacy](https://scryfall.com/search?q=%21%22Jadzia+Dax%2C+Living+Legacy%22) | 2 | NEW (TRK) | SIDE | {G}, then {G}{G}, then three, each first main phase, and [Doubling Season](https://scryfall.com/search?q=%21%22Doubling+Season%22) doubles her counters. Ramp is already 15, so it's bench behind [Twitching Doll](https://scryfall.com/search?q=%21%22Twitching+Doll%22). |
| 76 | [Jake Sisko, War Correspondent](https://scryfall.com/search?q=%21%22Jake+Sisko%2C+War+Correspondent%22) | 2 | NEW (TRK) | NO | Landfall lifegain and a Clue on the second land. The pilot asked for fewer landfall pieces and doesn't crack Clues. |
| 77 | [Lotus Cobra](https://scryfall.com/search?q=%21%22Lotus+Cobra%22) | 2 | REPRINT (TRC) | NO | Landfall mana. The pilot asked for fewer landfall pieces in wave 10, and ramp is at 15. |
| 78 | [Nature's Lore](https://scryfall.com/search?q=%21%22Nature%27s+Lore%22) | 2 | REPRINT (TRC) | NO | Cut in wave 10 for [Chatterstorm](https://scryfall.com/search?q=%21%22Chatterstorm%22) when the pilot asked for fewer land-fetch pieces. That ask still stands. |
| 79 | [Neelix, Moral Support](https://scryfall.com/search?q=%21%22Neelix%2C+Moral+Support%22) | 2 | NEW (TRK) | NO | It grows a counter per lifegain event, but it's one body with no evasion, so opponents chump it. |
| 80 | [Rampant Growth](https://scryfall.com/search?q=%21%22Rampant+Growth%22) | 2 | REPRINT (TRC) | NO | A land-fetch spell, and the pilot asked for fewer of these. |
| 81 | [Satyr Wayfinder](https://scryfall.com/search?q=%21%22Satyr+Wayfinder%22) | 2 | REPRINT (TRC) | NO | Mills three for one land. This list has no graveyard plan. |
| 82 | [Talarian Hook Spider](https://scryfall.com/search?q=%21%22Talarian+Hook+Spider%22) | 2 | NEW (TRC) | NO | A vanilla 2/2 with reach. |
| 83 | [Xenobotanist](https://scryfall.com/search?q=%21%22Xenobotanist%22) | 2 | NEW (TRK) | NO | A 2-mana any-colour dork. [Twitching Doll](https://scryfall.com/search?q=%21%22Twitching+Doll%22) does that and also bursts into Spiders. |
| 84 | [Adversary by Algorithm](https://scryfall.com/search?q=%21%22Adversary+by+Algorithm%22) | 3 | NEW (TRK) | NO | One 3/3 token per cast, twice. Each cast is one token event. |
| 85 | [Amok Time](https://scryfall.com/search?q=%21%22Amok+Time%22) | 3 | NEW (TRK) | NO | Fight removal that needs a big creature, then 3 life and regrowth over three turns. |
| 86 | [Augur of Autumn](https://scryfall.com/search?q=%21%22Augur+of+Autumn%22) | 3 | REPRINT (TRC) | SIDE | Lands off the top, and creature spells off the top once three different powers are out. 70 of the 99 qualify, and it looks rather than reveals. Bench behind [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22) for [Gardenize](https://scryfall.com/search?q=%21%22Gardenize%22)'s slot. |
| 87 | [Beast Within](https://scryfall.com/search?q=%21%22Beast+Within%22) | 3 | REPRINT (TRC) | IN | Already in main. |
| 88 | [Captain Jonathan Archer](https://scryfall.com/search?q=%21%22Captain+Jonathan+Archer%22) | 3 | NEW (TRK) | NO | A 3/3 with one Dog token and a sorcery-speed pump. |
| 89 | [Captain Pike, Fullness of Time](https://scryfall.com/search?q=%21%22Captain+Pike%2C+Fullness+of+Time%22) | 3 | NEW (TRK) | NO | [Augur of Autumn](https://scryfall.com/search?q=%21%22Augur+of+Autumn%22)'s land half on a big body, without the creature casting. |
| 90 | [Cultivate](https://scryfall.com/search?q=%21%22Cultivate%22) | 3 | REPRINT (TRC) | IN | Already in main. |
| 91 | [Dathon and Picard at El-Adrel](https://scryfall.com/search?q=%21%22Dathon+and+Picard+at+El-Adrel%22) | 3 | NEW (TRK) | NO | A pump, or an artifact-and-enchantment edict where each opponent picks what to lose. |
| 92 | [David and Carol Marcus, Creators](https://scryfall.com/search?q=%21%22David+and+Carol+Marcus%2C+Creators%22) | 3 | NEW (TRK) | NO | Its Planet land token is a token event and a landfall trigger, but ramp is at 15 and [Cultivate](https://scryfall.com/search?q=%21%22Cultivate%22) already does the land job. |
| 93 | [Dominion Supervisor](https://scryfall.com/search?q=%21%22Dominion+Supervisor%22) | 3 | NEW (TRK) | NO | Trample for creatures with counters. |
| 94 | [Dr. Leonard "Bones" McCoy](https://scryfall.com/card/trk/197/dr-leonard-bones-mccoy) | 3 | NEW (TRK) | NO | Flash regrowth, or a one-time return of a dying creature. No engine. |
| 95 | [Final Frontier](https://scryfall.com/search?q=%21%22Final+Frontier%22) | 3 | NEW (TRK) | NO | A land-fetch spell you can recast from the graveyard. The pilot asked for fewer of these. |
| 96 | [Genesis Device](https://scryfall.com/search?q=%21%22Genesis+Device%22) | 3 | NEW (TRK) | NO | A land fetch on an artifact, then a 5-mana land swap. |
| 97 | [Saru, Unthreatened](https://scryfall.com/search?q=%21%22Saru%2C+Unthreatened%22) | 3 | NEW (TRK) | NO | Flash hexproof for one creature. [Heroic Intervention](https://scryfall.com/search?q=%21%22Heroic+Intervention%22) protects the whole board. |
| 98 | [Scute Swarm](https://scryfall.com/search?q=%21%22Scute+Swarm%22) | 3 | REPRINT (TRC) | IN | Already in main. |
| 99 | [Stable Wormhole](https://scryfall.com/search?q=%21%22Stable+Wormhole%22) | 3 | NEW (TRK) | NO | A Planet land token whenever you attack. Attack-gated ramp in a role already at 15. |
| 100 | [Support Mission](https://scryfall.com/search?q=%21%22Support+Mission%22) | 3 | NEW (TRK) | NO | A +1/+1 counter on every creature entering, with no other text. Ledger eval-044 keeps an anthem only when it does something else, and this one blanks [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) on every token. |
| 101 | [Sylvia Tilly, Joy of Discovery](https://scryfall.com/search?q=%21%22Sylvia+Tilly%2C+Joy+of+Discovery%22) | 3 | NEW (TRK) | NO | Surveil and a graveyard-fed counter each combat. |
| 102 | [Temporal Conqueror](https://scryfall.com/search?q=%21%22Temporal+Conqueror%22) | 3 | NEW (TRK) | NO | Mill three and return a land. Card selection on a 2/3. |
| 103 | [Tireless Tracker](https://scryfall.com/search?q=%21%22Tireless+Tracker%22) | 3 | REPRINT (TRC) | NO | Cut today in wave 12 for [Twitching Doll](https://scryfall.com/search?q=%21%22Twitching+Doll%22). Clue makers don't count toward the pilot's draw aim. |
| 104 | [Xindi Surveyors](https://scryfall.com/search?q=%21%22Xindi+Surveyors%22) | 3 | NEW (TRK) | NO | A body that grows on landfall. |
| 105 | [Amanda Grayson, Logic's Link](https://scryfall.com/search?q=%21%22Amanda+Grayson%2C+Logic%27s+Link%22) | 4 | NEW (TRC) | NO | Landfall counters on one creature. |
| 106 | [Captain Kathryn Janeway](https://scryfall.com/search?q=%21%22Captain+Kathryn+Janeway%22) | 4 | NEW (TRK) | NO | Every token explores, so it digs lands into hand, but each nonland reveal puts a counter on a token and blanks [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22). Lands are what this list has most of. |
| 107 | [Christine Chapel, Combat Medic](https://scryfall.com/search?q=%21%22Christine+Chapel%2C+Combat+Medic%22) | 4 | NEW (TRC) | NO | Two counters per lifegain event on one body with no evasion. |
| 108 | [Culber and Stamets, Star-Crossed](https://scryfall.com/search?q=%21%22Culber+and+Stamets%2C+Star-Crossed%22) | 4 | NEW (TRK) | NO | A 4-mana 3/4 with a counter or two mana once. |
| 109 | [Dominion Assault Force](https://scryfall.com/search?q=%21%22Dominion+Assault+Force%22) | 4 | NEW (TRK) | NO | A 4/4 vigilance with one card of graveyard exile. |
| 110 | [Dr. Joseph M'Benga](https://scryfall.com/search?q=%21%22Dr.+Joseph+M%27Benga%22) | 4 | NEW (TRK) | NO | It doubles counters on creatures, and this list puts few counters on its own creatures. |
| 111 | [Gorn Captain](https://scryfall.com/search?q=%21%22Gorn+Captain%22) | 4 | NEW (TRC) | NO | A vanilla 4/3 with trample. |
| 112 | [Guardian Project](https://scryfall.com/search?q=%21%22Guardian+Project%22) | 4 | REPRINT (TRC) | SIDE | It draws on each nontoken creature entering with a new name, and the 99 hold 34 creature cards. Wipe-proof and needs no combat. Bench behind [Kurn, Son of Mogh](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) for [Gruesome Fate](https://scryfall.com/search?q=%21%22Gruesome+Fate%22)'s slot. |
| 113 | [Harmonize](https://scryfall.com/search?q=%21%22Harmonize%22) | 4 | REPRINT (TRC) | NO | Draw three once for 4 mana. A one-shot. |
| 114 | [Holo-Engineer](https://scryfall.com/search?q=%21%22Holo-Engineer%22) | 4 | NEW (TRK) | NO | Trap. It replaces every token you create, Treasures and Foods included, with 3/3 Illusions, which breaks the [Pitiless Plunderer](https://scryfall.com/search?q=%21%22Pitiless+Plunderer%22) loop, [Ninja Pizza](https://scryfall.com/search?q=%21%22Ninja+Pizza%22), [Bilbo, Fellow Conspirator](https://scryfall.com/search?q=%21%22Bilbo%2C+Fellow+Conspirator%22) and [Academy Manufactor](https://scryfall.com/search?q=%21%22Academy+Manufactor%22). See Near-misses and traps. |
| 115 | [Janice Rand, Essential Aide](https://scryfall.com/search?q=%21%22Janice+Rand%2C+Essential+Aide%22) | 4 | NEW (TRC) | NO | A land when your commander enters or attacks, and [Chatterfang](https://scryfall.com/search?q=%21%22Chatterfang%2C+Squirrel+General%22) does neither often. |
| 116 | [Saurian Explorer](https://scryfall.com/search?q=%21%22Saurian+Explorer%22) | 4 | NEW (TRK) | NO | A landfall pump and a 6-mana Planet. |
| 117 | [Tenacious Tosk](https://scryfall.com/search?q=%21%22Tenacious+Tosk%22) | 4 | NEW (TRC) | NO | A 4/4 that grows on combat damage. |
| 118 | [U.S.S. Voyager, Lone Wanderer](https://scryfall.com/search?q=%21%22U.S.S.+Voyager%2C+Lone+Wanderer%22) | 4 | NEW (TRK) | NO | Two lands on ETB for 4 mana. Ramp is at 15, and the pilot asked for fewer land-fetch pieces. |
| 119 | [Gumato](https://scryfall.com/search?q=%21%22Gumato%22) | 5 | NEW (TRC) | NO | A 5-mana dork for {G}{G}{G}. [Circle of Dreams Druid](https://scryfall.com/search?q=%21%22Circle+of+Dreams+Druid%22) makes more for 3. |
| 120 | [Mugato](https://scryfall.com/search?q=%21%22Mugato%22) | 5 | NEW (TRK) | NO | A vanilla 6/6. |
| 121 | [Photosynthetic Physician](https://scryfall.com/search?q=%21%22Photosynthetic+Physician%22) | 5 | NEW (TRK) | NO | A 5/5 reach with one Officer from the graveyard. |
| 122 | [Syndicate Liquidators](https://scryfall.com/search?q=%21%22Syndicate+Liquidators%22) | 5 | NEW (TRK) | NO | Landfall counters on a 4/4 trample. |
| 123 | [U.S.S. Discovery, at Black Alert](https://scryfall.com/search?q=%21%22U.S.S.+Discovery%2C+at+Black+Alert%22) | 5 | NEW (TRK) | NO | Discover 5 on ETB for 5 mana, then it needs six charge counters to attack. |
| 124 | [Ancient Greenwarden](https://scryfall.com/search?q=%21%22Ancient+Greenwarden%22) | 6 | REPRINT (TRC) | NO | Cut in wave 4 as a six-mana engine. The grounds hold, and the pilot has since asked for fewer landfall pieces. |
| 125 | [Benjamin Sisko, Besieged](https://scryfall.com/search?q=%21%22Benjamin+Sisko%2C+Besieged%22) | 6 | NEW (TRC) | NO | It plays with the top card revealed, the reason [Oracle of Mul Daya](https://scryfall.com/search?q=%21%22Oracle+of+Mul+Daya%22) was cut. [Augur of Autumn](https://scryfall.com/search?q=%21%22Augur+of+Autumn%22) does the same job at 3 mana without the reveal. |
| 126 | [Cold-Blooded Crew](https://scryfall.com/search?q=%21%22Cold-Blooded+Crew%22) | 6 | NEW (TRK) | NO | A 6-mana 4/4 with basic landcycling. |
| 127 | [Hologram Stalker](https://scryfall.com/search?q=%21%22Hologram+Stalker%22) | 6 | NEW (TRK) | NO | Regrowth, and a once-a-turn Illusion when a card leaves your graveyard. |
| 128 | [Rok-Tahk, Budding Scientist](https://scryfall.com/search?q=%21%22Rok-Tahk%2C+Budding+Scientist%22) | 6 | NEW (TRK) | NO | [Cryptolith Rite](https://scryfall.com/search?q=%21%22Cryptolith+Rite%22) for {G}{G} on a 6-mana body. [Cryptolith Rite](https://scryfall.com/search?q=%21%22Cryptolith+Rite%22) and [Springleaf Parade](https://scryfall.com/search?q=%21%22Springleaf+Parade%22) already do this at 2. |
| 129 | [Species 8472](https://scryfall.com/search?q=%21%22Species+8472%22) | 6 | NEW (TRK) | NO | A 7/5 with an ETB lifegain. |
| 130 | [Branching Timeline](https://scryfall.com/search?q=%21%22Branching+Timeline%22) | 8 | NEW (TRK) | NO | 8 mana. |

### Multicolor (BG)

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 131 | [Nog, Ambitious Cadet](https://scryfall.com/search?q=%21%22Nog%2C+Ambitious+Cadet%22) | 2 | NEW (TRK) | NO | It takes six mana in total to reach the mode that plays lands from the graveyard. |
| 132 | [Vash, Freelance Archaeologist](https://scryfall.com/search?q=%21%22Vash%2C+Freelance+Archaeologist%22) | 3 | NEW (TRK) | NO | It draws once a turn when a card leaves your graveyard, and only [Camellia, the Seedmiser](https://scryfall.com/search?q=%21%22Camellia%2C+the+Seedmiser%22)'s forage and [Cauldron of Essence](https://scryfall.com/search?q=%21%22Cauldron+of+Essence%22) do that here. |
| 133 | [Daniels, Temporal Agent](https://scryfall.com/search?q=%21%22Daniels%2C+Temporal+Agent%22) | 4 | NEW (TRK) | NO | A 4-mana regrowth body. |

### Colorless

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 134 | [Astral Cornucopia](https://scryfall.com/search?q=%21%22Astral+Cornucopia%22) | 0 | REPRINT (TRC) | NO | {X}{X}{X} for X mana a turn. Ramp is at 15. |
| 135 | [Engineered Explosives](https://scryfall.com/search?q=%21%22Engineered+Explosives%22) | 0 | REPRINT (TRK) | NO | At X=0 it destroys every nonland permanent with mana value 0, and that includes all of your own tokens. |
| 136 | [Everflowing Chalice](https://scryfall.com/search?q=%21%22Everflowing+Chalice%22) | 0 | REPRINT (TRC) | NO | A mana rock in a role already at 15. |
| 137 | [Jefferies Tube](https://scryfall.com/search?q=%21%22Jefferies+Tube%22) | 1 | NEW (TRC) | NO | {4} for each card it draws. |
| 138 | [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) | 1 | REPRINT (TRC) | IN | Already in main. |
| 139 | [Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22) | 1 | REPRINT (TRC) | IN | Already in main. |
| 140 | [Tricorder](https://scryfall.com/search?q=%21%22Tricorder%22) | 1 | NEW (TRK) | NO | +1/+1 and surveil on attack, and the +1/+1 blanks [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) on its carrier. |
| 141 | [Wayfarer's Bauble](https://scryfall.com/search?q=%21%22Wayfarer%27s+Bauble%22) | 1 | REPRINT (TRC) | NO | A land fetch for 3 mana in total. |
| 142 | [Arcane Signet](https://scryfall.com/search?q=%21%22Arcane+Signet%22) | 2 | REPRINT (TRC) | NO | Cut in wave 10 for a token engine. Ramp is at 15. |
| 143 | [Cybernetic Specialist](https://scryfall.com/search?q=%21%22Cybernetic+Specialist%22) | 2 | NEW (TRK) | NO | A 2/1 with surveil. |
| 144 | [Disruptor Pistol](https://scryfall.com/search?q=%21%22Disruptor+Pistol%22) | 2 | NEW (TRC) | NO | {6} in total to deal 5 to one creature. |
| 145 | [Howling Mine](https://scryfall.com/search?q=%21%22Howling+Mine%22) | 2 | REPRINT (TRC) | NO | Symmetric draw that feeds three opponents. |
| 146 | [Isolinear Processor](https://scryfall.com/search?q=%21%22Isolinear+Processor%22) | 2 | NEW (TRK) | NO | Restricted mana and a {2} loot. |
| 147 | [Lightning Greaves](https://scryfall.com/search?q=%21%22Lightning+Greaves%22) | 2 | REPRINT (TRC) | NO | Shroud stops you targeting your own creature, and [Concordant Crossroads](https://scryfall.com/search?q=%21%22Concordant+Crossroads%22) already gives haste. |
| 148 | [Mind Stone](https://scryfall.com/search?q=%21%22Mind+Stone%22) | 2 | REPRINT (TRC) | NO | A mana rock in a role already at 15. |
| 149 | [Replicator](https://scryfall.com/search?q=%21%22Replicator%22) | 2 | NEW (TRK) | NO | One tapped token copy a turn for {2}. [Hazel of the Rootbloom](https://scryfall.com/search?q=%21%22Hazel+of+the+Rootbloom%22) copies for free at end step, and [Ninja Pizza](https://scryfall.com/search?q=%21%22Ninja+Pizza%22) gives a free Food event each turn. See Near-misses and traps. |
| 150 | [Swiftfoot Boots](https://scryfall.com/search?q=%21%22Swiftfoot+Boots%22) | 2 | REPRINT (TRC) | NO | Hexproof and haste on one creature. [Concordant Crossroads](https://scryfall.com/search?q=%21%22Concordant+Crossroads%22) gives haste, and [Heroic Intervention](https://scryfall.com/search?q=%21%22Heroic+Intervention%22) protects the board. |
| 151 | [Tea, Earl Grey, Hot](https://scryfall.com/search?q=%21%22Tea%2C+Earl+Grey%2C+Hot%22) | 2 | NEW (TRK) | NO | A Food artifact that draws one card. One card for 2 mana. |
| 152 | [Thought Vessel](https://scryfall.com/search?q=%21%22Thought+Vessel%22) | 2 | REPRINT (TRC) | NO | A mana rock in a role already at 15. |
| 153 | [Type-2 Phaser](https://scryfall.com/search?q=%21%22Type-2+Phaser%22) | 2 | NEW (TRK) | NO | A one-time stun and a +3/+0 equip. |
| 154 | [U.S.S. Defiant, Mirror Migrant](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Mirror+Migrant%22) | 2 | NEW (TRC) | NO | A 2-mana flash phase-out for one creature. [Heroic Intervention](https://scryfall.com/search?q=%21%22Heroic+Intervention%22) covers the whole board. |
| 155 | [Warp Core](https://scryfall.com/search?q=%21%22Warp+Core%22) | 2 | NEW (TRK) | NO | A basic land to hand and a Spacecraft charger. |
| 156 | [Class-F Shuttlecraft](https://scryfall.com/search?q=%21%22Class-F+Shuttlecraft%22) | 3 | NEW (TRK) | NO | A 3-mana rock. |
| 157 | [Combadge](https://scryfall.com/search?q=%21%22Combadge%22) | 3 | NEW (TRK) | NO | Its copy becomes a token but isn't created (CR 111.13), so [Chatterfang](https://scryfall.com/search?q=%21%22Chatterfang%2C+Squirrel+General%22) adds nothing. |
| 158 | [Commander's Sphere](https://scryfall.com/search?q=%21%22Commander%27s+Sphere%22) | 3 | REPRINT (TRC) | NO | A mana rock in a role already at 15. |
| 159 | [Darksteel Plate](https://scryfall.com/search?q=%21%22Darksteel+Plate%22) | 3 | REPRINT (TRC) | NO | Indestructible on one creature. |
| 160 | [Herald's Horn](https://scryfall.com/search?q=%21%22Herald%27s+Horn%22) | 3 | REPRINT (TRC) | NO | Naming Squirrel covers five cards in the 99. |
| 161 | [I.K.S. Negh'Var, Imperial Flagship](https://scryfall.com/search?q=%21%22I.K.S.+Negh%27Var%2C+Imperial+Flagship%22) | 3 | NEW (TRC) | NO | Klingon support and a body that needs ten charge counters. |
| 162 | [K't'inga-Class Battle Cruiser](https://scryfall.com/search?q=%21%22K%27t%27inga-Class+Battle+Cruiser%22) | 3 | NEW (TRC) | NO | Klingon support. |
| 163 | [S.S. Botany Bay](https://scryfall.com/search?q=%21%22S.S.+Botany+Bay%22) | 3 | NEW (TRC) | NO | Graveyard exile each turn and a body that needs eight charge counters. |
| 164 | [Starfleet Communicator](https://scryfall.com/search?q=%21%22Starfleet+Communicator%22) | 3 | NEW (TRC) | NO | It draws only with several Communicators attached, and its copy isn't created (CR 111.13). |
| 165 | [Sword of Light and Shadow](https://scryfall.com/search?q=%21%22Sword+of+Light+and+Shadow%22) | 3 | REPRINT (TRC) | NO | Combat-damage recursion on one carrier. |
| 166 | [The Guardian of Forever](https://scryfall.com/search?q=%21%22The+Guardian+of+Forever%22) | 3 | NEW (TRC) | NO | It blinks nontoken creatures only. |
| 167 | [U.S.S. Enterprise-D, Galaxy-Class](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-D%2C+Galaxy-Class%22) | 3 | NEW (TRK) | NO | Impulse draw once a turn while you station it, and each station taps a token for one counter. |
| 168 | [U.S.S. Stargazer, Here and There](https://scryfall.com/search?q=%21%22U.S.S.+Stargazer%2C+Here+and+There%22) | 3 | NEW (TRC) | NO | Its attack token is exiled at end of combat. |
| 169 | [Class-4 Tactical Cube](https://scryfall.com/search?q=%21%22Class-4+Tactical+Cube%22) | 4 | NEW (TRC) | NO | Two Borg tokens and an artifact-creature anthem for 4. |
| 170 | [Door of Destinies](https://scryfall.com/search?q=%21%22Door+of+Destinies%22) | 4 | REPRINT (TRC) | NO | It grows only off Squirrel spells cast, and five cards in the 99 are Squirrels. |
| 171 | [Hedron Archive](https://scryfall.com/search?q=%21%22Hedron+Archive%22) | 4 | REPRINT (TRC) | NO | A 4-mana rock. |
| 172 | [K'Vort-Class Raider](https://scryfall.com/search?q=%21%22K%27Vort-Class+Raider%22) | 4 | NEW (TRC) | NO | Hexproof on your turn, after you station it. |
| 173 | [Queen's Diamond](https://scryfall.com/search?q=%21%22Queen%27s+Diamond%22) | 4 | NEW (TRC) | NO | Mana only for your commander. |
| 174 | [Reconnaissance Partition](https://scryfall.com/search?q=%21%22Reconnaissance+Partition%22) | 4 | NEW (TRC) | NO | Two uses of a land or a card for 4 mana. |
| 175 | [Stonespeaker Crystal](https://scryfall.com/search?q=%21%22Stonespeaker+Crystal%22) | 4 | REPRINT (TRC) | NO | A 4-mana rock with one graveyard exile. |
| 176 | [The Sword of Kahless](https://scryfall.com/search?q=%21%22The+Sword+of+Kahless%22) | 4 | NEW (TRC) | NO | Klingon and Warrior tutoring on attack. |
| 177 | [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) | 4 | REPRINT (TRC) | NO | It untaps [Witch's Oven](https://scryfall.com/search?q=%21%22Witch%27s+Oven%22) and [Twitching Doll](https://scryfall.com/search?q=%21%22Twitching+Doll%22) on each opponent's untap step, but that's 4 mana for two cards' untaps. |
| 178 | [Alhammarret's Archive](https://scryfall.com/search?q=%21%22Alhammarret%27s+Archive%22) | 5 | REPRINT (TRC) | NO | It doubles every draw after the first, but it's a 5-mana multiplier that's blank without a draw source out. See Near-misses and traps. |
| 179 | [Forsaken Monument](https://scryfall.com/search?q=%21%22Forsaken+Monument%22) | 5 | REPRINT (TRC) | NO | A colourless-matters card. |
| 180 | [Sickbay](https://scryfall.com/search?q=%21%22Sickbay%22) | 5 | NEW (TRK) | NO | [Prosperous Innkeeper](https://scryfall.com/search?q=%21%22Prosperous+Innkeeper%22)'s lifegain line at 5 mana. |
| 181 | [Starship Enterprise](https://scryfall.com/search?q=%21%22Starship+Enterprise%22) | 5 | NEW (TRC) | NO | It needs 16 charge counters. |
| 182 | [U.S.S. Cerritos, Following Up](https://scryfall.com/search?q=%21%22U.S.S.+Cerritos%2C+Following+Up%22) | 5 | NEW (TRK) | NO | 5 mana for two Officers. |
| 183 | [U.S.S. Enterprise-C, Time-Tossed](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-C%2C+Time-Tossed%22) | 5 | NEW (TRC) | NO | A wheel on a 5-mana Spacecraft. |
| 184 | [U.S.S. Prometheus, Prototype](https://scryfall.com/search?q=%21%22U.S.S.+Prometheus%2C+Prototype%22) | 5 | NEW (TRC) | NO | A combat-damage Spacecraft. |
| 185 | [Command Chair](https://scryfall.com/search?q=%21%22Command+Chair%22) | 6 | NEW (TRC) | NO | 6 mana for three a turn. |
| 186 | [The Immortal Sun](https://scryfall.com/search?q=%21%22The+Immortal+Sun%22) | 6 | REPRINT (TRC) | NO | An extra card a turn and a cost reducer, but it costs 6 and its anthem blanks [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22). |
| 187 | [U.S.S. Defiant, Tough Little Ship](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Tough+Little+Ship%22) | 6 | NEW (TRC) | NO | 6 mana for one artifact or enchantment kill. |
| 188 | [U.S.S. Farragut, Bold Explorer](https://scryfall.com/search?q=%21%22U.S.S.+Farragut%2C+Bold+Explorer%22) | 6 | NEW (TRC) | NO | A 6-mana landfall cheat. |
| 189 | [The Holodeck](https://scryfall.com/search?q=%21%22The+Holodeck%22) | 7 | NEW (TRK) | NO | 7 mana. |
| 190 | [Crystalline Entity](https://scryfall.com/search?q=%21%22Crystalline+Entity%22) | 8 | NEW (TRK) | NO | An 8-mana wipe. |
| 191 | [Planet Killer](https://scryfall.com/search?q=%21%22Planet+Killer%22) | 8 | NEW (TRC) | NO | An 8-mana attacker. |
| 192 | [Deep Space 9](https://scryfall.com/search?q=%21%22Deep+Space+9%22) | 9 | NEW (TRK) | NO | 9 mana. |

### Land

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 193 | [Artificial Anomaly](https://scryfall.com/search?q=%21%22Artificial+Anomaly%22) | 0 | NEW (TRK) | NO | A colourless land whose sacrifice drains 2 for {3}{B}. The list's colourless utility lands already do more. |
| 194 | [Command Beacon](https://scryfall.com/search?q=%21%22Command+Beacon%22) | 0 | REPRINT (TRC) | NO | [Chatterfang](https://scryfall.com/search?q=%21%22Chatterfang%2C+Squirrel+General%22)'s tax rarely matters at 3 mana. |
| 195 | [Command Tower](https://scryfall.com/search?q=%21%22Command+Tower%22) | 0 | REPRINT (TRC) | IN | Already in main. |
| 196 | [Evolving Wilds](https://scryfall.com/search?q=%21%22Evolving+Wilds%22) | 0 | REPRINT (TRC) | NO | A slower [Fabled Passage](https://scryfall.com/search?q=%21%22Fabled+Passage%22). |
| 197 | [Exotic Orchard](https://scryfall.com/search?q=%21%22Exotic+Orchard%22) | 0 | REPRINT (TRC) | NO | Its colours depend on opponents. |
| 198 | [Fabled Passage](https://scryfall.com/search?q=%21%22Fabled+Passage%22) | 0 | REPRINT (TRC) | SIDE | A third fetch, so two landfall triggers per play, and the basic enters untapped from four lands. Bench in place of a basic [Forest](https://scryfall.com/search?q=%21%22Forest%22). |
| 199 | [Ferenginar](https://scryfall.com/search?q=%21%22Ferenginar%22) | 0 | NEW (TRK) | NO | A tapped dual that gains 1 life. |
| 200 | [Forest](https://scryfall.com/search?q=%21%22Forest%22) | 0 | REPRINT (TRK) | IN | Already in main (6). |
| 201 | [Mosswort Bridge](https://scryfall.com/search?q=%21%22Mosswort+Bridge%22) | 0 | REPRINT (TRC) | SIDE | Hideaway gives a free spell once your creatures total 10 power, which is ten 1/1s. It enters tapped. Bench in place of a basic [Forest](https://scryfall.com/search?q=%21%22Forest%22). |
| 202 | [Mutavault](https://scryfall.com/search?q=%21%22Mutavault%22) | 0 | REPRINT (TRC) | NO | A colourless creature land. |
| 203 | [Overgrown Tomb](https://scryfall.com/search?q=%21%22Overgrown+Tomb%22) | 0 | REPRINT (TRK) | IN | Already in main. |
| 204 | [Path of Ancestry](https://scryfall.com/search?q=%21%22Path+of+Ancestry%22) | 0 | REPRINT (TRC) | NO | It enters tapped. |
| 205 | [Q Continuum](https://scryfall.com/search?q=%21%22Q+Continuum%22) | 0 | NEW (TRK) | NO | A mono-green land that isn't a Forest, so [Misty Rainforest](https://scryfall.com/search?q=%21%22Misty+Rainforest%22), [Verdant Catacombs](https://scryfall.com/search?q=%21%22Verdant+Catacombs%22) and [Cultivate](https://scryfall.com/search?q=%21%22Cultivate%22) can't find it. |
| 206 | [Reliquary Tower](https://scryfall.com/search?q=%21%22Reliquary+Tower%22) | 0 | REPRINT (TRC) | NO | Colourless. |
| 207 | [Rogue's Passage](https://scryfall.com/search?q=%21%22Rogue%27s+Passage%22) | 0 | REPRINT (TRC) | NO | Colourless. |
| 208 | [Spire of Industry](https://scryfall.com/search?q=%21%22Spire+of+Industry%22) | 0 | REPRINT (TRC) | NO | Colourless, or 1 life per coloured mana. |
| 209 | [Starfleet Academy](https://scryfall.com/search?q=%21%22Starfleet+Academy%22) | 0 | NEW (TRK) | NO | Colourless, and changelings are Borg, so the Shapeshifters add nothing to its Federation count. |
| 210 | [Swamp](https://scryfall.com/search?q=%21%22Swamp%22) | 0 | REPRINT (TRK) | IN | Already in main (5). |
| 211 | [Temple of the False God](https://scryfall.com/search?q=%21%22Temple+of+the+False+God%22) | 0 | REPRINT (TRC) | NO | Colourless. |
| 212 | [Temporal Anomaly](https://scryfall.com/search?q=%21%22Temporal+Anomaly%22) | 0 | NEW (TRK) | NO | A colourless land with a 4-mana sacrifice. |
| 213 | [Terramorphic Expanse](https://scryfall.com/search?q=%21%22Terramorphic+Expanse%22) | 0 | REPRINT (TRC) | NO | A slower [Fabled Passage](https://scryfall.com/search?q=%21%22Fabled+Passage%22). |
| 214 | [The Unicomplex](https://scryfall.com/search?q=%21%22The+Unicomplex%22) | 0 | NEW (TRK) | NO | A mono-black land that isn't a Swamp, so [Cabal Coffers](https://scryfall.com/search?q=%21%22Cabal+Coffers%22) counts it only with [Urborg, Tomb of Yawgmoth](https://scryfall.com/search?q=%21%22Urborg%2C+Tomb+of+Yawgmoth%22) out. |
| 215 | [Unexplored Territory](https://scryfall.com/search?q=%21%22Unexplored+Territory%22) | 0 | NEW (TRK) | NO | A colourless fetch that costs {1}. |

## Proposed swaps

The curve today, counted with the commander as `deck:show` does: avg MV 2.88, MV ≤ 2 27, MV ≤ 3 49.
[Springleaf Parade](https://scryfall.com/search?q=%21%22Springleaf+Parade%22) and [The Meathook Massacre](https://scryfall.com/search?q=%21%22The+Meathook+Massacre%22) count at printed MV 2.

### 1. Kurn, Son of Mogh in, Gruesome Fate out

In: [Kurn, Son of Mogh](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22), {2}{B}, legendary creature (Klingon Warrior Officer), 2/3. New, TRC.

> "Deathtouch / Battlefront — Whenever Kurn attacks, you draw X cards and lose X life, where X is the
> number of opponents you attacked this turn."

Out: [Gruesome Fate](https://scryfall.com/search?q=%21%22Gruesome+Fate%22), {2}{B}, sorcery.

> "Each opponent loses 1 life for each creature you control."

**Deciding axis: cards per turn.** The pilot's draw aim is 8 to 10 sources, with Clue makers never
counting, and the list sits at 7 (decisions.md, 2026-11-10 closing entry).

The Card Draw role, scored against the current list:

| Card | MV | Cards per turn cycle here | Gate | Mana per card | Survives a creature wipe |
|---|---|---|---|---|---|
| [Sylvan Library](https://scryfall.com/search?q=%21%22Sylvan+Library%22) | 2 | 2 extra for 8 life, or selection | life | 0 | yes |
| [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) | 1 | 2 per equipped 1/1 that dies, repeatable | a 1/1, and {1} per equip | {1} per 2 cards | yes |
| [Moldervine Reclamation](https://scryfall.com/search?q=%21%22Moldervine+Reclamation%22) | 5 | 1 per own creature death, uncapped | deaths | 0 | yes |
| [Black Market Connections](https://scryfall.com/search?q=%21%22Black+Market+Connections%22) | 3 | 1 a turn for 2 life | life | 0 | yes |
| [Bloodline Recollector](https://scryfall.com/search?q=%21%22Bloodline+Recollector%22) | 2 | 3 per arming, one arming per end step at most | 3 or more creatures died that turn | {B} and 3 life per 3 cards | no |
| [Yawgmoth, Thran Physician](https://scryfall.com/search?q=%21%22Yawgmoth%2C+Thran+Physician%22) | 4 | 1 per sacrifice | another creature and 1 life | 0 | no |
| [Tippy-Toe, Terrific Partner](https://scryfall.com/search?q=%21%22Tippy-Toe%2C+Terrific+Partner%22) | 4 | 1 at your end step | you gained life that turn | 0 | no |
| **[Kurn, Son of Mogh](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22)** | **3** | **X per attack, X = opponents attacked, so up to 3** | **[Kurn](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) attacks, with haste from [Concordant Crossroads](https://scryfall.com/search?q=%21%22Concordant+Crossroads%22) the turn he lands** | **0, plus X life** | **no** |
| [Guardian Project](https://scryfall.com/search?q=%21%22Guardian+Project%22) (bench) | 4 | 1 per nontoken creature card entering | casting creature cards | 0 | yes |
| [Deadly Dispute](https://scryfall.com/search?q=%21%22Deadly+Dispute%22) (recorded undo, not in this pool) | 2 | 2 once, plus a Treasure | a sacrifice | n/a | n/a |

[Kurn](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) is the best repeatable draw rate in either set: up to three cards every turn for no mana, at 3 MV.
The gate is attacking each opponent with something, and this list makes that cheap. [Chatterfang](https://scryfall.com/search?q=%21%22Chatterfang%2C+Squirrel+General%22) adds a
Squirrel to every token event, [Concordant Crossroads](https://scryfall.com/search?q=%21%22Concordant+Crossroads%22) gives every creature haste, and the list already
attacks for [Valley Rotcaller](https://scryfall.com/search?q=%21%22Valley+Rotcaller%22), [The Unbeatable Squirrel Girl](https://scryfall.com/search?q=%21%22The+Unbeatable+Squirrel+Girl%22) and [Esika's Chariot](https://scryfall.com/search?q=%21%22Esika%27s+Chariot%22). A token that
gets blocked dies and fires every death payoff, so attacking costs the list nothing it wanted to keep
(gameplan §0, ledger eval-044). X counts opponents attacked, so [Kurn](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) plus two tokens, one at each other
opponent, is a draw-three. The draw comes off the attack trigger, so [Kurn](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) has drawn even if a blocker
kills him. By the pilot's count draw goes from 7 to 8, inside the 8-to-10 aim.

[Gruesome Fate](https://scryfall.com/search?q=%21%22Gruesome+Fate%22) comes from Finishers & Equipment, which holds 3 cards against the founding target of 2
(chatterfang decisions.md, 2026-09-22). The role, ranked:

| Card | MV | What it does | Needs | Record |
|---|---|---|---|---|
| [Bloodletter of Aclazotz](https://scryfall.com/search?q=%21%22Bloodletter+of+Aclazotz%22) | 4 | doubles each opponent's life loss on your turn | to be out before the drain | CLOSE CUTS: counter bait and surprise lethal |
| [Craterhoof Behemoth](https://scryfall.com/search?q=%21%22Craterhoof+Behemoth%22) | 8 | +X/+X and trample for the team | a board, and [Crossroads](https://scryfall.com/search?q=%21%22Concordant+Crossroads%22) so this turn's tokens can attack | CLOSE CUTS: the last combat kill route |
| **[Gruesome Fate](https://scryfall.com/search?q=%21%22Gruesome+Fate%22)** | **3** | **each opponent loses 1 per creature you control, once** | **a wide board, and [Bloodletter](https://scryfall.com/search?q=%21%22Bloodletter+of+Aclazotz%22) to double it** | **the log's recommended cut for an eighth draw source (2026-11-10)** |

[Gruesome Fate](https://scryfall.com/search?q=%21%22Gruesome+Fate%22) turns a wide board into damage once, at sorcery speed: 20 creatures is 20 to each
opponent, or 40 with [Bloodletter](https://scryfall.com/search?q=%21%22Bloodletter+of+Aclazotz%22). The same board already turns into damage through the free outlets and
the death payoffs, about 6 to the table per 1/1 with the full engine (gameplan §5), and that repeats
every turn. The decision log named [Gruesome Fate](https://scryfall.com/search?q=%21%22Gruesome+Fate%22) as the recommended cut for an eighth draw source on
2026-11-10, in the [Bloodline Recollector](https://scryfall.com/search?q=%21%22Bloodline+Recollector%22) trial's undo rows. The pilot hasn't declined that cut. The
pilot's "nope" was to [Idol of Oblivion](https://scryfall.com/search?q=%21%22Idol+of+Oblivion%22) for [Esika's Chariot](https://scryfall.com/search?q=%21%22Esika%27s+Chariot%22).

The eval-011 check: [Gruesome Fate](https://scryfall.com/search?q=%21%22Gruesome+Fate%22)'s text keys on creatures you control, and [Kurn](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22)'s trigger words
(attacks, draw) appear nowhere in it. Nothing else in this review feeds it.

**Other cuts considered.**

- [Gardenize](https://scryfall.com/search?q=%21%22Gardenize%22) is the lowest-ranked unprotected ramp card. Swap 2 takes it.
- [Esika's Chariot](https://scryfall.com/search?q=%21%22Esika%27s+Chariot%22) and [Zulaport Cutthroat](https://scryfall.com/search?q=%21%22Zulaport+Cutthroat%22) were the alternatives the log named on 2026-11-10.
  [Chariot](https://scryfall.com/search?q=%21%22Esika%27s+Chariot%22) is one of the wave 10 burst seeds, the role the pilot asked for. [Zulaport](https://scryfall.com/search?q=%21%22Zulaport+Cutthroat%22) is one of six cards
  that gain life as your tokens die, the fuel for [Dina, Soul Steeper](https://scryfall.com/search?q=%21%22Dina%2C+Soul+Steeper%22), [Starscape Cleric](https://scryfall.com/search?q=%21%22Starscape+Cleric%22) and
  [Vito, Thorn of the Dusk Rose](https://scryfall.com/search?q=%21%22Vito%2C+Thorn+of+the+Dusk+Rose%22).
- The undo row "[Deadly Dispute](https://scryfall.com/search?q=%21%22Deadly+Dispute%22) back for [Gruesome Fate](https://scryfall.com/search?q=%21%22Gruesome+Fate%22)" wants the same slot. [Kurn](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) draws every turn he
  attacks, and [Dispute](https://scryfall.com/search?q=%21%22Deadly+Dispute%22) draws two once.

**Costs to name.**

- [Kurn](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) costs X life a turn on top of [Sylvan Library](https://scryfall.com/search?q=%21%22Sylvan+Library%22), [Black Market Connections](https://scryfall.com/search?q=%21%22Black+Market+Connections%22), [Bitterblossom](https://scryfall.com/search?q=%21%22Bitterblossom%22) and
  [Bloodline Recollector](https://scryfall.com/search?q=%21%22Bloodline+Recollector%22). Six payoffs gain life as your tokens die, so it's cheap once the engine runs.
  Watch it on a slow start.
- Attacking tokens are tapped, so they can't tap for [Cryptolith Rite](https://scryfall.com/search?q=%21%22Cryptolith+Rite%22) or [Springleaf Parade](https://scryfall.com/search?q=%21%22Springleaf+Parade%22) mana
  that turn. [Kurn](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) needs only two extra attackers, and [Gaea's Cradle](https://scryfall.com/search?q=%21%22Gaea%27s+Cradle%22), [Circle of Dreams Druid](https://scryfall.com/search?q=%21%22Circle+of+Dreams+Druid%22) and
  [Three Tree City](https://scryfall.com/search?q=%21%22Three+Tree+City%22) count creatures without tapping them.
- One fewer one-card kill. Gameplan §7's four routes become three: [Blasphemous Edict](https://scryfall.com/search?q=%21%22Blasphemous+Edict%22), [Craterhoof](https://scryfall.com/search?q=%21%22Craterhoof+Behemoth%22)
  and [Valley Rotcaller](https://scryfall.com/search?q=%21%22Valley+Rotcaller%22), plus the loops.
- [Kurn](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) is a 2/3, so [The Meathook Massacre](https://scryfall.com/search?q=%21%22The+Meathook+Massacre%22) at X=3 kills him. [Blasphemous Edict](https://scryfall.com/search?q=%21%22Blasphemous+Edict%22) lets you leave him
  out of your thirteen.

**Numbers.** Curve: 3 for 3, so avg MV stays 2.88, MV ≤ 2 stays 27 and MV ≤ 3 stays 49. Roles: Card
Draw 5 → 6 slots (7 → 8 sources by the pilot's count), Finishers 3 → 2. Self-hits: none. [Kurn](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) turns
nothing off and nothing in the list turns him off. Loops: none new, because [Kurn](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) has no tap or
sacrifice ability.

### 2. Bitter Triumph in, Gardenize out

In: [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22), {1}{B}, instant. Reprint, TRC.

> "As an additional cost to cast this spell, discard a card or pay 3 life. / Destroy target creature or
> planeswalker."

Out: [Gardenize](https://scryfall.com/search?q=%21%22Gardenize%22), {1}{G}{G}, enchantment.

> "Whenever a creature you control dies, put a charge counter on this enchantment. / At the beginning of
> your first main phase, add {G} for each charge counter on this enchantment."

**Deciding axis: interaction count.** The list's thinnest role takes a slot from its fattest.

The decision log names the gap. Wave 3 took removal from 6 to 5 and called it the thinnest the deck
had been (2026-09-25). The 2026-11-10 CommanderBracket entry recorded a cost wave 12 hadn't named:
[Verdant Command](https://scryfall.com/search?q=%21%22Verdant+Command%22) and [Pest Infestation](https://scryfall.com/search?q=%21%22Pest+Infestation%22) left, so the flexible answers are down to [Assassin's Trophy](https://scryfall.com/search?q=%21%22Assassin%27s+Trophy%22),
[Beast Within](https://scryfall.com/search?q=%21%22Beast+Within%22) and [Tear Asunder](https://scryfall.com/search?q=%21%22Tear+Asunder%22). The same readout scores the list's mana at 84 and its
interaction at 67.

The Removal & Interaction role:

| Card | MV | Speed | What it answers | Cost to name |
|---|---|---|---|---|
| [Assassin's Trophy](https://scryfall.com/search?q=%21%22Assassin%27s+Trophy%22) | 2 | instant | any opponent's permanent | they get a basic land |
| [Tear Asunder](https://scryfall.com/search?q=%21%22Tear+Asunder%22) | 2 or 4 | instant | an artifact or enchantment, kicked any nonland permanent (exile) | kicker needs {1}{B} more |
| [Beast Within](https://scryfall.com/search?q=%21%22Beast+Within%22) | 3 | instant | any permanent | they get a 3/3 |
| [Heroic Intervention](https://scryfall.com/search?q=%21%22Heroic+Intervention%22) | 2 | instant | protection, not removal | none |
| [Plumb the Forbidden](https://scryfall.com/search?q=%21%22Plumb+the+Forbidden%22) | 2 | instant | wrath insurance, not removal | none |
| **[Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22)** | **2** | **instant** | **any creature or planeswalker, any size** | **3 life or a discard, and it misses indestructible** |
| [Eject the Warp Core](https://scryfall.com/search?q=%21%22Eject+the+Warp+Core%22) (bench) | 2 | instant | a creature, -6/-6 with a free sacrifice | misses planeswalkers and toughness 7 or more |

[Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22) kills a creature of any size or a planeswalker at instant speed for 2 mana. The 3 life
is cheap here: [Zulaport Cutthroat](https://scryfall.com/search?q=%21%22Zulaport+Cutthroat%22), [Blood Artist](https://scryfall.com/search?q=%21%22Blood+Artist%22), [Bastion of Remembrance](https://scryfall.com/search?q=%21%22Bastion+of+Remembrance%22),
[Cauldron of Essence](https://scryfall.com/search?q=%21%22Cauldron+of+Essence%22) and [Moldervine Reclamation](https://scryfall.com/search?q=%21%22Moldervine+Reclamation%22) each gain life on every death of yours, and
[Nadier's Nightblade](https://scryfall.com/search?q=%21%22Nadier%27s+Nightblade%22) on every token that leaves. The discard option covers a low life total. An opponent's creature dying still fires Blood
Artist ("this creature or another creature dies") and [The Meathook Massacre](https://scryfall.com/search?q=%21%22The+Meathook+Massacre%22)'s gain half, which is a
lifegain event for [Dina](https://scryfall.com/search?q=%21%22Dina%2C+Soul+Steeper%22), [Starscape Cleric](https://scryfall.com/search?q=%21%22Starscape+Cleric%22) and [Vito](https://scryfall.com/search?q=%21%22Vito%2C+Thorn+of+the+Dusk+Rose%22).

[Lich's Relic](https://scryfall.com/search?q=%21%22Lich%27s+Relic%22) is the other open removal option. The FRA review rated it MAIN for this list over Woe
Strider on 2026-09-28, but it was never applied and `research/decisions.md` never records a decline.
[Woe Strider](https://scryfall.com/search?q=%21%22Woe+Strider%22) has since left for [Priest of Forgotten Gods](https://scryfall.com/search?q=%21%22Priest+of+Forgotten+Gods%22). [Lich's Relic](https://scryfall.com/search?q=%21%22Lich%27s+Relic%22) is up to three sorcery-speed
kills, one per opponent, for 3 mana in total. The pilot should see both before choosing.

The cut comes from Ramp & Mana, which holds 15 against a founding target of 8. The role, ranked:

| Card | MV | Mana it adds | Gate | Other jobs | Record |
|---|---|---|---|---|---|
| [Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22) | 1 | {C}{C} a turn | none | none | staple |
| [Llanowar Elves](https://scryfall.com/search?q=%21%22Llanowar+Elves%22) | 1 | {G} a turn | summoning sickness | turn-2 [Chatterfang](https://scryfall.com/search?q=%21%22Chatterfang%2C+Squirrel+General%22) | wave 12 kept both 1-drops for that line |
| [Elvish Mystic](https://scryfall.com/search?q=%21%22Elvish+Mystic%22) | 1 | {G} a turn | summoning sickness | turn-2 [Chatterfang](https://scryfall.com/search?q=%21%22Chatterfang%2C+Squirrel+General%22) | CLOSE CUTS |
| [Concordant Crossroads](https://scryfall.com/search?q=%21%22Concordant+Crossroads%22) | 1 | lets fresh tokens and dorks tap the turn they arrive | [Rite](https://scryfall.com/search?q=%21%22Cryptolith+Rite%22), [Parade](https://scryfall.com/search?q=%21%22Springleaf+Parade%22) or a dork | the wave 12 loop, [Craterhoof](https://scryfall.com/search?q=%21%22Craterhoof+Behemoth%22)'s tokens attack, [Kurn](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) attacks | re-added in wave 12 today |
| [Cryptolith Rite](https://scryfall.com/search?q=%21%22Cryptolith+Rite%22) | 2 | one of any colour per creature | untapped creatures | loop piece | core since founding |
| [Sakura-Tribe Elder](https://scryfall.com/search?q=%21%22Sakura-Tribe+Elder%22) | 2 | a basic onto the battlefield | none | a free death and a landfall | kept, ledger build-042 |
| [Twitching Doll](https://scryfall.com/search?q=%21%22Twitching+Doll%22) | 2 | one of any colour a turn | summoning sickness | a Spider burst | the pilot's pick in wave 12 today |
| [Azusa, Lost but Seeking](https://scryfall.com/search?q=%21%22Azusa%2C+Lost+but+Seeking%22) | 3 | two extra land drops | spare lands in hand | none | play verdict 2026-10-15, no nomination without a new report |
| [Circle of Dreams Druid](https://scryfall.com/search?q=%21%22Circle+of+Dreams+Druid%22) | 3 | {G} per creature | summoning sickness | none | the pilot's wave 5 argument |
| [Cultivate](https://scryfall.com/search?q=%21%22Cultivate%22) | 3 | a basic onto the battlefield and one to hand | none | two landfall triggers | CLOSE CUTS, declined twice |
| [Dryad of the Ilysian Grove](https://scryfall.com/search?q=%21%22Dryad+of+the+Ilysian+Grove%22) | 3 | an extra land drop, every colour | spare lands in hand | 2/4 body, [Cradle](https://scryfall.com/search?q=%21%22Gaea%27s+Cradle%22) taps any colour | CLOSE CUTS, held by the pilot for [Exploration](https://scryfall.com/search?q=%21%22Exploration%22) |
| [Ninja Pizza](https://scryfall.com/search?q=%21%22Ninja+Pizza%22) | 3 | Foods tap for any colour, a free Food each second main | Foods | a loop with [Camellia](https://scryfall.com/search?q=%21%22Camellia%2C+the+Seedmiser%22) and [Peregrin Took](https://scryfall.com/search?q=%21%22Peregrin+Took%22) | CLOSE CUTS |
| [Tireless Provisioner](https://scryfall.com/search?q=%21%22Tireless+Provisioner%22) | 3 | a Treasure or Food per land | land drops | a token event per land | wave 12 kept its tokens as the ones the pilot uses |
| [Pitiless Plunderer](https://scryfall.com/search?q=%21%22Pitiless+Plunderer%22) | 4 | a Treasure per other creature death | deaths | loop §8a | the deck's fast kill |
| **[Gardenize](https://scryfall.com/search?q=%21%22Gardenize%22)** | **3** | **{G} per own creature death since it landed** | **deaths after it lands, first main phase only** | **wipe-proof, [Doubling Season](https://scryfall.com/search?q=%21%22Doubling+Season%22) doubles its counters** | **held by the pilot for [Yahenni, Undying Partisan](https://scryfall.com/search?q=%21%22Yahenni%2C+Undying+Partisan%22)** |

[Gardenize](https://scryfall.com/search?q=%21%22Gardenize%22) ranks last among the cards nobody has protected. It adds nothing the turn it lands. Its mana
is green only and empties at the end of the first main phase (CR 106.4). Its ceiling arrives late, when
the list already has unbounded mana from [The Unbeatable Squirrel Girl](https://scryfall.com/search?q=%21%22The+Unbeatable+Squirrel+Girl%22) plus [Cryptolith Rite](https://scryfall.com/search?q=%21%22Cryptolith+Rite%22) or
[Springleaf Parade](https://scryfall.com/search?q=%21%22Springleaf+Parade%22) plus [Concordant Crossroads](https://scryfall.com/search?q=%21%22Concordant+Crossroads%22), the loop declared in wave 12. The pilot's own hold list
(2026-11-10) already offers its slot to [Yahenni, Undying Partisan](https://scryfall.com/search?q=%21%22Yahenni%2C+Undying+Partisan%22).

The eval-011 check: [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22)'s text (destroy, discard, life) shares no trigger word with
[Gardenize](https://scryfall.com/search?q=%21%22Gardenize%22)'s (a creature you control dies). [Kurn](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22)'s attacks add a few combat deaths, which [Gardenize](https://scryfall.com/search?q=%21%22Gardenize%22)
would count, but deaths were never its constraint in this list.

**Other cuts considered.**

- [Dryad of the Ilysian Grove](https://scryfall.com/search?q=%21%22Dryad+of+the+Ilysian+Grove%22) is a close cut, and the pilot holds its slot for [Exploration](https://scryfall.com/search?q=%21%22Exploration%22). If
  [Augur of Autumn](https://scryfall.com/search?q=%21%22Augur+of+Autumn%22) ever comes in, [Augur](https://scryfall.com/search?q=%21%22Augur+of+Autumn%22) supplies the lands [Dryad](https://scryfall.com/search?q=%21%22Dryad+of+the+Ilysian+Grove%22)'s extra drop needs (ledger eval-058),
  which makes [Dryad](https://scryfall.com/search?q=%21%22Dryad+of+the+Ilysian+Grove%22) a synergy, not a cut.
- [Twitching Doll](https://scryfall.com/search?q=%21%22Twitching+Doll%22) was the pilot's pick in wave 12 today.
- [Tireless Provisioner](https://scryfall.com/search?q=%21%22Tireless+Provisioner%22) stayed in wave 12 as the landfall token maker whose tokens the pilot uses.
- [Vito, Thorn of the Dusk Rose](https://scryfall.com/search?q=%21%22Vito%2C+Thorn+of+the+Dusk+Rose%22) is the weakest converter, kept in wave 10 because the pilot asked
  for more drain.
- Cutting [Sakura-Tribe Elder](https://scryfall.com/search?q=%21%22Sakura-Tribe+Elder%22) was part of the fork's first slowdown (ledger build-042).

**Costs to name.**

- A creature wipe on a wide board used to put a counter on [Gardenize](https://scryfall.com/search?q=%21%22Gardenize%22) per death, and [Doubling Season](https://scryfall.com/search?q=%21%22Doubling+Season%22)
  doubled each one. That windfall goes, and [Gardenize](https://scryfall.com/search?q=%21%22Gardenize%22) was the only mana source that grows after a wipe.
- It takes the slot the pilot's [Yahenni](https://scryfall.com/search?q=%21%22Yahenni%2C+Undying+Partisan%22) hold names.
- [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22) adds nothing to the drain engine on its own.

**Numbers.** Curve: 3 out, 2 in, so avg MV 2.88 → 2.86, MV ≤ 2 27 → 28, MV ≤ 3 49 → 49. Roles: Ramp &
Mana 15 → 14, Removal & Interaction 5 → 6 (real removal 3 → 4). Self-hits: none. It targets, so aim it
at an opponent's permanent. Game Changers: still 1.

## Bench

### Augur of Autumn would displace Gardenize

[Augur of Autumn](https://scryfall.com/search?q=%21%22Augur+of+Autumn%22), {1}{G}{G}, 2/3, reprint: *"You may look at the top card of your library any time. /
You may play lands from the top of your library. / Coven — As long as you control three or more
creatures with different powers, you may cast creature spells from the top of your library."*

Coven is easy here: a 1/1 token, [Augur](https://scryfall.com/search?q=%21%22Augur+of+Autumn%22) at 2 and [Chatterfang](https://scryfall.com/search?q=%21%22Chatterfang%2C+Squirrel+General%22) at 3. Then 70 of the 99 cards (36 lands
and 34 creatures) can be played off the top. I estimate about one extra card a turn, capped by land
drops and mana. The land
half is the land supply that ledger eval-058 says [Azusa, Lost but Seeking](https://scryfall.com/search?q=%21%22Azusa%2C+Lost+but+Seeking%22) and
[Dryad of the Ilysian Grove](https://scryfall.com/search?q=%21%22Dryad+of+the+Ilysian+Grove%22) lack, and [Augur](https://scryfall.com/search?q=%21%22Augur+of+Autumn%22) looks at the top card without revealing it, so the
objection that cut [Oracle of Mul Daya](https://scryfall.com/search?q=%21%22Oracle+of+Mul+Daya%22) doesn't apply. It's bench, not main, because it's card
advantage rather than a draw source by the pilot's count, and the MAIN slots went to the two roles the
records name as short. It wants the same slot as [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22): pick on which role the pilot wants
filled.

### Guardian Project would displace Gruesome Fate

[Guardian Project](https://scryfall.com/search?q=%21%22Guardian+Project%22), {3}{G} enchantment, reprint. It draws whenever a nontoken creature enters with a
name you don't already have on the battlefield or in your graveyard. The 99 hold 34 creature cards, so
it's about a card a turn once it lands, it survives creature wipes, and it needs no combat. Tokens
don't count. It's the alternative to [Kurn, Son of Mogh](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) for [Gruesome Fate](https://scryfall.com/search?q=%21%22Gruesome+Fate%22)'s slot if the pilot
would rather not attack: slower per turn and 1 MV more, but wipe-proof.

### Eject the Warp Core would displace Gardenize

[Eject the Warp Core](https://scryfall.com/search?q=%21%22Eject+the+Warp+Core%22), {1}{B} instant, new: *"Kicker—Sacrifice an artifact or creature. / Target
creature gets -2/-2 until end of turn. If this spell was kicked, that creature gets -6/-6 until end of
turn instead."* The kicker is free here and is value on its own: a Squirrel sacrificed fires every death
payoff, and a Treasure or Food fires [Marionette Apprentice](https://scryfall.com/search?q=%21%22Marionette+Apprentice%22) and [Mirkwood Bats](https://scryfall.com/search?q=%21%22Mirkwood+Bats%22). -6/-6 kills
indestructible creatures, which [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22) can't. It misses planeswalkers and toughness 7 or
more, which is why [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22) is the MAIN. Pick this one instead if the pilot wants the removal
spell to drain as well.

### Grand Nagus Zek would displace Tireless Provisioner

[Grand Nagus Zek](https://scryfall.com/search?q=%21%22Grand+Nagus+Zek%22), {2}{B}, 1/1, new: *"Grand Nagus Zek gets +1/+1 for each Treasure you control. /
Whenever another creature dies, create a Treasure token. This ability triggers only once each turn."*

Wave 10 passed [Scavenger's Talent](https://scryfall.com/search?q=%21%22Scavenger%27s+Talent%22) and [Kingpin, Wilson Fisk](https://scryfall.com/search?q=%21%22Kingpin%2C+Wilson+Fisk%22) as [Pitiless Plunderer](https://scryfall.com/search?q=%21%22Pitiless+Plunderer%22) shapes on one ground,
"once per turn". Ledger trig-037 says a once-each-turn trigger fires on every player's turn when the
deck can act at instant speed, and this list can: [Ashnod's Altar](https://scryfall.com/search?q=%21%22Ashnod%27s+Altar%22), [Warren Soultrader](https://scryfall.com/search?q=%21%22Warren+Soultrader%22),
[Phyrexian Tower](https://scryfall.com/search?q=%21%22Phyrexian+Tower%22), [High Market](https://scryfall.com/search?q=%21%22High+Market%22) and [Chatterfang](https://scryfall.com/search?q=%21%22Chatterfang%2C+Squirrel+General%22)'s own ability all kill at instant speed. So [Zek](https://scryfall.com/search?q=%21%22Grand+Nagus+Zek%22) is a
Treasure event on each of the four turns in a round, and each one runs the gameplan §5c chain (with
[Chatterfang](https://scryfall.com/search?q=%21%22Chatterfang%2C+Squirrel+General%22) alone, a Treasure and a Squirrel). It also counts opponents' creatures dying. The pilot
asked for more [Plunderer](https://scryfall.com/search?q=%21%22Pitiless+Plunderer%22)-shaped cards and fewer landfall pieces in wave 10, which is why it points at
[Tireless Provisioner](https://scryfall.com/search?q=%21%22Tireless+Provisioner%22). It's bench because [Pitiless Plunderer](https://scryfall.com/search?q=%21%22Pitiless+Plunderer%22) already makes a Treasure per death
when it's out, ramp is at 15, and wave 12 kept [Provisioner](https://scryfall.com/search?q=%21%22Tireless+Provisioner%22) today. The same re-read applies to the two
cards wave 10 passed.

### Exploration would displace Dryad of the Ilysian Grove

[Exploration](https://scryfall.com/search?q=%21%22Exploration%22), {G} enchantment, reprint: *"You may play an additional land on each of your turns."*
This is the pilot's own hold from 2026-11-10. The measurement recorded that day still stands. In the
games where it's in the opening hand, three lands are out on turn 2 51% of the time, that line comes up
in about 4% of all games, and by turn 4 it's level with [Dryad of the Ilysian Grove](https://scryfall.com/search?q=%21%22Dryad+of+the+Ilysian+Grove%22) and [Azusa, Lost but Seeking](https://scryfall.com/search?q=%21%22Azusa%2C+Lost+but+Seeking%22). If
[Augur of Autumn](https://scryfall.com/search?q=%21%22Augur+of+Autumn%22) came in as well, [Exploration](https://scryfall.com/search?q=%21%22Exploration%22) would have a land supply off the top.

### Jadzia Dax, Living Legacy would displace Twitching Doll

[Jadzia Dax, Living Legacy](https://scryfall.com/search?q=%21%22Jadzia+Dax%2C+Living+Legacy%22), {1}{G}, 0/1, new: *"At the beginning of your first main phase, put a
+1/+1 counter on Jadzia Dax, then add an amount of {G} equal to the number of counters on her."* Cast on
turn 2, she adds 1, 2 and 3 green on turns 3 to 5, six in all, against [Twitching Doll](https://scryfall.com/search?q=%21%22Twitching+Doll%22)'s three of
any colour. [Doubling Season](https://scryfall.com/search?q=%21%22Doubling+Season%22) doubles her counters and [Yawgmoth, Thran Physician](https://scryfall.com/search?q=%21%22Yawgmoth%2C+Thran+Physician%22)'s proliferate
adds one. Her mana is green only and lasts only through the first main phase, she doesn't fix, and she
has no Spider burst. Ramp is the list's strongest role and the pilot picked the [Doll](https://scryfall.com/search?q=%21%22Twitching+Doll%22) today, so she's
bench. She's also the cheaper version of [Gardenize](https://scryfall.com/search?q=%21%22Gardenize%22)'s kind of mana if the pilot wants to keep that
line after swap 2.

### Fabled Passage would displace a basic Forest

[Fabled Passage](https://scryfall.com/search?q=%21%22Fabled+Passage%22), reprint. It's a third fetch, so each play is two landfall triggers (the Passage,
then the basic), and the basic enters untapped once you control four lands. The FRA review's grounds
still hold. The pilot's wave 10 ask for fewer landfall and land-fetch pieces was about spell slots, and
this replaces a land.

### Mosswort Bridge would displace a basic Forest

[Mosswort Bridge](https://scryfall.com/search?q=%21%22Mosswort+Bridge%22), reprint: hideaway 4, enters tapped, and *"{G}, {T}: You may play the exiled card
without paying its mana cost if creatures you control have total power 10 or greater."* Ten 1/1s is 10
power. It's a free card from a land slot, toward the draw aim
without spending a spell slot. The cost is one more tapped land beside [Barren Moor](https://scryfall.com/search?q=%21%22Barren+Moor%22),
[Bojuka Bog](https://scryfall.com/search?q=%21%22Bojuka+Bog%22) and [Khalni Garden](https://scryfall.com/search?q=%21%22Khalni+Garden%22).

## Near-misses and traps

### Good cards, wrong deck or a slot short

- [Gul Dukat, Colonial Prefect](https://scryfall.com/search?q=%21%22Gul+Dukat%2C+Colonial+Prefect%22) makes each opponent lose again, at every end step, the life they lost
  that turn, and you gain that much in one event, which [Vito, Thorn of the Dusk Rose](https://scryfall.com/search?q=%21%22Vito%2C+Thorn+of+the+Dusk+Rose%22) turns into the
  same amount again at one opponent. [Bloodletter of Aclazotz](https://scryfall.com/search?q=%21%22Bloodletter+of+Aclazotz%22) does the doubling for 4 mana as the
  loss happens. [Gul Dukat](https://scryfall.com/search?q=%21%22Gul+Dukat%2C+Colonial+Prefect%22) waits for the end step, which gives the table a turn of priority to answer
  it, and costs 7 with {B}{B}{B}.
- [Alhammarret's Archive](https://scryfall.com/search?q=%21%22Alhammarret%27s+Archive%22) doubles every draw after the first in your draw step, so [Kurn](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22)'s three
  become six and [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22)'s two become four. It also doubles each lifegain amount, so [Vito](https://scryfall.com/search?q=%21%22Vito%2C+Thorn+of+the+Dusk+Rose%22) drains
  double, while [Dina](https://scryfall.com/search?q=%21%22Dina%2C+Soul+Steeper%22) and [Starscape Cleric](https://scryfall.com/search?q=%21%22Starscape+Cleric%22) count events and don't change. It's a 5-mana multiplier and a
  blank without a draw source out (§2.5).
- [Replicator](https://scryfall.com/search?q=%21%22Replicator%22) makes a tapped copy of a token at instant speed for {2}. One Treasure copy through the
  full §5c chain can be 30 tokens. [Hazel of the Rootbloom](https://scryfall.com/search?q=%21%22Hazel+of+the+Rootbloom%22) copies for free at your end step, twice
  on a Squirrel, and [Ninja Pizza](https://scryfall.com/search?q=%21%22Ninja+Pizza%22) gives the same kind of event free each turn. Wave 10 wanted seeds
  that make several tokens at once.
- [Elim Garak, Simple Tailor](https://scryfall.com/search?q=%21%22Elim+Garak%2C+Simple+Tailor%22) drains 2 from each opponent per dilemma, and
  [Black Market Connections](https://scryfall.com/search?q=%21%22Black+Market+Connections%22)' trigger is a dilemma every first main phase. That's one trigger a turn
  from one source.
- [Captain Kathryn Janeway](https://scryfall.com/search?q=%21%22Captain+Kathryn+Janeway%22) gives an extra land drop and an explore for every creature entering,
  tokens included, so a token turn digs every land off the top. Each nonland reveal puts a +1/+1 counter
  on a token and blanks [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) on it, a cost under eval-044 rather than a veto. Lands are what
  this list has most of.
- [Georgiou, Terran Emperor](https://scryfall.com/search?q=%21%22Georgiou%2C+Terran+Emperor%22) stops you losing at 0 life and, at 0 or less, makes ten Officers each
  end step, 20 tokens with [Chatterfang](https://scryfall.com/search?q=%21%22Chatterfang%2C+Squirrel+General%22). [Sylvan Library](https://scryfall.com/search?q=%21%22Sylvan+Library%22) gets you there fast. If she leaves while
  you're at 0 or less, you lose at once (CR 704.5a). 6 mana for one point of failure.
- [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) untaps [Witch's Oven](https://scryfall.com/search?q=%21%22Witch%27s+Oven%22) and [Twitching Doll](https://scryfall.com/search?q=%21%22Twitching+Doll%22) on each opponent's untap step, so
  the [Oven](https://scryfall.com/search?q=%21%22Witch%27s+Oven%22) becomes four outlets a round. 4 mana for two cards' untaps, one of them a trial.
- [Captain Pike, Fullness of Time](https://scryfall.com/search?q=%21%22Captain+Pike%2C+Fullness+of+Time%22) is [Augur of Autumn](https://scryfall.com/search?q=%21%22Augur+of+Autumn%22)'s land half on a big body. [Augur](https://scryfall.com/search?q=%21%22Augur+of+Autumn%22) also casts
  creatures, so it's the better card here.

### Traps: they read like upgrades and aren't

- [Holo-Engineer](https://scryfall.com/search?q=%21%22Holo-Engineer%22) reads *"If one or more tokens would be created under your control, that many 3/3
  colorless Illusion artifact creature tokens are created instead."* You choose the order of the
  replacement effects (CR 616.1), but each applicable one is applied once (CR 616.1f, 614.5), so
  [Holo-Engineer](https://scryfall.com/search?q=%21%22Holo-Engineer%22) always applies and no Treasure, Food or Clue is ever created again. That breaks the
  [Pitiless Plunderer](https://scryfall.com/search?q=%21%22Pitiless+Plunderer%22) loop (gameplan §8a, where the Treasure pays the {B}), the [Camellia](https://scryfall.com/search?q=%21%22Camellia%2C+the+Seedmiser%22) Food loop (§8b),
  [Ninja Pizza](https://scryfall.com/search?q=%21%22Ninja+Pizza%22), [Bilbo, Fellow Conspirator](https://scryfall.com/search?q=%21%22Bilbo%2C+Fellow+Conspirator%22) and [Academy Manufactor](https://scryfall.com/search?q=%21%22Academy+Manufactor%22). The best order, [Holo-Engineer](https://scryfall.com/search?q=%21%22Holo-Engineer%22)
  first and [Chatterfang](https://scryfall.com/search?q=%21%22Chatterfang%2C+Squirrel+General%22) after, still leaves one 1/1 Squirrel per event.
- [Combadge](https://scryfall.com/search?q=%21%22Combadge%22) and [Starfleet Communicator](https://scryfall.com/search?q=%21%22Starfleet+Communicator%22) look like token makers, but the copy isn't created
  (CR 111.13), so nothing in the list sees it.
- [Reclamation Specialist](https://scryfall.com/search?q=%21%22Reclamation+Specialist%22), [Collation Trimatrix](https://scryfall.com/search?q=%21%22Collation+Trimatrix%22), [Hive Mind Coprocessor](https://scryfall.com/search?q=%21%22Hive+Mind+Coprocessor%22),
  [Bio-Asset Allocator](https://scryfall.com/search?q=%21%22Bio-Asset+Allocator%22) and the Borg anthems read "artifact creatures". This list's artifact tokens
  aren't creatures and its creature tokens aren't artifacts.
- [Night's Whisper](https://scryfall.com/search?q=%21%22Night%27s+Whisper%22) looks like the eighth draw source. [Deadly Dispute](https://scryfall.com/search?q=%21%22Deadly+Dispute%22) fills the same slot with a
  Treasure on top, and it's the recorded undo row.
- [Toxic Deluge](https://scryfall.com/search?q=%21%22Toxic+Deluge%22) is a reprint of the wipe wave 3 cut. [Blasphemous Edict](https://scryfall.com/search?q=%21%22Blasphemous+Edict%22) still does the job for {B}
  and keeps your payoffs.
- [Engineered Explosives](https://scryfall.com/search?q=%21%22Engineered+Explosives%22) at X=0 destroys every nonland permanent with mana value 0, which is all of
  your Squirrels, Treasures, Foods and Clues along with opponents' tokens.
- [Support Mission](https://scryfall.com/search?q=%21%22Support+Mission%22), [The Immortal Sun](https://scryfall.com/search?q=%21%22The+Immortal+Sun%22), [Door of Destinies](https://scryfall.com/search?q=%21%22Door+of+Destinies%22) and [Tricorder](https://scryfall.com/search?q=%21%22Tricorder%22) put counters or
  anthems on your creatures. Under eval-044 that's a [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) cost to weigh, but none of them does
  enough else here to pay it.
- [Benjamin Sisko, Besieged](https://scryfall.com/search?q=%21%22Benjamin+Sisko%2C+Besieged%22) plays with the top card revealed, the exact objection that cut Oracle of
  Mul Daya.
