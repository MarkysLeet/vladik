"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function PaperSheet({ position, rotation, scale, color }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle parallax based on mouse
      const { x, y } = state.mouse;
      meshRef.current.rotation.x = rotation[0] + y * 0.1;
      meshRef.current.rotation.y = rotation[1] + x * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
        <planeGeometry args={[1, 1.414, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          speed={1.5}
          distort={0.2}
          radius={1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

export default function SceneBackground() {
  return (
    <div className="absolute inset-0 -z-10 bg-paper-white overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 10, 5]} intensity={1} penumbra={1} color="#ccff00" castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#0A2F1F" />

        {/* Floating Paper Sheets */}
        <PaperSheet position={[-1.5, 0.5, 0]} rotation={[0, 0.2, 0.1]} scale={[2, 2.8, 1]} color="#Fdfbf7" />
        <PaperSheet position={[1.8, -0.5, -1]} rotation={[0, -0.2, -0.1]} scale={[1.5, 2.1, 1]} color="#Fdfbf7" />
        <PaperSheet position={[0, -2, -2]} rotation={[0.5, 0, 0]} scale={[3, 4.2, 1]} color="#Fdfbf7" />

        <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={10} color="#000000" />
      </Canvas>

      {/* Overlay Text Content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-forest-green mb-4 leading-tight">
            Полиграфия 2.0: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-green to-electric-lime">
              От идеи до тиража
            </span>
          </h1>
          <p className="text-xl text-forest-green/80 max-w-2xl mx-auto">
            Промышленная точность с легкостью мессенджера
          </p>
        </div>
      </div>
    </div>
  );
}
