# God tribal — commander build-off (2026-09-02)

Five 100-card lists, one question: **which commander makes the best God tribal deck at Bracket 3?**

## Method

The four five-colour decks share **one identical 69-card shell** — 38 lands, 12 ramp, 6 tribal
payoffs, 10 interaction, 3 draw — so the commander, its God selection (24–26) and a 4–6 card
commander package are the only things that vary. Kratos+Atreus is Jeskai and gets its own shell.
Everything below is measured from the lists (`bun run card --deck`, `deckcheck`, curve from the
card cache), not estimated.

## Measured

| Deck | Avg MV | Mana sources | Devotion-gated Gods | Game Changers (3/3) | Price |
|---|---:|---:|---:|---|---:|
| **Sisay** | **3.02** | 50 | 6 | Rhystic Study · Smothering Tithe · Cyclonic Rift | $835 |
| Jodah | 3.60 | 47 | 7 | Rhystic Study · Smothering Tithe · Cyclonic Rift | $822 |
| Esika | 3.73 | 48 | 5 | Rhystic Study · Smothering Tithe · Fierce Guardianship | $820 |
| Morophon | 3.74 \(printed\) | 44 | 6 | Rhystic Study · **Ancient Tomb · Mana Vault** | $973 |
| Kratos + Atreus | 3.34 | 48 | 6 | Rhystic Study · Cyclonic Rift · Fierce Guardianship | **$730** |

All five: 100 cards, legal, on colour identity, **3/3 Game Changers tailored per commander**, Bracket 3. Morophon's price includes ~$255 of Ancient Tomb + Mana Vault.

The curves came out the way the commanders demand, which is the first result: **the same "God
tribal" brief produces a 3.02 deck and a 3.70 deck depending on who's in the command zone.**

## The Roaming Throne question — it depends entirely on whether the commander is a God

Roaming Throne doubles *triggered* abilities of *other creatures of the named type*. Naming God:

| Commander | Is a God? | Has a trigger? | What Throne does |
|---|---|---|---|
| Kratos | **Yes** | Yes — experience on attack/death, end-step counters | **Doubles both.** 2 experience per attack. Best home by far. |
| Jodah | No (Human Wizard) | Yes — cast trigger | Nothing… **unless Tyrite Sanctum makes him a God** (`{2},{T}: target legendary creature becomes a God`). Then every legendary cast chains **two** free legends. Real line. |
| Sisay | No | No — activated tutor | Doubles other Gods' triggers only (Oketra tokens, Purphoros pings, Kefnet copies) |
| Esika | Yes | No trigger on front; back face is an enchantment | Doubles other Gods only |
| Morophon | Yes (changeling) | No | Doubles other Gods only |

## Per-deck verdict

### Sisay — most consistent, lowest curve
`{W}{U}{B}{R}{G}`: tutor any legendary permanent **onto the battlefield** with MV below her power;
she grows +1/+1 per colour among your other legends. The list runs cheap Gods across all five
colours so she is a 7/7 fetching MV ≤6 fast, and it is the only deck whose 5–6 slot is nearly
empty (6) — by design, everything is fetchable. Captain Sisay and Time of Need are backup tutors;
Godsend and Konda's Banner are the legendary Equipment she can go get.
**Cost:** the activation needs all five colours *every* time, and she is a 2/2 until the board
fills. **Salt 0.98.**

### Jodah — biggest payoff, biggest target
Legends get +X/+X for X legends; each legendary spell from hand chains a free cheaper legend. The
curve is deliberately the second-highest so chains connect (a 6-drop finds a ≤5, etc.). Day of
Destiny, Heroes' Podium and Arvad stack three more anthems on the same board.
**Costs:** `{W}{U}{B}{R}{G}` to cast the commander — five pips; the **7 devotion-gated Gods don't
count toward X or get pumped while they aren't creatures**; and **salt 1.94**, roughly twice
Sisay's. The Tyrite Sanctum → Roaming Throne line above is the deck's hidden upside.

### Esika — the cheat engine, highest curve
Front: every legend taps for any colour. Back (The Prismatic Bridge, `{W}{U}{B}{R}{G}`): cheat a
creature onto the battlefield every upkeep. The God selection is bombs the Bridge ignores the cost
of — **Zodiark** (`{B}{B}{B}{B}{B}`, one-sided wrath of non-Gods), **The Capitoline Triad** (10),
Myrkul, Asmodeus. Thran Temporal Gateway cheats from hand too.
**Costs:** the Bridge is an enchantment with no body and needs WUBRG; the front face is a 1/4.
**Flag:** the front face is exactly the "tap your legends for mana to cheat things out" pattern the
user rejected earlier in this project. Salt 1.15.

### Morophon — the colour-fixer (corrected 2026-09-02)
`{7}` 6/6; name God → every God loses **one pip of each colour**. Measured over all 95: **61
become fully generic** — Heliod `{3}{W}` → `{3}` casts off three Islands, Tiamat → `{2}`, Tom
Bombadil → `{0}`. The 34 that keep a pip are the double-pip cards (Oketra → `{3}{W}`, Zodiark →
`{B}{B}{B}{B}`). So Morophon is not a discount, he is a **colour-fixer that deletes the five-colour
manabase problem** — the single biggest weakness of every other 5C variant.

The first draft of this list was wrong: it chased multicolour Theros gods "for the bigger
discount" and ended up with 11 devotion-gated enchantments. The discount is identical for every
single-pip God, so the rebuilt list takes the **best real creatures among the 61** (The Scarab
God, The Locust God, Myrkul, Havi, Bane, Bhaal, Anzrag, Tiamat as a `{2}` 7/7 flier, Tom
Bombadil as a free 4/4) plus the one-pip God-Eternals and four indestructible statics.

The printed avg MV of 3.74 is misleading — **after Morophon resolves, most of those cost 2–4.**
Everything hinges on the 7-drop landing and staying, hence Ancient Tomb + Mana Vault as his Game
Changers, Skyshroud Claim / Kodama's Reach, and Swiftfoot Boots + Tyrite Sanctum's indestructible
counter. **Salt 0.67.** Most expensive list ($973) because of the two GCs.

### Kratos + Atreus — the only *actual* God tribal
Kratos: experience whenever Gods attack or die (counters are permanent). Atreus: `{3},{T}`: draw
that many, 2 damage to each opponent. God-Eternals and the Ojer cycle die and return for repeat
experience; **Roaming Throne doubles the commander**; Thor, Asgard's Avenger makes every Atreus
activation 3 to each opponent; the untap package fires Atreus several times a round; Minamo
untaps any legend.
**Costs:** Jeskai means no green ramp, Atreus is mana-hungry, and both commanders are Secret Lair
cards ($10 + $5.70) so availability may matter more than price. **Salt 0.00.** Cheapest list.

## Where the work lands

- **Best deck, on measurement:** Sisay — lowest curve, most sources (50), tutors the whole
  pantheon, half Jodah's salt.
- **Highest ceiling:** Jodah — but it is a five-pip commander with a 1.94 salt score.
- **Most fun and most *God*:** Kratos + Atreus — the only build whose commanders name the tribe,
  and the only one that turns Roaming Throne into a commander upgrade.
- **Re-rated up:** Morophon — he is the only 5C commander that fixes the 5C mana. Now a genuine
  contender; his risk is concentration (one 7-drop) rather than power. Between Sisay and Morophon
  is the real 5C decision.

Nothing here has been played. Every claim above is a list property, not a table result.

## Game Changers — why 3/3, and why tailored

The first pass held every list to one GC "to keep the comparison clean." That was the wrong
trade: Bracket 3 is a budget of three, and leaving two unspent under-powers every deck equally.
Tailoring them to the commander is *more* informative for a build-off, not less:

- **WUBRG-activation decks (Sisay, Jodah, Esika):** Smothering Tithe, because the commander's
  ability or cast costs all five colours every time. Rift closes for Sisay/Jodah; Guardianship
  protects the Bridge (an enchantment) for Esika.
- **Morophon:** Ancient Tomb + Mana Vault — reaching 7 *is* the deck, and both make generic mana,
  which is all he needs.
- **Kratos + Atreus:** Cyclonic Rift + Fierce Guardianship — free counter for the engine, Rift to
  close. Field of the Dead was considered for the 5C decks and rejected on the user's call: it is
  not what these decks are trying to do.
