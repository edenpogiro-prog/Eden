// Central site configuration — brand, contact, nav, coaches.
// Edit here to change global facts in one place.

export const SITE = {
  name: "המטרייה המשפחתית",
  tagline: "כל המשפחה. תחת מטרייה אחת.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mitriafamily.co.il",
  locale: "he_IL",
  email: "sivaneden@mitriafamily.co.il",
  spotifyShowUrl:
    "https://open.spotify.com/show/033x9y6sbLsOBt47q2ojAc?si=_us_SL2YS1ycHA9Aije6Mg&nd=1&dlsi=19ca76fa954f4d1b",
  instagramUrl: "https://www.instagram.com/sivanarazipogiro?igsh=enhhcHB0eG1vdHRz",
  sivanCommunityWhatsappUrl: "https://chat.whatsapp.com/IjroivUQkO0KSsSLqydYoQ",
} as const;

// Coaches. WhatsApp routing:
//   couples / parenting / blueprint / personal-development / future-leaders -> Sivan (052-5205281)
//   everything else -> Eden (052-8559050)
// Change a number here and every routed CTA updates. Both coaches share one
// inbox (sivaneden@mitriafamily.co.il) rather than personal addresses.
export const COACHES = {
  eden: {
    slug: "eden",
    name: "עדן פוגירו",
    role: "יועץ כלכלי למשפחה ומומחה להשקעות נדל\"ן בארה\"ב",
    whatsapp: "972528559050", // 052-8559050
    email: "sivaneden@mitriafamily.co.il",
  },
  sivan: {
    slug: "sivan",
    name: "סיון ארזי פוגירו",
    role: "מנטורית רב-תחומית לזוגיות, הורות וניהול חיים",
    whatsapp: "972525205281", // 052-5205281
    email: "sivaneden@mitriafamily.co.il",
  },
} as const;

export type CoachKey = keyof typeof COACHES;

// Fallback number for ambiguous inquiries (general contact) — Sivan by default.
export const FALLBACK_WHATSAPP = COACHES.sivan.whatsapp;

export const NAV = [
  { href: "/", label: "בית" },
  { href: "/services", label: "שירותים" },
  { href: "/our-story", label: "הסיפור שלנו" },
  { href: "/blog", label: "בלוג" },
  { href: "/podcast", label: "הפודקאסט" },
  { href: "/testimonials", label: "המלצות" },
  { href: "/contact", label: "צור קשר" },
] as const;
