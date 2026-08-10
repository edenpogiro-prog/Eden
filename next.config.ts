import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["gray-matter"],
  // ESLint is run separately (`npm run lint`); the pinned eslint-config-next
  // version mismatch shouldn't block production builds.
  eslint: { ignoreDuringBuilds: true },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/brochure", destination: "/brochure.html", permanent: false },
    ];
  },
};

export default nextConfig;
