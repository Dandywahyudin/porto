"use client";

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
  return (
    <>
      <aside className="hidden md:flex w-48 sm:w-56 md:w-64 shrink-0 border-r border-black/20 dark:border-white/10 p-6 md:p-8 flex-col justify-between min-h-screen sticky top-0 h-screen bg-[#f8f8fa] dark:bg-[#0e0e11] z-30 transition-colors duration-300">
        <div>
          <div className="mb-16 md:mb-24">
            <span className="w-2.5 h-2.5 bg-[#10b981] rounded-full inline-block shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </div>

          <nav className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-left text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight transition-colors ${
                  activeSection === item.id
                    ? "text-black dark:text-white"
                    : "text-zinc-400 dark:text-zinc-600 hover:text-black dark:hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex flex-col space-y-2.5 items-start pl-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              aria-label={`Go to ${item.label}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-black dark:bg-white scale-110"
                  : "bg-zinc-400 dark:bg-zinc-700 hover:bg-zinc-600 dark:hover:bg-zinc-500"
              }`}
            />
          ))}
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
                className={`flex flex-col items-center justify-center gap-2 rounded-xl py-3 transition-colors ${
                  isActive ? "text-black dark:text-white" : "text-zinc-400 dark:text-zinc-600"
                }`}
              >
                <span
                  className={`block h-2.5 w-2.5 rounded-full transition-all ${
                    isActive ? "bg-black dark:bg-white scale-110" : "bg-zinc-400 dark:bg-zinc-700"
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
