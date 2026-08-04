# Scarlet Witch — Decision log

Append-only. Newest at bottom.

## 2026-07-01 — Initial 100-card build

**Commander:** Scarlet Witch, Chaotic Avenger (Izzet U/R). See strategy.md.

**Cut from the in-hand pile (3):**
- Wonder Man, Hollywood Hero — Power-up payoff with ~no Power-up cards; off-plan.
- Quicksilver, Brash Blur — weak 1/1 aggro; Quicksilver, Speedster is more useful (flash enabler).
- Grapeshot — pure storm payoff, win-more in a control shell. (Sideboard if we pivot to storm.)

**Kept the whole rest of the pile (16)** including the former "sideboard": Vision Quest tutors the
artifact-Visions onto the battlefield buffed; Vision, Spectral Synthezoid is a free-spell engine;
Hex Magic / Vision of Love are cheap card advantage. Scarlet Witch, Wanda Maximoff (2/3 menace) and
Viv Vision are the weakest keeps — kept for flavor + as cheap evasive equipment-carriers.

**Bracket 3, "no Game Changers":** deliberately avoided the GC list — no Rhystic Study, Mystic
Remora, Cyclonic Rift, Fierce Guardianship, Jeweled Lotus, Mana Crypt. (Sol Ring is not a GC.)

**Token flavor rule honored:** token-makers only produce "energy made flesh" — Young Pyromancer
(Elementals), Saheeli (Servo/artifact), Metallurgic Summonings (Constructs), Murmuring Mystic
(Bird Illusions). No goblins/dragons. Skipped Talrand (Drakes) for flavor.

**Extra turns kept light (2):** Temporal Manipulation + Karn's Temporal Sundering. No loop.

**Wanda-equivalent-wins rule:** maxed the Wanda/Vision cards as the creature base even where a
generic would be marginally better (e.g., the Vision suite over vanilla value creatures).

**Tool caught two build errors before finalizing** (`bun run card --deck ... --id ur`):
- Mystic Monastery was off-identity (Jeskai, CI:RUW) → swapped to Frostboil Snarl.
- List was 99; added an Island → 35 lands / 100 total.

**Cost:** sticker ≈ $319; ≈ $70–90 cash after proxying lands + the big cards (see STATUS.md).

**Open / to tune after playtesting:** land count (35) vs the top-end; whether Wanda Maximoff / Viv
Vision earn their slots; whether to add a second finisher or more early interaction.

---

## 2026-08-02 — Bracket 3 finalizer pass

Snapshot of the prior list: `versions/2026-08-02-pre-finalizer-b3.md`.

### Locked in (4 in / 4 out)

| In | Out | Why |
|---|---|---|
| Wiccan, Young Avenger | Call Forth the Tempest | Impulse-draws a card on **every noncreature spell**; a six-spell turn draws six extra cards. $0.24. Tempest was 8 mana with a random cascade. |
| Neheb, the Eternal | Comet Storm | Adds {R} per 1 life opponents lost this turn, at your postcombat main. A Fiery-Confluence turn pays 18 red mana. Comet Storm was redundant with Crackle. |
| Disrupt Decorum | Blazing Crescendo | **Reversal of an earlier bad cut.** Goad all creatures you don't control = a one-sided fog; the deck had no other way to avoid being attacked. 5/11 sample decks run it. |
| Champion's Helm | Swiftfoot Boots | Not redundancy — a **swap**. Haste is worthless here (Wanda's discount is static). +2/+2 is +2 to every discount, and 10 of our 12 creatures are legendary. Hexproof doesn't stack. |

### Reasoning worth keeping

- **Molten-Core Maestro was cut earlier for a measurable reason:** its mana ability needs 5+ mana
  *spent*, and only 6 of 37 fixed-cost instants/sorceries still cost that much after a 2-power
  discount. Wanda's discount actively turns it off.
- **Fellwar Stone was a build error.** In mono-red it often cannot produce {R} at all, and the deck
  has {R}{R} and {R}{R}{R} costs throughout.
- **Pump ranking is Blazing Shoal > Monstrous Rage > Blazing Crescendo.** Shoal is free (pitch a
  red card of mana value X; ~14 legal targets averaging MV 6). Monstrous Rage is +3/+1 for one mana
  *and* leaves a permanent +1/+1 Role. Crescendo is the same +3/+1 for twice the mana.
- **X-spell trap (rule 107.3b):** casting an X-spell "without paying its mana cost" forces X = 0.
  Never point Apex of Power, Improvisation Capstone, Mizzix's Mastery, Electrodominance, or Hit the
  Mother Lode's discover at Crackle with Power, Storm King's Thunder, or Jaya's.
- **Neheb sequencing (rule 500.1):** the postcombat main phase happens every turn whether or not
  you attack. Burn precombat, collect mana postcombat, cast the X-spell there.
- **Whispersilk Cloak is anti-synergistic here** — shroud stops *us* targeting Wanda, turning off
  Livaan, Cait Sith, Blazing Shoal, Chandra's Ignition and Nova Flame. Hexproof only.

### Method change

Ranked whole-deck lists proved useless for deciding cuts — comparing a land to a win condition is
meaningless. Switched to a **role skeleton**: assign target slot counts per role, then compare only
within an over-subscribed role. That immediately isolated win conditions (11 against a target of 8)
as the sole bloated role and made the decision tractable.

### Still unresolved

Six recommended upgrades from the sample study were never seated — Fiery Confluence, Volcanic
Vision, Jaya's Immolating Inferno, Hit the Mother Lode, Fiery Inscription, Solphim. They are logged
in `SIDEBOARD.md` under "Unseated candidates" with the card each would displace. The live decision
is **Solphim vs Fiery Emancipation** — one damage multiplier is right, two is greedy.

## 2026-08-02 (part 2) — the six unseated candidates resolved

Snapshots: `versions/2026-08-02-b3-before-final-six.md` and `-b4-`.

**Taken (4 in / 4 out):**

| In | Out | Why |
|---|---|---|
| Fiery Confluence | Insurrection | MV 4 → **{R}{R}**. Three modes, repeats allowed: 6 damage to each opponent, or a 3-damage sweeper. Best rate in the pool. Insurrection is an 8-mana sorcery that wins through combat and is blank vs creature-light tables. |
| Volcanic Vision | Wild Ricochet | MV 7 → {3}{R}{R}. Regrow a spell **and** deal its MV to each creature *opponents* control — a one-sided wipe that spares our engines. Wild Ricochet was the fourth redirect behind Deflecting Swat, Bolt Bend and Return the Favor. |
| Fiery Inscription | Double Vision | 3 mana, 2 to each opponent per instant/sorcery; a five-spell turn is 30 damage across the table, and it's an enchantment so it survives creature removal. Double Vision was 5 mana to copy one spell a turn. |
| Solphim, Mayhem Dominus | Fiery Emancipation | 4 mana vs 6, and Solphim doubles **only** damage aimed at opponents — Fiery Emancipation triples damage to our own board too, making Blasphemous Act read 39 to each creature. Neither is discounted (creature / enchantment). |

**Withdrawn — two of my own earlier recommendations that the deck outgrew:**

- **Jaya's Immolating Inferno.** Proposed as a Comet Storm upgrade, but Comet Storm was already
  gone. What remained was a fourth X-spell behind Crackle, Storm King's Thunder and
  Electrodominance — and Electrodominance is better than I'd rated it (instant speed, plus a free
  cast of mana value X or less).
- **Hit the Mother Lode.** Its Treasures enter **tapped**, so the mana is for next turn, and
  **Brass's Bounty already fills the huge-mana role better** — ~14 *untapped* Treasures for the
  same 5 mana after the discount. Its free-cast half also loses to Improvisation Capstone's
  Paradigm, which gives a free copy from exile at the start of every first main phase.

**Correction logged:** I had described Insurrection as a protection spell. It is a **sorcery** and
cannot be cast in response to an attack, so it does no defensive work. The actual defensive package
is Disrupt Decorum (goad lasts until your next turn, so it covers opponents' turns), Volcanic
Vision, Fiery Confluence's sweeper mode, and Blasphemous Act.

**Final state:** Bracket 3 = 100 cards, 3/3 Game Changers, $779.35 sticker. Bracket 4 = 100 cards,
10 Game Changers, rebuilt from the finalized B3 and sharing 86 cards. Sideboard = 20 cards,
hard-cut = 8.

## 2026-08-02 (part 3) — Mithril Coat in, Blasphemous Act to the sideboard

Snapshot: `versions/2026-08-02-b3-before-mithril-coat.md`.

**The gap:** the deck had essentially no answer to a board wipe. Champion's Helm grants hexproof,
which does nothing against a wrath (a wrath doesn't target). Commander's Plate grants protection
from W/U/B/G, which doesn't stop a destroy effect that neither targets nor deals damage — and gives
nothing against red. The three redirect spells all require a spell "with a single target," which a
wrath doesn't have. Tyrite Sanctum was the only answer, at 6 mana across two turns.

**Mithril Coat** fixes it: {3}, **flash**, indestructible itself, and it auto-attaches to a
legendary on entry with no equip cost. 10 of our 12 creatures are legendary. Flash is the key —
you hold it up and deploy in response to the wrath.

**Blasphemous Act was the cut, and the premise for keeping it didn't survive checking.** The claim
was that it pairs with the damage doublers. Solphim does double it against opponents' creatures
(26 instead of 13) — but **13 already kills essentially every creature in Commander**, and
Blasphemous Act deals **no damage to players**, so the doubler contributes nothing toward winning.
Solphim's real partners are Chandra's Ignition, Fiery Confluence, Crackle, Thor, Longshot and
Fiery Inscription.

More importantly, Blasphemous Act was **the only sweeper that kills Wanda**. The three that remain
all spare her: Volcanic Vision is one-sided, Chandra's Ignition hits "each *other* creature," and
Fiery Confluence does 3.

**The cost, stated plainly:** the deck now has no *unconditional* wrath. The remaining three all
depend on something — what's in the graveyard, or Wanda's power. Board Blasphemous Act back in
against tables with large creatures.
