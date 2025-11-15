import { Coffee, Sparkles, Calendar, Target, ArrowRight, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coffee className="w-6 h-6 text-accent animate-float" />
              <span className="text-xl font-semibold tracking-wide text-foreground">
                coffeechat
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild className="hidden lg:inline-flex">
                <Link to="/cafes">explore</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/cafes">get started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">ai-powered networking</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight glow-text max-w-4xl mx-auto">
              network from the best,
              <br />
              be your best.
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              connect with mentors, peers, and opportunities through meaningful coffee chats. 
              ai-powered matching for authentic conversations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link to="/cafes">
                  start networking
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <Link to="/opportunities">view opportunities</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 px-4 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              everything you need to network
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              powerful features designed for meaningful connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="p-8 space-y-4 hover:border-accent/50 transition-all card-glow">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">ai matching</h3>
              <p className="text-muted-foreground leading-relaxed">
                get paired with the right people based on your goals, interests, and career path. 
                smart algorithms ensure quality connections.
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover:border-accent/50 transition-all card-glow">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">coffeechat invites</h3>
              <p className="text-muted-foreground leading-relaxed">
                seamless scheduling with built-in calendar integration. 
                send invites, pick times, and manage all your coffee chats in one place.
              </p>
            </Card>

            <Card className="p-8 space-y-4 hover:border-accent/50 transition-all card-glow">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">opportunities</h3>
              <p className="text-muted-foreground leading-relaxed">
                discover curated scholarships, internships, and jobs. 
                stay updated with opportunities that match your career goals.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              how it works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              three simple steps to meaningful connections
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="relative text-center space-y-4 animate-slide-up">
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                <span className="text-2xl font-bold text-accent">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">set your goals</h3>
              <p className="text-muted-foreground leading-relaxed">
                tell us what you're looking for — mentorship, career advice, 
                or just expanding your network in tech.
              </p>
            </div>

            <div className="relative text-center space-y-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">get matched</h3>
              <p className="text-muted-foreground leading-relaxed">
                our ai connects you with peers and mentors who align with your 
                interests, experience level, and goals.
              </p>
            </div>

            <div className="relative text-center space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">schedule coffeechats</h3>
              <p className="text-muted-foreground leading-relaxed">
                pick a time that works, send an invite, and start building 
                authentic relationships over virtual coffee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="py-20 lg:py-32 px-4 lg:px-8 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              designed for connection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              a clean, intuitive interface that makes networking effortless
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="aspect-video rounded-2xl bg-gradient-to-br from-coffee-medium to-coffee-dark overflow-hidden card-glow">
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <Users className="w-16 h-16 text-accent" />
                  <p className="text-lg text-foreground">discover amazing people</p>
                </div>
              </Card>
              <Card className="aspect-video rounded-2xl bg-gradient-to-br from-accent/20 to-coffee-medium overflow-hidden card-glow">
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <Briefcase className="w-16 h-16 text-accent" />
                  <p className="text-lg text-foreground">explore opportunities</p>
                </div>
              </Card>
            </div>

            <Card className="rounded-2xl bg-gradient-to-br from-coffee-light to-accent/30 overflow-hidden card-glow">
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-12 space-y-6">
                <Calendar className="w-20 h-20 text-accent" />
                <div className="space-y-2">
                  <p className="text-2xl font-semibold text-foreground">seamless scheduling</p>
                  <p className="text-muted-foreground">manage all your coffee chats effortlessly</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 lg:py-32 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground glow-text">
            ready to start networking?
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            join thousands of students and professionals building meaningful connections.
          </p>
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <Link to="/cafes">
              get started for free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">
                © 2024 coffeechat. conversations start here.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/cafes" className="hover:text-foreground transition-colors">explore</Link>
              <Link to="/opportunities" className="hover:text-foreground transition-colors">opportunities</Link>
              <Link to="/spotlight" className="hover:text-foreground transition-colors">spotlight</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
