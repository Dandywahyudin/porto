"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowRight, Lock, X, ExternalLink, Globe, Layers, Calendar, UserCheck, Wrench, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/icons/tech-icons";
import { Particles } from "@/components/ui/particles";

export type ProjectItem = {
  id: string;
  year: string;
  category: string;
  title: string;
  subtitle: string;
  role: string;
  services: string;
  platform: string;
  url?: string;
  github?: string;
  description: string;
  fullStory: string[];
  features?: string[];
  tags: string[];
  banner?: string;
  images: string[];
  locked?: boolean;
};

const projectsData: ProjectItem[] = [
  {
    id: "ragamartikel",
    year: "2023",
    category: "Web App",
    title: "Ragamartikel",
    subtitle: "Content Management System Platform",
    role: "Backend engineer",
    services: "Web Application, Management Contet",
    platform: "Nuxt Js, ExpressJs",
    url: "https://github.com/Dandywahyudin",
    github: "https://github.com/Dandywahyudin",
    description:
      "A content management system engineered for scale and seamless localized content workflows.",
    fullStory: [
      "Designed and engineered for Ragamartikel, this platform empowers content creators and publishers to showcase and share their content globally.",
      "To address high traffic during content publishing and complex content workflows, I architected a high-throughput ExpressJs backend with edge-cached Nuxt Js App Router frontends.",
      "The interface adopts a high-contrast neo-brutalist dark aesthetic, paired with instant content publishing workflows, automated content delivery calculations, and real-time content matrix management.",
    ],
    features: [
      "Edge-Rendered High Performance Content Catalog",
      "Automated Content Management",
      "Real-time Content Updates",
      "Real-time Content Analytics",
    ],
    tags: ["Nuxt Js", "ExpressJs", "Mysql", "Postman"],
    banner: "/projects/ragamartikel.webp",
    images: ["/projects/ragamartikel.webp", "/projects/ragamartikel1.webp"],
  },
  {
    id: "gateforesttrip",
    year: "2026",
    category: "Web App",
    title: "Gateforesttrip",
    subtitle: "Tour and Travel Agent",
    role: "Fullstack Developer & UI Designer",
    services: "Web Application, Payment Gateway, Inventory System",
    platform: "Laravel, Tailwind CSS",
    url: "https://github.com/Dandywahyudin",
    github: "https://github.com/Dandywahyudin",
    description:
      "Tour and travel agent platform with payment gateway and inventory system.",
    fullStory: [
      "Designed and engineered for Gateforesttrip, this platform empowers local tour and travel agents to showcase and sell their travel packages globally.",
      "To address high traffic during travel package bookings and complex inventory management, I architected a high-throughput Laravel backend with edge-cached Nuxt Js App Router frontends.",
      "The interface adopts a high-contrast neo-brutalist dark aesthetic, paired with instant content publishing workflows, automated content delivery calculations, and real-time content matrix management.",
    ],
    features: [
      "Real-Time Travel Package Catalog",
      "Dynamic Inventory Management",
      "Payment Gateway Integration",
      "Automated Courier Calculations",
    ],
    tags: ["Laravel", "PHP", "Tailwind CSS", "MySQL", "Payment Gateway"],
    banner: "/projects/gateforestrip.webp",
    images: ["/projects/gateforestrip.webp"],
  },
  {
    id: "devops",
    year: "2026",
    category: "Devops",
    title: "Devops",
    subtitle: "Devops & Infrastructure Monitoring",
    role: "Devops Engineer",
    services: "Devops, IT Support, Infrastructure Monitoring",
    platform: "Linux, Tailscale, Network Architecture, Docker, ",
    url: "https://github.com/Dandywahyudin",
    github: "https://github.com/Dandywahyudin",
    description:
      "Enterprise-grade infrastructure observability platform designed to monitor distributed cloud servers, database clusters, and global network nodes in real time.",
    fullStory: [
      "Devops is an enterprise-grade infrastructure observability platform designed to monitor distributed cloud servers, database clusters, and global network nodes in real time.",
      "I built this project to provide a solution for monitoring distributed cloud servers, database clusters, and global network nodes in real time.",
      "Devops provides real-time monitoring of distributed cloud servers, database clusters, and global network nodes, with features such as ",
    ],
    features: [
      "Real-Time Network Topology Visualization",
      "Dynamic Latency Heatmap Rendering",
      "Multi-Node CPU/Memory Saturation Metrics",
      "Configurable Alert Matrix & Notification Engine",
    ],
    tags: ["Linux", "Grafana", "Tailscale", "Network Architecture", "Docker", ""],
    banner: "/projects/devops1.png",
    images: ["/projects/devops1.png", "/projects/devops.png"],
  },
  {
    id: "project-obsidian",
    year: "2024",
    category: "FinTech",
    title: "Project Obsidian",
    subtitle: "Algorithmic Trading & Liquidity Execution Terminal",
    role: "Systems & Interface Engineer",
    services: "Order Book Visualization, Low-Latency WebSockets",
    platform: "Svelte, Rust WebAssembly, Tailwind CSS",
    url: "n/a (Under NDA)",
    description:
      "A high-frequency trading interface prioritizing microsecond execution, market depth visualization, and order-routing precision.",
    fullStory: [
      "Project Obsidian is a proprietary low-latency institutional trading terminal engineered for precision execution, order routing, and live liquidity depth analysis.",
      "Built with Rust WebAssembly modules powering client-side order matching simulation and high-speed ticker rendering with zero garbage collection pauses.",
      "This project is currently under active development and protected by non-disclosure agreements.",
    ],
    features: [
      "Rust WebAssembly Core Compute Engine",
      "Microsecond Precision Order Book Rendering",
      "Encrypted Multi-Exchange API Gateway Integration",
    ],
    tags: ["Svelte", "Rust", "WebAssembly", "FinTech"],
    banner: "/projects/dashboard-2.jpg",
    images: ["/projects/dashboard-2.jpg"],
    locked: true,
  },
];

export function ProjectSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedProject(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedProject]);

  return (
    <section id="project" className="py-20 border-b border-zinc-200/60 dark:border-zinc-800 transition-colors relative">
      {/* Particles Ambient Background */}
      <Particles quantity={70} ease={60} size={0.6} className="opacity-70 dark:opacity-90" />

      <div className="relative z-10 mb-10">
        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black dark:text-white mb-4">
          PROJECT
        </h2>
        <div className="border-l-2 border-black dark:border-zinc-500 pl-4 py-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl font-medium">
          Selected works demonstrating structural minimalism, precision
          engineering, and neo-brutalist aesthetics in modern web
          applications.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {projectsData.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="reveal-on-scroll border-2 border-black dark:border-zinc-700 rounded-2xl bg-white dark:bg-[#141417] overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.35)] transition-all group flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 duration-300"
          >
            <div className="h-48 sm:h-56 bg-zinc-200 dark:bg-zinc-900 border-b-2 border-black dark:border-zinc-700 relative overflow-hidden flex items-center justify-center">
              <span className="absolute top-3 right-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border border-black dark:border-zinc-700 px-3 py-1 text-[11px] font-bold rounded-full text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] z-10">
                {project.year} • {project.category}
              </span>

              {/* Banner Image */}
              <div className="relative w-full h-full bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={project.banner || project.images[0]}
                  alt={project.title}
                  fill
                  className={`object-cover object-top transition-transform duration-500 group-hover:scale-105 ${project.locked ? "filter blur-[2px] brightness-75" : ""
                    }`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {project.locked && (
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4 z-10">
                    <div className="p-2.5 rounded-full bg-black/70 border border-white/20 mb-2 backdrop-blur-sm shadow-md">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-black text-sm uppercase tracking-wider">In Development</span>
                    <span className="text-zinc-300 text-[11px] font-medium mt-0.5">Proprietary / NDA</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Hover Action Pill */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black text-xs font-extrabold tracking-wider uppercase opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md z-20">
                <span>{project.locked ? "Lihat Status Project" : "Lihat Detail Project"}</span>
                {project.locked ? <Lock className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-2xl font-bold text-black dark:text-white group-hover:underline mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-6 font-medium">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-zinc-400 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1 rounded-full text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  {project.locked ? (
                    <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
                      In Development <Lock className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-black dark:text-white underline flex items-center gap-1 group-hover:gap-2 transition-all">
                      Buka Detail <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    {project.images.length} Showcase
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* FULL-SCREEN PROJECT DETAIL POPUP MODAL (DUAL PANE WITH SCROLLABLE IMAGES) */}
      {/* ========================================================================= */}
      {mounted &&
        selectedProject &&
        createPortal(
          <div
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md transition-all duration-300 animate-in fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#111114] border-2 border-black dark:border-zinc-700 rounded-3xl w-full max-w-6xl max-h-[92vh] overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.25)] flex flex-col relative z-10 animate-in zoom-in-95 duration-200"
            >
              {/* Modal Top Floating Header Bar */}
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/90 dark:bg-[#16161b]/90 backdrop-blur-sm shrink-0">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-red-500 border border-black/20" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500 border border-black/20" />
                  <span className="w-3 h-3 rounded-full bg-green-500 border border-black/20" />
                  <span className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400 ml-2 hidden sm:inline">
                    project_spec // {selectedProject.id}.view
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer shadow-xs"
                    title="Tutup (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Dual-Pane Body */}
              <div className="overflow-y-auto p-4 sm:p-6 md:p-8 flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                  {/* ============================================== */}
                  {/* LEFT PANE: SCROLLABLE MULTI-IMAGE SHOWCASE     */}
                  {/* ============================================== */}
                  <div className="lg:col-span-7 xl:col-span-7 space-y-6">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                      <span>Visual Showcase ({selectedProject.images.length} Screens)</span>
                      <span className="text-[11px] font-mono">Scroll to explore ↓</span>
                    </div>

                    {selectedProject.images.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        className="group relative w-full rounded-2xl overflow-hidden border-2 border-black dark:border-zinc-700 bg-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]"
                      >
                        <Image
                          src={imgSrc}
                          alt={`${selectedProject.title} screenshot ${idx + 1}`}
                          width={1400}
                          height={800}
                          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                          priority={idx === 0}
                        />
                        <div className="absolute top-3 left-3 bg-black/80 dark:bg-white/90 text-white dark:text-black text-[10px] font-mono font-bold px-2.5 py-1 rounded-md backdrop-blur-sm shadow-xs">
                          Screen #{idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ============================================== */}
                  {/* RIGHT PANE: STICKY INFO & SPECIFICATION        */}
                  {/* ============================================== */}
                  <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between">
                    <div className="lg:sticky lg:top-0 space-y-6">
                      {/* Title & Subtitle */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[11px] font-black uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-3 py-1 rounded-md border border-zinc-300 dark:border-zinc-700">
                            {selectedProject.category}
                          </span>
                          {selectedProject.locked && (
                            <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-md flex items-center gap-1">
                              <Lock className="w-3 h-3" /> Under NDA
                            </span>
                          )}
                        </div>

                        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black dark:text-white leading-tight">
                          {selectedProject.title}
                        </h2>
                        <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-1">
                          {selectedProject.subtitle}
                        </p>
                      </div>

                      {/* Meta Information Specification Table */}
                      <div className="border-2 border-black dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-[#18181d] p-4 sm:p-5 space-y-3.5 text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
                        <div className="flex justify-between items-start gap-4 pb-2.5 border-b border-zinc-200 dark:border-zinc-700/80">
                          <span className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-zinc-400" /> Year
                          </span>
                          <span className="font-extrabold text-black dark:text-white text-right">
                            {selectedProject.year}
                          </span>
                        </div>

                        <div className="flex justify-between items-start gap-4 pb-2.5 border-b border-zinc-200 dark:border-zinc-700/80">
                          <span className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <UserCheck className="w-3.5 h-3.5 text-zinc-400" /> Role
                          </span>
                          <span className="font-extrabold text-black dark:text-white text-right max-w-[200px]">
                            {selectedProject.role}
                          </span>
                        </div>

                        <div className="flex justify-between items-start gap-4 pb-2.5 border-b border-zinc-200 dark:border-zinc-700/80">
                          <span className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Wrench className="w-3.5 h-3.5 text-zinc-400" /> Services
                          </span>
                          <span className="font-extrabold text-black dark:text-white text-right max-w-[200px]">
                            {selectedProject.services}
                          </span>
                        </div>

                        <div className="flex justify-between items-start gap-4 pb-2.5 border-b border-zinc-200 dark:border-zinc-700/80">
                          <span className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-zinc-400" /> Platform
                          </span>
                          <span className="font-extrabold text-black dark:text-white text-right max-w-[200px]">
                            {selectedProject.platform}
                          </span>
                        </div>

                        <div className="flex justify-between items-center gap-4">
                          <span className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-zinc-400" /> URL
                          </span>
                          {selectedProject.url && selectedProject.url !== "n/a (Under NDA)" ? (
                            <a
                              href={selectedProject.url}
                              target="_blank"
                              rel="noreferrer"
                              className="font-black text-black dark:text-white hover:underline flex items-center gap-1 bg-white dark:bg-zinc-800 px-2 py-0.5 rounded border border-black/20 dark:border-zinc-700"
                            >
                              Visit Site <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="font-mono text-zinc-400 font-bold">n/a</span>
                          )}
                        </div>
                      </div>

                      {/* Project Narrative Story */}
                      <div className="space-y-3 pt-2">
                        <div className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                          Project Overview & Architecture
                        </div>
                        {selectedProject.fullStory.map((paragraph, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-xs sm:text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* Key Deliverables & Features */}
                      {selectedProject.features && (
                        <div className="pt-2">
                          <div className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-2.5">
                            Key Deliverables
                          </div>
                          <div className="space-y-2">
                            {selectedProject.features.map((feature, fIdx) => (
                              <div
                                key={fIdx}
                                className="flex items-start gap-2 text-xs font-medium text-zinc-800 dark:text-zinc-200"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Links Buttons */}
                      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-3">
                        {selectedProject.url && selectedProject.url !== "n/a (Under NDA)" && (
                          <a
                            href={selectedProject.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 bg-black text-white dark:bg-white dark:text-black py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]"
                          >
                            <span>Live Preview</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                        {selectedProject.github && (
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white border-2 border-black dark:border-zinc-700 py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]"
                          >
                            <GithubIcon className="w-4 h-4" />
                            <span>Repository</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}

