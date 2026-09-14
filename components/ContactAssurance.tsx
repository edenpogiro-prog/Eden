"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { PHONE_DISPLAY } from "@/lib/site";

// Sits directly under a WhatsApp CTA and does three jobs:
//
//   1. Sets a reply expectation, so "I'll message and nobody will answer"
//      stops being a reason to close the tab.
//   2. Gives desktop visitors a route that isn't wa.me. On a machine with no
//      linked WhatsApp Web session, a wa.me link lands on a QR-code screen and
//      the visit is simply lost.
//   3. Gives phone-first visitors — a real share of the 45+ audience — a
//      number to press instead of a chat to compose.
//
// Phone clicks are tracked in Plausible only, deliberately NOT reported as a
// Google Ads conversion: folding a dial into the same action as a WhatsApp tap
// would blur the one signal we use to judge lead quality.
interface Props {
  /** "light" for dark scene backgrounds, "dark" for the light page ground. */
  tone?: "light" | "dark";
  align?: "center" | "start";
  className?: string;
}

export default function ContactAssurance({
  tone = "dark",
  align = "center",
  className = "",
}: Props) {
  const muted = tone === "light" ? "text-white/60" : "text-mauve";
  const linkTone =
    tone === "light"
      ? "text-white/90 hover:text-white"
      : "text-ink hover:text-ember-600";
  const linkClass = `font-semibold underline underline-offset-4 decoration-1 transition-colors duration-150 ${linkTone}`;

  return (
    <div
      className={`text-sm ${muted} ${
        align === "center" ? "text-center" : "text-start"
      } ${className}`}
    >
      <p
        className={`flex items-center gap-1.5 ${
          align === "center" ? "justify-center" : "justify-start"
        }`}
      >
        <Clock className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
        בדרך כלל עונים תוך שעה
      </p>
      <p className="mt-1.5">
        או בטלפון{" "}
        <TrackedPhoneLink dir="ltr" location="assurance" className={linkClass}>
          {PHONE_DISPLAY}
        </TrackedPhoneLink>
        <span aria-hidden="true"> · </span>
        <Link href="/contact" className={linkClass}>
          השאירו פרטים
        </Link>
      </p>
    </div>
  );
}
