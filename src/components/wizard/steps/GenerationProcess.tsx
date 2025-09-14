import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, CheckCircle, AlertTriangle, RotateCcw } from "lucide-react";
import type { GeneratedTimetable, WizardScope, WizardConstraints } from "../TimetableWizard";

interface GenerationProcessProps {
  scope: WizardScope;
  constraints: WizardConstraints;
  alternatives: GeneratedTimetable[];
  onAlternativesGenerated: (alternatives: GeneratedTimetable[]) => void;
  isGenerating: boolean;
  onGeneratingChange: (generating: boolean) => void;
}

export function GenerationProcess({ 
  scope, 
  constraints, 
  alternatives,
  onAlternativesGenerated,
  isGenerating,
  onGeneratingChange
}: GenerationProcessProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [generationLog, setGenerationLog] = useState<string[]>([]);

  // Mock generation process
  const generateTimetables = async () => {
    onGeneratingChange(true);
    setProgress(0);
    setGenerationLog([]);
    
    const steps = [
      "Initializing solver engine...",
      "Loading selected data...",
      "Analyzing constraints...",
      "Generating Alternative 1 (Balanced)...",
      "Generating Alternative 2 (Faculty-optimized)...", 
      "Generating Alternative 3 (Room-optimized)...",
      "Analyzing conflicts...",
      "Calculating scores...",
      "Finalizing results..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      setGenerationLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${steps[i]}`]);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
      setProgress(((i + 1) / steps.length) * 100);
    }

    // Generate mock alternatives
    const mockAlternatives: GeneratedTimetable[] = [
      {
        id: "alt1",
        name: "Balanced Solution",
        score: 85,
        conflicts: 0,
        utilization: 78,
        facultyLoad: 82,
        studentGaps: 15,
        data: generateMockTimetableData(),
        metadata: {
          scopeId: scope.departments.join(","),
          constraints,
          generatedAt: new Date(),
          algorithm: "Balanced Heuristic"
        }
      },
      {
        id: "alt2", 
        name: "Faculty-Optimized",
        score: 79,
        conflicts: 2,
        utilization: 71,
        facultyLoad: 95,
        studentGaps: 18,
        data: generateMockTimetableData(),
        metadata: {
          scopeId: scope.departments.join(","),
          constraints,
          generatedAt: new Date(),
          algorithm: "Faculty Load Optimization"
        }
      },
      {
        id: "alt3",
        name: "Room-Optimized", 
        score: 81,
        conflicts: 1,
        utilization: 92,
        facultyLoad: 74,
        studentGaps: 22,
        data: generateMockTimetableData(),
        metadata: {
          scopeId: scope.departments.join(","),
          constraints,
          generatedAt: new Date(),
          algorithm: "Room Utilization Optimization"
        }
      }
    ];

    setCurrentStep("Generation complete!");
    setGenerationLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ✅ Generated ${mockAlternatives.length} alternatives successfully`]);
    
    onAlternativesGenerated(mockAlternatives);
    onGeneratingChange(false);
  };

  const generateMockTimetableData = () => {
    // Generate mock timetable data based on scope
    return [];
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Timetable Generation</h3>
        <p className="text-muted-foreground">
          Generate optimized timetables using advanced algorithms and constraint solving.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generation Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Generation Settings
            </CardTitle>
            <CardDescription>
              Choose algorithm and generation options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={isGenerating ? "secondary" : "default"}
                className="flex flex-col h-auto p-4"
                disabled={isGenerating}
                onClick={generateTimetables}
              >
                <Zap className="h-5 w-5 mb-2" />
                <span className="text-xs">Fast</span>
                <span className="text-xs text-muted-foreground">~2 min</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex flex-col h-auto p-4"
                disabled={isGenerating}
                onClick={generateTimetables}
              >
                <CheckCircle className="h-5 w-5 mb-2" />
                <span className="text-xs">Balanced</span>
                <span className="text-xs text-muted-foreground">~5 min</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex flex-col h-auto p-4"
                disabled={isGenerating}
                onClick={generateTimetables}
              >
                <Clock className="h-5 w-5 mb-2" />
                <span className="text-xs">Strict</span>
                <span className="text-xs text-muted-foreground">~10 min</span>
              </Button>
            </div>

            {isGenerating && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
                
                <div className="text-sm text-muted-foreground">
                  {currentStep}
                </div>
              </div>
            )}

            <div className="pt-4 border-t space-y-3">
              <h4 className="font-medium">Generation Scope</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Departments:</span>
                  <div className="font-medium">{scope.departments.length}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Batches:</span>
                  <div className="font-medium">{scope.batches.length}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Max Classes/Day:</span>
                  <div className="font-medium">{constraints.maxClassesPerDayBatch}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Time Slots:</span>
                  <div className="font-medium">
                    {Object.values(constraints.timeSlots).flat().length}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generation Log */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Generation Log
            </CardTitle>
            <CardDescription>
              Real-time progress and status updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs">
              {generationLog.length === 0 ? (
                <div className="text-muted-foreground italic">
                  Click a generation option to start...
                </div>
              ) : (
                generationLog.map((log, index) => (
                  <div key={index} className="mb-1">
                    {log}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Summary */}
      {alternatives.length > 0 && (
        <Card className="bg-success/5 border-success/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <CheckCircle className="h-5 w-5" />
              Generation Complete
            </CardTitle>
            <CardDescription>
              Successfully generated {alternatives.length} timetable alternatives
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {alternatives.map((alt) => (
                <div key={alt.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{alt.name}</h4>
                    <Badge variant={alt.conflicts === 0 ? "default" : "destructive"}>
                      Score: {alt.score}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Conflicts:</span>
                      <span className={alt.conflicts === 0 ? "text-success" : "text-destructive"}>
                        {alt.conflicts}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Room Utilization:</span>
                      <span>{alt.utilization}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Faculty Load:</span>
                      <span>{alt.facultyLoad}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Student Gaps:</span>
                      <span>{alt.studentGaps}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  onAlternativesGenerated([]);
                  setGenerationLog([]);
                  setProgress(0);
                }}
                disabled={isGenerating}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              
              <div className="text-sm text-muted-foreground">
                Proceed to review and compare the generated alternatives
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}