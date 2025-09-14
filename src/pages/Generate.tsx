import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TimetableWizard, GeneratedTimetable } from "@/components/wizard/TimetableWizard";
import { Zap, Clock, History, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock recent generation history
const recentGenerations = [
  {
    id: "gen1",
    name: "Fall 2024 - CS Department",
    createdAt: new Date(2024, 8, 10),
    status: "Completed",
    score: 85,
    departments: ["Computer Science"],
    batches: 3
  },
  {
    id: "gen2", 
    name: "Fall 2024 - All Departments",
    createdAt: new Date(2024, 8, 8),
    status: "Completed",
    score: 78,
    departments: ["Computer Science", "Mathematics", "Physics"],
    batches: 7
  },
  {
    id: "gen3",
    name: "Summer 2024 - Evening Shift",
    createdAt: new Date(2024, 7, 15),
    status: "Published",
    score: 91,
    departments: ["English", "Mathematics"],
    batches: 4
  }
];

export default function Generate() {
  const { toast } = useToast();
  const [showWizard, setShowWizard] = useState(false);

  const handleWizardComplete = (timetable: GeneratedTimetable) => {
    toast({
      title: "Timetable Generated Successfully!",
      description: `${timetable.name} has been saved and is ready for use.`,
    });
    setShowWizard(false);
  };

  const handleQuickGenerate = () => {
    setShowWizard(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Timetable Generation</h1>
        <p className="text-muted-foreground">
          Generate optimized timetables with automated conflict resolution
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-all hover:bg-primary/5" onClick={handleQuickGenerate}>
          <CardHeader className="text-center">
            <Zap className="h-8 w-8 mx-auto text-primary mb-2" />
            <CardTitle className="text-lg">Quick Generate</CardTitle>
            <CardDescription>
              Generate with default settings
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Badge variant="secondary">~2 minutes</Badge>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-all hover:bg-primary/5" onClick={() => setShowWizard(true)}>
          <CardHeader className="text-center">
            <Settings className="h-8 w-8 mx-auto text-primary mb-2" />
            <CardTitle className="text-lg">Custom Wizard</CardTitle>
            <CardDescription>
              Full configuration options
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Badge variant="secondary">~5 minutes</Badge>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-all hover:bg-muted/50">
          <CardHeader className="text-center">
            <Clock className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <CardTitle className="text-lg text-muted-foreground">Scheduled</CardTitle>
            <CardDescription>
              Schedule generation job
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Badge variant="outline">Coming Soon</Badge>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-all hover:bg-muted/50">
          <CardHeader className="text-center">
            <History className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <CardTitle className="text-lg text-muted-foreground">Templates</CardTitle>
            <CardDescription>
              Use saved templates
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Badge variant="outline">Coming Soon</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Recent Generations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Recent Generations
          </CardTitle>
          <CardDescription>
            View and manage previously generated timetables
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentGenerations.map((generation) => (
              <div key={generation.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{generation.name}</h4>
                    <Badge 
                      variant={generation.status === "Published" ? "default" : "secondary"}
                    >
                      {generation.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Score: {generation.score}</span>
                    <span>{generation.departments.join(", ")}</span>
                    <span>{generation.batches} batches</span>
                    <span>{generation.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Clone
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Generation Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Generations:</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Success Rate:</span>
                <span className="font-medium text-success">94%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg. Score:</span>
                <span className="font-medium">83</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avg. Time:</span>
                <span className="font-medium">3.2 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Peak Utilization:</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Conflicts Resolved:</span>
                <span className="font-medium">98%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Solver Engine:</span>
                <Badge variant="default" className="bg-success">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Queue:</span>
                <span className="font-medium">Empty</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Update:</span>
                <span className="font-medium">2 min ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wizard Modal */}
      {showWizard && (
        <TimetableWizard
          onClose={() => setShowWizard(false)}
          onComplete={handleWizardComplete}
        />
      )}
    </div>
  );
}