interface FaceBadgeProps {
  /** Which of the two faces is shown (odd flip = back / face-down). */
  back: boolean
  className?: string
}

/** The double-faced indicator MTG prints on the card: a triangle pointing up for the face-up side and
 *  down for the face-down side, flipping as you turn the card over. */
export function FaceBadge(props: FaceBadgeProps) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden className={`size-3.5 shrink-0 ${props.className ?? ''}`}>
      {props.back ? <path d="M2.5 4.5 L9.5 4.5 L6 9.5 Z" /> : <path d="M6 2.5 L9.5 7.5 L2.5 7.5 Z" />}
    </svg>
  )
}
