import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 48,
  height: 48,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
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
          border: "2px solid #ffffff",
          borderRadius: "10px",
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
