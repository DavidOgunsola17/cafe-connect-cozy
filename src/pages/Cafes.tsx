import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export default function Cafes() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 0) {
      setIsAuthenticated(true);
    }
  };

  const mockMessages = [
    { sender: "maya", text: "hey everyone! just finished my design portfolio review", time: "2m ago" },
    { sender: "alex", text: "that's awesome maya! would love to see it sometime", time: "1m ago" },
    { sender: "jordan", text: "anyone down for a virtual coffee later today?", time: "just now" },
  ];

  if (!isAuthenticated) {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="pb-12 px-6">
          <div className="container mx-auto max-w-md">
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-semibold text-foreground mb-3">private café</h1>
                <p className="text-muted-foreground">password please ☕</p>
              </div>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="bg-card p-8 rounded-2xl border border-border card-glow">
                  <Input
                    type="password"
                    placeholder="enter password (hint: mocha123)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-xl"
                  />
                  <p className="text-xs text-muted-foreground mt-2">psst... try "mocha123"</p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-6 soft-transition"
                >
                  enter café
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-semibold text-foreground mb-2">welcome to your café</h1>
              <p className="text-muted-foreground">you're in your own corner of the café ☕</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Chat Area */}
              <div className="md:col-span-2 bg-card rounded-2xl border border-border p-6 card-glow">
                <div className="space-y-4 mb-6 h-96 overflow-y-auto">
                  {mockMessages.map((msg, idx) => (
                    <div key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="bg-secondary p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-accent font-medium">{msg.sender}</span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-foreground">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="type your message..."
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-xl flex-1"
                  />
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Notes Section */}
              <div className="bg-card rounded-2xl border border-border p-6 card-glow">
                <h3 className="text-lg font-medium text-foreground mb-4">notes</h3>
                <textarea
                  placeholder="jot down ideas, contacts, thoughts..."
                  className="w-full h-80 bg-secondary border border-border rounded-xl p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
