import { Link, useLocation } from "react-router-dom";
import { Coffee } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "cafés", path: "/cafes" },
    { name: "lounges", path: "/lounges" },
    { name: "spotlight", path: "/spotlight" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold tracking-wide group">
            <Coffee className="w-5 h-5 text-accent group-hover:text-amber-glow transition-colors" />
            <span className="text-foreground group-hover:text-accent transition-colors">coffeechat</span>
          </Link>
          
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm tracking-wide transition-colors relative group ${
                  location.pathname === item.path
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-accent transition-transform origin-left ${
                  location.pathname === item.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
