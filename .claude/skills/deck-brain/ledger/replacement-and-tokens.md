# Ledger: Replacement effects, tokens and counters

Replacement effects and who orders them; token creation and the adders, splitters and multipliers that modify it; counters and counter doublers. Entry format and capture rules: `../SKILL.md` §4.
Search every topic at once with `bun run lookup "<card | rule number | term>"`.

---

### Replacement effects are ordered by the AFFECTED player — or the affected object's controller {#repl-001}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Ojer Axonil, Deepest Might; Fiery Emancipation; Torbran, Thane of Red Fell; Panther Habit; Mjölnir, Hammer of Thor; Bruvac the Grandiloquent; The Water Crystal
**Rules:** 614.5, 615.5, 616.1, 616.1e, 616.1f, 701.10g
**Claim:** When two or more replacement (or prevention) effects want to modify the same event, the affected player — or the affected object's controller — chooses the order. For damage or mill aimed at an opponent, **they** choose, and they will always choose the order that hurts them least; aim your own damage at your own creature and the ordering choice is **yours**.
**Evidence:** CR 616.1 — *"the affected object's controller (or its owner if it has no controller) or the affected player chooses one to apply."* CR 616.1e — *"Any of the applicable replacement and/or prevention effects may be chosen"*; CR 616.1f reapplies the process to the modified event. CR 701.10g — *"To double an amount of damage a source would deal, that source instead deals twice that much damage. **This is a replacement effect.**"* CR 615.5 — the prevention effect's rider *"takes place immediately afterward"*, so it measures the **doubled** amount. CR 614.5 caps each effect at one application (N → 2N, never 4N). Mill: Bruvac the Grandiloquent doubles; The Water Crystal adds four. Applying Bruvac first to N gives 2N+4; Water Crystal first gives 2N+8.
**Changes:** This decides every damage-booster comparison. Work out the two orders and assume the opponent picks the minimum.

- **Multiplier × multiplier — stacks cleanly.** Multiplication commutes, so order is irrelevant. A doubler and a tripler are genuinely 6×.
- **Floor + multiplier — does NOT stack.** Ojer Axonil (floor of 4) with Fiery Emancipation (triple), on a 2-damage source: floor first is 2 → 4 → **12**; multiplier first is 2 → 6, and the floor no longer applies because 6 isn't less than 4 → **6**. They take 6, which is what the multiplier does alone. **A floor contributes zero alongside a multiplier.**
- **Additive + multiplier — nets out ahead.** Torbran (+2) with the same tripler: +2 first is 2 → 4 → 12; triple first is 2 → 6 → **8**. They take 8, still better than 6. An additive booster genuinely adds, and it also applies to damage already far above any floor.
- **Mill (2026-09-16).** With Bruvac and The Water Crystal both out, the opponent being milled picks which applies first, and will pick the one that mills them less. Plan on the smaller number. Never add two mill multipliers and quote the best-case number; the victim controls the order. The same rule governs stacked damage-prevention and life-gain replacements aimed at opponents.
- **Your own creature (2026-09-09).** Damage doubling is a replacement effect, and when it collides with a prevention effect on the same damage event the **affected object's controller** chooses which applies first. Aiming your own damage at your own creature therefore hands you the ordering choice, and "double first, then prevent" is always available. Two consequences. (1) A damage-to-counters or damage-to-life-gain converter scales with your doublers, not with the printed number — cost it at 2× before comparing. (2) The mirror image: when you aim damage at an **opponent's** shielded creature, CR 616.1 gives *them* the ordering choice and they will prevent first, so never count on a doubler pushing through a prevention shield you don't control. Same rule, opposite outcome, purely because of who is affected.

**See also:** dmg-004, dmg-009, dmg-020, dmg-021, dmg-029, repl-010, eval-028, eval-002
**Source:** scarlet-witch (2026-08-06), Ojer Axonil evaluation; captain-america (2026-09-09, merged from "When a doubler and a prevention-with-a-rider both hit YOUR creature, YOU pick the order") — Mjölnir + Panther Habit on a self-aimed Throw; cap-living-legend (2026-09-16, merged from "When two replacement effects apply, the AFFECTED player chooses the order") — Bruvac + The Water Crystal

### The Ozolith catches a commander's counters, keyword counters included, on the way to the command zone {#repl-002}

**Kind:** ruling · **Verified:** 2026-09-07 against CR 2026-08-07
**Cards:** The Ozolith; Tyrite Sanctum; Flawless Maneuver
**Rules:** 122.1b, 122.2, 122.5, 122.8, 400.7, 603.6c, 603.10a, 903.9a, 903.9b
**Claim:** When a commander with counters dies (or is exiled/tucked) and is moved to the command zone, The Ozolith's leaves-the-battlefield trigger sees the counters and puts the same number of *each kind* on itself, keyword counters included; at the next beginning of combat all of them can be moved onto the recast commander, a new object. An indestructible counter therefore survives the commander leaving.
**Evidence:** CR 603.6c (leaves-the-battlefield = moves from the battlefield to another zone); CR 603.10a (look-back); CR 903.9a–b (the command-zone move is a replacement on the zone change, still a leave); CR 122.8 (leaves-the-battlefield counter transfer puts "the same number of each kind of counter", not "move"); CR 400.7 / 122.2 (the recast is a new object but the trigger only needs "target creature"); CR 122.5 (move = remove and put onto a second object); CR 122.1b (keyword counters grant the keyword; indestructible is one).
**Changes:** For any counter-growth voltron commander, The Ozolith is the one card that fills the *non-targeting / edict / exile-wrath* row of the protection matrix (2026-08-21) — not by saving the body but by saving the growth. Pilot sequencing: recast **precombat** so the beginning-of-combat trigger has a target. Price an indestructible counter (Tyrite Sanctum's second ability, Flawless Maneuver counters, etc.) as *permanent across recasts* in any Ozolith deck — the recast commander regains it at combat. The same holds for shield, flying, lifelink and every other keyword counter.
**See also:** dmg-016, dmg-017
**Source:** vision-scarlet-witch (2026-09-03) — founding build; verified by mtg-rules-expert; vision-scarlet-witch (2026-09-07, merged from "The Ozolith carries keyword counters too — an indestructible counter survives the commander leaving") — Tyrite Sanctum + The Ozolith

### "Remove all counters from all permanents" kills every planeswalker, yours included {#repl-003}

**Kind:** ruling · **Verified:** 2026-09-03 against CR 2026-08-07
**Cards:** Thief of Blood; Vampire Hexmage; Door of Destinies
**Rules:** 614.1c, 704.5i, 722
**Claim:** Loyalty counters are counters. A card that removes all counters from all permanents (Thief of Blood, Vampire Hexmage on one target) sends every planeswalker on the battlefield to the graveyard, and it does not distinguish your permanents from opponents'. "Prepared" is a designation, not a counter, so preparation cards are untouched.
**Evidence:** CR 704.5i — *"If a planeswalker has loyalty 0, it's put into its owner's graveyard."* CR 614.1c — *"As [this permanent] enters"* effects are replacement effects, so there is no trigger to respond to after resolution. CR 722 / glossary "Prepared" — a designation.
**Changes:** Before adding any mass counter-removal, list your own counter-bearing permanents — +1/+1 growers, charge-counter artifacts (Door of Destinies), and planeswalkers — and count them as casualties. In a deck whose commander distributes +1/+1 counters, that count is the whole board. Score the card as a pod-specific hate piece, not as a body.
**See also:** repl-006, repl-016
**Source:** edgar-markov (2026-09-03) — pilot asked about Thief of Blood for both builds

### Lae'zel's "+1 counter" applies once per placement event on EACH permanent, never per counter {#repl-004}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Lae'zel, Vlaakith's Champion; Iron Spider, Stark Upgrade; Doubling Season; Light of Promise; Soul Warden; Heliod, Sun-Crowned; Archangel of Thune
**Rules:** 119.9, 122.6, 122.7, 301.7, 603.2c, 614.1, 614.1a, 614.1c, 614.5, 616.1, 616.1e, 616.1f, 702.15b
**Claim:** When one ability puts a counter on each of several permanents, Lae'zel, Vlaakith's Champion adds +1 to *every* permanent, not +1 to the event. But when a single resolving effect puts N +1/+1 counters on one creature (Light of Promise's "that many"), that is one event: Lae'zel-style "that many plus one" makes it N+1, not 2N, and a "whenever one or more +1/+1 counters are put on this creature" trigger fires once.
**Evidence:**
- *Per permanent:* Lae'zel: "put that many plus one ... on **that permanent** or player instead." CR 614.1 applies a replacement as the event affects each object; 616.1 frames ordering around "the affected object's controller." Iron Spider on four artifact creatures = 8 counters, not 5. Lae'zel does **not** reach an uncrewed Vehicle — "creature or planeswalker" and an uncrewed Vehicle is neither (CR 301.7). "Enters with X counters" is also covered (614.1c, 122.6). Two "+1" effects add, never multiply (616.1e–f): 1 → 3.
- *Once per event:* CR 614.1a/614.5 (a replacement effect gets one opportunity per event), 122.6/122.7 (counters "put on" an object in one instruction), 603.2c (one trigger per event). The CR has no single sentence saying "N counters from one instruction = one event"; it follows from 614.5 and Lae'zel's own "one or more counters … that many plus one" wording. Worked (verified): a 9-point lifelink hit = one 9-life gain (702.15b, 119.9) → Heliod 1 counter, Archangel 1 each, Light of Promise 9; with Lae'zel 2 + 2 + 10 = 14 on the commander. Nine separate 1-life gains instead would give nine triggers of each and 18 from Light of Promise alone.
**Changes:** Price Lae'zel-style effects as a board-wide multiplier on mass counter placers, not as a single +1 — and as "+1 per event": count events, not counters. Additive counter amplifiers reward *many small placements* (Soul Warden swarms, per-event payoffs), not one big one. Ordering only matters when a +1 effect meets a true doubler (Doubling Season): +1 then double beats double then +1, and the affected permanent's controller chooses.
**See also:** dmg-023, dmg-024, repl-001, repl-008, repl-010, repl-013
**Source:** cap-living-legend (2026-09-10) — pinger variant study; cap-living-legend (2026-09-10, merged from "N counters from one instruction are ONE placement event — a "+1" amplifier adds once") — pilot's Heliod question

### Delney's power-2 gate turns OFF under your own counter engine {#repl-005}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Delney, Streetwise Lookout; Stuffy Doll; Iron Spider, Stark Upgrade; Kotori, Pilot Prodigy; Mighty Servant of Leuk-o
**Claim:** Delney, Streetwise Lookout ("If a triggered ability of a creature you control with power 2 or less triggers, that ability triggers an additional time") stops doubling a creature the moment your own +1/+1 counters push it to power 3.
**Evidence:** Power is checked when the ability triggers. Stuffy Doll (0/1) under Iron Spider's two activations a turn is a 2/3 after one turn and a 4/5 after two, and Delney no longer applies.
**Changes:** Same family as the Kotori / Mighty Servant finding — a card that *raises* a number can silently disable a card gated on that number staying low. Before pairing a "power N or less" payoff with an anthem or counter engine, check whether the engine hits the payoff itself.
**See also:** equip-021, equip-027, trig-002
**Source:** cap-living-legend (2026-09-10)

### Vorinclex doubles YOUR planeswalkers' starting loyalty and halves opponents' {#repl-006}

**Kind:** ruling · **Verified:** 2026-09-12 against CR 2026-08-07
**Cards:** Vorinclex, Monstrous Raider
**Rules:** 107.1a, 122.6, 122.6a, 209.1, 306.5b, 606.6, 614.1c, 704.5i
**Claim:** Vorinclex, Monstrous Raider modifies planeswalker starting loyalty in both directions: your walkers enter with 2× printed loyalty, opponents' enter with half rounded down, and an opponent's printed-1 walker enters at 0 and is put into the graveyard immediately.
**Evidence:** CR 209.1 + 306.5b — a planeswalker has the intrinsic ability *"This permanent enters with a number of loyalty counters on it equal to its printed loyalty number,"* which *"creates a replacement effect (see rule 614.1c)."* CR 122.6 — counters "put on" an object covers *"an object that's given counters as it enters the battlefield."* CR 122.6a — *"If the effect doesn't specify a player, the object's controller puts those counters on it"* — this is the load-bearing rule, because Vorinclex is worded by WHO puts the counters, and Gatherer's 2021-02-05 ruling says it *"cares deeply about who is putting the counters."* So an opponent's own walker is *them* putting counters → halved. CR 704.5i — *"If a planeswalker has loyalty 0, it's put into its owner's graveyard"* (state-based, no stack). Rounding is on the card ("rounded down"), as CR 107.1a requires.
**Changes:** Treat any counter doubler/halver as a planeswalker-loyalty effect. Under your own Vorinclex, printed-5 walkers come down at 10 with their ultimate already live (606.6 gates `[-N]` on having the counters, so doubled entry genuinely unlocks turn-one ultimates). Under an *opponent's* Vorinclex, score your own 1-loyalty walkers as uncastable and everything else at half.
**See also:** repl-003, repl-007, repl-008
**Source:** rules question from the pilot's pod (2026-09-12) — opponent claimed double loyalty; claim was correct

### "If YOU would put" doubles loyalty-ability costs; "if an EFFECT would put" does not {#repl-007}

**Kind:** ruling · **Verified:** 2026-09-12 against CR 2026-08-07
**Cards:** Vorinclex, Monstrous Raider; Doubling Season; Carth the Lion
**Rules:** 107.7, 118.1, 606.4, 606.5, 614.5, 614.16, 614.17b
**Claim:** Vorinclex doubles the `[+N]` loyalty-ability cost (you put 2 counters for a `[+1]`), where Doubling Season explicitly does not. The deciding word is "you" vs "an effect."
**Evidence:** CR 107.7 — *"`[+N]` means 'Put N loyalty counters on this permanent'"*; CR 606.4 — the cost to activate a loyalty ability *"is to put on or remove from that permanent a certain number of loyalty counters… This cost may be modified by other effects"*; CR 118.1 (paying a cost = carrying out the instruction). Vorinclex reads *"If **you** would put one or more counters…"* with no effect-qualifier, so it replaces the cost-payment event. Doubling Season reads *"If **an effect** would put…"* and its official ruling says the `[+1]` is not doubled *"because those counters are put on as a cost, not as an effect."* CR 614.16 limits only the "if an effect would" template. Corollaries: an opponent's `[+1]` under your Vorinclex puts 0 (event replaced, not forbidden — the ability is still activatable, cf. 614.17b); `[0]` stays 0; Carth the Lion merges into a single cost first (606.5), so Carth + `[+1]` = one `[+2]` → Vorinclex doubles once (614.5) → 4.
**Changes:** Before scoring any counter amplifier, read which template it uses. "If an effect would put" misses every cost-paid counter (loyalty `[+N]`, cumulative upkeep, counter-paying activations); "if you would put" catches them. Same split decides whether the amplifier helps a planeswalker subtheme at all beyond entry.
**See also:** repl-006
**Source:** rules question from the pilot's pod (2026-09-12), verified by mtg-rules-expert

### A counter/token doubler entering SIMULTANEOUSLY with its target does not apply {#repl-008}

**Kind:** ruling · **Verified:** 2026-09-12 against CR 2026-08-07
**Cards:** Vorinclex, Monstrous Raider; Doubling Season; Lae'zel, Vlaakith's Champion
**Rules:** 614.4, 614.5, 614.12, 616.1, 616.1e, 616.1f
**Claim:** A replacement effect that modifies how a permanent enters only applies if it already exists at that moment, so a doubler arriving in the same event (mass reanimation, a simultaneous blink, a board-wide ETB) does nothing for the permanents entering alongside it.
**Evidence:** CR 614.12 — check the entering permanent against *"continuous effects that **already exist** and would apply to the permanent."* CR 614.4 — replacement effects *"must exist before the appropriate event occurs — they can't 'go back in time'."* CR 614.5 — each replacement effect gets *"only one opportunity to affect an event."* CR 616.1/616.1e–f — with multiple applicable effects the **entering permanent's controller** chooses the order, one at a time.
**Changes:** When pricing a doubler, count only the permanents that enter *after* it. Do not value a reanimation spell that returns Vorinclex/Doubling Season alongside the payoff as if the doubler applied. Ordering only matters when effects don't commute — multipliers commute, so a doubler plus a doubler is 4× in any order, but a multiplier meeting an additive or a subtractive (compleated's −2, Lae'zel's +1) flips on order, and the controller of the entering permanent picks the best one.
**See also:** repl-004, repl-006, repl-010
**Source:** rules question from the pilot's pod (2026-09-12) — Vorinclex + planeswalkers

### A myriad-shaped ability that SACRIFICES its tokens is an aristocrats engine; real myriad exiles and gives nothing {#repl-009}

**Kind:** ruling · **Verified:** 2026-09-13 against CR 2026-08-07
**Cards:** Shredder, Shadow Master; Blade of Selves; Blood Artist; Zulaport Cutthroat; Mayhem Devil
**Rules:** 111.7, 701.21a, 702.116b
**Claim:** The clean-up clause is the whole evaluation. "Sacrifice those tokens at end of combat" routes N bodies through the graveyard every combat; myriad's "exile the tokens at end of combat" triggers nothing.
**Evidence:** CR 701.21a — *"To sacrifice a permanent, its controller moves it from the battlefield directly to its owner's graveyard"* — so the tokens **die**, firing Blood Artist / Zulaport Cutthroat / Mayhem Devil / "whenever one or more creatures die" / "whenever you sacrifice". CR 111.7 — a token in a non-battlefield zone ceases to exist, but *"applicable triggered abilities will trigger before the token ceases to exist."* Exile is not a death and triggers none of it. Companion facts: CR 702.116b only merges *multiple instances of myriad*, so a printed myriad-shaped ability **stacks** with granted myriad (Blade of Selves) for two separate token sets; CR 701.21a also notes sacrifice bypasses destruction replacement and indestructible. Edge case: you cannot sacrifice a token whose control has changed (701.21a — can't sacrifice what you don't control), so it survives the turn.
**Changes:** Read the clean-up verb before scoring any token-copy attacker. "Sacrifice" makes the card an aristocrats payoff worth pairing with drain outlets; "exile" makes it combat damage only. Same read applies to mobilize and other temporary-token mechanics.
**See also:** repl-012, eval-035
**Source:** rules question from the pilot (2026-09-13) — Shredder, Shadow Master vs Blade of Selves

### Token replacement ordering: fixed adders, then splitters, then Chatterfang; uniform doublers go anywhere {#repl-010}

**Kind:** ruling · **Verified:** 2026-09-26 against CR 2026-08-07
**Cards:** Peregrin Took; Tippy-Toe, Terrific Partner; Bilbo, Fellow Conspirator; Academy Manufactor; Chatterfang, Squirrel General; Doubling Season; Parallel Lives; Bitterblossom; Mirkwood Bats; Orcrist, Goblin-cleaver; Camellia, the Seedmiser; Lae'zel, Vlaakith's Champion
**Rules:** 614.5, 614.16, 616.1, 616.1e, 616.1f, 616.1g
**Claim:** When several token-replacement effects want the same event, you choose the order (CR 616.1), and the order changes the total by a large factor: apply **fixed adders first** (Peregrin Took / Tippy-Toe, +1 token), **splitters second** (Bilbo, Academy Manufactor: one token becomes several), and Chatterfang after every splitter. A uniform doubler (Doubling Season, Parallel Lives) is a ×2 on the whole event and **commutes with everything** — putting it after Chatterfang doubles the Squirrels too and yields the same total — so the binding constraint is only that **Chatterfang must come after Academy Manufactor and Bilbo**, because those replace only Clue/Food/Treasure tokens and cannot see Squirrels.
**Evidence:** CR 616.1/616.1e — the affected object's controller chooses which applicable replacement effect to apply, one at a time; 616.1f — repeat with whatever is now applicable, so Manufactor (which has nothing to act on in a Squirrel-only event) becomes applicable once Tippy-Toe adds the Food; 616.1g uses Doubling Season by name; 614.5 — each effect gets one opportunity per event *or any modified event that replaces it*; 614.16 — "if an effect would create one or more tokens" effects also see tokens made by another replacement effect. Manufactor's official ruling (2021-06-18): *"would create some number of Clue, Food, or Treasure tokens, you will instead create that many Clue tokens, that many Food tokens, and that many Treasure tokens."* Worked examples:
- **One Faerie (Bitterblossom), Tippy-Toe + Manufactor + Chatterfang (2026-09-24):** Tippy → Faerie + Food; Manufactor → Faerie + Clue + Food + Treasure; Chatterfang → +4 Squirrels = **8 tokens**. Chatterfang first → Faerie + Squirrel; Tippy → + Food; Manufactor → Faerie + Squirrel + Clue + Food + Treasure = **5 tokens**. Getting it backwards on a single-token event costs three tokens, not one. Multipliers commute with each other (×2 then ×2), so their mutual order never matters.
- **One "create a Food token", Bilbo + Academy Manufactor + Chatterfang (2026-09-25, verified):** **12 tokens** in the order Bilbo → Manufactor → Chatterfang, and only 5–8 in any other order. Chatterfang last is worth 90 tokens vs 60 on a 15-Treasure batch.
- **One "create a Treasure", all six orderings of Manufactor / Doubling Season / Chatterfang (2026-09-26):** **12** for M→DS→CF, **M→CF→DS** and DS→M→CF; **8** for DS→CF→M, CF→M→DS, CF→DS→M. The Clue/Food/Treasure portion is always 6 (×3 Manufactor, ×2 doubler, order-independent); only the Squirrel count moves, and it is set by whether Chatterfang copies a pool Manufactor has already tripled.
**Changes:** When explaining or playing a token turn, state the full order, not just "Food-adder first": **everything that increases the count goes before anything that scales it.** Write the ordering down for the deck once and put it in `research/gameplan.md`. For Chatterfang the law is: Peregrin Took → Tippy-Toe → Bilbo → Academy Manufactor → Chatterfang. Keep telling pilots "Chatterfang last" — it always reaches the maximum and is one thing to remember. But do not justify it with "anything after Chatterfang is worth face value"; that is false for doublers. When the question is *which* effect to sequence, the rule is **splitters before the token-adder, doublers anywhere**. Generalises the two-effect Camellia-loop ordering entry and the Lae'zel "+1 then double" note (repl-004).

**Bonus break-even, verified:** with Bilbo and Manufactor both out, apply **Bilbo first iff 3 × (Foods in the event) > (total Clue/Food/Treasure in the event)**. With Peregrin Took and Tippy-Toe adding two Foods to a one-Treasure event that is 2 Foods of 3 tokens, so Bilbo first — 15 going into the doublers versus 12 for Manufactor-first. Full board maximum from one Treasure: **120 tokens** (20 Clues, 20 Foods, 20 Treasures, 60 Squirrels), and 120 Mirkwood Bats triggers.
**History:** On 2026-09-24 this ledger stated the best order as **adders → Manufactor → multipliers**, grouping Chatterfang / Doubling Season / Parallel Lives as multipliers that "scale the whole event", and on 2026-09-25 as fixed adders → splitters → **count-multipliers last**, which gave "Chatterfang always LAST" its reason; refined on 2026-09-26 because a uniform doubler commutes with everything (all six orderings checked), so only the splitters fix Chatterfang's position. "Chatterfang last" is still a safe heuristic, but its stated reason was wrong.
**See also:** repl-001, repl-004, repl-008, repl-013, repl-014, repl-015, loop-011
**Source:** chatterfang (2026-09-24) — pilot asked how Chatterfang and Tippy-Toe interact; chatterfang (2026-09-25, merged from "Replacement-effect ordering law: fixed adders, then splitters, then multipliers") — Orcrist / Academy Manufactor maths; chatterfang / upgrade-test (2026-09-26, merged from "REFINEMENT: token DOUBLERS commute; only the splitters fix Chatterfang's position") — pilot's Doubling Season question

### Token-copy ABILITIES are token creation and fire "whenever you create a token"; a copy of a permanent SPELL is not "created" {#repl-011}

**Kind:** ruling · **Verified:** 2026-09-25 against CR 2026-08-07
**Cards:** Second Harvest; Mirkwood Bats; Chatterfang, Squirrel General; Tippy-Toe, Terrific Partner; Mondrak, Glory Dominus; Scute Swarm; Hazel of the Rootbloom; Saw in Half; Ancient Greenwarden
**Rules:** 111.13, 603.2c, 608.3f, 614.6
**Claim:** Second Harvest (and any "create a token that's a copy" effect) triggers Mirkwood Bats-style *"whenever you create … a token"* payoffs once per token, including the extra tokens that Chatterfang, Tippy-Toe or a doubler add to the event. Effects that copy a permanent *spell* are the exception: they produce a token that was never "created", so Chatterfang/Mondrak-style token-adders add nothing and "whenever you create a token" payoffs never trigger.
**Evidence:** Second Harvest: *"For each token you control, create a token that's a copy of that permanent."* Mirkwood Bats: *"Whenever you create or sacrifice a token, each opponent loses 1 life."* CR 603.2c — one event with multiple occurrences triggers once per occurrence (Bats says "a token", not "one or more"). CR 614.6 — the modified event is what happens, *"which may in turn trigger abilities,"* so Squirrels and Foods added by replacement effects are created tokens too. Second Harvest counts **every** token, including Food, Treasure and Clue, not just creatures. With N tokens, Tippy-Toe then Chatterfang: N copies + 1 Food + (N+1) Squirrels = **2N+2 Bats triggers**, and each of those tokens triggers Bats again when sacrificed. The spell-copy exception (2026-09-25): CR 111.13 / 608.3f — a copy of a permanent spell becomes a token as it resolves and "is not 'created' for the purposes of any replacement effects or triggered abilities that refer to creating a token." Scute Swarm ("create a token that's a copy of this creature") and Hazel of the Rootbloom's end-step copy are *abilities creating tokens* and do get the Chatterfang Squirrel and the Mirkwood Bats trigger. Saw in Half, which makes its two halved copies via the death of a creature rather than by copying a spell, must be read on its own wording before being counted as synergy.
**Changes:** Value a token-copy spell in a create-payoff deck at the full post-replacement token count, not at N. It is a drain spell in its own right with Bats out, before any sacrifice. Before adding a "copy" card to a token-adder deck, check whether it copies a **spell** (dead for token-adders) or creates a token copy of a **permanent** (live). This is the same read-the-wording discipline as per-token vs per-batch payoffs.
**See also:** repl-010, repl-013
**Source:** chatterfang (2026-09-24) — pilot asked whether Second Harvest triggers Mirkwood Bats; chatterfang (2026-09-25, merged from "A token COPY of a permanent spell is not "created" — token-adders and per-token drain both miss it") — Chatterfang Gatherer rulings surfaced while verifying Ancient Greenwarden

### Tokens added by a doubler inherit the "sacrifice them later" instruction — doubled mobilize is a death engine {#repl-012}

**Kind:** ruling · **Verified:** 2026-09-24 against CR 2026-08-07
**Cards:** Anointed Procession; Infantry Shield; Caesar, Legion's Emperor; Grave Pact; Dictate of Erebos
**Rules:** 603.2c, 702.181a
**Claim:** When a token doubler adds tokens to a mobilize / "sacrifice at the next end step" event, every copy is sacrificed. Each is a separate death for per-creature payoffs and for Grave Pact / Dictate of Erebos.
**Evidence:** Anointed Procession ruling 2017-04-18: if an effect creates tokens and then tells you to do something to them, *"you'll do that for all the tokens."* CR 702.181a (mobilize), 603.2c (one trigger per creature dying). Infantry Shield on a power-4 Caesar under Procession is 8 Warriors that attack, then 8 deaths at end step.
**Changes:** Count a mobilize equipment under a doubler as a sacrifice engine, not only as an attack bonus. A deck with Grave Pact gets an opponent-side edict for each of those deaths.
**See also:** repl-009, eval-035
**Source:** caesar (2026-09-24) — founding build

### Each separate token EVENT gets the whole replacement chain — N events beat one event of N, and trigger-doublers multiply with token-adders {#repl-013}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** Ancient Greenwarden; Scute Swarm; Chatterfang, Squirrel General; Mirkwood Bats; Avenger of Zendikar; Tireless Tracker; Pitiless Plunderer; Academy Manufactor; Bilbo, Fellow Conspirator; Peregrin Took; Tippy-Toe, Terrific Partner
**Rules:** 603.2c, 603.2d, 608.2, 614.1a, 614.4, 614.5, 614.16, 616.2
**Claim:** Because CR 614.5 grants each replacement effect **one opportunity per event**, a trigger that fires N times and creates one token each time is worth far more than a single effect creating N tokens at once — the whole replacement chain re-applies to every separate event. Likewise doubling a *trigger* and doubling a *token count* stack multiplicatively, because each extra trigger resolves as its own event and a token-adding replacement effect gets one opportunity per event.
**Evidence:**
- *Trigger doublers (2026-09-25):* CR 603.2d — an "additional time" effect makes you determine the total and the ability triggers that many times, resolving separately. CR 614.5 — "A replacement effect doesn't invoke itself repeatedly; it gets only one opportunity to affect an event." So Ancient Greenwarden ("If a land entering causes a triggered ability of a permanent you control to trigger, that ability triggers an additional time") + Scute Swarm + Chatterfang on one land drop = 2 separate creation events, each getting its own Chatterfang Squirrel, and a per-token payoff (Mirkwood Bats) counts both events separately. Greenwarden doubles only abilities a **land entering** caused: Avenger of Zendikar's landfall counters yes, its own ETB Plant-making no; Tireless Tracker's investigate yes, its sacrifice-a-Clue trigger no. It never touches Chatterfang, which is a replacement effect (CR 614.1a, 614.16), not a triggered ability. Two Greenwardens would give 3 triggers, not 4 (603.2d).
- *Per-event granularity (2026-09-28):* Verified on the Chatterfang board of Chatterfang + Academy Manufactor + Bilbo + Peregrin Took + Tippy-Toe. One Treasure through the optimal chain (`adders → Bilbo → Manufactor → Chatterfang`) is **30 tokens** (5 Clues, 5 Foods, 5 Treasures, 15 Squirrels) — confirmed as the maximum by exhausting all nine legal orderings. Then:
  - **15 separate one-Treasure events** (Pitiless Plunderer triggering once per Squirrel death, CR 603.2c) = 15 x 30 = **450 tokens**.
  - **One event creating 15 Treasures** = (0,0,15) -> +2 Food -> Bilbo -> 19 -> Manufactor -> 57 -> Chatterfang -> **114 tokens**.

  Same 15 Treasures, **3.9x** the output, purely from per-event granularity. CR 614.5: *"it gets only one opportunity to affect an event or any modified events that may replace that event"* — a *different* event is a new opportunity. CR 616.2 is what chains them (*"A replacement effect can become applicable to an event as the result of another replacement effect that modifies the event"*).
**Changes:** In a tokens deck, a trigger-doubler and a token-doubler are **not** the same purchase and do not overlap — price both. Before buying a trigger-doubler, list which of your triggers its qualifier ("caused by a land entering") actually reaches. When evaluating token producers in a multiplier shell, count **events, not tokens**; when choosing between two otherwise similar cards, prefer the one whose tokens arrive as **many events**. A "whenever a creature dies, create a Treasure" engine beats a "create N Treasures" one-shot at equal token count. It also means a per-death Treasure maker (Pitiless Plunderer) is a **multiplier** in this shell, not a ramp card — which is why it survived a cut nomination. Caveat to state at the table: players get priority between each of the N resolutions (CR 608.2), so an opponent can shrink the payoff by removing a splitter mid-cascade (CR 614.4 — the effect must exist before the event).
**See also:** repl-004, repl-010, repl-011, repl-015, trig-014, trig-007
**Source:** chatterfang (2026-09-25) — Ancient Greenwarden evaluation; upgrade-test (2026-09-28, merged from "N separate token events beat one event making N tokens, by ~4x") — pilot asked for the token flow with six permanents on board

### Peregrin Took and Tippy-Toe are per-EVENT token-adders, not Food-adders {#repl-014}

**Kind:** ruling · **Verified:** 2026-09-25 against CR 2026-08-07
**Cards:** Peregrin Took; Tippy-Toe, Terrific Partner; Bilbo, Fellow Conspirator; Camellia, the Seedmiser
**Claim:** Both read "if **one or more tokens** would be created under your control, those tokens plus an additional Food token are created instead." They fire on **every** token-creation event of any kind — Squirrels, Treasures, Clues — and add exactly **one** Food per event, not per token.
**Evidence:** Oracle text via `bun run card`, verified 2026-09-25 by mtg-rules-expert.
**Changes:** In any token deck, read this template as "a free Food on every token event", which makes it an untapped-mana faucet attached to the whole engine rather than a narrow Food payoff. It also means a *genuine* Food-adder (Bilbo, Fellow Conspirator: "if you would create a Food token, instead create a Food token and a Treasure token") is a different card doing a different job, and the two stack.
**History:** Before 2026-09-25 I had described them twice as "Food-adders" that only trigger off Food creation, which understated them badly; corrected on 2026-09-25 against their oracle text. This supersedes the 2026-09-23 Camellia/Food entries' description of these two cards.
**See also:** repl-010, repl-013, loop-011
**Source:** chatterfang (2026-09-25) — Food/Treasure multiplication pass

### Academy Manufactor replaces a whole BATCH, not one token of it {#repl-015}

**Kind:** ruling · **Verified:** 2026-09-25 against CR 2026-08-07
**Cards:** Academy Manufactor; Orcrist, Goblin-cleaver
**Rules:** 614.5, 700.1
**Claim:** An effect creating N Clue/Food/Treasure tokens at once becomes N Clues + N Foods + N Treasures, not "N−1 plus one of each."
**Evidence:** Official Gatherer ruling 6/18/2021 — *"If you control one Academy Manufactor and would create some number of Clue, Food, or Treasure tokens, you will instead create that many Clue tokens, that many Food tokens, and that many Treasure tokens."* CR 700.1 (one event), CR 614.5 — the one-opportunity limit stops Manufactor re-applying to its **own output**; it does not limit the application to a single token.
**Changes:** Price batch-token cards (Orcrist, Goblin-cleaver: "create a Treasure for each creature you control of that type") as `batch x 3` with Manufactor out, then apply the token-adder last. This is the general shape for every "instead create one of each" replacement.
**See also:** repl-010, repl-013
**Source:** chatterfang (2026-09-25)

### Empower Jace: one token, one activation a turn, and a doubler kills the spare {#repl-016}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** Jace, Wielder of Mysteries; Anointed Procession; Parallel Lives; Doubling Season; Cruel Celebrant; Edgar, Ancient Bloodlord; Chatterfang, Squirrel General
**Rules:** 606.3, 700.4, 704.5i
**Claim:** Empower puts loyalty only on a Jace *token* (never a Jace card), the token activates once per turn, so every "Way of the …"/empower card is at most one card a turn. A token doubler makes a second 0-loyalty Jace that dies at once.
**Evidence:** Reality Fracture release notes (the local CR is dated 2026-08-07 and has no empower rule): *"create a blue Jace planeswalker token with 0 loyalty … Choose a Jace planeswalker token you control. Put N loyalty counters on it."* CR 606.3 (one loyalty activation per planeswalker per turn). Token definition (TFRA): *"−1: Surveil 1 / −3: Draw a card."* With Anointed Procession, Parallel Lives or Doubling Season two tokens are made; only the chosen one gets counters (2N under Doubling Season), and the other dies to CR 704.5i. That is a planeswalker dying (CR 700.4), so Cruel Celebrant and Edgar, Ancient Bloodlord trigger. The token *is* a token, so Chatterfang adds a Squirrel when empower creates it. Confirmed by `mtg-rules-expert`.
**Changes:** Rate empower engines against one-card-a-turn draw engines, not by loyalty totals. Never count empower toward a Jace *card's* loyalty (Jace, Wielder of Mysteries).
**See also:** repl-003, repl-006
**Source:** caesar / ghave / cap-living-legend / edgar-markov (2026-09-28), FRA review
