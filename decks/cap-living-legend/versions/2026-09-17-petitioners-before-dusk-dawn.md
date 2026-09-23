# Captain America, Living Legend — Persistent Petitioners (Self-Mill)

Commander: Captain America, Living Legend (UW)
Bracket: 3   ·   Total: 100/100

Game Changers (3/3 — at the bracket 3 cap): Grand Arbiter Augustin IV · Teferi's Protection · Thassa's Oracle

> **The pilot's favourite** — 2026-09-17: *"I love playing the petitioners deck … it's quite easy to get like 4
> on the board."* Reworked the same day to **win by milling itself, as fast and as optimally as possible.**
>
> **The engine.** Persistent Petitioners: "Tap four untapped Advisors you control: Target player mills twelve
> cards." Cap untaps each Advisor's FIRST tap, so the same four activate twice — 6 cards per Advisor per turn.
> Drumbellower untaps your whole board on every opponent's untap step, and the ability has no timing
> restriction, so each Advisor gets **5 taps per rotation**. Herald's Horn, Urza's Incubator and Grand Arbiter
> Augustin IV put every Petitioner at {U}. A deck may run any number of Persistent Petitioners.
>
> | Advisors on board | One main phase | Per rotation with Drumbellower |
> |---|---|---|
> | 4 | 24 | 60 |
> | 8 | 48 | 120 |
> | 12 | 72 | 180 |
>
> "Target player" means every activation can be pointed at **yourself** — or at an opponent.
>
> **How it wins.**
> - **Thassa's Oracle** — when it enters, you win if your library holds no more cards than your devotion to
>   blue. At zero that is automatic, and killing the Oracle in response does not stop the trigger.
> - **Jace, Wielder of Mysteries / Laboratory Maniac** — a draw from an empty library becomes a win.
> - **Mathemagics** ("target player draws 2^X"). With Jace or Lab Man out, aim it at yourself once your library
>   is small — X=4 costs 10 and wins at 15 cards or fewer; draws happen one at a time (CR 121.2). Aimed at a
>   milled-out opponent, **X=0 kills them immediately for {U}{U}** instead of waiting for their draw step
>   (CR 121.4). NEVER aim it at yourself for more than your library without Jace or Lab Man out.
>
> **Do you need anything in hand?** Once your library is empty, every card you own is in your hand, your
> graveyard or on the battlefield — the Oracle is always reachable:
> - Oracle in hand → cast it.
> - Oracle in graveyard → Raise the Past or Return to the Ranks **from your hand** (neither works from the
>   graveyard). Raise the Past returns every creature with mana value 2 or less: the Oracle AND every Petitioner.
> - Your recursion spell got milled too → Snapcaster Mage from hand gives it flashback.
> - Hand empty → Sevinne's Reclamation straight from the graveyard (flashback {4}{W}) returns the Oracle. The
>   only line that needs nothing in hand.
> - Muddle the Mixture transmutes for any mana-value-2 card: the Oracle or Mathemagics.
>
> **The fastest line.** Hold Raise the Past or the Oracle; land Jace or Lab Man first if you have one. In a
> single main phase, point the Petitioners at yourself (eight Advisors mill 48), Traumatize yourself for half,
> then cast the Oracle or Raise the Past. Emptying out and winning in the same main phase means the draw-step
> trap below never comes into play.
>
> **The draw-step trap.** Mesmeric Orb mills you whenever your permanents untap, and those triggers resolve in
> your **upkeep, before your draw** (CR 502.4, 503.1a). With Drumbellower it mills you on every opponent's
> turn too, and Fraying Sanity cast on yourself mills you again at every end step. Any of them can empty you
> *between* your turns — and the Oracle cannot save you, because it cannot be cast before your draw step.
> **Put Jace or Lab Man on the battlefield before Mesmeric Orb or a self-targeted Fraying Sanity.** Decline
> optional draws (Mystic Remora) once you are low.
>
> **It still mills opponents.** Every Petitioner can target anyone, Mesmeric Orb mills each opponent on their
> own untap step, and Fraying Sanity can enchant an opponent instead. A decked opponent survives until they
> next draw — Mathemagics for X=0 finishes them.
>
> **Masako the Humorless is load-bearing:** "tapped creatures you control can block as though they were
> untapped" — this deck taps its board every turn. Adept Watershaper makes those tapped Petitioners
> indestructible.
>
> **Mana.** Holdout Settlement, Survivors' Encampment and Springleaf Drum tap a creature for mana, but that is
> only free when taps are going spare: N Advisors give 2N taps and floor(N/2) activations, so an EVEN count
> leaves none over and an ODD count leaves two. Mana creatures were tried and reverted (2026-09-16) — the
> tap-four ability costs no mana, and a myr is not an Advisor.
>
> **No unbounded loops.** The only untap effects are Cap (once per creature per turn) and Drumbellower
> (untap steps only). Mesmeric Orb converts ANY infinite untap into infinite self-mill, which with Thassa's
> Oracle is an instant win, so **never add:**
> 1. **Basalt Monolith** — untaps itself for {3} while tapping for {C}{C}{C}: infinite self-mill with the Orb.
> 2. **Two "{T}: untap target permanent" creatures** — any pair of Ioreth of the Healing House, Kelpie Guide,
>    Marvin Murderous Mimic, Aphetto Alchemist. They untap each other forever.
> 3. **Thousand-Year Elixir** beside one of those — loops at {1} a cycle.
> 4. **Painter's Servant** (with Grindstone) and **Rest in Peace** (with Helm of Obedience) — deterministic
>    library-emptying two-card combos, both legal in these colours.
>
> **History.** Renamed 2026-09-17 — this list was `DECK-MILL.md` until then; older `research/decisions.md`
> entries and `versions/*mill-before*` snapshots use that name. Until the self-mill rework it was a pure
> opponent-mill list: 33 Petitioners, Bruvac the Grandiloquent, The Water Crystal and Rhystic Study.
>
> Sits beside DECK.md, DECK-COUNTERS.md, DECK-ENGINE.md and DECK-MILL.md (the 8-copy Advisor / Oracle mill).
> Grounds: research/decisions.md.

## Commander (1)

1x Captain America, Living Legend

## Lands (35)

1x Adarkar Wastes
1x Command Tower
1x Deserted Beach
1x Flooded Strand
1x Floodfarm Verge
1x Glacial Fortress
1x Hallowed Fountain
1x Holdout Settlement
12x Island
1x Minamo, School at Water's Edge
1x Mystic Gate
1x Otawara, Soaring City
6x Plains
1x Prairie Stream
1x Prismatic Vista
1x Sea of Clouds
1x Seachrome Coast
1x Survivors' Encampment
1x Tundra

## The Engine (27)

27x Persistent Petitioners

## Win Conditions — Mill Yourself (4)

1x Jace, Wielder of Mysteries
1x Laboratory Maniac
1x Mathemagics
1x Thassa's Oracle *GC*

## Self-Mill (3)

1x Fraying Sanity
1x Mesmeric Orb
1x Traumatize

## Get the Win Back — Recursion & Tutors (5)

1x Muddle the Mixture
1x Raise the Past
1x Return to the Ranks
1x Sevinne's Reclamation
1x Snapcaster Mage

## Support Advisors (3)

1x Grand Arbiter Augustin IV *GC*
1x Masako the Humorless
1x Omen Hawker

## Defence — You Are Always Tapped Out (3)

1x Adept Watershaper
1x Ghostly Prison
1x Propaganda

## Ramp & Cost Reducers (8)

1x Arcane Signet
1x Drumbellower
1x Fellwar Stone
1x Herald's Horn
1x Sol Ring
1x Springleaf Drum
1x Talisman of Progress
1x Urza's Incubator

## Interaction (6)

1x Counterspell
1x Dovin's Veto
1x Path to Exile
1x Swan Song
1x Swords to Plowshares
1x Winds of Abandon

## Protection (4)

1x Clever Concealment
1x Flawless Maneuver
1x Guardian of Faith
1x Teferi's Protection *GC*

## Draw (1)

1x Mystic Remora
