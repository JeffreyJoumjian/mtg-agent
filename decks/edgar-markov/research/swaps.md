# Edgar Markov — Swap Log

Running `OUT ↔ IN` record for the 2026-08-03 rebuild. Every swap gets a reason.
Source of truth for the sideboard PDF.

Pre-rebuild snapshot: `versions/2026-08-03-pre-phase1-combo-build.md`

**Build constraints (locked this session):**
- **No infinite combos.** Both "opponent loses life → you gain life" pieces are cut permanently.
- **Bracket 3.** Up to **three** Game Changers allowed (the old notes saying "0 GC" were wrong).
- **No opponent-graveyard tracking.** Pilot's call — rules out Nighthawk Scavenger et al.

---

## Phase 1 — kill the combo, consolidate the tutors

Five swaps. This phase is a **quality upgrade, not a curve fix** — see the note at the end.

### 1. Exquisite Blood ↔ Vein Ripper
`{4}{B}` MV5 → `{3}{B}{B}{B}` MV6

**Out:** Half of the infinite. Pairs with both Sanguine Bond and Vito for an instant win, which
the table doesn't want. Removing this direction (opponent loses → you gain) kills **all four**
infinite pairings at once while letting Vito and Sanguine Bond stay — they only convert *your*
gain into *their* loss, which can't loop by itself.

**In:** Already the planned sub. A double Blood Artist on a 6/5 flier that is *itself* a Vampire
(lords, Edgar counters, Sanctum Seeker / Malakir Bloodwitch counts). Triggers on **any** creature
dying, including opponents'. Ward—Sacrifice a creature means their removal feeds our death triggers.

**Real cost:** 6 mana, triple black, into a deck already too top-heavy. Accepted because its
board-wide drain **deters opponents from casting wipes at all** — value it generates every turn
it isn't used, which no damage formula captures.

### 2. Bloodthirsty Conqueror ↔ Cathars' Crusade
`{3}{B}{B}` MV5 → `{3}{W}{W}` MV5

**Out:** The other half of the infinite (same "they lose → you gain" direction). Genuine loss —
4/6 premium lists run it, and its lifegain was a real life *floor*, which this deck now lacks.
Flagged for Phase 2 to replace that floor with lifelink bodies instead.

**In:** Pilot-tested and confirmed at the table. Edgar's eminence is a **cast** trigger, so every
Vampire spell produces **two** Crusade triggers:
1. Cast Vampire → eminence token enters → +1/+1 on the whole board
2. Vampire resolves and enters → +1/+1 on the whole board again

With **Elspeth, Storm Slayer** out, eminence makes two tokens → **three triggers per cast**.
Only 1/6 in the premium field, but Elspeth is 0/6 there — the field never tested this pairing.

**Known downsides (accepted):** zero impact the turn it lands, wipes erase the counters, and it's
the fiddliest card in the deck to track.

### 3. Diabolic Tutor ↔ Demonic Tutor  ⭐ GAME CHANGER 1/3
`{2}{B}{B}` MV4 → `{1}{B}` MV2

**Out:** Four mana to find a card and affect nothing. Weakest card in the 100. 0/6 in the field.

**In:** Same effect, **half the cost**, and the single most efficient swap available. Chosen over
Vampiric Tutor deliberately: Vampiric is card *disadvantage* (spend a card to reorder, then spend
a draw step retrieving it, and lose 2 life). Vampiric wins in cEDH where you combo off the tutor;
this is a grind deck that wants the card in hand this turn — and 2 life matters in the lifegain
races we keep losing.

### 4. Grim Tutor ↔ Herald's Horn
`{1}{B}{B}` MV3 → `{3}` MV3

**Out:** Second redundant tutor. `{1}{B}{B}` + **lose 3 life** for one card, in a deck whose life
total already has no floor. Demonic Tutor covers the role at a third of the life cost.

**In:** The structural answer to "I was always stuck with expensive cards." Vampires cost `{1}`
less — that shifts the **entire creature curve down a pip** rather than swapping individual cards.
Plus top-of-library Vampire draw, which partly replaces Champion of Dusk's card advantage.

### 5. Champion of Dusk ↔ Olivia Voldaren
`{3}{B}{B}` MV5 → `{2}{B}{R}` MV4

**Out:** Pilot's call, and correct. At 15 life, drawing X = 10 kills you. The field runs it 4/6 —
but **two-thirds of that endorsement comes from decks holding an infinite combo**, where drawing
to 5 is fine because the game ends before anyone punishes it. In a fair deck it's a liability.
The lifegain audit backs this up: this deck is **last in the field on lifelink (7 sources)**, and
its lifegain is almost all conditional (Blood Artist, Sanctum Seeker, Malakir Bloodwitch) — it
only turns on when you're *already* winning.

**In:** The deck's only **repeatable** interaction — every other answer is a one-shot spell.
`{1}{R}`: ping a creature, **it becomes a Vampire**, +1/+1 counter on Olivia. Two extra payoffs:
it makes **Olivia's Wrath** more one-sided (that's `-X/-X` to *non*-Vampires), and ping-then-steal
with `{3}{B}{B}` is a removal spell and a Control Magic on one card. A mana sink the deck lacks.

---

### Phase 1 scorecard

| | Before | After |
|---|---|---|
| Live infinite combos | 4 pairings | **0** |
| Game Changers | 0 | 1 (of 3 allowed at Bracket 3) |
| Nonland cards at MV 4+ | 21 | 20 |
| Cheap creatures (MV ≤2) | 11 | 11 |

**Honest read: the curve barely moved.** Phase 1 removes the combo and upgrades card quality, but
it cuts three 5-drops and adds a 6-drop, a 5-drop and a 4-drop back. The actual curve fix is
Phase 2 and needs cuts not yet committed (Roaming Throne, Mirkwood Bats, Pitiless Plunderer).

---

### Phase 1 amendment (same session)

**Swap 5 REVERTED at pilot's request.** Champion of Dusk is back in; Olivia Voldaren returns to
the watch list. Phase 1 is therefore **4 swaps**, not 5.

---

## Phase 2a — APPLIED

### 6. Demonic Tutor ↔ Emeritus of Woe // Demonic Tutor
`{1}{B}` MV2 ⭐GC → `{3}{B}` MV4, 5/4 **Vampire Warlock**

**Out:** Costs a Game Changer slot (1 of only 3 at Bracket 3) and $72.

**In:** *"Enters prepared. While it's prepared, you may cast a copy of its spell"* — the spell being
**Demonic Tutor** `{1}{B}`. Then: *"At the beginning of your end step, if two or more creatures died
this turn, this creature becomes prepared."* In an aristocrats deck that condition is the default
state, so it's a **repeatable** tutor — on a 5/4 Vampire body that gets lords, eminence counters,
Roaming Throne doubling, and Sanctum Seeker / Champion of Dusk counts.

**Confirmed not on the Game Changer list** (plain Demonic Tutor is), so this frees the third GC slot
for Teferi's Protection. $12 instead of $72.

**Honest trade-off:** slower to the *first* tutor — 4 mana for the body plus `{1}{B}` for the copy
(6 total) versus Demonic Tutor's flat 2. It wins over a long game, which is the game this deck plays.
The copy is **not** use-it-or-lose-it: cast it any time you could cast a sorcery while it stays prepared.

⚠️ Brand-new card. A bracket-conscious pod could argue it "is" Demonic Tutor. Mention it pre-game.

### 7. Pitiless Plunderer ↔ Master of Dark Rites
`{3}{B}` MV4, 1/4 Human Pirate → `{B}` MV1, 1/1 **Vampire Cleric**

**Out:** Non-Vampire 4-drop. Treasure-on-death is real, but Master of Dark Rites, Phyrexian Tower,
Three Tree City and the existing Ashnod's Altar all cover "convert dead creatures into mana." This
was the redundant one, and the most expensive.

**In:** `{T}`, Sacrifice another creature: add `{B}{B}{B}` (Vampire/Cleric/Demon spells only).
A **1-mana Vampire that is a sac outlet and a ritual at once** — it turns a free eminence token into
three black mana at instant speed, which also dodges targeted removal. Trades a 4-drop for a 1-drop.

---

## Phase 2b — APPLIED

Five swaps. All five OUT cards were the softest non-payoff slots.

| OUT | Exact text / why it's soft | IN | Why |
|---|---|---|---|
| **Mind Stone** `{2}` | `{T}`: add `{C}`. Vanilla rock — worst of your nine | **Urza's Incubator** `{3}` | Vampires cost `{2}` less. **Stacks with Herald's Horn → `{3}` off every Vampire.** Cost reduction beats a colorless rock |
| **Fellwar Stone** `{2}` | Adds a colour *an opponent's land* could make — gives you blue/green you can't use vs the wrong pod | **Phyrexian Reclamation** `{B}` | `{1}{B}`, pay 2 life: creature from graveyard → **hand**. Repeatable, and recasting **re-triggers eminence** |
| **Idol of Oblivion** `{2}` | `{T}`: draw, only if you made a token. Colourless, non-Vampire | **Blade of the Bloodchief** `{1}` | Any creature dies → +1/+1 counter on equipped; **two** if it's a Vampire. Counts opponents' deaths too |
| **Fracture** `{W}{B}` | Destroys artifact/enchantment/PW only — **can't hit creatures.** Generous Gift and Chaos Warp already cover it | **Warleader's Call** `{1}{R}{W}` | Team **+1/+1** *and* creature enters → 1 damage to each opponent. Impact Tremors with an anthem |
| **Oathsworn Vampire** `{1}{B}` | **Enters tapped**; graveyard recursion only if you gained life that turn. Does nothing the turn it lands | **Vampire of the Dire Moon** `{B}` | 1-drop 1/1 **deathtouch lifelink**. Turn-1 play, scales with every lord, and starts rebuilding the life floor |

**Note:** Dusk Legion Duelist was on the cut shortlist and is now a **keep** — *"whenever one or more
+1/+1 counters are put on this creature, draw a card"* turns on every turn once Cathars' Crusade
(added Phase 1) is out.

---

## Phase 3a — APPLIED (wipes, rocks, Game Changers)

### 13. Toxic Deluge ↔ Teferi's Protection  ⭐ GAME CHANGER 2/3
`{2}{B}` MV3 → `{2}{W}` MV3

**Out:** *"As an additional cost to cast this spell, **pay X life**."* It is the one wipe that attacks
the resource this deck is shortest on — wiping 4-toughness creatures costs 4 life, in a deck with no
life floor, in the pod where the pilot was stuck at 15 against lifegain decks. The other two wipes are
also simply better here: **Olivia's Wrath** hits only *non-Vampires* (one-sided), and **Meathook**
stays on the battlefield as a permanent drain engine. Two wipes is correct for a go-wide deck.

**In:** Phase all your permanents out + protection from everything until your next turn. The single
best answer to a board wipe — the pilot's stated #1 pain point ("I struggled to get back creatures I
lost to early wipes"). Also takes protection from **2 → 3**, hitting the pilot's stated floor.

### 14. Orzhov Signet ↔ Smothering Tithe  ⭐ GAME CHANGER 3/3
### 15. Rakdos Signet ↔ Charismatic Conqueror
### 16. Champion of Dusk ↔ Markov Baron

**The rock cuts, and why these two specifically.** Field adoption across 8 Edgar lists:
Sol Ring 8/8 · Arcane Signet 7/8 · Talisman of Hierarchy 4/8 · Talisman of Indulgence 4/8 ·
Ashnod's Altar 3/8 · **Orzhov Signet 2/8** · **Rakdos Signet 1/8** · Mind Stone 0/8 · Fellwar Stone 2/8.

The Signets are the weakest; both Talismans stay (half the field runs them, and they tap for
colorless *or* two colours). Rocks go **7 → 5**, the field median.

Underlying pattern: **rock count tracks curve height.** Markov's Midnight Masquerade runs 1 rock with
19 cheap creatures; Eastern Coven runs 7 with 8 cheap. As this deck's curve comes down, ramp becomes
dead weight.

**Smothering Tithe** — 5/6 field, mana engine in a 4-pod. **Charismatic Conqueror** — the
highest-adoption card the deck was missing (5/6); a lifelink 2-drop that makes tokens off opponents'
own development. **Markov Baron** — 4/6; lord + lifelink, and **convoke** means it routinely costs
one real mana on a wide board.

**Champion of Dusk out:** the draw-to-X-lose-X liability the pilot flagged from a real game (at 15
life, X=10 kills you). Field runs it 4/6, but two-thirds of that endorsement comes from decks holding
an infinite combo, where drawing to 5 is safe because the game ends first.

### Purphoros — REVERSED, stays in

Field adoption is 1/8, which on the raw number says cut. The number is misleading: the only deck that
runs it (*Need I Say More?*) is also the only one running the full ETB-damage package
(Impact Tremors + Warleader's Call + Purphoros) — which is the package this deck now has.

More importantly, **Elspeth is 0/6 in the field**, so no sampled deck gets Purphoros's real output.
With Elspeth out, one Vampire cast = 2 eminence tokens + the Vampire = **three creatures entering** =
6 from Purphoros to *each* opponent (18 to the table); with Tremors and Warleader's Call, 12 each /
36 total. It's also **indestructible**, surviving our own Meathook and Olivia's Wrath, and below red
devotion 5 it isn't a creature at all — dodging creature removal.

### Also confirmed keeps (pilot's call, both correct)
- **Roaming Throne** — my "misses eminence entirely" was wrong. It misses eminence only while Edgar is
  in the **command zone**; once Edgar is on the battlefield he is "another creature you control" of the
  chosen type, so eminence gives **two** tokens per Vampire spell and his attack trigger puts **two**
  counters on every Vampire. Plus it doubles Sanctum Seeker, Blood Artist, Cruel Celebrant, Malakir
  Bloodwitch, Twilight Prophet, Vein Ripper, Cordial Vampire and Bloodletter. Ward {2}.
- **Mirkwood Bats** — *"whenever you create **or sacrifice** a token"* is singular, so it's **per token,
  on both ends**. Create + sac = 2 hits; Elspeth doubles the creates.
- **Bloodletter of Aclazotz** — doubles all opponent life loss on your turn, multiplying every drain.
- **Impact Tremors alongside Warleader's Call** — the field runs these as an all-or-nothing package:
  4 decks run 2+, 3 run zero, **none run exactly one**. Purphoros is the third piece.

---

## Phase 3b — APPLIED (interaction trim → draw)

Field interaction medians across 8 Edgar lists: **removal 5 · protection 1.5 · wipes 2.5 · total 9.5.**
Deck was at 6/3/2 = 11, i.e. ~1.5 slots of genuine surplus. Took 2, not the 4 originally floated.

### 17. Clever Concealment ↔ Plumb the Forbidden
`{2}{W}{W}` → `{1}{B}`

**Out:** Protection 3 → 2, still above the 1.5 median. Teferi's Protection does the same job strictly
better, and Akroma's Will is dual-mode (protection **or** a flying double-strike alpha strike).
Concealment was the pure-redundancy slot.

**In:** *"Sacrifice one or more creatures, copy this spell for each"* — in response to a wrath, sac the
board and draw 6-8. Converts anti-wipe from "save the board" to "cash it in," and unlike Teferi's it
also beats **exile-based** wipes.

### 18. Terminate ↔ Scheming Silvertongue // Sign in Blood
`{B}{R}` → `{1}{B}`, 1/3 flying **lifelink** Vampire Warlock

**Out:** Creature-only removal; Swords and Path cover that role. Removal 6 → 5, exactly the median.
Generous Gift and Chaos Warp stay as the catch-alls — they cover different failure modes
(Gift *destroys*, which fails vs indestructible; Chaos Warp *shuffles away*, which doesn't).

**In:** *"At the beginning of your second main phase, if you gained 2 or more life this turn, this
creature becomes prepared"* → cast a copy of **Sign in Blood** (draw 2, lose 2). Same mechanic as
Emeritus of Woe. With 11 lifelink sources plus Blood Artist / Cruel Celebrant / Sanctum Seeker / Vito
/ Malakir Bloodwitch / Meathook, the condition is met nearly every turn. **A repeatable draw-2 on a
$1 cheap flying lifelink Vampire** — hits cheap-creature count, lifelink and draw at once.

## Phase 3c — APPLIED

### 19. Impact Tremors ↔ Florian, Voldaren Scion
`{1}{R}` → `{1}{B}{R}`, 3/3 first strike **Vampire Noble**

**Out (pilot's call):** ETB-damage package 3 → 2. Tremors was the weakest of the three — pure damage,
where Warleader's Call adds a team anthem and Purphoros deals **2** and is indestructible. Cost:
damage per creature entering drops 4 → 3 per opponent, so one Vampire cast with Elspeth out goes from
36 to 27 table damage.

**In:** *"At the beginning of each of your postcombat main phases, look at the top X cards, where X is
the total amount of life your opponents lost this turn. Exile one, you may play it this turn."*
X counts life lost across **all** opponents combined — routinely 8+ in this deck. A 3-drop Vampire
(eminence, lords, Roaming Throne, Sanctum Seeker counts) with first strike.

⚠️ Use-it-or-lose-it: you must have mana available in your postcombat main to play the exiled card.

---

## Phase 4 — MANABASE, APPLIED (8 swaps, lands stay at 36)

### The finding that drove it

Counting **coloured pips against sources** exposed a mismatch nobody had checked:

| Colour | Pips in deck | Sources before |
|---|---|---|
| **Black** | **56** | 25 |
| White | 20 (2 cards need `WW`) | 23 |
| Red | **8** (all single-pip, mostly 3-drops) | 19 |

Red was a **splash being over-supported** — 7 lands pulling for it (3 Mountain + 4 W/R) against 8
single pips. Black was starved: 56 pips, and the deck runs `{1}{B}{B}{B}` Bloodletter and
`{3}{B}{B}{B}` Vein Ripper.

Two lands were also quietly dead weight: **Secluded Courtyard** and **Unclaimed Territory** say
*"spend this mana only to cast a creature spell."* Fine when the deck was creature-dense; the deck now
has **30 noncreature cards**, so they were colourless for half the list.

### The swaps

| OUT | IN | Why |
|---|---|---|
| Secluded Courtyard | **Urborg, Tomb of Yawgmoth** | Creature-only mana → every land is a Swamp. **Black 27 → 42**, and it turns every colourless utility land into a black source |
| Unclaimed Territory | **Cavern of Souls** | Creature-only, but strictly better: any colour for Vampires **and uncounterable** |
| Exotic Orchard | **Savai Triome** | Depends on *opponents'* lands → reliable W/B/R |
| Nomad Outpost | **Phyrexian Tower** | Always-tapped triland → free **sac outlet** + `{B}{B}` |
| Mountain | **Ancient Tomb** ⭐ **GC 3/3** | 8 red pips didn't need 3 Mountains → `{C}{C}` off one land |
| Mountain | **Vault of the Archangel** | → `{2}{W}{B}`: team gains **deathtouch and lifelink**. Life-floor fix that costs no spell slot |
| Plains | **Vault of Champions** | W/B bond land (untapped with 2+ opponents = always, in EDH) |
| Plains | **Luxury Suite** | B/R bond land — helps black *and* the red splash |

### Result (verified, not estimated)

| | W | B | R | colourless | always-tapped | basics |
|---|---|---|---|---|---|---|
| Before | 23 | 25 | 19 | 0 | 3 | 13 |
| **After** | **21** | **27** *(42 w/ Urborg)* | **16** | 2 | 3 | **9** |

Karsten's guide for a 99-card deck: a single pip on a 3-drop wants ~16 sources. Red lands **exactly**
on target rather than under it. Two rejected variants for the record: cutting Spectator Seating
instead of a Plains left red at 15; cutting Path of Ancestry left white at 20.

⚠️ **Ancient Tomb costs 2 life per activation** — the same objection raised against Necropotence and
Bolas's Citadel. It's affordable where those weren't (2 life for 2 mana a few times a game, vs 10-20),
and lifelink is now 11 rather than 7 — but it is a real cost in a deck that lost to lifegain races.

### Phase 4b — big-mana package (pilot's call), APPLIED

| OUT | IN | Why |
|---|---|---|
| **Mountain** (the last one) | **Cabal Coffers** | `{2}`,`{T}`: add `{B}` per Swamp. With Urborg online every land is a Swamp → ~`{B}`×36 |
| **Plains** | **Three Tree City** | `{2}`,`{T}`: mana equal to your Vampire count, in any one colour |

**Why the Mountain went and not something else.** Every variant that cut the Mountain dropped red
below the 16-source target — it was a genuine trade, not a free cut. Chose to spend red rather than
white: the deck has ~13 white cards including two that need `{W}{W}` (Cathars' Crusade, Elspeth),
versus **7 red cards, all single-pip and none needed early**. Red 16 → 15 is a rounding error on a
single pip; white 21 → 19 is not.

Variants rejected: cutting Bojuka Bog kept W at 21 but gave up graveyard hate, which matters against
the Sephiroth/recursion deck in this pod. Cutting Tainted Field looked tempting but it is *better*
than a basic Plains whenever you control a Swamp (which, with 5 Swamps + Urborg, is nearly always).

**Final manabase:** 36 lands · W 20 / B 28 (42 with Urborg) / R 15 · **7 basics** (2 Plains, 5 Swamp,
0 Mountain) · 3 always-tapped · 3 bare-`{C}` lands.

⚠️ **Cost of the big-mana pivot:** bare-`{C}` lands went 2 → 3 (Ancient Tomb, Vault of the Archangel,
Three Tree City) and Cabal Coffers needs `{2}` before it does anything. This raises the ceiling a lot
and lowers the floor — more clunky opening hands. **Urborg mitigates all of it** (every one of those
becomes a Swamp), which makes Urborg the most important land in the deck and a real target: without
it, black reads 28 for a deck with 56 black pips.

### Phase 4c — manabase corrections (pilot's call, both right), APPLIED

| OUT | IN | Why |
|---|---|---|
| **Swamp** | **Mountain** (restored) | Funding Cabal Coffers off the *only* Mountain left red at 15, below target. Paying with a Swamp instead puts red back on **16**. Cost is trivial: Coffers counts Swamp-**typed** lands, which drops 8 → 7, and Urborg makes all 36 Swamps anyway |
| **Battlefield Forge** | **Nomad Outpost** (restored) | Deck had **four** W/R lands for a colour with 8 single pips, and Forge was a *painland* on top. Nomad adds **black** (the starved colour) at the same W/R output, and drops pain sources 7 → 6 |

Two things the re-audit turned up that had been missed:
- **Savai Triome is typed `Plains Mountain Swamp`** — it was already enabling Clifftop Retreat,
  Dragonskull Summit and Blazemire Verge, *and* counting for Cabal Coffers. Real Swamp-typed count
  was 8, not 5.
- **Seven pain sources** in the manabase (Ancient Tomb, 3 shocks, Caves of Koilos, Battlefield Forge,
  Sulfurous Springs) plus Castle Locthwain — a lot of self-inflicted damage for a deck that keeps
  losing life races. Cutting Battlefield Forge takes it to 6. Worth watching if more get added.

**Final manabase:** 36 lands · **W 20 / B 28 (42 with Urborg) / R 16** · 7 basics (2 Plains, 4 Swamp,
1 Mountain) · 4 always-tapped · 3 bare-`{C}` · 6 pain.

### Phase 4d — APPLIED

### 20. Talisman of Indulgence ↔ Patchwork Banner
`{2}` → `{3}`

Not about wanting a 10th anthem (the deck already has 9). Driven by **pain and fixing**: the Talisman
deals 1 damage for coloured mana and only makes `{B}`/`{R}`; Patchwork Banner taps for **any colour,
painlessly**, and pumps all Vampires. Result: **white sources 20 → 21, pain sources 9 → 8**, red held
at 16. Cost is one turn of speed — acceptable now that Sol Ring, Arcane Signet and Talisman of
Hierarchy cover early ramp and Herald's Horn + Urza's Incubator take `{3}` off every Vampire.

### FETCHLANDS — evaluated and REJECTED (none added)

Marsh Flats / Arid Mesa / Bloodstained Mire / Prismatic Vista were all considered and **none are in
the deck**. Reasons:
- **Pain.** The real count is **9 sources**, not the 6 first reported (that number was lands only; it
  misses both Talismans and Phyrexian Reclamation). Three fetches would make it 12, and a fetch into
  an untapped shock is **3 life for one land** — in the deck that came here because it lost life races.
- Every standard reason to fetch fails: colour fixing is already on target (W21/B28/R16), deck-thinning
  is ~1% noise in singleton, there are **no landfall payoffs**, and the only shuffle effect is Emeritus.
- ~$80 in proxies for a change that is marginal at best and probably negative.

If a Swamp-fetcher is ever wanted for Urborg/Cabal Coffers, **Fabled Passage ($1, no life cost,
untapped with 4+ lands)** is strictly correct here over a $33 Marsh Flats.

---

## Phase 5 — VAMPIRE MATRIX VALIDATION + rules findings

Ran all **66 candidate Vampires** from the 8-deck sample against the deck's 33, comparing only within
MV ±1. **Result: 65 of 66 failed.** Every in-deck Vampire is confirmed best-in-slot except one.

- **MV1 (5) — all confirmed.** Candidate pool genuinely weak; Vampire Cutthroat is a worse Vampire of the Dire Moon.
- **MV2 (9) — all confirmed.** Strongest band; 23 candidates, none close. Gifted Aetherborn and Bloodghast were the only real contenders and both fail the "does it trigger?" test.
- **MV3 — 8 of 9 confirmed.** Drana was the one soft slot.
- **MV4 (7) — all confirmed decisively.** Three candidates had active anti-synergy: Strefan (puts Vampires onto the battlefield, **bypassing the cast → no eminence**), Fumulus (makes *Insects*, which miss every lord and Sanctum Seeker), Baron Bertram (worse draw rate than what's in).
- **MV5–6 (2) — confirmed** over all 13 top-end candidates.

### 21. Drana, Liberator of Malakir ↔ Marauding Blight-Priest
`{1}{B}{B}` MV3 → `{2}{B}` MV3, 3/2 **Vampire Cleric**

**In:** *"Whenever you gain life, **each** opponent loses 1 life."* Verified with the rules engine —
**CR 702.15e**: *"If multiple sources with lifelink deal damage at the same time, they cause separate
life gain events."* It counts **sources, not life points**:
- Wipe with Blood Artist + Cruel Celebrant out, 3 creatures die → **6 separate life-gain events → 6
  triggers → 6 to each opponent → 18 to the table**
- Alpha strike under Vault of the Archangel with 6 attackers → **6 more triggers**
- Doubled by Bloodletter on your turn, doubled again by Roaming Throne

Complements Vito rather than duplicating: Vito hits **target** opponent, Blight-Priest hits **each**.
Combo-safe — it triggers on *you* gaining life, and nothing left in the deck turns opponent life loss
back into your gain.

**Out:** Drana is the only card in the MV1–3 band whose payoff needs combat damage to **connect**;
everything else pays on declaration or on death. Cost: losing a 2/3 flying first-striker.
⚠️ If Blight-Priest dies in the same wipe it triggers **zero** times.

**Drana → sideboard**, held for a possible MV ±1 swap later.

### 22. Skullclamp ↔ Deadly Dispute
`{1}` → `{1}{B}`

**The rules finding that forced it.** Verified against CR 611.3c / 603.6b: a token **never exists on
the battlefield unmodified** — anthems apply *simultaneously with* it entering. So a clamped token's
toughness = *(applicable anthems) + (counters)*, and it only dies at 0:
- 1/1 token, no anthem, clamped → **2/0**, dies, draw 2 ✅
- 1/1 token, **any** anthem, clamped → **3/1**, lives, no draw ❌

The deck runs **7 anthem effects** plus Vampire Socialite. Worse — **Warleader's Call, added this same
session, pumps *all* creatures**, so it shuts Skullclamp off even on non-Vampire tokens the
Vampire-only lords would have missed. A conflict this rebuild created.

**In:** Sacrifice an artifact or creature; **draw 2 and create a Treasure**. Anthem-independent —
it converts the now-oversized eminence tokens into cards regardless of their stats.

### Welcoming Vampire — KEPT, and the earlier warning was overstated

The threshold is *"power **2 or less**"*, so with **exactly one anthem** the token enters as a 2/2 and
Welcoming Vampire **still triggers**. It only breaks at the second anthem.

| Board | Token enters as | Draws? |
|---|---|---|
| No anthem | 1/1 | ✅ |
| **One anthem** | **2/2** | ✅ |
| Two anthems | 3/3 | ❌ |
| Vampire Socialite active + one anthem | 3/3 | ❌ |

- **Cathars' Crusade is safe** — a *triggered* ability, so its counters land after the power check.
- **Vampire Socialite is the trap** — "enters with an additional +1/+1 counter" is a **replacement
  effect** (CR 614.1d), applied before the check, and its condition is live on nearly every turn here.

### CLOSE calls left on the table (not applied)
Preacher of the Schism over Stromkirk Captain (anthem-independent repeatable draw; also *reduces*
anthem count, which helps Welcoming Vampire) · Bloodghast · Qarsi Revenant · Ruthless Lawbringer ·
Mavren Fein · Olivia Voldaren.

### Still on the manabase watch list
**Cabal Coffers** (now genuinely good with Urborg online — `{2}` for ~10 black), **Three Tree City**,
**Karn's Bastion**, and the fetches (Marsh Flats, Arid Mesa, Bloodstained Mire). All would need
further land cuts; the deck is at a sane 9 basics and shouldn't go much lower.

### Cheap-creature suite audited — no fat to trim
- **Cordial Vampire** `{B}{B}` — *"this or **another creature** dies"* = **any** creature incl.
  opponents', counters up **every** Vampire.
- **Nullpriest of Oblivion** `{1}{B}` — lifelink + menace, and kicker `{3}{B}` **reanimates**. Recursion #2.
- **Indulgent Aristocrat** `{B}` — lifelink **and** a sac outlet that pumps all Vampires.
- **Vampire Socialite** — every other Vampire **enters with an extra counter**, permanently.

---

## Phase 2 — original notes (superseded above)

Target: cheap creatures 11 → 16-17, MV4+ 20 → ~15, and rebuild the life floor that
Bloodthirsty Conqueror was providing — using cheap lifelink bodies that fix both at once.

Candidate cuts (pending pilot decision):
- **Roaming Throne** — 0/6 field, priciest nonland ($53), and **misses eminence entirely**
  (a command-zone ability, not a Vampire's triggered ability)
- **Mirkwood Bats**, **Pitiless Plunderer** — non-Vampire 4-drops, both 0/6 field

Candidate adds (all field-validated, all ≤ MV3, lifelink marked ♥):
- Charismatic Conqueror `{1}{W}` ♥ — 5/6 field
- Markov Baron `{2}{B}` ♥ — 4/6 field, **convoke** so it often costs 1 real mana
- Vampire of the Dire Moon `{B}` ♥ — 3/6 field
- Gifted Aetherborn `{B}{B}` ♥ — 2/6 field
- Mavren Fein, Dusk Apostle `{2}{W}` — makes lifelink tokens on attack
- Vault of the Archangel — a **land** that grants the team lifelink + deathtouch; free roll
- Marauding Blight-Priest `{2}{B}` — Vampire; combo-safe now that Exquisite Blood is gone

Ruled out: **Nighthawk Scavenger** (requires tracking opponents' graveyards), **Kalastria
Highborn** and **Vraan** (rejected — see decisions.md).

## Phase 3 — Game Changers + manabase (NOT YET APPLIED)

GC slots 2 and 3 of 3: **Smothering Tithe**, **Ancient Tomb**.
Teferi's Protection skipped — with a tutor in the deck, Clever Concealment is enough (pilot's call).
Lands: Cavern of Souls, Three Tree City, Urborg, Savai Triome, Luxury Suite, Vault of Champions,
fetches. Watch **colored sources**, not basic count — currently W 26 / B 29 / R 22; don't let red
fall below ~20.
