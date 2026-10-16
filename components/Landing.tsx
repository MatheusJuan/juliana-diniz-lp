import About from "@/components/About";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HeroLogo from "@/components/HeroLogo";
import JsonLd from "@/components/JsonLd";
import Moments from "@/components/Moments";
import Providers from "@/components/Providers";
import Solutions from "@/components/Solutions";
import Steps from "@/components/Steps";

// `capa` escolhe a abertura: "foto" (/) ou "logo" (/capa-logo, só para a cliente comparar as duas).
export default function Landing({ capa = "foto" }: { capa?: "foto" | "logo" }) {
  return (
    <Providers>
      <JsonLd />
      <a
        href="#conteudo"
        className="sr-only z-[110] rounded-full bg-paper px-5 py-3 text-sm text-navy focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="relative">
        {capa === "logo" ? <HeroLogo /> : <Hero />}
        <Solutions />
        <Moments />
        <Steps />
        <About />
        <FinalCta />
      </main>
      <Footer />
    </Providers>
  );
}
