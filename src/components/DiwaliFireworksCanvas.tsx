import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface DiwaliFireworksCanvasProps {
  burstTrigger?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
  sparkle?: boolean;
  isHeart?: boolean;
}

export const DiwaliFireworksCanvas: React.FC<DiwaliFireworksCanvasProps> = ({
  burstTrigger = 0,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced = useReducedMotion();
  const burstCountRef = useRef(burstTrigger);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let autoLaunchTimer: ReturnType<typeof setInterval> | null = null;
    let isTabVisible = !document.hidden;

    // Handle high-DPI retina rendering
    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const MAX_PARTICLES = 85;

    const heartColors = ['#f59e0b', '#fbbf24', '#fef08a', '#f472b6', '#fda4af', '#ffffff'];
    const starColors = ['#f59e0b', '#fbbf24', '#fef3c7', '#ffffff', '#f472b6', '#be6f7f'];

    // Spawn heart-shaped firework burst using parametric equation
    const spawnHeartBurst = (cx: number, cy: number, scale = 1.0) => {
      if (prefersReduced) return;
      const count = 36;
      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) particles.shift();
        const t = (i / count) * Math.PI * 2;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const speed = (0.11 + Math.random() * 0.03) * scale;
        particles.push({
          x: cx,
          y: cy,
          vx: hx * speed,
          vy: hy * speed,
          color: heartColors[i % heartColors.length],
          alpha: 1,
          decay: 0.012 + Math.random() * 0.006,
          size: 2.2 + Math.random() * 1.4,
          sparkle: Math.random() > 0.4,
          isHeart: true,
        });
      }
    };

    // Spawn spherical star firework burst
    const spawnStarBurst = (cx: number, cy: number, scale = 1.0) => {
      if (prefersReduced) return;
      const count = 26;
      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) particles.shift();
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
        const speed = (1.5 + Math.random() * 2.6) * scale;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: starColors[i % starColors.length],
          alpha: 1,
          decay: 0.015 + Math.random() * 0.008,
          size: 1.8 + Math.random() * 1.8,
          sparkle: Math.random() > 0.3,
          isHeart: false,
        });
      }
    };

    // If reduced motion is requested, render subtle static atmospheric glow only
    if (prefersReduced) {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const grad = ctx.createRadialGradient(rect.width * 0.5, rect.height * 0.3, 10, rect.width * 0.5, rect.height * 0.3, 180);
      grad.addColorStop(0, 'rgba(251, 191, 36, 0.25)');
      grad.addColorStop(0.6, 'rgba(244, 114, 182, 0.15)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, rect.width, rect.height);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    // Gentle automated firework launcher
    let launchToggle = false;
    const launchRandomFirework = () => {
      if (!isTabVisible) return;
      const rect = canvas.getBoundingClientRect();
      const x = rect.width * (0.2 + Math.random() * 0.6);
      const y = rect.height * (0.16 + Math.random() * 0.32);

      launchToggle = !launchToggle;
      if (launchToggle) {
        spawnHeartBurst(x, y, 0.9 + Math.random() * 0.2);
      } else {
        spawnStarBurst(x, y, 0.85 + Math.random() * 0.25);
      }
    };

    // Initial bursts
    const initialTimer = setTimeout(() => {
      const rect = canvas.getBoundingClientRect();
      spawnHeartBurst(rect.width * 0.5, rect.height * 0.22, 1.05);
      setTimeout(() => {
        spawnStarBurst(rect.width * 0.25, rect.height * 0.3, 0.9);
        spawnStarBurst(rect.width * 0.75, rect.height * 0.28, 0.9);
      }, 500);
    }, 400);

    autoLaunchTimer = setInterval(launchRandomFirework, 3200);

    // Main animation loop
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Occasionally add a gentle rising golden ember
      if (Math.random() < 0.12 && particles.length < MAX_PARTICLES) {
        particles.push({
          x: Math.random() * rect.width,
          y: rect.height + 6,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.7 - Math.random() * 0.8,
          color: Math.random() > 0.4 ? '#fbbf24' : '#f472b6',
          alpha: 0.65,
          decay: 0.005 + Math.random() * 0.004,
          size: 1.2 + Math.random() * 1.4,
          sparkle: true,
          isHeart: false,
        });
      }

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.028; // gentle gravity
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.sparkle ? 8 : 4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(initialTimer);
      if (autoLaunchTimer) clearInterval(autoLaunchTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReduced]);

  // Handle external burst trigger (e.g. Diya lighting button)
  useEffect(() => {
    if (burstTrigger > burstCountRef.current && canvasRef.current && !prefersReduced) {
      burstCountRef.current = burstTrigger;
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Launch an immediate radiant heart firework right above the photograph
      const cx = rect.width * 0.5;
      const cy = Math.max(rect.height * 0.22, 120);

      // Create an instant bloom of particles
      const heartColors = ['#fef08a', '#fbbf24', '#f59e0b', '#f472b6', '#ffffff'];
      for (let i = 0; i < 44; i++) {
        const t = (i / 44) * Math.PI * 2;
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        const speed = 0.13 + Math.random() * 0.04;

        ctx.save();
        ctx.fillStyle = heartColors[i % heartColors.length];
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(cx + hx * speed * 22, cy + hy * speed * 22, 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }, [burstTrigger, prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
