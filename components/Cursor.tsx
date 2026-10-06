"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

const QUERY = "(hover: hover) and (pointer: fine)";
// Campos de formulário ficam fora: a lente grande taparia o texto digitado.
const INTERACTIVE = "a, button, summary, [role='button']";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

// Só aparece com mouse (ponteiro fino); em celular/tablet segue o toque normal.
const useFinePointer = () =>
  useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);

type Mode = "idle" | "link" | "down";

// Contorno marinho dos dois lados da linha sálvia: o cursor lê bem sobre fundo escuro, areia ou foto.
const RING_SHADOW = "0 0 0 1.5px rgba(8,26,41,0.7), inset 0 0 0 1.5px rgba(8,26,41,0.7), 0 6px 28px rgba(8,26,41,0.28)";

/**
 * Cursor customizado nas cores da marca: ponto exato + anel que segue com mola. Sobre links e botões o anel
 * cresce e vira uma lente sálvia com seta; ao clicar, encolhe.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.6 });
  const [mode, setMode] = useState<Mode>("idle");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!fine) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    let overLink = false;
    let pressed = false;
    let last: EventTarget | null = null;
    const sync = () => setMode(pressed ? "down" : overLink ? "link" : "idle");

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setShown(true);
      if (pressed && e.buttons === 0) {
        pressed = false; // soltou o botão fora da janela
        sync();
      }
      if (e.target !== last) {
        last = e.target;
        overLink = !!(e.target as Element | null)?.closest?.(INTERACTIVE);
        sync();
      }
    };
    const down = () => {
      pressed = true;
      sync();
    };
    const up = () => {
      pressed = false;
      sync();
    };
    const leave = () => setShown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    root.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      root.removeEventListener("pointerleave", leave);
    };
  }, [fine, x, y]);

  if (!fine) return null;

  const link = mode === "link";
  const pressed = mode === "down";
  return (
    <>
      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[9999]" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="relative -ml-[1.75rem] -mt-[1.75rem] grid h-[3.5rem] w-[3.5rem] place-items-center"
          initial={false}
          animate={{ opacity: shown ? 1 : 0 }}
        >
          <motion.span
            className="absolute inset-0 h-full w-full rounded-full border-2 border-sage-300"
            initial={false}
            animate={{
              scale: link ? 1.9 : pressed ? 0.78 : 1,
              backgroundColor: link ? "rgba(169,189,175,0.94)" : "rgba(169,189,175,0)",
            }}
            style={{ boxShadow: RING_SHADOW }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
          />
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#081a29"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative h-[1.5rem] w-[1.5rem]"
            initial={false}
            animate={{ opacity: link ? 1 : 0, scale: link ? 1 : 0.4, rotate: link ? 0 : -45 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </motion.svg>
        </motion.div>
      </motion.div>

      <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[9999]" style={{ x, y }}>
        <motion.div
          className="-ml-[0.35rem] -mt-[0.35rem] h-[0.7rem] w-[0.7rem] rounded-full bg-sage-300"
          style={{ boxShadow: "0 0 0 2px #081a29" }}
          initial={false}
          animate={{ scale: link ? 0 : pressed ? 1.8 : 1, opacity: shown ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </>
  );
}
