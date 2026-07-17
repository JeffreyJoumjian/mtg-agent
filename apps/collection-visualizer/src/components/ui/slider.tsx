import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '~/lib/utils'

function Slider(props: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const { className, defaultValue, value, min = 0, max = 100, ...rest } = props
  const values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max],
  )
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        // Cursors: the track is click-to-jump, so it's a pointer; the thumb is dragged, so it's
        // grab/grabbing. `[&:active_*]:cursor-grabbing` covers the gap between those — a drag
        // started on the track only makes the ROOT :active, never the thumb (:active walks up to
        // ancestors, not down to children), so without it the thumb would flip back to `grab` the
        // moment it caught up with the cursor mid-drag.
        'relative flex w-full cursor-pointer touch-none items-center select-none active:cursor-grabbing [&:active_*]:cursor-grabbing data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        className,
      )}
      {...rest}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary bg-background ring-ring/50 block size-4 shrink-0 cursor-grab rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden active:cursor-grabbing disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
