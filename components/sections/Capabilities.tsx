"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { Plus } from "lucide-react";

interface CapabilityCardData {
  id: string;
  index: string;
  title: string;
  description: string;
  bgHex: string;
  illustration: React.ReactNode;
  arcRotate: number;
  arcY: number;
}

const CAPABILITIES: CapabilityCardData[] = [
  {
    id: "saas-platforms",
    index: "01",
    title: "SAAS PLATFORMS",
    description: "Multi-tenant SaaS products engineered from MVP to production scale.",
    bgHex: "#12A9EC", // Cyan
    arcRotate: -7.5,
    arcY: 18,
    illustration: (
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Layered isometric SaaS panes */}
        <g filter="drop-shadow(0 12px 16px rgba(0,0,0,0.25))">
          {/* Base Pane */}
          <polygon points="80,20 140,55 80,90 20,55" fill="#FFFFFF" fillOpacity="0.25" stroke="#FFFFFF" strokeWidth="2" />
          <polygon points="20,55 80,90 80,105 20,70" fill="#FFFFFF" fillOpacity="0.15" stroke="#FFFFFF" strokeWidth="1.5" />
          <polygon points="80,90 140,55 140,70 80,105" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeWidth="1.5" />
          
          {/* Middle Floating Pane */}
          <polygon points="80,45 130,74 80,103 30,74" fill="#FFFFFF" fillOpacity="0.4" stroke="#FFFFFF" strokeWidth="2" />
          
          {/* Top Active Core Pane */}
          <polygon points="80,70 120,93 80,116 40,93" fill="#FFFFFF" stroke="#0B1B2B" strokeWidth="2" />
          <polygon points="40,93 80,116 80,128 40,105" fill="#0B1B2B" stroke="#0B1B2B" strokeWidth="1.5" />
          <polygon points="80,116 120,93 120,105 80,128" fill="#11253E" stroke="#0B1B2B" strokeWidth="1.5" />
          
          {/* Microchip nodes */}
          <circle cx="80" cy="93" r="5" fill="#12A9EC" />
          <line x1="80" y1="35" x2="80" y2="70" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
        </g>
      </svg>
    ),
  },
  {
    id: "ai-applications",
    index: "02",
    title: "AI APPLICATIONS",
    description: "Intelligent AI workflows, reasoning pipelines and neural tooling.",
    bgHex: "#2563EB", // Blue
    arcRotate: -4.5,
    arcY: 6,
    illustration: (
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Floating 3D Octahedron / Neural Matrix */}
        <g filter="drop-shadow(0 14px 18px rgba(0,0,0,0.3))">
          {/* Wireframe Facets */}
          <polygon points="80,15 135,75 80,105" fill="#FFFFFF" fillOpacity="0.35" stroke="#FFFFFF" strokeWidth="2" />
          <polygon points="80,15 25,75 80,105" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeWidth="2" />
          <polygon points="80,145 135,75 80,105" fill="#FFFFFF" fillOpacity="0.15" stroke="#FFFFFF" strokeWidth="2" />
          <polygon points="80,145 25,75 80,105" fill="#FFFFFF" fillOpacity="0.28" stroke="#FFFFFF" strokeWidth="2" />

          {/* Central Synapse Hub */}
          <circle cx="80" cy="75" r="9" fill="#FFFFFF" />
          <circle cx="80" cy="75" r="16" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="80" y1="15" x2="80" y2="145" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="25" y1="75" x2="135" y2="75" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="4 4" />
        </g>
      </svg>
    ),
  },
  {
    id: "mobile-apps",
    index: "03",
    title: "MOBILE APPS",
    description: "High-performance iOS and Android native & hybrid mobile applications.",
    bgHex: "#0B1B2B", // Navy
    arcRotate: -1.5,
    arcY: 0,
    illustration: (
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Floating 3D Dual Isometric Phone Screens */}
        <g filter="drop-shadow(0 16px 20px rgba(0,0,0,0.45))">
          {/* Background Shadow Phone */}
          <rect x="55" y="25" width="70" height="115" rx="14" fill="#142C46" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1.5" transform="rotate(8 90 82)" />

          {/* Foreground Hero Phone */}
          <rect x="35" y="20" width="72" height="120" rx="14" fill="#FFFFFF" stroke="#12A9EC" strokeWidth="2" />
          <rect x="56" y="25" width="30" height="6" rx="3" fill="#0B1B2B" />
          
          {/* Internal App UI Elements */}
          <rect x="43" y="38" width="56" height="30" rx="6" fill="#12A9EC" />
          <rect x="43" y="74" width="36" height="6" rx="3" fill="#0B1B2B" />
          <rect x="43" y="85" width="48" height="5" rx="2.5" fill="#94A3B8" />
          <rect x="43" y="95" width="42" height="5" rx="2.5" fill="#94A3B8" />
          <circle cx="71" cy="122" r="5" fill="#0B1B2B" />
        </g>
      </svg>
    ),
  },
  {
    id: "shopify-stores",
    index: "04",
    title: "SHOPIFY STORES",
    description: "Bespoke Shopify e-commerce and high-converting storefronts.",
    bgHex: "#0E9F9A", // Teal
    arcRotate: 1.5,
    arcY: 0,
    illustration: (
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Floating 3D E-Commerce Pedestal & Bag Cube */}
        <g filter="drop-shadow(0 14px 18px rgba(0,0,0,0.28))">
          {/* Hexagonal Store Pedestal */}
          <polygon points="80,85 130,110 80,135 30,110" fill="#FFFFFF" fillOpacity="0.25" stroke="#FFFFFF" strokeWidth="2" />
          <polygon points="30,110 80,135 80,145 30,120" fill="#FFFFFF" fillOpacity="0.15" stroke="#FFFFFF" strokeWidth="1.5" />
          <polygon points="80,135 130,110 130,120 80,145" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeWidth="1.5" />

          {/* Floating Showcase Cube */}
          <polygon points="80,30 115,50 80,70 45,50" fill="#FFFFFF" stroke="#0B1B2B" strokeWidth="2" />
          <polygon points="45,50 80,70 80,100 45,80" fill="#0B1B2B" stroke="#0B1B2B" strokeWidth="1.5" />
          <polygon points="80,70 115,50 115,80 80,100" fill="#11253E" stroke="#0B1B2B" strokeWidth="1.5" />

          {/* Shopify Bag Handle */}
          <path d="M70 30C70 20 90 20 90 30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="80" cy="50" r="4" fill="#0E9F9A" />
        </g>
      </svg>
    ),
  },
  {
    id: "cloud-infrastructure",
    index: "05",
    title: "CLOUD INFRASTRUCTURE",
    description: "Cloud migration, resilient infrastructure and cost optimisation.",
    bgHex: "#4F46E5", // Indigo
    arcRotate: 4.5,
    arcY: 6,
    illustration: (
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Floating 3D Multi-Tier Server Tower */}
        <g filter="drop-shadow(0 14px 18px rgba(0,0,0,0.3))">
          {/* Tier 1 Base */}
          <polygon points="80,95 130,118 80,140 30,118" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeWidth="2" />
          
          {/* Tier 2 Middle */}
          <polygon points="80,65 125,87 80,108 35,87" fill="#FFFFFF" fillOpacity="0.35" stroke="#FFFFFF" strokeWidth="2" />
          
          {/* Tier 3 Top Server */}
          <polygon points="80,30 120,50 80,70 40,50" fill="#FFFFFF" stroke="#0B1B2B" strokeWidth="2" />
          <polygon points="40,50 80,70 80,82 40,62" fill="#0B1B2B" stroke="#0B1B2B" strokeWidth="1.5" />
          <polygon points="80,70 120,50 120,62 80,82" fill="#11253E" stroke="#0B1B2B" strokeWidth="1.5" />

          {/* Telemetry Dots */}
          <circle cx="65" cy="58" r="2.5" fill="#38BDF8" />
          <circle cx="75" cy="62" r="2.5" fill="#10B981" />
          <circle cx="85" cy="66" r="2.5" fill="#38BDF8" />

          {/* Uplink Ray */}
          <line x1="80" y1="18" x2="80" y2="30" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
    ),
  },
  {
    id: "product-design",
    index: "06",
    title: "PRODUCT DESIGN",
    description: "Digital product design, rapid MVP prototyping and design revamp.",
    bgHex: "#38BDF8", // Sky
    arcRotate: 7.5,
    arcY: 18,
    illustration: (
      <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Floating 3D Geometric Isometric Artboard */}
        <g filter="drop-shadow(0 14px 18px rgba(0,0,0,0.25))">
          {/* Canvas Diamond */}
          <polygon points="80,25 135,55 80,85 25,55" fill="#FFFFFF" stroke="#0B1B2B" strokeWidth="2" />
          <polygon points="25,55 80,85 80,95 25,65" fill="#0B1B2B" stroke="#0B1B2B" strokeWidth="1.5" />
          <polygon points="80,85 135,55 135,65 80,95" fill="#11253E" stroke="#0B1B2B" strokeWidth="1.5" />

          {/* Floating UI Elements on Canvas */}
          <circle cx="60" cy="55" r="10" fill="#12A9EC" />
          <polygon points="100,45 115,55 100,65" fill="#0B1B2B" />

          {/* Precision Pen Tool Point */}
          <path d="M75 115L90 140L80 143L73 133L65 140V115Z" fill="#FFFFFF" stroke="#0B1B2B" strokeWidth="1.5" />
          <line x1="80" y1="85" x2="80" y2="120" stroke="#0B1B2B" strokeWidth="2" strokeDasharray="3 3" />
        </g>
      </svg>
    ),
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

interface TiltCardProps {
  card: CapabilityCardData;
  isDesktop: boolean;
  prefersReducedMotion: boolean;
}

function TiltCard({ card, isDesktop, prefersReducedMotion }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

  // Parallax translation for illustration
  const illusX = useTransform(mouseXSpring, [-0.5, 0.5], [-14, 14]);
  const illusY = useTransform(mouseYSpring, [-0.5, 0.5], [-14, 14]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: prefersReducedMotion ? undefined : 1000,
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: prefersReducedMotion ? undefined : "preserve-3d",
      }}
      className={`group relative shrink-0 w-[260px] sm:w-[270px] md:w-[280px] lg:w-[260px] xl:w-[275px] h-[460px] sm:h-[490px] md:h-[510px] rounded-3xl p-6 sm:p-7 flex flex-col justify-between text-white shadow-xl transition-all duration-300 select-none cursor-pointer active:scale-[0.97] ${
        isDesktop
          ? "lg:-mr-6 xl:-mr-4 first:ml-0 hover:z-30 hover:-translate-y-6"
          : "snap-center"
      }`}
      animate={{
        rotate: isDesktop && !prefersReducedMotion ? (isHovered ? 0 : card.arcRotate) : 0,
        y: isDesktop && !prefersReducedMotion ? (isHovered ? -20 : card.arcY) : 0,
        backgroundColor: card.bgHex,
      }}
      transition={{
        rotate: { duration: 0.3, ease: "easeOut" },
        y: { duration: 0.3, ease: "easeOut" },
      }}
    >
      {/* Top Header: Card Title & Index Number */}
      <div className="flex items-start justify-between relative z-10">
        <span className="font-mono text-xs font-bold tracking-widest text-white/70">
          {"// CAPABILITY"}
        </span>
        <span className="font-mono text-xs font-extrabold tracking-widest px-2.5 py-1 rounded-full bg-white/15 text-white backdrop-blur-sm">
          {card.index}
        </span>
      </div>

      {/* Huge Condensed Background Title */}
      <div
        className="absolute inset-x-6 top-16 text-3xl sm:text-4xl md:text-[42px] font-black tracking-tighter uppercase leading-[0.88] text-white/20 pointer-events-none select-none break-words"
        aria-hidden="true"
      >
        {card.title}
      </div>

      {/* Floating 3D-Style Illustration with Parallax Depth */}
      <motion.div
        style={{
          x: prefersReducedMotion ? 0 : illusX,
          y: prefersReducedMotion ? 0 : illusY,
          transform: prefersReducedMotion ? undefined : "translateZ(30px)",
        }}
        className="relative z-20 w-36 h-36 sm:w-44 sm:h-44 mx-auto my-auto transition-transform duration-300 group-hover:scale-108 motion-reduce:transform-none"
      >
        {card.illustration}
      </motion.div>

      {/* Bottom Area: Description & Round White Action Button */}
      <div className="relative z-10 pt-4 flex items-end justify-between gap-3 border-t border-white/20">
        <p className="text-xs sm:text-[13px] font-medium text-white/95 leading-relaxed max-w-[170px] sm:max-w-[185px]">
          {card.description}
        </p>

        <Link
          href="#contact"
          className="shrink-0 w-11 h-11 rounded-full bg-white text-[#0B1B2B] flex items-center justify-center font-bold shadow-md hover:bg-slate-100 hover:scale-110 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={`Start a project with ${card.title}`}
        >
          <Plus className="w-5 h-5 text-[#0B1B2B]" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
}

export function Capabilities() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", checkViewport);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <section
      id="capabilities"
      aria-label="Capabilities"
      className="w-full bg-white text-[#0B1B2B] py-24 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 border-b border-slate-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="label-caps text-[#12A9EC] block mb-2">
            CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0B1B2B] leading-[1.12]">
            Pick{" "}
            <span className="bg-gradient-to-r from-[#12A9EC] to-[#2563EB] bg-clip-text text-transparent">
              what you need.
            </span>
          </h2>
        </div>

        {/* Fanned Arc Layout (Desktop) / Horizontal Swipe Row (Mobile) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex lg:justify-center items-center overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-8 pt-4 px-2 sm:px-4 no-scrollbar"
        >
          {CAPABILITIES.map((card) => (
            <TiltCard
              key={card.id}
              card={card}
              isDesktop={isDesktop}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>

        {/* Interactive Guidance Hint */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-400">
            Tilt a card, press it, start a project.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Capabilities;
