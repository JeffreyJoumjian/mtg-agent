# HOB set review — Scarlet Witch — 2026-08-09

**Set:** The Hobbit (HOB), releases 2026-08-14.
**Pool:** 44 of 193 set cards are commander-legal with a color identity that fits mono-red {R}
(`data/hob-candidates-scarlet-witch.json`, verified Scryfall oracle text).
**Method:** deck-brain SKILL.md — every card evaluated from the pool's verified oracle text (§1.1),
costed in *this deck's* mana under the generic-only reduction rule (§1.2, LEDGER 2026-08-07),
checked against the deck's own board (§1.3), compared only within its role (§2.1), with the
deciding axis named (§2.3). Reducer stack assumed where stated: Ruby Medallion + The Fire Crystal
(red spells), Longshot + Artist's Talent L2 (noncreature spells), Wanda (instants/sorceries MV 4+,
by her power). This is a candidate-surfacing pass — no deck files were edited.

**Result: 1 MAIN, 2 SIDE, 41 NO.**

---

## Classification table (all 44)

| # | Name | MV | Verdict | Reason |
|---|---|---|---|---|
| 1 | Long-Bodied Grey Dog | 3 | NO | Colorless value common; a 2/2 with one tapped Treasure is neither engine nor haymaker. |
| 2 | Old Thrush | 2 | NO | Puts the fetched basic on **top** of the library (eats your draw); 1/2 lifegain chaff. |
| 3 | Troop of Ponies | 2 | NO | Four total mana of sac-ramp for one tapped basic; the deck ramps with rituals and rocks. |
| 4 | Balin, Loremaster | 5 | NO | Card-neutral hand-cycle (draw = discarded) that triggers ~once (Storm-Kiln Artist is the only other Dwarf); the deck's refills draw 7 fresh. |
| 5 | Bombur, Gentle Dreamer | 3 | NO | A 5/3 beater that struggles to untap, in a deck that never attacks. |
| 6 | Bothersome Noisemaker | 2 | NO | Per-spell Amass builds one combat body — a dead axis here, and while small the Army dies to our own Fiery Confluence (Young Pyromancer hard-cut grounds). |
| 7 | Burn, Burn, Tree and Fern | 4 | NO | ~{R}–{1}{R} for a 3-for-1, but sorcery-speed drip over three turns; the 8-card removal role's incumbents all win on timing (instants) or permanence (Kazuul). |
| 8 | Dáin Ironfoot | 3 | NO | Attack trigger in a deck that doesn't attack (Backdraft Hellkite precedent). Iron Man deck material. |
| 9 | Desert Were-Worm | 6 | NO | ~42 power off 21 Mountains but no trample or evasion, and the extra combat is attack-gated — dead axis. |
| 10 | Desolation of Smaug | 4 | NO | The four mana is Dragon-only (one Dragon in the 99: Livaan) and the sweep half duplicates Fiery Confluence's creature mode while hitting our own board. |
| 11 | Dori, Bearer of Friends | 3 | NO | A 3/2 with one Treasure — small value the deck doesn't want. |
| 12 | Dwarven Mauler | 1 | NO | Equip-discount on its own body; the deck equips Wanda, not a 2/1 Dwarf. |
| 13 | Gandalf, Goblins' Bane // Flameshape | 3 | NO | 1/opponent per noncreature spell on a creature — half Fiery Inscription's rate with both creature penalties (LEDGER, Guttersnipe entry 2026-08-09); Flameshape's exiles need a Wizard, and the deck's only Wizard is Gandalf himself, later. |
| 14 | Gandalf, Spark Starter | 6 | NO | Six mana (four after the medallions) for a one-shot 3 damage. |
| 15 | Getaway Barrel | 4 | NO | Needs a death the deck can't cause (zero sac outlets) for a random creature off 13 cards in a 16-creature deck. |
| 16 | Glóin the Mighty // Easy Pickings | 4 | **MAIN** | {1}{R} after the medallions for an automatic {R}{R} every first main phase — a red engine with a one-sided sweep stapled on. See writeup. |
| 17 | Goblin-town Flunkies | 2 | NO | 1/1 haste with Amass 1; draft filler. |
| 18 | Gundabad Opportunist | 4 | NO | One impulse card on a 4/2; Wiccan does this on every noncreature spell. |
| 19 | Iron Hills Stalwart | 5 | NO | Five mana to save one equip activation of {1}–{3}; the deck's Equipment already attach cheaply. |
| 20 | Last Light of Durin's Day | 2 | NO | Six Mountain-drops (~6 turns at one land a turn) to fetch a Dragon — the deck plays one, and it's a {2}{R} 1/3 (Livaan). |
| 21 | The Misty Mountains Cold | 3 | **SIDE** | {R} after reducers for four Treasures of banked mana and sometimes a 6/6 flying blocker — slow-pod tech. See writeup. |
| 22 | Misty Mountains Raider | 5 | NO | Attack trigger; dead axis. |
| 23 | Óin the Brave | 2 | NO | {1} + tap to loot on a 1/3; the deck's 12 draw sources dwarf it. |
| 24 | Pinecone Strike | 2 | NO | The Abrade shape already cut (MV 2 — Wanda never discounts it, 3 damage kills little), and its artifact mode only hits **tokens** where Abrade hit any artifact. |
| 25 | Ragged Short Spear | 2 | NO | +2/+0 at equip {3} loses to every Equipment in the deck; the ETB loot is one-shot. |
| 26 | Smaug, the Great Calamity // Spew Flame | 7 | NO | Vanilla 5/5 flier; Spew Flame floors at {R} with the full stack (MV 5, Wanda applies) but is sorcery-speed spot removal in a full role. |
| 27 | Smaug the Magnificent | 4 | NO | Damage-equal-to-Treasures is an **attack** trigger; $29 for an upkeep Treasure here. |
| 28 | Smaug's Fury | 2 | NO | Worse than the already-cut Monstrous Rage — same class of smallest pump, no permanent Role residue. |
| 29 | Snowslope Hunter | 3 | NO | Sacrifices the deck's own rocks and engines for single impulse cards. |
| 30 | Stone-Giant of High Pass | 7 | NO | Five-to-seven-mana defensive body whose damage sink eats your own artifacts; off-plan. |
| 31 | Thorin, Mountain-king | 4 | NO | One-shot equip-saver in a 4-Equipment deck whose equips cost {1}–{3} or auto-attach. Iron Man deck material. |
| 32 | Tidings of War | 1 | NO | Amass in a no-attack deck. |
| 33 | The Black Arrow | 3 | NO | Colorless 1-damage ping plus Dragon hate — a meta card for a Dragon table at best. |
| 34 | Dwarven Mattock | 2 | NO | The free-attach only hits a Dwarf (Storm-Kiln Artist is the deck's sole one), and Champion's Helm outclasses it on Wanda (+2/+2 hexproof, equip {1} vs ward {1}, equip {3}). |
| 35 | Giant's Boulder | 1 | NO | {1}-in, one-colored-out is a net-zero filter in mono-red; the {7} destroy sink is priced far above Chaos Warp / Zuko's Exile. |
| 36 | Key to the Side-Door | 1 | NO | The draw mode needs a second copy of a legend you control — blank in singleton; the unblockable mode duplicates Rogue's Passage. |
| 37 | Orcrist, Goblin-cleaver | 3 | NO | Combat-damage trigger; dead axis, and $17. |
| 38 | Sting, Bilbo's Sword | 2 | **SIDE** | Often {0} after Longshot + Artist's Talent; flash, free-attach, permanent +N power on Wanda scaled to an opponent's board. See writeup. |
| 39 | Thrór's Map | 2 | NO | {2}-per-loot colorless trinket; every draw source in the deck beats it. |
| 40 | Well-Worn Spatula | 1 | NO | Draft chaff — +1/+1 and 2 life. |
| 41 | Elven Passage | 0 | NO | Pays life to fetch a **tapped** basic and its untap clause needs an Elf; strictly worse than a Mountain here (coloured-beats-colourless, LEDGER 2026-08-04). |
| 42 | Hobbit Hole | 0 | NO | Produces no mana at all — it only sacs for a tapped basic — and Halflingcycling is blank. Worse than a Mountain. |
| 43 | The Lonely Mountain | 0 | NO | Enters tapped until you control an Equipment (rarely before turn 4), misses the Gauntlet of Power double (basics only), and its sink makes 2/2 sweeper-fodder. It *is* a Mountain for Valakut — the one point in its favour, not enough. |
| 44 | Mountain | 0 | NO | The deck already runs 21; the HOB printing is an art choice, not a deck decision. |

---

## MAIN

### Glóin the Mighty // Easy Pickings — MV 4 // 3 — $0.34

[Glóin the Mighty](https://scryfall.com/search?q=%21%22Gl%C3%B3in+the+Mighty%22) is a 4/3 legendary
Dwarf reading *"At the beginning of your first main phase, add {R}{R}."* No tap, no activation —
two red mana, automatically, every turn. In this deck that mana **banks**: with
[Electro, Assaulting Battery](https://scryfall.com/search?q=%21%22Electro%2C+Assaulting+Battery%22)
or [Ashling, Flame Dancer](https://scryfall.com/search?q=%21%22Ashling%2C+Flame+Dancer%22) out,
unspent {R}{R} persists across turns, so Glóin is a battery that charges itself. The Adventure
half, Easy Pickings ({2}{R} sorcery), deals 1 damage to each creature your **opponents** control —
a one-sided dork-and-token sweep that never touches
[Kazuul, Tyrant of the Cliffs](https://scryfall.com/search?q=%21%22Kazuul%2C+Tyrant+of+the+Cliffs%22)'s
Ogres or [Iron Man, Tony Stark](https://scryfall.com/search?q=%21%22Iron+Man%2C+Tony+Stark%22)'s
Robots — after which Glóin waits in exile to be cast later. A genuine two-for-one.

**In-deck cost (generic-only rule).** The creature is {3}{R}: only
[Ruby Medallion](https://scryfall.com/search?q=%21%22Ruby+Medallion%22) and
[The Fire Crystal](https://scryfall.com/search?q=%21%22The+Fire+Crystal%22) apply (red spells) —
[Longshot, Rebel Bowman](https://scryfall.com/search?q=%21%22Longshot%2C+Rebel+Bowman%22) and
[Artist's Talent](https://scryfall.com/search?q=%21%22Artist's+Talent%22) are noncreature-only and
[The Scarlet Witch](https://scryfall.com/search?q=%21%22The+Scarlet+Witch%22) is I/S-only. Generic
{3} → **{1}{R} = 2 mana** with both medallions, 3 with one. Easy Pickings is {2}{R}, MV 3 (no
Wanda): four reducers reachable but only {2} of generic → **floor {R} = 1 mana**.

**Deciding axis: throughput.** Over any horizon of two or more turns Glóin nets more mana than a
twin ritual's one-shot +1, and if cast a turn early he adds {R}{R} on the kill turn too. The trade
is a ritual's guaranteed burst in hand (removal-proof) against a creature engine — a risk profile
this deck already accepted seven times over in its per-spell engines. Own-board check (§1.3): a
4/3 dies to our own [Chandra's Ignition](https://scryfall.com/search?q=%21%22Chandra's+Ignition%22)
at W≥3 and to [Fiery Confluence](https://scryfall.com/search?q=%21%22Fiery+Confluence%22)'s
creature mode taken three times — the same accepted cost as Birgi, Wiccan and Livaan.

**Displaces: [Desperate Ritual](https://scryfall.com/search?q=%21%22Desperate+Ritual%22).** The
deck runs twin net-+1 rituals and Desperate's splice-onto-Arcane is blank — it is the only Arcane
card in the 100. [Pyretic Ritual](https://scryfall.com/search?q=%21%22Pyretic+Ritual%22) keeps the
effect. Competes with but does not displace
[Tablet of Discovery](https://scryfall.com/search?q=%21%22Tablet+of+Discovery%22) — the Tablet's
artifact body survives creature sweepers, but it is tap-limited and its {R}{R} mode is restricted
to instants and sorceries, where Glóin's mana is unrestricted and hands-free. Riders: legendary
(unlocks [Mines of Moria](https://scryfall.com/search?q=%21%22Mines+of+Moria%22) untapped), and
the deck's second Dwarf alongside
[Storm-Kiln Artist](https://scryfall.com/search?q=%21%22Storm-Kiln+Artist%22) — irrelevant today,
noted for future Dwarf-matters cards.

---

## SIDE

### Sting, Bilbo's Sword — MV 2 — $0.55

[Sting, Bilbo's Sword](https://scryfall.com/search?q=%21%22Sting%2C+Bilbo's+Sword%22) is a {2}
colorless legendary Equipment with **flash**: on entry it gets a hone counter per creature target
opponent controls and free-attaches to a creature you control — +1/+0 per counter, permanently
(counters live on the Equipment; if Wanda dies, they survive and re-equip for {3}). Against a
five-creature board that's a flashed-in, free-attached, permanent **+5 power on Wanda** — five
more generic off every MV 4+ spell and +5 on
[Chandra's Ignition](https://scryfall.com/search?q=%21%22Chandra's+Ignition%22).

**In-deck cost.** Colorless, so
[Ruby Medallion](https://scryfall.com/search?q=%21%22Ruby+Medallion%22) and
[The Fire Crystal](https://scryfall.com/search?q=%21%22The+Fire+Crystal%22) ("red spells") do
**not** apply. [Longshot, Rebel Bowman](https://scryfall.com/search?q=%21%22Longshot%2C+Rebel+Bowman%22)
and [Artist's Talent](https://scryfall.com/search?q=%21%22Artist's+Talent%22) L2 (noncreature) do:
{2} is all generic, so **{0} with both out** (CR 601.2f — reduced to nothing is {0}), {1} with one.

**Deciding axis: permanence × table-dependence.** Permanent pump compounds — every point is a mana
off every future X-spell for the rest of the game — but Sting's size is set once, by an opponent's
board at ETB. Huge into creature decks, +1 into control. That variance is exactly what makes it a
sideboard card rather than a main-deck one; the main-deck pump slots stay with the repeatable
([Livaan, Cultist of Tiamat](https://scryfall.com/search?q=%21%22Livaan%2C+Cultist+of+Tiamat%22))
and the free ([Blazing Shoal](https://scryfall.com/search?q=%21%22Blazing+Shoal%22)).

**Sideboard "Displaces" pointer:
[Cait Sith, Fortune Teller](https://scryfall.com/search?q=%21%22Cait+Sith%2C+Fortune+Teller%22)**,
for creature-heavy pods — on those boards a free permanent +4/+5 beats a per-combat impulse plus
temporary pump. Honest cost: Cait Sith's card advantage leaves with it.

### The Misty Mountains Cold — MV 3 — $0.39

[The Misty Mountains Cold](https://scryfall.com/search?q=%21%22The+Misty+Mountains+Cold%22) is a
{2}{R} Saga: chapters I–IV each create a Treasure, and at any chapter where you control four or
more Treasures it sacrifices itself for a **6/6 red Dragon token with flying**. Treasures are this
deck's banking philosophy in artifact form — they sit on the battlefield until the kill turn, then
crack for red (and once in the pool, unspent red banks under
[Electro, Assaulting Battery](https://scryfall.com/search?q=%21%22Electro%2C+Assaulting+Battery%22)
or [Ashling, Flame Dancer](https://scryfall.com/search?q=%21%22Ashling%2C+Flame+Dancer%22)). With
[Storm-Kiln Artist](https://scryfall.com/search?q=%21%22Storm-Kiln+Artist%22) or
[Brass's Bounty](https://scryfall.com/search?q=%21%22Brass's+Bounty%22) around, the four-Treasure
check flips early and the Dragon arrives ahead of schedule.

**In-deck cost.** Red enchantment, noncreature — all four reducers apply but only {2} of generic →
**floor {R} = 1 mana** ({1}{R} with Ruby alone). Wanda doesn't apply (enchantment).

**Deciding axis: rate vs speed.** One mana in → four banked mana plus sometimes a 6/6 flying
blocker is the best mana-per-card rate in this pool, but it is delivered over four turns — the
opposite shape from the deck's kill-turn rituals. It earns its slot in slow, grindy pods that
reliably reach turn 8+, where the drip finishes charging and a 6/6 flier blocks something real.
Own-board check: the Dragon dies to a boarded-in
[Blasphemous Act](https://scryfall.com/search?q=%21%22Blasphemous+Act%22) and to
[Chandra's Ignition](https://scryfall.com/search?q=%21%22Chandra's+Ignition%22) at W≥6;
[Fiery Confluence](https://scryfall.com/search?q=%21%22Fiery+Confluence%22) at 3 does not kill it.

**Sideboard "Displaces" pointer: whichever twin ritual remains in the 100** —
[Pyretic Ritual](https://scryfall.com/search?q=%21%22Pyretic+Ritual%22) if the Glóin swap takes
[Desperate Ritual](https://scryfall.com/search?q=%21%22Desperate+Ritual%22); Desperate otherwise.
Slow pods don't need double instant burst.

---

## Set mechanics as they touch this deck

- **Storied / enduring story** (Balin, Bombur, Óin): "three or more artifacts, legendaries and/or
  Sagas" is trivially on here — six-plus rocks and ten-plus legendaries — but all three Storied
  cards are off-plan bodies, so the mechanic being free buys nothing.
- **Amass Goblins** (4 cards): builds one growing Army token — a combat axis this deck doesn't
  play, and while small the Army dies to our own Fiery Confluence / Chandra's Ignition, the exact
  grounds Young Pyromancer was hard-cut on (§1.3).
- **Treasure**: all over the pool, and it genuinely fits the red-banks philosophy (Treasures store
  mana across turns; crack them for red). But only The Misty Mountains Cold delivers Treasures at
  a rate worth a card.
- **Adventure** (both Gandalfs' set-mate, Glóin, Smaug): the Adventure half on the stack is a
  **real instant/sorcery cast** — it triggers Livaan, Wiccan, Longshot, Thor and Fiery
  Inscription, and Wanda discounts it at MV 4+ (Spew Flame, MV 5, floors at {R} with the full
  stack). The creature half cast later misses every noncreature reducer. Cost the two halves
  separately.
- **Landfall / Ferocious** (the set-wide mechanics this pool was screened against): **zero** of
  the 44 mono-red-legal cards carry Ferocious, and the only landfall-style trigger is Last Light
  of Durin's Day ("whenever a Mountain you control enters") — one trigger a turn at 33 lands,
  fetching a card type the deck plays one of.
- **Mountaincycling {2}**: a fine floor on otherwise-dead cards, but paying {2} for a land to hand
  competes with the deck's real draw.
- **Behold** (Elven Passage): needs an Elf; blank in this 99.

## Cross-deck note

Thorin, Mountain-king · Dáin Ironfoot · Iron Hills Stalwart · Dwarven Mattock · Orcrist,
Goblin-cleaver · The Black Arrow · Sting, Bilbo's Sword are Equipment-matters cards — the Iron Man
voltron deck is their natural home (`data/hob-candidates-iron-man.json` exists for that pass).
Sting is the only one that also earns a seat here.
