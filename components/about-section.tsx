import { Award, BadgeCheck, FileCheck, CheckCircle2 } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 border-b border-zinc-200/60 dark:border-zinc-800 transition-colors">
      <div className="mb-10">
        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black dark:text-white">
          ABOUT
        </h2>
        <div className="w-full border-b border-black dark:border-zinc-700 mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="bg-white dark:bg-[#141417] border-2 border-black dark:border-zinc-700 p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] flex flex-col justify-between transition-all">
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

      <div>
        <div className="mb-8">
          <h3 className="text-3xl font-black uppercase tracking-tight text-black dark:text-white">
            SERTIFIKAT
          </h3>
          <div className="w-full border-b border-black dark:border-zinc-700 mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CertificateCard
            number="01"
            title="FRONTEND WEB DEVELOPER"
            issuer="Dicoding Indonesia"
            year="2024"
            icon={<Award className="w-6 h-6 text-black dark:text-white mb-4" />}
            description="Sertifikasi tingkat mahir dalam pengembangan antarmuka web modern dengan React, state management, dan optimasi performa."
          />
          <CertificateCard
            number="02"
            title="FULLSTACK JAVASCRIPT"
            issuer="Meta / Coursera"
            year="2023"
            icon={<BadgeCheck className="w-6 h-6 text-black dark:text-white mb-4" />}
            description="Penguasaan ekosistem Node.js, Express, RESTful API, integrasi basis data, dan arsitektur server-side scalable."
          />
          <CertificateCard
            number="03"
            title="REACT & NEXT.JS PRO"
            issuer="Global Tech Academy"
            year="2023"
            icon={<FileCheck className="w-6 h-6 text-black dark:text-white mb-4" />}
            description="Spesialisasi arsitektur Server Components, Server-Side Rendering (SSR), SSG, dan integrasi API performa tinggi."
          />
          <CertificateCard
            number="04"
            title="UI/UX & DESIGN SYSTEM"
            issuer="Google Career Certificates"
            year="2022"
            icon={<CheckCircle2 className="w-6 h-6 text-black dark:text-white mb-4" />}
            description="Standar industri dalam riset pengguna, wireframing, prototipe interaktif, dan pembangunan design system terstruktur."
          />
        </div>
      </div>
    </section>
  );
}

type CertificateCardProps = {
  number: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  icon: React.ReactNode;
};

function CertificateCard({
  number,
  title,
  issuer,
  year,
  description,
  icon,
}: CertificateCardProps) {
  return (
    <div className="bg-white dark:bg-[#141417] border border-black dark:border-zinc-700 p-6 relative flex flex-col justify-between min-h-72 hover:-translate-y-1 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.4)] group">
      <span className="text-4xl font-black text-zinc-300 dark:text-zinc-700 group-hover:text-black dark:group-hover:text-white transition-colors absolute top-5 right-5 select-none">
        {number}
      </span>
      <div>
        {icon}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 border border-zinc-300 dark:border-zinc-700 rounded">
            {issuer}
          </span>
          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">{year}</span>
        </div>
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-black dark:text-white mb-3">
          {title}
        </h4>
      </div>
      <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium mt-2">
        {description}
      </p>
    </div>
  );
}
