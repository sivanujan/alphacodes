"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { STUDIO_IMAGES } from "@/data/studio";
import { Button } from "@/components/ui/Button";

/**
 * Flag to easily switch between animated studio fallback and real video.
 * Set to true once /public/film/studio.mp4 is added to the project.
 */
const USE_REAL_VIDEO = false;
const VIDEO_SRC = "/film/studio.mp4";

export function Film() {
  const [useVideo, setUseVideo] = useState(USE_REAL_VIDEO);
  const [isMuted, setIsMuted] = useState(true);
  const [animationStep, setAnimationStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-detect whether real video file is present
  useEffect(() => {
    fetch(VIDEO_SRC, { method: "HEAD" })
      .then((res) => {
        // If file exists and is accessible
        if (res.ok) {
          setUseVideo(true);
        } else {
          setUseVideo(false);
        }
      })
      .catch(() => {
        setUseVideo(false);
      });
  }, []);

  // Toggle audio for real video player
  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Animated Fallback loop (code typing on left -> UI building on right)
  useEffect(() => {
    if (useVideo) return;

    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 5);
    }, 1800);

    return () => clearInterval(interval);
  }, [useVideo]);

  // Separate images into left and right columns
  const leftColumnImages = STUDIO_IMAGES.slice(0, 4);
  const rightColumnImages = STUDIO_IMAGES.slice(4, 8);

  return (
    <section
      id="film"
      aria-label="Inside the Studio"
      className="w-full bg-white text-[#0B1B2B] py-24 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 border-b border-slate-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <span className="label-caps text-[#12A9EC] block mb-2">
            INSIDE THE STUDIO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B1B2B] leading-[1.12]">
            Where products{" "}
            <span className="bg-gradient-to-r from-[#12A9EC] to-[#2563EB] bg-clip-text text-transparent">
              come alive.
            </span>
          </h2>
        </div>

        {/* Studio Showcase Arena: Flanking Columns + Centered 16:9 Viewfinder Player */}
        <div className="relative flex items-center justify-center gap-6 lg:gap-8 max-w-6xl mx-auto min-h-[460px] md:min-h-[560px]">
          {/* Left Scrolling Column (Upwards, Desktop Only) */}
          <div
            className="hidden lg:block relative w-48 xl:w-56 h-[500px] overflow-hidden shrink-0 select-none"
            aria-hidden="true"
          >
            {/* Top / Bottom Fading Mask Overlays */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />

            {/* Infinite Vertical Marquee Track */}
            <div className="animate-scroll-up flex flex-col gap-4">
              {[...leftColumnImages, ...leftColumnImages].map((img, i) => (
                <div
                  key={`left-col-${img.id}-${i}`}
                  className="w-full h-32 rounded-xl overflow-hidden border border-slate-200/90 shadow-sm relative shrink-0 bg-slate-900"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                    sizes="220px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Central 16:9 Viewfinder Player Container */}
          <div className="relative w-full max-w-3xl aspect-[16/9] rounded-2xl md:rounded-3xl border border-[#12A9EC]/40 bg-[#0B1B2B] shadow-[0_20px_50px_rgba(11,27,43,0.18)] overflow-hidden flex flex-col justify-between">
            {/* Camera Viewfinder Corner Brackets */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#12A9EC] pointer-events-none z-30" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#12A9EC] pointer-events-none z-30" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#12A9EC] pointer-events-none z-30" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#12A9EC] pointer-events-none z-30" />

            {/* Viewfinder Telemetry Header */}
            <div className="relative z-30 flex items-center justify-between px-6 pt-3.5 select-none text-[10px] sm:text-xs font-mono font-bold">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#12A9EC] animate-pulse" />
                <span className="text-[#12A9EC] tracking-widest">
                  ALPHA_CAM_01 // REC
                </span>
              </div>
              <div className="text-slate-400 tracking-wider">
                16:9 &bull; 4K UHD &bull; 60FPS
              </div>
            </div>

            {/* Media Content: Real Video OR Animated Studio Fallback */}
            {useVideo ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={VIDEO_SRC}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  onError={() => setUseVideo(false)}
                />

                {/* Sound Toggle Pill */}
                <button
                  type="button"
                  onClick={toggleSound}
                  className="absolute bottom-4 right-4 z-40 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1B2B]/85 text-white border border-white/20 text-xs font-semibold backdrop-blur-md hover:bg-[#12A9EC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC]"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Sound off</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Sound on</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* Animated Fallback: Code Editor + Live Preview Simulation */
              <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-5 text-white">
                <div className="w-full h-full rounded-xl bg-[#07121D]/90 border border-slate-800/90 grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-inner">
                  {/* Left Column: Code Editor (7 cols) */}
                  <div className="md:col-span-7 p-3 sm:p-4 border-b md:border-b-0 md:border-r border-slate-800/80 flex flex-col justify-between font-mono text-[10px] sm:text-xs">
                    {/* File Tab */}
                    <div className="flex items-center gap-2 pb-2.5 mb-2 border-b border-slate-800/60 text-slate-400 text-[10px]">
                      <span className="w-2 h-2 rounded-full bg-[#12A9EC]" />
                      <span className="text-white font-semibold">ProductEngine.tsx</span>
                      <span className="text-slate-600">TypeScript</span>
                    </div>

                    {/* Animated Code Typing Sequence */}
                    <div className="space-y-1.5 leading-relaxed overflow-hidden">
                      <div className="text-slate-500">
                        {"// AlphaCodes Studio — Sri Lanka & UK"}
                      </div>
                      <div className="text-[#12A9EC]">
                        import <span className="text-white">{`{ createProduct }`}</span> from <span className="text-[#38BDF8]">&quot;@alphacodes/core&quot;</span>;
                      </div>
                      <div className="text-slate-300">
                        export default async function StudioPipeline() {`{`}
                      </div>
                      <div className="pl-3 sm:pl-4 text-slate-300">
                        const app = await createProduct({`{`}
                      </div>
                      <div className="pl-6 sm:pl-7 text-[#38BDF8]">
                        name: <span className="text-white">&quot;Production Scale MVP&quot;</span>,
                      </div>
                      <div className="pl-6 sm:pl-7 text-emerald-400">
                        status: <span className="text-white">&quot;compiling_assets&quot;</span>,
                      </div>
                      <div className="pl-6 sm:pl-7 text-[#12A9EC]">
                        stack: [<span className="text-white">&quot;Next.js&quot;</span>, <span className="text-white">&quot;TypeScript&quot;</span>, <span className="text-white">&quot;AWS&quot;</span>]
                      </div>
                      <div className="pl-3 sm:pl-4 text-slate-300">
                        {`});`}
                      </div>
                      <div className="text-slate-300">
                        {`}`}
                        <span className="inline-block w-1.5 h-3 bg-[#12A9EC] ml-1 animate-pulse align-middle" />
                      </div>
                    </div>

                    {/* Build Status Bar */}
                    <div className="pt-2 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400">
                      <span className="text-[#12A9EC]">
                        {animationStep >= 3 ? "● Ready to Ship" : "● Compiling..."}
                      </span>
                      <span>UTF-8</span>
                    </div>
                  </div>

                  {/* Right Column: Live Responsive App Mockup (5 cols) */}
                  <div className="md:col-span-5 p-3 sm:p-4 bg-[#0B1B2B] flex flex-col justify-between">
                    {/* Live Preview Header */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-2 border-b border-slate-800">
                      <span className="text-white font-semibold">Live Preview</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        LIVE
                      </span>
                    </div>

                    {/* Progressively Building Component Mockup */}
                    <div className="my-auto space-y-2.5">
                      {/* Component Bar */}
                      <div className="h-6 rounded-md bg-[#11253E] border border-[#12A9EC]/30 flex items-center justify-between px-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#12A9EC]" />
                        <span className="w-16 h-2 rounded bg-slate-600" />
                      </div>

                      {/* Dynamic Metric Card */}
                      <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#12A9EC]/20 to-[#2563EB]/20 border border-[#12A9EC]/40">
                        <div className="text-[10px] font-bold text-[#12A9EC]">
                          ACTIVE USERS
                        </div>
                        <div className="text-base sm:text-lg font-black text-white mt-0.5">
                          {animationStep >= 2 ? "124,580" : "48,200"}
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                          <div
                            className="bg-[#12A9EC] h-full transition-all duration-700"
                            style={{
                              width: animationStep >= 2 ? "85%" : "40%",
                            }}
                          />
                        </div>
                      </div>

                      {/* Status Pills */}
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-[#12A9EC]/15 text-[#12A9EC]">
                          SaaS
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/15 text-emerald-400">
                          99.9%
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-blue-500/15 text-blue-400">
                          Global
                        </span>
                      </div>
                    </div>

                    {/* Bottom Status */}
                    <div className="text-[9px] font-mono text-slate-500 text-center">
                      Auto-Reloading On Change
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Viewfinder Frame Bar */}
            <div className="relative z-30 px-6 pb-3 text-right">
              <span className="font-mono text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-widest">
                ALPHACODES // DIGITAL STUDIO RECORD
              </span>
            </div>
          </div>

          {/* Right Scrolling Column (Downwards, Desktop Only) */}
          <div
            className="hidden lg:block relative w-48 xl:w-56 h-[500px] overflow-hidden shrink-0 select-none"
            aria-hidden="true"
          >
            {/* Top / Bottom Fading Mask Overlays */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />

            {/* Infinite Vertical Marquee Track (Reverse / Downwards) */}
            <div className="animate-scroll-down flex flex-col gap-4">
              {[...rightColumnImages, ...rightColumnImages].map((img, i) => (
                <div
                  key={`right-col-${img.id}-${i}`}
                  className="w-full h-32 rounded-xl overflow-hidden border border-slate-200/90 shadow-sm relative shrink-0 bg-slate-900"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                    sizes="220px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button: Start a project */}
        <div className="mt-12 md:mt-16 text-center">
          <Button
            variant="primary"
            size="lg"
            href="#contact"
            className="shadow-[0_4px_24px_rgba(18,169,236,0.35)]"
          >
            Start a project
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Film;
