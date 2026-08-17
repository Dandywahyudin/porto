"use client";

import { useEffect, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  mql.addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    mql.removeEventListener("change", callback);
  };
}

function getSnapshot() {
  const saved = localStorage.getItem("theme");
  if (saved) return saved === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getServerSnapshot() {
  return false;
}

export function TopNav() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => {
    const nextDark = !isDark;
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#f8f8fa]/80 dark:bg-[#0e0e11]/80 border-b border-black/10 dark:border-white/10 shadow-xs transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-black dark:text-white select-none">
            DW.
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Dark mode toggle switch */}
          <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle dark mode"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="relative w-12 h-6 bg-zinc-300/80 dark:bg-zinc-700/80 backdrop-blur-md rounded-full p-0.5 transition-colors duration-300 focus:outline-none flex items-center cursor-pointer"
          >
            <span
              className={`w-5 h-5 rounded-full bg-black dark:bg-white shadow transform transition-transform duration-300 ${
                isDark ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
