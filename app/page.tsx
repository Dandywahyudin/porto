"use client";

import { useEffect, useState } from "react";
import { AboutSection } from "@/components/about-section";
import { CertificateSection } from "@/components/certificate-section";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { Preloader } from "@/components/preloader";
import { ProjectSection } from "@/components/project-section";
import { SiteNav } from "@/components/site-nav";
import { TopNav } from "@/components/top-nav";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Update Parallax CSS variables for mobile & desktop
      document.documentElement.style.setProperty(
        "--parallax-slow",
        `${scrollPosition * -0.05}px`
      );
      document.documentElement.style.setProperty(
        "--parallax-fast",
        `${scrollPosition * 0.06}px`
      );

      const sections = ["home", "about", "certificates", "project", "contact"];

      // If reached near bottom of page, activate contact
      if (scrollPosition + windowHeight >= docHeight - 80) {
        setActiveSection("contact");
        return;
      }

      // Check sections from bottom to top
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.45) {
            setActiveSection(section === "certificates" ? "about" : section);
            break;
          }
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll reveal observer - mobile friendly
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.02,
      rootMargin: "0px 0px -15px 0px",
    });

    const observeElements = () => {
      const elements = document.querySelectorAll(".reveal-on-scroll");
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();

    // Re-observe after preloader curtains open to guarantee mobile triggers
    const introTimer = setTimeout(() => {
      observeElements();
      handleScroll();
    }, 2400);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      clearTimeout(introTimer);
    };
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f8fa] dark:bg-[#0e0e11] text-black dark:text-white transition-colors duration-300">
      <Preloader />
      <SiteNav activeSection={activeSection} onNavigate={scrollTo} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 max-w-5xl w-full mx-auto px-6 sm:px-10 lg:px-16 py-6 md:py-8 pb-28 md:pb-20 overflow-x-hidden space-y-4">
          <HeroSection onNavigate={scrollTo} />
          <div className="reveal-on-scroll">
            <AboutSection />
          </div>
          <div className="reveal-on-scroll">
            <CertificateSection />
          </div>
          <div className="reveal-on-scroll">
            <ProjectSection />
          </div>
          <div className="reveal-on-scroll">
            <ContactSection />
          </div>
        </main>
      </div>
    </div>
  );
}
