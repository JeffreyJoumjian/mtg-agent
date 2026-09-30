# FRA + FRC (Reality Fracture + Reality Fracture Commander) set review — Captain America (Jeskai Throw) — 2026-09-28

**Method:** deck-brain SKILL.md. Every card read from verified Scryfall oracle text in the pre-built pool
(`data/fra-candidates-captain-america.json` + `data/frc-candidates-captain-america.json`, rendered to one
numbered file) — both halves of every prepare card read, nothing recalled. The deck read card-by-card from
`deck.json` (main, B3) with oracle text; decisions.md read in full and its grounds re-checked rather than
obeyed (§1.1b). Each card checked against what this deck actually rewards — the commander's exact text:

- **Throw** — `{3}, Unattach an Equipment from Captain America: He deals damage equal to that Equipment's
  mana value divided as you choose among one, two, or three targets.` (Zirda / Training Grounds floor it at {1}.)
- **Catch** — `At the beginning of combat on your turn, attach up to one target Equipment you control to
  Captain America.`

…so the axes are: Equipment count and mana value (Throw fodder), attach effects (Catch moves only one per
combat), **extra beginning-of-combat steps** (each is another Catch → another Throw), protection for Cap,
and evasion for the commander-damage kill (Excalibur + Mjölnir = 28 in one hit). Self-hits audited against
the deck's ETB/attach triggers, its combat-timed Throw line, and "wipes that kill the commander" (§1.3,
the Blasphemous Act precedent in decisions.md).

**Field lens:** EDHREC has no FRA/FRC data (set releases 2026-10-02) — skipped, not guessed (§2.2).

**Pool:** 215 of the two sets' cards fit Jeskai {R}{W}{U} and are commander-legal — **FRA 153 + FRC 62**.
Of those, 148 are new and 67 are reprints (69 of FRC's 87 cards are reprints). **Zero Game Changers in either
set**, so no bracket pressure from any candidate. The list is at 3/3 GCs (Enlightened Tutor, Fierce
Guardianship, Teferi's Protection).

**Result: 1 MAIN · 11 SIDE · 194 NO · 9 already in the 100 (reprints).**

The set is thin for this deck: FRA's themes (Prepared, Empower Jace, surveil, Cadet tokens) touch nothing
the Throw engine uses, and the only two new on-colour Equipment (Warrior's Blades, Medic's Kitesail) are
bench cards. The one proposal is a **reprint** in FRC — Windcrag Siege — which the deck never evaluated.

---

## Set mechanics as they matter to this deck

- **Prepared (21 cards, 7 in-pool).** A prepared copy is a normal cast of the back face only (CR 722.3c,
  LEDGER 2026-08-06). No in-pool prepare card has an Equipment, attach or protection spell on its back —
  all are tempo or Cadet-token spells. Nothing to use.
- **Empower Jace (Jace planeswalker token).** Every "Way of the X" enchantment, the Commons lands
  (untapped only if you control a planeswalker) and Theorist's Sanctum key off a planeswalker the deck will
  never have except as an incidental Jace token. The whole sub-theme is dead here.
- **Surveil (43 cards).** The deck surveils zero times; every surveil payoff (Denzilore, Proft, Saheeli
  Consul, Prudent Fateseer, Proctor) is blank.
- **"Whenever you cast a noncreature spell" payoffs** (Vraska Soul of Stone, Saheeli Jewel, Winter,
  Chandra's Emberling, Shark Typhoon, Whirlwind of Thought) *do* fire here — the list has **45 noncreature
  spells, 21 of them Equipment**. Vraska is the only one worth a bench slot.
- **Wipes that kill Cap** (Martial Coup, White Sun's Twilight at X≥5, Sunfall, The Echoverse Fulcrum,
  Elspeth −3, Ajani Unrelenting −3, Mass Polymorph / Synthetic Destiny). All fail the same test Blasphemous
  Act failed at founding: they kill the commander the plan runs through.
- **"Attacks a player alone"** (Yuriko Blade of the Mighty, Jiang Yanggu) — Cap usually does attack alone,
  but see Traps for why Yuriko turns off the deck.
- **New Equipment:** only Warrior's Blades ({2}{R}{W}, MV 4) and Medic's Kitesail ({2}, MV 2) are
  on-colour. Warrior's Blades is red **and** white — checked against the deck's protection gear:
  Sword of Feast and Famine (pro B/G) and Commander's Plate (pro non-identity colours) cannot strip it, so
  no CR 702.16d conflict.
- **Tokens (SP/tokens.md):** Vraska's *Sculpture Treasure* is a 1/1 artifact **creature** token that sacs
  for any-colour mana; Cadet is a 2/2 Wizard Soldier. Neither carries Equipment usefully, but both count
  as artifacts/creatures where relevant.

---

## Classification table — all 215 cards

Verdict key: **MAIN** = would displace a named card in the 100 · **SIDE** = bench-worthy, displaces named
below · **NO** = pass · **IN** = reprint of a card already in the 100.

### White (#1–55)

| # | Name | MV | New/Reprint | Verdict | Reason |
|---|---|---|---|---|---|
| 1 | Guiding Hydra | 1 | NEW | NO | +1/+1-counter spreader on an X body; the deck has no counters plan and Cap wants Equipment, not counters |
| 2 | Liliana the Faultless | 1 | NEW | NO | Hexproof costs {1}, a tap AND a discard, and she's summoning-sick the turn you need it; Swiftfoot/Super-Soldier do it free |
| 3 | Loyal Tutor | 1 | NEW | NO | Tutors a planeswalker; the deck runs none |
| 4 | Path to Exile | 1 | REPRINT | IN | Already in the 100 (reprint) |
| 5 | Secure the Wastes | 1 | REPRINT | NO | Go-wide tokens; no token payoff, and X/1s don't carry Throw |
| 6 | Swords to Plowshares | 1 | REPRINT | IN | Already in the 100 (reprint) |
| 7 | Academic Ascent | 2 | NEW | NO | One-shot +2/+2 flying trick; Jace token unused here |
| 8 | Ajani Resolute | 2 | NEW | NO | Lifegain planeswalker with no lifegain engine behind it (Collar/Shadowspear are incidental) |
| 9 | Campus Crier | 2 | NEW | NO | Vanilla 3/1 + graveyard empower; no planeswalker plan |
| 10 | Enlightened Confidant | 2 | REPRINT | NO | Surveil-on-lifegain value; lifelink is incidental here, not an engine |
| 11 | Gideon's Memorial | 2 | NEW | NO | Token anthem + planeswalker-only mana; the channel mode is a worse Eiganjo |
| 12 | Grand Crescendo | 2 | REPRINT | NO | X=0 is a {W}{W} Flawless Maneuver; the real one is free off the commander and Boros Charm covers all permanents |
| 13 | Martial Coup | 2 | REPRINT | NO | Trap: X≥5 destroys all other creatures — kills Cap (deck-brain §1.3, the Blasphemous Act precedent) |
| 14 | Predictive Preparations | 2 | NEW | NO | Counters on two creatures; no counters payoff |
| 15 | Prophesied End | 2 | NEW | NO | 2-mana instant kill that often draws them a card; Path/Swords are 1 mana and cleaner |
| 16 | Refute Destiny | 2 | NEW | NO | Only green or blue targets |
| 17 | Repurposed Enforcer | 2 | NEW | NO | 3/2 attacker feeding a Jace token; no planeswalker plan |
| 18 | Skrelv's Hive | 2 | REPRINT | NO | Toxic Mites that can't block; off-plan and bleeds you |
| 19 | Staff of the Storyteller | 2 | REPRINT | NO | Token-count draw engine; the deck makes almost no tokens |
| 20 | Surgical Precision | 2 | NEW | NO | Sorcery removal limited to toughness ≥4, or a 2-mana cantrip |
| 21 | Teyo, Lightshield Expert | 2 | NEW | **SIDE** | Flash 2-mana hexproof on any permanent you control (Cap OR a key Equipment) + a counter; instant-speed save, doesn't stop wipes |
| 22 | Tomik, Orzhov Lawmage | 2 | NEW | NO | Flier that grants flying only to +1/+1-counter creatures; the PW clause is dead |
| 23 | Unflinching Hortimancer | 2 | NEW | NO | Lifegain-counter 2-drop; no engine |
| 24 | White Sun's Twilight | 2 | REPRINT | NO | Trap: X≥5 destroys all other creatures incl. Cap; Mites can't block |
| 25 | Danitha, Sword of Hope | 3 | NEW | **SIDE** | Second Sram: draws on an Equipment cast OR a spell targeting your creature (Serum, Boros Charm DS mode), but once per turn and at MV3 |
| 26 | Flawless Maneuver | 3 | REPRINT | IN | Already in the 100 (reprint) |
| 27 | Generous Revival | 3 | NEW | NO | Reanimates MV≤3 creatures; the deck's losses are Equipment and Cap (command zone), not 3-drops |
| 28 | Germinate Recruits | 3 | NEW | NO | Cadets per life gained this turn; lifegain is incidental |
| 29 | Graft Surgeon | 3 | NEW | NO | 3/3-ish vanilla; counters pass-on has no target that wants them |
| 30 | Koth of the Homestead | 3 | NEW | NO | Landfall lifegain/counters; no plan for either |
| 31 | Lyra, Archangel of Dawn | 3 | NEW | NO | Angel-counter lifegain payoff; wrong tribe/plan |
| 32 | Memory Trap | 3 | NEW | NO | Sorcery-speed O-ring; the deck's removal is 1-mana instant exile plus Argentum/Ultima/Meteor on the stick |
| 33 | Rescue Girl, First Responder | 3 | NEW | NO | Own-turn-only bounce of your own permanent; recasting a 7-drop Equipment to re-fire its ETB is too mana-hungry for a Throw deck |
| 34 | Shatterwing Pegasus | 3 | NEW | NO | Flier with a {4}{W} anthem |
| 35 | Stroke of Midnight | 3 | REPRINT | NO | Same slot as Generous Gift at the same cost/speed; Gift also hits LANDS (Maze of Ith / Kor Haven are the voltron hosers) — substitute, not an upgrade |
| 36 | Teferi's Reproach | 3 | NEW | NO | Phases out an opponent and makes them immune until their turn — a fog/political card, not a Cap card |
| 37 | Way of the Mentor | 3 | NEW | NO | Jace-token enchantment; no planeswalker plan |
| 38 | Yoshimaru, Beloved Companion | 3 | NEW | NO | Counter doubler with no counters; {6} counter on a legend is a mana sink the Throw competes with |
| 39 | Your Fate Ends Here | 3 | NEW | NO | 3-mana instant kill (MV≥3 only); strictly behind Path/Swords/Dispatch |
| 40 | Flickering Hound | 4 | NEW | NO | Blinks a creature per creature spell; blinking Cap drops all his Equipment |
| 41 | Thalia, the Survivor | 4 | NEW | NO | Stax-lite: taxes opponents' noncreature spells {1} (rating input — Grand Abolisher already locks our turn); 3/4 lifelink body does nothing for Equipment |
| 42 | Way of the Healer | 4 | NEW | NO | Jace-token enchantment; no planeswalker plan |
| 43 | Yuriko, Blade of the Mighty | 4 | NEW | NO | Trap: 'during combat, players can't activate abilities' includes US — kills the Catch→Throw-in-response line, Genji's second-combat Throw and in-combat protection (CR 506.1: beginning of combat IS combat). Double strike when attacking alone is real but the deck already one-shots with Mjölnir. Symmetric combat lock — flag for the pod |
| 44 | Fateshaper Aspirant | 5 | NEW | NO | Can return a legendary Equipment from the graveyard, but a 5-mana 3/4 for it; Academy Ruins already recurs artifacts |
| 45 | Saheeli, Consul of Oversight | 5 | NEW | NO | Surveil-thopter maker; the deck surveils rarely |
| 46 | Sunfall | 5 | REPRINT | NO | Trap: exiles Cap with the rest (§1.3) |
| 47 | Dack Fayden, Helping Hand | 6 | NEW | NO | Gives opponents your creatures, goaded; off-plan at 6 mana |
| 48 | Elspeth, Sun's Champion | 6 | REPRINT | NO | Trap: −3 destroys power ≥4 — Cap is 4/4 before gear; +1 Soldiers don't help voltron |
| 49 | Hexhaven Battalion | 6 | NEW | NO | 6-mana tokens; landcycling is the only use |
| 50 | Kindred Judgment | 7 | NEW | NO | 7-mana wipe; naming Human/Hero saves Cap but it's 2 mana above Single Combat for a similar job |
| 51 | Ob Nixilis, the Ascended | 7 | NEW | NO | 7-mana wipe of tapped creatures + lifegain angels; off-plan |
| 52 | Overlord of the Mistmoors | 7 | REPRINT | NO | Token Avatar; no token plan |
| 53 | Serra's Emissary | 7 | REPRINT | NO | Naming Creature makes Cap unblockable-by-creatures, but a 7-mana 7/7 in a deck whose 7-drop slots are Throw payloads |
| 54 | Ghalta the Immovable | 9 | NEW | NO | Toughness-matters; Cap is 4/4 and gear adds power |
| 55 | Return to the Light Realms | 9 | REPRINT | NO | 9-mana mass reanimation; Academy Ruins/Forge Anew cover Equipment recursion cheaply |

### Blue (#56–101)

| # | Name | MV | New/Reprint | Verdict | Reason |
|---|---|---|---|---|---|
| 56 | Brainstorm | 1 | REPRINT | NO | Cantrip in a deck with no shuffle density beyond 4 fetches; low blue count |
| 57 | Diviner of Victory // Unwind History | 1 | NEW | NO | 1/1 surveil body; prepare spell bounces MV≤3 creature — tempo, not voltron |
| 58 | Occult Epiphany | 1 | REPRINT | NO | Rummage-for-Spirits; off-plan |
| 59 | Perfected Theory | 1 | NEW | NO | Base P/T trick; weak removal proxy |
| 60 | Unsummon | 1 | REPRINT | NO | Tempo bounce; Otawara already covers bounce on a land slot |
| 61 | Yuriko, Hope from the Shadows | 1 | NEW | NO | Flash 1/1 debuff/surveil; no graveyard size |
| 62 | Countersculpt | 2 | NEW | NO | {U}{U}+{1} counterspell with no Jace to behold; the deck is W-heavy (U pips 7) |
| 63 | Cryotheory Adept | 2 | NEW | NO | Prowess 2/1 + graveyard stun; off-plan |
| 64 | Fblthp, Impossibly Lost | 2 | NEW | NO | Draw 2 when opponents take combat damage, then shuffles himself away; Cap connecting already wins |
| 65 | Geist of Saint Thalia | 2 | NEW | **SIDE** | Noncreature spells −{1} (all 21 Equipment + interaction), flying 1/2; does NOT touch equip or Throw, which is where the mana goes — Bureau Headmaster is the better version here |
| 66 | Icy Reception | 2 | NEW | NO | Soft counter / −5/−0; tempo |
| 67 | Precise Redaction | 2 | NEW | NO | Counters only white/black spells; too narrow |
| 68 | Proft, Consulting Detective | 2 | NEW | NO | Surveil payoff; the deck doesn't surveil |
| 69 | Samut, Tyrant of Naktamun | 2 | NEW | NO | Split second on our instants; the deck's instants don't need it |
| 70 | Surveillance Phantasm | 2 | NEW | NO | Defender flier unlocked by surveil |
| 71 | Tetsuko Umezawa, Fugitive | 2 | REPRINT | NO | Unblockable only for power/toughness ≤1; Cap is 4/4 |
| 72 | Theorist's Proxy | 2 | NEW | NO | Flash 0/3 Jace-empower; the uncounterable-sac is marginal |
| 73 | Arni, Humble Scribe | 3 | NEW | NO | Looter that untaps on creature ETB; low creature density |
| 74 | Brainsurge | 3 | REPRINT | NO | 3-mana Brainstorm; card selection, not advantage |
| 75 | Chandra, Chill of Compliance | 3 | NEW | NO | UU walker; surveil/mana modes don't serve Equipment |
| 76 | Cruel Calculations | 3 | NEW | NO | Draws off self-mill; no self-mill |
| 77 | Divining Duelist | 3 | NEW | NO | Flash tap/untap/loot 3/2; untapping a Brass Squire is cute but Cap Living Legend already does it |
| 78 | Infinite Coursework | 3 | NEW | NO | Sorcery-speed aura lockdown; removal elsewhere is better |
| 79 | Jace's Machinations | 3 | NEW | NO | Jace-token combat trick; no planeswalkers |
| 80 | Lyra, Tolarian Archangel | 3 | NEW | NO | Angel tokens on 3+ draws; the deck rarely draws 3 in a turn |
| 81 | Mindseeker Oculus | 3 | NEW | NO | 3-mana 2/1 + Jace token |
| 82 | Proteus Staff | 3 | REPRINT | NO | Polymorph removal/self-cheat; deck has few creatures worth hitting |
| 83 | Seasoned Cryomancer | 3 | REPRINT | NO | Rummage + stun; UU |
| 84 | Sphinx's Approach | 3 | NEW | NO | Sphinx-count card; draw two at instant speed is fair but off-role |
| 85 | Variable Chaser // Arc of Fortune | 3 | NEW | NO | Symmetric wheel on a 3-drop flier; refills opponents too |
| 86 | Way of the Cryomancer | 3 | NEW | NO | Jace-token enchantment; copies instants — not this deck |
| 87 | Fact or Fiction | 4 | REPRINT | NO | Instant card draw; Card Draw role is engine-based (Sram/Thor/Puresteel), a one-shot is weaker |
| 88 | Hapatra, the Desert Frost | 4 | NEW | NO | 4-mana stun ETB + {2}{U} untap; Cap Living Legend already untaps the tap-engines |
| 89 | Plan for All Outcomes | 4 | NEW | NO | 4-mana sorcery-speed tuck (owner's choice top/bottom); worse removal than in-deck |
| 90 | Protege's Awakening | 4 | NEW | NO | 4-mana Jace-6 + draw one |
| 91 | Sphinx of False Conclusions | 4 | NEW | NO | Flash flier looter; off-plan |
| 92 | The Theorist, Jace Beleren | 4 | REPRINT | **SIDE** | Draws a card on every opponent's draw step (+3/round) at 4 mana — the strongest raw draw engine in the pool; UU in a W-heavy deck and a planeswalker the table will attack |
| 93 | Traxos, Academy Guardian | 4 | NEW | NO | Prowess flier; fine body, no Equipment synergy |
| 94 | Jace, Reality Sculptor | 5 | NEW | NO | Jace alt-win needing 25 loyalty; not this deck |
| 95 | Undulating Witness | 5 | NEW | NO | Landcycler flier |
| 96 | Way of the Mind Sculptor | 5 | NEW | NO | Jace-token enchantment |
| 97 | Yargle, Goliath of Otaria | 5 | NEW | NO | Vanilla 3/9 |
| 98 | Mass Polymorph | 6 | REPRINT | NO | Mass Polymorph with ~15 creatures; exiles Cap |
| 99 | Ruric Thar, Biomagus | 6 | NEW | NO | 6-mana flier |
| 100 | Shark Typhoon | 6 | REPRINT | NO | Excalibur cast makes a 12/12 Shark (MV counts) — cute, but a 6-mana enchantment that isn't voltron |
| 101 | Synthetic Destiny | 6 | REPRINT | NO | Exiles your creatures incl. Cap |

### Red (#102–143)

| # | Name | MV | New/Reprint | Verdict | Reason |
|---|---|---|---|---|---|
| 102 | Ajani's Anguish | 1 | NEW | **SIDE** | X damage on ETB + team trample as a STATIC (can't be thrown off) — Cap at 14–28 power gets chump-blocked; trample now only comes from Kaldra/Shadowspear/Reaver Cleaver, which Catch must attach |
| 103 | Artifist Acumen | 1 | NEW | NO | Cantrip first-strike trick; Serum already grants first strike |
| 104 | Marwyn, the Clearcutter | 1 | NEW | NO | Sac an artifact/land to draw; the artifacts are the deck |
| 105 | Pompous Battlemage // Improvised Act | 1 | NEW | NO | 1/1 prowess + a copy of a rummage; off-plan |
| 106 | Blazing Crescendo | 2 | REPRINT | NO | Pump + impulse draw; fine, off-role |
| 107 | Eardrum Rattler | 2 | NEW | NO | Unblockable only for power ≤2 — never Cap |
| 108 | Essence Burn | 2 | NEW | NO | Only black/green targets |
| 109 | Gallia, the Merrymaker | 2 | NEW | NO | Haste for counter creatures; off-plan |
| 110 | Master of Barbs | 2 | NEW | NO | Throw is noncombat damage so it triggers, but +1/+0 team for a turn is negligible |
| 111 | No Admittance | 2 | NEW | NO | Sorcery Shock-plus; off-role |
| 112 | Samut, Hazoret's Champion | 2 | NEW | NO | Team haste; Swiftfoot/Dalakos/Arena of Glory/Kaldra already give Cap haste |
| 113 | Skilled Battlecarver | 2 | NEW | NO | Firebreathing 2/1 |
| 114 | Stingcaster Mage | 2 | REPRINT | NO | Flashback for a used instant (Swords/Boros Charm) on a 2/1; Teferi's Protection exiles itself; low value here |
| 115 | Tomik, Izzet Sparkmage | 2 | NEW | **SIDE** | +1 to each opponent-side target of every Throw (3 targets = +3), Mjölnir ETB, Boros Charm, Eiganjo; additive amplifier on the secondary plan only — never touches commander damage |
| 116 | Way of the Pyromancer | 2 | NEW | NO | Jace-token enchantment |
| 117 | Chandra's Emberling | 3 | NEW | NO | Noncreature-spell counter grower; not a Cap carrier |
| 118 | Command the Stage | 3 | NEW | NO | Cadet token maker |
| 119 | Cursed Mirror | 3 | REPRINT | NO | Rock that copies a creature for a turn |
| 120 | Fulminous Forte | 3 | NEW | NO | Flexible red removal, but Throw + Basilisk Collar is repeatable removal and white exile is 1 mana |
| 121 | Identity Echo | 3 | NEW | NO | Creature-roulette sink |
| 122 | Koth, the Geomancer | 3 | NEW | NO | Landfall pinger |
| 123 | Pia, Determined Rebuilder | 3 | NEW | NO | {5}{R} pump by artifact count; deck's mana goes to Throw |
| 124 | Pyre Rhymer // Molten Tide | 3 | NEW | NO | Mountain ritual; 4 Mountains-typed sources only |
| 125 | Way of the Warlord | 3 | NEW | NO | Jace-token enchantment |
| 126 | Wrath of the Bloodmane | 3 | NEW | NO | {1}{R} for 4 to a creature with Cap out — fine rate, but behind 1-mana white exile |
| 127 | Arni, Renowned Champion | 4 | NEW | NO | Pump on creature ETB; off-plan |
| 128 | Chandra, Torch of Defiance | 4 | REPRINT | NO | Good generic walker; no slot and not voltron |
| 129 | Curse-Marred Demon | 4 | NEW | NO | Trap-ish: tutor then discard AT RANDOM — with a small hand it discards the card you fetched |
| 130 | Heartstring Puller | 4 | NEW | NO | 3/1 + Cadet |
| 131 | Tetsuko Umezawa, Pursuer | 4 | NEW | NO | Double strike prowess body; Cap is the carrier |
| 132 | Violent Echoes | 4 | NEW | NO | 4-mana 6 damage to creature/PW; Jace excess unused |
| 133 | Awaken the Inferno | 5 | NEW | NO | 5-mana removal / landcycler |
| 134 | Draconic Visitor | 5 | NEW | NO | Turns Reaver Cleaver Treasures (the Throw fuel) into Dragons; 5-mana body |
| 135 | Jiang Yanggu, Alone | 5 | NEW | NO | Cap attacking alone gets loot + counters; counters are pointless here |
| 136 | Tether Technician | 5 | NEW | NO | 5-mana 4/5 + discard ping |
| 137 | Winter, Team Player | 5 | NEW | NO | Noncreature-cast team pump; not a Cap card |
| 138 | Ajani Unrelenting | 6 | NEW | NO | Trap: −3 deals 4 to each creature except your tokens — hits Cap |
| 139 | Kiora of Fire and Ashes | 6 | NEW | NO | 6-mana Dragon maker |
| 140 | Venser, Fervent Forger | 6 | NEW | NO | 6-mana flash copy effects; off-plan |
| 141 | Craterclaw Colossus | 7 | REPRINT | NO | RRR 7-drop |
| 142 | Face Yourself | 7 | NEW | NO | 7-mana copy their board for a turn |
| 143 | Akroma, Angel of Fury | 8 | REPRINT | NO | 8-mana Akroma |

### Multicolour (RU / RUW / RW / UW) (#144–166)

| # | Name | MV | New/Reprint | Verdict | Reason |
|---|---|---|---|---|---|
| 144 | Izzet Signet | 2 | REPRINT | NO | Talismans chosen over Signets (Talisman of Creativity is in); Signet needs {1} |
| 145 | Talisman of Creativity | 2 | REPRINT | IN | Already in the 100 (reprint) |
| 146 | Twinned Vision | 2 | NEW | NO | Cantrip with flashback; off-role |
| 147 | Clash of Elements | 3 | NEW | NO | 3-mana soft removal the owner controls |
| 148 | Frostbite Pyromental | 3 | NEW | NO | One-shot hasty 4/4 |
| 149 | Saheeli, Jewel of Avishkar | 4 | NEW | NO | Noncreature cast → Thopter at 4 mana; Vraska is the better on-colour version |
| 150 | Vraska, Soul of Stone | 3 | NEW | **SIDE** | 3-mana URW: every noncreature spell (45 in the list, 21 of them Equipment) makes a 1/1 artifact-creature Treasure — ramp for Throw/equip, metalcraft count, chump bodies |
| 151 | Whirlwind of Thought | 4 | REPRINT | NO | Cut 2026-09-09 for Captain America, Super-Soldier; grounds (4-colour pip cost, clunkiest card in the deck) re-checked and still hold |
| 152 | Solitary Cell | 2 | NEW | **SIDE** | 2-mana artifact O-ring (MV≤3 only) that counts for metalcraft (Mox Opal/Dispatch/Puresteel/Inventors' Fair); legendary-discard draw is a sometimes-mode |
| 153 | Charge the Sanctum | 3 | NEW | NO | Combat trick |
| 154 | Mabel, Valley Hero | 3 | NEW | NO | Counter placer on ETB |
| 155 | Windcrag Siege | 3 | REPRINT | **MAIN** | Mardu mode doubles every attack trigger: Argentum Armor (2 destroys/attack), Ultima Weapon (2 kills), Genji Glove (TWO extra combats = a third Catch → third Throw), Akiri (draw 2), Mighty Thor (2 blinks). Jeskai mode is a hasty lifelink body each upkeep, so it's never blank. Pilot's call vs Esper Sentinel — see Proposed swaps |
| 156 | Warrior's Blades | 4 | NEW | **SIDE** | New on-colour Equipment: ETB 3 to any target + 3 life (re-fires on Thor blink / Transmuter bounce, Hammer re-attaches), MV4 Throw payload; behind Swordsman's Steel in the MV4 slot |
| 157 | Tamiyo, Upriser Crowned | 6 | NEW | NO | 6-mana monarch flier; not the carrier |
| 158 | Azorius Signet | 2 | REPRINT | NO | Talisman of Progress was the WU rock chosen; Signet needs {1} |
| 159 | Fatehold Charm | 2 | NEW | NO | Modal charm; the bounce/pump modes are marginal here |
| 160 | Fatehold Chronologist // Peer Review | 2 | NEW | NO | 1/2 flier + a copy of a Cadet spell |
| 161 | Proctor of Potential | 2 | NEW | NO | Surveil-on-ETB recursive 3/1; off-plan |
| 162 | Talisman of Progress | 2 | REPRINT | **SIDE** | Already benched 2026-09-09 ('revisit if colour screw shows up'); reprint changes nothing |
| 163 | Prudent Fateseer // Peer Review | 3 | NEW | NO | Surveil team pump + Cadet copy |
| 164 | Denzilore Fatehold | 4 | NEW | NO | Surveil counters; the deck doesn't surveil |
| 165 | Desperate Futurescribe | 4 | NEW | NO | Combat pump flier |
| 166 | Semester Foreseer // Peer Review | 4 | NEW | NO | 4-mana 3/4 + Cadet copy |

### Colourless (#167–186)

| # | Name | MV | New/Reprint | Verdict | Reason |
|---|---|---|---|---|---|
| 167 | Currency Converter | 1 | REPRINT | NO | Rummage engine; no discard synergy |
| 168 | Eye of Jace | 1 | NEW | NO | Self-surveil clock; off-plan |
| 169 | Sol Ring | 1 | REPRINT | IN | Already in the 100 (reprint) |
| 170 | Afterthought Sentry | 2 | NEW | NO | 2/2 graveyard hate |
| 171 | Arcane Signet | 2 | REPRINT | IN | Already in the 100 (reprint) |
| 172 | Fellwar Stone | 2 | REPRINT | NO | Arcane Signet + Talismans cover the 2-slot; colour depends on opponents |
| 173 | Karn, Argent Defender | 2 | NEW | NO | Trap + stax flag: 'artifacts and creatures entering don't cause abilities to trigger' switches off Hammer of Nazahn, Sigarda's Aid, Puresteel, Mighty Thor draw, Stoneforge, Meteor Sword, Mjölnir, Swordsman's Steel and Mithril Coat |
| 174 | Living Library | 2 | NEW | NO | 0/4 wall with a 6-mana tuck |
| 175 | Medic's Kitesail | 2 | NEW | **SIDE** | 2-mana flying Equipment (+1/+0, gain 1 on attack); a second evasion key behind Brotherhood Regalia/Dalakos — MV2 is poor Throw fodder |
| 176 | The Echoverse Fulcrum | 2 | NEW | NO | Loot + a {5} wipe that kills Cap |
| 177 | Chromatic Lantern | 3 | REPRINT | NO | 3-mana fixer; the manabase is already fixed |
| 178 | Keeper of the Quiet Hour | 3 | NEW | NO | 3/2 artifact + Jace token |
| 179 | Murmuring Volume | 3 | NEW | NO | 3-mana rock + rummage; above the 2-mana rock slot |
| 180 | Traxos, Scourge Eternal | 4 | NEW | NO | Untaps on artifact/creature cast; a 5/4 beater, not a carrier |
| 181 | Archive Arbiter | 6 | NEW | NO | 6-mana flier with Disenchant ETB |
| 182 | Ginger, Queen of Sweets | 6 | NEW | NO | 6-mana monarch artifact creature |
| 183 | Omnath, Locus of the Void | 7 | NEW | NO | Landfall mana; off-plan |
| 184 | Darksteel Angel | 9 | NEW | NO | 9-mana lock piece |
| 185 | Emrakul, the Exigent Doom | 10 | REPRINT | NO | 10-mana Eldrazi |
| 186 | Memnarch, the Warden | 10 | NEW | NO | 10-mana artifact creature — not an Equipment, so it isn't Throw fodder |

### Lands (#187–215)

| # | Name | MV | New/Reprint | Verdict | Reason |
|---|---|---|---|---|---|
| 187 | Battlefield Forge | 0 | REPRINT | IN | Already in the 100 (reprint) |
| 188 | Clifftop Retreat | 0 | REPRINT | NO | Checklands were passed over 2026-09-09 for painlands (free {C} mode, untapped turns 1–2); grounds still hold |
| 189 | Command Tower | 0 | REPRINT | IN | Already in the 100 (reprint) |
| 190 | Dedicated Commons | 0 | NEW | NO | Enters tapped unless you control a planeswalker — the deck runs none |
| 191 | Deserted Beach | 0 | REPRINT | NO | Slowland; tapped on turns 1–2 exactly when Sol Ring → cheap Equipment wants it |
| 192 | Exotic Orchard | 0 | REPRINT | NO | Opponent-dependent colours; the manabase is on-colour already |
| 193 | Fabled Passage | 0 | REPRINT | NO | Basic-only fetch that enters tapped early; Prismatic Vista is already the basic fetch |
| 194 | Fatehold Annex | 0 | NEW | NO | Tapped unless planeswalker |
| 195 | Glacial Fortress | 0 | REPRINT | NO | Checkland — same 2026-09-09 grounds as Clifftop Retreat |
| 196 | Hall of Echoes | 0 | NEW | NO | {5}: become a copy of Cap with the legend rule off — the copy has no Equipment to Throw; colourless land in a 3-colour deck |
| 197 | Hexhaven Dueling Arena | 0 | NEW | NO | Only prepares prepare-creatures; the deck has none |
| 198 | Innovative Commons | 0 | NEW | NO | Tapped unless planeswalker |
| 199 | Island | 0 | REPRINT | NO | Basic count (2 Islands) is a manabase question, not a set-review one |
| 200 | Kher Keep | 0 | REPRINT | NO | Kobold token land |
| 201 | Mountain | 0 | REPRINT | NO | Basic count (2 Mountains) is a manabase question, not a set-review one |
| 202 | Mystic Gate | 0 | REPRINT | NO | Filter land; colourless-only without a second source |
| 203 | Path of Ancestry | 0 | REPRINT | NO | Enters tapped; scry only on Human/Soldier/Hero creature spells |
| 204 | Perilous Landscape | 0 | REPRINT | NO | Tapped-fetch colourless land |
| 205 | Plains | 0 | REPRINT | NO | Basic count (3 Plains) is a manabase question, not a set-review one |
| 206 | Prairie Stream | 0 | REPRINT | NO | Tapped unless 2+ basics (the deck runs 7); typed but the untapped-dual slots are full |
| 207 | Radiant Summit | 0 | REPRINT | NO | Same as Prairie Stream (Mountain Plains) |
| 208 | Reflecting Pool | 0 | REPRINT | NO | Colour-copy land; no gain over the existing duals |
| 209 | Restless Anchorage | 0 | REPRINT | NO | Enters tapped; manland off-plan |
| 210 | Restless Spire | 0 | REPRINT | NO | Enters tapped; manland off-plan |
| 211 | Room of Refuge | 0 | NEW | NO | Tapped any-colour land with a {5} counter sink |
| 212 | Shivan Reef | 0 | REPRINT | IN | Already in the 100 (reprint) |
| 213 | Sulfur Falls | 0 | REPRINT | NO | Checkland — same 2026-09-09 grounds |
| 214 | Theorist's Sanctum | 0 | NEW | NO | Tapped Island unless you behold a Jace |
| 215 | Turbulent Shore | 0 | NEW | NO | Plains Island that's tapped until opponents have 8+ lands — tapped exactly on the turns that matter |

---

## Proposed swaps

### MAIN — Windcrag Siege (FRC reprint) in, Esper Sentinel out — *pilot's call*

**Oracle (verified):** `{1}{R}{W}` Enchantment — *As this enchantment enters, choose Mardu or Jeskai.*
*• Mardu — If a creature attacking causes a triggered ability of a permanent you control to trigger, that
ability triggers an additional time.* *• Jeskai — At the beginning of your upkeep, create a 1/1 red Goblin
creature token. It gains lifelink and haste until end of turn.*

**What Mardu mode does in this list** — every attack trigger in the 100, checked from the deck's oracle text:

| In-deck card | Its attack trigger | Under Siege |
|---|---|---|
| Genji Glove | *"Whenever equipped creature attacks, if it's the first combat phase of the turn, untap it. After this phase, there is an additional combat phase."* | Both instances resolve inside combat 1, so the intervening-if passes twice (CR 603.4) → **two** extra combat phases (CR 500.8). Each extra phase has its own beginning-of-combat step (CR 506.1, LEDGER 2026-09-08) → **a third Catch, a third Throw per turn**. In the extra combats the Glove's own check fails, so it stops there — no loop. |
| Argentum Armor | *"Whenever equipped creature attacks, destroy target permanent."* | 2 permanents per attack — and it has no first-combat clause, so with the Glove it fires in **every** combat. |
| Ultima Weapon | *"Whenever equipped creature attacks, destroy target creature an opponent controls."* | 2 creatures per attack, same every-combat note. |
| Akiri, Fearless Voyager | *"Whenever you attack a player with one or more equipped creatures, draw a card."* | Draw 2 per attack (the Isshin ruling covers "whenever you attack" triggers — LEDGER 2026-09-24). |
| The Mighty Thor, Jane Foster | *"Whenever The Mighty Thor attacks, exile up to one target nontoken artifact or creature, then return it…"* | Two blinks — e.g. Meteor Sword twice = two "destroy target permanent" ETBs, Hammer of Nazahn re-attaching each time. |
| Super-Soldier Serum | *"Whenever enchanted creature attacks or blocks, attach any number of target Equipment…"* | No gain (already "any number"). |
| Fighter Class L3 | forced block | Two creatures forced to block — marginal lure into Basilisk Collar deathtouch. |

**Five real payoffs**, all findable: Genji/Argentum/Ultima are Equipment the tutor suite (Stonehewer Giant
puts one onto the battlefield *attached*, Steelshaper's Gift, Stoneforge, Fighter Class, Enlightened Tutor,
Axgard Armory, Inventors' Fair) can fetch on demand. Vigilance for the extra combats comes from Excalibur and
Super-Soldier Serum; the first Glove instance untaps Cap.

**§2.5 — is it a "blank" multiplier?** That is the real risk for a bare doubler, and it is why this is the
pilot's call rather than a clean upgrade. Two things cut against it: (1) it is **modal** — with no payoff
out, Jeskai mode is a hasty lifelink body every upkeep (a spare Equipment carrier if Cap is answered, and
a chump blocker); (2) the payoffs are the deck's best cards and are tutorable. Mode is locked on entry, so
cast it after seeing the board.

**Role table — Card Draw / Engines (the role Siege would join), scored against the current 100:**

| Card | MV | What it produces | Needs | Also does | Rank |
|---|---|---|---|---|---|
| Sram, Senior Edificer | 2 | 1 card per Equipment/Aura cast, uncapped | 22 Equipment/Auras (present) | — | 1 |
| The Mighty Thor, Jane Foster | 3 | 1 card per Equipment ETB + attack blink | present | Siege payoff | 2 |
| Windcrag Siege *(candidate)* | 3 | ×2 on five attack engines; a third Throw/turn with Genji | one of 5 payoffs on Cap/board | Jeskai fallback body; enchantment survives artifact + creature wipes | 3 |
| Buster Sword | 3 | draw + free cast on combat damage | Cap connecting | MV3 payload | 4 |
| Akiri, Fearless Voyager | 3 | 1 card per attack with equipped creature | present | {W} unattach + indestructible (protection); Siege payoff | 5 |
| **Esper Sentinel** | 1 | 1 card per opponent's first noncreature spell *unless they pay {1}* | nothing | artifact for metalcraft (already trivially on at 30 artifacts) | 6 |

**Deciding axis (§2.3): engine output per turn once the deck is set up.** Sentinel's draw is a tax each
opponent can switch off for {1} — it is strongest on turns 1–3 and fades exactly when the voltron deck is
doing its thing; Siege is weakest early and strongest on the turns the deck wins. The Sentinel is the only
card in the role that does nothing for the Equipment plan.

**Cost-out (§1.2):** {1}{R}{W} flat — no reducer in the list touches an enchantment (Bureau Headmaster is
Equipment-only; Zirda/Training Grounds are activated abilities). Esper Sentinel costs {W}.

**Self-hits (§1.3):** none found. Mardu mode reads *"a permanent **you** control"*, so it never doubles an
opponent's attack triggers. It is not an Equipment, so it is untouched by the deck's own artifact
interactions, and it survives Single Combat / Winds of Abandon.

**Curve:** MV≤2 29 → 28 · MV≤3 50 → 50 · avg MV (nonland, printed) 2.875 → 2.906. One cheap card traded for
a 3-drop — name it to the pilot, who watches the estimated win turn.

**Bracket:** not a Game Changer; GCs stay 3/3. No combo created (the Glove's intervening-if caps it at two
extra combats per turn; two Sieges don't exist in singleton).

**Alternatives considered for the cut:**
- **A land (35 → 34).** Founding log's open question — but Blackblade Reforged holds first claim on that slot
  and there is still no play report showing flood.
- **Akiri / Mighty Thor** — they are Siege's payoffs; cutting a payoff to seat its multiplier is backwards.
- **Commander's Plate** (weakest rider on the Throw axis, MV 1) — it is also Cap's pro-black/green
  protection; a different role, so ranking it against an engine would be comparing across roles (§2.1).

---

## Bench (SIDE) — with what each would displace

| # | Card | Displaces | Why it's bench, not main |
|---|---|---|---|
| 92 | The Theorist, Jace Beleren | Esper Sentinel (if Siege is declined) | Strongest raw draw in the pool: +1 card on **every** opponent's draw step (+3 a round) at 4 mana. UU in a W-heavy list (U pips 7) and a planeswalker the table will attack. |
| 25 | Danitha, Sword of Hope | Esper Sentinel / Akiri | A once-per-turn Sram that also triggers on Super-Soldier Serum and Boros Charm's double-strike mode (they target your creature). §2.5: a second draw engine is consistency, not waste — its only problem is MV3 for a capped trigger. |
| 150 | Vraska, Soul of Stone | Talisman of Conviction | Each of the 45 noncreature spells makes a 1/1 artifact-creature Treasure: ramp that scales with the Equipment you were casting anyway. Exact {U}{R}{W} on turn 3 is the cost. |
| 156 | Warrior's Blades | behind Swordsman's Steel in the MV4 payload slot | ETB 3 to any target + 3 life, re-fired by Thor's attack blink or Master Transmuter bounce (Hammer of Nazahn re-attaches). Throw for 4. Steel's draw-per-Equipment is the better MV4 card. |
| 115 | Tomik, Izzet Sparkmage | a cheap creature slot (Esper Sentinel) | +1 per opponent-side target: a three-way Throw deals +3. Additive, on the **secondary** plan only — never touches commander damage. This is the "damage amplifier" hook the deck's memory mentions, in its cheapest form. |
| 102 | Ajani's Anguish | add-on if chump blocks become the failure mode (vs Commander's Plate) | Team trample as a **static** that can't be thrown off, plus X damage on ETB. Today trample only comes from Kaldra / Shadowspear / Reaver Cleaver, which Catch has to attach first. |
| 175 | Medic's Kitesail | Commander's Plate | Flying for {2} + equip {2}: a spare evasion key behind Brotherhood Regalia (unblockable + ward) and Dalakos. MV 2 is near-worthless Throw fodder. |
| 152 | Solitary Cell | a removal slot (Generous Gift is the closest cost) | 2-mana artifact O-ring capped at MV ≤3; counts toward metalcraft. The cap is why it's behind the unconditional removal. |
| 21 | Teyo, Lightshield Expert | Swiftfoot Boots' job, if spot removal on Cap is the recurring loss | Flash hexproof on any permanent you control — Cap *or* a key Equipment. Does nothing against wipes, which the protection suite is built for. |
| 65 | Geist of Saint Thalia | behind Bureau Headmaster | Noncreature spells −{1} (all Equipment + interaction) but never equip or Throw, where this deck's mana goes. |
| 162 | Talisman of Progress | Axgard Armory (the flagged tapped land) | Already benched 2026-09-09 — "revisit if colour screw shows up". The reprint changes nothing. |

---

## Traps — read these before they look tempting

- **Yuriko, Blade of the Mighty (#43)** — *"During combat, players can't cast spells or activate abilities
  that aren't mana abilities."* That includes **you**, and the beginning-of-combat step **is** combat
  (CR 506.1). It switches off: the founding Catch → hold priority → Throw line (recoverable by throwing in
  main phase 1), Genji Glove's second-combat Throw (**not** recoverable — there is no main phase between
  extra combats), Throw-in-response-to-removal during combat, and Teferi's Protection / Flawless Maneuver /
  Boros Charm / Deflecting Swat / Akiri's unattach during combat. The "double strike when attacking alone"
  half is real, but Excalibur + Mjölnir already one-shots. Also a symmetric combat lock — **stax flag** for
  the pod (rating input, not the reason).
- **Karn, Argent Defender (#173)** — *"Artifacts and creatures entering the battlefield don't cause abilities
  to trigger."* Turns off Hammer of Nazahn, Sigarda's Aid's attach, Puresteel / Mighty Thor draws,
  Stoneforge, Meteor Sword, Mjölnir's ETB, Swordsman's Steel and Mithril Coat's auto-attach. **Stax flag** too.
- **Martial Coup / White Sun's Twilight (X≥5), Sunfall, The Echoverse Fulcrum, Elspeth −3, Ajani Unrelenting
  −3, Mass Polymorph, Synthetic Destiny** — every one kills or exiles Cap. Same grounds as the founding
  Blasphemous Act cut.
- **Curse-Marred Demon (#129)** — tutors *then discards at random*; with a small hand it throws away the
  card it fetched.
- **Draconic Visitor (#134)** — replaces artifact tokens with Dragons, so The Reaver Cleaver's Treasures (the
  Throw fuel) become 5/5s instead of mana.
- **Stroke of Midnight (#35)** looks like a strict Generous Gift upgrade (1/1 token, not 3/3). It isn't here:
  Gift also destroys **lands**, and Maze of Ith / Kor Haven-style lands are the classic voltron hosers.
  Chump-blocking Cap works the same with a 1/1 or a 3/3.
- **Thalia, the Survivor (#41)** — taxes opponents' noncreature spells: **stax flag** (mild). Passed on
  plan, not on the flag.

---

## Open rules questions

- None blocking. The Siege + Genji Glove count (two extra combats, not three or more) rests on CR 603.2d,
  603.4 and 500.8 read directly; worth a one-line confirmation from `mtg-rules-expert` before the pilot
  relies on it at the table.

**Confirmed 2026-09-28 by `mtg-rules-expert`** (CR 603.2d, 603.4, 500.8, 505.1a): exactly **two** extra
combat phases, run back to back with no main phase between, and the Glove does not trigger again in
them. **One catch the table above glosses:** the Glove's *untap* only happens in combat 1. Cap attacks
untapped in combat 2, but after attacking there he is **tapped for combat 3** unless something gives
vigilance or untaps him. **Catch** is a beginning-of-combat trigger, so it still fires three times and
the third Throw is unaffected — but Argentum Armor's and Ultima Weapon's *attack* triggers only get
combats 1 and 2 (four destroys, not six) unless Cap can attack a third time.
