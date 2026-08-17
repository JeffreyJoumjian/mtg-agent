# HOB set review — Iron Man (Tony Stark) — 2026-08-09

**Method:** deck-brain SKILL.md — every verdict derived from verified oracle text in
`data/hob-candidates-iron-man.json` (never memory), costed in this deck's mana, checked against the
deck's own board, with the deciding axis named for every MAIN/SIDE call. In-deck comparison texts
re-pulled via `bun run card`; rules claims checked against `rules/sections/` (current to 2026-08-07).

**Pool:** 74 of 193 HOB cards are commander-legal and fit Izzet {U}{R}. Set releases 2026-08-14.

**Deck context that governs everything below:** the deck cheats artifacts in from hand (free deploy +
free attach each combat), is deliberately creature-light (10 — load-bearing for one-sided sweepers),
runs 15 Equipment, 7 extra-combat effects, tutors to hand, and sits at the bracket 3 Game Changer cap
(3/3, zero headroom). No HOB candidate is a Game Changer, so no bracket pressure from this set.

---

## Classification table — all 74

| # | Name | MV | Verdict | Reason |
|---|---|---|---|---|
| 1 | Long-Bodied Grey Dog | 3 | NO | A creature slot for one tapped Treasure; creature count is load-bearing at 10 |
| 2 | Old Thrush | 2 | NO | 2 life and a basic on top of the library; off-plan value creature |
| 3 | Troop of Ponies | 2 | NO | Basic-land ramp creature in an artifact-ramp deck |
| 4 | Bilbo, Luckwearer | 2 | NO | 1/1 saboteur looter; the exchange mode is a political trick the deck doesn't need |
| 5 | Bilbo, Thief in the Night | 2 | SIDE | Recasts wipes/extra-combat spells from the graveyard on attack; fragile and structural |
| 6 | Bilbo Baggins, Burglar | 3 | NO | ETB-cantrip body; upgrades no role |
| 7 | Confusticate and Bebother | 3 | NO | Soft counter; the 10-card interaction suite is all hard answers |
| 8 | Elrond, Moon-Reader | 3 | NO | Deck activates almost no creature abilities (equip is an ability of the Equipment, not the creature) |
| 9 | Elven Raft-Steerer | 3 | NO | Landfall tap/untap with no landfall density behind it |
| 10 | Elvenking's Harper | 2 | NO | {4}{U} unblockable; trample plan + sideboard Rogue's Passage cover this cheaper |
| 11 | Enchanted River's Grasp | 3 | NO | Sorcery-speed neutralize Aura, worse than every in-deck answer |
| 12 | Fateful Discovery | 5 | **MAIN** | Draws off every artifact that enters — including Treasures and the commander's free deploys |
| 13 | Gandalf, Wandering Wizard | 5 | NO | Ward beater with a {6} self-reset; nothing for the plan |
| 14 | Great Gilded Boat | 3 | NO | Loot-per-attack Vehicle; crew 2 is awkward at 10 creatures and loot-scale draw is below the bar |
| 15 | Lakeshore Apothecary | 2 | NO | Second-draw payoff on a 1/2; off-plan |
| 16 | Lake-town Mariners | 6 | NO | Beater; the adventure flickers only creatures/lands — the deck's ETB value is on noncreature artifacts |
| 17 | Long Lake Nuisance | 4 | NO | ETB loot on a 3/1; below every draw slot |
| 18 | The Lord of the Eagles | 9 | NO | A discounted 8/8 is a structural creature add the one-big-flier plan doesn't want |
| 19 | Master's Councillors | 2 | NO | Mill chaff |
| 20 | Mirkwood Meditator | 3 | NO | Landfall 4/2; off-plan |
| 21 | Most Decrepit Old Bird | 1 | NO | Self-mill; this deck's spells belong in hand, where the commander deploys from |
| 22 | Old Fat Spider Can't See Me | 3 | NO | Four turns of temporary hexproof/fog; Champion's Helm fixed hexproof permanently |
| 23 | Plunder the Trollshaws | 2 | NO | 1-for-1 cantrip; every draw slot outperforms it |
| 24 | Ravenhill Flock | 4 | NO | Counters-on-draw payoff with no deck around it |
| 25 | Riddles in the Dark | 3 | NO | Opponent picks the pile — averages ~2 cards with the rest binned |
| 26 | Roll-Roll-Roll-Roll | 3 | NO | Flicker engine locked to your draw step; only 2–3 high-value ETB targets (near-miss) |
| 27 | Sound the Trumpets | 3 | NO | Counter with an MV≤2 rider; strictly behind Counterspell in this suite |
| 28 | Thranduil's Decree | 6 | NO | A 6-mana counterspell held up every turn is anti-plan |
| 29 | Uncover the Moon-Letters | 4 | NO | Scales with mana *spent* — this deck's whole design is spending zero on its big cards |
| 30 | Uneasy Partings | 4 | NO | Tempo bounce-to-library; interaction slots are full of harder answers |
| 31 | Wizard's Staff | 2 | **MAIN** | Free-attached second doubler of the commander's deploy trigger; 3 deploys per combat with Roaming Throne |
| 32 | Balin, Loremaster | 5 | NO | Discard-your-hand wheel in a deck whose hand is the ammo rack |
| 33 | Bombur, Gentle Dreamer | 3 | NO | 5/3 beater; structural creature add with zero synergy |
| 34 | Bothersome Noisemaker | 2 | NO | Amass engine makes token chaff that dies to the deck's own sweepers (near-miss for a spellslinger deck) |
| 35 | Burn, Burn, Tree and Fern | 4 | NO | Three-turn removal drip; every in-deck answer is instant-speed or free |
| 36 | Dáin Ironfoot | 3 | NO | Third double-strike source (Genji Glove, Savage Beating) on a 1/4 that must itself attack |
| 37 | Desert Were-Worm | 6 | SIDE | Free extra combat every turn off "attack with total power 12+", which the equipped commander alone satisfies |
| 38 | Desolation of Smaug | 4 | NO | 3-each kills your own creature suite while sparing real blockers; the Dragon mana is dead |
| 39 | Dori, Bearer of Friends | 3 | NO | 3/2 with a Treasure; filler |
| 40 | Dwarven Mauler | 1 | NO | Discounts equips onto *itself*, not the commander — and the deck barely pays equip costs anyway |
| 41 | Gandalf, Goblins' Bane | 3 | NO | Pinger on a body (creature copy of a noncreature effect — LEDGER 2026-08-09); adventure needs a Wizard the deck doesn't have |
| 42 | Gandalf, Spark Starter | 6 | NO | 6 mana for 3 divided damage; miles below rate |
| 43 | Getaway Barrel | 4 | NO | Random creature from 13 cards in a 10-creature deck; frequently whiffs |
| 44 | Glóin the Mighty | 4 | NO | A ritual stapled to a creature; cast-artifact decks want it, this deck cheats its top end in free |
| 45 | Goblin-town Flunkies | 2 | NO | Amass chaff |
| 46 | Gundabad Opportunist | 4 | NO | Impulse-1 body; below every draw slot |
| 47 | Iron Hills Stalwart | 5 | NO | One-shot single re-attach at 5 mana; Thorin (SIDE) does the whole job at 4 |
| 48 | Last Light of Durin's Day | 2 | NO | Dragon tutor; zero Dragons |
| 49 | The Misty Mountains Cold | 3 | NO | One Treasure a turn is a drip the existing 6-maker package outclasses |
| 50 | Misty Mountains Raider | 5 | NO | Amass-on-attack; a token plan the deck deliberately doesn't run |
| 51 | Óin the Brave | 2 | NO | Looter dwarf; off-plan |
| 52 | Pinecone Strike | 2 | NO | Galvanic Blast outclasses it at half the cost (4 damage, any target, at metalcraft) |
| 53 | Ragged Short Spear | 2 | NO | +2/+0 and a one-shot loot; far below the Equipment bar |
| 54 | Smaug, the Great Calamity | 7 | NO | Overcosted on both halves |
| 55 | Smaug the Magnificent | 4 | NO | Wants a Treasure *hoard*; this deck spends its Treasures as mana and artifact count (near-miss) |
| 56 | Smaug's Fury | 2 | NO | Pump trick; the deck's buffs are permanents |
| 57 | Snowslope Hunter | 3 | NO | Sacrifices artifact count for impulse cards; wrong trade in a 10-payoff artifact-count deck |
| 58 | Stone-Giant of High Pass | 7 | NO | 7-mana Wall-token maker; off-plan |
| 59 | Thorin, Mountain-king | 4 | SIDE | {3}{R} mass re-suit from the battlefield answers the deck's documented commander-removal cost |
| 60 | Tidings of War | 1 | NO | Amass chaff |
| 61 | The Black Arrow | 3 | NO | +1/+1, reach and a 1-damage ETB; below the Equipment bar |
| 62 | Dwarven Mattock | 2 | NO | ETB attach targets a Dwarf (deck has none); ward {1} is token protection |
| 63 | Giant's Boulder | 1 | NO | {1},{T}: add any color is a filter, not ramp; the {7} removal rider is too dear |
| 64 | Glamdring, Foe-hammer | 2 | **MAIN** | Instants/sorceries cost {X = commander's power} less — the 22-spell cast suite goes near-free |
| 65 | Key to the Side-Door | 1 | NO | Rogue's Passage (sideboard) covers the niche without a nonland slot; discard rider is dead in singleton |
| 66 | Orcrist, Goblin-cleaver | 3 | SIDE | Colorless Reaver Cleaver stand-in that survives the Sword of Fire and Ice protection clause |
| 67 | Sting, Bilbo's Sword | 2 | NO | Flash free-attach is real, but the buff scales with the *opponent's* board — too variable (near-miss) |
| 68 | Thrór's Map | 2 | NO | Basic-to-hand plus {2} looting; below both the ramp and draw bars |
| 69 | Well-Worn Spatula | 1 | NO | Limited filler |
| 70 | Elven Passage | 0 | NO | Sac-fetch for basics with an Elf rider (no Elves); worse than a basic here |
| 71 | Hobbit Hole | 0 | NO | Tapped Evolving Wilds with dead Halflingcycling |
| 72 | The Lonely Mountain | 0 | NO | Tapped exactly in the turns before Equipment lands, and its 2/2s die to the deck's own wipes |
| 73 | Island | 0 | NO | Basic reprint; art choice only |
| 74 | Mountain | 0 | NO | Basic reprint; art choice only |

**Count check: 74 of 74 classified — 3 MAIN, 4 SIDE, 67 NO.**

---

## MAIN candidates

### 1. [Wizard's Staff](https://scryfall.com/search?q=%21%22Wizard's+Staff%22) — {1}{U}, Equipment, $4.92

*"Equipped creature has prowess. If an ability of equipped creature triggers, that ability triggers
an additional time. Equip Wizard {1}. Equip {3}."*

**What it does here:** the commander's engine — *"At the beginning of combat on your turn, you may
put an artifact card from your hand onto the battlefield. If it's an Equipment, attach it"* — is a
triggered ability of the equipped creature, so a Staff on Tony doubles it. Stacked with
[Roaming Throne](https://scryfall.com/search?q=%21%22Roaming+Throne%22) naming Hero, the trigger
fires **three times** — CR 603.2d: each "triggers an additional time" effect adds one instance and
they don't compound each other. Three free artifacts per combat, every Equipment auto-attached, and
it multiplies again across the deck's 7 extra-combat effects. Tony deploys and attaches the Staff
itself for free; prowess is a live bonus on ~22 noncreature spells. Note it misses the combat it
arrives in (it attaches during the trigger's own resolution) — from the next combat on it's on.

**Deciding axis: engine redundancy of the reducer kind, not the multiplier kind.** LEDGER's
"one multiplier is right, two is greedy" doesn't apply — trigger doublers on the deploy engine stack
additively like cost reducers and every copy pays off every combat, as long as the hand holds
artifacts (7 draw sources + Fateful Discovery below feed exactly that).

**Displaces: [Cursed Mirror](https://scryfall.com/search?q=%21%22Cursed+Mirror%22)** — 2/5 field,
already SIDEBOARD.md's designated OUT for three separate situational swaps. **Flagged honestly as a
structural change** (rocks 8→7, Equipment 15→16): the justification is that the Staff costs ~0 mana
in practice (trigger-deployed) while Cursed Mirror was the marginal eighth rock, and Equipment count
rising feeds the attach engine. If the pilot won't move a role count, the in-role alternative is
[Aettir and Priwen](https://scryfall.com/search?q=%21%22Aettir+and+Priwen%22) — but Glamdring
already claims that slot below, and per SKILL §2.1 both shouldn't come out at once without re-ranking
the whole Equipment role.

**Anti-synergy check (LEDGER 2026-08-07, protection-colours):** Wizard's Staff is a **blue card**.
[Sword of Fire and Ice](https://scryfall.com/search?q=%21%22Sword+of+Fire+and+Ice%22) grants pro-red
*and* pro-blue, so SoFI on the commander rips the Staff off — **add it to the existing SoFI conflict
list** (Mjölnir, The Reaver Cleaver, Embercleave). One more reason the Mjölnir lane is the default.

### 2. [Glamdring, Foe-hammer](https://scryfall.com/search?q=%21%22Glamdring%2C+Foe-hammer%22) — {2}, Legendary Equipment (adventure: Gleam of Death {3}{U}), $1.29

*"Instant and sorcery spells you cast cost {X} less to cast, where X is equipped creature's power.
Equip {2}."* Adventure: *"Mill six cards, then put all instant and sorcery cards from among them
into your hand."*

**What it does here:** the deck **casts** 22 instants/sorceries (10 interaction, 2 wipes, 5 extra
combats, 3 draw spells, 2 tutors) even though it cheats its artifacts in. On an equipped Tony
(routinely 10–12 power), X wipes the entire generic portion of every one of them:
[Savage Beating](https://scryfall.com/search?q=%21%22Savage+Beating%22) entwined → {R}{R}{R},
[Seize the Day](https://scryfall.com/search?q=%21%22Seize+the+Day%22) → {R},
[Overpowering Attack](https://scryfall.com/search?q=%21%22Overpowering+Attack%22) → {R}{R},
[One with the Machine](https://scryfall.com/search?q=%21%22One+with+the+Machine%22) → {U},
[Fabricate](https://scryfall.com/search?q=%21%22Fabricate%22) → {U} — while
[Counterspell](https://scryfall.com/search?q=%21%22Counterspell%22) mana stays open every turn.
Per LEDGER (CR 601.2f) the reduction **only eats generic** — coloured pips survive — but this suite
is generic-heavy, which is exactly when a big-X reducer is at its best. It effectively converts
commander power into mana every turn, and Tony attaches it free. The adventure half is a real
second mode: milled artifacts are [Academy Ruins](https://scryfall.com/search?q=%21%22Academy+Ruins%22)
/ [Goblin Welder](https://scryfall.com/search?q=%21%22Goblin+Welder%22) fodder, milled spells go to
hand, and Glamdring is then cast from exile for {2}.

**Deciding axis: always-on engine vs situational ceiling.** It competes for the last Equipment slot
against [Aettir and Priwen](https://scryfall.com/search?q=%21%22Aettir+and+Priwen%22) ({6}, base P/T
= your life total). A&P's payload is keyed to a life total this deck deliberately spends — Ancient
Tomb, The One Ring's escalating upkeep, three painlands — so it can shrink the commander as easily
as grow him in the pods where you're pressured; Glamdring pays out every single turn regardless.
**This is the closest call of the three MAINs**: A&P deployed free is a genuine haymaker the deck
never pays {6}+{5} for, and the manabase pass was partly built around protecting its life total.
If the pilot keeps A&P, Glamdring is still worth a SIDEBOARD.md line.

**Anti-synergy check:** the battlefield permanent is **colorless** (the blue half is the adventure
spell only), so unlike Wizard's Staff it coexists with SoFI. No conflict with anything in the 100.

### 3. [Fateful Discovery](https://scryfall.com/search?q=%21%22Fateful+Discovery%22) — {3}{U}{U}, Enchantment, $6.07

*"Whenever an artifact you control enters, draw a card."*

**What it does here:** the deck puts artifacts onto the battlefield without casting them constantly —
the commander's free deploy (×2–3 with the doublers above), 6 Treasure makers, and
[The Reaver Cleaver](https://scryfall.com/search?q=%21%22The+Reaver+Cleaver%22) connects that mint
*that many* Treasures, each a separate trigger. A 12-damage Cleaver hit alone is 12 draws. No
"nontoken" clause, no once-per-turn cap. It is the draw engine shaped exactly like what this deck
already does for free.

**Deciding axis: repeatable engine vs one-shot, at the turn count the deck reaches** — the Insight
Engine precedent from `decisions.md` verbatim. It also passes the §1.3 board check the other way:
as an enchantment it survives Blasphemous Act, Extinguisher Battleship *and* opposing artifact
hate. Honest costs: it is **not** an artifact (feeds none of the 10 artifact-count payoffs), and
{3}{U}{U} double blue is real (fine on 23 U sources at MV5).

**Displaces: [Big Score](https://scryfall.com/search?q=%21%22Big+Score%22)** — in-role (draw 7→7),
1/5 field, already named by SIDEBOARD.md as the lowest-value card in the 100. Big Score's two
Treasures are the only loss to the artifact-count package (it is not one of the six counted makers);
Fateful Discovery repays that by drawing off every other Treasure for the rest of the game.

---

## SIDE candidates

### [Desert Were-Worm](https://scryfall.com/search?q=%21%22Desert+Were-Worm%22) — {4}{R}{R}, Creature 0/5, $0.54

*"+2/+0 for each Mountain you control. Whenever you attack with creatures with total power 12 or
greater for the first time each turn, untap all attacking creatures. After this phase, there is an
additional combat phase."*

A **repeatable, free, once-per-turn extra combat**. The trigger doesn't require the Worm to attack —
an equipped Tony at 12+ power satisfies it alone, the same turn it's cast (no haste needed). The deck
runs 11 Mountains (6 basics + 5 Island-Mountain duals), so it's also a 22/5 body. Rate-wise it beats
any one-shot in the extra-combat package; what keeps it out of MAIN is **structure and fragility**:
creature count 10→11 is exactly the load-bearing deviation `decisions.md` protects, it must be
*cast* for 6 (Tony only cheats artifacts), it dies to your own Blasphemous Act (survives
Battleship's 4), and at toughness 5 with no protection it eats every removal spell pointed away from
the commander — which is also a real upside. **Sideboard entry: IN over
[Overpowering Attack](https://scryfall.com/search?q=%21%22Overpowering+Attack%22) for slow/grindy
pods** where a permanent engine beats a one-shot (LEDGER: "prefer the permanent answer when the role
is structural") — with the structural caveat stated on the swap row.

### [Thorin, Mountain-king](https://scryfall.com/search?q=%21%22Thorin%2C+Mountain-king%22) — {3}{R}, Creature 3/4 trample, $6.76

*"When Thorin enters, attach any number of target Equipment you control to target creature you
control. When one or more Equipment become attached this way, that creature deals damage equal to
its power to up to one target creature."*

The deck's documented worst case (decisions.md, CR 704.5n) is commander removal stranding every
attached Equipment on the battlefield, where the free attach trigger can't reach it — re-suiting
costs full equip prices. Thorin re-attaches **everything at once for {3}{R}**, then the re-suited
commander machine-guns a blocker for its full (post-suit) power — removal stapled to recovery. Also
a fine tempo card: pile gear onto [Knuckles the Echidna](https://scryfall.com/search?q=%21%22Knuckles+the+Echidna%22)
and the double-strike triggers come with it. **Sideboard entry: IN over
[Phyrexian Metamorph](https://scryfall.com/search?q=%21%22Phyrexian+Metamorph%22) in
removal-heavy pods** — creature-for-creature, count stays 10. It complements the existing Padeem
entry rather than duplicating it: Padeem prevents the removal, Thorin recovers after it lands.

### [Bilbo, Thief in the Night](https://scryfall.com/search?q=%21%22Bilbo%2C+Thief+in+the+Night%22) — {1}{U}, Creature 2/2, $15.12

*"Spells you cast from anywhere other than your hand cost {1} less. Whenever Bilbo attacks, you may
cast an artifact, instant, or sorcery spell from your graveyard..."*

The deck has zero instant/sorcery recursion; Bilbo recasts a spent
[Blasphemous Act](https://scryfall.com/search?q=%21%22Blasphemous+Act%22),
[Savage Beating](https://scryfall.com/search?q=%21%22Savage+Beating%22) (an instant — legal on the
attack trigger, mid-combat) or any extra-combat sorcery from the graveyard — **once per combat, and
this deck manufactures extra combats**, so a single turn can rebuy two spells. The static also
discounts [Seize the Day](https://scryfall.com/search?q=%21%22Seize+the+Day%22)'s flashback to
{1}{R}. The costs: a 2/2 that must personally attack and survive in a deck built around exactly one
attacker, and creature count 10→11 (structural). **Sideboard entry: IN over
[Cursed Mirror](https://scryfall.com/search?q=%21%22Cursed+Mirror%22) for grindy attrition pods**
where games go long enough for graveyard rebuys to out-value a marginal rock (structural caveat on
the row).

### [Orcrist, Goblin-cleaver](https://scryfall.com/search?q=%21%22Orcrist%2C+Goblin-cleaver%22) — {3}, Legendary Equipment, $16.98

*"+2/+2 and trample. Whenever equipped creature deals combat damage to a player, choose a creature
type. Create a Treasure token for each creature you control of that type."*

A **colorless** near-copy of [The Reaver Cleaver](https://scryfall.com/search?q=%21%22The+Reaver+Cleaver%22)'s
role: buff + trample (the deck's chosen evasion axis) + Treasures on connect. Its Treasure output is
usually far lower (creature-type count vs damage dealt — though naming Hero counts the commander plus
[Iron Man, Tony Stark](https://scryfall.com/search?q=%21%22Iron+Man%2C+Tony+Stark%22)'s Robot Hero
tokens), so it loses the head-to-head. Its one edge is decisive in exactly one configuration: the
Reaver Cleaver is a **red card** and falls off under
[Sword of Fire and Ice](https://scryfall.com/search?q=%21%22Sword+of+Fire+and+Ice%22)'s pro-red
(CR 702.16d); Orcrist is colorless and coexists. **Sideboard entry: IN over The Reaver Cleaver if
the pilot finds the SoFI/Commander's Plate grind lane is their default** — it keeps trample +
Treasures-on-connect alive inside the protection suite.

---

## Near-misses (good card, wrong deck)

- **Smaug the Magnificent** ({2}{R}{R}, $28.96) — attack damage equal to your Treasure count wants a
  *hoarding* deck; this one spends Treasures as mana and artifact count the turn it gets them.
- **Sting, Bilbo's Sword** ({2}, $0.55) — flash plus free self-attach is a genuinely good template,
  but +1/+0 per creature *the opponent* controls is a buff you don't control; the fixed payloads in
  the 15 are strictly more reliable.
- **Dáin Ironfoot** ({2}{R}, $0.27) — double strike on equipped attackers is a real damage
  multiplier, but the deck already has it twice (Genji Glove, Savage Beating) without paying a
  structural creature slot for a 1/4 that must attack to turn it on.
- **Roll-Roll-Roll-Roll** ({2}{U}, $0.31) — four self-flickers could rebuy Extinguisher Battleship /
  Portal to Phyrexia ETBs, but it's locked to your draw step, telegraphed, and the deck has only 2–3
  targets worth the card.
- **Bothersome Noisemaker** ({1}{R}, $0.32) — a noncreature-cast amass engine belongs in a
  spellslinger token deck; here its Army dies to the deck's own sweepers.
- **The Lonely Mountain** (land, $0.51) — "untapped if you control an Equipment" fails precisely on
  turns 1–3 before any Equipment lands, and its 2/2 Dwarfs die to Chandra's Ignition, Blasphemous
  Act and Battleship.

---

## Set mechanics as they touch this deck

- **Amass Goblins/Orc Armies (14 cards set-wide):** every amass card in the pool is a NO here. The
  mechanic builds one growing token — chaff under this deck's own sweepers (SKILL §1.3), and the
  creature-light design is load-bearing. Nothing transfers.
- **Treasure theme (10 cards set-wide):** conceptually on-plan (Treasures = artifact count for 10
  payoffs), but HOB's Treasure cards are one-shot drips stapled to off-plan creatures. The existing
  6-maker package outclasses all of them; the set's real Treasure payoff for this deck is Fateful
  Discovery turning each one into a card.
- **Equipment (12 cards set-wide):** the named-weapon legends are mostly small-buff payload below
  this deck's bar (Black Arrow, Mattock, Spear, Sting). The set's two best Equipment for this deck
  are **utility, not payload** — Wizard's Staff (trigger doubler) and Glamdring (spell cost engine).
  Watch the colour line: Wizard's Staff is a blue card and joins the SoFI unattach list; Glamdring
  and Orcrist are colorless and safe.
- **Storied / "enduring story"** (3+ artifacts/legendaries/Sagas): this deck turns it on trivially,
  but every storied card in the pool is off-plan regardless — the enabler isn't the problem.
- **Rules note for the pilot (verified):** CR 603.2d — effects that make an ability trigger "an
  additional time" each add one instance and never multiply each other, and they only touch abilities
  the object *has* (not delayed triggers it creates). Roaming Throne + Wizard's Staff on Tony =
  exactly 3 deploy triggers per combat.
