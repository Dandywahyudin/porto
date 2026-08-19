import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DW. — Dandy Wahyudin | Web Developer",
  description:
    "Portfolio of Dandy Wahyudin, FullStack Web Developer & Structural Digital Designer. Engineering digital experiences with precision, clean code, and neo-brutalist aesthetics.",
  keywords: [
    "Dandy Wahyudin",
    "DW.",
    "Web Developer",
    "FullStack Developer",
    "Frontend Developer",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Portfolio",
    "Bandung",
    "Indonesia",
  ],
  authors: [{ name: "Dandy Wahyudin", url: "https://github.com/Dandywahyudin" }],
  creator: "Dandy Wahyudin",
  publisher: "Dandy Wahyudin",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://dandywahyudin.dev",
    title: "DW. — Dandy Wahyudin | Web Developer",
    description:
      "Personal portfolio of Dandy Wahyudin, FullStack Web Developer. Specializing in high-performance React & Next.js applications.",
    siteName: "Dandy Wahyudin Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "DW. — Dandy Wahyudin | Web Developer",
    description:
      "Portfolio of Dandy Wahyudin, FullStack Web Developer & Structural Digital Designer.",
    creator: "@dandywahyudinn",
  },
  icons: {
    icon: [
      {
        url: "/icon",
        type: "image/png",
        sizes: "48x48",
      },
    ],
    apple: [
      {
        url: "/apple-icon",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
    >
      <body className="bg-[#f8f8fa] dark:bg-[#0e0e11] text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black min-h-screen transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}

