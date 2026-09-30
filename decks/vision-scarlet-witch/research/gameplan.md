# The Vision and Scarlet Witch — pilot notes

## The deck in one line

**Every spell is free and makes her bigger.** Her trigger refunds {R} and adds a +1/+1 counter, so a
one-mana cantrip costs nothing, draws a card, grows a flier and fires every burn permanent on the
board. Bank the surplus red under Leyline Tyrant, Electro or Ashling, then spend it all at once.

## The loop

```
cast {R} cantrip  →  trigger: +{R}, +1/+1 on her  →  cantrip resolves: draw  →  repeat
                    ↳ Guttersnipe 2 · Archer 1 · Flamebreather 1 · Coruscation 1 · Inscription 2
                      · Longshot 2 · Thermo (untap → tap) 1   — to EACH opponent, per spell
```

With four converters out, eight cantrips in a turn is **8 × 6 = 48 to each opponent**. The commander
is +8/+8 at the end of it. Nobody needed to attack.

## The three numbers you track

1. **Cards in hand.** The cantrips are card-neutral; the draw spells (Looting, Big Score, Hex
   Magic, Wheel, Vision, Cube) are what keep the chain going. Cast Hex Magic with cards in hand — it
   exiles the hand and redraws that many; at zero cards it does nothing.
2. **Red in the pool.** Under a bank it never empties (CR 106.4). Announce it every time you pass
   priority (CR 106.4b). Braid of Fire pays one more {R} into the bank every upkeep. Under Emancipation, Ancient Tomb deals 6 — stop tapping it — with no bank
   out its mana vanishes unless you cast an instant in your upkeep.
3. **Her power.** Base 3. One counter from every spell (two under Roaming Throne), Forge of Heroes the turn she lands, Tyrite
   Sanctum each turn, Blackblade +1 per land, Champion's Helm +2, Plate +3, Embercleave +1.

## Protection sequencing

| Piece | When |
|---|---|
| Swiftfoot Boots / Champion's Helm | First equip, the turn after she lands. Hexproof before anything else. |
| Commander's Plate | Second equip — pro-W/U/B/G stops most targeted removal, most blockers, most combat damage. |
| Mithril Coat | **Hold it.** Flash it in response to a wrath (it attaches itself to a legendary creature). |
| Deflecting Swat | Held, always. Free with her out. |
| Hexing Squelcher | Cast **before** the storm turn — everything you cast is uncounterable, and she gets ward. |
| Conqueror's Flail | Equip the turn before the big turn: opponents can't cast spells during your turn. |
| Cavern of Souls (Hero) | Recast mana; the recast can't be countered (CR 106.6). |
| The Ozolith | Cast early. When she dies, the counters go there; recast her **precombat** and move them back at beginning of combat. |
| Tyrite Sanctum | {2},{T}: God + a counter. Later {4},{T}, sac: indestructible counter — permanent, survives everything but exile/edicts. |

What none of this stops: edicts, Farewell-style exile wraths, overloaded Cyclonic Rift, −X/−X.
Against those the plan is the two-mana recast (Command Beacon zeroes the tax) with the counters
waiting on The Ozolith.

## The storm turn

Precombat, in this order:

1. Squelcher out, Flail equipped, hexproof on.
2. Rituals into the bank (Pyretic {1}{R} → {R}{R}{R} + refund; Seething Song; Jeska's Will; Mana
   Geyser late, when their lands are tapped).
3. Cantrips, draw spells, more cantrips. Every one is a converter trigger.
4. **Grapeshot last** — storm counts every spell cast this turn, copies go anywhere.
5. Or **Aetherflux Reservoir**: spell N gains N life; after ten spells you've gained 55. Pay 50: 50
   damage to a face. Two players in two turns.
6. Or **Crackle with Power** with the bank: X=4 is 20 to each of four targets for {12}{R}{R}; X=5
   is 25 to each of five.
7. Or **Soul's Fire** after Bulk Up, with **Loki** tapped first ({1}: copies the next instant or sorcery with mana value up to his
   power): her power twice, to one face or two (the copy may keep the same target, and it resolves
   first). Under Emancipation each hit is tripled and Shadowspear gains all of it back.

**Every power-to-face spell targets her — Soul's Fire, Chandra's Ignition, Origin of Thor III.** If
   she is removed in response, the spell resolves and deals nothing (CR 608.2b, no last-known-
   information fallback). Hexproof on and Swat held *before* casting any of them.

**Neheb turns are two-stage (CR 500.1):** burn in the precombat main — every pinger trigger, Kediss,
   ward payments all count — then at the start of the postcombat main Neheb adds {R} per life lost
   across all opponents. Eight spells through four converters is ~140 red. Spend it there (Crackle,
   Past in Flames, Soul's Fire) or bank it under Tyrant, Electro or Ashling; it empties otherwise.
   You do not have to attack to reach the postcombat main.

**Arcane Bombardment script:** it triggers on your *first* instant or sorcery **each turn** — every
   opponent's turn too. Cast one cheap instant on each of their turns (Might of the Meek, Crimson Wisps,
   Lightning Bolt) and the pile grows by one random spell from your graveyard and every copy is
   **cast** — her trigger, the pingers and the storm count all see each one. Never let the trigger
   land with no instant or sorcery in the graveyard. Big Score copies still cost a discard
   (additional costs stay); a copied Crackle is X = 0, so bin Crackle with Hex Magic, not into
   the yard. With all four reducers out it costs {R}{R}.

**Increasing Vengeance:** {R}{R} copies Soul's Fire, Big Score, Fiery Confluence or Grapeshot
   once; its flashback ({3}{R}{R}, reduced to {R}{R}) copies **twice** — Soul's Fire three times is
   her power to three faces.

**Wanda's Vision:** your **second** spell each turn casts a random nonland card free — on opponents'
   turns too (two instants). A Crackle hit is X = 0; a card you decline stays exiled.

**Cosmic Cube:** every attack, look at six and cast one with mana value up to her power, free — any
   card type, mid-combat (CR 608.2g). Cast Ignition or a multiplier off it before blockers.

**Origin of Thor script:** cast it the turn *before* the storm turn. Chapter II fires on the storm
   turn (a counter per spell, on top of her own), chapter III the turn after: her power to each
   opponent, pingers kept.

Then combat if she's suited: she flies, Bulk Up doubles her after blockers, Embercleave flashes in
for double strike and trample (it costs {1} less per attacker), Kediss copies the hit to every
other opponent.

## Kill math (commander damage is combat damage only — CR 903.10a)

| Board | Power | One swing |
|---|---|---|
| Her + 8 counters | 11 | 11 |
| + Embercleave (double strike) | 12 | **24 — lethal** |
| + Bulk Up after blocks | 24 | 24, or 48 with Embercleave |
| + Kediss | any | same damage to each other opponent (life loss, not commander damage) |
| Chandra's Ignition at power 15 | — | 15 to each opponent **and** each other creature — kills your own pingers, so it is the last spell of the game |
| Origin of Thor chapter III at power 15 | — | 15 to each opponent, no sweep — cast the Saga two turns before, storm on the chapter II turn |
| Soul's Fire at power 15 | — | 15 to one face; Loki or Increasing Vengeance copies it (the copy may keep the same target); Past in Flames recasts it |
| **Fiery Emancipation** out | ×3 | she is lethal at **7 power** in one hit; Ignition at 7 = 21 to each opponent; every Guttersnipe trigger = 6 |
| **Twinflame Tyrant** out | ×2 | opponents only, combat included; with Emancipation ×6 |

## Sequencing traps

- **Reducers don't touch the cantrips.** Ruby Medallion and The Fire Crystal reduce generic only;
  a {R} spell is already at its floor. They pay for Big Score, Hex Magic, Bulk Up, Loki's power-up and
  the Equipment.
- **"Noncreature spell" and "instant or sorcery" are different sets.** Archer, Flamebreather,
  Coruscation Mage and Longshot fire on Equipment and artifacts; Guttersnipe, Thermo,
  Inscription, Electro, Ashling, Storm-Kiln and Urabrask only on instants and sorceries.
  Iron Man's tokens come only from **red** spells — colourless Equipment and rocks make none.
- **Fiery Confluence's "1 damage to each creature" mode kills Archer, Coruscation Mage and
  Kediss.** Take the 2-to-each-opponent and destroy-artifact modes unless the board is empty.
- **Ashling** discards *then* draws on every instant/sorcery; the third trigger in a turn adds
  {R}{R}{R}{R}. Sequence cheap spells so the third one lands when you need the burst.
- **Loki** copies only spells with mana value up to his power — power him up the turn he lands
  ({4}{R} less his own cost is {3}), and Tyrite Sanctum can grow him further. His tap needs haste
  (Fire Crystal, Boots) or a turn.
- **Iron Man, Tony Stark** makes a 2/1 flying artifact token per **red** spell (colourless Equipment
  doesn't count), doubled by Throne — he is a Hero. Each token pumps Storm-Kiln Artist.
- **Wheel of Fortune / Reforge** after you've emptied your hand — and note what it strips from
  opponents' hands the turn before you go off.
- **Mox Amber** needs a legendary creature — cast it after her, not before.
- **Roaming Throne** names **Hero** and has to be on the battlefield *before* the spell is cast —
  then every spell is {R}{R} and two counters. Kediss is a Lizard; not
  covered.
- **Eldritch Immunity-style "protection from each colour" would unattach Embercleave** — that is
  why it isn't in the deck. Commander's Plate never conflicts with red Equipment.
- **Chandra's Ignition** is a sorcery: it is the finisher, not the answer to an attack.

## Mulligan guide

**Keep** two lands and two one-mana spells, or three lands and a converter. She is castable on
turn 4 off any hand with three red sources.

**Ship** hands with no cantrip and no draw — the deck does nothing until the chain starts, and a
hand of Equipment and rituals is a hand of nothing.
