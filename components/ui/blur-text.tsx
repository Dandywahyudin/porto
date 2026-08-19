"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type BlurTextItem = {
  text: string;
  isBreak?: boolean;
};

interface BlurTextProps {
  items?: (string | { text: string; isBreak?: boolean })[];
  text?: string;
  wordDelay?: number;
  duration?: number;
  className?: string;
  direction?: "top" | "bottom";
  loop?: boolean;
  loopInterval?: number;
  initialDelay?: number;
  trigger?: boolean;
}

export function BlurText({
  items,
  text,
  wordDelay = 320,
  duration = 600,
  className = "",
  direction = "top",
  loop = true,
  loopInterval = 5800,
  initialDelay = 1950,
  trigger = true,
}: BlurTextProps) {
  const parsedItems: { text: string; isBreak?: boolean; wordIndex: number }[] = [];
  let currentWordIdx = 0;

  if (items && items.length > 0) {
    items.forEach((item) => {
      if (typeof item === "string") {
        if (item === "\n" || item === "<br>") {
          parsedItems.push({ text: "", isBreak: true, wordIndex: currentWordIdx });
        } else {
          item.split(" ").forEach((w) => {
            if (w.trim()) {
              parsedItems.push({ text: w, wordIndex: currentWordIdx++ });
            }
          });
        }
      } else {
        if (item.isBreak) {
          parsedItems.push({ text: "", isBreak: true, wordIndex: currentWordIdx });
        } else {
          parsedItems.push({ text: item.text, wordIndex: currentWordIdx++ });
        }
      }
    });
  } else if (text) {
    text.split("\n").forEach((line, lIdx, arr) => {
      line.split(" ").forEach((w) => {
        if (w.trim()) {
          parsedItems.push({ text: w, wordIndex: currentWordIdx++ });
        }
      });
      if (lIdx < arr.length - 1) {
        parsedItems.push({ text: "", isBreak: true, wordIndex: currentWordIdx });
      }
    });
  }

  const totalWords = currentWordIdx;
  const [activeWordCount, setActiveWordCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let stepTimer: NodeJS.Timeout;
    let loopTimer: NodeJS.Timeout;

    const startWordSequence = () => {
      let count = 0;
      setActiveWordCount(0);

      stepTimer = setInterval(() => {
        count += 1;
        setActiveWordCount(count);
        if (count >= totalWords) {
          clearInterval(stepTimer);
        }
      }, wordDelay);
    };

    // Initial start
    const startInitial = setTimeout(() => {
      startWordSequence();
    }, initialDelay);

    // Looping
    if (loop) {
      loopTimer = setInterval(() => {
        setActiveWordCount(0);
        setTimeout(() => {
          startWordSequence();
        }, 500);
      }, loopInterval);
    }

    return () => {
      clearTimeout(startInitial);
      if (stepTimer) clearInterval(stepTimer);
      if (loopTimer) clearInterval(loopTimer);
    };
  }, [trigger, totalWords, wordDelay, loop, loopInterval, initialDelay]);

  return (
    <span className={cn("inline-block", className)}>
      {parsedItems.map((item, index) => {
        if (item.isBreak) {
          return <br key={`br-${index}`} className="block" />;
        }

        const isRevealed = item.wordIndex < activeWordCount;
        const translateY = direction === "top" ? "-22px" : "22px";

        return (
          <span
            key={`word-${index}`}
            className="inline-block transition-all ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,filter,opacity] mr-2.5 sm:mr-3.5 last:mr-0"
            style={{
              transitionDuration: `${duration}ms`,
              opacity: isRevealed ? 1 : 0,
              filter: isRevealed ? "blur(0px)" : "blur(12px)",
              transform: isRevealed
                ? "translate3d(0,0,0) scale(1)"
                : `translate3d(0,${translateY},0) scale(0.92)`,
            }}
          >
            {item.text}
          </span>
        );
      })}
    </span>
  );
}
