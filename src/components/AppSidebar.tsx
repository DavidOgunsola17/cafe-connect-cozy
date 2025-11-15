import { Coffee, MessageSquare, Heart, Sparkles, Calendar, Briefcase } from "lucide-react";
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
  { title: "meetings", url: "/meetings", icon: Calendar },
  { title: "opportunities", url: "/opportunities", icon: Briefcase, badge: "new" },
  { title: "spotlight", url: "/spotlight", icon: Sparkles },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-border bg-card hidden md:flex">
      <SidebarContent>
        {/* Logo Section */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6">
              <Coffee className="w-6 h-6 text-accent animate-float" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-accent">
                $
              </span>
            </div>
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
                      className="hover:bg-secondary/50 transition-colors relative"
                      activeClassName="bg-secondary text-accent font-medium"
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                      {!isCollapsed && item.badge && (
                        <span className="ml-auto text-[10px] bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
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
