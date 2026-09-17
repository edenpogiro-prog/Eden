import type { CoachKey } from "@/lib/site";

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  summary?: string; // expanded blurb for the services overview page
  metaTitle?: string;
  metaDescription?: string;
  updated?: string; // ISO date of the last real content edit — feeds sitemap lastmod
  /** false keeps a page out of the home and /services grids while it still gets a route and a sitemap entry. */
  listed?: boolean;
  /** Slug of the broader service this page sits under, for breadcrumbs. */
  parent?: string;
  icon:
    | "heart"
    | "sprout"
    | "coins"
    | "compass"
    | "layers"
    | "link"
    | "graduation"
    | "sparkles"
    | "presentation"
    | "star";
  routingKey: string; // maps to whatsapp routing (finance/couples/parenting/blueprint)
  order: number;
  forWhom?: string[];
  outcomes?: string[];
  faqs?: FAQ[];
  content: string; // MDX body
}

export interface Testimonial {
  slug: string;
  author: string; // first name / initial only (privacy)
  service?: string;
  quote: string;
  result?: string;
  order: number;
  content: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  coachKey: CoachKey;
  photo?: string;
  tagline?: string;
  credentials?: string[];
  updated?: string; // ISO date of the last real content edit
  order: number;
  content: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
  updated?: string; // ISO date of a material content revision, if any
  author: string;
  tags: string[];
  cover?: string; // path under /public
  readingMinutes: number;
  content: string; // MDX body
}

export interface PageDoc {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  content: string;
  data: Record<string, unknown>;
}
