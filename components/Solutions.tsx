import Image from "next/image";
import { solutions, whatsappHref } from "@/lib/content";
import BgImage from "./BgImage";
import Button from "./Button";
import Reveal from "./Reveal";
import Section from "./Section";
import SplitText from "./SplitText";

const cardBgs = [
  "/images/sol-1-estrategia.webp",
  "/images/sol-2-financas.webp",
  "/images/sol-3-clima.webp",
  "/images/sol-4-relatorios.webp",
];

export default function Solutions() {
  return (
    <Section id="solucoes" className="overflow-hidden bg-cream">
      {/* Arcos decorativos, como no layout aprovado */}
      <svg aria-hidden viewBox="0 0 600 600" className="pointer-events-none absolute -right-40 -top-24 h-[34rem] w-[34rem] text-sage/25" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="300" cy="300" r="290" />
        <circle cx="300" cy="300" r="220" />
        <circle cx="300" cy="300" r="150" />
      </svg>
      <div aria-hidden className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-sage/15 blur-3xl" />

      <Reveal>
        <p className="eyebrow mb-6 text-sage">{solutions.eyebrow}</p>
      </Reveal>
      <SplitText
        as="h2"
        text={solutions.title}
        highlightClassName="text-sage"
        className="h2 max-w-[16ch] md:max-w-[20ch]"
      />
      <Reveal delay={0.15}>
        <p className="lead mt-8 max-w-[34rem] text-navy/75">{solutions.lead}</p>
      </Reveal>

      <div className="relative mt-16 grid gap-5 md:mt-20 md:grid-cols-2">
        {solutions.items.map((s, i) => (
          <Reveal key={s.title} delay={(i % 2) * 0.12}>
            <article
              className="group relative isolate h-full rounded-[1.75rem] border border-navy/10 bg-paper p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-sage/50 hover:shadow-[0_30px_60px_-30px_rgba(15,41,63,0.35)] md:p-10"
            >
              <BgImage src={cardBgs[i]} sizes="(min-width: 768px) 620px, 100vw" />
              <Image
                src={`/icons/navy/${s.icon}.png`}
                alt=""
                width={84}
                height={84}
                className="h-[4.5rem] w-[4.5rem] transition-transform duration-700 group-hover:rotate-[8deg] group-hover:scale-105"
              />
              <h3 className="mt-7 font-serif text-[1.85rem] leading-[1.1] tracking-[-0.01em] md:text-[2.1rem]">{s.title}</h3>
              <p className="mt-4 text-[0.98rem] leading-[1.7] text-navy/75">{s.body}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14 flex justify-center">
        <Button href={whatsappHref}>{solutions.cta}</Button>
      </Reveal>
    </Section>
  );
}
