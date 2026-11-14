# GSAP & ScrollTrigger Animation Architecture

This reference outlines the animation lifecycle, scroll-scrubbing mechanics, and cleanup patterns for "The Silent Explorers".

---

## 1. React Lifecycle & Memory Cleanup (`useGSAP` / `gsap.context`)

In React 18/19 StrictMode, components mount, unmount, and remount. Always scope GSAP timelines and ScrollTrigger instances inside `gsap.context()` or `@gsap/react`'s `useGSAP` hook so that triggers, pin spacers, and tweens are cleanly reverted on unmount.

```tsx
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function ChapterScene({ chapterData }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // All animations and ScrollTriggers created here are automatically cleaned up!
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1, // Smooth scrub delay
        anticipatePin: 1,
      },
    });

    tl.fromTo('.cinematic-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 })
      .to('.cinematic-title', { opacity: 0, y: -30, duration: 0.8 }, '+=1')
      .fromTo('.telemetry-panel', { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 1 });
  }, { scope: containerRef, dependencies: [chapterData.id] });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
      <h1 className="cinematic-title">Chapter Title</h1>
      <div className="telemetry-panel">Mission Telemetry</div>
    </section>
  );
}
```

---

## 2. Scroll Scrubbing Mechanics & Chapter Pacing

### Pinning & Spatial Pacing
- Pin the 3D canvas or background plate while narrative captions and telemetry layers flow through.
- Pacing rule: Allocate generous scroll distance (e.g. `+=250%` to `+=400%`) for major planetary encounters to give the user time to inspect details.
- Avoid sudden jump cuts: use smooth cross-fades and camera interpolation (`scrub: 1` or `scrub: 1.2` for cinematic weight).

### Progressive Disclosure Timeline Pattern
```tsx
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top',
    end: '+=350%',
    pin: true,
    scrub: 0.8,
  },
});

// Phase 1: Distant approach
timeline.to(cameraRig, { distance: 100, ease: 'power2.inOut' })
// Phase 2: Reveal scientific HUD telemetry
timeline.fromTo('.hud-readout', { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.2 })
// Phase 3: Flyby closest approach & instrument analysis
timeline.to(cameraRig, { distance: 25, rotationY: Math.PI * 0.4, ease: 'none' })
// Phase 4: Farewell view and transition to next deep-space segment
timeline.to('.hud-readout', { opacity: 0, x: 20 })
        .to(cameraRig, { distance: 200, ease: 'power2.in' });
```

---

## 3. Performance & Compositor Rules
- Animate only `transform` (`x`, `y`, `scale`, `rotation`) and `opacity`.
- Never animate layout properties like `height`, `width`, `top`, `margin`, or `padding` during scroll scrubs.
- Use `will-change: transform, opacity` sparingly on elements currently being scrubbed; remove when idle.
- Coordinate with Three.js rendering: update Three.js uniforms and camera matrix directly in `ScrollTrigger.onUpdate` or via GSAP object tweens.
