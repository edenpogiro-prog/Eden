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
  order: number;
  content: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
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
