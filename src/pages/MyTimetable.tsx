import { useState } from "react";
import { Download, Share, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimetableGrid } from "@/components/timetable/TimetableGrid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const upcomingClasses = [
  {
    time: "09:00 AM",
    subject: "CS-101",
    title: "Introduction to Programming",
    room: "Lab-101",
    faculty: "Dr. Sarah Johnson",
    type: "Lab",
    status: "upcoming"
  },
  {
    time: "11:00 AM", 
    subject: "MATH-201",
    title: "Calculus II",
    room: "Room-205",
    faculty: "Prof. Michael Chen",
    type: "Lecture",
    status: "current"
  },
  {
    time: "02:00 PM",
    subject: "PHY-201", 
    title: "Quantum Physics",
    room: "Physics Lab",
    faculty: "Dr. Emily Davis",
    type: "Lab",
    status: "upcoming"
  }
];

export default function MyTimetable() {
  const [viewMode, setViewMode] = useState("week");
  const [selectedBatch, setSelectedBatch] = useState("CS2024A");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Timetable</h1>
          <p className="text-muted-foreground">
            Your personalized schedule and upcoming classes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedBatch} onValueChange={setSelectedBatch}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CS2024A">CS Batch A - 2024</SelectItem>
              <SelectItem value="MATH2024A">Math Batch A - 2024</SelectItem>
              <SelectItem value="PHY2024A">Physics Batch A - 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Today's Schedule */}
        <Card className="kpi-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Classes
            </CardTitle>
            <CardDescription>Monday, Dec 14, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border ${
                    classItem.status === 'current' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border bg-muted/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{classItem.time}</span>
                    <Badge 
                      variant={classItem.status === 'current' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {classItem.status === 'current' ? 'Now' : 'Upcoming'}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-sm">{classItem.subject}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {classItem.title}
                  </p>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>{classItem.room}</span>
                    <span>{classItem.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Timetable */}
        <div className="lg:col-span-3">
          <TimetableGrid
            title={`Timetable - ${selectedBatch}`}
            description="Complete weekly schedule"
            viewMode="batch"
            selectedEntity={selectedBatch}
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-primary">24</div>
          <div className="text-sm text-muted-foreground">Classes This Week</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-accent">6</div>
          <div className="text-sm text-muted-foreground">Lab Sessions</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-success">18</div>
          <div className="text-sm text-muted-foreground">Lecture Hours</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-warning">2</div>
          <div className="text-sm text-muted-foreground">Free Periods</div>
        </Card>
      </div>
    </div>
  );
}