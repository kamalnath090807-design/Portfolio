import React, { useRef, useEffect, useState } from 'react';
import HeroScene from './HeroScene';
import HeroTypography from './HeroTypography';
import HeroCTA from './HeroCTA';
import HeroControls from './HeroControls';

export default function Hero() {
  const mousePos = useRef({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  // System Initialization State
  const [isLoaded, setIsLoaded] = useState(() => {
    return sessionStorage.getItem('has_initialized_portfolio') === 'true';
  });
  const [progress, setProgress] = useState(() => (isLoaded ? 100 : 0));
  const [statusText, setStatusText] = useState('INITIALIZING CORE');
  const [showOverlay, setShowOverlay] = useState(!isLoaded);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth 0-100% Initialization Progress Sequence
  useEffect(() => {
    if (isLoaded) return;

    let startTime = null;
    const duration = 3200; // 3.2 seconds total initialization time

    const animateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(currentProgress);

      // Update System Status Text
      if (currentProgress < 20) {
        setStatusText('INITIALIZING CORE');
      } else if (currentProgress < 40) {
        setStatusText('LOADING GEOMETRY');
      } else if (currentProgress < 60) {
        setStatusText('CALIBRATING ENERGY FIELD');
      } else if (currentProgress < 80) {
        setStatusText('ESTABLISHING CONNECTION');
      } else if (currentProgress < 95) {
        setStatusText('SYNCHRONIZING SYSTEM');
      } else {
        setStatusText('SYSTEM READY');
      }

      if (elapsed < duration) {
        requestAnimationFrame(animateProgress);
      } else {
        // Initialization Complete Transition
        sessionStorage.setItem('has_initialized_portfolio', 'true');
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(() => setShowOverlay(false), 800);
        }, 300);
      }
    };

    const animId = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animId);
  }, [isLoaded]);

  const handleExploreClick = () => {
    const target = document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-screen w-full flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-28 pb-16 overflow-hidden select-none bg-transparent"
    >
      {/* 0-100% SYSTEM INITIALIZATION SCREEN OVERLAY */}
      {showOverlay && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050508] transition-opacity duration-700 pointer-events-auto ${
            isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Subtle Background Glow for Loader */}
          <div className="absolute w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Loader Card Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full space-y-6">
            {/* Top Label */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-purple-300/80 uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span>SYSTEM INITIALIZATION</span>
            </div>

            {/* Dynamic Status Text */}
            <div className="h-6 flex items-center justify-center">
              <span className="text-xs sm:text-sm font-mono tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                <span>{statusText}</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full max-w-xs sm:max-w-sm h-1.5 rounded-full bg-white/10 border border-white/10 p-[1px] overflow-hidden relative shadow-[0_0_20px_rgba(168,85,247,0.25)]">
              <div
                className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 rounded-full transition-all duration-75 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                {/* Glowing Leading Edge */}
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-white blur-[2px] rounded-full" />
              </div>
            </div>

            {/* Digital Percentage Count */}
            <div className="flex items-baseline gap-1 text-3xl sm:text-4xl font-mono font-extrabold text-white tracking-widest drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              <span>{String(progress).padStart(2, '0')}</span>
              <span className="text-sm font-mono text-cyan-400 font-semibold">%</span>
            </div>
          </div>
        </div>
      )}

      {/* Background Atmosphere Radial Specular Lighting */}
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[45rem] h-[45rem] bg-purple-900/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[35rem] h-[35rem] bg-cyan-900/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Custom Interactive Lighting Spotlight */}
      <div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 transition-opacity duration-500 blur-[100px]"
        style={{
          left: `${cursorPos.x - 192}px`,
          top: `${cursorPos.y - 192}px`,
          background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, rgba(6,182,212,0.06) 50%, transparent 100%)',
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* 3D WebGL Multi-Layer Scene Canvas (Driven by initialization progress) */}
      <HeroScene mousePos={mousePos} progress={progress} isLoaded={isLoaded} />

      {/* Two-Column Cinematic Hero Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[calc(100vh-10rem)]">
        {/* Left Column Content (~45% width on desktop) */}
        <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start text-left space-y-6 pt-2 sm:pt-4">
          <HeroTypography isLoaded={isLoaded} />
          <HeroCTA isLoaded={isLoaded} />
        </div>

        {/* Right Column Spacer (Leaves 55% open for 3D Technological Core) */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-6 pointer-events-none min-h-[400px]" />
      </div>

      {/* Interactive Bottom Control */}
      <HeroControls onExploreClick={handleExploreClick} />
    </section>
  );
}
