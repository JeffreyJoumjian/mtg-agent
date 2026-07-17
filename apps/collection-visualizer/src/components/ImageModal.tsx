import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import type { Finish } from '~/lib/types'
import { FlipImage } from './FlipImage'
import { FlipButton } from './FlipButton'
import { FoilCard } from './FoilCard'
import { DownloadButton } from './DownloadButton'

interface ImageModalProps {
  src: string
  alt: string
  onClose: () => void
  /** File name for the download button. */
  filename: string
  /** The other face; when present, a flip control turns the lightbox card over in 3D. */
  back?: string | null
  /** Printing's finish — a foil one shimmers and tilts here too, at full size. */
  finish: Finish
}

/** A full-screen image lightbox. Rendered into <body> so it escapes the sidebar; closes on backdrop
 *  click or Escape. Only mounted when open (client-side), so createPortal is always safe. */
export function ImageModal(props: ImageModalProps) {
  const twoSided = Boolean(props.back)
  const [flips, setFlips] = useState(0)
  // Download whichever face is currently turned toward the viewer.
  const shown = flips % 2 === 1 && props.back ? props.back : props.src

  // No focus management here on purpose: the lightbox opens from inside the drawer, and vaul's
  // content traps focus, so anything focused out here (this dialog, even its own close button) is
  // yanked straight back into the drawer. Whoever opened the lightbox therefore keeps focus — see
  // CardDetails, which stops that button's tooltip firing while the lightbox is up.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') props.onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [props.onClose])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={props.onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={props.onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex size-9 cursor-pointer items-center justify-center rounded-md bg-black/60 text-white transition hover:bg-black/80"
          >
            <X className="size-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Close</TooltipContent>
      </Tooltip>
      {/* A card-shaped box, sized from the height. Both faces go through it so the foil overlay lands
          exactly on the card: an <img> keeps its intrinsic width as its element box (object-contain
          only letterboxes the picture *inside* that box), which would leave the overlay painting a
          visible empty panel beside the art and push the card off-centre.
          stopPropagation sits on the wrapper, so clicking the card doesn't close the lightbox while
          clicking the backdrop still does. */}
      <div className="relative aspect-[488/680] h-full max-h-full" onClick={(e) => e.stopPropagation()}>
        <FoilCard foil={props.finish !== 'normal'} etched={props.finish === 'etched'} className="absolute inset-0">
          {twoSided ? (
            <FlipImage front={props.src} back={props.back ?? null} rotations={flips} alt={props.alt} loading="eager" />
          ) : (
            <img
              src={props.src}
              alt={props.alt}
              className="absolute inset-0 h-full w-full rounded-xl object-contain shadow-2xl"
            />
          )}
        </FoilCard>
      </div>
      {twoSided && (
        <FlipButton onFlip={() => setFlips((n) => n + 1)} size="md" className="absolute left-4 top-4" />
      )}
      <DownloadButton
        url={shown}
        filename={props.filename}
        variant="ghost"
        className="absolute right-16 top-4 bg-black/60 text-white hover:bg-black/80 hover:text-white"
        iconClassName="size-5"
      />
    </div>,
    document.body,
  )
}
