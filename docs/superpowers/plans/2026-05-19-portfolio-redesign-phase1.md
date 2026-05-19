# Portfolio Redesign — Phase 1: Foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lay the visual and data foundation — fonts, CSS design system, and all content data files — so every subsequent phase has a single source of truth to import from.

**Architecture:** `index.html` loads three Google Fonts. `src/index.css` defines all CSS custom properties, keyframes, and tile chrome utility classes (no JS needed). Five TypeScript data modules (`profile`, `projects`, `skills`, `experience`, `terminal`) export typed constants consumed by every component.

**Tech Stack:** Vite + React 19 + TypeScript + Tailwind v4 + CSS custom properties

---

## Task 1: Add Google Fonts to index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Open index.html and replace the title + add font preconnects + stylesheet**

Replace the entire `<head>` content with:

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>wilson@deck:~$ _</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
    rel="stylesheet"
  />
</head>
```

- [ ] **Step 2: Verify fonts load in browser**

Run `npm run dev`, open `http://localhost:5173`, open DevTools → Network → filter "fonts.gstatic.com". You should see three font requests (JetBrains Mono, Space Grotesk, Inter) returning 200.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Google Fonts (JetBrains Mono, Space Grotesk, Inter) to index.html"
```

---

## Task 2: Rewrite index.css — CSS custom properties + base reset

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace the entire contents of src/index.css with the CSS variable layer + base reset**

```css
@import "tailwindcss";

/* ─── Custom properties ─────────────────────────────────────── */
:root {
  --accent:        #2563eb;
  --accent-soft:   #2563eb28;
  --secondary:     #93c5fd;
  --bg:            #060912;
  --bg-tile:       rgba(13, 18, 40, 0.60);
  --ink:           #e8e4d8;
  --ink-dim:       rgba(232, 228, 216, 0.55);
  --ink-faint:     rgba(232, 228, 216, 0.22);
  --ok:            #7fc7a8;
  --warn:          #f0b56b;
  --bad:           #f47272;
  --border:        rgba(93, 141, 239, 0.18);
  --border-hi:     rgba(93, 141, 239, 0.40);
  --tile-radius:   14px;
  --tile-gap:      14px;
  --ff-mono:       'JetBrains Mono', monospace;
  --ff-display:    'Space Grotesk', sans-serif;
  --ff-body:       'Inter', sans-serif;
}

/* ─── Base reset ────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--ff-body);
  font-size: 13px;
  line-height: 1.55;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

body, #root {
  min-height: 100vh;
  background: var(--bg);
}

::selection { background: var(--accent); color: #fff; }

/* ─── Scrollbar ─────────────────────────────────────────────── */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border-hi); border-radius: 3px; }
```

- [ ] **Step 2: Verify dev server compiles without errors**

Run `npm run dev`. Terminal should show no errors. Page background should be `#060912`.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add CSS custom properties and base reset to index.css"
```

---

## Task 3: Add keyframes to index.css

**Files:**
- Modify: `src/index.css` (append)

- [ ] **Step 1: Append all keyframe definitions to src/index.css**

```css
/* ─── Keyframes ─────────────────────────────────────────────── */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1; }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes pcbPulse {
  0%, 100% { opacity: 0.10; }
  50%       { opacity: 0.35; }
}

@keyframes scanRoll {
  from { background-position: 0 0; }
  to   { background-position: 0 100vh; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes bootLine {
  from { opacity: 0; transform: translateX(-6px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes flash {
  0%   { box-shadow: 0 0 0 3px var(--accent); }
  100% { box-shadow: 0 0 0 0 transparent; }
}

@keyframes overclock {
  0%   { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}

@keyframes roverWalk {
  from { transform: translateX(-120px); }
  to   { transform: translateX(calc(100vw + 120px)); }
}

@keyframes sineWave {
  from { transform: translateX(0); }
  to   { transform: translateX(-200px); }
}
```

- [ ] **Step 2: Verify no CSS errors**

`npm run dev` — check browser console for CSS parse errors. None expected.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add keyframes (blink, pulse, marquee, pcbPulse, scanRoll, bootLine, flash, overclock, roverWalk, sineWave)"
```

---

## Task 4: Add atmosphere + overlay layer CSS to index.css

**Files:**
- Modify: `src/index.css` (append)

- [ ] **Step 1: Append atmosphere layer classes**

```css
/* ─── Atmosphere layers ─────────────────────────────────────── */
.atm-root {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.atm-stars {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.atm-pcb {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
}

.atm-scan {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.07) 2px,
    rgba(0, 0, 0, 0.07) 4px
  );
  animation: scanRoll 8s linear infinite;
  pointer-events: none;
}

.atm-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.55) 100%);
  pointer-events: none;
}

.atm-spotlight {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "feat: add atmosphere layer CSS classes (stars, pcb, scan, vignette, spotlight)"
```

---

## Task 5: Add bento grid + tile chrome CSS to index.css

**Files:**
- Modify: `src/index.css` (append)

- [ ] **Step 1: Append layout and tile chrome classes**

```css
/* ─── Layout ────────────────────────────────────────────────── */
.app {
  position: relative;
  z-index: 2;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

.bento {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 120px;
  grid-auto-flow: dense;
  gap: var(--tile-gap);
  padding: var(--tile-gap) 0;
}

/* ─── Tile chrome ───────────────────────────────────────────── */
.tile {
  position: relative;
  background: var(--bg-tile);
  backdrop-filter: blur(18px) saturate(1.4);
  -webkit-backdrop-filter: blur(18px) saturate(1.4);
  border: 1px solid var(--border);
  border-radius: var(--tile-radius);
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
  will-change: transform;
  cursor: default;
}

/* Inset highlight (top edge) */
.tile::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--tile-radius);
  background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

/* Corner crosshairs */
.tile::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--tile-radius);
  background:
    linear-gradient(var(--border-hi), var(--border-hi)) top    left  / 10px 1px no-repeat,
    linear-gradient(var(--border-hi), var(--border-hi)) top    left  / 1px 10px no-repeat,
    linear-gradient(var(--border-hi), var(--border-hi)) top    right / 10px 1px no-repeat,
    linear-gradient(var(--border-hi), var(--border-hi)) top    right / 1px 10px no-repeat,
    linear-gradient(var(--border-hi), var(--border-hi)) bottom left  / 10px 1px no-repeat,
    linear-gradient(var(--border-hi), var(--border-hi)) bottom left  / 1px 10px no-repeat,
    linear-gradient(var(--border-hi), var(--border-hi)) bottom right / 10px 1px no-repeat,
    linear-gradient(var(--border-hi), var(--border-hi)) bottom right / 1px 10px no-repeat;
  pointer-events: none;
  z-index: 2;
}

.tile:hover,
.tile.is-hover {
  border-color: var(--border-hi);
  box-shadow: 0 0 0 1px var(--accent-soft), 0 8px 32px rgba(37, 99, 235, 0.15);
}

.tile.is-drag {
  opacity: 0.45;
  box-shadow: 0 0 0 2px var(--accent);
}

.tile.is-over {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-soft);
}

.tile.is-flash {
  animation: flash 1.2s ease-out forwards;
}

/* ─── Tile grid column/row spans ────────────────────────────── */
.t-hero       { grid-column: span 7; grid-row: span 3; }
.t-status     { grid-column: span 3; grid-row: span 3; }
.t-avatar     { grid-column: span 2; grid-row: span 3; }
.t-current    { grid-column: span 6; grid-row: span 2; }
.t-heatmap    { grid-column: span 6; grid-row: span 2; }
.t-signal     { grid-column: span 12; grid-row: span 1; }
.t-term       { grid-column: span 7; grid-row: span 4; }
.t-skills     { grid-column: span 5; grid-row: span 4; }
.t-prj-1      { grid-column: span 4; grid-row: span 3; }
.t-prj-2      { grid-column: span 4; grid-row: span 3; }
.t-prj-3      { grid-column: span 4; grid-row: span 3; }
.t-experience { grid-column: span 12; grid-row: span 3; }
.t-contact    { grid-column: span 12; grid-row: span 2; }

/* ─── Tile drag handle ──────────────────────────────────────── */
.tile-handle {
  position: absolute;
  top: 8px;
  right: 10px;
  font-family: var(--ff-mono);
  font-size: 9px;
  color: var(--ink-faint);
  cursor: grab;
  letter-spacing: 0.05em;
  z-index: 10;
  user-select: none;
  padding: 2px 4px;
  border-radius: 4px;
  transition: color 0.15s, background 0.15s;
}
.tile-handle:hover { color: var(--ink-dim); background: var(--accent-soft); }
.tile-handle:active { cursor: grabbing; }

/* ─── Overclock mode ────────────────────────────────────────── */
.is-overclock .atm-scan { animation-duration: 2s; }
body.overclock { animation: overclock 4s linear infinite; }

/* ─── Reduced motion ────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

- [ ] **Step 2: Verify the grid spans look right**

`npm run dev` — open dev tools, inspect `.bento` — it should have `grid-template-columns: repeat(12, 1fr)`. The page will be mostly dark with no tiles yet; that's expected.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add bento grid layout, tile chrome, and tile span classes to index.css"
```

---

## Task 6: Add topbar, footer, boot overlay, and misc utility CSS to index.css

**Files:**
- Modify: `src/index.css` (append)

- [ ] **Step 1: Append topbar, footer, boot, and TileLabel CSS**

```css
/* ─── Topbar ────────────────────────────────────────────────── */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-family: var(--ff-mono);
  font-size: 10px;
  color: var(--ink-dim);
  border-bottom: 1px solid var(--border);
  margin-bottom: 4px;
  letter-spacing: 0.06em;
}
.tb-l, .tb-r { display: flex; align-items: center; gap: 10px; }
.tb-led {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--ok);
}
.tb-led::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ok);
  box-shadow: 0 0 8px var(--ok);
  animation: pulse 2s ease-in-out infinite;
}
.tb-sep { opacity: 0.35; }
.tb-brand { color: var(--ink); font-weight: 700; letter-spacing: 0.1em; }

/* ─── Footer ────────────────────────────────────────────────── */
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-family: var(--ff-mono);
  font-size: 9px;
  color: var(--ink-faint);
  border-top: 1px solid var(--border);
  margin-top: 8px;
  letter-spacing: 0.06em;
}

/* ─── Boot overlay ──────────────────────────────────────────── */
.boot-overlay {
  position: fixed;
  inset: 0;
  background: var(--bg);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  font-family: var(--ff-mono);
  font-size: 13px;
  line-height: 2;
  color: var(--ink-dim);
  transition: opacity 0.5s ease, visibility 0.5s ease;
}
.boot-overlay.is-done {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.boot-line {
  opacity: 0;
  animation: bootLine 0.25s ease forwards;
}
.boot-line .bt { color: var(--ink-faint); margin-right: 12px; }
.boot-line .bv { color: var(--ink); }
.boot-line .bv-ok { color: var(--ok); }
.boot-line .bv-accent { color: var(--accent); }

/* ─── TileLabel ─────────────────────────────────────────────── */
.tile-label {
  font-family: var(--ff-mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  color: var(--ink-faint);
  text-transform: uppercase;
  margin-bottom: 10px;
}

/* ─── Dot indicators ────────────────────────────────────────── */
.dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 6px;
  flex-shrink: 0;
}
.dot.ok   { background: var(--ok); box-shadow: 0 0 6px var(--ok); }
.dot.wip  { background: var(--warn); box-shadow: 0 0 6px var(--warn); }
.dot.todo { background: var(--ink-faint); }

/* ─── Tweaks panel toggle button ────────────────────────────── */
.tweaks-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 200;
  background: var(--bg-tile);
  border: 1px solid var(--border-hi);
  border-radius: 10px;
  padding: 8px 14px;
  font-family: var(--ff-mono);
  font-size: 10px;
  color: var(--ink-dim);
  cursor: pointer;
  letter-spacing: 0.08em;
  backdrop-filter: blur(12px);
  transition: color 0.15s, border-color 0.15s;
}
.tweaks-toggle:hover { color: var(--ink); border-color: var(--accent); }

/* ─── Tweaks panel ──────────────────────────────────────────── */
.tweaks-panel {
  position: fixed;
  bottom: 70px;
  right: 24px;
  z-index: 199;
  width: 240px;
  background: rgba(6, 9, 18, 0.92);
  border: 1px solid var(--border-hi);
  border-radius: 14px;
  padding: 16px;
  font-family: var(--ff-mono);
  font-size: 11px;
  color: var(--ink-dim);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 70vh;
  overflow-y: auto;
}
.tweaks-section {
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--border);
}
.tweaks-section:first-child { margin-top: 0; padding-top: 0; border-top: none; }
.tweak-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
}
.tweak-toggle {
  width: 28px;
  height: 16px;
  border-radius: 8px;
  border: 1px solid var(--border-hi);
  background: var(--bg);
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
  flex-shrink: 0;
}
.tweak-toggle.on { background: var(--accent); border-color: var(--accent); }
.tweak-toggle::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s;
}
.tweak-toggle.on::after { transform: translateX(12px); }
```

- [ ] **Step 2: Verify no parse errors**

`npm run dev` — check DevTools console for CSS errors.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add topbar, footer, boot overlay, TileLabel, dot, and tweaks panel CSS"
```

---

## Task 7: Rewrite src/data/profile.ts

**Files:**
- Modify: `src/data/profile.ts`

- [ ] **Step 1: Replace with real Wilson Gomez content**

```typescript
export const profile = {
  name: 'Wilson Gomez',
  handle: 'wagomez1230',
  roles: ['SWE Student', 'FGCU', 'Lab Assistant', 'DOT Intern'] as const,
  bio: 'Software engineering student with strong foundations in C++, Python, and embedded systems. Building circuit lab setups by day, writing code by night. Seeking a SWE internship to put it all to work.',
  degree: 'B.S. Software Engineering',
  school: 'Florida Gulf Coast University',
  schoolShort: 'FGCU',
  gradYear: 2027,
  location: 'Fort Myers, FL',
  coords: 'N 26°38′ · W 081°51′',
  status: 'OPEN TO INTERNSHIPS',
  stack: 'C · C++ · PY · JS',
  links: {
    email: 'wagomez1230@gmail.com',
    github: 'https://github.com/Wilsong1230',
    githubHandle: 'Wilsong1230',
    linkedin: 'https://linkedin.com/in/wagomez',
    resume: '/resume.pdf',
  },
  strip: [
    { label: 'DEGREE', value: 'B.S. SWE · 2027' },
    { label: 'STATUS', value: 'OPEN TO WORK', accent: true },
    { label: 'SCHOOL', value: 'FGCU · FL' },
    { label: 'STACK',  value: 'C · C++ · PY · JS' },
  ],
  awards: ['Bright Futures', "President's Gold", 'AICE Diploma'],
} as const
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/profile.ts
git commit -m "feat: replace placeholder profile.ts with real Wilson Gomez content"
```

---

## Task 8: Rewrite src/data/projects.ts

**Files:**
- Modify: `src/data/projects.ts`

- [ ] **Step 1: Delete the old Project type import and replace entire file**

The old `Project` type from `../types/project` will be removed — we define the shape here instead.

```typescript
export interface Project {
  id: string
  code: string
  kind: string
  name: string
  desc: string
  stack: string[]
  repoUrl: string
  preview: 'rover' | 'cpe' | 'counter'
}

export const projects: Project[] = [
  {
    id: 'maze',
    code: '01',
    kind: 'EMBEDDED · ROBOTICS',
    name: 'Autonomous Maze Rover',
    desc: 'Arduino rover that navigates mazes autonomously via servo-mounted HC-SR04 ultrasonic sensing and a wall-following state machine (MOVING → CHECK_TURN → TURN_LEFT/TURN_RIGHT → STUCK/FINISH). 28BYJ-48 stepper motors, ULN2003 drivers, non-blocking control loop.',
    stack: ['Arduino', 'C++', 'AccelStepper', 'Ultrasonic'],
    repoUrl: 'https://github.com/Wilsong1230/sillyMazeBot',
    preview: 'rover',
  },
  {
    id: 'cpe',
    code: '02',
    kind: 'PYTHON · DESKTOP',
    name: 'Control Point Finder',
    desc: 'Python desktop app — drop in a folder of engineering PDF plan sets, it finds, parses, deduplicates, and exports all survey control points to CSV ready for surveying software.',
    stack: ['Python', 'PDF Parsing', 'Desktop'],
    repoUrl: 'https://github.com/Wilsong1230/controlPointFinder',
    preview: 'cpe',
  },
  {
    id: 'counter',
    code: '03',
    kind: 'PYTHON · CV',
    name: 'Car Counter',
    desc: 'Camera-based vehicle counter with real-time detection. Personalized with detailed car info tracking.',
    stack: ['Python', 'OpenCV', 'Web'],
    repoUrl: 'https://github.com/Wilsong1230/Car_counting_cam',
    preview: 'counter',
  },
]
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors. (If there are errors about the old `Project` type being imported elsewhere, those will be fixed in later phases when those files are rewritten.)

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: replace placeholder projects.ts with real Autonomous Maze Rover, Control Point Finder, Car Counter"
```

---

## Task 9: Rewrite src/data/skills.ts

**Files:**
- Modify: `src/data/skills.ts`

- [ ] **Step 1: Replace entire file**

```typescript
export interface SkillItem {
  name: string
  value: number  // 0–100, used for tick-meter width
}

export interface SkillGroup {
  group: string
  items: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    group: 'Languages',
    items: [
      { name: 'C/C++',      value: 90 },
      { name: 'Python',     value: 85 },
      { name: 'JavaScript', value: 75 },
    ],
  },
  {
    group: 'Embedded',
    items: [
      { name: 'Arduino/AVR',           value: 88 },
      { name: 'AVR Assembly',          value: 70 },
      { name: 'Digital/Analog Electronics', value: 80 },
    ],
  },
  {
    group: 'Concepts',
    items: [
      { name: 'DSA',                  value: 82 },
      { name: 'Software Engineering', value: 85 },
      { name: 'Computer Organization', value: 78 },
    ],
  },
  {
    group: 'Tools',
    items: [
      { name: 'Git',         value: 88 },
      { name: 'Linux',       value: 80 },
      { name: 'Arduino IDE', value: 90 },
    ],
  },
]
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/data/skills.ts
git commit -m "feat: replace placeholder skills.ts with real resume skills (4 groups)"
```

---

## Task 10: Create src/data/experience.ts

**Files:**
- Create: `src/data/experience.ts`

- [ ] **Step 1: Create the file**

```typescript
export interface ExperienceItem {
  date: string
  role: string
  org: string
  tags: string[]
  bullets?: string[]
}

export const experience: ExperienceItem[] = [
  {
    date: 'Oct 2025 – Present',
    role: 'Lab Assistant',
    org: 'FGCU Dept. of Computer & Software Engineering',
    tags: ['EMBEDDED', 'LAB'],
    bullets: [
      'Set up and maintain circuits, logic gate boards, motor driver rigs, and 3D printing workstations',
      'Support undergraduate labs in digital electronics and embedded systems coursework',
    ],
  },
  {
    date: 'Jan 2025 – Present',
    role: 'Project Management Intern',
    org: 'Lee County Department of Transportation',
    tags: ['OPS', 'DOT'],
    bullets: [
      'Track project milestones, maintain documentation, and coordinate across engineering teams',
      'Attend project meetings and support delivery of infrastructure improvement initiatives',
    ],
  },
  {
    date: 'Aug 2023 – May 2027',
    role: 'B.S. Software Engineering',
    org: 'Florida Gulf Coast University',
    tags: ['STUDENT'],
    bullets: [
      'Relevant coursework: Data Structures & Algorithms, Computer Organization, Software Engineering',
      'Bright Futures Scholar · President\'s Gold Award · AICE Diploma',
    ],
  },
]
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/data/experience.ts
git commit -m "feat: create experience.ts with Lab Assistant, DOT Intern, and FGCU entries"
```

---

## Task 11: Create src/data/terminal.ts

**Files:**
- Create: `src/data/terminal.ts`

- [ ] **Step 1: Create the file**

```typescript
export const TERM_BIO = `Wilson Gomez — Software Engineering Student, Lab Assistant, DOT Intern.
Embedded systems + Python tools + low-level systems work. Currently building
Arduino rovers, extracting survey control points from PDFs, and counting cars.`

export interface TermProject {
  id: string
  name: string
  tag: string
  desc: string
  stack: string[]
}

export const TERM_PROJECTS: TermProject[] = [
  {
    id: 'maze',
    name: 'Autonomous Maze Rover',
    tag: 'Embedded / Robotics',
    desc: 'Arduino rover navigating mazes via HC-SR04 ultrasonic sensing and a wall-following state machine. 28BYJ-48 stepper motors, ULN2003 drivers, non-blocking loop.',
    stack: ['Arduino', 'C++', 'AccelStepper', 'Ultrasonic'],
  },
  {
    id: 'cpe',
    name: 'Control Point Finder',
    tag: 'Python / Desktop',
    desc: 'Drop in a folder of engineering PDF plan sets — it finds, parses, deduplicates, and exports all survey control points to CSV.',
    stack: ['Python', 'PDF Parsing', 'Desktop'],
  },
  {
    id: 'counter',
    name: 'Car Counter',
    tag: 'Python / CV',
    desc: 'Camera-based vehicle counter with real-time detection and detailed car info tracking.',
    stack: ['Python', 'OpenCV', 'Web'],
  },
]

export interface TermSkillGroup {
  group: string
  items: string[]
}

export const TERM_SKILLS: TermSkillGroup[] = [
  { group: 'Languages', items: ['C', 'C++', 'Python', 'JavaScript'] },
  { group: 'Embedded',  items: ['Arduino/AVR', 'AVR Assembly', 'Digital/Analog Electronics'] },
  { group: 'Concepts',  items: ['DSA', 'Software Engineering', 'Computer Organization'] },
  { group: 'Tools',     items: ['Git', 'Linux', 'Arduino IDE'] },
]

export const TERM_CONTACT = [
  { k: 'email',    v: 'wagomez1230@gmail.com' },
  { k: 'github',   v: 'github.com/Wilsong1230' },
  { k: 'linkedin', v: 'linkedin.com/in/wagomez' },
  { k: 'location', v: 'Fort Myers, FL — UTC-5' },
]

export const MORSE: Record<string, string> = {
  a:'.-', b:'-...', c:'-.-.', d:'-..', e:'.', f:'..-.', g:'--.', h:'....', i:'..', j:'.---',
  k:'-.-', l:'.-..', m:'--', n:'-.', o:'---', p:'.--.', q:'--.-', r:'.-.', s:'...', t:'-',
  u:'..-', v:'...-', w:'.--', x:'-..-', y:'-.--', z:'--..',
  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-',
  '5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',
  ' ':'/',
}

export function toMorse(s: string): string {
  return s.toLowerCase().split('').map(c => MORSE[c] ?? '').filter(Boolean).join(' ')
}

export const FILE_TREE = `~/wilson
├── projects/
│   ├── autonomous-maze-rover/   # embedded · Arduino
│   ├── control-point-finder/    # Python · PDF
│   └── car-counter/             # Python · CV
├── skills/
│   ├── c
│   ├── cpp
│   ├── python
│   └── embedded/  (arduino, avr-assembly)
├── now/
│   └── maze-rover-v2.md
└── contact.vcf`

export const EASTER_EGGS: Record<string, string> = {
  'sudo make me a sandwich': 'access denied. you are not in the sudoers file. this incident will be reported.',
  'sudo': 'with great power comes great responsibility.',
  'ls': 'hero  current  terminal  projects  skills  status  contact',
  'pwd': '/home/wilson/portfolio',
  'date': new Date().toString(),
  'uname': 'DeckOS 1.0.0-instrumentation x86_64',
  'cowsay': '< moo, hire wilson >\n  \\\n   \\\n     ^__^\n     (oo)\\_______\n     (__)\\       )\\/\\\n         ||----w |\n         ||     ||',
  'rm -rf /': 'permission denied. nice try.',
  'exit': 'you cannot leave. you live here now.',
  'vim': 'caught in vim. send help.',
  'emacs': 'a great operating system — lacks a decent editor though.',
  ':q': 'this is not vim. type "help".',
  'hello': 'hi 👋  — type "help" to get started.',
  'hi': 'hello — type "help" to get started.',
}

export const BOOT_LINES = [
  { t: '0.001', v: 'DeckOS 1.0.0 — initializing…',                              cls: 'bv-accent' },
  { t: '0.058', v: 'cpu: ARM Cortex-M · cores: 4 · freq: 3.2 GHz',              cls: '' },
  { t: '0.112', v: 'memory: 16 GB · swap: ok',                                   cls: '' },
  { t: '0.187', v: 'mounting /dev/wilson … ok',                                  cls: 'bv-ok' },
  { t: '0.241', v: 'loading profile: Wilson Gomez (wagomez1230)',                 cls: '' },
  { t: '0.298', v: 'degree: B.S. Software Engineering · FGCU · 2027',            cls: '' },
  { t: '0.354', v: 'experience: Lab Assistant · Lee County DOT Intern',          cls: '' },
  { t: '0.412', v: 'starfield: ok · pcb traces: ok · scanlines: ok',            cls: 'bv-ok' },
  { t: '0.478', v: 'projects: 3 loaded  [maze-rover] [ctrl-point] [car-counter]', cls: '' },
  { t: '0.534', v: 'skills: C · C++ · Python · Arduino/AVR · JavaScript',       cls: '' },
  { t: '0.601', v: 'terminal: handshake complete · type "help" to begin',        cls: 'bv-ok' },
  { t: '0.668', v: 'atmosphere: parallax ok · vignette ok · spotlight ok',      cls: '' },
  { t: '0.724', v: "awards: Bright Futures · President's Gold · AICE Diploma",  cls: '' },
  { t: '0.812', v: 'status: OPEN TO INTERNSHIPS — SUMMER 2026',                 cls: 'bv-accent' },
  { t: '0.910', v: 'all systems nominal.',                                        cls: 'bv-ok' },
  { t: '0.980', v: 'welcome.',                                                    cls: 'bv-accent' },
]
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/data/terminal.ts
git commit -m "feat: create terminal.ts — bio, projects, skills, morse, easter eggs, boot lines"
```

---

## Phase 1 Complete

After Task 11 passes `npx tsc --noEmit` cleanly:

```bash
npm run build
```

Expected: build succeeds. The page will still show the old App.tsx content — that's fine. The foundation (fonts, CSS system, all data) is in place for Phase 2.
