# Hearthhull — decision log

Append-only. Grounds, not verdicts: every entry names why, so a later pass can re-check it.

## 2026-11-22 — Founded: objective first draft (Bracket 3)

The pilot asked for a landfall deck where almost every card has a landfall trigger, with Tifa
Lockhart in it. The commander search compared the landfall commanders on card-visualizer pages,
and the pilot shortlisted Tannuk, Omnath (both), Tifa, Aesi, The Necrobloom, Bristly Bill, Tatyova,
Hearthhull, Hazezon and Radha. I first passed Hearthhull, and the pilot pushed back: lands can be
played for landfall, sacrificed for sacrifice triggers, then replayed from the graveyard to do both
again. That was right (ledger build-048), so Hearthhull is the commander. Brief agreed in chat:

- **Bracket 3**, up to three Game Changers.
- **What counts toward "almost every card is landfall":** landfall payoffs, plus every card that puts
  lands onto the battlefield, sacrifices them or replays them. Fetch lands, Harrow and Zuran Orb count.
  A small removal and protection package sits outside that.
- **Tifa Lockhart** goes in the 99.

### The commander

Hearthhull, the Worldseed, {1}{B}{R}{G}, Legendary Artifact — Spacecraft, 6/7. Station (tap another
creature you control: put charge counters equal to its power on it, sorcery speed). At 2+:
`{1}, {T}, Sacrifice a land: Draw two cards. You may play an additional land this turn.` At 8+: flying,
vigilance, haste, and *"Whenever you sacrifice a land, each opponent loses 2 life."* It's a legal
commander as a Spacecraft with a power/toughness box (CR 903.3). A creature cast this turn can pay the
station cost, and below 8 counters Hearthhull isn't a creature, so it can use its draw the turn it's
cast (ledger tap-011, CR 302.6, 702.184a, 722.2b). EDHREC: 34,510 decks, rank 18.

### Role skeleton (SKILL §2.1)

| Role | Target | Built |
|---|---|---|
| Lands | 37 | 37 (11 fetch lands, 9 duals, 4 utility, 13 basics) |
| Ramp (mostly lands onto the battlefield) | 10 | 10 |
| Extra land drops | 5 | 5 |
| Card draw (Clues don't count) | 9 | 9, plus Tannuk and Hearthhull's own draw |
| Landfall payoffs | 11 | 11 |
| Land sacrifice payoffs and outlets | 7 | 7 |
| Land recursion | 6 | 6 |
| Removal | 7 | 7 |
| Board wipes | 2 | 2 |
| Protection | 3 | 3 |
| Tutors | 1 | 1 |
| Finishers | 1 | 1 |

Game Changers: Field of the Dead, Crop Rotation, Demonic Tutor (3/3). Curve: average MV 3.10
(Blasphemous Act counts at 9), MV ≤ 2 23, MV ≤ 3 45. Pips G49 R20 B16. Every fetch land finds all
three colours through the typed duals, so the sources are G26, B22, R22.

### Grounds by role, and what the targets left out

- **Lands:** all ten Zendikar and Onslaught fetch lands plus Prismatic Vista and Fabled Passage. Each
  is two landfall triggers and a land sacrifice, and land recursion replays them. Typed duals (the
  three original duals, three shocks, Ziatora's Proving Ground, Cinder Glade, Smoldering Marsh) so
  every fetch land finds every colour. Field of the Dead (a Game Changer) makes a 2/2 Zombie per land
  once seven differently named lands are out. Bojuka Bog is graveyard hate that Crucible and Ramunap
  replay every turn. Lotus Field sacrifices two lands when it enters, which is 4 life from each
  opponent with Hearthhull at 8. Left out: Evolving Wilds and Terramorphic Expanse (13 basics can't
  feed 13 basic-fetchers plus Harrow-style ramp), Dakmor Salvage (see loops below), Dark Depths and
  Thespian's Stage (a two-card 20/20; benched for the pilot to decide), Strip Mine and Wasteland (see
  stax below), Gaea's Cradle (would be a fourth Game Changer).
- **Ramp:** Sol Ring, Nature's Lore, Three Visits, Farseek, Skyshroud Claim (lands onto the
  battlefield, so landfall), Harrow, Springbloom Druid and Roiling Regrowth (a sacrifice and two
  lands in one card), Lotus Cobra and Tireless Provisioner (landfall mana). Left out: Cultivate and
  Kodama's Reach (one land to hand), Sakura-Tribe Elder, Entish Restoration, Arcane Signet and
  Ignoble Hierarch (EDHREC synergy negative in this deck).
- **Extra land drops:** Azusa, Exploration, Oracle of Mul Daya, Dryad of the Ilysian Grove,
  Exploration Broodship (83% of Hearthhull decks; station 3 for the extra land). Broodship and
  Hearthhull compete for creature taps when stationing. Left out: Burgeoning, Loot, Case of the
  Locked Hothouse.
- **Card draw:** The Gitrog Monster (93%), Korvold (83%), Braids, Arisen Nightmare, Sylvan Library,
  Valakut Exploration, Evendo Brushrazer (impulse draw on any turn you sacrificed a nontoken
  permanent), Nahiri's Lithoforming, Escape to the Wilds, Sprouting Goblin. Left out: Tireless
  Tracker and Courser of Kruphix (Clues and top-of-library land plays aren't draw for this pilot),
  Night's Whisper, Reprocess, Horn of Greed (symmetric).
- **Landfall payoffs:** five pingers that hit each opponent per land (Tannuk, Koth, Sabotender,
  Captain Michael Burnham, plus Retreat to Hagra's drain mode), token makers (Scute Swarm,
  Rampaging Baloths, Omnath, Locus of Rage), Ob Nixilis, the Fallen, Ancient Greenwarden (every
  landfall trigger fires twice, and lands from the graveyard), Tifa Lockhart (pilot's pick). Left out:
  Tunneling Geopede and Spitfire Lagac (the sixth and seventh pinger), Avenger of Zendikar and
  Moraug (a third and fourth 6–7 drop), Zendikar's Roil, Akoum Hellkite, Mossborn Hydra.
- **Land sacrifice:** Titania, Protector of Argoth (a 5/3 per land lost, which also stations
  Hearthhull), Zuran Orb (a free outlet), Crop Rotation (a Game Changer: instant, sacrifice a land,
  fetch any land), Sylvan Safekeeper, Mayhem Devil (1 damage whenever anyone sacrifices anything),
  Baloth Prime, Scapeshift. Left out: Scouring Swarm, Squandered Resources, Planar Engineering,
  Mazirek, Juri, Eumidian Hatchery.
- **Land recursion:** Splendid Reclamation (89%), Aftermath Analyst (87%), Szarel (79%), Ramunap
  Excavator, Crucible of Worlds, Icetill Explorer. Left out: Conduit of Worlds, Life from the Loam,
  Lord Windgrace, Soul of Windgrace, World Shaper, Lumra.
- **Removal:** Assassin's Trophy, Beast Within, Putrefy, Infernal Grasp, Tear Asunder, Chaos Warp,
  Windgrace's Judgment. Left out: Abrupt Decay, Terminate, Rakdos Charm.
- **Board wipes:** Blasphemous Act and Toxic Deluge. Below 8 counters Hearthhull isn't a creature, so
  wipes miss it. At 8 or more, Blasphemous Act's 13 damage kills the 6/7, and Toxic Deluge kills it at
  X ≥ 7.
- **Protection:** Heroic Intervention, Deflecting Swat (free with Hearthhull out), Tamiyo's
  Safekeeping (any permanent, so it covers Hearthhull below 8). Left out: Veil of Summer, Constant
  Mists.
- **Tutor and finisher:** Demonic Tutor (a Game Changer). Worldsoul's Rage: X damage, then up to X
  lands from hand or graveyard onto the battlefield.

### Loops and lines to flag (pilot rule: flag, then let them decide)

- **No infinite loops in the draft.** Each line below is capped by the number of lands.
- **Zuran Orb and a mass land return.** With Hearthhull at 8: tap every land for mana, sacrifice them
  all to Zuran Orb (2 life from each opponent per land), then cast Splendid Reclamation or Worldsoul's
  Rage, or activate Aftermath Analyst, with the floating mana. Every land comes back as a landfall
  trigger for the pingers. With Titania out, every sacrificed land is also a 5/3.
- **Scapeshift at 8 counters:** each land sacrificed is 2 life from each opponent, and each land
  fetched is a landfall trigger.
- **Benched, not in the draft:** Dakmor Salvage with The Gitrog Monster and a free discard outlet is
  an infinite draw-and-mill loop. Crucible of Worlds or Ramunap with Strip Mine or Wasteland destroys
  a land every turn, which is a lock the pilot's pods treat as stax. Both need the pilot's call.
