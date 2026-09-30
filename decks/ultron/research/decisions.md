# Ultron — Decision log

Append-only. Record the **grounds**, not just the verdict — the next reader's job is to re-derive
(deck-brain §1.1b). Raw EDHREC pulls for this build: `edhrec-2026-09-03.txt`.

---

## 2026-09-03 — Founding build (Bracket 3, 100 cards)

### The brief

Pilot: *"an artifacts deck with Ultron, Artificial Malevolence as the commander. Playing the Iron
Man deck highlighted that I like playing artifacts, so this would be purely an artifact and copying
deck, not voltron."* Second artifact deck alongside `decks/iron-man`; everything proxied, same
Bracket 3 / 3-Game-Changer envelope as the other lists.

### The commander, read from the oracle text

`{3}` Legendary Artifact Creature — Robot Villain 2/4. *"Whenever another **nontoken** artifact you
control enters, you may pay {2}. If you do, create a token that's a copy of it. If the token isn't a
creature, it becomes a 2/2 Robot Villain creature in addition to its other types."*

Three consequences that shape every slot:

1. **Colour identity is colourless** — the pool is `id=c` only. That is a Tron/Eldrazi/artifact
   shell by rule, not by choice.
2. **Every nontoken artifact is a {2} option on a second copy.** So the deck wants *artifacts
   whose second copy is worth two mana*: rocks (a token Thran Dynamo is a permanent +3), cost
   reducers (a token Foundry Inspector is another −1), and ETB artifacts (a token Portal to
   Phyrexia is a second triple edict). Vanilla bodies and Equipment are the worst copy targets —
   an Equipment token is a 2/2 that can't equip (CR 301.5c).
3. **The tokens are Robot Villain creatures.** Ultron, Machine Overlord (+2/+2 Robots and
   Constructs), Steel Overseer, Chief of the Foundry and Krang all read them. That is the go-wide
   plan the pilot didn't have to ask for.

### How the field builds him (EDHREC, 4,447 decks, rank #638)

Themes: Artifacts 291 · Tokens 115 · Clones 83 · Combo 63 · Affinity 37 · Ramp 33 · Robots 25.
Bracket mix on the page is the usual 2–3 average; treat every % as budget-weighted (ledger,
"Price-tier the sample field").

| Role | What the field runs (base page %) | This list |
|---|---|---|
| Mana | Sol Ring 97 · Thran Dynamo 84 · Tron lands 82–83 · Wastes 88 · Mind Stone 69 · Thought Vessel 62 · Hedron Archive 60 · Arc Reactor 57 · Palladium Myr 66 | all in, plus Mox Opal, Gilded Lotus, Chalice, Mightstone, Karn |
| Reducers | Foundry Inspector 89 · Cloud Key 80 · Jhoira's Familiar 66 · Semblance Anvil 45 · Ugin, the Ineffable 54 | all five |
| Copy | Sculpting Steel 66 · Mirrorworks 24 · Prototype Portal (n/a) · Panharmonicon 39 · Echoes of Eternity 75 · Mirror Box 13 · Helm of the Host 11 · Chrome Dome 44 | all eight — this is the pilot's stated theme, so the sub-30% cards are deliberate |
| Lords / payoffs | Forsaken Monument 88 · Steel Overseer 68 · Krang 67 · Cybermen Squadron 61 · Idol of Oblivion 59 · Cryptothrall 59 · Karn Legacy 55 · Chief of the Foundry 33 · Machine Overlord 38 | all in |
| Interaction | All Is Dust 81 · Null Elemental Blast 71 · Eldritch Immunity 56 · Warping Wail 52 · Kozilek's Command 34 · Ugin EotS 44 | in, minus Immunity (sideboard) |
| Bombs | Wurmcoil 44 · Blightsteel 42 · Meteor Golem 40 · Battlesphere 34 · Portal 44 · Forge 46 · Leveler 22 | in |

**Theme views** (clones 83 decks / tokens 115): Cybermen Squadron 70/63%, Krang 72/70%, Idol
58/73%, Steel Overseer 64/75%, Myr Retriever 67/61%, Panharmonicon 43% (clones), Chrome Dome 52%
(tokens). The clones view raised Jhoira's Familiar to 60% and Cryptothrall to 54%.

**Reading:** the crowd builds Ultron as *Tron-ramp colourless artifacts with a token/copy
sub-theme and an Eldrazi-flavoured interaction suite*. The copy engines the pilot asked for are
the sub-theme, not the main plan, so they sit at 11–45% on the base page and 40–70% on the
clones/tokens views. This list leans into them harder than the field does (8 copy engines vs the
field's ~3), and pays for it with fewer vanilla fatties.

### Role skeleton (deck-brain §2.1)

| Role | Target | Built | Notes |
|---|---|---|---|
| Lands | 34 | 34 | Tron ×3 + Stage/Vesuva/Deserted Temple/Urza's Cave make Tron a 7-land package |
| Rocks | 12 | 12 | rocks are the turn-3/4 copy targets — the pilot's own line (ledger 2026-09-02) |
| Cost reduction | 4 | 4 (+Ugin) | reducers stack additively; the {2} copy tax is not reduced by them, but a −1 on the spell pays half of it |
| Draw | 8 | 8 (+War Room, Fomori Vault, Forge) | |
| Removal / interaction | 9 | 9 | 6 of 9 are one-sided by colour (All Is Dust, both Ugins, Null Elemental Blast, Selective family) |
| Copy engines | 8 | 8 | |
| Lords / engines | 11 | 11 | |
| Bombs / ETB | 9 | 9 | every one is a copy target with a real ETB or a real body |
| Protection / recursion | 4 | 4 | non-voltron: keep the engine alive, not the attacker |

Mana sources per deckcheck: **34 lands + 13 rocks = 47**. Three Game Changers exactly.

### Card-level grounds

- **Game Changers — Ancient Tomb, Mishra's Workshop, The One Ring.** Workshop over Mana Vault
  (22%) because it is a land that makes three every turn in a deck where ~85 of 99 cards are
  artifact spells; Vault is one burst. The One Ring's token copy resets burden counters (keep the
  token, bin the card — CR 704.5j lets you choose).
- **Mirror Box** (13%) is in on the copy axis: it turns the legend rule off for our permanents, so
  a token Krang, token Karn, token One Ring and token Ultron (via Helm of the Host) all stay, and
  each pair gets +1/+1 for sharing a name.
- **Helm of the Host** (11%): on Ultron, a nonlegendary Ultron token every combat; N Ultrons =
  N copies per artifact. Equip {5} is the price of a second commander.
- **Glaring Fleshraker** (59%): the deck's hidden clock. Each Ultron token is *"another colorless
  creature entering"* (1 to each opponent), each colourless spell makes a Spawn (another creature
  entering, another ping). Echoes doubles both. Verified: token copies (Echoes, myriad, Chrome
  Dome) do trigger Fleshraker even though they don't trigger Ultron.
- **Commander's Plate** on a colourless commander is protection from **all five colours** — the
  text reads *"each color that's not in your commander's color identity"* and a colourless identity
  contains none. Chosen over Swiftfoot Boots for that reason: it also stops damage and blocks.
- **Liberator, Urza's Battlethopter** (58%): flash for every artifact means Ultron copies at
  instant speed, and sorcery-speed wraths are cast into an empty-looking board.
- **Cybermen Squadron** (61%): myriad on every nonlegendary artifact creature — a board of Robot
  Villain tokens attacks three players at once. The myriad copies are tokens (no Ultron trigger)
  but do ping with Fleshraker.
- **Kuldotha Forgemaster**: sac three tokens → put Blightsteel onto the battlefield — a nontoken
  artifact entering, so Ultron copies it for {2}. Two 11/11 infect tramplers.
- **Sanctum of Ugin**: every colourless spell of MV 7+ (eleven in the deck) is a free tutor for
  Krang or Blightsteel.

### Rejected, with grounds

| Card | Grounds |
|---|---|
| **Basalt Monolith** | Forsaken Monument makes it infinite colourless mana (tap for {C}{C}{C}+{C}, untap for {3}); Walking Ballista is in the deck. A two-card infinite is out of the Bracket 3 brief. Sideboard for a Bracket 4 table. |
| **Krark-Clan Ironworks, Ashnod's Altar, Myr Retriever** | The Retriever/Trawler/KCI loop family. Scrap Trawler alone (returns *lesser* MV) is kept for value with no loop partner. |
| **Mana Vault, Grim Monolith** | Game Changer cap is 3 and Workshop/Tomb/Ring are the three. |
| **Lightning Greaves** (54%) | Shroud stops our own Chrome Dome, The Mycosynth Gardens, Tezzeret and Iron Spider from targeting Ultron; equip {0} isn't worth that (ledger, "Attach is not target"). Plate instead. |
| **Coveted Jewel** (18%) | *"attack you and aren't blocked → that player draws three and gains control."* The deck's blockers are 2/2 tokens that Krang wants attacking. Ichor Wellspring is the same slot without the clause. |
| **Mind's Eye** (37%) | Opponent-dependent at 5 mana; The Ten Rings and Idol of Oblivion draw on our own actions. |
| **Spine of Ish Sah** (12%) | 7 mana; Meteor Golem (copyable, 7) and Duplicant (copyable, 6) already cover targeted removal on a body. Sideboard. |
| **Tezzeret, Cruel Captain** (41%) | Loyalty from every artifact is real, but a planeswalker on a table of fliers rarely reaches −7. Sideboard; re-check if games are being lost to mana. |
| **Karn, the Great Creator** (14%) | *"Activated abilities of artifacts your opponents control can't be activated"* — a stax piece against Treasures and Sol Rings, and the −2 wish does nothing in Commander. Sideboard for a stax pod. |
| **Metalwork Colossus** (29%) | Often free, but no ETB — a {2} copy is a 10/10 with nothing attached. Blightsteel is the better 2-mana body and Thunderhulk brings tokens. Sideboard. |
| **Scrawling Crawler** (23%) | Symmetric draw; the pilot's other decks avoid group-hug shells. |
| **Rings of Brighthearth** (19%) | The Basalt combo partner; without Basalt it copies Idol/Forgemaster activations for {2} — fine, but the slot went to Panharmonicon. |
| **Mycosynth Lattice** (10%) | Turns opponents' lands into artifacts for our All Is Dust… and their Vandalblast into Armageddon on us. |
| **Eldritch Immunity** (56%) | Krang covers indestructible, Cryptothrall covers hexproof; overload {4}{C} is a Fog against coloured attackers. Sideboard. |
| **Not of This World** (9%) | Free only when protecting a power-7+ creature; too conditional next to Warping Wail. |
| **Helm of Awakening** | Symmetric; Cloud Key/Inspector/Familiar/Anvil are one-sided. |
| **Blinkmoth Urn** (8%) | Symmetric — every opponent's Treasures and rocks pay them too. |
| **Reliquary Tower** (61%) | Thought Vessel + The Ten Rings cover hand size; the slot became a tenth Wastes for the {C} pips on Echoes/Command/Wail. |

### Rules verified for this build (all in the deck-brain ledger)

- Token rocks are summoning-sick creatures (CR 302.6) — copy on turn 4, tap on turn 5.
- Token copies keep the copied ETB (CR 707.5).
- Panharmonicon + Echoes = three Ultron triggers, not four (CR 603.2d).
- Echoes' spell-copy token, myriad tokens and Chrome Dome tokens never trigger Ultron (nontoken).
- Sculpting Steel entering as a copy is a nontoken artifact entering; Ultron's token copies the
  copied card's values (CR 707.3).

### Validation

`bun run card --deck decks/ultron/DECK.md --id c` — 91/91 found, no legality or identity flags,
sticker **$1,255.45** (87/91 priced). `deckcheck`: 100 cards, 47 mana sources, 3/3 Game Changers.
`MOXFIELD.txt` regenerated. STATUS.md generated from the priced list.

---

## 2026-09-04 — Karn, Scion of Urza in, Sensei's Divining Top out (pilot's call: "see how it goes")

Snapshot: `versions/2026-09-04-before-karn-scion-of-urza.md`.

Pilot asked whether a Karn planeswalker belongs. All four were read from oracle text and scored
against the list:

| Karn | Grounds |
|---|---|
| **Scion of Urza** `{4}` — **IN** | +1 puts a card in hand every turn (opponent chooses the worse of two; −1 fetches the other later, so both arrive over two turns). −2 makes a 0/0 Construct with +1/+1 per artifact — 15/15+ midgame — that is a **Construct** (Machine Overlord +2/+2), an artifact creature (Krang, Overseer, myriad) and a colourless creature entering (Fleshraker). Field 6–8%. |
| Living Legacy `{4}` | +1 is one tapped Powerstone a turn; Karn, Legacy Reforged (in) makes more mana with no loyalty. Field 8%. |
| The Great Creator `{4}` | Stax static against opponents' rocks and Treasures; the −2 wish is blank in Commander. Stays in the sideboard for a Treasure-heavy pod. Field 14%. |
| Karn Liberated `{7}` | Two exiles, then zero loyalty. Meteor Golem plus its Ultron copy is the same two removals for the same mana and leaves two bodies. Not on the EDHREC page. |

**The tax named:** every Karn is off-type here — no Ultron copy, no Inspector / Cloud Key / Anvil
discount, no Workshop mana (ledger 2026-08-20, double tax). Ugin, the Ineffable (−2 colourless) and
Jhoira's Familiar (−1 historic) do apply, so the real cost is {4} down to {1}. Scion clears that bar
on the axis of **cards actually put into hand**; the others don't.

**Displacement — the draw role ranked:** The One Ring · Idol of Oblivion · The Ten Rings · Iron
Spider · Canoptek Spyder · Skullclamp · Ichor Wellspring · **Sensei's Divining Top**. Top never adds a
card to hand (selection only), and Mystic Forge already reads the top of the library. Cut.

**Considered and passed — Endless Atlas** `{2}` (in-type, copyable, Clock-untappable): needs three
lands with one name; ten Wastes in 34 lands is ~2 on the battlefield by turn 7. Right card at
fifteen Wastes, wrong here.

Sideboard: Tezzeret, Cruel Captain now displaces Ichor Wellspring (it named Top).

**Validated:** 100/100, 91/91 found, no legality or identity flags, 3/3 Game Changers, 47 mana
sources, sticker $1,217.06. `MOXFIELD.txt` and the PDF regenerated.

---

## 2026-09-04 — Roaming Throne in, Chrome Dome out (pilot's call)

Snapshot: `versions/2026-09-04-before-roaming-throne.md` (reconstructed after the edit by reverting
the one list line; the prose header in it already reads post-Throne).

Pilot asked *"no roaming throne for either deck?"* — and the answer was that it had been skipped on
carried-over grounds from two decks whose engines were an activated ability and a combat trigger
(ledger, Corrections 2026-09-04). Re-derived here from the oracle text:

*"Ward {2}. As this creature enters, choose a creature type. This creature is the chosen type in
addition to its other types. If a triggered ability of another creature you control of the chosen
type triggers, it triggers an additional time."* — `{4}` Artifact Creature — Golem 4/4. Field 37%.

**Naming Robot:**
- Ultron (Robot Villain) triggers twice per nontoken artifact — a second {2}, a second token.
  Adds to Panharmonicon and Echoes: four instances with all three (CR 603.2d), never eight.
- Every token copy of a **noncreature** artifact is a Robot Villain, so their triggers double too
  (a token Portal to Phyrexia: six sacrifices, two reanimations per upkeep). Panharmonicon only
  doubles *enters* triggers; Throne doubles the upkeep ones as well.
- Throne is an artifact creature: Ultron copies it for {2}, the token names Robot, +1 instance.
  Throne "is the chosen type in addition", so Machine Overlord gives both +2/+2.
- What it does **not** double: Mirrorworks (a noncreature artifact — Throne reads creatures only)
  and Meteor Golem / Solemn / Duplicant tokens (already creatures, never gain the Robot type).

**Displacement — the copy-engine role ranked on permanence:** Mirrorworks · Helm of the Host ·
Panharmonicon · Echoes · Mirror Box · Prototype Portal · Sculpting Steel · **Chrome Dome**. Chrome
Dome's `{5}: copy target artifact, haste, sacrifice at end step` is five mana for a copy that leaves;
the same five is two and a half Ultron copies that stay. Pilot's words: *"5 is way too expensive for
a copy and then sacrifice, so it's wasted."* Its +1/+0 lord clause was the only thing lost.

**Validated:** 100/100, 91/91 found, no legality or identity flags, 3/3 Game Changers, 47 mana
sources, sticker $1,265.76. `MOXFIELD.txt` and the PDF regenerated; gameplan and DECK.md rules
block updated (Chrome Dome references removed, Throne stacking added).

---

## 2026-09-04 — Five borrows from the "Age of Ultron" rival list (pilot's call)

Snapshot: `versions/2026-09-04-before-rival-borrows.md`. Comparison: `rival-list-2026-09-04.md`;
the list itself: `../samples/the-age-of-ultron.txt` (56 of 99 shared).

| In | Out | Grounds |
|---|---|---|
| **Urza's Workshop** | a Wastes | *"Metalcraft — {T}: Add {C} for each Urza's land you control."* Six lands in the list carry the Urza's subtype (Mine, Power Plant, Tower, Cave, Saga, Workshop), so it taps for up to six; Vesuva, Thespian's Stage and Urza's Cave all find it. 58% of the field; missed at founding. |
| **Ugin's Labyrinth** | a Wastes | Exile a colourless MV 7+ card from hand as it enters → {C}{C} a turn; tap to return the card. Eleven 7+ cards in the list. An Ancient Tomb with no life cost. 27%. |
| **Chimil, the Inner Sun** | Ichor Wellspring | Discover 5 every end step — a free artifact is an Ultron trigger and a copy — and *"spells you control can't be countered."* {6} → {2} under the four reducers. Wellspring was the lowest-output draw card (two cards over two events). |
| **Eldrazi Confluence** | Warping Wail | Mode 2 ×3 = three instant-speed flickers: a re-entering card is a new object entering (CR 400.7, 603.6a) — three ETBs **and three Ultron triggers** on Battlesphere / Portal / Meteor Golem. Wail's sorcery-counter and 1-power exile were the narrowest interaction in the nine. |
| **The Vision** | Skullclamp | 2/5 flying vigilance; per noncreature spell: draw, double strike or indestructible. ~45 noncreature artifact spells in the list. Skullclamp needed 1/1s that Steel Overseer's counters outgrow. 39%. |

**Not borrowed, with grounds** — the loop package (Basalt Monolith, Rings of Brighthearth,
Krark-Clan Ironworks, Ashnod's Altar, Myr Retriever, Junk Diver, Mycosynth Lattice + Karn the
Great Creator, Aetherflux Reservoir): excluded on the Bracket 3 brief at founding, unchanged.
Mana Vault (GC cap). Ugin, the Spirit Dragon (fourth colour wipe at {8}). Calamity of the Titans
(exiles our own board; Forge doesn't stop exile). Rise of the Eldrazi ({12} for one turn). The
utility lands and small rocks each buy less than the card in the slot — full table in the rival
note. Sideboard rows re-pointed: Eldritch Immunity → Kozilek's Command, Coveted Jewel → The Vision.

Lands still 34 (Wastes 10 → 8), Draw 8, Interaction 9. Artifact count unchanged.

**Validated:** 100/100, 93/93 found, no legality or identity flags, 3/3 Game Changers, sticker
$1314.09. `MOXFIELD.txt` and the PDF regenerated; gameplan updated.

---

## 2026-09-08 — Deployers and a mana doubler: Thran Temporal Gateway, Quicksilver Amulet, Extraplanar Lens, Worn Powerstone in; Chief of the Foundry, The Vision, Helm of the Host, Everflowing Chalice out (pilot's calls)

Snapshot: `versions/2026-09-08-before-deployers-lens-powerstone.md`.

Pilot asked for more ways to cheat artifacts in and, on pushback, more mana. Grounds per card:

- **Thran Temporal Gateway** `{4}`, `{4},{T}`: put a historic permanent card from hand onto the
  battlefield — every artifact and every legendary qualifies, so Krang / Blightsteel / Portal /
  Forge / the Ugins for four, at instant speed; Unwinding Clock untaps it each opponent's turn.
  **Quicksilver Amulet** is the same for creature cards (adds only Glaring Fleshraker) — kept as
  the second copy of the engine for consistency. Deploying is not casting: Ultron and Panharmonicon
  trigger, Sanctum / Echoes / Liberator don't; a deployed Ballista is X = 0. Passed: Planar Bridge
  ({8} per activation), Cryptic Gateway (three Robot creature cards in the list).
- **Extraplanar Lens** `{3}` — *"Whenever a land with the same name as the exiled card is tapped for
  mana, its controller adds one mana of any type that land produced."* Pilot read it as a
  replacement; it is a triggered mana ability (CR 605.1b) that adds one **more** mana — Mana Flare's
  effect without the word "additional". Symmetric by *name*, so an opponent's Wastes or Tower would
  also double; nobody else runs them. Imprint Wastes early or Urza's Tower with Tron up (Stage /
  Vesuva copies share the name). Cost named: exiles one of your own lands.
- **Worn Powerstone** for **Everflowing Chalice** — same role; Powerstone's Ultron copy is a 2/2
  that taps for two, Chalice's copy has no counters (ledger 2026-09-04). Pure copy-axis upgrade.

**Cuts, re-derived (pilot rejected Mycosynth Golem, and asked about four others):**

| Card | Verdict | Grounds |
|---|---|---|
| Chief of the Foundry | **cut** | Smallest of six growth pieces (+1/+1) behind Monument, Overlord and the two counter engines. |
| The Vision | **cut** | *"choose one that hasn't been chosen this turn"* — the draw is once per turn, not per spell; I mis-scored it (ledger correction 2026-09-08). Pilot: "felt really bad to play." Canoptek Spyder is the uncapped version. |
| Helm of the Host | **cut** | Nine mana before the first extra Ultron; the fifth doubler behind Throne, Panharmonicon, Echoes, Mirrorworks. The only one that compounds, and the slowest to start. |
| Myr Battlesphere | keep | Best copy target in the deck: 4/7 + four artifact Myr, doubled by Ultron, Prototype Portal target; four Fleshraker pings per entry. |
| Eldrazi Confluence | keep | Mode 2 ×3 on Battlesphere = three ETBs + three Ultron copies at instant speed; also exiles tokens and saves a permanent in response. |
| Mycosynth Golem | keep | Pilot's call. |

Roles: Rocks 12 → 13, Draw 8 → 7, Copy engines 8 → 7, new **Deployers 2**, Payoffs 11 → 10.
Sideboard rows re-pointed: Myr Retriever → Palladium Myr, Coveted Jewel → Iron Spider.

**Validated:** 100/100, 93/93 found, no legality or identity flags, 3/3 Game Changers, sticker
$1327.34. `MOXFIELD.txt` and the PDF regenerated; gameplan updated.

---

## 2026-09-09 — Mind's Eye in, Stridehangar Automaton out (pilot's call on the cut)

Snapshot: `versions/2026-09-09-before-minds-eye.md`.

**Mind's Eye** `{5}` → `{1}` under the four reducers — *"Whenever an opponent draws a card, you may
pay {1}. If you do, draw a card."* The founding rejection ("opponent-dependent at 5 mana; The Ten
Rings and Idol draw on our own actions") named the wrong axis: three opponents draw at least once
each per turn cycle, so the floor is three triggers a cycle. What makes it better here than
anywhere: Unwinding Clock untaps the rocks on every opponent's untap step (the {1} is paid with
mana that could not have been spent on our turn); Ultron's copy is a Robot Villain, so Roaming
Throne doubles the token's trigger and Echoes of Eternity doubles both — five cards off one
opponent's draw step with everything out. 37% of the field. Pilot's own axis ("more things to
spend surplus mana on") applied.

**Cut — Stridehangar Automaton** (pilot's pick from the ranked table): *"Thopters you control get
+1/+1. If one or more artifact tokens would be created under your control, those tokens plus an
additional 1/1 Thopter are created instead."* One extra Thopter per token *batch* on a 1/4, the
smallest payoff in the role. The rest of the table, for the record: Hedron Archive (draw mode
overlaps Mind's Eye), Liberator (flash now covered by the two deployers — not re-derived when they
came in), Canoptek Spyder (~1 card/turn vs Mind's Eye's 3+), Null Elemental Blast (pod-dependent),
Thought Vessel (the turn-2 rock), a Wastes (Tron wants land drops), Duplicant, Threefold Thunderhulk.

Roles: Draw 7 → 8, Payoffs 10 → 9. Mind's Eye has no entry in the global printings reserve yet.

**Validated:** 100/100, 93/93 found, no legality or identity flags, 3/3 Game Changers, sticker
$1332.50. `MOXFIELD.txt` and the PDF regenerated; gameplan gained the Mind's Eye note.

---

## 2026-09-10 — Marvin, Murderous Mimic in, Karn, Scion of Urza out (pilot's call, "for now")

Snapshot: `versions/2026-09-10-before-marvin.md`.

**Marvin** `{2}` Legendary Artifact Creature — Toy 2/2 — *"Marvin has all activated abilities of
creatures you control that don't have the same name as this creature."* Field 11%; better here
because Ultron's tokens of noncreature artifacts are creatures, so Marvin borrows the rocks and
engines the crowd's Marvin never sees: token Thran Dynamo / Gilded Lotus (tap for three), token
Gateway / Amulet (a third deployer), token Prototype Portal, token Idol; plus Steel Overseer, Iron
Spider, Kuldotha Forgemaster and Walking Ballista's counter-removal ping (Overseer's counters land
on Marvin — he is an artifact creature). One tap ability per untap, four per cycle under Unwinding
Clock. Costs named: a 2/2 no lord buffs (Toy, not Robot/Construct), dead on an empty board, and his
Ultron copy hits the legend rule without Mirror Box.

**Cut — Karn, Scion of Urza** (pilot chose from the ranked list; Liberator and Hedron Archive were
declined). Grounds: the least-impact of the three walkers, and off-type twice — no Ultron copy, no
reducer discount, no Workshop mana (ledger 2026-08-20). Draw was at eight after Mind's Eye, the
fullest role in the list. The two Ugins stay: Ineffable is the biggest reducer in the deck, Eye of
the Storms turns every spell into an exile. Rest of the table for the record: Solemn Simulacrum
(land ramp at 48 sources), Threefold Thunderhulk, Duplicant, Null Elemental Blast (pod-dependent),
Canoptek Spyder.

Roles: Draw 8 → 7, Payoffs 9 → 10. Sideboard: Tezzeret now displaces Solemn Simulacrum.

**Validated:** 100/100, 93/93 found, no legality or identity flags, 3/3 Game Changers, sticker
$1333.43. `MOXFIELD.txt` and the PDF regenerated; gameplan gained the Marvin note.

---

## 2026-09-12 — Platinum Angel in, Threefold Thunderhulk out (pilot's call)

Snapshot: `versions/2026-09-12-before-platinum-angel.md`.

**Platinum Angel** `{7}` (→ `{3}` under the reducers, or `{4}` off a deployer) — 4/4 flier, *"You
can't lose the game and your opponents can't win the game."* Pilot: *"people usually try to remove
her but good luck trying to remove 2 of her."* Re-derived on the ledger's alt-win rule (score the
floor): the floor in a normal deck is a 4/4 for seven that dies to the first removal; here Ultron
makes a second, non-legendary copy for {2}, Darksteel Forge / Krang give both indestructible,
Cryptothrall gives both hexproof, Commander's Plate adds pro-five-colours to one, and edicts miss
because the pilot sacrifices a token. What ends the lock: an exile wrath, mass bounce, or −X/−X
through Monument's +2. Secondary value: removal spent on an Angel is removal not spent on Ultron or
Krang. Costs named: a seven-drop that is a lock rather than a threat, into a top end of thirteen
cards at 7+; some pods dislike "can't lose" pieces (not a Game Changer, not a rule effect like
Arbiter). Field 18%.

**Cut — Threefold Thunderhulk** — the weakest of the big ETB artifacts on every ranked list since
2026-09-08; Battlesphere does the go-wide job better at the same cost. Same mana value, so the
curve is unchanged. Sideboard: Metalwork Colossus now displaces Duplicant.

**Validated:** 100/100, 93/93 found, no legality or identity flags, 3/3 Game Changers, sticker
$1340.88. `MOXFIELD.txt` and the PDF regenerated; gameplan gained the Angel lock note and
the Sanctum trigger list updated (Angel is MV 7).

---

## 2026-09-16 — Hangarback Walker in, Scrap Trawler out (pilot's call, "see if I regret it")

Snapshot: `versions/2026-09-16-before-hangarback.md`.

**Hangarback Walker** `{X}{X}` Artifact Creature — Construct 0/0 — enters with X +1/+1 counters, dies
into a 1/1 flying colourless Thopter per counter, `{1},{T}`: +1/+1 counter. Field 12–13% of Ultron
lists with slightly negative synergy (−0.06): the crowd runs it less than the artifact baseline, and
the reason is the copy engine. Verdict here was **medium** — a surplus-mana outlet, not a copy card.

Grounds for (re-derived against the current list):
- Ultron, Machine Overlord pumps Constructs and Forsaken Monument pumps colourless creatures, so under
  either the token copy lives as a 2/2 with no counters that grows itself (CR 704.5f, 611.3a —
  ledger 2026-09-16). Without an anthem it is the Ballista case: 0/0, dies (CR 707.2, 107.3g).
- Mycosynth Golem's affinity grant makes it free at X = artifacts ÷ 2 — X is announced before the
  reduction (CR 601.2b, 601.2f, 702.41a — ledger 2026-09-16). The same line was missing from the
  gameplan for Walking Ballista; added.
- Unwinding Clock untaps it on every opponent's untap step: four counters a cycle for {4}.
- Death → Glaring Fleshraker pings per Thopter (doubled by Echoes), Idol of Oblivion turns on,
  Cybermen Squadron gives the Thopters myriad. Echoes' spell copy keeps X. Sanctum of Ugin triggers
  at X ≥ 4. Steel Overseer and Iron Spider stack counters; Marvin borrows the {1},{T}.

Grounds against, named: eight cards in the list produce it as a 0/0 — Ultron (no anthem),
Mirrorworks, Sculpting Steel, Thran Temporal Gateway, Quicksilver Amulet, Kuldotha Forgemaster,
Prototype Portal, a Chimil discover. Krang's indestructible means a wipe leaves no Thopters. It is
a second card in Ballista's "never pay the {2}" bucket in a deck whose identity is "every artifact
is two." Pilot's axis: more outlets for surplus mana (same axis as Mind's Eye, 2026-09-09).

**Cut — Scrap Trawler** (pilot's pick from the ranked table). Grounds: *"Whenever this creature dies
or another artifact you control is put into a graveyard from the battlefield, return to your hand
target artifact card in your graveyard with lesser mana value."* Grind insurance in a deck that wins
proactively; the only recursion in the list, and the lowest ceiling in the 99. Rest of the table,
cheapest cut first, for the record: Null Elemental Blast (reads *multicoloured*, not coloured — a
mono-coloured commander is immune; pod-dependent, Workshop can't pay for it), Canoptek Spyder
(nontoken artifact creatures only — 25 in the list, tokens never count, ~1 card/turn), Quicksilver
Amulet (creature cards only; Gateway already deploys every artifact creature, Fleshraker is its one
exclusive target — kept as a substitute per §2.5), Solemn Simulacrum (basic-land ramp at 48
sources), Palladium Myr (a rock that dies to wipes), Thought Vessel / a Wastes (the opener — not
recommended), Hedron Archive (declined 2026-09-09), Liberator (declined twice), Duplicant (bottom
on purpose: copyable exile, Throne triples it).

**Surplus-mana alternatives tabled, not chosen** (oracle-checked, for a future slot): Steel Hellkite
({6} 5/5 flyer, {X} wipes an opponent's permanents at that MV after it connects, token copy is a
full 5/5 — 8–12%), Contagion Engine ({6}, −1/−1 on one player's creatures on entry, copied ETB ×3
under Throne, {4},{T} proliferate twice — off page), Strionic Resonator ({2}, copies Ultron's own
trigger — 7–12%), Lithoform Engine ({4}, also copies a permanent spell as a token with X intact —
legendary, 6–8%), Rings of Brighthearth (19%, passed at founding for Panharmonicon's slot, not on
merit; not infinite with Basalt out), Mirage Mirror ({2}: becomes a copy of anything until end of
turn — 17–19%), Endbringer (the strongest raw sink but an Eldrazi, nothing copies it). Passed with
grounds: Voltaic Construct ({2}: untap an artifact creature — infinite with a token Gilded Lotus,
the Basalt bucket), Ultron Drone (power-up fires once per object), Staff of Domination (six mana a
card, break-even with a token Dynamo under Monument), Triplicate Titan / Panther Robot (bombs, and
Bombs is at ten). Different lane, noted for later: Lux Artillery (10 to each opponent at end step
at thirty counters among your artifacts and creatures — a kill line, competes with win conditions).

Roles: Bombs & ETB 9 → 10, Protection & Recursion 4 → 3. Sideboard: Scrap Trawler added, displaces
Hangarback Walker; the Myr Retriever row no longer says "Scrap Trawler is in." `pdf.json` drift fixed:
its Tezzeret row still said "Displaces Iron Spider" after the 2026-09-10 re-point to Solemn
Simulacrum. Gameplan: Null Elemental Blast paragraph tightened to *multicolour*; Hangarback rows added
to the "pay the {2}" table, Sanctum list, Marvin, Chimil, and a Mycosynth Golem affinity bullet.
Hangarback Walker has no entry in the global printings reserve yet (eight unpinned).

**Validated:** 100/100, 93/93 found, no legality or identity flags, 3/3 Game Changers, 48 mana
sources, sticker $1331.32. `MOXFIELD.txt` regenerated. The PDF regenerated (04:15) but
`deck:pdf`'s final temp-file cleanup threw on Bun 1.1.15 (`Bun.file().delete` is missing before
1.3); the repo pins 1.3.14 in `.bumrc` — the temp HTML was removed by hand.

---

## 2026-09-28 — Reality Fracture (FRA/FRC) set review: open

Full review: `research/fra-set-review-2026-09-28.md`. Nothing applied yet.
- **Memnarch, the Warden.** The pilot likes it but worries it is *"a bit expensive for ultron"*, and
  is unsure about the Canoptek Spyder cut because of the MV change. They also asked whether Iron Man
  is the better home.
- **Hall of Echoes.** The pilot doesn't mind it, but cutting a Wastes weakens the deck's
  Wastes-doubling card. They asked for a **manabase optimization pass**: cut lands whose abilities
  rarely get paid for, because the mana is better spent developing the board and paying for
  Ultron's trigger.

Both are worked in the review file's follow-up section.

### Applied 2026-09-28 (pilot approved): Memnarch in, and the manabase pass

- **Memnarch, the Warden in, Canoptek Spyder out.** Real cost here is about 4–7 mana (cost reducers,
  Thran Temporal Gateway / Quicksilver Amulet for {4} at instant speed, Kuldotha Forgemaster, Tron
  and Workshop mana). It draws one card per artifact on every attack and is indestructible. MV 7+ goes
  13 → 14; MV ≤ 2 and MV ≤ 3 don't change; avg MV 4.47 → 4.55. Its draw is mandatory, so count the
  library before attacking.
- **Fomori Vault → Planar Nexus.** It is every nonbasic land type, so it counts as an Urza's Mine,
  Power-Plant **and** Tower (official ruling 2024-06-07). Any one Tron land plus Nexus makes Tron
  mana.
- **Mirrorpool → Hall of Echoes.** Enters untapped and works every turn, with the legend rule off. It
  can be a second Ultron or a second Memnarch.
- **Rogue's Passage → a 9th Wastes.** Its {4} activation was rarely paid. Nine Wastes also help
  Extraplanar Lens, raising the chance of 2+ Wastes by turn 6 from 25% to 30%.

Tapped lands 3 → 2. The pilot's principle for the pass: *"remove lands that we don't get to trigger
often because we'd rather spend the mana elsewhere and develop the board and pay for ultron's
trigger."* **Not changed:** Scavenger Grounds (graveyard hate; pod-dependent, pilot's call) and Power
Depot (enters tapped but counts as an artifact; first cut if tapped lands become a problem).
Validated: legal, on-identity, 100 cards. PDF regenerated.

---

## 2026-09-30 — Omnath, Locus of the Void in, Null Elemental Blast out (pilot's call, trial)

Snapshot: `versions/2026-09-30-1156-main-omnath-locus-of-the-void-in-null-elemental-blast-out-trial.json`.
The pilot asked for Omnath and chose the cut: *"we can try cutting null elemental blast and i'll see
if the deck struggles without it."*

**Omnath, Locus of the Void** `{7}` Legendary Creature — Elemental 6/6, colourless (FRC, pinned to
the extended-art FRC 88). *"Omnath gets +1/+1 for each unspent mana you have. If you would lose
unspent mana, that mana becomes colorless instead. Landfall — Whenever a land you control enters,
add {C}{C}."*

**The 2026-09-28 near-miss, re-derived** (`fra-set-review-2026-09-28.md`):
- *"Not an artifact: no Ultron copy, no Workshop mana, no artifact reducers."* Still holds for Ultron,
  Workshop, Karn and Mightstone mana, and Foundry Inspector. The review left out that Jhoira's Familiar
  (historic, −1) and Ugin, the Ineffable (colourless, −2) do reduce it. Real cost: 7 hard, 4 to 6 with
  reducers, or {4} at instant speed through Thran Temporal Gateway or Quicksilver Amulet.
- *"The recorded constraint is mana sinks, not mana."* No longer holds. Omnath makes little mana
  itself; it keeps the surplus the deck already makes and carries it to the sinks it already runs
  (Walking Ballista, Hangarback Walker, Kozilek's Command, Hall of Echoes, Mind's Eye, Ultron's {2}).
  That's ledger eval-025: check for a banking clause before calling surplus mana wasted.

**Grounds for** (rules verified by mtg-rules-expert; ledger cost-010, cost-014, cost-023):
- Mana persists across steps and turns (CR 500.5, 614.5; Kruphix ruling 2014-04-26, same wording).
- Unwinding Clock: rocks tapped on each opponent's turn bank for your own turn. Sol Ring, Thran Dynamo
  and Gilded Lotus alone bank 24 per cycle, 33 with Forsaken Monument. Bounded: one untap per opponent
  untap step (CR 502.3), so no loop.
- Karn, Legacy Reforged's upkeep mana carries over instead of emptying at cleanup (CR 514.2).
- Landfall {C}{C}, doubled by Echoes of Eternity (CR 603.2d). Ultron's token copy of Darksteel
  Citadel, Treasure Vault or Power Depot is a land entering, so landfall pays the {2} back.
- Colourless: All Is Dust and both Ugins skip it. Casting it triggers Sanctum of Ugin, and Sanctum
  can fetch it.

**Grounds against, named:** not an artifact (the same off-type grounds that cut Karn, Scion of Urza
on 2026-09-10); banked Workshop mana stays artifact-spells-only (CR 106.6), so it can't pay Ultron's
{2}; Echoes' cast copy dies to the legend rule without Mirror Box; removal empties the bank at the end
of that step, so hold an instant-speed sink; the pool has to be announced on every priority pass
(CR 106.4b).

**Null Elemental Blast out** (pilot's pick from the ranked table). Grounds: *"Counter target
multicolored spell / Destroy target multicolored permanent"*, so a mono-coloured commander is immune;
Workshop can't pay for it; top of the 2026-09-10, 09-16 and 09-28 cut tables. Cost: interaction 9 → 8
and the only 1-mana answer. Rest of the table: Quicksilver Amulet (next; Gateway covers every
artifact creature and Omnath, and Glaring Fleshraker is its only exclusive target), Palladium Myr,
Hedron Archive and Solemn Simulacrum (each gets better under Omnath), Liberator and Duplicant (not
considered: declined twice, and kept last on purpose).

**Curve:** avg MV 4.55 → 4.64; MV ≤ 2 12 → 11; MV ≤ 3 23 → 22; MV 7+ 14 → 15.

Roles: Removal & Interaction 9 → 8, Payoffs & Engines 10 → 11. Sideboard: Null Elemental Blast added,
displaces Omnath (the trial reversal); Karn, the Great Creator re-pointed from Null Elemental Blast to
Quicksilver Amulet (pilot's pick). Gameplan: Omnath bullet under Sequencing traps; the Sanctum,
Workshop, Walking Ballista and removal notes updated. EDHREC has no data until FRC releases on
2026-10-02.

**Validated:** 100/100, 92/92 found, no legality or identity flags, 3/3 Game Changers.
`MOXFIELD.txt` regenerated with the FRC 88 pin.
