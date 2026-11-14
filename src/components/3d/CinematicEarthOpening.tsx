import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useNavigation } from '../../context/NavigationContext';
import { useWebGL } from '../../context/WebGLContext';

interface EarthSceneProps {
  sceneIndex: number; // 1 to 7
  isReducedMotion: boolean;
}

function EarthMesh({ sceneIndex, isReducedMotion }: EarthSceneProps) {
  const earthGroupRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Procedural Earth Texture Canvas
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Deep ocean base
    ctx.fillStyle = '#081426';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Continental landmasses (stylized accurate planetary land distribution)
    ctx.fillStyle = '#1c3024';
    // Africa / Eurasia
    ctx.beginPath();
    ctx.ellipse(540, 240, 160, 110, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2d4232';
    ctx.beginPath();
    ctx.ellipse(580, 180, 140, 90, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Americas
    ctx.fillStyle = '#1e3326';
    ctx.beginPath();
    ctx.ellipse(260, 200, 70, 90, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(320, 340, 60, 110, 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Australia & Antarctica
    ctx.fillStyle = '#22382a';
    ctx.beginPath();
    ctx.ellipse(820, 360, 50, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#556677';
    ctx.fillRect(0, 470, canvas.width, 42);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }, []);

  // Procedural Clouds Texture
  const cloudsTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';

    for (let i = 0; i < 40; i++) {
      const x = Math.random() * canvas.width;
      const y = 80 + Math.random() * 350;
      const rx = 40 + Math.random() * 120;
      const ry = 15 + Math.random() * 35;
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, Math.random() * 0.5 - 0.25, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (isReducedMotion) return;

    if (earthGroupRef.current) {
      // Slow realistic axial rotation
      earthGroupRef.current.rotation.y += delta * 0.04;

      // Target camera distance based on scene progression
      // Scene 1: distant / emerging from dark
      // Scene 2: dramatic atmospheric close-up
      // Scene 3-7: pulling away into deep interplanetary space
      let targetZ = 5.0;
      let targetX = 0.0;
      let targetY = 0.0;

      if (sceneIndex === 1) {
        targetZ = 7.5;
        targetX = 0.0;
        targetY = 0.2;
      } else if (sceneIndex === 2) {
        targetZ = 3.2;
        targetX = 0.8;
        targetY = -0.1;
      } else if (sceneIndex === 3) {
        targetZ = 4.8;
        targetX = 1.2;
        targetY = 0.3;
      } else if (sceneIndex >= 4) {
        targetZ = 6.8 + (sceneIndex - 4) * 0.8;
        targetX = 1.6;
        targetY = 0.5;
      }

      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 1.5);
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 1.5);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 1.5);
      state.camera.lookAt(0, 0, 0);
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.05;
    }
  });

  // Calculate Earth opacity/visibility based on scene progression
  const earthOpacity = useMemo(() => {
    if (sceneIndex === 1) return 0.25; // Emerging from darkness
    return 1.0;
  }, [sceneIndex]);

  return (
    <group ref={earthGroupRef} position={[0, 0, 0]}>
      {/* Planetary Body */}
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.7}
          metalness={0.1}
          transparent
          opacity={earthOpacity}
        />
      </mesh>

      {/* Cloud Layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.52, 48, 48]} />
        <meshStandardMaterial
          map={cloudsTexture}
          transparent
          opacity={earthOpacity * 0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Atmospheric Rim / Rayleigh Scattering Glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.58, 48, 48]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={sceneIndex === 1 ? 0.15 : 0.35}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function StarfieldParticles({ count = 800 }: { count?: number }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribute in wide cosmic sphere
      const radius = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      coords[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      coords[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      coords[i * 3 + 2] = radius * Math.cos(phi);

      // Star color temperatures (warm white to stellar blue)
      const isBlue = Math.random() > 0.7;
      colors[i * 3] = isBlue ? 0.8 : 1.0;
      colors[i * 3 + 1] = isBlue ? 0.9 : 0.95;
      colors[i * 3 + 2] = 1.0;
    }

    return { coords, colors };
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points.coords, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[points.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export function CinematicEarthOpening({ sceneIndex }: { sceneIndex: number }) {
  const { isReducedMotion } = useNavigation();
  const { isWebGLSupported, is3DEnabled, qualityTier } = useWebGL();

  // If WebGL is not supported or 3D is disabled, fallback seamlessly
  if (!isWebGLSupported || !is3DEnabled) {
    return null;
  }

  const particleCount = qualityTier === 'high' ? 1200 : qualityTier === 'medium' ? 600 : 300;

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0.2, sceneIndex === 1 ? 7.5 : 3.5], fov: 42 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{ antialias: qualityTier !== 'low', alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Deep Space Lighting: High-intensity directional sunlight */}
        <ambientLight intensity={sceneIndex === 1 ? 0.05 : 0.15} />
        <directionalLight
          position={[-6, 3, 4]}
          intensity={sceneIndex === 1 ? 1.0 : 2.4}
          color="#fffaf0"
        />
        <pointLight position={[5, -3, -5]} intensity={0.2} color="#38bdf8" />

        {/* 3D Earth System & Starfield */}
        <EarthMesh sceneIndex={sceneIndex} isReducedMotion={isReducedMotion} />
        <StarfieldParticles count={particleCount} />
      </Canvas>
    </div>
  );
}
