/**
 * Company information for AlphaCodes
 * Source of truth strictly based on corporate records and specification.
 */
export const COMPANY = {
  name: "AlphaCodes",
  domain: "www.alphacodes.online",
  url: "https://www.alphacodes.online",
  parentCompany: {
    name: "THAAYAKAM LTD",
    country: "UK",
    registrationNumber: "12875849",
    jurisdiction: "registered in England & Wales",
  },
  relationship: "Sri Lankan subsidiary and workforce of THAAYAKAM LTD (UK, company no. 12875849, registered in England & Wales)",
  tagline: "Build & Develop own & custom products.",
  description:
    "Software development company — designs, builds and runs digital products from first MVP to production scale.",
  address: {
    line1: "No. 108, Rathinapuram Road",
    city: "Kilinochchi",
    province: "Northern Province",
    postalCode: "44000",
    country: "Sri Lanka",
    full: "No. 108, Rathinapuram Road, Kilinochchi, Northern Province 44000, Sri Lanka",
  },
  services: [
    {
      title: "Product Engineering",
      offerings: ["SaaS", "AI applications", "mobile apps", "product revamp"],
    },
    {
      title: "Website Development",
      offerings: [
        "corporate",
        "portfolio",
        "Shopify",
        "startup landing pages",
        "medical professional sites",
      ],
    },
    {
      title: "Cloud Operations",
      offerings: ["migration", "infrastructure", "cost optimisation"],
    },
    {
      title: "Digital Product Design",
      offerings: ["MVP design", "product redesign"],
    },
  ],
  process: [
    { step: 1, name: "Discovery" },
    { step: 2, name: "Design" },
    { step: 3, name: "Build" },
    { step: 4, name: "Run" },
  ],
} as const;

export type CompanyData = typeof COMPANY;
