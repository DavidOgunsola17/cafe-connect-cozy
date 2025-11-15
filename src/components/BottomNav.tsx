import { MessageSquare, Heart, Calendar, Briefcase, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const items = [
  { title: "cafés", url: "/cafes", icon: MessageSquare },
  { title: "match", url: "/find-match", icon: Heart },
  { title: "meetings", url: "/meetings", icon: Calendar },
  { title: "opportunities", url: "/opportunities", icon: Briefcase, badge: true },
  { title: "spotlight", url: "/spotlight", icon: Sparkles },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-muted-foreground transition-colors relative"
            activeClassName="text-accent"
          >
            <div className="relative">
              <item.icon className="h-5 w-5" />
              {item.badge && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
              )}
            </div>
            <span className="text-[10px] tracking-wide">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
