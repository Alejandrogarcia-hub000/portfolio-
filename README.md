# Aadarsh Rai — Dennis Snellenberg–Style Portfolio Template

A modern, high-performance, dark-aesthetic personal portfolio built with **React 19**, **Vite**, **TypeScript**, and **Tailwind CSS v4**. Inspired by Dennis Snellenberg’s award-winning design language, this codebase features **Lenis** smooth scrolling, spring-physics magnetic buttons, custom SVG curtain page transitions, velocity-reactive marquees, floating project image followers, and interactive timezone tracking.

---

## Table of Contents

1. [Features & Tech Stack](#features--tech-stack)
2. [Quick Start & Local Development](#quick-start--local-development)
3. [Project File Structure](#project-file-structure)
4. [Customization Quick Reference Map](#customization-quick-reference-map)
5. [Step-by-Step Customization Guide](#step-by-step-customization-guide)
   - [1. Personal Branding & Name](#1-personal-branding--name)
   - [2. Projects & Portfolio Work](#2-projects--portfolio-work)
   - [3. Photography, Graphics & Media Assets](#3-photography-graphics--media-assets)
   - [4. About Me, Education & Skills](#4-about-me-education--skills)
   - [5. Contact Form Setup (Formspree or Custom API)](#5-contact-form-setup-formspree-or-custom-api)
   - [6. Local Timezone Clock](#6-local-timezone-clock)
   - [7. Social Media & External Links](#7-social-media--external-links)
   - [8. Typography & Fonts](#8-typography--fonts)
   - [9. Colors & Visual Theme](#9-colors--visual-theme)
   - [10. Animation & Physics Tweaks](#10-animation--physics-tweaks)
6. [Building & Deployment](#building--deployment)
7. [License & Credits](#license--credits)

---

## Features & Tech Stack

- **React 19 & TypeScript**: Strict types, modern functional components, and custom hooks.
- **Vite 8**: Sub-millisecond HMR and lightning-fast build bundling.
- **Lenis Smooth Scroll**: Inertial smooth wheel and touch scrolling.
- **Tailwind CSS v4**: Ultra-clean styling system paired with custom luxury Dennis Snellenberg styles (`portfolio.css`).
- **Interactive Micro-Interactions**:
  - **Magnetic Buttons**: Spring easing with customizable force (`data-strength` & `data-strength-text`).
  - **SVG Curtain Page Transitions**: Morphing polygon clipping paths with multi-lingual greeting sequences.
  - **Dynamic Velocity Marquee**: Giant header name banner that accelerates and reverses with user scroll direction.
  - **Floating Cursor Follower**: Dual-layer preview follower that smoothly tracks cursor coordinates and reveals project artwork on hover.
  - **Live Timezone Clock**: Real-time 12-hour clock calibrated to any world city.

---

## Quick Start & Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) version 18.0 or higher.
- `npm`, `pnpm`, or `yarn`.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project File Structure

```
├── public/
│   └── assets/                     # Media, portraits, vectors, and font files
│       ├── hero-cutout.png         # Main hero cutout portrait
│       ├── about-portrait.jpg      # About page editorial photo
│       ├── avatar.jpg              # Profile picture (badges and footer)
│       ├── favicon.svg             # Browser tab icon
│       ├── NeueMontreal-*.otf      # Primary typography files
│       └── work-*.svg              # Project illustration cards
├── src/
│   ├── components/                 # Shared UI components
│   │   ├── Footer.tsx              # Parallax footer with magnetic touch button
│   │   ├── LoadingScreen.tsx       # Multilingual animated curtain overlay
│   │   ├── MobileNav.tsx           # Full-screen sliding drawer navigation
│   │   └── Navbar.tsx              # Top navigation bar with logo copyright
│   ├── context/
│   │   └── NavigationContext.tsx   # Page transition state and polygon curve runner
│   ├── data/
│   │   └── projects.ts             # ⭐ All project data (titles, links, tags, etc.)
│   ├── hooks/
│   │   ├── useInteractions.ts      # ⭐ Magnetic physics, marquee, clock, cursor follower
│   │   └── useLenis.ts             # Smooth scrolling engine initialization
│   ├── pages/                      # Application route views
│   │   ├── About.tsx               # Bio, credentials, services, and education
│   │   ├── Contact.tsx             # Interactive contact form & business details
│   │   ├── Home.tsx                # Hero header, marquee, intro, and recent work
│   │   └── Work.tsx                # Filterable grid / list views
│   ├── App.tsx                     # Route definitions & layout wrappers
│   ├── main.tsx                    # Entry point & root providers
│   ├── portfolio.css               # Dennis Snellenberg signature CSS styles
│   └── index.css                   # Tailwind CSS import & global style rules
├── index.html                      # HTML root, SEO meta tags, and font preloads
├── metadata.json                   # App manifest configuration
├── package.json                    # Dependencies & build scripts
└── vite.config.ts                  # Vite build configuration
```

---

## Customization Quick Reference Map

Use this cheat sheet to quickly find where to change each part of the website:

| What to Change | File Path | What to Edit |
| :--- | :--- | :--- |
| **Your Name & Title** | `src/pages/Home.tsx`<br>`src/components/Navbar.tsx`<br>`index.html` | Marquee, hero heading, logo, `<title>` |
| **All Projects** | `src/data/projects.ts` | The `PROJECTS` array |
| **Hero Cutout Photo** | `public/assets/hero-cutout.png` | Replace image (transparent PNG) |
| **About Bio & Photo** | `src/pages/About.tsx`<br>`public/assets/about-portrait.jpg` | Text, services, education list, photo |
| **Avatar / Profile Photo** | `public/assets/avatar.jpg` | Replace image (1:1 square JPG/PNG) |
| **Contact Form Endpoint** | `src/pages/Contact.tsx` | Formspree form ID URL |
| **Email, Phone & Socials** | `src/pages/Contact.tsx`<br>`src/components/Footer.tsx`<br>`src/components/MobileNav.tsx` | LinkedIn, GitHub, email, telephone |
| **Local Timezone** | `src/hooks/useInteractions.ts`<br>`src/components/Footer.tsx` | `timeZone: 'Asia/Dubai'` and suffix `GST` |
| **Fonts & Typography** | `public/assets/`<br>`src/portfolio.css` | Replace `.otf`/`.woff2` and `@font-face` rules |
| **Brand Colors** | `src/portfolio.css` | Background `#0e0e0e`, `#1c1d20`, accent colors |

---

## Step-by-Step Customization Guide

### 1. Personal Branding & Name

#### A. Hero Marquee & Title (`src/pages/Home.tsx`)
Find the `.name-h1` section and replace `"Aadarsh Rai"` with your own name:
```tsx
<div className="big-name">
  <div className="name-h1">
    <div className="name-wrap">
      <h1 className="no-select">
        Your Name<span className="spacer">—</span>
      </h1>
    </div>
    <div className="name-wrap">
      <h1 className="no-select">
        Your Name<span className="spacer">—</span>
      </h1>
    </div>
  </div>
</div>
```

Update your professional headline right above the name:
```tsx
<h4 className="reveal">
  <span>Your Profession</span> Specialist / Engineer
</h4>
```

And your location hanger text:
```tsx
<p>
  <span>Located </span>
  <span>in </span>
  <span>San Francisco, USA</span>
</p>
```

#### B. Top Navigation Logo (`src/components/Navbar.tsx`)
Update the top-left animated copyright badge:
```tsx
<div className="cbd">
  <span className="code-by">Code by </span>
  <span className="author">Firstname</span>
  <span className="author-last"> Lastname</span>
</div>
```

#### C. HTML `<title>` and SEO Metadata (`index.html` & `metadata.json`)
Open `index.html` and update:
```html
<title>Your Name — Portfolio</title>
<meta name="description" content="Portfolio of Your Name — Software Engineer & Designer." />
<meta property="og:title" content="Your Name — Portfolio" />
```

---

### 2. Projects & Portfolio Work

All project content is cleanly separated in `src/data/projects.ts`. You do not need to edit complex HTML to modify projects.

#### Project Data Schema:
```typescript
export interface Project {
  id: string;          // Unique lowercase identifier (used by cursor follower)
  title: string;       // Display title
  category: string[];  // Filter categories: 'development', 'design', or 'interaction'
  location: string;    // Client or project location
  services: string;    // Subtitle / role description
  year: string;        // Year created
  sub: string;         // Short project summary (for card view)
  tags: string;        // Technology stack pills (e.g. "React · Node.js")
  link: string;        // External URL (live demo or GitHub repository)
  svg: string;         // Asset path for card vector preview
  image: string;       // Asset path for cursor follower preview
  bgColor: string;     // Hex color background for thumbnail container
}
```

#### How to Add or Edit Projects (`src/data/projects.ts`):
```typescript
export const PROJECTS: Project[] = [
  {
    id: 'my-app',
    title: 'My Awesome App',
    category: ['development', 'design'],
    location: 'New York, USA',
    services: 'Full-Stack Development & AI',
    year: '2026',
    sub: 'Real-time collaborative analytics platform',
    tags: 'Next.js · TypeScript · PostgreSQL',
    link: 'https://github.com/your-username/my-app',
    svg: '/assets/work-my-app.svg',
    image: '/assets/work-my-app.svg',
    bgColor: '#121826',
  },
  // Add as many projects as you like...
];
```

> **Tip for Category Filters**: The `/work` page includes filter buttons for `Design` and `Development`. Assign `'design'` or `'development'` in the `category` array so items filter accurately.

---

### 3. Photography, Graphics & Media Assets

All images live in `public/assets/`. To replace them, place your own files with matching filenames or update the paths in code:

| File Name | Purpose | Recommended Specs |
| :--- | :--- | :--- |
| `hero-cutout.png` | Cutout image of you for the main home hero | PNG with **transparent background**, ~1000×1200px |
| `about-portrait.jpg` | Editorial portrait for the About page | High-res portrait photo (3:4 aspect ratio) |
| `avatar.jpg` | Square avatar for footer & badges | 1:1 square photo, minimum 400×400px |
| `work-*.svg` or `.png` | Project card artwork | 16:9 or 4:3 graphics representing each project |
| `favicon.svg` | Browser tab icon | Vector SVG or 32×32 ICO |

#### Adjusting Hero Image Positioning:
If your hero image needs slight offset adjustment, open `src/pages/Home.tsx` and adjust `backgroundPosition`:
```tsx
<div
  className="overlay overlay-image"
  style={{
    backgroundImage: 'url(/assets/hero-cutout.png)',
    backgroundPosition: '55% bottom', // Adjust percentage (e.g. 50% bottom)
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }}
/>
```

---

### 4. About Me, Education & Skills

Open `src/pages/About.tsx` to customize your story, background, and services:

#### A. Intro Narrative
```tsx
<p>
  I help companies and engineering teams build tailor-made AI solutions and
  production-ready intelligent systems...
</p>
```

#### B. Services Offerings (3 Columns)
Edit the three cards under `<section className="section about-services">`:
- `01 Machine Learning`: Replace title and paragraph description.
- `02 LLMs & GenAI`: Replace with your second specialty (e.g., UI/UX Design).
- `03 The full package`: Replace with your third specialty (e.g., Cloud Architecture).

#### C. Education & Degree Credentials
Under `<div className="about-credentials">`:
```tsx
<div className="credential-item">
  <h5>Degree</h5>
  <h4>B.S. in Computer Science</h4>
  <p>University of California, Berkeley (2022 — 2026)</p>
</div>
```

#### D. Technology Skill Badges
Under `<div className="credential-tags">`:
```tsx
<span>React</span>
<span>TypeScript</span>
<span>Node.js</span>
<span>Python</span>
<span>PyTorch</span>
<span>Tailwind CSS</span>
<span>Docker</span>
<span>AWS</span>
```

---

### 5. Contact Form Setup (Formspree or Custom API)

The contact form in `src/pages/Contact.tsx` is pre-wired to submit asynchronously via `fetch` with built-in validation, feedback alerts, and anti-spam protection.

#### Connecting Free Formspree Endpoint:
1. Go to [Formspree.io](https://formspree.io/) and create a free account.
2. Create a new form and copy your 8-character form ID (e.g., `xpzklabm`).
3. Open `src/pages/Contact.tsx` and update `formspreeEndpoint`:

```typescript
// Replace 'xvkojkrj' with your Formspree form ID:
const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';
```

#### Connecting a Custom Backend Endpoint:
If you prefer your own API route, change `formspreeEndpoint` to your API URL:
```typescript
const formspreeEndpoint = '/api/contact';
```

#### Anti-Spam Honeypot:
The form includes a hidden honeypot field (`<input name="tel" />`). If automated spam bots fill this field, the submission is silently simulated as a success without sending notifications or wasting your quota.

---

### 6. Local Timezone Clock

The footer displays a live clock representing your home city (e.g. `11:42 am GST`).

#### Changing the Timezone:
Open `src/hooks/useInteractions.ts` and locate section `3. Dubai local time`:
```typescript
const updateTime = () => {
  try {
    timeSpan.textContent =
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/New_York', // Change to your IANA timezone
      })
        .format(new Date())
        .toLowerCase() + ' EST'; // Change time zone label
  } catch {
    timeSpan.textContent = new Date().toLocaleTimeString();
  }
};
```
Common IANA timezone examples:
- `'America/New_York'` (`EST` / `EDT`)
- `'America/Los_Angeles'` (`PST` / `PDT`)
- `'Europe/London'` (`GMT` / `BST`)
- `'Europe/Berlin'` (`CET`)
- `'Asia/Tokyo'` (`JST`)
- `'Asia/Kolkata'` (`IST`)
- `'Asia/Dubai'` (`GST`)

---

### 7. Social Media & External Links

Social links are featured in 3 places across the app:
1. **Footer** (`src/components/Footer.tsx`)
2. **Contact Page** (`src/pages/Contact.tsx`)
3. **Mobile Drawer Menu** (`src/components/MobileNav.tsx`)

Update the URLs and handles:
```tsx
<li className="btn btn-link btn-link-external">
  <a
    href="https://www.linkedin.com/in/your-profile/"
    target="_blank"
    rel="noopener noreferrer"
    className="btn-click magnetic"
    data-strength="20"
    data-strength-text="10"
  >
    <span className="btn-text">
      <span className="btn-text-inner">LinkedIn</span>
    </span>
  </a>
</li>
```
And your email / phone links:
```tsx
<a href="mailto:you@example.com">...</a>
<a href="tel:+1234567890">...</a>
```

---

### 8. Typography & Fonts

The portfolio is styled with **Neue Montreal** with an **Inter** fallback.

#### Font Files in `public/assets/`:
- `NeueMontreal-Light.otf`
- `NeueMontreal-Regular.otf`
- `NeueMontreal-Bold.otf`

#### Using Custom Fonts:
1. Place your `.woff2`, `.otf`, or `.ttf` font files in `public/assets/`.
2. Open `src/portfolio.css` and update the `@font-face` definitions:
```css
@font-face {
  font-family: 'Neue Montreal';
  src: url('/assets/YourFont-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```
3. Update preload tags in `index.html` to preload your new font files:
```html
<link rel="preload" as="font" href="/assets/YourFont-Regular.woff2" type="font/woff2" crossorigin="anonymous" />
```

---

### 9. Colors & Visual Theme

All primary design styles are declared in `src/portfolio.css`.

#### Background & Text Colors:
- Dark theme background: `#0e0e0e` and `#1c1d20`
- Light sections background: `#ffffff` and `#f4f4f4`
- Border stripes: `rgba(255, 255, 255, 0.15)`

To change the primary dark tone, search for `#1C1D20` and `#0e0e0e` in `src/portfolio.css` or customize specific CSS variables.

---

### 10. Animation & Physics Tweaks

#### Magnetic Buttons Force:
Any button with the `.magnetic` class will attract toward the cursor. You can control the pull strength directly with HTML attributes:
- `data-strength="25"`: How much the outer container moves (higher = more movement).
- `data-strength-text="15"`: How much the inner text layer moves.
- Big buttons (like the circular "Get in touch" button) use `data-strength="100"` and `data-strength-text="50"`.

#### Smooth Scroll Speed:
Open `src/hooks/useLenis.ts` to tweak scroll inertia:
```typescript
const lenis = new Lenis({
  duration: 1.15, // Duration of scroll glide in seconds
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  wheelMultiplier: 1.05, // Mouse wheel sensitivity
  touchMultiplier: 1.5,  // Touch device sensitivity
});
```

#### Page Transition Greetings:
To edit the multilingual welcome greetings that cycle on initial page load, open `src/components/LoadingScreen.tsx`:
```tsx
<h2 className="home-active home-active-first">Hello<div className="dot" /></h2>
<h2 className="home-active">Bonjour<div className="dot" /></h2>
<h2 className="home-active">Hola<div className="dot" /></h2>
<!-- Add or edit greetings here -->
```

---

## Building & Deployment

### Production Build

```bash
npm run build
```
This compiles the application into an optimized static bundle in the `dist/` directory.

### Deploying to Popular Hosts

#### Vercel
1. Push your repository to GitHub.
2. Import the repository on [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Output Directory: `dist`.
5. For single-page app (SPA) routing, add a `vercel.json` in the root:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

#### Netlify
1. Connect repository on [Netlify](https://netlify.com).
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Create a `public/_redirects` file containing:
```
/*    /index.html   200
```

#### GitHub Pages
Ensure your Vite config specifies the repository base path if not hosting on a custom root domain:
```typescript
// vite.config.ts
export default defineConfig({
  base: '/your-repo-name/',
  // ...
});
```

---

## License & Credits

- Inspired by the portfolio design of **Dennis Snellenberg**.
- Built with React, Vite, Tailwind CSS, and Lenis.
- Free for personal and commercial use to showcase your own portfolio.
