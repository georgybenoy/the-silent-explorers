import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useNavigation } from '../../context/NavigationContext';
import { useWebGL } from '../../context/WebGLContext';

interface WorldData {
  id: string;
  name: string;
  type: string;
  distanceAU: string;
  orbitalPeriodDays: string;
  gravity: string;
  explorers: string[];
  orbitRadius: number;
  size: number;
  color: string;
  emissive?: string;
  speed: number;
  initialAngle: number;
  description: string;
}

const WORLDS: WorldData[] = [
  {
    id: 'sun',
    name: 'The Sun (Sol)',
    type: 'G-Type Main-Sequence Star',
    distanceAU: '0.000 AU',
    orbitalPeriodDays: 'N/A',
    gravity: '274.0 m/s²',
    explorers: ['Interplanetary Solar Wind & Gravitational Anchor'],
    orbitRadius: 0,
    size: 1.1,
    color: '#fbbf24',
    emissive: '#d97706',
    speed: 0,
    initialAngle: 0,
    description: 'The gravitational anchor of the solar system, driving solar wind and powering all photovoltaic spacecraft missions.',
  },
  {
    id: 'earth-moon',
    name: 'Earth & The Moon',
    type: 'Terrestrial World & Lunar Satellite',
    distanceAU: '1.000 AU (149.6M km)',
    orbitalPeriodDays: '365.25 Days',
    gravity: '9.81 m/s² (Earth) / 1.62 m/s² (Moon)',
    explorers: ['Apollo 17 LRV (1972)', 'Apollo 15 ALSEP & LRRR (1971)'],
    orbitRadius: 2.8,
    size: 0.35,
    color: '#38bdf8',
    speed: 0.35,
    initialAngle: 0.8,
    description: 'The cradle of human exploration. The Moon preserves humanity’s first extraterrestrial wheeled rover and nuclear ALSEP scientific packages in vacuum.',
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'Fourth Terrestrial Planet',
    distanceAU: '1.524 AU (227.9M km)',
    orbitalPeriodDays: '687 Days',
    gravity: '3.72 m/s²',
    explorers: [
      'Sojourner (1997)',
      'Spirit MER-A (2004)',
      'Opportunity MER-B (2004)',
      'Ingenuity (2021)',
    ],
    orbitRadius: 4.4,
    size: 0.28,
    color: '#ef4444',
    speed: 0.25,
    initialAngle: 2.3,
    description: 'The cold iron-oxide desert. Four pioneering robotic explorers traversed ancient lakebeds, volcanic plains, and thin atmosphere, now resting in silence.',
  },
  {
    id: 'eros',
    name: 'Asteroid 433 Eros',
    type: 'Near-Earth S-Type Asteroid',
    distanceAU: '1.458 AU (Mean)',
    orbitalPeriodDays: '643 Days',
    gravity: '0.0059 m/s²',
    explorers: ['NEAR Shoemaker (2001)'],
    orbitRadius: 5.6,
    size: 0.18,
    color: '#a1a1aa',
    speed: 0.22,
    initialAngle: 4.1,
    description: 'A 34-km elongated rocky asteroid. NEAR Shoemaker executed history’s first soft asteroid touchdown here on February 12, 2001.',
  },
  {
    id: 'ceres',
    name: 'Dwarf Planet Ceres',
    type: 'Main Asteroid Belt Dwarf Planet',
    distanceAU: '2.767 AU (413.9M km)',
    orbitalPeriodDays: '1,682 Days',
    gravity: '0.28 m/s²',
    explorers: ['Dawn Spacecraft (2015–2018)'],
    orbitRadius: 7.2,
    size: 0.25,
    color: '#e2e8f0',
    speed: 0.16,
    initialAngle: 5.2,
    description: 'The largest object in the Main Asteroid Belt, bearing mysterious sodium carbonate bright spots at Occator Crater. Dawn orbits here in eternal silence.',
  },
];

function OrbitLine({ radius, isSelected }: { radius: number; isSelected: boolean }) {
  const linePoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return pts;
  }, [radius]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [linePoints]);

  return (
    <primitive
      object={
        new THREE.Line(
          lineGeometry,
          new THREE.LineBasicMaterial({
            color: isSelected ? '#fbbf24' : '#ffffff',
            transparent: true,
            opacity: isSelected ? 0.6 : 0.12,
          })
        )
      }
    />
  );
}

function OrbitingBody({
  world,
  isSelected,
  onSelect,
  isPaused,
}: {
  world: WorldData;
  isSelected: boolean;
  onSelect: (w: WorldData) => void;
  isPaused: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef<number>(world.initialAngle);

  useFrame((_, delta) => {
    if (isPaused || world.speed === 0) return;
    angleRef.current += delta * world.speed * 0.4;

    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angleRef.current) * world.orbitRadius;
      meshRef.current.position.z = Math.sin(angleRef.current) * world.orbitRadius;
      meshRef.current.rotation.y += delta * 0.8;
    }
  });

  if (world.orbitRadius === 0) {
    // Sun
    return (
      <group position={[0, 0, 0]}>
        <mesh onClick={() => onSelect(world)}>
          <sphereGeometry args={[world.size, 32, 32]} />
          <meshBasicMaterial color={world.color} />
        </mesh>
        <pointLight intensity={3.5} distance={20} color="#fffbeb" />
        {/* Solar Corona Glow */}
        <mesh>
          <sphereGeometry args={[world.size * 1.35, 32, 32]} />
          <meshBasicMaterial
            color="#f59e0b"
            transparent
            opacity={0.25}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    );
  }

  return (
    <mesh
      ref={meshRef}
      position={[
        Math.cos(world.initialAngle) * world.orbitRadius,
        0,
        Math.sin(world.initialAngle) * world.orbitRadius,
      ]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(world);
      }}
    >
      <sphereGeometry args={[world.size, 24, 24]} />
      <meshStandardMaterial
        color={world.color}
        roughness={0.6}
        metalness={0.1}
        emissive={isSelected ? world.color : '#000000'}
        emissiveIntensity={isSelected ? 0.35 : 0}
      />
      {isSelected && (
        <mesh>
          <sphereGeometry args={[world.size * 1.5, 16, 16]} />
          <meshBasicMaterial
            color="#fbbf24"
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      )}
    </mesh>
  );
}

export function InteractiveSolarSystem() {
  const [selectedWorld, setSelectedWorld] = useState<WorldData>(WORLDS[2]); // Default to Mars
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const { isReducedMotion } = useNavigation();
  const { isWebGLSupported, is3DEnabled, qualityTier } = useWebGL();

  return (
    <div className="w-full rounded-2xl bg-space-card/70 border border-white/10 p-6 sm:p-10 space-y-6 overflow-hidden">
      {/* Header and Telemetry Tag */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-stellar-cyan mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-stellar-cyan animate-pulse" />
            <span className="uppercase tracking-widest font-semibold">
              CHAPTER II // ORBITAL ORRERY & TRANSIT MECHANICS
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-bold text-stellar-white">
            Interplanetary Horizons
          </h3>
        </div>

        {/* Scientific Disclaimer Badge */}
        <div className="px-3 py-1.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-zinc-400">
          <span className="text-stellar-amber font-bold">ℹ NOTE:</span> SIZES & ORBITAL DISTANCES SCALED FOR EDUCATIONAL DISPLAY (NOT TO SCALE)
        </div>
      </div>

      {/* 3D Orrery Viewport Stage */}
      <div className="relative w-full h-[380px] sm:h-[460px] rounded-xl bg-space-black/90 border border-white/10 overflow-hidden shadow-inner flex items-center justify-center">
        {isWebGLSupported && is3DEnabled && !isReducedMotion ? (
          <Canvas
            camera={{ position: [0, 8.5, 9.5], fov: 45 }}
            dpr={[1, qualityTier === 'high' ? 1.5 : 1]}
            gl={{ alpha: true, antialias: qualityTier !== 'low' }}
          >
            <ambientLight intensity={0.15} />
            <group rotation={[0.2, 0, 0]}>
              {WORLDS.map((w) => (
                <group key={w.id}>
                  {w.orbitRadius > 0 && (
                    <OrbitLine
                      radius={w.orbitRadius}
                      isSelected={selectedWorld.id === w.id}
                    />
                  )}
                  <OrbitingBody
                    world={w}
                    isSelected={selectedWorld.id === w.id}
                    onSelect={setSelectedWorld}
                    isPaused={isPaused}
                  />
                </group>
              ))}
            </group>
          </Canvas>
        ) : (
          /* High-Resolution Static Fallback for Reduced Motion or No WebGL */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-radial-vignette">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-stellar-cyan/40 flex items-center justify-center mb-4">
              <span className="text-3xl">🪐</span>
            </div>
            <h4 className="font-display text-xl font-bold text-stellar-white mb-2">
              Planetary System Exploration
            </h4>
            <p className="text-xs font-mono text-stellar-muted max-w-md">
              Interactive 3D Orrery adapted for reduced-motion and accessibility. Select any target world below to inspect orbital and transit mechanics.
            </p>
          </div>
        )}

        {/* Top-Right Simulation Controls */}
        <div className="absolute top-3 right-3 flex items-center space-x-2 z-10 font-mono text-xs">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="px-2.5 py-1 rounded bg-black/60 border border-white/15 text-stellar-white hover:border-stellar-gold transition-colors focus-visible:ring-1 focus-visible:ring-stellar-gold"
            aria-label={isPaused ? 'Resume planetary orbit simulation' : 'Pause planetary orbit simulation'}
          >
            {isPaused ? '▶ RESUME' : '❚❚ PAUSE'}
          </button>
        </div>

        {/* Interactive World Selector Buttons Overlay */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-center gap-1.5 overflow-x-auto pb-1 z-10 font-mono text-xs">
          {WORLDS.map((w) => {
            const isSelected = selectedWorld.id === w.id;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => setSelectedWorld(w)}
                className={`px-3 py-1.5 rounded whitespace-nowrap transition-all focus-visible:ring-1 focus-visible:ring-stellar-gold ${
                  isSelected
                    ? 'bg-stellar-gold text-space-black font-bold shadow-[0_0_10px_rgba(232,154,60,0.4)]'
                    : 'bg-black/70 border border-white/10 text-zinc-300 hover:text-stellar-white hover:border-white/30'
                }`}
                aria-label={`Select ${w.name}`}
              >
                {w.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected World Scientific Telemetry Dossier Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {/* Left Column: Identification */}
        <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
            SELECTED TARGET DESTINATION
          </span>
          <h4 className="font-display text-xl font-bold text-stellar-white">
            {selectedWorld.name}
          </h4>
          <span className="text-xs text-stellar-gold block">
            {selectedWorld.type}
          </span>
          <p className="text-[11px] text-zinc-400 leading-relaxed pt-1">
            {selectedWorld.description}
          </p>
        </div>

        {/* Middle Column: Planetary Physical Constants */}
        <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-3">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
            ORBITAL TELEMETRY & CONSTANTS
          </span>
          <div className="space-y-2">
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase">MEAN DISTANCE FROM SUN</span>
              <span className="text-stellar-white font-bold">{selectedWorld.distanceAU}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase">ORBITAL PERIOD</span>
              <span className="text-stellar-cyan font-bold">{selectedWorld.orbitalPeriodDays}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase">SURFACE GRAVITATIONAL ACCELERATION</span>
              <span className="text-stellar-amber font-bold">{selectedWorld.gravity}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Mission Lineage */}
        <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
            ABANDONED EXPLORERS TRACKED HERE
          </span>
          <ul className="space-y-1.5 pt-1">
            {selectedWorld.explorers.map((exp, idx) => (
              <li
                key={idx}
                className="px-2.5 py-1.5 rounded bg-white/5 border border-white/5 text-stellar-white text-[11px] flex items-center space-x-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-stellar-gold" />
                <span>{exp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
