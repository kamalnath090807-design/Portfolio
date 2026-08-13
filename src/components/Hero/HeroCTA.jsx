import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Mail, Sparkles, Github, Linkedin, Instagram, Twitter, MessageSquare } from 'lucide-react';
import { SOCIAL_LINKS } from '../../data/socials';

export default function HeroCTA({ isLoaded = true }) {
  const ctaRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  const ghRef = useRef(null);
  const liRef = useRef(null);
  const igRef = useRef(null);
  const twRef = useRef(null);
  const dcRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, delay: 2.15, ease: 'power3.out' }
    );
  }, [isLoaded]);

  // Magnetic button physics effect on mouse move
  const handleMouseMove = (e, btnRef) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    gsap.to(btn, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (btnRef) => {
    const btn = btnRef.current;
    if (!btn) return;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={ctaRef} className="flex flex-wrap items-center justify-start gap-4 z-20 pt-2">
      {/* Primary Button */}
      <button
        ref={btn1Ref}
        onMouseMove={(e) => handleMouseMove(e, btn1Ref)}
        onMouseLeave={() => handleMouseLeave(btn1Ref)}
        onClick={() => scrollToSection('projects')}
        className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_45px_rgba(168,85,247,0.65)] transition-shadow duration-300 transform active:scale-95"
      >
        <Sparkles className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform" />
        <span className="tracking-wider">VIEW PROJECTS</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
      </button>

      {/* Secondary Button */}
      <button
        ref={btn2Ref}
        onMouseMove={(e) => handleMouseMove(e, btn2Ref)}
        onMouseLeave={() => handleMouseLeave(btn2Ref)}
        onClick={() => scrollToSection('contact')}
        className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-gray-300 glass-pill hover:text-white hover:border-purple-400/60 shadow-lg hover:shadow-purple-950/40 transition-all duration-300 transform active:scale-95"
      >
        <Mail className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
        <span className="tracking-wider">CONTACT ME</span>
      </button>

      {/* Social Links Pill Group */}
      <div className="flex items-center gap-2 ml-0 sm:ml-2 border-l border-white/10 pl-0 sm:pl-4">
        {/* GitHub Button */}
        <a
          ref={ghRef}
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noreferrer"
          onMouseMove={(e) => handleMouseMove(e, ghRef)}
          onMouseLeave={() => handleMouseLeave(ghRef)}
          className="group relative p-3 rounded-full glass-pill text-gray-300 hover:text-white hover:border-purple-400/80 hover:bg-purple-900/20 shadow-md hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
          title="GitHub Repositories"
          aria-label="GitHub Repositories"
        >
          <Github className="w-4 h-4 text-purple-300 group-hover:scale-110 transition-transform" />
        </a>

        {/* LinkedIn Button */}
        <a
          ref={liRef}
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noreferrer"
          onMouseMove={(e) => handleMouseMove(e, liRef)}
          onMouseLeave={() => handleMouseLeave(liRef)}
          className="group relative p-3 rounded-full glass-pill text-gray-300 hover:text-white hover:border-cyan-400/80 hover:bg-cyan-900/20 shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300"
          title="LinkedIn Profile"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />
        </a>

        {/* Instagram Button */}
        <a
          ref={igRef}
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noreferrer"
          onMouseMove={(e) => handleMouseMove(e, igRef)}
          onMouseLeave={() => handleMouseLeave(igRef)}
          className="group relative p-3 rounded-full glass-pill text-gray-300 hover:text-white hover:border-pink-400/80 hover:bg-pink-900/20 shadow-md hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-300"
          title="Instagram Profile"
          aria-label="Instagram Profile"
        >
          <Instagram className="w-4 h-4 text-pink-300 group-hover:scale-110 transition-transform" />
        </a>

        {/* Twitter / X Button */}
        <a
          ref={twRef}
          href={SOCIAL_LINKS.twitter}
          target="_blank"
          rel="noreferrer"
          onMouseMove={(e) => handleMouseMove(e, twRef)}
          onMouseLeave={() => handleMouseLeave(twRef)}
          className="group relative p-3 rounded-full glass-pill text-gray-300 hover:text-white hover:border-sky-400/80 hover:bg-sky-900/20 shadow-md hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-300"
          title="Twitter / X Profile"
          aria-label="Twitter / X Profile"
        >
          <Twitter className="w-4 h-4 text-sky-300 group-hover:scale-110 transition-transform" />
        </a>

        {/* Discord Button */}
        <a
          ref={dcRef}
          href={SOCIAL_LINKS.discord}
          target="_blank"
          rel="noreferrer"
          onMouseMove={(e) => handleMouseMove(e, dcRef)}
          onMouseLeave={() => handleMouseLeave(dcRef)}
          className="group relative p-3 rounded-full glass-pill text-gray-300 hover:text-white hover:border-indigo-400/80 hover:bg-indigo-900/20 shadow-md hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
          title={`Discord Profile (${SOCIAL_LINKS.discordTag})`}
          aria-label="Discord Profile"
        >
          <MessageSquare className="w-4 h-4 text-indigo-300 group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </div>
  );
}

