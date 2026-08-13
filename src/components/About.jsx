import React, { useEffect, useRef } from 'react';
import { GraduationCap, Code2, Brain, Shield, Rocket, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const bannerRef = useRef(null);

  const highlightCards = [
    {
      icon: GraduationCap,
      title: 'Education',
      sub: 'Sri Krishna College of Eng. & Tech.',
      desc: 'B.Tech Information Technology (2025–2029)',
      color: 'from-purple-500/20 via-indigo-500/10 to-transparent',
      borderColor: 'border-purple-500/30 hover:border-purple-400/60',
      iconColor: 'text-purple-400 bg-purple-950/60 border border-purple-500/30',
      shadow: 'hover:shadow-[0_10px_30px_rgba(168,85,247,0.25)]',
      glowAccent: 'group-hover:border-purple-400',
    },
    {
      icon: Code2,
      title: 'Primary Positioning',
      sub: 'Aspiring Software Engineer',
      desc: 'Dedicated to writing scalable, clean code across modern full-stack architectures.',
      color: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      borderColor: 'border-cyan-500/30 hover:border-cyan-400/60',
      iconColor: 'text-cyan-400 bg-cyan-950/60 border border-cyan-500/30',
      shadow: 'hover:shadow-[0_10px_30px_rgba(6,182,212,0.25)]',
      glowAccent: 'group-hover:border-cyan-400',
    },
    {
      icon: Brain,
      title: 'Secondary Focus',
      sub: 'AI Applications',
      desc: 'Building intelligent tools, neural models, and AI-driven automated experiences.',
      color: 'from-pink-500/20 via-rose-500/10 to-transparent',
      borderColor: 'border-pink-500/30 hover:border-pink-400/60',
      iconColor: 'text-pink-400 bg-pink-950/60 border border-pink-500/30',
      shadow: 'hover:shadow-[0_10px_30px_rgba(236,72,153,0.25)]',
      glowAccent: 'group-hover:border-pink-400',
    },
    {
      icon: Shield,
      title: 'Supporting Interest',
      sub: 'Cybersecurity',
      desc: 'Investigating defensive protocols, secure coding practices, and vulnerability audits.',
      color: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      borderColor: 'border-emerald-500/30 hover:border-emerald-400/60',
      iconColor: 'text-emerald-400 bg-emerald-950/60 border border-emerald-500/30',
      shadow: 'hover:shadow-[0_10px_30px_rgba(16,185,129,0.25)]',
      glowAccent: 'group-hover:border-emerald-400',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const validCards = cardsRef.current.filter(Boolean);

            // 1. Header Entrance
            if (headerRef.current) {
              gsap.fromTo(
                headerRef.current,
                { opacity: 0, y: 40, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
              );
            }

            // 2. Distinct 3D Kinetic Entrance Animations for 4 Cards
            // Card 1: 3D Isometric Tilt (Purple - Education)
            if (validCards[0]) {
              gsap.fromTo(
                validCards[0],
                {
                  opacity: 0,
                  y: 80,
                  x: -40,
                  rotationX: -35,
                  rotationY: -25,
                  scale: 0.75,
                  filter: 'blur(10px)',
                },
                {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  rotationX: 0,
                  rotationY: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  duration: 0.95,
                  delay: 0.1,
                  ease: 'power3.out',
                }
              );
            }

            // Card 2: Cyber Diagonal Unfold (Cyan - Primary Positioning)
            if (validCards[1]) {
              gsap.fromTo(
                validCards[1],
                {
                  opacity: 0,
                  y: 80,
                  x: 40,
                  rotationY: 35,
                  scale: 0.75,
                  filter: 'blur(10px)',
                },
                {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  rotationY: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  duration: 0.95,
                  delay: 0.25,
                  ease: 'back.out(1.4)',
                }
              );
            }

            // Card 3: Holographic Depth Zoom (Pink - Secondary Focus)
            if (validCards[2]) {
              gsap.fromTo(
                validCards[2],
                {
                  opacity: 0,
                  y: 80,
                  scale: 0.55,
                  rotationZ: -20,
                  filter: 'blur(12px)',
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotationZ: 0,
                  filter: 'blur(0px)',
                  duration: 1.0,
                  delay: 0.4,
                  ease: 'elastic.out(1, 0.55)',
                }
              );
            }

            // Card 4: Kinetic Shield Drop (Emerald - Supporting Interest)
            if (validCards[3]) {
              gsap.fromTo(
                validCards[3],
                {
                  opacity: 0,
                  y: 80,
                  x: 40,
                  rotationX: 35,
                  scale: 0.8,
                  filter: 'blur(10px)',
                },
                {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  rotationX: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  duration: 0.95,
                  delay: 0.55,
                  ease: 'back.out(1.6)',
                }
              );
            }

            // 3. Bottom Banner Entrance
            if (bannerRef.current) {
              gsap.fromTo(
                bannerRef.current,
                { opacity: 0, y: 40, scale: 0.95, filter: 'blur(8px)' },
                { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.8, delay: 0.65, ease: 'power3.out' }
              );
            }

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-transparent overflow-hidden">
      {/* Atmosphere Lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-900/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-900/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-purple-400 uppercase tracking-widest border border-purple-500/20 shadow-md">
            <Rocket className="w-3.5 h-3.5 text-purple-400" />
            <span>ABOUT ME</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight leading-tight">
            Passionate about <span className="text-gradient-purple">Software Engineering</span> &{' '}
            <span className="text-gradient-cyan">AI Innovation</span>
          </h2>
          <p className="text-gray-400 max-w-3xl text-base sm:text-lg font-light leading-relaxed">
            Currently pursuing B.Tech in Information Technology at Sri Krishna College of Engineering and Technology.
            I combine solid core programming principles with advanced AI solutions and security-first engineering.
          </p>
        </div>

        {/* Feature Cards Grid (4 Unique 3D Kinetic Entrances) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
          {highlightCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                ref={(el) => (cardsRef.current[idx] = el)}
                className={`glass-panel p-6 rounded-2xl border ${card.borderColor} bg-gradient-to-b ${card.color} ${card.shadow} hover:-translate-y-2 hover:scale-[1.03] transition-all duration-500 space-y-4 shadow-xl flex flex-col justify-between group backdrop-blur-xl transform-gpu`}
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-xl w-fit ${card.iconColor} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                      {card.title}
                    </span>
                    <h3 className="text-lg font-bold text-white font-heading group-hover:text-purple-300 transition-colors">
                      {card.sub}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-light">{card.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Personal Details Summary Banner */}
        <div
          ref={bannerRef}
          className="glass-panel p-8 sm:p-10 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden backdrop-blur-xl"
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Ready to collaborate on ambitious software & AI projects
            </h3>
            <p className="text-sm text-gray-400 font-light max-w-2xl">
              Proficient in Python, C++, JavaScript, Full-Stack Architecture, Machine Learning algorithms, and Cybersecurity.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 shrink-0">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 bg-purple-950/50 px-4 py-2.5 rounded-xl border border-purple-500/30 shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>SKCET Student (2025–2029)</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 bg-cyan-950/50 px-4 py-2.5 rounded-xl border border-cyan-500/30 shadow-lg">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Available for Software Projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

