import React, { useEffect, useRef } from 'react';

interface LightRaysProps {
  className?: string;
  rayCount?: number;
  rayColor?: string;
}

export const LightRays: React.FC<LightRaysProps> = ({
  className = '',
  rayCount = 7,
  rayColor = 'rgba(52, 211, 153, 0.08)'
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

      const originX = w * 0.5;
      const originY = -50;

      for (let i = 0; i < rayCount; i++) {
        const angle = -Math.PI * 0.25 + (i / (rayCount - 1)) * (Math.PI * 0.5) + Math.sin(t * 0.015 + i) * 0.05;
        const widthSpread = 40 + Math.sin(t * 0.02 + i * 2) * 15;

        const endX1 = originX + Math.sin(angle - 0.08) * (h + 200);
        const endX2 = originX + Math.sin(angle + 0.08) * (h + 200) + widthSpread;
        const endY = h + 100;

        const grad = ctx.createLinearGradient(originX, originY, (endX1 + endX2) / 2, endY);
        grad.addColorStop(0, 'rgba(52, 211, 153, 0.25)');
        grad.addColorStop(0.5, rayColor);
        grad.addColorStop(1, 'rgba(52, 211, 153, 0)');

        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(endX1, endY);
        ctx.lineTo(endX2, endY);
        ctx.closePath();

        ctx.fillStyle = grad;
        ctx.fill();
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
    };
  }, [rayCount, rayColor]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
