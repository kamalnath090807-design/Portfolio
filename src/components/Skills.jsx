import React, { useState, useRef, useEffect } from 'react';
import { Cpu, Terminal, Shield, Layers, Code2, Globe, Palette, Workflow, Braces, Server } from 'lucide-react';

const InteractiveSkillCard = ({ skill }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const IconComponent = skill.icon || Code2;
  const key = skill.key;

  // Custom status badge colors based on level
  const getBadgeStyle = (level) => {
    switch (level) {
      case 'Core':
        return 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]';
      case 'Developing':
      case 'Active Focus':
        return 'bg-purple-950/70 text-purple-300 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.25)]';
      case 'Familiar':
      case 'Exploring':
        return 'bg-blue-950/70 text-blue-300 border-blue-500/40';
      case 'Foundational':
      case 'Learning':
        return 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
      default:
        return 'bg-gray-900/70 text-gray-300 border-gray-700/40';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border transition-all duration-300 ease-out backdrop-blur-xl overflow-hidden ${
        isHovered
          ? key === 'cybersecurity'
            ? 'border-emerald-400/50 -translate-y-1 shadow-[0_10px_25px_-10px_rgba(16,185,129,0.3)]'
            : key === 'uiux'
            ? 'border-pink-400/50 -translate-y-1 shadow-[0_10px_25px_-10px_rgba(236,72,153,0.3)]'
            : key === 'fullstack'
            ? 'border-cyan-400/50 -translate-y-1 shadow-[0_10px_25px_-10px_rgba(6,182,212,0.3)]'
            : key === 'cpp'
            ? 'border-cyan-400/50 -translate-y-1 shadow-[0_10px_25px_-10px_rgba(6,182,212,0.3)]'
            : 'border-purple-500/40 -translate-y-1 shadow-[0_10px_25px_-10px_rgba(168,85,247,0.25)]'
          : 'border-white/[0.08]'
      }`}
    >
      {/* Internal Mouse-Tracking Spotlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, ${
              key === 'cybersecurity'
                ? 'rgba(16, 185, 129, 0.14)'
                : key === 'uiux'
                ? 'rgba(236, 72, 153, 0.14)'
                : key === 'cpp' || key === 'fullstack'
                ? 'rgba(6, 182, 212, 0.14)'
                : 'rgba(168, 85, 247, 0.14)'
            }, transparent 70%)`,
          }}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4 DISTINCT UNIQUE HOVER ANIMATIONS FOR C++, JAVA, FULLSTACK, AI */}
      {/* ------------------------------------------------------------- */}

      {/* 1. C++ — Code Execution / Compilation Scan Line */}
      {key === 'cpp' && isHovered && (
        <div
          className="pointer-events-none absolute inset-y-0 w-full transition-all duration-75"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.12) ${mousePos.x - 30}px, rgba(6, 182, 212, 0.25) ${mousePos.x}px, transparent ${mousePos.x + 30}px)`,
          }}
        >
          <div
            className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_#06b6d4]"
            style={{ left: `${mousePos.x}px` }}
          />
        </div>
      )}

      {/* 2. JAVA — Object Structure & Connected Nodes */}
      {key === 'java' && isHovered && (
        <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-80">
          <line x1="26" y1="20" x2="65" y2="35" stroke="rgba(168, 85, 247, 0.45)" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="65" y1="35" x2="105" y2="22" stroke="rgba(6, 182, 212, 0.45)" strokeWidth="1.2" strokeDasharray="3 3" />
          <rect x="23" y="17" width="6" height="6" fill="#a855f7" className="animate-pulse" />
          <rect x="62" y="32" width="6" height="6" fill="#06b6d4" />
          <rect x="102" y="19" width="6" height="6" fill="#3b82f6" />
        </svg>
      )}

      {/* 3. FULL-STACK — Frontend ↔ API ↔ Backend Data Flow */}
      {key === 'fullstack' && isHovered && (
        <div className="pointer-events-none absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-cyan-500/20 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" title="Frontend UI" />
          <div className="w-5 h-[1.5px] bg-white/15 relative overflow-hidden">
            <div className="absolute inset-y-0 w-2 bg-cyan-400 shadow-[0_0_6px_#06b6d4] animate-shimmer" />
          </div>
          <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" title="API Layer" />
          <div className="w-5 h-[1.5px] bg-white/15 relative overflow-hidden">
            <div className="absolute inset-y-0 w-2 bg-purple-400 shadow-[0_0_6px_#a855f7] animate-shimmer" style={{ animationDelay: '0.4s' }} />
          </div>
          <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" title="Backend Database" />
        </div>
      )}

      {/* 4. AI APPLICATIONS — Neural Intelligence Converging Particles */}
      {key === 'ai' && isHovered && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-2 left-6 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#06b6d4] animate-ai-converge-1" />
          <div className="absolute top-10 right-6 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_#a855f7] animate-ai-converge-2" />
          <div className="absolute bottom-3 left-14 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_#3b82f6] animate-ai-converge-3" />
        </div>
      )}

      {/* 5. PYTHON — Professional Snake Border Slither Animation */}
      {key === 'python' && isHovered && (
        <svg className="pointer-events-none absolute inset-0 w-full h-full rounded-2xl overflow-visible">
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="16"
            fill="none"
            stroke="url(#python-snake-grad)"
            strokeWidth="2"
            strokeDasharray="80 220"
            className="animate-snake-slither"
          />
          <defs>
            <linearGradient id="python-snake-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {/* 6. JAVASCRIPT — Dynamic Wave Sweep */}
      {key === 'js' && isHovered && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-shimmer" />
      )}

      {/* 7. UI/UX DESIGN WITH AI — Creative Gradient Canvas Sweep */}
      {key === 'uiux' && isHovered && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-cyan-500/10 animate-shimmer" />
      )}

      {/* 8. CYBERSECURITY — Security Laser Scan Line */}
      {key === 'cybersecurity' && isHovered && (
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-cyber-scan" />
      )}

      {/* Card Contents */}
      <div className="relative z-10 space-y-4">
        {/* Header: Icon, Title & Status */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Icon with Specific Micro Animation */}
            <div
              className={`p-2.5 rounded-xl border transition-all duration-300 ${
                isHovered
                  ? key === 'cpp'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 -translate-y-0.5 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : key === 'java'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-400/40 rotate-6 -translate-y-0.5'
                    : key === 'fullstack'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 -translate-y-0.5'
                    : key === 'ai'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 scale-110 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                    : key === 'cybersecurity'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 -translate-y-0.5 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : key === 'uiux'
                    ? 'bg-pink-500/20 text-pink-300 border-pink-400/40 -translate-y-0.5 scale-105 shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                    : 'bg-purple-500/20 text-purple-300 border-purple-400/40 -translate-y-0.5 scale-105 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'bg-white/[0.04] text-gray-300 border-white/10'
              }`}
            >
              <IconComponent className="w-5 h-5 transition-transform duration-300" />
            </div>

            <div>
              <h4 className="text-lg font-bold font-heading text-white tracking-wide group-hover:text-cyan-200 transition-colors">
                {skill.name}
              </h4>
            </div>
          </div>

          {/* Level Badge */}
          <span
            className={`text-xs font-mono font-semibold px-3 py-1 rounded-full border transition-all duration-300 ${getBadgeStyle(
              skill.level
            )}`}
          >
            {skill.level}
          </span>
        </div>

        {/* Skill Description */}
        <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors">
          {skill.desc}
        </p>

        {/* Progress Bar & Familiarity Indicator */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-[11px] font-mono text-gray-500">
            <span>Familiarity Level</span>
            <span className="text-gray-400 group-hover:text-cyan-300 transition-colors">
              {skill.percent}%
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden relative p-[1px]">
            <div
              className={`h-full rounded-full transition-all duration-700 relative overflow-hidden ${
                key === 'cybersecurity'
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500'
                  : key === 'uiux'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400'
                  : key === 'fullstack' || key === 'cpp'
                  ? 'bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500'
                  : 'bg-gradient-to-r from-purple-600 via-cyan-400 to-blue-500'
              }`}
              style={{ width: `${skill.percent}%` }}
            >
              {/* Shimmer Light Beam Effect on Hover */}
              {isHovered && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Left Column — 4 Programming Languages
  const programmingLanguages = [
    {
      key: 'cpp',
      name: 'C++',
      level: 'Core',
      percent: 75,
      icon: Code2,
      desc: 'Object-oriented programming, problem solving, algorithms and data structures',
    },
    {
      key: 'java',
      name: 'Java',
      level: 'Developing',
      percent: 55,
      icon: Braces,
      desc: 'Java fundamentals, object-oriented programming and application development',
    },
    {
      key: 'js',
      name: 'JavaScript',
      level: 'Familiar',
      percent: 50,
      icon: Globe,
      desc: 'JavaScript fundamentals, DOM, asynchronous programming and web development',
    },
    {
      key: 'python',
      name: 'Python',
      level: 'Foundational',
      percent: 40,
      icon: Cpu,
      desc: 'Python fundamentals, scripting, data structures, AI/ML experimentation',
    },
  ];

  // Right Column — 4 Technical Focus Areas (Perfectly Balanced Grid)
  const focusAreas = [
    {
      key: 'fullstack',
      name: 'Full-Stack Development',
      level: 'Active Focus',
      percent: 70,
      icon: Layers,
      desc: 'Modern web development, responsive UI, APIs and application architecture',
    },
    {
      key: 'ai',
      name: 'AI Applications',
      level: 'Exploring',
      percent: 60,
      icon: Workflow,
      desc: 'Generative AI integrations, intelligent applications and AI-assisted development',
    },
    {
      key: 'uiux',
      name: 'UI/UX Design with AI',
      level: 'Developing',
      percent: 48,
      icon: Palette,
      desc: 'AI-assisted interface design, prototyping, visual systems and user-focused experiences',
    },
    {
      key: 'cybersecurity',
      name: 'Cybersecurity',
      level: 'Learning',
      percent: 35,
      icon: Shield,
      desc: 'Cybersecurity fundamentals, network security, secure coding and security concepts',
    },
  ];

  return (
    <section ref={sectionRef} id="skills" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-transparent">
      {/* Atmosphere Ambient Lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Viewport Awakening Header Sequence */}
        <div
          className={`space-y-4 text-center max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0 filter-none' : 'opacity-0 translate-y-6 blur-sm'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-cyan-400 uppercase tracking-widest border border-cyan-500/20 shadow-md mx-auto">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black font-heading text-white tracking-tight">
            Tools & Technical <span className="text-gradient-cyan">Capabilities</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">
            Honest technical foundation & active learning directions as a student developer.
          </p>
        </div>

        {/* Balanced 4 vs 4 Grid Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column — 4 Programming Languages */}
          <div
            className={`glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6 backdrop-blur-xl transition-all duration-700 delay-150 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-white">Programming Languages</h3>
                  <p className="text-xs text-gray-400 font-light">Ordered by current confidence & usage</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {programmingLanguages.map((skill) => (
                <InteractiveSkillCard key={skill.key} skill={skill} />
              ))}
            </div>
          </div>

          {/* Right Column — 4 Technical Focus Areas */}
          <div
            className={`glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6 backdrop-blur-xl transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-white">Areas of Interest & Learning</h3>
                  <p className="text-xs text-gray-400 font-light">Active development directions</p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {focusAreas.map((skill) => (
                <InteractiveSkillCard key={skill.key} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
