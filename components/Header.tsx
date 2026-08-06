"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import WhatsAppCTA from "@/components/WhatsAppCTA";

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
            onClick={() => setOpen(true)}
            className="md:hidden p-2 text-white"
            aria-label="פתח תפריט"
          >
            <Menu className="w-7 h-7" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile drawer — inverted night panel, display-type links */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-abyss-950 md:hidden flex flex-col aurora">
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
