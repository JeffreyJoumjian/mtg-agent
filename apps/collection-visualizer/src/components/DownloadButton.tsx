import { useState, type ComponentProps, type MouseEvent } from 'react'
import { Download, Check, Loader2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip'
import { downloadImage } from '~/lib/download'

interface DownloadButtonProps {
  /** Best-quality image URL to save. */
  url: string
  filename: string
  /** shadcn Button variant (defaults to "outline"). */
  variant?: ComponentProps<typeof Button>['variant']
  className?: string
  iconClassName?: string
}

/** An icon-only shadcn Button that saves the card's best-quality image. Swallows the click so it never
 *  selects the tile or closes the modal behind it; shows a spinner while fetching and a check when done. */
export function DownloadButton(props: DownloadButtonProps) {
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle')
  const icon = props.iconClassName ?? 'size-4'

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
        <Button
          type="button"
          variant={props.variant ?? 'outline'}
          size="icon"
          onClick={onClick}
          aria-label="Download image"
          className={props.className}
        >
          {state === 'busy' ? (
            <Loader2 className={`${icon} animate-spin`} />
          ) : state === 'done' ? (
            <Check className={icon} />
          ) : (
            <Download className={icon} />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{state === 'done' ? 'Downloaded!' : 'Download image'}</TooltipContent>
    </Tooltip>
  )
}
