import { useState } from "react";
import Image from "next/image";
import { Particles } from "@/components/ui/particles";
import {
  ReactIcon,
  NextjsIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  TailwindIcon,
  NodejsIcon,
  PostgresIcon,
  FigmaIcon,
  GitIcon,
  HTMLIcon,
} from "@/components/icons/tech-icons";

const techStack = [
  {
    name: "React",
    category: "Frontend",
    desc: "UI Architecture",
    icon: ReactIcon,
    accent: "group-hover:border-[#61DAFB]",
  },
  {
    name: "Next.js",
    category: "Framework",
    desc: "Fullstack App Router",
    icon: NextjsIcon,
    accent: "group-hover:border-black dark:group-hover:border-white",
  },
  {
    name: "TypeScript",
    category: "Language",
    desc: "Type-safe Engineering",
    icon: TypeScriptIcon,
    accent: "group-hover:border-[#3178C6]",
  },
  {
    name: "JavaScript",
    category: "Language",
    desc: "Modern ES6+ Logic",
    icon: JavaScriptIcon,
    accent: "group-hover:border-[#F7DF1E]",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    desc: "Utility-First Layouts",
    icon: TailwindIcon,
    accent: "group-hover:border-[#38BDF8]",
  },
  {
    name: "Node.js",
    category: "Backend",
    desc: "REST APIs & Runtime",
    icon: NodejsIcon,
    accent: "group-hover:border-[#339933]",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    desc: "Relational Storage",
    icon: PostgresIcon,
    accent: "group-hover:border-[#4169E1]",
  },
  {
    name: "Figma",
    category: "UI/UX",
    desc: "Wireframing & Prototyping",
    icon: FigmaIcon,
    accent: "group-hover:border-[#A259FF]",
  },
  {
    name: "Git / GitHub",
    category: "DevOps",
    desc: "Version Control CI/CD",
    icon: GitIcon,
    accent: "group-hover:border-[#F05032]",
  },
  {
    name: "HTML5 / CSS3",
    category: "Core Web",
    desc: "Semantic Structure",
    icon: HTMLIcon,
    accent: "group-hover:border-[#E34F26]",
  },
];

export function AboutSection() {
  const [isColored, setIsColored] = useState(false);

  return (
    <section id="about" className="py-20 border-b border-zinc-200/60 dark:border-zinc-800 transition-colors relative">
      {/* Particles Ambient Background */}
      <Particles quantity={65} ease={60} size={0.6} className="opacity-70 dark:opacity-90" />

      <div className="relative z-10 mb-10">
        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black dark:text-white">
          ABOUT
        </h2>
        <div className="w-full border-b border-black dark:border-zinc-700 mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Profile Info Card */}
        <div className="lg:col-span-5 bg-white dark:bg-[#141417] border-2 border-black dark:border-zinc-700 rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] flex flex-col justify-between transition-all gap-6">
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
              Hello! I am an Informatics Engineering graduate from Universitas Pasundan with a strong passion for full-stack web development. Backed by Junior Web Developer and Junior Cyber Security certifications, I ensure that the code I write delivers not only visually appealing interfaces but also secure architectures. I am ready to turn complex ideas into intuitive and functional web applications.
            </p>
            <p>

            </p>
          </div>
        </div>

        {/* Redesigned Technical Core with Vector Tech Icons */}
        <div className="lg:col-span-7 bg-white dark:bg-[#141417] border-2 border-black dark:border-zinc-700 rounded-2xl p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 pb-3 mb-6">
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                TECHNICAL CORE
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                10 Core Stack
              </span>
            </div>

            {/* Interactive Tech Stack Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {techStack.map((tech) => {
                const IconComponent = tech.icon;

                return (
                  <div
                    key={tech.name}
                    className={`group bg-zinc-50/80 dark:bg-[#18181d] border-2 border-zinc-300 dark:border-zinc-700/80 rounded-xl p-3 sm:p-3.5 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:translate-x-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] cursor-pointer ${tech.accent}`}
                  >
                    {/* Icon container */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-lg bg-white dark:bg-[#0e0e11] border border-black/15 dark:border-zinc-700 flex items-center justify-center p-2 group-hover:scale-110 transition-transform shadow-xs">
                      <IconComponent className="w-6 h-6 object-contain" />
                    </div>

                    {/* Text Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs sm:text-[13px] font-black uppercase tracking-tight text-black dark:text-white truncate group-hover:underline">
                          {tech.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 truncate">
                          {tech.category}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            <span>High Performance</span>
            <span>•</span>
            <span>Clean Architecture</span>
            <span>•</span>
            <span>Full Responsive</span>
          </div>
        </div>
      </div>
    </section>
  );
}
