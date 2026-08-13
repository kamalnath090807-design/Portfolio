import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Compass, ChevronDown, Sparkles, Code2 } from 'lucide-react';

export default function HeroControls({ onExploreClick }) {
  const controlRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      controlRef.current,
      { opacity: 0, y: 40, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: 2.2, ease: 'power3.out' }
    );
  }, []);

  const handleClick = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('about') || document.getElementById('projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      ref={controlRef}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2.5 cursor-pointer group"
      onClick={handleClick}
    >
      {/* Outer Glowing Interactive Ring */}
      <div className="relative flex items-center justify-center w-16 h-16 rounded-full glass-panel border border-white/15 group-hover:border-purple-400/80 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] group-hover:scale-110 transition-all duration-500">
        {/* Outer Rotating Segment Ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/40 animate-spin-slow group-hover:border-cyan-300 group-hover:border-solid transition-colors" />

        {/* Pulsing Core Aura */}
        <div className="absolute inset-2 rounded-full bg-purple-600/10 group-hover:bg-purple-600/30 transition-colors animate-pulse-slow" />

        {/* Center Vector Icon */}
        <Code2 className="w-6 h-6 text-purple-300 group-hover:text-cyan-300 group-hover:rotate-180 group-hover:scale-125 transition-all duration-500 z-10" />
      </div>

      {/* Label */}
      <div className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-gray-400 uppercase font-bold group-hover:text-purple-300 group-hover:tracking-[0.25em] transition-all duration-300">
        <span>EXPLORE</span>
        <ChevronDown className="w-3.5 h-3.5 text-purple-400 group-hover:translate-y-1 transition-transform" />
      </div>
    </div>
  );
}
