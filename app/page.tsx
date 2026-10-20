import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";
import Landing from "@/components/Landing";
import { COMING_SOON } from "@/lib/site";

// Enquanto a tela "Em breve" estiver no ar, ela nunca é indexada (mesmo que NEXT_PUBLIC_NOINDEX seja desligado antes do lançamento).
export const metadata: Metadata = COMING_SOON
  ? { title: "Em breve | Juliana Diniz", description: "O novo site da Juliana Diniz Sustentabilidade está a caminho.", robots: { index: false, follow: false } }
  : {};

export default function Home() {
  return COMING_SOON ? <ComingSoon /> : <Landing />;
}
