import React from 'react';
import { Github, Linkedin, Instagram, Twitter, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/socials';

export default function SocialCardWidget() {
  return (
    <div className="uiverse-card group">
      {/* Background Cyber Glow */}
      <div className="uiverse-bg" />

      {/* Center Brand Logo / Badge */}
      <div className="uiverse-logo flex flex-col items-center justify-center text-center z-10 pointer-events-none">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 flex items-center justify-center font-black text-white text-xl shadow-[0_0_30px_rgba(168,85,247,0.6)] border border-white/20">
          KB
        </div>
        <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill border border-white/20 text-[11px] font-mono text-purple-300 tracking-widest uppercase font-bold shadow-lg">
          <Sparkles className="w-3 h-3 text-cyan-300 animate-pulse" />
          <span>HOVER TO CONNECT</span>
        </div>
      </div>

      {/* Layer 1: Instagram */}
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noreferrer"
        className="uiverse-box uiverse-box1 flex items-start justify-end group/box"
        title="Instagram Profile (@kamal_09_08_07)"
      >
        <div className="relative z-10 p-1.5 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 group-hover/box:scale-125 transition-transform">
          <Instagram className="w-5 h-5 text-pink-300 drop-shadow-[0_0_8px_rgba(255,83,212,0.9)]" />
        </div>
      </a>

      {/* Layer 2: Twitter / X */}
      <a
        href={SOCIAL_LINKS.twitter}
        target="_blank"
        rel="noreferrer"
        className="uiverse-box uiverse-box2 flex items-start justify-end group/box"
        title="Twitter / X Profile (@BKamalnath32229)"
      >
        <div className="relative z-10 p-1.5 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 group-hover/box:scale-125 transition-transform">
          <Twitter className="w-5 h-5 text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
        </div>
      </a>

      {/* Layer 3: Discord */}
      <a
        href={SOCIAL_LINKS.discord}
        target="_blank"
        rel="noreferrer"
        className="uiverse-box uiverse-box3 flex items-start justify-end group/box"
        title={`Discord Profile (${SOCIAL_LINKS.discordTag})`}
      >
        <div className="relative z-10 p-1.5 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 group-hover/box:scale-125 transition-transform">
          <MessageSquare className="w-5 h-5 text-indigo-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
        </div>
      </a>

      {/* Layer 4: LinkedIn */}
      <a
        href={SOCIAL_LINKS.linkedin}
        target="_blank"
        rel="noreferrer"
        className="uiverse-box uiverse-box4 flex items-start justify-end group/box"
        title="LinkedIn Profile"
      >
        <div className="relative z-10 p-1.5 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 group-hover/box:scale-125 transition-transform">
          <Linkedin className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
        </div>
      </a>

      {/* Layer 5: GitHub */}
      <a
        href={SOCIAL_LINKS.github}
        target="_blank"
        rel="noreferrer"
        className="uiverse-box uiverse-box5 flex items-start justify-end group/box"
        title="GitHub Repositories"
      >
        <div className="relative z-10 p-1.5 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 group-hover/box:scale-125 transition-transform">
          <Github className="w-5 h-5 text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
        </div>
      </a>
    </div>
  );
}
