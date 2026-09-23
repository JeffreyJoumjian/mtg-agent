# God Tribal — Decision Log

Append-only. Record **grounds, not verdicts** (deck-brain §1.1b).

---

## 2026-09-02 — Build-off founded: five variants, one shell

**Brief:** build one God tribal deck per commander — Sisay, Jodah, Esika, Morophon, Kratos+Atreus —
to see which works best; "keep in mind Roaming Throne." Bracket 3.

### Method: hold the shell constant
The four 5C decks share an identical 69-card shell so the commander is the only variable. This
was a deliberate experimental-design choice, not laziness: a build-off where each deck also has a
different manabase and interaction suite would be measuring five things at once. Kratos+Atreus is
Jeskai and cannot share it.

### Pool measured, not assumed
`t:god legal:commander` → **95 Gods**; 25 are Theros-style enchantment creatures (devotion-gated),
70 are plain creatures. Jeskai identity: 51. The whole pool is cached at `research/cards.txt`
and tabulated at `research/gods-table.tsv`.

### Shell choices with grounds
- **38 lands / 12 ramp** for five colours; 10 triomes + Command Tower/Path of Ancestry/Cavern of
  Souls/Plaza of Heroes/Secluded Courtyard/Unclaimed Territory (all name a type or legend) +
  Exotic Orchard/Reflecting Pool/Mana Confluence/City of Brass/Cascading Cataracts.
- **Tribal payoffs:** Herald's Horn, Vanquisher's Banner, Urza's Incubator, Icon of Ancestry,
  Kindred Discovery, Roaming Throne. **Coat of Arms rejected** — symmetric; it pumps every
  opposing tribal deck at the table (§1.3).
- **Game Changers:** Rhystic Study only (1/3). **Tergrid, God of Fright is a God and a Game
  Changer** — excluded from every list so the GC budget stays open.
- **Draw:** Guardian Project counts every legend (no two share a name); Reki draws on legendary
  casts.

### Verified text that changed a list
- **Morophon's discount reduces only coloured mana** — *"This effect reduces only the amount of
  colored mana you pay."* Mono-colour Gods save 1; that is why the Morophon list is
  multicolour-heavy, and why it ends up with 11 devotion-gated Gods.
- **Roaming Throne doubles triggered abilities of another creature of the named type.** Kratos is
  a God with two triggers → doubled. Jodah/Sisay are not Gods → Tyrite Sanctum (`becomes a God`,
  no duration = permanent) is the enabler; Jodah's cast trigger then chains two free legends.
- **Tyrite Sanctum** is in every list for that reason.
- **Zodiark** is in the Esika list *because* the Bridge cheats it — `{B}{B}{B}{B}{B}` is
  uncastable in 5C but free off the top.
- **Sif's Spearmaster** is a non-legendary God (`Creature — God Warrior Hero`) — legal filler for
  Kratos and a `{T}` damage outlet.

### Cards rejected
| Card | Grounds |
|---|---|
| Coat of Arms | symmetric pump |
| Tergrid, God of Fright | Game Changer |
| Tiamat, Tom Bombadil | 5C Gods whose payoffs (Dragons, Sagas) are off-theme |
| Mox Amber | $86 for a rock that needs a legend out; Plaza of Heroes covers the job |
| Svyelun of Sea and Sky | Merfolk-gated |
| Jegantha as companion | companion rule forbids duplicate pips; the pantheon is full of `{W}{W}`s |

### Open
No `DECK.md`/`STATUS.md` pair — see `README.md`. Pick a winner, then promote it.

---

## 2026-09-02 — Corrections: Morophon rebuilt; every list to 3/3 Game Changers

### Morophon — I scored a colour-fixer as a discount (user's correction)
*"The whole point is to convert colored gods to generic gods so you can use any mana."* Correct.
Measured: naming God, **61 of 95 Gods lose every coloured pip** (38 of them real creatures); 34
keep one (double-pip cards). The value is that the coloured *requirement* disappears — the one
thing every other 5C variant struggles with — not the one mana saved. The first list was built
backwards (multicolour Theros gods "for the bigger discount", 11 devotion-gated). Rebuilt on the
generic-creature pool; the two GCs are ramp-to-7 (Ancient Tomb, Mana Vault); Swiftfoot Boots added
because the whole deck is one 7-drop resolving. Ledger entry added under Corrections; the earlier
pattern entry's *Changes* line marked superseded.

### Game Changers 1 → 3 per deck (user's question: "why only 1?")
No good reason. Held to one to keep variants comparable; that under-powers all five identically
and hides what each commander wants. Now tailored — see comparison.md. **Field of the Dead
rejected** on the user's call in favour of Rift / Fierce Guardianship. Shell interaction dropped
Beast Within + Generous Gift (overlapping catch-all removal) so the shared shell stays identical
(67) and every 5C package gained the two slots.

### Measured after
Curves 3.02 / 3.60 / 3.73 / 3.74 / 3.34; sources 50 / 47 / 48 / 44 / 48; all 3/3 GC; prices
$835 / $822 / $820 / $973 / $730. Morophon's printed curve overstates his real curve — post-resolve
most Gods cost 2–4.
