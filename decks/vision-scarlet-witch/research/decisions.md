# The Vision and Scarlet Witch — Decision log

Append-only. Record the **grounds**, not just the verdict — the next reader's job is to re-derive
(deck-brain §1.1b). Raw EDHREC pulls for this build: `edhrec-2026-09-03.txt`.

---

## 2026-09-03 — Founding build (Bracket 3, 100 cards)

### The brief

Pilot: *"build Vision and Scarlet Witch up, bank mana and make it unstoppable. Semi-voltron; it
always has to be protected, bonus points if they can't target it or stop it. Cast spells
burning/storming the whole table while TVS is growing."* Sister deck to `decks/scarlet-witch`
(mono-red haymaker); this one is the cheap-spell, wide-burn version.

### The commander, read from the oracle text

`{2}{R}{R}` Legendary Artifact Creature — Mutant Hero 3/3, flying. *"Whenever you cast a spell,
add {R} and put a +1/+1 counter on The Vision and Scarlet Witch."*

Three consequences that shape every slot:

1. **A one-mana red spell is free.** Cast `{R}`, the trigger resolves before the spell does and
   hands the `{R}` back. So a one-mana cantrip is: net 0 mana, +1 card, +1/+1 on a flier, and one
   trigger on every burn permanent. That is the engine, and it is why the list holds ten of them.
2. **Cost reducers do not help the cantrips.** Ruby Medallion and The Fire Crystal reduce only
   generic mana (CR 601.2f, ledger 2026-08-07); a `{R}` spell has none. They matter for the
   two-plus-mana half of the deck (Big Score, Hex Magic, Bulk Up, Twinferno, Equipment costs), not
   the engine.
3. **The mana is real only if it stays.** The trigger is not a mana ability (CR 605.5a); its `{R}`
   empties at end of phase like any other. Leyline Tyrant, Electro and Ashling stop that — under
   any of them every refund and every ritual is a deposit that persists across turns.

### How the field builds her (EDHREC, 278 decks, rank #2,555)

Themes: Spellslinger 19 · Burn 18 · Storm 11 · +1/+1 Counters 8 · Aggro 7 · **Voltron 2**.

| Role | What the field runs (base %, burn %, storm %) | This list |
|---|---|---|
| Cantrips | Crash Through 51/–/73 · Expedite 59/–/73 · Crimson Wisps –/–/82 · Might of the Meek 36 · Renegade Tactics 42 · Warlord's Fury 37 · Impolite Entrance 36 · Ancestral Anger 35 · Fists of Flame 19 | all in |
| Mana engines | Electro 76/78/73 · Birgi 63/61/91 · Ashling 53 · Storm-Kiln 71/83/73 · Runaway Steam-Kin 59/67/91 · Urabrask 44/–/64 · **Leyline Tyrant 8** · Braid of Fire 6 | all in — Tyrant and Braid are the two the crowd misses |
| Rituals | Pyretic 61/72/91 · Seething Song 64/67/82 · Desperate Ritual 50 · Rite of Flame 32 · Mana Geyser 54 · Jeska's Will 66 | 4 of 6 |
| Converters | Grapeshot 80/94/100 · Guttersnipe 57/72/73 · Coruscation Mage 43/94/73 · Firebrand Archer 42/67 · Kessig Flamebreather 32 · Fiery Inscription 27 · Longshot 40 · Thermo-Alchemist 7 · Thor 24 | 8 in |
| Protection | Deflecting Swat 49 · Redirect Lightning 45 · Swiftfoot Boots 39 · Pyroblast 37 · Bolt Bend 32 · Greaves 32 · Commander's Plate 21 · Mithril Coat 12 · Defense Grid 10 · Ozolith 9 · Hexing Squelcher 49 · Conqueror's Flail (n/a) | **9 slots vs the field's ~3–4** |
| Draw | Faithless Looting 67 · Big Score 58 · Thrill 55 · Hex Magic 63 · Wheel of Fortune 21 · Wiccan 34 · Artist's Talent 37 · The One Ring 18 | 7 in |
| Voltron | Embercleave (n/a) · Blackblade 12 (Tony Stark page) · Bulk Up 12 · Twinferno 13 · Kediss 7 | 4 + Kediss |

**Reading:** the crowd builds her as a *cheap-cantrip storm deck* — Grapeshot at 80–100% on every
view, ten-plus one-mana cantrips, a Guttersnipe pinger suite, Birgi/Electro/Steam-Kin for mana —
and treats the commander's growth as a bonus. Only two of 278 decks are tagged voltron. The
pilot's brief moves protection from ~3 slots to 9 and adds a real combat kill (Embercleave, Bulk
Up, Kediss); everything else is the field's own core. The two cards this list rates far above
the field are **Leyline Tyrant** (8%) — the only mono-red permanent that banks red mana with no
"until end of turn" clause besides Electro/Ashling — and **Braid of Fire** (6%), which is a
growing red deposit only in a deck that banks.

### Role skeleton (deck-brain §2.1)

| Role | Target | Built | Notes |
|---|---|---|---|
| Lands | 32 | 32 | 26 red sources; 6 colourless, each named below |
| Rocks / reducers | 7 | 7 | Mox Amber and Lotus Petal are zero-cost casts: +1 counter, +{R} refund, then mana |
| Rituals | 4 | 4 | deposits under a bank (ledger correction 2026-08-21) |
| Banking | 5 | 5 | Tyrant, Electro, Ashling permanent; Birgi until EOT; Braid the deposit |
| Per-spell mana | 3 | 3 | Storm-Kiln's Treasures are banked mana as permanents |
| Cantrips | 10 | 10 | each also grants trample / haste / first strike / can't-block for the swing |
| Draw | 7 | 7 | |
| Converters | 8 | 8 | ledger: 8 in 99 ≈ 66% to see one by turn 5; Urabrask, Kediss, Lindblum's token and Reservoir are extra |
| Protection | 9 | 9 | matrix below |
| Growth / voltron | 4 | 4 | |
| Copy / recursion | 2 | 2 | |
| Removal | 4 | 4 | light on purpose; voltron decks answer with the clock |
| Win conditions | 4 | 4 | |

`deckcheck` reports **39 mana sources (<40)** — the floor is written for decks without a refund
on every spell. Add the commander's refund, three per-spell engines, four rituals, Treasures and
Braid, and the deck is mana-heavy, not light. Re-check only if the pilot reports mana screw.

### The protection matrix (ledger 2026-08-21, five rows)

| Threat row | Covered by |
|---|---|
| Targeted spell (Swords, Chaos Warp, Rapid Hybridization) | Champion's Helm · Swiftfoot Boots · Commander's Plate (W/U/B/G only) · Deflecting Swat · Bolt Bend |
| Targeted ability (Karn, Ravenous Chupacabra) | Helm · Boots · Swat · Bolt Bend |
| Damage wipe (Blasphemous Act) | Mithril Coat · Tyrite Sanctum's indestructible counter · Plate blocks coloured non-red damage |
| Destroy wipe (Wrath of God) | Mithril Coat (flash) · Tyrite Sanctum |
| Non-targeting non-destroy (edicts, Farewell, Cyclonic Rift overload, −X/−X) | **nothing on-body** — The Ozolith keeps the counters, Command Beacon and Cavern of Souls make the recast cheap and uncounterable |
| Counterspells on the storm turn | Hexing Squelcher · Cavern of Souls (commander) · Conqueror's Flail (no spells on our turn) · Overmaster |

The pilot's "can't target it or stop it" is rows 1–2 and the last row. Rows 3–4 are Coat and
Sanctum. Row 5 is the one no red card fills; the honest answer is a two-mana recast with the
counters waiting on The Ozolith.

### Card-level grounds

- **Game Changers — Jeska's Will, The One Ring, Ancient Tomb.** Same three as the Scarlet Witch
  list. Jeska's Will is 66–100% across every view. The One Ring is a colourless spell (still a
  trigger), a protection turn, and the best draw in mono-red. Ancient Tomb's colourless mana pays
  equip costs and Equipment; it does not bank (ledger 2026-08-04), which is why it is the third
  pick and not the first.
- **Kediss, Emberclaw Familiar** (7%) — *"whenever a commander you control deals combat damage to
  an opponent, it deals that much damage to each other opponent."* A 12-power flying commander
  connecting once is 12 to the whole table. Filed as a win condition, not a converter. The
  replicated damage is ability damage, not commander damage (ledger 2026-09-02) — it is life
  loss against 40, and the original hit is the 21-counter.
- **Thermo-Alchemist** (7%) over Electrostatic Field (22%): both are 1 to each opponent per
  instant/sorcery, but Thermo also taps for a free ping each turn and its untap trigger scales
  with spell count exactly like the commander does.
- **Guttersnipe** is in despite the creature-vs-enchantment tax (ledger 2026-08-09: Longshot and
  Artist's Talent L2 reduce Fiery Inscription and not Guttersnipe). Grounds: the converter role
  needs eight bodies and there are only so many enchantment versions; at `{2}{R}` it is one
  generic pip, so the tax is one mana once.
- **Conqueror's Flail**: +1/+1 in mono-red (ledger 2026-08-10); the slot is bought entirely by
  *"your opponents can't cast spells during your turn"* — the storm turn resolves.
- **Cavern of Souls** naming **Hero**: the commander is a Mutant Hero; recasts from the command
  zone can't be countered (CR 106.6, verified). Wiccan (Mutant Warlock Hero) also qualifies.
- **Colourless lands, each named for what it buys:** Ancient Tomb (GC burst), Cavern (uncounterable
  recast), Command Beacon (tax reset), Rogue's Passage (unblockable), Tyrite Sanctum (+1/+1 counter
  and an indestructible counter), Forge of Heroes (a counter the turn she lands). Six against the
  Scarlet Witch list's five–six; every other land taps for red because red banks and colourless
  doesn't.
- **Fiery Confluence** stays despite the self-hit: the `1 damage to each creature` mode kills our
  own Archer, Coruscation Mage and Kediss, so the pilot picks the `2 to each opponent` and
  `destroy artifact` modes unless the board is empty. Three modes of 2 is 6 to each opponent on
  top of every converter trigger.

### Rejected, with grounds

| Card | Grounds |
|---|---|
| **Underworld Breach** (37% base, 50% burn, 55% storm) | Breach + Grapeshot + any ritual + a graveyard is the loop that makes this archetype Bracket 4. Sideboard for a Bracket 4 table. |
| **Gamble** (39%) | Random discard in a deck whose hand is usually 0–2 cards when it would be cast — at H=0 you fetch and discard the card you fetched (ledger 2026-08-20, Fervent Mastery). |
| **Helm of Awakening** (12%) | Can't reduce a `{R}` spell at all (generic-only rule); the cards it does reduce it reduces for everyone. Ruby Medallion and The Fire Crystal are the one-sided versions. |
| **Horizon Stone** | Banked red becomes colourless at end of phase, and colourless can't pay `{R}` pips (CR 107.4a, verified). Leyline Tyrant does the same job and keeps the colour. |
| **Thor, God of Thunder** (24%) | *"damage equal to that spell's mana value"* — in a deck whose spells are MV 1, that is Firebrand Archer at five mana. Right in the Scarlet Witch list (MV 4–11 spells), wrong here. Sideboard if the list ever leans to big spells. |
| **Lightning Greaves** (32%), **Whispersilk Cloak** | Shroud blanks Bulk Up, Twinferno, Might of the Meek, Ancestral Anger, Fists of Flame and every equip activation on our own commander. Hexproof only (ledger 2026-08-07). |
| **Eldritch Immunity** | Protection from each colour includes red: Embercleave falls off (CR 702.16d, verified) and every red pump in the deck can no longer target her. |
| **Defense Grid** (10%) | *"Each spell costs {3} more except during its controller's turn"* — taxes our own Deflecting Swat (alt cost still takes the increase, CR 118.9d), Bolt Bend and Mithril Coat's flash on opponents' turns. Conqueror's Flail covers the same row one-sidedly. |
| **Bonus Round** (24%) | Copies aren't cast: no trigger on the commander, Guttersnipe, Archer or Kessig. Only Storm-Kiln and Ashling ("cast or copy") see them. |
| **Reiterate** (27%) | Buyback copy of Mana Geyser is infinite red; the same reason it sits in the Scarlet Witch Bracket 4 list only. |
| **Pyromancer's Goggles, Double Vision, Dualcaster Mage** | Copies of one-mana cantrips are worth one card; the deck's spells are too small for copy effects to pay. Twinferno stays because its other mode is double strike. |
| **Valakut, the Molten Pinnacle** (35%) | Twenty Mountains, and the deck never ramps lands; the trigger would fire two or three times a game. |
| **Blasphemous Act** (47%) | Kills every converter and the commander without Coat. It is a catch-up sweeper (ledger 2026-09-02); sideboard, bring in against ramp tables. |
| **Vandalblast** (46%) | Overload is a real card against artifact pods; sideboard, displaces Abrade. |
| **Aetherflux Reservoir kept, Thrill of Possibility cut** | Looting is the same effect for one mana; Reservoir is a second storm kill that ignores blockers and protection. |
| **Desperate Ritual, Rite of Flame** | Fifth and sixth rituals; the deck's mana comes from the refund and the bank, and four is the count the Scarlet Witch list settled on for the same reasons. |
| **Electrostatic Field, Thunderdrum Soloist, Erebor Flamesmith** | Same converter template as cards already in; the role is at eight. |

### Rules verified for this build (all in the deck-brain ledger)

- The commander's trigger is not a mana ability; it uses the stack and the {R} lands before the
  spell resolves (CR 605.5a, 603.3).
- Leyline Tyrant banks the refund across turns (CR 106.4, 500.5); Horizon Stone turns it
  colourless (CR 107.4a).
- The Ozolith catches counters on a trip to the command zone and can move them onto the recast
  commander at the next beginning of combat (CR 603.6c, 603.10a, 903.9a, 122.8).
- Hexing Squelcher covers the commander cast from the command zone (CR 112.2, 903.8) and does
  nothing about fizzling (CR 608.2b).
- Commander's Plate in mono-red = protection from W, U, B, G: stops Swords, green blockers and
  black creature damage; does not stop Wrath of God or an edict (CR 702.16b–f).
- Eldritch Immunity's pro-red unattaches red Equipment (CR 702.16d) — rejected on that.

### Validation

`bun run card --deck decks/vision-scarlet-witch/DECK.md --id r` — 81/81 found, no legality or
identity flags, sticker **$920.75** (71/81 priced). `deckcheck`: 100 cards, 39 mana sources (see
skeleton note), 3/3 Game Changers. `MOXFIELD.txt` regenerated. STATUS.md generated from the
priced list.

---

## 2026-09-04 — Roaming Throne in, Lotus Petal out (pilot's call on the cut)

Snapshot: `versions/2026-09-04-before-roaming-throne.md` (reconstructed after the edit by reverting
the list lines).

Pilot asked *"no roaming throne for either deck?"* Re-derived from the oracle text (see the Ultron
log, same date): naming **Hero** doubles the commander's *"whenever you cast a spell"* trigger —
{R}{R} and two +1/+1 counters per spell — and Wiccan, Young Avenger (Mutant Warlock Hero) exiles
two cards per noncreature spell. Kediss (Elemental Lizard) is not covered. Throne is a colourless
`{4}` that no reducer in the list touches and that fires none of the instant/sorcery converters
when cast; it must be on the battlefield before the spell (doublers count at trigger time). Not on
the commander's EDHREC page at all — the field builds one-turn storm and never looks at a
four-mana creature.

**The cut — pilot chose Lotus Petal over my nominee Warlord's Fury.** Recorded both sides:

| | Lotus Petal `{0}` | Warlord's Fury `{R}` |
|---|---|---|
| Mana | +2 once (cast → refund {R}, sac → {R}) | net 0 (cast {R}, refund {R}) |
| Counters | +1 | +1 |
| Cards | −1 (doesn't replace itself) | 0 (draws) |
| Converters fired | 4 of 8 (noncreature: Archer, Flamebreather, Coruscation, Longshot) | 8 of 8 (it is an instant) |
| Storm count | +1 | +1 |

Petal is not useless — it is a free ritual that also grows her — but the deck's binding constraint
is cards in hand (gameplan §"three numbers", #1), and Petal is the only zero-cost spell in the list
that costs a card and fires half the converters. On that axis the pilot's cut is the right one.
Warlord's Fury stays; its first-strike rider is still the narrowest of the ten cantrips and is the
next cut if a slot is needed.

Role moves: Rocks & Cost Reduction 7 → 6, Growth & Voltron 4 → 5. `deckcheck` mana sources 39 → 38
(Petal counted as a rock); the refund-per-spell note from the founding entry still applies.

**Validated:** 100/100, 81/81 found, no legality or identity flags, 3/3 Game Changers, sticker
$970.73. `MOXFIELD.txt` and the PDF regenerated; gameplan and DECK.md rules block updated.

---

## 2026-09-04 — Origin of Thor and Soul's Fire in; Warlord's Fury and Renegade Tactics out (pilot's call on the adds)

Snapshot: `versions/2026-09-04-before-origin-of-thor-souls-fire.md` (reconstructed after the edit
by reverting the list lines).

Pilot asked *"do we need more effects like Chandra's Ignition?"* Counted the axes that turn her
size into damage: **one** non-combat (Chandra's Ignition), seven combat (flying, Embercleave, Bulk
Up, Twinferno, Blackblade, Rogue's Passage, Kediss), plus the spell-count axis (8 converters,
Grapeshot, Reservoir, Crackle). One card in 99 is seen by turn 8 roughly one game in seven; the
board it matters on is a big flier walled by fliers or a Fog with no converters out.

**Origin of Thor** `{2}{R}` — Saga. I: discard one, draw two. II: *"Whenever you cast a spell this
turn, put a +1/+1 counter on target creature you control"* — a second counter per spell on the
storm turn (a third with Roaming Throne). III: *"Target creature you control deals damage equal to
its power to each opponent"* — Ignition without the sweep, so the pingers survive. Enchantment, so
it fires her and the four noncreature-spell pingers on the way in. Cost named: two turns from cast
to chapter III, telegraphed. Field 10% base, 50% of the two-deck voltron view.

**Soul's Fire** `{2}{R}` instant — *"Target creature you control deals damage equal to its power to
any target."* One face, but the pilot's line is the copy: **Twinferno**'s first mode copies the next
instant or sorcery, and the copy chooses its own targets (CR 707.10; the same player may be chosen
by different target instances, CR 601.2c), so her power twice to one face or once to two. The
**Flashback** instant and **Past in Flames** recast it from the graveyard. Instant speed also means
it answers exile-removal aimed at her by throwing her power first — but only if she is still on
the battlefield when it resolves: the creature is a target, and an illegal target neither deals
nor receives anything (CR 608.2b). Cast it with hexproof on. Not commander damage (ability
damage, ledger 2026-09-02) and Kediss does not copy it (combat only). Field 50% of the voltron view.
Copy-effect count in the list after this: one true copy (Twinferno), two recasts (Flashback, Past
in Flames). If the pilot wants the copy line reliable, **Increasing Vengeance** (`{R}{R}`, flashback
for two copies) is the add, displacing Seething Song.

**Rejected for the same slot:** Jaya's Immolating Inferno (converts the bank, overlaps Crackle);
Fling / Kazuul's Fury (sacrifice her); Surestrike Trident (one player, {4} re-equip).

**Cuts — the cantrip role ranked by rider**, every cantrip being equal on the engine axis (net-free,
+1 counter, +1 card, all eight converters): trample ×5 (Crash Through, Might of the Meek, Impolite
Entrance, Ancestral Anger, Fists of Flame) · haste ×2 (Expedite, Crimson Wisps) · uncounterable
(Overmaster) · **first strike (Warlord's Fury)** · **can't block (Renegade Tactics)**. The last two
are the narrowest, and both riders matter less once the deck has two non-combat finishers. Cantrips
10 → 8; with 7 draw spells and her refund the chain still runs. Considered instead: Seething Song
(ritual 4 → 3) and Tablet of Discovery — the rock stays because 32 lands + 3 real rocks is thin for
a turn-4 commander (expected lands in 11 cards ≈ 3.6).

Roles: Cantrips 10 → 8, Win Conditions 4 → 6. Sideboard rows re-pointed: Desperate Ritual now
displaces Crimson Wisps, Silver Shroud Costume displaces Impolite Entrance.

**Validated:** 100/100, 81/81 found, no legality or identity flags, 3/3 Game Changers, 38 mana
sources (see the founding note), sticker $970.82. `MOXFIELD.txt` and the PDF regenerated; gameplan
kill-math and storm-turn sections updated.

---

## 2026-09-04 — Increasing Vengeance and Arcane Bombardment in; Overmaster and Abrade out (pilot's call on the adds; Seething Song protected)

Snapshot: `versions/2026-09-04-before-vengeance-bombardment.md`.

Pilot: *"we should probably try to work both Increasing Vengeance and Arcane Bombardment in here. We
CANNOT get rid of Seething Song, we need all the fast mana we can get."* Oracle read fresh:

- **Arcane Bombardment** `{4}{R}{R}` (not `{4}{R}` — checked) — *"Whenever you cast your first
  instant or sorcery spell each turn, exile an instant or sorcery card at random from your
  graveyard. Then copy each card exiled with this enchantment. You may cast any number of the
  copies without paying their mana costs."* The copies are **cast** (ledger 2026-08-19, CR 601.2),
  so every one is a trigger for her, for all eight converters, for Wiccan and for the storm count —
  and it fires on every turn, opponents' included, off any one-mana instant. With Ruby Medallion,
  The Fire Crystal, Artist's Talent L2 and Longshot out it costs `{R}{R}`. Riders already ledgered:
  Big Score copies still pay the discard; a copied Crackle is X = 0. Field 7% base, 9% storm.
- **Increasing Vengeance** `{R}{R}` — copy a spell you control; cast from the graveyard, copy it
  twice; flashback `{3}{R}{R}` (`{R}{R}` under the reducers). Soul's Fire three times is her power
  to three faces. Field 6% base, 18% storm.

**Cost reducers in the deck, for the record (pilot asked):** Ruby Medallion and The Fire Crystal
(red spells −1 each), Artist's Talent level 2 and Longshot (noncreature −1 each). Four, all
generic-only — they do nothing for the one-pip cantrips and everything for Bombardment, the
flashback costs, Big Score, Hex Magic, Bulk Up, Twinferno and the Equipment.

**Cuts.** Seething Song off the table by the pilot's rule. Ranked the remaining candidates on what
the two incoming cards make redundant:

| Candidate | Grounds |
|---|---|
| **Overmaster** (cut) | Sorcery, so it never triggers Bombardment on an opponent's turn; its uncounterable rider is Hexing Squelcher's job. The draw was the whole card. |
| **Abrade** (cut) | The narrowest removal spell (3 to a creature or one artifact); Lightning Bolt covers the creature mode, Fiery Confluence and the sideboard Vandalblast the artifact mode. |
| Tablet of Discovery | Slowest mana in the list, but 32 lands + 3 real rocks is thin for a turn-4 commander; kept. |
| Fiery Confluence | Three-mode flexibility and 6 to each opponent; kept over Abrade. |
| a trample cantrip | Five is redundant, but every instant cantrip is now a Bombardment trigger on an opponent's turn; kept. |

Roles: Cantrips 8 → 7, Removal 4 → 3, Copy & Recursion 2 → 4. Sideboard rows re-pointed:
Vandalblast displaces Crash Through, Defense Grid displaces Expedite.

**Validated:** 100/100, 81/81 found, no legality or identity flags, 3/3 Game Changers, sticker
$975.28. `MOXFIELD.txt` and the PDF regenerated; gameplan gained the Bombardment and
Vengeance scripts.

---

## 2026-09-04 — Multiplier + free-cast package: Fiery Emancipation, Twinflame Tyrant, Wanda's Vision, Cosmic Cube in; Aetherflux Reservoir, Tablet of Discovery, Flashback, Bolt Bend out

Snapshot: `versions/2026-09-04-before-multipliers-and-free-cast.md` (reconstructed after the edit).

**Two multipliers, and why the "two is greedy" rule doesn't bind here.** That rule (ledger
2026-08-04) was written for a deck with two table-killers, where a multiplier with no payoff in
hand is a blank. This list has eight per-spell converters, her combat hit every turn and five
power-to-face spells — a multiplier is never a blank once anything is on board. Pilot's grounds:
*"we might never draw them, which would be bad"* — one copy is seen by turn 8 about one game in
seven, two copies about one in four. They commute (×6 with both). Emancipation (×3, all sources,
enchantment) is the primary: she is lethal at **seven power** in one hit, and Chandra's Ignition
at seven is 21 to each opponent. Twinflame Tyrant (×2, opponents only, a 3/5 flier) is the copy
that doesn't triple Ancient Tomb. Solphim passed (noncombat only); Torbran passed (additive, and
Artist's Talent L3 already is one).

**Free-cast engines (pilot asked for the "exile… cast without paying" template).** The deck had
none from the library; Bombardment casts from the graveyard. Searched all 70 mono-red-legal cards
with that template. Seated: **Wanda's Vision** (second spell each turn; 42% of her page, top
synergy; fires on opponents' turns off two instants) and **Cosmic Cube** (every attack, choose one
of six with MV ≤ her power — the only one that *chooses*; 50% of the voltron view). Passed for now,
first to try if the deck wants more gas: Chimil, the Inner Sun (discover 5 each end step +
uncounterable — six colourless mana), Hit the Mother Lode (one-shot Geyser-with-a-spell, {R}{R}{R}
with reducers), Nico Minoru (converts every non-hand cast into 2 each, a Hero for Throne). Rejected:
Sunbird's Invocation (reveals MV cards — one for a cantrip), Possibility Storm (exiles the cantrip
you cast), Etali (must attack as a 6/6), Lady Loki (exiles your first instant off the stack).

**Cuts.** Reservoir (the one finisher no multiplier touches; needs ten spells to be live) and
Tablet (slowest mana in the list) on the pilot's agreement. Bolt Bend: fifth card on the
targeted-removal row behind Helm, Boots, Plate and Swat — no other row lost cover. **Flashback over
Past in Flames — the pilot's argument won:** I had nominated Past in Flames on the grounds that it
exiles the graveyard Bombardment feeds on. Wrong axis. Past in Flames gives *every* instant and
sorcery flashback — ten cantrips in the yard is ten more casts, each refunded, each a counter, each
every pinger firing — and it has its own flashback ({4}{R} → {R} under the reducers), so it is two
such turns. Flashback (the instant) is one recast of one card. The one thing Flashback did that
nothing else does — a one-mana instant Bombardment trigger on an opponent's turn — Expedite, Crimson
Wisps and Might of the Meek still do.

**Rules verified this pass (in the ledger):** a spell cast during an ability's resolution ignores
card-type timing (CR 608.2g), so Cube casts sorceries mid-combat; "without paying its mana cost" is
the only way that permission casts the card (CR 118.9b), discover excepted (CR 701.57a).

Roles: Rocks 6 → 5, Protection 9 → 8, Copy & Recursion 4 → 3, Win Conditions 6 → 5, new Damage
Multipliers 2, new Free-Cast Engines 2. Sideboard: Pyroblast now displaces Might of the Meek.

**Validated:** 100/100, 81/81 found, no legality or identity flags, 3/3 Game Changers, sticker
$1000.21. `MOXFIELD.txt` and the PDF regenerated; gameplan updated (multiplier kill math,
Vision and Cube scripts, Ancient Tomb warning).

---

## 2026-09-04 — Silent Arbiter in, Wiccan, Young Avenger out (pilot's call); Iron Man, Tony Stark to the sideboard

Snapshot: `versions/2026-09-04-before-silent-arbiter.md`.

Pilot: *"I'm scared of not having defenders and surviving 3 rounds of attacks before it's my turn
again."* Grounds: the protection package covers her, not the pilot — the "keeps the pilot alive" row
had nothing in it, and the fifteen creatures in the list are pingers and engines, not blockers. Red
has no Fog and no Ghostly Prison, so the pool is colourless artifacts:

| Card | Verdict |
|---|---|
| **Silent Arbiter** `{4}` → `{2}` (Talent L2 + Longshot) — **IN** | *"No more than one creature can attack each combat. No more than one creature can block each combat."* She attacks alone, so the attack cap only ever binds opponents (one attacker per combat at the table) and the block cap is evasion for her. 1/5 body. Not on her EDHREC page. |
| Crawlspace `{3}` → `{1}` | One-sided, attackers only; no blocker cap. Sideboard candidate. |
| Maze of Ith | A land that taps for no mana in a 32-land deck with six colourless already. Passed. |
| Kazuul, Tyrant of the Cliffs | Deterrent on a five-mana creature into the full tier. Sideboard candidate. |
| Ensnaring Bridge | She can't attack either. Rejected. |

**Cut — Wiccan.** Draw was the most over-supplied role at 21 sources after Wanda's Vision, Cosmic
Cube and Arcane Bombardment; Wiccan was the third impulse engine. Same tier, creature for creature.
Cost named: he was a Hero (Throne doubled him) and the deck's on-theme card.

**Iron Man, Tony Stark → sideboard** (pilot's call). Grounds recorded: a 2/1 flying artifact token
per red spell, a Hero for Throne, tokens pump Storm-Kiln — but a five-drop into the full tier, and
with Silent Arbiter out a board of chump blockers is moot (one blocker per combat). Displaces Fiery
Confluence when he comes in.

Roles: Card Draw 7 → 6, Protection 8 → 9. Sticker $1010.73; validated 100/100, 3/3 Game
Changers, no flags. `MOXFIELD.txt` and the PDF regenerated.

---

## 2026-09-04 — Shadowspear, Loki Laufeyson, Iron Man in; Expedite, Twinferno, Silent Arbiter out (pilot's calls)

Snapshot: `versions/2026-09-04-before-shadowspear-loki-ironman.md`.

- **Shadowspear** `{1}` (free under Talent L2 or Longshot), equip {2}: +1/+1, trample, lifelink.
  Grounds: lifelink applies to all damage the source deals (CR 702.15b), and she is the source of
  Chandra's Ignition, Soul's Fire and Origin of Thor III — an Ignition at 15 power against three
  opponents gains 45 plus the creatures, tripled under Emancipation. Vigilance passed on: the kill
  turns are mostly non-attack turns, and a Shadowspear hit is a bigger life swing than a block.
  Haunted Cloak (equip {1}) is the pick if vigilance is ever wanted. **Cut Expedite** — the second
  haste cantrip; haste stays covered by Boots, Impolite Entrance and The Fire Crystal. Cantrips 7 → 6,
  and that resource stops here (ledger: each is a free trigger, not just a draw).
- **Loki Laufeyson** `{1}{R}` — `{1},{T}`: copy the next instant or sorcery this turn with MV ≤ his
  power; power-up `{4}{R}` (−his cost the turn he enters = `{3}`) for two +1/+1 counters → a 4/3 that
  copies Soul's Fire, Fiery Confluence, Big Score, Past in Flames every turn for one mana, on
  opponents' turns too. Villain, not Hero (Throne doesn't double him); legendary, so Tyrite Sanctum
  grows him. Tap ability → needs haste the turn he lands. 13% base, 100% of the voltron view.
  **Cut Twinferno** — its copy mode is what Loki does every turn; its double-strike mode lives in
  Embercleave.
- **Iron Man, Tony Stark over Silent Arbiter — pod signal.** Pilot: *"I've played pods with Arbiter
  before and it gets taken out fairly quickly. People don't like it."* Same family as the ledger's
  "Ranked a hate piece on average text and missed that the pilot's pod is its target" (2026-09-03):
  a stax piece's value is pod-specific, and this pod answers it on sight. Arbiter to the sideboard
  for pods that don't. Iron Man's grounds stand from the previous entry (a 2/1 flier per red spell,
  Hero for Throne, tokens pump Storm-Kiln); with Arbiter gone the tokens are real blockers again.

Roles: Cantrips 7 → 6, Protection 9 → 8, Copy & Recursion 3 → 4, Win Conditions 5 → 6. Sideboard:
Silent Arbiter (displaces Iron Man), Reiterate now displaces Increasing Vengeance.

**Validated:** 100/100, 81/81 found, no legality or identity flags, 3/3 Game Changers, sticker
$1038.95. `MOXFIELD.txt` and the PDF regenerated.

---

## 2026-09-04 — Neheb, the Eternal in, Runaway Steam-Kin out (pilot's call; Mana Geyser protected)

Snapshot: `versions/2026-09-04-before-neheb.md`.

Pilot: *"the creature in Wanda's deck that gives us red mana after combat."* Neheb — *"At the
beginning of each of your postcombat main phases, add {R} for each 1 life your opponents have lost
this turn."* Better here than in the Scarlet Witch list because this deck loses opponents life every
turn: eight spells through four converters ≈ 8 × 6 × 3 opponents = 144 life lost = 144 red in the
postcombat main, tripled under Emancipation, plus Kediss's replicated combat damage. The postcombat
main happens without attacking (CR 500.1, ledgered 2026-08-02). Costs 5, or 3 under both
Medallions (creature — Talent and Longshot don't apply). Field 14%.

**Cut — the mana-engine role ranked on an eight-spell turn** (Tyrant bank · Electro 6 banked ·
Ashling 4 banked + loot · Birgi 8 EOT · Urabrask 6 + 6 damage · Storm-Kiln 6 Treasures · Braid 1…n ·
Steam-Kin 6 in bursts · Neheb ~100+): Runaway Steam-Kin is the lowest output, counts red spells only
(no artifacts, no Equipment), and is the only body that dies to the deck's own Fiery Confluence,
Chandra's Ignition and any pinger. The Scarlet Witch list cut it on the same fragility. Mana Geyser
was my first nominee and the pilot protected it (*"~10 mana at the beginning of your phase"*).
Braid of Fire is the second candidate if the pilot ever wants Steam-Kin back.

**Recorded, pilot's line — Steam-Kin + The Ozolith:** counters banked on The Ozolith can be moved
onto Steam-Kin at beginning of combat, it attacks as a 13/13, and after damage *"Remove three +1/+1
counters: Add {R}{R}{R}"* (a mana ability, any time) converts them — twelve counters is twelve red,
banked under Tyrant. Real, and a fair reason to prefer it over Braid. It needs the commander gone,
Ozolith out and Steam-Kin alive, and the counters are usually worth more back on the recast
commander — so it is a consolation line, not the reason to keep the card.

Roles: Per-Spell Mana renamed **Mana Engines** (3). Curve: a 2 for a 5.

**Validated:** 100/100, 81/81 found, no legality or identity flags, 3/3 Game Changers, sticker
$1046.17. `MOXFIELD.txt` and the PDF regenerated; gameplan gained the Neheb two-stage turn.

---

## 2026-09-07 — SPELLSLINGER parallel list built (`DECK-SPELLSLINGER.md`); `DECK.md` stays live

Pilot's play report (2026-09-06): *"struggles with draw sometimes and/or having enough finishers
to get through without commander damage."* Pilot's direction: keep playing `DECK.md`, and build a
second, spells-first version with voltron second — **Hexing Squelcher, Conqueror's Flail and The
Ozolith stay in both**, plus a cheap way to make the artifacts (or the commander) indestructible.

Full grounds, role tables, searched pools and the rules verified: `research/spellslinger-2026-09-07.md`.

  OUT (10): Swiftfoot Boots · Blackblade Reforged · Embercleave · Bulk Up · Cosmic Cube ·
            Kediss, Emberclaw Familiar · Iron Man, Tony Stark · Braid of Fire ·
            Rogue's Passage · Forge of Heroes
  IN  (10): Wiccan, Young Avenger · Vision of Love · Thrill of Possibility · Aetherflux Reservoir ·
            Jaya's Immolating Inferno · Delayed Blast Fireball · Mizzium Mortars · Welding Jar ·
            War Room · Mountain

Roles: draw 6 → 9 (+ War Room), win conditions 6 → 6 (Reservoir and Jaya's for Iron Man and
Kediss), removal 3 → 5 (two one-sided sweeps), voltron 5 → 0, protection 8 → 9 (Boots out, Welding
Jar in, Shadowspear filed under protection), banking 5 → 4, free-cast 2 → 1.

Field check: 278 decks — Spellslinger 19, Burn 18, Storm 11, Voltron 2. The reshape follows the
field; the founding build had overridden it on the voltron brief.

Artifact-protection search (red/colourless, 13 noncreature hits + 3 regenerators): nothing cheap
makes *all* artifacts indestructible. Welding Jar ({0}, regenerate target artifact — the commander
is an artifact creature, CR 205.2b) seated; Manhole Cover (flash, creature indestructible until end
of turn, later a draw) recorded as the alternative if the pilot prefers to protect her only.

Not changed: `DECK.md`, `STATUS.md`, `SIDEBOARD.md`, `gameplan.md` (still scripts Aetherflux —
stale since 2026-09-04, fix when DECK.md is next touched), PDF. Validated 100/100, headers match,
80/80 found, no flags, 3/3 GC, $1,039.30. `MOXFIELD-SPELLSLINGER.txt` generated.

---

## 2026-09-28 — Reality Fracture (FRA/FRC) set review: pilot's calls

Full review: `research/fra-set-review-2026-09-28.md` (72-card mono-red pool, every card classified).

- **Applied to `main`: Command the Stage in, Braid of Fire out** (pilot approved). Grounds: it
  returns from the graveyard every upkeep after a turn in which an opponent took noncombat damage
  (CR 113.6m), and the pingers make that every turn. Braid ranked last of five in Mana Banking, and
  the pilot's reported gaps were card flow and blockers, not mana. Snapshot:
  `versions/2026-09-28-1602-main-fra-command-the-stage-in-braid-of-fire-out.json`.
- **Not taken (the pilot didn't pick them up):** Tomik, Izzet Sparkmage for Firebrand Archer in
  `main` and `spellslinger`. Grounds on file: +1 per damage event, worth less under Fiery
  Emancipation because opponents order the replacements (CR 616.1).
- **Declined: Stingcaster Mage.** Pilot: *"it's a slow card not worth it"*. The review had it NO here:
  it is a weaker Flashback, since a creature cast fires none of the 8 noncreature pingers.

### Reverted 2026-09-28 (pilot's call): Braid of Fire back in, Command the Stage out

The pilot asked the same day to undo the FRA swap above. `main` now matches its pre-review state
card for card, verified against
`versions/2026-09-28-1602-main-fra-command-the-stage-in-braid-of-fire-out.json`. Revert snapshot:
`versions/2026-09-28-1840-main-revert-braid-of-fire-back-in-command-the-stage-out.json`. No reason
given; Command the Stage stays out of both Wanda decks. Net FRA result for WandaVision: no changes.

---

## 2026-10-10 — Rite of Flame and Powerbalance into `main` (pilot's calls); Braid of Fire and Cosmic Cube out

Prompted by the pilot asking which red decks want Powerbalance. The cross-deck measurement is
deck-brain ledger eval-060.

| List | Out | In | Grounds |
|---|---|---|---|
| `main` | Braid of Fire | Rite of Flame | Pilot: *"it's pay 1 get 2 guaranteed every time almost."* With her out it nets two red (you pay {R}, it adds {R}{R}, her trigger adds {R}), a counter and every pinger, and Arcane Bombardment, Past in Flames and Increasing Vengeance cast or copy it again. Braid was 5th of 5 in Mana Banking on 2026-09-28: its mana arrives in the upkeep and is lost unless Leyline Tyrant, Electro or Ashling is out. |
| `main` | Cosmic Cube | Powerbalance | Same Free-Cast Engines job for 2 mana instead of 5, with no attack needed. |

**Rite of Flame, the case against it, recorded.** The founding build passed on it as a fifth ritual
because "the deck's mana comes from the refund and the bank." It also spends a card in a deck whose
reported gap is draw. The pilot took it anyway, as they protected Seething Song on 2026-09-04.

**Powerbalance.** Oracle: *"Whenever an opponent casts a spell, you may reveal the top card of your
library. If you do, you may cast that card without paying its mana cost if the two spells have the
same mana value."* Simulated at about 0.63 free spells per opponent turn cycle for this list (6
opponent spells a cycle, opponent mana values taken from the 24 lists in this repo), so about 3
over five cycles. Each hit is a counter, an {R} that lasts the step (CR 106.4) or banks, every
pinger, and with an instant in hand a Wanda's Vision trigger. Only Crackle with Power and
Shatterskull Smashing are X-spell blanks (a free cast locks X at 0). Costs: every trigger reveals
your next draw (ledger eval-059), and it adds one red pip over Cube.

**Cut ranking for Powerbalance, scored against `main` after Rite of Flame:**

| Candidate | Grounds |
|---|---|
| **Cosmic Cube** (cut, pilot's pick) | Same job, 5 mana and needs an attack. What is lost: it picks the best of six cards and can cast Chandra's Ignition free. |
| Blackblade Reforged (my pick, not taken) | Growth & Voltron is at 5 against a target of 4, and it costs 2 plus 3 to equip at sorcery speed for power the counters already supply. Against: about +6 power for Soul's Fire, Origin of Thor and Ignition. |
| Loki Laufeyson | Copy & Recursion is at 4 against 2, its copies aren't cast, and it only copies spells up to its power. The pilot picked it on 2026-09-04. |
| Increasing Vengeance | Same over-target role, but its copies of Ignition and Soul's Fire are finisher damage, the other reported gap. |
| Kediss, Emberclaw Familiar | Works only when the commander connects in combat, but it is one of six finishers. |
| Swiftfoot Boots | Second hexproof source after Champion's Helm, but Protection is under target (8 against 9). |

**Also decided:** `spellslinger` is unchanged, because the pilot hasn't played it yet. Powerbalance
for Thrill of Possibility there is on hold.

Roles: Rituals 4 → 5, Mana Banking 5 → 4, Free-Cast Engines stays at 2. Curve: average MV
2.84 → 2.79, MV 1 11 → 12, MV 5 7 → 6, red pips 75 → 77. Snapshots:
`versions/2026-10-10-0802-main-rite-of-flame-in-braid-of-fire-out.json` and
`versions/2026-10-10-0802-main-powerbalance-in-cosmic-cube-out.json`. `gameplan.md` updated (the
Braid line now covers Rite, and the Cube script is now a Powerbalance script). Validated: 100
cards, 81/81 found, legal, mono-red, 3/3 Game Changers. PDF regenerated. Rite of Flame and
Powerbalance have no printing pinned, so `MOXFIELD.txt` exports them as bare names.

---

## 2026-10-13 — Bracket 4 proposal (turn 3 to 4 combo); nothing applied

Pilot: *"see if we can elevate it to a bracket 4 deck"*, using what Scarlet Witch's B3 and B4 lists
taught, without assuming a card that failed there fails here. Answers to the scoping questions: a turn
3 to 4 combo build (*"if it's not working we bring the voltron pieces back"*), built from `main` plus
the spellslinger list's draw cards, every protection piece judged card by card, reviewed on a proposal
page in waves before any list is created.

**Proposal page:** https://claude.ai/artifact/UjPtcJfpuZkukvzBpy5QBf. Grounds per swap are in
`research/proposal.json`; the page data is generated into `artifact/` by
`bun run deck:proposal vision-scarlet-witch`. All four waves are `proposed`. No `b4` list exists in
`deck.json` yet. Once the pilot approves waves, copy `main` into a new `b4` list and apply each
approved wave with `deck:edit --list b4`.

### The four waves (29 out, 29 in, measured against `main` with a dry run)

| Wave | Out | In |
|---|---|---|
| 1. Fast mana, 28 lands | Arcane Signet, The Fire Crystal, Lindblum, Tyrite Sanctum, Forge of Heroes, Rogue's Passage, Arena of Glory, Leyline Tyrant, Urabrask | Mana Vault, Grim Monolith, Chrome Mox, Mox Diamond, Lion's Eye Diamond, Lotus Petal, City of Traitors, Simian Spirit Guide, Desperate Ritual |
| 2. Combo package | Powerbalance, Loki Laufeyson, Arcane Bombardment, Embercleave, Neheb, Blackblade Reforged, Fiery Emancipation, Kediss, Iron Man | Grinning Ignus, Reiterate, Underworld Breach, Haze of Rage, Runaway Steam-Kin, Treasonous Ogre, Aetherflux Reservoir, Dualcaster Mage, Molten Duplication |
| 3. Tutors and card flow | Wanda's Vision, Twinflame Tyrant, Origin of Thor, Bulk Up, Roaming Throne, Fiery Inscription, Shadowspear, The Ozolith, Commander's Plate | Gamble, Imperial Recruiter, Wiccan, Vision of Love, Unexpected Windfall, Thrill of Possibility, Expedite, Chromatic Star, Wrenn's Resolve |
| 4. Protection | Champion's Helm, Mithril Coat | Untimely Malfunction, Pyroblast |

Projected: 100 cards, 28 lands, average MV 2.79 → 2.30, MV ≤ 2 from 34 to 44, MV ≤ 3 from 49 to 60,
Game Changers 3 → 10, creatures 20 → 19.

### Grounds that came out of this pass

- **Loops verified by `mtg-rules-expert` (all chosen-N, CR 732.2a):** the commander with Grinning Ignus
  (ledger loop-020), with Reiterate and Seething Song (loop-018, extended), with Underworld Breach, Lion's
  Eye Diamond and Wheel of Fortune (loop-019, extended), with Storm-Kiln Artist and Haze of Rage
  (loop-022), and Dualcaster Mage with Molten Duplication, which doesn't need her (loop-021).
- **Kept from Scarlet Witch's lessons:** five-drops are a setback on the kill turn (Thor, 2026-10-13),
  Arcane Bombardment is too slow for B4 (2026-10-13), Powerbalance doesn't suit a turn-3 plan
  (2026-10-10), and Treasonous Ogre and Runaway Steam-Kin did the same job there.
- **Not carried over:** Gamble returns, cast early with a full hand, because this list needs one
  specific piece; Bonus Round stays out because copies aren't cast (founding entry). Colourless fast
  mana counts for more here than in Scarlet Witch's b4, because her refund turns any cast into {R}.
- **Hex Magic stays.** I first nominated it as a cut, then re-read the oracle: it exiles your hand,
  draws that many, and lets you play the exiled cards until the end of your next turn, so a hand of
  four gives access to eight on turns 1 to 3. It is also Arcane, so Desperate Ritual splices onto it.
- **Wiccan and War Room** were both in the agreed spellslinger draw set. Wiccan is proposed with its
  cost named (four mana; the pilot called it too slow for Scarlet Witch's b4). War Room is passed:
  this list already has four colourless lands and needs {R}{R} on turn 2.
- **How often a combo comes together (simulated, 50,000 hands, cards seen only):** 29% by turn 3,
  33% by turn 4, 38% by turn 5, about half of it Grinning Ignus. The rest of the time the list plays
  as a faster `main`. Ledger build-045.

### Correction recorded

Ledger loop-018 said Mana Geyser is weak on your own turn because opponents' lands are untapped. A
player untaps only in their own untap step (CR 502.3), so lands opponents tapped on their turns are
still tapped on yours. Corrected in place with a History line. The pilot's 2026-09-04 read (*"~10 mana
at the beginning of your phase"*) was right.

---

## 2026-10-14 — `b4` saved from the Bracket 4 proposal (pilot's call); token package discussed

Pilot: *"alright save this list"*. All four proposal waves applied to a new `b4` list (label "Bracket 4
turbo", bracket 4), one `deck:edit` per wave so each can be undone alone. `main` and `spellslinger` are
unchanged (checked against a copy of `deck.json` taken before the edit). `b4` was seeded as a copy of
`main` with "Rocks & Cost Reduction" renamed Fast Mana and the two mana-creature sections merged into
Mana Engines; the three sections the waves emptied were removed afterwards.

Snapshots: `versions/2026-10-14-0907-b4-b4-wave-1-fast-mana-and-a-28-land-base.json`,
`...-wave-2-the-combo-package.json`, `...-wave-3-tutors-and-card-flow.json`,
`...-wave-4-protection-and-interaction.json`. Validated: 100 cards, 81 of 81 names found, legal, mono-red,
10 Game Changers, average MV 2.30. `MOXFIELD-B4.txt` generated. The proposal page's waves are now
`applied`. The new cards have no printing pinned, so they export as bare names.

### Token package raised by the pilot (not applied)

Impact Tremors, Purphoros, God of the Forge, Infantry Shield and Iron Man, Tony Stark, plus token
makers that fire on instants and sorceries. Rules checked from the CR: a recast Grinning Ignus is a new
object entering (CR 400.7, 603.6a), so each loop iteration triggers Impact Tremors and Purphoros, and
the Dualcaster Mage tokens do too; mobilize tokens enter tapped and attacking, so they trigger both
(CR 702.181a). Measured on `b4` (same kit simulation as build-045): Impact Tremors for Wiccan moves a
complete combo by turn 4 from 33% to 35%; adding Purphoros as well (for Simian Spirit Guide) reaches
36%. Iron Man (five mana) and Infantry Shield (three plus equip two, and it needs an attack) are the
slow half. Waiting on the pilot: whether Impact Tremors goes into `b4`, and whether to build a
separate Bracket 3 token list for the pods that object to strong Bracket 3 decks.

---

## 2026-10-14 (part 2) — `b4`: Impact Tremors and Infantry Shield in (pilot's calls); B3 token list proposed

### Applied to `b4`

| Out | In | Grounds |
|---|---|---|
| Wiccan, Young Avenger | Impact Tremors | A recast Grinning Ignus is a new object entering (CR 400.7, 603.6a), so Tremors makes the Ignus loop a kill by itself, and the Dualcaster Mage tokens a kill without combat. Simulated complete combo by turn 4: 33% to 35%. |
| Treasonous Ogre | Infantry Shield | Pilot: *"life might be more difficult to come by in b4."* My recommended cut was Aetherflux Reservoir (same finisher job). Shield gives her mobilize X equal to her power, so after an Ignus loop she attacks with as many Warriors as you chose (ledger equip-029). Simulated: 34.8% to 36.5%. |

Snapshots: `versions/2026-10-14-0917-b4-impact-tremors-in-wiccan-out.json`,
`versions/2026-10-14-0934-b4-infantry-shield-in-treasonous-ogre-out.json`. Both are recorded on the
`b4` proposal page as wave 5. Average MV 2.30 → 2.26, 10 Game Changers.

### Proposed: a Bracket 3 token list built from `main`

Page: https://claude.ai/artifact/2wcbwDiAkYKwyDTMMBVdJF, grounds in `research/proposal-b3-tokens.json`,
data from `bun run deck:proposal vision-scarlet-witch --proposal research/proposal-b3-tokens.json --out
decks/vision-scarlet-witch/artifact-b3-tokens` (the `--proposal` option was added to the script for this,
so one deck can propose more than one list). Nothing applied; no `b3-tokens` list exists yet.

Pilot's scope: cut the slow engines but keep Neheb, Origin of Thor, Loki and Powerbalance; judge every
card on merit, because late-game combos are allowed at Bracket 3. Also the pilot's point, recorded:
she grows herself and makes mana, so the only Equipment worth paying for is her protection and cards
like Infantry Shield.

| Wave | Out | In |
|---|---|---|
| 1. Token engine | Wanda's Vision, Arcane Bombardment, Thermo-Alchemist, Urabrask | Impact Tremors, Purphoros, Young Pyromancer, Stormsplitter |
| 2. Voltron that makes tokens | Blackblade Reforged, Leyline Tyrant | Infantry Shield, Empty the Warrens |
| 3. Extras, one call each | Firebrand Archer, Forge of Heroes | Goblin Bombardment, Hordeling Outburst |

Projected across all three waves: average MV 2.79 → 2.73, MV ≤ 3 from 49 to 51, 3 Game Changers.

### Found while checking the B3 list

- **`main` already holds a three-card loop.** Loki Laufeyson's delayed copy starts the Increasing
  Vengeance loop, and Storm-Kiln Artist makes a Treasure per copy, so it is unbounded mana (verified
  2026-10-14, ledger loop-017). It has been in `main` since 2026-09-04. The pilot allows late-game
  combos at Bracket 3, so it stays.
- **Stormsplitter doubles itself** on every instant or sorcery cast (ledger zone-028), so five spells
  with Impact Tremors and Purphoros out deal 93 to each opponent. It is bounded by spells cast.
- **Roaming Throne naming Hero makes Infantry Shield's mobilize trigger twice**, and also doubles her
  cast trigger (ledger equip-029, loop-020).

---

## 2026-10-14 (part 3) — `b3-tokens` built from the B3 token proposal (pilot's call)

Pilot approved all three waves (*"yupp go for it"*). New list `b3-tokens` (label "Bracket 3 tokens",
bracket 3), seeded as a copy of `main` through the deck store, then one `deck:edit` per wave and one
per wave 3 swap, so each can be undone alone. `main`, `spellslinger` and `b4` are unchanged (checked
against a copy of `deck.json` taken before the edit).

Snapshots: `versions/2026-10-14-1010-b3-tokens-b3-tokens-wave-1-the-token-engine.json`,
`...-b3-tokens-wave-2-voltron-that-makes-tokens.json`,
`...-goblin-bombardment-in-firebrand-archer-out.json`, `...-hordeling-outburst-in-forge-of-heroes-out.json`.
Validated: 100 cards, 81 of 81 names found, legal, mono-red, 3 Game Changers, 31 lands, average MV
2.73. `MOXFIELD-B3-TOKENS.txt` generated. The proposal page's waves are now `applied`. The new cards
have no printing pinned.

**Pilot asked whether Roaming Throne really doubles Infantry Shield's mobilize.** Re-derived from the
text: Infantry Shield says the equipped creature *"has"* mobilize, and an ability granted by an effect
is that object's own ability (CR 113.1a, 113.10, layer 6 in 613.1f). She is a Hero, so Roaming Throne
naming Hero makes it trigger an additional time (CR 603.2d), and Throne's ruling says each instance
makes its own choices. Two sets of X Warriors, and Impact Tremors triggers for each Warrior. Ledger
equip-029.

## 2026-11-10 — `main`: Laughing Mad in, Crash Through out (pilot's call)

Snapshot: `versions/2026-11-10-0207-main-laughing-mad-in-crash-through-out.json`. Part of a
multi-deck card review. The pilot listed Laughing Mad *"for flashback"*, and plays `main` most of the
four lists (*"probably main"*).

**Grounds.** Flashback makes it two casts from one card: two Vision triggers ({R} and a +1/+1
counter each) and two triggers on every converter, for one net card across the two casts. The
gameplan names cards in hand as the deck's binding constraint, and the first play report said it
*"struggles with draw sometimes."*

**The first proposal was draw-for-draw** (Thrill of Possibility, in `spellslinger`), which the pilot
read as cutting draw. Crash Through is the better cut: a cantrip whose rider (team trample) does least
for a flying commander. Card Draw 6 → 7, Cantrips 6 → 5. avg MV 2.79 → 2.81.

**Cost.** {2}{R}, then {3}{R} on flashback, against Crash Through's {R}. Vision refunds {R} per cast,
so the two casts cost 5 net.

**Also reviewed for this deck this session, not taken:**
- Kediss, Emberclaw Familiar went to Iron Man; it stays in `main` and `b3-tokens` here.
- Giggling Skitterspike, a recorded cute line: every targeted cantrip (Crimson Wisps, Fists of Flame,
  Might of the Meek, Ancestral Anger, Impolite Entrance, Bulk Up, Soul's Fire) makes it deal its
  power to each opponent. It needs 9 mana to set up and pulls those cantrips off the commander.
- Waltz of Rage, a recorded cute line for `b3-tokens`: every Goblin token its damage kills is an
  impulse-drawn card, because its delayed trigger exists before state-based actions (CR 603.7a,
  704.3).

Validated: `main` 100/100, legal and mono-red, Game Changers 3/3 unchanged. Moxfield files
regenerated; only `MOXFIELD.txt` changed. PDF regenerated.
