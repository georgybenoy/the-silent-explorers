# React + Vite Best Practices: Implementation Reference

This guide translates key Vercel React best practice rules into practical React 18/19 + Vite patterns.

---

## 1. Dynamic Code Splitting

### Next.js Pattern (DO NOT USE)
```tsx
import dynamic from 'next/dynamic';
const HeavyPlanetView = dynamic(() => import('./HeavyPlanetView'), { ssr: false });
```

### Vite + React Pattern (CORRECT)
```tsx
import { lazy, Suspense } from 'react';

const HeavyPlanetView = lazy(() => import('./HeavyPlanetView'));

export function ChapterView() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-black/80 animate-pulse" />}>
      <HeavyPlanetView />
    </Suspense>
  );
}
```

---

## 2. Vite Chunk Splitting & Direct Imports

### Avoiding Barrel File Overhead
Barrel files (e.g. `import { Rocket } from 'lucide-react'` or large component indices) can slow down Vite development cold start and expand vendor chunks if tree-shaking fails.

```tsx
// ❌ Avoid broad barrel import when icon count is large
import { Rocket, Satellite, Compass } from 'lucide-react';

// ✅ Preferred for targeted bundle optimization:
import Rocket from 'lucide-react/dist/esm/icons/rocket';
import Satellite from 'lucide-react/dist/esm/icons/satellite';
import Compass from 'lucide-react/dist/esm/icons/compass';
```

### Vite Configuration (`vite.config.ts`)
```ts
// Manual chunking to isolate heavy 3D and animation dependencies
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          animation: ['gsap', 'lenis'],
        },
      },
    },
  },
});
```

---

## 3. Transient High-Frequency Values via Refs

When tracking mouse coordinates, scroll positions, or animation timelines, avoid storing per-frame updates in React state:

```tsx
// ❌ Triggers 60+ re-renders per second
const [scrollProgress, setScrollProgress] = useState(0);

// ✅ Transient updates via ref or direct DOM/GSAP target
const progressRef = useRef(0);
useEffect(() => {
  const trigger = ScrollTrigger.create({
    trigger: '#scene',
    onUpdate: (self) => {
      progressRef.current = self.progress;
      // Mutate HUD DOM node directly or update Three.js uniform
    },
  });
  return () => trigger.kill();
}, []);
```

---

## 4. Derived State Computation

```tsx
// ❌ Anti-pattern: Syncing prop to state via useEffect
function PlanetInfo({ planetData }) {
  const [atmComposition, setAtmComposition] = useState([]);
  useEffect(() => {
    setAtmComposition(planetData.gases.filter(g => g.percentage > 1));
  }, [planetData]);
  // ...
}

// ✅ Correct: Derive synchronously during render
function PlanetInfo({ planetData }) {
  const atmComposition = useMemo(() => {
    return planetData.gases.filter(g => g.percentage > 1);
  }, [planetData.gases]);
  // ...
}
```

---

## 5. Non-Urgent Transition Updates

```tsx
import { useTransition } from 'react';

export function NavigationBar({ onSelectMission }) {
  const [isPending, startTransition] = useTransition();

  const handleSelect = (missionId: string) => {
    startTransition(() => {
      onSelectMission(missionId);
    });
  };

  return (
    <button onClick={() => handleSelect('voyager-1')}>
      Voyager 1 {isPending && '...'}
    </button>
  );
}
```
