"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import WhatsAppCTA from "@/components/WhatsAppCTA";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function LogoMark() {
  return (
    <span className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
      <Image
        src="/images/logo-black.jpg"
        alt=""
        fill
        sizes="36px"
        className="object-cover"
      />
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const wa = whatsappLink();
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();

    const mainEl = document.getElementById("main-content");
    const footerEl = document.querySelector("footer");
    const headerEl = document.querySelector("header");
    [mainEl, footerEl, headerEl].forEach((el) => el?.setAttribute("inert", ""));

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      [mainEl, footerEl, headerEl].forEach((el) => el?.removeAttribute("inert"));
      document.body.style.overflow = prevOverflow;
      (previouslyFocused ?? toggleBtnRef.current)?.focus();
    };
  }, [open]);

  return (
    <>
      {/* Night-glass header — carries the journey mood on every page */}
      <header className="sticky top-0 z-50 bg-abyss-950/75 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo (right in RTL) */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <LogoMark />
            <span className="font-display text-white leading-none text-lg">
              {SITE.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/65 hover:text-champagne-100 font-medium transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block flex-shrink-0">
            <WhatsAppCTA href={wa} label="דברו איתנו" className="!px-5 !py-2" />
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            ref={toggleBtnRef}
            onClick={() => setOpen(true)}
            className="md:hidden p-2 text-white"
            aria-label="פתח תפריט"
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            <Menu className="w-7 h-7" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile drawer — inverted night panel, display-type links */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="תפריט ניווט"
          className="fixed inset-0 z-[60] bg-abyss-950 md:hidden flex flex-col aurora"
        >
          <div className="relative h-16 px-4 flex items-center justify-between border-b border-white/10">
            <span className="flex items-center gap-2.5">
              <LogoMark />
              <span className="font-display text-white text-lg">{SITE.name}</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-2 text-white"
              aria-label="סגור תפריט"
            >
              <X className="w-7 h-7" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="relative flex flex-col p-6 gap-1">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 font-display text-2xl text-white py-4 border-b border-white/10"
              >
                <span className="text-ember-300 text-sm" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            ))}
            <div className="mt-8">
              <WhatsAppCTA href={wa} label="דברו איתנו בוואטסאפ" className="w-full" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
