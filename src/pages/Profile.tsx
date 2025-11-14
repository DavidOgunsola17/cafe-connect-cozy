import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Coffee, Calendar, TrendingUp, X } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Alex Chen");
  const [bio, setBio] = useState("Computer Science @ Stanford | Passionate about AI/ML and startups | Coffee enthusiast");
  const [interests, setInterests] = useState(["AI/ML", "Startups", "Design", "Philosophy"]);
  const [newInterest, setNewInterest] = useState("");
  const [availability, setAvailability] = useState({
    weekdays: true,
    weekends: false,
    mornings: true,
    afternoons: true,
    evenings: false,
  });

  const stats = [
    { label: "total coffeechats", value: "24", icon: Coffee },
    { label: "connections made", value: "18", icon: TrendingUp },
    { label: "upcoming meetings", value: "3", icon: Calendar },
    { label: "profile views", value: "127", icon: User },
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast.success("profile updated successfully");
  };

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  return (
    <main className="flex-1 p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-light tracking-wide text-foreground">
            your profile
          </h1>
          <p className="text-muted-foreground mt-2">manage your coffeechat presence</p>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              cancel
            </Button>
            <Button onClick={handleSave}>save changes</Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>edit profile</Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="card-glow">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl md:text-3xl font-light text-foreground">
                    {stat.value}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Profile Content */}
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="about" className="flex-1 sm:flex-none">about</TabsTrigger>
          <TabsTrigger value="interests" className="flex-1 sm:flex-none">interests</TabsTrigger>
          <TabsTrigger value="availability" className="flex-1 sm:flex-none">availability</TabsTrigger>
        </TabsList>

        {/* About Tab */}
        <TabsContent value="about" className="space-y-6">
          <Card className="card-glow">
            <CardHeader>
              <CardTitle>profile information</CardTitle>
              <CardDescription>your public profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    change photo
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  className="max-w-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  className="resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interests Tab */}
        <TabsContent value="interests" className="space-y-6">
          <Card className="card-glow">
            <CardHeader>
              <CardTitle>interests & topics</CardTitle>
              <CardDescription>what you'd love to chat about over coffee</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant="secondary"
                    className="px-3 py-1 text-sm flex items-center gap-2"
                  >
                    {interest}
                    {isEditing && (
                      <button
                        onClick={() => removeInterest(interest)}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>

              {isEditing && (
                <div className="flex gap-2 max-w-md">
                  <Input
                    placeholder="add new interest..."
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addInterest()}
                  />
                  <Button onClick={addInterest}>add</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Availability Tab */}
        <TabsContent value="availability" className="space-y-6">
          <Card className="card-glow">
            <CardHeader>
              <CardTitle>availability preferences</CardTitle>
              <CardDescription>when you're typically free for coffeeChats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base mb-3 block">days of the week</Label>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant={availability.weekdays ? "default" : "outline"}
                      onClick={() =>
                        isEditing &&
                        setAvailability({ ...availability, weekdays: !availability.weekdays })
                      }
                      disabled={!isEditing}
                      className="flex-1 sm:flex-none"
                    >
                      weekdays
                    </Button>
                    <Button
                      variant={availability.weekends ? "default" : "outline"}
                      onClick={() =>
                        isEditing &&
                        setAvailability({ ...availability, weekends: !availability.weekends })
                      }
                      disabled={!isEditing}
                      className="flex-1 sm:flex-none"
                    >
                      weekends
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-base mb-3 block">time of day</Label>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant={availability.mornings ? "default" : "outline"}
                      onClick={() =>
                        isEditing &&
                        setAvailability({ ...availability, mornings: !availability.mornings })
                      }
                      disabled={!isEditing}
                      className="flex-1 sm:flex-none"
                    >
                      mornings
                    </Button>
                    <Button
                      variant={availability.afternoons ? "default" : "outline"}
                      onClick={() =>
                        isEditing &&
                        setAvailability({ ...availability, afternoons: !availability.afternoons })
                      }
                      disabled={!isEditing}
                      className="flex-1 sm:flex-none"
                    >
                      afternoons
                    </Button>
                    <Button
                      variant={availability.evenings ? "default" : "outline"}
                      onClick={() =>
                        isEditing &&
                        setAvailability({ ...availability, evenings: !availability.evenings })
                      }
                      disabled={!isEditing}
                      className="flex-1 sm:flex-none"
                    >
                      evenings
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
