"use client";

import { AnchorHTMLAttributes, ReactNode } from "react";
import { track } from "@/lib/analytics";
import { PHONE_TEL } from "@/lib/site";

// A tel: link to the one site number, with click tracking. Server Components
// can't attach onClick, hence the wrapper.
//
// Tracked in Plausible only — deliberately NOT reported as a Google Ads
// conversion. The Ads "Contact" action currently counts WhatsApp button
// presses, and only a fraction of those become real messages; folding dials
// into the same number would make that ratio impossible to read.
interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  children: ReactNode;
  /** Where on the site the link sits, so Plausible can tell them apart. */
  location?: string;
}

export default function TrackedPhoneLink({
  children,
  location,
  onClick,
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      href={`tel:${PHONE_TEL}`}
      onClick={(e) => {
        track("phone_click", { location: location ?? "unknown" });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
