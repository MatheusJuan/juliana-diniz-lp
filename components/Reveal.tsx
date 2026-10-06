"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReady } from "./Providers";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Espera o preloader sair antes de animar (use no hero). */
  waitForReady?: boolean;
};

// Entrada padrão dos blocos: sobe e aparece quando entra na tela.
export default function Reveal({ children, className, delay = 0, y = 32, waitForReady = false }: Props) {
  const ready = useReady();
  const props = waitForReady
    ? { animate: ready ? { opacity: 1, y: 0 } : undefined }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
