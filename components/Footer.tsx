import Link from "next/link";
import { Instagram, Mail, Phone, Podcast } from "lucide-react";
import { NAV, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="scene-night starfield relative text-white/80 mt-24">
      <div
        className="h-px bg-gradient-to-l from-transparent via-champagne-400/70 to-transparent"
        aria-hidden="true"
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-12 sm:grid-cols-3">
        <div>
          <h2 className="font-display text-white text-2xl mb-3">{SITE.name}</h2>
          <p className="text-white/60 leading-relaxed max-w-xs">
            {SITE.tagline} ליווי זוגי, הורי וכלכלי למשפחה, תחת קורת גג אחת.
          </p>
        </div>

        <div>
          <h3 className="text-[13px] font-bold tracking-[0.18em] text-champagne-400 mb-4">
            ניווט
          </h3>
          <ul className="space-y-2.5">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/60 hover:text-white transition-colors duration-150"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[13px] font-bold tracking-[0.18em] text-champagne-400 mb-4">
            יצירת קשר
          </h3>
          <ul className="space-y-2.5 text-white/60">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              <span dir="ltr">052-8559050</span> · עדן
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              <span dir="ltr">052-5205281</span> · סיון
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              <a
                href={`mailto:${SITE.email}`}
                dir="ltr"
                className="hover:text-white transition-colors duration-150"
              >
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Podcast className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              <a
                href={SITE.spotifyShowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-150"
              >
הפודקאסט של סיון בספוטיפיי
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-150"
              >
                אינסטגרם
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-sm text-white/60 flex flex-wrap gap-x-4 gap-y-1 justify-between">
          <span>
            © {new Date().getFullYear()} {SITE.name}. כל הזכויות שמורות.
          </span>
          <span className="flex gap-x-4">
            <Link href="/privacy" className="hover:text-white transition-colors duration-150">
              מדיניות פרטיות
            </Link>
            <Link href="/accessibility" className="hover:text-white transition-colors duration-150">
              הצהרת נגישות
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
