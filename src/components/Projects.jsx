import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Github, Sparkles, Terminal, Cpu, Lock, Globe } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/socials';

export default function Projects() {
  const [filter, setFilter] = useState('ALL');

  const projects = [
    {
      id: 1,
      title: 'Forge-Fit',
      category: 'AI',
      isPublic: true,
      tags: ['TypeScript', 'AI Fitness', 'Voice Interaction', 'Glassmorphism'],
      desc: 'Next-generation AI fitness platform combining intelligent coaching, workout analytics, voice interaction, and a premium glassmorphic UI.',
      github: 'https://github.com/kamalnath090807-design/Forge-Fit',
      live: 'https://github.com/kamalnath090807-design/Forge-Fit',
      color: 'from-purple-900/30 via-indigo-950/20 to-transparent',
      border: 'border-purple-500/30 hover:border-purple-400/60',
      icon: Sparkles,
    },
    {
      id: 2,
      title: 'VegBill-Pro',
      category: 'FULL-STACK',
      isPublic: true,
      tags: ['JavaScript', 'Electron', 'Node.js', 'SQLite', 'PDF Export'],
      desc: 'Cross-platform wholesale vegetable billing and shop management system built with Electron, Node.js, and SQLite, featuring invoice generation, PDF export, WhatsApp bill sharing, and offline data management.',
      github: 'https://github.com/kamalnath090807-design/VegBill-Pro',
      live: 'https://github.com/kamalnath090807-design/VegBill-Pro',
      color: 'from-cyan-900/30 via-blue-950/20 to-transparent',
      border: 'border-cyan-500/30 hover:border-cyan-400/60',
      icon: Terminal,
    },
    {
      id: 3,
      title: 'Friday-AI',
      category: 'AI',
      isPublic: false,
      tags: ['JavaScript', 'Multimodal AI', 'Voice & Vision', 'LLMs', 'Automation'],
      desc: 'Multimodal desktop AI assistant featuring voice interaction, computer vision, automated coding, local & cloud LLM execution, and workflow orchestration.',
      github: 'https://github.com/kamalnath090807-design/Friday-AI',
      live: 'https://github.com/kamalnath090807-design/Friday-AI',
      color: 'from-pink-900/30 via-rose-950/20 to-transparent',
      border: 'border-pink-500/30 hover:border-pink-400/60',
      icon: Cpu,
    },
  ];

  const filteredProjects =
    filter === 'ALL'
      ? projects
      : projects.filter((p) => p.category === filter || p.tags.includes(filter));

  return (
    <section id="projects" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-transparent">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-purple-400 uppercase tracking-widest border border-purple-500/20 shadow-md">
              <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />
              <span>FEATURED WORK & REPOSITORIES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black font-heading text-white tracking-tight">
              Crafted <span className="text-gradient-purple">Projects</span> & <span className="text-gradient-cyan">Codebases</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 glass-pill p-1.5 rounded-xl border border-white/10 w-fit backdrop-blur-xl">
            {['ALL', 'AI', 'FULL-STACK'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all duration-300 ${
                  filter === cat
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-lg shadow-purple-900/50'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid (Smit-Prajapati Inspired Interactive Hover Reveal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.id} className="project-reveal-card group">
                {/* Rotating Neon Frame Border (Reveals & aligns on hover) */}
                <div className="project-reveal-border" />

                {/* Cyber Light Trail Sweep (Animates on hover) */}
                <div className="project-reveal-trail" />

                {/* Card Header Content */}
                <div className="space-y-4 relative z-10">
                  {/* Category & Status Badges (Slide down on hover) */}
                  <div className="project-reveal-badges flex items-center justify-between">
                    <span className="text-xs font-mono text-purple-300 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-500/30 font-semibold shadow-md">
                      {p.category}
                    </span>
                    {p.isPublic ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-md">
                        <Globe className="w-3 h-3" /> Public
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30 shadow-md">
                        <Lock className="w-3 h-3" /> Private
                      </span>
                    )}
                  </div>

                  {/* Project Icon Badge & Title (ALWAYS VISIBLE by default!) */}
                  <div className="flex items-center gap-3.5 pt-1">
                    <div className="p-3 rounded-2xl bg-gradient-to-tr from-purple-900/60 via-indigo-900/60 to-cyan-900/40 text-white border border-white/15 shadow-[0_0_20px_rgba(168,85,247,0.3)] group-hover:scale-110 group-hover:border-purple-400 transition-all duration-300">
                      <Icon className="w-6 h-6 text-purple-300 group-hover:text-cyan-300" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white group-hover:text-purple-300 transition-colors">
                      {p.title}
                    </h3>
                  </div>

                  {/* Description (ALWAYS VISIBLE by default!) */}
                  <p className="text-xs text-gray-300 font-light leading-relaxed pt-1">
                    {p.desc}
                  </p>

                  {/* Tech Stack Tags (Slide up on hover) */}
                  <div className="project-reveal-tags flex flex-wrap gap-2 pt-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono text-gray-300 bg-white/[0.06] backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Bar (Slide up on hover) */}
                <div className="project-reveal-bottom relative z-10 flex items-center justify-between">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-bold font-mono text-gray-300 hover:text-white transition-colors group/link"
                  >
                    <Github className="w-4 h-4 text-purple-400 group-hover/link:scale-110 transition-transform" />
                    <span>View Repository</span>
                  </a>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold font-mono text-cyan-400 hover:text-cyan-300 transition-colors group/det"
                  >
                    <span>Details</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/det:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

