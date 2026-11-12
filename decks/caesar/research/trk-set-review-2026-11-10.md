# TRK + TRC (Star Trek + Star Trek Commander) set review: Caesar, 2026-11-10

## Header

- **Sets.** TRK (Star Trek, 311 cards) and TRC (Star Trek Commander, 336 cards), both released on
  2026-11-13. Scryfall already lists every card in both as Commander-legal, so no card here is
  waiting on legality.
- **Method.** deck-brain `SKILL.md` §1 and §2, following `.claude/skills/set-review/reviewer.md`. Set
  cards come from the pool files (`data/trk-candidates-caesar.json`, `data/trc-candidates-caesar.json`),
  the deck's cards from the bundle's oracle dump of `main`, and rules from `rules/sections/` (CR
  2026-08-07). That CR predates both sets, so their new terms (battlefront, seek out, assimilate,
  "face a dilemma", beam me up) are read from the cards' reminder text and are **not verified against
  the CR**. Each candidate was costed in this deck's mana (the list runs no cost reducers), checked
  against the deck's own board (§1.3), and scored ability by ability (ledger eval-021). Its rules text
  was grepped against `research/decisions.md` (the deck has no `sideboard.md`) for functional reprints
  of cut cards (tool-017). Each MAIN's cut was grepped for the incoming card's trigger words (eval-011)
  and in the deck's records (tool-019).
- **Lists.** One list, `main` (Bracket 3), which is the target. The deck has no variant or pool lists.
- **EDHREC.** No data for either set yet, so the crowd lens (§2.2) is skipped.
- **Game Changers.** 3 before ([Smothering Tithe](https://scryfall.com/search?q=%21%22Smothering+Tithe%22), [Demonic Tutor](https://scryfall.com/search?q=%21%22Demonic+Tutor%22), [Teferi's Protection](https://scryfall.com/search?q=%21%22Teferi%27s+Protection%22)) and
  3 after. Neither set has a Game Changer.
- **Nothing here is applied.** Each MAIN is its own proposal for the pilot to accept or decline.

## Pool

373 unique cards fit {R}{W}{B}: 178 from TRK and 195 from TRC, with no card in both files. 274 are
new and 99 are reprints. 23 are already in `main`, all of them reprints: [Path to Exile](https://scryfall.com/search?q=%21%22Path+to+Exile%22),
[Swords to Plowshares](https://scryfall.com/search?q=%21%22Swords+to+Plowshares%22), [Anguished Unmaking](https://scryfall.com/search?q=%21%22Anguished+Unmaking%22), [Ruinous Ultimatum](https://scryfall.com/search?q=%21%22Ruinous+Ultimatum%22), [Warleader's Call](https://scryfall.com/search?q=%21%22Warleader%27s+Call%22),
[Arcane Signet](https://scryfall.com/search?q=%21%22Arcane+Signet%22), [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22), [Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22), [Swiftfoot Boots](https://scryfall.com/search?q=%21%22Swiftfoot+Boots%22), [Talisman of Hierarchy](https://scryfall.com/search?q=%21%22Talisman+of+Hierarchy%22),
[Talisman of Indulgence](https://scryfall.com/search?q=%21%22Talisman+of+Indulgence%22) and 12 lands ([Battlefield Forge](https://scryfall.com/search?q=%21%22Battlefield+Forge%22), [Clifftop Retreat](https://scryfall.com/search?q=%21%22Clifftop+Retreat%22),
[Command Tower](https://scryfall.com/search?q=%21%22Command+Tower%22), [Dragonskull Summit](https://scryfall.com/search?q=%21%22Dragonskull+Summit%22), [Isolated Chapel](https://scryfall.com/search?q=%21%22Isolated+Chapel%22), [Nomad Outpost](https://scryfall.com/search?q=%21%22Nomad+Outpost%22), [Blood Crypt](https://scryfall.com/search?q=%21%22Blood+Crypt%22),
[Godless Shrine](https://scryfall.com/search?q=%21%22Godless+Shrine%22), [Sacred Foundry](https://scryfall.com/search?q=%21%22Sacred+Foundry%22) and the three basics).

## Result

| List | MAIN | SIDE | IN | NO |
|---|---|---|---|---|
| main | 5 | 10 | 23 | 335 |

MAIN, each a separate decision:

1. [Troubling Tribbles](https://scryfall.com/search?q=%21%22Troubling+Tribbles%22) in, [Assemble the Legion](https://scryfall.com/search?q=%21%22Assemble+the+Legion%22) out.
2. [Vengeance Mission](https://scryfall.com/search?q=%21%22Vengeance+Mission%22) in, [Blood Artist](https://scryfall.com/search?q=%21%22Blood+Artist%22) out.
3. [Rite of Oblivion](https://scryfall.com/search?q=%21%22Rite+of+Oblivion%22) in, [Vanishing Verse](https://scryfall.com/search?q=%21%22Vanishing+Verse%22) out.
4. [Kurn, Son of Mogh](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) in, [Idol of Oblivion](https://scryfall.com/search?q=%21%22Idol+of+Oblivion%22) out.
5. [Vault of Champions](https://scryfall.com/search?q=%21%22Vault+of+Champions%22) in, one [Plains](https://scryfall.com/search?q=%21%22Plains%22) out.

SIDE, with the card each would displace:

- [Combat Celebrant](https://scryfall.com/search?q=%21%22Combat+Celebrant%22) would displace [Secure the Wastes](https://scryfall.com/search?q=%21%22Secure+the+Wastes%22).
- [Grand Crescendo](https://scryfall.com/search?q=%21%22Grand+Crescendo%22) would displace Secure the Wastes.
- [Rite of Ascension](https://scryfall.com/search?q=%21%22Rite+of+Ascension%22) would displace [Hero of Bladehold](https://scryfall.com/search?q=%21%22Hero+of+Bladehold%22).
- [Worf, Still Not Merry](https://scryfall.com/search?q=%21%22Worf%2C+Still+Not+Merry%22) would displace Hero of Bladehold.
- [L'Rell, Fierce Visionary](https://scryfall.com/search?q=%21%22L%27Rell%2C+Fierce+Visionary%22) would displace [Legion Warboss](https://scryfall.com/search?q=%21%22Legion+Warboss%22).
- [Kor, Cause of Vengeance](https://scryfall.com/search?q=%21%22Kor%2C+Cause+of+Vengeance%22) would displace Idol of Oblivion if swap 4 is declined.
- [Elim Garak, Simple Tailor](https://scryfall.com/search?q=%21%22Elim+Garak%2C+Simple+Tailor%22) would displace [Elas il-Kor, Sadistic Pilgrim](https://scryfall.com/search?q=%21%22Elas+il-Kor%2C+Sadistic+Pilgrim%22).
- [The Needs of the Many](https://scryfall.com/search?q=%21%22The+Needs+of+the+Many%22) would displace [Mithril Coat](https://scryfall.com/search?q=%21%22Mithril+Coat%22).
- [Eject the Warp Core](https://scryfall.com/search?q=%21%22Eject+the+Warp+Core%22) would displace Vanishing Verse if swap 3 is declined.
- [The Wrath of Khan](https://scryfall.com/search?q=%21%22The+Wrath+of+Khan%22) would displace Vanishing Verse if swap 3 is declined.

---

## Set mechanics as they matter to this deck

- **Battlefront** (an ability word) scales with "the number of opponents you attacked this turn". CR
  508.6 says a player has "attacked" another only by declaring attackers at them, and CR 508.4 says a
  creature put onto the battlefield attacking never "attacked". So the tokens from Caesar, Adeline,
  Hero and mobilize don't raise X, and a battlefront card reaches 3 only when you declare at least one
  attacker at each opponent. Battlefront triggers worded "whenever you attack" or "whenever this
  creature attacks" are caused by a creature attacking, so [Isshin, Two Heavens as One](https://scryfall.com/search?q=%21%22Isshin%2C+Two+Heavens+as+One%22) and
  [Windcrag Siege](https://scryfall.com/search?q=%21%22Windcrag+Siege%22) repeat them, on the same basis as ledger trig-034.
- **Seek out** ("whenever you draw your second card each turn") fires at most once a turn. This deck
  draws a second card on most of its own turns, but every seek out payoff in the pool is one small
  effect, so none made the cut.
- **Station** (CR 721) taps creatures at sorcery speed for charge counters equal to their power. A
  1/1 token adds one counter, and a creature tapped to station can't attack that turn. Every
  Spacecraft in the pool is a NO.
- **Assimilate** returns an opponent's creature card from a graveyard under your control. Grave Pact
  fills opponents' graveyards, but the assimilate cards cost 3 to 8 and are one-shots or slow.
- **"Face a dilemma"** happens "as you choose one or more modes for a spell or ability". Caesar's
  reflexive trigger ("choose two") and Black Market Connections ("choose one or more") both qualify
  under that reminder text and CR 700.2's definition of a mode. Elim Garak is the payoff worth a bench
  slot.
- **Beam me up** recasts a spell from the graveyard if you return a creature to hand. Returning a
  token makes it cease to exist, and that isn't a death (ledger trig-012), so it feeds nothing here.
- **+1/+1 counters and anthems.** Many white cards in TRK put counters on every creature or pump the
  team. Any of those on a 1/1 token switches off Skullclamp (ledger equip-027), so each one is scored
  with that cost.
- **The set's tokens** are mostly 1/1 Officers and Borgs and 2/1 haste Klingon Warriors. All of them
  die to Skullclamp's -1 toughness (a 2/1 becomes 3/0), so every token maker here feeds the draw
  engine unless an anthem is out.

---

## Classification table, all 373 cards

Verdict key: MAIN displaces a named card in `main` now. SIDE is worth benching, with the displaced
card named. IN means `main` already runs it. NO is a pass.

### White (97)

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 1 | [Command Subadjunct](https://scryfall.com/search?q=%21%22Command+Subadjunct%22) | 1 | NEW | NO | Vigilance for artifact creatures touches only Anim Pakal's Gnomes, Myrel's Soldiers and Loyal Apprentice's Thopters, on a vanilla 2/1. |
| 2 | [Dispatch](https://scryfall.com/search?q=%21%22Dispatch%22) | 1 | REPRINT | NO | Metalcraft is often on here, but [Path to Exile](https://scryfall.com/search?q=%21%22Path+to+Exile%22) and [Swords to Plowshares](https://scryfall.com/search?q=%21%22Swords+to+Plowshares%22) already fill the 1-mana exile slots. |
| 3 | [Emergency Medical Hologram](https://scryfall.com/search?q=%21%22Emergency+Medical+Hologram%22) | 1 | NEW | NO | A 0/1 that puts a +1/+1 counter on a creature. A counter on a token switches off [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) (ledger equip-027). |
| 4 | [Evasive Maneuvers](https://scryfall.com/search?q=%21%22Evasive+Maneuvers%22) | 1 | NEW | NO | It only helps a blocking creature, and this deck is the attacker. |
| 5 | [Path to Exile](https://scryfall.com/search?q=%21%22Path+to+Exile%22) | 1 | REPRINT | IN | Already in main (this set's reprint). |
| 6 | [Set Phasers to . . .](https://scryfall.com/search?q=%21%22Set+Phasers+to+.+.+.%22) | 1 | NEW | NO | A stun or 3 damage to an attacker. Path and Swords answer the same creatures for good. |
| 7 | [Swords to Plowshares](https://scryfall.com/search?q=%21%22Swords+to+Plowshares%22) | 1 | REPRINT | IN | Already in main (this set's reprint). |
| 8 | [70,000 Light-Years from Home](https://scryfall.com/search?q=%21%2270%2C000+Light-Years+from+Home%22) | 2 | NEW | NO | Sorcery-speed exile for 2. Path and Swords do it at instant speed for 1. |
| 9 | [Antagonist Incorporator](https://scryfall.com/search?q=%21%22Antagonist+Incorporator%22) | 2 | NEW | NO | Its token rider needs artifact creatures to connect and {1} each time. Few of this deck's tokens are artifacts. |
| 10 | [Assembly Specialist](https://scryfall.com/search?q=%21%22Assembly+Specialist%22) | 2 | NEW | NO | Two 1/1 bodies for 2 is fodder, and every token engine in the list makes more over a game. |
| 11 | [Brad Boimler, Eager Ensign](https://scryfall.com/search?q=%21%22Brad+Boimler%2C+Eager+Ensign%22) | 2 | NEW | NO | Counter amplification has nothing to amplify here, and counters on tokens switch off Skullclamp. |
| 12 | [Command Decision](https://scryfall.com/search?q=%21%22Command+Decision%22) | 2 | NEW | NO | A sorcery that kills a power-4 creature or draws one card. The list's removal is cheaper or broader. |
| 13 | [Deanna Troi, Psychic Counsel](https://scryfall.com/search?q=%21%22Deanna+Troi%2C+Psychic+Counsel%22) | 2 | NEW | NO | Every other creature enters with a +1/+1 counter, so every token is a 2/2 and Skullclamp stops drawing (equip-027). The same grounds rejected Securitron Squadron on 2026-09-24. |
| 14 | [Dr. Pulaski, Cynical Clinician](https://scryfall.com/search?q=%21%22Dr.+Pulaski%2C+Cynical+Clinician%22) | 2 | NEW | NO | It gains 4 life on your second draw each turn. Life isn't this deck's constraint, and it adds no drain. |
| 15 | [Emergency Regeneration](https://scryfall.com/search?q=%21%22Emergency+Regeneration%22) | 2 | NEW | NO | It protects artifacts only, and Caesar isn't one. |
| 16 | [Ensign Harry Kim, Operations](https://scryfall.com/search?q=%21%22Ensign+Harry+Kim%2C+Operations%22) | 2 | NEW | NO | It draws only by removing +1/+1 counters, which this deck keeps off its tokens. |
| 17 | [Ezri Dax, Newly Joined](https://scryfall.com/search?q=%21%22Ezri+Dax%2C+Newly+Joined%22) | 2 | NEW | NO | It copies a creature card that died this turn. Tokens never reach the graveyard, so it rarely has a good target. |
| 18 | [Federation Resupply](https://scryfall.com/search?q=%21%22Federation+Resupply%22) | 2 | NEW | NO | It tutors an Equipment (Skullclamp, Infantry Shield) and can be recast by bouncing a creature. A tutor does nothing on its own, and the list already runs [Demonic Tutor](https://scryfall.com/search?q=%21%22Demonic+Tutor%22). |
| 19 | [Grand Crescendo](https://scryfall.com/search?q=%21%22Grand+Crescendo%22) | 2 | REPRINT | SIDE | The 2026-09-28 bench grounds still hold. It is an instant X-token burst like [Secure the Wastes](https://scryfall.com/search?q=%21%22Secure+the+Wastes%22), one token fewer at equal mana, plus team indestructible against a destroy wipe. Would displace Secure the Wastes. |
| 20 | [Head of Security](https://scryfall.com/search?q=%21%22Head+of+Security%22) | 2 | NEW | NO | A vanilla 2/2 first striker. |
| 21 | [Maturation Chamber](https://scryfall.com/search?q=%21%22Maturation+Chamber%22) | 2 | NEW | NO | It charges once per artifact spell (13 in the list), then needs {4} and sorcery timing for each batch of Borgs. |
| 22 | [Merciful Mandate](https://scryfall.com/search?q=%21%22Merciful+Mandate%22) | 2 | NEW | NO | Untapping and ending combat is a fog. This deck is the attacker. |
| 23 | [Oberth-Class Starship](https://scryfall.com/search?q=%21%22Oberth-Class+Starship%22) | 2 | NEW | NO | It fetches a Plains to hand, then needs 6 power of station to become a 2/2 flyer. |
| 24 | [Picard, Leading by Example](https://scryfall.com/search?q=%21%22Picard%2C+Leading+by+Example%22) | 2 | NEW | NO | It pumps one creature by Picard's power at sorcery speed. No token, drain or draw. |
| 25 | [Pure Energy](https://scryfall.com/search?q=%21%22Pure+Energy%22) | 2 | NEW | NO | Two +1/+1 counters, which switch off Skullclamp on any token they land on. |
| 26 | [Shields Up!](https://scryfall.com/search?q=%21%22Shields+Up%21%22) | 2 | NEW | NO | Hexproof and indestructible on one creature for 2. [The Needs of the Many](https://scryfall.com/search?q=%21%22The+Needs+of+the+Many%22) covers the whole team for the same mana, and Mother of Runes and Deflecting Swat already stop targeted spells on Caesar. |
| 27 | [Starfleet Crew](https://scryfall.com/search?q=%21%22Starfleet+Crew%22) | 2 | NEW | NO | A vanilla 2/3. |
| 28 | [Sulu, Heroic Helmsman](https://scryfall.com/search?q=%21%22Sulu%2C+Heroic+Helmsman%22) | 2 | NEW | NO | It triples power for station and crew. The list runs no Spacecraft or Vehicles. |
| 29 | [Sulu, Space Swashbuckler](https://scryfall.com/search?q=%21%22Sulu%2C+Space+Swashbuckler%22) | 2 | NEW | NO | It draws when tapped only if an Equipment or Spacecraft entered this turn. Otherwise it's a 2/2 first striker. |
| 30 | [Tactical Officer](https://scryfall.com/search?q=%21%22Tactical+Officer%22) | 2 | NEW | NO | A 2/1 that grows when you attack with 8 power. No token, drain or draw. |
| 31 | [Test of Conviction](https://scryfall.com/search?q=%21%22Test+of+Conviction%22) | 2 | NEW | NO | Counters on every creature switch off Skullclamp, and the draw mode gives an opponent a card. |
| 32 | [The Needs of the Many](https://scryfall.com/search?q=%21%22The+Needs+of+the+Many%22) | 2 | NEW | SIDE | For {1}{W} and a sacrificed creature (a death for every drainer), the team gets hexproof and indestructible and you get hexproof. It answers targeted exile and a destroy wipe at once. Would displace [Mithril Coat](https://scryfall.com/search?q=%21%22Mithril+Coat%22). |
| 33 | [There's Coffee in that Nebula](https://scryfall.com/search?q=%21%22There%27s+Coffee+in+that+Nebula%22) | 2 | NEW | NO | Card selection for an MV 3 or less permanent. A cantrip-level effect. |
| 34 | [Valorous Stance](https://scryfall.com/search?q=%21%22Valorous+Stance%22) | 2 | REPRINT | NO | Indestructible on Caesar or a kill on toughness 4+. Mother of Runes, General's Enforcer and Mithril Coat already cover the protection half. |
| 35 | [Vexing Drone](https://scryfall.com/search?q=%21%22Vexing+Drone%22) | 2 | NEW | NO | It taps one opposing creature on entry. A 2/2 with no engine. |
| 36 | [Ambassador K'Ehleyr](https://scryfall.com/search?q=%21%22Ambassador+K%27Ehleyr%22) | 3 | NEW | NO | Every player draws a card in each of your combats, so three opponents draw too. |
| 37 | [Andromedan Automatons](https://scryfall.com/search?q=%21%22Andromedan+Automatons%22) | 3 | NEW | NO | It tutors copies of itself, and Commander is singleton. |
| 38 | [Balance of Terror](https://scryfall.com/search?q=%21%22Balance+of+Terror%22) | 3 | NEW | NO | It destroys an artifact or enchantment, then blinks your own permanents. Few ETBs here are worth repeating. |
| 39 | [Beverly Crusher, Ship's Doctor](https://scryfall.com/search?q=%21%22Beverly+Crusher%2C+Ship%27s+Doctor%22) | 3 | NEW | NO | Counters on three creatures on your second draw each turn. On tokens they switch off Skullclamp, and on nontoken creatures they add little. |
| 40 | [Borg Incursion](https://scryfall.com/search?q=%21%22Borg+Incursion%22) | 3 | NEW | NO | Two artifact 1/1s at instant speed for 3. Secure the Wastes scales better. |
| 41 | [Captain Jean-Luc Picard](https://scryfall.com/search?q=%21%22Captain+Jean-Luc+Picard%22) | 3 | NEW | NO | Its anthem switches off Skullclamp on every 1/1 token (equip-027) in exchange for one Officer per creature spell. [Warleader's Call](https://scryfall.com/search?q=%21%22Warleader%27s+Call%22) is the anthem that also drains. |
| 42 | [Conquest Mission](https://scryfall.com/search?q=%21%22Conquest+Mission%22) | 3 | NEW | NO | It triggers once per nontoken artifact entering. The list has 13, and most are cast in the first turns, before it would be out. |
| 43 | [Dr. Beverly Crusher](https://scryfall.com/search?q=%21%22Dr.+Beverly+Crusher%22) | 3 | NEW | NO | It doubles triggers caused by gaining life. Nothing here triggers on lifegain, because Ocelot Pride only checks at end step whether you gained life. |
| 44 | [Duelist's Heritage](https://scryfall.com/search?q=%21%22Duelist%27s+Heritage%22) | 3 | REPRINT | NO | Double strike for one attacker each combat. It helps combat damage only and adds nothing to drain. |
| 45 | [Guinan, Ancient Advisor](https://scryfall.com/search?q=%21%22Guinan%2C+Ancient+Advisor%22) | 3 | NEW | NO | It puts a +1/+1 counter on every creature that entered this turn, which turns this turn's tokens into 2/2s and switches off Skullclamp. |
| 46 | [Hologram Janeway](https://scryfall.com/search?q=%21%22Hologram+Janeway%22) | 3 | NEW | NO | A 3/3 that places one +1/+1 counter per attack. No engine. |
| 47 | [Imperial Hullbreachers](https://scryfall.com/search?q=%21%22Imperial+Hullbreachers%22) | 3 | NEW | NO | Squad copies cost {2} each. Five mana for two 2/2 flyers with battle cry is below the list's token engines. |
| 48 | [Indelicate Healer](https://scryfall.com/search?q=%21%22Indelicate+Healer%22) | 3 | NEW | NO | Team lifelink when a Klingon or Warrior enters. Life isn't the constraint. |
| 49 | [Julian Bashir, Frontier Doctor](https://scryfall.com/search?q=%21%22Julian+Bashir%2C+Frontier+Doctor%22) | 3 | NEW | NO | It reanimates on attack only up to its own power, which starts at 1. |
| 50 | [Loran of the Third Path](https://scryfall.com/search?q=%21%22Loran+of+the+Third+Path%22) | 3 | REPRINT | NO | Its {T} draw gives the target opponent a card too. Only the artifact or enchantment ETB is clean. |
| 51 | [Malfunctioning Holodeck](https://scryfall.com/search?q=%21%22Malfunctioning+Holodeck%22) | 3 | NEW | NO | Exile until it leaves, with ward 2. [Anguished Unmaking](https://scryfall.com/search?q=%21%22Anguished+Unmaking%22) and [Rite of Oblivion](https://scryfall.com/search?q=%21%22Rite+of+Oblivion%22) exile for good. |
| 52 | [Martok, Hero of the Empire](https://scryfall.com/search?q=%21%22Martok%2C+Hero+of+the+Empire%22) | 3 | NEW | NO | Battlefront +1/+1 counters on up to X creatures. Aimed at nontoken creatures they keep Skullclamp working, but it adds no bodies or drain. |
| 53 | [Miles O'Brien, Transporter Ops](https://scryfall.com/search?q=%21%22Miles+O%27Brien%2C+Transporter+Ops%22) | 3 | NEW | NO | It draws only when a permanent returned to your hand this turn. Bouncing a token deletes it, and the list has no bounce plan. |
| 54 | [Pet Sehlat](https://scryfall.com/search?q=%21%22Pet+Sehlat%22) | 3 | NEW | NO | A 4/3 that can't attack alone. |
| 55 | [Rutherford, Upgraded Ensign](https://scryfall.com/search?q=%21%22Rutherford%2C+Upgraded+Ensign%22) | 3 | NEW | NO | It digs six cards for an artifact. The list's artifacts are rocks and Equipment it doesn't need to find. |
| 56 | [Shuttle Crew](https://scryfall.com/search?q=%21%22Shuttle+Crew%22) | 3 | NEW | NO | 4 damage to a tapped opposing creature, and opponents' creatures are rarely tapped on your turn. |
| 57 | [Sickbay Orderly](https://scryfall.com/search?q=%21%22Sickbay+Orderly%22) | 3 | NEW | NO | A vanilla 3/2 lifelinker. |
| 58 | [Spot, Felis catus](https://scryfall.com/search?q=%21%22Spot%2C+Felis+catus%22) | 3 | NEW | NO | A Food for each nontoken legendary permanent entering. Food isn't this deck's resource. |
| 59 | [Stratagem Emulator](https://scryfall.com/search?q=%21%22Stratagem+Emulator%22) | 3 | NEW | NO | It dies into Borg tokens equal to its power, which is 2. Below the token engines. |
| 60 | [Supplementation Node](https://scryfall.com/search?q=%21%22Supplementation+Node%22) | 3 | NEW | NO | Counters on artifact creatures that connect. Off-plan. |
| 61 | [Tempered Steel](https://scryfall.com/search?q=%21%22Tempered+Steel%22) | 3 | REPRINT | NO | An artifact-creature anthem. Most tokens here aren't artifacts, and the ones that are would stop dying to Skullclamp. |
| 62 | [The Measure of a Man](https://scryfall.com/search?q=%21%22The+Measure+of+a+Man%22) | 3 | NEW | NO | Temporary exile that returns the card at chapter III, plus a Clue. Clues don't count toward the draw aim. |
| 63 | [Tribble Cluster](https://scryfall.com/search?q=%21%22Tribble+Cluster%22) | 3 | NEW | NO | It grows each combat, then dies into Tribbles. Slow, and [Troubling Tribbles](https://scryfall.com/search?q=%21%22Troubling+Tribbles%22) is the Tribble that fits. |
| 64 | [Troubling Tribbles](https://scryfall.com/search?q=%21%22Troubling+Tribbles%22) | 3 | NEW | MAIN | Every Tribble makes a copy of itself each upkeep, so the count doubles each turn (1, 2, 4, 8). Each copy is a 0/1 Skullclamp target and an enters trigger for Purphoros, Impact Tremors and Warleader's Call. Swap 1, for [Assemble the Legion](https://scryfall.com/search?q=%21%22Assemble+the+Legion%22). |
| 65 | [Worf, Chief Tactical Officer](https://scryfall.com/search?q=%21%22Worf%2C+Chief+Tactical+Officer%22) | 3 | NEW | NO | A vanilla 2/3 with vigilance. |
| 66 | [Concerted Effort](https://scryfall.com/search?q=%21%22Concerted+Effort%22) | 4 | REPRINT | NO | It shares flying from Bitterblossom's Faeries and first strike from Ocelot Pride with the team. That helps combat only, for 4 mana and no drain. |
| 67 | [DOT-7 Repair Squad](https://scryfall.com/search?q=%21%22DOT-7+Repair+Squad%22) | 4 | NEW | NO | A 3/3 flyer that untaps one creature a turn at sorcery speed. |
| 68 | [Dr. McCoy, Surly Surgeon](https://scryfall.com/search?q=%21%22Dr.+McCoy%2C+Surly+Surgeon%22) | 4 | NEW | NO | It protects creatures with +1/+1 counters, which this deck keeps off its tokens. |
| 69 | [Federation Field Medic](https://scryfall.com/search?q=%21%22Federation+Field+Medic%22) | 4 | NEW | NO | A 3/2 that places one counter or draws one card. A one-shot. |
| 70 | [Ghost of Illyria](https://scryfall.com/search?q=%21%22Ghost+of+Illyria%22) | 4 | NEW | NO | A 3/3 flyer that blinks one of your permanents. Few ETBs here are worth repeating. |
| 71 | [Korok, Liberated Rage](https://scryfall.com/search?q=%21%22Korok%2C+Liberated+Rage%22) | 4 | NEW | NO | A team pump of +X/+X only when Korok attacks. A combat card, and the pump saves Skullclamp-equipped tokens for that turn. |
| 72 | [Operations Officer](https://scryfall.com/search?q=%21%22Operations+Officer%22) | 4 | NEW | NO | A 2/2 lifelinker that draws one card. Below the list's 4-drops. |
| 73 | [Peace in Our Time](https://scryfall.com/search?q=%21%22Peace+in+Our+Time%22) | 4 | NEW | NO | Opponents trade their attacks for cards, and you win at twelve peace counters. It hands the table cards and slows a game this deck wins by attacking. |
| 74 | [Primary Unimatrix Adjunct](https://scryfall.com/search?q=%21%22Primary+Unimatrix+Adjunct%22) | 4 | NEW | NO | Double strike for artifact creatures only. |
| 75 | [Return to Dust](https://scryfall.com/search?q=%21%22Return+to+Dust%22) | 4 | REPRINT | NO | Artifact and enchantment removal at 4. Anguished Unmaking and Rite of Oblivion hit those for less. |
| 76 | [Right of Vengeance](https://scryfall.com/search?q=%21%22Right+of+Vengeance%22) | 4 | NEW | NO | It punishes creatures that hit you this turn. Defensive and narrow. |
| 77 | [Shuttlecraft Galileo](https://scryfall.com/search?q=%21%22Shuttlecraft+Galileo%22) | 4 | NEW | NO | One Officer per land drop, plus a station cost before it flies. Slow for 4. |
| 78 | [Troi, Winging It](https://scryfall.com/search?q=%21%22Troi%2C+Winging+It%22) | 4 | NEW | NO | Faeries only when an opponent draws during your turn. Only Bloodline Recollector's copy aimed at an opponent does that here. |
| 79 | [Type-03 Borg Vessel](https://scryfall.com/search?q=%21%22Type-03+Borg+Vessel%22) | 4 | NEW | NO | It needs 7 power of station before its token trigger turns on. |
| 80 | [U.S.S. Excelsior, Cutting Edge](https://scryfall.com/search?q=%21%22U.S.S.+Excelsior%2C+Cutting+Edge%22) | 4 | NEW | NO | It destroys a tapped opposing creature, and those are rare on your turn. |
| 81 | [Wrath of God](https://scryfall.com/search?q=%21%22Wrath+of+God%22) | 4 | REPRINT | NO | It kills Caesar and our whole board. [Ruinous Ultimatum](https://scryfall.com/search?q=%21%22Ruinous+Ultimatum%22) is the one-sided wipe. |
| 82 | [Free Borg Revolutionaries](https://scryfall.com/search?q=%21%22Free+Borg+Revolutionaries%22) | 5 | NEW | NO | A 4/5 with a one-turn team pump, or a landcycler. Neither is this deck's job. |
| 83 | [M'Ress, Crew Coordinator](https://scryfall.com/search?q=%21%22M%27Ress%2C+Crew+Coordinator%22) | 5 | NEW | NO | Two Officers per land drop, but at 5 mana it competes with Elspeth and Dictate and needs land drops late in the game. |
| 84 | [Promise of Loyalty](https://scryfall.com/search?q=%21%22Promise+of+Loyalty%22) | 5 | REPRINT | NO | Each player keeps one creature, so we lose the board too. |
| 85 | [Saavik, Stoic Student](https://scryfall.com/search?q=%21%22Saavik%2C+Stoic+Student%22) | 5 | NEW | NO | Flash damage to one attacker or blocker. Narrow removal at 5. |
| 86 | [Shuttle Ace](https://scryfall.com/search?q=%21%22Shuttle+Ace%22) | 5 | NEW | NO | A 4/4 that flies on your turn. No engine. |
| 87 | [U.S.S. Enterprise-A, Free Spirit](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-A%2C+Free+Spirit%22) | 5 | NEW | NO | Three Officers for 5, then a station cost. Court of Grace and Hero of Bladehold make more over a game for 4. |
| 88 | [U.S.S. Enterprise-E, Sovereign](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-E%2C+Sovereign%22) | 5 | NEW | NO | It destroys all tapped creatures, which on your turn are your own attackers and tokens. |
| 89 | [Una Chin-Riley, Number One](https://scryfall.com/search?q=%21%22Una+Chin-Riley%2C+Number+One%22) | 5 | NEW | NO | A 4/5 that gives one attacker +2/+0 and first strike. Combat-only. |
| 90 | [Will Riker, Assuming Command](https://scryfall.com/search?q=%21%22Will+Riker%2C+Assuming+Command%22) | 5 | NEW | NO | A 4/5 that places one +1/+1 counter. Vanilla here. |
| 91 | [Austere Command](https://scryfall.com/search?q=%21%22Austere+Command%22) | 6 | REPRINT | NO | Every pair of modes hits our own board: the low-MV creature mode kills every token and drainer, the artifact and enchantment modes kill our engines. Ruinous Ultimatum is one-sided. |
| 92 | [Chronomantic Escape](https://scryfall.com/search?q=%21%22Chronomantic+Escape%22) | 6 | REPRINT | NO | A fog against attacks. Off-plan. |
| 93 | [Excalbian Gamemaster](https://scryfall.com/search?q=%21%22Excalbian+Gamemaster%22) | 6 | NEW | NO | Officers equal to your differently named lands, but nothing in the list costs 6, and Ruinous Ultimatum is the only card above 5. |
| 94 | [Picard, Steadfast Captain](https://scryfall.com/search?q=%21%22Picard%2C+Steadfast+Captain%22) | 6 | NEW | NO | +1/+1 counters at 6 mana. |
| 95 | [Sun Titan](https://scryfall.com/search?q=%21%22Sun+Titan%22) | 6 | REPRINT | NO | It recurs MV 3 or less permanents, but 6 mana is above the curve. |
| 96 | [Join the Collective](https://scryfall.com/search?q=%21%22Join+the+Collective%22) | 7 | NEW | NO | It destroys all creatures, Caesar included. |
| 97 | [Vanquish the Horde](https://scryfall.com/search?q=%21%22Vanquish+the+Horde%22) | 8 | REPRINT | NO | It destroys all creatures, Caesar included. |

### Black (64)

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 98 | [A Good Day to Die](https://scryfall.com/search?q=%21%22A+Good+Day+to+Die%22) | 1 | NEW | NO | +2/+0 and a card when that creature dies this turn. A one-shot Skullclamp, and the real one is already in. |
| 99 | [Collation Trimatrix](https://scryfall.com/search?q=%21%22Collation+Trimatrix%22) | 1 | NEW | NO | It draws by tapping three artifact creatures. Few here are artifacts. |
| 100 | [General Chang, Cold Warrior](https://scryfall.com/search?q=%21%22General+Chang%2C+Cold+Warrior%22) | 1 | NEW | NO | A {1} sacrifice outlet that pumps Klingons. The list's four free outlets are better. |
| 101 | [Relentless Drednok](https://scryfall.com/search?q=%21%22Relentless+Drednok%22) | 1 | NEW | NO | A 1/1 lifelinker that cycles from the graveyard for 3. Fodder at best. |
| 102 | [Storied Veteran](https://scryfall.com/search?q=%21%22Storied+Veteran%22) | 1 | NEW | NO | A 2/1 that can't block and can be recast once from the graveyard. The list makes fodder for free. |
| 103 | [Test of Loyalty](https://scryfall.com/search?q=%21%22Test+of+Loyalty%22) | 1 | NEW | NO | Graveyard hate with a draw, or regrowth. A cantrip. |
| 104 | [Battle-Scarred Survivalist](https://scryfall.com/search?q=%21%22Battle-Scarred+Survivalist%22) | 2 | NEW | NO | It grows once a turn on deaths. A body with no payoff. |
| 105 | [Bitter Triumph](https://scryfall.com/search?q=%21%22Bitter+Triumph%22) | 2 | REPRINT | NO | Instant creature or planeswalker kill for 2 plus 3 life or a card. [Eject the Warp Core](https://scryfall.com/search?q=%21%22Eject+the+Warp+Core%22) does the same job and turns its cost into a death. |
| 106 | [Blood-Sport Champion](https://scryfall.com/search?q=%21%22Blood-Sport+Champion%22) | 2 | NEW | NO | A deathtouch 2/2, and kicked, team deathtouch for one turn. Combat-only. |
| 107 | [Collective Drone](https://scryfall.com/search?q=%21%22Collective+Drone%22) | 2 | NEW | NO | Its power equals your artifact creatures, which is small here. |
| 108 | [De-evolve](https://scryfall.com/search?q=%21%22De-evolve%22) | 2 | NEW | NO | An Aura that shrinks one creature and exiles it only at threshold. Weak removal. |
| 109 | [Eject the Warp Core](https://scryfall.com/search?q=%21%22Eject+the+Warp+Core%22) | 2 | NEW | SIDE | Instant -6/-6 for {1}{B} when you sacrifice a token as the kicker, and that sacrifice fires every drainer and Grave Pact. The best alternative for [Vanishing Verse](https://scryfall.com/search?q=%21%22Vanishing+Verse%22)'s slot if swap 3 is declined. |
| 110 | [Extraction Integrant](https://scryfall.com/search?q=%21%22Extraction+Integrant%22) | 2 | NEW | NO | Menace for artifact creatures. |
| 111 | [Kai Winn, Faithless Leader](https://scryfall.com/search?q=%21%22Kai+Winn%2C+Faithless+Leader%22) | 2 | NEW | NO | It taxes one named card. Narrow. |
| 112 | [Last Gasp](https://scryfall.com/search?q=%21%22Last+Gasp%22) | 2 | REPRINT | NO | -3/-3 at instant speed. Path and Swords answer bigger creatures for less. |
| 113 | [Night's Whisper](https://scryfall.com/search?q=%21%22Night%27s+Whisper%22) | 2 | REPRINT | NO | Two cards once for 2. The draw role runs repeatable engines. |
| 114 | [Pattern Buffer Preservation](https://scryfall.com/search?q=%21%22Pattern+Buffer+Preservation%22) | 2 | NEW | NO | Card selection, then a recast that bounces a creature. |
| 115 | [Resistance Is Futile](https://scryfall.com/search?q=%21%22Resistance+Is+Futile%22) | 2 | NEW | NO | A sorcery creature kill or a small reanimation. The removal slots are full. |
| 116 | [Salt Vampire](https://scryfall.com/search?q=%21%22Salt+Vampire%22) | 2 | NEW | NO | A 2/2 lifelinker with mild hand disruption. |
| 117 | [Tal Shiar Operative](https://scryfall.com/search?q=%21%22Tal+Shiar+Operative%22) | 2 | NEW | NO | Its attack trigger gives deathtouch or surveil. No engine. |
| 118 | [Tell Me What You See](https://scryfall.com/search?q=%21%22Tell+Me+What+You+See%22) | 2 | NEW | NO | One card or 4 life loss, the opponent's choice. A one-shot. |
| 119 | [Tenacious Drone](https://scryfall.com/search?q=%21%22Tenacious+Drone%22) | 2 | NEW | NO | A 2/1 that dies into a 1/1. Below the token engines. |
| 120 | [Assimilate the Wounded](https://scryfall.com/search?q=%21%22Assimilate+the+Wounded%22) | 3 | NEW | NO | It steals creature cards that died this turn from opponents' graveyards. Grave Pact feeds it, but it's a one-shot at 3. |
| 121 | [Automated Warfare System](https://scryfall.com/search?q=%21%22Automated+Warfare+System%22) | 3 | NEW | NO | It draws when it attacks by sacrificing a creature or artifact, so the 2/2 flyer must attack and survive. [Kurn, Son of Mogh](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) draws more for the same mana. |
| 122 | [Bat'leth](https://scryfall.com/search?q=%21%22Bat%27leth%22) | 3 | NEW | NO | -2/-2 on entry, then a +2/+0 Equipment. [Chainsaw](https://scryfall.com/search?q=%21%22Chainsaw%22) and [Lich's Relic](https://scryfall.com/search?q=%21%22Lich%27s+Relic%22) already fill the removal-Equipment slots. |
| 123 | [Commander Raffi Musiker](https://scryfall.com/search?q=%21%22Commander+Raffi+Musiker%22) | 3 | NEW | NO | Graveyard exile or a Clue. Clues don't count toward the draw aim. |
| 124 | [D'Ghor Bloodletter](https://scryfall.com/search?q=%21%22D%27Ghor+Bloodletter%22) | 3 | NEW | NO | One symmetric edict, or -1/-1 to every other creature, which kills our own tokens. [Grave Pact](https://scryfall.com/search?q=%21%22Grave+Pact%22) already turns every death into an edict. |
| 125 | [Elim Garak, Simple Tailor](https://scryfall.com/search?q=%21%22Elim+Garak%2C+Simple+Tailor%22) | 3 | NEW | SIDE | Each opponent loses 2 and you gain 2 whenever you choose modes for a spell or ability. Caesar's choose-two trigger and Black Market Connections are dilemmas, so it drains 4 to 8 from each opponent a turn without needing more deaths. Would displace [Elas il-Kor, Sadistic Pilgrim](https://scryfall.com/search?q=%21%22Elas+il-Kor%2C+Sadistic+Pilgrim%22). |
| 126 | [Fugitive Listener](https://scryfall.com/search?q=%21%22Fugitive+Listener%22) | 3 | NEW | NO | Each opponent discards one card. No engine. |
| 127 | [Grand Nagus Zek](https://scryfall.com/search?q=%21%22Grand+Nagus+Zek%22) | 3 | NEW | NO | One Treasure a turn on a death. [Pitiless Plunderer](https://scryfall.com/search?q=%21%22Pitiless+Plunderer%22) makes one per death. |
| 128 | [Impossible Choice](https://scryfall.com/search?q=%21%22Impossible+Choice%22) | 3 | NEW | NO | Its kill gives the creature's controller two 1/1s (Grave Pact insurance for them), and its draw mode is a one-shot. |
| 129 | [Kurn, Son of Mogh](https://scryfall.com/search?q=%21%22Kurn%2C+Son+of+Mogh%22) | 3 | NEW | MAIN | Whenever Kurn attacks, you draw one card per opponent you attacked this turn (up to 3), and Isshin or Windcrag Siege repeat it. Swap 4, for [Idol of Oblivion](https://scryfall.com/search?q=%21%22Idol+of+Oblivion%22). |
| 130 | [Organic Avulsion Unit](https://scryfall.com/search?q=%21%22Organic+Avulsion+Unit%22) | 3 | NEW | NO | Menace for artifact creatures. |
| 131 | [Overflow Submatrix](https://scryfall.com/search?q=%21%22Overflow+Submatrix%22) | 3 | NEW | NO | It recasts artifact creatures from the graveyard, and the list has few. |
| 132 | [Painful Truths](https://scryfall.com/search?q=%21%22Painful+Truths%22) | 3 | REPRINT | NO | Three cards once for 3. A one-shot. |
| 133 | [Reclamation Specialist](https://scryfall.com/search?q=%21%22Reclamation+Specialist%22) | 3 | NEW | NO | {1} and an artifact creature for a card. Narrow fodder, and it costs mana each time. |
| 134 | [Stray from History](https://scryfall.com/search?q=%21%22Stray+from+History%22) | 3 | NEW | NO | Regrowth or hand disruption. |
| 135 | [Toxic Deluge](https://scryfall.com/search?q=%21%22Toxic+Deluge%22) | 3 | REPRINT | NO | -X/-X to every creature kills our own board first. |
| 136 | [Vengeance Mission](https://scryfall.com/search?q=%21%22Vengeance+Mission%22) | 3 | NEW | MAIN | Whenever any creature dies, the target opponent loses 1, and 2 from the seventh death on. It counts the same deaths Blood Artist does, opponents' edict victims included, and it survives creature wipes. Swap 2, for [Blood Artist](https://scryfall.com/search?q=%21%22Blood+Artist%22). |
| 137 | [Assault Drone](https://scryfall.com/search?q=%21%22Assault+Drone%22) | 4 | NEW | NO | +1/+0 for artifact creatures. |
| 138 | [Badgey, Malicious Glitch](https://scryfall.com/search?q=%21%22Badgey%2C+Malicious+Glitch%22) | 4 | NEW | NO | It drains 1 when it becomes tapped, so about once a turn. A 4-mana creature doing less than Elas. |
| 139 | [Blastoneuron](https://scryfall.com/search?q=%21%22Blastoneuron%22) | 4 | NEW | NO | Its drain needs cards to leave your graveyard, and tokens never get there. |
| 140 | [Ceti Eel](https://scryfall.com/search?q=%21%22Ceti+Eel%22) | 4 | NEW | NO | It mills two and grows. No engine. |
| 141 | [He's Dead, Jim](https://scryfall.com/search?q=%21%22He%27s+Dead%2C+Jim%22) | 4 | NEW | NO | Instant creature kill at 4. The list's removal costs 1 to 3. |
| 142 | [Khan, Vengeful Heart](https://scryfall.com/search?q=%21%22Khan%2C+Vengeful+Heart%22) | 4 | NEW | NO | Sacrifice on entry to draw two is a one-shot. [Deadly Dispute](https://scryfall.com/search?q=%21%22Deadly+Dispute%22) left on 2026-09-28 because it was the role's only one-shot draw, and Khan is the same one-shot on a 4-mana body. |
| 143 | [Obsidian Order Operative](https://scryfall.com/search?q=%21%22Obsidian+Order+Operative%22) | 4 | NEW | NO | It drains 1 per dilemma. [Elim Garak, Simple Tailor](https://scryfall.com/search?q=%21%22Elim+Garak%2C+Simple+Tailor%22) drains 2 for less mana. |
| 144 | [Sela, Tal Shiar Paradox](https://scryfall.com/search?q=%21%22Sela%2C+Tal+Shiar+Paradox%22) | 4 | NEW | NO | It makes a Romulan when cards leave your graveyard. Reassembling Skeleton returning is the only trigger here. |
| 145 | [U.S.S. Reliant, From Hell's Heart](https://scryfall.com/search?q=%21%22U.S.S.+Reliant%2C+From+Hell%27s+Heart%22) | 4 | NEW | NO | It reanimates once on entry, then needs 10 station. |
| 146 | [Voq, Torchbearer](https://scryfall.com/search?q=%21%22Voq%2C+Torchbearer%22) | 4 | NEW | NO | It copies a creature card in a graveyard. A value creature with no engine. |
| 147 | [Assimilation Assessor](https://scryfall.com/search?q=%21%22Assimilation+Assessor%22) | 5 | NEW | NO | It exiles a graveyard, then steals from it on attacks. Slow at 5. |
| 148 | [Battle of Wolf 359](https://scryfall.com/search?q=%21%22Battle+of+Wolf+359%22) | 5 | NEW | NO | -X/-X to nonartifact creatures, which is most of ours. |
| 149 | [Bio-Asset Allocator](https://scryfall.com/search?q=%21%22Bio-Asset+Allocator%22) | 5 | NEW | NO | Attack drain for artifact creatures only, and few here are artifacts. |
| 150 | [Cha'DIch Investigator](https://scryfall.com/search?q=%21%22Cha%27DIch+Investigator%22) | 5 | NEW | NO | A 4/4 and a 2/1 for 5. |
| 151 | [Gabriel Lorca, Mirror Menace](https://scryfall.com/search?q=%21%22Gabriel+Lorca%2C+Mirror+Menace%22) | 5 | NEW | NO | A 5/4 menace that returns from the graveyard on dilemmas. No engine. |
| 152 | [Hive Mind Coprocessor](https://scryfall.com/search?q=%21%22Hive+Mind+Coprocessor%22) | 5 | NEW | NO | Draw on combat damage for artifact creatures only. |
| 153 | [In the Pale Moonlight](https://scryfall.com/search?q=%21%22In+the+Pale+Moonlight%22) | 5 | NEW | NO | One edict, a Clue and two 2/2s over three turns for 5. |
| 154 | [The Destruction of Praxis](https://scryfall.com/search?q=%21%22The+Destruction+of+Praxis%22) | 5 | NEW | NO | -X/-X to all creatures wipes our board. |
| 155 | [The Promise of Kahless](https://scryfall.com/search?q=%21%22The+Promise+of+Kahless%22) | 5 | NEW | NO | Mass reanimation of Klingons and Warriors. The list has two Warrior creature cards (Zurgo, Reassembling Skeleton). |
| 156 | [Borg Queen, Perfection Manifest](https://scryfall.com/search?q=%21%22Borg+Queen%2C+Perfection+Manifest%22) | 6 | NEW | NO | It pumps artifact creatures and steals one. 6 mana. |
| 157 | [Georgiou, Terran Emperor](https://scryfall.com/search?q=%21%22Georgiou%2C+Terran+Emperor%22) | 6 | NEW | NO | 6 mana. Ten Officers at 0 life is a cute line, not a plan. |
| 158 | [Rogue Artificial Intelligence](https://scryfall.com/search?q=%21%22Rogue+Artificial+Intelligence%22) | 6 | NEW | NO | A 6/5 or a landcycler. |
| 159 | [Armus, Skin of Evil](https://scryfall.com/search?q=%21%22Armus%2C+Skin+of+Evil%22) | 7 | NEW | NO | A 7-mana discard engine. |
| 160 | [Gul Dukat, Colonial Prefect](https://scryfall.com/search?q=%21%22Gul+Dukat%2C+Colonial+Prefect%22) | 7 | NEW | NO | At each end step every opponent loses again what they lost that turn, which doubles this deck's drain. At 7 mana it competes with Ruinous Ultimatum for the only slot above 5. |
| 161 | [Death Is Irrelevant](https://scryfall.com/search?q=%21%22Death+Is+Irrelevant%22) | 8 | NEW | NO | 8 mana. |

### Red (75)

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 162 | [Defense Force Aggressor](https://scryfall.com/search?q=%21%22Defense+Force+Aggressor%22) | 1 | NEW | NO | A vanilla 2/1. |
| 163 | [Gin'tak Charge](https://scryfall.com/search?q=%21%22Gin%27tak+Charge%22) | 1 | NEW | NO | 2 damage at sorcery speed. |
| 164 | [Khaaaaaaaaaaaannn!](https://scryfall.com/search?q=%21%22Khaaaaaaaaaaaannn%21%22) | 1 | NEW | NO | X-cost creature removal. Path and Swords answer creatures for 1. |
| 165 | [Planetary Bombardment](https://scryfall.com/search?q=%21%22Planetary+Bombardment%22) | 1 | NEW | NO | 2 or 4 damage to one creature. Narrow. |
| 166 | [Starfleet Security](https://scryfall.com/search?q=%21%22Starfleet+Security%22) | 1 | NEW | NO | A hasty 1/1 that leaves a Clue when it dies on your turn. Clues don't count toward the draw aim. |
| 167 | [Abrade](https://scryfall.com/search?q=%21%22Abrade%22) | 2 | REPRINT | NO | 3 damage or artifact removal. Chainsaw and Lich's Relic cover small creatures. |
| 168 | [Beckett Mariner, Impetuous Ensign](https://scryfall.com/search?q=%21%22Beckett+Mariner%2C+Impetuous+Ensign%22) | 2 | NEW | NO | 2 damage to each opponent every third time she taps. Slow. |
| 169 | [Boarding Action](https://scryfall.com/search?q=%21%22Boarding+Action%22) | 2 | NEW | NO | A 2/1 haste token for 2, then a recast that bounces a creature. Below the token engines. |
| 170 | [Brazen Bluff](https://scryfall.com/search?q=%21%22Brazen+Bluff%22) | 2 | NEW | NO | A bluff against noncreature spells. Off-plan. |
| 171 | [Captain's Tutelage](https://scryfall.com/search?q=%21%22Captain%27s+Tutelage%22) | 2 | NEW | NO | A +2/+0 Aura. |
| 172 | [D-7 Battle Cruiser](https://scryfall.com/search?q=%21%22D-7+Battle+Cruiser%22) | 2 | NEW | NO | With 3 station counters it makes a hasty 2/1 each combat that dies at end step. [L'Rell, Fierce Visionary](https://scryfall.com/search?q=%21%22L%27Rell%2C+Fierce+Visionary%22) does the same with no station step. |
| 173 | [Ferocious Colonist](https://scryfall.com/search?q=%21%22Ferocious+Colonist%22) | 2 | NEW | NO | A 0/1 double striker with melee. |
| 174 | [Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22) | 2 | NEW | NO | For {2} it doubles one creature's triggers while it stays tapped. On Caesar it repeats what Isshin and Windcrag Siege already give, and every doubler in the list covers more. |
| 175 | [Munitions Enthusiast](https://scryfall.com/search?q=%21%22Munitions+Enthusiast%22) | 2 | NEW | NO | A 3/2 trampler that pings 1 when it dies. Fodder with a small drain. |
| 176 | [Perils of the Past](https://scryfall.com/search?q=%21%22Perils+of+the+Past%22) | 2 | NEW | NO | A pump or artifact removal. |
| 177 | [Planetary Patrol](https://scryfall.com/search?q=%21%22Planetary+Patrol%22) | 2 | NEW | NO | A vanilla 2/2 with a landfall pump. |
| 178 | [Qo'noS Quartermaster](https://scryfall.com/search?q=%21%22Qo%27noS+Quartermaster%22) | 2 | NEW | NO | One mana when it attacks. Minor ramp on a 2/2. |
| 179 | [Reckless Impulse](https://scryfall.com/search?q=%21%22Reckless+Impulse%22) | 2 | REPRINT | NO | Two cards once, played by the end of next turn. A one-shot. |
| 180 | [Run Amok](https://scryfall.com/search?q=%21%22Run+Amok%22) | 2 | REPRINT | NO | A combat trick. |
| 181 | [Savvy Profiteer](https://scryfall.com/search?q=%21%22Savvy+Profiteer%22) | 2 | NEW | NO | A mana creature that makes Treasures for {3}. Slow. |
| 182 | [Tasha Yar, Out of Time](https://scryfall.com/search?q=%21%22Tasha+Yar%2C+Out+of+Time%22) | 2 | NEW | NO | A hasty 2/1 that impulses one card on death and returns once as a temporary copy. Fodder with small value. |
| 183 | [Test of Identity](https://scryfall.com/search?q=%21%22Test+of+Identity%22) | 2 | NEW | NO | Klingon double strike or a rummage. |
| 184 | [The Naked Time](https://scryfall.com/search?q=%21%22The+Naked+Time%22) | 2 | NEW | NO | A Mountain, one turn of counters and haste (a Skullclamp cost), then you sacrifice a land. |
| 185 | [Thrill of Possibility](https://scryfall.com/search?q=%21%22Thrill+of+Possibility%22) | 2 | REPRINT | NO | A rummage. |
| 186 | [Transporter Malfunction](https://scryfall.com/search?q=%21%22Transporter+Malfunction%22) | 2 | NEW | NO | 3 damage at sorcery speed, recast for 6. |
| 187 | [Warship Flight Crew](https://scryfall.com/search?q=%21%22Warship+Flight+Crew%22) | 2 | NEW | NO | A vanilla 2/2. |
| 188 | [Academy Instructor](https://scryfall.com/search?q=%21%22Academy+Instructor%22) | 3 | NEW | NO | One Officer per noncreature spell on a 0/3. About 40 of the 99 are noncreature spells, but a 0/3 making 1/1s is below the token engines. |
| 189 | [Cantankerous Captain](https://scryfall.com/search?q=%21%22Cantankerous+Captain%22) | 3 | NEW | NO | +1/+0 and maybe menace on one creature each combat. |
| 190 | [Captain James T. Kirk](https://scryfall.com/search?q=%21%22Captain+James+T.+Kirk%22) | 3 | NEW | NO | One mode when it enters or attacks: a rummage, an Officer or a team +1/+0. Small for 3. |
| 191 | [Captain Michael Burnham](https://scryfall.com/search?q=%21%22Captain+Michael+Burnham%22) | 3 | NEW | NO | Landfall pings, and the deck makes one land drop a turn. |
| 192 | [Combat Celebrant](https://scryfall.com/search?q=%21%22Combat+Celebrant%22) | 3 | REPRINT | SIDE | Exert it as it attacks for an extra combat phase every other turn. That combat repeats Caesar's trigger and every attack token maker, and its beginning-of-combat step makes Warboss's and Apprentice's tokens again (ledger dmg-018). Would displace Secure the Wastes. |
| 193 | [Direct Hit](https://scryfall.com/search?q=%21%22Direct+Hit%22) | 3 | NEW | NO | 5 damage to a creature at sorcery speed for 3. |
| 194 | [Dominion Infiltration](https://scryfall.com/search?q=%21%22Dominion+Infiltration%22) | 3 | NEW | NO | Temporary copies of X opposing creatures at {X}{R}{R}{R}. Red is the lightest colour (20 sources). |
| 195 | [Encounter the Unknown](https://scryfall.com/search?q=%21%22Encounter+the+Unknown%22) | 3 | NEW | NO | Two cards to impulse, or 2 damage to each creature and player, which wipes our tokens. |
| 196 | [Gagh Slinger](https://scryfall.com/search?q=%21%22Gagh+Slinger%22) | 3 | NEW | NO | It pings each opponent when a Klingon or Warrior enters. [Impact Tremors](https://scryfall.com/search?q=%21%22Impact+Tremors%22) and Warleader's Call already ping on every creature. |
| 197 | [Kruge, Genesis Seeker](https://scryfall.com/search?q=%21%22Kruge%2C+Genesis+Seeker%22) | 3 | NEW | NO | It pumps attacking Klingons, and the list has no Klingon creature cards. |
| 198 | [Plasma Cascade](https://scryfall.com/search?q=%21%22Plasma+Cascade%22) | 3 | NEW | NO | 3 damage to any target with a rummage, for 3. The removal here is cheaper. |
| 199 | [Professional Face-Breaker](https://scryfall.com/search?q=%21%22Professional+Face-Breaker%22) | 3 | REPRINT | NO | Treasures on combat damage and impulse by sacrificing them. Combat-only value. |
| 200 | [Quark, Humble Proprietor](https://scryfall.com/search?q=%21%22Quark%2C+Humble+Proprietor%22) | 3 | NEW | NO | A Treasure every upkeep, but "You can't sacrifice Treasure tokens" means no Treasure can be spent, which shuts off Pitiless Plunderer, Smothering Tithe and the Skeleton loop. |
| 201 | [Red Alert!](https://scryfall.com/search?q=%21%22Red+Alert%21%22) | 3 | NEW | NO | A one-turn +2/+0 team pump. |
| 202 | [Ro Laren, Double Agent](https://scryfall.com/search?q=%21%22Ro+Laren%2C+Double+Agent%22) | 3 | NEW | NO | 2 damage to each opponent on your second draw each turn, so at most once a turn. A capped drain on a 3/2. |
| 203 | [Sarcophagus, Ship of the Dead](https://scryfall.com/search?q=%21%22Sarcophagus%2C+Ship+of+the+Dead%22) | 3 | NEW | NO | Other creatures get +1/+0, which keeps Skullclamp working, and deaths charge it toward a 4/4 flyer at 10. The anthem is combat-only. |
| 204 | [Shared Animosity](https://scryfall.com/search?q=%21%22Shared+Animosity%22) | 3 | REPRINT | NO | It counts declared attackers only. Caesar's tokens enter attacking and never trigger it (CR 508.4). |
| 205 | [Tal Shiar Analyst](https://scryfall.com/search?q=%21%22Tal+Shiar+Analyst%22) | 3 | NEW | NO | It pings each opponent for 1 when tapped and untaps on noncreature spells. About one ping a turn here. |
| 206 | [Targ Wrangler](https://scryfall.com/search?q=%21%22Targ+Wrangler%22) | 3 | NEW | NO | A 5/3 menace that makes you sacrifice a nonland permanent after it attacks. A combat body. |
| 207 | [The Beacon of Kahless](https://scryfall.com/search?q=%21%22The+Beacon+of+Kahless%22) | 3 | NEW | NO | One mana before combat and up to three after you attack three opponents. Early ramp matters more, and [Talisman of Conviction](https://scryfall.com/search?q=%21%22Talisman+of+Conviction%22) is the recorded first pick if a ramp slot reopens. |
| 208 | [The Wrath of Khan](https://scryfall.com/search?q=%21%22The+Wrath+of+Khan%22) | 3 | NEW | SIDE | Chapter I deals 4 damage to a creature and then you take it for a combat, so a survivor can be sacrificed to Caesar or an outlet. Chapter III makes each opponent sacrifice a nontoken permanent. Would displace Vanishing Verse if swap 3 is declined. |
| 209 | [Worf, Intelligence Contractor](https://scryfall.com/search?q=%21%22Worf%2C+Intelligence+Contractor%22) | 3 | NEW | NO | It steals up to one MV 3 or less creature per opponent for a turn. Sacrificing them to [Goblin Bombardment](https://scryfall.com/search?q=%21%22Goblin+Bombardment%22) is a cute removal line, but the MV cap misses most threats. |
| 210 | [Chain Reaction](https://scryfall.com/search?q=%21%22Chain+Reaction%22) | 4 | REPRINT | NO | Damage to each creature equal to the creature count wipes our board first. |
| 211 | [Dahar Master](https://scryfall.com/search?q=%21%22Dahar+Master%22) | 4 | NEW | NO | It sacrifices a nonland permanent on entry for 2 damage. A one-shot on a 4/3. |
| 212 | [Disrupt Decorum](https://scryfall.com/search?q=%21%22Disrupt+Decorum%22) | 4 | REPRINT | NO | It goads every opposing creature for a turn cycle. It makes no tokens, drain or cards. |
| 213 | [Erica Ortegas, Plucky Pilot](https://scryfall.com/search?q=%21%22Erica+Ortegas%2C+Plucky+Pilot%22) | 4 | NEW | NO | Land tricks when tapped. |
| 214 | [Exploratory Mission](https://scryfall.com/search?q=%21%22Exploratory+Mission%22) | 4 | NEW | NO | Landfall impulse, and the deck makes one land drop a turn. |
| 215 | [Galvanizing Tenor](https://scryfall.com/search?q=%21%22Galvanizing+Tenor%22) | 4 | NEW | NO | It goads X creatures when it attacks. |
| 216 | [Kang, Suspicious Captain](https://scryfall.com/search?q=%21%22Kang%2C+Suspicious+Captain%22) | 4 | NEW | NO | It goads itself and one opposing creature, so Kang must attack every combat. |
| 217 | [Kirk, Enterprising Captain](https://scryfall.com/search?q=%21%22Kirk%2C+Enterprising+Captain%22) | 4 | NEW | NO | Impulse on attack at 8 power, only when Kirk attacks. |
| 218 | [Koloth, Tribble Hunter](https://scryfall.com/search?q=%21%22Koloth%2C+Tribble+Hunter%22) | 4 | NEW | NO | Trap. Each opponent gets two Tribbles every end step, which soak up Grave Pact and Dictate of Erebos edicts so they never sacrifice a real creature. |
| 219 | [La'An Noonien-Singh, Security](https://scryfall.com/search?q=%21%22La%27An+Noonien-Singh%2C+Security%22) | 4 | NEW | NO | One creature can't block per attack. |
| 220 | [Mek'leth Berserker](https://scryfall.com/search?q=%21%22Mek%27leth+Berserker%22) | 4 | NEW | NO | A vanilla 4/3 menace. |
| 221 | [Q, Stacking the Deck](https://scryfall.com/search?q=%21%22Q%2C+Stacking+the+Deck%22) | 4 | NEW | NO | It copies one random nonland card by exiling cards from hand. Random. |
| 222 | [Rom and Leeta, Unlikely Pair](https://scryfall.com/search?q=%21%22Rom+and+Leeta%2C+Unlikely+Pair%22) | 4 | NEW | NO | Two tapped Treasures on your second draw each turn. Ramp on a 4-mana body. |
| 223 | [Will Riker, First in the Field](https://scryfall.com/search?q=%21%22Will+Riker%2C+First+in+the+Field%22) | 4 | NEW | NO | Temporary extra lands each combat. |
| 224 | [Genesis Effect](https://scryfall.com/search?q=%21%22Genesis+Effect%22) | 5 | NEW | NO | 6 damage to a creature at instant speed for 5. |
| 225 | [Gnarling Targ](https://scryfall.com/search?q=%21%22Gnarling+Targ%22) | 5 | NEW | NO | A Klingon and Warrior pump on attack. |
| 226 | [Khan, Despot by Design](https://scryfall.com/search?q=%21%22Khan%2C+Despot+by+Design%22) | 5 | NEW | NO | 1 damage to each opponent and each opposing creature on entry. A one-shot. |
| 227 | [Klingon Strike Force](https://scryfall.com/search?q=%21%22Klingon+Strike+Force%22) | 5 | NEW | NO | A 5/5 trample haste that deals 2 to each opponent when it dies. Good fodder, but the 5-drops here are Elspeth and Dictate. |
| 228 | [Silicate Surveyor](https://scryfall.com/search?q=%21%22Silicate+Surveyor%22) | 5 | NEW | NO | A 4/4 reach that impulses one card. |
| 229 | [World at War](https://scryfall.com/search?q=%21%22World+at+War%22) | 5 | REPRINT | NO | Two extra combats across two turns (rebound) for 5. [Combat Celebrant](https://scryfall.com/search?q=%21%22Combat+Celebrant%22) repeats an extra combat for 3. |
| 230 | [Glory to the Empire!](https://scryfall.com/search?q=%21%22Glory+to+the+Empire%21%22) | 6 | NEW | NO | Three 2/1s and team melee for 6. Above the curve. |
| 231 | [Grilka, Widowed Warrior](https://scryfall.com/search?q=%21%22Grilka%2C+Widowed+Warrior%22) | 6 | NEW | NO | A threaten effect for 6. |
| 232 | [Horta](https://scryfall.com/search?q=%21%22Horta%22) | 6 | NEW | NO | A 7/6 trampler or a landcycler. |
| 233 | [Own the Day](https://scryfall.com/search?q=%21%22Own+the+Day%22) | 6 | NEW | NO | An extra combat for {1}{R}{R} once you've attacked three opponents, cast in main phase 2. A one-shot, where Combat Celebrant repeats. |
| 234 | [Ravenous Cosmozoan](https://scryfall.com/search?q=%21%22Ravenous+Cosmozoan%22) | 6 | NEW | NO | Its cost reduction needs noncreature cards in your graveyard. |
| 235 | [Pah-Wraith](https://scryfall.com/search?q=%21%22Pah-Wraith%22) | 7 | NEW | NO | 7 mana. |
| 236 | [Infinite Diversity](https://scryfall.com/search?q=%21%22Infinite+Diversity%22) | 9 | NEW | NO | 9 mana. |

### Multicolour (32)

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 237 | [Locutus, the One Who Speaks](https://scryfall.com/search?q=%21%22Locutus%2C+the+One+Who+Speaks%22) | 2 | NEW | NO | An artifact-creature anthem, or 2 damage from hand. Narrow. |
| 238 | [Pest Control](https://scryfall.com/search?q=%21%22Pest+Control%22) | 2 | REPRINT | NO | It destroys every nonland permanent with MV 1 or less, which is every token we control plus Sol Ring and Skullclamp. |
| 239 | [Rite of Oblivion](https://scryfall.com/search?q=%21%22Rite+of+Oblivion%22) | 2 | REPRINT | MAIN | Exile any nonland permanent for {W}{B} and a sacrifice, then again from the graveyard for {2}{W}{B}. Sacrificing a token is a death for every drainer. Swap 3, for [Vanishing Verse](https://scryfall.com/search?q=%21%22Vanishing+Verse%22). |
| 240 | [Talisman of Conviction](https://scryfall.com/search?q=%21%22Talisman+of+Conviction%22) | 2 | REPRINT | NO | Cut on 2026-11-10 for Chainsaw because red is the lightest colour (20 sources for 20 pips). Nothing in this set changes those grounds, and it stays the first ramp pick if a slot reopens. |
| 241 | [Talisman of Hierarchy](https://scryfall.com/search?q=%21%22Talisman+of+Hierarchy%22) | 2 | REPRINT | IN | Already in main (this set's reprint). |
| 242 | [Talisman of Indulgence](https://scryfall.com/search?q=%21%22Talisman+of+Indulgence%22) | 2 | REPRINT | IN | Already in main (this set's reprint). |
| 243 | [Terminate](https://scryfall.com/search?q=%21%22Terminate%22) | 2 | REPRINT | NO | Instant creature kill for {B}{R}. Path and Swords cost 1. |
| 244 | [The Duras Sisters](https://scryfall.com/search?q=%21%22The+Duras+Sisters%22) | 2 | NEW | NO | A 3/2 that leaves a 2/1 haste token when it dies. Two bodies for 2, below the token engines. |
| 245 | [Worf, Honor-Bound Warrior](https://scryfall.com/search?q=%21%22Worf%2C+Honor-Bound+Warrior%22) | 2 | NEW | NO | It doubles its own power at 8 team power. A combat body. |
| 246 | [Anguished Unmaking](https://scryfall.com/search?q=%21%22Anguished+Unmaking%22) | 3 | REPRINT | IN | Already in main (this set's reprint). |
| 247 | [Commander William Riker](https://scryfall.com/search?q=%21%22Commander+William+Riker%22) | 3 | NEW | NO | Two cards for {1} each turn, but the target opponent draws two too. |
| 248 | [Kira Nerys, Firebrand](https://scryfall.com/search?q=%21%22Kira+Nerys%2C+Firebrand%22) | 3 | NEW | NO | Creatures entering during combat enter attacking, which Caesar's tokens already do. A 4/3 trampler otherwise. |
| 249 | [Kirk, Commanding Officer](https://scryfall.com/search?q=%21%22Kirk%2C+Commanding+Officer%22) | 3 | NEW | NO | It impulses one card per attack at 8 power and can sacrifice itself to destroy an artifact or enchantment. Kurn draws more for the same mana and keeps the cards. |
| 250 | [L'Rell, Fierce Visionary](https://scryfall.com/search?q=%21%22L%27Rell%2C+Fierce+Visionary%22) | 3 | NEW | SIDE | A hasty 2/1 Klingon Warrior each combat, sacrificed at end step: a guaranteed death each turn for every drainer, a Grave Pact edict, a Zurgo drain and Caesar fodder. Would displace [Legion Warboss](https://scryfall.com/search?q=%21%22Legion+Warboss%22). |
| 251 | [Vic Fontaine, One Night Only](https://scryfall.com/search?q=%21%22Vic+Fontaine%2C+One+Night+Only%22) | 3 | NEW | NO | +2/+0 and lifelink on two creatures on your second draw. Combat-only. |
| 252 | [Vindicate](https://scryfall.com/search?q=%21%22Vindicate%22) | 3 | REPRINT | NO | Destroy any permanent at sorcery speed for 3. Rite of Oblivion exiles any nonland permanent twice for 2. |
| 253 | [Warleader's Call](https://scryfall.com/search?q=%21%22Warleader%27s+Call%22) | 3 | REPRINT | IN | Already in main (this set's reprint). |
| 254 | [Worf, Son of Mogh](https://scryfall.com/search?q=%21%22Worf%2C+Son+of+Mogh%22) | 3 | NEW | NO | One Officer on your second draw each turn and an Officer lord. One token a turn at most. |
| 255 | [Zero, Incorporeal Sensate](https://scryfall.com/search?q=%21%22Zero%2C+Incorporeal+Sensate%22) | 3 | NEW | NO | A 2/2 lifelinker that taxes one card in an opponent's hand. |
| 256 | [Curzon Dax, Bound by Blood](https://scryfall.com/search?q=%21%22Curzon+Dax%2C+Bound+by+Blood%22) | 4 | NEW | NO | It pings each opponent when a Klingon or Warrior dies. [Zulaport Cutthroat](https://scryfall.com/search?q=%21%22Zulaport+Cutthroat%22) and [Cruel Celebrant](https://scryfall.com/search?q=%21%22Cruel+Celebrant%22) already pay on every death. |
| 257 | [Gowron, Eager for Battle](https://scryfall.com/search?q=%21%22Gowron%2C+Eager+for+Battle%22) | 4 | NEW | NO | A free sacrifice outlet that draws only for Klingons. The list's only Klingon is Black Market Connections' changeling, and it already has four free outlets. |
| 258 | [Kor, Cause of Vengeance](https://scryfall.com/search?q=%21%22Kor%2C+Cause+of+Vengeance%22) | 4 | NEW | SIDE | A second Caesar-style trigger: whenever you attack, sacrifice a creature to draw a card and give Klingons and Warriors +2/+2. It never has to attack itself. Would displace Idol of Oblivion if swap 4 is declined. |
| 259 | [Rite of Ascension](https://scryfall.com/search?q=%21%22Rite+of+Ascension%22) | 4 | NEW | SIDE | Whenever you attack, one tapped and attacking 2/1 haste Warrior per opponent you attacked, so three in a four-player game. An enchantment that needs no specific attacker. Would displace [Hero of Bladehold](https://scryfall.com/search?q=%21%22Hero+of+Bladehold%22). |
| 260 | [Alexander, Ship's Fool](https://scryfall.com/search?q=%21%22Alexander%2C+Ship%27s+Fool%22) | 5 | NEW | NO | Symmetric draw with random damage for 5. |
| 261 | [Chancellor Gorkon](https://scryfall.com/search?q=%21%22Chancellor+Gorkon%22) | 5 | NEW | NO | A 5/3 that exiles two creatures when it dies, so sacrificing it is removal. 5 mana. |
| 262 | [Deliver from Chaos](https://scryfall.com/search?q=%21%22Deliver+from+Chaos%22) | 5 | NEW | NO | Instant exile that gives you Borg tokens equal to the target's MV. Strong on a big target, but the removal here costs 1 to 3. |
| 263 | [Sins of the Father](https://scryfall.com/search?q=%21%22Sins+of+the+Father%22) | 5 | NEW | NO | An edict, tokens and a graveyard drain over three turns for 5. |
| 264 | [The City on the Edge of Forever](https://scryfall.com/search?q=%21%22The+City+on+the+Edge+of+Forever%22) | 5 | NEW | NO | It phases out every artifact and creature, ours included. |
| 265 | [Worf, Defiant Commander](https://scryfall.com/search?q=%21%22Worf%2C+Defiant+Commander%22) | 5 | NEW | NO | Battlefront impulse of up to three cards per attack and a 2/1 haste on entry, but it costs 5 and the cards expire at the end of your next turn. Kurn draws to hand for 3. |
| 266 | [Worf, Still Not Merry](https://scryfall.com/search?q=%21%22Worf%2C+Still+Not+Merry%22) | 5 | NEW | SIDE | Whenever Worf attacks, one 1/1 flying Faerie per attacking non-Faerie creature, tokens that entered attacking included. A mid-game attack makes 8 or more. 5 mana, and Worf must attack. Would displace Hero of Bladehold. |
| 267 | [Borg Cube](https://scryfall.com/search?q=%21%22Borg+Cube%22) | 7 | NEW | NO | 7 mana. |
| 268 | [Ruinous Ultimatum](https://scryfall.com/search?q=%21%22Ruinous+Ultimatum%22) | 7 | REPRINT | IN | Already in main (this set's reprint). |

### Colourless (59)

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 269 | [Astral Cornucopia](https://scryfall.com/search?q=%21%22Astral+Cornucopia%22) | 0 | REPRINT | NO | An X-cost rock, inefficient below X=2. |
| 270 | [Engineered Explosives](https://scryfall.com/search?q=%21%22Engineered+Explosives%22) | 0 | REPRINT | NO | At X=0 it kills every token we control. |
| 271 | [Everflowing Chalice](https://scryfall.com/search?q=%21%22Everflowing+Chalice%22) | 0 | REPRINT | NO | Colourless ramp. Talisman of Conviction is the first pick if a ramp slot reopens. |
| 272 | [Jefferies Tube](https://scryfall.com/search?q=%21%22Jefferies+Tube%22) | 1 | NEW | NO | Mana sinks for charge counters, unblockability and a slow draw. |
| 273 | [Skullclamp](https://scryfall.com/search?q=%21%22Skullclamp%22) | 1 | REPRINT | IN | Already in main (this set's reprint). |
| 274 | [Sol Ring](https://scryfall.com/search?q=%21%22Sol+Ring%22) | 1 | REPRINT | IN | Already in main (this set's reprint). |
| 275 | [Tricorder](https://scryfall.com/search?q=%21%22Tricorder%22) | 1 | NEW | NO | A +1/+1 Equipment (a Skullclamp cost on its carrier) with surveil. |
| 276 | [Wayfarer's Bauble](https://scryfall.com/search?q=%21%22Wayfarer%27s+Bauble%22) | 1 | REPRINT | NO | Slow ramp to a basic. |
| 277 | [Arcane Signet](https://scryfall.com/search?q=%21%22Arcane+Signet%22) | 2 | REPRINT | IN | Already in main (this set's reprint). |
| 278 | [Cybernetic Specialist](https://scryfall.com/search?q=%21%22Cybernetic+Specialist%22) | 2 | NEW | NO | A 2/1 with surveil. |
| 279 | [Disruptor Pistol](https://scryfall.com/search?q=%21%22Disruptor+Pistol%22) | 2 | NEW | NO | 5 damage to a creature for 6 mana in total. |
| 280 | [Howling Mine](https://scryfall.com/search?q=%21%22Howling+Mine%22) | 2 | REPRINT | NO | Symmetric draw. |
| 281 | [Isolinear Processor](https://scryfall.com/search?q=%21%22Isolinear+Processor%22) | 2 | NEW | NO | Restricted mana and a loot. |
| 282 | [Lightning Greaves](https://scryfall.com/search?q=%21%22Lightning+Greaves%22) | 2 | REPRINT | NO | The 2026-09-24 grounds still hold. Shroud stops you targeting Caesar with Infantry Shield's equip, Mother of Runes and Mithril Coat's attach (CR 702.18a). Swiftfoot Boots gives hexproof instead. |
| 283 | [Mind Stone](https://scryfall.com/search?q=%21%22Mind+Stone%22) | 2 | REPRINT | NO | A colourless rock. Talisman of Conviction is the first pick if a ramp slot reopens. |
| 284 | [Replicator](https://scryfall.com/search?q=%21%22Replicator%22) | 2 | NEW | NO | It copies one token for {2} a turn. [Kher Keep](https://scryfall.com/search?q=%21%22Kher+Keep%22) makes a body for the same mana. |
| 285 | [Swiftfoot Boots](https://scryfall.com/search?q=%21%22Swiftfoot+Boots%22) | 2 | REPRINT | IN | Already in main (this set's reprint). |
| 286 | [Tea, Earl Grey, Hot](https://scryfall.com/search?q=%21%22Tea%2C+Earl+Grey%2C+Hot%22) | 2 | NEW | NO | A cantrip artifact with a small ping or lifegain later. |
| 287 | [Thought Vessel](https://scryfall.com/search?q=%21%22Thought+Vessel%22) | 2 | REPRINT | NO | A colourless rock. |
| 288 | [Type-2 Phaser](https://scryfall.com/search?q=%21%22Type-2+Phaser%22) | 2 | NEW | NO | It stuns one creature and gives +3/+0. Combat Equipment. |
| 289 | [U.S.S. Defiant, Mirror Migrant](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Mirror+Migrant%22) | 2 | NEW | NO | Flash phasing for itself and one creature saves Caesar once. Teferi's Protection and The Needs of the Many cover the team. |
| 290 | [Warp Core](https://scryfall.com/search?q=%21%22Warp+Core%22) | 2 | NEW | NO | It fetches a basic to hand, and its other ability only charges Spacecraft. |
| 291 | [Class-F Shuttlecraft](https://scryfall.com/search?q=%21%22Class-F+Shuttlecraft%22) | 3 | NEW | NO | A 3-mana rock that can become a flyer. The list's ramp costs 2. |
| 292 | [Combadge](https://scryfall.com/search?q=%21%22Combadge%22) | 3 | NEW | NO | Unblockability for two Communicator carriers. Combat-only. |
| 293 | [Commander's Sphere](https://scryfall.com/search?q=%21%22Commander%27s+Sphere%22) | 3 | REPRINT | NO | A 3-mana rock. |
| 294 | [Darksteel Plate](https://scryfall.com/search?q=%21%22Darksteel+Plate%22) | 3 | REPRINT | NO | The 2026-09-24 grounds still hold. It costs 3 plus equip {2} for the indestructible that Mithril Coat gives with flash and a free attach. |
| 295 | [Herald's Horn](https://scryfall.com/search?q=%21%22Herald%27s+Horn%22) | 3 | REPRINT | NO | A 3-mana cost reducer for one creature type. |
| 296 | [I.K.S. Negh'Var, Imperial Flagship](https://scryfall.com/search?q=%21%22I.K.S.+Negh%27Var%2C+Imperial+Flagship%22) | 3 | NEW | NO | Vigilance for Klingons and Warriors, then 10 station. |
| 297 | [K't'inga-Class Battle Cruiser](https://scryfall.com/search?q=%21%22K%27t%27inga-Class+Battle+Cruiser%22) | 3 | NEW | NO | Flying for Klingons and Warriors, and it needs 4 station. |
| 298 | [S.S. Botany Bay](https://scryfall.com/search?q=%21%22S.S.+Botany+Bay%22) | 3 | NEW | NO | Graveyard exile and a slow recursion. |
| 299 | [Starfleet Communicator](https://scryfall.com/search?q=%21%22Starfleet+Communicator%22) | 3 | NEW | NO | Two Communicators that draw when their carriers attack. It needs two declared attackers wearing it each turn and {1} re-equips after the deck sacrifices them. |
| 300 | [Sword of Light and Shadow](https://scryfall.com/search?q=%21%22Sword+of+Light+and+Shadow%22) | 3 | REPRINT | NO | Protection from white on Caesar also stops Mother of Runes, a white source, from targeting him. The rest needs him to connect. |
| 301 | [The Guardian of Forever](https://scryfall.com/search?q=%21%22The+Guardian+of+Forever%22) | 3 | NEW | NO | {4} to blink a sacrificed nontoken creature. Expensive. |
| 302 | [U.S.S. Enterprise-D, Galaxy-Class](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-D%2C+Galaxy-Class%22) | 3 | NEW | NO | Impulse when it gets charge counters. Station-dependent. |
| 303 | [U.S.S. Stargazer, Here and There](https://scryfall.com/search?q=%21%22U.S.S.+Stargazer%2C+Here+and+There%22) | 3 | NEW | NO | It needs 6 station before its attack token. |
| 304 | [Class-4 Tactical Cube](https://scryfall.com/search?q=%21%22Class-4+Tactical+Cube%22) | 4 | NEW | NO | Two artifact 1/1s for 4, then 7 station for an artifact anthem. |
| 305 | [Door of Destinies](https://scryfall.com/search?q=%21%22Door+of+Destinies%22) | 4 | REPRINT | NO | It grows only on spells of the chosen type, and tokens aren't cast. |
| 306 | [Hedron Archive](https://scryfall.com/search?q=%21%22Hedron+Archive%22) | 4 | REPRINT | NO | A 4-mana rock. |
| 307 | [K'Vort-Class Raider](https://scryfall.com/search?q=%21%22K%27Vort-Class+Raider%22) | 4 | NEW | NO | Team hexproof during your turn only. [Myrel, Shield of Argive](https://scryfall.com/search?q=%21%22Myrel%2C+Shield+of+Argive%22) already stops spells on your turn, and the danger to Caesar is their turns. |
| 308 | [Queen's Diamond](https://scryfall.com/search?q=%21%22Queen%27s+Diamond%22) | 4 | NEW | NO | Mana only for the commander, after station. |
| 309 | [Reconnaissance Partition](https://scryfall.com/search?q=%21%22Reconnaissance+Partition%22) | 4 | NEW | NO | Two uses of ramp or draw on a 3/3 for 4. |
| 310 | [Stonespeaker Crystal](https://scryfall.com/search?q=%21%22Stonespeaker+Crystal%22) | 4 | REPRINT | NO | A 4-mana rock. |
| 311 | [The Sword of Kahless](https://scryfall.com/search?q=%21%22The+Sword+of+Kahless%22) | 4 | NEW | NO | It finds Klingon or Warrior creature cards, and the list has two. |
| 312 | [Unwinding Clock](https://scryfall.com/search?q=%21%22Unwinding+Clock%22) | 4 | REPRINT | NO | It untaps artifacts on other players' turns, and the list's tap artifacts are four rocks and Idol of Oblivion. 4 mana for a few extra mana. |
| 313 | [Alhammarret's Archive](https://scryfall.com/search?q=%21%22Alhammarret%27s+Archive%22) | 5 | REPRINT | NO | It doubles every extra draw (Skullclamp would draw four) and every lifegain, but 5 mana for no board, and the draw count is already inside the aim. |
| 314 | [Forsaken Monument](https://scryfall.com/search?q=%21%22Forsaken+Monument%22) | 5 | REPRINT | NO | It pumps colourless creatures, and few here are. |
| 315 | [Sickbay](https://scryfall.com/search?q=%21%22Sickbay%22) | 5 | NEW | NO | Lifegain per creature entering and a counter pile on one creature. 5 mana. |
| 316 | [Starship Enterprise](https://scryfall.com/search?q=%21%22Starship+Enterprise%22) | 5 | NEW | NO | 16 station. |
| 317 | [U.S.S. Cerritos, Following Up](https://scryfall.com/search?q=%21%22U.S.S.+Cerritos%2C+Following+Up%22) | 5 | NEW | NO | Two Officers for 5, then station. |
| 318 | [U.S.S. Enterprise-C, Time-Tossed](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-C%2C+Time-Tossed%22) | 5 | NEW | NO | A wheel of your own hand on entry or death. |
| 319 | [U.S.S. Prometheus, Prototype](https://scryfall.com/search?q=%21%22U.S.S.+Prometheus%2C+Prototype%22) | 5 | NEW | NO | A station flyer with no engine. |
| 320 | [Command Chair](https://scryfall.com/search?q=%21%22Command+Chair%22) | 6 | NEW | NO | A 6-mana rock. |
| 321 | [The Immortal Sun](https://scryfall.com/search?q=%21%22The+Immortal+Sun%22) | 6 | REPRINT | NO | Its +1/+1 anthem switches off Skullclamp, and it stops [Elspeth, Storm Slayer](https://scryfall.com/search?q=%21%22Elspeth%2C+Storm+Slayer%22)'s loyalty abilities. |
| 322 | [U.S.S. Defiant, Tough Little Ship](https://scryfall.com/search?q=%21%22U.S.S.+Defiant%2C+Tough+Little+Ship%22) | 6 | NEW | NO | 6 mana. |
| 323 | [U.S.S. Farragut, Bold Explorer](https://scryfall.com/search?q=%21%22U.S.S.+Farragut%2C+Bold+Explorer%22) | 6 | NEW | NO | 6 mana and station. |
| 324 | [The Holodeck](https://scryfall.com/search?q=%21%22The+Holodeck%22) | 7 | NEW | NO | 7 mana. |
| 325 | [Crystalline Entity](https://scryfall.com/search?q=%21%22Crystalline+Entity%22) | 8 | NEW | NO | An 8-mana wipe of nonartifact creatures, ours included. |
| 326 | [Planet Killer](https://scryfall.com/search?q=%21%22Planet+Killer%22) | 8 | NEW | NO | 8 mana. |
| 327 | [Deep Space 9](https://scryfall.com/search?q=%21%22Deep+Space+9%22) | 9 | NEW | NO | 9 mana. |

### Lands (46)

| # | Name | MV | New? | main | Reason |
|---|---|---|---|---|---|
| 328 | [Artificial Anomaly](https://scryfall.com/search?q=%21%22Artificial+Anomaly%22) | 0 | NEW | NO | Its {3}{B} sacrifice drains 2 and leaves a tapped any-colour Planet, but a colourless land costs a coloured source in a list that needs {W}{W}{W} and {B}{B}{B}. |
| 329 | [Bajor](https://scryfall.com/search?q=%21%22Bajor%22) | 0 | NEW | NO | A tapped R/W dual with 1 life. The list's R/W duals enter untapped more often. |
| 330 | [Battlefield Forge](https://scryfall.com/search?q=%21%22Battlefield+Forge%22) | 0 | REPRINT | IN | Already in main (this set's reprint). |
| 331 | [Blood Crypt](https://scryfall.com/search?q=%21%22Blood+Crypt%22) | 0 | REPRINT | IN | Already in main (this set's reprint). |
| 332 | [Canyon Slough](https://scryfall.com/search?q=%21%22Canyon+Slough%22) | 0 | REPRINT | NO | A tapped B/R cycler. |
| 333 | [Cardassia Prime](https://scryfall.com/search?q=%21%22Cardassia+Prime%22) | 0 | NEW | NO | A tapped W/B dual with 1 life. [Vault of Champions](https://scryfall.com/search?q=%21%22Vault+of+Champions%22) is the untapped W/B dual. |
| 334 | [Clifftop Retreat](https://scryfall.com/search?q=%21%22Clifftop+Retreat%22) | 0 | REPRINT | IN | Already in main (this set's reprint). |
| 335 | [Command Beacon](https://scryfall.com/search?q=%21%22Command+Beacon%22) | 0 | REPRINT | NO | It saves commander tax once, for a colourless land. |
| 336 | [Command Tower](https://scryfall.com/search?q=%21%22Command+Tower%22) | 0 | REPRINT | IN | Already in main (this set's reprint). |
| 337 | [Dragonskull Summit](https://scryfall.com/search?q=%21%22Dragonskull+Summit%22) | 0 | REPRINT | IN | Already in main (this set's reprint). |
| 338 | [Eclipsed Steppe](https://scryfall.com/search?q=%21%22Eclipsed+Steppe%22) | 0 | REPRINT | NO | It enters tapped unless you control two basics, and the list runs six. |
| 339 | [Evolving Wilds](https://scryfall.com/search?q=%21%22Evolving+Wilds%22) | 0 | REPRINT | NO | A tapped basic-fetcher. |
| 340 | [Exotic Orchard](https://scryfall.com/search?q=%21%22Exotic+Orchard%22) | 0 | REPRINT | NO | Its colours depend on opponents' lands. |
| 341 | [Fabled Passage](https://scryfall.com/search?q=%21%22Fabled+Passage%22) | 0 | REPRINT | NO | It fetches a basic only, and the list runs six. |
| 342 | [Federation Outpost](https://scryfall.com/search?q=%21%22Federation+Outpost%22) | 0 | NEW | NO | A mono-white land. |
| 343 | [Foreboding Ruins](https://scryfall.com/search?q=%21%22Foreboding+Ruins%22) | 0 | REPRINT | NO | A B/R snarl that enters tapped without a Swamp or Mountain card in hand. Vault of Champions is the better pick for a basic's slot. |
| 344 | [Furycalm Snarl](https://scryfall.com/search?q=%21%22Furycalm+Snarl%22) | 0 | REPRINT | NO | An R/W snarl that enters tapped without a Mountain or Plains card in hand. Vault of Champions is the better pick for a basic's slot. |
| 345 | [Glittering Massif](https://scryfall.com/search?q=%21%22Glittering+Massif%22) | 0 | REPRINT | NO | A tapped R/W cycler. |
| 346 | [Godless Shrine](https://scryfall.com/search?q=%21%22Godless+Shrine%22) | 0 | REPRINT | IN | Already in main (this set's reprint). |
| 347 | [Isolated Chapel](https://scryfall.com/search?q=%21%22Isolated+Chapel%22) | 0 | REPRINT | IN | Already in main (this set's reprint). |
| 348 | [Mountain](https://scryfall.com/search?q=%21%22Mountain%22) | 0 | REPRINT | IN | Already in main (this set's reprint). |
| 349 | [Mutavault](https://scryfall.com/search?q=%21%22Mutavault%22) | 0 | REPRINT | NO | A colourless creature land. |
| 350 | [Nomad Outpost](https://scryfall.com/search?q=%21%22Nomad+Outpost%22) | 0 | REPRINT | IN | Already in main (this set's reprint). |
| 351 | [Path of Ancestry](https://scryfall.com/search?q=%21%22Path+of+Ancestry%22) | 0 | REPRINT | NO | A tapped any-colour land. |
| 352 | [Plains](https://scryfall.com/search?q=%21%22Plains%22) | 0 | REPRINT | IN | Already in main (this set's reprint). |
| 353 | [Qo'noS](https://scryfall.com/search?q=%21%22Qo%27noS%22) | 0 | NEW | NO | A tapped B/R dual with 1 life. |
| 354 | [Quark's Bar](https://scryfall.com/search?q=%21%22Quark%27s+Bar%22) | 0 | NEW | NO | A mono-red land with a 1-damage ping. |
| 355 | [Radiant Summit](https://scryfall.com/search?q=%21%22Radiant+Summit%22) | 0 | REPRINT | NO | It enters tapped unless you control two basics. |
| 356 | [Reliquary Tower](https://scryfall.com/search?q=%21%22Reliquary+Tower%22) | 0 | REPRINT | NO | A colourless land. |
| 357 | [Rogue's Passage](https://scryfall.com/search?q=%21%22Rogue%27s+Passage%22) | 0 | REPRINT | NO | A colourless land. |
| 358 | [Sacred Foundry](https://scryfall.com/search?q=%21%22Sacred+Foundry%22) | 0 | REPRINT | IN | Already in main (this set's reprint). |
| 359 | [Shattered Landscape](https://scryfall.com/search?q=%21%22Shattered+Landscape%22) | 0 | REPRINT | NO | A colourless land that fetches a tapped basic. |
| 360 | [Shineshadow Snarl](https://scryfall.com/search?q=%21%22Shineshadow+Snarl%22) | 0 | REPRINT | NO | A W/B snarl that enters tapped without a Plains or Swamp card in hand. Vault of Champions is untapped every time. |
| 361 | [Smoldering Marsh](https://scryfall.com/search?q=%21%22Smoldering+Marsh%22) | 0 | REPRINT | NO | It enters tapped unless you control two basics. |
| 362 | [Spatial Anomaly](https://scryfall.com/search?q=%21%22Spatial+Anomaly%22) | 0 | NEW | NO | A colourless land with a slow removal mode. |
| 363 | [Spire of Industry](https://scryfall.com/search?q=%21%22Spire+of+Industry%22) | 0 | REPRINT | NO | Any colour only with an artifact and 1 life. |
| 364 | [Starfleet Academy](https://scryfall.com/search?q=%21%22Starfleet+Academy%22) | 0 | NEW | NO | A colourless land whose mana ability costs {5}. |
| 365 | [Subspace Anomaly](https://scryfall.com/search?q=%21%22Subspace+Anomaly%22) | 0 | NEW | NO | A colourless land. {4}{W} and a sacrifice make two Officers and a tapped Planet, a late token maker that costs a coloured source early. |
| 366 | [Swamp](https://scryfall.com/search?q=%21%22Swamp%22) | 0 | REPRINT | IN | Already in main (this set's reprint). |
| 367 | [Temple of Malice](https://scryfall.com/search?q=%21%22Temple+of+Malice%22) | 0 | REPRINT | NO | A tapped B/R scry land. |
| 368 | [Temple of the False God](https://scryfall.com/search?q=%21%22Temple+of+the+False+God%22) | 0 | REPRINT | NO | A colourless land that does nothing early. |
| 369 | [Terramorphic Expanse](https://scryfall.com/search?q=%21%22Terramorphic+Expanse%22) | 0 | REPRINT | NO | A tapped basic-fetcher. |
| 370 | [The Unicomplex](https://scryfall.com/search?q=%21%22The+Unicomplex%22) | 0 | NEW | NO | A mono-black land. |
| 371 | [Umbral Expanse](https://scryfall.com/search?q=%21%22Umbral+Expanse%22) | 0 | REPRINT | NO | A tapped W/B cycler. |
| 372 | [Unexplored Territory](https://scryfall.com/search?q=%21%22Unexplored+Territory%22) | 0 | NEW | NO | A colourless basic-fetcher. |
| 373 | [Vault of Champions](https://scryfall.com/search?q=%21%22Vault+of+Champions%22) | 0 | REPRINT | MAIN | A W/B dual that enters untapped whenever you have two or more opponents, which in Commander is almost always. Swap 5, for one [Plains](https://scryfall.com/search?q=%21%22Plains%22). |

---

## Proposed swaps (5), one decision each

**Baseline (`main` as it stands):** 100 cards, 34 lands, average MV 2.71 across the 66 nonland cards
with the commander, MV ≤ 2 = 30 and MV ≤ 3 = 52 of the 65 nonland cards in the 99, pips W37 B34 R20,
sources W24 B23 R20, Game Changers 3 of 3.

**Card draw recount (pilot aim: 8 to 10 sources, Clue makers never count):** 9 sources.
[Black Market Connections](https://scryfall.com/search?q=%21%22Black+Market+Connections%22), [Bloodline Recollector](https://scryfall.com/search?q=%21%22Bloodline+Recollector%22), [Commissar Severina Raine](https://scryfall.com/search?q=%21%22Commissar+Severina+Raine%22), Idol of Oblivion,
[Morbid Opportunist](https://scryfall.com/search?q=%21%22Morbid+Opportunist%22), Skullclamp and [Tocasia's Welcome](https://scryfall.com/search?q=%21%22Tocasia%27s+Welcome%22) are in the draw role, and
[Court of Grace](https://scryfall.com/search?q=%21%22Court+of+Grace%22) (the monarch draw) and [Zurgo Stormrender](https://scryfall.com/search?q=%21%22Zurgo+Stormrender%22) draw from other roles. Demonic Tutor is
a tutor, not a draw source, and the list runs no Clue makers. None of the five swaps changes the count.

### 1. Troubling Tribbles in, Assemble the Legion out. Deciding axis: tokens per mana in the turns after it lands

**In**, {2}{W}, 0/1 Creature, Tribble: *"This creature can't block. At the beginning of your upkeep,
create a token that's a copy of this creature."*

**Out**, {3}{R}{W}, Enchantment: *"At the beginning of your upkeep, put a muster counter on this
enchantment. Then create a 1/1 red and white Soldier creature token with haste for each muster
counter on this enchantment."*

**Cost-out.** The list has no reducers, so it's 3 mana against 5.

**How it grows.** A token copy has the original's rules text (CR 707.2), so every Tribble, original
or copy, triggers at your upkeep, and the count doubles each turn. Each trigger is its own token event,
so [Anointed Procession](https://scryfall.com/search?q=%21%22Anointed+Procession%22), [Mondrak, Glory Dominus](https://scryfall.com/search?q=%21%22Mondrak%2C+Glory+Dominus%22) and [Elspeth, Storm Slayer](https://scryfall.com/search?q=%21%22Elspeth%2C+Storm+Slayer%22) double each one
(ledger repl-013).

| Upkeeps after it lands | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Troubling Tribbles: new tokens (Tribbles in total) | 1 (2) | 2 (4) | 4 (8) | 8 (16) |
| Assemble the Legion: new tokens (total) | 1 (1) | 2 (3) | 3 (6) | 4 (10) |
| Tribbles with one token doubler | 2 (3) | 6 (9) | 18 (27) | 54 (81) |
| Assemble with one token doubler | 2 (2) | 4 (6) | 6 (12) | 8 (20) |

**What each Tribble does here.** It's a 0/1, so Skullclamp kills it and draws two for equip {1}. It's
Caesar's sacrifice fodder and a Grave Pact edict when it dies. Each one entering is 2 damage to each
opponent from [Purphoros, God of the Forge](https://scryfall.com/search?q=%21%22Purphoros%2C+God+of+the+Forge%22) and 1 each from [Impact Tremors](https://scryfall.com/search?q=%21%22Impact+Tremors%22) and Warleader's Call,
and Elas gains 1. A copy has the original's mana cost, so Tribble tokens are MV 3 and also turn on
Tocasia's Welcome.

**Role table, Token Engines (13 plus the candidate), scored against the current list:**

| Card | MV | Bodies over a turn cycle | Needs | Survives a creature wipe? | Notes |
|---|---|---|---|---|---|
| [Ocelot Pride](https://scryfall.com/search?q=%21%22Ocelot+Pride%22) | 1 | 1 Cat at your end step | you gained life that turn | no | With the city's blessing it copies every token that entered that turn |
| [Bitterblossom](https://scryfall.com/search?q=%21%22Bitterblossom%22) | 2 | 1 flyer each upkeep, 1 life | nothing | yes | |
| [Bitterbloom Bearer](https://scryfall.com/search?q=%21%22Bitterbloom+Bearer%22) | 2 | 1 flyer each upkeep, 1 life | nothing | no | Flash |
| [Loyal Apprentice](https://scryfall.com/search?q=%21%22Loyal+Apprentice%22) | 2 | 1 hasty Thopter each combat | Caesar on the battlefield | no | Kept 2026-11-10 as a body supplier for Caesar |
| [Adeline, Resplendent Cathar](https://scryfall.com/search?q=%21%22Adeline%2C+Resplendent+Cathar%22) | 3 | 3 Humans per attack (one per opponent) | any attack | no | |
| [Anim Pakal, Thousandth Moon](https://scryfall.com/search?q=%21%22Anim+Pakal%2C+Thousandth+Moon%22) | 3 | 1, then 2, then 3 Gnomes per attack | non-Gnome attackers | no | |
| Legion Warboss | 3 | 1 Goblin each combat, which must attack | nothing | no | Kept 2026-11-10 as a body supplier for Caesar |
| [Infantry Shield](https://scryfall.com/search?q=%21%22Infantry+Shield%22) | 3 + equip 2 | Warriors equal to the carrier's power per attack, sacrificed at end step | a carrier that attacks | the Equipment does | The pilot's ask |
| Hero of Bladehold | 4 | 2 Soldiers per Hero attack, plus battle cry | Hero attacks | no | |
| Court of Grace | 4 | a 1/1 flyer or a 4/4 Angel each upkeep | nothing | yes | Also a draw source (the monarch) |
| [Myrel, Shield of Argive](https://scryfall.com/search?q=%21%22Myrel%2C+Shield+of+Argive%22) | 4 | Soldiers equal to your Soldier count per Myrel attack | Myrel attacks | no | Opponents can't cast spells on your turn |
| **Assemble the Legion** | 5 | 1, 2, 3, 4 hasty Soldiers on successive upkeeps | nothing | yes | The slowest maker per mana |
| Secure the Wastes | X+1 | X Warriors once, at instant speed | mana | not applicable | A one-shot |
| **Troubling Tribbles** | 3 | 1, 2, 4, 8 Tribbles on successive upkeeps | nothing | no | Spot removal on one Tribble does nothing, since every copy carries the trigger |

**Cut: Assemble the Legion.** After four upkeeps it has made 10 tokens for 5 mana, where Tribbles has
made 15 for 3, and the gap widens every turn after. What Assemble does that Tribbles doesn't, stated
plainly:

- It's an enchantment, so it keeps making tokens after a creature wipe. Every Tribble dies to a
  wipe. [Flawless Maneuver](https://scryfall.com/search?q=%21%22Flawless+Maneuver%22) and Teferi's Protection save them from a destroy wipe.
- Its Soldiers have haste, so they can be declared attackers the turn they arrive, which Ingris
  Stingerquill, Commissar Raine and battle cry use. Tribbles are summoning sick the turn they arrive,
  and they can never block.
- Its Soldiers feed Myrel's X. Myrel still counts Caesar's and Hero's Soldiers, Caesar, General's
  Enforcer, Commissar Raine, Anim Pakal, Bastion's token, Elspeth's +1 tokens and her own tokens.

**Trigger-word check (eval-011).** Tribbles' words are "upkeep", "create a token" and "copy".
Assemble's text shares only the upkeep timing, and neither card feeds the other.
**Records check (tool-019).** The deck's records name Assemble only as the slot two FRA bench cards
would take (Draconic Visitor, Niv-Mizzet) and in `gameplan.md` §3 (turn 5 and 6 plays) and §6 (the
upkeep step). Nothing protects it. Update both gameplan lines if this swap is applied.
**Other cuts considered.** Secure the Wastes is the deck's instant-speed burst and the bench slot for
Combat Celebrant and Grand Crescendo. Loyal Apprentice and Legion Warboss were kept on 2026-11-10 as
the bodies Caesar sacrifices, and those grounds still hold. Court of Grace is a draw source, and
cutting it would drop the count to 8.

**Self-hits.** [The Meathook Massacre](https://scryfall.com/search?q=%21%22The+Meathook+Massacre%22) at X ≥ 1 kills the Tribbles. Warleader's Call makes them
1/2, so a clamped Tribble survives, which is the anthem cost the gameplan already names.

**Declare this engine.** The copy trigger has no "may", so the pilot can't stop the growth. It isn't
a loop or an infinite, but with Purphoros out it deals 4, 8, 16 and 32 to each opponent on four
successive upkeeps with no other card. Tribbles on turn 3 and Purphoros on turn 4 kill a full-life
table on turn 8 on their own, and sooner with a doubler or the rest of the deck. Tracking is the
other cost: 16 tokens after four upkeeps, or 81 with a doubler.

**Curve.** Average MV 2.71 → 2.68, MV ≤ 2 30 → 30, MV ≤ 3 52 → 53. Pips R20 → 19.

### 2. Vengeance Mission in, Blood Artist out. Deciding axis: drain per death over a game, and surviving a creature wipe

**In**, {2}{B}, Enchantment: *"Whenever a creature dies, put a quest counter on this enchantment.
Target opponent loses 1 life. That player loses 2 life instead if there are seven or more quest
counters on this enchantment."*

**Out**, {1}{B}, 0/1 Creature: *"Whenever this creature or another creature dies, target player loses
1 life and you gain 1 life."*

**Cost-out.** 3 mana against 2, with no reducers.

**Role table, Drain & Death Payoffs (13 plus the candidate), scored against the current list:**

| Card | MV | Fires on | Output | Reach | Survives a creature wipe? | Status |
|---|---|---|---|---|---|---|
| [Grave Pact](https://scryfall.com/search?q=%21%22Grave+Pact%22) | 4 | own creature dies | each other player sacrifices a creature | each player | yes | Pilot decision 2026-09-24 |
| [Dictate of Erebos](https://scryfall.com/search?q=%21%22Dictate+of+Erebos%22) | 5 | own creature dies | each opponent sacrifices a creature | each opponent | yes | Pilot decision 2026-09-24 |
| [Bastion of Remembrance](https://scryfall.com/search?q=%21%22Bastion+of+Remembrance%22) | 3 | own creature dies | 1 loss each, gain 1 | each opponent | yes | Pilot keep 2026-09-28 |
| [Zulaport Cutthroat](https://scryfall.com/search?q=%21%22Zulaport+Cutthroat%22) | 2 | own creature dies | 1 loss each, gain 1 | each opponent | no | Pilot keep 2026-09-28 |
| Impact Tremors | 2 | own creature enters | 1 damage each | each opponent | yes | Pilot keep 2026-09-28 |
| Purphoros, God of the Forge | 4 | another own creature enters | 2 damage each | each opponent | yes (indestructible, rarely a creature) | The pilot's ask 2026-09-28 |
| Warleader's Call | 3 | own creature enters | 1 damage each, plus an anthem | each opponent | yes | |
| [Mayhem Devil](https://scryfall.com/search?q=%21%22Mayhem+Devil%22) | 3 | any player sacrifices any permanent | 1 damage | any target | no | Treasures and fetches count |
| Zurgo Stormrender | 3 | own token leaves | a card if it was attacking, else 1 loss each | each opponent | no | Also a draw source |
| [Ingris Stingerquill](https://scryfall.com/search?q=%21%22Ingris+Stingerquill%22) | 3 | own creature declared as an attacker | 1 damage each per attacker | each opponent | no | |
| [Cruel Celebrant](https://scryfall.com/search?q=%21%22Cruel+Celebrant%22) | 2 | own creature or planeswalker dies | 1 loss each, gain 1 | each opponent | no | |
| Elas il-Kor | 2 | own creature enters (gain 1) or dies (1 loss each) | 1 per event | each opponent | no | The enter lifegain feeds Ocelot Pride |
| **Blood Artist** | 2 | **any** creature dies | 1 loss, gain 1 | one target player | no | |
| **Vengeance Mission** | 3 | **any** creature dies | 1 loss, then 2 from the seventh death | one target opponent | **yes** | |

The Meathook Massacre also drains on own deaths and gains on opponents', from the Board Wipes role.

**Cut: Blood Artist.** Vengeance Mission fires on exactly Blood Artist's set of events: any creature,
including the creatures opponents sacrifice to Grave Pact and Dictate. The 2026-09-28 role ranking
named those edict victims as Blood Artist's unique job, and Vengeance Mission now does that job too.
Seven deaths take about one mid-game turn here (that ranking estimated about 5 own and 3 opponent
deaths a turn), and from then on every death is worth 2 instead of 1. Being an enchantment, a
creature wipe charges it instead of killing it, so a wipe of 15 creatures is up to 30 life loss split among
opponents. Blood Artist dies in the same wipe and pays 1 for each.

What we give up, stated plainly: 1 life gained per death (Zulaport, Celebrant, Bastion, Elas and
Meathook still gain, which keeps Ocelot Pride on), a 2-drop (MV ≤ 2 drops by one), and Blood
Artist's body as last-resort fodder. If swap 4 is also taken, Kurn's life loss lands on a deck with
one fewer gainer.

**Trigger-word check (eval-011).** Vengeance Mission's trigger is "whenever a creature dies". Blood
Artist carries the same trigger as a parallel payoff and feeds nothing.
**Records check (tool-019).** The founding entry says of the Skeleton loop, "With Blood Artist or
Zulaport out it kills the table". Zulaport stays, and Vengeance Mission adds 2 per loop death. The
gameplan lists Blood Artist among the drainers in §0 and §7, so update those lines if applied. The
pilot hasn't protected it.
**Other cuts considered.** Elas il-Kor (its enter lifegain feeds Ocelot Pride), Cruel Celebrant (it
hits each opponent, which beats one target), Mayhem Devil (it also counts Treasure and fetch
sacrifices).

**Self-hits.** None. It targets opponents only.
**Curve.** Average MV 2.71 → 2.73, MV ≤ 2 30 → 29, MV ≤ 3 52 → 52. Pips unchanged.

### 3. Rite of Oblivion in, Vanishing Verse out. Deciding axis: what it can hit, and two uses from one card

**In**, {W}{B}, Sorcery: *"As an additional cost to cast this spell, sacrifice a nonland permanent.
Exile target nonland permanent. Flashback {2}{W}{B}"*

**Out**, {W}{B}, Instant: *"Exile target monocolored permanent."*

**Role table, Removal & Interaction (6 plus the candidate):**

| Card | Real cost | Speed | Hits | How | Uses | Riders |
|---|---|---|---|---|---|---|
| Swords to Plowshares | {W} | instant | creature | exile | 1 | Its controller gains life equal to its power |
| Path to Exile | {W} | instant | creature | exile | 1 | Its controller ramps a basic |
| **Vanishing Verse** | {W}{B} | instant | monocoloured permanent | exile | 1 | Misses multicoloured and colourless permanents |
| [Chainsaw](https://scryfall.com/search?q=%21%22Chainsaw%22) | {1}{R} | sorcery (artifact) | creature, 3 damage | damage | 1 | Then an Equipment that grows with deaths. The pilot's add on 2026-11-10 |
| [Lich's Relic](https://scryfall.com/search?q=%21%22Lich%27s+Relic%22) | {B} + {2} | sorcery (artifact) | up to one creature or planeswalker per opponent | destroy | up to 3 | Then a +2/+1 Equipment |
| Anguished Unmaking | {1}{W}{B} | instant | nonland permanent | exile | 1 | You lose 3 |
| **Rite of Oblivion** | {W}{B} and a sacrifice, then {2}{W}{B} and a sacrifice | sorcery | nonland permanent | exile | 2 | Sacrificing a token is a death for every drainer |

**Cut: Vanishing Verse.** Verse can't touch a multicoloured permanent, which covers most commanders
in a pod, or a colourless one, which covers Sol Ring, every Equipment and most Spacecraft in this
set. Rite of Oblivion exiles any of them, and then does it again from the graveyard. Its sacrifice is
upside here: a creature token is a death for every drainer, a Grave Pact edict and a Zurgo drain, and
a spare Treasure works too. What we give up is instant speed. Instant answers drop from 4 to 3 (Path,
Swords and Anguished Unmaking).

**Records check (tool-019).** The FRA review's bench named Vanishing Verse as the removal slot to give
up four times, on the grounds that it misses multicoloured commanders and colourless artifacts. Its
other caveat, that cutting Verse "loses the cheapest answer to a monocoloured enchantment or artifact",
doesn't apply, because Rite hits those at the same cost. The gameplan doesn't name Verse. Rite isn't an
engine, so there is no trigger-word check.
**Other cuts considered.** Chainsaw (the pilot's call today), Lich's Relic (up to three answers in one
card), Anguished Unmaking (instant, any nonland permanent).
**If declined,** Eject the Warp Core and The Wrath of Khan are the bench alternatives for this slot.
**Self-hits.** The sacrifice is ours by choice. **Curve.** No change ({W}{B} for {W}{B}).

### 4. Kurn, Son of Mogh in, Idol of Oblivion out. Deciding axis: cards per turn

**In**, {2}{B}, 2/3 Legendary Creature, Klingon Warrior Officer: *"Deathtouch."* Battlefront: *"Whenever
Kurn attacks, you draw X cards and lose X life, where X is the number of opponents you attacked this
turn."*

**Out**, {2}, Artifact: *"{T}: Draw a card. Activate only if you created a token this turn. {8}, {T},
Sacrifice this artifact: Create a 10/10 colorless Eldrazi creature token."*

**How X works.** Per CR 508.6, X counts the opponents you declared at least one attacker at, Kurn
included, so it's 1 to 3. Tokens that enter attacking don't count. The trigger is caused by Kurn
attacking, so Isshin and Windcrag Siege each repeat it.

**Role table, card draw sources (9 plus the candidate):**

| Card | Real cost | Cards per own turn | Needs | Draws with no fodder? | Survives a creature wipe? |
|---|---|---|---|---|---|
| Black Market Connections | {2}{B}, 2 life per card | 1 | nothing | yes | yes |
| Bloodline Recollector | {1}{B}, then {B} per copy | 3 per prepared end step | 3 deaths that turn | no | no |
| Commissar Severina Raine | {1}{W}{B}, then {2} and a sacrifice per card | 1 per {2} | fodder and mana | no | no |
| **Idol of Oblivion** | {2} | 1 per untap | a token created that turn | yes (Caesar or Kher Keep makes one) | yes |
| Morbid Opportunist | {2}{B} | 1, on every player's turn | any death | no | no |
| Skullclamp | {1}, equip {1} | 2 per clamped death | a toughness-1 creature | no | yes |
| Tocasia's Welcome | {2}{W} | 1, on every player's turn with Kher Keep | an MV ≤ 3 creature entering | yes | yes |
| Court of Grace | {2}{W}{W} | 1 at your end step | staying the monarch | yes | yes |
| Zurgo Stormrender | {R}{W}{B} | 1 per attacking token that leaves | attacking tokens leaving | no | no |
| **Kurn, Son of Mogh** | {2}{B}, X life per trigger | 1 to 3 per attack, 2 to 6 with Isshin or Windcrag Siege | Kurn attacks | yes (an attack, not a death) | no |

**Cut: Idol of Oblivion.** The 2026-09-28 follow-up named Idol the lowest-output draw piece, one card
per untap, and that still holds. Kurn draws off his attack trigger, before blockers are declared, so
the cards arrive even if he dies in combat. The deck attacks every turn with several bodies, so one
declared attacker at each opponent costs little. Myrel stops opponents casting spells during your
turn, and [Mother of Runes](https://scryfall.com/search?q=%21%22Mother+of+Runes%22) can give Kurn protection from a blocker's colour. The draw count stays
at 9.

What we give up, stated plainly: Idol is an artifact that survives creature wipes, draws without
anyone attacking, and has the {8} 10/10 for late games. Kurn costs X life per trigger, up to 6 a turn
with a doubler out, and with swap 2 taken Blood Artist's lifegain is gone too. Kurn's 2/3 body dies to
any blocker with 3 or more power, though deathtouch takes the blocker with him. The founding entry
counted Idol as one of three cards that draw with no fodder. Kurn needs no fodder either, only an
attack, and Black Market Connections, Tocasia's Welcome and Court of Grace still draw without it.

**Trigger-word check (eval-011).** Kurn's words are "attacks" and "draw". Idol's text has neither, and
its draw is gated on making a token, which Kurn doesn't do, so nothing it feeds is lost.
**Records check (tool-019).** Idol appears in the founding role table and as the FRA follow-up's
runner-up cut. The gameplan doesn't name it, and nothing protects it.
**Other cuts considered.** Tocasia's Welcome (it draws on every player's turn with Kher Keep), Morbid
Opportunist (every player's turn), Commissar Raine (her attack drain is the bigger half of the card).
**If declined,** Kor, Cause of Vengeance is the bench alternative for this slot.
**Self-hits.** The life loss. **Curve.** Average MV 2.71 → 2.73, MV ≤ 2 30 → 29, MV ≤ 3 52 → 52.
Pips B34 → 35.

### 5. Vault of Champions in, one Plains out. Deciding axis: untapped colour

**In**, Land: *"This land enters tapped unless you have two or more opponents. {T}: Add {W} or {B}."*
**Out**, Basic Land, Plains: *"({T}: Add {W}.)"*

**Role table, the basic land slots:**

| Land | Copies | Sources after cutting one for Vault | Notes |
|---|---|---|---|
| **Plains** | 3 | W 24 (unchanged), B 23 → 24 | White carries the most pips (37). Cut one |
| Swamp | 2 | W 24 → 25, B 23 (unchanged) | Black carries {B}{B}{B} for Grave Pact, so B gaining a source matters more |
| [Mountain](https://scryfall.com/search?q=%21%22Mountain%22) | 1 | R 20 → 19 | Red is already the lightest colour. No |

**Cut: one Plains.** Vault enters untapped whenever two or more opponents remain, which is almost every
turn of a Commander game, so it's a second colour at no cost. Lands stay at 34. Costs: Vault can't be
fetched, but the fetches still find Plateau, Sacred Foundry, Scrubland, Godless Shrine and the two
remaining Plains. [Castle Ardenvale](https://scryfall.com/search?q=%21%22Castle+Ardenvale%22)'s untapped condition has 6 Plains-typed lands instead of 7.
Basics drop from 6 to 5. Vault enters tapped once only one opponent is left. Edgar's records made the
same swap (`decks/edgar-markov/research/swaps.md:309`).
**Other cuts considered.** A Swamp (black needs its sources for {B}{B}{B}), Nomad Outpost (a tapped
three-colour land, but it's a red source and red is lightest).
**Curve.** No change.

### All five together

Average MV 2.71 → 2.71, MV ≤ 2 30 → 28, MV ≤ 3 52 → 53, lands 34, pips W37 B35 R19, sources W24 B24
R20, Game Changers 3 of 3. Role counts stay level: 13 token engines, 13 drain payoffs, 6 removal, 9
draw sources, 7 protection, 5 doublers. No new loop. The Tribbles and Purphoros growth is the one
engine to declare at the table.

---

## Bench (SIDE), with the card each would displace

| Card | Would displace | When it earns the slot |
|---|---|---|
| Combat Celebrant | Secure the Wastes | If the pilot wants bigger burst turns. Exerting it gives an extra combat phase every other turn, so Caesar, Adeline, Anim Pakal, Myrel, Hero, mobilize and Ingris all fire again, and Warboss and Apprentice make a second token in that combat's beginning step (ledger dmg-018). It untaps every other creature, so the tokens that entered attacking can be declared in combat 2. A 4/1 that must attack, and Secure the Wastes' instant-speed burst is the trade |
| Grand Crescendo | Secure the Wastes | If the pod wipes often. The same instant X-token burst, one token fewer at equal mana, plus team indestructible (2026-09-28 grounds, re-checked) |
| Rite of Ascension | Hero of Bladehold | If creature removal keeps finding Hero. It's an enchantment that triggers on any attack and makes three 2/1 haste Warriors per attack in four-player, against Hero's two 1/1s and battle cry. It loses battle cry and the Soldier type Myrel counts, and it needs a declared attacker at each opponent (CR 508.6) |
| Worf, Still Not Merry | Hero of Bladehold | As a finisher. With its trigger ordered after Caesar's, Adeline's and Hero's, Worf counts their attacking tokens too, so a mid-game swing makes 8 or more Faeries, twice with Isshin and doubled again by a token doubler. 5 mana, and Worf must attack |
| L'Rell, Fierce Visionary | Legion Warboss | If the drain wants a guaranteed death every turn. The token arrives each combat like Warboss's, then dies at end step: a death for every drainer, a Grave Pact edict and a Zurgo drain. It adds a 1/4 body and a {2} outlet, but Warboss's Goblins stay and build the board, which L'Rell's don't |
| Kor, Cause of Vengeance | Idol of Oblivion | If swap 4 is declined, or Kurn keeps dying. It draws one card per attack without attacking itself, adds a death each attack, and pumps Warriors (mobilize tokens, Secure the Wastes tokens, Zurgo, [Reassembling Skeleton](https://scryfall.com/search?q=%21%22Reassembling+Skeleton%22)). 4 mana |
| Elim Garak, Simple Tailor | Elas il-Kor, Sadistic Pilgrim | If the pod keeps the board small. Each Caesar trigger you take and each Black Market Connections choice drains 2 from each opponent, deaths or not. The dilemma basis is reminder text only. Roughly level with Elas otherwise |
| The Needs of the Many | Mithril Coat | If the pod's removal is mostly exile or mass destroy. It covers the whole team and stops exile on Caesar through hexproof, which Coat's indestructible can't, but it's a one-shot. The founding entry named Akroma's Will and Boros Charm as the first protection alternates, and this joins them |
| Eject the Warp Core | Vanishing Verse | If swap 3 is declined. An instant -6/-6 for 2 whose kicker is a token sacrifice, so the cost is a death for every drainer |
| The Wrath of Khan | Vanishing Verse | If swap 3 is declined. 4 damage to a creature, a survivor stolen for a combat and sacrificed, then each opponent sacrifices a nontoken permanent at chapter III |

---

## Near-misses and traps

### Traps

- [Koloth, Tribble Hunter](https://scryfall.com/search?q=%21%22Koloth%2C+Tribble+Hunter%22) gives every opponent two Tribbles each end step. They sacrifice those to
  Grave Pact and Dictate of Erebos instead of a real creature, so it switches off the edict lock.
- [Quark, Humble Proprietor](https://scryfall.com/search?q=%21%22Quark%2C+Humble+Proprietor%22) says "You can't sacrifice Treasure tokens", and a Treasure is spent by
  sacrificing it. That shuts off [Pitiless Plunderer](https://scryfall.com/search?q=%21%22Pitiless+Plunderer%22)'s, Smothering Tithe's and Black Market
  Connections' mana, and the Skeleton loop that runs on Plunderer's Treasures.
- Counters and anthems switch off Skullclamp (ledger equip-027): [Deanna Troi, Psychic Counsel](https://scryfall.com/search?q=%21%22Deanna+Troi%2C+Psychic+Counsel%22),
  [Guinan, Ancient Advisor](https://scryfall.com/search?q=%21%22Guinan%2C+Ancient+Advisor%22), [Beverly Crusher, Ship's Doctor](https://scryfall.com/search?q=%21%22Beverly+Crusher%2C+Ship%27s+Doctor%22), [Martok, Hero of the Empire](https://scryfall.com/search?q=%21%22Martok%2C+Hero+of+the+Empire%22),
  [Test of Conviction](https://scryfall.com/search?q=%21%22Test+of+Conviction%22), [Pure Energy](https://scryfall.com/search?q=%21%22Pure+Energy%22), [Emergency Medical Hologram](https://scryfall.com/search?q=%21%22Emergency+Medical+Hologram%22),
  [Captain Jean-Luc Picard](https://scryfall.com/search?q=%21%22Captain+Jean-Luc+Picard%22) and [The Immortal Sun](https://scryfall.com/search?q=%21%22The+Immortal+Sun%22). The Immortal Sun also stops Elspeth's loyalty
  abilities.
- [Pest Control](https://scryfall.com/search?q=%21%22Pest+Control%22) destroys every nonland permanent with MV 1 or less, and every token we control is
  MV 0.
- [Shared Animosity](https://scryfall.com/search?q=%21%22Shared+Animosity%22) and [Kira Nerys, Firebrand](https://scryfall.com/search?q=%21%22Kira+Nerys%2C+Firebrand%22) read like token payoffs, but Caesar's tokens enter
  attacking and never "attacked" (CR 508.4), so they add nothing.
- Battlefront counts declared attacks only (CR 508.6). Kurn, Rite of Ascension,
  [Worf, Defiant Commander](https://scryfall.com/search?q=%21%22Worf%2C+Defiant+Commander%22), [Own the Day](https://scryfall.com/search?q=%21%22Own+the+Day%22) and [The Beacon of Kahless](https://scryfall.com/search?q=%21%22The+Beacon+of+Kahless%22) reach 3 only with a
  declared attacker at each opponent.
- [Sword of Light and Shadow](https://scryfall.com/search?q=%21%22Sword+of+Light+and+Shadow%22) gives Caesar protection from white, which stops Mother of Runes, a white
  source, from targeting him.
- [U.S.S. Enterprise-E, Sovereign](https://scryfall.com/search?q=%21%22U.S.S.+Enterprise-E%2C+Sovereign%22) destroys all tapped creatures, which on your turn are your own
  attackers. [Encounter the Unknown](https://scryfall.com/search?q=%21%22Encounter+the+Unknown%22)'s damage mode hits every creature, so it wipes our tokens.

### Near-misses

- [Lwaxana Troi, Charming Guest](https://scryfall.com/search?q=%21%22Lwaxana+Troi%2C+Charming+Guest%22) doubles one creature's triggers for {2} while it stays tapped.
  Aimed at Zulaport it doubles every death drain, and aimed at Caesar it's a third attack-trigger
  doubler, but Isshin and Windcrag Siege already cover Caesar, and every doubler in the list covers
  more than one creature.
- [Gul Dukat, Colonial Prefect](https://scryfall.com/search?q=%21%22Gul+Dukat%2C+Colonial+Prefect%22) makes every opponent lose again, at each end step, what they lost that
  turn, which doubles a drain turn. It costs 7, and Ruinous Ultimatum holds the only slot above 5. A
  cute line to remember.
- [Alhammarret's Archive](https://scryfall.com/search?q=%21%22Alhammarret%27s+Archive%22) doubles every draw after the first in your draw step, so Skullclamp draws
  four and Bloodline Recollector's copy draws six. 5 mana for no board, while the draw count is already
  inside the aim.
- [Federation Resupply](https://scryfall.com/search?q=%21%22Federation+Resupply%22) tutors Skullclamp or Infantry Shield and can be recast once. A tutor is a dead
  card on its own, and Demonic Tutor already does that job.
- [Worf, Intelligence Contractor](https://scryfall.com/search?q=%21%22Worf%2C+Intelligence+Contractor%22) is a cute line: steal up to one MV 3 or less creature from each
  opponent, sacrifice them to [Goblin Bombardment](https://scryfall.com/search?q=%21%22Goblin+Bombardment%22), and that's three removals, three deaths for every
  drainer and three Grave Pact edicts. The MV cap misses most threats.
- [Assimilate the Wounded](https://scryfall.com/search?q=%21%22Assimilate+the+Wounded%22) is another cute line: after a Grave Pact turn, take one dead creature from
  each opponent's graveyard at instant speed.
- [Deliver from Chaos](https://scryfall.com/search?q=%21%22Deliver+from+Chaos%22) exiles a creature or artifact and gives you Borg tokens equal to its MV, which
  is strong against a big commander, but it costs 5 where the list's removal costs 1 to 3.
- The Beacon of Kahless taps for three after you attack three opponents, but only for one before combat,
  and early ramp matters more. [Talisman of Conviction](https://scryfall.com/search?q=%21%22Talisman+of+Conviction%22) stays the first pick if a ramp slot reopens.
