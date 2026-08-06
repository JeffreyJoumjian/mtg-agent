# Scarlet Witch — Cost & Damage Formulas

Companion to `gameplan.md`. Every card in the locked 100 that produces a number, written as a
formula you can evaluate at the table.

---

## 1. Symbols

| Symbol | Meaning |
|---|---|
| `W` | The Scarlet Witch's **power** (base 2) |
| `R` | Total generic cost **reduction** = `W` + 1 (Ruby Medallion) + 1 (Longshot) |
| `MV` | Mana value of the spell **as it sits on the stack** (X counts at its announced value) |
| `X` | The value you announce for an X-spell |
| `S` | Spells you've cast this turn |
| `L` | Lands you control |
| `P` | Opponents still alive — normally 3 |
| `Λ` | Total life your opponents have lost **this turn** (all of them combined) |
| `D` | Your devotion to red — red pips on permanents you control |

**×2 if Solphim is out** applies to every noncombat damage number aimed at an opponent or a
permanent an opponent controls. It does **not** double damage to you or your own creatures.

---

## 2. The master cost formula

```
Cost of an instant/sorcery = printed cost − R          (generic portion only)

R = W + 1 (Ruby Medallion) + 1 (Longshot)
```

**Wanda's share only applies at MV ≥ 4.** Ruby Medallion (red spells) and Longshot (noncreature
spells) apply at every mana value. Coloured pips can never be reduced.

| Board state | `R` (generic off) |
|---|---|
| Wanda alone, base power | **2** |
| Wanda + Ruby Medallion | **3** |
| Wanda + Ruby + Longshot | **4** |
| Wanda at 3 (one Forge counter) + Ruby + Longshot | **5** |
| Wanda at 6 (Livaan off a 4-drop) + Ruby + Longshot | **8** |

---

## 3. Crackle with Power — the master table

`{X}{X}{X}{R}{R}` → **5×X damage to each of up to X *different* targets.**

```
Mana needed = 3X + 2 − R
Max X you can afford = ⌊(available mana − 2 + R) ÷ 3⌋
Damage per target = 5X          (×2 with Solphim)
MV on the stack = 3X + 2
```

| X | Raw cost | R=3 | R=4 | R=5 | R=8 | Damage each | Targets |
|---|---|---|---|---|---|---|---|
| 2 | 8 | 5 | 4 | 3 | — | 10 | 2 |
| 3 | 11 | 8 | 7 | 6 | 3 | 15 | 3 |
| 4 | 14 | 11 | 10 | 9 | 6 | 20 | 4 |
| 5 | 17 | 14 | 13 | 12 | 9 | 25 | 5 |
| 6 | 20 | 17 | 16 | 15 | 12 | 30 | 6 |
| 7 | 23 | 20 | 19 | 18 | 15 | 35 | 7 |
| **8** | **26** | **23** | **22** | **21** | **18** | **40** ← kill from full | 8 |
| 9 | 29 | 26 | 25 | 24 | 21 | 45 | 9 |
| 10 | 32 | 29 | 28 | 27 | 24 | 50 | 10 |

**The two numbers to memorise:** every point of X costs **3 more generic**, and **X=8 is the kill**
(40 damage). With **Solphim**, X=4 is the kill instead — that's 9 mana at R=5.

### Targeting rules

- Targets must all be **different** (rule 601.2c). No doubling up on one player.
- Damage per target is **fixed at 5X** regardless of how many targets you pick. Choosing fewer
  does *not* concentrate it.
- To put 20 on one player you need **X=4** and simply choose one target.

---

## 4. The three X rules

| Situation | X | Cards |
|---|---|---|
| **Paying a real cost** — hard-cast, or flashback/escape where the cost = the mana cost | ✅ you choose | Past in Flames, Will of the Jeskai, Underworld Breach (B4) |
| **Copying a spell on the stack** — the copy inherits X **and** can re-use targets | ✅ free, same X | Pyromancer's Goggles, Increasing Vengeance, Repeated Reverberation, Return the Favor, Storm King's Thunder |
| **Cast "without paying its mana cost"** | ❌ **X = 0** | Improvisation Capstone, Mizzix's Mastery, Electrodominance, Arcane Bombardment, Hit the Mother Lode (SB), Dance with Calamity (B4), Finale of Promise (B4) |
| **"You may cast/play them" (you still PAY)** | ✅ you choose | **Apex of Power**, Jeska's Will, Commune with Lava, Ignite the Future (from hand) |

Rule 107.3b: X is forced to 0 only when you pay *neither the mana cost nor an alternative cost that
includes X*. Flashback and escape costs that equal the mana cost **include** X, so they're fine.
Rule 707.10: a copy inherits "modes, targets, **the value of X**, and additional or alternative
costs."

---

## 5. Mana engines — output per turn

| Card | Output | Notes |
|---|---|---|
| **Electro, Assaulting Battery** | `+1 {R} per instant/sorcery` | **Keeps ALL unspent red mana across steps and phases** — the best of the group |
| **Birgi** | `+1 {R} per spell` | *Any* spell, creatures included. Kept until end of turn. |
| **Urabrask** | `+1 {R} per instant/sorcery` | Plus 1 damage to an opponent |
| **The Vision and Scarlet Witch** | `+1 {R} per spell` | Also grows itself — a real clock |
| **Storm-Kiln Artist** | `+1 Treasure per instant/sorcery **cast or copied**` | The only engine that counts *copies* |
| **Ashling, Flame Dancer** | loot per spell; **2nd** resolution = 2 dmg to each opponent + their creatures; **3rd** = `{R}{R}{R}{R}` | Also keeps unspent red mana |
| **Neheb, the Eternal** | `+Λ {R}` at your **postcombat main** | Empties at end of that phase |
| **Nykthos** | `{2},{T}: add D red` | Devotion to red; a real board is `D` = 6–10 |
| **Mana Geyser** | `+1 {R} per tapped land opponents control` | 0 on an empty board, 12+ after a turn cycle |
| **Jeska's Will** | with commander: **both** — `{R}` per card in an opponent's hand **and** exile 3, play them this turn | |
| **Brass's Bounty** | `+L Treasures, untapped` | ~14 at 5 mana after reduction |
| **Rousing Refrain** *(SB)* | `{R}` per card in target opponent's hand, kept | |
| Rituals | Pyretic/Desperate `{R}{R}{R}` (net +1) · Seething Song `{R}{R}{R}{R}{R}` (net +2) | Cast on the kill turn only |

**Total per-spell yield** with Electro + Birgi + Urabrask + The Vision all out: **4 red mana per
instant/sorcery**, plus a Treasure from Storm-Kiln. At that point cheap spells are free and
expensive ones are nearly free.

---

## 6. Damage sources as formulas

| Card | Formula | Per opponent? |
|---|---|---|
| **Crackle with Power** | `5X` to each of up to `X` targets | choose |
| **Chandra's Ignition** | `W` to **each other creature** and **each opponent** | yes — and Wanda survives it |
| **Thor, God of Thunder** | `MV` of each noncreature spell you **cast**, to any target | one target, focusable |
| **Longshot, Rebel Bowman** | `2` per noncreature spell **cast** | yes, each opponent |
| **Fiery Inscription** | `2` per instant/sorcery | yes, each opponent |
| **Urabrask** | `1` per instant/sorcery | one opponent |
| **Ashling** (2nd resolution/turn) | `2` to each opponent **and each of their creatures** | yes |
| **Fiery Confluence** | 3 modes, repeatable: `1` to each creature / `2` to each opponent / destroy artifact | `6` to each opponent if all three |
| **Volcanic Vision** | `MV` of the returned card to **each creature opponents control** | one-sided sweeper |
| **Electrodominance** | `X` to any target + free-cast a spell of MV ≤ X | remember: that free cast forces X=0 |
| **Storm King's Thunder** | copies your next instant/sorcery `X` times | force multiplier, not damage |
| **Valakut, the Molten Pinnacle** | `3` per Mountain entering, needs 5+ other Mountains | any target |
| **Shatterskull Smashing** | `X` split among ≤2 creatures; **2X if X ≥ 6** | creatures only |
| **Apex of Power** | no damage — exile 7, **cast them by PAYING**, and add `+10` mana of one colour | the enabler; unplayed cards stay exiled |

**All of these double under Solphim** except damage to your own permanents.

---

## 7. Pump — growing `W`

| Card | Effect on `W` | Duration |
|---|---|---|
| **Livaan, Cultist of Tiamat** | `+MV` of each noncreature spell you cast | until end of turn, **stacks per spell** |
| **Cait Sith, Fortune Teller** | `+MV` of the exiled card, each combat | until end of turn |
| **Blazing Shoal** | `+X` where X = MV of a red card you exile from hand — **free** | until end of turn |
| **Monstrous Rage** | `+3/+1`, and the Role token is **+1/+1 permanently** | permanent residue |
| **Blackblade Reforged** | `+L/+L`; equip **{3}** (legendary), not {7} | permanent |
| **Champion's Helm** | `+2/+2` and hexproof; equip {1} | permanent |
| **Commander's Plate** | `+3/+3` and protection from W/U/B/G; equip {3} for commander | permanent |
| **Forge of Heroes** | `+1/+1` counter on a commander that entered this turn | permanent |
| **Tyrite Sanctum** | `{2},{T}`: God + a `+1/+1` counter; `{4},{T}`, sac: indestructible counter | permanent |

**Livaan is the engine.** Cast a mana value 5 spell and Wanda is +5 for the rest of the turn —
which is **{5} off every subsequent spell**, or **+1.67 to your X**. Cast three spells averaging
MV 5 and she's a 17/3 giving {17} off.

**Permanent pumps compound across games-long turns.** Every Forge/Tyrite/Role counter is a mana
saved on every X-spell forever.

---

## 8. Copy effects

| Card | Copies | Keeps X? | Cost |
|---|---|---|---|
| **Pyromancer's Goggles** | ×1, when its {R} pays for a red instant/sorcery | ✅ | free (one per turn) |
| **Increasing Vengeance** | ×1 from hand, **×2 from the graveyard** | ✅ | {R}{R} / flashback {3}{R}{R} |
| **Repeated Reverberation** | ×2 | ✅ | {2}{R}{R} |
| **Return the Favor** | ×1 (and/or redirect) | ✅ | {R}{R} + {1} per mode |
| **Storm King's Thunder** | ×X on your next instant/sorcery | ✅ | {X}{R}{R}{R} |

**Copies are not cast.** So they do **not** trigger Thor, Longshot, Fiery Inscription, Livaan,
Wiccan, Electro, Birgi or Urabrask. They **do** trigger **Storm-Kiln Artist** (which says "cast or
copy") and **Ashling** (same wording).

---

## 9. Recursion

| Card | What you get back | X-spells? |
|---|---|---|
| **Past in Flames** | flashback on every instant/sorcery in your yard, cost = mana cost | ✅ X works |
| **Will of the Jeskai** | same, **plus** a wheel if you control your commander (choose both) | ✅ X works |
| **Mizzix's Mastery** | exile one I/S from yard, cast a **free copy**; overload for all | ❌ X = 0 |
| **Improvisation Capstone** | free-cast off the top; **Paradigm** = a free copy each first main phase | ❌ X = 0 |
| **Arcane Bombardment** | exiles an I/S at random per turn, copies the whole pile free | ❌ X = 0 |
| **Underworld Breach** (B4) | escape = mana cost + exile 3 | ✅ X works |

---

## 10. How to count lethal

Three opponents at 40. You need **120 damage**, or 40 on the one who matters.

```
Total this turn =
    5X                              (Crackle, per target)
  + W                               (Chandra's Ignition, each opponent)
  + 2 × S                           (Longshot, each opponent)
  + 2 × S                           (Fiery Inscription, each opponent)
  + Σ MV                            (Thor, focused on one target)
  + 6                               (Fiery Confluence, each opponent)
  ─────────────────────────────
  × 2 if Solphim is out
```

**Three realistic kill lines:**

**A. The clean one.** Crackle at **X=8** = 40 to each of eight targets. Needs 21–23 mana depending
on `R`. This is the default.

**B. The cheap one.** **Solphim** + Crackle at **X=4** = 40 to each of four targets, for **9 mana**
at R=5. Solphim halves the mana requirement of your entire deck.

**C. The Goggles one.** Crackle at **X=2** with **Pyromancer's Goggles** = 10 + 10 to the *same*
two players = **20 each for ~4 mana**. With Solphim, **40 each — two players dead for four mana.**

**D. No payoff needed.** Thor + Longshot + Fiery Inscription out, chain six spells averaging MV 5:
`6 × 5 = 30` focused (Thor) plus `6 × 2 + 6 × 2 = 24` to *each* opponent. That's 72 spread and 30
focused without casting a single payoff card.

---

## 11. Rules gotchas that change the math

- **107.3a** — X is the same for every `{X}` in a cost. Crackle at X=3 is **nine** generic, not three.
  While on the stack, MV counts X at its announced value, so Crackle at X=3 is **MV 11** and Wanda
  discounts it.
- **107.3b** — casting "without paying its mana cost" forces **X = 0**. Cost *reduction* is fine.
- **601.2c** — the same target can't be chosen twice for one instance of "target." Crackle's targets
  are all different. But a **copy is a separate spell**, so it may re-use the same targets.
- **601.2f** — total cost = mana cost **or alternative cost**, plus increases, minus reductions.
  So Wanda discounts flashback and escape costs too.
- **707.10** — a copy inherits modes, targets, **the value of X**, and alternative costs.
- **500.1** — the postcombat main phase happens **every turn whether or not you attack**. Neheb
  triggers regardless.
- **Mana empties at the end of each step and phase.** Neheb's pile is postcombat-main only. Electro
  and Ashling explicitly override this for **red** mana; Birgi's override lasts until end of turn.
- **Ancient Tomb** deals you 2 per activation. At 40 life that's cheap; late, it's real.
- **Hexproof and protection do not stop wraths** — a wrath neither targets nor deals damage. Only
  **Mithril Coat** (flash) and **Tyrite Sanctum**'s indestructible counter save Wanda.
