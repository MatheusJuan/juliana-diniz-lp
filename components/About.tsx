"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { about, LINKEDIN } from "@/lib/content";
import BgImage from "./BgImage";
import Reveal from "./Reveal";
import Section from "./Section";
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
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center rounded-full border border-sage-300/60 px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] transition-colors hover:bg-sage-300 hover:text-navy"
              >
                LinkedIn ↗
              </a>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow mb-6 text-sage-300">{about.eyebrow}</p>
          </Reveal>
          <SplitText as="h2" text={about.title} className="h2" highlightClassName="italic text-sage-300" />

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

      {/* Formação em destaque e, abaixo, os dois cursos, em selos simples (mesmo desenho do antigo selo "a definir") */}
      <div className="relative mt-8 space-y-3">
        <Reveal>
          <div className="inline-block rounded-3xl border border-sage-300 bg-sage-300/10 px-6 py-4">
            <p className="eyebrow text-sage-300">{about.education.k}</p>
            <p className="mt-2 text-[1.05rem] text-paper">{about.education.degree}</p>
            <p className="text-[0.85rem] text-paper/60">{about.education.school}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow pt-5 text-sage-300">{about.coursesLabel}</p>
        </Reveal>
        <div className="flex flex-wrap gap-3">
          {about.courses.map((c, i) => (
            <Reveal key={c.title} delay={0.1 + i * 0.08}>
              <div className="rounded-3xl border border-paper/25 px-5 py-3">
                <p className="text-[0.9rem] text-paper/90">{c.title}</p>
                <p className="text-[0.75rem] text-paper/55">{c.issuer}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
