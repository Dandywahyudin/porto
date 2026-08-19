"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  delay?: number;
  trigger?: boolean;
  staggerDelay?: number;
}

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
  delay = 2050,
  trigger = true,
  staggerDelay = 0.08,
}: TextGenerateEffectProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (!trigger) return;

    let interval: NodeJS.Timeout;
    const startTimer = setTimeout(() => {
      let current = 0;
      interval = setInterval(() => {
        current += 1;
        setRevealedCount(current);
        if (current >= wordsArray.length) {
          clearInterval(interval);
        }
      }, staggerDelay * 1000);
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
    };
  }, [trigger, delay, staggerDelay, wordsArray.length]);

  return (
    <span className={cn("inline-block", className)}>
      {wordsArray.map((word, idx) => {
        const isRevealed = idx < revealedCount;

        return (
          <span
            key={word + idx}
            className={`inline-block transition-all ${
              isRevealed
                ? "opacity-100 blur-0 translate-y-0 scale-100"
                : filter
                ? "opacity-0 blur-md translate-y-2.5 scale-95"
                : "opacity-0 translate-y-2.5"
            }`}
            style={{
              transitionDuration: `${duration}s`,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {word}&nbsp;
          </span>
        );
      })}
    </span>
  );
}
