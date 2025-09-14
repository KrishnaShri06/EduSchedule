import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data/DataTable";

// Sample data
const roomsData = [
  { id: "R001", name: "Conference Room A", type: "Conference", capacity: 25, building: "Main Block", status: "Active" },
  { id: "R002", name: "Computer Lab 1", type: "Lab", capacity: 40, building: "Tech Block", status: "Active" },
  { id: "R003", name: "Lecture Hall 1", type: "Lecture", capacity: 150, building: "Academic Block", status: "Active" },
  { id: "R004", name: "Seminar Room B", type: "Seminar", capacity: 30, building: "Main Block", status: "Maintenance" },
  { id: "R005", name: "Physics Lab", type: "Lab", capacity: 35, building: "Science Block", status: "Active" },
];

const subjectsData = [
  { id: "CS101", name: "Introduction to Programming", department: "Computer Science", credits: 4, type: "Core", status: "Active" },
  { id: "MATH201", name: "Calculus II", department: "Mathematics", credits: 3, type: "Core", status: "Active" },
  { id: "ENG101", name: "English Composition", department: "English", credits: 3, type: "General", status: "Active" },
  { id: "PHY201", name: "Quantum Physics", department: "Physics", credits: 4, type: "Core", status: "Active" },
  { id: "BIO101", name: "Cell Biology", department: "Biology", credits: 3, type: "Core", status: "Inactive" },
];

const facultyData = [
  { id: "F001", name: "Dr. Sarah Johnson", department: "Computer Science", email: "s.johnson@edu.com", specialization: "AI/ML", status: "Active" },
  { id: "F002", name: "Prof. Michael Chen", department: "Mathematics", email: "m.chen@edu.com", specialization: "Applied Math", status: "Active" },
  { id: "F003", name: "Dr. Emily Davis", department: "Physics", email: "e.davis@edu.com", specialization: "Quantum Mechanics", status: "Active" },
  { id: "F004", name: "Prof. Robert Wilson", department: "English", email: "r.wilson@edu.com", specialization: "Literature", status: "On Leave" },
];

const batchesData = [
  { id: "CS2024A", name: "Computer Science Batch A", year: "2024", semester: "Fall", students: 45, department: "Computer Science", status: "Active" },
  { id: "MATH2024A", name: "Mathematics Batch A", year: "2024", semester: "Fall", students: 38, department: "Mathematics", status: "Active" },
  { id: "PHY2024A", name: "Physics Batch A", year: "2024", semester: "Fall", students: 42, department: "Physics", status: "Active" },
  { id: "ENG2024A", name: "English Batch A", year: "2024", semester: "Fall", students: 35, department: "English", status: "Active" },
];

const roomColumns = [
  { key: "id", label: "Room ID", sortable: true },
  { key: "name", label: "Room Name", sortable: true },
  { key: "type", label: "Type", sortable: true },
  { key: "capacity", label: "Capacity", sortable: true },
  { key: "building", label: "Building", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

const subjectColumns = [
  { key: "id", label: "Subject ID", sortable: true },
  { key: "name", label: "Subject Name", sortable: true },
  { key: "department", label: "Department", sortable: true },
  { key: "credits", label: "Credits", sortable: true },
  { key: "type", label: "Type", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

const facultyColumns = [
  { key: "id", label: "Faculty ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "department", label: "Department", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "specialization", label: "Specialization", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

const batchColumns = [
  { key: "id", label: "Batch ID", sortable: true },
  { key: "name", label: "Batch Name", sortable: true },
  { key: "year", label: "Year", sortable: true },
  { key: "semester", label: "Semester", sortable: true },
  { key: "students", label: "Students", sortable: true },
  { key: "department", label: "Department", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

export default function MasterData() {
  const [activeTab, setActiveTab] = useState("rooms");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Master Data Management</h1>
        <p className="text-muted-foreground">
          Manage rooms, subjects, faculty, and student batches
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-muted/30">
          <TabsTrigger value="rooms" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Rooms
          </TabsTrigger>
          <TabsTrigger value="subjects" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Subjects
          </TabsTrigger>
          <TabsTrigger value="faculty" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Faculty
          </TabsTrigger>
          <TabsTrigger value="batches" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Batches
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rooms">
          <DataTable
            title="Rooms"
            description="Manage classroom and facility information"
            columns={roomColumns}
            data={roomsData}
            onAdd={() => console.log("Add room")}
            onEdit={(item) => console.log("Edit room", item)}
            onDelete={(item) => console.log("Delete room", item)}
            onBulkUpload={() => console.log("Bulk upload rooms")}
          />
        </TabsContent>

        <TabsContent value="subjects">
          <DataTable
            title="Subjects"
            description="Manage course and subject information"
            columns={subjectColumns}
            data={subjectsData}
            onAdd={() => console.log("Add subject")}
            onEdit={(item) => console.log("Edit subject", item)}
            onDelete={(item) => console.log("Delete subject", item)}
            onBulkUpload={() => console.log("Bulk upload subjects")}
          />
        </TabsContent>

        <TabsContent value="faculty">
          <DataTable
            title="Faculty"
            description="Manage faculty members and their information"
            columns={facultyColumns}
            data={facultyData}
            onAdd={() => console.log("Add faculty")}
            onEdit={(item) => console.log("Edit faculty", item)}
            onDelete={(item) => console.log("Delete faculty", item)}
            onBulkUpload={() => console.log("Bulk upload faculty")}
          />
        </TabsContent>

        <TabsContent value="batches">
          <DataTable
            title="Batches"
            description="Manage student batches and class groups"
            columns={batchColumns}
            data={batchesData}
            onAdd={() => console.log("Add batch")}
            onEdit={(item) => console.log("Edit batch", item)}
            onDelete={(item) => console.log("Delete batch", item)}
            onBulkUpload={() => console.log("Bulk upload batches")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}