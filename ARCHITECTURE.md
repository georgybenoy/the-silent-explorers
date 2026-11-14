# The Silent Explorers: Architecture & Technical Specification

**Target Stack**: React 18/19, Vite 6, TypeScript 5, Tailwind CSS, GSAP 3 + ScrollTrigger, Three.js / React Three Fiber, Framer Motion  
**Deployment Target**: Vercel (Static Web Application)  
**Authoritative Guidelines**: Grounded in `react-best-practices` (Vite-adapted), `cinematic-storytelling`, and `web-design-guidelines`.

---

## 1. System Architecture Overview

The application is structured as a client-side Single Page Application (SPA) optimized for fast initial rendering, high-framerate scroll storytelling, and selective 3D WebGL scenes:

```
┌─────────────────────────────────────────────────────────────┐
│                    ROOT SHELL (App.tsx)                     │
│  - Navigation Header (Chapters & Scrubber Jump)             │
│  - Global State (Active Chapter, Active Artifact, A11y Mode)│
│  - Persistent Citations Drawer & Modal                      │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌───────────────────────────────┐     ┌───────────────────────────────┐
│     SCROLL NARRATIVE ENGINE   │     │    SELECTIVE 3D WEBGL STAGE   │
│  (GSAP ScrollTrigger Pinned)  │     │  (React Three Fiber / Canvas) │
├───────────────────────────────┤     ├───────────────────────────────┤
│ Chapter 1: The Silence        │────▶│ Space Camera Drift            │
│ Chapter 2: Beyond Earth       │────▶│ Earth-Moon Trajectory Arc     │
│ Chapter 3: Forgotten Worlds   │────▶│ Planetary Orrery View         │
│ Chapter 4: Meet the Explorers │────▶│ 3D Artifact Orbit & Hotspots  │
│ Chapter 5: The Final Chapter  │────▶│ Surface Sunset & Dusk Shaders │
│ Chapter 6: What Was Left      │────▶│ Regolith & Footprints View    │
│ Chapter 7: The Legacy         │────▶│ Deep Space Outward Vector     │
└───────────────────────────────┘     └───────────────────────────────┘
                               ▲                       ▲
                               └───────────┬───────────┘
                                           │
                              ┌────────────┴───────────┐
                              │  JSON DATA LAYER       │
                              │  - artifacts.json      │
                              │  - chapters.json       │
                              │  - citations.json      │
                              └────────────────────────┘
```

---

## 2. Directory Structure

```text
c:\Projects\NASA\
├── .agents/                    # Agent skills & customization
├── public/
│   ├── assets/
│   │   ├── models/             # Compressed .glb 3D models
│   │   ├── textures/           # WebP planetary maps (2048x1024)
│   │   ├── images/             # NASA archival photos (WebP)
│   │   └── audio/              # Ambient space drones & transmissions
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Chapter progress & mission links
│   │   │   ├── TimelineBar.tsx # Chronological scrubber (1969-2024)
│   │   │   ├── CitationsDrawer.tsx # NSSDCA catalog sources
│   │   │   └── Footer.tsx
│   │   ├── narrative/
│   │   │   ├── ChapterView.tsx # Pinned chapter wrapper
│   │   │   ├── TranscriptCard.tsx # Monospace historical transmission
│   │   │   ├── TelemetryHUD.tsx# Lat/Long, distance, velocity
│   │   │   └── StepCardFallback.tsx # Reduced-motion alternative
│   │   ├── museum/
│   │   │   ├── ArtifactCard.tsx# Museum grid item
│   │   │   ├── ArtifactDetail.tsx # Deep-dive modal / slideover
│   │   │   ├── InstrumentHotspots.tsx # Interactive specs
│   │   │   └── FilterTabs.tsx  # Moon / Mars / Beyond Mars
│   │   └── 3d/
│   │       ├── CanvasStage.tsx # Clamped DPR, Suspense-wrapped R3F
│   │       ├── CelestialBody.tsx # Moon/Mars/Ceres/Eros spheres
│   │       ├── ArtifactModel.tsx # GLTF loader with fallback
│   │       ├── CameraRig.tsx   # GSAP-driven camera controller
│   │       └── FallbackPhoto.tsx# WebGL error fallback
│   ├── data/
│   │   ├── artifacts.json      # Structured 8-artifact verified dataset
│   │   ├── chapters.json       # 7-chapter narrative copy & cues
│   │   └── citations.json      # NSSDCA Master Catalog references
│   ├── hooks/
│   │   ├── useScrollChapter.ts # GSAP ScrollTrigger active chapter sync
│   │   ├── useReducedMotion.ts # Media query hook for a11y
│   │   └── useWebGLSupport.ts  # GPU capability detection
│   ├── types/
│   │   ├── artifact.ts         # TypeScript schema for artifacts
│   │   └── chapter.ts          # TypeScript schema for chapters
│   ├── utils/
│   │   ├── formatting.ts       # Coordinate & date formatting
│   │   └── gsapSetup.ts        # GSAP + ScrollTrigger registration
│   ├── App.tsx                 # Root application composition
│   ├── main.tsx                # React root mount
│   └── index.css               # Tailwind & custom tokens
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── vercel.json
```

---

## 3. Component Boundaries & Responsibilities

### 3.1 Shell & Navigation (`Navbar.tsx`, `TimelineBar.tsx`)
* Tracks the active chapter index ($1 \dots 7$) and scroll progress ($0 \dots 1$).
* Listens to scrubber clicks and uses GSAP's `ScrollToPlugin` (or `window.scrollTo`) to glide to the targeted chapter or artifact.
* Contains high-contrast accessibility controls: toggle audio, toggle reduced-motion mode, and open the NASA Citations Drawer.

### 3.2 Narrative Scroller (`ChapterView.tsx`)
* Wraps each chapter's DOM content.
* Instantiates pinned ScrollTrigger timelines inside `@gsap/react`'s `useGSAP()` hook.
* Automatically registers triggers with `anticipatePin: 1` and cleans up all pins and spacers on unmount.

### 3.3 The Selective 3D Canvas (`CanvasStage.tsx`, `CameraRig.tsx`)
* Built with `@react-three/fiber` and `@react-three/drei`.
* **Resource Optimization**:
  * Set `dpr={[1, 2]}` to prevent 4K mobile thermal throttling.
  * Switch to `frameloop="demand"` when user is inspecting static text.
  * Dynamically interpolates camera position (`lerp`) when receiving scroll progress events.
* **Fallback Behavior**:
  * If `useWebGLSupport()` returns false, the canvas is replaced with `<FallbackPhoto />` rendering high-resolution NASA archival photographs without interrupting the story flow.

---

## 4. State Management & Data Flow

Following `react-best-practices`, the application avoids unnecessary global state re-renders:

```
┌────────────────────────────────────────────────────────┐
│                   Global React State                   │
│   - activeChapterId: number                            │
│   - activeArtifactId: string | null                    │
│   - isCitationDrawerOpen: boolean                      │
│   - isAudioMuted: boolean                              │
└──────────────────────────┬─────────────────────────────┘
                           │
    ┌──────────────────────┴──────────────────────┐
    ▼                                             ▼
React Component Tree                     Transient Animation Engine
(Rerenders on chapter change)             (NO React re-renders)
- DOM Text & Titles                       - progressRef (useRef)
- HUD Badges & Metadata                   - GSAP Tween values
- Transcript Modals                       - Three.js camera.position.set()
                                          - WebGL Uniform updates
```

* **Transient Values in `useRef`**: High-frequency values (scroll percentage, mouse coordinates, 3D camera matrices) are held in `useRef` and mutated directly inside GSAP / `useFrame` callbacks.
* **Unidirectional JSON Content**: Artifacts, chapters, and citations are stored in static JSON files loaded at build time, ensuring sub-second load times without runtime API latency.

---

## 5. Performance & Vite Bundle Configuration

In accordance with `react-best-practices`, bundle size and memory allocation are strictly controlled:

### 5.1 Manual Chunking (`vite.config.ts`)
```ts
// vite.config.ts excerpt
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['gsap', '@gsap/react', 'framer-motion'],
          'ui-vendor': ['lucide-react', 'clsx', 'tailwind-merge'],
        },
      },
    },
    target: 'es2020',
  },
});
```

### 5.2 Direct ESM Imports (No Barrel Overhead)
Icons and utilities are imported directly:
```tsx
import Rocket from 'lucide-react/dist/esm/icons/rocket';
import Satellite from 'lucide-react/dist/esm/icons/satellite';
```

---

## 6. Deployment Configuration (Vercel)

A minimalist static SPA `vercel.json` ensures fast CDN caching and proper routing:

```json
{
  "framework": "vite",
  "cleanUrls": true,
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```
