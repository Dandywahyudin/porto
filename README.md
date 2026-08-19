# ⚡ Dandy Wahyudin — Personal Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

A modern, high-contrast, neo-brutalist personal portfolio website engineered with **Next.js App Router**, **React 19**, **Tailwind CSS v4**, and custom canvas-based interactive animations.

[Live Demo](#) • [Features](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Contact](#-contact--socials)

</div>

---

## 📸 Preview & Highlights

- **Design Philosophy**: Neo-brutalism meets structural minimalism with bold borders, hard offset drop shadows, tight typography, and dynamic micro-animations.
- **Theme Support**: First-class support for both **Dark Mode** (OLED `#0e0e11`) and **Light Mode** (`#f8f8fa`).
- **Responsive**: Fully optimized for mobile, tablet, and ultra-wide desktop viewports.

---

## ✨ Key Features

### 🎬 1. Cinematic Preloader Intro
- Smooth text morphing animation from brand monogram `DW.` into full name `Dandy Wahyudin.`.
- Split curtain double-door opening transition with cubic-bezier easing before revealing the website.

### 🌌 2. 3D Interactive Starfield Canvas (Hero Section)
- GPU-accelerated 3D canvas particle warp with depth perspective ($z$-axis).
- Cursor magnetic parallax, automatic gentle drift on mobile touch screens, and high-DPI retina display scaling.

### ✨ 3. Ambient Particles Background (Body Sections)
- Lightweight canvas particles with mouse magnetism and cursor repulsion across the About, Certificate, Project, and Contact sections.
- Intelligent theme detection adjusting particle luminescence in dark and light modes.

### 🔤 4. Dynamic Typography Effects
- **BlurText (Hero Headline)**: Sequential word-by-word blur-to-clear focus reveal with continuous auto-looping.
- **Text Generate Effect (Hero Bio)**: Staggered typing and blur-clearing word materialization.

### 🧭 5. Collapsible Sidebar & Navigation
- **Desktop Sidebar**: Expandable and collapsible slim-rail sidebar with smooth cubic-bezier width transition, interactive vertical indicator dots, and hover tooltips.
- **Mobile Bottom Bar**: Floating glassmorphic navigation bar optimized for one-handed smartphone ergonomics.

### 📜 6. Certificate Showcase & Modal Portal
- Showcase of official credentials (VSGA Kominfo, Google IT Support Professional, Kemnaker RI, Alkademi Bootcamp).
- Full-screen React Portal modal viewer with escape key listener, backdrop dismissal, and credential details.

### 💼 7. Project Portfolio Cards
- Featured projects with tags, metrics, live indicators, and neo-brutalist hover states.

### 📬 8. Interactive Contact Section
- Integrated contact form with validation, success state feedback, and direct contact channels.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Effects & Components** | Custom Canvas (Starfield, Particles), Shadcn / Aceternity / React Bits |
| **Package Manager** | `npm` / `pnpm` / `yarn` / `bun` |

---

## 📂 Project Structure

```text
porto/
├── app/
│   ├── favicon.ico
│   ├── globals.css         # Tailwind CSS v4 & theme variables
│   ├── layout.tsx          # Root layout with Geist font & metadata
│   └── page.tsx            # Main page with section observers & parallax
├── components/
│   ├── ui/
│   │   ├── blur-text.tsx             # Sequential word-by-word BlurText
│   │   ├── particles.tsx             # Canvas ambient particles
│   │   ├── starfield.tsx             # 3D interactive starfield canvas
│   │   └── text-generate-effect.tsx  # Staggered blur-to-clear text effect
│   ├── about-section.tsx             # Bio & technical core skills
│   ├── certificate-section.tsx       # Certificate cards & portal modal
│   ├── contact-section.tsx           # Contact form & social channels
│   ├── hero-section.tsx              # Hero headline, bio, photo & CTA
│   ├── preloader.tsx                 # Cinematic doors intro preloader
│   ├── project-section.tsx           # Featured project showcase
│   ├── site-nav.tsx                  # Collapsible desktop sidebar & mobile nav
│   └── top-nav.tsx                   # Top bar with status & theme toggle
├── lib/
│   └── utils.ts                      # Class merging utility helper
├── public/
│   ├── certificates/                 # Certificate webp assets
│   └── gambar/                       # Profile & hero image assets
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js 18+** installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dandywahyudin/portfolio.git
   cd portfolio/porto
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Generate optimized production bundle
npm run build

# Start production server
npm run start
```

---

## 📬 Contact & Socials

- **Website**: [dandywahyudin.dev](#)
- **Email**: [dandywahyudin19@gmail.com](mailto:dandywahyudin19@gmail.com)
- **LinkedIn**: [linkedin.com/in/dandywahyudin](https://linkedin.com/in/dandywahyudin)
- **GitHub**: [github.com/dandywahyudin](https://github.com/dandywahyudin)
- **Instagram**: [@dandywahyudinn](https://instagram.com/dandywahyudinn)

---

<div align="center">
  <sub>Crafted with passion by <b>Dandy Wahyudin</b> • © 2026 DW. All rights reserved.</sub>
</div>
