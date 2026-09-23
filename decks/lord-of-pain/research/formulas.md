# The Lord of Pain — Formulas

All damage-replacement ordering is chosen by the **damaged opponent** (CR 616.1): they always pick
the order that hurts least. Multipliers commute; additives (+2) are applied *after* a multiplier
in the opponent's chosen order. So with Solphim (×2) + Torbran (+2) + Torture Pit (+2) a
1-damage ping becomes **(1 × 2) + 2 + 2 = 6**, never (1 + 4) × 2 = 10.

## One opponent draw costs…

Draw-punishers on board: Underworld Dreams, Kederekt Parasite, Razorkin Needlehead, Fate
Unraveler, Orcish Bowmasters (not the first draw-step draw), Spiteful Visions = 6 × 1 **damage**;
Sheoldred (2) = 2 **life loss** (not multiplied by damage effects; Scrawling Crawler, the other
un-multipliable point, went pocket 2026-09-22).

| Board | Per draw | Draws/turn/opp under Mine+Font+Visions (+natural) = 5 | + Temple Bell + Seizan = 8 |
|---|---|---|---|
| punishers only | 6 + 2 = 8 | 40 | 64 |
| + Solphim | 12 + 2 = 14 | 70 | 112 |
| + Solphim + Torture Pit | (1×2+2)×6 + 2 = 26 | 130 | 208 |
| + Torbran too (Razorkin, Visions are red) | 26 + 2×2 = 30 | 150 | 240 |
| × Wound Reflection at end step | ×2 | — | — |

You will rarely have all seven. **Three punishers + Font + Mine is already 3 × 4 = 12 a turn per
opponent** with no amplifier; two amplifiers make it lethal within a turn cycle.

## The commander's trigger

Expected first-spell MV ≈ 3. Four triggers a turn cycle (each player's first spell), all aimed by me.
Under Solphim + Torbran + Torture Pit: (3 × 2) + 4 = **10 per trigger**, ~40 a round, placed where
it hurts most. Under Twinflame Tyrant too: 3 × 2 × 2 + 4 = 16. Kaervek adds MV again for **every**
opponent spell.

## Heartless Hidetsugu

Hidetsugu deals ⌊life/2⌋ to each player (me included — not doubled, every amplifier is
opponent-only).

| Opp life | alone | + Solphim or Twinflame (×2) | + Torbran (+2) | ×2 and +2 |
|---|---|---|---|---|
| 40 | 20 → 20 left | 40 → **dead** | 22 → 18 | min(42, 42) → **dead** |
| 21 | 10 → 11 left | 20 → 1 left | 12 → 9 | min(22, 24) → **dead** |
| 15 | 7 → 8 left | 14 → 1 left | 9 → 6 | min(16, 18) → **dead** |

Rule: **a doubler kills even life totals and leaves odd ones at 1; doubler + additive kills
everything at 2+ life** (a player at exactly 1 would be dealt 0, which is no damage at all — CR 120.8). Activate with Swiftfoot Boots haste the turn he lands, or hold him until a doubler is
out. I take half my own life — be above 10 and have Exquisite Blood / Conqueror out if possible
(each opponent's half comes back to me).

## Bloodletter of Aclazotz kills

Bloodletter doubles life **loss** during my turn. "Lose half, rounded up" ×2 = all of it:
- **Fraying Omnipotence** (5 MV): every opponent loses their whole life total. 9 mana total.
- Torment of Hailfire X: each repetition is 6 not 3 (if they don't sac/discard).
- Exsanguinate X: 2X each, I gain 3X (→ Sanguine Bond for 3X more).
- Gray Merchant: 2 × devotion each.

## Exquisite Blood + Sanguine Bond

Any opponent life loss → I gain that much (Exquisite) → target opponent loses that much (Bond) →
repeat. The loop only needs one opponent to lose 1 life; Bond's target is re-chosen each trigger,
so it kills the table one player at a time. Bloodthirsty Conqueror is a second Exquisite. The
commander's "opponents can't gain life" does not touch my gain (CR 119.9). **Bracket 4 only** —
see SIDEBOARD.md for the Bracket 3 derivation.

## Life coming back (Collar / Whip / Chasm)

Lifelink on the commander (Basilisk Collar) gains the trigger's damage: ~4 triggers a turn cycle
at 3–10 each = 12–40 life a round, more under amplifiers (lifelink reads the damage *after*
replacements, CR 120.4b–c). Whip of Erebos extends that to every creature pinger; Hidetsugu under
Whip hits you for ⌊L/2⌋ and gives back the three opponents' halves — net strongly positive. Glacial
Chasm prevents all damage to you (not life loss: Seizan's 2 and Infernal Grasp's 2 still land) for
2·n life on your n-th upkeep — 2+4+6+8 = 20 life over four turns; sacrifice it when that outgrows
what it prevents.

## Manabarbs and the self-tax

Manabarbs hits every player's land taps. Me: ~5 taps a turn = 5 damage a turn, not multiplied.
Opponents: ~5 taps each, ×3 = 15, **3 per tap under Torbran** (red source) = 45 a round. Mana Flare
doubles what a tap yields but not the number of taps, so it sweetens the gift without raising my
own bill. With Exquisite Blood out the net is +40 for me a round; under Glacial Chasm my own bill is 0.

## Commander cost

{3}{B}{R} = 5. Jet Medallion (black spells −1) **and** Ruby Medallion (red spells −1) both apply
(it is both colours) → {1}{B}{R} = 3. Each recast adds 2 tax; Kaya's Ghostform returns it for {B}
instead.

## Gray Merchant devotion (black pips on permanents in the list)

Lord 1 · Underworld Dreams 3 · Bloodletter 3 · Sheoldred 2 · Conqueror 2 · Sanguine Bond 2 ·
Painful Quandary 2 · Exquisite Blood 1 · Wound Reflection 1 · Kederekt 1 · Fate Unraveler 1 ·
Seizan 2 · Kaervek 1 · Valgavoth 1 · Mogis 1 · Spiteful Visions 2 (hybrid pips count) · Bloodchief 1 ·
Gray Merchant 2. A mid-game board of six of these is devotion 10–12: 30+ life drained across the
table, 10+ gained, Sanguine Bond fires again for the gain.
