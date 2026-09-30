# Ledger: Tapping and untapping

Tap abilities and tap costs, "becomes tapped" triggers, untappers and untap engines, summoning sickness and haste. Entry format and capture rules: `../SKILL.md` §4.
Search every topic at once with `bun run lookup "<card | rule number | term>"`.

---

### Summoning sickness never blocks being tapped by an effect {#tap-001}

**Kind:** ruling · **Verified:** 2026-08-19 against CR 2026-08-07
**Cards:** Charismatic Conqueror
**Rules:** 302.6, 603.6a, 608.2d, 701.26a, 702.10b, 702.10c, 702.20b
**Claim:** A creature cast this turn can be tapped by any spell or ability effect. "Summoning
sickness" restricts exactly two things — the creature attacking, and its controller activating
the creature's own abilities with {T}/{Q} in the cost — and nothing else. So Charismatic
Conqueror's *"enters untapped → they may tap that permanent"* choice works on a just-cast
creature.
**Evidence:** CR 302.6 — the full restriction is "can't attack" + "activated ability with the tap
symbol or the untap symbol in its activation cost can't be activated"; CR 702.10b–c (haste) lift
exactly those two and nothing more. Tapping is a keyword action whose only precondition is that
the permanent is untapped (CR 701.26a). The Conqueror trigger is an ETB trigger (CR 603.6a); the
tap-or-token choice is made on resolution (CR 608.2d). Vigilance doesn't protect the entering
creature — it only stops tapping from attacking (CR 702.20b). If the permanent enters already
tapped, the trigger never fires at all ("enters untapped").
**Changes:** When evaluating tax pieces of this shape, price the real cost to each opponent: a
vanilla creature was summoning-sick anyway, so tapping it mostly costs them **blocking** before
their next turn plus any non-{T} uses; against haste creatures and mana dorks the tap is a full
turn's tempo. Conversely never discount a tap effect because the target "just came down."
**See also:** tap-025
**Source:** scarlet-witch session (2026-08-19) — user asked whether Charismatic Conqueror can tap
freshly cast creatures.

### Tap-gated removal needs the deck to make OPPONENTS tap — the mirror of the attack-trigger rule {#tap-002}

**Kind:** pattern · **Recorded:** 2026-08-24
**Cards:** Royal Assassin; Icy Manipulator; Queen Marchesa; Thantis, the Warweaver; Xantcha, Sleeper Agent; The Beamtown Bullies; Ramses, Assassin Lord; No Mercy; Crawlspace; Terminate; Blasphemous Act; Toxic Deluge; Fraying Omnipotence
**Claim:** A repeatable removal ability gated on the target being tapped (Royal Assassin, and the
Icy-Manipulator-plus-Assassin family) is only real in a deck that *causes* opponents' creatures to
tap: goad, forced combat, or its own tapper. In a deck that neither attacks nor goads, the gate is
supplied only by opponents choosing to attack, which the deck cannot schedule.
**Evidence:** Royal Assassin — "{T}: Destroy target tapped creature" — sits at 1% site-wide
inclusion, and its top commanders are all forced-combat or Assassin-tribal (Queen Marchesa,
Thantis the Warweaver, Xantcha, The Beamtown Bullies, Ramses). Mirror of the 2026-08-04 entry
"A card that requires attacking is dead in a deck that doesn't attack": that one tests *your*
behaviour, this one tests *theirs*.
**Changes:** For any "target tapped/attacking/blocking creature" effect, ask which card in the
list creates that state. If the answer is "an opponent's free choice", it is a rattlesnake, not
removal — price it against dedicated deterrents (No Mercy, Crawlspace), not against Terminate.
Second, stacked check: a 1/1 utility body must survive the deck's own sweepers — three wipes in
lord-of-pain (Blasphemous Act, Toxic Deluge, Fraying Omnipotence) each kill it.
**See also:** tap-004, eval-003
**Source:** lord-of-pain (2026-08-24) — "should we run Royal Assassin?"

### A tapped permanent is a legal target for "tap target …" — the rider still happens {#tap-003}

**Kind:** ruling · **Verified:** 2026-09-02 against CR 2026-08-07
**Cards:** Inquisitor Greyfax; Sharae of Numbing Depths; Hylda of the Icy Crown; Verity Circle; Icy Manipulator; Hylda's Crown of Winter
**Rules:** 101.3, 601.2c, 602.2b, 608.2b, 608.2c, 701.26a
**Claim:** Pointing a "tap target creature" ability at an *already tapped* creature is legal: the
ability resolves, the tap does nothing, and every rider attached to it (draw, investigate, counter)
still happens. But payoffs worded "becomes tapped" or "untapped creature" do **not** trigger.
**Evidence:** Four rules, in order. **CR 601.2c** (applied to abilities by **602.2b**) — the target
must be "an appropriate object", and appropriateness is only what the ability states; Inquisitor
Greyfax says "target creature an opponent controls", which says nothing about tapped status, so a
tapped creature is a legal choice. **CR 608.2b** — on resolution the target is re-checked and is
still legal, so "the spell or ability will resolve normally." **CR 701.26a** — *"Only untapped
permanents can be tapped"*, so the tap accomplishes nothing. **CR 101.3** — *"Any part of an
instruction that's impossible to perform is ignored"* — only that part. **CR 608.2c** — remaining
instructions are followed in the order written, so Greyfax's separate sentence "**Investigate.**"
still happens. Contrast the payoff wordings, which read the *event* rather than the instruction and
therefore do NOT fire: Hylda of the Icy Crown *"Whenever you tap an **untapped** creature an
opponent controls"*, Verity Circle *"Whenever a creature an opponent controls **becomes tapped**"*.
**Changes:** Before claiming this of a card, check the rider's grammar — it must be an unconditional
separate instruction. It holds for Greyfax (`Tap target creature an opponent controls.
**Investigate.**`) and for Sharae of Numbing Depths' ETB (`tap target creature an opponent controls
**and** put a stun counter on it` — the stun counter lands on an already-tapped creature, locking it
down). It is **not** a claim about bare tappers with no rider at all (Icy Manipulator, Hylda's Crown
of Winter — nothing to collect), and it fails for any rider gated on "if you do" / "when you do", or
written as a separate trigger keyed on "becomes tapped" / "untapped creature". Practical line: farm
unconditional riders off already-tapped creatures, but spend taps on **untapped** ones first when a
tap-payoff is also on board — the payoff is the scarce resource, not the tap.
**See also:** tap-004, tap-008
**Source:** inquisitor-greyfax (2026-09-02) — founding the Esper tap/untap deck.

### Goad and forced attacks do NOT feed "whenever you tap" payoffs {#tap-004}

**Kind:** ruling · **Verified:** 2026-09-02 against CR 2026-08-07
**Cards:** Hylda of the Icy Crown; Sharae of Numbing Depths; Verity Circle; Royal Assassin; Sunblast Angel; Meekstone
**Rules:** 508.1f
**Claim:** Making an opponent's creature attack taps it, but it does not satisfy any payoff worded
"whenever **you** tap", and the best "becomes tapped" payoff explicitly carves attackers out.
**Evidence:** Oracle text. Hylda of the Icy Crown: *"Whenever **you tap** an untapped creature an
opponent controls…"* — a goaded creature taps itself as a turn-based action during its controller's
declare-attackers step (CR 508.1f), so no player tapped it. Sharae of Numbing Depths uses the same
"whenever you tap" wording. Verity Circle states the exclusion outright: *"Whenever a creature an
opponent controls becomes tapped, **if it isn't being declared as an attacker**, you may draw a
card."*
**Changes:** "Tap their creatures" and "make their creatures attack" are two different decks that
look like one. Goad belongs with punishers that read the *state* — Royal Assassin (destroy target
**tapped** creature), Sunblast Angel, Meekstone — never with the "you tap" value engines. Check
which of the three wordings a card uses before filing it in a tap-matters deck: *you tap* /
*becomes tapped* / *is tapped*.
**See also:** tap-002, tap-003
**Source:** inquisitor-greyfax (2026-09-02) — the user proposed goad as a way to feed the tap payoffs.

### An untapper only reaches what its scope clause names — colour, creature and artifact untappers miss each other's permanents {#tap-005}

**Kind:** pattern · **Recorded:** 2026-09-02
**Cards:** Murkfiend Liege; Icy Manipulator; Hylda's Crown of Winter; Staff of Domination; Seedborn Muse; Unwinding Clock; Drumbellower; Shorikai, Genesis Engine; Captain America, Living Legend; Millstone; Codex Shredder; Keening Stone; Grindstone; Helm of Obedience; Cathartic Adept; Vantress Gargoyle; Zellix, Sanity Flayer; Stitcher Geralf
**Claim:** Read the *scope* clause on every mass-untap and mass-tap effect, and on every untapper
commander. Ones keyed to colour miss artifacts and off-colour permanents entirely, which in an
artifact-based engine is most of the board; "untap all creatures" and "untap all artifacts" are
near-disjoint, not substitutes; and an untapper commander only doubles the card types it can actually
untap.
**Evidence:**
- Murkfiend Liege — *"Untap all **green and/or blue** creatures you control during each other player's
  untap step."* In a deck whose tappers are Icy Manipulator, Hylda's Crown of Winter and Staff of
  Domination (all colourless artifacts) plus black assassins, it untaps almost nothing. Compare
  Seedborn Muse (*"Untap all permanents you control"*) and Unwinding Clock (*"all artifacts you
  control"*).
- Creature vs artifact untappers (2026-09-10): running both Drumbellower and Unwinding Clock is not
  doubling up; each reaches permanents the other cannot. Vehicles and Spacecraft are **artifacts, not
  creatures**, unless crewed or above their Station threshold — so a creature-untapper cannot untap an
  uncrewed Shorikai, Genesis Engine and its `{1},{T}: Draw two cards` ability. Conversely mana dorks,
  and any nonartifact creature with a `{T}` ability, are invisible to an artifact-untapper. Mana
  **rocks** are also artifacts-only, and untapping them is what makes instant-speed interaction on
  other players' turns actually payable.
- Untapper commander (2026-09-16): Captain America, Living Legend untaps *creatures* on *your* turn —
  oracle text "whenever a creature you control becomes tapped during your turn", confirmed locally with
  `bun run card`. Every artifact, land and sorcery in the deck gets nothing from the commander, so an
  artifact-based version of the same effect is worth half as much as a creature-based one:
  Millstone/Codex Shredder/Keening Stone/Grindstone/Helm of Obedience are single-activation cards
  here, while Cathartic Adept, Vantress Gargoyle, Zellix and Stitcher Geralf all activate twice per
  turn.
**Changes:** For any "untap all X" or "tap all X", write down which permanents in the current list
actually match X before scoring it. Check the *type line* of the permanents you actually need
untapped before deciding one untapper is enough — two near-disjoint untappers are the §2.5 "genuinely
multiplicative" case, not the substitute case. For any untapper commander, sort the candidate payoff
pool by card type first and drop the types the commander cannot untap — before comparing individual
cards on power. Same family as the colour-rider entries at "A lord keyed to COLOUR, not tribe, can wipe
your own tokens" and "A rider that counts COLORS is near-dead in a mono-color deck."
**See also:** tap-006, tap-012
**Source:** inquisitor-greyfax (2026-09-02) — costing green's contribution card by card;
cap-living-legend (2026-09-10), merged from "'Untap all creatures' and 'untap all artifacts' are
near-disjoint, not substitutes"; cap-living-legend (2026-09-16) — Petitioners mill build, merged from
"An untapper commander only doubles the card types it can actually untap".

### An "untap during each other player's untap step" effect is an engine MULTIPLIER — re-derive every {T} ability and mana rock {#tap-006}

**Kind:** pattern · **Recorded:** 2026-09-02
**Cards:** Unwinding Clock; Insight Engine; Sol Ring; Arcane Signet; Thran Dynamo; Gilded Lotus; Master Transmuter; Steel Overseer; Iron Spider, Stark Upgrade; Ultron, Artificial Malevolence; Drumbellower; Dazzling Theater // Prop Room; Arcanis the Omnipotent; Sanwell, Avenger Ace
**Rules:** 702.122a
**Claim:** Adding an "untap all X during each other player's untap step" effect (Drumbellower /
Unwinding Clock / Prop Room) is a **deck-wide verdict-invalidation event**, not a single card add, and
should be priced as roughly **4x on every tap ability you control**, not as insurance against being
tapped out. Every {T} ability in the deck silently multiplies by the number of opponents, and
tapped-out mana rocks become mana available on opponents' turns — re-score the whole list against it,
including cards already cut.
**Evidence:**
- iron-man V3 (2026-09-02) added Unwinding Clock (*"Untap all artifacts you control during each other
  player's untap step"*). Insight Engine (*"{2}, {T}: Put a charge counter on this artifact, then draw a
  card for each charge counter on it"*) had been valued on 2026-08-07 at one activation per turn and
  cut in the V2 package. With Clock it gets **four activations per cycle** with accumulating counters —
  1+2+3+4 = 10 cards, then 26. The same Clock refreshes Sol Ring {2} + Arcane Signet {1} + Talisman {1}
  + Thran Dynamo {3} + Gilded Lotus {3} = **10 mana at every opponent's untap step**, which pays for
  those activations out of mana the deck could never have spent on its commander. Three other cards
  moved off the standing cut list on the same pass (Master Transmuter = 4 free deploys/cycle; Steel
  Overseer / Iron Spider = +4/+4 on the team per cycle; Ultron's "mana sink you can't feed" grounds
  softened).
- cap-living-legend (2026-09-10): in a four-player pod there are three other untap steps per turn
  cycle, so each `{T}` ability fires four times a cycle rather than once. Measured: Arcanis the
  Omnipotent goes from 6 cards a turn to 15 a cycle; Sanwell, Avenger Ace from two impulse-6s to five.
  Crew has no timing restriction (CR 702.122a is an activated ability with no "only as a sorcery"), so
  it also enables instant-speed crewing to block on an opponent's turn.
**Changes:** After adding a mass untapper, grep the list for `{T}` and for mana rocks and re-derive
every one — including cards in the sideboard, because the effect can revive a card cut on rate. In any
deck with 5+ tap-activated abilities, rank these effects with the card-draw engines, not with the
protection suite. Corollary: they are the correct answer for a commander whose own ability is gated to
"during your turn." Same family as "An untapper keyed to COLOUR skips your colourless artifacts"
(tap-005): read the scope clause, then count what actually matches it.
**See also:** tap-005, tap-014, tap-018, equip-023, eval-039, eval-009
**Source:** iron-man (2026-09-02) — Insight Engine returning to V3; cap-living-legend (2026-09-10) —
Drumbellower is 45% of that commander's field and I benched it twice, merged from "An 'untap during
each other player's untap step' effect is an engine MULTIPLIER, not defence".

### A token copy of a mana rock is summoning-sick — mana abilities get no exemption {#tap-007}

**Kind:** ruling · **Verified:** 2026-09-03 against CR 2026-08-07
**Cards:** Ultron, Artificial Malevolence; Krang, Utrom Warlord; Karn, the Great Creator
**Rules:** 302.6, 602.2, 605.3, 702.10b, 702.10c
**Claim:** When an effect turns a noncreature artifact copy into a creature as it enters (Ultron,
Artificial Malevolence's *"becomes a 2/2 Robot Villain creature in addition to its other types"*),
that token cannot activate its `{T}` mana ability the turn it is created. "It's only a mana ability"
is not an exception.
**Evidence:** CR 302.6 — a creature's activated ability with `{T}` in the cost can't be activated
unless it has been under your control continuously since your most recent turn began; CR 605.3
makes mana abilities follow the normal activated-ability rules (602.2) with only stack/timing
exceptions, none touching 302.6. Haste (702.10b–c) is the only lift.
**Changes:** Price any "copy a rock as a creature" line as **next-turn** mana, not this-turn — the
turn-4 Ultron copy of a turn-4 rock taps on turn 5. Haste anthems (Krang, Utrom Warlord) are
therefore ramp in that deck, not just combat. Same rule covers Karn, the Great Creator's animated
rocks and Tezzeret's emblem.
**See also:** tap-011, tap-025
**Source:** ultron (2026-09-03) — founding build; verified by mtg-rules-expert against CR 2026-08-07.

### "Becomes tapped" triggers on COST-taps, not just "tap target creature" {#tap-008}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Cards:** Captain America, Living Legend
**Rules:** 107.5, 110.5, 508.1f, 603.2e, 702.51a, 702.122a, 702.126a, 702.184a
**Claim:** A "whenever X becomes tapped" trigger fires on *any* untapped→tapped status change,
including taps paid as a cost — crew, Station, convoke, improvise, a `{T}` activation cost — and on
tapping to attack. It is cause-agnostic.
**Evidence:** CR 110.5 (tapped is a *status*, not an action). CR 603.2e — such abilities trigger
"only when the status of a permanent that's already on the battlefield changes from untapped to
tapped." Nothing in the rules distinguishes the cause. Specifically: CR 107.5 (`{T}` in a cost means
"Tap this permanent"), 702.122a (crew: "Tap any number of other untapped creatures you control"),
702.184a (Station: "Tap another untapped creature you control"), 702.51a (convoke), 508.1f
(attacking "isn't a cost; attacking simply causes creatures to become tapped").
**Changes:** Evaluate every "becomes tapped" payoff against the deck's *cost*-taps, not only its
tappers. Two exclusions to remember: improvise taps **artifacts** (702.126a), so it only triggers
creature-tap payoffs for artifact *creatures*; and a permanent that **enters the battlefield
tapped** never triggers it (603.2e, stated verbatim).
**See also:** tap-009, tap-012, tap-017
**Source:** cap-living-legend (2026-09-09) — Captain America, Living Legend.

### A trigger caused by a cost-tap always resolves AFTER the spell that caused it {#tap-009}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Rules:** 500.5, 601.2h, 601.2i, 602.2b, 603.3
**Claim:** Value you get from tapping a permanent to pay a cost can never help pay for the thing
you were casting. This kills "tap a dork for mana, untap it, spend the extra mana on this spell"
and "convoke the same creature twice for one spell."
**Evidence:** The tap happens while paying costs (CR 601.2h, applied to abilities by 602.2b), but
the spell isn't cast until 601.2i, and CR 603.3 only puts the triggered ability on the stack "the
next time a player would receive priority." So the trigger is strictly downstream.
**Changes:** When a commander or engine converts taps into mana or untaps, sequence it as **tap
with priority first, hold the mana, then cast** — and price the effect as "extra mana next
activation," never as a cost reduction on the current spell. Note mana empties at end of step or
phase (CR 500.5), so the holding window is short.
**Source:** cap-living-legend (2026-09-09).

### Untapping an attacker doesn't remove it from combat, and the untap lands before blockers {#tap-010}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Rules:** 302.6, 500.2, 506.4b, 508.1, 508.2b
**Claim:** A creature that taps to attack and is then untapped is still an attacking creature, still
deals combat damage, and is physically untapped when blockers are declared.
**Evidence:** CR 506.4b — "Tapping or untapping a creature that's already been declared as an
attacker or blocker doesn't remove it from combat and doesn't prevent its combat damage." CR 508.2b
puts abilities that triggered during the 508.1 declaration on the stack before the active player
gets priority, and CR 500.2 means the declare attackers step doesn't end until they resolve.
**Changes:** A "first tap each turn untaps it" effect is genuine team-wide pseudo-vigilance, and the
untapped attacker can still be tapped again for a `{T}` ability that same combat (subject to CR
302.6 summoning sickness).
**Source:** cap-living-legend (2026-09-09).

### Attacking and summoning sickness key on control of the PERMANENT, not on how long it's been a creature {#tap-011}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Cards:** Cyberdrive Awakener; Mech Hangar; March of the Machines
**Rules:** 302.6, 508.1a
**Claim:** A noncreature permanent you've controlled since your turn began can be animated mid-turn
and attack immediately.
**Evidence:** CR 302.6 — "A creature can't attack unless **it has been under its controller's
control continuously since their most recent turn began**." CR 508.1a repeats it for declaring
attackers. Neither asks when the permanent became a creature. Same principle as man-lands and
freshly-crewed Vehicles.
**Changes:** Animation effects (copy-into-a-Vehicle, Cyberdrive Awakener, Mech Hangar, March of the
Machines) are same-turn threats, not next-turn ones — price them as haste. Corollary already
verified: crew is unaffected by summoning sickness in **both** directions, because the Vehicle's own
`{T}` isn't in the cost and the creatures tapped to pay are paying a cost, not activating an ability.
**See also:** tap-007
**Source:** cap-living-legend (2026-09-09).

### "Whenever a CREATURE you control becomes tapped" ignores a noncreature artifact tapping {#tap-012}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Rules:** 603.2e
**Claim:** Tapping a mana rock does not fire a "whenever a creature you control becomes tapped"
trigger, and animating that rock afterwards does not retroactively fire it.
**Evidence:** The trigger condition tests the object's type at the moment of the event. CR 603.2e —
such abilities "trigger only at the time the named event happens — they don't trigger if that state
already exists or **retrigger if it persists**." The tap event has already passed; making the
permanent a creature later is not a new tap.
**Changes:** With a "first tap each turn untaps it" commander, your **rocks get no untap** — only
creatures do. Plan mana around that: a rock you tap stays tapped all turn, so anything that wants to
animate or copy that rock into an attacker must be done **before** tapping it for mana.
**See also:** tap-005
**Source:** cap-living-legend (2026-09-09).

### Called vigilance anti-synergistic with a "first tap each turn" untapper — it's the opposite {#tap-013}

**Kind:** correction · **Recorded:** 2026-09-09
**Cards:** Iron Spider, Stark Upgrade; Agent Phil Coulson; Iron Lad, Diverging Destiny; Loran of the Third Path
**Rules:** 702.20b
**Claim:** I reasoned that vigilance on other creatures wastes a "whenever a creature becomes tapped
during your turn, untap it" commander, because a vigilant attacker never taps and so never triggers
it. Wrong conclusion from correct facts.
**Evidence:** CR 702.20b — attacking doesn't tap a creature with vigilance. So the creature's
once-per-turn untap allowance is **never spent on attacking** and is still available for a `{T}`
ability, crew, or Station later that turn. Vigilance is redundant with the pseudo-vigilance the
commander already grants; it is not a loss.
**Changes:** With a "first tap each turn" untapper, rank vigilant creatures that also have `{T}`
abilities **highest**, not lowest — they get the attack *and* the activation. The genuine
anti-synergy is anything that taps your creatures early in your turn for no value, since each
creature only gets one free untap.
**Source:** cap-living-legend (2026-09-09) — Iron Spider, Stark Upgrade; Agent Phil Coulson; Iron Lad;
Loran.

### An opponent-turn untapper does nothing for a creature in the round it was cast {#tap-014}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Drumbellower; Prodigal Sorcerer; Thousand-Year Elixir
**Rules:** 302.6
**Claim:** Drumbellower-style untaps give a newly cast `{T}` creature no extra activations until your
next turn begins, even though the creature is untapped during opponents' turns.
**Evidence:** CR 302.6 — summoning sickness lasts until the creature "has been under its
controller's control continuously since their most recent turn began." A creature cast on your turn
is still sick through every opponent's turn that follows. (Thousand-Year Elixir, which grants haste
for activated abilities, is the fix.)
**Changes:** When modelling "activations per round" under an opponent-turn untapper, count from the
round **after** the creature lands. It makes Thousand-Year Elixir more valuable in any deck that
runs these untappers.
**See also:** tap-006
**Source:** cap-living-legend (2026-09-10) — rules check on Drumbellower + Prodigal Sorcerer.

### An untap-on-tap trigger always gives opponents a window while the permanent is still tapped {#tap-015}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Captain America, Living Legend; Giver of Runes
**Rules:** 107.5, 117.4, 117.5, 601.2h, 602.2b, 603.3
**Claim:** A "whenever X becomes tapped, untap it" trigger never lets you re-use a tap ability *in
response to something an opponent does in that same priority window*: opponents can always act
while the trigger is on the stack and the permanent is still tapped.
**Evidence:** The tap is paid as a cost (CR 602.2b → 601.2h). The trigger goes on the stack above the
ability before anyone gets priority (CR 117.5, 603.3). It resolves only when all players pass in
succession (117.4), so every opponent gets priority first. A tapped permanent can't pay a `{T}` cost
(107.5). On an opponent's turn, a "during your turn" untapper doesn't trigger at all.
**Changes:** Price the second activation from an untapper as proactive value (a second draw, a
second counter, a second mana) — never as an instant-speed answer the pilot can count on.
Protection against a second response should come from a different card.
**See also:** tap-019, tap-020
**Source:** cap-living-legend (2026-09-10) — Captain America, Living Legend + Giver of Runes.

### A card that GRANTS a {T} ability to a colour turns the whole creature base into tap engines {#tap-016}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Resplendent Mentor; Heliod, Sun-Crowned; Archangel of Thune; Light of Promise
**Rules:** 113.10, 119.9, 302.6, 509.1a, 603.2c, 603.2e, 702.10c
**Claim:** Resplendent Mentor ("White creatures you control have '{T}: You gain 1 life.'") under a
"first tap each turn untaps it" commander gives every white creature two separate life-gain events per
turn — including the commander and every white token — subject to summoning sickness.
**Evidence:** A granted ability is the creature's own ability (CR 113.10), so a {T} cost is a
"becomes tapped" event (603.2e) and 302.6 applies — a creature or token that arrived this turn can't
activate it without haste (702.10c). Each activation resolves as its own gain (119.9, 603.2c), so
Heliod / Archangel of Thune / Light of Promise each trigger per activation. Measured in
cap-living-legend: 20 of 27 creatures were white, taking "cards using the untap" from 12 to 32 with a
six-card package. Heliod gets the ability only at devotion 5+ (it isn't a creature otherwise).
**Changes:** When a deck's commander rewards tapping, look for *granters* of tap abilities before
adding individual tap creatures — one granter can outnumber a dozen slots. Sequencing cost: a creature
tapped twice stays tapped and can't block (509.1a); do the first tap precombat (it untaps), attack,
then the second tap after combat.
**Source:** cap-living-legend (2026-09-10) — tap re-centre of DECK-COUNTERS.

### For an untap commander, measure "second-tap use" per creature — Vehicles are the universal outlet {#tap-017}

**Kind:** pattern · **Recorded:** 2026-09-10
**Cards:** Fallowsage; Tui and La, Moon and Ocean; Mechan Navigator; Sanwell, Avenger Ace
**Rules:** 603.2e, 702.122a
**Claim:** A "first tap each turn untaps it" commander is worth (creatures) × (meaningful taps each).
The yardstick is the share of creatures whose *second* tap has a use of its own; crew, station and
convoke give every creature — tokens and vanilla bodies included — a first-tap use, so they are the
outlet that makes "becomes tapped" payoffs fire twice.
**Evidence:** Measured across three cap-living-legend lists: DECK.md (Vehicles) 17/27 creatures with a
second-tap use and 18 outlets; DECK-COUNTERS (lifelink voltron) 15/31 and 3 outlets; DECK-ENGINE
(rebuild: Vehicles + tap-ability creatures) 25/30 and 20 outlets. Crewing is a cost-tap (702.122a,
603.2e), so Fallowsage / Tui and La / Mechan Navigator / Sanwell trigger on the crew tap and again on
the second tap. The commander's EDHREC tap/untap theme (52 decks) is exactly this shape.
**Changes:** When building around any untapper, count second-tap use and outlets before counting
payoffs. A voltron plan uses such a commander poorly — the ability affects *other* creatures, and a
vigilant commander's own untap is idle unless an outlet taps him.
**History:** On 2026-09-15 build-034 recorded what optimising this metric alone cost: DECK-ENGINE scored 25/30 and a single turn 4–5 wipe ended the game. Count the board's survival (wipe answers, noncreature threats) alongside second-tap use.
**See also:** tap-008, equip-013, equip-016, build-034
**Source:** cap-living-legend (2026-09-10) — pilot's "most reliably consistent way to maximise his
ability."

### Mass untap on opponents' turns switches off "tapped creatures have X" protection {#tap-018}

**Kind:** pattern · **Recorded:** 2026-09-10
**Cards:** Drumbellower; Unwinding Clock; Dazzling Theater // Prop Room; Adept Watershaper; The Wandering Rescuer; Split Up
**Rules:** 502.3, 502.4
**Claim:** Drumbellower / Unwinding Clock / Prop Room untap everything in each opponent's untap step,
with no option to skip — so Adept Watershaper ("other tapped creatures have indestructible") and The
Wandering Rescuer ("other tapped creatures have hexproof") protect nothing at the start of an
opponent's turn.
**Evidence:** Mass untap happens in the untap step with no priority (502.3, 502.4); the protection is
conditional on being tapped. Re-tapping at instant speed (mana abilities, {T} abilities) restores it.
**Changes:** Don't count Watershaper/Rescuer as opponents'-turn protection in a deck with a mass
untapper — keep instant-speed tap outlets available, or treat them as your-turn protection plus a
Split Up "destroy all tapped" enabler.
**See also:** tap-006
**Source:** cap-living-legend (2026-09-10) — DECK-ENGINE audit.

### An untap-on-tap trigger is UNTARGETED and source-independent — removal can't fizzle it {#tap-019}

**Kind:** ruling · **Verified:** 2026-09-12 against CR 2026-08-07
**Rules:** 113.7a, 113.9, 400.7, 601.2h, 608.2b
**Claim:** Once a "whenever a creature you control becomes tapped… untap it" trigger is on the
stack, an opponent cannot stop the untap by killing the creature or by killing the commander that
made the trigger. Only an ability-countering effect actually answers it.
**Evidence:** CR 113.7a — "once activated or triggered, an ability exists on the stack independently
of its source… destruction or removal of the source after that time won't affect the ability." The
trigger says "untap **it**", a back-reference, not "target", so CR 608.2b (all targets illegal →
doesn't resolve) never applies and ward/hexproof/protection are irrelevant. CR 113.9 — a triggered
ability on the stack "can be countered by effects that specifically counter abilities", not by
spell-only counters. Killing the creature still leaves the trigger resolving into nothing (CR 400.7,
the card in the graveyard is a new object). Costs already paid stay paid (CR 601.2h), so a crewed
Vehicle stays crewed and a convoked spell stays cast.
**Changes:** Don't price commander removal as an answer to the untap engine — it only stops *future*
triggers. Conversely, don't count on the untap resolving if the opponent simply kills the creature:
the trigger resolves, but the effect is empty, so the tempo loss is the same.
**See also:** tap-015
**Source:** cap-living-legend (2026-09-12) — pilot asked for the full priority-window walkthrough.

### On your turn, an OPPONENT's "becomes tapped" trigger resolves before yours {#tap-020}

**Kind:** ruling · **Verified:** 2026-09-12 against CR 2026-08-07
**Rules:** 101.4, 117.4, 603.3b, 608.1
**Claim:** APNAP ordering puts the active player's triggers on the stack first, so opponents' triggers
from the same tap event land on top and resolve first — their payoff sees your creatures still tapped.
**Evidence:** CR 603.3b — "each player, in APNAP order, puts each triggered ability they control…
on the stack"; CR 101.4 for APNAP; last-on-first-off per CR 117.4 / 608.1.
**Changes:** When an opponent runs a punisher keyed to creatures becoming tapped, assume it resolves
with your board still tapped — your untap can't pre-empt it. Same ordering makes your own crew-tap
a real cost against such a table.
**See also:** tap-015
**Source:** cap-living-legend (2026-09-12).

### A second tap doesn't just fail to untap — it produces no trigger at all {#tap-021}

**Kind:** ruling · **Verified:** 2026-09-12 against CR 2026-08-07
**Rules:** 603.4
**Claim:** With an intervening-"if" first-time-only untapper, the second tap of a creature creates no
stack object, so there is nothing for an opponent to respond to and no ordering decision to make.
**Evidence:** CR 603.4 — "the ability checks whether the stated condition is true. The ability
triggers **only if it is**; otherwise it does nothing", and it re-checks on resolution. Also: taps
that happened earlier in the turn *before the untapper entered the battlefield* already burn the
"first time" — the condition is a fact about the creature's turn history, not about the untapper.
**Changes:** Sequence the free tap deliberately — don't spend a creature's first tap on a mana
ability in upkeep if the plan needs it for crew later. And when flashing in such a commander
mid-turn, creatures already tapped this turn get nothing.
**Source:** cap-living-legend (2026-09-12).

### Blink resets a "first time this turn" untap for that creature — but only a main-phase blink turns it into a tap, and phasing resets nothing {#tap-022}

**Kind:** ruling · **Verified:** 2026-09-15 against CR 2026-08-07
**Cards:** Thousand-Year Elixir; Relic of Legends; Grand Architect; Thassa, Deep-Dwelling; Soulherder; Teleportation Circle; Conjurer's Closet; Ephemerate; Cloudshift; Ghostly Flicker; Restoration Angel; Brago, King Eternal; Deadeye Navigator
**Rules:** 110.5b, 302.6, 400.7, 400.7a, 400.7m, 603.4, 605.1a, 702.10c, 702.26d, 702.184a
**Claim:** A creature that is exiled and returned is a new object, so an intervening-if "first time
that creature has become tapped this turn" untapper triggers for it again; phasing keeps the history.
Repeatable blink engines and every "return at the beginning of the next end step" effect bring the
creature back after both main phases, so the fresh untap has nothing to pay for — only immediate
main-phase blinks turn blink into extra taps.
**Evidence:**
- CR 400.7 ("becomes a new object with no memory of, or relation to, its previous existence"; none of
  400.7a–m carries tap history) and 603.4 (the condition is checked against the new object). Contrast
  702.26d: "Effects that check a phased-in permanent's history won't treat the phasing event as having
  caused the permanent to leave or enter the battlefield." The returned creature enters untapped
  (110.5b) and is summoning-sick for its OWN {T} abilities, mana abilities included (302.6, 605.1a),
  but can still be tapped for crew, station, convoke, Relic of Legends and Grand Architect costs.
  Thousand-Year Elixir restores its {T} abilities (702.10c). Trap: blinking it while the untap trigger
  for its old self is still on the stack wastes that untap (the trigger's "it" is the old object).
- Timing (2026-09-15): Thassa, Deep-Dwelling; Soulherder; Teleportation Circle; Conjurer's Closet —
  oracle text of each ("At the beginning of your end step"; "at the beginning of the next end step").
  Only immediate blinks cast in a main phase (Ephemerate, Cloudshift, Ghostly Flicker, Restoration
  Angel), or Brago's post-combat-damage blink before main phase 2, turn blink into extra taps. Station
  is sorcery-speed (702.184a), so end-step taps cannot station. Brago, King Eternal: "Whenever Brago
  deals combat damage to a player, exile any number of target nonland permanents you control, then
  return those cards."
**Changes:** Price a blink in an untap deck as "one extra cost-tap from that creature this turn", not
"one extra ability activation", unless a haste-for-abilities source is out. In an untap-commander
deck, value blink for its ETBs and as protection, not as a tap engine. The one repeatable
instant-speed blink (Deadeye Navigator) is excluded for loops — see loop-006.
**See also:** loop-006
**Source:** cap-living-legend (2026-09-15) — pilot's blink proposal (mtg-rules-expert, CR 2026-08-07);
cap-living-legend (2026-09-15), merged from "End-step blink adds ETB value but no taps — only
main-phase blinks refresh an untap engine".

### A "first tap each turn" untapper ANTI-synergises with end-step tapped-creature payoffs — budget the second taps {#tap-023}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Captain America, Living Legend; Throne of the God-Pharaoh; Adeline, Resplendent Cathar; Opposition; Springleaf Drum
**Rules:** 601.2c, 601.2h, 602.2b, 603.2e, 603.3, 603.4, 702.122a
**Claim:** Captain America, Living Legend untaps the first tap of each creature, so at your end step the
board is untapped and Throne of the God-Pharaoh counts **zero** — unless every creature was tapped a
second time. Tokens that ENTER tapped are exempt and count for free, and a "tap a creature you control:
tap target permanent" ability (Opposition) can target the creature that pays for it, leaving that
single creature tapped with no other creature involved.
**Evidence:**
- Cap's intervening-"if" (CR 603.4) fires once per creature per turn. Throne of the God-Pharaoh: "At
  the beginning of your end step, each opponent loses life equal to the number of tapped creatures you
  control." CR 603.2e — a permanent that enters tapped never "becomes tapped", so Cap's trigger never
  fires on it and it stays tapped (Adeline, Resplendent Cathar's tokens enter "tapped and attacking").
  Crew has no frequency limit (702.122a), so crewing the same Vehicle twice taps the same creatures
  twice and the second tap sticks.
- Opposition line (2026-09-16): under a "first tap each turn, untap it" commander, one Opposition
  activation leaves a single creature tapped with no other creature involved — target that creature,
  then pay the cost by tapping it. Targets are
  chosen at CR 601.2c, costs paid at 601.2h (applied to abilities by 602.2b), so the target is locked
  before the cost-tap happens. The cost-tap is a "becomes tapped" event (603.2e), so the untapper
  triggers and is put on the stack *above* the activated ability (603.3) and resolves first. The
  ability then re-taps it, and its own tap produces no trigger, because the intervening-"if" is now
  false (603.4) — the second tap sticks. Crew does the same for a whole board at once: crew pass 1 taps
  everyone and is refunded, crew pass 2 sticks.
**Changes:** Never score an end-step tapped-matters payoff by creature count in an untapper deck. Score
it by **second taps available**: a free repeatable tapping outlet (Opposition, crew, Springleaf Drum)
and token makers that create their tokens already tapped. Budget **two free taps per creature per
turn** (a crew pass plus a free tap outlet), and do the tapping in response to the end-step trigger so
blockers stay available through the turn.
**See also:** tap-021, loop-009
**Source:** cap-living-legend (2026-09-16) — Throne of the God-Pharaoh evaluation (mtg-rules-expert, CR
2026-08-07); cap-living-legend (2026-09-16) — Throne of the God-Pharaoh package (mtg-rules-expert, CR
2026-08-07), merged from "A 'tap a creature you control: tap target permanent' ability can target the
creature that pays for it".

### Singleton-exception cards scale linearly with a "first tap each turn" untapper — and set their own minimum count {#tap-024}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Persistent Petitioners; Bruvac the Grandiloquent; Captain America, Living Legend
**Rules:** 302.6, 603.4
**Claim:** Persistent Petitioners ("A deck can have any number of cards named Persistent Petitioners";
"{1}, {T}: Target player mills a card" / "Tap four untapped Advisors you control: Target player mills
twelve cards") doubles its rate under a commander that untaps each creature's first tap: N Petitioners
give 2N tap events, so **6N cards milled per turn**, doubled again by Bruvac the Grandiloquent. But the
four-Advisor cost sets a hard floor — below four Advisors the ability is simply off.
**Evidence:** Oracle text of both cards. Cap's untap is once per creature per turn (CR 603.4), so each
Petitioner contributes exactly two taps. Tapping to pay another permanent's cost ignores summoning
sickness (302.6), so Petitioners cast this turn still work. "Target player" is singular — milling a
three-opponent pod is ~300 cards, three separate jobs.
**Changes:** When adding an any-number card to a deck with a repeatable untapper, compute the rate as
(copies × taps per copy) ÷ (cost in bodies), and check the floor first: a 4-body activation cost means
four copies is the minimum that does anything, and one removal spell turns it off. Count the commander's
creature types — a Soldier commander does not help an Advisor cost.
**See also:** loop-008
**Source:** cap-living-legend (2026-09-16) — Petitioners package on Captain America, Living Legend.

### A granted "{T}: Add mana" is summoning-sick on the CREATURE, granter included — a card whose own cost taps creatures is not {#tap-025}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** Cryptolith Rite; Enduring Vitality; Jaheira, Friend of the Forest; Song of Freyalise; Earthcraft; Hazel of the Rootbloom
**Rules:** 107.5, 113.1a, 118.3, 302.6, 602.5a, 605.1a, 605.3a, 605.3b, 605.5a, 613.1f, 702.10c, 702.20
**Claim:** CR 302.6 attaches to the creature being tapped, not to the source of the ability. So a card
that *grants* creatures "{T}: Add mana" — *"Creatures you control have '{T}: Add one mana of any
color'"* — is blocked by summoning sickness for any creature that entered this turn, **including the
granter itself when the granter is a creature**, while a card whose own ability *lists tapping a
creature as a cost* is not. In a token deck these are not substitutes, and the second kind makes this
turn's tokens produce mana with no haste enabler at all.
**Evidence:** CR 302.6 / 602.5a restrict exactly "a creature's activated ability with the tap symbol
or the untap symbol in its activation cost"; CR **302.6** in full — *"A creature's activated ability
with the tap symbol or the untap symbol in its activation cost **can't be activated unless the creature
has been under its controller's control continuously since their most recent turn began**."* CR 107.5
— the tap symbol means "Tap **this** permanent." Granted abilities are the creature's own (CR 613.1f,
layer 6) — genuinely that creature's ability (CR 113.1a) — so Cryptolith Rite, Enduring Vitality,
Jaheira and Song of Freyalise are all blocked on a token made this turn. Enduring Vitality grants the ability to "creatures you control",
which includes Enduring Vitality, so a freshly cast Enduring Vitality is summoning sick like any dork —
unlike Cryptolith Rite, which is not a creature and was never going to tap anyway. Haste is the only
lift: CR **702.10c** — *"If a creature has haste, its controller can activate its activated abilities
whose cost includes the tap symbol… even if that creature hasn't been controlled by that player
continuously."* But Earthcraft ("Tap an untapped creature you control: Untap target basic land") is an
*enchantment's* ability whose cost is words, not the tap symbol — 302.6 never applies, and only CR
118.3 (must be untapped) matters. Hazel of the Rootbloom is the hybrid case: "{T}, Pay 2 life, Tap X
untapped tokens you control" — the {T} taps **Hazel**, so Hazel must be non-sick, while the X tokens
are free and may have been created this turn. Second-order difference: Earthcraft *targets*, so it is
not a mana ability (CR 605.5a) and cannot be used mid-cast to help pay for a spell, unlike Cryptolith
Rite and Hazel (CR 605.1a, 605.3a–b).
**Changes:** When the ask is "let my fresh tokens make mana", read *whose* ability it is before buying
a haste enabler. Cost-of-another-permanent designs solve it for free; a haste card is only needed to
let the tokens **attack**. When adding a second copy of a Cryptolith Rite effect on a creature body, do
not credit the body as an extra mana source on the turn it lands. And note the one genuine upside of
the creature version: **vigilance** (CR 702.20) lets it attack and still be untapped to tap for mana,
which a non-creature granter can never do.
**See also:** tap-001, tap-007
**Source:** chatterfang (2026-09-25) — pilot asked for haste and hexproof to leverage tap-for-mana
creatures; upgrade-test (2026-09-28) — Enduring Vitality vs Cryptolith Rite comparison, merged from "A
granted '{T}: Add mana' is summoning-sick on the CREATURE, including the granter itself".

### A mass-pump ETB grants trample, not haste — this turn's tokens still cannot attack {#tap-026}

**Kind:** ruling · **Verified:** 2026-09-25 against CR 2026-08-07
**Cards:** Craterhoof Behemoth
**Rules:** 117, 302.6, 603.3, 608.2h, 611.2c, 611.2d, 702.10b
**Claim:** Craterhoof-style "creatures you control gain trample and get +X/+X" does nothing about
summoning sickness, so in a deck that makes its board the same turn it swings, the pump card needs a
separate haste source or most of the buffed bodies sit at home.
**Evidence:** Craterhoof Behemoth grants only trample; CR 302.6's first restriction ("can't attack")
is lifted only by haste (CR 702.10b). Craterhoof's own haste covers Craterhoof alone. Two further
timing facts: X is determined once on resolution (CR 608.2h, 611.2d) and Craterhoof counts itself, and
the affected set is locked when the effect begins (CR 611.2c — "doesn't affect those that enter the
battlefield… afterward"), so tokens made after the trigger resolves get neither pump nor trample.
Bodies added *while the trigger is on the stack* both raise X and join the set (CR 603.3, 117).
**Changes:** Price a mass-pump finisher in a token deck as a **two-card** plan (pump + haste), and
sequence every token-maker before letting the pump trigger resolve.
**Source:** chatterfang (2026-09-25) — Craterhoof Behemoth evaluation.
