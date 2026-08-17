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
