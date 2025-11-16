import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Video } from "lucide-react";
import { format, isSameDay, parseISO } from "date-fns";

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

interface CalendarViewProps {
  meetings: Meeting[];
}

export function CalendarView({ meetings }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Convert meeting dates to Date objects for comparison
  const meetingDates = meetings
    .filter(m => m.status === "upcoming")
    .map(m => {
      // Parse the date string "Mon, Jan 22" with current year
      const parts = m.date.split(", ");
      const [month, day] = parts[1].split(" ");
      const monthMap: Record<string, number> = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
      };
      return new Date(2024, monthMap[month], parseInt(day));
    });

  // Get meetings for selected date
  const selectedDateMeetings = selectedDate
    ? meetings.filter(m => {
        const parts = m.date.split(", ");
        const [month, day] = parts[1].split(" ");
        const monthMap: Record<string, number> = {
          Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
          Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };
        const meetingDate = new Date(2024, monthMap[month], parseInt(day));
        return isSameDay(meetingDate, selectedDate) && m.status === "upcoming";
      })
    : [];

  return (
    <div className="grid lg:grid-cols-[1fr,400px] gap-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">calendar view</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-lg border border-border bg-card/50"
            modifiers={{
              meeting: meetingDates
            }}
            modifiersStyles={{
              meeting: {
                fontWeight: "bold",
                textDecoration: "underline",
                color: "hsl(var(--accent))"
              }
            }}
          />
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">
            {selectedDate ? format(selectedDate, "EEEE, MMMM d") : "select a date"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDateMeetings.length > 0 ? (
            <div className="space-y-4">
              {selectedDateMeetings.map(meeting => (
                <div
                  key={meeting.id}
                  className="flex gap-3 p-4 rounded-lg bg-secondary/30 border border-border hover:border-accent/30 soft-transition"
                >
                  <Avatar className="h-12 w-12 border-2 border-border flex-shrink-0">
                    <AvatarFallback className="bg-secondary text-foreground">
                      {meeting.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">
                      {meeting.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {meeting.role}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <Clock className="h-3 w-3" />
                        {meeting.time}
                      </Badge>
                      <Badge variant="outline" className="gap-1 text-xs">
                        <Video className="h-3 w-3" />
                        {meeting.location}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>no meetings scheduled</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}