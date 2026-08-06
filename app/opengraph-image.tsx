import { readFileSync } from "fs";
import path from "path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "המטרייה המשפחתית, כל המשפחה תחת מטרייה אחת";

export default function OG() {
  const logo = readFileSync(
    path.join(process.cwd(), "public", "images", "logo-black.jpg"),
  );
  const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0F0A16",
          backgroundImage:
            "radial-gradient(circle at 50% 110%, rgba(242,102,72,.5), transparent 55%), radial-gradient(circle at 80% 10%, rgba(227,185,120,.25), transparent 50%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={220}
          height={220}
          style={{ borderRadius: "50%" }}
          alt=""
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#FFFFFF",
            marginTop: 28,
            direction: "rtl",
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,.7)",
            marginTop: 10,
            direction: "rtl",
          }}
        >
          {SITE.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
