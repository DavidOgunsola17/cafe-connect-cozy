import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BottomNav } from "@/components/BottomNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Coffee } from "lucide-react";
import Index from "./pages/Index";
import Cafes from "./pages/Cafes";
import FindMatch from "./pages/FindMatch";
import Meetings from "./pages/Meetings";
import Opportunities from "./pages/Opportunities";
import OpportunityDetails from "./pages/OpportunityDetails";
import Spotlight from "./pages/Spotlight";
import Scheduler from "./pages/Scheduler";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <SidebarInset className="flex-1">
              <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b border-border bg-background/80 backdrop-blur-lg px-4 md:px-6">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="hidden md:flex" />
                  <Link to="/" className="flex md:hidden items-center gap-2">
                    <div className="relative w-5 h-5">
                      <Coffee className="w-5 h-5 text-accent" />
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-bold text-accent">
                        $
                      </span>
                    </div>
                    <span className="text-lg font-semibold tracking-wide text-foreground">
                      coffeechat
                    </span>
                  </Link>
                </div>
                <Link to="/profile" className="hover:opacity-80 transition-opacity">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                </Link>
              </header>
              <div className="pb-16 md:pb-0">
                <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/cafes" element={<Cafes />} />
                <Route path="/find-match" element={<FindMatch />} />
                <Route path="/meetings" element={<Meetings />} />
                <Route path="/opportunities" element={<Opportunities />} />
                <Route path="/opportunities/:id" element={<OpportunityDetails />} />
                <Route path="/spotlight" element={<Spotlight />} />
                <Route path="/scheduler" element={<Scheduler />} />
                <Route path="/profile" element={<Profile />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              </div>
            </SidebarInset>
            <BottomNav />
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
