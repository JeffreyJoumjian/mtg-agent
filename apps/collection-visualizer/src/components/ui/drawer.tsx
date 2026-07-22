import type { ComponentProps } from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { cn } from '~/lib/utils'

/** How long the panel takes to slide in or out.
 *
 *  vaul ships 500ms, which reads as sluggish for a panel you open and close constantly while
 *  browsing. It hardcodes that in a stylesheet it injects itself (`TRANSITIONS.DURATION`), so the
 *  override goes on as an inline style below — inline beats an injected rule without needing
 *  `!important`, and without depending on which stylesheet the bundler happens to emit last.
 *
 *  Callers that have to outlast the animation (keeping content mounted through the close, say)
 *  should import this rather than hardcoding a second number that can drift out of step. */
export const DRAWER_MS = 220

function Drawer(props: ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}

/** A right-side panel. No overlay is rendered, so used with `modal={false}` it doesn't dim the page or
 *  block the grid behind it. vaul handles the slide in/out based on the root's `direction`. */
function DrawerContent(props: ComponentProps<typeof DrawerPrimitive.Content>) {
  const { className, children, style, ...rest } = props
  return (
    <DrawerPrimitive.Portal data-slot="drawer-portal">
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn('fixed bottom-0 right-0 top-0 z-50 flex w-96 flex-col border-l bg-card shadow-2xl outline-none', className)}
        // The slide is a CSS keyframe animation (vaul's slideFromRight/slideToRight); `transition`
        // covers the transform it sets directly while dragging.
        style={{ animationDuration: `${DRAWER_MS}ms`, transitionDuration: `${DRAWER_MS}ms`, ...style }}
        {...rest}
      >
        {children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  )
}

function DrawerTitle(props: ComponentProps<typeof DrawerPrimitive.Title>) {
  const { className, ...rest } = props
  return <DrawerPrimitive.Title data-slot="drawer-title" className={cn('font-semibold text-foreground', className)} {...rest} />
}

function DrawerDescription(props: ComponentProps<typeof DrawerPrimitive.Description>) {
  const { className, ...rest } = props
  return <DrawerPrimitive.Description data-slot="drawer-description" className={cn('text-sm text-muted-foreground', className)} {...rest} />
}

export { Drawer, DrawerContent, DrawerTitle, DrawerDescription }
