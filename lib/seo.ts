import { BUSINESS, COACHES, COACH_PROFILES, SITE } from "@/lib/site";
import type { BlogPost, FAQ, Service, TeamMember } from "@/lib/types";

/** The team page for a coach, matched by the display name used in frontmatter. */
function coachUrl(name: string): string | undefined {
  const match = Object.values(COACHES).find((c) => c.name === name);
  return match ? `${SITE.url}/team/${match.slug}` : undefined;
}

// Organization / ProfessionalService. NOTE: @type is ProfessionalService
// (non-clinical). If practitioners are licensed clinicians, revisit whether
// MedicalBusiness + clinical disclaimers are required (see CEO plan open question).
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    slogan: SITE.tagline,
    url: SITE.url,
    email: SITE.email,
    // NAP: phone must stay identical to the Google Business Profile listing.
    telephone: "+972-52-855-9050",
    areaServed: "IL",
    sameAs: [SITE.instagramUrl, SITE.spotifyShowUrl],
    // Street name only, no house number — deliberate, and kept identical to the
    // Google Business Profile listing so the two records match.
    address: {
      "@type": "PostalAddress",
      streetAddress: "עליזה בגין",
      addressLocality: "ראשון לציון",
      addressCountry: "IL",
    },
    // Both stay out of the payload until confirmed against the Business
    // Profile — see BUSINESS in lib/site.ts.
    ...(BUSINESS.openingHours ? { openingHours: BUSINESS.openingHours } : {}),
    ...(BUSINESS.geo
      ? { geo: { "@type": "GeoCoordinates", ...BUSINESS.geo } }
      : {}),
    employee: Object.values(COACHES).map((c) => ({
      "@type": "Person",
      name: c.name,
      jobTitle: c.role,
      url: `${SITE.url}/team/${c.slug}`,
    })),
  };
}

export function serviceLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.tagline || service.metaDescription,
    serviceType: service.title,
    provider: { "@type": "ProfessionalService", name: SITE.name, url: SITE.url },
    areaServed: "IL",
    url: `${SITE.url}/services/${service.slug}`,
  };
}

export function personLd(member: TeamMember) {
  const profiles = COACH_PROFILES[member.coachKey] ?? [];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    ...(member.credentials?.length
      ? { knowsAbout: member.credentials }
      : {}),
    worksFor: { "@type": "ProfessionalService", name: SITE.name, url: SITE.url },
    url: `${SITE.url}/team/${member.slug}`,
    ...(profiles.length ? { sameAs: profiles } : {}),
  };
}

/**
 * Course schema for the digital-courses page. Deliberately minimal: rich
 * results for courses need real `hasCourseInstance` entries (dates, mode,
 * price), which don't exist until a course actually launches. This is correct
 * markup and groundwork, not a rich-result win on its own.
 */
export function courseLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: service.title,
    description: service.metaDescription || service.tagline,
    inLanguage: "he",
    url: `${SITE.url}/services/${service.slug}`,
    provider: { "@type": "ProfessionalService", name: SITE.name, url: SITE.url },
  };
}

export function faqLd(faqs: FAQ[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: "he",
    // Linking the author to their /team page connects the post to a Person
    // entity that carries the credentials — the E-E-A-T signal Google looks
    // for on family- and money-adjacent content.
    author: {
      "@type": "Person",
      name: post.author,
      ...(coachUrl(post.author) ? { url: coachUrl(post.author) } : {}),
    },
    publisher: { "@type": "ProfessionalService", name: SITE.name, url: SITE.url },
    url: `${SITE.url}/blog/${post.slug}`,
    ...(post.cover ? { image: `${SITE.url}${post.cover}` } : {}),
  };
}

export function breadcrumbLd(
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE.url}${t.path}`,
    })),
  };
}
