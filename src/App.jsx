import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AiTools from './components/AiTools';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CuteGlowCursor from './components/CuteGlowCursor';
import ClickSpark from './components/ClickSpark';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-purple-500 selection:text-white relative overflow-x-hidden">
      {/* Glowing Earth Core at pointer with Moon orbit that zooms/expands on hover */}
      <CuteGlowCursor 
        color="#06b6d4" 
        accentColor="#a855f7" 
        coreRadius={6} 
        hoverCoreRadius={8} 
        orbitRadius={15} 
        hoverOrbitRadius={28} 
        orbitSpeed={0.04}
      />





      {/* Subtle, refined click spark animation */}
      <ClickSpark 
        sparkColor="#06b6d4" 
        accentSparkColor="#a855f7" 
        sparkSize={7} 
        sparkRadius={16} 
        sparkCount={8} 
        duration={350}
      />


      {/* Global Seamless Ambient Grid Overlay */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0" />


      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <AiTools />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

