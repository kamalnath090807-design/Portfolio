import React, { useEffect, useRef } from 'react';

export default function NeuralBrainCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = (canvas.width = 240);
    const height = (canvas.height = 200);
    const cx = width / 2;
    const cy = height / 2 - 10;

    // Optimized 3D Neural Brain Nodes
    const nodeCount = 95;
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      const isLeft = Math.random() > 0.5;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;

      let rx = (Math.sin(phi) * Math.cos(theta)) * 55;
      let ry = (Math.cos(phi)) * 42;
      let rz = (Math.sin(phi) * Math.sin(theta)) * 48;

      if (isLeft) rx -= 4;
      else rx += 4;

      if (Math.random() < 0.2) {
        ry += 18;
        rx *= 0.6;
        rz -= 10;
      }

      nodes.push({
        x: rx,
        y: ry,
        z: rz,
        size: Math.random() * 1.5 + 1.2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const impulseCount = 8;
    const impulses = [];
    for (let i = 0; i < impulseCount; i++) {
      impulses.push({
        from: Math.floor(Math.random() * nodeCount),
        to: Math.floor(Math.random() * nodeCount),
        progress: Math.random(),
        speed: Math.random() * 0.025 + 0.015,
      });
    }

    let angleY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angleY += 0.007;

      const projected = [];
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];
        node.pulsePhase += node.pulseSpeed;

        const rx = node.x * cosY - node.z * sinY;
        const rz = node.x * sinY + node.z * cosY;
        const ry = node.y + Math.sin(node.pulsePhase) * 1.5;

        const fov = 180;
        const scale = fov / (fov + rz + 100);
        const px = cx + rx * scale;
        const py = cy + ry * scale;

        projected.push({ x: px, y: py, z: rz, scale, node });
      }

      // Synaptic Connection Lines (Optimized)
      ctx.lineWidth = 0.7;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j += 2) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 1024) { // 32^2 = 1024
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / 32) * 0.45 * Math.min(p1.scale, p2.scale);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = i % 2 === 0 ? `rgba(168, 85, 247, ${alpha})` : `rgba(6, 182, 212, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Energy Impulses (No CPU-heavy shadowBlur)
      for (let i = 0; i < impulseCount; i++) {
        const imp = impulses[i];
        imp.progress += imp.speed;
        if (imp.progress >= 1) {
          imp.progress = 0;
          imp.from = Math.floor(Math.random() * nodeCount);
          imp.to = Math.floor(Math.random() * nodeCount);
        }

        const p1 = projected[imp.from];
        const p2 = projected[imp.to];
        if (p1 && p2) {
          const ix = p1.x + (p2.x - p1.x) * imp.progress;
          const iy = p1.y + (p2.y - p1.y) * imp.progress;

          ctx.beginPath();
          ctx.arc(ix, iy, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = '#06b6d4';
          ctx.fill();
        }
      }

      // Neural Nodes
      for (let i = 0; i < nodeCount; i++) {
        const p = projected[i];
        const opacity = Math.max(0.2, (p.z + 50) / 100);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.node.size * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? `rgba(236, 72, 153, ${opacity})` : i % 2 === 0 ? `rgba(168, 85, 247, ${opacity})` : `rgba(56, 189, 248, ${opacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="w-[180px] h-[150px] pointer-events-none drop-shadow-[0_0_25px_rgba(168,85,247,0.7)]" />
    </div>
  );
}
