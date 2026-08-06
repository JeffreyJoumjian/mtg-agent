# Scarlet Witch — Sideboard & cut tracking

Companion to `DECK.md`. Two tiers:

- **Sideboard** — real cards that lost a slot, or are table-dependent. Swap in per pod.
- **Hard cut** — actively wrong for this deck. Not coming back.

`DECK.md` is at **exactly 100**, so anything you promote from here needs a matching cut. The
"Displaces" column is my recommendation for each.

Finalized 2026-08-02. Last updated 2026-08-06 (Kazuul in, Abrade out).

**This file is the single source of truth for the sideboard.** `DECK.md` used to carry a second
copy and the two drifted apart; that copy is now just a pointer here.

---

## Sideboard (28)

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
| **Pirate's Pillage** | Word-for-word identical to Big Score at the same cost, but a **sorcery** instead of an instant. Third copy of an effect already run twice. | Big Score |
| **Solphim, Mayhem Dominus** | Doubles instead of triples, and it's a **creature** — dies to the removal every deck has, where an enchantment doesn't. Its indestructible costs {1} + 4 life + **discarding two cards**, and doesn't stop exile. | Fiery Emancipation |
| **Comet Storm** | Redundant with Crackle with Power. | Electrodominance |
| **Call Forth the Tempest** | Eight mana and the cascade is random. | Apex of Power |
| **Wild Ricochet** | Fourth redirect effect behind Deflecting Swat, Bolt Bend and Return the Favor. | Untimely Malfunction |
| **Double Vision** | Five mana to copy one spell per turn. | Repeated Reverberation |
| **Blazing Crescendo** | Outclassed by Monstrous Rage — same +3/+1 for half the mana, and Rage leaves a permanent +1/+1 Role. | Monstrous Rage |
| **Witch's Mark** | Mana value 2, so no discount. The Wicked Role is a permanent +1 to Wanda's power though. | Monstrous Rage |
| **Coruscation Mage** | Chip damage on a 2/2 in a deck that wants one big turn. Offspring {2} gives a second body. | Fiery Inscription |
| **Molten-Core Maestro** | Its mana ability needs 5+ mana **spent**, and only 6 of 37 fixed-cost spells still cost that after a 2-power discount. Wanda actively turns it off. | Storm-Kiln Artist |
| **Sokenzan, Crucible of Defiance** | Taps for red, but it isn't a **Mountain** so it doesn't trigger Valakut, and its channel makes two 1/1s with haste in a deck that never attacks. A Mountain is strictly better. | a Mountain |
| **Cori Mountain Monastery** | *"Enters tapped unless you control a Plains or an Island"* — in mono-red that means it **always** enters tapped. | Castle Embereth |
| **Scavenger Grounds** | "Exile all graveyards" is symmetric, and **your** graveyard feeds Past in Flames, Will of the Jeskai and Mizzix's Mastery. Colourless too. | a Mountain |
| **Demolition Field** | Kills one nonbasic and **hands them a basic in exchange**, on a colourless land. Legal at Bracket 3 (only *mass* land denial is barred) — just low value. | Mines of Moria |
| **Improvisation Capstone** | Paradigm is real recurring value, but it strip-mines your **library** every turn and anything you don't cast **stays exiled**. Its free-cast also forces **X = 0**. Same failure that cost a game to Apex, but repeating. | Arcane Bombardment |
| **Bolt Bend** | Usually just {R} with a 4-power creature, but **redirect only**. Return the Favor can copy *opponents'* spells and abilities, which nothing else in the deck does. | Return the Favor |
| **Monstrous Rage** | Smallest pump. The repeatable ones (Livaan, Cait Sith) and the free one (Blazing Shoal) all stay. | Blackblade Reforged |
| **Fellwar Stone** | In mono-red it often can't produce {R} at all, and we have {R}{R} and {R}{R}{R} costs throughout. | Mind Stone |
| **Abrade** | Mana value 2, so **Wanda never discounts it**, and 3 damage kills very little in Commander. Traded a one-shot answer for a permanent one. Bring it back for artifact-heavy pods or tables of small utility creatures. | Kazuul, Tyrant of the Cliffs |
| **Crawlspace** | {3} artifact, "no more than two creatures can attack you each combat." Lost to Kazuul on price ($9.93 vs $0.34) and because it does nothing when nobody attacks. Its real edge: it's an **artifact**, so your own Fiery Confluence and Chandra's Ignition can't kill it — every creature-based defence plan folds to your own sweepers. **Silent Arbiter** ({4}, one attacker per combat) is the bigger version, but it's a 1/5 creature that your Ignition kills, and capping the whole table's attacks stops your opponents pressuring each other, leaving you the only target. | Kazuul, Tyrant of the Cliffs |

## Hard cut (12) — not coming back

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
| **Young Pyromancer** · **Prismari Pianist** | Token-per-spell chump blockers. **Your own cards kill them**: Fiery Confluence's "1 damage to each creature" mode, taken three times, is 3 to each creature, and Chandra's Ignition hits "each *other* creature." You'd build blockers with one hand and burn them with the other — and 1/1s don't stop Commander-sized attackers anyway. (Pianist makes *three* tokens off a mana value 5+ spell, and Wanda's discount doesn't lower mana value, so it does trigger often. Still 1/1s.) |
| **Goblinslide** | Costs {1} per token, competing with the mana you're trying to bank. |
| **Manaform Hellkite** | X/X flier where X is the mana **actually spent** — so *Wanda's discount shrinks your own token* — and it's exiled at the next end step. Backwards on both counts. |

---

## Rules gotchas worth re-reading before you play

- **X-spells and free casts (rule 107.3b).** Casting a spell "without paying its mana cost" forces
  **X = 0**. Never free-cast Crackle with Power or Storm King's Thunder off
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
