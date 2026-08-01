import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import type { Currency } from '~/lib/types'
import { getValueHistory } from '~/server/collection'
import { inCurrency } from '~/lib/view/history'
import { TrendPanel } from '~/components/chart/TrendPanel'

interface ValueHistoryProps {
  currency: Currency
  /** Set to scope to, or null for the whole library. */
  setCode: string | null
  setName: string | null
}

/** Value over time for whatever the Library is currently showing — everything, or one set.
 *
 *  It follows the set scope rather than the search and filters: the chart is built from recorded
 *  prices per card, so narrowing to "red instants under $5" would be answerable, but a chart that
 *  silently redrew on every keystroke would be a different (and much noisier) feature. */
export function ValueHistory(props: ValueHistoryProps) {
  const fetchHistory = useServerFn(getValueHistory)

  const { data, isPending } = useQuery({
    queryKey: ['value-history', props.setCode],
    queryFn: () => fetchHistory({ data: { setCode: props.setCode ?? undefined } }),
    staleTime: 5 * 60 * 1000,
  })

  if (isPending) return <div className="h-[150px]" aria-hidden />

  return (
    <TrendPanel
      points={inCurrency(data?.points ?? [], props.currency)}
      currency={props.currency}
      title={props.setName ? `${props.setName} value` : 'Library value'}
      height={120}
      note="Priced at today's quantities — a card bought yesterday is counted for the whole period, since nothing records when it was acquired."
    />
  )
}
