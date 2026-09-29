# Ledger: Triggers, the stack and targeting

When abilities trigger and how often: trigger doublers and their caps; dies, leaves, enters, cast and attack triggers; delayed and intervening-if triggers; priority, timing and resolution order; targeting and choices. Entry format and capture rules: `../SKILL.md` §4.
Search every topic at once with `bun run lookup "<card | rule number | term>"`.

---

### Dies-triggers look back; "whenever you gain life" does not {#trig-001}

**Kind:** ruling · **Verified:** 2026-07-31 against CR 2026-04-17
**Cards:** Blood Artist; Cruel Celebrant; Marauding Blight-Priest; Vito, Thorn of the Dusk Rose
**Rules:** 603.10a
**Claim:** Leaves-the-battlefield abilities trigger even if the source died in the same event; triggers keyed to *gaining life* require the permanent to survive.
**Evidence:** CR 603.10a for the look-back list.
**Changes:** In a board wipe, Blood Artist and Cruel Celebrant still trigger; Marauding Blight-Priest and Vito do **not**. Changes which drain pieces you count on through a wipe.
**See also:** trig-012, trig-019, dmg-015
**Source:** edgar-markov (2026-07-31).

### Anthems and enters-with-counter effects apply as a creature enters, before its ETB triggers check it {#trig-002}

**Kind:** ruling · **Verified:** 2026-08-25 against CR 2026-08-07
**Cards:** Vampire Socialite; Cathars' Crusade; Welcoming Vampire; Wedding Announcement; Vanquisher's Banner; Edgar Markov
**Rules:** 603.6b, 611.3c, 614.1d
**Claim:** A token is never on the battlefield unmodified: static buffs are applied simultaneously with entry, and "enters with a counter" effects are replacement effects, so they also apply on entry — but *triggered* counter-adders land afterwards. A payoff gated on a creature's power/toughness *as it enters* therefore reads the creature as modified, so your own anthems can switch it off.
**Evidence:** CR 611.3c (continuous effects apply as it enters, before trigger checks) and CR 614.1d ("[This permanent] enters…" effects are replacement effects). Official Gatherer ruling on Welcoming Vampire: *"If creatures enter the battlefield with +1/+1 counters or a continuous effect such as that of Wedding Festivity will apply to the creatures on the battlefield, those effects apply when checking to see if Welcoming Vampire's ability will trigger."* Consistent with CR 603.6b.
**Changes:** Distinguishes Vampire Socialite (replacement — counts for power-based checks on entry) from Cathars' Crusade (triggered — never affects the ETB check that just happened).
- (2026-08-25) Before adding any "power N or less" payoff, count the static pumps and entering-counter effects already in the list. In Edgar with six anthems plus Vampire Socialite, two anthems on board turn the 1/1 eminence tokens into 3/3s and blank it — despite 73–83% field inclusion. Prefer the cast-triggered version of the same effect (Vanquisher's Banner) in an anthem-dense list.
**See also:** repl-005
**Source:** edgar-markov (2026-07-31); edgar-markov (2026-08-25, merged from "Welcoming Vampire's power check includes anthems and entering counters"), versions A/B build.

### Cast triggers need a real cast: eminence works from the command zone, and battlefield recursion misses it {#trig-003}

**Kind:** ruling · **Verified:** 2026-08-25 against CR 2026-08-07
**Cards:** Edgar Markov; Bloodghast; Olivia, Crimson Bride; Strefan, Maurer Progenitor; Phyrexian Reclamation; Mirkwood Bats; Prosper, Tome-Bound
**Rules:** 601.2
**Claim:** Eminence works from the command zone and keys off **casting**. A card that returns a creature *to the battlefield* misses every "whenever you cast" trigger; a card that returns it *to hand* keeps them, because you recast it.
**Evidence:** Oracle text of the eminence keyword. CR 601.2 — *"To cast a spell is to take it from where it is (usually the hand), **put it on the stack**, and pay its costs."* A permanent put onto the battlefield from the graveyard never uses the stack, so it was not cast. Edgar Markov's eminence reads *"Whenever you **cast** another Vampire spell…"*, so Bloodghast's landfall return, Olivia Crimson Bride's attack trigger, Strefan's ability and any reanimation effect produce **no** eminence token — while Phyrexian Reclamation (return to *hand*) does, because the recast is a real cast.
**Changes:** Reanimation and "put onto the battlefield" effects miss eminence entirely. Every creature *spell* is two entry triggers, which is what makes cast-count payoffs scale.
- (2026-08-25) In any deck whose commander or engine keys on **casting** (Edgar's eminence, storm counts, Prosper's exile-cast, "whenever you cast your first spell each turn"), price reanimation and battlefield-recursion **without** the cast-trigger value, and prefer return-to-hand recursion. Two further traps on the same card: a recurred nontoken creature also misses "whenever you create or sacrifice a **token**" payoffs (Mirkwood Bats), and landfall-gated recursion stops in the late game when land drops run out.
**History:** On 2026-08-25 Bloodghast was proposed for edgar-markov; the pilot caught it: "it doesn't trigger eminence on re-entry." This repo had already rejected **Strefan, Maurer Progenitor** for the identical reason at `decks/edgar-markov/research/swaps.md:406` ("bypassing the cast → no eminence"); the note existed and was not grepped before proposing Bloodghast.
**Source:** edgar-markov (2026-07-31); edgar-markov (2026-08-25, merged from "Battlefield-recursion bypasses cast-triggers; hand-recursion preserves them"), the pilot caught Bloodghast.

### Target repeats: never within one instance of "target", never at all under "another target"; a kicked spell's copies stay kicked {#trig-004}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Jaya's Immolating Inferno; Comet Storm; Storm King's Thunder
**Rules:** 115.3, 115.4, 115.7e, 601.2, 601.2c, 702.33d, 707.10, 733
**Claim:** Within a single instance of the word "target," the same object or player may only be chosen once, and across *different* instances of the word the same target may be reused only if it still fits the targeting criteria — "**another** target" rules repeats out. On a multikicker spell that reads *"choose any target, then choose **another** target for each time this spell was kicked"*, every target must be different, each kick adds exactly one required target, and copies of the spell are kicked the same number of times, keep X, and may each target the same players again.
**Evidence:** CR 601.2c — *"The same target can't be chosen multiple times for any one instance of the word 'target'."* CR 601.2c / 115.3 allow a repeat across *separate* uses of "target" only "as long as it fits the targeting criteria". "Another" is itself a criterion (CR 115.4; compare "any other target", CR 115.7e), so it rules repeats out. Official Comet Storm ruling: *"Each target you choose must be different."* The target count is fixed at casting (CR 601.2c) with no "up to", so if you cannot name kicks + 1 different legal targets the cast is illegal and rewinds (CR 601.2, 733). CR 707.10: a copy copies *"the value of X, and additional or alternative costs"*, and CR 702.33d makes a spell kicked that way "kicked". Official Gatherer ruling: *"If you copy a kicked spell on the stack, the copy is also kicked."* A copy is a separate spell, so the no-repeat rule applies inside each copy but not across copies (CR 707.10, 115.3).
**Changes:** Caps burst damage from "X damage to each of up to three targets" spells at three distinct targets — you cannot stack all three on one player.
- (2026-09-16) Kick count is capped by different legal targets minus one. Under a copier, the kicks are paid **once** and every copy gets the same target count free, so the discount spent on kicks is multiplied by the copies. Comet Storm with two kicks and Storm King's Thunder at X=2 is three spells, each hitting all three opponents: 3X to each.
**See also:** trig-014, zone-001, cost-005
**Source:** scarlet-witch (2026-08-02), Jaya's Immolating Inferno; scarlet-witch (2026-09-16, merged from ""Another target" forbids repeats even across several uses of "target"; a kicked spell's copies stay kicked"), the pilot's "if I kicked it once can I select the same player twice?"; mtg-rules-expert.

### A beginning-of-end-step intervening-if is checked as the step begins — the step doesn't back up {#trig-005}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** Silversmote Ghoul; Bloodline Recollector
**Rules:** 113.6m, 513.2, 603.3b, 603.4
**Claim:** "At the beginning of your end step, if [condition], return this from your graveyard" needs the card **already in the graveyard** and the condition **already met** *before* the end step begins. Likewise an end-step "if N creatures died this turn" check never sees that end step's own delayed sacrifices: deaths from "sacrifice at the beginning of the next end step" (mobilize and similar) happen after the intervening-if is checked, so they cannot switch the trigger on.
**Evidence:** CR 603.4 (intervening-if: checked on trigger *and* on resolution), CR 113.6m (the ability functions only in the graveyard), CR 513.2 (*"the step doesn't 'back up'"*). Bloodline Recollector: *"At the beginning of each end step, if three or more creatures died this turn, this creature becomes prepared."* CR 603.4: *"When the trigger event occurs, the ability checks whether the stated condition is true. The ability triggers only if it is."* Both triggers fire as the step begins, while the mobilize tokens are still alive. Stack order cannot help, because the Recollector never goes on the stack (CR 603.3b, 513.2). Confirmed by `mtg-rules-expert`.
**Changes:** These cards are sequenced in the **second main phase**, not at end of turn. Sacrificing in response to the trigger, or gaining the life in response, does nothing — the ability never triggered. Applies to Silversmote Ghoul and every card of that template.
- (2026-09-28) Get the deaths in before the end step (sacrifice in the second main phase, or on an opponent's turn). Note too that "each end step" means every player's: in a free-outlet deck the Recollector is a draw-three for {B} up to once per turn, not once per round. That is why it came up MAIN in edgar-markov, caesar, chatterfang and ghave.
**See also:** trig-012, trig-031
**Source:** edgar-markov (2026-08-06); caesar / edgar-markov (2026-09-28, merged from "An end-step "if N creatures died this turn" check never sees that end step's own delayed sacrifices"), FRA review.

### Doubling a commander's trigger: match the CREATURE TYPE, not the trigger event {#trig-006}

**Kind:** ruling · **Verified:** 2026-08-07 against CR 2026-08-07
**Cards:** Panharmonicon; Roaming Throne; Strionic Resonator; Lithoform Engine; Tony Stark
**Claim:** Before reaching for a trigger-doubler, check *what kind of event* the trigger keys on: Panharmonicon-style effects only double triggers caused by something **entering**, and miss "at the beginning of combat" or "whenever this attacks" triggers entirely.
**Evidence:** Panharmonicon — *"If an artifact or creature **entering** causes a triggered ability of a permanent you control to trigger..."* vs Roaming Throne — *"As this creature enters, choose a creature type... If a triggered ability of another creature you control **of the chosen type** triggers, it triggers an additional time."*
**Changes:** For a commander whose engine is a combat or attack trigger, the doubler you want is **typed, not evented**: Roaming Throne naming the commander's creature type doubles it permanently and free, where Strionic Resonator / Lithoform Engine cost {2} every turn. Check the back face's full type line — Tony Stark's is *Legendary Artifact Creature — Human Hero*, so naming **Hero** also caught a second Hero in the 99.
**See also:** trig-007, trig-010, trig-034, eval-032
**Source:** iron-man (2026-08-07).

### Trigger-doublers ADD one instance each; they never compound {#trig-007}

**Kind:** ruling · **Verified:** 2026-08-09 against CR 2026-08-07
**Cards:** Roaming Throne; Wizard's Staff; Tony Stark
**Rules:** 603.2d
**Claim:** Two effects that each make an ability "trigger an additional time" yield three instances, not four — each doubler applies to the original trigger event and never to another doubler's additions.
**Evidence:** CR 603.2d — *"An effect that states that an ability triggers additional times doesn't invoke itself repeatedly and doesn't apply to other effects that affect how many times an ability triggers."*
**Changes:** Price the Nth trigger-doubler as +1 instance, not ×2. Roaming Throne + Wizard's Staff on Tony Stark is exactly 3 deploy triggers per combat. Contrast damage multipliers, which commute and genuinely multiply (see the replacement-effect ordering entry) — the two families scale differently and must not be priced alike.
**See also:** trig-014, trig-020, trig-024, equip-018, eval-032, repl-013
**Source:** iron-man (2026-08-09), HOB set review (Wizard's Staff).

### "That player" in a per-player trigger points at each affected player, not the turn's owner {#trig-008}

**Kind:** ruling · **Verified:** 2026-08-19 against CR 2026-08-07
**Cards:** Archfiend of Despair; Blatant Thievery; Wound Reflection
**Rules:** 119.2, 119.3, 119.4, 608.2c, 608.2f, 608.2h, 608.2i
**Claim:** In Archfiend of Despair's *"At the beginning of each end step, each opponent loses life equal to the life that player lost this turn,"* "that player" refers back to "each opponent" individually — every opponent doubles their **own** turn's life loss; whose end step it is only sets the timing, never the amount.
**Evidence:** CR 608.2c applies the text as written with the rules of English — "each opponent" is the only player noun in the sentence, so it is the only possible antecedent; "each end step" names a time, not a player. CR 608.2f's own example (Blatant Thievery: *"For each opponent, ... that player controls"*) shows the per-player template, and the loss is one action on multiple players, so it happens simultaneously. The count is a look-back (CR 608.2i) fixed once at resolution (CR 608.2h): the **whole turn's** gross loss — damage, payments, effects (CR 119.2–119.4) — including loss from before the Archfiend entered, and life gain never reduces it (Gatherer ruling 2018-06-08: "counts only how much life was lost"). Corollary from the same ruling: a second Archfiend's trigger *does* see the first trigger's loss (3 lost early → first trigger 3, second trigger 6).
**Changes:** When a trigger's timing clause names an event ("each end step", "each upkeep") and its effect names a player set ("each opponent"), resolve pronouns against the player set — never assume the active/turn player is implied. Same reading applies to the whole wording family (Wound Reflection et al.).
**See also:** trig-015
**Source:** scarlet-witch (2026-08-19), user asked whether each player loses their own lost life or the end-step player's.

### Transforming is NOT "a creature enters" — but entering transformed is {#trig-009}

**Kind:** ruling · **Verified:** 2026-08-19 against CR 2026-08-07
**Cards:** Impact Tremors; Tony Stark
**Rules:** 603.6, 603.6a, 603.6d, 613.7g, 614.12, 701.27a, 701.28a, 712.14a, 712.18
**Claim:** A permanent that transforms (or converts) into its creature face does not trigger any "enters the battlefield" ability — not other permanents' *"whenever a creature enters"* triggers, not the back face's own *"when this creature enters"* ETB, and not "as this enters"/enters-with-counters replacements. The one exception is entering the battlefield *already* transformed, which is a real enters event that ETB triggers see as the creature face.
**Evidence:** CR 701.27a — transform = "turn it over so that its other face is up," no zone change; CR 712.18 — it "doesn't become a new object" and effects continue to apply (auras, equipment, counters all stay). ETB triggers are zone-change triggers firing only when an event "puts one or more permanents onto the battlefield" (CR 603.6, 603.6a), and enters-replacements apply only "as part of the event that puts the permanent onto the battlefield" (CR 603.6d, 614.12). Contrast CR 712.14a: put onto the battlefield "transformed" → it *enters* back-face-up, so ETB triggers fire seeing the creature. Convert is the same mechanic (CR 701.28a). Two footnotes: transforming DOES grant a new timestamp (CR 613.7g — layers only), and no single CR line says "neither enters nor leaves" — the conclusion is derived, so cite the chain, not a phantom subrule.
**Changes:** Never count ETB payoffs (Impact Tremors-style, "when this enters" value) as working with a transform — flipping Tony Stark into The Invincible Iron Man feeds none of them. Conversely blink/reanimate effects that return a DFC "transformed" DO pay ETB value. Also: a flip does not reset auras/counters, so buffs survive the transform.
**Source:** iron-man/scarlet-witch (2026-08-19), user asked if transforming into a creature counts as "creature enters."

### Trigger-doublers count at TRIGGER time — deploying one mid-resolution doubles nothing {#trig-010}

**Kind:** ruling · **Verified:** 2026-08-19 against CR 2026-08-07
**Cards:** Roaming Throne; Panharmonicon; Tony Stark
**Rules:** 500.6, 500.8, 603.2c, 603.2d, 603.3, 603.10
**Claim:** An effect that makes abilities "trigger an additional time" (Roaming Throne, Panharmonicon family) must be on the battlefield at the moment the trigger EVENT occurs; putting the doubler onto the battlefield during the resolution of a trigger never retro-doubles that trigger — deploying Roaming Throne with The Invincible Iron Man's beginning-of-combat trigger yields no second deploy that combat, and the doubling starts at the next trigger event.
**Evidence:** CR 603.2d — determine "how many times it should trigger" as part of the triggering itself; CR 603.10 — continuous effects that exist *at the time of the event* determine the triggering; CR 603.2c — an ability triggers only once per event, with nothing revisiting the count later. A resolving trigger is an independent stack object with only its own text (CR 603.3). The useful flip side: an EXTRA combat phase this turn (CR 500.8) begins a NEW beginning-of-combat event (CR 500.6), and the now-present Throne doubles that one.
**Changes:** When sequencing a doubler deploy off the very trigger it's meant to double, price the payoff as starting NEXT turn (or next extra combat) — never count it for the current instance. Same reasoning bars every "as soon as it lands" fantasy: Panharmonicon entering off an ETB trigger doesn't double that ETB either.
**See also:** trig-006, trig-007, dmg-018
**Source:** iron-man (2026-08-19), deploying Roaming Throne with Iron Man's combat trigger.

### "Exiled with" collections are cumulative — every trigger recopies the WHOLE pile, once each {#trig-011}

**Kind:** ruling · **Verified:** 2026-08-19 against CR 2026-08-07
**Cards:** Arcane Bombardment; Chaos Warp
**Rules:** 601.2a, 601.2h, 607.2a, 608.2c, 608.2g, 704.5e, 707.10a, 707.12
**Claim:** Arcane Bombardment's trigger copies every card it has ever exiled, exactly once per card per trigger — the originals never leave exile, so the pile only grows, and a card exiled turns ago (Chaos Warp) yields one fresh cast on every subsequent trigger. The just-exiled card is included in the SAME trigger's batch ("exile... **Then** copy each card").
**Evidence:** CR 607.2a — "exiled with [this object]" is a linked ability referring to all cards its own instruction put in exile that are still there; CR 608.2c — instructions in written order, "each" = one copy action per card; CR 707.12 — the copy is a new object created in exile and then cast (CR 601.2a–h, no priority mid-resolution per CR 608.2g), so the original never moves. Copies that resolve (or are declined) cease to exist in any zone but stack/battlefield (CR 707.10a, SBA 704.5e) — they never refill the graveyard or the pile. Trigger is "your first instant or sorcery spell each turn" — EVERY turn, so an instant on an opponent's turn triggers it there too.
**Changes:** Value cards of this family as compounding engines: turn count × pile size, not one copy. Sequencing corollary: casting your first spell on each opponent's turn (any cheap instant) nearly quadruples the engine's output in a 4-player game. Deck-building corollary: the copies never come back as cards — the graveyard is only drained (one random card per trigger), so pairing with self-mill/spell-recursion keeps the random exile pool stocked.
**See also:** trig-016, eval-038
**Source:** scarlet-witch (2026-08-19), user asked if an already-exiled Chaos Warp keeps producing copies.

### "Dies" means battlefield → graveyard: sacrifice is a death; exile, bounce and tuck are not {#trig-012}

**Kind:** ruling · **Verified:** 2026-08-25 against CR 2026-08-07
**Cards:** Blood Artist; Black Cat; Edgar Markov; Swords to Plowshares; Path to Exile; Farewell; Anguished Unmaking; Viscera Seer; Ashnod's Altar; Phyrexian Altar; Yahenni, Undying Partisan; Emeritus of Woe
**Rules:** 111.7, 406.2, 603.4, 603.6c, 603.10a, 700.4, 701.8a, 701.21a, 704.5f
**Claim:** A "whenever a creature dies" trigger does NOT fire when the creature is exiled (or bounced to hand, or put into a library, or phased out), but DOES fire on destroy, sacrifice, 0-toughness SBA, and on tokens (which hit the graveyard before ceasing to exist). So any condition worded "if N creatures died this turn" / "whenever a creature dies" is something a deck with a free sacrifice outlet **does on purpose**, not something it waits for.
**Evidence:** CR 700.4 — *"The term dies means 'is put into a graveyard from the battlefield.'"* CR 406.2 — exile is its own zone, so battlefield → exile never touches a graveyard. Yes-cases: 701.8a (destroy → graveyard), 701.21a (sacrifice → graveyard: *"To sacrifice a permanent, its controller moves it from the battlefield directly to its owner's graveyard."* Sacrificing therefore satisfies every "dies" trigger), 704.5f (toughness ≤ 0 → graveyard), 111.7 (a token that changes zones triggers abilities before it ceases to exist). The broader wording that DOES catch exile is "leaves the battlefield" — CR 603.6c (moves from the battlefield to *another zone*); both kinds look back in time (603.10a).
**Changes:** When evaluating a "dies" payoff (Blood Artist, Black Cat, Edgar's aristocrat drains), count the field's exile-based removal (Swords, Path, Farewell, Anguished Unmaking) as **blanks** for it — only destroy/sacrifice/damage removal feeds it. Prefer "leaves the battlefield" wording where the deck wants value against exile. Conversely, a "dies" payoff is immune to nothing: it is the removal *type*, not the removal count, that decides how often it fires.
- (2026-08-25) Never score a "dies"/"died this turn" clause as a passive gate when the list holds a free outlet (Viscera Seer, Ashnod's Altar, Phyrexian Altar, Yahenni). Count the outlets first, then decide. Timing detail for intervening-"if" versions (CR 603.4) such as **Emeritus of Woe** ("at the beginning of your end step, if two or more creatures died this turn"): the deaths must happen **before** the end step, so sacrifice in the second main phase — after combat damage, which costs an attack-based deck nothing.
**History:** The self-enabling half was a pilot catch in the edgar-markov versions A/B build (2026-08-25): "sacrifices count as deaths."
**See also:** trig-001, trig-005, trig-024, trig-036, trig-038
**Source:** user rules question (2026-08-21) — does exile trigger "dies"; verified by mtg-rules-expert against rules version 2026-08-07; edgar-markov (2026-08-25, merged from "Sacrifice IS a death — "died this turn" is self-enabling, not a gate"), versions A/B build, the pilot caught it.

### Activated abilities repeat as often as you can pay — sorcery timing is not a cap; sacrifice costs are paid at once {#trig-013}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Cards:** Yahenni, Undying Partisan; Viscera Seer; Carrion Feeder; Farewell
**Rules:** 117.1b, 117.3c, 601.2h, 602.1, 602.2, 602.5a, 602.5b, 602.5d, 701.6b, 701.21a, 702.12c, 702.184a, 704.5f
**Claim:** An activated ability with no {T}/{Q} in its cost and no printed "activate only once each turn" / timing restriction can be activated any number of times in a turn — including back-to-back without passing priority — limited only by the ability to pay the cost; even one reading "Activate only as a sorcery" can be activated any number of times in a turn, as long as each activation is in your main phase with an empty stack. A sacrifice cost is paid on activation (immediately, unresponsive, not refunded if the ability is countered), so a free sac outlet can respond to exile-based removal by sending its own creatures to the graveyard first.
**Evidence:** CR 117.1b / 602.1 (activate whenever you have priority); 602.2 + 601.2h (cost paid during activation, no partial payments, can't be altered after); 117.3c (you keep priority after activating — stack another activation before passing); 602.5a (the only tap-related limit, and it needs a tap symbol); 602.5b (once-per-turn limits must be printed); 701.6b (no refund of costs when countered). CR 602.5d — "Activated abilities that read 'Activate only as a sorcery' mean the player must follow the timing rules for casting a sorcery spell." That is main phase, your turn, empty stack. It says nothing about frequency. Contrast a genuine cap, which is worded "Activate only once each turn." Companion fact: 702.12c — multiple instances of indestructible are redundant, and indestructible does nothing against sacrifice (701.21a), toughness ≤ 0 (704.5f) or exile.
**Changes:** Count any "Sacrifice a creature: <effect>" with no tap symbol as a full instant-speed sac outlet for the role-skeleton (Yahenni, Viscera Seer, Carrion Feeder shape), not a once-a-turn trick. Pilot note: against Farewell / exile wraths, sac through it in response for death triggers; against destroy wraths one activation of a "gains indestructible" effect is enough — the rest are just sac fodder.
- (2026-09-09) Never assume sorcery-speed means once per turn. The practical consequence is that the activations can't be stacked in response to each other — you must let each one resolve first — so any untap that enables a second activation has to resolve in between.
**Source:** user rules question (2026-08-21) — Yahenni, Undying Partisan repeat activations; oracle verified with `bun run card`; rules verified by mtg-rules-expert against rules version 2026-08-07; cap-living-legend (2026-09-09, merged from ""Activate only as a sorcery" is a TIMING restriction, not a per-turn cap"), Station (CR 702.184a) firing twice per creature per turn.

### Doubled trigger instances are separate stack objects — own targets, sequential, second sees post-first state {#trig-014}

**Kind:** ruling · **Verified:** 2026-08-21 against CR 2026-08-07
**Cards:** Panharmonicon; Black Cat; Black Cat, Cunning Thief
**Rules:** 115.3, 601.2c, 603.2d, 603.3, 603.3d, 603.6c, 608.1, 608.2c, 608.3a, 700.4
**Claim:** When Panharmonicon (or any "triggers an additional time" effect) doubles an ETB trigger, the two instances are independent stack objects: each chooses its own target as it goes on the stack (may be different opponents), they resolve one at a time, and the second resolves against whatever state the first left behind — a doubled "look at the top nine" sees a *fresh* nine, since nothing is locked in at trigger time.
**Evidence:** CR 603.2d (determine how many times it triggers, then it triggers that many times); CR 603.3 (each trigger goes on the stack as its own object with only its own text); CR 603.3d → 601.2c (targets announced per instance as each is put on the stack; 115.3 only bars repeating a target within ONE instance); CR 608.1 / 608.2c (top object resolves alone, instructions followed at resolution). Panharmonicon keys on "entering" — cast or put onto the battlefield both qualify (608.3a). Dies triggers are leaves-the-battlefield triggers (603.6c / 700.4) and are NOT doubled.
**Changes:** Price a doubled look-at-top-N / impulse-exile ETB as 2N fresh cards, not N seen twice; pilot note: you may split the two instances across two opponents. Name-collision gotcha: `bun run card "Black Cat"` returns the Zombie Cat (dies trigger, not doubled); the Spider-Man legend is **Black Cat, Cunning Thief** (ETB, doubled).
**See also:** trig-004, trig-007, repl-013
**Source:** user rules question (2026-08-21) — Panharmonicon + Black Cat; verified by mtg-rules-expert against rules version 2026-08-07.

### "Another target player" in a trigger means other than the player named by the trigger {#trig-015}

**Kind:** ruling · **Verified:** 2026-08-23 against CR 2026-08-07
**Cards:** The Lord of Pain
**Rules:** 115.1, 603.3a
**Claim:** On The Lord of Pain ("whenever a player casts their first spell each turn, choose another target player"), "another" means a player other than **the caster**, not other than the controller, and the controller of the trigger chooses the target. So when an opponent casts, I may aim it at any other opponent (or myself), never at the caster; when I cast, I must aim at an opponent; in a two-player game I must target myself.
**Evidence:** CR 115.1 / 603.3a (the ability's controller chooses targets); Gatherer ruling 2024-09-20 for The Lord of Pain, verbatim: "must target a player other than the one who cast the spell… if it's just you and one other player… you'll have to target yourself."
**Changes:** Read "another" in any per-player trigger against the player the trigger names, not against "you". Pilot consequence: a punisher commander like this *steers* damage — it keeps the table even rather than hitting the active player.
**See also:** trig-008, trig-016
**Source:** lord-of-pain (2026-08-23), build 2026-08-23; verified by mtg-rules-expert against CR 2026-08-07.

### "First spell each turn" is per player per turn of the game, and it reads game history {#trig-016}

**Kind:** ruling · **Verified:** 2026-08-23 against CR 2026-08-07
**Cards:** The Lord of Pain; Vial Smasher the Fierce; The Frightful Four
**Rules:** 601.2i, 603.2
**Claim:** A trigger on "a player's first spell each turn" (The Lord of Pain, Vial Smasher the Fierce, The Frightful Four) fires once per player per *turn*, not per that player's own turn — an opponent's instant on my turn is their first spell that turn. And "first" is judged from the whole turn's history: if the permanent enters after a player has already cast a spell this turn, that player's next spell that turn is not their "first" and does not trigger it.
**Evidence:** CR 603.2 (literal reading of the trigger event; no special rule), 601.2i (cast triggers fire on cast). A four-player pod is therefore up to four triggers per turn, every turn.
**Changes:** Price these cards at ~4 triggers a turn cycle, and flash-deploy them *before* the first spell of a turn, not in response to it.
**See also:** trig-011, trig-015, trig-037, eval-038
**Source:** lord-of-pain (2026-08-23); mtg-rules-expert.

### The draw-step draw happens BEFORE "beginning of draw step" triggers {#trig-017}

**Kind:** ruling · **Verified:** 2026-08-23 against CR 2026-08-07
**Cards:** Howling Mine; Font of Mythos; Teferi's Puzzle Box; Vampiric Tutor
**Rules:** 504.1, 504.2, 603.3
**Claim:** In the draw step the active player's normal draw is a turn-based action that happens first, and Howling Mine / Font of Mythos / Teferi's Puzzle Box triggers go on the stack afterwards, when the active player would receive priority. So a card tutored to the top with Vampiric Tutor is drawn by the normal draw — and under Teferi's Puzzle Box it is then bottomed with the rest of the hand unless the tutor is cast *in response to the Box trigger*.
**Evidence:** CR 504.1 ("First, the active player draws a card. This turn-based action doesn't use the stack."), 504.2 (then the active player gets priority; triggers are put on the stack then, 603.3).
**Changes:** Pilot note for any top-of-library tutor in a wheel/Puzzle Box deck; and don't count a "beginning of draw step" trigger as happening before the draw. The Box's controller orders their own Mine/Font/Box triggers: resolve the Box first to keep the extra draws in hand.
**See also:** trig-030
**Source:** lord-of-pain (2026-08-23), Puzzle Box review.

### A villainous choice CAN be answered with the impossible option {#trig-018}

**Kind:** ruling · **Verified:** 2026-08-24 against CR 2026-08-07
**Cards:** The Dalek Emperor
**Rules:** 608.2d, 701.55b
**Claim:** A player facing a villainous choice may pick the option they cannot perform at all, the opposite of the general rule for effect choices. With no creatures on board, an opponent facing The Dalek Emperor's "sacrifices a creature of their choice, or you create a 3/3 Dalek" picks the sacrifice, sacrifices nothing, and you get **no token** — the trigger whiffs entirely.
**Evidence:** CR 701.55b — "While facing a villainous choice, a player may choose an option that is illegal or impossible. In that case, they perform as much of the action as is possible. This is an exception to rule 608.2d." CR 608.2d is the general rule that "the player can't choose an option that's illegal or impossible." Oracle: The Dalek Emperor — "At the beginning of combat on your turn, each opponent faces a villainous choice — That player sacrifices a creature of their choice, or you create a 3/3 black Dalek artifact creature token with menace."
**Changes:** Evaluate a *villainous choice* card as **strictly weaker than the same effect written as "unless"** — punisher wording ("sacrifices a creature unless…") forces the fallback when the option is impossible, villainous choice does not. Villainous-choice edicts are dead against empty boards, tokens-only-after-a-wipe boards, and any opponent happy to take zero. Related but distinct from [A type-restricted edict is skipped entirely, never substituted] — that is about the *sacrifice* whiffing on type, this is about the *whole choice* whiffing on either half.
**Source:** rules question on The Dalek Emperor (2026-08-24).

### A "grows when others die" creature gains NOTHING from a board wipe {#trig-019}

**Kind:** ruling · **Verified:** 2026-08-24 against CR 2026-08-07
**Cards:** Elenda, the Dusk Rose; Blasphemous Act; Akroma's Will; Flawless Maneuver; Dawn's Truce; Teferi's Protection; Elenda's Hierophant; Cordial Vampire; Blade of the Bloodchief; Ravenous Baloth
**Rules:** 113.7a, 120.3e, 120.5, 122.6, 400.7, 603.10a, 608.2e, 608.2f, 608.2h, 701.8a, 701.21a, 704.3, 704.4, 704.8
**Claim:** A creature whose ability reads *"whenever another creature dies, put a +1/+1 counter on [itself]"* gets **zero** counters when it dies in the same event as everything else — the triggers all fire, they all resolve, and they all do nothing. Any death payoff keyed to its power uses its power **as it last existed on the battlefield** — counters it already had, never counters from the simultaneous deaths.
**Evidence:** Elenda, the Dusk Rose vs Blasphemous Act. CR 120.3e/120.5 — damage only *marks*; CR 704.4 — SBAs aren't checked mid-resolution; CR 704.3 — all applicable SBAs are "performed **simultaneously as a single event**"; CR 603.10a — leaves-the-battlefield triggers look back in time, so all five "another creature dies" triggers DO fire (the rule's own example is this exact board); CR 400.7 + 122.6 — counters only go on battlefield objects, so each trigger resolves and accomplishes nothing; CR 608.2h + 113.7a + **704.8** ("that permanent's last known information is derived from the game state *before any of those state-based actions were performed*") — X is LKI power. Official Gatherer ruling agrees verbatim: *"If Elenda dies at the same time as another creature, both of its triggered abilities trigger. However, the first one won't do anything since you can't put a +1/+1 counter on Elenda."* Same answer for a "destroy all creatures" wrath (CR 701.8a + 608.2f) and for a simultaneous sacrifice wipe (CR 701.21a + 608.2e/f).
**Changes:** Never price a "grows on death" creature as if a sweeper is its payoff — a wipe is its **worst** case, not its best. The counters are only real if the creature is still on the battlefield when the triggers *resolve*, which means it must survive the wipe. Two protection modes are NOT equivalent here: **indestructible** (Akroma's Will mode 2, Flawless Maneuver, Dawn's Truce) banks every counter and turns a later sac outlet into the full payout; **phasing** (Teferi's Protection — *"while they're phased out, they're treated as though they don't exist"*) survives but banks nothing, because a phased-out permanent's triggers never fire. Generalises to Elenda's Hierophant, Cordial Vampire, Blade of the Bloodchief, Ravenous Baloth-style "power = X" death payoffs, and any `X is its power` LKI count.
**See also:** trig-001
**Source:** edgar-markov (2026-08-24), "does Elenda get the +1/+1 before she dies to Blasphemous Act?"

### Trigger doublers don't beat "This ability triggers only once each turn" — Roaming Throne and Teysa Karlov alike {#trig-020}

**Kind:** ruling · **Verified:** 2026-09-24 against CR 2026-08-07
**Cards:** Roaming Throne; Teysa Karlov; Drivnod, Carnage Dominus; Elesh Norn, Mother of Machines; Isshin, Two Heavens as One; Panharmonicon; Morbid Opportunist; Welcoming Vampire; Dusk Legion Duelist; Caretaker's Talent; Yarok, the Desecrated; Harmonic Prodigy; Naban, Dean of Iteration; Cursed Wombat; Dramatic Finale
**Rules:** 101.2, 113.2c, 603.1, 603.2d, 603.2h, 603.10a, 604.2, 611.3a
**Claim:** A "triggers an additional time" effect (Teysa Karlov, Drivnod, Elesh Norn, Roaming Throne, Panharmonicon) cannot push an ability past its own "This ability triggers only once each turn" cap — two copies of the creature can, one creature plus a doubler cannot. Morbid Opportunist under Teysa draws **1** card on the first death of a turn, and nothing on later deaths.
**Evidence:** Verified by mtg-rules-expert against the 2026-08-07 rules. CR 603.1 — the cap is one of the ability's own "[Instructions]". CR 603.2d — an additional-trigger effect works by *"determine how many times it should trigger, then that ability triggers that many times"* (it does not create a second ability): the doubler makes *"that ability trigger[] that many times"*. Roaming Throne's own Gatherer ruling: *"doesn't copy the triggered ability; it just causes the ability to trigger an additional time."* Teysa's ruling says she *"doesn't copy the triggered ability; it just causes the ability to trigger twice"*, so the second instance is a second triggering that the text forbids. CR 101.2 ("can't" wins over "does") supports this **only by analogy**, because the cap is the ability's own text, not a separate effect. Contrast the Cursed Wombat ruling, where **separate instances** of a once-per-turn ability each get their own allowance: *"These abilities are not redundant."* **No official Gatherer ruling on the cap exists** for Teysa, Morbid Opportunist, Roaming Throne, Elesh Norn, Drivnod, Isshin, Welcoming Vampire or Dusk Legion Duelist. Best source: the judge-run Ask a Magic Judge blog (2023-01-27, on Elesh Norn): *"all restrictions on the trigger apply to both instances… Welcoming Vampire can still only trigger once each turn."* There is also a second-hand report of Matt Tabak ruling the same way on Teysa + Dramatic Finale (tweet not verified). Order of arrival never matters: Teysa is a static ability that applies whenever the death happens (CR 604.2, 611.3a), and it still applies if she dies in the same event (603.10a, Teysa ruling 2019-01-25). Confidence is about 85–90%. The opposing reading, where both instances from the first event count, has forum support but relies on treating the doubler as a replacement effect, which it is not.
**Changes:** Do not count once-per-turn draw engines (Morbid Opportunist, Welcoming Vampire, Dusk Legion Duelist, Caretaker's Talent) as doubled by Teysa-style effects; Roaming Throne / Panharmonicon-style doublers are blank on Dusk Legion Duelist, Welcoming Vampire, Caretaker's Talent and the other ~143 cards carrying that clause. Before valuing a doubler on a card, check its wording for **"triggers only once each turn"** (can't be doubled). A second **copy** of the engine does draw separately, since each instance has its own cap (CR 113.2c). The older **"Do this only once each turn"** template (CR 603.2h) is a different rule and is NOT settled by this entry: both instances may trigger, but the instruction still limits the action, so verify it separately.
- (2026-08-25) Checked all ~143 of those cards plus Panharmonicon, Yarok, Harmonic Prodigy and Naban for a controlling Gatherer ruling — none exists, so this is derived from the CR.
**History:** On 2026-08-25 this ledger grounded the cap on CR 101.2 — "the 'can't' wins over the 'does'"; corrected on 2026-09-24 because 101.2 applies only by analogy (the cap is the ability's own text, not a separate effect) and CR 603.1 + 603.2d carry it. The conclusion is unchanged.
**See also:** trig-007, trig-023, trig-024, trig-037
**Source:** teysa-karlov (2026-09-24), pilot asked "if I have Morbid Opportunist on board and then I play Teysa, does his ability still trigger twice?"; edgar-markov (2026-08-25, merged from "Roaming Throne does NOT beat "This ability triggers only once each turn""), "does Roaming Throne double Duelist's draw?"

### "One or more" triggers fire once per EVENT — a mass sacrifice is one counter, one mill is one Horror, a wheel is one per discarding player {#trig-021}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** Infantry Shield; Chainsaw; Blade of the Bloodchief; Shared Animosity; Purphoros, God of the Forge; Warleader's Call; Mirkwood Bats; Zellix, Sanity Flayer; Traumatize; Bruvac the Grandiloquent; Persistent Petitioners; Tinybones, Pocket Nuisance
**Rules:** 508.4, 603.2c, 608.2f, 702.181a
**Claim:** An ability worded *"whenever one or more creatures die"* triggers **once** when any number of creatures die simultaneously, while *"whenever a creature dies"* triggers once **per creature**; the same shape applies to every "one or more" trigger — Zellix, Sanity Flayer makes one Horror per mill *instruction*, so ten small mills beat one Traumatize. "Whenever a player discards one or more cards" batches each player's cards, not the players, so a wheel that makes four players discard triggers it four times.
**Evidence:** CR 603.2c — *"An ability triggers only once each time its trigger event occurs. However, it can trigger repeatedly if one event contains multiple occurrences."* The "one or more" wording collapses the occurrences into one. CR 608.2f — actions on multiple objects are processed simultaneously, so the mobilize sacrifice (CR 702.181a, *"Sacrifice them at the beginning of the next end step"*) is one event. A board wipe, a mobilize end-step sacrifice, or any simultaneous sacrifice is therefore one event for the batched wording and N events for the per-creature wording. Worked case: Infantry Shield's X tokens dying at end step put **one** rev counter on Chainsaw (*"Whenever one or more creatures die, put a rev counter"*), while the same deaths put **X** counters on Blade of the Bloodchief (*"Whenever a creature dies"*). Sacrificing the tokens one at a time to an outlet restores one event per token. Same pass, CR 508.4: tokens put onto the battlefield attacking *"never 'attacked'"*, so they fire no "whenever a creature attacks" triggers (Shared Animosity does nothing for them) — but they do fire per-creature *enters* triggers (Purphoros, Warleader's Call, Mirkwood Bats) under 603.2c's multiple-occurrence clause. Mill (2026-09-16): one mill instruction is one event however many cards it moves; Bruvac the Grandiloquent doubles the *cards* milled, not the number of triggers. Discard (2026-09-28): Tinybones, Pocket Nuisance: *"Whenever a player discards one or more cards, Tinybones deals 1 damage to each opponent."* `mtg-rules-expert` rates this medium-high: no official ruling was found for this card, and it rests on 603.2c plus how Wizards rules similar "a player" triggers. In gift decks (lord-of-pain) the extra draws also overflow opponents' hands, so cleanup discards become a third billable event beside draws and casts.
**Changes:** Before calling two cards a combo, read whether the payoff is per-creature or per-batch. A "one or more" counter-grower scales with the number of death **events**, so it wants one-at-a-time sacrifice outlets, not wipes or mass end-step sacrifice.
- (2026-09-16) When a payoff says "one or more", count the deck's number of separate instructions, not its total volume — and prefer repeatable small effects (Persistent Petitioners' "{1}, {T}: mills a card") over one big sorcery for those payoffs.
- (2026-09-28) Count wheels as N triggers where N is the number of players who actually discard (an empty hand adds nothing). Re-check once the CR includes Reality Fracture.
**See also:** trig-027, trig-033
**Source:** iron-man + edgar-markov (2026-09-03), the pilot proposed Infantry Shield + Chainsaw as a combo; cap-living-legend (2026-09-16, merged from ""Whenever a player mills one or more X" triggers once per mill EVENT, not per card"); lord-of-pain (2026-09-28, merged from "Tinybones-style "a player discards" triggers once per discarding player"), FRA review.

### "Creatures you control can't be targeted … this turn" covers creatures that enter LATER in the turn, and fizzles removal already on the stack {#trig-022}

**Kind:** ruling · **Verified:** 2026-09-06 against CR 2026-08-07
**Cards:** Veilstone Amulet
**Rules:** 117.5, 608.2b, 611.2c
**Claim:** Veilstone Amulet's resolved trigger protects every creature you control for the rest of the turn, including ones that enter afterwards, and casting any spell in response to targeted removal makes that removal fizzle on resolution.
**Evidence:** CR 611.2c — a rules-modifying continuous effect from a resolving ability *"can affect objects that weren't affected when that continuous effect began"* (the locked-in set applies only to characteristic/control-changing effects); CR 117.5 — the trigger goes on the stack above the removal spell; CR 608.2b — a spell whose only target is now illegal *"doesn't resolve"*.
**Changes:** Score "whenever you cast a spell, protection this turn" cards as (a) automatic on your own turn and (b) a counterspell-for-targeted-removal on opponents' turns **only if the deck holds cheap instants** — count the instants under 2 mana before crediting cell (b). It fills the targeted-spell + targeted-ability rows of the protection matrix (ledger 2026-08-21) for *all* creatures, and nothing else: wipes, edicts and exile-all ignore it.
**Source:** vision-scarlet-witch / scarlet-witch (2026-09-06), Veilstone Amulet evaluated across every deck.

### "Choose one that hasn't been chosen this turn" caps a modal trigger at one use of each mode per turn — scored The Vision as a per-spell draw engine {#trig-023}

**Kind:** correction · **Recorded:** 2026-09-08
**Cards:** The Vision; Canoptek Spyder; Apex of Power; Roaming Throne
**Claim:** A modal trigger worded "choose one that hasn't been chosen this turn" can pick each mode once per turn, so The Vision draws at most one card a turn — it was wrongly rated as a card per noncreature spell.
**Evidence:** Recommended The Vision for the Ultron list as *"a card per noncreature spell on a 2/5 vigilant flier"* with ~36 noncreature spells to feed it. Its trigger reads *"Whenever you cast a noncreature spell, choose one **that hasn't been chosen this turn** — Solar Beam · Density Control · Technopathy — draw a card."* The draw mode can be chosen once per turn; the second and third noncreature spells in a turn can only pick double strike or indestructible. The pilot reported it *"felt really bad to play."*
**Changes:** For any modal trigger, grep the oracle for "hasn't been chosen" / "only once each turn" / "can't choose the same mode" before rating it as repeatable. Compare it to the uncapped card in the same role (Canoptek Spyder: a card per nontoken artifact creature, no cap) before seating it. The ledger already had the once-per-turn family in "Roaming Throne does NOT beat 'triggers only once each turn'" (2026-08-25) — the mode-cap wording is the same family and now sits beside it.
**Root cause:** Read the trigger condition and the modes, skipped the clause between them. Same failure as the Apex of Power free-cast (recalled the gist of a card instead of its text) — on a card whose text I had on screen in the same session.
**See also:** trig-020
**Source:** ultron (2026-09-08), the pilot's "it felt really bad to play."

### Teysa Karlov doubles DIES triggers (Skullclamp included), never SACRIFICE triggers {#trig-024}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Teysa Karlov; Drivnod, Carnage Dominus; Skullclamp; Roaming Throne; Kalastria Highborn; Crossway Troublemakers; Emeritus of Woe; Mirkwood Bats
**Rules:** 603.2d, 603.4, 603.10a, 614.5, 616.1e, 616.1f, 700.4, 701.21a
**Claim:** Teysa / Drivnod ("if a creature dying causes a triggered ability of a permanent you control to trigger, that ability triggers an additional time") double any trigger whose event is a creature dying — including Skullclamp's draw and a creature's own "when this dies" — but not triggers on the act of sacrificing, and not intervening-if end-step checks.
**Evidence:** CR 700.4 (dies = battlefield → graveyard), 701.21a (sacrifice is a way to die), 603.10a (dies triggers look back, so they still double when Teysa dies in the same wipe; Skullclamp still sees "equipped creature"), 603.2d (two "additional time" effects = 3 instances, not 4 — Teysa + Roaming Throne). Gatherer ruling: "an ability that triggers 'whenever you sacrifice a creature' triggers only once." Each instance chooses targets and optional payments separately (Kalastria {B}, Crossway 2 life each). Emeritus of Woe (603.4 intervening-if) and cast triggers are untouched. By contrast, token doublers are replacement effects that multiply (616.1e–f, 614.5): two = 4×.
**Changes:** In an aristocrats deck, decide which half of the loop to multiply. A token doubler scales the fodder; a dies-doubler scales the payoff AND the death-draw engines (Clamp → 4 cards). Check every "sacrifice" wording before counting it as doubled (Mirkwood Bats is not).
**See also:** trig-007, trig-012, trig-032, trig-036
**Source:** edgar-markov (2026-09-10), "should we run more token doublers?", verified by mtg-rules-expert.

### Elesh Norn doubles "enters" triggers from ANY player's permanent — but not the triggers downstream of them {#trig-025}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Elesh Norn, Mother of Machines; Soul Warden; Heliod, Sun-Crowned; Archangel of Thune; Light of Promise
**Rules:** 119.9, 603.2d, 603.6a, 603.6d, 614.1c
**Claim:** Elesh Norn, Mother of Machines makes your Soul Warden-style "whenever another creature enters" triggers fire twice for every creature entering, including opponents' creatures and tokens — but the life-gain triggers those produce (Heliod, Archangel of Thune, Light of Promise) are *not* doubled again.
**Evidence:** Norn: "If a permanent entering causes a triggered ability of a permanent you control to trigger, that ability triggers an additional time." CR 603.6a (every permanent is checked when any permanent enters), 603.2d (additional triggers don't invoke themselves). Gatherer 2023-02-04: Norn "doesn't look at who controls the permanent entering the battlefield, only who controls the permanent that has the triggered ability." A life-gain trigger's event is gaining life (119.9), not a permanent entering, so Norn doesn't touch it. Her second clause shuts off opponents' enters triggers and landfall but not replacement effects ("enters with", "as ~ enters" — 614.1c, 603.6d) and not leaves/dies triggers.
**Changes:** Count Norn's value as (number of your enters-caused triggers) × (enters events), then let the downstream payoffs multiply once. With two Wardens she turns each creature entering into four 1-life events. An opponent's Norn blanks your Wardens entirely.
**See also:** trig-007, trig-020
**Source:** cap-living-legend (2026-09-10), Elesh Norn evaluation.

### "Attacks a player" is a strictly narrower trigger than "attacks" — a planeswalker swing turns it off {#trig-026}

**Kind:** ruling · **Verified:** 2026-09-13 against CR 2026-08-07
**Cards:** Shredder, Shadow Master
**Rules:** 508.3a, 508.5, 702.116a
**Claim:** A trigger worded *"Whenever ~ attacks a player"* does **not** fire when that creature is declared attacking a planeswalker or a battle, even though there is still a defending player.
**Evidence:** CR 508.3a — *"An ability that reads 'Whenever [a creature] attacks, . . .' triggers if that creature is declared as an attacker. Similarly, 'Whenever [a creature] attacks [a player, planeswalker, or battle], . . .' triggers if that creature is declared as an attacker attacking that player or permanent."* CR 508.5 confirms a defending player still exists when you attack their planeswalker — the trigger condition is the *declared target of the attack*, not the presence of a defending player. Worked case: Shredder, Shadow Master's myriad-shaped token ability is gated on "attacks a player," so pointing it at an opponent's planeswalker creates zero tokens; real myriad (702.116a, *"Whenever this creature attacks"*) would still fire.
**Changes:** When reading an attack trigger, note whether it says "attacks", "attacks a player", or "attacks alone" — they are three different conditions. Write the "always swing at the face" note into the deck's gameplan for any "attacks a player" commander, and do not count such a card as a planeswalker answer.
**See also:** trig-027
**Source:** rules question from the pilot (2026-09-13) — Shredder, Shadow Master.

### "Attacks and isn't blocked" is the ONE attack-shaped trigger that fires for a token put onto the battlefield attacking {#trig-027}

**Kind:** ruling · **Verified:** 2026-09-13 against CR 2026-08-07
**Cards:** Shredder, Shadow Master; Shared Animosity
**Rules:** 508.3a, 508.3b, 508.3c, 508.3d, 508.3e, 508.4, 508.6, 509.3c, 509.3d, 509.3g
**Claim:** Refines the 2026-08-25 CR 508.4 finding (tokens that enter attacking *"never 'attacked'"*, so no "whenever a creature attacks" triggers): *"Whenever [a creature] attacks and isn't blocked"* is exactly one carve-out in the rules that still fires for a token put onto the battlefield attacking, and it is worth building around.
**Evidence:** CR 509.3g — *"Whenever [a creature] attacks and isn't blocked, . . ."* → *"**It will trigger even if the creature was never declared as an attacker** (for example, if it entered the battlefield attacking)."* Contrast the four rules that explicitly exclude entered-attacking creatures: 508.3a (creature attacks / attacks a player), 508.3b (a player **is attacked**), 508.3c/d/e (a player attacks). The tokens also still fire 509.3c/d ("becomes blocked") and every combat-damage trigger, which are not attack triggers at all. CR 508.6 — you *are* "attacking" those players (static checks see it) but you never *attacked* them.
**Changes:** In a myriad / enters-attacking deck, payoffs worded "attacks and isn't blocked" (and combat-damage payoffs) scale with the token count; payoffs worded "whenever a creature you control attacks" (Shared Animosity, raid, attack-count triggers) see only the declared attackers. Defensively, the good news is the tokens do not wake opponents' "whenever you're attacked" triggers (508.3b).
**See also:** trig-021, trig-026
**Source:** rules question from the pilot (2026-09-13) — Shredder, Shadow Master.

### A modal spell's modes resolve in PRINTED order, and a mid-resolution graveyard counts {#trig-028}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Will of the Jeskai; Past in Flames
**Rules:** 601.2b, 608.2c, 608.2g, 611.2c, 613.1f, 700.2a, 700.2d
**Claim:** Chosen modes are carried out top-to-bottom as printed, never in the order chosen and never reorderable. And a continuous effect from a resolving spell fixes its set of objects **when that effect begins**, not when the spell starts resolving — so cards put into the graveyard by an *earlier mode of the same spell* are inside the set.
**Evidence:** CR 608.2c — *"The controller of the spell or ability follows its instructions in the order written."* CR 700.2a/601.2b put the mode *choice* at cast time, but nothing anywhere permits reordering; CR 700.2d treats a mode chosen twice as appearing "that many times in sequence." CR 611.2c — *"the set of objects it affects is determined **when that continuous effect begins**. After that point, the set won't change."* "Gains flashback" is an ability-adding effect, so it is a characteristic modification (CR 613.1f, layer 6) and that first sentence governs. CR 608.2g: no player gets priority during resolution, so nothing can be done between the two modes.
**Changes:** For any modal spell, read the bullets in printed order and ask what each earlier bullet puts where — a discard, mill or sacrifice in mode 1 is *input* to mode 2. Conversely, never promise that something entering the graveyard after a grant resolves will be covered by it.

**Worked case — Will of the Jeskai** ({3}{R}, *"Choose one. If you control a commander … you may choose both instead. • Each player may discard their hand and draw five cards. • Each instant and sorcery card in your graveyard gains flashback until end of turn. The flashback cost is equal to its mana cost."*): the discard is printed first, so every instant and sorcery you pitch to it **is in the graveyard when the flashback effect begins and does gain flashback.** The five freshly drawn cards do **not** — they are in hand at that moment, and the set cannot grow afterwards. Same principle as the official Past in Flames ruling ("cards put into your graveyard later in the turn won't gain flashback").

**Source:** scarlet-witch (2026-09-16), the pilot's "does Will of the Jeskai's flashback apply to the cards it discarded?"; mtg-rules-expert.

### A "whenever you cast" pump resolves BEFORE the spell that triggered it — so a doubler doubles its own trigger {#trig-029}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Blackblade Reforged; Bulk Up; Unleash Fury; Livaan, Cultist of Tiamat
**Rules:** 603.3b, 608.2h, 613.4c, 701.10a, 701.10b
**Claim:** Doubling power is a one-shot calculation, not a live effect — but a cast-triggered pump from the *same* spell is already applied when the doubler resolves, so you never have to sequence that part; everything else must be deployed first.
**Evidence:** CR 701.10b — *"To double a creature's power, that creature gets +X/+0, where X is that creature's power **as the spell or ability that doubles its power resolves**."* CR 701.10a: the effect *modifies* rather than sets (layer 7c, CR 613.4c). CR 608.2h: information an effect needs is determined once, when applied. CR 603.3b: a triggered ability goes on the stack **above** the spell that triggered it, so Livaan's *"whenever you cast a noncreature spell, target creature gets +X/+0"* resolves first and is inside the doubled total. Worked on a 2/3 with Livaan and 6 lands: casting Bulk Up then attaching Blackblade Reforged is `(2+2)×2 + 6 = 14`; attaching Blackblade **first** is `(2+6+2)×2 = 20`.
**Changes:** `final power = 2 × (power when the doubler resolves) + (pumps added afterwards)`, so moving a pump of N from after the doubler to before it gains **exactly N**. Cast the doubler last — after equips, after deploys, after blockers. Timestamps and layer order are a red herring: once X is locked every layer-7c effect is a plain integer and addition commutes. Corollary in the other direction — a layer-7b *set* effect ("becomes 0/1") applied later does **not** erase the doubling (7b always precedes 7c), but if it resolves **first** the doubler sees the set value and can whiff to +0/+0 entirely.
**Source:** scarlet-witch (2026-09-16), the pilot's "is the doubling continuous if its power keeps increasing?"; mtg-rules-expert. The existing LEDGER notes on Bulk Up and Unleash Fury were checked and are accurate; the `701.10b` citation in SIDEBOARD.md is correct.

### Every resolution opens a fresh priority round, and the ACTIVE player acts first {#trig-030}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Storm King's Thunder; Repeated Reverberation
**Rules:** 117.3b, 117.4, 117.5, 603.3, 704.3, 732.2
**Claim:** When all players pass, only the top object resolves; then state-based actions are checked, any triggers from that resolution go on the stack, and the **active player** (not the controller of what resolved) gets priority. Everyone must pass again for the next object, so a stack of three spells is at least three separate rounds, and every player may respond before each one, including a player who passed on the object above.
**Evidence:** CR 117.4 — the top object resolves only *"if all players pass in succession"*; any action resets it. CR 117.3b — *"The active player receives priority after a spell or ability (other than a mana ability) resolves."* CR 117.5 / 704.3 — state-based actions, then waiting triggers (CR 603.3, in APNAP order), repeated until stable, before anyone gets priority. So a trigger caused by the top object goes above the next object and resolves first. CR 732.2 — a casual "resolve it all" shortcut can be cut short by any player at any point. MTR 4.2 (tournaments, from the web): putting an object on the stack implies passing priority unless you say you are holding it, and anyone may interrupt a shortcut mid-sequence.
**Changes:** Any line that relies on acting "between resolutions" — casting a card an earlier trigger drew, responding after seeing a copy resolve — is legal for you **and** for every opponent. On an opponent's turn they get the first window after each resolution. And a "when you next cast" setup (Storm King's Thunder, Repeated Reverberation) only exists once its own spell has resolved, so anything cast in response to the setup spell is not copied.
**See also:** trig-017
**Source:** scarlet-witch (2026-09-16), the pilot's "does each resolution create a new round of priority?"; mtg-rules-expert.

### "At the beginning of each end step" means EVERY player's end step {#trig-031}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Fraying Sanity
**Rules:** 113.7a, 608.2h
**Claim:** Fraying Sanity triggers four times per turn rotation in a four-player game, not once, and its X is recounted each time — counting every card put into that player's graveyard from ANY source that turn, not just cards you milled.
**Evidence:** Oracle text "At the beginning of each end step, enchanted player mills X cards, where X is the number of cards put into their graveyard from anywhere this turn." Gatherer rulings: X counts cards put there regardless of whether the Aura was on the battlefield at the time and even if they have since left the graveyard; multiple copies compound because they resolve one at a time. Removing the Aura in response to its own trigger does not stop the mill (113.7a, 608.2h) — only the player leaving does.
**Changes:** Read "each end step" as a per-rotation multiplier when costing a card, and value effects that fill the victim's own graveyard (their discards, their creatures dying) as feeding it.
**See also:** trig-005, trig-008
**Source:** cap-living-legend (2026-09-16).

### An "Nth time this ability has resolved this turn" ladder counts RESOLUTIONS — a trigger doubler climbs it, and the drain rung is once per turn {#trig-032}

**Kind:** ruling · **Verified:** 2026-09-22 against CR 2026-08-07
**Cards:** Vito, Fanatic of Aclazotz; Roaming Throne; Teysa Karlov; Blood Artist; Zulaport Cutthroat; Elas il-Kor, Sadistic Pilgrim
**Rules:** 603.2d, 603.3, 603.4, 603.7h, 608.2h, 707.10b
**Claim:** Vito, Fanatic of Aclazotz (*"Whenever you sacrifice another permanent, you gain 2 life if this is the first time this ability has resolved this turn. If it's the second time, each opponent loses 2 life. If it's the third time, create a 4/3 … token"*) with Roaming Throne naming Vampire: ONE sacrifice makes the ability trigger twice, and the two instances resolve as the first and second time — gain 2, then each opponent loses 2 — while a second sacrifice gives the third (the 4/3 flier) and a fourth resolution that does nothing, and without Throne the same ladder needs three sacrifices. Either way the drain rung fires **once per turn** — Vito's drain is capped at 2 per opponent per turn no matter how much you sacrifice.
**Evidence:** CR 603.2d (triggers an additional time; each instance is a separate object per 603.3), 603.4 (the "if this is the first time" clause follows "you gain 2 life", not the trigger condition, so it is not an intervening-if), 608.2h (the count is read as each instance resolves), 707.10b and 603.7h (the game counts resolutions of "the same ability" per turn). Verified by mtg-rules-expert against rules version 2026-08-07.
**Changes:** Score any "first/second/third time this ability has resolved" card as a per-turn cap, not a per-event drain — it competes with uncapped per-death drainers (Blood Artist, Zulaport Cutthroat, Elas il-Kor) on a different axis. Count trigger doublers as ladder accelerators — but only doublers whose wording matches: Throne (a Vampire's trigger) does, Teysa Karlov does NOT (sacrifice triggers are not dies triggers — see the 2026-09-10 Teysa entry).
**See also:** trig-007, trig-024
**Source:** edgar-markov (2026-09-22), evaluating Vito, Fanatic of Aclazotz as a lower-salt commander for the drain list.

### A token sacrificed at the end step is no longer "attacking" — Zurgo Stormrender's own mobilize token drains rather than draws {#trig-033}

**Kind:** ruling · **Verified:** 2026-09-22 against CR 2026-08-07
**Cards:** Zurgo Stormrender; Ashnod's Altar; Viscera Seer; Goblin Bombardment
**Rules:** 111.7, 506.4, 508.1k, 511.3, 603.2c, 603.4, 603.6c, 603.10a, 608.2h, 702.181a
**Claim:** Zurgo Stormrender (*"Whenever a creature token you control leaves the battlefield, draw a card if it was attacking. Otherwise, each opponent loses 1 life."*) reads the token's last-known state: a token that leaves during combat (sacrificed after blocks, killed by a blocker) was attacking and draws, while the same token sacrificed at the end step — which is when mobilize tokens go — was not, and drains 1 from each opponent. The ability triggers once per token in a wipe and still fires if Zurgo dies in the same wipe.
**Evidence:** CR 702.181a (mobilize: sacrifice at the beginning of the next end step), 511.3 (all creatures are removed from combat as the end-of-combat step ends), 506.4 (a creature removed from combat stops being an attacking creature), 508.1k, 603.6c and 603.10a (leaves-the-battlefield triggers look back in time, so a sacrifice-as-cost to Ashnod's Altar / Viscera Seer / Goblin Bombardment triggers it), 608.2h (the "if it was attacking" check uses last-known information; not an intervening-if per 603.4), 603.2c (one trigger per token), 111.7 (a token's zone-change triggers fire before it ceases to exist). Verified by mtg-rules-expert against rules version 2026-08-07.
**Changes:** For any "if it was attacking" or "if it was [state]" leaves trigger, the state is read from LKI at the moment it left, and combat status ends with the combat phase. Mobilize / "sacrifice at the next end step" tokens are therefore *non-attacking* when they die — they feed the drain half of Zurgo, never the draw half. To draw off Zurgo, sacrifice tokens after blockers are declared.
**See also:** trig-021
**Source:** drain-from-scratch brief (2026-09-22) — Zurgo Stormrender evaluated as the commander.

### Attack-trigger doublers (Isshin, Windcrag Siege) double "whenever you attack" commander triggers {#trig-034}

**Kind:** ruling · **Verified:** 2026-09-24 against CR 2026-08-07
**Cards:** Isshin, Two Heavens as One; Windcrag Siege; Caesar, Legion's Emperor
**Rules:** 508.4, 603.2d
**Claim:** Isshin, Two Heavens as One and Windcrag Siege (Mardu mode) make Caesar, Legion's Emperor's "Whenever you attack" trigger twice, and each instance gets its own optional sacrifice and its own two modes.
**Evidence:** Isshin oracle: *"If a creature attacking causes a triggered ability of a permanent you control to trigger, that ability triggers an additional time."* Windcrag Siege Mardu mode reads the same. Isshin ruling 2022-02-18: it affects abilities *"directly related to attacking, such as 'whenever [this creature] attacks' or 'whenever you attack with one or more creatures.'"* Two such effects give 3 instances, not 4 (CR 603.2d). Tokens that enter tapped and attacking never "attacked" (CR 508.4), so they don't add triggers.
**Changes:** For any "whenever you attack" commander, count Isshin-style effects as doublers of the commander itself.
**See also:** trig-006, trig-007, dmg-018, equip-028
**Source:** caesar (2026-09-24), founding build (verified by hand 2026-09-24).

### "Until end of turn, whenever…" is a delayed trigger with a duration — it re-fires every event, and each activation is its own copy {#trig-035}

**Kind:** ruling · **Verified:** 2026-09-25 against CR 2026-08-07
**Cards:** Aphelia, Viper Whisperer
**Rules:** 510.3a, 510.4, 603.2c, 603.7, 603.7a, 603.7b, 603.7e, 608.2h
**Claim:** An activated ability worded *"Until end of turn, whenever one or more X deal combat damage to a player, …"* creates a delayed triggered ability that is **not used up** by its first trigger: it fires once per qualifying damage *event* all turn (so a first-strike step and a regular step are two events), and activating it twice creates two independent delayed triggers that both fire on the same event. Any "half their life" amount is read when the trigger **resolves**, not when damage is dealt.
**Evidence:** CR 603.7 / 603.7a (created on resolution; won't trigger for an event that already happened), 603.7b (*"will trigger only once … unless it has a stated duration, such as 'this turn'"*), 603.7e (source and controller are the activating ability's), 603.2c (one trigger per event — the "one or more" wording collapses simultaneous damage from several creatures into one event), 510.4 (first/double strike gives a second combat damage step), 510.3a (damage-triggered abilities go on the stack after the damage is dealt), 608.2h (game information is read once, at application). Worked case: Aphelia, Viper Whisperer's {4}{B}, target at 20, three Gorgons/Snakes connect for 3 → 17; one activation takes ⌈17/2⌉ = 9 → 8; a second activation's trigger then takes 4 → 4.
**Changes:** Treat a duration-limited "whenever" activation as a *stackable* effect: a second activation is a real second halving, and first strike / double strike on the attackers buys a second trigger. Do not assume the count of attackers matters — only the count of damage events does.
**Source:** rules question on Aphelia, Viper Whisperer (2026-09-25) (mtg-rules-expert; rule texts re-checked in `rules/sections/`). Per-player splitting of the trigger when damage goes to two players is the expert's reading of 603.2c, not a quoted rule — not recorded here as verified.

### A fight outlet is a DEATH outlet, not a SACRIFICE outlet {#trig-036}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** Mirkwood Bats; Ravenous Squirrel; Nadier's Nightblade; Bastion of Remembrance; Cauldron of Essence; Moldervine Reclamation; Blood Artist; Zulaport Cutthroat; Hexhaven Invigorator
**Rules:** 120.5, 700.4, 701.8a, 701.8b, 701.14a, 701.14d, 701.21a, 704.5g, 704.5h
**Claim:** Killing your own token with a fight effect fires every *"dies"* and *"leaves the battlefield"* payoff but **zero** *"sacrifice"* payoffs, which in an aristocrats deck silently skips the best drain card in the list. Fight is **destruction**; destruction and sacrifice are disjoint game actions.
**Evidence:** CR 701.14a — a fight means *"each of those creatures deals damage equal to its power to the other creature"*; CR 701.14d — that damage **isn't combat damage**. The kill then runs CR 120.5 (damage doesn't destroy) → CR 704.5g (lethal-damage SBA destroys) → CR 701.8a (destroy = move to graveyard) → CR 700.4 (*dies* = put into a graveyard from the battlefield). And the clincher, **CR 701.8b**: *"The only ways a permanent can be destroyed are as a result of an effect that uses the word 'destroy' or as a result of the state-based actions that check for lethal damage (704.5g) or deathtouch (704.5h)."* Sacrifice is CR 701.21a, a separate action — *"its controller moves it from the battlefield directly to its owner's graveyard… Sacrificing a permanent doesn't destroy it."* Measured against the Chatterfang list: **Mirkwood Bats** (*"create or sacrifice a token"*) does **NOT** trigger. **Ravenous Squirrel** (*"whenever you sacrifice"*) does **NOT** trigger. **Nadier's Nightblade** (*"token leaves the battlefield"*) **does**. **Bastion of Remembrance**, **Cauldron of Essence**, **Moldervine Reclamation**, **Blood Artist**, **Zulaport Cutthroat** (all *"dies"*) **all do**.
**Changes:** Never treat a fight/ping outlet as a substitute for a real sac outlet in an aristocrats deck — check the payoff wording first, and specifically check whether Mirkwood Bats is load-bearing, because it keys on *create or sacrifice* and is blind to combat and fight deaths. Conversely, when a deck's drain suite is all *"dies"*-worded, a fight outlet is a genuine second outlet.
**See also:** trig-012, trig-024
**Source:** chatterfang / upgrade-test (2026-09-28), pilot proposed fighting Squirrels into Hexhaven Invigorator to get the land payoff and the death payoff at once.

### An instant-speed token maker turns "once each turn" triggers into one per player's turn {#trig-037}

**Kind:** pattern · **Recorded:** 2026-09-28
**Cards:** Kher Keep; Tocasia's Welcome; Skullclamp
**Claim:** A "this triggers only once each turn" payoff fires on every player's turn if the deck can make a token at instant speed, which quadruples it in a 4-player pod.
**Evidence:** Kher Keep (*"{1}{R}, {T}: Create a 0/1 red Kobold creature token"*) next to Tocasia's Welcome (once-per-turn draw on creatures entering) in caesar. The Kobold is also free sacrifice fodder and Skullclamp food.
**Changes:** Value a deck's instant-speed token makers by the number of turns in a round when it runs once-each-turn payoffs.
**See also:** trig-016, trig-020
**Source:** caesar (2026-09-28), FRA review.

### The Enduring cycle returns exactly ONCE — and a sac outlet launders an exile into a death {#trig-038}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** Enduring Vitality; Cryptolith Rite; Swords to Plowshares; Anguished Unmaking; Farewell; Cyclonic Rift; Blood Artist; Zulaport Cutthroat; Bastion of Remembrance; Cauldron of Essence; Marionette Apprentice; Opalescence; Starfield of Nyx
**Rules:** 205.1a, 205.2b, 603.4, 603.10a, 604.2, 613.1d, 613.1f, 700.4, 701.8b, 701.21a, 704.8
**Claim:** An "Enduring" permanent (Enchantment Creature that returns as an enchantment when it dies) comes back **exactly once**, and only from a death it suffered *as a creature*, while its granted/static abilities keep working in enchantment form. And because the return triggers off **any** trip to the graveyard, **sacrificing it to your own outlet converts it into the indestructible-to-creature-removal form on demand** — which is how you answer targeted exile.
**Evidence:** CR **205.2b** — *"Some objects have more than one card type… Such objects satisfy the criteria for any effect that applies to any of their card types"* — so in creature form it is exposed to **both** the creature and the enchantment removal pools, roughly double what a plain enchantment faces. The one-return limit is the **intervening "if" clause**, CR **603.4**: *"the ability checks whether the stated condition is true. The ability triggers only if it is; otherwise it does nothing"* — and *"this rule only applies to an 'if' that immediately follows a trigger condition."* The condition is judged on look-back-in-time / last known information (CR **603.10a**, **704.8**), so once the permanent is a noncreature enchantment, *"if it was a creature"* fails and **nothing ever reaches the stack**. Abilities survive the type change because a type-changing effect is **layer 4** (CR 613.1d) while ability addition/removal is **layer 6** (CR 613.1f), and CR **205.1a** replaces only the types — so the static ability keeps functioning per CR **604.2**. **Sacrifice works:** CR 701.21a moves it *"from the battlefield directly to its owner's graveyard"*, CR 700.4 makes that a death (sacrifice is not destruction, CR 701.8b, but *dies* keys off the zone change), and CR 603.10a explicitly covers *"abilities that trigger when a player sacrifices a permanent."*
**Changes:** Three deckbuilding rules. **(1)** Against a **creature** wipe an Enduring permanent only *ties* a plain enchantment with the same text — both end as a noncreature permanent, but the Enduring one paid its return, its body and its own mana-dork slot to get there. Do not call it "more resilient" without naming which removal. **(2) Exile and bounce beat it completely** — no graveyard trip, no *dies*, no trigger (Swords to Plowshares, Anguished Unmaking, Farewell, Cyclonic Rift). **(3)** In a deck with a **free sacrifice outlet**, hold it as a **reactive** answer: sacrifice in response to targeted exile or a "destroy all creatures and enchantments" sweeper to launder the exile into a death — which in a drain deck also pays Blood Artist, Zulaport Cutthroat, Bastion of Remembrance, Cauldron of Essence and Marionette Apprentice on the way out. Converting proactively is a net loss.

**Two more facts:** in enchantment form it **stops tapping for mana itself** (it is no longer one of "creatures you control"), a one-source downgrade; and if another effect makes your noncreature enchantments creatures again (Opalescence, Starfield of Nyx), the "if it was a creature" clause is satisfied once more and it **can return again**.

**See also:** trig-012
**Source:** upgrade-test (2026-09-28), pilot asked whether to swap Enduring Vitality for Cryptolith Rite.
