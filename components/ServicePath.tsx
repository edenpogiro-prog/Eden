"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import ServiceIcon from "@/components/ServiceIcon";
import ScrollReveal from "@/components/ScrollReveal";
import type { Service } from "@/lib/types";

// Real photography per service, matched to the site's own night/ember/
// champagne palette rather than invented colors — a list to browse, and
// a single stage panel that updates in place, so nothing scrolls away.
const SERVICE_PHOTOS: Record<string, string> = {
  couples: "/images/services/couples.jpg",
  parenting: "/images/services/parenting.jpg",
  finance: "/images/services/finance.jpg",
  blueprint: "/images/services/blueprint.jpg",
  "combo-family": "/images/services/combo-family.jpg",
  "combo-couples": "/images/services/combo-couples.jpg",
  "digital-courses": "/images/services/digital-courses.jpg",
  "personal-development": "/images/services/personal-development.jpg",
  workshops: "/images/services/workshops.jpg",
  "future-leaders": "/images/services/future-leaders.jpg",
};

export default function ServicePath({
  services,
  title,
}: {
  services: Service[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  if (services.length === 0) return null;
  const active = services[activeIndex];
  const activePhoto = SERVICE_PHOTOS[active.slug];

  function selectService(i: number) {
    setActiveIndex(i);
    // Align the top of the photo to the top of the screen every time a
    // service is picked, so the result always starts from the same place.
    stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      className="scene-journey grain relative py-14 sm:py-20"
      aria-labelledby="service-path-title"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-14 sm:mb-16">
          <h2
            id="service-path-title"
            className="text-4xl sm:text-6xl text-white leading-[1.1] mb-4"
          >
            {title}
          </h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            כל השירותים שלנו. תבחרו אחד מהרשימה, והפרטים יופיעו כאן למטה.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="grid lg:grid-cols-[minmax(0,300px)_1fr] gap-5 lg:gap-6 items-start">
            {/* Index */}
            <div className="rounded-[20px] glass-warm !rounded-[20px] divide-y divide-white/10 overflow-hidden">
              {services.map((s, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => selectService(i)}
                    aria-pressed={isActive}
                    className={`w-full flex items-center gap-3 px-5 py-4 text-right transition-colors duration-150 ${
                      isActive ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`w-1 self-stretch -my-4 rounded-full flex-shrink-0 transition-colors duration-150 ${
                        isActive ? "bg-champagne-400" : "bg-transparent"
                      }`}
                    />
                    <span
                      className={`w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
                        isActive
                          ? "bg-champagne-400 text-abyss-950"
                          : "glass-warm !rounded-[9px] text-champagne-100"
                      }`}
                    >
                      <ServiceIcon name={s.icon} className="w-[18px] h-[18px]" />
                    </span>
                    <span
                      className={`flex-1 font-display leading-tight ${
                        isActive ? "text-white text-lg" : "text-white/65 text-base"
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Stage */}
            <div
              ref={stageRef}
              className="rounded-[20px] overflow-hidden glass-warm !rounded-[20px] scroll-mt-24"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  key={active.slug}
                  src={activePhoto}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 700px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss-950/90 via-abyss-950/15 to-transparent" />
                <div className="absolute bottom-5 right-6 left-6">
                  <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight [text-shadow:0_2px_12px_rgba(0,0,0,.5)]">
                    {active.title}
                  </h3>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-champagne-100 font-semibold text-lg mb-3">
                  {active.tagline}
                </p>
                {active.summary && (
                  <p className="text-white/70 leading-relaxed mb-6">{active.summary}</p>
                )}
                {active.outcomes && active.outcomes.length > 0 && (
                  <ul className="flex flex-wrap gap-2 mb-7">
                    {active.outcomes.slice(0, 4).map((o) => (
                      <li
                        key={o}
                        className="glass-warm !rounded-full px-3.5 py-1.5 text-sm text-white/90 !text-sm"
                      >
                        {o}
                      </li>
                    ))}
                  </ul>
                )}
                <Link href={`/services/${active.slug}`} className="btn-primary">
                  לכל הפרטים
                  <ArrowLeft className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
