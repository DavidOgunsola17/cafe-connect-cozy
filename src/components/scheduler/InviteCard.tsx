import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface TimeSlot {
  id: string;
  time: string;
  date: string;
}

interface InviteCardProps {
  name: string;
  role: string;
  avatar?: string;
  bio: string;
  goal?: string;
  aiMessage: string;
  timeSlots: TimeSlot[];
  selectedSlot?: string;
  onSelectSlot: (slotId: string) => void;
  onConfirm: () => void;
}

export function InviteCard({
  name,
  role,
  avatar,
  bio,
  goal,
  aiMessage,
  timeSlots,
  selectedSlot,
  onSelectSlot,
  onConfirm,
}: InviteCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto card-glow border-border/40 bg-card/95 backdrop-blur">
      <CardHeader className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={avatar} />
            <AvatarFallback className="bg-coffee-medium text-cream">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-medium text-foreground">{name}</h2>
            <p className="text-muted-foreground">{role}</p>
          </div>
        </div>
        
        <p className="text-foreground/90 leading-relaxed">{bio}</p>
        
        {goal && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary/50 border border-border/30">
            <span className="text-amber-glow">✨</span>
            <p className="text-sm text-foreground/80">{goal}</p>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="p-4 rounded-lg bg-muted/30 border border-border/20">
          <p className="text-sm text-foreground/90 italic leading-relaxed">
            "{aiMessage}"
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>select a time that works for you</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot.id}
                variant={selectedSlot === slot.id ? "default" : "outline"}
                className="justify-start h-auto py-3 px-4 soft-transition"
                onClick={() => onSelectSlot(slot.id)}
              >
                <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium">{slot.date}</div>
                  <div className="text-xs opacity-80">{slot.time}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <Button
          size="lg"
          className="w-full soft-transition"
          disabled={!selectedSlot}
          onClick={onConfirm}
        >
          confirm coffeechat
        </Button>
      </CardContent>
    </Card>
  );
}
