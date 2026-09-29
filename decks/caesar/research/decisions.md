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
