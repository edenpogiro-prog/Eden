"use client";

import Link from "next/link";
import { Compass, Mail, MessageCircle, Phone } from "lucide-react";
import Tilt from "@/components/Tilt";
import Spotlight from "@/components/Spotlight";
import { track, trackContactConversion } from "@/lib/analytics";
import { whatsappLink, serviceMessage } from "@/lib/whatsapp";
import { PHONE_TEL } from "@/lib/site";

// The one CTA cluster used everywhere on the site: WhatsApp / call / services /
// leave an inquiry, so every closing CTA looks and behaves the same no matter
// which page it's on. The tiles share a shape but not a weight — WhatsApp
// carries the ember fill and the rest stay quiet, because four equal options
// ask the visitor to deliberate where one clear lead asks them to act.
interface Props {
  /** "light" tiles for dark scene backgrounds, "dark" tiles for the light page ground. */
  tone?: "light" | "dark";
  /** routingKey + title, for a personalized WhatsApp opener. Omit for the generic message. */
  service?: string;
  serviceTitle?: string;
  /** Full override for the WhatsApp opener text, e.g. a per-coach message. Wins over service/serviceTitle. */
  waMessage?: string;
  /** Hide the "services" tile — used on the services listing page itself, where it's circular. */
  hideServicesLink?: boolean;
  className?: string;
}

export default function ContactActions({
  tone = "dark",
  service,
  serviceTitle,
  waMessage,
  hideServicesLink = false,
  className = "",
}: Props) {
  const light = tone === "light";
  const message =
    waMessage ?? (service && serviceTitle ? serviceMessage(service, serviceTitle) : undefined);
  const wa = whatsappLink(message ? { service, message } : undefined);

  const tileClass = light
    ? "glass-warm !rounded-[16px] hover:border-champagne-400/70"
    : "bg-white border border-line rounded-[16px] hover:border-ember-400";
  const iconClass = light
    ? "bg-white/15 text-champagne-100"
    : "bg-ember-50 text-ember-600";
  const labelClass = light ? "text-white" : "text-ink";

  const tileBase = `group relative flex flex-col items-center justify-center gap-2.5 h-full min-h-[112px] sm:min-h-[128px] p-4 text-center transition-colors duration-200 ${tileClass}`;
  // The WhatsApp tile carries the brand's ember fill so the eye lands on it
  // first. Four identically-weighted tiles read as a menu to deliberate over;
  // one clear lead and three quiet alternatives read as a next step.
  const primaryTile = `group relative flex flex-col items-center justify-center gap-2.5 h-full min-h-[112px] sm:min-h-[128px] p-4 text-center rounded-[16px] text-white bg-[linear-gradient(135deg,var(--ember-550),var(--ember-600))] hover:brightness-[1.06] transition-[filter] duration-200`;
  const iconBase = `w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0 ${iconClass}`;
  const labelBase = `font-display text-sm sm:text-base leading-tight ${labelClass}`;

  function TileFrame({ children }: { children: React.ReactNode }) {
    return (
      <Tilt max={6} className="h-full">
        <Spotlight className="rounded-[16px] h-full">{children}</Spotlight>
      </Tilt>
    );
  }

  function ActionTile({
    href,
    external,
    onClick,
    icon,
    label,
    primary = false,
  }: {
    href: string;
    external?: boolean;
    onClick?: () => void;
    icon: React.ReactNode;
    label: string;
    primary?: boolean;
  }) {
    return (
      <TileFrame>
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          onClick={onClick}
          className={primary ? primaryTile : tileBase}
        >
          <span
            className={
              primary
                ? "w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0 bg-white/20 text-white"
                : iconBase
            }
          >
            {icon}
          </span>
          <span
            className={
              primary
                ? "font-display text-sm sm:text-base leading-tight text-white"
                : labelBase
            }
          >
            {label}
          </span>
        </a>
      </TileFrame>
    );
  }

  function LinkTile({
    href,
    icon,
    label,
  }: {
    href: string;
    icon: React.ReactNode;
    label: string;
  }) {
    return (
      <TileFrame>
        <Link href={href} className={tileBase}>
          <span className={iconBase}>{icon}</span>
          <span className={labelBase}>{label}</span>
        </Link>
      </TileFrame>
    );
  }

  return (
    <div className={className}>
    <div
      className={`grid grid-cols-2 ${hideServicesLink ? "sm:grid-cols-3" : "sm:grid-cols-4"} gap-3 sm:gap-4`}
    >
      <ActionTile
        href={wa}
        external
        primary
        onClick={() => {
          track("whatsapp_click", { service: service ?? "general" });
          trackContactConversion();
        }}
        icon={<MessageCircle className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />}
        label="וואטסאפ"
      />
      <ActionTile
        href={`tel:${PHONE_TEL}`}
        onClick={() => track("phone_click", { location: "contact-actions" })}
        icon={<Phone className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />}
        label="התקשרו עכשיו"
      />
      {!hideServicesLink && (
        <LinkTile
          href="/services"
          icon={<Compass className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />}
          label="לשירותים שלנו"
        />
      )}
      <LinkTile
        href="/contact"
        icon={<Mail className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />}
        label="השאירו פנייה"
      />
    </div>
      {/* Tied to the action rather than floating beside it: it describes what
          happens when you press, which is the hesitation it exists to remove. */}
      <p
        className={`text-center text-[13px] mt-3.5 ${light ? "text-white/60" : "text-mauve"}`}
      >
        שלחו הודעה, נחזור אליכם תוך יום עסקים
      </p>
    </div>
  );
}
