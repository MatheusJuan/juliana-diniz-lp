import { costs, whatsappHref } from "@/lib/content";
import Button from "./Button";
import Reveal from "./Reveal";
import Section from "./Section";
import SplitText from "./SplitText";

// Seção oculta: não é renderizada em app/page.tsx. Fica guardada, junto com `costs` (content.ts),
// para a seção unificada com Resultados. Os blocos de dados (stat e cards) já tinham saído daqui.
export default function Costs() {
  return (
    <Section id="custo" className="overflow-hidden bg-navy-950 text-paper">
      <div aria-hidden className="pointer-events-none absolute -left-48 top-1/4 h-[36rem] w-[36rem] rounded-full bg-sage/20 blur-[150px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-1/4 h-[30rem] w-[30rem] rounded-full bg-sage-300/10 blur-[140px]" />

      <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="eyebrow mb-6 text-sage-300">{costs.eyebrow}</p>
          </Reveal>
          <SplitText
            as="h2"
            text={costs.title}
            className="h2 max-w-[18ch] md:max-w-[22ch]"
          />
        </div>
        <Reveal delay={0.2} className="lg:col-span-4">
          <p className="lead text-paper/75">{costs.intro}</p>
        </Reveal>
      </div>

      <Reveal className="mt-16 flex justify-center md:mt-24">
        <Button href={whatsappHref}>{costs.cta}</Button>
      </Reveal>
    </Section>
  );
}
