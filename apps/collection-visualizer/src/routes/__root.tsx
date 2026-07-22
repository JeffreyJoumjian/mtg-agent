import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { settingsAtom } from '~/lib/state/store'
import { applyTheme } from '~/lib/state/settings'
import { TooltipProvider } from '~/components/ui/tooltip'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import { AppSidebar } from '~/components/nav/AppSidebar'
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

  // The theme is the one setting with an effect outside React — it toggles a class on <html>. It
  // lives here rather than on a page so every route keeps it, and so it runs on the stored value
  // once localStorage is read, not just when you change it.
  const theme = useAtomValue(settingsAtom).theme
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RootDocument>
          {/* h-svh here rather than on each page: the pages scroll their own panes, so the shell
              itself must be exactly one viewport tall and never scroll. */}
          <SidebarProvider className="h-svh min-h-0">
            <AppSidebar />
            <SidebarInset className="min-w-0 overflow-hidden">
              <Outlet />
            </SidebarInset>
          </SidebarProvider>
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
