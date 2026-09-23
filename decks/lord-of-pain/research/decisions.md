# The Lord of Pain — Decisions (append-only)

Card names link to Scryfall. Grounds, not verdicts — every entry says *why* so the next pass can
re-derive it (deck-brain §1.1b).

---

## 2026-08-23 — Initial build from the user's EDHREC pool (165 cards) + own research

### The brief

"The most toxic commander deck imaginable" around [The Lord of Pain](https://scryfall.com/search?q=%21%22The+Lord+of+Pain%22):
*every action opponents take bleeds them*, and it should *feel like handing them gifts* that are
actually a drain. Money is no object (full proxy). Bracket unknown going in.

### Verified rulings that shaped the build (mtg-rules-expert, CR 2026-08-07 + Gatherer 2024-09-20)

- **I choose the trigger's target; "another" = other than the caster.** When an opponent casts
  their first spell each turn I point the damage at *any other opponent* (never the caster; I could
  target myself — never do). When I cast, I must hit an opponent. (CR 115.1, 603.3a; Gatherer.)
- **The trigger is red, noncombat damage from The Lord of Pain** (CR 113.7a, 202.2c, 120.2b) →
  every "red source you control" / "noncombat damage to an opponent" booster applies. Lifelink on
  the commander (Collar/Witch's Clinic) gains life from it (702.15b).
- **MV uses X as chosen; alternative costs don't change MV; cost reduction doesn't change MV**
  (202.3e, 118.9c, 118.7). A free Fierce Guardianship still deals 3. Helm of Awakening-style
  reducers make opponents cast *more* without shrinking the bill.
- **Copies aren't cast (707.10); commander casts from the command zone are (903.8); "first spell
  each turn" counts every turn of the game**, so an opponent's instant on my turn is their first
  spell that turn — up to 4 triggers per turn. Caveat: if the Lord enters after a player has already
  cast this turn, that player's next spell isn't their "first".
- **Exquisite Blood + Sanguine Bond loops through the commander** — it only stops *opponents*
  gaining (119.9). Wound Reflection's end-step hit is life loss, not damage (not multiplied).
- **Replacement-effect ordering is the damaged player's choice (616.1)** — see formulas.md; it is
  why the amplifier suite is "multipliers + additives", never floors (Ojer Axonil adds nothing next
  to a multiplier — LEDGER "Replacement effects are ordered by the AFFECTED player").
- **Cast-triggers (Lord, Kaervek, Painful Quandary) resolve before the spell** (603.3, 405.5).

### Bracket call: build Bracket 4, ship a derived Bracket 3

The brief says "most toxic imaginable" and "money is no object". Building to that honestly
produces a Bracket 4 deck: [Exquisite Blood](https://scryfall.com/search?q=%21%22Exquisite+Blood%22)
+ [Sanguine Bond](https://scryfall.com/search?q=%21%22Sanguine+Bond%22) is a two-card infinite,
and five Game Changers earn their slots ([Ancient Tomb](https://scryfall.com/search?q=%21%22Ancient+Tomb%22),
[Demonic Tutor](https://scryfall.com/search?q=%21%22Demonic+Tutor%22), [Vampiric Tutor](https://scryfall.com/search?q=%21%22Vampiric+Tutor%22),
[Jeska's Will](https://scryfall.com/search?q=%21%22Jeska%27s+Will%22), [Orcish Bowmasters](https://scryfall.com/search?q=%21%22Orcish+Bowmasters%22) —
Bowmasters in a forced-draw deck is the best card on the page). The Bracket 3 list is **derived**
from it by exactly three swaps (`SIDEBOARD.md`), so there is one source of truth (deck-brain §1.4).
Bracket definitions used: WotC "Introducing Commander Brackets" — B3 = up to 3 Game Changers, no
*early* two-card infinite combos; B4 = no restrictions beyond the ban list.

### Role skeleton (deck-brain §2.1) — targets vs. final

| Role | Target | Final | Notes |
|---|---|---|---|
| Lands | 35 | 35 | 32 real + 3 MDFC spell-lands (Malakir Rebirth, Fell the Profane, Bloodsoaked Insight). 27 B / 22 R sources. |
| Ramp | 8 | 8 | 7 rocks incl. both Medallions (commander is {1}{B}{R} under both) + Mana Flare (a gift that also ramps me). |
| Draw (mine) | 2 + engines | 2 | Valgavoth, Jeska's Will; the symmetric engines (Mine/Font/Bell/Visions/Seizan/Puzzle Box) draw me 3–6 extra a turn. |
| Tutors | 2 | 2 | Demonic, Vampiric (B4). |
| Protection/defense | 6 | 6 | Boots, Mithril Coat, Ghostform, Swat, Hexing Squelcher, No Mercy (+ Malakir Rebirth in lands). |
| Spot removal | 7 | 7 | Terminate, Bedevil, Grasp, Rakdos Charm, Chaos Warp, Feed the Swarm, Rollick (+ Fell the Profane). |
| Wipes | 3 | 3 | Blasphemous Act, Toxic Deluge, Fraying Omnipotence. |
| Gifts | 8 | 8 | Howling Mine, Font of Mythos, Temple Bell, Spiteful Visions, Teferi's Puzzle Box, Seizan, Tempting Contract, Descent into Avernus. |
| Draw-punishers | 7 | 7 | Underworld Dreams, Fate Unraveler, Kederekt Parasite, Sheoldred, Razorkin Needlehead, Orcish Bowmasters, Scrawling Crawler. |
| Cast/upkeep/mana punishers | 5 | 5 | Kaervek, Vial Smasher, Painful Quandary, Mogis, Manabarbs. |
| Amplifiers | 6 | 6 | Solphim, Torbran, Torture Pit, Twinflame Tyrant, Bloodletter, Wound Reflection. |
| Lifeline | 3 | 3 | Exquisite Blood, Bloodthirsty Conqueror, Sanguine Bond. |
| Win conditions | 7 | 7 | Torment of Hailfire, Exsanguinate, Gray Merchant, Wheel of Fortune, Burning Inquiry, Heartless Hidetsugu, Bloodchief Ascension. |

Curve: 68 nonland spells (incl. MDFC halves), avg MV 3.37, 25 at MV ≤2, 15 at MV ≥5, 20 creatures,
43 mana sources (35 lands + 7 rocks + Mana Flare). Top-heavy but fed by ~6 extra draws a turn.

### The two design rules that decided the most cards

**1. Opponent-only amplifiers, never symmetric ones (deck-brain §1.3 — check the card against your
own board).** The gift engines are symmetric by nature: [Spiteful Visions](https://scryfall.com/search?q=%21%22Spiteful+Visions%22)
pings *me* per draw, [Descent into Avernus](https://scryfall.com/search?q=%21%22Descent+into+Avernus%22)
hits each player, [Manabarbs](https://scryfall.com/search?q=%21%22Manabarbs%22) taxes my own land
taps, [Seizan, Perverter of Truth](https://scryfall.com/search?q=%21%22Seizan%2C+Perverter+of+Truth%22)
costs me 2 a turn. Any multiplier worded "a source **you control** would deal damage to a permanent
or player" — [Fiery Emancipation](https://scryfall.com/search?q=%21%22Fiery+Emancipation%22),
[City on Fire](https://scryfall.com/search?q=%21%22City+on+Fire%22), [Angrath's Marauders](https://scryfall.com/search?q=%21%22Angrath%27s+Marauders%22) —
or "a source would deal damage" — [Dictate of the Twin Gods](https://scryfall.com/search?q=%21%22Dictate+of+the+Twin+Gods%22),
[Furnace of Rath](https://scryfall.com/search?q=%21%22Furnace+of+Rath%22) — triples/doubles the
damage my own symmetric permanents deal **to me** (Spiteful Visions on my ~5 draws a turn under
Emancipation = 15 to me a turn). So every amplifier in the list is worded "to an **opponent**":
[Solphim, Mayhem Dominus](https://scryfall.com/search?q=%21%22Solphim%2C+Mayhem+Dominus%22) (×2
noncombat to opponents), [Torbran, Thane of Red Fell](https://scryfall.com/search?q=%21%22Torbran%2C+Thane+of+Red+Fell%22)
(+2 per red source to opponents), Torture Pit (+2 noncombat to opponents, any source — covers the
black punishers Torbran misses), [Twinflame Tyrant](https://scryfall.com/search?q=%21%22Twinflame+Tyrant%22)
(×2 to opponents, all damage), [Bloodletter of Aclazotz](https://scryfall.com/search?q=%21%22Bloodletter+of+Aclazotz%22)
(life loss ×2 on my turn), [Wound Reflection](https://scryfall.com/search?q=%21%22Wound+Reflection%22)
(end-step repeat, opponents only). Emancipation is the stronger card in a vacuum and the wrong
card here — that is the axis.

**2. Nothing that says "players can't gain life".** The commander already stops *opponents*; the
deck's own survival is lifegain ([Exquisite Blood](https://scryfall.com/search?q=%21%22Exquisite+Blood%22),
[Bloodthirsty Conqueror](https://scryfall.com/search?q=%21%22Bloodthirsty+Conqueror%22),
[Sheoldred, the Apocalypse](https://scryfall.com/search?q=%21%22Sheoldred%2C+the+Apocalypse%22)'s
+2 per draw, Witch's Clinic). [Sulfuric Vortex](https://scryfall.com/search?q=%21%22Sulfuric+Vortex%22),
[Havoc Festival](https://scryfall.com/search?q=%21%22Havoc+Festival%22) and
[Rampaging Ferocidon](https://scryfall.com/search?q=%21%22Rampaging+Ferocidon%22) all switch that
off for me too. Cut on those grounds, not on power.

### Amplifier table (ranked against this list)

| Card | MV | Applies to | Hits me? | Kept? | Grounds |
|---|---|---|---|---|---|
| Solphim, Mayhem Dominus | 4 | ×2 all my noncombat dmg to opps/their permanents | No | **Yes** | Multiplies every punisher incl. the black ones. |
| Torbran, Thane of Red Fell | 4 | +2 per red source (Lord, Kaervek, Spiteful Visions, Razorkin, Vial Smasher, Mogis, Manabarbs, Descent, Hidetsugu, Blasphemous Act) | No | **Yes** | Per-instance additive is brutal on 1-damage pings: Spiteful Visions 1→3 per draw. |
| Torture Pit (Spiked Corridor // Torture Pit) | 4 | +2 per noncombat instance, **any** source | No | **Yes** | Covers Underworld Dreams/Kederekt/Fate Unraveler/Bowmasters/Crawler that Torbran misses; enchantment (harder to kill). |
| Twinflame Tyrant | 5 | ×2 all damage to opponents | No | **Yes** | Second multiplier commutes with Solphim (ledger: ×/× stacks cleanly). 5/5 flyer. |
| Bloodletter of Aclazotz | 4 | life loss ×2 during my turn | No | **Yes** | Covers *life loss* (Sheoldred, Quandary, Torment, Exsanguinate, Gary) that damage multipliers miss; +Fraying Omnipotence = each opponent loses their whole life total. |
| Wound Reflection | 6 | repeats each opponent's life lost at end step | No | **Yes** | Universal (damage and loss). |
| Fiery Emancipation | 6 | ×3 all damage from my sources — **including to me** | **Yes** | No | Rule 1 above. Sideboard-never. |
| City on Fire | 9 | ×3, same wording | Yes | No | Same + 9 mana. |
| Dictate of the Twin Gods / Furnace of Rath | 5/4 | ×2 *all* sources incl. opponents' | Yes | No | Doubles attacks on me. |
| Gratuitous Violence | 5 | ×2 creature damage (Lord, Kaervek, Kederekt, Unraveler, Razorkin, Smasher) | partly | No | Narrower than Solphim at the same cost; fourth multiplier is past the point of diminishing returns vs. a card that *generates* triggers. |
| Fiendish Duo | 6 | ×2 any source to opponents (incl. their fights) | No | No | Strong but 6 MV and the 3rd doubler; sideboard if the pod has forced combat. |
| Ojer Axonil | 4 | floor 4 on red noncombat | No | No | Floor + multiplier: opponent orders it to nothing (LEDGER). |
| Hawkeye / Fated Firepower / Mjölnir | 4/X/4 | +power / +X / ×2 Lord only | No | No | Weaker per slot than Torture Pit/Torbran; Mjölnir is one-source. |
| Archfiend of Despair | 8 | = Wound Reflection + can't-gain | No | sideboard | 8 MV second copy. |

### Gift engines table

| Card | MV | What they get | What it costs them | Me | Kept? |
|---|---|---|---|---|---|
| Howling Mine | 2 | +1 draw each | ×7 draw-punishers | +1 draw | **Yes** |
| Font of Mythos | 4 | +2 draws each | ×7 | +2 | **Yes** |
| Temple Bell | 3 | +1 draw, on demand (tap in their end step / in response) | ×7 | +1 | **Yes** |
| Spiteful Visions | 4 | +1 draw | 1 dmg per draw (red source → Torbran) | +1 draw, 1 dmg/draw to me | **Yes** — best card in the deck after the commander |
| Seizan, Perverter of Truth | 5 | +2 draws each upkeep | 2 life each + ×7 on the draws | +2 draws −2 life | **Yes** |
| Teferi's Puzzle Box | 4 | a brand-new hand every draw step | every redraw is a punished draw: hand of 8 + Font = ~11 draws → ×7 | same for me (Spiteful pings me; Sheoldred pays me) | **Yes** — deploy with ≥2 draw-punishers out; it is the single most "here's a gift" card |
| Tempting Contract | 4 | a Treasure each upkeep | bigger spells → bigger Lord/Kaervek hits; Treasures aren't lands so Manabarbs doesn't tax them | a Treasure per taker | **Yes** |
| Descent into Avernus | 3 | X Treasures each turn | X damage each turn, escalating (red → Torbran) | X Treasures, X damage (Exquisite nets me +2X) | **Yes** |
| Mana Flare | 3 | double land mana | Manabarbs taxes the tap; bigger spells | double my mana | **Yes** (ramp slot) |
| Scrawling Crawler | 3 | +1 draw at my upkeep | 1 life per opp draw — gift and punisher in one | +1 | **Yes** (punisher slot) |
| Master of the Feast | 3 | +1 draw each | nothing itself | 5/5 flier | sideboard |
| Stormfist Crusader | 2 | +1 draw, −1 life each | — | +1 −1 | sideboard (Crawler does more) |
| Ghirapur Orrery | 4 | extra land drop; draw 3 on empty hand | Zo-Zu/Ankh not run; empty hands never happen under Mine/Font | — | cut |
| Helm of Awakening | 2 | spells cost 1 less | more casts (Lord/Kaervek/Quandary) | — | cut — also accelerates their combos; MV unchanged so the bill stays, but the pod gets faster than I do |
| Humble Defector | 2 | draw 2 and pass it | their activation + draws punished | draw 2 first | cut — Harsh Mentor (the activation punisher) didn't make the list |
| Wild Evocation | 6 | a free spell each upkeep | Lord + Kaervek + Quandary + Frightful-style triggers, random | my X-spells cast for X=0 | sideboard (chaos tables) |
| Akroan Horse | 4 | 1/1 tokens | nothing without Blood Seeker | — | cut |
| Court of Ambition | 4 | monarch | 3 life or discard per upkeep (6/2 if I keep monarch) | draw | sideboard |
| Prisoner's Dilemma | 5 | a game | 4–12 dmg | — | cut — one-shot; the deck wants permanents |
| Wheel of Fortune / Burning Inquiry | 3/1 | 7 / 3 draws each | ×7 punishers; random discard ×Bloodchief | same draws (Sheoldred) | **Yes** both |
| Wheel of Misfortune / Reforge the Soul / Magus of the Wheel | 3/5/3 | wheels | — | — | sideboard (one true wheel + Inquiry + Puzzle Box is the cap on self-disruption) |
| Sign in Blood / Blood Pact | 2/3 | target opp draws 2 | 2 + ×7 | or me | cut — one-shots; Valgavoth + engines cover my draw |

### Draw-punishers table

| Card | MV | Trigger | Dmg/loss | Body | Kept? |
|---|---|---|---|---|---|
| Kederekt Parasite | 1 | opp draws (needs a red permanent — Lord, Spiteful, Torbran, Solphim…) | 1 dmg (black src) | 1/1 | **Yes** |
| Underworld Dreams | 3 | opp draws | 1 dmg | — | **Yes** |
| Razorkin Needlehead | 2 | opp draws | 1 dmg (red → Torbran) | 2/2 | **Yes** |
| Fate Unraveler | 4 | opp draws | 1 dmg | 3/4 ench creature | **Yes** |
| Sheoldred, the Apocalypse | 4 | opp draws / I draw | 2 loss / +2 me | 4/5 deathtouch | **Yes** — also the deck's best lifeline |
| Orcish Bowmasters | 2 | opp draws beyond the first in draw step | 1 dmg any target + amass | flash | **Yes** — under Mine/Font every extra draw is a ping; kills x/1s |
| Scrawling Crawler | 3 | opp draws (+ gift) | 1 loss | 3/3 | **Yes** |
| Ob Nixilis, the Hate-Twisted | 5 | opp draws; −2 kill + gift 2 draws | 1 dmg | PW | sideboard — 8th punisher, PW fragility |
| Seizan / Spiteful Visions | — | counted as gifts | — | — | — |

### Cast / upkeep / mana punishers table

| Card | MV | Trigger | Kept? | Grounds |
|---|---|---|---|---|
| Kaervek the Merciless | 7 (5 under both Medallions) | every opponent spell → MV dmg any target | **Yes** | The heaviest punisher on the page (70%, +0.59). |
| Vial Smasher the Fierce | 3 | my first spell each turn → MV to a random opp | **Yes** | Page's top synergy (+0.61, 67%); my off-turn instants trigger it too. Displaced Bolt Bend. |
| Painful Quandary | 5 | every opp spell → 5 or discard | **Yes** | Discards feed Bloodchief Ascension. |
| Mogis, God of Slaughter | 4 | each opp upkeep → 2 or sac | **Yes** | Indestructible; red → Torbran/Solphim = 6–8/opp/turn. |
| Manabarbs | 4 | every land tap → 1 | **Yes** | ~15/round to opponents pre-boost, 3 per tap under Torbran; taxes the mana I gift. Costs me ~5/turn — accepted, see formulas.md. |
| The Frightful Four | 4 | first noncreature spell → MV loss | sideboard | Lost the table to Mogis: loss not damage (no Solphim/Torbran), creature not indestructible. |
| Spellshock / Rug of Smothering / Mai, Scornful Striker / Eidolon / Pyrostatic Pillar | 3/3/2/2/2 | symmetric — tax *my* spells too | cut | I cast 3–5 spells a turn; Spellshock = 6–10 to me a turn. |
| Scytheclaw Raptor | 3 | 4 to anyone casting off-turn | cut | My own Swat/Terminate/Temple Bell tricks would eat 4. |
| Gleeful Arsonist / Harsh Mentor / Zo-Zu / Ankh of Mishra / Nightshade Harvester / Polluted Bonds / Citadel of Pain | — | small per-event pings | cut | Ranked below the seven kept; Citadel/Ankh/Zo-Zu also hit me. |
| Roiling Vortex | 2 | 5 to free-spell casters | cut | My Deadly Rollick / Deflecting Swat are free spells. |
| Maddening Hex / Pain Magnification / Powerbalance / Curse cards | — | — | cut | Random/narrow. |

### Win-condition table

| Card | How it ends the game here | Kept? |
|---|---|---|
| Torment of Hailfire | X repetitions × 3 life (Bloodletter ×2 on my turn); Coffers/Flare fund X | **Yes** |
| Exsanguinate | X to each, gain 3X → Sanguine Bond fires for 3X more | **Yes** |
| Gray Merchant of Asphodel | devotion ~8–12 black pips on board (Dreams BBB, Bloodletter BBB, Sheoldred BB, Conqueror BB…) | **Yes** |
| Wheel of Fortune | 7 draws × 7 punishers ≈ 40+ per opponent before amplifiers | **Yes** |
| Burning Inquiry | 3 draws × punishers for {R}; 3 random discards × Bloodchief | **Yes** |
| Heartless Hidetsugu | half their life; under Solphim/Twinflame: even totals die, odd totals go to 1; + Torbran: everyone dies (formulas.md). Haste from Boots. | **Yes** |
| Bloodchief Ascension | 3 end steps to arm (trivial here), then 2 per card into their graveyard — every spell they resolve, every discard to Quandary, 14 per wheel | **Yes** |
| Exquisite Blood + Sanguine Bond | infinite once any opponent loses life | **Yes** (B4) |
| Bloodletter + Fraying Omnipotence | each opponent loses ½ ×2 = all | **Yes** (Fraying doubles as the 3rd wipe) |
| Kefka, Dancing Mad | 7 MV; casts their graveyard for free, they pay MV | sideboard |
| Blood for the Blood God! | 8 to each + refill | cut — 11 MV needs a wipe turn |
| Repercussion + Blasphemous Act | 13 × creatures to each controller | sideboard — 20 creatures in my list |
| Mindcrank + Bloodchief | infinite | sideboard (B4 pocket) |

### Protection / interaction grounds

- **Swiftfoot Boots over Lightning Greaves:** shroud would stop my own Kaya's Ghostform, Mithril Coat's
  attach trigger and Witch's Clinic from targeting the commander. Greaves is in the pocket.
- **Hexing Squelcher** over a second redirect: the commander is a 5-MV engine; counterspells are
  the structural threat (deck-brain "permanent answer when the role is structural").
- **No Mercy** is the deck's only combat deterrent — the table will turn on the punisher player.
- Removal is 7 + Fell the Profane; enchantment answers are Chaos Warp and Feed the Swarm (Leyline
  of Sanctity blanks the commander's trigger — Withering Torment is the pocket third).
- **Fraying Omnipotence as the third wipe** over Deadly Tempest/Damnation/Decree: it is also the
  Bloodletter kill and half-life symmetric damage nets me +life under Exquisite Blood.

### Rejected from the user's pool, with grounds (grouped)

- **Symmetric multipliers** — Fiery Emancipation, City on Fire, Dictate of the Twin Gods, Furnace of
  Rath: rule 1 above.
- **"Players can't gain life"** — Sulfuric Vortex, Havoc Festival, Rampaging Ferocidon: rule 2.
- **Symmetric spell taxes** — Spellshock, Rug of Smothering, Mai, Scytheclaw Raptor, Roiling Vortex.
- **One-shot card draw for me** — Night's Whisper, Sign in Blood, Read the Bones, Thrill of
  Possibility, Big Score, Unexpected Windfall, Grab the Prize, Valakut Awakening: the engines draw.
- **Rituals** — Dark Ritual, Seething Song: this is a permanent-based grind deck (LEDGER "One-shot
  rituals belong to explosive-turn decks only").
- **Combat package** — Kardur, Disrupt Decorum, Maximum Carnage, Brash Taunter, Crawlspace, Darkness,
  Delirium, Backlash, Mjölnir, Shadowspear, Mask of Griselbrand, Resurrection Orb, Witch's-Clinic-style
  equipment beyond Coat/Boots: the deck doesn't attack.
- **Aristocrats/death-trigger cards** — Blood Artist, Mayhem Devil, Syr Konrad, Morbid Opportunist,
  Massacre Wurm, Meathook Massacre (both), Deadly Tempest, Decree of Pain, Blasphemous Edict, Soul
  Shatter, Sadistic Shell Game, Curtains' Call, Reanimate, Whip of Erebos (B3 only): no sacrifice
  engine.
- **Narrow/random** — Maddening Hex, Pain Magnification, Powerbalance, Parker Luck, Keen Duelist,
  Protection Racket, Palantír of Orthanc, Theater of Horrors, Phyresis, Grievous Wound (good with
  Bloodletter but an aura on one player), Enchanter's Bane, Ensnared by the Mara, Combustible
  Gearhulk, Tectonic Giant, Twinflame-adjacent Chandra's Incinerator, Deadpool, Hawkeye, Kefka,
  Sower of Discord, Braids, Blood Seeker, Nightshade Harvester, Polluted Bonds, Zo-Zu, Ankh,
  Citadel of Pain, Harsh Mentor, Gleeful Arsonist, Price of Progress, Frightful Four, Stormfist,
  Ob Nixilis, Archfiend of Despair, Chandra Awakened Inferno, Vampiric Link, Basilisk Collar (B3
  only), Lightning Greaves, Bolt Bend, Imp's Mischief, Redirect Lightning, Return the Favor,
  Untimely Malfunction, Not Dead After All, Tibalt-style cards: each lost a within-role ranking to
  a card above; the pocket ones are in SIDEBOARD.md.
- **Utility lands not taken** — Spinerock Knoll (hideaway needs 7 damage — trivial — but enters
  tapped for a random card), Wayfarer's Bauble, Solemn Simulacrum (ramp on bodies in a
  noncreature-ramp deck), Diabolic Tutor (Demonic + Vampiric cover it in B4).

### Field-signal note (EDHREC, 7,344 decks)

86/89 nonbasic cards in the list are on the commander's page; the three that aren't — Teferi's
Puzzle Box, Burning Inquiry, Fraying Omnipotence — are personal tech, kept on merit (gift/punisher
density, and the Bloodletter kill). The page's highest-synergy card not in my first draft was Vial
Smasher (+0.61, 67%) — re-derived and seated over Bolt Bend. Fiery Emancipation (34%) and
Lightning Greaves (57%) were deliberately passed; grounds above.

---

## 2026-08-23 (later) — Lifegain pass after user review

User review of the first build: (1) asked the reasoning for Teferi's Puzzle Box; (2) wants lifegain
through equipment on the commander (Shadowspear / Basilisk Collar); (3) Manabarbs can stay;
(4) wants a "if you would lose life, you gain that much instead" effect.

**Puzzle Box (kept, pending the user's call):** grounds in the gift table above — it multiplies the
draw count (hand + 3 per draw step under Mine/Font) and is colourless for 4. Costs: symmetric (you
keep hand *size*, not the cards; Vampiric Tutor must be cast in response to the Box trigger or the
tutored card is bottomed — CR 504.1 the draw-step draw happens before "beginning of draw step"
triggers), Spiteful Visions pings you per redraw, 0% inclusion on EDHREC. First slot to give up if
the user wants it out.

**Equipment lifelink — Basilisk Collar in, Burning Inquiry out.** Lifelink on the commander gains
from its trigger (CR 702.15b, mtg-rules-expert Q3) — ~4 triggers a turn cycle at 3–10 each is
12–40 life a round. Collar over Shadowspear on **defense**: deathtouch on a 5/5 menace makes the
commander a wall the table won't attack into; Shadowspear's +1/+1 and hexproof-stripping are weaker
here. Shadowspear becomes the B3 Sanguine-Bond swap (second lifelink equipment). Burning Inquiry
was the one-shot in the win-con row; the permanent lifeline outranks it (LEDGER "permanent answer
when the role is structural").

**"Lose life → gain it instead" does not exist in B/R.** Searched every wording (`you would lose
life`, `gain that much life instead`, `your life total can't change`, `prevent all damage that
would be dealt to you`, `whenever you're dealt damage`, `you can't lose the game`): the hits are
[Glacial Chasm](https://scryfall.com/search?q=%21%22Glacial+Chasm%22) (prevent all damage to you;
cumulative upkeep pay 2 life; no mana; sac a land on entry; creatures can't attack),
[Platinum Emperion](https://scryfall.com/search?q=%21%22Platinum+Emperion%22) (life can't change —
also freezes your gains, 8 MV), [Fortune Thief](https://scryfall.com/search?q=%21%22Fortune+Thief%22)
/ [Ali from Cairo](https://scryfall.com/search?q=%21%22Ali+from+Cairo%22) (damage can't take you
below 1; 0/1 bodies), [Angel of Suffering](https://scryfall.com/search?q=%21%22Angel+of+Suffering%22)
(prevent, mill twice as much — decks you out under your own symmetric damage),
[Immortal Coil](https://scryfall.com/search?q=%21%22Immortal+Coil%22) (prevent, exile graveyard;
lose when it's empty), [Sun Droplet](https://scryfall.com/search?q=%21%22Sun+Droplet%22) (1 life a
turn per damage taken — too slow). [Tainted Sigil](https://scryfall.com/search?q=%21%22Tainted+Sigil%22)
is W/B — illegal. Chosen:

- **Glacial Chasm in, Leechridden Swamp out.** It answers the exact complaint — every symmetric
  piece (Spiteful Visions, Descent, Manabarbs, Seizan's damage half, Hidetsugu, Ancient Tomb) stops
  hurting you — and shuts off combat damage to you. Cost: 2/4/6/8 life a turn (a payment; sac it
  when the bill outgrows the protection), it doesn't tap, and it eats a land on entry (sac a tapped
  or colourless one). **It is a Game Changer** (Scryfall flag — nearly missed on a land), so B4
  only; the B3 list swaps it back for Leechridden Swamp.
- **Whip of Erebos in, Bloodchief Ascension out.** Closest thing to "gain what you deal": every
  creature pinger (Kederekt, Fate Unraveler, Razorkin, Bowmasters, Kaervek, Vial Smasher, the Lord,
  and Hidetsugu — whose hit on you comes back three times over from the opponents' halves) gains
  you its damage, and it re-buys Gray Merchant. Bloodchief lost the row on time-to-online (3 end
  steps) and because the gift engine's wheels still pay 7 × punishers without it; it is in the
  pocket with Mindcrank.

**Manabarbs stays** (user call; grounds unchanged: ~15/round off the table, 45 under Torbran, ~5 to
me — now 0 to me under Chasm).

Net: Lifeline 3 → 5, Win conditions 7 → 5, Game Changers 5 → 6 (B4), B3 derivation 3 → 4 swaps.
Validated: both lists 100 cards, legal, in identity; B3 = 3/3 GCs.

---

## 2026-08-23 (later still) — Curve check and a third cost reducer

**Question:** is the curve too heavy, do we need cost reducers? **Measured** (script over
`research/cards.txt`) against the EDHREC average deck (pulled to
`research/edhrec-average-deck-2026-08-23.txt`, comparison sample only): ours avg MV 3.41 vs 3.35;
MV ≤2 24 vs 24; MV ≥5 15 vs 13 (two of ours are Blasphemous Act, cast for 1–3, and the Bloodsoaked
Insight MDFC); four-drops 16 vs 10 — the engine (amplifiers, punishers, gifts all cost 4); mana
sources 42 vs 42. Verdict: not heavier than the field; the glut is the plan. Pips B56 / R34 vs
sources 26 B / 22 R.

**Cost reducers:** Jet + Ruby Medallion were already in (commander {3}{B}{R} → {1}{B}{R}, Kaervek 7 → 5).
Third reducer candidates checked against the board: Helm of Awakening (symmetric — ramps the combo
player), Heartless Summoning (kills Kederekt Parasite and Orcish Bowmasters), Semblance Anvil
(costs a card), Cloud Key (one type, 3 MV). Chosen: [Rakdos, Lord of Riots](https://scryfall.com/search?q=%21%22Rakdos%2C+Lord+of+Riots%22)
— creature spells cost {1} less per life opponents lost this turn (generic only, LEDGER "Cost
reduction only eats the GENERIC portion"); by our main phase that is routinely 5–15 off Descent /
the Lord's hit on our first spell / a Temple Bell tap, so Kaervek is {B}{R}, Twinflame/Hidetsugu
{R}{R}, Sheoldred/Seizan/Gray Merchant {B}{B}. 21 creatures in the list. 6/6 flying trample body,
lifelink under Whip. Cast restriction (an opponent lost life this turn) is trivial once the Lord
is out. User agreed.

**Out: Tempting Contract.** Grounds: of the gifts it is the only one that bills nothing by itself
(Treasures aren't lands, so Manabarbs doesn't tax them) and the one that most directly ramps
opponents into their own plan; Mana Flare keeps the "mana gift" theme with the Manabarbs tax
attached. Pocket, displaces Rakdos.

Net: Ramp & cost reduction 8 → 9, Gifts 8 → 7. Both lists re-validated (100, legal, identity;
B3 = 3/3 GCs, still exactly four swaps).

---

## 2026-08-23 (manabase) — Fetchlands in for four basics

**User asked whether other duals were left.** Every untapped true B/R dual was already in; the
remainder (Scryfall sweep of all 47 B/R-producing lands) is tapped, conditional (Dark Fortress,
Blightstep Pathway, Shadowblood Ridge) or utility. The real gap was **off-colour fetchlands**:
any fetch that finds a Swamp *or* a Mountain finds Blood Crypt / Badlands / Smoldering Marsh, so
each is an untapped B/R dual here, and fetching isn't "tapping for mana" (Manabarbs doesn't bill
it).

**Why they were missing:** a gap, not a rejection — the first manabase was taken from the EDHREC
page, where off-colour fetches sit at ~6% because the 7,000-deck average is 85% Bracket 2–3 and
budget-weighted (LEDGER "Price-tier the sample field BEFORE counting card frequency"). In a
full-proxy B4 list that signal says nothing. Recorded in LEDGER → Corrections.

**In:** Marsh Flats, Polluted Delta, Verdant Catacombs, Wooded Foothills. **Out:** 2 Swamp,
2 Mountain (10 basics → 6). Typed targets left: Blood Crypt, Badlands, Smoldering Marsh, 2 Swamp,
4 Mountain. Minor cost named: Smoldering Marsh wants two basics on board to enter untapped —
slightly later now; fetching basics offsets. Plaza of Heroes considered and passed: coloured only
for the 12 legendary spells, colourless otherwise, and five lands already don't make a colour on
their own. Fellwar Stone re-derived and kept (two outs in a two-colour deck; floor = colourless
rock; the ledger's Fellwar failure was mono-red). Both lists re-validated.

---

## 2026-08-24 — Theme locked; Bolt Bend mainboard

**Theme confirmed by the user:** "deal with the devil" — the gifts are the point, the bills make
them poisonous. Mana Flare locked on those grounds (the earlier "cut it at fast tables" note
stands as pocket advice only).

**Bolt Bend in, Kaya's Ghostform out.** Of the two redirects, Bend hits *spells and abilities*
(opposing removal, targeted drain/draw triggers) and costs {R} with any power-4 creature — six in
the list. Imp's Mischief (spells only, life cost = MV) stays in the pocket and becomes the B3
Vampiric-Tutor swap, since Bend is no longer available for it. Ghostform lost the protection row
on flexibility: one-shot, sorcery-speed, and with both Medallions a recast is only 2 more mana —
the insurance was worth less than an answer. Named limit, for the table: a redirect only "counters"
a counterspell if another spell is on the stack to retarget it at — Hexing Squelcher keeps the
actual anti-counter slot. B3 still four swaps; both lists re-validated.

---

## 2026-08-24 (later) — Ghostform back in; the user was right

**User contested the Ghostform cut and won.** Re-derived instead of defended (SKILL §1.1):

1. **The threat matrix has a row only Ghostform covers.** Boots = targeted; Mithril Coat =
   destroy; Bend/Swat = single-target spells/abilities. Edicts (Soul Shatter), −X/−X wipes (Toxic
   Deluge is ubiquitous) and exile wipes bypass all of those; Ghostform's "dies **or is put into
   exile** → return to the battlefield" is the list's only answer. Same lesson as LEDGER "Map
   voltron protection to a threat matrix — no Equipment fills the non-targeting row" (iron-man) —
   it was already written down and not applied.
2. **The "recast is only 2 more" framing was wrong.** First recast with both Medallions = 5 total
   mana (3 base + 2 tax); Ghostform is 1 mana proactive, returns him free, immediately, statics on.

**In:** Kaya's Ghostform. **Out:** Hexing Squelcher (most meta-dependent protection piece — near
blank without counterspell decks, and a 2-drop that must survive; pocket, bring-in vs blue,
displaces Ghostform). Bolt Bend keeps its slot — the two are complements, not substitutes. Both
lists re-validated; B3 unchanged in structure (still four swaps, Squelcher simply follows B4 out).

---

## 2026-08-24 (later still) — Hexing Squelcher back for Teferi's Puzzle Box

**User's premise accepted:** optimized (B4) pods run materially more permission, and the deck's
key plays — the Lord, Wheel, Torment, either combo half — are counter-magnets. "Spells you
control can't be countered" protects the combo turn, not just the commander; team ward 2 taxes
spot removal on Sheoldred/Kaervek. Squelcher is maindeck at B4.

**The slot came from Teferi's Puzzle Box, not Ghostform** (the edict/−X/exile row stays covered).
Box grounds for the cut: least-validated card in the list (0% field) and growing anti-synergy with
the reactive suite — under the Box you cannot carry a specific held answer (Swat, Bend, removal)
past your own draw step. It moves to the pocket for chaos-friendly, counter-light tables,
displacing Squelcher symmetrically. Gifts 7 → 6, Protection 6 → 7 (B3: 8 with Imp's Mischief).
Both lists re-validated: 100 cards, legal, in identity; B3 = four swaps, 3/3 GCs.

---

## 2026-09-22 — The fast-mana pass

**Pilot's premise, accepted after measuring:** the B4 list was short on fast mana.
`bun run deckcheck` reported **lands 35 + rocks 5 = 40**, not the "43 mana sources (35 lands +
7 rocks + Mana Flare)" this file recorded on 2026-08-23 — Jet Medallion, Ruby Medallion and
Rakdos, Lord of Riots are cost reducers that tap for nothing, and Mana Flare gives three opponents
what it gives you. Narrower still: only **two** cards accelerated before turn 2 (Sol Ring, Ancient
Tomb), and exactly **one** put the commander down on turn 3.

**Why this deck wants rocks more than most (two grounds, both verified):**

1. **Manabarbs bills land taps, not rock taps** — *"Whenever a player taps a land for mana."*
   Every non-land source is untaxed mana, so a rock is strictly better here than the 35th land.
2. **Glacial Chasm deletes the drawback while the mana still happens.** CR 615.6 — *"If damage
   that would be dealt is prevented, it never happens"*; CR 603.2g — a prevented event *"won't
   trigger anything."* Ancient Tomb's damage clause sits inside a single **activated mana ability**
   (CR 605.1a, and CR 605.1 *"regardless of what other effects they may generate"*) that resolves
   without the stack (CR 605.3b), so the {C}{C} is added and only the damage is erased. Mana
   Vault's trigger event is *the beginning of your draw step*, not damage (CR 603.2b), so it still
   triggers and resolves (CR 603.4) with the ping prevented.

**In (4):** Mana Vault, Grim Monolith, Mox Diamond, Dark Ritual. Ramp 9 → 12.
**Out (4):** Mana Flare, Bolt Bend, Bojuka Bog, Scrawling Crawler. Lands 35 → 34,
Protection 7 → 6, Draw-punishers 7 → 6.

**Grounds for each cut:**

- **Mana Flare** — the only "ramp" card that ramps opponents harder than it ramps me, and the one
  gift Manabarbs doesn't bill extra for (it adds mana per tap, not taps).
- **Bolt Bend** — Protection was the only role over its target (7 against 6). Ranked all seven
  in-role first: Deflecting Swat (free with the commander) > Mithril Coat (flash, indestructible)
  > Kaya's Ghostform (beats *exile*, dodges the 7-mana recast) > Swiftfoot Boots (hexproof + the
  haste Hidetsugu needs) > Hexing Squelcher > No Mercy > Bolt Bend. Bolt Bend is a §2.5
  *substitute* for Deflecting Swat, so this is a "something had to go" cut, not a claim the card
  is bad. Pocket. Protection is now exactly at target.
- **Scrawling Crawler** — the 4th cut after the pilot kept No Mercy. Of the seven draw-punishers
  it is the one whose output is **life loss**, which Solphim / Torbran / Torture Pit cannot
  multiply (formulas.md): under a full amplifier board every damage punisher goes 1 → 27 while
  the Crawler stays at 1, so its relative contribution collapses exactly when the deck is winning.
  It is also a 3/2 with no protection that dies to our own Blasphemous Act. Against the cut: it is
  half a gift, and Gifts is under target. Pocket. formulas.md's per-draw table was re-derived
  without it (life loss per draw 3 → 2).
- **Bojuka Bog** — the 34th land, chosen over a basic because it enters tapped (at odds with the
  whole point of this pass) and its graveyard exile is duplicated by Rakdos Charm. Cutting it
  costs one B source, which Mox Diamond gives straight back as any colour.

**Rejected as the 4th cut, with grounds:** *Fraying Omnipotence* — Wipes is at 3/3 and it is the
Bloodletter kill (lose half, rounded up, doubled = all of it, 9 mana for the table). My first
nomination of it cited its sideboard history rather than grounds, which is the §1.1b error.
*Temple Bell / Descent into Avernus* — Gifts is already two **under** its target of 8, so cutting
there goes the wrong way. *Scrawling Crawler* — real knock (its punishment is life loss, so
Solphim/Torbran/Torture Pit can't multiply it, per formulas.md) but it is half a gift in an
under-target role. *Witch's Clinic*, *Vial Smasher the Fierce* and *No Mercy* — pilot's call on all
three: the Clinic is the lifelink backup for the commander when Collar is gone; Vial Smasher stays
despite its random target (67% field); No Mercy stays as the deterrent that keeps the table off a
deck that draws maximum aggro. **Record the No Mercy caveat rather than the cut:** it is blanked by
our own Glacial Chasm, because prevented damage is never dealt and so never triggers it (CR 615.6,
603.2g). The two are alternative shields for different board states, not a stack — gameplan.md now
says so.

**B3 derivation grew from four swaps to seven.** All three new rocks are Game Changers, so B3
takes non-GC equivalents: Mana Vault → Mind Stone, Grim Monolith → **Basalt Monolith** (the same
card one mana up, {3} untap instead of {4}), Mox Diamond → Thought Vessel (a second no-max-hand-size
effect behind Reliquary Tower, which matters at 6+ draws a turn). Dark Ritual is not a Game
Changer and goes into both lists.

**Validated:** both lists 100 cards, all commander-legal, all inside B/R identity. B4 = 9 Game
Changers (Bracket 4+); B3 = 3/3, and the diff shows exactly the seven documented swaps.
`deckcheck` now reports **34 lands + 8 rocks = 42** on both. Note the first `deckcheck` run after
the edit reported "rocks 5 ⚠️ low" — that was a stale `data/deck-meta-lord-of-pain.json`, fixed by
`bun run carddata --file`; the LEDGER's 2026-08-07 stale-cache entry applies to this tool too.

---

## 2026-09-23 — Preferred printings pinned

The pilot's Moxfield export is now `research/printings.txt`, the deck override layer that
`bun run deck:moxfield` merges **over** the global `decks/_printings.txt` reserve. 93 cards pinned.

Two things about that export worth recording, since both are visible in the file:

- **It predates the 2026-09-22 fast-mana pass** — it names Mana Flare, Bolt Bend, Bojuka Bog and
  Scrawling Crawler (all cut) and none of Mana Vault, Grim Monolith, Mox Diamond or Dark Ritual.
  The four cut cards' printings are **kept on purpose**: all four are pocket entries in
  `SIDEBOARD.md`, so the printing is ready if one comes back.
- **It also predates the 2026-08-23 manabase pass** — 10 basics and one fetch, against the current
  6 basics and five fetches. Quantities in a printings file are ignored (they come from `DECK.md`),
  so the basics pinned correctly at 4 Mountain / 2 Swamp (THB); the four missing fetches did not.

**Still unpinned (11)** — Moxfield resolves these to its own default, so the import is valid, just
not the pilot's copy: Dark Ritual, Grim Monolith, Mana Vault, Mox Diamond (B4 adds); Basalt
Monolith, Imp's Mischief, Leechridden Swamp (B3-only); Marsh Flats, Polluted Delta, Verdant
Catacombs, Wooded Foothills (fetches, both lists). Mind Stone, Thought Vessel and Shadowspear are
already covered by the global reserve.
