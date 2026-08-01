// Server only — see lib/server/README. Reaching this from a component (even transitively, through
// something that looks pure) breaks the client build. The PURE helpers (applyOverrides, overrideKey,
// setOverride, clearOverride) deliberately live in `lib/data/purchase-overrides` so `buildResponse`
// can call them without dragging node:fs into the client bundle; only load/save belong here.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { PurchaseOverrides } from '~/lib/data/purchase-overrides'
import { DATA_DIR } from './price-cache'

// Its own file, never the CSV: a ManaBox re-upload overwrites collection.csv wholesale, so an
// override written back into that file would be lost on the next import. Keeping it here is the
// whole point — the import can't touch it.
const OVERRIDES_PATH = join(DATA_DIR, 'purchase-overrides.json')

export async function loadOverrides(): Promise<PurchaseOverrides> {
  try {
    const raw = await readFile(OVERRIDES_PATH, 'utf8')
    return JSON.parse(raw) as PurchaseOverrides
  } catch {
    return {}
  }
}

export async function saveOverrides(overrides: PurchaseOverrides): Promise<void> {
  await mkdir(dirname(OVERRIDES_PATH), { recursive: true })
  await writeFile(OVERRIDES_PATH, JSON.stringify(overrides, null, 2) + '\n')
}
