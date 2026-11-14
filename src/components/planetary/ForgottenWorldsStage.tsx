import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useNavigation } from '../../context/NavigationContext';
import { useWebGL } from '../../context/WebGLContext';

interface PlanetaryEnvironment {
  id: string;
  name: string;
  subtitle: string;
  category: 'Moon' | 'Mars' | 'Beyond Mars';
  radiusKm: string;
  surfaceTemp: string;
  atmosphere: string;
  gravity: string;
  coordinates: string;
  environmentStory: string;
  explorersPresent: string[];
  fallbackImage: string;
  color: string;
  roughness: number;
  irregular?: boolean;
}

const PLANETARY_ENVIRONMENTS: PlanetaryEnvironment[] = [
  {
    id: 'moon',
    name: 'The Moon',
    subtitle: 'Mare Basalts & Highland Massifs // 1.0 AU',
    category: 'Moon',
    radiusKm: '1,737.4 km (0.272 Earth)',
    surfaceTemp: '-173°C to +117°C (Day/Night Extreme)',
    atmosphere: 'Hard Vacuum (Surface Boundary Exosphere, <10⁻¹⁰ Pa)',
    gravity: '1.62 m/s² (0.166 g)',
    coordinates: 'Taurus-Littrow (20.19° N, 30.78° E) & Hadley Rille (26.13° N, 3.63° E)',
    environmentStory:
      'Airless, pulverized impact regolith subjected to unattenuated micrometeorite bombardment and cosmic rays. Apollo 17 LRV-3 remains parked on the basalt valley floor; Apollo 15 ALSEP scientific station sits undisturbed near the 300-meter-deep canyon of Hadley Rille.',
    explorersPresent: ['Apollo 17 LRV-3', 'Apollo 15 ALSEP', 'Apollo 15 LRRR (Associated Retroreflector)'],
    fallbackImage: '/images/chapter1/hadley_rille.jpg',
    color: '#8c92ac',
    roughness: 0.9,
  },
  {
    id: 'mars',
    name: 'Mars',
    subtitle: 'Iron-Oxide Deserts & Ancient Paleochannels // 1.52 AU',
    category: 'Mars',
    radiusKm: '3,389.5 km (0.532 Earth)',
    surfaceTemp: '-125°C to +20°C (Average -63°C)',
    atmosphere: '95.3% CO₂ (~610 Pa surface pressure, ~0.6% Earth)',
    gravity: '3.72 m/s² (0.379 g)',
    coordinates: 'Ares Vallis, Gusev Crater, Meridiani Planum, Jezero Crater',
    environmentStory:
      'A hyper-arid, frozen desert swept by seasonal dust devils and global planet-encircling storms. Four NASA robotic explorers traversed ancient hydrothermal beds, sulfate dunes, and clay deposits before resting forever in the orange dust.',
    explorersPresent: ['Sojourner (1997)', 'Spirit MER-A (2004)', 'Opportunity MER-B (2004)', 'Ingenuity (2021)'],
    fallbackImage: '/images/chapter1/ares_vallis.jpg',
    color: '#c25835',
    roughness: 0.75,
  },
  {
    id: 'ceres',
    name: 'Dwarf Planet Ceres',
    subtitle: 'Carbonaceous Ice-Rock World // 2.77 AU (Asteroid Belt)',
    category: 'Beyond Mars',
    radiusKm: '473 km (Largest Asteroid Belt Object)',
    surfaceTemp: '-105°C to -38°C',
    atmosphere: 'Transient Water Vapor Exosphere during Perihelion',
    gravity: '0.28 m/s² (0.029 g)',
    coordinates: 'Uncontrolled Planetary Protection Parking Orbit (No Surface Landing)',
    environmentStory:
      'Dark, heavily cratered clay and carbonate surface harbouring high-albedo sodium carbonate deposits in Occator Crater. NASA Dawn expended all hydrazine attitude fuel in October 2018 and was placed in a stable parking orbit to avoid bio-contaminating potential subsurface brine.',
    explorersPresent: ['Dawn Spacecraft (Orbital Silence)'],
    fallbackImage: '/images/artifacts/dawn.jpg',
    color: '#94a3b8',
    roughness: 0.85,
  },
  {
    id: 'eros',
    name: 'Asteroid 433 Eros',
    subtitle: 'S-Type Stony Silicate Asteroid // 1.46 AU',
    category: 'Beyond Mars',
    radiusKm: '17 × 5.5 × 5.5 km (Elongated Irregular)',
    surfaceTemp: '-150°C to +100°C',
    atmosphere: 'Zero (Negligible Microgravity)',
    gravity: '0.0059 m/s² (0.0006 g)',
    coordinates: '35° S, 279° W (Himeros Saddle, Body-Fixed Frame)',
    environmentStory:
      'A fractured, potato-shaped fragment of an ancient asteroid collision covered in fine-grained regolith ponding. On February 12, 2001, NEAR Shoemaker executed history’s first gentle touchdown on an asteroid at 1.9 m/s, transmitting science data for 16 days before cold shutdown.',
    explorersPresent: ['NEAR Shoemaker (Landed Spacecraft)'],
    fallbackImage: '/images/artifacts/near-shoemaker.jpg',
    color: '#a8a29e',
    roughness: 0.95,
    irregular: true,
  },
];

function PlanetaryMesh({ env, isReducedMotion }: { env: PlanetaryEnvironment; isReducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Procedural Surface Texture
  const surfaceTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    ctx.fillStyle = env.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add crater / texture noise
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = 4 + Math.random() * 25;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Bright faculae spots for Ceres
    if (env.id === 'ceres') {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(250, 110, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    return texture;
  }, [env]);

  useFrame((_, delta) => {
    if (isReducedMotion || !meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
    if (env.irregular) {
      meshRef.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        {env.irregular ? (
          // Asteroid Eros: Elongated irregular geometry
          <boxGeometry args={[2.4, 1.1, 1.1, 16, 16, 16]} />
        ) : (
          // Spherical planetary world
          <sphereGeometry args={[1.4, 48, 48]} />
        )}
        <meshStandardMaterial
          map={surfaceTexture}
          roughness={env.roughness}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

export function ForgottenWorldsStage() {
  const [selectedEnvId, setSelectedEnvId] = useState<string>('mars');
  const activeEnv = PLANETARY_ENVIRONMENTS.find((e) => e.id === selectedEnvId) || PLANETARY_ENVIRONMENTS[1];
  const { isReducedMotion } = useNavigation();
  const { isWebGLSupported, is3DEnabled, qualityTier } = useWebGL();

  return (
    <div className="w-full rounded-2xl bg-space-card/70 border border-white/10 p-6 sm:p-10 space-y-6 overflow-hidden">
      {/* Header and Telemetry Tag */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-stellar-amber mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-stellar-amber animate-pulse" />
            <span className="uppercase tracking-widest font-semibold">
              CHAPTER III // PLANETARY ENVIRONMENTS & RESTING SITES
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl font-bold text-stellar-white">
            The Forgotten Worlds
          </h3>
        </div>

        {/* World Selection Tabs */}
        <div
          role="tablist"
          aria-label="Select planetary theater"
          className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-black/60 border border-white/10 font-mono text-xs"
        >
          {PLANETARY_ENVIRONMENTS.map((env) => {
            const isSelected = env.id === activeEnv.id;
            return (
              <button
                key={env.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedEnvId(env.id)}
                className={`px-3 py-1.5 rounded transition-all focus-visible:ring-1 focus-visible:ring-stellar-gold ${
                  isSelected
                    ? 'bg-stellar-gold text-space-black font-bold shadow-[0_0_10px_rgba(232,154,60,0.4)]'
                    : 'text-zinc-400 hover:text-stellar-white hover:bg-white/5'
                }`}
              >
                {env.name.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dual Grid: Interactive 3D World Stage + Archival Photography & Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left Column: Interactive 3D World Stage */}
        <div className="relative h-[340px] sm:h-[400px] rounded-xl bg-space-black/90 border border-white/10 overflow-hidden flex items-center justify-center shadow-inner">
          {isWebGLSupported && is3DEnabled && !isReducedMotion ? (
            <Canvas
              camera={{ position: [0, 0, 3.8], fov: 45 }}
              dpr={[1, qualityTier === 'high' ? 1.5 : 1]}
              gl={{ alpha: true, antialias: qualityTier !== 'low' }}
            >
              <ambientLight intensity={0.2} />
              <directionalLight position={[4, 2, 4]} intensity={2.2} color="#ffffff" />
              <pointLight position={[-4, -2, -3]} intensity={0.3} color="#93c5fd" />
              <PlanetaryMesh env={activeEnv} isReducedMotion={isReducedMotion} />
            </Canvas>
          ) : (
            /* NASA Fallback Imagery */
            <div className="absolute inset-0">
              <img
                src={activeEnv.fallbackImage}
                alt={activeEnv.name}
                className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
          )}

          {/* Interactive World Title Badge */}
          <div className="absolute top-3 left-3 px-3 py-1.5 rounded bg-black/70 border border-white/10 backdrop-blur-md font-mono text-xs text-stellar-white">
            <span className="text-stellar-gold font-bold">{activeEnv.name}</span>
            <span className="text-zinc-500 ml-2">// 3D PLANETARY STAGE</span>
          </div>
        </div>

        {/* Right Column: Physical Environment Dossier */}
        <div className="p-6 rounded-xl bg-black/50 border border-white/10 flex flex-col justify-between space-y-4 font-mono text-xs">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                PLANETARY PROFILE & SURFACE METRICS
              </span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-stellar-cyan">
                {activeEnv.category.toUpperCase()}
              </span>
            </div>

            <h4 className="font-display text-2xl font-bold text-stellar-white mb-1">
              {activeEnv.name}
            </h4>
            <p className="text-xs text-stellar-gold mb-3">
              {activeEnv.subtitle}
            </p>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-4">
              {activeEnv.environmentStory}
            </p>

            {/* Metrics Matrix */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/5">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">MEAN RADIUS</span>
                <span className="text-stellar-white font-semibold">{activeEnv.radiusKm}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">SURFACE GRAVITY</span>
                <span className="text-stellar-amber font-semibold">{activeEnv.gravity}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">SURFACE TEMPERATURE</span>
                <span className="text-stellar-cyan font-semibold">{activeEnv.surfaceTemp}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">ATMOSPHERE</span>
                <span className="text-stellar-white font-semibold truncate block" title={activeEnv.atmosphere}>
                  {activeEnv.atmosphere}
                </span>
              </div>
            </div>
          </div>

          {/* Active Artifact Presence */}
          <div className="pt-3 border-t border-white/10">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-2">
              DISCARDED / ENDURING ARTIFACTS IN THIS THEATER
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeEnv.explorersPresent.map((exp, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] text-stellar-white"
                >
                  {exp}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
