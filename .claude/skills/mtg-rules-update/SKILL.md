---
name: mtg-rules-update
description: >-
  Update the local Magic: The Gathering Comprehensive Rules to the latest published
  version. Use when the user asks to update/refresh/rebuild the MTG rules, fetch the
  newest rules, or check for a new rules release. Fetches the latest .txt from
  magic.wizards.com/en/rules, re-chunks it, and reports the changelog.
---

# Update the MTG rules

This skill refreshes the chunked Comprehensive Rules from the official source and rebuilds
all derived files (`rules/sections`, `rules/glossary`, `manifest.json`, `rules.json`,
`meta.json`) plus a `CHANGELOG.md` diff against the previous version.

## Steps

1. **Check prerequisites.** Run `bun --version`. If Bun is missing, tell the user to
   install it (`curl -fsSL https://bun.sh/install | bash`) and stop.

2. **Note the current version** so you can report what changed:
   `cat rules/meta.json` (record `version` / `effectiveDate`).

3. **Fetch + rebuild** from the repo root:
   ```bash
   bun run update
   ```
   This runs `fetch-rules.ts` (scrapes the rules page for the current `.txt` and downloads
   it to `rules/raw/`) then `build-rules.ts` (re-chunks and diffs).

   - If the fetch step fails because the page layout changed, find the `.txt` link manually
     on https://magic.wizards.com/en/rules and pass it directly:
     ```bash
     bun run scripts/fetch-rules.ts "<direct .txt url>"
     bun run scripts/build-rules.ts
     ```
   - If the network is unavailable but the user already downloaded a `.txt`, drop it in
     `rules/raw/` and run `bun run scripts/build-rules.ts` alone.

4. **Report the result.** Show the new version/effective date and summarize `CHANGELOG.md`
   (added / removed / changed rule counts, and notable changed rule numbers). If the build
   reported "No rule text changes," tell the user they were already up to date.

5. **Offer to commit** the regenerated files (the changelog plus everything under `rules/`)
   so the update is captured in git, e.g.:
   ```bash
   git add rules CHANGELOG.md && git commit -m "Update rules to <version>"
   ```
   Only commit if the user agrees.

## Notes

- The build is a **clean rebuild** — chunking is deterministic, so re-running on the same
  input always yields identical files. The only stateful part is the diff, which compares
  the new `rules.json` against the previous one.
- Everything is zero-dependency Bun + TypeScript; there is no install step.
