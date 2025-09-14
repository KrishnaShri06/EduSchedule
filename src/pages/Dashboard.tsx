import { Calendar, Users, MapPin, Clock, Plus, Upload, Eye, Share } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const quickActions = [
  {
    title: "Upload Data",
    description: "Import CSV/Excel files",
    icon: Upload,
    action: "upload",
  },
  {
    title: "Generate Timetable",
    description: "Start new generation",
    icon: Plus,
    action: "generate",
  },
  {
    title: "View Last Timetable",
    description: "Review previous version",
    icon: Eye,
    action: "view",
  },
  {
    title: "Publish Schedule",
    description: "Make public/internal",
    icon: Share,
    action: "publish",
  },
];

const recentActivities = [
  {
    id: 1,
    action: "Timetable Generated",
    details: "Version 2.3 created for Spring 2024",
    time: "2 hours ago",
    status: "success",
  },
  {
    id: 2,
    action: "Faculty Updated",
    details: "Dr. Smith added to Computer Science",
    time: "4 hours ago",
    status: "info",
  },
  {
    id: 3,
    action: "Room Conflict",
    details: "Lab-101 double booking detected",
    time: "6 hours ago",
    status: "warning",
  },
  {
    id: 4,
    action: "Schedule Published",
    details: "Version 2.2 made public",
    time: "1 day ago",
    status: "success",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your timetable management system
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Room Utilization"
          value="78%"
          subtitle="Average across all rooms"
          icon={<MapPin className="h-5 w-5" />}
          trend={{ value: 5.2, label: "from last week" }}
          status="success"
        />
        <KPICard
          title="Active Timetables"
          value="12"
          subtitle="Currently published"
          icon={<Calendar className="h-5 w-5" />}
          trend={{ value: 2, label: "new this month" }}
          status="success"
        />
        <KPICard
          title="Faculty Load"
          value="24.5"
          subtitle="Avg hours per week"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: -1.2, label: "from last term" }}
          status="warning"
        />
        <KPICard
          title="Pending Approvals"
          value="3"
          subtitle="Require your attention"
          icon={<Clock className="h-5 w-5" />}
          status="error"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-2 kpi-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to manage your timetables
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {quickActions.map((action) => (
                <Button
                  key={action.action}
                  variant="ghost"
                  className="h-auto p-4 justify-start hover:bg-accent/50 hover:scale-[1.02] transition-all"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <action.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{action.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="kpi-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="mt-1">
                    <Badge 
                      variant={activity.status === 'success' ? 'default' : 
                              activity.status === 'warning' ? 'secondary' : 
                              'outline'}
                      className="h-2 w-2 p-0 rounded-full"
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.details}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mini Calendar Widget */}
      <Card className="kpi-card">
        <CardHeader>
          <CardTitle>This Week's Schedule</CardTitle>
          <CardDescription>Quick overview of current timetable</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2 text-center">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
              <div key={day} className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">{day}</div>
                <div className="space-y-1">
                  <div className="h-8 rounded dept-science text-xs flex items-center justify-center">
                    CS-101
                  </div>
                  <div className="h-8 rounded dept-math text-xs flex items-center justify-center">
                    MATH-201
                  </div>
                  {index < 3 && (
                    <div className="h-8 rounded dept-arts text-xs flex items-center justify-center">
                      ENG-101
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}