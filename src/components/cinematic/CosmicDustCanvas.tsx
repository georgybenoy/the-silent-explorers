import { useEffect, useRef } from 'react';
import { useNavigation } from '../../context/NavigationContext';

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  speed: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export function CosmicDustCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isReducedMotion } = useNavigation();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    const stars: Star[] = [];
    const STAR_COUNT = 90;

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Re-seed stars
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        const baseAlpha = 0.15 + Math.random() * 0.65;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() < 0.8 ? 0.75 + Math.random() * 0.75 : 1.5 + Math.random() * 0.8,
          alpha: baseAlpha,
          baseAlpha,
          speed: 0.05 + Math.random() * 0.1,
          twinkleSpeed: 0.005 + Math.random() * 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }

      if (isReducedMotion) {
        drawStatic();
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        ctx.fillStyle = `rgba(240, 244, 248, ${star.baseAlpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = (time - lastTime) / 16.666;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Subtle drifting
        star.y -= star.speed * delta;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        // Subtle twinkling
        star.twinklePhase += star.twinkleSpeed * delta;
        star.alpha = star.baseAlpha + Math.sin(star.twinklePhase) * 0.2;
        star.alpha = Math.max(0.05, Math.min(0.9, star.alpha));

        ctx.fillStyle = `rgba(240, 244, 248, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    resize();

    // IntersectionObserver to avoid rendering when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    window.addEventListener('resize', resize);

    if (!isReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      drawStatic();
    }

    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
