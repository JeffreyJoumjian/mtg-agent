# Scarlet Witch — Sideboard & cut tracking

Companion to `DECK.md`. Two tiers:

- **Sideboard** — real cards that lost a slot, or are table-dependent. Swap in per pod.
- **Hard cut** — actively wrong for this deck. Not coming back.

`DECK.md` is at **exactly 100**, so anything you promote from here needs a matching cut. The
"Displaces" column is my recommendation for each.

Finalized 2026-08-02. Last updated **2026-09-08** — V2 was promoted to `DECK.md`, so the six
cards it displaced joined the tables below, and the retired Bracket 4 list's cards are noted at
the bottom.

**This file is the single source of truth for the sideboard.** `DECK.md` used to carry a second
copy and the two drifted apart; that copy is now just a pointer here.

---

## Sideboard (42)

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
| **Hexing Squelcher** | Counterspell-heavy pods, where you want uncounterable on **all** turns (a flashed Mithril Coat or Deflecting Swat can be countered; Conqueror's Flail only locks *your* turn). Left the 100 on 2026-08-19: a 2/2 your own Fiery Confluence and Chandra's Ignition kill on the crucial turn, and its on-turn coverage is what Flail now does more broadly. | Champion's Helm |
| **Bulk Up** | Grindy pods where games run long enough for **Blackblade Reforged** or **Runechanter's Pike** to be sitting on Wanda. {1}{R} instant ({R} with one reducer), **doubles her power** — so it doubles the discount *and* Chandra's Ignition, which reads her power directly: at 12 power that is 24 to each opponent and each other creature, 72 under Fiery Emancipation. Flashback {4}{R}{R}, and Past in Flames / Will of the Jeskai grant it flashback anyway. **Dead on an unpumped 2/3** — it is a multiplier with no base of its own, which is why it is not maindeck. **Sequencing (CR 701.10b):** equip first, *then* double — X locks as Bulk Up resolves, so doubling before Blackblade doubles 2, not 12. Her reduction is generic-only, so spend the extra power on X spells and generic-heavy costs (Brass's Bounty, Volcanic Vision, Zuko's Exile), never on Fiery Confluence {2}{R}{R}, which floors at {R}{R} regardless. | Boltwave — the weakest slot once a game goes long, now that Cait Sith has left the 100. |

| **Spider-Punk** | Pods running **prevention** — fogs, Circles of Protection, Solitary Confinement, Comeuppance — or counterspells. `{1}{R}` for *"Spells and abilities can't be countered"* **and** *"Damage can't be prevented"*, which is two of the four defence families on one two-drop. **Deliberately sideboard, not maindeck (2026-09-16):** the pilot's pod has been leaning on Teferi's Protection, which this does **not** answer (see the gotcha below), so the slot was not worth paying for blind. Its cost is symmetric — it permanently switches off the damage-prevention half of your own **Commander's Plate**, and in `DECK-B4.md` the damage half of **The One Ring**'s protection turn as well (the can't-be-targeted halves of both survive). Cleaner in `DECK-V3.md`, which runs no One Ring. | Unleash Fury, which is strictly dominated by Bulk Up anyway |
| **Skullcrack** | The same prevention pods, when you want it at instant speed instead of telegraphed on the battlefield, or against lifegain. `{1}{R}`: *"Players can't gain life this turn. Damage can't be prevented this turn."* plus 3 damage. Overlaps Spider-Punk on prevention, so it is the **second** copy of that effect, not a companion to it — the lifegain clause and the instant timing are what it adds. Leyline of Punishment is the uncounterable-in-the-moment version if you would rather have it pre-deployed. | Bionic Blow — two red pips for the same +X/+0 that Lunar Frenzy and Frantic Confrontation give for one |

### Lost a slot on rate, not on quality

| Card | Why it's out | Displaces if you want it back |
|---|---|---|
| **Pirate's Pillage** | Word-for-word identical to Big Score at the same cost, but a **sorcery** instead of an instant. Third copy of an effect already run twice. | Big Score |
| **Solphim, Mayhem Dominus** | Doubles instead of triples, and it's a **creature** — dies to the removal every deck has, where an enchantment doesn't. Its indestructible costs {1} + 4 life + **discarding two cards**, and doesn't stop exile. | Fiery Emancipation |
| **Comet Storm** | Redundant with Crackle with Power. | Electrodominance |
| **Call Forth the Tempest** | Eight mana and the cascade is random. | Brass's Bounty |
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
| **Monstrous Rage** | Smallest pump. The repeatable ones (Livaan, Cait Sith) and the permanent ones (Blackblade, Runechanter's Pike) all stay; Blazing Shoal itself left on 2026-08-21. | Blackblade Reforged |
| **Blazing Shoal** | A one-turn pump that costs two cards (the Shoal and the pitched red card). Runechanter's Pike gives the same +6 to +12 **permanently**, off the graveyard the deck fills anyway, for {2} + equip {2}. Left 2026-08-21. Bring it back only for the pure one-big-turn shape, where a free +10 on the Crackle turn still matters. | Runechanter's Pike |
| **Fellwar Stone** | In mono-red it often can't produce {R} at all, and we have {R}{R} and {R}{R}{R} costs throughout. | Arcane Signet |
| **Abrade** | Mana value 2, so **Wanda never discounts it**, and 3 damage kills very little in Commander. Traded a one-shot answer for a permanent one. Bring it back for artifact-heavy pods or tables of small utility creatures. | Kazuul, Tyrant of the Cliffs |
| **Mind Stone** | The last pure-colourless rock. Its mana **doesn't bank** under Electro or Ashling, where every other source in the deck is red and does. Losing the sac-for-a-card is real, but there are 12 draw sources. | The Fire Crystal |
| **Apex of Power** | Adds its ten mana **only if cast from hand**, so it was dead off Past in Flames, Mizzix's Mastery and Will of the Jeskai — in a deck built to recur sorceries. Seething Song nets the same **+4** for 1 mana instead of 6. And its exile window ends **that turn**, where every other impulse effect here lasts until the end of your *next* turn. Bring it back only if you want the widest single dig and don't mind the risk. | Hit the Mother Lode (Iron Man, its old pointer, left the 100 on 2026-09-08) |
| **Runaway Steam-Kin** | **Corrected 2026-08-07 — the old grounds ("caps at three counters") were wrong.** Over six red spells it accrues 3 → {R}{R}{R} → 3 → {R}{R}{R}, which is **1 mana per spell, identical to Electro**. The cap limits storage, not throughput. It's out on *fragility* — a 1/1 that dies to your own Fiery Confluence — and on lumpy {R}{R}{R} payouts you must remember to cash. In its favour: at {1}{R} it's the **cheapest engine in the pool** (Electro 3, Birgi 3, Ashling 4, Urabrask 4, The Vision 4, Neheb 5) and triggers on *red spells*, broader than Electro. | any per-spell engine |
| **Crawlspace** | {3} artifact, "no more than two creatures can attack you each combat." Lost to Kazuul on price ($9.93 vs $0.34) and because it does nothing when nobody attacks. Its real edge: it's an **artifact**, so your own Fiery Confluence and Chandra's Ignition can't kill it — every creature-based defence plan folds to your own sweepers. **Silent Arbiter** ({4}, one attacker per combat) is the bigger version, but it's a 1/5 creature that your Ignition kills, and capping the whole table's attacks stops your opponents pressuring each other, leaving you the only target. | Kazuul, Tyrant of the Cliffs |

### Left the 100 in the V2 promotion (2026-09-08)

Six V1 cards, each with the grounds it lost on. All are real cards — they lost slots to the
conversion package, not to a flaw.

| Card | Why it left | Displaces if you want it back |
|---|---|---|
| **Ancient Tomb** | Purely a Game Changer budget call: Gamble is the better third GC for a deck that needs to find one specific card, and the cap is three. The Tomb's own cost — 2 life per activation, colourless mana that **doesn't bank** under Electro or Ashling — was always its weak side here. A Mountain under Gauntlet of Power taps for {R}{R} and costs no life. Losing it costs the turn-2-Wanda opener, about 8% of games. | Gamble (a straight Game Changer swap), or a Mountain if you drop Gamble instead |
| **Iron Man, Tony Stark** | The third win axis (a 2/1 flier per red spell) in a role that was over target at 10 against 8. Its Robots die to your own Fiery Confluence creature mode and Chandra's Ignition — the Young Pyromancer grounds. Note it is a **modal DFC**: the Iron Man face is castable straight from hand. | Boltwave or Guttersnipe, if you want a combat axis back |
| **Increasing Vengeance** | Fifth-best of five Crackle-copiers (Goggles is free, Repeated Reverberation gives two copies for the same {R}{R}, Storm King's Thunder gives X, Return the Favor also redirects). Copies aren't *cast*, so it never triggers a pinger. Still the cheapest instant-speed copy in the pool, and the flashback doubles it. | Repeated Reverberation, if you prefer the cheaper cast |
| **Birgi, God of Storytelling** | Same trigger as The Vision and Scarlet Witch ({R} per spell, banked), but the Vision grows into a threat and is the flavour piece. Birgi's boast text is blank here. Its back face, Harnfel, is a real card-advantage engine the deck never used. | The Vision and Scarlet Witch, or any per-spell engine |
| **Cait Sith, Fortune Teller** | The lowest-impact pump: one impulse card a turn, and the +X/+0 arrives *at the beginning of combat*, which is the wrong timing for a deck that spends its mana in the main phases. Livaan's version triggers on every cast. | Livaan, Cultist of Tiamat is the comparison — but see `research/turn-5-chain-2026-09-08.md`: a second Livaan-style pump is worth more than the old evaluation said, because each one multiplies the whole X-spell chain |
| **Tablet of Discovery** | The fifth 1–3-mana rock behind Sol Ring, Signet, Ruby Medallion and The Fire Crystal, with 33 lands and a pilot report that mana was never the bottleneck. Its {R}{R}-for-instants-and-sorceries mode is genuinely good; it just wasn't needed. | Runechanter's Pike, if the graveyard is being exiled too often for the Pike to hold its size |


## Hard cut (12) — not coming back

| Card | Why it's wrong for this deck |
|---|---|
| **Impact Tremors** | Creature-ETB payoff. We have 12 creatures and 44 instants/sorceries — about 5 damage a game against Fiery Inscription's 30+. |
| **Whispersilk Cloak** | Grants **shroud**, which stops *us* targeting Wanda — it would turn off Livaan, Cait Sith, Blazing Shoal, Chandra's Ignition and Nova Flame. Actively anti-synergistic. |
| **Thought Vessel** | {2} for {T}: add {C} plus no maximum hand size. **Mind Stone did the same job better** — same cost, same colourless mana, and it cashes in for a card. The hand-size clause is blank in a deck that empties its hand every turn, and colourless doesn't bank under Electro or Ashling. |
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

### What actually beats a mono-red damage kill (verified 2026-09-16)

Sort the opponent's card into one of four families before hoping your burn gets there. **Only the
first is beaten by "damage can't be prevented"** (Spider-Punk, Skullcrack, Leyline of Punishment,
Banefire at X≥5):

| Family | Tell | Beaten? |
|---|---|---|
| **Prevention**, including protection's damage clause | the word *prevent* | **Yes** (CR 615.12) |
| **Replacement** — Worship, Angel's Grace, Phyrexian Unlife | the word *instead* | No (CR 614.1a) |
| **Rules "can't"** — can't be targeted, **life total can't change**, damage can't be dealt | the word *can't* | No (CR 101.2) |
| **Countered / phased out / target killed** | — | No |

- **Teferi's Protection is unanswerable by damage**, and not because of the protection. It also
  reads *"your life total can't change"* — the damage is dealt and the life-loss result is simply
  impossible. No amount of unpreventable damage fixes it.
- **Conqueror's Flail is the answer to it.** *"Your opponents can't cast spells during your turn"*
  means they never get to cast Teferi's Protection in response to your kill at all. Against a
  Teferi-heavy pod, resolving and attaching the Flail is a higher priority than any burn spell —
  it is already in all three lists. Their only out is casting it pre-emptively on their own turn,
  blind, for a card.
- **The One Ring IS beatable**, unlike Teferi's: it is protection from everything with no life
  lock, so a *non-targeting* damage source plus an unpreventable-damage effect kills through it.
  Its protection also arrives on a **triggered ability**, so there is a priority window to burn
  them with the trigger still on the stack.
- **Player hexproof** (Leyline of Sanctity, Witchbane Orb, Shalai) blanks every targeted burn spell
  you own and is beaten outright by **Chandra's Ignition**, which does not target opponents.
- **Chandra's Ignition's damage source is the creature, not the spell**, so a *colourless* creature
  would ignore protection from red entirely. Neither chain list currently has one — every creature
  in both is red.
- **Everlasting Torment is illegal here** — {2}{B/R}, colour identity {B,R}, not mono-red legal.

## Verification

```bash
bun run card --deck decks/scarlet-witch/DECK.md --id r      # the promoted list
bun run card --deck decks/scarlet-witch/DECK-V3.md --id r   # the chain build
```

---

## The retired Bracket 4 list (2026-09-08)

`DECK-B4.md` is retired to `versions/2026-09-08-b4-retired.md`. What actually made it Bracket 4 was
**the Game Changer count, not a combo**: it ran ten (Ancient Tomb, Jeska's Will, The One Ring,
Underworld Breach, Lion's Eye Diamond, Grim Monolith, Mana Vault, Chrome Mox, Mox Diamond, Gamble)
against the Bracket 3 cap of three. Its one two-card infinite, **Reiterate + Mana Geyser**, is a
loop whose iteration count the pilot chooses, which by their own line (2026-09-06) is not an
"automatic or unstoppable" infinite — so that was never the deciding factor.

None of its distinctive cards are on a buy list any more. If you ever want the fast-mana shell
back, the file is in `versions/`; nothing in the current deck depends on it.

## The chain build (`DECK-V3.md`, 2026-09-08)

`DECK-V3.md` is a separate 100 built around the Livaan + X-spell doubling chain, at the same
Bracket 3 and the same 3/3 Game Changers. It carries its own cut list in
`research/turn-5-chain-2026-09-08.md`; this sideboard covers `DECK.md`. Cards that are maindeck in
V3 and absent here — the cheap Equipment seeds and the `{X}{R}` pump instants — are listed there,
not duplicated into these tables (deck-brain §1.4: one source of truth).