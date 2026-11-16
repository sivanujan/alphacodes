/**
 * Client data for AlphaCodes
 * ALL content kept here for easy editing.
 * TODO: Confirm final metrics and client logos with management.
 */

export interface ClientStat {
  id: string;
  displayValue: string;
  numericTarget: number;
  suffix: string;
  label: string;
  note: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  image?: string; // Optional image path, e.g. "/clients/logo.svg"
  tagline: string;
}

export interface ClientTestimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  country: string;
  countryCode: string; // For flag chip
}

export const CLIENT_STATS: ClientStat[] = [
  {
    id: "projects",
    displayValue: "50+",
    numericTarget: 50,
    suffix: "+",
    label: "Projects delivered",
    note: "TODO: confirm with management (placeholder: 50+)",
  },
  {
    id: "clients",
    displayValue: "35+",
    numericTarget: 35,
    suffix: "+",
    label: "Clients served",
    note: "TODO: confirm with management (placeholder: 35+)",
  },
  {
    id: "countries",
    displayValue: "10+",
    numericTarget: 10,
    suffix: "+",
    label: "Countries",
    note: "TODO: confirm with management (placeholder: 10+)",
  },
];

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: "btcl", name: "British Tamils Cricket League", tagline: "SPORTS WEB PLATFORM" },
  { id: "sail-indsri", name: "Sail IndSri", tagline: "ONLINE DIGITAL LIBRARY" },
  { id: "promozon", name: "PromoZon", tagline: "DEALS & COMMERCE APPS" },
  { id: "vas-solicitors", name: "VAS Solicitors", tagline: "LEGAL PRACTICE FIRM" },
  { id: "schooler", name: "Schooler.lk", tagline: "SCHOOL MANAGEMENT SAAS" },
  { id: "iykons", name: "IYKONS", tagline: "ACCOUNTING & CONSULTING" },
  { id: "thamilalayam-berlin", name: "Thamilalayam Berlin", tagline: "EDUCATIONAL PORTAL" },
];

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: "testimonial-1",
    quote:
      "Replace with real client quote — AlphaCodes engineered our core SaaS platform from first MVP to multi-tenant production scale with exceptional architectural rigor and sprint velocity.",
    name: "Placeholder Client Executive A",
    role: "Chief Technology Officer",
    company: "Client Company One",
    country: "United Kingdom",
    countryCode: "GB",
  },
  {
    id: "testimonial-2",
    quote:
      "Replace with real client quote — The team delivered our medical professional web portal with pristine precision and responsive performance that our clinicians rely on daily.",
    name: "Placeholder Medical Director B",
    role: "Clinical Lead",
    company: "Client Healthcare Group",
    country: "Sri Lanka",
    countryCode: "LK",
  },
  {
    id: "testimonial-3",
    quote:
      "Replace with real client quote — Seamless cloud migration and infrastructure cost optimisation. AlphaCodes operates as a true technical partner, not just a service provider.",
    name: "Placeholder Operations Head C",
    role: "Head of Infrastructure",
    company: "Client Enterprise Systems",
    country: "Germany",
    countryCode: "DE",
  },
  {
    id: "testimonial-4",
    quote:
      "Replace with real client quote — High-converting Shopify storefront built with custom Liquid modules and headless Next.js speeds. Our mobile conversion rates jumped immediately.",
    name: "Placeholder Brand Founder D",
    role: "Founder & CEO",
    company: "Client Commerce Studio",
    country: "Australia",
    countryCode: "AU",
  },
  {
    id: "testimonial-5",
    quote:
      "Replace with real client quote — AlphaCodes translated our raw prototype into a sleek, production-ready AI workflow suite. The speed from discovery to run was incredible.",
    name: "Placeholder Product Lead E",
    role: "VP of Product",
    company: "Client AI Ventures",
    country: "United States",
    countryCode: "US",
  },
];
