import { useState, type MouseEvent } from 'react'
import { Download, Check, Loader2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { downloadImage } from '~/lib/download'

interface DownloadButtonProps {
  /** Best-quality image URL to save. */
  url: string
  filename: string
  /** Positioning classes (the caller places it in a corner). */
  className?: string
  size?: 'sm' | 'md'
}

/** Saves the card's best-quality image. Swallows the click so it never selects the tile or closes the
 *  modal behind it; shows a spinner while fetching and a check when done. */
export function DownloadButton(props: DownloadButtonProps) {
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle')
  const box = props.size === 'md' ? 'size-9' : 'size-7'
  const icon = props.size === 'md' ? 'size-5' : 'size-4'

  const onClick = async (e: MouseEvent) => {
    e.stopPropagation()
    if (state === 'busy') return

    setState('busy')
    try {
      await downloadImage(props.url, props.filename)
      setState('done')
      setTimeout(() => setState('idle'), 1500)
    } catch {
      setState('idle')
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          aria-label="Download image"
          className={`flex ${box} cursor-pointer items-center justify-center rounded-md bg-black/60 text-white transition hover:bg-black/80 ${props.className ?? ''}`}
        >
          {state === 'busy' ? (
            <Loader2 className={`${icon} animate-spin`} />
          ) : state === 'done' ? (
            <Check className={icon} />
          ) : (
            <Download className={icon} />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent>{state === 'done' ? 'Downloaded!' : 'Download image'}</TooltipContent>
    </Tooltip>
  )
}
