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
