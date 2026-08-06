import { COACHES, CoachKey, FALLBACK_WHATSAPP } from "@/lib/site";

// Which coach handles which service area. Ambiguous / unknown -> fallback.
const SERVICE_ROUTING: Record<string, CoachKey> = {
  couples: "sivan",
  parenting: "sivan",
  blueprint: "sivan",
  "personal-development": "sivan",
  "future-leaders": "sivan",
  finance: "eden",
  "combo-family": "eden",
  "combo-couples": "eden",
  "digital-courses": "eden",
  workshops: "eden",
};

/**
 * Build a wa.me deep link with a pre-filled Hebrew message, routed to the
 * right coach for the given service. Unknown service -> fallback number.
 */
export function whatsappLink(opts?: {
  service?: string;
  message?: string;
}): string {
  const { service, message } = opts ?? {};
  const key = service ? SERVICE_ROUTING[service] : undefined;
  const number = key ? COACHES[key].whatsapp : FALLBACK_WHATSAPP;
  const text =
    message ??
    "היי, הגעתי דרך האתר ואשמח לשמוע עוד על הליווי שלכם 🙂";
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Pre-filled message tuned per service, so the coach gets a warm, qualified lead. */
export function serviceMessage(service: string, serviceTitle: string): string {
  return `היי, הגעתי דרך האתר. אשמח לשמוע עוד על "${serviceTitle}".`;
}
