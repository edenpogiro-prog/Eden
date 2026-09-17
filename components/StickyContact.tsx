"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { track, trackContactConversion } from "@/lib/analytics";
import { whatsappLink } from "@/lib/whatsapp";
import { PHONE_TEL } from "@/lib/site";

// Mobile-only contact bar.
//
// Service pages carry their closing CTA at the very bottom, so a visitor who
// arrives from an ad and doesn't scroll the whole page never sees a way to get
// in touch — which is most of them. This keeps one always within reach.
//
// Visually it is the Header's twin: same abyss glass, same blur, same hairline,
// mirrored to the bottom edge, so it reads as part of the frame rather than as
// a banner stuck on top of the page.
export default function StickyContact() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const nearFoot =
        y + window.innerHeight > document.documentElement.scrollHeight - 620;
      // Past the hero, but stand down near the footer where the full contact
      // block already is — two CTAs on one screen is noise, not emphasis.
      setShow(y > 320 && !nearFoot);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Stand down while someone is typing into a form field: on a phone the bar
  // would otherwise sit on top of the field or its submit button, and the
  // keyboard already takes half the screen.
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const isField = (t: EventTarget | null) =>
      t instanceof HTMLElement && t.matches("input:not([type=checkbox]):not([type=hidden]), textarea, select");
    const onIn = (e: FocusEvent) => { if (isField(e.target)) setTyping(true); };
    const onOut = (e: FocusEvent) => { if (isField(e.target)) setTyping(false); };
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);
  const visible = show && !typing;

  // Lets the floating accessibility and scroll-to-top buttons lift clear of the
  // bar instead of sitting under it (see .fab-float in globals.css).
  useEffect(() => {
    const el = document.documentElement;
    if (visible) el.setAttribute("data-contact-bar", "true");
    else el.removeAttribute("data-contact-bar");
    return () => el.removeAttribute("data-contact-bar");
  }, [visible]);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="bg-abyss-950/85 backdrop-blur-xl border-t border-champagne-400/25 shadow-[0_-12px_40px_-24px_rgba(15,10,22,.9)]">
        <div className="px-4 pt-2.5 pb-[max(0.7rem,env(safe-area-inset-bottom))]">
          <p className="text-center text-[11px] leading-none text-champagne-100/75 mb-2.5">
            שלחו הודעה, נחזור אליכם תוך יום עסקים
          </p>
          <div className="flex items-stretch gap-2.5">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={visible ? 0 : -1}
              onClick={() => {
                track("whatsapp_click", { service: "general", location: "sticky-bar" });
                trackContactConversion();
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-[12px] text-white font-bold text-base py-3 bg-[linear-gradient(135deg,var(--ember-550),var(--ember-600))] active:brightness-110 transition-[filter] duration-150"
            >
              <MessageCircle className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
              דברו איתנו בוואטסאפ
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              tabIndex={visible ? 0 : -1}
              onClick={() => track("phone_click", { location: "sticky-bar" })}
              aria-label="התקשרו אלינו"
              className="w-[52px] inline-flex items-center justify-center rounded-[12px] border border-white/25 text-white hover:border-champagne-400 active:bg-white/10 transition-colors duration-150"
            >
              <Phone className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
