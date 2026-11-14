---
name: immersive-space-museum
description: Architecture, 3D model integration, React Three Fiber optimization, and scientific authenticity standards for The Silent Explorers museum and cinematic documentary experiences.
license: MIT
metadata:
  project: The Silent Explorers
  version: "1.0.0"
---

# Immersive Space Museum & 3D Architectural Standards

This skill establishes the engineering and creative technologist guidelines for building **The Silent Explorers** interactive 3D museum and cinematic documentary experiences for the 2026 NASA Space Apps Challenge.

---

## 1. Core Visual & Scientific Pillars

### 1.1 Scientific Visual Authenticity
- **No Hallucinated Hardware**: Geometry, solar array spans, high-gain antennas, and instruments must mirror authentic NASA JPL / NSSDCA blueprints.
- **Accurate Solar Illumination**: In interplanetary space and airless bodies (the Moon, asteroid 433 Eros), illumination is stark: a single high-intensity directional sun light with deep black shadows and subtle reflected basalt/regolith bounce.
- **Atmospheric Modeling**: On Mars, simulate Rayleigh and aerosol dust scattering (suspended iron-oxide particulate) using warm amber/salmon gradients.
- **Authenticity Categorization**: Every 3D visual or artifact stage must be explicitly attributed:
  - *Authentic NASA 3D Model*: Sourced from NASA 3D Resources / JPL.
  - *Architectural 3D Reconstruction*: Procedural/high-precision CAD reconstruction from official schematics.
  - *Illustrative Scientific Stage*: Contextual orbital or terrain environment.

---

## 2. React Three Fiber (R3F) & WebGL Architecture

### 2.1 WebGL Context & Canvas Management
- **Single Canvas Sharing or Lazy-Mounting**:
  - Never run multiple uncoordinated animation loops simultaneously.
  - For chapter transitions, unmount off-screen 3D canvases or use `frameloop="demand"` when idle.
  - In Chapter IV (Museum), provide a single interactive 3D stage (`Artifact3DStage.tsx`) that mounts when viewing an artifact dossier and smoothly switches assets.
- **Canvas Fallback & Error Boundary**:
  - Always wrap `<Canvas>` in a standard `<Suspense>` boundary with a high-resolution NASA photography fallback.
  - Support a strict `isWebGLAvailable` fallback: if WebGL context creation fails, display the authenticated NASA imagery plate with full interactive telemetry and annotations.

### 2.2 Geometry & Texture Discipline
- **Geometry Cleanup**: Always dispose of geometries, materials, and textures on component unmount:
  ```tsx
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, []);
  ```
- **Clamp DPR**: Always clamp device pixel ratio: `dpr={[1, Math.min(window.devicePixelRatio, 2)]}` to prevent GPU thermal throttling on 4K/retina displays.
- **Shadow Map Budget**: Keep shadow map resolution conservative (`512x512` or `1024x1024`), or rely on baked ambient occlusion and ground contact shadows.

---

## 3. Responsive 3D Layout & Quality Modes

### 3.1 Adaptive Performance Modes
- **HIGH (Desktop)**: Full procedural starfield (2,000+ particles), dynamic lighting, smooth camera lerping, active orbital arcs.
- **MEDIUM (Tablet / Laptop)**: Clamped particles (800), simplified lighting, lower shadow resolution.
- **LOW / MOBILE**: Minimal particles (300), directional light without heavy shadows, touch-friendly orbit controls with restricted pitch limits (`maxPolarAngle = Math.PI / 2 + 0.1`) so users don't clip beneath the ground.

### 3.2 Accessibility & Reduced Motion
- When `prefers-reduced-motion` is active:
  - Disable continuous procedural rotation / drift.
  - Fix camera at a dramatic, readable 3/4 perspective.
  - Allow manual drag rotation so user retains full inspection agency without involuntary camera flybys.
  - Provide full textual descriptions for all 3D annotations and component breakdowns.

---

## 4. Chapter 3D Milestones

- **Chapter I (The Silence)**: Cinematic 3D Earth-to-Deep-Space transition; slow atmospheric rim-lighting reveal of Earth; smooth camera pull-back into cold interstellar void.
- **Chapter II (Beyond Earth)**: Interactive 3D Solar System Orrery with scaled illustrative orbital tracks (Sun, Earth, Moon, Mars, Ceres, Eros).
- **Chapter III (The Forgotten Worlds)**: 3D interactive planetary bodies (Moon, Mars, Ceres, Eros) with authentic regolith, iron-oxide, and rocky textures.
- **Chapter IV (Artifact Museum)**: Interactive 3D explorer exhibition stage with rotation, zoom, hot-spot component annotations, and historical dossier.
- **Chapter V (The Final Chapter)**: Atmospheric deep-space transmission visualization and mission ending dioramas.
- **Chapter VI (What They Left Behind)**: Planetary coordinate markers and scientific footprint visualizer.
- **Chapter VII (The Legacy)**: Expanding multi-world trajectory visualization connecting past explorers with future missions (Artemis, Dragonfly, VIPER).
