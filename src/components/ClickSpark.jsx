import React, { useRef, useEffect, useCallback } from 'react';

const ClickSpark = ({
  sparkColor = '#06b6d4',
  accentSparkColor = '#a855f7',
  sparkSize = 7,
  sparkRadius = 16,
  sparkCount = 8,
  duration = 350,
  easing = 'ease-out',
  extraScale = 1.2,
  children,
  className = '',
  style,
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const easeFunc = useCallback(
    (t) => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  const draw = useCallback(
    (timestamp) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.save();
        ctx.strokeStyle = spark.color;
        ctx.lineWidth = spark.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();

        return true;
      });

      if (sparksRef.current.length > 0) {
        animFrameRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animFrameRef.current = null;
      }
    },
    [duration, easeFunc, sparkRadius, extraScale, sparkSize]
  );

  const addSparksAt = useCallback(
    (x, y) => {
      const now = performance.now();
      const colors = [sparkColor, accentSparkColor, '#ec4899', '#ffffff'];
      const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount + (Math.random() * 0.2 - 0.1),
        color: colors[i % colors.length],
        width: Math.random() > 0.5 ? 2.0 : 1.2,
        startTime: now,
      }));

      sparksRef.current.push(...newSparks);

      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(draw);
      }
    },
    [sparkColor, accentSparkColor, sparkCount, draw]
  );

  useEffect(() => {
    const handleGlobalClick = (e) => {
      addSparksAt(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handleGlobalClick);
    return () => {
      window.removeEventListener('pointerdown', handleGlobalClick);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [addSparksAt]);

  if (!children) {
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
          zIndex: 9998,
          userSelect: 'none',
        }}
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          userSelect: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
