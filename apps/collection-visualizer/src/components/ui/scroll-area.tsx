import type { ComponentProps } from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { cn } from '~/lib/utils'

function ScrollArea(props: ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  const { className, children, ...rest } = props
  return (
    <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cn('relative', className)} {...rest}>
      {/* `[&>div]:!block` overrides the `display: table` Radix hard-codes on the wrapper it puts
          around the children. Table sizing grows to fit content, which is how Radix measures for
          horizontal scrolling — but it also means a fixed-width container never constrains what's
          inside it, so content lays out at its natural width and spills out (a 320px popover ended
          up 390px wide). Every ScrollArea here scrolls vertically only, so blocking the wrapper
          costs nothing and makes width behave. !important is required: it's fighting an inline style. */}
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 [&>div]:!block"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar(props: ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  const { className, orientation = 'vertical', ...rest } = props
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        'flex touch-none select-none p-px transition-colors',
        orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent',
        className,
      )}
      {...rest}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb data-slot="scroll-area-thumb" className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
