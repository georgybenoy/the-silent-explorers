---
name: react-best-practices
description: React performance optimization guidelines from Vercel Engineering, adapted specifically for React + Vite architecture. Use when authoring, reviewing, or refactoring React components, hooks, state management, bundle splitting, and client-side rendering performance. Ignores Next.js-only server features.
license: MIT
metadata:
  author: vercel (adapted for React + Vite)
  version: "1.0.0"
---

# React Best Practices (React + Vite Architecture)

Comprehensive performance optimization guidelines adapted from Vercel Engineering for client-side **React + Vite** single-page and interactive applications.

---

## Architecture Context: React + Vite Adaptation

This project uses **React + Vite** (client-side rendering / SPA). When applying these best practices, apply the following architectural adaptations:

### Ignored / Non-Applicable Rules (Next.js Specific)
Do **NOT** apply Next.js App Router or Server Action rules:
- `server-auth-actions`, `server-cache-react` (`React.cache()`), `server-cache-lru`
- `server-dedup-props`, `server-no-shared-module-state`, `server-serialization`
- `server-parallel-fetching` (via RSC), `server-after-nonblocking` (`after()`)
- `rendering-hydration-no-flicker` (server-injected script tags)
- `next/font`, `next/image`, `next/link` (use standard web tags or React Router equivalents)

### Vite Replacements for Next.js Patterns
- **Dynamic Imports**: Replace `next/dynamic` with `React.lazy()` paired with `<Suspense>` and dynamic `import('./Component')`.
- **Bundle Splitting**: Leverage Vite's Rollup build configuration (`build.rollupOptions.output.manualChunks`) and direct module imports.
- **Asset Handling**: Use Vite's native static asset imports (`import imgUrl from './asset.webp'`) with explicit image dimensions (`width`, `height`) and `loading="lazy"` / `fetchpriority="high"`.
- **Preloading**: Use `<link rel="modulepreload">` or trigger dynamic `import()` on user interaction (hover/focus) before route navigation.

---

## Rule Categories by Priority

| Priority | Category | Impact | Focus in React + Vite |
| :--- | :--- | :--- | :--- |
| 1 | Eliminating Waterfalls | **CRITICAL** | Parallel async operations, early execution, Suspense boundaries |
| 2 | Bundle Size Optimization | **CRITICAL** | Direct imports (no barrel files), `React.lazy`, Vite manual chunking |
| 3 | Client-Side Data Fetching | **MEDIUM-HIGH** | Request deduplication, passive listeners, localStorage optimization |
| 4 | Re-render Optimization | **MEDIUM** | Derived state in render, memoization, fine-grained state, functional updates |
| 5 | Rendering Performance | **MEDIUM** | Compositor transforms, DOM batching, `content-visibility`, SVG wrappers |
| 6 | JavaScript Performance | **LOW-MEDIUM** | Map/Set lookups, loop hoisting, `requestIdleCallback`, immutable sorting |
| 7 | Advanced Patterns | **LOW** | Stable callback refs, `startTransition`, `useDeferredValue` |

---

## 1. Eliminating Waterfalls (CRITICAL)

- **`async-parallel`**: Use `Promise.all()` for independent asynchronous operations instead of sequential `await`.
- **`async-defer-await`**: Move `await` down into the specific code branches where the result is actually needed.
- **`async-cheap-condition-before-await`**: Check synchronous conditions before kicking off or awaiting asynchronous work.
- **`async-suspense-boundaries`**: Wrap independent asynchronous component trees in `<Suspense>` so one slow query does not block the entire view.

---

## 2. Bundle Size Optimization (CRITICAL)

- **`bundle-barrel-imports`**: Import directly from submodules (e.g., `lucide-react/dist/esm/icons/...` or specific files) rather than importing from barrel index files that pull unnecessary modules.
- **`bundle-dynamic-imports`**: Use `React.lazy()` for heavy modals, three.js / 3D canvases, planetary viewports, and non-immediate interactive panels.
- **`bundle-defer-third-party`**: Load heavy third-party analytics, external telemetry, or auxiliary assets during `requestIdleCallback` or after initial interactive mount.
- **`bundle-preload`**: Trigger dynamic `import()` when a user hovers over navigation links or chapter selections to preload chunks before click.

---

## 3. Client-Side Data & Event Architecture (MEDIUM-HIGH)

- **`client-dedup`**: Deduplicate concurrent requests for the same dataset or asset using memory caches or TanStack Query / SWR.
- **`client-event-listeners`**: Centralize global event listeners (`window.addEventListener`) rather than attaching duplicate handlers across multiple component instances.
- **`client-passive-event-listeners`**: Always pass `{ passive: true }` to touch and scroll event listeners unless `preventDefault()` is strictly necessary.
- **`client-localstorage-schema`**: Keep `localStorage` data minimal, structured, and version-tagged.

---

## 4. Re-render Optimization (MEDIUM)

- **`rerender-derived-state`**: Calculate derived values synchronously during render instead of storing them in `useEffect` + `setState`.
- **`rerender-defer-reads`**: Do not subscribe a component to state that is only read inside an event callback; read via a ref or query on demand.
- **`rerender-functional-setstate`**: Use `setState(prev => ...)` to avoid adding the state variable itself to effect and callback dependency arrays.
- **`rerender-dependencies`**: Prefer primitive values (`id`, `boolean`, `string`) over objects or arrays in dependency arrays.
- **`rerender-memo`**: Extract expensive subtrees into `React.memo` components, hoisting default non-primitive parameter values to module scope.
- **`rerender-no-inline-components`**: Never declare a React component inside another component body; it recreates the component type on every render and destroys child state.
- **`rerender-use-ref-transient-values`**: For high-frequency values (cursor position, animation progress, scroll offset, timestamp), mutate `useRef` rather than triggering state re-renders.

---

## 5. Rendering & Animation Performance (MEDIUM)

- **`rendering-animate-transform-opacity`**: Restrict CSS and GSAP animations strictly to GPU-composited properties: `transform` and `opacity`. Avoid animating `top`, `left`, `width`, `height`, or `margin`.
- **`rendering-animate-svg-wrapper`**: Animate an outer `<div>` wrapper rather than applying complex transforms directly to nested SVG DOM nodes.
- **`rendering-content-visibility`**: Use `content-visibility: auto` on off-screen sections, timelines, or long chapter feeds to skip layout and painting until scrolled near.
- **`rendering-conditional-render`**: Use ternary expressions (`condition ? <Component /> : null`) instead of `condition && <Component />` to prevent accidental `0` or `NaN` rendering in the DOM.
- **`rendering-transitions`**: Wrap non-urgent updates (filtering, chapter switching, visual mode toggles) in `startTransition` to keep input and scroll response immediate.

---

## 6. JavaScript Micro-Optimizations (LOW-MEDIUM)

- **`js-set-map-lookups`**: Use `Set` for `O(1)` membership checks and `Map` for keyed lookups instead of repeating `.find()` or `.includes()` on arrays.
- **`js-cache-property-access`**: In animation loops and per-frame calculations (`requestAnimationFrame`), cache object property reads and avoid object allocations.
- **`js-combine-iterations`**: Combine `.filter().map()` chains into a single loop or `.reduce()` when processing large data arrays.
- **`js-request-idle-callback`**: Schedule background tasks (pre-parsing scientific data, telemetry, preloading offscreen textures) with `requestIdleCallback`.

---

## 7. Advanced Patterns (LOW)

- **`advanced-use-latest`**: Use a `useLatest(value)` ref pattern for callbacks passed to event listeners or animations to avoid re-binding listeners on value changes.
- **`advanced-event-handler-refs`**: Decouple high-frequency animation callbacks from React rendering lifecycle via ref-based listeners.

---

## Detailed References

For implementation examples comparing incorrect vs correct code patterns, see:
- [Vite Adaptation Guide](./references/vite-adaptation.md)
