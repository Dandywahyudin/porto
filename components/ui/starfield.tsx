"use client";

import { useEffect, useRef } from "react";

interface StarfieldProps {
  starCount?: number;
  speed?: number;
  className?: string;
}

export function Starfield({
  starCount = 350,
  speed = 0.5,
  className = "",
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    let cssWidth = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth;
    let cssHeight = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight;

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

    const spawnStar = (resetZ = false): Star => {
      const maxDim = Math.max(cssWidth, cssHeight);
      return {
        x: (Math.random() - 0.5) * maxDim * 1.6,
        y: (Math.random() - 0.5) * maxDim * 1.6,
        z: resetZ ? Math.random() * 1000 : 1000,
        size: Math.random() * 2.0 + 0.8,
        twinkleSpeed: Math.random() * 0.05 + 0.02,
        twinkleOffset: Math.random() * Math.PI * 2,
      };
    };

    const stars: Star[] = Array.from({ length: starCount }, () => spawnStar(true));

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - cssWidth / 2) * 0.06;
      targetMouseY = (e.clientY - rect.top - cssHeight / 2) * 0.06;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        targetMouseX = (e.touches[0].clientX - rect.left - cssWidth / 2) * 0.06;
        targetMouseY = (e.touches[0].clientY - rect.top - cssHeight / 2) * 0.06;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    const resizeObserver = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener("resize", handleResize);

    function handleResize() {
      resize();
    }

    let time = 0;

    const render = () => {
      time += 0.03;

      // Organic gentle floating drift for mobile when there is no mouse movement
      const autoDriftX = Math.sin(time * 0.4) * 15;
      const autoDriftY = Math.cos(time * 0.3) * 12;

      mouseX += (targetMouseX + autoDriftX - mouseX) * 0.05;
      mouseY += (targetMouseY + autoDriftY - mouseY) * 0.05;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains("dark");

      // Dark Mode: White bright stars (255, 255, 255)
      // Light Mode: High-contrast Dark Slate (18, 18, 28)
      const baseR = isDark ? 255 : 18;
      const baseG = isDark ? 255 : 18;
      const baseB = isDark ? 255 : 28;

      const cx = (cssWidth / 2 + mouseX) * dpr;
      const cy = (cssHeight / 2 + mouseY) * dpr;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.z -= speed * 2.8;

        if (star.z <= 0) {
          const newStar = spawnStar(false);
          star.x = newStar.x;
          star.y = newStar.y;
          star.z = 1000;
        }

        const k = 280 / star.z;
        const px = star.x * k * dpr + cx;
        const py = star.y * k * dpr + cy;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          const depthAlpha = Math.min(1, Math.max(0.25, (1000 - star.z) / 1000));
          const twinkle = 0.45 + 0.55 * Math.sin(time * star.twinkleSpeed * 20 + star.twinkleOffset);
          
          const opacityMult = isDark ? 0.95 : 0.88;
          const alpha = depthAlpha * twinkle * opacityMult;
          
          const radius = Math.max(1.2 * dpr, star.size * k * 0.85 * dpr);

          ctx.beginPath();
          ctx.arc(px, py, Math.min(radius, 3.5 * dpr), 0, Math.PI * 2);
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
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
    };
  }, [starCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
