import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User, Users } from "lucide-react";

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Sample timetable data
const timetableData = [
  {
    day: "Monday",
    time: "09:00",
    subject: "CS-101",
    title: "Introduction to Programming",
    faculty: "Dr. Sarah Johnson",
    room: "Lab-101",
    batch: "CS2024A",
    department: "Computer Science",
    type: "Lab"
  },
  {
    day: "Monday",
    time: "11:00",
    subject: "MATH-201",
    title: "Calculus II",
    faculty: "Prof. Michael Chen",
    room: "Room-205",
    batch: "CS2024A",
    department: "Mathematics",
    type: "Lecture"
  },
  {
    day: "Tuesday",
    time: "10:00",
    subject: "PHY-201",
    title: "Quantum Physics",
    faculty: "Dr. Emily Davis",
    room: "Physics Lab",
    batch: "PHY2024A",
    department: "Physics",
    type: "Lab"
  },
  {
    day: "Wednesday",
    time: "09:00",
    subject: "ENG-101",
    title: "English Composition",
    faculty: "Prof. Robert Wilson",
    room: "Room-301",
    batch: "ENG2024A",
    department: "English",
    type: "Lecture"
  },
  {
    day: "Friday",
    time: "14:00",
    subject: "CS-201",
    title: "Data Structures",
    faculty: "Dr. Sarah Johnson",
    room: "Lab-102",
    batch: "CS2024A",
    department: "Computer Science",
    type: "Lab",
    conflict: true
  },
];

interface TimetableGridProps {
  title?: string;
  description?: string;
  viewMode?: "week" | "batch" | "faculty";
  selectedEntity?: string;
}

export function TimetableGrid({ 
  title = "Weekly Timetable", 
  description = "Current semester schedule",
  viewMode = "week",
  selectedEntity 
}: TimetableGridProps) {
  
  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Computer Science":
        return "dept-science";
      case "Mathematics":
        return "dept-math";
      case "Physics":
        return "dept-science";
      case "English":
        return "dept-arts";
      default:
        return "dept-commerce";
    }
  };

  const getClassForSlot = (day: string, time: string) => {
    return timetableData.find(item => item.day === day && item.time === time);
  };

  return (
    <Card className="kpi-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="timetable-grid">
          {/* Header row with days */}
          <div className="time-slot">Time</div>
          {days.map(day => (
            <div key={day} className="day-header">
              <div className="text-center">
                <div className="font-semibold">{day.slice(0, 3)}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(2024, 0, days.indexOf(day) + 1).getDate()}
                </div>
              </div>
            </div>
          ))}

          {/* Time slots and classes */}
          {timeSlots.map(time => (
            <>
              <div key={`time-${time}`} className="time-slot">
                <div className="text-center">
                  <div className="font-medium">{time}</div>
                  <div className="text-xs">
                    {time === "12:00" ? "Lunch" : 
                     parseInt(time) >= 13 ? "PM" : "AM"}
                  </div>
                </div>
              </div>
              {days.map(day => {
                const classData = getClassForSlot(day, time);
                
                if (classData) {
                  return (
                    <div
                      key={`${day}-${time}`}
                      className={`class-slot occupied ${getDepartmentColor(classData.department)} ${
                        classData.conflict ? "conflict" : ""
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="font-semibold text-xs">{classData.subject}</div>
                        <div className="text-xs opacity-90 line-clamp-1">
                          {classData.title}
                        </div>
                        <div className="flex items-center gap-1 text-xs opacity-80">
                          <User className="h-3 w-3" />
                          <span className="truncate">{classData.faculty.split(' ')[0]}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs opacity-80">
                          <MapPin className="h-3 w-3" />
                          <span>{classData.room}</span>
                        </div>
                        {classData.conflict && (
                          <Badge variant="destructive" className="text-[10px] px-1 py-0">
                            Conflict
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                }
                
                return (
                  <div
                    key={`${day}-${time}`}
                    className="class-slot bg-muted/20 border-dashed border-2 border-muted-foreground/20 hover:border-primary/40 hover:bg-primary/5 flex items-center justify-center text-muted-foreground"
                  >
                    <span className="text-xs">Free</span>
                  </div>
                );
              })}
            </>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded dept-science"></div>
            <span className="text-sm text-muted-foreground">Science</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded dept-math"></div>
            <span className="text-sm text-muted-foreground">Mathematics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded dept-arts"></div>
            <span className="text-sm text-muted-foreground">Arts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded dept-commerce"></div>
            <span className="text-sm text-muted-foreground">Commerce</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}