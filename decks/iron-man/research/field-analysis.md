# Field analysis — 7 sample Iron Man decks

Measured 2026-08-07 from the links in `~/Desktop/iron-man decks`. Raw lists archived in
`../samples/`. Method: pulled each list via API, priced every card through the local Scryfall
tool, then tiered by price **before** counting anything — so a card that appears often only
because it is cheap can't masquerade as consensus.

## The tiers

| Deck | Price | Commander | Tier |
|---|---:|---|---|
| I love you 3000 | $1,369 | Tony Stark | **Optimized** |
| Tin Man | $899 | Tony Stark | **Optimized** |
| Tico MTG | $810 | Tony Stark | **Optimized** |
| Iron Man | $697 | Tony Stark | **Optimized** |
| One Punch | $645 | Tony Stark | **Optimized** |
| $100 Budget Voltron | $128 | Tony Stark | *Budget — do not count as field signal* |
| $100 Iron Man B2 (Archidekt) | $163 | **Iron Man, Titan of Innovation** | *Different commander — excluded* |

The Archidekt list is a **different commander entirely**. So is the
`~/Desktop/iron-man-suggestions.txt` file — every card in it is justified by Titan of
Innovation's attack trigger ("since ironman taps the artifact", "when you sack it to ironman",
"draw a card when you make a treasure"). Neither describes Tony Stark. Both excluded from field
counts; the suggestions file is still mined for individually-good cards in `decisions.md`.

**Field signal is therefore n=5**, all optimized, all Tony Stark.

## The finding that changed the build

| Deck | Price | Equipment | Artifacts MV6+ |
|---|---:|---:|---:|
| I love you 3000 | $1,369 | 14 | **10** |
| Tin Man | $899 | 19 | **8** |
| Tico MTG | $810 | 13 | **10** |
| Iron Man | $697 | 12 | **5** |
| One Punch | $645 | 14 | **10** |
| *$100 Budget Voltron* | *$128* | *22* | *3* |

**Every unconstrained list is hybrid** — 12–19 Equipment *and* 5–10 fat artifacts. The budget
deck is the only one that looks like pure Equipment voltron, and that is a price artifact, not a
design choice: Darksteel Forge ($46), Portal to Phyrexia ($45) and Blightsteel Colossus ($39) are
exactly the cards a $100 cap removes, and cheap Equipment is what backfills the slots.

Reading "most decks run lots of Equipment and few fatties" off the whole sample would have
inverted the actual consensus. This is the trap the tiering exists to catch.

## Quality metrics (optimized tier only)

| | I♥3000 | Tin Man | Tico | Iron Man | One Punch |
|---|---:|---:|---:|---:|---:|
| Counterspells | **5** | 3 | 6 | 4 | 3 |
| Tutors | **8** | 4 | 3 | 3 | 4 |
| Game Changers | **3** | 0 | 1 | 1 | 0 |
| Avg MV (nonland) | 3.59 | 3.31 | 3.58 | 3.26 | 3.62 |
| Lands | 37 | 38 | 34 | 38 | 37 |

**I love you 3000 wins on substance, not just price** — most tutors, near-most counterspells,
best manabase (Ancient Tomb, four fetches, Steam Vents, Mycosynth Gardens), and the only list
with a coherent extra-combat package rather than a pile of good cards. It is the chosen base.

Its 3 Game Changers (Ancient Tomb, Fierce Guardianship, The One Ring) put it **exactly at the
bracket 3 cap**, so no Game Changer can be added without going to bracket 4.

## The role table — the analysis that governed the build

Counted across the five optimized decks. This is the measurement that stopped a nine-card swap
package from going in.

| Role | **I♥3000** | Tin Man | Tico | Iron Man | One Punch | Field avg |
|---|---:|---:|---:|---:|---:|---:|
| Lands | **37** | 38 | 34 | 38 | 37 | 36.8 |
| Mana rocks | **8** | 5 | 6 | 7 | 9 | 7.0 |
| Cost reduction | **6** | 12 | 11 | 11 | 6 | 9.2 |
| Draw | **10** | 9 | 14 | 12 | 10 | 11.0 |
| Tutors | **8** | 4 | 3 | 3 | 4 | 4.4 |
| Counterspells | **5** | 3 | 6 | 4 | 3 | 4.2 |
| Removal | **4** | 4 | 3 | 2 | 2 | 3.0 |
| Equipment | **14** | 19 | 13 | 12 | 14 | 14.4 |
| Big artifacts 6+ | **10** | 8 | 10 | 5 | 10 | 8.6 |
| Extra combats | **7** | 1 | 1 | 1 | 3 | 2.6 |
| **Creatures** | **10** | 18 | 23 | 25 | 17 | 18.6 |

**The base deck's four biggest deviations are one decision, not four flaws.** Most tutors, most
extra combats, fewest creatures, lowest cost reduction — all follow from *this deck cheats
artifacts into play instead of casting them*. It doesn't need cost reduction because its nine-drops
arrive free; it runs double the tutors because finding the specific piece matters more than having
cheap ones; and it stays creature-light **so its own Blasphemous Act and Extinguisher Battleship
are close to one-sided**.

Every other deck in the sample is a *cast-artifacts* deck. This is a *cheat-artifacts* deck — the
outlier because it's the most committed.

**Consequence for the build:** a package adding Shuri, Emry, Jhoira, Padeem, Foundry Inspector and
Etherium Sculptor would have moved creatures 10 → 14 and cost reduction 6 → 9. That isn't an
upgrade; it converts this list into the *average* deck in the sample and makes its own sweepers
worse. It was dropped. **Nine changes were accepted in total** — six inside the Equipment,
interaction, creature and draw slots, plus a three-card manabase pass. Creature count (10),
artifact count (41), land count (37) and Game Changer count (3/3) are all unchanged from the base.

## Consensus staples (4+/5) present in the final list

Academy Ruins · Adaptive Omnitool · An Offer You Can't Refuse · Arcane Signet · Archway of
Innovation · Armor Wars · Blasphemous Act · Buster Sword · Cascade Bluffs · Command Tower ·
Commander's Plate · Counterspell · Darksteel Citadel · Darksteel Forge · Excalibur, Sword of Eden ·
Fabricate · Genji Glove · Great Furnace · Inventors' Fair · Krang, Utrom Warlord · Mjölnir, Hammer
of Thor · Seat of the Synod · Shivan Reef · Silverbluff Bridge · Simulacrum Synthesizer · Sol Ring ·
Steam Vents · Stormcarved Coast · Sulfur Falls · Swan Song · Talisman of Creativity ·
The Reaver Cleaver · Thran Dynamo · Training Center · Uthros, Titanic Godcore

## Consensus staples deliberately NOT run

These lost on the role table, not on card quality — the deck has no hole for them.

- **Shuri** (4/5), **Emry** (4/5), **Jhoira** (4/5), **Foundry Inspector** (3/5), **Etherium
  Sculptor** (3/5), **Ironheart** (3/5) — all cost reduction or cheap creatures. Adding them
  breaks the low-creature / one-sided-sweeper coherence described above.
- **Swiftfoot Boots** (4/5) — hexproof is covered by Champion's Helm; a second source is
  redundant.
- **Lightning Greaves** (3/5) — grants *shroud*, which stops you equipping your own commander.
- **Vandalblast** (3/5), **Reliquary Tower** (3/5), **Padeem** (3/5), **Cyberdrive Awakener**
  (3/5), **Ultron** (3/5), **Iron Man, Master of Machines** (3/5), **Iron Man, Bleeding Edge**
  (3/5), **Enthusiastic Mechanaut** (3/5) — reasonable, lost slot competition. The closest sit in
  `../SIDEBOARD.md`.
