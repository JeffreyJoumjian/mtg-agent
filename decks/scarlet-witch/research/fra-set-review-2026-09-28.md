# FRA + FRC set review — Scarlet Witch — 2026-09-28

**Sets:** Reality Fracture (FRA) and Reality Fracture Commander (FRC), both release 2026-10-02.
**Lists evaluated:** all three `"kind": "deck"` lists in `deck.json` — `main` (Bracket 3, the grind /
conversion list promoted from V2), `b4` (Bracket 4 chain), `v3` (Bracket 3 chain).

**Method:** deck-brain SKILL.md. Every card read from the pool's verified Scryfall oracle text (§1.1),
both halves of prepare cards; costed in *this* deck's mana under the generic-only reduction rule
(§1.2) — Ruby Medallion and The Fire Crystal (*red spells*), Longshot and Artist's Talent L2
(*noncreature spells*), The Scarlet Witch (*instants and sorceries MV 4+*, by her power); checked
against the deck's own board and triggers (§1.3); compared only within a role, with a full role table
before any cut (§2.1); deciding axis named (§2.3). Every prior verdict re-derived from its recorded
grounds (§1.1b). The LEDGER was grepped for each candidate, its mechanic and the slug; rules checked in
`rules/sections/` (CR 2026-08-07). Per the batch-guard correction (LEDGER 2026-08-10), the effects of
every non-NO candidate were grepped against the current lists before any verdict was written (Artist's
Talent L3 is the list's existing additive booster; Past in Flames / Will of the Jeskai / Mizzix's
Mastery / Thor are its existing graveyard recasts).

**Field lens:** unavailable — EDHREC has no FRA/FRC data before release (§2.2: say so and skip).
Price is not an axis (everything proxied, §0.1). This is a candidate-surfacing pass — **no deck file was
edited**; every swap below waits for the pilot.

**Pool:** 72 cards fit mono-red {R} identity and are commander-legal (`data/fra-candidates-scarlet-witch.json`
54 + `data/frc-candidates-scarlet-witch.json` 18): **53 new, 19 reprints** (Scryfall `is:reprint`). No
Game Changers in either set.

**Result:**

| List | MAIN | SIDE | NO | already in list |
|---|---|---|---|---|
| main (B3) | 1 | 3 | 66 | 2 |
| b4 (B4) | 0 | 0 | 70 | 2 |
| v3 (B3) | 0 | 2 | 67 | 3 |

> **List status note.** The project memory still calls the Bracket 4 list "retired 2026-09-08". That
> is stale: `decisions.md` records it retired *and rebuilt as the chain deck the same day*
> (2026-09-08 part 2), and the pilot has since been playing it in Bracket 4 lobbies (2026-09-16 entry).
> `b4` in `deck.json` is live, so it was evaluated as a live list.

---

## The pilot's named ask — Stingcaster Mage

> *"stingcaster mage → scarlet witch (might be slow for the b4 version but might still be worth it for
> b4 or v3?)"*

**Oracle text** ({1}{R}, 2/1 Human Wizard, haste; Scryfall flags it a reprint): *"When this creature
enters, target instant or sorcery card in your graveyard gains flashback until end of turn. The
flashback cost is equal to its mana cost."*

**What is true about it here (verified):**

- **X survives.** Flashback is an alternative cost that includes the printed {X} (CR 702.34a →
  601.2b/f; LEDGER 2026-08-04), so a flashed-back Crackle, Jaya's or Storm King's Thunder is cast at a
  real X — unlike Mizzix's Mastery or Arcane Bombardment, which force X = 0.
- **Wanda still discounts the recast.** Cost reductions apply to the total cost including an
  alternative cost (CR 601.2f), so a flashed-back MV 4+ instant or sorcery costs its pips.
- **The creature half is the problem.** It is a *creature* spell: Livaan (noncreature), Longshot and
  Artist's Talent (noncreature) and Wanda (instants/sorceries) all ignore it. Only Ruby Medallion and
  The Fire Crystal reduce it → `{R}` with one of them. It fires none of the deck's cast triggers except
  The Vision and Scarlet Witch's.
- The pilot's "slow" worry is the wrong word: at MV 2 it is never slow. It is **conditional** — dead
  until the graveyard holds the right card, and its window is *until end of turn*.

**Per list:**

| List | Verdict | Grounds |
|---|---|---|
| **v3** | **SIDE — displaces Twinferno** | V3 has only **two true recasts** (Past in Flames, Will of the Jeskai's second mode); Bombardment's copies are X = 0. A recast is a *cast*, so Livaan sees the recast X-spell's full mana value — which a copy (Twinferno, Increasing Vengeance) never does. On the "chain fell short" turn, Stingcaster (`{R}`) + a flashed-back Jaya's (`{R}{R}`) is a second finisher for three pips. **Why not MAIN:** Past in Flames does the same job for the same one pip (`{3}{R}`, MV 4, Wanda eats the {3}), covers *every* card, and pumps Wanda +4 via Livaan on the way — Stingcaster is its weaker substitute (§2.5: a spare key, worth running only when a slot is free). Twinferno is the named cut because the 2026-09-08 entry called it "the cut that costs nothing structural … the fifth copy effect". |
| **b4** | **NO** | Already three graveyard engines — Underworld Breach, Past in Flames, Will of the Jeskai — plus Increasing Vengeance's flashback and Reiterate's buyback. On B4's turn-3 clock the graveyard holds rituals and draw spells: Stingcaster → Seething Song is the ritual's rate once more for an extra card. The list's documented cleanest cut, Unleash Fury, doubles Wanda for one pip and stacks multiplicatively with Bulk Up — a stronger chain link than a conditional recast. |
| **main** | **NO** | It would be the **seventh** graveyard recast (Past in Flames, Will of the Jeskai, Mizzix's Mastery, Arcane Bombardment, Volcanic Vision, Thor's ETB). Ranked in the copy-and-recur role it is last: every other entry is a noncreature spell that Livaan, Thor, Longshot and the pingers see on cast. Its one edge over Mizzix's Mastery (keeps X) matters for 6 of main's 37 instants/sorceries. |

---

## Set mechanics as they matter to this deck

- **Prepare** (Pompous Battlemage, Pyre Rhymer; Hexhaven Dueling Arena re-prepares). The prepared copy
  is a normal cast of an instant/sorcery at its printed cost (CR 722.3c, LEDGER 2026-08-06) — it fires
  Livaan and the pingers, and Wanda discounts it only at MV 4+. Both prepare spells in this pool are
  MV 1. The copy **leaves exile if the creature leaves** (CR 722.3c), so the body must live.
- **Empower Jace** (No Admittance, Way of the Pyromancer, Way of the Warlord, Violent Echoes, Keeper of
  the Quiet Hour). Creates a **planeswalker token** — "−1: Surveil 1", "−3: Draw a card", loyalty = the
  empowered counters (scratchpad `tokens.md`, verified from TFRA). A slow, attackable cantrip in a deck
  that can't defend it. Repeated Reverberation does copy loyalty abilities, but no Jace card here earns a
  slot for that.
- **Cadet tokens** (Command the Stage, Heartstring Puller, Ajani Unrelenting) — 2/2 colourless Wizard
  Soldiers. They survive one Fiery Confluence creature mode; two, or Chandra's Ignition at power ≥ 2,
  kill them.
- **Noncombat-damage-matters** (Master of Barbs, Command the Stage, Tomik) — the set's quiet theme, and
  the one that meets this deck. `main` hits opponents with noncombat damage every turn it casts a spell
  (Longshot, Inscription, Guttersnipe, Nico, Thor, Urabrask); the chain lists mostly don't until the
  finisher.
- **Artifact-token replacement** (Draconic Visitor) — mandatory, so it eats this deck's Treasures. Trap.
- **Legend rule off** (Hall of Echoes) and **Torpor-style ETB denial** (Karn, Argent Defender) — see Traps.

---

## Classification table — all 72 cards

Verdict key: **MAIN** = would displace a named card in that list's 100 · **SIDE** = bench, with the
card it would displace · **NO** = pass · *in list* = already in that list (reprint).

| # | Name | MV | New? | main (B3) | b4 (B4) | v3 (B3) | Reason |
|---|---|---|---|---|---|---|---|
| 1 | Ajani's Anguish | 1 | NEW | NO | NO | NO | Enchantment, so Wanda never discounts it. As a Livaan link `{X}{R}` gives +(X+1); Lunar Frenzy for the same one pip gives +X on the spell **and** +(X+1), with Wanda eating X. As removal it is X to one target for X+1. |
| 2 | Artifist Acumen | 1 | NEW | NO | NO | NO | `{R}` cantrip, first-strike rider. MV 1: no discount, no power on Wanda — Titan's Strength / Fists of Flame hold the cheap-refuel slot and add power. |
| 3 | Marwyn, the Clearcutter | 1 | NEW | NO | NO | NO | `{2}`, `{T}`, sacrifice an artifact **or land**: draw — eats the lands Blackblade and Valakut count. |
| 4 | Pompous Battlemage // Improvised Act | 1 | NEW | NO | NO | NO | A 1/1 plus a card-neutral rummage; the creature half misses every noncreature trigger. |
| 5 | Blazing Crescendo | 2 | REPRINT | NO | in list | in list | Reprint. Already in V3, and in B4 since 2026-09-16 (restored there as the better one-pip pump than Titan's Strength). Main has no seed package; its 2026-08-02 cut grounds (same +3/+1 as Monstrous Rage for twice the mana) still describe main. |
| 6 | Eardrum Rattler | 2 | NEW | NO | NO | NO | Unblockable for power ≤ 2 only; Rogue's Passage covers Wanda at any power. |
| 7 | Essence Burn | 2 | NEW | NO | NO | NO | Black or green targets only; MV 2, never discounted. |
| 8 | Gallia, the Merrymaker | 2 | NEW | NO | NO | NO | Haste for creatures with +1/+1 counters — blank for a static-discount commander (the Swiftfoot Boots grounds, 2026-08-02). |
| 9 | Master of Barbs | 2 | NEW | **SIDE** | NO | NO | *"Whenever one or more opponents are dealt noncombat damage, creatures you control get +1/+0"* — every converter hit (Longshot, Inscription, Guttersnipe, Nico, Thor, Urabrask) becomes +1 on Wanda, i.e. +1 discount; two converters out is +2 per instant/sorcery. **Main: bench, runner-up for Boltwave's slot.** B4/V3: chain links are pumps and copies, not damage to opponents, so it fires only after the finisher resolves. |
| 10 | No Admittance | 2 | NEW | NO | NO | NO | The Abrade shape (3 damage, MV 2, never discounted — cut 2026-08-06) plus a 1-loyalty Jace token. |
| 11 | Samut, Hazoret's Champion | 2 | NEW | NO | NO | NO | Team haste — blank for a static-discount commander; The Fire Crystal already grants it. |
| 12 | Skilled Battlecarver | 2 | NEW | NO | NO | NO | A 2/1 attacker. |
| 13 | Stingcaster Mage | 2 | REPRINT | NO | NO | **SIDE** | Flashback for one instant/sorcery at its mana cost — X is kept (flashback is an alternative cost, LEDGER 2026-08-04) and Wanda still discounts it — but a **creature** cast misses Livaan, Wanda, Longshot and Artist's Talent. Main: seventh graveyard-recast effect, last in its role. B4: Breach + Past in Flames + Will of the Jeskai already, and a turn-3 graveyard is rituals. **V3: bench over Twinferno** — the third true recast after Past in Flames and Will of the Jeskai. Full answer below. |
| 14 | Tomik, Izzet Sparkmage | 2 | NEW | NO | NO | NO | +1 per damage event to opponents. Main already has two additives (Talent L3 +2, Fated Firepower +X) and a tripler the opponent applies first (CR 616.1): a Longshot hit under Emancipation goes 6 → 7. Chain lists deal exponential damage; +1 is noise (LEDGER: boosters earn slots only where damage is flat). |
| 15 | Way of the Pyromancer | 2 | NEW | NO | NO | NO | A 2-loyalty Jace token that taps for `{R}` via "+1" — a rock that dies to one attacker; ramp is already 13 (main). |
| 16 | Chandra's Emberling | 3 | NEW | NO | NO | NO | Grows itself, not Wanda. |
| 17 | Command the Stage | 3 | NEW | **MAIN** | NO | NO | **Main: displaces Boltwave.** `{R}` after any two reducers; returns to hand at each upkeep after a turn an opponent took noncombat damage (functions from the graveyard, CR 113.6m) — a free instant/sorcery every turn for Livaan (+3), every converter and every per-spell engine, plus a growing 2/2 Wizard wall on the deck's weakest axis (defence). B4/V3: +3 via Livaan for one pip is Titan's Strength's rate; the recursion pays out over turns a turn-3/5 chain doesn't have. |
| 18 | Cursed Mirror | 3 | REPRINT | NO | NO | NO | A `{2}{R}` rock (floor `{R}`); Arcane Signet is free under Longshot + Talent. Rocks already capped. |
| 19 | Fulminous Forte | 3 | NEW | NO | NO | NO | Good modal instant, but MV 3 (no discount) and creature/planeswalker only; main's removal row is 8 with Chaos Warp / Zuko's Exile covering more types; the chain lists spend no pips on single-target removal. |
| 20 | Identity Echo | 3 | NEW | NO | NO | NO | Polymorphs your own creature — would exile Wanda or an engine. |
| 21 | Koth, the Geomancer | 3 | NEW | NO | NO | NO | One ping and one `{R}` per land drop — stops when land drops do; creature, so only Ruby/Crystal reduce it. |
| 22 | Pia, Determined Rebuilder | 3 | NEW | NO | NO | NO | Thopter plus a `{5}{R}` pump — a mana sink competing with the X-spell. |
| 23 | Pyre Rhymer // Molten Tide | 3 | NEW | NO | NO | NO | Molten Tide (`{R}` instant) makes each Mountain tapped afterwards add an extra `{R}` — but it needs the 3-mana Rhymer cast on an earlier turn and still alive (CR 722.3c: the copy leaves exile with it). Seething Song is +4 from one card; B4's turn 3 sees ~3 Mountains. Better in TVS. |
| 24 | Way of the Warlord | 3 | NEW | NO | NO | NO | 5-loyalty Jace token: one draw (−3) or 2 + 2 damage (−4). Slow. |
| 25 | Wrath of the Bloodmane | 3 | NEW | NO | NO | NO | 4 damage to one creature/planeswalker; the removal row has broader answers. |
| 26 | Arni, Renowned Champion | 4 | NEW | NO | NO | NO | Combat body. |
| 27 | Chandra, Torch of Defiance | 4 | REPRINT | **SIDE** | NO | NO | **Main: bench over Arcane Signet.** `{R}{R}` after two reducers; Livaan +4 and Thor 4 on cast; +1 is `{R}{R}` a turn (banks under Electro/Ashling) or a card / 2 to each opponent; Repeated Reverberation copies loyalty abilities. The 2026-08-21 "Chandra walkers" rejection was about copy-role Chandras — its grounds don't describe this one. Costs curve (MV 2 → 4) and draws attacks. B4/V3: `{R}{R}` on a setup turn for red a turn later is too slow. |
| 28 | Curse-Marred Demon | 4 | NEW | NO | NO | NO | Tutor, then **random** discard — cast at 4 mana into a thin hand it often bins the card it found (the Fervent Mastery grounds, LEDGER 2026-08-20). Gamble does the job for `{R}`. |
| 29 | Heartstring Puller | 4 | NEW | NO | NO | NO | 3/1 trample plus a 2/2 token. |
| 30 | Tetsuko Umezawa, Pursuer | 4 | NEW | NO | NO | NO | Combat body. |
| 31 | Violent Echoes | 4 | NEW | NO | NO | NO | `{R}{R}` after Wanda for 6 to one creature; Zuko's Exile's cost is all generic (Wanda eats it) and it exiles three types. |
| 32 | Awaken the Inferno | 5 | NEW | NO | NO | **SIDE** | MV 5 sorcery: 6 to an opponent's creature **and** a permanent +1/+1 counter on Wanda; basic landcycling `{2}`. **V3: bench over Twinferno** — `{R}` at Wanda 3 + Ruby, Livaan +5 plus a permanent +1 seed, and a Mountain early. Needs an opposing creature/planeswalker to be castable (CR 601.2c). Main: removal row at 8. B4: 26 lands, turn-3 clock. |
| 33 | Draconic Visitor | 5 | NEW | NO | NO | NO | **Trap.** Mandatory replacement: every artifact token you'd create becomes a 5/5 Dragon — Big Score, Unexpected Windfall, Storm-Kiln, Brass's Bounty, Inspired Tinkering, Mines of Moria and Urabrask's Saga all stop making mana. |
| 34 | Jiang Yanggu, Alone | 5 | NEW | NO | NO | NO | Attack trigger. |
| 35 | Tether Technician | 5 | NEW | NO | NO | NO | 5-mana 4/5 with a 2-damage ETB. |
| 36 | Winter, Team Player | 5 | NEW | NO | NO | NO | +1/+0 per noncreature spell is a weaker Livaan (+MV) at five mana. |
| 37 | Ajani Unrelenting | 6 | NEW | NO | NO | NO | −3 deals 4 to each non-token creature — kills Wanda and the engines. |
| 38 | Kiora of Fire and Ashes | 6 | NEW | NO | NO | NO | 6-drop for a Dragon; `{8}` sink. |
| 39 | Venser, Fervent Forger | 6 | NEW | NO | NO | NO | 6-mana flash creature; the copy mode needs an opponent's spell. |
| 40 | Craterclaw Colossus | 7 | REPRINT | NO | NO | NO | 7-drop combat finisher. |
| 41 | Face Yourself | 7 | NEW | NO | NO | NO | Copying your own board hits the legend rule (10+ legendary creatures); copying an opponent's is a combat plan. |
| 42 | Akroma, Angel of Fury | 8 | REPRINT | NO | NO | NO | 8-drop creature; Wanda never discounts creatures. |
| 43 | Currency Converter | 1 | REPRINT | NO | NO | NO | Exiling discarded cards starves Runechanter's Pike, Past in Flames and Bombardment; one Treasure or 2/2 a turn. |
| 44 | Eye of Jace | 1 | NEW | NO | NO | NO | Surveil 1 an upkeep, then 2 to each — filler. |
| 45 | Sol Ring | 1 | REPRINT | in list | in list | in list | Reprint — already in all three lists. |
| 46 | Afterthought Sentry | 2 | NEW | NO | NO | NO | 2/2 graveyard-hate body. |
| 47 | Arcane Signet | 2 | REPRINT | in list | NO | in list | Reprint — in main and V3. B4 runs the fast-mana suite (moxen, Mana Vault, Grim Monolith) instead; a turn-2 rock is slower than those. |
| 48 | Fellwar Stone | 2 | REPRINT | NO | NO | NO | May not make `{R}` in mono-red — logged as a build error 2026-08-02. |
| 49 | Karn, Argent Defender | 2 | NEW | NO | NO | NO | **Trap + stax.** *"Artifacts and creatures entering the battlefield don't cause abilities to trigger"* — switches off Mithril Coat's attach (all three lists), Hero's Blade / Coral Sword / Inventor's Axe (B4, V3) and Thor's ETB. Symmetric — flagged for the pilot, not silently excluded. |
| 50 | Living Library | 2 | NEW | NO | NO | NO | 0/4 wall with a `{6}` tuck. |
| 51 | Medic's Kitesail | 2 | NEW | NO | NO | NO | Flying + 1 life; Wanda rarely attacks. |
| 52 | The Echoverse Fulcrum | 2 | NEW | **SIDE** | NO | NO | **Main: bench in Blasphemous Act's row (displaces Volcanic Vision).** `{2}` (free under Longshot + Talent) loots on entry, then `{5}`, exile: destroy all creatures — the unconditional wrath main hasn't had since 2026-08-02. *Destroy*, so Mithril Coat / Tyrite's counter save Wanda; paid with colourless the deck can't bank. B4/V3: no wrath slot in a race. |
| 53 | Chromatic Lantern | 3 | REPRINT | NO | NO | NO | `{3}` rock that only makes `{R}` here. |
| 54 | Keeper of the Quiet Hour | 3 | NEW | NO | NO | NO | 3/2 plus a 2-loyalty Jace token. |
| 55 | Murmuring Volume | 3 | NEW | NO | NO | NO | `{3}` rock with a pay-to-loot. |
| 56 | Traxos, Scourge Eternal | 4 | NEW | NO | NO | NO | Colourless 5/4 that doesn't untap. |
| 57 | Archive Arbiter | 6 | NEW | NO | NO | NO | 6-mana creature; no reducer applies. |
| 58 | Ginger, Queen of Sweets | 6 | NEW | NO | NO | NO | Six real mana for the monarch in a deck that can't defend it. |
| 59 | Omnath, Locus of the Void | 7 | NEW | NO | NO | NO | Banks unspent mana as **colourless** — the Horizon Stone problem (can't pay `{R}` pips); Electro and Ashling keep it red. |
| 60 | Darksteel Angel | 9 | NEW | NO | NO | NO | 9-mana Platinum Angel; stax-flavoured and off-plan. |
| 61 | Emrakul, the Exigent Doom | 10 | REPRINT | NO | NO | NO | 10-mana colourless creature; no reducer applies; its mana is colourless. |
| 62 | Memnarch, the Warden | 10 | NEW | NO | NO | NO | 10-drop. |
| 63 | Command Tower | 0 | REPRINT | NO | NO | NO | In mono-red it's a Mountain that isn't a Mountain (Valakut, Gauntlet of Power, Molten-style effects). |
| 64 | Exotic Orchard | 0 | REPRINT | NO | NO | NO | May not make `{R}` — the Fellwar Stone error. |
| 65 | Fabled Passage | 0 | REPRINT | NO | NO | NO | Tapped Mountain early; no landfall here. A Mountain is better. |
| 66 | Hall of Echoes | 0 | NEW | NO | NO | NO | `{5}`: becomes a copy of your creature for the turn, legend rule off — copying Livaan doubles the chain's pump, but `{5}` on the kill turn is five less X, and it trades a red source for colourless. |
| 67 | Hexhaven Dueling Arena | 0 | NEW | NO | NO | NO | Re-prepares prepare creatures; the lists run none. |
| 68 | Kher Keep | 0 | REPRINT | NO | NO | NO | Colourless; 0/1 Kobolds die to the deck's own Confluence. |
| 69 | Mountain | 0 | REPRINT | NO | NO | NO | A printing choice, not a deck decision. |
| 70 | Path of Ancestry | 0 | REPRINT | NO | NO | NO | Enters tapped; not a Mountain. |
| 71 | Reflecting Pool | 0 | REPRINT | NO | NO | NO | Taps for `{R}` without being a Mountain. |
| 72 | Room of Refuge | 0 | NEW | NO | NO | NO | Enters tapped; `{5}` + a land for two counters — Tyrite Sanctum does the counter job repeatably. |

---

## Proposed swap (MAIN) — `main` only

### Command the Stage in, Boltwave out — `main`

**Oracle text** ({2}{R} sorcery, MV 3, new): *"Create a 2/2 colorless Wizard Soldier creature token named
Cadet, then put a +1/+1 counter on each other Wizard token you control. At the beginning of each upkeep,
if an opponent was dealt noncombat damage last turn, return this card from your graveyard to your hand."*

**Rules (verified).** The return ability moves the card *out of the graveyard*, so it functions from the
graveyard (CR 113.6m). "Last turn" at the upkeep after yours is *your* turn — so any turn on which one of
your converters hit an opponent, it comes back before you next need it. Only you can cast it (sorcery),
so it is at most one cast per turn cycle: a recurring spell, **not a loop**, no bracket flag.

**Cost-out in `main` (§1.2).** Red sorcery, MV 3: Ruby Medallion and The Fire Crystal (*red*) and
Longshot and Artist's Talent L2 (*noncreature*) all apply to its {2}; Wanda does not (MV < 4). **Any two
reducers → `{R}`.** Each cast then fires, from the current list: Livaan +3 on Wanda, Fiery Inscription 2
and Guttersnipe 2 and Longshot 2 to each opponent, Thor 3 to any target, Urabrask 1 + `{R}`, Electro `{R}`,
The Vision and Scarlet Witch `{R}` + a counter, a Storm-Kiln Treasure, Wiccan's impulse, Ashling's and
Artist's Talent L1's loot. With two of the `{R}`-per-spell engines out, casting it is mana-positive.

**Role table — "Damage conversion — pingers, boosters and burn" (current 4) plus the candidate, scored
against the current list:**

| Card | Real cost here | What it gives over a game | Needs (in list now?) | Own-sweeper check |
|---|---|---|---|---|
| Fated Firepower | `{R}{R}{R}` + X | +X to **every** damage instance to opponents | a damage source — 9 in list ✔ | enchantment — safe |
| Guttersnipe | `{R}` with a Medallion | 2 to each opponent per instant/sorcery, every turn | instants/sorceries — 37 ✔ | 2/2: dies to two Confluence modes / Ignition |
| Nico Minoru, Runaway | `{2}{R}`–`{1}{R}` | 2 to each opponent per non-hand cast + a free-cast activation | 14 non-hand enablers ✔ | 2/4: survives Confluence ×3 |
| **Boltwave** | `{R}` | **3 to each opponent, once**, plus one instant/sorcery trigger | nothing | — |
| **Command the Stage** | `{R}` (two reducers) | **one instant/sorcery cast every turn** for the rest of the game, + a growing Cadet wall | a noncombat hit on an opponent in your previous turn — any converter ✔ | Cadets: die to two Confluence modes / Ignition |

**Deciding axis: repeatability (§2.3)** — throughput over a game against a one-shot, with the deck's
named structural weakness (defence, 2026-08-06 entry) as the secondary axis. Model, with two
instant/sorcery converters out from turn 4: Boltwave is 3 + 4 = **7 to each opponent, once**; Command the
Stage is 4 to each opponent **per cast**, so it passes Boltwave on its **second** cast and is ~20 to each
over turns 4–8 — before Livaan's +3 a cast, Thor's 3, or the Cadets (the first Cadet is a 6/6 by the fifth
cast, since each new cast counters every older Wizard token).

**Why Boltwave is the cut, and what else was ranked.** Boltwave is already the sideboard's named
"weakest slot once a game goes long" (Bulk Up's pointer), and `main` *is* the long-game list. Also
considered: Zuko's Exile (with Chaos Warp, one of the two instant answers to any artifact, creature or
enchantment, and its `{5}` is all generic that Wanda eats — kept),
Disrupt Decorum (the one-sided fog — kept, defence is the weakness), Kazuul (the only permanent
deterrent — kept), Nico (a converter with 14 enablers — kept), Hit the Mother Lode (the pilot's keep,
2026-08-21) and Mizzix's Mastery (its overload is the late-game ceiling).

**Self-hits and costs, stated (§1.3).**
- Cadets die to your own Fiery Confluence (two creature modes) and Chandra's Ignition. Same accepted
  cost as Kazuul's Ogres; the Ignition is the finisher anyway.
- **Don't flash it back** off Past in Flames / Will of the Jeskai, and cast Mizzix's Mastery's overload
  while it is in hand — both exile it and end the recursion. Arcane Bombardment can't catch it: it
  returns at the next upkeep, before that turn's first instant/sorcery.
- **Floor:** before any converter is down, it is a 3-mana 2/2 that doesn't come back.
- The turn-2 "3 to each opponent" Boltwave gave is gone.
- **Curve:** MV ≤ 2 **19 → 18**, MV ≤ 3 **33 → 33**, average MV **3.48 → 3.52** (this pass's count:
  nonland, commander excluded; `deck:show` reads 3.45). `main` is already the heaviest list.

---

## Bench (SIDE)

| Card | List | Displaces | Grounds |
|---|---|---|---|
| Master of Barbs | main | Boltwave (runner-up for the same slot as Command the Stage; next in if a second slot opens) | `{R}` with a Medallion. *"Whenever one or more opponents are dealt noncombat damage, creatures you control get +1/+0 until end of turn"* — every converter hit becomes +1 discount (one trigger per damage event, CR 603.2c). Two converters out ≈ +2 power per instant/sorcery, a converter-fed second Livaan. Toughness 1: your own first Confluence mode kills it. |
| Chandra, Torch of Defiance | main | Arcane Signet | `{R}{R}` after two reducers; Livaan +4 and Thor 4 on cast; +1 `{R}{R}` a turn (banks under Electro/Ashling) or a card / 2 to each opponent; Repeated Reverberation copies loyalty abilities (three +1s = six red; three −7s = three emblems). Costs: MV 2 → 4 on the heaviest list, and a 4-loyalty walker draws attacks. |
| The Echoverse Fulcrum | main | Volcanic Vision (Blasphemous Act's bench row) | `{2}` (free under Longshot + Talent) loots on entry; later `{5}`, exile: destroy all creatures. The unconditional wrath `main` lost with Blasphemous Act, but *destroy* (Mithril Coat and Tyrite's counter save Wanda), never dead in hand, and paid with colourless mana the deck can't bank. Also kills your own engines — a catch-up card, sorcery speed. |
| Stingcaster Mage | v3 | Twinferno | See the named-ask section. |
| Awaken the Inferno | v3 | Twinferno | MV 5 sorcery → `{R}` at Wanda 3 + Ruby: 6 to an opposing creature **and** a permanent +1/+1 counter on Wanda, with Livaan +5 on cast — a one-pip link worth ~+6, against Titan's Strength's +4. Basic landcycling `{2}` makes it a Mountain in the opener. Uncastable if no opponent controls a creature or planeswalker (CR 601.2c) — the reason it is bench, not MAIN. |

## Traps

- **Draconic Visitor** — *"If one or more artifact tokens would be created under your control, that many
  5/5 red Dragon creature tokens … are created instead."* Mandatory. Big Score, Unexpected Windfall,
  Storm-Kiln Artist, Brass's Bounty, Inspired Tinkering, Mines of Moria and Urabrask's Saga all stop
  making mana — the same family as LEDGER "'Exiles it instead' removal switches off a death-trigger
  deck's own engine".
- **Karn, Argent Defender** — *"Artifacts and creatures entering the battlefield don't cause abilities
  to trigger."* Turns off Mithril Coat's attach (all three lists), Hero's Blade / Coral Sword / Inventor's
  Axe (B4, V3) and Thor's ETB. **Symmetric stax** — flagged for the pilot's pod call, not silently
  excluded; it fails here on the self-hit alone.
- **Ajani Unrelenting** — −3 deals 4 to each creature *except tokens you control*: Wanda and every engine.
- **Curse-Marred Demon** — a tutor whose random discard, off the thin hand a 4-drop is cast into, often
  bins the tutored card (the Fervent Mastery grounds).
- **Omnath, Locus of the Void** — banks unspent mana as **colourless**, which can't pay `{R}` pips; the
  Horizon Stone rejection again. Electro and Ashling already bank it red.
- **Face Yourself** on your own board — the token copies of your legendary engines die to the legend
  rule (10+ legendary creatures in each list).

## Cross-deck note

The TVS review (`decks/vision-scarlet-witch/research/fra-set-review-2026-09-28.md`) takes Tomik, Izzet
Sparkmage and Command the Stage as MAIN and benches Pyre Rhymer, Master of Barbs and Hall of Echoes —
the 1-damage pinger shell is where the set's noncombat-damage cards pay most.

## Parent-review dissent — Pyre Rhymer // Molten Tide in `v3` (2026-09-28)

The row above rates it NO in all three lists, citing B4's turn-3 Mountain count. That reasoning fits
`b4`; it is thinner for **`v3`**, whose own founding finding (decisions.md §3) is that *the kill-turn
constraint is red pips, not mana* — X-spells cost only their coloured pips with Livaan out.

- **Molten Tide** is `{R}`, an instant: *"Until end of turn, whenever you tap a Mountain for mana, add an
  additional {R}."* v3 runs **21 Mountains**. On a turn-5/6 chain turn with Rhymer already down, one red
  pip turns every Mountain tapped afterwards into two red pips — roughly **+4 to +5 red pips net**,
  the same order as Seething Song with rocks paying its generic half, and it is also an instant cast
  (Livaan +1).
- **The real costs** (why it is not MAIN): Rhymer is `{1}{R}{R}` on an *earlier* turn and must survive —
  the copy leaves exile with it (CR 722.3c). A dead 3/3 prowess is a dead ritual. It is also a creature
  card in a list whose recursion reads instants/sorceries.
- **Verdict the parent would put to the pilot:** **SIDE for `v3`** (a sixth red-pip chain link that
  also pads the curve at MV3), not NO. Judgment call; the reviewer's NO for `main` and `b4` stands.

## Follow-up: Braid of Fire for v3 / b4 (2026-09-28)

**Pilot's question:** Braid of Fire just left TVS `main` for Command the Stage. Should it go into
Scarlet Witch `v3` and `b4`? **Answer: no, in both lists.** Details below. No earlier Scarlet Witch
decision evaluated Braid, so this is the first ruling on it here. TVS's grounds are re-derived below,
not copied.

**Oracle text:** *"Cumulative upkeep—Add {R}."* By CR 702.24a it gets one age counter each upkeep,
and you "pay" by adding {R} for each counter. So a Braid cast on turn t adds n red at the upkeep of
turn t+n. **The mana appears in the upkeep step**, and CR 106.4 empties the pool *"at the end of each
step and phase"*. Unless something banks it, it is gone before the main phase, which is when the
chain happens.

**Banks in each list** (from oracle text):
- `v3`: **Electro** and **Ashling** (*"You don't lose unspent red mana as steps and phases end"*).
- `b4`: **Electro** and **Ashling**. Birgi does not count: *"you don't lose **this** mana"* covers
  only her own trigger's mana.

That is 2 of 99 in each list. P(at least one by turn 5, ~15 cards seen) ≈ 28%, before Braid itself
also has to arrive early.

**Unbanked, the upkeep mana has exactly one real use in `v3`.** On turn 5, a Braid cast on turn 2
gives {R}{R}{R} in the upkeep. That is precisely **Storm King's Thunder's** {R}{R}{R}, and it is an
instant: *"When you next cast an instant or sorcery spell this turn, copy that spell X times"*. That
lasts all turn, so a main-phase Jaya's still gets copied. Livaan's +MV also lasts until end of turn.
The line is real, but it needs three things:
- Braid on turn 2. The same Braid cast on turn 3 gives {R}{R}; on turn 4, {R}.
- Storm King's Thunder in hand on the kill turn.
- Nothing else useful to do with that turn-2 mana.

A late-drawn Braid is +1 red next turn, and a dead card on the chain turn itself.

**Why TVS ranked it last of five in Mana Banking** (spellslinger-2026-09-07 / FRA TVS review): it was
the only mana card whose output was *"only usable at upkeep unless a banker is out"*, and mana was
never the gap the pilot reported. The first ground carries over to Scarlet Witch unchanged.

### `v3`: NO
The deciding axis is **when the pips arrive**. `v3` needs 5+ red pips inside one main phase. Braid
delivers in the upkeep. It only converts with a 2-of-99 banker, or through the one Storm King's
Thunder line above. None of the current pip cards is worse at the job:
- The rituals (Desperate, Pyretic, Seething Song) arrive when you need them.
- Arcane Signet pays a pip every turn.
- Mana Geyser is protected.

No cut is proposed.

### `b4`: NO
`b4` kills on turn 3 off 16 fast-mana, ritual and reducer pieces. A turn-1 Braid gives {R}{R} at the
turn-3 upkeep, in the wrong step, and Electro/Ashling are rarely out by then. It would displace fast
mana, which the pilot protects.

### Braid vs Molten Tide (the parent's `v3` dissent above)
They compete for the same job: more red pips on the chain turn. **Molten Tide is the better of the
two for `v3`:**
- It fires *in the main phase*, where the chain happens: *"Until end of turn, whenever you tap a
  Mountain for mana, add an additional {R}."* With 21 Mountains that is about +3 to +5 net on turns 5–6.
- It does not care how early Rhymer landed, as long as Rhymer survived a turn cycle (CR 722.3c).
- The copy is itself an instant cast. That feeds Livaan +1, Electro {R}, a Storm-Kiln Treasure,
  Urabrask's ping and {R}, and Longshot's 2.

Braid only wins on repeatability and on price: MV2, noncreature, so it drops to {R} under
Longshot / Artist's Talent L2.

So the parent's **SIDE for `v3`** stands for Pyre Rhymer, not for Braid. If the pilot ever wants it
in, the displacement pointer is **The Fire Crystal**. It is a second Ruby Medallion that reduces only
generic mana, and generic is not the constraint in a pips-limited chain. Rhymer costs the same 3 in
practice ({1}{R}{R}, {R}{R} under Ruby). Curve: MV 4 → 3, so MV ≤ 3 goes up by 1 and avg MV −0.01.
The Fire Crystal also grants haste, and that loss should be named. **`b4`: neither.** Rhymer on turn 2
costs 3 mana out of the fast-mana budget, for about +2 on turn 3.
