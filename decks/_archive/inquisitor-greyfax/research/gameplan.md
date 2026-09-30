# Inquisitor Greyfax — Gameplan

Pilot notes: what to keep, what order to deploy, and the lines that aren't obvious from the list.

## The loop

1. **Tap theirs** — Greyfax `{1},{T}`, Icy Manipulator, Hylda's Crown of Winter, Opposition,
   Dreamshackle Geist, Quake, Junk Winder; Blustersquall, Subjugator Angel and Tempest Caller
   for the whole board at once.
2. **Get paid** — Greyfax makes a Clue, Hylda makes a 4/4 (or scry 2 + draw), Verity Circle draws,
   Sharae draws, Gideon's Avenger grows.
3. **Untap and repeat** — Unwinding Clock, Unstoppable Plan, Clock of Omens, Thousand-Year Elixir,
   Magewright's Stone, Staff of Domination, Minamo.
4. **Tapped → dead** — Royal Assassin, King's Assassin, Stalking Assassin; Ethersworn Adjudicator
   and Visara kill anything; Merieke Ri Berit steals then destroys.
5. **Close** — swing with a vigilant team into a board that is tapped and shrinking.

## Mulligan

**Keep** any hand with two lands plus either a cheap tapper (Icy Manipulator, Hylda's Crown,
Dreamshackle Geist, Quake) or a rock that gets Greyfax out on turn 3–4. Greyfax is the engine —
hands that cast her on curve are good hands.

**Ship** hands that are all payoffs and no tappers. Hylda, Verity Circle and Gideon's Avenger do
**nothing** without something to tap with. This is the deck's main failure mode: a hand full of
engines with no input.

## Sequencing

- **Tapper before payoff.** A turn-3 Icy Manipulator beats a turn-3 Hylda every time.
- **Deploy Greyfax into an open board, not into a counterspell.** She is `{1}{W}{U}{B}` — three
  pips on a four-drop. Check the manabase before committing; this is the deck's real tax for
  playing three colours.
- **Swiftfoot Boots on Greyfax gives haste**, which matters: her `{T}` ability is unusable the turn
  she lands otherwise (CR 107.5 — a creature's `{T}` ability needs continuous control since your
  turn began).
- **Unwinding Clock is the single highest-impact non-commander card.** It quadruples every artifact
  tapper. If you have a choice of what to protect or what to tutor toward, it's this.

## Lines that aren't obvious

### Greyfax draws even into a fully tapped board

A tapped creature is still a **legal target** for Greyfax — the ability resolves, the tap simply
does nothing, and **you still Investigate**. So Greyfax is never a dead activation. The chain:
**CR 601.2c** (via **602.2b**) — the only targeting requirement she states is "creature an opponent
controls", so a tapped one is an appropriate choice; **CR 608.2b** — the target is still legal on
resolution, so the ability "will resolve normally"; **CR 701.26a** — *"Only untapped permanents can
be tapped"*, so the tap does nothing; **CR 101.3** — only that impossible part is ignored;
**CR 608.2c** — the remaining instruction, the separate sentence "Investigate.", is still followed.
It is unconditional — there is no "if you do" linking it to the tap.

But note the asymmetry: **Hylda does not trigger** (she needs an *untapped* creature) and
**Verity Circle does not trigger** (nothing "becomes tapped"). When you have both out, spend your
taps on untapped creatures first and use Greyfax on already-tapped ones only to farm Clues.

### Summoning sickness never stops you tapping their creature

A creature that just entered can be tapped by an effect — summoning sickness only restricts
attacking and `{T}` costs. Tap their fresh blocker down the turn it lands. (Already verified in
deck-brain LEDGER.)

### Merieke Ri Berit is a repeatable removal engine here, not a one-shot

`{T}: Gain control of target creature… When Merieke leaves the battlefield **or becomes untapped**,
destroy that creature.` Normally that's a one-time steal. With untappers it's a loop: tap to steal
→ untap her → the stolen creature is **destroyed** → tap again to steal the next one. She reads as
a downside card and plays as the best assassin in the deck.

### Verity Circle explicitly does not pay off attackers

*"…if it isn't being declared as an attacker."* Goad effects and forced attacks feed **none** of
this deck's payoffs — Hylda and Sharae both read "whenever **you** tap". You have to do the tapping.

### Sunblast Angel timing

It destroys **all** tapped creatures. Greyfax's vigilance keeps your attackers untapped, but
Opposition's cost and your own `{T}` abilities do not. Cast Sunblast **before** you spend your
creatures for the turn, or accept the losses deliberately.

### Stun counters are the permanent version of a tap

Sharae, Sensational Spider-Man and Kaito leave stun counters — the creature never untaps on its
own. **Karn's Bastion** (`{4},{T}: Proliferate`) turns one stun counter into a permanent lockout
and keeps a creature parked as Royal Assassin food indefinitely.

## Who to point removal at

Kill **untappers and blink effects on the other side of the table first** — anything that undoes
your tap-down. After that, the creature that most threatens to attack you, since a tapped-out board
means you are the only one who can profitably attack.

## How the game actually ends

**The kill is not a card — it is the mass-tap button.** Small creatures don't matter when nothing
can block. Realistic turn-8 board:

| | Power |
|---|---:|
| 7 creatures, base | ~22 |
| Greyfax's `+1/+0` to the other six | **+6 → 28** |
| With Elesh Norn instead (+2/+2 × 6) | **+12 → 34** |

**~28 unblockable damage per swing.** So the question is never "are my creatures big enough" — it
is "is the defender's board tapped." Point every tapper at *the player you are attacking*, not
across the table.

Three independent axes, so no single answer shuts you off:

**Axis 1 — Alpha strike (primary).** Blustersquall overloaded (`{3}{U}`, taps *every* creature you
don't control) · Subjugator Angel and Tempest Caller (mass-tap on a body) · Opposition · Elesh Norn
(−2/−2 *deletes* chump blockers) · Elspeth's `0` (whole team gains flying — connects even when the
tap engine is disrupted) · Rogue's Passage.

**Axis 2 — Non-combat drain.** Debt to the Deathless and Exsanguinate. **This is the archenemy's
axis:** you never attack, so you never open yourself up, and it is invisible in hand until it
resolves. It also cashes in the Treasures if Revel is answered before it reaches ten.

**Axis 3 — Alt-win.** Revel in Riches, accelerated by Academy Manufactor (every Investigate becomes
Clue + Food + **Treasure**).

Supporting notes on the pieces:

1. **Elesh Norn is the linchpin, not a bonus.** +2/+2 turns the twelve utility 1/1s into 3/3s
   (≈ +16 power on an eight-creature board) *and* −2/−2 simultaneously wipes every x/2 they
   control. She is the single card that converts the lock into a kill — treat her as a combo
   piece, not a fatty, and protect her accordingly.
2. **Hylda's 4/4 Elementals** — the only *scaling* threat in the list. Under Unwinding Clock you
   can make several per round. If Hylda is online, take the token mode over scry-2-draw unless you
   are genuinely starved.
3. **Revel in Riches.** Read it as a **Treasure engine first, alt-win second** — see the caveat
   below.
4. **Cyclonic Rift overloaded → alpha strike.** The classic control finish, and the reason not to
   spend the Rift as removal early.

### Revel in Riches is a lightning rod — value it by its floor

It says "you win the game", so it announces itself: expect it to eat the table's next removal or
counterspell. **That is fine, because its floor is good on its own** — the deck runs eleven
effects that kill opponents' creatures, so the Treasure half is real ramp the moment it lands,
and every Treasure entering also triggers Junk Winder (→ a tap → Hylda / Verity Circle).
Smothering Tithe's Treasures count toward the same ten.

Protecting it, if you choose to: **Clever Concealment** (phases out any number of your nonland
permanents — works on enchantments) and **Counterspell**. Note **Flawless Maneuver does NOT protect
it** — indestructible applies to creatures only. (Swan Song was cut: it hands an opponent a 2/2
flier, which is backwards for a pillowfort deck the table wants dead.)

Corollary: because Revel telegraphs, do not treat it as *the* plan. The deck still wants at least
one **hidden** finisher — something that lives in hand and cannot be pre-emptively answered.

### Sequencing the kill

Rogue's Passage pushes the last damage through a stalled board. Hold Cyclonic Rift for the turn it
ends the game rather than using it as a reset, and lead with Elesh Norn only when you can protect
her or immediately attack.

## Surviving as the archenemy

This deck *will* draw hate — it taps boards, kills a creature a turn, and shows a card that says
"you win the game" while dealing zero damage. Manage it deliberately.

**Your tappers are your pillowfort.** Unwinding Clock untaps your artifacts during **each
opponent's** untap step, so on every opponent's turn you have Icy Manipulator, Hylda's Crown and
Staff of Domination available to tap would-be attackers **before declare attackers**. Opposition,
fuelled by your vigilant creatures, does the same at instant speed.

**Ghostly Prison + Propaganda together tax a three-creature swing at `{12}`.** No Mercy covers the
gap they leave: the single big attacker who pays the tax anyway.

**But none of the three protects planeswalkers.** Prison and Propaganda read "creatures can't
attack **you**". Elspeth and Kaito are attackable for free — deploy them when you can afford to
lose them, or when they immediately do something. (Norn's Annex is the version that covers
planeswalkers; see decisions.md for why it wasn't chosen.)

**Farm value without making enemies.** Greyfax targeting an **already-tapped** creature still
resolves and still Investigates (CR 701.26a + 608.2c). When you don't need the tap, take the free
Clue and touch nobody's board. Most of the hate this deck generates is optional — tap the player
who is actually threatening you, not everyone, every turn.

**Threat-assess honestly at the table.** When someone else is further ahead, say so and point the
tap engine at them. You are the deck that can decide who wins; that is worth more as leverage than
as a grievance.
