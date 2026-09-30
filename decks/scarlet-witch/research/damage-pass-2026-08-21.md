# Damage-output pass — 2026-08-21

**Prompted by a play report**, not a card question: *"I can't do anything the whole game for 8+
turns until I draw enough damage output … the deck is very strong when it gets going, but they had
to leave me alone for 8 whole turns."* Per `LEDGER.md` (2026-08-20, *a repeated in-game failure
outranks every list-derived verdict it touches*), this pass re-derives the **structure** first and
proposes card swaps second.

**Constraint from the pilot:** damage must come from **red spells / instants / sorceries** —
pingers that trigger on casting, not on artifacts entering. Artifact *cards* are fine; artifact-
*count* and artifact-ETB triggers (Reckless Fireweaver, Molten Psyche's metalcraft) are out.

**Method:** deck-brain §1.1 — every card below was pulled with `bun run card`; costs are re-derived
in this deck's mana (§1.2: Ruby Medallion + The Fire Crystal −2 on red spells, Longshot + Artist's
Talent L2 −2 on noncreature spells, Wanda −power on instants/sorceries MV 4+, generic only); every
creature was checked against the deck's own sweepers (§1.3); field signal is the 10-deck Wanda
sample (`samples/analyze.ts --freq`) and the EDHREC page (1,721 decks, pulled 2026-08-21) —
**including the theme-filtered views** (`bun run edhrec commander "The Scarlet Witch" --theme
burn|spellslinger|x-spells|storm --all`), since the Burn sub-field (64 decks) is the direction
this pass moves toward; see §6. **No deck files were edited.**

---

## 1. Diagnosis — what "eight turns of nothing" is, in numbers

| Role | Count | Note |
|---|---|---|
| Lands | 33 | |
| Mana — rocks / rituals / reducers | 14 | Sol Ring, Signet, Fire Crystal, Ruby, Tablet, Goggles, 3 rituals, Jeska's Will, Geyser, Bounty, Artist's Talent, Gauntlet |
| Mana — per-spell engines | 7 | Birgi, Electro, Urabrask, Ashling, Neheb, Storm-Kiln, The Vision and Scarlet Witch |
| Card draw | 12 | |
| Pump | 4 | Livaan, Cait Sith, Blazing Shoal, Blackblade |
| Copy / recur | 5 | |
| Protection | 6 | |
| Removal / defence | 8 | |
| Win conditions | 10 | of which **6 need the big turn** (Crackle, Jaya's, Ignition, SKT, Electrodominance, Emancipation) |

**The conversion layer** — permanents that turn a cast spell into damage to opponents — is
**five cards**: Longshot (2 each / noncreature), Fiery Inscription (2 each / I-S), Thor (MV to any
target / noncreature), Urabrask (1 to one opponent / I-S), Ashling (2 each on the second I-S of a
turn). Emancipation multiplies them; Artist's Talent L3 adds +2 but costs 9 mana to reach.

- **54 of 99 slots make or discount mana. 5 convert spells into damage.**
- Of ~35 instants/sorceries, **six** hurt an opponent (Crackle, Jaya's, Ignition, Electrodominance,
  Fiery Confluence, plus Storm King's Thunder as a copier). The other ~29 draw, ramp, copy or
  protect.
- With 5 converters in 99, the chance of having **at least one in your first 12 cards (≈ turn 5)
  is 48%.** Half the games, you reach turn 5 casting Big Score and Inspired Tinkering into a board
  that has nothing to convert them — that is the eight turns.
- The design was always "survive, then one enormous turn," and that design *requires* being left
  alone. The B4-pod win is the archetype working as drawn; the report is its known cost.

**Verdicts the report overturns (re-derived, not defended):**

| Verdict | Where | Status |
|---|---|---|
| "T1–T3 do nothing flashy; T6+ look for the turn" | gameplan §5 | Turn 8+ in practice. The setup needs too many pieces and the early turns produce no pressure. |
| "Commander damage is backup only" | gameplan §3D | It's the one road that needs no big turn. At 10–12 power with Rogue's Passage it's a two-swing kill on one player; *Blackblade gives +1/+1 per land you CONTROL — ~+8 on turn 8, not +33 (correction logged 2026-08-21).* |
| "The pinger package is a different deck — slow chip clock, dies to one wipe; we want one big turn" | considered-and-cut | The *grounds* hold for 2/2 bodies; the *conclusion* is what the pilot is describing as the problem. Chip is what makes turns 4–7 do something. |
| "Mana is the engine; more is better" | implicit in 54 mana slots | The bottleneck is conversion, not mana. |

**Self-hit facts that govern every creature below** (verified oracle):

- Fiery Confluence — *"Choose three. You may choose the same mode more than once. • 1 damage to each
  creature • 2 damage to each opponent • Destroy target artifact."* The creature mode is **one of
  three modes you choose**; taking "2 to each opponent" three times kills nothing of yours. It only
  kills your pingers when you choose to.
- Chandra's Ignition — *"Target creature you control deals damage equal to its power to each other
  creature and each opponent."* **Not optional.** Every creature pinger dies on the Ignition turn —
  after its cast-trigger has already resolved (the trigger is on cast; Ignition's damage is on
  resolution). Enchantment converters survive.
- Fiery Emancipation triples damage to your own permanents too.

---

## 2. Candidates — per-spell damage permanents ("pingers")

Costs are what you pay with the stated reducers out. "EDHREC" is the Wanda page (inclusion %,
synergy); "sample" is of 10 Wanda decks. ★ = my rating for *this* deck.

| Card | Cost → here | What it does | Body / survives Confluence ×3? | EDHREC · sample | ★ | Notes |
|---|---|---|---|---|---|---|
| **Guttersnipe** | {2}{R} → **{R}** (medallions) | **2 to each opponent per instant/sorcery** | 2/2 · no | **51% +0.36 · 5/10** | ★★★ | Highest field signal of anything here; same rate as Fiery Inscription on a body. Hard-cut on 2026-07-30 for "pinger package" grounds — overturned by the report. |
| **Nico Minoru, Runaway** | {3}{R} → **{1}{R}** | **2 to each opponent whenever you cast a spell from anywhere other than your hand**; {2}{R},T, discard: exile top until nonland, cast it free | 2/4 · **yes** | not on page · 0/10 | ★★★ | 14 enablers already in the deck: Wiccan (every noncreature spell), Commune, Ignite (+flashback), Tinkering, Hex Magic, Cait Sith, Jeska's Will, Mother Lode, Past in Flames, Will of the Jeskai, Increasing Vengeance FB, Mizzix's Mastery, Arcane Bombardment, Thor's ETB. Marvel witch (Runaways). $17.89 💰. Her free-cast forces X=0 — never aim it at an X-spell (107.3b). |
| **Electrostatic Field** | {1}{R} → **{R}** | 1 to each opponent per I-S | 0/4 defender · **yes** | 13% +0.07 · 0/10 | ★★ | The resilient half-rate pinger. Ignition kills it at Wanda power ≥4. |
| **Passionate Archaeologist** | {1}{R} → **{R}** | Wanda gains "whenever you cast a spell from exile, damage = its MV to target opponent" | enchantment · n/a | not on page · 0/10 | ★★ | Thor-for-exile-casts at 2 mana; same 14 enablers minus the graveyard ones. Single target per trigger, but 4–7 a pop. Needs Wanda on the battlefield. |
| Thermo-Alchemist | {1}{R} → {R} | T: 1 each opponent; untaps on I-S | 0/3 · no | not on page · 0/10 | ★★ | ≈ 1 each per I-S plus 1–2 per turn cycle. |
| Kessig Flamebreather | {1}{R} → {R} | 1 each opponent per **noncreature** spell | 1/3 · no | 9% +0.02 · 0/10 | ★★ | Broader trigger (rocks, equipment) than the I-S pingers. |
| Coruscation Mage | {1}{R} (+{2} offspring) → {R} / {1}{R}{R} | 1 each per noncreature; offspring makes a second 1/1 copy | 2/2 + 1/1 · no | 26% +0.20 · 3/10 | ★★ | Two pingers for 3 mana after reducers. |
| Firebrand Archer | {1}{R} → {R} | 1 each per noncreature | 2/1 · no | 21% +0.13 · 2/10 | ★½ | Kessig with 1 toughness. |
| Thunderdrum Soloist | {1}{R} → {R} | 1 each per I-S; **3** if 5+ mana was *spent* | 1/3 reach · no | 11% +0.09 · 0/10 | ★½ | Wanda's discount turns the 3 off (Manaform Hellkite / Molten-Core Maestro pattern). |
| Lambholt Raconteur | {3}{R} → {1}{R} | 1 each per noncreature; 2 at night | 2/4 · yes | not on page | ★½ | Day/night bookkeeping. |
| Unruly Catapult | {2}{R} → {R} | T: 1 each opp; untaps on I-S | 0/4 · yes | not on page | ★½ | Thermo-Alchemist that survives Confluence, one more mana. |
| Mysidian Elder | {2}{R} → {R} | ETB: a 0/1 Wizard token with "1 each opponent per noncreature" | 1/3 + 0/1 · token no | not on page | ★ | Two bodies; token dies to anything. |
| Caldera Pyremaw | {3}{R}{R} → {1}{R}{R} | per I-S: +1/+1 counter, then damage = power to **target opponent** | 3/3 flier, grows · yes | not on page | ★★ | One-player killer that scales (4+5+6+7+8 on a five-spell turn = 30 to one opponent). |
| Aria of Flame | {2}{R} → {R} | each opponent gains 10; then per I-S: verse counter, damage = counters to target player/PW | enchantment | not on page | ★½ | Nth spell deals N, single target. The 30 life is real early; the curve catches up after ~5 spells. |
| Sentinel Tower | {4} → {2} (Longshot + Artist) | per I-S cast on your turn (anyone's): damage to any target = 1 + I-S cast before it this turn | artifact | not on page | ★½ | 1+2+3+4+5 on a five-spell turn, any targets; resets each turn. Colourless, survives sweeps. |
| Geistflame Reservoir | {2}{R} → {R} | charge counter per I-S; {1}{R},T, remove X: X damage to any target; {1}{R},T: impulse | artifact | not on page | ★ | A battery, not a pinger — damage only when cashed, one target. |
| Captain Ripley Vance | {2}{R} → {R} | third spell each turn: +1/+1 counter, damage = power to any target | 3/2 · no | not on page | ★ | Once per turn. |
| **Enraged Flamecaster** | {2}{R} → **{R}** | **2 to each opponent per spell with MV 4+** | 3/2 reach · no | not on base page · **11% in Burn** · 0/10 | ★★ | Surfaced by the theme lens. MV 4+ is exactly Wanda's discounted class (24 instants/sorceries plus Thor, Neheb, Kazuul, Wiccan, Longshot, Goggles, Gauntlet, The One Ring…). Guttersnipe's rate, narrower trigger, $0.15. Dies to Ignition. |
| Angry Rabble | {1}{R} → {R} | 1 each opponent per spell MV 4+ | 2/2 · no | not on page | ★ | Weak rate — Flamecaster is the same trigger at twice the damage for one more mana. |
| Rockslide Sorcerer · Kindlespark Duo · Blisterspit Gremlin · Sawblade Scamp · Syr Carah · Keeper of Secrets · Cinder Pyromancer · Burning Vengeance | | single-target, once-a-turn, tap-gated, 6-mana, or graveyard-only triggers | | | — | Checked; beaten by the rows above. Syr Carah is draw-from-damage, not a pinger. |

**Excluded by the pilot's rule:** Reckless Fireweaver, Molten Psyche (metalcraft), Lux Artillery,
Embersmith, Death to Our Enemies (it's a Treasure engine). **Illegal:** Firemind's Foresight
(CI:RU). **Wrong trigger:** Gleeful Arsonist, Scab-Clan Berserker, Magebane Lizard, Weaver of
Lightning, Mindsparker (all key on *opponents'* spells — and Magebane hits you too).

## 3. Candidates — additive boosters (+N to every damage instance)

These are **additive**, not multipliers: they stack with Fiery Emancipation (the opponent orders
replacement effects, CR 616.1; their best order gives us 3d+N instead of 3(d+N) — still +N per
instance), and they compound with the *number of instances*, which is exactly what pingers create.
One multiplier is right (LEDGER 2026-08-04); boosters are a different shape.

| Card | Cost → here | Effect | Form | EDHREC · sample | ★ | Notes |
|---|---|---|---|---|---|---|
| **Fated Firepower** | {X}{R}{R}{R} → **X=4 for {R}{R}{R}** (all four reducers; X=2 with two) | **+X to every damage instance to an opponent or a permanent an opponent controls**, X = fire counters | **enchantment, flash** | not on page · 0/10 | ★★★ | The scaler. At X=5 every Longshot/Inscription/Guttersnipe trigger is 7 each; Confluence is 3×(2+5)=21 each for {R}{R}; Confluence's creature mode is 6 to *their* creatures and 1 to yours. Flash → end of an opponent's turn. $4.39. The 2026-08-04 note ("you'd rather spend that X on Crackle") was written for a deck with two converters; with five to eight it inverts. |
| **Spiked Corridor // Torture Pit** | Torture Pit {3}{R} → **{R}** (four reducers) / {1}{R} | +2 to every **noncombat** damage instance to an opponent | enchantment (Room) | not on page · 0/10 | ★★½ | Torbran as a one-mana enchantment; players only, not their permanents. Spiked Corridor half (3 Devils) is irrelevant here. $5.62. |
| Torbran, Thane of Red Fell | {1}{R}{R}{R} → {R}{R}{R} | +2 to red sources vs opponents **and their permanents** | 2/4 · yes | 6% −0.16 · 0/10 | ★★ | Covers Confluence's creature mode (one-sided wipe) where Pit doesn't; but it's a creature, and Ignition kills it at power ≥4. Robots are colourless, so it doesn't touch Iron Man's tokens. |
| Hawkeye, Young Avenger | {3}{R} → {1}{R} | noncombat damage to opponents/their permanents +X, X = Hawkeye's power (2; 3 under Gauntlet) | 2/4 reach · yes | 6% +0.02 · 0/10 | ★★ | Marvel (Young Avengers, with Wiccan). Scales with anthems. |
| Thor, Asgard's Avenger | {2}{R}{R} → {R}{R} | **any** other source +1 vs opponents/their permanents | 4/4 flier · yes | not on page | ★½ | Marvel. +1 is half a Torbran but it also boosts colourless sources (Robots, Sentinel Tower). |
| Mechanized Warfare | {1}{R}{R} → {R}{R} | red or artifact sources +1 vs opponents/their permanents | enchantment | not on page | ★½ | Robots are artifact sources. |
| Pyromancer's Gauntlet | {5} → {3} | red I-S and red PWs +2 | artifact | not on page | ★ | Spells only; Torture Pit at {R} covers more. |
| Embermaw Hellion | {3}{R}{R} → {1}{R}{R} | other red sources +1 to **any** permanent or player | 4/5 · yes | not on page | ★ | Symmetric to your own permanents. |
| Jaya, Venerated Firemage · Sulfuric Vapors · The Flame of Keld | | PW / symmetric / one-turn | | | — | Beaten above. |

## 4. Candidates — damage spells (raise the 6-of-35 ratio)

Cheap each-opponent burn also **triggers every pinger**, so the real number is "3 + one hit from
every converter on the board."

| Card | Cost → here | Effect | EDHREC · sample | ★ | Notes |
|---|---|---|---|---|---|
| **Boltwave** | {R} (nothing to reduce) | **3 to each opponent** | not on page · 0/10 | ★★½ | One mana, sorcery. With Longshot + Inscription + Guttersnipe out it's 9 to each opponent. The like-for-like swap for a ritual. |
| Sizzle / Dragon's Approach | {2}{R} → {R} | 3 to each opponent (Approach also mills 3 — fuel for Past in Flames) | not on page | ★★ | Same as Boltwave once two reducers are out. |
| **Khorvath's Fury** | {4}{R} MV5 → **{R}** at R≥4 | friend/foe: friends discard hand and draw that many **+1**; foes take damage = cards in hand | 9% +0.08 · 0/10 | ★★½ | Name yourself friend = a one-mana refill; opponents take their hand size (4–7 mid-game). Wanda discounts it. $2.46. |
| Delayed Blast Fireball | {1}{R}{R} → {R}{R} | 2 to each opponent and their creatures; **5 if cast from exile** | not on page | ★★ | The deck casts from exile constantly (Wiccan, Commune, Ignite, Tinkering, Hex Magic, Cait Sith, Jeska's). $16.15 💰. Previously rejected as overlapping Confluence — with more converters, a second "5 each + one-sided sweep" is density, not overlap. |
| Snort | {3}{R} MV4 → {R} · FB {5}{R} → {1}{R} | each player *may* wheel to 5; 5 to each opponent who did | 35% +0.32 · 3/10 | ★½ | Opponents choose; good against empty hands. |
| Impending Flux | {2}{R} → {R} | X to each opponent and their creatures, X = 1 + non-hand casts this turn | not on page | ★½ | Pairs with the same exile-cast chains as Nico. |
| Ruinous Rampage | {1}{R}{R} → {R}{R} | 3 each opponent, **or** exile all artifacts MV ≤3 (symmetric) | not on page | ★½ | |
| Grab the Prize | {1}{R} → {R} | discard, draw 2; 2 each opponent if nonland discarded | not on page | ★ | |
| Explosive Welcome | {7}{R} MV8 → {2}{R} at R=5 | 5 + 3 to two targets, add {R}{R}{R} | 30% +0.30 · 4/10 | ★½ | Net-free 8 damage, but two targets. |
| Lindblum, Industrial Regency // Mage Siege | land (enters tapped, {R}) // {2}{R} instant: a 0/1 Wizard "1 each opponent per noncreature spell" | | 14% +0.10 | ★ | A land that's also a pinger, but it isn't a Mountain (no Valakut/Gauntlet) and the token is 0/1. |
| Farideh's Fireball · Incendiary Command · Ultimate Magic: Meteor · Mega Flare · Shellshock · Spiteful Repossession · Fateful Tempest | | creature-only, d20, kills Wanda, or conditional on lands/votes | | — | Checked; no. |

## 5. Damage engines that aren't pingers (noted, not proposed)

- **Chandra, Hope's Beacon** ({4}{R}{R} → {2}{R}{R}; 11% +0.08) — *"Whenever you cast an instant or
  sorcery spell, copy it … once each turn"* plus +2 mana / impulse 5 / −X to two targets. A free
  Crackle copy every turn. Strongest single upgrade found, but it's a **copy engine**, not a
  pinger, and a planeswalker eats attacks. Hold for a copy-role pass.
- **Chandra, Flame's Catalyst** ({4}{R}{R} → {2}{R}{R}) — +1: **3 to each opponent every turn**;
  −2: recast a red instant/sorcery from the graveyard. A real clock (9 each under Emancipation) on
  a walker.
- **Chandra, Torch of Defiance** (7% −0.04) — +1: 2 to each opponent *or* cast the exiled card; +1:
  {R}{R}; −7 emblem 5 per spell.
- **Sword of Wealth and Power** ({3}, equip {2}, $21.43; 7% +0.04 on the page, 6% Storm, 2/11
  samples — all equipment-voltron lists) — asked about by the pilot 2026-08-21. *"+2/+2 and
  protection from instants and from sorceries; whenever it deals combat damage to a player, create
  a Treasure, and copy the next instant or sorcery you cast this turn."* **Fails §1.3 as built:**
  protection stops *our own* targeting too (CR 702.16b) — Chandra's Ignition, Blazing Shoal and
  Monstrous Rage can no longer target Wanda while it's on (the Whispersilk Cloak failure, narrower).
  Ability-sourced pumps (Livaan, Cait Sith, Equipment) still work; it can be moved to another
  creature for {2} at sorcery speed before an Ignition, which is friction on the one turn it
  matters. Defensively it's a subset of Commander's Plate (pro-W/U/B/G covers their instants,
  sorceries *and* creature abilities, and makes her unblockable by those colours) plus Champion's
  Helm (hexproof, no self-blank); its only unique cover is red/colourless instants and sorceries,
  and it prevents Blasphemous Act's damage to her. **Where it's good:** the voltron road — swing
  through Passage with Blackblade on → commander damage + a Treasure + Neheb mana from the life
  lost + a copied postcombat Crackle with X intact. Five pieces, which is the disease this pass
  treats. Revisit only if the voltron road becomes the plan; then it's the third Equipment behind
  Plate and Blackblade, never a Helm replacement, with the Ignition cost stated.

## 6. EDHREC theme lens — what the Burn sub-field says

The base page averages 1,721 decks across every plan. Wanda's page carries a **Burn** theme
(64 decks) — the sub-field that already made this pass's move — plus Spellslinger (142), X Spells
(37) and Storm (50). Every candidate and every cut was re-checked against all four
(`--theme <slug> --all --json`, 2026-08-21). Inclusion % · synergy:

| Card | Base (1,721) | **Burn (64)** | Spellslinger (142) | X-Spells (37) | Storm (50) |
|---|---|---|---|---|---|
| Guttersnipe | 51 · +0.36 | **53 · +0.39** | 52 · +0.38 | 41 · +0.26 | 38 · +0.23 |
| Coruscation Mage | 26 · +0.20 | **31 · +0.25** | 23 · +0.16 | 11 · +0.05 | 20 · +0.14 |
| Firebrand Archer | 21 · +0.13 | 25 · +0.16 | 18 · +0.09 | — | 18 · +0.09 |
| Electrostatic Field | 13 · +0.07 | **22 · +0.16** | 15 · +0.10 | 11 · +0.05 | 18 · +0.12 |
| Kessig Flamebreather | 9 · +0.02 | 17 · +0.10 | 10 · +0.03 | — | 10 · +0.03 |
| Thunderdrum Soloist | 11 · +0.09 | 16 · +0.14 | 11 · +0.09 | 5 · +0.03 | 10 · +0.08 |
| Enraged Flamecaster | — | 11 · +0.11 | — | — | — |
| Torbran | 6 · −0.16 | 13 · −0.10 | 6 · −0.17 | 5 · −0.17 | — |
| Solphim | 11 · −0.03 | 16 · +0.02 | 11 · −0.03 | 8 · −0.06 | — |
| Fiery Emancipation *(in deck)* | 10 · −0.06 | 14 · −0.02 | 7 · −0.09 | 8 · −0.08 | — |
| Fated Firepower · Nico Minoru · Torture Pit · Passionate Archaeologist · Aria of Flame · Sentinel Tower · Boltwave · Sizzle · Thermo-Alchemist · Mechanized Warfare · Hawkeye · Thor, Asgard's Avenger | **0% on every view** | | | | |
| Khorvath's Fury | 9 · +0.08 | 9 · +0.09 | 12 · +0.11 | 19 · +0.18 | 20 · +0.19 |
| Snort | 35 · +0.32 | 33 · +0.30 | 37 · +0.34 | 41 · +0.38 | 56 · +0.53 |
| Explosive Welcome | 30 · +0.30 | 25 · +0.25 | 32 · +0.32 | 41 · +0.40 | 28 · +0.28 |
| **Cuts:** Desperate Ritual | 27 · +0.15 | **17 · +0.05** | 23 · +0.10 | 30 · +0.17 | 40 · +0.28 |
| Pyretic Ritual | 40 · +0.26 | 41 · +0.26 | 36 · +0.21 | 35 · +0.21 | 52 · +0.37 |
| Birgi | 48 · +0.36 | 42 · +0.30 | 45 · +0.33 | 54 · +0.42 | 66 · +0.54 |
| The Vision and Scarlet Witch | 44 · +0.40 | 43 · +0.39 | 46 · +0.43 | 46 · +0.42 | 47 · +0.43 |
| Blazing Shoal | 13 · +0.13 | 19 · +0.18 | 20 · +0.19 | 27 · +0.26 | 24 · +0.23 |
| Gauntlet of Power | — | — | — | — | — |
| Gamble | 21 · −0.01 | 17 · −0.04 | 21 · −0.00 | 30 · +0.08 | 40 · +0.18 |
| **Keeps the lens confirms:** Electrodominance | 48 · +0.43 | **55 · +0.49** | 47 · +0.42 | 51 · +0.46 | 32 · +0.27 |
| Longshot | 36 · +0.31 | **47 · +0.42** | 37 · +0.32 | 24 · +0.20 | 32 · +0.28 |
| Fiery Inscription | 30 · +0.24 | **41 · +0.35** | 34 · +0.28 | 41 · +0.34 | 36 · +0.30 |
| Thor, God of Thunder | 35 · +0.32 | 44 · +0.41 | 40 · +0.37 | 30 · +0.27 | 30 · +0.27 |
| Rogue's Passage | 18 · −0.06 | 17 · −0.07 | 15 · −0.09 | 16 · −0.08 | 8 · −0.16 |

**What the lens changes, honestly:**

- **It confirms the direction.** Burn-theme Wanda lists run the converters harder than the average
  list — Longshot 47%, Inscription 41%, Thor 44%, Electrodominance 55% — and Guttersnipe is their
  most-played card the deck lacks (53%). The field's Burn shape is **two or three cheap creature
  pingers** (Guttersnipe, Coruscation Mage, Firebrand Archer, Electrostatic Field), not boosters
  (Torbran 13%, Solphim 16%).
- **It sharpens two cuts.** Desperate Ritual is the weakest ritual in Burn (17% vs Pyretic 41%,
  Seething Song 45%) — the right one to give Gamble's slot. Birgi (42%) and the Vision (43%) are a
  coin-flip on field signal, so the #4 cut is a flavour call, as stated.
- **It moves Electrostatic Field up** (22% in Burn, 0/4 body that survives Confluence) and adds
  **Enraged Flamecaster** (11%) to the candidate list; both are field-backed alternatives if the
  pilot would rather follow the sub-field than this deck's own math.
- **It does not rescue the merit picks.** Fated Firepower, Nico Minoru, Torture Pit, Passionate
  Archaeologist, Boltwave and Sizzle are **0% on every view, including Burn**. Part of that is lag
  (Firepower is TLA 2025, Nico is MSC 2025, Boltwave is FDN 2024); part is that the Burn sub-field
  reaches for single-target burn instead (Lightning Bolt 22%, Banefire 20%, Comet Storm 41%,
  Fireball 16%) — which is the weaker shape at a three-opponent table. Read them as **personal
  tech, judged on merit** (deck-brain §2.2), not consensus. If that matters more than the math,
  the field-backed version of slot #4 is Electrostatic Field and of slot #3 is nothing — the
  sub-field simply doesn't run each-opponent one-mana burn.
- **New names from the Burn page worth knowing, outside this pass's ask** (verified oracle):
  **Thor, Guardian of Midgard** ({3}{R}{R} → {1}{R}{R}, 5/5 flier, 5%) — *"whenever a source you
  control deals noncombat damage to an opponent, you may exile that many cards from the top … play
  them this turn"*: with Longshot out, one spell is three triggers × 2 = six impulse cards — the
  payoff for the pinger shape, Marvel, and the natural follow-on once converters are seated.
  **Runechanter's Pike** ({2}, equip {2}, 23% Burn / 67% Big Mana) — +X/+0 and first strike, X =
  instants/sorceries in your graveyard: a *permanent* pump (= discount) that scales with the yard
  the deck fills, and a voltron piece for the Passage road; the better Blazing Shoal if the pump
  role wants a replacement later. **Path of the Pyromancer** ({4}{R}, MV 5 → {R}; 30% Burn, 60%
  Storm) — discard your hand, add {R} per card, draw that many plus one: a self-only wheel that
  pays you mana; a draw-role question for another day. **Spider-Punk** ({1}{R} 2/1, 17%) — spells
  can't be countered and damage can't be prevented; the Hexing Squelcher shape with an anti-fog
  clause. **Tavern Brawler** (25%) was already Tier 1 in `rival-lists-2026-08-09.md`.

## 7. Proposed package — Bracket 3

The slots come out of the roles that are over their own targets or duplicated — one engine, one
one-turn pump, the weakest copier, and the over-target tenth win condition — not out of damage
and not out of the rituals (see #3). Mana role 21 → 20, Win Conditions 10 → 9, Copy 5 → 4, Pump
4 → 3; Conversion 5 → 7 (8 with #6), damage spells 6 → 7.

| # | Out | In | Role move | Why |
|---|---|---|---|---|
| 1 | **Ancient Tomb** → a Mountain | — | land → land | Keeps Game Changers at 3/3 once Gamble is in. Mountains 21 → 22 (Valakut, Gauntlet, Blackblade all tick up); a Mountain under Gauntlet *is* an Ancient Tomb in red, banking, without the 2 life. Cost: the Tomb-into-turn-2-Wanda opener (~8% of games). |
| 2 | **Iron Man, Tony Stark** (not on any EDHREC view, 0/10) — *alt: Cait Sith (17% / 28% Burn) or Tablet of Discovery (52%)* | **Gamble** (GC; 21%) | wincon 10→9 → selection | Finds the missing converter or the payoff on turn 2. Cast it while the hand is full — with N cards in hand after the search it's 1/N to bin the target; a binned instant/sorcery comes back via Past in Flames / Will / Thor / Volcanic Vision. Iron Man is the role-consistent cut: Win Conditions is the one role over its own target (10 vs 8), it was seated 2026-08-07 as *insurance against not finding the X-spell kill* — the job Gamble plus two more converters now does directly — and its 2/1 Robots die to Confluence's creature mode and to Ignition (the Young Pyromancer grounds). Flavour is a legitimate reason to keep it; then Cait Sith (per-turn impulse + combat-timed pump) or Tablet are the next-lowest-impact slots. |
| 3 | **Increasing Vengeance** (14%, 3/10) — *alt: Ignite the Future (59%)* | **Boltwave** | copy → damage spell | A {R} red sorcery either way. Boltwave is 3 to each opponent on turn 2, 9+ once converters are out, and it copies (Goggles / Reverberation) exactly the way the pilot already copies rituals. Vengeance is the fifth-best of five Crackle-copiers (Goggles free, Reverberation two copies for the same {R}{R}, Storm King's Thunder X copies, Return the Favor) and copies aren't *cast*, so it never triggers a pinger. **Rituals stay** — corrected 2026-08-21: under Electro/Ashling every red mana banks across turns, so a turn-4 ritual is a deposit, and the pilot reports copying them for +10 banked regularly. |
| 4 | **Birgi, God of Storytelling** (48% / 42% Burn, 2/10; $31 proxy) | **Fated Firepower** | engine → booster | Birgi's mana vanishes at end of turn and only exists on the big turn; the deck keeps Electro (banks), Ashling (banks + pings), Urabrask (pings), Neheb (converts chip → mana postcombat, *better* with pingers), Storm-Kiln (Treasures persist). Firepower makes every ping 2+X, flashes in at end of an opponent's turn, survives creature removal. **0% on every EDHREC view — a merit pick.** *Field-backed alternative in this slot: **Electrostatic Field** (22% Burn; 0/4 survives Confluence; half Guttersnipe's rate).* **Alternative cut: The Vision and Scarlet Witch** (44% / 43% Burn, 2/10; $34; same "mana vanishes at end of phase" shape) — flavour call, yours. |
| 5 | **Blazing Shoal** (13% / 19% Burn, 3/10) | **Guttersnipe** | one-turn pump → converter | Shoal costs two cards for one bigger X-spell — the exact axis this pass stops leaning on. Guttersnipe is the field's answer (51% base, **53% Burn**, 5/10): Fiery Inscription on a body. Dies on the Ignition turn after it has triggered; don't choose Confluence's creature mode while it's out. |
| 6 *(optional)* | **Gauntlet of Power** (0/10, not on page) *or* **The Vision and Scarlet Witch** | **Nico Minoru, Runaway** | mana → converter | 2 to each opponent per non-hand cast, 14 enablers already in the list, a 2/4 that survives Confluence, and a Marvel witch. Gauntlet's case for staying: +1/+1 to red creatures keeps Guttersnipe/Electrostatic Field alive through Confluence and makes Wanda 3/4. $17.89 💰. |

**After the core five (1–5):** conversion layer 5 → **7** (+ Gamble to find them), damage
instants/sorceries 6 → 7, Game Changers 3/3, lands 33, total 100. P(a converter in the first 12
cards) 48% → **61%**. With #6: 8 converters, **66%**.

**Go-further tier** (if five feels too small after a few games — these are the next adds, in
order, with the next mana cuts): Electrostatic Field (22% Burn), Enraged Flamecaster (11% Burn),
Torture Pit, Khorvath's Fury, Delayed Blast Fireball, Passionate Archaeologist, and — once three
or more converters are seated — Thor, Guardian of Midgard as the payoff ← for Gauntlet of Power,
The Vision and Scarlet Witch, Cait Sith, Tablet of Discovery. Nine converters = 70% by turn 5. **Keep Mana Geyser (84%, 10/10),
Seething Song (60%, 6/10), Storm-Kiln (73%, 5/10), Brass's Bounty (58%)** — field staples whose
grounds still hold.

**Rejected for the package, with grounds:** Torbran (creature version of Torture Pit; Ignition
kills it; −0.16 synergy); Hawkeye / Thor Asgard's Avenger (flavour-positive, but +2/+1 on a body
loses to +X on an enchantment); Aria of Flame (30 life to the table up front); Sentinel Tower /
Caldera Pyremaw (single-target); Coruscation Mage (1-rate, 2 bodies — fine, Guttersnipe first);
Chandra walkers (different role, attack magnets); Electrodominance as a cut (it's one of the six
damage spells — the wrong role to take from). Iron Man was flagged 2026-08-21 (Robots die to
Confluence's creature mode and Ignition — the Young Pyromancer grounds) and left in on flavour.

**Not touched:** `DECK-B4.md` — it already runs Gamble, has no Game Changer cap, and is built to be
dead or victorious by turn 5, which is a different structure; revisit it separately.

## 8. Gameplan re-sequence (to write into `gameplan.md` if the package lands)

- **Turns 1–3:** land, rock, **Wanda on 3**. Unchanged.
- **Turns 3–5: a converter before a mana engine.** Priority order flips to *Longshot / Inscription /
  Guttersnipe / Firepower / Thor* → *then* Electro / Ashling / Urabrask → then draw. Every spell
  after the first converter deals 2–9 to each opponent; after two, 4–18.
- **Turns 4–7 are not setup turns any more.** Cast your draw spells — each is now damage — and hold
  only Deflecting Swat and Mithril Coat. Fated Firepower goes in at the end of an opponent's turn.
- **Rituals are deposits, not kill-turn cards, once Electro or Ashling is out** — cast and copy
  them early, bank the red, and spend it on the turn the converters are down.
- **Neheb is better, not worse:** chip precombat, collect {R} per life lost postcombat, cast the
  closer there.
- **Blackblade on Wanda by turn 5 when drawn**, and swing through Rogue's Passage when a player is
  within two hits (21 commander damage). A one-player road, not a table kill.
- **The X-spell is the closer, not the plan.** With three converters and a booster out, a
  three-spell turn is lethal without it; Crackle is for the turn you have it and the mana.
- **Confluence:** with creature pingers out, take "2 to each opponent" three times. The creature
  mode is for boards you need gone.

## 9. Applied 2026-08-21 — as `DECK-V2.md`, side by side with V1

The pilot approved the package but asked for a **second version rather than an edit**, to test
both lists without tracking swaps by memory (the Iron Man V2 precedent). Final calls: Iron Man
out for Gamble (pilot), Cait Sith out for Nico Minoru (pilot's suggestion), Increasing Vengeance
out for Boltwave, Birgi out for Fated Firepower, Blazing Shoal out for Guttersnipe, Ancient Tomb
→ Mountain. **Rituals stay** (see §7 #3).

- `DECK-V2.md` written; `DECK.md`, `STATUS.md`, `SIDEBOARD.md` untouched as the V1 mirror (STATUS
  and SIDEBOARD carry a dated V2 pointer block only).
- `decisions.md` 2026-08-21 entry carries the grounds, the pilot overrides, and the Blackblade
  correction. `gameplan.md` §14 "Playing V2" carries the pilot notes from §8 above.
- Validated: `bun run card --deck decks/scarlet-witch/DECK-V2.md --id r` — 100 cards, all
  commander-legal, all mono-red, Game Changers 3/3 (Jeska's Will, The One Ring, Gamble).
- Moxfield export with the pilot's preferred printings: `research/v2-moxfield-2026-08-21.txt`.
- No PDF change: `deck:pdf` renders `DECK.md` (V1), which is unchanged.
- **If V2 is promoted:** `cp DECK.md versions/<date>-v1-before-v2-promotion.md`, fold V2 into
  `DECK.md` + `STATUS.md`, move the six cuts into `SIDEBOARD.md` with "Displaces" pointers,
  retire Cait Sith's gameplan lines, and rebuild the PDF.
- **Later the same day:** Runechanter's Pike went into both lists (for Blazing Shoal in V1, for
  Tablet of Discovery in V2) — grounds in `decisions.md` 2026-08-21 part 2. Path of the
  Pyromancer was tried for Reforge the Soul and **reverted the same day** (part 3): the pilot keeps
  Reforge as hand denial, and a symmetric wheel's discard half is disruption this pass had scored
  only as a cost. The V1↔V2 swap is: out Ancient Tomb, Iron Man, Increasing Vengeance, Birgi, Cait
  Sith, Tablet; in Mountain, Gamble, Boltwave, Fated Firepower, Guttersnipe, Nico Minoru.
