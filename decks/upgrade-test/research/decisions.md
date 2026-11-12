# Upgrade Test — decisions

Append-only. Newest last.

## 2026-09-25 — Founded as a playtest fork of decks/chatterfang

The pilot: *"can you make a copy with the proposed swaps so i can try it out cause i don't have time
to decide so do your recommended swaps on a new deck call it upgrade-test."*

So this is **not** a curated build — it is the whole recommended package applied at once so the list
can be piloted rather than adjudicated card by card. `decks/chatterfang` is untouched and remains the
deck of record. The grounds for every individual swap live in
`decks/chatterfang/research/proposal.json` and on the proposal artifact
(https://claude.ai/artifact/Qgp3cNcdmKWoE8fPZMxvQB); they are not duplicated here.

All 13 swaps applied in three `deck:edit` runs, one per wave, so `history.jsonl` records them
separately and any single wave can be reverted from `versions/`:

| Wave | In | Out |
|---|---|---|
| 1 | Craterhoof Behemoth, Concordant Crossroads, Ancient Greenwarden, Mycoloth, Circle of Dreams Druid | From Beyond, Tendershoot Dryad, Bitterblossom, Marauding Blight-Priest, Blade of the Bloodchief |
| 2 | Orcrist Goblin-cleaver, Bilbo Fellow Conspirator, Ninja Pizza, Cauldron of Essence | Verdant Command, Nested Shambler, Idol of Oblivion, Dina Soul Steeper |
| 3 | Blasphemous Edict, Yawgmoth Thran Physician, Champion of Lambholt, Awaken the Woods | Toxic Deluge, Sakura-Tribe Elder, Abrupt Decay, Cultivate |

**Validated:** 100/100, 36 lands, avg MV 2.73 → **3.00**, no off-identity or non-commander-legal
cards, Game Changers **1/3** (Gaea's Cradle — neither Yawgmoth nor Blasphemous Edict is one). Every
section count matches the proposal's projected column exactly.

**Three costs the pilot took on knowingly, carried here so they are testable rather than forgotten:**

1. **Curve up 2.73 → 3.00.** This is the deliberate trade — cheap per-upkeep engines for bigger
   single-turn payoffs. The mana that pays for it (Awaken the Woods, Ancient Greenwarden, Circle of
   Dreams Druid, Ninja Pizza) went in on the same pass on purpose. **If the deck plays clunky, this
   is the first number to blame.**
2. **Removal 6 → 5.** Abrupt Decay was the cut for Champion of Lambholt. It was narrow (MV ≤ 3), but
   this is the thinnest the deck has been on interaction and it was flagged as the weakest part of
   wave 3.
3. **Lifegain converters 3 → 1.** Dina and Marauding Blight-Priest both left; Vito is the only one
   remaining. Per-token drain went *up* (Cauldron of Essence added a fourth "each opponent loses 1"),
   but the lifegain-event axis is now a single point of failure.

**Pilot's picks that were cut, both flagged before the fork was built and both the pilot's call to
restore:** Blade of the Bloodchief (wave 1) and Cultivate (wave 3). Nested Shambler, which the pilot
defended on 2026-09-23, was also cut in wave 2 as the smallest card left in Token Engines.

**Not taken into this fork**, and still on the proposal page with reasons: Ygra Eater of All (turns
the whole board into artifacts — Null Rod and Collector Ouphe would switch off Chatterfang's own
ability), Bolas's Citadel (Game Changer, salt 1.72), Sephiroth, Species Specialist, Warren
Soultrader, Swarmyard Massacre, Nuka-Cola Vending Machine, Crop Rotation, Eldrazi Monument,
Springleaf Parade. Gardenize is not commander-legal.

## 2026-09-25 — Wave 4: curve correction, after a deck reviewer caught the regression

The pilot ran the fork through a deck reviewer: **estimated win turn 6.6 (parent) vs 7.5 (fork)** —
the fork was *slower*, which is the exact opposite of the complaint the package was built to fix.
They asked whether the deck was actually better. It was not, and the measurement held up.

**What the numbers showed.** Cards at MV ≤ 2 had fallen **30 → 24**, and MV ≤ 3 from 49 → 46. No
single wave caused it (+0.13, +0.08, +0.07 avg MV individually) — the three waves *stacked*.

**The specific error, which was mine.** Wave 1 and wave 3 cut **Cultivate** and **Sakura-Tribe
Elder** — unconditional early ramp that puts lands onto the battlefield — and added **Awaken the
Woods** (dead at X=0), **Circle of Dreams Druid** (needs a board, then a turn) and **Ancient
Greenwarden** (six mana). The `Ramp & Mana` section count went 10 → 13, so the stat rail reported
*more ramp* while ramp quality had fallen. Section counts measure slots, not function.

**Why the reviewer's 7.5 was optimistic rather than harsh.** Awaken the Woods is `{X}{G}{G}` and so
is counted at **mana value 2** by every stats tool, including `deck:show` and the proposal artifact.
Its real cost is 5 for a meaningful X. The deck was slower than any mana-value model could see.

**The pattern worth keeping.** Every addition that genuinely addressed "I only win with the combo"
is cheap — Blasphemous Edict (`{B}` with 13 creatures), Champion of Lambholt (3), Orcrist (3),
Yawgmoth (4). The four that moved the curve were all *more engine*, which is the half the deck
already had too much of.

| Out | In | Why |
|---|---|---|
| Awaken the Woods | Cultivate | Unconditional turn-3 ramp beats an X spell that hid its own cost |
| Ancient Greenwarden | Sakura-Tribe Elder | Two-mana ramp + chump + free sac fodder, versus a six-mana engine |
| Mycoloth | Bitterblossom | Reverses my own wave-1 cut. The drip is weak; not acting before turn 5 is weaker |
| Circle of Dreams Druid | Verdant Command | Instant-speed 4 bodies for 2, versus conditional mana that needs the board already |

**Result:** avg MV **3.00 → 2.89**, MV ≤ 2 **24 → 26**, MV ≤ 3 **46 → 48**. 100/100, no legality or
identity flags, Game Changers still 1/3. Every converter from waves 1–3 stays in the deck.

**Still open for the pilot:** re-run the reviewer on this version and compare against the parent's
6.6 on the same run. If it is still behind, the next cuts to consider are Craterhoof Behemoth (8
mana, the last genuinely expensive card) and restoring Nested Shambler over one of the 3-drops.

## 2026-09-25 — CommanderBracket A/B: the fork is still 7.5, and the sub-scores disagree with it

Ran both lists through commanderbracket.app myself, same session, commander set to Chatterfang.

| | chatterfang (parent) | upgrade-test (fork) |
|---|---|---|
| Predicted win turn | **6.6** | **7.5** |
| Bracket placement | B3 (6–8) | B3 (6–8) |
| Deck health | 66 | **69** |
| Mana | 74 | **84** |
| Interaction | 72 | 72 |
| **Engine** | **51** | **50** |
| Ramp by turn 3 | 55% | **59%** |
| Two ramp by turn 3 | 15% | **19%** |
| 3 lands by turn 3 | 70% | 70% |
| Keepable opener | 95% | 95% |
| Archenemy level | Casual | **Contender** |
| Combos | 5 (1 two-card) | **7 (1 two-card)** |
| Tutors | 1 | 0 |
| Fast mana | 2 | 2 |
| Game Changers | 1 | 1 |

**Wave 4 did what it was aimed at.** Mana 74 → 84, ramp-by-turn-3 55% → 59%, two-ramp 15% → 19%.
The curve diagnosis was correct and the fix is measurable.

**But the package's own thesis did not land.** Engine went **51 → 50**. The whole argument was that
the deck needed better conversion, and the tool reads the engine as unchanged. The additions changed
*what* the deck does without making it stronger at doing it. That is the honest verdict.

**Two caveats on the parent's 6.6, both real:**

1. The parent is credited with **1 tutor** and the fork with **0**. The parent's only tutor is
   **From Beyond**'s "search for an Eldrazi card" — and there are no Eldrazi in the deck. Part of the
   parent's faster reading rests on a tutor that cannot find anything.
2. The fork scores **7 combos to the parent's 5**, and *neither new one was proposed as a combo*:
   **Ninja Pizza** completes an infinite with Camellia + Peregrin Took (infinite card draw, infinite
   coloured mana), and **Concordant Crossroads** completes one with The Unbeatable Squirrel Girl +
   Cryptolith Rite (infinite ETB, infinite coloured mana). Both are chosen-N and so inside the
   pilot's loop policy, but they raise the deck's archenemy level from Casual to Contender and they
   were added without being flagged. The pod should be told.

**Conclusion.** Neither list is clearly better. The fork wins on mana and consistency, ties on
interaction, loses 0.9 on predicted win turn, and is a louder deck at the table. Both are solidly
Bracket 3. Games decide this, not the tool — but if the goal is specifically to move the win-turn
number, the lever is real tutors and fast mana, which is a bracket decision rather than a build one.

## 2026-09-26 — Wave 5: mana back in. Wave 4 was an over-correction

**The pilot was right and the evidence is clean.** Wave 4 reverted four cards to fix the curve
(avg MV 3.00 → 2.89, MV ≤ 2 24 → 26) and the CommanderBracket win turn stayed at **7.5**. The curve
was never what the metric was reading, so the revert cost mana and bought nothing measurable.

Their argument for **Circle of Dreams Druid**, verbatim: *"bodies don't really matter if it takes us
an extra 2-3 turns to have enough mana to play the cards we have."* My reason for cutting it —
"conditional, needs a board" — does not survive contact with this deck: making a board is the one
thing it does reliably, so Circle is a payoff for the deck's floor, not a card that needs setup.

| In | Out | Grounds |
|---|---|---|
| Circle of Dreams Druid | Champion of Lambholt | Champion was the **third** combat-dependent finisher behind Craterhoof, Orcrist and Valley Rotcaller, and an enabler rather than a kill. Circle is one tap for one mana per creature — the mana the top end actually needs. |
| Elvish Mystic | Deep Forest Hermit | A second turn-1 dork. The Hermit is 5 mana, and its "Squirrels you control get +1/+1" anthem turns off **Skullclamp** on every token — a cost the deck was quietly paying. |

**Result:** avg MV 2.89 → **2.83**, MV ≤ 2 26 → **27**, MV ≤ 3 48 → **49**, green sources 29 → 31,
Ramp & Mana 12 → 14, Token Engines 15 → 13. This wave adds mana *and* lowers the curve, so it does
not re-open the wave-4 problem. 100/100, no flags, Game Changers 1/3.

**Standing lesson for this deck:** the mana dorks and the tap-the-board mana are not "engine" here —
they are what turns an existing board into cast spells. Cut them last, not first.

## 2026-09-26 — Wave 6: Dina back in. Marionette nomination withdrawn

**Correction.** I nominated Marionette Apprentice as the cut for Dina. The pilot: *"marionette also
triggers on artifacts leaving which is nice, if i sac treasures or forage foods, it still triggers."*
Correct, and the numbers are decisive — this list holds **12 artifact-token sources** (Academy
Manufactor, Bilbo, Black Market Connections, Deadly Dispute, Ninja Pizza, Orcrist, Peregrin Took,
Pitiless Plunderer, Prosperous Innkeeper, Tippy-Toe, Tireless Provisioner, Tireless Tracker) and
**11 effects that sacrifice or crack one**. With Ninja Pizza out, every mana made off a Food is a
Marionette trigger at **each** opponent — drain off a resource already being spent. It is a top-tier
payoff here, not a cut candidate.

**Why Dina is a multiplier rather than a fifth drainer.** Blood Artist, Zulaport Cutthroat, Bastion
of Remembrance, Cauldron of Essence and Nadier's Nightblade each *gain life* per death. One creature
dying with four of them out is **four separate lifegain events** (CR 119.3, 119.9), so Dina triggers
four times for 1 to each opponent — doubling the package rather than adding to it. The list has
**16 lifegain event sources**. Vito converts the same events but hits one *target* opponent; Dina
hits each. They are not redundant.

**The cut: Verdant Command.** It was the last pure one-shot in Token Engines — four bodies once,
where everything else in that section is repeatable (Bitterblossom, Chitterspitter, Hazel, Scute
Swarm, Camellia) or a multiplier (Academy Manufactor, Peregrin Took, Tippy-Toe, Bilbo). Runner-up
considered and rejected: **Bitterblossom**, kept because two tokens every upkeep is two Mirkwood Bats
triggers every upkeep, which is exactly the per-token-created axis this deck kills on.

**Result:** Token Engines 13 → 12, Drain Payoffs 10 → **11**, lifegain converters **1 → 2**.
100/100, no flags, avg MV unchanged at 2.83, Game Changers 1/3.

## 2026-09-28 — Correction: Gardenize was never illegal

The 2026-09-25 founding entry above lists Gardenize under "not taken" as *"not commander-legal"*. That
was Scryfall's **pre-release** legality (Reality Fracture releases 2026-10-02), not a ruling on the
card — it is commander-legal. It has now been evaluated on its merits in the FRA set review
(`decks/chatterfang/research/fra-set-review-2026-09-28.md`): **MAIN for chatterfang, SIDE for this
fork** (this list already runs 14 ramp pieces and its open problem is the win turn, not mana). The
same stale reason in `decks/chatterfang/research/proposal.json` was corrected the same day.

## 2026-09-28 — Wave 7: Gardenize + Dryad in, on two playtest verdicts

**Applied.** 100/100. **Curve-neutral by construction and verified after the apply** — avg MV 2.83,
MV≤2 27, MV≤3 49, all identical to before. Two MV-3 in, two MV-3 out.

- **IN Gardenize** ({1}{G}{G}) for **OUT Orcrist, Goblin-cleaver**
- **IN Dryad of the Ilysian Grove** ({2}{G}) for **OUT Chitterspitter**

**Grounds for Gardenize:** a charge counter per creature dying, and the counters are **permanent**, so
the mana **recurs** every first main phase — ten Squirrels sacrificed once is ten green every turn
thereafter. Tokens count, because a token genuinely *dies* (CR 111.7) — the exact inverse of
The Mycotyrant, where the token never counted as a descend. **Doubling Season doubles the charge
counters** (verified oracle: *"twice that many of those counters"*); Parallel Lives does not. It is an
**enchantment**, making it the only mana source in the deck a creature wipe cannot answer.
**I had previously rejected this card as not commander-legal — that was a stale cache read, and the
grounds were void.** Corrected on the proposal artifact rather than deleted.

**Grounds for Dryad:** a second extra-land-drop that **stacks with Oracle of Mul Daya** (three lands a
turn), feeding four live landfall payoffs — Tireless Provisioner, Tireless Tracker, Scute Swarm's
self-copy at six lands, and Avenger of Zendikar. Each token then runs Academy Manufactor → Chatterfang
→ the doublers, with Mirkwood Bats pinging per token. Second line makes Gaea's Cradle tap for any
colour.

**Two pilot playtest verdicts drove the cuts, and both overrode my ranking:**

- **Chitterspitter — never cast once, across every game played.** *"Three mana for +1/+1 next turn"*
  lost every comparison to three mana of immediate value. I had flagged it as the debatable cut
  because it does three jobs (once-per-turn sac outlet that **does** trigger Mirkwood Bats, growing
  Squirrel anthem, {G} token maker). Never being cast beats all three on the only axis that counts.
- **Orcrist — worked in play, but wants a different carrier.** The pilot used it successfully several
  times; the problem is that equipping **Chatterfang** raised the commander's threat profile and drew
  removal. Cut because the deck's four kill routes need no combat step, not because the card is weak.
  It is the centrepiece if the voltron variant is ever built.

**Ninja Pizza was pulled from my cut list by the pilot**, on grounds I had not weighed: it converts
Foods that would otherwise **sit idle** into mana, so my "it competes with Camellia's forage and
Bilbo's split" objection only bites on Foods that were actually going to be foraged. Kept. This also
keeps the Ninja Pizza + Camellia + Peregrin Took combo in the list, which the pilot wants.

**Greenhouse Propagator held, not declined.** No clean third cut exists — every remaining MV-3 card is
load-bearing, and the MV-4 band is Mirkwood Bats / Parallel Lives / Second Harvest / Pitiless
Plunderer / Hazel of the Rootbloom / Oracle of Mul Daya, all of which beat a duplicate of Prosperous
Innkeeper's lifegain line. Revisit if something underperforms in play the way Chitterspitter did.

**Standing caveat carried forward:** CommanderBracket rated this fork's mana its *strongest* stat
(84/100) while win turn was the weakness (7.5). This wave makes a strong stat stronger and may measure
flat. It was worth applying because the curve is untouched and both cuts were evidence-backed.

## 2026-09-28 — Wave 9: Starscape Cleric in for Viscera Seer (one card, on purpose)

**Applied.** 100/100. avg MV 2.83 → 2.84, **MV≤2 unchanged at 27, MV≤3 unchanged at 49.**
Sacrifice Outlets 6 → 5, Drain Payoffs 11 → 12.

**The measurement that drove it:** counted from `deck.json`, the list has **15 cards that gain you
life** against only **2 that convert lifegain into life loss** (Dina, Vito). A converter multiplies
all fifteen; a sixteenth fuel source would only add one more thing for two cards to multiply. And
*"each opponent loses 1 life"* is the right shape because **all fifteen gain exactly 1 life at a
time** — on that profile it beats Vito's single-target *"that much"* threefold in a four-player pod.
Offspring `{2}{B}` **creates** a token copy that is also a converter, so Chatterfang adds a Squirrel
and Mirkwood Bats pings for both.

**Viscera Seer was the only genuinely surplus card**, because Woe Strider strictly dominates it:
free sacrifice, scry 1, **plus** a Goat on arrival, **plus** escape recursion. Five free outlets remain
alongside Chatterfang, three sacrifice lands and three sacrifice spells, and one in play is enough.

**Why this wave is one card and not three.** The pilot declined seven of my cut nominations —
**Ninja Pizza, Cultivate, Elvish Mystic, Craterhoof Behemoth, Second Harvest, Bitterblossom,
Bloodletter of Aclazotz** — and every one of those grounds held up under checking. **Three corrected
real errors in my card reading**, all now in the deck-brain ledger:

1. **Ninja Pizza** converts Foods that would otherwise sit *idle* into mana, so the
   "competes with forage/Bilbo" objection only bites on Foods actually being foraged.
2. **Cultivate** is **two** landfall triggers — *"put one onto the battlefield tapped and the other
   into your hand"* — not the "zero synergy" card I called it.
3. **Bloodletter of Aclazotz** is **counter bait and surprise lethal**, two functions no per-card rate
   analysis sees. Its condition is met constantly by 15 fuel sources, so I also broke my own ledger
   rule that *"conditional is only a real cut reason if the deck fails to meet the condition."*

Given that, forcing a second or third add meant breaking a card that works. **One add was the honest
size of this wave.** The held candidates are recorded at the top of the proposal artifact in priority
order — Enduring Vitality first — and will be revisited when play frees a slot, which is exactly how
Chitterspitter's came open (pilot reported never having cast it once).

## 2026-09-29 — Wave 10: burst seeds, Warren Soultrader, Azusa

**Applied.** 100/100, no legality or identity flags, Game Changers 1 (Gaea's Cradle). avg MV
2.84 → 2.97, **MV≤2 27 → 24, MV≤3 49 → 48**. Token Engines 11 → 15, Ramp & Mana 16 → 13, Card Draw
7 → 6, Sacrifice Outlets 5 → 5. The proposal page's projection (the parent plus every applied wave)
lands on the same 100 cards at 2.97, so the page and this list agree.

| Out | In | Section |
|---|---|---|
| Nature's Lore | Chatterstorm | Token Engines |
| Arcane Signet | Verdant Command | Token Engines |
| Carrion Feeder | Esika's Chariot | Token Engines |
| Village Rites | Deep Forest Hermit | Token Engines |
| Concordant Crossroads | Warren Soultrader | Sacrifice Outlets |
| Oracle of Mul Daya | Azusa, Lost but Seeking | Ramp & Mana |

**The play report that drove it.** Over many games the fork could not win before turn 8 to 10. The
pilot asked for more burst token creation and drain, and fewer landfall and land-fetch pieces.

**The measurement.** The curve was not the cause: 27 cards at MV 2 or less and 49 at MV 3 or less is
a fast curve. Classifying the 13 token cards plus the commander by whether they *start* a token event
or *react* to one gave **ten multipliers or splitters against six seeds**, and every seed except one
made exactly one token per turn. Avenger of Zendikar (MV 7) was the only card that made several
tokens in one turn from nothing. Three of the fork's own earlier cuts (Deep Forest Hermit, Verdant
Command, Nested Shambler) were seeds, which is why the fork got slower than the parent.

**Why the adds are seeds and not drain.** Seven per-death drains plus three converters already put a
single token death near 19 life across the table. Per-token triggers were confirmed this session
(ledger repl-011, CR 603.2c): Mirkwood Bats fires once per token created, so token count is the clock.

**Chatterstorm over Spore Swarm, measured.** On Chatterfang + Peregrin Took + Tippy-Toe + Academy
Manufactor, three storm copies (three separate events) make 42 tokens; Spore Swarm's one event of
three makes 18. Peregrin and Tippy-Toe add a fixed Food per event, so granularity multiplies them
(ledger repl-013). Official Academy Manufactor ruling: it scales with the count.

**The pilot's calls, and the grounds recorded for each:**

- **Kept Cultivate** (second time it was declined; it was already on the close-cuts list, and I
  re-nominated it anyway): *"a nice two land burst when you're struggling for lands."*
- **Kept Dryad of the Ilysian Grove.**
- **Kept Avenger of Zendikar:** *"it's expensive sure but it can pump out 16+ tokens easily."*
- **Cut Oracle of Mul Daya** because its revealed top card *"is putting a target on my back"*, and
  asked for another extra-land card in its place.
- **Cut Concordant Crossroads** for a sacrifice outlet that makes any-colour mana, and asked for more
  cards shaped like Pitiless Plunderer. Warren Soultrader answers both.
- **Chose Azusa over Druid Class** (my recommendation, which also turns each land into a lifegain
  event for the three converters).
- **Chose option 2 (Azusa in, Carrion Feeder out)** over my recommendation (no Azusa, Feeder kept).

**Azusa, measured against it before the pilot chose it.** Extra land drops only fire with a spare
land in hand. With 36 lands in 99, on the play and every normal drop made, that's 27% on turn 4, 16%
on turn 5 and 9% on turn 6; a second spare is 10%, 5% and 2%. A 40,000-game simulation (36 lands
including 2 fetchlands, Cultivate and Sakura-Tribe Elder) gave **3.7 landfall triggers over turns 3
to 8 with Dryad alone and 3.7 with Dryad + Azusa**, and 5.3 against 5.4 with one extra card drawn a
turn. Extra drops mostly move a land you'd have played next turn onto this turn. Oracle supplied the
lands from the top; Azusa and Dryad don't. The same simulation gives **Dryad's own drop about zero**
as well, so she is earning her slot on fixing and the 2/4 body. Icetill Explorer, which replays
lands from the graveyard, was the only option that moved the count (+0.5 to +0.8). Verdict on Azusa
after play.

**Carrion Feeder, measured.** I first nominated it on the grounds that Chatterfang is an outlet from
the command zone. That was overstated: his outlet costs {B} and only eats Squirrels. Counting Ashnod's
Altar, Woe Strider, Yawgmoth, Warren Soultrader, Phyrexian Tower and High Market, the chance of having
seen a free outlet by turn 4 is 54% with Feeder and 48% without. The pilot chose option 2 knowing that.

**Costs named before applying:**

- **Chatterfang + Warren Soultrader is a declared two-card chosen-N loop.** Sacrifice a Squirrel and
  pay 1 life, get a Treasure and a Squirrel back. Mirkwood Bats fires three times per loop. Any
  life-gaining death payoff makes it free. It can assemble on turn 4.
- **Concordant Crossroads out** removes the Unbeatable Squirrel Girl + Cryptolith Rite + Crossroads
  infinite the deck reviewer counted.
- **Concordant Crossroads out also means tokens made on the Craterhoof turn can't attack.** They still
  count toward X. I missed this when proposing the cut and found it while updating the gameplan.
- The external analyzer will probably read the heavier curve as slower.

**Rejected, with grounds:** Druid Class (above); Exploration (an extra drop and nothing else);
Case of the Locked Hothouse (Oracle's full text without the reveal, but MV 4 and nothing extra before
seven lands); Icetill Explorer (the best of the land cards, still under one extra trigger a game);
Phyrexian Altar (held: Soultrader took the slot and also makes a token per sacrifice); Spore Swarm (one
event, 18 tokens against Chatterstorm's 42). Pitiless-shaped near misses: Scavenger's Talent and
Kingpin, Wilson Fisk (once per turn), Golgari Germination and Blight Mound (nontoken deaths only),
Revel in Riches, Kamber and Moonstone Eulogist (opponents' creatures only), Crowded Crypt (a slow
one-shot), Ruthless Knave (mana-negative), Experimental Confectioner (a second Camellia; same loop
with Ninja Pizza and Peregrin Took). Kept after consideration as cuts: Sakura-Tribe Elder (a land
source and a free death; cutting it was part of the fork's first slowdown, ledger build-042), Vito
(weakest converter, but the pilot asked for more drain), Bilbo (the new seeds feed him: 18 → 30 on
the six-card board).

**Held for the next slot, in order:** Squirrel Nest, Enduring Vitality, Marauding Blight-Priest,
Tend the Pests, Phyrexian Altar, Essence Warden, Enduring Tenacity, Saproling Migration (the pilot
likes it but finds it expensive).

**`research/gameplan.md` refreshed** in the same pass. It still described cards cut in waves 4 to 9
(Orcrist, Ancient Greenwarden, Awaken the Woods, Mycoloth, Chitterspitter, Viscera Seer, Champion of
Lambholt) and said Vito was the only converter. Added §8d for the Soultrader loop.

## 2026-10-15 — Confirmed as the live Chatterfang list

The pilot thought they had been playing this fork all along and asked to make it the default
Chatterfang list. The export they pasted matches `main` here card for card (100 of 100, zero
differences). It differs from `decks/chatterfang` main by 15 cards in each direction. From now on
this deck is the target for Chatterfang work, and `decks/chatterfang` stays untouched as the
pre-fork record (`decks/_notes.md` updated to say so).

**Queue.** The pilot wants to start with two adds, Priest of Forgotten Gods and Pest Infestation,
and said to make no cuts yet. Nothing in `deck.json` has changed. Cuts get proposed only when the
pilot asks, with the affected role ranked first.

## 2026-10-15 (later) — Wave 11: Pest Infestation and Priest of Forgotten Gods (a trial)

**Applied as a trial.** 100/100, no legality or identity flags, Game Changers 1 (Gaea's Cradle). avg MV
2.97 → 2.92 by the tools, about 2.99 with Pest Infestation costed at 5 instead of 1. **MV≤2 24 → 26,
MV≤3 48 → 48.** Token Engines 15 → 16, Card Draw 6 → 5, Sacrifice Outlets 5 → 5.

| Out | In | Section |
|---|---|---|
| Black Market Connections | Pest Infestation | Token Engines |
| Woe Strider | Priest of Forgotten Gods | Sacrifice Outlets |

**Grounds for Pest Infestation.** Wave 10 found ten multipliers against six seeds, and every seed except
one made a single token per turn. Pest Infestation is a seed you size: X=2 is 5 mana for 4 Pests plus 4
Squirrels, X=3 is 7 mana for 6 plus 6. It is one creation event, so Mirkwood Bats and Prosperous
Innkeeper each fire per body. Each Pest that dies gains 1 life, a separate event for Dina, Starscape
Cleric and Vito (ledger dmg-028). The destroy half is "up to X", so zero targets is legal and none of
the list's own artifacts or enchantments is at risk.

**Grounds for Priest of Forgotten Gods.** A 2 MV outlet at instant speed. Tap and sacrifice two other
creatures: each target opponent loses 2 and sacrifices a creature of their choice, and you add {B}{B}
and draw a card. Two sacrifices are two deaths, so every per-death payoff fires twice. It is an edict
and not a wipe. A scan of all 100 oracle texts found no untap effect (only Hazel of the Rootbloom says
"untapped", as a cost), so it activates once per turn and creates no new loop.

**What the pilot weighed against my advice.** I nominated Azusa (for Pest Infestation) and Dryad of the
Ilysian Grove (for Priest) first, because ledger eval-058's simulation found 3.7 landfall triggers over
turns 3 to 8 with no extra-drop card, with Dryad alone and with Dryad plus Azusa. The pilot kept both:
*"azusa really helps with mana ramp"*. That is the play verdict wave 10 asked for, so the Azusa swap is
marked kept. I argued once that Black Market Connections is one of two permanents here that draw with
an empty board (the other is Sylvan Library), survives a creature wipe, makes up to four tokens a turn
for Mirkwood Bats with Chatterfang, and is one of the 12 artifact-token sources behind Marionette
Apprentice. The pilot chose the trial anyway, and it is their call.

**Costs named before applying:**

- **Outlet access.** Priest needs two other creatures and a turn to lose summoning sickness, where Woe
  Strider worked the turn it landed. The chance of having seen a no-mana outlet by turn 4 stays at 48.1%
  (6 of them in 99 cards, 10 seen), but the usable number is lower. Woe Strider and Ashnod's Altar were
  the only unlimited outlets with no mana or life cost, so that slot is now Altar alone.
- **Empty-board draw.** Card Draw drops to 5 slots. The count of cards that draw at all stays at 15
  because Priest draws a card per activation, but only once a turn and only with two spare creatures.
- **Pest Infestation reads as MV 1** in every stats tool, so the analyzer will flatter the curve.
- **Not re-measured:** the wave 10 figure of about 19 life per token death, and the 40,000-game
  simulation, which was taken from ledger eval-058 and not re-run.

**Undo rows (the pilot's rule: if the sacrifice outlets struggle, say so).**

- Woe Strider back **for Priest of Forgotten Gods**, or for Pest Infestation if the pilot would rather keep Priest.
- Black Market Connections back **for Pest Infestation**, or Azusa out for it instead (my first
  nomination, now declined).

Every `deck:edit` snapshots the replaced list to `versions/`, so an undo is one command.

## 2026-11-10 — Wave 12: Crossroads, Springleaf Parade, Twitching Doll, Black Market Connections (pilot's calls)

**Applied, four swaps, each its own `deck:edit`.** 100/100, legal and on-identity, Game Changers 1
(Gaea's Cradle). avg MV 2.92 → 2.88, MV 2 20 → 21, MV 5 4 → 3. Ramp & Mana 13 → 15, Token Engines
16 → 14, Card Draw 5 → 5.

| Out | In | Section |
|---|---|---|
| Verdant Command | Concordant Crossroads | Ramp & Mana |
| Deep Forest Hermit | Springleaf Parade | Token Engines |
| Tireless Tracker | Twitching Doll | Ramp & Mana |
| Pest Infestation | Black Market Connections | Card Draw |

**Concordant Crossroads, re-added.** Cut in wave 10 for Warren Soultrader (which stays). Haste lets
fresh tokens use Cryptolith Rite's and Springleaf Parade's `{T}` mana the turn they arrive (CR 302.6,
702.10c), lets Priest of Forgotten Gods, Circle of Dreams Druid, both elves and Twitching Doll tap the
turn they land, and lets Craterhoof-turn tokens attack, the cost wave 10 recorded. **Loop back:** The
Unbeatable Squirrel Girl + Cryptolith Rite (or Springleaf Parade) + Crossroads is unbounded Squirrels
and mana, chosen-N, assemblable on turn 4 or 5. **Cost:** every creature has haste, opponents' too.

**Springleaf Parade.** At X=3, 5 mana for three Shapeshifters plus three Chatterfang Squirrels.
Changelings count as Squirrels for Chatterfang, Camellia and Hazel, and as Squirrels and Bats for
Valley Rotcaller. Its static is a second Cryptolith Rite for tokens. The 2026-09-25 pass rested only
on summoning sickness, which Crossroads removes. Deep Forest Hermit held the same 5-mana seed slot,
leaves after three turns, and its anthem blanks Skullclamp on Squirrels. The pilot named the cost: one
fewer sacrificeable body. Tools count Parade at MV 2; its real cost at X=3 is 5.

**Twitching Doll, for Tireless Tracker (the pilot's choice between Tracker and a 1-mana dork).** The
pilot rarely cracks Clues, so Tracker was a landfall token maker, a job Tireless Provisioner already
does with tokens the pilot uses. Keeping both 1-mana dorks keeps the turn-2 Chatterfang: with two in
99 cards, one is in the opening seven 13.7% of the time, against 7.1% with one. **Cost:** Tracker's
Clue plus Squirrel per land fed Mirkwood Bats, Nadier's Nightblade and Academy Manufactor.

**Black Market Connections, back for Pest Infestation.** This ends the wave 11 trial with the undo it
recorded: *"If the draw dries up, Black Market Connections returns for Pest Infestation."* The pilot
set the draw target this session: **8 to 10 draw sources, and Clue makers never count** (*"i rarely
sacrifice clues for card draw unless i have a lot of mana"*).

### Correction: the Card Draw role drifted from 8 to 5 without anyone re-counting it

The parent list held 8 in Card Draw. Idol of Oblivion left in wave 2, Village Rites in wave 10 and
Black Market Connections in wave 11. Each wave named its own minus one, and none re-counted the role
against a target. Counted the pilot's way after this wave (no Clue makers): Sylvan Library,
Skullclamp, Moldervine Reclamation, Deadly Dispute and Black Market Connections draw directly, and
Yawgmoth and Tippy-Toe draw every turn as a side job. That's 7. Bloodline Recollector (agreed, cut
still open) makes 8. Not counted: Priest of Forgotten Gods and Peregrin Took (conditional), Plumb the
Forbidden (one-shot), the three draw lands, Ravenous Squirrel ({1}{B}{G} per card), Academy
Manufactor's Clues.

### Still open after this wave

- **Bloodline Recollector:** agreed as an add, but the pilot now keeps Deadly Dispute, so it needs a
  different cut.
- **Witch's Oven for Ravenous Squirrel** (agreed as a trial in round 2): held while the draw plan
  settled, because Ravenous is a conditional draw outlet.
- **Idol of Oblivion for Gruesome Fate:** proposed, no answer yet.
- **On hold (pilot):** Exploration for Dryad of the Ilysian Grove, Yahenni, Undying Partisan for
  Gardenize, Super Shredder.
- **Priest of Forgotten Gods trial:** verdict still open.

### Reviewed this session and passed, with grounds

- **Ygra, Eater of All:** "Other creatures" includes opponents' creatures, so every opponent gets
  *"{2}, {T}, Sacrifice this permanent: You gain 3 life"* as an instant-speed answer to a lethal
  drain. The ledger eval-046 grounds also still hold, and the list already has three loop families.
- **Krark-Clan Ironworks:** without Ygra it eats only artifacts, so no creature-death drains fire.
  Its loop (Camellia + Tippy-Toe or Peregrin + KCI) duplicates the Ashnod's Altar loop.
- **Feign Death:** not repeatable. The returned creature is a new object (CR 400.7).
- **Cauldron Familiar:** held. Good with this many Foods, but a Squirrel dying fires the same death
  triggers.
- **Exploration** (simulated, 120,000 games): with it in the opening hand, 3 lands on turn 2 in 51%
  of games, against 0% for Dryad or Azusa. Level by turn 4 (3.30, 3.28, 3.31). On hold.

## 2026-11-10 (later) — Trial: Bloodline Recollector in, Deadly Dispute out (pilot's call)

Snapshot: `versions/2026-11-10-0204-main-trial-bloodline-recollector-in-deadly-dispute-out.json`.
The pilot first said to keep Deadly Dispute, then chose the original swap as a trial: *"let me try
bloodline recollector in and deadly dispute out for a bit and see what happens."* 100/100, legal,
Game Changers 1, avg MV unchanged at 2.88 (both MV 2).

**Grounds.** Recollector becomes prepared at every end step where three or more creatures died,
opponents' turns included, and its copy of Ancestral Craving draws three for {B} and 3 life. Deadly
Dispute draws two once.

**Cost named before applying.** Draw by the pilot's rule (no Clue makers) stays at 7: Sylvan
Library, Skullclamp, Moldervine Reclamation, Black Market Connections, Bloodline Recollector, plus
Yawgmoth and Tippy-Toe. That's one short of the 8-to-10 target. Recollector is a 2/2 that dies
before its copy is cast if a wipe hits first, and each copy costs 3 life.

**Undo rows.** Deadly Dispute back for Recollector if the trial disappoints, or Dispute back for
Gruesome Fate to reach 8 while keeping Recollector (my recommended cut for that slot; Esika's Chariot
and Zulaport Cutthroat were the alternatives).

**Still open:** Witch's Oven for Ravenous Squirrel (trial agreed in round 2, held), Idol of Oblivion
for 9, Exploration, Yahenni and Super Shredder on hold, the Priest of Forgotten Gods trial verdict.

## 2026-11-10 (later still) — Trial: Witch's Oven in, Ravenous Squirrel out (pilot's call)

Snapshot: `versions/2026-11-10-0207-main-trial-witch-s-oven-in-ravenous-squirrel-out.json`. The pilot
agreed to this trial in round 2 of the review (*"maybe i'm willing to try this swap and i'll let you
know how it goes"*). I held it during the draw review because Ravenous Squirrel draws for {1}{B}{G},
then the pilot pointed out it had already been decided. Ravenous never counted toward the draw target
(it's conditional), so the hold wasn't needed. Logged as my miss.

**Grounds.** *"{T}, Sacrifice a creature: Create a Food token. If the sacrificed creature's toughness
was 4 or greater, create two Food tokens instead."* A free outlet once a turn, live the turn it lands
(an artifact). With Tippy-Toe or Peregrin Took each use makes two Foods, and Chatterfang adds two
Squirrels. Its Foods feed Camellia, Ninja Pizza and Cauldron Familiar (held). Ravenous Squirrel's
outlet costs {1}{B}{G} per sacrifice.

**Costs.** Once per turn (no untapper in the list). Loses a 1-drop Squirrel and a conditional draw
outlet. Draw by the pilot's rule stays at 7. **Undo:** Ravenous Squirrel back for Oven.

## 2026-11-10 (closing) — Idol of Oblivion declined; the draw number is an aim

- **Idol of Oblivion for Esika's Chariot: declined** by the pilot (*"nope"*). It was offered as the
  eighth draw source. Draw stays at 7 by the pilot's rule.
- **8 to 10 is an aim, not a hard floor** (pilot: *"it's not a hard floor but an aim, 8-10"*). The
  entries above that call 7 "one short of the target" should be read that way. The rule now sits in
  the root `CLAUDE.md` under Pilot preferences, for every deck.

## 2026-11-10 (after the wave) — CommanderBracket 6.1 → 7.3 is the site switching estimators

The pilot saw the speed rating go from 6.1 to 7.3 after pasting this session's list. Reproduced on
commanderbracket.app (pre-session list 6.1, current list 7.3), then read the API response the page
uses (`POST https://mtg-assistant.up.railway.app/decks/analyze-complete`) for both lists.

| | Pre-session | Current |
|---|---|---|
| Shown on the page | 6.1 (ML model) | 7.3 (rule heuristic) |
| ML estimate | 6.11 | 6.13 |
| ML uncertainty (sigma) | 0.926 | 1.011 |
| Rule heuristic | 7.2 | 7.3 |
| Interaction count | 9 | 7 |
| Deck health (mana / interaction / engine) | 66 (87 / 62 / 44) | 66 (84 / 67 / 44) |
| Ramp by turn 3 / two ramp by turn 3 | 73% / 34% | 76% / 37% |
| Combos in deck | 6 | 7 |

**What happened.** The page shows the ML model's turn while its sigma is under 1.0 and the rule
heuristic otherwise (0.999 still showed the ML number, 1.011 showed the heuristic). Neither estimate
moved more than 0.1 turns. The heuristic's +0.1 is lost cheap interaction: Pest Infestation (read as
removal) and Verdant Command (read as a counterspell) took the interaction count from 9 to 7 and
removed a −0.1 cheap-interaction bonus. The seventh combo is The Unbeatable Squirrel Girl + Cryptolith
Rite + Concordant Crossroads, already flagged in wave 12.

**Each swap scored alone** (ML sigma, then the number shown):

| Swap | Applied alone to the pre-session list | Undone alone on the current list |
|---|---|---|
| Concordant Crossroads for Verdant Command | 0.946, 6.1 | 1.034, 7.3 |
| Springleaf Parade for Deep Forest Hermit | 0.950, 6.1 | 0.996, 6.1 |
| Twitching Doll for Tireless Tracker | 0.949, 6.1 | 0.983, 6.1 |
| Black Market Connections for Pest Infestation | 0.999, 6.1 | 0.917, 6.1 |
| Bloodline Recollector for Deadly Dispute | 0.915, 6.2 | 1.042, 7.3 |
| Witch's Oven for Ravenous Squirrel | 0.926, 6.1 | 1.023, 7.3 |

**No list change.** Undoing a swap to bring the display back to 6.1 would move the model's uncertainty,
not the deck's speed. **A cost wave 12 didn't name:** Verdant Command's graveyard exile and loyalty
counter and Pest Infestation's artifact and enchantment removal both left the list. The remaining
flexible answers are Assassin's Trophy, Beast Within and Tear Asunder, and graveyard hate is down to
Bojuka Bog. Ledger: tool-023.
