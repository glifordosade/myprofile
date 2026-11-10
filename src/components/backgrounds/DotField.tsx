import React, { useEffect, useRef } from 'react';

interface DotFieldProps {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  gap?: number;
  glowRadius?: number;
}

export const DotField: React.FC<DotFieldProps> = ({
  className = '',
  dotColor = 'rgba(52, 211, 153, 0.25)',
  dotSize = 1.6,
  gap = 32,
  glowRadius = 140
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let isVisible = true;
    let mouseX = -9999;
    let mouseY = -9999;

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

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);

    let t = 0;
    const draw = () => {
      if (!isVisible) return;
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : 800;
      const h = parent ? parent.clientHeight : 600;

      ctx.clearRect(0, 0, w, h);

      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let currentSize = dotSize;
          let alpha = 0.22;

          // Mouse proximity expansion & glow
          if (dist < glowRadius) {
            const factor = 1 - dist / glowRadius;
            currentSize += factor * 2.8;
            alpha += factor * 0.75;
          }

          // Subtle ambient pulse
          const pulse = Math.sin(t * 0.03 + (x + y) * 0.02) * 0.08;
          alpha = Math.max(0.1, Math.min(1, alpha + pulse));

          ctx.beginPath();
          ctx.fillStyle = `rgba(52, 211, 153, ${alpha})`;
          ctx.arc(x, y, Math.max(0.8, currentSize), 0, Math.PI * 2);
          ctx.fill();
        }
      }

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
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [dotColor, dotSize, gap, glowRadius]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
