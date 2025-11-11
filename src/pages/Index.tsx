import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Coffee, MessageSquare, Users, Sparkles } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="animate-fade-in">
            <div className="mb-6 flex justify-center">
              <Coffee className="w-16 h-16 text-accent animate-float" />
            </div>
            <h1 className="text-7xl md:text-8xl font-semibold text-foreground mb-6 glow-text">
              coffeechat
            </h1>
            <p className="text-2xl text-muted-foreground mb-12 tracking-wide">
              networking, reimagined for gen z.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <Button 
                onClick={() => navigate("/cafes")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-6 text-lg soft-transition"
              >
                explore cafés
              </Button>
              <Button 
                onClick={() => navigate("/lounges")}
                variant="outline"
                className="border-border bg-card hover:bg-secondary text-foreground rounded-xl px-8 py-6 text-lg soft-transition"
              >
                join a lounge
              </Button>
              <Button 
                onClick={() => navigate("/spotlight")}
                variant="outline"
                className="border-border bg-card hover:bg-secondary text-foreground rounded-xl px-8 py-6 text-lg soft-transition"
              >
                spotlight sessions
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-card rounded-2xl border border-border p-8 card-glow animate-slide-up hover:border-accent transition-colors">
              <MessageSquare className="w-12 h-12 text-accent mb-4 mx-auto" />
              <h3 className="text-xl font-medium text-foreground mb-3">private cafés</h3>
              <p className="text-muted-foreground">
                your own cozy corner for intimate conversations and connections
              </p>
            </div>

            <div 
              className="bg-card rounded-2xl border border-border p-8 card-glow animate-slide-up hover:border-accent transition-colors"
              style={{ animationDelay: "0.1s" }}
            >
              <Users className="w-12 h-12 text-accent mb-4 mx-auto" />
              <h3 className="text-xl font-medium text-foreground mb-3">topic lounges</h3>
              <p className="text-muted-foreground">
                join communities around tech, design, business, and more
              </p>
            </div>

            <div 
              className="bg-card rounded-2xl border border-border p-8 card-glow animate-slide-up hover:border-accent transition-colors"
              style={{ animationDelay: "0.2s" }}
            >
              <Sparkles className="w-12 h-12 text-accent mb-4 mx-auto" />
              <h3 className="text-xl font-medium text-foreground mb-3">spotlight sessions</h3>
              <p className="text-muted-foreground">
                learn from mentors and industry leaders in live sessions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border py-8 px-6">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            take a seat — conversations start here.
          </p>
        </div>
      </div>
    </div>
  );
}
