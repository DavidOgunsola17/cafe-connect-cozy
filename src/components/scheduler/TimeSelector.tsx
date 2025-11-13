import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, X } from "lucide-react";

interface TimeSlot {
  id: string;
  date: string;
  time: string;
}

interface TimeSelectorProps {
  onSlotsConfirmed: (slots: TimeSlot[]) => void;
  onCancel: () => void;
}

// Mock available time slots
const mockAvailability = [
  { id: "1", date: "Mon, Jan 15", time: "2:00 PM - 3:00 PM" },
  { id: "2", date: "Mon, Jan 15", time: "4:00 PM - 5:00 PM" },
  { id: "3", date: "Tue, Jan 16", time: "10:00 AM - 11:00 AM" },
  { id: "4", date: "Tue, Jan 16", time: "3:00 PM - 4:00 PM" },
  { id: "5", date: "Wed, Jan 17", time: "1:00 PM - 2:00 PM" },
  { id: "6", date: "Wed, Jan 17", time: "5:00 PM - 6:00 PM" },
  { id: "7", date: "Thu, Jan 18", time: "11:00 AM - 12:00 PM" },
  { id: "8", date: "Thu, Jan 18", time: "2:00 PM - 3:00 PM" },
];

export function TimeSelector({ onSlotsConfirmed, onCancel }: TimeSelectorProps) {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const toggleSlot = (slotId: string) => {
    setSelectedSlots(prev =>
      prev.includes(slotId)
        ? prev.filter(id => id !== slotId)
        : [...prev, slotId]
    );
  };

  const handleConfirm = () => {
    const slots = mockAvailability.filter(slot => selectedSlots.includes(slot.id));
    onSlotsConfirmed(slots);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto card-glow border-border/40 bg-card/95 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">share your availability</CardTitle>
            <CardDescription className="mt-2">
              select 3-5 times that work for you
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Calendar className="h-3 w-3" />
            {selectedSlots.length} selected
          </Badge>
          {selectedSlots.length >= 3 && selectedSlots.length <= 5 && (
            <span className="text-xs text-muted-foreground">✓ perfect range</span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mockAvailability.map((slot) => {
            const isSelected = selectedSlots.includes(slot.id);
            return (
              <Button
                key={slot.id}
                variant={isSelected ? "default" : "outline"}
                className="justify-start h-auto py-4 px-4 soft-transition"
                onClick={() => toggleSlot(slot.id)}
              >
                {isSelected ? (
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                ) : (
                  <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
                )}
                <div className="text-left">
                  <div className="font-medium">{slot.date}</div>
                  <div className="text-xs opacity-80">{slot.time}</div>
                </div>
              </Button>
            );
          })}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onCancel}
          >
            cancel
          </Button>
          <Button
            className="flex-1 soft-transition"
            disabled={selectedSlots.length < 3}
            onClick={handleConfirm}
          >
            continue with {selectedSlots.length} {selectedSlots.length === 1 ? 'slot' : 'slots'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
