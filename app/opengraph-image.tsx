import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "DANDY WAHYUDIN — Web Developer Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0e0e11",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
          border: "16px solid #1c1c22",
        }}
      >
        {/* Top Logo Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              padding: "12px 28px",
              background: "#ffffff",
              color: "#000000",
              borderRadius: "16px",
              letterSpacing: "-0.05em",
            }}
          >
            DW.
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#a1a1aa",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            PORTFOLIO 2026
          </div>
        </div>

        {/* Center Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
            }}
          >
            DANDY WAHYUDIN
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#e4e4e7",
              letterSpacing: "0.05em",
            }}
          >
            FULLSTACK WEB DEVELOPER
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: "#71717a",
              maxWidth: "850px",
              lineHeight: 1.4,
            }}
          >
            Engineering structural digital experiences with precision, clean code, and neo-brutalist aesthetics.
          </div>
        </div>

        {/* Bottom Footer Tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #27272a",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "24px", fontSize: 20, color: "#a1a1aa", fontWeight: 700 }}>
            <span>REACT</span>
            <span>•</span>
            <span>NEXT.JS</span>
            <span>•</span>
            <span>TYPESCRIPT</span>
            <span>•</span>
            <span>TAILWIND CSS</span>
          </div>
          <div style={{ fontSize: 20, color: "#ffffff", fontWeight: 800 }}>
            dandywahyudin.dev
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
