"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Layers,
  MoveHorizontal,
  ExternalLink,
} from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { Button } from "@/components/ui/Button";

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeProject = PROJECTS[currentIndex];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : PROJECTS.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < PROJECTS.length - 1 ? prev + 1 : 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in form inputs
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
      id="projects"
      aria-label="Selected Projects"
      className="w-full bg-white text-[#0B1B2B] py-24 sm:py-28 md:py-36 px-6 sm:px-8 lg:px-12 border-b border-slate-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <span className="label-caps text-[#12A9EC] block mb-2">
              SELECTED WORK
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B1B2B] leading-[1.12]">
              Built{" "}
              <span className="bg-gradient-to-r from-[#12A9EC] to-[#2563EB] bg-clip-text text-transparent">
                to ship.
              </span>
            </h2>
          </div>

          {/* Carousel Counter & Navigation Controls */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-slate-400 block tracking-wider">
                {currentIndex + 1} OF {PROJECTS.length}
              </span>
              <span className="text-xs font-semibold text-[#0B1B2B] truncate max-w-[160px] block">
                {activeProject.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-slate-200 bg-white text-[#0B1B2B] flex items-center justify-center hover:bg-slate-50 hover:border-[#12A9EC] hover:text-[#12A9EC] transition-all duration-200 shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC]"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-11 h-11 rounded-full border border-slate-200 bg-white text-[#0B1B2B] flex items-center justify-center hover:bg-slate-50 hover:border-[#12A9EC] hover:text-[#12A9EC] transition-all duration-200 shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC]"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Device Mockup Carousel on Left/Center + About Panel on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left/Center: Tall Device Carousel Stage */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Carousel Container */}
            <div
              className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
              tabIndex={0}
              role="region"
              aria-label="Project carousel — use arrow keys or drag to navigate"
            >
              {/* Cards Stage */}
              <motion.div
                className="relative w-full h-full flex items-center justify-center"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) {
                    handleNext();
                  } else if (info.offset.x > 50) {
                    handlePrev();
                  }
                }}
              >
                {PROJECTS.map((project, index) => {
                  const offset = index - currentIndex;
                  const isCenter = offset === 0;

                  // Visible window around center (-1, 0, 1, or looped)
                  let displayOffset = offset;
                  if (offset < -2) displayOffset += PROJECTS.length;
                  if (offset > 2) displayOffset -= PROJECTS.length;

                  const isVisible = Math.abs(displayOffset) <= 1;

                  if (!isVisible) return null;

                  return (
                    <motion.div
                      key={project.id}
                      onClick={() => setCurrentIndex(index)}
                      className={`absolute w-[86%] sm:w-[78%] md:w-[72%] max-w-[500px] transition-shadow duration-300 ${
                        isCenter
                          ? "z-30 cursor-default"
                          : "z-10 cursor-pointer"
                      }`}
                      initial={false}
                      animate={{
                        x: `${displayOffset * 65}%`,
                        scale: isCenter ? 1 : 0.86,
                        opacity: isCenter ? 1 : 0.45,
                        filter: isCenter ? "blur(0px)" : "blur(2px)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 28,
                      }}
                    >
                      {/* Tall Device Mockup Frame */}
                      <div
                        className={`w-full rounded-2xl sm:rounded-3xl border bg-slate-900 shadow-xl transition-all duration-300 overflow-hidden ${
                          isCenter
                            ? "border-slate-800 shadow-[0_20px_50px_rgba(11,27,43,0.22)] ring-1 ring-[#12A9EC]/30"
                            : "border-slate-800/80 shadow-md opacity-90"
                        }`}
                      >
                        {/* Device Window Top Bar */}
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0B1B2B] border-b border-white/10">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                          </div>
                          <span className="font-mono text-[10px] text-slate-400 truncate max-w-[200px]">
                            {project.name.toLowerCase().replace(/\s+/g, "-")}.alphacodes.online
                          </span>
                          <span className="w-2.5 h-2.5" />
                        </div>

                        {/* Project Image Mockup Display */}
                        <div className="relative aspect-[4/3] w-full bg-[#081522] overflow-hidden">
                          <Image
                            src={project.image}
                            alt={`${project.name} mockup`}
                            fill
                            className="object-cover transition-transform duration-500"
                            priority={isCenter}
                            sizes="(max-width: 768px) 100vw, 500px"
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Drag / Scroll Hint */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 select-none">
              <MoveHorizontal className="w-3.5 h-3.5 text-[#12A9EC]" />
              <span className="font-medium">Scroll or drag carousel</span>
            </div>
          </div>

          {/* Right: "About this project" Panel */}
          <div className="lg:col-span-5">
            <div className="w-full rounded-3xl bg-slate-50/80 border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
              {/* Subtle Corner Accent */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#12A9EC]/10 blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Cross-fading Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="flex flex-col"
                >
                  {/* Top Meta Line: Category Chip & Counter */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#12A9EC]/12 text-[#12A9EC] border border-[#12A9EC]/25">
                      {activeProject.category}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      PROJECT 0{currentIndex + 1}
                    </span>
                  </div>

                  {/* Project Name & Visit Site */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1B2B]">
                      {activeProject.name}
                    </h3>
                    {activeProject.url && activeProject.url !== "TODO" && (
                      <a
                        href={activeProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#12A9EC] hover:text-[#0fa0e0] underline underline-offset-4 transition-colors shrink-0"
                      >
                        <span>Visit site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Client Country & Year Metadata (Hide if TODO) */}
                  {(Boolean(activeProject.clientCountry && activeProject.clientCountry !== "TODO") ||
                    Boolean(activeProject.year && activeProject.year !== "TODO")) && (
                    <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs text-slate-500 font-medium">
                      {activeProject.clientCountry && activeProject.clientCountry !== "TODO" && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#12A9EC]" />
                          <span>{activeProject.clientCountry}</span>
                        </span>
                      )}
                      {activeProject.clientCountry &&
                        activeProject.clientCountry !== "TODO" &&
                        activeProject.year &&
                        activeProject.year !== "TODO" && (
                          <span className="text-slate-300">&bull;</span>
                        )}
                      {activeProject.year && activeProject.year !== "TODO" && (
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{activeProject.year}</span>
                        </span>
                      )}
                    </div>
                  )}

                  {/* Short One-line Description (Hide if TODO) */}
                  {activeProject.description && activeProject.description !== "TODO" && (
                    <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                      {activeProject.description}
                    </p>
                  )}

                  {/* Key Features Bullet List (when present) */}
                  {activeProject.features &&
                    activeProject.features.length > 0 &&
                    activeProject.features[0] !== "TODO" && (
                      <div className="mt-5 pt-4 border-t border-slate-200/80">
                        <span className="label-caps text-slate-400 text-[10px] block mb-2">
                          KEY CAPABILITIES &amp; FEATURES
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-600">
                          {activeProject.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#12A9EC] font-bold">&bull;</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* Tech Stack Heading (Hide if TODO/empty) */}
                  {activeProject.techStack &&
                    activeProject.techStack.length > 0 &&
                    activeProject.techStack[0] !== "TODO" && (
                      <div className="mt-5 pt-4 border-t border-slate-200/80">
                        <span className="label-caps text-slate-400 text-[10px] block mb-2.5">
                          TECH STACK
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#0B1B2B] border border-slate-200/90 shadow-2xs hover:border-[#12A9EC]/50 transition-colors"
                            >
                              <Layers className="w-3 h-3 text-[#12A9EC]" />
                              <span>{tech}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </motion.div>
              </AnimatePresence>

              {/* Action Button: Discuss a similar project */}
              <div className="mt-8 pt-6 border-t border-slate-200/80">
                <Button
                  variant="primary"
                  size="md"
                  href="#contact"
                  className="w-full sm:w-auto"
                >
                  Discuss a similar project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
