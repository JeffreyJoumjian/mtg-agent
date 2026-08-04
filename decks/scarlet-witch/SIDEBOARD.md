# Scarlet Witch — Sideboard & cut tracking

Companion to `DECK.md`. Two tiers:

- **Sideboard** — real cards that lost a slot, or are table-dependent. Swap in per pod.
- **Hard cut** — actively wrong for this deck. Not coming back.

`DECK.md` is at **exactly 100**, so anything you promote from here needs a matching cut. The
"Displaces" column is my recommendation for each.

Finalized 2026-08-02.

---

## Sideboard (20)

### Table-dependent — bring in for specific pods

| Card | Bring in against | Displaces |
|---|---|---|
| **Rousing Refrain** | Full-grip tables: control, counterspell decks, Rhystic Study / Mystic Remora pods. Three opponents holding four cards is 12 red mana. Dead against aggro. | Mana Geyser |
| **Insurrection** | Creature-heavy boards you want to steal and swing with. **Not a defensive card** — it's a sorcery, so it can't answer an attack. | Chandra's Ignition |
| **Swiftfoot Boots** | Artifact-removal-heavy pods, or if you want haste for the Blackblade commander-damage line. Hexproof doesn't stack with Champion's Helm. | Champion's Helm |
| **Darksteel Plate** | If you want a *second* indestructible source. Five mana all-in and no flash, so it's strictly worse than Mithril Coat. | Return the Favor |
| **Nova Flame** | Creature decks. Permanent +1/+1 counters on Wanda plus a sweep — but no damage to players, so it can't close a game. | Volcanic Vision |
| **Blasphemous Act** | Tables with **large** creatures, where Chandra's Ignition at 2 power and Fiery Confluence at 3 don't get there. Costs {1} less per creature on the battlefield, so it's often {R}. Remember it kills Wanda too. | Volcanic Vision |
| **Prisoner's Dilemma** | Pods that enjoy the politics. 4/8/12 to each opponent, but *they* choose. | Fiery Confluence |
| **Pinnacle Monk // Mystic Peak** | If you keep flooding or getting land-screwed. Land when you need land. | a Mountain |

### Lost a slot on rate, not on quality

| Card | Why it's out | Displaces if you want it back |
|---|---|---|
| **Hit the Mother Lode** | Its Treasures enter **tapped**, so the mana is for next turn — and Brass's Bounty makes ~14 **untapped** Treasures for the same 5 mana after the discount. | Tablet of Discovery |
| **Jaya's Immolating Inferno** | A fourth X-spell payoff behind Crackle, Storm King's Thunder and Electrodominance. | Electrodominance |
| **Fiery Emancipation** | Six mana, enchantment so no discount, and it triples damage to **your own** board too — Blasphemous Act becomes 39 to each creature. Lost to Solphim at four mana. | Solphim, Mayhem Dominus |
| **Comet Storm** | Redundant with Crackle with Power. | Electrodominance |
| **Call Forth the Tempest** | Eight mana and the cascade is random. | Apex of Power |
| **Wild Ricochet** | Fourth redirect effect behind Deflecting Swat, Bolt Bend and Return the Favor. | Untimely Malfunction |
| **Double Vision** | Five mana to copy one spell per turn. | Repeated Reverberation |
| **Blazing Crescendo** | Outclassed by Monstrous Rage — same +3/+1 for half the mana, and Rage leaves a permanent +1/+1 Role. | Monstrous Rage |
| **Witch's Mark** | Mana value 2, so no discount. The Wicked Role is a permanent +1 to Wanda's power though. | Monstrous Rage |
| **Coruscation Mage** | Chip damage on a 2/2 in a deck that wants one big turn. Offspring {2} gives a second body. | Fiery Inscription |
| **Molten-Core Maestro** | Its mana ability needs 5+ mana **spent**, and only 6 of 37 fixed-cost spells still cost that after a 2-power discount. Wanda actively turns it off. | Storm-Kiln Artist |
| **Fellwar Stone** | In mono-red it often can't produce {R} at all, and we have {R}{R} and {R}{R}{R} costs throughout. | Mind Stone |

## Hard cut (8) — not coming back

| Card | Why it's wrong for this deck |
|---|---|
| **Impact Tremors** | Creature-ETB payoff. We have 12 creatures and 44 instants/sorceries — about 5 damage a game against Fiery Inscription's 30+. |
| **Whispersilk Cloak** | Grants **shroud**, which stops *us* targeting Wanda — it would turn off Livaan, Cait Sith, Blazing Shoal, Chandra's Ignition and Nova Flame. Actively anti-synergistic. |
| **Runaway Steam-Kin** | Caps at three counters. Electro, Birgi, Urabrask and The Vision all add {R} per spell with no cap. |
| **Guttersnipe** | Three mana for 2 damage per instant/sorcery on a 2/2. Longshot does more and reduces costs. |
| **Firebrand Archer** | Coruscation Mage without Offspring, and a 2/1 instead of a 2/2. |
| **Electrostatic Field** | 1 damage per spell on a 0/4 defender. Too slow for a one-big-turn deck. |
| **Erebor Flamesmith** | Same rate as Firebrand Archer, worse body. |
| **Dualcaster Mage** | A worse Reiterate on a fragile body; we already run five copy effects. |

---

## Rules gotchas worth re-reading before you play

- **X-spells and free casts (rule 107.3b).** Casting a spell "without paying its mana cost" forces
  **X = 0**. Never free-cast Crackle with Power or Storm King's Thunder off Apex of Power,
  Improvisation Capstone, Mizzix's Mastery, Electrodominance, or Hit the Mother Lode's discover.
  Cost *reduction* (Wanda) is fine — only free-casting breaks it.
- **Neheb sequencing (rule 500.1).** The postcombat main phase happens every turn whether or not
  you attack. Burn precombat, collect {R} per point of life lost postcombat, cast the X-spell there.
- **Wraths and Wanda.** Champion's Helm grants hexproof, which does nothing against a wrath — a
  wrath doesn't target. Commander's Plate grants protection from W/U/B/G, which also doesn't stop a
  destroy effect that neither targets nor deals damage. Your real answers are **Mithril Coat**
  (flash, so hold it up) and **Tyrite Sanctum**'s indestructible counter. If you board Blasphemous
  Act back in, remember it kills her too.

## Verification

```bash
bun run card --deck decks/scarlet-witch/DECK.md --id r      # Bracket 3
bun run card --deck decks/scarlet-witch/DECK-B4.md --id r   # Bracket 4
```
