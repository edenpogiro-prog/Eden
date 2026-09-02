"use client";

import { MessageCircle } from "lucide-react";
import { track, trackContactConversion } from "@/lib/analytics";

interface Props {
  href: string;
  label?: string;
  service?: string;
  variant?: "primary" | "ghost";
  className?: string;
}

export default function WhatsAppCTA({
  href,
  label = "דברו איתנו בוואטסאפ",
  service,
  variant = "primary",
  className = "",
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        track("whatsapp_click", { service: service ?? "general" });
        trackContactConversion();
      }}
      className={`${variant === "primary" ? "btn-primary" : "btn-outline"} plausible-event-name=whatsapp_click ${className}`}
    >
      <MessageCircle className="w-5 h-5" aria-hidden="true" />
      {label}
    </a>
  );
}
