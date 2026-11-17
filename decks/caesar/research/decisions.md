# Caesar, Legion's Emperor — Decision log

Append-only. Newest entries at the bottom. Record the **grounds**, not the verdict.

---

## 2026-09-24 — Founded. Brief, commander choice, and the whole 100

### The brief

This replaces `decks/teysa-karlov`, which the pilot called unplayable after ten games. They were stuck
on turn 10 every time because Teysa makes no tokens, so the 99 had to supply every body. The pilot's
correction: *"the commander needs to generate tokens as opposed to relying on drawing token
generators… we need a more reliable way to always have tokens on board."* The archetype stays the
same: create tokens, sacrifice them, drain.

This deck is one of a pair founded the same day. The other is `decks/ghave` (Abzan), and
`decks/chatterfang` continues. The pilot's specific asks for Caesar:

- **Infantry Shield** in the list.
- *"a tiny bit voltron, or rather a protection package with hexproof and indestructible so he can
  keep creating the tokens and the doublers can kick in."*
- **Token doublers.**

Pilot answers given on 2026-09-24 that apply here: **Grave Pact and Dictate of Erebos are in.**
Chosen-N loops are fine if declared (memory `loop-policy-chosen-n`). Keep a wide-board combat route
open (memory `keep-combat-as-second-axis`); Caesar's tokens arrive already attacking, so this deck
leans into that.

### Why Caesar

*"Whenever you attack, you may sacrifice another creature. When you do, choose two — • Create two
1/1 red and white Soldier creature tokens with haste that are tapped and attacking. • You draw a card
and you lose 1 life. • Caesar deals damage equal to the number of creature tokens you control to
target opponent."*

All three jobs of the loop come from the command zone: bodies (+1 net each attack), a sacrifice
outlet (one death per attack), and a payoff (a card or a burn). It only needs one other creature to
start. EDHREC: 22,746 decks, rank #47, top themes Tokens then Aristocrats. Salt 0.48/4, below
Teysa's 0.53.

### Role skeleton (SKILL §2.1) — targets set before any card was picked

| Role | Target | Built | Notes |
|---|---|---|---|
| Commander | 1 | 1 | |
| Lands | 35 | 35 | Three colours: 3 fetches, 3 duals, 3 shocks, 3 pathways, 3 checks, 3 fast lands, 3 painlands, Nomad Outpost, 8 basics, 5 utility lands |
| Ramp & Mana | 7 | 7 | Sol Ring, Signet, 3 Talismans, Smothering Tithe, Pitiless Plunderer |
| Card Draw | 8 | 8 | Includes 3 that draw with no fodder (Idol of Oblivion, Tocasia's Welcome, Demonic Tutor) plus Caesar's own draw mode |
| Removal & Interaction | 5 | 5 | Supplemented by Grave Pact / Dictate / Goblin Bombardment / Mayhem Devil |
| Board Wipes | 2 | 2 | |
| **Protection** | 7 | 7 | The pilot's ask. See below |
| Token Engines | 14 | 14 | **All make tokens without anything dying first**, and 9 of them cost 3 or less |
| Token & Trigger Doublers | 5 | 5 | 3 token doublers + 2 attack-trigger doublers |
| Sacrifice Outlets | 4 | 4 | Plus Caesar himself, Commissar Raine, Phyrexian Tower, and the sacrifice-to-draw spells |
| Drain & Death Payoffs | 11 | 11 | Includes Grave Pact and Dictate of Erebos |
| Recursion | 1 | 1 | Reassembling Skeleton (combo piece and reusable fodder) |

**The Teysa lesson applied (LEDGER 2026-09-24).** This list has **17 token makers that need nothing
to die first**, plus the commander. Chance of seeing one of the 17 by turn 3 on the draw: **86%**.
By turn 5: 91%. Caesar is always available on top of that. The Teysa list was at 6 makers and 48%.

### The protection package — what and why

| Card | Covers | Why this one |
|---|---|---|
| Swiftfoot Boots | Targeted removal (hexproof), haste | Hexproof, **not** shroud. See Lightning Greaves below |
| Mithril Coat | Destroy effects and wipes (indestructible) | Flash, and it attaches itself to a legendary creature for free when it enters. Caesar is legendary |
| General's Enforcer | Destroy effects and wipes (indestructible) | *"Legendary Humans you control have indestructible."* Caesar is a legendary Human Soldier. Also covers Anim Pakal, Myrel and Commissar Raine. 61% of Caesar decks run it |
| Mother of Runes | Targeted removal, repeatedly | A 1-drop that answers something every turn |
| Flawless Maneuver | Wipes, for the whole team | Free while you control your commander |
| Deflecting Swat | Any targeted spell, **including exile** | Free while you control your commander. Swords and Path get past indestructible; this doesn't care |
| Teferi's Protection | Everything (Game Changer) | The whole board phases out until your next turn |

Also: **Diamond City** (land) moves its shield counter onto Caesar on any turn two or more creatures
entered under your control, which is almost every turn here. **Myrel, Shield of Argive** stops
opponents from casting spells during your turn, so Caesar can't be answered while he's attacking.

### Token and trigger doublers

- **Anointed Procession, Mondrak, Elspeth, Storm Slayer**: token doublers. With one of them out, a
  Caesar trigger makes 4 Soldiers.
- **Isshin, Two Heavens as One and Windcrag Siege (Mardu mode)**: *"If a creature attacking causes a
  triggered ability of a permanent you control to trigger, that ability triggers an additional
  time."* Isshin's official ruling says this covers *"whenever you attack with one or more
  creatures"*, so **Caesar triggers twice**. Each instance gets its own optional sacrifice and its
  own two modes. They also double Adeline, Anim Pakal, Myrel, Hero of Bladehold, Legion Warboss's
  combat token and Infantry Shield's mobilize.
- Two attack-trigger doublers together give **3 triggers, not 4** (CR 603.2d). A second copy is
  still worth running, because it keeps the effect available when one gets answered (SKILL §2.5).
- **Checked and not a doubler: Mr. House, President and CEO.** It makes a Robot on a die roll of 4
  or higher, with its own {4},{T} activation.

### The declared combo — a chosen-N loop

**Pitiless Plunderer + Reassembling Skeleton + Ashnod's Altar** (or Phyrexian Altar).

- **With Ashnod's Altar:** sacrificing the Skeleton gives {C}{C} plus a Treasure from Plunderer.
  Returning it costs {1}{B}. Net **+{C} per loop**, so you get as much mana and as many deaths as you
  choose.
- **With Phyrexian Altar:** one mana of any colour plus a Treasure pays {1}{B} exactly. Net zero
  mana, as many deaths as you choose.
- With Blood Artist or Zulaport out it kills the table. With Grave Pact or Dictate out, each loop
  also makes every opponent sacrifice a creature.
- **Three cards from the 99, not counting the commander.** Castable for about 9 mana total, so
  around turn 6–7. Every iteration is an activation the pilot announces.
- Goblin Bombardment alone does **not** enable it: a free sacrifice gives one Treasure, and the
  Skeleton needs two mana.
- **To switch it off, cut Reassembling Skeleton.**

No automatic infinite was found. Pairings checked: Mayhem Devil + Plunderer's Treasures, doublers +
each outlet, Isshin + Caesar, Grave Pact + the loop above. All are bounded or chosen-N.

### Cards rejected on their merits, with the grounds

- **Lightning Greaves**: equip {0} and haste, but it gives **shroud** (CR 702.18a). Shroud stops
  *you* targeting Caesar too, which turns off Infantry Shield's equip, Mother of Runes and Mithril
  Coat's attach (SKILL §1.3). Swiftfoot Boots gives hexproof, which only stops opponents.
- **Darksteel Plate**: 3 mana plus equip {2} for the same indestructible that Mithril Coat gives
  with flash and a free attach.
- **Giver of Runes**: swapped out for General's Enforcer during the build. Giver only answers
  targeted removal, which Mother, Boots and Swat already cover. Enforcer covers destroy-wipes.
- **Akroma's Will, Boros Charm**: both good. Akroma's Will is also a finisher, with double strike
  on every token. They're the first two alternates if a protection slot opens.
- **Hour of Reckoning** (44% of the field): *"Destroy all nontoken creatures"* kills Caesar and
  every drain creature we run. **Ruinous Ultimatum** is one-sided (*"all nonland permanents your
  opponents control"*), so it takes the wipe slot despite the {R}{R}{W}{W}{W}{B}{B} cost.
- **Martial Coup**: the wipe half needs 7 mana. Secure the Wastes does the token half at instant
  speed.
- **Ojer Taq** (a tripler) and **Captain of the Watch, Elspeth, Sun's Champion**: all 6 mana. The
  brief was cheap board-building.
- **Exalted Sunborn**: a strong doubler, and warp {1}{W} lets it double one burst turn for 2 mana.
  **First alternate for a doubler slot.**
- **Goblin Rabblemaster**: forces *other Goblins* to attack every combat, including Warboss tokens
  you might want to keep as blockers. Legion Warboss was chosen instead.
- **Mardu Ascendancy**: one Goblin per non-token attacker. Adeline and Anim Pakal do more for the
  same 3 mana.
- **Keeper of the Accord** (46%): its token only comes when an opponent has more creatures than
  you, which rarely happens here.
- **Securitron Squadron**: +1/+1 counters on every token entering, which stops Skullclamp from
  killing them (CR 704.5f). It has no upside worth that cost.
- **Purphoros, Mirkwood Bats, Teysa Karlov** (Teysa is in 32% of Caesar decks): all fine payoffs at
  4 mana. The 11 payoff slots went to cheaper cards first. **Purphoros is the first alternate.**
- **Kambal, Keeper, MacCready**: conditional or triggers only once per event.

### Rules facts this list is built on (verified 2026-09-24, CR 2026-08-07)

- **Caesar doesn't need to attack.** CR 508.3d: *"Whenever [a player] attacks"* triggers if one or
  more creatures that player controls are declared as attackers. Attacking with one token is enough.
- **No sacrifice means no modes.** The choice is a reflexive trigger (CR 603.12). If you decline the
  sacrifice, nothing happens. Modes and the damage target are chosen when the reflexive trigger goes
  on the stack (CR 700.2b, 603.3c, and Caesar's 2024-03-08 ruling). You can't pick the same mode
  twice (CR 700.2d).
- **The damage mode counts the Soldiers made by the same trigger.** Instructions are carried out in
  the order written (CR 608.2c), and the tokens mode is printed first. Pick tokens + damage and the
  two new Soldiers count.
- **Tokens that enter tapped and attacking never "attacked."** CR 508.4 and Caesar's own ruling:
  they don't trigger Caesar, Adeline, Anim Pakal, Myrel or mobilize. They **do** trigger
  "enters" payoffs (Impact Tremors, Warleader's Call, Elas, Tocasia's Welcome), and Windbrisk
  Heights counts attacking creatures.
- **Mobilize** (CR 702.181a): the Warriors are sacrificed at the beginning of the next end step.
  **Doubled Warriors are sacrificed too.** Anointed Procession's ruling says an instruction to do
  something to the tokens later applies to all of them. Each one dies separately, so each one fires
  every per-creature death payoff (CR 603.2c) and Grave Pact / Dictate. Sacrificed at the end step
  they are no longer attacking (CR 511.3, 506.4), so **Zurgo drains 1 per Warrior rather than
  drawing** (LEDGER 2026-09-22).
- **Isshin + Windcrag Siege = 3 Caesar triggers, not 4** (CR 603.2d).

### Validation

`bun run card --deck caesar`: 95 unique names, all found, **no illegal cards, no off-identity
cards**. `deck:show`: **100/100**, 35 lands, average MV 2.74, pips W38 B34 R16, sources W26 B25
R23. **Game Changers 3/3: Smothering Tithe, Demonic Tutor, Teferi's Protection.** That is the
Bracket 3 cap.

---

## 2026-09-28 — Reality Fracture (FRA/FRC) set review: three swaps applied

Full review: `research/fra-set-review-2026-09-28.md` (206-card pool). The pilot approved these three
(snapshots under `versions/2026-09-28-1602-main-fra-*`):

- **Lich's Relic in, Lethal Scheme out.** For {B}+{2} it destroys up to one creature or
  planeswalker per opponent, then stays as a +2/+1 Equipment. Like-for-like on permanent types, since
  Lethal Scheme also hit only creatures and planeswalkers. It loses instant speed and connive.
- **Bloodline Recollector in, Deadly Dispute out.** It re-prepares at *each* end step where 3+
  creatures died, and its {B} copy draws three. Deaths from end-step delayed sacrifices (mobilize) do
  not count (CR 603.4, confirmed by mtg-rules-expert).
- **Kher Keep in, one Mountain out.** An instant-speed 0/1 on every player's turn: sacrifice fodder
  and a drain, and it turns Tocasia's Welcome's once-each-turn draw into one per player's turn.

**Protected by the pilot: Bastion of Remembrance.** Rejected as the cut for Ingris Stingerquill. A
different slot for Ingris is worked in the review file's follow-up section.

Validation: `bun run card --deck caesar` clean (legal, on-identity), 100 cards, PDF regenerated.

### Applied 2026-09-28 (pilot approved): Purphoros and Ingris in; one Swamp and Lingering Souls out

Pilot: *"we need drain as much as possible"*. Bastion of Remembrance, Zulaport Cutthroat and Impact
Tremors are all kept. *"i feel like caesar is missing purphoros too."* Every role was at target, so
neither slot came from drain.

- **Purphoros, God of the Forge in, one Swamp out** (lands 35 → 34). Whenever another creature
  enters, it deals 2 damage to each opponent: double Impact Tremors, and the token doublers double
  it again. It is indestructible, and not a creature until red devotion reaches 5, so it survives
  creature wipes. 35 lands was high for a 2.69 average with 7 ramp pieces plus Plunderer and Tithe.
  B sources 24 → 23.
- **Ingris Stingerquill in, Lingering Souls out.** Whenever a creature you control attacks, it deals
  1 damage to each opponent, and Isshin and Windcrag Siege double that. Its {4} ability makes a
  Cadet and gives the team haste, so the token-maker count holds. Lingering Souls was a one-shot.

Now: 34 lands, avg MV 2.71, MV ≤ 2 and MV ≤ 3 unchanged, 13 drain payoffs. Validated clean. PDF
regenerated. Note: `pdf.json`'s hand-written stats line (Avg MV 2.74, 17 token makers) predates
today's changes.

## 2026-11-10 — Chainsaw in, Talisman of Conviction out (pilot's call)

Snapshot: `versions/2026-11-10-0147-main-chainsaw-in-talisman-of-conviction-out.json`. Part of a
multi-deck card review; the pilot's note paired Chainsaw with Infantry Shield (*"use these together
in a deck, maybe Caesar"*).

**Grounds.** Chainsaw's *"Whenever one or more creatures die, put a rev counter"* triggers once per
death event (ledger trig-021). Mobilize sacrifices its Warriors together at end step, which is one
event. Caesar runs four free outlets (Viscera Seer, Ashnod's Altar, Phyrexian Altar, Goblin
Bombardment), so sacrificing the Warriors one at a time before the end step makes each one its own
event and its own counter. Worn with Infantry Shield, more power means more Warriors (mobilize X is
the creature's power) and more Warriors means more counters, so the pair grows every attack.
Caesar's own attack sacrifice and Grave Pact deaths add counters too. The ETB (3 damage to up to one
creature) makes it a sixth removal piece. Iron Man passed on Chainsaw on 2026-09-03 because that
deck makes almost no death events; Caesar is the opposite case.

**Costs named.** Equip {3} on top of the Shield's {2}. Ramp 7 → 6. R sources 21 → 20, W 25 → 24.

**Cuts considered.** Legion Warboss and Loyal Apprentice were kept because each supplies the body
Caesar sacrifices on every attack. Talisman of Conviction is the rock for the lightest colour.

**Also reviewed for Caesar this pass, not taken:** Priest of Forgotten Gods (Caesar's four outlets
are already free and unlimited), Super Shredder (a better fit for the token decks that spend Foods
and Treasures too), Rain of Gore (it turns Blood Artist's and Cruel Celebrant's "you gain 1 life"
into your own life loss).

Validated: 100/100, legal and on-identity, Game Changers 3/3 unchanged. `MOXFIELD.txt` and
`caesar-reference.pdf` regenerated.

## 2026-11-14 — Star Trek (TRK/TRC) review: pilot's calls, nine swaps applied

Review: `research/trk-set-review-2026-11-10.md`, then a follow-up round on the pilot's questions.
Each swap was its own decision and has its own `deck:edit` snapshot.

**Applied**
- Troubling Tribbles in, Assemble the Legion out. Agreed only together with anthems, so the 0/1,
  can't-block Tribbles can attack. Tribbles copies itself every upkeep (15 tokens after four
  upkeeps for 3 mana, against Assemble's 10 for 5). It's mandatory growth, and with Ocelot Pride's
  city's blessing it triples, so declare it at the table.
- Caretaker's Talent in, Tocasia's Welcome out. The same {2}{W} once-a-turn draw, off any token
  (Treasures too). Level 3 gives creature tokens +2/+2, but it also stops Skullclamp killing them.
- Heraldic Banner in, Lich's Relic out. Named white, +1/+0 to the Tribbles and white tokens without
  stopping Skullclamp, plus {W}. Ramp 6 to 7, removal 6 to its target of 5.
- Worf, Still Not Merry in, Hero of Bladehold out. The pilot kept Secure the Wastes as the
  instant-speed token maker and read Worf as a 5-mana finisher. Worf makes a flying Faerie per
  attacking non-Faerie creature on each attack. No haste.
- Landbase pass: Vault of Champions in for a Plains (the pilot: *"can't believe we didn't have vault
  of champions to begin with"*), Luxury Suite for Blackcleave Cliffs, Spectator Seating for
  Inspiring Vantage, Polluted Delta for Concealed Courtyard, Castle Embereth for the last Mountain.

**Declined or held, with the pilot's grounds**
- Vengeance Mission: the pilot wouldn't cut Blood Artist for it and then held it rather than cut
  Cruel Celebrant. It's in `research/sideboard.md`, displacing Cruel Celebrant.
- Rite of Oblivion for Vanishing Verse: declined. Verse stays.
- Kor, Cause of Vengeance: declined, because the deck doesn't run enough Warriors for its pump.
  Kurn, Son of Mogh (the review's swap for Idol of Oblivion) wasn't taken either, and Idol stays.
- L'Rell, Fierce Visionary: declined, because Legion Warboss's mentor is more useful here.
- Flooded Strand for Nomad Outpost: declined. The pilot kept Nomad Outpost.
- The Needs of the Many: it's a mass-protection spell like Teferi's Protection, not a Mithril Coat
  replacement, and `main` already runs Teferi's Protection. It's a sideboard row for pods that need
  a second save.
- Alhammarret's Archive and Soul Warden-type cards: not recommended. Elas il-Kor is already the
  deck's Soul Warden effect, and nothing here turns lifegain into damage. A converter round
  (Marauding Blight-Priest, Vito) was offered. Vito with Exquisite Blood would be an automatic
  infinite, and neither is in the list.
- The rest of the bench (Combat Celebrant, Grand Crescendo, Elim Garak, Eject the Warp Core, The
  Wrath of Khan): not worth adding.

**Validated:** 100/100, legal and on-identity, Game Changers 3/3. Average MV 2.73 by `deck:show`.
`MOXFIELD.txt` regenerated. `caesar-reference.pdf` was not regenerated. Undo rows for all four
nonland swaps are in `research/sideboard.md`.

## 2026-11-15 — Lwaxana Troi in for Ingris; lifegain package in: Mirkwood Bats, South Wind Avatar, Soul Warden, Vito (pilot's calls)

Snapshot: `versions/2026-11-15-0911-main-lwaxana-troi-in-ingris-stingerquill-out.json`. The Star
Trek review had passed on Lwaxana (*"repeats what Isshin and Windcrag Siege already give"*). That was
too quick: Isshin and Windcrag Siege double only attack-caused triggers, and Lwaxana can also double a
drainer's death trigger. The pilot: *"yes let's try to fit her in"*, then *"yes let's cut ingris for
lwaxana"*.

**Grounds.** Aimed at Caesar she adds one "Whenever you attack" instance, so four with Isshin and
Windcrag Siege out. Each instance is its own optional sacrifice and two modes. She doesn't add a
second reflexive "choose two" per sacrifice, because CR 603.2d excludes reflexive triggers (ledger
trig-034, checked by mtg-rules-expert). Aimed at Zulaport Cutthroat, Blood Artist or Cruel Celebrant,
every death drains 2. Drain & Death Payoffs was 13 against a target of 11. Ingris fired only on
declared attackers, never on Caesar's tapped-and-attacking tokens (CR 508.4).

**Costs.** Ingris's {4} Cadet-and-haste ability and a 1/4 flying blocker. Lwaxana is a 2/2 that The
Meathook Massacre at X = 2 kills. Doublers go 5 → 6.

**Curve:** average MV 2.73 → 2.71, MV ≤ 2 29 → 30, MV ≤ 3 53 → 53. Validated 100/100, legal and
on-identity, Game Changers 3/3. `MOXFIELD.txt` regenerated. Undo row in `research/sideboard.md`.

**Correction to the 2026-11-14 entry.** It said Alhammarret's Archive wasn't recommended because
nothing turns lifegain into damage. That ignored its draw half: it doubles every draw outside the
draw step, so Skullclamp draws four, and Caesar's draw mode, Morbid Opportunist, Caretaker's Talent
and Idol of Oblivion double too. It's held, not passed.

**Lifegain audit, applied (pilot's calls).** The pilot asked to fit South Wind Avatar, Vito, Soul
Warden and Mirkwood Bats, then picked the cuts from the offered options:

| Out | In | Grounds |
|---|---|---|
| Zurgo Stormrender | Mirkwood Bats | Whenever you create or sacrifice a token, each opponent loses 1, once per token, Treasures and doubler extras included (CR 603.2c, ledger). Zurgo drained only on tokens leaving while not attacking. Cost: Zurgo's draw on attacking tokens and its mobilize Warrior. |
| Swords to Plowshares | South Wind Avatar | The pilot's pick over Mayhem Devil and Path to Exile. Each life gain makes each opponent lose 1, per event (CR 119.9, ledger dmg-001), and it gains on every death itself. Swords gave the opponent life, which undoes drain. Cost: Removal & Interaction 5 → 4. |
| General's Enforcer | Soul Warden | The pilot's pick. Every creature that enters gains 1 for the converters, and Ocelot Pride keeps making Cats. Enforcer ranked last in Protection, since Mithril Coat, Flawless Maneuver and Teferi's Protection still answer destroy effects. Cost: Protection 7 → 6, and Adeline, Anim Pakal, Myrel and Commissar Raine lose indestructible. |
| Talisman of Indulgence | Vito, Thorn of the Dusk Rose | A second converter: target opponent loses as much as you gained. Its lifelink activation makes each connecting attacker a separate gain. Cost: Ramp 7 → 6, red sources 21 → 20. Vito drains one opponent, so it's the weakest of the four. Never add Exquisite Blood, which is an automatic infinite with Vito. |

Snapshots: `versions/2026-11-15-1028-main-*.json`, one per swap. Undo rows are in
`research/sideboard.md`. Mayhem Devil and Viscera Seer stay. No loop was added, because no card in the
list gains life when an opponent loses it. Ledger eval-065 records the converter lesson.

**Roles after the audit:** Ramp 6, Removal & Interaction 4, Protection 6, Doublers 6, Drain & Death
Payoffs 15, against targets of 7, 5, 7, 5 and 11. Drain is the deck's engine now, which the pilot chose.

**Curve:** average MV 2.71 → 2.77, MV ≤ 2 30 → 28, MV ≤ 3 53 → 51. Validated 100/100, every name
found, legal and on-identity, Game Changers 3/3. `MOXFIELD.txt` regenerated. `research/gameplan.md`
updated (opening, protection table, turn order, the kill), including lines left stale by earlier
swaps (Lingering Souls, Assemble the Legion, Hero of Bladehold). `caesar-reference.pdf` wasn't
regenerated.

## 2026-11-15 — Pilot's card notes round: Super Shredder in, Bitterbloom Bearer out (pilot's call)

Snapshot: `versions/2026-11-15-1412-main-super-shredder-in-bitterbloom-bearer-out.json`. The pilot's
notes asked for Own the Day and Super Shredder here, and whether the Yahenni, Undying Partisan +
Infantry Shield + Blade of the Bloodchief combo belongs in Caesar or Edgar.

**Grounds.** Super Shredder gets a +1/+1 counter whenever another permanent leaves the battlefield:
every token sacrificed, Treasures, fetch lands, and every creature Grave Pact or Dictate takes from an
opponent. The trigger is per permanent, so the mobilize Warriors dying together at end step add one
counter each (CR 603.2c, ledger trig-021). Wearing Infantry Shield, its power becomes that many
Warriors (mobilize X reads power on resolution, ledger equip-029), and sacrificing them to Viscera
Seer, Ashnod's Altar, Phyrexian Altar or Goblin Bombardment before damage roughly doubles it before
it connects. Isshin and Windcrag Siege trigger mobilize twice, and the token doublers double the
Warriors (ledger repl-012). That is the Yahenni combo in one card. Yahenni grows only when an
opponent's creature dies, so here it needs Blade to use the deck's own tokens, and its outlet would
be the fifth free one. Edgar's `combat` and `sacrifice` lists already run Yahenni and Blade, so the
combo goes to Edgar's round as Infantry Shield alone.

**Correction to the 2026-11-10 entry.** It passed Super Shredder here as a better fit for decks that
also spend Foods and Treasures. That missed Infantry Shield, which turns its power into Warriors that
grow it again.

**Cuts offered and not taken.** Impact Tremors (weakest of the three enter pingers), Soul Warden,
Warleader's Call, Vito, a Swamp and Talisman of Hierarchy. The pilot turned down the first three
outright and kept Vito for its lifelink (*"if we have things to give our creatures lifelink"*).
Bitterbloom Bearer was the pilot's own pick: Bitterblossom still makes the same upkeep Faerie.

**Costs.** Token Engines 13 → 12 against a target of 14. Super Shredder is a 1/1 until it grows, and
the deck's own The Meathook Massacre kills it at X = 1.

**Curve:** average MV 2.77 → 2.77, MV ≤ 2 28 → 28, MV ≤ 3 51 → 51. Validated 100/100, legal and
on-identity, Game Changers 3/3. `MOXFIELD.txt` regenerated. Undo row in `research/sideboard.md`.

**Still open in this round:** Own the Day (the pilot wants it, not for a Swamp) and Sorin, Vengeful
Bloodlord as a free team-lifelink source for South Wind Avatar and Vito to convert.

## 2026-11-15 — Pilot's call: keep `main` as the drain build and found a `combat` list

The pilot invited a rethink (*"i'm fully okay to rething the deck that way and we go all in on
combat"*). My read, given before any build: Caesar triggers only on attacks, his tokens enter
attacking, and his damage mode counts living tokens, so the commander rewards keeping tokens alive.
Isshin, Windcrag Siege, Lwaxana, Adeline, Anim Pakal, Myrel, Worf, Infantry Shield, Super Shredder and
the proposed Own the Day are all attack cards, while Drain & Death Payoffs sat at 16 against a target
of 11. EDHREC (23,357 decks) tags Tokens 2,862, Aristocrats 1,164 and Aggro 788. Costs named: no play
report on Caesar exists yet; combat is more exposed to blockers, fogs and wipes; static anthems stop
Skullclamp killing 1/1 tokens; "whenever a creature attacks" payoffs such as Fervent Charge (43% of
Caesar decks) never fire for tokens that enter attacking (CR 508.4).

**Pilot's calls.**
- `main` stays as it is. A new `combat` list gets built without being limited to `main`'s cards.
  Cards from `main` that don't make it are then offered back one at a time with pros and cons, like
  the swap rounds.
- Grave Pact and Dictate of Erebos stay in the combat list (founding asks, and Caesar sacrifices on
  every attack).
- Own the Day, Sorin, Vengeful Bloodlord and Krenko, Tin Street Kingpin move into the combat build
  instead of being decided against `main`.

**Open:** all-in combat, or combat with a lifelink layer (Sorin plus each-opponent converters).

## 2026-11-15 — `combat` founded: go-wide combat with a lifelink layer (first draft)

Snapshot: `versions/2026-11-15-1532-combat-founded-combat-with-lifelink.json`. Import list:
`MOXFIELD-COMBAT.txt`. The pilot chose combat with lifelink over all-in combat (*"lifelink is an
integral part of any combat based deck. you'll never win if you can't get life back"*), Bracket 3,
and the same Game Changers except Demonic Tutor.

**How it wins.** Neyali, Suns' Vanguard gives attacking tokens double strike, and Caesar's tokens
enter attacking, so they have it at once (static, CR 611.3a). Iroas prevents all damage to attacking
creatures, so they survive blocks, and All-Out Assault's deathtouch kills the blockers. Sorin,
Vengeful Bloodlord gives everything lifelink during your turn, including tokens made in combat
(ledger dmg-031). Each token's damage in each damage step is its own gain (CR 702.15e, ledger
dmg-001), and South Wind Avatar and Marauding Blight-Priest each make every opponent lose 1 per
gain. Damage dealt to a blocker still gains life (CR 702.15b). Throne of the God-Pharaoh drains each
opponent per tapped creature at your end step: order it before the mobilize sacrifice so the
Warriors still count (CR 603.3b).

**Role skeleton (targets set before picking).**

| Role | Target | Built |
|---|---|---|
| Lands | 34 | 34 (main's, minus Kher Keep and Phyrexian Tower, plus Vault of the Archangel and Minas Tirith; Plains 2 → 3, Swamp 2 → 1) |
| Ramp & Mana | 7 | 6 |
| Card Draw | 8–10 | 7 + Court of Grace (monarch) + Minas Tirith = 9 |
| Removal & Interaction | 5 | 5 |
| Board Wipes | 1 | 1 (Ruinous Ultimatum, one-sided) |
| Protection | 7 | 7 |
| Token Engines | 14 | 14 |
| Token & Trigger Doublers | 5 | 6 |
| Anthems & Combat | 6 | 6 |
| Lifelink & Converters | 5 | 5 + Vault of the Archangel |
| Death & Drain Payoffs | 5 | 5 (Grave Pact and Dictate at the pilot's request) |
| Sacrifice Outlets | 3 | 3 (two make mana, Goblin Bombardment makes damage) |

**New to Caesar (19):** Talisman of Conviction, Swords to Plowshares (both back), Welcoming Vampire,
The One Ring (Game Changer in Demonic Tutor's slot), Akroma's Will, Hero of Bladehold (back), Ainok
Strike Leader, Voice of Victory, Krenko, Tin Street Kingpin, Exalted Sunborn, Intangible Virtue,
Neyali, Iroas, All-Out Assault, Own the Day, Sorin, Vengeful Bloodlord, Marauding Blight-Priest,
Kambal, Throne of the God-Pharaoh. Lands: Vault of the Archangel, Minas Tirith.

**Left out from main (to be offered back one at a time):** Blood Artist, Cruel Celebrant, Zulaport
Cutthroat, Bastion of Remembrance, Mirkwood Bats, Impact Tremors, Soul Warden, Vito, Mayhem Devil,
The Meathook Massacre, Lwaxana, Worf, Bitterblossom, Morbid Opportunist, Skullclamp, Viscera Seer,
Pitiless Plunderer, Reassembling Skeleton, Demonic Tutor, Kher Keep, Phyrexian Tower.

**Self-hits checked (SKILL §1.3).** Static +1/+1 anthems stop Skullclamp killing 1/1 tokens, so
Skullclamp is out. The Meathook Massacre's −X/−X kills the deck's own tokens. Intangible Virtue's
vigilance means declared token attackers stay untapped, which Throne doesn't count (Caesar's own
tokens enter tapped either way). Voice of Victory and Myrel stop opponents casting spells on your
turn, which pods that remove stax on sight may target. No infinite found: no card gains life when an
opponent loses it, and Pitiless Plunderer and Reassembling Skeleton (the declared loop in `main`) are
both out. Troubling Tribbles' upkeep copies are still mandatory.

**Curve:** average MV 3.03, MV ≤ 2 22, MV ≤ 3 45 (main: 2.77, 28, 51). Own the Day usually costs 3,
and Exalted Sunborn can warp in for {1}{W}. Validated 100/100, legal and on-identity, Game Changers
3/3 (Smothering Tithe, Teferi's Protection, The One Ring). Pips W46 B21 R20, sources W26 B20 R20.
