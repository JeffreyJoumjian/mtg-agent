# Iron Man — decision log

Append-only. Newest entries at the bottom. Record the **grounds**, not just the verdict.

---

## 2026-08-07 — Commander: Tony Stark // The Invincible Iron Man

**Grounds:** Nine Iron Man legends are Commander-legal; three are Izzet. The sample folder is
split — 6 of 7 decks and all 7 YouTube videos build **Tony Stark**, while the Archidekt list and
`~/Desktop/iron-man-suggestions.txt` are for **Iron Man, Titan of Innovation**. "Voltron" only
describes Tony Stark, whose back face attaches Equipment from hand for free every combat.

**Rejected:** *Iron Man, Titan of Innovation* as commander — an artifact-chain toolbox that tutors
artifacts in **tapped** (which is why the suggestions file wants Amulet of Vigor). Kept in the 99.
*Iron Man, Master of Machines* — a real voltron threat at 29¢ needing zero Equipment, but 1/4 base
is fragile and no sample runs it as commander.

---

## 2026-08-07 — Base: "I love you 3000", improved rather than averaged

**Grounds:** User's call, and the role table supports it. Measured across the five optimized
sample decks (see `field-analysis.md`), this list leads on tutors (8 vs a field average of 4.4),
is near-top on counterspells (5), has the best manabase, and is the only one with a deliberate
extra-combat package (7 effects vs a field average of 2.6).

**The key structural finding, and the one that governs every later decision:**

> The base deck's four biggest deviations from the field — **most tutors, most extra combats,
> fewest creatures (10 vs 18.6), lowest cost reduction (6 vs 9.2)** — are not four flaws. They are
> one decision applied consistently: **this deck cheats artifacts into play instead of casting
> them.**

It doesn't need cost reduction because its nine-drops arrive free. It runs double the tutors
because finding the *specific* piece matters more than having cheap ones. It stays creature-light
**so that Blasphemous Act and Extinguisher Battleship are close to one-sided.** Every other deck
in the sample is a *cast-artifacts* deck; this is a *cheat-artifacts* deck.

**Changes accepted: six** (five below, plus one later reversal recorded at the bottom of this
file). Every one sits inside the Equipment, interaction, creature or draw slots as a like-for-like
trade. **Creature count (10), artifact count, land count (37) and Game Changer count (3/3) are all
unchanged from the base** — that constraint is what kept the cheat-artifacts identity intact.

---

## 2026-08-07 — RULES: the commander is a *modal* DFC, so removal is cheaper than it looks

**Grounds:** Scryfall `layout: modal_dfc`. **CR 712.11b** — *"A player casting a modal double-faced
card... chooses which face they are casting before putting it onto the stack."*

After the commander dies or is exiled and goes to the command zone (**CR 903.9a**), recast
**The Invincible Iron Man directly** for `{4}{U}{R}` + tax (**CR 903.8**) — 8 mana the first time.
You never have to recast the `{1}{U}` front face and pay the 6-mana sorcery-speed flip again.

**What it does cost:** **CR 704.5n** — Equipment attached to an illegal permanent *"becomes
unattached... It remains on the battlefield."* The gear survives but falls off, and the combat
trigger only attaches artifacts **from your hand**, so re-suiting off the board costs full equip
prices.

**Changes:** Hold Equipment in hand. The trigger is free; equip costs are not.

---

## 2026-08-07 — The first five accepted changes

| OUT | IN | Grounds |
|---|---|---|
| Sword of the Animist | **Ultima Weapon** | `{7}` cast, **equip {7}** — unplayable in a normal deck, which is exactly why it belongs here: the trigger deploys *and* attaches it free. 5/5 → **12/12**, and **24 with Mjölnir = lethal commander damage in one swing**. Plus it destroys a creature every attack, which answers the chump-blocker problem. Sword of the Animist was the weakest Equipment — a ramp sword in a deck that cheats things in anyway. |
| Reality Shift | **Chaos Warp** | The base had no clean answer to a resolved **noncreature** permanent. Reality Shift also *"manifests the top card of their library"* — it hands an opponent a 2/2 blocker, which is a real cost when your kill is a flier. Reality Shift was 1/5 in the field. |
| Auton Soldier | **Roaming Throne** | Both try to double the commander's trigger; only one works. Choose **Hero** (the back face is a *Legendary Artifact Creature — Human Hero*) and the beginning-of-combat trigger fires twice — two free artifacts a combat, both Equipment attached to the **real** commander. It also doubles Iron Man, Titan of Innovation, which is likewise a Human Hero. Artifact creature out, artifact creature in, so nothing structural moves. |
| Sword of Hearth and Home | **Adaptive Omnitool** | Both `{3}` Equipment. +1/+1 **per artifact** is routinely +10/+10 here, and the attack trigger digs six for an artifact **into hand** — precisely where the free-drop trigger wants it. 4/5 field vs 1/5. |
| Liquimetal Torque | **Champion's Helm** | The base had **zero hexproof**; Commander's Plate covers W/B/G, so blue and red removal walked straight through. Liquimetal Torque was 1/5 in the field, taps only for `{C}`, and its second ability (*"target nonland permanent becomes an artifact"*) is near-dead here — nothing in the maindeck punishes artifacts. **Talisman of Creativity was explicitly protected from this cut**: 5/5 field, and it's the only other rock producing `{U}` *or* `{R}` for a `{4}{U}{R}` commander off 19 blue / 17 red sources. |

---

## 2026-08-07 — Sword of Fire and Ice: argued twice, KEPT on the user's call

**Note the sequence.** SoFI was first proposed as a cut, then reinstated. Final state: **it stays**,
and Champion's Helm came in over Liquimetal Torque instead. Equipment went 14 → 15.

The rules constraint is real and permanent, so the pilot needs to know it — see the entry below.
What changed is the *cost* of keeping it: paying a marginal mana rock instead of the hexproof slot.

---

## 2026-08-07 — The SoFI / Mjölnir constraint (still applies, since SoFI is maindecked)

**CR 702.16d** — *"A permanent with protection can't be equipped by Equipment that have the stated
quality. Such Equipment become unattached from that permanent as a state-based action."* SoFI
grants pro-**red**; Mjölnir `{3}{R}`, The Reaver Cleaver `{2}{R}` and Embercleave `{4}{R}{R}` are
all red *cards*, so all three fall off.

**The counter-argument (user's, and it was good):** SoFI + Commander's Plate gives protection from
**all five colours** — both are colourless Equipment, so they coexist — and the point isn't dodging
removal, it's that **the commander can never be blocked**, guaranteeing commander damage.

**What settled it:** protection doesn't stop **colorless** blockers, and this is an artifact
format full of Constructs, Thopters, Servos and Eldrazi. Pro-all-colours still gets chump-blocked.
**Trample does not.** And per **CR 702.19b**, when assigning trample damage you ignore *"any
abilities or effects that might change the amount of damage that's actually dealt"* — so a 12/12
trampler chump-blocked by a 2/2 assigns 2 to the blocker and 10 to the player, and **then** Mjölnir
doubles: **20 commander damage straight through the chump block.**

Ranked against the actual goal of "always connect": trample (already in the deck twice) > Ultima
Weapon killing a blocker pre-blocks > Commander's Plate + innate flying > SoFI.

**How to pilot it, now that both are maindecked.** They are mutually exclusive **on the commander**,
not in the deck:

- **Pick a lane on the draw.** Mjölnir + Ultima Weapon/Excalibur is the fast kill (24–30 in one
  swing). Commander's Plate + SoFI is the grindy near-unblockable lane (10 power, ~3 connections).
- **The trap is the mandatory attach.** The combat trigger reads *"**you may** put an artifact card
  from your hand onto the battlefield. If it's an Equipment, **attach it**"* — the "may" governs
  putting it onto the battlefield, but the attach is not optional. So with Mjölnir already on,
  **decline the trigger** rather than deploying SoFI with it.
- **SoFI is excellent on a second creature.** Hard-cast it and equip `{2}` to Knuckles the Echidna —
  **double strike means the trigger fires twice**, for 4 damage and 2 cards. Professional
  Face-Breaker and Roaming Throne are fine holders too. Keeping it out of the commander's lane
  costs you nothing.

---

## 2026-08-07 — Corrections. Three proposals were withdrawn; all three were my errors.

Logged because the reasoning failure is more transferable than the card choices.

**1. Proposed cutting Hexplate Wallbreaker. Wrong.** I verified that For Mirrodin!
(**CR 702.163a**) moves the Equipment onto a fresh 2/2 token and stopped there — never reading
what the Equipment *does* once it's on the token. *"Untap **each attacking creature**... there is
an additional combat phase"* are both **global**. The commander gets the extra combat regardless
of who holds the sword. It's a self-contained extra-combat engine that never competes for an
Equipment slot. (The rule is still worth knowing for **Kaldra Compleat** and **Nettlecyst**, whose
bonuses *are* all on the equipped creature — those genuinely don't suit up the commander.)

**2. Proposed cutting Extinguisher Battleship as a bad Spacecraft. Wrong — it's a free wipe.**
I read the Station text, judged stationing awkward in a creature-light deck, and never priced the
ETB alone: *destroy target noncreature permanent* **and** *4 damage to each creature*, for **zero
mana** off the trigger. Critically, **4 damage does not kill a 5/5 commander**, so it is asymmetric
in your favour by default — better than Blasphemous Act, which kills your own commander. And the
"it kills my small creatures" objection was weak because **you choose when to deploy it.**

**3. Proposed cutting Knuckles the Echidna as filler. Wrong — it's part of a package.** Measured:
**6 Treasure makers** (Knuckles, Professional Face-Breaker, The Reaver Cleaver, Iron Man Titan of
Innovation, Great Train Heist, Treasure Vault) feeding **10 artifact-count payoffs** (Arc Reactor,
Armor Wars, Fomori Vault, Galvanic Blast, Inventors' Fair, One with the Machine, Simulacrum
Synthesizer, Thoughtcast, Urza's Saga, Uthros). Treasures here aren't just ramp — they're artifact
count, which a third of the deck cares about.

**The common root cause:** I compared cards head-to-head before counting roles, which is backwards
and is exactly what `deck-brain` SKILL.md §2.1 forbids. Doing the role table *first* showed the
deck had none of the holes my swaps were filling, and that a nine-card package would have quietly
converted a committed cheat-artifacts deck into the average cast-artifacts deck in the sample.

---

## 2026-08-07 — Kept, despite looking cuttable

- **Iron Man, Titan of Innovation** — the sacrifice is **optional**, and the normal line feeds it
  the Treasure it just made (MV 0 → tutor an MV 1 artifact), so nothing is really lost. Recursion
  is thin but real: Goblin Welder, Goblin Engineer (returns MV≤3 artifacts to the battlefield),
  Academy Ruins. And it's a **Human Hero**, so Roaming Throne doubles its attack trigger.
- **Aggravated Assault** — kept, but know what it is. It goes infinite with **two** different
  Equipment the commander attaches for free: The Reaver Cleaver (damage → Treasures → pay
  `{3}{R}{R}`) and Sword of Feast and Famine (damage → untap all lands → pay again). WotC permits
  bracket 3 decks where *"the long game could end with one being deployed"*, and at 7 extra-combat
  effects the card is core to the design rather than bolted on — but with two redundant lines this
  list is honestly **bracket 3.5**. Cutting Aggravated Assault alone brings it back down.
- **Blasphemous Act** — kills the commander unless indestructible. Sequence it *after* Mithril Coat
  or Darksteel Forge. 5/5 field.
- **Chandra's Ignition** — *"each **other** creature"*, so it spares Iron Man, and **Mjölnir
  doubles it**: a 15-power commander deals 30 to every opponent. Second table-killer, not a wipe.

---

## 2026-08-07 — Rejected, with grounds

- **Gauntlet of Power** — *"Creatures of the chosen color get +1/+1"* has **no "you control"**, and
  the mana clause is *"whenever a **basic land**... **its controller** adds"*. Both symmetric, and
  the deck runs only **10 basics**. Caged Sun is strictly better on both clauses and still doesn't
  earn a slot, because the payload is colourless Equipment and the mana problem is reaching 6.
- **Mana Geyser** — a sorcery, so on your main phase opponents' lands are mostly untapped. And late
  game the commander deploys your expensive cards free, so a burst of red has nothing to buy.
- **Machine God's Effigy** — the obvious line (copy the commander) is blanked by the legend rule.
- **Worldwalker Helm** — needs a token *engine*; the deck has loose sources, not an engine.
- **Trophy Mage** — 8 live targets, better than expected, but Fabricate costs the same and finds
  *any* artifact.
- **Panharmonicon** — does **not** double the commander's trigger. It only doubles triggers caused
  by something *entering*; the commander's is a beginning-of-combat trigger.
- **Lightning Greaves / Whispersilk Cloak** — grant **shroud**, which stops *you* equipping and
  targeting your own commander. Note the free combat attach still works through shroud, because
  **CR 701.3a** makes attaching a keyword action that doesn't target — but nothing else does.
- **Doctor Doom** (all printings) — black or Grixis, outside a UR identity.

---

## 2026-08-07 — Iron Man, Tony Stark IN, after Roaming Throne changed its value

**Reversal, and the grounds for it.** It was passed earlier as "a 5-drop competing with the flip
turn, and a go-wide engine in a deck that wins with one big flier." That evaluation was made
**before Roaming Throne was in the list**, and never revisited afterwards — exactly the mistake
SKILL.md §1.1b warns about: a verdict is a function of the deck around it, and the deck changed.

**What changed:** it is a *Legendary Artifact Creature — **Human Hero***, so Roaming Throne naming
**Hero** makes it the **third** doubled trigger, alongside the commander's beginning-of-combat
trigger and Iron Man, Titan of Innovation's attack trigger. *"Whenever you cast a red spell, create
a 2/1 colorless Robot Hero artifact creature token with flying"* becomes **two** tokens per red
spell, off 21 red spells.

The tokens compound rather than just sitting there: each is an **artifact**, so it's +1/+1 to the
commander through Adaptive Omnitool, plus metalcraft for Galvanic Blast, affinity for Thoughtcast,
and count for Armor Wars. With Krang out they're indestructible hasty tramplers. Its anthem also
gives the commander +1/+0, which Mjölnir turns into +2 damage.

**OUT: Hulking Metamorph** — 1/5 field, the weakest card in the 100. `{9}` (or prototype
`{2}{U}{U}` for a 3/3) to copy an artifact or creature you already control. Artifact creature out,
artifact creature in, so **creature count stays 10** and artifact count is unchanged.

**Credit where due:** the user spotted the Hero typing. I had checked Titan of Innovation's type
line when Roaming Throne came up and never re-checked this one, because it was already cut.

---

## 2026-08-07 — Vision of Love proposed, then REVERTED. Insight Engine stays.

**Proposed:** Vision of Love `{1}{R}` instant — *"You may sacrifice an artifact or discard a card.
If you do, draw two cards"* — over Insight Engine, on the grounds that Insight Engine is 1/5 field
and slow, while the deck has 6 Treasure makers to feed the sacrifice.

**Reverted on the user's call, and the grounds are better than mine.** Insight Engine's counters
**accumulate**: *"{2}, {T}: Put a charge counter on this artifact, **then draw a card for each
charge counter on it**."* So it's `{2}` → 1 card, `{2}` → 2 cards, `{2}` → 3 cards. From the third
activation on it out-draws a one-shot Vision of Love **every turn**, and it keeps doing it.

I weighted "1/5 field signal" and "slow first activation" and under-weighted **repeatable**. In a
deck with 8 mana rocks, 37 lands and a plan that wants a stocked hand every combat, an escalating
engine beats a one-shot. It's also an artifact, so it feeds the 10 artifact-count payoffs, which a
sorcery-speed instant never does.

**Transferable form:** compare a one-shot against a repeatable engine at the **turn count the deck
actually reaches**, not at first activation. Insight Engine loses turn one and wins from turn three
onward.

**Vision of Love stays available** — it's a fine card at `{1}{R}` and the Treasure synergy is real.
It just doesn't beat this particular slot.

---

## 2026-08-07 — Manabase: three fetches out, three real duals in

**The question that started it:** why run fetches at all, and why ones whose other half is
off-colour?

**Why they worked:** the deck has three duals typed `Land — Island Mountain` (Steam Vents,
Thundering Falls, Turbulent Springs) plus 10 basics — 13 targets. A fetch only needs **one** live
half, so Bloodstained Mire and Wooded Foothills (Mountain) and Misty Rainforest (Island) all fetch
an on-colour dual or basic. The off-colour half is dead text, not a mistake.

**Why they still lost their slots.** The four standard reasons to run a fetch:

1. *Fixing across 3+ colours* — this deck is two colours.
2. *Shuffle payoffs* — Brainstorm, Sensei's Divining Top, Scroll Rack. The deck runs **none**.
3. *Thinning* — ~0.5% each. Noise.
4. *A land that hasn't decided what it is yet* — real, but small with 13 targets already available.

And the singleton argument ("a fetch is another copy of your best dual") is weak here: only
**one** of the three targets — Steam Vents — enters untapped. The other two are usually tapped, so
fetches 2–4 were "pay 1 life, get a worse basic."

**The cost that actually mattered:** **Aettir and Priwen sets the commander's base P/T to your
life total.** The deck already bleeds from Ancient Tomb (2/tap), Steam Vents, Shivan Reef,
Talisman of Creativity and The One Ring's escalating upkeep. Paying 3 more life for nearly nothing
is a direct shrink to a win condition.

**The real reason the base list ran them:** fetches are the *budget-agnostic* way to smooth a
manabase. Volcanic Island is Reserved List at ~$400+. Remove the money constraint — which proxying
does — and the fetch's whole advantage evaporates: you just play the best duals.

| OUT | IN | Why |
|---|---|---|
| Bloodstained Mire | **Volcanic Island** | The best UR land ever printed. No drawback text at all — untapped, no life, no condition — **and** it's `Island Mountain` typed, so Scalding Tarn can still fetch it. |
| Wooded Foothills | **Riverpyre Verge** | Always enters untapped, always taps for `{R}` (7 double-red cards want this). Blue half needs an Island/Mountain — there are 14. 3/5 field. |
| Misty Rainforest | **Sulfur Falls** | Untapped if you control an Island or Mountain — 14 enablers. 31¢, **4/5 field**, the one consensus staple previously skipped. |

**Scalding Tarn stays**, and the reason is stronger than "both halves live": Volcanic Island is
`Land — Island Mountain`, so the Tarn **fetches it**. That makes Scalding Tarn effectively a
**second Volcanic Island for 1 life** — and singleton means a fetch is the only way to run a second
copy of your best dual. Its best untapped target used to be Steam Vents at 2 more life (3 total);
now it's 1 life for a no-drawback dual.

This is also why we don't add fetches *back*: #2 would get Steam Vents (3 life), #3 a tapped dual.
Sharp diminishing returns. **One fetch is correct.**

**Also added: Scorched Geyser over a basic Island.** Of the eight `Island Mountain` duals legal in
Izzet we now run five; the three we don't (Coastal Peak, Molten Tributary, Volatile Fjord) all
enter tapped unconditionally. Scorched Geyser is the exception — *"enters tapped unless you control
two or more basic lands"*, trivially met at 9 basics. Cutting a basic **Island** rather than a
Mountain because red is the tighter colour (7 double-red cards vs 1 double-blue).

**Result:** sources **U21/R20 → U23/R22**, three fewer life paid, three fewer sacrifice steps.
Land count unchanged at 37; basics 10 → 9.

**Correction logged:** the "U19 / R17" figure previously in `pdf.json` counted only lands that
*directly* tap for a colour and ignored what the fetches could retrieve. The true pre-change
numbers were U21/R20.

---

## 2026-08-19 — Conqueror's Flail in, Big Score out

**Grounds:** Evaluated on the user's prompt ("might be critical for a voltron deck"). Both clauses
were costed against *this* list before the call.

**The pump is a rounding error and was not the reason.** *"+1/+1 for each color among permanents you
control"* is hard-capped at **+2/+2** here: Izzet is two colours, and a count of the actual board
showed **54 of the deck's 72 permanents are colourless** — only ~17 are coloured, all U or R. The
same count gives it an unusually stable floor, because the back face **The Invincible Iron Man is
`{4}{U}{R}`, colors [R, U]** — the voltron target supplies both colours by itself, with an empty
board. So it is always exactly +2/+2, which is nothing next to Ultima Weapon (+7/+7), Excalibur
(+10/+0) or Aettir and Priwen (base P/T = life total).

**It was bought for the second clause, which fills a hole nothing else in the 100 covered.** All
existing protection is *creature* protection — Champion's Helm (hexproof), Mithril Coat
(indestructible), Commander's Plate (pro W/B/G), Darksteel Forge (the flipped commander is an
Artifact Creature), plus one-shot Deflecting Swat / Fierce Guardianship. **Not one of them stops a
Fog, a flashed-in blocker, an instant-speed wipe mid-combat, or a counterspell on the six combat
spells** (Great Train Heist, Savage Beating, Seize the Day, Overpowering Attack, Aggravated
Assault, Embercleave). Deciding axis (deck-brain §2.3): everything else in the Equipment package
makes the swing *bigger*; this is the only card that makes the swing *resolve*.

**Two fit bonuses:**
- **Deploys for 0.** The commander's beginning-of-combat trigger puts an artifact from hand onto
  the battlefield and auto-attaches Equipment, so the lockout arrives free at exactly the moment it
  matters. Hard-cast it is `{2}` + `{2}` = 4, tying Commander's Plate and Champion's Helm as the
  cheapest Equipment in the deck.
- **Colourless, so it never fights our own gear.** Per CR 702.16d, Sword of Fire and Ice's pro-red
  clause unattaches four of the sixteen Equipment (Mjölnir, The Reaver Cleaver, Embercleave,
  Hexplate Wallbreaker). The Flail stacks with all of them.

**Honest costs, recorded so the call can be re-checked:** it is turn-limited (sorcery-speed wraths
on their turn still connect, where the other protection covers every turn); it stops **spells
only**, so activated abilities go straight through; opponents still get one response window while
the combat trigger is on the stack; and the **field signal is 1/7** — only `budget-voltron-100`
runs it. It is living purely on the argument above, not on adoption.

**Displaced: Big Score.** In `SIDEBOARD.md`'s own measurement the lowest-value card left in the 100
at **1/5 field**; `{3}{R}` *plus a discard* for a net +1 card; and not one of the six counted
Treasure makers, so the artifact-count package is untouched. **Card Draw 7 → 6, Equipment 15 → 16**,
artifacts 41 → 42, still 100 cards and 3/3 Game Changers.

**Considered and not taken: cutting Sword of Fire and Ice instead.** Structurally it is the weaker
card — the 702.16d conflict above is a live anti-synergy with four maindeck Equipment, where Big
Score is merely low-value. It was left alone because the user kept it deliberately on 2026-08-07
(see the Liquimetal Torque entry) and that call was not re-opened here. If the pilot ever wants the
draw back without losing the lockout, **SoFI is the cut to re-derive first.**

**Knock-on:** `research/hob-set-review-2026-08-09.md` recommended Fateful Discovery displacing Big
Score at "draw 7→7". That slot is now spent — the note there has been flagged stale, and Fateful
Discovery needs a different displaced card or the deck lands at 101.

---

## 2026-08-19 — Four-swap package: Staff / Fateful / Beacon / Hammer (SoFI out)

**Prompted by the user's online finds.** Every card verified via `bun run card`; field signal from
the five optimized sample lists. None of the four adds is a Game Changer — bracket 3 (3/3) holds.
Snapshot: `versions/2026-08-19-before-staff-hammer-beacon-fateful.md`.

| IN | OUT | Grounds |
|---|---|---|
| **Wizard's Staff** | Cursed Mirror | The pending HOB MAIN, applied as recommended. Third deploy trigger with Roaming Throne on Hero (CR 603.2d — doublers add). Rocks 8→7 = exactly the field average. Mirror was 2/5 and the designated flex OUT. |
| **Fateful Discovery** | One with the Machine | The stale HOB MAIN, re-derived against the current draw six. Engine (every artifact ETB = a card; a Reaver Cleaver hit = that many Treasures = that many draws) over a one-shot that needs a fat artifact already on board. Enchantment — survives Blasphemous Act, Chandra's Ignition, Battleship. OwtM was 2/5. |
| **Command Beacon** | 1x Mountain | Attacks the *measured* pain (2026-08-18 ledger: "the pilot reported never reliably reaching" the commander). Tax reset + either face castable from hand (CR 712.11b is zone-agnostic): flat `{4}{U}{R}` after any number of deaths. R sources 22→21; nothing in the 100 counts Mountains (Desert Were-Worm is sideboard-only); Scorched Geyser needs 2+ basics — 8 remain. 1/5 field, but our problem is documented, not speculative. |
| **Hammer of Nazahn** | Sword of Fire and Ice | **User's call, reversing two earlier keeps — the evidence moved.** With the Staff (a blue card) in, SoFI's pro-red/blue unattaches **five** maindeck Equipment (Mjölnir, Reaver Cleaver, Embercleave, Hexplate, Staff). Hammer: every Equipment that *enters* attaches free — hard-casts, Welder/Engineer graveyard returns, and Titan of Innovation's mid-combat fetches (tapped is irrelevant for Equipment) — plus +2/+0 and a third indestructible source, keeping our own Blasphemous Act one-sided. Deciding axis: live anti-synergy vs added engine. Honest limit recorded: the Hammer does **not** re-attach gear already stranded on the battlefield — that's Thorin's job (now a sideboard row). SoFI moved to the sideboard (displaces the Hammer, grind-lane row). |

**Net:** rocks 8→7, draw stays 6, lands stay 37 (basics 9→8), Equipment 16→17, artifacts stay 42,
creatures stay 10, 100/100, 3/3 GC. Artifact-count payoffs 10→9 (One with the Machine left).

**Re-derived and KEPT, with the grounds updated:**

- **Urza's Saga** (3/5 field) — chapter II Constructs are +1/+1-per-artifact (routinely 6/6+ here,
  survive Battleship's 4); chapter III's only legal fetch in this 100 is **Sol Ring** (the artifact
  lands have *no* mana cost, so they don't qualify — and it whiffs if Sol Ring is already out).
  Pilot notes: play it when `{2}` is spare the next two turns; respond to the chapter III trigger
  with a final Construct activation.
- **Knuckles the Echidna** — the user proposed cutting; re-reading flipped it. The prior grounds
  (Treasure package) had **omitted the card's strongest line**: *"if you control thirty or more
  artifacts, you win the game"* — live in a 42-artifact deck that mints Treasures and Constructs.
  Also the best holder for sideboard SoFI (double strike = two triggers). Costs recorded:
  `{2}{R}{R}` must be hard-cast (not an artifact), dies to all three of our own sweepers.
- **Iron Man, Titan of Innovation** — reframed for the pilot as a *tutor engine*: attack → Treasure
  → sac it (MV 0) → fetch any MV 1 (Sol Ring), or ladder a `{2}` rock into Mithril Coat /
  Commander's Plate, Thran Dynamo into Genji Glove / Arc Reactor. Fetched Equipment arrives tapped
  (costless for Equipment) and **Hammer of Nazahn now attaches it free mid-combat**. Roaming
  Throne doubles the whole trigger.
- **The copy suite** (now 2 after Cursed Mirror left): **Phyrexian Metamorph** — best line is
  copying our own *nonlegendary* Extinguisher Battleship for a second free wipe ETB; never copy own
  legendaries. **Mystic Reflection** — interaction first: respond to a scary commander's arrival by
  making it enter as a copy of a nonlegendary dork; blowout mode: point it at a big Construct
  before a token batch enters.

**Rejected, with grounds (full oracle pulled for each):**

- **The Arkenstone** — colour identity **W** via its `{2}{W}` Adventure half; illegal in Izzet.
  Ledger entry 2026-08-19.
- **Long-Lost Lances, Venser's Journal, Spellbook** — see SIDEBOARD.md bullets.
- **The 11 "Iron Man" name-cards** — the user's count was exact (name search = 11; oracle-text
  search finds only 5 — search names, not rules text, for theme sweeps). Three already run (the
  commander, Titan of Innovation, Iron Man Tony Stark). Of the other eight: **Armored Avenger**
  closest miss (SIDEBOARD bullet); **Master of Machines** already in field-analysis's
  "deliberately not run" list; **Bleeding Edge** copies artifact spells you *cast* — anti-plan in a
  cheat-artifacts deck; **Modern Marvel** (anthem, no wide board), **Futurist Paragon** (6-mana
  go-wide animator), **I Am Iron Man** (trick below the 10-hard-answer bar), **Iron Man Armor**
  (payload below all 17 incumbents), **Origin of Iron Man** (chapter III duplicates the
  commander's own engine). Standing conclusion: theme ≠ synergy — most of these are built for the
  cast-artifacts or go-wide Iron Man archetypes, and the "non-Iron-Man" cards they'd replace are
  the interaction/extra-combat/draw glue that keeps this list the committed outlier.
- **Cost-reduction research (user asked):** generic reducers for the 99 stay rejected — the 6 vs
  field-9.2 gap *is* the cheat-artifacts identity. The commander-side gap is now addressed by
  Command Beacon; **Training Grounds** held as a SIDEBOARD bullet (transform `{4}{U}{R}` →
  `{2}{U}{R}`, near-dead otherwise). **Mass-attach pool exhausted:** Hammer (taken), Thorin
  (sideboard), Brass Squire and Magnetic Theft (SIDEBOARD bullets) — everything else is white.
- **Glamdring, Foe-hammer** — still the open HOB MAIN, still unapplied; its proposed slot
  (Aettir and Priwen) was *not* spent by this package. Next session's question if the pilot wants
  a fifth swap.

---

## 2026-08-19 — Amendment: Command Beacon's cut was Scalding Tarn, not a Mountain (user's call)

**What changed:** the pilot took Scalding Tarn out for Command Beacon instead of the recommended
basic Mountain. Files reconciled to match: basics stay 9 (6 Mountain / 3 Island), fetches 1 → 0.

**The trade, stated honestly:** the Tarn counted as both a U and an R source (it fetches Volcanic
Island, Steam Vents, or a basic, untapped), so this cut costs **U23 → U22 *and* R22 → R21** where
the Mountain cut cost only R. In exchange: no more 1-life fetch tax in a deck that already bleeds
(Ancient Tomb, The One Ring, painlands — and Aettir and Priwen keys base P/T to life total), one
more basic against nonbasic hate, and 11 Mountains stay for sideboard Desert Were-Worm.

**Grounds that expired with it:** the 2026-08-07 manabase entry kept the Tarn as *"effectively a
second Volcanic Island for 1 life"* and concluded *"one fetch is correct."* That verdict is now
moot — zero fetches. The same entry's reasons for not adding fetches **back** all still hold
(two colours, no shuffle payoffs, thinning is noise), so the fetch count should stay 0 unless the
manabase actually misfires in play. If U22 ever feels tight, this is the first swap to re-check.

---

## 2026-08-19 — Two sweeps on the pilot's prompts: power-flings and goad/mass-tap. No maindeck change.

**Prompt 1: "more cards like 'deals damage equal to its power'"** (the 37/37 Aettir-and-Priwen
dream). Swept `o:"deals damage equal to its power"` (77 hits) and the sac-fling wording (12 hits)
in `ci<=UR`; every candidate is **0/5** in the optimized field.

**Verdict: the deck already owns the family's best card.** Chandra's Ignition *is* the dream —
and **Mjölnir doubles it** (verified: *"Double all damage equipped creature would deal"* — the
Ignition damage is dealt by the creature). At life-total power ~30 that is ~60 to each opponent
plus a near one-sided wipe. Deciding axis for the rest: **in this deck an extra combat strictly
dominates a fling** — an extra combat phase is a fresh beginning-of-combat (another ×3 deploy
trigger), attack triggers (Treasures, Omnitool dig, Titan fetch), and **commander damage** toward
the 21, where a fling is raw noncombat damage that must chew through full 40-life totals and is
dead without a board. Soul's Fire kept as a sideboard row for attack-tax pods (instant, any
target, Mjölnir-doubled); Fiendlash noted as the fun three-piece line (indestructible commander +
own Blasphemous Act → fling 2× power); the rest recorded in SIDEBOARD.md with per-card grounds.

**Two pilot notes recorded with it:** (1) Aettir and Priwen is **dynamic** — *"base power and
toughness X/X, where X is your life total"* — so Ancient Tomb / One Ring / painland bleed shrinks
the commander in real time; sequence the Ignition turn *before* paying life that turn. (2) This
whole plan runs through A&P, which is **the same slot the still-open Glamdring recommendation
wants** — the pilot's enthusiasm here is evidence for keeping A&P when that question is next
raised.

**Prompt 2: "goad or tap all creatures so no one can block us."** Swept the goad/forced-attack/
mass-tap pool in identity; every candidate is **0/5** in the field, and the measurement says why:
**the blocking problem is already solved in layers** — the flipped commander has *flying* (only
fliers/reach may block at all), trample beats chumps (CR 702.19b entry), Ultima Weapon kills a
blocker on attack before blocks, Conqueror's Flail stops flash blockers and Fogs, instant bounce
(Into the Flood Maw, Otawara) clears the one that matters, and Rogue's Passage sits in the
sideboard. Also corrected a common misread: **goad does not forbid blocking** — its value is
their creatures attacking each other on their turns and arriving at yours tapped and shrunken.
Disrupt Decorum (the one mass goad with *"a player other than you"*) kept as a sideboard row for
creature-heavy pods; Bident of Thassa and the symmetric forced-attack cards rejected because
their forced attacks **can be pointed at us**; Icy Blast / Sleep recorded with grounds.

## 2026-08-20 — V2 recomposition after an 0-for game night (new list in DECK-V2.md; V1 intact)

**Trigger:** the pilot lost every game on 2026-08-19 and reported three failure modes: (1) the
commander is too slow — 6 / 8 / 10 with tax, "6+ turns doing absolutely nothing"; (2) no board =
no blockers, bleeding 10+ a turn to creature decks and racing pingers from behind; (3) the
expensive payload and loose extra combats were dead in hand whenever the commander was down.
Asked for a **new version, original intact**, with free artifact casting and automatic attaching
as MUSTs. Full diagnosis, swap grounds, EDHREC-list disposition and pilot notes:
`research/v2-recomposition-2026-08-20.md`.

**Three verdicts re-derived and reversed on play data (§1.1b — facts kept, verdicts expired):**
- *"Creature-light (10) is load-bearing for one-sided sweepers"* — the upside never materialized
  because the deck died before its sweepers mattered. V2 runs 17 creatures, all reducers /
  engines / blockers; accepted cost: Chandra's Ignition and Blasphemous Act now hit our own
  dorks (both are finishers, not resets — pilot note recorded).
- *"Extra combats strictly dominate"* (2026-08-19) — only true of a functioning deck. Kept the
  three that are free-deployed or infinite (Genji Glove, Hexplate, Aggravated Assault); cut the
  four loose spells.
- *"This deck skips cost reduction"* — already half-reversed by LEDGER 2026-08-18; completed
  here. The back face is an **artifact creature spell**, so artifact-worded reducers discount it
  *and its tax* (CR 601.2f + 903.8): two reducers turn 6/8/10 into 4/6/8.

**The 14 swaps (out → in):** Seize the Day → Etherium Sculptor · Overpowering Attack →
Enthusiastic Mechanaut · Savage Beating → Foundry Inspector · Great Train Heist → Shuri ·
Mystic Reflection → Cloud Key · Iron Man, Tony Stark → Iron Man, Master of Machines (the pilot's
"construct on red spell" cut — verified only ~15 red casts in deck) · Excalibur → Hulkbuster
Armor (**Equip Hero {3} reads the un-flipped 2-drop Tony Stark**: 9/9 flying with no transform
and no tax) · Ultima Weapon → Wurmcoil Engine · Extinguisher Battleship → Sai, Master Thopterist
(§1.3: its ETB now strafes our own 17-creature board) · Krang → Jhoira, Weatherlight Captain ·
Portal to Phyrexia → Master Transmuter (Treasures are premium bounce fodder, LEDGER 2026-08-20) ·
Phyrexian Metamorph → Emry · Insight Engine → Thought Monitor · Fomori Vault → Blacksmith's
Talent (lands 37→36; also 1 Mountain → 1 Island on pip count ~26U/21R). Training Grounds was in
the package and dropped in final ranking — the artifact reducers dominate it (same tax fix, plus
they make the whole hand castable); sideboard-tier for counterspell pods.

**Voltron-vs-go-wide question answered:** voltron isn't the problem — the dependence structure
was. V2 keeps the commander-voltron kill and adds a commander-independent floor. The full
go-wide package (Steel Overseer / Thopter Spy Network / War Machine tier) recorded as the pivot
path if V2 still underperforms.

**Validated:** 100/100, headers match contents, 3/3 Game Changers (Tomb, Guardianship, One
Ring), no legality/identity flags, sticker $1,174.38. Bench and meta-swap tiers recorded in the
research file. All 14 adds verified not Game Changers; Mana Drain verified NOT a GC (memory said
otherwise — checked, kept out on slots/price anyway).

## 2026-08-20 — V2 amendment: pilot review of the recomposition (four cuts overridden)

The pilot reviewed the 14-swap package. **Ultima Weapon** and **Portal to Phyrexia** returned on
the pilot's call (pre-blocks blocker removal; any-graveyard reanimation that also recurs our own
creatures). **Krang over Darksteel Forge** — the pilot caught that the package's own creature
growth (artifact-creature bodies ~7 → ~12 plus all Thopter/Construct tokens) is what Krang
multiplies, and Krang grants the flipped commander indestructible (he's an artifact creature);
recorded as a Corrections entry in the LEDGER (repeat of the 2026-08-06 pattern). **Extinguisher
Battleship** to the V2 bench as the pilot's "wipe and leave only Iron Man" button. To fit the two
returns, **Thoughtcast** (redundant with Thought Monitor's affinity draw-2-with-a-body) and
**Emry** (recursion #4; Portal covers creatures now) left. Metamorph stays out on the pilot's
lean. Extra combats defended, not restored: Genji / Hexplate / Aggravated Assault keep the
double-trigger one-turn-kill line; Savage Beating is the named fourth. Vigilance gap from the
Excalibur cut acknowledged — Genji's untap substitutes; Captain America's Shield is the named
true-vigilance option. 36 lands defended: the re-added 7/9/9 top end is cheat-target, not
cast-target. Validated: 100/100, 3/3 GC, no flags, $1,202.93. Details:
`research/v2-recomposition-2026-08-20.md` (Amendment section).

## 2026-08-20 — V2 amendment 2: pilot's defense-and-removal package

Pilot directives: Krang→Darksteel Forge reverted back; Captain America's Shield + Basilisk
Collar in (the requested vigilance + lifelink pair — Collar chosen over Shadowspear for
deathtouch: lethal blocks, and Chandra's Ignition becomes a toughness-proof enemy wipe;
lifelink also grows Aettir and Priwen in real time); Propaganda in; Argentum Armor + Meteor
Sword in on the pilot's call against the curve argument, under the rule "deploy targets, never
hard-casts" (Meteor's ETB loops with Goblin Welder). Five ranked cuts: Adaptive Omnitool,
Thought Monitor, Armor Wars, Solve the Equation, Hexplate Wallbreaker (first re-add).
Gameplan written into research/v2-recomposition-2026-08-20.md. Validated: 100/100, 3/3 GC,
no flags, $1,224.53.

## 2026-08-20 — First V2 game night: validated, plus Omnitool back in for Mind Stone

V2 "played A LOT better" (pilot). One structural note: blue-specific mana screw. The pilot
re-derived Adaptive Omnitool's value themselves — it feeds the deploy trigger with fresh
artifacts, same-turn via extra combats (dig resolves at declare attackers, CR 508.3a, after that
combat's deploy at CR 507) — and chose Mind Stone as the cut, which the blue-screw report
supports (colorless source, safest loss). In V2, the sideboard upgrade rows that displaced Mind
Stone now displace Thought Vessel; Thought Vessel → Izzet Signet is the named fix if blue screw
recurs. Validated 100/100, 3/3 GC, no flags. Creature-deck matchup noted as table-wide, no
change. Details: research/v2-recomposition-2026-08-20.md, Amendment 3.

## 2026-08-20 — Pilot's tempo report: off-artifact colored 3-4 drops pay a double tax. Watch list, no change.

The pilot reported that double-pip mid-cost creatures (Knuckles {2}{R}{R}, Jhoira {2}{U}{R})
forced "cast this and do nothing" turns. The structural truth: in this deck a non-artifact card
is neither reduced (reducers read "artifact spells") nor free-deployable (the commander trigger
reads "artifact card"), so it pays full mana AND full tempo — a double tax artifact cards don't
pay. **Standing rule for future adds: be an artifact card, or ≤2 MV, or an instant; anything
else must be exceptional.** Only two current cards flunk the test — Jhoira (kept: unmatched draw
rate) and Knuckles (kept: the Treasure trigger reads "one or more creatures you control," so he
pays out without attacking, plus the 30-artifact win). Both on watch; named swaps if either
underperforms again: Knuckles → Iron Man, Bleeding Edge or Kappa Cannoneer (improvise self-solves
the tempo fork). Mitigations recorded: attach engines first (Hammer makes every Equipment cast
attach free on entry), and creature casts share turns with the free combat deploy once the
commander is out.

## 2026-08-20 — Ultron in, Knuckles out (watch-list resolution)

Pilot's verdict sealed it: without the copy suite, thirty artifacts on the battlefield is not
reachable in a reasonable game, so Knuckles' win clause is dead text and his {2}{R}{R} pays the
double tax (not reduced, not deployable) for Treasures that Face-Breaker / Reaver Cleaver /
Titan / Treasure Vault still provide. Ultron passes every V2 rule: {3} artifact creature —
reduced by all five reducers, free-deployable — and restores the copy suite as an engine
({2} per nontoken artifact ETB; Meteor Sword copies re-fire the ETB Vindicate; Equipment copies
attach free via Hammer; legend-rule caveat on the legendary half of the gear noted). Physical
swap sheet vs V1 grows to 19/19: print Ultron, pull Knuckles. Validated 100/100, 3/3 GC,
no flags.

## 2026-08-20 — Ingenious Artillerist in, An Offer You Can't Refuse to the V2 bench; Titan re-pinned

Pilot asked for "ping per noncreature entry" effects. Family swept and verified: Ingenious
Artillerist taken — it deals damage EQUAL TO THE BATCH to each opponent, so Reaver Cleaver
treasures convert commander damage into table-wide burn (a 12-treasure connect = 12 to every
opponent), Treasure Vault X becomes a burn spell, and every deploy/Thopter/Ultron copy chips.
Passes the ≤2 MV standing rule; 0-field personal tech, taken on merit math. Rejected with
grounds: Reckless Fireweaver (flat 1, redundancy copy if wanted), Firebrand Archer / Nettle
Drone / Molten Nursery / Electrostatic Field (keyed to CASTS — miss the free deploys and every
token), Saheeli Rai (fragile; her −2 hasty functional copy noted). Cut: An Offer You Can't
Refuse (weakest of six counters — feeds the target two Treasures) — pilot chose to trim
interaction (10→9) over equipment; Buster Sword survives. **Iron Man, Titan of Innovation
re-pinned with new grounds from play: he functions as the backup commander when Tony is taxed
out — do not nominate him on the old "fiddly ladder" grounds.** Guard applied: no Treasure maker
was cut for Artillerist (it scales off their count). Validated 100/100, 3/3 GC, no flags.
Physical sheet vs V1 is now 20/20: also print Ingenious Artillerist, also pull An Offer You
Can't Refuse.

## 2026-08-21 — The Vision and Scarlet Witch in, Buster Sword out

Pilot brought The Vision and Scarlet Witch ({2}{R}{R} Legendary Artifact Creature — Mutant
Hero, 3/3 flying, "whenever you cast a spell, add {R} and put a +1/+1 counter"). Taken: it is
an artifact creature (reduced by all five reducers, free-deployable — no double tax), a Hero
(Roaming Throne doubles it to {R}{R} + two counters per spell), refunds on ANY spell including
the non-artifact ones, and is a flying self-growing backup threat. Mana arrives on trigger
resolution (pays for the NEXT spell, empties at end of phase — cast in bunches). Cut: Buster
Sword — equipment was 20/99 and its connect-payoff rider is the most-duplicated in the deck
(Omnitool dig, MoM attack draw, Jhoira, Fateful). Pilot declined Thought Vessel (its no-max-hand
clause has repeatedly beaten forced-draw decks; CR 514.1 — discard is checked only at the
active player's cleanup, so forced draws sit a full turn cycle), Professional Face-Breaker (not
enough play data yet) and Propaganda (wanted as the voltron attack deterrent). Jhoira stays on
watch; Chaos Warp and Arc Reactor recorded as the next candidates. Validated 100/100, 3/3 GC,
no flags. Physical sheet vs V1 is now 21/21: also print The Vision and Scarlet Witch, also pull
Buster Sword.

## 2026-08-21 — Buster Sword swap UNDONE (pilot's catch): its free cast feeds the cast-matters engines

Reverted within the hour. Buster Sword's connect trigger is "draw a card, then you may CAST a
spell from your hand with MV ≤ that damage without paying its mana cost" — a cast, which
triggers The Vision and Scarlet Witch ({R} + counter), Jhoira (draw) and Sai (Thopter). The
incoming card made the nominated cut better; third instance of the pattern today (LEDGER
Corrections). V+SW is still wanted; candidate cut to be chosen from the next tier (Arc Reactor /
Jhoira / Chaos Warp — see next entry).

## 2026-08-21 — The Vision and Scarlet Witch in, Jhoira to the V2 bench (pilot's call)

After the Buster Sword reversal the pilot chose Jhoira as the cut, on the double-tax grounds
they identified themselves: on turn 4 the choice is "cast Jhoira and do nothing, hoping she
survives to next turn" versus "cast two to four artifacts now" — she is neither reduced nor
free-deployable, and her value is all deferred. Guard check passed: Jhoira and V+SW are parallel
cast-matters engines (cards vs mana); V+SW does not depend on her. **Re-add trigger recorded:
if draw feels thin in play, Jhoira is the first card back** — remaining draw: Fateful Discovery,
The One Ring, The Ten Rings, Sai's sac-draw, Master of Machines' attack draw, Omnitool's dig,
Buster Sword's connect, the front-face {1} dig. Arc Reactor and Chaos Warp stay as the next-tier
candidates (pilot unconvinced on Arc Reactor). Validated 100/100, 3/3 GC, no flags. Physical
sheet vs V1: original row 10 becomes "print The Vision and Scarlet Witch, pull Thoughtcast" —
do not print Jhoira. Piles are 20/20.

## 2026-08-21 — Swords pass (pilot's list): no change; Animist recommendation left open

Verified and ranked on the CR 702.16d rule (protection from a colour unattaches your own
Equipment of that colour — coloured gear in V2: Wizard's Staff U; Mjölnir, Reaver Cleaver,
Embercleave R). **Recommended, not applied (pilot paused):** Sword of the Animist in / Arc
Reactor out — mana for mana, fetches the 4 Islands (blue-screw insurance), two lands a turn
with Genji. **Withdrawn:** Sword of Vengeance — trample already from Embercleave + Reaver
Cleaver; double strike (strictly better than first strike) from Embercleave, Genji Glove,
Blacksmith's Talent L3; vigilance from Captain America's Shield; haste native. **Bench:** Sword
of Wealth and Power (pro-instants/sorceries blanks targeted removal and damage wipes, Treasure
feeds Artillerist, copies a counter — but while attached our own Chandra's Ignition can't target
him; doesn't stop Farewell / Toxic Deluge / edicts / overloaded Rift) · Sword of Light and Shadow
(clean; protection redundant with Commander's Plate) · Sword of Kaldra (Collar covers it).
**No:** Sword of Truth and Justice and Sword of Body and Mind (pro-blue unattaches Wizard's
Staff) · Rogue's Passage (colourless land after a blue-screw report; blocking layered already).
Correction made mid-pass: hexproof does NOT cover non-targeting wipes — protection coverage
recorded as a matrix (LEDGER 2026-08-21). List unchanged: 100/100, 3/3 GC, $1,278.06.

## 2026-08-21 — Venser's Journal in, Galvanic Blast out (pilot's call); Padeem / Kaldra re-derived, benched

Final set of the pilot's list. **Venser's Journal** taken: re-derived grounds — the pilot values
no-max-hand-size against forced-draw decks (CR 514.1: discard only at your own cleanup), and the
lifegain now has a payoff (The Ten Rings refills to ten each end step → ~10 life per upkeep →
Aettir and Priwen +10/+10; pinger insurance). 5-MV artifact: reduced, free-deployable. **Cut:
Galvanic Blast** — pilot chose it over Arc Reactor / Thought Vessel (my ranking: Arc Reactor >
Galvanic > Vessel). **Re-add trigger: the pinger matchup** — Galvanic was the only one-mana
instant answer to a utility creature; remaining instant answers are Into the Flood Maw, Chaos
Warp and the counters, plus removal sticks and wipes. **Kaldra Compleat** re-derived: the old
"living weapon walks it onto the Germ" rejection is solved in V2 by Hammer of Nazahn trigger
ordering or Blacksmith's Talent L2 (or Equip {7}); passed anyway on the pilot's call — it is a
two-piece card in a deck of one-piece cards; the Germ-mode floor (5/5 first strike, trample,
indestructible, haste, exile-on-damage) noted. **Padeem** stays a sideboard row (artifact-hate
pods): hexproof for all artifacts fills the "targeted removal on Equipment" cell, upkeep draw
near-guaranteed, but a {3}{U} non-artifact 4-drop — the Jhoira profile. Validated 100/100, 3/3
GC, no flags. Physical sheet vs V1 is now 21/21: also print Venser's Journal, also pull
Galvanic Blast.

## 2026-08-21 — Riverglide Pathway in for a Mountain (pilot's framing); Panharmonicon slot open; Arc Reactor & Chaos Warp re-pinned from play

Pilot won games on V2 but reported thin draw. Pass on Panharmonicon / Riverglide Pathway /
Ironheart / Armor Wars: **Pathway taken over a basic Mountain (5→4)** on the pilot's correct
point that a colour-choice land beats a fixed basic when colour-screwed; counting Pathway as
both colours, red-capable sources stay 20 and blue-capable rise to 24; Scorched Geyser still
sees 8 basics. Turbulent Springs kept (pilot: opponents nearly always hold 8+ lands).
**Panharmonicon reversed to YES on grounds** — V2's ETB density: it doubles Fateful Discovery
(two cards per artifact entering = the draw fix), Artillerist, Synthesizer, Ultron, Meteor
Sword's Vindicate, Portal's edict, Mjölnir's ETB, Hammer/Mithril attach, Engineer's tutor;
still does NOT double the commander's combat deploy, cast triggers (V+SW, Sai) or attack triggers
(MoM, Omnitool); adds with Roaming Throne. **Slot not yet chosen:** Arc Reactor re-pinned (pilot:
Ultron-copied Reactor = 6 mana a turn — play data), Chaos Warp re-pinned (pilot: the only
instant answer to a game-locking enchantment), Thought Vessel declined. Remaining candidate:
Professional Face-Breaker (untested non-artifact 3-drop; his Treasure feeds Artillerist — noted).
**Armor Wars re-derived as a strong re-add** for the draw complaint (draw per artifact vs one
card per opponent is sharply asymmetric; chapter I is immediate, unlike Jhoira's deferred value);
held pending Panharmonicon's effect. **Ironheart** benched (improvise overlaps the reducers).
Validated 100/100, 3/3 GC, no flags. Physical sheet vs V1: +1 row (print Riverglide Pathway, pull
a Mountain) → 22/22.

## 2026-08-21 — Panharmonicon in for Professional Face-Breaker; Armor Wars back in for Thought Vessel (pilot's calls)

Draw package applied. **Panharmonicon ← Professional Face-Breaker**: the only slot without play
data; Face-Breaker's Treasure-per-connect (one Artillerist ping) and Treasure-impulse trickle
traded for the ETB doubler — Fateful Discovery now draws two per artifact entering, and
Artillerist / Synthesizer / Ultron / Meteor Sword / Portal / Mjölnir / Engineer / Hammer-Mithril
attach all double. **Armor Wars ← Thought Vessel**: pilot reconsidered — with Venser's Journal
covering no-max-hand-size, Vessel's unique text was the {C}; Armor Wars' chapter I is immediate
burst draw (a card per artifact vs one per opponent). Ramp is now 5 rocks (Sol Ring, Arcane
Signet, Talisman of Creativity, Thran Dynamo, Arc Reactor) + 5 reducers + V+SW refunds + 36
lands — **watch mana count next game night**; Thought Vessel is the first re-add if it slips,
Face-Breaker if Artillerist wants more Treasure events. Validated 100/100, 3/3 GC, no flags.
Physical sheet vs V1 is now 23/23: print Panharmonicon; pull Professional Face-Breaker and
Thought Vessel; Armor Wars is no longer pulled (back in).

## 2026-08-21 — Shadowspear in, Shuri out (pilot's call)

Pilot asked why Shadowspear wasn't in V2; honest answer: binned as "meta tier" during the
85-card triage and passed over for Basilisk Collar when lifelink was requested — slot pressure,
not merit. Re-derived grounds for IN: {1} Equipment (free via reducers / deploy / Hammer), a
second lifelink source for Aettir and Priwen, the cheapest trample source, and the unique "{1}:
opponents' permanents lose hexproof and indestructible" — turns Argentum / Meteor / Ultima /
Chaos Warp / bounce on against hexproof commanders and makes Blasphemous Act kill indestructible
boards. Slot: pilot chose **Shuri** from the ranked options (Ultima Weapon, Shuri, Hulkbuster
Armor, Strix Serenade), applying their own rule "cut a creature reducer, never Cloud Key."
Shuri's full grounds recorded: the one reducer that is not an artifact (no deploy / Fateful /
Artillerist / Ultron), a 2/1, and her {1},{T} copy trick is mostly "a Thopter becomes Wurmcoil
for a turn"; 72% field noted as the counter-signal. Reducers 5→4 (Sculptor, Mechanaut, Inspector,
Cloud Key); Equipment 21. Gilded Lotus for Arc Reactor still pending the pilot's go. Validated
100/100, 3/3 GC, no flags. Physical sheet vs V1: original row 4 becomes "print Shadowspear, pull
Great Train Heist" (Shuri no longer printed); still 23/23.

## 2026-08-21 — Gilded Lotus in, Arc Reactor out (pilot's call after asking why Reactor over Lotus)

Grounds: same printed cost and the same reducer discounts, but Lotus enters UNTAPPED and makes
three of one COLOUR — the two axes with actual play reports against them (blue screw; tempo).
Structural reason recorded: reducers cut only generic mana, so as they accumulate the remaining
cost is coloured pips — coloured rocks get better over the game here, colourless rocks worse.
Arc Reactor's only edges were improvise and the name (70% field, theme-inflated). Ramp stays 5:
Sol Ring, Arcane Signet, Talisman of Creativity, Thran Dynamo (kept — the untapped colourless
sink for tax / transform / equip / Ultron / Aggravated Assault), Gilded Lotus. Izzet Signet is
the named sixth rock if one ever returns (a colour filter beats Thought Vessel here). Validated
100/100, 3/3 GC, no flags. Physical sheet vs V1: +1 row (print Gilded Lotus, pull Arc Reactor)
→ 24/24.

## 2026-08-21 — V3 built (engine + insurance); V2 preserved for A/B

Pilot report on V2: can't finish, targeted removal 2-for-1s the Equipment then the commander,
and repeatable draw is the weak spot — explicitly asked for a structural change, not another
one-of, and for a separate V3 file to compare against V2. Thesis: all three symptoms are one
problem — ~1 artifact deployed per combat, 21 Equipment, and only two cards converting artifacts
into cards, so the deck never reaches or rebuilds an already-lethal finisher. Chose directions
**A (tokens are cards) + B (never expose the suit)**; C arrives free via Iron Man Armor.
**IN:** Thopter Spy Network · Weapons Manufacturing · Vedalken Orrery · Padeem · Iron Man Armor.
**OUT:** Hulkbuster Armor (pilot-confirmed) · Ultima Weapon (dominated by Argentum: "destroy
target permanent" > "destroy target creature", which is the pilot's own stated need) · Meteor
Sword · Buster Sword · Sai (cast-matters in a deploy deck). Equipment 21→18. Key verified fact:
**the back face is a 5/5**, so Mjölnir + any double-strike source = 4× power = 20 bare (one short
of 21) and **24 with Embercleave = a one-connection commander kill** — the finishing problem is
partly a suiting-priority problem. Measured: Fateful Discovery is the ONLY true
artifact-enters-draw in Izzet (search `id<=ur o:"artifact you control enters" o:"draw a card"` —
others are loot), hence a draw engine that doesn't route through it. Also fixed V2 header drift
(Artifact Payoffs read 10, held 9; totals were always 100). Validated: 100/100, headers match,
3/3 GC, no flags, $1,281.33. Full grounds: research/v3-engine-insurance-2026-08-21.md.

## 2026-08-21 — V3 amendment: Academy Manufactor in, Strix Serenade out

Pilot took Manufactor off the bench on a synergy I had underweighted: MV 3 is exactly the ceiling
of Goblin Engineer's reanimate clause ("artifact card with mana value 3 or less"), so Engineer
tutors it AND rebuys it after removal — directly on V3's thesis. Also an MV-3 artifact on entry
(Fateful draw + Artillerist ping + Simulacrum Synthesizer Construct); Food feeds Aettir's
life-total P/T, Clues are draw. Cut: Strix Serenade — it counters only artifact/creature/
planeswalker spells, so it is the one counter that **cannot** stop the targeted removal V3 is
built against; Swan Song, Counterspell and Fierce Guardianship all can and all stay. Treasure
density noted as the remaining upgrade (3 sources: Treasure Vault, Reaver Cleaver, Titan; Xorn /
Professional Face-Breaker are the named fourth). Validated 100/100, headers match, 3/3 GC, no
flags, $1,287.44.

## 2026-08-25 — Mana Drain in, Swan Song out (V3)

Pilot asked why Mana Drain wasn't run. Honest answer: no principled rejection — it was filed
"meta tier" in the 85-card triage and never given a slot. Re-verified from Scryfall:
**game_changer: false**, so it does not touch the 3/3 bracket-3 cap. Taken as a strict upgrade
in the counter slot, and the rider is unusually good here: the {C} it adds at the next main
phase is exactly the colourless the deck is short of (commander tax, the {4}{U}{R} transform,
equip costs, Ultron's {2}-per-copy, Aggravated Assault's {3}). Pilot directed the cut come from
a counter other than Counterspell. **Cut Swan Song**, and not merely as the weakest: its 2/2
**flying** Bird is one of the few bodies that can block the flying commander — paying a
counterspell to build the blocker that stops your own kill. Fierce Guardianship kept (free with
a commander, protects while tapped out; also 1 of the 3 GCs). Honest cost of the trade: {U} → {U}{U}
on that slot, which matters when holding up mana on a big turn. Counters now Mana Drain,
Counterspell, Fierce Guardianship, plus Deflecting Swat as the redirect. Validated 100/100,
headers match, 3/3 GC, no flags, $1,333.33. Moxfield file regenerated: Mana Drain needs a
printing, Swan Song (LTC 197) moved to the sideboard block.

## 2026-08-25 — V3: Mystic Forge + The Reality Chip in; Armor Wars + Venser's Journal out

After testing V3 the pilot chose two of the four cast-from-top options. **Combo check: safe** — the
infinite-draw loop I flagged needs Sensei's Divining Top specifically (cast it off the top for {0}
with any reducer, tap to draw, replace); Mystic Forge + Reality Chip together create no loop, so
bracket 3 is unaffected. **The Reality Chip** is the one that reads the WHOLE library ("play lands
and cast spells from the top"), which is what makes Mystic Forge's blind spot survivable — Forge
alone only casts artifact/colorless spells, ~43 of 99 cards, with 36 lands as the wall; its
{T}+1 life exile clears that wall but shrinks Aettir and Priwen. Reconfigure {2}{U} must be paid
by hand: the Chip enters as an Equipment CREATURE, so Hammer of Nazahn and Blacksmith's Talent
cannot attach it (CR 301.5c).
**Cuts, both from the draw role** (11 draw/access cards would be over a tenth of the deck):
**Armor Wars** — chapter I gives every opponent a card and the Saga is gone in three turns, the
weakest engine now that four others exist. **Venser's Journal** — pilot's own earlier pick, cut on
a redundancy found in the re-derivation: The Ten Rings already reads "your maximum hand size is
ten" AND refills to ten each end step, so Journal's no-max clause is near-moot alongside it (two
continuous effects, later timestamp wins) and its upkeep lifegain was the only unique half.
Named alternative if the pilot prefers to keep Journal: Adaptive Omnitool (its attack dig is now
redundant with two continuous top-access engines, though its +1/+1-per-artifact is a real
finisher pump). Draw/Engines stays 9. Validated 100/100, headers match, 3/3 GC, no flags,
$1,333.97. Both adds verified not Game Changers.

## 2026-08-25 — Correction to the entry above: only The Reality Chip goes in, for Venser's Journal

Superseding the previous entry's package. The pilot had not finished evaluating the cuts when it
was applied — my error, applied on a vote for the two cards without agreeing what they displaced.
Final state: **The Reality Chip in, Venser's Journal out. Mystic Forge NOT taken; Armor Wars
stays.** Grounds unchanged and still recorded above: the Chip reads the whole library ("play
lands and cast spells from the top"), where Mystic Forge sees only artifact/colorless spells
(~43 of 99, with 36 lands as the wall) and pays 1 life per dig — life being Aettir and Priwen's
power. Reconfigure {2}{U} is paid by hand: the Chip enters as an Equipment CREATURE, so Hammer
of Nazahn and Blacksmith's Talent cannot attach it (CR 301.5c). Venser's Journal cut on the
redundancy with The Ten Rings ("your maximum hand size is ten" plus a refill-to-ten each end
step), leaving its upkeep lifegain as the only unique half. Draw/Engines stays 9. One change to
V3 rather than three, so the next play report stays readable. Validated 100/100, headers match,
3/3 GC, no flags, $1,331.22.

**Process note for future sessions:** the pilot asked to discuss before changes and I applied a
package anyway. Ask for the play report and agree the displaced cards BEFORE editing the list.

## 2026-08-25 — V3: Krang + Thousand-Year Elixir in; Academy Manufactor + Weapons Manufacturing out

**Pilot stated the design brief that resolved a long slot fight:** this version is *voltron kill,
with artifact creature bodies as defence against creature-heavy boards* — not an artifact-value
engine deck. That brief supplies a hard test the two cut cards both fail: **their tokens are
artifacts, not creatures, so neither produces a single blocker.** Munitions don't block; Clues,
Food and Treasures don't block; Manufactor itself is a 1/3.

**Krang, Utrom Warlord** is the biggest available upgrade to that brief: "other artifact creatures
you control have flying, trample, indestructible, and haste" — the flipped commander IS a
Legendary Artifact Creature, so **he gains trample and indestructible too**, and every Thopter,
Construct and reducer body becomes unkillable in combat and through damage wipes (also makes our
own Blasphemous Act near one-sided). Darksteel Forge kept alongside it on the pilot's grounds:
Krang covers only creatures, Forge covers ALL artifacts, which is the Vandalblast/mass-artifact-
removal insurance Krang cannot provide.

**Thousand-Year Elixir** taken on the pilot's call ("I can very easily get it on the board"):
activate creature abilities as though hasted — turns on Master Transmuter / Goblin Welder /
Goblin Engineer the turn they land, and lets Ultron's copies of mana rocks tap immediately — plus
{1},{T}: untap a creature for a second Transmuter cheat or Weld each turn. Recorded honestly: it
is a support artifact, not a body, so it does NOT serve the defensive half of the brief; taken to
be tested.

**Mechanical fact that decided the Manufactor-vs-Weapons-Manufacturing ranking** (worth keeping):
Weapons Manufacturing is a *triggered* ability, so **Panharmonicon doubles it** (one free deploy →
2 Munitions → 6 cards off Fateful Discovery); Academy Manufactor is a *replacement effect*
("if you would create... instead create"), so **Panharmonicon does nothing for it**, and it needs
one of only three Treasure sources (Treasure Vault, Reaver Cleaver, Iron Man Titan — two of them
combat-dependent) before it does anything at all. Under a value brief Manufactor is the cut and
Weapons Manufacturing stays; under this defensive brief both fail, so both left.

**Risk logged:** Weapons Manufacturing was the largest card-flow engine and draw was the pilot's
original complaint — if draw regresses next game night it is the first re-add, ahead of Insight
Engine and Jhoira. Cards defended by the pilot this round and NOT cut: Fabricate (can find a
game-ender — Mjölnir, Genji Glove, Embercleave), Into the Flood Maw (removes a blocker before the
kill shot or an attacker before lethal), Adaptive Omnitool ("my finisher most games" — so artifact
COUNT is damage), Captain America's Shield (vigilance + taps a would-be blocker at declare
attackers), Darksteel Forge, Armor Wars. Validated 100/100, headers match, 3/3 GC, no flags,
$1,355.69.

## 2026-08-25 — V3: Manifold Key + Unwinding Clock in; Ingenious Artillerist + Aggravated Assault out

**Ingenious Artillerist cut on the "check the enabler survived" rule** (LEDGER 2026-08-04): its
damage scales with the SIZE of the batch of artifacts entering, and the two cards that made
batches — Weapons Manufacturing and Academy Manufactor — were both cut earlier the same day. Left
alone it pings ~1 per combat, and it is a non-artifact creature (double tax, no Omnitool count).
**Aggravated Assault cut on the voltron brief:** Mjölnir + Embercleave kills a player in ONE
connection (5/5 base → 6/6 → ×4 with double strike + Mjölnir = 24), so a second combat is
win-more, and Genji Glove already grants one free every turn it's attached. Side effect: the deck
loses its Sword of Feast and Famine / Reaver Cleaver infinite, so it is now a clean bracket 3
rather than the "3.5" the sideboard file describes.

**Manifold Key** {1}: "{3},{T}: target creature can't be blocked this turn" answers the pilot's
own stated failure — a 1/1 flier chumping the kill shot — repeatably and cheaper than Rogue's
Passage, and it is an artifact (Omnitool count) at **mana cost {1}, so Urza's Saga chapter III can
fetch it** (measured: V3 now has five ch-III targets — Sol Ring, Basilisk Collar, Shadowspear,
Commander's Plate, Manifold Key; the old "Sol Ring only" note is stale). Its {1},{T} mode untaps
Gilded Lotus / Thran Dynamo / Master Transmuter / Thousand-Year Elixir.
**Unwinding Clock** {4}: rocks untap on all three opponents' turns (hold up Mana Drain /
Counterspell and flash artifacts with Vedalken Orrery), and — the half that serves the defensive
brief — **artifact creatures untap before every opponent's turn, so they attack on ours and still
block on theirs.** Pseudo-vigilance for the whole team, and Krang makes those blockers
indestructible.

**Reorganised** so the package reads as one: new section "Cheat, Attach & Untap (6)" —
Master Transmuter, Blacksmith's Talent, Vedalken Orrery, Thousand-Year Elixir, Manifold Key,
Unwinding Clock. The "Extra Combats" section is gone (Genji Glove still provides one from the
Equipment slot). Draw/Engines 9→8, Payoffs 10→9. Validated 100/100, headers match, 3/3 GC,
no flags, $1,338.81.

## 2026-08-25 — Piloting note: attach The Reality Chip to a spare body, not the commander

Pilot found the Chip "too expensive sometimes." Diagnosis before swapping it out: the {1}{U} cast
plus {2}{U} reconfigure is paid ONCE — the recurring cost only appears if the host creature dies,
because the Chip then unattaches and becomes a creature again. Attaching it to the commander (the
most-targeted permanent on the table in this deck) guarantees paying repeatedly. **Attach it to
the least-targeted creature instead** — Etherium Sculptor, Foundry Inspector, a Thopter token,
Padeem. The Chip's text only requires that it be attached to *a* creature, not to the attacker.
Pilot is retrying it this way before considering a swap. Named alternatives if it still feels
clunky, in order: **Crystal Skull, Isu Spyglass** ({2}{U}{U} — no attachment cost, sees every
historic spell = artifacts + all legendaries + Sagas, plays historic lands, and taps for {U};
downside is the double blue) then **Mystic Forge** ({4}, no ongoing cost, but casts only artifact/
colorless spells — measured at 46 of the 99, with the 36 lands as a wall it must pay 1 life each
to dig past, and life is Aettir and Priwen's power).

## 2026-08-31 — Iron Spider, Stark Upgrade in; The Vision and Scarlet Witch out

Iron Spider {3} (Legendary Artifact Creature — Spider Hero, 2/3 vigilance) serves **both halves of
the brief at once**, which is why it beat the incumbent. *Defence:* "{T}: put a +1/+1 counter on
each artifact creature and/or Vehicle you control" hits 13 nontoken artifact creatures plus every
Thopter, Construct and Ultron copy, and the counters are **permanent** — chump blockers stop being
chumps, and Krang makes the grown bodies indestructible. *Voltron:* the flipped commander IS an
artifact creature, so he takes a counter every activation, and with Mjölnir + a double-strike
source **each +1 power is +4 damage**. It also converts spare counters into cards ("{2}, remove two
+1/+1 counters from among artifacts you control: draw"), a draw axis that does not route through
Fateful Discovery.

**Fits the untap package built the same week:** Unwinding Clock untaps it on all three opponents'
untap steps and the ability is instant-speed with no restriction, so it is **four activations per
turn cycle**, not one; Manifold Key and Thousand-Year Elixir each add more.

**Two facts recorded so it is not over-valued:** Roaming Throne does **not** double it — the Throne
doubles *triggered* abilities and both of Iron Spider's are *activated*, so "Hero" is flavour here,
not synergy. And it is summoning sick on arrival unless Thousand-Year Elixir is already out.

**Cut: The Vision and Scarlet Witch** — the close cousin (artifact creature Hero built on +1/+1
counters) that loses the comparison on every axis that matters here: its counters go only on
itself, and it keys off **casting** spells, the recurring misalignment in a deck designed to deploy
for free. Validated 100/100, headers match, 3/3 GC, no flags, $1,314.10.

## 2026-08-31 — Steel Overseer + Retrofitter Foundry in; Cloud Key + Panharmonicon out

Scryfall pass on the deck's live axes (untap loops, +1/+1 counters, bodies that block) after
Iron Spider proved out. **Steel Overseer** {2}: "{T}: put a +1/+1 counter on each artifact creature
you control" — Iron Spider's first mode a mana cheaper, so with Unwinding Clock the pair puts
**eight counters per turn cycle** on every artifact creature including the commander (each +1 power
= +4 damage through Mjölnir + double strike). **Retrofitter Foundry** {1}: the token maker that
passes the blocker test Weapons Manufacturing and Academy Manufactor failed — Servos, flying
Thopters and 4/4 Constructs are **creatures**. It also **untaps itself** for {3}, so it works
without Unwinding Clock and goes into overdrive with it (an instant-speed blocker on every
opponent's turn), and it is a {1} late-game mana sink.

**Cuts (pilot's choice from the ranked candidate list):** **Cloud Key** — the only cost reducer
that is not a body, in a deck whose brief is bodies; the other three reducers meanwhile got better
(they take Iron Spider counters and Krang makes them indestructible). Recorded cost: Cloud Key was
the one reducer that survived a creature wipe; reducers now 4 → 3, all creatures.
**Panharmonicon** — from the same-day audit: it had lost three of its payoffs (Weapons
Manufacturing, Academy Manufactor, Ingenious Artillerist) and was down to being conditional on
Fateful Discovery or Simulacrum Synthesizer. Recorded cost: the doubled Portal to Phyrexia
blowout (six sacrifices per opponent) is gone. Pilot declined the Tier-1 candidates I ranked
higher (Sword of Feast and Famine, which lost its Aggravated Assault combo, and Aettir and
Priwen) — both remain the next candidates.

**Rules facts recorded from the pass:** Roaming Throne does NOT double Iron Spider or Steel
Overseer (both abilities are *activated*, the Throne doubles *triggered*). Iron Spider's draw mode
has no {T} in its cost, so it is **unlimited per turn** (mana and counters permitting) — the untap
only buys extra uses of the counter mode. Cranial Plating was rejected as **illegal**: its {B}{B}
attach ability makes its colour identity black.

**Consequence to watch:** creature count is up again, so Blasphemous Act and Chandra's Ignition are
now only near-one-sided when Krang or Darksteel Forge is out. Validated 100/100, headers match,
3/3 GC, no flags, $1,306.60.

## 2026-08-31 — Cloud Key back in for Foundry Inspector (pilot's pick)

Pilot's reasoning accepted: three reducers that are all creatures means one wipe removes the whole
discount package, and the reducers are what fix the deck's oldest problem (commander lands late).
I recommended cutting Enthusiastic Mechanaut on castability ({U}{R} = two different coloured pips
vs {1}{U} and colourless); **pilot chose Foundry Inspector instead, to keep the flying blocker** —
consistent with the defensive brief. Reducers are now Etherium Sculptor, Enthusiastic Mechanaut,
Cloud Key. **Risk recorded: both remaining creature reducers now require blue**, and Cloud Key is
the only colourless one, so a blue-screwed hand has fewer outs to the discount than before.

**Pilot declined Whir of Invention** with grounds worth keeping: "most often my Iron Man doesn't
survive an extra turn so I need to cast him out again and never have leftover mana" — i.e. the
deck's spare mana is committed to recasting the commander, so instant-speed tutors that want held-up
mana are structurally wrong here. Applies to any hold-up-mana card in this deck.

**Design constraint stated by the pilot, recorded for future passes:** *this version must be a
voltron deck that kills fast — the commander draws counterspells and removal immediately because
of the combat trigger, and the deck cannot win without him on the battlefield.* Corollary noted:
tutors do not address this (the commander is always available in the command zone); what does is
killing in fewer connections (Mjölnir + any double-strike source = 4x power) and protection.

## 2026-08-31 — Brass Squire in, Iron Man Armor out

**Brass Squire re-derived and reversed.** Previously passed as "a structural creature slot (only
the budget list runs it)" — grounds that belonged to a creature-light deck that no longer exists.
Under the current build it is an artifact creature, so: Krang makes it indestructible, Iron Spider
and Steel Overseer put counters on it, Adaptive Omnitool counts it, Thousand-Year Elixir lets it
attach the turn it lands, and **Unwinding Clock untaps it on all three opponents' untap steps —
up to four free attaches per turn cycle at instant speed.** It becomes the fourth free-attach
engine alongside the commander's deploy trigger, Hammer of Nazahn and Blacksmith's Talent L2.

**Cut: Iron Man Armor.** Pilot audit confirmed all 18 Equipment carried a rider (protection,
evasion, a trigger, a multiplier or an attach engine) — no stat-sticks — which is why Doc Ock's
Tentacles (+4/+4) and Hero's Blade (+3/+2) were both rejected despite their free auto-attach on a
legendary/MV-5+ creature entering. Iron Man Armor was the exception in the other direction: its
rider is "+2/+1 and **flying**" on a commander who already flies natively, so it reads +2/+1. Its
real function was the {2} self-animation as a backup threat, which the pilot's stated design
constraint ("this deck cannot win if Iron Man is not on the board") explicitly deprioritises.
Equipment 18 → 17.

**Rejected in the same pass with grounds:** Grafted Wargear (literal Equip {0}, but "whenever this
becomes unattached, sacrifice that permanent" converts every piece of artifact removal into
commander removal — the deck's worst matchup) · Firion, Wild Rose Warrior (copies each Equipment
entering with cheaper equip, but **most of this deck's Equipment is legendary** — Mjölnir,
Embercleave, Commander's Plate, Mithril Coat, Hammer of Nazahn, Aettir and Priwen, Captain
America's Shield, The Reaver Cleaver — so the token copies die to the legend rule on arrival).

Validated 100/100, headers match, 3/3 GC, no flags, $1,305.88.

## 2026-08-31 — Final Equipment pass: no changes. Swordsman's Steel held with a named trigger.

Audited all 17 Equipment: every one carries a unique job (kill multipliers Mjölnir / Embercleave /
Genji Glove; engines Wizard's Staff / Hammer of Nazahn; protection Champion's Helm / Mithril Coat /
Commander's Plate / Conqueror's Flail; riders Shadowspear / Basilisk Collar / Captain America's
Shield; utility Adaptive Omnitool / Aettir and Priwen / Argentum Armor / The Reaver Cleaver /
Sword of Feast and Famine). **No swap warranted from the physical sideboard** — Ultima Weapon is
still dominated by Argentum Armor, Meteor Sword's case got *weaker* when Panharmonicon left,
Hulkbuster was never drawn in any game, and Buster Sword is now win-more (if you connect for
enough to free-cast something big, Mjölnir + double strike already killed that player).

**One redundancy surfaced:** Commander's Plate grants protection from every colour outside the
commander's identity — W, B **and G** — so Sword of Feast and Famine's pro-black/pro-green is
entirely contained within it on a suited commander. SoFF's remaining unique text is +2/+2, the
discard, and untap-all-lands (which does answer the pilot's "no spare mana" complaint).

**Swordsman's Steel identified as the only Equipment that would beat an incumbent** — {4}, "draw a
card for each Equipment you control" on entry (3-6 cards here) plus "+2/+2 for each Equipment",
free via the deploy trigger; hits both live complaints (draw, and killing before the commander is
answered). Not in the physical sideboard, so it needs a new proxy.

**Cut candidates ranked for it, best grounds first:** Ultron (its "you may pay {2}" is a mana sink
in a deck whose spare mana is always committed to recasting the commander — the pilot's own rule
from the Whir of Invention rejection — and the **legend rule blanks most of its Equipment targets**,
since Mjölnir, Embercleave, Commander's Plate, Mithril Coat, Hammer, Aettir, Cap Shield, Reaver
Cleaver and Shadowspear are all legendary) · Counterspell (the only counter that is neither free
nor self-refunding; Mana Drain is the same cost and returns the mana, Fierce Guardianship and
Deflecting Swat are free while the commander is out) · Sword of Feast and Famine (above) ·
Armor Wars (closest twin to Swordsman's Steel but feeds every opponent a card and expires) ·
The Ten Rings (deploy-only 8-drop, one of four MV 8+ cards, the pattern V2 existed to reduce) ·
Goblin Engineer / Thran Dynamo.

**Rejected as a cut with grounds:** Thopter Spy Network looked redundant with the newly-added
Retrofitter Foundry (both make flying Thopters) but survives on the same mana rule — TSN's token
is **free** each upkeep where Retrofitter charges {2}, so they are the unpaid and paid versions and
the unpaid one is the more reliable blocker here.

**Decision: no change now.** Pilot is taking V3 as-is to the table. **Named trigger: if Ultron sits
idle for want of {2}, swap it for Swordsman's Steel.**

---

## 2026-09-02 — V3 pass: Bulk Up and Insight Engine in; The Reality Chip and Blasphemous Act out

Pilot brought seven draw/value spells to evaluate. Two were taken, one was withdrawn under pilot
pushback, four were passed. Snapshot: `versions/2026-09-02-v3-before-bulk-up-insight-engine.md`.

### IN — Bulk Up `{1}{R}` (displaces Blasphemous Act)

*"Double target creature's power until end of turn. Flashback {4}{R}{R}."* Filed as a **finisher**,
not a pump. It resolves as +X/+0 with X locked at resolution, so it is cast after the commander's
combat-trigger deploy and after blockers, and Mjölnir doubles whatever comes out.

| Board | Power | Damage per combat | Commander kill? |
|---|---|---|---|
| Mjölnir alone | 5 | 10 | no |
| Mjölnir + Bulk Up | 10 | 20 | one short of 21 |
| Mjölnir + any 2nd Equipment + Bulk Up | 12+ | 24+ | **yes** |
| Mjölnir + Embercleave (prior line) | 6 | 24 | yes |

It buys the same kill Embercleave buys, for 2 mana instead of 6, and artifact removal cannot
pre-empt it. **The stronger line is non-combat:** Chandra's Ignition makes the equipped creature
the damage source, so Mjölnir doubles it — at 6 power that is 12 to each opponent, at 12 power it
is **24 to each opponent**, a table kill with no attack step, no blockers and no attack tax. That
line did not exist in the deck before this card.

Costs named honestly: non-artifact, so no reducer discount and no free deploy (the double-tax
rule); dead without the commander on board; and the `{4}{R}{R}` flashback is mostly decoration
under the pilot's mana rule.

### IN — Insight Engine `{2}{U}` (displaces The Reality Chip, pilot's call)

Re-derived, **not** re-litigated. It was cut in the V2 recomposition, and the 2026-08-07 entry that
first justified it priced it at *one activation per turn*. That was correct then. **Unwinding Clock
did not exist in this deck until V3.**

Insight Engine is an artifact, so Clock untaps it during each other player's untap step — four
activations per turn cycle, counters accumulating: 1 + 2 + 3 + 4 = **10 cards per cycle**, 26 the
next. Manifold Key (*"{1}, {T}: Untap another target artifact"*) adds a fifth. Thousand-Year Elixir
does not — it untaps creatures only.

The pilot's mana argument was the decisive one and it checks out: Clock untaps the rocks too —
Sol Ring {2} + Arcane Signet {1} + Talisman {1} + Thran Dynamo {3} + Gilded Lotus {3} = **10 mana
refreshed at every opponent's untap step**, even after tapping out on your own turn. The mana rule
says spare mana goes to recasting the commander; this is mana that was never available to him.

It is also MV 3, so it triggers Simulacrum Synthesizer on entry, draws off Fateful Discovery, takes
hexproof from Padeem, and comes down free off the combat trigger — none of which the displaced
Reality Chip did. **Risk named: deck-out.** Ten-plus cards a cycle off a 99-card library alongside
The One Ring is real; activation is voluntary, so count.

### OUT — Blasphemous Act

**The assistant's first argument was wrong and the pilot corrected it.** I argued it should go
because 13 damage kills the 5/5 commander and the 11 artifact creatures V3 added on purpose. The
pilot: *"you don't really blasphemous act if iron man is out, you do it a turn before to slow down
the board state if someone is getting too far ahead… green players ramping out like 10/10 dinos."*
Correct — a catch-up sweeper is cast at a board state where the commander is not deployed, so the
self-hit on him is not a real cost. The argument evaporates.

**The grounds that survive:** with Bulk Up in, Chandra's Ignition does the sweeping *and* wins the
game (24 to each other creature at 12 power), so the second sweeper is spending a slot on an effect
already covered while the first one now closes games. Board Wipes 2 → 1 in name, but the section is
renamed **Board Wipes & Finishers** because Ignition is now both.

Also noted against the pilot's own stated reason (*"drawing into just 1 card is very finicky"*):
that is the **weakest** part of the case now, because Insight Engine + Clock makes V3 find its
one-ofs far more reliably than V2 did. Recorded so the re-add trigger is judged on the right axis.

> **Re-add trigger:** if a pod ramps out a threat the deck cannot answer before the commander
> lands, Blasphemous Act comes straight back — it is the only mass answer that works from behind
> with an empty board. It keeps its printing (SLD 1998) in the sideboard block.

### WITHDRAWN — Vision of Love / Demand Answers

I proposed reviving this effect on the grounds that SIDEBOARD.md's recorded reason (*"lost to
Insight Engine"*) had expired under §1.1b, since Insight Engine was not in V3. **The pilot pushed
back — *"this was moved out for a reason, why bring it back?"* — and was right.** It was never in
the 100; it was proposed on 2026-08-07 and reverted on the pilot's call. More importantly the
reason it lost was a **principle** — a one-shot loses to a repeatable engine at the turn count this
deck reaches — not a fact about Insight Engine specifically. A verdict resting on a principle does
not expire when the particular rival leaves the list. Withdrawn; Demand Answers dropped with it.

### PASSED — with the grounds

- **Seize the Spoils** `{2}{R}` — a **sorcery**. Demand Answers/Vision of Love does the same job one
  mana cheaper at instant speed, and both lose to the repeatable-engine principle above anyway.
  Same shape as the scarlet-witch Pirate's Pillage call: an identical effect printed as a sorcery is
  the worst copy of it. Note corrected for the pilot: **Big Score is not in this deck** — it left
  the 100 on 2026-08-19 for Conqueror's Flail and is a sideboard row.
- **Think Twice** `{1}{U}` — one card now, one for `{2}{U}` later, both halves non-artifact so both
  pay the double tax. The purest example of what the V3 research measured and rejected: *"one more
  draw card doesn't fix it, because you never draw the one card."*
- **Unwind** `{2}{U}` — the land refund is mostly phantom. Countering on the turn before yours gains
  nothing (your lands untap at your untap step regardless); it only pays when you counter during
  **your own** turn, which requires holding `{2}{U}` the mana rule says goes to the commander. And
  Deflecting Swat + Fierce Guardianship already cover "free answer to removal on my turn" at `{0}`.
  It also cannot counter creatures — the exact board state the deck loses to.
- **Frantic Search** `{2}{U}` — the best of the passes. Genuinely free under the mana rule (untap 3
  lands), and *"discard two"* is upside with Goblin Welder / Goblin Engineer / Academy Ruins. Lost
  on raw card count: it is net **minus one** card, and V3's diagnosed problem is engine draw, not
  smoothing. Re-check if the Welder/Engineer graveyard package ever becomes a primary plan.
- **Unstoppable Plan** `{2}{U}` — not draw; a fourth untapper in a package already six slots deep.
  Untaps once per turn cycle against Unwinding Clock's three in a four-pod. Its one real edge is
  scope (*"all nonland permanents"* catches Goblin Welder and Padeem, where Clock reads *"artifacts
  you control"*), and its one real argument is that untapping rocks at **your own end step** patches
  the mana rule directly. Not enough for a fourth untapper. Re-check if the untap package ever
  shrinks.

### Re-priced by Unwinding Clock — cards taken OFF the cut list

Checking Insight Engine surfaced that Clock silently upgraded much of the list, which moved three
cards off the standing cut ranking:

- **Master Transmuter** — untaps 4×/cycle, so four free artifact deploys per turn cycle, funded by
  Clock-refreshed rocks, **on opponents' turns**.
- **Ultron** — the standing #1 cut ("mana sink you can't feed") is weaker than it was: Transmuter on
  an opponent's turn makes an artifact enter, and the `{2}` comes off a rock Clock just untapped.
  The Swordsman's Steel trigger stands, but the grounds are softer.
- **Steel Overseer / Iron Spider** — four activations per cycle is **+4/+4 on every artifact
  creature per turn cycle**, which also feeds the Bulk Up math directly.
- **Goblin Engineer** examined and kept: its ETB tutors a fatty into the yard for Goblin Welder to
  reanimate with **no MV cap**. A real two-card package, not filler.

**Validated:** 100/100, headers match contents, 3/3 Game Changers (Bulk Up and Insight Engine both
verified NOT Game Changers), no legality or colour-identity flags, sticker **$1,310.37**.
`research/v3-moxfield-2026-08-21.txt` regenerated — 100 maindeck / 17 sideboard, printings
preserved. **Two new proxies to print: Bulk Up, Insight Engine.**

---

## 2026-09-02 — CORRECTION: Chandra's Ignition damage is NOT commander damage

Same day as the pass above. The pilot asked whether Chandra's Ignition damage counts toward the 21.
**It does not, and the entry above overstates the Ignition line — it calls it a "table kill", which
is wrong.**

**Verified** (`mtg-rules-expert`, CR sections 903 / 120 / 510 / 614 / 701 + glossary):

- **CR 903.10a** — *"A player who's been dealt **21 or more combat damage** by the same commander
  over the course of the game loses the game."* Also 104.3j; SBA at 704.6c.
- **Glossary, "Combat Damage"** — *"Damage dealt **during the combat damage step** by **attacking
  creatures and blocking creatures**."* Chandra's Ignition is CR 120.2b spell/ability damage.
- **CR 701.14d** — *"The damage dealt when a creature **fights** isn't combat damage"* — the same
  shape as Ignition, and the cleanest confirmation.
- Not the timing, not the source, not the "equal to its power" wording. None of those convert
  120.2b damage into combat damage.

**Confirmed favourably:** Mjölnir *does* double the Ignition damage (120.2b → 120.7 makes the
commander the source; 614.1/614.4 replacement applied at 120.4b), and it doubles **per recipient,
not a summed total** (CR 614.5's worked example). Two piloting caveats: Bulk Up must resolve
**before** Ignition (Ignition locks power on resolution), and Mjölnir must still be attached when
damage is dealt (CR 614.4).

### Corrected line values

| Line | Actual effect |
|---|---|
| Bulk Up in **combat**, 12 power, Mjölnir | 24 **combat** damage = commander kill at 21 ✅ **unchanged** |
| Bulk Up + Ignition, 12 power | 24 to each opponent's **life total** (of 40) + 24 to each other creature. A one-sided sweep that puts the table at 16. **Not a kill.** |

**What this changes.** Bulk Up's slot is unaffected — its primary job was always the combat line,
and that is the deck's stated problem (can't finish games). **What it does weaken is the ground
given for cutting Blasphemous Act**, which was partly *"the surviving sweeper now wins the game"*.
It doesn't. The pilot's original instinct was the better one: Blasphemous Act is the pre-commander
catch-up button, and Chandra's Ignition cannot do that job — without the commander equipped, its
best targets are Krang (9/9, {9}) or Wurmcoil (6/6), which does not answer a ramped-out 10/10.

**Recommendation recorded, pilot's call pending:** reverse the Blasphemous Act cut and displace
**Ultron, Artificial Malevolence** for Bulk Up instead — Ultron needs a three-card setup
(Ultron + Master Transmuter + Unwinding Clock) to beat its mana problem, and the legend rule blanks
copies of most of the deck's payload. No change made to `DECK-V3.md` pending that call.

### Pilot's call, same day — Blasphemous Act stays OUT

*"let's try blasphemous act out for a bit and we'll see."* The recommendation above (reverse the cut,
displace Ultron instead) is **declined for now**; V3 goes to the table as built. No change to
`DECK-V3.md` — the list already stands at 100/100 with Bulk Up in and Blasphemous Act in the
sideboard block with its printing (SLD 1998).

The assistant's argument was made once, in full, and the recorded grounds against the cut stand
unrefuted — Chandra's Ignition cannot sweep from an empty board, which is the exact matchup the
pilot named. This is a deliberate test of whether that matters in practice, not an oversight.

> **Re-add trigger (sharpened):** Blasphemous Act comes straight back the first time a game is lost
> to a board the deck could not answer **before the commander was deployed** — specifically a green
> ramp threat, or any board that got wide/large while Tony Stark was still the {1}{U} front face.
> Displaces Ultron, Artificial Malevolence. If instead the loss pattern is "the commander was out
> and I still couldn't sweep", that is *not* this trigger — Ignition covers that case.

---

## 2026-09-02 — Surestrike Trident in, Ultron out (pilot's call). Dwalin illegal, Infantry Shield passed

Snapshot: `versions/2026-09-02-v3-before-surestrike-trident.md`.

### IN — Surestrike Trident `{2}` — the 2026-08-19 verdict is superseded

*"Equipped creature has first strike and '{T}, Unattach Surestrike Trident: This creature deals
damage equal to its power to target player or planeswalker.' Equip {4}."*

It was swept on 2026-08-19 in the power-damage family with the grounds *"tap-to-fire fights the
attack step."* **Those grounds were correct then and are false now**, because Unwinding Clock did
not exist in this deck until V3. This is the same re-derivation that brought Insight Engine back
(LEDGER, "A mass untapper re-prices every {T} ability").

The enabling fact: **The Invincible Iron Man is a Legendary *Artifact* Creature**, so Clock untaps
him during each other player's untap step. The loop:

| Step | Action |
|---|---|
| Your turn | Attack (commander taps) |
| Opponent A untap | Clock untaps the commander **and** Brass Squire |
| A's turn | `{T}` + unattach → damage equal to power, **doubled by Mjölnir** |
| Still A's turn | Brass Squire `{T}` → re-attach the Trident |
| Opponents B, C | Repeat |

Three shots per turn cycle on top of a full attack; four with Captain America's Shield's vigilance
(attack without tapping, fire post-combat). At 12 power that is **24 per shot**, at instant speed,
**unblockable**. Mjölnir's doubling verified via the same chain as the Ignition ruling earlier today
(CR 120.2b → 120.7 → 614.1 applied at 120.4b). Haste on the back face clears CR 302.6 for the `{T}`.

**The structural argument, which is the real one:** the deck's diagnosed loss pattern is opponents
removing, countering, chumping and walling the commander. Trident damage cannot be blocked or
fogged and happens on their turns — it routes around the failure mode rather than fighting it.

**Costs named:** it is **not commander damage** (CR 903.10a — combat damage only), so this is a
second win axis on life totals, not acceleration toward the 21. Equip `{4}` is steep and unattach
is part of the cost *every* activation, so it is a **two-card engine**: it needs Brass Squire,
Blacksmith's Talent level 2, or Hammer of Nazahn on re-entry, or it is one shot per cycle. Note
the commander's own combat trigger does **not** re-attach it — that trigger reads *"from your
hand"* and the Trident is already on the battlefield. MV 2, so no Simulacrum Synthesizer trigger.

### OUT — Ultron, Artificial Malevolence — and the assistant's stated grounds were wrong

I argued for the cut partly on *"the legend rule blanks most copy targets."* **The pilot named the
use case that defeats it:** *"ultron's biggest strength is getting him down turn 3 and copying our
ramp artifacts."* Every rock in the deck — Sol Ring, Arcane Signet, Talisman of Creativity, Thran
Dynamo, Gilded Lotus — is **non-legendary**, so the legend rule never touched the line he is
actually played for. A copied Gilded Lotus is three mana *and* a 2/2 Robot Villain body.

The cut proceeds on the pilot's call and on the surviving ground only: at `{3}` plus `{2}` per
copy, he competes for the same early mana as the commander under the mana rule, and Trident
converts the board the deck is already trying to build. Creatures 11 → 10, Equipment 17 → 18,
which leans into the restated voltron brief.

> **Re-add trigger (sharpened, replaces the Swordsman's Steel trigger):** Ultron comes back if a
> game is lost where the deck had a **turn-2 or turn-3 mana rock and no turn-3 play** — that is the
> curve where copying a rock compounds. It is *not* triggered by Ultron sitting idle late, which is
> the case the mana rule already predicts. Printing (MSH) 252 held in the sideboard block.

### PASSED — Dwalin, Weaponmaster `{1}{R/W}` — **ILLEGAL**

Colour identity **RW**: a hybrid symbol counts as both of its colours, and white is not in Tony
Stark's UR identity. Recorded because the card is otherwise near-purpose-built for this deck —
*"Whenever Dwalin enters or attacks, put a hone counter on each Equipment you control"*, +1/+0 per
counter, accumulating, across 18 Equipment. Same family as the Cranial Plating and The Arkenstone
identity rejections: **check colour identity on hybrid and Adventure costs before evaluating.**

### PASSED — Infantry Shield `{2}{R}`

**CR 702.181a:** mobilize tokens are *"sacrificed at the beginning of the next end step"* — they die
on your own end step and **never block**, which is the opposite of the pilot's stated reason for the
creature package. They are also **red Warriors, not artifacts**, so they miss Fateful Discovery,
Krang's grants, Steel Overseer counters, Thopter Spy Network's draw (which requires *artifact*
creatures connecting), Insight Engine and every artifact-count payoff — and Chandra's Ignition
kills all of them. Menace is near-redundant on a flier. Re-check only if the deck ever pivots to
go-wide.

**Validated:** 100/100, headers match contents, 3/3 Game Changers (Surestrike Trident verified NOT a
GC), no legality or colour-identity flags, sticker **$1,300.46**. Moxfield list regenerated —
100 maindeck / 18 sideboard, printings preserved. **Three new proxies: Bulk Up, Insight Engine,
Surestrike Trident.**

---

## 2026-09-03 — Four Equipment checked against V3; nothing added. Double-strike lethal audit

Pilot asked whether Infantry Shield + Chainsaw, Assassin Gauntlet and Blackblade Reforged belong,
and whether the list carries enough +N/+N to make double strike lethal on its own. No change to
`DECK-V3.md`; the Blackblade proposal below is pending the pilot's call.

### Audit — the deck already reaches 21 in one combat without Mjölnir

Base 5/5. Double strike needs **11 power** (11 + 11 = 22, cumulative across both damage steps,
CR 702.4b / 903.10a). Double strike sources in V3: Embercleave, Genji Glove, Blacksmith's Talent L3.

| One-card route to 11+ power | Power | Notes |
|---|---|---|
| Argentum Armor | +6 → 11 | equip {6} to re-suit; MV6 feeds Simulacrum Synthesizer |
| Aettir and Priwen | base = life total | ~30+ |
| Adaptive Omnitool | +1 per artifact | commander counts; 6+ by mid-game |
| Bulk Up (instant) | ×2 | 6 power + Embercleave = 12 |
| Plate + Helm/SoFF + Embercleave | 3+2+1 = +6 → 11 | three-card pile |
| Mjölnir + Embercleave | 6 × 2 × 2 = 24 | the recorded two-card kill |

Against a blocker: trample assigns lethal to the blocker first (CR 702.19b), so a 4-toughness
chump takes 4 off the first-strike step (8 + 12 = 20, **not lethal**). Basilisk Collar's deathtouch
makes 1 damage lethal (CR 702.2c) — 11 + 12 = 23. Collar is part of the lethal math, not a utility
card.

### PROPOSED, pilot's call — Blackblade Reforged `{2}`, equip legendary `{3}`

*"+1/+1 for each land you control."* 36 lands; 7 by the turn the commander is usually suited =
12/12, so any double-strike source is lethal. Colourless (no protection conflict, CR 702.16d).
Deploy trigger attaches it free (attach ≠ equip, CR 701.3a); the re-suit cost after removal is
{3} against Argentum Armor's {6} and Aettir's {5}, which is the only axis on which it beats the
three one-card pumps already in the list. It is a fourth card in a class of three, so it is a
lateral add unless it displaces something weaker. Candidate displacement: **Conqueror's Flail** —
+2/+2 in a two-colour deck, and its lock (*"opponents can't cast spells during your turn"*) is the
narrowest insurance piece: Plate, Helm, Coat and Nazahn protect on every turn, the Flail only on
yours. EDHREC: Blackblade 12% of Tony Stark lists (synergy +0.10). MV2, so no Synthesizer trigger.

### PASSED — Assassin Gauntlet `{2}{U}`

The ETB tap-down works as imagined: deployed at beginning of combat, choose zero for the attach
target (CR 115.6), tap one opponent's team, they cannot block (CR 509.1a). But it is one opponent,
once; Captain America's Shield taps a blocker every attack and the commander already flies. +1/+1
is the additive tier V3 trimmed; the loot is selection, not draw. Re-check only if games are being
lost to one opponent's wall of fliers.

### PASSED — Chainsaw `{1}{R}`

*"Whenever one or more creatures die"* is one rev counter per **event** (CR 603.2c), and this deck
makes almost no death events of its own — Ignition, Mjölnir's ETB and Chainsaw's own ETB are one
each. Expect +2 to +4 by the time it matters, which is the additive tier. The ETB 3 damage is the
real content and Mjölnir already does 4. Equip {3}.

### PASSED (again) — Infantry Shield `{2}{R}`, and the "combo" with Chainsaw

The 2026-09-02 grounds stand (tokens never block, are Warriors not artifacts). New fact: the
mobilize tokens are sacrificed as **one** event, so the combo adds **one** rev counter per attack,
not X. The X tokens are life-total damage split across opponents (CR 508.4), not commander damage.

### Pilot's call, same day — Blackblade Reforged to the SIDEBOARD, not the 100

*"add blackblade reforged to the sideboard for now."* Added as a Situational row in `SIDEBOARD.md`
(displaces Conqueror's Flail when brought in, grounds above) and to the `// Sideboard` block of
`research/v3-moxfield-2026-08-21.txt` as `(DMC) 178`, the default printing. Assassin Gauntlet,
Chainsaw and Infantry Shield were added to the "Evaluated and passed" list with their grounds.
`DECK-V3.md` unchanged — still 100/100.

---

## 2026-09-08 — Silent Arbiter in, Iron Man Master of Machines out (pilot's call). Brotherhood Regalia parked

Snapshot: `versions/2026-09-08-v3-before-silent-arbiter.md`.

### IN — Silent Arbiter `{4}` 1/5 Artifact Creature

*"No more than one creature can attack each combat. No more than one creature can block each
combat."* Scored against the deck's two original V2-request complaints, which it addresses
together:

- **Defence** — the pilot's brief is that only the commander wins, so the deck was always
  attacking with one creature; the attack cap is near-free on our side and caps a go-wide
  opponent to a single attacker. Stacked with Propaganda (*"{2} for each creature… attacking
  you"*) an opponent pays {2} to send one creature into Arbiter (1/5), Wurmcoil, or a blocker
  the deck already has. The "no blockers, bleeding 10+ a turn" complaint is answered
  structurally rather than with more bodies.
- **Offence** — their one blocker must have flying or reach, Captain America's Shield's
  on-attack tap frequently removes the only eligible one, and trample / Basilisk Collar's
  deathtouch handle the remainder. This covers most of Brotherhood Regalia's job, which is why
  Regalia is parked rather than added (below).

Artifact creature, so: free deploy off the combat trigger, Fateful Discovery draw, MV 4 →
Simulacrum Synthesizer Construct, Padeem hexproof, Krang indestructible, Goblin Welder / Academy
Ruins recursion. Thopter Spy Network's draw still fires with the commander as the sole attacker —
he is an artifact creature. Verified NOT a Game Changer.

**Costs named:** it blanks Master of Machines' attack-draw (he can never attack alongside the
commander — hence the cut), caps Krang to blocker/anthem duty, and is a famous stax magnet in
pods that the pilot's own notes say kill stax on sight. Frame recorded: removal aimed at a {4}
free-deployed, Welder-recurrable artifact is removal *not* aimed at the suit. Symmetric across the
whole table — games get longer, which favours the Insight Engine deck, not the dino deck.

### OUT — Iron Man, Master of Machines

The cut is *because of* the add: *"Whenever Iron Man attacks, if an artifact entered… draw a
card"* is dead under Arbiter whenever the commander attacks, which is every combat. His remaining
role (a +1/+0-per-artifact flying vigilance blocker) is covered by Arbiter's own 5 toughness and
Wurmcoil. Card Draw / Engines 8 → 7; Artifact Payoffs / Creatures 10 → 11. Printing (MSH) 216
held in the sideboard block.

> **Re-add trigger:** Master of Machines returns if Arbiter is cut *or* if the draw count
> regresses with Insight Engine on board — in which case he displaces whichever creature is
> weakest at that time, not Arbiter.

### PARKED — Brotherhood Regalia `{2}` (pilot: *"let's keep brotherhood in mind"*)

*"Equipped creature has ward {2}, is an Assassin, and can't be blocked. Equip legendary creature
{1}."* Evaluated as the deck's best available evasion — absolute where flying loses to reach, and
a one-time {1} (or free) where the deck's existing unblockable sources (Manifold Key's `{3}, {T}`
mode; Rogue's Passage in the sideboard at `{4}`) cost mana every combat, which the mana rule
forbids. Ward {2} is a fourth protection layer, moot under Champion's Helm. Makes Basilisk Collar's
deathtouch+trample trick and Captain America's Shield's tap redundant.

**Held, not added**, because Silent Arbiter now covers most of the "get through one blocker"
case. The remaining gap Regalia fills: boards with two or more flying/reach creatures where the
Shield taps one and the other still blocks. Named cut if it comes in: **Basilisk Collar**
(Regalia blanks its combat half; Shadowspear already carries the lifelink). Sword of Feast and
Famine is explicitly *withdrawn* as a candidate — its untap-all-lands is worth more post-Insight
Engine (connect, untap seven lands, activate twice more), not less.

**Validated:** 100/100, headers match contents, 3/3 Game Changers, no legality or colour-identity
flags, sticker **$1,329.52**. Moxfield list regenerated — 100 maindeck / 20 sideboard (the 20th, Blackblade Reforged, is a
pilot-added row the assistant did not place), printings preserved. **Four new proxies: Bulk Up, Insight Engine, Surestrike Trident, Silent Arbiter.**

---

## 2026-09-09 — Mind's Eye in, Goblin Engineer out (pilot's call). Dawnsire, Panther Habit, Relic of Legends passed

Snapshot: `versions/2026-09-09-v3-before-minds-eye.md`.

### IN — Mind's Eye `{5}` (displaces Goblin Engineer; pilot chose Engineer over the nominated Ten Rings)

*"Whenever an opponent draws a card, you may pay {1}. If you do, draw a card."* The standard
rejection — it asks you to hold {1}s on opponents' turns — is the pilot's mana rule verbatim, and
it no longer applies: **Unwinding Clock untaps the rocks at each opponent's untap step, and their
draw step is the next thing that happens.** Ten mana of rocks, refreshed, when the trigger fires.
Same re-derivation that brought Insight Engine back (LEDGER, "A mass untapper re-prices every {T}
ability and every mana rock").

Floor: three draw steps per cycle = **three cards for {3} of otherwise-idle rock mana**. Ceiling:
every opponent cantrip, Rhystic payment and wheel. Turns Armor Wars chapter I (*"each opponent
draws a card"*) from a table-feeding clause into *"pay {3}, draw three more."* Artifact, so free
deploy, castable for {2} through the reducers, Fateful Discovery draw on entry, MV 5 → Simulacrum
Synthesizer Construct, Padeem / Darksteel Forge / Goblin Welder cover it. Verified NOT a Game
Changer.

**Named cost: the most Clock-dependent card in the list.** Insight Engine and Surestrike Trident
degrade to once-per-turn without Clock; Mind's Eye degrades to "hold {1}s," which the mana rule
forbids. Three payoffs now stack on one {4} artifact. Fabricate finds it; Padeem and Darksteel
Forge protect it; Welder recurs it. Deck-out and hand-size named again — all three engines are
optional per trigger, so it's a counting discipline, not a structural risk.

### OUT — Goblin Engineer (pilot: *"maybe i can try goblin engineer swap"*)

Nominated cut was The Ten Rings (third time; grounds: every added draw engine makes its refill-to-
ten draw fewer cards, and it is an {8} that eats the combat trigger). **Pilot kept Ten Rings**,
protecting the max-hand-size clause now that two engines overdraw, and cut Engineer instead.

Engineer's role re-derived against the post-swap list, and the cut is more defensible than the
assistant first framed it: its ETB (*"search your library for an artifact card, put it into your
graveyard"*) existed to fill the yard for Goblin Welder. **The yard now fills itself** — Insight
Engine and Mind's Eye overdraw past hand size every cycle, and the cleanup discards are exactly the
fat artifacts Welder wants. Its `{R}, {T}, sacrifice` return is capped at MV 3, which Welder does
without the cap. Tutors / Recursion 3 → 2; Card Draw / Engines 7 → 8.

**Residual risk named plainly:** Engineer was one of two ways to *find* Unwinding Clock (bin it,
Weld it back). Fabricate is now the only tutor that reaches Clock, in a list that just added a
third Clock-dependent payoff. Recorded so the next Clock-related loss is judged on this axis.

> **Re-add trigger:** Goblin Engineer returns if Welder is found sitting on an empty graveyard —
> i.e. if the overdraw discards are not actually reaching the yard in practice — or if Clock is
> repeatedly the missing piece. Displaces the weakest draw engine at that time. Printing (MH1) 128
> held in the sideboard block.

### PASSED — with the grounds

- **Dawnsire, Sunstar Dreadnought** `{5}` — evaluated as repeatable, commander-independent creature
  removal (10+: *"whenever you attack, 100 damage to up to one target creature"*), a noncreature
  artifact at 10–19 counters so creature removal and Ignition skip it, and a 20/20 flying blocker
  at 20+. One station off a suited commander clears 10; vigilance or Manifold Key / Elixir solves
  the sorcery-speed tap. Nominated cut was Ten Rings. **Pilot: "not too sold."** Grounds recorded
  because the role it fills (removal not living on the commander) is still empty — re-check if
  the deck keeps losing to a single resolved threat while the commander is in the command zone.
- **Panther Habit** `{4}` — damage-axis protection only, already covered twice (Mithril Coat,
  Krang), and the commander rarely takes damage (flies, hexproof, Shield taps his blocker). The
  growth clause is real but needs opponents to damage him; Iron Spider's counter-draw is the one
  interesting line. Flips if the pilot's pods lean on fight/bite removal or damage wipes. The
  protection row with nothing in it is **edict/sacrifice** — that is the gap worth a card.
- **Relic of Legends** `{3}` — the legendary-tap half is contested: the commander's untapped state
  is worth an attack on your turn and a 24-damage Trident shot on theirs, never {1}. Live only on
  the front face (Tony Stark as a mana dork toward the {4}{U}{R} flip — a second turn-4 route
  alongside Sol Ring, not a faster one). The rock half is Manalith. If a 6th rock is wanted, the
  head-to-head is **Thought Vessel** ({2}, colourless, no-max-hand-size does Ten Rings' job) vs
  Relic (coloured, MV 3 → Synthesizer). Pilot's actual want turned out to be *untapping* the
  commander post-combat, which Relic does not do.
- **Post-combat untap options** (pilot's real question) — the deck already has three on its own
  turn (Captain America's Shield vigilance, Thousand-Year Elixir, Manifold Key) plus Clock on
  theirs. The one addition that earns a slot on breadth is **Voltaic Construct** (`{2}`: untap
  target artifact creature, no tap cost — repeatable; untaps the commander *and* Brass Squire for
  extra Trident shots off Clock mana, plus Transmuter / Overseer / Iron Spider). Cheaper narrow
  answers: Haunted Cloak (equip {1}, vigilance) or Accorder's Shield (MV 0, an Urza's Saga target).
  Clock of Omens passed — it taps two artifacts Clock just untapped for a reason. Pilot did not
  act; Voltaic Construct recorded as the named candidate if a fourth untapper is wanted.

**Validated:** 100/100, headers match contents, 3/3 Game Changers, no legality or colour-identity
flags, sticker **$1,349.16**. Moxfield list regenerated — 100 maindeck / 21 sideboard, printings
preserved. **Five new proxies: Bulk Up, Insight Engine, Surestrike Trident, Silent Arbiter, Mind's
Eye.**

---

## 2026-09-09 — Ultima Weapon back in, Iron Man Titan of Innovation out (pilot's call). Basilisk Collar cut withdrawn

Snapshot: `versions/2026-09-09-v3-before-ultima-weapon.md`. Prompted by the pilot asking to bring
Ultima Weapon and Meteor Sword back from the sideboard.

### IN — Ultima Weapon `{7}` (re-derived; the 2026-08-21 grounds are superseded)

Cut in the V3 build as *"dominated by Argentum Armor"* (permanent vs creature, equip {6} vs {7}).
Two things changed. **Silent Arbiter**: their one eligible blocker dies on attack, so the
commander is effectively unblockable. **The finisher math**: +7/+7 on the 5/5 = 12 power, Mjölnir
doubles to **24 = a one-connection commander kill** with two Equipment and no Bulk Up. It is the
Dawnsire role (repeatable on-attack creature removal) in an Equipment the pilot already owns and
the combat trigger auto-attaches — no station, no tap. Equip {7} is irrelevant with four free
attachers (combat trigger, Hammer of Nazahn, Brass Squire, Blacksmith's Talent). Under the
2026-09-09 LEDGER correction ("in singleton, the second copy is access"), a second on-attack
destroy is a spare key for Argentum, not a blank. Verified NOT a Game Changer.

### OUT — Iron Man, Titan of Innovation

*"Whenever Iron Man **attacks**, create a Treasure token, then you may sacrifice a noncreature
artifact… search… put it onto the battlefield tapped."* **Blanked by Silent Arbiter on the same
grounds that cut Master of Machines on 2026-09-08** — under the brief the commander attacks every
combat, so Titan never does, and the trigger never fires. The assistant should have flagged this
the day Arbiter went in; recorded as a miss. What remains is a 4/4 flying haste blocker, covered by
Arbiter's 5 toughness and Wurmcoil.

**Honest cost, pilot's words:** *"it is our backup commander but meh."* Titan's trigger does fire
when the commander is in the command zone; he was part of the commander-independent floor V2 asked
for. Same trade the pilot already made with Master of Machines.

> **Re-add trigger:** Titan returns with Master of Machines if Silent Arbiter leaves the list.
> Printing (SLD) 1731 held in the sideboard block.

### WITHDRAWN — Basilisk Collar as the Meteor Sword cut

Nominated on the grounds that deathtouch is near-blank on an evasive attacker and lifelink is
Shadowspear's spare key. **Pilot: *"we need basilisk collar for the deathtouch defending."*** Correct
— the assistant scored deathtouch only as an attacker's keyword. Under Silent Arbiter exactly one
creature attacks each combat, and a deathtouch blocker (the commander with the Shield's vigilance,
or the Collar moved to Arbiter / a Construct via Brass Squire) kills it regardless of size. That is
the "one blocker is enough" plan Arbiter was added for, and the Collar is what makes the one
blocker sufficient against a 10/10. Withdrawn; Collar stays.

### Meteor Sword — slot pending

Re-derived case (recorded so it is not re-argued): cut on 2026-08-21 as *"one-shot ETB, only good
with Panharmonicon."* Never priced with **Master Transmuter** — bounce as the cost, put it straight
back, *"destroy target permanent"* again for {U}, and Unwinding Clock untaps Transmuter on every
opponent's turn. Same loop the deck runs with Portal to Phyrexia and Mjölnir. Goblin Welder re-
triggers it too. Each re-entry is a Fateful Discovery draw and an MV-7 Simulacrum Synthesizer
Construct. Cut candidates offered for its slot: Turbulent Springs (36 → 35 lands), Thousand-Year
Elixir, or hold.

### Pilot's call, same day — Meteor Sword HELD

*"okay we can try holding it."* No further change. V3 goes to the table at 19 Equipment with
Ultima Weapon as the added removal-on-attack; Meteor Sword stays in the sideboard with its
(TLA) 258 printing.

> **Re-add trigger:** Meteor Sword comes in the first time a **noncreature** permanent (an
> enchantment, a rock, a stax piece) is what beats the deck and Argentum Armor was not on the
> commander to answer it — that is the case Ultima's creature-only clause cannot cover and Meteor
> Sword's *"destroy target permanent"* can, at instant speed off Master Transmuter on their turn.
> Displaces Turbulent Springs (36 → 35 lands) unless the manabase has shown strain by then.

---

## 2026-09-09 — Urza and Iron Lad in; Armor Wars and Retrofitter Foundry out (pilot's cuts)

Snapshot: `versions/2026-09-09-v3-before-urza-iron-lad.md`. Both adds verified NOT Game Changers,
so bracket 3 holds at 3/3.

### IN — Urza, Lord High Artificer `{2}{U}{U}` (displaces Retrofitter Foundry)

Bought for the **middle line**, not the Construct: *"Tap an untapped artifact you control: Add {U}."*
Not "tap Urza" — tap **any** artifact. With 19 Equipment sitting inert after they attach, plus rocks
and tokens, that is a large blue engine; **Unwinding Clock refreshes all of it at each opponent's
untap step.** It answers the pilot's mana rule rather than working around it — spare mana stops
being the thing they never have. Feeds Insight Engine ({2}), Mind's Eye ({1}), Mana Drain /
Counterspell ({U}{U}), and recasting the commander.

**CR 302.6 note for the pilot:** summoning-sick artifacts tap fine for this. The rule restricts a
permanent's *own* `{T}` abilities; Urza's cost is "tap an artifact," not the artifact's `{T}` symbol.
Fresh Thopters, Servos and Constructs are mana the turn they arrive.

The `{5}` impulse is a real sink for that mana. The Construct is the same token Simulacrum
Synthesizer makes — a spare key under the 2026-09-09 singleton-access rule, not a blank.

**Cost named: the double tax.** Urza is **not an artifact** — no reducer discount, no free deploy
off the combat trigger, no Padeem hexproof, no Krang grants. A hard-cast `{2}{U}{U}` 1/4 that draws
removal. Also flagged to the pilot: he is a value engine that does **nothing** for the 21-damage
clock, and is the third engine piece in four swaps, which pulls against the voltron brief.

### IN — Iron Lad, Diverging Destiny `{2}{U}` (displaces Armor Wars)

Re-derived; the 2026-08-20 verdict (*"weakest draw engine"*) was correct at the time and is only
partly superseded. **Measured: 53 of 99 library cards are artifacts** — a 54% reveal hit, and
because *"you may look at the top card any time"* the pilot only taps on a known hit, so no
activation is ever wasted. With Clock's four untaps that is ~2 cards per cycle; without Clock it is
~0.5 per turn, which is the old verdict and is still true. It degrades gracefully, so it passes the
"count the payoffs on one enabler" test (LEDGER 2026-09-09) where Mind's Eye did not.

**Corrections recorded so they are not re-learned:** Roaming Throne does **not** double it — Throne
reads *"if a **triggered** ability… triggers"* and Iron Lad's is **activated** (same trap as Iron
Spider and Steel Overseer). Vigilance is dead text under Silent Arbiter, since only one creature
attacks and it is always the commander, and the 2/2 flying body is behind Arbiter (1/5), Wurmcoil
(6/6) and Krang (9/9) in the single-blocker queue. The free half — look at the top any time — makes
Fateful Discovery and The One Ring sequencing informed, and is the enabler if Mystic Forge is ever
added.

**Assistant's recommendation was to hold it; the pilot added it anyway.** Recorded as a merit call,
not an oversight.

### OUT — Armor Wars (pilot: *"okay if we cut armor wars"*)

Protected twice before. Iron Lad is the permanent version of the same "artifacts into cards" job,
where the Saga sacrifices itself after three chapters. Chapter I's *"each opponent draws a card"*
had already been turned from a downside into an upside by Mind's Eye, so the cut is on durability,
not on that clause.

### OUT — Retrofitter Foundry (pilot: *"what if we try getting rid of retrofitter for a bit?"*)

The grounds are **new this session and the pilot found them**: Retrofitter's `{2}`-per-Servo was
cheap when the deck had nothing else to spend Clock-refreshed mana on. It now competes directly
with **Insight Engine `{2}`** and **Mind's Eye `{1}`**, both of which draw cards for the same mana.
It was also never tested, and Thopter Spy Network makes a flying artifact token **free** every
upkeep — the same job, unpaid. This is the second time that free-vs-paid comparison decided between
these two cards.

**Counter-argument owed and recorded:** with Urza out, each Servo taps for `{U}`, and Clock untaps
it four times a cycle — so a one-time `{2}` buys a permanent producing four mana per turn cycle,
which is strongly mana-positive after the first cycle. That is a three-card engine (Retrofitter +
Urza + Clock) in a list already four deep on Clock, which is why it did not block the cut. Also
lost: the only repeatable **rebuild** after a board wipe, and the 4/4 Construct line. Note tokens
have MV 0, so they never triggered Simulacrum Synthesizer.

> **Re-add trigger:** Retrofitter Foundry returns if the deck is repeatedly rebuilding from an
> empty board after wipes, **or** if Urza sticks and the Servo-into-mana line is wanted. Displaces
> Cloud Key (the reducer without a body — see below). Printing: proxy, none held.

### Cut candidates offered and NOT taken (grounds recorded for re-checking)

- **Cloud Key** `{3}` — the assistant's pick, declined. Finding that stands regardless: **none of
  the three reducers reduce the commander.** Tony Stark's front face is `{1}{U}` Legendary
  *Creature*, not an artifact, and the `{4}{U}{R}` transform is an activated ability, not a spell.
  All three read *"artifact spells"*, so they only help hard-cast artifacts — the thing this deck
  avoids — and matter only in two windows: turns 1–4 pre-flip, and post-wipe. Etherium Sculptor
  ({1}{U} 1/2) and Enthusiastic Mechanaut ({U}{R} 2/2 flier) are artifact *creatures* that block,
  take Steel Overseer counters and tap for Urza; **Cloud Key is {3} for the reduction alone.** It is
  the standing next cut.
- **Thousand-Year Elixir** `{3}` — Manifold Key does the same `{1}` untap, costs `{1}` to cast, and
  reaches every creature this deck wants untapped (they are all artifacts). Elixir's unique half is
  haste for activated abilities (Brass Squire, Steel Overseer, Iron Spider, Master Transmuter tap
  the turn they land) — a genuine spare key that does not overlap Urza.
- **The Ten Rings** `{8}` — named a fourth time and dropped for good. Sharpened grounds: with
  Insight Engine, Mind's Eye, The One Ring and Iron Lad the pilot sits at ten cards, so
  *"draw the difference"* draws ~nothing; what remains is "max hand size 10", which Thought Vessel
  does for `{2}`. Pilot has protected it three times; assistant has stopped raising it.
- **A land (36 → 35, Turbulent Springs)** — declined by the pilot, who asked for a non-land option.

**Validated:** 100/100, headers match contents, 3/3 Game Changers, no legality or colour-identity
flags, sticker **$1,357.40**. Moxfield list regenerated — 100 maindeck / 23 sideboard, printings
preserved. **Seven new proxies: Bulk Up, Insight Engine, Surestrike Trident, Silent Arbiter, Mind's
Eye, Urza Lord High Artificer, Iron Lad Diverging Destiny.**

---

## 2026-09-10 — Marvin, Murderous Mimic in, Vedalken Orrery out (pilot's call)

Snapshot: `versions/2026-09-10-v3-before-marvin.md`.

### IN — Marvin, Murderous Mimic `{2}` 2/2 Legendary Artifact Creature

*"Marvin has all activated abilities of creatures you control that don't have the same name as this
creature."* Verified NOT a Game Changer. V3 now holds seven creatures whose value is a `{T}` ability,
and Marvin is a second copy of whichever one matters that turn:

| Source | What Marvin gains |
|---|---|
| Brass Squire | a second free re-attach — more Surestrike Trident shots |
| Master Transmuter | a second free deploy per untap |
| Steel Overseer, Iron Spider | a third team-wide +1/+1 counter |
| Iron Lad | a second reveal-and-draw |
| Goblin Welder | a second swap |
| Tony Stark (front face) | a second dig-four — addresses the slow pre-flip turns |

He taps once per untap, so he is a wild card rather than a multiplier. He is an artifact, so
Unwinding Clock untaps him on each opponent's turn; without Clock he still works once a turn, so he
degrades gracefully (passes the "count the payoffs on one enabler" test). The main value is
**singleton access** (LEDGER 2026-09-09): if Brass Squire or Transmuter is removed, Marvin *is* that
card. Free deploy, reducers take him to {0}, Fateful Discovery draw, Krang haste.

**Limits recorded:** gained `{T}` abilities obey CR 302.6 — no use the turn he lands unless
Thousand-Year Elixir or Krang gives haste. Urza's abilities give nothing extra (the mana ability taps
an artifact, not Urza; the `{5}` impulse has no per-turn limit); same for Iron Spider's draw clause.
He *does* gain the Trident shot from the equipped commander, but "damage equal to its power" means
Marvin's 2, without Mjölnir — worthless. Vanilla 2/2 after a wipe, since his sources die with him.
**No loop:** nothing in the list untaps a creature without tapping itself, so Marvin creates no
infinite and stays inside the pilot's loop policy.

### OUT — Vedalken Orrery (pilot: *"let's try taking out vedalken"*)

The assistant's first nomination was Cloud Key; the pilot asked for another. The constraint that
shaped the alternatives: **do not cut Marvin's sources** (every tap creature) or Thousand-Year
Elixir (its haste turns on Marvin's gained abilities immediately). So the cut came from non-creatures.

Orrery's V3 grounds were insurance — build the suit at end step so sorcery-speed removal gets no
window. Re-derived: the deck's artifacts enter via the combat trigger, Master Transmuter and Goblin
Welder, none of which is *casting*, so Orrery touches none of them. The protection role is now
covered by Padeem (hexproof on every artifact), four free/cheap counters, and Mithril Coat and
Embercleave having flash natively. Its new upside — casting with Clock-refreshed mana on opponents'
turns — competes for exactly the mana Insight Engine and Mind's Eye turn into cards (LEDGER, "A
cheap token engine stops being cheap when better mana sinks arrive"). Never tested.

**Counter recorded:** Orrery is the only way to cast Chandra's Ignition at instant speed — Bulk Up
then sweep at an opponent's end step, or in response to a trick. Real, narrow.

> **Re-add trigger:** Vedalken Orrery returns if sorcery-speed removal is repeatedly catching the
> suit mid-build despite Padeem, or if the instant-speed Ignition line is wanted. Displaces Cloud Key.

### Alternates offered and NOT taken

- **Propaganda** — Silent Arbiter already caps attackers at one, so the tax is `{2}` on a single
  creature; non-artifact, pays the double tax. Kept as the **enchantment spare key to Arbiter**:
  Arbiter dies to artifact and creature removal, Propaganda does not.
- **Cloud Key** — still the standing next cut (the reducer with no body; none of the three reducers
  touch the commander).
- **Roaming Throne** — explicitly not a cut. Its role thinned to one Hero trigger once Titan and
  Master of Machines left, but that trigger is the commander's combat deploy — the most important
  trigger in the deck, and doubling it is two free artifacts per combat.

Section counts: Cheat, Attach & Untap 6 → 5; Artifact Payoffs / Creatures 10 → 11.

**Validated:** 100/100, headers match contents, 3/3 Game Changers, no legality or colour-identity
flags, sticker **$1,343.80**. Moxfield list regenerated — 100 maindeck / 24 sideboard. **Eight new
proxies: Bulk Up, Insight Engine, Surestrike Trident, Silent Arbiter, Mind's Eye, Urza Lord High
Artificer, Iron Lad Diverging Destiny, Marvin Murderous Mimic.**
