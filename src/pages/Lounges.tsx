import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code, Palette, Briefcase, Heart, Video, Lightbulb } from "lucide-react";

const topics = [
  { id: "tech", name: "tech", icon: Code, color: "text-blue-400" },
  { id: "design", name: "design", icon: Palette, color: "text-pink-400" },
  { id: "business", name: "business", icon: Briefcase, color: "text-green-400" },
  { id: "healthcare", name: "healthcare", icon: Heart, color: "text-red-400" },
  { id: "content", name: "content", icon: Video, color: "text-purple-400" },
  { id: "other", name: "other", icon: Lightbulb, color: "text-yellow-400" },
];

export default function Lounges() {
  const [selectedLounge, setSelectedLounge] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 0) {
      setIsAuthenticated(true);
    }
  };

  const mockPosts = [
    { author: "sarah", topic: "looking for UX mentors in fintech", replies: 12, time: "3h ago" },
    { author: "mike", topic: "anyone here working on AI startups?", replies: 8, time: "5h ago" },
    { author: "emma", topic: "best resources for learning React in 2024?", replies: 24, time: "1d ago" },
  ];

  if (selectedLounge && !isAuthenticated) {
  return (
    <div className="min-h-screen bg-background p-8">
        <div className="pb-12 px-6">
          <div className="container mx-auto max-w-md">
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-semibold text-foreground mb-3">{selectedLounge} lounge</h1>
                <p className="text-muted-foreground">password please ☕</p>
              </div>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="bg-card p-8 rounded-2xl border border-border card-glow">
                  <Input
                    type="password"
                    placeholder="enter password (hint: latte456)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-xl"
                  />
                  <p className="text-xs text-muted-foreground mt-2">psst... try "latte456"</p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-6 soft-transition"
                >
                  enter lounge
                </Button>
                
                <Button 
                  type="button"
                  variant="ghost"
                  onClick={() => setSelectedLounge(null)}
                  className="w-full text-muted-foreground hover:text-foreground rounded-xl"
                >
                  back to lounges
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedLounge && isAuthenticated) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="pb-12 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-semibold text-foreground">{selectedLounge} lounge</h1>
                <Button 
                  variant="ghost"
                  onClick={() => {
                    setSelectedLounge(null);
                    setIsAuthenticated(false);
                    setPassword("");
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  back
                </Button>
              </div>

              <div className="space-y-4">
                {mockPosts.map((post, idx) => (
                  <div 
                    key={idx}
                    className="bg-card rounded-2xl border border-border p-6 card-glow animate-slide-up hover:border-accent transition-colors cursor-pointer"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-accent font-medium">{post.author}</span>
                        <span className="text-muted-foreground text-sm ml-2">{post.time}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{post.replies} replies</span>
                    </div>
                    <p className="text-foreground text-lg">{post.topic}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-card rounded-2xl border border-border p-6 card-glow">
                <Input
                  placeholder="start a conversation..."
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-semibold text-foreground mb-4">lounges</h1>
              <p className="text-muted-foreground text-lg">find your topic, join the conversation</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {topics.map((topic, idx) => {
                const Icon = topic.icon;
                return (
                  <div
                    key={topic.id}
                    className="bg-card rounded-2xl border border-border p-8 card-glow hover:border-accent transition-all cursor-pointer group animate-slide-up"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    onClick={() => setSelectedLounge(topic.name)}
                  >
                    <Icon className={`w-12 h-12 ${topic.color} mb-4 group-hover:scale-110 transition-transform`} />
                    <h3 className="text-2xl font-medium text-foreground mb-2">{topic.name}</h3>
                    <p className="text-muted-foreground mb-4">connect with peers in {topic.name}</p>
                    <Button className="w-full bg-secondary hover:bg-secondary/80 text-foreground rounded-xl soft-transition group-hover:bg-primary group-hover:text-primary-foreground">
                      enter lounge
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
