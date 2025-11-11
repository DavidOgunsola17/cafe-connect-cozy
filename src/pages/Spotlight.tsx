import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MessageCircle, Users } from "lucide-react";

const mentors = [
  {
    id: 1,
    name: "dr. sarah chen",
    role: "senior product designer @ google",
    topic: "breaking into big tech design",
    date: "friday, 3pm est",
    attendees: 24,
  },
  {
    id: 2,
    name: "marcus johnson",
    role: "founder @ techstartup",
    topic: "building your first startup",
    date: "monday, 6pm est",
    attendees: 18,
  },
  {
    id: 3,
    name: "emily rodriguez",
    role: "ml engineer @ openai",
    topic: "ai careers for beginners",
    date: "wednesday, 4pm est",
    attendees: 32,
  },
];

export default function Spotlight() {
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 0) {
      setIsAuthenticated(true);
    }
  };

  const currentMentor = mentors.find(m => m.id === selectedMentor);

  if (selectedMentor && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-12 px-6">
          <div className="container mx-auto max-w-md">
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-semibold text-foreground mb-3">join session</h1>
                <p className="text-muted-foreground">password please ☕</p>
              </div>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="bg-card p-8 rounded-2xl border border-border card-glow">
                  <Input
                    type="password"
                    placeholder="enter password (hint: espresso789)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-xl"
                  />
                  <p className="text-xs text-muted-foreground mt-2">psst... try "espresso789"</p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-6 soft-transition"
                >
                  join session
                </Button>
                
                <Button 
                  type="button"
                  variant="ghost"
                  onClick={() => setSelectedMentor(null)}
                  className="w-full text-muted-foreground hover:text-foreground rounded-xl"
                >
                  back to spotlight
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMentor && isAuthenticated && currentMentor) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-semibold text-foreground">{currentMentor.topic}</h1>
                <Button 
                  variant="ghost"
                  onClick={() => {
                    setSelectedMentor(null);
                    setIsAuthenticated(false);
                    setPassword("");
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  leave session
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Video Area */}
                <div className="md:col-span-2 bg-card rounded-2xl border border-border p-8 card-glow">
                  <div className="aspect-video bg-coffee-dark rounded-xl flex items-center justify-center mb-6">
                    <p className="text-muted-foreground text-lg">session starting soon...</p>
                  </div>
                  
                  <div className="space-y-3">
                    <h2 className="text-2xl font-medium text-foreground">{currentMentor.name}</h2>
                    <p className="text-accent">{currentMentor.role}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {currentMentor.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {currentMentor.attendees} attending
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Sidebar */}
                <div className="bg-card rounded-2xl border border-border p-6 card-glow">
                  <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    live chat
                  </h3>
                  <div className="h-96 overflow-y-auto space-y-3 mb-4">
                    <div className="bg-secondary p-3 rounded-xl">
                      <span className="text-accent text-sm font-medium">alex</span>
                      <p className="text-foreground text-sm mt-1">super excited for this session!</p>
                    </div>
                    <div className="bg-secondary p-3 rounded-xl">
                      <span className="text-accent text-sm font-medium">jordan</span>
                      <p className="text-foreground text-sm mt-1">can't wait to hear your insights</p>
                    </div>
                  </div>
                  <Input
                    placeholder="say something..."
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-semibold text-foreground mb-4">spotlight sessions</h1>
              <p className="text-muted-foreground text-lg">connect with mentors, learn from the best</p>
            </div>

            <div className="space-y-6">
              {mentors.map((mentor, idx) => (
                <div
                  key={mentor.id}
                  className="bg-card rounded-2xl border border-border p-8 card-glow hover:border-accent transition-all cursor-pointer group animate-slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  onClick={() => setSelectedMentor(mentor.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-medium text-foreground mb-2">{mentor.topic}</h3>
                      <p className="text-accent mb-4">{mentor.name} · {mentor.role}</p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {mentor.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {mentor.attendees} attending
                        </div>
                      </div>
                    </div>
                    <Button className="bg-secondary hover:bg-secondary/80 text-foreground rounded-xl soft-transition group-hover:bg-primary group-hover:text-primary-foreground px-8">
                      join session
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">more sessions coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
