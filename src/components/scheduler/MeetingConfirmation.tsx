import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { useState } from "react";

interface Profile {
  name: string;
  role: string;
  avatar?: string;
  bio: string;
}

interface MeetingConfirmationProps {
  host: Profile;
  guest: Profile;
  meetingTime: {
    date: string;
    time: string;
  };
  onAddToCalendar: () => void;
  onClose: () => void;
}

export function MeetingConfirmation({
  host,
  guest,
  meetingTime,
  onAddToCalendar,
  onClose,
}: MeetingConfirmationProps) {
  const [notes, setNotes] = useState("");

  return (
    <div className="min-h-screen bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl card-glow border-border/40 bg-card/95 backdrop-blur">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="flex justify-center items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary/20">
              <AvatarImage src={host.avatar} />
              <AvatarFallback className="bg-coffee-medium text-cream text-lg">
                {host.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col items-center gap-1">
              <div className="h-px w-12 bg-border" />
              <span className="text-2xl">☕</span>
              <div className="h-px w-12 bg-border" />
            </div>

            <Avatar className="h-20 w-20 border-2 border-primary/20">
              <AvatarImage src={guest.avatar} />
              <AvatarFallback className="bg-coffee-medium text-cream text-lg">
                {guest.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>

          <div>
            <h2 className="text-3xl font-medium text-foreground mb-2">
              coffeechat confirmed!
            </h2>
            <p className="text-muted-foreground">
              your virtual meetup is all set
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary/30 border border-border/20 space-y-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">host</p>
              <p className="font-medium text-foreground">{host.name}</p>
              <p className="text-sm text-muted-foreground">{host.role}</p>
            </div>

            <div className="p-4 rounded-lg bg-secondary/30 border border-border/20 space-y-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">guest</p>
              <p className="font-medium text-foreground">{guest.name}</p>
              <p className="text-sm text-muted-foreground">{guest.role}</p>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-primary/10 border border-primary/20 space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">{meetingTime.date}</p>
                <p className="text-sm text-muted-foreground">scheduled date</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">{meetingTime.time}</p>
                <p className="text-sm text-muted-foreground">meeting time</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-foreground">Virtual (Link TBD)</p>
                <p className="text-sm text-muted-foreground">meeting link will be sent via email</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              meeting notes (optional)
            </label>
            <Textarea
              placeholder="add topics you'd like to discuss, questions, or context..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] bg-secondary/30 border-border/30 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={onAddToCalendar}
            >
              <ExternalLink className="h-4 w-4" />
              add to calendar
            </Button>
            <Button
              className="flex-1 soft-transition"
              onClick={onClose}
            >
              done
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            you'll receive a confirmation email with meeting details shortly
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
