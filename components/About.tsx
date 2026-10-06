"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { about } from "@/lib/content";
import BgImage from "./BgImage";
import Reveal from "./Reveal";
import Section, { Placeholder } from "./Section";
import SplitText from "./SplitText";

export default function About() {
  return (
    <Section id="quem-conduz" className="isolate overflow-hidden bg-navy text-paper">
      <BgImage src="/images/costs-3-talentos.webp" sizes="100vw" position="left top" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-20 h-[32rem] w-[32rem] rounded-full bg-sage/20 blur-[150px]" />

      <div className="relative grid gap-16 lg:grid-cols-12 lg:gap-20">
        {/* Retrato com abertura em máscara e cantos de moldura */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto max-w-[30rem] lg:sticky lg:top-32">
            <span aria-hidden className="absolute -left-3 -top-3 z-10 h-20 w-20 rounded-tl-[2rem] border-l-2 border-t-2 border-sage-300" />
            <span aria-hidden className="absolute -bottom-3 -right-3 z-10 h-20 w-20 rounded-br-[2rem] border-b-2 border-r-2 border-sage-300" />
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0 round 2rem)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0 round 2rem)" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
            >
              <Image
                src="/images/juliana-retrato.webp"
                alt="Juliana Diniz Abreu Andrade"
                width={1066}
                height={1600}
                sizes="(min-width: 1024px) 30rem, 90vw"
                className="aspect-[4/5] w-full object-cover object-[50%_28%]"
              />
            </motion.div>
            <Reveal delay={0.4} className="mt-6">
              <p className="font-serif text-2xl">{about.name}</p>
              <p className="mt-1 text-[0.85rem] tracking-wide text-paper/65">{about.role}</p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow mb-6 text-sage-300">{about.eyebrow}</p>
          </Reveal>
          <SplitText as="h2" text={about.title} className="h2" highlightClassName="italic text-sage-300" />

          <Reveal delay={0.1}>
            <blockquote className="mt-12 border-l border-sage-300 pl-6 font-serif text-[1.7rem] italic leading-snug text-sage-300 md:text-[2.1rem]">
              “{about.quote}”
            </blockquote>
          </Reveal>

          <div className="mt-10 space-y-5 text-[1.02rem] leading-[1.8] text-paper/80 md:text-[1.08rem]">
            {about.paragraphs.map((p) => (
              <Reveal key={p}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

        </div>
      </div>

      {/* Trajetória em blocos, largura total, em linha */}
      <ul className="relative mt-20 grid gap-px overflow-hidden rounded-[2rem] bg-paper/10 md:mt-28 md:grid-cols-2 lg:grid-cols-3">
        {about.highlights.map((h, i) => (
          <li key={h.k} className="bg-navy/75 transition-colors duration-500 hover:bg-navy-950/90">
            <Reveal delay={(i % 3) * 0.08} y={20} className="h-full p-8 md:p-10">
              <h3 className="font-serif text-[1.7rem] leading-tight md:text-[1.9rem]">{h.k}</h3>
              <p className="mt-3 text-[0.95rem] leading-[1.7] text-paper/70">{h.t}</p>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal className="relative mt-8">
        <Placeholder className="text-sage-300">{about.placeholder}</Placeholder>
      </Reveal>
    </Section>
  );
}
