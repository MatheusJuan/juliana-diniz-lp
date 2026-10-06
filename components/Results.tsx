"use client";

import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import { results } from "@/lib/content";
import Reveal from "./Reveal";
import SplitText from "./SplitText";

const N = results.items.length;
const STEP_SVH = 80; // quanto de rolagem cada card consome (entra virado, desvira, segura, sai)

type Item = (typeof results.items)[number];

function FlipCard({ item, i, progress, active }: { item: Item; i: number; progress: MotionValue<number>; active: number }) {
  // t = posição na rolagem em "cards" (0 → N). u < 0: card ainda na pilha, virado; 0 → 0.5: desvira;
  // 0.5 → 0.85: segura; 0.85 → 1: sai para dar lugar ao próximo (o último fica).
  const u = useTransform(progress, (p) => p * N - i);
  const rotateY = useTransform(u, [0, 0.5], [180, 0]);
  const last = i === N - 1;
  const opacity = useTransform(u, [0.85, 1], [1, last ? 1 : 0]);
  const exitY = useTransform(u, [0.85, 1], [0, last ? 0 : -60]);
  const stackY = useTransform(u, [-2.15, -1.15, -1, -0.15, 0], [36, 36, 18, 18, 0]);
  const y = useTransform(() => stackY.get() + exitY.get());
  const scale = useTransform(u, [-2.15, -1.15, -1, -0.15, 0], [0.9, 0.9, 0.95, 0.95, 1]);
  const isActive = active === i;

  return (
    <motion.div
      aria-hidden={!isActive}
      style={{ scale, y, opacity, zIndex: N - i }}
      className={`absolute inset-0 ${isActive ? "" : "pointer-events-none"}`}
    >
      <motion.div style={{ rotateY, transformPerspective: 1800, transformStyle: "preserve-3d" }} className="relative h-full">
        {/* frente */}
        <article className="absolute inset-0 flex flex-col overflow-hidden rounded-[2rem] bg-paper p-5 shadow-[0_30px_60px_-30px_rgba(15,41,63,0.45)] [backface-visibility:hidden] md:p-10">
          <span className="eyebrow self-start rounded-full bg-sage/15 px-4 py-2 text-sage-600">{item.tag}</span>
          <p className="mt-5 whitespace-nowrap font-serif text-[clamp(2.4rem,3.6vw,3.9rem)] leading-none tracking-[-0.03em] md:mt-8">{item.stat}</p>
          <p className="mt-2 text-[0.72rem] uppercase tracking-[0.16em] text-navy/55 md:text-[0.8rem]">{item.statLabel}</p>
          <h3 className="mt-4 font-serif text-[1.2rem] leading-tight md:mt-8 md:text-[1.6rem]">{item.title}</h3>
          <p className="mt-2 text-[0.8rem] leading-[1.5] text-navy/75 md:mt-3 md:text-[0.95rem] md:leading-[1.7]">{item.body}</p>
          <a
            href={item.source.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={isActive ? 0 : -1}
            className="mt-auto inline-flex items-center gap-2 pt-4 text-[0.78rem] tracking-wide text-sage-600 underline decoration-sage/40 underline-offset-4 transition-colors hover:text-navy"
          >
            Fonte: {item.source.label}
            <span aria-hidden>↗</span>
          </a>
        </article>

        {/* verso: logo da Juliana */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[2rem] border border-paper/10 bg-navy-950 [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <div className="pointer-events-none absolute h-[70%] w-[70%] rounded-full bg-sage/25 blur-[90px]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/monograma-fundo-escuro.svg" alt="" className="relative h-[42%] w-auto" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Results() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(p * N + 0.15))));
  });

  const goTo = (k: number) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const top = window.scrollY + r.top + ((k + 0.65) / N) * (r.height - window.innerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      id="resultados"
      className="relative -mt-10 rounded-t-[2.5rem] bg-sand md:-mt-14 md:rounded-t-[3.5rem]"
    >
      <div ref={trackRef} style={{ height: `${100 + N * STEP_SVH}svh` }}>
        <div className="sticky top-0 h-svh overflow-hidden px-6 pb-[4.5rem] pt-[5rem] md:px-12 md:pb-20 md:pt-28">
          <div className="mx-auto grid h-full w-full max-w-[1320px] grid-rows-[auto_minmax(0,1fr)_auto] gap-4 lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:gap-x-12 lg:gap-y-8">
            <div className="lg:col-span-5 lg:row-start-1 lg:self-center">
              <Reveal>
                <p className="eyebrow mb-3 text-navy/70 md:mb-6">{results.eyebrow}</p>
              </Reveal>
              <SplitText
                as="h2"
                text={results.title}
                highlightClassName="text-sage-600"
                className="font-serif text-[clamp(1.55rem,3.3vw,3.3rem)] leading-[1.06] tracking-[-0.02em]"
              />
              <Reveal delay={0.2}>
                <p className="mt-3 max-w-[30rem] text-[0.78rem] leading-relaxed text-navy/75 md:mt-6 md:text-[1.02rem]">{results.lead}</p>
              </Reveal>
            </div>

            <div className="relative mb-4 min-h-0 lg:mb-0 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:h-[min(36rem,72svh)] lg:self-center">
              {results.items.map((r, i) => (
                <FlipCard key={r.tag} item={r} i={i} progress={scrollYProgress} active={active} />
              ))}
            </div>

            {/* indicador de posição */}
            <div className="lg:col-span-5 lg:row-start-2">
              <div className="flex items-center justify-between text-[0.72rem] tracking-[0.2em] text-navy/60">
                <span className="tabular-nums">
                  0{active + 1} / 0{N}
                </span>
                <span aria-hidden className={`transition-opacity duration-500 ${active < N - 1 ? "opacity-100" : "opacity-0"}`}>
                  <span className="uppercase">Role</span> <span className="inline-block animate-bounce">↓</span>
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2" role="tablist" aria-label="Exemplos de resultados">
                {results.items.map((r, k) => (
                  <button
                    key={r.tag}
                    type="button"
                    role="tab"
                    aria-selected={active === k}
                    onClick={() => goTo(k)}
                    className="group text-left"
                  >
                    <span className={`block h-[3px] rounded-full transition-colors duration-500 ${k <= active ? "bg-sage-600" : "bg-navy/15 group-hover:bg-navy/30"}`} />
                    <span className={`mt-2 block text-[0.68rem] uppercase tracking-[0.18em] transition-colors ${active === k ? "text-navy" : "text-navy/40"}`}>
                      {r.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
