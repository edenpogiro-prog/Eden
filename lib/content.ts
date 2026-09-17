import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  BlogPost,
  FAQ,
  PageDoc,
  Service,
  TeamMember,
  Testimonial,
} from "@/lib/types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function collectionDir(name: string): string {
  return path.join(CONTENT_ROOT, name);
}

/** Read every .mdx file in a collection, parse frontmatter + body. */
function readCollection(
  name: string,
): { slug: string; data: Record<string, unknown>; content: string }[] {
  const dir = collectionDir(name);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      const { data, content } = matter(raw);
      return { slug: f.replace(/\.mdx$/, ""), data, content };
    });
}

function bySlug(name: string, slug: string) {
  const filePath = path.join(collectionDir(name), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, data, content };
}

function sortByOrder<T extends { order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

// ---- Services ----
export function getServices(): Service[] {
  return sortByOrder(
    readCollection("services").map(({ slug, data, content }) => ({
      slug,
      title: (data.title as string) ?? slug,
      tagline: (data.tagline as string) ?? "",
      summary: data.summary as string | undefined,
      metaTitle: data.metaTitle as string | undefined,
      metaDescription: data.metaDescription as string | undefined,
      updated: data.updated as string | undefined,
      listed: data.listed !== false,
      parent: data.parent as string | undefined,
      icon: (data.icon as Service["icon"]) ?? "compass",
      routingKey: (data.routingKey as string) ?? "",
      order: (data.order as number) ?? 99,
      forWhom: (data.forWhom as string[]) ?? [],
      outcomes: (data.outcomes as string[]) ?? [],
      faqs: (data.faqs as FAQ[]) ?? [],
      content,
    })),
  );
}

/**
 * Services shown in the home page and /services grids. Focused sub-pages
 * (e.g. a page built around one search phrase) set `listed: false` so they
 * reach search without crowding the menu of core offerings.
 */
export function getListedServices(): Service[] {
  return getServices().filter((s) => s.listed !== false);
}

export function getServiceBySlug(slug: string): Service | null {
  const raw = bySlug("services", slug);
  if (!raw) return null;
  const { data, content } = raw;
  return {
    slug,
    title: (data.title as string) ?? slug,
    tagline: (data.tagline as string) ?? "",
    summary: data.summary as string | undefined,
    metaTitle: data.metaTitle as string | undefined,
    metaDescription: data.metaDescription as string | undefined,
    updated: data.updated as string | undefined,
    listed: data.listed !== false,
    parent: data.parent as string | undefined,
    icon: (data.icon as Service["icon"]) ?? "compass",
    routingKey: (data.routingKey as string) ?? "",
    order: (data.order as number) ?? 99,
    forWhom: (data.forWhom as string[]) ?? [],
    outcomes: (data.outcomes as string[]) ?? [],
    faqs: (data.faqs as FAQ[]) ?? [],
    content,
  };
}

// ---- Testimonials ----
export function getTestimonials(): Testimonial[] {
  return sortByOrder(
    readCollection("testimonials").map(({ slug, data, content }) => ({
      slug,
      author: (data.author as string) ?? "",
      service: data.service as string | undefined,
      quote: (data.quote as string) ?? "",
      result: data.result as string | undefined,
      order: (data.order as number) ?? 99,
      content,
    })),
  );
}

// ---- Team ----
export function getTeam(): TeamMember[] {
  return sortByOrder(
    readCollection("team").map(({ slug, data, content }) => ({
      slug,
      name: (data.name as string) ?? slug,
      role: (data.role as string) ?? "",
      coachKey: (data.coachKey as TeamMember["coachKey"]) ?? "sivan",
      photo: data.photo as string | undefined,
      tagline: data.tagline as string | undefined,
      credentials: (data.credentials as string[]) ?? [],
      updated: data.updated as string | undefined,
      order: (data.order as number) ?? 99,
      content,
    })),
  );
}

export function getTeamMemberBySlug(slug: string): TeamMember | null {
  const raw = bySlug("team", slug);
  if (!raw) return null;
  const { data, content } = raw;
  return {
    slug,
    name: (data.name as string) ?? slug,
    role: (data.role as string) ?? "",
    coachKey: (data.coachKey as TeamMember["coachKey"]) ?? "sivan",
    photo: data.photo as string | undefined,
    tagline: data.tagline as string | undefined,
    credentials: (data.credentials as string[]) ?? [],
    updated: data.updated as string | undefined,
    order: (data.order as number) ?? 99,
    content,
  };
}

// ---- Blog ----
function toBlogPost(slug: string, data: Record<string, unknown>, content: string): BlogPost {
  const words = content.trim().split(/\s+/).length;
  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    date: (data.date as string) ?? "1970-01-01",
    updated: data.updated as string | undefined,
    author: (data.author as string) ?? "המטרייה המשפחתית",
    tags: (data.tags as string[]) ?? [],
    cover: data.cover as string | undefined,
    coverPosition: data.coverPosition as string | undefined,
    readingMinutes: Math.max(1, Math.ceil(words / 200)),
    content,
  };
}

/** All posts, newest first. */
export function getBlogPosts(): BlogPost[] {
  return readCollection("blog")
    .map(({ slug, data, content }) => toBlogPost(slug, data, content))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Posts written by one coach, newest first. Powers the "from X's blog" list on
 * a team page — an author hub built from content that already exists, which is
 * the strongest expertise signal the site can give Google for free.
 */
export function getBlogPostsByAuthor(name: string): BlogPost[] {
  return getBlogPosts().filter((p) => p.author === name);
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const raw = bySlug("blog", slug);
  if (!raw) return null;
  return toBlogPost(slug, raw.data, raw.content);
}

// ---- Single-doc pages (home sections, our-story) ----
export function getPage(slug: string): PageDoc | null {
  const raw = bySlug("pages", slug);
  if (!raw) return null;
  const { data, content } = raw;
  return {
    slug,
    title: (data.title as string) ?? slug,
    metaTitle: data.metaTitle as string | undefined,
    metaDescription: data.metaDescription as string | undefined,
    content,
    data,
  };
}
