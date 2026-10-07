"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const MIN_MS = 1100;
const EASE = [0.76, 0, 0.24, 1] as const;

export default function Preloader({ onExit }: { onExit: () => void }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = "hidden";
    let cancelled = false;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const hero = new Image();
    hero.src = wide ? "/images/hero-desktop.webp" : "/images/hero-mobile.webp";

    // Só sai quando fontes e imagem do hero estão prontas (e o logo teve tempo de aparecer).
    Promise.all([
      document.fonts.ready,
      hero.decode().catch(() => undefined),
      new Promise((resolve) => setTimeout(resolve, reduced ? 0 : MIN_MS)),
    ]).then(() => {
      if (cancelled) return;
      html.style.overflow = "";
      setDone(true);
      onExit();
    });

    return () => {
      cancelled = true;
      html.style.overflow = "";
    };
  }, [onExit]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: EASE } }}
        >
          <motion.div exit={{ opacity: 0, y: -40, transition: { duration: 0.5 } }} className="flex flex-col items-center">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0, scale: 0.94 }}
              animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1, scale: 1 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo/monograma-fundo-escuro.svg"
                alt=""
                className="h-36 w-auto md:h-48"
                width={552}
                height={647}
              />
            </motion.div>

            <div className="mt-10 h-px w-40 overflow-hidden bg-paper/15">
              <motion.div
                className="h-full origin-left bg-sage-300"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: MIN_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
