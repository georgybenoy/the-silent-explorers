# The Silent Explorers: Design System & Visual Specification

**Visual Direction**: *Cinematic documentary, editorial, atmospheric, restrained futuristic interfaces, and scientifically accurate storytelling.*  
**Authoritative Source**: Grounded in the `cinematic-storytelling`, `frontend-design`, and `design-system` agent skills.

---

## 1. Aesthetic Philosophy & Visual Identity

The design language of **The Silent Explorers** reflects the solemn grandeur of deep space and the precision of aerospace instrumentation. It intentionally departs from generic "AI startup" clichés (e.g. purple gradient blobs, bouncy hover animations, SaaS cards):

* **Cosmic Realism**: High-contrast, pitch-black space environments (`#050608`) punctuated by harsh, directional sunlight and long, stark shadows.
* **Restrained Futuristic HUD**: Scientific instrumentation rather than sci-fi gaming. Subtle hairline borders (`border-white/10`), micro coordinate crosshairs, corner brackets, and crisp monospaced telemetry.
* **Editorial Documentary Pacing**: Generous vertical breathing room, authoritative display typography, and deliberate rhythm allowing the weight of each historical milestone to land.

---

## 2. Color System (Design Tokens)

The palette balances the deep vacuum of space with high-legibility telemetry and warm planetary accents:

### 2.1 Base & Surface Colors (The Void)
| Token Name | Hex Code | Tailwind Equivalent | Usage |
| :--- | :--- | :--- | :--- |
| `--space-black` | `#050608` | `bg-neutral-950` / `#050608` | Primary page canvas & vacuum background |
| `--space-slate` | `#0B0D13` | `bg-slate-950` / `#0B0D13` | Deep background plates & 3D canvas backdrop |
| `--surface-card` | `#111622` | `bg-slate-900/80` | HUD cards, transcript containers, modal backgrounds |
| `--surface-border` | `rgba(255, 255, 255, 0.08)` | `border-white/10` | Subtle hairline dividers, grid lines, and frame borders |
| `--surface-hover` | `rgba(255, 255, 255, 0.12)` | `hover:border-white/20` | Interactive border focus & hover state |

### 2.2 Text & Typography Colors
| Token Name | Hex Code | Usage | Contrast vs Space Black |
| :--- | :--- | :--- | :--- |
| `--text-primary` | `#F9FAFB` | Major headlines, mission titles, telemetry readouts | 18.5 : 1 (AAA) |
| `--text-secondary` | `#9CA3AF` | Narrative body copy, historical context, subtitles | 7.8 : 1 (AAA) |
| `--text-muted` | `#6B7280` | Metadata labels, coordinates, timestamps, footnotes | 4.6 : 1 (AA) |
| `--text-gold` | `#E89A3C` | Archival milestones, solar accents, Apollo emblems | 9.2 : 1 (AAA) |

### 2.3 Semantic & Telemetry Status Colors
| Token Name | Hex Code | Meaning / Indicator |
| :--- | :--- | :--- |
| `--status-passive` | `#10B981` | Passive operational (e.g., Lunar Retroreflectors still pinged) |
| `--status-stable` | `#0284C7` | Stable parking orbit / protected site (e.g., Dawn at Ceres) |
| `--status-concluded` | `#F59E0B` | Mission formally concluded / fuel depleted / batteries low |
| `--status-lost` | `#EF4444` | Catastrophic failure / hardware lost (e.g., dust storm engulfment) |

---

## 3. Typography Hierarchy

```
Display: Space Grotesk / Cinzel (Monumental, Authoritative)
Body:    Inter / System Sans (High legibility, optical clarity)
HUD:     JetBrains Mono / Space Mono (Precision telemetry, tabular-nums)
```

| Element | Font Family | Size (Desktop) | Weight | Tracking / Leading | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | Space Grotesk / Sans Display | 64px–80px | 700 Bold | `tracking-tight`, `leading-none` | Pacing the opening chapter |
| **Chapter Heading** | Space Grotesk | 36px–48px | 600 SemiBold | `tracking-wide`, `uppercase` | With subtle Roman numerals |
| **Artifact Name** | Space Grotesk | 28px–32px | 600 SemiBold | `tracking-tight` | Header for museum profile |
| **Section Eyebrow** | Monospace | 12px–13px | 500 Medium | `tracking-widest`, `uppercase` | e.g., `MISSION ID // MER-B` |
| **Narrative Body** | Inter | 16px–18px | 400 Regular | `leading-relaxed` (1.75) | Max 72 characters per line |
| **Telemetry & HUD** | Monospace | 13px–15px | 500 Medium | `tabular-nums` | Latitude, longitude, velocity |
| **Archival Transcript** | Monospace | 14px–15px | 400 Regular | `leading-normal` | Quoted historical audio/text |

---

## 4. Layout Architecture & HUD Elements

### 4.1 The Hairline Instrument Frame
Components utilize subtle 1-pixel borders with micro-corner accents to evoke scientific hardware without visual clutter:

```text
┌── [ MISSION LOG // MER-A ] ─────────────────────────┐
│ Lat: -14.5684° S  |  Long: 175.4726° E              │
│ Status: MISSION CONCLUDED (SAND TRAPPED)            │
│                                                     │
│ "Spirit drove backward on five wheels for years,    │
│ transforming mechanical failure into discovery."    │
└─────────────────────────────────────────────────────┘
```

### 4.2 Spacing Scale
* `space-xs`: 4px | `space-sm`: 8px | `space-md`: 16px | `space-lg`: 24px
* `space-xl`: 32px | `space-2xl`: 48px | `space-3xl`: 64px | `space-4xl`: 96px

### 4.3 Breakpoints & Layout Rules
* **Mobile (< 640px)**: Single-column flow, collapsible HUD panels, touch target minimum $44 \times 44\text{px}$.
* **Tablet (640px – 1024px)**: Dual-column telemetry cards with integrated media.
* **Desktop (> 1024px)**: Full widescreen layout with sticky viewport stage, side-pinned narrative scrollers, and floating interactive telemetry bar.

---

## 5. Component Specifications

### 5.1 Chronological Timeline Scrubber
* Fixed at the bottom or right edge of the viewport.
* Displays tick marks for mission years (1969 to 2024+).
* Hover/focus displays a miniature tooltip badge: `1997 // SOJOURNER // MARS`.
* Clicking a tick smoothly scrolls to that artifact or chapter.

### 5.2 Archival Transcript Card (Historical vs. Narrative)
To satisfy the rule that **fictionalized narration must be clearly distinguishable from historical records**, transcripts are wrapped in an official "NASA Archival Record" card:
* Distinct monospace font (`JetBrains Mono`).
* Border styling: `border-l-2 border-amber-500/80 bg-neutral-900/90`.
* Header tag: `[HISTORICAL TRANSMISSION // NSSDCA RECORDED]`.
* Direct citation link to official mission transcript.

### 5.3 Selective 3D Canvas Stage
* Full-bleed or inset stage container with a subtle corner bracket overlay.
* Top-right HUD controls:
  * `[ Orbit / Free Inspect ]` toggle button.
  * `[ Reset Camera ]` button.
  * `[ 3D Info / Hotspots ]` toggle.
* Fallback button: `[ Switch to 2D Archival Photography ]` for low-spec devices.

### 5.4 Source & Citation Drawer
* Accessible via a persistent link: `"NASA Master Catalog Citations"`.
* Slides out smoothly with a list of verified NSSDCA IDs, landing site publications, and scientific papers corresponding to the active view.

---

## 6. Motion & Animation Language

* **Guiding Skill**: `gsap-performance` & `cinematic-storytelling`.
* **Easing**: Primary cinematic ease is `power2.out` for entrances and `power1.inOut` for camera transitions.
* **Scroll Scrubbing**: `scrub: 1.0` (with 1-second lag delay) to impart physical mass and weight to the camera and elements.
* **Strict Compositor Rules**: Animations are strictly limited to `transform` (`x`, `y`, `scale`, `rotation`) and `opacity`. Never animate `width`, `height`, `margin`, or `top`.
* **Reduced Motion Alternative (`prefers-reduced-motion`)**:
  * All continuous camera sweeps and scroll-linked pinning are disabled.
  * Chapters render as clean, static narrative sections.
  * Transitions default to simple `opacity` cross-fades ($150\text{ms}$).
