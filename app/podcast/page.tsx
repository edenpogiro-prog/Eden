import type { Metadata } from "next";
import Image from "next/image";
import { Instagram, MessageCircle, Podcast } from "lucide-react";
import { SITE } from "@/lib/site";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "הפודקאסט",
  description:
    "התפתחות אישית נשית, פודקאסט של סיון ארזי פוגירו: עבודת עומק על דפוסים, גבולות ואשמה, כדי שתהיי המנכ\"לית של החיים שלך.",
  alternates: { canonical: "/podcast" },
};

export default function PodcastPage() {
  return (
    <>
      <header className="scene-night starfield horizon grain relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
          <p className="eyebrow eyebrow-light">הפודקאסט של סיון</p>
          <h1 className="text-4xl sm:text-6xl text-white mb-5 leading-[1.15]">
            התפתחות אישית נשית
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-xl">
            עבודת עומק על דפוסים, גבולות ואשמה, בלי הנחות, עם הרבה אוויר
            לנשימה.
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-14 items-start">
          {/* Cover */}
          <div className="relative aspect-square rounded-[24px] overflow-hidden shadow-pop lg:sticky lg:top-24">
            <Image
              src="/images/podcast-cover.jpg"
              alt="התפתחות אישית נשית, הפודקאסט של סיון ארזי פוגירו"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover"
              priority
            />
          </div>

          {/* Copy */}
          <div>
            <p className="text-xl font-semibold text-ink mb-6 leading-relaxed">
              את מנהלת קריירה, בית ומשפחה מורחבת כמו סופר-וומן. אבל בפנים,
              העומס השקוף והציפיות מוחצים אותך?
            </p>

            <div className="prose-rtl">
              <p>
                ברוכה הבאה לפודקאסט שלא יעשה לך הנחות, אבל יחזיר לך אוויר
                לריאות.
              </p>
              <p>
                אני סיון ארזי פוגירו, מנטורית למערכות יחסים וניהול החיים,
                וזה חדר הניתוח המנטלי שלך.
              </p>
              <p>
                בכל פרק נעשה עבודת עומק ונפרק דפוסים שעוצרים אותך. ננקה את
                "תסמונת הילדה הטובה", נלמד לשים גבולות (בלי להתנצל!), נשחרר
                רגשות אשם ונפסיק להיות סמנכ"לית התפעול של כולם.
              </p>
              <p className="!text-forest-900 font-bold !text-xl">
                כדי שתהיי המנכ"לית של החיים שלך! 👑
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Magnetic>
                <a
                  href={SITE.spotifyShowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Podcast className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
                  האזינו בספוטיפיי
                </a>
              </Magnetic>
              <Magnetic strength={0.18}>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <Instagram className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
                  אינסטגרם
                </a>
              </Magnetic>
            </div>

            {/* Community */}
            <div className="mt-10 bg-ember-50 rounded-[18px] p-7">
              <p className="text-ink font-semibold mb-5 leading-relaxed">
                👑 לעוד תכנים, הצטרפי למעגל הפנימי שלי, לקהילת "מעומס לדיוק":
              </p>
              <Magnetic>
                <a
                  href={SITE.sivanCommunityWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <MessageCircle className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
                  הצטרפו לקהילת הוואטסאפ
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
