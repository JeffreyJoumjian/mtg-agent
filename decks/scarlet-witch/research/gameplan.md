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
  → Blazing Shoal (until you have an uncastable fat red card)
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
- **Blazing Shoal** — free: exile a red card of mana value X from hand, +X/+0. Ceiling is +10.
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

### T6+ — look for the turn

You want, all at once: **12+ mana available, 3+ cards in hand, a payoff, and one protection spell
up.** See §8.

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
| **Blazing Shoal** | you have a red card of mana value 6+ in hand that you **can't cast this turn** | It's free, but it costs two cards. Pitching Apex of Power for +10 is great; pitching a 2-drop for +2 is a waste. **Never pitch a card you could actually cast this turn.** |
| **Mana Geyser** | your opponents are **tapped out** | It counts *their* tapped lands. Cast it in your main phase after a big turn cycle, not on an empty board. It's often 0–3 mana on turn 4 and 12+ on turn 8. |
| **Rousing Refrain** *(sideboard)* | opponents are holding cards | Scales off *their* hand size. Dead against a table that's dumped its grip. |
| **Wheel of Fortune / Reforge the Soul** | your hand is **2 cards or fewer** | You're refilling *yourself*. Wheeling with 5 good cards hands three opponents a fresh 7 and gains you nothing. |
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

### 🔁 Scenario 8 — Big graveyard, Will of the Jeskai in hand

Will of the Jeskai gives everything in your yard **flashback equal to its mana cost** — which for
an X-spell **includes X**, so you get to choose a real X.

Best line: cast the X-spell once, let it hit the yard, *then* Will of the Jeskai and flash it back
bigger with the mana you've accumulated. You get two X-spells out of one card.

**Also:** with your commander out, Will of the Jeskai takes **both** modes. Don't forget the wheel
half.

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
10. **Pitching a castable card to Blazing Shoal.** Only pitch what you can't cast.
11. **Not counting Valakut triggers.** Three damage a Mountain adds up.
12. **Tapping Ancient Tomb when Mountains would do.** Two life a pop is real.
