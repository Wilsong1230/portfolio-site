# Portfolio Redesign — Design Spec
**Date:** 2026-05-19  
**Status:** Approved

---

## Concept

"DeckOS" — the portfolio as an operating system dashboard. Every section is a draggable bento tile with glass chrome. A live terminal accepts commands. PCB trace atmosphere, CRT scanlines, and a parallax starfield run behind everything. The aesthetic sits at the intersection of embedded engineering hardware and modern SaaS dashboards — unique in the SWE portfolio space.

The existing `example/` directory contains a fully working reference implementation (React 18 + Babel, plain CSS). We are rebuilding this in the current stack (React 19 + TypeScript + Tailwind v4 + Vite) with Wilson's real content.

---

## Visual Language

| Property | Value |
|---|---|
| Background | `#060912` (near-black navy) |
| Primary accent | `#2563eb` (royal blue) |
| Secondary accent | `#93c5fd` (sky blue) |
| OK / success | `#7fc7a8` (green) |
| Warn | `#f0b56b` (amber) |
| Bad / error | `#f47272` (red) |
| Type — mono | JetBrains Mono |
| Type — display | Space Grotesk |
| Type — body | Inter |
| Tile radius | 14px |
| Tile gap | 14px |

**Atmosphere layers (fixed, behind everything):**
1. Parallax starfield — canvas, mouse-parallax depth
2. PCB traces — SVG, navy blue, pulsing vias, L-bends and IC pad clusters
3. CRT scanlines — repeating-linear-gradient overlay
4. Vignette — radial gradient darkening at edges

**Tile chrome:** glass background (`rgba(13,18,40,0.60)` + `backdrop-filter: blur`), 1px border, inset highlight, corner crosshairs (::before / ::after), lift + outer glow on hover, 3D tilt on mouse move.

**Palette presets (switchable via terminal):** navy (default), deep, signal, amber, phosphor.

---

## Bento Grid Layout

12-column grid, `grid-auto-rows: 120px`, `grid-auto-flow: dense`.

| Tile | Columns | Rows | Content |
|---|---|---|---|
| `hero` | 7 | 3 | Name, roles, bio, strip cells, grid overlay |
| `status` | 3 | 3 | Live clock, system status rows |
| `avatar` | 2 | 3 | Photo placeholder with crosshair frame |
| `current` | 6 | 2 | Active project progress + task log |
| `heatmap` | 6 | 2 | GitHub commit activity heatmap |
| `signal` | 12 | 1 | Animated sine wave + scrolling marquee |
| `term` | 7 | 4 | Interactive terminal |
| `skills` | 5 | 4 | Tick-meter skill grid (4 groups) |
| `prj-1` | 4 | 3 | Project card — Autonomous Maze Rover |
| `prj-2` | 4 | 3 | Project card — Control Point Finder |
| `prj-3` | 4 | 3 | Project card — Car Counter |
| `experience` | 12 | 3 | Timeline — 2 jobs + education |
| `contact` | 12 | 2 | 4-up contact grid |

Tiles are **drag-rearrangeable** — order persists to `localStorage`.

---

## Content

### Hero
- **Name:** Wilson Gomez
- **Roles:** SWE Student · FGCU · Lab Assistant · DOT Intern
- **Bio:** "Software engineering student with strong foundations in C++, Python, and embedded systems. Building circuit lab setups by day, writing code by night. Seeking a SWE internship to put it all to work."
- **Strip:** DEGREE: B.S. SWE · 2027 / STATUS: OPEN TO WORK / SCHOOL: FGCU · FL / STACK: C · C++ · PY · JS
- **Coordinates:** N 26°38′ · W 081°51′ (Fort Myers)

### Skills (from resume)
| Group | Skills |
|---|---|
| Languages | C/C++ · Python · JavaScript |
| Embedded | Arduino/AVR · AVR Assembly · Digital/Analog Electronics |
| Concepts | DSA · Software Engineering · Computer Organization |
| Tools | Git · Linux · Arduino IDE |

### Projects

**#01 — Autonomous Maze Rover** (`sillyMazeBot`)  
Arduino rover that navigates mazes autonomously via servo-mounted HC-SR04 ultrasonic sensing and a wall-following state machine (MOVING → CHECK_TURN → TURN_LEFT/TURN_RIGHT → STUCK/FINISH). 28BYJ-48 stepper motors, ULN2003 drivers, non-blocking control loop.  
Stack: `Arduino · C++ · AccelStepper · Ultrasonic`  
Preview: Top-down maze with animated rover + sensor sweep arc + state label.

**#02 — Control Point Finder** (`controlPointFinder`)  
Python desktop app — drop in a folder of engineering PDF plan sets, it finds, parses, deduplicates, and exports all survey control points to CSV ready for surveying software.  
Stack: `Python · PDF Parsing · Desktop`  
Preview: App window mockup with drag-drop zone, parsed results list, Export CSV button.

**#03 — Car Counter** (`Car_counting_cam`)  
Camera-based vehicle counter with real-time detection. Personalized with detailed car info tracking.  
Stack: `Python · OpenCV · Web`  
Preview: Traffic cam view with YOLOv8-style bounding boxes and live count readout.

### Experience
| Date | Role | Org | Tag |
|---|---|---|---|
| Oct 2025 – now | Lab Assistant | FGCU Dept. of Computer & Software Engineering | EMBEDDED · LAB |
| Jan 2025 – now | Project Management Intern | Lee County DOT | OPS · DOT |
| Aug 2023 – | B.S. Software Engineering | Florida Gulf Coast University (May 2027) | STUDENT |

### Contact
- Email: wagomez1230@gmail.com
- GitHub: github.com/Wilsong1230
- LinkedIn: linkedin.com/in/wagomez
- Resume: /resume.pdf

---

## Terminal

Interactive shell with full command parsing, command history (↑/↓), and AI-backed Q&A (`ask <question>`).

**Commands:** `help · whoami · projects · open <id> · skills · contact · resume · awards · goto <tile> · theme <name> · snake · matrix · morse <text> · speedrun · overclock · clear · ask <q>`

**Easter eggs:** Konami code → overclock mode, `matrix` → matrix rain overlay, `snake` → playable snake game, `speedrun` → auto-tour, ASCII rover drives across bottom of page, boot sequence on load.

**Project IDs:** `maze` · `cpe` · `counter`

---

## Atmosphere & Effects

- Parallax starfield canvas (mouse-reactive depth layers)
- PCB traces SVG (blue, pulsing vias, deterministic layout via seeded RNG)
- CRT scanlines + rolling scan animation
- Vignette
- Shooting stars (periodic, configurable)
- Mouse spotlight (radial gradient follows cursor)
- 3D tile tilt on hover (perspective transform)
- Boot overlay on first load (DeckOS boot lines)
- Tweaks panel (sidebar toggles for all atmosphere layers, palette picker, font scale, audio)
- Overclock mode (faster animations, hue shift)
- Reduced-motion respect (`prefers-reduced-motion`)
- **Audio:** ambient electrical hum (Web Audio API oscillator, toggleable) + mechanical key click sounds on every terminal keystroke and Enter. Both off by default, enabled via Tweaks panel. **Core feature — do not skip.**

---

## Boot Screen

On every page load, a full-viewport boot overlay appears over the bento grid and fades out after ~1.8s. Styled as a terminal boot log:

```
[ 0.001 ] DeckOS 1.0.0 — initializing…
[ 0.058 ] cpu: ARM Cortex-M · cores: 4 · freq: 3.2 GHz
[ 0.112 ] memory: 16 GB · swap: ok
[ 0.187 ] mounting /dev/wilson … ok
[ 0.241 ] loading profile: Wilson Gomez (wagomez1230)
[ 0.298 ] degree: B.S. Software Engineering · FGCU · 2027
[ 0.354 ] experience: Lab Assistant · Lee County DOT Intern
[ 0.412 ] starfield: ok · pcb traces: ok · scanlines: ok
[ 0.478 ] projects: 3 loaded  [maze-rover] [ctrl-point] [car-counter]
[ 0.534 ] skills: C · C++ · Python · Arduino/AVR · JavaScript
[ 0.601 ] terminal: handshake complete · type "help" to begin
[ 0.668 ] atmosphere: parallax ok · vignette ok · spotlight ok
[ 0.724 ] awards: Bright Futures · Presidents Gold · AICE Diploma
[ 0.812 ] status: OPEN TO INTERNSHIPS — SUMMER 2026
[ 0.910 ] all systems nominal.
[ 0.980 ] welcome.
```

Each line fades in sequentially (staggered CSS animation delays, ~80ms apart). The overlay then fades out with `visibility: hidden` so it doesn't block interaction. The bento grid is visible underneath but becomes interactive only after the boot completes.

The browser tab title also animates during load — types out `wilson@deck:~$ _` character by character, then blinks the caret indefinitely.

**This is a core feature — do not skip.**

---

## Project Modals

Each project card has an "OPEN ↗" button. Clicking opens a full-screen modal (blurred backdrop) with:
- Left column: title, description, bullet highlights, tech chips
- Right column: schematic/screenshot SVG, metric cards

**Deferred** — modal content (detailed write-ups, schematics) will be filled in after the core site is built.

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | React 19 + TypeScript | Keep existing stack |
| Styling | Tailwind v4 + CSS variables | Tailwind for layout; CSS vars for theming |
| Build | Vite | Keep existing |
| Fonts | Google Fonts (JetBrains Mono, Space Grotesk, Inter) | Load in index.html |
| Icons | react-icons | Already installed |
| GitHub activity | react-github-calendar | Already installed — replaces fake heatmap |
| Animation | CSS + requestAnimationFrame | No animation library needed |
| State | React useState/useRef/useEffect | No external state library |
| Persistence | localStorage | Tile order + tweaks |

The `example/` directory JSX files serve as the authoritative reference for behaviour and component logic. Port them to TSX, split into `src/components/` modules, replace plain CSS with Tailwind + CSS variables.

---

## File Structure (target)

```
src/
  components/
    layout/
      Topbar.tsx
      Footer.tsx
    atmosphere/
      Starfield.tsx       # canvas parallax
      PCBTraces.tsx       # svg traces
      Scanlines.tsx
      Vignette.tsx
      ShootingStars.tsx
      Spotlight.tsx
      AsciiRover.tsx
    tiles/
      HeroTile.tsx
      StatusTile.tsx
      AvatarTile.tsx
      CurrentTile.tsx
      HeatmapTile.tsx
      SignalTile.tsx
      SkillsTile.tsx
      ProjectTile.tsx
      ExperienceTile.tsx
      ContactTile.tsx
    terminal/
      Terminal.tsx
      TermRow.tsx
    modals/
      ProjectModal.tsx
    ui/
      TileLabel.tsx
      TweaksPanel.tsx
    overlays/
      MatrixOverlay.tsx
      SnakeGame.tsx
  data/
    profile.ts            # personal info, bio, strip cells
    projects.ts           # 3 projects with full modal content
    skills.ts             # 4 groups with values
    experience.ts         # timeline items
    terminal.ts           # commands, bio, easter eggs
  hooks/
    useTweaks.ts          # accent/palette/toggles with localStorage
    useTilt.ts            # 3D mouse tilt per tile
    useDragOrder.ts       # tile drag-rearrange with localStorage
  App.tsx
  index.css               # CSS variables, base styles, keyframes
```

---

## Deferred / Out of Scope

- Project modal detailed write-ups (flagged by user — fill in later)
- Real GitHub heatmap data (react-github-calendar handles this)
- Mobile layout (responsive breakpoints — implement after desktop is solid)
