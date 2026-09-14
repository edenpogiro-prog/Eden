import { WHATSAPP } from "@/lib/site";

// The pre-filled text is deliberately short. A full sentence written in the
// visitor's name reads like a form rather than something they wrote, and a
// meaningful share of people who open WhatsApp from the site delete it,
// hesitate over how to phrase a replacement, and close the app without
// sending. Short enough to send as-is is the whole point.
const DEFAULT_MESSAGE = "היי, אשמח לפרטים";

/**
 * Build a wa.me deep link with a short pre-filled Hebrew message.
 *
 * Every entry point on the site lands on the same number; `service` is kept in
 * the signature so call sites don't have to change, but routing is gone — the
 * message text is what tells us which coach the inquiry is for.
 */
export function whatsappLink(opts?: {
  service?: string;
  message?: string;
}): string {
  const text = opts?.message ?? DEFAULT_MESSAGE;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

/** Per-service opener — still short enough to send without editing. */
export function serviceMessage(service: string, serviceTitle: string): string {
  return `היי, אשמח לפרטים על ${serviceTitle}`;
}
