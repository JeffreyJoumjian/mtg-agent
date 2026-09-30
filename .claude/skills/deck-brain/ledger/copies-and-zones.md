# Ledger: Copies and zones

Copy effects and token copies; double-faced cards and Adventures; casting from exile or the graveyard; library, mill and losing to an empty library; the command zone, companions and Backgrounds; blink and phasing. Entry format and capture rules: `../SKILL.md` §4.
Search every topic at once with `bun run lookup "<card | rule number | term>"`.

---

### Copies inherit X and every other choice {#zone-001}

**Kind:** ruling · **Verified:** 2026-08-02 against CR 2026-04-17
**Rules:** 707.10
**Claim:** A copy of a spell copies all decisions made for it, including the value of X, modes and
targets (targets may then be changed if the copy effect says so).
**Evidence:** CR 707.10.
**Changes:** Copy effects on a big X-spell are full-value, which is why copiers rate as high as a
second X-spell. Note the copy **isn't cast**, so cast-triggers don't fire.
**See also:** zone-009, zone-014, zone-019, trig-004
**Source:** scarlet-witch (2026-08-02).

### A separately cast half — Adventure or prepared copy — is its own cast with only its own characteristics {#zone-002}

**Kind:** ruling · **Verified:** 2026-08-09 against CR 2026-08-07
**Cards:** Stensian Sanguinist // Exsanguinate; Emeritus of Woe // Demonic Tutor; Scheming Silvertongue // Sign in Blood; Glóin the Mighty // Easy Pickings; Herald's Horn; Urza's Incubator; Longshot, Rebel Bowman; Artist's Talent; The Scarlet Witch
**Rules:** 107.3b, 601.2b, 601.2f, 601.2i, 715.3a, 722.3c
**Claim:** Casting a card's Adventure half is casting an instant/sorcery with only the Adventure's
characteristics — it is not a creature spell, has no creature types, and its MV is the Adventure's;
casting the creature later from exile is the mirror image. Likewise, when a permanent is *prepared*
and you cast a copy of its spell, you announce and pay X yourself and pay the full cost, and the copy
has **only the prepare spell's characteristics**.
**Evidence:** Prepare: CR 722.3c (the copy "has only the characteristics of that permanent's prepare
spell"), CR 601.2b (announce X), CR 601.2f (normal cost modification), CR 601.2i (it becomes cast, so
cast-triggers fire). CR 107.3b does **not** apply — prepared grants *permission to cast*, not a cost
waiver or an alternative cost. Adventure: CR 715.3a — *"When casting an adventurer card as an
Adventure, only the alternative characteristics are evaluated to see if it can be cast."*
**Changes:** Cost and classify the two halves separately. For a prepared copy, three consequences,
all easy to get backwards:
- An `{X}` prepare spell is **full-size**, not X = 0. Stensian Sanguinist's Exsanguinate is a real
  scalable finisher.
- The copy is **not a creature spell** and has no creature types, so it misses eminence and every
  other tribal cast-trigger — and misses "creature spells of the chosen type cost less" reducers
  (Herald's Horn, Urza's Incubator). Cost the copy at **full price**.
- It is still *cast*, so storm/magecraft-style "whenever you cast a spell" triggers do fire.

For an Adventure (2026-08-09): the Adventure half gets noncreature reducers (Longshot, Artist's
Talent) and fires spellslinger triggers, but misses eminence and creature-spell reducers (Herald's
Horn, Urza's Incubator); the creature half is the reverse. MV-gated reducers (The Scarlet Witch) read
whichever half is being cast.
**See also:** zone-007, zone-025
**Source:** edgar-markov (2026-08-06), evaluating Stensian Sanguinist alongside the in-deck Emeritus
of Woe and Scheming Silvertongue; edgar-markov + scarlet-witch (2026-08-09, merged from "An Adventure
half is its own cast, with only its own characteristics"), HOB set review (Glóin the Mighty // Easy
Pickings).

### A modal DFC is cast as either face from any zone, but off the battlefield and stack it has only its front face {#zone-003}

**Kind:** ruling · **Verified:** 2026-08-24 against CR 2026-08-07
**Cards:** Tony Stark; Master Transmuter
**Rules:** 712.8a, 712.8e, 712.11, 712.11b, 712.14
**Claim:** A **modal** DFC may be cast as either face, from the command zone or from hand (CR
712.11b), while a transforming DFC is cast front face up; Tony Stark // The Invincible Iron Man is
layout `modal_dfc` (a Marvel-set hybrid that is modal AND has a transform ability). In any zone other
than the battlefield or stack a double-faced card still has only its front face's characteristics
(CR 712.8a), so a DFC with an artifact back face is NOT an artifact card in hand.
**Evidence:** CR 712.11b — *"A player casting a modal double-faced card... chooses which face they
are casting before putting it onto the stack."* Contrast CR 712.11 — a **nonmodal** double-faced
spell "is cast with its front face up by default", so a transforming commander must be recast as
its small front face and re-flipped. CR 712.8a — 712.11b is a casting permission, not a
characteristics change. CR 712.8e — on the battlefield, back face up = artifact. CR 712.14 — a DFC
put onto the battlefield from a non-stack zone enters front face up anyway. Scryfall layout field
`modal_dfc` + keywords [Flying, Transform, Haste], verified 2026-08-24 via
`bun run card "Tony Stark" --json`; oracle verified 2026-08-24 — front face "Legendary Creature —
Human Artificer Hero", back face "Legendary Artifact Creature — Human Hero".
**Changes:** Check `layout` before assuming a two-faced commander is expensive to rebuild, and before
counting a DFC as a hit for any type-worded effect.
- **Recasting a commander (2026-08-07).** For Tony Stark // The Invincible Iron Man this is the
  difference between 8 mana (recast the 5/5 directly, {4}{U}{R} + tax) and 10 mana across two turns
  (recast the 1/3 for {1}{U} + tax, then pay {4}{U}{R} at sorcery speed). Scryfall's `layout` field
  settles it — `modal_dfc` vs `transform`. Note CR 712.8a still applies: in the command zone the card
  shows only its **front** face's characteristics, which is what determines colour identity
  questions, not what you may cast.
- **Recasting from hand (2026-08-24).** The recast path after a bounce is {4}{U}{R} for The
  Invincible Iron Man directly, not "{1}{U} then transform", and a recast of either face is a spell
  that can be countered. Never infer DFC kind from the presence of a transform ability — Marvel-set
  cards can be both modal and transforming. Check the Scryfall `layout` field (`--json`) whenever a
  line depends on which faces are castable.
- **Type-worded effects (2026-08-24).** Before counting any DFC as a hit for a type-worded effect
  ("artifact card", "creature card", tutors, cheat-into-play), check the FRONT face's type line — the
  back face is invisible everywhere except the battlefield/stack. Tony Stark is a Legendary Creature —
  Human Artificer Hero on the front, so Master Transmuter (or any "put an artifact card from your hand
  onto the battlefield" effect, including The Invincible Iron Man's own combat trigger) cannot deploy
  it. On the battlefield the Transmuter cost CAN bounce him while transformed, which still fizzles
  single-target removal. Bounce-to-save still works on the transformed side; bounce-to-redeploy does
  not.

**History:** On 2026-08-24 this ledger claimed that after a Transmuter bounce Tony Stark "must then
be recast for {1}{U} (+ tax if commander) and re-transformed"; corrected the same day because
commander tax applies only to command-zone casts (no tax from hand, cost-012) and Tony Stark is a
modal DFC whose {4}{U}{R} face is directly castable. I had pattern-matched "has a Transform ability"
to "transforming DFC, front-face casts only" and the user corrected me.
**See also:** zone-004, zone-005, zone-006, cost-006, cost-012
**Source:** iron-man (2026-08-07); iron-man (2026-08-24, merged from "A DFC with an artifact back face
is NOT an artifact card in hand"), Master Transmuter vs Tony Stark rules question; iron-man
(2026-08-24, merged from "Tony Stark is a modal DFC — the Iron Man face is castable straight from
hand"), Master Transmuter recast costing; the user's pushback, they were right.

### A modal DFC's mana value on the battlefield is the face that's up {#zone-004}

**Kind:** ruling · **Verified:** 2026-08-18 against CR 2026-08-07
**Cards:** Tony Stark; Excalibur, Sword of Eden
**Rules:** 712.8a, 712.8e, 712.8f
**Claim:** For a **modal** DFC the mana value follows whichever face is currently up on the stack
or battlefield. This is the opposite of a **nonmodal** DFC, whose back face keeps the front face's
mana value.
**Evidence:** CR 712.8f — *"While a modal double-faced spell is on the stack or a modal
double-faced permanent is on the battlefield, it has only the characteristics of the face that's
up."* Contrast CR 712.8e for nonmodal DFCs — *"its mana value is calculated using the mana cost of
its front face."* CR 712.8a keeps both at the front face's MV in every other zone.
**Changes:** Anything that counts mana value of permanents reads the back face for a flipped modal
DFC. A transformed Tony Stark is an **MV 6** historic permanent, so Excalibur, Sword of Eden
(*"costs {X} less, where X is the total mana value of historic permanents you control"*) is 6
cheaper from the commander alone. Check `layout` before doing this arithmetic — the same board with
a nonmodal DFC commander would count 2.
**See also:** zone-003
**Source:** iron-man (2026-08-18).

### The current CR lets a modal DFC transform — the 2021 MDFC rulings boilerplate is stale {#zone-005}

**Kind:** ruling · **Verified:** 2026-08-18 against CR 2026-08-07
**Cards:** Tony Stark
**Rules:** 712.9
**Claim:** A modal double-faced card *can* transform under the current rules. Do not trust the
cached Scryfall ruling text *"A modal double-faced card can't be transformed"* that is stamped on
every 2020-2021 MDFC.
**Evidence:** CR 712.9 (rules of 2026-08-07) — *"Only permanents represented by double-faced tokens
and double-faced cards that are **not meld cards** can transform or convert."* Modal DFCs are not
excluded. Nothing in CR 712 restricts transforming to nonmodal cards. Tony Stark is
`layout: modal_dfc` and prints *"{4}{U}{R}: Transform Tony Stark"* — a hybrid design the 2021
boilerplate predates.
**Changes:** When a Scryfall ruling and the local `rules/sections/` disagree, the local CR wins —
rulings are frozen at print date and are not re-issued when the rules change. Grep the CR before
quoting a ruling older than the card in front of you.
**See also:** zone-003, zone-006
**Source:** iron-man (2026-08-18), checking whether Tony Stark can be cast as its back face.

### Read the PRINTED CARD to tell a modal DFC from a transforming one {#zone-006}

**Kind:** ruling · **Verified:** 2026-08-18 against CR 2026-08-07
**Cards:** Tony Stark; Bruce Banner; Jennifer Walters; King T'Challa; Monica Rambeau
**Rules:** 712.2b, 712.2c, 712.3b, 712.3c, 712.11b, 903.8
**Claim:** When a card's layout is contested, the card image settles it faster and more reliably
than any database field or ruling. Three independent tells, all visible on the scan.
**Evidence:** (1) **A mana cost printed in the back face's top-right corner** — modal only; a
nonmodal back face never has one. (2) **A hint bar in the lower left of *both* faces showing the
other face's P/T and mana cost** — CR 712.3c, modal only; a nonmodal front face prints only gray
P/T with no cost (CR 712.2c). (3) **The back-face symbol**: two triangles in a sideways teardrop
(modal, CR 712.3b) vs a single downward triangle in a circle (nonmodal, CR 712.2b).
Tony Stark // The Invincible Iron Man shows all three modal tells *and* a `{4}{U}{R}: Transform`
ability on its front face — a hybrid the pre-2026 rules did not allow, confirmed as deliberate by a
five-card Marvel Super Heroes cycle (Bruce Banner, Jennifer Walters, King T'Challa, Monica Rambeau,
Tony Stark) whose transform cost equals the back face's mana cost in every case.
**Changes:** `bun run scripts/card.ts <name> --json` exposes `imageUri`; download it and Read it
when a layout claim is load-bearing. Also: a card can be modal *and* transform, so "it has a
Transform ability" is **not** evidence that the back face is uncastable — check for a printed
back-face mana cost instead. Note the limit of this test: it settles *which layout the card is*, not
*which zones you may cast it from*; the command-zone half still rests on CR 712.11b + 903.8, and
this cycle has **zero** Scryfall rulings to lean on.
**See also:** zone-003, zone-005
**Source:** iron-man (2026-08-18) — the user challenged "are you 1000% sure" on the 6-vs-8 mana
claim, and the scan answered it in one look after the API and the rulings could not.

### Colour identity reads every half of a card; protection reads only the battlefield face {#zone-007}

**Kind:** ruling · **Verified:** 2026-08-19 against CR 2026-08-07
**Cards:** The Arkenstone // Seek the Heart; Sword of Fire and Ice; Glamdring, Foe-hammer // Gleam of Death
**Claim:** A card that is colourless *as a permanent* can still be undeckable: colour identity is
computed across all halves and faces (Adventure halves included), while on-battlefield colour —
what a protection clause like Sword of Fire and Ice checks — comes only from the face in play.
Check the two layers separately, in that order: identity gates deckbuilding, printed colours gate
attach/protection conflicts.
**Evidence:** The Arkenstone // Seek the Heart — the battlefield face is a `{5}` Legendary
Artifact (colourless), but the Adventure half is `{2}{W}`, so Scryfall reports **CI: W** — not
legal in an Izzet deck at all. The mirror case, already noted in the HOB review: Glamdring,
Foe-hammer's Adventure is `{3}{U}` (identity U, deckable in Izzet) while the permanent stays
colourless and so coexists with SoFI's pro-blue.
**Changes:** When screening "colourless" artifacts, read CI from the tool output, never from the
type line or the battlefield face. A card can pass the protection-conflict check and still fail
identity, or vice versa.
**See also:** zone-002
**Source:** iron-man (2026-08-19) — The Arkenstone, found by the user online, rejected on identity
alone.

### Token copies of ETB artifacts keep the ETB; spell-copy and myriad tokens never trigger "nontoken" {#zone-008}

**Kind:** ruling · **Verified:** 2026-09-03 against CR 2026-08-07
**Cards:** Portal to Phyrexia; Echoes of Eternity; Chrome Dome; Glaring Fleshraker; Sculpting Steel; Kuldotha Forgemaster; Prototype Portal; Panharmonicon
**Rules:** 603.2d, 603.6a, 608.3f, 702.116a, 707.2, 707.3, 707.5, 707.10f
**Claim:** A token created as a copy of a permanent enters with that permanent's triggered abilities
and its ETB fires (a token Portal to Phyrexia is a second triple edict). But a token produced by a
*spell* copy (Echoes of Eternity), by myriad, or by Chrome Dome is a token — it never satisfies a
"whenever another **nontoken** artifact enters" trigger, while it still counts as a creature
entering for Glaring Fleshraker-style "another colorless creature enters" triggers.
**Evidence:** CR 707.2/707.5 (copy acquires rules text; ETB abilities of a copy get a chance to
trigger); CR 608.3f / 707.10f (a resolved permanent-spell copy becomes a token); CR 702.116a (myriad
creates token copies); CR 603.6a (tokens entering are permanents entering). Sculpting Steel is the
mirror case: a **card** entering as a copy is a nontoken artifact entering (707.5), and a copy of
it uses the copied object's values (707.3).
**Changes:** In a "copy on enter" deck, sort the copy engines into *card enters* (Sculpting Steel,
Kuldotha Forgemaster, Prototype Portal's card? — no, Portal makes a token) and *token enters*
before counting how many times the commander fires; only the first group feeds a "nontoken"
trigger. Panharmonicon + Echoes of Eternity on such a trigger is three instances, not four
(603.2d, already ledgered).
**See also:** zone-009, zone-015
**Source:** ultron (2026-09-03) — founding build; verified by mtg-rules-expert against CR 2026-08-07.

### Copying a permanent copies no counters, status or casting choices — Chalice copies tap for nothing, Ballista copies die, Stations are bare shells {#zone-009}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Everflowing Chalice; Walking Ballista; Hangarback Walker; Ultron, Artificial Malevolence; Mirrorworks; Prototype Portal; Helm of the Host; Chrome Dome; Sculpting Steel; Echoes of Eternity; Lithoform Engine; Threefold Thunderhulk; Big Mother Mouser; Sol Ring; Thran Dynamo; Gilded Lotus; Arc Reactor; The Mightstone and Weakstone; Shuri, Wakandan Inventor; Extinguisher Battleship; Ultron, Machine Overlord; Forsaken Monument; Scrap Trawler
**Rules:** 107.3g, 508.1a, 611.3a, 614.1c, 614.12, 702.33e, 704.5f, 707.2, 721.2b
**Claim:** When an effect copies a *permanent* (Ultron, Mirrorworks, Prototype Portal, Helm of the
Host, Chrome Dome, Sculpting Steel, Shuri), the copy gets none of the original's counters, status or
casting choices: a copied Everflowing Chalice enters with zero charge counters and taps for nothing,
a copied Walking Ballista or Hangarback Walker is a 0/0 that dies as a state-based action, and a card
whose abilities and creature-ness sit behind a counter threshold (Station `{N+}`, level up, Sagas,
Class levels) is a bare shell with none of it. Copying a *spell* (Echoes of Eternity, Lithoform
Engine's third mode) is the opposite: the copy keeps X and kicked status.
**Evidence:** CR 707.2 — copiable values are derived from printed text: "name, mana cost, color
indicator, card type, subtype, supertype, rules text, power, toughness, and/or loyalty… Other effects
(including type-changing and text-changing effects), **status, counters**, and stickers are not
copied"; choices made when casting (*"the value of X, whether it was kicked"*) are copied only *"for
an object on the stack"*. CR 107.3g — *"If a card in any zone other than the stack has an {X} in its
mana cost, the value of {X} is treated as 0."* Everflowing Chalice's counters come from a
kicker-linked "enters with" replacement (702.33e, 614.1c) that reads how many times *it* was kicked —
the token never was. Printed "enters with N counters" replacements DO apply to the copy (614.12 reads
the copy's own text): a token Threefold Thunderhulk gets its three, a token Big Mother Mouser its two.
CR 721.2b defines a Station `{5+}` line as "**As long as this permanent has 5 or more charge counters
on it**, it has [abilities] and is a creature."
**Changes:** In a "copy on enter" deck, sort the rocks into fixed-output (Sol Ring, Dynamo, Lotus,
Arc Reactor, Mightstone — copy them) and cast-choice-output (Chalice, Ballista, Hangarback, any
X-cost artifact — never pay to copy the permanent). If an X-cost artifact is wanted as a copy target,
the engine must copy the *spell* (Echoes), not the permanent.
- **Counter-gated copy targets (2026-09-09).** Never nominate a Station Spacecraft, a leveler or a
  Saga as the thing to copy. In the same family: **status isn't copied either**, so a *tapped*
  permanent that becomes a copy of a Vehicle is a *tapped* Vehicle and cannot attack (508.1a). Tap the
  rock for mana **or** copy it into a threat — not both in one turn.
- **Exception: an anthem turns the X = 0 copy problem off (2026-09-16).** A static +N/+N that covers
  the token (Ultron, Machine Overlord for Constructs, Forsaken Monument for colourless creatures)
  applies continuously, so the 0/0 token never has toughness 0 and survives as an N/N with no
  counters. CR 704.5f (toughness 0 or less is put into the graveyard as a state-based action) · CR
  611.3a (a static ability's continuous effect applies as long as the source is on the battlefield) —
  the anthem is already applying when state-based actions are checked. Walking Ballista's token then
  has its {4} counter ability; Hangarback Walker's token has {1},{T}. When an X-cost artifact is
  proposed for a copy-on-enter deck, check the deck's anthems before writing "never pay for the copy"
  — the honest line is "never, unless [anthem] is out."

**History:** Before 2026-09-04 the ultron deck's own gameplan said "Chalice copies enter with the
same counters" — a claim written from recall, the exact §1.1 failure; corrected on 2026-09-04 when
the pilot asked whether a Chalice copy keeps its counters and CR 707.2 said no.
**See also:** zone-001, zone-008, zone-015, cost-019
**Source:** ultron (2026-09-04), the pilot asked whether a Chalice copy keeps its counters;
cap-living-legend (2026-09-09, merged from "Copy effects don't copy counters or status, so
counter-gated cards are dead copy targets"), Extinguisher Battleship rejected as a Shuri target;
ultron (2026-09-16, merged from "An anthem turns the X = 0 copy problem off — a copied Ballista or
Hangarback lives under +2/+2"), Hangarback Walker in for Scrap Trawler.

### A copy of an exiled card is cast FROM EXILE — Arcane Bombardment and Mizzix's Mastery fire "cast from exile" and "cast from anywhere but hand" {#zone-010}

**Kind:** ruling · **Verified:** 2026-09-06 against CR 2026-08-07
**Cards:** Passionate Archaeologist; Nico Minoru, Runaway; Cosmic Cube; Increasing Vengeance; Loki Laufeyson; Repeated Reverberation; Arcane Bombardment; Mizzix's Mastery; Wiccan, Young Avenger; Commune with Lava; Ignite the Future; Inspired Tinkering; Hex Magic; Cait Sith, Fortune Teller; Jeska's Will; Thor, God of Thunder
**Rules:** 601.2, 601.2a, 707.10, 707.12
**Claim:** When an effect says *"copy it, you may cast the copy"* about a card in exile, the copy is
created in exile and then cast, so it counts for Passionate Archaeologist (*"cast a spell from
exile"*) and Nico Minoru (*"from anywhere other than your hand"*). Cosmic Cube, by contrast, casts
from the **library** (*"look at the top six … cast a spell from among them"*) — Nico yes,
Archaeologist no. Flashback casts from the **graveyard** — Nico yes, Archaeologist no.
**Evidence:** CR 707.12 — casting a copy *"follows the rules for casting spells, except that the
copy is created in the same zone the object is in and then cast"*; CR 601.2/601.2a (a cast moves the
object *from where it is* to the stack, expressly including *"that copy of a card"*); CR 707.10 —
merely copying a *spell on the stack* is not a cast at all (Increasing Vengeance, Loki, Repeated
Reverberation fire neither).
**Changes:** Count exile-cast enablers by zone, card by card: impulse draw (Wiccan, Commune,
Ignite, Tinkering, Hex Magic, Cait Sith, Jeska's Will, Thor's ETB), discover, and exile-copy
engines (Bombardment, Mastery) — **not** flashback, not spell copies, not Cosmic Cube.
**See also:** zone-001, zone-018
**Source:** scarlet-witch / vision-scarlet-witch (2026-09-06) — Passionate Archaeologist evaluated
for both.

### A Background is a normal enchantment in the 99 — the granted ability works on any commander {#zone-011}

**Kind:** ruling · **Verified:** 2026-09-06 against CR 2026-08-07
**Cards:** Passionate Archaeologist
**Rules:** 205.3h, 702.124k, 903.3d, 903.5a, 903.5e
**Claim:** Passionate Archaeologist (or any Background) can be run as an ordinary enchantment in a
deck whose commander has no *"Choose a Background"*, and *"Commander creatures you own have …"*
still applies to that commander while it is on the battlefield.
**Evidence:** CR 205.3h — Background is an enchantment subtype. CR 702.124k restricts only the
**command zone** (a Background *"can't be your commander unless …"*). CR 903.5a–e (deck
construction) never mentions Backgrounds; CR 903.3d — "controlling a commander" means a permanent
on the battlefield that is a commander.
**Changes:** Evaluate Backgrounds as 2-mana enchantments that need the commander **on the
battlefield** — the ability lives on the commander, so it is blank while they are in the command
zone and does nothing the turn they are removed.
**See also:** zone-013
**Source:** scarlet-witch (2026-09-06) — Passionate Archaeologist.

### "No maximum hand size" vs "your maximum hand size is ten" — later timestamp wins {#zone-012}

**Kind:** ruling · **Verified:** 2026-09-06 against CR 2026-08-07
**Cards:** Thought Vessel; Reliquary Tower; The Ten Rings; Venser's Journal; Howling Mine
**Rules:** 603.4, 613.7, 613.7d, 613.9, 613.11
**Claim:** Thought Vessel / Reliquary Tower and The Ten Rings do not stack; whichever entered the
battlefield later sets the maximum. The Ten Rings' end-step refill works either way because it
counts cards in hand, never the maximum.
**Evidence:** CR 613.11 (hand-size effects apply after all other continuous effects, in timestamp
order), CR 613.7/613.7d (a permanent's timestamp is when it entered), CR 613.9 (last applied
"wins"); CR 603.4 for the intervening-if refill.
**Changes:** In any list running The Ten Rings, a second no-max-hand-size card is redundant, not
additive — and it can *lose* to the Rings on timestamp. Reliquary Tower earns a slot only in a deck
that reliably ends its own turn above seven cards *without* a refill engine (Lord of Pain's
Howling-Mine package qualifies; Iron Man and Ultron with The Ten Rings do not).
**Source:** iron-man (2026-09-06) — Reliquary Tower re-evaluated; matches the 2026-08-25 Venser's
Journal cut.

### A companion's condition is checked INCLUDING your commander, and companion is nothing like a commander {#zone-013}

**Kind:** ruling · **Verified:** 2026-09-08 against CR 2026-08-07
**Cards:** Zirda, the Dawnwaker; Captain America, First Avenger; Training Grounds; Puresteel Paladin; Sigarda's Aid; Sram, Senior Edificer; Forge Anew; Esper Sentinel; Masterwork of Ingenuity; Bureau Headmaster; Urza's Saga
**Rules:** 103.2a, 103.2b, 103.2c, 116.2g, 305.6, 400.11, 605.1a, 702.6a, 702.139a, 702.139b, 702.139d, 903.4, 903.5e, 903.8, 903.9a, 903.9b, 903.11, 903.11a
**Claim:** In Commander, a companion's deckbuilding condition is evaluated against all 100 cards
**including the commander**, because the check happens before the commander is set aside. And the
companion mechanic shares nothing with the commander mechanic beyond "starts outside the library":
flat {3} **once per game** to move it to *hand* (you still cast it), no escalating tax, no command-zone
recursion, no commander damage.
**Evidence:** CR 702.139b — *"If a companion ability refers to your starting deck, it refers to your
deck after you've set aside any sideboard cards. **In a Commander game, this is also before you've set
aside your commander.**"* CR 103.2a/b/c sequences it: sideboard aside → companion revealed → commander
to the command zone. CR 702.139a + 116.2g — *"pay {3} and put that card into your hand"*, a special
action, sorcery speed, empty stack, once per game; contrast CR 903.8 (commander tax, +{2} per prior
cast) and CR 903.9a/b (return to the command zone on death/exile). CR 702.139d / 903.11 make companion
legal in Commander despite CR 903.5e (*"Commander games do not use sideboards"*) — a companion is
revealed from **outside the game** (CR 400.11), a different bucket from a sideboard. CR 903.11a blocks
it if the card shares a name with anything in your starting deck, or if any colour in its identity is
outside your commander's.
**Changes:** Price a companion as **{3} + its mana cost, once, for a card that dies permanently** —
never as a second commander. Then apply the real test: the condition is a **deckbuilding tax on 100
cards plus the commander**, and in singleton that is usually fatal. Worked case: Zirda, the Dawnwaker
under Captain America, First Avenger — the *commander* passes (Throw is `{3}, Unattach an Equipment:`)
and the R/W hybrid identity (CR 903.4) fits inside RUW, but the 99 cannot: Puresteel Paladin (87%
EDHREC), Sigarda's Aid (86%), Sram (75%), Forge Anew (69%), Esper Sentinel, Masterwork of Ingenuity,
Bureau Headmaster and Urza's Saga all have only static and/or triggered abilities. **Default to running
the companion card maindeck**; a maindeck copy makes the companion illegal anyway (CR 903.11a), so it
is strictly either/or.

**Related, verified same pass:** **mana abilities ARE activated abilities.** CR 605.1a — *"An activated
ability is a mana ability if..."* — so `{T}: Add {W}` satisfies any "has an activated ability" check.
Basic lands qualify on their intrinsic ability (CR 305.6) and fetchlands on their sacrifice ability,
but a Saga does **not** (chapter abilities are triggered; Urza's Saga only *gains* `{T}: Add {C}` after
chapter I, irrelevant to a card checked outside the game). Equip qualifies (CR 702.6a), so every
Equipment passes; crew likewise.
**See also:** zone-011, zone-027
**Source:** captain-america (2026-09-08) — pilot asked how companions work and whether to keep both
Zirda and Training Grounds.

### A copied activated ability reuses the ORIGINAL's cost objects, and can't redivide its damage {#zone-014}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Cards:** Illusionist's Bracers; Lithoform Engine; Rings of Brighthearth; Fling
**Rules:** 115.7f, 707.10, 707.10b, 707.10c
**Claim:** Copying an activated ability never re-charges the cost, and an effect in the copy that
refers to an object used to pay the cost reads the object the **original** used. If the ability
divides damage, the copy keeps the original's division; only the identities of the targets may
change.
**Evidence:** CR 707.10 — *"a copy of an activated ability isn't activated... If an effect of the
copy refers to objects used to pay its costs, it uses the objects used to pay the costs of the
original spell or ability"* (the rule's own example is Fling). CR 707.10b — the copy has the same
source as the original. CR 707.10c — new targets are optional and must be legal. CR 115.7f — *"the
original division can't be changed"* when choosing new targets.
**Changes:** Prices every ability-copier (Illusionist's Bracers, Lithoform Engine, Rings of Brighthearth)
against sacrifice/unattach/exile-cost abilities at **full value for zero extra cost** — the copy is
pure profit, and it inherits every static buff on the source. But a copy of a *divided* damage
ability cannot be recombined into one big hit: 2/1/1 among three targets stays 2/1/1 among three
targets. Do not plan on a copy consolidating chip damage into a kill.
**See also:** zone-001
**Source:** captain-america (2026-09-09) — Illusionist's Bracers copying Throw.

### A copy effect on a permanent already on the battlefield does NOT trigger ETBs {#zone-015}

**Kind:** ruling · **Verified:** 2026-09-09 against CR 2026-08-07
**Cards:** Shuri, Wakandan Inventor; Mirrorworks
**Rules:** 603.6a, 613.2a, 707.4, 707.5
**Claim:** "Target permanent becomes a copy of..." fires no enters-the-battlefield abilities. Only
"enters **as** a copy" does.
**Evidence:** CR 707.4 — "Some effects cause a permanent that's copying a permanent to copy a
different object while remaining on the battlefield. The change doesn't cause enters-the-battlefield
or leaves-the-battlefield abilities to trigger." ETB abilities are zone-change triggers (603.6a) and
a copy effect is a layer 1a continuous effect (613.2a) on a permanent that never changes zones.
Contrast CR 707.5, the "enters as a copy" case, which *does* get ETB triggers.
**Changes:** When picking targets for a Shuri/Mirrorworks-style copy effect, value **attack** and
**activated** abilities, not ETBs. A card whose whole value is its ETB is a dead copy target for the
707.4 kind and a live one for the 707.5 kind — check which you have before evaluating.
**See also:** zone-008, zone-009
**Source:** cap-living-legend (2026-09-09) — Shuri, Wakandan Inventor.

### Declining the command zone is a one-time choice — made before any recursion spell can be cast {#zone-016}

**Kind:** ruling · **Verified:** 2026-09-15 against CR 2026-08-07
**Cards:** Faith's Reward; Brought Back
**Rules:** 117.5, 903.9a
**Claim:** The option to move a dead commander to the command zone exists only at the state-based
action check right after it lands in the graveyard. Decline it to recur the commander for free, and
it stays in the graveyard even if the recursion spell is then countered.
**Evidence:** CR 903.9a — "If a commander is in a graveyard or in exile and that object was put into
that zone since the last time state-based actions were checked, its owner may put it into the command
zone. This is a state-based action." SBAs are checked before anyone receives priority (CR 117.5), so the
choice precedes casting an instant. Faith's Reward: "Return to the battlefield all permanent cards in
your graveyard that were put there from the battlefield this turn."
**Changes:** Leave the commander in the graveyard for a Faith's Reward / Brought Back line only when the
spell is likely to resolve; against open counter mana, send it to the command zone.
**Source:** cap-living-legend (2026-09-15) — resilience proposal.

### Ghostway exiles your tokens and stationed Spacecraft for good — prefer targeted blink or phasing {#zone-017}

**Kind:** ruling · **Verified:** 2026-09-15 against CR 2026-08-07
**Cards:** Ghostway; Eerie Interlude; Hangarback Walker
**Rules:** 110.5c, 111.7, 111.8, 122.2, 513.2, 702.26d, 702.26g, 721.2b
**Claim:** A mass "exile each creature you control, return at end step" protects the board from a
wipe but permanently loses tokens and resets stationed Spacecraft; targeted delayed blink (Eerie
Interlude) and phasing avoid both.
**Evidence:** Ghostway: "Exile each creature you control." Tokens off the battlefield cease to exist
(CR 111.7, 111.8). A Spacecraft at threshold is a creature (721.2b), and counters don't survive a zone
change (122.2). Eerie Interlude targets "any number of target creatures you control", so you choose.
Phasing keeps counters, tokens, attachments and tapped status (702.26d, 702.26g, 110.5c). Also:
Hangarback Walker blinked returns with 0 counters and dies with no Thopters; don't cast a delayed
blink during an end step or the return waits a full turn (513.2).
**Changes:** In a token or Spacecraft deck, rank board protection: phasing ≥ targeted delayed blink >
indestructible (destroy/damage only) > mass blink.
**See also:** zone-024, zone-009
**Source:** cap-living-legend (2026-09-15).

### "Cast" permissions never touch lands; "play" does, but still spends your land drop {#zone-018}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Apex of Power; Commune with Lava
**Rules:** 305.1, 305.2a, 305.2b, 305.3, 701.18b, 712.8a
**Claim:** A land is never a spell, so a *"you may cast spells from among them"* permission leaves an
exiled land stuck. A *"you may play"* permission covers lands too, but a land played that way uses
your one land drop and needs your own turn, a main phase and an empty stack. A spell//land modal
DFC is a **nonland** card in exile, so "cast" lets you use only its spell face and "play" lets you
use either face.
**Evidence:** CR 305.1 — playing a land is a special action, *"it is never a spell"*. CR 701.18b —
*"To play a card means to play that card as a land or to cast that card as a spell."* CR 305.2a
counts lands played during an effect's resolution toward the one-per-turn limit; CR 305.2b and
305.3 forbid playing a land with no land drop left or on another player's turn. CR 712.8a — outside
the battlefield and stack a DFC has only its front face's characteristics. Official rulings: Apex of
Power, *"Any cards not cast, including land cards, remain in exile"*; Commune with Lava, *"you must
follow all applicable timing rules"*.
**Changes:** Read the verb before counting an impulse effect's card advantage. "Cast" effects lose
every land they exile. "Play" effects keep them, but at most one per turn, and none on an
opponent's turn. So a "play until the end of your next turn" effect cast on an opponent's turn gives
you one land drop, not two. For "exile until you exile a nonland card" effects, a spell//land MDFC
is where they stop, and if the effect then casts it for free, X is 0.
**See also:** zone-010
**Source:** scarlet-witch (2026-09-16) — the pilot's "lands don't count as spells, right?";
mtg-rules-expert.

### A copier that TARGETS the spell dies with it; a "when you next cast" copy trigger does not {#zone-019}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Reiterate; Increasing Vengeance; Return the Favor; Storm King's Thunder; Repeated Reverberation; Pyromancer's Goggles; Stifle
**Rules:** 115.10a, 608.2b, 608.2h, 702.27a, 707.10
**Claim:** Spell copiers split into two families that behave oppositely when the original is
countered. *Targeted* copiers (Reiterate, Increasing Vengeance, Return the Favor's copy mode) are
cast above the spell and make the copy when they resolve; if the original leaves the stack first,
they have no legal target, do not resolve, and make nothing — and buyback does not return a
Reiterate that failed this way. *Non-targeting* copy triggers (Storm King's Thunder, Repeated
Reverberation, Pyromancer's Goggles) go on the stack above the spell and **still make their copies
if the original was countered**, using its last known information.
**Evidence:** CR 608.2b — a spell whose targets are all illegal *"doesn't resolve"*; CR 702.27a —
buyback returns the card only *"as it resolves"*. CR 115.10a — "that spell" is not a target, so the
608.2b check never applies to the triggers; CR 608.2h — last known information. Official Gatherer
rulings: Storm King's Thunder *"will create copies … even if that spell has been countered"*;
Pyromancer's Goggles *"A copy is created even if the spell … has been countered"*; Repeated
Reverberation the same. CR 707.10: in both families the copy goes on top of the original and
resolves first, is a spell in its own right, can be countered separately, and is **not cast**.
**Changes:** Against counterspells, rate the trigger family above the targeted family — their weak
moment is the setup spell itself (countering Storm King's Thunder means no trigger exists) or a
Stifle on the trigger, not a counter on the payoff. Goggles' setup is a mana ability and can't be
responded to at all. For "can't be countered" effects, read the wording: *"spells you control
can't be countered"* protects copies (they are spells you control); *"the next spell you cast"*
does not (copies are never cast); *"spells and abilities can't be countered"* also protects the
copy triggers from Stifle.
**See also:** zone-001
**Source:** scarlet-witch (2026-09-16) — the pilot's "how does the stack look when I copy a spell,
and what remains if things get countered?"; mtg-rules-expert.

### An empty library is not a loss — a player loses only when they next try to draw, and nobody can respond {#zone-020}

**Kind:** ruling · **Verified:** 2026-09-16 against CR 2026-08-07
**Cards:** Thassa's Oracle; Laboratory Maniac; Jace, Wielder of Mysteries
**Rules:** 104.3c, 104.3f, 117.5, 121.3, 603.3, 608.2d, 608.2h, 701.17a, 704.3, 704.5b
**Claim:** An empty library is not itself a loss condition; a player loses only when they *attempt
to draw* from it, and that loss happens before anyone gets priority. So a milled-out opponent
survives until they are *required to draw* — in a four-player pod up to three full turns later — and
a "win with an empty library" deck must empty out **after** its own draw step.
**Evidence:** CR 104.3c — "If a player is required to draw more cards than are left in their library,
they draw the remaining cards and then lose the game the next time a player would receive priority",
implemented as the SBA in 704.5b; 117.5/704.3 — SBAs are checked before a player gets priority and
before triggers go on the stack. There is no state-based action for an empty library, and
608.2d/121.3 confirm an empty library doesn't make drawing impossible. Milling an empty library mills
zero cards (701.17a). Thassa's Oracle checks on **resolution of a triggered ability** with no draw
involved; killing the Oracle in response does not stop it (603.3 — the trigger is independent;
devotion is recounted per 608.2h, but 0 ≥ 0 still holds). Laboratory Maniac and Jace, Wielder of
Mysteries both require actually attempting the draw, so they must survive a full turn cycle. CR
104.3f: simultaneous win and loss is a loss.
**Changes:** The same rule cuts both ways:
- **Decking yourself.** Thassa's Oracle is strictly the safest payoff. In any self-mill deck, run the
  Oracle as the primary and the draw-replacement cards as backup, and treat "an opponent makes me
  draw" as the real answer to play around — not creature removal.
- **Milling an opponent.** Every mill effect pointed at an emptied player does literally nothing. The
  moment an opponent's library is empty, **switch targets** — further mill at them is wasted. Count a
  mill deck's clock as "turns until each opponent's next draw step", not "cards remaining". Watch for
  graveyard-shuffle effects, which put the victim back in play and make your mill live again.

**See also:** zone-021, zone-022, zone-023, zone-024
**Source:** cap-living-legend (2026-09-16); cap-living-legend (2026-09-16, merged from "Milling a
player to zero does not eliminate them — they die at their next draw").

### Untap-step mill resolves in your upkeep — BEFORE your draw step {#zone-021}

**Kind:** ruling · **Verified:** 2026-09-17 against CR 2026-08-07
**Cards:** Mesmeric Orb; Fraying Sanity; Jace, Wielder of Mysteries; Laboratory Maniac; Thassa's Oracle
**Rules:** 104.3c, 501.1, 502.4, 503.1a, 704.5b
**Claim:** Mesmeric Orb (and any "whenever a permanent becomes untapped" mill) mills you during your own
upkeep, after your permanents untap and immediately before your draw. In a win-by-empty-library deck it can
take your library to zero right before a mandatory draw, and you lose.
**Evidence:** CR 501.1 (the beginning phase is untap, upkeep, draw, in that order); 502.4 (nothing resolves
during the untap step — triggers are held until a player would next receive priority, "usually during the
upkeep step"); 503.1a (those triggers go on the stack at the start of upkeep, before the active player gets
priority); 104.3c / 704.5b (drawing from an empty library loses at the next state-based check). The same trap
applies to a self-targeted end-step mill (Fraying Sanity enchanting yourself) that empties you on an
opponent's turn.
**Changes:** In a self-mill deck, land the draw-replacement piece (Jace, Wielder of Mysteries or Laboratory
Maniac) BEFORE any mill source that can fire between your main phases. Without one, enter your turn with at
least (permanents that will untap + 1) cards. Thassa's Oracle cannot rescue you from this — it has no flash,
so it can only be cast in a main phase, which comes after the draw step. Empty yourself in main phase 1 and
cast the Oracle in the same turn, or have Jace/Lab Man out first.
**See also:** zone-020, zone-023
**Source:** cap-living-legend (2026-09-17) — pilot asked how to win by decking themselves without
losing.

### A "target player draws N" spell is both a mill finisher and an instant kill on a decked opponent {#zone-022}

**Kind:** ruling · **Verified:** 2026-09-17 against CR 2026-08-07
**Cards:** Mathemagics; Laboratory Maniac; Jace, Wielder of Mysteries; Stroke of Genius; Blue Sun's Zenith; Muddle the Mixture; Persistent Petitioners
**Rules:** 104.3c, 121.2, 121.4
**Claim:** Aimed at a milled-out opponent, any draw-N spell makes them lose immediately instead of at their
next draw step. Aimed at yourself with Laboratory Maniac or Jace, Wielder of Mysteries on the battlefield, it
wins once your library runs dry partway through — so a self-mill deck does not need to mill to exactly zero.
**Evidence:** CR 121.2 — "Cards may only be drawn one at a time. If a player is instructed to draw multiple
cards, that player performs that many individual card draws", so a replacement like Lab Man's applies to the
first individual draw from an empty library. CR 121.4 / 104.3c — a player who attempts to draw from an empty
library loses the next time a player would receive priority. Mathemagics ({X}{X}{U}{U}, "target player draws
2^X cards", mana value 2): X=0 costs {U}{U} and draws 1, which kills an opponent at zero; X=4 costs 10 and
draws 16. Without a draw-replacement on the battlefield, aiming it at yourself for more than your library
loses you the game.
**Changes:** In any mill deck, count a cheap targeted draw spell as a **closer**: it removes the up-to-three-
turn wait between emptying a library and that player losing. Prefer the exponential version (Mathemagics)
for self-wins; instant versions (Stroke of Genius, Blue Sun's Zenith) trade efficiency for killing at instant
speed. Mathemagics' mana value of 2 also makes it findable by MV-2 transmute tutors (Muddle the Mixture).
**See also:** zone-020
**Source:** cap-living-legend (2026-09-17) — pilot asked whether Mathemagics belongs in the self-mill
Petitioners list.

### Thassa's Oracle does not need an empty library — every on-colour permanent raises the bar {#zone-023}

**Kind:** ruling · **Verified:** 2026-09-17 against CR 2026-08-07
**Cards:** Thassa's Oracle; Persistent Petitioners
**Claim:** Thassa's Oracle wins whenever your devotion to blue is at least the number of cards left in your
library, and the Oracle itself counts. In a deck of blue creatures, that can be a double-digit number.
**Evidence:** Oracle text — "look at the top X cards of your library, where X is your devotion to blue … If X
is greater than or equal to the number of cards in your library, you win the game. (Each {U} in the mana costs
of permanents you control counts toward your devotion to blue.)" Persistent Petitioners ({1}{U}) is 1 each;
the Oracle ({U}{U}) is 2. Ten Petitioners on the battlefield plus the Oracle = 12: a win with 12 cards left.
**Changes:** With the Oracle in hand, stop milling at your devotion count rather than zero — that leaves a
buffer against the upkeep self-mill trap. With the Oracle still in the library, milling to zero is what
guarantees it is reachable.
**See also:** zone-021, zone-024
**Source:** cap-living-legend (2026-09-17).

### Phasing never re-triggers an ETB — and phasing out in response shrinks devotion {#zone-024}

**Kind:** ruling · **Verified:** 2026-09-17 against CR 2026-08-07
**Cards:** Thassa's Oracle; Teferi's Protection
**Rules:** 113.7a, 700.5, 702.26b, 702.26d
**Claim:** A permanent that phases out and back in does not "enter the battlefield", so enters-triggers
(Thassa's Oracle's) do not fire again. And if an ETB that counts devotion is already on the stack, phasing
out your own permanents in response lowers the count it will use.
**Evidence:** CR 702.26d — "The phasing event doesn't actually cause a permanent to change zones … Zone-change
triggers don't trigger when a permanent phases in or out." CR 702.26b — a phased-out permanent "is treated as
though it does not exist." CR 700.5 — devotion counts mana symbols "among the mana costs of permanents that
player controls", so phased-out permanents add nothing. CR 113.7a — the trigger itself still resolves after its
source phases out. Thassa's Oracle computes X (devotion) on resolution.
**Changes:** Never plan to reuse an ETB with a phasing effect — only a real zone change (blink, die and return,
recursion) re-triggers it. In a devotion-to-X win (Thassa's Oracle), a mass phase-out such as Teferi's
Protection in response drops devotion to zero, so the win then needs an EMPTY library; win at zero cards if a
protection spell might be needed, rather than leaning on the devotion buffer.
**See also:** zone-023, zone-017
**Source:** cap-living-legend (2026-09-17) — "does Thassa's ETB still trigger if I phase her out?"

### No effect makes permanents instants/sorceries, and one would blank them {#zone-025}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** Flow State; Amethyst Dragon // Explosive Crystal; Smaug, the Great Calamity // Spew Flame; Song-Mad Treachery; Strife Scholar // Awaken the Ages; Stormshriek Feral // Flush Out; Omniclown Colossus // Pie-roclasm
**Rules:** 110.4, 202.3e, 304.4, 307.4, 308.1, 608.3e, 712.8f, 712.13a, 715.3b, 720.3b, 722.3c
**Claim:** No paper card adds the instant or sorcery type to permanent cards or spells, and if one
did, the creature would get an instant/sorcery discount and then go to the graveyard instead of
entering. An instant/sorcery-gated reducer reaches a permanent only through a separately cast
half: Adventure, Omen, spell//land MDFC, or a Prepare copy.
**Evidence:** Scryfall sweep 2026-09-28 (`game:paper`): `o:"is an instant"` (1 hit, Flow State,
unrelated), `"are instants"`, `"is a sorcery"`, `"are sorceries"`, `"instant in addition"`,
`"sorcery in addition"`, `"becomes an instant"`, `"becomes a sorcery"`, `"also an instant"`,
`"count as" instant`, `"treated as" instant`, `"spells you cast are"`: 0 hits. CR 110.4 —
*"Instant and sorcery cards can't enter the battlefield and thus can't be permanents"*; 304.4 /
307.4; 608.3e — a permanent spell that can't be put onto the battlefield goes to the graveyard
(712.13a is the printed analogue for an instant/sorcery back face). Kindred (308.1) is the only
card type designed to share a type line with instant/sorcery, and it adds no permanent type. The
halves: 715.3b (Adventure), 720.3b (Omen), 712.8f (MDFC, face that's up), 722.3c (Prepare copy).
**Changes:** When a pilot asks to widen an instant/sorcery-only reducer to permanents, answer with
the split-card routes, and gate them on the *spell half's* mana value, not the card's. Mono-red,
MV ≥ 4 halves as of this date: Amethyst Dragon (Explosive Crystal {4}{R}), Smaug (Spew Flame
{4}{R}), Song-Mad Treachery (MDFC {3}{R}{R}), Strife Scholar (prepare Awaken the Ages {5}{R}),
plus any {X} half at X ≥ 2 (202.3e). The only red Omen, Stormshriek Feral, has a {1}{R} half.
Omniclown Colossus is Unfinity and not commander-legal.
**See also:** zone-002
**Source:** scarlet-witch (2026-09-28) — pilot's "is there a card that makes all my cards count as
sorceries?"

### Descend counts CARDS — a token dying never descends {#zone-026}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** The Mycotyrant; Chatterfang, Squirrel General; Blood Artist; Mirkwood Bats; Grave Pact; Phyrexian Tower; Lotus Petal; Ichor Wellspring; Chromatic Star; Rest in Peace; Leyline of the Void
**Rules:** 108.2b, 110.4, 110.4a, 111.6, 111.7, 119.3, 400.3, 404.1, 404.3, 614.6, 700.11, 903.9a
**Claim:** Sacrificing or killing a token — creature token, Treasure, Food, Clue, Saproling, a token
that is a *copy* of a card — contributes **zero** to "the number of times you descended this turn."
A token-sacrifice engine cannot feed a descend payoff. It is an **anti**-synergy: the more the deck
is tuned to eat tokens, the less it descends.
**Evidence:** CR 700.11 — *"'The number of times [a player] descended this turn' means 'the number of
**permanent cards** put into [that player's] graveyard from anywhere this turn.'"* Descend is a tally
of **cards**, not events, and it is not a keyword action (nothing in 701; 700.11 is the whole rule).
CR 110.4a defines permanent card as an artifact / battle / creature / enchantment / land /
planeswalker **card**. CR 111.6 — *"A token isn't a card."* CR 108.2b — *"Tokens aren't considered
cards."* The seam: CR 111.7 does put the token into the graveyard (so *dies*/LTB triggers such as
Blood Artist, Mirkwood Bats and Grave Pact fire normally), but 111.6 means it was never a card, so
700.11 is never satisfied. **Official confirmation:** The Lost Caverns of Ixalan release notes state
it outright — *"Tokens are not cards, and while tokens are put into the graveyard before ceasing to
exist, that action doesn't count as a player having descended."*
**Changes:** Never pitch a descend card into a token/aristocrats shell on the strength of its
sacrifice engine. What *does* descend, and is therefore what a descend payoff must be built on:
real permanent **cards** dying or being sacrificed; **lands** (Phyrexian Tower eating itself, fetches,
cycling lands); **self-mill** (every permanent card milled, one each); **discard** of a permanent
card; a countered permanent **spell** (CR 404.1); and your commander dying (CR 903.9a — the put
happens before the command-zone replacement). Real artifact *cards* sacrificed for value
(Lotus Petal, Ichor Wellspring, Chromatic Star) descend where the equivalent Treasure/Clue token
does not. **Instants and sorceries never descend** (CR 110.4, 110.4a omits them).
Three counting facts that make descend better than it looks:
- **Simultaneous puts count once per CARD, not once per event** — a wipe killing three of your real
  creature cards is 3, not 1. 700.11 tallies cards; CR 404.3 treats simultaneous puts as multiple
  cards. Do not apply the "one event" reasoning used for lifegain (CR 119.3) here.
- **An opponent's effect putting YOUR cards into YOUR graveyard counts** — 700.11 has no causation
  or control clause, only destination-zone ownership (CR 400.3, 404.1). Their wipe, their mill, their
  discard all feed you. **Board wipes are upside for a descend deck**, which is a rare thing to be
  able to say. Ownership not control: your stolen creature card dying descends for *you*.
- **The count never decrements and the same card can descend twice** — 700.11's last sentence drops
  any requirement that the cards still be there, so escape / delve / reanimation are free.

**Counter-hate:** Rest in Peace and Leyline of the Void turn a descend deck **completely off** — CR
614.6, the cards are exiled instead, so the put never happens and you never descend. Cheap, common,
and total; name it as a risk on any descend build.
**Source:** chatterfang / upgrade-test (2026-09-28) — pilot asked why The Mycotyrant never surfaced,
and proposed a "kill 5 tokens, 5 Fungi come back, Chatterfang doubles it" refund loop that does not
exist.

### Generic "from outside the game" effects are blanks in Commander {#zone-027}

**Kind:** ruling · **Verified:** 2026-09-28 against CR 2026-08-07
**Cards:** Extrapolate the Impossible
**Rules:** 903.11
**Claim:** A wish that says only "from outside the game" brings nothing into a Commander game.
**Evidence:** CR 903.11: *"Except via rules, special actions, and effects that specifically bring
cards into Commander games from outside the game, traditional cards from outside the game cannot be
brought into a Commander game."* Extrapolate the Impossible (FRA) says only "from outside the game".
**Changes:** Classify generic wishes as NO in every deck, citing 903.11. Read the whole sentence: the
exception is for effects written *for* Commander.
**History:** On 2026-09-28 one review agent misread 903.11 as permitting Extrapolate the Impossible;
the parent corrected that file.
**See also:** zone-013
**Source:** lord-of-pain (right) vs chatterfang (misread) (2026-09-28), FRA review.
