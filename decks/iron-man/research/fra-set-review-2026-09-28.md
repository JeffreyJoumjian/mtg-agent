# FRA + FRC set review: Iron Man (Tony Stark), 2026-09-28

**Sets:** Reality Fracture (FRA) and Reality Fracture Commander (FRC), both releasing 2026-10-02.

**Method:** deck-brain SKILL.md. I read each verdict's oracle text from the verified Scryfall pool
(`data/fra-candidates-iron-man.json` + `data/frc-candidates-iron-man.json`, rendered to the review
scratch pool), never from memory. Each card is costed in this deck's mana: the reducers read
*"artifact spells"*, and the commander's combat trigger reads *"an artifact card from your hand"*,
so an off-type card pays the **double tax** (LEDGER 2026-08-20). Each is also checked against the
deck's own board and triggers. In-deck texts come from the pre-built deck dump. Rules are checked
against `rules/sections/`: CR 118.7a (reducers only touch generic mana), CR 722.3c (prepared
copies), CR 725.2 (monarch), CR 301.5c (Equipment tokens that are creatures can't equip).

**Lists:** `v3` is the newest list: V3 was built 2026-08-21 and has had every change since, the last
on 2026-09-10 (Marvin). **All proposals target v3.** `main` (V1) and `v2` are older A/B baselines.
They get verdicts, but I propose no swaps into them.

**Field lens:** unavailable. EDHREC has no FRA/FRC data until the sets release, so §2.2's second
instrument is skipped rather than guessed.

**Bracket:** FRA and FRC contain **no Game Changers**. V3 stays at 3/3 whatever is added.

## Pool

130 FRA + FRC cards are commander-legal and fit Izzet {U}{R} identity (99 FRA + 31 FRC). 93 are
new; 37 are reprints (flagged `REPRINT`, still evaluated as candidates). 8 are already in all three
lists.

## Result

| List | MAIN | SIDE | IN (already run) | NO |
|---|---|---|---|---|
| v3 (target) | **1** | 3 | 8 | 118 |
| v2 | 0 | 3 | 8 | 119 |
| main | 0 | 3 | 8 | 119 |

- **MAIN (v3):** Geist of Saint Thalia in, Cloud Key out.
- **SIDE:** Craterclaw Colossus, The Echoverse Fulcrum, and Archive Arbiter (main and v3 only;
  v2 already runs Meteor Sword). v2 also benches Geist.
- **Traps:** Karn, Argent Defender and Draconic Visitor.

---

## Set mechanics as they matter to this deck

- **Prepare (24 in the set, 6 in this pool).** Casting a prepared copy is a real cast, but the copy *"has only the
  characteristics of that permanent's prepare spell"* (CR 722.3c). Every prepare copy is therefore
  a non-artifact instant or sorcery at full price: no reducer, no free deploy. The deck has no
  prepare creatures, so **Hexhaven Dueling Arena is blank text**.
- **Empower Jace (15 pool cards).** Creates or grows a **planeswalker token** — Jace with
  *"−1: Surveil 1"* and *"−3: Draw a card"*, no printed loyalty. The deck has no Jaces and no
  planeswalker payoffs. The three cards that key off a Jace or a planeswalker (Innovative Commons,
  Theorist's Sanctum, Countersculpt's behold) are all worse here than their plain equivalents.
- **Surveil (20 pool cards).** Nothing in the list pays off surveil. It's filtering, not cards.
- **Tokens.** Thopter, Myr and Gingerbrute tokens are **artifact creatures**. They feed Fateful
  Discovery, Urza, Steel Overseer and Adaptive Omnitool's count. **Cadet is not an artifact.**
- **Silent Arbiter (v3) blanks every attack trigger except the commander's.** This is the same
  miss recorded on 2026-09-09 (Iron Man, Titan of Innovation). It rules out Memnarch, Sphinx of
  False Conclusions, Frostbite Pyromental, Traxos, Scourge Eternal and similar attack-trigger cards.
- **Unwinding Clock (v3) re-prices every repeatable ability** (LEDGER 2026-09-02). It is what makes
  three pool cards interesting at all: Hapatra's no-tap-cost untap, Archive Arbiter rebought by
  Master Transmuter, and Craterclaw Colossus put in by Transmuter at instant speed.
- **Two cards read like upgrades and are the opposite.** Karn, Argent Defender switches off the
  deck's ETB engine. Draconic Visitor turns every artifact token into a non-artifact Dragon. Both
  are under **Traps** below.

---

## Classification table — all 130

Verdicts per list: **MAIN** = displace a named card now · **SIDE** = bench with a named
displacement · **IN** = already in that list · **NO** = pass.

### Blue

| # | Name | MV | New? | main | v2 | v3 | Reason |
|---|---|---|---|---|---|---|---|
| 1 | Brainstorm | 1 | REPRINT | NO | NO | NO | Cantrip that puts two back; the deck deploys from hand and has no top-of-library payoff. Non-artifact instant, no reducer |
| 2 | Diviner of Victory // Unwind History | 1 | NEW | NO | NO | NO | 1/1 whose prepare copy is a sorcery bounce (MV ≤3, opponent's creature). The copy is a non-artifact spell at full cost (CR 722.3c) |
| 3 | Occult Epiphany | 1 | REPRINT | NO | NO | NO | Draw X then discard X is filtering, not card advantage; V3's draw role is its fullest |
| 4 | Perfected Theory | 1 | NEW | NO | NO | NO | Sets base P/T to 1/1 or 4/5. The commander's back face is already 5/5, so the 4/5 mode shrinks him |
| 5 | Unsummon | 1 | REPRINT | NO | NO | NO | Into the Flood Maw is the same {U} bounce, with the gift mode as upside |
| 6 | Yuriko, Hope from the Shadows | 1 | NEW | NO | NO | NO | −X/−0 or surveil 2 on a 1/1; the deck has no graveyard plan |
| 7 | Countersculpt | 2 | NEW | NO | NO | NO | No Jace to behold, so it costs {1}{U}{U}: a Counterspell that also makes a surveil token. Strictly behind Counterspell and Mana Drain |
| 8 | Cryotheory Adept | 2 | NEW | NO | NO | NO | 2/1 prowess plus a graveyard stun for {3}{U}. Off-plan |
| 9 | Fblthp, Impossibly Lost | 2 | NEW | NO | NO | NO | Draws two once when you connect, then *"Fblthp's owner shuffles him into their library"*. A one-shot on a non-artifact body |
| 10 | Geist of Saint Thalia | 2 | NEW | NO | **SIDE** | **MAIN** | {1}{U} 1/2 flier: *"Noncreature spells you cast cost {1} less."* A turn-2 reducer that also discounts the double-tax cards (Fateful Discovery, Thopter Spy Network, Fabricate, Chaos Warp, Chandra's Ignition). Displaces Cloud Key in V3; v2 is the A/B baseline; main has no reducer role. See Proposed swaps |
| 11 | Icy Reception | 2 | NEW | NO | NO | NO | Soft counter (*"unless its controller pays {3}"*) or −5/−0. The counter suite is hard counters |
| 12 | Precise Redaction | 2 | NEW | NO | NO | NO | Counters white or black spells only |
| 13 | Proft, Consulting Detective | 2 | NEW | NO | NO | NO | Scry/surveil payoff. The deck scries only off Simulacrum Synthesizer and surveils only off Thundering Falls |
| 14 | Samut, Tyrant of Naktamun | 2 | NEW | NO | NO | NO | Gives your instants and sorceries split second. The deck has nine and wins with permanents |
| 15 | Surveillance Phantasm | 2 | NEW | NO | NO | NO | Defender 2/3 that needs a surveil to attack |
| 16 | Tetsuko Umezawa, Fugitive | 2 | REPRINT | NO | NO | NO | Unblockable only for power or toughness ≤1. The commander is a 5/5 |
| 17 | Theorist's Proxy | 2 | NEW | NO | NO | NO | 0/3 flash and a Jace token that draws with −3. Non-artifact value chaff |
| 18 | Arni, Humble Scribe | 3 | NEW | NO | NO | NO | Looter that untaps when a nontoken creature enters. Loot is selection, and it's non-artifact |
| 19 | Brainsurge | 3 | REPRINT | NO | NO | NO | Brainstorm plus one card at {2}{U}; same grounds as Brainstorm |
| 20 | Chandra, Chill of Compliance | 3 | NEW | NO | NO | NO | Non-artifact 3-mana walker. Its mana +1 only pays for noncreature spells and its −6 emblem is five turns away |
| 21 | Cruel Calculations | 3 | NEW | NO | NO | NO | Draws only as many cards as were milled this turn, and the deck mills nothing |
| 22 | Divining Duelist | 3 | NEW | NO | NO | NO | One-shot tap / untap / loot on a 3/2 flash. Untapping the commander once is Thousand-Year Elixir's job, and Elixir repeats |
| 23 | Infinite Coursework | 3 | NEW | NO | NO | NO | Sorcery-speed Aura that neutralises one creature. A one-shot, and the Aura is removable |
| 24 | Jace's Machinations | 3 | NEW | NO | NO | NO | {2}{U} for a Jace token with 8 loyalty: about two draws over two turns. No Jace payoffs |
| 25 | Lyra, Tolarian Archangel | 3 | NEW | NO | NO | NO | Near-miss. V3 really does draw 3+ on most turns (Insight Engine, The One Ring and Mind's Eye off Unwinding Clock), so *"at the beginning of each end step"* makes Angels often. But it's non-artifact {1}{U}{U} (double tax), the Angels aren't artifacts, and Silent Arbiter keeps them home. Revisit if the deck wants flying blockers |
| 26 | Mindseeker Oculus | 3 | NEW | NO | NO | NO | 2/1 plus a Jace token with 4 loyalty. Non-artifact |
| 27 | Proteus Staff | 3 | REPRINT | NO | NO | NO | Sorcery speed. Aimed at an opponent's creature it's a reroll: they get the next creature in their library. Not removal |
| 28 | Seasoned Cryomancer | 3 | REPRINT | NO | NO | NO | Loot two plus stun on a non-artifact UU 3-drop |
| 29 | Sphinx's Approach | 3 | NEW | NO | NO | NO | Instant Divination; the Sphinx clause needs five copies |
| 30 | Variable Chaser // Arc of Fortune | 3 | NEW | NO | NO | NO | The prepare spell is a symmetric wheel that refills every opponent |
| 31 | Way of the Cryomancer | 3 | NEW | NO | NO | NO | Planeswalker support. The deck has none |
| 32 | Fact or Fiction | 4 | REPRINT | NO | NO | NO | One-shot instant draw. V3's draw role is repeatable engines (the Vision of Love principle, 2026-09-02) |
| 33 | Hapatra, the Desert Frost | 4 | NEW | NO | NO | NO | Near-miss. *"{2}{U}: Untap target creature"* has no tap cost, so it buys extra Surestrike Trident shots with Clock mana. But Voltaic Construct (recorded 2026-09-09) is the artifact version of the same untap, and Hapatra is non-artifact MV4 |
| 34 | Plan for All Outcomes | 4 | NEW | NO | NO | NO | The owner chooses top or bottom, so it's tempo, not removal |
| 35 | Protege's Awakening | 4 | NEW | NO | NO | NO | {3}{U} sorcery: Jace 6 plus draw 1 |
| 36 | Sphinx of False Conclusions | 4 | NEW | NO | NO | NO | Flash 4/2 flying looter. Its attack trigger is dead under Silent Arbiter |
| 37 | The Theorist, Jace Beleren | 4 | REPRINT | NO | NO | NO | Near-miss. A draw on every opponent's draw step, and −2 bounces one artifact or creature per opponent. But it's non-artifact {2}{U}{U} (double tax) into V3's fullest role |
| 38 | Traxos, Academy Guardian | 4 | NEW | NO | NO | NO | 1/5 flying vigilance artifact blocker. The blocker queue (Silent Arbiter 1/5, Wurmcoil 6/6, Krang 9/9) is already ahead of it |
| 39 | Jace, Reality Sculptor | 5 | NEW | NO | NO | NO | Scales with Islands and Jace loyalty. The deck runs 4 Islands and no Jaces |
| 40 | Undulating Witness | 5 | NEW | NO | NO | NO | Landcycling beater |
| 41 | Way of the Mind Sculptor | 5 | NEW | NO | NO | NO | Needs loyalty abilities to draw |
| 42 | Yargle, Goliath of Otaria | 5 | NEW | NO | NO | NO | Vanilla 3/9 |
| 43 | Mass Polymorph | 6 | REPRINT | NO | NO | NO | Exiles your own board, commander included, for random creatures from a library holding about 15 |
| 44 | Ruric Thar, Biomagus | 6 | NEW | NO | NO | NO | 6-mana prowess flier. Off-plan |
| 45 | Shark Typhoon | 6 | REPRINT | NO | NO | NO | Cast-trigger payoff in a deck that deploys rather than casts |
| 46 | Synthetic Destiny | 6 | REPRINT | NO | NO | NO | Mass Polymorph at instant speed; same grounds |

### Red

| # | Name | MV | New? | main | v2 | v3 | Reason |
|---|---|---|---|---|---|---|---|
| 47 | Ajani's Anguish | 1 | NEW | NO | NO | NO | X burn plus team trample. The commander already gets trample from five sources |
| 48 | Artifist Acumen | 1 | NEW | NO | NO | NO | Team first strike cantrip |
| 49 | Marwyn, the Clearcutter | 1 | NEW | NO | NO | NO | Sac an artifact or land to draw. A sac outlet with nothing here that wants the sacrifice |
| 50 | Pompous Battlemage // Improvised Act | 1 | NEW | NO | NO | NO | 1/1 prowess whose prepare spell is a rummage |
| 51 | Blazing Crescendo | 2 | REPRINT | NO | NO | NO | +3/+1 trick plus an impulse draw. Bulk Up is the finisher trick |
| 52 | Eardrum Rattler | 2 | NEW | NO | NO | NO | Makes a power-≤2 creature unblockable, never the commander |
| 53 | Essence Burn | 2 | NEW | NO | NO | NO | Hits black or green permanents only |
| 54 | Gallia, the Merrymaker | 2 | NEW | NO | NO | NO | Haste and counters for creatures that entered this turn |
| 55 | Master of Barbs | 2 | NEW | NO | NO | NO | Team +1/+0 on noncombat damage |
| 56 | No Admittance | 2 | NEW | NO | NO | NO | Sorcery Shock plus a Jace token |
| 57 | Samut, Hazoret's Champion | 2 | NEW | NO | NO | NO | Team haste. Krang already hastes artifact creatures and Thousand-Year Elixir covers activated abilities. Non-artifact |
| 58 | Skilled Battlecarver | 2 | NEW | NO | NO | NO | Firebreathing 2/1 |
| 59 | Stingcaster Mage | 2 | REPRINT | NO | NO | NO | Flashback for one instant or sorcery. The nine in V3 are mostly free (Swat, Guardianship) or situational |
| 60 | Tomik, Izzet Sparkmage | 2 | NEW | NO | NO | NO | +1 on noncombat damage, trivial next to Mjölnir's doubling of Trident and Ignition damage |
| 61 | Way of the Pyromancer | 2 | NEW | NO | NO | NO | Planeswalker support |
| 62 | Chandra's Emberling | 3 | NEW | NO | NO | NO | Grows on noncreature casts; off-plan body |
| 63 | Command the Stage | 3 | NEW | NO | NO | NO | Makes a Cadet, which is not an artifact; the recursion needs noncombat damage |
| 64 | Cursed Mirror | 3 | REPRINT | NO | NO | NO | Cut 2026-08-19 as the marginal eighth rock. V3's ramp isn't short (Clock-refreshed rocks, Urza), and copying the commander dies to the legend rule |
| 65 | Fulminous Forte | 3 | NEW | NO | NO | NO | Near-miss. Instant, one-sided 1 damage to each opposing creature, or 5 to one. Good, but a one-shot, and the gap V3 recorded is repeatable removal that doesn't live on the commander |
| 66 | Identity Echo | 3 | NEW | NO | NO | NO | Polymorph engine for your own creatures |
| 67 | Koth, the Geomancer | 3 | NEW | NO | NO | NO | Landfall pinger |
| 68 | Pia, Determined Rebuilder | 3 | NEW | NO | NO | NO | Non-artifact 3-drop (double tax). The {5}{R} +X pump is Adaptive Omnitool's job |
| 69 | Pyre Rhymer // Molten Tide | 3 | NEW | NO | NO | NO | Ritual keyed to Mountains; V3 runs 4 |
| 70 | Way of the Warlord | 3 | NEW | NO | NO | NO | Planeswalker support |
| 71 | Wrath of the Bloodmane | 3 | NEW | NO | NO | NO | {1}{R} for 4 damage with a legend out. Galvanic Blast ({R}, 4 with metalcraft) does it cheaper, and it too was cut from V2 and V3 |
| 72 | Arni, Renowned Champion | 4 | NEW | NO | NO | NO | Grows when other creatures enter; Silent Arbiter keeps it home |
| 73 | Chandra, Torch of Defiance | 4 | REPRINT | NO | NO | NO | Non-artifact RR walker (double tax); the impulse +1 wants a casting deck |
| 74 | Curse-Marred Demon | 4 | NEW | NO | NO | NO | Near-miss. The ETB tutors any card to hand, which would find Unwinding Clock (only Fabricate reaches it now), on a 4/4 flier. But it's non-artifact {2}{R}{R} (the Knuckles double-tax precedent) and the discard is random |
| 75 | Heartstring Puller | 4 | NEW | NO | NO | NO | 3/1 plus a non-artifact Cadet |
| 76 | Tetsuko Umezawa, Pursuer | 4 | NEW | NO | NO | NO | Double-strike prowess 2/4; Silent Arbiter keeps it home |
| 77 | Violent Echoes | 4 | NEW | NO | NO | NO | 4-mana instant, 6 damage. The removal pieces the deck has cost 1–3 |
| 78 | Awaken the Inferno | 5 | NEW | NO | NO | NO | 5-mana sorcery removal |
| 79 | Draconic Visitor | 5 | NEW | NO | NO | NO | **Trap.** Replaces EVERY artifact token (Thopter Spy Network Thopters, Simulacrum and Urza Constructs, Wurmcoil's tokens, Treasures, Blacksmith's Talent's Sword) with non-artifact Dragons, which lose Fateful Discovery, Urza, Steel Overseer and the artifact count |
| 80 | Jiang Yanggu, Alone | 5 | NEW | NO | NO | NO | Silent Arbiter means the commander always *"attacks a player alone"*, so this fires every combat: a loot plus a +1/+1 counter. Too little for a non-artifact 5-drop |
| 81 | Tether Technician | 5 | NEW | NO | NO | NO | 4/5 reach with a discard-for-2-damage ETB |
| 82 | Winter, Team Player | 5 | NEW | NO | NO | NO | Noncreature-cast team pump |
| 83 | Ajani Unrelenting | 6 | NEW | NO | NO | NO | Its −3 deals 4 to every creature except your tokens, commander included |
| 84 | Kiora of Fire and Ashes | 6 | NEW | NO | NO | NO | 6-mana Dragon maker; non-artifact |
| 85 | Venser, Fervent Forger | 6 | NEW | NO | NO | NO | Non-artifact 6-drop; one-shot copy or steal |
| 86 | Craterclaw Colossus | 7 | REPRINT | **SIDE** | **SIDE** | **SIDE** | {4}{R}{R}{R} artifact 5/5 haste: *"creatures you control gain trample and get +X/+0 until end of turn, where X is the number of artifacts you control."* Deployed free at beginning of combat, that's roughly +12 on the commander. The best post-Mjölnir finisher in the pool; see Bench |
| 87 | Face Yourself | 7 | NEW | NO | NO | NO | Copies another player's creatures for one turn |
| 88 | Akroma, Angel of Fury | 8 | REPRINT | NO | NO | NO | 8-mana non-artifact flier |

### Multicolor RU

| # | Name | MV | New? | main | v2 | v3 | Reason |
|---|---|---|---|---|---|---|---|
| 89 | Izzet Signet | 2 | REPRINT | NO | NO | NO | 2-mana rock. V3's ramp isn't short, and the Signet's {1} filter is worse than Talisman of Creativity's |
| 90 | Talisman of Creativity | 2 | REPRINT | IN | IN | IN | Already in all three lists |
| 91 | Twinned Vision | 2 | NEW | NO | NO | NO | Draw 1, or 2 on flashback; a one-shot |
| 92 | Clash of Elements | 3 | NEW | NO | NO | NO | The owner picks top of library and takes 2, so it's a Time Ebb, not removal |
| 93 | Frostbite Pyromental | 3 | NEW | NO | NO | NO | One-turn attacker that sacrifices itself; Silent Arbiter |
| 94 | Saheeli, Jewel of Avishkar | 4 | NEW | NO | NO | NO | Cast-matters in a deploy deck (the Sai cut, 2026-08-21) |

### Colorless

| # | Name | MV | New? | main | v2 | v3 | Reason |
|---|---|---|---|---|---|---|---|
| 95 | Currency Converter | 1 | REPRINT | NO | NO | NO | Loot plus tokens from discards. Selection, not the engine draw V3 runs |
| 96 | Eye of Jace | 1 | NEW | NO | NO | NO | Upkeep surveil; Urza's Saga can fetch it ({1}) but nothing here pays off surveil |
| 97 | Sol Ring | 1 | REPRINT | IN | IN | IN | Already in all three lists |
| 98 | Afterthought Sentry | 2 | NEW | NO | NO | NO | 2/2 graveyard hate on attack |
| 99 | Arcane Signet | 2 | REPRINT | IN | IN | IN | Already in all three lists |
| 100 | Fellwar Stone | 2 | REPRINT | NO | NO | NO | Colours depend on opponents' lands; Arcane Signet and Talisman are strictly better here |
| 101 | Karn, Argent Defender | 2 | NEW | NO | NO | NO | **Trap.** *"Artifacts and creatures entering the battlefield don't cause abilities to trigger"* turns off Fateful Discovery, Simulacrum Synthesizer, Hammer of Nazahn, the Embercleave / Mithril Coat / Mjölnir ETBs, Portal to Phyrexia and Urza's Construct. It's also a stax piece |
| 102 | Living Library | 2 | NEW | NO | NO | NO | {6}, sacrifice: shuffle away one opposing creature or planeswalker, at instant speed. Eight mana total for a one-shot; the recorded gap is repeatable removal |
| 103 | Medic's Kitesail | 2 | NEW | NO | NO | NO | Gives flying, which the commander already has |
| 104 | The Echoverse Fulcrum | 2 | NEW | **SIDE** | **SIDE** | **SIDE** | {2} legendary artifact: ETB loot; *"{5}, {T}, Exile: Destroy all creatures. Activate only as a sorcery."* A free-deployable, Padeem-hexproof catch-up wipe. It fills the Blasphemous Act role V3 is testing without. See Bench |
| 105 | Chromatic Lantern | 3 | REPRINT | NO | NO | NO | 3-mana rock for fixing a two-colour deck that doesn't need it |
| 106 | Keeper of the Quiet Hour | 3 | NEW | NO | NO | NO | 3/2 artifact plus a Jace token with 2 loyalty. No Jace payoff |
| 107 | Murmuring Volume | 3 | NEW | NO | NO | NO | {3} rock plus rummage. MV 3 triggers Simulacrum Synthesizer, but ramp isn't short |
| 108 | Traxos, Scourge Eternal | 4 | NEW | NO | NO | NO | 5/4 trample that untaps only on artifact/creature casts (Clock untaps it too), and Silent Arbiter keeps it home |
| 109 | Archive Arbiter | 6 | NEW | **SIDE** | NO | **SIDE** | {6} 4/4 flying artifact: ETB destroys a noncreature, nonland permanent. With Master Transmuter + Clock it rebuys that ETB for {U}, up to three times a cycle. It shares the Meteor Sword re-add trigger. NO in v2, which already runs Meteor Sword |
| 110 | Ginger, Queen of Sweets | 6 | NEW | NO | NO | NO | Deployed free: monarch plus a Gingerbrute (artifact creature, so a Fateful Discovery draw) every upkeep. Real, but it's more draw in the fullest role, and being monarch invites attacks |
| 111 | Omnath, Locus of the Void | 7 | NEW | NO | NO | NO | Non-artifact colourless 7-drop that banks mana (double tax) |
| 112 | Darksteel Angel | 9 | NEW | NO | NO | NO | Near-miss. A free-deployed indestructible 4/4 flier with *"You can't lose the game."* It costs a combat deploy an Equipment would use, defence is already structural (Silent Arbiter, Propaganda, Basilisk Collar), and pods may dislike the lock |
| 113 | Emrakul, the Exigent Doom | 10 | REPRINT | NO | NO | NO | Non-artifact colourless bomb. The commander deploys big artifacts for free, so a 10-drop that must be cast adds nothing |
| 114 | Memnarch, the Warden | 10 | NEW | NO | NO | NO | Free-deployed indestructible 8/9 plus two Myr, but its draw is on attack and Silent Arbiter means only the commander attacks |

### Land

| # | Name | MV | New? | main | v2 | v3 | Reason |
|---|---|---|---|---|---|---|---|
| 115 | Command Tower | 0 | REPRINT | IN | IN | IN | Already in all three lists |
| 116 | Exotic Orchard | 0 | REPRINT | NO | NO | NO | The manabase runs 17 on-colour duals; this depends on opponents |
| 117 | Fabled Passage | 0 | REPRINT | NO | NO | NO | Fetches were replaced with real duals on 2026-08-07 |
| 118 | Hall of Echoes | 0 | NEW | NO | NO | NO | Colourless land; {5}: a one-turn creature copy. It doesn't enter, so no ETBs, and Arbiter caps attackers |
| 119 | Hexhaven Dueling Arena | 0 | NEW | NO | NO | NO | Only prepares creatures that have a prepare spell. The deck has none |
| 120 | Innovative Commons | 0 | NEW | NO | NO | NO | Enters tapped without a planeswalker |
| 121 | Island | 0 | REPRINT | IN | IN | IN | Basic; already run (main 3, v2/v3 4) |
| 122 | Kher Keep | 0 | REPRINT | NO | NO | NO | Colourless land that makes 0/1 Kobolds |
| 123 | Mountain | 0 | REPRINT | IN | IN | IN | Basic; already run (main 6, v2/v3 4) |
| 124 | Path of Ancestry | 0 | REPRINT | NO | NO | NO | Enters tapped; the scry rider is minor |
| 125 | Reflecting Pool | 0 | REPRINT | NO | NO | NO | An untapped 'dual' only through your other lands, and untyped: it doesn't enable Archway of Innovation, Sulfur Falls or Riverpyre Verge. Lateral to Turbulent Springs |
| 126 | Restless Spire | 0 | REPRINT | NO | NO | NO | Tapped manland; Arbiter keeps it home |
| 127 | Room of Refuge | 0 | NEW | NO | NO | NO | Tapped mono-colour land |
| 128 | Shivan Reef | 0 | REPRINT | IN | IN | IN | Already in all three lists |
| 129 | Sulfur Falls | 0 | REPRINT | IN | IN | IN | Already in all three lists |
| 130 | Theorist's Sanctum | 0 | NEW | NO | NO | NO | An Island that enters tapped with no Jace to behold |

---

## Proposed swaps (v3)

### 1. Geist of Saint Thalia in, Cloud Key out

**The card:** Geist of Saint Thalia `{1}{U}`, Legendary Creature — Spirit Cleric 1/2. *"Flying.
Noncreature spells you cast cost {1} less to cast."* Not a Game Changer.

**Role table: Cost Reducers in v3 (3 cards + the candidate).** Counts are measured from v3's
`deck.json`: 47 artifact spells, 12 of them artifact creatures, and 45 noncreature spells with a
generic component. Reducers only touch generic mana (CR 118.7a), so Counterspell, Mana Drain, Into
the Flood Maw and Blacksmith's Talent get nothing from any of them.

| Card | Cost | Discounts in v3 | Double-tax cards it reaches | Body | Artifact? (deploy, Padeem, Urza {U}, Overseer) | Survives a creature wipe / own Chandra's Ignition |
|---|---|---|---|---|---|---|
| Cloud Key (artifact mode) | {3} | 47 artifact spells | 0 | none | yes | **yes / yes** |
| Etherium Sculptor | {1}{U} | 47 artifact spells | 0 | 1/2 | yes | no / no |
| Enthusiastic Mechanaut | {U}{R} | 47 artifact spells | 0 | 2/2 flier | yes | no / no |
| **Geist of Saint Thalia** | {1}{U} | 45 noncreature spells; misses the 12 artifact creatures | **7**: Fateful Discovery, Thopter Spy Network, Fabricate, Chaos Warp, Propaganda, Bulk Up, Chandra's Ignition (plus Sink into Stupor and the rarely-hard-cast Swat and Guardianship) | 1/2 **flier** | no | no / no |

**Deciding axis: tempo in the only windows reducers matter.** 2026-09-09 recorded that none of the
three reducers touch the commander. Tony Stark is a creature spell and the transform is an
activated ability, so reducers matter only in **turns 1–4 pre-flip** and **after a wipe**.

Geist is the only 2-mana reducer that also discounts the coloured non-artifact cards the pilot
called the double tax: Fateful Discovery goes {3}{U}{U} → {2}{U}{U} and Chandra's Ignition {3}{R}{R}
→ {2}{R}{R}. It comes down a turn earlier than Cloud Key, on a flying body that blocks the fliers
threatening the commander.

Cloud Key discounts 12 artifact creatures Geist doesn't. Most of those are deployed free once the
commander flips, so that edge lives mainly in the pre-flip window, which Geist enters first.

**Costs, named honestly:**

- **Cloud Key's one real edge is the post-wipe window.** It's an artifact, so it survives a creature
  wipe and your own Chandra's Ignition; Geist dies to both, as Sculptor and Mechanaut already do.
  After this swap, every reducer dies to a creature wipe.
- Geist is non-artifact. It can't be deployed free and gets no Padeem hexproof. It isn't an Urza
  tap source, can't be found by Fabricate or the commander's dig, and isn't Transmuter fodder.
  At ≤2 MV it still passes the standing double-tax rule (2026-08-20).
- **Pilot history:** Cloud Key has been named as a cut three times: taken back in over Foundry
  Inspector on 2026-08-31 (the pilot's pick), then declined on 2026-09-09 and 2026-09-10. The
  pilot has never stated a reason. If the wipe window is that reason, this swap is wrong.

**Curve (v3, nonland, measured):** avg MV 3.469 → **3.453**; MV ≤ 2 22 → **23**; MV ≤ 3 39 → 39.
Game Changers 3/3, unchanged.

**Self-hits:** it dies to Chandra's Ignition, like the other two creature reducers. No trigger
conflicts. Being legendary it makes Otawara's channel {1} cheaper, which is minor upside.

**Alternatives considered:**

- **Etherium Sculptor out** keeps Cloud Key's wipe-proofing, but Sculptor is an artifact creature
  feeding Urza, Steel Overseer, Iron Spider and Marvin. That's worse.
- **Thousand-Year Elixir out** is a different role (untap and haste).
- **No swap** is the answer if the pilot's reason for keeping Cloud Key is wipes.

---

## Bench (SIDE)

### Craterclaw Colossus (REPRINT): all three lists, displaces Conqueror's Flail

`{4}{R}{R}{R}` Artifact Creature — Beast Construct 5/5, haste. *"When this creature enters,
creatures you control gain trample and get +X/+0 until end of turn, where X is the number of
artifacts you control."*

- **Deployed free off the combat trigger:** the ETB resolves at beginning of combat, before
  attackers. X counts Craterclaw itself.
- **The numbers:** at a typical 12 artifacts the commander is 5 + 12 = **17 power, flying,
  trample** before any Equipment. Any double-strike source (Embercleave, Genji Glove, Blacksmith's
  Talent L3) makes that 34. Mjölnir doubles again.
- **Instant speed via Master Transmuter:** `{U}`, `{T}`, return an artifact → put Craterclaw in from
  hand **after blockers are declared**.
- **Artifact synergies:** MV 7 triggers Simulacrum Synthesizer; it's a Fateful Discovery draw; it's
  a 5/5 blocker afterwards.

**Why SIDE, not MAIN:** finishing is no longer v3's diagnosed problem. The 2026-09-03 audit showed
the deck reaches 21 in one combat without Mjölnir, and it spends the one combat deploy an Equipment
would otherwise take. Hard-cast `{R}{R}{R}` off ~23 red sources is awkward.

**Where it goes:** the existing Blackblade Reforged row (*"kills keep missing 11 power after Mjölnir
is answered"*, displaces Conqueror's Flail). Craterclaw is the stronger card for that trigger: +12
and trample, where Blackblade gives +7ish. It should replace Blackblade as the row's card.

### The Echoverse Fulcrum: all three lists

`{2}` Legendary Artifact. *"When The Echoverse Fulcrum enters, draw a card, then discard a card.
{5}, {T}, Exile The Echoverse Fulcrum: Destroy all creatures. Activate only as a sorcery."*

- **The role it fills:** the pre-commander catch-up sweeper that the pilot's own reasoning
  describes (*"you do it a turn before to slow down the board state… green players ramping out like
  10/10 dinos"*). V3 has run without one since Blasphemous Act left on 2026-09-02.
- **Why it beats Act here:** it's an artifact, so it's free off the combat trigger or {0} under the
  reducers. It loots on entry, draws off Fateful Discovery, and sits under Padeem's hexproof.
- **One-sided under Darksteel Forge or Krang:** Krang's grant covers every other artifact creature,
  including the back-face commander.
- **Costs:** it kills the commander unless he has Mithril Coat, Hammer of Nazahn, Forge or Krang
  coverage. Its sorcery-speed {5} is visible for a turn, and Goblin Welder can't rebuy it because it
  exiles itself.
- **v3 trigger:** it's the first card in when the 2026-09-02 Blasphemous Act re-add trigger fires
  (a loss to a board built before the commander was deployed).
  - That trigger's named displacement, Ultron, has already left v3, so re-rank at that point. My
    nomination is Thousand-Year Elixir.
- **main / v2:** they still run Blasphemous Act, and there the Fulcrum is the artifact alternative
  that displaces it.

### Archive Arbiter: main and v3 (NO in v2, which already runs Meteor Sword)

`{6}` Artifact Creature — Sphinx 4/4, flying. *"When this creature enters, choose one — • Destroy
target noncreature, nonland permanent. • You gain 4 life."*

- **The repeatable line:** with **Master Transmuter + Unwinding Clock** it rebuys the ETB for `{U}`
  per Transmuter untap, at instant speed on opponents' turns. That's up to three noncreature answers
  per cycle.
- **v3's gap:** the deck has almost no answer to noncreature permanents. It has Chaos Warp, and
  Argentum Armor only once it's on the commander and attacking.
- **v3 trigger:** it's a co-candidate with Meteor Sword under that card's 2026-09-09 re-add trigger
  (*"the first time a noncreature permanent is what beats the deck"*).
- **How to choose:** Meteor Sword is broader (it hits creatures too) and is also +3/+3 Equipment.
  Arbiter is the flying blocker. Pick Arbiter if fliers are the other problem.

### Geist of Saint Thalia: v2 only (SIDE)

Same grounds as the v3 proposal. v2 is the frozen A/B baseline, so it stays a bench row there.

---

## Near-misses (good card, wrong deck or wrong moment)

- **Lyra, Tolarian Archangel**: v3 draws 3+ on most turns once Clock is out (Insight Engine, The
  One Ring, Mind's Eye), and it triggers at *each* end step. But it's non-artifact {1}{U}{U}, its
  Angels aren't artifacts, and Silent Arbiter keeps them home. Revisit only if the deck wants flying
  blockers.
- **Hapatra, the Desert Frost**: its no-tap-cost `{2}{U}` untap would buy extra Surestrike Trident
  shots off Clock mana. Voltaic Construct (the named fourth untapper, 2026-09-09) is the artifact
  version.
- **The Theorist, Jace Beleren**: a draw on each opponent's draw step, plus a one-per-opponent
  bounce. Non-artifact UU MV4, into the fullest role.
- **Curse-Marred Demon**: tutor-anything on a 4/4 flier would find Unwinding Clock, which only
  Fabricate can reach now. But {2}{R}{R} is the Knuckles double-tax case, and the discard is random.
- **Fulminous Forte**: instant, one-sided 1-damage sweep or 5 to a creature. A one-shot. The
  recorded gap is repeatable removal that doesn't live on the commander (the Dawnsire note).
- **Darksteel Angel**: free-deployed indestructible flier with *"You can't lose the game."* It takes
  a combat deploy, defence is already structural (Arbiter, Propaganda, Basilisk Collar), and pods
  may dislike the lock. Worth asking about if the deck keeps dying to one big turn.

---

## Traps (they read like upgrades)

- **Karn, Argent Defender**: *"Artifacts and creatures entering the battlefield don't cause
  abilities to trigger."* That switches off Fateful Discovery, Simulacrum Synthesizer, Hammer of
  Nazahn's attach, the ETBs of Embercleave, Mithril Coat, Mjölnir and Portal to Phyrexia, and Urza's
  Construct. The commander's combat trigger survives (it isn't an ETB), but everything it deploys
  arrives blank. It's also a symmetric stax piece.
- **Draconic Visitor**: *"If one or more artifact tokens would be created under your control, that
  many 5/5 red Dragon creature tokens with flying are created instead."* It hits Thopter Spy
  Network's Thopters, the Synthesizer, Urza and Saga Constructs, Wurmcoil's death tokens, Reaver
  Cleaver's Treasures, and Blacksmith's Talent's Sword Equipment token. The Dragons aren't
  artifacts, so they never draw off Fateful Discovery or Thopter Spy Network, don't tap for Urza,
  and don't grow Adaptive Omnitool. Silent Arbiter also keeps them from attacking.
- **Theorist's Sanctum**: it's an Island, which looks good for Archway of Innovation, Sulfur Falls
  and Riverpyre Verge. But with no Jace to behold it always enters tapped. It isn't basic either, so
  it doesn't help Scorched Geyser.
- **Hexhaven Dueling Arena**: reads as a utility land, but it only affects creatures with prepare
  spells, and the deck has none.

## Follow-up after the pilot's first pass (2026-09-28)

Pilot: *"what if we add [Memnarch] to iron man instead? he struggles with draw too."*

### Memnarch, the Warden in v3 — the cost is zero, the draw is dead

*"Indestructible. When Memnarch enters, create two 1/1 colorless Myr artifact creature tokens.
Whenever Memnarch attacks, draw a card for each artifact you control."*

- **Cost:** Tony Stark's back face — *"At the beginning of combat on your turn, you may put an artifact
  card from your hand onto the battlefield"* — deploys it for **0 mana**. Fabricate and Tony's front
  face ({1},{T}: dig four for an artifact) put it in hand, which is where it needs to be (LEDGER
  2026-08-07). Master Transmuter is a second free deployer.
- **Timing:** it enters at beginning of combat, so it can't attack that turn (CR 302.6) unless Krang
  (haste to other artifact creatures) or Blacksmith's Talent level 3 (haste to equipped creatures) is
  out.
- **The blocker: Silent Arbiter is in v3** — *"No more than one creature can attack each combat."* The
  commander is that one attacker every combat, so Memnarch's attack-draw never fires. This is the exact
  ground on which **Iron Man, Master of Machines was cut on 2026-09-08** (*"dead under Arbiter whenever
  the commander attacks, which is every combat"*). The only window is Genji Glove's extra combat, where
  Memnarch could attack *instead of* Iron Man — a two-card condition that gives up a suit swing.
- **The floor that remains:** a free 8/9 indestructible blocker, two Myr, three Fateful Discovery draws
  if Discovery is out (three artifacts entering), one Simulacrum Synthesizer Construct (MV ≥ 3), and it
  becomes the highest-MV artifact for Padeem's upkeep draw (10 beats Krang, Portal and Forge at 9).
  Useful, but not the draw engine the pilot is asking for.

**Artifact density** (for the record): 53 of v3's 100 cards are artifacts (5 of them lands), so the
attack-draw *would* be large — 8–12 cards on a normal turn-7 board — if it could fire.

### "Iron Man struggles with draw" — what v3 runs now

Dedicated engines (7): Fateful Discovery, Insight Engine, Iron Lad, Mind's Eye, The One Ring, The Ten
Rings, Thopter Spy Network. Incidental (4): Padeem's upkeep draw, Iron Spider's counter-draw, Tony's
front-face dig, Urza's `{5}` impulse. Fabricate is a tutor, not draw.

Ranked by cards per turn cycle in v3 today (§2.1 step 4): Mind's Eye (3+ for {1} each, refreshed by
Unwinding Clock) · The One Ring · Insight Engine (escalating) · Fateful Discovery (per artifact
entering — every free deploy) · The Ten Rings (refill; kept by the pilot three times) · Thopter Spy
Network (1 per combat, fires with the commander as the lone attacker) · Iron Lad (~0.5 a turn).
Memnarch would rank **below all of them** under Arbiter.

**Recommendation: not Iron Man — Ultron is the home** (see the Ultron follow-up). Deciding axis:
whether the draw trigger can fire at all. **Re-add trigger:** if Silent Arbiter ever leaves v3,
Memnarch becomes a real candidate here — a free deploy that draws 8–12 per attack — under the same
standing trigger that brings Master of Machines back.
