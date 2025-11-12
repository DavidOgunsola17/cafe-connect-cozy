import { Coffee, MessageSquare, Heart, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "cafés", url: "/cafes", icon: MessageSquare },
  { title: "find a match", url: "/find-match", icon: Heart },
  { title: "spotlight", url: "/spotlight", icon: Sparkles },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-border bg-card">
      <SidebarContent>
        {/* Logo Section */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Coffee className="w-6 h-6 text-accent animate-float" />
            {!isCollapsed && (
              <span className="text-xl font-semibold tracking-wide text-foreground">
                coffeechat
              </span>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className="hover:bg-secondary/50 transition-colors"
                      activeClassName="bg-secondary text-accent font-medium"
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
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
