import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Terminal, Shield, GraduationCap } from 'lucide-react';

export default function HeroTypography({ isLoaded = true }) {
  const containerRef = useRef(null);
  const collegeRef = useRef(null);
  const introRef = useRef(null);
  const nameLettersRef = useRef([]);
  const bCharRef = useRef(null);
  const dotCharRef = useRef(null);
  const subheadRef = useRef(null);
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);
  const descRef = useRef(null);
  const tagsRef = useRef([]);

  const nameLetters = [
    { char: 'K', anim: { y: -25, opacity: 0, filter: 'blur(8px)' }, delay: 0 },
    { char: 'A', anim: { y: 25, opacity: 0, filter: 'blur(8px)' }, delay: 0.04 },
    { char: 'M', anim: { x: -20, opacity: 0, filter: 'blur(8px)' }, delay: 0.08 },
    { char: 'A', anim: { scale: 0.85, opacity: 0, filter: 'blur(8px)' }, delay: 0.12 },
    { char: 'L', anim: { rotation: 12, y: -15, opacity: 0, filter: 'blur(8px)' }, delay: 0.16 },
    { char: 'N', anim: { y: -20, opacity: 0, filter: 'blur(8px)' }, delay: 0.20 },
    { char: 'A', anim: { x: 20, opacity: 0, filter: 'blur(8px)' }, delay: 0.24 },
    { char: 'T', anim: { scale: 1.15, opacity: 0, filter: 'blur(8px)' }, delay: 0.28 },
    { char: 'H', anim: { y: -18, opacity: 0, filter: 'blur(8px)' }, delay: 0.32 },
  ];

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 0.10s - College Badge
      tl.fromTo(
        collegeRef.current,
        { opacity: 0, y: -20, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 },
        0.1
      );

      // 0.25s - "Hi, I'm"
      tl.fromTo(
        introRef.current,
        { opacity: 0, x: -15, filter: 'blur(6px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6 },
        0.25
      );

      // 0.35s - KAMALNATH Letter-by-Letter Choreographed Sequence
      nameLetters.forEach((item, idx) => {
        const el = nameLettersRef.current[idx];
        if (!el) return;
        tl.fromTo(
          el,
          item.anim,
          {
            y: 0,
            x: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.55,
            ease: 'back.out(1.4)',
          },
          0.35 + item.delay
        );
      });

      // 0.77s - "B." Accent Entrance
      if (bCharRef.current) {
        tl.fromTo(
          bCharRef.current,
          { scale: 1.3, opacity: 0, filter: 'blur(10px)', rotation: -12 },
          {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            rotation: 0,
            duration: 0.65,
            ease: 'back.out(1.6)',
          },
          0.77
        );
      }

      // 0.90s - "." Period delayed pulse bloom
      if (dotCharRef.current) {
        tl.fromTo(
          dotCharRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' },
          0.9
        );
      }

      // 1.45s - Subtitle
      tl.fromTo(
        subheadRef.current,
        { opacity: 0, y: 20, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.75 },
        1.45
      );

      // 1.65s & 1.75s - Focus Badges
      if (badge1Ref.current) {
        tl.fromTo(
          badge1Ref.current,
          { opacity: 0, scale: 0.9, filter: 'blur(4px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.5 },
          1.65
        );
      }
      if (badge2Ref.current) {
        tl.fromTo(
          badge2Ref.current,
          { opacity: 0, x: 15, filter: 'blur(4px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.5 },
          1.75
        );
      }

      // 1.85s - Description
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 12, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 },
        1.85
      );

      // 2.00s - Technology Tags
      const validTags = tagsRef.current.filter(Boolean);
      if (validTags.length > 0) {
        tl.fromTo(
          validTags,
          { opacity: 0, y: 8, filter: 'blur(4px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, stagger: 0.05 },
          2.0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full flex flex-col items-start text-left gap-5 select-none"
    >
      {/* 1. College & Education Badge */}
      <div
        ref={collegeRef}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-purple-500/20 text-xs font-mono text-purple-300 shadow-lg shadow-purple-950/30 backdrop-blur-md hover:border-purple-400/50 transition-colors"
      >
        <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
        <span>Sri Krishna College of Engineering and Technology</span>
        <span className="text-gray-500">•</span>
        <span className="text-purple-300 font-semibold">2025–2029</span>
      </div>

      {/* 2. Small Introduction */}
      <div
        ref={introRef}
        className="flex items-center gap-2.5 text-xs sm:text-sm font-mono tracking-widest text-purple-300/90 uppercase font-semibold"
      >
        <span className="w-6 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
        <span>Hi, I'm</span>
      </div>

      {/* 3. Compact Designer Name (Left-aligned, ~55-70% previous size) */}
      <div className="my-1">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase leading-none font-heading flex flex-wrap items-center gap-x-1 sm:gap-x-2">
          {/* KAMALNATH Letters */}
          <span className="inline-flex items-center text-white">
            {nameLetters.map((item, idx) => (
              <span
                key={idx}
                ref={(el) => (nameLettersRef.current[idx] = el)}
                className="inline-block transform-gpu"
              >
                {item.char}
              </span>
            ))}
          </span>

          {/* "B." Accent */}
          <span className="inline-flex items-center ml-1 sm:ml-2">
            <span
              ref={bCharRef}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-white transform-gpu drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]"
            >
              B
            </span>
            <span
              ref={dotCharRef}
              className="inline-block text-cyan-400 ml-0.5 transform-gpu drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]"
            >
              .
            </span>
          </span>
        </h1>
      </div>

      {/* 4. Subtitle */}
      <div
        ref={subheadRef}
        className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-base sm:text-xl lg:text-2xl font-bold font-heading text-gray-200"
      >
        <span className="text-purple-300">B.Tech IT Student</span>
        <span className="text-purple-500 font-mono">·</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          Aspiring Software Engineer
        </span>
      </div>

      {/* 5. Key Focus Badges */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-gray-300">
        <div
          ref={badge1Ref}
          className="inline-flex items-center gap-2 bg-white/[0.03] px-3.5 py-1.5 rounded-xl border border-white/[0.08] backdrop-blur-sm hover:border-purple-400/40 transition-colors"
        >
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-gray-200 font-medium">Full-Stack & AI Projects</span>
        </div>
        <div
          ref={badge2Ref}
          className="inline-flex items-center gap-2 bg-white/[0.03] px-3.5 py-1.5 rounded-xl border border-white/[0.08] backdrop-blur-sm hover:border-rose-400/40 transition-colors"
        >
          <Shield className="w-3.5 h-3.5 text-rose-400" />
          <span className="text-gray-200 font-medium">Cybersecurity</span>
        </div>
      </div>

      {/* 6. Supporting Description */}
      <p
        ref={descRef}
        className="text-sm sm:text-base text-gray-400 max-w-xl font-light leading-relaxed"
      >
        Building practical software, AI-powered applications, and interactive digital experiences.
      </p>

      {/* 7. Tech Stack Matrix Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
        {['Python', 'C++', 'JavaScript', 'Full-Stack Development', 'AI'].map((tech, idx) => (
          <span
            key={tech}
            ref={(el) => (tagsRef.current[idx] = el)}
            className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-300 hover:border-purple-400/50 hover:text-purple-300 transition-all duration-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
