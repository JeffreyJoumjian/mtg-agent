import { RotateCw } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'

interface FlipImageProps {
  /** Front and back image URLs. */
  front: string | null
  back: string | null
  /** Half-turns applied so far — each flip increments it, so flips keep spinning the same direction
   *  instead of rocking back and forth. Even shows the front, odd shows the back. */
  rotations: number
  alt: string
  loading?: 'lazy' | 'eager'
}

/** A card image that rotates in 3D between its two faces. Fills its nearest positioned ancestor, so
 *  the caller supplies the frame (aspect box, rounding, overflow-clip). */
export function FlipImage(props: FlipImageProps) {
  return (
    <div className="absolute inset-0 [perspective:1000px]">
      <div
        className="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        style={{ transform: `rotateY(${props.rotations * 180}deg)` }}
      >
        <Face src={props.front} alt={props.alt} loading={props.loading} />
        <Face src={props.back} alt={props.alt} loading={props.loading} back />
      </div>
    </div>
  )
}

function Face(props: { src: string | null; alt: string; loading?: 'lazy' | 'eager'; back?: boolean }) {
  // Each face is pinned in the shared 3D space; backface-visibility hides whichever is turned away.
  return (
    <div
      className="absolute inset-0 [backface-visibility:hidden]"
      style={props.back ? { transform: 'rotateY(180deg)' } : undefined}
    >
      {props.src && (
        <img src={props.src} alt={props.alt} loading={props.loading} className="absolute inset-0 h-full w-full object-contain" />
      )}
    </div>
  )
}

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
