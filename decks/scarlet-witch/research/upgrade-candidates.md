# Scarlet Witch — Upgrade candidates

A Scryfall sweep across every functional role in the deck, run 2026-08-04 against the locked 100
in `DECK.md`. Everything here is mono-red colour identity and Commander-legal (verified via
`bun run scripts/card.ts search`). Prices are Scryfall USD at time of search.

Ordered by how much I think each would actually change the deck.

---

## Tier 1 — I'd find room for these

### 🥇 Gauntlet of Power — {5}, $4.30

> As this artifact enters, choose a color. Creatures of the chosen color get +1/+1.
> **Whenever a basic land is tapped for mana of the chosen color, its controller adds an
> additional one mana of that color.**

**Every Mountain taps for {R}{R}.** You run **21 basics**, so this roughly doubles your land mana
for the rest of the game — and because Electro and Ashling **bank red**, the extra mana isn't lost
even on turns you don't spend it.

Two caveats, both real:
- It says **basic** land. Castle Embereth, Mines of Moria, Valakut and Arena of Glory don't benefit.
- It's **symmetric** — "*its* controller." An opponent with basic Mountains gets it too. Rare
  outside a red mirror, but check the table.
- Five mana that does nothing the turn it lands.

**Would replace:** Tablet of Discovery, or a slower rock.

### 🥈 Fire Servant — {3}{R}{R}, 4/3, **$0.39**

> If a **red instant or sorcery spell** you control would deal damage, it deals **double** that
> damage instead.

Thirty-nine cents for a damage doubler. It hits **Crackle with Power, Jaya's Immolating Inferno,
Chandra's Ignition, Fiery Confluence, Electrodominance, Volcanic Vision** — all sorceries or
instants.

It does **not** double Thor, Longshot or Fiery Inscription, because those are *permanents'
abilities*, not spells. That's the difference from Fiery Emancipation, which doubles everything.

**But it stacks multiplicatively with Fiery Emancipation: 2 × 3 = 6× on your X-spells.** Crackle at
X=4 would be 120 damage per target.

Same fragility knock as Solphim — it's a creature. But at 39 cents versus $27, the cost of it
eating a Bolt is very different.

### 🥉 Artist's Talent — {1}{R} Class, $5.50

> **Level 1:** Whenever you cast a noncreature spell, you may discard a card. If you do, draw a card.
> **Level 2** ({2}{R}): **Noncreature spells you cast cost {1} less to cast.**
> **Level 3** ({2}{R}): If a source you control would deal noncombat damage to an opponent or a
> permanent an opponent controls, it deals that much damage **plus 2** instead.

A **third cost reducer** alongside Ruby Medallion and Longshot — and the only other one in
mono-red besides Primal Amulet. Level 1 loots on every spell (fuelling Past in Flames), and
Level 3 adds +2 to every instance of damage, which is enormous with the per-spell pingers.

Two of the eleven sample decks ran it. Levelling all the way costs {1}{R} + {2}{R} + {2}{R} = 9
mana total, but you get value at each stage.

---

## Tier 2 — genuinely strong, situational fit

### Delayed Blast Fireball — {1}{R}{R}, $16.13

> Deals **2** damage to each opponent and each creature they control. **If this spell was cast from
> exile, it deals 5 instead.** Foretell {4}{R}{R}.

You cast from exile constantly — **Commune with Lava, Ignite the Future, Wiccan, Improvisation
Capstone, Apex of Power, Hex Magic** all set this up. So it's routinely **5 to each opponent and a
one-sided-ish sweep for three mana.**

### Fury Storm — {2}{R}{R}, $4.68

> When you cast this spell, **copy it for each time you've cast your commander from the command
> zone this game.** Copy target instant or sorcery spell.

Wanda gets recast a lot. After two recasts this is **three copies of your Crackle** for four mana.
It gets better the more the table kills your commander — which turns a weakness into a payoff.

### Primal Amulet // Primal Wellspring — {4}, $12.71

> Instant and sorcery spells cost {1} less. After four charge counters, transform into a land that
> taps for mana which **copies** the spell it pays for.

A cost reducer that becomes a second Pyromancer's Goggles. Four mana is slow, but it's two of your
best effects on one card.

### Reverberate — {R}{R}, $3.01 · Flare of Duplication — {1}{R}{R}, $1.63

Straight extra copy effects. Flare can be cast **free** by sacrificing a nontoken red creature —
relevant when Fire Servant or a spent Livaan is about to die anyway.

### Twinning Staff — {3}, $19.88

> If you would copy a spell one or more times, instead copy it **that many times plus an
> additional time.**

Multiplies every copy effect you own. Repeated Reverberation goes from two copies to three;
Storm King's Thunder from X to X+1. Does nothing on its own, so it's a build-around.

### Lithoform Engine — {4}, $7.65

{3}, {T}: copy an instant or sorcery. **Repeatable every turn**, and it also copies *abilities* —
including Nykthos's devotion tap and Valakut's trigger.

---

## Tier 3 — worth knowing, probably not worth a slot

| Card | Cost | Why it's interesting | Why I'd skip it |
|---|---|---|---|
| **Chandra, Torch of Defiance** | {2}{R}{R} | +1 adds {R}{R}, or exiles the top card to cast; −7 emblem is 5 damage per spell | Planeswalkers eat attacks in a deck with no blockers |
| **Curse of Bloodletting** | {3}{R}{R} | Doubles **all** damage to one enchanted player | Five mana aimed at a single opponent |
| **Bitter Feud** | {4}{R} | Choose two players; damage between them doubles — pick yourself and the archenemy | Symmetric between the chosen pair |
| **Fated Firepower** | {X}{R}{R}{R} | **Flash**; +X damage to every instance you deal to opponents | You'd rather spend that X on Crackle |
| **Rite of Flame** | {R} | {R} → {R}{R}; cheapest ritual to hold up | Net +1, same as Pyretic Ritual |
| **Inner Fire** | {3}{R} | {R} per card in hand — big after Hex Magic | Dead when your hand is empty, which is exactly the kill turn |
| **Goblin Dark-Dwellers** | {3}{R}{R} | ETB free-cast an instant/sorcery MV ≤ 3 from the yard | Free-cast → **X = 0** on X-spells |
| **Vance's Blasting Cannons** | {3}{R} | Upkeep impulse, flips into a land that pings 3 | Slow; one card a turn |
| **Soul Immolation** | {3}{R}{R} | X to each opponent **and each of their creatures** | Additional cost puts −1/−1 counters on your own creature |
| **Glóin, Dwarf Emissary** | {2}{R} | Treasure per historic spell | Once per turn only |

---

## Explicitly rejected, and why

- **Barbarian Ring · Fogwell's Gym** — both deal 1 damage to you per tap. **Mono-red has
  essentially no lifegain** (a format-wide search returns three unplayable cards), and the deck
  already bleeds 15–25 a game from Ancient Tomb, The One Ring, War Room and Shatterskull Smashing.
- **Ramunap Ruins** — costs 1 life for red, isn't a Mountain so it misses Valakut.
- **Spinerock Knoll** — enters tapped, and its free-cast forces **X = 0** on your six X-spells.
- **Backdraft Hellkite · Dreadhorde Arcanist** — both require **attacking**. You don't attack.
- **Brightstone Ritual · Battle Hymn · Geosurge** — scale off Goblins / creature count / creature
  spells only. None fit.
- **Locket of Yesterdays · Seal of the Guildpact · Jhoira's Familiar** — cost reduction keyed to
  duplicate names, multicolour, or historic. Wrong deck.
- **Infernal Plunge** — sacrifices a creature, and your creatures are engines.
- **Gauntlet of Might** — same effect as Gauntlet of Power but Reserved List and enormously
  expensive. Take the Power.
- **Ojer Axonil, Deepest Might** ($23) — a damage **floor** of 4, not a multiplier, and it
  *cancels out* with Fiery Emancipation. Rule 616.1 lets the **affected player** order replacement
  effects, so an opponent taking damage always picks Emancipation-first (2 → 6, floor no longer
  applies) over floor-first (2 → 4 → 12). With Emancipation out, Ojer contributes zero. It also
  misses every X line, since Crackle deals 5X.
- **Young Pyromancer · Prismari Pianist · Goblinslide · Manaform Hellkite** — token-per-spell chump
  blockers. Fiery Confluence (3 to each creature) and Chandra's Ignition ("each *other* creature")
  wipe your own tokens, and 1/1s don't stop Commander-sized attackers. Manaform Hellkite is worse
  still: its X/X scales with mana **actually spent**, so Wanda's discount shrinks your own token.
- **Crawlspace / Silent Arbiter** — real defensive options, both sideboarded; lost to **Kazuul,
  Tyrant of the Cliffs** (seated 2026-08-06) on price and on doing nothing when nobody attacks.

### Known but not seated

**Torbran, Thane of Red Fell** — {1}{R}{R}{R}, 2/4, $4.27.

> **Corrected 2026-08-07.** This entry originally called Torbran "the version of Ojer that works,"
> which framed it as filling a gap. It isn't. **Artist's Talent Level 3 — already in the deck —
> reads *"if a source you control would deal noncombat damage to an opponent or a permanent an
> opponent controls, it deals that much damage plus 2 instead."*** Torbran's only differences are
> that it covers *combat* damage and restricts to *red* sources. In a mono-red deck that never
> attacks, **those are the same card.** Torbran would be a second copy, not a first.

The mechanical facts still stand and are worth keeping: an **additive** booster nets +2 per instance
even under Fiery Emancipation (the opponent's best ordering is 2 → 6 → 8, still better than 6), and
it boosts damage to **permanents opponents control**, which turns Fiery Confluence's "1 damage to
each creature" into a one-sided 3-to-theirs, 1-to-ours sweeper.

**What that means in practice:** two additive boosters *do* stack (+2 and +2 = +4, neither has a
threshold), so Torbran isn't worthless — and Artist's Talent needs 9 total mana to reach Level 3, so
redundancy for an expensive unlock is a real argument. But it's redundancy, not a gap.
**Revisit trigger:** a game where you reach Artist's Talent L3 and want a second copy of it.

---

## If I had to pick three

1. **Gauntlet of Power** — the single biggest mana upgrade available to a 21-Mountain deck.
2. **Fire Servant** — 39 cents, doubles every X-spell, stacks with Fiery Emancipation for 6×.
3. **Artist's Talent** — a third cost reducer, plus looting, plus +2 to every damage instance.

Nothing here is a *strict* upgrade over a current card — the deck is tight. These are all
"different axis" improvements, and each one costs a slot.

## How this was researched

```bash
bun run scripts/card.ts search 'id<=r f:commander o:"..."'
```

Roles swept: cost reduction · per-spell mana engines · rituals and mana doublers · commander pump ·
impulse draw and wheels · spell copying · graveyard recursion · X damage to each opponent ·
damage multipliers and floors · protection and uncounterable · red utility lands.
