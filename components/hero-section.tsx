"use client";

import { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { Starfield } from "@/components/ui/starfield";

type HeroSectionProps = {
  onNavigate: (id: string) => void;
};

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [isColored, setIsColored] = useState(false);

  return (
    <section
      id="home"
      className="min-h-[85vh] flex flex-col justify-center pt-4 pb-20 border-b border-zinc-200/60 dark:border-zinc-800 transition-colors relative overflow-hidden"
    >
      {/* Starfield Animated Background */}
      <Starfield starCount={260} speed={0.35} className="opacity-80 dark:opacity-100" />

      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative z-10">
        <div className="lg:col-span-7 space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-black uppercase tracking-tight text-black dark:text-white leading-[0.95] transition-colors">
            HI!, I&apos;M <br />
            DANDY <br />
            WAHYUDIN.
          </h1>

          <p className="text-lg sm:text-xl font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            WEB DEVELOPER
          </p>

          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg font-medium">
            Engineering structural digital experiences with precision and
            high-contrast impact. Focusing on clean code, minimalist design,
            and scalable architectures.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
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

          <div className="pt-10 mt-6 border-t border-zinc-200 dark:border-zinc-800 max-w-xl">
            <div className="grid grid-cols-3 gap-6">
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
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end relative py-8">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-90 h-90 sm:w-110 sm:h-110 rounded-full border border-zinc-300/70 dark:border-zinc-800 absolute" />
            <div className="w-120 h-120 sm:w-145 sm:h-145 rounded-full border border-zinc-200/50 dark:border-zinc-800/60 absolute" />
          </div>

          <div
            onClick={() => setIsColored(!isColored)}
            className="group relative z-10 w-67.5 h-92.5 sm:w-75 sm:h-105 rounded-t-full rounded-b-full border-2 border-black dark:border-zinc-300 bg-zinc-200 dark:bg-zinc-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            title="Klik / Tap untuk mengubah warna"
          >
            <Image
              src="/gambar/gambarhero.jpg"
              alt="Dandy Wahyudin"
              fill
              priority
              className={`object-cover transition-all duration-500 ease-in-out ${
                isColored
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
