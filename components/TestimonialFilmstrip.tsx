"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DragScroll from "@/components/DragScroll";
import ScrollReveal from "@/components/ScrollReveal";
import Tilt from "@/components/Tilt";
import Spotlight from "@/components/Spotlight";
import TestimonialCard from "@/components/TestimonialCard";
import type { Testimonial } from "@/lib/types";

// A left/right pair of round buttons next to the heading that drive the
// filmstrip directly — dragging or swiping still works, but the buttons make
// "there's more here" obvious and give a reliable way to see every review,
// not just whichever ones happen to fit on screen first.
export default function TestimonialFilmstrip({
  testimonials,
  title,
}: {
  testimonials: Testimonial[];
  title: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    function updateEdges() {
      if (!el) return;
      // RTL-safe: measure actual scroll bounds rather than assume a sign
      // convention for scrollLeft, which has historically differed by browser.
      const max = el.scrollWidth - el.clientWidth;
      const pos = Math.abs(el.scrollLeft);
      setAtStart(pos <= 4);
      setAtEnd(max <= 4 || pos >= max - 4);
    }

    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  function scrollByCard(direction: "forward" | "back") {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(":scope > div > *")?.offsetWidth ?? 340;
    const amount = cardWidth + 20; // card width + gap
    // Forward = reveal later cards. In RTL that's toward more negative
    // scrollLeft in modern browsers, so the sign flips relative to an LTR row.
    const sign = direction === "forward" ? -1 : 1;
    el.scrollBy({ left: sign * amount, behavior: "smooth" });
  }

  const arrowClass =
    "w-11 h-11 rounded-full glass-warm !rounded-full flex items-center justify-center text-white transition-all duration-200 hover:border-champagne-400/70 disabled:opacity-30 disabled:pointer-events-none";

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow !text-white/90 before:!bg-white/90">המלצות</p>
            <h2 className="text-4xl sm:text-6xl text-white leading-[1.1]">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard("back")}
              disabled={atStart}
              aria-label="ההמלצה הקודמת"
              className={arrowClass}
            >
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("forward")}
              disabled={atEnd}
              aria-label="ההמלצה הבאה"
              className={arrowClass}
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Filmstrip — horizontal snap scroll, bleeding off-screen, drag with mouse or touch */}
      <DragScroll
        ref={scrollerRef}
        className="overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-5 px-4 sm:px-6 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))] pb-4 w-max">
          {testimonials.map((t) => (
            <div key={t.slug} className="snap-start w-[320px] sm:w-[380px] flex-shrink-0">
              <Tilt className="h-full">
                <Spotlight className="rounded-[18px] h-full">
                  <TestimonialCard testimonial={t} variant="dark" />
                </Spotlight>
              </Tilt>
            </div>
          ))}
        </div>
      </DragScroll>
    </>
  );
}
