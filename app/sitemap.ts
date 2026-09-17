import type { MetadataRoute } from "next";
import { getBlogPosts, getServices, getTeam } from "@/lib/content";
import { SITE } from "@/lib/site";

// Real last-modified dates only.
//
// Google reads <lastmod> to decide what is worth re-crawling, and stops
// trusting the field entirely once it notices the value moves on every
// deploy. This file used to hand `new Date()` to all 25 URLs, so every page
// claimed to have been rewritten on each build. A URL whose real date we
// don't track now simply omits the field: no date is far better than a date
// that always says "today".
//
// Blog posts use their own `date`; services and team members use the
// `updated` value in their frontmatter — bump that when you edit the copy.
const ROUTE_UPDATED: Record<string, string> = {
  "": "2026-09-16",
  "/services": "2026-09-16",
  "/our-story": "2026-09-16",
  "/blog": "2026-08-06",
  "/podcast": "2026-09-02",
  "/testimonials": "2026-09-16",
  "/contact": "2026-09-14",
};

function lastMod(date?: string) {
  return date ? { lastModified: new Date(date) } : {};
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  const staticEntries = Object.keys(ROUTE_UPDATED).map((path) => ({
    url: `${base}${path}`,
    ...lastMod(ROUTE_UPDATED[path]),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceEntries = getServices().map((s) => ({
    url: `${base}/services/${s.slug}`,
    ...lastMod(s.updated),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const teamEntries = getTeam().map((m) => ({
    url: `${base}/team/${m.slug}`,
    ...lastMod(m.updated),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const blogEntries = getBlogPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    ...lastMod(p.updated ?? p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...teamEntries, ...blogEntries];
}
