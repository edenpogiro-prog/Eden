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

export const NAV = [
  { href: "/", label: "בית" },
  { href: "/services", label: "שירותים" },
  { href: "/our-story", label: "הסיפור שלנו" },
  { href: "/blog", label: "בלוג" },
  { href: "/podcast", label: "הפודקאסט" },
  { href: "/testimonials", label: "המלצות" },
  { href: "/contact", label: "צור קשר" },
] as const;
