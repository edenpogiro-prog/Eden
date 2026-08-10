import type { Metadata } from "next";
import { Heebo, Suez_One } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import { SITE } from "@/lib/site";
import { organizationLd } from "@/lib/seo";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Slab display face — poster-weight Hebrew headlines, single 400 weight.
const suez = Suez_One({
  subsets: ["hebrew", "latin"],
  variable: "--font-suez",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  alternates: { canonical: "/" },
  title: {
    default: "המטרייה המשפחתית, ליווי זוגי, הורי וכלכלי למשפחה",
    template: "%s | המטרייה המשפחתית",
  },
  description:
    "כל המשפחה תחת מטרייה אחת: ליווי זוגי, הדרכת הורים וילדים וייעוץ כלכלי למשפחה. לא עוד כיבוי שריפות, מערכת חיים.",
  openGraph: {
    siteName: "המטרייה המשפחתית",
    locale: "he_IL",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${suez.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }}
        />
        {/* Apply saved accessibility-widget preferences before paint, to avoid a flash of unscaled/normal-contrast content */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{
              var s=localStorage.getItem('a11y-font-scale');
              if(s==='2'||s==='3')document.documentElement.setAttribute('data-a11y-font-scale',s);
              if(localStorage.getItem('a11y-contrast')==='true')document.documentElement.setAttribute('data-a11y-contrast','true');
            }catch(e){}})();`,
          }}
        />
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.tagged-events.js"
            strategy="afterInteractive"
          />
        ) : null}
      </head>
      <body className="font-sans bg-parchment text-ink flex flex-col min-h-screen antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-[100] focus:bg-ember-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-[10px] focus:font-bold"
        >
          דלג לתוכן הראשי
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
        <AccessibilityWidget />
      </body>
    </html>
  );
}
