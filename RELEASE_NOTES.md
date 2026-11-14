# THE SILENT EXPLORERS — RELEASE NOTES
## Version 1.0.0: The Immersive 3D Space Museum Release

**Release Date**: November 15, 2026  
**Competition**: 2026 NASA Space Apps Challenge  
**Challenge Theme**: Abandoned but not Forgotten — Storytelling about NASA's Discarded Equipment on the Moon and Mars  
**Tagline**: *"They went beyond. They discovered. They remain."*  
**Live Production URL**: [https://the-silent-explorers.vercel.app/](https://the-silent-explorers.vercel.app/)  
**GitHub Repository**: [https://github.com/georgybenoy/the-silent-explorers](https://github.com/georgybenoy/the-silent-explorers)

---

## 1. Overview

*The Silent Explorers* is an immersive digital space museum and documentary experience dedicated to humanity's farthest archaeological monuments: the passive and decommissioned spacecraft resting on the Moon, Mars, Ceres, and Asteroid 433 Eros.

This milestone release transforms the project into a **Hybrid Cinematic Documentary + Interactive 3D Museum**, pairing scaled 3D CAD reconstructions and real-time WebGL orbital environments with authentic NASA photography and verbatim mission communications.

---

## 2. Key Features & Enhancements

### 1. Cinematic 3D Opening (Chapter I: The Silence)
* Procedural 3D Earth sphere with Rayleigh atmospheric scattering glow, axial rotation, and cosmic starfield depth.
* Multi-scene documentary progression (Scenes 01–07) featuring smooth camera dollying and verbatim Apollo 17 translunar coast logs.
* Non-overlapping telemetry layout with dedicated navigation regions.

### 2. Interactive Solar System Orrery (Chapter II: Beyond Earth)
* Real-time 3D solar system simulation depicting the Sun, orbital radii, and transit mechanics between the Moon, Mars, Ceres, and Asteroid 433 Eros.
* Interactive pause/resume controls and dynamic physical constants dossiers.

### 3. The Forgotten Worlds 3D Stages (Chapter III)
* Distinct 3D planetary stages representing the Moon (1,737.4 km radius), Mars (3,389.5 km radius), Ceres (Occator Crater sodium carbonate faculae), and Asteroid 433 Eros (irregular geometry).
* Real-time surface telemetry and explorer associations.

### 4. Interactive 3D Artifact Museum (Chapter IV: Meet the Explorers)
* Scaled 3D CAD architectural reconstructions for all 8 featured explorers:
  1. **Apollo 17 Lunar Roving Vehicle (LRV)**
  2. **Apollo 15 ALSEP Central Station (with distinct LRRR)**
  3. **Sojourner (Mars Pathfinder)**
  4. **Spirit (MER-A)**
  5. **Opportunity (MER-B)**
  6. **Ingenuity (Mars 2020)**
  7. **Dawn Spacecraft**
  8. **NEAR Shoemaker**
* **OrbitControls**: Visitors can click and drag to rotate models, use mouse wheel/pinch to zoom, reset the camera, and toggle automatic turntable rotation.
* **Dual-Mode View**: Instantly switch between `3D MODEL` and `NASA PHOTO` modes.
* **Component Breakdown Hotspots**: 32 interactive engineering callouts detailing specific hardware systems (Pancam masts, ion thrusters, RTGs, carbon-fiber blades).
* Continuous artifact cycling (`PREV` / `NEXT`) across planetary destinations.

### 5. Mission Conclusion Chronology (Chapter V: The Final Chapter)
* Deep Space Network (DSN) carrier monitor illustrating X-band carrier decay into deep space silence.
* Eight comprehensive mission ending profiles with verbatim historical transmissions.

### 6. Planetary Landing Theaters Visualizer (Chapter VI: What They Left Behind)
* Interactive 3D mini-globe visualizer mapping landing coordinates across the Moon, Mars, Ceres, and Eros.
* Sub-meter coordinate fidelity (Spirit resting at Troy `14.6083° S, 175.5262° E`, Apollo 17 LRV VIP site `20.1896° N, 30.7769° E`, NEAR body-fixed `35.7° S, 279.5° W`).

### 7. Solar Trajectory Horizon & Finale (Chapter VII: The Legacy)
* 3D interplanetary trajectory stage escaping into deep space.
* Authoritative slide-out Citations Drawer containing 20 primary NASA/NSSDCA/JPL source records.
* Concluding documentary epilogue: *"They went beyond. They discovered. They remain."*

---

## 3. Performance & Quality Standards

* **Adaptive Device Quality Tiers**: Automatically configures DPR and rendering quality (High, Medium, Low) based on device memory and CPU concurrency.
* **Accessibility (WCAG 2.1 AA)**: Full keyboard navigation, visible `:focus-visible` rings, dialog focus trapping, Escape-to-dismiss, and screen reader landmarks.
* **Reduced Motion Compliance**: Seamlessly falls back to static high-resolution NASA plates and SVG vector schematics when `prefers-reduced-motion` is enabled or WebGL is unavailable.
* **Responsive Layout**: Validated across 10 viewports (1920×1080 down to 360×800) with zero horizontal overflow.
* **Console Health**: Zero unhandled JavaScript runtime exceptions; zero failed network requests.

---

## 4. Verification & Deployment

* **Production URL**: [https://the-silent-explorers.vercel.app/](https://the-silent-explorers.vercel.app/)
* **Build System**: Vite 6.4 + TypeScript 5.7 + React 19 + Three.js 0.174
