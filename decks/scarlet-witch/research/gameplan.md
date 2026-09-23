# Scarlet Witch — Pilot's Gameplan

How to actually play the deck, turn by turn and board state by board state.
Written for the locked 100 in `DECK.md`. Companion math sheet: `formulas.md`.

---

## 0. The one-paragraph version

You are **not** a creature deck and you are **not** a storm deck. You are a **cost-reduction
engine that fires one enormous spell.** Wanda makes every instant and sorcery of mana value 4+
cheaper by her power, so your whole game is: survive, grow her power, generate a pile of red mana
in a single turn, then convert that mana into damage with an X-spell. Every card in the deck is
there to do one of four jobs — **make mana, draw cards, grow Wanda, or be the payoff.** If a play
doesn't advance one of those four, don't make it.

> **The mental reframe:** stop asking "what can I cast?" Ask "**how much does everything cost
> right now, and how much mana can I make this turn?**" The gap between those two numbers is your
> whole deck.

---

## 1. The 60-second cheat sheet

```
START OF TURN
  → say the DISCOUNT out loud: "Wanda X + Ruby 1 + Longshot 1 = N off generic"
  → did I draw Reforge the Soul first? MIRACLE it for {1}{R}
  → The One Ring: tap to draw (remember the burden counters)

PRECOMBAT MAIN
  1. Wanda first if she isn't out — nothing matters more
  2. Per-spell mana engines (Electro / Birgi / Urabrask / Storm-Kiln)
  3. Livaan / pump — TARGET WANDA
  4. Card draw
  5. Rituals last
  6. If Neheb is out: deal damage NOW (Fiery Confluence, pingers)

COMBAT
  → usually don't attack; just pass through to reach postcombat

POSTCOMBAT MAIN
  → Neheb trigger: {R} per 1 life opponents lost this turn (EMPTIES at end of phase)
  → THE X-SPELL GOES HERE
  → (mana − 2 red pips + total reduction) ÷ 3 = X
  → 5X is the damage. 40 = a kill from full. Solphim halves the X you need.

HOLD FOREVER
  → Deflecting Swat (free with commander)
  → Mithril Coat (flash — for the wrath)
  → Runechanter's Pike: equip Wanda on a quiet turn — +1 discount per instant/sorcery in the yard, permanently
  → Mana Geyser (until they're tapped out)

NEVER
  → free-cast an X-spell (X = 0)
  → cast Crackle "big but not lethal"
  → wheel a good hand
```

---

## 2. The one formula that governs everything

**Every instant or sorcery you cast at mana value 4 or greater costs:**

```
printed cost − Wanda's power − 1 (Ruby Medallion) − 1 (Longshot) ... generic only
```

Reductions **only eat generic mana.** The coloured pips ({R}{R} on Crackle, {R}{R}{R} on Apex)
are untouchable. Everything under mana value 4 gets **no discount from Wanda at all** — Ruby
Medallion and Longshot still apply.

**Say the number out loud before every big spell.** In your playtest you forgot Wanda's own {3}
and cast Crackle at X=7 instead of X=9. That's 10 damage per target, thrown away.

---

## 3. What actually kills people, ranked

**A. The X-spell (your primary win con).** One spell, whole table.

| Card | What it does | The number that matters |
|---|---|---|
| **Crackle with Power** | 5×X damage to each of up to X targets | **X=8 is 40** — a kill from full |
| **Jaya's / Comet Storm** *(sideboard)* | X to three / X+kicks targets | backup Crackles |
| **Chandra's Ignition** | Wanda's power to each other creature **and each opponent** | needs Wanda pumped; also a one-sided-ish wipe |
| **Apex of Power** | exile 7 and **cast them by paying**, + 10 mana of one colour | a *mana engine*, not a free-cast — see the Apex rule in §6 |

**B. Per-spell chip damage.** These turn a long turn into a kill without a payoff card:

| Card | Trigger | Damage |
|---|---|---|
| **Thor, God of Thunder** | each noncreature spell you **cast** | equal to that spell's **mana value** — 4 to 11 a pop |
| **Longshot, Rebel Bowman** | each noncreature spell you **cast** | 2 to **each** opponent, *and* {1} off everything |
| **Fiery Inscription** | each instant/sorcery you cast | 2 to **each** opponent |

**C. The multiplier.** **Solphim** doubles all noncombat damage you aim at opponents and their
permanents. It halves the X you need. Nothing else in the deck is a multiplier — one is enough.

**D. Commander damage (backup only).** Blackblade Reforged plus Rogue's Passage. Take this line
only when the X-spell plan is dead.

---

## 4. The three numbers you track

Everything else is noise. Track these:

### Number 1 — **WANDA'S POWER** (the discount)

Base 2. It goes up from:

- **Livaan** — +X/+0 where X is the mana value of the noncreature spell you just cast. **Always
  point it at Wanda.** Cast a 5-drop, she's +5 for the turn.
- **Cait Sith** — +X/+0 each combat, X = the exiled card's mana value.
- **Runechanter's Pike** — +X/+0 where X = instants and sorceries in your graveyard; equip {2}. Permanent — ~+6 to +12 by turn 7 — but Past in Flames / Will / Mizzix's / Bombardment exile the yard and shrink it.
- **Monstrous Rage** — +3/+1 and a **permanent** +1/+1 Role.
- **Blackblade Reforged** — +1/+1 per land. Equip is **{3}** because she's legendary, not {7}.
- **Forge of Heroes** / **Tyrite Sanctum** — permanent +1/+1 counters.

**Permanent pumps compound.** A Forge counter is a mana saved on every X-spell for the rest of
the game. One-turn pumps only matter on the turn you go off.

### Number 2 — **RED MANA AVAILABLE THIS TURN**

Lands + rocks + rituals + per-spell engines. The per-spell engines are the ones people undercount:

- **Electro, Assaulting Battery** — {R} per instant/sorcery, **and you keep all unspent red mana
  across steps and phases**
- **Birgi** — {R} per *spell* (creatures and artifacts too), kept until end of turn
- **Urabrask** — {R} per instant/sorcery, plus 1 damage
- **The Vision and Scarlet Witch** — {R} per spell, and it grows itself
- **Storm-Kiln Artist** — a Treasure per instant/sorcery cast **or copied**
- **Neheb** — {R} per 1 life your opponents lost this turn, at your **postcombat** main

### Number 3 — **CARDS LEFT IN HAND**

You run out of cards long before you run out of mana. That's what Wiccan, The One Ring, Hex Magic,
Big Score, Commune with Lava and the wheels are for. If you're at 15 mana and 1 card, you have a
card problem, not a mana problem.

---

## 5. Turn-by-turn: the opening

### T1–T3 — do nothing flashy

Land, Sol Ring, Arcane Signet, Mind Stone, Ruby Medallion. **Cast Wanda around turn 3.** She's a
2/3 that does nothing visible, which is exactly what you want — nobody removes her early because
she looks harmless. Every turn she's out is a turn your spells are 2 cheaper.

**Do not** cast a ritual on turn 2 just because you can. Rituals are for the turn you go off.

### T4–T5 — build the discount, find cards

Priorities in order: a **per-spell mana engine** (Electro, Birgi, Urabrask) > **Wiccan / The One
Ring** for cards > a **pump** on Wanda > a payoff you're holding.

This is also when you cast **Fiery Inscription** or **Longshot** — they're cheap, they accumulate,
and they make the eventual turn lethal instead of merely large.

### The chain — read this before the turn-by-turn below

**Added 2026-09-08, and it overrides the "wait for turn 6, 12+ mana" advice further down.**
With **Livaan** on the battlefield, every X-spell costs only its **coloured pips** and roughly
**doubles Wanda's power before it resolves** — X counts toward mana value while the spell is on
the stack (CR 202.3e), and Livaan's trigger reads that mana value.

```
X  = (Wanda's power + other reducers) / generic-per-X    (Crackle 3, everything else 1)
Wanda' = Wanda + the spell's mana value
```

**The line, from five Mountains on turn 5:** Storm King's Thunder at **X=2** for {R}{R}{R} → Wanda
is 7 → Jaya's Immolating Inferno at **X=7** for {R}{R}, copied twice → **21 to each opponent.**

| Wanda before | Jaya's X | copies | to each opponent |
|---|---|---|---|
| 2 | 7 | 2 | 21 |
| 4 | 11 | 4 | 55 |
| 6 | 15 | 6 | 105 |
| 8 | 19 | 8 | 171 |

The first column is why a **Bonesplitter matters more than a Sol Ring** on this axis: a seed on
Wanda before the first X-spell is multiplied by every link after it. Count **red sources**, not
total mana — Sol Ring, Ancient Tomb, Rogue's Passage, Forge of Heroes and Tyrite Sanctum pay for
equips and Livaan, and contribute nothing to the chain itself.

Full workings, the equipment pool and the version of the deck built around this:
`research/turn-5-chain-2026-09-08.md` and `DECK-V3.md`.

### T6+ — look for the turn

You want, all at once: **12+ mana available, 3+ cards in hand, a payoff, and one protection spell
up.** See §8. **That is the threshold for the grind plan.** If Livaan is out, the chain above needs
far less — five red pips and two X-spells — so check it first every turn from turn 5.

### Mulligans

**Keep** any hand with 3+ lands and either a rock or Wanda-plus-a-cheap-engine.
**Ship** hands with 5+ lands and no engine, or 2 lands and no rock — this deck's curve genuinely
needs 4–5 lands and you can't operate on 2.
**Never keep** a hand whose only action is a 7-drop. You will die holding it.

---

## 6. The HOLD list — "don't cast this yet"

This is the section that separates a good pilot from a bad one. Every card below is a trap if
cast on curve.

| Card | **HOLD unless…** | Why |
|---|---|---|
| **Mana Geyser** | your opponents are **tapped out** | It counts *their* tapped lands. Cast it in your main phase after a big turn cycle, not on an empty board. It's often 0–3 mana on turn 4 and 12+ on turn 8. |
| **Rousing Refrain** *(sideboard)* | opponents are holding cards | Scales off *their* hand size. Dead against a table that's dumped its grip. |
| **Wheel of Fortune / Reforge the Soul** | your hand is **2 cards or fewer** — or the table is holding sculpted hands you want gone | You're refilling *yourself*. Wheeling with 5 good cards hands three opponents a fresh 7 and gains you nothing. |
| **Reforge the Soul** | *(exception)* you draw it as your first card of the turn | **Miracle {1}{R}** — cast it immediately for two mana. Watch for this every draw step. |
| **Deflecting Swat** | someone targets you or Wanda | It's **free** with your commander out. There is no reason to ever cast it proactively. Hold it every single turn. |
| **Mithril Coat** | a wrath or a removal spell is on the stack | It has **flash**. Casting it on your own turn wastes its entire point. |
| **Bolt Bend** | Wanda has **4+ power** | It costs {3} less with a 4-power creature — so {R} instead of {3}{R}. Pump first, then it's nearly free. |
| **Chandra's Ignition** | Wanda's power is **6 or more** | At base 2 power it deals 2. It's a finisher, not a removal spell. Pump, *then* Ignite. |
| **Blackblade Reforged** | you have 5 spare mana and a plan | {2} to cast plus {3} to equip is a whole turn that deals no damage. Deploy it on a turn you weren't going to go off anyway. |
| **Disrupt Decorum** | you're about to be attacked, or you're the archenemy | Goad lasts **until your next turn**, so cast it in *your* main phase to cover the whole cycle back to you. |
| **Past in Flames** | your graveyard has 3+ spells worth recasting | It's a payoff, not a cantrip. Casting it with an empty yard is a wasted card. |
| **Improvisation Capstone** | you're going to have main phases left to use the Paradigm copies | The free copy each first main phase is most of the card's value. |
| **Apex of Power** | you have mana left *after* casting it to deploy what it finds | It exiles 7 and **anything you don't cast that turn is gone forever**. It is NOT a free-cast — you pay normally, which is why it gives you ten mana. Cast it **early** in the turn, never last, and cast the cards you'd most hate to lose first. Crackle exiled this way **is** castable at a real X — pay for it. Commune with Lava and Ignite the Future are safer (until end of your *next* turn). |
| **The One Ring** | you need the protection turn, or you need cards | *"Protection from everything until your next turn"* is a **fog for the whole table's attacks.** Sometimes the right play is casting it purely to not die. |
| **Vandalblast** | you can overload it ({4}{R}) profitably | Single-target for {R} is fine in a pinch, but overloading is a blowout. Don't fire it at a Sol Ring. |
| **Ancient Tomb** | you actually need the second mana | It deals you 2 every activation. At 40 life that's fine; at 12 it's a real cost. Tap Mountains first when the extra mana doesn't change what you cast. |

### And the mirror image — the **CAST IT NOW** list

- **Wanda herself.** Every turn she isn't out is a turn everything costs 2 more.
- **Ruby Medallion, Longshot, Fiery Inscription.** Cheap, permanent, compounding.
- **Livaan.** It's 3 mana and it turns every subsequent spell into a discount.
- **Runechanter's Pike** — {2} (free after Longshot + Artist's Talent); equip Wanda on a quiet turn. It only gets bigger.
- **Reforge the Soul off the top** — miracle for {1}{R}.

---

## 7. The X-spell rules you must not forget

Three categories, and they behave completely differently:

**✅ Paying a real cost → X works.** Hard-casting. Flashback and escape where the cost equals the
mana cost — **Past in Flames**, **Will of the Jeskai**, **Underworld Breach** (B4). Wanda still
discounts these.

**✅ Copying a spell on the stack → X carries over, free.** **Pyromancer's Goggles**,
**Increasing Vengeance**, **Repeated Reverberation**, **Return the Favor**, **Storm King's
Thunder**. The copy keeps your X and can **re-use the same targets** — the "no duplicate targets"
rule is per spell, and a copy is a separate spell.

**How the stack looks, and what survives a counterspell.** Your copiers come in two kinds, and a
counter hits them differently.

*Cast after the spell, aimed at it* — **Reiterate**, **Increasing Vengeance**, **Return the Favor**:

```
cast S, then the copier       S, Reiterate              (Reiterate on top)
Reiterate resolves            S, copy                   (copy on top, resolves first)
```

- Copier countered → no copy, S is fine. A countered Reiterate does **not** come back with buyback.
- **S countered while the copier waits → the copier has no target and does nothing.** No copy, and
  no buyback either, because Reiterate never resolved.

*Set up before the spell, or triggered by its mana* — **Storm King's Thunder**, **Repeated
Reverberation**, **Pyromancer's Goggles**, **Twinferno**:

```
Storm King's Thunder resolves (sets up the trigger)
cast S                        S, trigger                (trigger on top)
trigger resolves              S, copy, copy, ...        (copies on top, resolve first)
```

- **S countered before the trigger resolves → you still get every copy.** The trigger doesn't
  target S, so it copies S from memory (official ruling on all three cards).
- Only two things stop it: countering **Storm King's Thunder itself** before it resolves (then no
  trigger exists), or a Stifle-style effect on the trigger. Goggles' tap is a mana ability, so it
  can't be responded to at all.

**So against counterspells the trigger family is the safe one** — a counter aimed at your payoff
still leaves you the copies. The moment to protect is Storm King's Thunder sitting on the stack.

Either way, once a copy exists it is its own spell: it can be countered on its own, countering the
original doesn't touch it, and it is **not cast**. Hexing Squelcher's *"spells you control can't be
countered"* does protect copies. Spider-Punk's *"spells and abilities can't be countered"* also
protects the copy trigger from being Stifled.

**❌ Free-casting → X = 0, deals nothing.** **Improvisation Capstone**,
**Mizzix's Mastery**, **Electrodominance**, **Arcane Bombardment**. If Apex exiles Crackle with
Power, **do not cast it** — put it in hand if the effect allows, or cast something else.

> **The one-liner: if you're paying a cost, X works. If you're paying nothing, X is zero.**

---

## 8. The go-off checklist — do I start this turn?

Before you cast the first ritual, confirm **all five**. If any is missing, don't start — you'll
dump your hand and die holding an empty board.

1. **Mana.** Count lands + rocks + rituals + engine output. Write the number down.
2. **Cards.** 3+ in hand, or a draw spell you can cast first (Wiccan out counts double).
3. **The payoff.** Crackle / Ignition / Thor in play / a copy effect on a payoff. Naming which one.
4. **The number.** Do the division: `(mana − 2 red pips) ÷ 3 = your X`. Is 5X enough?
5. **The window.** One protection spell up — Deflecting Swat (free), Mithril Coat, or Bolt Bend —
   or the knowledge that nobody at the table is holding interaction.

**If you can kill exactly one player, that's often still correct** — but kill the one who's
closest to winning, not the one who's most annoying.

---

## 9. Sequencing — order of operations within your turn

The order matters more in this deck than almost any other. The default:

```
1. PRECOMBAT MAIN
   a. Cast Wanda if she isn't out. Nothing else matters more.
   b. Deploy per-spell mana engines FIRST (Electro / Birgi / Urabrask / Storm-Kiln).
      Every spell after this point makes mana.
   c. Deploy pump (Livaan) BEFORE the expensive spells, so they grow her on the way.
   d. Cheap card draw (Big Score, Wiccan already out) to see more of the deck.
   e. Rituals LAST — they're mana you can't hold, so spend them into the payoff.
   f. If Neheb is out: deal your damage HERE (Fiery Confluence, pinger triggers).

2. COMBAT
   Usually you don't attack. Go to combat anyway — the phase happens regardless
   and you need to reach your postcombat main.

3. POSTCOMBAT MAIN
   g. Neheb triggers: {R} for each 1 life your opponents lost this turn.
   h. THIS is where the X-spell goes. Count your reducers, do the division, cast it.
```

### Ashling's discard — hold your instants, don't feed her your hand

Ashling's magecraft is *"discard a card, then draw a card"* and it is **mandatory**. Play it wrong
and she eats the spell you were about to cast.

**The wrong line.** Hand is two instants. Cast the first, let the trigger resolve — your hand is not
empty, so you must discard, and your only card is the second spell. It goes to the graveyard and
never resolves.

**The right line.** Cast the first spell, and while its trigger is on the stack **cast the second
one too** (you never lost priority — you don't need to "hold" it in any rules sense). Now:

```
TOP     2nd spell's trigger   -> hand empty: discard NOTHING, draw a card
        2nd spell
        1st spell's trigger   -> hand has that fresh card: discard IT, draw again
BOTTOM  1st spell
```

**You cannot reach zero discards** — the first trigger to resolve draws you the card the next one
eats. But you have swapped "discard a real spell" for "discard an unknown draw", which is strictly
better. General rule: **hold N instants, draw N, discard N−1**, and none of your N spells is lost.

Three riders that matter at the table:

- **Every resolution starts a new round of priority** (CR 117.3b, 117.4). On your turn you act
  first after each one, so the "cast it or lose it" decision comes up once per trigger, not once
  per turn. Opponents get the same window after every resolution too — they can let one copy
  resolve and counter the next.
- **Storm King's Thunder trap:** it is itself an instant, so casting it triggers Ashling, and that
  trigger sits above it. If that trigger draws you an instant and you cast it while the Thunder is
  still on the stack, **it is not copied** — the copy trigger only exists once the Thunder has
  resolved. Let the Thunder resolve, then cast the spell you want copied. And if you are holding
  two instants to dodge Ashling's discards, the Thunder copies whichever you cast **first**, so
  cast the payoff first.
- **Casting the card you just drew is free** — it does not increase
  your total discards. Each pending trigger below eats exactly one card either way; casting simply
  changes *which* card gets pitched, and you get the spell's effect for nothing. So if the draw is
  an instant you can afford and want, cast it.
  What you cannot rescue: a **land** (playing one needs an empty stack), a **sorcery**, or anything
  you can't pay for. Those get eaten by the next trigger.
  **And a discard here is softer than it looks** — an instant or sorcery in the graveyard is fuel
  for Past in Flames, Will of the Jeskai, Underworld Breach and Arcane Bombardment, and it grows
  Runechanter's Pike. A discarded X-spell can be flashed back at a **real X**. Pitching a land is
  the only true loss, and if you hold more than one card **you** choose which to discard.
- **Sorceries can't do this** (they need an empty stack), so two sorceries in hand means one dies.
  But you *can* cast a sorcery and then respond to its own magecraft trigger with an instant — that
  saves the instant exactly the same way.
- **The held line reverses resolution order** — the second spell resolves *first*. That breaks any
  line where the first spell needs to resolve for the second to work, and it is why **you cannot
  hold a ritual under a big spell**: you have to pay costs as you cast, and the ritual has not
  resolved yet, so its mana is not there. Rituals resolve before you cast the thing they pay for.

**Empty hand is fine, not a waste.** With no cards the discard is simply skipped, you **still draw**,
and the resolution **still counts** toward the 2nd (2 damage to each opponent and each of their
creatures) and the 3rd ({R}{R}{R}{R}). An empty hand turns her into a straight +1 card.

**Count your library on a big turn.** She triggers on *cast **or copy***, so a Storm King's Thunder
turn at X=8 is **ten** resolutions — the Thunder's own cast, the copied spell's cast, and eight
copies — which is **ten draws**. If you deck yourself the ability still finishes resolving (damage
and mana happen), and you lose at the next state-based check. If that damage kills your last
opponent simultaneously, the game is a **draw**, not a win.

### Why Neheb rewrites the turn

Neheb gives red mana at the **beginning of your postcombat main phase**, equal to total life your
opponents lost that turn. So the shape is: **burn precombat, collect postcombat, kill postcombat.**

That mana **empties at end of phase** — you cannot hold it into your end step or anyone's turn.
Use it or lose it.

### Two Goggles reminders

- Tap **Pyromancer's Goggles** and spend *that specific* {R} on the spell, or no copy.
- Goggles produces one {R} per turn, so **one copy per turn cycle** — unlike the copy *spells*,
  which stack freely.

---

## 10. Scenario library

### 🎯 Scenario 1 — Turn 6, 14 mana available, Crackle in hand, Wanda at 2

Reducers: Wanda 2, Ruby Medallion 1. That's **{3} off generic.**

`14 mana − 2 (red pips) = 12 generic. 12 + 3 reduction = 15 generic budget. 15 ÷ 3 = X=5.`

X=5 is **25 damage to each of up to 5 targets** — 75 across the table. Not a kill from 40, but
it puts everyone in one-shot range and you've spent one card.

**Better line: don't cast it.** Spend the turn on Livaan + a mana engine + a draw spell, and cast
Crackle next turn at X=8 for the actual kill. **Crackle is at its worst as a "big but not lethal"
spell** — it announces you as the threat and gets you killed before your next turn.

### 💥 Scenario 2 — Your playtest board (the real one)

Wanda at 3, Ruby Medallion, Longshot, Goggles, Neheb, 24 mana in your postcombat main.

Reducers: **3 + 1 + 1 = {5} off.**

`24 − 2 red pips = 22 generic. 22 + 5 = 27 budget. 27 ÷ 3 = X=9.`

**X=9 is 45 damage to each of up to 9 targets.** You cast X=7 for 35. The habit that fixes it:
say "Longshot one, Ruby one, Wanda three — five off" out loud before you lock X.

### 🪄 Scenario 3 — You have Goggles and a modest Crackle

Goggles copies the spell and the copy **keeps X and can re-use targets.** So X=2 with Goggles is
10 + 10 to the *same* two players — **20 each** — for about 4 mana after reducers.

This is your best *early* Crackle. Two players at 20 is a completely different game than three
players at 40, and it costs almost nothing.

**With Solphim out, that same line is 40 to each of two players — two people dead for four mana.**

### 🛡️ Scenario 4 — A wrath is on the stack

Hexproof (Champion's Helm) and protection (Commander's Plate) **both do nothing** — a wrath
neither targets nor deals damage.

**Your answers, in order:** flash in **Mithril Coat** (this is the entire reason it's in the deck)
→ **Tyrite Sanctum**'s indestructible counter if you set it up → accept it and rebuild.

If Wanda dies, she's cheap to recast (the tax climbs by 2 each time) and **you should recast her
immediately** — the discount is worth more than any other 3-drop.

### ⚔️ Scenario 5 — You're about to be attacked by a big board

**Disrupt Decorum.** Goad everything you don't control; they must attack, and must attack someone
other than you. It buys the exact turn you need. Cast it in *your* main phase — goad runs until
your next turn, so it covers the whole cycle.

Second option: **The One Ring** for protection from everything until your next turn. That's a fog
for the entire table and it draws you cards afterwards.

Third: **Volcanic Vision** returning a big spell — damage equal to its mana value to each creature
*your opponents control*, one-sided, and it doesn't kill your engines.

**If Kazuul is already down, you may not need any of them.** Every attacking creature costs its
controller {3} or hands you a 3/3 Ogre, and the trigger resolves during **declare attackers** — so
the Ogres exist before blockers are declared and can block that same combat. Against three
attackers that's either {9} out of their turn or three 3/3 blockers. Two things to remember:

- **It's a tax, not a prevention.** They can pay. A deck with mana open will just pay and swing.
- **Your own Chandra's Ignition kills Kazuul** once Wanda's power is 4 or more, and a 3-power
  Ignition kills the Ogres. If you're holding Ignition as your kill, the Ogres are for *surviving
  to* that turn, not for blocking on it. Fiery Confluence at 3 does **not** kill Kazuul (5/4), but
  it does kill every Ogre.

### 🧊 Scenario 6 — Wanda has been killed twice and the tax is {6}

Don't chase her. At {2}{R} + {4} tax she's a 7-mana 2/3.

**Play the deck without the discount for a turn.** Your cheap spells still work — Fiery Confluence
is {2}{R}{R}, Big Score is {3}{R}, Longshot and Thor still ping. Recast her when it's convenient,
or when you're going off anyway and the {3} discount pays for the tax within the same turn.

### 🎲 Scenario 7 — You resolve Apex of Power and see Crackle with Power in the exile

**Do not cast it.** Free-casting forces X=0. Cast the other six cards, and if Apex's wording gives
you the choice, take Crackle to hand instead. The 10 mana Apex adds is what makes *next* turn's
hard-cast Crackle enormous.

### 🔁 Scenario 8 — Will of the Jeskai, with or without a big graveyard

Will of the Jeskai gives everything in your yard **flashback equal to its mana cost** — which for
an X-spell **includes X**, so you get to choose a real X, and Wanda still discounts that cost.

**The line everyone misses: the wheel FEEDS the flashback.** With your commander out you take both
modes, and modes resolve in **printed order** (CR 608.2c), so the discard happens *first*. The set
of cards that gains flashback is fixed when that second effect **begins** (CR 611.2c), by which
point everything you just pitched is already in the graveyard. **So every instant and sorcery you
discard to the wheel comes back with flashback** — you are not throwing your hand away, you are
converting it into a graveyard you can cast from, *and* drawing five on top.

So you do **not** need a big graveyard for this card. A hand full of expensive spells you cannot
cast yet is the ideal setup: pitch them, draw five, then flash back whichever ones the mana now
supports. Held X-spells survive this — a discarded Crackle with Power or Jaya's Immolating Inferno
flashes back at a **real X**.

The older line still works when your hand is empty: cast an X-spell, let it hit the yard, *then*
Will of the Jeskai and flash it back bigger. Two X-spells out of one card.

**What does NOT come back:** the five cards you just drew. They are in hand when the effect begins,
and the set never grows afterwards (CR 611.2c) — discard one later this turn and it has no
flashback. Cards exiled and returned are new objects and lose the grant too.

**Costs to say out loud before you cast it:**

- It reads *"each player"*. Every opponent may wheel as well, and an opponent with **zero** cards
  may still "discard" nothing and draw five. That is the real price in multiplayer.
- Mode 2 says *"**your** graveyard"* — their discards gain them nothing.
- Declining the discard means no draw; it is one package, chosen during resolution, by each player
  in APNAP order with you first (CR 608.2d–f).
- Nobody can respond between the two modes — no player gets priority during resolution
  (CR 608.2g) — so your graveyard cannot be exiled in the gap.
- Flashback exiles the card as it resolves, and a flashed-back **sorcery** still needs sorcery
  timing. Do it in a main phase.

### 🧮 Scenario 9 — You're flooded: 20 mana, 1 card in hand

You have a **card** problem. Do not cast the ritual.

Priority: **The One Ring** (draws increasingly many) → **Hex Magic** (doubles your hand for a turn)
→ **Commune with Lava** for a big X → **War Room** → **Apex of Power** (see 7 cards *and* 10 mana — but you PAY for what you cast, and lose the rest).

Apex is the best flood-breaker in the deck precisely because it converts excess mana into cards.

### 🩸 Scenario 10 — Someone else is about to win

Your interaction is thin and mostly proactive. In rough order:

**Chaos Warp** the problem permanent (only unconditional answer) → **Untimely Malfunction** to
redirect their kill spell or blank an attack → **Deflecting Swat** (free!) to redirect the spell
that wins the game → **Vandalblast** overloaded if it's an artifact deck → **Disrupt Decorum** to
turn their board on each other.

**Do not** hold your X-spell hoping to race. If you can't kill the table, kill *them*.

### 🎯 Scenario 11 — Choosing targets for Crackle

Targets must all be **different** — you cannot double up on one player. And **damage per target is
fixed at 5X regardless of how many you choose**, so picking fewer doesn't concentrate it.

Order of preference: **players closest to winning** → **players in range of your chip damage next
turn** → **problem creatures** you can't otherwise remove. Remember that "any target" includes
planeswalkers and battles.

### ⏳ Scenario 12 — Turn 4, you drew Reforge the Soul as your first card

**Miracle it for {1}{R} immediately.** Everyone discards and draws seven. You're the one with a
mana engine and a 3-mana commander; a fresh seven cards is worth far more to you than to them.
**The other reason to wheel:** it's hand denial — the blue player's held counterspell and the
combo player's assembled hand go to the graveyard before your kill turn, and seven random cards
rarely include the exact answer again. Reforge at {R}{R} with Wanda out (MV 5) or Wheel of
Fortune at {R} the turn before you go off is the closest thing mono-red has to a discard spell.

### 🏹 Scenario 13 — Thor and Longshot are both out

Every noncreature spell you cast now deals **its mana value (Thor)** plus **2 to each opponent
(Longshot)**. A five-spell turn averaging mana value 5 is 25 damage focused plus 30 spread —
before any payoff.

**This is when you don't need Crackle at all.** Chain cheap spells and let the triggers kill.
Also note: **Goggles copies do NOT trigger these** — a copy isn't cast.

### 🔥 Scenario 14 — Solphim is on the battlefield

Halve every damage number you were planning. X=4 Crackle becomes 40 to each of four. Fiery
Confluence becomes 12 to each opponent for two mana. Chandra's Ignition on a 6-power Wanda becomes
12 to each opponent *and* 12 to every other creature.

**With Solphim out, look for the kill a full turn earlier than you otherwise would.**

### 🌋 Scenario 15 — You have Valakut, the Molten Pinnacle and 5+ other Mountains

Every Mountain you play from here deals **3 damage to any target**. That's a free 3 a turn, it
feeds Neheb, and it closes games you thought were out of reach. Count it before deciding you can't
get there — and if you're holding two Mountains, that's 6.

---

## 11. Threat assessment — who do you point at?

You get **one** big turn. Spend it on the right person.

1. **Whoever is closest to winning**, even if they're at high life. You're the only one who can hit
   all three at once; use that on the person a normal deck can't answer.
2. **Whoever is holding up blue mana**, if you're forced to choose. Your combo turn dies to one
   counterspell and you only have Hexing Squelcher for that.
3. **Whoever has been attacking you.** Practical, not emotional — dead attackers stop the clock.
4. **Never** spend a whole turn killing the weakest player. You're not going to get a second one.

---

## 12. The checklist people forget

Before every big spell:

- ☐ **Wanda's power** — did you count it? (This is the one you missed.)
- ☐ **Ruby Medallion** {1} · **Longshot** {1}
- ☐ Is the spell **mana value 4+**? If not, Wanda does nothing.
- ☐ Is it an **X-spell being free-cast**? If so, X = 0 — don't.
- ☐ Did you **tap Goggles and spend that {R} on this spell**?
- ☐ **Livaan** — target Wanda, not something else.
- ☐ **Thor / Longshot / Fiery Inscription** — did you resolve their triggers on *every* spell?
- ☐ **Storm-Kiln Artist** makes a Treasure on cast **and on copy**.
- ☐ **Ashling** — second resolution each turn is 2 damage to each opponent, third is {R}{R}{R}{R}.
- ☐ Neheb mana **empties at end of phase.**

---

## 13. Beginner mistakes to avoid

1. **Forgetting Wanda's own discount.** Costs you an entire X. Say the reducers out loud.
2. **Free-casting an X-spell.** Deals zero. The single worst blowout available to you.
3. **Casting Crackle "big but not lethal."** You become the archenemy and die before your next
   turn. Either kill someone or wait.
4. **Casting rituals on curve.** Rituals are turn-of-the-kill cards, not ramp.
5. **Wheeling a good hand.** You're refilling three opponents for free.
6. **Casting Deflecting Swat proactively.** It's free — hold it forever.
7. **Casting Mithril Coat on your own turn.** It has flash. Hold it.
8. **Chandra's Ignition at 2 power.** Deals 2. Pump first.
9. **Attacking with Wanda for no reason.** She's a 2/3 that runs your entire deck. Leave her home
   unless Blackblade + Rogue's Passage is the actual plan.
10. **Equipping Runechanter's Pike and then exiling your own graveyard.** Past in Flames, Will of the Jeskai, Mizzix's Mastery and Arcane Bombardment all shrink it — count what stays before you commit to the swing.
11. **Not counting Valakut triggers.** Three damage a Mountain adds up.
12. **Tapping Ancient Tomb when Mountains would do.** Two life a pop is real.

---

## 14. Playing the promoted list (V2, now `DECK.md`) — what changed at the table

This shape exists because of one report: *eight turns of nothing, then very strong.* It was
`DECK-V2.md` until 2026-09-08, when it was promoted to `DECK.md`; the retired V1 is in
`versions/2026-09-08-v1-retired.md`. The list moved three
slots into **spell → damage conversion** (Guttersnipe, Fated Firepower, Nico Minoru), one ritual-
shaped slot into burn (Boltwave), and the tenth win condition into a tutor (Gamble). Everything in
§§1–13 still applies; these are the overrides.

**The reframe:** you are no longer waiting for one enormous turn. With a converter out, every
spell you cast is damage — so **turns 4–7 are spell-casting turns, not setup turns.**

- **Converter before engine.** On turns 3–5 the priority order is now: Wanda → **Longshot /
  Fiery Inscription / Guttersnipe / Fated Firepower / Thor / Nico** → *then* Electro / Ashling /
  Urabrask → then draw. Two converters out turns a five-spell turn into 20–40 to each opponent
  without a payoff card. Gamble finds whichever piece you're missing — cast it on a **full hand**
  (1/N to bin the target; a binned instant/sorcery comes back via Past in Flames, Will, Thor's ETB
  or Volcanic Vision).
- **Rituals are deposits.** Once Electro or Ashling is out, cast and copy the rituals early and
  bank the red — you already do this; V2 just writes it down. Spend it on the turn the converters
  are down.
- **Fated Firepower goes in at the end of an opponent's turn** (flash). X = your spare mana minus 3
  plus your reducer count; with Ruby + Fire Crystal + Longshot + Artist's Talent L2 out, X=4 costs
  {R}{R}{R}. Every damage instance to an opponent or their permanents is then +X: Longshot 2+X,
  Inscription 2+X, Guttersnipe 2+X, Boltwave 3+X, Confluence 3×(2+X) each for {R}{R}.
- **Say the per-spell number out loud** the way you say the discount: "Longshot 2, Inscription 2,
  Guttersnipe 2, plus Firepower 4 each = 18 to each opponent per spell." Then count spells, not
  mana.
- **Nico Minoru** triggers on any cast from *not your hand*: Wiccan's exiles, impulse cards,
  flashbacks, Mizzix's / Bombardment copies, Thor's ETB. Her own ability ({2}{R},T, discard) free-
  casts off the top — **X = 0 on an X-spell** and you can't choose what it hits, so count the
  X-spells left in the library before you activate.
- **Confluence with pingers out:** take "2 to each opponent" three times (6 each, 3×(2+X) under
  Firepower). The creature mode is one of three *choices* — it only kills your board if you pick
  it. **Chandra's Ignition is not a choice**: every creature pinger dies on the Ignition turn, after
  its cast trigger resolved. Enchantment converters (Inscription, Firepower) survive.
- **Blackblade on Wanda by turn 5 when drawn.** +1/+1 per land you *control* — 6–10 in practice,
  not 33. Swing through Rogue's Passage when a player is within two hits (21 commander damage);
  the lost life also feeds Neheb postcombat. A one-player road, not a table kill — but it is the
  road that works on turn 6.
- **The X-spell is the closer, not the plan.** With three converters and Firepower out, a
  three-spell turn is lethal without it. Crackle is for the turn you have it and the mana.
- **Mulligans:** V1's rule plus one — a hand with a converter and Wanda is a keep on four lands;
  a hand of pure mana is now a ship, not a keep.
