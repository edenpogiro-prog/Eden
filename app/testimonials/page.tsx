import type { Metadata } from "next";
import { getTestimonials } from "@/lib/content";
import TestimonialCard from "@/components/TestimonialCard";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "המלצות",
  description:
    "משפחות מספרות על הליווי בהמטרייה המשפחתית, זוגיות, הורות וכלכלה.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  const testimonials = getTestimonials();
  return (
    <>
      <header className="scene-night starfield horizon grain relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
          <p className="eyebrow eyebrow-light">המלצות</p>
          <h1 className="text-4xl sm:text-6xl text-white mb-5 leading-[1.15]">
            משפחות מספרות
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-xl">
            מילים של משפחות שבחרו לבנות מערכת, ולא להמשיך לכבות שריפות.
          </p>
        </div>
      </header>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">

      {testimonials.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.slug} testimonial={t} />
          ))}
        </div>
      ) : (
        <p className="text-center text-mauve">המלצות יתווספו בקרוב.</p>
      )}

      <div className="text-center mt-14">
        <WhatsAppCTA href={whatsappLink()} label="רוצים להיות הסיפור הבא? דברו איתנו" />
      </div>
    </div>
    </>
  );
}
