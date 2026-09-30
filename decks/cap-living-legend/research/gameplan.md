# Captain America, Living Legend — gameplan notes

Pilot-facing sequencing notes for both lists (`DECK.md`, `DECK-COUNTERS.md`). Rules verified by
`mtg-rules-expert`; citations are to the Comprehensive Rules effective 2026-08-07.

## Protecting Cap from two removal spells (Giver / Mother / Patriot) — 2026-09-10

**Colour is chosen when Giver's or Mother's ability *resolves*, not when you activate it** (CR 700.2 —
it isn't modal; 608.2d). On activation you only pick the target.

**On your turn, an opponent always gets a window while Giver is still tapped.** Tapping Giver triggers
Cap, and that untap trigger goes on the stack *above* Giver's ability before anyone gets priority
(CR 117.5, 603.3). It only resolves once every player passes (117.4), so an opponent can cast their
second spell on top of it. Giver is still tapped at that point and can't be activated (107.5).

**On an opponent's turn you get one activation.** Cap's untap is "during your turn" only, and
Drumbellower only untaps during their untap step, before any spell exists.

**The pro-white trap.** Giver and Mother are **white** sources. If you give Cap protection from white
while one of your own Giver/Mother abilities is still on the stack targeting him, that ability's
target becomes illegal and it does nothing (CR 702.16b, 608.2b; 113.7a if Giver has left). So:

```
top  Giver #2  -> resolves: Cap gets pro-white
     WHITE     -> fizzles (pro-white)
     Giver #1  -> FIZZLES: a white source can't target a pro-white Cap
bot  RED       -> resolves and hits Cap
```

Choosing red on Giver #2 fails too: WHITE resolves and hits Cap before Giver #1 ever resolves.

**What to do instead:**
1. Red spell targets Cap → activate Giver on Cap; choose red when it resolves.
2. A second spell arrives before Giver #1 resolves:
   - **Not mono-white** → a second Giver or Mother activation, choosing that spell's colour (for a
     white-and-X spell, choose X — still stops it, and doesn't fizzle Giver #1).
   - **Mono-white** → **Patriot, Shield Wielder** ({2}, hexproof). Hexproof only stops *opponents*
     (702.11b), so Giver #1 still resolves. Or **Clever Concealment**, at the cost of Cap being phased
     out until your next untap step (702.26a).
3. White spell arrives *after* Giver #1 has already resolved → Giver #2 choosing white is fine.
4. **Give pro-white last.** Once Cap has it, none of your white cards can target him that turn: Giver,
   Mother, Patriot, Urdnan (its double-strike trigger fails if Cap is the only target), Clever
   Concealment. Blue cards — Iron Man's counter trigger — still can.
5. On your turn, assume a good opponent casts spell two while Cap's untap trigger is on the stack.
   **Hold {2} for Patriot.**

## `DECK-COUNTERS.md` v2 — lifelink voltron sequencing — 2026-09-10

**The core line.** Get Light of Promise on Cap, then lifelink (Shadowspear, Loxodon Warhammer,
Batterskull, or Heliod's {1}{W}: target creature gains lifelink). Every connected hit gives counters
equal to the damage. Commander's Plate + Shadowspear makes the first hit 7 and the second hit lethal.

**Never give Cap pro-white or pro-blue** with Mother of Runes / Giver of Runes. Light of Promise and
Maul of the Skyclaves are white; Stark's Ingenuity is blue. Protection from their
colour puts the Auras in the graveyard and unattaches the Equipment (CR 702.16c/d). Choose another
colour (pro-black against black removal is fine), or protect him with **hexproof**: Patriot,
Shield Wielder; Swiftfoot Boots; Captain America, Super-Soldier.

**Get the life-gain payoffs down before the life gain.** Heliod and Archangel of Thune trigger per
life-gain event, so land them before a turn where Soul Warden / Auriok Champion will see several
creatures enter (Adeline's attack tokens, Brimaz, Shorikai Pilots, Batterskull's Germ, opponents'
casts).

**Heliod + Walking Ballista** — Ballista needs **two** counters to start the loop. Tell the table
when it's live.

## `DECK-COUNTERS.md` v2 — win conditions and turn plan — 2026-09-10

**The win condition is 21 commander damage from Cap.** Everything else accelerates it. Three speeds
(one opponent, Cap connecting; lifelink always on from the gear):

| Setup | Kill | How |
|---|---|---|
| Floor — no counter engine | **3 hits** | Shadowspear + Commander's Plate (7/8), or Batterskull alone (7/8): 7 + 7 + 7 |
| + Light of Promise | **2 hits** | hit for 7 → gain 7 → +7 counters → 14/15 → 7 + 14 = 21 |
| + Light of Promise + Urdnan's double strike | **1 combat** | needs 2+ counters first, so 9/10: first strike 9 → +9 counters → 18 → **27** |

The one-combat line is verified (mtg-rules-expert, CR 2026-08-07): the Light of Promise trigger goes
on the stack in the first-strike damage step (603.3, 510.3a) and resolves before the regular step
(117.4, 500.2); Cap's power is re-read for the second hit (510.1a); both steps are combat damage from
the commander (510.4, 903.10a). Through a chump blocker with trample it's still ≥25 — the blocker is
gone for the second step, so all of it goes to the player (702.19d). Opponents get a priority window
in the first-strike step to remove Cap or the double strike (702.4c); damage already dealt stays.

**Getting Cap to 2 counters before Urdnan's trigger resolves:** Urdnan's own ETB (1), any life gain
under Light of Promise (Soul Warden seeing a creature enter = 1), Heliod, Umezawa's Jitte's life mode from an
earlier hit, a previous hit. Urdnan needs Cap to have at
least one counter just to target him.

**Backup wins:** Heliod + Walking Ballista (Ballista at 2+ counters — say it to the table) ·
Archangel of Thune putting a counter on every creature per life-gain event, with Adeline's and
Brimaz's attack tokens swinging wide · Walking Ballista spraying counters as damage.

**Turn plan**
- T1–2: Soul Warden / Auriok Champion, Mother / Giver, Stoneforge Mystic, Puresteel Paladin, Sram,
  Agent Phil Coulson; Sol Ring / Arcane Signet. **Urza's Saga fetches Shadowspear or Commander's
  Plate** — both cost {1}.
- T3: Cap. His untap doubles every `{T}` creature from here — Stoneforge's put-into-play, Mother /
  Giver, Coulson.
- T3–5: gear up — a lifelink piece + a stat piece + evasion (Maul, Pippin, Gideon's Lawkeeper
  tapping blockers). Super-Soldier Serum attaches all of it free on each attack. Light of Promise when available (Enlightened Tutor finds it).
- Every turn after: swing. Keep {2} open for Patriot.

**What beats this deck, and the answers in the list**
- **Exile or bounce on Cap.** Auras fall off; Equipment stays. Swiftfoot Boots, Super-Soldier,
  Patriot, Mithril Coat (flash, indestructible), Counterspell, Dovin's Veto.
  The Ozolith keeps his counters for the recast.
- **Life-gain hate — the deck's worst matchup.** Tainted Remedy and Rain of Gore turn your life gain
  into life *loss*, so every lifelink hit costs you that much life; Erebos, God of the Dead
  (opponents can't gain life), Sulfuric Vortex and Leyline of Punishment (no one gains life) switch
  the engine off. Commander's Plate doesn't help — none of them target. **Remove them before
  swinging:** March of Otherworldly Light, Generous Gift, Stroke of Midnight, Cyclonic Rift, or
  counter them. Erebos is indestructible — use March (exile) or Rift.
- **Board wipes.** Teferi's Protection, Clever Concealment; Equipment survives; Batterskull returns to
  hand for {3}.

## Akroma's Will — the second double-strike source (v2.2, 2026-09-10)

Instant. **Choose the first mode only**: your creatures gain flying, vigilance and double strike. The
second mode's protection from each colour would put Light of Promise, Super-Soldier Serum, Aqueous
Form and Stark's Ingenuity in the graveyard and unattach Maul (CR 702.16c/d) — even though you may
choose both modes while you control a commander.

Cast it **after blockers are declared, before the first-strike damage step**. A creature that gains
double strike before that step deals damage in both steps (702.4d), so the Light of Promise growth
between hits still happens, and the flying came too late for them to block around it.

## `DECK-ENGINE.md` — how to play it (2026-09-10)

**The rhythm every turn:** tap a creature for its first job (crew / station / Opposition / Relic of
Legends / convoke) → Cap untaps it → tap it again for its own ability (draw, mana, tap a blocker,
removal, protection). "Becomes tapped" creatures (Fallowsage, Tui and La, Mechan Navigator, Sanwell,
every blue creature under Unctus) trigger on both taps. Summoning-sick creatures can still crew,
station, convoke and pay Relic — only their own {T} abilities wait. *(2026-09-16: Thousand-Year Elixir
and Grand Architect are cut; Opposition is now the free tap outlet.)*

**The Ioreth budget:** at most ~3 Ioreth activations on your turn (its own, Cap's untap, Minamo ({U}),
plus one per Halo Fountain activation that untaps her). Point them at Arcanis (mode 2 untaps two legends — Arcanis can reach 6 activations,
18 cards) or at a crewed Shorikai.

**Split Up with Adept Watershaper:** tap your creatures twice (the second tap sticks), then choose
**"destroy all tapped creatures"** — yours are indestructible, theirs die. Or choose "untapped" when
your side is all double-tapped. A creature tapped only once has been untapped by Cap.

**Protection by tapping:** with The Wandering Rescuer out, tap a creature in response to targeted
removal and it has hexproof when the removal resolves. On your turn Cap untaps a first tap first — tap
it again once his trigger resolves. *(2026-09-16: Drumbellower and Unwinding Clock are out, so creatures
you double-tap on your turn stay tapped through opponents' turns — Watershaper's indestructible and
Rescuer's hexproof stay on. The cost: tapped creatures can't block.)*

**Never add** a second untapper-of-permanents, Marvin, a self-untapping artifact, or Deadeye Navigator —
see the list header; each of them makes a circuit infinite.

## `DECK-ENGINE.md` — surviving the wipe (2026-09-16)

Added after the pilot lost games to a turn 4–5 wipe. The plan is to **let their wipe resolve and keep
your board**, so their side dies and yours doesn't.

**Which answer beats which wipe** (✓ = covers it):

| | Destroy | Damage | Exile | −X/−X | Bounce |
|---|---|---|---|---|---|
| Teferi's Protection · Clever Concealment · Guardian of Faith (phasing) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Eerie Interlude (blink) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Fierce Guardianship · Counterspell · Dovin's Veto | ✓ | ✓ | ✓ | ✓ | ✓ |
| Flawless Maneuver · Akroma's Will (indestructible) | ✓ | ✓ | — | — | — |
| Faith's Reward (returns what died) | ✓ | ✓ | — | ✓ | — |

**Free while Cap is on the battlefield:** Fierce Guardianship and Flawless Maneuver. You can tap out on
your turn and still answer a wipe on theirs.

**Eerie Interlude timing:** cast it in response, *before* the end step begins — cast during an end step,
the return waits for the next turn's end step (CR 513.2). Cast on an opponent's turn, the creatures come
back at that end step and are fully live on your turn (they can attack and use {T} abilities). Don't
target tokens (they're gone for good), a Spacecraft at its threshold (charge counters reset), or
Hangarback Walker (returns with 0 counters and dies with no Thopters). Phasing keeps all three.

**Guardian of Faith:** flash it in response; the other creatures phase out until your next turn, keeping
counters, tokens and tapped status. They can't block while phased out.

**Faith's Reward and Cap:** when Cap dies you choose right then whether he goes to the command zone
(CR 903.9a) — one time only, before you can cast anything. Leave him in the graveyard and Faith's Reward
returns him with the board at no tax. If it gets countered he's stuck there, so against open blue mana
send him home.

**Command Beacon:** once Cap has died, sacrifice it to put him into your hand and cast him for {1}{W}{U}.
Tax only counts casts from the command zone.

**Akroma's Will:** with Cap out you get both modes. On their turn it's indestructible + protection from
each colour; on yours, with Vehicles crewed, it's team flying + double strike for the kill. Protection
from white and blue also stops *your own* Giver, Mother, Pippin and Eerie Interlude from targeting those
creatures that turn — use those first.

**Rebuilding after a wipe you couldn't stop:** The Wandering Emperor and Gideon make a 2/2 every turn;
Mishra's Factory and Castle Ardenvale make crew from lands; Hangarback Walker dies into flying Thopters;
Shorikai makes Pilots; Mech Hangar animates a Vehicle with no crew at all. Restart with the cheapest
Vehicle (Smuggler's Copter crew 1, Royal Talon Fighter Jet crew 2).

**Restoration Angel mid-turn:** after a creature has used both taps, blink it — it returns untapped, and
Cap untaps its next tap again. It's summoning sick, so only crew, station, convoke, Relic and Architect
can use it; its own {T} abilities wait until your next turn. Blink it only after Cap's
untap trigger for it has resolved, or that untap is wasted.

**Your own wipes:** double-tap your team, then Split Up "destroy all untapped creatures". Winds of
Abandon overloaded only hits opponents.

## `DECK-ENGINE.md` — the drain plan (2026-09-16)

The deck no longer wins by attacking. Three cards convert the tap engine into damage at **all three**
opponents at once, and none of them can be chump-blocked.

| Card | What it does per turn |
|---|---|
| Throne of the God-Pharaoh | each opponent loses life equal to your tapped creatures, at your end step |
| Psychosis Crawler | each opponent loses 1 for every card you draw |
| Halo Fountain | untap fifteen tapped creatures → you win the game |

**The free double-tap pass.** Cap untaps the first tap of each creature, so a board tapped once counts
**zero** for Throne. Every creature needs a second tap, and both ways are free:

1. **Crew a Vehicle twice.** Pass 1 taps the team and Cap refunds it; pass 2 sticks. Crew has no
   frequency limit, and Kotori makes every Vehicle crew 2.
2. **Opposition on itself.** Target a creature, then pay the cost by tapping that same creature. The
   untap trigger resolves before the ability, so it ends up tapped. One activation, no mana.

**Do it in response to Throne's trigger** in your end step. Your blockers stay available all turn, and
the taps all resolve before Throne counts. With Myrel out, opponents cannot respond at any point.

**Accounting** for 10 creatures plus a crewed Vehicle: 11 tapped = 11 from each opponent (33 across the
pod). The tokens made during the pass push it to 15, one doubler to 19, both to 27. Fifteen tapped
creatures is also exactly Halo Fountain's win, so the same pass assembles both.

**Three traps:**
- **Your own library.** Unctus's granted loot is mandatory, and the Faerie and Merfolk tokens are blue —
  two forced draws per blue creature per turn. Count before a big pass.
- **Opposition wastes mana creatures.** Tapping a permanent to pay a cost is not activating its mana
  ability, so you get no mana. Tap dorks with their own abilities; point Opposition at creatures whose
  value is in *becoming* tapped (Stonybrook Schoolmaster, Pestered Wellguard, Fallowsage, Mechan
  Navigator, Sanwell, anything blue under Unctus).
- **Everything you tap stays tapped through their turns and can't block.** That is what Adept Watershaper
  (indestructible), The Seriema (legends) and The Wandering Rescuer (hexproof) are protecting.

**Any token that ENTERS tapped is exempt from Cap's trigger** (603.2e), so it counts for Throne immediately
without needing a second tap. Prefer token makers that create their tokens tapped where there's a choice.
*(2026-09-16: Adeline, the deck's example of this, was cut with the combat package.)*

## `DECK-ENGINE.md` — the six non-combat wins (2026-09-16)

You never need to attack. Six closers, in the order they usually arrive:

| Card | Rate | Notes |
|---|---|---|
| Throne of the God-Pharaoh | tapped creatures, to each opponent, every end step | needs the double-tap pass |
| Psychosis Crawler | 1 to each opponent per card drawn | a 10-draw turn is 30 across the pod |
| Monument to Endurance | 3 to each opponent, once per turn | first discard each turn; Unctus and Shorikai loot constantly |
| Halo Fountain | outright win | untap fifteen tapped creatures; the double-tap pass assembles it |
| Approach of the Second Sun | outright win | 7 mana, twice; the second copy returns seventh from the top |
| Jace, Wielder of Mysteries | outright win | you win instead of losing when you'd draw from an empty library |

**Jace is insurance, not a plan.** Unctus's granted loot is mandatory and Halo Fountain's second mode
draws — this deck can run itself out of library. With Jace on the battlefield that stops being a loss.

**Finding them:** Tribute Mage fetches Throne (MV 2), Trophy Mage fetches Halo Fountain or Monument
(MV 3), Fabricate fetches any artifact. The Seriema fetches a legendary creature; Urza's Saga fetches a
cheap artifact.

**Myrel is protection now.** Her static stops opponents casting or activating during your turn, which is
what makes the end-step Throne pass uninterruptible. Don't build around her Soldiers.

**Akroma's Will** is a protection spell in this build — the indestructible plus protection-from-each-colour
mode. The double-strike mode is only live if you happen to have an attack worth making.

