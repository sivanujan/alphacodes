import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0B1B2B] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
      {/* Background Soft Cyan Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#12A9EC]/15 blur-[140px]" />
        
        {/* Tech Grid */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center flex flex-col items-center">
        {/* Brand Logo */}
        <Link
          href="/"
          className="inline-flex items-center mb-8 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC] rounded-lg"
          aria-label="AlphaCodes Home"
        >
          <Image
            src="/alphacodes-logo-horizontal-dark.svg"
            alt="AlphaCodes"
            width={157}
            height={36}
            className="h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
            priority
          />
        </Link>

        {/* 404 Large Code */}
        <div
          className="text-8xl sm:text-9xl font-mono font-black tracking-tighter text-transparent select-none leading-none"
          style={{
            WebkitTextStroke: "2px #12A9EC",
            textShadow: "0 0 35px rgba(18, 169, 236, 0.4)",
          }}
        >
          404
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-6">
          Page not{" "}
          <span className="bg-gradient-to-r from-[#12A9EC] to-[#2563EB] bg-clip-text text-transparent">
            found.
          </span>
        </h1>

        <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-md leading-relaxed font-normal">
          The product route or document you requested cannot be located in the studio registry. It may have moved or been updated.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide bg-[#12A9EC] text-white hover:bg-[#0fa0e0] shadow-[0_2px_14px_rgba(18,169,236,0.4)] transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC] w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Return to homepage</span>
          </Link>

          <Link
            href="/#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide bg-white text-[#0B1B2B] hover:bg-slate-100 shadow-sm border border-white/20 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white w-full sm:w-auto"
          >
            <span>Start a project</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  );
}
