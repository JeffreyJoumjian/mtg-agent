import { Library, Layers, Moon, Sun, Swords } from "lucide-react";
import { useAtom } from "jotai";
import { settingsAtom } from "~/lib/state/store";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
  const [settings, setSettings] = useAtom(settingsAtom);
  const dark = settings.theme === "dark";

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
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              tooltip={dark ? "Light mode" : "Dark mode"}
              onClick={() => setSettings({ ...settings, theme: dark ? "light" : "dark" })}
            >
              {dark ? <Sun /> : <Moon />}
              <span>{dark ? "Light mode" : "Dark mode"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
