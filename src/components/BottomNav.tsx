import { Coffee, MessageSquare, Heart, Calendar, Briefcase, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const items = [
  { title: "cafés", url: "/cafes", icon: MessageSquare },
  { title: "match", url: "/find-match", icon: Heart },
  { title: "meetings", url: "/meetings", icon: Calendar },
  { title: "opportunities", url: "/opportunities", icon: Briefcase },
  { title: "spotlight", url: "/spotlight", icon: Sparkles },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-border bg-card/95 backdrop-blur-lg">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
            activeClassName="text-accent"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
