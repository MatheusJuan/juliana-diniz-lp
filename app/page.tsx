import About from "@/components/About";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import Moments from "@/components/Moments";
import Pillars from "@/components/Pillars";
import Providers from "@/components/Providers";
import Results from "@/components/Results";
import Solutions from "@/components/Solutions";
import Steps from "@/components/Steps";

export default function Home() {
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
        <Hero />
        <Solutions />
        <Moments />
        <Steps />
        <Pillars />
        <Results />
        <About />
        <FinalCta />
      </main>
      <Footer />
    </Providers>
  );
}
