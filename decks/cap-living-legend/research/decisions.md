# Captain America, Living Legend — decision log

Append-only. Newest entries at the bottom. Record the **grounds**, not just the verdict.

---

## 2026-09-09 — Founding: why Azorius free-crew Vehicles

**Commander.** Captain America, Living Legend {1}{W}{U}, 3/4, vigilance, *"Whenever a creature you
control becomes tapped during your turn, if it's the first time that creature has become tapped
this turn, untap it."* Colour identity **UW** — this shares nothing with `decks/captain-america`
(Jeskai, First Avenger, Throw/Equipment voltron). Separate deck, separate folder.

### The ability, verified against the CR (dispatched `mtg-rules-expert`, CR v2026-08-07)

The trigger is **cause-agnostic**: CR 603.2e defines "becomes tapped" as a status change from
untapped to tapped on a permanent already on the battlefield (CR 110.5), and nothing distinguishes
a cost-tap from an effect-tap. Confirmed to trigger on:

| Source | Rule | Effect in this deck |
|---|---|---|
| `{T}` in an activation cost | 107.5 | every tap ability fires **twice** per turn |
| Crew | 702.122a | crew is **free**; blockers stay untapped |
| Station | 702.184a | **two** stations per creature per turn |
| Convoke | 702.51a | free |
| Improvise | 702.126a | free, but only for *artifact creatures* — it taps artifacts |
| Attacking | 508.1f | team-wide pseudo-vigilance |
| An opponent tapping your creature **on your turn** | 603.2e | a free untap, gifted |

Details that changed card choices:

- **Crew resolves after the untap and stays crewed.** The untap trigger goes on the stack *above*
  the crew ability (603.3), so the crewers untap before crew even resolves. Payment can't be
  altered after it's made (602.2), and 702.122c refers to a creature that *was* tapped — past
  tense. The same creatures can then legally crew a **second** Vehicle (702.122a wants "untapped").
- **Station twice.** "Activate only as a sorcery" (602.5d) is a *timing* restriction — main phase,
  empty stack — not a per-turn cap. Sequence: station → untap trigger resolves → station ability
  resolves and places the counters → stack empty → station again with the same creature.
- **Attacking untaps before blockers.** 508.2b puts the trigger on the stack in the declare
  attackers step; 506.4b says untapping an attacker doesn't remove it from combat.
- **Three creatures tapped for one crew = three separate triggers** (603.2c).
- **Exactly one bonus per creature per turn** (603.4 intervening-if). A doubling, never a loop —
  which satisfies the pilot's no-automatic-infinites rule for free.

### The two limits that actually shaped the list

1. **Cap does nothing on opponents' turns.** *"During your turn"* is inside the trigger condition,
   so the event never matches on anyone else's turn (603.2). No defensive value at all — he can't
   untap a blocker, and blocking never taps a creature anyway. **This is the deciding axis for the
   archetype** (deck-brain §2.3): a grind-and-control deck wants its commander to matter across the
   whole turn cycle, and this one only matters on yours. So the deck must be proactive.
   *Mitigations run:* Lita, Mechanical Engineer (untaps artifact creatures at end step) and
   Cyclonic Rift (the one card in the deck that operates on their turn).
2. **The untap always arrives too late to pay for its own cause.** The tap happens during cost
   payment (601.2h) but the trigger doesn't reach the stack until the spell/ability is fully cast
   (601.2i → 603.3). So you cannot tap a dork mid-cast and spend the bonus mana on that same spell,
   and you cannot double-convoke one spell. **Tap with priority first, then cast.**

### Field measurement (deck-brain §2.2)

`bun run edhrec commander` — 1,757 decks, rank #1,219. Themes: **Vehicles 87 · Artifacts 56 ·
Tap/Untap 51**. High-synergy: Silver Myr 70% · Gold Myr 69% · Ornithopter of Paradise 67% ·
Palladium Myr 60% · Shorikai 59% · Dawnsire 53% · Iron Spider 49%. Top: Drumbellower 45% ·
Parhelion II 45% · Vedalken Engineer 43% · Salvation Engine 41%.

Read: the field's answer is *"double your dorks, then crew big Vehicles for free."* That is a good
**engine** and about half the deck. It is **not a win condition** — 45% Parhelion II is the closest
thing the crowd has to one, which is the gap the pilot noticed independently.

**Correction to the EDHREC page:** it lists U.S.S. Enterprise-D, Galaxy-Class in New Cards, and
Candela / Stoic Star-Captain / Squadron Carrier appear in Station searches. `bun run card` reports
all four **not commander-legal** (TRK, and the `yeoe` digital set). Excluded.

### Archetype chosen

**Spine: Spacecraft & Vehicles.** Second deciding axis: Vehicles and Spacecraft are creatures only
when you choose, so they walk through Farewell / Supreme Verdict / Blasphemous Act untouched. The
alternative considered — "grind with tap-triggers, then land one big colourless haymaker" — loses
to a single removal spell and asks the commander to matter on turns where he does nothing.

**Rejected with grounds, not benched blindly:**

- **Tapper prison** (Opposition + Verity Circle + Kelpie Guide + Surgespanner). With Cap each
  creature taps *two* of their permanents per turn, which is a genuine soft lock. Rejected on the
  pod, not the card quality: the pilot's pods kill stax on sight (`users-pod-tendencies`), so the
  deck gets focused before the lock comes online. Verity Circle alone is fine — it draws off
  opponents tapping and locks nothing.
- **Token-flood + Halo Fountain as the spine.** Not weak — deck-brain §2.5 forbids that framing.
  Its actual problem is that it needs critical mass and one wrath resets it. Token-makers are kept
  as **crew and station fuel** (Shorikai Pilots, Royal Talon soldiers, Retrofitter Foundry servos,
  Prodigy's Prototype Pilots) because every token is another free tap; Halo Fountain is benched as
  a possible alt-win rather than cut on merit.

### Flavour brief

Pilot's call: **best card in every slot**, with Marvel cards taken where they're genuinely close.
Taken on merit: Iron Spider, Stark Upgrade (49% field, vigilance saves its free tap for the
ability); Captain America, Super-Soldier; Avengers Quinjet; The Thanos-Copter; Royal Talon Fighter
Jet; Dragon Man, Reformed Robot; Avengers Tower.

**Agent Maria Hill rejected on a rules check.** Her trigger is *"becomes tapped to pay a teamwork
cost"* — **teamwork is a spell keyword** (CR 702.194a: an additional cost on a *spell*), not crew
and not station. Only 9 teamwork cards exist in UW and they're filler. She does nothing here.

### Same-session correction to the initial 100

The first draft was built and then revised before it was shown, on three grounds:

| IN | OUT | Grounds |
|---|---|---|
| Cyclonic Rift *GC* | Alloy Myr | Only 2 of 3 Game Changer slots were used — free power left on the table. Rift is also the one card that operates on an opponent's turn, covering limit (1) above. |
| Thousand-Year Elixir | Moonfolk Puzzlemaker | ~10 cards in the deck have `{T}` abilities and every one is dead the turn it lands (CR 302.6). Elixir turns all of them on a turn early. Puzzlemaker's scry 1 was the weakest tap trigger. |
| Urza, Lord High Artificer | Mechtitan Core | Urza taps *every artifact* for {U} and artifact creatures do it twice; he is not a Game Changer. Mechtitan Core ranked last of 14 when the payload role was ranked whole (deck-brain §2.1): it exiles four wrath-proof Vehicles into a single token that dies to one Swords to Plowshares. |

Swiftfoot Boots over Lightning Greaves (31% field): Greaves grants **shroud**, which turns off
Kotori, Nanoform Sentinel and every "target creature you control" effect in the deck
(deck-brain §1.3, the Whispersilk Cloak trap).

### Validated

100 cards · every section header matches its contents · DECK/STATUS zero drift · 41 mana sources
(35 lands + 6 rocks) · Game Changers 3/3, Bracket 3 · no legality or colour-identity flags.

### Open / benched

- **Drumbellower** (45% field) — untaps all creatures during each *other* player's untap step,
  which is exactly the hole limit (1) leaves. Not cut on merit; no slot yet.
- **Halo Fountain** — genuine alt-win, and the deck makes bodies. Benched.
- **Unwinding Clock** — untaps all artifacts on every other player's untap step; most of this deck
  is artifacts. Benched for the same reason as Drumbellower.
- **Uthros Research Craft, Thunderhawk Gunship, Peacewalker Colossus, Mobilizer Mech,
  Aphetto Alchemist, Forensic Researcher, Kelpie Guide, Verity Circle, Sai, Master Thopterist,
  Simulacrum Synthesizer, The Wandering Rescuer** — evaluated, no slot in v1.
- **Printings unpinned (71).** Awaiting the pilot's preferences.

---

## 2026-09-09 — Relic of Legends in, Gold Myr out

Pilot brought three Marvel-set cards for evaluation: Relic of Legends, Heroic Sacrifice,
Royal Talon Fighter Jet.

**Royal Talon Fighter Jet — already in the list** (payload slot, since the founding build).

**Relic of Legends — added.** Its second ability, *"Tap an untapped legendary creature you
control: Add one mana of any color,"* is a **cost-tap**, so it triggers the commander and the
legend untaps — two any-colour mana per legend per turn. The deck runs **9 legendary creatures**.

The load-bearing argument is not the raw rate, it's *whose* taps it spends. Four legends in this
list — Captain America Living Legend himself, Captain America Super-Soldier, Sram and Kotori —
have no activated ability and (for two of them) vigilance, so their once-per-turn free untap was
being **wasted every single turn**. Relic converts that idle allowance into mana without competing
with the Myr, which already spend their own taps on their own mana abilities. With Tui and La it
also draws: tap → {1} + a card → untap (+1/+1 counter) → tap → {1} + a card.

Two rules points verified rather than assumed:
- **CR 302.6** restricts only a creature's **own** activated abilities with `{T}` in the cost.
  Relic's ability is Relic's, so it taps summoning-sick legends the turn they land — like crew.
- **CR 605.1a** — it is a mana ability (no target, could add mana, not loyalty, no library
  movement), so it doesn't use the stack. The founding entry's timing caveat still applies: the
  untap resolves after the spell is cast, so tap with priority first, then cast.

**Cut: Gold Myr** (pilot's call; my nomination was Apprentice Wizard). Mana impact checked before
applying: the swap trades a mono-`{W}` source for an **any-colour** source, so white sources stay
at 25 against 35 white pips. It does cost a **body** — Gold Myr crews, stations for 1 (2 with the
double) and carries its own free tap; Relic does none of that. Creature count 28 → 27.

For the record, on the mana numbers alone **Silver Myr was the marginally more correct cut**:
35 white pips / 25 white sources vs 31 blue pips / 28 blue sources, so blue is the colour with
slack. The gap is inside the noise and the choice was the pilot's.

**Heroic Sacrifice — benched, not rejected on quality.** With Krang (indestructible 9/9) or a
crewed Dawnsire (20/20) chosen, an entire alpha strike becomes a blank for {1}{W}, and it is
castable on an opponent's turn, which is the deck's known hole. It loses the slot to Clever
Concealment, which phases out any number of your permanents — beating damage, destruction, exile
and targeting alike — and which convoke makes free here. Heroic Sacrifice stops **damage only**:
nothing against Supreme Verdict, Farewell or targeted exile. The one thing it does that Concealment
cannot is protect your **life total**. If it comes in, the swap is over Stroke of Midnight, not
over anything in the protection slot.

**Correction to the founding entry.** It said Dawnsire comes online "turn 4–5." Re-derived against
the list as built: reaching 20 counters in one turn needs **10 total power** across untapped
creatures, and this creature base is mostly 1–3 power with two 0-power bodies (Apprentice Wizard
0/1, Ornithopter of Paradise 0/2) that crew and station for nothing. Honest number is **turn 5–6**
with four real bodies out. The founding figure was the theoretical rate, not this deck's.

**Printings.** `research/printings.txt` created with the two Marvel printings the pilot linked:
Relic of Legends (MSC) 209, Royal Talon Fighter Jet (MSC) 24. Neither was in the global reserve.

---

## 2026-09-09 — Shuri and Mu Yanling in; Dragon Man and Avengers Quinjet out

| IN | OUT |
|---|---|
| Shuri, Wakandan Inventor | Dragon Man, Reformed Robot |
| Mu Yanling, Wind Rider | Avengers Quinjet |

### First, a correction to my own evaluation of Dragon Man

The founding entry filed Dragon Man as "the Marvel flavour pick" and I later implied it was a
win-more card. Both readings were wrong, and the right one is worth recording because it changes how
this deck evaluates **any** creature. **Station gives charge counters equal to the tapped creature's
power**, so a creature whose power is set high by an ability is premium Station fuel — an 8-power
Dragon Man stations for 8, and the commander lets it station **twice**, for 16 counters from one
card in one turn. That is more than any other creature in the list (Krang 9, then a floor of 2s and
3s). Its real weakness is the opposite of win-more: a **bad floor**. Cast on turn 4 with only Sol
Ring, Arcane Signet and Relic of Legends out, it is a 3/5.

It still lost the slot, but on a comparison rather than on the label.

### Why Shuri

The deciding axis: **the only card in the list that converted a developed board into a lethal one
was Krang, at 9 mana.** Shuri does it for {1}{U}, repeatably, and doubles with the commander. She
also carries a cost reducer for the 37 artifacts in the deck, and she is the field's **#2 creature
at 38% inclusion, +0.33 synergy** on the commander page.

Line verified by `mtg-rules-expert` before applying — and the verification found a **better line
than the one proposed**, plus a trap:

- **Best line: crew a cheap Vehicle, then copy THAT.** Crew's "becomes an artifact creature until
  end of turn" is a layer-4 **noncopy** effect (CR 613.1d); the copy applies in layer 1a (613.2a).
  CR 707.4 — a permanent copying a different object "doesn't change any noncopy effects presently
  affecting the permanent," and 613.6 keeps it applying. So: crew **Smuggler's Copter for Crew 1**,
  Shuri it into Parhelion II, and you get the 5/5 first-striking Angel factory **without ever paying
  Crew 4**. Better than the Sol Ring version and it doesn't risk the ramp.
- **The trap: status is not copied** (CR 707.2). A *tapped* Sol Ring becomes a *tapped* Parhelion II
  and cannot attack (508.1a) — and **the commander does not rescue it**, because Sol Ring was a
  *noncreature artifact* when it became tapped and his trigger reads "whenever **a creature** you
  control becomes tapped" (603.2e, which also forbids retriggering). A rock is mana **or** an
  attacker that turn, never both.
- **The copy can attack the turn it's made.** CR 302.6 and 508.1a key on how long the *permanent*
  has been controlled, not how long it has been a creature.
- **No ETB triggers** (CR 707.4) — so copy targets must have **attack** triggers. Extinguisher
  Battleship is a **dead** target: it is a Spacecraft whose creature-ness sits behind `{5+}` charge
  counters (721.2b) and counters aren't copied (707.2).
- **Exactly two activations per turn** — the second tap fails the commander's intervening-if (603.4).
  **Minamo, School at Water's Edge gives a third**: it untaps a legendary permanent, and Shuri is
  legendary.
- **Legend rule** is dodged solely by "except it isn't legendary" (704.5j); the copy genuinely *is*
  named Parhelion II (707.2 copies the name).
- **Do not re-target the same permanent** with the second activation: the lingering crew effect plus
  a copy with no printed P/T is a 0/0 and dies to SBA (704.5f, 208.5).

### Why Avengers Quinjet was the second cut

Ranked the payload role whole (deck-brain §2.1); Quinjet finished last of 13. **Both** of its modes
read "a Hero card," and the deck contains three non-commander Heroes — Captain America Super-Soldier,
Iron Spider, and now Shuri. Three live cards in 99. Strip the ability and it is a 5-mana 4/4 flier
with crew 3, the worst rate in the payload. It went in for flavour, and the brief is best-card-every-
slot.

Mu Yanling replaces it in the same curve slot and fixes the real bottleneck: **evasion, not size**.
Reaver Titan (10/10), Salvation Engine (6/10) and Mighty Servant of Leuk-o (6/6) are ground
creatures a single 1/1 chumps forever; "Vehicles you control have flying" turns all three on
permanently. She also brings a 3/2 Vehicle token with crew 1 — which is now also a **Shuri copy
target** — and draws whenever fliers connect. 26% on the commander page.

### Considered and not taken

- **Stroke of Midnight** — the one card in the deck strictly outclassed by another at the same cost
  (Generous Gift hits lands, it doesn't). Still the first cut if a slot is needed.
- **Iron Lad, Diverging Destiny** — measured, not asserted: **37 artifacts in 99 cards**, so its
  reveal hits 37%, or **0.75 cards per turn** even with the double tap. Worst rate of the 10 draw
  engines. Kept because it is a 2/2 vigilant flier that crews, and because cutting it would thin a
  correctly-sized role while the payload could afford to lose its worst card.
- **Cyberdrive Awakener** (12%), **Kappa Cannoneer** (14%), **Marvin, Murderous Mimic** (19%),
  **Simulacrum Synthesizer** (25%) — all evaluated for the finisher slot, all benched.

### Validated

100 cards · headers match contents · DECK/STATUS zero drift · 41 mana sources · GC 3/3, Bracket 3 ·
no legality or colour-identity flags. Snapshot: `versions/2026-09-09-before-shuri-mu-yanling.md`.
Printing pinned: Shuri, Wakandan Inventor (MSH) 75.

---

## 2026-09-09 — Simulacrum Synthesizer in, Kuldotha Forgemaster out

Pilot challenged Kuldotha Forgemaster on the obvious question — *"what would we be sacking?"* —
and was right. Audited the artifact base rather than arguing from feel.

**The deck has 35 artifacts and essentially none are disposable.** Twelve are the win condition.
The rocks are never "spent" — they produce every turn. The artifact *creatures* are the crew fuel,
the Station fuel and the free taps, so sacrificing them is sacrificing the commander's engine.
And **Ancient Den and Seat of the Synod are lands** that read as MV-0 artifacts: saccing one costs a
land drop.

**The killer: none of the deck's token producers make artifacts.** Checked all six —

| Source | Token | Artifact? |
|---|---|---|
| Shorikai, Genesis Engine | "1/1 colorless **Pilot creature** token" | no |
| Prodigy's Prototype | "1/1 colorless **Pilot creature** token" | no |
| Royal Talon Fighter Jet | "1/1 white **Soldier** creature token" | no |
| Parhelion II | "4/4 white **Angel** creature token" | no |
| Retrofitter Foundry | 1/1 Servo **artifact** creature | **yes** — the only fodder |
| Lita / Mu Yanling / Urza | Zeppelin, Vehicle, Construct **artifact** tokens | yes, but each is a real body |

So the only fodder engine is Retrofitter Foundry at {2} a Servo: **two turns and {8} to fuel one
activation**. And because the commander untaps Forgemaster, using it properly needs **six** artifacts
in a turn. The deck cannot feed it.

Two further strikes: it is a five-mana body that does nothing the turn it lands (its own `{T}` is in
the cost, so CR 302.6 applies unless Thousand-Year Elixir is out), and the deck **already has two
artifact tutors with no such cost** — Enlightened Tutor, and Whir of Invention, which puts one
straight onto the battlefield at instant speed with improvise discounting it.

**Simulacrum Synthesizer takes the slot** (moved to Untappers/Crew & Station Fuel; Tutors 3 → 2).
*Whenever another artifact with MV 3 or greater enters, create a 0/0 Construct that gets +1/+1 for
each artifact you control.* **20 of the deck's 35 artifacts are MV 3+**, so it triggers on most of
what the deck casts, and the Constructs are sized by artifact count — 8/8 to 12/12 on a normal
mid-game board.

The load-bearing reason is that it **fixes the Station problem recorded on 2026-09-09**: that entry
corrected Dawnsire's clock from "turn 4–5" to "turn 5–6" because the creature base is mostly 1–3
power, and Station gives charge counters *equal to power*. A single 10-power Construct stations for
10, and **twice under the commander that is 20 counters** — Dawnsire fully online off one token. It
is also crew fuel for anything, a blocker, and another free tap each turn. 25% on the commander page.

**Alternative offered and not taken:** Drumbellower (45% of the field) untaps your creatures during
each *other* player's untap step, which is the one thing the commander cannot do. Declined for this
slot because it answers a different problem — it stays top of the bench.

### Validated

100 cards · headers match contents · DECK/STATUS zero drift · 41 mana sources · GC 3/3, Bracket 3 ·
no legality or colour-identity flags. Snapshot: `versions/2026-09-09-before-simulacrum-synthesizer.md`.

---

## 2026-09-10 — The untapper package: Drumbellower, Unwinding Clock, Marvin, Halo Fountain

| IN | OUT |
|---|---|
| Drumbellower | Heart of Kiran |
| Unwinding Clock | Iron Lad, Diverging Destiny |
| Marvin, Murderous Mimic | Mighty Servant of Leuk-o |
| Halo Fountain | An Offer You Can't Refuse |

### Correction: I had the untappers filed wrong

Earlier entries benched Drumbellower and Unwinding Clock as "patching the hole the commander leaves
on opponents' turns." That framing under-valued them by an order of magnitude. **In a four-player
pod they grant three extra untaps per turn cycle**, so every tap ability in the deck fires four times
a cycle instead of once: Arcanis goes from 6 cards a turn to 15 a cycle; Sanwell from two impulse-6s
to five; and because crew carries no timing restriction, you can **crew at instant speed on an
opponent's turn and block with a 10/10**. They are engine multipliers, not insurance. 45% of the
field runs Drumbellower and the field was right.

### They are not substitutes for each other — the coverage is nearly disjoint

- **Drumbellower** untaps *creatures*: Arcanis, Sanwell, Emry, Shuri, Grand Architect, Sram, Tui and
  La, Kotori, Mu Yanling, Cloudspire Captain.
- **Unwinding Clock** untaps *artifacts*, which is the **only** way to untap **Shorikai** — it is a
  Legendary Artifact — Vehicle, not a creature, unless crewed — plus the mana rocks (so there is
  actually mana available for Counterspell, Cyclonic Rift and Clever Concealment on other players'
  turns), Retrofitter Foundry, Thousand-Year Elixir and **Halo Fountain**.
- Overlap is only the 15 artifact creatures. Per deck-brain §2.5 this is the *multiplicative* case,
  not the substitute case.

**Marvin is the biggest winner from the package**, which is why he came in alongside: he is an
artifact creature, so *both* untappers hit him, and copying Arcanis means **15 cards a cycle from a
two-drop**. **Halo Fountain** was the weakest of the four and went in anyway because the Clock gives
it ~5 activations a cycle, and its {W} mode makes a Citizen each time — so the fifteen-creature win
mode stops being a fantasy once Simulacrum Synthesizer Constructs, Shorikai Pilots and Citizens
accumulate.

### The cuts

- **Iron Lad** — measured, not asserted: 37 artifacts in 99 cards, so its reveal hits 37%, or 0.75
  cards per turn. Worst of the ten draw engines. The untappers improve it, but improve every other
  engine more.
- **Mighty Servant of Leuk-o — a deck-brain §1.3 miss caught late.** Its bonus needs the Vehicle
  *"crewed by exactly two creatures,"* but **Kotori makes every Vehicle crew 2**, so the natural play
  is to crew it with one body and get nothing. Our own card turned off its text. This should have
  been caught when the deck was founded.
- **An Offer You Can't Refuse** — it hands a Bracket 3 opponent **two Treasures**. Counterspell and
  Dovin's Veto cover the same job without accelerating a rival.
- **Heart of Kiran** (pilot's call, over my nomination of Apprentice Wizard). Ranking the payload
  whole put it last of eleven: every other Vehicle there generates value on attack and Heart of Kiran
  is a vanilla body, while its one distinguishing line — *"remove a loyalty counter from a
  planeswalker rather than pay the crew cost"* — is **completely dead**, the deck runs zero
  planeswalkers. Cost of the cut, stated honestly: it was the payload's only two-drop, so the
  Vehicle curve is now top-heavy (Smuggler's Copter at 2, then nothing until The Seriema at 3). The
  early turns are spent deploying the engine instead, which is the correct use of them for this deck.

### Correction to two earlier entries

I twice called **Stroke of Midnight "strictly outclassed by Generous Gift."** Wrong both times.
Generous Gift gives the opponent a **3/3 Elephant**; Stroke gives a **1/1 Human**. Stroke has the
smaller downside, Gift the wider target range (it hits lands). Neither dominates. Stroke stays, and
it is **not** the first cut any more.

### Considered and not taken for the final slot

- **Apprentice Wizard** — my nomination, declined by the pilot twice now, on mana output: {U}{U} for
  six colourless is the biggest single burst in the deck and the top end is {7}–{9}. The 0-power
  objection (crews for 0, stations for 0) stands and is worth re-checking in play.
- **Cloudspire Captain** — the deck carries three crew-cost helpers, and since Kotori sets every
  Vehicle to crew 2, "crews as though power were 2 greater" is near-dead whenever Kotori or Hotshot
  Mechanic is out. Still the first cut if another slot is needed.
- **Krang** — Mu Yanling now supplies the flying half of his text for four mana, leaving
  indestructible + trample + haste at nine. Kept because board-wide indestructible is a real
  anti-wrath button.
- **Esper Sentinel** — 17% and **−0.06 synergy** on the commander page, below average for a card that
  strong. It is the one card in the list that participates in nothing: no tap ability (so the
  commander's free untap on it is wasted every turn), power 1, and no interaction with Vehicles,
  artifacts entering, or untapping.

### Validated

100 cards · headers match contents · DECK/STATUS zero drift · 41 mana sources · GC 3/3, Bracket 3 ·
no legality or colour-identity flags. Snapshot: `versions/2026-09-10-before-untapper-package.md`.

---

## 2026-09-10 — `DECK-COUNTERS.md`: a second list with Cap as the threat

Pilot: *"what are the other win cons if we don't draw [the Vehicles]? Cap can't reliably attack ...
a different way of playing the deck that maybe isn't about crewing or stationing?"* — then chose a
**separate list** over hedging the main one. Full study: `research/counters-variant-2026-09-10.md`.

### Why a second list rather than a hedge

Measured first: the main list finds a finisher-or-tutor 91% of the time by turn 4 from natural draws
alone, so "not drawing it" is not the failure mode. **13 of its 17 finishers are artifacts** — one
artifact wipe is. A creature-and-enchantment win condition fixes that, and the two plans pull in
opposite directions (Vehicles want many small crew bodies; voltron Cap wants protection and evasion
on one body), so they live in separate lists.

### What left (relative to `DECK.md`)

- The **24 Vehicle/Station-only cards** (10 Vehicles/Spacecraft, Shuri, Mu Yanling, Kotori, Hotshot
  Mechanic, Cloudspire Captain, Prodigy's Prototype, Krang, Sram, Lita, Simulacrum Synthesizer, Halo
  Fountain, Mech Hangar, Adagia, Uthros).
- **Supreme Verdict — a deck-brain §1.3 flip.** One-sided in `DECK.md` because Vehicles aren't
  creatures at sorcery speed; in a creature-voltron list it kills Cap and the board. Replaced by
  Winds of Abandon (overload exiles only creatures you don't control).
- **Vedalken Engineer, Grand Architect** — artifact-only mana, and the curve dropped (average MV
  2.38) so ramp went 10 → 8.
- **Emry** (few artifacts left to recur), **Retrofitter Foundry** (tokens have no job here).

### What came in (by role)

| Role | Cards |
|---|---|
| Draw → counters | Iron Man, Armored Avenger · Lyla, Holographic Assistant · Stark's Ingenuity · Wizard Class · Proft's Eidetic Memory · Bard the Bowman |
| Counter engines the commander untaps | Agent Phil Coulson (other Heroes) · Keensight Mentor (vigilance) · Mikaeus, the Lunarch · Lae'zel (amplifier, per permanent — verified) |
| Counters → cards | Brigone · Dusk Legion Duelist · Shang-Chi and the Ten Rings |
| Evasion / double strike | K-9, Mark I · The Destined Thief · Key to the City · Urdnan |
| Protection | Mother of Runes · Giver of Runes · Patriot, Shield Wielder · Kid Loki · The Ozolith |
| Finishers / backup | Walking Ballista · Nadir Kraken · Norn's Choirmaster |
| Lands | Abandoned Air Temple · Karn's Bastion · 5th Plains |

Carried over and newly load-bearing: **Unctus** (makes Cap a blue artifact until end of turn, so Iron
Spider and Steel Overseer — "each artifact creature" — put counters on him), **Captain America,
Super-Soldier** (hexproof for the seven other Heroes in the list), **Mother of Runes** untapped on
opponents' turns by Drumbellower.

### Considered and not taken

- **Benthic Biomancer** — reads as a chosen loop with Iron Man (counter on Biomancer → loot → draw
  → Iron Man targets Biomancer again). Controllable, since Iron Man's target is chosen, so it is
  allowed under the pilot's loop policy — but it loots the whole library and is a near-combo at a
  Bracket 3 table. Left out of v1; the pilot's call if wanted. Not rules-verified.
- **Delney** — its power-2 gate turns off under this list's own counters (ledger 2026-09-10).
- Benched: Twenty-Toed Toad (alt win), Toothy, Exemplar of Light, Cathars' Crusade, Contagion Engine,
  Inexorable Tide, Captain America Skybound / Steve Rogers, Echo, Prairie Dog, Sonic Screwdriver,
  Secret Tunnel, Hylda of the Icy Crown.

### Validated

100 cards · every section header matches its contents · Game Changers 3/3 (Cyclonic Rift,
Enlightened Tutor, Teferi's Protection), Bracket 3 · no legality or colour-identity flags ·
41 mana sources · average nonland MV 2.38 · white 35 pips against ~24 sources, blue 33 against ~26.
`STATUS.md` still mirrors `DECK.md` only (the repo convention for variant lists).

### Open

- **The curve is low for 41 mana sources.** Mana sinks exist (Walking Ballista, Keensight Mentor,
  Mikaeus, Abandoned Air Temple, Karn's Bastion, Stark's Ingenuity's X), so it stays for now — the
  first tuning candidate after play is one land or one ramp piece.
- **28 cards unpinned** for printings.
- Untested. Every clock figure is a model, not a goldfish.

---

## 2026-09-10 — `DECK-COUNTERS.md` v2: rebuilt as a lifelink voltron

The pilot audited v1 and was right on every point: *"not running enough equipment to make him proper
voltron ... do we even have trample or flying ... not enough spread-around +1/+1 or targeting Cap ...
not enough card-draw +1/+1 or creatures-entering +1/+1."* Measured before answering:

| Gap | v1 | v2 |
|---|---|---|
| Equipment / Auras | 2 | 11 |
| Flying or trample on Cap | 1 (conditional on Iron Man attacking) | 4 |
| Unblockable, no activation needed | 0 | 2 (Aqueous Form, Brotherhood Regalia) + 3 activated |
| Lifelink sources | 0 | 5 |
| Life gain → counters | 0 | 4 |
| Creature enters → life / counters | 0 | 2 + 5 token makers |

**Correction, logged plainly:** v1 was built by subtraction from `DECK.md` and I scored "70 cards
carry over" as a virtue. That was the wrong axis (deck-brain §2.3). It left an artifact skeleton —
artifact-only mana, artifact lands, Iron Spider / Steel Overseer that cannot put counters on Cap —
and too little actual voltron.

### The engine

**Light of Promise** gives the enchanted creature "whenever you gain life, put **that many** +1/+1
counters on this creature" — it counts the *amount*, not the event (CR 119.9, verified). On a
lifelink Cap that doubles his power per connected hit. Cap + Commander's Plate + Shadowspear = 7/8
trample lifelink → hit for 7, +7 counters → 14/15 → second hit is 21 commander damage, with no other
engine online. Heliod and Archangel of Thune count *events*, so they pair with Soul Warden / Auriok
Champion — whose trigger has no controller clause, so opponents' creatures and tokens entering count
too (CR 603.6a, 603.2c).

### Swaps (20 cards, plus basics 5/4 → 7/3 Plains/Island)

**Out:** Iron Spider, Steel Overseer, Unctus (artifact-only counters; Unctus existed to make Cap an
artifact for them) · Shang-Chi, Brigone, Dusk Legion Duelist, Mikaeus (grow themselves; Archangel of
Thune now covers "each creature") · Sanwell, Unwinding Clock, Archway of Innovation (artifact/Vehicle
leftovers) · Key to the City (replaced by static unblockability) · Norn's Choirmaster (5-mana
proliferate), Wizard Class (9 total mana to reach level 3) · Esper Sentinel, Mechan Navigator, Tui and
La, Lyla (second Iron Man; life gain is now the primary engine) · Urza, Silver Myr, Palladium Myr
(artifact-only or single-colour mana on a 2.31 curve).

**In:** Shadowspear, Loxodon Warhammer, Batterskull, Commander's Plate, Sword of Feast and Famine,
Maul of the Skyclaves, Brotherhood Regalia, Aqueous Form, Light of Promise · Stoneforge Mystic,
Steelshaper's Gift, Puresteel Paladin (metalcraft equip {0}), Sram · Heliod, Sun-Crowned, Archangel of
Thune, Soul Warden, Auriok Champion · Adeline, Resplendent Cathar, Brimaz · Plains.

### Rules findings that shaped it (mtg-rules-expert, CR 2026-08-07)

- **Protection from Cap's own colours strips his own gear** (702.16c/d, 704.5m/n). Pro-white kills
  Light of Promise and unattaches Maul; pro-blue kills Aqueous Form and Stark's Ingenuity. Hence
  hexproof over protection, and the only Sword is Feast and Famine (black/green). Commander's Plate is
  protection from black, red and green only (702.16i).
- **Heliod + Walking Ballista** is a chosen loop (104.4b, 732.2a) and a two-card instant-speed kill;
  it needs Ballista at 2+ counters (with 1, it dies to SBA before Heliod's trigger resolves). Kept
  under the pilot's loop policy — explicitly the pilot's call, flagged in the list header.
- Colossus Hammer was considered and **not** taken: "loses flying" vs a static flying grant is
  decided by timestamp, and the Hammer re-stamps on every attach (613.7e), fighting Maul/Iron Man.
- Archetype of Imagination / Levitation benched — Maul, Aqueous Form and Regalia already cover Cap.

### Validated

100 cards · every section header matches · Game Changers 3/3, Bracket 3 · no legality or
colour-identity flags · white 44 pips / ~26 sources, blue 25 / ~22 after the basics shift ·
average nonland MV 2.31. **deckcheck flags 39 mana sources as low (<40)** — left as is on the curve
and on Puresteel Paladin's free equips; first thing to revisit after play. 32 cards unpinned.
Snapshot: `versions/2026-09-10-counters-v1-before-voltron-rebuild.md`.

---

## 2026-09-10 — Equipment pass (v2.1)

Pilot: *"some of the equipment seems sub par ... batterskull is essentially 10 mana which is insanely
bad."* Correct — logged as a correction in the deck-brain ledger (cost Equipment as cast + cheapest
equip onto the commander, deck-brain §1.2). Cost-to-Cap table from verified text: Aqueous Form 1 ·
Shadowspear 3 · Brotherhood Regalia 3 · Maul of the Skyclaves 3 · Swiftfoot Boots 3 · Commander's
Plate 4 · Umezawa's Jitte 4 · Sword of Feast and Famine 5 · Loxodon Warhammer 6 · Hulkbuster Armor 7 ·
Batterskull 10.

**Applied:**

| IN | OUT | Grounds |
|---|---|---|
| Umezawa's Jitte | Batterskull | 4 mana onto Cap instead of 10. Each "gain 2 life" activation is its own life-gain event (CR 119.9): 2 Light of Promise counters plus a Heliod and an Archangel trigger. The counters can be cashed between double-strike damage steps (510.3). |
| Super-Soldier Serum | Loxodon Warhammer | A second lifelink source on Cap adds nothing (702.15f). Serum attaches every Equipment you control to Cap for free when he attacks or blocks — attach is not equip, no cost or timing (701.3a, 702.6a) — so equip costs stop mattering. |

**Proposed and declined by the pilot (kept both):** Conqueror's Flail over Sword of Feast and Famine
(the Sword's protection colours sit inside Commander's Plate's; Flail stops opponents casting spells
on your turn) · Hulkbuster Armor over Lae'zel (base 9/9 flying via equip Hero {3}). The pilot's call;
Flail and Hulkbuster stay benched.

**Pilot's condition:** *"make sure we have a way to add all the keywords."* Audit of who can give Cap
each keyword after the swaps (corrected by hand — the script counted cards that *have* a keyword as
granting it):

| Keyword | Sources that put it on Cap |
|---|---|
| Can't be blocked | 5 — Aqueous Form, Brotherhood Regalia, Rogue's Passage, K-9, The Destined Thief |
| Hexproof | 4 — Swiftfoot Boots, Captain America Super-Soldier, Patriot, Kid Loki |
| Protection | 4 — Commander's Plate, Sword of Feast and Famine, Mother, Giver (never white/blue) |
| First strike | 3 — Maul, Super-Soldier Serum, Urdnan |
| Lifelink | 3 — Shadowspear (static), Heliod (activated), Bard the Bowman (conditional) |
| Vigilance | native + Serum |
| Ward | 2 — Brotherhood Regalia, K-9 (to other legends while untapped) |
| Flying | **1 static** — Maul; Iron Man's attack trigger is conditional |
| Trample | **1** — Shadowspear |
| Haste | **1** — Swiftfoot Boots |
| Double strike | **1, conditional** — Urdnan, needs 2+ counters |
| Indestructible | **0** |
| Deathtouch | **0** |

Gap-fill package proposed to the pilot — awaiting approval, not applied.

**Validated:** 100 cards · headers match · Game Changers 3/3 · no legality or colour-identity flags ·
39 mana sources (deckcheck's <40 warning stands). Snapshot:
`versions/2026-09-10-counters-v2-before-equipment-pass.md`.

---

## 2026-09-10 — Keyword package (v2.2)

Pilot's condition on the Equipment pass: *"make sure we have a way to add all the keywords."* The
hand-corrected audit (previous entry) showed flying 1 static, trample 1, haste 1, double strike 1
(conditional), indestructible 0, deathtouch 0. Proposed four cheap fills; pilot approved.

| IN | OUT | Covers / grounds |
|---|---|---|
| Akroma's Will | K-9, Mark I | **Double strike + flying** team-wide, at instant speed. K-9's job (unblockable) had 5 sources and needs {1}{U} and a tap every turn; Aqueous Form and Regalia do it permanently. |
| Sword of Vengeance | Kid Loki | **Trample + haste** (+ first strike, +2/+0); Serum attaches it free. Hexproof had 4 sources and Kid Loki's only works on turns you put counters on Cap. |
| Basilisk Collar | Keensight Mentor | **Deathtouch** (with trample: 1 damage per blocker, 702.2c + 702.19b) and backup lifelink when Shadowspear isn't out. Keensight's counters only reach vigilance creatures — in this build, mostly Cap. |
| Mithril Coat | Proft's Eidetic Memory | **Indestructible**; flash, attaches itself to a legend. Proft's counters scale with cards drawn that turn, and this list draws less than v1. |

**Akroma's Will — first mode only.** Its second mode's protection from each colour would strip Light
of Promise, Super-Soldier Serum, Aqueous Form and Stark's Ingenuity (702.16c) and unattach Maul
(702.16d). Cast after blockers, before the first-strike damage step: gaining double strike then
still gives both hits (702.4d), so Light of Promise's between-steps growth applies.

**Coverage after:** flying 2 (Maul, Akroma's Will) · trample 2 (Shadowspear, Sword of Vengeance) ·
haste 2 (Swiftfoot Boots, Sword of Vengeance) · double strike 2 (Urdnan, Akroma's Will) ·
indestructible 1 (Mithril Coat) · deathtouch 1 (Basilisk Collar) · lifelink 4 · can't be blocked 4 ·
hexproof 3 · first strike 4 · protection 4.

Sections: Equipment & Auras 11 → 14 · Evasion & Double Strike 3 (K-9 → Akroma's Will) · Draw →
Counters 2 → 1 · Tap Counter Engines 3 → 2 · Protection 8 → 7. `research/gameplan.md` updated to drop
the four cut cards and add the Akroma's Will timing note.

**Validated:** 100 cards · every header matches · Game Changers 3/3 · no legality or colour-identity
flags · 39 mana sources (deckcheck <40 warning stands). A text-anchored insert initially missed
(the file has no blank line after headers) and the 100-card check caught it at 99 before anything was
reported; fixed and re-validated. Snapshot: `versions/2026-09-10-counters-v2.1-before-keyword-package.md`.

---

## 2026-09-10 — Elspeth, Storm Slayer and Elesh Norn in (v2.3)

Pilot asked about Elesh Norn, Mother of Machines · Norn's Annex · Elspeth, Storm Slayer. None is a Game
Changer (Scryfall `is:gamechanger` returned no match; the same query shape returns Cyclonic Rift as a
control). Rules verified by mtg-rules-expert (CR 2026-08-07).

| IN | OUT | Grounds |
|---|---|---|
| Elspeth, Storm Slayer | Nadir Kraken | Doubles tokens from 5 makers (Adeline, Brimaz, Shorikai, Urza's Saga, her own +1); Adeline's 3 attacking tokens become 6, still tapped and attacking (Gatherer 2025-04-04). Her 0 puts a counter on every creature including Cap and gives flying until your next turn (a third flying source). The Kraken grew itself, not Cap, at {1} per trigger. |
| Elesh Norn, Mother of Machines | Thousand-Year Elixir | Soul Warden and Auriok Champion trigger twice for **every** creature entering, opponents' included (603.6a, 603.2d; Gatherer 2023-02-04) — 4 life-gain events per creature instead of 2. Also doubles Stoneforge Mystic and Urdnan's ETB (2 counters → unlocks double strike), and shuts off opponents' enters triggers and landfall. The downstream life-gain triggers are *not* doubled again. The Elixir's job — letting tap creatures act the turn they land — lost most of its targets in the v2 rebuild. |

**Norn's Annex rejected:** a Phyrexian-mana attack tax (2 life per attacker from 40), no voltron value,
doesn't stop tokens entering attacking, and the pilot's pods remove stax pieces on sight.

**Validated:** 100 cards · headers match · Game Changers 3/3 · no legality or colour-identity flags.
Snapshot: `versions/2026-09-10-counters-v2.2-before-norn-elspeth.md`.

---

## 2026-09-10 — Tap re-centre (v2.4)

Pilot: *"it's not fully maximizing the tapness or 'when a creature or permanent you control gets
tapped' effects"* and *"we should have cards that tap for draw."* Measured: cards using the
commander's untap had fallen from 24 (v1) to 12 across the voltron rebuilds (DECK.md: 31).

| IN | OUT | Grounds |
|---|---|---|
| Resplendent Mentor | Whir of Invention | Grants "{T}: You gain 1 life" to white creatures — 20 of 27 here, incl. Cap and every white token. Two life-gain events per creature per turn under the commander (verified: 113.10, 603.2e, 119.9; 302.6 summoning sickness applies). Whir only found artifacts. |
| Stonehewer Giant | Steelshaper's Gift | Tap tutor that puts an Equipment onto the battlefield attached, twice a turn. |
| Archivist | Iron Man, Armored Avenger | {T}: draw, twice a turn; Iron Man never tapped, and Stark's Ingenuity already does draw → counters on Cap. |
| Pippin, Guard of the Citadel | Brotherhood Regalia | {T}: protection from a card type — "creature" = unblockable by creatures, doesn't strip his own-colour Auras (702.16c/d). 60% of the field's tap builds. |
| Unctus, Grand Metatect | Aqueous Form | Every other blue creature — Cap included — loots whenever it becomes tapped (verified). Unblockability now covered by Pippin, The Destined Thief, Rogue's Passage, Lawkeeper. |
| Gideon's Lawkeeper | Into the Flood Maw | {W},{T}: tap target creature, twice a turn — two blockers down. |

Cards using the untap: 12 → 32. Rules caveats recorded in `research/gameplan.md`.

**Validated:** 100 cards · headers match · Game Changers 3/3 · no legality or colour-identity flags.
Snapshot: `versions/2026-09-10-counters-v2.3-before-tap-recentre.md`.

---

## 2026-09-10 — `DECK-ENGINE.md`: rebuilt from scratch around the untap

Pilot: *"the main thing i wanted to do with this deck is fully leverage cap's ability ... i genuinely
want to know what the most reliably consistent way to play him and maximize his ability"* — and
authorised a from-scratch rebuild. Built as a new list so neither existing list is lost.

### The thesis

The ability's value is **creatures × meaningful taps**. The most reliable way to maximise it is to
give *every* creature two meaningful taps a turn: the first crews a Vehicle / stations a Spacecraft
(or feeds Grand Architect, Relic of Legends, convoke, Harmonized Trio); Cap untaps it; the second uses
its own ability. "Becomes tapped" payoffs (Fallowsage, Tui and La, Mechan Navigator, Sanwell, Unctus's
granted loot) fire on **both** taps because crewing taps them (603.2e, 702.122a — verified). Vehicles
are the universal tap outlet; that is why the field's tap/untap builds are Vehicles builds.

### Same yardsticks, three lists

| | Creatures | Use their 2nd tap | Tap outlets | Draw sources | Artifacts | Finisher-or-tutor by T4 |
|---|---|---|---|---|---|---|
| DECK.md (Vehicles) | 27 | 17 | 18 | 8 | 33 | 91% |
| DECK-COUNTERS (lifelink voltron) | 31 | 15* | 3 | 5 | 18 | — (kill rides on Cap) |
| **DECK-ENGINE** | 30 | **25** | **20** | **10** | 26 | 86% |

\* Resplendent Mentor grants a {T} ability to its 20 white creatures when it's on the battlefield.

Field check: 83 of 91 non-basic DECK-ENGINE cards appear on the commander's EDHREC page, including the
tap-theme staples (Pippin 41%, Ioreth 41%, Urianger 32%, Mother of Runes 32%, Harmonized Trio 29%).

### Why not voltron as the primary

The ability affects your *other* creatures — Cap has vigilance, so his own untap is idle unless an
outlet taps him. A voltron kill rides on one creature (removal = commander tax + lost Auras), and most
voltron slots (Equipment, Auras) don't use the untap at all. DECK-COUNTERS stays as the alternative.

### Honest trade-offs

- Finds a finisher slightly less often than DECK.md (86% vs 91% by turn 4) — 17 finisher-or-tutor
  cards vs 20, spent on engine density.
- Still 26 artifacts; an artifact wipe hurts, but the creature engine survives it (DECK.md: 33).
- Many small creatures: sweepers are the risk — Adept Watershaper / The Wandering Rescuer protect
  creatures left tapped, Vehicles dodge sorcery-speed wipes, plus Teferi's Protection and Clever
  Concealment. **Tension:** Drumbellower / Unwinding Clock untap everything on opponents' untap steps,
  which switches off Watershaper/Rescuer protection until you re-tap at instant speed.

### Loop audit (mtg-rules-expert)

No infinite or unbounded loops; no mandatory loops. Chosen finite cycles only: Ioreth ⇄ Thousand-Year
Elixir ({1}) and Ioreth ⇄ Minamo ({U}). Marvin, Murderous Mimic excluded deliberately (infinite with
Ioreth). The list header names everything that would make the Ioreth circuit infinite.

### Validated

100 cards · every header matches · Game Changers 3/3 · no legality or colour-identity flags ·
41 mana sources. `MOXFIELD-ENGINE.txt` generated.

## 2026-09-16 — `DECK-ENGINE.md` resilience pass (15 swaps)

Pilot, after playing it (2026-09-15): *"the new version of the deck plays better but it's actually really
bad tbh. it feels more like a bracket 2 deck.. Like it takes so long to set up a usable board only to get
boardwiped on turn 4-5 and basically you're out of the game after that, especially if captain america also
got wiped and now he's in the command zone costing 5"*. Then, weighing options: *"i don't mind having some
spells that give my board blinking against exile or indestructible so board wipes still resolve and i stay
ahead"*. Approved the swap 2026-09-16. Snapshot: `versions/2026-09-16-engine-before-resilience-pass.md`.

### What the play report falsified

Measured on the pre-pass list: 32 creatures, 19 with toughness ≤2, 15 with power ≤1 (average 1.66);
24 of the 28 ramp/draw/utility cards were creatures; 4 real answers to a wipe (Counterspell, Dovin's Veto,
Teferi's Protection, Clever Concealment); 13 crew/station win conditions against 3 wipe-proof sources of
crew (Shorikai, Urza's Saga, Mech Hangar). Verdicts that expired:
- *"Vehicles dodge sorcery-speed wipes, so the kill doesn't depend on Cap"* — true of the Vehicles, false in
  practice: nothing was left to crew them.
- *"Watershaper / Rescuer protect the creatures you leave tapped"* — Drumbellower and Unwinding Clock untapped
  them on every opponent's untap step, right before a sorcery wipe.
- *"Engine density over finisher density"* — the engine is exactly what the wipe removes.
- Extinguisher Battleship's ETB (4 damage to each creature) killed every creature in the list, Cap included.

### Options weighed

- **Drop to Bracket 2 — rejected.** Bracket 2 allows zero Game Changers (Wizards, Commander Brackets beta),
  which removes Teferi's Protection, Cyclonic Rift and Fierce Guardianship — the protection and the reset —
  and the pilot's tables are Bracket 3. It would not make the board less fragile.
- **Rebuild as a blink deck — rejected as the primary plan** (mtg-rules-expert, CR 2026-08-07). A blinked
  creature *is* new for Cap's first-tap check (400.7; phasing is not, 702.26d), but: it returns summoning-sick,
  so the fresh taps are crew/station/convoke only (302.6); every repeatable blinker (Thassa, Soulherder,
  Teleportation Circle, Conjurer's Closet) and every delayed return happens at the end step, after both main
  phases; the one repeatable instant-speed blinker, Deadeye Navigator, makes unbounded loops with Relic of
  Legends alone or with Elixir plus mana creatures. EDHREC: Blink theme on 3 of 1,757 Captain America, Living
  Legend decks. Blink kept as **protection and ETB value**, not as the tap engine.
- **Counter-heavy protection — reduced.** First draft had Mana Drain and An Offer You Can't Refuse; the pilot
  preferred protection that lets wipes resolve one-sided. Replaced by Eerie Interlude and Akroma's Will.
  Fierce Guardianship kept: free with Cap out, and it stops targeted removal on Cap.

### Swaps

Each cut was the weakest card in its section, scored against the current list.

| Out | In | Grounds |
|---|---|---|
| Enlightened Tutor *GC* | Fierce Guardianship *GC* | GC for GC. Tutor is card disadvantage aimed at a Vehicle, which is the card a wipe leaves dead; FG is a free counter while Cap is out. |
| Intrepid Hero | Flawless Maneuver | 3-mana 1/1, conditional removal → free team indestructible with Cap out. |
| Drumbellower | Guardian of Faith | Untapper that switched off Watershaper/Rescuer protection → flash phasing, beats every wipe type, keeps counters and tokens. |
| Parhelion II | Eerie Interlude | 8-drop in a deck wiped on turn 4–5 → targeted blink that beats exile wipes. |
| Gideon's Lawkeeper | Akroma's Will | 1/1 tapper → both modes with Cap out: protection on their turn, double-strike kill on yours. |
| Unwinding Clock | Faith's Reward | Zero standalone value → returns everything that died this turn. |
| Extinguisher Battleship | Hangarback Walker | Self-wipe → a wipe turns it into flying crew. |
| Archivist | The Wandering Emperor | 4-mana 1/1 draw-one → flash planeswalker, a 2/2 every turn or exile a tapped attacker. |
| Steel Overseer | Gideon, Ally of Zendikar | Iron Spider does its job and also counters Vehicles → a 2/2 every turn. |
| Eiganjo, Seat of the Empire | Castle Ardenvale | W for W: channel removal → a 1/1 every turn from a land. |
| Inventors' Fair | Mishra's Factory | C for C: artifact tutor → a land that becomes a 2/2 artifact creature and crews. |
| Rogue's Passage | Command Beacon | C for C: unblockable → puts Cap in hand, recast for 3 without tax. |
| Apprentice Wizard | Solemn Simulacrum | 0 power (its free first tap can't crew or station), needs {U} per use → ramps on entering, draws on dying. |
| Iron Lad, Diverging Destiny | Restoration Angel | Draws only off an artifact on top → flash 3/4 flier, crews 3, saves a creature, mid-turn blink for fresh crew taps. |
| Into the Flood Maw | Skyclave Apparition | Temporary bounce → permanent exile (MV ≤4) on a body that crews. |

Sections re-grouped: Tutors (now empty) and Untappers removed; new *Wipe-Proof Crew & Recovery (4)* and
*Protection — Let the Wipe Resolve (8)*; Thousand-Year Elixir moved to *Counters, Crew & Haste*.

### Considered and not taken (grounds)

- **Ghostway** — exiles tokens (gone for good, CR 111.7) and Spacecraft at threshold (counters reset, 122.2).
- **Semester's End** — does Eerie Interlude's job for 4 mana instead of 3.
- **Unbreakable Formation** — Flawless Maneuver does the same for free with Cap out.
- **Brago, King Eternal** — the only card that refreshes the whole board's taps mid-turn, but only after it
  connects as a 2/4 flier; kept as a flavour option.
- **Mithril Coat** — protects Cap only; the failure was the whole board.
- **Brought Back / Return to the Ranks** — two permanents; X creatures with no creatures left to convoke it.
- **Mana Drain / An Offer You Can't Refuse** — pilot preferred let-it-resolve protection (above).

### Before → after

| | Before | After |
|---|---|---|
| Answers to a wipe | 4 | 10 (7 let it resolve, 3 counter it) |
| …that also beat exile wipes | 4 | 7 |
| Wipe-proof sources of crew | 3 | 8 |
| Cards costing 7+ | 3 | 1 (Reaver Titan) |
| Creatures with toughness ≤2 | 19 | 16 |
| Game Changers · mana sources | 3 · 41 | 3 · 41 |

**Untested** as of 2026-09-16.

## 2026-09-16 — `DECK-ENGINE.md` rebuilt as Tap → Tokens → Drain (14 swaps)

Pilot, after the resilience pass: *"how do you win with this deck? … i have a 20/20 on the board and a 6/10
on the board and it's turn 6 and i can't win like that dude. doesn't matter how big these vehicles are its
unwinnable"* — and offered two directions: a tap→draw engine into non-creature game-enders, or voltron.
Approved reworking ENGINE in place. Snapshot: `versions/2026-09-16-engine-before-token-drain-pass.md`.

### The diagnosis

A 20/20 attacks **one** opponent and is chump-blocked by a 1/1; a 3-opponent pod holds 120 life. Big
bodies were never a clock. The fix is damage that reaches all three opponents at once, which in W/U means
drain keyed to something the deck already does — not combat.

- **Throne of the God-Pharaoh** {2}: each opponent loses life equal to your tapped creatures at your end step.
- **Psychosis Crawler** {5}: each opponent loses 1 per card drawn.
- **Halo Fountain**: untap fifteen tapped creatures → win outright.

Voltron was rejected on the same axis: 21 commander damage kills **one** opponent, so it needs three
separate connections with a 3/4 base commander — single-target damage, the same disease as the Vehicles.
`DECK-COUNTERS.md` already holds that build. Of the true alt-wins in W/U (Approach of the Second Sun,
Halo Fountain, Jace Wielder of Mysteries, Mechanized Production, Test of Endurance, Triskaidekaphile) only
about six are playable, and each is a blank until it wins — so the list takes scaling drains plus one
alt-win, not the "~10 game enders" the pilot first suggested.

### Swaps (14)

| Out | In | Grounds |
|---|---|---|
| Dawnsire, Sunstar Dreadnought | Throne of the God-Pharaoh | 20 station counters for a chump-blockable body → the win condition |
| Salvation Engine | Psychosis Crawler | crew 6 for a 6/10 with no evasion → drain per draw |
| The Thanos-Copter | Halo Fountain | 6 mana, weaker with fewer Vehicles → tokens, draw, and an outright win |
| Mu Yanling, Wind Rider | Anointed Procession | flying for Vehicles that are no longer the plan |
| Shuri, Wakandan Inventor | Mondrak, Glory Dominus | copies a Vehicle we no longer need → doubler on a 4/4 |
| Harmonized Trio | Belladonna Took | 3 taps for a Brainstorm → token payoff (life, card, team counters) |
| Urianger Augurelt | Stonybrook Schoolmaster | slow card advantage → a token every time it becomes tapped |
| Vedalken Engineer | Pestered Wellguard | **also removes the one infinite** (see audit) → token on tap, with flying |
| Ornithopter of Paradise | Springleaf Drum | 0 power can't crew or station → taps a token for mana |
| Iron Spider, Stark Upgrade | Court of Grace | counters we no longer build around → a flier every upkeep + monarch |
| Uthros Research Craft | Adeline, Resplendent Cathar | 12 counters to matter → a **tapped** token per opponent per attack |
| Stroke of Midnight | Secure the Wastes | instant-speed wide board |
| Grand Architect | Opposition | artifact-only mana, blue-only lord → free unlimited tapping, the deck's best card |
| Thousand-Year Elixir | Myrel, Shield of Argive | haste for abilities matters less (crew and becomes-tapped ignore summoning sickness) → artifact Soldiers + opponents can't act on your turn |

### Reversal recorded

The founding entry rejected an Opposition tapper-prison shell **on pod grounds** ("pods kill stax on
sight"). Both Opposition and Myrel are now in, at the pilot's explicit instruction: *"no ask me next time,
i'm okay to put both myrel and opposition in."* The pod note stands as a rating input, not a veto; the
lesson recorded is to name such cards and let the pilot choose rather than filtering them out silently.

### Loop audit (mtg-rules-expert, CR 2026-08-07)

Found one genuine infinite, already removed by these swaps: **Halo Fountain + Ioreth + Vedalken Engineer**
is free unbounded card draw — the Engineer's mana may "activate abilities of artifacts" and Halo Fountain
is an artifact, so the cycle nets 0 mana and +1 card; with Psychosis Crawler it is a deterministic kill.
Also: **Marvin + Ioreth** untap each other free forever (Marvin lives in `DECK.md` — never add Ioreth there).

Everything else is bounded: Halo Fountain ⇄ Ioreth costs {W} per token / {W}{W} per card, Opposition only
ever *taps* (untaps are the scarce resource), and token doublers are replacement effects that multiply
output only (CR 614.1a/614.5/614.16). No mandatory loops. The five-item never-add list is in the list header.

### Technique the audit surfaced

Cap **fights** Throne: he untaps the first tap, so a board tapped once counts zero. Two free fixes — crew
the same Vehicle twice (no frequency limit, 702.122a), and Opposition targeting the creature that pays its
cost (targets locked at 601.2c before costs at 601.2h, so the untap resolves first and the ability re-taps
it). Tokens that ENTER tapped are exempt from Cap's trigger (603.2e) and count for free.

### Before → after

| | Before | After |
|---|---|---|
| Damage reaching all 3 opponents per turn | Reaver Titan only (15, needs an attack) | 33–81 from Throne alone, no attack needed |
| Token sources · doublers | 5 · 0 | 13 · 2 |
| Free second-tap outlets | crew only | crew + Opposition |
| Cards costing 7+ | 1 | 1 |
| Game Changers · mana sources | 3 · 41 | 3 · 41 |

**Untested** as of 2026-09-16.

## 2026-09-16 — `DECK-ENGINE.md` goes fully non-combat (6 swaps)

Pilot: *"i would prefer to win without combat tbh, i don't think we have enough firepower to win through
combat."* Approved. Snapshot: `versions/2026-09-16-engine-before-nocombat-pass.md`.

### Grounds

The previous pass left seven ways to close, four of which needed an unblocked attacker (Reaver Titan,
Akroma's Will's double-strike mode, Adeline, Myrel). This deck taps its creatures out for Throne and
therefore cannot reliably attack *or* block — so attack-triggered payoffs are dead weight. Cut them and
spend the slots on closers that need no board contact, plus tutors for the three artifact drains, which
the 2026-09-16 token pass had left unfindable after cutting both Enlightened Tutor and Inventors' Fair.

Access math: 3 specific cards in 99 is ~32% to have seen one by turn five; 6 closers plus 3 tutors is ~70%.

### Swaps

| Out | In | Grounds |
|---|---|---|
| Reaver Titan | Approach of the Second Sun | 7 mana that has to connect → cast twice, win, no board needed |
| Skysovereign, Consul Flagship | Jace, Wielder of Mysteries | attack-triggered ping → converts the deck's decking risk into a win |
| The Indomitable | Monument to Endurance | draws on combat damage → 3 from each opponent per turn off the deck's constant looting |
| Adeline, Resplendent Cathar | Tribute Mage | tokens only on attack → finds Throne (MV 2), on a body that crews |
| Court of Grace | Fabricate | monarch in a deck that taps out its blockers hands the crown straight back → finds any of the three |
| Silver Myr | Trophy Mage | marginal mana → finds Halo Fountain / Monument (MV 3) |

### Kept deliberately

- **Vehicles (3)** — crewing never requires attacking; Smuggler's Copter (crew 1) and Royal Talon Fighter
  Jet (crew 2) are the cheap way to tap the whole board for Throne. Kotori makes them crew 2.
- **Myrel** — kept for the static (opponents can't cast or activate during your turn, so the Throne pass is
  uninterruptible). Her attack-triggered Soldiers are now a bonus that will rarely be collected.
- **Akroma's Will** — kept as protection (indestructible + protection from each colour), not as a finisher.

Mana sources 41 → 40. **Untested** as of 2026-09-16.

## 2026-09-16 — Persistent Petitioners package added (5 slots)

Pilot: *"yeah let's add persistent petitioners as well."* Snapshot: `versions/2026-09-16-engine-before-petitioners.md`.

### Why it fits

Petitioners' second ability — "Tap four untapped Advisors you control: Target player mills twelve cards" —
is a **free** tap outlet with a payoff, and Cap refunds each Advisor's first tap, so four Petitioners give
eight tap events = two activations = **24 cards a turn**, or **48 under Bruvac the Grandiloquent**. The same
four bodies then sit tapped at end step and add 4 damage to *each* opponent through Throne of the
God-Pharaoh, so the package pays into both plans. They are also 1/3 blockers, which this deck otherwise
lacks once it taps out.

**Four is the minimum viable count** — the ability needs four Advisors, and Cap is a Soldier, not an
Advisor. At three Petitioners the ability is off until you rebuild. Scaling to 8+ roughly doubles the rate
(6 cards per Petitioner per turn, 12 under Bruvac) but starts crowding the drain plan; that belongs in a
dedicated list rather than here.

### Cuts

| Out | Grounds |
|---|---|
| Sanwell, Avenger Ace | digs six for a Vehicle or artifact creature — only two Vehicles left after the non-combat pass |
| Royal Talon Fighter Jet | second cheap crew outlet; Smuggler's Copter (crew 1) plus Opposition already cover tapping |
| Solemn Simulacrum | ramp/value with no tap relevance |
| Secure the Wastes | its tokens enter untapped and need tapping before they do anything |
| Split Up | Winds of Abandon overloaded is the one-sided sweeper; a tapped board makes Split Up awkward |

**Caveat:** "target player mills twelve" hits **one** opponent, so milling out a pod is three separate
jobs (~300 cards). Treat mill as a way to remove one player, not as the table kill — Throne and Psychosis
Crawler remain the cards that hit everyone at once.

Validated: 100 cards · 40 mana sources · 3 Game Changers · 91/91 found, no legality or identity flags.
**Untested** as of 2026-09-16.

## 2026-09-16 — `DECK-PETITIONERS.md` founded: Persistent Petitioners mill

Pilot's brief: *"purely focus on milling everyone, including me if it helps me win … the only cards we
should keep are ones that help me draw into more petitioners or things that let me play petitioners for
free like the guy that let you exile things from the top of your library and play them and Ioreth of the
healing house that can help me untap some petitioners and/or other advisors."* Grand Arbiter Augustin IV
approved explicitly. Fourth list in the folder; the other three are untouched.

### The engine

Petitioners' second ability taps **four Advisors** (not four Petitioners), and Cap refunds each Advisor's
first tap — so the same four activate twice. The build therefore maximises *Advisors*, not copies: 8
Petitioners plus 9 other Advisors, each doing a second job.

- **Bruvac the Grandiloquent** is a Human Advisor — the mill doubler is itself engine fuel.
- **Urianger Augurelt** (the "exile off the top and play it" card the pilot meant) and **Jacob Hauken,
  Inspector** (draw + exile face down, flips to cast them free) are both Advisors and both tap, so Cap
  doubles them.
- **Masako the Humorless** — "tapped creatures you control can block as though they were untapped" —
  answers the structural weakness every Cap build in this folder has had: the board sits tapped and cannot
  block. Also an Advisor.
- **Omen Hawker** taps for mana spendable only on abilities, which pays Petitioners' own "{1}, {T}: mills a
  card". **Azor's Elocutors** is an Advisor that wins the game by itself. **Mavinda** casts an
  instant/sorcery from the graveyard once a turn. **Ledger Shredder** connives.

Rate: 17 Advisors → 34 tap events → 8 activations of mill-12 per turn at full board; realistically 4
activations (48 cards), 96 under Bruvac.

### Why no Millstone family

The audit's most useful structural finding: **Cap only doubles creatures with {T} abilities.** Artifacts,
lands and sorceries get nothing from the commander, so Codex Shredder, Millstone, Keening Stone, Grindstone,
Grinding Station and Helm of Obedience were all passed over in favour of creature mill — Cathartic Adept,
Vantress Gargoyle, Zellix, Stitcher Geralf, Emry — which activate twice a turn. Mesmeric Orb is the
exception that earns its slot: it is the payoff that turns every Cap untap into a self-mill, and every
opponent's untap step into an opponent mill.

### Self-mill is a resource, not a cost

Raise the Past returns **every** creature card with mana value 2 or less from the graveyard — i.e. every
milled Petitioner, all at once. Return to the Ranks and Dawn do the same in smaller portions. Dig Through
Time delves the pile. This is why milling yourself is on-plan rather than a risk.

### Loop audit (mtg-rules-expert, CR 2026-08-07) — no unbounded loops

**Ioreth is the only untapper in the list**, because Kelpie Guide + Ioreth is a free two-card infinite untap
(the same shape as Marvin + Ioreth), and with Mesmeric Orb that is an instant mill-out and an Oracle win.
Never add Kelpie Guide, Marvin, Aphetto Alchemist, or **Basalt Monolith** (net-zero-mana self-untapper →
infinite self-mill with the Orb). Painter's Servant (with Grindstone) and Rest in Peace (with Helm of
Obedience) are both deterministic library-emptying two-card combos and both legal in W/U — kept out.
Thousand-Year Elixir loops with Ioreth at {1} a cycle: bounded, but omitted as one card from a real combo.

Rulings that shape play: an empty library only loses you the game when you *attempt to draw* (104.3c,
704.5b — a state-based action you cannot respond to), so empty out after your draw step; Thassa's Oracle is
the safest win because it checks on resolution with no draw. Zellix makes one Horror per mill **event**, not
per creature card (603.2c). With Bruvac and The Water Crystal both out, the milled opponent chooses which
replacement applies first (616.1) — plan on the smaller number.

### Open choices

The pilot had not yet answered two questions when the list was drafted; defaults taken, both trivial to
change: **8 Petitioners** (scaling to 12 is a straight swap against the draw suite) and **Rhystic Study** as
the third Game Changer over Cyclonic Rift. Negate was cut for Mind Stone to clear the 40-source floor.

**Untested** as of 2026-09-16.

## 2026-09-16 — `DECK-MILL.md` founded: pure Petitioners mill (fifth list)

Pilot: *"can you build me another deck which is just purely mill using petitioners as many of them as
possible while keeping the cards that make opponents mill more than they should."* Built as a separate
list; the other four are untouched.

### The build

**35x Persistent Petitioners**, legal under the card's own "a deck can have any number" clause. No
self-mill, no Thassa's Oracle, no Vehicles, no token package — mill the table out and nothing else.

Rate: "Tap four untapped Advisors: target player mills twelve." Cap refunds each Advisor's first tap, so
the same four activate twice — **6 cards per Advisor per turn**, 12 under Bruvac. Four Advisors on board =
24/turn (48 with Bruvac); eight = 48 (96); twelve = 72 (144). "Target player" is singular, so a pod is
~297 cards and three separate jobs.

**The three amplifiers** are everything W/U has that makes opponents mill more than a card says:
Bruvac the Grandiloquent (double — and himself a Human Advisor, so he feeds the engine), The Water Crystal
(+4, plus a tap ability milling each opponent for your hand size), Fraying Sanity (again at each end step,
counting everything that reached that graveyard from anywhere). Per CR 616.1 the milled opponent picks
which replacement applies first with two out, so the deck is costed on the smaller number.

**Support kept only where it keeps the engine alive:** Masako the Humorless (tapped creatures block as
though untapped — this deck taps its whole board every turn, and she is an Advisor), Adept Watershaper
(those tapped Petitioners become indestructible), Ghostly Prison + Propaganda, Raise the Past and Return to
the Ranks as the post-sweeper reset (every Petitioner is mana value 2), six interaction, four protection,
four draw, Omen Hawker for ability mana.

### Deliberately absent

- **Mesmeric Orb** — your own untap step untaps everything you control, so it mills you faster than them,
  and this list has no Laboratory Maniac insurance. It belongs in `DECK-PETITIONERS.md`, which does.
- **Kelpie Guide / Marvin / Aphetto Alchemist / Basalt Monolith** — infinite untap loops (2026-09-16 audit).
- **Painter's Servant** (with Grindstone) and **Rest in Peace** (with Helm of Obedience) — deterministic
  two-card library-emptying combos, both legal in these colours.

### The count, honestly

Past roughly 20 Petitioners the extra copies buy redundancy, not speed — four Advisors on the battlefield
is all the engine needs. The first draft ran 38 and came in at 37 mana sources; rebalanced to 35 lands +
5 rocks + 35 Petitioners to clear the 40-source floor, since a deck of 35 two-drops still has to hit its
land drops. A 20–24 copy version with more interaction would win more games, and is a straight dial-back.

Validated: 100 cards · 40 mana sources · 2 Game Changers · 48/48 found, no legality or identity flags.
**Untested** as of 2026-09-16.

## 2026-09-16 — `DECK-MILL.md`: mana from tapping creatures (7 changes)

Pilot: *"i think we need some cards to also generate blue mana or colorless mana whenever a creature gets
tapped"*, then chose Option B plus Springleaf Drum. Snapshot:
`versions/2026-09-16-mill-before-mana-package.md`.

### The finding

**No card in W/U reads "whenever a creature becomes tapped, add mana."** All eight search hits were
something else: Forsaken Monument amplifies colourless mana you tap *for*, Ultima only triggers on lands,
Phyrexian Atlas's becomes-tapped trigger is poison damage, Champions of the Shoal and Unctus have no mana
clause. The effect exists only in two shapes — mana creatures with "{T}: Add …", which Cap doubles, and
permanents that tap a creature as a *cost* for mana.

The second shape is the one that actually keys off Cap: tap a Petitioner for mana, Cap untaps it (first tap
of the turn), and it is still available for the tap-four-Advisors activation. Two of them are lands, so they
cost no spell slot.

### Changes

| Out | In | |
|---|---|---|
| 1x Island, 1x Plains | Holdout Settlement, Survivors' Encampment | "{T}, Tap an untapped creature you control: Add one mana of any color" — free, land slots |
| 4x Persistent Petitioners (35 → 31) | Palladium Myr, Silver Myr, Gold Myr, Hedron Crawler | each taps twice a turn under Cap; Palladium Myr is 4 colourless |
| Mind Stone | Springleaf Drum | half the cost, fixes colour, and taps a creature you were going to untap anyway — chosen over cutting a 32nd Petitioner |

### The trade, stated plainly

**None of the four mana creatures is an Advisor**, so they do not feed the mill-12 activation. Four
Petitioners is 24 mill a turn at full board (48 under Bruvac) traded for roughly 8 mana a turn, in a deck
whose headline ability costs zero mana. The pilot was told this and took the trade for castability and
for paying Petitioners' own "{1}, {T}: mills a card". Omen Hawker remains the only card in the colours that
is both a mana creature and an Advisor.

Validated: 100 cards · 44 mana sources · 2 Game Changers · no legality or identity flags · sections match.
**Untested** as of 2026-09-16.

## 2026-09-16 — `DECK-MILL.md`: mana creatures reverted, land-only version kept

Pilot: *"do you think we should do a instead? like we wouldn't have a problem with mana if we did a?"* —
then *"okay let's go back to a."* Snapshot: `versions/2026-09-16-mill-before-revert-to-lands-only.md`.

### Why the revert is right

**Mana was never the bottleneck.** The headline ability — "tap four untapped Advisors: target player mills
twelve" — costs zero mana. Mana in this deck only casts Petitioners and the amplifiers/protection, and pays
the secondary "{1}, {T}: mills a card", which is a bad rate (one card per mana against twelve cards for four
free taps).

**The bottleneck is Advisors on the battlefield.** A myr is a body that does not count toward the four, so
Palladium Myr / Silver Myr / Gold Myr / Hedron Crawler were four engine slots bought for roughly 10 mana a
turn that the engine does not spend — costing 24 mill a turn at full board, 48 under Bruvac.

**The cost-tap version is free.** Holdout Settlement and Survivors' Encampment are *land* slots, and
Springleaf Drum is one cheap artifact. All three convert a Petitioner's free Cap untap into mana without
touching the Advisor count. Kept.

### Net state after both passes

Relative to the founding list: 2 basics → Holdout Settlement + Survivors' Encampment, and Mind Stone →
Springleaf Drum (cheaper, fixes colour, and taps a creature you were going to untap anyway). Petitioners
back to 35.

### The counter-argument, recorded

Mana creatures do let you deploy Advisors faster — turn 3 myr into turn 4 double Petitioner — and deployment
speed *is* the real axis. That case was heard and rejected because five rocks (Sol Ring, Arcane Signet,
Talisman of Progress, Fellwar Stone, Springleaf Drum) already provide it without costing engine slots.
Re-derive this if the deck ever plays slow in practice rather than on paper.

Validated: 100 cards · 40 mana sources · 2 Game Changers · no legality or identity flags · sections match.
**Untested** as of 2026-09-16.

## 2026-09-16 — `DECK-MILL.md`: Drumbellower + cost reducers (4 swaps)

Pilot asked for "the card that untaps all our creatures on each opponent's untap step" and relayed an
analysis from a parallel session arguing that **casting** the Petitioners, not mana volume, is the
bottleneck. Both accepted. Snapshot: `versions/2026-09-16-mill-before-drumbellower-reducers.md`.

| Out | In | Grounds |
|---|---|---|
| 2x Persistent Petitioners (35 → 33) | Drumbellower, Urza's Incubator | — |
| Ponder, Preordain | Herald's Horn, Grand Arbiter Augustin IV *GC* | Horn's upkeep reveal partly replaces the cantrips and digs for Advisors specifically |

### Drumbellower is a 2.5x multiplier

"Untap all creatures you control during each other player's untap step." The tap-four-Advisors ability has
no timing restriction, so it can be activated on opponents' turns. Each Advisor goes from **2 taps a turn**
to **5 per rotation** (2 on yours, 1 on each of three opponents'). Eight Advisors: 48 a turn → 120 a
rotation, 240 under Bruvac. Cleared by the 2026-09-16 loop audit as a rate multiplier — untap steps are
turn-based actions, once per turn.

### Cost reducers beat mana creatures — why this trade differs from the reverted one

Herald's Horn and Urza's Incubator naming **Advisor** put every Petitioner at {U} (Incubator also drops
Bruvac to {U}); Augustin does the same and is an Advisor himself, taking the open third Game Changer slot.
A mana creature adds a body that cannot join the tap-four; a reducer makes all 33 Petitioners cheaper. That
is the distinction that made the myr package (reverted earlier the same day) wrong and this one right.

### Correction carried in from the parallel session

Cost-tap mana is **not** unconditionally free. With N Advisors on board you have 2N taps and floor(N/2)
activations, so an **even** count leaves zero spare taps and an **odd** count leaves exactly two. The earlier
claim that Springleaf Drum / Holdout Settlement mana costs nothing holds only when taps are going spare.
Refinement on that session's framing: this is a **board-state** check each turn, not a deckbuilding argument
for any particular Petitioner count.

### Rejected from that session's proposal

- **Lotus Field** — described there as "three mana from one land with hexproof", omitting *"When this land
  enters, sacrifice two lands."* A net −1 land, entering tapped, in a deck built to hit land drops and
  deploy two-drops. Trap here.
- **Ancient Tomb** — correctly flagged as a Game Changer; also 2 damage per activation in a deck that taps
  out and blocks poorly. The third GC slot went to Augustin instead.
- **Reflections of Littjara** — genuinely strong (copies every Petitioner cast into a token Advisor, two
  bodies per card) and the only card that attacks the real ceiling of cards-in-hand once costs drop. Left
  out pending the pilot's call; at {4}{U} it is the most expensive piece in the package.

Validated: 100 cards · 40 mana sources · 3 Game Changers · no legality or identity flags · sections match.
**Untested** as of 2026-09-16.

## 2026-09-17 — Lists renamed: `DECK-MILL.md` ⇄ `DECK-PETITIONERS.md`

The two names described **build order**, not content. `DECK-PETITIONERS.md` was the first build (8
Petitioners inside a 17-Advisor toolbox that mills itself and wins with Thassa's Oracle), and `DECK-MILL.md`
was the later "as many Petitioners as possible" list (33 copies, opponents only). The pilot noticed:
*"how come the mill deck is actually the one with the petitioners and not the one called petitioners?"*
Renamed at their instruction ("33-copy -> petitioners, 8-copy just mill"):

| Now | Contents | Was |
|---|---|---|
| `DECK-PETITIONERS.md` / `MOXFIELD-PETITIONERS.txt` | 33 Petitioners, pure opponent mill, Drumbellower + cost reducers | `DECK-MILL.md` |
| `DECK-MILL.md` / `MOXFIELD-MILL.txt` | 8 Petitioners, Advisor toolbox, self-mill, Thassa's Oracle / Jace / Lab Man | `DECK-PETITIONERS.md` |

**Reading older entries:** every entry above this one uses the OLD names. The `versions/*mill-before*`
snapshots are of the 33-copy list (now `DECK-PETITIONERS.md`). Card contents of both lists are unchanged by
the rename.

### Play report, corrected

The pilot's *"I love playing the petitioners deck"* (2026-09-17) refers to the **33-copy list** — confirmed
by asking. It had first been recorded against the 8-copy list because of the naming. The 33-copy list is
therefore the played, liked one; the 8-copy list remains untested. A paper comparison had called the 8-copy
list stronger (faster Oracle close, 12 vs 10 interaction, 7 vs 2 draw) — that is a list-derived verdict, and
the pilot's actual games outrank it until the 8-copy list has been played too.

## 2026-09-17 — Play report: `DECK-MILL` slow, `DECK-PETITIONERS` easy to assemble

Pilot, after playing both: *"i tried playing the deck-mill one and it does feel very slow. with the
petitioners one it's quite easy to get like 4 on the board already and i like the gimmick."*

- **`DECK-MILL` (8 copies) plays slow.** Consistent with its build: one untapper (Ioreth), no cost reducers,
  and only 8 Petitioners, so the tap-four-Advisors activation comes online late. It remains the list with
  the most self-mill tools and recursion, but that verdict is now second to the play report.
- **`DECK-PETITIONERS` (33 copies) reliably reaches four Advisors early.** This confirms the cost reducers
  (Herald's Horn, Urza's Incubator, Grand Arbiter Augustin IV) and the copy count are doing their job.

Direction set by the pilot: modify `DECK-PETITIONERS` to **win by milling itself, as fast and as optimally
as possible**, keeping the Petitioners engine. Package proposed the same day, pending approval.

## 2026-09-17 — `DECK-PETITIONERS.md` reworked to win by milling itself (9 swaps)

Pilot: *"i would like to maybe modify the petitioners one so i can mill myself as fast as possible as
optimally as possible"*, then *"alright yeah make the swap."* Snapshot:
`versions/2026-09-17-petitioners-before-self-mill.md`.

### Why self-mill, on this list

The pilot's favourite (easy to get four Advisors out early) had no way to win by milling itself — no
Thassa's Oracle, Jace or Lab Man. The self-mill route only has to empty ONE library (~88 cards by turn 5)
instead of three (~297), and Raise the Past already in the list returns every creature with mana value 2 or
less, which includes Thassa's Oracle as well as every Petitioner.

### Swaps

| Out | In | Grounds |
|---|---|---|
| Rhystic Study *GC* | Thassa's Oracle *GC* | the safest self-mill win; extra draws matter less once you are emptying your own library, and near zero they are a hazard. Teferi's Protection kept as the board's wipe answer. |
| The Water Crystal | Jace, Wielder of Mysteries | Water Crystal only affects opponents; Jace turns a draw from an empty library into a win |
| Bruvac the Grandiloquent | Laboratory Maniac | Bruvac only doubles opponent mill; a Petitioner is a better Advisor for this plan since it can target you |
| 6x Persistent Petitioners (33 → 27) | Mathemagics, Traumatize, Mesmeric Orb, Sevinne's Reclamation, Snapcaster Mage, Muddle the Mixture | see below |

- **Mathemagics** — pilot-suggested. Two jobs: with Jace/Lab Man out it wins without milling to exactly zero
  (draws are individual, CR 121.2); aimed at a milled-out opponent, X=0 kills them immediately for {U}{U}
  (CR 121.4) instead of waiting for their draw step. Mana value 2, so Muddle the Mixture finds it.
- **Traumatize** — half your library in one card.
- **Mesmeric Orb** — mills you on every untap and each opponent on theirs; with Drumbellower, on every turn.
- **Sevinne's Reclamation** — the only recursion here that works straight from the graveyard (flashback),
  so the only line that needs nothing in hand.
- **Snapcaster Mage** — recasts a milled Raise the Past, Return to the Ranks or Mathemagics.
- **Muddle the Mixture** — transmutes for the Oracle or Mathemagics.

### What the pilot needs in hand (the question that shaped the package)

Once your library is empty, every card you own is in hand, graveyard or on the battlefield, so the Oracle is
always reachable. Oracle in hand → cast it. In the graveyard → Raise the Past / Return to the Ranks from hand
(no flashback). Recursion spell milled too → Snapcaster from hand. Hand empty → Sevinne's Reclamation from the
graveyard. The reliable play is to hold one card.

### Risks recorded

- **Draw-step trap** (ledger 2026-09-17): Mesmeric Orb's untap-step mills resolve in the upkeep, before the
  draw; with Drumbellower and a self-targeted Fraying Sanity the library can empty between turns, and the
  Oracle cannot be cast in time. Jace or Lab Man must be out first.
- **Mesmeric Orb is now in the list**, so any infinite untap becomes an instant Oracle win. Never-add list in
  the header: Basalt Monolith; any two of Ioreth / Kelpie Guide / Marvin / Aphetto Alchemist; Thousand-Year
  Elixir beside one of those; Painter's Servant; Rest in Peace. No loop exists with the current list — the
  only untap effects are Cap and Drumbellower. Snapcaster + Raise the Past is bounded: flashback exiles it.
- **Opponent mill is weaker** without Bruvac and The Water Crystal — but every Petitioner still targets
  anyone, and Mathemagics now closes out decked opponents immediately.

Validated: 100 cards · 40 mana sources · 3 Game Changers (Augustin, Teferi's Protection, Thassa's Oracle) ·
no legality or identity flags · sections match. **The self-mill version is untested.**

## 2026-09-17 — `DECK-PETITIONERS.md`: Dusk // Dawn in for Winds of Abandon

Pilot asked: *"assume i don't have any of the raise the past, jace, lab maniac in my hand and don't draw
them by turn 5-6-7. can i start milling myself and pick them up from the graveyard?"* — then approved the
swap. Snapshot: `versions/2026-09-17-petitioners-before-dusk-dawn.md`.

### Grounds

Audit of where each win piece can be used from: Raise the Past and Return to the Ranks are **hand-only**;
Jace, Wielder of Mysteries (a planeswalker) cannot be returned by anything in the list; Lab Man only by
Sevinne's Reclamation; Snapcaster Mage must be cast from hand. That left **Sevinne's Reclamation as the only
empty-hand win route** — a single point of failure if it has been used or is countered.

**Dawn** (Aftermath — "Cast this spell only from your graveyard") returns every creature card with power 2
or less to hand: the Oracle (1), Lab Man (2) and every Petitioner (1). It is a second graveyard-only route,
7 mana including recasting the Oracle, and it reloads the Advisor engine at the same time.

**Why Winds of Abandon, not a Petitioner:** Dusk (the front half) is itself a sweeper — creatures with power
3 or greater — and on this side of the table only Adept Watershaper and Guardian of Faith die to it. So the
swap keeps a board wipe while adding the recursion, and the Petitioner count stays at 27.

### Also recorded in the list header

Thassa's Oracle wins before zero: each Petitioner on the battlefield is 1 blue devotion and the Oracle is 2,
so ten Petitioners out wins at 12 cards left. With the Oracle in hand, stop there as a buffer against the
upkeep self-mill trap; with it still in the library, mill to zero so it is guaranteed reachable.

Validated: 100 cards · 40 mana sources · 3 Game Changers · no legality or identity flags · sections match.

---

## 2026-09-28 — Reality Fracture (FRA/FRC) set review: four swaps applied

Full review: `research/fra-set-review-2026-09-28.md` (148-card pool × 5 lists). The pilot approved
these (snapshots under `versions/2026-09-28-1602-*`):

- **`petitioners`: Cruel Calculations in, one Persistent Petitioners out (27 → 26).** It draws X, where
  X is the number of cards milled from the target player's library this turn. With Jace or Lab Man
  out, drawing from your own emptied library wins. The list had one draw card.
- **`petitioners`: Generous Revival in, Return to the Ranks out.** A third graveyard-castable
  recursion piece (flashback) beside Sevinne's Reclamation and Dawn. It returns Thassa's Oracle or
  Lab Man straight to the battlefield.
- **`engine`: The Theorist, Jace Beleren in, Fallowsage out.** A draw engine that survives the
  creature wipes that ended the pilot's games. Each draw on an opponent's draw step is also a
  Psychosis Crawler ping.
- **`counters`: Yoshimaru, Beloved Companion in, Bard the Bowman out.** +1 counter on every
  placement. **Combo flag:** Heliod, Sun-Crowned + Walking Ballista now works from X=1, because
  Ballista enters with X+1 (CR 614.1c / 122.6). That is a chosen-N loop under the pilot's policy.

**Declined: Grand Crescendo for Akroma's Will in `engine`.** Pilot: *"akroma is giving us protection
which grand crescendo isn't."* The review had called the flying/double-strike mode dead in a
non-combat list, but Akroma's other mode (lifelink, indestructible and protection from each colour) is
what the pilot values.

Validation: all three changed lists clean, legal and on-identity, 100 cards each.
