# HOB (The Hobbit) set review — Edgar Markov — 2026-08-09

**Method:** deck-brain SKILL.md. Every card evaluated from verified Scryfall oracle text in
`data/hob-candidates-edgar-markov.json` (never from memory); in-deck comparison cards re-pulled
with `bun run card` this session (Olivia's Wrath, Mirkwood Bats, Dusk Legion Duelist, Ruthless
Lawbringer, Marauding Blight-Priest, Charismatic Conqueror, Deadly Dispute). Each card checked
against the deck's actual outputs — life **loss** (drains) and **lifegain**, rarely noncombat
damage — and audited against the deck's own board: Anowon's self-edict, Olivia's Wrath's
non-Vampire -X/-X, and the standing cheap-cards pass (MV≤2 preferred; deck already heaviest
in its field).

**Pool:** 116 of 193 HOB cards fit Mardu {W}{B}{R} colour identity and are commander-legal.
**Zero Vampires and zero Game Changers in the pool** — no tribal adds, no bracket pressure.
Release 2026-08-14; prices are pre-release USD.

**Result: 1 MAIN, 5 SIDE, 110 NO.**

---

## Set mechanics as they matter to this deck

- **Amass Goblins (14 cards).** The token is a **0/0 black Goblin Army** (HOB amasses Goblins,
  not the Orc Armies the pre-release chatter said — same mechanic, different tribe). Either way
  it is a non-Vampire: amass never *casts* anything (no eminence), the Army misses every lord and
  count-payoff, your own **Anowon** turns it into forced-sacrifice fodder, and your own
  **Olivia's Wrath** kills it. Every amass card in the pool auto-failed the tribal audit.
- **Recruit** — "draw a card, then discard a card; if you discarded a nonland card, create a 1/1
  white Human Soldier." Filtering, not card advantage, and the token is another non-Vampire.
- **Storied / "enduring story"** (3+ artifacts, legendaries and/or Sagas, permanent once met) —
  this deck turns it on **trivially** (9 artifacts, 10+ legendaries). Worth remembering for
  future sets; no HOB storied card cleared the tribal bar anyway.
- **Ferocious** (control a power-4+ creature) — the deck can satisfy it (Edgar 4/4, Malakir
  Bloodwitch, Vein Ripper, any lord-pumped board), but both ferocious cards in-pool are
  attack-trigger beaters with no engine attached.
- **Treasure** — plentiful in the set. Treasures are *tokens*, so they trigger Mirkwood Bats on
  creation and The Sackville-Bagginses on sacrifice; this is load-bearing for two candidates.
- **Adventures** — casting the adventure half is a **noncreature cast**: no eminence token. None
  of the creature halves are Vampires either.
- **The trap card: Head of the Hunt** — "If a creature an opponent controls would die, exile it
  instead." That replacement means opponents' creatures **never die** while it's out: it turns
  off Blood Artist, Cordial Vampire, Sangromancer, Vein Ripper, Blade of the Bloodchief and
  Meathook's opponent-side triggers. Hard NO regardless of stats — do not be tempted by the 4/3
  flash body.
- **Rules flag: Gollum, Riddle Master** — its trigger says "choose one that hasn't been chosen"
  with **no "this turn" reset window** in the printed text. Read literally the three modes
  exhaust for the game. Evaluated as written (deck-brain 1.1); if a per-turn reset is errata'd
  in, it is still only a trickle on a fragile off-tribe body.

---

## Classification table — all 116 cards

Verdict key: **MAIN** = would displace a card in the 100 · **SIDE** = worth a SIDEBOARD.md
slot · **NO** = pass.

### White & colorless creatures/spells (#1–31)

| # | Name | MV | Verdict | Reason |
|---|---|---|---|---|
| 1 | Long-Bodied Grey Dog | 3 | NO | Generic value body; no aristocrats hook, off-tribe |
| 2 | Old Thrush | 2 | NO | Land-topper + gain 2; no engine |
| 3 | Troop of Ponies | 2 | NO | Slow sac-ramp; ramp role full at 8 |
| 4 | Belladonna Took | 2 | **MAIN** | Per-turn gain/draw/counters off tokens entering — the deck's most guaranteed output; displaces watch-flagged Dusk Legion Duelist |
| 5 | Bilbo's Gambit | 2 | **SIDE** | Mardu's only "counterspell": bounce any spell, gifted mode locks casting for the turn |
| 6 | Bofur, Reliable Guardian // Concerted Care | 1 | NO | Single-target protection; protection capped at 2 team-wide pieces |
| 7 | Celebrate the Mountain-king | 4 | NO | Grasp of Fate variant; fragile 3-for-1 at MV4 against the cheap-cards pass |
| 8 | Dáin, Lord of the Iron Hills | 2 | NO | Defensive attack-tax in the aggressor's deck; off-tribe |
| 9 | Dwarven Provisioner | 2 | NO | {3}{W} activated pump; deck runs 7 real anthems |
| 10 | Dwarven Shortsword | 4 | NO | Equipment tribal; token is a non-Vampire Dwarf |
| 11 | Eagle of the Great Shelf | 5 | NO | Self-pump attacker; MV5 beater |
| 12 | The Eagles Are Coming! | 2 | NO | Kicked wipe-dodge rebuilds the board as Birds, not Vampires; Boros Charm owns the seat |
| 13 | Esgaroth Garrison | 5 | NO | Creature-count beater, no engine |
| 14 | Fíli the Pathfinder | 4 | NO | Dwarf-tribal token maker; wrong tribe |
| 15 | Gleaming Splendor | 2 | NO | Needs opponents' *second* draw each turn — unreliable; $36 |
| 16 | Iron Hills Blacksmith | 2 | NO | Equipment micro-synergy the deck lacks |
| 17 | Kíli the Resourceful | 2 | NO | Draws off Dwarves/Equipment; deck has one Equipment, zero Dwarves |
| 18 | Lake-town Lookout | 1 | NO | Dies→recruit is filtering on a 1/1; token off-tribe |
| 19 | Lake-town Toymaker | 4 | NO | Conditional single-target pump |
| 20 | Magnificent End | 5 | NO | Cheap only vs tapped creatures; in-deck removal is unconditional |
| 21 | Moment of Glory | 1 | NO | Counter trick; no graveyard-cast enabler |
| 22 | The Mountain-king's Return | 3 | NO | Chapter-II reanimation misses eminence (not a cast); Phyrexian Reclamation recurs to hand and re-triggers it |
| 23 | Ori, Keeper of Songs | 3 | NO | Self-buff vanilla |
| 24 | The Queen of Dale | 2 | NO | Up to 3 recruits/turn cycle, but recruit is filtering, tokens off-tribe, $22.52 |
| 25 | Roads Go Ever, Ever On | 2 | NO | Plains-fetch saga, off-plan |
| 26 | Settle the Wreckage | 4 | NO | Anti-attack tech that ramps the attacker; Teferi's/Akroma's cover the seat |
| 27 | Stone by Sunlight | 2 | NO | Power-4+ conditional removal; in-deck removal is unconditional |
| 28 | Thorin's Last Stand | 4 | NO | Overcosted modal pump/disenchant |
| 29 | An Unexpected Party // At the Door | 4 | **SIDE** | One-sided +2/+2 typed anthem — the safe Coat of Arms; displaces Coat of Arms in §B |
| 30 | Velvetwing Butterflies // Gaze in Wonder | 3 | NO | Tap-two adventure filler |
| 31 | Vow to Erebor | 2 | NO | Dwarf/Equipment combat trick |

### Black (#60–86)

| # | Name | MV | Verdict | Reason |
|---|---|---|---|---|
| 60 | Along the Crooked Way | 3 | NO | Amass payoffs; Goblin Armies are non-Vampires your own Anowon eats |
| 61 | Azog, Moria's Ruin | 3 | NO | Removal that refunds the victim's power to its controller as an Army |
| 62 | Bilbo's Deadly Slice | 3 | NO | 3-mana Murder; the strictly cheaper Terminate was already cut |
| 63 | Crude Bent Blade | 3 | NO | 3-mana one-shot edict on a stick; Anowon/Dictate do this structurally |
| 64 | Desolation Prowler | 2 | NO | Pay-life pump in the deck that bleeds life |
| 65 | Down, Down to Goblin-town | 3 | NO | Slow saga; amass token off-tribe |
| 66 | Dreaded Bat-Cloud | 5 | NO | ~{B} 4/2 flying deathtouch most turns here, but pure stats: no eminence, Anowon/Olivia's Wrath liability |
| 67 | Front Porch Sentries | 2 | NO | Minor death rider |
| 68 | Gathering of Darkness | 4 | NO | Raise Dead + off-tribe amass at sorcery MV4 |
| 69 | Gnashing of Teeth | 3 | NO | Sorcery -5/-5; in-deck instants outclass it |
| 70 | Gollum, Riddle Master | 2 | NO | As printed, the three modes exhaust for the game (no reset window); trickle value on a fragile off-tribe body |
| 71 | Gollum, Silent Slinker // Meager Meal | 4 | NO | Vanilla menace beater; adventure gains an opponent life |
| 72 | Gollum the Abandoned | 2 | NO | Recursive drain-2 with built-in sac, but ~4 mana a loop competes with the cast engine (mana-sink pattern) |
| 73 | Great Fierce Bee | 3 | NO | Scry 1 per death event; payoff too small for the body |
| 74 | Great Ugly-Looking Goblin // Clap! Snap! | 6 | NO | MV6 off-tribe; menace rider needs counters and the body is a Goblin |
| 75 | Head of the Hunt | 4 | NO | **Trap** — exiles opponents' dying creatures, turning off the deck's opponent-death triggers wholesale |
| 76 | Inside Information | 2 | NO | X-sink theft; mana sinks compete with the cast engine |
| 77 | The Master of Lake-town | 3 | NO | Every drain also mills; charming crossover, advances no win here |
| 78 | Nighthowl Pursuer | 1 | NO | Ferocious self-pump beater |
| 79 | Rage into the Valley | 3 | NO | 3-mana draw-1 + off-tribe amass |
| 80 | Ravening Warg | 2 | NO | Ferocious gain-2 on attack; marginal |
| 81 | Reverent Howl | 3 | NO | Draw 2 lose 2 at MV3; below the sac-draw package's rate |
| 82 | Rhovanion Rampager | 3 | NO | Sac-on-attack grower; both payoffs off-tribe |
| 83 | The Sackville-Bagginses | 2 | **SIDE** | Half a Mirkwood Bats + ETB Deadly Dispute at MV2; cheap-cards-pass bench |
| 84 | Stir Up Trouble | 1 | **SIDE** | 1-mana Murder whose sac cost is pure upside here; sorcery speed keeps it out of the 100 |
| 85 | Stony-Voiced Goblins | 2 | NO | One-shot discard body |
| 86 | Supper for Spiders | 2 | **SIDE** | Steals every opponent creature Anowon/Dictate/wipes killed this turn, as lifegain-event Food |

### Red (#87–115)

| # | Name | MV | Verdict | Reason |
|---|---|---|---|---|
| 87 | Balin, Loremaster | 5 | NO | MV5 Dwarf wheel; off-plan |
| 88 | Bombur, Gentle Dreamer | 3 | NO | Vanilla 5/3 (storied untap is trivially met here but adds nothing) |
| 89 | Bothersome Noisemaker | 2 | NO | Amass off noncreature casts in a creature deck; off-tribe token |
| 90 | Burn, Burn, Tree and Fern | 4 | NO | Slow saga removal/ramp |
| 91 | Dáin Ironfoot | 3 | NO | Equipment tribal |
| 92 | Desert Were-Worm | 6 | NO | Scales with Mountains; the deck runs one |
| 93 | Desolation of Smaug | 4 | NO | 3 damage to each non-Dragon **includes your entire token board** (§1.3) |
| 94 | Dori, Bearer of Friends | 3 | NO | Treasure ETB on an off-tribe 3-drop |
| 95 | Dwarven Mauler | 1 | NO | Equip-cost reducer |
| 96 | Gandalf, Goblins' Bane // Flameshape | 3 | NO | Pings off noncreature casts in a creature deck |
| 97 | Gandalf, Spark Starter | 6 | NO | MV6 for a 3-damage ETB |
| 98 | Getaway Barrel | 4 | NO | Random cheat-in; put-onto-battlefield misses eminence anyway |
| 99 | Glóin the Mighty // Easy Pickings | 4 | NO | Repeatable {R}{R} each turn is real, but ramp is full at 8 and MV4 arrives late |
| 100 | Goblin-town Flunkies | 2 | NO | Amass filler |
| 101 | Gundabad Opportunist | 4 | NO | One impulse card on an MV4 body |
| 102 | Iron Hills Stalwart | 5 | NO | Equipment support at MV5 |
| 103 | Last Light of Durin's Day | 2 | NO | Needs six Mountain-drops and a Dragon; deck has one Mountain, zero Dragons |
| 104 | The Misty Mountains Cold | 3 | NO | Four-turn Treasure trickle for an off-tribe Dragon |
| 105 | Misty Mountains Raider | 5 | NO | Amass on attack, off-tribe, MV5 |
| 106 | Óin the Brave | 2 | NO | Storied looter; filtering on an off-tribe body |
| 107 | Pinecone Strike | 2 | NO | Small burn; in-deck removal is unconditional |
| 108 | Ragged Short Spear | 2 | NO | One-shot loot-2 Equipment; no discard payoffs |
| 109 | Smaug, the Great Calamity // Spew Flame | 7 | NO | MV7 beater / 5-mana burn adventure |
| 110 | Smaug the Magnificent | 4 | NO | Treasure-count *damage* engine — damage isn't this deck's axis; $28.96 |
| 111 | Smaug's Fury | 2 | NO | Combat trick |
| 112 | Snowslope Hunter | 3 | NO | Free once/turn sac→impulse, but outlet role is full and the body is off-tribe |
| 113 | Stone-Giant of High Pass | 7 | NO | MV7 |
| 114 | Thorin, Mountain-king | 4 | NO | Equipment payoff; deck runs one Equipment |
| 115 | Tidings of War | 1 | NO | Amass ritual, off-tribe |

### Mardu multicolor (#147–165)

| # | Name | MV | Verdict | Reason |
|---|---|---|---|---|
| 147 | Bifur, Melodic Rider | 6 | NO | MV6 Dwarf trigger-doubler; Roaming Throne already doubles the tribe that matters |
| 148 | Bolg of the North | 5 | NO | MV5 sac-Fling; the payoff is creature burn the deck doesn't need at 5 |
| 149 | Bolg's Company | 2 | NO | Needs Goblins to sacrifice |
| 152 | Dáin's Company | 2 | NO | Dwarf/Equipment selection |
| 154 | Dwalin, Weaponmaster | 2 | NO | Hone counters on an Equipment count of one |
| 156 | Fearsome Goblin Pair | 3 | NO | Dies→amass 4, off-tribe |
| 157 | Goblin Plate Mail | 2 | NO | Amass Equipment |
| 158 | The Great Goblin | 3 | NO | Both triggers key on Goblins/Orcs/Armies; deck has zero |
| 161 | Nori, Teller of Tales | 2 | NO | Single-target first strike; Stromkirk Captain grants it team-wide |
| 164 | Smaug, Wicked Worm | 5 | NO | Treasures scale with opponents' artifacts; MV5, conditional draw rider |
| 165 | Thorin Oakenshield | 2 | NO | Team ward {1} (storied trivially online here) — but ward doesn't answer wipes, the real killer; off-tribe |

### Artifacts (#170–180)

| # | Name | MV | Verdict | Reason |
|---|---|---|---|---|
| 170 | The Arkenstone // Seek the Heart | 5 | NO | Anthem+draw at MV5 against the standing cheap-cards pass; anthem role full at 7 |
| 171 | The Black Arrow | 3 | NO | Dragon hate |
| 172 | Dwarven Mattock | 2 | NO | Free-attach needs a Dwarf |
| 173 | Giant's Boulder | 1 | NO | Filtered rock; worse than the Signets already cut at 1–2/8 field |
| 175 | Key to the Side-Door | 1 | NO | Draw mode needs a same-name legend pair — near-impossible in singleton |
| 176 | My Precious // Allure of Power | 3 | NO | Instant sac-draw-2 is real, but Deadly Dispute adds a Treasure for the same cost; Village Rites still hasn't made the 100 |
| 177 | Orcrist, Goblin-cleaver | 3 | NO | Treasure-per-Vampire needs a combat connect plus {3}+{3}; ramp isn't the late-game need |
| 178 | Sting, Bilbo's Sword | 2 | NO | Flash pump trick |
| 179 | Thrór's Map | 2 | NO | Slow fixing/looting |
| 180 | Well-Worn Spatula | 1 | NO | One lifegain event on a bauble |

### Lands (#181–192)

| # | Name | MV | Verdict | Reason |
|---|---|---|---|---|
| 181 | Elven Passage | 0 | NO | Pay-life tapped-basic fetch; Elf clause dead; deck is on pain watch |
| 183 | Goblin-town | 0 | NO | Enters tapped; sac ability keys on Goblins/Orcs the deck lacks |
| 184 | Hobbit Hole | 0 | NO | Colourless fetch-tapped; Halflingcycling dead; a nonbasic must beat a basic |
| 185 | Iron Hills | 0 | NO | Tapped R/W; Dwarf ability dead |
| 187 | The Lonely Mountain | 0 | NO | Usually enters tapped here (one Equipment in 99); token ability off-tribe |
| 189 | Plains | 0 | NO | Art-only reprint of a basic already run |
| 191 | Swamp | 0 | NO | Art-only reprint |
| 192 | Mountain | 0 | NO | Art-only reprint |

**Count: 116 classified (31 + 27 + 29 + 11 + 10 + 8). 1 MAIN · 5 SIDE · 110 NO.**

---

## MAIN candidate

### [Belladonna Took](https://scryfall.com/search?q=%21%22Belladonna+Took%22) — {1}{W} · 2/2 Legendary Halfling Citizen · $2.02

*"Whenever a token you control enters, you gain 1 life if this is the first time this ability has
resolved this turn. If it's the second time, draw a card. If it's the third time, put a +1/+1
counter on each creature you control."*

**What it does in this deck:** tokens enter on effectively every turn of the game. Eminence makes
a Vampire token on each Vampire cast (two under
[Elspeth, Storm Slayer](https://scryfall.com/search?q=%21%22Elspeth%2C+Storm+Slayer%22)'s
doubling), [Smothering Tithe](https://scryfall.com/search?q=%21%22Smothering+Tithe%22) makes a
Treasure on every opponent's draw step (Treasures are tokens),
[Bloodline Keeper](https://scryfall.com/search?q=%21%22Bloodline+Keeper%22) activates at instant
speed, and [Charismatic Conqueror](https://scryfall.com/search?q=%21%22Charismatic+Conqueror%22),
[Elenda, the Dusk Rose](https://scryfall.com/search?q=%21%22Elenda%2C+the+Dusk+Rose%22) and
[Deadly Dispute](https://scryfall.com/search?q=%21%22Deadly+Dispute%22) add more. So per turn —
including opponents' turns — the first token is a **lifegain event**, which
[Marauding Blight-Priest](https://scryfall.com/search?q=%21%22Marauding+Blight-Priest%22),
[Vito, Thorn of the Dusk Rose](https://scryfall.com/search?q=%21%22Vito%2C+Thorn+of+the+Dusk+Rose%22)
and [Sanguine Bond](https://scryfall.com/search?q=%21%22Sanguine+Bond%22) each convert into
opponent life loss — up to four conversion events per turn cycle from Belladonna alone. The
second token each turn **draws a card** — repeatable draw in the deck's historically thinnest
stat, live most of your turns (two Vampire casts, or one cast plus any Treasure). The third gives
a team-wide counter tick.

**Deciding axis: enabler density against the current list.**
[Dusk Legion Duelist](https://scryfall.com/search?q=%21%22Dusk+Legion+Duelist%22)'s draw keys on
+1/+1 counters landing on itself, once a turn — and the enabler that justified it (Cathars'
Crusade) left the deck on 2026-08-06; SIDEBOARD.md carries a standing watch note calling Duelist
"meaningfully worse now and the leading next cut." Belladonna keys on the deck's single most
guaranteed output instead, and at the identical cost ({1}{W}, 2/2) the swap is MV- and
pip-neutral.

**Displaces:** Dusk Legion Duelist.

**Costs, stated plainly (the reason this is a recommendation, not an auto-swap):** Belladonna is
a Halfling, not a Vampire. Casting her makes no eminence token; she misses all four lords,
[Herald's Horn](https://scryfall.com/search?q=%21%22Herald%27s+Horn%22) and
[Urza's Incubator](https://scryfall.com/search?q=%21%22Urza%27s+Incubator%22); she takes -X/-X
from your own [Olivia's Wrath](https://scryfall.com/search?q=%21%22Olivia%27s+Wrath%22); and she
widens [Anowon, the Ruin Sage](https://scryfall.com/search?q=%21%22Anowon%2C+the+Ruin+Sage%22)'s
self-edict surface (feed the edict an Elspeth Soldier or a spare token — never her). Duelist is a
Vampire, so the swap costs one tribal body.

---

## SIDE candidates

### [An Unexpected Party](https://scryfall.com/search?q=%21%22An+Unexpected+Party%22) // At the Door — {2}{W}{W} enchantment (// {X}{2}{W}) · $0.59

Choose Vampire: **your** creatures of the chosen type get +2/+2 — double a lord's output,
one-sided, on a non-creature permanent that survives every wipe in the deck. The adventure
(create X 2/2 red Dwarfs) is an emergency rebuild only — the Dwarfs are off-tribe.

**Deciding axis: symmetry.** [Coat of Arms](https://scryfall.com/search?q=%21%22Coat+of+Arms%22)'s
§B row is restricted to "only if lone tribal deck" precisely because it pumps every tribal board
at the table; Party is always safe. Coat's ceiling is far higher on a wide board (quadratic vs
flat +2/+2) — the pilot trades ceiling for safety.

**Displaces in SIDEBOARD.md:** Coat of Arms (§B, same overrun-anthem seat).

### [Supper for Spiders](https://scryfall.com/search?q=%21%22Supper+for+Spiders%22) — {1}{B} instant · $1.26

Puts onto the battlefield under your control **all** creature cards in opponents' graveyards that
were put there from the battlefield this turn — as Food artifacts ({2}, {T}, sac: gain 3).

**What it does here:** the deck already kills opponents' creatures on schedule —
[Anowon, the Ruin Sage](https://scryfall.com/search?q=%21%22Anowon%2C+the+Ruin+Sage%22)'s upkeep
edict, [Dictate of Erebos](https://scryfall.com/search?q=%21%22Dictate+of+Erebos%22) chains,
[Olivia's Wrath](https://scryfall.com/search?q=%21%22Olivia%27s+Wrath%22) and
[The Meathook Massacre](https://scryfall.com/search?q=%21%22The+Meathook+Massacre%22). Cast this
after any of them and take the whole haul. Each Food crack is a **separate lifegain event** for
[Vito](https://scryfall.com/search?q=%21%22Vito%2C+Thorn+of+the+Dusk+Rose%22) /
[Sanguine Bond](https://scryfall.com/search?q=%21%22Sanguine+Bond%22) /
[Marauding Blight-Priest](https://scryfall.com/search?q=%21%22Marauding+Blight-Priest%22) to
convert. The Foods are artifacts, not creatures — they dodge Anowon, Olivia's Wrath and opposing
wipes — and it's incidental anti-recursion (steals the bodies they'd reanimate).

**Deciding axis: symmetry + mana versus the row it replaces.**
[Killing Wave](https://scryfall.com/search?q=%21%22Killing+Wave%22) is a symmetric X-sink that
taxes your own token board and competes with the cast engine (ledger: mana-sink pattern); Supper
is {1}{B} and one-sided.

**Displaces in SIDEBOARD.md:** Killing Wave (§B, the grindy-pods seat).

### [The Sackville-Bagginses](https://scryfall.com/search?q=%21%22The+Sackville-Bagginses%22) — {1}{B} · 2/2 Legendary Halfling Citizen · $1.22

ETB: *may* sacrifice another creature or artifact → draw a card + Treasure (an optional, stapled
[Deadly Dispute](https://scryfall.com/search?q=%21%22Deadly+Dispute%22)). Ongoing: "Whenever you
sacrifice a **token**, target opponent loses 1 life" — every eminence token fed to
[Viscera Seer](https://scryfall.com/search?q=%21%22Viscera+Seer%22) /
[Ashnod's Altar](https://scryfall.com/search?q=%21%22Ashnod%27s+Altar%22) and every Treasure
cracked (including [Smothering Tithe](https://scryfall.com/search?q=%21%22Smothering+Tithe%22)'s)
drains 1.

**Deciding axis: rate against the in-deck benchmark.**
[Mirkwood Bats](https://scryfall.com/search?q=%21%22Mirkwood+Bats%22) triggers on create **or**
sacrifice and hits **each** opponent — strictly wider. Sackville is the budget half at MV2 with a
draw ETB: redundancy in payoffs is good (SKILL §2.5), but not good enough to claim a main slot
from a Vampire. Bench it for the standing cheap-cards pass. Same off-tribe costs as Belladonna
(no eminence, Anowon/Olivia's Wrath exposure).

**Displaces in SIDEBOARD.md:** the High-Society Hunter row (marked "superseded" since
2026-08-01 — a dead row).

### [Stir Up Trouble](https://scryfall.com/search?q=%21%22Stir+Up+Trouble%22) — {B} sorcery · $0.25

Additional cost: sacrifice an artifact or creature (or pay {4}); destroy target creature.

**What it does here:** the additional cost is pure upside — sacrificing an eminence token
triggers [Blood Artist](https://scryfall.com/search?q=%21%22Blood+Artist%22),
[Cruel Celebrant](https://scryfall.com/search?q=%21%22Cruel+Celebrant%22),
[Vengeful Bloodwitch](https://scryfall.com/search?q=%21%22Vengeful+Bloodwitch%22) and
[Mirkwood Bats](https://scryfall.com/search?q=%21%22Mirkwood+Bats%22) on the way to a 1-mana
unconditional Murder.

**Deciding axis: speed.** It's a sorcery, and the corrections log is explicit that
sorcery-speed answers can only pre-empt, never respond — which is why it doesn't challenge the
all-instant removal suite or
[Ruthless Lawbringer](https://scryfall.com/search?q=%21%22Ruthless+Lawbringer%22) (same sac idea,
any nonland target, on a Vampire body) in the 100. As a budget swap-in for creature-heavy pods
it's the cheapest removal the deck could run.

**Displaces in SIDEBOARD.md:** The Lord of Pain row (chaos-night placeholder with no recorded
text or rationale — the weakest surviving §B row).

### [Bilbo's Gambit](https://scryfall.com/search?q=%21%22Bilbo%27s+Gambit%22) — {1}{W} instant · $2.71

Return target spell to its owner's hand; if you gifted a Treasure, players can't cast spells this
turn.

**What it does here:** Mardu has no counterspells; this is the closest legal thing. Bounce the
board wipe, the extra-turn spell, the removal aimed at Edgar — and the gifted mode ends a
storm/combo turn outright (nobody casts again this turn, including the comboing player).

**Deciding axis: effect availability in the colour identity.** §B currently has zero stack
interaction — Boros Charm answers resolved wipes, nothing answers a spell-based win. One-shot,
tempo-only if un-gifted, and the gift hands that opponent a Treasure; that's the price of the
seat.

**Displaces in SIDEBOARD.md:** fills an empty seat; if a live row must go,
Preacher of the Schism (2/6 field, both triggers life-total-conditional) is the weakest.

---

## Near-misses (good card, wrong deck)

- **The Arkenstone // Seek the Heart** ($8.53) — anthem + end-step draw with a legend-tutor
  adventure; MV5 add straight against the standing cheap-cards pass, and the anthem role is full.
- **Gollum the Abandoned** — recursive ETB drain-2 with a built-in sac cost; ~4 mana per loop is
  the mana-sink pattern (eminence tokens not cast).
- **Snowslope Hunter** — a free once-per-turn sac→impulse outlet; outlet role is capped and the
  body is off-tribe.
- **My Precious // Allure of Power** — instant Village Rites+ with a leftover Equipment; strictly
  behind Deadly Dispute's rate in this deck.
- **The Eagles Are Coming!** — kicked, it converts a dying board into 4/4 fliers, but they come
  back as Birds, not Vampires; Boros Charm owns the anti-wipe seat.
- **Thorin Oakenshield** — MV2 team ward {1} this deck keeps online effortlessly; ward answers
  spot removal, not the wipes that actually kill go-wide.
- **Dreaded Bat-Cloud** — effectively {B} for a 4/2 flying deathtouch most turns here; pure
  stats, no engine.
- **Celebrate the Mountain-king** — Grasp of Fate variant (exile one nonland per opponent);
  real card, but a fragile MV4 3-for-1 against the cheap-cards pass.
- **The Queen of Dale** ($22.52) — up to three recruits per turn cycle off opponents' noncreature
  spells; recruit is filtering, not drawing.
- **Smaug the Magnificent** ($28.96) — Treasure-count damage engine; damage is not this deck's
  axis (life loss and lifegain are).
- **The Master of Lake-town** — turns every drain into mill; wins no games here.
- **Glóin the Mighty** — {R}{R} every turn on a 4/3 dodges the one-shot-ritual pattern, but the
  ramp role is full and MV4 arrives after the deck needed it.
