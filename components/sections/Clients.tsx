"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  MoveHorizontal,
} from "lucide-react";
import {
  CLIENT_STATS,
  CLIENT_LOGOS,
  CLIENT_TESTIMONIALS,
  type ClientStat,
} from "@/data/clients";

// Country Flag Emoji lookup
const COUNTRY_FLAGS: Record<string, string> = {
  GB: "🇬🇧",
  LK: "🇱🇰",
  DE: "🇩🇪",
  AU: "🇦🇺",
  US: "🇺🇸",
};

/**
 * Animated number counter that triggers when scrolled into view.
 */
function CountUpStat({
  stat,
  prefersReducedMotion,
}: {
  stat: ClientStat;
  prefersReducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(stat.numericTarget);
      return;
    }

    if (!isInView) return;

    const start = 0;
    const end = stat.numericTarget;
    const duration = 1600; // ms
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(eased * (end - start) + start);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, stat.numericTarget, prefersReducedMotion]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-4 md:px-8">
      <div className="text-4xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-[#0B1B2B]">
        {prefersReducedMotion ? stat.numericTarget : count}
        <span className="text-[#12A9EC]">{stat.suffix}</span>
      </div>
      <span className="mt-2 text-xs sm:text-sm font-bold tracking-wider text-slate-500 uppercase">
        {stat.label}
      </span>
    </div>
  );
}

export function Clients() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const totalTestimonials = CLIENT_TESTIMONIALS.length;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalTestimonials - 1));
  }, [totalTestimonials]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < totalTestimonials - 1 ? prev + 1 : 0));
  }, [totalTestimonials]);

  // Motion preference detection
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Keyboard navigation
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
      id="clients"
      aria-label="Clients and Testimonials"
      className="w-full bg-white text-[#0B1B2B] py-24 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 border-b border-slate-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="label-caps text-[#12A9EC] block mb-2">
            TRUSTED WORK
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B1B2B] leading-[1.12]">
            Partners{" "}
            <span className="bg-gradient-to-r from-[#12A9EC] to-[#2563EB] bg-clip-text text-transparent">
              across borders.
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 font-medium tracking-wide">
            For startups, clinics, schools and global brands.
          </p>
        </div>

        {/* 1. Stats Row with Thin Cyan Dividers */}
        <div className="max-w-4xl mx-auto mb-20 md:mb-24 py-8 px-4 rounded-3xl bg-slate-50/70 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#12A9EC]/30">
          {CLIENT_STATS.map((stat) => (
            <CountUpStat
              key={stat.id}
              stat={stat}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* 2. Infinite Marquee Logo Strip with Faded Edges */}
        <div className="relative w-full max-w-6xl mx-auto mb-24 md:mb-32 overflow-hidden py-4 select-none">
          {/* Fading Edge Overlays */}
          <div className="absolute inset-y-0 left-0 w-20 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling Wordmark Track */}
          <div className="flex animate-ticker whitespace-nowrap">
            {/* Set 1 */}
            <div className="flex items-center gap-10 md:gap-16 shrink-0 pr-10 md:pr-16">
              {CLIENT_LOGOS.map((logo) => (
                <div
                  key={`track1-${logo.id}`}
                  className="group flex flex-col items-center justify-center cursor-default transition-all duration-300"
                >
                  {logo.image ? (
                    <div className="relative w-28 h-10 grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100">
                      <Image
                        src={logo.image}
                        alt={logo.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="text-lg sm:text-xl font-black tracking-tight text-slate-400 group-hover:text-[#0B1B2B] transition-colors duration-200">
                        {logo.name}
                      </span>
                      <span className="text-[9px] font-mono tracking-widest text-slate-300 group-hover:text-[#12A9EC] transition-colors duration-200">
                        {logo.tagline}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Set 2 (Duplicate for seamless loop) */}
            <div className="flex items-center gap-10 md:gap-16 shrink-0 pr-10 md:pr-16" aria-hidden="true">
              {CLIENT_LOGOS.map((logo) => (
                <div
                  key={`track2-${logo.id}`}
                  className="group flex flex-col items-center justify-center cursor-default transition-all duration-300"
                >
                  {logo.image ? (
                    <div className="relative w-28 h-10 grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100">
                      <Image
                        src={logo.image}
                        alt={logo.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="text-lg sm:text-xl font-black tracking-tight text-slate-400 group-hover:text-[#0B1B2B] transition-colors duration-200">
                        {logo.name}
                      </span>
                      <span className="text-[9px] font-mono tracking-widest text-slate-300 group-hover:text-[#12A9EC] transition-colors duration-200">
                        {logo.tagline}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Testimonials: Curved Carousel with Soft Arch Rounded Top Cards */}
        <div className="max-w-5xl mx-auto">
          {/* Header Controls for Testimonials */}
          <div className="flex items-center justify-between mb-8 sm:mb-12 px-4">
            <div>
              <span className="label-caps text-[#12A9EC] text-xs">
                WHAT CLIENTS SAY
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1B2B] tracking-tight mt-1">
                Client Testimonials
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-slate-400 mr-2 tracking-wider">
                0{currentIndex + 1} / 0{totalTestimonials}
              </span>

              <button
                type="button"
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-slate-200 bg-white text-[#0B1B2B] flex items-center justify-center hover:bg-[#12A9EC] hover:border-[#12A9EC] hover:text-white transition-all duration-200 shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC]"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="w-11 h-11 rounded-full border border-slate-200 bg-white text-[#0B1B2B] flex items-center justify-center hover:bg-[#12A9EC] hover:border-[#12A9EC] hover:text-white transition-all duration-200 shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC]"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Testimonials Carousel Stage */}
          <div
            className="relative w-full h-[420px] sm:h-[450px] md:h-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            tabIndex={0}
            role="region"
            aria-label="Testimonials carousel — drag, swipe or use arrow keys"
          >
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -40) {
                  handleNext();
                } else if (info.offset.x > 40) {
                  handlePrev();
                }
              }}
            >
              {CLIENT_TESTIMONIALS.map((item, index) => {
                let diff = index - currentIndex;
                if (diff < -2) diff += totalTestimonials;
                if (diff > 2) diff -= totalTestimonials;

                const isCenter = diff === 0;
                const isVisible = Math.abs(diff) <= 1;

                if (!isVisible) return null;

                return (
                  <motion.div
                    key={item.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`absolute w-[88%] sm:w-[78%] md:w-[65%] max-w-[500px] h-[370px] sm:h-[390px] md:h-[400px] rounded-t-[44px] md:rounded-t-[54px] rounded-b-3xl p-6 sm:p-8 md:p-10 flex flex-col justify-between transition-all duration-300 ${
                      isCenter
                        ? "z-30 cursor-default bg-white border border-[#12A9EC] shadow-[0_20px_50px_rgba(18,169,236,0.14)] ring-1 ring-[#12A9EC]/30"
                        : "z-10 cursor-pointer bg-slate-50/80 border border-slate-200/80 shadow-md opacity-45 hover:opacity-75"
                    }`}
                    initial={false}
                    animate={{
                      x: `${diff * (prefersReducedMotion ? 55 : 50)}%`,
                      scale: isCenter ? 1 : 0.88,
                      rotate: prefersReducedMotion ? 0 : diff * 4,
                      opacity: isCenter ? 1 : 0.45,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 26,
                    }}
                  >
                    {/* Top: Large Cyan Quote Mark */}
                    <div className="flex items-center justify-between">
                      <Quote
                        className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors ${
                          isCenter ? "text-[#12A9EC]" : "text-slate-300"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-xs font-bold text-slate-400">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Quote Text */}
                    <blockquote className="my-auto text-sm sm:text-base md:text-lg font-medium text-slate-700 leading-relaxed italic">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>

                    {/* Card Footer: Person Details & Country Flag Chip */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-[#0B1B2B] text-sm sm:text-base tracking-tight">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-500 font-normal">
                          {item.role} &bull; {item.company}
                        </div>
                      </div>

                      {/* Country Flag Chip */}
                      <div className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-semibold text-[#0B1B2B]">
                        <span>{COUNTRY_FLAGS[item.countryCode] || "🌐"}</span>
                        <span>{item.country}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Interactive Carousel Hint */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-4 select-none">
            <MoveHorizontal className="w-3.5 h-3.5 text-[#12A9EC]" />
            <span>Click cards, swipe, or use keyboard arrows</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Clients;
