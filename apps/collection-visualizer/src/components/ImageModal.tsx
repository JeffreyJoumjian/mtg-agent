import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface ImageModalProps {
  src: string
  alt: string
  onClose: () => void
}

/** A full-screen image lightbox. Rendered into <body> so it escapes the sidebar; closes on backdrop
 *  click or Escape. Only mounted when open (client-side), so createPortal is always safe. */
export function ImageModal(props: ImageModalProps) {
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
      <button
        onClick={props.onClose}
        aria-label="Close"
        title="Close"
        className="absolute right-4 top-4 flex size-9 cursor-pointer items-center justify-center rounded-md bg-black/60 text-white transition hover:bg-black/80"
      >
        <X className="size-5" />
      </button>
      <img
        src={props.src}
        alt={props.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
      />
    </div>,
    document.body,
  )
}
