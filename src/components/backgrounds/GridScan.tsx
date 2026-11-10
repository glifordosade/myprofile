import React, { useEffect, useRef } from 'react';

interface GridScanProps {
  className?: string;
  gridSize?: number;
  lineColor?: string;
  scanColor?: string;
}

export const GridScan: React.FC<GridScanProps> = ({
  className = '',
  gridSize = 40,
  lineColor = 'rgba(52, 211, 153, 0.08)',
  scanColor = 'rgba(52, 211, 153, 0.35)'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let isVisible = true;
    let scanY = 0;

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

      // Draw grid
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let y = 0; y <= h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw scanner bar
      const grad = ctx.createLinearGradient(0, scanY - 60, 0, scanY);
      grad.addColorStop(0, 'rgba(52, 211, 153, 0)');
      grad.addColorStop(1, scanColor);

      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 60, w, 60);

      // High-intensity laser line
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(w, scanY);
      ctx.stroke();

      scanY += 1.2;
      if (scanY > h + 60) scanY = 0;

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
  }, [gridSize, lineColor, scanColor]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
