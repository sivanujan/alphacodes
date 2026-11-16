"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  CheckCircle2,
  MoveHorizontal,
} from "lucide-react";

interface ProcessStep {
  id: string;
  number: string;
  name: string;
  description: string;
  deliverables: string[];
  illustration: React.ReactNode;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discovery",
    number: "01",
    name: "DISCOVERY",
    description: "Understand the business, users and goals; define scope.",
    deliverables: ["Scope document", "User journeys", "Tech evaluation", "Sprint milestones"],
    illustration: (
      <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        {/* Radar & Scope Nodes */}
        <circle cx="80" cy="60" r="45" stroke="#12A9EC" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="80" cy="60" r="28" stroke="#12A9EC" strokeOpacity="0.4" strokeWidth="1.5" />
        <circle cx="80" cy="60" r="10" fill="#12A9EC" fillOpacity="0.2" stroke="#12A9EC" strokeWidth="2" />
        <circle cx="80" cy="60" r="4" fill="#FFFFFF" />

        {/* Discovery Ray */}
        <line x1="80" y1="60" x2="118" y2="30" stroke="#12A9EC" strokeWidth="2" strokeLinecap="round" />
        <circle cx="118" cy="30" r="5" fill="#2563EB" />

        {/* Satellite nodes */}
        <circle cx="48" cy="40" r="4" fill="#12A9EC" />
        <circle cx="112" cy="85" r="4" fill="#38BDF8" />
        <circle cx="45" cy="80" r="3.5" fill="#10B981" />
      </svg>
    ),
  },
  {
    id: "design",
    number: "02",
    name: "DESIGN",
    description: "Wireframes, UI and prototypes validated before code.",
    deliverables: ["High-fidelity wireframes", "Design system", "Clickable prototype", "User tests"],
    illustration: (
      <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        {/* Vector Bezier Canvas */}
        <rect x="25" y="20" width="110" height="80" rx="8" fill="#07121D" stroke="#12A9EC" strokeOpacity="0.3" strokeWidth="1.5" />
        <path d="M40 75C60 30 100 95 120 40" stroke="#12A9EC" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Tangent control handles */}
        <line x1="40" y1="75" x2="60" y2="30" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="120" y1="40" x2="100" y2="85" stroke="#64748B" strokeWidth="1" strokeDasharray="2 2" />
        
        <rect x="36" y="71" width="8" height="8" rx="1.5" fill="#0B1B2B" stroke="#12A9EC" strokeWidth="1.5" />
        <rect x="116" y="36" width="8" height="8" rx="1.5" fill="#0B1B2B" stroke="#12A9EC" strokeWidth="1.5" />
        <circle cx="60" cy="30" r="3.5" fill="#2563EB" />
        <circle cx="100" cy="85" r="3.5" fill="#38BDF8" />
      </svg>
    ),
  },
  {
    id: "build",
    number: "03",
    name: "BUILD",
    description: "Engineering in short sprints with regular demos.",
    deliverables: ["Clean architecture", "Bi-weekly sprints", "Staging previews", "Automated CI/CD"],
    illustration: (
      <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        {/* Terminal Blocks & Logic Brackets */}
        <rect x="25" y="25" width="110" height="70" rx="8" fill="#07121D" stroke="#12A9EC" strokeOpacity="0.3" strokeWidth="1.5" />
        <path d="M25 42H135" stroke="#12A9EC" strokeOpacity="0.2" strokeWidth="1" />
        
        <path d="M42 58L52 68L42 78" stroke="#12A9EC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="58" y1="78" x2="74" y2="78" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Sprint progress meter */}
        <rect x="85" y="60" width="38" height="6" rx="3" fill="#11253E" />
        <rect x="85" y="60" width="28" height="6" rx="3" fill="#10B981" />
        <rect x="85" y="72" width="38" height="6" rx="3" fill="#11253E" />
        <rect x="85" y="72" width="18" height="6" rx="3" fill="#12A9EC" />
      </svg>
    ),
  },
  {
    id: "run",
    number: "04",
    name: "RUN",
    description: "Monitoring, support and post-launch iteration.",
    deliverables: ["Cloud observability", "SLA maintenance", "Cost optimisation", "Feature roadmaps"],
    illustration: (
      <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        {/* Telemetry Orbit & Metric Waves */}
        <ellipse cx="80" cy="65" rx="52" ry="24" stroke="#12A9EC" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 4" transform="rotate(-12 80 65)" />
        <circle cx="80" cy="65" r="16" fill="#11253E" stroke="#12A9EC" strokeWidth="2" />
        <circle cx="80" cy="65" r="6" fill="#10B981" />
        
        {/* Satellite Node Orbiting */}
        <circle cx="125" cy="50" r="5" fill="#12A9EC" />
        <circle cx="35" cy="80" r="4" fill="#38BDF8" />

        {/* Pulse Waves */}
        <path d="M50 102C65 96 95 106 110 98" stroke="#12A9EC" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function Process() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const totalSteps = PROCESS_STEPS.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalSteps - 1));
  }, [totalSteps]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < totalSteps - 1 ? prev + 1 : 0));
  }, [totalSteps]);

  // Motion preference detection
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsPlaying(false);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsPlaying(false);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // 5-second auto-advance timer
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, prefersReducedMotion, handleNext, currentIndex]);

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section
      id="process"
      aria-label="How We Work Process"
      className="w-full bg-[#0B1B2B] text-white py-24 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] md:w-[750px] h-[350px] md:h-[450px] bg-[#12A9EC]/12 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block: Title on Left, Carousel Controls on Right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div className="max-w-2xl">
            <span className="label-caps text-[#12A9EC] block mb-2">
              HOW WE WORK
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
              From idea{" "}
              <span className="bg-gradient-to-r from-[#12A9EC] to-[#2563EB] bg-clip-text text-transparent">
                to impact.
              </span>
            </h2>
          </div>

          {/* Controls: Prev, Pause/Play, Next */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-slate-400 mr-2 tracking-wider">
              0{currentIndex + 1} / 0{totalSteps}
            </span>

            <button
              type="button"
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-slate-700 bg-white/5 text-white flex items-center justify-center hover:bg-[#12A9EC] hover:border-[#12A9EC] transition-all duration-200 shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC]"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-11 h-11 rounded-full border border-slate-700 bg-white/5 text-white flex items-center justify-center hover:bg-[#12A9EC] hover:border-[#12A9EC] transition-all duration-200 shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC]"
              aria-label={isPlaying ? "Pause auto-advance" : "Resume auto-advance"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-slate-700 bg-white/5 text-white flex items-center justify-center hover:bg-[#12A9EC] hover:border-[#12A9EC] transition-all duration-200 shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC]"
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Perspective Carousel Stage */}
        <div
          className="relative w-full h-[520px] sm:h-[550px] md:h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          style={{ perspective: prefersReducedMotion ? undefined : 1200 }}
          tabIndex={0}
          role="region"
          aria-label="Process steps 3D carousel — use arrow keys, swipe or click to navigate"
        >
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -45) {
                handleNext();
              } else if (info.offset.x > 45) {
                handlePrev();
              }
            }}
          >
            {PROCESS_STEPS.map((step, index) => {
              // Calculate relative offset around currentIndex
              let diff = index - currentIndex;
              if (diff === 3) diff = -1;
              if (diff === -3) diff = 1;

              const isCenter = diff === 0;
              const isVisible = Math.abs(diff) <= 1;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={step.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`absolute w-[88%] sm:w-[74%] md:w-[62%] max-w-[460px] h-[480px] sm:h-[510px] md:h-[530px] rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                    isCenter
                      ? "z-30 cursor-default bg-[#0C1F33] border border-[#12A9EC] shadow-[0_0_35px_rgba(18,169,236,0.28)] ring-1 ring-[#12A9EC]/40"
                      : "z-10 cursor-pointer bg-[#0A1827]/90 border border-slate-800 shadow-xl opacity-45 hover:opacity-75"
                  }`}
                  initial={false}
                  animate={{
                    x: `${diff * (prefersReducedMotion ? 60 : 54)}%`,
                    scale: isCenter ? 1 : 0.86,
                    rotateY: prefersReducedMotion ? 0 : diff * -24,
                    opacity: isCenter ? 1 : 0.45,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                  }}
                  style={{
                    transformStyle: prefersReducedMotion ? undefined : "preserve-3d",
                  }}
                >
                  {/* Top Bar: Large Outline Number & Step Tag */}
                  <div>
                    <div className="flex items-start justify-between">
                      <div
                        className={`text-5xl sm:text-6xl md:text-7xl font-mono font-black select-none tracking-tight leading-none ${
                          isCenter
                            ? "text-transparent"
                            : "text-transparent"
                        }`}
                        style={{
                          WebkitTextStroke: isCenter
                            ? "2px #12A9EC"
                            : "1.5px rgba(255, 255, 255, 0.35)",
                          textShadow: isCenter
                            ? "0 0 20px rgba(18,169,236,0.4)"
                            : "none",
                        }}
                      >
                        {step.number}
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-semibold tracking-wider text-slate-300">
                        <span>STEP</span>
                        <span className="text-[#12A9EC] font-bold">0{index + 1}</span>
                      </div>
                    </div>

                    {/* Step Title in Spaced Capitals */}
                    <h3 className="label-caps text-xl sm:text-2xl font-black text-white tracking-[0.14em] mt-5">
                      {step.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Center Line Illustration in Cyan */}
                  <div className="relative w-full h-28 sm:h-32 my-auto flex items-center justify-center">
                    {step.illustration}
                  </div>

                  {/* Bottom Deliverables Chips */}
                  <div>
                    <span className="label-caps text-[10px] text-slate-400 block mb-2.5">
                      KEY DELIVERABLES
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/[0.06] text-slate-200 border border-white/10"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#12A9EC] shrink-0" />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>

                    {/* Bottom Cyan Progress Bar (Active only on center card) */}
                    <div className="w-full h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
                      {isCenter ? (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`progress-${currentIndex}-${isPlaying}`}
                            initial={{ width: "0%" }}
                            animate={{
                              width: isPlaying && !prefersReducedMotion ? "100%" : "0%",
                            }}
                            transition={{
                              duration: 5,
                              ease: "linear",
                            }}
                            className="h-full bg-gradient-to-r from-[#12A9EC] to-[#2563EB]"
                          />
                        </AnimatePresence>
                      ) : (
                        <div className="w-0 h-full bg-[#12A9EC]" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Carousel Hint Note */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-6 select-none">
          <MoveHorizontal className="w-3.5 h-3.5 text-[#12A9EC]" />
          <span>Click, drag, or use arrow keys to navigate the process</span>
        </div>
      </div>
    </section>
  );
}

export default Process;
