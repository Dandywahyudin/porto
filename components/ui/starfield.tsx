"use client";

import { useEffect, useRef } from "react";

interface StarfieldProps {
  starCount?: number;
  speed?: number;
  className?: string;
}

export function Starfield({
  starCount = 320,
  speed = 0.45,
  className = "",
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = window.devicePixelRatio || 1;

    let cssWidth = canvas.parentElement?.clientWidth || window.innerWidth;
    let cssHeight = canvas.parentElement?.clientHeight || window.innerHeight;

    const resize = () => {
      if (!canvas) return;
      dpr = window.devicePixelRatio || 1;
      cssWidth = canvas.parentElement?.clientWidth || window.innerWidth;
      cssHeight = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
    };

    resize();

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    interface Star {
      x: number;
      y: number;
      z: number;
      size: number;
      twinkleSpeed: number;
      twinkleOffset: number;
    }

    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * cssWidth * 2.2,
      y: (Math.random() - 0.5) * cssHeight * 2.2,
      z: Math.random() * 1000,
      size: Math.random() * 1.8 + 0.8,
      twinkleSpeed: Math.random() * 0.04 + 0.015,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - cssWidth / 2) * 0.08;
      targetMouseY = (e.clientY - rect.top - cssHeight / 2) * 0.08;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const resizeObserver = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener("resize", resize);

    let time = 0;

    const render = () => {
      time += 0.04;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains("dark");

      // In Dark Mode: Crisp white stars (255, 255, 255)
      // In Light Mode: High-contrast rich charcoal/black stars (15, 15, 25)
      const baseR = isDark ? 255 : 15;
      const baseG = isDark ? 255 : 15;
      const baseB = isDark ? 255 : 25;

      const cx = (cssWidth / 2 + mouseX) * dpr;
      const cy = (cssHeight / 2 + mouseY) * dpr;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.z -= speed * 2.6;

        if (star.z <= 0) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * cssWidth * 2.2;
          star.y = (Math.random() - 0.5) * cssHeight * 2.2;
        }

        const k = 260 / star.z;
        const px = star.x * k * dpr + cx;
        const py = star.y * k * dpr + cy;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const depthAlpha = Math.min(1, Math.max(0.2, (1000 - star.z) / 1000));
          const twinkle = 0.4 + 0.6 * Math.sin(time * star.twinkleSpeed * 15 + star.twinkleOffset);
          
          // Higher opacity in light mode for crystal-clear visibility
          const opacityMultiplier = isDark ? 0.9 : 0.85;
          const alpha = depthAlpha * twinkle * opacityMultiplier;
          
          const radius = Math.max(1.1 * dpr, star.size * k * 0.9 * dpr);

          ctx.beginPath();
          ctx.arc(px, py, Math.min(radius, 3.2 * dpr), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${baseR}, ${baseG}, ${baseB}, ${alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, [starCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
