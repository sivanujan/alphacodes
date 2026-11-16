"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { CONTACT_DATA } from "@/data/contact";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const hasPhone = CONTACT_DATA.phone && CONTACT_DATA.phone !== "TODO";
  const hasEmail = CONTACT_DATA.email && CONTACT_DATA.email !== "TODO";

  return (
    <footer
      aria-label="Site Footer"
      className="w-full bg-[#06121E] text-white border-t border-slate-800/80 pt-16 md:pt-20 pb-12 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-slate-800/80">
          {/* Brand & Tagline Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link
              href="/"
              className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC] rounded-lg"
              aria-label="AlphaCodes Home"
            >
              <Image
                src="/alphacodes-logo-horizontal-dark.svg"
                alt="AlphaCodes"
                width={157}
                height={36}
                className="h-9 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
              />
            </Link>

            <p className="mt-4 text-base font-semibold text-slate-200 tracking-wide">
              &ldquo;Build &amp; Develop own &amp; custom products.&rdquo;
            </p>

            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Software development studio — designs, builds and runs digital products from first MVP to production scale.
            </p>

            {/* Subsidiary badge */}
            <div className="mt-6 pt-5 border-t border-slate-800/60 flex items-center gap-2 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12A9EC]" />
              <span>Sri Lankan subsidiary of </span>
              <a
                href={CONTACT_DATA.parent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#12A9EC] underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-1"
              >
                <span>{CONTACT_DATA.parent.name}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Services Column (2 cols) */}
          <div className="lg:col-span-2">
            <span className="label-caps text-[#12A9EC] text-[11px] block mb-4">
              SERVICES
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="#services"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Product Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Website Development
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Cloud Operations
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Digital Product Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column (2 cols) */}
          <div className="lg:col-span-2">
            <span className="label-caps text-[#12A9EC] text-[11px] block mb-4">
              COMPANY
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link
                  href="#projects"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#process"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Process
                </Link>
              </li>
              <li>
                <Link
                  href="#clients"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Clients
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column (3 cols) */}
          <div className="lg:col-span-3">
            <span className="label-caps text-[#12A9EC] text-[11px] block mb-4">
              CONTACT
            </span>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#12A9EC] shrink-0 mt-0.5" />
                <a
                  href={CONTACT_DATA.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {CONTACT_DATA.address}
                </a>
              </div>

              {hasPhone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#12A9EC] shrink-0" />
                  <a
                    href={`tel:${CONTACT_DATA.phone}`}
                    className="hover:text-white transition-colors"
                  >
                    {CONTACT_DATA.phone}
                  </a>
                </div>
              )}

              {hasEmail && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#12A9EC] shrink-0" />
                  <a
                    href={`mailto:${CONTACT_DATA.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {CONTACT_DATA.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>&copy; {currentYear} AlphaCodes. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">&bull;</span>
            <a
              href={CONTACT_DATA.parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              {CONTACT_DATA.parent.text}
            </a>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-800 bg-white/5 text-slate-400 hover:text-white hover:border-[#12A9EC] hover:bg-[#12A9EC]/10 transition-all text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12A9EC]"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transform-none" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
