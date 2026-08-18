"use client";

import { useState } from "react";
import Image from "next/image";

export function AboutSection() {
  const [isColored, setIsColored] = useState(false);

  return (
    <section id="about" className="py-20 border-b border-zinc-200/60 dark:border-zinc-800 transition-colors">
      <div className="mb-10">
        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black dark:text-white">
          ABOUT
        </h2>
        <div className="w-full border-b border-black dark:border-zinc-700 mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#141417] border-2 border-black dark:border-zinc-700 p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] flex flex-col justify-between transition-all gap-6">
          <div className="flex items-center gap-5 pb-5 border-b border-zinc-200 dark:border-zinc-800">
            <div
              onClick={() => setIsColored(!isColored)}
              className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl border-2 border-black dark:border-zinc-500 overflow-hidden bg-zinc-200 dark:bg-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] group cursor-pointer active:scale-95 transition-transform"
              title="Klik / Tap untuk mengubah warna"
            >
              <Image
                src="/gambar/aboutme.jpeg"
                alt="Dandy Wahyudin"
                fill
                className={`object-cover transition-all duration-500 ${isColored
                    ? "grayscale-0"
                    : "grayscale group-hover:grayscale-0"
                  }`}
              />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black dark:text-white">
                Dandy Wahyudin
              </h3>
              <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">
                FullStack Web Developer
              </p>
            </div>
          </div>

          <div className="space-y-4 text-zinc-800 dark:text-zinc-300 text-sm sm:text-[15px] leading-relaxed font-medium">
            <p>
              I am a multidisciplinary digital designer and structural engineer
              of web experiences. My practice bridges the gap between brutalist
              architectural principles and modern, fluid user interfaces. I
              believe in the power of negative space, strict typographic
              hierarchy, and code as a design material.
            </p>
            <p>
              With over a decade of experience crafting digital products, my
              approach is rooted in structural minimalism. Every component is
              purposeful, every interaction engineered for clarity. I partner
              with visionary teams to construct digital tools that are not just
              usable, but robust and memorable.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#141417] border border-black dark:border-zinc-700 p-6 sm:p-8 flex flex-col justify-between transition-all">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 border-b border-zinc-300 dark:border-zinc-700 pb-3 mb-8">
              TECHNICAL CORE
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-4">
            {[
              "REACT",
              "TAILWIND CSS",
              "NODE.JS",
              "TYPESCRIPT",
              "UI DESIGN",
              "FIGMA",
              "NEXT.JS",
              "GRAPHQL",
            ].map((skill) => (
              <span
                key={skill}
                className="border border-black dark:border-zinc-600 bg-white dark:bg-zinc-900 text-black dark:text-zinc-200 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
