# Inquisitor Greyfax — Decision Log

Append-only. Never rewrite an entry; add a dated one below it. Record **grounds, not verdicts** —
the next reader's job is to re-derive (deck-brain §1.1b), and grounds are what let them.

---

## 2026-09-02 — Deck founded: Esper tap/untap

**Brief from the user:** a deck whose whole engine is tapping and untapping — their creatures and
mine — converting taps into mana, cards, abilities, destruction and ideally exile. Commander
chosen purely on fit, no flavour constraint. Bracket 3, no two-card infinite combos.

### Commander: Inquisitor Greyfax over Hylda, Derevi and a 4-colour pair

**Grounds — commander self-sufficiency.** Ranked by *"what does this card do next turn, alone,
with no other card?"*:

| | Alone | Verdict |
|---|---|---|
| **Inquisitor Greyfax** | `{1}, {T}: Tap target creature an opponent controls. Investigate.` — taps and draws, every turn, needing nothing | Complete engine |
| **Derevi, Empyrial Tactician** | ETB tap/untap once per deployment; the repeatable trigger needs a creature to connect in combat | Combat-gated |
| **Hylda of the Icy Crown** | *Nothing.* Her text is "whenever **you tap** an untapped creature an opponent controls" — she contains zero ability to tap anything | Pure payoff, 3/4 vanilla alone |

Greyfax's second line is not filler: *"Other creatures you control get +1/+0 and have vigilance."*
In a deck where untapped creatures are a **spent resource** (Opposition's cost is "tap an untapped
creature you control"), vigilance means the team attacks *and* stays available as fuel.

**Grounds — Esper strictly contains Azorius.** Every card in a Hylda WU build is legal in a Greyfax
Esper build; Hylda simply goes in the 99. Commanding with Hylda would have *excluded* Greyfax and
all of black. The choice therefore reduced to "is the third colour worth it", and black is what
supplies the destruction/exile-on-tap the brief asked for.

**Rejected — 4- and 5-colour.** Swept `id>=wubg` for every tap/untap wording: exactly two hits.
[Najeela, the Blade-Blossom] is extra-combats Warrior tribal; [Urtet, Remnant of Memnarch] untaps
**Myr** only. Five colours adds nothing — [Sisay, Weatherlight Captain]'s tutor is `{W}{U}{B}{R}{G}:`
with **no {T} in the cost**, so untapping her does nothing. The only real 4-colour route is the
Partner pair [Kydele, Chosen of Kruphix] + [Tymna the Weaver] (neither is a Game Changer, so it is
Bracket-3 legal), but **neither partner taps an opponent's creature** — it pays a four-colour
manabase to give up the repeatable commander engine, which is the exact weakness that ruled out
Derevi.

### Green was costed out, not hand-waved

Green's *unique* contribution to this specific deck is three cards, and two of them are worse than
they look:

- **Seedborn Muse is a Game Changer** (verified against the 54-card list). At Bracket 3's 3-GC cap
  it would consume a third of the budget, competing with Rhystic Study / Smothering Tithe /
  Cyclonic Rift.
- **Murkfiend Liege untaps only *green and/or blue* creatures.** It would not untap Icy Manipulator,
  Hylda's Crown of Winter (colourless artifacts) or any black assassin. In a deck whose tappers are
  mostly artifacts it untaps a fraction of the board. (deck-brain §1.3 — check the card against your
  own board.)
- **Glare of Subdual** is a real loss: a second Opposition. Accepted.

Everything else green offered has a colourless analogue already in the deck: Unwinding Clock,
Clock of Omens, Thousand-Year Elixir, Magewright's Stone, Manifold Key, Puppet Strings,
Staff of Domination.

**The replacement for Seedborn Muse is Unwinding Clock** — *"Untap all artifacts you control during
each other player's untap step."* In this deck the tappers **are** artifacts, so Icy Manipulator,
Hylda's Crown of Winter and Staff of Domination fire on all four turns of the rotation instead of
once. It is not a Game Changer, so it costs nothing against the bracket budget.

Net trade: **2 green cards (one of them GC-taxed) for ~10 black ones** that do the thing the brief
asked for.

### Deciding axis (deck-brain §2.3)

**What tapping is *for*.** Green builds the better **lock** — tap the board every turn and never
let go. Black builds the better **execution** — tapping is how things die and get exiled. The brief
named destruction and exile three times. Black.

### Field signal (deck-brain §2.2)

EDHREC: "Tap / Untap" is a named archetype. **Hylda of the Icy Crown** is its home — 567 of 12,404
decks. **Derevi** has a near-identical deck count (11,827) but only **179** tap/untap decks; the
field plays her as Bant pod/stax. Greyfax has 2,590 decks, only 13 tagged tap/untap — so this build
is **personal tech, not a consensus line**. Per the field-signal thresholds that means judge on
merit rather than auto-trusting or auto-cutting; the merit case is the self-sufficiency table above.

---

## 2026-09-02 — Individual calls worth their grounds

### Swiftfoot Boots, NOT Lightning Greaves

**Grounds:** Greaves grants **shroud**, which stops *you* targeting your own commander. This deck
targets its own Greyfax constantly — Magewright's Stone (`{1},{T}: Untap target creature that has
an activated ability with {T} in its cost`) and Minamo (`{U},{T}: Untap target legendary permanent`)
both **target**. Greaves would switch off the deck's own untap engine on its most important
creature. Boots grant hexproof, which only restricts opponents. (Same shape as the Whispersilk
Cloak mistake in deck-brain §1.3.) Boots' haste also matters: Greyfax's `{T}` ability is unusable
the turn she lands without it (CR 107.5).

### Sunblast Angel is a sequencing card, not a free one-sided wipe

**Grounds:** it destroys **all** tapped creatures, yours included. Greyfax's team vigilance means
attacking doesn't tap your board — but **Opposition's cost taps your own creatures**, and several
of your creatures tap for their own abilities. It is one-sided only if you cast it *before*
spending your untapped creatures that turn. Written into gameplan.md rather than assumed away.

### Cards rejected, with grounds

| Card | Grounds for rejection |
|---|---|
| **Meekstone** | *"Creatures with power 3 or greater don't untap during their controller's untap step"* is symmetric. It would lock Hylda's own 4/4 Elemental tokens, Elesh Norn, Junk Winder and Ethersworn Adjudicator. Held for the B4 variant where the lock is worth the self-hit. |
| **Ramses Overdark** | `{T}: Destroy target **enchanted** creature.` The deck runs no Auras, so it has zero targets on an average board. |
| **Hunter of Eyeblights** | `{T}: Destroy target creature with a **-1/-1 counter** on it.` No -1/-1 counter enabler in the list. Same failure as Ramses — a conditional that this deck never turns on. |
| **Avatar of Woe** | Unconditional `{T}: Destroy target creature` is exactly right, but {6}{B}{B} with a reduction that only keys off creatures in graveyards is unreliable at Bracket 3 speed. Visara at {3}{B}{B}{B} does the same job three mana sooner. Genuinely close — revisit if the curve proves too low. |
| **Sleep** | Taps only **one target player's** creatures. Blustersquall's overload (`{3}{U}`) taps *each* creature you don't control, i.e. all three opponents, for one mana more. |
| **Lightning Greaves** | See above — shroud turns off the deck's own untappers. |
| **Paradox Engine** | **Banned in Commander.** (Checked, not assumed — it surfaced in a search and would have been an easy include.) |

### Combos deliberately excluded to hold Bracket 3

Recorded so the future B4 variant has its swap list ready, and so nobody re-adds them by accident:

- **Intruder Alarm** + any repeatable creature-token maker → infinite untaps.
- **Freed from the Real** / **Pemmin's Aura** on any creature that taps for 2+ of its own colour.
- **Dramatic Reversal** + rocks producing 3+ → infinite mana with any outlet.
- **Staff of Domination** *is* in the deck — it is only a combo with a creature that taps for 5+
  mana, and the list contains none. If one is ever added, Staff becomes a two-card infinite and the
  deck leaves Bracket 3. **Check this before adding any big mana creature.**

---

## 2026-09-02 — Manabase pass: +Urborg, +Reflecting Pool, −1 Swamp, −1 Island

**Prompted by:** "shouldn't we be running Urborg?"

**Grounds — counted the pips before answering.** Source counts from the cached card data, not by eye:

| Colour | Land sources (of 36) | Double-pip cards | Hardest cast |
|---|---:|---:|---|
| **White** | **17** ← fewest | **4** | Sunblast Angel `{4}{W}{W}`, Elesh Norn `{5}{W}{W}` |
| Blue | 19 | 5 | Opposition `{2}{U}{U}` |
| Black | 18 | 3 | Visara `{3}{B}{B}{B}` |

So the intuitive case for Urborg — "black is hard, Visara is `{B}{B}{B}`" — pointed at the **wrong
colour**. Urborg takes black 18 → 36 and white 17 → 17. White was the actual bottleneck: fewest
sources *and* four double-pip cards.

**Why Urborg went in anyway — the real argument.** Its value in a three-colour deck is not "more
black", it's that it **rescues dead-for-colour lands and then frees the basics**. Eighteen lands
produced no black at all, including three that produce no colour whatsoever (Academy Ruins,
Karn's Bastion, Rogue's Passage). Once black is oversupplied, the Swamps stop earning their slots —
and *that* is where the white fix gets bought. Urborg is a land-slot liberator here, not a fixer.

**The swap:** `−1 Swamp, −1 Island` → `+1 Urborg, Tomb of Yawgmoth, +1 Reflecting Pool`.

**Result (measured after the change):** W 17→**18**, U 19→**19**, B 18→**19**, and B → **36**
whenever Urborg is on the battlefield. Every colour is level or better; nothing regressed.

**Deliberately kept 2 Swamps.** Cutting both would have made the deck's black depend on a single
nonbasic land surviving. With two Swamps left, black floors at 19 sources if Urborg is answered
or never drawn.

**Rejected — Urborg alone (no fixer).** Would have left white at 17, the actual constraint,
untouched. **Rejected — fixer alone (no Urborg)** at $15 vs $56: defensible on price, but gives up
turning the three colourless utility lands into black sources.

**Cost:** deck total $593.65 → **$665.32**. Urborg ($56.18) is now the third-priciest card and a
💰proxy candidate; the swap is close to free if proxying.

**Correction logged:** when proposing the swap I predicted the result would be "W 18 · U 19 · B 17".
Actual is **B 19** — I forgot that Urborg and Reflecting Pool are each themselves black sources.
The prediction was pessimistic, so it didn't change the call, but the number was wrong.

---

## 2026-09-02 — Closer pass, part 1: measuring the kill

**Prompted by:** "uhm how do we win with this deck?"

**Grounds — measured the board, didn't estimate it.** Pulled power/toughness for all 28 creatures:
**69 total power**, and **12 creatures at power ≤ 2** (Royal Assassin 1/1, King's Assassin 1/1,
Merieke 1/1, Stalking Assassin 1/1, Esper Sentinel 1/1, Fatestitcher 1/2, Mirran Spy 1/3, Vizier
1/3, Spider-Woman 1/4, Kelpie Guide 2/2, Gideon's Avenger 2/2, Court Street Denizen 2/2). A
realistic seven-creature board is ~14 power against **120 life** across three opponents — roughly
nine unopposed swings.

**Finding: the founding skeleton under-built the closer.** Three Win Conditions slots was too few,
and the original gameplan line ("their board is tapped, yours attacks") was optimistic about a
board made mostly of engine parts. Corrected in `gameplan.md`. Win Conditions raised **3 → 4**,
Theme/Synergy **26 → 25**.

### +Unstoppable Plan, −Manifold Key

**Grounds:** Unwinding Clock untaps **artifacts only** (22 in the deck) and the entire execution
package is **creatures** (28). Unstoppable Plan — *"At the beginning of your end step, untap all
nonland permanents you control"* — covers both, once per round, at exactly the right timing:
your board refills for the three opponents' turns, which is when Royal Assassin and Greyfax want
to be live. Manifold Key untaps artifacts only, which Unwinding Clock and Clock of Omens already
cover twice over; its unblockable mode is marginal. Not a combo risk — a once-per-turn trigger
cannot loop, so Bracket 3 is unaffected.

**Consequence to pilot around:** Unstoppable Plan untaps Merieke Ri Berit every end step, which
*mandatorily* fires her "destroy that creature" trigger. That is the removal loop on autopilot,
but it means a stolen creature can never be kept or attacked with.

### +Revel in Riches, −Mirran Spy

**Grounds:** it converts the engine already in the deck into a win condition. Eleven cards kill
opponents' creatures, so every assassin activation makes a Treasure; Smothering Tithe's Treasures
count toward the same ten; and each Treasure entering triggers Junk Winder → a tap → Hylda /
Verity Circle. Verified **not** a Game Changer, so the 3/3 bracket budget is untouched. Mirran Spy
was the weakest untapper once Unstoppable Plan covered creature-untapping.

**Counter-argument accepted (user's):** *"it's most likely gonna get countered or removed
immediately."* Correct — a card reading "you win the game" is a lightning rod, and 10 Treasures is
a multi-turn telegraph. The card is therefore filed and played as a **Treasure engine first,
alt-win second**: its floor (ramp + Junk Winder triggers) is what justifies the slot; the win is
upside. Protection that actually works on it: **Clever Concealment** (phases out nonland
permanents), **Swan Song**, **Counterspell**. **Flawless Maneuver does not** — indestructible is
creatures-only.

**Open — closer pass, part 2.** Because Revel telegraphs, the deck still wants a **hidden**
finisher that lives in hand and cannot be pre-emptively answered. Leading candidate is
**Debt to the Deathless** (`{X}{W}{W}{B}{B}`, each opponent loses 2X), which also *converts the
Treasures* if Revel is answered before it reaches ten. Not yet added — needs a cut identified.

### Correction logged

Rated **Unwind** as "4 mana" when the card tool output on screen read `{2}{U}` — mana value **3**.
The user caught it. Re-derived at the correct cost: with "untap up to three lands" it is
mana-neutral, i.e. effectively a free counterspell that leaves the `{1}` activations (Hylda's
payment, Greyfax, Icy Manipulator) online on an opponent's turn. That moves it from "no" to a
legitimate include, still behind Counterspell because it cannot hit creatures. Not added — no cut
identified yet.

---

## 2026-09-02 — Closer pass, part 2: the archenemy problem (9 in / 9 out)

**Prompted by:** *"i think im gonna get taken out and become the table arch enemy real quick"* and
*"we can't rely on 1 big creature… we need to be able to finish multiple ways."*

### The diagnosis that drove everything

**This deck's threat profile peaks ~6 turns before its clock does.** It taps everyone's board, kills
a creature per turn cycle, and plays a permanent reading "you win the game" — while dealing zero
damage. Maximally scary, minimally lethal, which is the worst political position in Commander.
"How do we win" and "how do we survive" therefore have the same answer.

### Correction: I measured power and drew the wrong conclusion

Part 1 recorded 69 total power with 12 creatures at power ≤2 and concluded combat was weak. **That
conclusion was wrong.** Small creatures are irrelevant when nothing can block. Realistic turn-8
board: 7 creatures ≈ 22 power, +6 from Greyfax's own `+1/+0` to the others = **28 unblockable**,
or ~34 with Elesh Norn. The deck does not need bigger creatures — it needs the **blockers tapped**.
So the finisher is not a card, it is the **mass-tap button**, and *that* is what needed redundancy.

### Correction: Blustersquall was filed in the wrong role and nearly cut

Part 2's first draft cut it as "one-shot tempo." Overload `{3}{U}` taps **every** creature you
don't control — that is the alpha-strike button, and with Hylda out it is also a dozen 4/4s and
with Verity Circle a dozen cards. Reversed. Same shape as the ledger's Jaya's Immolating Inferno
entry (a table-killer dismissed as "a fourth X-spell").

### Three independent finisher axes

1. **Alpha strike** — Blustersquall (overload) · Subjugator Angel · Tempest Caller · Opposition ·
   Elesh Norn (−2/−2 deletes chump blockers) · Elspeth's `0` (team flying) · Rogue's Passage.
2. **Non-combat drain** — Debt to the Deathless · Exsanguinate. Kills without ever attacking,
   which is the right shape for an archenemy, and cashes in Treasures if Revel is answered.
3. **Alt-win** — Revel in Riches, accelerated by Academy Manufactor.

### Survival package

Ghostly Prison + Propaganda (a three-creature swing at you costs `{12}` through both) + No Mercy.
The three are complementary, not redundant: **Prison/Propaganda tax swarms; No Mercy answers the
single big attacker who pays the tax anyway** (voltron commanders walk through a tax and die to it).

**Self-hit recorded:** *Ghostly Prison and Propaganda read "creatures can't attack **you**" — they
do NOT protect planeswalkers.* Elspeth and Kaito are attackable for free. **Norn's Annex** is the
version that covers "you or planeswalkers you control" and is the documented alternative; it was
passed over because its `{W/P}` tax is paid as 2 life, a far weaker deterrent than `{2}` each, and
not dying outranks protecting a planeswalker.

### The swaps

| Out | Grounds | In |
|---|---|---|
| Chakram Retriever | 5 mana, your turn only; Unstoppable Plan covers creature-untapping better | Debt to the Deathless |
| Puppet Strings | `{2}` per activation vs `{1}` for Icy Manipulator / Hylda's Crown | Academy Manufactor |
| Kelpie Guide | 8th untapper; Vizier does the same job, cycles, and blocks better (1/3 vs 2/2) | Ghostly Prison |
| Night's Whisper | **pays life** in the deck whose problem is being attacked | Propaganda |
| Court Street Denizen | conditional 2/2, slow trigger | No Mercy |
| Sky Hussar | 5 mana for a one-shot untap | Subjugator Angel |
| Orzhov Signet | every colour pair is **double-covered**; WB survives on Talisman of Hierarchy | Tempest Caller |
| Swan Song | **gives an opponent a 2/2 flier** — backwards for a pillowfort archenemy deck | Exsanguinate |
| Triad of Fates | two tap activations to exile one creature, and **they draw two**; exile already covered by Swords / Anguished Unmaking | Elspeth, Storm Slayer |

### Cards considered and rejected

- **Roaming Throne** ($51.12) — doubles **triggered** abilities of a chosen creature type. This
  deck's engine is **activated** abilities (Greyfax's `{1},{T}`, Icy Manipulator, Hylda's Crown,
  every assassin) — none are touched. Human is the only viable naming (14 in the deck) and it
  would really only double Hylda. Note Greyfax *is* a Human but her ability is activated, and
  Quake's printed type is "**Inhuman** Spy Hero".
- **Anointed Procession** ($59.35) — Elspeth's static is the same effect verbatim, for one more
  mana, $17 cheaper, plus two abilities.
- **Divine Visitation** — Elspeth's `0` (+1/+1 counters and flying to *all* creatures, repeatable)
  covers the evasion plan more broadly; Visitation's base is only Hylda and Shorikai. Note the two
  doublers would have stacked cleanly — both replacement effects, ordered by the affected player —
  so §2.5 was not the blocker; Elspeth simply outclasses them.
- **True Conviction** — cut from the plan on **curve**, not power. `{3}{W}{W}{W}` off 18 white
  sources is the hardest cast in the deck, and Elspeth covers the "connect and hit harder" job at
  5 mana in easier colours. Keeping it would also have meant cutting a second signet.

### Measured after the change

Curve **avg MV 3.19 → 3.31** over 64 nonland cards (0-1: 6→5, MV2: 13→12, MV6+: 4→5). Mana sources
45 → **44**. Game Changers **3/3** unchanged. Roles: Lands 36 · Ramp 9 · Draw 9 · Removal 9 ·
Wipes 3 · Theme 26 · Win Conditions 7. Deck total $684.40 → **$747.30**.

**Enablers beat multipliers when the bottleneck is connecting.** Subjugator Angel and Tempest
Caller were taken over True Conviction on exactly that basis.
