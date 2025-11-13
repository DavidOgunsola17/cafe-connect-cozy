import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, GraduationCap, DollarSign, Sparkles, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: "scholarship" | "internship" | "job" | "program";
  description: string;
  location: string;
  remote: boolean;
  field: string;
  deadline?: string;
}

const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "google step internship",
    organization: "Google",
    type: "internship",
    description: "12-week paid internship program designed for first and second-year CS students.",
    location: "Mountain View, CA",
    remote: false,
    field: "tech",
    deadline: "Feb 15, 2024",
  },
  {
    id: "2",
    title: "thiel fellowship",
    organization: "Thiel Foundation",
    type: "scholarship",
    description: "$100k grant for young entrepreneurs to pursue their ideas outside of traditional education.",
    location: "Remote",
    remote: true,
    field: "entrepreneurship",
    deadline: "Jan 31, 2024",
  },
  {
    id: "3",
    title: "figma designer role",
    organization: "Figma",
    type: "job",
    description: "join our product design team to shape the future of collaborative design tools.",
    location: "San Francisco, CA",
    remote: true,
    field: "design",
  },
  {
    id: "4",
    title: "rewriting the code fellowship",
    organization: "Rewriting the Code",
    type: "program",
    description: "community for women in tech with exclusive opportunities and mentorship.",
    location: "Remote",
    remote: true,
    field: "tech",
  },
  {
    id: "5",
    title: "stripe internship",
    organization: "Stripe",
    type: "internship",
    description: "summer engineering internship working on payments infrastructure.",
    location: "San Francisco, CA",
    remote: true,
    field: "tech",
    deadline: "Mar 1, 2024",
  },
  {
    id: "6",
    title: "goldwater scholarship",
    organization: "Goldwater Foundation",
    type: "scholarship",
    description: "$7,500 scholarship for students pursuing careers in STEM fields.",
    location: "Remote",
    remote: true,
    field: "stem",
    deadline: "Feb 28, 2024",
  },
  {
    id: "7",
    title: "notion pm internship",
    organization: "Notion",
    type: "internship",
    description: "product management internship building tools used by millions.",
    location: "New York, NY",
    remote: true,
    field: "product",
    deadline: "Feb 20, 2024",
  },
  {
    id: "8",
    title: "y combinator startup school",
    organization: "Y Combinator",
    type: "program",
    description: "free online program for founders with resources and community support.",
    location: "Remote",
    remote: true,
    field: "entrepreneurship",
  },
];

const typeIcons = {
  scholarship: GraduationCap,
  internship: Briefcase,
  job: DollarSign,
  program: Sparkles,
};

export default function Opportunities() {
  const navigate = useNavigate();
  const [opportunities] = useState<Opportunity[]>(mockOpportunities);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [fieldFilter, setFieldFilter] = useState<string>("all");

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || opp.type === typeFilter;
    const matchesLocation =
      locationFilter === "all" ||
      (locationFilter === "remote" && opp.remote) ||
      (locationFilter === "on-site" && !opp.remote);
    const matchesField = fieldFilter === "all" || opp.field === fieldFilter;

    return matchesSearch && matchesType && matchesLocation && matchesField;
  });

  const handleLearnMore = (id: string) => {
    navigate(`/opportunities/${id}`);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-medium text-foreground">
              opportunities ✨
            </h1>
            <Badge className="bg-accent/10 text-accent border-accent/20">
              {filteredOpportunities.length} available
            </Badge>
          </div>
          <p className="text-muted-foreground">
            curated scholarships, internships, jobs, and programs
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <Input
            placeholder="search by name, organization, or keyword…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-input border-border"
          />
          <div className="flex flex-wrap gap-3">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px] bg-input border-border">
                <SelectValue placeholder="type" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">all types</SelectItem>
                <SelectItem value="scholarship">scholarships</SelectItem>
                <SelectItem value="internship">internships</SelectItem>
                <SelectItem value="job">jobs</SelectItem>
                <SelectItem value="program">programs</SelectItem>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[180px] bg-input border-border">
                <SelectValue placeholder="location" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">all locations</SelectItem>
                <SelectItem value="remote">remote</SelectItem>
                <SelectItem value="on-site">on-site</SelectItem>
              </SelectContent>
            </Select>

            <Select value={fieldFilter} onValueChange={setFieldFilter}>
              <SelectTrigger className="w-[180px] bg-input border-border">
                <SelectValue placeholder="field" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">all fields</SelectItem>
                <SelectItem value="tech">tech</SelectItem>
                <SelectItem value="design">design</SelectItem>
                <SelectItem value="product">product</SelectItem>
                <SelectItem value="entrepreneurship">entrepreneurship</SelectItem>
                <SelectItem value="stem">stem</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredOpportunities.map((opp) => {
            const Icon = typeIcons[opp.type];
            return (
              <Card
                key={opp.id}
                className="bg-card border-border hover:border-accent/30 soft-transition cursor-pointer"
                onClick={() => handleLearnMore(opp.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Icon className="h-5 w-5 text-accent" />
                    <Badge
                      variant="outline"
                      className="capitalize border-border text-muted-foreground"
                    >
                      {opp.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-foreground">
                    {opp.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {opp.organization}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-foreground/80 line-clamp-2">
                    {opp.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{opp.location}</span>
                  </div>
                  {opp.deadline && (
                    <div className="text-xs text-accent">
                      deadline: {opp.deadline}
                    </div>
                  )}
                  <Button
                    variant="outline"
                    className="w-full mt-2 border-border hover:bg-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLearnMore(opp.id);
                    }}
                  >
                    learn more
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredOpportunities.length === 0 && (
          <Card className="bg-card border-border p-12 text-center">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              no opportunities match your filters
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
