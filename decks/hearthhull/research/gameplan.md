# Hearthhull — gameplan

How the deck plays, for the pilot. Card choices and their grounds are in `decisions.md`.

## The engine in one line

Every land is a payoff twice. It's a landfall trigger when it enters, and with Hearthhull at 8
charge counters it's 2 life from each opponent when you sacrifice it. Land recursion then replays it
to do both again. A fetch land does all of it in one card: it enters (landfall), you sacrifice it
(drain), and the land it finds enters (landfall again).

## Stationing Hearthhull

- **Station costs a creature tap, not mana.** Tap another creature you control at sorcery speed and
  Hearthhull gets charge counters equal to that creature's power. A creature you cast this turn can
  do it (ledger tap-011, CR 302.6, 702.184a).
- **2 counters turns on the draw.** `{1}, {T}, Sacrifice a land: Draw two cards. You may play an
  additional land this turn.` Below 8 counters Hearthhull isn't a creature, so this works the turn it
  comes down (CR 722.2b). Use it every turn: the sacrificed land is food for Titania, Gitrog,
  Korvold and the recursion pieces, and the extra land drop is another landfall trigger.
- **8 counters turns on the drain** and makes it a 6/7 flier with haste and vigilance. The counters
  never leave, so stack them over a few turns. Fast routes: Titania's 5/3 tokens, Omnath's 5/5s,
  Rampaging Baloths' 4/4s, The Gitrog Monster (6), Baloth Prime's 4/4 tokens.
- **Exploration Broodship also stations** (3 for an extra land drop). Early, give it the first tap
  if Hearthhull isn't out yet. Once Hearthhull is down, it gets the taps until it reaches 8.

## Opening hands

- Keep hands with two or three lands and a land ramp spell or an extra land drop. A fetch land counts
  as a land and a sacrifice.
- Turn 2 to 3: ramp that puts lands onto the battlefield (Nature's Lore, Three Visits, Farseek,
  Harrow) or Lotus Cobra. Turn 3 to 4: Hearthhull, plus any 2-power creature to station it to 2.
- Hold fetch lands uncracked when a landfall payoff is about to land, so the payoff sees both
  triggers.

## Sequencing landfall

- **Crack fetch lands with payoffs out.** Each pinger (Tannuk, Koth, Sabotender, Captain Burnham)
  deals 2 to each opponent per fetch land, and Retreat to Hagra drains 2.
- **Tannuk draws on its second trigger each turn.** Two lands, or one fetch land, is a card.
- **Ancient Greenwarden doubles every landfall trigger** (one land fires each payoff twice). It
  doesn't double Hearthhull's drain, which comes from sacrificing a land, not from a land entering.
- **Many lands entering at once trigger landfall once each** (CR 603.2c). Splendid Reclamation
  returning 10 lands is 10 triggers on every payoff.
- **Field of the Dead** needs seven lands with different names. Basics count once per name, so
  get the duals, shocks and utility lands out first.

## Finishers

- **Zuran Orb and a mass return (Hearthhull at 8).** In one main phase: tap every land for mana,
  sacrifice them all to Zuran Orb (each opponent loses 2 per land, and you gain 2), then use the
  floating mana on Splendid Reclamation, Worldsoul's Rage or Aftermath Analyst. Mana only empties
  when the phase ends (CR 106.4, 500.5). Every land comes back as a landfall trigger. With Titania
  out, each sacrificed land is also a 5/3. Not a loop: your land count caps it.
- **Scapeshift at 8:** every land sacrificed is 2 from each opponent, and every land fetched is a
  landfall trigger.
- **Worldsoul's Rage:** X damage to any target, then up to X lands from your hand or graveyard
  onto the battlefield.
- **Combat:** Hearthhull at 8 is a 6/7 flier with haste. Omnath, Baloths and Titania tokens back it up.

## Watch out for

- **Blasphemous Act kills Hearthhull at 8 or more counters** (13 damage on a 6/7). Cast it before
  Hearthhull reaches 8, or with Heroic Intervention up. Toxic Deluge kills it at X ≥ 7.
- **Artifact removal hits Hearthhull at any counter count.** Hold Tamiyo's Safekeeping, Heroic
  Intervention or Deflecting Swat when you can.
- **The Gitrog Monster asks for a land each upkeep.** That's a sacrifice (drain at 8, a Titania
  token) and a draw, so it's usually a bonus, but it leaves you a land short.
- **Graveyard hate** turns off the recursion. Bojuka Bog is ours. Keep a fetch land in hand when an
  opponent's Bog or Rest in Peace is likely.
