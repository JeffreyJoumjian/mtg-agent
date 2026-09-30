# FRA + FRC (Reality Fracture + Reality Fracture Commander) set review — Captain America, Living Legend — 2026-09-28

**Method:** deck-brain SKILL.md, the 2026-08-09 set-sweep pattern (index once, filter by identity,
classify 100%). Every pool card read from verified Scryfall oracle text in
`data/fra-candidates-cap-living-legend.json` + `data/frc-candidates-cap-living-legend.json` (never from
memory), both halves of every prepare card. Planeswalker loyalty pulled from Scryfall; FRA/FRC token
definitions (Jace, Cadet, Illusion) verified from the TFRA/TFRC token sets. In-deck comparison cards read
from the current `deck.json` of all five lists. Each candidate costed in this deck's mana (Grand Arbiter
Augustin IV discounts white and blue spells, flashback included — CR 601.2f; Herald's Horn / Urza's
Incubator discount only Advisor **creature** spells, never a prepared copy), checked against each list's
own board and triggers (§1.3), and loop-audited against every list's untap/tap engine before any
non-NO verdict. Curve figures are measured from `deck.json` by script, not estimated.

**The five lists are five plans** and are judged separately — no card is merged across them:
`main` (free-crew Vehicles) · `counters` (lifelink voltron) · `engine` (Tap → Tokens → Drain, no combat) ·
`mill` (8-Petitioner Advisor toolbox) · `petitioners` (27-Petitioner self-mill — **the pilot's favourite,
reviewed first**).

**Field lens:** EDHREC has no FRA/FRC data yet (set releases 2026-10-02) — skipped, not invented (§2.2).

**Pool:** 148 cards fit W/U identity and are commander-legal — FRA 102 + FRC 46. **100 NEW, 48 REPRINT.**
Zero Game Changers in either set, so no bracket pressure: every list stays at its current 3/3.

## Result

| Verdict | main | counters | engine | mill | petitioners |
|---|---|---|---|---|---|
| **MAIN** | 0 | 1 | 2 | 0 | 2 |
| **SIDE** | 4 | 3 | 1 | 5 | 3 |
| IN (already in the list) | 12 | 12 | 12 | 15 | 14 |
| NO | 132 | 132 | 133 | 128 | 129 |

**MAIN (proposed — nothing applied; each swap is its own decision):**

| List | In | Out | Deciding axis |
|---|---|---|---|
| petitioners | Cruel Calculations | 1× Persistent Petitioners (27 → 26) — alt. Mystic Remora | card flow: the list has ONE draw card |
| petitioners | Generous Revival | Return to the Ranks | where it can be cast from (graveyard, not hand) |
| engine | Grand Crescendo | Akroma's Will | both jobs live (Akroma's second mode is dead in a no-combat list) |
| engine | The Theorist, Jace Beleren | Fallowsage | resilience of the draw engine to creature wipes |
| counters | Yoshimaru, Beloved Companion | Bard the Bowman | counters per turn (event multiplier) |

---

## Set mechanics as they matter to this deck

- **Empower Jace N** (18 cards in this pool). Puts N loyalty counters on a Jace **token** you control, first creating
  a blue Jace planeswalker token ("−1: Surveil 1", "−3: Draw a card") if you have none. **Jace, Wielder of
  Mysteries is a card, not a token** — empower never adds loyalty to it, it makes a second, separate Jace.
  The token **is** a Jace planeswalker, so it satisfies "behold a Jace" (Countersculpt, Theorist's Sanctum),
  "if you control a planeswalker" (Fatehold Annex), and counts toward Jace, Reality Sculptor's "twenty-five
  or more loyalty counters among Jaces you control" — as does Jace, Wielder of Mysteries. No list has a
  planeswalker plan, so the Jace-token cards are almost all NO; the one exception worth a look is
  Jace, Reality Sculptor in `mill` (below). Empower is not in the loaded CR (2026-08-07); read from the
  reminder text as printed.
- **Prepare** (CR 722, LEDGER 2026-08-06). Casting a prepared copy is a normal cast of a **noncreature**
  spell with only the prepare half's characteristics — so it gets **no** Advisor discount from Herald's
  Horn / Urza's Incubator and does **not** trigger Flickering Hound ("whenever you cast a creature spell").
  Every W/U prepare card here makes a Cadet, bounces something or wheels; none fits a plan.
- **Surveil** (43 cards set-wide). Surveil is one optional card of self-mill — far too small to matter next to a
  tap-four activation (12 cards). It only matters where a card *counts* scry/surveil events, and no list
  generates enough of those to feed Denzilore / Saheeli / Proft.
- **Cadet tokens** are 2/2 colourless Wizard Soldiers that enter **untapped** — per the 2026-09-16 ledger
  entry they count for Throne only after a second tap, and they are **not Advisors**.
- **Flashback** (Generous Revival) is the mechanic that matters most here: the self-mill ledger lesson
  (2026-09-17, "count recursion by WHERE it can be cast from") says graveyard-castable recursion is what
  wins from an empty hand.
- **Second untappers** in the pool: Hapatra, the Desert Frost ("{2}{U}: Untap target creature"), Hall of
  Echoes (copies Ioreth), Arni (untaps only itself, bounded), Divining Duelist (ETB, bounded), Traxos,
  Scourge Eternal (untaps only itself, per cast). Audited below.
- **Hate pieces flagged, not silently excluded:** Karn, Argent Defender (Torpor — and a self-hit),
  Thalia, the Survivor (tax), Yuriko, Blade of the Mighty (combat lock — self-hit).

---

## Classification — all 148 cards

Verdict key: **MAIN** = would displace a named card in that list · **SIDE** = bench-worthy, displaces
named · **IN** = already in that list · **NO** = pass. Numbers are the pool file's.

| # | Name | MV | New? | main | counters | engine | mill | petitioners | Reason |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Guiding Hydra | 1 | NEW | NO | NO | NO | NO | NO | Team counter each combat paid for with its own counters; counters wants them on Cap, and Archangel / Coulson / Elspeth already spread faster |
| 2 | Liliana the Faultless | 1 | NEW | NO | **SIDE** | NO | NO | NO | Soul Warden for your own creatures + "{1}, {T}, Discard: hexproof" that Cap untaps twice a turn — counters bench over Auriok Champion; no lifegain payoff elsewhere |
| 3 | Loyal Tutor | 1 | NEW | NO | NO | NO | NO | NO | Only target is Jace, Wielder of Mysteries, put ON TOP — where Mesmeric Orb's upkeep mill and tap-four self-mill bin it (mill, petitioners); a slot spent tutoring insurance |
| 4 | Path to Exile | 1 | REPRINT | IN | IN | IN | IN | IN | Already in all five lists |
| 5 | Secure the Wastes | 1 | REPRINT | NO | NO | NO | NO | NO | X untapped Warriors: engine cut it 2026-09-16 because tokens that enter untapped need two taps for Throne — still true; no token payoff in the others |
| 6 | Swords to Plowshares | 1 | REPRINT | IN | IN | IN | IN | IN | Already in all five lists |
| 7 | Academic Ascent | 2 | NEW | NO | NO | NO | NO | NO | One-shot +2/+2 flying trick plus a Jace token |
| 8 | Ajani Resolute | 2 | NEW | NO | NO | NO | NO | NO | 0: gain 1 is one lifegain event a turn — below every Life Gain → Counters card in counters; no lifegain plan elsewhere |
| 9 | Campus Crier | 2 | NEW | NO | NO | NO | NO | NO | An Advisor, but a white 3/1 with no mill ability: a Petitioner is strictly better in both Advisor lists (mills, +1 blue devotion for Oracle), and power 3 dies to your own Dusk |
| 10 | Enlightened Confidant | 2 | REPRINT | NO | **SIDE** | NO | NO | NO | End-step surveil 1 → to hand if MV ≤ life gained: ~a card a turn once counters' lifelink is online — bench over Brimaz; no lifegain elsewhere |
| 11 | Gideon's Memorial | 2 | NEW | NO | NO | NO | NO | NO | Token anthem with vigilance (deletes the tap events engine wants); mana only for planeswalker spells |
| 12 | Grand Crescendo | 2 | REPRINT | **SIDE** | NO | **MAIN** | NO | NO | Instant team indestructible + X Citizens, doubled by Anointed Procession / Mondrak: engine MAIN over Akroma's Will (whose second mode is dead in a non-combat list); main bench (crew bodies + wipe answer); Citizens aren't Advisors and Flawless is free in mill/petitioners; Cap-voltron has no use for tokens |
| 13 | Martial Coup | 2 | REPRINT | NO | NO | NO | NO | NO | At X ≥ 5 it destroys your own board — Cap, Advisors, tap engines — to keep Soldiers |
| 14 | Predictive Preparations | 2 | NEW | NO | NO | NO | NO | NO | Two +1/+1 counters and flashback — counters' engines place far more per turn |
| 15 | Prophesied End | 2 | NEW | NO | NO | NO | NO | NO | 2-mana Murder that draws the victim a card; every list runs Swords / Path at 1 |
| 16 | Refute Destiny | 2 | NEW | NO | NO | NO | NO | NO | Green or blue targets only |
| 17 | Repurposed Enforcer | 2 | NEW | NO | NO | NO | NO | NO | Attack trigger feeds a Jace token; no list attacks with a wide board |
| 18 | Skrelv's Hive | 2 | REPRINT | NO | NO | NO | NO | NO | Upkeep life loss for toxic Mites that can't block; no poison plan |
| 19 | Staff of the Storyteller | 2 | REPRINT | NO | NO | NO | NO | NO | {W}, {T}: draw one per token event — engine already draws 6+ a turn off Arcanis/Shorikai; Cap can't untap artifacts |
| 20 | Surgical Precision | 2 | NEW | NO | NO | NO | NO | NO | Toughness-4+ removal or draw one — below the lists' 1-mana answers |
| 21 | Teyo, Lightshield Expert | 2 | NEW | NO | NO | NO | NO | NO | One-shot hexproof + counter on a 1/1; counters has Giver / Mother / Patriot doing it every turn |
| 22 | Tomik, Orzhov Lawmage | 2 | NEW | NO | NO | NO | NO | NO | An Advisor, but a Petitioner is strictly better (mills, blue devotion); its flying grant needs +1/+1 counters these lists don't place |
| 23 | Unflinching Hortimancer | 2 | NEW | NO | NO | NO | NO | NO | Grows itself on lifegain; counters wants the counters on Cap |
| 24 | White Sun's Twilight | 2 | REPRINT | NO | NO | NO | NO | NO | X ≥ 5 destroys all other creatures incl. Cap; Mites can't block |
| 25 | Danitha, Sword of Hope | 3 | NEW | NO | NO | NO | NO | NO | Draws once per turn on Equipment / creature-targeting casts; counters' Sram draws on every Equipment/Aura uncapped, and most turns you equip (an ability), not cast |
| 26 | Flawless Maneuver | 3 | REPRINT | **SIDE** | NO | IN | IN | IN | In engine/mill/petitioners; main bench — free with Cap, keeps the crew team through a destroy wipe (competes with Swiftfoot Boots); counters already has Mithril Coat + 6 protection pieces |
| 27 | Generous Revival | 3 | NEW | NO | NO | NO | **SIDE** | **MAIN** | Flashback reanimation of any creature MV ≤ 3 — a THIRD graveyard-castable route to Thassa's Oracle (and the only one besides Sevinne's that reaches Lab Man): petitioners MAIN over Return to the Ranks; mill bench (same grounds, lower priority) |
| 28 | Germinate Recruits | 3 | NEW | NO | NO | NO | NO | NO | X Cadets where X = life gained this turn; counters converts its life into counters on Cap, and tokens are a side output |
| 29 | Graft Surgeon | 3 | NEW | NO | NO | NO | NO | NO | Counter-moving 2-drop, no engine |
| 30 | Koth of the Homestead | 3 | NEW | NO | NO | NO | NO | NO | One Plains counter + 1 life per land drop; below counters' per-turn engines |
| 31 | Lyra, Archangel of Dawn | 3 | NEW | NO | NO | NO | NO | NO | Counters only on Angels — Archangel of Thune is the only other |
| 32 | Memory Trap | 3 | NEW | NO | NO | NO | NO | NO | O-Ring at 3; every list's removal is cheaper and instant |
| 33 | Rescue Girl, First Responder | 3 | NEW | NO | NO | NO | NO | NO | Your-turn bounce of your own permanent: re-buys a Trophy/Tribute Mage ETB at full mana each time — too slow |
| 34 | Shatterwing Pegasus | 3 | NEW | NO | NO | NO | NO | NO | Flying 2/3 with a {4}{W} team pump |
| 35 | Stroke of Midnight | 3 | REPRINT | IN | IN | NO | NO | NO | In main and counters; engine/mill/petitioners already run 9–12 cheaper answers |
| 36 | Teferi's Reproach | 3 | NEW | NO | NO | NO | NO | NO | Phases out ONE opponent's board and freezes their life total — blanks your own Throne / Crawler drain and Petitioner targeting on them; a political fog, not interaction |
| 37 | Way of the Mentor | 3 | NEW | NO | NO | NO | NO | NO | Jace token + loyalty on lifegain; no planeswalker plan |
| 38 | Yoshimaru, Beloved Companion | 3 | NEW | NO | **MAIN** | NO | NO | NO | "That many plus one" on every +1/+1 placement — a second Lae'zel in a list built on many small placements: counters MAIN over Bard the Bowman; lowers Heliod + Ballista's start to X=1 (flag); other lists place few counters |
| 39 | Your Fate Ends Here | 3 | NEW | NO | NO | NO | NO | NO | Instant removal for MV ≥ 3 only; the lists' 1-mana exile is better |
| 40 | Flickering Hound | 4 | NEW | NO | NO | NO | NO | **SIDE** | Each creature SPELL blinks a double-tapped Advisor back as a new object → Cap refunds it again (+2 taps ≈ half a mill-12), or re-triggers Thassa's Oracle; petitioners bench over a Petitioner copy. Elsewhere blinked tappers come back summoning-sick for {T} |
| 41 | Thalia, the Survivor | 4 | NEW | NO | NO | NO | NO | NO | Tax piece (flag: this pod removes hate pieces — rating input, not a veto) on a 4-mana lifelink 3/4; carries no list's plan |
| 42 | Way of the Healer | 4 | NEW | NO | NO | NO | NO | NO | Jace token + Cadet-making loyalty ability; no planeswalker plan |
| 43 | Yuriko, Blade of the Mighty | 4 | NEW | NO | NO | NO | NO | NO | Urdnan already gives a 2+-counter Cap double strike every attack; Yuriko's combat lock also switches off your own Giver / Mother / Patriot and Jitte mid-combat (self-hit) |
| 44 | Fateshaper Aspirant | 5 | NEW | NO | NO | NO | NO | NO | 5-mana ETB value body |
| 45 | Saheeli, Consul of Oversight | 5 | NEW | NO | NO | NO | NO | NO | 5-mana Advisor making one Thopter a turn off scry/surveil the lists barely do |
| 46 | Sunfall | 5 | REPRINT | NO | NO | NO | NO | NO | Exiles your own board |
| 47 | Dack Fayden, Helping Hand | 6 | NEW | NO | NO | NO | NO | NO | Hands each opponent a creature from your library |
| 48 | Elspeth, Sun's Champion | 6 | REPRINT | NO | NO | **SIDE** | NO | NO | Engine: three Soldiers a turn from a walker that survives creature wipes — bench over Gideon, Ally of Zendikar at +2 MV; counters: its −3 kills a pumped Cap |
| 49 | Hexhaven Battalion | 6 | NEW | NO | NO | NO | NO | NO | 6-mana three Cadets (untapped) + Jace token; landcycling is its best mode |
| 50 | Kindred Judgment | 7 | NEW | NO | NO | NO | **SIDE** | **SIDE** | Name HUMAN: Cap, every Petitioner, Augustin, Masako, Lab Man, Snapcaster (and mill's Human Advisors/Wizards) survive — a near one-sided wrath at 7 (6 under Augustin); bench for both mill lists |
| 51 | Ob Nixilis, the Ascended | 7 | NEW | NO | NO | NO | NO | NO | 7 MV; ETB hits only tapped creatures |
| 52 | Overlord of the Mistmoors | 7 | REPRINT | NO | NO | NO | NO | NO | Impending for 4 = two untapped fliers once; engine's token makers make two per turn each |
| 53 | Serra's Emissary | 7 | REPRINT | NO | NO | NO | NO | NO | 7 MV protection body |
| 54 | Ghalta the Immovable | 9 | NEW | NO | NO | NO | NO | NO | Toughness-matters; nothing here has defenders |
| 55 | Return to the Light Realms | 9 | REPRINT | NO | NO | NO | NO | NO | 9-mana HAND-only sorcery; Raise the Past does the Oracle job at 4, and graveyard-castable recursion is the real gap |
| 56 | Brainstorm | 1 | REPRINT | NO | NO | NO | IN | NO | In mill; selection, not cards, elsewhere |
| 57 | Diviner of Victory // Unwind History | 1 | NEW | NO | NO | NO | NO | NO | Prepared bounce of a MV ≤ 3 creature; the copy is a noncreature spell (no Advisor reducers) |
| 58 | Occult Epiphany | 1 | REPRINT | NO | NO | NO | NO | NO | Loot X for Spirits; lists want draws, not rummage |
| 59 | Perfected Theory | 1 | NEW | NO | NO | NO | NO | NO | One-mana P/T trick |
| 60 | Unsummon | 1 | REPRINT | NO | NO | NO | NO | NO | Tempo bounce; lists run permanent answers |
| 61 | Yuriko, Hope from the Shadows | 1 | NEW | NO | NO | NO | NO | NO | Flash 1/1 with surveil 2 — a trickle |
| 62 | Countersculpt | 2 | NEW | NO | NO | NO | NO | NO | A Cancel unless you behold a Jace (Jace, Wielder of Mysteries in hand counts); Counterspell / Dovin's Veto already in every list |
| 63 | Cryotheory Adept | 2 | NEW | NO | NO | NO | NO | NO | Prowess 2/1 with a graveyard stun |
| 64 | Fblthp, Impossibly Lost | 2 | NEW | NO | NO | NO | NO | NO | Empty-library win needs COMBAT damage to an opponent; none of the self-mill lists attack |
| 65 | Geist of Saint Thalia | 2 | NEW | NO | NO | NO | NO | NO | Noncreature reducer; lists' spells are mostly creatures/cheap |
| 66 | Icy Reception | 2 | NEW | NO | NO | NO | NO | NO | Soft counter for creature/legendary spells |
| 67 | Precise Redaction | 2 | NEW | NO | NO | NO | NO | NO | Counters white or black only |
| 68 | Proft, Consulting Detective | 2 | NEW | NO | NO | NO | NO | NO | Pay {2} per scry/surveil to draw; lists barely scry |
| 69 | Samut, Tyrant of Naktamun | 2 | NEW | NO | NO | NO | NO | NO | Split second for your instants/sorceries — nothing here needs it |
| 70 | Surveillance Phantasm | 2 | NEW | NO | NO | NO | NO | NO | Defender flier needing surveil to attack |
| 71 | Tetsuko Umezawa, Fugitive | 2 | REPRINT | NO | NO | NO | NO | NO | Power/toughness ≤ 1 unblockable; Cap and the Vehicles are big |
| 72 | Theorist's Proxy | 2 | NEW | NO | NO | NO | NO | NO | Flash 0/3 Jace-token maker |
| 73 | Arni, Humble Scribe | 3 | NEW | NO | NO | NO | NO | NO | Loot engine that untaps itself on nontoken ETBs (bounded, no loop): filtering, not cards — petitioners' gap is cards (see Cruel Calculations) |
| 74 | Brainsurge | 3 | REPRINT | NO | NO | NO | NO | NO | Brainstorm+1 at 3 mana; selection |
| 75 | Chandra, Chill of Compliance | 3 | NEW | NO | NO | NO | NO | NO | Spell-slinger walker; no list is noncreature-heavy |
| 76 | Cruel Calculations | 3 | NEW | NO | NO | NO | **SIDE** | **MAIN** | Draw X = cards put into target player's graveyard from their library this turn: one tap-four activation = 12, Cap's refund = 24; drawing IS library depletion, and with Jace / Lab Man out it is a Mathemagics-style closer. Petitioners MAIN (the list has ONE draw card); mill bench over Fact or Fiction |
| 77 | Divining Duelist | 3 | NEW | NO | NO | NO | NO | NO | Flash ETB tap/untap/loot — one-shot (a Resto blink repeats it once, bounded) |
| 78 | Infinite Coursework | 3 | NEW | NO | NO | NO | NO | NO | Aura lockdown on one creature |
| 79 | Jace's Machinations | 3 | NEW | NO | NO | NO | NO | NO | Instant-speed Jace activations + Jace token; no Jace plan |
| 80 | Lyra, Tolarian Archangel | 3 | NEW | NO | NO | NO | NO | NO | One untapped 3/3 per end step after 3+ draws; engine's Wellguard / Schoolmaster make two per turn |
| 81 | Mindseeker Oculus | 3 | NEW | NO | NO | NO | NO | NO | 2/1 that makes a Jace token |
| 82 | Proteus Staff | 3 | REPRINT | NO | NO | NO | NO | NO | Sorcery-speed polymorph; no target plan |
| 83 | Seasoned Cryomancer | 3 | REPRINT | NO | NO | NO | NO | NO | Loot-2 + stun; selection |
| 84 | Sphinx's Approach | 3 | NEW | NO | NO | NO | NO | NO | Draw 2 at 3; the any-number clause needs five copies to fetch a Sphinx nobody runs |
| 85 | Variable Chaser // Arc of Fortune | 3 | NEW | NO | NO | NO | NO | NO | Prepared symmetric wheel |
| 86 | Way of the Cryomancer | 3 | NEW | NO | NO | NO | NO | NO | Jace token + a copy-spell loyalty ability; no spell plan |
| 87 | Fact or Fiction | 4 | REPRINT | NO | NO | NO | IN | NO | In mill; the others have creature-based draw |
| 88 | Hapatra, the Desert Frost | 4 | NEW | NO | NO | NO | NO | NO | LOOP HAZARD: "{2}{U}: Untap target creature" is a second untapper — in engine it untaps Ioreth, Ioreth untaps a stationed Uthros (U per artifact) = unbounded mana → unbounded Arcanis; bounded elsewhere but a 4-mana tempo body |
| 89 | Plan for All Outcomes | 4 | NEW | NO | NO | NO | NO | NO | 4-mana enchantment tuck; lists' answers are cheaper |
| 90 | Protege's Awakening | 4 | NEW | NO | NO | NO | NO | NO | Draw 1 + Jace token at 4 |
| 91 | Sphinx of False Conclusions | 4 | NEW | NO | NO | NO | NO | NO | Attack-loot flier; no list attacks with it |
| 92 | The Theorist, Jace Beleren | 4 | REPRINT | NO | NO | **MAIN** | NO | NO | Draws at EACH opponent's draw step (3 a rotation → Psychosis Crawler 3 to each opponent), +1 makes a blue 1/1 every turn (Throne body, loots under Unctus), −2 bounces one artifact/creature per opponent, and survives the creature wipes that ended the pilot's games: engine MAIN over Fallowsage. Petitioners: mandatory off-turn draws can deck you before Jace/Lab Man land (hazard) |
| 93 | Traxos, Academy Guardian | 4 | NEW | NO | NO | NO | NO | NO | Noncreature-cast discount body |
| 94 | Jace, Reality Sculptor | 5 | NEW | NO | NO | NO | **SIDE** | NO | 0: exile all but the bottom card of EACH opponent's library at 25 loyalty among Jaces (tokens and Jace, Wielder count) — the only table-wide mill answer to "target player is singular"; ~3 turns with 5+ Islands. Mill bench over Traumatize; petitioners pivoted to self-mill |
| 95 | Undulating Witness | 5 | NEW | NO | NO | NO | NO | NO | Flier with landcycling |
| 96 | Way of the Mind Sculptor | 5 | NEW | NO | NO | NO | NO | NO | Jace token + draw on big loyalty spends |
| 97 | Yargle, Goliath of Otaria | 5 | NEW | NO | NO | NO | NO | NO | Vanilla 3/9 |
| 98 | Mass Polymorph | 6 | REPRINT | NO | NO | NO | NO | NO | Exile your creatures to reveal random ones — anti-synergy with tokens/commander |
| 99 | Ruric Thar, Biomagus | 6 | NEW | NO | NO | NO | NO | NO | 6-mana prowess flier |
| 100 | Shark Typhoon | 6 | REPRINT | NO | NO | NO | NO | NO | 6-mana; lists cast mostly creatures |
| 101 | Synthetic Destiny | 6 | REPRINT | NO | NO | NO | NO | NO | Exile-your-board polymorph |
| 102 | Azorius Signet | 2 | REPRINT | NO | NO | NO | NO | NO | A rock Cap can't double; every list already sits on its 40-source floor |
| 103 | Fatehold Charm | 2 | NEW | NO | NO | NO | NO | NO | Modal charm, no mode beats the lists' dedicated cards |
| 104 | Fatehold Chronologist // Peer Review | 2 | NEW | NO | NO | NO | NO | NO | 1/2 flier + prepared Cadet (a noncreature copy — no Advisor reducers) |
| 105 | Proctor of Potential | 2 | NEW | NO | NO | NO | NO | NO | Surveil 1 per creature ETB — a trickle of self-mill; not an Advisor |
| 106 | Talisman of Progress | 2 | REPRINT | NO | NO | NO | IN | IN | In mill and petitioners; rocks aren't doubled by Cap in the others |
| 107 | Prudent Fateseer // Peer Review | 3 | NEW | NO | NO | NO | NO | NO | Prepared Cadet + team +1/+0 on surveil |
| 108 | Denzilore Fatehold | 4 | NEW | NO | NO | NO | NO | NO | Counters on scry/surveil — the lists barely surveil |
| 109 | Desperate Futurescribe | 4 | NEW | NO | NO | NO | NO | NO | 4-mana combat pump |
| 110 | Semester Foreseer // Peer Review | 4 | NEW | NO | NO | NO | NO | NO | 4-mana body with a prepared Cadet |
| 111 | Currency Converter | 1 | REPRINT | NO | NO | NO | NO | NO | Discard engine; no discard payoffs outside engine's Monument |
| 112 | Eye of Jace | 1 | NEW | NO | NO | NO | NO | NO | Upkeep surveil 1 then a one-shot 2-damage ping |
| 113 | Sol Ring | 1 | REPRINT | IN | IN | IN | IN | IN | Already in all five lists |
| 114 | Afterthought Sentry | 2 | NEW | NO | NO | NO | NO | NO | 2/2 graveyard hate on attack |
| 115 | Arcane Signet | 2 | REPRINT | IN | IN | IN | IN | IN | Already in all five lists |
| 116 | Fellwar Stone | 2 | REPRINT | NO | NO | NO | NO | IN | In petitioners; the others are at their source floor with better rocks |
| 117 | Karn, Argent Defender | 2 | NEW | NO | NO | NO | NO | NO | Torpor effect (flag: hate piece) that is a SELF-HIT — shuts off Thassa's Oracle, Tribute/Trophy Mage, Skyclave, Simulacrum Synthesizer, Urza, Seriema ETBs |
| 118 | Living Library | 2 | NEW | NO | NO | NO | NO | NO | {6} tuck on a 0/4 |
| 119 | Medic's Kitesail | 2 | NEW | NO | NO | NO | NO | NO | +1/+0 flying Equipment with a 1-life attack trigger; counters has Maul |
| 120 | The Echoverse Fulcrum | 2 | NEW | NO | NO | NO | NO | NO | Colourless wrath that also kills Cap and every crew/Advisor body; main already has Supreme Verdict + Split Up |
| 121 | Chromatic Lantern | 3 | REPRINT | NO | NO | NO | NO | NO | Two-colour decks don't need it |
| 122 | Keeper of the Quiet Hour | 3 | NEW | NO | NO | NO | NO | NO | 3/2 artifact body + Jace token |
| 123 | Murmuring Volume | 3 | NEW | NO | NO | NO | NO | NO | 3-mana rock/rummage; Signet is better |
| 124 | Traxos, Scourge Eternal | 4 | NEW | **SIDE** | NO | NO | NO | NO | 5-power crew/station body that untaps whenever you cast an artifact or creature (and under Lita / Unwinding Clock) — main bench over Cloudspire Captain; loop-audited bounded (untaps only itself, per cast) |
| 125 | Archive Arbiter | 6 | NEW | NO | NO | NO | NO | NO | 6-mana ETB flier |
| 126 | Ginger, Queen of Sweets | 6 | NEW | NO | NO | NO | NO | NO | 6-mana monarch; slow |
| 127 | Omnath, Locus of the Void | 7 | NEW | NO | NO | NO | NO | NO | 7-mana landfall mana |
| 128 | Darksteel Angel | 9 | NEW | NO | NO | NO | NO | NO | 9 mana |
| 129 | Emrakul, the Exigent Doom | 10 | REPRINT | NO | NO | NO | NO | NO | 10-mana Eldrazi |
| 130 | Memnarch, the Warden | 10 | NEW | NO | NO | NO | NO | NO | 10 mana |
| 131 | Command Tower | 0 | REPRINT | IN | IN | IN | IN | IN | Already in all five lists |
| 132 | Deserted Beach | 0 | REPRINT | IN | IN | IN | IN | IN | Already in all five lists |
| 133 | Exotic Orchard | 0 | REPRINT | NO | NO | NO | NO | NO | Two-colour decks already have every colour they need |
| 134 | Fabled Passage | 0 | REPRINT | NO | NO | NO | NO | NO | Tapped basic fetch; the lists run Strand / Vista already |
| 135 | Fatehold Annex | 0 | NEW | NO | NO | NO | NO | NO | Tapped unless you control a planeswalker — the lists run 0–3 |
| 136 | Glacial Fortress | 0 | REPRINT | IN | IN | IN | IN | IN | Already in all five lists |
| 137 | Hall of Echoes | 0 | NEW | **SIDE** | **SIDE** | NO | NO | NO | {5}: copy a creature, legend rule off — copying Arcanis = two taps under Cap = 6 cards (main/counters bench over a basic). LOOP HAZARD in engine and mill: copying Ioreth makes a second "{T}: untap" creature, and Ioreth's two-legend mode gives the pair a surplus untap (unbounded; Orb turns it into a mill-out). Petitioners: a {U} Petitioner buys the same two taps permanently |
| 138 | Hexhaven Dueling Arena | 0 | NEW | NO | NO | NO | NO | NO | Prepare enabler; no prepare creatures |
| 139 | Island | 0 | REPRINT | IN | IN | IN | IN | IN | Basic — already in all five lists |
| 140 | Mystic Gate | 0 | REPRINT | IN | IN | IN | IN | IN | Already in all five lists |
| 141 | Path of Ancestry | 0 | REPRINT | NO | NO | NO | NO | NO | Enters tapped; scry on Human creature spells is minor |
| 142 | Plains | 0 | REPRINT | IN | IN | IN | IN | IN | Basic — already in all five lists |
| 143 | Prairie Stream | 0 | REPRINT | IN | IN | IN | IN | IN | Already in all five lists |
| 144 | Reflecting Pool | 0 | REPRINT | NO | NO | NO | NO | NO | Two-colour decks; duals already cover it |
| 145 | Restless Anchorage | 0 | REPRINT | NO | NO | NO | NO | NO | Tapped creature-land at {1}{W}{U} |
| 146 | Room of Refuge | 0 | NEW | NO | NO | NO | NO | NO | Tapped mono-colour land with a {5} sac |
| 147 | Theorist's Sanctum | 0 | NEW | NO | NO | NO | NO | NO | Enters tapped unless you behold a Jace; its {2}{U} Jace-token sink is slow card flow |
| 148 | Turbulent Shore | 0 | NEW | NO | NO | NO | **SIDE** | **SIDE** | Plains Island (Flooded Strand fetches it), untapped once opponents total 8 lands (~their turn 3): a W source in place of a basic Island in the two 12-Island lists; the others are short on basics already |

---

## Proposed swaps (MAIN) — full analysis

Nothing below is applied. Per the standing rule, each row is its own decision.

### `petitioners` 1 — Cruel Calculations in, 1× Persistent Petitioners out (27 → 26)

**Oracle:** Cruel Calculations {2}{U} sorcery — *"Draw X cards, where X is the number of cards that were
put into target player's graveyard from their library this turn."*

**Cost-out:** blue spell → Augustin makes it **{1}{U}**. (Horn/Incubator don't touch it — not a creature.)
Snapcaster Mage can flash it back.

**Why it fits this list specifically:**
- The list has **one** draw card (Mystic Remora). The ceiling once the reducers are out is cards in hand —
  the 2026-09-16 decision log already named that ("the only card that attacks the real ceiling of
  cards-in-hand once costs drop" was said of Reflections of Littjara).
- **X is big here and on your own library.** One tap-four activation mills 12; Cap's refund makes it 24.
  Mesmeric Orb's untap-step mills (one per untapping permanent, ~10 by turn 5) also count "this turn".
  Traumatize → X = half your library.
- **Drawing is library depletion.** Mill yourself 24, then draw 24: the library drops 48 in one main phase.
- **It is a closer** with Jace, Wielder of Mysteries or Laboratory Maniac out — draws are individual
  (CR 121.2), so the first draw from an empty library wins (LEDGER 2026-09-17, "target player draws N").
- Aimed at an opponent you just milled, it refills you from *their* number without touching the count
  you're managing on yourself.

**Self-hits / hazards:** drawing more than your library with no Jace/Lab Man loses at the next SBA
(CR 104.3c / 704.5b). It's a sorcery you aim and time yourself, so this is a play-pattern note, not a
structural risk: target the player whose X you can afford, or land Jace/Lab Man first. No loop.

**Role table — card flow & self-mill, scored against the current list:**

| Card | MV (eff.) | What it gives per cast | Needs | Verdict |
|---|---|---|---|---|
| **Cruel Calculations** (cand.) | 3 ({1}{U}) | 12–24+ cards drawn; library −X; closer with Jace/Lab Man | something milled this turn (Orb, one tap-four) | IN |
| Mathemagics | X,X,U,U | 2^X draws; closer; X=0 kills a decked opponent | Jace/Lab Man for self-win | keep — the exponential closer, Muddle-findable (MV 2) |
| Traumatize | 5 | half your library | nothing | keep — fastest single self-mill |
| Fraying Sanity | 3 | compounding end-step mill, 4× a rotation | a mill that turn | keep — riskiest (upkeep trap) but the engine of the self-mill turn |
| Mesmeric Orb | 2 | 1 per untap, every player | untaps | keep — also feeds Cruel Calculations' X |
| Mystic Remora | 1 | ~1–3 early cards, then dies to upkeep | opponents' noncreature spells | **alt. cut** — early draw that fades; swapping it keeps draw count at 1 |
| Persistent Petitioners #27 | 2 ({U}) | +1 Advisor copy | — | **nominated cut** |

**The honest cost of the nominated cut, measured:** Advisors in the 99 go 30 → 29 (27 Petitioners + Augustin,
Masako, Omen Hawker). P(≥4 Advisors in the first 11 cards) **0.440 → 0.408** (−3.2 points); in 12 cards
0.522 → 0.489. Cruel Calculations recovers more than that once it resolves (a 12-card draw holds ~3.5
Advisors on average), but it cannot help *before* the first activation. If the pilot values the
four-Advisor floor over the burst, cut Mystic Remora instead — that keeps the engine density identical
and still upgrades the draw from "a few early cards" to "a burst of 12+".

**Curve:** petitioners avg MV 2.38 → 2.41 (both MAINs together), MV ≤ 2 **45 → 43**, MV ≤ 3 58 → 58.

### `petitioners` 2 — Generous Revival in, Return to the Ranks out

**Oracle:** Generous Revival {2}{W} sorcery — *"Return target creature card with mana value 3 or less from
your graveyard to the battlefield with an additional +1/+1 counter on it. Flashback {4}{W}."*

**Cost-out:** white → Augustin: **{1}{W}** from hand, **{3}{W}** flashback (cost reduction applies to the
flashback cast, CR 601.2f).

**Deciding axis — where it can be cast from.** The ledger lesson this list was rebuilt on (2026-09-17,
"In a self-mill deck, count recursion by WHERE it can be cast from"): once your library is gone your hand
is often empty and everything is in the graveyard, so only graveyard-castable recursion is load-bearing.
The list has two such routes (Sevinne's Reclamation, Dawn). Generous Revival is a third, and the only one
besides Sevinne's that puts **Laboratory Maniac** (MV 3) straight onto the battlefield (Dawn returns power ≤ 2
creatures to *hand*).
It returns Thassa's Oracle straight to the battlefield, so the Oracle's ETB checks immediately.

**Role table — Get the Win Back (every card in the role):**

| Card | Castable from | Returns | Reaches Oracle / Lab Man | MV | Verdict |
|---|---|---|---|---|---|
| **Generous Revival** (cand.) | hand **or graveyard** | one creature MV ≤ 3 → battlefield | ✓ / ✓ | 3 | IN |
| Sevinne's Reclamation | hand **or graveyard** (+copy) | permanent MV ≤ 3 → battlefield | ✓ / ✓ | 3 | keep |
| Dusk // Dawn | Dawn: **graveyard only** | power ≤ 2 creatures → hand (mass) | ✓ / ✓ (to hand) | 4 / 5 | keep — also the list's sweeper |
| Raise the Past | hand only | all creatures MV ≤ 2 → battlefield (mass) | ✓ / ✗ | 4 | keep — the mass reload |
| Snapcaster Mage | hand only | flashback to a milled Raise / Mathemagics / Revival | via those | 2 | keep — turns every sorcery here into a graveyard route |
| Muddle the Mixture | hand only | transmute MV 2 → Oracle / Mathemagics | tutor | 2 | keep |
| Return to the Ranks | hand only | X creatures MV ≤ 2 → battlefield, convoke | ✓ / ✗ | X+2 | **nominated cut** — the second hand-only mass reload next to Raise the Past |

**Counter-argument, stated:** Return to the Ranks with convoke is near-free on a live board (Cap untaps the
convoked creatures) and is the better mid-turn "Oracle + three Petitioners" play. Its failure is exactly
the empty-hand state self-mill produces — the same failure the Dusk // Dawn swap was made to fix. If the
pilot would rather cut a Petitioner here too, that is the alternative (see the measured cost above).

**Self-hits:** none — flashback exiles it, so Snapcaster + Revival is bounded. No untap, no loop.

### `engine` 1 — Grand Crescendo in, Akroma's Will out

**Oracle:** Grand Crescendo {X}{W}{W} instant — *"Create X 1/1 green and white Citizen creature tokens.
Creatures you control gain indestructible until end of turn."*

**Cost-out:** the tools count it at MV 2; the realistic cast is **X = 2 for 4 mana** (Akroma's Will's
price), and X = 0 is a 2-mana Flawless Maneuver when Cap is not out.

**Deciding axis — both halves live.** In a list that "never needs to attack" (gameplan 2026-09-16),
Akroma's Will's flying/double-strike mode is dead; its live half is indestructible + protection from each
colour + lifelink. Grand Crescendo's live halves are indestructible **and** bodies: X Citizens, doubled by
Anointed Procession and by Mondrak (4X with both), are exactly the Throne / Halo Fountain / crew fodder the
deck needs when the wipe resolves and the opponents' side is empty. Cast at an opponent's end step it is
also just a token spell for the Throne pass.

**What Akroma's Will does that Crescendo doesn't:** protection from each colour stops *targeted* coloured
removal on your whole team that turn. Neither stops exile, bounce or −X/−X; those are covered by the
phasing trio, Eerie Interlude and the counterspells.

**Role table — Protection: Let the Wipe Resolve (every card):**

| Card | Cost | Destroy | Damage | Exile | −X/−X | Bounce | Second job | Verdict |
|---|---|---|---|---|---|---|---|---|
| **Grand Crescendo** (cand.) | {X}{W}{W} | ✓ | ✓ | — | — | — | X (2X/4X) bodies | IN |
| Teferi's Protection | 3 | ✓ | ✓ | ✓ | ✓ | ✓ | — | keep |
| Clever Concealment | 4, convoke | ✓ | ✓ | ✓ | ✓ | ✓ | — | keep |
| Guardian of Faith | 3, flash | ✓ | ✓ | ✓ | ✓ | ✓ | 3/2 body | keep |
| Eerie Interlude | 3 | ✓ | ✓ | ✓ | ✓ | ✓ | re-ETBs | keep |
| Fierce Guardianship | free w/ Cap | counters any noncreature wipe | | | | | — | keep |
| Flawless Maneuver | free w/ Cap | ✓ | ✓ | — | — | — | — | keep |
| Restoration Angel | 4, flash | one creature | | | | | mid-turn tap refresh, re-ETB a Mage | keep — its second job is live |
| Akroma's Will | 4 | ✓ | ✓ | — | — | — | pro-colours; DS mode dead here | **nominated cut** |

**Self-hits:** none — Citizens are green-white, so Unctus's blue-only loot doesn't touch them. Loop audit:
no untap. **Curve:** engine avg MV 2.91 → 2.88 (both engine MAINs), MV ≤ 2 23 → 24 (tool counts X at 0),
MV ≤ 3 44 → 45.

### `engine` 2 — The Theorist, Jace Beleren in, Fallowsage out

**Oracle (reprint):** {2}{U}{U}, loyalty 3 — *"At the beginning of each opponent's draw step, you draw a
card. +1: Create a 1/1 blue Illusion creature token. −2: For each opponent, return up to one target
artifact or creature that player controls to its owner's hand. −6: Draw three cards. Then put X +1/+1
counters on each creature you control, where X is the number of cards in your hand."*

**Deciding axis — resilience of the draw engine.** The pilot's recorded loss pattern on this list is a turn
4–5 wipe (decisions 2026-09-15/16). Every card in the tap-draw role is a creature that dies to it; The
Theorist does not. It draws **3 cards a rotation** (one per opponent's draw step) with no tapping — each is
1 to each opponent through Psychosis Crawler, on *their* turns. Its +1 leaves a blue 1/1 every turn (a
body for the Throne pass; loots under Unctus when tapped, feeding Monument to Endurance), and −2 is a
one-sided bounce of each opponent's best creature or artifact.

**Role table — Tap Draw & Becomes-Tapped Payoffs (all six), scored against the current list:**

| Card | MV | Cards / turn | Body for Throne | Survives creature wipe | Extra | Verdict |
|---|---|---|---|---|---|---|
| **The Theorist, Jace Beleren** (cand.) | 4 | 3 per rotation (opponents' turns) | a new 1/1 each turn | ✓ | −2 bounce ×3 | IN |
| Arcanis the Omnipotent | 6 | 6 on your turn | ✓ | ✗ | Ioreth target | keep — the ceiling |
| Shorikai, Genesis Engine | 4 | 4 (loot) + 2 Pilots | Pilots ✓ | ✓ (not a creature) | crew 8 body | keep |
| Unctus, Grand Metatect | 3 | grants loot to every blue creature | ✓ | ✗ | the lord | keep |
| Mechan Navigator | 2 | 2 loots | ✓ | ✗ | cheapest | keep |
| Tui and La, Moon and Ocean | 4 | 2 | ✓ (3/3, grows on untap) | ✗ | counters on untap | keep |
| Fallowsage | 4 | 2 (may) | ✓ (2/2) | ✗ | — | **nominated cut** — same rate as Tui and La with nothing on top |

**Counter-argument, stated:** Fallowsage is a creature — it counts for Throne itself and is a Halo Fountain
untap target, and its draws land on your turn when Monument / Crawler sequencing is easiest. The Theorist
is attackable and its draws are mandatory.

**Self-hits / hazards:** the draws are **mandatory** ("you draw a card") on top of Unctus's mandatory loots
(LEDGER 2026-09-16, "a granted becomes-tapped loot plus a free tapper can deck you") — count the library;
Jace, Wielder of Mysteries is the list's insurance. Theorist and Jace, Wielder are different names, so the
legend rule never touches them. No untap, no loop.

### `counters` — Yoshimaru, Beloved Companion in, Bard the Bowman out

**Oracle:** {2}{W} 2/2 Dog — *"If one or more +1/+1 counters would be put on a creature you control, that
many plus one +1/+1 counters are put on it instead. {6}: Put a +1/+1 counter on target legendary
creature."*

**Deciding axis — counters per turn.** This list's counters arrive as **many small placement events**:
Light of Promise (one per lifegain event), Archangel of Thune (each creature, per event), Heliod (per
event), Agent Phil Coulson (twice a turn under Cap), Urdnan, Elspeth's 0. LEDGER 2026-09-10 ("N counters
from one instruction are ONE placement event") says a "+1" amplifier adds once per event — so the more
events, the more it's worth, and this list is made of events (Soul Warden, Auriok Champion, Resplendent
Mentor's white creatures each gaining 1 twice a turn under Cap). Stacked with Lae'zel it is +2 per event;
the two replacements commute (CR 616.1 — you order them; both add). Its {6} is also the mana sink the
2026-09-10 open question asked for ("the curve is low for 41 mana sources"), and Cap is legendary.

**Role table — counter engines, amplifiers and life-gain → counters (every card):**

| Card | MV | Counters it produces or adds per turn (current list) | Dependency | Verdict |
|---|---|---|---|---|
| **Yoshimaru** (cand.) | 3 | +1 on **every** placement event — one per lifegain event on Light of Promise, one per creature per event on Archangel | any counter source (Light of Promise, Archangel, Heliod, Coulson, Urdnan, Elspeth, Ballista) | IN |
| Lae'zel, Vlaakith's Champion | 3 | +1 per event (and loyalty) | same | keep |
| Light of Promise | 3 | N per lifegain event on Cap | lifegain | keep — the engine |
| Archangel of Thune | 5 | +1 on each creature per event | lifegain | keep |
| Heliod, Sun-Crowned | 3 | +1 per event; grants lifelink | lifegain | keep (also the Ballista loop) |
| Agent Phil Coulson | 2 | +1 on each other Hero, ×2 under Cap | Heroes (Cap, Super-Soldier, Patriot) | keep |
| Elesh Norn, Mother of Machines | 5 | doubles Soul Warden-type ETB triggers | creatures entering | keep |
| Soul Warden / Auriok Champion | 1 / 2 | lifegain events per creature entering | creatures entering | keep |
| Bard the Bowman | 3 | +1 on target once a turn when you draw your 2nd card; lifelink grant usually redundant with Collar/Shadowspear (LEDGER: two lifelink sources are one) | two draws in a turn | **nominated cut** |

**Self-hits / loops:** none against the board. **Flag:** Heliod + Walking Ballista (kept deliberately,
decisions 2026-09-10) needs Ballista at 2+ counters to start; under Yoshimaru an X = 1 Ballista enters with
2 (3 with Lae'zel), so the chosen-N loop becomes live off **{2}** instead of {4}. It is the same combo, just
cheaper — say so at the table. **Curve:** unchanged (MV 3 for MV 3): avg 2.50, MV ≤ 2 33, MV ≤ 3 54.

### `main` and `mill` — no MAIN

- **main** (the oldest list): nothing in the pool is a Vehicle, Pilot, crew-matters or becomes-tapped
  card. The best fits are bench-level (below).
- **mill** (the list the pilot called "very slow"): the pool has nothing that deploys Advisors faster,
  which is the list's actual bottleneck (decisions 2026-09-17). Its best new cards are the same two the
  petitioners list takes, at lower priority.

---

## Bench (SIDE) — with what each displaces

| List | Card | Displaces | Grounds |
|---|---|---|---|
| main | Traxos, Scourge Eternal | Cloudspire Captain | 5-power crew/station body that untaps on every artifact/creature cast and under Lita / Unwinding Clock; 4 MV is the cost |
| main | Grand Crescendo | Swiftfoot Boots | wipe answer that also rebuilds crew |
| main | Flawless Maneuver | Swiftfoot Boots | free with Cap; keeps the crew team through a destroy wipe |
| main | Hall of Echoes | 1 Island | {5}: copy Arcanis → two taps under Cap = 6 cards; costs a coloured source |
| counters | Liliana the Faultless | Auriok Champion | own-creature Soul Warden + a Cap-doubled hexproof grant |
| counters | Enlightened Confidant | Brimaz, King of Oreskos | ~a card a turn off the list's lifegain |
| counters | Hall of Echoes | 1 Plains | land-slot mana sink (Arcanis copy); the list's open "low curve vs 41 sources" question |
| engine | Elspeth, Sun's Champion | Gideon, Ally of Zendikar | three bodies a turn vs one, wipe-proof; +2 MV against the pilot's curve concern |
| mill | Cruel Calculations | Fact or Fiction | same grounds as petitioners |
| mill | Generous Revival | Return to the Ranks | mill's only cheap graveyard route is Dawn (Mavinda adds {8} to any recursion that doesn't target your creature; Jace, Vryn's Prodigy's −3 needs him flipped) |
| mill | Jace, Reality Sculptor | Traumatize | table-wide library exile at 25 Jace loyalty (~3 turns) — answers "target player is singular" |
| mill | Kindred Judgment | Winds of Abandon | name Human: near one-sided wrath |
| mill | Turbulent Shore | 1 Island | W source that is untapped from ~turn 3 |
| petitioners | Flickering Hound | 1× Persistent Petitioners | each Petitioner cast refreshes a spent Advisor (+2 taps ≈ half a mill-12) or re-triggers the Oracle |
| petitioners | Kindred Judgment | Swan Song | name Human: Cap, every Petitioner, Augustin, Masako, Lab Man, Snapcaster survive |
| petitioners | Turbulent Shore | 1 Island | as mill |

---

## Traps / loop hazards

- **Hapatra, the Desert Frost — engine loop.** "{2}{U}: Untap target creature" + Ioreth ("{T}: Untap
  another target permanent") + a stationed Uthros, Titanic Godcore ("{U}, {T}: Add {U} for each artifact
  you control"): Hapatra untaps Ioreth, Ioreth untaps Uthros, Uthros pays for Hapatra with a large surplus
  → unbounded mana → unbounded Arcanis activations → Psychosis Crawler kill. Never add to `engine`
  (it is the "second untapper" the list header forbids).
- **Hall of Echoes — engine and mill loop.** "{5}: This land becomes a copy of target creature you control
  until end of turn. The 'legend rule' doesn't apply" — pointed at Ioreth it makes a second Ioreth. Two
  "{T}: untap" creatures untap each other (LEDGER 2026-09-16), and Ioreth's second mode ("untap two other
  target legendary creatures") gives the pair a surplus untap every cycle — unbounded; with Mesmeric Orb in
  `mill` that is an instant mill-out / Oracle win. Safe in `main`, `counters` and `petitioners` (no Ioreth).
- **Karn, Argent Defender** — flagged hate piece that is also a self-hit: it switches off Thassa's Oracle
  (the petitioners/mill win), Tribute/Trophy Mage, Skyclave Apparition, Simulacrum Synthesizer, Urza and
  The Seriema ETBs.
- **Loyal Tutor into Mesmeric Orb** — it puts Jace, Wielder of Mysteries on TOP; your untap step's Orb
  trigger mills it before your draw (LEDGER 2026-09-17 upkeep trap), and nothing in either list can
  recover a planeswalker from the graveyard.
- **Teferi's Reproach** — reads like protection, is a political fog on ONE opponent that also freezes their
  life total, blanking your own Throne / Crawler drain against them.
- **The Theorist in `petitioners`** — its draws are mandatory and off-turn; in a list that empties its own
  library it can deck you on an opponent's draw step before Jace / Lab Man land.
- **Campus Crier / Tomik / Saheeli / Dack Fayden** are the Advisors in the pool: none beats a Persistent
  Petitioner in either Advisor list (no mill ability, no blue devotion; Crier's power 3 dies to Dusk).
- **Prepared copies** never get Herald's Horn / Urza's Incubator discounts and never trigger Flickering
  Hound — they are noncreature spells.
