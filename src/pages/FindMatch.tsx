import { useState } from "react";
import { Search, Briefcase, User, LayoutGrid, TableIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const mockProfiles = [
  {
    id: 1,
    name: "sarah chen",
    role: "ux design student",
    tagline: "obsessed with design systems and early-morning espresso runs",
    interests: ["design", "startups", "mentorship"],
    avatar: "",
    bio: "sophomore at stanford studying HCI. looking to connect with designers and founders building consumer products.",
    topics: ["portfolio reviews", "design career paths", "breaking into tech"],
  },
  {
    id: 2,
    name: "marcus williams",
    role: "software engineer",
    tagline: "building ai tools and helping students break into tech",
    interests: ["engineering", "ai/ml", "career advice"],
    avatar: "",
    bio: "senior engineer at a YC startup. love talking about tech careers, side projects, and the future of work.",
    topics: ["technical interviews", "resume tips", "open source contribution"],
  },
  {
    id: 3,
    name: "emma rodriguez",
    role: "product manager",
    tagline: "bridging user needs and business goals, one coffee at a time",
    interests: ["product", "healthcare", "leadership"],
    avatar: "",
    bio: "pm at a healthcare startup. passionate about mentorship and helping students navigate product careers.",
    topics: ["product thinking", "transitioning to pm", "healthcare tech"],
  },
  {
    id: 4,
    name: "alex kim",
    role: "marketing strategist",
    tagline: "storytelling through data and coffee-fueled campaigns",
    interests: ["marketing", "content", "analytics"],
    avatar: "",
    bio: "growth marketer with a background in content creation. happy to chat about marketing careers and building personal brands.",
    topics: ["growth marketing", "content strategy", "social media"],
  },
  {
    id: 5,
    name: "jordan patel",
    role: "business analyst",
    tagline: "crunching numbers and connecting dots in fintech",
    interests: ["finance", "consulting", "data"],
    avatar: "",
    bio: "analyst at a fintech company. interested in helping students break into finance and consulting.",
    topics: ["case interviews", "financial modeling", "career switching"],
  },
  {
    id: 6,
    name: "taylor nguyen",
    role: "frontend developer",
    tagline: "crafting delightful interfaces with react and good vibes",
    interests: ["development", "design", "web3"],
    avatar: "",
    bio: "self-taught developer building web3 products. love talking about coding journeys and remote work.",
    topics: ["learning to code", "freelancing", "web3 basics"],
  },
];

export default function FindMatch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<typeof mockProfiles[0] | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [invitedName, setInvitedName] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const handleSendInvite = (name: string) => {
    setInvitedName(name);
    setShowInviteModal(true);
    setSelectedProfile(null);
  };

  const filteredProfiles = mockProfiles.filter((profile) =>
    searchQuery
      ? profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.interests.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()))
      : true
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="animate-fade-in pt-8 pb-8 flex items-start justify-between">
            <div>
              <h1 className="text-5xl font-semibold text-foreground mb-3">
                find your next coffeechat ☕
              </h1>
              <p className="text-muted-foreground text-lg">
                browse curated matches, your way.
              </p>
            </div>
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(value) => value && setViewMode(value as "grid" | "table")}
              className="bg-card border border-border rounded-xl p-1"
            >
              <ToggleGroupItem
                value="grid"
                aria-label="Grid view"
                className="rounded-lg data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Grid View
              </ToggleGroupItem>
              <ToggleGroupItem
                value="table"
                aria-label="Table view"
                className="rounded-lg data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                <TableIcon className="w-4 h-4 mr-2" />
                Table View
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Filters & Search */}
          <div className="animate-fade-in mb-8 space-y-4" style={{ animationDelay: "0.1s" }}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="search by name, field, or keyword…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground rounded-xl h-12"
                />
              </div>
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="w-[180px] bg-card border-border text-foreground rounded-xl h-12">
                    <Briefcase className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="industry" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all">all industries</SelectItem>
                    <SelectItem value="tech">tech</SelectItem>
                    <SelectItem value="design">design</SelectItem>
                    <SelectItem value="business">business</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[180px] bg-card border-border text-foreground rounded-xl h-12">
                    <User className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="experience" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all">all levels</SelectItem>
                    <SelectItem value="student">student</SelectItem>
                    <SelectItem value="professional">professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredProfiles.map((profile, idx) => (
                <div
                  key={profile.id}
                  className="bg-card rounded-2xl border border-border p-6 card-glow hover:border-accent transition-all cursor-pointer group animate-slide-up"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                  onClick={() => setSelectedProfile(profile)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback className="bg-secondary text-foreground">
                        {profile.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-medium text-foreground mb-1">
                        {profile.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{profile.role}</p>
                    </div>
                  </div>

                  <p className="text-foreground/80 text-sm mb-4 line-clamp-2">
                    {profile.tagline}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile.interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="secondary"
                        className="bg-secondary/50 text-foreground border-0"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSendInvite(profile.name);
                    }}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl soft-transition group-hover:bg-accent group-hover:text-accent-foreground"
                  >
                    send coffeechat
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Table View */}
          {viewMode === "table" && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden animate-fade-in">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border">
                    <TableHead className="text-foreground font-medium">Name</TableHead>
                    <TableHead className="text-foreground font-medium">Role / Title</TableHead>
                    <TableHead className="text-foreground font-medium">Interests</TableHead>
                    <TableHead className="text-foreground font-medium">Status</TableHead>
                    <TableHead className="text-foreground font-medium w-[100px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfiles.map((profile) => (
                    <TableRow
                      key={profile.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors border-border"
                      onClick={() => setSelectedProfile(profile)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={profile.avatar} />
                            <AvatarFallback className="bg-secondary text-foreground text-sm">
                              {profile.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-foreground font-medium">{profile.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground/80">{profile.role}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {profile.interests.slice(0, 2).map((interest) => (
                            <Badge
                              key={interest}
                              variant="secondary"
                              className="bg-secondary/50 text-foreground border-0 text-xs"
                            >
                              {interest}
                            </Badge>
                          ))}
                          {profile.interests.length > 2 && (
                            <Badge
                              variant="secondary"
                              className="bg-secondary/50 text-foreground border-0 text-xs"
                            >
                              +{profile.interests.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-accent/20 text-accent border-0">
                          available
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendInvite(profile.name);
                          }}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {filteredProfiles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                no matches found. try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Expanded Profile Panel */}
      {selectedProfile && (
        <Dialog open={!!selectedProfile} onOpenChange={() => setSelectedProfile(null)}>
          <DialogContent className="sm:max-w-[600px] bg-card border-border">
            <DialogHeader>
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedProfile.avatar} />
                  <AvatarFallback className="bg-secondary text-foreground text-lg">
                    {selectedProfile.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <DialogTitle className="text-2xl font-medium text-foreground mb-1">
                    {selectedProfile.name}
                  </DialogTitle>
                  <p className="text-muted-foreground">{selectedProfile.role}</p>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <p className="text-foreground/90 mb-4">{selectedProfile.tagline}</p>
                <p className="text-foreground/80 text-sm">{selectedProfile.bio}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">interests</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProfile.interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="secondary"
                      className="bg-secondary/50 text-foreground border-0"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">
                  conversation topics
                </h4>
                <ul className="space-y-2">
                  {selectedProfile.topics.map((topic) => (
                    <li key={topic} className="text-sm text-foreground/80 flex items-center gap-2">
                      <span className="text-accent">•</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => handleSendInvite(selectedProfile.name)}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                >
                  send coffeechat
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground rounded-xl"
                  onClick={() => setSelectedProfile(null)}
                >
                  open café
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Invite Sent Modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent className="sm:max-w-[400px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium text-foreground">
              invite sent ☕
            </DialogTitle>
            <DialogDescription className="text-muted-foreground pt-2">
              we'll let you know when {invitedName} accepts. ready to meet someone new?
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setShowInviteModal(false)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl mt-4"
          >
            got it
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
