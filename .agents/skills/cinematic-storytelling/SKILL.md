---
name: cinematic-storytelling
description: Architecture and design guidelines for cinematic scroll-driven storytelling in The Silent Explorers. Enforces GSAP/ScrollTrigger lifecycle management, Three.js/React Three Fiber planetary camera choreography, progressive scientific disclosure, restrained futuristic HUD interfaces, hybrid navigation, and performance/accessibility fallbacks.
license: MIT
metadata:
  project: The Silent Explorers
  version: "1.0.0"
---

# Cinematic Storytelling & Animation Architecture

This skill governs the storytelling, animation, 3D camera choreography, and visual presentation for **The Silent Explorers**.

## Approved Visual Direction

All visuals and interfaces must adhere strictly to the approved aesthetic:
- **Cinematic Documentary**: Authoritative, archival, and awe-inspiring tone. Restrained pacing; avoid flashy sci-fi tropes, neon oversaturation, or fantasy gaming gimmicks.
- **Selective 3D**: High-fidelity Three.js / React Three Fiber viewports used intentionally for planetary encounters and spacecraft models; lightweight 2D/SVG data layers for telemetry and logs.
- **Realistic Planetary Imagery**: Accurate lighting (single directional sunlight), atmospheric scattering shaders, planetary oblateness, and true color profiles.
- **Restrained Futuristic Interfaces**: Clean HUD elements, hairline borders (`1px` subtle opacity), corner crosshairs, monospace data readouts (`tabular-nums`), and minimal iconography.
- **Scientifically Accurate Storytelling**: Historical dates, accurate trajectory velocities ($km/s$), astronomical units ($AU$), telemetry, and verifiable mission transcripts.
- **Hybrid Navigation**: Continuous scroll-scrubbed narrative paired with a chronological timeline scrubber, chapter jumps, and optional "free-inspect" 3D camera modes.

---

## Core Responsibilities & Architecture

### 1. GSAP & ScrollTrigger Lifecycle Management
- **Hook Scoping**: Always use `@gsap/react`'s `useGSAP()` or wrap animations in `gsap.context(..., containerRef)`.
- **Automatic Reversion**: Never leave orphan ScrollTrigger instances, pinned DOM spacers, or active tick listeners on component unmount.
- **Pinning & Scrub Delay**: Use smooth scrub delays (`scrub: 0.8` to `scrub: 1.2`) to convey cinematic mass and inertial weight.
- See detailed patterns in [GSAP & ScrollTrigger Reference](./references/gsap-scrolltrigger.md).

### 2. Three.js / React Three Fiber Planetary Choreography
- **Camera Interpolation**: Use smooth spherical coordinate interpolation (`lerp` / `slerp`) across orbital waypoints rather than abrupt camera position snaps.
- **Render Loop Control**: Use `dpr={[1, 2]}` to clamp high-DPI overhead. Switch to on-demand rendering (`frameloop="demand"`) during static narrative reading sections.
- **Asset Optimization**: Power-of-two textures, compressed WebP/KTX2 formats, and progressive resolution streaming under `<Suspense>`.
- See detailed patterns in [Planetary Camera Reference](./references/r3f-planetary-camera.md).

### 3. Progressive Scientific Reveals
- Unfold information in narrative layers:
  1. *Visual Encounter*: Approaching planet or deep-space milestone.
  2. *Chronological Context*: Mission timestamp, mission elapsed time, and distance from Earth.
  3. *Instrumentation Insight*: Scrub-triggered spectral data, atmospheric profile, or magnetometer readings.
  4. *Human/Mission Milestone*: Archival log or scientist quotes.

### 4. Performance & Compositor Rules
- Only animate `transform` and `opacity`. Layout properties (`width`, `height`, `margin`, `top`) are strictly prohibited in scroll tweens.
- Leverage `content-visibility: auto` on off-screen narrative chapters to prevent DOM recalculation.
- Batch DOM updates and use `useRef` for transient frame-by-frame telemetry updates to avoid triggering React re-renders.

### 5. Accessibility & Reduced-Motion
- Strictly honor `prefers-reduced-motion: reduce`.
- If reduced motion is requested:
  - Disable pin-scrubbing camera flybys and heavy rotational zooms.
  - Present chapter scenes as clean, step-based narrative cards.
  - Replace dynamic 3D camera sweeps with static, high-resolution imagery and instant opacity transitions ($100ms$).

### 6. Mobile-Friendly Fallbacks
- Gracefully reduce 3D scene complexity on mobile devices (lower shadow map resolution, disable bloom/screen-space shaders).
- Provide touch-friendly drag and timeline tap targets (minimum $44 \times 44\text{px}$).
- Keep typography legible without requiring pinch-to-zoom.

---

## Reference Guides

- [GSAP & ScrollTrigger Architecture](./references/gsap-scrolltrigger.md)
- [Three.js & Planetary Camera Rigging](./references/r3f-planetary-camera.md)
- [Approved Visual Direction & UI Rules](./references/visual-direction.md)
