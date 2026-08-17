"use client";

import { useEffect, useState } from "react";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectSection } from "@/components/project-section";
import { SiteNav } from "@/components/site-nav";
import { TopNav } from "@/components/top-nav";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "project", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f8fa] dark:bg-[#0e0e11] text-black dark:text-white transition-colors duration-300">
      <SiteNav activeSection={activeSection} onNavigate={scrollTo} />

      <main className="flex-1 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-6 md:py-8 pb-28 md:pb-20 overflow-x-hidden">
        <TopNav />
        <HeroSection onNavigate={scrollTo} />
        <AboutSection />
        <ProjectSection />
        <ContactSection />
      </main>
    </div>
  );
}
