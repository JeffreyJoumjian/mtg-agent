import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import type { Currency, Finish } from '~/lib/types'
import { getCardHistory } from '~/server/collection'
import { cardSeries } from '~/lib/view/history'
import { TrendPanel } from '~/components/chart/TrendPanel'

interface CardHistoryProps {
  scryfallId: string
  /** The printing's finish — a foil tile is worth the foil price, so it plots the foil series. */
  finish: Finish
  currency: Currency
}

/** Recorded price history for one printing, fetched when the drawer opens.
 *
 *  Keyed by printing rather than by card name: the same card in foil and non-foil are different
 *  prices, and the drawer is always showing exactly one of them. */
export function CardHistory(props: CardHistoryProps) {
  const fetchHistory = useServerFn(getCardHistory)

  const { data, isPending } = useQuery({
    queryKey: ['card-history', props.scryfallId],
    queryFn: () => fetchHistory({ data: { scryfallId: props.scryfallId } }),
    staleTime: 5 * 60 * 1000,
  })

  if (isPending) {
    // Reserve the panel's height so opening the drawer doesn't shuffle the details below it.
    return <div className="h-24" aria-hidden />
  }

  return (
    <TrendPanel
      points={cardSeries(data?.points ?? [], props.currency, props.finish)}
      currency={props.currency}
      title="Price history"
      height={96}
    />
  )
}
