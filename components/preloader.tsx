"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    // Lock scroll during intro
    document.body.style.overflow = "hidden";

    // Step 1: "DW."
    // Step 2: Smooth crossfade morph to "Dandy Wahyudin." (at 700ms)
    const timer1 = setTimeout(() => {
      setStep(2);
    }, 700);

    // Step 3: Cinematic Curtain Doors open (at 1900ms)
    const timer2 = setTimeout(() => {
      setStep(3);
    }, 1900);

    // Step 4: Complete unmount & restore scroll (at 3100ms)
    const timer3 = setTimeout(() => {
      setStep(4);
      document.body.style.overflow = "";
    }, 3100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      document.body.style.overflow = "";
    };
  }, []);

  if (step === 4) return null;

  const isOpening = step === 3;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex overflow-hidden">
      {/* Left Curtain / Door */}
      <div
        className={`w-1/2 h-full bg-[#0e0e11] border-r border-white/10 will-change-transform transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isOpening ? "-translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Right Curtain / Door */}
      <div
        className={`w-1/2 h-full bg-[#0e0e11] border-l border-white/10 will-change-transform transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isOpening ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Center Logo & Name Animation */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-out z-10 select-none ${
          isOpening ? "opacity-0 scale-90 blur-sm pointer-events-none" : "opacity-100 scale-100 blur-0"
        }`}
      >
        <div className="relative h-16 sm:h-20 md:h-24 w-full flex items-center justify-center overflow-hidden px-4">
          {/* Layer 1: "DW." */}
          <span
            className={`absolute font-black uppercase text-white tracking-widest text-4xl sm:text-6xl md:text-7xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              step === 1
                ? "opacity-100 scale-100 blur-0 translate-y-0"
                : "opacity-0 scale-90 blur-sm -translate-y-4"
            }`}
          >
            DW.
          </span>

          {/* Layer 2: "Dandy Wahyudin." */}
          <span
            className={`absolute font-black uppercase text-white tracking-tight text-2xl sm:text-4xl md:text-5xl whitespace-nowrap transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              step >= 2
                ? "opacity-100 scale-100 blur-0 translate-y-0"
                : "opacity-0 scale-110 blur-sm translate-y-4"
            }`}
          >
            Dandy Wahyudin.
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="mt-6 w-16 sm:w-24 h-[2px] bg-white/15 rounded-full overflow-hidden">
          <div
            className={`h-full bg-white transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              step === 1 ? "w-1/4" : "w-full"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
