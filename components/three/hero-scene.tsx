'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';

function Rig() {
  useFrame((state) => {
    const { pointer, camera } = state;
    camera.position.x += (pointer.x * 1.1 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.7 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Objects({ color }: { color: string }) {
  const knot = useRef<any>(null);
  const ico = useRef<any>(null);
  useFrame((_, delta) => {
    if (knot.current) {
      knot.current.rotation.x += delta * 0.15;
      knot.current.rotation.y += delta * 0.2;
    }
    if (ico.current) {
      ico.current.rotation.y -= delta * 0.12;
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 3, 4]} intensity={0.9} />
      <pointLight position={[-3, 2, 2]} intensity={1.6} color={color} />

      {/* Main wireframe blob + subtle solid core, offset to the right */}
      <group position={[2.1, 0.1, 0]}>
        <Float speed={1.3} rotationIntensity={0.6} floatIntensity={1.1}>
          <mesh scale={1.35}>
            <icosahedronGeometry args={[1, 6]} />
            <MeshDistortMaterial color={color} wireframe distort={0.4} speed={1.4} roughness={0.4} />
          </mesh>
          <mesh scale={0.55}>
            <icosahedronGeometry args={[1, 3]} />
            <MeshDistortMaterial color={color} distort={0.35} speed={1.6} roughness={0.2} metalness={0.6} />
          </mesh>
        </Float>
      </group>

      <Float speed={1} rotationIntensity={1} floatIntensity={0.9}>
        <mesh ref={knot} position={[3.4, 1.6, -1]} scale={0.42}>
          <torusKnotGeometry args={[1, 0.3, 128, 24]} />
          <meshStandardMaterial color={color} wireframe />
        </mesh>
      </Float>

      <Float speed={1.2} floatIntensity={1.1}>
        <mesh ref={ico} position={[0.4, -1.7, -1]} scale={0.5}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={color} wireframe />
        </mesh>
      </Float>
    </>
  );
}

export function HeroScene({ color = '#e8763b' }: { color?: string }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Rig />
      <Objects color={color} />
    </Canvas>
  );
}
