import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Clock, Users, MapPin, Target } from "lucide-react";
import type { WizardConstraints, WizardScope } from "../TimetableWizard";

interface ConstraintSettingsProps {
  constraints: WizardConstraints;
  onConstraintsChange: (constraints: WizardConstraints) => void;
  scope: WizardScope;
}

export function ConstraintSettings({ constraints, onConstraintsChange, scope }: ConstraintSettingsProps) {
  
  const updateConstraint = <K extends keyof WizardConstraints>(
    key: K,
    value: WizardConstraints[K]
  ) => {
    onConstraintsChange({
      ...constraints,
      [key]: value
    });
  };

  const updateOptimizationWeight = (key: keyof WizardConstraints['optimizationWeights'], value: number) => {
    const newWeights = {
      ...constraints.optimizationWeights,
      [key]: value / 100
    };
    
    // Ensure weights sum to 1.0
    const total = Object.values(newWeights).reduce((sum, w) => sum + w, 0);
    const normalizedWeights = Object.fromEntries(
      Object.entries(newWeights).map(([k, w]) => [k, w / total])
    ) as WizardConstraints['optimizationWeights'];
    
    updateConstraint('optimizationWeights', normalizedWeights);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Configure Constraints & Preferences</h3>
        <p className="text-muted-foreground">
          Set rules and optimization preferences for timetable generation.
        </p>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Basic Rules
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Time Slots
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="optimization" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Optimization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Class Load Limits
              </CardTitle>
              <CardDescription>
                Set maximum number of classes per day for students and faculty
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="batch-limit">Max Classes per Day (Batch)</Label>
                  <Input
                    id="batch-limit"
                    type="number"
                    min="1"
                    max="10"
                    value={constraints.maxClassesPerDayBatch}
                    onChange={(e) => updateConstraint('maxClassesPerDayBatch', parseInt(e.target.value) || 6)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum classes a student batch can have per day
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="faculty-limit">Max Classes per Day (Faculty)</Label>
                  <Input
                    id="faculty-limit"
                    type="number"
                    min="1"
                    max="12"
                    value={constraints.maxClassesPerDayFaculty}
                    onChange={(e) => updateConstraint('maxClassesPerDayFaculty', parseInt(e.target.value) || 8)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum classes a faculty member can teach per day
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Time Slot Configuration
              </CardTitle>
              <CardDescription>
                Define available time slots for each shift
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Badge variant="secondary">Morning</Badge>
                  </h4>
                  <div className="space-y-2">
                    {constraints.timeSlots.morning.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <span className="text-sm font-mono">{slot}</span>
                        <Badge variant="outline" className="text-xs">
                          {index + 1}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Badge variant="secondary">Afternoon</Badge>
                  </h4>
                  <div className="space-y-2">
                    {constraints.timeSlots.afternoon.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <span className="text-sm font-mono">{slot}</span>
                        <Badge variant="outline" className="text-xs">
                          {index + 5}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Badge variant="secondary">Evening</Badge>
                  </h4>
                  <div className="space-y-2">
                    {constraints.timeSlots.evening.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                        <span className="text-sm font-mono">{slot}</span>
                        <Badge variant="outline" className="text-xs">
                          {index + 9}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Faculty Availability</CardTitle>
                <CardDescription>
                  Set preferred working hours for faculty members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Dr. Sarah Johnson", "Prof. Michael Chen", "Dr. Emily Davis"].map((faculty) => (
                    <div key={faculty} className="p-3 border rounded-lg">
                      <div className="font-medium text-sm mb-2">{faculty}</div>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">Morning</Badge>
                        <Badge variant="secondary" className="text-xs">Afternoon</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Room Restrictions</CardTitle>
                <CardDescription>
                  Special room requirements and restrictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-sm mb-2">Lab Rooms</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Only for subjects requiring lab equipment
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">Computer Lab 1</Badge>
                      <Badge variant="outline" className="text-xs">Physics Lab</Badge>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium text-sm mb-2">Large Halls</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      For batches with 40+ students
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">Lecture Hall 1</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Optimization Weights
              </CardTitle>
              <CardDescription>
                Balance different optimization goals for timetable quality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Faculty Load Balance</Label>
                    <Badge variant="outline">
                      {Math.round(constraints.optimizationWeights.facultyLoad * 100)}%
                    </Badge>
                  </div>
                  <Slider
                    value={[constraints.optimizationWeights.facultyLoad * 100]}
                    onValueChange={(values) => updateOptimizationWeight('facultyLoad', values[0])}
                    max={100}
                    step={5}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Distribute teaching load evenly across faculty members
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Room Utilization</Label>
                    <Badge variant="outline">
                      {Math.round(constraints.optimizationWeights.roomUtilization * 100)}%
                    </Badge>
                  </div>
                  <Slider
                    value={[constraints.optimizationWeights.roomUtilization * 100]}
                    onValueChange={(values) => updateOptimizationWeight('roomUtilization', values[0])}
                    max={100}
                    step={5}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Maximize efficient use of available rooms and facilities
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Minimize Student Gaps</Label>
                    <Badge variant="outline">
                      {Math.round(constraints.optimizationWeights.studentGaps * 100)}%
                    </Badge>
                  </div>
                  <Slider
                    value={[constraints.optimizationWeights.studentGaps * 100]}
                    onValueChange={(values) => updateOptimizationWeight('studentGaps', values[0])}
                    max={100}
                    step={5}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Reduce empty slots between classes for student batches
                  </p>
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-2">Weight Distribution</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary">
                      {Math.round(constraints.optimizationWeights.facultyLoad * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Faculty</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary">
                      {Math.round(constraints.optimizationWeights.roomUtilization * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Rooms</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary">
                      {Math.round(constraints.optimizationWeights.studentGaps * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Gaps</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}