import { useState, useRef, useMemo, Component, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
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
    size: 1.15,
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

// Error Boundary ensuring the viewport never becomes black if WebGL crashes
interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class OrreryErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('Orrery WebGL stage encountered an error; falling back to 2D vector schematic:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Orbit path line rendered via R3F primitive
function OrbitLine({ radius, isSelected }: { radius: number; isSelected: boolean }) {
  const lineMesh = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(pts);
    const material = new THREE.LineBasicMaterial({
      color: isSelected ? '#fbbf24' : '#64748b',
      transparent: true,
      opacity: isSelected ? 0.95 : 0.35,
    });
    return new THREE.Line(geometry, material);
  }, [radius, isSelected]);

  return <primitive object={lineMesh} />;
}

// The Sun at the center of the solar system
function Sun({
  world,
  isSelected,
  onSelect,
}: {
  world: WorldData;
  isSelected: boolean;
  onSelect: (w: WorldData) => void;
}) {
  return (
    <group position={[0, 0, 0]}>
      {/* Central Star Mesh */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(world);
        }}
      >
        <sphereGeometry args={[world.size, 32, 32]} />
        <meshBasicMaterial color={world.color} />
      </mesh>

      {/* Primary Omnidirectional Solar PointLight */}
      <pointLight intensity={4.5} distance={35} color="#fffbeb" />

      {/* Solar Corona Glow Sphere */}
      <mesh>
        <sphereGeometry args={[world.size * 1.35, 32, 32]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Selected Star Reticle */}
      {isSelected && (
        <mesh>
          <sphereGeometry args={[world.size * 1.6, 20, 20]} />
          <meshBasicMaterial
            color="#fbbf24"
            wireframe
            transparent
            opacity={0.65}
          />
        </mesh>
      )}
    </group>
  );
}

// Orbiting planetary body with specific geometry for Earth & Moon, Mars, Eros, and Ceres
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
  const groupRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef<number>(world.initialAngle);

  useFrame((_, delta) => {
    if (!isPaused && world.speed > 0) {
      angleRef.current += delta * world.speed * 0.4;

      if (groupRef.current) {
        groupRef.current.position.x = Math.cos(angleRef.current) * world.orbitRadius;
        groupRef.current.position.z = Math.sin(angleRef.current) * world.orbitRadius;
        groupRef.current.rotation.y += delta * 0.8;
      }

      if (moonRef.current) {
        // Lunar orbit around Earth
        const moonAngle = angleRef.current * 4;
        moonRef.current.position.x = Math.cos(moonAngle) * 0.65;
        moonRef.current.position.z = Math.sin(moonAngle) * 0.65;
      }
    }
  });

  if (world.orbitRadius === 0) {
    return <Sun world={world} isSelected={isSelected} onSelect={onSelect} />;
  }

  const initialX = Math.cos(world.initialAngle) * world.orbitRadius;
  const initialZ = Math.sin(world.initialAngle) * world.orbitRadius;

  return (
    <group
      ref={groupRef}
      position={[initialX, 0, initialZ]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(world);
      }}
    >
      {/* Earth & The Moon System */}
      {world.id === 'earth-moon' && (
        <group>
          {/* Earth Body */}
          <mesh>
            <sphereGeometry args={[world.size, 28, 28]} />
            <meshStandardMaterial
              color={world.color}
              roughness={0.4}
              metalness={0.1}
              emissive={isSelected ? '#0284c7' : '#000000'}
              emissiveIntensity={isSelected ? 0.4 : 0}
            />
          </mesh>

          {/* Lunar Orbit Ring */}
          <primitive
            object={useMemo(() => {
              const pts = Array.from({ length: 65 }, (_, i) => {
                const a = (i / 64) * Math.PI * 2;
                return new THREE.Vector3(Math.cos(a) * 0.65, 0, Math.sin(a) * 0.65);
              });
              const geom = new THREE.BufferGeometry().setFromPoints(pts);
              const mat = new THREE.LineBasicMaterial({ color: '#94a3b8', transparent: true, opacity: 0.35 });
              return new THREE.Line(geom, mat);
            }, [])}
          />

          {/* Lunar Companion (The Moon) */}
          <mesh ref={moonRef} position={[0.65, 0, 0]}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
          </mesh>
        </group>
      )}

      {/* Mars Body */}
      {world.id === 'mars' && (
        <group>
          <mesh>
            <sphereGeometry args={[world.size, 24, 24]} />
            <meshStandardMaterial
              color={world.color}
              roughness={0.6}
              metalness={0.1}
              emissive={isSelected ? '#dc2626' : '#000000'}
              emissiveIntensity={isSelected ? 0.4 : 0}
            />
          </mesh>
          {/* North Polar Ice Cap */}
          <mesh position={[0, world.size * 0.9, 0]}>
            <sphereGeometry args={[world.size * 0.35, 12, 12]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
        </group>
      )}

      {/* Asteroid 433 Eros Body (Elongated Shape) */}
      {world.id === 'eros' && (
        <mesh scale={[1.65, 0.85, 0.75]}>
          <sphereGeometry args={[world.size, 18, 18]} />
          <meshStandardMaterial
            color={world.color}
            roughness={0.85}
            metalness={0.2}
            emissive={isSelected ? '#71717a' : '#000000'}
            emissiveIntensity={isSelected ? 0.3 : 0}
          />
        </mesh>
      )}

      {/* Dwarf Planet Ceres Body */}
      {world.id === 'ceres' && (
        <group>
          <mesh>
            <sphereGeometry args={[world.size, 24, 24]} />
            <meshStandardMaterial
              color={world.color}
              roughness={0.7}
              metalness={0.1}
              emissive={isSelected ? '#cbd5e1' : '#000000'}
              emissiveIntensity={isSelected ? 0.3 : 0}
            />
          </mesh>
          {/* Occator Crater Sodium Carbonate Bright Spot */}
          <mesh position={[world.size * 0.7, world.size * 0.45, world.size * 0.45]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      )}

      {/* Selected Target Golden Reticle Wireframe */}
      {isSelected && (
        <mesh>
          <sphereGeometry args={[world.size * 1.6, 16, 16]} />
          <meshBasicMaterial
            color="#fbbf24"
            wireframe
            transparent
            opacity={0.65}
          />
        </mesh>
      )}
    </group>
  );
}

// 2D High-Precision Vector Schematic Orrery (Guaranteed Fallback & Accessible Display)
function Interactive2DOrrery({
  worlds,
  selectedWorld,
  onSelectWorld,
}: {
  worlds: WorldData[];
  selectedWorld: WorldData;
  onSelectWorld: (w: WorldData) => void;
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-radial-vignette select-none">
      <svg
        viewBox="-175 -175 350 350"
        className="w-full h-full max-h-[440px]"
        aria-label="2D Interactive Solar System Orrery Diagram"
      >
        <defs>
          <radialGradient id="svg-sun-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="svg-sun-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
        </defs>

        {/* Concentric Orbital Tracks */}
        {worlds.filter((w) => w.orbitRadius > 0).map((w) => {
          const isSelected = selectedWorld.id === w.id;
          const svgR = w.orbitRadius * 18.5;
          return (
            <circle
              key={`orbit-line-${w.id}`}
              cx="0"
              cy="0"
              r={svgR}
              fill="none"
              stroke={isSelected ? '#fbbf24' : '#475569'}
              strokeWidth={isSelected ? '2' : '1'}
              strokeDasharray={isSelected ? 'none' : '4 3'}
              opacity={isSelected ? 0.95 : 0.4}
            />
          );
        })}

        {/* The Sun at (0, 0) */}
        <g
          className="cursor-pointer"
          onClick={() => onSelectWorld(worlds[0])}
          tabIndex={0}
          role="button"
          aria-label="Select The Sun"
        >
          <circle cx="0" cy="0" r="26" fill="url(#svg-sun-glow)" opacity="0.6" />
          <circle cx="0" cy="0" r="15" fill="url(#svg-sun-core)" />
          {selectedWorld.id === 'sun' && (
            <circle cx="0" cy="0" r="21" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 2" />
          )}
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fill="#05070a"
            fontSize="8"
            fontWeight="bold"
            fontFamily="monospace"
          >
            SOL
          </text>
        </g>

        {/* Planetary Bodies */}
        {worlds.filter((w) => w.orbitRadius > 0).map((w) => {
          const isSelected = selectedWorld.id === w.id;
          const svgR = w.orbitRadius * 18.5;
          const cx = Math.cos(w.initialAngle) * svgR;
          const cy = Math.sin(w.initialAngle) * svgR;
          const baseSize = Math.max(w.size * 18, 5.5);

          return (
            <g
              key={`svg-planet-${w.id}`}
              className="cursor-pointer"
              onClick={() => onSelectWorld(w)}
              tabIndex={0}
              role="button"
              aria-label={`Select ${w.name}`}
            >
              {/* Target Reticle Ring */}
              {isSelected && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={baseSize + 7}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1.8"
                  strokeDasharray="4 2"
                />
              )}

              {/* Planetary Sphere Body */}
              <circle
                cx={cx}
                cy={cy}
                r={baseSize}
                fill={w.color}
                stroke={isSelected ? '#ffffff' : 'rgba(255,255,255,0.2)'}
                strokeWidth="1"
              />

              {/* Earth's Companion Moon */}
              {w.id === 'earth-moon' && (
                <g>
                  <circle cx={cx + 10} cy={cy - 5} r="3" fill="#cbd5e1" stroke="#ffffff" strokeWidth="0.5" />
                  <text
                    x={cx + 15}
                    y={cy - 3}
                    fill="#cbd5e1"
                    fontSize="7"
                    fontFamily="monospace"
                  >
                    MOON
                  </text>
                </g>
              )}

              {/* Name Label */}
              <text
                x={cx}
                y={cy + baseSize + 11}
                textAnchor="middle"
                fill={isSelected ? '#fbbf24' : '#e2e8f0'}
                fontSize="8"
                fontFamily="monospace"
                fontWeight={isSelected ? 'bold' : 'normal'}
              >
                {w.id === 'earth-moon' ? 'EARTH' : w.name.toUpperCase().replace(/\(.*\)/, '').trim()}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="absolute top-3 left-4 text-[10px] font-mono text-zinc-400 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10 pointer-events-none">
        <span>2D VECTOR SCHEMATIC MODE // ACCESSIBLE ORBITAL OVERVIEW</span>
      </div>
    </div>
  );
}

export function InteractiveSolarSystem() {
  const { isReducedMotion } = useNavigation();
  const { isWebGLSupported, is3DEnabled, qualityTier } = useWebGL();

  const [selectedWorld, setSelectedWorld] = useState<WorldData>(WORLDS[2]); // Default to Mars
  // Under reduced-motion preferences, orbits start in stationary mode; user can toggle resume
  const [isPaused, setIsPaused] = useState<boolean>(() => isReducedMotion);

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

      {/* Orrery Viewport Stage */}
      <div className="relative w-full h-[380px] sm:h-[460px] rounded-xl bg-space-black/90 border border-white/10 overflow-hidden shadow-inner flex items-center justify-center">
        {isWebGLSupported && is3DEnabled ? (
          <OrreryErrorBoundary
            fallback={
              <Interactive2DOrrery
                worlds={WORLDS}
                selectedWorld={selectedWorld}
                onSelectWorld={setSelectedWorld}
              />
            }
          >
            <Canvas
              camera={{ position: [0, 9.8, 11.5], fov: 46 }}
              dpr={[1, qualityTier === 'high' ? 1.5 : 1]}
              gl={{ alpha: true, antialias: qualityTier !== 'low' }}
            >
              {/* Comprehensive Ambient & Directional Lighting */}
              <ambientLight intensity={0.55} />
              <directionalLight position={[0, 15, 8]} intensity={0.8} color="#ffffff" />

              {/* Tilted Planetary Orbital Plane */}
              <group rotation={[0.22, 0, 0]}>
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

              {/* Smooth Camera Drag & Orbit Inspection */}
              <OrbitControls
                enableZoom={true}
                enablePan={false}
                minDistance={5}
                maxDistance={24}
                maxPolarAngle={Math.PI / 2.05}
                autoRotate={false}
                enableDamping={true}
                dampingFactor={0.05}
              />
            </Canvas>
          </OrreryErrorBoundary>
        ) : (
          /* Guaranteed Accessible 2D Vector Schematic Fallback */
          <Interactive2DOrrery
            worlds={WORLDS}
            selectedWorld={selectedWorld}
            onSelectWorld={setSelectedWorld}
          />
        )}

        {/* Top-Left Drag to Orbit Hint */}
        {isWebGLSupported && is3DEnabled && (
          <div className="absolute top-3 left-3 text-[10px] font-mono text-zinc-400 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 pointer-events-none z-10 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-stellar-cyan animate-pulse" />
            <span>DRAG TO ORBIT // WHEEL TO ZOOM</span>
          </div>
        )}

        {/* Top-Right Simulation Controls & Motion Status */}
        <div className="absolute top-3 right-3 flex items-center space-x-2 z-10 font-mono text-xs">
          {isReducedMotion && (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-zinc-800/80 border border-white/10 text-[10px] text-zinc-400">
              STATIONARY ORBITS (REDUCED MOTION)
            </span>
          )}
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="px-2.5 py-1 rounded bg-black/75 border border-white/20 text-stellar-white hover:border-stellar-gold transition-colors focus-visible:ring-1 focus-visible:ring-stellar-gold cursor-pointer"
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
                className={`px-3 py-1.5 rounded whitespace-nowrap transition-all focus-visible:ring-1 focus-visible:ring-stellar-gold cursor-pointer ${
                  isSelected
                    ? 'bg-stellar-gold text-space-black font-bold shadow-[0_0_10px_rgba(232,154,60,0.4)]'
                    : 'bg-black/75 border border-white/15 text-zinc-300 hover:text-stellar-white hover:border-white/30'
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
