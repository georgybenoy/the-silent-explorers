# Approved Visual Direction & Interaction Rules

Visual direction: **Cinematic documentary, hybrid navigation, selective 3D, realistic planetary imagery, restrained futuristic interfaces, and scientifically accurate storytelling.**

---

## 1. Cinematic Documentary Tone

- **Voice & Atmosphere**: Serious, awe-inspiring, archival, and deeply scientific. Avoid flashy sci-fi tropes (e.g. excessive neon glows, laser blasts, or fantasy UI).
- **Color Palette**: Deep cosmic blacks (`#050608`, `#0B0D13`), deep vacuum slates, warm solar accents (`#E89A3C`, `#E3C48D`), and crisp instrumentation whites (`#F0F4F8`).
- **Typography Hierarchy**:
  - Display / Chapter Heads: Elegant, authoritative sans or documentary serif with deliberate letter-spacing.
  - Telemetry / HUD: Precision monospaced type (`font-mono`, `tabular-nums`) for timestamps, velocity ($km/s$), astronomical units ($AU$), coordinates, and sensor readouts.
  - Body Narrative: Highly legible, generous line-height ($1.6$–$1.8$) with line lengths strictly under 75 characters.

---

## 2. Restrained Futuristic Interfaces (HUD Telemetry)

- **Subtle Instrumentation**: Hairline borders (`border-white/10` or `border-cyan-500/20`), corner brackets, micro coordinate crosshairs, and subtle status pips.
- **Progressive Disclosure**: Never overwhelm the screen with raw data dumps. Introduce data in layers:
  1. *Visual Anchor*: The planet or spacecraft in high-contrast lighting.
  2. *Narrative Context*: Date and mission phase caption.
  3. *Scientific Insight*: Expandable or scrubbed telemetry (spectrometry, atmospheric pressure, magnetic field fluctuations).

---

## 3. Hybrid Navigation System

Combine continuous cinematic storytelling with structured exploration:
- **Scroll-Driven Stream**: Default mode for linear, narrative journey through the mission chronology.
- **Scrubber / Timeline Bar**: Persistent micro-scrubber allowing direct scrubbing across years/decades (e.g., 1977 launch $\to$ 1979 Jupiter $\to$ 1980 Saturn $\to$ Interstellar).
- **Chapter Index**: Quick-jump modal or drawer with mission milestones.
- **Free-Inspect Mode**: Toggle allowing the user to break out of the camera track and rotate/zoom the 3D model with touch or orbit controls, before resuming the guided journey.

---

## 4. Accessibility & Mobile Fallbacks

### Reduced Motion (`prefers-reduced-motion: reduce`)
When reduced motion is preferred:
- Disable pin-scrubbed camera zoom leaps and heavy canvas rotations.
- Convert scroll-scrubbed timelines into direct step-based card sequences.
- Keep 3D scene static or render a high-resolution 2D archival photograph with fallback captioning.
- Instant opacity cuts ($100ms$–$150ms$) instead of long easing sweeps.

### Mobile Optimization
- Disable complex post-processing effects (bloom, chromatic aberration, depth of field) on mobile GPUs.
- Fall back to lightweight canvas DPR ($1.0$) or high-resolution WebP stills for devices with low WebGL memory.
- Provide touch-friendly scroll snaps and tactile scrub indicators.
