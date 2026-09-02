"use client";

import { AnchorHTMLAttributes, ReactNode } from "react";
import { track, trackContactConversion } from "@/lib/analytics";

// Wraps a raw <a> to a WhatsApp destination (wa.me DM link, or a
// chat.whatsapp.com community invite) with click tracking, for the few
// places that don't use the styled WhatsAppCTA button. Needed because
// Server Components can't attach onClick handlers directly.
interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  service?: string;
}

export default function TrackedWhatsAppLink({
  children,
  service,
  onClick,
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track("whatsapp_click", { service: service ?? "general" });
        trackContactConversion();
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
