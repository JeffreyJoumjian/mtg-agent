import { Library, Layers, Swords } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

/** Decks are the home route. `Collection` is the owned-card library; `Collections` is deliberately
 *  broader than the sets it lists today — it's where user-made lists will live alongside them. */
const NAV = [
  { to: "/", label: "Decks", icon: Swords },
  { to: "/collection", label: "Collection", icon: Library },
  { to: "/collections", label: "Collections", icon: Layers },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-[61px] justify-center border-b px-4 group-data-[collapsible=icon]:px-2">
        <span className="truncate font-semibold group-data-[collapsible=icon]:hidden">MTG Workbench</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.to === "/"
                        ? pathname === "/" || pathname.startsWith("/decks")
                        : item.to === "/collection"
                          ? pathname === "/collection"
                          : pathname.startsWith(item.to)
                    }
                    tooltip={item.label}
                  >
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
  );
}
