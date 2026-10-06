"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { faq } from "@/lib/content";
import Reveal from "./Reveal";
import Section, { Placeholder } from "./Section";
import SplitText from "./SplitText";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="perguntas" className="bg-cream">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-36">
            <Reveal>
              <p className="eyebrow mb-6 text-sage">{faq.eyebrow}</p>
            </Reveal>
            <SplitText as="h2" text={faq.title} highlightClassName="text-sage" className="h2" />
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-navy/15">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-b border-navy/15">
                  <Reveal delay={i * 0.05} y={16}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-7 text-left"
                    >
                      <span className="font-serif text-[1.35rem] leading-snug md:text-[1.7rem]">{item.q}</span>
                      <span
                        aria-hidden
                        className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-navy/25 transition-colors duration-300 group-hover:bg-navy"
                      >
                        <span className="absolute h-px w-4 bg-navy" />
                        <span className={`absolute h-4 w-px bg-navy transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="max-w-[38rem] pb-8 leading-[1.75] text-navy/75">
                            <p>{item.a}</p>
                            {item.placeholder && (
                              <p className="mt-4">
                                <Placeholder className="text-sage-600">{item.placeholder}</Placeholder>
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
