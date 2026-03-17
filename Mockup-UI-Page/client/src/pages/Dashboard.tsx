import { useState } from "react";
import {
  Plus,
  FolderOpen,
  UserCircle,
  LogOut,
  HelpCircle,
  ChevronRight,
  Layers,
  Calendar,
  BookOpen,
  FileEdit,
  BookMarked,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type Props = {
  projects: Project[];
  onCreateProject: (name: string) => void;
  onOpenProject: (project: Project) => void;
  onLogout: () => void;
};

export default function Dashboard({ projects, onCreateProject, onOpenProject, onLogout }: Props) {
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [nameError, setNameError] = useState("");

  const handleCreate = () => {
    const trimmed = newName.trim();
    if (!trimmed) {
      setNameError("Please enter a project name.");
      return;
    }
    if (projects.some((p) => p.name.toLowerCase() === trimmed.toLowerCase())) {
      setNameError("A project with this name already exists.");
      return;
    }
    onCreateProject(trimmed);
    setNewName("");
    setShowNew(false);
    setNameError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreate();
    if (e.key === "Escape") { setShowNew(false); setNameError(""); setNewName(""); }
  };

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col">

      {/* ── Header ── */}
      <header className="border-b border-white/10 px-6 py-3.5 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="KONE"
            className="h-7 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              (e.currentTarget.parentElement as HTMLElement).innerHTML =
                '<span class="font-bold tracking-widest text-white">KONE</span>';
            }}
          />
          <div className="h-5 w-px bg-white/15" />
          <span className="text-white font-semibold tracking-tight text-[1.05em]">
            Sales<span className="text-[#1450f5]">NXT</span>
          </span>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-[0.8em] text-white/40 hover:text-white/80 transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
        >
          <UserCircle className="w-5 h-5" />
          <span className="hidden sm:inline">Logout</span>
          <LogOut className="w-4 h-4" />
        </button>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 px-6 py-10 max-w-5xl mx-auto w-full">

        {/* Title row */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[1.6em] font-semibold text-white tracking-tight">My Projects</h1>
            <p className="text-white/40 text-[0.85em] mt-1">
              Each project holds your visualisation outputs and generated offerings.
            </p>
          </div>
          <button
            onClick={() => { setShowNew(true); setTimeout(() => document.getElementById("new-project-input")?.focus(), 50); }}
            className="flex items-center gap-2 bg-[#1450f5] hover:bg-[#1040d0] text-white px-5 py-2.5 rounded-xl font-medium text-[0.9em] transition-all active:scale-95 shadow-lg shadow-[#1450f5]/20"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>

        {/* New project inline form */}
        <AnimatePresence>
          {showNew && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mb-6 bg-[#1C1C1C] border border-[#1450f5]/40 rounded-2xl p-6"
            >
              <p className="text-white font-medium mb-3">Name your project</p>
              <div className="flex gap-3">
                <input
                  id="new-project-input"
                  type="text"
                  value={newName}
                  onChange={(e) => { setNewName(e.target.value); setNameError(""); }}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g. Dubai Tower — Lobby Refresh"
                  className={cn(
                    "flex-1 bg-[#141414] border rounded-xl px-4 py-3 text-white text-[0.95em] placeholder:text-white/25 outline-none transition-all focus:border-[#1450f5]/60 focus:ring-2 focus:ring-[#1450f5]/15",
                    nameError ? "border-red-500/50" : "border-white/10"
                  )}
                />
                <button
                  onClick={handleCreate}
                  className="px-6 py-3 bg-[#1450f5] hover:bg-[#1040d0] text-white rounded-xl font-medium text-[0.9em] transition-all active:scale-95"
                >
                  Create
                </button>
                <button
                  onClick={() => { setShowNew(false); setNameError(""); setNewName(""); }}
                  className="px-4 py-3 border border-white/10 text-white/50 hover:text-white rounded-xl text-[0.9em] transition-all hover:bg-white/5"
                >
                  Cancel
                </button>
              </div>
              {nameError && <p className="text-red-400 text-[0.8em] mt-2">{nameError}</p>}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {projects.length === 0 && !showNew && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-5"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <FolderOpen className="w-8 h-8 text-white/30" />
            </div>
            <div className="text-center">
              <p className="text-white/60 font-medium mb-1">No projects yet</p>
              <p className="text-white/30 text-[0.85em]">Create your first project to get started.</p>
            </div>
            <button
              onClick={() => { setShowNew(true); setTimeout(() => document.getElementById("new-project-input")?.focus(), 50); }}
              className="flex items-center gap-2 border border-white/15 text-white/60 hover:text-white hover:border-white/35 px-6 py-3 rounded-xl text-[0.9em] font-medium transition-all hover:bg-white/5"
            >
              <Plus className="w-4 h-4" />
              Create New Project
            </button>
          </motion.div>
        )}

        {/* Project grid */}
        {projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, i) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onOpenProject(project)}
                className="group text-left bg-[#1C1C1C] border border-white/10 hover:border-[#1450f5]/40 rounded-2xl p-5 transition-all hover:bg-[#1E1E1E] active:scale-[0.98]"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-[#1450f5]/10 border border-[#1450f5]/20 flex items-center justify-center mb-4 group-hover:bg-[#1450f5]/20 transition-colors">
                  <BookOpen className="w-5 h-5 text-[#1450f5]" />
                </div>

                {/* Name + Status */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-white font-semibold text-[1em] truncate">{project.name}</p>
                  {project.offerings.length > 0 ? (
                    <span className="flex items-center gap-1 shrink-0 text-[0.68em] px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full font-medium">
                      <BookMarked className="w-3 h-3" />
                      Brochure ready
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 shrink-0 text-[0.68em] px-2.5 py-1 bg-white/5 border border-white/15 text-white/40 rounded-full font-medium">
                      <FileEdit className="w-3 h-3" />
                      Draft
                    </span>
                  )}
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 text-[0.78em] text-white/35 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {project.createdAt}
                  </span>
                  {project.offerings.length > 0 && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5" />
                        {project.offerings.length} offering{project.offerings.length !== 1 ? "s" : ""}
                      </span>
                    </>
                  )}
                </div>

                {/* Offerings pills */}
                {project.offerings.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.offerings.map((o) => (
                      <span key={o.id} className="text-[0.72em] px-2.5 py-1 bg-[#1450f5]/10 border border-[#1450f5]/20 text-[#7b9fff] rounded-full">
                        {o.label}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-[0.8em] text-white/40 group-hover:text-white/70 transition-colors">
                    {project.offerings.length === 0 ? "Start creating" : "Continue"}
                  </span>
                  <ChevronRight className="w-4 h-4 text-white/25 group-hover:text-[#1450f5] transition-colors" />
                </div>
              </motion.button>
            ))}

            {/* Add another project card */}
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: projects.length * 0.05 }}
              onClick={() => { setShowNew(true); setTimeout(() => document.getElementById("new-project-input")?.focus(), 50); }}
              className="text-left border-2 border-dashed border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all hover:bg-white/[0.02] flex flex-col items-center justify-center min-h-[200px] gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Plus className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
              </div>
              <span className="text-[0.85em] text-white/30 group-hover:text-white/50 transition-colors font-medium">
                New Project
              </span>
            </motion.button>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/10 px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.72em] text-white/25">
        <p>© 2026 KONE Corporation. All rights reserved.</p>
        <a
          href="https://www.kone.com/en/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-white/50 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Help & Support
        </a>
      </footer>
    </div>
  );
}
