import type { Metadata } from "next";
import Landing from "@/components/Landing";

// Proposta de abertura só com a logo, para a cliente comparar com a abertura com foto (/). Fora do Google e do sitemap.
// Quando a cliente escolher: se for a logo, trocar `<Hero />` por `<HeroLogo />` em Landing.tsx e apagar esta pasta;
// se for a foto, apagar esta pasta e HeroLogo.tsx.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
};

export default function CapaLogo() {
  return <Landing capa="logo" />;
}
