import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, Clock, Users } from "lucide-react";
import type { WizardScope } from "../TimetableWizard";

// Sample data - would come from your data store
const departments = [
  { id: "CS", name: "Computer Science", batches: 3, faculty: 8 },
  { id: "MATH", name: "Mathematics", batches: 2, faculty: 6 },
  { id: "PHY", name: "Physics", batches: 2, faculty: 5 },
  { id: "ENG", name: "English", batches: 2, faculty: 4 },
];

const semesters = [
  { id: "FALL2024", name: "Fall 2024", active: true },
  { id: "SPRING2025", name: "Spring 2025", active: false },
];

const shifts = [
  { id: "morning", name: "Morning", time: "08:00 - 13:00" },
  { id: "afternoon", name: "Afternoon", time: "13:00 - 18:00" },
  { id: "evening", name: "Evening", time: "18:00 - 22:00" },
];

const batches = [
  { id: "CS2024A", name: "CS Batch A", department: "CS", students: 45, year: "2024" },
  { id: "CS2024B", name: "CS Batch B", department: "CS", students: 38, year: "2024" },
  { id: "MATH2024A", name: "Math Batch A", department: "MATH", students: 42, year: "2024" },
  { id: "PHY2024A", name: "Physics Batch A", department: "PHY", students: 40, year: "2024" },
  { id: "ENG2024A", name: "English Batch A", department: "ENG", students: 35, year: "2024" },
];

interface ScopeSelectionProps {
  scope: WizardScope;
  onScopeChange: (scope: WizardScope) => void;
}

export function ScopeSelection({ scope, onScopeChange }: ScopeSelectionProps) {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(scope.departments);

  const handleDepartmentChange = (deptId: string, checked: boolean) => {
    const newDepts = checked 
      ? [...selectedDepartments, deptId]
      : selectedDepartments.filter(id => id !== deptId);
    
    setSelectedDepartments(newDepts);
    
    // Auto-select batches for selected departments
    const relevantBatches = batches
      .filter(batch => newDepts.includes(batch.department))
      .map(batch => batch.id);
    
    onScopeChange({
      ...scope,
      departments: newDepts,
      batches: relevantBatches
    });
  };

  const handleSemesterChange = (semesterId: string, checked: boolean) => {
    const newSemesters = checked
      ? [...scope.semesters, semesterId]
      : scope.semesters.filter(id => id !== semesterId);
    
    onScopeChange({
      ...scope,
      semesters: newSemesters
    });
  };

  const handleShiftChange = (shiftId: string, checked: boolean) => {
    const newShifts = checked
      ? [...scope.shifts, shiftId]
      : scope.shifts.filter(id => id !== shiftId);
    
    onScopeChange({
      ...scope,
      shifts: newShifts
    });
  };

  const handleBatchChange = (batchId: string, checked: boolean) => {
    const newBatches = checked
      ? [...scope.batches, batchId]
      : scope.batches.filter(id => id !== batchId);
    
    onScopeChange({
      ...scope,
      batches: newBatches
    });
  };

  const getSelectedBatches = () => {
    return batches.filter(batch => scope.batches.includes(batch.id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Generation Scope</h3>
        <p className="text-muted-foreground">
          Choose the departments, semesters, shifts, and batches for timetable generation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Departments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Departments
            </CardTitle>
            <CardDescription>
              Select departments to include in generation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {departments.map((dept) => (
              <div key={dept.id} className="flex items-center space-x-3">
                <Checkbox
                  id={dept.id}
                  checked={selectedDepartments.includes(dept.id)}
                  onCheckedChange={(checked) => 
                    handleDepartmentChange(dept.id, checked as boolean)
                  }
                />
                <div className="flex-1">
                  <label
                    htmlFor={dept.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {dept.name}
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {dept.batches} batches
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {dept.faculty} faculty
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Semesters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Semesters
            </CardTitle>
            <CardDescription>
              Choose academic semesters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {semesters.map((semester) => (
              <div key={semester.id} className="flex items-center space-x-3">
                <Checkbox
                  id={semester.id}
                  checked={scope.semesters.includes(semester.id)}
                  onCheckedChange={(checked) => 
                    handleSemesterChange(semester.id, checked as boolean)
                  }
                />
                <div className="flex-1">
                  <label
                    htmlFor={semester.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {semester.name}
                  </label>
                  {semester.active && (
                    <Badge variant="default" className="ml-2 text-xs">
                      Active
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Shifts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Shifts
            </CardTitle>
            <CardDescription>
              Select time shifts to generate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {shifts.map((shift) => (
              <div key={shift.id} className="flex items-center space-x-3">
                <Checkbox
                  id={shift.id}
                  checked={scope.shifts.includes(shift.id)}
                  onCheckedChange={(checked) => 
                    handleShiftChange(shift.id, checked as boolean)
                  }
                />
                <div className="flex-1">
                  <label
                    htmlFor={shift.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {shift.name}
                  </label>
                  <div className="text-xs text-muted-foreground mt-1">
                    {shift.time}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Batches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Batches
            </CardTitle>
            <CardDescription>
              Student batches to include
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {selectedDepartments.length === 0 ? (
              <div className="text-sm text-muted-foreground italic">
                Select departments first to see available batches
              </div>
            ) : (
              batches
                .filter(batch => selectedDepartments.includes(batch.department))
                .map((batch) => (
                  <div key={batch.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={batch.id}
                      checked={scope.batches.includes(batch.id)}
                      onCheckedChange={(checked) => 
                        handleBatchChange(batch.id, checked as boolean)
                      }
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={batch.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {batch.name}
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {batch.students} students
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Year {batch.year}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      {scope.departments.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Selection Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {scope.departments.length}
                </div>
                <div className="text-sm text-muted-foreground">Departments</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {scope.semesters.length}
                </div>
                <div className="text-sm text-muted-foreground">Semesters</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {scope.shifts.length}
                </div>
                <div className="text-sm text-muted-foreground">Shifts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {scope.batches.length}
                </div>
                <div className="text-sm text-muted-foreground">Batches</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}