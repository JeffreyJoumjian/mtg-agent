# Ledger: Combat, damage and life

Combat steps and commander damage; damage modifiers, multipliers and prevention; lifelink and life-gain events; drain; protection, indestructible and regeneration; sweepers and edicts. Entry format and capture rules: `../SKILL.md` §4.
Search every topic at once with `bun run lookup "<card | rule number | term>"`.

---

### Simultaneous lifelink sources are separate life-gain events {#dmg-001}

**Kind:** ruling · **Verified:** 2026-08-25 against CR 2026-08-07
**Cards:** Marauding Blight-Priest; Vito, Thorn of the Dusk Rose; Vault of the Archangel; Akroma's Will; Ajani's Pridemate; Blood Artist; Cruel Celebrant
**Rules:** 702.15e
**Claim:** Multiple lifelink sources dealing damage at once cause separate life-gain events; one source hitting many things is a single event. "Whenever you gain life" triggers count **events**, not life points, so simultaneous lifelink damage from N creatures is N events.
**Evidence:** CR 702.15e — *"If multiple sources with lifelink deal damage at the same time, they cause separate life gain events,"* with the printed example of Ajani's Pridemate triggering twice.
**Changes:** Determines how many times a "whenever you gain life" payoff triggers off an alpha strike. Marauding Blight-Priest ("whenever you gain life, each opponent loses 1") is a **board-width-scaling converter**, not a flat-1 filler: with Vito's {3}{B}{B} team-lifelink activation, Vault of the Archangel or Akroma's Will, a ten-creature attack is ten triggers = 10 to each opponent. Same for every Blood Artist / Cruel Celebrant trigger in a wipe. Rank event-counting payoffs by how many *separate* gain events the deck produces, never by total life gained.
**History:** The 2026-08-25 entry superseded my own earlier mis-ranking of Marauding Blight-Priest as the weakest drain (edgar-markov); corrected because simultaneous lifelink damage from N creatures is N separate gain events (CR 702.15e), so Blight-Priest scales with board width.
**See also:** dmg-015, dmg-023, dmg-025, dmg-028
**Source:** edgar-markov (2026-07-31); edgar-markov (2026-08-25, Blight-Priest re-ranking; merged from "Multiple lifelink sources = separate life-gain events (CR 702.15e)")

### Toughness 0 ignores indestructible {#dmg-002}

**Kind:** ruling · **Verified:** 2026-07-31 against CR 2026-04-17
**Rules:** 704.5f
**Claim:** A creature with toughness 0 or less goes to the graveyard as a state-based action; indestructible and regeneration don't save it.
**Evidence:** CR 704.5f.
**Changes:** −X/−X wipes beat the indestructible protection package. Pick protection accordingly: phasing outclasses conditional indestructible against them.
**See also:** dmg-016
**Source:** edgar-markov (2026-07-31)

### The postcombat main phase happens whether or not you attack {#dmg-003}

**Kind:** ruling · **Verified:** 2026-08-02 against CR 2026-04-17
**Cards:** Neheb, the Eternal
**Rules:** 500.1
**Claim:** You always get a second main phase, with no attack required.
**Evidence:** CR 500.1 — *"Each of these phases takes place every turn, even if nothing happens during the phase."*
**Changes:** Enables the two-stage turn for any "at the beginning of your postcombat main" payoff (Neheb, the Eternal): burn precombat, collect in the postcombat main, spend it there. Pass through combat without attacking.
**Source:** scarlet-witch (2026-08-02)

### Modal spells with a repeated mode deal separate damage instances {#dmg-004}

**Kind:** ruling · **Verified:** 2026-08-06 against CR 2026-08-07
**Cards:** Fiery Confluence
**Claim:** "Choose three, you may choose the same mode more than once" resolves that instruction that many times, as separate events.
**Evidence:** Fiery Confluence taking "2 damage to each opponent" three times is 2+2+2 as three events, not one 6.
**Changes:** Matters enormously with per-instance boosters — a floor or additive effect applies to **each** instance separately. Also means such a spell is three chances to be modified, not one.
**See also:** dmg-029, repl-001
**Source:** scarlet-witch (2026-08-06)

### Bloodthirst keys on damage; drain decks never turn it on {#dmg-005}

**Kind:** ruling · **Verified:** 2026-08-06 against CR 2026-08-07
**Cards:** Bloodlord of Vaasgoth; Blood Artist; Vein Ripper; The Meathook Massacre; Vito, Thorn of the Dusk Rose; Sanctum Seeker; Vampire Socialite
**Claim:** Bloodthirst checks *"an opponent was **dealt damage** this turn."* Life **loss** is not damage, so a deck that wins by draining does not satisfy it.
**Evidence:** Bloodthirst reminder text vs the effects in question — Blood Artist, Vein Ripper, Meathook, Vito and Sanctum Seeker all cause opponents to *lose life*, never to be dealt damage.
**Changes:** Rejected Bloodlord of Vaasgoth for Edgar. The general form: **read whether a condition says *damage*, *life loss*, or *lifegain*, and check it against what the deck actually produces** — they are three different sets. Vampire Socialite's *"an opponent lost life"* is nearly always on in the same deck where bloodthirst is nearly always off.
**See also:** dmg-026
**Source:** edgar-markov (2026-08-06)

### A type-restricted edict is skipped entirely, never substituted {#dmg-006}

**Kind:** ruling · **Verified:** 2026-08-06 against CR 2026-08-07
**Cards:** Anowon, the Ruin Sage; Mirkwood Bats; Elspeth, Storm Slayer; Purphoros, God of the Forge; Roaming Throne
**Rules:** 101.3, 608.2d, 608.2e, 609.3
**Claim:** "Each player sacrifices a non-X creature of their choice" — a player controlling only X (or no creatures) sacrifices **nothing**, and can never be made to sacrifice an X.
**Evidence:** CR 608.2d (can't choose an illegal/impossible option), CR 101.3 and CR 609.3 (impossible instructions are ignored / done as much as possible). Choices are made in APNAP order, then all sacrifices happen simultaneously (CR 608.2e).
**Changes:** Makes Anowon-style effects genuinely one-sided in a tribal deck — but *each player* includes **you**, so audit your own off-type permanents first (in Edgar: Mirkwood Bats, Elspeth's Soldier tokens, Purphoros above devotion 5). Changelings and "is the chosen type in addition" effects (Roaming Throne) are immune.
**Source:** edgar-markov (2026-08-06)

### Trample assignment ignores damage-modifying effects, so tramplers beat chump blocks {#dmg-007}

**Kind:** ruling · **Verified:** 2026-08-07 against CR 2026-08-07
**Cards:** Sword of Fire and Ice; Mjölnir, Hammer of Thor
**Rules:** 702.19b
**Claim:** When assigning trample damage you use the creature's raw power and ignore any doubler, floor or prevention effect. The multiplier then applies to each assigned chunk separately, so a damage doubler pushes almost its full value through a chump block.
**Evidence:** CR 702.19b — assign lethal to blockers, then excess to the player, and *"when checking for assigned lethal damage, take into account damage already marked... **but not any abilities or effects that might change the amount of damage that's actually dealt**."*
**Changes:** A 12/12 with trample and a damage doubler, chump-blocked by a 2/2: assign **2** to the blocker and **10** to the player, then double both — the blocker takes 4 and the **player takes 20**. Trample is therefore a *better* evasion answer than protection-from-a-colour in any deck with a damage multiplier, and it is the only evasion that beats **colorless** blockers, which protection never stops. In artifact formats full of Constructs, Thopters and Servos that gap is large.
**See also:** dmg-024, dmg-025
**Source:** iron-man (2026-08-07), choosing between Sword of Fire and Ice and the Mjölnir package

### Deathtouch on a SPELL turns any damage sweep into a board wipe {#dmg-008}

**Kind:** ruling · **Verified:** 2026-08-19 against CR 2026-08-07
**Cards:** Judith, Carnage Connoisseur; Kaya's Ghostform; Pyroclasm; Damnation
**Rules:** 113.7a, 603.3, 603.3c, 611.2c, 702.2b, 702.2d, 702.12b, 704.5h
**Claim:** Deathtouch works from any source, not just creatures — a spell granted deathtouch (Judith, Carnage Connoisseur mode 1) destroys every creature it deals ANY nonzero damage to, so a 1-damage-to-each-creature instant becomes "destroy each non-indestructible creature," with lifelink paying 1 life per creature damaged.
**Evidence:** CR 702.2b — "a creature ... that's been dealt damage by **a source** with deathtouch ... is destroyed as a state-based action" (says *source*, not creature); CR 702.2d — deathtouch functions from any zone, including the stack; CR 704.5h is the destroying SBA and regeneration can replace it. Sequencing is safe by construction: the cast-trigger sits ABOVE the spell on the stack (CR 603.3), the mode is announced when the trigger is put on the stack (CR 603.3c), and once it resolves the granted deathtouch persists even if Judith dies (CR 113.7a, 611.2c). Survivors: indestructible (CR 702.12b — destroy just doesn't happen, though lifelink still counts the damage), and anything whose damage is PREVENTED (protection — no damage dealt, no deathtouch). Targeting is irrelevant; "each creature" sweeps work identically.
**Changes:** Evaluate deathtouch/lifelink spell-granters (Judith, Kaya's Ghostform-style riders, equipment that grants a spell keywords) with the deck's cheap mass-damage spells in mind — a Pyroclasm-class card upgrades to Damnation-class with one such piece on board. Conversely a deck with such a granter should count its 1–2 damage sweeps as conditional wipes when doing role counts.
**See also:** dmg-014
**Source:** session question (2026-08-19) — Judith, Carnage Connoisseur + 1-damage instants

### Half-life effects under amplifiers: a doubler kills even totals, doubler + additive kills all {#dmg-009}

**Kind:** pattern · **Recorded:** 2026-08-23
**Cards:** Heartless Hidetsugu; Fraying Omnipotence; Havoc Festival; Unstoppable Slasher; Bloodletter of Aclazotz
**Rules:** 120.8, 616.1
**Claim:** For any "deals damage equal to half that player's life, rounded down" effect (Heartless Hidetsugu): one ×2 amplifier kills every opponent on an **even** life total and leaves odd totals at exactly 1; ×2 plus any +2 additive kills every total of 2 or more (a player at exactly 1 takes 0 — no damage event, nothing to add to); a +2 alone kills nothing. For "loses half their life, rounded up" effects (Fraying Omnipotence, Havoc Festival, Unstoppable Slasher) under a life-loss doubler (Bloodletter of Aclazotz on your turn), ⌈L/2⌉ × 2 ≥ L always — every opponent loses their whole total.
**Evidence:** Arithmetic with the 616.1 ordering rule (opponent picks min of (⌊L/2⌋×2)+2 and (⌊L/2⌋+2)×2 — both ≥ L for all L ≥ 2; at L = 1 the source would deal 0, which is no damage at all, CR 120.8, so the additive never applies). Worked table in decks/lord-of-pain/research/formulas.md.
**Changes:** Rate a half-life card as a finisher only when the list carries the matching amplifier; note the parity gotcha on the damage version and the clean kill on the loss version.
**See also:** dmg-026, repl-001
**Source:** lord-of-pain (2026-08-23)

### Commander damage is COMBAT damage only — amplified combat damage counts in full, amplified spell or ability damage never does {#dmg-010}

**Kind:** ruling · **Verified:** 2026-09-08 against CR 2026-08-07
**Cards:** Chandra's Ignition; Fling; Torbran, Thane of Red Fell; The Lord of Pain
**Rules:** 104.3j, 120.2a, 120.2b, 120.4a, 120.4b, 120.7, 120.10, 510, 510.1a, 510.2, 510.4, 609.7a, 614.1, 614.1a, 614.4, 614.5, 614.6, 701.14d, 702.4a, 702.4b, 704.6c, 903.10a
**Claim:** Only damage dealt in a combat damage step by an attacking or blocking creature counts toward the 21-damage commander loss condition; damage a commander deals via a spell or ability — fight, Fling, "deals damage equal to its power to each opponent" — adds **zero** to that tally, no matter how large or how thoroughly doubled. But Torbran, Thane of Red Fell's "+2 damage" (and any replacement effect shaped like it — "if a source you control would deal damage... instead") applied to a commander's combat damage is **not** split into a "base combat damage" tally plus separate non-commander life loss: the entire modified total counts toward the 21, so a 4-power red commander hitting for 4 becomes a hit for 6, and all 6 is commander damage.
**Evidence:** CR 903.10a — *"A player who's been dealt **21 or more combat damage** by the same commander over the course of the game loses the game"* (repeated at 104.3j, enforced as an SBA at 704.6c). Glossary "Combat Damage" — *"Damage dealt **during the combat damage step** by **attacking creatures and blocking creatures** as a consequence of combat."* CR 120.2a (combat damage, turn-based, 510.1a/510.2) vs CR 120.2b (*"Damage may be dealt as an **effect of a spell or ability**"*). The decisive analogy is CR 701.14d — *"The damage dealt when a creature **fights** isn't combat damage"* — the same shape as Chandra's Ignition. Neither the timing (cast during combat), the source (an attacking creature), nor "equal to its power" phrasing converts 120.2b damage into combat damage.
**Amplified combat damage (verified 2026-09-08):** CR 614.1/614.1a/614.6 — Torbran's "instead" wording is a replacement effect that modifies the **amount** of an event, not a new event; the source ("it") stays the commander. CR 120.4b — the modification happens as damage is dealt, before the event is processed into results. CR 609.7a — a damage-modifying effect's source concept is independent of whether the damage is combat or spell/ability damage; the combat/noncombat category is fixed by *how the damage arose* (CR 510, glossary "Combat Damage"), not by anything the replacement effect itself does. Glossary "Combat Damage" and CR 903.10a/704.6c track damage that *is* combat damage from that commander — both conditions still hold for the whole modified amount; no rule carves the +2 into a separate bucket the way 120.4a/120.10 explicitly carve out excess damage.
**Related, verified in the same 2026-09-02 pass:** a damage doubler *does* apply to that noncombat damage (CR 120.2b → 120.7 makes the creature the source; 614.1/614.4 replacement, applied at 120.4b), and it applies **per recipient, not to a summed total** — CR 614.5's worked example: a creature that normally deals 2 deals 8 under two doublers, "not just 4". Caveat 614.4: the doubler must still be attached when damage is dealt, and a power pump must resolve *before* the damage spell, which locks power on resolution.
**Changes:** When a voltron deck evaluates a "deals damage equal to its power to each opponent" effect, score it as **life loss against 40 plus a sweep**, never against the 21 threshold. The only ways to accelerate the 21 are more combat damage steps (double strike, CR 510.4/702.4a-b), extra combat phases, and multipliers applied to combat damage. Corrects the Ignition claim in "Doubling POWER is a damage multiplier when a damage doubler is already on board" (dmg-011).

The Torbran case (2026-09-08) is the mirror case of the combat-only rule, not a contradiction of it. The dividing line is **what kind of event exists before the amplifier ever touches it**: if the underlying event is already combat damage (attacking/blocking creature, combat damage step, CR 510) before Torbran/a doubler/any amount-amplifying replacement effect applies, the amplified total stays commander damage in full. If the underlying event was never combat damage to begin with (Chandra's Ignition, fight damage per CR 701.14d — damage from a spell/ability per CR 120.2b), amplifying it only inflates ordinary life loss and never feeds the 21, no matter how large. Check *which side of that line* a damage-boosting effect sits on before scoring it against the 21-threshold in a voltron/commander-damage plan.
**See also:** dmg-011, dmg-013, dmg-014, dmg-024
**Source:** iron-man (2026-09-02) — pilot asked whether Chandra's Ignition damage is commander damage; lord-of-pain (2026-09-08, merged from "A replacement-effect additive on already-combat damage counts in FULL as commander damage") — pilot asked whether Torbran's extra 2 damage counts as commander damage when The Lord of Pain (a red source) deals combat damage

### Doubling POWER is a damage multiplier when a damage doubler is already on board {#dmg-011}

**Kind:** pattern · **Recorded:** 2026-09-02
**Cards:** Bulk Up; Mjölnir, Hammer of Thor; Embercleave; Chandra's Ignition
**Claim:** In a deck holding a damage doubler, a cheap "double target creature's power" instant is not a combat pump — it is a second copy of the deck's biggest Equipment, and it scales any "deals damage equal to its power to each opponent" effect with it (life loss against a 40-life total, not a table kill — see History). Score it in the finisher role, never the pump role.
**Evidence:** Bulk Up ({1}{R}, *"Double target creature's power until end of turn"*) resolves as +X/+0 with X locked at resolution, so it is cast after deploys and after blockers. With Mjölnir, Hammer of Thor (*"Double all damage equipped creature would deal"*) on a 5/5 commander: bare = 20 damage, and with any second Equipment = 24+, matching what Embercleave ({4}{R}{R}) bought for 2 mana instead of 6. The larger jump is non-combat — Chandra's Ignition (*"Target creature you control deals damage equal to its power to each other creature and each opponent"*) makes the creature the damage source, so Mjölnir doubles it: 6 power = 12 to each opponent (not lethal), 12 power = **24 to each opponent** plus a full sweep, with no attack step, no blockers and no attack tax. **CORRECTED 2026-09-02 — see dmg-010:** that 24 is life loss against a 40-life total, *not* a kill. The commander-damage half of the claim (24 in combat = a 21-damage kill) is unaffected and stands.
**Changes:** Whenever a deck runs a damage doubler, check the power-doubling instants before the additive Equipment tier — the multiplier tier scales with everything already on the creature, and per SKILL §2.5 these commute cleanly rather than being a redundant second multiplier. Also check whether the deck holds a damage-equal-to-power sweeper: the power doubler may be the difference between "big" and "wins the game".
**History:** On 2026-09-02 this entry claimed the power doubler converts any "deals damage equal to its power to each opponent" effect into a **table kill**; corrected on 2026-09-02 because damage from a spell or ability is not commander damage (dmg-010), so the Ignition line's 24 is life loss against a 40-life total, not a kill.
**See also:** dmg-010, dmg-019
**Source:** iron-man (2026-09-02) — Bulk Up into V3

### Commander's Plate on a colourless commander is protection from all five colours {#dmg-012}

**Kind:** ruling · **Verified:** 2026-09-03 against CR 2026-08-07
**Cards:** Commander's Plate; Swords to Plowshares; Wrath of God; Swiftfoot Boots; Lightning Greaves
**Rules:** 702.16b, 702.16c, 702.16d, 702.16e, 702.16f
**Claim:** *"protection from each color that's not in your commander's color identity"* — a colourless identity contains no colours, so the equipped creature gets pro-W/U/B/R/G. It still does nothing against colourless removal, wraths that neither target nor damage, or edicts.
**Evidence:** Oracle text of Commander's Plate; CR 702.16b–f for what protection covers (verified same pass for the mono-red case: pro-W/U/B/G stops Swords, green blockers and black creature damage; not Wrath of God, not an edict).
**Changes:** In a colourless deck, Commander's Plate outranks Swiftfoot Boots and Lightning Greaves as the engine-protection Equipment: it also stops coloured blocks and coloured damage, and it never conflicts with any Equipment (all colourless). The fifth protection colour (red) is the one mono-red decks lack, so colourless commanders get the best Plate in the format.
**See also:** dmg-022, equip-001
**Source:** ultron (2026-09-03) — founding build

### "Target creature you control deals damage equal to its power" deals NOTHING if that creature is removed in response — no last-known-information fallback {#dmg-013}

**Kind:** ruling · **Verified:** 2026-09-04 against CR 2026-08-07
**Cards:** Soul's Fire; Chandra's Ignition; Origin of Thor; Swiftfoot Boots; Champion's Helm; Deflecting Swat; Bolt Bend; Twinferno
**Rules:** 113.7a, 601.2c, 603.3, 608.1, 608.2, 608.2b, 608.2h, 707.10, 707.10c, 903.9a
**Claim:** Soul's Fire, Chandra's Ignition, Origin of Thor chapter III and every other "target creature you control deals damage equal to its power to …" effect deal zero damage if the creature is exiled, bounced or killed in response. The spell still resolves (the other target is legal) but the damage clause needs information about an illegal target and fails outright. LKI does not save it.
**Evidence:** CR 608.2b — *"Illegal targets, if any, won't be affected by parts of a resolving spell's effect for which they're illegal… If part of the effect requires information about an illegal target, it fails to determine any such information. Any part of the effect that requires that information won't happen."* 608.2 applies 608.2b before every other resolution step; 608.2h / 113.7a (LKI) cover an ability's *source* or an untargeted referenced object, never an illegal target. Command-zone replacement (903.9a) changes nothing — the creature still left its zone.
**Changes:** In a voltron list these are **finishers that must be cast with hexproof or a redirect held**, not answers to removal. Pilot line: Swiftfoot Boots / Champion's Helm on first, Deflecting Swat or Bolt Bend up, then the power-to-face spell. Same verified pass: a Twinferno-style copy may keep the same player as its "any target" — 601.2c's one-target-per-instance rule is per object, and the copy is its own spell (707.10, 707.10c) — and the copy resolves first (603.3, 608.1).
**See also:** dmg-010, dmg-014, equip-008
**Source:** vision-scarlet-witch (2026-09-04) — Soul's Fire + Twinferno line; verified by mtg-rules-expert against CR 2026-08-07

### Lifelink pays on NONCOMBAT damage too — a lifelink Equipment on a "deals damage equal to its power" source is a life swing the size of the spell {#dmg-014}

**Kind:** ruling · **Verified:** 2026-09-04 against CR 2026-08-07
**Cards:** Shadowspear; Basilisk Collar; Chandra's Ignition; Soul's Fire; Origin of Thor; Fiery Emancipation
**Rules:** 120.2b, 120.7, 702.15b
**Claim:** Lifelink is not a combat keyword. Any damage dealt by a source with lifelink gains its controller that much life, so Shadowspear or Basilisk Collar on the creature that Chandra's Ignition, Soul's Fire or Origin of Thor III names makes that spell gain life equal to its total damage — every opponent and every creature hit — and a damage multiplier multiplies the gain.
**Evidence:** CR 702.15b — *"Damage dealt by a source with lifelink causes that source's controller, or its owner if it has no controller, to gain that much life (in addition to any other results that damage causes)."* Chandra's Ignition: *"Target creature you control deals damage…"* — the creature is the source (CR 120.2b → 120.7). Fiery Emancipation triples the damage, so the gain triples.
**Changes:** In any deck with a power-to-face spell, score a one-mana lifelink Equipment as a finisher-adjacent card, not a defensive one: a 15-power Ignition across three opponents and a board is 45+ life. It answers "how do I survive three attack steps" better than a blocker does.
**See also:** dmg-008, dmg-013, dmg-025, equip-007
**Source:** vision-scarlet-witch (2026-09-04) — the pilot's "shadowspear is the obvious choice"; rule grepped from `rules/sections/702-keyword-abilities.part1.md`

### One effect gaining N life is ONE life-gain event — in a drain deck, many small gains beat one big one {#dmg-015}

**Kind:** ruling · **Verified:** 2026-09-25 against CR 2026-08-07
**Cards:** Fumigate; Ajani's Pridemate; Sanguine Bond; Vito, Thorn of the Dusk Rose; Marauding Blight-Priest; Indulging Patrician; Valley Rotcaller; Prosperous Innkeeper
**Rules:** 119.3, 119.9, 603.2c, 603.10a, 608.2h, 702.15e
**Claim:** "Whenever you gain life" payoffs count events, not life: a single gain of X — Fumigate-style *"destroy all creatures, gain 1 life for each"*, Valley Rotcaller's attack trigger — is a single life-gain event of X, not X events, so it is one trigger while X gains of 1 is X triggers; and the best converter (Vito) hits **one target opponent**, so a big single gain is a single hit on a single player while the flat converters pay out per opponent. With a Fumigate the gain is also applied after the destruction, so any "whenever you gain life" creature the wrath killed is already in the graveyard and does not trigger.
**Evidence:**
- *Fumigate (2026-09-06):* CR 119.9 (*"whenever you gain life" = whenever a source causes you to gain life*), CR 608.2h (the count is determined once as the effect is applied), CR 603.2c (one trigger per event); contrast CR 702.15e, where *multiple lifelink sources* make separate events. Gatherer's Ajani's Pridemate ruling (2024-11-08) states the "for each" = one event reading verbatim. For the look-back half: CR 603.10a lists leaves-the-battlefield triggers only — a gain-life trigger needs its source on the battlefield (ledger 2026-07-31, *dies-triggers look back; gain-life does not*).
- *Valley Rotcaller (2026-09-25):* CR 119.3 (gaining X life is one event) and CR 119.9 ("Whenever [a player] gains life" is read as "whenever a source causes [a player] to gain life"; gaining 0 is no event at all). Valley Rotcaller's attack trigger gains X **once**, so Vito, Thorn of the Dusk Rose fires once for X against *one* opponent, and Marauding Blight-Priest fires once for **1 per opponent**, not X. Contrast Prosperous Innkeeper's per-creature gains: N tokens entering = N separate gain events = N Vito triggers and N Blight-Priest triggers.
**Changes:** Against a lifegain wrath, count only the **noncreature** gain payoffs (Sanguine Bond survives; Vito, Marauding Blight-Priest, Indulging Patrician die first and fire nothing). One event also means Blight-Priest's flat 1 is all it ever gives here — a Vito/Bond drains N in one hit. More generally this inverts which lifegain source is better in a multiplayer drain deck: when ranking lifegain sources in a drain shell, count **events**, not life totals, and read the converter's wording for "target opponent" vs "each opponent" before comparing. A drip of 1-life triggers can out-damage a single large gain by a wide margin.
**See also:** dmg-001, dmg-023, dmg-028, trig-001
**Source:** edgar-markov (2026-09-06) — Fumigate evaluated for the drain build; chatterfang (2026-09-25, merged from "In a drain deck, MANY small lifegain events beat one big one — and check whether the converter targets") — Valley Rotcaller / Vito / Marauding Blight-Priest interaction, verified by mtg-rules-expert

### "Regenerate target artifact" saves an artifact-creature commander — and only from destruction {#dmg-016}

**Kind:** ruling · **Verified:** 2026-09-07 against CR 2026-08-07
**Cards:** Welding Jar; The Vision and Scarlet Witch; Ultron, Artificial Malevolence; The Ozolith; Mithril Coat
**Rules:** 117.1b, 205.2b, 701.8b, 701.19a, 704.5f, 704.5g, 704.5h
**Claim:** Welding Jar ({0}, sacrifice: regenerate target artifact) is instant-speed protection for any artifact creature commander (The Vision and Scarlet Witch, Ultron) as well as for The Ozolith and Equipment — against "destroy", lethal damage and deathtouch, and nothing else.
**Evidence:** CR 205.2b (an object with several card types satisfies "target artifact"); CR 701.19a (regeneration replaces the next destruction this turn: remove damage, tap it, remove from combat); CR 701.8b (destruction is only "destroy" effects and the lethal-damage / deathtouch SBAs, 704.5g–h); CR 704.5f (toughness ≤ 0 "can't be replaced" by regeneration); CR 117.1b (activate whenever you have priority). The shield exists only once the ability resolves.
**Changes:** In any deck with an artifact commander, a zero-mana regenerator is a free spell (cast-triggers fire) that fills the destroy row of the protection matrix for *every* artifact at once; it does not fill the exile / edict / −X/−X row, and it taps the creature. Rank it beside Mithril Coat, not instead of it.
**See also:** dmg-002, dmg-017, repl-002
**Source:** vision-scarlet-witch (2026-09-07) — the pilot asked for cheap artifact protection for The Ozolith

### Tyrite Sanctum's God type is permanent — the two-step indestructible works on any legendary creature {#dmg-017}

**Kind:** ruling · **Verified:** 2026-09-07 against CR 2026-08-07
**Cards:** Tyrite Sanctum
**Rules:** 205.1b, 400.7, 611.2a
**Claim:** The first ability ("becomes a God in addition to its other types") has no stated duration, so it lasts until the creature leaves the battlefield; on any later turn the second ability ({4},{T}, sacrifice: indestructible counter on target God) can target it.
**Evidence:** CR 611.2a (no duration stated → until end of game), CR 205.1b (types are additive), CR 400.7 (a recast commander is a new object — start over). Verified after this repo's deck notes had cited the Sanctum as indestructible for non-God commanders without checking.
**Changes:** In every legendary-commander deck the Sanctum is six mana over two turns for a permanent indestructible counter, not a God-tribal card. Count it on the destroy row.
**See also:** dmg-016, repl-002
**Source:** vision-scarlet-witch / scarlet-witch (2026-09-07) — both lists run it

### An additional combat PHASE carries its own beginning-of-combat step; an added STEP does not {#dmg-018}

**Kind:** ruling · **Verified:** 2026-09-08 against CR 2026-08-07
**Cards:** Genji Glove; Aggravated Assault; Godo, Bandit Warlord; Obeka, Splitter of Seconds; Captain America, First Avenger
**Rules:** 500.6, 500.8, 500.10, 506.1, 508.8, 603.4, 608.2a
**Claim:** Every effect that adds a combat *phase* adds a full phase including its **beginning of combat step**, so "at the beginning of combat on your turn" triggers fire again in each extra combat. The exception is an effect that adds a bare *step*, which creates the containing phase with the other steps skipped.
**Evidence:** CR 506.1 — the combat phase has five steps *"which proceed in order: **beginning of combat**, declare attackers, declare blockers, combat damage, end of combat"*; only declare blockers/combat damage are ever skipped (CR 508.8). CR 500.8 — *"Some effects can add **phases** to a turn... directly after the specified phase."* CR 500.6 — *"When a phase or step begins, any abilities that trigger 'at the beginning of' that phase or step trigger."* Contrast CR 500.10, the added-*step* case (Obeka), which skips the phase's other steps. Verified for Genji Glove, Aggravated Assault and Godo, Bandit Warlord — all three add a phase. Genji Glove's *"if it's the first combat phase of the turn"* is an intervening-if (CR 603.4/608.2a), so it grants exactly one extra combat per Glove.
**Changes:** Extra-combat cards are **not** only a combat-damage multiplier — in any deck whose engine is a beginning-of-combat trigger, each extra combat phase is a **second activation of that engine**, and should be scored in that role rather than filed with the aggro payoffs. For captain-america this promotes Genji Glove sharply: combat 1's Catch attaches the Glove, the attack schedules combat 2, and combat 2's Catch moves a *different* high-mana-value Equipment onto Cap for a second free Throw. Check the wording says *phase* and not *step* before counting on it.
**See also:** trig-010, equip-028, eval-055, trig-034
**Source:** captain-america (2026-09-08) — Genji Glove (34% EDHREC) against the Catch/Throw engine

### A damage multiplier belongs where damage is FLAT, and is dead weight where it is exponential {#dmg-019}

**Kind:** pattern · **Recorded:** 2026-09-08
**Cards:** Longshot, Rebel Bowman; Fiery Inscription; Guttersnipe; Fiery Emancipation; Storm King's Thunder; Jaya's Immolating Inferno; Livaan, Cultist of Tiamat; The Scarlet Witch; Lunar Frenzy; Solphim, Mayhem Dominus; City on Fire; Angrath's Marauders; Torbran, Thane of Red Fell
**Claim:** Before seating a damage doubler/tripler, ask whether the deck's damage is *flat* (a constant per trigger or per cast) or *exponential* (an X the deck's own engine inflates). A multiplier converts a fixed factor; on flat damage that factor is the whole deck, and on exponential damage it is applied to a number already past what the format can absorb.
**Evidence:** Same commander, two lists, opposite verdicts. In scarlet-witch `DECK.md` the damage is Longshot 2 + Fiery Inscription 2 + Guttersnipe 2 per cast, so Fiery Emancipation turns 6 into 18 a spell — it is the difference between chipping and killing. In `DECK-V3.md` the damage is an X-spell chain: modelled at the coloured-pip floor with one seed, Storm King's Thunder into Jaya's Immolating Inferno is **55 to each of three targets for five red pips**, and one more link takes it to 406. Tripling that converts nothing — three opponents at 40 is a hard ceiling and overkill cannot be banked. Emancipation is not blank there (MV 6, so Livaan pumps Wanda by 6 as it resolves), it simply loses on the binding resource: at seed 4, **Lunar Frenzy is +9 power for one red pip; Emancipation is +6 for three.**
**Changes:** Score a multiplier in the currency that actually binds the kill turn (here coloured pips, not mana), and against the *lethal threshold*, not against raw output. If the deck's damage already clears the threshold without the multiplier, the slot belongs to whatever extends the engine instead. Applies to Solphim, City on Fire, Angrath's Marauders and Torbran as well as Emancipation. Companion to "One multiplier is right, two is greedy" (2026-08-04) and its gating entry (2026-09-04) — this is the case where the right number is **zero**.
**See also:** dmg-011, eval-002
**Source:** scarlet-witch (2026-09-08) — the pilot's "we don't need Fiery Emancipation any more?"

### Divided damage ("among one, two, or three targets") can be aimed at your OWN permanents {#dmg-020}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Cards:** Panther Habit
**Rules:** 115.3, 115.4, 601.2c, 601.2d, 601.5
**Claim:** The modern divided-damage templating is an "any target" ability. Its targets may be creatures, players, planeswalkers or battles on **any** side of the table, so a commander with such an ability can legally target itself or your own creatures.
**Evidence:** CR 115.4 — abilities requiring *"'any target,' 'another target,' 'two targets,' **or similar**"* may target *"creatures, players, planeswalkers, or battles."* CR 115.3 / 601.2c: the phrase contains one instance of "target," so the chosen targets must be **different objects** — you cannot name the same creature twice to double the damage into it. CR 601.2c–d fix the number of targets and the division when the ability is put on the stack, and CR 601.5 explicitly lets you look ahead to which object you will use to pay the cost when making that choice.
**Changes:** Any "deals damage divided among N targets" ability is also a self-targeting outlet. That opens a whole class of otherwise-unplayable payoffs: damage-to-counters converters, "whenever a creature you control is dealt damage" triggers, and enrage. Check for them before writing such an ability off as opponent-facing only.
**See also:** dmg-021, repl-001
**Source:** captain-america (2026-09-09) — Throw + Panther Habit

### Unpreventable damage still fires a prevention effect's rider {#dmg-021}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Cards:** Panther Habit; Skullcrack; Flame Rift
**Rules:** 615.12
**Claim:** A prevention effect that also does something else ("prevent that damage **and** put that many counters on it") still does the something else against damage that can't be prevented. You take the damage and get the rider.
**Evidence:** CR 615.12 — *"If unpreventable damage would be dealt, any applicable prevention effects are still applied to it. Those effects won't prevent any damage, but **any additional effects they have will take place**."*
**Changes:** Prevention-with-a-rider cards are strictly better than plain prevention against Skullcrack/Flame Rift-style "damage can't be prevented" clauses — the shield fails but the payoff still lands. Do not discount them for a meta with unpreventable damage. Note the reverse is not a free lunch: the damage is fully dealt, so lethal damage still kills.
**See also:** dmg-020, dmg-027, repl-001
**Source:** captain-america (2026-09-09) — Panther Habit evaluation

### Protection from a colour fizzles your OWN pending abilities from that colour's sources {#dmg-022}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Giver of Runes; Mother of Runes; Urdnan, Dromoka Warrior; Patriot, Shield Wielder; Clever Concealment
**Rules:** 113.7, 113.7a, 608.2b, 608.2d, 700.2, 702.11b, 702.16b
**Claim:** Giving a creature protection from white while one of your own white-sourced abilities is still on the stack targeting it makes that ability do nothing. Stacking two Giver of Runes / Mother of Runes activations against two removal spells fails whenever the second is mono-white.
**Evidence:** CR 702.16b — a creature with protection from a quality "can't be the target of ... abilities from a source with the stated quality." CR 608.2b — a target that has become illegal makes the ability not resolve. CR 113.7 / 113.7a — the ability's source is Giver (a white creature), using last known information if it has left. Worked stack (bottom to top): RED spell, Giver #1, WHITE spell, Giver #2 choosing white. Giver #2 resolves; WHITE fizzles; **Giver #1 fizzles**; RED resolves. Choosing red on Giver #2 fails differently: WHITE resolves first. Also: Giver's and Mother's colour is chosen **on resolution**, not activation (CR 700.2 — the ability isn't modal; 608.2d).
**Changes:** In any deck running white protection creatures, pro-white must be the last white-source ability on the creature to resolve. Against two spells where the second is mono-white, answer with **hexproof** (CR 702.11b — only stops opponents, so your own pending ability survives) or phasing, not a second protection activation. Note the knock-on: after pro-white, the pilot's own white targeted effects (Urdnan's double-strike trigger, Patriot, Clever Concealment) can't reach the creature that turn; blue sources still can.
**See also:** dmg-012, equip-020, equip-001
**Source:** cap-living-legend (2026-09-10) — pilot's Giver of Runes sequencing question

### Life-gain payoffs count EVENTS or AMOUNT — the difference is an order of magnitude on lifelink {#dmg-023}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Heliod, Sun-Crowned; Archangel of Thune; Light of Promise; Soul Warden; Ajani's Pridemate; Cradle of Vitality
**Rules:** 119.9, 603.2c, 603.6a, 702.15e
**Claim:** Heliod, Sun-Crowned and Archangel of Thune trigger once per life-gain *event*; Light of Promise ("put **that many** +1/+1 counters") scales with the *amount*. They reward opposite sources.
**Evidence:** CR 119.9 (each gain is an event), 603.2c (one event with several occurrences triggers repeatedly). Three tokens entering at once under Soul Warden = three separate 1-life events = three Heliod/Archangel triggers, three Light of Promise counters. A lifelink commander hitting for 5 = one event = one Heliod counter, one Archangel counter each — but **five** Light of Promise counters. Simultaneous lifelink sources are separate events (702.15e). Soul Warden has no controller clause, so opponents' creatures and tokens entering count (603.6a).
**Changes:** Pair event-counters (Heliod, Archangel, Ajani's Pridemate) with many small gains (Soul Warden family, token swarms); pair amount-counters (Light of Promise, Cradle of Vitality) with big single hits (lifelink on a large attacker). A lifelink voltron with Light of Promise roughly doubles its power every connected swing.
**See also:** dmg-001, dmg-015, dmg-024, repl-004
**Source:** cap-living-legend (2026-09-10) — v2 voltron research

### Double strike + lifelink + an amount-scaled counter trigger grows the creature BETWEEN damage steps {#dmg-024}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Light of Promise; Sunbond
**Rules:** 117.4, 120.3f, 500.2, 510.1a, 510.3a, 510.4, 603.3, 702.4b, 702.4c, 702.15b, 702.19d, 702.19e, 903.10a
**Claim:** A double-striking lifelink creature enchanted with Light of Promise (or Sunbond — "whenever you gain life, put that many +1/+1 counters on this creature") hits in the regular damage step at roughly double the power it hit with in the first-strike step. It is a one-combat commander kill.
**Evidence:** CR 510.4 / 702.4b (second combat damage step for double strikers). Lifelink gain is part of the damage event (702.15b, 120.3f), so the trigger goes on the stack when a player would next receive priority — in the first-strike damage step (603.3, 510.3a) — and resolves before the step can end (117.4, 500.2). Power is read at assignment (510.1a). Both steps' damage is combat damage from the commander (510.4, 903.10a). Worked: 9/10 lifelink double strike → 9, +9 counters → 18 → 27 total. Trample through a chump: the blocker is dead before the second step, and a blocked trampler with no blockers left assigns all its damage to the player (702.19d — not 702.19e, which is planeswalkers).
**Changes:** Price double strike on a lifelink creature with an amount-scaled counter trigger as a multiplier on the second hit, not as ×2 damage. Watch the priority window in the first-strike step — removal there stops the second hit (702.4c), though damage already dealt stays.
**See also:** dmg-007, dmg-010, dmg-023, repl-004
**Source:** cap-living-legend (2026-09-10) — v2 gameplan

### Two lifelink sources on one creature are one lifelink — score the second as zero {#dmg-025}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Loxodon Warhammer; Shadowspear; Basilisk Collar
**Rules:** 120.3f, 702.2c, 702.15b, 702.15e, 702.15f, 702.19b
**Claim:** A second lifelink-granting Equipment on a creature that already has lifelink adds no life and no extra life-gain event.
**Evidence:** CR 702.15f — multiple instances of lifelink on the same object are redundant. The gain is still one event of the total damage dealt (702.15b, 120.3f); only *separate sources* dealing damage create separate events (702.15e).
**Changes:** When stacking voltron gear, value each piece only on what it adds that the creature doesn't already have. Loxodon Warhammer on a Shadowspear creature is +3/+0 for 6 mana; Basilisk Collar is deathtouch (which with trample means 1 damage per blocker, 702.2c + 702.19b), not lifelink.
**See also:** dmg-001, dmg-007, dmg-014
**Source:** cap-living-legend (2026-09-10) — Equipment pass

### Sequential "loses half their life" triggers recompute on resolution and compound {#dmg-026}

**Kind:** ruling · **Verified:** 2026-09-13 against CR 2026-08-07
**Cards:** Shredder, Shadow Master
**Rules:** 107.1, 107.1a, 119.3, 120.3a, 120.4c, 510.2, 510.3a, 603.3b, 615.1
**Claim:** Two instances of *"that player loses half their life, rounded up"* hitting the same player are not one pooled halving — each reads the life total at its own resolution, so they stack into a quarter.
**Evidence:** CR 510.2 (combat damage is dealt simultaneously, no action between assignment and dealing), 510.3a + 603.3b (all resulting triggers go on the stack together and you order yours), and each resolves separately — so each computes from the total left by the previous one. CR 107.1/107.1a (integers only; the card states the rounding). Worked: a player at 40 taking two 5-power hits → 40 − 10 = 30, first trigger takes ⌈30/2⌉ = 15 → 15, second takes ⌈15/2⌉ = 8 → **7**. Also: ⌈L/2⌉ ≥ 1 for every L ≥ 1, so a half-life *loss* always removes at least 1 and **always kills a player at 1**. Life loss is not damage (CR 119.3 vs 120.3a/120.4c), so 615.1 prevention cannot touch it — but the trigger is gated on combat damage connecting, so a Fog still blanks the whole package.
**Changes:** Price multiple half-life bodies pointed at one player as a compounding clock, not a doubled one (⌈⌈L/2⌉/2⌉, not L/2 twice). Complements the 2026-08-23 amplifier entry (dmg-009), which covers a single instance under a doubler.
**See also:** dmg-005, dmg-009
**Source:** rules question from the pilot (2026-09-13) — Shredder, Shadow Master

### "Damage can't be prevented" beats ONE of four defence families — sort the opponent's card before hoping {#dmg-027}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Teferi's Protection; The One Ring; Skullcrack; Worship; Angel's Grace; Phyrexian Unlife; Leyline of Sanctity; Witchbane Orb; Shalai, Voice of Plenty; Chandra's Ignition; Everlasting Torment
**Rules:** 101.2, 115.10a, 119.8, 120.7, 608.2b, 613.11, 614.1a, 615.1a, 615.12, 702.16b, 702.16e, 702.16j, 702.26b, 903.4
**Claim:** A burn deck loses to four structurally different things, and unpreventable-damage effects answer only the first. Sort any defensive card into the right family before assuming Skullcrack covers it.

| Family | Wording tell | CR | Beaten by "can't be prevented"? |
|---|---|---|---|
| **Prevention** (incl. protection's damage clause) | the word *prevent* | 615.1a, 702.16e/j | **Yes** — CR 615.12 |
| **Replacement** (Worship, Angel's Grace, Phyrexian Unlife) | the word *instead* | 614.1a | No |
| **Rules-modifying "can't"** (can't be targeted, life total can't change, damage can't be dealt) | the word *can't* | 613.11, 101.2 | No |
| **Existence / legality** (countered, phased out, target killed) | — | 608.2b, 702.26b | No |

**Evidence:** CR 615.12 — *"If unpreventable damage would be dealt, any applicable prevention effects are still applied to it. Those effects won't prevent any damage."* CR 101.2 — a "can't" effect takes precedence over an effect that allows or directs. CR 615.1a defines prevention by the word *prevent*, which is why **protection's damage clause is prevention** (702.16e/j) and therefore beatable, while its *can't be targeted* clause (702.16b/j) is not.
**The three that decide real games:** (1) **Teferi's Protection** also reads *"your life total can't change"* — that, not the protection, is what makes it unanswerable by damage; the damage is dealt and the life-loss result is simply impossible (101.2, 119.8). (2) **The One Ring is only protection from everything, no life lock** — so a *non-targeting* damage source plus an unpreventable-damage effect kills through it, and its protection arrives on a *triggered* ability, leaving a priority window to burn them in response. (3) **Player hexproof** (Leyline of Sanctity, Witchbane Orb, Shalai) blanks every targeted burn spell and is beaten outright by non-targeted damage (115.10a), with no prevention effect needed.
**Changes:** In any damage deck, the maximum-coverage kill is **non-targeted damage + a source whose colour dodges protection + an unpreventable-damage effect**. For Chandra's Ignition the *source is the creature, not the spell* (CR 120.7), so a **colourless** creature ignores protection from red entirely. Also check colour identity before reaching for the obvious enabler: Everlasting Torment is {2}{B/R}, identity {B,R}, and is **illegal in mono-red** (CR 903.4).
**See also:** dmg-021, build-013
**Source:** scarlet-witch (2026-09-16) — the pilot's "if an opponent casts Teferi's or a damage-can't-be-dealt card we're kinda cooked"; mtg-rules-expert

### A lifegain CONVERTER multiplies every life-gaining drainer; it is not another drainer {#dmg-028}

**Kind:** ruling · **Verified:** 2026-09-26 against CR 2026-08-07
**Cards:** Dina, Soul Steeper; Blood Artist; Zulaport Cutthroat; Bastion of Remembrance; Cauldron of Essence; Vito, Thorn of the Dusk Rose
**Rules:** 119.3, 119.9
**Claim:** Dina, Soul Steeper next to Blood Artist / Zulaport / Bastion / Cauldron is not a fifth copy of the same effect. Each of those *gains life* on a death, so each is a separate lifegain event and each fires the converter again.
**Evidence:** CR 119.3 (gaining N life is one event) and CR 119.9 ("whenever a source causes you to gain life"). One creature dying with four life-gaining drainers out = four gain events = four Dina triggers at 1 to **each** opponent, on top of the four originals - the death is worth 8 to the table instead of 4. upgrade-test has 16 lifegain event sources. Note the wording split: Dina says "each opponent", Vito says "**target** opponent", so they stack rather than overlap.
**Changes:** Count converters and life-gaining drainers as two different roles and rate the first by the count of the second. §2.5's "redundant is not a cut reason" has a sharper form here - these are genuinely multiplicative (§2.5 case 3), not substitutes.
**See also:** dmg-001, dmg-015
**Source:** chatterfang / upgrade-test (2026-09-26) — wave 6

### A +1-per-instance damage additive is a doubler on a ping engine; compare it to multipliers by instance count {#dmg-029}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** Tomik, Izzet Sparkmage; Solphim, Mayhem Dominus
**Rules:** 616.1
**Claim:** "+1 to each noncombat damage event aimed at opponents" equals ×2 on 1-damage pings and matches Solphim on most of a punisher deck's output for {R}. Under a ×3 multiplier the multiplier is applied first, so the +1 is worth much less.
**Evidence:** Tomik, Izzet Sparkmage: *"If a source you control would deal noncombat damage to an opponent or a permanent an opponent controls, it deals that much damage plus 1 instead."* Opponent-only, so it passes lord-of-pain's opponent-restricted-amplifier rule. CR 616.1: the affected player orders replacement effects. lord-of-pain formulas.md per-draw row goes 8 → 14 with Tomik alone. TVS break-even vs a 1-damage pinger: E ≥ 1 events per spell with no multiplier, E ≥ 3 under ×3.
**Changes:** Score additives by (instances per cycle × addend). State the multiplied and unmultiplied break-evens before proposing one.
**See also:** dmg-004, repl-001
**Source:** lord-of-pain / vision-scarlet-witch (2026-09-28), FRA review
