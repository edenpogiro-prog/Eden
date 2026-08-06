import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { getServices } from "@/lib/content";
import ServiceIcon from "@/components/ServiceIcon";
import ScrollReveal from "@/components/ScrollReveal";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { whatsappLink, serviceMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "השירותים שלנו",
  description:
    "ליווי זוגי, הדרכת הורים, ייעוץ כלכלי למשפחה והבלופרינט, כל מה שהמשפחה צריכה תחת קורת גג אחת.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      {/* Page intro — night band */}
      <header className="scene-night starfield horizon grain relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-14">
          <p className="eyebrow eyebrow-light">שירותים</p>
          <h1 className="text-4xl sm:text-6xl text-white mb-5 leading-[1.15] max-w-2xl">
            כל המשפחה. תחת מטרייה אחת.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-xl">
            בחרו את התחום שמדבר אליכם, או פשוט דברו איתנו ונעזור לכם למצוא את
            נקודת ההתחלה הנכונה.
          </p>

          {/* Quick-jump index */}
          <nav
            aria-label="קפיצה מהירה לשירות"
            className="mt-10 pt-6 border-t border-white/10 flex flex-wrap gap-x-8 gap-y-3"
          >
            {services.map((s, i) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="group inline-flex items-baseline gap-2.5 text-white/70 hover:text-white font-medium transition-colors duration-150"
              >
                <span className="font-display text-ember-300 text-sm" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Expanded service sections */}
        <div className="space-y-8 sm:space-y-10">
          {services.map((s, i) => {
            const wa = whatsappLink({
              service: s.routingKey,
              message: serviceMessage(s.routingKey, s.title),
            });
            const flipped = i % 2 === 1;
            return (
              <section key={s.slug} id={s.slug} className="scroll-mt-24">
                <ScrollReveal>
                  <div className="card overflow-hidden">
                    <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 p-8 sm:p-12">
                      {/* Intro side */}
                      <div className={flipped ? "lg:order-2" : ""}>
                        <div className="flex items-center gap-4 mb-6">
                          <span className="w-14 h-14 rounded-[10px] border border-line bg-veil flex items-center justify-center flex-shrink-0">
                            <ServiceIcon
                              name={s.icon}
                              className="w-7 h-7 text-ember-600"
                            />
                          </span>
                          <span
                            className="font-display text-5xl text-ember-100 select-none leading-none"
                            aria-hidden="true"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl text-ink mb-3 leading-tight">
                          {s.title}
                        </h2>
                        <p className="text-lg font-semibold text-ember-700 mb-4 leading-relaxed">
                          {s.tagline}
                        </p>
                        {s.summary && (
                          <p className="text-mauve leading-relaxed mb-8">
                            {s.summary}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-3">
                          <Link href={`/services/${s.slug}`} className="btn-primary">
                            לכל הפרטים
                            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
                          </Link>
                          <WhatsAppCTA
                            href={wa}
                            label="שאלו אותנו בוואטסאפ"
                            service={s.routingKey}
                            variant="ghost"
                          />
                        </div>
                      </div>

                      {/* Details side */}
                      <div className={`space-y-5 ${flipped ? "lg:order-1" : ""}`}>
                        {s.forWhom && s.forWhom.length > 0 && (
                          <div className="bg-veil rounded-[14px] p-6">
                            <p className="eyebrow">למי זה מתאים</p>
                            <ul className="space-y-2.5">
                              {s.forWhom.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-ink"
                                >
                                  <Check
                                    className="w-5 h-5 text-ember-600 flex-shrink-0 mt-1"
                                    strokeWidth={1.5}
                                    aria-hidden="true"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {s.outcomes && s.outcomes.length > 0 && (
                          <div className="bg-ember-50 rounded-[14px] p-6">
                            <p className="eyebrow">מה תרוויחו</p>
                            <ul className="space-y-2.5">
                              {s.outcomes.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-ink font-semibold"
                                >
                                  <Check
                                    className="w-5 h-5 text-ember-600 flex-shrink-0 mt-1"
                                    strokeWidth={1.5}
                                    aria-hidden="true"
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </section>
            );
          })}
        </div>

        {/* Closing CTA */}
        <ScrollReveal>
          <div className="scene-dusk aurora grain relative overflow-hidden rounded-[24px] p-10 sm:p-14 text-center mt-16">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-4xl text-white mb-4 leading-tight">
                לא בטוחים מאיפה להתחיל?
              </h2>
              <p className="text-white/70 mb-9 leading-relaxed max-w-lg mx-auto">
                שלחו לנו הודעה, נבין יחד מה מתאים לכם, בלי התחייבות ובלי לחץ.
              </p>
              <div className="flex justify-center">
                <WhatsAppCTA href={whatsappLink()} label="דברו איתנו בוואטסאפ" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
