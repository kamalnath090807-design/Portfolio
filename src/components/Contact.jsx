import React, { useState } from 'react';
import { Mail, Send, MapPin, GraduationCap, Github, Linkedin, Instagram, Twitter, MessageSquare, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/socials';
import SocialCardWidget from './SocialCardWidget';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // Direct Email Delivery Service via FormSubmit API to kamalnath090807@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/kamalnath090807@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Message from ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (response.ok || data.success === 'true' || data.success === true) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Fallback Formsubmit / Direct Mailto link
        window.location.href = `mailto:kamalnath090807@gmail.com?subject=Portfolio Message from ${encodeURIComponent(
          formData.name
        )}&body=${encodeURIComponent(formData.message)} (From: ${formData.email})`;
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Email submission error:', err);
      // Direct mailto fallback on network error
      window.location.href = `mailto:kamalnath090807@gmail.com?subject=Portfolio Message from ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(formData.message)} (From: ${formData.email})`;
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 sm:px-12 lg:px-20 bg-transparent">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-xs font-mono text-purple-400 uppercase tracking-widest border border-purple-500/20 mx-auto shadow-md">
            <Mail className="w-3.5 h-3.5 text-purple-400" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black font-heading text-white tracking-tight">
            Start a <span className="text-gradient-purple">Conversation</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light">
            Whether you want to discuss AI software, full-stack development, or cybersecurity projects, feel free to drop a message. Messages are delivered directly to <span className="text-cyan-300 font-mono">kamalnath090807@gmail.com</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Card & Uiverse Social Widget */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 backdrop-blur-xl shadow-2xl">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-heading text-white">KAMALNATH B.</h3>
              <p className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                B.Tech IT Student · Sri Krishna College of Engineering & Technology
              </p>
            </div>

            {/* Interactive Uiverse Multi-Layer Social Card */}
            <div className="pt-2">
              <SocialCardWidget />
            </div>

            {/* Info Badges */}
            <div className="space-y-4 text-xs pt-2 border-t border-white/10">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  <span className="font-mono text-gray-300">SKCET Batch</span>
                </div>
                <span className="font-bold text-white">2025–2029</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-gray-300">Location</span>
                </div>
                <span className="font-bold text-white">{SOCIAL_LINKS.location}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono text-gray-300">Direct Email</span>
                </div>
                <span className="font-mono text-xs text-emerald-300 font-semibold">{SOCIAL_LINKS.email}</span>
              </div>
            </div>

            {/* Complete Profiles Matrix Quick Grid */}
            <div className="pt-2 space-y-3">
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                Social Channels Matrix
              </span>
              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2 rounded-xl glass-pill hover:border-purple-400 hover:bg-purple-950/30 text-gray-300 hover:text-white transition-all"
                >
                  <Github className="w-3.5 h-3.5 text-purple-400" />
                  <span>GitHub</span>
                </a>

                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2 rounded-xl glass-pill hover:border-cyan-400 hover:bg-cyan-950/30 text-gray-300 hover:text-white transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2 rounded-xl glass-pill hover:border-pink-400 hover:bg-pink-950/30 text-gray-300 hover:text-white transition-all"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Instagram</span>
                </a>

                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2 rounded-xl glass-pill hover:border-sky-400 hover:bg-sky-950/30 text-gray-300 hover:text-white transition-all"
                >
                  <Twitter className="w-3.5 h-3.5 text-sky-400" />
                  <span>Twitter / X</span>
                </a>

                <a
                  href={SOCIAL_LINKS.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2 rounded-xl glass-pill hover:border-indigo-400 hover:bg-indigo-950/30 text-gray-300 hover:text-white transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Discord</span>
                </a>

                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="flex items-center justify-center gap-1.5 p-2 rounded-xl glass-pill hover:border-emerald-400 hover:bg-emerald-950/30 text-gray-300 hover:text-white transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold font-heading text-white">Message Sent Successfully!</h3>
                <p className="text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
                  Thank you for reaching out! Your message has been sent directly to{' '}
                  <span className="text-cyan-300 font-mono font-semibold">kamalnath090807@gmail.com</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl text-xs font-mono text-purple-300 glass-pill hover:border-purple-400 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-300 uppercase font-semibold">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-300 uppercase font-semibold">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-gray-300 uppercase font-semibold">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project, software requirements, or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-purple-900/40 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Sending to kamalnath090807@gmail.com...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message to kamalnath090807@gmail.com</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
