import { ArrowRight, Lock } from "lucide-react";

type ProjectCardProps = {
  year: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  banner: React.ReactNode;
  locked?: boolean;
};

export function ProjectSection() {
  return (
    <section id="project" className="py-20 border-b border-zinc-200/60 dark:border-zinc-800 transition-colors">
      <div className="mb-10">
        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black dark:text-white mb-4">
          PROJECT
        </h2>
        <div className="border-l-2 border-black dark:border-zinc-500 pl-4 py-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl font-medium">
          Selected works demonstrating structural minimalism, precision
          engineering, and neo-brutalist aesthetics in modern web
          applications.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProjectCard
          year="2023"
          category="E-commerce"
          title="Nusantara Store"
          description="A high-performance e-commerce platform engineered for scale,..."
          tags={["React", "Node.js", "PostgreSQL"]}
          banner={<NusantaraBanner />}
        />
        <ProjectCard
          year="2024"
          category="Web App"
          title="Kelola Dashboard"
          description="Enterprise-grade data visualization dashboard with..."
          tags={["Vue 3", "TypeScript", "D3.js"]}
          banner={<DashboardBanner />}
        />
        <ProjectCard
          year="2023"
          category="Editorial"
          title="Architexture Zine"
          description="A digital publication platform focusing on structural design,..."
          tags={["Next.js", "Tailwind", "Sanity CMS"]}
          banner={<ZineBanner />}
        />
        <ProjectCard
          year="2024"
          category="FinTech"
          title="Project Obsidian"
          description="A high-frequency trading interface prioritizing speed and..."
          tags={["Svelte", "Rust"]}
          banner={<LockedBanner />}
          locked
        />
      </div>
    </section>
  );
}

function ProjectCard({
  year,
  category,
  title,
  description,
  tags,
  banner,
  locked,
}: ProjectCardProps) {
  return (
    <div className="border-2 border-black dark:border-zinc-700 rounded-2xl bg-white dark:bg-[#141417] overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.35)] transition-all group flex flex-col justify-between">
      <div className="h-48 sm:h-56 bg-zinc-200 dark:bg-zinc-900 border-b-2 border-black dark:border-zinc-700 relative overflow-hidden flex items-center justify-center p-4">
        <span className="absolute top-3 right-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-black dark:border-zinc-700 px-3 py-1 text-[11px] font-bold rounded-full text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] z-10">
          {year} • {category}
        </span>
        {banner}
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-2xl font-bold text-black dark:text-white group-hover:underline mb-2">
            {title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-6 font-medium">
            {description}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border border-zinc-400 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1 rounded-full text-xs font-semibold text-zinc-700 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {locked ? (
            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 cursor-not-allowed">
              Locked <Lock className="w-3.5 h-3.5" />
            </span>
          ) : (
            <a
              href="#contact"
              className="text-xs font-bold text-black dark:text-white underline flex items-center gap-1 group-hover:gap-2 transition-all"
            >
              Lihat Detail <ArrowRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function NusantaraBanner() {
  return (
    <div className="w-11/12 h-5/6 bg-white dark:bg-[#1a1a1e] border border-black dark:border-zinc-700 rounded-lg p-3 shadow-sm flex flex-col justify-between grayscale">
      <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2 text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
        <span>Projects - Overview</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
          Rp 218.499.500 (+22.3%)
        </span>
      </div>
      <div className="flex gap-2 items-end h-20 pt-2">
        <div className="bg-zinc-800 dark:bg-zinc-400 w-1/6 h-3/5 rounded-t" />
        <div className="bg-zinc-400 dark:bg-zinc-600 w-1/6 h-4/5 rounded-t" />
        <div className="bg-zinc-800 dark:bg-zinc-300 w-1/6 h-full rounded-t" />
        <div className="bg-zinc-300 dark:bg-zinc-700 w-1/6 h-2/5 rounded-t" />
        <div className="bg-zinc-900 dark:bg-zinc-200 w-1/6 h-4/5 rounded-t" />
        <div className="bg-zinc-500 dark:bg-zinc-500 w-1/6 h-full rounded-t" />
      </div>
    </div>
  );
}

function DashboardBanner() {
  return (
    <div className="w-11/12 h-5/6 bg-zinc-900 border border-black dark:border-zinc-700 rounded-lg p-2.5 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-center border-b border-zinc-700 pb-1.5 text-[9px] font-mono text-zinc-400">
        <span>KELOLA DASHBOARD v2</span>
        <span className="text-green-400">LIVE SYNC</span>
      </div>
      <div className="grid grid-cols-3 gap-2 py-2">
        <div className="bg-zinc-800 p-2 rounded text-[9px] text-zinc-300 border border-zinc-700">
          Users: 14.2K
        </div>
        <div className="bg-zinc-800 p-2 rounded text-[9px] text-zinc-300 border border-zinc-700">
          Uptime: 99.9%
        </div>
        <div className="bg-zinc-800 p-2 rounded text-[9px] text-zinc-300 border border-zinc-700">
          Latency: 24ms
        </div>
      </div>
    </div>
  );
}

function ZineBanner() {
  return (
    <div className="w-11/12 h-5/6 bg-white dark:bg-[#1a1a1e] border border-black dark:border-zinc-700 p-3 flex flex-col justify-between -rotate-1 shadow-sm">
      <div className="border-b-2 border-black dark:border-zinc-700 pb-1 flex justify-between items-center text-black dark:text-white">
        <span className="font-black text-xs tracking-tighter">PROJECTS</span>
        <span className="text-[9px] font-bold text-zinc-600 dark:text-zinc-400">2023 • Editorial</span>
      </div>
      <div className="text-[13px] font-black tracking-tight leading-tight uppercase my-1 text-black dark:text-white">
        THE METROPOLITAN / 2023
      </div>
      <div className="text-[9px] text-zinc-500 dark:text-zinc-400 font-mono">
        PUBLIC SPACE ARCHIVE // 2022
      </div>
    </div>
  );
}

function LockedBanner() {
  return (
    <div className="text-center z-10">
      <div className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight mb-1">
        In Development
      </div>
      <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium max-w-xs">
        Next generation financial tooling.
      </div>
    </div>
  );
}
