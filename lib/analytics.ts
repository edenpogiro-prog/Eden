// Lightweight analytics wrapper. No-op if Plausible isn't loaded.
// Usage: track("whatsapp_click", { service: "couples" })

type Props = Record<string, string | number | boolean>;

export function track(event: string, props?: Props): void {
  if (typeof window === "undefined") return;
  const plausible = (window as unknown as {
    plausible?: (e: string, opts?: { props?: Props }) => void;
  }).plausible;
  if (typeof plausible === "function") {
    plausible(event, props ? { props } : undefined);
  }
}

// Reports the "WhatsApp click" conversion action to the Google Ads tag
// (AW-18418042944) installed in app/layout.tsx. No-op if gtag isn't loaded
// (e.g. blocked by an ad blocker) — never throws.
export function trackWhatsAppConversion(): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as {
    gtag?: (...args: unknown[]) => void;
  }).gtag;
  if (typeof gtag === "function") {
    gtag("event", "conversion", {
      send_to: "AW-18418042944/fP-WCL6MiOscEMCQtM5E",
    });
  }
}
