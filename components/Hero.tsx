"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { hero, whatsappHref } from "@/lib/content";
import Button from "./Button";
import { useReady } from "./Providers";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

export default function Hero() {
  const ready = useReady();
  const { scrollY } = useScroll();
  const imgScale = useTransform(scrollY, [0, 900], [1, 1.1]);
  const textY = useTransform(scrollY, [0, 700], [0, -60]);
  const fade = useTransform(scrollY, [0, 600], [1, 0.15]);

  return (
    <section
      id="inicio"
      className="sticky top-0 z-0 h-svh min-h-[660px] overflow-hidden bg-navy text-paper"
    >
      {/* Imagem: abre com zoom-out e cresce de leve ao rolar (sem deslocar, para não expor borda) */}
      <motion.div style={{ scale: imgScale }} className="absolute inset-x-0 bottom-0 top-[12svh] md:inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.16 }}
          animate={ready ? { scale: 1 } : undefined}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <picture>
            <source media="(min-width: 768px)" srcSet="/images/hero-desktop.webp" />
            <img
              src="/images/hero-mobile.webp"
              alt="Juliana Diniz, consultora em sustentabilidade e ESG"
              className="h-full w-full object-cover object-[50%_0%] md:object-[70%_22%]"
              fetchPriority="high"
              width={1672}
              height={941}
            />
          </picture>
        </motion.div>
      </motion.div>

      {/* Leitura do texto: gradiente à esquerda no desktop, embaixo no mobile */}
      <div aria-hidden className="absolute inset-y-0 left-0 hidden w-[68%] bg-linear-to-r from-navy via-navy/55 to-transparent md:block" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[42%] bg-linear-to-b from-navy/85 via-navy/40 to-transparent md:hidden" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[38%] bg-linear-to-t from-navy via-navy/65 to-transparent md:h-[28%] md:via-navy/40" />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col px-6 pb-10 pt-28 md:justify-center md:px-12 md:pb-16 md:pt-24"
      >
        <div className="md:max-w-[min(49vw,760px)]">
          <Reveal waitForReady delay={0.2} y={16}>
            <p className="eyebrow mb-4 text-paper/80 md:mb-8">{hero.eyebrow}</p>
          </Reveal>

          <SplitText
            as="h1"
            text={hero.title}
            by="char"
            waitForReady
            delay={0.3}
            highlightClassName="text-sage-300"
            className="font-serif text-[clamp(2.2rem,7.6vw,6.2rem)] md:text-[clamp(2.6rem,4.6vw,4.6rem)] leading-[1.02] tracking-[-0.025em]"
          />
        </div>

        {/* Mobile: subtítulo junto do título (grupo único no topo) e CTAs no pé da tela */}
        <Reveal waitForReady delay={0.8} className="mt-5 md:mt-10 md:max-w-[min(44vw,620px)]">
          <p className="max-w-[34rem] text-[0.98rem] leading-[1.6] text-paper/90 md:text-[1.18rem] md:leading-[1.65]">
            {hero.subtitle}
          </p>
        </Reveal>

        <Reveal waitForReady delay={0.95} className="mt-auto md:mt-10">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={whatsappHref}>{hero.cta}</Button>
            <Button href="#solucoes" variant="outline">
              {hero.ctaSecondary}
            </Button>
          </div>
        </Reveal>
      </motion.div>

      {/* Destaque de credibilidade: só no desktop, à direita da foto */}
      <Reveal waitForReady delay={1.2} y={10} className="absolute right-12 top-[30%] z-10 hidden w-[min(18vw,280px)] md:block">
        <div className="flex gap-5 rounded-[1.25rem] border border-paper/15 bg-navy/55 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-md lg:p-7">
          <span aria-hidden className="w-0.5 shrink-0 bg-sage-300" />
          <p className="font-serif text-[clamp(1.15rem,1.7vw,1.6rem)] leading-snug text-paper">{hero.credibility}</p>
        </div>
      </Reveal>

      <div aria-hidden className="absolute bottom-9 right-6 z-10 hidden items-center gap-3 md:right-12 md:flex">
        <span className="text-[0.66rem] uppercase tracking-[0.3em] text-paper/60">Role</span>
        <span className="relative block h-12 w-px overflow-hidden bg-paper/20">
          <span className="absolute inset-0 animate-scroll-hint bg-paper" />
        </span>
      </div>
    </section>
  );
}
