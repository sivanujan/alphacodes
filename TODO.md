# AlphaCodes Launch Checklist & Content Replacement Guide

This document catalogs every placeholder, configuration setting, and pending management confirmation in the **AlphaCodes** website codebase.

All static content has been cleanly decoupled into `/data/` and `/public/` files so you can update them directly without touching UI components.

---

## 1. Contact & Corporate Details (`/data/contact.ts`)

| Item | Current Value | Action Required |
| :--- | :--- | :--- |
| **Direct Phone** | `"TODO"` | Update `phone` in `data/contact.ts`. Card & footer link are hidden automatically until replaced. |
| **Direct Email** | `"TODO"` | Update `email` in `data/contact.ts`. Card & footer link are hidden automatically until replaced. |
| **LinkedIn Page** | `"TODO"` | Update `linkedin` with your official AlphaCodes LinkedIn company page URL. |
| **Optional Socials** | `""` (Empty) | Optionally add `github`, `twitter`, or other handles in `otherSocials`. |

---

## 2. Contact Form API Key (`.env.local`)

| Item | Location | Action Required |
| :--- | :--- | :--- |
| **Web3Forms Key** | `.env.local` | Obtain your free access key at [web3forms.com](https://web3forms.com) and add `NEXT_PUBLIC_WEB3FORMS_KEY=your_key` to `.env.local` (see `.env.example`). |

---

## 3. Client Statistics (`/data/clients.ts`)

*Confirm with management:*

| Metric | Current Placeholder | Target File |
| :--- | :--- | :--- |
| **Projects Delivered** | `50+` (`numericTarget: 50`) | `data/clients.ts` -> `CLIENT_STATS` |
| **Clients Served** | `35+` (`numericTarget: 35`) | `data/clients.ts` -> `CLIENT_STATS` |
| **Countries Active** | `10+` (`numericTarget: 10`) | `data/clients.ts` -> `CLIENT_STATS` |

---

## 4. Client Logos & Wordmarks (`/data/clients.ts`)

- **Current State**: Real client names active (BTCL, Sail IndSri, PromoZon, VAS Solicitors, Schooler.lk, IYKONS, Thamilalayam Berlin) rendered as crisp typographic wordmarks.
- **Action Required**:
  1. If logo graphics (`.svg` or `.png`) are available, add them into `/public/clients/`.
  2. Set `image: "/clients/your-logo.svg"` for each entry in `CLIENT_LOGOS` in `data/clients.ts`.
  3. If no image is provided, the wordmark displays cleanly by default.

---

## 5. Client Testimonials (`/data/clients.ts`)

- **Current State**: 5 marked placeholder testimonials (`Placeholder Client Executive A` to `E`).
- **Action Required**: Update quotes, names, roles, companies, and country codes in `CLIENT_TESTIMONIALS` in `data/clients.ts`.

---

## 6. Real Projects Details & Screenshots (`/data/projects.ts`)

- **Current State**: 7 real projects populated (BTCL, Sail IndSri, PromoZon, VAS Solicitors, Schooler.lk, IYKONS, Thamilalayam Berlin) with generated PNG mockups in `/public/projects/`.
- **Pending Information**:
  - `Sail IndSri`: confirm country and live URL.
  - `PromoZon`: confirm launch year.
  - `Schooler.lk`: confirm tech stack.
  - `IYKONS`: confirm launch year and tech stack.
  - `Thamilalayam Berlin`: confirm project description and tech stack.
  - Real browser/app screenshots: drop final PNGs into `/public/projects/<slug>.png`.

---

## 7. Studio Film & Workspace Photos

### A. Studio Reel Video (`/public/film/studio.mp4`)
- **Current State**: Automated code editor + live preview simulation fallback.
- **Action Required**: Drop your final MP4 video into `/public/film/studio.mp4`. The component automatically detects the file via `HEAD` probe on mount and plays it with audio controls.

### B. Workspace Photos (`/public/studio/` & `/data/studio.ts`)
- **Current State**: 8 vector tech blueprints (`studio-1.svg` through `studio-8.svg`).
- **Action Required**: Replace with real office, engineering workstation, and team photos (`.jpg` or `.png`) in `/public/studio/` and update `STUDIO_IMAGES` in `data/studio.ts`.

---

## 8. Domain & DNS Verification

- **Production URL**: `https://www.alphacodes.online`
- **DNS Record**: Point `www.alphacodes.online` to your hosting provider (Vercel, Cloudflare Pages, Netlify, or AWS S3/CloudFront).
- **Static Export**: The build output in `/out/` is standalone HTML/CSS/JS and can be hosted on any static host.
