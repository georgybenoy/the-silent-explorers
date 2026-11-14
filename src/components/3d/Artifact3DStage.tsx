import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Artifact } from '../../types/artifact';
import { ASSET_INVENTORY } from '../../data/assetsInventory';
import { useNavigation } from '../../context/NavigationContext';
import { useWebGL } from '../../context/WebGLContext';

interface Artifact3DStageProps {
  artifact: Artifact;
}

// ---------------------------------------------------------------------------
// 3D Procedural Hardware Renderers for each explorer
// ---------------------------------------------------------------------------

function Apollo17LRVModel() {
  const groupRef = useRef<THREE.Group>(null);
  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Chassis Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 0.15, 0.9]} />
        <meshStandardMaterial color="#c0c0c8" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Seats */}
      <mesh position={[-0.1, 0.25, 0.2]}>
        <boxGeometry args={[0.45, 0.4, 0.35]} />
        <meshStandardMaterial color="#333842" roughness={0.8} />
      </mesh>
      <mesh position={[-0.1, 0.25, -0.2]}>
        <boxGeometry args={[0.45, 0.4, 0.35]} />
        <meshStandardMaterial color="#333842" roughness={0.8} />
      </mesh>
      {/* High Gain Dish Antenna */}
      <group position={[0.4, 0.65, 0.35]}>
        <mesh rotation={[0.4, -0.5, 0]}>
          <cylinderGeometry args={[0.35, 0.05, 0.08, 24]} />
          <meshStandardMaterial color="#e4e4e7" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
          <meshStandardMaterial color="#71717a" metalness={0.9} />
        </mesh>
      </group>
      {/* TV Camera Assembly */}
      <mesh position={[0.65, 0.35, -0.3]}>
        <boxGeometry args={[0.15, 0.18, 0.12]} />
        <meshStandardMaterial color="#d97706" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* 4 Wire Mesh Wheels */}
      {[
        [-0.7, -0.15, 0.55],
        [0.7, -0.15, 0.55],
        [-0.7, -0.15, -0.55],
        [0.7, -0.15, -0.55],
      ].map((pos, idx) => (
        <group key={idx} position={pos as [number, number, number]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.18, 20]} />
            <meshStandardMaterial color="#71717a" wireframe />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.2, 12]} />
            <meshStandardMaterial color="#a1a1aa" metalness={0.8} />
          </mesh>
        </group>
      ))}
      {/* Lunar Basalt Regolith Ground */}
      <mesh position={[0, -0.44, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#27272a" roughness={0.95} />
      </mesh>
    </group>
  );
}

function Apollo15ALSEPModel() {
  return (
    <group position={[0, -0.15, 0]}>
      {/* Central Station Compartment */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.8, 0.45, 0.7]} />
        <meshStandardMaterial color="#e4e4e7" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Helical S-Band Antenna */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <meshStandardMaterial color="#a1a1aa" metalness={0.9} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.15, 0.25, 12]} />
        <meshStandardMaterial color="#e4e4e7" metalness={0.8} />
      </mesh>
      {/* SNAP-27 RTG (Plutonium-238 Generator with Cooling Fins) */}
      <group position={[0.9, 0.05, 0]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
          <meshStandardMaterial color="#18181b" roughness={0.8} />
        </mesh>
        {/* Radiator Fins */}
        <mesh>
          <cylinderGeometry args={[0.28, 0.28, 0.4, 8]} />
          <meshStandardMaterial color="#3f3f46" wireframe />
        </mesh>
      </group>
      {/* Distinct Associated Apollo 15 LRRR (Laser Retroreflector) */}
      <group position={[-1.1, -0.1, 0.3]} rotation={[0.4, 0.2, 0]}>
        <mesh>
          <boxGeometry args={[0.45, 0.1, 0.35]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.4, 0.04, 0.3]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.2} metalness={0.5} />
        </mesh>
      </group>
      {/* Lunar Ground */}
      <mesh position={[0, -0.26, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#27272a" roughness={0.95} />
      </mesh>
    </group>
  );
}

function SojournerModel() {
  return (
    <group position={[0, -0.1, 0]}>
      {/* Rover Body */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.65, 0.2, 0.45]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* GaAs Solar Panel */}
      <mesh position={[0, 0.23, 0]}>
        <boxGeometry args={[0.62, 0.02, 0.42]} />
        <meshStandardMaterial color="#1e1b4b" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Forward Stereo Cameras */}
      <mesh position={[0.25, 0.28, 0]}>
        <boxGeometry args={[0.1, 0.08, 0.18]} />
        <meshStandardMaterial color="#18181b" roughness={0.6} />
      </mesh>
      {/* APXS on Rear */}
      <mesh position={[-0.35, 0.05, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.15, 12]} />
        <meshStandardMaterial color="#d97706" metalness={0.6} />
      </mesh>
      {/* 6 Wheels on Rocker-Bogie */}
      {[
        [-0.3, -0.05, 0.28],
        [0, -0.05, 0.28],
        [0.3, -0.05, 0.28],
        [-0.3, -0.05, -0.28],
        [0, -0.05, -0.28],
        [0.3, -0.05, -0.28],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.07, 12]} />
          <meshStandardMaterial color="#52525b" metalness={0.8} />
        </mesh>
      ))}
      {/* Ares Vallis Martian Soil */}
      <mesh position={[0, -0.14, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#7c2d12" roughness={0.9} />
      </mesh>
    </group>
  );
}

function MERModel({ isOpportunity }: { isOpportunity?: boolean }) {
  return (
    <group position={[0, -0.15, 0]}>
      {/* Central Warm Electronics Box */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.0, 0.35, 0.7]} />
        <meshStandardMaterial color="#e4e4e7" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Triangular Solar Panels */}
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[1.5, 0.02, 1.1]} />
        <meshStandardMaterial color="#1e1b4b" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Pancam Mast Assembly (1.5 m tall) */}
      <group position={[0.3, 0.4, 0.25]}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1.0, 8]} />
          <meshStandardMaterial color="#71717a" metalness={0.8} />
        </mesh>
        {/* Stereo Camera Head */}
        <mesh position={[0, 1.02, 0]}>
          <boxGeometry args={[0.2, 0.1, 0.12]} />
          <meshStandardMaterial color="#d97706" metalness={0.6} />
        </mesh>
      </group>
      {/* High-Gain Antenna Dish */}
      <mesh position={[-0.3, 0.6, -0.2]} rotation={[0.4, -0.3, 0]}>
        <cylinderGeometry args={[0.22, 0.04, 0.06, 16]} />
        <meshStandardMaterial color="#f4f4f5" metalness={0.9} />
      </mesh>
      {/* 6 Wheels with Rocker Bogie */}
      {[
        [-0.5, -0.1, 0.5],
        [0, -0.1, 0.5],
        [0.5, -0.1, 0.5],
        [-0.5, -0.1, -0.5],
        [0, -0.1, -0.5],
        [0.5, -0.1, -0.5],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.12, 16]} />
          <meshStandardMaterial color="#52525b" metalness={0.8} />
        </mesh>
      ))}
      {/* Martian Terrain */}
      <mesh position={[0, -0.27, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color={isOpportunity ? '#9a3412' : '#831843'} roughness={0.9} />
      </mesh>
    </group>
  );
}

function IngenuityModel() {
  const rotorRef1 = useRef<THREE.Group>(null);
  const rotorRef2 = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (rotorRef1.current) rotorRef1.current.rotation.y += delta * 4;
    if (rotorRef2.current) rotorRef2.current.rotation.y -= delta * 4;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Fuselage Core */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.32, 0.28]} />
        <meshStandardMaterial color="#27272a" roughness={0.7} />
      </mesh>
      {/* Vertical Mast */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
        <meshStandardMaterial color="#a1a1aa" metalness={0.9} />
      </mesh>
      {/* Top Solar Panel */}
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[0.35, 0.02, 0.28]} />
        <meshStandardMaterial color="#1e1b4b" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Coaxial Counter-Rotating Rotor 1 */}
      <group ref={rotorRef1} position={[0, 0.55, 0]}>
        <mesh>
          <boxGeometry args={[1.5, 0.01, 0.08]} />
          <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      {/* Coaxial Counter-Rotating Rotor 2 */}
      <group ref={rotorRef2} position={[0, 0.4, 0]}>
        <mesh>
          <boxGeometry args={[1.5, 0.01, 0.08]} />
          <meshStandardMaterial color="#18181b" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      {/* 4 Carbon Landing Legs */}
      {[
        [0.35, -0.28, 0.35],
        [-0.35, -0.28, 0.35],
        [0.35, -0.28, -0.35],
        [-0.35, -0.28, -0.35],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]} rotation={[0.4, 0, 0.4]}>
          <cylinderGeometry args={[0.012, 0.012, 0.5, 8]} />
          <meshStandardMaterial color="#3f3f46" metalness={0.9} />
        </mesh>
      ))}
      {/* Jezero Dunes Ground */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#9a3412" roughness={0.9} />
      </mesh>
    </group>
  );
}

function DawnModel() {
  return (
    <group position={[0, 0, 0]}>
      {/* Hexagonal Core Bus */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 0.9, 6]} />
        <meshStandardMaterial color="#e4e4e7" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* 1.52m High-Gain Antenna Dish */}
      <mesh position={[0, 0.65, 0.2]} rotation={[0.5, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.05, 0.08, 24]} />
        <meshStandardMaterial color="#f4f4f5" metalness={0.9} />
      </mesh>
      {/* 19.7m Dual Solar Arrays */}
      <mesh position={[1.8, 0, 0]}>
        <boxGeometry args={[2.4, 0.02, 0.8]} />
        <meshStandardMaterial color="#1e1b4b" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-1.8, 0, 0]}>
        <boxGeometry args={[2.4, 0.02, 0.8]} />
        <meshStandardMaterial color="#1e1b4b" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Ion Propulsion Thruster */}
      <mesh position={[0, -0.55, 0]}>
        <coneGeometry args={[0.2, 0.3, 16]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

function NEARShoemakerModel() {
  return (
    <group position={[0, 0, 0]}>
      {/* Main Box Structure */}
      <mesh>
        <boxGeometry args={[0.7, 0.8, 0.7]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* 1.83m High Gain Dish */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.55, 0.08, 0.08, 24]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} />
      </mesh>
      {/* 4 Fixed Solar Panels */}
      {[
        [0.85, 0.1, 0],
        [-0.85, 0.1, 0],
        [0, 0.1, 0.85],
        [0, 0.1, -0.85],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]}>
          <boxGeometry args={[idx < 2 ? 0.8 : 0.6, 0.02, idx < 2 ? 0.6 : 0.8]} />
          <meshStandardMaterial color="#1e1b4b" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      {/* Asteroid Surface Underneath */}
      <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#52525b" roughness={0.95} />
      </mesh>
    </group>
  );
}

function Explorer3DSwitch({ artifactId }: { artifactId: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {artifactId === 'apollo-17-lrv' && <Apollo17LRVModel />}
      {artifactId === 'apollo-15-alsep' && <Apollo15ALSEPModel />}
      {artifactId === 'sojourner-pathfinder' && <SojournerModel />}
      {artifactId === 'spirit-mer-a' && <MERModel isOpportunity={false} />}
      {artifactId === 'opportunity-mer-b' && <MERModel isOpportunity={true} />}
      {artifactId === 'ingenuity-mars2020' && <IngenuityModel />}
      {artifactId === 'dawn-spacecraft' && <DawnModel />}
      {artifactId === 'near-shoemaker' && <NEARShoemakerModel />}
    </group>
  );
}

export function Artifact3DStage({ artifact }: Artifact3DStageProps) {
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');
  const [activeAnnotationId, setActiveAnnotationId] = useState<string | null>(null);
  const { isReducedMotion } = useNavigation();
  const { isWebGLSupported, is3DEnabled, qualityTier } = useWebGL();

  const assetMeta = ASSET_INVENTORY[artifact.artifactId] || ASSET_INVENTORY['apollo-17-lrv'];

  // Toggle fallback if WebGL unavailable or user disabled
  const show3D = isWebGLSupported && is3DEnabled && !isReducedMotion && viewMode === '3d';

  return (
    <div className="w-full space-y-3">
      {/* Stage Header with Mode Switcher & Source Attribution */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-stellar-gold animate-pulse" />
          <span className="text-stellar-white font-bold uppercase tracking-wider">
            {show3D ? '// INTERACTIVE 3D EXHIBITION STAGE' : '// AUTHENTIC ARCHIVAL RECORD'}
          </span>
          <span className="text-zinc-500 hidden sm:inline">|</span>
          <span className="text-stellar-muted text-[11px] hidden sm:inline">
            {assetMeta.authenticityStatus}
          </span>
        </div>

        {/* View Mode Toggle Button */}
        <div className="flex items-center space-x-1.5 p-1 rounded-lg bg-black/60 border border-white/10">
          <button
            type="button"
            onClick={() => setViewMode('3d')}
            className={`px-2.5 py-1 rounded transition-colors ${
              viewMode === '3d'
                ? 'bg-stellar-gold text-space-black font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
            aria-pressed={viewMode === '3d'}
          >
            3D MODEL
          </button>
          <button
            type="button"
            onClick={() => setViewMode('photo')}
            className={`px-2.5 py-1 rounded transition-colors ${
              viewMode === 'photo'
                ? 'bg-stellar-gold text-space-black font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
            aria-pressed={viewMode === 'photo'}
          >
            NASA PHOTO
          </button>
        </div>
      </div>

      {/* Main Exhibition Stage Viewport */}
      <div className="relative aspect-[21/11] sm:aspect-[21/9] w-full rounded-xl overflow-hidden bg-space-black border border-white/10 shadow-2xl flex items-center justify-center">
        {show3D ? (
          <Canvas
            camera={{ position: [0, 1.2, 3.2], fov: 42 }}
            dpr={[1, qualityTier === 'high' ? 1.5 : 1]}
            gl={{ alpha: true, antialias: qualityTier !== 'low' }}
          >
            <ambientLight intensity={0.25} />
            <directionalLight position={[5, 4, 3]} intensity={2.2} color="#ffffff" castShadow />
            <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#93c5fd" />
            <Explorer3DSwitch artifactId={artifact.artifactId} />
          </Canvas>
        ) : (
          /* Archival Photography Fallback */
          <div className="absolute inset-0">
            <img
              src={artifact.media.fallbackImagePath}
              alt={artifact.name}
              className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-zinc-300 bg-black/75 backdrop-blur-md p-2 rounded border border-white/10">
              <span>PHOTO CREDIT: {artifact.media.photoCredits}</span>
              <span className="text-stellar-gold">AUTHENTIC HISTORICAL RECORD</span>
            </div>
          </div>
        )}

        {/* 3D Stage Atmospheric Vignette */}
        {show3D && (
          <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-70" />
        )}
      </div>

      {/* Interactive Component Annotation Hotspots */}
      <div className="space-y-1.5 font-mono text-xs">
        <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest">
          <span>HARDWARE COMPONENT BREAKDOWN & ANNOTATIONS:</span>
          <span>{assetMeta.keyAnnotations.length} IDENTIFIED SYSTEMS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {assetMeta.keyAnnotations.map((anno) => {
            const isActive = activeAnnotationId === anno.id;
            return (
              <button
                key={anno.id}
                type="button"
                onClick={() => setActiveAnnotationId(isActive ? null : anno.id)}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  isActive
                    ? 'bg-stellar-gold/15 border-stellar-gold text-stellar-white shadow-md'
                    : 'bg-black/50 border-white/10 text-zinc-400 hover:text-stellar-white hover:border-white/25'
                }`}
              >
                <div className="flex items-center space-x-1.5 mb-1">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-stellar-gold animate-ping' : 'bg-zinc-600'
                    }`}
                  />
                  <span className="text-[11px] font-bold text-stellar-gold truncate">
                    {anno.label}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-300 leading-relaxed font-sans line-clamp-2">
                  {anno.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
