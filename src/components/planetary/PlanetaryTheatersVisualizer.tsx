import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWebGL } from '../../context/WebGLContext';
import { useNavigation } from '../../context/NavigationContext';

interface TheaterInfo {
  id: string;
  destination: string;
  name: string;
  targetBody: string;
  gravity: string;
  temperature: string;
  coordinates: string[];
  explorers: string[];
  description: string;
  color: string;
  accentClass: string;
}

const THEATERS: Record<string, TheaterInfo> = {
  moon: {
    id: 'moon',
    destination: 'Moon',
    name: 'Lunar Surface Theaters',
    targetBody: 'The Moon',
    gravity: '0.166 g (1.62 m/s²)',
    temperature: '-130°C to +120°C',
    coordinates: [
      '20.1896° N, 30.7769° E (VIP Camera Parking Site, Taurus-Littrow — Apollo 17 LRV)',
      '26.13406° N, 3.62991° E (Hadley-Apennine — Apollo 15 ALSEP Central Station & distinct LRRR)',
    ],
    explorers: ['Apollo 17 LRV', 'Apollo 15 ALSEP', 'Apollo 15 LRRR'],
    description: 'Airless, micrometeorite-bombarded regolith with preserved astronaut foot-tracks, wheel ruts, and unpowered retroreflector arrays still hit by terrestrial lasers.',
    color: '#38bdf8',
    accentClass: 'border-stellar-cyan/40 text-stellar-cyan bg-stellar-cyan/10',
  },
  mars: {
    id: 'mars',
    destination: 'Mars',
    name: 'Martian Basalt & Iron Regolith',
    targetBody: 'Mars',
    gravity: '0.379 g (3.72 m/s²)',
    temperature: '-125°C to +20°C',
    coordinates: [
      '19.33° N, 33.55° W (Ares Vallis — Mars Pathfinder / Sojourner landing vicinity)',
      '14.6083° S, 175.5262° E (Final resting site at Troy, Gusev Crater — Spirit)',
      '1.9462° S, 354.4734° E (Perseverance Valley, Endeavour Rim — Opportunity)',
      '18.4447° N, 77.4508° E (Valinor Hills, Airfield Chi, Jezero — Ingenuity)',
    ],
    explorers: ['Sojourner', 'Spirit', 'Opportunity', 'Ingenuity'],
    description: 'Thin 1% CO2 atmosphere, seasonal global dust storms (optical depth tau up to 10.8), ancient dried river deltas, and hydrothermal silica deposits.',
    color: '#e89a3c',
    accentClass: 'border-stellar-amber/40 text-stellar-amber bg-stellar-amber/10',
  },
  'beyond-mars': {
    id: 'beyond-mars',
    destination: 'Beyond Mars',
    name: 'Deep Space Gravitational Harbors',
    targetBody: 'Ceres & Asteroid 433 Eros',
    gravity: '0.029 g (Ceres) // 0.0059 m/s² (Eros)',
    temperature: '-150°C to -100°C',
    coordinates: [
      '5.37-hr Planetary Protection Orbit (Dwarf Planet Ceres — Dawn)',
      '35.7° S, 279.5° W body-fixed (Himeros Depression, Asteroid 433 Eros — NEAR Shoemaker)',
    ],
    explorers: ['Dawn Spacecraft', 'NEAR Shoemaker'],
    description: 'Pristine solar system relics: Dawn preserved in a long-term stable planetary protection quarantine orbit (calculated with >99% confidence to remain impact-free for >= 50 years) around Ceres, and NEAR softly parked on the undulating regolith of Asteroid 433 Eros.',
    color: '#c084fc',
    accentClass: 'border-purple-500/40 text-purple-300 bg-purple-950/40',
  },
};

function MiniGlobe({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.7}
        metalness={0.2}
        wireframe={false}
      />
    </mesh>
  );
}

export const PlanetaryTheatersVisualizer: React.FC = () => {
  const { isReducedMotion, activeDestination, setActiveDestination } = useNavigation();
  const { isWebGLSupported, is3DEnabled, qualityTier } = useWebGL();

  // Normalize selected destination
  const activeKey =
    activeDestination.toLowerCase().includes('moon')
      ? 'moon'
      : activeDestination.toLowerCase().includes('mars') && !activeDestination.toLowerCase().includes('beyond')
      ? 'mars'
      : activeDestination.toLowerCase().includes('beyond')
      ? 'beyond-mars'
      : 'mars'; // Default to Mars for preview if 'All' is selected

  const currentTheater = THEATERS[activeKey] || THEATERS.mars;

  return (
    <div className="rounded-xl border border-white/10 bg-black/60 p-5 sm:p-7 backdrop-blur-md space-y-6">
      {/* Header & World Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-stellar-gold mb-1">
            <span className="w-2 h-2 rounded-full bg-stellar-gold animate-pulse" />
            <span className="uppercase tracking-widest font-bold">
              PLANETARY LANDING THEATER TELEMETRY
            </span>
          </div>
          <h4 className="font-display text-xl sm:text-2xl font-bold text-stellar-white">
            {currentTheater.name}
          </h4>
        </div>

        {/* World Quick Switch Buttons */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveDestination('Moon')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeKey === 'moon'
                ? 'bg-stellar-cyan/20 border-stellar-cyan text-stellar-cyan font-bold shadow-md'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}
            aria-pressed={activeKey === 'moon'}
          >
            MOON
          </button>
          <button
            type="button"
            onClick={() => setActiveDestination('Mars')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeKey === 'mars'
                ? 'bg-stellar-amber/20 border-stellar-amber text-stellar-amber font-bold shadow-md'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}
            aria-pressed={activeKey === 'mars'}
          >
            MARS
          </button>
          <button
            type="button"
            onClick={() => setActiveDestination('Beyond Mars')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              activeKey === 'beyond-mars'
                ? 'bg-purple-950/60 border-purple-500 text-purple-300 font-bold shadow-md'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}
            aria-pressed={activeKey === 'beyond-mars'}
          >
            BEYOND MARS
          </button>
        </div>
      </div>

      {/* Grid: 3D Planetary Sphere Preview + Telemetry Coordinates */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* 3D Visual Globe / Schematic Indicator */}
        <div className="md:col-span-4 relative aspect-square max-w-[220px] mx-auto md:mx-0 w-full rounded-xl overflow-hidden bg-space-black border border-white/10 flex items-center justify-center shadow-inner">
          {isWebGLSupported && is3DEnabled && !isReducedMotion ? (
            <Canvas
              camera={{ position: [0, 0, 2.5], fov: 45 }}
              dpr={[1, qualityTier === 'high' ? 1.5 : 1]}
              gl={{ alpha: true, antialias: qualityTier !== 'low' }}
            >
              <ambientLight intensity={0.4} />
              <directionalLight position={[3, 3, 3]} intensity={1.8} color="#ffffff" />
              <MiniGlobe color={currentTheater.color} />
            </Canvas>
          ) : (
            <div
              className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center font-mono text-xs font-bold text-center p-2 shadow-lg"
              style={{ backgroundColor: `${currentTheater.color}22`, color: currentTheater.color }}
            >
              {currentTheater.targetBody.toUpperCase()}
            </div>
          )}

          <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono text-zinc-400 bg-black/70 backdrop-blur-sm rounded py-0.5 border border-white/5">
            GRAVITY: {currentTheater.gravity}
          </div>
        </div>

        {/* Telemetry Coordinates & Resting Explorers List */}
        <div className="md:col-span-8 space-y-4">
          <p className="text-sm text-stellar-gray leading-relaxed font-sans">
            {currentTheater.description}
          </p>

          {/* Coordinates Block */}
          <div className="space-y-2 font-mono text-xs">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
              PRIMARY RESTING TELEMETRY COORDINATES:
            </span>
            <div className="space-y-1.5">
              {currentTheater.coordinates.map((coord, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-zinc-300 flex items-center space-x-2"
                >
                  <span className="text-stellar-gold font-bold">⌖</span>
                  <span className="truncate">{coord}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Explorers Present Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 font-mono text-xs">
            <span className="text-[10px] text-zinc-500 uppercase">EXPLORERS PRESENT:</span>
            {currentTheater.explorers.map((exp, idx) => (
              <span
                key={idx}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${currentTheater.accentClass}`}
              >
                {exp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
