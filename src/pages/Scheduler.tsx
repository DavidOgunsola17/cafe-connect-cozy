import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { InviteCard } from "@/components/scheduler/InviteCard";
import { TimeSelector } from "@/components/scheduler/TimeSelector";
import { MeetingConfirmation } from "@/components/scheduler/MeetingConfirmation";
import { toast } from "sonner";

type SchedulerStep = "invite" | "select-time" | "confirmation";

interface TimeSlot {
  id: string;
  date: string;
  time: string;
}

// Mock data for demo
const mockProfile = {
  name: "alex rivera",
  role: "product designer @ figma",
  avatar: "",
  bio: "passionate about creating delightful user experiences. coffee enthusiast and design systems advocate.",
  goal: "looking to connect with aspiring designers and share insights on breaking into tech",
};

const mockInviter = {
  name: "jordan smith",
  role: "cs student @ berkeley",
  avatar: "",
  bio: "aspiring product designer with a passion for accessibility and inclusive design",
};

export default function Scheduler() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "send"; // "send" or "receive"
  
  const [step, setStep] = useState<SchedulerStep>("invite");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [confirmedSlot, setConfirmedSlot] = useState<TimeSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([
    { id: "1", date: "Mon, Jan 15", time: "2:00 PM - 3:00 PM" },
    { id: "2", date: "Tue, Jan 16", time: "10:00 AM - 11:00 AM" },
    { id: "3", date: "Wed, Jan 17", time: "1:00 PM - 2:00 PM" },
    { id: "4", date: "Thu, Jan 18", time: "11:00 AM - 12:00 PM" },
    { id: "5", date: "Fri, Jan 19", time: "3:00 PM - 4:00 PM" },
  ]);

  const handleSelectSlot = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const handleConfirmInvite = () => {
    const slot = availableSlots.find(s => s.id === selectedSlot);
    if (slot) {
      setConfirmedSlot(slot);
      setStep("confirmation");
      toast.success("coffeechat confirmed!");
    }
  };

  const handleSlotsConfirmed = (slots: TimeSlot[]) => {
    setAvailableSlots(slots);
    setStep("invite");
    toast.success("availability shared! now send your invite.");
  };

  const handleAddToCalendar = () => {
    toast.success("calendar event created (placeholder)");
  };

  const handleClose = () => {
    navigate("/find-match");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto">
        {step === "select-time" && (
          <TimeSelector
            onSlotsConfirmed={handleSlotsConfirmed}
            onCancel={() => setStep("invite")}
          />
        )}

        {step === "invite" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center max-w-2xl mx-auto">
              <div>
                <h1 className="text-3xl font-medium text-foreground">
                  {mode === "send" ? "send a coffeechat invite" : "you've been invited!"}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {mode === "send" 
                    ? "choose a time that works for you" 
                    : "select a time to meet"}
                </p>
              </div>
              {mode === "send" && (
                <button
                  onClick={() => setStep("select-time")}
                  className="text-sm text-primary hover:underline"
                >
                  change availability
                </button>
              )}
            </div>

            <InviteCard
              name={mockProfile.name}
              role={mockProfile.role}
              avatar={mockProfile.avatar}
              bio={mockProfile.bio}
              goal={mockProfile.goal}
              aiMessage="hey! i noticed we're both interested in design systems and accessibility. would love to grab a virtual coffee and chat about your journey into product design. i'm currently exploring UX as a career path and would really value your perspective!"
              timeSlots={availableSlots}
              selectedSlot={selectedSlot}
              onSelectSlot={handleSelectSlot}
              onConfirm={handleConfirmInvite}
            />
          </div>
        )}

        {step === "confirmation" && confirmedSlot && (
          <MeetingConfirmation
            host={mockProfile}
            guest={mockInviter}
            meetingTime={{
              date: confirmedSlot.date,
              time: confirmedSlot.time,
            }}
            onAddToCalendar={handleAddToCalendar}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
}
