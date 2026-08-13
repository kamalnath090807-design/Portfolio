import React, { useState } from 'react';
import { Network } from 'lucide-react';
import { OrbitingCircles } from './ui/OrbitingCircles';
import NeuralBrainCanvas from './NeuralBrainCanvas';

// Official Recognizable Vector Logos for 8 AI Platforms (Clean White Circular Badges)
const AiLogos = {
  // Ring 1 — Claude (Official Anthropic / Claude Asterisk Spark)
  claude: () => (
    <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-[0_0_22px_rgba(217,119,87,0.9)] group-hover/orbit-item:shadow-[0_0_35px_rgba(217,119,87,1)] transition-all">
      <svg className="w-6.5 h-6.5" viewBox="0 0 24 24" fill="#D97757" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12.5523 2 13 2.44772 13 3V8.58579L16.9497 4.63604C17.3403 4.24552 17.9734 4.24552 18.364 4.63604C18.7545 5.02656 18.7545 5.65973 18.364 6.05025L14.4142 10H20C20.5523 10 21 10.4477 21 11C21 11.5523 20.5523 12 20 12H14.4142L18.364 15.9497C18.7545 16.3403 18.7545 16.9734 18.364 17.364C17.9734 17.7545 17.3403 17.7545 16.9497 17.364L13 13.4142V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13.4142L7.05025 17.364C6.65973 17.7545 6.02656 17.7545 5.63604 17.364C5.24552 16.9734 5.24552 16.3403 5.63604 15.9497L9.58579 12H4C3.44772 12 3 11.5523 3 11C3 10.4477 3.44772 10 4 10H9.58579L5.63604 6.05025C5.24552 5.65973 5.24552 5.02656 5.63604 4.63604C6.02656 4.24552 6.65973 4.24552 7.05025 4.63604L11 8.58579V3C11 2.44772 11.4477 2 12 2Z" />
      </svg>
    </div>
  ),

  // Ring 2 — Gemini (Google Gemini Multicolor Star)
  gemini: () => (
    <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-[0_0_22px_rgba(145,104,192,0.9)] group-hover/orbit-item:shadow-[0_0_35px_rgba(145,104,192,1)] transition-all">
      <svg className="w-6.5 h-6.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z"
          fill="url(#geminiGrad6)"
        />
        <defs>
          <linearGradient id="geminiGrad6" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4E87FF" />
            <stop offset="0.5" stopColor="#9168C0" />
            <stop offset="1" stopColor="#D05C94" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),

  // Ring 3 — ChatGPT (OpenAI Green Knot)
  chatgpt: () => (
    <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-[0_0_22px_rgba(16,163,127,0.9)] group-hover/orbit-item:shadow-[0_0_35px_rgba(16,163,127,1)] transition-all">
      <svg className="w-6.5 h-6.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.28 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9 6.065 6.065 0 0 0-10.273 2.17 5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .511 4.91 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.989 5.989 0 0 0 3.998-2.9 6.056 6.056 0 0 0-.748-7.073zm-9.022 12.608a4.476 4.476 0 0 1-2.876-1.04l.142-.08 4.778-2.759a.795.795 0 0 0 .393-.681v-6.737l2.02 1.169a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.495 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.758a.771.771 0 0 0 .78 0l5.843-3.368v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.499 4.499 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.814 3.354-2.02 1.169a.076.076 0 0 1-.071 0l-4.83-2.787A4.504 4.504 0 0 1 2.34 7.872zm16.596 3.856l-5.832-3.388 2.015-1.164a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.104v-5.677a.79.79 0 0 0-.408-.667zm2.01-3.023l-.142-.085-4.773-2.782a.7759.7759 0 0 0-.7854 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.499 4.499 0 0 1 6.68 4.66zM8.307 12.863l-2.02-1.164a.08.08 0 0 1-.038-.057V6.074a4.499 4.499 0 0 1 7.376-3.454l-.142.08-4.777 2.759a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v3l-2.597 1.5-2.607-1.5z"
          fill="#10A37F"
        />
      </svg>
    </div>
  ),

  // Ring 4 — Canva AI (Canva Gradient Circle Logo)
  canva: () => (
    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#00C4CC] to-[#7D2AE8] flex items-center justify-center shadow-[0_0_22px_rgba(0,196,204,0.9)] group-hover/orbit-item:shadow-[0_0_35px_rgba(0,196,204,1)] transition-all">
      <span className="font-serif italic font-bold text-white text-xs tracking-tight">Canva</span>
    </div>
  ),

  // Ring 5 — Gamma (Gamma Purple/Pink Cube)
  gamma: () => (
    <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-[0_0_22px_rgba(139,92,246,0.9)] group-hover/orbit-item:shadow-[0_0_35px_rgba(139,92,246,1)] transition-all">
      <svg className="w-6.5 h-6.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="6" fill="url(#gammaGrad6)" />
        <path d="M7 16V8l5 4-5 4zm10-8v8l-5-4 5-4z" fill="#FFFFFF" />
        <defs>
          <linearGradient id="gammaGrad6" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  ),

  // Ring 6 — Google AI Studio (Connected Nodes)
  googleAiStudio: () => (
    <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-[0_0_22px_rgba(66,133,244,0.9)] group-hover/orbit-item:shadow-[0_0_35px_rgba(66,133,244,1)] transition-all">
      <svg className="w-6.5 h-6.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="3" fill="#4285F4" />
        <circle cx="18" cy="6" r="3" fill="#EA4335" />
        <circle cx="12" cy="18" r="3" fill="#34A853" />
        <path d="M6 6L18 6L12 18Z" stroke="#FBBC04" strokeWidth="1.5" />
      </svg>
    </div>
  ),

  // Ring 7 — Groq (Orange Groq Text Logo)
  groq: () => (
    <div className="w-11 h-11 rounded-full bg-[#1A0B08] border border-[#F55036]/80 flex items-center justify-center shadow-[0_0_22px_rgba(245,80,54,0.9)] group-hover/orbit-item:shadow-[0_0_35px_rgba(245,80,54,1)] transition-all">
      <span className="font-mono font-black text-[#F55036] text-[11px] lowercase tracking-tight">groq</span>
    </div>
  ),

  // Ring 8 — Ollama (White Llama Mascot Badge)
  ollama: () => (
    <div className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-[0_0_22px_rgba(255,255,255,0.9)] group-hover/orbit-item:shadow-[0_0_35px_rgba(255,255,255,1)] transition-all">
      <svg className="w-6.5 h-6.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V4z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="10" r="1" fill="#000000" />
        <circle cx="15" cy="10" r="1" fill="#000000" />
        <path d="M10 14s1 1 2 1 2-1 2-1" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  ),
};

export default function AiTools() {
  const [activeTool, setActiveTool] = useState(null);

  // STRICT 1 AI TOOL = 1 ORBIT RING MAPPING (GENEROUS 50PX RADIAL STEP PREVENTS ALL OVERLAPS)
  const rings = [
    {
      ringNumber: 1,
      id: 'claude',
      name: 'Claude',
      sub: 'Anthropic',
      desc: 'Advanced Reasoning & Context',
      component: AiLogos.claude,
      radius: 110,
      duration: 20,
      reverse: false,
    },
    {
      ringNumber: 2,
      id: 'gemini',
      name: 'Gemini',
      sub: 'Google',
      desc: 'Multimodal AI & Neural Engine',
      component: AiLogos.gemini,
      radius: 160,
      duration: 26,
      reverse: true,
    },
    {
      ringNumber: 3,
      id: 'chatgpt',
      name: 'ChatGPT',
      sub: 'OpenAI',
      desc: 'GPT-4o & Generative Intelligence',
      component: AiLogos.chatgpt,
      radius: 210,
      duration: 32,
      reverse: false,
    },
    {
      ringNumber: 4,
      id: 'canva',
      name: 'Canva AI',
      sub: 'Canva',
      desc: 'AI Visual Design & Magic Media',
      component: AiLogos.canva,
      radius: 260,
      duration: 38,
      reverse: true,
    },
    {
      ringNumber: 5,
      id: 'gamma',
      name: 'Gamma',
      sub: 'Gamma AI',
      desc: 'AI Presentations & Web Docs',
      component: AiLogos.gamma,
      radius: 310,
      duration: 44,
      reverse: false,
    },
    {
      ringNumber: 6,
      id: 'google-studio',
      name: 'Google AI Studio',
      sub: 'Google Cloud',
      desc: 'Prototyping & Gemini APIs',
      component: AiLogos.googleAiStudio,
      radius: 360,
      duration: 50,
      reverse: true,
    },
    {
      ringNumber: 7,
      id: 'groq',
      name: 'Groq',
      sub: 'Groq LPU',
      desc: 'Ultra-High-Speed Inference Engine',
      component: AiLogos.groq,
      radius: 410,
      duration: 56,
      reverse: false,
    },
    {
      ringNumber: 8,
      id: 'ollama',
      name: 'Ollama',
      sub: 'Local AI',
      desc: 'Local LLM & Quantized Models',
      component: AiLogos.ollama,
      radius: 460,
      duration: 62,
      reverse: true,
    },
  ];

  return (
    <section id="ai-ecosystem" className="relative py-28 px-4 sm:px-8 lg:px-12 bg-transparent overflow-hidden">
      {/* Background Atmosphere Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-purple-900/15 rounded-full blur-[260px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-purple-400 uppercase tracking-widest border border-purple-500/20 shadow-md">
            <Network className="w-3.5 h-3.5 text-purple-400" />
            <span>AI CORE & ORBITAL ECOSYSTEM</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-white tracking-tight leading-tight">
            Powered by Modern <span className="text-gradient-purple">AI Systems</span> & <span className="text-gradient-cyan">LLMs</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
            Integrating industry-grade AI models, local neural architectures, and high-speed LPUs into full-stack engineering.
          </p>
        </div>

        {/* 8-Ring Concentric Orbit System Canvas (Generous 50px Radial Steps Eliminate All Overlaps!) */}
        <div className="relative flex h-[840px] sm:h-[920px] lg:h-[980px] w-full flex-col items-center justify-center overflow-hidden">
          {/* Center 3D Digital Neural Brain */}
          <div className="relative z-30 pointer-events-auto">
            <NeuralBrainCanvas />
          </div>

          {/* 8 INDIVIDUAL CONCENTRIC ORBIT RINGS (1 AI LOGO PER RING) */}
          {rings.map((ring) => {
            const LogoComponent = ring.component;
            const isHovered = activeTool === ring.id;
            return (
              <OrbitingCircles
                key={ring.id}
                radius={ring.radius}
                duration={ring.duration}
                reverse={ring.reverse}
                iconSize={44}
              >
                <div
                  onMouseEnter={() => setActiveTool(ring.id)}
                  onMouseLeave={() => setActiveTool(null)}
                  className={`group/orbit-item relative flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isHovered ? 'scale-125 z-50' : 'hover:scale-110'
                  }`}
                >
                  <LogoComponent />

                  {/* Elegant Glass Tooltip Revealed ONLY on Hover */}
                  {isHovered && (
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 w-48 p-3 rounded-xl glass-panel border border-white/20 bg-[#0f111a]/95 text-center shadow-2xl z-50 pointer-events-none animate-fadeIn">
                      <span className="block text-xs font-bold text-white font-heading">
                        {ring.name}
                      </span>
                      <span className="block text-[10px] text-purple-300 font-mono font-semibold">
                        {ring.sub}
                      </span>
                      <span className="block text-[9px] text-gray-300 font-mono mt-1 font-light leading-tight">
                        {ring.desc}
                      </span>
                    </div>
                  )}
                </div>
              </OrbitingCircles>
            );
          })}
        </div>
      </div>
    </section>
  );
}
