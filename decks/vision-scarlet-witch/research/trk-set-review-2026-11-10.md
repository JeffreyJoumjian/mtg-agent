# TRK + TRC set review: The Vision and Scarlet Witch (2026-11-10)

## Header

- **Sets.** Star Trek (TRK, 311 cards) and Star Trek Commander (TRC, 336 cards). Both release on
  2026-11-13. Scryfall already lists every card in both as Commander-legal, so no card here waits on a
  legality change.
- **Lists.** `main` is the target: Bracket 3, the heavier engine build the pilot plays most. `b4`
  (Bracket 4 turbo) and `b3-tokens` (Bracket 3 tokens) get their own verdict columns. `spellslinger`
  gets no column this time.
- **Method.** deck-brain §1 and §2 and the set-review reviewer brief. Set cards' text comes from the
  pool files, the deck's own cards from the bundle's oracle files, and rules from `rules/sections/`
  (CR 2026-08-07). Every card is costed in this deck's mana (§1.2): Ruby Medallion and The Fire
  Crystal reduce red spells, Artist's Talent level 2 and Longshot reduce noncreature spells, all four
  reduce generic mana only, and her refund makes any spell that costs exactly {R} free. Every card is
  checked against the deck's own board (§1.3), each of its abilities is scored on its own (ledger
  eval-021), and its name and rules text were grepped in `decisions.md`, `sideboard.md`, the
  spellslinger research and the FRA review (tool-017). Reprints got the same reading as new cards
  (tool-007). Each MAIN's cut had its oracle text checked against the incoming card's trigger words
  and its records grepped before it was named (eval-011, tool-019). `bun run lookup` was run for the
  trigger doubler, Station, phasing, impulse draw, Skullclamp and every cut.
- **Rules coverage.** The local CR (2026-08-07) predates TRK. Beam me up, Federation, Battlefront and
  Seek out aren't in it, so their behaviour here comes from the cards' reminder text. Station (CR
  702.184a) and phasing (CR 702.26) are in it and were read directly.
- **EDHREC.** There's no data for either set yet, so the field lens is skipped for every new card
  (§2.2). For reprints, the deck's own 2026-09-03 pull (`research/edhrec-2026-09-03.txt`, 278 decks)
  is on file, and it is cited as a fact where it bears, never as a reason.
- **Game Changers.** The pool has none. `main` stays at 3 (Ancient Tomb, Jeska's Will, The One Ring),
  `b4` at 10 and `b3-tokens` at 3 whether or not every MAIN below is taken.
- **Constraints honoured.** Hexing Squelcher, Conqueror's Flail and The Ozolith stay. She keeps
  hexproof (Champion's Helm, Swiftfoot Boots), protection (Commander's Plate), indestructible (Mithril
  Coat) and lifelink (Shadowspear). No Nico Minoru, and no Sprout Swarm. No fast mana, ritual or
  cantrip is nominated as a MAIN cut. Price is never an axis, because everything is proxied. No
  proposal here creates a new loop.
- **No deck file was edited.** Every swap waits for the pilot, one decision at a time.

## Pool

151 cards fit mono-red or colourless: 78 red and 73 colourless. TRK holds 66 (63 new, 3 reprints)
and TRC holds 85 (42 new, 43 reprints), so the pool is **105 new cards and 46 reprints**. No card
appears in both files.

Seven are already in at least one of the three lists: [Mountain](https://scryfall.com/search?q=%21%22Mountain%22), [Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22), [Command Beacon](https://scryfall.com/search?q=%21%22Command+Beacon%22)
and [Swiftfoot Boots](https://scryfall.com/search?q=%21%22Swiftfoot+Boots%22) in all three, [Arcane Signet](https://scryfall.com/search?q=%21%22Arcane+Signet%22) and [Rogue's Passage](https://scryfall.com/search?q=%21%22Rogue's+Passage%22) in `main` and
`b3-tokens`, and [Thrill of Possibility](https://scryfall.com/search?q=%21%22Thrill+of+Possibility%22) in `b4` (and `spellslinger`).

## Result

| List | MAIN | SIDE | IN | NO |
|---|---|---|---|---|
| main | 3 | 2 | 6 | 140 |
| b4 | 0 | 1 | 5 | 145 |
| b3-tokens | 2 | 3 | 6 | 140 |

**MAIN**

1. `main`: [U.S.S. Defiant, Mirror Migrant](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Mirror+Migrant%22) in, [Blackblade Reforged](https://scryfall.com/search?q=%21%22Blackblade+Reforged%22) out. The deciding axis is protection
   coverage. A {2} flash artifact phases her out with her Equipment and counters, which answers edicts,
   exile wraths and bounce, the one row of the protection matrix nothing covered. Growth & Voltron
   goes 5 to 4 and Protection 8 to 9, both onto their targets.
2. `main`: [Reckless Impulse](https://scryfall.com/search?q=%21%22Reckless+Impulse%22) in, [Forge of Heroes](https://scryfall.com/search?q=%21%22Forge+of+Heroes%22) out. The deciding axis is cards. It draws two
   for {1}{R}, free under any one reducer plus her refund, and moves Card Draw from 7 into the pilot's 8 to 10 aim. Lands go
   32 to 31, the count `b3-tokens` already runs.
3. `main`: [Tal Shiar Analyst](https://scryfall.com/search?q=%21%22Tal+Shiar+Analyst%22) in, [Thermo-Alchemist](https://scryfall.com/search?q=%21%22Thermo-Alchemist%22) out. The deciding axis is trigger breadth.
   It's the same tap-and-untap pinger, but it untaps on 50 of the list's 70 nonland cards instead of 28, for one more
   mana.
4. `b3-tokens`: [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) in, [Kediss, Emberclaw Familiar](https://scryfall.com/search?q=%21%22Kediss%2C+Emberclaw+Familiar%22) out. The deciding axis is cards.
   Every 1/1 token becomes two cards for {1}, and Card Draw goes 6 to 7. Kediss copies her combat damage only while two or more
   opponents are alive, and this list's plan finishes the last opponent with that swing.
5. `b3-tokens`: [Academy Instructor](https://scryfall.com/search?q=%21%22Academy+Instructor%22) in, [Kessig Flamebreather](https://scryfall.com/search?q=%21%22Kessig+Flamebreather%22) out. The deciding axis is what each
   noncreature spell produces. The trigger is the same, but a 1/1 Officer that Impact Tremors, Purphoros, Goblin Bombardment and Skullclamp
   all turn into more than Kessig's 1 damage.

**SIDE**

- `main`: [Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22), displaces [Loki Laufeyson](https://scryfall.com/search?q=%21%22Loki+Laufeyson%22).
- `main`: [Alhammarret's Archive](https://scryfall.com/search?q=%21%22Alhammarret's+Archive%22), displaces [Wanda's Vision](https://scryfall.com/search?q=%21%22Wanda's+Vision%22).
- `b4`: [Tal Shiar Analyst](https://scryfall.com/search?q=%21%22Tal+Shiar+Analyst%22), displaces [Thermo-Alchemist](https://scryfall.com/search?q=%21%22Thermo-Alchemist%22).
- `b3-tokens`: [Reckless Impulse](https://scryfall.com/search?q=%21%22Reckless+Impulse%22), displaces [Crash Through](https://scryfall.com/search?q=%21%22Crash+Through%22).
- `b3-tokens`: [U.S.S. Defiant, Mirror Migrant](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Mirror+Migrant%22), displaces [Champion's Helm](https://scryfall.com/search?q=%21%22Champion's+Helm%22).
- `b3-tokens`: [Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22), displaces [Loki Laufeyson](https://scryfall.com/search?q=%21%22Loki+Laufeyson%22).

**Curve, if all three `main` swaps are taken:** average MV 2.81 to 2.82, MV ≤ 2 stays at 33, MV ≤ 3
goes 49 to 50, and the Lands section goes 32 to 31 (`deck:show`'s land count, which leaves out the two
modal spell lands, goes 30 to 29). Roles: Card Draw 7 to 8, Protection 8 to 9, Growth & Voltron 5 to
4, Converters stay at 8. **Both `b3-tokens` swaps:** average MV stays at 2.73, MV ≤ 2 goes 34 to 33,
MV ≤ 3 stays at 51, Card Draw 6 to 7, Win Conditions 7 to 6.

**`b4` gets no MAIN.** Its kill runs on named loops and zero-to-two-mana pieces, and no card in the
pool makes a loop cheaper or her turn-2 landing more likely.

## Set mechanics as they matter to this deck

- **Noncreature spell versus instant or sorcery.** The two best cards in the pool for these lists,
  [Tal Shiar Analyst](https://scryfall.com/search?q=%21%22Tal+Shiar+Analyst%22) and [Academy Instructor](https://scryfall.com/search?q=%21%22Academy+Instructor%22), trigger on noncreature spells. In `main` that is 50
  of 70 nonland cards against 28 instants and sorceries (counting the spell faces of
  [Shatterskull Smashing](https://scryfall.com/search?q=%21%22Shatterskull+Smashing%22) and [Valakut Awakening](https://scryfall.com/search?q=%21%22Valakut+Awakening%22)), because the list casts 22 artifacts and
  enchantments. In `b3-tokens` it's 52 against 30, and in `b4` it's 57 against 39.
- **Station** (CR 702.184a) taps another creature to put charge counters equal to its power on a
  Spacecraft, at sorcery speed. She has the most power on the board, so she can station anything in one
  tap, but then she doesn't attack, and the deck's other creatures are small pingers. An unstationed
  Spacecraft is a noncreature artifact spell, so its cast fires her trigger and the noncreature pingers,
  and then it sits there. Only [U.S.S. Defiant, Mirror Migrant](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Mirror+Migrant%22) earns a slot, and it earns it with its
  enter trigger, not its station.
- **Phasing** (CR 702.26) is how that Defiant protects her. A phased-out permanent is treated as though
  it doesn't exist (702.26b). It keeps its counters and doesn't change zones, so nothing triggers on it
  leaving (702.26d). Attached Equipment phases out with it and back in attached (702.26g). It phases in
  during its controller's next untap step (702.26a).
- **Beam me up** (reminder text) casts the card again from the graveyard if you also return a creature
  you control to its owner's hand. A token qualifies and then ceases to exist (CR 704.5d), so an Iron
  Man Robot, a Sokenzan Spirit or a `b3-tokens` Goblin pays it. Each beam is a cast, so it's a second
  trigger for her and every converter. [Boarding Action](https://scryfall.com/search?q=%21%22Boarding+Action%22) and [Transporter Malfunction](https://scryfall.com/search?q=%21%22Transporter+Malfunction%22) carry it.
  Neither draws a card, so both are NO.
- **Federation** counts creature types among your non-Borg creatures. She alone is two (Mutant Hero).
  [Infinite Diversity](https://scryfall.com/search?q=%21%22Infinite+Diversity%22) is the only card here that scales off it, and it costs nine.
- **Seek out** triggers on the second card you draw each turn. On your own turn this deck meets it
  almost every turn (the draw step plus any cantrip), so [Ro Laren, Double Agent](https://scryfall.com/search?q=%21%22Ro+Laren%2C+Double+Agent%22) and
  [Rom and Leeta, Unlikely Pair](https://scryfall.com/search?q=%21%22Rom+and+Leeta%2C+Unlikely+Pair%22) would trigger reliably. Once a turn is still far below a converter
  that fires on every spell.
- **Battlefront** counts the opponents you attacked this turn. She attacks one player a combat, so it
  reads 1 here.
- **Officer, Klingon and Warrior typal.** Infantry Shield's mobilize tokens are red Warriors (`b4` and
  `b3-tokens`), the only Warriors these lists make in bulk. Nothing typal here beats Impact Tremors,
  which counts every creature.

## Classification table

One row for every pool card. Verdicts: **MAIN** displaces a named card in that list now, **SIDE**
goes on the bench with the card it displaces, **IN** means the list already runs it, **NO** is a
pass.

| # | Name | MV | New? | main | b4 | b3-tokens | Reason |
|---|---|---|---|---|---|---|---|
| 1 | [Academy Instructor](https://scryfall.com/search?q=%21%22Academy+Instructor%22) | 3 | NEW | NO | NO | MAIN | A 1/1 Officer on every noncreature spell. b3-tokens turns each one into damage with Impact Tremors, Purphoros or Goblin Bombardment, so it displaces Kessig Flamebreather there (swap 5). main has no token payoff, and b4's kill doesn't need a three-mana token maker. |
| 2 | [Beckett Mariner, Impetuous Ensign](https://scryfall.com/search?q=%21%22Beckett+Mariner%2C+Impetuous+Ensign%22) | 2 | NEW | NO | NO | NO | It pings only after it has been tapped three times, and nothing here taps it. |
| 3 | [Boarding Action](https://scryfall.com/search?q=%21%22Boarding+Action%22) | 2 | NEW | NO | NO | NO | Beam me up makes it two casts from one card, and a token pays the return. Neither cast draws, though, and in b3-tokens Hordeling Outburst already holds the token-sorcery slot. |
| 4 | [Brazen Bluff](https://scryfall.com/search?q=%21%22Brazen+Bluff%22) | 2 | NEW | NO | NO | NO | The opponent decides whether you get the free cast, and only off their own noncreature spell. |
| 5 | [Cantankerous Captain](https://scryfall.com/search?q=%21%22Cantankerous+Captain%22) | 3 | NEW | NO | NO | NO | Its +1/+0 at combat is growth she already gets from every spell. |
| 6 | [Captain James T. Kirk](https://scryfall.com/search?q=%21%22Captain+James+T.+Kirk%22) | 3 | NEW | NO | NO | NO | Its modes fire only when it enters or attacks, and it never triggers on spells. |
| 7 | [Captain Michael Burnham](https://scryfall.com/search?q=%21%22Captain+Michael+Burnham%22) | 3 | NEW | NO | NO | NO | It pings on land drops, and this deck's engine is spells. |
| 8 | [Captain's Tutelage](https://scryfall.com/search?q=%21%22Captain's+Tutelage%22) | 2 | NEW | NO | NO | NO | It's an Aura for +2/+0, which her counters outgrow in two spells. |
| 9 | [D-7 Battle Cruiser](https://scryfall.com/search?q=%21%22D-7+Battle+Cruiser%22) | 2 | NEW | NO | NO | NO | Stationing it taps another creature, and its token is a 2/1 for one turn. |
| 10 | [Dahar Master](https://scryfall.com/search?q=%21%22Dahar+Master%22) | 4 | NEW | NO | NO | NO | Four mana for a 4/3 whose 2 damage costs another permanent. |
| 11 | [Dominion Infiltration](https://scryfall.com/search?q=%21%22Dominion+Infiltration%22) | 3 | NEW | NO | NO | NO | It borrows opponents' creatures for one combat, which is not this deck's plan. |
| 12 | [Encounter the Unknown](https://scryfall.com/search?q=%21%22Encounter+the+Unknown%22) | 3 | NEW | NO | NO | NO | Its draw mode is Reckless Impulse at instant speed for one more pip. Its sweep mode kills our own 2-toughness pingers and tokens and hits us too. Reckless Impulse takes the draw slot instead. |
| 13 | [Erica Ortegas, Plucky Pilot](https://scryfall.com/search?q=%21%22Erica+Ortegas%2C+Plucky+Pilot%22) | 4 | NEW | NO | NO | NO | It puts lands into play when tapped, which this deck has no use for. |
| 14 | [Exploratory Mission](https://scryfall.com/search?q=%21%22Exploratory+Mission%22) | 4 | NEW | NO | NO | NO | Its impulse cards come from land drops, not spells. |
| 15 | [Genesis Effect](https://scryfall.com/search?q=%21%22Genesis+Effect%22) | 5 | NEW | NO | NO | NO | Five mana for one creature removal spell. |
| 16 | [Horta](https://scryfall.com/search?q=%21%22Horta%22) | 6 | NEW | NO | NO | NO | It's a six-mana 7/6 or a landcycler, and neither job is open. |
| 17 | [Infinite Diversity](https://scryfall.com/search?q=%21%22Infinite+Diversity%22) | 9 | NEW | NO | NO | NO | It costs nine mana, or {3}{R}{R} under all four reducers, to recast one graveyard spell once per creature type. It's recorded as a cute line below. |
| 18 | [Khaaaaaaaaaaaannn!](https://scryfall.com/search?q=%21%22Khaaaaaaaaaaaannn%21%22) | 1 | NEW | NO | NO | NO | It's creature-only removal, and Lightning Bolt and Shatterskull Smashing already hold that job. |
| 19 | [Khan, Despot by Design](https://scryfall.com/search?q=%21%22Khan%2C+Despot+by+Design%22) | 5 | NEW | NO | NO | NO | Five mana for one ping to each opponent and their creatures. |
| 20 | [La'An Noonien-Singh, Security](https://scryfall.com/search?q=%21%22La'An+Noonien-Singh%2C+Security%22) | 4 | NEW | NO | NO | NO | She flies, so a can't-block effect adds evasion she already has. |
| 21 | [Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22) | 2 | NEW | SIDE | NO | SIDE | Pointed at her, every spell gives {R}{R} and two counters, and it stacks with Roaming Throne. It needs {2}, a turn or haste, and it dies to any ping. It goes on the bench over Loki Laufeyson in main and b3-tokens. b4 already makes its loops mana-positive with Ruby Medallion. |
| 22 | [Munitions Enthusiast](https://scryfall.com/search?q=%21%22Munitions+Enthusiast%22) | 2 | NEW | NO | NO | NO | It's a 3/2 trampler with a 1-damage death trigger. |
| 23 | [The Naked Time](https://scryfall.com/search?q=%21%22The+Naked+Time%22) | 2 | NEW | NO | NO | NO | It ramps one Mountain and then makes you sacrifice a land. |
| 24 | [Pah-Wraith](https://scryfall.com/search?q=%21%22Pah-Wraith%22) | 7 | NEW | NO | NO | NO | Seven mana for a combat anthem. |
| 25 | [Perils of the Past](https://scryfall.com/search?q=%21%22Perils+of+the+Past%22) | 2 | NEW | NO | NO | NO | It's a pump or Abrade's artifact mode, and it neither draws nor hits players. |
| 26 | [Planetary Bombardment](https://scryfall.com/search?q=%21%22Planetary+Bombardment%22) | 1 | NEW | NO | NO | NO | It's free with her out, but it doesn't replace itself and only hits creatures. |
| 27 | [Planetary Patrol](https://scryfall.com/search?q=%21%22Planetary+Patrol%22) | 2 | NEW | NO | NO | NO | It's a 2/2 that grows on land drops. |
| 28 | [Plasma Cascade](https://scryfall.com/search?q=%21%22Plasma+Cascade%22) | 3 | NEW | NO | NO | NO | It's Lightning Bolt plus a rummage for two more mana, and removal stays at three slots by design. |
| 29 | [Q, Stacking the Deck](https://scryfall.com/search?q=%21%22Q%2C+Stacking+the+Deck%22) | 4 | NEW | NO | NO | NO | Each copy costs a card from hand plus the copy's own mana, so it's card-negative. |
| 30 | [Quark, Humble Proprietor](https://scryfall.com/search?q=%21%22Quark%2C+Humble+Proprietor%22) | 3 | NEW | NO | NO | NO | This is a trap. "You can't sacrifice Treasure tokens" switches off Storm-Kiln Artist's and Big Score's Treasures as mana. |
| 31 | [Ravenous Cosmozoan](https://scryfall.com/search?q=%21%22Ravenous+Cosmozoan%22) | 6 | NEW | NO | NO | NO | It's a 3/3 flying haste body and nothing more. |
| 32 | [Reckless Impulse](https://scryfall.com/search?q=%21%22Reckless+Impulse%22) | 2 | REPRINT | MAIN | NO | SIDE | Two cards for {1}{R}, which any one reducer plus her refund makes free. In main it displaces Forge of Heroes (swap 2, draw 7 to 8). In b3-tokens it goes on the bench over Crash Through, because cantrips are protected. b4 already runs Wrenn's Resolve, the same card, and its draw is at 10. |
| 33 | [Red Alert!](https://scryfall.com/search?q=%21%22Red+Alert%21%22) | 3 | NEW | NO | NO | NO | It's a team +2/+0 for a combat turn. |
| 34 | [Sarcophagus, Ship of the Dead](https://scryfall.com/search?q=%21%22Sarcophagus%2C+Ship+of+the+Dead%22) | 3 | NEW | NO | NO | NO | It's a Spacecraft that needs 10 station counters before it attacks. |
| 35 | [Savvy Profiteer](https://scryfall.com/search?q=%21%22Savvy+Profiteer%22) | 2 | NEW | NO | NO | NO | It's a mana creature, and mana is not this deck's constraint. |
| 36 | [Silicate Surveyor](https://scryfall.com/search?q=%21%22Silicate+Surveyor%22) | 5 | NEW | NO | NO | NO | Five mana for one impulse card. |
| 37 | [Starfleet Security](https://scryfall.com/search?q=%21%22Starfleet+Security%22) | 1 | NEW | NO | NO | NO | It's a 1/1 that leaves a Clue, and Clue makers don't count as draw. |
| 38 | [Tal Shiar Analyst](https://scryfall.com/search?q=%21%22Tal+Shiar+Analyst%22) | 3 | NEW | MAIN | SIDE | NO | Thermo-Alchemist's tap-and-untap engine, but it untaps on every noncreature spell instead of every instant or sorcery. In main it displaces Thermo-Alchemist (swap 3). In b4 it goes on the bench over Thermo-Alchemist, since MV 3 costs a turbo curve. b3-tokens has no Thermo-Alchemist, and over Kessig Flamebreather it adds one ping a turn cycle for one more mana. |
| 39 | [Targ Wrangler](https://scryfall.com/search?q=%21%22Targ+Wrangler%22) | 3 | NEW | NO | NO | NO | Every attack costs you a nonland permanent. |
| 40 | [Tasha Yar, Out of Time](https://scryfall.com/search?q=%21%22Tasha+Yar%2C+Out+of+Time%22) | 2 | NEW | NO | NO | NO | It's a 2/1 haste that leaves one impulse card when it dies. |
| 41 | [Test of Identity](https://scryfall.com/search?q=%21%22Test+of+Identity%22) | 2 | NEW | NO | NO | NO | Its Starfleet mode is Thrill of Possibility, which is card-neutral, while Reckless Impulse is card-positive at the same cost. b4 already runs Thrill of Possibility. |
| 42 | [Transporter Malfunction](https://scryfall.com/search?q=%21%22Transporter+Malfunction%22) | 2 | NEW | NO | NO | NO | It's 3 damage at sorcery speed, which Lightning Bolt does for one mana. |
| 43 | [Will Riker, First in the Field](https://scryfall.com/search?q=%21%22Will+Riker%2C+First+in+the+Field%22) | 4 | NEW | NO | NO | NO | Its lands last one turn, and the deck's engine is spells. |
| 44 | [Worf, Intelligence Contractor](https://scryfall.com/search?q=%21%22Worf%2C+Intelligence+Contractor%22) | 3 | NEW | NO | NO | NO | It steals small creatures for one combat. |
| 45 | [The Wrath of Khan](https://scryfall.com/search?q=%21%22The+Wrath+of+Khan%22) | 3 | NEW | NO | NO | NO | It's a three-turn saga for removal and an edict, too slow for a removal slot kept light on purpose. |
| 46 | [Class-F Shuttlecraft](https://scryfall.com/search?q=%21%22Class-F+Shuttlecraft%22) | 3 | NEW | NO | NO | NO | It's a three-mana rock, and Arcane Signet already makes {R} for two. |
| 47 | [Combadge](https://scryfall.com/search?q=%21%22Combadge%22) | 3 | NEW | NO | NO | NO | Its unblockable needs two Communicators attached, and she flies. |
| 48 | [Crystalline Entity](https://scryfall.com/search?q=%21%22Crystalline+Entity%22) | 8 | NEW | NO | NO | NO | She and Iron Man survive it because they're artifacts, but every pinger dies, and it costs eight. |
| 49 | [Cybernetic Specialist](https://scryfall.com/search?q=%21%22Cybernetic+Specialist%22) | 2 | NEW | NO | NO | NO | It surveils once and tucks graveyard cards. |
| 50 | [Deep Space 9](https://scryfall.com/search?q=%21%22Deep+Space+9%22) | 9 | NEW | NO | NO | NO | It costs nine mana. |
| 51 | [Engineered Explosives](https://scryfall.com/search?q=%21%22Engineered+Explosives%22) | 0 | REPRINT | NO | NO | NO | Cast for 0 it's a free spell with nothing after it, and mono-red reaches one charge counter at most. |
| 52 | [The Holodeck](https://scryfall.com/search?q=%21%22The+Holodeck%22) | 7 | NEW | NO | NO | NO | Seven mana for one permanent a turn from the graveyard. |
| 53 | [Isolinear Processor](https://scryfall.com/search?q=%21%22Isolinear+Processor%22) | 2 | NEW | NO | NO | NO | Its mana pays only for artifacts, and its loot costs {2}. |
| 54 | [Replicator](https://scryfall.com/search?q=%21%22Replicator%22) | 2 | NEW | NO | NO | NO | It copies a token for {2} a time. |
| 55 | [Sickbay](https://scryfall.com/search?q=%21%22Sickbay%22) | 5 | NEW | NO | NO | NO | Five mana for counters she already gets from every spell. |
| 56 | [Tea, Earl Grey, Hot](https://scryfall.com/search?q=%21%22Tea%2C+Earl+Grey%2C+Hot%22) | 2 | NEW | NO | NO | NO | It's a two-mana cantrip in a list whose cantrips cost {R}, and its 2 damage costs another {2}. |
| 57 | [Tricorder](https://scryfall.com/search?q=%21%22Tricorder%22) | 1 | NEW | NO | NO | NO | It's +1/+1 and a surveil on attack. |
| 58 | [Type-2 Phaser](https://scryfall.com/search?q=%21%22Type-2+Phaser%22) | 2 | NEW | NO | NO | NO | It's +3/+0 for equip {3}. |
| 59 | [U.S.S. Cerritos, Following Up](https://scryfall.com/search?q=%21%22U.S.S.+Cerritos%2C+Following+Up%22) | 5 | NEW | NO | NO | NO | Five mana for two 1/1 Officers. |
| 60 | [U.S.S. Enterprise-D, Galaxy-Class](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-D%2C+Galaxy-Class%22) | 3 | NEW | NO | NO | NO | Its impulse card needs a station each turn, which taps a creature at sorcery speed. |
| 61 | [Warp Core](https://scryfall.com/search?q=%21%22Warp+Core%22) | 2 | NEW | NO | NO | NO | It finds a Mountain and charges Spacecraft, and this deck has neither need. |
| 62 | [Quark's Bar](https://scryfall.com/search?q=%21%22Quark's+Bar%22) | 0 | NEW | NO | NO | NO | It's a Mountain that enters tapped on turns 1 and 2, for one ping or one surveil later. |
| 63 | [Spatial Anomaly](https://scryfall.com/search?q=%21%22Spatial+Anomaly%22) | 0 | NEW | NO | NO | NO | It's a colourless land whose ability costs {4}{R} for 2 damage to a creature. |
| 64 | [Starfleet Academy](https://scryfall.com/search?q=%21%22Starfleet+Academy%22) | 0 | NEW | NO | NO | NO | It's a colourless land whose ability costs {5}. |
| 65 | [Unexplored Territory](https://scryfall.com/search?q=%21%22Unexplored+Territory%22) | 0 | NEW | NO | NO | NO | It's a slow colourless land that fetches a Mountain tapped. |
| 66 | [Mountain](https://scryfall.com/search?q=%21%22Mountain%22) | 0 | REPRINT | IN | IN | IN | Every list already runs it, so it's a printing choice. |
| 67 | [The Beacon of Kahless](https://scryfall.com/search?q=%21%22The+Beacon+of+Kahless%22) | 3 | NEW | NO | NO | NO | It's a three-mana rock, and battlefront counts opponents attacked, which is one for her. |
| 68 | [Ferocious Colonist](https://scryfall.com/search?q=%21%22Ferocious+Colonist%22) | 2 | NEW | NO | NO | NO | It's a combat body. |
| 69 | [Gagh Slinger](https://scryfall.com/search?q=%21%22Gagh+Slinger%22) | 3 | NEW | NO | NO | NO | It pings only when a Klingon or Warrior enters. Infantry Shield's Warriors are the only ones these lists make, and Impact Tremors already counts every creature. |
| 70 | [Galvanizing Tenor](https://scryfall.com/search?q=%21%22Galvanizing+Tenor%22) | 4 | NEW | NO | NO | NO | It goads on attack, which is a combat plan. |
| 71 | [Glory to the Empire!](https://scryfall.com/search?q=%21%22Glory+to+the+Empire%21%22) | 6 | NEW | NO | NO | NO | Six mana for three 2/1s and melee. |
| 72 | [Gnarling Targ](https://scryfall.com/search?q=%21%22Gnarling+Targ%22) | 5 | NEW | NO | NO | NO | It's a Klingon and Warrior anthem. |
| 73 | [Grilka, Widowed Warrior](https://scryfall.com/search?q=%21%22Grilka%2C+Widowed+Warrior%22) | 6 | NEW | NO | NO | NO | Six mana to steal one creature for a turn. |
| 74 | [Kang, Suspicious Captain](https://scryfall.com/search?q=%21%22Kang%2C+Suspicious+Captain%22) | 4 | NEW | NO | NO | NO | It goads itself, so it has to attack every combat. |
| 75 | [Koloth, Tribble Hunter](https://scryfall.com/search?q=%21%22Koloth%2C+Tribble+Hunter%22) | 4 | NEW | NO | NO | NO | It gives every opponent two tokens a turn as well. |
| 76 | [Own the Day](https://scryfall.com/search?q=%21%22Own+the+Day%22) | 6 | NEW | NO | NO | NO | It's an extra combat, and her damage comes mostly from spells. |
| 77 | [Qo'noS Quartermaster](https://scryfall.com/search?q=%21%22Qo'noS+Quartermaster%22) | 2 | NEW | NO | NO | NO | It makes mana only when it attacks. |
| 78 | [Ro Laren, Double Agent](https://scryfall.com/search?q=%21%22Ro+Laren%2C+Double+Agent%22) | 3 | NEW | NO | NO | NO | It deals 2 to each opponent once a turn on your second draw, while every converter already fires on every spell. |
| 79 | [Rom and Leeta, Unlikely Pair](https://scryfall.com/search?q=%21%22Rom+and+Leeta%2C+Unlikely+Pair%22) | 4 | NEW | NO | NO | NO | It makes two tapped Treasures a turn, and mana is not this deck's constraint. |
| 80 | [Class-4 Tactical Cube](https://scryfall.com/search?q=%21%22Class-4+Tactical+Cube%22) | 4 | NEW | NO | NO | NO | Four mana for two 1/1 Borg and an artifact anthem. |
| 81 | [Command Chair](https://scryfall.com/search?q=%21%22Command+Chair%22) | 6 | NEW | NO | NO | NO | It costs six, enters tapped, then makes four a turn. |
| 82 | [The Guardian of Forever](https://scryfall.com/search?q=%21%22The+Guardian+of+Forever%22) | 3 | NEW | NO | NO | NO | It costs {4} and a sacrifice for a creature that returns at the end step. |
| 83 | [I.K.S. Negh'Var, Imperial Flagship](https://scryfall.com/search?q=%21%22I.K.S.+Negh'Var%2C+Imperial+Flagship%22) | 3 | NEW | NO | NO | NO | It gives Warriors vigilance and needs 10 station counters to attack. |
| 84 | [Jefferies Tube](https://scryfall.com/search?q=%21%22Jefferies+Tube%22) | 1 | NEW | NO | NO | NO | Its draw costs {4} a card, the slowest draw in the pool, and she already flies. |
| 85 | [K't'inga-Class Battle Cruiser](https://scryfall.com/search?q=%21%22K't'inga-Class+Battle+Cruiser%22) | 3 | NEW | NO | NO | NO | It gives Klingons and Warriors flying. |
| 86 | [K'Vort-Class Raider](https://scryfall.com/search?q=%21%22K'Vort-Class+Raider%22) | 4 | NEW | NO | NO | NO | It gives hexproof only during your turn. Champion's Helm and Swiftfoot Boots give her hexproof on every turn, and Conqueror's Flail stops spells on yours. |
| 87 | [Planet Killer](https://scryfall.com/search?q=%21%22Planet+Killer%22) | 8 | NEW | NO | NO | NO | It costs eight mana. |
| 88 | [Queen's Diamond](https://scryfall.com/search?q=%21%22Queen's+Diamond%22) | 4 | NEW | NO | NO | NO | Its mana pays only for the commander. |
| 89 | [Reconnaissance Partition](https://scryfall.com/search?q=%21%22Reconnaissance+Partition%22) | 4 | NEW | NO | NO | NO | Four mana for two cards spread over two turns. |
| 90 | [S.S. Botany Bay](https://scryfall.com/search?q=%21%22S.S.+Botany+Bay%22) | 3 | NEW | NO | NO | NO | It's graveyard hate on a Spacecraft. |
| 91 | [Starfleet Communicator](https://scryfall.com/search?q=%21%22Starfleet+Communicator%22) | 3 | NEW | NO | NO | NO | It draws only when two Communicator holders attack, and she attacks alone. |
| 92 | [Starship Enterprise](https://scryfall.com/search?q=%21%22Starship+Enterprise%22) | 5 | NEW | NO | NO | NO | It stations from land drops. |
| 93 | [The Sword of Kahless](https://scryfall.com/search?q=%21%22The+Sword+of+Kahless%22) | 4 | NEW | NO | NO | NO | It finds Klingons and Warriors, which these lists don't run. |
| 94 | [U.S.S. Defiant, Mirror Migrant](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Mirror+Migrant%22) | 2 | NEW | MAIN | NO | SIDE | For {2} at instant speed it phases her out with her Equipment and counters, which beats edicts, exile wraths and bounce, the protection row nothing covered. In main it displaces Blackblade Reforged (swap 1). In b3-tokens it goes on the bench over Champion's Helm. b4 dropped wrath insurance on purpose, because its loops rebuild her counters in a turn. |
| 95 | [U.S.S. Defiant, Tough Little Ship](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Tough+Little+Ship%22) | 6 | NEW | NO | NO | NO | Six mana for one artifact or enchantment removal. |
| 96 | [U.S.S. Enterprise-C, Time-Tossed](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-C%2C+Time-Tossed%22) | 5 | NEW | NO | NO | NO | Five mana to wheel your own hand. |
| 97 | [U.S.S. Farragut, Bold Explorer](https://scryfall.com/search?q=%21%22U.S.S.+Farragut%2C+Bold+Explorer%22) | 6 | NEW | NO | NO | NO | Six mana for a landfall creature cheat. |
| 98 | [U.S.S. Prometheus, Prototype](https://scryfall.com/search?q=%21%22U.S.S.+Prometheus%2C+Prototype%22) | 5 | NEW | NO | NO | NO | It's Kediss's effect on a five-mana Spacecraft that needs 8 station counters. |
| 99 | [U.S.S. Stargazer, Here and There](https://scryfall.com/search?q=%21%22U.S.S.+Stargazer%2C+Here+and+There%22) | 3 | NEW | NO | NO | NO | It needs 6 station counters to attack, for a temporary 4/3. |
| 100 | [Defense Force Aggressor](https://scryfall.com/search?q=%21%22Defense+Force+Aggressor%22) | 1 | NEW | NO | NO | NO | It's a vanilla 2/1. |
| 101 | [Direct Hit](https://scryfall.com/search?q=%21%22Direct+Hit%22) | 3 | NEW | NO | NO | NO | It's sorcery-speed creature removal. |
| 102 | [Gin'tak Charge](https://scryfall.com/search?q=%21%22Gin'tak+Charge%22) | 1 | NEW | NO | NO | NO | It's free with her out, but it doesn't replace itself, and Lightning Bolt is the instant at 3 damage. |
| 103 | [Kruge, Genesis Seeker](https://scryfall.com/search?q=%21%22Kruge%2C+Genesis+Seeker%22) | 3 | NEW | NO | NO | NO | It's a Klingon anthem. |
| 104 | [Mek'leth Berserker](https://scryfall.com/search?q=%21%22Mek'leth+Berserker%22) | 4 | NEW | NO | NO | NO | It's a 4/3 with menace. |
| 105 | [Warship Flight Crew](https://scryfall.com/search?q=%21%22Warship+Flight+Crew%22) | 2 | NEW | NO | NO | NO | It's a vanilla 2/2. |
| 106 | [Disruptor Pistol](https://scryfall.com/search?q=%21%22Disruptor+Pistol%22) | 2 | NEW | NO | NO | NO | It costs six in all for 5 damage to a creature. |
| 107 | [Kirk, Enterprising Captain](https://scryfall.com/search?q=%21%22Kirk%2C+Enterprising+Captain%22) | 4 | NEW | NO | NO | NO | Its impulse card needs an attack with 8 total power, on a four-mana body. |
| 108 | [Klingon Strike Force](https://scryfall.com/search?q=%21%22Klingon+Strike+Force%22) | 5 | NEW | NO | NO | NO | It's a five-mana 5/5 haste. |
| 109 | [Abrade](https://scryfall.com/search?q=%21%22Abrade%22) | 2 | REPRINT | NO | NO | NO | It was cut on 2026-09-04 as the narrowest removal spell. Lightning Bolt still covers the creature mode and Fiery Confluence the artifact mode. |
| 110 | [Chain Reaction](https://scryfall.com/search?q=%21%22Chain+Reaction%22) | 4 | REPRINT | NO | NO | NO | It kills our own pingers and tokens, and Blasphemous Act already holds the catch-up sweeper row on the bench. |
| 111 | [Combat Celebrant](https://scryfall.com/search?q=%21%22Combat+Celebrant%22) | 3 | REPRINT | NO | NO | NO | It's an extra combat on a 4/1. |
| 112 | [Disrupt Decorum](https://scryfall.com/search?q=%21%22Disrupt+Decorum%22) | 4 | REPRINT | NO | NO | NO | Four mana for one round of goad. |
| 113 | [Professional Face-Breaker](https://scryfall.com/search?q=%21%22Professional+Face-Breaker%22) | 3 | REPRINT | NO | NO | NO | Its draw needs Treasures from Storm-Kiln Artist, Big Score or her combat hit, while Reckless Impulse draws unconditionally. |
| 114 | [Shared Animosity](https://scryfall.com/search?q=%21%22Shared+Animosity%22) | 3 | REPRINT | NO | NO | NO | It rewards attackers that share a type. |
| 115 | [Thrill of Possibility](https://scryfall.com/search?q=%21%22Thrill+of+Possibility%22) | 2 | REPRINT | NO | IN | NO | It's card-neutral, and Reckless Impulse is card-positive at the same cost. b4 (and spellslinger) already run it. |
| 116 | [World at War](https://scryfall.com/search?q=%21%22World+at+War%22) | 5 | REPRINT | NO | NO | NO | It's two extra combats, and her damage comes mostly from spells. |
| 117 | [Alhammarret's Archive](https://scryfall.com/search?q=%21%22Alhammarret's+Archive%22) | 5 | REPRINT | SIDE | NO | NO | Every draw outside your draw step becomes two, so each cantrip draws two and Artist's Talent nets a card per noncreature spell. In main it goes on the bench over Wanda's Vision. b4 can't spend five mana on a turbo curve. b3-tokens gets Skullclamp as its draw engine at one mana. |
| 118 | [Arcane Signet](https://scryfall.com/search?q=%21%22Arcane+Signet%22) | 2 | REPRINT | IN | NO | IN | main and b3-tokens already run it. b4 cut it for Mana Vault on 2026-10-14 as the slowest mana piece, and those grounds hold. |
| 119 | [Astral Cornucopia](https://scryfall.com/search?q=%21%22Astral+Cornucopia%22) | 0 | REPRINT | NO | NO | NO | It costs {3} for one mana a turn, and at X = 0 it's a free spell with nothing after it. |
| 120 | [Commander's Sphere](https://scryfall.com/search?q=%21%22Commander's+Sphere%22) | 3 | REPRINT | NO | NO | NO | It's a three-mana rock. |
| 121 | [Darksteel Plate](https://scryfall.com/search?q=%21%22Darksteel+Plate%22) | 3 | REPRINT | NO | NO | NO | It gives indestructible at sorcery speed, and Mithril Coat already gives it with flash and attaches itself. b4 dropped indestructible on purpose. |
| 122 | [Door of Destinies](https://scryfall.com/search?q=%21%22Door+of+Destinies%22) | 4 | REPRINT | NO | NO | NO | It counts creature spells of one type, and she and Iron Man are the only Hero spells. |
| 123 | [Everflowing Chalice](https://scryfall.com/search?q=%21%22Everflowing+Chalice%22) | 0 | REPRINT | NO | NO | NO | Two mana for one colourless, and at 0 it's a free spell with nothing after it. |
| 124 | [Forsaken Monument](https://scryfall.com/search?q=%21%22Forsaken+Monument%22) | 5 | REPRINT | NO | NO | NO | It rewards colourless creatures and spells, and she's red. |
| 125 | [Hedron Archive](https://scryfall.com/search?q=%21%22Hedron+Archive%22) | 4 | REPRINT | NO | NO | NO | It's a four-mana rock. |
| 126 | [Herald's Horn](https://scryfall.com/search?q=%21%22Herald's+Horn%22) | 3 | REPRINT | NO | NO | NO | Few of these creatures share a type. |
| 127 | [Howling Mine](https://scryfall.com/search?q=%21%22Howling+Mine%22) | 2 | REPRINT | NO | NO | NO | It gives three opponents a card each too. |
| 128 | [The Immortal Sun](https://scryfall.com/search?q=%21%22The+Immortal+Sun%22) | 6 | REPRINT | NO | NO | NO | Six mana, and its reduction is generic only, which Ruby Medallion and The Fire Crystal already cover. |
| 129 | [Lightning Greaves](https://scryfall.com/search?q=%21%22Lightning+Greaves%22) | 2 | REPRINT | NO | NO | NO | This is a trap. Shroud blanks every pump, cantrip and equip aimed at her, the text it was rejected on 2026-09-03. |
| 130 | [Mind Stone](https://scryfall.com/search?q=%21%22Mind+Stone%22) | 2 | REPRINT | NO | NO | NO | It's a colourless rock in a deck whose rocks are full. |
| 131 | [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) | 1 | REPRINT | NO | NO | MAIN | Equip {1} on a 1/1 token draws two. b3-tokens makes tokens off every spell, so it displaces Kediss there (swap 4, draw 6 to 7). main's only repeating token maker is Iron Man, and b4's tokens are the Dualcaster Mage kill. |
| 132 | [Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22) | 1 | REPRINT | IN | IN | IN | Every list already runs it. |
| 133 | [Stonespeaker Crystal](https://scryfall.com/search?q=%21%22Stonespeaker+Crystal%22) | 4 | REPRINT | NO | NO | NO | It's a four-mana rock. |
| 134 | [Swiftfoot Boots](https://scryfall.com/search?q=%21%22Swiftfoot+Boots%22) | 2 | REPRINT | IN | IN | IN | Every list already runs it. |
| 135 | [Sword of Light and Shadow](https://scryfall.com/search?q=%21%22Sword+of+Light+and+Shadow%22) | 3 | REPRINT | NO | NO | NO | Protection from white and black is half of what Commander's Plate already gives. |
| 136 | [Thought Vessel](https://scryfall.com/search?q=%21%22Thought+Vessel%22) | 2 | REPRINT | NO | NO | NO | It's a colourless rock in a deck whose rocks are full. |
| 137 | [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) | 4 | REPRINT | NO | NO | NO | Four mana to untap about five rocks on opponents' turns. |
| 138 | [Wayfarer's Bauble](https://scryfall.com/search?q=%21%22Wayfarer's+Bauble%22) | 1 | REPRINT | NO | NO | NO | It costs {3} in all to put a Mountain into play tapped. |
| 139 | [Command Beacon](https://scryfall.com/search?q=%21%22Command+Beacon%22) | 0 | REPRINT | IN | IN | IN | Every list already runs it. |
| 140 | [Command Tower](https://scryfall.com/search?q=%21%22Command+Tower%22) | 0 | REPRINT | NO | NO | NO | It taps for {R} like a Mountain, but it isn't a basic Mountain for Fire Nation Palace and Arena of Glory. |
| 141 | [Evolving Wilds](https://scryfall.com/search?q=%21%22Evolving+Wilds%22) | 0 | REPRINT | NO | NO | NO | It's a Mountain that enters tapped. |
| 142 | [Exotic Orchard](https://scryfall.com/search?q=%21%22Exotic+Orchard%22) | 0 | REPRINT | NO | NO | NO | It may not make {R}. |
| 143 | [Fabled Passage](https://scryfall.com/search?q=%21%22Fabled+Passage%22) | 0 | REPRINT | NO | NO | NO | It's a Mountain that can enter tapped. |
| 144 | [Mutavault](https://scryfall.com/search?q=%21%22Mutavault%22) | 0 | REPRINT | NO | NO | NO | It's a colourless land that becomes a 2/2. |
| 145 | [Path of Ancestry](https://scryfall.com/search?q=%21%22Path+of+Ancestry%22) | 0 | REPRINT | NO | NO | NO | It enters tapped. |
| 146 | [Reliquary Tower](https://scryfall.com/search?q=%21%22Reliquary+Tower%22) | 0 | REPRINT | NO | NO | NO | It's a colourless land, and hand size rarely binds here. |
| 147 | [Rogue's Passage](https://scryfall.com/search?q=%21%22Rogue's+Passage%22) | 0 | REPRINT | IN | NO | IN | main and b3-tokens already run it. b4 cut it for Lotus Petal on 2026-10-14 because she flies, and those grounds hold. |
| 148 | [Spire of Industry](https://scryfall.com/search?q=%21%22Spire+of+Industry%22) | 0 | REPRINT | NO | NO | NO | Its coloured mode is for multicolour decks. |
| 149 | [Temple of the False God](https://scryfall.com/search?q=%21%22Temple+of+the+False+God%22) | 0 | REPRINT | NO | NO | NO | It's colourless and needs five lands before it taps. |
| 150 | [Terramorphic Expanse](https://scryfall.com/search?q=%21%22Terramorphic+Expanse%22) | 0 | REPRINT | NO | NO | NO | It's a Mountain that enters tapped. |
| 151 | [Run Amok](https://scryfall.com/search?q=%21%22Run+Amok%22) | 2 | REPRINT | NO | NO | NO | It's a combat pump on an attacker. |

## Proposed swaps

Five proposals, three for `main` and two for `b3-tokens`. Each is its own decision, and none depends
on another being taken.

### 1. U.S.S. Defiant, Mirror Migrant in, Blackblade Reforged out (`main`)

**In:** [U.S.S. Defiant, Mirror Migrant](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Mirror+Migrant%22), {2}, *Legendary Artifact — Spacecraft*, 5/5, new.
*"Flash. When U.S.S. Defiant enters, it and up to one target creature you control phase out. (Treat
them and anything attached to them as though they don't exist until your next turn.) Station. 8+ |
Flying"*

**Out:** [Blackblade Reforged](https://scryfall.com/search?q=%21%22Blackblade+Reforged%22), {2}, *Legendary Artifact — Equipment*. *"Equipped creature gets
+1/+1 for each land you control. Equip legendary creature {3}. Equip {7}"*

**Cost in this deck's mana.** It's colourless, so Ruby Medallion and The Fire Crystal don't reduce it,
but Artist's Talent level 2 and Longshot do: {2}, {1} or {0}. Cast with her out, her trigger resolves
before Defiant does, so she banks {R} and a counter before she phases out.

**Deciding axis: protection coverage.** The founding protection matrix (2026-09-03) left one row empty:
*"Non-targeting non-destroy (edicts, Farewell, Cyclonic Rift overload, −X/−X) | nothing on-body"*,
with the recast and The Ozolith as the only answer. Defiant fills that row at instant speed. The
pilot's brief was *"it always has to be protected, bonus points if they can't target it or stop it"*,
and `_notes.md` records that they want cheap artifact protection.

| Threat row | Covered today | With Defiant |
|---|---|---|
| Targeted spell | Champion's Helm, Swiftfoot Boots, Commander's Plate (W/U/B/G), Deflecting Swat | Defiant too, in response |
| Targeted ability | Helm, Boots, Swat | Defiant too |
| Damage wipe | Mithril Coat, Tyrite Sanctum, Plate against coloured non-red damage | Defiant too |
| Destroy wipe | Mithril Coat, Tyrite Sanctum | Defiant too |
| Edicts, exile wraths, bounce, −X/−X | nothing on her body, only the recast with The Ozolith | **Defiant** |
| Counterspells on the storm turn | Hexing Squelcher, Cavern of Souls, Conqueror's Flail | unchanged |

**Rules (CR 702.26, read directly).** A phased-out permanent is treated as though it doesn't exist
(702.26b), so an edict can't pick her, a wrath or Farewell doesn't see her, and a spell targeting her
has an illegal target and does nothing (CR 608.2b). Her Equipment phases out with her and back in
attached (702.26g). Her counters stay, and phasing isn't a zone change, so The Ozolith and the
command-zone rule never come into it (702.26d). She phases in during your next untap step (702.26a),
and because phasing doesn't change control she can attack that turn (702.26d, CR 302.6). Defiant
targets her, which her hexproof allows, and Commander's Plate doesn't stop it because Defiant is
colourless.

**Score each ability (eval-021).** The enter trigger is the card. Flash makes it an answer. The station
half is a 5/5 flier once it has 8 counters, which she can put on in one tap at sorcery speed, at the
cost of her attack that turn.

**Costs, named.**

- On your own turn, phasing her out loses her for the rest of that turn and every opponent's turn
  until your untap step. Hold it for opponents' turns, where Conqueror's Flail doesn't reach. Flail and
  Hexing Squelcher already cover your turn against spells.
- It's one save. After that it's a Spacecraft.
- The phasing is a triggered ability, so Hexing Squelcher doesn't stop an ability counter, and split
  second beats it. While she's phased out you don't control a commander, so Deflecting Swat isn't free.

**Why Blackblade Reforged.** Growth & Voltron is at 5 against a target of 4 (2026-10-10). Ranked
against the current list:

| Card | What it adds to her | Cost to deploy | Rider |
|---|---|---|---|
| Embercleave | double strike, trample, +1/+1 | {4}{R}{R}, {1} less per attacker, flash | the combat kill |
| Bulk Up | doubles her power | {1}{R} instant, flashback | fires all eight converters, twice |
| Roaming Throne | her trigger twice: {R}{R} and two counters per spell | {4}, no reducer applies | doubles Iron Man's Robots too |
| Shadowspear | +1/+1, trample, lifelink | {1} plus equip {2} | the lifelink constraint, and strips hexproof and indestructible |
| **Blackblade Reforged** | +1/+1 per land, about +6 to +8 by midgame | {2} plus equip {3}, sorcery speed | none |

Blackblade is the only card in the role that adds nothing beyond power, and her trigger already adds a
counter per spell. Its records: the founding build filed it under Growth (12% on Tony Stark's page).
On 2026-10-10 it was my nominee for the Powerbalance slot on these same grounds, and the pilot cut
Cosmic Cube instead. `spellslinger` cut it on 2026-09-07, and `b4` and `b3-tokens` cut it in their
wave 2 on 2026-10-14, so `main` is the last list running it. What's lost is the 2026-10-10 "against"
line: about +6 power for Soul's Fire, Origin of Thor's chapter III and Chandra's Ignition, so about 6
to each opponent per Ignition, or 18 under Fiery Emancipation.

**Cut check (eval-011).** Nothing in `main` reads Blackblade. Storm-Kiln Artist counts artifacts, and
Defiant is an artifact too, so that count holds.

**Other cuts considered.**

- Leyline Tyrant: Mana Banking is at 4, but banking is the founding brief (*"bank mana and make it
  unstoppable"*), so its third permanent banker stays (§2.5).
- Loki Laufeyson: Copy & Recursion is at 4 against 2, but the pilot picked Loki on 2026-09-04, asked to
  keep it in `b3-tokens` on 2026-10-14, and it starts the loop-017 line.
- Swiftfoot Boots or Champion's Helm: protection for protection leaves the role at 8 and her with one
  hexproof source.
- Forge of Heroes: swap 2 takes it.

**Effect:** average MV 2.81 to 2.81, MV ≤ 2 stays at 33, MV ≤ 3 stays at 49. Protection 8 to 9,
Growth & Voltron 5 to 4.

### 2. Reckless Impulse in, Forge of Heroes out (`main`)

**In:** [Reckless Impulse](https://scryfall.com/search?q=%21%22Reckless+Impulse%22), {1}{R}, *Sorcery*, reprint. *"Exile the top two cards of your library.
Until the end of your next turn, you may play those cards."*

**Out:** [Forge of Heroes](https://scryfall.com/search?q=%21%22Forge+of+Heroes%22), *Land*. *"{T}: Add {C}. {T}: Choose target commander that entered this
turn. Put a +1/+1 counter on it if it's a creature and a loyalty counter on it if it's a
planeswalker."*

**Cost in this deck's mana.** Any one of the four reducers makes it {R}, and her refund makes that
free. With no reducer out it nets {1}. As a sorcery it fires all eight converters, plus Electro, Birgi,
Urabrask, Storm-Kiln Artist and Ashling.

**Deciding axis: cards.** `main`'s Card Draw section holds 7 (Artist's Talent, Big Score, Faithless
Looting, Hex Magic, Laughing Mad, The One Ring, Wheel of Fortune), under the pilot's 8 to 10 aim. The
first play report said the deck *"struggles with draw sometimes"*, and the gameplan names cards in
hand as its binding constraint. The Laughing Mad swap on 2026-11-10 moved draw from 6 to 7, and this
takes it to 8. Reckless Impulse is card-positive (it costs one card and gives two), where Thrill of
Possibility and Test of Identity are card-neutral. It's played in 35% of her decks in the 2026-09-03
pull and 45% of the storm view. That is a fact about the field, not the reason.

"Play" covers lands (ledger zone-018), so a land among the two cards can use the turn's land drop,
which softens the land cut below.

**Why Forge of Heroes.** The candidates are the utility lands, because every land that taps for {R}
also banks:

| Land | Job | Taps for |
|---|---|---|
| Ancient Tomb | two mana at once (Game Changer) | {C}{C} |
| Cavern of Souls | uncounterable recast of her | {C}, or any colour for a Hero |
| Command Beacon | resets her tax | {C} |
| Tyrite Sanctum | a counter each turn, then an indestructible counter (the constraint) | {C} |
| Rogue's Passage | unblockable against a wall of fliers or reach | {C} |
| **Forge of Heroes** | one counter the turn she enters | {C} |

Forge's counter arrives once per cast of her, and her own trigger gives one per spell. Its records:
`spellslinger` cut it on 2026-09-07, `b4` cut it on 2026-10-14 (*"the loops make unbounded
counters"*) and `b3-tokens` cut it the same day (*"main runs 32 lands"*). `main` is the last list
running it.

**Cost.** Lands go 32 to 31, the count `b3-tokens` runs. Red sources stay at 26 and colourless lands
go 6 to 5. The expected number of lands in your first 11 cards drops from 3.56 to 3.44. She loses one
counter the turn she lands. If swap 1 isn't taken, Blackblade Reforged loses one power too (eval-013).

**Other cuts considered.**

- Faithless Looting: draw for draw, which the pilot read as cutting draw on 2026-11-10, and it's
  one-mana cantrip fuel.
- Any cantrip or ritual: protected in a spellslinger build.
- Kediss, Emberclaw Familiar: one of six finishers, and finishers were the other half of the play
  report.
- Rogue's Passage: the only unblockable against a flying wall. `b4` already cut it for speed.
- Tyrite Sanctum: her second indestructible route, which is a constraint.

**Effect:** average MV 2.81 to 2.80, MV ≤ 2 goes 33 to 34, MV ≤ 3 goes 49 to 50, because a land
becomes a spell. Card Draw 7 to 8.

### 3. Tal Shiar Analyst in, Thermo-Alchemist out (`main`)

**In:** [Tal Shiar Analyst](https://scryfall.com/search?q=%21%22Tal+Shiar+Analyst%22), {2}{R}, *Creature — Romulan Scientist*, 3/2, new. *"{T}: This creature
deals 1 damage to each opponent. Whenever you cast a noncreature spell, untap this creature."*

**Out:** [Thermo-Alchemist](https://scryfall.com/search?q=%21%22Thermo-Alchemist%22), {1}{R}, *Creature — Human Shaman*, 0/3. *"Defender. {T}: This creature
deals 1 damage to each opponent. Whenever you cast an instant or sorcery spell, untap this creature."*

**Cost in this deck's mana.** It's a creature, so Ruby Medallion and The Fire Crystal reduce it to
{1}{R} with one out and {R} with both. Artist's Talent and Longshot don't. With her out, the refund
makes it net {1} or free. Thermo-Alchemist is {R} with one Medallion, so free.

**Deciding axis: trigger breadth.** It's the same engine, a free tap each turn cycle plus one untap per
qualifying spell. Thermo-Alchemist untaps on 28 of `main`'s 70 nonland cards. Analyst untaps on 50,
adding the 22 artifacts and enchantments the list casts: the five rocks, the five protection
Equipment and The Ozolith, Blackblade or Defiant, Embercleave, Shadowspear, The One Ring, Artist's
Talent, Fiery Inscription, Arcane Bombardment, Fiery Emancipation, Powerbalance, Wanda's Vision and
Origin of Thor. On opponents' turns it also untaps off Mithril Coat's and Defiant's flash. The founding
build chose Thermo-Alchemist over Electrostatic Field because it *"also taps for a free ping each turn
and its untap trigger scales with spell count exactly like the commander does."* Analyst keeps both
reasons, and her trigger counts every spell, so Analyst scales closer to her.

| Converter | Trigger | To each opponent per spell | Body | Works the turn it lands |
|---|---|---|---|---|
| Longshot, Rebel Bowman | noncreature | 2 | 3/3 | yes, and it's a reducer |
| Guttersnipe | instant or sorcery | 2 | 2/2 | yes |
| Fiery Inscription | instant or sorcery | 2 | enchantment | yes |
| Coruscation Mage | noncreature | 1, or 2 with offspring | 2/2 | yes |
| Kessig Flamebreather | noncreature | 1 | 1/3 | yes |
| Firebrand Archer | noncreature | 1 | 2/1 | yes |
| **Tal Shiar Analyst** | noncreature, by untapping | 1, plus a free tap each turn cycle | 3/2 | needs haste or a turn |
| **Thermo-Alchemist** | instant or sorcery, by untapping | 1, plus a free tap each turn cycle | 0/3 defender | needs haste or a turn |
| Grapeshot | storm | 1 per copy, once | spell | yes |

Thermo-Alchemist is the only converter whose trigger set Analyst fully contains. Firebrand Archer and
Kessig Flamebreather work the turn they land, so against them Analyst gains only one ping a turn cycle
for one more mana. Haste comes from The Fire Crystal, Arena of Glory's mana, Crimson Wisps and
Impolite Entrance.

**Costs, named.** One more mana, so MV 2 becomes MV 3. The 3/2 dies to two of Fiery Confluence's
creature modes where the 0/3 needed three, and the gameplan already picks the other modes. Against a
Pyroclasm-heavy pod, Electrostatic Field on the bench is still the answer, and Analyst dies to that
sweep like Firebrand Archer does.

**Cut check.** Thermo-Alchemist's records: the founding pick above, and `b3-tokens` wave 1 cut it
because it *"ranks last of main's eight converters: instant and sorcery only, a 0/3 defender, and it
needs to tap."* Analyst fixes the first two of those three and keeps the third. Nothing in `main`
reads Thermo-Alchemist.

**Effect:** average MV 2.81 to 2.83, MV ≤ 2 goes 33 to 32, MV ≤ 3 stays at 49. Converters stay at 8.

### 4. Skullclamp in, Kediss, Emberclaw Familiar out (`b3-tokens`)

**In:** [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22), {1}, *Artifact — Equipment*, reprint. *"Equipped creature gets +1/-1. Whenever
equipped creature dies, draw two cards. Equip {1}"*

**Out:** [Kediss, Emberclaw Familiar](https://scryfall.com/search?q=%21%22Kediss%2C+Emberclaw+Familiar%22), {1}{R}, *Legendary Creature — Elemental Lizard*, 1/1.
*"Whenever a commander you control deals combat damage to an opponent, it deals that much damage to
each other opponent. Partner"*

**Cost in this deck's mana.** It's a colourless noncreature spell, so Artist's Talent level 2 or
Longshot makes it {0}, and with her out the cast still gives {R} and a counter. Equip {1} isn't
reduced.

**Deciding axis: cards.** `b3-tokens`' Card Draw holds 6 (Artist's Talent, Big Score, Faithless
Looting, Hex Magic, The One Ring, Wheel of Fortune), two under the pilot's aim. `main` took Laughing
Mad on 2026-11-10 and `b3-tokens` didn't. Every X/1 token in the list dies to Skullclamp, so each {1}
becomes two cards: Young Pyromancer's Elementals, Hordeling Outburst's and Empty the Warrens' Goblins,
Iron Man's 2/1 Robots, Sokenzan's Spirits, Lindblum's 0/1 Wizard, and swap 5's Officers. Infantry
Shield's Warriors are sacrificed at the end step anyway, so clamp one in the second main phase for two
cards. Stormsplitter's copies are 1/4 and don't die.

**Self-check (ledger equip-027).** An anthem or a +1/+1 counter switches Skullclamp off. `b3-tokens`'
pumps raise power only (Purphoros's {2}{R} ability and Iron Man's bonus to attackers), so nothing in
the list turns it off. Don't equip it to Young Pyromancer or Loki, which are 2/1s.

**Why Kediss.** Win Conditions sit at 7, one more than `main`. Ranked against the current list:

| Card | How it kills | What it needs |
|---|---|---|
| Chandra's Ignition | her power to each opponent | her, and it kills your own tokens, so it goes last |
| Origin of Thor | her power to each opponent at chapter III, and draws at chapter I | two turns |
| Soul's Fire | her power to any target | her |
| Crackle with Power | five times X to each of X targets | banked mana |
| Empty the Warrens | two Goblins per spell before it | Impact Tremors or Purphoros to turn them into damage |
| Iron Man, Tony Stark | a flying Robot per red spell | Tremors, Purphoros or combat |
| **Kediss, Emberclaw Familiar** | copies her combat damage to each other opponent | her connecting while two or more opponents are alive |

Kediss is the only finisher that works only in combat and only while two or more opponents are alive.
The `b3-tokens` brief (2026-10-14) is *"storm one or two players out, then finish the last with a
voltron swing"*, and on that last swing Kediss copies to nobody. The token engine (Impact Tremors,
Purphoros, Goblin Bombardment, Stormsplitter) gives this list finishers `main` doesn't have, so the
"enough finishers" half of `main`'s play report presses less here. Kediss's records: the founding
build filed it as a win condition, `b4` cut it for Dualcaster Mage as *"a voltron line"*, the
2026-10-10 cut table called it *"one of six finishers"* in `main`, and the 2026-11-10 entry left it in `main`
and `b3-tokens`. Nothing in the list reads Kediss.

**Other cuts considered.**

- Crash Through: a protected cantrip. The bench row for Reckless Impulse names it instead.
- Rogue's Passage: lands would go 31 to 30.
- Loki Laufeyson: the pilot asked to keep it in this list.
- Increasing Vengeance: its copies of Soul's Fire and Ignition are finisher damage.

**Effect:** average MV 2.73 to 2.72, MV ≤ 2 stays at 34, MV ≤ 3 stays at 51. Card Draw 6 to 7, Win
Conditions 7 to 6.

### 5. Academy Instructor in, Kessig Flamebreather out (`b3-tokens`)

**In:** [Academy Instructor](https://scryfall.com/search?q=%21%22Academy+Instructor%22), {2}{R}, *Creature — Bolian Officer*, 0/3, new. *"This creature gets
+1/+0 for each Officer token you control. Whenever you cast a noncreature spell, create a 1/1 red
Officer creature token."*

**Out:** [Kessig Flamebreather](https://scryfall.com/search?q=%21%22Kessig+Flamebreather%22), {1}{R}, *Creature — Human Shaman*, 1/3. *"Whenever you cast a
noncreature spell, this creature deals 1 damage to each opponent."*

**Cost in this deck's mana.** Ruby Medallion and The Fire Crystal reduce it to {1}{R} or {R}, and her
refund nets that to {1} or free. Kessig Flamebreather is free under one Medallion.

**Deciding axis: what one noncreature spell produces in a token list.** Both trigger on the same 52 of
`b3-tokens`' 71 nonland cards. Kessig deals 1 to each opponent. Instructor makes a 1/1 that Impact
Tremors turns into 1 to each opponent, Purphoros into 2 more, Goblin Bombardment into 1 to any target,
and Skullclamp (swap 4) into two cards, and with none of those out it stays as a blocker, which was
the pilot's 2026-09-04 worry. Under Fiery Emancipation, Kessig deals 3 a spell, and an Officer with
both enchantments out deals 9.

Young Pyromancer does the same job on instants and sorceries only (30 cards), so the two are
substitutes and both stay (§2.5). Prismari Pianist was passed on 2026-10-14 as *"Young Pyromancer's
job for three mana"*. Instructor also costs three, but its wider trigger is the extra Pianist didn't
have.

| Card | Trigger | What each spell produces |
|---|---|---|
| Longshot, Rebel Bowman | noncreature | 2 to each opponent, and it's a reducer |
| Guttersnipe | instant or sorcery | 2 to each opponent |
| Fiery Inscription | instant or sorcery | 2 to each opponent, and it survives creature wipes |
| Coruscation Mage | noncreature | 1 to each opponent, or 2 with offspring |
| **Kessig Flamebreather** | noncreature | 1 to each opponent |
| Young Pyromancer | instant or sorcery | a 1/1 |
| Stormsplitter | instant or sorcery | a copy of itself, so it doubles |
| **Academy Instructor** | noncreature | a 1/1, and it grows +1/+0 per Officer |

**Costs, named.** With none of Tremors, Purphoros, Bombardment or Skullclamp out it deals nothing, the
same cost the pilot accepted for Young Pyromancer. The Officers die to Chandra's Ignition and to Fiery
Confluence's creature mode, so cast those last. It costs one more mana.

**Cut check.** Kessig's records: a founding converter (32% of the field), kept over Firebrand Archer in
`b3-tokens` wave 3 as the 1/3 that *"does the same job"*. Nothing in the list reads it.

**Other cuts considered.** Coruscation Mage, because offspring doubles it. Fiery Inscription, the
converter that survives creature wipes. Young Pyromancer, the cheaper substitute.

**Effect:** average MV 2.73 to 2.75, MV ≤ 2 goes 34 to 33, MV ≤ 3 stays at 51. Converters 6 to 5,
Token Engine 6 to 7.

## Bench

### Lwaxana Troi, Charming Guest (`main` and `b3-tokens`): displaces Loki Laufeyson

**Oracle:** [Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22), {1}{R}, 2/2, new. *"You may choose not to untap Lwaxana
Troi during your untap step. {2}, {T}: Choose another target creature you control. For as long as
Lwaxana Troi remains tapped, if a triggered ability of that creature triggers, that ability triggers an
additional time."*

Pointed at her, every spell gives {R}{R} and two counters (CR 603.2d), so a one-mana spell nets {R}.
With Roaming Throne naming Hero it's three instances, because each such effect adds one (603.2d, and
ledger equip-018 measured Wizard's Staff with Throne at three). The extra instances are separate stack
objects (trig-014). Pointed at Guttersnipe or Longshot, each spell deals 4 to each opponent. At
Storm-Kiln Artist it's two Treasures, and in `b3-tokens` at Stormsplitter it's one spell further along
the doubling.

It costs {R} after a Medallion plus {2} that nothing reduces, and the tap needs a turn or haste. It's
a 2/2 with no protection, so a ping, Fiery Confluence's creature mode or Chandra's Ignition ends it. If
she dies and comes back she's a new object (CR 400.7), so Lwaxana has to untap in your untap step and
activate again.

**Why the bench and not MAIN.** It does Roaming Throne's job, in a role already over target, while
draw and protection were under target, and `main` had only Blackblade Reforged and Forge of Heroes as
cuts outside the pilot's protected cards. Loki is the like-for-like: both are two-mana legends whose
tap needs a turn or haste. Loki copies one instant or sorcery a turn, and the copy isn't cast, so her
trigger and the pingers miss it. Lwaxana makes every spell count twice for her. The pilot picked Loki
on 2026-09-04, asked to keep it in `b3-tokens`, and it starts the loop-017 line, so this is a bench
note only. In `b4` it's NO, because Ruby Medallion already makes the Grinning Ignus and Reiterate loops
mana-positive, and Swiftfoot Boots is `b4`'s only haste.

### Alhammarret's Archive (`main`): displaces Wanda's Vision

**Oracle:** [Alhammarret's Archive](https://scryfall.com/search?q=%21%22Alhammarret's+Archive%22), {5}, legendary artifact, reprint. *"If you would gain life, you
gain twice that much life instead. If you would draw a card except the first one you draw in each of
your draw steps, draw two cards instead."*

In `main` each of the five cantrips draws two, Artist's Talent's rummage nets a card per noncreature
spell, Ashling's magecraft loot nets one per instant or sorcery, Big Score and Laughing Mad draw four,
The One Ring doubles, and Shadowspear's lifelink doubles. It costs {3} under Artist's Talent and
Longshot. Wanda's Vision is the other five-mana card engine, and `main` is the last list running it
(`b4` and `b3-tokens` cut it). The Archive multiplies draw sources rather than being one, so it
doesn't raise the 8 to 10 count. It's first in if draw still runs short after Reckless Impulse. Five
for five leaves the curve unchanged.

### Tal Shiar Analyst (`b4`): displaces Thermo-Alchemist

It's the same trade as swap 3. `b4` casts 18 artifacts and enchantments, mostly zero-cost fast mana,
that Analyst sees and Thermo-Alchemist doesn't. But `b4`'s curve (average MV 2.26) was cut for a
turn-3 kill, and the Grinning Ignus loop is creature casts that neither card sees. Bench it.

### Reckless Impulse (`b3-tokens`): displaces Crash Through

`b3-tokens` holds 6 draw sources, or 7 with Skullclamp. The pilot made this exact trade in `main` on
2026-11-10 (Laughing Mad for [Crash Through](https://scryfall.com/search?q=%21%22Crash+Through%22), *"a cantrip whose rider (team trample) does least for a
flying commander"*), and team trample does little here too, because a chump blocker stops a 1/1 token
with or without it. Cantrips are protected fuel, so this stays on the bench. Crash Through is always
free, and Reckless Impulse is free only with a reducer out.

### U.S.S. Defiant, Mirror Migrant (`b3-tokens`): displaces Champion's Helm

`b3-tokens` runs `main`'s protection package unchanged and has no Blackblade Reforged to cut. Bring
Defiant in against pods heavy on edicts and exile wraths. Swiftfoot Boots still gives her hexproof, and
[Champion's Helm](https://scryfall.com/search?q=%21%22Champion's+Helm%22)'s +2/+2 is what goes.

## Near-misses and traps

**Near-misses**

- [Encounter the Unknown](https://scryfall.com/search?q=%21%22Encounter+the+Unknown%22) is Reckless Impulse at instant speed for one more pip, and the instant
  fires Arcane Bombardment on an opponent's turn. Its other mode deals 2 to each creature and each
  player, which kills our own 2-toughness pingers and tokens and hits us for 2, or 6 under Fiery
  Emancipation. It's the second choice for swap 2.
- [Professional Face-Breaker](https://scryfall.com/search?q=%21%22Professional+Face-Breaker%22) turns Storm-Kiln Artist's Treasures into impulse cards on the storm
  turn, and her combat hit makes one Treasure a turn. The draw depends on Treasures, where Reckless
  Impulse doesn't.
- [K'Vort-Class Raider](https://scryfall.com/search?q=%21%22K'Vort-Class+Raider%22) gives her and every creature hexproof during your turn for {4}. Conqueror's
  Flail and the two hexproof Equipment already cover that turn.
- [Jefferies Tube](https://scryfall.com/search?q=%21%22Jefferies+Tube%22) is a {1} artifact, so a free spell with her out, that later draws for {4} a card.
  That's too slow next to Reckless Impulse's free two.
- [Thrill of Possibility](https://scryfall.com/search?q=%21%22Thrill+of+Possibility%22) and [Test of Identity](https://scryfall.com/search?q=%21%22Test+of+Identity%22) are card-neutral rummages. Reckless Impulse is
  card-positive at the same cost.
- [Boarding Action](https://scryfall.com/search?q=%21%22Boarding+Action%22) in `b3-tokens` is two casts and two hasty 2/1s, and beam me up can return a token.
  Hordeling Outburst holds the slot.
- [Gagh Slinger](https://scryfall.com/search?q=%21%22Gagh+Slinger%22) in `b3-tokens` pings for Infantry Shield's Warriors, but only Warriors, where Impact
  Tremors counts every creature.

**Traps**

- [Quark, Humble Proprietor](https://scryfall.com/search?q=%21%22Quark%2C+Humble+Proprietor%22) reads like free Treasures, but *"You can't sacrifice Treasure tokens"*
  switches off Storm-Kiln Artist's, Big Score's and Urabrask's saga Treasures as mana, and in `b4` the
  Storm-Kiln Artist and Haze of Rage loop.
- [Lightning Greaves](https://scryfall.com/search?q=%21%22Lightning+Greaves%22) grants shroud, which blanks every pump, cantrip and equip aimed at her (rejected 2026-09-03
  on the same text).
- [Darksteel Plate](https://scryfall.com/search?q=%21%22Darksteel+Plate%22) reads like the indestructible answer, but Mithril Coat already gives it with flash
  and attaches itself.
- [The Immortal Sun](https://scryfall.com/search?q=%21%22The+Immortal+Sun%22) reduces every spell by one generic mana, which does nothing for her {R} spells,
  and Ruby Medallion and The Fire Crystal already reduce the rest.
- [Crystalline Entity](https://scryfall.com/search?q=%21%22Crystalline+Entity%22) spares her and Iron Man because they're artifact creatures, but every pinger
  dies, and it costs eight.
- [Chain Reaction](https://scryfall.com/search?q=%21%22Chain+Reaction%22) deals damage equal to the creature count to each creature, so it kills our own
  pingers and tokens first.

**Cute lines, recorded**

- [Infinite Diversity](https://scryfall.com/search?q=%21%22Infinite+Diversity%22) with her, Guttersnipe and Storm-Kiln Artist out counts five creature types
  (Mutant, Hero, Goblin, Shaman, Dwarf). Exiling Chandra's Ignition casts five copies, and her five cast
  triggers go on the stack above them, so she has five more counters before the first copy resolves. It
  costs {3}{R}{R} under all four reducers.
- [Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22) with Roaming Throne makes each spell give her {R}{R}{R} and three
  counters.
- [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) with [Academy Instructor](https://scryfall.com/search?q=%21%22Academy+Instructor%22) in `b3-tokens` makes each noncreature spell a 1/1 that
  Skullclamp turns into two cards for {1}.
