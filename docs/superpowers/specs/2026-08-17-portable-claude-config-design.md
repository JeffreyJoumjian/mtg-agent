# Portable Claude setup — mtg-agent on any machine

**Date:** 2026-08-17
**Status:** implemented — see "As built" at the end for where reality differed from this design.

## Goal

Sit down at a fresh **Windows** machine, install the Claude Desktop app, and have the whole
MTG setup work — every skill, every agent, every script — using Claude Code sessions inside
the desktop app.

## Non-goals

- **Plain chat.** Regular `claude.ai` / Claude Desktop *chat* (as opposed to Claude Code
  sessions inside it) is explicitly out of scope. It has no shell, so `bun run card` cannot
  run, and `deck-brain` without verified card data violates the "never guess card text or
  prices" rule in `CLAUDE.md`.
- **Publishing skills as a plugin.** A `.claude-plugin/marketplace.json` would make the MTG
  skills available in *other* projects. Deferred: `deck-brain` is inert without the `decks/`
  data, so the repo gets cloned regardless.
- **Porting `cc-cost.py` / `cc-time.py`.** These back the global `/costly` and `/timely`
  commands, parse Claude Code session logs, and have nothing to do with Magic. They stay on
  Python; Windows users install Python only if they want those two commands.
- **Restructuring `apps/collection-visualizer`.** Untouched by this work.

## Current state

Established by inspection on 2026-08-17.

**Already portable.** `mtg-agent` is on GitHub at `git@github.com:JeffreyJoumjian/mtg-agent.git`
with `main` in sync (0 ahead, 0 behind). Tracked content is **22 MB** — the 657 MB on disk is
`apps/collection-visualizer/node_modules` (558 MB) plus the gitignored `data/` cache. Crucially,
`.claude/skills/{deck-brain,deck-finalizer,mtg-rules-update}` and
`.claude/agents/mtg-rules-expert.md` are committed, so a clone carries them automatically. Bun
runs natively on Windows, and `card.ts` / `build-rules.ts` / `fetch-rules.ts` use only `node:fs`
and `fetch`.

**Not portable.** Seven concrete problems:

1. **37 uncommitted files** — all of `decks/iron-man/`, `deck-brain/LEDGER.md` edits, two
   `hob-set-review-2026-08-09.md` files, `scripts/set-scan.ts`. A clone today gets stale state.
2. **`~/.claude/` is not a git repo.** The global `CLAUDE.MD`, `rules/{react,testing,typescript}.md`,
   `agents/{code-explorer,code-impact}.md`, three global skills, `commands/{costly,timely}.md`,
   `hooks/notify.sh`, `scripts/{cc-cost,cc-time}.py`, `statusline.sh`, and `settings.json` exist
   on exactly one machine.
3. **`scripts/deck-pdf.ts`** — `CHROME_CANDIDATES` probes only macOS `.app` bundles and
   `/usr/bin/*`. No Windows path, so `bun run deck:pdf` throws.
4. **`scripts/deck-live.ts:64`** — `Bun.spawnSync(["open", url])`; `open` is macOS-only.
5. **`.claude/settings.json`** — the `SessionEnd` hook calls `pkill`, which does not exist on
   Windows.
6. **`deck-finalizer` depends on Python** *and* references the wrong paths. `SKILL.md` says
   `scripts/carddata.py`, but the files live at `.claude/skills/deck-finalizer/scripts/`. There
   are no `.py` files under `scripts/`. **This is broken on macOS today, not just on Windows.**
7. **No `.gitattributes`** — on Windows, Git's default CRLF conversion can churn every deck file
   and corrupt the rules `.txt` fixtures the parser tests read.

**Two useful findings.** The global `settings.json` contains **no secrets**, and its
`enabledPlugins` block lists all 18 marketplace plugins — restoring that one file makes them
reinstall. And the curated global config totals only **~230 KB**.

## Architecture

Two repos, one installer, nothing symlinked.

```
github.com/JeffreyJoumjian/mtg-agent       (exists)      decks, rules, scripts, project skills
github.com/JeffreyJoumjian/claude-config   (new, private) curated ~/.claude + installers
```

`~/.claude` remains an ordinary directory. The installer **copies** files into it. Copying
rather than symlinking is the decision that makes this work on Windows, where symlink creation
requires Developer Mode or an elevated shell.

### Why two repos, not one

The global config holds React/TypeScript/testing rules and general-purpose agents that have
nothing to do with Magic. Folding them into `mtg-agent` would couple unrelated concerns and make
the MTG repo the odd prerequisite for every other project on the machine.

### Why not `git init` inside `~/.claude`

Rejected. That directory holds `history.jsonl` (2.4 MB of conversation history), `sessions/`,
`projects/`, `daemon.log`, `file-history/`, and 42 MB of plugin caches. Versioning it in place
needs a `*`-then-whitelist `.gitignore` where a single mistake publishes conversation history,
and `git clone` refuses a non-empty target, forcing an init-and-fetch dance on every new machine.

## Component 1 — the `claude-config` repo

Created private via `gh` (authenticated as `JeffreyJoumjian`).

```
claude-config/
  install.sh            macOS / Linux
  install.ps1           Windows
  README.md             the from-scratch runbook
  .gitignore            whitelist-style
  home/                 mirrors ~/.claude
    CLAUDE.MD
    settings.json
    statusline.sh
    rules/{react,testing,typescript}.md
    agents/{code-explorer,code-impact}.md
    skills/{remotion-dev,stagehand,vercel-react-best-practices}/
    commands/{costly,timely}.md
    hooks/notify.sh
    scripts/{cc-cost,cc-time}.py
```

Files live under `home/` rather than at the repo root so the installer has one unambiguous
source directory to walk, and so `install.sh`, `README.md`, and `.gitignore` are never mistaken
for config to copy.

**Deliberately excluded:** `history.jsonl`, `sessions/`, `projects/`, `daemon.log`,
`daemon/`, `file-history/`, `paste-cache/`, `session-env/`, `cache/`, `backups/`, `ide/`,
`debug/`, `downloads/`, `jobs/`, `.DS_Store`, and all of `plugins/` except as described below.
The `.gitignore` is whitelist-style (`*` then `!` re-includes) under `home/`. Since config is
synced back by copying files out of `~/.claude`, this is the backstop against an over-broad copy
sweeping in `history.jsonl` or a `sessions/` directory: an unlisted path is ignored by default
rather than committed by default.

**Plugins are not copied.** `~/.claude/plugins/` is 42 MB of re-downloadable cache, and
`known_marketplaces.json` embeds absolute macOS paths (`/Users/skylerdj/...`) that would be wrong
on Windows. Instead the installer re-registers marketplaces *by source*. Only one is non-builtin:

| Marketplace | Source |
| --- | --- |
| `claude-plugins-official` | built in, no action needed |
| `expo-plugins` | `expo/skills` |

Once `settings.json` is in place, its `enabledPlugins` block drives reinstallation of all 18
plugins from those marketplaces.

### Platform differences

Handled **inside the shell scripts**, not by forking `settings.json`. `notify.sh` and
`statusline.sh` each detect the platform and degrade gracefully, so a single `settings.json`
ships everywhere. Exactly one key cannot be handled this way:

- `preferredNotifChannel: "iterm2_with_bell"` — iTerm2 is macOS-only. The installer patches this
  key on Windows.

This keeps four settings keys (`Notification` hook, `Stop` hook, `statusLine`,
`preferredNotifChannel`) from needing per-platform variants of the whole file.

## Component 2 — the installer

`install.sh` and `install.ps1` implement the same five-step contract:

1. **Back up.** Every `~/.claude/<path>` about to be overwritten is copied to
   `~/.claude/backups/<ISO-timestamp>/<path>` first. Never destructive.
2. **Copy.** Walk `home/` and copy each file to the matching path under `~/.claude`, creating
   directories as needed.
3. **Register marketplaces.** `claude plugin marketplace add expo/skills`, tolerating
   "already exists".
4. **Patch platform keys.** On Windows only, rewrite `preferredNotifChannel` in the installed
   `settings.json`.
5. **Report.** Print each file written, the backup directory used, and any manual step still
   outstanding (e.g. "Python not found — `/costly` and `/timely` will not work").

**Idempotent.** Re-running overwrites with the same content and creates a fresh backup. Safe to
run after every `git pull`.

**Error handling.** The installer fails loudly on unwritable paths or a missing `home/`
directory, and warns without failing on a missing `claude` CLI (marketplace registration is
skipped, and the message says so). It never silently skips a file.

## Component 3 — mtg-agent portability fixes

### 3.1 Commit outstanding work

The 37 modified/untracked files are committed and pushed to `main` before anything else. This is
step zero: every other fix is invisible from a second machine until it lands.

### 3.2 Cross-platform Chrome discovery — `scripts/deck-pdf.ts`

`CHROME_CANDIDATES` gains Windows locations, resolved from `%LOCALAPPDATA%`, `%PROGRAMFILES%`,
and `%PROGRAMFILES(X86)%` rather than hardcoded `C:\` paths:

- `<LOCALAPPDATA>\Google\Chrome\Application\chrome.exe`
- `<PROGRAMFILES>\Google\Chrome\Application\chrome.exe`
- `<PROGRAMFILES(X86)>\Google\Chrome\Application\chrome.exe`
- the Edge equivalents (`msedge.exe`) as a fallback, since Edge is Chromium and preinstalled on
  Windows

The existing "no Chrome found" error message keeps listing every probed path.

### 3.3 Cross-platform browser open — `scripts/deck-live.ts:64`

Select the opener by `process.platform`: `open` on `darwin`, `cmd /c start ""` on `win32`,
`xdg-open` elsewhere.

### 3.4 Guard the SessionEnd hook — `.claude/settings.json`

The `pkill` command is wrapped so it no-ops where `pkill` is absent, e.g.
`command -v pkill >/dev/null 2>&1 && pkill -f ... ; exit 0`. Behavior on macOS is unchanged.

### 3.5 Add `.gitattributes`

```
* text=auto
*.txt text eol=lf
*.md  text eol=lf
*.pdf binary
*.json text eol=lf
```

Pinning `eol=lf` on `.txt` protects the `rules/raw/*.txt` fixtures the parser tests read.

### 3.6 Port the deck-finalizer Python scripts to TypeScript

`carddata.py` and `deckcheck.py` become `scripts/carddata.ts` and `scripts/deckcheck.ts`,
registered in `package.json` as `bun run carddata` and `bun run deckcheck`. The Python files are
deleted and `deck-finalizer/SKILL.md` updated to the new commands — which fixes the wrong-path
bug in the same change.

They reuse existing library code rather than reimplementing it: `REPO_ROOT` from
`scripts/lib/paths.ts` replaces the hand-rolled `find_root()`, `cleanCardName` and `CARD_LINE`
from `scripts/lib/decklist.ts` replace the local `clean()` and line regex, and
`scripts/lib/scryfall.ts` replaces the raw `urllib` calls.

**Behavior to preserve exactly** (the skill's prose depends on this output):

`carddata` — cache-first. Reads `decks/<slug>/research/cards.txt`, fetches only misses in one
batched `/cards/collection` call, appends them to the cache, then prints one block per requested
name in request order. Block format is load-bearing, because `deckcheck` parses it back:

```
## <name>
cost=<mana_cost> | type=<type_line> | CI=<color_identity> | produces=<produced_mana> | usd=$<price>
<oracle text, newlines flattened to spaces>
```

Absent fields render as `-`; missing price renders as `?`. Double-faced cards key on the front
face; the cache lookup regex must keep matching a `## Front // Back` heading when asked for
`Front`. Cards missing everywhere print `## <name>` followed by
`[no data — not in cache or on Scryfall]`. Names not found on Scryfall are reported on stderr.

`deckcheck` — prints total card count (flagged when ≠ 100), mana sources (lands + mana-producing
artifacts, flagged when < 40), Game Changer count with the resulting bracket (`3 (or lower)` at
≤ 3, else `4+`) listing each one, and — only when the deck folder contains
`premium_*_decks.json` or `new_*_decks_clean.json` — per-card field coverage with basic lands
excluded, marking ≥ 4 as a staple and 0 distinctly. With no sample present it prints the
explicit "skipping coverage" line rather than silently omitting the section.

Both accept `--deck <slug>`, `--file <path>` (slug inferred from a `decks/<slug>/` path
segment), bare names as arguments, or a list on stdin, and both exit non-zero with the existing
usage message when the slug or the list cannot be determined.

**Input sources.** Both must keep skipping blank lines, `#`/`>` prefixed lines, and lines
starting with `Commander`, `Bracket`, `Total`, or `Strategy`, so they can be pointed at a raw
`DECK.md`.

### 3.7 Document the Windows path

`CLAUDE.md` gains a short "Working on another machine" section pointing at the
`claude-config` README, and noting Bun's Windows install (`powershell -c "irm bun.sh/install.ps1 | iex"`).

## Testing

`bun test` currently covers the parser, chunker, differ, manifest, and decklist. The port adds
unit tests in the same style:

- **`carddata`** — cache hit returns the cached block without a network call; cache miss appends
  a correctly formatted block; a DFC requested by front-face name matches a `## Front // Back`
  heading; a card absent from both cache and Scryfall produces the `[no data …]` line. Scryfall
  is stubbed; no test hits the network.
- **`deckcheck`** — count and mana-source arithmetic including the < 40 and ≠ 100 flags; bracket
  boundary at exactly 3 and exactly 4 Game Changers; coverage output with a sample present and
  the "skipping coverage" line with none; basic lands excluded from coverage.
- **Argument parsing** — `--deck`, `--file` with slug inference, positional names, and stdin, for
  both scripts.

The installer is verified by running it (idempotence: run twice, second run is a no-op against
an identical tree) rather than unit-tested.

**End-to-end smoke test on the Windows machine**, which is the actual acceptance criterion:

1. `bun test` passes
2. `bun run card "Sol Ring"` returns real data
3. `bun run deckcheck --file decks/edgar-markov/DECK.md` prints a report
4. A Claude Code session in the desktop app invokes `deck-brain` and the `mtg-rules-expert`
   subagent successfully
5. `/costly` either works or reports Python missing — not a crash

## Runbook (the deliverable)

On a new Windows machine:

1. Install Git, then Bun (`powershell -c "irm bun.sh/install.ps1 | iex"`)
2. Install the Claude Desktop app and sign in
3. `git clone git@github.com:JeffreyJoumjian/claude-config.git`
4. `.\claude-config\install.ps1`
5. `git clone git@github.com:JeffreyJoumjian/mtg-agent.git`
6. Open `mtg-agent` in a Claude Code session; run the smoke test above

Steps 1–4 are once per machine; step 5 is once per repo.

## Ongoing maintenance

Both repos are plain git on `main`, matching the established push-direct workflow. A changed
skill is committed like any other change. Global config changes are made in the `claude-config`
clone and re-installed, **not** edited in `~/.claude` directly — otherwise the two drift. The
installer's backup step means a mistaken run is recoverable.

## Risks and unverified assumptions

- **Git Bash hook resolution.** `settings.json` invokes hooks as `bash ~/.claude/hooks/notify.sh`.
  Whether Claude Code on Windows resolves `bash` through Git Bash is unverified from macOS. The
  scripts will be written to exit 0 on an unrecognized platform, so worst case the hook is inert
  rather than erroring every turn. Confirm on the real machine.
- **`statusline.sh` portability** is unaudited. If it shells out to macOS-only tools it needs the
  same platform guard as `notify.sh`; check during implementation.
- **SSH keys** must exist on the new machine for the `git@github.com:` remotes, since `gh` is
  configured for SSH. The runbook should note `gh auth login` as the simplest path.
- **The two reference PDFs stay in git** (16 MB of the 22 MB tracked). They are regenerable via
  `bun run deck:pdf`, but keeping them means a Windows box without Chrome can still open the
  thing you actually print. Revisit only if the repo becomes unwieldy.

## As built

Implemented 2026-08-17 across `mtg-agent` (`cbfa684`…`19f1a3c`) and the new private
`claude-config` repo. Six things differed from the design above, all found by testing:

1. **`settings.json` carries the marketplaces itself.** Registering `expo/skills` writes an
   `extraKnownMarketplaces` block into `settings.json` — by source, with no absolute paths. That
   is strictly better than the planned installer step, which is now only a fallback for older
   Claude Code versions. It also means `settings.json` drifts as Claude Code rewrites it, so the
   README documents copying it back deliberately.

2. **`bun test` had to be scoped to `./test`.** A fresh clone failed three tests: an unscoped run
   walks into `apps/collection-visualizer`, whose dependencies aren't installed. That app has its
   own `test` script. Without this the runbook's smoke test would fail on every new machine.

3. **`vercel-react-best-practices` was a symlink** out of `~/.claude/skills` to
   `~/.agents/skills/`, which would dangle on a new machine. It's dereferenced into the repo and
   installs as a real directory.

4. **`parseKeepPile` needed a counted/uncounted rule.** A faithful port of the Python parsed
   `DECK.md`'s `Game Changers (3/3 — …): Ancient Tomb · …` metadata line as a card, giving Iron
   Man 101 cards. The rule now is: if any line in the list carries a count, every card line must.
   A list with no counts anywhere is still treated as a bare keep-pile.

5. **`carddata` needed 75-identifier batching.** The original called `/cards/collection` once,
   which fails on any full decklist. `fetchCollection` in `lib/scryfall.ts` already chunked;
   calling `request` directly for exact cache-format control skipped that.

6. **`cleanEntryName` ordering.** `cleanCardName` has to run *before* the parenthesis strip — it
   matches `(m10) 66` as one unit, so stripping parentheses first orphaned the collector number
   and produced `Ponder 66`. This bug existed in the Python too.

Two bugs were fixed as a side effect: double-faced cards are now indexed under their front face,
so DFC lands count as mana sources; and 14 cards genuinely missing from Edgar's `cards.txt` were
cached, moving its report from a spurious `36 mana sources ⚠️ low` to the correct `41`.

**Still unverified:** `install.ps1` has never been executed — there is no PowerShell on this Mac
to even syntax-check it — and the Git Bash hook-resolution question from the risks section above
remains open until someone runs this on real Windows.
