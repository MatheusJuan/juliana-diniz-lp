"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { nav, whatsappHref, hero } from "@/lib/content";
import { ArrowIcon } from "./Button";
import { openWhatsApp } from "./WhatsAppModal";
import { useReady } from "./Providers";

export default function Header() {
  const ready = useReady();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Some ao rolar para baixo, volta ao rolar para cima.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240 && !open);
  });

  // Marca o link da seção visível.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-sage-300"
        style={{ scaleX: progress }}
      />

      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-5"
        initial={{ y: -140, opacity: 0 }}
        animate={ready ? { y: hidden ? -140 : 0, opacity: 1 } : undefined}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto max-w-[1392px] rounded-[2rem] bg-paper/95 shadow-[0_10px_40px_-12px_rgba(8,26,41,0.45)] backdrop-blur-md">
          <div className="flex items-center justify-between gap-6 px-5 py-3 md:px-8">
            <a href="#inicio" aria-label="Juliana Diniz, início" className="shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo/logo-horizontal-fundo-claro.svg"
                alt="Juliana Diniz Sustentabilidade"
                className="h-9 w-auto md:h-12"
                width={6256}
                height={1685}
              />
            </a>

            <nav aria-label="Principal" className="hidden items-center gap-9 xl:flex">
              {nav.map((n) => {
                const on = active === n.href.slice(1);
                return (
                  <a
                    key={n.href}
                    href={n.href}
                    className="relative whitespace-nowrap py-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-navy/80 transition-colors hover:text-navy"
                  >
                    {n.label}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-sage transition-transform duration-500 ${on ? "scale-x-100" : "scale-x-0"}`}
                    />
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={whatsappHref}
                onClick={openWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden items-center gap-3 whitespace-nowrap rounded-full bg-sage-600 px-6 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-paper transition-colors hover:bg-sage sm:inline-flex"
              >
                {hero.cta}
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button
                type="button"
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="relative grid h-11 w-11 place-items-center rounded-full border border-navy/20 xl:hidden"
              >
                <span className={`absolute h-px w-4 bg-navy transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
                <span className={`absolute h-px w-4 bg-navy transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden xl:hidden"
              >
                <nav aria-label="Menu mobile" className="flex flex-col gap-1 px-5 pb-6 pt-2">
                  {nav.map((n) => (
                    <a
                      key={n.href}
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="border-t border-navy/10 py-4 font-serif text-2xl text-navy"
                    >
                      {n.label}
                    </a>
                  ))}
                  <a
                    href={whatsappHref}
                    onClick={(e) => {
                      setOpen(false);
                      openWhatsApp(e);
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center gap-3 rounded-full bg-sage-600 px-6 py-4 text-[0.74rem] font-medium uppercase tracking-[0.18em] text-paper sm:hidden"
                  >
                    {hero.cta}
                    <ArrowIcon className="h-4 w-4" />
                  </a>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
