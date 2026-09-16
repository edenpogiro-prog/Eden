// Central site configuration — brand, contact, nav, coaches.
// Edit here to change global facts in one place.

/**
 * The site's public base URL, always without the `www.` host.
 *
 * mitriafamily.co.il serves the site; www.mitriafamily.co.il 307-redirects to
 * it. NEXT_PUBLIC_SITE_URL in the Vercel project settings still names the www
 * host, and that value would otherwise land in every canonical tag, sitemap
 * <loc>, JSON-LD url and og:url — pointing Google at a hostname the server
 * redirects away from, via a *temporary* redirect at that. Normalising here
 * rather than in the dashboard keeps the deployed site correct no matter what
 * the variable is set to.
 */
function canonicalBase(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mitriafamily.co.il";
  const noWww = raw.replace("://www.", "://");
  return noWww.endsWith("/") ? noWww.slice(0, -1) : noWww;
}

export const SITE = {
  name: "המטרייה המשפחתית",
  tagline: "כל המשפחה. תחת מטרייה אחת.",
  url: canonicalBase(),
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
  openingHours: { days: string[]; opens: string; closes: string }[] | null;
  geo: { latitude: number; longitude: number } | null;
} = {
  // Confirmed by Eden, 2026-09-16. Saturday is simply absent, which reads as
  // closed — the normal convention, and correct here.
  openingHours: [
    {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "20:00",
    },
    { days: ["Friday"], opens: "09:00", closes: "13:00" },
  ],
  // Still unset. Low value while the Business Profile carries the real pin,
  // which is what Google actually geocodes against.
  geo: null,
};

/**
 * Google measurement IDs. Public values — the Ads conversion ID is already
 * hard-coded in app/layout.tsx, and these live alongside it rather than in
 * environment variables so there is one file to edit and no dashboard trip.
 *
 * Both are empty until the properties exist. Everything that reads them
 * no-ops while they are blank, so shipping them empty is safe.
 *
 *   ga4Id            analytics.google.com -> Admin -> Data streams -> the
 *                    web stream for mitriafamily.co.il. Looks like G-XXXXXXXXXX.
 *   gscVerification  search.google.com/search-console -> add a URL-prefix
 *                    property -> "HTML tag" -> the content="..." value only,
 *                    not the whole tag.
 */
export const ANALYTICS = {
  ga4Id: "G-JL0HHC5R7E",
  gscVerification: "",
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
