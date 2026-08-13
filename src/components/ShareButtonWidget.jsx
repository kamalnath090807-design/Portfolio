import React, { useState } from 'react';
import { Share2, Check, Github, Linkedin, Instagram, Twitter, MessageSquare } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/socials';

export default function ShareButtonWidget({ compact = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareText = encodeURIComponent("Check out KAMALNATH B.'s AI & Software Engineering Portfolio!");
  const shareUrl = encodeURIComponent(window.location.href);
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;

  return (
    <div className="uiverse-share-container group/share">
      {/* Primary Button */}
      <button
        onClick={handleCopyLink}
        className={`uiverse-share-button ${compact ? 'px-4 py-2 text-xs' : 'px-6 py-2.5 text-xs sm:text-sm'}`}
        title="Share Portfolio"
        aria-label="Share Portfolio"
      >
        <span className="font-bold tracking-wider font-mono">
          {copied ? 'COPIED LINK!' : 'SHARE PORTFOLIO'}
        </span>
        {copied ? (
          <Check className="w-4 h-4 text-emerald-300 animate-bounce" />
        ) : (
          <Share2 className="w-4 h-4 uiverse-share-icon" />
        )}
      </button>

      {/* Tooltip Content (Pops down on hover) */}
      <div className="uiverse-share-tooltip">
        <div className="text-[10px] font-mono text-purple-300 uppercase tracking-widest text-center mb-2.5 font-bold">
          Quick Share
        </div>

        <div className="flex items-center justify-center gap-2.5">
          {/* GitHub */}
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="uiverse-share-social-btn uiverse-share-gh"
            title="GitHub"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* LinkedIn */}
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="uiverse-share-social-btn uiverse-share-li"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Twitter / X */}
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noreferrer"
            className="uiverse-share-social-btn uiverse-share-tw"
            title="Share on Twitter/X"
            aria-label="Share on Twitter/X"
          >
            <Twitter className="w-4 h-4" />
          </a>

          {/* Instagram */}
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            className="uiverse-share-social-btn uiverse-share-ig"
            title="Instagram"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* Discord */}
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noreferrer"
            className="uiverse-share-social-btn uiverse-share-dc"
            title="Discord"
            aria-label="Discord"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
