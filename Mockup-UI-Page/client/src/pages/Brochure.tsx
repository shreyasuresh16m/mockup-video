import { useState } from "react";
import {
  UserCircle,
  LogOut,
  HelpCircle,
  ChevronLeft,
  FileText,
  Presentation,
  CheckSquare,
  Square,
  Building2,
  Layers,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Award,
  MapPin,
  QrCode,
  Phone,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Offering } from "@/types";

type Props = {
  offerings: Offering[];
  projectName: string;
  onBackToProject: () => void;
  onBackToDashboard: () => void;
  onLogout: () => void;
};

type SectionKey =
  | "legacy"
  | "strengths"
  | `offering_${number}`
  | "competitor"
  | "usp"
  | "commercial"
  | "closure";

function CheckRow({
  checked,
  onToggle,
  label,
  icon,
  accent = false,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl border transition-all",
        checked
          ? "bg-[#1450f5]/10 border-[#1450f5]/40 text-white"
          : "bg-transparent border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
      )}
    >
      <span className={cn("flex-shrink-0", checked ? "text-[#1450f5]" : "text-white/25")}>
        {checked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
      </span>
      <span className={cn("flex-shrink-0", checked ? "text-[#1450f5]" : "text-white/30")}>
        {icon}
      </span>
      <span className="font-medium text-[0.9em]">{label}</span>
    </button>
  );
}

function SectionCard({
  title,
  icon,
  children,
  badge,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <div className="bg-[#1C1C1C] border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/8">
        <span className="text-[#1450f5]">{icon}</span>
        <h3 className="text-white font-semibold text-[0.95em]">{title}</h3>
        {badge && (
          <span className="ml-auto text-[0.72em] px-2.5 py-0.5 bg-[#1450f5]/15 text-[#7b9fff] border border-[#1450f5]/25 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function EditableField({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const cls =
    "w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-white text-[0.9em] placeholder:text-white/20 outline-none transition-all focus:border-[#1450f5]/50 focus:ring-2 focus:ring-[#1450f5]/10 resize-none";

  return (
    <div className="space-y-1.5">
      <label className="text-[0.75em] font-medium text-white/40 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </div>
  );
}

function TemplatePreview({ lines }: { lines: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-[0.8em] text-white/35 hover:text-white/60 transition-colors"
      >
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {open ? "Hide preview" : "Preview template content"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-1.5 overflow-hidden"
          >
            {lines.map((l, i) => (
              <li key={i} className="flex items-start gap-2 text-[0.82em] text-white/50">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1450f5]/60 mt-1.5 flex-shrink-0" />
                {l}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Brochure({ offerings, projectName, onBackToProject, onBackToDashboard, onLogout }: Props) {
  // Customer details
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState(() => new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }));
  const [address, setAddress] = useState("");

  // Salesperson info (for closure)
  const [salespersonName, setSalespersonName] = useState("");

  // Section selections
  const [selected, setSelected] = useState<Set<string>>(new Set(["legacy"]));
  const toggle = (key: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  // Editable text for variable sections
  const [competitorText, setCompetitorText] = useState("");
  const [uspText, setUspText] = useState("");
  const [commercialText, setCommercialText] = useState("");

  const [generating, setGenerating] = useState<"pdf" | "ppt" | null>(null);

  const handleGenerate = (type: "pdf" | "ppt") => {
    setGenerating(type);
    setTimeout(() => setGenerating(null), 2200);
  };

  const selectedCount = selected.size;
  const hasCustomer = customerName.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col">

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#141414]/95 backdrop-blur border-b border-white/10 px-6 py-3.5 flex justify-between items-center">
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
          <div className="h-5 w-px bg-white/10" />
          <span className="text-white/40 text-[0.85em] truncate max-w-[160px]">{projectName}</span>
          <span className="text-white/20 text-[0.8em]">·</span>
          <span className="text-[#1450f5] text-[0.82em] font-medium">Sales Brochure</span>
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

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Navigation row */}
          <div className="flex items-center justify-between gap-3 mb-2">
            <button
              onClick={onBackToProject}
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[0.85em] py-2 pr-4 rounded-lg hover:bg-white/5"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to project
            </button>
            <button
              onClick={onBackToDashboard}
              className="flex items-center gap-2 text-white/35 hover:text-white/70 transition-colors text-[0.82em] py-2 px-3 rounded-lg hover:bg-white/5 border border-white/8 hover:border-white/20"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              All projects
            </button>
          </div>

          <div>
            <h1 className="text-[1.7em] font-semibold text-white tracking-tight">Sales Brochure Builder</h1>
            <p className="text-white/40 text-[0.88em] mt-1">
              Fill in the details below, select the sections to include, then generate your brochure.
            </p>
          </div>

          {/* ── 1. Customer Details ── */}
          <SectionCard title="Customer Details" icon={<Building2 className="w-5 h-5" />} badge="Required">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <EditableField
                  label="Customer / Company Name"
                  value={customerName}
                  onChange={setCustomerName}
                  placeholder="e.g. Al Futtaim Group"
                />
              </div>
              <EditableField
                label="Date"
                value={date}
                onChange={setDate}
                placeholder="e.g. 16 March 2026"
              />
              <EditableField
                label="Address / Site"
                value={address}
                onChange={setAddress}
                placeholder="e.g. Dubai Marina Tower, Dubai"
              />
            </div>
          </SectionCard>

          {/* ── 2. Content Selection ── */}
          <SectionCard title="Brochure Sections" icon={<Layers className="w-5 h-5" />} badge={`${selectedCount} selected`}>
            <div className="space-y-3">

              {/* KONE Legacy */}
              <CheckRow
                checked={selected.has("legacy")}
                onToggle={() => toggle("legacy")}
                label="KONE Legacy"
                icon={<Award className="w-4 h-4" />}
              />
              {selected.has("legacy") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-8 pl-4 border-l border-white/10 overflow-hidden"
                >
                  <TemplatePreview
                    lines={[
                      "Over 115 years of elevator and escalator expertise",
                      "Operating in 60+ countries with 60,000+ employees",
                      "Industry-leading safety record and innovation heritage",
                      "Trusted by the world's most iconic buildings and developers",
                    ]}
                  />
                </motion.div>
              )}

              {/* KONE Strengths */}
              <CheckRow
                checked={selected.has("strengths")}
                onToggle={() => toggle("strengths")}
                label="KONE Strengths"
                icon={<ShieldCheck className="w-4 h-4" />}
              />
              {selected.has("strengths") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-8 pl-4 border-l border-white/10 overflow-hidden"
                >
                  <TemplatePreview
                    lines={[
                      "Factory: State-of-the-art manufacturing in Hyvinkää, Finland — ISO-certified production",
                      "R&D: €300M+ annual investment in innovation, 2,000+ engineers globally",
                      "References: Burj Khalifa, One World Trade Center, Petronas Towers, Marina Bay Sands",
                    ]}
                  />
                </motion.div>
              )}

              {/* Offerings from the project */}
              {offerings.length > 0 ? (
                offerings.map((offering) => (
                  <div key={offering.id}>
                    <CheckRow
                      checked={selected.has(`offering_${offering.id}`)}
                      onToggle={() => toggle(`offering_${offering.id}`)}
                      label={`${offering.label} — ${offering.components.join(", ")}`}
                      icon={<Layers className="w-4 h-4" />}
                    />
                    {selected.has(`offering_${offering.id}`) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-8 pl-4 border-l border-white/10 mt-1 overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 py-2">
                          {offering.components.map((c) => (
                            <span key={c} className="text-[0.78em] px-3 py-1 bg-[#1450f5]/10 border border-[#1450f5]/25 text-[#7b9fff] rounded-full">
                              {c}
                            </span>
                          ))}
                          {offering.useCases.map((u) => (
                            <span key={u} className="text-[0.78em] px-3 py-1 bg-white/5 border border-white/10 text-white/50 rounded-full">
                              {u}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 rounded-xl border border-dashed border-white/10 text-[0.82em] text-white/30 italic">
                  No offerings saved yet — go back to the project workflow and save at least one offering.
                </div>
              )}

              {/* Competitor Comparison */}
              <CheckRow
                checked={selected.has("competitor")}
                onToggle={() => toggle("competitor")}
                label="Competitor Comparison"
                icon={<TrendingUp className="w-4 h-4" />}
              />
              {selected.has("competitor") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-8 pl-4 border-l border-white/10 overflow-hidden"
                >
                  <EditableField
                    label="Competitor analysis notes"
                    value={competitorText}
                    onChange={setCompetitorText}
                    placeholder="Describe competitive advantages vs. key competitors (Otis, Schindler, Thyssenkrupp…)"
                    multiline
                  />
                </motion.div>
              )}

              {/* KONE USP */}
              <CheckRow
                checked={selected.has("usp")}
                onToggle={() => toggle("usp")}
                label="KONE USP"
                icon={<Award className="w-4 h-4" />}
              />
              {selected.has("usp") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-8 pl-4 border-l border-white/10 overflow-hidden"
                >
                  <EditableField
                    label="Key differentiators for this customer"
                    value={uspText}
                    onChange={setUspText}
                    placeholder="e.g. EcoSpace® technology, KONE 24/7 Connect™ predictive maintenance, DX Class™ elevators…"
                    multiline
                  />
                </motion.div>
              )}

              {/* Commercial Details */}
              <CheckRow
                checked={selected.has("commercial")}
                onToggle={() => toggle("commercial")}
                label="Commercial Details"
                icon={<DollarSign className="w-4 h-4" />}
              />
              {selected.has("commercial") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-8 pl-4 border-l border-white/10 overflow-hidden"
                >
                  <EditableField
                    label="Pricing, terms & commercial notes"
                    value={commercialText}
                    onChange={setCommercialText}
                    placeholder="e.g. indicative pricing, payment terms, warranty, maintenance contract options…"
                    multiline
                  />
                </motion.div>
              )}

              {/* Closure */}
              <CheckRow
                checked={selected.has("closure")}
                onToggle={() => toggle("closure")}
                label="Closure & Contact"
                icon={<Phone className="w-4 h-4" />}
              />
              {selected.has("closure") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-8 pl-4 border-l border-white/10 space-y-4 overflow-hidden"
                >
                  <EditableField
                    label="Salesperson Name"
                    value={salespersonName}
                    onChange={setSalespersonName}
                    placeholder="e.g. Aryan Mehta"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-start gap-2 p-3 bg-white/[0.03] rounded-xl border border-white/8">
                      <MapPin className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[0.75em] text-white/35 uppercase tracking-wider mb-0.5">Corporate Office</p>
                        <p className="text-[0.82em] text-white/60">KONE Gulf LLC<br />Dubai, UAE</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-white/[0.03] rounded-xl border border-white/8">
                      <Phone className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[0.75em] text-white/35 uppercase tracking-wider mb-0.5">Support</p>
                        <p className="text-[0.82em] text-white/60">24/7 Helpdesk<br />+971 800 KONE</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-white/[0.03] rounded-xl border border-white/8">
                      <QrCode className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[0.75em] text-white/35 uppercase tracking-wider mb-0.5">QR Code</p>
                        <p className="text-[0.82em] text-white/60">kone.com/contact<br />(auto-generated)</p>
                      </div>
                    </div>
                  </div>
                  <TemplatePreview
                    lines={[
                      "Thank you for considering KONE — we look forward to partnering with you.",
                      "Our team is ready to support you at every stage of your project.",
                      "Scan the QR code to book a consultation or request a formal quotation.",
                    ]}
                  />
                </motion.div>
              )}
            </div>
          </SectionCard>

          {/* ── 3. Generate Output ── */}
          <SectionCard title="Generate Brochure" icon={<FileText className="w-5 h-5" />}>
            {!hasCustomer && (
              <p className="text-amber-400/80 text-[0.82em] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                Enter a customer name above to personalise the brochure.
              </p>
            )}
            <p className="text-white/40 text-[0.85em] mb-5">
              Your brochure will include the {selectedCount} selected section{selectedCount !== 1 ? "s" : ""}.
              {customerName.trim() && (
                <span className="text-white/60"> Personalised for <strong>{customerName.trim()}</strong>.</span>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleGenerate("pdf")}
                disabled={!!generating}
                className={cn(
                  "flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-[0.95em] transition-all border",
                  generating === "pdf"
                    ? "bg-[#1450f5]/20 border-[#1450f5]/30 text-white/60 cursor-wait"
                    : "bg-[#1450f5] border-[#1450f5] text-white hover:bg-[#1040d0] hover:shadow-lg hover:shadow-[#1450f5]/20 active:scale-[0.98]"
                )}
              >
                {generating === "pdf" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating PDF…
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5" />
                    Download as PDF
                  </>
                )}
              </button>
              <button
                onClick={() => handleGenerate("ppt")}
                disabled={!!generating}
                className={cn(
                  "flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-[0.95em] transition-all border",
                  generating === "ppt"
                    ? "bg-white/5 border-white/10 text-white/60 cursor-wait"
                    : "bg-transparent border-white/15 text-white/80 hover:text-white hover:border-white/35 hover:bg-white/5 active:scale-[0.98]"
                )}
              >
                {generating === "ppt" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating PPT…
                  </>
                ) : (
                  <>
                    <Presentation className="w-5 h-5" />
                    Download as PowerPoint
                  </>
                )}
              </button>
            </div>
            {generating && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[0.78em] text-white/30 mt-3"
              >
                Assembling your brochure — this would take a few seconds in production…
              </motion.p>
            )}
          </SectionCard>

          {/* ── Bottom navigation ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/8">
            <button
              onClick={onBackToProject}
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[0.85em] py-2 px-4 rounded-lg hover:bg-white/5"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to project to modify offerings
            </button>
            <button
              onClick={onBackToDashboard}
              className="flex items-center gap-2 text-white/35 hover:text-white/70 transition-colors text-[0.82em] py-2 px-4 rounded-lg border border-white/10 hover:border-white/25 hover:bg-white/5"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Back to all projects
            </button>
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
