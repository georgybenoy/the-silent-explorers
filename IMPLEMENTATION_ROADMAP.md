# The Silent Explorers: Implementation Roadmap

**Hackathon Strategy**: Build outward from a rock-solid, verifiable core. Deliver a fully working, scientifically accurate MVP first, then progressively layer selective 3D visual enhancements and audio polish.

---

## 1. Development Phases Overview

```
┌────────────────────────────────────────────────────────┐
│ Phase 1: Foundation & Verified Data Layer              │
│ (Vite, Tailwind, TypeScript, artifacts.json, citations)│
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 2: Shell & Hybrid Navigation Architecture        │
│ (Navbar, Timeline Scrubber, Chapter Routing, HUD)      │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 3: The 7-Chapter Narrative Engine                │
│ (GSAP ScrollTrigger, Pinned Chapters, Transcripts)     │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 4: The Artifact Museum (Chapter 4 Deep Dive)     │
│ (8 Artifact Cards, Instrument Hotspots, Filters)       │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 5: Selective 3D & Archival Media Integration     │
│ (Three.js Celestial Spheres, Orbit Stage, Fallbacks)   │
└──────────────────────────┬─────────────────────────────┘
                           ▼
┌────────────────────────────────────────────────────────┐
│ Phase 6: Accessibility, Performance & Vercel Deploy   │
│ (WCAG AA, Reduced Motion, 60fps Audits, Live Deploy)   │
└────────────────────────────────────────────────────────┘
```

---

## 2. Detailed Phase Breakdown

### Phase 1: Foundation & Data Layer (Day 1 - Morning)
* **Objective**: Establish the React + Vite repository, install clean dependencies, and populate the verified JSON datasets.
* **Deliverables**:
  * Clean Vite + React 18/19 + TypeScript project initialized.
  * Tailwind CSS configured with tokens from `DESIGN_SYSTEM.md`.
  * `src/data/artifacts.json` populated with all 8 verified artifact records from `ARTIFACT_SCHEMA.md`.
  * `src/data/chapters.json` and `src/data/citations.json` created.
* **Exit Criteria**: `npm run build` succeeds cleanly with zero TypeScript errors.

### Phase 2: Navigation & Shell Layout (Day 1 - Afternoon)
* **Objective**: Build the application shell, hybrid navigation system, and restrained HUD components.
* **Deliverables**:
  * `Navbar.tsx`: Minimalist header with mission indicator, audio toggle, and chapter jump menu.
  * `TimelineBar.tsx`: Chronological timeline scrubber (1969 to 2024+) with hover tooltips and direct scroll-to triggers.
  * `CitationsDrawer.tsx`: Slide-out panel rendering official NSSDCA links and NASA image credits.
  * `TelemetryHUD.tsx`: Monospaced coordinate and mission status overlays.
* **Exit Criteria**: Clicking any year or chapter in the scrubber updates global state and smoothly navigates the viewport.

### Phase 3: The 7-Chapter Narrative Engine (Day 1 - Evening)
* **Objective**: Build the scroll-driven documentary flow across all 7 chapters.
* **Deliverables**:
  * GSAP and ScrollTrigger integration scoped inside `useGSAP()` hooks.
  * Chapter 1 (*The Silence*): High-contrast prologue with atmospheric typography.
  * Chapter 2 (*Beyond Earth*): Escape velocity and translunar/trans-Mars trajectory story.
  * Chapter 3 (*The Forgotten Worlds*): Moon, Mars, Asteroid Belt planetary overview.
  * Chapter 5 (*The Final Chapter*): Emotional end-of-mission accounts with distinct `TranscriptCard` historical blocks.
  * Chapter 6 (*What They Left Behind*): Retroreflectors, regolith footprints, and scientific milestones.
  * Chapter 7 (*The Legacy*): Artemis Accords, space archaeology, and the future.
* **Exit Criteria**: Smooth pinned scroll sequence from Chapter 1 to 7 without layout jumping or memory leaks.

### Phase 4: The Artifact Museum (Chapter 4) (Day 2 - Morning)
* **Objective**: Implement the deep-dive digital museum for the 8 initial artifacts.
* **Deliverables**:
  * Destination filter tabs: **All**, **Moon**, **Mars**, **Beyond Mars**.
  * `ArtifactCard.tsx`: Grid item with mission badge, coordinates, and status indicator.
  * `ArtifactDetail.tsx`: Interactive modal / slideover with physical specs, instruments, and verified historical records.
  * Clear visual badging distinguishing creative narrative from official NASA transmissions.
* **Exit Criteria**: All 8 artifacts are fully interactive, searchable, and display complete NSSDCA source citations.

### Phase 5: Selective 3D & Visual Layer (Day 2 - Afternoon)
* **Objective**: Integrate React Three Fiber for selective 3D scenes with guaranteed fallbacks.
* **Deliverables**:
  * `CanvasStage.tsx`: Clamped DPR (`[1, 2]`), `frameloop="demand"` when idle.
  * 3D Celestial Bodies: Moon, Mars, Ceres, and Eros with realistic lighting shaders.
  * Interactive 3D Artifact Viewer for key models (Apollo LRV, Ingenuity, Opportunity).
  * `FallbackPhoto.tsx`: Graceful image fallback triggered if WebGL is unsupported or disabled.
* **Exit Criteria**: Smooth 60fps camera rotation during scroll; zero crashes when WebGL is toggled off in browser devtools.

### Phase 6: Polish, Accessibility & Vercel Deployment (Day 2 - Evening)
* **Objective**: Ensure complete compliance with hackathon judging standards and launch to Vercel.
* **Deliverables**:
  * Audit against `web-design-guidelines`: Visible `:focus-visible` rings, ARIA live regions, semantic elements.
  * `prefers-reduced-motion` testing: Flawless transition to stepped card view.
  * Mobile responsiveness pass across iOS Safari and Android Chrome.
  * Deployment to Vercel with clean URLs and immutable asset caching.
* **Exit Criteria**: Live production URL passing all Lighthouse accessibility and performance benchmarks ($\ge 90$).

---

## 3. Contingency & Cut-Line Strategy

To guarantee a polished, working submission within the hackathon timeframe, non-essential features can be gracefully dropped without impacting the core experience:

| Feature | Priority | Fallback / Cut-Line Action if Behind Schedule |
| :--- | :--- | :--- |
| **Complex 3D Rover Meshes** | Medium | Fall back to high-resolution NASA archival photographs with 3D planetary globes retained. |
| **Interactive 3D Hotspots** | Low | Replace 3D pinpoints with an expandable 2D accordion spec sheet inside the detail modal. |
| **Spatial Ambient Audio** | Low | Drop audio synthesizer; rely purely on visual documentary typography and archival transcripts. |
| **Full Text Search** | Low | Destination category filter tabs (**Moon**, **Mars**, **Beyond Mars**) remain fully functional. |
