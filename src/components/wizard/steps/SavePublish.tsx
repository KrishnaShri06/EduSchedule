import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Save, Share, Download, Calendar, FileSpreadsheet, Link, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { GeneratedTimetable, WizardScope, WizardConstraints } from "../TimetableWizard";

interface SavePublishProps {
  selectedTimetable: GeneratedTimetable | undefined;
  scope: WizardScope;
  constraints: WizardConstraints;
  onComplete: () => void;
}

export function SavePublish({ selectedTimetable, scope, constraints, onComplete }: SavePublishProps) {
  const { toast } = useToast();
  const [timetableName, setTimetableName] = useState(selectedTimetable?.name || "");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [autoPublish, setAutoPublish] = useState(false);
  const [publishDate, setPublishDate] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!selectedTimetable) return;
    
    setIsSaving(true);
    
    // Mock save process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Timetable Saved Successfully",
      description: `${timetableName} has been saved and is ready for use.`,
    });
    
    setIsSaving(false);
    onComplete();
  };

  const handleExport = (format: string) => {
    toast({
      title: "Export Started",
      description: `Generating ${format.toUpperCase()} export...`,
    });
  };

  if (!selectedTimetable) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">No timetable selected for save/publish.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Save & Publish Timetable</h3>
        <p className="text-muted-foreground">
          Configure publication settings and export options for your generated timetable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Save Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="h-5 w-5" />
              Save Configuration
            </CardTitle>
            <CardDescription>
              Set timetable metadata and basic information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Timetable Name</Label>
              <Input
                id="name"
                value={timetableName}
                onChange={(e) => setTimetableName(e.target.value)}
                placeholder="Enter timetable name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description for this timetable..."
                rows={3}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Selected Alternative</h4>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">{selectedTimetable.name}</div>
                  <Badge variant="default">Score: {selectedTimetable.score}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Conflicts:</span>
                    <div className="font-medium">{selectedTimetable.conflicts}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Room Utilization:</span>
                    <div className="font-medium">{selectedTimetable.utilization}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Faculty Load:</span>
                    <div className="font-medium">{selectedTimetable.facultyLoad}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Student Gaps:</span>
                    <div className="font-medium">{selectedTimetable.studentGaps}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Publish Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share className="h-5 w-5" />
              Publication Settings
            </CardTitle>
            <CardDescription>
              Configure visibility and sharing options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Public Access</Label>
                <div className="text-sm text-muted-foreground">
                  Allow public viewing of this timetable
                </div>
              </div>
              <Switch
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Publish</Label>
                <div className="text-sm text-muted-foreground">
                  Automatically publish on save
                </div>
              </div>
              <Switch
                checked={autoPublish}
                onCheckedChange={setAutoPublish}
              />
            </div>

            {autoPublish && (
              <div className="space-y-2">
                <Label htmlFor="publish-date">Publish Date</Label>
                <Input
                  id="publish-date"
                  type="datetime-local"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                />
              </div>
            )}

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium">Generation Summary</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Departments:</span>
                  <span>{scope.departments.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Batches:</span>
                  <span>{scope.batches.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Algorithm:</span>
                  <span>{selectedTimetable.metadata.algorithm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Generated:</span>
                  <span>{selectedTimetable.metadata.generatedAt.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Options
          </CardTitle>
          <CardDescription>
            Download timetable in various formats for distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="flex flex-col h-auto p-4"
              onClick={() => handleExport("pdf")}
            >
              <Download className="h-6 w-6 mb-2" />
              <span className="font-medium">PDF Export</span>
              <span className="text-xs text-muted-foreground">
                Full timetable document
              </span>
            </Button>

            <Button
              variant="outline"
              className="flex flex-col h-auto p-4"
              onClick={() => handleExport("excel")}
            >
              <FileSpreadsheet className="h-6 w-6 mb-2" />
              <span className="font-medium">Excel Export</span>
              <span className="text-xs text-muted-foreground">
                Spreadsheet format
              </span>
            </Button>

            <Button
              variant="outline"
              className="flex flex-col h-auto p-4"
              onClick={() => handleExport("ics")}
            >
              <Calendar className="h-6 w-6 mb-2" />
              <span className="font-medium">Calendar (ICS)</span>
              <span className="text-xs text-muted-foreground">
                Import to calendar apps
              </span>
            </Button>

            <Button
              variant="outline"
              className="flex flex-col h-auto p-4"
              onClick={() => handleExport("share")}
            >
              <Link className="h-6 w-6 mb-2" />
              <span className="font-medium">Share Link</span>
              <span className="text-xs text-muted-foreground">
                Public viewing link
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium mb-1">Ready to Save & Publish</h4>
              <p className="text-sm text-muted-foreground">
                Your timetable will be saved with the current configuration
              </p>
            </div>
            
            <Button
              onClick={handleSave}
              disabled={!timetableName.trim() || isSaving}
              className="min-w-32"
            >
              {isSaving ? (
                "Saving..."
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}