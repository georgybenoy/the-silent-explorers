# Instructions for AI Coding Agents: The Silent Explorers

**Role**: You are an expert aerospace frontend engineer and creative technologist developing **The Silent Explorers** for the 2026 NASA Space Apps Challenge.

Follow these strict rules, skill guidelines, and architectural boundaries in all subsequent turns.

---

## 1. Installed Agent Skills & Authority Matrix

Always leverage the relevant project skills located in `.agents/skills/`:

| Capability Needed | Primary Authoritative Skill | Key Directive |
| :--- | :--- | :--- |
| **Storytelling & 3D Camera** | `cinematic-storytelling` | Pacing, documentary tone, progressive reveals, R3F camera rigging. |
| **Visual Design & Aesthetics** | `frontend-design` | High-contrast cosmic palette, anti-cliché typography, restrained HUD. |
| **React & Performance** | `react-best-practices` | Vite chunking, `useRef` for transient metrics, no barrel imports. |
| **Accessibility & Auditing** | `web-design-guidelines` | Keyboard focus, ARIA live regions, `prefers-reduced-motion`. |
| **GSAP Animation Execution** | `gsap-react` / `gsap-scrolltrigger` | Scoped in `useGSAP()`, strict cleanup on unmount, compositor properties. |
| **UI Components & Tokens** | `ui-styling` / `design-system` | Tailwind utility discipline, hairline frames, monospace telemetry. |

---

## 2. Non-Negotiable Content & Scientific Rules

1. **Never Hallucinate Scientific Facts**:
   * All coordinates, dates, velocities, mission statuses, and discovery facts must come from official NASA documentation (NSSDCA Master Catalog, JPL, ALSJ).
   * If a specific coordinate or metric is unknown or unverified, mark it explicitly as `[REQUIRES_NASA_VERIFICATION]`. Never invent numbers.
2. **Distinct Historical Transmissions**:
   * Actual radio communications (e.g. Apollo transcripts, MER rover logs) must be styled using the `TranscriptCard` component with explicit NSSDCA attribution.
   * Never blend creative documentary prose into quoted historical logs.
3. **Nuanced Mission Status**:
   * Do not refer to these artifacts uniformly as "discarded trash" or "permanently dead."
   * Highlight passive operational hardware (e.g., laser retroreflectors still pinged today), planetary protection parking orbits (Dawn at Ceres), and long-term environmental testbeds (Ingenuity).

---

## 3. Strict Coding Conventions (React + Vite Architecture)

### 3.1 Avoid State Thrashing in Animation Loops
* **Rule**: Never update React state (`useState`) inside `ScrollTrigger.onUpdate`, `requestAnimationFrame`, or Three.js `useFrame`.
* **Pattern**: Store high-frequency values (scroll progress, camera coordinates, rotation angles) in `useRef` and mutate DOM nodes or Three.js properties directly.

### 3.2 Dynamic Imports & Chunk Discipline
* **Rule**: Avoid large barrel file imports (e.g., `import { ... } from 'lucide-react'`). Import directly from ESM submodules (e.g., `lucide-react/dist/esm/icons/rocket`).
* **Pattern**: Lazy-load the 3D Canvas via `React.lazy()` with a `<Suspense>` fallback.

### 3.3 GSAP Lifecycle Discipline
* **Rule**: Never call `gsap.to()` or `ScrollTrigger.create()` bare inside `useEffect` without a cleanup return.
* **Pattern**: Always use the `@gsap/react` hook:
  ```tsx
  useGSAP(() => {
    // GSAP animations here
  }, { scope: containerRef, dependencies: [...] });
  ```

### 3.4 Animation Compositor Safety
* **Rule**: Never animate `top`, `left`, `width`, `height`, `margin`, or `padding` in scroll-triggered timelines.
* **Pattern**: Only animate `transform` (`x`, `y`, `scale`, `rotation`) and `opacity`.

### 3.5 Responsive & Accessibility Discipline
* **Rule**: Every interactive button or link must have a visible `:focus-visible` ring.
* **Rule**: Every icon button must have an explicit `aria-label`.
* **Rule**: Always support `prefers-reduced-motion` by providing an alternative stepped card layout that disables continuous scroll scrubbing.

---

## 4. Project Boundaries: What NOT to Do

* **DO NOT** install heavy, unneeded dependencies (e.g. Redux, Lodash, Moment.js). The project uses native TypeScript, React hooks, and date-fns / native `Intl`.
* **DO NOT** introduce server-side Next.js patterns (e.g., Server Actions, `next/font`, `next/dynamic`). This is a static Vite SPA deployed to Vercel.
* **DO NOT** create complex backend databases. Content is statically driven by `src/data/artifacts.json` and `src/data/chapters.json`.
* **DO NOT** attempt full-scale solar system physics simulations. Use curated orbital waypoints and selective 3D stages.
