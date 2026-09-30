---
paths:
  - "apps/collection-visualizer/**"
---

# MTG Workbench app

## The dev server belongs to the pilot

The pilot runs `bun run dev` in `apps/collection-visualizer` (http://localhost:3200) and owns its
lifecycle: assume it's up, and if a task needs it and you're not sure, ask them to start it. Builds,
typechecks and `bun test` are fine. Several servers were once left running across sessions on ports
3001–3003, quietly burning CPU, because Vite silently walked to the next free port. (`strictPort` in
`apps/collection-visualizer/vite.config.ts` now makes a second start fail instead of hiding a
duplicate.) Any other background process you start is yours to stop.

A `SessionEnd` hook in `.claude/settings.json` kills this repo's Vite servers as a backstop. It only
fires when the session actually ends, so stop what you start. The hook exits early when
`MTG_AGENT_EMBEDDED=1` is set, which is how the app launches its embedded deck agent, so that
session ending never kills the app's own Vite server.

## Gotchas

- **Colour decisions go through the Colour Picks page**
  (https://claude.ai/artifact/KGDtoschRsitu64FuyxnTQ), not hues described in prose. Post a round with
  `ArtifactData set` to collection `rounds` (doc id like `2026-09-24-light-background`:
  `{ title, target, note, at, recs: [{ id, name, value, note }] }`, `value` an `oklch(…)` or hex). The
  page live-updates; the user picks and sends, and the pick lands at `picks/<round id>`. Read it back
  with `ArtifactData get` and apply it to `apps/collection-visualizer/src/styles/app.css`.
- `react-resizable-panels` v4 reads a **numeric** size as pixels, so pass percentages as strings
  (`"19%"`).
- Playwright can't click a stacked card's centre (the next card overlaps it); hover the visible strip
  first, or call `el.click()` through `evaluate`.
