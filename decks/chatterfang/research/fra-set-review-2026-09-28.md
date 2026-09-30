# Reality Fracture (FRA + FRC) set review — Chatterfang + upgrade-test — 2026-09-28

**Method:** deck-brain SKILL.md, the HOB sweep pattern (LEDGER 2026-08-09 "Sweep a new set by indexing
once…"). Every card classified from the verified Scryfall oracle text in the set index
(`bun run set-scan fra` / `frc`, filtered to BG identity and commander-legal) — never from memory, both
halves read on prepare cards. Each card costed in this deck's mana (§1.2), checked against the deck's own
board **and its triggers** (§1.3), and classified for both lists. Comparison cards read from the current
`deck.json` of each list. Token definitions (Jace, Heartwood, Forest Tentacle, Gingerbrute) verified from
the TFRA/TFRC token sets. Every MAIN has a full role table (§2.1 step 4) before its cut is named.

**Lists reviewed:** `decks/chatterfang` `main` (B3, the deck of record, avg MV 2.73, Game Changers 1/3 —
Gaea's Cradle) and its playtest fork `decks/upgrade-test` `main` (B3, avg MV 2.83, GC 1/3). Where the fork's
column differs, the reason is a difference between the two lists, stated in the row.

**Field lens:** unavailable. EDHREC has no FRA/FRC data before the 2026-10-02 release, so there is no
inclusion or synergy signal for any card below (§2.2: say so and skip it rather than invent one).

**Pool:** **115** cards fit Golgari identity and are commander-legal — **96 FRA + 19 FRC**. **93 NEW**
(first printed in this release) and **22 REPRINTS** (including the five basics/staples already in both
lists). **No Game Changers in either set**, so nothing here moves the bracket.

## Result

| | MAIN | SIDE | NO | already in list |
|---|---|---|---|---|
| **chatterfang** | **3** | 11 | 96 | 5 |
| **upgrade-test** | **1** | 13 | 96 | 5 |

- **chatterfang MAIN (three separate decisions, not a package):** Gardenize over From Beyond · Bloodline
  Recollector over Idol of Oblivion · Lich's Relic over Verdant Command.
- **upgrade-test MAIN:** Lich's Relic over Woe Strider. Gardenize and Recollector are SIDE there for
  list-specific reasons (below).
- **Pilot's named ask:** Gardenize — **yes, MAIN in chatterfang**. Hexhaven Invigorator — **no, in both**.

> ⚠️ **Correction to a filed pass.** `research/proposal.json` → `passed` and
> `decks/upgrade-test/research/decisions.md` (2026-09-25) both reject **Gardenize** as *"not
> commander-legal — the tool reports not_legal."* That was the **pre-release** legality state: Scryfall
> now reports it `legal` (set index, 2026-09-28). It was never evaluated on its text. It is evaluated
> below and it is the strongest green card in the set for this deck. The `passed` entry should be updated
> when the proposal is next edited (not edited here — the pilot decides).

---

## Pilot's ask — "Hexhaven Invigorator and Gardenize for green decks"

### Gardenize — {1}{G}{G} Enchantment — **MAIN (chatterfang) · SIDE (upgrade-test)**

> *"Whenever a creature you control dies, put a charge counter on this enchantment. At the beginning of
> your first main phase, add {G} for each charge counter on this enchantment."*

**The clause that matters is the one that isn't there: nothing ever removes the counters.** The mana each
turn is not "deaths last turn" — it is **every creature of yours that has died since Gardenize landed**.
It is a cumulative mana engine, and this deck's floor action is killing its own creatures.

**How many creatures die per turn cycle here** (tokens are creatures, and each dying creature is its own
trigger — the text is "whenever a creature", not "one or more"):

- Free or near-free ways to kill your own creature in the list: Viscera Seer, Carrion Feeder, Woe Strider,
  Ashnod's Altar, Phyrexian Tower, High Market, Chatterfang's own `{B}, Sacrifice X Squirrels` (X deaths
  in one activation), Ravenous Squirrel, Grim Backwoods; Skullclamp (every `{1}` equip onto a 1/1 is a
  death); Village Rites, Deadly Dispute, Plumb the Forbidden; Deep Forest Hermit's vanishing; chump
  blocks and trades on opponents' turns.
- A realistic ramp-up after a turn-3 Gardenize: ~1–2 deaths on turn 3, ~3–4 on turn 4, ~4–6 on turns 5+.
  That is roughly **{G}{G} on turn 4, ~5 on turn 5, ~9 on turn 6, ~14 on turn 7** — Gaea's Cradle
  territory by turn 6, and unlike Cradle it does not shrink when the board does.
- **Doubling Season doubles every charge counter** ("if an effect would put one or more counters on a
  permanent you control"), so each death is {G}{G}.
- **A board wipe is a mana windfall, not a reset.** Your own Toxic Deluge or Meathook on a 15-creature
  board is +15 counters (and 15 drain triggers); an opponent's wrath is the same. The next turn rebuilds
  off the mana. It is an enchantment, so creature wipes don't touch it.
- The Chatterfang + Pitiless Plunderer loop (gameplan §8a) already gives unbounded deaths; with Gardenize
  out that is also unbounded {G} on your next main phase. **Not a new combo** — the loop already wins
  through the drainers and already makes unbounded {C} with Ashnod's Altar — but name it to the pod.

**What the mana does.** It arrives at the start of **main phase 1** and empties at the end of that phase
(CR 106.4), and it is **green only**. So it pays for main-phase-1 plays: casting green cards, and above
all **The Unbeatable Squirrel Girl's `{1}{G}{G}{G}`**, which has no `{T}` and can be activated as many
times as you can pay — X = Squirrels you control, and Chatterfang matches it. Gardenize is the fuel that
ability never had. It does **not** pay Chatterfang's `{B}` or anything black.

**Ramp or payoff?** It is **ramp whose fuel is the payoff event** — a death → mana converter. It is
*conditional* ramp in the 2026-09-25 sense (LEDGER "Section counts measure slots, not function"), so it
must **not** replace an unconditional cheap ramp card — that is exactly the wave-4 error. It doesn't: the
proposed cut is From Beyond, a Token Engines card. Its condition is the thing this deck does every turn —
the same argument the pilot made for Circle of Dreams Druid in wave 5.

Self-hit check: nothing in the list turns it off; no mandatory-loop risk (its trigger adds a counter and
creates/sacrifices nothing — LEDGER 2026-09-25 "A loop is only a draw if every action is mandatory").
Full role tables and the cut are under **Proposed swaps → 1**.

**upgrade-test: SIDE.** The fork already runs **14** Ramp & Mana cards (parent: 10), including Circle of
Dreams Druid, Ninja Pizza, Concordant Crossroads and a second dork, and its standing wave-5 lesson is that
its mana pieces are cut last. Its measured problem is the win turn (7.5 vs the parent's 6.6), not a
shortage of mana after turn 5, which is when Gardenize pays. If it earns its slot in the parent, bring it
across over **Ninja Pizza** (the other 3-MV enchantment turning the token economy into mana).

### Hexhaven Invigorator — {G}{G}{G}{G} 6/6 vigilance — **NO (both lists)**

> *"Whenever this creature is dealt damage, you may search your library for up to that many land cards,
> put them onto the battlefield tapped, then shuffle."*

The ceiling is real: "land **cards**", not basics, so it can fetch Gaea's Cradle, Cabal Coffers, Urborg,
Yavimaya and Three Tree City, and every land is a landfall token event with Tireless Provisioner, Tireless
Tracker, Scute Swarm and Avenger out. **But it only triggers when damage is dealt to it, and neither list
can deal damage to its own creature.** Every self-targeting effect in both lists is `-X/-X` or a counter:
Chatterfang's `+X/-X`, Toxic Deluge, The Meathook Massacre, Yawgmoth's `-1/-1` counters (fork). No fight,
no bite-your-own, no damage sweeper, no pinger. Llanowar Wastes damages *you*, not a creature.

So the trigger is entirely **the opponents' choice**, and they have three good ones: don't block it (take
6); chump it with a 0-power creature (CR 120.8 — a source that would deal 0 damage deals none, so nothing
triggers); or don't attack into a 6/6 vigilance. The only fight enabler in this set is **Yoshimaru,
Scrappy Stray** (#56), which is a 1/1 whose fight otherwise wastes its ETB in a deck of 1/1s — a two-card
dependency. The shape that *would* make it sing is a repeatable damage-to-each-creature effect
(Pestilence-style: 1 land per activation, and it also kills your own tokens into drain triggers) — not
in either list, and not in this set.

Cost-out: `{G}{G}{G}{G}` in a two-colour deck. Of 36 lands, 14 can't make green on their own (5 Swamps, Barren
Moor, Bojuka Bog, Cabal Coffers, Castle Locthwain, Grim Backwoods, High Market, Phyrexian Tower, Takenuma,
Urborg); Yavimaya,
Cryptolith Rite and Arcane Signet help, but a turn-4 cast off lands alone is unlikely. The Unbeatable
Squirrel Girl already pays the same pip tax and earns it; this doesn't.

In the role table (Proposed swaps → 1, Ramp & Mana) it ranks **last** — the only ramp piece whose
condition is controlled by the opponents. On the combat axis it is a 4-mana 6/6 with no trample that adds
no death trigger and no token. **Revisit only if a list adds a Pestilence-style pinger.**

> **Parent-review note (2026-09-28):** an earlier session the same day worked this card through with the
> pilot — see LEDGER *"A fight outlet is a DEATH outlet, not a SACRIFICE outlet"*, *"Golden Guardian +
> Hexhaven Invigorator: a self-contained ramp package"* and *"Hexhaven Invigorator's real lever is
> INDESTRUCTIBLE, and deathtouch is a trap"*. Golden Guardian ({4}, colourless, "{2}: fights another
> target creature you control", returns as a land when it dies) is the on-demand enabler this section
> says is missing. That session's own conclusion was to save the pair for a **lands/landfall shell, not a
> token-sacrifice shell**, and neither list runs Guardian today — so the NO stands for these lists as
> built, but the pilot already has a two-card route if they want Hexhaven here.

---

## Set mechanics as they matter to this deck

- **Empower Jace N** (~20 cards): puts N loyalty on a Jace token you control, **creating a Jace
  planeswalker TOKEN first if you control none** (`−1: Surveil 1 / −3: Draw a card`). The Jace is a
  token, so under Chatterfang the creating empower also makes **one Squirrel** (and a Food with
  Tippy-Toe/Peregrin Took; Mirkwood Bats sees both). Later empowers only add loyalty. A planeswalker
  activates once per turn, so every "Way of the …" enchantment and loyalty-refill card (Way of the
  Necromancer, Way of the Deathbringer, Sanctum Lurker) caps at **one activation per turn** — Idol of
  Oblivion's rate on an attackable permanent. Doubling Season doubles both the Jace token and its loyalty;
  the spare Jace with 0 loyalty is put into the graveyard as a state-based action — **not** a creature
  death, no drain. Not an engine here.
- **Prepared** (CR 722; LEDGER 2026-08-06): casting the copy is a normal cast at full cost, from exile.
  Only two pool cards use it; **Bloodline Recollector** re-arms at any end step in which 3+ creatures died
  — which this deck does every turn it plays.
- **Threshold / surveil / mill (seven cards in graveyard):** tokens never reach a graveyard, so threshold
  comes slowly here. Self-mill is neutral at best — and **Liliana the Repentant** mills per creature
  *entering*, which decks this deck.
- **Heartwood** (Hungering Puppetbeast only): a noncreature artifact token — +1 Squirrel. **Forest
  Tentacle** (Verdant Kraken): a land **creature** token — a token event *and* a landfall event.
  **Gingerbrute** (Ginger): a Food creature token — its self-sacrifice is a Food sacrifice for Camellia.
- **Monarch** (Ginger, Queen of Sweets): a card every end step; a wide board keeps it.
- **"Exile instead" and entering-trigger locks** reappear (Garruk, Veiled Butcher; Karn, Argent
  Defender) — both switch off this deck's own engine. See Traps.

---

## Classification table — all 115 cards

Verdict key: **MAIN** = would displace a named card in the 100 · **SIDE** = bench-worthy, names what it
would displace · **NO** = pass · **in list** = already in the 100. `=` in the upgrade-test column = same
verdict as chatterfang.

### Black

| # | Name | MV | NEW/REPRINT | chatterfang | upgrade-test | Reason |
|---|---|---|---|---|---|---|
| 1 | Dark Matter Manipulator | 1 | NEW (FRA) | NO | = | ETB mill 3 + a 1/2 that needs 7 cards per +2/+0; self-mill with no graveyard payoff (not a mill deck — 2026-09-28 Mycotyrant grounds) |
| 2 | Lich's Relic | 1 | NEW (FRA) | **MAIN** | **MAIN** | {B} + the {2} ETB = up to three targeted destroys (one creature/PW per opponent) for 3 mana; one-sided; opponents' deaths feed Meathook/Blood Artist. See Proposed swaps |
| 3 | Mabel, Bitter Recluse | 1 | NEW (FRA) | NO | = | 1/1 deathtouch whose ETB only removes counters; no token, no drain |
| 4 | Bloodline Recollector // Ancestral Craving | 2 | NEW (FRA) | **MAIN** | SIDE | End step with 3+ deaths (any player's turn) → prepared; the copy is {B} instant 'draw three, lose 3'. This deck arms it every turn it sacrifices three things. Fork: Yawgmoth already draws per sacrifice, and its slot would come from ramp. See Proposed swaps |
| 5 | Dreadhorde Invasion | 2 | REPRINT (FRC) | SIDE | = | Reprint. A 2-MV Bitterblossom twin IF you sacrifice the Army each turn (amass only creates a token when you control no Army) — then 1 Army + 1 Squirrel per upkeep for 1 life. Displaces From Beyond if Gardenize is declined |
| 6 | Extrapolate the Impossible | 2 | NEW (FRA) | NO | = | Blank in Commander — CR 903.11 admits only effects that *specifically* bring cards into Commander games from outside the game; this one says "from outside the game" generically |
| 7 | Gallia, Tragic Host | 2 | NEW (FRA) | NO | = | 2/1 menace whose recursion costs {4}{B} plus exiling a creature card; no engine |
| 8 | Last Gasp | 2 | REPRINT (FRA) | NO | = | Reprint. -3/-3 instant; in-deck removal hits any permanent |
| 9 | Liliana the Repentant | 2 | NEW (FRA) | NO | = | **TRAP** — mill two for EACH other creature entering. One Chatterfang token event is 2+ creatures; a 20-token turn mills 40+ and decks the pilot |
| 10 | Multiply by Zero | 2 | NEW (FRA) | NO | = | Base 0/0 until end of turn: fails against any counter or anthem; the list's instants answer any permanent |
| 11 | Rank Rat | 2 | NEW (FRA) | NO | = | 1/1 + each opponent discards; no token, no drain |
| 12 | Silence the Echo | 2 | NEW (FRA) | SIDE | = | {1}{B} sorcery Murder whose sacrifice cost is free here (a token) and fires every drainer; sorcery speed keeps it below the instant suite |
| 13 | Solve for Disappointment | 2 | NEW (FRA) | NO | = | Duress-for-permanents + empower Jace 1 (creates the Jace token once → one Squirrel); no board impact |
| 14 | Terminal Criticism | 2 | NEW (FRA) | NO | = | Only kills blue or red creatures/planeswalkers — pod-dependent colour hoser |
| 15 | Vraska's Final Mercy | 2 | NEW (FRA) | NO | = | {B}{B} sorcery single-target kill for 2 life; the instant suite (Trophy, Decay, Beast Within, Tear Asunder) outranks it |
| 16 | Way of the Necromancer | 2 | NEW (FRA) | NO | = | Deaths add loyalty to the Jace token, but a planeswalker activates once per turn — caps at one −3 draw per turn; Idol-rate on an attackable permanent |
| 17 | Break Under Pressure | 3 | NEW (FRA) | SIDE | = | Instant edict on the opponent's HIGHEST-MV creature/PW (gets around hexproof, hits commanders) + gain 2 (Vito/Dina fuel). Bench removal |
| 18 | Cast Away Doubt | 3 | NEW (FRA) | NO | = | Divination-rate draw 2 at MV3 that damages you too |
| 19 | Danitha, Spear of Agony | 3 | NEW (FRA) | NO | = | Targeting-matters 2/2 first strike; the deck casts few targeted spells |
| 20 | Gideon the Oathless | 3 | NEW (FRA) | NO | = | Punishes opponents' creatures entering (1 damage) — a soft hate piece against OTHER token decks, not our engine. Rating input for a token-heavy pod, not a silent exclusion |
| 21 | Loot, the Anomaly | 3 | NEW (FRA) | NO | = | Free sac outlet only at threshold (7 cards in graveyard; tokens never get there) and its sacrifice buys only -2/-0 combat math; every in-deck outlet pays more |
| 22 | Proft, Sinister Mastermind | 3 | NEW (FRA) | NO | = | Can't be cast below threshold; 5/5 menace beater |
| 23 | Sanctum Lurker | 3 | NEW (FRA) | NO | = | Grants planeswalkers '+2: 1 damage to each opponent, gain 1' — one activation per turn per planeswalker; needs Jace tokens the deck doesn't make |
| 24 | Screeching Soulbreaker | 3 | NEW (FRA) | NO | = | Attack-gated 1 damage + 1 life; Valley Rotcaller does this scaled |
| 25 | Theoretical Necromancer | 3 | NEW (FRA) | NO | = | 4/1 Vampire; graveyard regrowth at {3}{B}; no engine |
| 26 | Tinybones, Pocket Nuisance | 3 | NEW (FRA) | NO | = | Discard-matters payoff; the deck doesn't discard |
| 27 | Way of the Deathbringer | 3 | NEW (FRA) | NO | = | Jace token (5) with a granted '−2: sacrifice a creature → 4/4 Beast' — one activation per turn, 3 mana setup for a Beast every other turn |
| 28 | Winter, Tormented Loner | 3 | NEW (FRA) | NO | = | ETB sacrifice (free here) → each opponent sacrifices a creature of THEIR choice — hits their worst body; Lich's Relic does this targeted |
| 29 | Darklight Phoenix | 4 | REPRINT (FRA) | NO | = | Reprint. Returns after two deaths — one extra recursive death per turn in a deck where deaths are never scarce; 3/2 flier is the only upside |
| 30 | Extended Absence | 4 | NEW (FRA) | NO | = | 4-MV instant exile of a creature/PW + drain 1 each; kicked Tear Asunder already exiles any nonland permanent at 4 |
| 31 | Rampart Hunter | 4 | NEW (FRA) | NO | = | 3/3 deathtouch + one-turn pump; no engine |
| 32 | Rewrite Regrets | 4 | NEW (FRA) | NO | = | Sorcery reanimation of a creature card MV ≤ 6; the deck's creature cards are cheap and tokens can't be reanimated |
| 33 | Teyo, Diamondblade Mage | 4 | NEW (FRA) | NO | = | Flash 3/1 that grants deathtouch; no engine |
| 34 | Garruk, Veiled Butcher | 5 | NEW (FRA) | NO | = | **TRAP** — 'If a creature an opponent controls would die, exile it instead' switches off Blood Artist, Meathook's gain half and Blade of the Bloodchief for opponents' creatures (LEDGER 2026-08-09) |
| 35 | Massacre Girl, Most Wanted | 5 | NEW (FRA) | NO | = | 5-MV drainer that hits ONE target opponent per death; Zulaport/Bastion hit each opponent for 2–3 mana. Its lifegain is one more Dina/Vito event, not enough at MV5 |
| 36 | Rise of the Deathbringer | 5 | NEW (FRA) | NO | = | Mode 1 draws off GREATEST power (this deck's bodies are 1/1s and 3s); mode 2 is an instant -3/-3 that Toxic Deluge does for 3 mana, scalable |
| 37 | Yargle, Glutton of Urborg | 5 | REPRINT (FRA) | NO | = | Reprint. Vanilla 9/3 |
| 38 | Apex Witchstalker | 6 | NEW (FRA) | NO | = | 6-MV 6/4; basic landcycling {2} is its only relevant text and the deck doesn't need the fixing |
| 39 | Jhoira, Weatherlight Corsair | 6 | NEW (FRC) | NO | = | 6-MV random theft of an opponent's historic permanent, paid in life |
| 40 | Overwrite the Multiverse | 6 | REPRINT (FRA) | NO | = | Reprint. EXILES all creatures — your tokens never die, so zero drain triggers (dies = battlefield→graveyard only, LEDGER 2026-08-21) |
| 41 | Archfiend of Despair | 8 | REPRINT (FRC) | NO | = | Reprint. End-step doubling finisher, but 8 MV in a 2.73-curve deck that already runs Bloodletter at 4 |
| 42 | Archon of Cruelty | 8 | REPRINT (FRC) | NO | = | Reprint. 8 MV |
| 43 | Avacyn, Angel of Horror | 8 | NEW (FRC) | NO | = | 8 MV; returns NONTOKEN creatures only — tokens are the fodder |

### Green

| # | Name | MV | NEW/REPRINT | chatterfang | upgrade-test | Reason |
|---|---|---|---|---|---|---|
| 44 | Flourishing Grapple | 1 | NEW (FRA) | NO | = | Bite only against red/white permanents; the deck's bodies are 1/1s |
| 45 | Hunter's Axe | 1 | NEW (FRA) | NO | = | +2/+0 attack Equipment; no engine (Orcrist does the combat-equipment job better in the fork) |
| 46 | Tethermage's Advantage | 1 | NEW (FRA) | NO | = | One-shot pump/untap trick |
| 47 | Arcane Amphisbaena | 2 | NEW (FRA) | NO | = | 1/1 deathtouch + empower Jace 2 → Jace token + one Squirrel; the Jace only surveils |
| 48 | Carnivorous Cultivator // Enroot | 2 | NEW (FRA) | NO | = | Enroot puts a land in the GRAVEYARD; it only returns to hand on combat damage — not ramp |
| 49 | Compel Brutality | 2 | NEW (FRA) | NO | = | One-sided bite; needs a big creature this deck doesn't have |
| 50 | Fblthp, Knows the Way | 2 | NEW (FRA) | NO | = | In BG only two basic names exist, so X caps at 2: 4 mana for a 2/2 and two basics to HAND |
| 51 | Marwyn, the Preserver | 2 | NEW (FRA) | NO | = | Land hexproof + {2} land regrowth; marginal with two fetches |
| 52 | Puppet Crafting | 2 | NEW (FRA) | NO | = | Animates an artifact/enchantment into a 5/5; no engine |
| 53 | Something Worth Saving | 2 | NEW (FRA) | NO | = | Mill 4 keep a permanent; card selection below the draw suite's rate |
| 54 | Sureshot Sower | 2 | NEW (FRA) | NO | = | 3/1 reach, channel-style flier removal; no engine |
| 55 | Tarmogoyf | 2 | REPRINT (FRA) | NO | = | Reprint. Vanilla beater |
| 56 | Yoshimaru, Scrappy Stray | 2 | NEW (FRA) | NO | = | ETB fight needs a big creature (the deck's are 1/1s). Only notable as the set's one fight enabler for Hexhaven Invigorator |
| 57 | Budding Insurgent | 3 | NEW (FRA) | NO | = | Sorcery-speed self-sac Naturalize on a 3/3; Tear Asunder does it at instant speed |
| 58 | Gardenize | 3 | NEW (FRA) | **MAIN** | SIDE | Counters ACCUMULATE (never removed): {G} per creature that has died since it landed, every first main phase. Doubling Season doubles them. Fork: ramp already 14 and its open problem is the win turn, not mana after turn 5. See Proposed swaps |
| 59 | Greenhouse Propagator | 3 | NEW (FRA) | SIDE | = | Prosperous Innkeeper's 'gain 1 per creature entering' (a lifegain EVENT per token → Dina/Vito/Blight-Priest) on a {T}: Add {G} dork; 3 MV and summoning-sick is why it's bench, not main |
| 60 | Inspired Tethermage | 3 | NEW (FRA) | NO | = | Planeswalker-matters beater; the deck makes no Jace tokens |
| 61 | Loot, the Nexus | 3 | NEW (FRA) | SIDE | = | Dork: one mana of ONE chosen colour per DIFFERENT power among your creatures (tokens 1, Chatterfang 3, Loot 2, Squirrel Girl 4, Blood Artist 0) — ~3–5 from a 3-drop, and it fixes {B}. The parent's Circle of Dreams Druid analogue |
| 62 | Pia, Aether Ascetic | 3 | NEW (FRA) | SIDE | = | ETB discard → tutor ANY enchantment: Doubling Season, Parallel Lives, Meathook, Cryptolith Rite, Bastion (or Gardenize). The deck has no working tutor (From Beyond's finds no Eldrazi) |
| 63 | Restore with Empathy | 3 | NEW (FRA) | NO | = | Permanent regrowth + gain 4; the deck doesn't need recursion |
| 64 | Simulacrum Shaper | 3 | NEW (FRA) | SIDE | = | Unconditional ramp on a body: basic onto the battlefield (landfall for Provisioner/Tracker/Scute/Avenger) + draw a card when it dies (it will — it's fodder). A Cultivate-grade slot; every current ramp card is cheaper or protected |
| 65 | Way of the Paradox | 3 | NEW (FRA) | NO | = | Extra land drop only on turns you activate a loyalty ability — needs a Jace token the deck doesn't make |
| 66 | Bestial Incursion | 4 | NEW (FRA) | NO | = | 4 MV for a 4/4 Beast (+Squirrel); token engines in list do more per mana |
| 67 | Hexhaven Invigorator | 4 | NEW (FRA) | NO | = | {G}{G}{G}{G} 6/6 whose trigger needs damage DEALT to it — the list has zero ways to damage its own creature (Chatterfang, Toxic Deluge, Meathook, Yawgmoth are all -X/-X or counters). See Pilot's ask |
| 68 | Jiang Yanggu, Never Alone | 4 | NEW (FRA) | NO | = | Untaps all tokens at your end step (mass pseudo-vigilance: attack, then block / tap for Cryptolith mana on their turns) — a cute combat-axis card, but 4 MV for a 2/2 + 3/3 |
| 69 | Titanbones, Towering Heart | 4 | NEW (FRA) | NO | = | Grows +2/+2 per lifegain EVENT (dozens a turn here) — but it's one reach body with no trample and no drain; chump-blocked all day |
| 70 | Edgar, Moonlit Sovereign | 5 | NEW (FRA) | NO | = | Wants you to cast nothing; counter-lord for a deck with no counters |
| 71 | Garruk, Curse Breaker | 5 | NEW (FRA) | NO | = | 5-MV walker; draw keys on power-4+ creatures entering (tokens are 1/1); −3 Beast is a slow token maker |
| 72 | Hungering Puppetbeast | 5 | NEW (FRA) | NO | = | 5-MV 5/5; Heartwood ETB is one noncreature artifact token (+Squirrel); artifact-sac outlet adds counters to itself only |
| 73 | Way of the Wildspeaker | 5 | NEW (FRA) | NO | = | 5 MV for a Jace token with a granted −4 Beast; one Beast per two turns |
| 74 | Wrecking Gecko | 5 | NEW (FRA) | NO | = | 5-MV vanilla-ish 5/5 ward 2 |
| 75 | Vinelasher Adept | 6 | NEW (FRA) | NO | = | 6 MV; basic landcycling {2} is the only relevant text |
| 76 | Ruric Thar, Magecrusher | 7 | NEW (FRA) | NO | = | 7-MV 7/7 beater |
| 77 | Verdant Kraken | 7 | NEW (FRA) | SIDE | = | A 3/3 Forest Tentacle LAND creature token at EVERY player's upkeep — each is a token (+Squirrel) AND a landfall trigger (Provisioner, Tracker, Scute Swarm, Avenger). ~4 token events a round. 7 MV {G}{G}{G}: the Avenger of Zendikar alternative, not a second 7-drop |
| 78 | Omnipresence | 8 | REPRINT (FRA) | NO | = | Reprint. 8 MV; free casts force X=0 on Meathook (LEDGER 2026-08-04); when you have 20 creatures you've already won |
| 79 | Ghalta the Unstoppable | 9 | NEW (FRA) | NO | = | Discount reads GREATEST power (3–4 here) → 5–6 mana for trample-granting; Craterhoof does the finish |

### Multicolor BG

| # | Name | MV | NEW/REPRINT | chatterfang | upgrade-test | Reason |
|---|---|---|---|---|---|---|
| 80 | Ferocity of the Hunt | 2 | NEW (FRA) | NO | = | Returns 'that CARD' — tokens aren't cards; one-shot on a nontoken creature |
| 81 | Primal Witchstalker | 3 | NEW (FRA) | NO | = | ~85% to return a milled land (36 lands in 99) — conditional ramp on a 2/1; Simulacrum Shaper does it unconditionally |
| 82 | Vraska, the Cutting Glare | 3 | NEW (FRA) | SIDE | = | 4/4 deathtouch for 3 whose ETB destroys ANY opponent permanent once you control 6+ lands (they get a Treasure). Assassin's Trophy on a body, late. The any-permanent answer if Lich's Relic is taken and Decay's MV≤3 cap bites |
| 83 | Hapatra, the Desert Fang | 5 | NEW (FRA) | NO | = | X = greatest MV in YOUR graveyard, which this deck doesn't curate; 5 MV for what Lich's Relic does at 3 unconditionally |

### Colorless

| # | Name | MV | NEW/REPRINT | chatterfang | upgrade-test | Reason |
|---|---|---|---|---|---|---|
| 84 | Currency Converter | 1 | REPRINT (FRC) | NO | = | Reprint. Makes a token a turn only off discards; the deck has no discard |
| 85 | Eye of Jace | 1 | NEW (FRA) | NO | = | Surveil trickle then 2 to each opponent once; the graveyard stays thin |
| 86 | Sol Ring | 1 | REPRINT (FRC) | in list | in list | Reprint. Already in both lists |
| 87 | Afterthought Sentry | 2 | NEW (FRA) | NO | = | 2/2 graveyard-hate attacker |
| 88 | Arcane Signet | 2 | REPRINT (FRC) | in list | in list | Reprint. Already in both lists |
| 89 | Fellwar Stone | 2 | REPRINT (FRC) | NO | = | Reprint. 2-MV rock whose colours depend on opponents' lands; Arcane Signet already fills the slot |
| 90 | Karn, Argent Defender | 2 | NEW (FRA) | NO | = | **TRAP** — 'Artifacts and creatures entering don't cause abilities to trigger' turns off Prosperous Innkeeper, Bastion, Woe Strider, Marionette's fabricate, Deep Forest Hermit, Avenger and Squirrel Girl's ETB |
| 91 | Living Library | 2 | NEW (FRA) | NO | = | {6} tuck on a 0/4 |
| 92 | Medic's Kitesail | 2 | NEW (FRA) | NO | = | Flying/lifegain Equipment for one attacker |
| 93 | The Echoverse Fulcrum | 2 | NEW (FRA) | NO | = | {2} loot, then {5} wrath-on-a-stick; Toxic Deluge/Meathook (parent) and Blasphemous Edict (fork) wipe cheaper |
| 94 | Chromatic Lantern | 3 | REPRINT (FRC) | NO | = | Reprint. Fixing a two-colour deck doesn't need |
| 95 | Keeper of the Quiet Hour | 3 | NEW (FRA) | NO | = | 3/2 + empower Jace 2 (Jace token + one Squirrel); surveil only |
| 96 | Murmuring Volume | 3 | NEW (FRA) | NO | = | 3-MV rock + {2} loot; ramp role is full of cheaper pieces |
| 97 | Traxos, Scourge Eternal | 4 | NEW (FRA) | NO | = | 5/4 trample that only untaps when you cast artifact/creature spells |
| 98 | Archive Arbiter | 6 | NEW (FRA) | NO | = | 6-MV flier with Disenchant or gain 4 |
| 99 | Ginger, Queen of Sweets | 6 | NEW (FRC) | SIDE | = | Monarch (a card every end step) + a Gingerbrute at EVERY upkeep while monarch — each a Food creature token (+Squirrel; its self-sac is a Food sacrifice for Camellia); Ginger's own sac gains 6 in one event (Vito). 6 MV colourless top end |
| 100 | Omnath, Locus of the Void | 7 | NEW (FRC) | NO | = | 7-MV mana-banking body; no drain, no tokens |
| 101 | Darksteel Angel | 9 | NEW (FRC) | NO | = | 9 MV |
| 102 | Emrakul, the Exigent Doom | 10 | REPRINT (FRA) | NO | = | Reprint. 10 MV; its {3} exile-to-ramp mode is +1 mana a turn. (It IS an Eldrazi card, so it would revive From Beyond's dead tutor clause — not a reason to run a 10-drop) |
| 103 | Memnarch, the Warden | 10 | NEW (FRC) | NO | = | 10 MV |

### Land

| # | Name | MV | NEW/REPRINT | chatterfang | upgrade-test | Reason |
|---|---|---|---|---|---|---|
| 104 | Command Tower | 0 | REPRINT (FRC) | in list | in list | Reprint. Already in both lists |
| 105 | Exotic Orchard | 0 | REPRINT (FRC) | NO | = | Reprint. Colours depend on opponents; the manabase's duals are better |
| 106 | Fabled Passage | 0 | REPRINT (FRC) | SIDE | = | Reprint. A third fetch: two landfall triggers per play and thins basics (the 2026-09-25 grounds for Catacombs/Misty). Basic enters TAPPED until you control 4 lands — the early-tempo cost is why it's bench. Displaces a basic Forest |
| 107 | Forest | 0 | REPRINT (FRA) | in list | in list | Reprint basic. Already in both lists (6) |
| 108 | Formidable Commons | 0 | NEW (FRA) | NO | = | Enters tapped unless you control a planeswalker — the deck runs none, so a tapped dual |
| 109 | Hall of Echoes | 0 | NEW (FRA) | NO | = | {5}: becomes a copy of your creature and ignores the legend rule — cute (a second Chatterfang doubles the Squirrels; a second Pitiless Plunderer) but {5} a turn on a colourless land |
| 110 | Hexhaven Dueling Arena | 0 | NEW (FRA) | NO | = | {4},{T} prepares a creature — only Bloodline Recollector would use it, and Recollector arms itself |
| 111 | Path of Ancestry | 0 | REPRINT (FRC) | NO | = | Reprint. Enters tapped; any-colour is redundant in two colours |
| 112 | Reflecting Pool | 0 | REPRINT (FRC) | NO | = | Reprint. An untapped 'dual' in this manabase, but a marginal upgrade over any land it would replace |
| 113 | Roiling Canopy | 0 | NEW (FRA) | NO | = | Enters tapped; +3/+3 trigger needs 5 other Forests (Yavimaya helps) — still a tapped mono land |
| 114 | Room of Refuge | 0 | NEW (FRA) | NO | = | Enters tapped; {5} sac for two counters |
| 115 | Swamp | 0 | REPRINT (FRA) | in list | in list | Reprint basic. Already in both lists (5) |

---

## Proposed swaps — chatterfang (each its own decision)

Would become a new **`proposed`** wave in `research/proposal.json` (not edited here). Curve now:
**avg MV 2.73 · MV≤2 30 · MV≤3 48 · MV4+ 15** (63 nonland, commander excluded).

### 1. Gardenize IN → From Beyond OUT

**Deciding axis: mana that grows with the deck's floor action, at one less mana than the slot it takes.**

Where Gardenize sits among the ramp (§2.1 step 4 — it does **not** displace any of these; they are listed
so it is placed honestly):

| Ramp & Mana (10 + 2 candidates) | MV | Unconditional? | Mana it adds | Ceiling | Notes |
|---|---|---|---|---|---|
| Sol Ring | 1 | yes | {C}{C} from turn 1–2 | 2 | best in class |
| Llanowar Elves | 1 | yes (sick one turn) | {G} from turn 2 | 1 | dies to own Deluge |
| Arcane Signet | 2 | yes | 1 any | 1 | survives own wipes |
| Nature's Lore | 2 | yes — land to battlefield | 1 land | 1 | a landfall trigger |
| Sakura-Tribe Elder | 2 | yes — land + a free death | 1 land | 1 | landfall + a drain trigger |
| Cryptolith Rite | 2 | needs non-sick creatures | 1 per creature | board size | |
| Cultivate | 3 | yes — land + land to hand | 1 land | 1 | pilot favourite |
| Tireless Provisioner | 3 | per land drop | Treasure (+Squirrel) per land | per land | |
| Oracle of Mul Daya | 4 | per turn | an extra land drop | 1/turn | landfall package |
| Pitiless Plunderer | 4 | needs deaths | Treasure per death, any colour, instant | unbounded (combo) | combo piece |
| **Gardenize** | **3** | **needs deaths — cumulative** | **{G} per death since it landed** | **grows every turn; ×2 with Doubling Season** | green only, main 1 only |
| Hexhaven Invigorator | 4 (GGGG) | needs an OPPONENT to damage it | 0 unless they choose | any lands | no self-damage source |

Gardenize ranks inside the conditional group, behind Plunderer (instant, any colour, and the loop). It
beats nothing above it on its own, which is why the cut comes from Token Engines, not Ramp.

**Token Engines — the whole role, scored against the current list:**

| Token Engines (16) | MV | Bodies with Chatterfang | Repeats? | Starts the loop without a death? | Other text / pilot history |
|---|---|---|---|---|---|
| Academy Manufactor | 3 | ×3 every Clue/Food/Treasure event | yes | yes | core multiplier |
| Avenger of Zendikar | 7 | ~2 × lands on ETB (~16–18) + Plant counters per land | yes (landfall) | yes | only card above MV5 |
| Bitterblossom | 2 | 2 per own upkeep | yes | yes | 1 life a turn |
| Camellia, the Seedmiser | 3 | 2 per Food-sacrifice event | yes | needs Foods | Food-loop piece |
| Chitterspitter | 3 | 2 per turn for {G} + tap | yes | yes | acorn anthem (opt-in Clamp cost); pilot restored 2026-09-23 |
| Deep Forest Hermit | 5 | 8 once | no | yes | anthem 3 turns (Clamp cost); pilot protected 2026-09-23 |
| **From Beyond** | **4** | **2 per OWN upkeep** (Scion + Squirrel) | yes | yes | **"search for an Eldrazi card" — the list has zero Eldrazi cards** |
| Hazel of the Rootbloom | 4 | 2–4 per end step (copies; ×2 on a Squirrel) | yes | needs a token | token-tap mana |
| Nested Shambler | 1 | 2 × its power, on death | no | no — death-gated | scales with Blade; pilot defended 2026-09-23 |
| Peregrin Took | 3 | +Food (+Squirrel) per event | yes | adder | Food-loop piece |
| Scute Swarm | 3 | 2 per land; copies itself at 6 lands | yes | yes (lands) | |
| Second Harvest | 4 | doubles the token board | no | needs tokens | instant burst |
| Tendershoot Dryad | 5 | 2 per upkeep, **every player's** (8 a round) | yes | yes | Saproling anthem at 10 permanents |
| The Unbeatable Squirrel Girl | 4 | 2 on ETB/attack; `{1}{G}{G}{G}`: 2X | yes | yes | the deck's best green mana sink |
| Tippy-Toe, Terrific Partner | 4 | +Food per event; draws on lifegain | yes | adder | |
| Verdant Command | 2 | 4 once, instant | no | yes | modal: gain 3 (Vito), graveyard exile, counter a loyalty ability |

**From Beyond is the weakest engine by rate:** 4 mana for two bodies on your own upkeep only —
Bitterblossom makes the same two for 2 mana, Tendershoot Dryad makes them on all four upkeeps for 5 — and
its second ability is blank (the tutor needs an Eldrazi *card*; Idol of Oblivion's 10/10 is a token). The
Scion's `Sacrifice: Add {C}` is its one extra. Runner-up: Verdant Command (it is taken by swap 3).

- **Cost-out:** 3 vs 4. **Curve:** avg 2.73 → **2.71**, MV≤2 30 → 30, MV≤3 48 → **49**, MV4+ 15 → 14.
- **Roles:** Ramp & Mana 10 → 11, Token Engines 16 → 15.
- **Self-hits:** none. **Loops:** none new (see the pilot's-ask section).

### 2. Bloodline Recollector IN → Idol of Oblivion OUT

> *"At the beginning of each end step, if three or more creatures died this turn, this creature becomes
> prepared."* // **Ancestral Craving** {B} Instant — *"Target player draws three cards and loses 3 life."*

**Deciding axis: cards per turn — three for {B} against one.**

It re-arms at **each** end step, not just yours (CR 722.3a — it can't be prepared twice, so one pending
copy at a time; casting it unprepares it). Three deaths on your turn is routine here, so it is a draw-three
every turn cycle, and with instant-speed outlets it can re-arm on an opponent's turn too. The copy is a
normal cast at full {B}, from exile (LEDGER 2026-08-06). "Target **player**" also makes it a finisher: an
opponent at 3 or less just loses.

| Card Draw (8 + candidate) | MV | Cards per turn cycle here | Gate | Survives own wipe? |
|---|---|---|---|---|
| Skullclamp | 1 (+{1}) | 2 per 1/1, repeatable per equip | a 1/1 (anthems block it) | yes |
| Moldervine Reclamation | 5 | 1 per death, uncapped, + a lifegain event each | deaths | yes |
| Black Market Connections | 3 | 1 (+ Treasure / Shapeshifter) per turn | life | yes |
| Sylvan Library | 2 | +2 for 8 life, or selection | life | yes |
| Tireless Tracker | 3 | a Clue (+Squirrel) per land; {2} each | land drops | no |
| Deadly Dispute | 2 | 2 once + Treasure | a sacrifice | — |
| Village Rites | 1 | 2 once, instant | a sacrifice | — |
| **Idol of Oblivion** | **2** | **1 per turn, no mana** | a token created that turn (always) | **yes** |
| **Bloodline Recollector** | **2** | **3 per arming for {B} + 3 life; up to once per player's turn** | **3+ creatures died that turn** | **no** — a 2/2 |

Idol wins on exactly two things: it survives your own Toxic Deluge / Meathook (X ≥ 2 kills the 2/2), and
it costs no mana per card. Recollector triples the output for one black mana. Both MV2.

- **Curve:** unchanged. **Roles:** Card Draw 8 → 8.
- **Self-hits / costs:** 3 life per draw-three, alongside Sylvan Library, Bitterblossom and Black Market
  Connections — the deck gains dozens of life a turn, but watch it on a slow start. Recollector is a
  **Vampire**, so Blade of the Bloodchief puts **two** counters on it (that clause has been dead until now).
  Loses its prepared copy if it dies before you cast it.

### 3. Lich's Relic IN → Verdant Command OUT

> *"When this Equipment enters, you may pay {2}. When you do, for each opponent, destroy up to one target
> creature or planeswalker that player controls. Equipped creature gets +2/+1. Equip {2}"*

**Deciding axis: interaction count and quality — a 3-for-1 at 3 mana, one-sided.**

| Removal & Interaction (6 + candidate) | MV | Speed | What it answers | Answers per card |
|---|---|---|---|---|
| Assassin's Trophy | 2 | instant | any opponent permanent (they get a basic) | 1 |
| Abrupt Decay | 2 | instant, uncounterable | nonland, MV ≤ 3 | 1 |
| Beast Within | 3 | instant | any permanent (they get a 3/3) | 1 |
| Tear Asunder | 2 / 4 | instant | artifact/enchantment; kicked any nonland, **exile** | 1 |
| Heroic Intervention | 2 | instant | protection, not removal | — |
| Plumb the Forbidden | 2 | instant | wrath insurance (board → cards) | — |
| **Lich's Relic** | **1 (+{2} = 3)** | sorcery-speed (ETB) | creatures / planeswalkers | **up to 3** |

It doesn't out-rank any single instant on flexibility — they answer noncreature threats at instant speed
and it doesn't — so it goes in **beside** them (real removal 4 → 5; the founding target for this role was
7, it is at 6), with the cut from Token Engines. Opponents' creatures **die** (not exile), so each kill is
a Blood Artist / Meathook / Blade trigger.

**The cut:** after From Beyond, **Verdant Command** is the smallest card left in Token Engines — four
bodies once, where every other card there repeats, multiplies, or (Nested Shambler, Deep Forest Hermit)
is one the pilot has explicitly kept. Its gain-3 mode does feed Vito; that is the cost to name.
**Alternative cut: Abrupt Decay** — keeps Token Engines at 15 and removal at 6, but loses the only
uncounterable answer and instant-speed coverage of cheap noncreature threats.

- **Cost-out:** printed MV1, **realistic 3** (the {2} is paid on the ETB). **Curve:** with all three swaps,
  avg 2.73 → **2.70**, MV≤2 30 → 30 (Relic counted at printed 1 — really a 3), MV≤3 48 → **49**.
- **Roles (all three):** Ramp 10 → 11 · Card Draw 8 · Removal 6 → **7** · Token Engines 16 → **14**.
  Death-independent token makers after both engine cuts are still well over the ~12 floor (LEDGER
  2026-09-24): Bitterblossom, Chitterspitter, Tendershoot, Hermit, Avenger, Scute Swarm, Squirrel Girl,
  Black Market Connections, Khalni Garden, Provisioner, Tracker, Innkeeper, Marionette, Woe Strider,
  Bastion, Deadly Dispute.
- **Self-hits:** none — only opponents' permanents are targeted. The +1 toughness only matters to
  Skullclamp on the creature wearing it. **Game Changers:** still 1/3.

## Proposed swap — upgrade-test

### Lich's Relic IN → Woe Strider OUT

**Deciding axis: the fork's flagged weakness.** Its own decision log (2026-09-25) names removal 6 → 5 as
the thinnest the deck has been; real removal there is only Assassin's Trophy, Beast Within and Tear
Asunder (Heroic Intervention and Plumb are protection). Relic makes it 4 answers covering up to 6 targets.

| Sacrifice Outlets (6) | MV | Per sacrifice | Other text |
|---|---|---|---|
| Ashnod's Altar | 3 | {C}{C} | combo piece |
| Yawgmoth, Thran Physician | 4 | draw + a -1/-1 counter (1 life) | proliferate; added wave 3 |
| Carrion Feeder | 1 | +1/+1 counter on itself | can't block |
| Viscera Seer | 1 | scry 1 | |
| Ravenous Squirrel | 1 | grows; `{1}{B}{G}`: gain 1 + draw | Squirrel |
| **Woe Strider** | **3** | **scry 1** (another creature) | Goat token on ETB; escape |

The fork is **one over** the founding outlet target (5) because Yawgmoth joined, and it also has
Phyrexian Tower, High Market, Grim Backwoods and Chatterfang's own ability. Woe Strider is the most
expensive outlet with the smallest payoff per sacrifice.

**Why not Concordant Crossroads** (the fork's weakest *mana* card): Craterhoof's grounds depend on it —
this turn's tokens can't attack without haste — and the fork's wave-5 lesson is that its mana is cut last.

- **Curve:** avg 2.83 → **2.79**, MV≤2 27 → **28** (Relic at printed 1), MV≤3 48 → 48.
- **Roles:** Removal 5 → 6, Sacrifice Outlets 6 → 5.

---

## Bench (SIDE) — what each would displace

| Card | Lists | Would displace | Why it's bench, not main |
|---|---|---|---|
| Gardenize | upgrade-test | Ninja Pizza | fork ramp already 14; its problem is win turn, not late mana |
| Bloodline Recollector // Ancestral Craving | upgrade-test | a ramp slot | Yawgmoth already draws per sacrifice there |
| Dreadhorde Invasion | both | From Beyond (parent, if Gardenize is declined) | a 2-MV Bitterblossom twin only if the Army is sacrificed each turn |
| Vraska, the Cutting Glare | both | Abrupt Decay | any-permanent removal on a 4/4 deathtouch, but only with 6+ lands |
| Simulacrum Shaper | both | a ramp slot if one opens (Cultivate is protected) | unconditional land + a card on death; GG at 3 |
| Greenhouse Propagator | both | Prosperous Innkeeper's role, as a second copy | lifegain event per creature entering + a dork; 3 MV and summoning-sick |
| Loot, the Nexus | both | a Token Engines slot | ~3–5 mana of one chosen colour; the parent's Circle of Dreams analogue |
| Pia, Aether Ascetic | both | a Token Engines slot | the only real tutor on offer — Doubling Season, Meathook, Cryptolith, Gardenize |
| Ginger, Queen of Sweets | both | Avenger of Zendikar | monarch + a Food-creature token every upkeep; 6 MV |
| Verdant Kraken | both | Avenger of Zendikar | 4 land-creature tokens a round, each a landfall trigger; 7 MV, slow to start |
| Silence the Echo | both | Abrupt Decay | {1}{B} kill with a free sacrifice cost; sorcery |
| Break Under Pressure | both | Abrupt Decay | instant edict on the biggest creature/PW |
| Fabled Passage | both | a basic Forest | third fetch (two landfall triggers); tapped until 4 lands |

---

## Traps — read well, do the opposite of what they seem

- **Liliana the Repentant** — *"Whenever another creature or planeswalker you control enters, mill two
  cards."* Mandatory, per creature. One Chatterfang token event is 2+ creatures; a 20-token turn mills
  40+. Decks the pilot.
- **Garruk, Veiled Butcher** — *"If a creature an opponent controls would die, exile it instead."*
  Switches off Blood Artist's, Meathook's and Blade of the Bloodchief's opponent-side triggers (LEDGER
  2026-08-09). Its −2 edict is symmetric too.
- **Karn, Argent Defender** — *"Artifacts and creatures entering the battlefield don't cause abilities to
  trigger."* A Torpor Orb aimed at our own Innkeeper, Bastion, Woe Strider, Marionette, Hermit, Avenger
  and Squirrel Girl.
- **Overwrite the Multiverse** — exiles every creature. Tokens exiled don't die: zero drain.
- **Omnipresence** — free casts force Meathook to X = 0 (LEDGER 2026-08-04), and it's 8 mana to win a
  game you've already won.
- **Hexhaven Invigorator** — looks like a landfall bomb in a landfall deck; the trigger belongs to the
  opponents (see the pilot's-ask section).
- **Extrapolate the Impossible** — a blank in Commander. CR 903.11 lets in only "effects that
  *specifically* bring cards into Commander games from outside the game"; this card says "from outside
  the game" generically, so it cannot bring anything in. (Corrected by the parent review 2026-09-28 —
  the first draft read 903.11 as permitting it.)

## Open rules questions (not load-bearing for any verdict above)

- Whether **Karn, Argent Defender** also stops Mirkwood Bats' *"whenever you **create** … a token"*
  trigger (creation puts the token onto the battlefield, CR 111.2, but the trigger event is "create", not
  "enters"). Karn is a NO either way.
