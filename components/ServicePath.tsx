import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import ScrollReveal from "@/components/ScrollReveal";
import type { Service } from "@/lib/types";

// The road out of the night — services as stations along a glowing route.
// A champagne-to-ember line runs down the center; stations alternate sides.
export default function ServicePath({
  services,
  title,
}: {
  services: Service[];
  title: string;
}) {
  if (services.length === 0) return null;

  return (
    <section
      className="scene-journey grain relative py-24 sm:py-32"
      aria-labelledby="service-path-title"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-20">
          <h2
            id="service-path-title"
            className="text-4xl sm:text-6xl text-white leading-[1.1]"
          >
            {title}
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* The glowing route */}
          <span
            aria-hidden="true"
            className="absolute right-5 lg:right-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-champagne-400/0 via-champagne-400/60 to-ember-300 lg:translate-x-1/2"
          />

          <ol className="space-y-16 sm:space-y-24">
            {services.map((s, i) => {
              const left = i % 2 === 1;
              return (
                <li key={s.slug} className="relative">
                  {/* Station node */}
                  <span
                    aria-hidden="true"
                    className="absolute right-5 lg:right-1/2 top-2 w-4 h-4 -mr-2 lg:translate-x-1/2 lg:mr-0 rounded-full bg-champagne-400 shadow-[0_0_24px_rgba(227,185,120,.8)]"
                  />
                  <ScrollReveal
                    delay={80}
                    className={`pr-14 lg:pr-0 lg:w-[calc(50%-3.5rem)] ${
                      left ? "lg:mr-auto" : "lg:ml-auto"
                    }`}
                  >
                    <div className={left ? "lg:text-left" : ""}>
                      <div
                        className={`flex items-center gap-4 mb-5 ${
                          left ? "lg:flex-row-reverse" : ""
                        }`}
                      >
                        <span className="w-12 h-12 rounded-[12px] glass-warm !rounded-[12px] flex items-center justify-center flex-shrink-0 text-champagne-100">
                          <ServiceIcon name={s.icon} className="w-6 h-6" />
                        </span>
                        <span
                          className="font-display text-6xl leading-none text-champagne-metal select-none"
                          aria-hidden="true"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="font-display text-3xl sm:text-4xl text-white mb-3 leading-tight">
                        {s.title}
                      </h3>
                      <p className="text-champagne-100 text-lg font-medium mb-4">
                        {s.tagline}
                      </p>
                      {s.summary && (
                        <p className="text-white/70 leading-relaxed mb-6">
                          {s.summary}
                        </p>
                      )}
                      {s.outcomes && s.outcomes.length > 0 && (
                        <ul
                          className={`flex flex-wrap gap-2 mb-7 ${
                            left ? "lg:justify-start" : ""
                          }`}
                        >
                          {s.outcomes.slice(0, 3).map((o) => (
                            <li
                              key={o}
                              className="glass-warm !rounded-full px-4 py-1.5 text-sm text-white/90 !text-sm"
                            >
                              {o}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link
                        href={`/services/${s.slug}`}
                        className="btn-outline-light group/link"
                      >
                        לכל הפרטים
                        <ArrowLeft
                          className="w-4 h-4 transition-transform duration-200 group-hover/link:-translate-x-1"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </ScrollReveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
