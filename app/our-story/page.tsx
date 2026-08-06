import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { getPage, getTeam } from "@/lib/content";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import ScrollReveal from "@/components/ScrollReveal";
import Tilt from "@/components/Tilt";
import { whatsappLink } from "@/lib/whatsapp";

export async function generateMetadata(): Promise<Metadata> {
  const page = getPage("our-story");
  return {
    title: page?.metaTitle ? { absolute: page.metaTitle } : "הסיפור שלנו",
    description:
      page?.metaDescription ??
      "הסיפור של המטרייה המשפחתית, למה הקמנו אותה ובמה אנחנו מאמינים.",
    alternates: { canonical: "/our-story" },
  };
}

export default async function OurStoryPage() {
  const page = getPage("our-story");
  const team = getTeam();
  const { content } = page
    ? await compileMDX({
        source: page.content,
        options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
      })
    : { content: null };

  return (
    <div>
      <header className="scene-night starfield horizon grain relative overflow-hidden">
        <div className="relative z-10 max-w-prose mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
          <p className="eyebrow eyebrow-light">הסיפור שלנו</p>
          <h1 className="text-4xl sm:text-6xl text-white leading-[1.15]">
            כל המשפחה. תחת מטרייה אחת.
          </h1>
        </div>
      </header>
      <article className="max-w-prose mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="prose-rtl">{content}</div>
        <div className="mt-12">
          <WhatsAppCTA href={whatsappLink()} label="דברו איתנו בוואטסאפ" />
        </div>
      </article>

      {/* מי אנחנו — same treatment as the homepage team section */}
      {team.length > 0 && (
        <section className="scene-dawn relative overflow-hidden py-24 sm:py-32">
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-14">
              <p className="eyebrow !text-white before:!bg-white justify-center">
                הצוות
              </p>
              <h2 className="text-4xl sm:text-6xl text-white leading-[1.1] [text-shadow:0_2px_24px_rgba(140,58,49,.35)]">
                מי אנחנו
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
    </div>
  );
}
