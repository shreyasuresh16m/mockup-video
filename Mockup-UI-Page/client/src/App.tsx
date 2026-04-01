import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ProjectDetail from "@/pages/ProjectDetail";
import Home from "@/pages/Home";
import Brochure from "@/pages/Brochure";
import type { Project, Offering, AppView } from "@/types";

function App() {
  const [view, setView] = useState<AppView>("login");
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [brochureOffering, setBrochureOffering] = useState<Offering | null>(null);

  // Next offering ID counter per project
  const [offeringCounters, setOfferingCounters] = useState<Record<string, number>>({});

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
    setView("project-detail");
  };

  const handleOpenProject = (project: Project) => {
    setCurrentProject(project);
    setView("project-detail");
  };

  // Called from ProjectDetail when "New Offering" is clicked
  const handleAddOffering = () => {
    setView("workflow");
  };

  // Called from Home (workflow) when the user completes step 6
  const handleCompleteOffering = (offeringData: { components: string[]; useCases: string[] }) => {
    if (!currentProject) return;
    const pid = currentProject.id;
    const count = (offeringCounters[pid] ?? 0) + 1;
    setOfferingCounters((prev) => ({ ...prev, [pid]: count }));

    const newOffering: Offering = {
      id: count,
      label: `Offering ${count}`,
      components: offeringData.components,
      useCases: offeringData.useCases,
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== pid) return p;
        return { ...p, offerings: [...p.offerings, newOffering] };
      })
    );
    // Update currentProject reference
    setCurrentProject((prev) => {
      if (!prev) return prev;
      return { ...prev, offerings: [...prev.offerings, newOffering] };
    });
    setView("project-detail");
  };

  // Called from ProjectDetail when "Build Brochure" is clicked on an offering
  const handleBuildBrochure = (offering: Offering) => {
    setBrochureOffering(offering);
    setView("brochure");
  };

  const handleBackToDashboard = () => {
    setView("dashboard");
    setCurrentProject(null);
  };

  const handleBackToProjectDetail = () => {
    setView("project-detail");
  };

  // Get the live project data (with latest offerings)
  const liveProject = currentProject
    ? projects.find((p) => p.id === currentProject.id) ?? currentProject
    : null;

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
        {view === "project-detail" && liveProject && (
          <ProjectDetail
            project={liveProject}
            onAddOffering={handleAddOffering}
            onBuildBrochure={handleBuildBrochure}
            onBackToDashboard={handleBackToDashboard}
            onLogout={handleLogout}
          />
        )}
        {view === "workflow" && currentProject && (
          <Home
            projectName={currentProject.name}
            onLogout={handleLogout}
            onComplete={handleCompleteOffering}
            onBackToProject={handleBackToProjectDetail}
          />
        )}
        {view === "brochure" && currentProject && brochureOffering && (
          <Brochure
            offering={brochureOffering}
            projectName={currentProject.name}
            onBackToProject={handleBackToProjectDetail}
            onBackToDashboard={handleBackToDashboard}
            onLogout={handleLogout}
          />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
