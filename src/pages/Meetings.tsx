import { useState } from "react";
import { Calendar, Clock, MapPin, Video, MoreVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Meeting {
  id: string;
  name: string;
  role: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
  avatar?: string;
}

const mockMeetings: Meeting[] = [
  {
    id: "1",
    name: "alex rivera",
    role: "product designer @ figma",
    date: "Mon, Jan 22",
    time: "2:00 PM - 3:00 PM",
    location: "Google Meet",
    status: "upcoming",
  },
  {
    id: "2",
    name: "jordan chen",
    role: "software engineer @ stripe",
    date: "Wed, Jan 24",
    time: "10:00 AM - 11:00 AM",
    location: "Zoom",
    status: "upcoming",
  },
  {
    id: "3",
    name: "taylor smith",
    role: "ux researcher @ spotify",
    date: "Fri, Jan 26",
    time: "3:00 PM - 4:00 PM",
    location: "Google Meet",
    status: "upcoming",
  },
  {
    id: "4",
    name: "sam kumar",
    role: "product manager @ notion",
    date: "Tue, Jan 16",
    time: "1:00 PM - 2:00 PM",
    location: "Zoom",
    status: "completed",
  },
  {
    id: "5",
    name: "riley park",
    role: "marketing lead @ airbnb",
    date: "Thu, Jan 11",
    time: "11:00 AM - 12:00 PM",
    location: "Google Meet",
    status: "completed",
  },
  {
    id: "6",
    name: "casey williams",
    role: "data scientist @ meta",
    date: "Mon, Jan 8",
    time: "4:00 PM - 5:00 PM",
    location: "Cancelled",
    status: "cancelled",
  },
];

export default function Meetings() {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);

  const handleReschedule = (id: string) => {
    toast.success("reschedule request sent");
  };

  const handleCancel = (id: string) => {
    setMeetings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "cancelled" } : m))
    );
    toast.success("coffeechat cancelled");
  };

  const upcomingMeetings = meetings.filter((m) => m.status === "upcoming");
  const pastMeetings = meetings.filter(
    (m) => m.status === "completed" || m.status === "cancelled"
  );

  const MeetingCard = ({ meeting }: { meeting: Meeting }) => (
    <Card className="bg-card border-border hover:border-accent/30 soft-transition">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-start gap-3 flex-1">
          <Avatar className="h-12 w-12 border-2 border-border">
            <AvatarFallback className="bg-secondary text-foreground">
              {meeting.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-base font-medium text-foreground">
              {meeting.name}
            </h3>
            <p className="text-sm text-muted-foreground">{meeting.role}</p>
          </div>
        </div>
        {meeting.status === "upcoming" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border-border">
              <DropdownMenuItem onClick={() => handleReschedule(meeting.id)}>
                reschedule
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleCancel(meeting.id)}
                className="text-destructive"
              >
                cancel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{meeting.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{meeting.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {meeting.status === "cancelled" ? (
            <>
              <X className="h-4 w-4 text-destructive" />
              <span className="text-destructive">{meeting.location}</span>
            </>
          ) : (
            <>
              <Video className="h-4 w-4" />
              <span>{meeting.location}</span>
            </>
          )}
        </div>
        {meeting.status === "upcoming" && (
          <Button className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground">
            join meeting
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-medium text-foreground mb-2">
            your coffeechats ☕
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            manage your upcoming and past conversations
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="bg-secondary border border-border mb-6">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              upcoming ({upcomingMeetings.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              history ({pastMeetings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingMeetings.length === 0 ? (
              <Card className="bg-card border-border p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  no upcoming coffeechats scheduled
                </p>
              </Card>
            ) : (
              <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingMeetings.map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {pastMeetings.length === 0 ? (
              <Card className="bg-card border-border p-12 text-center">
                <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  no past coffeechats yet
                </p>
              </Card>
            ) : (
              <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {pastMeetings.map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
