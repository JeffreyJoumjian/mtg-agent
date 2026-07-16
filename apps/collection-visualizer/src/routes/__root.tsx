import type { ReactNode } from 'react'
import { useState } from 'react'
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '~/components/ui/tooltip'
import appCss from '~/styles/app.css?inline'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'MTG Collection' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  // One client per app instance; created lazily so SSR and client each get their own.
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RootDocument>
          <Outlet />
        </RootDocument>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

// Apply the persisted theme before first paint so there's no flash (and no hydration fight — the
// class is script-managed, hence suppressHydrationWarning on <html>). Defaults to dark.
const THEME_SCRIPT = `(function(){try{var s=JSON.parse(localStorage.getItem('mtg-collection.settings')||'{}');document.documentElement.classList.toggle('dark',s.theme!=='light');}catch(e){document.documentElement.classList.add('dark');}})();`

function RootDocument(props: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <style dangerouslySetInnerHTML={{ __html: appCss }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="bg-background text-foreground">
        {props.children}
        <Scripts />
      </body>
    </html>
  )
}
