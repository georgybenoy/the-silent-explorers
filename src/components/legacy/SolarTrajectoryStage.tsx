import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWebGL } from '../../context/WebGLContext';
import { useNavigation } from '../../context/NavigationContext';

function TrajectoryCurves() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.03;
    }
  });

  // Orbital rings data
  const rings = [
    { radius: 1.2, color: '#38bdf8', label: 'Earth-Moon System' },
    { radius: 1.8, color: '#e89a3c', label: 'Mars Orbit' },
    { radius: 2.4, color: '#a855f7', label: 'Ceres / Asteroid Belt' },
    { radius: 3.2, color: '#10b981', label: 'Outer Horizons / Titan' },
  ];

  // Interplanetary outbound trajectory curve points
  const points = [];
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    const angle = t * Math.PI * 2.2;
    const r = 1.0 + t * 2.5;
    const y = Math.sin(t * Math.PI) * 0.4;
    points.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
  }
  const trajectoryGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <group ref={groupRef}>
      {/* Central Sun Glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>

      {/* Planetary Orbital Rings */}
      {rings.map((ring, idx) => (
        <mesh key={idx} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[ring.radius - 0.015, ring.radius + 0.015, 64]} />
          <meshBasicMaterial color={ring.color} opacity={0.35} transparent side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Outbound Trajectory Arc */}
      <primitive
        object={
          new THREE.Line(
            trajectoryGeometry,
            new THREE.LineBasicMaterial({ color: '#e89a3c', linewidth: 2 })
          )
        }
      />

      {/* Trajectory Pulse Node */}
      <mesh position={[points[points.length - 1].x, points[points.length - 1].y, points[points.length - 1].z]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

export const SolarTrajectoryStage: React.FC = () => {
  const { isReducedMotion } = useNavigation();
  const { isWebGLSupported, is3DEnabled, qualityTier } = useWebGL();

  if (!isWebGLSupported || !is3DEnabled || isReducedMotion) {
    return (
      <div className="relative h-28 w-full flex items-center justify-center overflow-hidden">
        <svg
          className="w-full h-full text-stellar-gold"
          viewBox="0 0 1000 80"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 0,70 Q 250,10 500,45 T 1000,20"
            stroke="rgba(232, 154, 60, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M 0,55 C 300,55 450,25 700,35 C 850,42 950,15 1000,10"
            stroke="#E89A3C"
            strokeWidth="2"
          />
          <circle cx="200" cy="55" r="4" fill="#38BDF8" />
          <circle cx="450" cy="30" r="4" fill="#F59E0B" />
          <circle cx="700" cy="35" r="4" fill="#A855F7" />
          <circle cx="920" cy="18" r="4" fill="#10B981" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden bg-space-black border border-white/10 flex items-center justify-center shadow-inner">
      <Canvas
        camera={{ position: [0, 3.2, 3.8], fov: 48 }}
        dpr={[1, qualityTier === 'high' ? 1.5 : 1]}
        gl={{ alpha: true, antialias: qualityTier !== 'low' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <TrajectoryCurves />
      </Canvas>

      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-zinc-400 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-white/5 pointer-events-none">
        <span>INTERPLANETARY ESCAPE VECTOR // INNER PLANETS → OUTER SOL</span>
        <span className="text-stellar-gold hidden sm:inline">SCHEMATIC TRAJECTORY VISUALIZATION (NOT TO SCALE)</span>
      </div>
    </div>
  );
};
