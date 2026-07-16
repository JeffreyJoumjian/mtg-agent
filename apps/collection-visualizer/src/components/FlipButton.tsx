import { RotateCw } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'

interface FlipButtonProps {
  onFlip: () => void
  /** Positioning classes (the caller places it in a corner). */
  className?: string
  size?: 'sm' | 'md'
}

/** The circular control that flips a two-faced card. Swallows the click so it never also selects the
 *  tile or closes the modal behind it. */
export function FlipButton(props: FlipButtonProps) {
  const box = props.size === 'md' ? 'size-9' : 'size-7'
  const icon = props.size === 'md' ? 'size-5' : 'size-4'
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={(e) => {
            e.stopPropagation()
            props.onFlip()
          }}
          aria-label="Flip card"
          className={`flex ${box} cursor-pointer items-center justify-center rounded-md bg-black/60 text-white transition hover:bg-black/80 ${props.className ?? ''}`}
        >
          <RotateCw className={icon} />
        </button>
      </TooltipTrigger>
      <TooltipContent>Flip card</TooltipContent>
    </Tooltip>
  )
}
