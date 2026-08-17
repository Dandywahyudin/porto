"use client";

import { useEffect, useState } from "react";

export function TopNav() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="w-full pt-4 pb-6 flex items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800 transition-colors">
      <div className="flex items-center">
        <span className="text-2xl sm:text-3xl font-black tracking-tight text-black dark:text-white select-none">
          DW.
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Available for work badge */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900/90 shadow-xs backdrop-blur">
          <span className="text-[10px] sm:text-[11px] font-black tracking-wider text-zinc-800 dark:text-zinc-200 uppercase">
            AVAILABLE FOR WORK
          </span>
        </div>

        {/* Dark mode toggle switch */}
        <button
          onClick={toggleTheme}
          type="button"
          aria-label="Toggle dark mode"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="relative w-12 h-6 bg-zinc-300 dark:bg-zinc-700 rounded-full p-0.5 transition-colors duration-300 focus:outline-none flex items-center cursor-pointer"
        >
          <span
            className={`w-5 h-5 rounded-full bg-black dark:bg-white shadow transform transition-transform duration-300 ${mounted && isDark ? "translate-x-6" : "translate-x-0"
              }`}
          />
        </button>
      </div>
    </header>
  );
}
