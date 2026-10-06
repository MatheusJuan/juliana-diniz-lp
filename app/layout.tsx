import type { Metadata, Viewport } from "next";
import { Montserrat, Sorts_Mill_Goudy } from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import { INDEXABLE, OG_IMAGE, SEO, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const serif = Sorts_Mill_Goudy({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sorts",
});

const sans = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SEO.title, template: "%s | Juliana Diniz" },
  description: SEO.description,
  applicationName: SITE_NAME,
  authors: [{ name: "Juliana Diniz Abreu Andrade", url: SITE_URL }],
  creator: "Juliana Diniz Abreu Andrade",
  publisher: SITE_NAME,
  category: "business",
  alternates: { canonical: "/", languages: { "pt-BR": "/" } },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: SITE_NAME,
    title: SEO.title,
    description: SEO.description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: [OG_IMAGE.url],
  },
  robots: INDEXABLE
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
      }
    : { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0f293f",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${serif.variable} ${sans.variable}`}
    >
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
