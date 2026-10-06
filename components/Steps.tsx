"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { steps, whatsappHref } from "@/lib/content";
import BgImage from "./BgImage";
import Button from "./Button";
import Reveal from "./Reveal";
import Section from "./Section";
import SplitText from "./SplitText";

export default function Steps() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });
  const [reached, setReached] = useState(0); // quantos círculos a linha já alcançou

  useMotionValueEvent(line, "change", (v) => {
    const ol = listRef.current;
    if (!ol) return;
    const tip = 8 + v * (ol.offsetHeight - 8); // a linha começa em top-2 (8px)
    let n = 0;
    for (const li of Array.from(ol.children) as HTMLElement[]) {
      const dot = li.querySelector<HTMLElement>("[data-dot]");
      if (dot && li.offsetTop + dot.offsetHeight / 2 <= tip) n++;
    }
    setReached((r) => (r === n ? r : n));
  });

  return (
    <Section id="como-funciona" className="isolate bg-navy text-paper">
      <BgImage src="/images/steps-bg.webp" sizes="100vw" position="right" />
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36">
            <Reveal>
              <p className="eyebrow mb-6 text-sage-300">{steps.eyebrow}</p>
            </Reveal>
            <SplitText as="h2" text={steps.title} className="h2" highlightClassName="italic text-sage-300" />
            <Reveal delay={0.2}>
              <p className="lead mt-8 max-w-[26rem] text-paper/75">{steps.note}</p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10 hidden lg:block">
              <Button href={whatsappHref}>{steps.cta}</Button>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol ref={listRef} className="relative">
            <span aria-hidden className="absolute bottom-0 left-[1.4rem] top-2 w-px bg-paper/15 md:left-[1.9rem]" />
            <motion.span
              aria-hidden
              className="absolute bottom-0 left-[1.4rem] top-2 w-px origin-top bg-sage-300 md:left-[1.9rem]"
              style={{ scaleY: line }}
            />
            {steps.items.map((s, i) => (
              <li key={s.title} className="relative pb-14 pl-16 last:pb-0 md:pl-24">
                <Reveal>
                  <span
                    data-dot
                    className={`absolute left-0 top-0 grid h-[2.8rem] w-[2.8rem] place-items-center rounded-full border text-[0.8rem] tracking-[0.1em] transition-colors duration-500 md:h-[3.8rem] md:w-[3.8rem] md:text-[0.95rem] ${
                      i < reached ? "border-sage-300 bg-sage-300 text-navy" : "border-paper/25 bg-navy text-sage-300"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="font-serif text-[2rem] leading-tight tracking-[-0.01em] md:text-[2.7rem]">{s.title}</h3>
                  <p className="mt-4 max-w-[30rem] leading-[1.7] text-paper/75">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="mt-12 lg:hidden">
            <Button href={whatsappHref}>{steps.cta}</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
