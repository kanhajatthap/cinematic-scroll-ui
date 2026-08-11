import { ImageResponse } from "next/og";

let cachedFont: ArrayBuffer | null = null;

async function loadPlayfair(): Promise<ArrayBuffer | null> {
  if (cachedFont) return cachedFont;
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } }
    ).then((r) => r.text());
    const url = css.match(
      /url\(\s*(https:\/\/fonts\.gstatic\.com\/[^)\s]+\.ttf)\s*\)/
    )?.[1];
    cachedFont = url
      ? await fetch(url).then((r) => r.arrayBuffer())
      : null;
  } catch {
    cachedFont = null;
  }
  return cachedFont;
}

const fontFamily = "Playfair Display, Georgia, serif";

function OGContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#05060a",
        color: "#ffffff",
        fontFamily,
        padding: 72,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -180,
          width: 560,
          height: 560,
          borderRadius: 9999,
          backgroundColor: "rgba(251,191,36,0.14)",
          filter: "blur(80px)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -240,
          left: -120,
          width: 480,
          height: 480,
          borderRadius: 9999,
          backgroundColor: "rgba(254,243,199,0.08)",
          filter: "blur(90px)",
          display: "flex",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          color: "rgba(255,255,255,0.75)",
          fontSize: 28,
          letterSpacing: 8,
          fontFamily: "monospace",
          textTransform: "uppercase",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            borderRadius: 16,
            border: "1px solid rgba(251,191,36,0.5)",
            backgroundColor: "rgba(251,191,36,0.1)",
            color: "#fbbf24",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          KJ
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 26, letterSpacing: 4 }}>PORTFOLIO</span>
          <span style={{ fontSize: 14, letterSpacing: 3, color: "rgba(251,191,36,0.9)" }}>
            CINEMATIC DIGITAL EXPERIENCES
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <div style={{ fontSize: 108, fontWeight: 700, letterSpacing: 2, lineHeight: 1 }}>
          KANHA
        </div>
        <div
          style={{
            fontSize: 108,
            fontWeight: 700,
            fontStyle: "italic",
            letterSpacing: 2,
            lineHeight: 1,
            backgroundImage:
              "linear-gradient(120deg, #fef3c7, #fbbf24 45%, #fde68a)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          JATTHAP
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          fontFamily: "monospace",
          fontSize: 18,
          letterSpacing: 4,
          color: "rgba(255,255,255,0.55)",
          textTransform: "uppercase",
        }}
      >
        <span style={{ display: "flex", gap: 24 }}>
          <span>Frontend Developer</span>
          <span style={{ color: "#fbbf24" }}>•</span>
          <span>WordPress Expert</span>
          <span style={{ color: "#fbbf24" }}>•</span>
          <span>React Developer</span>
        </span>
        <span>kanhajatthap.vercel.app</span>
      </div>
    </div>
  );
}

export async function renderOGImage() {
  const playfair = await loadPlayfair();
  return new ImageResponse(<OGContent />, {
    width: 1200,
    height: 630,
    fonts: playfair
      ? [
          {
            name: "Playfair Display",
            data: playfair,
            style: "normal",
            weight: 700,
          },
        ]
      : undefined,
  });
}