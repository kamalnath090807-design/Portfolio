import React, { useState, useEffect } from 'react';
import { Terminal, User, Cpu, FolderGit2, Mail, Menu, X, Github, Linkedin } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/socials';
import ShareButtonWidget from './ShareButtonWidget';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'About', href: '#about', id: 'about', icon: User },
    { name: 'Skills', href: '#skills', id: 'skills', icon: Cpu },
    { name: 'Projects', href: '#projects', id: 'projects', icon: FolderGit2 },
    { name: 'Contact', href: '#contact', id: 'contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active Section Scroll Spy Logic
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId === 'hero' ? 'hero-container' : sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const el = targetId === '' ? document.getElementById('hero-container') : document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#050508]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={(e) => scrollToSection(e, '#')}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-purple-500/25 group-hover:scale-105 group-hover:shadow-purple-500/40 transition-all duration-300">
            KB
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-white text-base tracking-wide group-hover:text-purple-300 transition-colors">
              KAMALNATH B.
            </span>
            <span className="text-[10px] font-mono text-purple-400/90 uppercase tracking-widest">
              Aspiring Software Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Items with Active ScrollSpy Pill */}
        <nav className="hidden md:flex items-center gap-1 glass-pill px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-purple-600/80 to-cyan-500/80 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300' : 'text-purple-400'}`} />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right CTA, Social Icons & Share Button Widget */}
        <div className="hidden md:flex items-center gap-3">
          {/* Uiverse Share Button Widget */}
          <ShareButtonWidget compact={true} />

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white bg-purple-600/30 border border-purple-500/50 hover:bg-purple-600/50 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl glass-pill text-gray-300 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5 text-cyan-400" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-6 py-5 space-y-3 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-purple-600/30 text-white border border-purple-500/40 font-bold'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <Icon className="w-4 h-4 text-purple-400" />
                <span>{link.name}</span>
              </a>
            );
          })}

          <div className="pt-3 border-t border-white/10 flex items-center justify-around">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-gray-300 glass-pill hover:text-white"
            >
              <Github className="w-4 h-4 text-purple-400" />
              <span>GitHub</span>
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-gray-300 glass-pill hover:text-white"
            >
              <Linkedin className="w-4 h-4 text-cyan-400" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
