# TRK + TRC (Star Trek and Star Trek Commander) set review: Edgar Markov, 2026-11-10

**Sets.** Star Trek (TRK, 311 cards) and Star Trek Commander (TRC, 336 cards). Both release on
2026-11-13, three days after this review. Scryfall already lists every card in both as
Commander-legal, so no card here waits on legality.

**Lists.** `b4` is the target: the no-holds-barred Bracket 4 list founded 2026-11-03, where every
infinite is allowed (the lifegain pairs and both Oathsworn loops named in `decks/_notes.md`).
`combat` and `sacrifice` are the two Bracket 3 lists and get a verdict each. `main` is abandoned and
has no column.

**Method.** deck-brain SKILL.md §1 and §2, run as `.claude/skills/set-review/reviewer.md` sets out.
Every set card was read from its oracle text in `data/trk-candidates-edgar-markov.json` and
`data/trc-candidates-edgar-markov.json`. Deck cards were read from the oracle dumps of all three
lists. Rules come from `rules/sections/` (CR 2026-08-07), and the ledger was searched with
`bun run lookup`. Each card was:

- costed in each list's mana (§1.2). [Urza's Incubator](https://scryfall.com/search?q=%21%22Urza's+Incubator%22) and [Herald's Horn](https://scryfall.com/search?q=%21%22Herald's+Horn%22) (combat,
  sacrifice) discount only Vampire creature spells, so the only set card they touch is
  [Salt Vampire](https://scryfall.com/search?q=%21%22Salt+Vampire%22).
- checked against each list's board (§1.3). [Olivia's Wrath](https://scryfall.com/search?q=%21%22Olivia's+Wrath%22) shrinks every non-Vampire we
  control, [Anowon, the Ruin Sage](https://scryfall.com/search?q=%21%22Anowon%2C+the+Ruin+Sage%22)'s upkeep edict (sacrifice) takes one of our non-Vampires, and
  anthems push eminence tokens past [Welcoming Vampire](https://scryfall.com/search?q=%21%22Welcoming+Vampire%22)'s "power 2 or less" window (b4,
  sacrifice).
- scored one ability at a time (ledger eval-021).
- searched by rules text as well as by name in `decisions.md` and `sideboard.md` (tool-017). Two
  echoes turned up. [Vengeance Mission](https://scryfall.com/search?q=%21%22Vengeance+Mission%22) reads like [Bastion of Remembrance](https://scryfall.com/search?q=%21%22Bastion+of+Remembrance%22), cut from
  sacrifice on 2026-09-03, and [Own the Day](https://scryfall.com/search?q=%21%22Own+the+Day%22)'s extra combat matches [All-Out Assault](https://scryfall.com/search?q=%21%22All-Out+Assault%22)'s, passed
  in August as "finisher, win-more". Both verdicts below start from those grounds.
- read as new when it's a reprint (tool-007). That's 99 of the 373.
- for each MAIN, matched against the cut's oracle text for the incoming card's trigger words, with
  the cut searched in the deck's records first (eval-011, tool-019).

**What the rules and data don't cover.** CR 2026-08-07 predates TRK, so battlefront, seek out,
assimilate, beam me up, dilemma, Federation and strange new worlds are read from their reminder text
and oracle wording. Station (CR 702.184, 721), squad (702.157) and melee (702.121) are in it. The
pool files carry no power or toughness, so this review makes no claim about a set card's size.

**EDHREC.** There's no data for TRK or TRC yet, so the field lens is skipped (§2.2).

**Game Changers.** The pool has none. The counts stay at `b4` 14, `combat` 3 and `sacrifice` 3
before and after every proposal here.

**Draw counts used below** (the pilot's 8 to 10 aim, Clue makers excluded). `b4` has 8:
[Black Market Connections](https://scryfall.com/search?q=%21%22Black+Market+Connections%22), [Bolas's Citadel](https://scryfall.com/search?q=%21%22Bolas's+Citadel%22), [Esper Sentinel](https://scryfall.com/search?q=%21%22Esper+Sentinel%22), [Necropotence](https://scryfall.com/search?q=%21%22Necropotence%22),
[Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22), [The One Ring](https://scryfall.com/search?q=%21%22The+One+Ring%22), [Twilight Prophet](https://scryfall.com/search?q=%21%22Twilight+Prophet%22) and Welcoming Vampire, with
[Emeritus of Woe](https://scryfall.com/search?q=%21%22Emeritus+of+Woe%22) as a repeatable tutor. `combat` has 9: Black Market Connections,
[Deadly Dispute](https://scryfall.com/search?q=%21%22Deadly+Dispute%22), [Dusk Legion Duelist](https://scryfall.com/search?q=%21%22Dusk+Legion+Duelist%22), [Florian, Voldaren Scion](https://scryfall.com/search?q=%21%22Florian%2C+Voldaren+Scion%22), [Phyrexian Arena](https://scryfall.com/search?q=%21%22Phyrexian+Arena%22),
[Scheming Silvertongue](https://scryfall.com/search?q=%21%22Scheming+Silvertongue%22), [Vanquisher's Banner](https://scryfall.com/search?q=%21%22Vanquisher's+Banner%22), [Crossway Troublemakers](https://scryfall.com/search?q=%21%22Crossway+Troublemakers%22) and
[Clavileño, First of the Blessed](https://scryfall.com/search?q=%21%22Clavile%C3%B1o%2C+First+of+the+Blessed%22). `sacrifice` has 11: Black Market Connections, Crossway
Troublemakers, Deadly Dispute, [Dusk Legion Zealot](https://scryfall.com/search?q=%21%22Dusk+Legion+Zealot%22), Phyrexian Arena, Skullclamp, Twilight
Prophet, [Village Rites](https://scryfall.com/search?q=%21%22Village+Rites%22), Welcoming Vampire, [Bloodline Recollector](https://scryfall.com/search?q=%21%22Bloodline+Recollector%22) and Clavileño.

**Banned cards.** [Sprout Swarm](https://scryfall.com/search?q=%21%22Sprout+Swarm%22) isn't in the pool, and nothing here proposes it.

## Pool

373 unique cards fit Mardu identity and are Commander-legal: 178 from TRK and 195
from TRC, with no card in both files. 274 are new and 99 are reprints. 22
already sit in at least one of the three lists (mostly lands, plus [Path to Exile](https://scryfall.com/search?q=%21%22Path+to+Exile%22),
[Swords to Plowshares](https://scryfall.com/search?q=%21%22Swords+to+Plowshares%22), [Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22) and a few staples), and two more,
[Talisman of Hierarchy](https://scryfall.com/search?q=%21%22Talisman+of+Hierarchy%22) and [Talisman of Indulgence](https://scryfall.com/search?q=%21%22Talisman+of+Indulgence%22), sit in `b4-pool`.

The set has one Vampire, Salt Vampire. Its tribes are Klingons and Warriors, Officers, Borg
artifact creatures and Tribbles. All of them miss eminence, every Vampire lord and Olivia's Wrath's
exemption.

## Result

| List | MAIN | SIDE | IN | NO |
|---|---|---|---|---|
| `b4` (target) | 0 | 1 | 15 | 357 |
| `combat` | 2 | 4 | 18 | 349 |
| `sacrifice` | 2 | 3 | 16 | 352 |

`b4` takes nothing. The set's best cards for Edgar make tokens or pump attacks, and `b4` wins on
two-card loops found by nine tutors. The proposals are for the Bracket 3 lists.

- MAIN, `combat`: [Concerted Effort](https://scryfall.com/search?q=%21%22Concerted+Effort%22) in, [Vampire Nocturnus](https://scryfall.com/search?q=%21%22Vampire+Nocturnus%22) out. Each upkeep one flier gives
  the whole team flying, along with Edgar's first strike when he's out, [Charismatic Conqueror](https://scryfall.com/search?q=%21%22Charismatic+Conqueror%22)'s vigilance and
  [Malakir Bloodwitch](https://scryfall.com/search?q=%21%22Malakir+Bloodwitch%22)'s protection from white. Nocturnus flies only the Vampires, and only while
  the top card is black, about 39% of turns. Same mana value.
- MAIN, `combat`: [Rite of Ascension](https://scryfall.com/search?q=%21%22Rite+of+Ascension%22) in, [Mavren Fein, Dusk Apostle](https://scryfall.com/search?q=%21%22Mavren+Fein%2C+Dusk+Apostle%22) out. Both make tokens
  when we attack. Rite makes three hasty 2/1 attackers per attack (six under [Windcrag Siege](https://scryfall.com/search?q=%21%22Windcrag+Siege%22))
  from an enchantment, where Mavren makes one 1/1 that isn't attacking.
- MAIN, `sacrifice`: [Rite of Oblivion](https://scryfall.com/search?q=%21%22Rite+of+Oblivion%22) in, [Akroma's Will](https://scryfall.com/search?q=%21%22Akroma's+Will%22) out. Rite exiles any nonland
  permanent twice, and each cast sacrifices a token that fires the drains and [Grave Pact](https://scryfall.com/search?q=%21%22Grave+Pact%22).
  Akroma's Will keeps alive the creatures this list wants dead, and it's double-moded only with
  Edgar on the battlefield.
- MAIN, `sacrifice`: [Troubling Tribbles](https://scryfall.com/search?q=%21%22Troubling+Tribbles%22) in, [Infantry Shield](https://scryfall.com/search?q=%21%22Infantry+Shield%22) out. The Tribbles double every
  upkeep with no attack and no mana. The Shield's tokens need an equip and an attack, and this list
  rarely attacks.
- SIDE, `b4`: Salt Vampire, displacing [Legion Lieutenant](https://scryfall.com/search?q=%21%22Legion+Lieutenant%22).
- SIDE, `combat`: [Kurn, Son of Mogh](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22), displacing [Vampire Cutthroat](https://scryfall.com/search?q=%21%22Vampire+Cutthroat%22).
- SIDE, `combat`: [Korok, Liberated Rage](https://scryfall.com/search?q=%21%22Korok%2C+Liberated+Rage%22), displacing [Door of Destinies](https://scryfall.com/search?q=%21%22Door+of+Destinies%22).
- SIDE, `combat`: Own the Day, displacing [Blade of the Bloodchief](https://scryfall.com/search?q=%21%22Blade+of+the+Bloodchief%22).
- SIDE, `combat`: [Anguished Unmaking](https://scryfall.com/search?q=%21%22Anguished+Unmaking%22), displacing [Generous Gift](https://scryfall.com/search?q=%21%22Generous+Gift%22).
- SIDE, `sacrifice`: [Alhammarret's Archive](https://scryfall.com/search?q=%21%22Alhammarret's+Archive%22), displacing Anowon, the Ruin Sage.
- SIDE, `sacrifice`: [Worf, Intelligence Contractor](https://scryfall.com/search?q=%21%22Worf%2C+Intelligence+Contractor%22), displacing Anowon, the Ruin Sage.
- SIDE, `sacrifice`: Vengeance Mission, displacing [Kalastria Highborn](https://scryfall.com/search?q=%21%22Kalastria+Highborn%22).

Curve after both MAINs in each list, with averages as `deck:show` reports them (commander
included). `combat`: avg MV 2.95 → 2.97, MV ≤ 2 stays 23, MV ≤ 3 46 → 45. `sacrifice`: avg MV
2.95 → 2.92, MV ≤ 2 24 → 25, MV ≤ 3 44 → 45. No MAIN adds or removes a draw card.

## Set mechanics as they matter to this deck

- **Battlefront** (an ability word, read from oracle text). "The number of opponents you attacked
  this turn" reaches 3 when the attack is split across the table, which Commander allows by default
  (CR 903.2, Free-for-All with the attack multiple players option). Battlefront triggers worded
  "whenever you attack" or "whenever [this] attacks" are caused by attacking, so combat's Windcrag
  Siege (Mardu mode) makes them trigger twice (ledger trig-034, CR 603.2d). That doubling is why
  Rite of Ascension, Korok and Kurn score well in combat. Tokens put onto the battlefield attacking
  never "attacked" (CR 508.4), so Rite's Warriors don't trigger [Sanctum Seeker](https://scryfall.com/search?q=%21%22Sanctum+Seeker%22),
  [Shared Animosity](https://scryfall.com/search?q=%21%22Shared+Animosity%22) or another battlefront card.
- **Station** (CR 702.184a). "Tap another untapped creature you control" is a cost of the
  Spacecraft's ability, not the creature's own {T} ability, so a summoning-sick eminence token can
  pay it (CR 302.6 restricts only a creature's own tap abilities). A 1/1 token adds one counter, and
  the Spacecraft here need 3 to 16 counters, most of them 6 or more.
  [U.S.S. Enterprise-D, Galaxy-Class](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-D%2C+Galaxy-Class%22) is the exception that pays on the first counter each turn.
- **Assimilate** (reminder text). The creature "is a Borg artifact creature and loses all other
  creature types", so it is never a Vampire for lords, Olivia's Wrath or Anowon.
- **Finality counters** ([Overflow Submatrix](https://scryfall.com/search?q=%21%22Overflow+Submatrix%22), [Storied Veteran](https://scryfall.com/search?q=%21%22Storied+Veteran%22),
  [U.S.S. Reliant, From Hell's Heart](https://scryfall.com/search?q=%21%22U.S.S.+Reliant%2C+From+Hell's+Heart%22)). "If this permanent would be put into a graveyard from the
  battlefield, exile it instead" (CR 122.1h), so the creature never dies and every death payoff
  misses it (the die-to-exile pattern, ledger eval-018).
- **Beam me up** (reminder text). A graveyard recast that also returns one of our creatures to
  hand. Recasting a returned Vampire makes an eminence token, but none of these spells earns a slot.
- **Seek out, dilemma, Federation and strange new worlds.** Seek out needs a second draw each turn
  and dilemma needs modal spells, which the lists run few of. Federation counts creature types among
  non-Borg creatures. Strange new worlds counts the differently named lands we control, which is
  nearly every land we have out because these lists run few duplicate basics. By the midgame that
  makes [The Destruction of Praxis](https://scryfall.com/search?q=%21%22The+Destruction+of+Praxis%22) a -6/-6 or larger wipe of both boards.
- **Tribbles.** Troubling Tribbles copies itself each upkeep and every copy carries the trigger, so
  the count doubles each turn, and [Anointed Procession](https://scryfall.com/search?q=%21%22Anointed+Procession%22) (sacrifice) makes it triple. It's the
  set's one engine that fits the sacrifice plan.
- **Off-tribe tokens.** Officers, Warriors, Borg and Tribbles miss eminence, the Vampire lords and
  Shared Animosity, and Olivia's Wrath kills them. In combat they still count for
  [Warleader's Call](https://scryfall.com/search?q=%21%22Warleader's+Call%22), [Purphoros, God of the Forge](https://scryfall.com/search?q=%21%22Purphoros%2C+God+of+the+Forge%22) and [Mirkwood Bats](https://scryfall.com/search?q=%21%22Mirkwood+Bats%22).

## Classification table: all 373 cards

MAIN displaces a named card now. SIDE is worth benching, with the card it would displace. IN means
the list already runs it. NO is a pass. Names in the tables are plain text, spelled as the pool
spells them.

### White (#1 to #97)

| # | Name | MV | New? | b4 | combat | sacrifice | Reason |
|---|---|---|---|---|---|---|---|
| 1 | Command Subadjunct | 1 | NEW | NO | NO | NO | Gives vigilance to artifact creatures, and these lists run almost none. |
| 2 | Dispatch | 1 | REPRINT | NO | NO | NO | Exiles only with three artifacts out. Swords to Plowshares and Path to Exile exile for the same {W} with no condition. |
| 3 | Emergency Medical Hologram | 1 | NEW | NO | NO | NO | Gives one +1/+1 counter and 1 life on a non-Vampire 1-drop. |
| 4 | Evasive Maneuvers | 1 | NEW | NO | NO | NO | It's a blocking trick that cantrips. |
| 5 | Path to Exile | 1 | REPRINT | IN | IN | IN | Already in all three lists. |
| 6 | Set Phasers to . . . | 1 | NEW | NO | NO | NO | Stuns a creature or deals 3 to an attacker. Swords and Path exile for the same mana. |
| 7 | Swords to Plowshares | 1 | REPRINT | IN | IN | IN | Already in all three lists. |
| 8 | 70,000 Light-Years from Home | 2 | NEW | NO | NO | NO | It's a sorcery-speed Path to Exile at twice the cost. |
| 9 | Antagonist Incorporator | 2 | NEW | NO | NO | NO | Pays off Borg artifact creatures, which these lists don't run. |
| 10 | Assembly Specialist | 2 | NEW | NO | NO | NO | Makes two artifact 1/1s, neither a Vampire. Fodder isn't the bottleneck (2026-08-25 diagnosis). |
| 11 | Brad Boimler, Eager Ensign | 2 | NEW | NO | NO | NO | Adds one counter per placement only on turns he taps, on a Human. Combat's lords already size the board. |
| 12 | Command Decision | 2 | NEW | NO | NO | NO | Kills a creature with power 4 or more at sorcery speed, or draws one card. |
| 13 | Deanna Troi, Psychic Counsel | 2 | NEW | NO | NO | NO | Puts a counter on each creature as it enters, which pushes anthemed tokens past Welcoming Vampire's power-2 window in b4 and sacrifice. |
| 14 | Dr. Pulaski, Cynical Clinician | 2 | NEW | NO | NO | NO | Gains 4 on our second draw each turn, which Vito converts, but on a Human. Creeping Bloodsucker does an upkeep gain on a Vampire. |
| 15 | Emergency Regeneration | 2 | NEW | NO | NO | NO | Protects artifacts only. |
| 16 | Ensign Harry Kim, Operations | 2 | NEW | NO | NO | NO | Turns two +1/+1 counters into a card for {2}. Sacrifice makes counters (Cordial Vampire, Indulgent Aristocrat), but its draw already counts 11 sources and he is a Human. |
| 17 | Ezri Dax, Newly Joined | 2 | NEW | NO | NO | NO | Enters as a copy of a creature that died this turn. Copying Ruthless Lawbringer is cute, but the copy isn't cast, so no eminence token. |
| 18 | Federation Resupply | 2 | NEW | NO | NO | NO | Tutors an Aura, Equipment or Spacecraft, which in b4 means Animate Dead or Skullclamp. Nine tutors already find either. |
| 19 | Grand Crescendo | 2 | REPRINT | NO | NO | NO | Indestructible loses to -X/-X and exile (FRA review grounds), and the Citizens miss every Vampire payoff. |
| 20 | Head of Security | 2 | NEW | NO | NO | NO | It's a vanilla first striker. |
| 21 | Maturation Chamber | 2 | NEW | NO | NO | NO | Counts artifact spells, and these lists cast few. |
| 22 | Merciful Mandate | 2 | NEW | NO | NO | NO | Untaps our creatures or ends a combat. A second use of Captivating Vampire or Bloodline Keeper isn't worth a card. |
| 23 | Oberth-Class Starship | 2 | NEW | NO | NO | NO | Finds a Plains, then needs six power of station to become a flier. |
| 24 | Picard, Leading by Example | 2 | NEW | NO | NO | NO | Pumps one creature at sorcery speed. |
| 25 | Pure Energy | 2 | NEW | NO | NO | NO | Gives two +1/+1 counters, and its recast bounces one of our creatures. |
| 26 | Shields Up! | 2 | NEW | NO | NO | NO | Protects one creature. These lists protect the team or let the board die. |
| 27 | Starfleet Crew | 2 | NEW | NO | NO | NO | It's a vanilla 2-drop. |
| 28 | Sulu, Heroic Helmsman | 2 | NEW | NO | NO | NO | Needs Spacecraft or Vehicles, and the lists run none. |
| 29 | Sulu, Space Swashbuckler | 2 | NEW | NO | NO | NO | Draws only on turns an Equipment or Spacecraft entered. |
| 30 | Tactical Officer | 2 | NEW | NO | NO | NO | Grows after 8-power attacks and does nothing else. |
| 31 | Test of Conviction | 2 | NEW | NO | NO | NO | Puts a counter on each creature, or draws two while an opponent draws one. Neither mode is an engine. |
| 32 | The Needs of the Many | 2 | NEW | NO | NO | NO | Gives team hexproof and indestructible and prevents damage to us, paid with a token. Indestructible loses to -X/-X and exile, and Teferi's Protection and Unbreakable Formation hold the protection seats. |
| 33 | There's Coffee in that Nebula | 2 | NEW | NO | NO | NO | Digs five cards for a cheap permanent at sorcery speed. |
| 34 | Valorous Stance | 2 | REPRINT | NO | NO | NO | Saves one creature or kills one with toughness 4 or more. |
| 35 | Vexing Drone | 2 | NEW | NO | NO | NO | Taps one blocker on entry, on a non-Vampire. |
| 36 | Ambassador K'Ehleyr | 3 | NEW | NO | NO | NO | Every player draws each combat, so it feeds the table as much as us. |
| 37 | Andromedan Automatons | 3 | NEW | NO | NO | NO | Finds only copies of itself. |
| 38 | Balance of Terror | 3 | NEW | NO | NO | NO | Kills an artifact or enchantment, then blinks our ETB creatures (Ruthless Lawbringer, Malakir Bloodwitch). A return isn't a cast, so no eminence token. |
| 39 | Beverly Crusher, Ship's Doctor | 3 | NEW | NO | NO | NO | Spreads three counters after a second draw each turn, on a Human. |
| 40 | Borg Incursion | 3 | NEW | NO | NO | NO | Makes two artifact tokens and protects artifact creatures only. |
| 41 | Captain Jean-Luc Picard | 3 | NEW | NO | NO | NO | Pumps every creature and makes a 1/1 Officer per creature spell. Combat already runs six anthem sources, and a Human gets no eminence token. Near-miss, see below. |
| 42 | Conquest Mission | 3 | NEW | NO | NO | NO | Counts nontoken artifacts entering, and the lists play few. |
| 43 | Dr. Beverly Crusher | 3 | NEW | NO | NO | NO | Makes each "whenever you gain life" trigger fire twice. b4's loops are already unbounded, and in sacrifice Roaming Throne already doubles Vito and Blight-Priest. Near-miss, see below. |
| 44 | Duelist's Heritage | 3 | REPRINT | NO | NO | NO | Gives one attacker double strike each combat. Akroma's Will gives the whole team double strike on the kill turn. |
| 45 | Guinan, Ancient Advisor | 3 | NEW | NO | NO | NO | Draws once a turn for {1} after two creatures entered, on a Human. Welcoming Vampire does that on a Vampire. |
| 46 | Hologram Janeway | 3 | NEW | NO | NO | NO | Places one counter per 8-power attack. |
| 47 | Imperial Hullbreachers | 3 | NEW | NO | NO | NO | Squad fliers with battle cry, all non-Vampire Klingons, at {2} per copy. |
| 48 | Indelicate Healer | 3 | NEW | NO | NO | NO | Grants team lifelink only when a Klingon or Warrior enters, and Black Market Connections' changeling is our only one. |
| 49 | Julian Bashir, Frontier Doctor | 3 | NEW | NO | NO | NO | Reanimates on attack only after he grows, which needs a second draw every turn. |
| 50 | Loran of the Third Path | 3 | REPRINT | NO | NO | NO | Kills one artifact or enchantment, then draws symmetrically. |
| 51 | Malfunctioning Holodeck | 3 | NEW | NO | NO | NO | Exiles any nonland permanent until it leaves, with ward 2. Generous Gift, Chaos Warp and Anguished Unmaking answer at instant speed and for good. |
| 52 | Martok, Hero of the Empire | 3 | NEW | NO | NO | NO | Places up to three counters per attack on a non-Vampire. Edgar's own attack trigger counters every Vampire. |
| 53 | Miles O'Brien, Transporter Ops | 3 | NEW | NO | NO | NO | Bounces one of our creatures and draws that turn. A Vampire recast is an eminence token, but it's a slow card. |
| 54 | Pet Sehlat | 3 | NEW | NO | NO | NO | It's a vanilla body that can't attack alone. |
| 55 | Rutherford, Upgraded Ensign | 3 | NEW | NO | NO | NO | Digs for an artifact, then rewards Spacecraft. |
| 56 | Shuttle Crew | 3 | NEW | NO | NO | NO | Deals 4 to a tapped creature on entry, on a non-Vampire flier. |
| 57 | Sickbay Orderly | 3 | NEW | NO | NO | NO | It's a vanilla lifelinker. |
| 58 | Spot, Felis catus | 3 | NEW | NO | NO | NO | Makes Food from legendary permanents and has a slow artifact kill. |
| 59 | Stratagem Emulator | 3 | NEW | NO | NO | NO | Leaves artifact 1/1s on death. Fodder isn't the bottleneck. |
| 60 | Supplementation Node | 3 | NEW | NO | NO | NO | Pays off artifact creatures. |
| 61 | Tempered Steel | 3 | REPRINT | NO | NO | NO | Pumps artifact creatures only. |
| 62 | The Measure of a Man | 3 | NEW | NO | NO | NO | Exiles a creature or artifact for two turns, then gives it back. Its Clue doesn't count as draw. |
| 63 | Tribble Cluster | 3 | NEW | NO | NO | NO | Grows each combat and leaves Tribbles that can't block. Troubling Tribbles is the stronger Tribble here. |
| 64 | Troubling Tribbles | 3 | NEW | NO | NO | MAIN | Each Tribble copies itself every upkeep, so the count doubles: free fodder for Skullclamp, Grave Pact and the drains with no attack needed. MAIN in sacrifice over Infantry Shield. b4 is too fast for it, and in combat the tokens miss the Vampire anthems. |
| 65 | Worf, Chief Tactical Officer | 3 | NEW | NO | NO | NO | It's a vanilla vigilance body. |
| 66 | Concerted Effort | 4 | REPRINT | NO | MAIN | NO | Each upkeep our creatures share flying, first strike, vigilance and protection, so one flier gives the whole team flying. MAIN in combat over Vampire Nocturnus. b4 and sacrifice don't win by attacking. |
| 67 | DOT-7 Repair Squad | 4 | NEW | NO | NO | NO | Untaps one creature at sorcery speed, on a flier. |
| 68 | Dr. McCoy, Surly Surgeon | 4 | NEW | NO | NO | NO | Saves countered creatures from destruction, and sacrifice wants them to die. |
| 69 | Federation Field Medic | 4 | NEW | NO | NO | NO | Gives a counter or one conditional card on a 4-drop. |
| 70 | Ghost of Illyria | 4 | NEW | NO | NO | NO | Blinks one of our permanents (Ruthless Lawbringer, Malakir Bloodwitch). A return isn't a cast, so no eminence token. |
| 71 | Korok, Liberated Rage | 4 | NEW | NO | SIDE | NO | Attacking three opponents gives the team +3/+3, and Windcrag Siege makes it +6/+6. Benched in combat behind Door of Destinies, since he is a non-Vampire legend that must survive a turn to attack. |
| 72 | Operations Officer | 4 | NEW | NO | NO | NO | Draws one card on a lifelink 4-drop. |
| 73 | Peace in Our Time | 4 | NEW | NO | NO | NO | Offers every player a card for skipping their attack, which feeds the table and stops our own combat. |
| 74 | Primary Unimatrix Adjunct | 4 | NEW | NO | NO | NO | Gives double strike to artifact creatures only. |
| 75 | Return to Dust | 4 | REPRINT | NO | NO | NO | Exiles artifacts and enchantments only. |
| 76 | Right of Vengeance | 4 | NEW | NO | NO | NO | Punishes attackers for one turn, in decks that don't block. |
| 77 | Shuttlecraft Galileo | 4 | NEW | NO | NO | NO | Makes landfall Officers, then needs six station to fly. |
| 78 | Troi, Winging It | 4 | NEW | NO | NO | NO | Makes Faeries when opponents draw on our turn, and Esper Sentinel and Smothering Tithe rarely force those draws. |
| 79 | Type-03 Borg Vessel | 4 | NEW | NO | NO | NO | Rewards artifact spells and needs seven station. |
| 80 | U.S.S. Excelsior, Cutting Edge | 4 | NEW | NO | NO | NO | Kills a tapped creature on entry, then needs eight station. |
| 81 | Wrath of God | 4 | REPRINT | NO | NO | NO | Wipes symmetrically. Olivia's Wrath is the one-sided version here. |
| 82 | Free Borg Revolutionaries | 5 | NEW | NO | NO | NO | Pumps the team for one turn or cycles for a basic. |
| 83 | M'Ress, Crew Coordinator | 5 | NEW | NO | NO | NO | Makes two Officers per land, and the lists play one land a turn. |
| 84 | Promise of Loyalty | 5 | REPRINT | NO | NO | NO | Every player keeps one creature, so it wipes our wide board too. |
| 85 | Saavik, Stoic Student | 5 | NEW | NO | NO | NO | Deals flash damage to one combat creature at MV5. |
| 86 | Shuttle Ace | 5 | NEW | NO | NO | NO | Gains 2 when tapped, on a 5-drop. |
| 87 | U.S.S. Enterprise-A, Free Spirit | 5 | NEW | NO | NO | NO | Makes three Officers at MV5, then needs six station. |
| 88 | U.S.S. Enterprise-E, Sovereign | 5 | NEW | NO | NO | NO | Destroys every tapped creature, ours after an attack included. |
| 89 | Una Chin-Riley, Number One | 5 | NEW | NO | NO | NO | Gives one attacker +2/+0 and first strike. |
| 90 | Will Riker, Assuming Command | 5 | NEW | NO | NO | NO | Places one counter at MV5. |
| 91 | Austere Command | 6 | REPRINT | NO | NO | NO | Every creature mode kills our own Vampires, and the artifact mode kills our rocks. |
| 92 | Chronomantic Escape | 6 | REPRINT | NO | NO | NO | Fogs for a turn in decks that win without blocking. |
| 93 | Excalbian Gamemaster | 6 | NEW | NO | NO | NO | Costs six for Officers equal to differently named lands. Fodder isn't the bottleneck. |
| 94 | Picard, Steadfast Captain | 6 | NEW | NO | NO | NO | Places two counters on entry and attack, at MV6. |
| 95 | Sun Titan | 6 | REPRINT | NO | NO | NO | Returns a permanent with MV 3 or less on entry and attack, but at MV6, and a return isn't a cast, so no eminence token. |
| 96 | Join the Collective | 7 | NEW | NO | NO | NO | Destroys every creature, ours included. |
| 97 | Vanquish the Horde | 8 | REPRINT | NO | NO | NO | Destroys every creature, ours included. |

### Black (#98 to #161)

| # | Name | MV | New? | b4 | combat | sacrifice | Reason |
|---|---|---|---|---|---|---|---|
| 98 | A Good Day to Die | 1 | NEW | NO | NO | NO | Draws one card if the target dies this turn. Village Rites draws two for {B}. |
| 99 | Collation Trimatrix | 1 | NEW | NO | NO | NO | Needs three untapped artifact creatures. |
| 100 | General Chang, Cold Warrior | 1 | NEW | NO | NO | NO | It's a paid outlet whose counters go to Klingons only. |
| 101 | Relentless Drednok | 1 | NEW | NO | NO | NO | Cashes in from the graveyard for one card, on a lifelink 1-drop. |
| 102 | Storied Veteran | 1 | NEW | NO | NO | NO | Its graveyard recast carries a finality counter, so its second death is an exile with no death trigger. |
| 103 | Test of Loyalty | 1 | NEW | NO | NO | NO | Cantrips with graveyard hate or returns one creature card to hand. |
| 104 | Battle-Scarred Survivalist | 2 | NEW | NO | NO | NO | Grows once a turn on a non-Vampire. |
| 105 | Bitter Triumph | 2 | REPRINT | NO | NO | NO | Kills a creature or planeswalker at instant speed for two. Swords and Path cost one and exile. |
| 106 | Blood-Sport Champion | 2 | NEW | NO | NO | NO | Kicked, it gives the team deathtouch for a turn. Vault of the Archangel already grants that in the Bracket 3 lists. |
| 107 | Collective Drone | 2 | NEW | NO | NO | NO | Counts artifact creatures. |
| 108 | De-evolve | 2 | NEW | NO | NO | NO | Exiles its creature only at threshold. |
| 109 | Eject the Warp Core | 2 | NEW | NO | NO | NO | Gives -6/-6 at instant speed when kicked with a sacrificed token. Swords and Path exile for one mana. |
| 110 | Extraction Integrant | 2 | NEW | NO | NO | NO | Gives menace to artifact creatures. |
| 111 | Kai Winn, Faithless Leader | 2 | NEW | NO | NO | NO | Taxes one named card with 3 life. The pilot passes on hate pieces that mostly stifle opponents. |
| 112 | Last Gasp | 2 | REPRINT | NO | NO | NO | Gives -3/-3 once. Swords and Path exile (FRA review grounds). |
| 113 | Night's Whisper | 2 | REPRINT | NO | NO | NO | Draws two once. Village Rites and Deadly Dispute fill those seats with a sacrifice upside. |
| 114 | Pattern Buffer Preservation | 2 | NEW | NO | NO | NO | Picks one card of two. |
| 115 | Resistance Is Futile | 2 | NEW | NO | NO | NO | Kills a nonartifact creature at sorcery speed. |
| 116 | Salt Vampire | 2 | NEW | SIDE | NO | NO | The set's only Vampire has lifelink, and its entry exiles one nonland card from an opponent's hand (they draw a replacement). Benched in b4 behind Legion Lieutenant. The Bracket 3 lists' 2-drops carry engine text. |
| 117 | Tal Shiar Operative | 2 | NEW | NO | NO | NO | Grants deathtouch or surveils on attack. |
| 118 | Tell Me What You See | 2 | NEW | NO | NO | NO | It's a punisher card: the opponent picks our draw or takes 4. |
| 119 | Tenacious Drone | 2 | NEW | NO | NO | NO | Leaves an artifact 1/1 on death. |
| 120 | Assimilate the Wounded | 3 | NEW | NO | NO | NO | Steals creature cards that died this turn, but assimilated creatures are Borg artifacts and lose the Vampire type. |
| 121 | Automated Warfare System | 3 | NEW | NO | NO | NO | Draws for a sacrifice on attack, on a non-Vampire flier. |
| 122 | Bat'leth | 3 | NEW | NO | NO | NO | Gives -2/-2 on entry, then +2/+0 for an equip. |
| 123 | Commander Raffi Musiker | 3 | NEW | NO | NO | NO | Exiles a graveyard card or makes a Clue, on a Human. |
| 124 | D'Ghor Bloodletter | 3 | NEW | NO | NO | NO | Mode one kills our own 1/1 tokens, and mode two is a symmetrical edict. |
| 125 | Elim Garak, Simple Tailor | 3 | NEW | NO | NO | NO | Drains on modal choices, and the lists run few modal spells. |
| 126 | Fugitive Listener | 3 | NEW | NO | NO | NO | Makes each opponent discard once, on a vanilla body. |
| 127 | Grand Nagus Zek | 3 | NEW | NO | NO | NO | Makes one Treasure a turn from deaths. The altars and Phyrexian Tower already turn deaths into mana. |
| 128 | Impossible Choice | 3 | NEW | NO | NO | NO | Kills a creature at instant speed and gives its owner two tokens, or draws two. The kill is creature-only. |
| 129 | Kurn, Son of Mogh | 3 | NEW | NO | SIDE | NO | Draws one card per opponent attacked when he attacks (three, or six under Windcrag Siege), on a deathtouch 3-drop. Benched in combat behind Vampire Cutthroat because combat's draw already meets the 8 to 10 aim. Sacrifice rarely attacks. |
| 130 | Organic Avulsion Unit | 3 | NEW | NO | NO | NO | Gives menace to artifact creatures. |
| 131 | Overflow Submatrix | 3 | NEW | NO | NO | NO | Its recast creatures carry finality counters, so they exile instead of dying and miss every death payoff. |
| 132 | Painful Truths | 3 | REPRINT | NO | NO | NO | Draws three for three in these colours, once. |
| 133 | Reclamation Specialist | 3 | NEW | NO | NO | NO | Sacrifices artifact creatures only. |
| 134 | Stray from History | 3 | NEW | NO | NO | NO | Returns two creature cards to hand or exiles a card from a hand. |
| 135 | Toxic Deluge | 3 | REPRINT | NO | NO | NO | Kills our own board. Sacrifice cut it on 2026-09-10 for that reason, and b4 passed it for the one-sided Olivia's Wrath. |
| 136 | Vengeance Mission | 3 | NEW | NO | NO | SIDE | Drains one opponent per creature death, 2 from the seventh death on, from an enchantment. Benched in sacrifice behind Kalastria Highborn, whose drain also gains life for Vito and Blight-Priest. |
| 137 | Assault Drone | 4 | NEW | NO | NO | NO | Pumps artifact creatures. |
| 138 | Badgey, Malicious Glitch | 4 | NEW | NO | NO | NO | Drains 1 when it taps, at MV4. |
| 139 | Blastoneuron | 4 | NEW | NO | NO | NO | Drains when cards leave our graveyard (an Oathsworn Vampire recast), on a non-Vampire 4-drop. |
| 140 | Ceti Eel | 4 | NEW | NO | NO | NO | It's a self-mill beater. |
| 141 | He's Dead, Jim | 4 | NEW | NO | NO | NO | Kills a creature at instant speed for four. |
| 142 | Khan, Vengeful Heart | 4 | NEW | NO | NO | NO | Draws two for a sacrificed token, on a 4-drop Human. Village Rites does it for {B}. |
| 143 | Obsidian Order Operative | 4 | NEW | NO | NO | NO | Drains on modal choices, and the lists run few. |
| 144 | Sela, Tal Shiar Paradox | 4 | NEW | NO | NO | NO | Makes tokens when cards leave the graveyard. |
| 145 | U.S.S. Reliant, From Hell's Heart | 4 | NEW | NO | NO | NO | Its reanimation adds a finality counter, so the creature exiles on its next death. |
| 146 | Voq, Torchbearer | 4 | NEW | NO | NO | NO | Copies a graveyard creature as a non-Vampire, so no eminence token and no lords. |
| 147 | Assimilation Assessor | 5 | NEW | NO | NO | NO | Its assimilated creatures lose the Vampire type. |
| 148 | Battle of Wolf 359 | 5 | NEW | NO | NO | NO | Scales with artifact creatures. |
| 149 | Bio-Asset Allocator | 5 | NEW | NO | NO | NO | Drains for attacking artifact creatures only. |
| 150 | Cha'DIch Investigator | 5 | NEW | NO | NO | NO | Makes two bodies at MV5, neither a Vampire. |
| 151 | Gabriel Lorca, Mirror Menace | 5 | NEW | NO | NO | NO | Recurs on modal choices, on a 5-drop. |
| 152 | Hive Mind Coprocessor | 5 | NEW | NO | NO | NO | Draws for artifact creatures only. |
| 153 | In the Pale Moonlight | 5 | NEW | NO | NO | NO | Spreads an edict, a Clue and two bodies over three turns at MV5. |
| 154 | The Destruction of Praxis | 5 | NEW | NO | NO | NO | X counts the differently named lands we control, nearly every land in play here, so it kills both boards. |
| 155 | The Promise of Kahless | 5 | NEW | NO | NO | NO | Returns Klingons and Warriors only. |
| 156 | Borg Queen, Perfection Manifest | 6 | NEW | NO | NO | NO | Pumps artifact creatures, and her steal assimilates. |
| 157 | Georgiou, Terran Emperor | 6 | NEW | NO | NO | NO | Lets us pay life below zero, a cute b4 line with Necropotence or Bolas's Citadel, but she costs six on a Human and the two-card loops win sooner. |
| 158 | Rogue Artificial Intelligence | 6 | NEW | NO | NO | NO | Gains 3 or surveils 2 at MV6, or cycles for a basic. |
| 159 | Armus, Skin of Evil | 7 | NEW | NO | NO | NO | It's a 7-drop discard engine. |
| 160 | Gul Dukat, Colonial Prefect | 7 | NEW | NO | NO | NO | Repeats each opponent's life loss at end step, but at MV7 with {B}{B}{B}. |
| 161 | Death Is Irrelevant | 8 | NEW | NO | NO | NO | Costs eight for artifact indestructibility and assimilation. |

### Red (#162 to #236)

| # | Name | MV | New? | b4 | combat | sacrifice | Reason |
|---|---|---|---|---|---|---|---|
| 162 | Defense Force Aggressor | 1 | NEW | NO | NO | NO | It's a vanilla 1-drop. |
| 163 | Gin'tak Charge | 1 | NEW | NO | NO | NO | Deals 2 for {R} at sorcery speed. |
| 164 | Khaaaaaaaaaaaannn! | 1 | NEW | NO | NO | NO | Burns one creature for X. Swords and Path exile for one mana. |
| 165 | Planetary Bombardment | 1 | NEW | NO | NO | NO | Deals 2 or 4 to a creature at sorcery speed. |
| 166 | Starfleet Security | 1 | NEW | NO | NO | NO | Leaves a Clue on death, and Clues don't count as draw. |
| 167 | Abrade | 2 | REPRINT | NO | NO | NO | Deals 3 to a creature or kills an artifact. |
| 168 | Beckett Mariner, Impetuous Ensign | 2 | NEW | NO | NO | NO | Deals 2 to each opponent every third tap. |
| 169 | Boarding Action | 2 | NEW | NO | NO | NO | Makes one hasty token. |
| 170 | Brazen Bluff | 2 | NEW | NO | NO | NO | It's a soft counter that needs {R}{R}. b4 protects its combo turn with Silence and Teferi's Protection. |
| 171 | Captain's Tutelage | 2 | NEW | NO | NO | NO | It's a +2/+0 aura. |
| 172 | D-7 Battle Cruiser | 2 | NEW | NO | NO | NO | Makes a temporary Warrior each combat after three station counters. |
| 173 | Ferocious Colonist | 2 | NEW | NO | NO | NO | It's a double-strike 2-drop with no engine text. |
| 174 | Lwaxana Troi, Charming Guest | 2 | NEW | NO | NO | NO | Makes one creature's triggers fire twice while she stays tapped, for {2}. b4's loops are already unbounded, and in sacrifice Roaming Throne already doubles every Vampire. |
| 175 | Munitions Enthusiast | 2 | NEW | NO | NO | NO | Deals 1 on death. |
| 176 | Perils of the Past | 2 | NEW | NO | NO | NO | Pumps a creature or kills an artifact. |
| 177 | Planetary Patrol | 2 | NEW | NO | NO | NO | Gets a landfall pump. |
| 178 | Qo'noS Quartermaster | 2 | NEW | NO | NO | NO | Adds one mana per attack, on a non-Vampire. |
| 179 | Reckless Impulse | 2 | REPRINT | NO | NO | NO | Exiles two cards to play, once. |
| 180 | Run Amok | 2 | REPRINT | NO | NO | NO | It's a one-creature combat trick. |
| 181 | Savvy Profiteer | 2 | NEW | NO | NO | NO | Taps for {R} and makes slow Treasures. |
| 182 | Tasha Yar, Out of Time | 2 | NEW | NO | NO | NO | Exiles one card to play when she dies. |
| 183 | Test of Identity | 2 | NEW | NO | NO | NO | Rummages or pumps a Klingon. |
| 184 | The Naked Time | 2 | NEW | NO | NO | NO | Chapter III sacrifices one of our lands. |
| 185 | Thrill of Possibility | 2 | REPRINT | NO | NO | NO | Discards one and draws two, once. |
| 186 | Transporter Malfunction | 2 | NEW | NO | NO | NO | Deals 3 at sorcery speed. |
| 187 | Warship Flight Crew | 2 | NEW | NO | NO | NO | It's a vanilla 2-drop. |
| 188 | Academy Instructor | 3 | NEW | NO | NO | NO | Makes Officers off noncreature spells. |
| 189 | Cantankerous Captain | 3 | NEW | NO | NO | NO | Gives one creature +1/+0 each combat. |
| 190 | Captain James T. Kirk | 3 | NEW | NO | NO | NO | Rummages, makes a token or pumps for a turn on entry and attack, on a Human. |
| 191 | Captain Michael Burnham | 3 | NEW | NO | NO | NO | Pings on landfall, and the lists play one land a turn. |
| 192 | Combat Celebrant | 3 | REPRINT | NO | NO | NO | Gives an extra combat when exerted, but it's a Human that must survive a turn to attack. Own the Day gives the extra combat from the hand. |
| 193 | Direct Hit | 3 | NEW | NO | NO | NO | Deals 5 at sorcery speed. |
| 194 | Dominion Infiltration | 3 | NEW | NO | NO | NO | Makes temporary changeling copies of opposing creatures for {X}{R}{R}{R}. |
| 195 | Encounter the Unknown | 3 | NEW | NO | NO | NO | Exiles two cards to play, or deals 2 to each creature, our tokens included. |
| 196 | Gagh Slinger | 3 | NEW | NO | NO | NO | Rewards Klingons and Warriors. |
| 197 | Kruge, Genesis Seeker | 3 | NEW | NO | NO | NO | Pumps attacking Klingons. |
| 198 | Plasma Cascade | 3 | NEW | NO | NO | NO | Deals 3 and rummages. |
| 199 | Professional Face-Breaker | 3 | REPRINT | NO | NO | NO | Makes Treasure on combat damage and turns Treasures into cards, on a Human. Combat's draw meets the aim without it. |
| 200 | Quark, Humble Proprietor | 3 | NEW | NO | NO | NO | While he's out we can't sacrifice Treasures, so his Treasures and ours (Smothering Tithe, Deadly Dispute, Black Market Connections) make no mana. |
| 201 | Red Alert! | 3 | NEW | NO | NO | NO | Gives the team +2/+0 for a turn. |
| 202 | Ro Laren, Double Agent | 3 | NEW | NO | NO | NO | Deals 2 to each opponent once a turn after a second draw, on a looter. |
| 203 | Sarcophagus, Ship of the Dead | 3 | NEW | NO | NO | NO | It's a +1/+0 anthem that becomes a flier after ten deaths. Combat runs six anthem sources already. |
| 204 | Shared Animosity | 3 | REPRINT | IN | IN | NO | In b4 and combat. Sacrifice rarely attacks. |
| 205 | Tal Shiar Analyst | 3 | NEW | NO | NO | NO | Pings each opponent and untaps on noncreature spells. |
| 206 | Targ Wrangler | 3 | NEW | NO | NO | NO | Sacrifices a nonland permanent after attacking, on a non-Vampire. |
| 207 | The Beacon of Kahless | 3 | NEW | NO | NO | NO | Taps for three after attacking every opponent, at MV3. Combat's ramp seats are full. |
| 208 | The Wrath of Khan | 3 | NEW | NO | NO | NO | Spreads 4 damage, a rummage and an edict over three turns. |
| 209 | Worf, Intelligence Contractor | 3 | NEW | NO | NO | SIDE | Takes one MV 3-or-less creature from each opponent for the turn. Sacrificing them is removal plus a death under our control for each (Grave Pact, Cruel Celebrant). Benched in sacrifice behind Anowon. |
| 210 | Chain Reaction | 4 | REPRINT | NO | NO | NO | Wipes symmetrically and scales with our own wide board. |
| 211 | Dahar Master | 4 | NEW | NO | NO | NO | Deals 2 for a sacrificed permanent on entry. |
| 212 | Disrupt Decorum | 4 | REPRINT | NO | NO | NO | Goads every opposing creature for a turn. Their attacks go at each other, and the drains don't need it. |
| 213 | Erica Ortegas, Plucky Pilot | 4 | NEW | NO | NO | NO | Cheats a land in for a turn. |
| 214 | Exploratory Mission | 4 | NEW | NO | NO | NO | Exiles cards to play on landfall, and the lists play one land a turn. |
| 215 | Galvanizing Tenor | 4 | NEW | NO | NO | NO | Goads on attack. |
| 216 | Kang, Suspicious Captain | 4 | NEW | NO | NO | NO | Goads himself and one creature. |
| 217 | Kirk, Enterprising Captain | 4 | NEW | NO | NO | NO | Exiles one card to play per 8-power attack, on a Human. |
| 218 | Koloth, Tribble Hunter | 4 | NEW | NO | NO | NO | Gives every player two goaded Tribbles each end step. Cute with Blood Seeker and Charismatic Conqueror, but it builds the opponents' boards. |
| 219 | La'An Noonien-Singh, Security | 4 | NEW | NO | NO | NO | Stops one blocker per 8-power attack. |
| 220 | Mek'leth Berserker | 4 | NEW | NO | NO | NO | It's a vanilla menace 4-drop. |
| 221 | Q, Stacking the Deck | 4 | NEW | NO | NO | NO | Copies a random card repeatedly. |
| 222 | Rom and Leeta, Unlikely Pair | 4 | NEW | NO | NO | NO | Makes two tapped Treasures after a second draw each turn. |
| 223 | Will Riker, First in the Field | 4 | NEW | NO | NO | NO | Puts temporary lands in each combat. |
| 224 | Genesis Effect | 5 | NEW | NO | NO | NO | Deals 6 for five mana and destroys one of our lands. |
| 225 | Gnarling Targ | 5 | NEW | NO | NO | NO | Pumps Klingons and Warriors. |
| 226 | Khan, Despot by Design | 5 | NEW | NO | NO | NO | Deals 1 to each opponent and their creatures, at MV5 on a Human. |
| 227 | Klingon Strike Force | 5 | NEW | NO | NO | NO | Deals 2 to each opponent on death, at MV5. |
| 228 | Silicate Surveyor | 5 | NEW | NO | NO | NO | Exiles one card to play at MV5. |
| 229 | World at War | 5 | REPRINT | NO | NO | NO | Gives an extra combat at MV5 with rebound. Own the Day gives one for three mana after the first attack. |
| 230 | Glory to the Empire! | 6 | NEW | NO | NO | NO | Costs six for three Warriors and melee. |
| 231 | Grilka, Widowed Warrior | 6 | NEW | NO | NO | NO | Steals one creature for a turn at MV6. |
| 232 | Horta | 6 | NEW | NO | NO | NO | It's a trample 6-drop or a landcycler. |
| 233 | Own the Day | 6 | NEW | NO | SIDE | NO | After attacking three opponents it costs {1}{R}{R} to untap the attackers and fight again, so Edgar's counters, Sanctum Seeker and Windcrag Siege fire twice. Benched in combat behind Blade of the Bloodchief. |
| 234 | Ravenous Cosmozoan | 6 | NEW | NO | NO | NO | Needs noncreature cards in our graveyard. |
| 235 | Pah-Wraith | 7 | NEW | NO | NO | NO | Costs seven. |
| 236 | Infinite Diversity | 9 | NEW | NO | NO | NO | Costs nine. |

### Multicolour (#237 to #268)

| # | Name | MV | New? | b4 | combat | sacrifice | Reason |
|---|---|---|---|---|---|---|---|
| 237 | Locutus, the One Who Speaks | 2 | NEW | NO | NO | NO | Pumps artifact creatures. |
| 238 | Pest Control | 2 | REPRINT | NO | NO | NO | Destroys our tokens, Sol Ring, the moxen and every 1-drop Vampire. |
| 239 | Rite of Oblivion | 2 | REPRINT | NO | NO | MAIN | Exiles any nonland permanent twice (flashback), and each cast sacrifices a token, which is a death trigger. MAIN in sacrifice over Akroma's Will. Combat's bench answer is Anguished Unmaking, and b4's answers are instants. |
| 240 | Talisman of Conviction | 2 | REPRINT | NO | NO | NO | Taps for red or white, and red is the lightest colour in all three lists. |
| 241 | Talisman of Hierarchy | 2 | REPRINT | NO | NO | NO | Cut from the Bracket 3 lists on 2026-08-25 when ramp was judged generous, and in b4-pool since Ashnod's Altar took its b4 seat (pilot's call, 2026-11-03). |
| 242 | Talisman of Indulgence | 2 | REPRINT | NO | NO | NO | Was cut from the Bracket 3 lists as a pain source, and sits in b4-pool already. |
| 243 | Terminate | 2 | REPRINT | NO | NO | NO | Kills creatures only. Swords and Path cover it (cut 2026-08-03 on those grounds). |
| 244 | The Duras Sisters | 2 | NEW | NO | NO | NO | Leaves a token when it dies, and nothing else. |
| 245 | Worf, Honor-Bound Warrior | 2 | NEW | NO | NO | NO | Grows by tapping our creatures. |
| 246 | Anguished Unmaking | 3 | REPRINT | IN | SIDE | NO | In b4. Benched in combat behind Generous Gift. In sacrifice, Rite of Oblivion (MAIN) is the added any-permanent answer. |
| 247 | Commander William Riker | 3 | NEW | NO | NO | NO | Draws two for us and two for an opponent. |
| 248 | Kira Nerys, Firebrand | 3 | NEW | NO | NO | NO | Puts creatures entering mid-combat into the attack, and the lists rarely make them then. |
| 249 | Kirk, Commanding Officer | 3 | NEW | NO | NO | NO | Exiles one card to play per 8-power attack. |
| 250 | L'Rell, Fierce Visionary | 3 | NEW | NO | NO | NO | Makes a temporary Warrior each combat (a free death at end step) and is a paid outlet. Eminence already supplies bodies. |
| 251 | Vic Fontaine, One Night Only | 3 | NEW | NO | NO | NO | Pumps after a second draw. |
| 252 | Vindicate | 3 | REPRINT | NO | NO | NO | Answers any permanent at sorcery speed. Generous Gift does the job at instant speed in the Bracket 3 lists, and b4's answers are instants. |
| 253 | Warleader's Call | 3 | REPRINT | NO | IN | NO | In combat. In b4 and sacrifice its anthem pushes eminence tokens past Welcoming Vampire's power-2 window, and Impact Tremors (b4) and Purphoros (sacrifice) deal the ETB damage. |
| 254 | Worf, Son of Mogh | 3 | NEW | NO | NO | NO | Pumps Officers. |
| 255 | Zero, Incorporeal Sensate | 3 | NEW | NO | NO | NO | Attacks a hand on entry but isn't a Vampire. Salt Vampire does it on-tribe. |
| 256 | Curzon Dax, Bound by Blood | 4 | NEW | NO | NO | NO | Pings on Klingon or Warrior deaths. |
| 257 | Gowron, Eager for Battle | 4 | NEW | NO | NO | NO | It's a free outlet that draws only off Klingons, and sacrifice already runs seven outlets. |
| 258 | Kor, Cause of Vengeance | 4 | NEW | NO | NO | NO | Draws one card per attack for a sacrificed creature, and its pump hits Klingons and Warriors only. |
| 259 | Rite of Ascension | 4 | NEW | NO | MAIN | NO | Each attack makes a tapped, attacking 2/1 haste Warrior per opponent attacked: three, or six under Windcrag Siege. MAIN in combat over Mavren Fein. Sacrifice rarely attacks, and b4 wins by loops. |
| 260 | Alexander, Ship's Fool | 5 | NEW | NO | NO | NO | Draws for every player and deals random damage. |
| 261 | Chancellor Gorkon | 5 | NEW | NO | NO | NO | Exiles two creatures when it dies, a fine sacrifice answer, but at MV5. Worf, Intelligence Contractor does more at MV3. |
| 262 | Deliver from Chaos | 5 | NEW | NO | NO | NO | Exiles a creature or artifact at instant speed for five. Swords and Path cost one. |
| 263 | Sins of the Father | 5 | NEW | NO | NO | NO | Spreads an edict, tokens and a graveyard drain over three turns. |
| 264 | The City on the Edge of Forever | 5 | NEW | NO | NO | NO | Phases out every artifact and creature, ours included. |
| 265 | Worf, Defiant Commander | 5 | NEW | NO | NO | NO | Each attack exiles three cards to play (six under Windcrag Siege), and he needn't attack himself. He's a non-Vampire 5-drop, and Kurn draws at MV3. |
| 266 | Worf, Still Not Merry | 5 | NEW | NO | NO | NO | Makes a 1/1 Faerie flier per attacking creature each time he attacks, but he's an MV5 legend that must survive to attack. Rite of Ascension does the job at MV4 on an enchantment. |
| 267 | Borg Cube | 7 | NEW | NO | NO | NO | Costs seven and wants artifact creatures. |
| 268 | Ruinous Ultimatum | 7 | REPRINT | NO | NO | NO | Wipes one-sided, but these bases can't reliably pay {R}{R}{W}{W}{W}{B}{B}. |

### Colourless (#269 to #327)

| # | Name | MV | New? | b4 | combat | sacrifice | Reason |
|---|---|---|---|---|---|---|---|
| 269 | Astral Cornucopia | 0 | REPRINT | NO | NO | NO | Costs three for one mana of one colour. |
| 270 | Engineered Explosives | 0 | REPRINT | NO | NO | NO | Sunburst caps at three, and at X=0 it kills our tokens and moxen. |
| 271 | Everflowing Chalice | 0 | REPRINT | NO | NO | NO | Taps for colourless. b4's fast mana outclasses it and the Bracket 3 ramp seats are full. |
| 272 | Jefferies Tube | 1 | NEW | NO | NO | NO | Its abilities cost {2} to {4} each. |
| 273 | Skullclamp | 1 | REPRINT | IN | NO | IN | In b4 and sacrifice. Combat has six anthems and few free outlets (2026-09-10 grounds). |
| 274 | Sol Ring | 1 | REPRINT | IN | IN | IN | Already in all three lists. |
| 275 | Tricorder | 1 | NEW | NO | NO | NO | Gives +1/+1 and surveils on attack. |
| 276 | Wayfarer's Bauble | 1 | REPRINT | NO | NO | NO | Fetches a tapped basic slowly. |
| 277 | Arcane Signet | 2 | REPRINT | IN | IN | NO | In b4 and combat. Sacrifice's mana comes from Urza's Incubator, Herald's Horn and the altars. |
| 278 | Cybernetic Specialist | 2 | NEW | NO | NO | NO | Surveils and recycles graveyard cards. |
| 279 | Disruptor Pistol | 2 | NEW | NO | NO | NO | Costs six in total for 5 damage to a creature. |
| 280 | Howling Mine | 2 | REPRINT | NO | NO | NO | Draws for every player, opponents included. |
| 281 | Isolinear Processor | 2 | NEW | NO | NO | NO | Makes artifact-only mana and loots. |
| 282 | Lightning Greaves | 2 | REPRINT | NO | NO | NO | Its shroud stops our own targeting (Sorin, Skullclamp equips). |
| 283 | Mind Stone | 2 | REPRINT | NO | NO | NO | Was cut 2026-08-03 as a vanilla rock (0 of 8 field lists), and the grounds hold. |
| 284 | Replicator | 2 | NEW | NO | NO | NO | Copies one token a turn for {2}. |
| 285 | Swiftfoot Boots | 2 | REPRINT | NO | NO | NO | Gives one creature haste and hexproof. |
| 286 | Tea, Earl Grey, Hot | 2 | NEW | NO | NO | NO | It's a cantrip Food. |
| 287 | Thought Vessel | 2 | REPRINT | NO | NO | NO | Taps for colourless and lifts the hand limit. |
| 288 | Type-2 Phaser | 2 | NEW | NO | NO | NO | Stuns one creature, then equips for {3}. |
| 289 | U.S.S. Defiant, Mirror Migrant | 2 | NEW | NO | NO | NO | Phases out one creature at flash speed. |
| 290 | Warp Core | 2 | NEW | NO | NO | NO | Finds a basic, then charges Spacecraft. |
| 291 | Class-F Shuttlecraft | 3 | NEW | NO | NO | NO | Taps for any colour at MV3. The ramp seats are full. |
| 292 | Combadge | 3 | NEW | NO | NO | NO | Makes Communicator carriers unblockable. |
| 293 | Commander's Sphere | 3 | REPRINT | NO | NO | NO | It's a three-mana rock. |
| 294 | Darksteel Plate | 3 | REPRINT | NO | NO | NO | Gives one creature indestructible. |
| 295 | Herald's Horn | 3 | REPRINT | NO | IN | IN | In combat and sacrifice. b4 passed it because its fast mana is faster and also pays for non-Vampire spells. |
| 296 | I.K.S. Negh'Var, Imperial Flagship | 3 | NEW | NO | NO | NO | Gives vigilance to Klingons and Warriors. |
| 297 | K't'inga-Class Battle Cruiser | 3 | NEW | NO | NO | NO | Gives flying to Klingons and Warriors. |
| 298 | S.S. Botany Bay | 3 | NEW | NO | NO | NO | Exiles graveyard cards and needs eight station. |
| 299 | Starfleet Communicator | 3 | NEW | NO | NO | NO | Two copies on two attackers draw two a turn (four under Windcrag Siege). Combat's draw meets the aim, and Kurn draws more for less. |
| 300 | Sword of Light and Shadow | 3 | REPRINT | NO | NO | NO | Gains 3 and regrows a creature per hit, on one equipped attacker. |
| 301 | The Guardian of Forever | 3 | NEW | NO | NO | NO | Blinks a nontoken creature for {4}, and the return isn't a cast. |
| 302 | U.S.S. Enterprise-D, Galaxy-Class | 3 | NEW | NO | NO | NO | Tapping any creature for station, a fresh eminence token included, exiles the top card to play once a turn. Sacrifice's draw already counts 11 sources. |
| 303 | U.S.S. Stargazer, Here and There | 3 | NEW | NO | NO | NO | Makes a temporary attacker after six station. |
| 304 | Class-4 Tactical Cube | 4 | NEW | NO | NO | NO | Makes two artifact tokens and pumps artifact creatures. |
| 305 | Door of Destinies | 4 | REPRINT | NO | IN | NO | In combat. In b4 and sacrifice its anthem pushes tokens past Welcoming Vampire's power-2 window. |
| 306 | Hedron Archive | 4 | REPRINT | NO | NO | NO | It's a four-mana rock. |
| 307 | K'Vort-Class Raider | 4 | NEW | NO | NO | NO | Gives our creatures hexproof only during our turn. |
| 308 | Queen's Diamond | 4 | NEW | NO | NO | NO | Makes mana only for the commander, after station. |
| 309 | Reconnaissance Partition | 4 | NEW | NO | NO | NO | Draws two or fetches lands at MV4. |
| 310 | Stonespeaker Crystal | 4 | REPRINT | NO | NO | NO | It's a four-mana rock with graveyard hate. |
| 311 | The Sword of Kahless | 4 | NEW | NO | NO | NO | Digs for Klingons and Warriors. |
| 312 | Unwinding Clock | 4 | REPRINT | NO | NO | NO | Untaps artifacts, and the Bracket 3 lists have few. |
| 313 | Alhammarret's Archive | 5 | REPRINT | NO | NO | SIDE | Doubles every life gain and every draw past the first in the draw step, so Skullclamp draws four and Vito's drains double. Benched in sacrifice behind Anowon. |
| 314 | Forsaken Monument | 5 | REPRINT | NO | NO | NO | Pays off colourless creatures. |
| 315 | Sickbay | 5 | NEW | NO | NO | NO | Gains 1 per creature entering, at five mana. |
| 316 | Starship Enterprise | 5 | NEW | NO | NO | NO | Needs 16 station. |
| 317 | U.S.S. Cerritos, Following Up | 5 | NEW | NO | NO | NO | Makes two Officers at MV5. |
| 318 | U.S.S. Enterprise-C, Time-Tossed | 5 | NEW | NO | NO | NO | Wheels our own hand at MV5. |
| 319 | U.S.S. Prometheus, Prototype | 5 | NEW | NO | NO | NO | Needs eight station. |
| 320 | Command Chair | 6 | NEW | NO | NO | NO | Costs six, and its X mode needs Edgar on the battlefield (a commander in the command zone isn't controlled, CR 903.3d). |
| 321 | The Immortal Sun | 6 | REPRINT | NO | NO | NO | Shuts off our own planeswalkers (Sorin, Elspeth). |
| 322 | U.S.S. Defiant, Tough Little Ship | 6 | NEW | NO | NO | NO | Kills an artifact or enchantment at MV6. |
| 323 | U.S.S. Farragut, Bold Explorer | 6 | NEW | NO | NO | NO | Cheats creatures on landfall at MV6. |
| 324 | The Holodeck | 7 | NEW | NO | NO | NO | Costs seven for one permanent a turn from the graveyard. |
| 325 | Crystalline Entity | 8 | NEW | NO | NO | NO | Destroys every nonartifact creature, ours included. |
| 326 | Planet Killer | 8 | NEW | NO | NO | NO | It's an eight-mana beater. |
| 327 | Deep Space 9 | 9 | NEW | NO | NO | NO | Costs nine. |

### Lands (#328 to #373)

| # | Name | MV | New? | b4 | combat | sacrifice | Reason |
|---|---|---|---|---|---|---|---|
| 328 | Artificial Anomaly | 0 | NEW | NO | NO | NO | Taps for colourless and drains slowly. |
| 329 | Bajor | 0 | NEW | NO | NO | NO | Enters tapped as a red-white land. |
| 330 | Battlefield Forge | 0 | REPRINT | NO | NO | NO | Was cut 2026-08-03 as a painland for a light colour. |
| 331 | Blood Crypt | 0 | REPRINT | IN | IN | IN | Already in all three lists. |
| 332 | Canyon Slough | 0 | REPRINT | NO | NO | NO | Enters tapped as a black-red cycler. |
| 333 | Cardassia Prime | 0 | NEW | NO | NO | NO | Enters tapped as a white-black land. |
| 334 | Clifftop Retreat | 0 | REPRINT | NO | NO | NO | Taps for red or white, and the lists' red seats are covered (FRA review grounds). |
| 335 | Command Beacon | 0 | REPRINT | NO | NO | NO | Moving Edgar to hand gives up eminence from the command zone. |
| 336 | Command Tower | 0 | REPRINT | IN | IN | IN | Already in all three lists. |
| 337 | Dragonskull Summit | 0 | REPRINT | NO | IN | IN | In combat and sacrifice. b4's black-red seats are untapped duals with basic types. |
| 338 | Eclipsed Steppe | 0 | REPRINT | NO | NO | NO | Enters tapped unless we control two basics, and the lists run few. |
| 339 | Evolving Wilds | 0 | REPRINT | NO | NO | NO | Fetches a tapped basic. |
| 340 | Exotic Orchard | 0 | REPRINT | IN | NO | NO | In b4. Cut from the Bracket 3 lists on 2026-08-03 as pod-dependent. |
| 341 | Fabled Passage | 0 | REPRINT | NO | NO | NO | Has few basics to find and enters them tapped early (FRA review grounds). |
| 342 | Federation Outpost | 0 | NEW | NO | NO | NO | Taps for white only. |
| 343 | Foreboding Ruins | 0 | REPRINT | NO | NO | NO | It's a black-red reveal land, and the black-red seats are full. |
| 344 | Furycalm Snarl | 0 | REPRINT | NO | NO | NO | It's a red-white reveal land for the lightest colour. |
| 345 | Glittering Massif | 0 | REPRINT | NO | NO | NO | Enters tapped as a red-white cycler. |
| 346 | Godless Shrine | 0 | REPRINT | IN | IN | IN | Already in all three lists. |
| 347 | Isolated Chapel | 0 | REPRINT | NO | IN | IN | In combat and sacrifice. b4's white-black seats are untapped duals. |
| 348 | Mountain | 0 | REPRINT | NO | IN | IN | In combat and sacrifice. b4 runs no Mountain because red is 4 pips and the fetches find red duals. |
| 349 | Mutavault | 0 | REPRINT | NO | NO | NO | Taps for colourless in a three-colour base. |
| 350 | Nomad Outpost | 0 | REPRINT | NO | NO | NO | Always enters tapped. Savai Triome covers the fixing. |
| 351 | Path of Ancestry | 0 | REPRINT | NO | IN | IN | In combat and sacrifice. b4 keeps Savai Triome as its one tapped land. |
| 352 | Plains | 0 | REPRINT | IN | NO | IN | In b4 and sacrifice. Combat traded its Plains for Emeria's Call and Witch Enchanter on 2026-09-10, and nothing there reads the Plains type. |
| 353 | Qo'noS | 0 | NEW | NO | NO | NO | Enters tapped as a black-red land. |
| 354 | Quark's Bar | 0 | NEW | NO | NO | NO | Taps for red only. |
| 355 | Radiant Summit | 0 | REPRINT | NO | NO | NO | Enters tapped unless we control two basics (FRA review grounds). |
| 356 | Reliquary Tower | 0 | REPRINT | NO | NO | NO | Taps for colourless. |
| 357 | Rogue's Passage | 0 | REPRINT | NO | NO | NO | Taps for colourless and makes one creature unblockable for {4}. |
| 358 | Sacred Foundry | 0 | REPRINT | IN | IN | IN | Already in all three lists. |
| 359 | Shattered Landscape | 0 | REPRINT | NO | NO | NO | Fetches a tapped basic, and its cycling costs three colours. |
| 360 | Shineshadow Snarl | 0 | REPRINT | NO | NO | NO | It's a white-black reveal land, and the white-black seats are untapped already. |
| 361 | Smoldering Marsh | 0 | REPRINT | NO | NO | NO | Enters tapped unless we control two basics. |
| 362 | Spatial Anomaly | 0 | NEW | NO | NO | NO | Taps for colourless with a slow ping. |
| 363 | Spire of Industry | 0 | REPRINT | NO | NO | NO | Taps for colourless until an artifact lands, and b4's rainbow seats are filled. |
| 364 | Starfleet Academy | 0 | NEW | NO | NO | NO | Taps for colourless with a costly ability. |
| 365 | Subspace Anomaly | 0 | NEW | NO | NO | NO | Taps for colourless with a slow token ability. |
| 366 | Swamp | 0 | REPRINT | IN | IN | IN | Already in all three lists. |
| 367 | Temple of Malice | 0 | REPRINT | NO | NO | NO | Enters tapped as a black-red scry land. |
| 368 | Temple of the False God | 0 | REPRINT | NO | NO | NO | Taps for colourless and does nothing early. |
| 369 | Terramorphic Expanse | 0 | REPRINT | NO | NO | NO | Fetches a tapped basic. |
| 370 | The Unicomplex | 0 | NEW | NO | NO | NO | Taps for black only. |
| 371 | Umbral Expanse | 0 | REPRINT | NO | NO | NO | Enters tapped as a white-black cycler. |
| 372 | Unexplored Territory | 0 | NEW | NO | NO | NO | Taps for colourless or fetches a tapped basic. |
| 373 | Vault of Champions | 0 | REPRINT | IN | IN | IN | Already in all three lists. |

## Proposed swaps

### 1. `combat`: Concerted Effort in, Vampire Nocturnus out

In, [Concerted Effort](https://scryfall.com/search?q=%21%22Concerted+Effort%22) ({2}{W}{W}, enchantment, TRC reprint):

> At the beginning of each upkeep, creatures you control gain flying until end of turn if a
> creature you control has flying. The same is true for fear, first strike, double strike,
> landwalk, protection, trample, and vigilance.

Out, [Vampire Nocturnus](https://scryfall.com/search?q=%21%22Vampire+Nocturnus%22) ({1}{B}{B}{B}, Vampire 3/3):

> Play with the top card of your library revealed. As long as the top card of your library is
> black, this creature and other Vampire creatures you control get +2/+1 and have flying.

**The deciding axis is reliability (§2.3).** Both cards are combat's conditional team evasion at
mana value 4, so the question is how often each condition holds.

**Grounds.**

- Nocturnus is on only while the top card is black. Combat has 39 black cards among its 99, so
  that's about 39% of turns, re-rolled with every draw.
- Concerted Effort needs one creature with flying at the start of an upkeep. Combat runs seven
  flying creature cards ([Bloodline Keeper](https://scryfall.com/search?q=%21%22Bloodline+Keeper%22) and its 2/2 flying tokens,
  [Drana, Liberator of Malakir](https://scryfall.com/search?q=%21%22Drana%2C+Liberator+of+Malakir%22), Malakir Bloodwitch, [Bloodletter of Aclazotz](https://scryfall.com/search?q=%21%22Bloodletter+of+Aclazotz%22), Mirkwood Bats,
  [Nighthawk Scavenger](https://scryfall.com/search?q=%21%22Nighthawk+Scavenger%22) and Scheming Silvertongue), plus [Elspeth, Storm Slayer](https://scryfall.com/search?q=%21%22Elspeth%2C+Storm+Slayer%22)'s 0 ability
  and [Emeria's Call](https://scryfall.com/search?q=%21%22Emeria's+Call%22)'s Angels.
- It spreads the other listed keywords too. [Edgar Markov](https://scryfall.com/search?q=%21%22Edgar+Markov%22), Drana, [Stromkirk Captain](https://scryfall.com/search?q=%21%22Stromkirk+Captain%22) and
  Florian carry first strike, so the whole team gets it. Charismatic Conqueror and Dusk Legion
  Duelist carry vigilance, so the team attacks and stays untapped. That lets
  [Captivating Vampire](https://scryfall.com/search?q=%21%22Captivating+Vampire%22) tap five Vampires to steal after combat and Bloodline Keeper tap for a
  token after attacking. Malakir Bloodwitch's protection from white reaches every creature.
- It triggers on every player's upkeep, so our creatures also fly as blockers on opponents' turns.
- The effect covers only the creatures on the battlefield when it resolves (CR 611.2c). Creatures
  cast later in our turn don't fly that turn, but they're summoning-sick anyway.
- It's an enchantment, so a creature wipe leaves it in place.

**Self-hits (§1.3).** None. It affects only our creatures, and protection from white blocks none
of our own targeting, because [Sorin, Imperious Bloodlord](https://scryfall.com/search?q=%21%22Sorin%2C+Imperious+Bloodlord%22), Captivating Vampire and Bloodline
Keeper are black and Akroma's Will, [Unbreakable Formation](https://scryfall.com/search?q=%21%22Unbreakable+Formation%22) and Elspeth don't target.

**What we give up.** Nocturnus's +2/+1 to every Vampire on the turns it's on, its revealed top
card, a Vampire body (an eminence token on cast, and {B}{B}{B} with Herald's Horn or Urza's
Incubator), and one black card from its own count.

**Cut check (eval-011, tool-019).** Concerted Effort's trigger words are "upkeep", "flying" and
the keyword list. Nocturnus grants flying itself, but it doesn't care about Concerted Effort and
Concerted Effort doesn't feed it. The records nominate Nocturnus once, on 2026-09-10, as the weakest
evasion card (for Infantry Shield). The pilot hasn't ruled on it or protected it.

**Evasion role, ranked against the current list (§2.1).**

| Card | MV | Evasion it gives | Condition | Other text | Call |
|---|---|---|---|---|---|
| Malakir Bloodwitch | 5 | Flying and protection from white, on itself | none | ETB drain per Vampire | Keep, the pilot's finisher (2026-09-28) |
| Shadow Alley Denizen | 1 | Intimidate for one creature per black creature entering | a black creature enters, and each eminence token is black | 1-drop Vampire | Keep |
| Vampire Nocturnus | 4 | +2/+1 and flying for every Vampire | top card black, about 39% of turns | top card revealed | Cut |
| Concerted Effort (in) | 4 | Flying, first strike, vigilance and protection for every creature | one flier at the upkeep | enchantment | In |

**Other cuts considered.** Door of Destinies (mana value 4, but an anthem that the 2026-09-03 note
kept because every Vampire cast grows it). Vampire Cutthroat and Blade of the Bloodchief, the
2026-09-10 weakest picks, both mana value 1, so either one costs three points of curve.
[Shadow Alley Denizen](https://scryfall.com/search?q=%21%22Shadow+Alley+Denizen%22), a 1-drop Vampire whose intimidate fires on every eminence token.

**Curve.** Mana value 4 for 4. Avg MV stays 2.95, MV ≤ 2 stays 23 and MV ≤ 3 stays 46. Creature
cards 39 → 38.

### 2. `combat`: Rite of Ascension in, Mavren Fein out

In, [Rite of Ascension](https://scryfall.com/search?q=%21%22Rite+of+Ascension%22) ({2}{R}{W}, enchantment, TRC new):

> Battlefront — Whenever you attack, for each opponent you attacked this turn, create a tapped and
> attacking 2/1 red Klingon Warrior creature token with haste.

Out, [Mavren Fein, Dusk Apostle](https://scryfall.com/search?q=%21%22Mavren+Fein%2C+Dusk+Apostle%22) ({2}{W}, legendary Vampire Cleric 2/2):

> Whenever one or more nontoken Vampires you control attack, create a 1/1 white Vampire creature
> token with lifelink.

**The deciding axis is output per attack.** Both are combat's token makers that fire when we
attack, and Windcrag Siege doubles both (ledger trig-034).

**Grounds.**

- Attacking all three opponents, Rite makes three 2/1 haste Warriors that are already in the
  attack, six under Windcrag Siege. Mavren makes one 1/1 that isn't attacking, two under Siege.
- Each Warrior entering deals 1 to each opponent through Warleader's Call (and gets +1/+1 from it),
  2 to each through Purphoros, and 1 to each through Mirkwood Bats for the creation. Bloodletter of
  Aclazotz doubles all of it on our turn, and Elspeth doubles the tokens.
- The Warriors stay after combat. They chump-block, swing again next turn, and die into
  [Blood Artist](https://scryfall.com/search?q=%21%22Blood+Artist%22) and [Cruel Celebrant](https://scryfall.com/search?q=%21%22Cruel+Celebrant%22).
- Rite is an enchantment, so it survives a creature wipe and rebuilds on the next attack. Mavren
  dies to every wipe and to spot removal.
- Rite needs no Vampire attacker, while Mavren needs a nontoken Vampire to attack.

**Self-hits (§1.3).** Olivia's Wrath kills the Warriors, which aren't Vampires. They miss the
Vampire lords, Shared Animosity, Sanctum Seeker and Crossway Troublemakers' deathtouch and lifelink,
and they never "attacked" (CR 508.4), so they add no attack triggers. Rite costs {2}{R}{W} with no
discount (it isn't a creature spell), and it's combat's ninth red card against 18 red sources.

**What we give up.** Mavren's lifelink Vampire tokens, which the lords pump and whose hits are gain
events for [Vito, Thorn of the Dusk Rose](https://scryfall.com/search?q=%21%22Vito%2C+Thorn+of+the+Dusk+Rose%22). A Vampire body, which makes an eminence token on cast
and costs {W} with Urza's Incubator. One of the six attack triggers Windcrag Siege doubled when it
came in (2026-09-28), though Rite brings a larger one.

**Cut check (eval-011, tool-019).** Rite's trigger words are "attack" and "create". Mavren's text
has both, but Rite's tokens are neither nontoken nor Vampires and never attacked, so Rite doesn't
feed Mavren, and Mavren doesn't feed Rite. The records name Mavren only as a beneficiary of Windcrag
Siege and Anointed Procession, and nobody protected it.

**Token Makers role, ranked against the current list (§2.1).**

| Card | MV | Tokens | Condition | Other text | Call |
|---|---|---|---|---|---|
| Bloodline Keeper | 4 | A 2/2 flier each turn | tap | becomes a +2/+2 lord at five Vampires | Keep |
| Elenda, the Dusk Rose | 4 | X lifelink Vampires when she dies | she dies | lifelink, grows per death | Keep |
| Charismatic Conqueror | 2 | A 1/1 lifelink Vampire per untapped opposing entry | the opponent doesn't tap it | taxes rocks and creatures, vigilance | Keep, the 2026-08-25 punisher pair with Blood Seeker, kept again 2026-09-14 |
| Mavren Fein | 3 | One 1/1 lifelink Vampire per attack | a nontoken Vampire attacks | none | Cut |
| Rite of Ascension (in) | 4 | Three 2/1 haste attackers per attack | we attack all three opponents | enchantment | In |

**Other cuts considered.** Door of Destinies (mana value 4, so the curve holds, but it's an anthem
that grows with every Vampire cast). Vampire Cutthroat and Blade of the Bloodchief (the 2026-09-10
weakest picks, at a three-point curve cost). Vampire Nocturnus goes in swap 1.

**Curve.** Mana value 3 → 4. Avg MV 2.95 → 2.97, MV ≤ 2 stays 23, MV ≤ 3 46 → 45. With swap 1,
creature cards 39 → 37.

### 3. `sacrifice`: Rite of Oblivion in, Akroma's Will out

In, [Rite of Oblivion](https://scryfall.com/search?q=%21%22Rite+of+Oblivion%22) ({W}{B}, sorcery, TRC reprint):

> As an additional cost to cast this spell, sacrifice a nonland permanent. Exile target nonland
> permanent. Flashback {2}{W}{B}

Out, [Akroma's Will](https://scryfall.com/search?q=%21%22Akroma's+Will%22) ({3}{W}, instant):

> Choose one. If you control a commander as you cast this spell, you may choose both instead.
> • Creatures you control gain flying, vigilance, and double strike until end of turn.
> • Creatures you control gain lifelink, indestructible, and protection from each color until end
> of turn.

**The deciding axis is fit to the plan.** Sacrifice wins by making its own creatures die. Rite
turns one of those deaths into removal, and Akroma's Will keeps creatures alive.

**Grounds.**

- Rite exiles any nonland permanent, and flashback does it again for {2}{W}{B}. Flashback carries
  the additional cost too (CR 702.34a), so each cast sacrifices a permanent.
- Here the sacrifice is an eminence token, and that's a death (CR 700.4). Blood Artist, Cruel
  Celebrant and [Vengeful Bloodwitch](https://scryfall.com/search?q=%21%22Vengeful+Bloodwitch%22) drain, [Edgar, Ancient Bloodlord](https://scryfall.com/search?q=%21%22Edgar%2C+Ancient+Bloodlord%22) gains 1,
  [Cordial Vampire](https://scryfall.com/search?q=%21%22Cordial+Vampire%22) and [Elenda, the Dusk Rose](https://scryfall.com/search?q=%21%22Elenda%2C+the+Dusk+Rose%22) grow, Blade of the Bloodchief adds counters,
  Mirkwood Bats pings for the sacrificed token, and Grave Pact and [Dictate of Erebos](https://scryfall.com/search?q=%21%22Dictate+of+Erebos%22) make each
  opponent sacrifice a creature. A clamped token also draws two from Skullclamp.
- Exile beats indestructible and recursion, and it answers artifacts, enchantments and
  planeswalkers. The pilot's 2026-09-28 rule ("generous gift is permanent destruction") values that
  kind of answer, and this one adds to it without touching Generous Gift.
- Akroma's Will is double-moded only with Edgar on the battlefield, because a commander in the
  command zone isn't controlled (CR 903.3d, ledger zone-029). Its attack mode needs an attack, and
  this list rarely attacks (2026-09-14). Its protection mode keeps alive the creatures this list
  wants dead, which the 2026-09-15 interaction ranking noted when it put the card 10th of 12.

**Self-hits (§1.3).** None. Rite needs a nonland permanent to sacrifice, and eminence supplies one
per Vampire cast. A Treasure from [Smothering Tithe](https://scryfall.com/search?q=%21%22Smothering+Tithe%22), Deadly Dispute or Black Market Connections
also works.

**What we give up.** The kill turn the 2026-09-10 and 2026-09-14 notes kept it for: Edgar on the
battlefield, a wide attack with double strike and lifelink, and Vito turning every lifelink hit into
a drain. Also the second instant that saves the board from a wipe. [Teferi's Protection](https://scryfall.com/search?q=%21%22Teferi's+Protection%22) stays,
so protection goes from 2 cards to 1 and removal from 5 to 6.

**Cut check (eval-011, tool-019).** Rite's trigger words are "sacrifice" and the deaths it causes.
Akroma's Will has neither, so Rite doesn't feed it. Dictate of Erebos, last in the 2026-09-15
ranking, triggers on every Rite sacrifice ("Whenever a creature you control dies"), so it isn't a
cut for Rite. Akroma's Will was a "keep" on 2026-09-14 on the Edgar-out kill-turn grounds, which
still hold only on turns when Edgar is out and the list attacks. The pilot never protected it.

**Interaction, the bottom of the 2026-09-15 ranking re-scored against the current list (§2.1).**

| Rank | Card | MV | What it does here | Call |
|---|---|---|---|---|
| 9 | Generous Gift | 3 | Answers any permanent at instant speed and hands over a 3/3 | Keep, the pilot's rule (2026-09-28) |
| 10 | Akroma's Will | 4 | Both modes only with Edgar out. The attack mode needs an attack, and the protection mode fights the plan | Cut |
| 11 | Anowon, the Ruin Sage | 5 | Each upkeep every player sacrifices a non-Vampire, ours included (Mirkwood Bats, Witch Enchanter) | Bench seat for Worf and Archive |
| 12 | Dictate of Erebos | 5 | A second Grave Pact, with flash | Not a cut, because Rite feeds it |

**Other cuts considered.** [Ruthless Lawbringer](https://scryfall.com/search?q=%21%22Ruthless+Lawbringer%22) and Generous Gift, the two any-permanent answers
that the pilot's rule keeps. Anowon, a repeating edict that stays and becomes the bench seat.
Teferi's Protection, a Game Changer that survives anything.

**Curve.** Mana value 4 → 2. Avg MV 2.95 → 2.92, MV ≤ 2 24 → 25, MV ≤ 3 44 → 45.

### 4. `sacrifice`: Troubling Tribbles in, Infantry Shield out

In, [Troubling Tribbles](https://scryfall.com/search?q=%21%22Troubling+Tribbles%22) ({2}{W}, Tribble creature, TRK new):

> This creature can't block. At the beginning of your upkeep, create a token that's a copy of this
> creature.

Out, [Infantry Shield](https://scryfall.com/search?q=%21%22Infantry+Shield%22) ({2}{R}, Equipment):

> Equipped creature has menace and mobilize X, where X is its power. (Whenever it attacks, create X
> tapped and attacking 1/1 red Warrior creature tokens. Sacrifice them at the beginning of the next
> end step.) Equip {2}

**The deciding axis is fodder without attacking.** Both are sacrifice's token engines. The Shield
needs an equip and an attack, and this list rarely attacks (2026-09-14).

**Grounds.**

- Every copy carries the upkeep trigger, so the Tribbles double each upkeep: 1, 2, 4, 8. Anointed
  Procession makes each trigger create two copies, so the count triples, and with Elspeth too each
  trigger makes four.
- Each Tribble created pings each opponent for 1 through Mirkwood Bats, and each one entering deals
  2 to each opponent through Purphoros.
- Each Tribble sacrificed is a death for Blood Artist, Cruel Celebrant, Vengeful Bloodwitch, Grave
  Pact and Dictate, and two cards on Skullclamp. Mirkwood Bats pings again for the sacrificed token.
- The Shield came in on 2026-09-03 on three grounds: Skullclamp drawing 2X for X, X edicts through
  Grave Pact and Dictate, and Elspeth doubling mobilize. The Tribbles meet all three every upkeep
  with no equip cost and no attack. The Clamp draw line stays, and no draw card leaves, which
  respects the pilot's 2026-09-28 rule.
- Anowon's upkeep edict takes a Tribble instead of Mirkwood Bats or [Witch Enchanter](https://scryfall.com/search?q=%21%22Witch+Enchanter%22). Order the
  two upkeep triggers so the Tribbles' copies resolve first (CR 603.3b).

**Self-hits (§1.3).** Olivia's Wrath and [The Meathook Massacre](https://scryfall.com/search?q=%21%22The+Meathook+Massacre%22)'s -X/-X shrink every
non-Vampire, Tribbles included. Tribbles can't block, and they aren't Vampires (no eminence token,
no lords, no Incubator or Horn discount). With Purphoros and the Bats out, every Tribble is table
damage, so the pod will notice it.

**What we give up.** The Shield's burst. Edgar equipped and attacking at power 6 to 8 makes that
many Warriors at once (twice that with Elspeth), and they all die at end step even with no outlet.
Also menace on the equipped attacker, and one of sacrifice's three red cards.

**Cut check (eval-011, tool-019).** The Tribbles' trigger words are "upkeep", "create" and "copy".
The Shield's text has "create", but a Tribble carrying the Shield would mobilize only for its own
power, so the Tribbles don't feed it. Mirkwood Bats and Purphoros are fed by the Tribbles, so
neither is a cut. The Shield was the pilot's call on 2026-09-03 (over Bastion of Remembrance), and
nobody protected it.

**Token engines in sacrifice, ranked against the current list (§2.1).**

| Card | MV | Tokens | Needs | Call |
|---|---|---|---|---|
| Edgar Markov (eminence) | 6 | One 1/1 Vampire per Vampire cast | a Vampire spell, from the command zone | Commander |
| Bloodline Keeper | 4 | A 2/2 flier each turn | tap | Keep |
| Elenda, the Dusk Rose | 4 | X lifelink Vampires when she dies | she dies | Keep |
| Charismatic Conqueror | 2 | A 1/1 lifelink Vampire per untapped opposing entry | the opponent doesn't tap it | Keep, the 2026-08-25 punisher pair with Blood Seeker |
| Black Market Connections | 3 | A 3/2 changeling for 3 life | each first main phase | Keep, a draw card |
| Infantry Shield | 3 | X 1/1 Warriors per attack, gone at end step | equip {2} and an attack | Cut |
| Troubling Tribbles (in) | 3 | A doubling copy each upkeep | nothing | In |

**Other cuts considered.** Blade of the Bloodchief and [Blood Seeker](https://scryfall.com/search?q=%21%22Blood+Seeker%22), which the pilot keeps.
Mirkwood Bats and Purphoros, which the Tribbles feed. Captivating Vampire, a lord whose steal is
removal with a free outlet.

**Curve.** Mana value 3 for 3, so avg MV holds. With swap 3, avg MV 2.95 → 2.92, MV ≤ 2 25 and
MV ≤ 3 45.

## Bench

### `b4`: Salt Vampire, displacing Legion Lieutenant

[Salt Vampire](https://scryfall.com/search?q=%21%22Salt+Vampire%22) ({1}{B}, Vampire Shapeshifter): "Lifelink. When this creature enters, look at
target opponent's hand. You may choose a nonland card from it. If you do, that player exiles that
card, then draws a card." As the set's only Vampire it makes an eminence token. Its entry shows us
one hand before a combo turn and swaps that player's counterspell or removal for a random card.
[Legion Lieutenant](https://scryfall.com/search?q=%21%22Legion+Lieutenant%22) is `b4`'s barest combat-package card, a two-mana lord for the second route,
and with a second lord out, eminence tokens enter past Welcoming Vampire's power-2 window. Salt Vampire
stays on the bench because the swap trades the combat route for disruption the opponent partly
refills, and [Silence](https://scryfall.com/search?q=%21%22Silence%22), [Cavern of Souls](https://scryfall.com/search?q=%21%22Cavern+of+Souls%22) and Teferi's Protection already guard the combo turn.
It isn't stax and it does something for us (a body, a token, information), so it passes the
2026-11-03 rule. Same mana value.

### `combat`: Kurn, Son of Mogh, displacing Vampire Cutthroat

[Kurn, Son of Mogh](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) ({2}{B}, legendary Klingon Warrior Officer): "Deathtouch. Battlefront —
Whenever Kurn attacks, you draw X cards and lose X life, where X is the number of opponents you
attacked this turn." Attacking all three opponents draws three, and Windcrag Siege makes it six.
Deathtouch discourages blocks, and the draw happens even if he dies in that combat. He waits on the
bench because combat's 9 draw sources already meet the 8 to 10 aim. He's a non-Vampire, so Olivia's
Wrath kills him and he makes no eminence token. [Vampire Cutthroat](https://scryfall.com/search?q=%21%22Vampire+Cutthroat%22) was the weakest cheap body on
2026-09-10 (a 1/1 with skulk and lifelink and no engine text). Curve cost: avg MV 2.95 → 2.98 and
MV ≤ 2 23 → 22.

### `combat`: Korok, Liberated Rage, displacing Door of Destinies

[Korok, Liberated Rage](https://scryfall.com/search?q=%21%22Korok%2C+Liberated+Rage%22) ({3}{W}, legendary artifact creature, Klingon Borg): "Battlefront —
Whenever Korok attacks, creatures you control get +X/+X until end of turn, where X is the number of
opponents you attacked this turn." With the attack split across three opponents that's +3/+3 to
every creature, Rite of Ascension's Warriors included, and +6/+6 under Windcrag Siege.
[Door of Destinies](https://scryfall.com/search?q=%21%22Door+of+Destinies%22) gives +1/+1 per Vampire spell cast, for good, to Vampires only. Korok hits
harder on the turns he attacks, but he's a non-Vampire legend that must survive a turn cycle, and
Olivia's Wrath kills him. Door keeps its counters through a creature wipe. Same mana value.

### `combat`: Own the Day, displacing Blade of the Bloodchief

[Own the Day](https://scryfall.com/search?q=%21%22Own+the+Day%22) ({4}{R}{R}, sorcery): "Battlefront — This spell costs {1} less to cast for each
opponent you attacked this turn. Untap all creatures that attacked this turn. After this main
phase, there is an additional combat phase followed by an additional main phase." After attacking
all three opponents it costs {1}{R}{R}. The second combat repeats Edgar's counters, Sanctum Seeker's
drain per attacking Vampire, [Vicious Conquistador](https://scryfall.com/search?q=%21%22Vicious+Conquistador%22), Mavren or Rite, and every Windcrag Siege
doubling. Rite's Warriors never attacked (CR 508.4), so they stay tapped. The August grounds that
passed All-Out Assault ("finisher, win-more") apply here too: it ends games the board is already
winning, which is why it's a bench card. [Blade of the Bloodchief](https://scryfall.com/search?q=%21%22Blade+of+the+Bloodchief%22) was the weakest combat
multiplier on 2026-09-10, because combat kills few of its own creatures. Curve cost: the tools
count the printed 6 (avg MV 2.95 → 3.03, MV ≤ 2 and MV ≤ 3 each −1), but it costs 3 as cast, and
it needs {R}{R} from 18 red sources.

### `combat`: Anguished Unmaking, displacing Generous Gift

[Anguished Unmaking](https://scryfall.com/search?q=%21%22Anguished+Unmaking%22) ({1}{W}{B}, instant, already in `b4`): "Exile target nonland permanent. You
lose 3 life." [Generous Gift](https://scryfall.com/search?q=%21%22Generous+Gift%22): "Destroy target permanent. Its controller creates a 3/3 green
Elephant creature token." Both answer any permanent at instant speed, so the pilot's 2026-09-28
rule holds either way. Unmaking exiles, which beats indestructible and recursion, and leaves no 3/3
to wall combat's tokens. Gift also hits lands and costs no life. It's a pod-dependent swap at the
same mana value.

### `sacrifice`: Alhammarret's Archive, displacing Anowon, the Ruin Sage

[Alhammarret's Archive](https://scryfall.com/search?q=%21%22Alhammarret's+Archive%22) ({5}, legendary artifact, TRC reprint): "If you would gain life, you gain
twice that much life instead. If you would draw a card except the first one you draw in each of
your draw steps, draw two cards instead." In sacrifice, Skullclamp draws four, Village Rites and
Deadly Dispute draw four, Bloodline Recollector's copy draws six, and Phyrexian Arena's upkeep draw
gives two because it isn't in the draw step. Every gain doubles, so Vito's drain per gain doubles
and [Indulging Patrician](https://scryfall.com/search?q=%21%22Indulging+Patrician%22)'s 3-life threshold comes easily. Twilight Prophet puts its card into
hand without drawing, and [Marauding Blight-Priest](https://scryfall.com/search?q=%21%22Marauding+Blight-Priest%22) counts gain events rather than amounts, so
neither changes. It stays on the bench because it costs five, does nothing the turn it lands, and
draw already counts 11 sources. [Anowon, the Ruin Sage](https://scryfall.com/search?q=%21%22Anowon%2C+the+Ruin+Sage%22) is the seat at the same mana value: the
2026-09-14 ranking recommended it as the cut for Pitiless Plunderer, the pilot held that swap, and
its edict hits our own non-Vampires.

### `sacrifice`: Worf, Intelligence Contractor, displacing Anowon, the Ruin Sage

[Worf, Intelligence Contractor](https://scryfall.com/search?q=%21%22Worf%2C+Intelligence+Contractor%22) ({2}{R}, legendary Klingon Warrior Spy): "When Worf enters, for
each opponent, gain control of up to one target creature that player controls with mana value 3 or
less until end of turn. Untap those creatures. Until end of turn, they become Warriors in addition
to their other types and gain haste." Sacrificed to a free outlet, each stolen creature is removal
and a death under our control. Death triggers look back at the creature as it left the battlefield
(CR 603.10a), so Cruel Celebrant and Vengeful Bloodwitch drain, and Grave Pact and Dictate each make
every opponent sacrifice another creature. With both out, each of the three deaths makes every
opponent sacrifice two more creatures. He stays on the bench because the steal reaches only mana value 3 or less, it's a
one-shot ([Phyrexian Reclamation](https://scryfall.com/search?q=%21%22Phyrexian+Reclamation%22) can buy it back), and red is sacrifice's lightest colour at 17
sources. Anowon repeats its edict every upkeep, and Worf does the job at once for two less mana.
After his trigger Worf is a non-Vampire that Anowon's own edict would take, which is another reason
to run one or the other. Curve: avg MV 2.95 → 2.92, MV ≤ 3 44 → 45.

### `sacrifice`: Vengeance Mission, displacing Kalastria Highborn

[Vengeance Mission](https://scryfall.com/search?q=%21%22Vengeance+Mission%22) ({2}{B}, enchantment): "Whenever a creature dies, put a quest counter on this
enchantment. Target opponent loses 1 life. That player loses 2 life instead if there are seven or
more quest counters on this enchantment." It counts every creature death, opponents' edict victims
included, costs no mana per trigger, and survives creature wipes, which then fuel it. It reads like
[Bastion of Remembrance](https://scryfall.com/search?q=%21%22Bastion+of+Remembrance%22), which sacrifice cut on 2026-09-03 for Infantry Shield because Twilight
Prophet's upkeep drain covered most of it, but Mission hits one opponent and gains nothing.
[Kalastria Highborn](https://scryfall.com/search?q=%21%22Kalastria+Highborn%22) costs {B} per trigger and counts only Vampires, but each trigger is 2 to a
player and 2 life, a gain event for Vito, Marauding Blight-Priest and Indulging Patrician (its
2026-09-03 keep grounds). [Roaming Throne](https://scryfall.com/search?q=%21%22Roaming+Throne%22) doubles Highborn and not Mission. Bench it for pods with
heavy creature removal. Curve: avg MV 2.95 → 2.97, MV ≤ 2 24 → 23.

## Near-misses and traps

**Near-misses: good cards in the wrong deck or behind a better seat.**

- **[Captain Jean-Luc Picard](https://scryfall.com/search?q=%21%22Captain+Jean-Luc+Picard%22) (combat).** He pumps every creature and makes a 1/1 Officer per
  creature spell, so each Vampire cast is two tokens and two Warleader's Call or Purphoros
  triggers. Combat already runs six anthem sources, and he's a Human 3-drop with no eminence token.
  He's the first reserve if an anthem leaves.
- **[Worf, Still Not Merry](https://scryfall.com/search?q=%21%22Worf%2C+Still+Not+Merry%22) (combat).** Each time he attacks he makes a 1/1 Faerie flier per
  attacking creature, twice under Windcrag Siege, so a wide board doubles. He's an MV5 legend that
  must survive a turn to attack, and Rite of Ascension does the job from an enchantment at MV4.
- **[Worf, Defiant Commander](https://scryfall.com/search?q=%21%22Worf%2C+Defiant+Commander%22) (combat).** Each attack exiles three cards to play, six under
  Siege, and he needn't attack himself. He's a non-Vampire 5-drop, and Kurn draws at MV3.
- **[Dr. Beverly Crusher](https://scryfall.com/search?q=%21%22Dr.+Beverly+Crusher%22) (sacrifice).** "If you gaining life causes a triggered ability of a
  permanent you control to trigger, that ability triggers an additional time." It's the lifegain
  version of Teysa, so by analogy with ledger trig-024 it doubles Vito and Blight-Priest but not an
  end-step check like Indulging Patrician's. Roaming Throne already doubles both because they're
  Vampires, so Crusher adds a third instance (CR 603.2d), and Anowon and Olivia's Wrath take her.
- **[Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22) (sacrifice).** For {2} and a tap she doubles one creature's
  triggers while she stays tapped. That overlaps Roaming Throne the same way, and it can't lift a
  "triggers only once each turn" cap (ledger trig-020).
- **[U.S.S. Enterprise-D, Galaxy-Class](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-D%2C+Galaxy-Class%22) (sacrifice).** A fresh eminence token stations it each
  turn for one card to play. Sacrifice's draw already counts 11.
- **[Ensign Harry Kim, Operations](https://scryfall.com/search?q=%21%22Ensign+Harry+Kim%2C+Operations%22) (sacrifice).** {2} and two +1/+1 counters draw a card with no
  per-turn cap, and Cordial Vampire makes counters fast. He's a Human, and draw is already full.
- **[Starfleet Communicator](https://scryfall.com/search?q=%21%22Starfleet+Communicator%22) (combat).** It copies itself on cast, and two equipped attackers
  draw two a turn, four under Siege. Kurn draws more for less.
- **[Chancellor Gorkon](https://scryfall.com/search?q=%21%22Chancellor+Gorkon%22) (sacrifice).** Sacrificed, it exiles two creatures. Worf, Intelligence
  Contractor does more for two less mana.
- **[Combat Celebrant](https://scryfall.com/search?q=%21%22Combat+Celebrant%22) and [World at War](https://scryfall.com/search?q=%21%22World+at+War%22) (combat).** Both give extra combats, but Own the Day
  does it for three mana from the hand after the first attack.

**Traps: cards that read like upgrades but aren't.**

- **[Quark, Humble Proprietor](https://scryfall.com/search?q=%21%22Quark%2C+Humble+Proprietor%22).** "You can't sacrifice Treasure tokens." A Treasure's mana
  ability is a sacrifice, so his Treasures and ours (Smothering Tithe, Deadly Dispute, Black Market
  Connections) make no mana while he's out.
- **[Command Chair](https://scryfall.com/search?q=%21%22Command+Chair%22).** Its X is "the greatest mana value among commanders you control", and Edgar
  in the command zone isn't controlled (CR 903.3d), so X is 0 until Edgar is on the battlefield.
- **Finality-counter cards** (Overflow Submatrix, Storied Veteran, U.S.S. Reliant). The creature
  exiles instead of dying (CR 122.1h), so death payoffs miss it.
- **Assimilate cards** ([Assimilate the Wounded](https://scryfall.com/search?q=%21%22Assimilate+the+Wounded%22), [Assimilation Assessor](https://scryfall.com/search?q=%21%22Assimilation+Assessor%22),
  [Borg Queen, Perfection Manifest](https://scryfall.com/search?q=%21%22Borg+Queen%2C+Perfection+Manifest%22), [Borg Cube](https://scryfall.com/search?q=%21%22Borg+Cube%22), [Death Is Irrelevant](https://scryfall.com/search?q=%21%22Death+Is+Irrelevant%22)). The stolen creature
  loses all other creature types, so it's never a Vampire.
- **[The Destruction of Praxis](https://scryfall.com/search?q=%21%22The+Destruction+of+Praxis%22).** X is the number of differently named lands we control, nearly
  every land in play here, so it kills both boards.
- **Symmetrical wipes** ([Wrath of God](https://scryfall.com/search?q=%21%22Wrath+of+God%22), [Austere Command](https://scryfall.com/search?q=%21%22Austere+Command%22), [Join the Collective](https://scryfall.com/search?q=%21%22Join+the+Collective%22),
  [Vanquish the Horde](https://scryfall.com/search?q=%21%22Vanquish+the+Horde%22), [Crystalline Entity](https://scryfall.com/search?q=%21%22Crystalline+Entity%22), [Chain Reaction](https://scryfall.com/search?q=%21%22Chain+Reaction%22), [Promise of Loyalty](https://scryfall.com/search?q=%21%22Promise+of+Loyalty%22),
  [The City on the Edge of Forever](https://scryfall.com/search?q=%21%22The+City+on+the+Edge+of+Forever%22), [Pest Control](https://scryfall.com/search?q=%21%22Pest+Control%22), [Toxic Deluge](https://scryfall.com/search?q=%21%22Toxic+Deluge%22)). Each one kills our own
  board, and every list already runs the one-sided Olivia's Wrath.
- **Token pumps in `b4` and `sacrifice`** ([Deanna Troi, Psychic Counsel](https://scryfall.com/search?q=%21%22Deanna+Troi%2C+Psychic+Counsel%22), Warleader's Call, Door
  of Destinies, Captain Jean-Luc Picard). Tokens entering at power 3 or more stop triggering
  Welcoming Vampire.
- **[Peace in Our Time](https://scryfall.com/search?q=%21%22Peace+in+Our+Time%22).** Every player may draw instead of attacking, which feeds the pod cards.

**Cute lines** (recorded because the pilot likes them, not proposed).

- **[Georgiou, Terran Emperor](https://scryfall.com/search?q=%21%22Georgiou%2C+Terran+Emperor%22) in `b4`.** "You don't lose the game for having 0 or less life."
  With Necropotence, pay life for the whole library. With Bolas's Citadel, cast the library from the
  top. Her own end-step trigger costs 3 life and draws a card, and at 0 life or less it makes ten
  Officers. She costs six for a third win route that the loops don't need.
- **[Koloth, Tribble Hunter](https://scryfall.com/search?q=%21%22Koloth%2C+Tribble+Hunter%22) with Blood Seeker and Charismatic Conqueror in `combat`.** Every end
  step each opponent gets two Tribbles. Blood Seeker drains 1 per opposing creature entering, 6 a
  turn at three opponents, and each Tribble that enters untapped is a lifelink token for us unless
  its owner taps it.
