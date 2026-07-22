import { Library, Layers } from 'lucide-react'
import { Link, useRouterState } from '@tanstack/react-router'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar'

/** `Collections` is deliberately broader than the sets it lists today — it's where user-made lists
 *  will live alongside them, which is why the nav item and the heading inside it differ. */
const NAV = [
  { to: '/', label: 'Library', icon: Library },
  { to: '/collections', label: 'Collections', icon: Layers },
] as const

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-[61px] justify-center border-b px-4 group-data-[collapsible=icon]:px-2">
        <span className="truncate font-semibold group-data-[collapsible=icon]:hidden">MTG Collection</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={pathname === item.to} tooltip={item.label}>
                    <Link to={item.to}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
