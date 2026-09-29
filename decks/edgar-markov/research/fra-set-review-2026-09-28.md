# FRA + FRC (Reality Fracture + Reality Fracture Commander) set review — Edgar Markov — 2026-09-28

**Method:** deck-brain SKILL.md. Every card classified from the verified Scryfall oracle text in the
scanned pool (`bun run set-scan fra` / `frc`, filtered to Mardu {W}{B}{R} identity and
commander-legal) — never from memory; both halves read for every prepare / MDFC card. In-deck
comparison cards read from the current `deck.json` oracle dump. Each card checked against what this
deck actually outputs — opponent **life loss** (drains), **life-gain events** (converted by Vito,
Marauding Blight-Priest, Sanguine Bond, Indulging Patrician), **creature deaths** (sacrifice is a
death, CR 700.4), and **Vampire spells cast** (eminence) — and audited against the deck's own board:
Anowon's "each player sacrifices a non-Vampire", Olivia's Wrath's non-Vampire −X/−X, die→exile
replacements (LEDGER 2026-08-09), and the Incubator/Horn discount that only reaches **generic** mana
in **creature** spells (§1.2).

**Lists and which is newest** (from `research/decisions.md`):

| List | Last applied change | Status |
|---|---|---|
| `sacrifice` | 2026-09-14 (Creeping Bloodsucker) | **Newest — the list being played** (versions-comparison 2026-08-25, every Sep pass targeted it) |
| `combat` | 2026-09-10 (MDFC lands); three swaps proposed 2026-09-10 still pending | Second |
| `main` | 2026-08-06 vampire pass | Oldest — the pre-split list |

Verdicts are given for all three, but the proposals are written for `sacrifice` first.

**Field lens:** unavailable. EDHREC has no FRA/FRC data yet (release 2026-10-02) — skipped per §2.2
rather than invented.

**Pool:** 206 cards fit Mardu identity and are commander-legal — 151 from FRA, 55 from FRC.
**149 NEW, 57 REPRINT.** **Four Vampires** in the pool (Bloodline Recollector, Edgar Ancient
Bloodlord, Theoretical Necromancer, Whiplash Wordsmith). **Zero Game Changers** — nothing here moves
the 3/3 GC budget (Ancient Tomb, Smothering Tithe, Teferi's Protection).

## Result

| List | MAIN | SIDE | NO |
|---|---|---|---|
| `sacrifice` | **3** — Bloodline Recollector, Lich's Relic, Edgar, Ancient Bloodlord | 8 | 195 |
| `combat` | **1** — Windcrag Siege | 9 | 196 |
| `main` | **2** — Bloodline Recollector, Edgar, Ancient Bloodlord | 8 | 196 |

**The pilot's named ask — Edgar, Ancient Bloodlord:** MAIN in `sacrifice` (priority 3 of 3, a close
call over Clavileño) and in `main` (over Legion Lieutenant); SIDE in `combat` (its two abilities
serve a sacrifice plan COMBAT barely runs). Full role tables below.

---

## Set mechanics as they matter to this deck

- **Prepare (CR 722) — 24 cards.** Casting the prepared copy is a real cast (CR 722.3c, 601.2i), but
  the copy has **only the prepare spell's characteristics** — it is never a creature spell, so it
  makes **no eminence token** and gets **no Incubator/Horn discount** (LEDGER 2026-08-06). A permanent
  that is already prepared can't become prepared again (CR 722.3a), so Roaming Throne doubling a
  "becomes prepared" trigger adds nothing. The one prepare card worth it here is Bloodline
  Recollector, whose re-prepare condition this deck meets on purpose.
- **Empower Jace — the Jace planeswalker token.** Not in the local CR (rules file is 2026-08-07;
  FRA is newer). Evaluated from reminder text plus the verified token definition
  (scratchpad `tokens.md`): a **non-legendary planeswalker token**, "−1: Surveil 1 / −3: Draw a card",
  loyalty = the empowered counters. Consequences here: it is a **token** (Mirkwood Bats pings on its
  creation; Elspeth, Storm Slayer and Anointed Procession make **two** — one gets the counters, the
  other has 0 loyalty and goes to the graveyard (CR 704.5i), which is "a planeswalker you control
  dies" for Cruel Celebrant and Edgar, Ancient Bloodlord); it is a **planeswalker**, so each Jace
  card is "a card per 3 loyalty, one activation per turn" (CR 606.3). The "Way of the X" legendary
  enchantments are the Jace engines; only **Way of the Mentor** has a loyalty trigger this deck
  feeds faster than it spends.
- **Cadet tokens** (2/2 colorless Wizard Soldier) and the set's other token makers: off-tribe. They
  miss eminence, every Vampire lord and Kalastria; Anowon's edict eats them (useful) and Olivia's
  Wrath kills them (a self-hit).
- **Vicious Verse** (four cards share it) — a 1-damage ping copy. Damage, so Bloodletter doubles it on
  your turn, but one point is not an engine.
- **Surveil (43), threshold, flashback** — the deck has no graveyard payoff beyond Phyrexian
  Reclamation, Takenuma and Agadeem; none of these matter.
- **Die→exile trap returns:** Garruk, Veiled Butcher ("If a creature an opponent controls would die,
  exile it instead") — same verdict as Head of the Hunt (LEDGER 2026-08-09).
- **Extrapolate the Impossible is a blank in Commander:** CR 903.11 — traditional cards from outside
  the game can't be brought into a Commander game except by effects that *specifically* bring them
  into Commander games; it says only "from outside the game".
- **FRC reprints the deck never evaluated:** Windcrag Siege (Mardu mode = attack-trigger doubler,
  LEDGER 2026-09-24) and Stroke of Midnight (Generous Gift that hands over a 1/1, not a 3/3). Both
  land in the verdicts below.

---

## Classification table — all 206 cards

Verdict key: **MAIN** = would displace a named card in that list's 100 · **SIDE** = bench-worthy,
named seat below · **NO** = pass. Columns: Main = `main`, Comb = `combat`, Sac = `sacrifice`.

### White (#1–55)

| # | Name | MV | New? | Main | Comb | Sac | Reason |
|---|---|---|---|---|---|---|---|
| 1 | Guiding Hydra | 1 | NEW | NO | NO | NO | {X}{W} mana sink competes with the cast engine; off-tribe, dies to own Olivia's Wrath; Cordial/Indulgent Aristocrat already spread counters |
| 2 | Liliana the Faultless | 1 | NEW | NO | NO | NO | Soul Warden for your own creatures — a gain event per entry, but damage only with Vito/Blight-Priest out; Human 1/1 (no eminence, Anowon self-edict, Olivia's Wrath) — Soul Warden's grounds |
| 3 | Loyal Tutor | 1 | NEW | NO | NO | NO | Tutors only planeswalkers, to the top; Elspeth (and Sorin in COMBAT) are the only targets |
| 4 | Path to Exile | 1 | REPRINT | NO | NO | NO | Already in all three lists |
| 5 | Secure the Wastes | 1 | REPRINT | NO | NO | NO | X-sink for off-tribe Warriors; March of the Canonized (X lifelink *Vampire* tokens) is the on-tribe version already on the watch list |
| 6 | Swords to Plowshares | 1 | REPRINT | NO | NO | NO | Already in all three lists |
| 7 | Academic Ascent | 2 | NEW | NO | NO | NO | Single-target +2/+2 flying trick + Jace 2 |
| 8 | Ajani Resolute | 2 | NEW | NO | SIDE | NO | Every gain event = loyalty; −10 is a permanent +2/+2 emblem, reachable in ~2 COMBAT attacks with Sanctum Seeker; starts at 2 loyalty (fragile). SACRIFICE rarely turns power into damage |
| 9 | Campus Crier | 2 | NEW | NO | NO | NO | 3/1 Human; graveyard Jace 2 only |
| 10 | Enlightened Confidant | 2 | REPRINT | NO | NO | NO | End-step surveil-to-hand is ~1 card/turn here, but on a 2/1 Kor (no eminence, Anowon, Olivia's Wrath); Staff / Way of the Mentor do it off noncreature permanents |
| 11 | Gideon's Memorial | 2 | NEW | NO | NO | NO | Token +1/+0 and vigilance; its mana only casts planeswalkers |
| 12 | Grand Crescendo | 2 | REPRINT | NO | NO | NO | Indestructible loses to −X/−X (CR 704.5f) and exile; X-sink; protection held at 2 on the 07-31 grounds |
| 13 | Martial Coup | 2 | REPRINT | NO | NO | NO | X≥5 destroys your own Vampires; Olivia's Wrath is the one-sided version |
| 14 | Predictive Preparations | 2 | NEW | NO | NO | NO | Two counters + flashback; no engine |
| 15 | Prophesied End | 2 | NEW | NO | NO | NO | 2-mana Murder that draws the victim a card unless it attacked; Swords/Path are 1 mana |
| 16 | Refute Destiny | 2 | NEW | NO | NO | NO | Green/blue targets only |
| 17 | Repurposed Enforcer | 2 | NEW | NO | NO | NO | Attack → Jace X (X = your creatures) is a draw engine, but a 3/2 Human must attack and live; COMBAT already sees a draw engine by T5 67% of games |
| 18 | Skrelv's Hive | 2 | REPRINT | NO | NO | NO | One Mite a turn; fodder was never the bottleneck (08-25); Mites miss lords/eminence. (Cute: order it before Anowon's edict and feed the Mite) |
| 19 | Staff of the Storyteller | 2 | REPRINT | SIDE | NO | SIDE | {W},{T}: draw, recharged by any creature-token creation (every Vampire cast) — ~1 card a round, wipe-proof, and its Spirit is Anowon food. Draw engine #3 behind Recollector / Mentor |
| 20 | Surgical Precision | 2 | NEW | NO | NO | NO | Toughness-4+ kill or draw 1 at sorcery speed |
| 21 | Teyo, Lightshield Expert | 2 | NEW | NO | NO | NO | One-target hexproof on a flash 1/1 Human; protection here is team-wide |
| 22 | Tomik, Orzhov Lawmage | 2 | NEW | NO | NO | NO | Planeswalker bodyguard + flying for countered creatures |
| 23 | Unflinching Hortimancer | 2 | NEW | NO | NO | NO | Lifegain grower 2/1; no engine text, off-tribe |
| 24 | White Sun's Twilight | 2 | REPRINT | NO | NO | NO | X≥5 destroys your own board |
| 25 | Danitha, Sword of Hope | 3 | NEW | NO | NO | NO | Draws off Equipment / spells targeting your creatures — 1–2 such cards per list |
| 26 | Flawless Maneuver | 3 | REPRINT | NO | NO | NO | Free only with Edgar on the battlefield; indestructible loses to −X/−X and exile; 07-31 grounds (phasing > conditional indestructible) hold |
| 27 | Generous Revival | 3 | NEW | NO | NO | NO | Battlefield recursion — no eminence (LEDGER 2026-08-25); Phyrexian Reclamation is the hand version |
| 28 | Germinate Recruits | 3 | NEW | NO | NO | SIDE | Instant: X 2/2 Cadets, X = life gained this turn. SACRIFICE gains 3–4 per death, so a late sac chain makes 10+ bodies (each a Purphoros/Bats trigger and a further death). Benched: fodder isn't the bottleneck and it's small early |
| 29 | Graft Surgeon | 3 | NEW | NO | NO | NO | Counter-mover Human 2/2 |
| 30 | Koth of the Homestead | 3 | NEW | NO | NO | NO | Landfall gain 1, Plains counters; off-plan |
| 31 | Lyra, Archangel of Dawn | 3 | NEW | NO | NO | NO | Pumps Angels only |
| 32 | Memory Trap | 3 | NEW | NO | NO | NO | Sorcery-speed O-ring; Generous Gift / Chaos Warp hold the catch-all seat at instant speed |
| 33 | Rescue Girl, First Responder | 3 | NEW | NO | NO | NO | Near-miss: bounce-and-recast Lawbringer / Malakir / Emeritus for repeat ETBs (+ eminence); value only with one of ~3 ETB targets out, on an off-tribe 1/3 |
| 34 | Shatterwing Pegasus | 3 | NEW | NO | NO | NO | Flier + {4}{W} team pump |
| 35 | Stroke of Midnight | 3 | REPRINT | SIDE | SIDE | SIDE | Generous Gift's seat, nonland only, but it hands over a 1/1 instead of a 3/3 that walls your tokens. Swap for Gift when the pod has no must-kill land |
| 36 | Teferi's Reproach | 3 | NEW | NO | NO | NO | Shields one opponent from everything — including your drains — until their turn |
| 37 | Way of the Mentor | 3 | NEW | SIDE | NO | SIDE | Jace 5 (−3: draw at once) + "whenever you gain life, a loyalty counter on each planeswalker": Jace −3 every turn, and Elspeth, Storm Slayer can −3 (kill MV3+) every turn. Draw engine #2 behind Recollector; COMBAT's draw is already fine |
| 38 | Yoshimaru, Beloved Companion | 3 | NEW | NO | NO | NO | +1 on each counter placement (Edgar's attack → +2 each), but a 2/2 Dog at MV3 dies to own Olivia's Wrath; counters are already dense |
| 39 | Your Fate Ends Here | 3 | NEW | NO | NO | NO | MV3+ targets only |
| 40 | Flickering Hound | 4 | NEW | NO | NO | NO | Near-miss: every creature spell blinks Lawbringer (a Vindicate), Malakir (a drain) or Emeritus (a tutor) — but a 2/2 Dog at MV4 that dies to Olivia's Wrath at X=2 and blanks without one of 3 targets (§2.5 blank) |
| 41 | Thalia, the Survivor | 4 | NEW | NO | NO | NO | Tax piece (flag: the pod removes hate pieces — a rating input, not the reason); off-tribe |
| 42 | Way of the Healer | 4 | NEW | NO | NO | NO | Jace 5 + a −2 Cadet ability; no loyalty engine behind it |
| 43 | Yuriko, Blade of the Mighty | 4 | NEW | NO | NO | NO | SELF-HIT: no non-mana abilities during combat switches off Viscera Seer, Yahenni, Bartolomé and Indulgent Aristocrat mid-combat (hate-piece flag) |
| 44 | Fateshaper Aspirant | 5 | NEW | NO | NO | NO | MV5 off-tribe legend recursion |
| 45 | Saheeli, Consul of Oversight | 5 | NEW | NO | NO | NO | MV5; one Thopter a turn off Seer's scry |
| 46 | Sunfall | 5 | REPRINT | NO | NO | NO | Exile wipe: no death triggers, takes your board |
| 47 | Dack Fayden, Helping Hand | 6 | NEW | NO | NO | NO | Hands your own creatures to each opponent |
| 48 | Elspeth, Sun's Champion | 6 | REPRINT | NO | NO | NO | Three Soldiers/turn is fodder (not the bottleneck); −3 kills your own power-4+ Vampires (Edgar, Vein Ripper, Emeritus, anthemed tokens); MV6 |
| 49 | Hexhaven Battalion | 6 | NEW | NO | NO | NO | MV6 for three Cadets |
| 50 | Kindred Judgment | 7 | NEW | NO | NO | NO | Naming Vampire it's a 7-mana Olivia's Wrath that loses to indestructible |
| 51 | Ob Nixilis, the Ascended | 7 | NEW | NO | NO | NO | Near-miss: kills opponents' tapped creatures and makes a 4/4 Angel at every end step you gained life (every turn here, doubled by Elspeth/Procession). Held at MV7 — Patron of the Vein already sits out on curve at MV6 |
| 52 | Overlord of the Mistmoors | 7 | REPRINT | NO | NO | NO | Impending 4: two 2/1 fliers now, a 6/6 later; off-tribe fodder |
| 53 | Serra's Emissary | 7 | REPRINT | NO | NO | NO | MV7 WWW; naming Creature makes the team unblockable, but Akroma's Will's flying/double strike covers the alpha at MV4 |
| 54 | Ghalta the Immovable | 9 | NEW | NO | NO | NO | Toughness-as-damage deck |
| 55 | Return to the Light Realms | 9 | REPRINT | NO | NO | NO | MV9 battlefield return (no eminence) |

### Black (#56–98)

| # | Name | MV | New? | Main | Comb | Sac | Reason |
|---|---|---|---|---|---|---|---|
| 56 | Dark Matter Manipulator | 1 | NEW | NO | NO | NO | Self-mill beater |
| 57 | Lich's Relic | 1 | NEW | SIDE | SIDE | **MAIN** | {B} + optional {2}: destroy up to one creature/PW **per opponent** — a one-sided 3-for-1. MAIN over Generous Gift in SACRIFICE; in MAIN/COMBAT that cut would leave 2 noncreature answers |
| 58 | Mabel, Bitter Recluse | 1 | NEW | NO | NO | NO | Removes counters; 1/1 deathtouch Mouse |
| 59 | Bloodline Recollector // Ancestral Craving | 2 | NEW | **MAIN** | SIDE | **MAIN** | Vampire 2-drop ({B} with Incubator); prepared at ANY end step after 3+ deaths → {B}: draw 3, lose 3. Self-enabled by free outlets (CR 700.4) |
| 60 | Dreadhorde Invasion | 2 | REPRINT | NO | NO | NO | One Army that grows; not fodder |
| 61 | Extrapolate the Impossible | 2 | NEW | NO | NO | NO | Blank in Commander — CR 903.11 (outside-the-game cards need an effect that specifically brings them into Commander games) |
| 62 | Gallia, Tragic Host | 2 | NEW | NO | NO | NO | Recursive Zombie; off-tribe |
| 63 | Last Gasp | 2 | REPRINT | NO | NO | NO | −3/−3 conditional; Swords/Path |
| 64 | Liliana the Repentant | 2 | NEW | NO | NO | NO | Mills 2 per creature entering — 4 per Vampire cast with eminence (deck-out risk); one exhaust reanimation |
| 65 | Multiply by Zero | 2 | NEW | NO | NO | NO | Base 0/0 — buffed or countered targets survive |
| 66 | Rank Rat | 2 | NEW | NO | NO | NO | Each opponent discards (Sangromancer +3 each) on an off-tribe 1/1 |
| 67 | Silence the Echo | 2 | NEW | NO | NO | NO | Sorcery Murder with sac-as-upside; Stir Up Trouble ({B}) already holds that bench seat (HOB) |
| 68 | Solve for Disappointment | 2 | NEW | NO | NO | NO | Discard + Jace 1 |
| 69 | Terminal Criticism | 2 | NEW | NO | NO | NO | Blue/red targets only |
| 70 | Vraska's Final Mercy | 2 | NEW | NO | NO | NO | Sorcery Murder for {B}{B} + 2 life, or Jace 6; removal seats here are instant or on bodies |
| 71 | Way of the Necromancer | 2 | NEW | NO | NO | NO | Jace 2 + a loyalty per death — Way of the Mentor does the same faster (gain events outnumber deaths 3–4 to 1 here) |
| 72 | Break Under Pressure | 3 | NEW | NO | NO | NO | Instant edict on the biggest creature/PW + gain 2 — good, but edicts are structural here (Anowon, Grave Pact, Dictate) |
| 73 | Cast Away Doubt | 3 | NEW | NO | NO | NO | Draw 2 at MV3, 2 damage to each player |
| 74 | Danitha, Spear of Agony | 3 | NEW | NO | NO | NO | Counter per spell targeting opponents |
| 75 | Gideon the Oathless | 3 | NEW | NO | NO | NO | Blood Seeker's job as damage on a warded 3/3 — but a Human (no eminence, Anowon, Olivia's); Blood Seeker does it on-tribe at MV2 |
| 76 | Loot, the Anomaly | 3 | NEW | NO | NO | NO | Threshold outlet on a −2/4 |
| 77 | Proft, Sinister Mastermind | 3 | NEW | NO | NO | NO | Threshold 5/5 |
| 78 | Sanctum Lurker | 3 | NEW | NO | NO | NO | PW +2 ping ability; off-tribe Horror |
| 79 | Screeching Soulbreaker | 3 | NEW | NO | NO | NO | Attack ping on a 1/4 Siren; Sanctum Seeker does it per Vampire |
| 80 | Theoretical Necromancer | 3 | NEW | NO | NO | NO | Vampire 4/1 ({B} with Incubator) that later returns a creature to hand for {3}{B}; no engine text in play |
| 81 | Tinybones, Pocket Nuisance | 3 | NEW | NO | NO | NO | Discard pinger; no discard theme |
| 82 | Way of the Deathbringer | 3 | NEW | NO | NO | NO | Jace 5 + a −2 sac → 4/4 Beast; one use per PW per turn, off-tribe Beast |
| 83 | Winter, Tormented Loner | 3 | NEW | NO | NO | NO | One-shot ETB sac → each opponent sacrifices; Lawbringer is the on-tribe version with targeted destroy |
| 84 | Darklight Phoenix | 4 | REPRINT | SIDE | NO | SIDE | The perfect Anowon feeder: sac it to Anowon's upkeep edict ("each player sacrifices" = 2+ deaths) and it returns at combat. Non-Vampire flier; COMBAT runs no Anowon |
| 85 | Extended Absence | 4 | NEW | NO | NO | NO | 4-mana instant exile |
| 86 | Rampart Hunter | 4 | NEW | NO | NO | NO | Deathtouch Horror, no engine |
| 87 | Rewrite Regrets | 4 | NEW | NO | NO | NO | Battlefield reanimation (no eminence) + Jace 2 |
| 88 | Teyo, Diamondblade Mage | 4 | NEW | NO | NO | NO | Flash 3/1 Human, one-shot deathtouch |
| 89 | Garruk, Veiled Butcher | 5 | NEW | NO | NO | NO | **TRAP** — "If a creature an opponent controls would die, exile it instead" switches off every opponent-death trigger (LEDGER 2026-08-09) |
| 90 | Massacre Girl, Most Wanted | 5 | NEW | NO | NO | NO | A 5th/6th per-death drain at MV5 on a Human (Anowon, Olivia's) |
| 91 | Rise of the Deathbringer | 5 | NEW | NO | NO | NO | Instant draw = greatest power (~5–7) for that much life, or −3/−3 to all (kills your tokens); MV5 |
| 92 | Yargle, Glutton of Urborg | 5 | REPRINT | NO | NO | NO | Vanilla 9/3 |
| 93 | Apex Witchstalker | 6 | NEW | NO | NO | NO | 6/4 menace + landcycling; no engine |
| 94 | Jhoira, Weatherlight Corsair | 6 | NEW | NO | NO | NO | Random historic steal on an MV6 Human |
| 95 | Overwrite the Multiverse | 6 | REPRINT | NO | NO | NO | Exile wipe: no death triggers |
| 96 | Archfiend of Despair | 8 | REPRINT | NO | NO | NO | MV8; Bloodletter already doubles on your turn |
| 97 | Archon of Cruelty | 8 | REPRINT | NO | NO | NO | MV8 |
| 98 | Avacyn, Angel of Horror | 8 | NEW | NO | NO | NO | MV8 BBB; returns only NONTOKEN creatures |

### Red (#99–140)

| # | Name | MV | New? | Main | Comb | Sac | Reason |
|---|---|---|---|---|---|---|---|
| 99 | Ajani's Anguish | 1 | NEW | NO | NO | NO | X burn + team trample; red X-sink; COMBAT's evasion is flying/menace/intimidate |
| 100 | Artifist Acumen | 1 | NEW | NO | NO | NO | Cantrip first strike; Stromkirk grants it permanently |
| 101 | Marwyn, the Clearcutter | 1 | NEW | NO | NO | NO | {2} sac artifact/land: draw; off-tribe Elf |
| 102 | Pompous Battlemage // Improvised Act | 1 | NEW | NO | NO | NO | Prowess 1/1 + rummage copy |
| 103 | Blazing Crescendo | 2 | REPRINT | NO | NO | NO | Pump + impulse draw |
| 104 | Eardrum Rattler | 2 | NEW | NO | NO | NO | Unblockable for power ≤2 — anthems push tokens out of range |
| 105 | Essence Burn | 2 | NEW | NO | NO | NO | Black/green targets only; exiles (no death trigger) |
| 106 | Gallia, the Merrymaker | 2 | NEW | NO | NO | NO | Haste for countered creatures on an off-tribe 2/1; Samut does it unconditionally |
| 107 | Master of Barbs | 2 | NEW | NO | NO | NO | Pumps only on noncombat DAMAGE — Purphoros and Warleader's Call are the only damage sources; blank without one of 2 cards (§2.5) |
| 108 | No Admittance | 2 | NEW | NO | NO | NO | Sorcery Shock + Jace 1 |
| 109 | Samut, Hazoret's Champion | 2 | NEW | NO | SIDE | NO | Team haste: every Vampire cast precombat is two more attackers this turn; off-tribe 2/2 that dies to Olivia's Wrath |
| 110 | Skilled Battlecarver | 2 | NEW | NO | NO | NO | Vanilla-ish Human |
| 111 | Stingcaster Mage | 2 | REPRINT | NO | NO | NO | Flashback an instant/sorcery — only Swords, Path, Dispute, Olivia's Wrath worth it; off-tribe Human |
| 112 | Tomik, Izzet Sparkmage | 2 | NEW | NO | NO | NO | +1 to noncombat damage; only Purphoros/Warleader's deal damage |
| 113 | Way of the Pyromancer | 2 | NEW | NO | NO | NO | Jace 2 + PW "+1: add {R}" |
| 114 | Chandra's Emberling | 3 | NEW | NO | NO | NO | Noncreature-spell grower |
| 115 | Command the Stage | 3 | NEW | NO | NO | NO | Cadet + recursion on noncombat damage |
| 116 | Cursed Mirror | 3 | REPRINT | NO | NO | NO | Rock / one-turn clone |
| 117 | Fulminous Forte | 3 | NEW | SIDE | SIDE | SIDE | Instant: 1 damage to each opposing creature/PW (wipes token swarms — every death feeds Blood Artist / Sangromancer / Cordial) or 5 to one. The pod has token decks |
| 118 | Identity Echo | 3 | NEW | NO | NO | NO | Exile-polymorph; exile is not a death |
| 119 | Koth, the Geomancer | 3 | NEW | NO | NO | NO | Landfall ping; Mountain mana (1 Mountain) |
| 120 | Pia, Determined Rebuilder | 3 | NEW | NO | NO | NO | Thopter + an expensive pump |
| 121 | Pyre Rhymer // Molten Tide | 3 | NEW | NO | NO | NO | Mountain ritual in a 1-Mountain deck |
| 122 | Way of the Warlord | 3 | NEW | NO | NO | NO | Jace 5 + a −4 split-damage ability |
| 123 | Wrath of the Bloodmane | 3 | NEW | NO | NO | NO | {1}{R} 4 damage with a legend out; Swords/Path cheaper and unconditional |
| 124 | Arni, Renowned Champion | 4 | NEW | NO | NO | NO | Self-pump on entries |
| 125 | Chandra, Torch of Defiance | 4 | REPRINT | NO | NO | NO | RR in a deck with 8 red pips; off-plan |
| 126 | Curse-Marred Demon | 4 | NEW | NO | NO | NO | RR; the random discard can hit the card it just tutored |
| 127 | Heartstring Puller | 4 | NEW | NO | NO | NO | 3/1 + a Cadet |
| 128 | Tetsuko Umezawa, Pursuer | 4 | NEW | NO | NO | NO | Double strike prowess; off-plan |
| 129 | Violent Echoes | 4 | NEW | NO | NO | NO | RR removal + Jace |
| 130 | Awaken the Inferno | 5 | NEW | NO | NO | NO | 5-mana sorcery removal / landcycling |
| 131 | Draconic Visitor | 5 | NEW | NO | NO | NO | Turns Tithe/Dispute/BMC Treasures into 5/5 Dragons but eats the ramp; RR MV5 off-tribe |
| 132 | Jiang Yanggu, Alone | 5 | NEW | NO | NO | NO | "Attacks a player alone" — go-wide never attacks alone |
| 133 | Tether Technician | 5 | NEW | NO | NO | NO | 4/5 + 2 damage |
| 134 | Winter, Team Player | 5 | NEW | NO | NO | NO | Noncreature-spell team pump |
| 135 | Ajani Unrelenting | 6 | NEW | NO | NO | NO | RR MV6; −3 hits your nontoken Vampires |
| 136 | Kiora of Fire and Ashes | 6 | NEW | NO | NO | NO | RR MV6 Dragon maker |
| 137 | Venser, Fervent Forger | 6 | NEW | NO | NO | NO | RR MV6 copy effects |
| 138 | Craterclaw Colossus | 7 | REPRINT | NO | NO | NO | RRR |
| 139 | Face Yourself | 7 | NEW | NO | NO | NO | RR MV7 |
| 140 | Akroma, Angel of Fury | 8 | REPRINT | NO | NO | NO | RRR MV8 |

### Multicolor (#141–162)

| # | Name | MV | New? | Main | Comb | Sac | Reason |
|---|---|---|---|---|---|---|---|
| 141 | Stingerquill Voxmancer // Vicious Verse | 1 | NEW | NO | NO | NO | A {B/R} 1-damage copy every upkeep — a mana sink on a 1/2 Goblin |
| 142 | Grim Repriser | 2 | NEW | NO | NO | NO | Recursion on noncombat damage; off-tribe |
| 143 | Rakdos Signet | 2 | REPRINT | NO | NO | NO | Cut 08-03 (1/8 field; ramp role) — grounds unchanged |
| 144 | Stingerquill Charm | 2 | NEW | NO | NO | NO | Modal 3 damage / deathtouch / Cadet |
| 145 | Stinging Vitriol | 2 | NEW | NO | NO | NO | 2 damage + discard sorcery |
| 146 | Talisman of Indulgence | 2 | REPRINT | NO | NO | NO | Cut 08-03 as a 9th pain source |
| 147 | Hallway Heckler // Vicious Verse | 3 | NEW | NO | NO | NO | Rummage Elemental + ping copy |
| 148 | Ingris Stingerquill | 3 | NEW | NO | SIDE | NO | Every attacker deals 1 to each opponent (a Sanctum Seeker for any creature, as damage — Bloodletter doubles) + {4}: Cadet and team haste; {B}{R}{R} against 18 red sources |
| 149 | Whiplash Wordsmith // Vicious Verse | 4 | NEW | NO | NO | NO | Vampire 3/3 ({1}{B/R} with Incubator); flying/haste only after its one ping; no repeat |
| 150 | Blessed Ghoul | 1 | NEW | NO | NO | NO | Recursive 1/1 lifelink Zombie — not a Vampire, so re-casting makes no token |
| 151 | Despark | 2 | REPRINT | NO | NO | NO | MV4+ targets only |
| 152 | Edgar, Ancient Bloodlord | 2 | NEW | **MAIN** | SIDE | **MAIN** | Vampire 2/3: gain 1 per other creature/PW of yours dying (a separate event each, fed to Vito / Blight-Priest / Bond / Patrician) + a {2} instant-speed outlet that grows it with menace. See the role tables |
| 153 | Lingering Souls | 3 | REPRINT | NO | NO | NO | Four off-tribe fliers over two casts; fodder isn't the bottleneck |
| 154 | Vindictive Triumph | 3 | NEW | NO | NO | NO | Instant exile; an MV≤3 victim comes back to you until end step (sacrifice it — the Captivating Vampire pattern). {W}{B}{B} for what Swords/Path do at {W} |
| 155 | Twisted Fates | 5 | NEW | NO | NO | NO | MV5 sorcery removal + team counters |
| 156 | Niv-Mizzet, Ghost Counsel | 6 | NEW | NO | NO | NO | Near-miss: every gain event → pay that much, draw that many (4+ cards per sacrificed Vampire here). MV6 WWBB off-tribe, and it lands after the turn-5 empty-hand point the pilot reported |
| 157 | Solitary Cell | 2 | NEW | NO | NO | NO | MV≤3 O-ring |
| 158 | Charge the Sanctum | 3 | NEW | NO | NO | NO | Team +2/+0 instant |
| 159 | Mabel, Valley Hero | 3 | NEW | NO | NO | NO | A counter per entering creature on an off-tribe 1/2 — the Cathars' Crusade grounds |
| 160 | Windcrag Siege | 3 | REPRINT | SIDE | **MAIN** | SIDE | Mardu mode: every attack trigger triggers twice (LEDGER 2026-09-24) — Edgar's counters, Sanctum Seeker, Shared Animosity, Mavren Fein, Conquistador, Clavileño. In SACRIFICE it doubles Infantry Shield's mobilize (a 3-card line) |
| 161 | Warrior's Blades | 4 | NEW | NO | NO | NO | ETB 3 damage + gain 3, then an Equipment |
| 162 | Tamiyo, Upriser Crowned | 6 | NEW | NO | NO | NO | MV6 monarch + double-strike flier; off-tribe |

### Colorless (#163–182)

| # | Name | MV | New? | Main | Comb | Sac | Reason |
|---|---|---|---|---|---|---|---|
| 163 | Currency Converter | 1 | REPRINT | NO | NO | NO | Discard synergy; none here |
| 164 | Eye of Jace | 1 | NEW | NO | NO | NO | Surveil + threshold ping |
| 165 | Sol Ring | 1 | REPRINT | NO | NO | NO | Already in all three lists |
| 166 | Afterthought Sentry | 2 | NEW | NO | NO | NO | 2/2 graveyard hate |
| 167 | Arcane Signet | 2 | REPRINT | NO | NO | NO | In MAIN and COMBAT; SACRIFICE cut it 08-25 (7 ramp pieces generous at its curve) |
| 168 | Fellwar Stone | 2 | REPRINT | NO | NO | NO | Cut 08-03 (opponent-dependent colours) |
| 169 | Karn, Argent Defender | 2 | NEW | NO | NO | NO | SELF-HIT: stops Purphoros, Warleader's Call, Blood Seeker, Charismatic Conqueror and every ETB (Malakir, Lawbringer, Zealot); hate-piece flag |
| 170 | Living Library | 2 | NEW | NO | NO | NO | {6} tuck |
| 171 | Medic's Kitesail | 2 | NEW | NO | NO | NO | Flying Equipment |
| 172 | The Echoverse Fulcrum | 2 | NEW | NO | NO | NO | Symmetric wipe |
| 173 | Chromatic Lantern | 3 | REPRINT | NO | NO | NO | Fixing the manabase already has |
| 174 | Keeper of the Quiet Hour | 3 | NEW | NO | NO | NO | 3/2 + Jace 2 |
| 175 | Murmuring Volume | 3 | NEW | NO | NO | NO | Rock + rummage |
| 176 | Traxos, Scourge Eternal | 4 | NEW | NO | NO | NO | 5/4 that untaps on artifact/creature casts |
| 177 | Archive Arbiter | 6 | NEW | NO | NO | NO | MV6 |
| 178 | Ginger, Queen of Sweets | 6 | NEW | NO | NO | NO | MV6 monarch |
| 179 | Omnath, Locus of the Void | 7 | NEW | NO | NO | NO | MV7 |
| 180 | Darksteel Angel | 9 | NEW | NO | NO | NO | MV9 |
| 181 | Emrakul, the Exigent Doom | 10 | REPRINT | NO | NO | NO | MV10 |
| 182 | Memnarch, the Warden | 10 | NEW | NO | NO | NO | MV10 |

### Lands (#183–206)

| # | Name | MV | New? | Main | Comb | Sac | Reason |
|---|---|---|---|---|---|---|---|
| 183 | Battlefield Forge | 0 | REPRINT | NO | NO | NO | Cut 08-03 as a 4th R/W land and a painland |
| 184 | Caves of Koilos | 0 | REPRINT | NO | NO | NO | Already in all three lists |
| 185 | Clifftop Retreat | 0 | REPRINT | NO | NO | NO | R/W for 8 red pips; Sacred Foundry, Spectator Seating, Sundown Pass already cover it |
| 186 | Command Tower | 0 | REPRINT | NO | NO | NO | Already in all three lists |
| 187 | Dedicated Commons | 0 | NEW | NO | NO | NO | Tapped unless you control a planeswalker — almost always here |
| 188 | Exotic Orchard | 0 | REPRINT | NO | NO | NO | Cut 08-03 (pod-dependent colours) |
| 189 | Fabled Passage | 0 | REPRINT | NO | NO | NO | 3–7 basics to find; tapped early |
| 190 | Fetid Heath | 0 | REPRINT | NO | NO | NO | W/B filter for BBB — marginal over the existing W/B duals |
| 191 | Hall of Echoes | 0 | NEW | NO | NO | NO | {5}: become a copy — no ETB (it doesn't enter) |
| 192 | Haunted Ridge | 0 | REPRINT | NO | NO | NO | B/R already five lands deep |
| 193 | Hexhaven Dueling Arena | 0 | NEW | SIDE | SIDE | SIDE | {4},{T}: re-prepare Emeritus (a tutor), Silvertongue (MAIN/COMBAT) or Recollector (if added) every turn — a late mana sink; a colourless utility land for a basic |
| 194 | Isolated Chapel | 0 | REPRINT | NO | NO | NO | Already in all three lists |
| 195 | Kher Keep | 0 | REPRINT | NO | NO | NO | A 0/1 per {1}{R}; fodder isn't the bottleneck |
| 196 | Meticulous Commons | 0 | NEW | NO | NO | NO | Tapped unless you control a planeswalker |
| 197 | Mountain | 0 | REPRINT | NO | NO | NO | Basic — a manabase call, not a set add |
| 198 | Path of Ancestry | 0 | REPRINT | NO | NO | NO | Already in all three lists |
| 199 | Plains | 0 | REPRINT | NO | NO | NO | Basic |
| 200 | Radiant Summit | 0 | REPRINT | NO | NO | NO | Tapped unless two basics (lists run 5–7) |
| 201 | Reflecting Pool | 0 | REPRINT | NO | NO | NO | Fixing already solved |
| 202 | Room of Refuge | 0 | NEW | NO | NO | NO | Tapped mono land |
| 203 | Stingerquill Annex | 0 | NEW | NO | NO | NO | Tapped unless you control a planeswalker |
| 204 | Sulfurous Springs | 0 | REPRINT | NO | NO | NO | Already in all three lists |
| 205 | Swamp | 0 | REPRINT | NO | NO | NO | Basic |
| 206 | Turbulent Crater | 0 | NEW | NO | NO | NO | Typed Swamp Mountain, tapped early; marginal over Blood Crypt / Dragonskull / Luxury Suite |

**Count: 206 classified (55 + 43 + 42 + 22 + 20 + 24).**

---

## Proposed swaps — SACRIFICE (the newest list)

Proposed in priority order; per the pilot's standing preference, one at a time. Curve figures are the
63 nonland cards outside the command zone, `{X}` counted at printed MV (Meathook 2, Morlun 2).

| Step | nonland MV ≤2 | MV ≤3 | MV ≥4 | avg MV | creatures |
|---|---|---|---|---|---|
| current | 24 | 43 | 20 | 2.89 | 36 |
| + S1 Recollector ← Malakir | 25 | 44 | 19 | 2.84 | 36 |
| + S2 Lich's Relic ← Generous Gift | 26 | 44 | 19 | 2.81 (Relic's real cost is 3) | 36 |
| + S3 Edgar AB ← Clavileño | 27 | 44 | 19 | 2.79 | 36 |

### S1 — [Bloodline Recollector](https://scryfall.com/search?q=%21%22Bloodline+Recollector%22) ← [Malakir Bloodwitch](https://scryfall.com/search?q=%21%22Malakir+Bloodwitch%22)

*"At the beginning of each end step, if three or more creatures died this turn, this creature
becomes prepared."* Prepare spell — Ancestral Craving {B} instant: *"Target player draws three cards
and loses 3 life."*

**What it does here.** Three deaths are something this list does on purpose — five free outlets
(Viscera Seer, Bartolomé, Yahenni, Ashnod's Altar, Phyrexian Altar) and every sacrifice is a death
(CR 700.4). It checks at **each** end step, not only yours, and Anowon's upkeep edict ("each player
sacrifices") alone usually produces three deaths on your turn. So: sac three things before an end
step → {B} → three cards. The condition is an intervening-if (CR 603.4): the deaths must happen
**before** the end step begins — on an opponent's turn, sacrifice when you get priority in their
second main phase. The 3 life comes back from the deaths that enabled it (Blood Artist, Cruel
Celebrant and Vengeful Bloodwitch are 3 life per death between them).

**Card-draw role, ranked against the current list (with the candidate):**

| # | Card | Cost here | Cards | Condition | Repeatable | Vampire |
|---|---|---|---|---|---|---|
| 1 | Skullclamp | {1}, equip {1} | 2 per clamped death | a body + an outlet | yes | — |
| 2 | **Bloodline Recollector** | {B} (Incubator), {B} per copy | **3 per copy**, −3 life | 3+ deaths before any end step | yes | yes |
| 3 | Crossway Troublemakers | {2}{B} with both reducers | 1 per Vampire death, 2 life | a Vampire dies | yes | yes |
| 4 | Black Market Connections | {2}{B} | 1/turn for 2 life (+ Treasure / 3/2 modes) | none | yes | — |
| 5 | Phyrexian Arena | {1}{B}{B} | 1/turn, 1 life | none | yes | — |
| 6 | Twilight Prophet | {B}{B} | 1/upkeep + drain X | city's blessing (10 permanents) | yes | yes |
| 7 | Deadly Dispute | {1}{B} | 2 + Treasure | a sacrifice | once | — |
| 8 | Village Rites | {B} | 2 | a sacrifice | once | — |
| 9 | Welcoming Vampire | {W} | ≤1/turn | a power-≤2 creature enters (eminence tokens are 3/3+ under Captivating + Charmed Groom + Banner; non-Vampire tokens and small nontoken casts still count) | yes | yes |
| 10 | Dusk Legion Zealot | {B} | 1 | none | once | yes |

**Why the cut is not from this table.** The list's complaint (2026-09-10) is card flow; cutting a
draw card to add one moves the count sideways. The cut comes from the Engine Bodies role, which is
where the list is deepest. Ranked against the current list, strongest first (pilot keeps marked):

| # | Engine body / multiplier | What it does now |
|---|---|---|
| 1 | Elspeth, Storm Slayer | Token doubler + tokens + MV3+ removal |
| 2 | Anointed Procession | Second doubler (09-10); survives wipes |
| 3 | Vito, Thorn of the Dusk Rose | Converter: each gain event → a target loses that much |
| 4 | Marauding Blight-Priest | Converter: each gain event → each opponent loses 1 |
| 5 | Bloodletter of Aclazotz | Doubles opponents' life loss on your turn |
| 6 | Purphoros, God of the Forge | 2 to each opponent per creature entering; indestructible |
| 7 | Roaming Throne | Doubles Vampire triggers |
| 8 | Emeritus of Woe | Repeatable tutor off 2 deaths |
| 9 | Mirkwood Bats | Token created or sacrificed → each opponent 1 |
| 10 | Infantry Shield | Mobilize fodder engine (09-03) |
| 11 | Cordial Vampire | Team counters per death |
| 12 | Bloodline Keeper | Instant-speed 2/2 flier each turn; flips into a lord |
| 13 | Elenda, the Dusk Rose | Grows per death, dies into X lifelink tokens |
| 14 | Creeping Bloodsucker | Upkeep gain event per opponent (09-14) |
| 15 | Carrier Thrall | A body that leaves a body |
| 16 | Morlun, Devourer of Spiders | X lifelink drain body (09-06) |
| 17 | Charismatic Conqueror | Punisher/token maker (08-25 pair with Blood Seeker) |
| 18 | Blood Seeker | **Pilot keep** (09-03, "hard counter to token decks") |
| 19 | Sangromancer | **Pilot keep** (09-10, "i like her") |
| 20 | Blade of the Bloodchief | **Pilot keep** (09-14) |
| 21 | Clavileño, First of the Blessed | Draw + a 4/3 flier — **only on turns you attack** |
| 22 | Malakir Bloodwitch | MV5 one-shot: each opponent loses life equal to your Vampires |

**Deciding axis (§2.3): card flow against one-shot reach.** Malakir is the only MV5 card in the role
and it fires once; Recollector is two mana cheaper (effectively {B}) and fires every turn the deck does
its job.

- **Cost-out (§1.2):** {1}{B} → Incubator takes the generic → **{B}**; Herald's Horn adds nothing
  further. The copy is {B} at full price — it is not a creature spell (LEDGER 2026-08-06).
- **Self-hits (§1.3):** none. Vampire (eminence token, lords, Anowon-safe, Olivia's Wrath-safe).
  Roaming Throne doubling its trigger adds nothing (CR 722.3a).
- **Curve:** MV ≤2 24 → 25, MV ≤3 43 → 44, avg 2.89 → 2.84; creature count unchanged. Repeatable draw
  engines 7 → 8: P(at least one by turn 5) **57% → 62.5%** on the play, 61% → 66% on the draw
  (hypergeometric, 99 cards).
- **What is lost:** Malakir's ETB is one gain event of N, which Vito turns into N off one opponent —
  a real kill line — and a 4/4 pro-white flier.
- **Alternative cut:** Welcoming Vampire (#9 above, weakest repeatable draw) — keeps Malakir's reach
  but moves draw count sideways. It was the pilot's own add (09-03, "both draw engines in"), which is
  why it is the alternative, not the proposal.
- **Combo check:** no loop. Every copy costs {B} and needs three fresh deaths.

### S2 — [Lich's Relic](https://scryfall.com/search?q=%21%22Lich%27s+Relic%22) ← [Generous Gift](https://scryfall.com/search?q=%21%22Generous+Gift%22)

*"When this Equipment enters, you may pay {2}. When you do, for each opponent, destroy up to one
target creature or planeswalker that player controls. Equipped creature gets +2/+1. Equip {2}"*

**What it does here.** Three mana, three targeted kills, one per opponent, none of yours (a reflexive
trigger, CR 603.12). Each dying opposing creature is a Blood Artist trigger, a Sangromancer +3, a
Cordial Vampire counter on every Vampire, an Elenda and Yahenni counter, a Blade counter. The
leftover Equipment is artifact fodder for Bartolomé and Deadly Dispute.

**Removal role, ranked against the current list (with the candidate):**

| # | Card | Cost | Speed | Hits | Downside |
|---|---|---|---|---|---|
| 1 | Swords to Plowshares | {W} | instant | 1 creature (exile) | they gain life (Tainted Remedy is MAIN-only) |
| 2 | Path to Exile | {W} | instant | 1 creature (exile) | they ramp a basic |
| 3 | **Lich's Relic** | {B} + {2} | sorcery | **up to 3 creatures/PWs**, one per opponent | none; leaves an Equipment |
| 4 | Chaos Warp | {2}{R} | instant | any permanent (tuck) | random replacement |
| 5 | Ruthless Lawbringer | {1}{W}{B} | sorcery (creature) | any nonland permanent | needs a sacrifice (upside here) |
| 6 | Generous Gift | {2}{W} | instant | any permanent | hands them a 3/3 that walls 1/1 tokens |

Context: Anowon, Grave Pact and Dictate are the edict layer; Olivia's Wrath and Meathook the sweepers.

**Deciding axis: cards removed per card.** Gift is one answer that gives back a blocker; Relic is up
to three with no downside.

- **Cost-out:** {B} + {2} optional = 3 mana, sorcery-speed (it's an artifact; no reducer applies).
  Printed MV 1, so the curve table understates it.
- **Self-hits:** none — every target is an opponent's.
- **What is lost:** instant speed, and coverage of artifacts, enchantments and lands. Noncreature
  answers go **4 → 3** (Chaos Warp, Lawbringer, Witch Enchanter). SACRIFICE is the only list with a
  4th, which is why this is MAIN here and SIDE in MAIN/COMBAT.
- **Alternative:** Relic ← Malakir if S1 goes to Welcoming instead. And
  [Stroke of Midnight](https://scryfall.com/search?q=%21%22Stroke+of+Midnight%22) (bench) is the
  better Gift if the pilot keeps a catch-all.

### S3 — [Edgar, Ancient Bloodlord](https://scryfall.com/search?q=%21%22Edgar%2C+Ancient+Bloodlord%22) ← [Clavileño, First of the Blessed](https://scryfall.com/search?q=%21%22Clavile%C3%B1o%2C+First+of+the+Blessed%22) — the pilot's ask

*"Whenever another creature or planeswalker you control dies, you gain 1 life. {2}, Sacrifice another
creature or planeswalker: Put a +1/+1 counter on Edgar. He gains menace until end of turn."*
{W}{B} 2/3 Legendary Vampire Noble.

**Rules first.** Different name from Edgar Markov and Edgar, Charmed Groom, so the legend rule
(CR 704.5j) never touches it. It's a Vampire spell, so it makes an eminence token. The dies trigger is
per creature ("whenever another creature … dies", CR 603.2c) — each death is its **own** gain event.

**Where it ranks — as a death payoff** (the five in the list, plus the candidate):

| # | Card | Per death of yours | Opponent loses | Needs |
|---|---|---|---|---|
| 1 | Cruel Celebrant | gain 1 | 1 each | — |
| 2 | Blood Artist | gain 1 | 1 to a target (any creature dying) | — |
| 3 | Vengeful Bloodwitch | gain 1 | 1 to a target | — |
| 4 | Kalastria Highborn | gain 2 | 2 to a target | {B} per Vampire death |
| 5 | Indulging Patrician | — | 3 each at end step | 3+ life gained that turn |
| 6 | **Edgar, Ancient Bloodlord** | gain 1 | **0 by itself** — 1 each via Blight-Priest, 1 to a target via Vito | a converter on board |

**— as a sacrifice outlet** (seven in the list, plus the candidate): Viscera Seer, Bartolomé,
Yahenni, Ashnod's Altar, Phyrexian Altar (free, unlimited) · Master of Dark Rites (tap, once) ·
Indulgent Aristocrat ({2}, team counters) · **Edgar AB ({2}, a counter on itself + menace)** — last,
tied with Aristocrat on cost.

**So it is last in both roles and it is in both roles at once**, on a cheap Vampire, and it fires on
every death without the list having to attack. With Blight-Priest out it is a second Cruel Celebrant;
with three deaths in a turn it alone switches on Patrician's end-step 3; and its life is the floor the
list pays Recollector, Arena, BMC and Crossway out of.

**The cut** comes from the bottom of the Engine Bodies table in S1: Clavileño (#21). **Deciding
axis: trigger availability** — Clavileño pays off only on turns you attack, in a list whose attacks
are mostly Edgar + Infantry Shield; Edgar AB pays off on every death.

- **Cost-out (§1.2):** {W}{B} has **no generic**, so Incubator and Horn give it nothing — it costs
  two coloured pips every time.
- **Self-hits:** none.
- **Curve:** MV3 → MV2 (MV ≤2 +1); creature count unchanged.
- **What is lost:** Clavileño's card + tapped 4/3 flying Vampire Demon each attack turn — real card
  flow on the turns Edgar swings.
- **Honest call: close.** If the pilot values Clavileño's draw more, bench Edgar AB — it is not
  better than any payoff or outlet on its own, only as the two stapled together. If S1 is declined,
  Malakir is the alternative slot.
- **Combo check:** its outlet costs {2} and makes no mana — no loop with either Altar.

---

## Proposed swaps — MAIN (the oldest list)

Standing action carried in `decisions.md` since 2026-08-06: *"a dedicated CHEAP-CARDS pass to move
MV ≤2 from 23 toward the field's 27+."* Both proposals move that number.

| Step | nonland MV ≤2 | MV ≤3 | MV ≥4 | avg MV | creatures |
|---|---|---|---|---|---|
| current | 24 | 43 | 20 | 2.92 | 36 |
| + M1 Recollector ← Malakir | 25 | 44 | 19 | 2.87 | 36 |
| + M2 Edgar AB ← Legion Lieutenant | 25 | 44 | 19 | 2.87 | 36 |

### M1 — Bloodline Recollector ← Malakir Bloodwitch

MAIN's outlets (Viscera Seer, Ashnod's Altar, Yahenni free; Indulgent Aristocrat; Master of Dark
Rites) make three deaths a turn routine. **The MV5+ tier, ranked against MAIN** (the curve role the
standing action targets):

| # | Card | What it does in MAIN |
|---|---|---|
| 1 | Olivia's Wrath | One-sided wipe (non-Vampires −X/−X) |
| 2 | Elspeth, Storm Slayer | Doubler + tokens + removal; survives own wipes |
| 3 | Anowon, the Ruin Sage | Recurring one-sided edict |
| 4 | Sanguine Bond | Converter (pilot vetoed its cut 08-06) |
| 5 | Vein Ripper | Double Blood Artist on a warded 6/5 flier |
| 6 | Dictate of Erebos | Flash edict engine |
| 7 | Malakir Bloodwitch | One-shot ETB drain |

**Deciding axis: curve + card flow over one-shot reach.** Same cost-out and self-hit notes as S1.
**Lost:** in MAIN, Malakir + Sanguine Bond + Vito turns one ETB into three hits — a stronger kill line
than in SACRIFICE. **Alternative cut:**
[Dusk Legion Duelist](https://scryfall.com/search?q=%21%22Dusk+Legion+Duelist%22) — re-derived, not
cited: the 08-06 watch note ("meaningfully worse now") is stale; in MAIN it still draws off Edgar's
attack trigger, Cordial Vampire, Indulgent Aristocrat, Vampire Socialite's entering counters, Elspeth's
0 and Blade, so it is ~1 card on most attack turns. Recollector beats it on rate, not because it is dead.

### M2 — Edgar, Ancient Bloodlord ← [Legion Lieutenant](https://scryfall.com/search?q=%21%22Legion+Lieutenant%22)

MAIN has three converters for Edgar AB's gain events (Vito, Marauding Blight-Priest, Sanguine Bond)
and Scheming Silvertongue's "gained 2 or more life this turn" prepare condition, which two deaths
now satisfy by themselves.

**MAIN's cheap Vampire bodies (MV ≤2 creatures), ranked against MAIN:**

| # | Card | Rider in this list |
|---|---|---|
| 1 | Viscera Seer | Free outlet (one of 3 free) |
| 2 | Blood Artist | Any death → drain |
| 3 | Cruel Celebrant | Your deaths → each opponent |
| 4 | Vengeful Bloodwitch | Your deaths → a target |
| 5 | Master of Dark Rites | Outlet + BBB ritual for Vampires |
| 6 | Cordial Vampire | Team counters per death |
| 7 | Indulgent Aristocrat | {2} outlet + team counters, lifelink |
| 8 | Scheming Silvertongue | Lifelink flier; draw 2 when prepared |
| 9 | Vampire Socialite | Menace; counters on entering Vampires |
| 10 | Charismatic Conqueror | Punisher tokens vs untapped entries |
| 11 | Dusk Legion Duelist | Draw on counters (live — see M1) |
| 12 | **Edgar, Ancient Bloodlord** | Gain event per death × 3 converters; {2} outlet; menace grower |
| 13 | Nullpriest of Oblivion | 2/1 lifelink menace; kicked (6 mana) battlefield reanimation |
| 14 | Knight of the Ebon Legion | 1-drop; {2}{B} pump; grows after a 4-life turn |
| 15 | Legion Lieutenant | +1/+1 other Vampires, no rider |

**Deciding axis: rider count.** Lieutenant is an anthem with nothing else printed; MAIN keeps
Captivating Vampire, Stromkirk Captain, Edgar Charmed Groom, Patchwork Banner and Warleader's Call
(anthem sources 6 → 5, plus Shared Animosity). The pilot made the same cut in SACRIFICE on 09-10.
LEDGER 2026-08-20 ("cut an anthem in the same package that multiplied its targets") does not bite:
this package adds no token multiplier. **Cost-out:** {W}{B} = {W}{B} (no generic). **Self-hits:**
none. **Alternatives:** Knight of the Ebon Legion, then Nullpriest.

---

## Proposed swap — COMBAT

### C1 — [Windcrag Siege](https://scryfall.com/search?q=%21%22Windcrag+Siege%22) (choose **Mardu**) ← [Preacher of the Schism](https://scryfall.com/search?q=%21%22Preacher+of+the+Schism%22)

*Mardu — "If a creature attacking causes a triggered ability of a permanent you control to trigger,
that ability triggers an additional time."* Verified 2026-09-24 for Caesar (LEDGER, attack-trigger
doublers): it covers "whenever [this] attacks" and "whenever you attack" wordings; two such effects
make 3 instances, not 4 (CR 603.2d); tokens put onto the battlefield attacking never "attacked"
(CR 508.4).

**Attack triggers in COMBAT that it doubles:** Edgar Markov (a +1/+1 counter on **each** Vampire →
two), Sanctum Seeker (each attacking Vampire drains each opponent 1 → 2), Shared Animosity (the
per-attacker pump twice), Mavren Fein (two lifelink tokens), Vicious Conquistador (2 each), Clavileño
(two Demons), Preacher (if kept). On an eight-Vampire swing, Sanctum Seeker alone goes from 8 to 16
off each opponent before blocks.

**Attack payoffs + combat multipliers, ranked against COMBAT (with the candidate):**

| # | Card | Rider |
|---|---|---|
| 1 | Shared Animosity | Quadratic attack pump |
| 2 | **Windcrag Siege** | Doubles every row marked † |
| 3 | Sanctum Seeker † | Per-Vampire attack drain |
| 4 | Elspeth, Storm Slayer | Doubler, counters, removal |
| 5 | Warleader's Call | Anthem + entry ping |
| 6 | Crossway Troublemakers | Deathtouch + lifelink attackers; draw per Vampire death |
| 7 | Drana, Liberator of Malakir | First-strike flier; counters on every attacker when she connects |
| 8 | Clavileño † | Draw + 4/3 flier per attack |
| 9 | Vampire Socialite | Counters on entering Vampires |
| 10 | Preacher of the Schism † | Token / draw on attack — **both conditional on life totals** |
| 11 | Blade of the Bloodchief | Already proposed out (for Anointed Procession, 09-10, pending) |

**Deciding axis: multiplier breadth** — one enchantment doubles six attack triggers already in the
list; Preacher is one attack trigger that checks life totals twice.

- **Cost-out:** {1}{R}{W}, noncreature — no reducer applies. Red pips 8 → 9 on 18 red sources.
- **Self-hits:** none (it only multiplies your own triggers).
- **What is lost:** a deathtouch body and one of COMBAT's 9 repeatable draw engines — P(one by turn 5)
  67% → 62.5% on the play. COMBAT's draw was measured as not the problem (09-10).
- **Alternative cut:** Vampire of the Dire Moon (no engine text; MV1 → MV3 raises avg MV).
- **Untouched:** the three COMBAT swaps proposed 2026-09-10 (Zealot ← Cutthroat, Infantry Shield ←
  Nocturnus, Procession ← Blade) are still the pilot's call. If Infantry Shield goes in, Siege doubles
  its mobilize too.

### Edgar, Ancient Bloodlord in COMBAT — SIDE (the pilot's ask, answered)

**COMBAT's Cheap Bodies (10), ranked against COMBAT, with the candidate:** Viscera Seer (only free
outlet besides Yahenni) · Blood Artist · Cruel Celebrant · Cordial Vampire · Indulgent Aristocrat ·
Blood Seeker (pilot keep) · Vicious Conquistador (attack drain; Siege doubles it) · Knight of the
Ebon Legion · **Edgar, Ancient Bloodlord** · Vampire of the Dire Moon · Vampire Cutthroat (already
proposed out for Dusk Legion Zealot).

It ranks ninth. COMBAT has **one** converter for its gain events (Vito) plus Silvertongue's prepare
check, and two free outlets; its {2} outlet is a way to cash a blocked token for a counter and
menace, which is fine but not a plan. The only open cheap-body slot is Cutthroat's, and Zealot
(replaces itself) and Bloodline Recollector are stronger claimants for it. **Bench it; revisit if
COMBAT ever adds Blight-Priest or Sanguine Bond.**

---

## Bench (SIDE) — with what each would displace

| Card | Lists | Displaces if brought in | Grounds |
|---|---|---|---|
| Way of the Mentor | Main, Sac | Welcoming Vampire (Sac) / Dusk Legion Duelist (Main) | Jace 5 now; every gain event = loyalty on Jace **and** Elspeth → a card a turn and an Elspeth −3 kill a turn. Draw engine #2 behind Recollector |
| Staff of the Storyteller | Main, Sac | Same seats as Mentor | {W}: draw, recharged by any creature-token creation; wipe-proof; Spirit feeds Anowon |
| Stroke of Midnight | all | Generous Gift | Same catch-all minus lands; the opponent gets a 1/1, not a 3/3 |
| Lich's Relic | Main, Comb | Generous Gift | S2's grounds, but MAIN/COMBAT would drop to 2 noncreature answers — take only if the pod's artifacts/enchantments are harmless |
| Fulminous Forte | all | Generous Gift or Chaos Warp vs token pods | Instant one-sided ping wipe; every token death is a Blood Artist / Sangromancer / Cordial trigger |
| Hexhaven Dueling Arena | all | A basic (keeps the land count; the pilot has ruled out land cuts) | {4},{T}: re-prepare Emeritus (tutor) / Silvertongue / Recollector every turn; late mana sink |
| Darklight Phoenix | Main, Sac | Carrier Thrall (Sac) / Knight of the Ebon Legion (Main) | Feed it to Anowon's upkeep edict instead of a real creature; "each player sacrifices" makes 2+ deaths, so it returns at combat — one recurring body a turn |
| Windcrag Siege | Main, Sac | Nullpriest of Oblivion (Main) / Clavileño if S3 is declined (Sac) | MAIN attacks enough to double Edgar, Sanctum Seeker and Shared Animosity. In SACRIFICE it doubles Infantry Shield's mobilize (LEDGER 2026-09-24: doubled mobilize is a death engine) — a 3-card line |
| Germinate Recruits | Sac | Carrier Thrall (the fodder seat) vs slow pods | Instant X Cadets off the turn's life gain; a late sac chain makes 10+ |
| Bloodline Recollector | Comb | Vampire Cutthroat (pending) | Three deaths in combat come from blocked tokens; rate over Zealot's reliability |
| Ingris Stingerquill | Comb | Preacher's seat if C1 is declined | Every attacker pings each opponent; {4} team haste; {B}{R}{R} |
| Samut, Hazoret's Champion | Comb | Vampire of the Dire Moon | Team haste turns every precombat Vampire cast into two attackers |
| Ajani Resolute | Comb | Door of Destinies | Permanent +2/+2 emblem in ~2 swings; fragile at 2 loyalty |
| Edgar, Ancient Bloodlord | Comb | Vampire Cutthroat (pending) | See above |

## Near-misses (good card, not for these lists)

- **Niv-Mizzet, Ghost Counsel** — the strongest late card-flow engine in the pool for SACRIFICE (every
  gain event → that many cards), held on MV6 WWBB, off-tribe, and arriving after the turn-5 empty hand.
- **Ob Nixilis, the Ascended** — a 4/4 Angel at every end step you gained life; held at MV7.
- **Flickering Hound / Rescue Girl, First Responder** — ETB-reuse engines that break open with
  Lawbringer, Malakir or Emeritus (Rescue Girl + Lich's Relic would be three kills a turn), but both
  are fragile off-tribe bodies that blank without a target.
- **Enlightened Confidant** — a real card a turn here, on the wrong body.
- **Break Under Pressure / Vindictive Triumph** — good instant removal, not better than the seats.

## Traps

- **Garruk, Veiled Butcher** — die→exile for opponents' creatures: switches off Blood Artist's
  opponent side, Sangromancer, Vein Ripper, Cordial, Yahenni, Elenda, Blade and Meathook.
- **Karn, Argent Defender** — "artifacts and creatures entering don't cause abilities to trigger":
  kills Purphoros, Warleader's Call, Blood Seeker, Charismatic Conqueror and every ETB in the list.
- **Yuriko, Blade of the Mighty** — no non-mana activations during combat: your own Seer, Yahenni,
  Bartolomé and Aristocrat go dark in the step you most need them.
- **Kindred Judgment** — reads as a one-sided wrath; it is a 7-mana Olivia's Wrath that loses to
  indestructible.
- **Elspeth, Sun's Champion** — −3 kills your own Edgar, Vein Ripper, Emeritus and anthemed tokens.
- **Liliana the Repentant** — mills 4 per Vampire cast (eminence); a real deck-out clock.
- **Master of Barbs / Tomik, Izzet Sparkmage** — keyed to *damage*; this deck's pings are life *loss*
  except Purphoros and Warleader's Call.
- **Teferi's Reproach** — its "protection from everything, life can't change" shields the opponent
  from your drains.
- **Extrapolate the Impossible** — does nothing in Commander (CR 903.11).

## Open rules questions

- **Empower Jace is not in the local Comprehensive Rules** (2026-08-07 file predates FRA). Evaluated
  from reminder text + the verified token definition. Re-check the two consequences used above — the
  doubled 0-loyalty Jace dying as "a planeswalker you control dies", and Way of the Mentor adding
  loyalty to Elspeth — once `mtg-rules-update` pulls the FRA-era rules.

---

## Follow-up after the pilot's first pass (2026-09-28)

**Pilot's rulings this pass:** `main` is ignored from now on; the two live decks are `sacrifice` (drain)
and `combat` (aggro). Windcrag Siege ← Preacher of the Schism is **applied** to `combat`. Protected, so
not cut candidates: **Malakir Bloodwitch** ("she is a finisher"), **Clavileño** (stays even for Edgar AB),
**Generous Gift** ("permanent destruction" can't be traded for creature-only removal). Standing keeps
from the log: Blood Seeker, Sangromancer, Blade of the Bloodchief, Charismatic Conqueror, Akroma's Will,
Swords, Path, Chaos Warp; sac outlets excluded from cuts (09-14). Lists read from fresh `deck:show`
snapshots; curve = 63 nonland cards outside the command zone, `{X}` at printed MV.

### SACRIFICE — one ranking for all three adds

**Unprotected creature / engine bodies, weakest first, scored against the current list:**

| # | Card | Real cost here | What it does for *this* list's plan (drain + card flow) |
|---|---|---|---|
| 1 | Carrier Thrall | {B} (Incubator) | Fodder: two deaths per card (2/1, then a Scion). No cards, no drain by itself. Its Scion is one of Anowon's non-Vampire feeds |
| 2 | Cordial Vampire | {B}{B} | Team +1/+1 counter per death — the combat axis only; no cards, no drain |
| 3 | Dusk Legion Zealot | {B} | One card, once (the pilot's 09-10 out-of-gas add) |
| 4 | Welcoming Vampire | {W} | ≤1 card/turn when a power-≤2 creature enters; blind to eminence tokens once both lords are out (Captivating + Charmed Groom make them 3/3) |
| 5 | Morlun, Devourer of Spiders | {X}{B}{B} | Scalable X lifelink drain + body (09-06 add) |
| 6 | **Emeritus of Woe** | {1}{B} | Enters prepared (a tutor), re-prepares at *your* end step after 2 deaths — the list's only tutor |
| 7 | Creeping Bloodsucker | {B} | Upkeep gain event per opponent, feeds all three converters (09-14 add) |
| 8+ | Elenda, Bloodline Keeper, Mirkwood Bats, Infantry Shield, Roaming Throne, Purphoros, Bloodletter, Blight-Priest, Vito, Anointed Procession, Elspeth | — | Engines; not candidates |

**Emeritus ranks 6th weakest — five bodies do less for this plan.** It is the only card that turns
deaths into *selection* (Grave Pact, Procession, Skullclamp on demand), so it is not the first cut.

**S1′ — Bloodline Recollector ← Carrier Thrall.** Deciding axis: **card flow per slot** at identical
cost, type and curve (MV2 Vampire for MV2 Vampire, eminence token either way). Thrall's only job — extra
bodies to die — is done by eminence tokens and five free outlets; Recollector turns three of those deaths
into three cards for {B}. Carrier Thrall was "kept, re-derived" in the 09-10 pass as fodder; that ground
still holds, it just loses to a card that converts the same fodder into cards. Curve: MV≤2 24 → 24,
MV≤3 43 → 43, avg 2.889 → 2.889. **Runner-up: Dusk Legion Zealot** (same curve; Recollector strictly
out-draws it once online, but Zealot's one card is unconditional and early — pick Zealot as the cut if
Anowon stays, since Anowon needs Thrall's Scion as non-Vampire fodder).

**S3′ — Edgar, Ancient Bloodlord ← Cordial Vampire.** Deciding axis: **which axis the death trigger
feeds.** Both are MV2 Vampires that trigger on deaths; Cordial feeds the combat axis (counters), Edgar AB
the drain axis (a gain event per own death).

*Lifegain quantified:* the list runs **3 converters** — Vito (each gain event → a target loses that
much), Marauding Blight-Priest (each gain event → each opponent loses 1), Indulging Patrician (end step:
gained 3+ → each opponent loses 3; Edgar AB alone gets there after 3 deaths). With Vito + Blight-Priest
out, every death through Edgar AB is **+4 life lost across the table** on top of the existing drains.
But it is only a drain card when a converter is out: P(≥1 of the 3 by turn 6) ≈ **32%** (hypergeometric,
12 cards seen of 99), ≈37% by turn 8. The rest of the time its value is the life itself, which this list
spends: Recollector's copy (3), Phyrexian Arena (1/turn), BMC (1–3/turn), Crossway (2 per card),
Phyrexian Reclamation (2). **Cost named:** Cordial's counters are what makes a sacrifice board big
enough to swing for the kill — the combat axis the pilot keeps live in drain decks. Curve unchanged
(24 / 43 / 2.889). **Runner-up: Welcoming Vampire** (MV3 → MV2: MV≤2 24 → 25, avg 2.873; keeps Cordial
but trims card flow — the pilot's own 09-03 add).

**Creature-only interaction in SACRIFICE (the only legal pool for Lich's Relic's slot), strongest first:**

| # | Card | Cost | Hits | Notes |
|---|---|---|---|---|
| 1 | Swords to Plowshares | {W} | 1 creature, exile, instant | pilot-defended 08-25 |
| 2 | Path to Exile | {W} | 1 creature, exile, instant | pilot-defended 08-25 |
| 3 | Olivia's Wrath | {4}{B} | every non-Vampire, one-sided | the list's one-sided wipe |
| 4 | Grave Pact | {1}{B}{B}{B} | edict per own death | first copy |
| 5 | The Meathook Massacre | {X}{B}{B} | -X/-X sweep + drain | a payoff first |
| 6 | Anowon, the Ruin Sage | {1}{B}{B} (Incubator) | each player sacs a non-Vampire each upkeep | self-hit: Mirkwood Bats, Witch Enchanter, Scions, Elspeth Soldiers |
| 7 | Dictate of Erebos | {3}{B}{B} flat | edict per own death (flash) | stacks with Grave Pact; no reducer applies |
| — | **Lich's Relic** | {B} + {2} | up to 1 creature/PW **per opponent**, targeted, sorcery | leaves a +2/+1 Equipment |

Noncreature answers stay at **4** (Generous Gift, Chaos Warp, Ruthless Lawbringer, Witch Enchanter)
whichever row goes.

**S2′ — Lich's Relic ← Anowon, the Ruin Sage.** Deciding axis: **targeted vs edict.** The list has three
edict engines (Anowon, Grave Pact, Dictate), where the opponent picks the victim, and Relic trades one for
three kills *you* choose — their commander, a lifelinker, a blocker. It also removes Anowon's self-hit
(§1.3). **Cost named:** Anowon was added (decisions, Phase 2) as the list's only *unconditional* recurring
interaction; Grave Pact and Dictate need your creature to die first (easy here, never zero). Creature
count 36 → 35, Vampires −1 (Olivia's Wrath X −1). Curve: MV≤2 24 → 25, MV≤3 43 → 44, avg 2.889 → 2.825
(Relic printed MV1; it really costs 3). **Runner-up: Dictate of Erebos** — same curve; keeps Anowon's
unconditional edict but loses the second Grave Pact stack. Note the pilot chose Grave Pact **and** Dictate
for Caesar and Ghave (2026-09-24), which is why Dictate is the runner-up here rather than the proposal.

**All three together (Thrall, Cordial, Anowon out):** MV≤2 24 → 25, MV≤3 43 → 44, avg 2.889 → 2.825;
creatures 36 → 35; repeatable draw engines 7 → 8. No loops added (Edgar AB's outlet costs {2} and makes
no mana; Relic's trigger is one-shot).

### COMBAT — Bloodline Recollector, honestly

**Is "3+ creatures died this turn" met in an aggro list?** Partly. Any creature counts, opponents'
included. Sources in COMBAT:
- **On demand:** only Viscera Seer and Yahenni are free outlets, plus Indulgent Aristocrat at {2} each,
  Deadly Dispute (one) and Sorin's +1 (one Vampire). P(Seer or Yahenni by turn 5 on the play) ≈ **21%**,
  ≈30% counting Aristocrat.
- **From combat:** chump blocks, and blockers dying to first strike (Edgar, Stromkirk Captain) or
  deathtouch (Crossway Troublemakers, Nighthawk, Dire Moon), plus Olivia's Wrath.

**Estimate:** met on roughly every other attack turn from about turn 5, rarely on opponents' turns.
**Verdict:** it works here, but at about one draw-three per two of your turns, not every turn like in
SACRIFICE. It's a weaker fit. COMBAT's card flow was measured as not its problem (09-10: 9 repeatable
engines; 8 after Preacher left today).

**Cheap bodies and draw in COMBAT, weakest first (candidates only):**

| # | Card | Rider |
|---|---|---|
| 1 | Vampire of the Dire Moon | 1/1 deathtouch lifelink; no engine text. Its only extra is a turn-1 eminence token |
| 2 | Vampire Cutthroat | 1/1 skulk lifelink; no engine text. **Earmarked** for the pending 09-10 Zealot swap |
| 3 | Knight of the Ebon Legion | Mana-sink pump; grows at end step after 4+ life lost |
| 4 | **Emeritus of Woe** | Tutor; re-prepares on only **2** deaths at your end step, an easier bar than Recollector's 3 |
| 5+ | Vicious Conquistador (Siege doubles it now), Shadow Alley Denizen (evasion is thin at 3), Blood Seeker (keep) | — |

**C2 — Bloodline Recollector ← Vampire of the Dire Moon** (if the pilot still wants it here). Deciding
axis: card flow over a vanilla 1-drop. Curve: MV≤2 23 → 23, MV≤3 46 → 46, avg 2.825 → 2.841.
**Runner-up:** Vampire Cutthroat, if the 09-10 Zealot swap is dropped; Knight of the Ebon Legion after
that. **Emeritus ranks 4th** and is the better deaths-to-value card in COMBAT (a 2-death bar), so don't
cut it for Recollector here.

### Lich's Relic in COMBAT — SIDE, no swap

COMBAT's creature-only answers are Swords, Path and Olivia's Wrath (its only sweeper). Those are its
three best interaction cards, so none can go without weakening removal. Take Relic only as an extra
interaction slot (removal 5 → 6) out of a body, for example the Cutthroat/Dire Moon seat that isn't used
above.
