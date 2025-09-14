import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimetableGrid } from "@/components/timetable/TimetableGrid";
import { Eye, BarChart3, AlertTriangle, CheckCircle, Users, MapPin, Clock } from "lucide-react";
import type { GeneratedTimetable, WizardScope, WizardConstraints } from "../TimetableWizard";

interface AlternativesReviewProps {
  alternatives: GeneratedTimetable[];
  selectedAlternative: string | null;
  onSelectAlternative: (id: string) => void;
  scope: WizardScope;
  constraints: WizardConstraints;
}

export function AlternativesReview({
  alternatives,
  selectedAlternative,
  onSelectAlternative,
  scope,
  constraints
}: AlternativesReviewProps) {
  const [compareMode, setCompareMode] = useState(false);
  const [viewingAlternative, setViewingAlternative] = useState<string | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getConflictBadge = (conflicts: number) => {
    if (conflicts === 0) return <Badge variant="default" className="bg-success">No Conflicts</Badge>;
    if (conflicts <= 2) return <Badge variant="destructive">Low Conflicts</Badge>;
    return <Badge variant="destructive">High Conflicts</Badge>;
  };

  const selectedTimetable = alternatives.find(alt => alt.id === selectedAlternative);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">Review & Compare Alternatives</h3>
          <p className="text-muted-foreground">
            Analyze generated timetables and select the best option for your needs.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={compareMode ? "default" : "outline"}
            onClick={() => setCompareMode(!compareMode)}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Compare Mode
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed" disabled={!selectedAlternative}>
            Detailed View
          </TabsTrigger>
          <TabsTrigger value="conflicts" disabled={!selectedAlternative}>
            Conflict Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Alternative Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {alternatives.map((alt) => (
              <Card 
                key={alt.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedAlternative === alt.id 
                    ? "ring-2 ring-primary bg-primary/5" 
                    : "hover:bg-muted/30"
                }`}
                onClick={() => onSelectAlternative(alt.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{alt.name}</CardTitle>
                    {selectedAlternative === alt.id && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <CardDescription className="text-xs">
                    Generated using {alt.metadata.algorithm}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Score */}
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(alt.score)}`}>
                      {alt.score}
                    </div>
                    <div className="text-sm text-muted-foreground">Overall Score</div>
                  </div>

                  {/* Conflicts */}
                  <div className="flex justify-center">
                    {getConflictBadge(alt.conflicts)}
                  </div>

                  {/* Metrics */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Room Utilization
                      </span>
                      <span className="font-medium">{alt.utilization}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Faculty Load
                      </span>
                      <span className="font-medium">{alt.facultyLoad}%</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Student Gaps
                      </span>
                      <span className="font-medium">{alt.studentGaps}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewingAlternative(alt.id);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparison Chart */}
          {compareMode && (
            <Card>
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
                <CardDescription>
                  Compare key metrics across all generated alternatives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Alternative</th>
                        <th className="text-center p-2">Score</th>
                        <th className="text-center p-2">Conflicts</th>
                        <th className="text-center p-2">Room Util.</th>
                        <th className="text-center p-2">Faculty Load</th>
                        <th className="text-center p-2">Student Gaps</th>
                      </tr>
                    </thead>
                    <tbody>
                      {alternatives.map((alt) => (
                        <tr 
                          key={alt.id} 
                          className={`border-b hover:bg-muted/30 ${
                            selectedAlternative === alt.id ? "bg-primary/10" : ""
                          }`}
                        >
                          <td className="p-2 font-medium">{alt.name}</td>
                          <td className={`p-2 text-center font-bold ${getScoreColor(alt.score)}`}>
                            {alt.score}
                          </td>
                          <td className="p-2 text-center">
                            {alt.conflicts === 0 ? (
                              <Badge variant="default" className="bg-success text-xs">0</Badge>
                            ) : (
                              <Badge variant="destructive" className="text-xs">
                                {alt.conflicts}
                              </Badge>
                            )}
                          </td>
                          <td className="p-2 text-center">{alt.utilization}%</td>
                          <td className="p-2 text-center">{alt.facultyLoad}%</td>
                          <td className="p-2 text-center">{alt.studentGaps}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {selectedTimetable && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>{selectedTimetable.name} - Detailed View</CardTitle>
                  <CardDescription>
                    Full timetable preview with classes and room assignments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TimetableGrid
                    title="Generated Timetable Preview"
                    description={`${selectedTimetable.name} - Score: ${selectedTimetable.score}`}
                  />
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="conflicts" className="space-y-6">
          {selectedTimetable && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Conflict Analysis
                  </CardTitle>
                  <CardDescription>
                    Detected conflicts and resolution suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedTimetable.conflicts === 0 ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                      <h4 className="font-medium text-success mb-2">No Conflicts Detected</h4>
                      <p className="text-muted-foreground text-sm">
                        This timetable has been successfully generated without any scheduling conflicts.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Mock conflict data */}
                      <div className="p-3 border-l-4 border-destructive bg-destructive/5">
                        <div className="font-medium text-sm">Faculty Double Booking</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Dr. Sarah Johnson scheduled for CS-101 and MATH-201 at Mon 10:00
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          Auto-resolve
                        </Button>
                      </div>
                      
                      <div className="p-3 border-l-4 border-warning bg-warning/5">
                        <div className="font-medium text-sm">Room Capacity Issue</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          CS2024A (45 students) assigned to Room-205 (capacity: 30)
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          Suggest alternatives
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quality Metrics</CardTitle>
                  <CardDescription>
                    Detailed breakdown of timetable quality factors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Room Utilization</span>
                        <span className="font-medium">{selectedTimetable.utilization}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${selectedTimetable.utilization}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Faculty Load Balance</span>
                        <span className="font-medium">{selectedTimetable.facultyLoad}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${selectedTimetable.facultyLoad}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Student Gap Optimization</span>
                        <span className="font-medium">
                          {100 - Math.min(selectedTimetable.studentGaps * 3, 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${100 - Math.min(selectedTimetable.studentGaps * 3, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      Generated on {selectedTimetable.metadata.generatedAt.toLocaleDateString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Algorithm: {selectedTimetable.metadata.algorithm}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}