"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { Starfield } from "@/components/ui/starfield";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { BlurText } from "@/components/ui/blur-text";

type HeroSectionProps = {
  onNavigate: (id: string) => void;
};

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [isColored, setIsColored] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Synchronize entrance animation with the Preloader curtain opening
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1950);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="min-h-[85vh] flex flex-col justify-center pt-4 pb-20 border-b border-zinc-200/60 dark:border-zinc-800 transition-colors relative"
    >
      {/* Starfield Animated Background isolated so it does not clip hero content */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-3xl">
        <Starfield starCount={320} speed={0.4} className="opacity-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative z-10">
        <div className="lg:col-span-7 space-y-6">
          {/* Main Headline with Sequential Word-by-Word BlurText Effect */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-black uppercase tracking-tight text-black dark:text-white leading-[0.98]">
            <BlurText
              items={["HI!,", "I'M", "\n", "DANDY", "\n", "WAHYUDIN."]}
              wordDelay={320}
              duration={650}
              direction="top"
              loop={true}
              loopInterval={5600}
              trigger={isReady}
              initialDelay={200}
            />
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 transition-all duration-800 ease-out delay-150 ${isReady
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
              }`}
          >
            WEB DEVELOPER
          </p>

          {/* Bio Description with Text Generate Effect */}
          <div className="max-w-lg">
            <TextGenerateEffect
              words="Engineering structural digital experiences with precision and high-contrast impact. Focusing on clean code, minimalist design, and scalable architectures."
              className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-medium"
              trigger={isReady}
              delay={350}
              staggerDelay={0.045}
              duration={0.45}
            />
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 pt-2 transition-all duration-800 ease-out delay-450 ${isReady
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
              }`}
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("contact");
              }}
              className="bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)] active:translate-x-px active:translate-y-px"
            >
              Resume <Download className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => onNavigate("contact")}
              className="bg-white text-black border border-black dark:bg-transparent dark:text-white dark:border-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)] active:translate-x-px active:translate-y-px cursor-pointer"
            >
              Contact Me
            </button>
          </div>

          {/* Experience Statistics */}
          <div
            className={`pt-10 mt-6 border-t border-zinc-200 dark:border-zinc-800 max-w-xl transition-all duration-800 ease-out delay-600 ${isReady
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
              }`}
          >
            {/* <div className="grid grid-cols-3 gap-6">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight">
                  3+
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mt-1">
                  YEARS EXPERIENCE
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight">
                  40+
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mt-1">
                  PROJECTS
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight">
                  25+
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mt-1">
                  HAPPY CLIENTS
                </span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Profile Card Column */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative py-6 sm:py-8 pr-2">
          {/* Decorative concentric rings */}
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-1000 ease-out delay-400 ${isReady
              ? "opacity-100 scale-100"
              : "opacity-0 scale-75"
              }`}
          >
            <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-zinc-300/70 dark:border-zinc-800 absolute" />
            <div className="w-88 h-88 sm:w-112 sm:h-112 rounded-full border border-zinc-200/50 dark:border-zinc-800/60 absolute" />
          </div>

          <div
            onClick={() => setIsColored(!isColored)}
            className={`group relative z-10 w-64 h-88 sm:w-72 sm:h-100 rounded-t-full rounded-b-full border-2 border-black dark:border-zinc-300 bg-zinc-200 dark:bg-zinc-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] overflow-hidden cursor-pointer transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200 hover:scale-[1.02] active:scale-[0.98] ${isReady
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 translate-y-12"
              }`}
            title="Klik / Tap untuk mengubah warna"
          >
            <Image
              src="/image/copy.webp"
              alt="Dandy Wahyudin"
              fill
              priority
              className={`object-cover transition-all duration-500 ease-in-out ${isColored
                ? "grayscale-0 contrast-100"
                : "grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100"
                }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
