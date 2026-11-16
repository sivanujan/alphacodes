"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Process", href: "#process" },
  { name: "Clients", href: "#clients" },
  { name: "Contact", href: "#contact" },
];

interface NavbarProps {
  isWhiteBg?: boolean;
}

export function Navbar({ isWhiteBg = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none transition-all duration-300 pt-3 md:pt-5 px-3 sm:px-6">
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto w-full max-w-5xl rounded-full border transition-all duration-300 flex items-center justify-between ${
          scrolled
            ? "bg-[#0B1B2B]/95 border-slate-700/60 shadow-2xl shadow-black/50 py-2 px-4 md:px-5 backdrop-blur-xl"
            : "bg-[#0B1B2B]/45 border-white/12 shadow-lg shadow-black/20 py-2.5 md:py-3.5 px-4 md:px-6 backdrop-blur-md"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={handleLinkClick}
          className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC] rounded-lg py-1 px-1 transition-transform active:scale-95"
          aria-label="AlphaCodes Home"
        >
          <Image
            src={
              isWhiteBg
                ? "/alphacodes-logo-horizontal.svg"
                : "/alphacodes-logo-horizontal-dark.svg"
            }
            alt="AlphaCodes"
            width={157}
            height={36}
            className="h-[30px] md:h-[36px] w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-colors duration-150 rounded-full hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC]"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="#contact"
            onClick={handleLinkClick}
            className={`group inline-flex items-center justify-center gap-1.5 rounded-full bg-[#12A9EC] font-semibold text-white shadow-sm hover:bg-[#0fa0e0] hover:shadow-[0_2px_14px_rgba(18,169,236,0.4)] transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC] focus-visible:ring-offset-2 ${
              scrolled ? "px-4 py-1.5 text-xs md:text-sm" : "px-4 md:px-5 py-2 text-xs md:text-sm"
            }`}
          >
            <span>Start a project</span>
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="pointer-events-auto md:hidden fixed inset-x-4 top-20 bg-[#0B1B2B]/95 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200 z-50"
        >
          <div className="flex flex-col gap-3">
            <span className="label-caps text-[#12A9EC] text-[10px] pb-1 border-b border-white/10">
              Menu Navigation
            </span>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="py-2.5 px-3 text-sm font-semibold tracking-wide text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#12A9EC]">&rarr;</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10">
              <Link
                href="#contact"
                onClick={handleLinkClick}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#12A9EC] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#0fa0e0] transition-colors"
              >
                <span>Start a project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
