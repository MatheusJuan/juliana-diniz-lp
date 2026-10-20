"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { hero } from "@/lib/content";
import Button from "./Button";
import { useReady } from "./Providers";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

// Abertura alternativa, sem foto: a logo grande como imagem principal. INATIVA: nada importa este arquivo
// (a rota /capa-logo, criada para a cliente comparar as duas capas, foi desativada). Para usar como capa:
// trocar `<Hero />` por `<HeroLogo />` em Landing.tsx. Para voltar a comparar as duas, recriar a rota
// app/capa-logo/page.tsx (modelo no commit 221c138) passando a opção para o Landing.
export default function HeroLogo() {
  const ready = useReady();
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 700], [0, -60]);
  const fade = useTransform(scrollY, [0, 600], [1, 0.15]);

  return (
    <section id="inicio" className="sticky top-0 z-0 h-svh min-h-[600px] overflow-hidden bg-navy text-paper">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-sage/20 blur-[150px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-sage-300/10 blur-[140px]" />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-[1100px] flex-col items-center justify-center px-6 pb-20 pt-28 text-center md:px-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-[min(92vw,880px,100svh)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/logo-horizontal-fundo-escuro.svg"
            alt="Juliana Diniz Sustentabilidade"
            width={6256}
            height={1685}
            className="h-auto w-full"
            fetchPriority="high"
          />
        </motion.div>

        <Reveal waitForReady delay={0.3} y={16}>
          <span aria-hidden className="mx-auto mt-8 block h-px w-14 bg-sage-300 md:mt-10" />
          <p className="eyebrow mt-6 text-[0.62rem] tracking-[0.2em] text-paper/80 md:text-[0.72rem] md:tracking-[0.3em]">{hero.eyebrow}</p>
        </Reveal>

        <SplitText
          as="h1"
          text={hero.title}
          by="char"
          waitForReady
          delay={0.4}
          highlightClassName="text-sage-300"
          className="mt-5 max-w-[34ch] text-balance font-serif text-[clamp(1.35rem,calc((100vw-3rem)/14),1.9rem)] leading-[1.1] tracking-[-0.02em] md:text-[clamp(1.8rem,2.6vw,2.6rem)]"
        />

        <Reveal waitForReady delay={0.6} className="mt-8">
          <Button href="#solucoes" variant="outline">
            {hero.ctaSecondary}
          </Button>
        </Reveal>
      </motion.div>

      <div aria-hidden className="absolute bottom-9 right-6 z-10 hidden items-center gap-3 md:right-12 md:flex">
        <span className="text-[0.66rem] uppercase tracking-[0.3em] text-paper/60">Role</span>
        <span className="relative block h-12 w-px overflow-hidden bg-paper/20">
          <span className="absolute inset-0 animate-scroll-hint bg-paper" />
        </span>
      </div>
    </section>
  );
}
