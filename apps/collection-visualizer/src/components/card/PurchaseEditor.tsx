import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useMutation } from '@tanstack/react-query'
import { Pencil, X, Check } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import type { CardTile as Tile, Currency } from '~/lib/types'
import { formatMoney, symbolFor } from '~/lib/format'
import { setPurchaseOverride, clearPurchaseOverride } from '~/server/collection'

interface PurchaseEditorProps {
  tile: Tile
  currency: Currency
}

/** The printing's purchase price, with manual editing. The value the vs-purchase baseline is measured
 *  against — a set override wins over the CSV's weighted average, and lives in its own file so a CSV
 *  re-upload can't wipe it. Saving invalidates the route so the summary bar's ± updates too. */
export function PurchaseEditor(props: PurchaseEditorProps) {
  const t = props.tile
  const router = useRouter()

  const overridden = !!t.purchaseOverride
  const effective = t.purchaseOverride ?? t.weightedPurchase
  const paid = effective?.price ?? null
  // A new override inherits the existing purchase currency, or the display currency if there is none.
  const paidCurrency = t.purchaseOverride?.currency ?? t.weightedPurchase?.currency ?? props.currency
  const csvPrice = t.weightedPurchase?.price ?? null

  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('')

  const setFn = useServerFn(setPurchaseOverride)
  const clearFn = useServerFn(clearPurchaseOverride)

  const save = useMutation({
    mutationFn: (price: number) =>
      setFn({ data: { scryfallId: t.scryfallId, finish: t.finish, price, currency: paidCurrency } }),
    onSuccess: () => {
      setEditing(false)
      router.invalidate()
    },
  })

  const clear = useMutation({
    mutationFn: () => clearFn({ data: { scryfallId: t.scryfallId, finish: t.finish } }),
    onSuccess: () => router.invalidate(),
  })

  const busy = save.isPending || clear.isPending

  const startEdit = () => {
    setValue(paid != null ? String(paid) : '')
    setEditing(true)
  }

  const commit = () => {
    const price = Number(value)
    if (value.trim() === '' || !Number.isFinite(price) || price < 0) return
    save.mutate(price)
  }

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold">Paid</span>

        {editing ? (
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">{symbolFor(paidCurrency)}</span>
            <Input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commit()
                if (e.key === 'Escape') setEditing(false)
              }}
              autoFocus
              className="h-8 w-24"
            />
            <Button size="icon" className="size-8" onClick={commit} disabled={busy} aria-label="Save purchase price">
              <Check />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setEditing(false)}
              aria-label="Cancel"
            >
              <X />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <span className="tabular-nums">{paid != null ? formatMoney(paid, paidCurrency) : '—'}</span>
            <Button variant="ghost" size="sm" onClick={startEdit} disabled={busy}>
              <Pencil /> {paid != null ? 'Edit' : 'Add'}
            </Button>
          </div>
        )}
      </div>

      {!editing && overridden && (
        <div className="mt-1 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>
            Manual override
            {csvPrice != null && <> · CSV had {formatMoney(csvPrice, t.weightedPurchase?.currency ?? paidCurrency)}</>}
          </span>
          <button
            className="underline underline-offset-2 hover:text-foreground disabled:opacity-50"
            onClick={() => clear.mutate()}
            disabled={busy}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}
