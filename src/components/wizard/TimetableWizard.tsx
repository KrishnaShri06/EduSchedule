import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle, Settings, Zap, Clock } from "lucide-react";
import { ScopeSelection } from "./steps/ScopeSelection";
import { ConstraintSettings } from "./steps/ConstraintSettings";
import { GenerationProcess } from "./steps/GenerationProcess";
import { AlternativesReview } from "./steps/AlternativesReview";
import { SavePublish } from "./steps/SavePublish";

export interface GeneratedTimetable {
  id: string;
  name: string;
  score: number;
  conflicts: number;
  utilization: number;
  facultyLoad: number;
  studentGaps: number;
  data: any[];
  metadata: {
    scopeId: string;
    constraints: any;
    generatedAt: Date;
    algorithm: string;
  };
}

export interface WizardScope {
  departments: string[];
  semesters: string[];
  shifts: string[];
  batches: string[];
}

export interface WizardConstraints {
  maxClassesPerDayBatch: number;
  maxClassesPerDayFaculty: number;
  timeSlots: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
  facultyAvailability: Record<string, string[]>;
  roomRestrictions: Record<string, string[]>;
  optimizationWeights: {
    facultyLoad: number;
    roomUtilization: number;
    studentGaps: number;
  };
}

const wizardSteps = [
  {
    id: "scope",
    title: "Select Scope",
    description: "Choose departments, semesters, and batches",
    icon: Settings
  },
  {
    id: "constraints",
    title: "Apply Constraints",
    description: "Set rules and preferences",
    icon: CheckCircle
  },
  {
    id: "generate",
    title: "Generate",
    description: "Run the timetable algorithm",
    icon: Zap
  },
  {
    id: "review",
    title: "Review Alternatives",
    description: "Compare generated options",
    icon: Clock
  },
  {
    id: "save",
    title: "Save & Publish",
    description: "Finalize and export",
    icon: CheckCircle
  }
];

interface TimetableWizardProps {
  onClose: () => void;
  onComplete: (timetable: GeneratedTimetable) => void;
}

export function TimetableWizard({ onClose, onComplete }: TimetableWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scope, setScope] = useState<WizardScope>({
    departments: [],
    semesters: [],
    shifts: [],
    batches: []
  });
  const [constraints, setConstraints] = useState<WizardConstraints>({
    maxClassesPerDayBatch: 6,
    maxClassesPerDayFaculty: 8,
    timeSlots: {
      morning: ["09:00", "10:00", "11:00", "12:00"],
      afternoon: ["13:00", "14:00", "15:00", "16:00"],
      evening: ["17:00", "18:00", "19:00"]
    },
    facultyAvailability: {},
    roomRestrictions: {},
    optimizationWeights: {
      facultyLoad: 0.3,
      roomUtilization: 0.4,
      studentGaps: 0.3
    }
  });
  const [alternatives, setAlternatives] = useState<GeneratedTimetable[]>([]);
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const progress = ((currentStep + 1) / wizardSteps.length) * 100;

  const canProceed = () => {
    switch (currentStep) {
      case 0: // Scope
        return scope.departments.length > 0 && scope.batches.length > 0;
      case 1: // Constraints
        return true;
      case 2: // Generate
        return alternatives.length > 0;
      case 3: // Review
        return selectedAlternative !== null;
      case 4: // Save
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (selectedAlternative) {
      const selectedTimetable = alternatives.find(alt => alt.id === selectedAlternative);
      if (selectedTimetable) {
        onComplete(selectedTimetable);
      }
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ScopeSelection
            scope={scope}
            onScopeChange={setScope}
          />
        );
      case 1:
        return (
          <ConstraintSettings
            constraints={constraints}
            onConstraintsChange={setConstraints}
            scope={scope}
          />
        );
      case 2:
        return (
          <GenerationProcess
            scope={scope}
            constraints={constraints}
            alternatives={alternatives}
            onAlternativesGenerated={setAlternatives}
            isGenerating={isGenerating}
            onGeneratingChange={setIsGenerating}
          />
        );
      case 3:
        return (
          <AlternativesReview
            alternatives={alternatives}
            selectedAlternative={selectedAlternative}
            onSelectAlternative={setSelectedAlternative}
            scope={scope}
            constraints={constraints}
          />
        );
      case 4:
        return (
          <SavePublish
            selectedTimetable={alternatives.find(alt => alt.id === selectedAlternative)}
            scope={scope}
            constraints={constraints}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Timetable Generation Wizard</CardTitle>
              <CardDescription>
                Create optimized timetables with automated conflict resolution
              </CardDescription>
            </div>
            <Button variant="ghost" onClick={onClose}>
              ✕
            </Button>
          </div>
          
          <div className="space-y-4">
            <Progress value={progress} className="w-full" />
            
            <div className="flex items-center justify-between">
              {wizardSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isComplete = index < currentStep;
                
                return (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center space-y-2 ${
                      isActive ? "text-primary" : isComplete ? "text-success" : "text-muted-foreground"
                    }`}
                  >
                    <div className={`rounded-full p-2 ${
                      isActive ? "bg-primary text-primary-foreground" :
                      isComplete ? "bg-success text-success-foreground" :
                      "bg-muted"
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-medium">{step.title}</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">
                        {step.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto max-h-[60vh]">
          {renderStepContent()}
        </CardContent>

        <div className="border-t bg-muted/30 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              Step {currentStep + 1} of {wizardSteps.length}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {wizardSteps[currentStep].title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            {currentStep === wizardSteps.length - 1 ? (
              <Button
                onClick={handleComplete}
                disabled={!canProceed() || isGenerating}
              >
                Complete
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed() || isGenerating}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}