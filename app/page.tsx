"use client";
import React from 'react';
import SceneBackground from './components/SceneBackground';
import Header from './components/Header';
import Configurator from './components/Configurator';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Header />

      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center">
        <SceneBackground />
      </section>

      {/* Configurator Section */}
      <section className="min-h-screen bg-paper-white relative z-10">
        <Configurator />
      </section>

      {/* Footer Teaser */}
      <footer className="bg-forest-green text-paper-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="font-bold text-electric-lime text-lg mb-2">Print Academy</h3>
            <div className="group cursor-pointer p-4 border border-electric-lime/20 rounded hover:bg-electric-lime/10 transition-colors relative overflow-hidden">
              <p className="text-sm font-mono">Bleed & Safe Zones</p>
              <div className="w-full h-1 bg-electric-lime mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

              {/* Educational Tooltip/Visual on Hover */}
              <div className="absolute inset-0 bg-paper-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-forest-green text-xs font-bold">
                <div className="w-16 h-10 border border-dashed border-red-500 relative flex items-center justify-center">
                   <span className="text-[8px]">TRIM</span>
                   <div className="absolute inset-[-4px] border border-blue-500 opacity-50" />
                </div>
              </div>
            </div>
          </div>
          <div className="text-right text-xs opacity-50 font-mono">
            &copy; 2024 Polygraphy 2.0. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
