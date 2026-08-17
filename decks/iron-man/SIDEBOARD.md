# Iron Man — sideboard

Single source of truth for cards held outside the 100. Every entry names what it **displaces**.

The deck is at **exactly 100** with **3/3 Game Changers**, so any Game Changer you promote is a
fourth and takes the deck to bracket 4.

---

## Bracket 4 upgrades

| IN | OUT | Why | Bracket |
|---|---|---|---|
| **Grim Monolith** ($471) | Mind Stone | `{2}` for `{C}{C}{C}`. Pulls the flip turn forward. | ★GC — **4 of 3** |
| **Mana Vault** ($121) | Thought Vessel | Same, cheaper. | ★GC — **4 of 3** |
| **Cyclonic Rift** ($41) | Strix Serenade | Clear the way and swing. | ★GC — **4 of 3** |
| **Urza, Lord High Artificer** ($16) | Cursed Mirror | Construct token, artifacts tap for `{U}`, `{5}` impulse sink. Taps artifacts for mana, so it partly replaces a rock. Not a Game Changer. | stays 3 |

**Already at 3.5:** the maindeck keeps **Aggravated Assault**, which goes infinite with *two*
Equipment the commander attaches for free — The Reaver Cleaver (damage → Treasures → pay
`{3}{R}{R}`) and Sword of Feast and Famine (damage → untap all lands → pay again). WotC permits
bracket 3 decks where *"the long game could end with one being deployed"*, and with 7 extra-combat
effects the card is core to the design — but it's redundantly assembled. **Cut Aggravated Assault
for Master Transmuter** if a pod wants a strict bracket 3.

---

## Situational

| IN | OUT | Bring in when |
|---|---|---|
| **Vandalblast** ($1) | Galvanic Blast | Another artifact deck in the pod. Overload `{4}{R}` is a one-sided wipe in the mirror. |
| **Rogue's Passage** | Fomori Vault | Fliers and reach at the table. `{4},{T}` for unblockable is the guaranteed connection when trample isn't enough. |
| **Darksteel Plate** ($7) | Champion's Helm | Heavy damage-based sweepers. A second indestructible source, and it makes your own Blasphemous Act fully one-sided. |
| **Shimmer Myr** ($0.37) | Cursed Mirror | Counterspell-heavy pods. Flash on all artifacts means you deploy at end of turn. |
| **Ultron, Artificial Malevolence** ($13) | Phyrexian Metamorph | Grindy tables. Pay `{2}` to copy each nontoken artifact that enters. **Copies of legendary artifacts die to the legend rule**, so it's best with Darksteel Forge, Portal to Phyrexia, Simulacrum Synthesizer. |
| **Cyberdrive Awakener** ($2) | Cursed Mirror | Wide artifact board and you need a surprise kill — every noncreature artifact becomes a 4/4 flier. |
| **Padeem, Consul of Innovation** ($2) | Professional Face-Breaker | Targeted-removal-heavy pods. Hexproof for **all** your artifacts — the back face is an Artifact Creature, so it covers the commander. Costs you a creature slot, which makes your own sweepers slightly worse. |
| **Trophy Mage** ($0.76) | Solve the Equation | If you want a body attached to your tutor. 8 live targets, including Mithril Coat. |

---

**If you ever need a slot**, the lowest-value remaining cards by field signal are **Big Score**
(1/5) and **Cursed Mirror** (2/5). Do **not** raid the Treasure package (Knuckles, Professional
Face-Breaker, The Reaver Cleaver, Iron Man Titan of Innovation, Great Train Heist, Treasure Vault) —
it feeds 10 artifact-count payoffs.

## Evaluated and passed — with the grounds, so they can be re-checked

- **Liquimetal Torque** — 1/5 field, taps only for `{C}`, and *"target nonland permanent becomes an
  artifact"* is near-dead with no maindeck artifact removal. Bring it back alongside Vandalblast if
  you want the "turn their bomb into an artifact, then blast it" line.
- **Sword of Fire and Ice** — **maindecked**, not passed. Kept on the user's call over Liquimetal
  Torque. Its pro-red clause and Mjölnir are mutually exclusive *on the commander* (CR 702.16d);
  see `research/decisions.md` for how to pilot around it.
- **Kaldra Compleat / Nettlecyst** — Living weapon (CR 702.92a) attaches them to their own Germ
  token, and all their bonuses sit on the equipped creature. Fine as standalone threats, useless as
  voltron payload. **Note: Hexplate Wallbreaker is NOT in this category** and is maindecked — its
  untap and extra-combat clauses are global, so it works from a token.
- **Lightning Greaves / Whispersilk Cloak** — grant **shroud**; you could no longer equip or target
  your own commander. The free combat attach still works (CR 701.3a — attaching doesn't target),
  but nothing else does.
- **Gauntlet of Power** — symmetric on both clauses (*"creatures of the chosen color"*, *"its
  controller adds"*) and the mana half only reads **basic** lands, of which the deck runs 10.
- **Iron Man, Tony Stark** — **now maindecked.** Passed initially, reversed once Roaming Throne
  made it a third doubled Hero trigger. See `research/decisions.md`.
- **Hulking Metamorph** — 1/5 field, `{9}` or prototype `{2}{U}{U}` for a copy of something you
  already control. Cut for Iron Man, Tony Stark.
- **Vision of Love** (`{1}{R}`, $0.21) — instant, sacrifice an artifact or discard to draw two.
  Genuinely good with 6 Treasure makers, and the sacrifice feeds Goblin Welder / Goblin Engineer /
  Academy Ruins. Lost to **Insight Engine**, whose charge counters accumulate — `{2}` for 1 card,
  then 2, then 3 — so it out-draws a one-shot from the third activation on, and it's an artifact.
  Bring Vision of Love in over **Big Score** (1/5) if you want more instant-speed draw.
- **Mana Geyser** — a sorcery, so opponents' lands are mostly untapped on your main phase; and the
  commander already deploys your expensive cards free.
- **Machine God's Effigy** — the obvious line (copy the commander) is blanked by the legend rule.
- **Panharmonicon** — does **not** double the commander's trigger; it only doubles triggers caused
  by something *entering*. Roaming Throne is the card that does the job.
- **Worldwalker Helm** — needs a token engine, not loose token sources.
