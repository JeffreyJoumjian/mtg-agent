# Ledger: Tooling and process

The repo's own scripts, validators and caches, Scryfall and EDHREC data quirks, set sweeps, and process failures such as file drift. Some entries describe tooling that has since changed (e.g. DECK.md/STATUS.md no longer exist). Entry format and capture rules: `../SKILL.md` §4.
Search every topic at once with `bun run lookup "<card | rule number | term>"`.

---

### Assumed a file format instead of checking it {#tool-001}

**Kind:** correction · **Recorded:** 2026-08-03
**Claim:** `scripts/deck-pdf.ts` was written against an assumed decklist format instead of the
existing parser, matched zero cards and produced a blank first page.
**Evidence:** `scripts/deck-pdf.ts` parsed decklists with `/^\d+ /` (digit, space) while the
repo convention is `1x Card Name`. It matched zero cards and produced a blank first page.
Root cause: assumed the format rather than reading `decks/README.md` or `lib/decklist.ts`.
**Changes:** Read the existing parser before writing a second one. The regex is now a shared named
constant with a comment tying it to `lib/decklist.ts`.
**Source:** `scripts/deck-pdf.ts` PDF generation (2026-08-03); no deck recorded.

### Wrote a destructive glob without a guard {#tool-002}

**Kind:** correction · **Recorded:** 2026-08-03
**Claim:** An unguarded `rm -f "$SP"/*.png` deleted nothing unexpected, but the pattern is unsafe
if the variable is ever unset.
**Evidence:** Ran `rm -f "$SP"/*.png`. It was verified afterwards to have deleted nothing
unexpected, and the command was unnecessary anyway (`qlmanage` overwrites), but the pattern is
unsafe if the variable is ever unset. Root cause: convenience cleanup with no guard.
**Changes:** `${VAR:?}` on any interpolated path in a destructive command, and prefer writing to a
fresh subdirectory over deleting.
**Source:** a cleanup command in a tooling session (2026-08-03); no deck recorded.

### Broke a template literal with backticks inside a CSS comment {#tool-003}

**Kind:** correction · **Recorded:** 2026-08-03
**Claim:** Backticks around a CSS selector, inside a comment that was itself inside a JS template
literal, terminated the literal and broke PDF generation for both decks.
**Evidence:** Put backticks around a CSS selector inside a comment that was itself inside a
JS template literal, terminating the literal and breaking PDF generation for both decks.
Root cause: Markdown habits inside a code string.
**Changes:** No backticks inside template literals. Regenerate **both** decks' PDFs after touching
shared tooling — the Edgar regression is what caught it.
**Source:** shared PDF tooling (2026-08-03); caught by the edgar-markov PDF regression.

### Never hand-maintain a derived list or a second copy — generate it and diff by script {#tool-004}

**Kind:** correction · **Recorded:** 2026-08-04
**Cards:** Fiery Emancipation; Hit the Mother Lode
**Claim:** Any fact computable from another file drifts when it is maintained by hand — the bracket
swap list drifted three times, and one sideboard in three files held three different counts. Keep
one source of truth, generate every other copy (including `STATUS.md` from `DECK.md`), and diff by
script.
**Evidence:**
- **Swap list (2026-08-04):** The Bracket 3 → Bracket 4 swap list was hand-edited and fell out of
  sync with the two decklists on three separate occasions. Root cause: maintaining by hand a fact
  that is computable from two files.
- **Sideboard (2026-08-06):** The sideboard lived in `DECK.md`, `SIDEBOARD.md` and `pdf.json`,
  claiming 20, 20 and 24 while actually holding 22, 26 and 24. The `DECK.md` copy still listed Fiery
  Emancipation and Hit the Mother Lode as sideboard cards two days after both were moved into the
  100. Root cause: duplication with no generation step.
- **STATUS.md (2026-09-22):** `DECK.md` and `STATUS.md` must hold the same 100 card names;
  decks/README.md requires them to agree card-for-card, and SKILL §1.4 records three separate drifts
  (bracket swap list ×3, sideboard across three files). On the 2026-09-22 founding of
  `decks/chatterfang/` and `decks/teysa-karlov/` the STATUS files were generated with a five-line awk
  script that copies each `N Card Name` line and appends ` — PROXY`, then verified with
  `diff <(grep -E '^[0-9]+ ' DECK.md) <(grep -E '^[0-9]+ ' STATUS.md | sed 's/ — .*$//')` — zero diff
  on both decks at first run.
**Changes:** Diff the two files by script every time. Never write a derived list by hand. One source
of truth, everything else a pointer. When a count appears in a header, verify it against the
contents programmatically — header counts drift silently.
- Hand-maintaining `STATUS.md` is the same mistake as hand-maintaining the swap list, the sideboard
  and MOXFIELD.txt. Generate the names from `DECK.md` and hand-edit only the status column: on any
  new deck, generate STATUS.md rather than typing it, and run that diff as part of the §1.5
  validation block alongside `bun run card --deck` and `bun run deck:moxfield`. The status words are
  the only hand-maintained part, so a later `OWNED` edit survives regeneration only if the script is
  re-run carefully — prefer editing the status word in place once the file exists.
**See also:** tool-012, build-021
**Source:** bracket swap list (2026-08-04), no deck recorded; sideboard files (2026-08-06, merged
from "The same content in three files produced three different counts"), no deck recorded;
chatterfang / teysa-karlov founding build (2026-09-22, merged from "Generate STATUS.md from DECK.md —
the authoritative pair is exactly the §1.4 drift trap").

### Trusted a stale cached field instead of the authoritative list {#tool-005}

**Kind:** correction · **Recorded:** 2026-08-07
**Cards:** Ancient Tomb
**Claim:** A Game Changer count derived from a per-card `game_changer` boolean in a
partially-populated local cache reported 2 when the deck runs 3.
**Evidence:** Reported that the base deck ran 2 Game Changers. It runs 3 — Ancient Tomb was
missed because the per-card `game_changer` boolean was read from a partially-populated local cache
written during a failed fetch. The number mattered: 3 is exactly the bracket 3 cap, so the deck had
**zero** headroom for another Game Changer, not one slot. Root cause: derived a count from a cached
per-object flag rather than from the authoritative set. The first bulk fetch had 400'd on a missing
`Accept` header and written a partial file.
**Changes:** For any list-membership question (Game Changers, banned lists, format legality), fetch
the **list** once and test membership by name — don't read a per-card boolean out of a cache that
may have been written by a partial run. Assert the fetch count matches the request count before
using the result.
**See also:** build-017, build-025
**Source:** iron-man (2026-08-07).

### An oracle-text sweep missed a card because only two trigger wordings were searched {#tool-006}

**Kind:** correction · **Recorded:** 2026-08-07
**Cards:** Iron Man, Tony Stark
**Claim:** Treating one phrasing of a mechanic as the mechanic made a "token maker" sweep miss the
best card in the pool.
**Evidence:** A "token maker" sweep searched `o:"whenever you cast a noncreature spell"` and
`o:"whenever you cast an instant or sorcery spell"` and concluded the pool was four weak cards. It
missed **Iron Man, Tony Stark** — *"whenever you cast a **red spell**"* — which turned out to be the
best of them. Root cause: treating one phrasing of a mechanic as the mechanic.
**Changes:** Vary the trigger wording across at least the common forms (`noncreature spell` ·
`instant or sorcery` · `<colour> spell` · `spell`) and say which forms were run, so the gap is
visible in the writeup rather than invisible in the result.
**See also:** tool-007, tool-015
**Source:** a "token maker" oracle-text sweep (2026-08-07); no deck recorded.

### Sweep a new set by indexing once, filtering by identity, classifying 100% — and prove the coverage by script {#tool-007}

**Kind:** pattern · **Recorded:** 2026-08-09
**Cards:** Wizard's Staff; Glamdring; Windcrag Siege; Kher Keep
**Claim:** The tractable way to honour "go through every card" for a new set: fetch the whole set
into one verified index, filter per deck by colour identity (discarding by rule, not judgment),
then classify every remaining card MAIN/SIDE/NO with a one-line reason — no sampling, no keyword
pre-screens. When the sweep is split across parallel agents (one per deck), no agent may run a CLI
that writes a shared cache, and "every card classified" must be proven by script, not asserted.
**Evidence:** First run on HOB: 193 unique cards → 116 (Mardu) / 74 (Izzet) / 44 (mono-R) pools,
100% of each pool classified, surfacing 5 MAIN + 11 SIDE candidates. The two strongest finds
(Wizard's Staff, Glamdring) match no tribal or keyword screen — they surfaced only because every
card was read, the same gap as the "oracle-text sweep missed a card" correction.
- **Parallel sweep (2026-09-28):** `data/card-cache.json` is read-modify-written non-atomically
  (`scripts/lib/card-cache.ts` `save()` is a plain `writeFile`, and `load()` returns `{}` on a parse
  failure). Nine concurrent `bun run card` calls can tear the file, and a torn read followed by a
  save would wipe the cache. The FRA sweep (11 decks, 1,440 card-deck pairs) avoided it by warming
  the cache first (`bun run card --deck` per list), handing every agent pre-built read-only files
  (pool with NEW/REPRINT flags, the deck's oracle dump, `deck:show` snapshots) plus a read-only
  lookup helper, then checking each review file's table against the pool's name list by script:
  100% on all 11.
**Changes:** `bun run set-scan <code>` is the tool (scripts/set-scan.ts — update its DECKS map when
a deck is added); review files follow decks/<slug>/research/<code>-set-review-<date>.md.
- **Before fanning out (2026-09-28):** warm the caches, ban `bun run card/edhrec/deck:*` inside the
  agents, and plan the coverage check up front. Also flag reprints: FRC was 69 of 87 reprints, and
  three decks got a MAIN from a reprint they had never evaluated (Windcrag Siege twice, Kher Keep).
**See also:** tool-006, tool-017
**Source:** all three decks (2026-08-09), HOB set review; all decks (2026-09-28, merged from
"REFINEMENT: a parallel set sweep needs a pre-warmed cache, read-only lookups and a coverage
script"), FRA/FRC set review.

### deckcheck silently under-counts mana sources when the deck's card cache is cold {#tool-008}

**Kind:** correction · **Recorded:** 2026-08-23
**Claim:** `bun run deckcheck` reads land/rock data from `decks/<slug>/research/cards.txt` and
counts only cards already cached; a cache miss falls through as "not a source", and the output
gives no warning of how many cards were skipped.
**Evidence:**
- **lord-of-pain (2026-08-23):** on a fresh deck folder it reported "lands 25 + rocks 5 = 30 ⚠️
  low" for a list with 35 lands and printed no hint that ten lands were simply uncached. Same list,
  after `bun run carddata --file decks/<slug>/DECK.md`: "lands 35 + rocks 5 = 40". The script header
  says uncached cards "simply don't count", but the output doesn't flag how many were skipped.
- **cap-living-legend (2026-09-15):** a scratch list with three new lands reported "lands 32 + rocks
  6 = 38 ⚠️ low (<40)". The real count was 35 + 6 = 41. None of the three lands were in
  `decks/cap-living-legend/research/cards.txt`. Observed, not traced: the count read 32 before
  `carddata` cached those cards and 35 after, with no warning either time.
**Changes:** Always run `carddata --file DECK.md` before `deckcheck` on a new or heavily edited
list, and treat a low-sources warning on a fresh folder as "cache cold" first. (Tooling fix worth
making: print the uncached count next to the total.) Run `bun run carddata --deck <slug>` (stdin
works for scratch lists) before `deckcheck` whenever a list has new cards, and treat a source count
that drops after a like-for-like land swap as a cache miss until proven otherwise.
**See also:** tool-009, tool-012
**Source:** lord-of-pain (2026-08-23), first validation pass; cap-living-legend (2026-09-15, merged
from "deckcheck silently under-counts mana sources for cards missing from the deck's card cache").

### The deck validator silently skipped every double-faced card — three cards never checked {#tool-009}

**Kind:** correction · **Recorded:** 2026-09-08
**Cards:** Shatterskull Smashing; Valakut Awakening; Urabrask
**Claim:** `bun run card --deck` looked double-faced cards up by their front-face name against an
index keyed by full name, missed, and silently skipped them — no price, legality or colour-identity
check — while still counting them as found.
**Evidence:** `bun run card --deck` — the command deck-brain §1.5 makes the validation gate
for every list edit — indexed Scryfall results by their full name and looked them up by the
decklist's name. Scryfall keys a double-faced card as `"Front // Back"`; a decklist line carries
only the front face. The lookup missed and the loop did `if (!c) continue;`, so the card got **no
price, no commander-legality check and no colour-identity check**, while the header still counted
it in "79 unique found". In scarlet-witch that was Shatterskull Smashing, Valakut Awakening and
**Urabrask** — three cards validated dozens of times over six weeks and never actually checked.
Root cause: a silent-skip branch on a lookup miss, in a tool whose entire job is to report
problems. The header's "79 unique found" made the omission look like success. `deck-pdf.ts` and
`edhrec.ts` already had a `frontFace()` helper for exactly this; `card.ts` never adopted it.
**Changes:** A validator may never `continue` past a record it cannot resolve — count it and print
it. When a tool reports a total, cross-check the printed row count against the input count before
trusting a clean run; `79 lines` next to 76 printed rows was visible the whole time. Fixed with an
`indexByDeckName` helper in `scripts/lib/decklist.ts` (front face *and* full name, full names
first so a real card is never shadowed by an alias) plus three regression tests.
**See also:** tool-008
**Source:** scarlet-witch (2026-09-08) — found while validating the V2 promotion.

### A card's source is not evidence of commander legality — read the `commander:` field on every card {#tool-010}

**Kind:** pattern · **Recorded:** 2026-09-09
**Cards:** Captain America, Living Legend; U.S.S. Enterprise-D, Galaxy-Class; Candela, Aegis of Adagia; Stoic Star-Captain; Squadron Carrier; Meatsqueak, Hoard Lord
**Claim:** A card appearing on an EDHREC commander page — including its New Cards section — is not
evidence that the card is legal in Commander, and cards from Un-set, playtest and Mystery Booster
products look like normal cards in search results and on Scryfall pages. `bun run card` reports
`commander: not_legal`, and it must be read, not skipped.
**Evidence:** The Captain America, Living Legend page listed U.S.S. Enterprise-D, Galaxy-Class in
New Cards; `bun run card` returns `commander: not_legal`. Same for Candela, Aegis of Adagia, Stoic
Star-Captain and Squadron Carrier, which surfaced in a Scryfall Station search from the `yeoe`
digital set. Meatsqueak, Hoard Lord (set `mbc`) — *"Whenever another creature dies, create a Food
token… For every seven Foods you control, Squirrels you control get +3/+3"* — reads as a playable
Squirrel payoff and is **not commander legal**. The pilot found it on Scryfall and proposed it.
**Changes:** Run every EDHREC-sourced card through `bun run card` before it reaches a list, and
check the `commander:` field, not just colour identity. This is deck-brain §2.2's "EDHREC is a lens,
never source of truth" with a concrete failure mode attached. Check commander legality on Un-set /
playtest / Mystery Booster cards before proposing them: the legality field on every `bun run card`
call is load-bearing, not decoration. Say "not commander legal" explicitly when passing on such a
card, so the pilot knows it is a format problem rather than an evaluation.
**See also:** tool-016
**Source:** cap-living-legend (2026-09-09); chatterfang (2026-09-23, merged from "Check commander
legality on Un-set / playtest / Mystery Booster cards before proposing them") — pilot's Squirrel
shortlist.

### Named variant lists by build order — a play report got filed against the wrong list {#tool-011}

**Kind:** correction · **Recorded:** 2026-09-17
**Cards:** Persistent Petitioners
**Claim:** Variant lists named after the order they were built, not what distinguishes them, led to
a pilot's play report being recorded against the wrong list.
**Evidence:** In one folder I named the first Petitioners build `DECK-PETITIONERS.md` (8 copies inside
an Advisor toolbox) and the later "as many Petitioners as possible" build `DECK-MILL.md` (33 copies).
When the pilot said *"I love playing the petitioners deck"*, I recorded it against the 8-copy list and
wrote a comparison telling them the 8-copy list was the one they enjoy. They had been playing the
33-copy list, and asked *"how come the mill deck is actually the one with the petitioners and not the
one called petitioners?"* Cause: the file names described the order the lists were made, not what
distinguishes them — and the pilot naturally refers to a list by what's in it. I then matched their
informal name to a file name without checking which import file they had actually used.
**Changes:** Name a variant list after the thing that sets it apart from its siblings (the win
condition, the engine, the copy count), never after its build order or a theme every sibling shares.
When a pilot reports on a list by an informal name and more than one list could fit, **confirm which
file they played before recording the report** — ask for the import file or a distinguishing card
count.
**Source:** cap-living-legend (2026-09-17) — `DECK-MILL.md` ⇄ `DECK-PETITIONERS.md` rename.

### Cost reducers are not mana sources — count what TAPS, and let deckcheck do it {#tool-012}

**Kind:** pattern · **Recorded:** 2026-09-22
**Cards:** Helm of Awakening; Semblance Anvil; Cloud Key; Mana Flare; Jet Medallion; Ruby Medallion; Rakdos, Lord of Riots
**Claim:** A "Ramp & cost reduction" section header is not a mana-source count. Medallions,
Helm of Awakening, Semblance Anvil and Cloud Key reduce costs and tap for nothing; folding them
into the source count inflates the figure and hides a real shortage.
**Evidence:** lord-of-pain `research/decisions.md` recorded *"43 mana sources (35 lands + 7 rocks +
Mana Flare)"* against a 9-card ramp section. `bun run deckcheck --file decks/lord-of-pain/DECK.md`
reports **"Mana sources: lands 35 + rocks 5 = 40"** — Jet Medallion and Ruby Medallion are
reducers, Rakdos, Lord of Riots is a reducer, and Mana Flare is symmetric (it gives three opponents
what it gives you). The three-card gap was the whole of the deck's fast-mana problem.
**Changes:** Never derive a mana-source count by reading a section header or summing a role row.
Run `bun run deckcheck --file <list>` and quote its figure; if a card doesn't tap for mana, it
belongs in a reducer count, stated separately. Same §1.4 trap as the swap list and the sideboard —
a hand-maintained number drifts from the list it describes.
**See also:** tool-004, tool-008
**Source:** lord-of-pain (2026-09-22) — re-deriving the ramp count during the fast-mana pass.

### Read a deck-checker's SUB-SCORES, never the headline number alone {#tool-013}

**Kind:** pattern · **Recorded:** 2026-09-25
**Claim:** A single composite figure ("predicted win turn") can move against you while the deck
improves on most of the things that figure is supposedly built from. Run the A/B yourself and read
the components.
**Evidence:** CommanderBracket, chatterfang vs upgrade-test, same session, same commander. Headline
went **6.6 → 7.5** (worse), while deck health went 66 → 69, **mana 74 → 84**, ramp-by-turn-3
55% → 59%, two-ramp-by-turn-3 15% → 19%, interaction flat at 72, and both decks stayed inside
Bracket 3's 6–8 band. The one sub-score that did **not** improve was **engine, 51 → 50** — which was
the package's entire thesis, and the finding worth acting on.
**Changes:** When a tool disagrees with a build, reproduce the reading on both lists and compare the
components before either defending the build or reverting it. Report the sub-scores to the pilot;
the headline is the least informative number on the page.
**See also:** tool-014, build-042
**Source:** chatterfang / upgrade-test (2026-09-25) — pilot pushed back twice with the same tool.

### Deck checkers count dead tutors and auto-detected combos — audit both before trusting a comparison {#tool-014}

**Kind:** pattern · **Recorded:** 2026-09-25
**Cards:** From Beyond; Ninja Pizza; Camellia, the Seedmiser; Peregrin Took; Concordant Crossroads; The Unbeatable Squirrel Girl; Cryptolith Rite
**Claim:** Two artifacts of automated deck analysis can swing a head-to-head: a tutor is counted
even when it can find nothing in that deck, and combos are detected that the builder never intended
or proposed.
**Evidence:** CommanderBracket scored chatterfang with **1 tutor** — From Beyond's "search your
library for an Eldrazi card", in a deck with zero Eldrazi, a mode already identified as dead when the
card was cut. It scored upgrade-test with **7 combos vs 5**, the two new ones being Ninja Pizza with
Camellia + Peregrin Took, and Concordant Crossroads with The Unbeatable Squirrel Girl + Cryptolith
Rite. Neither was proposed as a combo; both were added for other reasons, and together they raised
the deck's archenemy rating from Casual to Contender.
**Changes:** After any package goes in, re-run a combo detector and **report newly created combos to
the pilot** — a card added for value can silently change the deck's bracket conversation. And when a
checker credits a tutor, check what it can actually find in *this* list before treating it as speed.
**See also:** tool-013, loop-011
**Source:** chatterfang / upgrade-test (2026-09-25).

### A pilot-supplied pool plus the commander's EDHREC page is NOT a format sweep {#tool-015}

**Kind:** pattern · **Recorded:** 2026-09-28
**Cards:** The Mycotyrant; Mycoloth
**Claim:** Working from (a) a card list the pilot pasted and (b) the commander's EDHREC page leaves a
real hole: any card that is mechanically legal and on-theme but **keyed to a mechanic the deck does
zero of** will appear in neither source, and so never gets evaluated *or* rejected. It goes
unexamined, which is worse than being rejected, because there is no record to re-derive.
**Evidence:** The Mycotyrant ({1}{B}{G}, BG, MV3, creates creature tokens) appeared **nowhere** in
the repo — not in the pool, not in a search result, not in the ledger. But it **is** returned by the
plain sweep `id<=bg type:creature cmc<=3 o:"create" o:"creature token" legal:commander`, which a
thorough BG token-maker pass would have run. EDHREC's Chatterfang page lists it **0 times** (it is in
1% of all decks), so the §2.2 second instrument could not catch it either. Contrast Mycoloth, which
*was* caught, argued, added in wave 2 and reverted in wave 4 on stated grounds — that is the system
working. The difference was that Mycoloth is keyed to sacrifice, which this deck does.
**Changes:** On any upgrade pass, run the **mechanical sweep from the deck's own functional roles
independently of the pilot's pool** — one `bun run scripts/card.ts search` per role, in colour
identity and under the curve cap — and reconcile it against the pool before writing the proposal.
The pool tells you what the pilot is *thinking about*; it does not define the search space. Then log
the notable rejections in `passed` (§3.1) so the next pass re-derives grounds instead of rediscovering
the card. Absence from a commander's EDHREC page is **not** evidence against a card (§2.2 already
says popularity is not a verdict — the converse holds too).
**See also:** tool-006, build-016, build-023
**Source:** chatterfang (2026-09-28) — pilot asked "why did The Mycotyrant never show up in any of
your research".

### Pre-release Scryfall legality is "not_legal" — never file a pass on it {#tool-016}

**Kind:** pattern · **Recorded:** 2026-09-28
**Cards:** Gardenize
**Claim:** Scryfall reports unreleased cards as not commander-legal, so a "not legal" rejection filed
before release is a data-timing artefact, not an evaluation.
**Evidence:** Gardenize (FRA, releases 2026-10-02) was passed in chatterfang's proposal.json and
upgrade-test/decisions.md on 2026-09-25 as *"not commander-legal — the tool reports not_legal"*. On
2026-09-28 the set index reports it legal, and it came back as a MAIN for chatterfang on its merits.
**Changes:** When a card fails on legality, check its set's release date. If it is unreleased,
record it as "unreleased, re-check on <date>", never as a pass.
**See also:** tool-010, build-044
**Source:** chatterfang (2026-09-28), FRA review. Both records corrected 2026-09-28.

### Check new-set cards against the decision log by oracle text, not by name {#tool-017}

**Kind:** pattern · **Recorded:** 2026-09-28
**Cards:** Artifist Acumen; Warlord's Fury
**Claim:** A new card can be a word-for-word functional reprint of a card the deck already cut.
**Evidence:** Artifist Acumen (FRA, {R} sorcery, *"Creatures you control gain first strike until end
of turn. Draw a card."*) has the same text as Warlord's Fury, cut from vision-scarlet-witch on
2026-09-04.
**Changes:** In a set sweep, grep each candidate's rules text, not only its name, against the deck's
decisions and sideboard records, then re-derive from the recorded grounds (§1.1b).
**See also:** tool-007
**Source:** vision-scarlet-witch (2026-09-28), FRA review.
