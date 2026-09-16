// Central site configuration — brand, contact, nav, coaches.
// Edit here to change global facts in one place.

export const SITE = {
  name: "המטרייה המשפחתית",
  tagline: "כל המשפחה. תחת מטרייה אחת.",
  // Non-www, because that is the host that actually serves the site: the
  // www. hostname 307-redirects here. Declaring www as canonical while the
  // server redirects away from it told Google the opposite of the truth on
  // every canonical tag, sitemap <loc>, JSON-LD url and og:url.
  // NOTE: if NEXT_PUBLIC_SITE_URL is set in the Vercel project settings it
  // overrides this — it has to say non-www there too.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mitriafamily.co.il",
  locale: "he_IL",
  email: "sivaneden@mitriafamily.co.il",
  spotifyShowUrl:
    "https://open.spotify.com/show/033x9y6sbLsOBt47q2ojAc?si=_us_SL2YS1ycHA9Aije6Mg&nd=1&dlsi=19ca76fa954f4d1b",
  instagramUrl: "https://www.instagram.com/sivanarazipogiro?igsh=enhhcHB0eG1vdHRz",
  sivanCommunityWhatsappUrl: "https://chat.whatsapp.com/IjroivUQkO0KSsSLqydYoQ",
} as const;

// One line for the whole site. Every WhatsApp CTA and every phone link points
// here — nothing is routed per coach any more, because a split inbox meant
// nobody owned the reply. Which coach an inquiry is for is carried in the
// pre-filled message text instead (see lib/whatsapp.ts).
export const WHATSAPP = "972528559050"; // wa.me format
export const PHONE_TEL = "+972528559050"; // tel: href
export const PHONE_DISPLAY = "052-855-9050";

// Coaches. Names, roles and the shared inbox — no per-coach phone numbers.
export const COACHES = {
  eden: {
    slug: "eden",
    name: "עדן פוגירו",
    role: "יועץ כלכלי למשפחה ומומחה להשקעות נדל\"ן בארה\"ב",
    email: "sivaneden@mitriafamily.co.il",
  },
  sivan: {
    slug: "sivan",
    name: "סיון ארזי פוגירו",
    role: "מנטורית רב-תחומית לזוגיות, הורות וניהול חיים",
    email: "sivaneden@mitriafamily.co.il",
  },
} as const;

export type CoachKey = keyof typeof COACHES;

// Public profiles that belong to each coach individually, emitted as `sameAs`
// on their Person schema. This is what tells Google that the host of the
// podcast, the account on Instagram and the author of the blog posts are one
// person — the cheapest expertise signal the site can give.
export const COACH_PROFILES: Record<CoachKey, string[]> = {
  eden: [],
  sivan: [SITE.instagramUrl, SITE.spotifyShowUrl],
};

// Facts that must stay identical to the Google Business Profile listing.
// A field stays null until the real value is confirmed: publishing a guess
// here would show wrong hours to searchers and break the very consistency the
// profile depends on. "Open at the time of search" entered Google's top five
// local ranking factors in 2026, so these are worth filling in properly.
export const BUSINESS: {
  openingHours: string[] | null; // e.g. ["Su-Th 09:00-20:00"]
  geo: { latitude: number; longitude: number } | null;
} = {
  openingHours: null,
  geo: null,
};

export const NAV = [
  { href: "/", label: "בית" },
  { href: "/services", label: "שירותים" },
  { href: "/our-story", label: "הסיפור שלנו" },
  { href: "/blog", label: "בלוג" },
  { href: "/podcast", label: "הפודקאסט" },
  { href: "/testimonials", label: "המלצות" },
  { href: "/contact", label: "צור קשר" },
] as const;
