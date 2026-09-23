# Counters variant — a second way to play Living Legend (2026-09-10)

> **Superseded 2026-09-10 by v2** — the list was rebuilt as a lifelink voltron after the pilot's audit. This study still holds for its facts (draw → counter rules, clock model); the card choices changed. See `decisions.md`, 2026-09-10 v2 entry.


Pilot: *"the deck is mostly built around crewing or stationing big vehicles — what are the other win
cons if we don't draw those? Cap can't reliably attack. Is there another tap/untap engine doing
something else — +1/+1 counters, grow something big, draw off the counters, then hose the counters
across the table, one big unblockable Cap, or a wide board?"*

## 1. The current list's real weakness is card type, not draw consistency

- 20 finisher-or-tutor cards in 99. P(at least one seen, natural draws only — ignoring the ten draw
  engines): **88% by turn 3 · 91% by turn 4 · 96% by turn 7.** Not drawing a finisher is rare.
- **13 of the 17 finishers are artifacts.** One Vandalblast / Austere Command (artifact mode) /
  Farewell / Bane of Progress blanks the plan, leaving a 3/4 commander as the only threat.
- So a second plan should be a **different card type** — creatures and enchantments — not more
  Vehicles.

## 2. The engine: draw -> counters (Cap is the thing to grow)

This deck already draws several cards a turn, and CR 121.2 makes "draw two" two separate draws, so
every "whenever you draw a card" permanent fires once per card.

| Role | Cards (all oracle-verified) |
|---|---|
| Draw -> counter on target | Iron Man, Armored Avenger · Lyla, Holographic Assistant · Stark's Ingenuity (Aura on Cap) · Wizard Class (L3) · Proft's Eidetic Memory · Bard the Bowman (2nd card each turn) |
| Tap engines the commander untaps | Agent Phil Coulson ({T}: +1 on each other **Hero** — Cap is one) · Keensight Mentor ({1}{W},{T}: each creature with **vigilance** — Cap has it) · Mikaeus, the Lunarch |
| Amplifier | Lae'zel, Vlaakith's Champion (+1 per placement, per permanent — verified) · Prairie Dog |
| Counters -> cards | Dusk Legion Duelist · Exemplar of Light · Benthic Biomancer (loots per placement) · Brigone ({T}, remove a counter: draw — doubled) · Iron Spider ({2}, remove two: draw) · Shang-Chi and the Ten Rings (10th counter: draw five) · Toothy (leaves: draw per counter) |
| Insurance | The Ozolith — counters from a creature that leaves go onto it and move to target creature each combat, so a recast Cap gets them back |

Field: the "+1/+1 Counters" theme on his EDHREC page is 9 decks and is the same artifact build
(Silver Myr, Dawnsire, Iron Spider). Only Mikaeus (27%) appears. Personal tech — judged on merit.

## 3. Clock model — one big Cap, attacking one opponent unblocked

Assumptions: Cap starts 3/4; three draws on your turn; one extra draw on each opponent's turn
(Drumbellower/Unwinding Clock untapping draw engines); counters placed on opponents' turns count on
your next swing.

| Package | Lethal 21 commander damage on |
|---|---|
| Iron Man only | swing **3** (6 → 9 → 12) |
| Iron Man + Agent Phil Coulson | swing **2** (8, then 19) |
| + Lae'zel | swing 2 (13, then 35) |
| + Urdnan's double strike | swing 2 (16, then 38) |

Commander damage is combat damage only (ledger, 2026-09-02), so the accelerants are double strike
and unblockability — not damage multipliers.

## 4. The three finishes the pilot named, ranked

1. **One big unblockable Cap — recommended spine.** Evasion via `{T}` abilities the commander doubles:
   K-9, Mark I ({1}{U},{T}: target *legendary* creature can't be blocked), The Destined Thief
   ({U},{T}), Key to the City, plus Rogue's Passage already in the list. Double strike: Urdnan
   (target attacking creature with 2+ counters). Protection, also `{T}`-doubled: Mother of Runes
   (56% of the counters-theme sample), Patriot, Shield Wielder ({2},{T}: +2/+0 and hexproof),
   Kid Loki (hexproof on any creature you put counters on this turn), Captain America, Super-Soldier.
2. **Hose the counters across the table** — Walking Ballista fed by Iron Spider / Steel Overseer /
   Lae'zel (~20 damage per round, see `pinger-variant-2026-09-10.md`). A secondary outlet that doubles
   as instant-speed removal.
3. **Wide board** — Nadir Kraken (pay {1} per draw: counter + Tentacle token), Cathars' Crusade,
   Captain America, Skybound (battalion: counters + indestructible), Twenty-Toed Toad (alt win when it
   attacks with 20 counters or 20 cards in hand). Third: needs the most pieces and one sweeper resets it.

## 5. Size of the change

24 cards exist only for the Vehicle/Station plan and would leave (10 Vehicles/Spacecraft, Shuri,
Mu Yanling, Kotori, Hotshot Mechanic, Cloudspire Captain, Prodigy's Prototype, Krang, Sram, Lita,
Simulacrum Synthesizer, Halo Fountain, Mech Hangar, Adagia, Uthros). **70 names carry over** —
ramp, draw engines, untappers, interaction, protection, lands. Same deck, different top end.

## 6. Two ways to use this

- **A separate list, `DECK-COUNTERS.md`.** Recommended: the two plans pull in opposite directions
  (Vehicles want many small crew bodies; voltron Cap wants protection and evasion on one body).
- **A hedge inside the main list** — 2–3 non-artifact cards that survive an artifact wipe: Stark's
  Ingenuity, Agent Phil Coulson, K-9 or The Destined Thief. Note Iron Man and Lyla are *artifact*
  creatures, so they are the wrong hedge for the main list's actual weakness.
