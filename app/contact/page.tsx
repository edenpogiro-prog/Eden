import type { Metadata } from "next";
import { Instagram, Phone, Mail, MessageCircle, Podcast } from "lucide-react";
import { COACHES, SITE } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "צור קשר",
  description:
    "דברו איתנו בוואטסאפ, בטלפון או במייל, או השאירו פנייה ונחזור אליכם.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <header className="scene-night starfield horizon grain relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
          <p className="eyebrow eyebrow-light">צור קשר</p>
          <h1 className="text-4xl sm:text-6xl text-white mb-5 leading-[1.15]">
            בואו נדבר
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-xl">
            הכי פשוט, הודעת וואטסאפ. אבל אפשר גם למלא את הטופס ונחזור אליכם.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Direct channels */}
        <div className="space-y-4">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-ember-600 hover:bg-ember-700 text-white rounded-[14px] p-5 transition-colors duration-200"
          >
            <MessageCircle className="w-7 h-7 flex-shrink-0" strokeWidth={1.5} />
            <div>
              <p className="font-bold">וואטסאפ</p>
              <p className="text-white/80 text-sm">הדרך המהירה ביותר להתחיל</p>
            </div>
          </a>

          {Object.values(COACHES).map((c) => (
            <div key={c.slug} className="card p-5">
              <p className="font-bold text-ink mb-1">{c.name}</p>
              <p className="text-mauve text-sm mb-4">{c.role}</p>
              <div className="flex flex-col gap-2 text-mauve">
                <a
                  href={`https://wa.me/${c.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-ember-600 transition-colors duration-150"
                >
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                  <span dir="ltr">
                    {c.whatsapp.replace("972", "0").replace(/(\d{3})(\d{7})/, "$1-$2")}
                  </span>
                </a>
                <a
                  href={`mailto:${c.email}`}
                  className="flex items-center gap-2 hover:text-ember-600 transition-colors duration-150"
                >
                  <Mail className="w-4 h-4" strokeWidth={1.5} />
                  {c.email}
                </a>
                {c.slug === "sivan" && (
                  <>
                    <a
                      href={SITE.spotifyShowUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-ember-600 transition-colors duration-150"
                    >
                      <Podcast className="w-4 h-4" strokeWidth={1.5} />
                      הפודקאסט של סיון בספוטיפיי
                    </a>
                    <a
                      href={SITE.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-ember-600 transition-colors duration-150"
                    >
                      <Instagram className="w-4 h-4" strokeWidth={1.5} />
                      אינסטגרם
                    </a>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-veil rounded-[18px] p-6 sm:p-8">
          <h2 className="text-2xl text-ink mb-6">השאירו פנייה ונחזור אליכם</h2>
          <ContactForm />
        </div>
      </div>
      </div>
    </>
  );
}
