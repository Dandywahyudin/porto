import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 90,
          background: "#0e0e11",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontFamily: "sans-serif",
          fontWeight: 900,
          letterSpacing: "-0.05em",
          border: "8px solid #ffffff",
          borderRadius: "36px",
        }}
      >
        DW.
      </div>
    ),
    {
      ...size,
    }
  );
}
