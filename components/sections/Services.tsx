"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

interface ServiceItem {
  id: string;
  name: string;
  subServices: string[];
  illustration: React.ReactNode;
}

const SERVICES: ServiceItem[] = [
  {
    id: "product-engineering",
    name: "PRODUCT ENGINEERING",
    subServices: [
      "SaaS",
      "AI applications",
      "mobile apps",
      "product revamp",
    ],
    illustration: (
      <svg
        className="w-full h-full p-4 transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Background Grid */}
        <path d="M20 30H180M20 75H180M20 120H180" stroke="#0B1B2B" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M50 15V135M100 15V135M150 15V135" stroke="#0B1B2B" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="3 3" />

        {/* Neural / Logic Core */}
        <rect x="75" y="45" width="50" height="50" rx="10" fill="#0B1B2B" className="transition-all duration-300 group-hover:fill-[#0c2236]" />
        <rect x="83" y="53" width="34" height="34" rx="6" stroke="#12A9EC" strokeWidth="1.5" strokeDasharray="2 2" />
        <circle cx="100" cy="70" r="7" fill="#12A9EC" className="transition-transform duration-300 group-hover:scale-110" />

        {/* Circuit Bus & Node Paths */}
        <path d="M35 70H75" stroke="#12A9EC" strokeWidth="2" strokeLinecap="round" />
        <circle cx="35" cy="70" r="4" fill="#0B1B2B" stroke="#12A9EC" strokeWidth="2" />

        <path d="M125 70H165" stroke="#12A9EC" strokeWidth="2" strokeLinecap="round" />
        <circle cx="165" cy="70" r="4" fill="#0B1B2B" stroke="#12A9EC" strokeWidth="2" />

        <path d="M100 25V45" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        <circle cx="100" cy="25" r="3.5" fill="#2563EB" />

        <path d="M100 95V115" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        <circle cx="100" cy="115" r="3.5" fill="#2563EB" />

        {/* Code / Logic Indicator Tags */}
        <rect x="42" y="32" width="28" height="12" rx="3" fill="#12A9EC" fillOpacity="0.12" />
        <text x="46" y="41" fill="#12A9EC" fontSize="7" fontFamily="monospace" fontWeight="bold">API</text>

        <rect x="130" y="96" width="32" height="12" rx="3" fill="#2563EB" fillOpacity="0.12" />
        <text x="135" y="105" fill="#2563EB" fontSize="7" fontFamily="monospace" fontWeight="bold">AI_ML</text>
      </svg>
    ),
  },
  {
    id: "website-development",
    name: "WEBSITE DEVELOPMENT",
    subServices: [
      "Corporate",
      "portfolio",
      "Shopify",
      "startup landing pages",
      "medical professional sites",
    ],
    illustration: (
      <svg
        className="w-full h-full p-4 transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer Browser Canvas */}
        <rect x="25" y="20" width="150" height="105" rx="10" fill="#FFFFFF" stroke="#0B1B2B" strokeWidth="1.5" />
        <path d="M25 40H175" stroke="#0B1B2B" strokeWidth="1.5" />
        <circle cx="37" cy="30" r="2.5" fill="#12A9EC" />
        <circle cx="47" cy="30" r="2.5" fill="#CBD5E1" />
        <circle cx="57" cy="30" r="2.5" fill="#CBD5E1" />
        <rect x="75" y="26" width="60" height="8" rx="4" fill="#0B1B2B" fillOpacity="0.06" />

        {/* Hero Wireframe Blocks */}
        <rect x="37" y="52" width="64" height="8" rx="3" fill="#0B1B2B" />
        <rect x="37" y="65" width="48" height="5" rx="2" fill="#94A3B8" />
        <rect x="37" y="75" width="32" height="10" rx="5" fill="#12A9EC" />

        {/* Responsive Media Mockup */}
        <rect x="114" y="52" width="48" height="42" rx="6" fill="#F8FAFC" stroke="#12A9EC" strokeWidth="1.2" />
        <circle cx="138" cy="68" r="8" fill="#12A9EC" fillOpacity="0.18" />
        <path d="M118 88L130 76L142 85L158 72" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />

        {/* Layout Cards */}
        <rect x="37" y="98" width="38" height="16" rx="4" fill="#0B1B2B" fillOpacity="0.05" />
        <rect x="81" y="98" width="38" height="16" rx="4" fill="#0B1B2B" fillOpacity="0.05" />
        <rect x="125" y="98" width="37" height="16" rx="4" fill="#12A9EC" fillOpacity="0.1" />
      </svg>
    ),
  },
  {
    id: "cloud-operations",
    name: "CLOUD OPERATIONS",
    subServices: [
      "Migration",
      "infrastructure",
      "cost optimisation",
    ],
    illustration: (
      <svg
        className="w-full h-full p-4 transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Cloud Body Vector */}
        <path
          d="M60 76C54.4772 76 50 80.4772 50 86C50 91.5228 54.4772 96 60 96H140C146.627 96 152 90.6274 152 84C152 77.7289 147.165 72.5852 141.025 72.0515C139.73 60.7027 130.134 52 118.5 52C110.155 52 102.898 56.5056 99.0118 63.2201C96.2577 60.6067 92.5649 59 88.5 59C80.2078 59 73.3986 65.2536 72.5835 73.3275C68.9669 74.0205 65.8117 76 60 76Z"
          fill="#FFFFFF"
          stroke="#0B1B2B"
          strokeWidth="1.5"
          className="transition-colors duration-300 group-hover:stroke-[#12A9EC]"
        />

        {/* Infrastructure Base Nodes */}
        <rect x="42" y="108" width="116" height="16" rx="4" fill="#0B1B2B" />
        <circle cx="54" cy="116" r="2.5" fill="#12A9EC" />
        <circle cx="64" cy="116" r="2.5" fill="#2563EB" />
        <line x1="80" y1="116" x2="146" y2="116" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round" />

        {/* Telemetry & Synchronization Arrows */}
        <path d="M100 88V108" stroke="#12A9EC" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
        <circle cx="100" cy="80" r="5" fill="#12A9EC" />
        <circle cx="100" cy="80" r="9" stroke="#12A9EC" strokeOpacity="0.4" strokeWidth="1.2" />

        {/* Uplink Rays */}
        <line x1="88" y1="36" x2="88" y2="44" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="118" y1="32" x2="118" y2="42" stroke="#12A9EC" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="138" y1="40" x2="134" y2="48" stroke="#0B1B2B" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "digital-product-design",
    name: "DIGITAL PRODUCT DESIGN",
    subServices: [
      "MVP design",
      "product redesign",
    ],
    illustration: (
      <svg
        className="w-full h-full p-4 transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
        viewBox="0 0 200 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Artboard Frame & Canvas Geometry */}
        <rect x="30" y="24" width="140" height="98" rx="8" fill="#F8FAFC" stroke="#0B1B2B" strokeWidth="1.5" />
        <path d="M30 44H170" stroke="#0B1B2B" strokeOpacity="0.08" strokeWidth="1" />
        <path d="M68 24V122" stroke="#0B1B2B" strokeOpacity="0.08" strokeWidth="1" />

        {/* Smooth Vector Bezier Curve */}
        <path
          d="M48 94C68 40 120 115 152 50"
          stroke="#12A9EC"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Anchor Points & Tangent Handles */}
        <line x1="48" y1="94" x2="68" y2="40" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="152" y1="50" x2="130" y2="92" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2" />

        <rect x="44" y="90" width="8" height="8" rx="1.5" fill="#0B1B2B" stroke="#12A9EC" strokeWidth="1.5" />
        <rect x="148" y="46" width="8" height="8" rx="1.5" fill="#0B1B2B" stroke="#12A9EC" strokeWidth="1.5" />
        <circle cx="68" cy="40" r="3" fill="#2563EB" />
        <circle cx="130" cy="92" r="3" fill="#2563EB" />

        {/* Designer Cursor Tool */}
        <path
          d="M96 68L108 92L103 94L99 86L93 92V68Z"
          fill="#0B1B2B"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
        />
      </svg>
    ),
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export function Services() {
  return (
    <section
      id="services"
      aria-label="Our Services"
      className="w-full bg-white text-[#0B1B2B] py-24 sm:py-28 md:py-36 px-6 sm:px-8 lg:px-12 border-b border-slate-100 relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div className="max-w-2xl">
            <span className="label-caps text-[#12A9EC] block mb-2">
              WHAT WE DO
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B1B2B] leading-[1.12]">
              Four disciplines.{" "}
              <span className="bg-gradient-to-r from-[#12A9EC] to-[#2563EB] bg-clip-text text-transparent">
                One studio.
              </span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-slate-500 font-medium tracking-wide md:text-right max-w-xs leading-relaxed">
            From first sketch to production scale.
          </p>
        </div>

        {/* Services Grid (4 in a row on lg, 2x2 on md, stacked on mobile) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7"
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group flex flex-col focus-within:ring-2 focus-within:ring-[#12A9EC] rounded-2xl"
            >
              {/* Device Window Frame */}
              <div
                className="w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-slate-50/70 p-3 flex flex-col shadow-sm transition-all duration-300 ease-out group-hover:-translate-y-2 group-hover:border-[#12A9EC]/40 group-hover:bg-white group-hover:shadow-[0_16px_36px_rgba(18,169,236,0.14)] motion-reduce:transform-none motion-reduce:transition-none"
              >
                {/* Window Top Bar: Three Dots */}
                <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-slate-200/60 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 transition-colors duration-300 group-hover:bg-[#12A9EC]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-200 transition-colors duration-300 group-hover:bg-[#12A9EC]/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  </div>
                  <span className="font-mono text-[9px] font-semibold text-slate-400 tracking-wider uppercase">
                    0{index + 1}
                  </span>
                </div>

                {/* Device Window Screen / Canvas */}
                <div className="relative w-full h-52 sm:h-56 md:h-60 rounded-xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                  {/* Subtle inner grid watermark */}
                  <div
                    className="absolute inset-0 opacity-[0.4] pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(15, 23, 42, 0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(15, 23, 42, 0.03) 1px, transparent 1px)
                      `,
                      backgroundSize: "20px 20px",
                    }}
                  />
                  {service.illustration}
                </div>
              </div>

              {/* Service Information Below the Frame */}
              <div className="pt-5 px-1 flex flex-col flex-grow">
                <h3 className="label-caps text-sm md:text-base font-bold text-[#0B1B2B] tracking-[0.14em] transition-colors duration-200 group-hover:text-[#12A9EC]">
                  {service.name}
                </h3>
                <p className="mt-2.5 text-xs md:text-sm text-slate-500 font-normal leading-relaxed">
                  {service.subServices.join(", ")}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
