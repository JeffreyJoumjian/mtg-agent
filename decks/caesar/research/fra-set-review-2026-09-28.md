# FRA + FRC (Reality Fracture + Reality Fracture Commander) set review — Caesar — 2026-09-28

**Method:** deck-brain SKILL.md, set-sweep pattern (LEDGER 2026-08-09). Every card was read from
the verified Scryfall oracle text in the pre-built pool (`data/fra-candidates-caesar.json` +
`data/frc-candidates-caesar.json`), never from memory. In-deck comparison cards were read from the
card cache for the current `main` list. Each candidate was costed in this deck's mana (§1.2), checked
against the deck's own board **and its triggers** (§1.3), and classified. Every MAIN gets a §2.1
role table with the candidate scored against **every** card currently in that role.

**Pool:** 206 cards fit {R}{W}{B} identity and are commander-legal — FRA 151 + FRC 55. 18 are
already in the 100 (FRC/FRA reprints of Path, Swords, Secure the Wastes, Flawless Maneuver, Sol
Ring, Arcane Signet, Talisman of Indulgence, Lingering Souls, Windcrag Siege, six lands and the three
basics). **Zero Game Changers in either set**, so no bracket pressure.

**Field lens:** unavailable. EDHREC has no FRA/FRC data yet (release 2026-10-02), so SKILL §2.2's
second instrument is skipped rather than guessed.

**Result: 4 MAIN, 14 SIDE, 18 already IN, 170 NO.**

Verdict key: **MAIN** = would displace a named card in the 100 · **SIDE** = bench-worthy, displaced
card named · **IN** = already in the 100 · **NO** = pass.

Nothing here is applied. Per the pilot's rule, each MAIN is a separate proposal to discuss.

---

## Set mechanics as they matter to this deck

- **Empower Jace N** (≈20 cards). It creates a blue **Jace planeswalker token** (non-creature, not
  legendary) with "−1: Surveil 1" / "−3: Draw a card", then puts N loyalty on it. However much loyalty
  it gets, **a planeswalker activates one loyalty ability per turn** (CR 606.3), so a Jace token is at
  most **one card a turn**. That caps every "Way of the …" enchantment and every empower creature at
  the rate Idol of Oblivion, Tocasia's Welcome and Morbid Opportunist already give. It is a token, so
  Anointed Procession / Mondrak / Elspeth make **two** — one gets the loyalty, the other has 0 and dies
  to CR 704.5i (which Cruel Celebrant counts: "creature **or planeswalker** you control dies").
- **Prepare** (CR 722). Casting the prepared copy is a normal cast at full cost; the copy is only the
  inset spell (LEDGER 2026-08-06). Only one prepare card matters here: **Bloodline Recollector**.
- **Cadet** tokens are 2/2 — they don't die to Skullclamp, so Cadet makers are fodder, not draw.
- **Surveil / threshold / "seven cards in your graveyard"** (Eye of Jace, Loot, Proft, Dark Matter
  Manipulator). Tokens never reach the graveyard as cards, so this deck turns threshold on late or never.
- **Die → exile replacements.** Garruk, Veiled Butcher is the set's trap (see Traps). Essence Burn's
  "exile it instead" applies only to its own target — harmless.
- **"Whenever a creature you control attacks"** (Ingris) counts **declared** attackers only: an ability
  like that "won't trigger if a creature is put onto the battlefield attacking" (CR 508.3a). Caesar's,
  Adeline's, Hero's, Anim Pakal's and mobilize's tokens don't trigger it the turn they're made — they
  do from the next turn on, when they are declared. Isshin and Windcrag Siege double it (LEDGER
  2026-09-24).

---

## Classification table — all 206 cards

### White

| # | Name | MV | Set | New? | Verdict | Reason |
|---|---|---|---|---|---|---|
| 1 | Guiding Hydra | 1 | FRA | NEW | NO | Its combat trigger spreads +1/+1 counters onto every token — permanent toughness 2 switches Skullclamp off (LEDGER 2026-09-22) for an X-costed 1/0 with no drain hook |
| 2 | Liliana the Faultless | 1 | FRA | NEW | **SIDE** | "{1}, {T}, Discard a card: another target creature … gains hexproof" is a second repeatable Caesar protector (stops Swords/Path, which indestructible can't); costs a card per use. Its enter-lifegain duplicates Elas |
| 3 | Loyal Tutor | 1 | FRA | NEW | NO | Planeswalker-only tutor; one planeswalker in the 99 |
| 4 | Path to Exile | 1 | FRC | REPRINT | IN | Already in the 100 (FRC reprint) |
| 5 | Secure the Wastes | 1 | FRC | REPRINT | IN | Already in the 100 (FRC reprint) |
| 6 | Swords to Plowshares | 1 | FRC | REPRINT | IN | Already in the 100 (FRC reprint) |
| 7 | Academic Ascent | 2 | FRA | NEW | NO | One-shot +2/+2 flying trick; the Jace token it makes converts to at most one card a turn (CR 606.3) |
| 8 | Ajani Resolute | 2 | FRA | NEW | NO | Gains loyalty per lifegain event (plentiful here), but pays out only a −4 Pridemate and a −10 +2/+2 emblem (an anthem — Skullclamp cost); no engine |
| 9 | Campus Crier | 2 | FRA | NEW | NO | 3/1 vanilla with a graveyard empower |
| 10 | Enlightened Confidant | 2 | FRA | REPRINT | NO | End-step surveil/regrowth on a 2/1 lifelinker; no token or drain hook |
| 11 | Gideon's Memorial | 2 | FRA | NEW | NO | Tokens +1/+0 and vigilance is Skullclamp-safe but combat-only; its mana is planeswalker-only (one in the 99). Warleader's Call is the combat buff that also drains |
| 12 | Grand Crescendo | 2 | FRC | REPRINT | **SIDE** | "Create X 1/1 … Citizen tokens. Creatures you control gain indestructible" at instant speed — a Secure the Wastes that also answers a destroy-wipe, one token fewer at equal mana |
| 13 | Martial Coup | 2 | FRC | REPRINT | NO | Founding grounds re-checked and still hold: the wipe half needs X≥5 (7 mana) and kills Caesar; Secure the Wastes does the token half at instant speed |
| 14 | Predictive Preparations | 2 | FRA | NEW | NO | Counters on one or two creatures (Skullclamp cost), no engine |
| 15 | Prophesied End | 2 | FRA | NEW | **SIDE** | {1}{W} instant "Destroy target creature" — no drawback when aimed at an attacker; hits the multicolour threats Vanishing Verse can't. Loses to indestructible |
| 16 | Refute Destiny | 2 | FRA | NEW | NO | Green/blue targets only |
| 17 | Repurposed Enforcer | 2 | FRA | NEW | NO | Attack trigger empowers Jace by creature count, but a Jace token draws at most one card a turn (CR 606.3) and the 3/2 must be declared attacking |
| 18 | Skrelv's Hive | 2 | FRC | REPRINT | **SIDE** | {1}{W} enchantment: a 1/1 every upkeep for 1 life — a white Bitterblossom, death-independent. The Mite can't block and is an artifact token (Draconic Visitor makes it a Dragon) |
| 19 | Staff of the Storyteller | 2 | FRC | REPRINT | **SIDE** | 1/1 flyer on entry + a story counter per token event; {W},{T}: draw. A 1/turn draw engine that banks counters — substitute for Idol of Oblivion / Tocasia's Welcome |
| 20 | Surgical Precision | 2 | FRA | NEW | NO | Sorcery; toughness-4+ removal or draw 1/gain 2 |
| 21 | Teyo, Lightshield Expert | 2 | FRA | NEW | NO | One-shot flash hexproof + counter on a 1/1; Deflecting Swat does it free and Liliana the Faultless repeats it |
| 22 | Tomik, Orzhov Lawmage | 2 | FRA | NEW | NO | Planeswalker defence and flying for countered creatures; no fit |
| 23 | Unflinching Hortimancer | 2 | FRA | NEW | NO | Lifegain grower 2/1; no token or drain output |
| 24 | White Sun's Twilight | 2 | FRC | REPRINT | NO | X life is ONE gain event (LEDGER 2026-09-25); Mites can't block; the wipe needs X≥5 and kills Caesar |
| 25 | Danitha, Sword of Hope | 3 | FRA | NEW | NO | Draws once a turn off Equipment casts or spells targeting our creatures — three Equipment in the 99 |
| 26 | Flawless Maneuver | 3 | FRC | REPRINT | IN | Already in the 100 (FRC reprint) |
| 27 | Generous Revival | 3 | FRA | NEW | NO | Reanimates an MV≤3 creature card; tokens are never cards in the graveyard; slow |
| 28 | Germinate Recruits | 3 | FRA | NEW | **SIDE** | Instant: X 2/2 Cadets where X = life gained this turn. A mid-game sacrifice turn with 2–3 life-gaining drainers out gains 6–15 → 6–15 Cadets for 3 mana; weak before the drainers land. Cadets are 2/2 (no Skullclamp kill) |
| 29 | Graft Surgeon | 3 | FRA | NEW | NO | Counters (Skullclamp cost) on a vanilla body |
| 30 | Koth of the Homestead | 3 | FRA | NEW | NO | Landfall lifegain and counters; no token/drain output |
| 31 | Lyra, Archangel of Dawn | 3 | FRA | NEW | NO | Pumps Angels only — at most Court of Grace's 4/4s |
| 32 | Memory Trap | 3 | FRA | NEW | NO | 3-mana sorcery-speed O-Ring; every in-deck answer is an instant |
| 33 | Rescue Girl, First Responder | 3 | FRA | NEW | NO | "Activate only during your turn" — cannot save Caesar from removal on an opponent's turn |
| 34 | Shatterwing Pegasus | 3 | FRA | NEW | NO | {4}{W} team pump on a 2/3 flyer |
| 35 | Stroke of Midnight | 3 | FRC | REPRINT | **SIDE** | Instant "Destroy target nonland permanent" for 3; the 1/1 it hands over is minor. Covers multicolour where Vanishing Verse can't |
| 36 | Teferi's Reproach | 3 | FRC | NEW | NO | Phases out one opponent's board until their turn — a tempo/fog tool with no plan fit |
| 37 | Way of the Mentor | 3 | FRA | NEW | NO | Jace 5 plus a loyalty counter per lifegain event, but a Jace token converts to ≤1 card a turn (CR 606.3) — 3 mana for a trickle Idol already provides |
| 38 | Yoshimaru, Beloved Companion | 3 | FRA | NEW | NO | +1/+1-counter amplifier; the deck has no counter theme |
| 39 | Your Fate Ends Here | 3 | FRA | NEW | NO | MV≥3 targets only; the in-deck answers hit wider |
| 40 | Flickering Hound | 4 | FRA | NEW | NO | Blinks on creature casts; a blinked token is exiled for good |
| 41 | Thalia, the Survivor | 4 | FRA | NEW | NO | 3/4 lifelink for 4; the noncreature tax is a mild hate effect (rating input, not a veto) with no drain hook |
| 42 | Way of the Healer | 4 | FRA | NEW | NO | Jace −2 Cadets: 4 mana for two tokens over two turns |
| 43 | Yuriko, Blade of the Mighty | 4 | FRA | NEW | NO | TRAP: "During combat, players can't cast spells or activate abilities that aren't mana abilities" — locks our own Deflecting Swat, Flawless Maneuver, Teferi's Protection, Viscera Seer and Goblin Bombardment in combat |
| 44 | Fateshaper Aspirant | 5 | FRA | NEW | NO | 5-mana 3/4 with a one-shot mode |
| 45 | Saheeli, Consul of Oversight | 5 | FRA | NEW | NO | 5 mana for one Thopter a turn (Viscera Seer's scry triggers it) |
| 46 | Sunfall | 5 | FRC | REPRINT | NO | Exile — no death triggers — and takes our board |
| 47 | Dack Fayden, Helping Hand | 6 | FRC | NEW | NO | Hands our library's creatures to opponents |
| 48 | Elspeth, Sun's Champion | 6 | FRC | REPRINT | NO | Founding grounds re-checked: still 6 mana against a 2.74 curve; its −3 kills Caesar and Mondrak (power 4) |
| 49 | Hexhaven Battalion | 6 | FRA | NEW | NO | 6-mana sorcery for three 2/2s; landcycling filler |
| 50 | Kindred Judgment | 7 | FRA | NEW | NO | 7 mana; naming Soldier or Human still kills Blood Artist, Cruel Celebrant, Elas, Mayhem Devil, Zurgo and Viscera Seer. Ruinous Ultimatum is the one-sided 7 |
| 51 | Ob Nixilis, the Ascended | 7 | FRC | NEW | NO | A 4/4 Angel every end step we gained life is strong, but 7 mana against a list built with nothing between 5 and 7 |
| 52 | Overlord of the Mistmoors | 7 | FRC | REPRINT | **SIDE** | Impending {2}{W}{W}: two 2/1 flyers now (four doubled), a 6/6 that makes two more per attack four turns later. Displaces Court of Grace |
| 53 | Serra's Emissary | 7 | FRC | REPRINT | NO | 7 mana |
| 54 | Ghalta the Immovable | 9 | FRA | NEW | NO | Toughness-matters; no fit |
| 55 | Return to the Light Realms | 9 | FRA | REPRINT | NO | 9 mana |

### Black

| # | Name | MV | Set | New? | Verdict | Reason |
|---|---|---|---|---|---|---|
| 56 | Dark Matter Manipulator | 1 | FRA | NEW | NO | Self-mill beater; no graveyard plan |
| 57 | Lich's Relic | 1 | FRA | NEW | **MAIN** | {B} + optional {2}: "for each opponent, destroy up to one target creature or planeswalker that player controls" — a 3-mana 3-for-1, then a +2/+1 Equipment (+2 mobilize on the Infantry Shield carrier). Displaces Lethal Scheme |
| 58 | Mabel, Bitter Recluse | 1 | FRA | NEW | NO | 1/1 deathtouch counter-remover |
| 59 | Bloodline Recollector // Ancestral Craving | 2 | FRA | NEW | **MAIN** | End step, if 3+ creatures died this turn → prepared; {B}: target player draws three. One Caesar sacrifice + two tokens to Viscera Seer is the 3 deaths; Grave Pact makes one own death four. Displaces Deadly Dispute |
| 60 | Dreadhorde Invasion | 2 | FRC | REPRINT | NO | Amass grows ONE Army with counters — one body, not a token per turn |
| 61 | Extrapolate the Impossible | 2 | FRA | NEW | NO | Blank in Commander — CR 903.11 admits only effects that *specifically* bring cards into Commander games from outside the game; this one says "from outside the game" generically |
| 62 | Gallia, Tragic Host | 2 | FRA | NEW | NO | Menace 2/1 with expensive self-recursion |
| 63 | Last Gasp | 2 | FRA | REPRINT | NO | −3/−3 small-creature removal |
| 64 | Liliana the Repentant | 2 | FRA | NEW | NO | Mills two per creature entering — no graveyard plan; the exhaust reanimation is once |
| 65 | Multiply by Zero | 2 | FRA | NEW | NO | Temporary 0/0 |
| 66 | Rank Rat | 2 | FRA | NEW | NO | 1/1 + each opponent discards; filler fodder |
| 67 | Silence the Echo | 2 | FRA | NEW | NO | The sacrifice cost is upside here (a death), but it is a sorcery and all five in-deck answers are instants |
| 68 | Solve for Disappointment | 2 | FRA | NEW | NO | Discard + Jace 1 |
| 69 | Terminal Criticism | 2 | FRA | NEW | NO | Blue/red targets only |
| 70 | Vraska's Final Mercy | 2 | FRA | NEW | NO | Sorcery destroy with 2 life lost — Silence the Echo is the better version here and also passes |
| 71 | Way of the Necromancer | 2 | FRA | NEW | NO | Loyalty on each death, but the Jace token converts to ≤1 card a turn (CR 606.3); Idol, Opportunist and Tocasia's Welcome already draw 1/turn |
| 72 | Break Under Pressure | 3 | FRA | NEW | **SIDE** | Instant: opponent sacrifices their greatest-MV creature/PW — gets through hexproof and indestructible commanders |
| 73 | Cast Away Doubt | 3 | FRA | NEW | NO | Sorcery draw 2 for 3 |
| 74 | Danitha, Spear of Agony | 3 | FRA | NEW | NO | Self-growing first-striker off targeting spells |
| 75 | Gideon the Oathless | 3 | FRA | NEW | NO | Punisher for opponents' creatures entering; no fit |
| 76 | Loot, the Anomaly | 3 | FRA | NEW | NO | Free sac outlet only at threshold — tokens never reach the graveyard; four free outlets already |
| 77 | Proft, Sinister Mastermind | 3 | FRA | NEW | NO | Threshold-gated cast; no graveyard plan |
| 78 | Sanctum Lurker | 3 | FRA | NEW | NO | Jace +2 pings each opponent for 1; a 3/2 for 3 |
| 79 | Screeching Soulbreaker | 3 | FRA | NEW | NO | Drains only on its OWN attack; Ingris does it for every attacker |
| 80 | Theoretical Necromancer | 3 | FRA | NEW | NO | 4/1 with a graveyard regrowth |
| 81 | Tinybones, Pocket Nuisance | 3 | FRA | NEW | NO | Discard theme |
| 82 | Way of the Deathbringer | 3 | FRA | NEW | NO | Jace −2 turns a token into a 4/4 twice; 3 mana |
| 83 | Winter, Tormented Loner | 3 | FRA | NEW | NO | One-shot edict; Grave Pact and Dictate do it per death |
| 84 | Darklight Phoenix | 4 | FRA | REPRINT | NO | Returns only if two creatures died before combat; Reassembling Skeleton is the cheaper recursive fodder |
| 85 | Extended Absence | 4 | FRA | NEW | NO | 4-mana instant exile + 1 drain; in-deck answers cost 1–3 |
| 86 | Rampart Hunter | 4 | FRA | NEW | NO | Deathtouch 3/3 + one-shot pump |
| 87 | Rewrite Regrets | 4 | FRA | NEW | NO | 4-mana reanimation; one recursion slot by design |
| 88 | Teyo, Diamondblade Mage | 4 | FRA | NEW | NO | 4-mana flash deathtouch trick |
| 89 | Garruk, Veiled Butcher | 5 | FRA | NEW | NO | TRAP: "If a creature an opponent controls would die, exile it instead" — turns off Blood Artist, Meathook and Morbid Opportunist on every opponent death, including Grave Pact/Dictate edicts (LEDGER 2026-08-09) |
| 90 | Massacre Girl, Most Wanted | 5 | FRA | NEW | NO | A Blood Artist at 5 mana that hits one TARGET opponent; every in-deck drainer is cheaper and most hit each opponent |
| 91 | Rise of the Deathbringer | 5 | FRA | NEW | NO | Draw = greatest power (Caesar's 4) for 5 mana; the −3/−3 mode wipes our own tokens |
| 92 | Yargle, Glutton of Urborg | 5 | FRA | REPRINT | NO | Vanilla 9/3 |
| 93 | Apex Witchstalker | 6 | FRA | NEW | NO | 6-mana menace beater; landcycling filler |
| 94 | Jhoira, Weatherlight Corsair | 6 | FRC | NEW | NO | 6 mana for a random historic permanent |
| 95 | Overwrite the Multiverse | 6 | FRA | REPRINT | NO | Exile wipe — no death triggers, takes our board |
| 96 | Archfiend of Despair | 8 | FRC | REPRINT | NO | Doubles opponents' life loss each end step — a real finisher — but 8 mana in a list with nothing above 5 bar Ruinous Ultimatum |
| 97 | Archon of Cruelty | 8 | FRC | REPRINT | NO | 8 mana |
| 98 | Avacyn, Angel of Horror | 8 | FRC | NEW | NO | 8 mana; returns nontoken creatures only |

### Red

| # | Name | MV | Set | New? | Verdict | Reason |
|---|---|---|---|---|---|---|
| 99 | Ajani's Anguish | 1 | FRA | NEW | NO | X burn + team trample |
| 100 | Artifist Acumen | 1 | FRA | NEW | NO | Cantrip first-strike trick |
| 101 | Marwyn, the Clearcutter | 1 | FRA | NEW | NO | {2},{T}, sacrifice an artifact: draw — a Treasure outlet at 3 mana per card |
| 102 | Pompous Battlemage // Improvised Act | 1 | FRA | NEW | NO | Rummage on a 1/1 prowess body |
| 103 | Blazing Crescendo | 2 | FRA | REPRINT | NO | Combat trick + impulse draw |
| 104 | Eardrum Rattler | 2 | FRA | NEW | NO | Unblockable granter for small creatures |
| 105 | Essence Burn | 2 | FRA | NEW | NO | Black/green targets only; its exile-instead touches only its own target |
| 106 | Gallia, the Merrymaker | 2 | FRA | NEW | NO | Haste for creatures with counters; no counter theme |
| 107 | Master of Barbs | 2 | FRA | NEW | NO | Team +1/+0 on noncombat damage — combat-only pump |
| 108 | No Admittance | 2 | FRA | NEW | NO | Sorcery 3 damage + Jace 1 |
| 109 | Samut, Hazoret's Champion | 2 | FRA | NEW | NO | Team haste, but Caesar's, Adeline's, Hero's, Anim Pakal's, mobilize and Assemble's tokens already arrive attacking or hasty; only fresh nontoken creatures gain |
| 110 | Skilled Battlecarver | 2 | FRA | NEW | NO | Firebreathing 2/1 |
| 111 | Stingcaster Mage | 2 | FRA | REPRINT | NO | Flashback for one instant/sorcery — 13 in the 99, best rebuy Demonic Tutor; a 2/1 haste otherwise |
| 112 | Tomik, Izzet Sparkmage | 2 | FRA | NEW | **SIDE** | Noncombat damage to opponents +1: Impact Tremors and Warleader's Call become 2 per creature entering, Bombardment/Mayhem Devil 2 per sacrifice, Caesar's damage mode +1. Drain (life loss) is not damage and doesn't scale. A blank 1/2 without a damage source |
| 113 | Way of the Pyromancer | 2 | FRA | NEW | NO | Jace +1: add {R} |
| 114 | Chandra's Emberling | 3 | FRA | NEW | NO | Noncreature-cast grower |
| 115 | Command the Stage | 3 | FRA | NEW | NO | 3 mana for a recurring 2/2 — below the in-deck makers' rate |
| 116 | Cursed Mirror | 3 | FRC | REPRINT | NO | A copy of Caesar dies to the legend rule; ramp role is full |
| 117 | Fulminous Forte | 3 | FRA | NEW | NO | 1 to each opposing creature or 5 to one; damage-based removal at 3 |
| 118 | Identity Echo | 3 | FRA | NEW | NO | Sorcery-speed creature polymorph |
| 119 | Koth, the Geomancer | 3 | FRA | NEW | NO | Landfall ping |
| 120 | Pia, Determined Rebuilder | 3 | FRA | NEW | NO | Two bodies for 3 is below the in-deck makers' rate |
| 121 | Pyre Rhymer // Molten Tide | 3 | FRA | NEW | NO | Spellslinger ritual body |
| 122 | Way of the Warlord | 3 | FRA | NEW | NO | Jace −4 ping |
| 123 | Wrath of the Bloodmane | 3 | FRA | NEW | NO | 4 damage for 2 with Caesar out; in-deck answers exile |
| 124 | Arni, Renowned Champion | 4 | FRA | NEW | NO | Self-pump off creatures entering; no drain |
| 125 | Chandra, Torch of Defiance | 4 | FRA | REPRINT | NO | Generic 4-mana value planeswalker; no token/drain hook |
| 126 | Curse-Marred Demon | 4 | FRA | NEW | NO | Tutor then discard AT RANDOM — with no other card in hand you discard what you fetched |
| 127 | Heartstring Puller | 4 | FRA | NEW | NO | 3/1 + a Cadet for 4 |
| 128 | Tetsuko Umezawa, Pursuer | 4 | FRA | NEW | NO | Double-strike prowess beater |
| 129 | Violent Echoes | 4 | FRA | NEW | NO | 4-mana 6 damage |
| 130 | Awaken the Inferno | 5 | FRA | NEW | NO | 5-mana sorcery removal |
| 131 | Draconic Visitor | 5 | FRA | NEW | **SIDE** | Artifact tokens become 5/5 flying Dragons: every Plunderer/Tithe/Dispute/BMC Treasure and every Myrel, Anim Pakal and Loyal Apprentice token. COMBO FLAG: + Pitiless Plunderer + any free sac outlet = unbounded chosen-N deaths (T5+). Self-hit: Treasure mana stops while it's out. Displaces Assemble the Legion |
| 132 | Jiang Yanggu, Alone | 5 | FRA | NEW | NO | "Attacks a player alone" — a go-wide deck never attacks alone |
| 133 | Tether Technician | 5 | FRA | NEW | NO | 5-mana 4/5 with a discard ping |
| 134 | Winter, Team Player | 5 | FRA | NEW | NO | Noncreature-cast team pump |
| 135 | Ajani Unrelenting | 6 | FRA | NEW | NO | 6 mana; its −3 deals 4 to each creature except our tokens — kills Caesar |
| 136 | Kiora of Fire and Ashes | 6 | FRA | NEW | NO | 6 mana; {8} per Dragon |
| 137 | Venser, Fervent Forger | 6 | FRC | NEW | NO | 6-mana flash copy of opponents' stuff |
| 138 | Craterclaw Colossus | 7 | FRA | REPRINT | NO | 7-mana artifact-count pump |
| 139 | Face Yourself | 7 | FRA | NEW | NO | 7-mana copy of one player's board |
| 140 | Akroma, Angel of Fury | 8 | FRC | REPRINT | NO | 8 mana |

### Multicolor BR

| # | Name | MV | Set | New? | Verdict | Reason |
|---|---|---|---|---|---|---|
| 141 | Stingerquill Voxmancer // Vicious Verse | 1 | FRA | NEW | NO | {B/R} per turn for 1 damage to one opponent |
| 142 | Grim Repriser | 2 | FRA | NEW | NO | Self-recursion that exiles on the next death (finality counter) |
| 143 | Rakdos Signet | 2 | FRC | REPRINT | NO | Talisman of Indulgence holds the same slot |
| 144 | Stingerquill Charm | 2 | FRA | NEW | NO | Modal 2-mana; nothing it does beats an in-deck slot |
| 145 | Stinging Vitriol | 2 | FRA | NEW | NO | 2 damage + discard |
| 146 | Talisman of Indulgence | 2 | FRC | REPRINT | IN | Already in the 100 (FRC reprint) |
| 147 | Hallway Heckler // Vicious Verse | 3 | FRA | NEW | NO | Rummager with a 1-damage copy |
| 148 | Ingris Stingerquill | 3 | FRA | NEW | **MAIN** | "Whenever a creature you control attacks, that creature deals 1 damage to each opponent" — per declared attacker, doubled by Isshin/Windcrag Siege; {4}: Cadet + team haste. The combat-route payoff. Displaces Bastion of Remembrance |
| 149 | Whiplash Wordsmith // Vicious Verse | 4 | FRA | NEW | NO | 3/3 with a 1-damage copy |

### Multicolor BW

| # | Name | MV | Set | New? | Verdict | Reason |
|---|---|---|---|---|---|---|
| 150 | Blessed Ghoul | 1 | FRA | NEW | NO | Recurs to HAND for 3 — must be recast |
| 151 | Despark | 2 | FRC | REPRINT | NO | MV≥4 targets only; Unmaking and Verse cover wider |
| 152 | Edgar, Ancient Bloodlord | 2 | FRA | NEW | NO | Gains 1 per own death — but no lifegain converter in this list (Ocelot Pride's condition is already met by five gainers); its outlet costs {2} where four free ones exist |
| 153 | Lingering Souls | 3 | FRC | REPRINT | IN | Already in the 100 (FRC reprint) |
| 154 | Vindictive Triumph | 3 | FRA | NEW | **SIDE** | Instant exile creature/PW for 3; an MV≤3 target comes back under our control until end step — sacrifice it first for a death on our side and a Grave Pact edict |
| 155 | Twisted Fates | 5 | FRA | NEW | NO | 5-mana removal that puts counters on our tokens (Skullclamp cost) |
| 156 | Niv-Mizzet, Ghost Counsel | 6 | FRC | NEW | **SIDE** | "Whenever you gain life, you may pay that much life. If you do, draw that many cards" — every life-gaining drainer becomes a card per death. 6 mana, {W}{W}{B}{B} |

### Multicolor RW

| # | Name | MV | Set | New? | Verdict | Reason |
|---|---|---|---|---|---|---|
| 157 | Solitary Cell | 2 | FRA | NEW | NO | MV≤3 O-Ring on an artifact |
| 158 | Charge the Sanctum | 3 | FRA | NEW | NO | Combat trick |
| 159 | Mabel, Valley Hero | 3 | FRA | NEW | NO | Counters on entering tokens (Skullclamp cost), no drain |
| 160 | Windcrag Siege | 3 | FRC | REPRINT | IN | Already in the 100 (FRC reprint) |
| 161 | Warrior's Blades | 4 | FRA | NEW | NO | 4 mana for 3 damage + an Equipment |
| 162 | Tamiyo, Upriser Crowned | 6 | FRC | NEW | NO | 6 mana |

### Colorless

| # | Name | MV | Set | New? | Verdict | Reason |
|---|---|---|---|---|---|---|
| 163 | Currency Converter | 1 | FRC | REPRINT | NO | Discard-fed |
| 164 | Eye of Jace | 1 | FRA | NEW | NO | Needs 7 cards in graveyard; tokens don't fill it |
| 165 | Sol Ring | 1 | FRC | REPRINT | IN | Already in the 100 (FRC reprint) |
| 166 | Afterthought Sentry | 2 | FRA | NEW | NO | 2/2 graveyard hate |
| 167 | Arcane Signet | 2 | FRC | REPRINT | IN | Already in the 100 (FRC reprint) |
| 168 | Fellwar Stone | 2 | FRC | REPRINT | NO | Ramp role full with on-colour rocks |
| 169 | Karn, Argent Defender | 2 | FRA | NEW | NO | TRAP + hate-piece flag: "Artifacts and creatures entering the battlefield don't cause abilities to trigger" — turns off Impact Tremors, Warleader's Call, Elas, Tocasia's Welcome and Bastion's ETB |
| 170 | Living Library | 2 | FRA | NEW | NO | 6-mana tuck on a 0/4 |
| 171 | Medic's Kitesail | 2 | FRA | NEW | NO | Flying Equipment |
| 172 | The Echoverse Fulcrum | 2 | FRA | NEW | NO | Symmetric wipe that kills Caesar; our wipes are one-sided (Ruinous) or X-controlled (Meathook) |
| 173 | Chromatic Lantern | 3 | FRC | REPRINT | NO | Ramp role full; mana base already fixed |
| 174 | Keeper of the Quiet Hour | 3 | FRA | NEW | NO | 3/2 + Jace 2 |
| 175 | Murmuring Volume | 3 | FRA | NEW | NO | 3-mana rock with a rummage |
| 176 | Traxos, Scourge Eternal | 4 | FRA | NEW | NO | Untap-on-cast beater |
| 177 | Archive Arbiter | 6 | FRA | NEW | NO | 6-mana flyer with a disenchant |
| 178 | Ginger, Queen of Sweets | 6 | FRC | NEW | NO | 6 mana |
| 179 | Omnath, Locus of the Void | 7 | FRC | NEW | NO | 7 mana |
| 180 | Darksteel Angel | 9 | FRC | NEW | NO | 9 mana |
| 181 | Emrakul, the Exigent Doom | 10 | FRA | REPRINT | NO | 10 mana |
| 182 | Memnarch, the Warden | 10 | FRC | NEW | NO | 10 mana |

### Land

| # | Name | MV | Set | New? | Verdict | Reason |
|---|---|---|---|---|---|---|
| 183 | Battlefield Forge | 0 | FRC | REPRINT | IN | Already in the 100 (FRC reprint) |
| 184 | Caves of Koilos | 0 | FRC | REPRINT | IN | Already in the 100 (FRC reprint) |
| 185 | Clifftop Retreat | 0 | FRC | REPRINT | IN | Already in the 100 (FRC reprint) |
| 186 | Command Tower | 0 | FRC | REPRINT | IN | Already in the 100 (FRC reprint) |
| 187 | Dedicated Commons | 0 | FRA | NEW | NO | Tapped unless we control a planeswalker (one in the 99) |
| 188 | Exotic Orchard | 0 | FRC | REPRINT | NO | Depends on opponents' lands; the base already has 20+ on-colour duals |
| 189 | Fabled Passage | 0 | FRC | REPRINT | NO | Basics-only fetch (8 basics), tapped early |
| 190 | Fetid Heath | 0 | FRC | REPRINT | NO | W/B filter; both colours already well sourced |
| 191 | Hall of Echoes | 0 | FRA | NEW | NO | {5} to copy Caesar for a second trigger — Isshin and Windcrag Siege do it free |
| 192 | Haunted Ridge | 0 | FRA | REPRINT | NO | Lateral to Blackcleave Cliffs (untapped late instead of early) |
| 193 | Hexhaven Dueling Arena | 0 | FRA | NEW | NO | Colourless; its prepare activations only help Bloodline Recollector ({4} to re-prepare) |
| 194 | Isolated Chapel | 0 | FRC | REPRINT | IN | Already in the 100 (FRC reprint) |
| 195 | Kher Keep | 0 | FRC | REPRINT | **MAIN** | {1}{R},{T}: a 0/1 Kobold at instant speed — Caesar's fodder, a death for every drainer, Skullclamp draws two off it, and an opponent's-turn token fires Tocasia's Welcome/Idol. Land-for-land: displaces a Mountain |
| 196 | Meticulous Commons | 0 | FRA | NEW | NO | Tapped unless we control a planeswalker |
| 197 | Mountain | 0 | FRA | REPRINT | IN | Basic — already in the 100 |
| 198 | Path of Ancestry | 0 | FRC | REPRINT | NO | Enters tapped; scry on Human/Soldier casts is minor |
| 199 | Plains | 0 | FRA | REPRINT | IN | Basic — already in the 100 |
| 200 | Radiant Summit | 0 | FRC | REPRINT | NO | Tapped unless we control two basics — 8 basics in 35 lands |
| 201 | Reflecting Pool | 0 | FRC | REPRINT | NO | Lateral to the duals it would replace |
| 202 | Room of Refuge | 0 | FRA | NEW | NO | Enters tapped |
| 203 | Stingerquill Annex | 0 | FRA | NEW | NO | Tapped unless we control a planeswalker |
| 204 | Sulfurous Springs | 0 | FRC | REPRINT | IN | Already in the 100 (FRC reprint) |
| 205 | Swamp | 0 | FRA | REPRINT | IN | Basic — already in the 100 |
| 206 | Turbulent Crater | 0 | FRC | NEW | **SIDE** | Typed Swamp Mountain (fetchable by Mire, Flats, Mesa), untapped once opponents hold 8 lands (~their turn 3). A marginal upgrade on Dragonskull Summit |

---

## Proposed swaps (4) — one decision each, ranked

Baseline (`deck:show`, main): 100 cards, 35 lands, **avg MV 2.74** (with commander), **MV≤2 = 29,
MV≤3 = 51** of 64 nonland cards in the 99, pips W38 B34 R16, sources W26 B25 R23, Game Changers 3/3.

### 1. Lich's Relic in, Lethal Scheme out — deciding axis: card economy at table scale

*"When this Equipment enters, you may pay {2}. When you do, for each opponent, destroy up to one
target creature or planeswalker that player controls. Equipped creature gets +2/+1. Equip {2}."*

**Cost-out:** {B} printed (MV 1), **3 mana** to cast with the kill. No reducers apply. The {2} is a
reflexive trigger (CR 603.12) — targets are chosen when you pay.

**Role table — Removal & Interaction (5 + candidate), scored against the current list:**

| Card | Real cost here | Speed | Hits | How | Cards answered | Riders / costs |
|---|---|---|---|---|---|---|
| Swords to Plowshares | {W} | instant | creature | exile | 1 | Opponent gains life = power |
| Path to Exile | {W} | instant | creature | exile | 1 | Opponent ramps a basic |
| Vanishing Verse | {W}{B} | instant | **monocoloured** permanent | exile | 1 | Misses multicolour commanders and colourless artifacts |
| Anguished Unmaking | {1}{W}{B} | instant | any nonland permanent | exile | 1 | We lose 3 |
| Lethal Scheme | {2}{B}{B}, convoke (often 0–2 real mana) | instant | creature / PW | destroy | 1 | Each convoking token connives (a loot; a +1/+1 counter if a nonland is discarded — that token no longer dies to Skullclamp) |
| **Lich's Relic** | **3** ({B} + {2}) | sorcery (artifact) | **up to one creature/PW per opponent** | destroy | **up to 3** | Then a +2/+1 Equipment; on the Infantry Shield carrier that is +2 mobilize Warriors per attack |

**Cut: Lethal Scheme.** It is the one 1-for-1 that costs 4 printed; Relic answers up to three
threats for 3. What we give up is real and should be said: Lethal Scheme's **instant speed** and its
**connive looting**. Instant speed stays covered by the other four answers (all instants, 1–3 mana).
**Alternative cut: Vanishing Verse** — keeps Lethal Scheme's instant creature/PW kill, but loses the
cheapest answer to a monocoloured enchantment or artifact (only Unmaking would remain).

**Self-hits:** none — every target is an opponent's permanent ("that player controls").
**Curve:** MV4 → MV1 printed: avg MV **2.74 → 2.69**, MV≤2 **29 → 30**, MV≤3 **51 → 52**. Real cast
cost with the kill is 3. Pips B34 → 33.

### 2. Bloodline Recollector in, Deadly Dispute out — deciding axis: repeatability

*"At the beginning of each end step, if three or more creatures died this turn, this creature becomes
prepared." Prepare spell — Ancestral Craving {B}, instant: "Target player draws three cards and
loses 3 life."*

**Cost-out:** {1}{B} for the 2/2, then **{B} per three cards** (the copy is a normal cast at full
cost, CR 722.3c / 601.2i; LEDGER 2026-08-06).

**Is "three creatures died this turn" realistic here? Yes, on our own turn, by choice.** Caesar's
attack sacrifices one; two of the Soldiers he just made go to Viscera Seer or Goblin Bombardment
before the end step (each is a drain). With **Grave Pact or Dictate** out, one of our deaths is four
deaths table-wide ("creatures", not "creatures you control"). It also fires on **opponents'** end
steps whenever three creatures died in their turn (blocks, removal, edicts). The Vampire type is
irrelevant here.

**Timing trap (rules):** mobilize Warriors are sacrificed by a trigger at the beginning of the end
step — the same moment Recollector checks. Its "if three or more creatures died" is an intervening
if, checked when the end step begins (CR 603.4), so **that end step's Warrior deaths don't count**.
Get the three deaths in before the end step.

**Role table — Card Draw (8 + candidate):**

| Card | Real cost | Cards | Repeatable? | Needs | Works on an empty board? | Other |
|---|---|---|---|---|---|---|
| Black Market Connections | {2}{B} + life | 1/turn (+Treasure/3-2 options) | yes | nothing | yes | Enchantment |
| Commissar Severina Raine | {1}{W}{B}; {2} + a sac per card | 1 per {2} | yes | fodder + mana | no | Attack drain |
| Deadly Dispute | {1}{B} + a sac | **2 once** + Treasure | **no** | an artifact or creature | no | Instant sac outlet |
| Demonic Tutor | {1}{B} | tutor | no | — | yes | Game Changer |
| Idol of Oblivion | {2}; free draws | 1/turn | yes | a token made this turn | yes (Caesar makes tokens) | {8} Eldrazi late |
| Morbid Opportunist | {2}{B} | 1/turn | yes | any death | no | |
| Skullclamp | {1}; equip {1} | 2 per death | yes | toughness-1 fodder | no | Anthem cost |
| Tocasia's Welcome | {2}{W} | 1/turn | yes | an MV≤3 creature entering (tokens are MV 0) | yes (Caesar) | Enchantment |
| **Bloodline Recollector** | {1}{B}; **{B} per 3 cards** | **3 per end step** | **yes, any end step** | 3 deaths that turn | no | 2/2 fodder body |

**Cut: Deadly Dispute** — the only draw card here that is a **one-shot** (Demonic Tutor is a tutor).
Its other job, an instant-speed sacrifice outlet, is covered four times (Viscera Seer, Goblin
Bombardment, Ashnod's Altar, Phyrexian Altar). We lose its Treasure and its "sac in response to
removal, draw two" line. **Alternative cut: Tocasia's Welcome** (1 card a turn) — but it draws with an
empty board, which the Teysa lesson (LEDGER 2026-09-24) says to protect; Dispute does not.

**Self-hits:** the 3 life per cast. The deck gains life on nearly every death, so this is affordable,
but on a turn Caesar also takes the draw mode it adds up. Cute line, not a plan: target an opponent
with Ancestral Craving while Smothering Tithe is out — three draws, three Tithe triggers, 3 life lost.
**Curve:** MV2 for MV2 — no change.

### 3. Kher Keep in, one Mountain out — deciding axis: token supply at zero spell-slot cost

*"{T}: Add {C}. {1}{R}, {T}: Create a 0/1 red Kobold creature token named Kobolds of Kher Keep."*

**Cost-out:** 3 mana a Kobold (the {1}{R} plus the Keep's own tap). Castle Ardenvale, the deck's
other token land, costs 5 a 1/1.

**What a 0/1 does here:** Caesar's sacrifice fodder; a death for every drainer and a Grave Pact edict;
**Skullclamp draws two off it** (0/1 → 1/0 dies, CR 704.5f) — {1}{R} + equip {1} for two cards; and,
because the activation has no timing restriction, a Kobold made on **each opponent's turn** fires
Tocasia's Welcome ("only once each turn" — each turn is a new turn) and satisfies Idol of Oblivion
that turn. Death-independent token makers: 17 → 18.

**Role table — the land slot (basics only; the utility and dual lands are not in question):**

| Land | Colours | Sources after the cut | Notes |
|---|---|---|---|
| Mountain ×2 | R | R 23 → 22 | R carries the fewest pips (16). **Cut one** |
| Plains ×3 | W | W 26 → 25 | W carries the most pips (38) and Ruinous Ultimatum needs {W}{W}{W} |
| Swamp ×3 | B | B 25 → 24 | B carries 34 pips; Grave Pact needs {B}{B}{B} |

**Cut: one Mountain.** Three fetches still find typed Mountains (Badlands, Blood Crypt, Plateau,
Sacred Foundry). **Alternative:** Nomad Outpost (the tapped tri-land) keeps every basic but loses a
source of all three colours at once. Lands stay at 35.
**Self-hits:** the Keep taps for {C} only; its own ability needs {R}. **Curve:** none (land for land).

### 4. Ingris Stingerquill in, Bastion of Remembrance out — deciding axis: the combat route (pilot memory `keep-combat-as-second-axis`)

*"Flying. Whenever a creature you control attacks, that creature deals 1 damage to each opponent.
{4}: Create a 2/2 colorless Wizard Soldier creature token named Cadet. Then creatures you control
gain haste until end of turn."* 1/4, {B}{R}{R}.

**Cost-out:** 3 mana, no reducers. RR on turn 3 needs two of the 23 red sources — the heaviest red
demand in the list after Ruinous Ultimatum.

**What it does here:** each **declared** attacker deals 1 to each opponent whether or not it is
blocked — blocked tokens then die into the drainers. Isshin and Windcrag Siege make it 2 (3 with
both). Tokens made attacking don't trigger it that turn (CR 508.3a), but they survive to be declared
the next turn, so a mid-game board of 6–10 tokens is 6–10 damage to **each** opponent per attack.
The {4} is a mana sink that is also a death-independent token maker and gives Bitterblossom's
upkeep Faeries (and anything cast this turn) haste.

**Role table — Drain & Death Payoffs (11 + candidate):**

| Card | MV | Fires on | Output | Reach | Survives a creature wipe? |
|---|---|---|---|---|---|
| Blood Artist | 2 | **any** creature dying (opponents' edicts too) | 1 loss / 1 gain | one target player | no |
| Zulaport Cutthroat | 2 | own creature dies | 1 loss each / 1 gain | each opponent | no |
| Cruel Celebrant | 2 | own creature **or PW** dies | 1 loss each / 1 gain | each opponent | no |
| Elas il-Kor | 2 | own creature enters (gain) / dies (loss) | 1 each | each opponent | no |
| Impact Tremors | 2 | own creature enters | 1 damage each | each opponent | **yes** |
| Mayhem Devil | 3 | **any player** sacrifices **any** permanent (Treasures, fetches, Grave Pact edicts) | 1 damage | any target | no |
| Warleader's Call | 3 | own creature enters | 1 damage each + anthem | each opponent | **yes** |
| Zurgo Stormrender | 3 | own token leaves | draw if attacking / 1 loss each | each opponent | no |
| **Bastion of Remembrance** | 3 | own creature dies | 1 loss each / 1 gain (+ a 1/1 on entry) | each opponent | **yes** |
| Grave Pact | 4 | own creature dies | each other player sacrifices | each | **yes** |
| Dictate of Erebos | 5 | own creature dies | each opponent sacrifices | each | **yes** (flash) |
| **Ingris Stingerquill** | 3 | **own creature declared as attacker** | 1 damage each, per attacker | each opponent | no |

**Cut: Bastion of Remembrance.** Its effect is the sixth "one of ours dies → each opponent loses 1"
in the list (Blood Artist, Zulaport, Celebrant, Elas, Meathook, Bastion; Zurgo for tokens), and it is
the most expensive of them. Ingris is the only payoff keyed to attacking. **The cost, stated plainly
(SKILL §2.5 — drainers are multiplicative, not redundant):** every death drains one less per opponent
while Bastion would have been out, and Bastion is an enchantment that survives the creature wipe that
kills Ingris. **Alternative cut: Impact Tremors** (keeps all six death-drainers; loses the
enchantment enter-damage that Warleader's Call duplicates).
**Curve:** MV3 for MV3 — no change. Pips R16 → 18.

### All four together

avg MV **2.74 → 2.69**, MV≤2 **29 → 30**, MV≤3 **51 → 52**, lands 35, Game Changers 3/3 (none added),
pips W38 B33 R18. No new combo, no new loop. Each is its own decision.

---

## Bench (SIDE) — with the card each would displace

| Card | Would displace | When it earns the slot |
|---|---|---|
| **Draconic Visitor** | Assemble the Legion | If the pilot wants a second combo line. **COMBO FLAG:** Visitor + Pitiless Plunderer + any free sac outlet (Viscera Seer, Bombardment, either Altar) is an **unbounded chosen-N loop** — each Dragon sacrificed makes a Plunderer "Treasure" that becomes another 5/5 Dragon; with Bombardment alone it is three cards. Earliest ~turn 5 (Plunderer T4, Visitor T5) — the loop policy says to say so. Self-hit: while it's out, Plunderer/Tithe/Dispute/BMC make Dragons instead of mana, which also breaks the existing Skeleton loop (it needs the Treasure's {B}). Without Plunderer it still turns Myrel's, Anim Pakal's and Loyal Apprentice's tokens and every Tithe Treasure into 5/5 flyers |
| **Grand Crescendo** | Secure the Wastes | Pod wipes often. Same instant X-token burst, one fewer token at equal mana, plus team indestructible |
| **Germinate Recruits** | Secure the Wastes | A drain-heavy mid-game: X = life gained this turn, so it outgrows Secure once 2–3 gainers are out; weak early |
| **Staff of the Storyteller** | Tocasia's Welcome | Substitute 1/turn draw that banks counters and comes with a 1/1 flyer; costs {W} per draw |
| **Skrelv's Hive** | Legion Warboss | A white Bitterblossom; the Mite can't block but is an artifact token (Draconic Visitor) |
| **Overlord of the Mistmoors** | Court of Grace | Two 2/1 flyers for 4 now, a 6/6 token maker later; Court's monarch draw is the trade |
| **Liliana the Faultless** | Mithril Coat | If the pod's removal is mostly targeted **exile**: hexproof on demand stops Swords/Path, which Coat's indestructible can't |
| **Tomik, Izzet Sparkmage** | Loyal Apprentice | If Ingris goes in: +1 to every noncombat damage event (Tremors, Warleader's, Bombardment, Mayhem Devil, Caesar's damage mode, Ingris). Blank without a damage source |
| **Niv-Mizzet, Ghost Counsel** | Assemble the Legion | Turns every life-gaining drainer into a card per death (pay the life). 6 mana — against the "cheap board" brief |
| **Vindictive Triumph** | Vanishing Verse | Removal bench #1: instant exile creature/PW; an MV≤3 target is ours until end step — sacrifice it for a death and a Grave Pact edict |
| **Stroke of Midnight** | Vanishing Verse | Removal bench #2: instant, any nonland permanent, multicolour included |
| **Break Under Pressure** | Vanishing Verse | Removal bench #3: instant edict on the greatest-MV creature — beats hexproof/indestructible commanders |
| **Prophesied End** | Vanishing Verse | Removal bench #4: 2-mana instant creature kill; free of drawback on an attacker |
| **Turbulent Crater** | Dragonskull Summit | Marginal: a fetchable Swamp Mountain, untapped from about turn 3 |

---

## Traps — do not be tempted

- **Garruk, Veiled Butcher** — *"If a creature an opponent controls would die, exile it instead."*
  Every Grave Pact / Dictate edict and every blocker we kill stops triggering Blood Artist, Meathook's
  lifegain and Morbid Opportunist (LEDGER 2026-08-09, the Head of the Hunt pattern).
- **Karn, Argent Defender** — *"Artifacts and creatures entering the battlefield don't cause abilities
  to trigger."* Turns off Impact Tremors, Warleader's Call, Elas, Tocasia's Welcome and Bastion — and
  it is a hate piece the pod will remove anyway (rating input).
- **Yuriko, Blade of the Mighty** — the combat lockout is symmetric: no Deflecting Swat, Flawless
  Maneuver, Teferi's Protection, Viscera Seer or Goblin Bombardment during our own combat.
- **Elspeth, Sun's Champion / Ajani Unrelenting** — their board-clearing modes kill Caesar (power 4;
  "each creature except for tokens you control").
- **Guiding Hydra, Mabel Valley Hero, Twisted Fates, Predictive Preparations, Graft Surgeon** — they
  put +1/+1 counters on tokens. Not a veto (pilot memory: the combat route is worth something), but
  each one switches off Skullclamp on what it touches.
- **Draconic Visitor** — listed on the bench, but know the self-hit before casting it: it eats the
  deck's Treasure mana for as long as it lives.

## The pilot's flagged card — Edgar, Ancient Bloodlord

**NO for Caesar.** *"Whenever another creature or planeswalker you control dies, you gain 1 life.
{2}, Sacrifice another creature or planeswalker: Put a +1/+1 counter on Edgar. He gains menace."*
Here the lifegain has nothing to multiply — Caesar runs **no lifegain converter** (Ocelot Pride only
asks whether we gained life at all, which five drainers already guarantee), and a {2} outlet is worse
than the four free ones in the list. It becomes interesting only if a converter joins: with
**Niv-Mizzet, Ghost Counsel** out, Edgar is a card per death (LEDGER 2026-09-26, converters multiply
gainers). The Vampire line is irrelevant in this deck.

The pilot's other flags don't reach this pool: **Stingcaster Mage** is here and is a NO (13
instants/sorceries, best rebuy Demonic Tutor); Hexhaven Invigorator and Gardenize are green.

---

## Follow-up after the pilot's first pass (2026-09-28)

**Pilot's call:** swaps 1–3 applied (Lich's Relic, Bloodline Recollector, Kher Keep). Ingris
Stingerquill is wanted, but **Bastion of Remembrance stays**. Re-derived against the list as it stands
after those three swaps: 64 nonland cards, avg MV 2.67, MV ≤ 2 = 30, MV ≤ 3 = 52. Every role is exactly
at its target (decisions.md role skeleton), so the cut has to come from the role Ingris joins,
**Drain & Death Payoffs (11)**, unless another role has a clearly weaker card.

### The earlier alternative (Impact Tremors) doesn't hold up

The first pass named Impact Tremors as the fallback because Warleader's Call does the same thing. That
is a redundancy argument (§2.5), and on output it is the wrong card. Tremors fires on **every creature
entering**, and this list makes far more creatures than it kills. A mid-game own turn is Caesar's two
tokens (four under Anointed Procession or Mondrak), plus Bitterblossom, Warboss, Apprentice, Court,
Hero's two, Adeline's three, Anim Pakal, Myrel and the mobilize Warriors. That is 8+ enters, so **8+
damage to each opponent** from a 2-mana enchantment that survives our own creature wipes. It is one of
the highest-output payoffs in the role, not the lowest.

### Role ranking — Drain & Death Payoffs, scored against the current list

Mid-game estimate per own turn: ~8 own creatures entering, ~5 own creatures dying, ~3 opponent
creatures dying to Grave Pact/Dictate edicts.

| Card | Fires on | Est. output / turn | Unique job in this list | Keep? |
|---|---|---|---|---|
| Grave Pact | own creature dies | 3 edicts per death | table control (pilot decision 2026-09-24) | protected |
| Dictate of Erebos | own creature dies | same, flash | same (pilot decision) | protected |
| Bastion of Remembrance | own creature dies | ~5 per opp | enchantment — survives wipes | **pilot keep** |
| Impact Tremors | own creature enters | **~8 per opp** | enters outnumber deaths; wipe-proof | yes |
| Warleader's Call | own creature enters | ~8 per opp + anthem | the anthem keeps the combat route live | yes |
| Mayhem Devil | **any player** sacrifices **any** permanent | ~10 pings, aimed | Treasures, fetches, edict victims all count | yes |
| Zurgo Stormrender | own token leaves | draw per attacking token lost, else 1 per opp | the only **draw** in the role; mobilize body | yes |
| Blood Artist | **any** creature dies (opponents' too) | ~8, one target | the only one that counts edict victims (Grave Pact ×3) | yes |
| Elas il-Kor | own creature enters (gain) / dies (loss) | ~5 per opp + ~8 life | the lifegain on enters feeds Ocelot Pride; deathtouch blocker | yes |
| Cruel Celebrant | own creature **or planeswalker** dies, incl. itself | ~5 per opp | Elspeth, Storm Slayer deaths too; 1/2 body | yes |
| **Zulaport Cutthroat** | own creature dies, incl. itself | ~5 per opp | **none — Cruel Celebrant's text is a superset of it** | **cut** |
| *Ingris Stingerquill* | own creature **declared** as attacker | 4–8 per opp, **×2 under Isshin or Windcrag Siege** (both in the list) | the only per-attack payoff in the role; the {4} sink makes a Cadet and gives the team haste | in |

### Proposal: Ingris Stingerquill in, Zulaport Cutthroat out

**Deciding axis (§2.3): per-attack vs per-death marginal output, with the combat route as the
tiebreak.** Zulaport's line, *"Whenever this creature or another creature you control dies"*, is
fully contained in Cruel Celebrant's *"Whenever this creature or another creature or planeswalker you
control dies"*. Everything Zulaport does, Celebrant already does with a better body. Per §2.5 the two
still stack, so the honest cost is **one fewer life loss per death per opponent** (~5 a turn). Ingris
adds 4–8 damage to each opponent on every attack, and 8–16 with either trigger doubler out. It also
works when Caesar attacks with nothing dying first, which is the keep-combat-as-second-axis route.
After the cut, deaths still drain through Blood Artist, Celebrant, Elas, Bastion, Meathook and Zurgo.

**Cost-out:** {B}{R}{R}, no reducers. RR on turn 3 needs two of the list's 21 red sources, the
heaviest red demand after Ruinous Ultimatum. Zulaport is {1}{B}, the easiest cast in the role.
**Self-hits:** none. It damages opponents only, and a 1/4 body survives Goblin Bombardment-style pings.
**Curve:** avg MV 2.67 → 2.69 · MV ≤ 2 30 → 29 · MV ≤ 3 52 → 52.

**Runner-up: Idol of Oblivion (cross-role, Card Draw 8 → 7).** It is the lowest-output draw piece
now that Bloodline Recollector (draw 3 for {B}) and Caesar's own draw mode are in: one card per
untap. That cut keeps all six death drainers, but it takes Card Draw under target, so it is second.
**Considered and rejected:** Loyal Apprentice and the other token engines (the Teysa lesson — the
maker count is the thesis); Reassembling Skeleton (the only Recursion card and a declared loop piece);
lands 35 → 34 (RR on turn 3 is exactly what Ingris needs).
