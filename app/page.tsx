import Link from "next/link";
import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { getPage, getServices, getTestimonials, getTeam } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import ServicePath from "@/components/ServicePath";
import TestimonialCard from "@/components/TestimonialCard";
import FAQAccordion from "@/components/FAQAccordion";
import ScrollReveal from "@/components/ScrollReveal";
import Spotlight from "@/components/Spotlight";
import Parallax from "@/components/Parallax";
import Magnetic from "@/components/Magnetic";
import Tilt from "@/components/Tilt";
import DragScroll from "@/components/DragScroll";
import type { FAQ } from "@/lib/types";

// One continuous story: the page descends into night and climbs to sunrise.
// Scene backgrounds chain into each other — no visible section borders.
export default async function HomePage() {
  const home = getPage("home");
  const services = getServices();
  const testimonials = getTestimonials();
  const team = getTeam();
  const fm = (home?.data ?? {}) as Record<string, string>;
  const faqs = (home?.data?.faqs as FAQ[]) ?? [];

  const { content: whyBody } = home
    ? await compileMDX({
        source: home.content,
        options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
      })
    : { content: null };

  const wa = whatsappLink();
  const headline = fm.heroHeadline ?? "מכיבוי שריפות, לסיסטם שמנהל את החיים";
  const headlineWords = headline.split(" ");

  return (
    <>
      {/* ═══ 00:00 — לילה. Full-viewport night sky. ═══ */}
      <section className="scene-night starfield horizon grain relative overflow-hidden">
        {/* Shooting stars + embers rising from the horizon fire */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <span className="meteor" style={{ top: "12%", right: "18%" }} />
          <span
            className="meteor"
            style={{ top: "6%", right: "55%", animationDelay: "6.5s" }}
          />
          <span className="ember-p" style={{ right: "22%", bottom: "6%" }} />
          <span
            className="ember-p"
            style={{ right: "38%", bottom: "4%", animationDelay: "3s", animationDuration: "13s" }}
          />
          <span
            className="ember-p"
            style={{ right: "61%", bottom: "7%", animationDelay: "6s" }}
          />
          <span
            className="ember-p"
            style={{ right: "78%", bottom: "3%", animationDelay: "9s", animationDuration: "14s" }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[94svh] flex flex-col items-center justify-center text-center py-24">
          <h1 className="text-[2.75rem] sm:text-7xl lg:text-[5.5rem] text-white leading-[1.08] mb-8">
            {headlineWords.map((w, i) => (
              // NBSP inside the inline-block span — a plain trailing space
              // would be collapsed and the words would run together.
              <span
                key={i}
                className="hero-word"
                style={{ animationDelay: `${200 + i * 90}ms` }}
              >
                {i < headlineWords.length - 1 ? `${w} ` : w}
              </span>
            ))}
          </h1>
          <p
            className="text-lg sm:text-2xl text-white/70 leading-relaxed mb-11 max-w-2xl hero-word"
            style={{ animationDelay: `${300 + headlineWords.length * 90}ms` }}
          >
            {fm.heroSubhead?.split("\n").map((line, i, all) => (
              <span key={i}>
                {line}
                {i < all.length - 1 && <br />}
              </span>
            ))}
          </p>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 hero-word"
            style={{ animationDelay: `${420 + headlineWords.length * 90}ms` }}
          >
            <Magnetic>
              <WhatsAppCTA href={wa} label="דברו איתנו בוואטסאפ" />
            </Magnetic>
            <Magnetic strength={0.18}>
              <Link href="/services" className="btn-outline-light">
                לשירותים שלנו
                <ArrowLeft className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </Magnetic>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-7 inset-x-0 flex justify-center"
        >
          <span className="scroll-cue" />
        </div>
      </section>

      {/* ═══ 02:00 — דמדומים. The reason it never worked alone. ═══ */}
      {home && (
        <section className="scene-dusk grain relative overflow-hidden">
          <span
            aria-hidden="true"
            className="absolute -top-10 left-4 font-display text-[14rem] sm:text-[22rem] leading-none text-outline-light opacity-40 select-none pointer-events-none"
          >
            ?
          </span>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-36">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-24 items-start">
              <ScrollReveal className="lg:sticky lg:top-28">
                <p className="eyebrow eyebrow-light">
                  {fm.whyTitle ?? "למה עד היום לא הצלחתם לבד?"}
                </p>
                <h2 className="text-4xl sm:text-6xl text-white leading-[1.1]">
                  {fm.rootCauseTitle ?? "הסיבה האמיתית"}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={120}>
                <div className="prose-invert-warm text-xl">{whyBody}</div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* ═══ 04:00 — הדרך. Stations climbing toward first light. ═══ */}
      <ServicePath
        services={services}
        title={fm.servicesTitle ?? "איך נוכל לעזור לכם?"}
      />

      {/* ═══ 05:30 — אור ראשון. Voices from the road, on film. ═══ */}
      {testimonials.length > 0 && (
        <section className="scene-copper grain relative overflow-hidden py-24 sm:py-32">
          <div className="relative z-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
                <div>
                  <p className="eyebrow !text-white/90 before:!bg-white/90">
                    המלצות
                  </p>
                  <h2 className="text-4xl sm:text-6xl text-white leading-[1.1]">
                    {fm.proofTitle ?? "משפחות מספרות"}
                  </h2>
                </div>
              </ScrollReveal>
            </div>
            {/* Filmstrip — horizontal snap scroll, bleeding off-screen, drag with mouse or touch */}
            <DragScroll className="overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-5 px-4 sm:px-6 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))] pb-4 w-max">
                {testimonials.map((t) => (
                  <div
                    key={t.slug}
                    className="snap-start w-[320px] sm:w-[380px] flex-shrink-0"
                  >
                    <Tilt className="h-full">
                      <Spotlight className="rounded-[18px] h-full">
                        <TestimonialCard testimonial={t} variant="dark" />
                      </Spotlight>
                    </Tilt>
                  </div>
                ))}
              </div>
            </DragScroll>
          </div>
        </section>
      )}

      {/* ═══ 06:00 — שחר. The people waiting on the other side. ═══ */}
      {team.length > 0 && (
        <section className="scene-dawn relative overflow-hidden py-24 sm:py-32">
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-14">
              <p className="eyebrow !text-white before:!bg-white justify-center">
                הצוות
              </p>
              <h2 className="text-4xl sm:text-6xl text-white leading-[1.1] [text-shadow:0_2px_24px_rgba(140,58,49,.35)]">
                {fm.coachesTitle ?? "מי אנחנו"}
              </h2>
            </ScrollReveal>
            <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
              {team.map((m, i) => (
                <ScrollReveal
                  key={m.slug}
                  delay={i * 110}
                  className={i % 2 === 1 ? "sm:translate-y-10" : ""}
                >
                  <Tilt max={4}>
                  <Link
                    href={`/team/${m.slug}`}
                    className="group relative block overflow-hidden rounded-[24px] shadow-pop"
                  >
                    {m.photo ? (
                      <span className="relative block aspect-[4/5]">
                        <Image
                          src={m.photo}
                          alt={m.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 460px"
                          className="object-cover sepia-[.25] group-hover:sepia-0 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                        />
                      </span>
                    ) : (
                      <span className="block aspect-[4/5] bg-abyss-800" />
                    )}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-abyss-950/90 via-abyss-950/20 to-transparent"
                    />
                    <span className="absolute bottom-0 right-0 left-0 p-6 flex items-end justify-between gap-4">
                      <span>
                        <span className="block font-display text-2xl sm:text-3xl text-white mb-1">
                          {m.name}
                        </span>
                        <span className="block text-white/75 text-sm">
                          {m.role}
                        </span>
                        {m.tagline && (
                          <span className="block text-champagne-400 text-sm font-medium mt-1.5">
                            {m.tagline}
                          </span>
                        )}
                      </span>
                      <span className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-champagne-400 group-hover:border-champagne-400">
                        <ArrowLeft
                          className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-abyss-950"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  </Link>
                  </Tilt>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ 07:00 — בוקר. Questions, in full daylight. ═══ */}
      {faqs.length > 0 && (
        <section className="scene-day py-24 sm:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="max-w-prose mx-auto">
              <p className="eyebrow">שאלות נפוצות</p>
              <h2 className="text-3xl sm:text-5xl text-ink leading-tight mb-10">
                {fm.faqTitle ?? "שאלות נפוצות"}
              </h2>
            </ScrollReveal>
            <FAQAccordion faqs={faqs} />
          </div>
        </section>
      )}

      {/* ═══ 08:00 — זריחה. The sun rises behind the first step. ═══ */}
      <section className="relative overflow-hidden bg-parchment">
        {/* The sun */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-16 flex justify-center pointer-events-none"
        >
          <Parallax speed={0.1}>
            <div
              className="w-[380px] h-[380px] sm:w-[540px] sm:h-[540px] rounded-full opacity-90"
              style={{
                background:
                  "radial-gradient(circle, #F7E8CF 0%, #E3B978 35%, #F26648 72%, rgba(242,102,72,0) 74%)",
                filter: "blur(2px)",
              }}
            />
          </Parallax>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 min-h-[80svh] flex flex-col items-center justify-center text-center py-28">
          <ScrollReveal>
            <p className="eyebrow justify-center">בוקר חדש</p>
            <h2 className="text-4xl sm:text-7xl text-ink leading-[1.08] mb-7">
              מוכנים לבנות את
              <br />
              <span className="text-fire">המערכת שלכם?</span>
            </h2>
            <p className="text-mauve text-lg sm:text-xl mb-11 leading-relaxed max-w-lg mx-auto">
              שיחה קצרה, בלי התחייבות. נבין מה מטריד אתכם ונראה יחד איך אפשר
              לעזור.
            </p>
            <div className="flex justify-center">
              <Magnetic>
                <WhatsAppCTA href={wa} label="דברו איתנו בוואטסאפ" />
              </Magnetic>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
