// Configuração de SEO/domínio. O domínio final (julianadinizesg.com.br) ainda não está ativo:
// em staging, defina NEXT_PUBLIC_SITE_URL com a URL real e NEXT_PUBLIC_NOINDEX=true.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://julianadinizesg.com.br").replace(/\/$/, "");
export const SITE_HOST = new URL(SITE_URL).host;
export const INDEXABLE = process.env.NEXT_PUBLIC_NOINDEX !== "true";
// Projeto Microsoft Clarity (o ID aparece no código-fonte de qualquer página que o use; não é segredo).
// NEXT_PUBLIC_CLARITY_ID sobrescreve; vazio desliga. O script só carrega depois do "Aceitar" do banner de cookies.
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "z0p0bccxsr";

export const SITE_NAME = "Juliana Diniz Sustentabilidade";
export const OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630, alt: "Juliana Diniz, consultora em sustentabilidade e ESG" };

export const SEO = {
  title: "Juliana Diniz | Consultoria em ESG e Sustentabilidade",
  description:
    "Consultoria em sustentabilidade e ESG: estratégia e governança, finanças sustentáveis, mudanças climáticas e relatórios ESG. Mais de 20 anos de experiência.",
};

// Atualizar quando o conteúdo da página mudar (usado no sitemap e no JSON-LD).
export const LAST_MODIFIED = "2026-10-20";
