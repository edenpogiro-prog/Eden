// Lightweight analytics wrapper. Every reporter below no-ops when its script
// isn't loaded, so nothing here can throw or block a click.
// Usage: track("whatsapp_click", { service: "couples" })

import { ANALYTICS } from "@/lib/site";

type Props = Record<string, string | number | boolean>;

/**
 * A way to report a gtag event.
 *
 * Prefers window.gtag, but falls back to pushing onto dataLayer directly,
 * because gtag() is only ever a dataLayer push. The inline tag in
 * app/layout.tsx declares gtag() for its own use; whether that declaration
 * also lands on window depends on how the script element ends up being
 * evaluated, and an event silently dropped because a global was missing is
 * exactly the kind of failure that looks like "the tracking doesn't work".
 */
function getGtag(): ((...args: unknown[]) => void) | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  if (typeof w.gtag === "function") return w.gtag;
  if (Array.isArray(w.dataLayer)) {
    const layer = w.dataLayer;
    return (...args: unknown[]) => {
      layer.push(args);
    };
  }
  return undefined;
}

export function track(event: string, props?: Props): void {
  if (typeof window === "undefined") return;

  const plausible = (window as unknown as {
    plausible?: (e: string, opts?: { props?: Props }) => void;
  }).plausible;
  if (typeof plausible === "function") {
    plausible(event, props ? { props } : undefined);
  }

  // The same event into GA4. This is what makes GA4 worth installing here:
  // Google Ads can say a click converted, but only this can say which service
  // page the visitor was reading when they decided to get in touch.
  const gtag = getGtag();
  if (ANALYTICS.ga4Id && typeof gtag === "function") {
    gtag("event", event, props ?? {});
  }
}

// Reports the "Contact conversion page" conversion action to the Google Ads
// tag (AW-18418042944) installed in app/layout.tsx — fired from every
// WhatsApp click and from a successful contact-form submission, since the
// site has no dedicated "thank you" page for either to load a static event
// snippet on. No-op if gtag isn't loaded (e.g. blocked by an ad blocker) —
// never throws.
export function trackContactConversion(): void {
  const gtag = getGtag();
  if (typeof gtag === "function") {
    gtag("event", "conversion", {
      send_to: "AW-18418042944/fP-WCL6MiOscEMCQtM5E",
    });
  }
}
