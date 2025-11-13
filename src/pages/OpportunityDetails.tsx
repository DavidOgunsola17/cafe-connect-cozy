import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

// Mock data - in a real app, this would come from a backend
const opportunityData: Record<string, any> = {
  "1": {
    id: "1",
    title: "google step internship",
    organization: "Google",
    type: "internship",
    description: "The STEP (Student Training in Engineering Program) is a 12-week paid internship program designed specifically for first and second-year undergraduate students with a passion for computer science.\n\nDuring the program, you'll work on real Google projects alongside experienced engineers and mentors. You'll gain hands-on experience with Google's tools and technologies while developing your technical skills in a supportive environment.\n\nWhat you'll do:\n• Collaborate with software engineers on meaningful projects\n• Participate in professional development workshops\n• Network with other STEP interns and Google engineers\n• Present your project to the team at the end of the summer\n\nWe're looking for students who are curious, creative problem-solvers with a strong foundation in computer science fundamentals.",
    location: "Mountain View, CA",
    remote: false,
    field: "tech",
    deadline: "February 15, 2024",
    url: "https://careers.google.com/step",
  },
  "2": {
    id: "2",
    title: "thiel fellowship",
    organization: "Thiel Foundation",
    type: "scholarship",
    description: "The Thiel Fellowship is a two-year, $100,000 grant for young people who want to build new things instead of sitting in a classroom.\n\nFounded by entrepreneur and investor Peter Thiel in 2011, the program is designed to encourage young people to pursue big ideas and start companies outside of traditional education.\n\nWhat we offer:\n• $100,000 grant over two years\n• Access to a network of founders, investors, and mentors\n• Regular workshops and events in San Francisco\n• A community of like-minded builders\n\nWe're looking for exceptional individuals under 23 with breakthrough ideas and the determination to bring them to life. Previous fellows have founded companies like Ethereum, Luminar Technologies, and Figma.",
    location: "Remote",
    remote: true,
    field: "entrepreneurship",
    deadline: "January 31, 2024",
    url: "https://thielfellowship.org",
  },
};

export default function OpportunityDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");

  const opportunity = id ? opportunityData[id] : null;

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-background p-6 md:p-8">
        <div className="container mx-auto max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/opportunities")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            back to opportunities
          </Button>
          <Card className="bg-card border-border p-12 text-center">
            <p className="text-muted-foreground">opportunity not found</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/opportunities")}
          className="mb-6 hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          back to opportunities
        </Button>

        <div className="space-y-6">
          {/* Header Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <Badge
                  variant="outline"
                  className="capitalize border-accent/30 text-accent bg-accent/10"
                >
                  {opportunity.type}
                </Badge>
                {opportunity.deadline && (
                  <div className="flex items-center gap-2 text-sm text-accent">
                    <Calendar className="h-4 w-4" />
                    <span>deadline: {opportunity.deadline}</span>
                  </div>
                )}
              </div>
              <CardTitle className="text-3xl text-foreground mb-2">
                {opportunity.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-lg text-muted-foreground">
                <Briefcase className="h-5 w-5" />
                <span>{opportunity.organization}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{opportunity.location}</span>
                {opportunity.remote && (
                  <Badge variant="outline" className="ml-2 border-border">
                    remote
                  </Badge>
                )}
              </div>
              <div className="pt-4">
                <Button
                  className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => window.open(opportunity.url, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  visit website / apply
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Description Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">
                about this opportunity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                {opportunity.description.split("\n\n").map((paragraph: string, index: number) => (
                  <p key={index} className="text-foreground/90 mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">
                personal notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="add your thoughts, questions, or application notes here…"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[120px] bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                these notes are private and only visible to you
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
