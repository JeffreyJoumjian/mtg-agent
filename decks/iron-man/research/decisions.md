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
