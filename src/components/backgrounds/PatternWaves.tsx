import React, { useEffect, useRef } from 'react';

interface PatternWavesProps {
  className?: string;
  lineColor?: string;
  speed?: number;
  waveCount?: number;
  waveHeight?: number;
  opacity?: number;
}

export const PatternWaves: React.FC<PatternWavesProps> = ({
  className = '',
  lineColor = 'rgba(52, 211, 153, 0.18)',
  speed = 0.008,
  waveCount = 8,
  waveHeight = 35,
  opacity = 0.7
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let t = 0;
    let isVisible = true;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.scale(dpr, dpr);
    };

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    const draw = () => {
      if (!isVisible) return;
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : 800;
      const h = parent ? parent.clientHeight : 600;

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = opacity;
      ctx.lineWidth = 1.2;

      for (let i = 0; i < waveCount; i++) {
        const offset = (i / waveCount) * Math.PI * 2;
        const yBase = (h * 0.25) + (i * (h * 0.55 / waveCount));

        ctx.beginPath();
        ctx.strokeStyle = lineColor;

        for (let x = 0; x <= w; x += 12) {
          const y = yBase + Math.sin(x * 0.006 + t + offset) * waveHeight + Math.cos(x * 0.003 - t * 0.7) * (waveHeight * 0.5);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      t += speed;
      animId = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && animId === 0) {
        animId = requestAnimationFrame(draw);
      } else if (!isVisible && animId !== 0) {
        cancelAnimationFrame(animId);
        animId = 0;
      }
    });
    io.observe(canvas);

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
    };
  }, [lineColor, speed, waveCount, waveHeight, opacity]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
