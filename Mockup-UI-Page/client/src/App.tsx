import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";
import Brochure from "@/pages/Brochure";
import type { Project, Offering, AppView } from "@/types";

function App() {
  const [view, setView] = useState<AppView>("login");
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // Persist offerings per project — survives view switches
  const [projectOfferings, setProjectOfferings] = useState<Record<string, Offering[]>>({});

  // Offerings currently being used in the brochure builder
  const [brochureOfferings, setBrochureOfferings] = useState<Offering[]>([]);

  const handleLogin = () => setView("dashboard");
  const handleLogout = () => {
    setView("login");
    setCurrentProject(null);
  };

  const handleCreateProject = (name: string) => {
    const project: Project = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      offerings: [],
    };
    setProjects((prev) => [project, ...prev]);
    setCurrentProject(project);
    setView("workflow");
  };

  const handleOpenProject = (project: Project) => {
    setCurrentProject(project);
    setView("workflow");
  };

  // Called by Home whenever offerings are saved/updated
  const handleOfferingsChange = (offerings: Offering[]) => {
    if (!currentProject) return;
    const pid = currentProject.id;
    setProjectOfferings((prev) => ({ ...prev, [pid]: offerings }));
    // Also keep the project list in sync
    setProjects((prev) =>
      prev.map((p) => (p.id === pid ? { ...p, offerings } : p))
    );
  };

  const handleBuildBrochure = (offerings: Offering[]) => {
    handleOfferingsChange(offerings);
    setBrochureOfferings(offerings);
    setView("brochure");
  };

  const handleBackToDashboard = () => {
    setView("dashboard");
    setCurrentProject(null);
  };

  // Current project's saved offerings (or empty if none yet)
  const currentOfferings = currentProject ? (projectOfferings[currentProject.id] ?? []) : [];

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {view === "login" && (
          <Login onLogin={handleLogin} />
        )}
        {view === "dashboard" && (
          <Dashboard
            projects={projects}
            onCreateProject={handleCreateProject}
            onOpenProject={handleOpenProject}
            onLogout={handleLogout}
          />
        )}
        {view === "workflow" && currentProject && (
          <Home
            projectName={currentProject.name}
            initialOfferings={currentOfferings}
            onLogout={handleLogout}
            onOfferingsChange={handleOfferingsChange}
            onBuildBrochure={handleBuildBrochure}
            onBackToDashboard={handleBackToDashboard}
          />
        )}
        {view === "brochure" && currentProject && (
          <Brochure
            offerings={brochureOfferings}
            projectName={currentProject.name}
            onBackToProject={() => setView("workflow")}
            onBackToDashboard={handleBackToDashboard}
            onLogout={handleLogout}
          />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
