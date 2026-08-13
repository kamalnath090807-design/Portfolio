import React from 'react';

export function OrbitingCircles({
  className = '',
  children,
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 160,
  path = true,
  iconSize = 48,
}) {
  return (
    <>
      {/* 360-degree complete closed orbit path with subtle purple-blue gradient stroke */}
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id={`orbitGrad-${radius}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <circle
            className="stroke-[1.5]"
            stroke={`url(#orbitGrad-${radius})`}
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}

      {/* Traveling Orbital Particle Dot */}
      <div
        style={{
          '--duration': duration,
          '--radius': radius,
          '--delay': -(delay + duration * 0.4),
        }}
        className={`pointer-events-none absolute flex h-full w-full transform-gpu items-center justify-center rounded-full [animation-delay:calc(var(--delay)*1s)] ${
          reverse ? 'animate-orbit-reverse' : 'animate-orbit'
        }`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.9)] animate-pulse" />
      </div>

      {/* Orbiting AI Logo Container */}
      <div
        style={{
          '--duration': duration,
          '--radius': radius,
          '--delay': -delay,
          '--icon-size': `${iconSize}px`,
        }}
        className={`absolute flex h-full w-full transform-gpu items-center justify-center rounded-full border-none [animation-delay:calc(var(--delay)*1s)] ${
          reverse ? 'animate-orbit-reverse' : 'animate-orbit'
        } ${className}`}
      >
        {children}
      </div>
    </>
  );
}
