import type { CollectionRow, Finish } from '~/lib/types'

/** Split one CSV line into fields, honoring double-quoted fields with embedded commas/quotes. */
function splitCsvLine(line: string): string[] {
  const fields: string[] = []
  let value = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          value += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        value += ch
      }
    } else if (ch === '"') {
      inQuotes = true
    } else if (ch === ',') {
      fields.push(value)
      value = ''
    } else {
      value += ch
    }
  }
  fields.push(value)
  return fields
}

function toFinish(raw: string): Finish {
  const v = raw.trim().toLowerCase()
  return v === 'foil' || v === 'etched' ? v : 'normal'
}

/** Parse a ManaBox CSV export into rows, mapping columns by header name (order-independent). */
export function parseManaBoxCsv(text: string): CollectionRow[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
  if (lines.length < 2) return []

  const header = splitCsvLine(lines[0])
  const col = (name: string): number => header.indexOf(name)
  const idx = {
    binderName: col('Binder Name'),
    name: col('Name'),
    setCode: col('Set code'),
    setName: col('Set name'),
    collectorNumber: col('Collector number'),
    finish: col('Foil'),
    rarity: col('Rarity'),
    quantity: col('Quantity'),
    scryfallId: col('Scryfall ID'),
    purchasePrice: col('Purchase price'),
    condition: col('Condition'),
    language: col('Language'),
    purchaseCurrency: col('Purchase price currency'),
  }

  const rows: CollectionRow[] = []
  for (let i = 1; i < lines.length; i++) {
    const f = splitCsvLine(lines[i])
    const rawPrice = (f[idx.purchasePrice] ?? '').trim()
    rows.push({
      scryfallId: (f[idx.scryfallId] ?? '').trim(),
      name: f[idx.name] ?? '',
      setCode: (f[idx.setCode] ?? '').trim(),
      setName: f[idx.setName] ?? '',
      collectorNumber: (f[idx.collectorNumber] ?? '').trim(),
      rarity: (f[idx.rarity] ?? '').trim().toLowerCase(),
      finish: toFinish(f[idx.finish] ?? ''),
      quantity: Number.parseInt(f[idx.quantity] ?? '1', 10) || 1,
      purchasePrice: rawPrice === '' ? null : Number.parseFloat(rawPrice),
      purchaseCurrency: (f[idx.purchaseCurrency] ?? 'USD').trim() || 'USD',
      condition: (f[idx.condition] ?? '').trim(),
      language: (f[idx.language] ?? '').trim(),
      binderName: f[idx.binderName] ?? '',
    })
  }
  return rows
}
