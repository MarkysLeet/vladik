"use client";
import React from 'react';
import { Send, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const navItems = [
    { label: "Для бизнеса", href: "#" },
    { label: "Для маркетинга", href: "#" },
    { label: "Подарки", href: "#" },
    { label: "Академия", href: "#" }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
      <div className="pointer-events-auto">
        <div className="font-bold text-2xl text-forest-green tracking-tighter border-2 border-forest-green p-1 w-10 h-10 flex items-center justify-center bg-paper-white">
          P
        </div>
      </div>

      <nav className="pointer-events-auto hidden md:flex gap-8 bg-paper-white/80 backdrop-blur-sm px-6 py-2 rounded-full border border-forest-green/10">
        {navItems.map((item) => (
          <a key={item.label} href={item.href} className="text-forest-green font-medium hover:text-electric-lime transition-colors text-sm uppercase tracking-wide">
            {item.label}
          </a>
        ))}
      </nav>

      <div className="pointer-events-auto">
        <button className="flex items-center gap-2 bg-forest-green text-electric-lime px-4 py-2 rounded-none font-bold hover:bg-black transition-colors">
          <Send size={18} />
          <span className="hidden sm:inline">Мои заказы</span>
        </button>
      </div>
    </header>
  );
}
