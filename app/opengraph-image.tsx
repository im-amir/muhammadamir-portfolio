import { ImageResponse } from "next/og";
import { hero, profile } from "@/data/content";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0b0f17",
          color: "#e5e7eb",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, color: "#2dd4bf", fontWeight: 600 }}>
          {profile.name} · {profile.title}
        </div>
        <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
          {hero.headline}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#9ca3af" }}>
          {hero.badges.join("  ·  ")}
        </div>
      </div>
    ),
    size,
  );
}
