"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const navItems = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "project", label: "PROJECT" },
  { id: "contact", label: "CONTACT" },
];

type SiteNavProps = {
  activeSection: string;
  onNavigate: (id: string) => void;
};

export function SiteNav({ activeSection, onNavigate }: SiteNavProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <aside
        className={`hidden md:flex shrink-0 border-r border-black/20 dark:border-white/10 flex-col justify-center relative min-h-screen sticky top-0 h-screen bg-[#f8f8fa] dark:bg-[#0e0e11] z-30 transition-all duration-300 ease-in-out ${isOpen ? "w-52 sm:w-60 md:w-64 p-6 md:p-8" : "w-16 sm:w-20 p-3 items-center"
          }`}
      >
        {/* Toggle Collapse/Expand Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Tutup Sidebar Navigasi" : "Buka Sidebar Navigasi"}
          title={isOpen ? "Tutup Menu" : "Buka Menu"}
          className={`absolute top-5 ${isOpen ? "right-4" : "right-1/2 translate-x-1/2"
            } w-8 h-8 rounded-full border border-black/30 dark:border-white/20 bg-white dark:bg-zinc-900 text-black dark:text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] cursor-pointer z-40`}
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {/* Navigation text list (visible when expanded) */}
        {isOpen && (
          <nav className="flex flex-col space-y-6 md:space-y-8 animate-fadeIn">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-left text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight transition-colors cursor-pointer ${isActive
                      ? "text-black dark:text-white"
                      : "text-zinc-400 dark:text-zinc-600 hover:text-black dark:hover:text-white"
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* 4 indicator dots */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center space-y-3 z-20 transition-all duration-300 ${isOpen ? "right-0 translate-x-1/2" : "right-1/2 translate-x-1/2"
            }`}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                aria-label={`Go to ${item.label}`}
                title={item.label}
                className="w-5 h-5 flex items-center justify-center cursor-pointer transition-transform hover:scale-125 focus:outline-none group relative"
              >
                <span
                  className={`rounded-full transition-all duration-300 ${isActive
                      ? "w-3.5 h-3.5 bg-black dark:bg-white shadow-xs"
                      : "w-2.5 h-2.5 bg-[#f8f8fa] dark:bg-[#0e0e11] border-[1.5px] border-zinc-400 dark:border-zinc-500 hover:border-black dark:hover:border-white"
                    }`}
                />
                {!isOpen && (
                  <span className="absolute left-7 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-black/20 dark:border-white/10 bg-[#f8f8fa]/95 dark:bg-[#0e0e11]/95 backdrop-blur-sm transition-colors duration-300">
        <div className="grid grid-cols-4 items-stretch px-2 py-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                aria-label={`Go to ${item.label}`}
                className={`flex flex-col items-center justify-center gap-2 rounded-xl py-3 transition-colors ${isActive ? "text-black dark:text-white" : "text-zinc-400 dark:text-zinc-600"
                  }`}
              >
                <span
                  className={`block h-2.5 w-2.5 rounded-full transition-all ${isActive ? "bg-black dark:bg-white scale-110" : "bg-zinc-400 dark:bg-zinc-700"
                    }`}
                />
                <span className="text-[10px] font-black uppercase tracking-[0.22em]">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
