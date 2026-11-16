export type ProjectCategory =
  | "SaaS"
  | "Website"
  | "Mobile"
  | "Cloud"
  | "Design";

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  clientCountry?: string;
  description?: string;
  techStack?: string[];
  year?: string;
  image: string;
  url?: string;
  features?: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "btcl",
    name: "British Tamils Cricket League (BTCL)",
    category: "Website",
    clientCountry: "United Kingdom",
    year: "2024",
    url: "https://www.btcluk.com",
    description: "Official web platform for the British Tamils Cricket League.",
    techStack: ["React", ".NET"],
    image: "/projects/btcl.png",
  },
  {
    id: "sail-indsri",
    name: "Sail IndSri",
    category: "Website",
    clientCountry: "TODO",
    year: "2024",
    url: "TODO",
    description: "Free online book library platform.",
    techStack: ["React", ".NET"],
    image: "/projects/sail-indsri.png",
  },
  {
    id: "promozon",
    name: "PromoZon",
    category: "Mobile",
    clientCountry: "United Kingdom",
    year: "TODO",
    url: "https://www.promozon.co.uk",
    description:
      "Location-based deals platform connecting local merchants and shoppers, with separate customer and merchant apps.",
    techStack: ["Laravel", "Android", "iOS"],
    features: [
      "Nearby deals & proximity alerts",
      "Follow favourite shops",
      "Reward points",
      "Voucher redemption",
      "Merchant dashboard",
    ],
    image: "/projects/promozon.png",
  },
  {
    id: "vas-solicitors",
    name: "VAS Solicitors",
    category: "Website",
    clientCountry: "United Kingdom",
    year: "2025",
    url: "https://vassolicitors.co.uk",
    description:
      "Corporate website for a South London law firm covering property, private client, family, employment and immigration law.",
    techStack: ["WordPress", "Avada"],
    image: "/projects/vas-solicitors.png",
  },
  {
    id: "schooler",
    name: "Schooler.lk",
    category: "SaaS",
    clientCountry: "Sri Lanka",
    year: "2024",
    url: "https://schooler.lk",
    description: "School management system built for Sri Lankan schools.",
    techStack: [],
    image: "/projects/schooler.png",
  },
  {
    id: "iykons",
    name: "IYKONS",
    category: "Website",
    clientCountry: "United Kingdom",
    year: "TODO",
    url: "https://www.iykons.com",
    description: "Website for a UK accounting and business services firm.",
    techStack: [],
    image: "/projects/iykons.png",
  },
  {
    id: "thamilalayam-berlin",
    name: "Thamilalayam Berlin",
    category: "Website",
    clientCountry: "Germany",
    year: "2023",
    url: "https://www.thamilalayamberlin.de",
    description: "TODO",
    techStack: [],
    image: "/projects/thamilalayam-berlin.png",
  },
];
