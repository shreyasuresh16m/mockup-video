import { useState } from "react";
import {
  ChevronLeft,
  UserCircle,
  LogOut,
  HelpCircle,
  Download,
  FileText,
  LayoutList,
  Pencil,
  CheckCircle2,
  UploadCloud,
  Presentation,
  PartyPopper,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Offering } from "@/types";

type Props = {
  offering: Offering;
  projectName: string;
  onBackToProject: () => void;
  onBackToDashboard: () => void;
  onLogout: () => void;
};

type EditableSection = {
  key: string;
  label: string;
  placeholder: string;
};

const SECTIONS: EditableSection[] = [
  {
    key: "offering",
    label: "Offering Overview",
    placeholder:
      "Describe the elevator solution being proposed — components included, configuration details, and why it suits the customer environment.",
  },
  {
    key: "competitor",
    label: "Competitor Comparison",
    placeholder:
      "Summarise how this KONE solution compares to competitor offerings in terms of quality, service, and lifecycle cost.",
  },
  {
    key: "usp",
    label: "Unique Selling Points (U.S.P.)",
    placeholder:
      "List the key differentiators — e.g. KONE 24/7 Connected Services, energy efficiency, design quality, local service network.",
  },
  {
    key: "xyz",
    label: "Customer Benefits (X.Y.Z.)",
    placeholder:
      "Frame benefits as outcomes for the customer: reliability, downtime reduction, warranty coverage, modernisation value.",
  },
  {
    key: "abc",
    label: "Additional Notes (A.B.C.)",
    placeholder:
      "Include any additional commercial, technical, or project management notes relevant to this proposal.",
  },
];

export default function Brochure({
  offering,
  projectName,
  onBackToProject,
  onLogout,
}: Props) {
  const [sectionValues, setSectionValues] = useState<Record<string, string>>(
    Object.fromEntries(SECTIONS.map((s) => [s.key, ""]))
  );
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [tenderUploaded, setTenderUploaded] = useState(false);

  const handleSectionChange = (key: string, value: string) => {
    setSectionValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") setTenderUploaded(true);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") setTenderUploaded(true);
  };

  const filledSections = SECTIONS.filter(
    (s) => sectionValues[s.key].trim().length > 0
  ).length;

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col">

      {/* ── Header ── */}
      <header className="border-b border-white/10 px-6 py-3.5 flex justify-between items-center sticky top-0 z-50 bg-[#141414]/95 backdrop-blur">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBackToProject}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/80 transition-colors text-[0.8em] py-1.5 px-2 rounded-lg hover:bg-white/5 flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Project</span>
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
      <main className="flex-1 px-6 py-10 max-w-6xl mx-auto w-full">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#1450f5]/15 border border-[#1450f5]/25 flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#1450f5]" />
              </div>
              <span className="text-white/40 text-[0.82em]">
                {projectName} · {offering.label}
              </span>
            </div>
            <h1 className="text-[1.8em] font-semibold text-white tracking-tight">
              Sales Brochure
            </h1>
            <p className="text-white/35 text-[0.83em] mt-1">
              Customise each section below, then download your client-ready brochure.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="flex items-center gap-2 bg-white/8 hover:bg-white/12 border border-white/15 text-white/70 px-4 py-2.5 rounded-xl font-medium text-[0.85em] transition-all active:scale-95">
              <Presentation className="w-4 h-4" />
              Export PPT
            </button>
            <button className="flex items-center gap-2 bg-[#1450f5] hover:bg-[#1040d0] text-white px-5 py-2.5 rounded-xl font-medium text-[0.85em] transition-all active:scale-95 shadow-lg shadow-[#1450f5]/20">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center gap-1.5 text-[0.8em] text-white/40">
            <LayoutList className="w-3.5 h-3.5" />
            <span>
              {filledSections}/{SECTIONS.length} sections complete
            </span>
          </div>
          <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1450f5] rounded-full transition-all duration-500"
              style={{ width: `${(filledSections / SECTIONS.length) * 100}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {offering.components.map((c) => (
              <span
                key={c}
                className="text-[0.7em] px-2.5 py-0.5 bg-[#00A3E0]/10 border border-[#00A3E0]/20 text-[#00A3E0] rounded-full"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── Left: Tender upload + PDF preview ── */}
          <div className="flex flex-col gap-6">

            {/* Upload area */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => document.getElementById("tender-file-input")?.click()}
              className="border-2 border-dashed border-white/15 hover:border-[#1450f5]/50 rounded-2xl p-6 transition-colors text-center cursor-pointer"
            >
              <input
                id="tender-file-input"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileInput}
              />
              <div className="flex flex-col items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                    tenderUploaded
                      ? "bg-emerald-500/15 border border-emerald-500/30"
                      : "bg-white/5 border border-white/15"
                  )}
                >
                  {tenderUploaded ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <UploadCloud className="w-5 h-5 text-white/40" />
                  )}
                </div>
                <div>
                  <p className="text-white/70 text-[0.88em] font-medium">
                    {tenderUploaded
                      ? "Standard tender uploaded"
                      : "Upload standard tender PDF"}
                  </p>
                  <p className="text-white/35 text-[0.76em] mt-0.5">
                    {tenderUploaded
                      ? "Drag a different file to replace"
                      : "Drag & drop or click to browse · PDF only"}
                  </p>
                </div>
              </div>
            </div>

            {/* Fixed PDF preview */}
            <div className="bg-[#1C1C1C] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-white/8 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#1450f5]" />
                <span className="text-white/60 text-[0.82em] font-medium">
                  Standard Tender Preview
                </span>
                <span className="ml-auto text-[0.72em] px-2 py-0.5 bg-white/8 border border-white/10 text-white/35 rounded-full">
                  Read-only
                </span>
              </div>
              <iframe
                src="/tender.pdf"
                className="w-full h-[520px] bg-white/5"
                title="Standard Tender PDF"
              />
            </div>
          </div>

          {/* ── Right: Editable sections ── */}
          <div className="flex flex-col gap-4">
            {SECTIONS.map((section) => {
              const isEditing = editingKey === section.key;
              const value = sectionValues[section.key];
              const filled = value.trim().length > 0;

              return (
                <motion.div
                  key={section.key}
                  layout
                  className={cn(
                    "bg-[#1C1C1C] border rounded-2xl overflow-hidden transition-all",
                    isEditing
                      ? "border-[#1450f5]/50 shadow-lg shadow-[#1450f5]/10"
                      : "border-white/10"
                  )}
                >
                  <button
                    onClick={() =>
                      setEditingKey(isEditing ? null : section.key)
                    }
                    className="w-full flex items-center gap-3 px-5 py-4 text-left"
                  >
                    <div
                      className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                        filled
                          ? "bg-emerald-500/15 border border-emerald-500/25"
                          : "bg-white/5 border border-white/15"
                      )}
                    >
                      {filled ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Pencil className="w-3.5 h-3.5 text-white/35" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[0.9em] font-medium">
                        {section.label}
                      </p>
                      {!isEditing && filled && (
                        <p className="text-white/40 text-[0.76em] mt-0.5 truncate">
                          {value}
                        </p>
                      )}
                      {!isEditing && !filled && (
                        <p className="text-white/25 text-[0.76em] mt-0.5">
                          Click to add content…
                        </p>
                      )}
                    </div>
                    <Pencil
                      className={cn(
                        "w-3.5 h-3.5 flex-shrink-0 transition-colors",
                        isEditing ? "text-[#1450f5]" : "text-white/20"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isEditing && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-white/8 pt-4">
                          <textarea
                            autoFocus
                            value={value}
                            onChange={(e) =>
                              handleSectionChange(section.key, e.target.value)
                            }
                            placeholder={section.placeholder}
                            rows={5}
                            className="w-full bg-[#111]/60 border border-white/12 rounded-xl px-4 py-3 text-white text-[0.85em] placeholder-white/20 resize-none focus:outline-none focus:border-[#1450f5]/50 transition-colors"
                          />
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-white/25 text-[0.72em]">
                              {value.length} characters
                            </span>
                            <button
                              onClick={() => setEditingKey(null)}
                              className="text-[0.8em] text-white/50 hover:text-white transition-colors py-1 px-3 rounded-lg hover:bg-white/5"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Download actions */}
            <div className="mt-2 pt-6 border-t border-white/10">
              <p className="text-white/40 text-[0.8em] mb-4">
                Your brochure combines the standard tender with your customised
                sections above.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 flex items-center justify-center gap-2.5 bg-[#1450f5] hover:bg-[#1040d0] text-white py-3.5 rounded-xl font-semibold text-[0.88em] transition-all active:scale-95 shadow-lg shadow-[#1450f5]/20">
                  <Download className="w-4 h-4" />
                  Download as PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2.5 bg-white/8 hover:bg-white/12 border border-white/15 text-white/70 py-3.5 rounded-xl font-semibold text-[0.88em] transition-all active:scale-95">
                  <Presentation className="w-4 h-4" />
                  Export as PPT
                </button>
              </div>
            </div>
          </div>
        </div>
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
