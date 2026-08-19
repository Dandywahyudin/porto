"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Award, BadgeCheck, FileCheck, CheckCircle2, X, ExternalLink } from "lucide-react";
import { Particles } from "@/components/ui/particles";

export type CertificateItem = {
  number: string;
  title: string;
  issuer: string;
  year: string;
  skills: string[];
  description: string;
  image: string;
  icon: React.ReactNode;
};

const certificatesData: CertificateItem[] = [
  {
    number: "01",
    title: "VOCATIONAL SCHOOL GRADUATE ACADEMY (VSGA)",
    issuer: "Digitalent Kominfo",
    year: "2023",
    skills: [
      "Web Development",
      "HTML5 & CSS3",
      "JavaScript",
      "Problem Solving",
      "Database Fundamentals",
    ],
    image: "/certificates/vsga.webp",
    icon: <Award className="w-4 h-4 text-black dark:text-white" />,
    description:
      "Program pelatihan dan sertifikasi kompetensi berbasis Standar Kompetensi Kerja Nasional Indonesia (SKKNI) oleh Kementerian Komunikasi dan Informatika (Kominfo) dalam bidang Junior Web Developer.",
  },
  {
    number: "02",
    title: "GOOGLE IT SUPPORT PROFESSIONAL",
    issuer: "Google / Coursera",
    year: "2023",
    skills: [
      "IT Troubleshooting",
      "Computer Networking",
      "Operating Systems",
      "System Administration",
      "IT Security",
    ],
    image: "/certificates/itsupport.webp",
    icon: <BadgeCheck className="w-4 h-4 text-black dark:text-white" />,
    description:
      "Sertifikasi tingkat profesional dari Google yang mencakup fondasi dukungan teknis komputer, konfigurasi jaringan TCP/IP, administrasi sistem operasi (Linux/Windows), dan proteksi keamanan siber.",
  },
  {
    number: "03",
    title: "PELATIHAN VOKASI KEMNAKER PENGEMBANGAN WEB REACT.JS DAN NODE.JS",
    issuer: "KEMNAKER RI",
    year: "2025",
    skills: [
      "Framework React.JS",
      "Framework Node.JS",
      "Problem Solving",
      "Design Thinking",
    ],
    image: "/certificates/kemna.webp",
    icon: <FileCheck className="w-4 h-4 text-black dark:text-white" />,
    description:
      "Pelatihan kejuruan terapan bersertifikat dari Kementerian Ketenagakerjaan Republik Indonesia (Kemnaker) yang memvalidasi keterampilan teknis praktis sesuai dengan standar kebutuhan dunia kerja industri.",
  },
  {
    number: "04",
    title: "BOOTCAMP PELATIHAN VOKASI KILAT ALKADEMI",
    issuer: "Alkademi",
    year: "2022",
    skills: [
      "Software Development Life Cycle",
      "Basic Programing",
      "Fundamental Nuxt.js & Express.js",
      "Git & Github",
    ],
    image: "/certificates/pesilat.webp",
    icon: <CheckCircle2 className="w-4 h-4 text-black dark:text-white" />,
    description:
      "Bootcamp yang dilaksanakan secara offline di kota bandung dengan kompetensi tingkat terapan yang memvalidasi keterampilan teknis praktis sesuai dengan standar kebutuhan dunia kerja industri.",
  },
];

export function CertificateSection() {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedCert(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedCert]);

  return (
    <section id="certificates" className="py-20 border-b border-zinc-200/60 dark:border-zinc-800 transition-colors relative">
      {/* Particles Ambient Background */}
      <Particles quantity={65} ease={60} size={0.6} className="opacity-70 dark:opacity-90" />

      <div className="relative z-10 mb-10">
        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black dark:text-white">
          CERTIFICATE
        </h2>
        <div className="w-full border-b border-black dark:border-zinc-700 mt-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {certificatesData.map((cert) => (
          <div
            key={cert.number}
            onClick={() => setSelectedCert(cert)}
            className="bg-white dark:bg-[#141417] border-2 border-black dark:border-zinc-700 rounded-2xl p-4 sm:p-5 relative flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.35)] group overflow-hidden cursor-pointer"
          >
            <div>
              {/* Certificate Image Frame */}
              <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden border border-black/20 dark:border-zinc-700 mb-4 bg-zinc-100 dark:bg-zinc-800/80">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-30 group-hover:opacity-50 transition-opacity" />

                <span className="absolute top-2.5 right-2.5 bg-black/85 dark:bg-white/90 text-white dark:text-black text-[10px] font-black px-2.5 py-0.5 rounded-full backdrop-blur-sm shadow-xs">
                  {cert.number}
                </span>

                {/* Hover Action Pill */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black text-[11px] font-extrabold tracking-wider uppercase opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                  <span>Lihat Detail</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-2.5 py-1 border border-zinc-300 dark:border-zinc-700 rounded-md">
                    {cert.icon}
                    {cert.issuer}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                    {cert.year}
                  </span>
                </div>

                <h3 className="text-sm font-black uppercase tracking-tight text-black dark:text-white group-hover:underline mb-2 leading-snug">
                  {cert.title}
                </h3>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium mt-3 border-t border-zinc-100 dark:border-zinc-800/80 pt-3 line-clamp-3">
              {cert.description}
            </p>
          </div>
        ))}
      </div>

      {/* Portal Modal Dialog */}
      {mounted && selectedCert &&
        createPortal(
          <div
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md transition-all duration-300"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#141417] border-2 border-black dark:border-zinc-600 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] dark:shadow-[16px_16px_0px_0px_rgba(255,255,255,0.25)] relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                aria-label="Tutup detail sertifikat"
                className="absolute top-4 right-4 z-30 w-10 h-10 bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform cursor-pointer shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left/Top: High-Res Image Display */}
              <div className="relative md:w-1/2 min-h-64 sm:min-h-80 md:min-h-full bg-zinc-950 flex items-center justify-center p-4 border-b-2 md:border-b-0 md:border-r-2 border-black dark:border-zinc-700">
                <div className="relative w-full h-64 sm:h-80 md:h-96">
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
                <span className="absolute top-4 left-4 bg-black/80 text-white text-xs font-black px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                  #{selectedCert.number}
                </span>
              </div>

              {/* Right/Bottom: Certificate Details */}
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-3 py-1 border border-zinc-300 dark:border-zinc-700 rounded-md">
                      {selectedCert.icon}
                      {selectedCert.issuer}
                    </span>
                    <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                      Tahun {selectedCert.year}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black uppercase text-black dark:text-white tracking-tight leading-snug mb-4">
                    {selectedCert.title}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                        Deskripsi Sertifikasi
                      </h4>
                      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium">
                        {selectedCert.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                        Keahlian yang Divalidasi
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="border border-black dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
                  <a
                    href={selectedCert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white dark:bg-white dark:text-black text-xs font-bold px-4 py-2.5 rounded-full hover:scale-105 transition-transform flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]"
                  >
                    <span>Buka Gambar Penuh</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setSelectedCert(null)}
                    className="border border-black dark:border-zinc-600 px-4 py-2.5 rounded-full text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
