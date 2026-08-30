"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";

export type CardItem = {
  id: string | number;
  title?: string;
  category?: string;
  image: string;
  alt?: string;
};

const DEFAULT_CARDS: CardItem[] = [
  {
    id: "hiking",
    title: "Mountain Adventure",
    category: "Travel",
    image: "/image/aboutme3.webp",
    alt: "Mountain Adventure",
  },
  {
    id: "nature",
    title: "Outdoor Exploration",
    category: "Outdoor",
    image: "/image/aboume2.webp",
    alt: "Outdoor Exploration",
  },
  {
    id: "lifestyle",
    title: "Casual & Chill",
    category: "Lifestyle",
    image: "/image/copy.webp",
    alt: "Casual & Chill",
  },
  {
    id: "developer",
    title: "Dandy Wahyudin",
    category: "Developer",
    image: "/image/aboutme.webp",
    alt: "Dandy Wahyudin",
  },
];

// Presets for fanned stack appearance matching the reference snippet:
// scale(0.94) rotateZ(1.65897deg), scale(0.88) rotateZ(-0.236887deg), scale(0.82) rotateZ(4.64498deg), scale(0.76) rotateZ(13.7019deg)
const STACK_PRESETS = [
  { scale: 1, rotate: 0, x: 0, y: 0, origin: "90% 90%" },
  { scale: 0.94, rotate: 1.66, x: 3, y: -1, origin: "90% 90%" },
  { scale: 0.88, rotate: -0.24, x: 6, y: -2, origin: "90% 90%" },
  { scale: 0.82, rotate: 4.65, x: 9, y: -3, origin: "90% 90%" },
  { scale: 0.76, rotate: 13.7, x: 12, y: -4, origin: "90% 90%" },
];

interface CardStackProps {
  items?: CardItem[];
  className?: string;
  cardClassName?: string;
  size?: "sm" | "md" | "lg";
  showCaption?: boolean;
}

export function CardStack({
  items = DEFAULT_CARDS,
  className = "",
  cardClassName = "",
  size = "sm",
  showCaption = false,
}: CardStackProps) {
  const [cards, setCards] = useState<CardItem[]>(items);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [exitDirection, setExitDirection] = useState<{ x: number; y: number; rotate: number } | null>(null);

  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Size configurations
  const sizeClasses = {
    sm: "w-20 h-20 sm:w-24 sm:h-24",
    md: "w-48 h-48 sm:w-56 sm:h-56",
    lg: "w-64 h-64 sm:w-72 sm:h-72",
  }[size];

  const roundedClasses = {
    sm: "rounded-xl sm:rounded-2xl",
    md: "rounded-2xl",
    lg: "rounded-3xl",
  }[size];

  const shadowClasses = {
    sm: "shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.25)]",
    md: "shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.25)]",
    lg: "shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] dark:shadow-[7px_7px_0px_0px_rgba(255,255,255,0.25)]",
  }[size];

  // Cycle top card to the back
  const cycleCard = useCallback((directionX: number = 180, directionY: number = -30) => {
    if (isAnimating || cards.length <= 1) return;
    setIsAnimating(true);
    setExitDirection({
      x: directionX,
      y: directionY,
      rotate: directionX > 0 ? 22 : -22,
    });

    setTimeout(() => {
      setCards((prev) => {
        const next = [...prev];
        const top = next.shift();
        if (top) next.push(top);
        return next;
      });
      setExitDirection(null);
      setDragOffset({ x: 0, y: 0 });
      setIsAnimating(false);
    }, 280);
  }, [isAnimating, cards.length]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isAnimating) return;
    try {
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {
      // Ignore
    }
    startPosRef.current = { x: e.clientX, y: e.clientY };
    hasMovedRef.current = false;
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isAnimating) return;
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;

    if (Math.hypot(deltaX, deltaY) > 5) {
      hasMovedRef.current = true;
    }

    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore
    }

    const { x, y } = dragOffset;
    const distance = Math.hypot(x, y);

    if (distance > 45) {
      const throwX = x * 2.8;
      const throwY = y * 1.8;
      cycleCard(throwX, throwY);
    } else if (!hasMovedRef.current) {
      // Tap or click -> cycle
      cycleCard(160, -25);
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
      e.preventDefault();
      cycleCard(160, -25);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      cycleCard(-160, -25);
    }
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none shrink-0 ${className}`}>
      {/* Stack Container */}
      <div
        ref={containerRef}
        className={`stack-container relative ${sizeClasses} flex items-center justify-center`}
        title="Klik atau geser untuk melihat foto"
      >
        {cards.map((card, idx) => {
          if (idx >= 4) return null;

          const isTop = idx === 0;
          const preset = STACK_PRESETS[Math.min(idx, STACK_PRESETS.length - 1)];

          let transformStyle = "";
          let transitionStyle = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease";
          const zIndex = cards.length - idx;

          if (isTop) {
            if (exitDirection) {
              transformStyle = `translate3d(${exitDirection.x}px, ${exitDirection.y}px, 0px) rotateZ(${exitDirection.rotate}deg) scale(0.92)`;
              transitionStyle = "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease";
            } else if (isDragging) {
              const rotate = dragOffset.x * 0.1;
              transformStyle = `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0px) rotateZ(${rotate}deg)`;
              transitionStyle = "none";
            } else {
              transformStyle = `translate3d(0, 0, 0) scale(${preset.scale}) rotateZ(${preset.rotate}deg)`;
            }
          } else {
            transformStyle = `translate3d(${preset.x}px, ${preset.y}px, 0px) scale(${preset.scale}) rotateZ(${preset.rotate}deg)`;
          }

          return (
            <div
              key={card.id}
              className={`card-rotate absolute inset-0 ${roundedClasses} ${
                isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
              }`}
              draggable={false}
              tabIndex={isTop ? 0 : -1}
              onPointerDown={isTop ? handlePointerDown : undefined}
              onPointerMove={isTop ? handlePointerMove : undefined}
              onPointerUp={isTop ? handlePointerUp : undefined}
              onPointerCancel={isTop ? handlePointerUp : undefined}
              onKeyDown={isTop ? handleKeyDown : undefined}
              style={{
                zIndex,
                transform: transformStyle,
                transition: transitionStyle,
                transformOrigin: preset.origin,
                userSelect: "none",
                touchAction: "none",
              }}
            >
              <div
                className={`card relative w-full h-full ${roundedClasses} overflow-hidden bg-zinc-900 border-2 border-black dark:border-zinc-500 ${shadowClasses} transition-shadow duration-300 ${cardClassName}`}
                style={{
                  transformOrigin: preset.origin,
                  transform: isTop ? undefined : `scale(${preset.scale}) rotateZ(${preset.rotate}deg)`,
                }}
              >
                <Image
                  src={card.image}
                  alt={card.alt || card.title || "Photo"}
                  fill
                  sizes="(max-width: 768px) 120px, 160px"
                  priority={idx === 0}
                  className="card-image object-cover pointer-events-none"
                  draggable={false}
                />

                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />

                {/* Badge if medium or large */}
                {size !== "sm" && card.category && (
                  <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full bg-black/75 dark:bg-zinc-900/85 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-wider">
                    {card.category}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showCaption && cards[0] && (
        <div className="mt-2 text-center">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {cards[0].title || cards[0].category}
          </p>
        </div>
      )}
    </div>
  );
}
