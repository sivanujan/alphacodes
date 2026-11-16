const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const projects = [
  {
    slug: 'btcl',
    name: 'British Tamils Cricket League',
    tag: 'BTCL UK // Cricket Web Platform',
    grad1: '#0B1B2B',
    grad2: '#12304F',
    accent: '#12A9EC',
    sub: 'React · .NET · Real-time Match Telemetry',
  },
  {
    slug: 'sail-indsri',
    name: 'Sail IndSri',
    tag: 'Online Book Library Platform',
    grad1: '#0B1B2B',
    grad2: '#1E293B',
    accent: '#38BDF8',
    sub: 'React · .NET · Digital Publications & Catalog',
  },
  {
    slug: 'promozon',
    name: 'PromoZon',
    tag: 'Deals & Merchant Commerce Suite',
    grad1: '#0B1B2B',
    grad2: '#1B2640',
    accent: '#12A9EC',
    sub: 'Laravel · iOS · Android · Merchant Dashboard',
  },
  {
    slug: 'vas-solicitors',
    name: 'VAS Solicitors',
    tag: 'Legal Firm Corporate Platform',
    grad1: '#0B1B2B',
    grad2: '#152C3E',
    accent: '#2563EB',
    sub: 'WordPress · Avada · Legal Practice Areas',
  },
  {
    slug: 'schooler',
    name: 'Schooler.lk',
    tag: 'School Management SaaS',
    grad1: '#0B1B2B',
    grad2: '#0D2D44',
    accent: '#12A9EC',
    sub: 'SaaS Platform · Academic Administration',
  },
  {
    slug: 'iykons',
    name: 'IYKONS',
    tag: 'Accounting & Business Services Firm',
    grad1: '#0B1B2B',
    grad2: '#192D4B',
    accent: '#38BDF8',
    sub: 'Corporate Advisory · Accounting · UK',
  },
  {
    slug: 'thamilalayam-berlin',
    name: 'Thamilalayam Berlin',
    tag: 'Educational & Cultural Portal',
    grad1: '#0B1B2B',
    grad2: '#182438',
    accent: '#12A9EC',
    sub: 'Berlin, Germany · Community Education Portal',
  },
];

async function generate() {
  const outputDir = path.join(__dirname, '..', 'public', 'projects');

  for (const p of projects) {
    const safeName = p.name.replace(/&/g, '&amp;');
    const safeTag = p.tag.replace(/&/g, '&amp;');
    const safeSub = p.sub.replace(/&/g, '&amp;');

    const svg = `<svg width="800" height="600" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-${p.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${p.grad1}" />
          <stop offset="100%" stop-color="${p.grad2}" />
        </linearGradient>
        <linearGradient id="accentGrad-${p.slug}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${p.accent}" />
          <stop offset="100%" stop-color="#2563EB" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="800" height="600" rx="16" fill="url(#bg-${p.slug})" />
      
      <!-- Subtle Tech Grid -->
      <g opacity="0.06" stroke="#FFFFFF" stroke-width="1">
        <line x1="0" y1="100" x2="800" y2="100" />
        <line x1="0" y1="200" x2="800" y2="200" />
        <line x1="0" y1="300" x2="800" y2="300" />
        <line x1="0" y1="400" x2="800" y2="400" />
        <line x1="0" y1="500" x2="800" y2="500" />
        <line x1="160" y1="0" x2="160" y2="600" />
        <line x1="320" y1="0" x2="320" y2="600" />
        <line x1="480" y1="0" x2="480" y2="600" />
        <line x1="640" y1="0" x2="640" y2="600" />
      </g>

      <!-- App Window Mockup Frame -->
      <rect x="60" y="55" width="680" height="490" rx="16" fill="#0E2135" stroke="${p.accent}" stroke-opacity="0.35" stroke-width="1.5" />
      
      <!-- Window Titlebar -->
      <rect x="60" y="55" width="680" height="46" rx="16" fill="#071422" />
      <circle cx="88" cy="78" r="5" fill="#EF4444" />
      <circle cx="106" cy="78" r="5" fill="#F59E0B" />
      <circle cx="124" cy="78" r="5" fill="#10B981" />
      <rect x="230" y="67" width="340" height="22" rx="11" fill="#132B45" />
      <text x="400" y="82" fill="#94A3B8" font-family="monospace" font-size="10" text-anchor="middle">${p.slug}.alphacodes.online</text>

      <!-- App Hero Banner -->
      <rect x="95" y="130" width="610" height="200" rx="12" fill="#12273F" stroke="#1D3958" />
      <rect x="125" y="158" width="130" height="24" rx="12" fill="${p.accent}" fill-opacity="0.2" stroke="${p.accent}" stroke-opacity="0.4" />
      <text x="190" y="174" fill="${p.accent}" font-family="sans-serif" font-weight="700" font-size="10" text-anchor="middle" letter-spacing="1">ALPHACODES SHOWCASE</text>

      <!-- Project Name Headline -->
      <text x="125" y="225" fill="#FFFFFF" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="30" letter-spacing="-0.5">${safeName}</text>
      <text x="125" y="260" fill="#94A3B8" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14">${safeTag}</text>

      <!-- Tech Stack Sub-Bar -->
      <g transform="translate(95, 360)">
        <rect x="0" y="0" width="610" height="140" rx="12" fill="#0B1A2A" stroke="#172C42" />
        <text x="30" y="40" fill="${p.accent}" font-family="monospace" font-size="11" font-weight="700" letter-spacing="1">PRODUCTION STACK &#8226; ARCHITECTURE</text>
        <text x="30" y="70" fill="#E2E8F0" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="600">${safeSub}</text>
        
        <rect x="30" y="95" width="140" height="28" rx="14" fill="url(#accentGrad-${p.slug})" />
        <text x="100" y="113" fill="#FFFFFF" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="11" text-anchor="middle">LIVE PLATFORM</text>
      </g>
    </svg>`;

    const dest = path.join(outputDir, `${p.slug}.png`);
    await sharp(Buffer.from(svg))
      .resize(800, 600)
      .png({ quality: 90 })
      .toFile(dest);
    console.log(`Generated: ${p.slug}.png`);
  }
}

generate().catch(console.error);
