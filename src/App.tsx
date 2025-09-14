import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MasterData from "./pages/MasterData";
import Generate from "./pages/Generate";
import MyTimetable from "./pages/MyTimetable";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Placeholder components for remaining routes
const Constraints = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Constraints & Preferences</h1>
    <p className="text-muted-foreground">Configure global constraints and optimization preferences.</p>
  </div>
);


const Compare = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Compare Timetables</h1>
    <p className="text-muted-foreground">Compare different timetable versions and resolve conflicts.</p>
  </div>
);

const Approvals = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Approval Workflow</h1>
    <p className="text-muted-foreground">Review and approve timetable versions.</p>
  </div>
);

const Publish = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Publish & Export</h1>
    <p className="text-muted-foreground">Publish timetables and export in various formats.</p>
  </div>
);

const App = () => {
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {!user ? (
            <Routes>
              <Route path="/" element={<Home onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          ) : (
            <Layout user={user} onLogout={handleLogout}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/master-data/*" element={<MasterData />} />
                <Route path="/constraints" element={<Constraints />} />
                <Route path="/generate" element={<Generate />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/approvals" element={<Approvals />} />
                <Route path="/publish" element={<Publish />} />
                <Route path="/my-timetable" element={<MyTimetable />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
