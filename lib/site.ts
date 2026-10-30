// Configuração de SEO/domínio. O domínio final é www.judiniz.com.br (o judiniz.com.br sem www redireciona para ele).
// Em staging, defina NEXT_PUBLIC_SITE_URL com a URL real e NEXT_PUBLIC_NOINDEX=true.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.judiniz.com.br").replace(/\/$/, "");
export const SITE_HOST = new URL(SITE_URL).host;
export const INDEXABLE = process.env.NEXT_PUBLIC_NOINDEX !== "true";
// Projeto Microsoft Clarity (o ID aparece no código-fonte de qualquer página que o use; não é segredo).
// NEXT_PUBLIC_CLARITY_ID sobrescreve; vazio desliga. O script só carrega depois do "Aceitar" do banner de cookies.
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "z0p0bccxsr";

// Tela "Em breve" no lugar da página inicial (components/ComingSoon.tsx). Para lançar o site: false.
export const COMING_SOON = false;

export const SITE_NAME = "Juliana Diniz Sustentabilidade";
export const OG_IMAGE = { url: "/og.jpg", width: 1200, height: 630, alt: "Juliana Diniz, consultora em sustentabilidade e ESG" };

export const SEO = {
  title: "Juliana Diniz | Consultoria em Sustentabilidade",
  description:
    "Consultoria em sustentabilidade: estratégia e governança, finanças sustentáveis, mudanças climáticas, relatórios e índices. Mais de 20 anos de experiência.",
};

// Atualizar quando o conteúdo da página mudar (usado no sitemap e no JSON-LD).
export const LAST_MODIFIED = "2026-10-30";
