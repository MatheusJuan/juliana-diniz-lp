"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { costs, whatsappHref } from "@/lib/content";
import BgImage from "./BgImage";
import Button from "./Button";
import Marquee from "./Marquee";
import Reveal from "./Reveal";
import Section from "./Section";
import SplitText from "./SplitText";

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  );
}

function SourceLinks({ sources }: { sources: { label: string; href: string }[] }) {
  if (!sources.length) return null;
  return (
    <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-[0.72rem] tracking-wide text-paper/55">
      <span>Fonte:</span>
      {sources.map((s) => (
        <a
          key={s.href}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-sage-300/50 underline-offset-4 transition-colors hover:text-sage-300"
        >
          {s.label}
        </a>
      ))}
    </p>
  );
}

// véu leve: forte à esquerda (onde está o texto), some à direita
const VEIL = "linear-gradient(90deg, rgba(8,26,43,.6), rgba(8,26,43,.25) 55%, rgba(8,26,43,0))";

const cardBgs = [
  { src: "/images/costs-2-credito.webp", pos: "right bottom" },
  { src: "/images/costs-3-talentos.webp", pos: "left top" },
  { src: "/images/costs-4-regras.webp", pos: "right center" },
];

export default function Costs() {
  const { stat } = costs;

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

      <div className="relative mt-16 grid gap-4 md:mt-24 lg:grid-cols-3">
        <Reveal className="lg:col-span-3">
          <article
            className="relative isolate flex h-full min-h-[22rem] flex-col justify-between gap-12 overflow-hidden rounded-[2rem] border border-paper/10 bg-[#0a2033] p-8 md:min-h-[26rem] md:p-12"
          >
            <BgImage src="/images/costs-1-rede.webp" sizes="(min-width: 1320px) 1250px, 100vw" veil={VEIL} />
            <p className="eyebrow text-paper/70">{stat.title}</p>
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <p className="font-serif text-[clamp(6.5rem,16vw,14rem)] leading-[0.85] tracking-[-0.04em] [text-shadow:0_0_90px_rgba(169,189,175,0.5)]">
                <CountUp to={stat.value} />
                <span className="text-[0.36em] tracking-normal">{stat.suffix}</span>
              </p>
              <div className="md:max-w-[26rem] lg:max-w-[32rem]">
                <p className="text-[1.15rem] leading-snug text-paper md:text-[1.3rem]">{stat.label}</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-paper/70">{stat.body}</p>
                <SourceLinks sources={[stat.source]} />
              </div>
            </div>
          </article>
        </Reveal>

        {costs.cards.map((c, i) => (
          <Reveal key={c.title} delay={0.1 * (i + 1)}>
            <article className="relative isolate h-full rounded-[1.75rem] border border-paper/10 bg-[#0a2033] p-7 md:p-8">
              <BgImage src={cardBgs[i].src} sizes="(min-width: 1024px) 420px, 100vw" position={cardBgs[i].pos} veil={VEIL} />
              <h3 className="font-serif text-[1.75rem] leading-tight">{c.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/75">{c.body}</p>
              <SourceLinks sources={c.sources} />
            </article>
          </Reveal>
        ))}
      </div>

      <div className="relative mt-16 flex flex-col items-start justify-between gap-8 md:mt-24 md:flex-row md:items-center">
        <Reveal>
          <p className="max-w-[26rem] font-serif text-[1.7rem] leading-snug md:text-[2rem]">{costs.closing}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <Button href={whatsappHref}>{costs.cta}</Button>
        </Reveal>
      </div>

      <Marquee />
    </Section>
  );
}
