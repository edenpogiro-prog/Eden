import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Check } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getServices, getServiceBySlug } from "@/lib/content";
import { whatsappLink, serviceMessage } from "@/lib/whatsapp";
import { serviceLd, faqLd, breadcrumbLd } from "@/lib/seo";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import ServiceIcon from "@/components/ServiceIcon";
import FAQAccordion from "@/components/FAQAccordion";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle ?? `${service.title} | המטרייה המשפחתית` },
    description: service.metaDescription ?? service.tagline,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: service.metaTitle ?? service.title,
      description: service.metaDescription ?? service.tagline,
      type: "article",
      locale: "he_IL",
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const { content: body } = await compileMDX({
    source: service.content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  const wa = whatsappLink({
    service: service.routingKey,
    message: serviceMessage(service.routingKey, service.title),
  });

  const jsonLd = serviceLd(service);
  const faq = faqLd(service.faqs ?? []);
  const crumbs = breadcrumbLd([
    { name: "בית", path: "/" },
    { name: "שירותים", path: "/services" },
    { name: service.title, path: `/services/${slug}` },
  ]);

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      {faq && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      )}

      {/* Hero — night band */}
      <section className="scene-night starfield horizon grain relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14">
          <nav className="flex items-center gap-1 text-white/60 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors duration-150">בית</Link>
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" strokeWidth={1.5} />
            <Link href="/services" className="hover:text-white transition-colors duration-150">שירותים</Link>
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" strokeWidth={1.5} />
            <span className="text-white font-semibold">{service.title}</span>
          </nav>
          <span className="w-16 h-16 rounded-[10px] border border-white/15 bg-white/[.06] flex items-center justify-center mb-6">
            <ServiceIcon name={service.icon} className="w-8 h-8 text-ember-300" />
          </span>
          <h1 className="text-4xl sm:text-5xl text-white mb-5 leading-[1.15]">
            {service.title}
          </h1>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl">
            {service.tagline}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        {/* For whom */}
        {service.forWhom && service.forWhom.length > 0 && (
          <section>
            <p className="eyebrow">למי זה מתאים</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {service.forWhom.map((item) => (
                <li key={item} className="flex items-start gap-2 text-ink">
                  <Check className="w-5 h-5 text-ember-600 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Body */}
        <section className="prose-rtl max-w-prose">{body}</section>

        {/* Outcomes */}
        {service.outcomes && service.outcomes.length > 0 && (
          <section className="bg-ember-50 rounded-[18px] p-8">
            <p className="eyebrow">מה תרוויחו</p>
            <ul className="space-y-3">
              {service.outcomes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-ink font-semibold">
                  <Check className="w-5 h-5 text-ember-600 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ */}
        {service.faqs && service.faqs.length > 0 && (
          <section>
            <p className="eyebrow">שאלות נפוצות</p>
            <h2 className="text-2xl sm:text-3xl text-ink mb-8 leading-tight">
              כל מה שרציתם לדעת על {service.title}
            </h2>
            <FAQAccordion faqs={service.faqs} />
          </section>
        )}

        {/* CTA */}
        <section className="scene-dusk aurora grain relative overflow-hidden rounded-[24px] p-10 sm:p-14 text-center">
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-4xl text-white mb-4 leading-tight">
              רוצים לשמוע עוד על {service.title}?
            </h2>
            <p className="text-white/70 mb-9 leading-relaxed max-w-lg mx-auto">
              שלחו לנו הודעה בוואטסאפ, נחזור אליכם עם כל מה שצריך לדעת, בלי
              התחייבות.
            </p>
            <div className="flex justify-center">
              <WhatsAppCTA href={wa} label="דברו איתנו בוואטסאפ" service={service.routingKey} />
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
