"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/navigation/Navbar";

const HEADLINE_PARTS = [
  { text: "Build", isGradient: false },
  { text: "&", isGradient: false },
  { text: "Develop", isGradient: false },
  { text: "own", isGradient: false },
  { text: "&", isGradient: false },
  { text: "custom", isGradient: true },
  { text: "products.", isGradient: true },
];

const TICKER_ITEMS = [
  "SAAS",
  "AI APPS",
  "MOBILE",
  "WEBSITES",
  "CLOUD",
  "PRODUCT DESIGN",
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative w-full min-h-screen bg-[#0B1B2B] text-white flex flex-col justify-between overflow-hidden pt-28 md:pt-36"
    >
      {/* Floating Glass Pill Navbar */}
      <Navbar />

      {/* Background Atmosphere: Cyan Glows & Subtle Moving Grid / Code Lines */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* Soft Animated Cyan Glow Orbs */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[560px] md:w-[760px] h-[340px] sm:h-[560px] md:h-[760px] rounded-full bg-[#12A9EC]/18 blur-[120px] md:blur-[160px] animate-glow"
        />
        <div
          className="absolute top-1/3 left-1/3 w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] rounded-full bg-[#2563EB]/14 blur-[100px] md:blur-[130px]"
        />

        {/* Subtle Tech Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.14] mix-blend-screen"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 80%)",
          }}
        />

        {/* Code-Line Schematics Accent Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.08]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#12A9EC" stopOpacity="0" />
              <stop offset="50%" stopColor="#12A9EC" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="5%" y1="28%" x2="95%" y2="28%" stroke="url(#codeGrad)" strokeWidth="1" strokeDasharray="6 12" />
          <line x1="12%" y1="52%" x2="88%" y2="52%" stroke="url(#codeGrad)" strokeWidth="1" strokeDasharray="8 16" />
          <line x1="8%" y1="74%" x2="92%" y2="74%" stroke="url(#codeGrad)" strokeWidth="1" strokeDasharray="4 10" />
        </svg>

        {/* Studio Coordinate & Telemetry Labels (Subtle) */}
        <div className="hidden lg:flex absolute top-32 left-10 font-mono text-[11px] tracking-widest text-slate-500/60 uppercase flex-col gap-1">
          <span>{"// ALPHA_STUDIO_CORE"}</span>
          <span className="text-[#12A9EC]/60">SYS: ACTIVE</span>
        </div>
        <div className="hidden lg:flex absolute top-32 right-10 font-mono text-[11px] tracking-widest text-slate-500/60 uppercase flex-col items-end gap-1">
          <span>THAAYAKAM_LTD_UK</span>
          <span className="text-slate-400/50">CO_NO: 12875849</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-12 md:py-20 flex flex-col items-center text-center my-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Eyebrow Label Pill */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12A9EC] animate-pulse" />
              <span className="label-caps text-[11px] text-slate-300 tracking-widest">
                Digital Product & Software Studio
              </span>
            </div>
          </motion.div>

          {/* Staggered Animated Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl">
            <span className="inline-flex flex-wrap justify-center gap-x-3 sm:gap-x-4 gap-y-1">
              {HEADLINE_PARTS.map((part, index) => (
                <motion.span
                  key={`${part.text}-${index}`}
                  variants={itemVariants}
                  className={`inline-block ${
                    part.isGradient
                      ? "bg-gradient-to-r from-[#12A9EC] to-[#2563EB] bg-clip-text text-transparent"
                      : "text-white"
                  }`}
                >
                  {part.text}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Staggered Call-To-Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-9 md:mt-11 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Button
              variant="primary"
              size="lg"
              href="#contact"
              className="w-full sm:w-auto shadow-[0_4px_24px_rgba(18,169,236,0.45)] hover:shadow-[0_6px_32px_rgba(18,169,236,0.6)]"
            >
              Start a project
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="#projects"
              className="w-full sm:w-auto"
            >
              See our work
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Endless Cyan Ticker Strip */}
      <div
        className="relative z-20 w-full bg-[#12A9EC] text-white py-3.5 md:py-4 overflow-hidden border-t border-cyan-400/20 shadow-lg shadow-[#12A9EC]/20 select-none"
        aria-label="Capabilities Ticker"
      >
        <div className="flex animate-ticker whitespace-nowrap">
          {/* Track 1 */}
          <div className="flex items-center shrink-0">
            {Array.from({ length: 4 }).map((_, repeatIndex) => (
              <React.Fragment key={`track1-set-${repeatIndex}`}>
                {TICKER_ITEMS.map((item, itemIndex) => (
                  <span
                    key={`track1-${repeatIndex}-${itemIndex}`}
                    className="inline-flex items-center text-xs md:text-sm font-bold tracking-[0.2em] uppercase px-4 md:px-6"
                  >
                    <span>{item}</span>
                    <span className="text-white/60 ml-4 md:ml-6" aria-hidden="true">
                      &bull;
                    </span>
                  </span>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Track 2 (Duplicate for seamless loop) */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, repeatIndex) => (
              <React.Fragment key={`track2-set-${repeatIndex}`}>
                {TICKER_ITEMS.map((item, itemIndex) => (
                  <span
                    key={`track2-${repeatIndex}-${itemIndex}`}
                    className="inline-flex items-center text-xs md:text-sm font-bold tracking-[0.2em] uppercase px-4 md:px-6"
                  >
                    <span>{item}</span>
                    <span className="text-white/60 ml-4 md:ml-6">
                      &bull;
                    </span>
                  </span>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
