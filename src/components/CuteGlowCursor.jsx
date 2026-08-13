import React, { useEffect, useRef } from 'react';

const CuteGlowCursor = ({
  color = '#06b6d4',           // Electric Cyan
  accentColor = '#a855f7',     // Vibrant Violet
  coreRadius = 6,              // Central Earth core radius (12px diameter)
  hoverCoreRadius = 9,         // Expands slightly on hover
  orbitRadius = 15,            // Minimal orbit distance for Moon (15px radius)
  hoverOrbitRadius = 28,       // Orbit distance expands on hover
  orbitSpeed = 0.045,          // Smooth continuous orbital spin
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const isHoveredState = useRef(false);
  const lastHoverTarget = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // High-DPI screen resolution scaling
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // 1:1 Instant Mouse Pointer Coordinate Tracking with optimized target check
    const handlePointerMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      if (e.target && e.target !== lastHoverTarget.current) {
        lastHoverTarget.current = e.target;
        const isInteractive = e.target.closest(
          'a, button, input, textarea, select, [role="button"], .uiverse-card, .glass-panel, .glass-pill, [data-interactive="true"], .group, article, section > div, .card'
        );
        isHoveredState.current = !!isInteractive;
      }
    };

    const handleMouseOver = (e) => {
      if (!e.target) return;
      lastHoverTarget.current = e.target;
      const isInteractive = e.target.closest(
        'a, button, input, textarea, select, [role="button"], .uiverse-card, .glass-panel, .glass-pill, [data-interactive="true"], .group, article, section > div, .card'
      );
      isHoveredState.current = !!isInteractive;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    let angle = 0;
    let time = 0;
    let currentCoreR = coreRadius;
    let currentOrbitR = orbitRadius;

    const render = () => {
      time += 0.04;
      angle += isHoveredState.current ? orbitSpeed * 1.3 : orbitSpeed;

      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Direct 1:1 mouse position — zero lag, Earth orb sits EXACTLY at pointer
      const cx = mouseRef.current.x;
      const cy = mouseRef.current.y;

      if (cx >= 0 && cy >= 0) {
        const isHover = isHoveredState.current;
        const targetCoreR = isHover ? hoverCoreRadius : coreRadius;
        const targetOrbitR = isHover ? hoverOrbitRadius : orbitRadius;

        // Smooth size transitions for interactive hover state
        currentCoreR += (targetCoreR - currentCoreR) * 0.2;
        currentOrbitR += (targetOrbitR - currentOrbitR) * 0.2;

        // Subtle breathing pulsation on central core
        const pulse = 1 + Math.sin(time * 2.5) * 0.06;
        const coreR = currentCoreR * pulse;

        // -------------------------------------------------------------
        // 1. FAINT ORBITAL PATH DASHED RING
        // -------------------------------------------------------------
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, currentOrbitR, 0, Math.PI * 2);
        ctx.strokeStyle = isHover ? 'rgba(56, 189, 248, 0.32)' : 'rgba(6, 182, 212, 0.16)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        ctx.stroke();
        ctx.restore();

        // -------------------------------------------------------------
        // 2. CENTRAL ORB ("EARTH CURSOR") — GPU Hardware-Accelerated Gradients
        // -------------------------------------------------------------

        // A. Diffused Outer Halo Gradient
        const haloGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 3.4);
        haloGrad.addColorStop(0, 'rgba(6, 182, 212, 0.55)');
        haloGrad.addColorStop(0.45, 'rgba(168, 85, 247, 0.28)');
        haloGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, coreR * 3.4, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();
        ctx.restore();

        // B. Primary Luminous Core (White -> Cyan -> Violet)
        const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 1.5);
        coreGrad.addColorStop(0, '#ffffff');                     // White hot center tip
        coreGrad.addColorStop(0.35, 'rgba(56, 189, 248, 0.95)'); // Electric cyan body
        coreGrad.addColorStop(0.75, 'rgba(168, 85, 247, 0.85)'); // Violet outer rim
        coreGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, coreR * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();
        ctx.restore();

        // -------------------------------------------------------------
        // 3. ORBITING TINY MOON SATELLITE (GPU-Accelerated Radial Gradient)
        // -------------------------------------------------------------
        const moonX = cx + Math.cos(angle) * currentOrbitR;
        const moonY = cy + Math.sin(angle) * currentOrbitR;
        const moonR = 2.8;

        // A. Moon Soft Glow Gradient
        const moonGlow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 9);
        moonGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        moonGlow.addColorStop(0.3, 'rgba(56, 189, 248, 0.8)');
        moonGlow.addColorStop(0.7, 'rgba(168, 85, 247, 0.35)');
        moonGlow.addColorStop(1, 'transparent');

        ctx.save();
        ctx.beginPath();
        ctx.arc(moonX, moonY, 9, 0, Math.PI * 2);
        ctx.fillStyle = moonGlow;
        ctx.fill();
        ctx.restore();

        // B. Moon Core Particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [color, accentColor, coreRadius, hoverCoreRadius, orbitRadius, hoverOrbitRadius, orbitSpeed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'block',
      }}
    />
  );
};

export default CuteGlowCursor;
