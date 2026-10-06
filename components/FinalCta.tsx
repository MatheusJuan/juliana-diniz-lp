"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { finalCta, whatsappHref } from "@/lib/content";
import Button from "./Button";
import Reveal from "./Reveal";
import Section from "./Section";
import SplitText from "./SplitText";

export default function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const markY = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <Section id="contato" className="overflow-hidden bg-navy-950 text-paper">
      <div ref={ref} className="relative">
        {/* Monograma em marca d'água, baixa intensidade, com parallax */}
        <motion.div aria-hidden style={{ y: markY }} className="pointer-events-none absolute -right-24 -top-28 w-[min(46rem,90vw)] opacity-[0.07]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/monograma-fundo-escuro.svg" alt="" width={552} height={647} className="h-auto w-full" />
        </motion.div>

        <div className="relative mx-auto max-w-[56rem] py-8 text-center md:py-16">
          <SplitText
            as="h2"
            text={finalCta.title}
            highlightClassName="italic text-sage-300"
            className="font-serif text-[clamp(2.9rem,8vw,7rem)] leading-[1.02] tracking-[-0.025em]"
          />
          <Reveal delay={0.2}>
            <p className="lead mx-auto mt-10 max-w-[32rem] text-paper/75">{finalCta.text}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-12 flex justify-center">
            <Button href={whatsappHref} className="px-9 py-5">
              {finalCta.button}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
