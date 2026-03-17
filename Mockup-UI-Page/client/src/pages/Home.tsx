import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  UploadCloud,
  CheckCircle2,
  Edit2,
  ZoomIn,
  ZoomOut,
  RefreshCcw,
  MapPin,
  Download,
  PlayCircle,
  Settings2,
  UserCircle,
  HelpCircle,
  ChevronLeft,
  ImageIcon,
  Film,
  Layers,
  Circle,
  RotateCcw,
  LogOut,
  BookmarkPlus,
  ArrowRight,
  ChevronLeft as BackIcon,
  Sparkles,
  Wand2,
  Eye,
  EyeOff,
  ScanSearch,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Offering } from "@/types";

import copImg from "@assets/image_1773728556778.png";
import lciImg from "@assets/image_1773728561376.png";
import ceilingImg from "@assets/image_1773728565819.png";
import doorImg from "@assets/image_1773728572923.png";

const COMPONENT_IMAGES: Record<string, string> = {
  COP: copImg,
  LCI: lciImg,
  Ceiling: ceilingImg,
  Door: doorImg,
};

// ─── Types ───────────────────────────────────────────────────────────────────

type StepProps = {
  step: number;
  activeStep: number;
  title: string;
  isCompleted: boolean;
  onEdit: () => void;
  onBack?: () => void;
  children: React.ReactNode;
  readOnlyContent: React.ReactNode;
};

type PinMap = Record<string, { x: number; y: number }>;

// ─── Progress Bar ────────────────────────────────────────────────────────────

const STEP_LABELS = [
  "Upload",
  "Components",
  "Place",
  "Preview",
  "Video",
  "Download",
];

const ProgressBar: React.FC<{ highestStep: number; activeStep: number; onGoTo: (s: number) => void }> = ({
  highestStep,
  activeStep,
  onGoTo,
}) => (
  <div className="flex items-center gap-0 w-full max-w-3xl mx-auto">
    {STEP_LABELS.map((label, i) => {
      const step = i + 1;
      const done = highestStep > step;
      const active = activeStep === step;
      const reachable = step <= highestStep;
      return (
        <React.Fragment key={step}>
          <button
            onClick={() => reachable && onGoTo(step)}
            disabled={!reachable}
            className={cn(
              "flex flex-col items-center gap-1 flex-shrink-0 transition-all",
              reachable ? "cursor-pointer" : "cursor-default opacity-40"
            )}
          >
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-[0.7em] font-bold border-2 transition-all",
                active
                  ? "bg-[#00A3E0] border-[#00A3E0] text-white shadow-[0_0_10px_rgba(0,163,224,0.5)]"
                  : done
                  ? "bg-[#00A3E0]/20 border-[#00A3E0]/60 text-[#00A3E0]"
                  : "bg-transparent border-white/20 text-white/30"
              )}
            >
              {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : step}
            </div>
            <span
              className={cn(
                "text-[0.6em] font-medium whitespace-nowrap hidden sm:block",
                active ? "text-white" : done ? "text-[#00A3E0]/70" : "text-white/25"
              )}
            >
              {label}
            </span>
          </button>
          {i < STEP_LABELS.length - 1 && (
            <div className="flex-1 h-px mx-1 transition-colors" style={{ background: step < highestStep ? "rgba(0,163,224,0.4)" : "rgba(255,255,255,0.08)" }} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// ─── StepContainer ────────────────────────────────────────────────────────────

const StepContainer: React.FC<StepProps> = ({
  step,
  activeStep,
  title,
  isCompleted,
  onEdit,
  onBack,
  children,
  readOnlyContent,
}) => {
  const isActive = activeStep === step;
  const isPast = activeStep > step || (isCompleted && !isActive);
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && stepRef.current) {
      setTimeout(() => {
        stepRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, [isActive]);

  if (!isActive && !isPast) return null;

  return (
    <div
      id={`step-${step}`}
      ref={stepRef}
      className={cn(
        "rounded-2xl border transition-all duration-500 overflow-hidden",
        isActive
          ? "bg-[#1E1E1E] border-white/20 shadow-xl"
          : "bg-[#1A1A1A] border-white/5 opacity-80 hover:opacity-100"
      )}
    >
      <div className={cn("p-6 md:p-8 flex justify-between items-center", isActive ? "pb-4" : "")}>
        <h2 className="flex items-center gap-4 text-[1.1em] md:text-[1.2em]">
          <span
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full text-[0.8em] font-bold transition-colors shrink-0",
              isActive ? "bg-white text-black" : "bg-white/10 text-white"
            )}
          >
            {isPast && !isActive ? <CheckCircle2 className="w-6 h-6" /> : step}
          </span>
          {title}
        </h2>

        {isPast && !isActive && (
          <button
            onClick={onEdit}
            className="flex items-center gap-2 text-[0.8em] text-white/50 hover:text-white transition-colors py-2 px-4 rounded-full hover:bg-white/10"
          >
            <Edit2 className="w-4 h-4" /> Edit
          </button>
        )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {isActive ? (
          <motion.div
            key="active"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="px-6 md:px-8 pb-8"
          >
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-[0.8em] text-white/40 hover:text-white/70 mb-5 transition-colors py-1.5 px-3 rounded-lg hover:bg-white/5"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            {children}
          </motion.div>
        ) : (
          <motion.div
            key="readonly"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 md:px-8 pb-6 text-white/60"
          >
            {readOnlyContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Chip ────────────────────────────────────────────────────────────────────

const Chip: React.FC<{ label: string; selected: boolean; onClick: () => void; image?: string }> = ({
  label,
  selected,
  onClick,
  image,
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={cn(
      "flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all duration-200 text-[0.9em] font-medium",
      selected
        ? "bg-white text-black border-white shadow-lg"
        : "bg-transparent text-white/70 border-white/20 hover:border-white/40"
    )}
  >
    {image && (
      <img
        src={image}
        alt={label}
        className={cn(
          "w-8 h-8 object-contain rounded-lg",
          selected ? "opacity-100" : "opacity-50"
        )}
      />
    )}
    {label}
  </motion.button>
);

// ─── Continue / Back button row ───────────────────────────────────────────────

const ActionRow: React.FC<{
  onContinue: () => void;
  continueDisabled?: boolean;
  continueLabel?: string;
  leftSlot?: React.ReactNode;
}> = ({ onContinue, continueDisabled, continueLabel = "Continue", leftSlot }) => (
  <div className="flex justify-between items-center pt-6 border-t border-white/10 mt-2">
    <div>{leftSlot}</div>
    <button
      onClick={onContinue}
      disabled={continueDisabled}
      className="bg-[#00A3E0] disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed text-white px-10 py-3 rounded-full font-semibold transition-all hover:bg-[#008CC0] hover:shadow-lg active:scale-95"
    >
      {continueLabel}
    </button>
  </div>
);

// ─── Component placement tracker ──────────────────────────────────────────────

const PlacementTracker: React.FC<{
  components: string[];
  pinMap: PinMap;
  activeComponent: string;
  aiSuggestedPins: Set<string>;
  onSelect: (c: string) => void;
}> = ({ components, pinMap, activeComponent, aiSuggestedPins, onSelect }) => {
  const allPlaced = components.every((c) => pinMap[c]);

  return (
    <div className="bg-[#252525] rounded-xl border border-white/10 p-5 space-y-3">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[0.8em] uppercase tracking-wider text-white/50 font-medium">
          Component placement
        </p>
        <span className="text-[0.75em] text-white/40">
          {Object.keys(pinMap).length}/{components.length} placed
        </span>
      </div>

      {components.map((comp) => {
        const placed = !!pinMap[comp];
        const isSelected = activeComponent === comp;
        const isAI = aiSuggestedPins.has(comp);
        const img = COMPONENT_IMAGES[comp];
        return (
          <motion.button
            key={comp}
            onClick={() => onSelect(comp)}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left",
              isSelected
                ? "bg-[#1450f5]/15 border-[#1450f5]/50 text-white"
                : placed
                ? "bg-white/5 border-white/10 text-white/70 hover:border-white/25"
                : "bg-transparent border-white/10 text-white/50 hover:border-white/25"
            )}
          >
            {img ? (
              <img
                src={img}
                alt={comp}
                className={cn(
                  "w-9 h-9 object-contain rounded-lg border shrink-0",
                  isSelected ? "border-[#1450f5]/40" : "border-white/10",
                  !placed && !isSelected ? "opacity-40" : "opacity-90"
                )}
              />
            ) : placed ? (
              isAI ? (
                <Sparkles className="w-5 h-5 text-[#1450f5] shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )
            ) : (
              <Circle
                className={cn("w-5 h-5 shrink-0", isSelected ? "text-[#1450f5]" : "text-white/25")}
              />
            )}

            <div className="flex-1 min-w-0">
              <p className="text-[0.9em] font-medium leading-none mb-0.5">{comp}</p>
              {placed && pinMap[comp] && (
                <p className="text-[0.72em] text-white/40 font-mono">
                  {isAI ? "✦ AI suggested · " : ""}X {pinMap[comp].x.toFixed(0)} · Y {pinMap[comp].y.toFixed(0)}
                </p>
              )}
              {!placed && isSelected && (
                <p className="text-[0.72em] text-[#1450f5]/70">Click the image to pin</p>
              )}
              {!placed && !isSelected && (
                <p className="text-[0.72em] text-white/30">Not placed yet</p>
              )}
            </div>

            {placed && (
              <span className={cn(
                "text-[0.7em] px-2 py-0.5 rounded-full shrink-0",
                isAI ? "bg-[#1450f5]/15 text-[#1450f5]" : "bg-emerald-400/10 text-emerald-400"
              )}>
                {isSelected ? "Repin" : isAI ? "AI" : "✓"}
              </span>
            )}
            {isSelected && !placed && (
              <span className="text-[0.7em] bg-[#00A3E0]/20 text-[#00A3E0] px-2 py-0.5 rounded-full shrink-0">
                Active
              </span>
            )}
          </motion.button>
        );
      })}

      {allPlaced && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 pt-1 text-[0.8em] text-[#00A3E0]"
        >
          <CheckCircle2 className="w-4 h-4" />
          All components placed — ready to continue
        </motion.div>
      )}
    </div>
  );
};

// ─── Download tile ────────────────────────────────────────────────────────────

const DownloadTile: React.FC<{
  icon: React.ReactNode;
  label: string;
  sub: string;
  accent?: boolean;
}> = ({ icon, label, sub, accent }) => (
  <div
    className={cn(
      "flex flex-col items-center justify-between gap-6 rounded-2xl border p-8 transition-all",
      accent
        ? "bg-[#00A3E0]/10 border-[#00A3E0]/30 hover:border-[#00A3E0]/60"
        : "bg-white/5 border-white/10 hover:border-white/25"
    )}
  >
    <div
      className={cn(
        "w-16 h-16 rounded-2xl flex items-center justify-center",
        accent ? "bg-[#00A3E0]/20" : "bg-white/10"
      )}
    >
      {icon}
    </div>
    <div className="text-center">
      <p className="font-semibold text-[1em] mb-1">{label}</p>
      <p className="text-white/50 text-[0.78em]">{sub}</p>
    </div>
    <button
      className={cn(
        "flex items-center gap-2 px-6 py-2.5 rounded-full text-[0.85em] font-semibold transition-all active:scale-95",
        accent
          ? "bg-[#00A3E0] text-white hover:bg-[#008CC0]"
          : "bg-white/10 text-white hover:bg-white/20"
      )}
    >
      <Download className="w-4 h-4" />
      Download
    </button>
  </div>
);

// ─── Zoomed component preview ─────────────────────────────────────────────────

const ZoomedComponentView: React.FC<{
  imageUrl: string | null;
  pin: { x: number; y: number } | undefined;
  label: string;
  componentImg?: string;
}> = ({ imageUrl, pin, label, componentImg }) => {
  if (!imageUrl || !pin) {
    return (
      <div className="relative rounded-xl overflow-hidden h-40 bg-[#1A1A1A] border border-white/10 flex items-center justify-center">
        <div className="text-center space-y-2">
          <ImageIcon className="w-8 h-8 text-white/20 mx-auto" />
          <p className="text-[0.72em] text-white/25">{label}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden h-40 border border-white/15 group">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "300%",
          backgroundPosition: `${pin.x}% ${pin.y}%`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      {componentImg && (
        <div className="absolute top-2 right-2 w-10 h-10 rounded-lg overflow-hidden border border-white/30 bg-black/40">
          <img src={componentImg} alt={label} className="w-full h-full object-contain p-1" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between">
        <span className="text-white text-[0.72em] font-semibold drop-shadow">{label}</span>
        <span className="text-[0.65em] text-white/60 bg-black/40 px-1.5 py-0.5 rounded">zoomed</span>
      </div>
    </div>
  );
};

// ─── AI Pin Placement ─────────────────────────────────────────────────────────

function getAISuggestedPosition(
  component: string,
  index: number,
  total: number,
  seed: number = 0
): { x: number; y: number } {
  const name = component.toLowerCase();

  if (name.includes("door") || name.includes("elevator") || name.includes("lift"))
    return { x: 50 + seed * 2, y: 55 + seed };
  if (name.includes("screen") || name.includes("display") || name.includes("monitor") || name.includes("panel"))
    return { x: 25 + seed * 3, y: 28 + seed * 2 };
  if (name.includes("handrail") || name.includes("rail") || name.includes("grab"))
    return { x: 18 + seed, y: 52 + seed * 2 };
  if (name.includes("light") || name.includes("ceiling") || name.includes("lamp") || name.includes("fixture"))
    return { x: 50 + seed * 4, y: 10 + seed };
  if (name.includes("floor") || name.includes("tile") || name.includes("ground"))
    return { x: 50 + seed * 3, y: 82 + seed };
  if (name.includes("wall"))
    return { x: 14 + seed * 2, y: 44 + seed * 3 };
  if (name.includes("button") || name.includes("control") || name.includes("keypad") || name.includes("cop"))
    return { x: 20 + seed, y: 55 + seed * 2 };
  if (name.includes("mirror") || name.includes("glass"))
    return { x: 80 + seed, y: 38 + seed * 2 };
  if (name.includes("logo") || name.includes("signage") || name.includes("sign") || name.includes("brand"))
    return { x: 65 + seed * 2, y: 18 + seed };
  if (name.includes("camera") || name.includes("security") || name.includes("sensor"))
    return { x: 85 + seed, y: 12 + seed };
  if (name.includes("lci") || name.includes("indicator"))
    return { x: 78 + seed, y: 40 + seed };
  if (name.includes("ventilation") || name.includes("vent") || name.includes("fan"))
    return { x: 50 + seed * 3, y: 8 + seed };
  if (name.includes("speaker") || name.includes("audio"))
    return { x: 88 + seed, y: 22 + seed };
  if (name.includes("car") || name.includes("cabin"))
    return { x: 50 + seed * 2, y: 50 + seed };

  const cols = Math.ceil(Math.sqrt(total));
  const col = index % cols;
  const row = Math.floor(index / cols);
  const x = 20 + (col / Math.max(cols - 1, 1)) * 60 + seed * 3;
  const y = 22 + (row / Math.max(Math.ceil(total / cols) - 1, 1)) * 55 + seed * 3;
  return { x: Math.min(90, Math.max(10, x)), y: Math.min(90, Math.max(10, y)) };
}

function autoPlaceAll(components: string[], seed: number = 0): PinMap {
  const result: PinMap = {};
  components.forEach((comp, i) => {
    result[comp] = getAISuggestedPosition(comp, i, components.length, seed);
  });
  return result;
}

// ─── Main page ────────────────────────────────────────────────────────────────

type HomeProps = {
  projectName: string;
  initialOfferings: Offering[];
  onLogout: () => void;
  onOfferingsChange: (offerings: Offering[]) => void;
  onBuildBrochure: (offerings: Offering[]) => void;
  onBackToDashboard: () => void;
};

export default function Home({ projectName, initialOfferings, onLogout, onOfferingsChange, onBuildBrochure, onBackToDashboard }: HomeProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [highestStep, setHighestStep] = useState(1);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadFileName, setUploadFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [useCases, setUseCases] = useState<string[]>([]);
  const [components, setComponents] = useState<string[]>([]);

  const [pinMap, setPinMap] = useState<PinMap>({});
  const [activeComponent, setActiveComponent] = useState<string>("");

  const [imageScale, setImageScale] = useState(1);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [videoConfig, setVideoConfig] = useState({ option: "Zoom in", speed: "1×", quality: "1080p" });

  const [savedOfferings, setSavedOfferings] = useState<Offering[]>(initialOfferings);

  const [aiSuggestedPins, setAiSuggestedPins] = useState<Set<string>>(new Set());
  const [regenSeed, setRegenSeed] = useState(0);
  const [aiPlacing, setAiPlacing] = useState(false);

  const handleLogout = () => onLogout();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedImage(ev.target?.result as string);
      setUploadFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const previewImage =
    uploadedImage ||
    "https://images.unsplash.com/photo-1579762593175-20226054cad0?w=1200&h=900&fit=crop";

  const resetWorkflow = () => {
    setActiveStep(1);
    setHighestStep(1);
    setUploadedImage(null);
    setUploadFileName("");
    setUseCases([]);
    setComponents([]);
    setPinMap({});
    setActiveComponent("");
    setAiSuggestedPins(new Set());
    setRegenSeed(0);
    setImageScale(1);
    setShowAnnotations(true);
    setVideoConfig({ option: "Zoom in", speed: "1×", quality: "1080p" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveOffering = () => {
    const id = savedOfferings.length + 1;
    const newOffering: Offering = { id, label: `Offering ${id}`, components, useCases };
    const updated = [...savedOfferings, newOffering];
    setSavedOfferings(updated);
    onOfferingsChange(updated);
  };

  const handleContinue = (nextStep: number) => {
    setActiveStep(nextStep);
    if (nextStep > highestStep) setHighestStep(nextStep);
  };

  const handleBack = (prevStep: number) => {
    setActiveStep(prevStep);
  };

  const goToStep = (step: number) => {
    if (step <= highestStep) setActiveStep(step);
  };

  const toggleArrayItem = (
    arr: string[],
    setArr: React.Dispatch<React.SetStateAction<string[]>>,
    item: string
  ) => {
    setArr(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!activeComponent) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPinMap((prev) => ({ ...prev, [activeComponent]: { x, y } }));
    setAiSuggestedPins((prev) => {
      const next = new Set(prev);
      next.delete(activeComponent);
      return next;
    });

    const unplaced = components.find((c) => c !== activeComponent && !pinMap[c] && !{ ...pinMap, [activeComponent]: { x, y } }[c]);
    if (unplaced) setActiveComponent(unplaced);
  };

  const handleRestoreDefault = () => {
    setRegenSeed((s) => s + 1);
  };

  useEffect(() => {
    if (activeStep === 3 && components.length > 0) {
      setAiPlacing(true);
      setPinMap({});
      setAiSuggestedPins(new Set());
      const placements = autoPlaceAll(components, regenSeed);
      components.forEach((comp, i) => {
        setTimeout(() => {
          setPinMap((prev) => ({ ...prev, [comp]: placements[comp] }));
          setAiSuggestedPins((prev) => new Set([...prev, comp]));
          if (i === components.length - 1) setAiPlacing(false);
        }, i * 180 + 300);
      });
      setActiveComponent(components[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, regenSeed]);

  useEffect(() => {
    setPinMap((prev) => {
      const next: PinMap = {};
      components.forEach((c) => { if (prev[c]) next[c] = prev[c]; });
      return next;
    });
    setAiSuggestedPins((prev) => {
      const next = new Set<string>();
      components.forEach((c) => { if (prev.has(c)) next.add(c); });
      return next;
    });
    if (!components.includes(activeComponent)) {
      setActiveComponent(components[0] || "");
    }
  }, [components]);

  const showCarOptions = useCases.includes("Car");
  const showLobbyOptions = useCases.includes("Lobby");
  const allPlaced = components.length > 0 && components.every((c) => pinMap[c]);

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-white/10 px-6 py-3.5 flex justify-between items-center">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/80 transition-colors text-[0.8em] py-1.5 px-2 rounded-lg hover:bg-white/5 flex-shrink-0"
          >
            <BackIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Projects</span>
          </button>
          <div className="h-5 w-px bg-white/15 flex-shrink-0" />
          <img
            src="/logo.png"
            alt="KONE"
            className="h-7 object-contain flex-shrink-0"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              (e.currentTarget.parentElement as HTMLElement).innerHTML =
                '<span class="font-bold tracking-widest text-white flex-shrink-0">KONE</span>';
            }}
          />
          <div className="h-5 w-px bg-white/15 flex-shrink-0" />
          <span className="text-white font-semibold tracking-tight text-[1.05em] flex-shrink-0">
            Sales<span className="text-[#1450f5]">NXT</span>
          </span>
          <div className="h-5 w-px bg-white/10 flex-shrink-0 hidden sm:block" />
          <span className="text-white/40 text-[0.85em] truncate hidden sm:block">{projectName}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[0.8em] text-white/40 hover:text-white/80 transition-colors py-2 px-3 rounded-lg hover:bg-white/5 flex-shrink-0"
        >
          <UserCircle className="w-5 h-5" />
          <span className="hidden sm:inline">Logout</span>
          <LogOut className="w-4 h-4" />
        </button>
      </header>

      {/* ── Progress Bar ── */}
      <div className="fixed top-[57px] left-0 right-0 z-40 bg-background/95 backdrop-blur border-b border-white/5 px-6 py-3">
        <ProgressBar highestStep={highestStep} activeStep={activeStep} onGoTo={goToStep} />
      </div>

      {/* ── Main ── */}
      <main className="flex-1 w-full flex justify-center py-36 px-4 relative">
        <div className="absolute top-[8rem] bottom-[8rem] w-full max-w-5xl md:w-[75%] bg-[#A1A1A1] rounded-[2rem] translate-x-4 md:translate-x-6 translate-y-6 opacity-20 z-0 pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl md:w-[70%] bg-card rounded-[2rem] p-6 md:p-12 shadow-2xl border border-white/10 flex flex-col gap-6">

          {/* ── STEP 1: Upload ── */}
          <StepContainer
            step={1}
            activeStep={activeStep}
            title="Upload picture / video"
            isCompleted={highestStep > 1}
            onEdit={() => setActiveStep(1)}
            readOnlyContent={
              <div className="flex items-center gap-3 text-[0.9em]">
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Uploaded" className="w-11 h-11 rounded-xl object-cover border border-white/10" />
                ) : (
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white/50" />
                  </div>
                )}
                <div>
                  <p className="text-white font-medium">{uploadFileName || "Media uploaded"}</p>
                  <p className="text-[0.8em] text-white/40">Hi-res · ready to use</p>
                </div>
              </div>
            }
          >
            <div className="space-y-7">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,video/mpeg,video/mp4"
                className="hidden"
                onChange={handleFileChange}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all group",
                  uploadedImage
                    ? "border-[#00A3E0]/50 bg-[#00A3E0]/5"
                    : "border-white/20 bg-white/3 hover:bg-white/5 hover:border-white/35"
                )}
              >
                {uploadedImage ? (
                  <div className="flex flex-col items-center gap-4 w-full">
                    <img
                      src={uploadedImage}
                      alt="Preview"
                      className="max-h-48 rounded-xl object-contain border border-white/10 shadow-lg"
                    />
                    <div>
                      <p className="text-[1em] font-medium mb-1 text-[#00A3E0]">
                        <CheckCircle2 className="inline w-5 h-5 mr-1 align-middle" />
                        {uploadFileName || "File selected"}
                      </p>
                      <p className="text-white/45 text-[0.8em]">Click to replace</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-18 h-18 rounded-full bg-white/10 flex items-center justify-center mb-5 transition-transform group-hover:scale-105">
                      <UploadCloud className="w-9 h-9 text-white" />
                    </div>
                    <p className="text-[1em] font-medium mb-1">Drag & drop or click to browse</p>
                    <p className="text-white/45 text-[0.8em] mb-5">Supported: .jpg  .jpeg  .png  .mpeg</p>
                    <div className="bg-[#2A2A2A] rounded-xl p-5 max-w-md border border-white/5 text-left">
                      <p className="text-[0.82em] text-white/60 font-medium mb-2">Recommended specs</p>
                      <p className="text-[0.82em] text-white/50">· 4:3 aspect ratio (portrait orientation)</p>
                      <p className="text-[0.82em] text-white/50">· High resolution still or HDR video</p>
                    </div>
                  </>
                )}
              </div>

              <ActionRow onContinue={() => handleContinue(2)} continueDisabled={!uploadedImage} />
            </div>
          </StepContainer>

          {/* ── STEP 2: Use Case & Components ── */}
          <StepContainer
            step={2}
            activeStep={activeStep}
            title="Use Case & Components"
            isCompleted={highestStep > 2}
            onEdit={() => setActiveStep(2)}
            onBack={() => handleBack(1)}
            readOnlyContent={
              <div className="text-[0.9em] space-y-4">
                <div>
                  <p className="text-white/40 mb-2 text-[0.8em] uppercase tracking-wide">Environment</p>
                  <div className="flex flex-wrap gap-2">
                    {useCases.map((uc) => (
                      <span key={uc} className="bg-white/10 px-4 py-1.5 rounded-full text-white text-[0.9em]">{uc}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-white/40 mb-2 text-[0.8em] uppercase tracking-wide">Components</p>
                  <div className="flex flex-wrap gap-2">
                    {components.map((c) => (
                      <span key={c} className="flex items-center gap-1.5 bg-[#00A3E0]/15 border border-[#00A3E0]/35 px-3 py-1.5 rounded-full text-white text-[0.9em]">
                        {COMPONENT_IMAGES[c] && (
                          <img src={COMPONENT_IMAGES[c]} alt={c} className="w-5 h-5 object-contain" />
                        )}
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            }
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-white/60 mb-4 text-[0.9em] font-medium uppercase tracking-wide">Where will this be used?</h3>
                <div className="flex flex-wrap gap-3">
                  <Chip label="Car" selected={useCases.includes("Car")} onClick={() => toggleArrayItem(useCases, setUseCases, "Car")} />
                  <Chip label="Lobby" selected={useCases.includes("Lobby")} onClick={() => toggleArrayItem(useCases, setUseCases, "Lobby")} />
                </div>
              </div>

              <AnimatePresence>
                {(showCarOptions || showLobbyOptions) && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="pt-6 border-t border-white/10 space-y-4"
                  >
                    <h3 className="text-white/60 mb-4 text-[0.9em] font-medium uppercase tracking-wide">Which components are needed?</h3>
                    <div className="flex flex-wrap gap-3">
                      {showCarOptions && (
                        <>
                          <Chip
                            label="COP"
                            selected={components.includes("COP")}
                            onClick={() => toggleArrayItem(components, setComponents, "COP")}
                            image={COMPONENT_IMAGES["COP"]}
                          />
                          <Chip
                            label="Ceiling"
                            selected={components.includes("Ceiling")}
                            onClick={() => toggleArrayItem(components, setComponents, "Ceiling")}
                            image={COMPONENT_IMAGES["Ceiling"]}
                          />
                        </>
                      )}
                      {showLobbyOptions && (
                        <>
                          <Chip
                            label="LCI"
                            selected={components.includes("LCI")}
                            onClick={() => toggleArrayItem(components, setComponents, "LCI")}
                            image={COMPONENT_IMAGES["LCI"]}
                          />
                          <Chip
                            label="Door"
                            selected={components.includes("Door")}
                            onClick={() => toggleArrayItem(components, setComponents, "Door")}
                            image={COMPONENT_IMAGES["Door"]}
                          />
                        </>
                      )}
                    </div>

                    {/* Component previews row */}
                    {components.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                        {components.map((comp) => (
                          COMPONENT_IMAGES[comp] && (
                            <div key={comp} className="bg-[#1A1A1A] rounded-xl border border-white/10 p-3 flex flex-col items-center gap-2">
                              <img
                                src={COMPONENT_IMAGES[comp]}
                                alt={comp}
                                className="h-20 object-contain"
                              />
                              <span className="text-[0.75em] text-white/60 font-medium">{comp}</span>
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <ActionRow
                onContinue={() => { setActiveComponent(components[0] || ""); handleContinue(3); }}
                continueDisabled={useCases.length === 0 || components.length === 0}
              />
            </div>
          </StepContainer>

          {/* ── STEP 3: Pin Placement ── */}
          <StepContainer
            step={3}
            activeStep={activeStep}
            title="Place Components"
            isCompleted={highestStep > 3}
            onEdit={() => setActiveStep(3)}
            onBack={() => handleBack(2)}
            readOnlyContent={
              <div className="flex flex-wrap items-center gap-3 text-[0.85em]">
                {components.map((c) => (
                  <span
                    key={c}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-full border",
                      pinMap[c]
                        ? "bg-[#00A3E0]/10 border-[#00A3E0]/30 text-[#00A3E0]"
                        : "bg-white/5 border-white/10 text-white/40"
                    )}
                  >
                    {pinMap[c] ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                    {c}
                  </span>
                ))}
              </div>
            }
          >
            <div className="space-y-5">
              {/* AI info banner */}
              <div className={cn(
                "flex items-start gap-3 rounded-xl p-4 border transition-all",
                aiPlacing
                  ? "bg-[#1450f5]/10 border-[#1450f5]/30"
                  : "bg-[#2A2A2A] border-white/5"
              )}>
                {aiPlacing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-[#1450f5] shrink-0 mt-0.5" />
                  </motion.div>
                ) : (
                  <Wand2 className="w-5 h-5 text-[#1450f5] shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-[0.83em] text-white/80 leading-relaxed font-medium">
                    {aiPlacing
                      ? "AI is analysing the space and placing component pins…"
                      : "AI has pre-placed all components based on spatial intelligence."}
                  </p>
                  {!aiPlacing && (
                    <p className="text-[0.78em] text-white/45 mt-0.5">
                      Click any component in the panel to select it, then click the image to reposition its pin. Sparkle pins are AI-placed.
                    </p>
                  )}
                </div>
              </div>

              {/* Two-column layout: image + tracker */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">

                {/* Preview image */}
                <div className="relative rounded-xl overflow-hidden border border-white/20 bg-black h-[400px]">
                  <div
                    className={cn(
                      "absolute inset-0 z-10",
                      activeComponent ? "cursor-crosshair" : "cursor-not-allowed"
                    )}
                    onClick={handleImageClick}
                  />

                  <motion.div
                    className="w-full h-full relative"
                    animate={{ scale: imageScale }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={previewImage}
                      className="w-full h-full object-cover"
                      alt="Preview"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                    {components.map((comp) =>
                      pinMap[comp] ? (
                        <motion.div
                          key={comp}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                          className={cn(
                            "absolute z-20 pointer-events-none flex flex-col items-center",
                            activeComponent === comp ? "opacity-100" : "opacity-75"
                          )}
                          style={{
                            left: `${pinMap[comp].x}%`,
                            top: `${pinMap[comp].y}%`,
                            transform: "translate(-50%, -100%)",
                          }}
                        >
                          <div className="relative">
                            <div
                              className={cn(
                                "text-white text-[11px] font-medium px-2 py-1 rounded-md mb-1 shadow-lg whitespace-nowrap flex items-center gap-1",
                                activeComponent === comp
                                  ? "bg-[#1450f5]"
                                  : aiSuggestedPins.has(comp)
                                  ? "bg-[#1450f5]/70 backdrop-blur"
                                  : "bg-white/30 backdrop-blur"
                              )}
                            >
                              {aiSuggestedPins.has(comp) && (
                                <Sparkles className="w-2.5 h-2.5 text-white/80" />
                              )}
                              {comp}
                            </div>
                          </div>
                          <MapPin
                            className={cn(
                              "w-7 h-7 drop-shadow-md",
                              activeComponent === comp
                                ? "text-[#1450f5]"
                                : aiSuggestedPins.has(comp)
                                ? "text-[#1450f5]/70"
                                : "text-white/60"
                            )}
                          />
                        </motion.div>
                      ) : null
                    )}
                  </motion.div>

                  {/* Zoom controls */}
                  <div className="absolute bottom-3 right-3 z-30 flex gap-1.5">
                    <button
                      onClick={() => setImageScale(Math.max(1, imageScale - 0.2))}
                      className="bg-black/60 backdrop-blur p-2 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <ZoomOut className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => setImageScale(Math.min(3, imageScale + 0.2))}
                      className="bg-black/60 backdrop-blur p-2 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <ZoomIn className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {!activeComponent && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                      <p className="text-white/30 text-[0.85em]">Select a component to start placing</p>
                    </div>
                  )}
                </div>

                {/* Placement tracker */}
                <PlacementTracker
                  components={components}
                  pinMap={pinMap}
                  activeComponent={activeComponent}
                  aiSuggestedPins={aiSuggestedPins}
                  onSelect={setActiveComponent}
                />
              </div>

              <ActionRow
                onContinue={() => handleContinue(4)}
                continueDisabled={!allPlaced || aiPlacing}
                continueLabel={
                  aiPlacing
                    ? "AI is placing pins…"
                    : allPlaced
                    ? "Continue"
                    : `Place ${components.length - Object.keys(pinMap).length} more`
                }
                leftSlot={
                  <button
                    onClick={handleRestoreDefault}
                    disabled={aiPlacing}
                    className={cn(
                      "flex items-center gap-2 text-[0.85em] px-4 py-2.5 rounded-full transition-all",
                      aiPlacing
                        ? "text-white/25 cursor-wait"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Restore to default
                  </button>
                }
              />
            </div>
          </StepContainer>

          {/* ── STEP 4: Preview with Annotations ── */}
          <StepContainer
            step={4}
            activeStep={activeStep}
            title="Preview with Annotations"
            isCompleted={highestStep > 4}
            onEdit={() => setActiveStep(4)}
            onBack={() => handleBack(3)}
            readOnlyContent={
              <div className="flex items-center gap-3 text-[0.85em]">
                <div className="w-10 h-10 rounded-xl bg-[#00A3E0]/10 border border-[#00A3E0]/30 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <p className="text-white">
                  {components.length} annotation{components.length !== 1 ? "s" : ""} applied
                </p>
              </div>
            }
          >
            <div className="space-y-5">
              {/* Controls row: legend + toggle */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {components.map((comp) => (
                    <span
                      key={comp}
                      className="flex items-center gap-1.5 text-[0.78em] px-3 py-1.5 rounded-full bg-[#00A3E0]/10 border border-[#00A3E0]/30 text-[#00A3E0]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] inline-block" />
                      {comp}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setShowAnnotations((v) => !v)}
                  className={cn(
                    "flex items-center gap-2 text-[0.82em] px-4 py-2 rounded-full border transition-all",
                    showAnnotations
                      ? "bg-[#00A3E0]/15 border-[#00A3E0]/40 text-[#00A3E0] hover:bg-[#00A3E0]/25"
                      : "bg-white/5 border-white/15 text-white/50 hover:border-white/30 hover:text-white"
                  )}
                >
                  {showAnnotations ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  {showAnnotations ? "Annotations on" : "Annotations off"}
                </button>
              </div>

              {/* Annotated image */}
              <div className="relative rounded-xl overflow-hidden border border-white/20 bg-black h-[520px]">
                <img
                  src={previewImage}
                  className="w-full h-full object-cover opacity-85"
                  alt="Annotated Preview"
                />

                <AnimatePresence>
                  {showAnnotations && components.map((comp, idx) => {
                    const pin = pinMap[comp];
                    if (!pin) return null;

                    const goRight = idx % 2 === 0;
                    const lx = goRight ? 80 : -80;
                    const labelOffset = goRight ? "left-full ml-2" : "right-full mr-2";

                    return (
                      <motion.div
                        key={comp}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: idx * 0.12, duration: 0.3 }}
                        className="absolute"
                        style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                      >
                        <div className="absolute w-3 h-3 rounded-full bg-[#00A3E0] border-2 border-white shadow-[0_0_8px_rgba(0,163,224,0.8)] -translate-x-1/2 -translate-y-1/2" />

                        <svg
                          className="absolute overflow-visible pointer-events-none"
                          style={{
                            left: 0,
                            top: 0,
                            width: Math.abs(lx) + 10,
                            height: 40,
                            transform: goRight
                              ? "translate(4px, -36px)"
                              : `translate(${lx - 4}px, -36px)`,
                          }}
                        >
                          <path
                            d={goRight
                              ? `M 0 36 L 20 10 L ${Math.abs(lx)} 10`
                              : `M ${Math.abs(lx)} 36 L ${Math.abs(lx) - 20} 10 L 0 10`}
                            fill="none"
                            stroke="#00A3E0"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                          />
                        </svg>

                        <div
                          className={cn(
                            "absolute -top-10 bg-[#141414]/90 backdrop-blur-md border border-[#00A3E0]/50 rounded-xl px-3 py-2 shadow-2xl whitespace-nowrap",
                            labelOffset
                          )}
                          style={{ transform: "translateY(-4px)" }}
                        >
                          <div className="flex items-center gap-2 mb-0.5">
                            {COMPONENT_IMAGES[comp] && (
                              <img src={COMPONENT_IMAGES[comp]} alt={comp} className="w-4 h-4 object-contain opacity-80" />
                            )}
                            <p className="text-[0.65em] text-[#00A3E0] font-semibold uppercase tracking-wider">
                              {comp}
                            </p>
                          </div>
                          <p className="text-[0.72em] text-white/60">Generated component</p>
                        </div>

                        <div className="absolute w-10 h-10 rounded-lg border border-[#00A3E0]/60 bg-[#00A3E0]/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              <ActionRow
                onContinue={() => handleContinue(5)}
                leftSlot={
                  <button className="flex items-center gap-2 text-[0.85em] text-white/50 hover:text-white px-4 py-2.5 rounded-full hover:bg-white/5 transition-colors">
                    <RefreshCcw className="w-4 h-4" />
                    Regenerate
                  </button>
                }
              />
            </div>
          </StepContainer>

          {/* ── STEP 5: Video Settings ── */}
          <StepContainer
            step={5}
            activeStep={activeStep}
            title="Video Settings"
            isCompleted={highestStep > 5}
            onEdit={() => setActiveStep(5)}
            onBack={() => handleBack(4)}
            readOnlyContent={
              <div className="flex items-center gap-3 text-[0.85em]">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <PlayCircle className="w-5 h-5 text-[#00A3E0]" />
                </div>
                <div>
                  <p className="text-white font-medium">{videoConfig.option}</p>
                  <p className="text-white/40 text-[0.85em]">{videoConfig.speed} · {videoConfig.quality}</p>
                </div>
              </div>
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Video preview */}
              <div className="relative rounded-xl overflow-hidden border border-white/20 bg-black aspect-video flex items-center justify-center group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,163,224,0.12)_0%,transparent_70%)]" />
                <PlayCircle className="w-16 h-16 text-white/70 group-hover:text-white group-hover:scale-110 transition-all cursor-pointer z-10" />
                <img
                  src={previewImage}
                  className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay pointer-events-none"
                  alt="Video placeholder"
                />
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg">
                  <span className="text-[0.72em] text-white/80 font-medium">{videoConfig.option}</span>
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-6 flex flex-col justify-center">
                {[
                  {
                    label: "Motion Style",
                    options: ["Zoom in", "Pan L-R", "Pan R-L"],
                    active: videoConfig.option,
                    set: (v: string) => setVideoConfig({ ...videoConfig, option: v }),
                  },
                  {
                    label: "Speed",
                    options: ["0.5×", "1×", "1.5×"],
                    active: videoConfig.speed,
                    set: (v: string) => setVideoConfig({ ...videoConfig, speed: v }),
                  },
                  {
                    label: "Quality",
                    options: ["360p", "480p", "720p", "1080p"],
                    active: videoConfig.quality,
                    set: (v: string) => setVideoConfig({ ...videoConfig, quality: v }),
                  },
                ].map(({ label, options, active, set }) => (
                  <div key={label}>
                    <p className="text-[0.78em] text-white/50 uppercase tracking-wider font-medium mb-3">{label}</p>
                    <div className="flex gap-2">
                      {options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => set(opt)}
                          className={cn(
                            "flex-1 py-2.5 rounded-xl border transition-all text-[0.85em] font-medium",
                            active === opt
                              ? "bg-[#00A3E0] border-[#00A3E0] text-white"
                              : "bg-transparent border-white/15 text-white/60 hover:border-white/35"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ActionRow onContinue={() => handleContinue(6)} />
          </StepContainer>

          {/* ── STEP 6: Render & Download ── */}
          <StepContainer
            step={6}
            activeStep={activeStep}
            title="Render & Download"
            isCompleted={highestStep > 6}
            onEdit={() => setActiveStep(6)}
            onBack={() => handleBack(5)}
            readOnlyContent={
              <div className="flex items-center gap-3 text-[0.85em]">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Download className="w-5 h-5 text-white/50" />
                </div>
                <p className="text-white">Outputs ready for download</p>
              </div>
            }
          >
            <div className="space-y-6">
              <p className="text-[0.85em] text-white/50">
                Your outputs are ready. Download any combination below.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                <DownloadTile
                  icon={<ImageIcon className="w-8 h-8 text-white/80" />}
                  label="Rendered Image"
                  sub="High-quality composite render"
                />
                <DownloadTile
                  icon={<Layers className="w-8 h-8 text-[#00A3E0]" />}
                  label="Image with Callouts"
                  sub="Render with annotation overlay"
                  accent
                />
                <DownloadTile
                  icon={<Film className="w-8 h-8 text-white/80" />}
                  label="Video"
                  sub={`${videoConfig.quality} · ${videoConfig.option} · ${videoConfig.speed}`}
                />
              </div>

              {/* Zoomed component-in-environment views */}
              {components.length > 0 && (
                <div className="bg-[#252525] rounded-2xl border border-white/10 p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <ScanSearch className="w-4 h-4 text-[#00A3E0]" />
                    <p className="text-[0.8em] text-white/50 uppercase tracking-wider font-medium">
                      Zoomed Component Views in Environment
                    </p>
                  </div>
                  <p className="text-[0.78em] text-white/35">
                    Each image is a zoomed-in crop of your environment photo, centred on where the component is placed.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {components.map((comp) => (
                      <div key={comp} className="space-y-2">
                        <ZoomedComponentView
                          imageUrl={uploadedImage}
                          pin={pinMap[comp]}
                          label={comp}
                          componentImg={COMPONENT_IMAGES[comp]}
                        />
                        <button className="w-full flex items-center justify-center gap-1.5 text-[0.75em] text-white/60 hover:text-white py-2 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all">
                          <Download className="w-3 h-3" />
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Save as Offering ── */}
              <div className="border-t border-white/10 pt-6 space-y-4">
                <div>
                  <p className="text-white font-medium text-[0.95em]">Save this configuration as an Offering</p>
                  <p className="text-white/40 text-[0.82em] mt-0.5">
                    Saved offerings will be available when building your Sales Brochure.
                  </p>
                </div>

                {savedOfferings.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {savedOfferings.map((o) => (
                      <span key={o.id} className="flex items-center gap-1.5 text-[0.8em] px-3 py-1.5 bg-[#1450f5]/10 border border-[#1450f5]/30 text-[#7b9fff] rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {o.label} saved
                      </span>
                    ))}
                  </div>
                )}

                {(() => {
                  const alreadySaved = savedOfferings.some(
                    (o) => JSON.stringify(o.components) === JSON.stringify(components) &&
                           JSON.stringify(o.useCases) === JSON.stringify(useCases)
                  );
                  return (
                    <button
                      onClick={handleSaveOffering}
                      disabled={alreadySaved || components.length === 0}
                      className={cn(
                        "flex items-center gap-2.5 px-6 py-3 rounded-xl font-medium text-[0.9em] transition-all active:scale-95",
                        alreadySaved || components.length === 0
                          ? "bg-white/5 text-white/30 cursor-not-allowed border border-white/10"
                          : "bg-[#1450f5] text-white hover:bg-[#1040d0] shadow-lg shadow-[#1450f5]/20"
                      )}
                    >
                      <BookmarkPlus className="w-4 h-4" />
                      {alreadySaved ? "Already saved" : "Save as Offering"}
                    </button>
                  );
                })()}
              </div>

              {/* Reset / new offering */}
              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <button
                  onClick={resetWorkflow}
                  className="flex items-center gap-2 text-[0.85em] text-white/40 hover:text-white/70 transition-colors py-2 px-4 rounded-lg hover:bg-white/5"
                >
                  <RotateCcw className="w-4 h-4" />
                  Start new configuration
                </button>
              </div>
            </div>
          </StepContainer>

          {/* ── Brochure CTA ── */}
          {savedOfferings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#1450f5]/15 to-[#1450f5]/5 border border-[#1450f5]/30 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="flex-1 text-center sm:text-left">
                <p className="text-white font-semibold text-[1.1em] mb-1">
                  Ready to build your Sales Brochure?
                </p>
                <p className="text-white/50 text-[0.85em]">
                  {savedOfferings.length} offering{savedOfferings.length !== 1 ? "s" : ""} saved — proceed to customise and generate your client-ready brochure.
                </p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                  {savedOfferings.map((o) => (
                    <span key={o.id} className="text-[0.75em] px-2.5 py-1 bg-[#1450f5]/15 border border-[#1450f5]/25 text-[#7b9fff] rounded-full">
                      {o.label}: {o.components.join(", ")}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onBuildBrochure(savedOfferings)}
                className="flex items-center gap-3 px-8 py-4 bg-[#1450f5] hover:bg-[#1040d0] text-white rounded-xl font-semibold text-[0.95em] transition-all active:scale-95 shadow-lg shadow-[#1450f5]/25 whitespace-nowrap"
              >
                Build Sales Brochure
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* ── Footer ── */}
          <footer className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[0.75em] text-white/35 gap-6">
            <p>© 2026 KONE Corporation. All rights reserved.</p>
            <a
              href="https://www.kone.com/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white/60 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              Help & Support
            </a>
          </footer>
        </div>
      </main>
    </div>
  );
}
