import React, { useEffect, useRef } from 'react';

interface OrbGlowProps {
  className?: string;
  orbColor?: string;
  radius?: number;
}

export const OrbGlow: React.FC<OrbGlowProps> = ({
  className = '',
  orbColor = 'rgba(52, 211, 153, 0.15)',
  radius = 280
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let isVisible = true;
    let t = 0;

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

      // Two breathing orbs gently floating
      const x1 = w * 0.4 + Math.sin(t * 0.008) * 80;
      const y1 = h * 0.45 + Math.cos(t * 0.01) * 60;
      const r1 = radius + Math.sin(t * 0.015) * 30;

      const grad1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, r1);
      grad1.addColorStop(0, orbColor);
      grad1.addColorStop(0.5, 'rgba(16, 185, 129, 0.08)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(x1, y1, r1, 0, Math.PI * 2);
      ctx.fill();

      const x2 = w * 0.65 + Math.cos(t * 0.007) * 70;
      const y2 = h * 0.55 + Math.sin(t * 0.009) * 50;
      const r2 = radius * 0.8 + Math.cos(t * 0.012) * 20;

      const grad2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, r2);
      grad2.addColorStop(0, 'rgba(20, 184, 166, 0.12)');
      grad2.addColorStop(0.6, 'rgba(5, 150, 105, 0.05)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(x2, y2, r2, 0, Math.PI * 2);
      ctx.fill();

      t++;
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
  }, [orbColor, radius]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
