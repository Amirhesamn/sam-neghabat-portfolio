# sam-neghabat-portfolio

A personal site for **Sam Neghabat**, Senior Frontend Engineer — built as two distinct experiences:

1. **The portfolio** — an animation-heavy single page in a _Terminal Control-Room Noir_ aesthetic
   (warm near-black, off-white, a single phosphor-lime accent, CRT grain + scanlines, and a
   self-typing terminal identity).
2. **[My Journey](#-my-journey-the-side-scroller)** — a standalone, gentle 2D side-scrolling
   storybook game of a life from the hospital to today, with a sky that turns rainy through the
   working years and clears again.

Everything is built from scratch with no UI templates. All persona content lives in one editable
file per experience.

---

## Tech stack

- **Vite 8** + **React 19** + **TypeScript** (strict) — multi-page build (portfolio + journey)
- **Framer Motion** — all portfolio motion (scroll-driven `useScroll`/`useTransform`, springs, stagger)
- **Tailwind CSS v4** (`@tailwindcss/vite`) — theme tokens in `src/index.css`
- **Lenis** — buttery smooth scroll (auto-disabled under reduced motion)
- **react-intersection-observer** — scroll triggers
- **Self-hosted fonts** — Bricolage Grotesque · Hanken Grotesk · JetBrains Mono (portfolio),
  Varela Round · Nunito Sans (journey). No font CDN at runtime.
- The journey game is hand-built with **SVG + Canvas** and a single `requestAnimationFrame` engine
  (no game framework).

## Getting started

```bash
git clone https://github.com/Amirhesamn/sam-neghabat-portfolio.git
cd sam-neghabat-portfolio
npm install
npm run dev          # → http://localhost:5173  (journey at /journey.html)
```

| Script | What it does |
|--------|--------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check (`tsc -b`) + production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run fonts` | Re-download the self-hosted fonts (only if `src/*/fonts/` ever goes missing) |

## Portfolio highlights

| Section | What makes it tick |
|---------|--------------------|
| **Hero** | Self-typing terminal, a cursor-reactive particle constellation, drifting code fragments, and a 3D-tilt name |
| **Custom cursor** | A lerp-followed ring that expands over buttons and becomes a blinking caret over terminals |
| **Tech stack** | An IDE monitor that rewrites its code in the hovered language, spring proficiency bars, and an orbiting dependency graph |
| **Projects** | Clip-path image reveals, duotone→colour hover, and floating browser frames that auto-type each project's source |
| **Deploy** | A scroll-scrubbed CI/CD pipeline — stages light up and logs stream as you scroll |
| **Experience** | A sticky monitor that reacts per role: numbers re-count, logs stream, the backdrop mood-shifts colour |
| **Contact** | A working terminal-style contact form with inline validation |

All motion respects `prefers-reduced-motion` and uses GPU-friendly transforms. Accessibility:
semantic headings, visible focus rings, scroll-spy `aria-current`, skip link, and an accessible
mobile menu.

## 🌱 My Journey (the side-scroller)

A second, standalone page at **`/journey.html`** (also linked from the portfolio footer).

- **Controls:** `→` / scroll-down to walk forward · `←` / scroll-up to go back · drag on touch · or
  the on-screen `‹ ›` buttons.
- **Weather arc:** the sky blends smoothly from sunny childhood → overcast/rainy working years →
  clear again at "Today", driven entirely by scroll position.
- **Parallax** scene (hills < buildings < foreground), a character that ages newborn → adult, and
  roadside signs showing the date + age at each milestone.
- Respects `prefers-reduced-motion` (rain, bob and drift switch off; the walk still works).

## Customizing the content

- **Portfolio:** edit [`src/lib/data.ts`](src/lib/data.ts) — name, bio, skills, projects, roles, socials.
- **Journey:** edit [`src/journey/journey-data.ts`](src/journey/journey-data.ts) — each station's
  name, date, age, `mood` (0 = sunny … 1 = rainy), and character stage. Stations render in array
  order. Search for `EDIT` to replace placeholder school names and the birth year.

## Project structure

```
index.html              # portfolio entry
journey.html            # journey entry
src/
  main.tsx · App.tsx    # portfolio composition (+ Lenis)
  index.css             # Tailwind v4 theme tokens, overlays, keyframes
  lib/data.ts           # ← portfolio content
  components/           # Hero, TechStack, Projects, Pipeline, Experience, Contact, …
  hooks/                # useLenis, useReducedMotion, useFinePointer
  fonts/                # self-hosted portfolio fonts
  journey/
    Journey.tsx         # the side-scroller engine (camera, input, weather, HUD)
    journey-data.ts     # ← journey content
    art/                # SVG buildings, character stages, signs, decor
    Rain.tsx · *.css    # canvas rain + warm theme
    fonts/              # self-hosted journey fonts
public/                 # portrait + SVG project mockups
```

---

Built by Sam Neghabat. 🤖 Scaffolding and motion work paired with Claude Code.
