import React from 'react';
import { ArrowUp, Github, Linkedin, Instagram, Twitter, MessageSquare } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/socials';
import ShareButtonWidget from './ShareButtonWidget';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 sm:px-12 bg-transparent border-t border-white/5 text-gray-400 text-xs relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm">
            KB
          </div>
          <div>
            <span className="text-white font-bold block font-heading text-sm">KAMALNATH B.</span>
            <span className="text-[10px] text-gray-500 font-mono">
              Sri Krishna College of Engineering and Technology (2025–2029)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-center sm:text-left font-mono">
            © {new Date().getFullYear()} KAMALNATH B.
          </p>
          <div className="flex items-center gap-2 border-l border-white/10 pl-4">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full glass-pill hover:border-purple-400 text-gray-400 hover:text-white transition-all"
              title="GitHub Repositories"
              aria-label="GitHub Repositories"
            >
              <Github className="w-4 h-4 text-purple-400" />
            </a>

            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full glass-pill hover:border-cyan-400 text-gray-400 hover:text-white transition-all"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 text-cyan-400" />
            </a>

            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full glass-pill hover:border-pink-400 text-gray-400 hover:text-white transition-all"
              title="Instagram Profile"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
            </a>

            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full glass-pill hover:border-sky-400 text-gray-400 hover:text-white transition-all"
              title="Twitter / X Profile"
              aria-label="Twitter / X Profile"
            >
              <Twitter className="w-4 h-4 text-sky-400" />
            </a>

            <a
              href={SOCIAL_LINKS.discord}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full glass-pill hover:border-indigo-400 text-gray-400 hover:text-white transition-all"
              title={`Discord (${SOCIAL_LINKS.discordTag})`}
              aria-label="Discord Profile"
            >
              <MessageSquare className="w-4 h-4 text-indigo-400" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ShareButtonWidget compact={true} />
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full glass-pill text-gray-300 hover:text-white hover:border-purple-400 transition-all"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

