"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { useOrderStore } from '../store/useOrderStore';
import { motion } from 'framer-motion';
import { Ruler, Maximize, Layers, ShoppingBag } from 'lucide-react';
import * as THREE from 'three';

// 3D Visualizer Component
function BannerModel() {
  const { width, height, material, eyelets } = useOrderStore();
  const meshRef = useRef<THREE.Mesh>(null);

  // Convert cm to 3D units (approx scale)
  const w = width / 100;
  const h = height / 100;

  return (
    <group>
      <mesh ref={meshRef}>
        <planeGeometry args={[w, h, 32, 32]} />
        <meshStandardMaterial
          color={material === 'matte' ? '#f0f0f0' : '#ffffff'}
          roughness={material === 'matte' ? 0.9 : 0.2}
          metalness={material === 'glossy' ? 0.3 : 0.0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {eyelets && (
        <group>
            {/* Simple procedural eyelets using Torus or Ring geometries placed at corners/edges */}
            {/* Top Left */}
            <mesh position={[-w/2 + 0.05, h/2 - 0.05, 0.01]}>
                <ringGeometry args={[0.01, 0.02, 32]} />
                <meshStandardMaterial color="silver" />
            </mesh>
            {/* Top Right */}
            <mesh position={[w/2 - 0.05, h/2 - 0.05, 0.01]}>
                <ringGeometry args={[0.01, 0.02, 32]} />
                <meshStandardMaterial color="silver" />
            </mesh>
             {/* Bottom Left */}
             <mesh position={[-w/2 + 0.05, -h/2 + 0.05, 0.01]}>
                <ringGeometry args={[0.01, 0.02, 32]} />
                <meshStandardMaterial color="silver" />
            </mesh>
            {/* Bottom Right */}
            <mesh position={[w/2 - 0.05, -h/2 + 0.05, 0.01]}>
                <ringGeometry args={[0.01, 0.02, 32]} />
                <meshStandardMaterial color="silver" />
            </mesh>
        </group>
      )}
    </group>
  );
}

export default function Configurator() {
  const {
    width, setWidth,
    height, setHeight,
    quantity, setQuantity,
    material, setMaterial,
    eyelets, toggleEyelets,
    getPrice, generateDeepLink
  } = useOrderStore();

  const handleSend = () => {
    const link = generateDeepLink();
    window.open(link, '_blank');
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen pt-20 bg-paper-white">
      {/* Left: Visualizer */}
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative border-b lg:border-b-0 lg:border-r border-forest-green/10">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <Stage environment="city" intensity={0.5}>
            <BannerModel />
          </Stage>
          <OrbitControls makeDefault />
        </Canvas>

        <div className="absolute bottom-4 left-4 bg-white/80 p-2 rounded text-xs text-forest-green font-mono">
          Interactive Preview
        </div>
      </div>

      {/* Right: Controls */}
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full space-y-8">

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-forest-green flex items-center gap-2">
              <Maximize className="text-electric-lime" /> Dimensions
            </h2>

            <div className="space-y-2">
              <label className="flex justify-between text-sm font-bold text-forest-green">
                Width (cm) <span>{width}</span>
              </label>
              <input
                type="range" min="50" max="500" value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-forest-green"
              />
            </div>

            <div className="space-y-2">
              <label className="flex justify-between text-sm font-bold text-forest-green">
                Height (cm) <span>{height}</span>
              </label>
              <input
                type="range" min="30" max="300" value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-forest-green"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-forest-green flex items-center gap-2">
              <Layers className="text-electric-lime" /> Material & Finish
            </h2>

            <div className="flex gap-4">
              <button
                onClick={() => setMaterial('matte')}
                className={`flex-1 py-3 px-4 border-2 font-bold transition-all ${
                  material === 'matte'
                    ? 'border-forest-green bg-forest-green text-white'
                    : 'border-gray-300 text-gray-500 hover:border-forest-green'
                }`}
              >
                Matte
              </button>
              <button
                onClick={() => setMaterial('glossy')}
                className={`flex-1 py-3 px-4 border-2 font-bold transition-all ${
                  material === 'glossy'
                    ? 'border-electric-lime bg-electric-lime text-forest-green'
                    : 'border-gray-300 text-gray-500 hover:border-electric-lime'
                }`}
              >
                Glossy
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-forest-green/10 rounded bg-white">
              <span className="font-bold text-forest-green">Eyelets (Люверсы)</span>
              <button
                onClick={toggleEyelets}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${eyelets ? 'bg-electric-lime' : 'bg-gray-300'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${eyelets ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t border-dashed border-forest-green/20">
            <div className="flex justify-between items-end">
              <div className="text-sm text-gray-500">
                Quantity:
                <input
                  type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="ml-2 w-16 p-1 border border-forest-green/20 rounded text-center font-bold text-forest-green"
                />
              </div>
              <div className="text-3xl font-bold text-forest-green">
                {getPrice().toLocaleString()} ₴
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSend}
              className="w-full py-4 bg-electric-lime text-forest-green text-xl font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(204,255,0,0.5)] transition-shadow border-2 border-forest-green"
            >
              Calculate & Send to Telegram
            </motion.button>
          </div>

        </div>
      </div>
    </div>
  );
}
