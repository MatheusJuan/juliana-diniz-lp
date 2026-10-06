import { about, faq, solutions, whatsappHref, WHATSAPP, LINKEDIN } from "@/lib/content";
import { LAST_MODIFIED, OG_IMAGE, SEO, SITE_NAME, SITE_URL } from "@/lib/site";

const id = (fragment: string) => `${SITE_URL}/#${fragment}`;
const abs = (path: string) => `${SITE_URL}${path}`;

const topics = [
  "Sustentabilidade corporativa",
  "ESG",
  "Estratégia de sustentabilidade",
  "Governança ESG",
  "Finanças sustentáveis",
  "Mudanças climáticas",
  "Relatórios de sustentabilidade",
  "Índices e ratings ESG",
  "Gestão ambiental",
  "ISO 14001",
];

// Dados estruturados (schema.org) montados a partir do mesmo conteúdo da página.
export default function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": id("website"),
        url: abs("/"),
        name: SITE_NAME,
        description: SEO.description,
        inLanguage: "pt-BR",
        publisher: { "@id": id("organization") },
      },
      {
        "@type": "WebPage",
        "@id": id("webpage"),
        url: abs("/"),
        name: SEO.title,
        description: SEO.description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": id("website") },
        about: { "@id": id("organization") },
        primaryImageOfPage: { "@id": id("primaryimage") },
        dateModified: LAST_MODIFIED,
      },
      {
        "@type": "ImageObject",
        "@id": id("primaryimage"),
        url: abs(OG_IMAGE.url),
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        caption: OG_IMAGE.alt,
      },
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": id("organization"),
        name: SITE_NAME,
        alternateName: "Juliana Diniz",
        url: abs("/"),
        logo: { "@type": "ImageObject", url: abs("/icon-512.png"), width: 512, height: 512 },
        image: abs(OG_IMAGE.url),
        description: SEO.description,
        slogan: "Vamos juntos",
        founder: { "@id": id("person") },
        areaServed: { "@type": "Country", name: "Brasil" },
        knowsAbout: topics,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Soluções em sustentabilidade e ESG",
          itemListElement: solutions.items.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.body,
              provider: { "@id": id("organization") },
              areaServed: { "@type": "Country", name: "Brasil" },
            },
          })),
        },
        // Só entra quando o número do WhatsApp for definido em lib/content.ts.
        ...(WHATSAPP.number
          ? {
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  url: whatsappHref,
                  availableLanguage: "pt-BR",
                },
              ],
            }
          : {}),
        // Quando o LinkedIn existir, adicionar: sameAs: ["https://www.linkedin.com/in/..."]
      },
      {
        "@type": "Person",
        "@id": id("person"),
        name: about.name,
        jobTitle: about.role,
        description: about.paragraphs[0],
        url: abs("/"),
        image: abs("/images/hero-mobile.webp"),
        worksFor: { "@id": id("organization") },
        sameAs: [LINKEDIN],
        knowsAbout: topics,
      },
      {
        "@type": "FAQPage",
        "@id": id("faq"),
        isPartOf: { "@id": id("webpage") },
        mainEntity: faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // `<` escapado para não permitir fechar a tag <script> a partir do conteúdo.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
