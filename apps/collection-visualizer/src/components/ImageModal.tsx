import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { FlipImage } from './FlipImage'
import { FlipButton } from './FlipButton'
import { DownloadButton } from './DownloadButton'

interface ImageModalProps {
  src: string
  alt: string
  onClose: () => void
  /** File name for the download button. */
  filename: string
  /** The other face; when present, a flip control turns the lightbox card over in 3D. */
  back?: string | null
}

/** A full-screen image lightbox. Rendered into <body> so it escapes the sidebar; closes on backdrop
 *  click or Escape. Only mounted when open (client-side), so createPortal is always safe. */
export function ImageModal(props: ImageModalProps) {
  const twoSided = Boolean(props.back)
  const [flips, setFlips] = useState(0)
  // Download whichever face is currently turned toward the viewer.
  const shown = flips % 2 === 1 && props.back ? props.back : props.src

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
      {twoSided ? (
        <div className="relative aspect-[488/680] h-full max-h-full" onClick={(e) => e.stopPropagation()}>
          <FlipImage front={props.src} back={props.back ?? null} rotations={flips} alt={props.alt} loading="eager" />
        </div>
      ) : (
        <img
          src={props.src}
          alt={props.alt}
          onClick={(e) => e.stopPropagation()}
          className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
        />
      )}
      {twoSided && (
        <FlipButton onFlip={() => setFlips((n) => n + 1)} size="md" className="absolute left-4 top-4" />
      )}
      <DownloadButton url={shown} filename={props.filename} size="md" className="absolute bottom-4 right-4" />
    </div>,
    document.body,
  )
}
