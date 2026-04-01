import { useState } from "react";
import {
  Plus,
  ChevronLeft,
  UserCircle,
  LogOut,
  HelpCircle,
  BookOpen,
  Layers,
  Calendar,
  FileText,
  ArrowRight,
  Trash2,
  LayoutGrid,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Project, Offering } from "@/types";

type Props = {
  project: Project;
  onAddOffering: () => void;
  onBuildBrochure: (offering: Offering) => void;
  onBackToDashboard: () => void;
  onLogout: () => void;
};

export default function ProjectDetail({
  project,
  onAddOffering,
  onBuildBrochure,
  onBackToDashboard,
  onLogout,
}: Props) {
  return (
    <div className="min-h-screen bg-[#141414] flex flex-col">

      {/* ── Header ── */}
      <header className="border-b border-white/10 px-6 py-3.5 flex justify-between items-center">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/80 transition-colors text-[0.8em] py-1.5 px-2 rounded-lg hover:bg-white/5 flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">All Projects</span>
          </button>
          <div className="h-5 w-px bg-white/15 flex-shrink-0" />
          <img
            src="/logo.png"
            alt="KONE"
            className="h-7 object-contain flex-shrink-0"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="h-5 w-px bg-white/15 flex-shrink-0" />
          <span className="text-white font-semibold tracking-tight text-[1.05em] flex-shrink-0">
            Sales<span className="text-[#1450f5]">NXT</span>
          </span>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-[0.8em] text-white/40 hover:text-white/80 transition-colors py-2 px-3 rounded-lg hover:bg-white/5 flex-shrink-0"
        >
          <UserCircle className="w-5 h-5" />
          <span className="hidden sm:inline">Logout</span>
          <LogOut className="w-4 h-4" />
        </button>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 px-6 py-10 max-w-5xl mx-auto w-full">

        {/* Project header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#1450f5]/15 border border-[#1450f5]/25 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#1450f5]" />
              </div>
              <span className="text-white/40 text-[0.82em]">Project</span>
            </div>
            <h1 className="text-[1.8em] font-semibold text-white tracking-tight">{project.name}</h1>
            <div className="flex items-center gap-2 mt-1.5 text-[0.78em] text-white/35">
              <Calendar className="w-3.5 h-3.5" />
              <span>Created {project.createdAt}</span>
              {project.offerings.length > 0 && (
                <>
                  <span>·</span>
                  <Layers className="w-3.5 h-3.5" />
                  <span>{project.offerings.length} offering{project.offerings.length !== 1 ? "s" : ""}</span>
                </>
              )}
            </div>
          </div>
          <button
            onClick={onAddOffering}
            className="flex items-center gap-2 bg-[#1450f5] hover:bg-[#1040d0] text-white px-5 py-2.5 rounded-xl font-medium text-[0.9em] transition-all active:scale-95 shadow-lg shadow-[#1450f5]/20 flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            New Offering
          </button>
        </div>

        {/* Empty state */}
        {project.offerings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 gap-5 border-2 border-dashed border-white/10 rounded-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Layers className="w-8 h-8 text-white/30" />
            </div>
            <div className="text-center">
              <p className="text-white/60 font-medium mb-1">No offerings yet</p>
              <p className="text-white/30 text-[0.85em]">Create your first offering to start the visualisation workflow.</p>
            </div>
            <button
              onClick={onAddOffering}
              className="flex items-center gap-2 bg-[#1450f5] hover:bg-[#1040d0] text-white px-6 py-3 rounded-xl font-medium text-[0.9em] transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Create First Offering
            </button>
          </motion.div>
        )}

        {/* Offerings grid */}
        {project.offerings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.offerings.map((offering, i) => (
              <motion.div
                key={offering.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-[#1C1C1C] border border-white/10 rounded-2xl p-5 flex flex-col gap-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#00A3E0]/10 border border-[#00A3E0]/20 flex items-center justify-center">
                    <Layers className="w-4 h-4 text-[#00A3E0]" />
                  </div>
                  <span className="flex items-center gap-1 text-[0.68em] px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 rounded-full font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Complete
                  </span>
                </div>

                {/* Label */}
                <div>
                  <p className="text-white font-semibold text-[1em]">{offering.label}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {offering.useCases.map((uc) => (
                      <span key={uc} className="text-[0.7em] px-2 py-0.5 bg-white/5 border border-white/10 text-white/50 rounded-full">{uc}</span>
                    ))}
                    {offering.components.map((c) => (
                      <span key={c} className="text-[0.7em] px-2 py-0.5 bg-[#00A3E0]/10 border border-[#00A3E0]/20 text-[#00A3E0] rounded-full">{c}</span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto pt-2 border-t border-white/8">
                  <button
                    onClick={() => onBuildBrochure(offering)}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#1450f5] hover:bg-[#1040d0] text-white py-2.5 rounded-xl text-[0.82em] font-semibold transition-all active:scale-95"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Build Brochure
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Add another card */}
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: project.offerings.length * 0.06 }}
              onClick={onAddOffering}
              className="border-2 border-dashed border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all hover:bg-white/[0.02] flex flex-col items-center justify-center min-h-[180px] gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Plus className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
              </div>
              <span className="text-[0.85em] text-white/30 group-hover:text-white/50 transition-colors font-medium">New Offering</span>
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
