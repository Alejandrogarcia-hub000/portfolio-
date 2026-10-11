# Portfolio Customization Guide & Comprehensive README Plan

A structured, end-to-end documentation plan to provide an exhaustive `README.md` that guides developers on how to fully adapt and personalize every aspect of this Dennis Snellenberg–inspired portfolio.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following directions have been confirmed through Phase 1 planning questions:

- **Documentation Location**: A single comprehensive `README.md` at the project root (`/README.md`) for immediate visibility on GitHub and IDE workspaces.
- **Customization Priority**: Complete guide detailing personal branding, projects collection, photography/graphics, typography, physics/animations, contact endpoint configuration, and color themes.

---

## 1. Overview & Core Concept

- **What It Does**: Provides a clear, copy-paste-ready, structured developer guide detailing how anyone can fork or clone this repository and completely rebrand it with their own identity, projects, photography, custom fonts, animations, and contact endpoints.
- **Target Audience**: Developers, designers, and students seeking to use this award-winning portfolio layout for their personal websites.
- **Key Value**: Eliminates guesswork by mapping every user-facing visual element to its exact code file, line, and asset path, accompanied by schemas and code snippets.

---

## 2. Documentation Architecture & Sections

The resulting `README.md` will be organized into intuitive, logically sequenced sections:

### 1. Project Overview & Features
- Summary of architecture (React 19, Vite, Tailwind CSS v4, Lenis smooth scroll, React Router).
- Highlighted interaction features (magnetic cursor buttons, SVG curtain page transitions, velocity-based header marquee, floating project preview follower, timezone clock).

### 2. Quick Start & Local Development
- Prerequisites (Node.js 18+).
- Installation commands (`npm install`).
- Development server (`npm run dev` at port 3000).
- Production build & preview (`npm run build`, `npm run preview`).

### 3. Quick Reference Customization Map
A consolidated cheat-sheet table mapping elements to files:
| What to Customize | Target File / Folder | Details |
| :--- | :--- | :--- |
| Personal Name & Title | `src/pages/Home.tsx`, `src/components/Navbar.tsx` | Hero text, marquee, logo copyright |
| Projects & Work Grid | `src/data/projects.ts` | Project cards, links, tags, categories |
| About Bio & Education | `src/pages/About.tsx` | Bio paragraph, degree, college, skill tags |
| Contact Form & Details | `src/pages/Contact.tsx`, `src/components/Footer.tsx` | Formspree ID, email, phone, social links |
| Timezone Clock | `src/hooks/useInteractions.ts` | Local timezone (e.g. `Asia/Dubai`) |
| Headshots & Thumbnails | `public/assets/` | PNG cutout, avatar, project SVG/JPGs |
| Typography & Fonts | `public/assets/`, `src/portfolio.css` | Neue Montreal / custom font-face declarations |
| Color Scheme & Themes | `src/portfolio.css`, `index.html` | Background tones, theme colors |

### 4. Deep-Dive Customization Guides

#### A. Personal Information & Branding
- How to change your name across the site (`Aadarsh Rai` -> Your Name):
  - Navbar branding logo (`src/components/Navbar.tsx`)
  - Hero marquee scrolling ribbon (`src/pages/Home.tsx`)
  - Browser tab title & OpenGraph meta tags (`index.html`, `metadata.json`)
  - Footer copyright and version badge (`src/components/Footer.tsx`, `src/pages/Contact.tsx`)

#### B. Projects & Portfolio Showcase
- Explaining the `Project` interface schema in `src/data/projects.ts`:
  - `id`: unique slug used for hover followers.
  - `title`: display name.
  - `category`: array containing `'development'`, `'design'`, or `'interaction'` (powers filter buttons in `/work`).
  - `location`: client/project origin.
  - `services`: subtitle description.
  - `year`: completion year.
  - `sub`: brief synopsis for tile view.
  - `tags`: technology stack tags.
  - `link`: external live demo or GitHub repository URL.
  - `image` & `svg`: asset thumbnail paths.
  - `bgColor`: background highlight color for thumbnail container.
- How to add, edit, or reorder projects.

#### C. Photography, Graphics & Assets
- Explaining file formats and dimensions in `public/assets/`:
  - `hero-cutout.png`: Transparent background portrait cutout for the hero section.
  - `about-portrait.jpg`: Editorial portrait for the About page.
  - `avatar.jpg`: Profile thumbnail for footer and badges.
  - `work-*.svg`: Vector artwork / screenshots for project tiles.
  - `favicon.svg`: Browser favicon.

#### D. About Me, Education & Skills
- Updating the bio text, services offerings (`Machine Learning`, `LLMs & GenAI`, `The full package`), degree details, and technology badges in `src/pages/About.tsx`.

#### E. Contact Form Setup (Formspree or Custom API)
- How to connect your own free Formspree endpoint in `src/pages/Contact.tsx` (`https://formspree.io/f/<YOUR_FORM_ID>`).
- Honeypot spam defense explanation and how direct email/phone click-to-contact links work.

#### F. Local Timezone Clock
- Updating `Intl.DateTimeFormat` timezone string in `src/hooks/useInteractions.ts` (e.g., `'America/New_York'`, `'Europe/London'`, `'Asia/Tokyo'`) and updating the label in footer (`GST` -> `EST` / `UTC`).

#### G. Typography, Colors & Aesthetics
- Replacing or adding custom `@font-face` fonts in `public/assets/` and `src/portfolio.css`.
- Tweaking color tokens (`#0e0e0e`, `#1c1d20`, `#ffffff`) and magnetic physics strength attributes (`data-strength="25"`).

### 5. Deployment Guide
- Deploying to Vercel, Netlify, Cloud Run, or GitHub Pages.
- SPA client-side routing fallback configuration (`_redirects` / `vercel.json`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Consolidated Single README vs Multi-File Docs Folder**
  - *Chosen*: Single well-organized `README.md` in root with internal anchor links and structured code blocks.
  - *Why*: Standard convention for personal portfolios and GitHub repositories. Visitors and cloners get everything in one place immediately upon landing on the repo.
- **Decision 2: Detailed Code Snippets vs High-Level Instructions**
  - *Chosen*: Provide explicit before-and-after code snippets for every major customization step.
  - *Why*: Prevents syntax errors, broken layout tokens, or missing fields in TypeScript interfaces.

---

## 4. Technical Architecture & Customization Mapping

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PORTFOLIO ARCHITECTURE                          │
└────────────────────────────────────────────────────────────────────────┘

  Content & Assets                    Components & Pages
 ┌──────────────────────┐            ┌───────────────────────────────────┐
 │ public/assets/       │            │ src/components/                   │
 │  ├─ hero-cutout.png  │───────────>│  ├─ Navbar.tsx (Name/branding)    │
 │  ├─ about-portrait.jpg            │  ├─ Footer.tsx (Socials & time)   │
 │  ├─ avatar.jpg       │            │  ├─ MobileNav.tsx (Overlay menu)  │
 │  └─ work-*.svg       │            │  └─ LoadingScreen.tsx (Greetings) │
 └──────────────────────┘            └───────────────────────────────────┘
                                                       │
 ┌──────────────────────┐                              ▼
 │ src/data/            │            ┌───────────────────────────────────┐
 │  └─ projects.ts      │───────────>│ src/pages/                        │
 │     (Projects data)  │            │  ├─ Home.tsx (Hero & Recent work) │
 └──────────────────────┘            │  ├─ Work.tsx (Filterable grid)    │
                                     │  ├─ About.tsx (Bio & credentials) │
 ┌──────────────────────┐            │  └─ Contact.tsx (Form & info)     │
 │ Styling & Physics    │            └───────────────────────────────────┘
 │  ├─ portfolio.css    │                              ▲
 │  ├─ useLenis.ts      │──────────────────────────────┘
 │  └─ useInteractions  │
 └──────────────────────┘
```

---

## 5. Verification Steps

1. Verify `README.md` is created with valid Markdown, clean headings, code blocks, and tables.
2. Confirm all paths referenced in the documentation accurately match actual files in the repository.
3. Run `compile_applet` and `lint_applet` to ensure repository integrity remains 100% clean.
