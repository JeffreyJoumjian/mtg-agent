# FRA + FRC (Reality Fracture + Reality Fracture Commander) set review — The Lord of Pain — 2026-09-28

**Method:** deck-brain SKILL.md, HOB-review shape (`decks/edgar-markov/research/hob-set-review-2026-08-09.md`).
Every card read from the verified Scryfall oracle text in the pre-built pool (both halves of every
prepare card), never from memory; every in-list comparison card re-read from the deck's own oracle
dump. Each card was costed in this deck's mana — Jet Medallion (black spells −{1}), Ruby Medallion
(red spells −{1}), Rakdos, Lord of Riots (creature spells −{1} per life opponents lost this turn;
generic only) — checked against the deck's own board **and** its triggers (§1.3), and held to the
deck's two standing design rules:

1. **Opponent-only amplifiers.** Anything that boosts damage "a source you control" deals to *any*
   player, or that *a source* deals, multiplies the deck's own symmetric gifts (Spiteful Visions,
   Descent into Avernus, Manabarbs, Seizan, Hidetsugu) onto the pilot.
2. **Never "players can't gain life".** The commander already covers opponents; the deck lives on
   its own lifegain.

Rules checked against the local CR (2026-08-07): 722.3c (prepare copies are cast), 707.10 (copies
not cast), 616.1 (the damaged player orders replacement effects), 120.8 (0 damage is no event),
903.11 (outside-the-game effects in Commander), 603.2c (one event, multiple occurrences). LEDGER
grepped for every MAIN/SIDE name (no prior entries — all new) and for *additive*, *prepared*,
*Vial Smasher*.

**Field lens:** unavailable — EDHREC has no FRA/FRC data before the 2026-10-02 release (§2.2: say
so and skip).

**Pool:** 129 cards fit {B}{R} identity and are commander-legal — FRA 102 + FRC 27. **98 NEW,
31 REPRINT** (10 of the reprints are already in both lists). **Zero Game Changers**, so no MAIN or
SIDE here moves either list's GC count (B4 9, B3 3/3).

**Result:**

| List | MAIN | SIDE | IN (already in list) | NO |
|---|---|---|---|---|
| B4 (`main`) | 2 | 8 | 10 | 109 |
| B3 (`b3`) | 2 | 9 | 10 | 108 |

The two MAINs displace cards that sit in **both** lists (Vial Smasher, Terminate), so the B4 → B3
derivation is unchanged — still exactly the seven swaps in `research/sideboard.md`. The one
list-specific call is Curse-Marred Demon (B3 SIDE, B4 NO).

---

## Set mechanics as they matter to this deck

- **Prepare (6 prepare cards in this pool).** Casting a prepared copy is a **normal cast**
  (CR 722.3c, LEDGER 2026-08-06): it pays full cost and fires cast triggers. That cuts in the deck's
  favour at the table — an opponent's prepare copy is a spell for **Kaervek** (its MV = the prepare
  spell's MV), **Painful Quandary**, and the **Lord** if it is their first that turn. On our side,
  only the three *Vicious Verse* cards and Ancestral Craving touch the theme; none clears the bar.
- **Empower Jace (12 cards in this pool).** Creates a **planeswalker token** "Jace" (−1: Surveil 1 / −3: Draw a
  card) with loyalty equal to the empowered counters. The deck has no planeswalker payoffs, so every
  empower rider is a small blue value engine at best. Two things worth knowing: opponents' Jace
  tokens make them *loyalty activators*, which **Gideon the Oathless** bills; and a Jace −3 is a
  *draw*, which every draw-punisher bills.
- **Surveil (43 cards set-wide)** is not drawing — it triggers none of the draw-punishers.
- **The B/R "noncombat damage matters" archetype** (Master of Barbs, Whiplash Wordsmith, Grim
  Repriser, Command the Stage, Massacre Girl, Gallia): the deck satisfies every "an opponent was
  dealt noncombat damage this turn" condition trivially, but the payoffs are combat bodies. The one
  exception is the damage *booster* in that archetype — **Tomik, Izzet Sparkmage**.
- **"Whenever a player discards one or more cards"** (Tinybones) is a new billable event for a gift
  deck: under Font of Mythos + Howling Mine + Seizan the table overflows its hand and discards at
  cleanup, and Painful Quandary's "or discard a card" branch stops being an escape.
- **Outside-the-game wishes are blanks in Commander.** Extrapolate the Impossible says "from outside
  the game"; CR 903.11 admits only effects that *specifically* bring cards into Commander games.

---

## Classification table — all 129 cards

Verdict key: **MAIN** = would displace a named card in that list · **SIDE** = worth a pocket slot
(the "displaces" card is named) · **IN** = already in that list · **NO** = pass.

### Black

| # | Name | MV | New? | B4 (main) | B3 | Reason |
|---|---|---|---|---|---|---|
| 1 | Dark Matter Manipulator | 1 | FRA NEW | NO | NO | Grows off *your* graveyard (+2/+0 per 7 cards) and mills you — a beater in a deck that doesn't attack or self-mill |
| 2 | Lich's Relic | 1 | FRA NEW | **MAIN** | **MAIN** | {B} + reflexive {2}: *"for each opponent, destroy up to one target creature or planeswalker"* — a one-sided 3-for-1 for 3 mana. Displaces Terminate (see Proposed swaps) |
| 3 | Mabel, Bitter Recluse | 1 | FRA NEW | NO | NO | Counter-removal ETB on a 1/1 deathtouch; no punisher hook |
| 4 | Bloodline Recollector // Ancestral Craving | 2 | FRA NEW | NO | NO | Ancestral Craving (*"target player draws three cards and loses 3 life"*) is a perfect poisoned gift — but it only prepares at an end step *if three or more creatures died this turn*. No sacrifice engine here; a wipe turn is the only way. Trap by condition |
| 5 | Dreadhorde Invasion | 2 | FRC REPRINT | NO | NO | You lose 1 a turn to grow an Army whose payoff is attacking; deck doesn't attack |
| 6 | Extrapolate the Impossible | 2 | FRA NEW | NO | NO | Blank in Commander: CR 903.11 — only effects that *specifically* bring cards into Commander games from outside the game work; this says "from outside the game" generically |
| 7 | Gallia, Tragic Host | 2 | FRA NEW | NO | NO | Self-recurring 2/1 menace beater; nothing billed |
| 8 | Last Gasp | 2 | FRA REPRINT | NO | NO | −3/−3 instant; in-list removal kills any toughness for 1–2 mana (Grasp is {B} under Jet) |
| 9 | Liliana the Repentant | 2 | FRA NEW | NO | NO | Self-mill on your creatures entering + one {5}{B} exhaust reanimation; off-plan |
| 10 | Multiply by Zero | 2 | FRA NEW | NO | NO | Base 0/0 only kills creatures with no counters/anthems — conditional where Grasp is not |
| 11 | Rank Rat | 2 | FRA NEW | NO | NO | One discard per opponent on a 1/1 — only billed with Tinybones (SIDE), not by anything in the 100 |
| 12 | Silence the Echo | 2 | FRA NEW | NO | NO | Sacrifice a creature or pay {3} more — a 5-mana sorcery Murder |
| 13 | Solve for Disappointment | 2 | FRA NEW | NO | NO | Targeted hand disruption + a Jace token; no discard payoff in the 100 |
| 14 | Terminal Criticism | 2 | FRA NEW | NO | NO | Blue-or-red targets only |
| 15 | Vraska's Final Mercy | 2 | FRA NEW | NO | NO | Sorcery Infernal Grasp at {B}{B} (no generic, so Jet can't touch it); Grasp is instant and costs {B} here. Jace-6 mode is ~2 cards of draw for me |
| 16 | Way of the Necromancer | 2 | FRA NEW | NO | NO | Loyalty payoff; the list has no planeswalkers |
| 17 | Break Under Pressure | 3 | FRA NEW | SIDE | SIDE | Instant edict on the greatest-MV creature/PW, +2 life — the only answer in the pool that beats hexproof *and* indestructible voltron. Bring in at voltron tables; displaces Terminate (or Infernal Grasp once Lich's Relic has taken Terminate's slot) |
| 18 | Cast Away Doubt | 3 | FRA NEW | NO | NO | One-shot draw-2 for you; its 2 to each player hits you too (amplifiers are opponent-only so they don't worsen it, but it's still a self-ping). One-shots were cut 2026-08-23 on the grounds that the engines draw |
| 19 | Danitha, Spear of Agony | 3 | FRA NEW | NO | NO | Self-growing first striker; deck doesn't attack |
| 20 | Gideon the Oathless | 3 | FRA NEW | SIDE | SIDE | A new punisher axis: 1 damage per **opponent creature entering** (tokens count) and per opponent **loyalty activation**. Black source — Solphim/Torture Pit/Tomik/Twinflame apply, Torbran doesn't. Ward—discard. Meta-dependent: bring in vs token/creature pods; displaces Vial Smasher (or its replacement) |
| 21 | Loot, the Anomaly | 3 | FRA NEW | NO | NO | Negative-power attacker gimmick; threshold-gated |
| 22 | Proft, Sinister Mastermind | 3 | FRA NEW | NO | NO | Threshold-gated 5/5 menace beater; its discard mode is a −3/−1 trick |
| 23 | Sanctum Lurker | 3 | FRA NEW | NO | NO | Gives the Jace token a [+2]: 1 to each opponent + gain 1 — one ping a turn for a 3-mana 3/2, below every in-list punisher. Looks like a punisher; isn't at this rate |
| 24 | Screeching Soulbreaker | 3 | FRA NEW | NO | NO | Pings each opponent only when it attacks; deck doesn't attack |
| 25 | Theoretical Necromancer | 3 | FRA NEW | NO | NO | Graveyard recursion for creature cards; off-plan |
| 26 | Tinybones, Pocket Nuisance | 3 | FRA NEW | SIDE | SIDE | Discard punisher: *"whenever a player discards one or more cards, Tinybones deals 1 damage to each opponent"* — ETB alone is three discards → three instances to **each** opponent; then Painful Quandary's discard branch, Wheel, Fraying Omnipotence, Torment's discard option and gift-engine cleanup overflow all bill the whole table. Runner-up for the Vial Smasher slot |
| 27 | Way of the Deathbringer | 3 | FRA NEW | NO | NO | Jace-5 + a sacrifice-for-Beast loyalty ability; no sacrifice plan |
| 28 | Winter, Tormented Loner | 3 | FRA NEW | NO | NO | The edict requires sacrificing one of *your* creatures/PWs |
| 29 | Darklight Phoenix | 4 | FRA REPRINT | NO | NO | Returns only if two creatures died this turn; no sacrifice engine |
| 30 | Extended Absence | 4 | FRA NEW | NO | NO | 4-mana instant exile + 1 ping each; Deadly Rollick is the free exile slot |
| 31 | Rampart Hunter | 4 | FRA NEW | NO | NO | Deathtouch combat body + pump |
| 32 | Rewrite Regrets | 4 | FRA NEW | NO | NO | Reanimates Gray Merchant for a second drain, but Whip of Erebos already rebuys it repeatably |
| 33 | Teyo, Diamondblade Mage | 4 | FRA NEW | NO | NO | Flash deathtouch/counter trick on a 3/1 |
| 34 | Garruk, Veiled Butcher | 5 | FRA NEW | NO | NO | −2 is a symmetric edict (you sacrifice too); 5-MV walker in the deck the table already attacks; exile-instead clause irrelevant here |
| 35 | Massacre Girl, Most Wanted | 5 | FRA NEW | NO | NO | Pings when *your* creatures die — no sacrifice engine; the noncombat-damage clause only grows her |
| 36 | Rise of the Deathbringer | 5 | FRA NEW | NO | NO | Draw-5-lose-5 one-shot for you; the −3/−3 mode kills your own Kederekt, Razorkin, Bowmasters, Squelcher |
| 37 | Yargle, Glutton of Urborg | 5 | FRA REPRINT | NO | NO | Vanilla 9/3 |
| 38 | Apex Witchstalker | 6 | FRA NEW | NO | NO | 6-MV menace body + 2 life twice; basic landcycling is its best mode |
| 39 | Jhoira, Weatherlight Corsair | 6 | FRC NEW | NO | NO | 6-MV random historic steal on ETB (you lose its MV); attack trigger unused |
| 40 | Overwrite the Multiverse | 6 | FRA REPRINT | NO | NO | **Trap** — exiles all creatures: your commander, every creature punisher and three amplifiers |
| 41 | Archfiend of Despair | 8 | FRC REPRINT | SIDE | SIDE | Reprint of the existing pocket card (second Wound Reflection + opponents can't gain life, redundant with the commander). Unchanged: displaces Wound Reflection in long games |
| 42 | Archon of Cruelty | 8 | FRC REPRINT | NO | NO | 8-MV ETB/attack edict + discard + drain 3. Rakdos, Lord of Riots can discount it, but in a deck that doesn't attack it is one trigger; Gray Merchant drains the whole table for less |
| 43 | Avacyn, Angel of Horror | 8 | FRC NEW | NO | NO | 8-MV recursion for nontoken creatures dying; no sacrifice engine |

### Red

| # | Name | MV | New? | B4 (main) | B3 | Reason |
|---|---|---|---|---|---|---|
| 44 | Ajani's Anguish | 1 | FRA NEW | NO | NO | Single-target X burn (its MV 1+X does bill the Lord trigger); the in-list X spells hit each opponent |
| 45 | Artifist Acumen | 1 | FRA NEW | NO | NO | Team first strike + cantrip |
| 46 | Marwyn, the Clearcutter | 1 | FRA NEW | NO | NO | {2},{T}, sacrifice an artifact or land: draw — slow draw that eats the rocks the fast-mana pass added |
| 47 | Pompous Battlemage // Improvised Act | 1 | FRA NEW | NO | NO | Prowess 1/1 with a rummage copy |
| 48 | Blazing Crescendo | 2 | FRA REPRINT | NO | NO | Combat pump + impulse draw |
| 49 | Eardrum Rattler | 2 | FRA NEW | NO | NO | Unblockability granter; deck doesn't attack |
| 50 | Essence Burn | 2 | FRA NEW | NO | NO | Black/green targets only |
| 51 | Gallia, the Merrymaker | 2 | FRA NEW | NO | NO | Haste/counter enabler for attackers |
| 52 | Master of Barbs | 2 | FRA NEW | NO | NO | Its trigger (opponents dealt noncombat damage) is always on here, but the payoff is +1/+0 for attackers |
| 53 | No Admittance | 2 | FRA NEW | NO | NO | 3 damage sorcery; burn-to-face is below the in-list each-opponent drains |
| 54 | Samut, Hazoret's Champion | 2 | FRA NEW | NO | NO | Team haste; the list gets Hidetsugu's haste from Boots |
| 55 | Skilled Battlecarver | 2 | FRA NEW | NO | NO | Combat 2-drop |
| 56 | Stingcaster Mage | 2 | FRA REPRINT | SIDE | SIDE | 2-mana re-buy of the best instant/sorcery in your yard at its mana cost: a second Wheel of Fortune, Demonic Tutor, Torment/Exsanguinate at full X, or a wipe. Displaces Fraying Omnipotence, like the other second-wheel pockets |
| 57 | Tomik, Izzet Sparkmage | 2 | FRA NEW | **MAIN** | **MAIN** | Opponent-only additive at {R}: *"a source you control would deal noncombat damage to an opponent or a permanent an opponent controls … that much plus 1"*. On a 1-damage-ping engine +1 per instance equals a doubler. Displaces Vial Smasher (see Proposed swaps) |
| 58 | Way of the Pyromancer | 2 | FRA NEW | NO | NO | Jace-2 + a mana ability for planeswalkers; no planeswalkers |
| 59 | Chandra's Emberling | 3 | FRA NEW | NO | NO | Grows off your noncreature spells; beater |
| 60 | Command the Stage | 3 | FRA NEW | NO | NO | Its return condition is always on here, but a 3-mana 2/2 token a turn bills nobody |
| 61 | Cursed Mirror | 3 | FRC REPRINT | NO | NO | 3-mana rock/clone; Ramp is at 12 with better 2-drops |
| 62 | Fulminous Forte | 3 | FRA NEW | SIDE | SIDE | Instant: 1 to each opponent creature/PW (one-sided — Torbran +2, Solphim ×2, Tomik +1 all apply to opponents' permanents) or 5 to one target. Runner-up to Lich's Relic for Terminate's slot; bring in vs go-wide pods |
| 63 | Identity Echo | 3 | FRA NEW | NO | NO | Sorcery-speed creature re-roll engine |
| 64 | Koth, the Geomancer | 3 | FRA NEW | NO | NO | 1 damage per **your** land drop — bills your action, not theirs; ~1 per opponent a turn |
| 65 | Pia, Determined Rebuilder | 3 | FRA NEW | NO | NO | Thopter + artifact-count pump |
| 66 | Pyre Rhymer // Molten Tide | 3 | FRA NEW | NO | NO | Molten Tide is a Mountain-only ritual; 4 basic Mountains + 3 typed |
| 67 | Way of the Warlord | 3 | FRA NEW | NO | NO | One Jace −4: 2 to a creature and 2 to a player, once |
| 68 | Wrath of the Bloodmane | 3 | FRA NEW | NO | NO | {R} here (Ruby + legendary discount) for 4 damage — cheap, but Grasp/Terminate kill any toughness |
| 69 | Arni, Renowned Champion | 4 | FRA NEW | NO | NO | Trample attacker |
| 70 | Chandra, Torch of Defiance | 4 | FRA REPRINT | SIDE | SIDE | +1: 2 damage to each opponent (red — Torbran/Solphim/Tomik apply) or an extra card every turn; −3 removal. A planeswalker in the deck the table attacks. Pocket beside Chandra, Awakened Inferno; displaces Manabarbs |
| 71 | Curse-Marred Demon | 4 | FRA NEW | NO | SIDE | Demonic Tutor on a 4/4 flying trampler ({R}{R} under Rakdos, Lord of Riots), then a random discard. **B3:** displaces Imp's Mischief — restores the second tutor the B4→B3 derivation removed, without a Game Changer. **B4:** Demonic + Vampiric already; a fourth-turn tutor in a 16-card four-drop glut |
| 72 | Heartstring Puller | 4 | FRA NEW | NO | NO | Trample 3/1 + Cadet |
| 73 | Tetsuko Umezawa, Pursuer | 4 | FRA NEW | NO | NO | Combat pinger |
| 74 | Violent Echoes | 4 | FRA NEW | NO | NO | 4-mana single-target burn |
| 75 | Awaken the Inferno | 5 | FRA NEW | NO | NO | 5-mana sorcery removal; landcycling |
| 76 | Draconic Visitor | 5 | FRA NEW | NO | NO | Mandatory replacement turns your Descent into Avernus Treasures into 5/5 Dragons — you lose the mana (line recorded); 5-MV off-plan |
| 77 | Jiang Yanggu, Alone | 5 | FRA NEW | NO | NO | Attack-alone payoff |
| 78 | Tether Technician | 5 | FRA NEW | NO | NO | Discard-to-ping 5-drop, one shot |
| 79 | Winter, Team Player | 5 | FRA NEW | NO | NO | Convoke anthem for spell casts; combat |
| 80 | Ajani Unrelenting | 6 | FRA NEW | NO | NO | −3 (4 to each creature except your tokens) kills your own punishers |
| 81 | Kiora of Fire and Ashes | 6 | FRA NEW | NO | NO | 6-MV Dragon maker |
| 82 | Venser, Fervent Forger | 6 | FRC NEW | NO | NO | Copies aren't cast (CR 707.10) — no Lord/Kaervek/Quandary trigger; reactive 6-drop |
| 83 | Craterclaw Colossus | 7 | FRA REPRINT | NO | NO | Artifact-count attack spell on a body |
| 84 | Face Yourself | 7 | FRA NEW | NO | NO | 7-MV attack spell |
| 85 | Akroma, Angel of Fury | 8 | FRC REPRINT | NO | NO | Morph beater |

### Multicolor BR

| # | Name | MV | New? | B4 (main) | B3 | Reason |
|---|---|---|---|---|---|---|
| 86 | Stingerquill Voxmancer // Vicious Verse | 1 | FRA NEW | NO | NO | Re-prepares every upkeep: {B/R} for 1 to an opponent plus a guaranteed cheap first spell (MV 1) for the Lord — real but ~2 raw a turn, and the 1/2 dies to our own wipes. The list already finds a first spell every turn |
| 87 | Grim Repriser | 2 | FRA NEW | NO | NO | Recursive prowess 2/2 |
| 88 | Rakdos Signet | 2 | FRC REPRINT | IN | IN | Already in both lists |
| 89 | Stingerquill Charm | 2 | FRA NEW | NO | NO | 3 to any target / deathtouch trick / 2/2 — Rakdos Charm's graveyard and artifact modes do more here |
| 90 | Stinging Vitriol | 2 | FRA NEW | NO | NO | 2 to one opponent + one discard |
| 91 | Talisman of Indulgence | 2 | FRC REPRINT | IN | IN | Already in both lists |
| 92 | Hallway Heckler // Vicious Verse | 3 | FRA NEW | NO | NO | One Vicious Verse (enters prepared, never re-prepares) + a rummage 2/3 |
| 93 | Ingris Stingerquill | 3 | FRA NEW | NO | NO | Pings each opponent per *attacking* creature; deck doesn't attack |
| 94 | Whiplash Wordsmith // Vicious Verse | 4 | FRA NEW | NO | NO | One Vicious Verse + a conditional flier |

### Colorless

| # | Name | MV | New? | B4 (main) | B3 | Reason |
|---|---|---|---|---|---|---|
| 95 | Currency Converter | 1 | FRC REPRINT | NO | NO | Rummage engine; no discard payoff in the 100 |
| 96 | Eye of Jace | 1 | FRA NEW | NO | NO | Surveil 1 a turn, then a one-time 2 + 2 life at threshold |
| 97 | Sol Ring | 1 | FRC REPRINT | IN | IN | Already in both lists |
| 98 | Afterthought Sentry | 2 | FRA NEW | NO | NO | Attack-triggered graveyard hate on a 2/2 |
| 99 | Arcane Signet | 2 | FRC REPRINT | IN | IN | Already in both lists |
| 100 | Fellwar Stone | 2 | FRC REPRINT | IN | IN | Already in both lists |
| 101 | Karn, Argent Defender | 2 | FRA NEW | NO | NO | **Trap / stax flag** — Torpor Orb on a body: switches off your own Gray Merchant, Orcish Bowmasters' ETB and Mithril Coat's attach trigger. Also a hate piece the pod removes on sight |
| 102 | Living Library | 2 | FRA NEW | NO | NO | {6}+sacrifice tuck removal |
| 103 | Medic's Kitesail | 2 | FRA NEW | NO | NO | Flying/lifegain equipment for attackers |
| 104 | The Echoverse Fulcrum | 2 | FRA NEW | NO | NO | 7 mana over two turns for a wipe that also kills the commander; Wipes at 3/3 with Deluge at 3 |
| 105 | Chromatic Lantern | 3 | FRC REPRINT | NO | NO | 3-mana rock in a two-colour deck with 27 B / 25 R sources |
| 106 | Keeper of the Quiet Hour | 3 | FRA NEW | NO | NO | 3/2 + a Jace token |
| 107 | Murmuring Volume | 3 | FRA NEW | NO | NO | 3-mana rock + slow rummage |
| 108 | Traxos, Scourge Eternal | 4 | FRA NEW | NO | NO | Untaps only on your artifact/creature casts; beater |
| 109 | Archive Arbiter | 6 | FRA NEW | NO | NO | 6-MV flier; its removal mode is worse than Chaos Warp |
| 110 | Ginger, Queen of Sweets | 6 | FRC NEW | NO | NO | Monarch for you draws attacks (No Mercy can punish it) but 6 MV, and the extra card is yours — not a billed gift |
| 111 | Omnath, Locus of the Void | 7 | FRC NEW | NO | NO | Landfall mana 7-drop |
| 112 | Darksteel Angel | 9 | FRC NEW | SIDE | SIDE | *"You can't lose the game and your opponents can't win the game"* on an indestructible flier — the answer to dying to your own symmetric pieces. 9 generic, so Rakdos, Lord of Riots can make it near-free, and a 9-MV first spell is 9 from the Lord trigger (line recorded). Displaces No Mercy (alternative shields) |
| 113 | Emrakul, the Exigent Doom | 10 | FRA REPRINT | NO | NO | 10-MV first spell = 10 × amplifiers from the Lord to one opponent, and it untaps your lands on cast (line recorded) — but it needs 10 up front, and Rakdos is the only discount |
| 114 | Memnarch, the Warden | 10 | FRC NEW | NO | NO | 10-MV artifact draw engine |

### Land

| # | Name | MV | New? | B4 (main) | B3 | Reason |
|---|---|---|---|---|---|---|
| 115 | Command Tower | 0 | FRC REPRINT | IN | IN | Already in both lists |
| 116 | Exotic Orchard | 0 | FRC REPRINT | NO | NO | Two-colour deck; colours depend on opponents' lands — a dual is equal or better |
| 117 | Fabled Passage | 0 | FRC REPRINT | NO | NO | Finds basics only, tapped early; the five fetches already find typed duals untapped |
| 118 | Hall of Echoes | 0 | FRA NEW | NO | NO | Colourless clone-land |
| 119 | Haunted Ridge | 0 | FRA REPRINT | IN | IN | Already in both lists |
| 120 | Hexhaven Dueling Arena | 0 | FRA NEW | NO | NO | Prepare-matters utility land; the list has no prepare cards |
| 121 | Kher Keep | 0 | FRC REPRINT | NO | NO | Colourless Kobold maker |
| 122 | Mountain | 0 | FRA REPRINT | IN | IN | Already in both lists (basic) |
| 123 | Path of Ancestry | 0 | FRC REPRINT | NO | NO | Enters tapped; scry only for Human/Assassin creature spells |
| 124 | Reflecting Pool | 0 | FRC REPRINT | NO | NO | Makes B or R only once another B/R land is out; marginal over a Mountain, and it costs a basic (Smoldering Marsh wants two) |
| 125 | Room of Refuge | 0 | FRA NEW | NO | NO | Tapped mono-colour land with a late +1/+1 mode |
| 126 | Stingerquill Annex | 0 | FRA NEW | NO | NO | Enters tapped unless you control a planeswalker — the list has none |
| 127 | Sulfurous Springs | 0 | FRC REPRINT | IN | IN | Already in both lists |
| 128 | Swamp | 0 | FRA REPRINT | IN | IN | Already in both lists (basic) |
| 129 | Turbulent Crater | 0 | FRC NEW | NO | NO | Typed Swamp Mountain (fetchable), but tapped until opponents hold 8 lands (~turn 3) — the last pass was about early *untapped* mana; marginal over a basic |

---

## Proposed swaps (both lists — pilot approves each one separately)

Curve method below: nonland cards outside the Lands section (65 per list; the MDFC spell-lands are
counted as lands), MV as printed. Current **B4: avg MV 3.22 · MV≤2 27 · MV≤3 38**;
**B3: 3.23 · 27 · 39**. (`deck:show`'s own footer reads 3.28/3.29 because it counts differently —
the deltas are what matter.)

### 1. Tomik, Izzet Sparkmage in — Vial Smasher the Fierce out

> **Tomik, Izzet Sparkmage** {1}{R} · Legendary Creature — Human Wizard 1/2 — Prowess. *If a source
> you control would deal noncombat damage to an opponent or a permanent an opponent controls, it
> deals that much damage plus 1 instead.*

**Deciding axis: output scaling — instance count, not hit size.** Almost everything this deck does
to opponents is many small noncombat instances (five 1-damage draw-punishers + Spiteful Visions per
opponent draw, Manabarbs per land tap, Mogis, Descent, the Lord and Kaervek). A per-instance +1
therefore doubles most of the deck's output — on a 1-damage ping it is exactly what Solphim does —
for **{R}** (Ruby Medallion or Rakdos, Lord of Riots) instead of three mana.

**Rule 1 check:** worded "to an **opponent** or a permanent an opponent controls" — it never
touches the damage Spiteful Visions, Manabarbs, Descent or Hidetsugu deal to you. **Rule 2:** n/a.

**Ordering (CR 616.1, LEDGER "Replacement effects are ordered by the AFFECTED player"):** the
opponent takes the additive last. So per ping: Tomik alone 1 → 2; Solphim + Torture Pit + Tomik
(1×2)+2+1 = **5** (was 4). formulas.md's per-draw row "punishers only" goes 8 → **14** with Tomik
alone (6 damage punishers × 2 + Sheoldred's 2 loss), the same as "+ Solphim" today.

**It completes the Hidetsugu kill a third way.** Doubler + Tomik: the opponent picks
min((h×2)+1, (h+1)×2) = 2h+1 where h = ⌊L/2⌋ — that is L+1 for even L and exactly L for odd L.
Every total of 2+ dies, the same as doubler + Torbran/Torture Pit (formulas.md, LEDGER 2026-08-23
half-life entry). At L = 1, h = 0: no damage, no additive (CR 120.8).

**Rider:** Tomik is a red permanent on turn 2 — Kederekt Parasite's "if you control a red
permanent" is on before the Lord lands.

**Self-hits:** a 1/2 dies to your own Blasphemous Act and Toxic Deluge (X ≥ 2) — exactly like
Kederekt, Razorkin and the 2/3 it replaces (Fraying Omnipotence's sacrifice-half is your choice).
No trigger of ours is switched off.

**Amplifier role table** (current list + candidate — scored to show Tomik is *not* a substitute for
any of them, so the cut does not come from here):

| Card | Cost here | What it boosts | 1-dmg ping, alone | Lord's 3, alone | Body / resilience | Pips |
|---|---|---|---|---|---|---|
| Solphim, Mayhem Dominus | {1}{R}{R} (Ruby) / {R}{R} (Rakdos) | ×2 noncombat, any source | 2 | 6 | 5/4, can buy indestructible | RR |
| Twinflame Tyrant | {2}{R}{R} / {R}{R} | ×2 all damage to opponents | 2 | 6 | 3/5 flier | RR |
| Torture Pit (Spiked Corridor door) | {2}{R} | +2 noncombat, any source | 3 | 5 | enchantment — survives our own creature wipes | R |
| Torbran, Thane of Red Fell | {R}{R}{R} | +2, **red** sources only (incl. combat) | 3 red / 1 black | 5 | 2/4 | RRR |
| Bloodletter of Aclazotz | {B}{B}{B} (Jet) | ×2 life **loss**, your turn only (incl. damage) | 2 on your turn | 6 on your turn | 2/4 flier | BBB |
| Wound Reflection | {4}{B} (Jet) | repeats each opponent's total life lost, every end step | ~2 | ~6 | enchantment | B |
| **Tomik, Izzet Sparkmage** | **{R}** (Ruby / Rakdos) | **+1 noncombat, any source** | **2** | **4** | 1/2 | R |

Multipliers commute and additives add on after them (LEDGER), so every one of these stacks with
Tomik — the §2.5 "genuinely multiplicative" case. Cutting an amplifier *for* Tomik would trade a
stacking piece for a stacking piece; the cut belongs where output is lowest.

**Where the cut comes from — punisher table** (the role Vial Smasher sits in, plus the two new
contenders for its slot). Raw output = mid-game estimate per opponent per turn cycle, before
amplifiers:

| Card | Trigger | Raw output / opp / cycle | Amplified by | Body | Notes |
|---|---|---|---|---|---|
| Kaervek the Merciless | every opponent spell → its MV to any target | ~6 (2 spells × MV 3 × 3 opps, aimed) | all (red) | 5/4 | {3}{B}{R} under both Medallions |
| Painful Quandary | every opponent spell → 5 life or a discard | up to ~10, or discards | Bloodletter only (loss) | enchantment | discards feed Tinybones |
| Mogis, God of Slaughter | each opponent upkeep → 2 or sacrifice | 2 | all (red) | indestructible | |
| Manabarbs | every land tap → 1 | ~5 (you ~5; 0 under Chasm) | all (red) | enchantment | pilot keep 2026-08-23 |
| **Vial Smasher the Fierce** | **your** first spell each turn → its MV to a **random** opponent | **~1.25** (~1.5 triggers × MV ~2.5, split three ways) | all (red) | 2/3 | lowest output; can't be aimed |
| *Tomik (candidate)* | +1 on every noncombat instance | = instance count: ~3 early (Lord + 1 punisher + Mine), ~15–19 mid-game (formulas.md board) | n/a | 1/2 | |
| *Tinybones (runner-up)* | any player's discard → 1 to **each** opponent | 3 on ETB, then ~1–4 (cleanup overflow, Quandary, wheels) | Solphim/Pit/Tomik/Twinflame (black) | 2/1 | see Bench |

Vial Smasher is the lowest-output punisher on every board state, and Tomik out-produces it from the
emptiest one (Lord + one punisher + Howling Mine already makes ~3 instances per opponent a cycle).

**Past grounds, re-derived (§1.1b):** Vial Smasher went in 2026-08-23 as "the page's top synergy
(+0.61, 67%)" and survived the 2026-09-22 fast-mana pass as **the pilot's call** ("stays despite its
random target"). The 67% is field popularity, not a verdict for this list (§2.2); the off-turn
trigger it gets from our instants is real but is already counted above. The pilot's keep is the
thing to ask about, not a reason to skip the question.

**Alternatives considered for the cut:** Torbran (the nearest substitute — but on a Manabarbs board
its +2 on red matches or beats Tomik's +1 on everything, so it is not a clean downgrade; its real
cost is RRR off 25 red sources), Temple Bell / Howling Mine (Gifts is already 6 against a target of
8 — wrong direction), Fellwar Stone (Ramp 12 is the pilot's fast-mana premise, and rocks dodge
Manabarbs), No Mercy (pilot keep, the only combat deterrent).

**Curve:** MV3 out, MV2 in → B4 avg 3.22 → 3.20, MV≤2 27 → 28, MV≤3 38 → 38 (B3 3.23 → 3.22,
27 → 28, 39 → 39). **Lists:** both. **B3 derivation:** unchanged. **GCs:** unchanged.

### 2. Lich's Relic in — Terminate out

> **Lich's Relic** {B} · Artifact — Equipment — *When this Equipment enters, you may pay {2}. When
> you do, for each opponent, destroy up to one target creature or planeswalker that player
> controls.* Equipped creature gets +2/+1. Equip {2}

**Deciding axis: card economy.** One card, three mana, up to three answers — one per opponent, and
each opponent's *chosen* target (your pick, not theirs). In a pod the table's three best creatures
or planeswalkers go for one card.

**Cost-out:** {B} has no generic, so Jet doesn't reduce it; the {2} is a reflexive-trigger payment,
not a spell cost. **3 mana total**, sorcery speed (it's an artifact). Its cast bills the Lord for 1
(MV 1) if it's your first spell. The equip half is irrelevant in a deck that doesn't attack.

**Self-hits:** none — every target is an opponent's permanent. It's "destroy", so hexproof and
indestructible dodge it (Break Under Pressure is the pocket answer to those).

**Removal role table** (all seven + candidate):

| Card | Cost here | Speed | Hits | Answers per card | Unique rider |
|---|---|---|---|---|---|
| Deadly Rollick | **free** with the commander ({2}{B} otherwise, Jet) | instant | creature (exile) | 1 | the exile slot; free |
| Infernal Grasp | **{B}** (Jet) + 2 life | instant | creature | 1 | cheapest instant kill |
| Feed the Swarm | {B} (Jet) + life = MV | sorcery | creature **or enchantment** | 1 | enchantment answer (Leyline of Sanctity / Aegis blank the Lord) |
| Rakdos Charm | {B}{R} | instant | modal | 1 | the **only** graveyard exile since Bojuka Bog went pocket; artifact mode |
| Chaos Warp | {1}{R} (Ruby) | instant | **any permanent** | 1 | second enchantment/anything answer |
| Bedevil | {B}{B}{R} | instant | artifact, creature or PW | 1 | instant artifact kill |
| **Terminate** | **{B}{R} — neither Medallion reduces it** | instant | creature | 1 | "can't be regenerated" (≈ nothing) |
| **Lich's Relic** | **{B} + {2}** | sorcery | creature or PW, **one per opponent** | **up to 3** | the only multi-target removal |

Terminate is the one card in the role with no unique job: Grasp does the same thing for one mana
here, Rollick does it for free, and neither Medallion discounts it (Rakdos Charm shares that, but
carries the list's only graveyard exile).
It is not "redundant" (§2.5) — it is the lowest-ranked row. The trade is **instant speed** for a
creature-only kill: at a table where the threat is a hasty or flashed-in combo creature, that is
the real cost, and Grasp/Rollick/Bedevil/Charm/Warp still cover it at instant speed.

**Alternatives considered:** Infernal Grasp (better than Terminate on cost), Bedevil (the instant
artifact kill), Feed the Swarm / Chaos Warp (the enchantment answers), Rakdos Charm (graveyard hate).
**Runner-up for the slot:** Fulminous Forte (instant, one-sided 1-damage sweep of opponents'
permanents — amplified by Torbran/Solphim/Tomik — or 5 to one target).

**Curve:** MV2 out, MV1 in → with swap 1: B4 avg 3.20 → 3.18, MV≤2 28 → 28, MV≤3 38; B3 3.22 →
3.20, 28, 39. **Lists:** both. **B3 derivation:** unchanged. **GCs:** unchanged.

**Combos:** neither MAIN creates a two-card combo or a chosen-N loop.

---

## Bench (SIDE) — each names what it displaces

| Card | List(s) | Bring in when… | Displaces |
|---|---|---|---|
| Tinybones, Pocket Nuisance | both | You'd rather keep the punisher count at 5 than add a 7th amplifier — the runner-up for the Vial Smasher slot. ETB alone bills each opponent three instances; best with Painful Quandary (their "discard instead" branch now pings the whole table) and wheels. **Rules note:** under CR 603.2c a simultaneous discard by several players (Wheel of Fortune, Fraying Omnipotence) reads as one trigger *per discarding player* — confirm with mtg-rules-expert before relying on the wheel count. | Vial Smasher the Fierce (or Tomik, if the pilot prefers it to Tomik) |
| Gideon the Oathless | both | Token or creature-heavy pods: every opponent creature *entering* is 1 damage (black — Solphim/Pit/Tomik apply), plus every opponent loyalty activation (FRA Jace tokens included). Ward—discard. | Vial Smasher the Fierce (or its replacement) |
| Fulminous Forte | both | Go-wide pods — one-sided instant sweep of x/1s (x/3s under Torbran, since the +2 applies to opponents' permanents), or 5 to one target. | Terminate (or Infernal Grasp if Lich's Relic already took Terminate's slot) |
| Break Under Pressure | both | Voltron / hexproof / indestructible commanders — an instant edict on their biggest creature or PW. | Terminate (or Infernal Grasp, as above) |
| Chandra, Torch of Defiance | both | Enchantment-removal-heavy pods, beside Chandra, Awakened Inferno: +1 is 2 to each opponent a turn (red — every amplifier applies) or a card; −3 is removal. | Manabarbs |
| Darksteel Angel | both | You keep dying to your own symmetric pieces, or an opponent has an alt-win: "you can't lose the game and your opponents can't win the game" on an indestructible flier. 9 generic → Rakdos, Lord of Riots discounts it to near-free mid-game, and as a first spell it bills the Lord for 9. Exile, bounce and −X/−X (our own Toxic Deluge) still answer it — and if it leaves while you're at 0 or less, you lose on the spot. | No Mercy (alternative shields) |
| Stingcaster Mage | both | You want a second Wheel of Fortune (or a second Demonic Tutor / full-X Torment) on a 2-mana body. Flashback cost = the card's mana cost, so X spells keep their X. | Fraying Omnipotence (like the other second-wheel pockets) |
| Archfiend of Despair | both | Reprint of the existing pocket entry — unchanged. | Wound Reflection |
| Curse-Marred Demon | **B3 only** | Restores the second tutor the B4→B3 derivation removed (Vampiric Tutor → Imp's Mischief), without a Game Changer: Demonic Tutor on a 4/4 flier, {R}{R} under Rakdos. The random discard can bin the tutored card only when your hand is small — rare under the gift engines. **If taken, the derivation's Vampiric row changes** from Imp's Mischief to Curse-Marred Demon. | Imp's Mischief |

---

## Traps (look good, hurt this deck)

- **Karn, Argent Defender** — Torpor Orb on a 2-mana body. Switches off your own Gray Merchant,
  Orcish Bowmasters' ETB and Mithril Coat's attach trigger; also a hate piece the pod removes on
  sight (flagged, not silently excluded — it simply fails on self-hits first).
- **Overwrite the Multiverse** — "exile all creatures" takes the commander, every creature punisher
  and three amplifiers with it.
- **Bloodline Recollector // Ancestral Craving** — the prepare spell is the perfect poisoned gift,
  but it only prepares on a turn when three creatures died. Without a sacrifice engine it's a 2/2.
- **Sanctum Lurker** — reads like a punisher ("each opponent" ping on a planeswalker), delivers one
  ping a turn.
- **Rise of the Deathbringer** — the −3/−3 mode is a self-sweep of Kederekt, Razorkin, Bowmasters,
  Squelcher (and Tomik).
- **Extrapolate the Impossible** — a blank in Commander (CR 903.11).
- **Draconic Visitor** — its replacement is mandatory: Descent into Avernus's Treasures would become
  Dragons and stop being mana.
- No card in the pool breaks rule 1 or rule 2 (no symmetric amplifier, no "players can't gain life").

## Lines recorded (the pilot likes these even when the card isn't taken)

- **Printed-MV bombs under Rakdos, Lord of Riots.** Rakdos discounts generic mana by life lost;
  mana value never changes (CR 118.7, 202.3e). Darksteel Angel (MV 9) or Emrakul, the Exigent Doom
  (MV 10, and it untaps your lands on cast) as the first spell of a turn = the Lord deals 9–10 to
  the opponent of your choice, ×2 Solphim, ×2 Twinflame, +2/+1 additives.
- **Draconic Visitor + Descent into Avernus** — 2, then 4, then 6 Dragons a turn, at the price of
  the Treasure mana.
- **Tinybones + Painful Quandary** — every Quandary trigger bills the caster 5 *or* bills all three
  opponents 1 each. There is no clean way out.
- **Hidetsugu + any doubler + Tomik** kills every life total of 2 or more (worked above).

---

## Follow-up after the pilot's first pass (2026-09-28)

**Pilot's call:** swap 2 applied (Lich's Relic for Terminate, both lists). Swap 1 declined, because
Vial Smasher stays. On Tomik: *"it's only a +1 to the damage so not sure if worth it, especially
since the opponent chooses which one to apply first."*

### The ordering point is correct, and here is exactly what it costs

CR 616.1: the **affected player** chooses the order of replacement effects, applying them one at a
time (616.1e–f). An opponent therefore always applies the multipliers first and Tomik's +1 **last**.
Tomik's +1 is never doubled by Solphim or Twinflame. It is always exactly **+1 per damage instance**.
The one exception is Bloodletter of Aclazotz and Wound Reflection. They act on the **life-loss** event
that follows the damage (CR 120.3a), after the damage replacements are settled, so they double the
final total, Tomik's +1 included.

**Per 1-damage ping, and per opponent draw** (formulas.md board: 6 damage punishers plus Sheoldred's
2 life loss; 4 of the 6 punishers are black — Underworld Dreams, Kederekt, Fate Unraveler, Bowmasters):

| Amplifiers out | Ping without → with Tomik | Per draw without → with | Tomik's share |
|---|---|---|---|
| none | 1 → **2** | 8 → **14** | +75% (the same as Solphim alone) |
| Solphim | min(1×2+1, (1+1)×2) = 2 → **3** (not 4) | 14 → **20** | +43% |
| Solphim + Twinflame | 4 → **5** | 26 → **32** | +23% |
| Solphim + Torture Pit | (1×2)+2 = 4 → **5** | 26 → **32** | +23% |
| + Torbran (red pings +2 more) | red 6→7, black 4→5 | 30 → **36** | +20% |
| Lord's trigger, first spell MV 3 | 3 → 4; under Solphim 6 → 7 | — | +33% → +17% |
| Bloodletter on your turn (Lord's 3 under Solphim) | 12 → **14** | — | the +1 is doubled after the damage |

So Tomik is worth the most exactly when the deck is weakest: turns 2–5, one or no amplifier, where it
doubles every ping for {R}. Its share shrinks toward ~20% once three amplifiers are out, because it
never gets multiplied. The pilot's instinct is right about the late game and understates the early game.

### Is there a B4 slot it honestly beats? — No.

Role check against targets (decisions.md, updated by the 2026-09-22 fast-mana pass):
- **Gifts:** 6 against a target of 8. Under target, so no cut.
- **Draw-punishers:** 6 against 7. Under target, so no cut.
- **Win conditions:** 5 against 7. Under target, so no cut.
- **Protection:** 6 against 6. Every card has a recorded job.
- **Removal:** 7 against 7. Terminate, the lowest row, is already gone.
- **Wipes:** 3 against 3.
- The only roles above their original targets are **Ramp (12)**, the pilot's fast-mana premise, and
  **Lifeline (5)**, the pilot's lifegain pass. Both were raised on purpose.

**Amplifiers (6/6), ranked against the current list, with Tomik as the candidate:**

| Card | Cost here | Boost | Ping | Lord's 3 | Why it beats or ties Tomik |
|---|---|---|---|---|---|
| Solphim | {1}{R}{R} | ×2 noncombat | 2 | 6 | same on pings, double on every bigger hit (Lord, Kaervek, Hidetsugu, Mogis) |
| Twinflame Tyrant | {2}{R}{R} | ×2 all damage, incl. combat | 2 | 6 | as Solphim, plus combat |
| Torture Pit | {2}{R} | +2 noncombat | 3 | 5 | double Tomik's addend; an enchantment that survives our wipes; Spiked Corridor adds 3 Devils |
| Bloodletter | {B}{B}{B} | ×2 life loss, your turn | 2 | 6 | it is the Fraying Omnipotence kill |
| Wound Reflection | {4}{B} | echoes each turn's loss at end step | ~2 | ~6 | a ×2 on everything, combat and life loss included |
| Torbran | {R}{R}{R} | +2, red sources, incl. combat | 3 red / 1 black | 5 | the nearest call — see below |
| *Tomik* | {R} | +1 noncombat, any source | 2 | 4 | cheapest by two mana |

**Torbran vs Tomik is a wash, not a win.** Tomik gives +6 per opponent draw against Torbran's +4,
because four of the six draw punishers are black. Torbran gives +2 against Tomik's +1 on every red
instance: the Lord's trigger, Manabarbs, Mogis, Kaervek, Descent, Hidetsugu and all combat damage.
They stack rather than substitute (§2.5), so trading one for the other gains nothing. Tomik's real
edge is cost ({R} against RRR).

**Other cuts considered and rejected:**
- **Rakdos, Lord of Riots:** it takes 5–15 generic off every creature spell by our main phase, and
  it is a 6/6 flying threat.
- **Hexing Squelcher:** B4 counter-protection, per the 2026-08-24 entry.
- **Fellwar Stone:** rocks dodge Manabarbs (the fast-mana premise).
- **No Mercy / Witch's Clinic / Vial Smasher:** pilot keeps.

### Recommendation: leave Tomik out of B4 and B3. Bench it as the first reserve for:

1. the Vial Smasher slot, if that keep is ever revisited;
2. any amplifier that proves too slow in play (Wound Reflection at 5 mana is the one to watch); or
3. a B3 table where the Exquisite Blood loop is gone and the deck wins on raw ping volume.
