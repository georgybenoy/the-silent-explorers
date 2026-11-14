# Three.js & React Three Fiber: Planetary Camera Architecture

Guidelines for high-fidelity planetary rendering, selective 3D scenes, and camera choreography.

---

## 1. Selective 3D Architecture

Not every part of the experience requires a heavy 3D canvas. Follow the "Selective 3D" principle:
- **Hero & Planetary Encounters**: Full interactive WebGL / React Three Fiber viewport with physical lighting, atmospheric glow shaders, and camera choreography.
- **Data Deep-Dives / Trajectory Logs**: High-performance 2D SVG or canvas overlays to keep mobile frame rates at steady 60fps.
- **Canvas Lifecycle**: Mount the R3F `<Canvas>` as a persistent background scene or isolate it per chapter with `frameloop="demand"` when idle to conserve GPU resources.

```tsx
<Canvas
  dpr={[1, 2]} // Clamp DPR to prevent 4K mobile GPU thermal throttling
  gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
  camera={{ fov: 45, near: 0.1, far: 2000, position: [0, 0, 150] }}
>
  <Suspense fallback={null}>
    <SolarSystemScene />
  </Suspense>
</Canvas>
```

---

## 2. Planetary Camera Transitions

### Rigging the Camera
Do not jump the camera abruptly. Use a virtual camera rig or dampening interpolation:

```tsx
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const targetPosition = new THREE.Vector3();
const targetLookAt = new THREE.Vector3();

export function PlanetaryCameraRig({ activeWaypoint, lerpFactor = 0.05 }) {
  useFrame((state) => {
    targetPosition.set(activeWaypoint.x, activeWaypoint.y, activeWaypoint.z);
    targetLookAt.set(activeWaypoint.lookX, activeWaypoint.lookY, activeWaypoint.lookZ);

    // Smooth spherical dampening
    state.camera.position.lerp(targetPosition, lerpFactor);
    state.camera.lookAt(targetLookAt);
  });

  return null;
}
```

### GSAP Camera Driving
To drive the 3D camera along orbital trajectories via ScrollTrigger:
```tsx
const cameraCoords = { x: 0, y: 10, z: 200, lookX: 0, lookY: 0, lookZ: 0 };

ScrollTrigger.create({
  trigger: '#jupiter-encounter',
  start: 'top top',
  end: '+=400%',
  scrub: 1,
  onUpdate: (self) => {
    // Interpolate coordinates along orbital bezier
    const p = self.progress;
    cameraCoords.z = 200 - p * 150;
    cameraCoords.x = Math.sin(p * Math.PI) * 40;
    cameraCoords.lookY = Math.cos(p * Math.PI) * 5;
  },
});
```

---

## 3. Realistic Planetary Imagery & Shaders
- **Atmospheric Scattering**: Use custom Fresnel shaders or inverted normal rim lights for gas giants (Jupiter, Saturn, Neptune) to simulate Rayleigh scattering.
- **Ring Systems**: Use alpha-tested textures with double-sided rendering and cast ring shadows onto the planetary sphere.
- **True Scientific Proportions**: When illustrating flybys, respect planetary oblateness and realistic lighting angles (single directional sunlight representing the distant Sun).
- **Texture Optimization**: Use power-of-two (2048x1024 or 4096x2048) compressed WebP textures. Load textures asynchronously with `<Suspense>` and progressive resolution bumps.
