# Ledger: Equipment, Auras and Vehicles

Equip, attach and unattach effects, living weapon, Auras; Vehicles, crew and Station. Entry format and capture rules: `../SKILL.md` §4.
Search every topic at once with `bun run lookup "<card | rule number | term>"`.

---

### Protection from a colour on your own creature unattaches your Equipment and bins your Auras of that colour {#equip-001}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Sword of Fire and Ice; Mjölnir, Hammer of Thor; The Reaver Cleaver; Embercleave; Commander's Plate; Sword of Feast and Famine; Sword of Sinew and Steel; Sword of Forge and Frontier; Light of Promise; Maul of the Skyclaves; Aqueous Form; Stark's Ingenuity; Mother of Runes; Giver of Runes; Patriot, Shield Wielder; Champion's Helm; Swiftfoot Boots
**Rules:** 702.16b, 702.16c, 702.16d, 702.16i, 704.5m, 704.5n
**Claim:** Granting your commander protection from a colour rips off every Equipment of that colour
already attached, as a state-based action, and knocks off your own Auras of that colour — on top of
blocking your own targeted effects. This is the most-missed anti-synergy in voltron.
**Evidence:** CR 702.16d — *"A permanent with protection can't be equipped by Equipment that have
the stated quality... Such Equipment become unattached from that permanent as a state-based
action, but remain on the battlefield."* In full: CR 702.16b (targeting), 702.16c + 704.5m (Aura of
that colour → graveyard), 702.16d + 704.5n (Equipment of that colour → unattached; colourless
Equipment is unaffected). Static grants ("each creature", "creatures you control have flying") still
reach a protected commander.
**Changes:** Before adding a protection-granting Equipment or choosing a Mother/Giver colour, check the
**colours of the Equipment already in the deck**, not just the colours of the threats you're dodging —
list the colours of every Aura and coloured Equipment you plan to stack on that creature. Commander's
Plate is the safe template: it grants protection from each colour **not** in your commander's
identity (702.16i), so it can never conflict with on-colour Equipment. In a voltron deck built on
own-colour Auras, prefer hexproof (Patriot, Champion's Helm, Swiftfoot Boots) over protection.
- iron-man (2026-08-07): Sword of Fire and Ice (pro red + blue) unattaches Mjölnir {3}{R}, The Reaver
  Cleaver {2}{R} and Embercleave {4}{R}{R} — all three are red *cards*, even though Equipment "feels"
  colourless.
- cap-living-legend (2026-09-10), for a white-blue commander: safe Swords are Feast and Famine (B/G),
  Sinew and Steel (B/R), Forge and Frontier (R/G); Commander's Plate is protection from the three
  off-colours (702.16i). Pro-white would strip Light of Promise and Maul of the Skyclaves (both
  white); pro-blue would strip Aqueous Form and Stark's Ingenuity (both blue).
**See also:** equip-020, dmg-022, dmg-012, build-027
**Source:** iron-man (2026-08-07) — the chosen base list ran SoFI alongside all three red Equipment;
cap-living-legend (2026-09-10), v2 voltron research, merged from "Protection Equipment on your own
commander: pick it by YOUR colours, and it strips your own Auras" (which extended this entry and the
2026-09-10 Giver of Runes entry).

### Living weapon and For Mirrodin! move the Equipment onto their own token — a triggered attacher ordered last takes it back, and global clauses work from anywhere {#equip-002}

**Kind:** ruling · **Verified:** 2026-09-18 against CR 2026-08-07
**Cards:** Tony Stark; Kaldra Compleat; Nettlecyst; Hexplate Wallbreaker; Sigarda's Aid; Hammer of Nazahn; Stonehewer Giant; Captain America, First Avenger
**Rules:** 301.5d, 601.2c, 603.3, 603.3b, 603.3d, 701.3a, 702.92a, 702.163a, 704.5d, 704.5f
**Claim:** A Living weapon / For Mirrodin! Equipment's own ETB trigger creates a token and attaches the
Equipment to it, so an attach performed inside another ability's resolution always loses the
Equipment to the token. It does **not** end up stranded when your attach effect is a *triggered*
ability keying on the same "an Equipment enters" event, and wherever it ends up, its **global**
clauses still work.
**Evidence:** CR 702.92a — Living weapon is a *triggered* ability (*"When this Equipment enters,
create a 0/0 black Phyrexian Germ creature token, then **attach this Equipment to it**"*). CR
702.163a is identical for For Mirrodin! with a 2/2 red Rebel. CR 603.3b — a player puts
simultaneously-triggered abilities they control on the stack *"in any order they choose"*; last on
resolves first, so put the attacher on the stack **first** so it resolves **last**, and it moves the
Equipment off the Germ. CR 701.3a — to attach is *"to take it from where it currently is and put it
onto that object"*, which moves an already-attached Equipment. CR 603.3d → 601.2c — the attacher's
target is locked in as the trigger goes on the stack, **before the Germ exists**, so it must be a
creature already on the battlefield; controlling none means 603.3d removes the trigger from the
stack. CR 704.5f / 704.5d — the stripped Germ is 0/0, dies, and ceases to exist. Contrast CR 603.3 —
a triggered ability goes on the stack only *"the next time a player would receive priority"*, so an
attach performed **during another ability's resolution** (Stonehewer Giant: *"put it onto the
battlefield, attach it to a creature you control"* — note it no longer targets) always completes
first, and Living weapon is guaranteed to steal it afterwards.
**Changes:**
- Stop treating Living weapon as a blanket disqualifier. Sort attach effects into **triggered**
  (Sigarda's Aid, Hammer of Nazahn — beat it by ordering) and **resolution-internal** (Stonehewer
  Giant — lose to it), and note that Stonehewer is rescued whenever a triggered attacher is also on
  the battlefield, since the Equipment entering triggers that too.
- Also CR 301.5d — an Equipment's controller is independent of the equipped creature's controller, so
  an Equipment sitting on a Germ (or on an opponent's creature) is still *"an Equipment you control"*
  and a legal target for a battlefield re-attacher such as Captain America's Catch, every combat, with
  no ordering required.
- When a rules interaction moves a permanent somewhere unexpected, **re-read the whole card from the
  new location** before judging it. Split the text into *"buffs the equipped creature"* vs *"global
  effect"* — only the first is lost when the Equipment relocates. Kaldra Compleat and Nettlecyst
  really are dead weight for voltron because every clause is on the equipped creature; Hexplate
  Wallbreaker is not — its payoff is *"untap **each attacking creature**. After this phase, **there is
  an additional combat phase**"*, both **global**, so the commander gets the extra combat no matter
  who holds the sword. The whole cycle remains fine as standalone bodies.
**History:** On 2026-08-07 this ledger claimed "Any Equipment with Living weapon or For Mirrodin!
cannot be used to suit up a specific creature via an 'attach it to X' effect — the ETB trigger
creates a token and moves the Equipment to it afterwards", that "the attach-on-ETB effect resolves
first, then the keyword trigger resolves and steals the Equipment", and that this "rules out Kaldra
Compleat, Nettlecyst, Hexplate Wallbreaker and the rest of the cycle as voltron payload for any 'put
an Equipment onto the battlefield attached' commander." Corrected the same day (2026-08-07): Hexplate
Wallbreaker had been cut from a voltron deck on that basis — the rules check (CR 702.163a) was right
and the conclusion was wrong for any Equipment whose payoff is a global effect rather than a buff to
the equipped creature. Root cause: verified the mechanism (where does the Equipment end up?) and never
re-read the payoff (what does it do from there?) — stopped at the first surprising fact; the user
caught it. Corrected again on 2026-09-18: the sequencing claim holds only for resolution-internal
attaches — when both are triggered abilities you control, CR 603.3b lets you order them so the
attacher resolves last and takes the Equipment back.
**See also:** equip-006, equip-019
**Source:** iron-man (2026-08-07), Tony Stark // The Invincible Iron Man; iron-man (2026-08-07), merged
from "A relocated Equipment still delivers its GLOBAL clauses" — the user caught the Hexplate
Wallbreaker cut; captain-america (2026-09-18), merged from "Living weapon loses the Germ tug-of-war to
any TRIGGERED attach effect" — pilot's "can Sigarda's Aid strip Equipment from living weapons as they
enter?"

### Equipment survives its creature leaving — it unattaches and stays {#equip-003}

**Kind:** ruling · **Verified:** 2026-08-07 against CR 2026-08-07
**Rules:** 704.5n
**Claim:** When the equipped creature dies, is exiled or otherwise leaves, the Equipment is **not**
lost. It stays on the battlefield unattached and must be re-equipped for its normal cost.
**Evidence:** CR 704.5n — *"If an Equipment or Fortification is attached to an illegal permanent or
to a player, it becomes unattached from that permanent or player. It remains on the battlefield."*
**Changes:** Reframes what commander removal actually costs a voltron deck: not the gear, but the
**equip costs to re-suit**. So a commander that attaches Equipment for free *from hand* wants
Equipment held in hand, not cast onto the battlefield early — the free attach is the whole value,
and it only applies to cards coming from hand.
**See also:** equip-008
**Source:** iron-man (2026-08-07).

### "Attach" is not "target", so shroud doesn't stop an attach effect {#equip-004}

**Kind:** ruling · **Verified:** 2026-08-07 against CR 2026-08-07
**Cards:** Whispersilk Cloak; Swiftfoot Boots; Champion's Helm; Lightning Greaves
**Rules:** 701.3a, 702.16b, 702.18
**Claim:** An effect that says "attach it to X" without the word *target* works on a permanent with
shroud or hexproof. An equip **ability** does target and does not.
**Evidence:** CR 701.3a defines attach as a keyword action with no targeting requirement; CR
702.16b/702.18 make shroud and hexproof restrictions on **targeting** only.
**Changes:** Sharpens the existing Whispersilk Cloak warning (SKILL.md §1.3). Shroud on your own
commander still lets a free "attach on ETB" trigger work, but blocks every equip ability, every
pump and every protection spell you control. Prefer hexproof (Swiftfoot Boots, Champion's Helm) to
shroud (Lightning Greaves, Whispersilk Cloak) in any deck that equips or targets its own commander
— even against 3/5 field signal for Greaves.
**Source:** iron-man (2026-08-07).

### Attach a fragile utility permanent to the least-targeted creature, not the best one {#equip-005}

**Kind:** pattern · **Recorded:** 2026-08-25
**Cards:** The Reality Chip
**Claim:** For reconfigure cards and utility Equipment whose benefit is global rather than
combat-relevant, the correct host is the creature opponents care least about. Attaching to the
deck's primary threat converts a one-time cost into a recurring one, because every removal spell
aimed at that threat also knocks the utility piece loose.
**Evidence:** iron-man — The Reality Chip ("as long as this is attached to a creature, you may
play lands and cast spells from the top of your library") costs {1}{U} plus reconfigure {2}{U}.
The pilot reported it as "too expensive"; the cost is actually one-time, and the recurrence came
from hosting it on the commander, the most-removed permanent in a voltron deck. Reconfigure
re-attachment is sorcery-speed, so each host death costs a full turn's tempo as well as 3 mana.
**Changes:** Split attachments into *combat-relevant* (stats, evasion, protection — host the
attacker) and *global* (card access, mana, static abilities — host anything that survives). For
the second group, pick the most expendable legal creature on board.
**See also:** eval-053
**Source:** iron-man V3 (2026-08-25) — the pilot's "it's just too expensive sometimes."

### "Unattach" in a cost needs a BATTLEFIELD re-attacher — sort every attach effect, and know the one question the sort answers {#equip-006}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Cards:** Surestrike Trident; Hammer of Nazahn; Brass Squire; Blacksmith's Talent; Captain America, First Avenger; Puresteel Paladin; Forge Anew; Tony Stark; Sunforger; Halvar, God of Battle; Ardenn, Intrepid Archaeologist; Codsworth, Handy Helper; Jaya's Immolating Inferno
**Rules:** 608.2b, 701.3b, 701.3d
**Claim:** An Equipment whose ability pays *"Unattach this"* as a cost is a **two-card engine**, not
a standalone: it needs an effect that can re-attach gear that is **already on the battlefield** and
no longer attached — free-attach effects keyed to an Equipment *entering* or coming *from your hand*
do not qualify, and paying the equip cost every activation usually kills the card. When a permanent
has a beginning-of-combat trigger that attaches an Equipment *from the battlefield* plus a separate
ability whose cost is "unattach an Equipment," you get one **free** activation every turn by
activating in response to the trigger — no equip cost and no second re-attacher needed.
**Evidence:**
- Surestrike Trident — *"{T}, Unattach Surestrike Trident: This creature deals damage equal to its
  power to target player or planeswalker. Equip {4}."* In iron-man V3 the commander's trigger reads
  *"you may put an artifact card **from your hand** onto the battlefield. If it's an Equipment,
  attach it"* — dead here, the Trident is already on the battlefield. Hammer of Nazahn (*"Whenever an
  Equipment **enters**, you may attach it"*) — also dead, same reason. What actually works: Brass
  Squire (*"{T}: Attach target Equipment you control to target creature you control"*) and
  Blacksmith's Talent level 2 (*"At the beginning of combat on your turn, attach target Equipment you
  control to up to one target creature"*). Without one of those it is one activation per turn cycle
  at {4} a re-equip; with Brass Squire plus a mass untapper it is three to four.
- The free activation (2026-09-08): CR 701.3b — *"If an effect tries to attach [an Equipment] to the
  object... it's already attached to, the effect does nothing."* So the trigger is blank unless the
  Equipment is already off. CR 701.3d — unattaching leaves the Equipment *"on the battlefield but not
  equipping anything."* CR 608.2b — targets are rechecked on resolution and an unattached Equipment
  you control is still legal. The line: trigger goes on the stack targeting the attached Equipment →
  hold priority → activate the unattach-cost ability → trigger resolves and re-attaches. Letting the
  trigger resolve first wastes it entirely.
- Attached-only wording (2026-09-09): *"Attach target Aura or Equipment **attached to a creature you
  control**"* (Halvar, God of Battle) can only relocate gear that is already on a creature. *"Attach
  any number of Auras and Equipment **you control**"* (Ardenn, Intrepid Archaeologist) has no such
  restriction and works on unattached gear. Oracle text of both, verified via `bun run card`. CR
  701.3d — an unattached Equipment is attached to no creature and fails Halvar's targeting
  restriction; CR 608.2b rechecks targets on resolution. Same split applies to Codsworth (*"attach
  target Aura or Equipment **you control**"* — works) and Brass Squire (*"attach target Equipment **you
  control**"* — works). The two shapes look identical in a decklist and are not interchangeable; only
  the second can re-suit after an unattach cost.
**Changes:**
- Sort a deck's attach effects into three buckets before evaluating any unattach-cost card — *on
  enter*, *from hand*, and *from the battlefield* — and count only the third. The same split decides
  whether a stranded Equipment can ever be re-suited after removal.
- Fourth question (2026-09-08): **is the from-battlefield attacher a beginning-of-combat trigger?** If
  so the first activation each turn is free, and Puresteel Paladin / Forge Anew / Brass Squire buy
  *additional* activations rather than the first one. Captain America, First Avenger carries both
  halves in the command zone, which is what makes Surestrike Trident and Sunforger one-card engines
  under him where they were two-card engines under Tony Stark.
- Inside the from-the-battlefield bucket (2026-09-09), **read whether the effect requires the Equipment
  to be currently attached**. A "move it between creatures" effect is a *rescue* card (it saves gear
  when a carrier dies, or redirects a stat stick) and must not be counted toward the unattach engine.
  Halvar is a double-strike anthem plus a rescue effect in captain-america, not a Throw enabler.
- The buckets answer exactly one question — **"can this re-attach an Equipment after I have paid an
  unattach cost?"** They are a filter for a specific mechanical need, not a quality ranking. Before
  letting any bucket/filter heuristic produce a cut, state the question that heuristic actually
  answers and check it is the question being asked. Then re-score the card in every role it occupies
  (§2.4). The fact that decides it for Captain America: his Catch attaches *"up to **one** target
  Equipment"* per combat. A commander that moves one piece per turn can never build a stack of gear
  alone, so attach effects are the shared bottleneck on **both** win conditions at once — every extra
  Equipment on the commander is simultaneously more commander damage and more Throw fodder to choose
  from. For any "attach one per turn" commander, count total attach effects as a first-class role
  rather than a support role.
**History:** On 2026-09-09 this bucket test was used as a verdict: Hammer of Nazahn was dismissed from a
Captain America build with "its attach trigger is 'on enter', which does nothing for the Throw loop."
The pilot pushed back — getting Equipment **onto** the commander is half the loop, and Hammer attaches
every Equipment as it enters, in a deck casting Equipment most turns. They were right; the card went
in. Applying the test as a verdict filed the card in one role and scored it only there, which is the
§2.4 failure mode the skill already names (Jaya's Immolating Inferno dismissed as "a fourth
X-spell"). Separately, Halvar had been filed as an attach engine for three passes before its oracle
text was re-read.
**See also:** equip-007, equip-010, equip-012
**Source:** iron-man (2026-09-02) — Surestrike Trident into V3; captain-america evaluation
(2026-09-08), ties back to iron-man V3's Surestrike Trident, merged from "A beginning-of-combat ATTACH
trigger plus an unattach-cost ability is a free extra activation"; captain-america (2026-09-09) — Halvar
had been filed as an attach engine for three passes before the oracle text was re-read, merged from
"'Attach target Equipment ATTACHED TO a creature' only MOVES gear — it cannot pick up an unattached
Equipment"; captain-america (2026-09-09) — the pilot's "for the throw loop to work we need equipment
attached to him, so 'does nothing for the throw loop' is not true.", merged from "Used the attach-bucket
test as a verdict on card quality, when it only answers one question".

### Paying a cost with the permanent that grants the rider or trigger loses it before the effect happens {#equip-007}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Cards:** Captain America, First Avenger; Basilisk Collar; Illusionist's Bracers; Panther Habit
**Rules:** 113.7a, 120.3, 120.3f, 601.2a, 601.2h, 601.2i, 602.2b, 603.2, 608.1, 608.2c, 701.3d, 702.2b, 702.2d, 702.2e, 702.15b, 702.15c
**Claim:** Costs are paid *before* activation finishes and long before the ability resolves, so an
ability that pays *"unattach an Equipment"* (or sacrifices a permanent) as a cost loses whatever that
permanent was granting: the Equipment's granted keywords are gone before the damage is dealt, and a
static ability that would have triggered on the activation never triggers. Throw the Equipment that
grants the rider and the rider is gone; throw a *different* one and the rider applies in full.
**Evidence:**
- CR 601.2h (via 602.2b) — costs are paid during activation; CR 608.1/608.2c — the ability resolves
  later. CR 120.3 — damage results depend on *"the characteristics of the damage's source"*, checked
  as the damage is dealt. CR 113.7a — the source's information is read on **resolution**, not locked in
  at announcement, and the LKI fallbacks in CR 702.2e / 702.15c apply only when the source has left
  the battlefield. Worked case: Basilisk Collar on Captain America — throwing a different Equipment
  gives the Throw damage deathtouch and lifelink; throwing the Collar itself gives neither.
- Triggers (2026-09-09): CR 602.2b routes activation through CR 601.2a–i. Costs are paid at **CR
  601.2h**; the ability is not activated — and cast/activate triggers do not trigger — until **CR
  601.2i**: *"Once the steps described in 601.2a–h are completed... Any abilities that trigger when a
  spell is cast or put onto the stack trigger at this time."* CR 603.2 requires the trigger condition
  to exist at that moment. CR 701.3d: an unattached Equipment *"remains on the battlefield but isn't
  equipping anything"* — so there is no "equipped creature."
**Changes:** For any unattach-cost or sacrifice-cost outlet, list what the deck's *other* attached
permanents grant and confirm the rider survives the cost payment. The pairing is "rider Equipment
stays on, payload Equipment gets thrown" — never the same card doing both. A hard sequencing trap in
any deck where the enabler is also valid fodder. Concretely: never unattach Illusionist's Bracers (or
the Equipment granting the keyword you want on the damage) to pay an "unattach an Equipment" cost —
throw a *different* piece. Same shape as sacrificing your own "whenever you sacrifice a creature"
permanent to its own outlet.

**Related, verified same pass (2026-09-08):** **deathtouch is not combat-only.** CR 702.2b — *"A
creature... that's been dealt damage by a source with deathtouch... is destroyed as a state-based
action"*, with no combat restriction (CR 702.2d confirms it functions from any zone). So a
Collar-equipped creature pinging for 1 via an activated ability is repeatable removal. Lifelink (CR
702.15b / 120.3f) gains life equal to the **total** dealt across all targets of one instance, not per
target.
**See also:** equip-006, equip-008, dmg-014
**Source:** captain-america (2026-09-08) — Basilisk Collar (69% EDHREC inclusion) with Captain
America's Throw; captain-america (2026-09-09) — Throw's unattach cost vs. Illusionist's Bracers /
Panther Habit, merged from "Paying a cost with the permanent that grants the trigger loses the
trigger".

### An activated ability survives its source's removal, so an unattach/sac outlet is removal insurance {#equip-008}

**Kind:** ruling · **Verified:** 2026-09-08 against CR 2026-08-07
**Rules:** 113.7a, 117.1b, 602.5d, 608.2h, 704.5n
**Claim:** Once an activated ability is on the stack it resolves in full even if its source is
destroyed in response. A voltron commander with a damage outlet therefore converts a removal spell
into damage instead of losing the turn's investment.
**Evidence:** CR 113.7a — *"Once activated or triggered, an ability exists on the stack independently
of its source. Destruction or removal of the source after that time won't affect the ability... The
source can still perform the action even though it no longer exists."* CR 608.2h supplies last known
information for the source's characteristics. CR 117.1b — an activated ability with no printed
activation instruction (CR 602.5d) can be activated any time you have priority, including in response
to removal and on an opponent's turn.
**Changes:** Voltron's standard failure mode is "they kill the commander and the equipment investment
evaporates" (see "Equipment survives its creature leaving", equip-003, CR 704.5n — the gear stays, the
equip costs are the real loss). A
commander-based damage outlet **partially answers that**, and should be scored as resilience, not just
as reach. Check the outlet has no `{T}` in its cost, or the commander needs vigilance / an untapper to
use it after attacking.
**See also:** equip-003, equip-007, dmg-013
**Source:** captain-america (2026-09-08) — Throw ({3}, Unattach) in response to spot removal.

### An "enter as a copy" Equipment copying a LEGENDARY target dies to the legend rule on arrival {#equip-009}

**Kind:** ruling · **Verified:** 2026-09-08 against CR 2026-08-07
**Cards:** Masterwork of Ingenuity; Excalibur, Sword of Eden; Meteor Sword; Argentum Armor; Captain America, First Avenger
**Rules:** 202.3, 205.4d, 704.3, 704.5j, 707.2
**Claim:** A copy effect copies name and supertypes, so copying a legendary permanent you already
control produces two legendary permanents with the same name and one is put into the graveyard
immediately as a state-based action. You cannot use the doomed copy first — the SBA happens before
any player gets priority.
**Evidence:** CR 707.2 — copiable values are *"name, mana cost, colour indicator, card type, subtype,
**supertype**, rules text, power, toughness and/or loyalty."* CR 205.4d + CR 704.5j — *"If two or more
legendary permanents with the same name are controlled by the same player, that player chooses one of
them, and the rest are put into their owners' graveyards."* CR 704.3 — SBAs are checked before any
player receives priority. Note it is **put into the graveyard, not sacrificed** (no sacrifice
triggers), and the legend rule is **per controller**, so copying an *opponent's* legendary permanent is
fine.
**Changes:** Before scoring a copy effect against a marquee legendary target, check whether you already
control the original. Worked case: Masterwork of Ingenuity ({1}) copying Excalibur, Sword of Eden gets
mana value **12** (CR 707.2 → 202.3, and the {1} actually paid is irrelevant) — so the Throw damage
maths is right — but the copy is *also* named Excalibur and legendary, so one of the two dies on
arrival and the "second 12-damage payload for {1}" line does not exist. Masterwork's real ceiling in a
Captain America deck is the best **nonlegendary** payload: Meteor Sword (MV 7) or Argentum Armor
(MV 6). Generalise: **rank copy targets by mana value among nonlegendary permanents first**, and treat
a legendary target as available only when an opponent controls it.
**Source:** captain-america (2026-09-08) — evaluating Masterwork of Ingenuity (57% EDHREC) as a Throw
payload.

### One cost payment buys ONE ability — two unattach-cost abilities on the same Equipment need a re-attach between them {#equip-010}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Cards:** Sunforger; Surestrike Trident; Captain America, First Avenger
**Rules:** 117.1d, 117.3c, 118.3, 118.10, 601.2h, 602.2, 602.2a, 701.3d, 733.1
**Claim:** An Equipment that pays *"Unattach this"* for one ability cannot have that same unattach also
pay a second ability's identical cost, in either order. You must physically re-attach it in between,
and the re-attachment must fully **resolve** before the second ability is activated.
**Evidence:** CR 118.10 — *"Each payment of a cost applies to only one spell, ability, or effect. For
example, a player can't sacrifice just one creature to activate the activated abilities of two
permanents that each require sacrificing a creature as a cost."* Reverse order fails on CR 118.3 —
*"A player can't pay a cost without having the necessary resources to pay it fully… a permanent
that's already tapped can't be tapped to pay a cost"* — an already-unattached Equipment has no
creature to be moved away from (CR 701.3d), so there is nothing to spend; the activation is rewound
under CR 602.2 / 733.1.
**Changes:** For any deck stacking unattach-cost cards (Sunforger, Surestrike Trident, Captain
America's Throw), count the **re-attach events available per turn**, not the number of unattach
outlets — each extra activation needs its own resolved attach. The free line under Captain America is
Sunforger's ability in the precombat main phase, then Catch re-attaching it at beginning of combat,
then Throw — which also means Sunforger's ability must always go *first* in a turn that uses both.

**Related, verified same pass:** **no player ever receives priority during an activation.** A window
does exist in which the ability is on the stack (CR 602.2a) while the Equipment is still attached,
because costs are paid later at CR 601.2h — but CR 117.3c gives priority only *after* the activation
completes, and CR 117.1d makes **mana abilities** the sole thing playable inside that window. So
"hold priority and respond to my own cost payment" is not a legal line, ever.
**See also:** equip-006
**Source:** captain-america (2026-09-09) — the pilot asked whether one unattach could pay for Sunforger
and Throw.

### "The first equip ability each turn is free" effects do NOT stack {#equip-011}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Cards:** Bruenor Battlehammer; Forge Anew; Puresteel Paladin
**Claim:** Bruenor Battlehammer and Forge Anew each read *"You may pay {0} rather than pay the equip
cost of the **first** equip ability you activate [during] each [of your] turn[s]."* Controlling both
gives you **one** free equip per turn, not two — each independently replaces the cost of the same
first activation.
**Evidence:** Oracle text of both cards, verified via `bun run card`. The replacement is keyed to an
ordinal ("the first"), so once the first equip of the turn has been activated, neither effect has a
remaining application; a second equip that turn is simply not "the first."
**Changes:** Do not count two such cards as two free equips when modelling how many Equipment can be
moved in a turn. They remain worth running together as **substitutes** under SKILL.md §2.5 — drawing
either one turns the effect on, which is the real reason for a second copy — but the throughput model
must use one free equip per turn, plus whatever Puresteel Paladin's granted **equip {0}** provides
(that one is an actual cost of {0}, not an ordinal replacement, so it is unlimited).
**Source:** captain-america (2026-09-09) — both cards are in the list.

### An attach ability that isn't equip skips equip's cost and sorcery timing — instant-speed attachers and free on-attack attaches {#equip-012}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Brass Squire; Forge Anew; Super-Soldier Serum
**Rules:** 117.1b, 301.5b, 508.1m, 508.2b, 510.1a, 602.5a, 608.2b, 613.7e, 701.3a, 701.3b, 701.3c, 701.3d, 702.6a, 702.6c
**Claim:** Equip's sorcery timing and cost are built into equip itself, so any other ability that
attaches Equipment is free of them. A permanent whose ability reads *"{T}: Attach target Equipment
you control to target creature you control"* (Brass Squire) can attach during combat, during an
opponent's turn, and in response to removal; Super-Soldier Serum's "Whenever enchanted creature
attacks or blocks, attach any number of target Equipment you control to it" moves every Equipment
onto the creature for free, including gear currently on your other creatures, in time for that
combat's damage.
**Evidence:**
- CR 702.6a builds the restriction into equip itself — *"Equip [cost]" means "[Cost]: Attach this
  permanent to target creature you control. **Activate only as a sorcery**"* — so it binds only equip
  abilities. CR 301.5b expressly allows other routes: *"Spells and other abilities may also attach an
  Equipment to a creature."* Brass Squire prints no activation instruction, so CR 117.1b applies: *"A
  player may activate an activated ability any time they have priority."* Caveats: CR 602.5a summoning
  sickness for the {T}, and CR 608.2b — both targets are chosen on activation and must still be yours
  on resolution.
- Super-Soldier Serum (2026-09-10): CR 702.6a (equip is an activated, sorcery-speed ability with a
  cost); 701.3a and 301.5b (an ability can simply attach Equipment); 702.6c (equip-quality
  restrictions don't limit what the Equipment can be attached to); 701.3b/d (targeting gear already on
  the creature does nothing; a creature it's moved from has it become unattached). The trigger
  resolves in the declare attackers step (508.1m, 508.2b), before damage is assigned (510.1a). Moved
  Equipment gets a new timestamp (701.3c, 613.7e). It also fires on blocks.
**Changes:** Sort a deck's attach effects by **speed** as well as by source zone. An instant-speed
attacher is the piece that re-suits a commander *in response to removal* and that enables an
unattach-cost activation on an opponent's turn — jobs no equip ability can do without Forge Anew's
*"during your turn"* clause, which itself does not extend to opponents' turns. With a free-attach
engine, an Equipment's equip cost stops mattering after the first turn — price such gear on cast cost
alone. Without one, price it on cast + equip.
**See also:** equip-006, equip-022
**Source:** captain-america (2026-09-09) — Brass Squire, kept in the list at the pilot's request;
cap-living-legend (2026-09-10) — Equipment pass, merged from "'Attach any number of target Equipment'
on attack is not equip — no cost, no timing, and it steals".

### Crew stays crewed after the crewers untap, and they can crew a second Vehicle {#equip-013}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Rules:** 602.2, 603.2c, 603.3, 702.122a, 702.122c
**Claim:** Untapping the creatures that paid a crew cost does not un-crew the Vehicle, and those
same creatures may immediately pay another Vehicle's crew cost.
**Evidence:** The untap trigger goes on the stack *above* the crew ability (CR 603.3), so it
resolves first — but CR 602.2 says payments "can't be altered after they've been made," and
702.122c refers to a creature that **was** tapped to pay the cost (past tense, a locked historical
fact). Crew's effect (702.122a) has no ongoing dependency on the crewers' status. Crew requires
"other **untapped** creatures," which they now are again, and crew has no sorcery restriction.
**Changes:** In any deck with an untapper, count each creature's power **once per Vehicle**, not
once per turn. Also CR 603.2c: tapping three creatures for one crew cost is one event with three
occurrences, so it produces **three** separate triggers.
**See also:** equip-024, tap-017
**Source:** cap-living-legend (2026-09-09).

### A crew effect is a layer-4 NONCOPY effect and survives being re-copied {#equip-014}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Cards:** Shuri, Wakandan Inventor; Heart of Kiran; Smuggler's Copter; Parhelion II
**Rules:** 208.5, 613.1d, 613.2a, 613.6, 704.5f, 707.4
**Claim:** Crew a cheap Vehicle first, *then* copy it into an expensive one, and you get the
expensive Vehicle as a creature **without ever paying the big crew cost**.
**Evidence:** Crew's "becomes an artifact creature until end of turn" is a type-changing effect
applied in layer 4 (CR 613.1d); the copy effect applies in layer 1a (613.2a). CR 707.4 — a permanent
copying a different object "doesn't change any noncopy effects presently affecting the permanent,"
and 613.6 keeps it applying. So the layer-4 animation persists through the layer-1a change.
**Changes:** In any Vehicle deck with a copy effect, the correct line is *crew the Crew-1 Vehicle,
copy it into the Crew-6 one*. **The trap on the same rule:** never re-copy that same permanent into
something with no printed power/toughness — the lingering crew effect leaves an artifact creature
that is 0/0 (208.5) and it dies to SBA immediately (704.5f). Point the second activation elsewhere.
**Source:** cap-living-legend (2026-09-09) — Shuri + Heart of Kiran / Smuggler's Copter into Parhelion II.

### Teamwork is a SPELL keyword — it is not crew, Station, or convoke {#equip-015}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Cards:** Agent Maria Hill
**Rules:** 601.2b, 601.2f, 601.2h, 702.51a, 702.122a, 702.184a, 702.194a
**Claim:** A card that triggers on "becomes tapped to pay a teamwork cost" does **not** trigger on
crewing a Vehicle, stationing a Spacecraft, or convoking a spell.
**Evidence:** CR 702.194a — "Teamwork N" means "As an additional cost to cast **this spell**, you
may tap any number of creatures you control with total power N or more." It is an additional cost
on a spell, in the 601.2b / 601.2f–h path. Crew (702.122a) and Station (702.184a) are activation
costs of *abilities*; convoke (702.51a) is an alternative way to pay mana. Different mechanics.
**Changes:** Before slotting a teamwork payoff, count the teamwork *spells* actually available in
the colour identity — `bun run scripts/card.ts search 'id<=xy o:"Teamwork"'`. In UW that pool is
nine cards and mostly filler, so Agent Maria Hill is a blank in a crew/Station deck no matter how
much the flavour fits.
**Source:** cap-living-legend (2026-09-09) — nearly added Agent Maria Hill as "draws a card every time
you crew."

### Station counters equal POWER, so a power-scaling token is the best Spacecraft fuel {#equip-016}

**Kind:** pattern · **Recorded:** 2026-09-09
**Cards:** Simulacrum Synthesizer; Dawnsire, Sunstar Dreadnought; Ornithopter of Paradise; Apprentice Wizard
**Rules:** 702.184a
**Claim:** In a Station deck, the value of a creature is its **power**, and a token whose power
scales with the board is worth more than several small bodies.
**Evidence:** CR 702.184a — Station is "Tap another untapped creature you control: Put charge
counters equal to **its power** on this permanent." A Simulacrum Synthesizer Construct reading "+1/+1
for each artifact you control" is a 10/10 on a board of ten artifacts; with a "first tap each turn
untaps it" commander it stations **twice**, for 20 counters — Dawnsire's full threshold from one
token. A base of 1–3 power creatures needs ten-plus taps for the same result.
**Changes:** When evaluating creatures for a Station or crew deck, rank by power, not by mana value
or by body count — and treat 0-power creatures (Ornithopter of Paradise, Apprentice Wizard) as
contributing **nothing** to that plan regardless of how good their other text is.
**See also:** tap-017
**Source:** cap-living-legend (2026-09-09).

### "Loses flying" vs "have flying" is decided by TIMESTAMP, and an Equipment re-stamps on every attach {#equip-017}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Colossus Hammer; Levitation; Archetype of Imagination; Iron Man, Armored Avenger
**Rules:** 101.2, 613.1f, 613.7, 613.7a, 613.7b, 613.7d, 613.7e, 613.8a
**Claim:** Colossus Hammer ("+10/+10 and loses flying") and a static flying grant (Levitation,
Archetype of Imagination) both apply in layer 6 with no dependency, so the later timestamp wins — and
the Hammer gets a fresh timestamp each time it becomes attached.
**Evidence:** CR 613.1f (ability-adding/removing effects in layer 6), 613.8a (no dependency), 613.7
(timestamp order), 613.7a/d (a static ability's timestamp is when its permanent entered), 613.7e (an
Equipment's effect gets a new timestamp when it becomes attached). A resolving ability's grant (Iron
Man, Armored Avenger's attack trigger) is timestamped on resolution (613.7b), so it beats an earlier
Hammer. "Loses" is not a "can't", so CR 101.2 doesn't apply.
**Changes:** In any deck pairing Colossus Hammer with a flying source, sequence it: equip the Hammer
*before* the flying source lands, or re-trigger flying afterwards. Moving the Hammer later strips
flying again.
**Source:** cap-living-legend (2026-09-10) — v2 voltron research.

### Wizard's Staff doubles abilities GRANTED to the creature, not the attachments' own triggers {#equip-018}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Wizard's Staff; Light of Promise; Umezawa's Jitte; Super-Soldier Serum; Skullclamp; Heliod, Sun-Crowned; Archangel of Thune; Roaming Throne; Sunbond
**Rules:** 113.1a, 113.7, 603.2d
**Claim:** "If a triggered ability of equipped creature triggers, that ability triggers an additional
time" doubles a quoted ability an Aura grants ("Enchanted creature **has** '…'") but not triggers
printed on the Aura or Equipment themselves ("Whenever equipped creature…").
**Evidence:** CR 113.1a (abilities granted with "has/have" belong to the object), 603.2d ("refers
only to triggered abilities that object has"), 113.7 (an ability's source is the object it's on).
So Light of Promise's granted "whenever you gain life, put that many +1/+1 counters on this creature"
triggers twice — a 7-point lifelink hit gives 14 counters — while Umezawa's Jitte, Super-Soldier
Serum, Sword triggers, Skullclamp, Heliod and Archangel of Thune are untouched. Two doublers add one
copy each (603.2d): Staff + Roaming Throne = 3 copies, not 4.
**Changes:** Before pricing a trigger-doubler Equipment, read *where* each trigger on the creature is
printed. It is a multiplier with a single payoff here — a blank without Light of Promise (or Sunbond),
so its value is gated on that Aura's access (deck-brain §2.5, the "blank" case).
**See also:** trig-007
**Source:** cap-living-legend (2026-09-10) — Equipment pass.

### A doubled attach trigger is removal insurance, not a second attachment {#equip-019}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Elesh Norn, Mother of Machines; Panharmonicon; Maul of the Skyclaves; Mithril Coat
**Rules:** 603.3b, 603.3d, 701.3a, 701.3b, 701.3c
**Claim:** When an Equipment's "when this enters, attach it to target creature" trigger fires twice
(Elesh Norn, Panharmonicon), the second instance does nothing on the same target — but ordering the
two at different targets protects the Equipment against a response.
**Evidence:** CR 701.3b (attaching to the object it's already on does nothing), 701.3a/c (a move
between creatures; the last-resolving attach wins, with a new timestamp), 603.3b (you order your
triggers), 603.3d (targets chosen per instance). Aim the first-resolving copy at a backup creature and
the last-resolving copy at the commander: if the commander is removed in response, the Equipment ends
on the backup instead of sitting unattached.
**Changes:** Don't count a doubled attach trigger as extra value when scoring a trigger-doubler; do use
the ordering trick when the doubler is already out.
**See also:** equip-002
**Source:** cap-living-legend (2026-09-10) — Elesh Norn + Maul of the Skyclaves / Mithril Coat.

### Protection from a CARD TYPE doesn't strip Auras/Equipment — but blocks your own creature sources {#equip-020}

**Kind:** ruling · **Verified:** 2026-09-10 against CR 2026-08-07
**Cards:** Pippin, Guard of the Citadel; Mother of Runes; Giver of Runes; Urdnan, Dromoka Warrior; Heliod, Sun-Crowned; Stonehewer Giant; Super-Soldier Serum
**Rules:** 608.2b, 702.16a, 702.16b, 702.16c, 702.16d, 702.16e, 702.16f
**Claim:** Pippin, Guard of the Citadel's "protection from the card type of your choice" choosing
*creature* makes the commander unblockable by creatures and immune to creature damage without
knocking off his Auras or Equipment — unlike protection from one of his own colours.
**Evidence:** CR 702.16a (card-type qualities), 702.16b/e/f (targeting, damage, blocking), 702.16c/d
(only Auras/Equipment *with the quality* fall off — they aren't creatures). Caveat: your own creature
sources can no longer target him that turn — Mother of Runes, Giver of Runes, Urdnan's triggers,
creature-Heliod — while non-targeting attaches (Stonehewer Giant, Super-Soldier Serum) still work.
A second Pippin activation (e.g. protection from instants) must resolve *before* the creature one,
or it fizzles against a creature-protected target (608.2b).
**Changes:** For a voltron commander wearing own-colour Auras, prefer card-type protection
(creature / instant / sorcery) over colour protection; resolve protection-from-creatures last.
**See also:** equip-001, dmg-022
**Source:** cap-living-legend (2026-09-10).

### A crew-cost reducer can silently turn off a "crewed by exactly N" payoff {#equip-021}

**Kind:** pattern · **Recorded:** 2026-09-10
**Cards:** Mighty Servant of Leuk-o; Kotori, Pilot Prodigy
**Claim:** Cards that reward crewing with a specific number of creatures anti-synergise with cards
that lower crew costs, because the cheaper crew number changes how many bodies you naturally tap.
**Evidence:** Mighty Servant of Leuk-o: "Whenever this Vehicle becomes crewed for the first time each
turn, **if it was crewed by exactly two creatures**, it gains [draw two]." Kotori, Pilot Prodigy:
"Vehicles you control have **crew 2**." With Kotori out you crew Mighty Servant with a single
2-power body and the bonus never triggers. Both cards were in the same 100 for three passes.
**Changes:** This is deck-brain §1.3 ("check the card against your own board") applied to *cost
reducers*, which is the easy case to miss — a reducer looks purely upside. Whenever a payoff counts
permanents tapped, resources spent, or mana paid, list every cost reducer in the deck and re-check
the count.
**See also:** equip-024, repl-005
**Source:** cap-living-legend (2026-09-10).

### Added a 10-mana Equipment to a voltron list without costing its equip {#equip-022}

**Kind:** correction · **Recorded:** 2026-09-10
**Cards:** Batterskull; Aqueous Form; Shadowspear; Brotherhood Regalia; Maul of the Skyclaves; Commander's Plate; Umezawa's Jitte; Sword of Feast and Famine; Loxodon Warhammer; Hulkbuster Armor; Stoneforge Mystic
**Claim:** Batterskull went into cap-living-legend `DECK-COUNTERS.md` v2 on the strength of its text
(+4/+4, vigilance, lifelink). Its real cost to reach the commander is {5} cast + equip {5} = 10 mana,
the worst rate in the list. The pilot caught it: "batterskull is essentially 10 mana which is insanely
bad."
**Evidence:** Scored in the same pass: Aqueous Form 1, Shadowspear 3, Brotherhood Regalia 3 (equip
legendary {1}), Maul of the Skyclaves 3 (auto-attach), Commander's Plate 4, Umezawa's Jitte 4,
Sword of Feast and Famine 5, Loxodon Warhammer 6, Hulkbuster Armor 7 — Batterskull 10.
**Changes:** This is deck-brain §1.2 ("cost the card out in this deck's mana") applied to Equipment:
the comparison number is **cast + cheapest applicable equip onto the commander** (checking equip
[quality] variants — legendary, commander, Hero), unless the deck runs a free-attach engine. Build a
cost-to-commander table before choosing voltron gear. Batterskull's Stoneforge line (put into play
for {1}{W}) still ends on a Germ, not on the commander.
**See also:** equip-012
**Source:** cap-living-legend (2026-09-10) — pilot's Equipment critique.

### Crew is INSTANT speed and Station is sorcery speed — but crewing after blockers are declared does nothing {#equip-023}

**Kind:** ruling · **Verified:** 2026-09-13 against CR 2026-08-07
**Rules:** 117.1b, 506.4b, 509.1, 509.1a, 509.1g, 702.122a, 702.184a
**Claim:** Crew has no timing restriction and can be activated any time you hold priority, including
on an opponent's turn and after blockers are declared; Station cannot — it is sorcery-timed. But
blockers are locked in as a turn-based action, so a Vehicle crewed after that point is an untapped
artifact creature that blocks nothing and deals no combat damage — a Vehicle's defence is staying
uncrewed.
**Evidence:** CR 702.122a — "Crew N" means "Tap any number of other untapped creatures you control
with total power N or greater: This permanent becomes an artifact creature until end of turn." No
timing clause — a plain activated ability (117.1b). CR 702.184a — Station ends with "Activate only as
a sorcery." CR 509.1/509.1a (blockers are chosen at the start of the declare blockers step, before
anyone gets priority), 509.1g (only creatures chosen then become blocking creatures). So instant-speed
crewing *is* legal — it just has to happen before the relevant turn-based action. Converse, also
verified: an **untapped blocker can be tapped to crew while it's blocking** and still deals its damage
(CR 506.4b), and 509.1 never taps blockers.
**Changes:** Count Spacecraft only as a main-phase sink. Write the Vehicle line into the gameplan as
*hold it uncrewed* — that is what dodges sorcery-speed removal and creature wraths (an uncrewed Vehicle
is not a creature), and crew only to attack (before declare attackers), to block (before declare
blockers), or to bank a "becomes crewed" trigger. Never price a Vehicle as a reactive blocker you can
flash in. For a "during **your** turn" untapper the crew/Station distinction shrinks — crewing on an
opponent's turn gets no untap — but crewing at end of their turn, or after blockers on yours, is still
live.
**History:** On 2026-09-12 this ledger said to "count Vehicles as instant-speed ambush blockers and as
a post-blockers surprise"; narrowed on 2026-09-13 because blockers are locked in as a turn-based action
(CR 509.1, 509.1g) — crewing after blockers are declared is legal but produces no blocker and no combat
damage.
**See also:** equip-025, tap-006
**Source:** cap-living-legend (2026-09-12); rules question from the pilot (2026-09-13) — crew timing,
merged from "Crewing after blockers are declared does nothing — a Vehicle's defence is staying
UNCREWED".

### Over-crewing adds ZERO power, but a second crew activation re-triggers "becomes crewed" {#equip-024}

**Kind:** ruling · **Verified:** 2026-09-13 against CR 2026-08-07
**Cards:** Veteran Motorist
**Rules:** 117.2a, 208.3, 208.3a, 301.7a, 301.7b, 601.2i, 702.122a, 702.122b, 702.122c, 702.122e
**Claim:** Tapping more power than a Vehicle's crew number gives it no extra stats — but activating
crew a *second* time on an already-crewed Vehicle re-fires every "becomes crewed" and "crews a
Vehicle" payoff.
**Evidence:** CR 702.122a — crew's whole effect is *"This permanent becomes an artifact creature
until end of turn"*; a Vehicle's P/T is its printed P/T (CR 208.3, 301.7a–b), so excess tapped power
is discarded. CR 702.122e — *"'Whenever [this Vehicle] becomes crewed' means 'Whenever a crew ability
of [this Vehicle] resolves'"* → a second resolution = a second trigger. CR 702.122b/c define
"crews a Vehicle" / "crewed by" off the *cost payment*, so over-tapping in a single activation also
multiplies per-creature crew triggers. Ordering: the crew triggers go on the stack **above** the crew
ability (117.2a, 601.2i) and resolve **before** the Vehicle animates — CR 208.3a's own example
(Veteran Motorist) exists to confirm the +1/+1 still applies once it becomes a creature.
**Changes:** Never count over-crewing as "a bigger Vehicle." Do count it as a trigger multiplier:
in a crew-payoff deck, score each Vehicle as (crew activations per turn) × (crew triggers), and tap
extra bodies on purpose when the payoff is per-creature. Pairs with the crew-cost-reducer trap
(2026-09-10, equip-021) — a reducer *lowers* the bodies you naturally tap.
**See also:** equip-013, equip-021
**Source:** rules question from the pilot (2026-09-13) — "does crew have to be one continuous action?"

### A crew-dependent win condition is only wipe-proof if its crew is {#equip-025}

**Kind:** pattern · **Recorded:** 2026-09-15
**Cards:** Shorikai, Genesis Engine; Urza's Saga; Mech Hangar; Mishra's Factory; Mutavault; Mobilized District; Castle Ardenvale; Gideon, Ally of Zendikar; The Wandering Emperor; Elspeth, Knight-Errant; Hangarback Walker
**Rules:** 702.122a, 702.184a
**Claim:** Vehicles and below-threshold Spacecraft survive creature wipes, but they are dead cards
afterwards unless the deck has noncreature sources of creatures to crew or station them.
**Evidence:** CR 702.122a (crew taps creatures) and 702.184a (station taps a creature). DECK-ENGINE had
13 crew/station win conditions and 3 wipe-proof body sources (Shorikai's Pilot tokens, Urza's Saga,
Mech Hangar animating a Vehicle). W/U options, oracle-checked: Mishra's Factory ({1}: 2/2 artifact
creature), Mutavault, Mobilized District, Castle Ardenvale ({2}{W}{W},{T}: 1/1), Gideon, Ally of
Zendikar (0: 2/2 every turn), The Wandering Emperor (−1: 2/2), Elspeth, Knight-Errant (+1: 1/1),
Hangarback Walker (dies into X Thopters).
**Changes:** In a Vehicles deck, score "wipe-proof crew" as its own role beside the Vehicles, and
don't credit Vehicles with surviving a wipe until that role has several cards in it.
**See also:** equip-023, build-034
**Source:** cap-living-legend (2026-09-15).

### An Aura that enchants a PLAYER can never be moved — and it dies with its victim {#equip-026}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Fraying Sanity; Aura Graft; Crown of the Ages; Sevinne's Reclamation; Hall of Heliod's Generosity; Persistent Petitioners
**Rules:** 115.1, 115.1b, 303.4c, 303.4f, 303.4j, 601.2c, 701.3b, 701.3d, 702.5d, 702.16c, 704.3, 704.5m, 800.4a
**Claim:** A player-enchanting Aura (Fraying Sanity, most Curses) is locked to the player you cast it on.
When that player leaves the game it goes to its OWNER's graveyard as a state-based action, and no
"attach target Aura" effect can ever re-aim it.
**Evidence:** The victim is chosen as the spell is cast (CR 115.1b, 601.2c) and targets can't change except
where an effect explicitly says so (115.1); the Aura permanent targets nothing thereafter. CR 702.5d is the
load-bearing rule: "Auras that can enchant a player can target and be attached to players. Such Auras can't
target permanents and can't be attached to permanents" — so Aura Graft ("attached to a permanent") and
Crown of the Ages ("attached to a creature") can never touch one, and an illegal attach attempt simply fails
(701.3b, 303.4j). When the player leaves: 800.4a removes only objects *that player owns* (yours stays),
701.3d counts the departure as "becoming unattached", and 704.5m / 303.4c then bin it in the same SBA loop —
no player gets priority in between (704.3).
**Changes:** Treat every player-Aura as a **one-opponent card with front-loaded value**. The only way to aim
it at a second player is a fresh entry onto the battlefield — recast, blink, reanimate or copy it, where
303.4f lets you choose a new player as it enters. Budget recursion (Sevinne's Reclamation reaches mana value
3; Hall of Heliod's Generosity puts an enchantment on top of your library) or run an "each opponent" effect
instead. Also: **hexproof does NOT remove or stop an attached Curse** (115.1b — the permanent doesn't
target), but **protection does** (702.16c puts it in the graveyard as an SBA).
**Source:** cap-living-legend (2026-09-16) — Fraying Sanity in the Petitioners mill deck.

### Any anthem or enters-with-counters effect turns OFF Skullclamp — check before adding either {#equip-027}

**Kind:** ruling · **Verified:** 2026-09-22 against CR 2026-08-07
**Cards:** Skullclamp; Cathars' Crusade; Intangible Virtue; Divine Visitation; Honored Dreyleader; Welcoming Vampire; Teysa Karlov
**Rules:** 704.5f
**Claim:** Skullclamp (*"Equipped creature gets +1/−1. Whenever equipped creature dies, draw two
cards."*) only draws because a 1/1 becomes a 1/0 and dies to the toughness-0 state-based action. Any
static anthem or "enters with a +1/+1 counter" effect raises toughness to 2, the creature survives,
and Skullclamp becomes a bad Equipment that shrinks your team.
**Evidence:** CR 704.5f (toughness 0 or less → graveyard as an SBA). Cathars' Crusade
(*"Whenever a creature you control enters, put a +1/+1 counter on each creature you control"*),
Intangible Virtue (*"Creature tokens you control get +1/+1"*), Divine Visitation (tokens become 4/4
Angels) and Honored Dreyleader each blank it. Same family as the 2026-08-25 Welcoming Vampire entry
(*a payoff gated on power/toughness reads the creature as modified*), now pointed the other way: there
the anthem switched off a trigger, here it switches off a **cost**.
**Changes:** In any token deck running Skullclamp — one of the strongest draw engines in the
archetype, and four cards per body under Teysa Karlov — count the anthems before adding one. Reject
Cathars' Crusade, Intangible Virtue, Divine Visitation and token-lords on that ground and say so,
because they otherwise look like auto-includes in a go-wide list. If an anthem is wanted anyway,
Skullclamp still works on the turn it is equipped to a freshly-made token *before* the anthem lands,
but treat that as a corner case, not a plan.
**History:** On 2026-09-23 eval-044 changed how this weighs in practice, not the rule: "turns off Skullclamp" is a cost to weigh against the combat route, not a veto. Only a pure anthem with no other text (Sylvan Anthem, Squirrel Sovereign) loses on this ground alone; name the tension and let the pilot choose.
**See also:** repl-005, eval-044
**Source:** chatterfang / teysa-karlov founding build (2026-09-22) — Cathars' Crusade is a pilot
favourite and was cut on this ground.

### An attack-trigger doubler gives Genji Glove exactly two extra combats, and the third attack needs vigilance {#equip-028}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** Windcrag Siege; Genji Glove; Captain America, First Avenger; Argentum Armor
**Rules:** 500.8, 505.1a, 603.2d, 603.4
**Claim:** Under Windcrag Siege (Mardu), Genji Glove's trigger resolves twice in combat 1 and creates
two additional combat phases, then stops. The creature is untapped only in combat 1, so it is tapped
for combat 3 unless it has vigilance.
**Evidence:** CR 603.2d (additional instances), CR 603.4 (the intervening-if is checked on trigger and
on resolution, both inside combat 1), CR 500.8 (multiple extra phases after the same phase), CR 505.1a
(no main phase is added between them). Confirmed by `mtg-rules-expert` 2026-09-28.
**Changes:** For beginning-of-combat engines (Captain America's Catch), count +2 activations a turn.
For *attack* triggers (Argentum Armor), count only the combats the creature can actually attack in.
**See also:** dmg-018, trig-034, eval-055
**Source:** captain-america (2026-09-28), FRA review.
