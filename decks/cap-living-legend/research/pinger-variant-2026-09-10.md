# Pinger / damage-doubler variant — feasibility study (2026-09-10)

Pilot's question: *"we didn't take advantage of any tap-deal-damage creatures with damage doublers or
triplers — do we have enough to build a separate version like that?"*

## Verdict

**The doubler half is impossible in these colours; a counters-as-ammunition version is buildable.**

### 1. Damage doublers do not exist in Azorius (measured)

Scryfall, `f:commander` + "double that damage" / "twice that much damage" / "that much damage plus" /
triple wording: **62 cards. 3 are W/U-legal, and all 3 are dead here:**

| Card | Why it does nothing for pingers |
|---|---|
| Inquisitor's Flail | "combat damage" only, one equipped creature |
| Pyromancer's Gauntlet | red instants, sorceries and planeswalkers only |
| Goblin Charbelcher | not a doubler in this sense (Mountain clause) |

The other 59 all need red. Living Legend's colour identity is locked to W/U. This is the painful
version of the ledger's "a damage multiplier belongs where damage is FLAT" entry — pinger damage is
the flattest damage in the game, so this is exactly where doublers would shine, and they are
unavailable.

### 2. The pinger pool is real but thin

`t:creature o:"{T}" o:"damage to"` returned 54 cards. After reading every oracle:

- **Repeatable face / any-target pingers (11):** Prodigal Sorcerer, Rootwater Hunter, Zuran
  Spellcaster, Thornwind Faeries (flying), Suq'Ata Firewalker, Samite Archer, Mawcor (3/3 flier),
  Pirate Ship, Endbringer (5/5, untaps itself on others' turns), Witch Hunter (player/PW only),
  Stuffy Doll (one chosen player only). Almost all deal **1** and are **1/1s for three**.
- **Turn-restricted** ("only during your turn, before attackers"): Capricious Sorcerer, Apprentice
  Sorcerer, Wu Longbowman — Drumbellower adds nothing to them.
- **Self-destroying:** Psionic Entity, Psionic Sliver (2 to target, 3 to itself, toughness 2).
- **Combat-only** (hit attacking/blocking creatures — removal, not a clock): Kongming's Contraptions,
  Brigid, Heavy Ballista, Ballista Squad, Arcbound Javelineer, Dawnray Archer, Takeno's Cavalry,
  Trap Digger and others.
- **False positives:** prevention text (Sokrates, Beacon of Destiny, D'Avenant Healer, Charm
  Peddler); Wall of Forgotten Pharaohs needs a Desert.
- **Field:** none of these appear on Living Legend's EDHREC page.

**Flat-pinger math (verified by mtg-rules-expert):** a Prodigal Sorcerer makes 2 activations on your
turn (commander untap) + 1 per opponent's turn with Drumbellower = **5 damage per round** in a
four-player pod. Caveat: summoning sickness lasts until *your next turn begins* (CR 302.6), so
Drumbellower does nothing for a pinger in the round it's cast. Six pingers ≈ 30 per round against
120 combined life — four-plus rounds, on 1/1 bodies one sweeper erases.

### 3. The UW version that works: +1/+1 counters as ammunition

Azorius cannot double damage, but it *can* amplify counters, and counters convert 1:1 into damage.

- **Tap engines already in the main list:** Iron Spider ("{T}: +1/+1 counter on each artifact
  creature and/or Vehicle") and Steel Overseer ("{T}: ... each artifact creature"). The commander
  doubles both; Drumbellower and Unwinding Clock both hit them (artifact creatures).
- **The white "doubler": Lae'zel, Vlaakith's Champion** — "put that many plus one ... on that
  permanent." **Verified per-permanent** (CR 614.1, 616.1): one Iron Spider activation gives *every*
  artifact creature 2. Does not apply to an uncrewed Vehicle (not a creature, CR 301.7). Walking
  Ballista enters with X+1 (614.1c, 122.6). A second "+1" effect (Prairie Dog) is additive: 1 → 3.
- **Converters:** Walking Ballista (remove a counter: 1 damage, no `{T}` so no summoning sickness,
  any time you have priority), Triskelion, Monoskelion, Triskelavus.

**Counter math (one Walking Ballista, Iron Spider + Steel Overseer + Lae'zel):**
- Your turn: 2 activations each × 2 counters = **8**.
- Each opponent's turn (Drumbellower / Unwinding Clock): 1 activation each × 2 = 4, × 3 = **12**.
- **≈ 20 damage per round from one Ballista** — four Prodigal Sorcerers' worth — aimed anywhere, at
  instant speed, doubling as removal. Marvin copying Iron Spider's ability adds ~10 more. Every other
  artifact creature grows by the same amount, and Iron Spider's second ability turns spare counters
  into cards.

### 4. Stuffy Doll — the one true UW damage multiplier, and its trap

- Roaming Throne (naming Construct) + Delney make its "whenever dealt damage" trigger fire **3×**
  (CR 603.2d — trigger-doublers add, never compound). A Ballista ping on the Doll becomes 3 to the
  chosen player. But it hits **one** chosen player only.
- **Delney fights the counters engine:** it only applies to creatures with power 2 or less, checked
  when the ability triggers — Iron Spider's counters push the Doll out of range.
- **Never pair Stuffy Doll with Guilty Conscience.** Verified mandatory loop — no "may" on either
  card — that runs until the chosen player loses (CR 704.5a, 732). Any damage to the Doll starts it,
  including a Ballista ping. That is an automatic, unstoppable kill under the pilot's loop policy.

### 5. What a separate variant would need

Genuinely good new pieces available: Walking Ballista, Triskelion, Monoskelion, Lae'zel, Mikaeus
the Lunarch, Abandoned Air Temple (land: {3}{W},{T} counter on each creature), The Fifth Doctor (end
step counters AND untaps), Cathars' Crusade, Archangel of Thune, Aetheric Amplifier, Prairie Dog,
Filigree Vector, Endbringer, Thornwind Faeries, Mawcor, Prodigal Sorcerer, Stuffy Doll, Roaming
Throne. About eighteen — enough to fill a variant's theme slots on top of the engine the main list
already runs (Iron Spider, Steel Overseer, Drumbellower, Unwinding Clock, Thousand-Year Elixir,
Marvin). Already owned elsewhere: Walking Ballista (SLD) 58 and Roaming Throne (MAR) 99 are in the
global reserve (Ultron and others run them).

Against a full separate deck: the kill is ~20 per round spread over 120 life (three-plus rounds),
where the Vehicles build kills in one Shuri + Parhelion swing; and the whole board is small artifact
creatures, which a single artifact wipe or Farewell ends — while Vehicles dodge sorcery-speed wipes.
