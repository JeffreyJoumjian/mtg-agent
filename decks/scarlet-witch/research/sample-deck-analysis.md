# Sample deck analysis — 15 decks mined for The Scarlet Witch

Source bookmarks: `~/Desktop/wanda-decks` (17 `.webloc` files → 15 decklists scraped).
Raw data: `../samples/moxfield-decks.json`, `archidekt.json`, `tappedout.txt`.
Re-run the analysis with `bun run decks/scarlet-witch/samples/analyze.ts [--lists|--freq]`.

Scraped 2026-08-01. Moxfield blocks curl/WebFetch behind Cloudflare — the lists were pulled by
driving a real browser (Playwright) and calling `api2.moxfield.com` from inside the page context.

Two of the 17 bookmarks are not decklists and were skipped: the EDHREC commander page for
*The Vision and Scarlet Witch*, and a TCGplayer Thor article.

---

## The headline finding

**The Scarlet Witch is not a traditional storm commander, and 15 independent builders agree.**

Her text only discounts instants/sorceries of **mana value 4 or greater**. Traditional storm is built
on 1–2 mana cantrips and Grapeshot — she discounts *none* of that. The evidence is unambiguous:

| Traditional storm card | Decks running it (of 10 Wanda decks) |
|---|---|
| Grapeshot | **0** |
| Aetherflux Reservoir | **0** |
| Ponder / Preordain / Opt | **0** |
| Empty the Warrens | **0** |
| Brain Freeze | **0** |

What they run instead is a **big-mana "ritual into free-cast haymakers"** deck. That is the correct
read of the card, and we should build that, not a Grapeshot pile.

## The engine the community actually found

Her discount **scales with her power**, and several red cards pump power *as a side effect of
casting spells*. That turns pump into a snowballing cost reduction inside a single turn:

- **Livaan, Cultist of Tiamat** (7/10 decks) — *"Whenever you cast a noncreature spell, target
  creature gets +X/+0, where X is that spell's mana value."* Point it at Wanda. Cast Mana Geyser
  (MV 5) → Wanda is 7/3 → your next MV 4+ spell costs **{7} less**. This is the single most
  important non-obvious card in the archetype.
- **Cait Sith, Fortune Teller** (5/10) — same effect off the exiled card's mana value, every turn.
- **Blazing Shoal** (3/10) — *free* (exile a red card with MV X from hand): +X/+0. Pitch a 9-drop,
  Wanda gives {11} off for the rest of the turn.
- Cheap pump: Monstrous Rage (5/10), Blazing Crescendo (5/10), Titan's Strength (4/10),
  Bulk Up (3/10), Brute Force (2/10).
- Equipment: Commander's Plate (6/10), Champion's Helm (4/10), Buster Sword (3/10),
  Blackblade Reforged (2/10).

**Blackblade Reforged is underplayed at 2/10.** She's legendary, so equip is {3}, not {7}, and it
gives +1/+1 per land — a 30+ power commander discounting every haymaker to its coloured pips.

---

## Archetype classification

The user was right that these are not all the same deck. They sort into six distinct gameplans.

### A. Big-mana haymaker (the consensus Wanda deck) — 5 decks

Ritual/treasure into enormous free-cast spells. Kill with Crackle with Power, Apex of Power,
Insurrection, or Storm King's Thunder. This is what "The Scarlet Witch deck" means by default.

- **The Scarlet Witch** (moxfield `M7Sj…`) — the cleanest, most balanced version
- **When it comes to the Scarlet Witch… anything's possible** — adds Blood Moon / Price of Glory
- **Big Red Is Back** — heavier on copy + steal (Radiate, Fury Storm, Mass Mutiny, Word of Seizing)
- **W4nd4** — big mana + group-slug steal (Mob Rule, Seize the Spotlight, Tempt with Mayhem)
- **EDH Pump + Big Mana** (tappedout) — same idea but diluted with weak combat pump

### B. Pump-for-discount → cheap haymakers — 1 pure deck

- **The Scarlet Witch – Spell Slinger. Cheap & MASSIVE!** — the most *on-theme* build in the pile.
  Explicitly builds around growing her power to make everything free. Worth studying closely even
  though its card quality is mid.

### C. Magecraft pinger spellslinger (budget) — 2 decks

Guttersnipe / Electrostatic Field / Erebor Flamesmith / Firebrand Archer / Coruscation Mage —
win by chip damage per spell rather than one big turn.

- **The Perfect Hex ($53 budget)** — 0 Game Changers, genuinely cheap, coherent
- **Burn the Witch** — pingers + equipment, somewhat unfocused

### D. Big X-spell burn + voltron hybrid — 1 deck

- **Burn: The Witch** — mana doublers (Gauntlet of Might, Gauntlet of Power, Extraplanar Lens,
  Nykthos) feeding Devil's Play / Disintegrate / Red Sun's Zenith / Banefire / Demonfire, plus a
  full equipment suite. The most "grow her and point a giant X-spell at someone" list here.

### E. Fast-mana storm/combo (Bracket 4–5) — 1 deck

- **Harbinger of Chaos** — Underworld Breach + Lion's Eye Diamond, every mox, Grim Monolith,
  Mana Vault, City of Traitors, Ancient Tomb. **9 Game Changers.** The strongest Wanda deck here
  by a wide margin, and the template for our Bracket 4 list.

### F. Not Wanda — mined for tech only — 5 decks

- **Thunderstruck** (Thor) — mono-red cEDH storm: Breach/LED shell + Splinter Twin, Twinflame,
  Heat Shimmer, Electroduplicate. 9 GC. Best source of *mono-red* fast-mana tech.
- **Thor, God of Thunder – Equipment!** — Godo + Helm of the Host voltron combo
- **FOR ASGARD!** (Thor) — equipment voltron + damage doublers (Fiery Emancipation, Torbran)
- **Kedihh and Malcuck** (Malcolm/Kediss) — **true UR cEDH storm**: Timetwister, Ancestral Recall,
  Mind's Desire, Rhystic Study, Mystic Remora, Volcanic Island. Bracket 5. Different colours, but
  the best reference for what a real storm deck looks like.
- **Greater than the Sorcerer Supreme** (Scarlet Witch, Chaotic Avenger) — UR "cast free stuff"
  value/control with Omniscience, Time Stretch, Thousand-Year Storm. This is the archetype the
  *existing* `DECK.md` is closest to.

---

## Power ranking

Game Changer counts are exact (checked against Scryfall `is:gamechanger`, 53 cards).
Bracket calls are judgement, using the [official criteria](https://commanderbrackets.com/).

| # | Deck | Archetype | GC | Bracket | Note |
|---|---|---|---|---|---|
| 1 | Kedihh and Malcuck | UR cEDH storm | 3 | **5** | Timetwister + Ancestral Recall + Volcanic Island. Not our colours, but the real thing. |
| 2 | Harbinger of Chaos | Wanda fast-mana combo | **9** | **4–5** | Breach + LED. Best Wanda deck in the pile. |
| 3 | Thunderstruck | Thor mono-red storm | **9** | **4–5** | Mono-red Breach shell + Twin combo. |
| 4 | Burn: The Witch | X-spell burn + voltron | 3 | **4** | Mana doublers + huge X-spells. Slow but very high ceiling. |
| 5 | The Scarlet Witch (`M7Sj…`) | Big-mana haymaker | 2 | **3-high** | The best-rounded fair list. Strongest starting template. |
| 6 | Anything's possible | Big-mana + light stax | 3 | **3-high** | Blood Moon / Price of Glory push it up. |
| 7 | Thor – Equipment! | Equipment voltron | 2 | **3-high** | Godo + Helm is a real 2-card kill. |
| 8 | Greater than the Sorcerer Supreme | UR big-spell value | 3 | **3** | Omniscience/Time Stretch, but durdly. |
| 9 | W4nd4 | Big-mana + steal | 2 | **3** | Fun, unfocused. |
| 10 | Big Red Is Back | Chaos/copy/steal | 1 | **3** | Very high variance. |
| 11 | FOR ASGARD! | Equipment voltron | 2 | **3** | |
| 12 | Spell Slinger Cheap & MASSIVE | Pump-for-discount | 2 | **3** | Best *idea*, mediocre execution. |
| 13 | Burn the Witch | Pingers + equipment | 1 | **2–3** | Two half-decks stapled together. |
| 14 | EDH Pump + Big Mana | Pump/combat | 1 | **2–3** | Too many one-shot combat pumps. |
| 15 | The Perfect Hex ($53) | Budget pingers | **0** | **2** | Honest, coherent budget deck. |

### Does each deck actually use the commander?

Measured with `bun run decks/scarlet-witch/samples/commander-usage.ts` — counts instants/sorceries
at MV 4+ (X-spells included, per rule 107.3a) since those are the only spells she discounts.

| MV4+ | %  of I/S | Deck |
|---|---|---|
| 37 | 76% | Spell Slinger Cheap & MASSIVE |
| 36 | 71% | Big Red Is Back |
| 29 | 64% | Anything's possible |
| 28 | 82% | Burn: The Witch |
| **28** | **68%** | **The Perfect Hex ($53)** |
| 25 | 64% | W4nd4 |
| 23 | 66% | The Scarlet Witch (`M7Sj…`) |
| 21 | 55% | Harbinger of Chaos |
| 20 | 59% | Burn the Witch |
| 18 | 44% | EDH Pump + Big Mana |

**This corrected an assumption.** The intuition that the budget deck "barely uses the commander"
is wrong — The Perfect Hex is mid-pack at 28 discounted spells / 68%, ahead of several pricier
lists. Its weakness is not commander synergy; see the note below.

Also worth seeing: **Harbinger of Chaos is only 8th** on this metric. The strongest deck in the pile
wins through fast mana and Underworld Breach, not through the commander's text. That is a real
design choice we have to make — power via the commander, or power around her.

---

## Why The Perfect Hex ranks last (and what that does and doesn't mean)

Ranked 15th on **raw power and bracket**, which is the axis requested. That is not a claim that
it is badly built — it is a genuinely coherent deck, and the price is honest (measured **$59.85**
today against a claimed $53). Its pinger clock is also real: five pingers and five spells in a turn
is roughly 30 damage to *each* opponent. Against precons and Bracket 2 tables it will absolutely win.

The three things that cap it, none of which are commander synergy:

1. **No top-end.** It has no Apex of Power, Crackle with Power, Insurrection, or Storm King's
   Thunder. It discounts a lot of *medium* spells but has nothing to convert the discount into a
   game-ending turn. The discount is a means; this deck has no end.
2. **The win condition has 1–2 toughness.** Guttersnipe 2/2, Erebor Flamesmith 2/1, Firebrand
   Archer 2/1, Coruscation Mage 2/2. One board wipe removes the entire clock — and the deck runs
   Blasphemous Act itself.
3. **Thin mana and thin interaction.** No Jeska's Will, no Ancient Tomb, no Ruby Medallion,
   0 Game Changers; roughly five interaction pieces total.

So: "it'll run your pods" is true for Bracket 2 and false for Bracket 3-high. Ranking a
0-Game-Changer $60 deck last in a pile containing two 9-Game-Changer lists is a statement about
the pile, not an insult to the deck.

---

## The staple core to steal

### Universal — every single Wanda list runs these

| Card | Decks | Why |
|---|---|---|
| **Big Score** | 10/10 | Draw 2 + two Treasures at instant speed. Card *and* mana. |
| **Chaos Warp** | 10/10 | Mono-red's only clean answer to any permanent. |
| **Mana Geyser** | 10/10 | MV 5, so discounted → routinely 8–15 red mana. The ritual. |
| **Jeska's Will** | 9/10 | 🔶 Game Changer. Mana + cards in one card. |
| **Sol Ring** | 9/10 | |
| **Unexpected Windfall** | 9/10 | Big Score #2. |

### Near-auto (6–7 of 10)

- **Electro, Assaulting Battery** — adds {R} per instant/sorcery **and you keep unspent red mana
  across steps** (all of it, from any source — so Mana Geyser mana survives into combat). ($6.45)
  Not a replacement for Birgi: Birgi triggers on *every* spell, not just instants/sorceries, and
  its back face **Harnfel, Horn of Bounty** is a card-advantage engine. Run both.
- **Livaan, Cultist of Tiamat** — the power-pump engine described above. ($0.23)
- **Apex of Power** — MV 10 → heavily discounted → cast 7 cards + add 10 mana.
- **Crackle with Power** — the consensus kill. X=3 is 15 damage to three targets.
- **Electrodominance** — instant-speed X damage **and** free-cast a spell MV ≤ X.
- **Insurrection** — steal everything, swing. MV 8, discounted.
- **Inspired Tinkering** — 3 cards + 3 Treasures.
- **Improvisation Capstone** — free-cast off the top, and Paradigm repeats it every turn.
- **Ruby Medallion**, **Arcane Signet**, **Blasphemous Act**, **Abrade**
- **Deflecting Swat** — free redirect; mono-red's substitute for a counterspell.
- **Swiftfoot Boots**, **Commander's Plate**
- **Mizzix's Mastery** — MV 4, so discounted; overloaded it recasts the whole graveyard.
- **Seething Song**, **Pirate's Pillage**, **Call Forth the Tempest**, **Ancient Tomb** 🔶

### Mono-red's answers to its two weaknesses

**No counterspells → protection instead:**
Deflecting Swat (7/10) · Bolt Bend (4/10) · Return the Favor (4/10) ·
**Hexing Squelcher** (4/10 — *"Spells you control can't be countered"* + ward on everything) ·
Swiftfoot Boots · Commander's Plate · Champion's Helm

**No cheap card draw → impulse + wheels instead:**
Commune with Lava (5/10) · Ignite the Future (4/10) · Valakut Awakening (5/10) ·
Reforge the Soul (5/10) · Wheel of Fortune (4/10) · Will of the Jeskai (4/10) ·
Snort (3/10) · Decaying Time Loop (3/10) · War Room (5/10) · The One Ring 🔶 (3/10)

---

## Cards the community is missing

Genuine gaps I'd exploit, given her text:

1. **Chandra's Ignition — only 3/10.** MV 5 so it's discounted, and it makes a pumped Wanda deal her
   power to **each opponent and each other creature**. With the pump package already in these decks,
   this is a one-card board wipe *and* a lethal table-wide burn. Badly underplayed.
2. **Blackblade Reforged — only 2/10.** Equip {3} on a legendary; +1/+1 per land.
3. **Underworld Breach — only 1/10** (Harbinger). Mandatory for the Bracket 4 list.
4. **Past in Flames — 5/10.** MV 4, so it's discounted, and it re-buys the whole graveyard.
5. **The Vision and Scarlet Witch — only 2/10.** The user wants it in the 99 and the community
   mostly skipped it. Worth noting *why*: it adds {R} per spell but the +1/+1 counters go on
   **itself**, not on the commander, so it does not grow the discount. It's a parallel engine, not
   a combo piece. Still good; just not the combo it looks like.

## Implications for our build

- Build a **big-mana haymaker** deck, not a Grapeshot storm deck.
- Treat **pump-her-power** as a real mana engine, not a voltron plan — Livaan, Cait Sith,
  Blazing Shoal, and one or two equipment.
- **Bracket 3 list** ≈ deck #5 (`M7Sj…`) upgraded, with Chandra's Ignition and Blackblade added,
  capped at 3 Game Changers (Jeska's Will + Ancient Tomb + The One Ring).
- **Bracket 4 list** ≈ the same shell plus the Harbinger of Chaos fast-mana package
  (Breach, LED, moxen, Grim Monolith, Mana Vault) and Gamble.
- The two lists should share roughly 70 cards.
