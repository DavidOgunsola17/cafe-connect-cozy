import { Coffee } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function Index() {
  const options = [
    "discover career paths in tech",
    "connect with mentors and peers",
    "join topic-based communities",
    "practice networking skills",
    "explore industry spotlights",
    "build meaningful connections",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Content Section */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
          <div className="max-w-2xl w-full space-y-8">
            {/* Hero Section */}
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <Coffee className="w-8 h-8 text-accent animate-float" />
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-tight glow-text uppercase">
                network from the best,
                <br />
                be your best.
              </h1>
              
              <p className="text-xl text-muted-foreground tracking-wide">
                get unlimited access to cozy networking spaces.
              </p>
            </div>

            {/* Divider */}
            <div className="w-12 h-1 bg-accent"></div>

            {/* Question Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-medium text-foreground">
                what brings you to coffeechat today?
              </h2>
              
              <div className="space-y-3">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border hover:bg-card hover:border-accent/30 transition-all cursor-pointer group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Checkbox 
                      id={`option-${index}`}
                      className="border-muted-foreground data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                    />
                    <label
                      htmlFor={`option-${index}`}
                      className="text-base text-foreground cursor-pointer flex-1 group-hover:text-accent transition-colors"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Image Grid Section */}
        <div className="flex-1 lg:min-h-screen p-4 lg:p-8">
          <div className="h-full grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-coffee-medium to-coffee-dark overflow-hidden card-glow">
                <div className="w-full h-full flex items-center justify-center text-6xl">☕</div>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/20 to-coffee-medium overflow-hidden card-glow">
                <div className="w-full h-full flex items-center justify-center text-6xl">💬</div>
              </div>
            </div>
            
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-coffee-light to-accent/30 overflow-hidden card-glow">
                <div className="w-full h-full flex items-center justify-center text-6xl">🎯</div>
              </div>
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-coffee-medium/80 to-coffee-dark overflow-hidden card-glow">
                <div className="w-full h-full flex items-center justify-center text-6xl">✨</div>
              </div>
              <div className="aspect-[3/2] rounded-2xl bg-gradient-to-br from-accent/10 to-coffee-medium overflow-hidden card-glow">
                <div className="w-full h-full flex items-center justify-center text-6xl">🌟</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border py-6 px-8">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            take a seat — conversations start here.
          </p>
        </div>
      </div>
    </div>
  );
}
