import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock, X } from "lucide-react";
import { format } from "date-fns";

interface TimeSlot {
  id: string;
  date: string;
  time: string;
}

interface TimeSelectorProps {
  onSlotsConfirmed: (slots: TimeSlot[]) => void;
  onCancel: () => void;
}

const availableTimeSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
];

export function TimeSelector({ onSlotsConfirmed, onCancel }: TimeSelectorProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<Record<string, string[]>>({});
  const [step, setStep] = useState<"dates" | "times">("dates");

  const toggleTimeSlot = (dateStr: string, timeSlot: string) => {
    setSelectedSlots(prev => {
      const current = prev[dateStr] || [];
      const exists = current.includes(timeSlot);
      
      if (exists) {
        return {
          ...prev,
          [dateStr]: current.filter(t => t !== timeSlot)
        };
      } else {
        return {
          ...prev,
          [dateStr]: [...current, timeSlot]
        };
      }
    });
  };

  const handleConfirm = () => {
    const slots: TimeSlot[] = [];
    let id = 1;
    
    selectedDates.forEach(date => {
      const dateStr = format(date, "yyyy-MM-dd");
      const times = selectedSlots[dateStr] || [];
      
      times.forEach(time => {
        slots.push({
          id: String(id++),
          date: format(date, "EEE, MMM d"),
          time: time
        });
      });
    });
    
    onSlotsConfirmed(slots);
  };

  const totalSelectedSlots = Object.values(selectedSlots).reduce(
    (sum, times) => sum + times.length,
    0
  );

  const canProceed = step === "dates" 
    ? selectedDates.length > 0 
    : totalSelectedSlots >= 3;

  return (
    <Card className="w-full max-w-4xl mx-auto card-glow border-border/40 bg-card/95 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">
              {step === "dates" ? "select available dates" : "choose time slots"}
            </CardTitle>
            <CardDescription className="mt-2">
              {step === "dates" 
                ? "pick the days you're available" 
                : "select 3-5 time slots across your chosen dates"}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {step === "dates" ? (
          <>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <CalendarIcon className="h-3 w-3" />
                {selectedDates.length} {selectedDates.length === 1 ? 'date' : 'dates'} selected
              </Badge>
            </div>

            <div className="flex justify-center">
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={(dates) => {
                  if (dates) {
                    setSelectedDates(Array.isArray(dates) ? dates : [dates]);
                  }
                }}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="rounded-lg border border-border bg-card/50"
              />
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
                disabled={!canProceed}
                onClick={() => setStep("times")}
              >
                continue to time slots
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                {totalSelectedSlots} {totalSelectedSlots === 1 ? 'slot' : 'slots'} selected
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep("dates")}
              >
                ← back to dates
              </Button>
            </div>

            {totalSelectedSlots >= 3 && totalSelectedSlots <= 5 && (
              <div className="text-xs text-muted-foreground text-center">
                ✓ perfect range
              </div>
            )}

            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
              {selectedDates.map(date => {
                const dateStr = format(date, "yyyy-MM-dd");
                const dateLabel = format(date, "EEEE, MMMM d");
                const selectedTimes = selectedSlots[dateStr] || [];

                return (
                  <div key={dateStr} className="space-y-3">
                    <h3 className="text-sm font-medium text-foreground sticky top-0 bg-card pt-2 pb-2 z-10">
                      {dateLabel}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {availableTimeSlots.map(timeSlot => {
                        const isSelected = selectedTimes.includes(timeSlot);
                        return (
                          <Button
                            key={timeSlot}
                            variant={isSelected ? "default" : "outline"}
                            className="justify-center h-auto py-3 text-sm soft-transition"
                            onClick={() => toggleTimeSlot(dateStr, timeSlot)}
                          >
                            {timeSlot}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                className="flex-1"
                onClick={onCancel}
              >
                cancel
              </Button>
              <Button
                className="flex-1 soft-transition"
                disabled={!canProceed}
                onClick={handleConfirm}
              >
                confirm {totalSelectedSlots} {totalSelectedSlots === 1 ? 'slot' : 'slots'}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
