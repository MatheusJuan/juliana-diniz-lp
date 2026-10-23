"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/content";
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

  // Mobile: texto no topo (sobre a faixa marinho da foto), rosto no meio e botões embaixo, sem nada sobre o
  // rosto. A foto (884x2000: topo marinho chapado, cabelo em y 960, queixo em ~1220) é posicionada para o
  // cabelo ficar logo abaixo do título (medido com offset, que ignora o transform do scroll) e cresce, se
  // preciso, para cobrir até o fim da tela (`scale`: px por px da foto original). A posição vai por `transform`
  // (não por top/left/width): mexer no layout depois da hidratação contava como layout shift (CLS 0,39 no
  // Lighthouse mobile); transform não conta. Se a tela for baixa demais
  // para o conjunto, o hero cresce (`need`) e o sticky só trava quando o fundo dele encosta no fim da tela.
  const titleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ top: number; need: number; scale: number; width: number } | null>(null);
  useEffect(() => {
    const title = titleRef.current;
    const cta = ctaRef.current;
    const content = title?.offsetParent as HTMLElement | null;
    const section = content?.parentElement;
    if (!title || !cta || !content || !section) return;
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      if (!mq.matches) return setFit(null);
      const hairAt = content.offsetTop + title.offsetTop + title.offsetHeight + 24; // onde o cabelo deve ficar
      const widthScale = section.clientWidth / 884;
      const head = (1240 - 960) * widthScale; // do cabelo ao pescoço, na escala da foto
      const need = Math.ceil(Math.max(660, hairAt + head + 20 + cta.offsetHeight + 72)); // 72 = respiro sob os botões
      // Altura real do hero = a maior entre a tela (100svh) e `need`; do cabelo ao pé da foto há 1040px.
      const probe = document.createElement("div");
      probe.style.cssText = "position:fixed;visibility:hidden;width:0;height:100svh";
      document.body.appendChild(probe);
      const screenH = probe.offsetHeight;
      probe.remove();
      const scale = Math.max(widthScale, (Math.max(screenH, need) - hairAt) / 1040);
      setFit({ top: hairAt - 960 * scale, need, scale, width: section.clientWidth });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(title);
    ro.observe(content);
    mq.addEventListener("change", update);
    document.fonts?.ready.then(update);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", update);
    };
  }, []);

  return (
    <section
      id="inicio"
      className="sticky top-0 z-0 h-svh min-h-[660px] overflow-hidden bg-[#0b1e35] text-paper md:bg-navy"
      style={fit ? { minHeight: fit.need, top: `min(0px, calc(100svh - ${fit.need}px))` } : undefined}
    >
      {/* Imagem: abre com zoom-out e cresce de leve ao rolar (sem deslocar, para não expor borda) */}
      <motion.div style={{ scale: imgScale }} className="absolute inset-0 overflow-hidden md:overflow-visible">
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
              className="absolute left-0 top-0 h-auto w-full max-w-none md:static md:block md:h-full md:object-cover md:object-[70%_22%]"
              style={
                fit
                  ? {
                      transformOrigin: "0 0",
                      transform: `translate(${(fit.width - 884 * fit.scale) / 2}px, ${fit.top}px) scale(${(884 * fit.scale) / fit.width})`,
                    }
                  : undefined
              }
              fetchPriority="high"
              width={884}
              height={2000}
            />
          </picture>
        </motion.div>
      </motion.div>

      {/* Leitura do texto: gradiente à esquerda no desktop, embaixo no mobile */}
      <div aria-hidden className="absolute inset-y-0 left-0 hidden w-[68%] bg-linear-to-r from-navy via-navy/55 to-transparent md:block" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[11.5rem] bg-linear-to-t from-navy via-navy/65 to-transparent md:h-[28%] md:via-navy/40" />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col px-6 pb-[4.5rem] pt-28 md:justify-center md:px-12 md:pb-16 md:pt-24"
      >
        <div ref={titleRef} className="md:max-w-[min(49vw,760px)]">
          <Reveal waitForReady delay={0.1} y={16}>
            {/* Sempre em uma linha: no mobile a fonte acompanha a largura da tela e o espaçamento entre letras diminui. */}
            <p className="eyebrow mb-4 whitespace-nowrap text-[clamp(0.5rem,calc((100vw-3rem)/30),0.72rem)] tracking-[0.12em] text-paper/80 md:mb-8 md:text-[0.72rem] md:tracking-[0.3em]">
              {hero.eyebrow}
            </p>
          </Reveal>

          <SplitText
            as="h1"
            text={hero.title}
            by="char"
            waitForReady
            delay={0.2}
            highlightClassName="text-sage-300"
            className="text-balance font-serif text-[clamp(1.4rem,calc((100vw-3rem)/14),2rem)] md:text-[clamp(2.4rem,3.9vw,3.9rem)] leading-[1.04] tracking-[-0.025em]"
          />
        </div>

        {/* Mobile: CTA no pé da tela */}
        <Reveal waitForReady delay={0.4} className="mt-auto pt-5 md:mt-10 md:pt-0">
          <div ref={ctaRef} className="flex flex-col gap-3 sm:flex-row">
            <Button href="#solucoes" variant="outline">
              {hero.ctaSecondary}
            </Button>
          </div>
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
