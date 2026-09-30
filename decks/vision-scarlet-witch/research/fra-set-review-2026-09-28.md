# FRA + FRC set review — The Vision and Scarlet Witch — 2026-09-28

**Sets:** Reality Fracture (FRA) and Reality Fracture Commander (FRC), both release 2026-10-02.
**Lists evaluated:** both `"kind": "deck"` lists in `deck.json` — `main` (Bracket 3, spellslinger
voltron) and `spellslinger` (Bracket 3, spells-first, voltron second; built 2026-09-07 after the report
*"struggles with draw sometimes and/or having enough finishers to get through without commander damage"*).

**Method:** deck-brain SKILL.md, identical to the Scarlet Witch pass (same 72-card mono-red pool, read
once): verified oracle text for every card and both prepare halves (§1.1); costed under this deck's
reducers — Ruby Medallion and The Fire Crystal (*red spells*), Longshot and Artist's Talent L2
(*noncreature*), all generic-only — and **her refund**, which makes any spell that costs exactly `{R}`
net-free (§1.2); checked against the deck's own board and triggers (§1.3); full role table before any
cut (§2.1); deciding axis named (§2.3); prior verdicts re-derived from their grounds (§1.1b). LEDGER
grepped per candidate/mechanic/slug; rules checked in `rules/sections/`. Batch effect-grep run before
writing verdicts (LEDGER 2026-08-10): the lists' existing additive booster is **Artist's Talent L3**
(+2), existing multipliers **Fiery Emancipation** (×3) and **Twinflame Tyrant** (×2).

**Standing constraints honoured:** Hexing Squelcher, Conqueror's Flail and The Ozolith stay; she keeps
hexproof (Champion's Helm), protection (Commander's Plate), indestructible (Mithril Coat) and lifelink
(Shadowspear); no Nico Minoru; Seething Song and Mana Geyser are not cut candidates. Cantrips stay
capped at six (2026-09-04). Nothing here creates a loop.

**Field lens:** unavailable — EDHREC has no FRA/FRC data before release (§2.2). Price is not an axis
(§0.1). **No deck file was edited** — every swap below waits for the pilot, one at a time.

**Pool:** 72 cards (FRA 54 + FRC 18), **53 new, 19 reprints**, no Game Changers.

**Result:**

| List | MAIN | SIDE | NO | already in list |
|---|---|---|---|---|
| main | 2 | 3 | 65 | 2 |
| spellslinger | 1 | 4 | 65 | 2 |

---

## The pilot's named ask — Stingcaster Mage ("or wandavision")

**Oracle text** ({1}{R}, 2/1 Human Wizard, haste): *"When this creature enters, target instant or
sorcery card in your graveyard gains flashback until end of turn. The flashback cost is equal to its mana
cost."*

**Verdict: NO in both lists.** The grounds are a card this deck has already played and cut:

- Its effect is **Flashback** (`{R}` instant, *"Target instant or sorcery card in your graveyard gains
  flashback until end of turn. The flashback cost is equal to its mana cost."* — verified), which sat in
  `main` until 2026-09-04 and was cut on **the pilot's own argument**: Past in Flames gives *every*
  instant and sorcery flashback, "Flashback only targets one spell and then that's it" (LEDGER
  correction 2026-09-04).
- Stingcaster is the **weaker** version of that effect *in this deck*. Flashback's own cast was an
  instant — it fired all eight converters, a counter and the refund, and could be cast on an opponent's
  turn to trigger Arcane Bombardment or Wanda's Vision. Stingcaster's cast is a **creature**: it fires
  only her "whenever you cast a spell" trigger (the noncreature pingers and the instant/sorcery pingers
  ignore it), and it is sorcery-speed.
- What it genuinely adds is a second shot at a finisher (flash back Soul's Fire, Chandra's Ignition,
  Crackle at full X — flashback includes X, CR 702.34a) and a 2/1 haste body. Past in Flames (both
  lists), Increasing Vengeance's flashback (two copies) and Loki (a copy every turn) already cover that.

**If the pilot wants a single-card recast back anyway, bring back the instant Flashback, not
Stingcaster.** (Stingcaster's best home in this repo is Scarlet Witch V3's bench — see that review.)

---

## Set mechanics as they matter to this deck

- **Any `{R}` spell is free here**, and the refund lands before the spell resolves (CR 605.5a, 603.3 —
  founding entry). That is what makes **Command the Stage** (`{R}` after two reducers, and it comes
  back every turn) and **Molten Tide** (a `{R}` instant) unusually good in this shell.
- **Noncombat-damage-matters** (Tomik, Master of Barbs, Command the Stage) — this deck deals
  noncombat damage to every opponent on nearly every spell, so it meets these conditions more reliably
  than any other list in the repo.
- **Prepare** (Pompous Battlemage, Pyre Rhymer). A prepared copy is a *cast* (CR 722.3c, LEDGER
  2026-08-06) — a second trigger for her and, for an instant/sorcery copy, for all eight converters. The
  copy leaves exile if the creature leaves the battlefield (CR 722.3c).
- **Empower Jace** — a planeswalker **token** ("−1: Surveil 1", "−3: Draw a card", loyalty = empowered
  counters; scratchpad `tokens.md`). Slow and attackable in a deck without blockers.
- **Cadet tokens** — 2/2 colourless Wizard Soldiers. They survive one Fiery Confluence creature mode
  (the gameplan already says to take the opponent/artifact modes), die to Chandra's Ignition.
- **Additive vs multiplier ordering** matters for every booster here: the damaged opponent orders
  replacement effects (CR 616.1), so under Emancipation they apply ×3 *before* any +1 (LEDGER
  "Replacement-effect ordering").

---

## Classification table — all 72 cards

Verdict key: **MAIN** = would displace a named card in that list's 100 · **SIDE** = bench, with the
card it would displace · **NO** = pass · *in list* = already in that list (reprint).

| # | Name | MV | New? | main | spellslinger | Reason |
|---|---|---|---|---|---|---|
| 1 | Ajani's Anguish | 1 | NEW | NO | NO | X to one target at sorcery speed; fires only the four noncreature pingers. Bolt and Confluence hold removal; trample is already on five cantrips. |
| 2 | Artifist Acumen | 1 | NEW | NO | NO | **Word-for-word Warlord's Fury** (`{R}` sorcery, team first strike, draw) — cut 2026-09-04 as the narrowest cantrip rider, and the pilot capped cantrips at six. |
| 3 | Marwyn, the Clearcutter | 1 | NEW | NO | NO | Three mana and a permanent per card, once a turn. |
| 4 | Pompous Battlemage // Improvised Act | 1 | NEW | NO | NO | Two spells from one card, but the second is a rummage (card-neutral) and the first a 1/1 — it spends a card for one extra trigger, and cards in hand is the binding constraint (gameplan #1). |
| 5 | Blazing Crescendo | 2 | REPRINT | NO | NO | `{1}{R}` instant, +3/+1 and one impulse card — the same rate as Fists of Flame, which holds the two-mana cantrip slot; cantrips capped at six. |
| 6 | Eardrum Rattler | 2 | NEW | NO | NO | She flies. |
| 7 | Essence Burn | 2 | NEW | NO | NO | Black or green targets only. |
| 8 | Gallia, the Merrymaker | 2 | NEW | NO | NO | Would give her haste after The Ozolith moves counters back — cute, but The Fire Crystal, Swiftfoot Boots (main) and Impolite Entrance already cover haste. |
| 9 | Master of Barbs | 2 | NEW | **SIDE** | **SIDE** | Each pinger event is +1/+0 on her → feeds Chandra's Ignition, Soul's Fire and combat. Runner-up to Command the Stage for Braid's slot (main) and to Tomik for Firebrand Archer's (spellslinger) — both of those convert more directly. |
| 10 | No Admittance | 2 | NEW | NO | NO | Sorcery 3 damage; Lightning Bolt is the instant, one-mana version. |
| 11 | Samut, Hazoret's Champion | 2 | NEW | NO | NO | The Fire Crystal already grants team haste and is also a reducer. |
| 12 | Skilled Battlecarver | 2 | NEW | NO | NO | A 2/1 attacker. |
| 13 | Stingcaster Mage | 2 | REPRINT | NO | NO | The effect is **Flashback** (the instant), cut 2026-09-04 on the pilot's own argument that Past in Flames beats *one recast of one card* — and Stingcaster is the weaker version here: its creature cast fires only her trigger where Flashback fired all eight converters, and it can't be cast on an opponent's turn for Bombardment / Wanda's Vision. Full answer below. |
| 14 | Tomik, Izzet Sparkmage | 2 | NEW | **MAIN** | **MAIN** | *"If a source you control would deal noncombat damage to an opponent or a permanent an opponent controls, it deals that much damage plus 1 instead."* Doubles the 1-damage pingers; +1 on every Grapeshot copy, Bolt, Confluence mode, Fireball, Ignition. Opponent-restricted — no Ancient Tomb self-hit. **Displaces Firebrand Archer.** |
| 15 | Way of the Pyromancer | 2 | NEW | NO | NO | Jace token at 2: +1 for `{R}`, or one −3 draw two turns later. Slow and attackable. |
| 16 | Chandra's Emberling | 3 | NEW | NO | NO | Grows itself, not her. |
| 17 | Command the Stage | 3 | NEW | **MAIN** | **SIDE** | Returns every upkeep after a turn you pinged → a net-free sorcery every turn: `{R}` back, a counter, all eight converters, and a growing Wizard wall (the defenders row). **Main: displaces Braid of Fire.** Spellslinger: bench over Thrill of Possibility — it fuels casts but doesn't dig, and that list's report was draw. |
| 18 | Cursed Mirror | 3 | REPRINT | NO | NO | A `{2}{R}` rock in a five-rock role. |
| 19 | Fulminous Forte | 3 | NEW | NO | **SIDE** | Instant: 5 to a creature/planeswalker, or 1 to each of theirs (3 under Emancipation, 2 with Tomik). Spellslinger has a one-sided-sweep row → **bench vs Mizzium Mortars** (instant speed and planeswalker reach vs Mortars' bigger overload). Main's removal is light by design. |
| 20 | Identity Echo | 3 | NEW | NO | NO | Polymorphs your own creature. |
| 21 | Koth, the Geomancer | 3 | NEW | NO | NO | Per-land-drop ping; the engine is spells, not lands. |
| 22 | Pia, Determined Rebuilder | 3 | NEW | NO | NO | `{5}{R}`: +X/+0 per artifact — she is an artifact, but six mana for a one-turn pump. |
| 23 | Pyre Rhymer // Molten Tide | 3 | NEW | **SIDE** | **SIDE** | Two spells from one card (creature → refund; Molten Tide instant → all eight converters), and Tide doubles every Mountain for the turn — five-plus red into the bank. **The better "fifth ritual" than Desperate Ritual** on the bench (displaces Crimson Wisps, that row's pointer). If Rhymer is targeted, cast Tide in response. |
| 24 | Way of the Warlord | 3 | NEW | NO | NO | One −3 draw or one 2+2 ping, on an attackable token. |
| 25 | Wrath of the Bloodmane | 3 | NEW | NO | NO | 4 damage to one creature; Bolt, Chaos Warp and Mortars cover it. |
| 26 | Arni, Renowned Champion | 4 | NEW | NO | NO | Combat body. |
| 27 | Chandra, Torch of Defiance | 4 | REPRINT | NO | NO | 4 loyalty in a list with no blockers; the +1's card must be cast as it resolves; the emblem is four activations away. |
| 28 | Curse-Marred Demon | 4 | NEW | NO | NO | Random discard off a 0–2-card hand bins the tutored card — the grounds Gamble was rejected on (2026-09-03). |
| 29 | Heartstring Puller | 4 | NEW | NO | NO | 3/1 plus a 2/2 token. |
| 30 | Tetsuko Umezawa, Pursuer | 4 | NEW | NO | NO | Combat body; its double strike is its own. |
| 31 | Violent Echoes | 4 | NEW | NO | NO | `{R}{R}` for 6 to one creature; Bolt / Mortars. |
| 32 | Awaken the Inferno | 5 | NEW | NO | NO | No commander discount in this deck; a 3-mana sorcery removal spell. |
| 33 | Draconic Visitor | 5 | NEW | NO | NO | **Trap.** Storm-Kiln and Big Score Treasures become Dragons (the mana is gone). With Iron Man (main) every Robot becomes a 5/5 flier — a cute two-card line, not a slot. |
| 34 | Jiang Yanggu, Alone | 5 | NEW | NO | NO | Five-drop; loot on attack. |
| 35 | Tether Technician | 5 | NEW | NO | NO | 5-mana 4/5 with a 2-damage ETB. |
| 36 | Winter, Team Player | 5 | NEW | NO | NO | +1/+0 per noncreature spell on a five-drop; Master of Barbs does more for two. |
| 37 | Ajani Unrelenting | 6 | NEW | NO | NO | −3 kills her and every converter body. |
| 38 | Kiora of Fire and Ashes | 6 | NEW | NO | NO | 6-drop; `{8}` per Dragon. |
| 39 | Venser, Fervent Forger | 6 | NEW | NO | NO | 6-mana reactive creature. |
| 40 | Craterclaw Colossus | 7 | REPRINT | NO | NO | 7-drop; Bulk Up / Embercleave already make the one-swing kill. |
| 41 | Face Yourself | 7 | NEW | NO | NO | Combat plan; own-board copies hit the legend rule. |
| 42 | Akroma, Angel of Fury | 8 | REPRINT | NO | NO | 8-drop. |
| 43 | Currency Converter | 1 | REPRINT | NO | NO | One Treasure / 2/2 a turn; exiling discards starves Past in Flames and Bombardment. |
| 44 | Eye of Jace | 1 | NEW | NO | NO | Surveil, not draw. |
| 45 | Sol Ring | 1 | REPRINT | in list | in list | Reprint — already in both lists. |
| 46 | Afterthought Sentry | 2 | NEW | NO | NO | 2/2 graveyard-hate body. |
| 47 | Arcane Signet | 2 | REPRINT | in list | in list | Reprint — already in both lists. |
| 48 | Fellwar Stone | 2 | REPRINT | NO | NO | May not make `{R}`. |
| 49 | Karn, Argent Defender | 2 | NEW | NO | NO | **Trap + stax.** Switches off Mithril Coat's attach and Coruscation Mage's offspring; symmetric — flagged, not silently excluded. |
| 50 | Living Library | 2 | NEW | NO | NO | 0/4 wall; Command the Stage's Cadets defend and trigger everything. |
| 51 | Medic's Kitesail | 2 | NEW | NO | NO | She already flies. |
| 52 | The Echoverse Fulcrum | 2 | NEW | NO | NO | Destroy all creatures kills her (without Coat/Welding Jar) and every converter body; Blasphemous Act already holds the catch-up bench row. |
| 53 | Chromatic Lantern | 3 | REPRINT | NO | NO | `{3}` rock. |
| 54 | Keeper of the Quiet Hour | 3 | NEW | NO | NO | 3/2 plus a Jace token. |
| 55 | Murmuring Volume | 3 | NEW | NO | NO | `{3}` rock with a pay-to-loot. |
| 56 | Traxos, Scourge Eternal | 4 | NEW | NO | NO | 5/4 that doesn't untap. |
| 57 | Archive Arbiter | 6 | NEW | NO | NO | 6-mana creature; no reducer applies. |
| 58 | Ginger, Queen of Sweets | 6 | NEW | NO | NO | Monarch is draw, but six real mana (no reducer touches a colourless creature) and the list can't hold the crown. |
| 59 | Omnath, Locus of the Void | 7 | NEW | NO | NO | The Horizon Stone effect, rejected 2026-09-03: colourless can't pay `{R}`. |
| 60 | Darksteel Angel | 9 | NEW | NO | NO | 9-mana Platinum Angel. |
| 61 | Emrakul, the Exigent Doom | 10 | REPRINT | NO | NO | 10-drop. |
| 62 | Memnarch, the Warden | 10 | NEW | NO | NO | 10-drop. |
| 63 | Command Tower | 0 | REPRINT | NO | NO | A red source that isn't basic (Fire Nation Palace checks for a basic). |
| 64 | Exotic Orchard | 0 | REPRINT | NO | NO | May not make `{R}`. |
| 65 | Fabled Passage | 0 | REPRINT | NO | NO | A worse Mountain. |
| 66 | Hall of Echoes | 0 | NEW | **SIDE** | NO | `{5}` from the bank: copy Guttersnipe or Longshot for the storm turn (a second converter), or Twinflame Tyrant (×12 with Emancipation). **Main: bench over Rogue's Passage** (unblockable on a flier). Spellslinger: War Room holds its one colourless-utility slot on the draw axis. |
| 67 | Hexhaven Dueling Arena | 0 | NEW | NO | NO | Only live with Pyre Rhymer (bench); `{4}` per Molten Tide is roughly break-even. |
| 68 | Kher Keep | 0 | REPRINT | NO | NO | 0/1 Kobolds; Sokenzan already makes hasty 1/1s. |
| 69 | Mountain | 0 | REPRINT | NO | NO | A printing choice. |
| 70 | Path of Ancestry | 0 | REPRINT | NO | NO | Enters tapped. |
| 71 | Reflecting Pool | 0 | REPRINT | NO | NO | A worse Mountain. |
| 72 | Room of Refuge | 0 | NEW | NO | NO | Enters tapped; `{5}` + a land for two counters. |

---

## Proposed swaps (MAIN)

Two separate proposals for `main`, one for `spellslinger` — each is its own decision.

### 1. Tomik, Izzet Sparkmage in, Firebrand Archer out — `main` **and** `spellslinger`

**Oracle text** ({1}{R}, 1/2 legendary Human Wizard, new): *"Prowess. If a source you control would deal
noncombat damage to an opponent or a permanent an opponent controls, it deals that much damage plus 1
instead."*

**Cost-out:** creature, so Ruby / Fire Crystal only → `{R}` with one Medallion, refunded → free.
**What it does here:** +1 to each opponent on **every damage event** from a source you control — each
pinger trigger, each Grapeshot copy, each Fiery Confluence mode, Lightning Bolt, Delayed Blast Fireball
and Mizzium Mortars (to their creatures too), Chandra's Ignition, Soul's Fire, Crackle and Jaya's per
target, Ashling's second trigger, Urabrask, Thermo-Alchemist's tap, Leyline Tyrant's death dump, Kediss's
copied damage (`main`). **Opponent-restricted**, so it never adds to Ancient Tomb or to your own
creatures — the property the ledger requires of amplifiers in a self-damaging deck.

**Guard for "the gap is already filled" (LEDGER 2026-08-07/08-10):** Artist's Talent L3 is the same
effect at +2. They are additive, so they commute and sum to **+3** — not a blank — and Talent L3 needs
`{1}{R}` plus two `{2}{R}` level-ups (activated abilities, which no reducer touches), so it is a
late-game +2 where Tomik is a turn-2 +1.

**Role table — converters (both lists hold the same eight) plus the candidate:**

| Card | Trigger | To each opponent per spell | Body vs your own Confluence (1-damage mode) | Notes |
|---|---|---|---|---|
| Longshot, Rebel Bowman | noncreature | 2 | 3/3 — survives | also a reducer |
| Guttersnipe | instant/sorcery | 2 | 2/2 — survives one mode | |
| Fiery Inscription | instant/sorcery | 2 | enchantment | |
| Coruscation Mage | noncreature | 1 (2 with the offspring) | 2/2 — survives one mode | |
| Kessig Flamebreather | noncreature | 1 | 1/3 — survives | |
| Thermo-Alchemist | instant/sorcery (untap) | 1 per untap, + a free tap | 0/3 — survives | pings on opponents' turns too |
| Grapeshot | storm | 1 per copy, once | — | the storm finisher |
| **Firebrand Archer** | noncreature | **1** | **2/1 — dies to one mode** | the Coruscation Mage template without offspring |
| **Tomik** | replacement | **+E** (E = other damage events that spell makes) | 1/2 — survives one mode | +1 on every non-converter burn too |

**Deciding axis: damage per spell on a developed board.** Tomik matches Archer at E = 1 and passes it
from E = 2; a noncreature instant with Kessig, Coruscation, Guttersnipe and Inscription out is E = 4.
A storm-8 Grapeshot is +9 on its own.

**Stated costs (§1.3, §2.5):**
- **Multipliers devalue it.** Under Emancipation the opponent applies ×3 first (CR 616.1), so Archer
  adds 3 a spell and Tomik adds E — Tomik still wins only at E ≥ 3; under Emancipation *and* Twinflame
  Archer adds 6. The multipliers are 2 cards in 99, so the unmultiplied state is the common one.
- **Converter density drops 8 → 7.** P(at least one converter in the first 12 cards) ≈ **66% → 61%**
  (hypergeometric, 99 cards). With no other converter out, Tomik only boosts spot burn.
- Curve unchanged (MV 2 for MV 2): `main` MV ≤ 2 32, MV ≤ 3 46; `spellslinger` MV ≤ 2 32, MV ≤ 3 47.

Other converters ranked and kept: Thermo-Alchemist (pings on opponents' turns), Kessig (the 1/3 body),
Coruscation Mage (offspring doubles it). Archer loses to all three on body or ceiling.

### 2. Command the Stage in, Braid of Fire out — `main`

**Oracle text** ({2}{R} sorcery, new): *"Create a 2/2 colorless Wizard Soldier creature token named
Cadet, then put a +1/+1 counter on each other Wizard token you control. At the beginning of each upkeep,
if an opponent was dealt noncombat damage last turn, return this card from your graveyard to your hand."*

**Rules:** the return ability functions from the graveyard (CR 113.6m); at the upkeep after your turn,
"last turn" is your turn, so any pinger hit brings it back. One cast per turn cycle — recurring, not a loop.

**Cost-out:** any two of Ruby / Fire Crystal / Longshot / Talent L2 → `{R}`, refunded → **a free
sorcery every turn**. Each cast: +1/+1 counter on her, all eight converters, Storm-Kiln Treasure, Electro
`{R}`, Urabrask `{R}` + a ping, Birgi `{R}`, Ashling's loot, an Iron Man Robot (it is red), and a Cadet
that grows every later cast (Lindblum's Wizard token grows too).

**Role table — Mana Banking (current 5), scored against `main` now:**

| Card | Output | Needs | Body |
|---|---|---|---|
| Leyline Tyrant | banks all red, indefinitely; death → dump the bank at any target | — | 4/4 flier |
| Electro, Assaulting Battery | banks red + `{R}` per instant/sorcery + X on leaving | — | 2/3 flier |
| Ashling, Flame Dancer | banks red + loot per instant/sorcery; 2nd trigger sweeps, 3rd adds `{R}{R}{R}{R}` | — | 4/4 |
| Birgi, God of Storytelling | `{R}` per **any** spell, held to end of turn | — | 3/3 |
| **Braid of Fire** | +1 `{R}` a turn, growing — **but only usable at upkeep unless a banker is out** | Tyrant / Electro / Ashling | enchantment |

Braid is fifth on output, and it is the card `spellslinger` already cut on exactly this ranking
("lowest output of the mana role … mana was never the reported gap", 2026-09-07).

**Deciding axis: the pilot's two reported gaps against a third that was never reported.** The play
reports named draw/fuel ("struggles with draw") and defenders ("I'm scared of not having defenders and
surviving 3 rounds of attacks"); none named mana. Command the Stage is a spell that never runs out —
eight converter triggers and a counter every turn without spending a card — and a Cadet wall that grows
by one body and one counter per cast, on the row Iron Man's Robots cover and the spellslinger doc called
thin. Braid adds mana.

**Stated costs:** Cadets die to Chandra's Ignition and to two Confluence creature modes (keep choosing
the opponent/artifact modes); **don't flash it back** off Past in Flames (flashback exiles it); before
the first pinger lands it is a 3-mana 2/2 that doesn't return. **Curve:** MV ≤ 2 **32 → 31**, MV ≤ 3
**46 → 46**, average MV **2.84 → 2.85** (nonland, commander excluded).

**Runner-up for the same slot: Master of Barbs** (bench, below).

---

## Bench (SIDE)

| Card | List | Displaces | Grounds |
|---|---|---|---|
| Master of Barbs | main | Braid of Fire (runner-up to Command the Stage) | Every pinger event → +1/+0 on her until end of turn (one trigger per damage event, CR 603.2c): four pingers and eight spells is +32 on the turn's Chandra's Ignition or Soul's Fire. Toughness 1 — your own first Confluence mode kills it. |
| Master of Barbs | spellslinger | Firebrand Archer (runner-up to Tomik) | As above; Tomik converts directly to damage, Master needs a power-reading finisher that turn. |
| Pyre Rhymer // Molten Tide | both | Crimson Wisps (the existing "fifth ritual" row's pointer — Rhymer replaces Desperate Ritual as that row's candidate) | Two spells from one card: the creature (refund + counter), then **Molten Tide** — `{R}` instant, *"Until end of turn, whenever you tap a Mountain for mana, add an additional {R}"* — all eight converters and every Mountain doubled for the storm turn: five-plus red into the bank. Cast Tide in response if Rhymer is targeted (the copy leaves with it, CR 722.3c). |
| Command the Stage | spellslinger | Thrill of Possibility | Same engine as the `main` proposal, but `spellslinger`'s report was specifically **draw**: Command refuels casts without digging, Thrill digs two. Bench unless defenders become the complaint. |
| Fulminous Forte | spellslinger | Mizzium Mortars | Instant: 5 to a creature/planeswalker, or 1 to each of theirs (3 under Emancipation, 2 with Tomik) — instant speed (a Bombardment trigger on their turn) and planeswalker reach, against Mortars' bigger overload. |
| Hall of Echoes | main | Rogue's Passage | `{5}` from the bank: become a copy of a creature for the turn, legend rule off. Copy Guttersnipe or Longshot for the storm turn, or **Twinflame Tyrant** (×2 again — ×12 with Emancipation). Rogue's Passage's unblockability is on a flier. Colourless for colourless. |

## Traps

- **Artifist Acumen** — not new to this deck: it is **Warlord's Fury** word for word, cut 2026-09-04 as
  the narrowest cantrip rider. Recorded so a future pass doesn't re-add it as "a new cantrip".
- **Draconic Visitor** — mandatory: Storm-Kiln and Big Score Treasures become Dragons (the bank loses its
  deposits). With Iron Man in `main`, every red spell makes a 5/5 flying Dragon — a real two-card line,
  but not worth a slot that kills the mana.
- **Karn, Argent Defender** — switches off Mithril Coat's attach and Coruscation Mage's offspring.
  Symmetric stax — flagged for the pilot's pod call, not silently excluded.
- **Ajani Unrelenting** — −3 kills her and every converter body.
- **Curse-Marred Demon** — random discard off a 0–2-card hand bins the card it tutored (Gamble's
  rejection grounds, 2026-09-03).
- **Omnath, Locus of the Void** — the Horizon Stone effect (banks as colourless), rejected 2026-09-03.

## Cross-deck note

The Scarlet Witch review shares this pool: Command the Stage is MAIN in its `main` (for Boltwave),
Stingcaster Mage is bench in its V3 (for Twinferno). Tomik is a NO there — its damage is 2-per-event and
already boosted twice, or exponential in the chain lists.
