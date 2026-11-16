import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.alphacodes.online"),
  title: {
    default: "AlphaCodes — Software Studio of THAAYAKAM LTD",
    template: "%s | AlphaCodes",
  },
  description:
    "AlphaCodes is the Sri Lankan software development subsidiary and workforce of THAAYAKAM LTD (UK, company no. 12875849). Designs, builds and runs digital products from first MVP to production scale — SaaS, AI applications, mobile apps, and cloud operations.",
  keywords: [
    "AlphaCodes",
    "THAAYAKAM LTD",
    "Software Studio",
    "Product Engineering",
    "SaaS Development",
    "AI Applications",
    "Mobile Apps",
    "Website Development",
    "Cloud Operations",
    "Digital Product Design",
    "Kilinochchi",
    "Sri Lanka",
    "United Kingdom",
  ],
  authors: [{ name: "AlphaCodes" }],
  creator: "AlphaCodes",
  publisher: "THAAYAKAM LTD",
  alternates: {
    canonical: "https://www.alphacodes.online",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.alphacodes.online",
    title: "AlphaCodes — Software Studio of THAAYAKAM LTD",
    description:
      "Build & Develop own & custom products. Digital products from first MVP to production scale.",
    siteName: "AlphaCodes",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AlphaCodes — Software Studio of THAAYAKAM LTD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaCodes — Software Studio of THAAYAKAM LTD",
    description:
      "Build & Develop own & custom products. Digital products from first MVP to production scale.",
    images: ["/og-image.png"],
    creator: "@AlphaCodes",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1B2B",
  width: "device-width",
  initialScale: 1,
};

// Organization Schema JSON-LD
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AlphaCodes",
  url: "https://www.alphacodes.online",
  logo: "https://www.alphacodes.online/alphacodes-mark.png",
  description:
    "Software studio of THAAYAKAM LTD. Designs, builds and runs digital products from first MVP to production scale.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 108, Rathinapuram Road",
    addressLocality: "Kilinochchi",
    addressRegion: "Northern Province",
    postalCode: "44000",
    addressCountry: "LK",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "THAAYAKAM LTD",
    url: "https://www.thaayakam.co.uk",
    identifier: "12875849",
    address: {
      "@type": "PostalAddress",
      addressCountry: "GB",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-[#0B1B2B] min-h-screen selection:bg-[#12A9EC] selection:text-white overflow-x-hidden">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
