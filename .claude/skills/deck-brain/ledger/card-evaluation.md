# Ledger: Card evaluation

How to score a card against the deck in front of you: reading the whole card, riders and modes, self-hits and symmetric effects, redundancy and access, cut nominations, verdicts that expire, and naming the deciding axis. Entry format and capture rules: `../SKILL.md` §4.
Search every topic at once with `bun run lookup "<card | rule number | term>"`.

---

### Called a sorcery a defensive card {#eval-001}

**Kind:** correction · **Recorded:** 2026-08-02
**Cards:** Insurrection
**Claim:** Anything claimed as an answer has to be castable when the threat arrives; a sorcery cannot respond to an attack, so check the card type before filing a card as defence.
**Evidence:** Described Insurrection as part of the defensive package. It's a **sorcery** and cannot be cast in response to an attack. *Root cause:* reasoned about the effect without checking the timing.
**Changes:** For anything claimed as an answer, check the card type first. A defensive package made entirely of sorceries can only pre-empt, never respond — which is exactly the gap that later justified a permanent.
**Source:** deck not recorded (2026-08-02) — Insurrection described as part of the defensive package.

### Redundancy in singleton is access — only a bare multiplier with few payoffs is a blank {#eval-002}

**Kind:** pattern · **Recorded:** 2026-08-04
**Cards:** Fire Servant; Solphim, Mayhem Dominus; Ojer Axonil, Deepest Might; The Fire Crystal; Ruby Medallion; Fiery Emancipation; Twinflame Tyrant; Reyav, Master Smith; Halvar, God of Battle; Blackblade Reforged; Colossus Hammer; Sword of the Animist
**Rules:** 616.1
**Claim:** "Redundant" is not a cut reason on its own: in a 99-card singleton deck a second card doing the same job is access and insurance, and the only real "two is greedy" case is a bare multiplier with too few payoffs to multiply. Cost reducers never blank each other, and in a payoff-dense deck a second multiplier is a consistency slot.
**Evidence:**
- 2026-08-04 (scarlet-witch): A damage/token multiplier does nothing alone; it needs a payoff. The second one is a second potential blank. Fire Servant, Solphim and Ojer Axonil were each rejected as second multipliers. Redundancy in **payoffs** is good — the deck deliberately runs two table-killers.
- 2026-08-07 (scarlet-witch): Unlike multipliers, extra cost reducers never blank each other — they stack additively and every copy pays off on every subsequent spell. The Fire Crystal's reduction line is word-for-word Ruby Medallion's. Running both is −2 generic on every red spell; in a six-spell turn that is six mana. Contrast the multiplier rule ("one is right, two is greedy"), where the second copy is a blank without a payoff to multiply.
- 2026-09-04 (vision-scarlet-witch): The second damage multiplier is a blank only in a deck whose payoffs are few. In a deck where nearly every permanent and every combat step is a payoff, a second multiplier is redundancy for the draw, exactly like a second copy of any other engine piece. The 2026-08-04 rule came from scarlet-witch, which had two table-killers to multiply. vision-scarlet-witch has eight per-spell converters, a commander attacking every turn and five power-to-face spells — with any one of those on board a multiplier is live. Hypergeometric: one copy in 99 is seen in the first 15 cards ≈ 14%, two copies ≈ 27%. Multipliers commute (×3 and ×2 = ×6, CR 616.1 order irrelevant for multiplication). The pilot: *"you might say 2 sounds greedy but not really because we might never draw them."*
- 2026-09-09 (captain-america): Across one build I used redundancy as the stated grounds for three cuts — Reyav, Master Smith ("double strike doesn't stack with Halvar"), Blackblade Reforged ("Colossus Hammer already provides the +10 stat jump") and partly Sword of the Animist ("ramp is redundant at 42 mana sources"). The pilot pushed back: *"there's no such thing as 2 is redundant — if you just put 1 card in the deck there's absolutely no guarantee that you ever play that card, so having 2 of something helps."* Why they're right: the deck is 99 singleton cards. One copy of an effect is not access to that effect, it is a probability of access; a second card doing the same job roughly doubles it, and also insures against the first being removed. Non-stacking is not the same as blank — a second double-strike granter is a **spare key**, dead only in the narrow case where the first is already on the battlefield and unanswered.
**Changes:**
- SKILL.md §2.5 rewritten (2026-09-09) from *"redundancy in multipliers is not [good]"* to a two-part test: (1) how load-bearing is the effect — if the plan needs it, run more copies even when they don't stack; (2) is the surplus copy a **substitute** (interchangeable, costs nearly nothing — run both), a **blank** (a bare multiplier with no payoff — the only real "two is greedy" case), or **genuinely multiplicative** (stacks, run several). "Redundant" is banned as a cut reason on its own; name the blank and why, or there is no argument.
- Before applying the one-multiplier rule, count the multiplier's payoffs in the list. Under ~4, one is right. At 10+, the second is a consistency slot and the question becomes which two: prefer one enchantment (resilience) and one opponent-only wording (no self-hits) — Fiery Emancipation + Twinflame Tyrant — over two of the same shape.
- Before adding a second multiplier, ask whether it stacks *multiplicatively* with the first (fine — they commute) or is a floor/additive (check the replacement-effect ordering rule).
- Never apply the multiplier-redundancy warning to reducers. The only ceiling on reducer count is the generic-symbol cap (cost-004), not diminishing returns.
**History:** On 2026-08-04 this ledger claimed "One multiplier is right, two is greedy"; narrowed on 2026-09-04 because the second multiplier is a blank only where payoffs are few, and generalised on 2026-09-09 because in singleton the second copy is access, not waste — "redundant" is no longer a cut reason on its own.
**See also:** eval-015, eval-028, dmg-019, repl-001, cost-004
**Source:** scarlet-witch (2026-08-04, "One multiplier is right, two is greedy"); scarlet-witch (2026-08-07, merged from "Cost reducers are the one effect where redundancy is unambiguously right"); vision-scarlet-witch (2026-09-04, the pilot's "2 sounds greedy" pushback, merged from "\"One multiplier is right, two is greedy\" is gated on payoff density"); captain-america (2026-09-09, the pilot's review of five swaps, merged from "Cut three cards for being \"redundant\" — in singleton, the second copy is access, not waste")

### A card that requires attacking is dead in a deck that doesn't attack {#eval-003}

**Kind:** pattern · **Recorded:** 2026-08-04
**Cards:** Backdraft Hellkite; Dreadhorde Arcanist; Silent Arbiter
**Claim:** Filter the whole candidate pool by whether its trigger condition ever happens.
**Evidence:** Backdraft Hellkite and Dreadhorde Arcanist both rejected on this alone. The mirror image: Silent Arbiter's "no more than one creature can attack" is nearly one-sided *because* you never attack.
**Changes:** Check the trigger condition against the deck's actual behaviour before evaluating power level.
**See also:** eval-030, tap-002
**Source:** scarlet-witch (2026-08-04).

### A past verdict is evidence, not a ruling — re-derive it when its grounds change {#eval-004}

**Kind:** correction · **Recorded:** 2026-08-04
**Cards:** Ramunap Ruins; Scavenger Grounds; Sorin, Imperious Bloodlord; Herald's Horn; Urza's Incubator; Captivating Vampire; Sangromancer; Anowon, the Ruin Sage; Stromkirk Captain; Markov Baron; Vision of Love; Demand Answers; Insight Engine
**Claim:** Facts (a CR citation, oracle text, a measurement) keep; verdicts ("X beats Y here") expire when the list they were made against changes, so re-derive any verdict whose grounds named a card, a count or a comparison that has since changed. A verdict whose grounds are a principle about card types does not expire when the rival that embodied it leaves.
**Evidence:**
- 2026-08-04 (scarlet-witch): When card A was justified by synergy with card B, and B gets cut, re-derive A. Ramunap Ruins was proposed for its Desert synergy in the same pass that cut Scavenger Grounds — the only other Desert. It had to be walked back.
- 2026-08-06 (edgar-markov, 45-card vampire upgrade pass): Sorin, Imperious Bloodlord was seated on *"−3 cheats the deck's heavy 5-drop tier (8 cards) into play."* Two rebuild phases later the list had **two** legal `−3` targets above MV4, and Herald's Horn + Urza's Incubator had taken `{3}` off every Vampire creature spell, so `−3` was saving one mana. The stated reason had silently evaporated.
- 2026-08-06 (the same 45-card upgrade pass): I repeatedly deferred to prior verdicts instead of re-deriving them — quoting "evaluated and passed", "previously cut, confirmed", "outlets are capped" as if they were findings. The user identified the cause: the skill *told* me to. SKILL.md's preamble read *"half the questions have already been settled once, and re-deriving them is how contradictions get introduced,"* and `decisions.md` carried a heading literally reading **"do not re-litigate."** *Root cause:* the skill did not distinguish **facts** (a CR citation, oracle text, a measurement — durable) from **verdicts** ("X beats Y here" — true only of the list as it stood that day). Every swap since silently invalidated some verdicts, but the framing treated all prior notes as settled. Evidence it was doing real damage, all in one session: Sorin's justification named an 8-card tier that had shrunk to two targets · Captivating Vampire's steal→sacrifice-as-removal use was never considered by the original evaluation · Sangromancer had been ranked below the MV4 band before Anowon existed to feed it · Stromkirk vs Markov Baron (eval-012).
- 2026-09-02 (iron-man): I proposed reviving Vision of Love / Demand Answers ({1}{R} instant, sac an artifact or discard, draw two) on the grounds that the recorded reason for passing it — *"lost to Insight Engine"* — had expired under §1.1b, because Insight Engine was no longer in the list. The pilot pushed back: *"this was moved out for a reason. why bring it back?"* They were right on both counts. It had never been in the 100 (it was proposed and reverted on their own call), and the reason it lost was **a principle, not a comparison**: a one-shot loses to a repeatable engine at the turn count the deck actually reaches. That principle is untouched by Insight Engine leaving, and the deck's whole V3 thesis is repeatable draw — so the card loses again, harder. *Cause:* §1.1b says verdicts expire because they are functions of a list that has changed. I applied it mechanically to the *named rival* instead of to the *grounds*. Some grounds are facts about the list (which expire); some are principles about card types (which do not).
**Changes:**
- New **SKILL.md §1.1b — "A past verdict is evidence, not a ruling."** (2026-08-06) Facts keep, verdicts expire; never cite a prior verdict as a reason, cite its *grounds* and check whether they still hold; re-read oracle text on both sides of every comparison; re-score cuts against the **post-package** board; and when the user questions a call, re-derive from scratch rather than defending from the notes. The preamble and §3 were rewritten to match, and **"do not re-litigate" is now banned phrasing** in the decision logs.
- After any cut, scan for cards whose stated justification referenced it (2026-08-04).
- A justification that named a COUNT expires when the count changes (2026-08-06): when a card was seated because of how *many* of something the deck had, re-derive it whenever that tier gets rebuilt — not just when a single named synergy piece is cut. This extends the 2026-08-04 rule from *card A referenced card B* to *card A referenced a population*. After any curve or tier change, grep the decision log for justifications containing a number and re-count them.
- Before invoking §1.1b to revive a card (2026-09-02), read the recorded grounds and classify them. If the grounds name a **specific card** ("lost to X"), the verdict expires when X leaves. If the grounds name a **category or principle** ("a one-shot loses to a repeatable engine", "a sorcery version of an instant is the worst copy"), the verdict survives, and reviving the card requires attacking the principle — not noting that one card that embodied it is gone.
**History:** On 2026-08-06 this ledger said verdicts expire because they are functions of a list that has changed; narrowed on 2026-09-02 because grounds that state a principle about card types survive the departure of the rival card that embodied them (Vision of Love, withdrawn).
**See also:** eval-010, eval-011, eval-012, eval-020, eval-023, eval-032, eval-043
**Source:** scarlet-witch (2026-08-04, "Check the enabling synergy still exists after the cut that removed it"); edgar-markov (2026-08-06, 45-card vampire upgrade pass, merged from "A justification that named a COUNT expires when the count changes"); deck not named, the same 45-card upgrade pass per its Sorin evidence (2026-08-06, the user identified the cause, merged from "The skill's own \"don't re-litigate\" framing was causing the anchoring"); iron-man (2026-09-02, Vision of Love withdrawn, merged from "Over-applied §1.1b — a verdict resting on a PRINCIPLE does not expire when its rival leaves")

### Name the deciding axis out loud — the easiest axis to measure is rarely the one that decides {#eval-005}

**Kind:** pattern · **Recorded:** 2026-08-04
**Cards:** Fiery Emancipation; Solphim, Mayhem Dominus; Longshot, Rebel Bowman; Arcane Bombardment; Improvisation Capstone; Past in Flames; Wanda's Vision; Increasing Vengeance; Flashback
**Claim:** State which factor drove a call, because most bad calls are good analysis on the wrong axis — usually the axis that is cheapest to measure or easiest to state rather than the one that decides.
**Evidence:**
- 2026-08-04 (scarlet-witch): Fiery Emancipation vs Solphim was argued twice on **mana** and decided on **resilience**. Defended Solphim over Fiery Emancipation on "two mana cheaper, no friendly fire, has a body." All three were wrong or minor: the gap was one mana (Longshot reduces noncreature spells, so it applies to the enchantment but not the creature), the triple lets X be smaller and pays the mana back, and an enchantment survives a format that runs far more creature removal. The user's counter-argument won. *Root cause:* compared on the cheapest-to-measure axis (mana) rather than the deciding one (resilience).
- 2026-08-04 (scarlet-witch): Arcane Bombardment vs Improvisation Capstone was decided on **where the cards come from** (graveyard = already spent, no loss; library = permanent loss), not rate.
- 2026-09-04 (vision-scarlet-witch): Nominated Past in Flames as the cut for Wanda's Vision on the grounds that it exiles the graveyard Arcane Bombardment draws from, and that Increasing Vengeance and Flashback "already cover recasts." The pilot: *"isn't it technically better than Flashback, because Flashback only targets one spell and then that's it?"* Yes. Past in Flames gives *every* instant and sorcery flashback — in a deck of one-mana cantrips refunded by the commander, ten cards in the yard is ten more casts, ten counters, ten rounds of every pinger and ten draws in one turn — and it has its own flashback, so it happens twice. Preserving a pile for a slower engine is irrelevant on the turn that wins. Flashback (one card, once) was the cut. *Root cause:* compared the two on the axis that was easiest to state (which one leaves the graveyard intact) instead of the one that decides (how big is the turn each one makes). Same family as "Filed a card in the wrong role" (eval-007).
**Changes:**
- Every recommendation names its deciding factor. It also makes the user's counter-argument possible, which is the point.
- Before defending a position twice, ask which axis actually decides it.
- For any recursion or copy card, write down the *size of the turn it produces* in this deck's spell count before comparing it on anything else. A card whose best turn wins the game is not cut for a card whose best turn is one extra spell.
**See also:** eval-007, eval-012, eval-027, eval-037
**Source:** scarlet-witch (2026-08-04, "Name the deciding axis out loud"); deck not recorded (2026-08-04, the Solphim vs Fiery Emancipation defence, merged from "Argued the wrong side and the user's counter-argument won"); vision-scarlet-witch (2026-09-04, the pilot's pushback — they were right, merged from "Argued the mass-recursion card on a resource-preservation axis and missed that its turn is the win")

### Verify, never recall — quote oracle text and costs from the tool, not from memory {#eval-006}

**Kind:** correction · **Recorded:** 2026-08-04
**Cards:** Apex of Power; Return the Favor; Bolt Bend; Unwind; Requiem Angel; Field of Souls; Teysa Karlov
**Claim:** Every claim about a card's text or cost has to come from `bun run card` output in the same message; recalled or gist-matched text has produced a fabricated clause, a missed mode, a wrong cost and a mis-grouped rejection, and verdicts flipped once the real text was read.
**Evidence:**
- 2026-08-04 — Fabricated a free-cast clause on Apex of Power: claimed Apex of Power forces X = 0, in **four** documents. Its actual text is *"you may **cast** spells from among them"* — no "without paying" clause. You pay normally, which is why it adds ten mana. The user hit this in a real game. *Root cause:* recalled the card instead of pulling it, then propagated the error by citing my own documents. The real Apex risk is different and is now documented: anything you don't cast **that turn** stays exiled permanently.
- 2026-08-05 — Under-read oracle text on a card the user was defending: dismissed **Return the Favor** as a redundant third redirect. Its copy mode has no *"you control"* clause — it's the only card in the deck that can copy an **opponent's** spell, or an activated/triggered ability. Bolt Bend was the correct cut instead. *Root cause:* pattern-matched a card into a role from its half-remembered gist.
- 2026-09-02 (inquisitor-greyfax) — Quoted a mana cost wrong with the correct cost on screen: rated Unwind as "4 mana and can't counter creatures" in an evaluation, minutes after `bun run card "Unwind"` printed `{2}{U}` in the same session. `--json` confirmed `"manaCost": "{2}{U}", "cmc": 3`. The user caught it. The error inverted the verdict: at 3 mana with "untap up to three lands" the card is **mana-neutral** — a free counterspell that leaves the deck's `{1}` activations online on an opponent's turn — which moved it from "no" to a legitimate include.
- 2026-09-24 (teysa-karlov) — Requiem Angel triggers on tokens dying, as long as they aren't Spirits. The Teysa founding entry rejected it as "keyed on nontoken creatures dying", which is wrong. Oracle: *"Whenever another **non-Spirit** creature you control dies, create a 1/1 white Spirit creature token with flying."* Field of Souls is the one that says *"nontoken"*. The two were grouped from memory. Under Teysa, each non-Spirit death (Servo, Faerie Rogue, Snake, Goat, Human, Soldier) makes 2 Spirits. The Spirits don't re-trigger it, so it is bounded.
**Changes:**
- `bun run card` before any claim about a card, no matter how familiar.
- When the user pushes back on a card, **re-read the full oracle text before defending**. This is the single most reliable predictor of being wrong.
- Re-read the tool output before quoting a cost; do not paraphrase a lookup you already ran from memory of what the card "should" cost. §1.2 costing is only as good as the number it starts from. When quoting a cost in an argument, quote it from the tool output in that message, not from recall — the failure mode is strongest on cards that feel familiar, exactly as §1.1 warns. When the user corrects a number, re-derive the verdict from scratch; the verdict may flip, not just the digit.
- Same failure as every other §1.1 correction: two cards with similar jobs were pattern-matched to one wording. Re-read both oracles before grouping cards under one rejection. Requiem Angel is back in consideration for Teysa at 6 mana. Its cost is the real objection now, not its trigger.
**See also:** eval-016, cost-001
**Source:** deck not recorded (2026-08-04, the user hit the Apex error in a real game, "Fabricated a free-cast clause on Apex of Power"); deck not recorded (2026-08-05, merged from "Under-read oracle text on a card the user was defending"); inquisitor-greyfax (2026-09-02, "Unwind is 3 mana not 4", merged from "Quoted a mana cost wrong with the correct cost on screen"); teysa-karlov (2026-09-24, re-deriving the founding rejections during the "deck is unplayable" rebuild, merged from "Requiem Angel keys on NON-SPIRIT deaths, not nontoken — the founding rejection misread it")

### File a card by what it does in this deck, including its alternate cost and the pilot's win conditions {#eval-007}

**Kind:** correction · **Recorded:** 2026-08-04
**Cards:** Jaya's Immolating Inferno; Crackle with Power; Storm King's Thunder; Electrodominance; Blustersquall; Hylda of the Icy Crown; Verity Circle; Elenda, the Dusk Rose; Malakir Bloodwitch; Bloodline Recollector
**Claim:** A card's role is what it does in this deck, not its type line, cost template or headline mode; an overload line or the pilot's view of it as a finisher can put it in a different role entirely, and a card cut from the wrong role is cut on false grounds.
**Evidence:**
- 2026-08-04 — Filed a card in the wrong role and cut it on that basis: Jaya's Immolating Inferno was sidelined as "a fourth X-spell behind Crackle, Storm King's Thunder and Electrodominance." But Storm King's Thunder is a *copier* and Electrodominance hits **one** target. Jaya's is the deck's **second table-killer**. *Root cause:* grouped by card template ("X-spell") rather than by function.
- 2026-09-02 (inquisitor-greyfax): Cut Blustersquall from an Esper tap deck as "one-shot tempo in a deck that wins by grinding." Its overload is `{3}{U}`: **tap every creature you don't control.** In a deck whose kill is "tap the blockers and swing", that is the alpha-strike button — and with Hylda of the Icy Crown out it is also a dozen 4/4 tokens, and with Verity Circle a dozen cards. The user caught it. This is the **third instance** of the same failure in this repo — Jaya's Immolating Inferno ("a fourth X-spell", actually the second table-killer) and the Elenda cut both went the same way.
- 2026-09-28 (edgar-markov, FRA review): Malakir Bloodwitch (*"each opponent loses life equal to the number of Vampires you control"*) was nominated as the cut for a draw engine as "one-shot reach" (the Bloodline Recollector proposal). The pilot rejected it: *"she is a finisher."* In a tribal drain deck, the card that converts board width into a table-wide drain is a win condition, not filler. §2.4's "a card filed in the wrong role", once more.
**Changes:**
- Classify by what a card *does in this deck*, not by its type line or cost template.
- Read the *overload / kicker / escalate* line before assigning a card its role. The alternate cost is often a different card in a different role. Before cutting any card, write down the role you are cutting it *from* and check that role against the card's **full** text including alternate costs. If a card has an overload, kicker or entwine line, evaluate the expensive mode as its real mode.
- Before nominating a cut from a different role, check whether the pilot counts it as a win condition.
**See also:** eval-005, eval-016, eval-036
**Source:** deck not recorded (2026-08-04, "Filed a card in the wrong role and cut it on that basis"); inquisitor-greyfax (2026-09-02, closer pass — "we can't rely on 1 big creature.", merged from "Filed an overload spell as \"tempo\" and nearly cut the deck's alpha-strike button"); edgar-markov (2026-09-28, FRA review, pilot override, merged from "CORRECTION: a drain-on-ETB \"reach\" creature is a finisher to the pilot, not a cut candidate for draw")

### A lord keyed to COLOUR, not tribe, can wipe your own tokens {#eval-008}

**Kind:** pattern · **Recorded:** 2026-08-06
**Cards:** Ascendant Evincar; Charismatic Conqueror; Elenda, the Dusk Rose; Elspeth, Storm Slayer; Edgar, Charmed Groom; Edgar Markov
**Claim:** Before adding a global static that buffs or shrinks by **colour**, list the colours of every token your deck makes.
**Evidence:** Ascendant Evincar (*"other black creatures get +1/+1; nonblack creatures get −1/−1"*) rejected for Edgar: Charismatic Conqueror's tokens, Elenda's death tokens and Elspeth's Soldiers are all **white** 1/1s and would die on the spot. Two-colour tokens (Edgar's Coffin makes white *and* black) are safe — "nonblack" excludes them.
**Changes:** Specific instance of "check the card against your own board" (SKILL §1.3), sharpened: tribal decks read colour-keyed lords as tribe-keyed lords by habit. Read the actual noun.
**Source:** edgar-markov (2026-08-06).

### Price a mana sink against the deck's best other use of that mana {#eval-009}

**Kind:** pattern · **Recorded:** 2026-08-06
**Cards:** Stensian Sanguinist; Edgar Markov; Retrofitter Foundry; Fateful Discovery; Unwinding Clock; Insight Engine; Mind's Eye; Thopter Spy Network; Urza, Lord High Artificer
**Claim:** A repeatable X-spell, activated sink or per-activation engine is priced against the deck's *best alternative use of that mana*, not against its own rate: it is only "free value" in a deck with spare mana, and adding a better sink silently re-prices every pay-to-use engine already in the list.
**Evidence:**
- 2026-08-06 (edgar-markov, raised by the user): In a deck whose payoff triggers on *casting*, every point spent on the sink is a trigger not generated. Stensian Sanguinist's Exsanguinate was recommended for Edgar Markov as a scalable finisher and rejected by the pilot: Edgar's eminence makes a token per Vampire *spell cast*, so mana routed into Exsanguinate is tokens, lords-scaling and drain triggers not made. The card is excellent in a deck that floods mana and has nothing to spend it on — the opposite deck.
- 2026-09-09 (iron-man): Adding a card-drawing mana sink can turn a former bargain into the worst use of the same mana. iron-man ran Retrofitter Foundry (`{2}, {T}`: 1/1 Servo) as a cheap token engine feeding Fateful Discovery. It was cheap while the deck had nothing else to spend Unwinding Clock-refreshed mana on. After Insight Engine (`{2}`: draw an escalating pile) and Mind's Eye (`{1}`: draw a card per opponent draw) joined, the same `{2}` bought a 1/1 instead of cards, and Thopter Spy Network already made a flying artifact token **free** every upkeep. The pilot spotted this before the assistant did.
**Changes:**
- Before adding a sink, ask **what the deck already does with that mana.** Cost-reduction decks and cast-trigger decks want *more castable cards*, not a place to dump mana. Big-mana decks with a low card count want the sink. Same card, opposite verdicts — cf. the one-shot rituals entry (build-001).
- After adding any repeatable mana sink, list every card in the deck with a per-activation cost and ask what else that mana now buys. This is the mirror of the mass-untapper entry (tap-006): an untapper multiplies how *often* you can pay, while a mana sink raises the *price* of paying for anything else.
**See also:** eval-039, tap-006
**Source:** edgar-markov (2026-08-06, raised by the user, "A mana sink competes with the engine when the engine is \"cast spells\""); iron-man (2026-09-09, Retrofitter Foundry cut for Urza, Lord High Artificer, merged from "A cheap token engine stops being cheap when better mana sinks arrive — re-price per-use costs after every engine add")

### Score every mode and every use against the whole deck — one dead line is not a dead card {#eval-010}

**Kind:** correction · **Recorded:** 2026-08-06
**Cards:** Captivating Vampire; Viscera Seer; Ashnod's Altar; Master of Dark Rites; Edgar Markov; Skullclamp; Yahenni, Undying Partisan; Akroma's Will; Grand Crescendo
**Claim:** A card rejected for one non-functional mode, or judged on its obvious use, can still be elite on another; enumerate every mode and every use against every other engine in the deck, and score the card on the one the deck will actually choose.
**Evidence:**
- 2026-08-06 (edgar-markov): Proposed cutting **Captivating Vampire** from Edgar Markov, arguing its ability ("Tap five untapped Vampires: gain control of target creature") competes with attacking and so is rarely used. The user pointed out the use I hadn't considered: **steal it, then sacrifice it.** With Viscera Seer, Ashnod's Altar and Master of Dark Rites as free outlets, that is unconditional removal that also feeds every death trigger in the deck — and it works on hexproof, indestructible and regenerating creatures. *Root cause:* evaluated the ability inside one plan (combat) instead of against the whole deck.
- 2026-08-25 (edgar-markov): Skullclamp was passed over in Edgar on the grounds that anthems stop a clamped 1/1 from killing itself — which is true, and is only half the card. Skullclamp reads *"Equipped creature gets +1/-1"* **and** *"Whenever equipped creature dies, draw two cards."* Equip {1} to any creature, sacrifice it to a free outlet, draw 2 — the creature's size never enters into it. Edgar holds three free outlets (Viscera Seer, Ashnod's Altar, Yahenni); with Ashnod's Altar the sacrifice pays the next equip and nets a mana. EDHREC agrees on where it is best: 77% in the aristocrats theme, 73% aggro, 61% overall.
- 2026-09-28 (cap-living-legend `engine`, FRA review): The review proposed Grand Crescendo for Akroma's Will because *"Akroma's second mode (flying/double strike) does nothing in a list that never attacks"*. But Akroma's Will's other mode is *"Creatures you control gain lifelink, indestructible, and protection from each color until end of turn"*, and with a commander out you get both. Grand Crescendo only gives indestructible (plus X tokens). The pilot rejected the swap: *"akroma is giving us protection which grand crescendo isn't."* Protection from each colour stops every coloured targeted answer and coloured damage.
**Changes:**
- For any activated ability, enumerate its uses **against every other engine in the deck** before judging it. Steal effects in a deck with a sac outlet are removal, not combat tricks; the same goes for tap effects, bounce, and "gains control until end of turn."
- When a card has a self-executing mode and an enabled mode, name both and score each against the current list before writing a verdict. The self-executing mode failing is not a rejection.
- When the argument is "this card's mode is dead", quote every mode. This is §2.4's "a clause missed in the oracle text" again, on a card the deck already ran.
**See also:** eval-016, eval-021, eval-044, eval-045
**Source:** edgar-markov (2026-08-06, the user's steal-then-sacrifice point, "Evaluated an activated ability for only its obvious use"); edgar-markov (2026-08-25, re-derivation of a prior pass's Skullclamp cut, merged from "Score an Equipment (or any two-mode card) on BOTH modes before rejecting it"); cap-living-legend (2026-09-28, FRA review, pilot override, merged from "CORRECTION: rate a modal card on the mode the deck actually uses")

### Never cut a card the incoming package feeds — re-score every cut against the post-package list {#eval-011}

**Kind:** correction · **Recorded:** 2026-08-06
**Cards:** Sanguine Bond; Sangromancer; Anowon, the Ruin Sage; Krang, Utrom Warlord; Tony Stark; Buster Sword; The Vision and Scarlet Witch
**Claim:** A card that looks redundant against the current list can be the payoff for something arriving in the same swap package; score every proposed cut against the list as it will exist after the whole package, and grep each cut's oracle text for the incoming card's trigger words. This mistake was made three times.
**Evidence:**
- 2026-08-06: Recommended cutting **Sanguine Bond** to make room for Anowon, calling it a redundant third *gain → they lose* converter with no body. The user vetoed it. They were right, and the cut was actively backwards: the same pass added **Sangromancer**, which generates a lifegain event per opponent creature death — exactly what Sanguine Bond converts. The package raised Bond's value while I was arguing to cut it. *Root cause:* evaluated each swap in isolation against the *current* list rather than against the list as it would exist after the whole package resolved.
- 2026-08-20 (iron-man, V2 amendment), the second occurrence: iron-man V2 cut Krang, Utrom Warlord ("cheat-only top-end") in the same 14-swap package that grew artifact-creature bodies from ~7 to ~12 plus every Thopter and Construct token — exactly the set Krang's "other artifact creatures have flying, trample, indestructible, haste" multiplies. The pilot caught it on review; Krang also grants the flipped commander indestructible, since The Invincible Iron Man is an artifact creature. The LEDGER already held this pattern (the 2026-08-06 Sanguine Bond case above) and it was not consulted for the cut list.
- 2026-08-21 (iron-man V2), "third repeat in one day": The Vision and Scarlet Witch ("whenever you cast a spell") was being added and Buster Sword ("you may cast a spell from your hand … without paying its mana cost") was nominated as the cut on the grounds "its card-advantage rider is duplicated." The free cast is a cast: it triggers the very engine being added. The pilot caught it after the swap was applied. Same shape as Krang (anthem vs the creature count the package grew) earlier the same day. The 2026-08-20 guard ("re-score the CUT list after the IN list is fixed") was not enough, because the check was done by role label, not by oracle text.
**Changes:**
- Once a swap package is drafted, re-score every proposed **cut** against the post-package board, not the pre-package one. A card that looks redundant today can be the payoff for something arriving in the same breath. (2026-08-06)
- Before cutting any card that scales off a count, re-score it against the count AFTER the package it's being cut in, not before. When building a swap package, run the CUT list through a second pass **after** the IN list is fixed, asking each cut: "does anything entering this package feed you?" Grep the ledger for the pattern name before finalizing, not after the user objects. (2026-08-20)
- When the incoming card is a *cast-matters* or *enters-matters* engine, grep the oracle text of every nominated cut for the trigger words ("cast", "without paying its mana cost", "enters", "create") before naming it. Before finalizing any swap, list the incoming card's trigger words and grep the cut candidates' oracle text for them — a mechanical step, not a judgment call. If any hit, the candidate is not a cut; it's a synergy. (2026-08-21)
**See also:** eval-004, eval-038, eval-041
**Source:** deck not recorded (2026-08-06, the user vetoed the Sanguine Bond cut, "Proposed cutting a card that the same swap package makes better"); iron-man (2026-08-20, V2 amendment, the user's "since we're increasing creatures this gives all our creatures trample… might be worth prioritizing over Darksteel.", merged from "Cut an anthem in the same package that multiplied its targets — the 2026-08-06 mistake, repeated"); iron-man (2026-08-21, the user's "buster sword isn't just card draw, it's also a free cast.", merged from "Nominated a cut that the incoming card feeds — third repeat in one day")

### Nominated a cut from a group of four without ranking the group {#eval-012}

**Kind:** correction · **Recorded:** 2026-08-06
**Cards:** Stromkirk Captain; Markov Baron; Edgar Markov
**Claim:** Nominating one card out of an over-subscribed role without ranking the whole role is how the wrong one gets cut, and an unstated castability argument never gets tested.
**Evidence:** Edgar Markov had four Vampire lords. I nominated **Stromkirk Captain** for the cut ("the 4th lord") and separately wrote of **Markov Baron** *"convoke makes it cheap in practice, keep"* — never putting the two side by side. The user asked why. Side by side it flips: Stromkirk grants **the whole team first strike** (a combat multiplier that scales with the go-wide plan and Edgar's attack counters), while Baron's lifelink is on itself alone and its **madness is dead** in a deck with no discard outlet. Convoke saves 1–2 mana and only with untapped creatures you weren't attacking with. *Root cause:* two failures compounding. (1) I ranked *one* card against the role instead of ranking the whole role. (2) The real basis for the nomination was **castability** — Baron is mono-black, Stromkirk needs red off 15–16 sources — which I never stated, so it never got tested.
**Changes:** SKILL.md §2.1 step 4 is now mandatory: **when a role is over-subscribed, put every card in it in a table with one column per rider, scored against the current list, before naming a cut.** And if castability is doing the work, say so — it is a legitimate axis, but only when named.
**See also:** eval-005, build-005
**Source:** edgar-markov (2026-08-06) — the user asked why.

### Size a "for each X you control" scaler at the battlefield count — and check it before cutting X {#eval-013}

**Kind:** pattern · **Recorded:** 2026-08-07
**Cards:** Blackblade Reforged; Mountain; Valakut, the Molten Pinnacle; Gauntlet of Power; The Scarlet Witch; Crackle with Power
**Claim:** Cutting one unit of a resource (a land, a creature, an artifact) can cost far more than the unit if cards in the deck read "for each" — but the scaler's size is the realistic battlefield count at the turn it matters, never the deck count.
**Evidence:**
- 2026-08-07 (scarlet-witch): Cutting a Mountain looked nearly free until Blackblade Reforged was re-read: *"+1/+1 for each land you control."* On a commander whose power **is** the cost discount, every land is one mana off every MV 4+ spell — so a single land cut taxes every haymaker for the rest of the game. Valakut also needs *"at least five other Mountains"*, and Gauntlet of Power only doubles **basics**.
- 2026-08-21 (scarlet-witch): Told the user Blackblade Reforged puts Wanda at "~34 power" and makes Crackle X=11 cost {R}{R}. Blackblade's text is *"Equipped creature gets +1/+1 for each land you control"* — lands on the battlefield, not lands in the 99. On turn 6–8 that is +6 to +10, so Wanda is a 10/11-ish, not a 35/36. The user's own figure ("even at 11/11, two unblocked swings kill someone") was the correct one. The same conflation sits in `decks/scarlet-witch/research/decisions.md` (2026-08-07: "At 33 lands that's +33/+33 on Wanda") and `sample-deck-analysis.md` ("a 30+ power commander discounting every haymaker"); both overstate the card by ~3×. *Root cause:* pattern-matched "per land" to the deck's land count because that number was already in the notes as the Blackblade argument for not cutting lands. The land-count argument (each land cut lowers the *ceiling*) is still valid; the power figure never was.
**Changes:**
- Grep the list for "for each" and "if you control" before trimming any resource. The count-scaling cards, not the average, set the real floor.
- For any "for each X you control" scaler, state the realistic battlefield count at the turn it matters (T4 / T6 / T8), never the deck count. Commander-damage math in particular: the threshold is 21, so "+N per land" needs N ≥ ~10 on the battlefield to be a two-swing kill.
**See also:** eval-021
**Source:** scarlet-witch (2026-08-07, the "should we drop a Mountain?" question, "Before cutting a resource, check what scales off its COUNT"); scarlet-witch (2026-08-21, the voltron-axis discussion — user's figure was right, merged from "Read \"+1/+1 for each land you control\" as the deck's land COUNT")

### A cut's stated grounds were arithmetically wrong {#eval-014}

**Kind:** correction · **Recorded:** 2026-08-07
**Cards:** Runaway Steam-Kin; Electro, Assaulting Battery
**Claim:** A rate asserted from a card's shape is not a rate: a cap on storage is not a cap on throughput, so compute any rate that grounds a cut over a real turn.
**Evidence:** Runaway Steam-Kin was hard-cut on the grounds *"caps at three counters"* while rivals "add {R} per spell with no cap." Re-deriving: over six red spells it accrues 3 → {R}{R}{R} → 3 → {R}{R}{R} = **one mana per spell, identical to Electro.** The cap limits *storage*, not *throughput*. *Root cause:* a rate claim asserted from the card's shape rather than computed over a real turn.
**Changes:** When a cut's reason is a rate, compute the rate over a representative turn. The verdict survived here on fragility (a 1/1 dies to your own sweeper), but it was filed under the wrong reason for weeks — and a wrong reason is what gets copied forward.
**See also:** eval-038
**Source:** deck not recorded (2026-08-07) — re-deriving the Runaway Steam-Kin hard cut.

### Before calling a card a gap-filler, grep the current list for the effect {#eval-015}

**Kind:** correction · **Recorded:** 2026-08-07
**Cards:** Torbran, Thane of Red Fell; Ojer Axonil, Deepest Might; Artist's Talent; Boseiju, Who Shelters All; Hexing Squelcher; Fiery Inscription; Longshot, Rebel Bowman
**Rules:** 616.1
**Claim:** Candidates were recommended for gaps the 100 had already filled (once on 2026-08-07, twice more in one document on 2026-08-10), because they were compared against the card they replaced rather than against every card already on the list; the guard is an effect-grep, and under volume it has to run as one batch before any verdict is written.
**Evidence:**
- 2026-08-07 — Recommended a card as filling a gap the deck had already filled: recommended Torbran as "the additive damage booster that works, unlike Ojer." **Artist's Talent Level 3** — already in the deck — reads *"if a source you control would deal noncombat damage to an opponent or a permanent an opponent controls, it deals that much damage plus 2 instead."* In a mono-red deck that never attacks that is the same card. Torbran would be a second copy, not a first. *Root cause:* evaluated the candidate against the card it was replacing (Ojer) and never against the cards already on the list — in particular one added four days earlier.
- 2026-08-10 — Repeated twice in one document: in a 67-card comparison write-up, recommended **Boseiju, Who Shelters All** as "the cleanest insurance on the list" for protecting our one big spell, and **Ojer Axonil** as turning Fiery Inscription and Longshot "from 2 into 4." Both axes were already covered from inside the 100: **Hexing Squelcher** grants *"spells you control can't be countered"*, and **Artist's Talent Level 3** already adds +2 to noncombat damage to opponents — and per **CR 616.1** the affected opponent chooses replacement order, so they apply Artist's Talent first (2 → 4) and Ojer, needing damage *less than* its power of 4, then does nothing at all. *Root cause:* the 2026-08-07 guard ("grep the current list for the effect, not just the card name") was not run — because the verdicts were written in bulk, 67 at a time, and a per-card check felt too expensive to repeat. Volume is exactly when it matters most.
**Changes:**
- Before calling anything a gap-filler, grep the current list for the effect, not just for the card name.
- When writing more than a handful of verdicts in one pass, do the effect-grep as a **batch step before writing any of them** — extract the effect phrases from the candidate list and grep the current 100 once for all of them. A per-card guard that is skipped under volume is not a guard.
**See also:** eval-002
**Source:** deck not recorded (2026-08-07, "Recommended a card as filling a gap the deck had already filled"); deck not recorded (2026-08-10, a 67-card comparison write-up, merged from "Repeated the \"gap the deck had already filled\" mistake twice in one document")

### Read every clause before ranking a card — the headline ability, the section label and the field number hide second roles {#eval-016}

**Kind:** correction · **Recorded:** 2026-08-07
**Cards:** Extinguisher Battleship; Blasphemous Act; Knuckles the Echidna; Gauntlet of Power; The Scarlet Witch; Passionate Archaeologist; Mana Flare; Electro, Assaulting Battery; Ashling, Flame Dancer; Hazel of the Rootbloom; Greenhouse Propagator
**Claim:** A card's splashiest ability, the section it is filed in, a hand-written role note or its field inclusion each describe one job, and the full oracle text often holds a second; ranking a card for a cut, or recording why it was kept, from anything less nearly loses load-bearing cards.
**Evidence:**
- 2026-08-07 (iron-man) — Judged a card by its splashiest ability and missed that it was a free board wipe: proposed cutting Extinguisher Battleship because Station (tap creatures to animate it) is awkward in a creature-light deck. The user pointed out it isn't in the deck as a Spacecraft at all — it's there as a **free, fetchable wipe**: *"destroy target noncreature permanent. Then deal 4 damage to each creature"*, deployed for **zero mana** by a commander that puts artifacts onto the battlefield from hand. *Root cause:* read the mechanically novel ability first and let it define the card's role.
- 2026-08-19 (iron-man) — A successful defense recorded incomplete grounds: Knuckles the Echidna was defended from a cut on 2026-08-07 and the recorded grounds were "part of the 6-maker Treasure package." The card's *strongest* clause — *"At the beginning of your upkeep, if you control thirty or more artifacts, you win the game"* — appeared nowhere in the notes. When the user proposed cutting it again on 2026-08-19, the recorded grounds alone would have lost the argument; the full re-read is what kept the card (a live alternate win condition in a 42-artifact deck). *Root cause:* the defense stopped at the first sufficient reason. Grounds recorded under time pressure describe the role that was being argued about, not the card — so the file preserved a *sufficient* case instead of the *best* case, and sufficiency decays as the list changes.
- 2026-09-06 (scarlet-witch) — Nominated a cut on field signal: named Gauntlet of Power as the bottom row of Scarlet Witch's ramp role on the grounds "five mana, not on the Wanda page, 0/10 in the sample, symmetric" — and proposed it as the slot for Passionate Archaeologist. The pilot asked "do we need Gauntlet?" and the re-read showed the grounds were the crowd's, not the card's: *"Creatures of the chosen color get +1/+1"* puts +1 power on The Scarlet Witch, and her power **is** the discount on every MV 4+ instant and sorcery — so Gauntlet is a permanent cost reducer in a deck with only four cards in the "pump her power" role, as well as a one-sided doubler on 21 basic Mountains whose surplus banks under Electro / Ashling. The 2026-08-04 add entry had recorded exactly this; the 2026-08-21 go-further list had re-filed it as a cut on inclusion alone. *Root cause:* SKILL §2.2 in reverse — read "0/10, not on page" as a verdict, then went looking for text to confirm it instead of costing the card's every clause against the deck (§1.2, §1.1b).
- 2026-09-28 (upgrade-test wave 7) — A role label hid half the card: a card filed under one section is often doing a second, unrelated job that the section label and any hand-written role map will not show, and ranking it for a cut from the label alone nearly cuts a load-bearing card. Hazel of the Rootbloom sat in the Chatterfang list under *Token Engines*, and this repo's own role map described it only as *"copies a token each end step (two if a Squirrel)."* The full oracle text is **two** abilities: *"{T}, Pay 2 life, Tap X untapped tokens you control: Add X mana in any combination of colors"* **and** the end-step copier. The first is a mana engine, and because the tokens are tapped as a **cost of another permanent's ability** rather than using their own `{T}`, summoning sickness does not restrict them (see tap-025) — it taps Squirrels made that same turn. It was briefly a third-cut candidate on the strength of the half-description.
**Changes:**
- For any card in a "cheat it into play" deck, price the **ETB alone at zero mana** before judging the rest. Also check the sweeper's number against **your own commander's toughness** — 4 damage doesn't kill a 5/5, which makes it asymmetric in your favour by default, unlike Blasphemous Act. And a symmetric effect you deploy **from hand at a time of your choosing** is far less symmetric in practice than one you're forced to cast.
- When recording grounds for a KEEP, list **every ability** the card has, not just the one that won the argument — the next challenge will come from a different angle. Cheap test: if the grounds don't mention a line of rules text, either re-read it or note why it's irrelevant.
- Before nominating any cut, list every clause of its oracle text against the deck's roles and write the one that fires most often. A card that appears in two roles is never the bottom of either. Low inclusion is a prompt to re-read, not a reason.
- Before nominating any card for a cut, run `bun run card "<name>"` and read every line — never rank from `deck:show`'s type line, the section it is filed in, or a previously written role note. This is §1.1 and §1.1b applied specifically to cuts, which is where the cost of being wrong is highest because the card leaves the deck.
**See also:** eval-006, eval-007, eval-010, eval-033, eval-057
**Source:** iron-man (2026-08-07, "Judged a card by its splashiest ability and missed that it was a free board wipe"); iron-man (2026-08-19, the user's "I think we should count this as a candidate for replacement.", merged from "A successful defense recorded incomplete grounds — and the omission nearly cost the card later"); scarlet-witch (2026-09-06, Gauntlet of Power vs Passionate Archaeologist / Mana Flare, pilot's question, merged from "Nominated a cut on field signal and missed that the card's text held a second role"); upgrade-test (2026-09-28, wave 7, searching for a third cut to fit Greenhouse Propagator, merged from "Re-read the FULL oracle text before ranking a card for a cut — a role label hides half the card")

### An off-type card pays twice when the deck's reducers, triggers and cheat engine key on a card type {#eval-017}

**Kind:** pattern · **Recorded:** 2026-08-09
**Cards:** Guttersnipe; Fiery Inscription; Longshot, Rebel Bowman; Artist's Talent; Ruby Medallion; Fiery Confluence; Chandra's Ignition; Knuckles the Echidna; Jhoira, Weatherlight Captain; Etherium Sculptor; Enthusiastic Mechanaut; Foundry Inspector; Shuri, Wakandan Inventor; Cloud Key; Stingcaster Mage; Flashback; The Vision and Scarlet Witch
**Claim:** When the same effect exists on a creature and a noncreature, or a card sits outside the type the deck's reducers, cast-triggers and free-deployment engine read, the off-type version is dearer than its printed cost suggests. Compare candidates on effective cost and on which payoffs they fire, not on printed MV.
**Evidence:**
- 2026-08-09 (scarlet-witch): The creature version is the more expensive one in any deck running "noncreature spells cost {1} less" reducers — even at identical printed cost. Guttersnipe ({2}{R}, 2/2, "whenever you cast an instant or sorcery spell, deals 2 damage to each opponent") and Fiery Inscription ({2}{R}, enchantment, same trigger, same 2 damage) are the same card at the same printed cost. In scarlet-witch, Longshot ("noncreature spells you cast cost {1} less") and Artist's Talent L2 (same wording) apply to Inscription and not to Guttersnipe; only Ruby Medallion ("red spells") hits both. With all three out, Inscription floors at **{R}** and Guttersnipe at **{1}{R}** — the creature version costs double. The same asymmetry compounds with §1.3: the creature version also dies to the deck's own Fiery Confluence and Chandra's Ignition, which the enchantment survives. Two independent penalties for the identical printed effect.
- 2026-08-20 (iron-man V2): In a deck whose cost reducers and whose free-deployment engine both read the same card type, every off-type card pays twice — no discount AND no free deployment — so its effective cost gap versus an on-type card is larger than the printed costs suggest. Pilot report: Knuckles ({2}{R}{R}) and Jhoira ({2}{U}{R}) produced "cast this and do nothing" turns while artifact creatures of the same nominal cost were reduced by up to {3} of stack (Sculptor/Mechanaut/Inspector/Shuri/Cloud Key) and deployable free by the commander's trigger. The deck's reducers read "artifact spells" (CR-verified oracle) and the commander's trigger reads "an artifact card from your hand" — both exclude the same cards.
- 2026-09-28 (vision-scarlet-witch / scarlet-witch, FRA review): The creature version of a spell effect fires only "whenever you cast a spell" triggers, never "noncreature" or "instant or sorcery" ones — a second penalty on top of the cost one. Stingcaster Mage (creature, ETB grants flashback) vs Flashback (instant): TVS's pingers read "noncreature" or "instant or sorcery", so the Mage fires only the commander's own trigger. It also can't be cast on an opponent's turn.
**Changes:**
- Add "does the body's card type match the reducer's wording?" to the §1.2 cost-out step. Check the body's card type against the reducer's wording before calling two versions equivalent.
- For any typal-engine deck (artifact, enchantress, Eldrazi-colorless, etc.), compute a card's cost as printed cost MINUS applicable reducers MINUS deployability, and compare candidates on that number, not on printed MV. An off-type 4-drop can be dearer than an on-type 7-drop. Price that gap before adding off-type cards, and hold them to a higher bar (or require ≤2 MV / instant speed).
- Check the trigger wording across the deck's payoffs, not just its reducers (2026-09-28: the reducer rule extended from reducers to triggers).
**See also:** eval-022, cost-018
**Source:** scarlet-witch (2026-08-09, "why don't we have Guttersnipe?", "A creature copy of a noncreature effect costs MORE in a deck with noncreature reducers"); iron-man (2026-08-20, the pilot's double-pip tempo report after V2's first game night, merged from "When reducers and the cheat engine both key on one card type, off-type cards pay a DOUBLE tax"); vision-scarlet-witch / scarlet-witch (2026-09-28, FRA review — the pilot asked about Stingcaster Mage, merged from "A creature that copies a spell effect loses to the spell in cast-trigger decks")

### "Exiles it instead" removal switches off a death-trigger deck's own engine {#eval-018}

**Kind:** pattern · **Recorded:** 2026-08-09
**Cards:** Head of the Hunt; Blood Artist; Cordial Vampire; Sangromancer; Blade of the Bloodchief; The Meathook Massacre
**Claim:** A permanent that replaces opponents' creature deaths with exile is anti-synergy in any deck whose payoffs read "whenever a creature dies" — however good its stats, it deletes the deck's own drain triggers for as long as it survives.
**Evidence:** Head of the Hunt (HOB) — *"If a creature an opponent controls would die, exile it instead."* Under it, Blood Artist, Cordial Vampire, Sangromancer, Blade of the Bloodchief and The Meathook Massacre never see an opponent's creature die.
**Changes:** Extends SKILL §1.3 from "check the card against your own board" to "check it against your own **triggers**": grep candidates for die-replacement clauses before seating them in an aristocrats shell.
**Source:** edgar-markov (2026-08-09), HOB set review.

### WHEN a pump triggers decides whether it can discount anything {#eval-019}

**Kind:** pattern · **Recorded:** 2026-08-09
**Cards:** Cait Sith, Fortune Teller; Tavern Brawler; The Scarlet Witch; Neheb, the Eternal
**Rules:** 500.1
**Claim:** For a commander whose cost reduction scales with its power, two pump effects with identical text are not equivalent if they trigger in different steps. A pump that lands at **beginning of combat** cannot discount a **precombat main phase** spell; one that lands at **upkeep** covers both main phases — compare the trigger step, not just the effect.
**Evidence:** Cait Sith, Fortune Teller ("At the beginning of combat on your turn, scry 1, then exile the top card… target creature you control gets +X/+0 until end of turn, where X is that card's mana value") and Tavern Brawler ("Commander creatures you own have 'At the beginning of your upkeep, exile the top card of your library. This creature gets +X/+0 until end of turn, where X is that card's mana value'") are the same effect. The Scarlet Witch applies her discount as a spell is cast, so Cait Sith's pump is unavailable for every precombat cast that turn.
**Changes:** When ranking pumps for a power-scales-discount commander, add the trigger step as its own column in the role table. A combat-timed pump still covers the postcombat main phase per the Neheb sequencing rule (CR 500.1), so it is half a card, not a dead one.
**See also:** eval-036
**Source:** scarlet-witch (2026-08-09) — diffing two rival Moxfield lists.

### A cut-on-principle group's grounds may not cover every card it names {#eval-020}

**Kind:** pattern · **Recorded:** 2026-08-09
**Cards:** Unleash Fury
**Claim:** Before rejecting a card because it belongs to a group cut "on principle", read the grounds the group actually recorded and check they describe *that* card. Group labels over-reach.
**Evidence:** scarlet-witch cut a "one-shot combat pump" group whose stated grounds were *"these cost a card to add +2 or +3 power for one turn, which is roughly one extra discount — a bad trade."* Unleash Fury ({1}{R}, "Double the power of target creature until end of turn") sits in that archetype but adds nothing like +2/+3 — on a commander at 10 power it adds 10, which is ten mana off every discounted spell for the rest of the turn. The recorded grounds simply do not describe it.
**Changes:** Treat a principle group as an index, not a verdict — §1.1b applied to groups rather than single cards. Re-derive any member whose numbers differ from the ones the grounds cite.
**See also:** eval-004, eval-034, eval-036
**Source:** scarlet-witch (2026-08-09) — diffing two rival Moxfield lists.

### A per-colour rider counts coloured PERMANENTS — and score each ability of a card separately {#eval-021}

**Kind:** pattern · **Recorded:** 2026-08-10
**Cards:** Conqueror's Flail; Blackblade Reforged; Big Score; Tony Stark
**Claim:** When a card has two unrelated abilities, score them independently — one can be blank while the other carries the card. A rider scaling with *"each color among permanents you control"* is capped by the colours actually on the board (colourless is not a colour, so it is worth exactly 1 in a mono-color deck), though a DFC commander's **back face** can set a hard floor.
**Evidence:**
- 2026-08-10 (scarlet-witch): Conqueror's Flail ({2} Equipment) reads *"Equipped creature gets +1/+1 for each color among permanents you control"* and *"As long as this Equipment is attached to a creature, your opponents can't cast spells during your turn."* In mono-red scarlet-witch the first clause is a flat +1/+1 — against Blackblade Reforged's +1/+1 per land, roughly +8 — because **colorless is not a color**, so Treasures and colorless tokens add nothing. The card is still a strong include, entirely on the second clause.
- 2026-08-19 (iron-man): An artifact deck's board is far less colourful than its identity implies. iron-man is Izzet, so the naive read of Conqueror's Flail is +2/+2. Counting the actual list: **54 of its 72 permanents are colourless**, only ~17 are coloured, and every one is U or R — most of the board is artifacts and lands, which have no colour. The floor is nonetheless a firm +2/+2, because the back face **The Invincible Iron Man is `{4}{U}{R}`, colors [R, U]** (Scryfall `card_faces`) — the voltron target carries both colours by itself on an empty board. This refines the 2026-08-10 mono-color case, which established colourless-is-not-a-colour; this is the two-colour case, where the answer is **not** automatically 2.
**Changes:**
- Never rate a two-ability card on its headline clause. Score each ability against the deck, then decide — and treat "for each color" as 1 in mono-color before comparing anything.
- For any per-colour rider, run the count — filter the list to permanents and tally distinct colours — instead of reading colour identity off the deck header. Then check whether the commander (**including its back face**) supplies those colours unaided; that, not the deck's identity, is the rider's floor.
**See also:** eval-010, eval-013
**Source:** scarlet-witch (2026-08-10, evaluating Conqueror's Flail, "A rider that counts COLORS is near-dead in a mono-color deck — read each ability separately"); iron-man (2026-08-19, Conqueror's Flail over Big Score, merged from "Count the coloured PERMANENTS, not the deck's colour identity, for a per-colour rider")

### A "don't cast your artifacts" deck still has to cast its commander {#eval-022}

**Kind:** pattern · **Recorded:** 2026-08-18
**Cards:** Semblance Anvil; Cloud Key; Training Grounds; Foundry Inspector; Etherium Sculptor; Shuri, Wakandan Inventor; Tony Stark
**Claim:** When a deck's design decision is *cheat permanents into play instead of casting them*, that decision justifies skipping cost reduction for the 99 — but it never covers the commander, which must be hard-cast from the command zone at an escalating price. Exempt the commander from the "we don't need reducers" conclusion and re-ask the question for it alone.
**Evidence:** iron-man's role table rejected a cost-reduction package on the grounds that *"its nine-drops arrive free"* (field-analysis.md) — true of every artifact in the 99, and false of the one artifact spell the whole engine depends on. The deck's commander is a {4}{U}{R} artifact creature spell recast at 6 / 8 / 10, and the pilot reported never reliably reaching it.
**Changes:** Split "cost reduction" into *reduction for the 99* and *reduction for the commander* before counting the role against a field average. Then prefer reducers that don't undo the deck's other deviations — for a deliberately creature-light deck whose own sweepers are near one-sided, that means **noncreature** reducers (Semblance Anvil, the Medallions, Cloud Key) and **commander-only** ones (Training Grounds on an activated transform), never the cheap-creature reducers the field runs (Foundry Inspector, Etherium Sculptor, Shuri).
**See also:** eval-017, eval-023, cost-018, cost-005
**Source:** iron-man (2026-08-18) — the pilot's "I can never get Iron Man out" report against a role table that had already, correctly, rejected creature-based cost reduction.

### A repeated in-game failure outranks every list-derived verdict it touches {#eval-023}

**Kind:** pattern · **Recorded:** 2026-08-20
**Claim:** When the pilot reports the same concrete failure mechanism across a whole session of real games, treat it as the strongest field signal available and re-derive every structural verdict it touches — do not defend the structure from the notes that designed it.
**Evidence:** iron-man went 0-for on 2026-08-19 with one mechanism ("6+ turns doing nothing" while the commander cost 6/8/10) — the day after a full analysis pass had the same 100 scored as coherent. Three structural verdicts expired at once: "creature-light is load-bearing" (the protected sweeper upside never materialized in any game), "extra combats dominate" (only true of a deck that functions), and "this deck skips cost reduction" (already flagged 2026-08-18). A list-derived verdict had never been play-tested; one game night falsified three.
**Changes:** After any reported game session, list which structural verdicts the results touch and re-derive each one before proposing card-level swaps. Card evaluations answer "which card"; only play reports answer "is the structure right".
**See also:** eval-004, eval-022
**Source:** iron-man (2026-08-20) — the V2 recomposition (`decks/iron-man/DECK-V2.md`).

### Recommended a hand-size-taxed tutor to a deck that empties its hand {#eval-024}

**Kind:** correction · **Recorded:** 2026-08-20
**Cards:** Fervent Mastery; Wheel of Fortune; The Scarlet Witch; Past in Flames; Will of the Jeskai; Thor, God of Thunder; Hex Magic
**Claim:** A tax that scales with hand size is the wrong shape for a hand-dumping deck regardless of how good the recovery is, so state the deck's typical hand size at the moment of casting before rating the card.
**Evidence:** Proposed Fervent Mastery ("search for three, discard three at random") for Scarlet Witch on the grounds that Wanda discounts it to {R}{R} and the deck's recursion (Past in Flames, Will of the Jeskai, Thor's ETB) recovers the discards. The user pointed out the floor: the deck's gameplan is to dump its hand every turn, so the typical hand when you draw Mastery is 0–2 cards — at H=0 you fetch three and discard exactly those three. Wheel of Fortune, the proposed cut, has no such floor: play out the hand, then refill seven. *Root cause:* scored the *mitigation* (recursion gets the discards back) above the *floor* (expected kept = 3H/(H+3), which is 0 at H=0), and never asked what the deck's hand size usually is when the card is cast.
**Changes:** For any card whose cost or tax is a function of hand size (random discard, "discard N", Hex Magic-style doubling), state the deck's typical hand size at the moment it would be cast before rating it. Gameplan docs usually say it outright ("you run out of cards before mana").
**See also:** build-014
**Source:** scarlet-witch (2026-08-20) — the tutor pass; user's call.

### Delayed or early mana is at par when the deck banks mana for a later spend turn {#eval-025}

**Kind:** correction · **Recorded:** 2026-08-20
**Cards:** Hit the Mother Lode; Pyretic Ritual; Desperate Ritual; Pyromancer's Goggles; Repeated Reverberation; Electro, Assaulting Battery; Ashling, Flame Dancer; Omnath, Locus of Mana; Kruphix, God of Horizons; Horizon Stone; Upwelling; Neheb, the Eternal
**Claim:** "Enters tapped", "next upkeep" and "a ritual is dead until the kill turn" are penalties only when mana evaporates or is needed now; in a deck that banks mana or spends on a later turn anyway, delayed mana is at par with immediate mana and a ritual is early-game ramp.
**Evidence:**
- 2026-08-20 (scarlet-witch) — Scored tapped Treasures as "next turn only" in a deck whose plan IS next turn: nominated Hit the Mother Lode as a cut partly because its Treasures enter tapped ("next turn's mana in a this-turn deck"). The user defended it: it reliably makes ~5 Treasures. Re-derived: the discover card's expected MV is ~4–5 in this list, so 10 − MV ≈ 5–6 Treasures, and tapped Treasures are permanents — they untap on the next turn and sit there until spent. For a deck whose whole plan is "survive to one turn, then spend everything," 3 mana on turn 5 for a free spell plus 5–6 mana banked for turn 6 is the shape the deck wants, not a downside. *Root cause:* applied "tapped = slower" as a generic penalty without asking *when* this deck wants to spend mana. The same fact is a cost in a tempo deck and a feature in a one-big-turn deck.
- 2026-08-21 (scarlet-witch) — Scored rituals as "dead until the kill turn" in a deck that banks red mana: nominated Pyretic Ritual and Desperate Ritual as cuts for Scarlet Witch on the grounds that a ritual does nothing for seven turns and only matters on the explosive turn (the 2026-06 "one-shot rituals belong to explosive-turn decks only" pattern). The pilot reported the opposite from play: they cast both rituals early, copy them (Pyromancer's Goggles, Repeated Reverberation), and bank the output under Electro — "regularly +10 mana just sitting there." *Root cause:* applied the generic ritual heuristic without checking the deck's banking clause. Electro and Ashling read *"You don't lose unspent red mana as steps and phases end"* — that covers every red mana in the pool regardless of source, so under either of them a ritual is a deposit that persists across turns (LEDGER 2026-08-04, mana empties only at end of step/phase). With copy effects, one ritual is 6–9 banked mana. The "dead card" framing assumed the mana evaporates.
**Changes:**
- Before penalising "enters tapped" / "at the beginning of your next upkeep" mana, check the deck's spend turn. If mana is being banked for a later turn anyway (Electro/Ashling-style red banking, Treasure piles, Neheb), delayed mana is at par with immediate mana.
- Before calling any one-shot mana card dead outside the kill turn, check the deck for a banking clause (Electro, Ashling, Omnath-pattern, Kruphix, Horizon Stone, Upwelling) and for copy effects that hit it. If either is present, the ritual is early-game ramp with a delayed spend and should be ranked as such. The explosive-turn-only heuristic holds only when the mana can't be kept.
**See also:** eval-037, build-001
**Source:** scarlet-witch (2026-08-20, the tutor pass — user's call, "Scored tapped Treasures as \"next turn only\" in a deck whose plan IS next turn"); scarlet-witch (2026-08-21, pilot's report during the damage pass — user's call, merged from "Scored rituals as \"dead until the kill turn\" in a deck that banks red mana")

### Map protection to a threat matrix before adding or cutting any piece {#eval-026}

**Kind:** pattern · **Recorded:** 2026-08-21
**Cards:** Champion's Helm; Sword of Wealth and Power; Mithril Coat; Blasphemous Act; Chandra's Ignition; Farewell; Toxic Deluge; Cyclonic Rift; Kaya's Ghostform; Soul Shatter
**Rules:** 702.11, 702.12, 702.16
**Claim:** Hexproof, protection-from-instants/sorceries, and indestructible each cover a DIFFERENT set of threats; the only way to judge a new protection piece is to place it in the matrix and see whether it fills an empty cell, and the only way to cut one is to check which row it covers. The row "non-targeting, non-damage, non-destroy" (Farewell, Toxic Deluge, edicts, overloaded Cyclonic Rift) is filled by NO on-body piece — only counterspells or a cheap recast answer it — and in lord-of-pain Kaya's Ghostform was the one card covering it, by returning the creature (the cheap-recast route).
**Evidence:**
- 2026-08-21 (iron-man): CR 702.11 (hexproof: can't be the TARGET of opponents' spells/abilities — blank vs anything that doesn't target) · CR 702.16 (protection: Damage, Enchant/Equip, Block, Target from sources with the quality — an ability's source is a permanent, so "protection from instants and sorceries" does not stop planeswalker/creature abilities, but DOES prevent damage from Blasphemous Act) · CR 702.12 (indestructible: destroy and lethal damage only — exile, −X/−X, bounce and sacrifice ignore it). Matrix for iron-man V2: Champion's Helm = targeted spells + targeted abilities; Sword of Wealth and Power = targeted spells + damage wipes; Mithril Coat / Hammer / Forge = destroy wipes + damage; bottom row = counters only.
- 2026-08-24 (lord-of-pain) — Cut the only cover for the non-targeting row and called it "weakest": Kaya's Ghostform was cut from lord-of-pain as "one-shot insurance" without mapping the protection suite to the threat matrix first. Hexproof, indestructible and redirects all miss edicts, −X/−X wipes and exile wipes; Ghostform ("dies or is put into exile → return it to the battlefield") was the only card covering that row, and it also saves the full recast (5 mana with tax) not just the tax. The matrix lesson was already in this ledger (iron-man, 2026-08-21) and went unapplied. Oracle text of Kaya's Ghostform vs Soul Shatter / Toxic Deluge / exile sweeps.
**Changes:**
- When comparing protection Equipment, write the five-row matrix (targeted spell / targeted ability / damage wipe / destroy wipe / exile-shrink-edict-bounce) and score the candidate by new cells filled, not by how strong it sounds. Also check the candidate against the deck's OWN targeted spells — pro-sorceries blanks your own Chandra's Ignition.
- Before cutting ANY protection piece, write the threat-matrix row it covers and check whether another card covers the same row. "Cheapest/most passive" is not the same as "most redundant". Also: when re-costing a commander death, count base + tax, not tax alone.
**History:** On 2026-08-24 lord-of-pain cut Kaya's Ghostform as "one-shot insurance" without mapping the suite first, and the pilot's pushback was right. The matrix lesson was already here (iron-man, 2026-08-21) and went unapplied.
**See also:** eval-054, build-013
**Source:** iron-man (2026-08-21, the user's "hexproof means they lose to non-targeting wipes, both of them lose to that no?" — correcting a sloppy line in the Swords pass, "Map voltron protection to a threat matrix — no Equipment fills the non-targeting row"); lord-of-pain (2026-08-24, the user's pushback — they were right, merged from "Cut the only cover for the non-targeting row and called it \"weakest\" — user caught it")

### Scored a symmetric wheel only as a refill and missed its disruption axis {#eval-027}

**Kind:** correction · **Recorded:** 2026-08-21
**Cards:** Reforge the Soul; Path of the Pyromancer
**Claim:** A symmetric wheel has two axes, refill for you and disruption for the table; a self-only wheel wins the first and scores zero on the second, so it is not "strictly better" even when cheaper.
**Evidence:** Proposed Path of the Pyromancer (self-only: discard your hand, add {R} per card, draw that many plus one) over Reforge the Soul (each player discards and draws seven) on the grounds that Path refills only you and pays mana, while Reforge "hands three opponents seven fresh cards." The pilot kept Reforge: *"it's a good bit of hand denial."* *Root cause:* weighed the two wheels on one axis — how many cards *I* get and at what price — and treated the opponents' half purely as a cost. Oracle: *"Each player discards their hand, then draws seven cards."* The discard half is disruption: cast the turn before a kill turn, it strips every held counterspell and every assembled combo hand at sorcery speed, and seven random replacements rarely contain the same answer. For a deck whose big turn dies to one counterspell (mono-red, no counters of its own), that is protection-by-discard — the reason Wheel effects are storm staples, not just refills.
**Changes:** Rate every symmetric wheel on two axes: refill (cards and mana for me) **and** disruption (what the table loses). A self-only wheel wins the first and scores zero on the second; it is not "strictly better" even when cheaper. State which axis the deck needs before comparing.
**See also:** eval-005
**Source:** scarlet-witch (2026-08-21) — pilot's call during the 2026-08-21 pass.

### In a symmetric-punisher deck, only opponent-restricted amplifiers are safe {#eval-028}

**Kind:** pattern · **Recorded:** 2026-08-23
**Cards:** Fiery Emancipation; City on Fire; Angrath's Marauders; Dictate of the Twin Gods; Furnace of Rath; Spiteful Visions; Manabarbs; Descent into Avernus; Seizan, Perverter of Truth; Citadel of Pain; Solphim, Mayhem Dominus; Torbran, Thane of Red Fell; Spiked Corridor // Torture Pit; Twinflame Tyrant; Fiendish Duo; Bloodletter of Aclazotz; Wound Reflection; The Lord of Pain
**Claim:** A damage multiplier worded "if a source **you control** would deal damage to a permanent or player" (Fiery Emancipation, City on Fire, Angrath's Marauders) or "if a source would deal damage" (Dictate of the Twin Gods, Furnace of Rath) also multiplies the damage your own symmetric permanents deal **to you**, which turns the best multiplier on the page into a self-kill in a group-slug/group-hug deck built on symmetric gift engines. The safe wording is "to an **opponent**".
**Evidence:** Your own symmetric sources: Spiteful Visions on your draws, Manabarbs on your taps, Descent into Avernus, Seizan, Citadel of Pain. Safe opponent-only amplifiers: Solphim, Mayhem Dominus (×2 noncombat), Torbran (+2 red), Torture Pit (+2 noncombat), Twinflame Tyrant (×2), Fiendish Duo, Bloodletter (life loss, my turn), Wound Reflection. Oracle text of each; Fiery Emancipation (34% inclusion on The Lord of Pain's EDHREC page) rejected on it. Arithmetic: under Emancipation, Spiteful Visions on my ~5 draws a turn is 15 to me a turn; under Solphim it is 5.
**Changes:** SKILL §1.3 sharpened for slug decks: before seating any "source you control" or "a source would deal" amplifier, grep your own list for symmetric damage permanents. Two opponent-only amplifiers that commute (× and ×) plus additives (+2, +2) is the correct stack; the damaged player orders them, so (1×2)+2+2 = 6 per ping, never (1+4)×2.
**See also:** eval-002, eval-029, repl-001
**Source:** lord-of-pain (2026-08-23), amplifier table in research/decisions.md.

### A symmetric copy of a one-sided static the commander already provides is a strict downgrade {#eval-029}

**Kind:** pattern · **Recorded:** 2026-08-23
**Cards:** The Lord of Pain; Sulfuric Vortex; Havoc Festival; Rampaging Ferocidon; Exquisite Blood; Bloodthirsty Conqueror; Sheoldred, the Apocalypse
**Claim:** When the commander (or a core engine) already supplies the opponent-only version of an effect, the symmetric printing of the same effect adds nothing against opponents and switches the effect on against you.
**Evidence:** The Lord of Pain says "your opponents can't gain life"; Sulfuric Vortex, Havoc Festival and Rampaging Ferocidon say "players can't gain life" — each would shut off the deck's own lifeline (Exquisite Blood, Bloodthirsty Conqueror, Sheoldred's +2 per draw). Oracle text; all three rejected from the user's pool on these grounds.
**Changes:** Read the commander's statics first, then filter the candidate pool for symmetric re-prints of them — they look like redundancy and are anti-synergy.
**See also:** eval-028, eval-051
**Source:** lord-of-pain (2026-08-23).

### "Conditional" and "opponent-dependent" are cut reasons only if this deck and pod fail the condition {#eval-030}

**Kind:** correction · **Recorded:** 2026-08-25
**Cards:** Sangromancer; Anowon, the Ruin Sage; Olivia's Wrath; The Meathook Massacre; Grave Pact; Dictate of Erebos; Vito, Thorn of the Dusk Rose; Marauding Blight-Priest; Blood Seeker; Rampaging Ferocidon; Authority of the Consuls; Suppression Field; Blood Artist; Infantry Shield; Circle of Dreams Druid
**Rules:** 700.4, 701.21a
**Claim:** A payoff filed as "conditional" or "depends what opponents do" is only weak if the condition rarely happens here; count the deck's own ways to force it and the decks the pilot actually sits across from, and state the condition as a frequency in this deck before cutting on it.
**Evidence:**
- 2026-08-25 (edgar-markov, versions A/B build): Payoffs keyed to opponents' permanents leaving play are only passive if the deck has no way to force it. Sangromancer ("whenever a creature an opponent controls dies, you may gain 3 life") was twice put on the cut list as opponent-dependent — in a list running Anowon, the Ruin Sage (an edict every upkeep), Olivia's Wrath and The Meathook Massacre, and in a build adding Grave Pact and Dictate of Erebos. Opponents sacrificing to those effects **is** a creature dying (CR 700.4 + 701.21a), so the deck manufactures the trigger every turn. Each gain of 3 is then its own life-gain event feeding Vito and Marauding Blight-Priest.
- 2026-09-03 (edgar-markov, Infantry Shield / draw pass): A card whose trigger is keyed to what *opponents* do (Blood Seeker, Rampaging Ferocidon, Authority of the Consuls, Suppression Field) has no field-average value; it has a pod value. Blood Seeker — *"Whenever a creature an opponent controls enters, you may have that player lose 1 life"* — was nominated twice as the cut in Edgar's sacrifice build: not on the EDHREC Edgar page at all, 17% in the aggro theme, "opponent-dependent, 1 life at a time." The pilot: *"blood seeker is a hard counter to token decks."* Against a token deck it is a Blood Artist pointed at one player, on a {1}{B} Vampire body that also makes an eminence token. The field number measured the average pod, which does not exist.
- 2026-09-25/26 (chatterfang / upgrade-test, wave 4 then wave 5): I cut Circle of Dreams Druid from a token deck on the grounds that it is "conditional mana - it needs a wide board first." That is the wrong test. The right test is **how often this deck meets the condition**, and a token deck's single most reliable act is having a board. The pilot overruled it: *"bodies don't really matter if it takes us an extra 2-3 turns to have enough mana to play the cards we have."* Corroborating measurement: wave 4 removed it (with three other cards) to fix the curve, avg MV fell 3.00 to 2.89 and MV<=2 rose 24 to 26 - and the CommanderBracket win turn **did not move, 7.5 before and after**. The curve theory that justified the cut predicted an improvement that did not occur.
**Changes:**
- Count your own edicts before filing a payoff as "depends what they do." Before rejecting a "when an opponent's creature dies / an opponent sacrifices" payoff, count the edicts, sweepers and forced-sacrifice effects in the same list. EDHREC inclusion near 0% is not evidence here — the crowd's average build has no edict package.
- Score an opponent-keyed card against the decks the pilot actually sits across from, and ask before nominating it as the weakest body. Before nominating any opponent-keyed card as a cut, name what it punishes and ask whether the pod plays it. Low field inclusion on a hate piece is evidence about the field's pods, not this one. Same family as "Argued against a card on a line the pilot doesn't play" (2026-09-02, eval-034).
- Before calling a card conditional, state the condition as a frequency in *this* deck ("needs 4+ creatures" in a deck that has 4+ creatures from turn 3 is not a condition). And when a revert is justified by a metric, **re-measure after the revert** - if the metric does not move, the theory was wrong and the revert should itself be reverted.
**See also:** eval-003, eval-034, eval-047, eval-056
**Source:** edgar-markov (2026-08-25, versions A/B build, "An \"opponent's creature dies\" trigger is not opponent-dependent in an edict deck"); edgar-markov (2026-09-03, Infantry Shield / draw pass — the pilot overrode the cut and was right, merged from "Ranked a hate piece on average text and missed that the pilot's pod is its target"); chatterfang / upgrade-test (2026-09-25/26, wave 4 then wave 5 — the pilot overruled the cut, merged from "\"Conditional\" is only a real cut reason if the deck fails to meet the condition")

### An alt-win permanent is a telegraph — score it by its floor, never its ceiling {#eval-031}

**Kind:** pattern · **Recorded:** 2026-09-02
**Cards:** Revel in Riches; Smothering Tithe; Junk Winder; Clever Concealment; Flawless Maneuver; Approach of the Second Sun; Mechanized Production; Felidar Sovereign; Test of Endurance
**Claim:** A permanent whose text contains "you win the game" announces itself and draws the table's next answer. It earns a slot only if the half that *isn't* the win is already worth playing.
**Evidence:** Revel in Riches (`{4}{B}`) reaches its alt-win at ten Treasures — a multi-turn, fully visible countdown. Its floor is what justifies it in a deck with eleven effects that kill opponents' creatures: the Treasure half is immediate ramp, Smothering Tithe's Treasures count toward the same ten, and each Treasure entering triggers Junk Winder. Note which protection actually applies: Clever Concealment (*"any number of target nonland permanents you control phase out"*) and counterspells do; **Flawless Maneuver does not**, because indestructible is creatures-only.
**Changes:** Split every alt-win card into "the win" and "the rest", and buy it on the rest. A deck relying on a telegraphed permanent still needs a **hidden** finisher — one that lives in hand and cannot be pre-emptively removed. Generalises to Approach of the Second Sun, Mechanized Production, Felidar Sovereign, Test of Endurance.
**Source:** inquisitor-greyfax (2026-09-02) — the user's "it's most likely gonna get countered or removed immediately", which was correct.

### Check a trigger doubler against the commander's engine — triggered, and of a type you can name — per commander {#eval-032}

**Kind:** pattern · **Recorded:** 2026-09-02
**Cards:** Roaming Throne; Inquisitor Greyfax; Icy Manipulator; Hylda's Crown of Winter; Hylda of the Icy Crown; Quake, Agent of S.H.I.E.L.D.; Ultron, Artificial Malevolence; The Vision and Scarlet Witch; Mirrorworks; Panharmonicon; Echoes of Eternity
**Rules:** 603.2d
**Claim:** Ability-doublers are worded for one kind of ability: Roaming Throne doubles only *triggered* abilities of other *creatures* of the chosen type, so it is close to blank in a deck whose engine is activated abilities and doubles the commander outright where its engine is a triggered ability and its type can be named. Run that check for each commander on its own grounds; never carry an earlier rejection across decks.
**Evidence:**
- 2026-09-02 (inquisitor-greyfax): Roaming Throne ({4}, $51.12) — *"If a **triggered** ability of another creature you control of the chosen type triggers, it triggers an additional time."* The deck it was proposed for runs its engine on **activated** abilities: Inquisitor Greyfax's `{1},{T}`, Icy Manipulator, Hylda's Crown of Winter, and every assassin's `{T}`. Naming Human (14 in the deck) would really only double Hylda. Greyfax herself is a Human whose ability is activated, so she is untouched, and Quake's printed type is "**Inhuman** Spy Hero" — not a Human at all.
- 2026-09-04 (ultron + vision-scarlet-witch) — Carried a typed trigger-doubler's rejection across decks: Roaming Throne was left out of both new decks. Ultron, Artificial Malevolence is a Robot whose engine is one triggered ability per artifact entering; The Vision and Scarlet Witch is a Hero whose engine is one triggered ability per spell cast. Naming Robot / Hero doubles the commander outright — a second {2} token per artifact, {R}{R} and two counters per spell — and it was 37% of the Ultron field. The pilot asked *"no roaming throne for either deck?"* *Root cause:* the card's last two evaluations in this repo were rejections — inquisitor-greyfax (the engine was activated abilities, above) and iron-man's own Throne reasoning (a combat trigger, doubled per type). I carried the *feeling* of those verdicts instead of their grounds, which name the engine type and do not describe either new commander. §1.1b applied to a card across decks, not just across time.
**Changes:**
- For any doubler, first classify the deck's engine as activated vs triggered, then check the doubler's wording against it. Also verify creature types from the printed type line rather than the character's name — "Inhuman", "Nonhuman" and similar are real types that fail a tribal naming.
- For every commander whose engine is a triggered ability, run the doubler check as a mechanical step: (1) is the trigger **triggered** (not activated, not a once-per-turn clause)? (2) what creature type does the commander carry, and which other creatures in the 99 share it? (3) which doublers are already in and do they add (603.2d)? Roaming Throne belongs wherever (1) and (2) both pass.
- Companion fact from the 2026-09-04 pass: Throne reads **creatures** only — it does not double Mirrorworks (a noncreature artifact) where Panharmonicon and Echoes of Eternity do.
**See also:** eval-004, eval-055, trig-006, trig-007
**Source:** inquisitor-greyfax (2026-09-02, "do we need Roaming Throne in this deck?", "Read whether a doubler says ACTIVATED or TRIGGERED before pricing it"); ultron + vision-scarlet-witch (2026-09-04, the pilot's question — both decks took the Throne, merged from "Carried a typed trigger-doubler's rejection across decks — Roaming Throne was skipped for two cast/enter-trigger commanders")

### Score a sweeper's self-hit at the board state it is actually CAST at {#eval-033}

**Kind:** correction · **Recorded:** 2026-09-02
**Cards:** Blasphemous Act; Tony Stark
**Claim:** A catch-up sweeper is cast before you deploy, at a board state where you are behind and empty, so its self-hit has to be scored against that board and not against the deck's goal board.
**Evidence:** I argued to cut Blasphemous Act (*"deals 13 damage to each creature"*) from iron-man V3 because it kills the 5/5 commander and the 11 artifact creatures V3 added on purpose, citing the deck's own brief that it cannot win without the commander on board. The pilot corrected me: *"you don't really blasphemous act if iron man is out, you do it a turn before to slow down the board state if someone is getting too far ahead… green players ramping out like 10/10 dinos."* A catch-up sweeper is cast **before** you deploy, at a board state where you are behind and empty. The self-hit I priced never occurs. *Cause:* I ran SKILL §1.3 ("check the card against your own board") against the deck's *goal* board rather than the board it is actually cast into. §1.3 is a real rule; I evaluated it at the wrong point in the game.
**Changes:** For any sweeper, reset, or symmetric effect, first write down **the turn and board state at which it is cast** — behind and empty, or ahead and developed — and score the self-hit only against that board. A card whose whole job is catching up is played from an empty board by definition. (The cut still went through, but on different grounds: the surviving sweeper had become a win condition, so the second one was buying a covered effect.)
**See also:** eval-016, eval-043
**Source:** iron-man (2026-09-02) — Blasphemous Act, cut on the pilot's correction.

### Argued against a card on a line the pilot doesn't play — check the actual use case first {#eval-034}

**Kind:** correction · **Recorded:** 2026-09-02
**Cards:** Ultron, Artificial Malevolence; Sol Ring; Arcane Signet; Talisman of Creativity; Thran Dynamo; Gilded Lotus; Surestrike Trident
**Claim:** An objection that is true of a card's average or most valuable case can be entirely absent from the case the pilot plays, so test the recorded grounds against the named line and list copy targets by the turn they are realistically copied.
**Evidence:** I pushed to cut Ultron, Artificial Malevolence (*"Whenever another nontoken artifact you control enters, you may pay {2}… create a token that's a copy of it"*) across three sessions, partly on the ground that *"the legend rule blanks most of the copy targets."* The pilot named the line they actually play it for: *"ultron's biggest strength is getting him down turn 3 and copying our ramp artifacts."* Every mana rock in the deck — Sol Ring, Arcane Signet, Talisman of Creativity, Thran Dynamo, Gilded Lotus — is **non-legendary**. The legend rule never touched that line at all. My objection described the Equipment half of the deck and was silently applied to a use case it does not reach. *Cause:* I scored a "whenever X enters, copy it" card against the *most valuable* things it could copy (legendary Equipment) rather than against the *cheapest and earliest* things it will actually copy. Early-game copy targets are usually rocks, and rocks are almost never legendary.
**Changes:** For any copy/clone/token-of effect, list the targets by **the turn they are realistically copied on**, not by power level, and check the objection against each tier separately. More generally: when a pilot names a specific line, test the recorded grounds against *that* line before restating them — an argument that is true of a card's average case can be entirely absent from the case being played. Same family as "A cut-on-principle group's grounds may not cover every card it names" (2026-08-09, eval-020), applied to a single card's own multiple modes.
**See also:** eval-020, eval-030
**Source:** iron-man (2026-09-02) — Ultron cut for Surestrike Trident.

### A token maker's self-sacrifice clause is a payoff in a dies-matters deck and a cost anywhere else {#eval-035}

**Kind:** pattern · **Recorded:** 2026-09-03
**Cards:** Infantry Shield; Purphoros, God of the Forge; Mirkwood Bats; Blood Artist; Cruel Celebrant; Vengeful Bloodwitch; Zulaport Cutthroat; Bastion of Remembrance; Grave Pact; Dictate of Erebos; Blade of the Bloodchief; Edgar Markov
**Rules:** 603.2c, 702.181a
**Claim:** Read a "create tokens … sacrifice them at end step" card twice — once as the deck it is in. In a deck with per-creature *enters* and *dies* payoffs the sacrifice clause is free death triggers; in a deck that wanted the bodies (blockers, artifact count, anthem targets) it is the reason to pass.
**Evidence:** Infantry Shield (*"mobilize X, where X is its power"* — X tapped-and-attacking 1/1 Warriors, sacrificed at the next end step, CR 702.181a). Iron Man passed it on 2026-09-02: the tokens never block, are red Warriors rather than artifacts, and miss every artifact-count payoff. The same card against Edgar's sacrifice list: each token is one Purphoros trigger (2 to each opponent), one Mirkwood Bats trigger on creation and another on sacrifice, and one trigger each on Blood Artist, Cruel Celebrant, Vengeful Bloodwitch, Zulaport Cutthroat and Bastion of Remembrance when it dies, plus one Grave Pact / Dictate of Erebos edict per opponent per token — all per-creature wordings, all verified via CR 603.2c. At 6 power that is roughly 36 life off each opponent from one attack, from one equipped creature exposed. Blade of the Bloodchief on the same creature then converts those deaths into +1/+1 counters, so the next attack makes more tokens.
**Changes:** For any mobilize / "enters attacking, sacrifice at end" card, count the deck's per-creature enters- and dies-triggers before judging the body. The mana rule still applies (Infantry Shield is a non-Vampire spell in Edgar, so no eminence token) — it is an argument about what the tokens feed, not about rate.
**See also:** eval-048, repl-012, repl-009
**Source:** edgar-markov (2026-09-03) — Infantry Shield re-derived for a second deck the day after Iron Man passed it.

### In a power-discount deck, pump and X-spells compound — write the recurrence before filing roles {#eval-036}

**Kind:** correction · **Recorded:** 2026-09-08
**Cards:** The Scarlet Witch; Livaan, Cultist of Tiamat; Lunar Frenzy; Frantic Confrontation; Enrage; Pedal to the Metal; Bionic Blow; Erratic Cyclops; Renegade Bull; Storm King's Thunder; Jaya's Immolating Inferno; Bonesplitter; Unleash Fury; Bulk Up
**Claim:** For a commander whose discount equals its power, X sets MV, MV sets power and power sets the next X, so pump is multiplicative rather than "+N discount": an instant that costs {X}{R} and gives +X/+0 is a one-pip power doubler (a tripler under a cast-MV pump) and the redundancy for a single engine creature. Filing pump, copiers, payoffs and mana one card at a time missed a five-pip turn-5 kill the list could already cast.
**Evidence:**
- 2026-09-08 (scarlet-witch, turn-5 chain investigation): Lunar Frenzy / Frantic Confrontation ({X}{R}, *"+X/+0 and gains first strike and trample"*), Enrage, Pedal to the Metal — Scryfall `id:r (t:instant or t:sorcery) (o:"gets +X/+0" or o:"gets +X/+X")` = 15 cards. Wanda at W: X = W + r for {R} → 2W + r; with Livaan's +X+1 → 3W + r + 1. Bionic Blow ({X}{R}{R}) is the same plus removal for her pumped power. The only other red "+MV on cast" cards (Erratic Cyclops, Renegade Bull) pump themselves.
- 2026-09-08 (scarlet-witch, the report of an opponent's turn-5 kill) — told the pilot to wait for turn 6 and 12 mana while the list held a five-pip turn-5 kill: `formulas.md` §7 scored Livaan as *"cast a mana value 5 spell and Wanda is +5"*; `gameplan.md` §5 said *"T6+ — look for the turn … 12+ mana available, 3+ cards in hand"*; `considered-and-cut.md` cut one-shot pump on the grounds *"+2 or +3 power for one turn, roughly one extra discount — a bad trade."* An opponent with a near-identical list ended a game on turn 5 by chaining X-spells under Livaan. The same line — turn 4 Livaan, turn 5 Storm King's Thunder X=2 then Jaya's X=7 for five Mountains — has been castable from our list since 2026-07-01 and is lethal from a single Bonesplitter's worth of seed. Nobody had written it down. *Root cause:* cards were filed by template (pump / copier / payoff / mana) and scored one at a time; the compounding between the roles — X sets MV, MV sets power, power sets the next X — was never derived, so every one-at-a-time verdict was right and the sum was wrong. Same family as Jaya's (2026-08-04, filed as "a fourth X-spell") and Bulk Up (a multiplier scored on a base of 2). The rival-lists pass of 2026-08-09 saw the shape (*"they have more ways to grow her"*) and still filed Unleash Fury and Bionic Blow as close calls.
**Changes:**
- For any commander whose text reads one of its own stats, write the recurrence W' = f(W) per spell type *before* assigning roles. If f is superlinear, it is a chain deck: the pilot document needs the chain and its pip cost, not a mana threshold, and "seed" becomes a role with its own target count. The user's "SW plays like Bracket 4 even built like Bracket 3" was the correct read of the commander; the documents were the wrong read.
- When a build's chain hangs on one creature (Livaan is 1 of 99), search for spells whose X *is* the pump before reaching for tutors; and re-read any "one-shot pump, cut on principle" group against the recurrence, because these are not +3 for a card, they are ×2.
**See also:** eval-007, eval-019, eval-020, cost-017, build-024
**Source:** scarlet-witch (2026-09-08, turn-5 chain investigation, "`{X}{R}: +X/+0` pump instants double a power-discount commander with no engine on the board"); scarlet-witch (2026-09-08, the report of an opponent's turn-5 kill, `research/turn-5-chain-2026-09-08.md`, merged from "Filed pump as \"+N discount\" and X-spells as \"payoff\"; told the pilot to wait for turn 6 and 12 mana while the list held a five-pip turn-5 kill")

### Scored a damage-to-mana converter by WHEN its mana arrives instead of WHAT it is made of {#eval-037}

**Kind:** correction · **Recorded:** 2026-09-08
**Cards:** Neheb, the Eternal; The Scarlet Witch; Storm King's Thunder; Jaya's Immolating Inferno; Past in Flames; Electro, Assaulting Battery; Ashling, Flame Dancer
**Rules:** 120.3a, 500.1
**Claim:** For an "add mana for each X" permanent, the input X decides its value, and timing only matters once the size is known; a converter whose fuel is the deck's defining output is a second turn, not late mana.
**Evidence:** Cut Neheb, the Eternal from both Scarlet Witch chain builds with the grounds *"mana arrives postcombat, after damage."* The pilot corrected it: the damage **is** the input. *"At the beginning of each of your postcombat main phases, add {R} for each 1 life your opponents have lost this turn"* — so a precombat main that deals 21 to each of three opponents is **63 life lost = 63 red mana** for a second main phase, in the same turn, with sorcery speed available again. CR 120.3a (damage to a player causes that much life loss), CR 500.1 (the postcombat main phase happens every turn whether or not you attack). Modelled at the pip floor: Wanda 2, five red, no other reducers — precombat Storm King's Thunder X=2 into Jaya's X=7 copied twice is 21 to each opponent, which is **not lethal** against 40. Neheb then adds 63 red; Past in Flames plus a re-cast Jaya's at X=80 kills the table. Neheb converts the deck's most common failure mode — a huge turn that falls short — into a win. With Electro or Ashling out (*"you don't lose unspent red mana as steps and phases end"*) the unspent remainder even banks into the next turn. *Root cause:* filed the card by the *timing* of its output and never asked what its input was. The deck's defining output is bulk life loss, which is exactly this card's fuel, so the axis I scored on was the one axis that did not matter.
**Changes:** For any "add mana for each X" permanent, identify X and check whether the deck *produces* X in bulk before judging the timing. Timing only matters once the size is known — a second main phase with 63 red is not "late mana", it is a second turn. Companion to "Name the deciding axis out loud" (eval-005, 2026-08-04); here the axis was named and it was the wrong one.
**See also:** eval-005, eval-025
**Source:** scarlet-witch (2026-09-08) — the pilot's "we get all that refunded postcombat... round 2 of spells."

### Priced a "first spell each turn" engine at one trigger per turn cycle — the ledger already said four {#eval-038}

**Kind:** correction · **Recorded:** 2026-09-08
**Cards:** Arcane Bombardment; Deflecting Swat
**Claim:** A cut's grounds are what a future pass will trust and re-derive from, so grep the ledger for the card before writing them; Arcane Bombardment was priced at one trigger a turn cycle when the ledger already said up to four.
**Evidence:** Cutting Arcane Bombardment from the Scarlet Witch chain build, I wrote the grounds as *"its exiled pile grows by one card per turn, which is a value curve pointing the opposite way to a deck that means to win on turn 5."* The pilot pushed back: it triggers on *each turn*, so a cheap instant on each opponent's turn re-fires it. They were right, and **both halves of the correction were already in this file** — "'First spell each turn' is per player per turn of the game" (2026-08-23) and "'Exiled with' collections are cumulative — every trigger recopies the WHOLE pile" (2026-08-19), the latter written from a Scarlet Witch session and stating in as many words that an instant on an opponent's turn triggers it there too. Real output in a four-player pod is up to **four triggers a turn cycle**, each adding a card and recopying the entire pile. *Root cause:* wrote a card's grounds from a gist instead of grepping LEDGER for the card name. The skill's own instruction is *"Read LEDGER.md before you reason about a card"* and it is grep-friendly precisely for this; "Arcane Bombardment" appears in it twice, both times with the fact I got wrong.
**Changes:** Before writing grounds for a **cut**, grep the ledger for the card name, not only before an addition. A cut's grounds are the thing a future pass will trust and re-derive from, so a wrong rate in a cut is more durable damage than a wrong rate in a keep. Corollary for this card family: value "first spell each turn" engines as *turn count × pile size*, and check whether the deck has a cheap instant (or a free one — Deflecting Swat) to spend on each opponent's turn.
**See also:** eval-011, eval-014, eval-056, trig-016, trig-011
**Source:** scarlet-witch (2026-09-08) — the pilot's "it's spell each turn so I can cast a random instant on someone's turn and rerun the whole playlist every turn."

### Overdraw past hand size is a graveyard engine — re-check dedicated yard-fillers after adding draw {#eval-039}

**Kind:** pattern · **Recorded:** 2026-09-09
**Cards:** Goblin Engineer; Goblin Welder; Insight Engine; Unwinding Clock; Mind's Eye
**Rules:** 514.1
**Claim:** Once a deck draws past its maximum hand size every turn cycle, the cleanup-step discard (CR 514.1) becomes a reliable way to put cards in the graveyard. Any card whose job was *putting a specific card type into the yard* should be re-derived against that, because the draw engines may now do it for free.
**Evidence:** iron-man V3 ran Goblin Engineer for its ETB — *"search your library for an artifact card, put it into your graveyard"* — to feed Goblin Welder. After Insight Engine (10 cards a cycle with Unwinding Clock) and Mind's Eye (three-plus a cycle) were added, the pilot discards several cards at every cleanup, and in a 60-artifact list those discards *are* fat artifacts. Engineer's setup role was covered by the draw package it was sitting next to; its return clause was capped at MV 3 where Welder has no cap. It was cut for the draw engine that replaced its function.
**Changes:** After adding any draw engine, list the cards whose role is "get X into the graveyard" and ask whether overdraw now does it. Same family as "A mass untapper re-prices every {T} ability" (tap-006) — a new engine silently invalidates verdicts on cards that were never compared to it.
**See also:** eval-009, tap-006
**Source:** iron-man (2026-09-09) — Goblin Engineer out for Mind's Eye.

### Before running a sac-outlet tutor, audit whether the deck's TOKENS are the right card type {#eval-040}

**Kind:** pattern · **Recorded:** 2026-09-09
**Cards:** Kuldotha Forgemaster; Shorikai, Genesis Engine; Prodigy's Prototype; Royal Talon Fighter Jet; Parhelion II; Retrofitter Foundry; Ancient Den; Seat of the Synod
**Claim:** A card like Kuldotha Forgemaster ("{T}, Sacrifice three artifacts: search for an artifact, put it onto the battlefield") is only castable-in-practice if the deck generates *disposable* artifacts. Counting "how many artifacts do I run" is the wrong measurement — most of them are load-bearing, and most artifact decks' tokens are not artifacts at all.
**Evidence:** In cap-living-legend, 35 artifacts — and of six token producers, four made **non-artifact** tokens: Shorikai and Prodigy's Prototype make "1/1 colorless **Pilot creature** token," Royal Talon makes a white Soldier, Parhelion II makes an Angel. Only Retrofitter Foundry made true fodder, at {2} a Servo — two turns and {8} to fuel one activation.
**Changes:** For any sacrifice-cost card, count **fodder**, not permanents: tokens of the right type, already-spent permanents, and lands you can afford to lose. Read the token's full type line — "Pilot creature token" and "Servo **artifact** creature token" look alike in a decklist and are not interchangeable. Also check for artifact *lands* (Ancient Den, Seat of the Synod) hiding in the count as MV-0 artifacts; sacrificing one costs a land drop.
**Source:** cap-living-legend (2026-09-09) — pilot challenged Kuldotha Forgemaster with "what would we be sacking?"

### An ability-borrowing card's value IS its sources — exclude them from the cut list {#eval-041}

**Kind:** pattern · **Recorded:** 2026-09-10
**Cards:** Marvin, Murderous Mimic; Thousand-Year Elixir; Brass Squire; Master Transmuter; Steel Overseer; Iron Spider, Stark Upgrade; Iron Lad, Diverging Destiny; Goblin Welder; Tony Stark; Vedalken Orrery
**Rules:** 302.6
**Claim:** When the incoming card gains, copies or counts abilities from other permanents you control, every one of those permanents is part of its value, so cutting one of them to make room degrades the new card in the same swap. Draw the cut from outside the source set, and also protect any enabler that turns the borrowed abilities on.
**Evidence:** Marvin, Murderous Mimic — *"Marvin has all activated abilities of creatures you control that don't have the same name as this creature."* In iron-man V3 its sources were seven `{T}` creatures (Brass Squire, Master Transmuter, Steel Overseer, Iron Spider, Iron Lad, Goblin Welder, the front-face commander). Any of them as the cut would have removed one of Marvin's modes. Thousand-Year Elixir (*"activate abilities of creatures you control as though those creatures had haste"*) was also excluded, because gained `{T}` abilities obey CR 302.6 and Elixir is what lets Marvin use them the turn he lands. The cut came from a non-creature (Vedalken Orrery).
**Changes:** Before nominating cuts for a "has all abilities of…", "for each…", or copy effect, list its sources and enablers from the current decklist and strike them from the candidate table. Same family as the count-scaler correction (don't cut a card whose count the incoming package grows, eval-011).
**See also:** eval-011
**Source:** iron-man (2026-09-10) — Marvin in for Vedalken Orrery.

### Draw -> counter engines scale with the deck's draw count, and each drawn card is its own trigger {#eval-042}

**Kind:** pattern · **Recorded:** 2026-09-10
**Cards:** Iron Man, Armored Avenger; Agent Phil Coulson; Lae'zel, Vlaakith's Champion; Urdnan, Dromoka Warrior
**Rules:** 121.2
**Claim:** In a deck that draws several cards a turn, a "whenever you draw a card, put a +1/+1 counter on target creature" permanent is a voltron engine that outpaces every tap-based counter placer.
**Evidence:** CR 121.2 — "Cards may only be drawn one at a time. If a player is instructed to draw multiple cards, that player performs that many individual card draws," so "draw two" is two triggers. Modelled in cap-living-legend (commander starts 3/4, attacks unblocked, three draws a turn): one engine (Iron Man, Armored Avenger) alone gives lethal commander damage on the **third** swing; adding Agent Phil Coulson (a `{T}` ability the commander untaps) gives lethal on the **second**; adding Lae'zel (+1 per placement, verified per permanent) or Urdnan's double strike gives 35–54 on swing two.
**Changes:** Before building a voltron-via-counters plan, count the deck's draws per turn — that number, not the counter placers, sets the clock. Pair the engine with evasion (the binding constraint on a commander that is otherwise small) and one-creature protection; commander damage is combat damage only (see dmg-010), so double strike and unblockability are the accelerants, not damage multipliers.
**Source:** cap-living-legend (2026-09-10).

### Re-run §1.3 on every carried-over card when a variant changes the deck's creature count {#eval-043}

**Kind:** pattern · **Recorded:** 2026-09-10
**Cards:** Supreme Verdict; Winds of Abandon; Captain America, Living Legend
**Claim:** A card's self-hit status is a property of the list, not the card. Carrying a sweeper from a Vehicle list into a creature list can flip it from one-sided to self-destructive.
**Evidence:** Supreme Verdict (destroy all creatures) was effectively one-sided in cap-living-legend `DECK.md`, because its win condition is Vehicles — artifacts that aren't creatures at sorcery speed. In `DECK-COUNTERS.md`, the win condition is the commander himself plus a board of counter engines; the same card kills Cap (paying commander tax again) and the whole engine. Replaced by Winds of Abandon, whose overload exiles only "each creature you don't control."
**Changes:** When building a variant by subtraction (keep 70, swap 30), do not treat the kept 70 as pre-verified. Re-check every sweeper, symmetrical effect and "each creature" clause against the new win condition — especially cards whose one-sidedness came from the *old* list's card types.
**See also:** eval-004, eval-033
**Source:** cap-living-legend (2026-09-10) — `DECK-COUNTERS.md` build.

### In an aristocrats deck combat is not a second axis — blocked creatures ARE the drain engine, so keep anthems {#eval-044}

**Kind:** pattern · **Recorded:** 2026-09-23
**Cards:** Chitterspitter; Skullclamp; Blood Artist; Zulaport Cutthroat; Bastion of Remembrance; Mirkwood Bats; Vito, Thorn of the Dusk Rose; Sylvan Anthem; Squirrel Sovereign
**Rules:** 704.5f
**Claim:** Do not cut an anthem out of a token/sacrifice deck purely because it interferes with a Skullclamp-style toughness-1 payoff. In a deck whose creatures dying is profitable, a wide attacking board is a *second route to the same win*, not a distraction: blockers that eat your tokens fire every death trigger you own, and a defender you remove is a token that connects.
**Evidence:** Pilot, 2026-09-23, on restoring Chitterspitter after I cut it for the Skullclamp conflict: *"yeah we want to win with drain but it doesn't hurt having more options like wideboard aggro which most people can't defend against… combat isn't always so bad because if our creatures get blocked or we take out one of their defenders PING.. WE'RE DRAINING BABYYY."* Mechanically correct — a token that trades in combat is a death trigger on every Blood Artist, Zulaport, Bastion, Mirkwood Bats and Vito in the list, so attacking costs nothing the deck wanted to keep.
**Changes:** Supersedes the *practical weighting* of the 2026-09-22 Skullclamp entry (equip-027), not its rules content: the rule (CR 704.5f, an anthem stops a 1/1 dying to +1/−1) still holds, but "turns off Skullclamp" is a **cost to weigh, not a veto**. Weigh it against how much the anthem buys the combat route, and against whether the deck has non-Squirrel/off-type 1/1s the Clamp can still use. Only cards that are *purely* anthem with no other text (Sylvan Anthem, Squirrel Sovereign) should lose on this ground alone. Same family as the pod-tendencies rule: **name the tension and let the pilot choose, never silently exclude.**
**See also:** eval-010, equip-027
**Source:** chatterfang (2026-09-23) — pilot restored Chitterspitter over my cut.

### Score a "choose two" wipe by its best PAIR of modes against your own board, not its best single mode {#eval-045}

**Kind:** pattern · **Recorded:** 2026-09-24
**Cards:** Austere Command; Ghave, Guru of Spores; Bitterblossom; Grave Pact; Dictate of Erebos; Sol Ring; Skullclamp; Mondrak, Glory Dominus; Pitiless Plunderer; Llanowar Elves
**Rules:** 202.1b, 202.3a
**Claim:** Austere Command looked fine in Ghave because one mode (creatures MV ≥ 4) spares tokens and doublers, but the card makes you choose two modes, and in a tokens-and-enchantments deck every pair hits our own engine.
**Evidence:** Austere Command: *"Choose two — • Destroy all artifacts. • Destroy all enchantments. • Destroy all creatures with mana value 3 or less. • Destroy all creatures with mana value 4 or greater."* Ghave's list had 16 enchantments (all doublers, Grave Pact, Dictate, Bitterblossom), 6 artifacts (Sol Ring, both Altars, Skullclamp), every token at MV 0 (CR 202.1b: tokens have no mana cost; 202.3a: no mana cost means MV 0), and Ghave at MV 5. The least bad pair was "MV ≥ 4 + artifacts", which still kills Ghave, Mondrak, Plunderer and both Altars.
**Changes:** §1.3 applied to modal cards: list your own permanents under each mode, then evaluate the best **pair** (or best N for "choose N"). A modal wipe is only one-sided if some pair of modes is.
**See also:** eval-010
**Source:** ghave (2026-09-24) — cut for Llanowar Elves after the pilot turned down the first cut.

### Type-changing your own board into artifacts is a defensive downgrade, not just an upside {#eval-046}

**Kind:** pattern · **Recorded:** 2026-09-25
**Cards:** Ygra, Eater of All; Ninja Pizza; Vandalblast; Bane of Progress; By Force; Null Rod; Collector Ouphe; Stony Silence; Chatterfang, Squirrel General
**Rules:** 101.2, 302.6, 613.1d, 613.1f
**Claim:** Ygra, Eater of All ("Other creatures are Food artifacts in addition to their other types") turns on every Food payoff you own, but the same line exposes the whole board to artifact hate and switches off its own abilities under a Null Rod effect.
**Evidence:** CR 613.1d (layer 4, type-changing) resolves before CR 613.1f (layer 6, ability-adding), so Ninja Pizza's grant to "Foods you control" does reach the creatures. But: (1) mass artifact removal — Vandalblast, Bane of Progress, By Force — becomes a one-sided wipe of a board that would otherwise be immune; (2) Null Rod / Collector Ouphe / Stony Silence / Karn stop *activated abilities of artifacts*, which now includes Chatterfang's own `{B}, Sacrifice X Squirrels` (CR 101.2 — "can't" wins); (3) single-target artifact removal becomes creature removal; (4) Ygra's own **Ward—Sacrifice a Food** is payable by any opponent sacrificing any creature they control, so the ward is nearly blank in a creature pod. The granted ability also contains `{T}`, so CR 302.6 blocks tokens made this turn — it is next-turn mana.
**Changes:** For any "your creatures are also \<artifact/other type\>" card, list the hate cards that newly hit you and check whether the grant's cost contains `{T}` before counting it as this-turn mana. Same audit as §1.3, applied to type-changing rather than to symmetric damage.
**See also:** eval-051
**Source:** chatterfang (2026-09-25) — Ygra evaluated, then passed over on these grounds.

### Sort an upgrade into engine and converter — cheap converters, board-to-mana included, are cut last {#eval-047}

**Kind:** pattern · **Recorded:** 2026-09-25
**Cards:** Awaken the Woods; Ancient Greenwarden; Mycoloth; Circle of Dreams Druid; Blasphemous Edict; Champion of Lambholt; Orcrist, Goblin-cleaver; Yawgmoth, Thran Physician; Craterhoof Behemoth; Cryptolith Rite; Gaea's Cradle; Hazel of the Rootbloom; Avenger of Zendikar; The Unbeatable Squirrel Girl
**Claim:** When the complaint is "I build a big board and can't close," the fix is a card that *converts* the board, the conversion cards worth having are the cheap ones, and adding more engine compounds the problem it was meant to solve. Cards that convert an existing board into mana (Circle of Dreams Druid, Cryptolith Rite, Gaea's Cradle, Hazel of the Rootbloom) look like engine pieces and get cut as "more engine" during a trim, but they are the payoff layer: they are what lets a board that already exists become cast spells in the same turn.
**Evidence:**
- 2026-09-25 (chatterfang / upgrade-test, wave 4): Of 13 swaps into upgrade-test, the four reverted for cost (Awaken the Woods, Ancient Greenwarden, Mycoloth, Circle of Dreams Druid) were all *engine* — more tokens, more mana, more triggers. All four converters kept their slots and are cheap: Blasphemous Edict (`{B}` with 13 creatures on the battlefield), Champion of Lambholt (3), Orcrist, Goblin-cleaver (3), Yawgmoth, Thran Physician (4). The one expensive keep, Craterhoof Behemoth at 8, is a converter too.
- 2026-09-26 (chatterfang / upgrade-test, wave 5): upgrade-test held 23 token makers and could not cast its top end - Avenger of Zendikar (7), Craterhoof Behemoth (8), Orcrist's equip (6) and The Unbeatable Squirrel Girl's {1}{G}{G}{G} sink. Only **9 mana sources cost 3 or less**. The pilot's framing is the correct one: bodies are worthless if the mana to use them arrives two turns late.
**Changes:**
- Sort any upgrade package into **engine** and **converter** before proposing it, and check the engine half against the deck's existing count first (§2.1). A deck that loses with 20 tokens on board does not need a 21st token source.
- When trimming a tokens deck, separate *token production* from *board-to-mana conversion* and count them apart. Over-production with no conversion is the failure mode that looks like "the deck is slow." Trim production first.
**History:** On 2026-09-25 this ledger counted Circle of Dreams Druid among the *engine* cards reverted for cost in wave 4 ("more tokens, more mana, more triggers"); corrected on 2026-09-26 because board-reading mana is the conversion (payoff) layer, not engine, and should be cut last.
**See also:** eval-030, eval-053
**Source:** chatterfang / upgrade-test (2026-09-25, wave 4, "Cheap converters beat expensive engines in a deck that already has too much engine"); chatterfang / upgrade-test (2026-09-26, wave 5, merged from "In a go-wide deck, board-reading mana is not \"engine\" - cut it last")

### "Creature OR artifact put into a graveyard" is a mana-payoff in a Treasure/Food deck {#eval-048}

**Kind:** pattern · **Recorded:** 2026-09-26
**Cards:** Marionette Apprentice; Ninja Pizza; Vito, Thorn of the Dusk Rose
**Claim:** Marionette Apprentice-style drain reading *"whenever another creature **or artifact** you control is put into a graveyard from the battlefield"* is not a creature-death payoff with a rider. In a deck that makes and spends artifact tokens, it drains off **mana you were already spending**, which makes it one of the best payoffs in the list rather than a marginal one.
**Evidence:** upgrade-test holds **12 artifact-token sources** and **11 effects that sacrifice or crack one**. With Ninja Pizza granting Foods "{T}, Sacrifice: add one mana of any colour", every mana made off a Food is a trigger; every Treasure cracked is a trigger. It also reads "each opponent", unlike Vito's "target opponent". I nominated it for a cut and the pilot overruled it.
**Changes:** Before rating a drain payoff, grep the list for what its trigger *actually* counts. In an artifact-token deck, count Treasures, Foods and Clues as death triggers - they roughly double the event count that the creature-only payoffs see.
**See also:** eval-035
**Source:** chatterfang / upgrade-test (2026-09-26) wave 6 — pilot's correction.

### Golden Guardian + Hexhaven Invigorator: a self-contained ramp package {#eval-049}

**Kind:** pattern · **Recorded:** 2026-09-28
**Cards:** Golden Guardian; Hexhaven Invigorator
**Rules:** 603.2c, 603.6a
**Claim:** **Golden Guardian** is the cleanest on-demand enabler for **Hexhaven Invigorator**, because it is the only card in BG identity that fights *another creature you control* on demand, and it is **built to die** — so the enabler converts itself into a mana land instead of being spent. Save this pair for any green landfall or lands-matter deck; **explicitly requested by the pilot 2026-09-28 for future decks.**
**Evidence:** Golden Guardian {4}, 4/4 Defender, colourless so it fits any identity — *"{2}: This creature fights another target creature you control. When this creature dies this turn, return it to the battlefield transformed under your control."* Reverse face **Gold-Forge Garrison** is a land: *"{T}: Add two mana of any one color. {4}, {T}: Create a 4/4 colorless Golem artifact creature token."* Hexhaven Invigorator {G}{G}{G}{G} 6/6 vigilance — *"Whenever this creature is dealt damage, you may search your library for up to that many land cards, put them onto the battlefield tapped, then shuffle."*
**Changes:** Reach for this pair in a lands/landfall shell, not in a token-sacrifice shell — its output is land drops, so it needs landfall payoffs already on board to beat a plain ramp spell. The enabler is colourless, so the package costs one green-identity slot.
**The line:** {4} Guardian, then {2} to fight Hexhaven. Guardian deals 4 → Hexhaven's trigger fetches **up to 4 land cards** (any lands, not basics, tapped). Hexhaven deals 6 back → Guardian is destroyed (4 toughness) → its delayed trigger **returns it transformed** as a mana land. Net: **6 mana for 4 tapped lands plus a two-mana land**, and Hexhaven lives with 4 damage marked (under the 5-damage survival cap). Every fetched land triggers landfall **once per land** (CR 603.6a, 603.2c).
**See also:** eval-050
**Source:** chatterfang (2026-09-28) — pilot asked that the package be saved for future decks.

### Hexhaven Invigorator's real lever is INDESTRUCTIBLE, and deathtouch is a trap {#eval-050}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** Hexhaven Invigorator
**Rules:** 120.4b, 120.6, 120.8, 514.2, 603.2, 603.3, 701.19a, 702.12b, 704.5g, 704.5h
**Claim:** A damage-triggered fetch like **Hexhaven Invigorator** is capped by its own toughness until you grant it **indestructible**, which removes the cap entirely and turns it into an unbounded engine; granting it **deathtouch** instead turns it off completely. This applies to every "whenever this creature is dealt damage" payoff, not just this card.
**Evidence:** Damage marked on a creature **accumulates for the whole turn** (CR 120.6 — removed only on regeneration or in the cleanup step, CR 514.2), and CR 704.5g destroys it once total marked damage ≥ toughness. So a vanilla 6/6 absorbs a **maximum of 5 damage per turn** and dies on the sixth. **CR 702.12b:** a permanent with indestructible *"can't be destroyed… Such permanents aren't destroyed by lethal damage, and they **ignore the state-based action that checks for lethal damage** (704.5g)."* Damage is still marked and still triggers, so the cap vanishes. Regeneration (CR 701.19a) instead *"remove[s] all damage marked on it"*, resetting the counter mid-turn at the cost of tapping it. **The trap: CR 704.5h** destroys a creature *"dealt damage by a source with deathtouch"* regardless of amount — so a single 1/1 deathtouch token fights it, fetches 1 land, and kills it. Any deathtouch anthem silently breaks the engine.
**Changes:** When evaluating any damage-triggered payoff, price the indestructible granter into the package rather than treating the creature as a standalone card, and audit the deck for deathtouch granters before adding it. Anthems scale it 1:1 — a 3/3 token fetches 3 lands.
**Two more facts worth keeping:** damage is **not capped at toughness** for the trigger's amount — fight a 10/10 into a 6/6 and *"that many"* is **10**, so up to 10 lands (it dies, but the trigger already fired; CR 603.2, 120.4b, and the trigger is independent of its source per CR 603.3). And **CR 120.8**: a **0-power** creature *"does not deal damage at all. That means abilities that trigger on damage being dealt won't trigger"* — never fight a 0/1 Plant or Goat token into it.
**See also:** eval-049
**Source:** chatterfang (2026-09-28) — verifying the pilot's Squirrel-into-Hexhaven fight engine.

### A symmetric hate static or lock switches off your own engine — list what your deck does in its window first {#eval-051}

**Kind:** pattern · **Recorded:** 2026-09-28
**Cards:** Karn, Argent Defender; Ultron, Artificial Malevolence; Mithril Coat; Hero's Blade; Thassa's Oracle; Gray Merchant of Asphodel; Elas il-Kor, Sadistic Pilgrim; Yuriko, Blade of the Mighty; Captain America, First Avenger; Ghave, Guru of Spores; Viscera Seer; Grand Abolisher
**Rules:** 506.1
**Claim:** Symmetric statics that read like hate pieces also switch off your own engine when it lives in the window they lock: a Torpor-style "entering doesn't trigger" static turns off any deck whose engine is an ETB trigger, including commanders whose whole value is one, and a "during combat, can't activate" lock blocks your own combat-step activations.
**Evidence:**
- 2026-09-28 (ultron + every FRA review): Karn, Argent Defender reads like a hate piece, but its symmetric text turns off any deck whose engine is an ETB trigger. Oracle: *"Artifacts and creatures entering the battlefield don't cause abilities to trigger."* Ultron reads "Whenever another nontoken artifact you control enters". It also kills auto-attach Equipment (Mithril Coat, Hero's Blade), Thassa's Oracle, Gray Merchant and Elas-style "creature enters" drains. All 11 FRA reviews rated it a trap.
- 2026-09-28 (captain-america, FRA review): Yuriko, Blade of the Mighty's lock covers you too, and it starts at the beginning of combat, so it blocks any engine that activates in response to its own beginning-of-combat trigger, and every in-combat sac outlet. Oracle: *"During combat, players can't cast spells or activate abilities that aren't mana abilities."* CR 506.1: the beginning of combat step is part of the combat phase. Captain America's Catch → Throw line, Ghave's activations, Viscera Seer and instant protection all go dead during combat. Flagged by the captain-america, caesar, ghave and edgar-markov reviews.
**Changes:**
- Run §1.3 on every symmetric static against the commander's own trigger before anything else, and still flag it to the pilot as stax rather than excluding it silently.
- Before seating a combat lock, list what the deck activates during combat. Never count it as a one-sided Grand Abolisher.
**See also:** eval-029, eval-046
**Source:** ultron + every FRA review (2026-09-28, "A Torpor-style \"entering doesn't trigger\" static can switch off your own commander"); captain-america (2026-09-28, FRA review, merged from "A symmetric \"during combat, can't activate abilities\" lock turns off your own combat-step engines")

### A graveyard-return clause the deck meets passively makes a card repeatable {#eval-052}

**Kind:** pattern · **Recorded:** 2026-09-28
**Cards:** Command the Stage
**Rules:** 113.6m
**Claim:** An ability that returns its own card from the graveyard works *in* the graveyard. If the deck meets its condition without trying, the card is one cast per turn cycle, not a one-shot.
**Evidence:** CR 113.6m. Command the Stage: *"At the beginning of each upkeep, if an opponent was dealt noncombat damage last turn, return this card from your graveyard to your hand."* Every pinger in TVS and Scarlet Witch meets the condition, so it came up MAIN in both decks' main lists.
**Changes:** Score these as repeatable, and count how often the deck's normal play meets the condition.
**Source:** scarlet-witch / vision-scarlet-witch (2026-09-28), FRA review.

### Equipment on the commander buys a removal magnet, not a bonus {#eval-053}

**Kind:** pattern · **Recorded:** 2026-09-28
**Cards:** Orcrist, Goblin-cleaver; Chatterfang, Squirrel General
**Claim:** Equipping the commander concentrates the deck's value onto the one permanent the table is already most willing to answer. When an Equipment's payoff does not specifically need the commander, put it on an expendable body instead — and when the deck has no good non-commander carrier, that is a reason to cut the Equipment, not to keep equipping the commander.
**Evidence:** Pilot playtest report on Orcrist, Goblin-cleaver in the Chatterfang deck, 2026-09-28: *"i was able to use it a few times in the game and it worked quite nicely but i really need to put it on another creature as to not increase chatterfang's target level."* The card worked; the carrier was the problem. Chatterfang is also the deck's sac outlet and token multiplier, so losing him to removal costs far more than the +2/+2 and trample gained.
**Changes:** When evaluating Equipment for a commander deck, name the intended carrier explicitly and check it is **not** the commander unless the trigger requires the commander's own text (Orcrist's Treasure trigger only needs *combat damage*, and its forestwalk synergy with Chatterfang was the trap that made equipping him look correct). A go-wide deck full of 1/1 tokens has no good carrier for combat-damage Equipment, which is an argument against the whole category there.
**See also:** eval-047, equip-005
**Source:** upgrade-test (2026-09-28) wave 7 — pilot's playtest verdict.

### A creature-only answer never replaces an any-permanent answer {#eval-054}

**Kind:** correction · **Recorded:** 2026-09-28
**Cards:** Lich's Relic; Generous Gift; Terminate; Lethal Scheme
**Claim:** When a new removal card joins a deck, it can only displace removal that covers the same or fewer permanent types. Cutting a "destroy target permanent" card for a "destroy creatures and planeswalkers" card loses coverage, however good the new card's rate is.
**Evidence:** The FRA review proposed Lich's Relic (up to one creature or planeswalker per opponent) for Generous Gift (*"Destroy target permanent"*) in edgar-markov `sacrifice`. The pilot rejected it: *"generous gift is permanent destruction and we can't get rid of permanent destruction and replace it with only creature destruction."* The same card was accepted where it replaced Terminate (creature only, lord-of-pain) and Lethal Scheme (creature/planeswalker, caesar).
**Changes:** In the §2.1 removal table, add a column for the permanent types each answer hits, and only nominate cuts whose coverage is a subset of the incoming card's. The review agent had counted "noncreature answers 4 → 3" and proposed the cut anyway. The count was right; the move was wrong.
**See also:** eval-026
**Source:** edgar-markov (2026-09-28), FRA review, pilot override.

### Say WHICH card a doubler doubles; don't credit the commander with a payoff's trigger {#eval-055}

**Kind:** correction · **Recorded:** 2026-09-28
**Cards:** Windcrag Siege; Genji Glove; Captain America, First Avenger
**Claim:** When a trigger doubler's value runs through a specific payoff, the summary must name that payoff and its dependency. Compressing it to a commander-level claim reads as a rules error.
**Evidence:** The Captain America summary said Windcrag Siege gives *"three Catches and three Throws a turn"*. The pilot asked how it *"triggers Cap's ability twice"*. It doesn't. Catch is a beginning-of-combat trigger and Throw is activated, and Mardu mode only affects triggers caused by a creature attacking. The third Catch comes from the Siege doubling **Genji Glove's** attack trigger, which makes two extra combats, each with its own beginning of combat. That line needs Genji equipped to an attacker in combat 1. The review file had it right; the one-line summary lost the dependency.
**Changes:** In summaries, write "with X out, Y happens" whenever a benefit needs a specific card on the battlefield. Never attribute a payoff's trigger to the commander.
**See also:** eval-032, dmg-018, equip-028
**Source:** captain-america (2026-09-28), FRA review.

### "Counter bait" and "surprise lethal" are real functions — a vacuum evaluation misses both {#eval-056}

**Kind:** correction · **Recorded:** 2026-09-28
**Cards:** Bloodletter of Aclazotz
**Claim:** A card can earn its slot by **absorbing an opponent's answer** or by **hiding the lethal math**, and neither shows up in any per-card analysis of rate, castability or conditionality. Before cutting a high-impact finisher, ask what it draws out of opponents' hands and whether the table can see the kill coming without it.
**Evidence:** Pilot on Bloodletter of Aclazotz, 2026-09-28: *"it is a very good counter bait and if not countered it's almost always a surprise win."* I had nominated it on three grounds — triple black pips in a G-majority deck, *"during your turn"* only, and being a pure multiplier that needs the drain already running. **None of the three survives contact:** 31 black sources make `{1}{B}{B}{B}` castable; "your turn only" is precisely when you kill someone, so it is not a limitation on a finisher; and the deck has **15** lifegain/drain sources, so the condition is met constantly. That last point means I also broke an existing entry in this very file — *"'Conditional' is only a real cut reason if the deck fails to meet the condition"* (eval-030).
**Changes:** Add two questions to the cut checklist for any card with a high ceiling: **(1) does it absorb removal or a counterspell that would otherwise hit the engine?** — a threat that eats an answer has done work even when it dies, and a deck with too few real threats lets opponents hold answers for the pieces that matter; **(2) can opponents see the lethal coming without it?** A doubler that turns a survivable swing into an unsurvivable one is a *win condition*, not a *multiplier*, and should be ranked against finishers rather than against value engines. Also: re-read this file's own entries before writing a cut argument, not only before writing a card evaluation.
**See also:** eval-030, eval-038
**Source:** upgrade-test (2026-09-28) — pilot declined the Bloodletter of Aclazotz cut.

### A ramp spell that PUTS a land onto the battlefield is a landfall card {#eval-057}

**Kind:** pattern · **Recorded:** 2026-09-28
**Cards:** Cultivate; Nature's Lore; Sakura-Tribe Elder; Tireless Provisioner; Tireless Tracker; Scute Swarm; Academy Manufactor; Chatterfang, Squirrel General
**Claim:** Never file a land-fetch spell as "pure ramp, no synergy" in a landfall deck without reading which zone the land goes to. *"Put onto the battlefield"* is a landfall trigger; *"into your hand"* is a future land drop, which is another landfall trigger in a deck with extra-land-drop effects.
**Evidence:** I nominated Cultivate for a cut with the grounds *"the only card in Ramp & Mana with zero synergy — it just fetches lands,"* and the pilot corrected me: *"but doesn't cultivate interact with landfall?"* Oracle text: *"Search your library for up to two basic land cards… **put one onto the battlefield tapped and the other into your hand**."* So it is **two** landfall triggers in the Chatterfang list — one immediately, one on the later drop — each firing Tireless Provisioner (Food or Treasure), Tireless Tracker (Clue) and Scute Swarm (an Insect, or a self-copy at six lands), all of which then run through Academy Manufactor, Chatterfang and the doublers. Same applies to Nature's Lore (*"onto the battlefield"*, untapped) and Sakura-Tribe Elder (fetches to the battlefield on sacrifice).
**Changes:** In any deck with landfall payoffs, count land-fetch spells as landfall enablers and grade them by **how many lands reach the battlefield**, not by mana efficiency. A two-land fetch that splits battlefield/hand is worth more than a one-land fetch of the same cost. "No synergy" is a claim about a card's text that must be checked against the text.
**See also:** eval-016
**Source:** upgrade-test (2026-09-28) — pilot rescued Cultivate from my cut list.
