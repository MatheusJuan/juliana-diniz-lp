"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ElementType } from "react";
import { useReady } from "./Providers";

type Props = {
  /** Use [[trecho]] para marcar palavras em destaque. */
  text: string;
  as?: ElementType;
  className?: string;
  highlightClassName?: string;
  delay?: number;
  stagger?: number;
  by?: "word" | "char";
  /** Espera o preloader sair antes de animar (use no hero). */
  waitForReady?: boolean;
};

type Word = { w: string; hl: boolean };

function parse(text: string): Word[] {
  return text
    .split(/(\[\[.*?\]\])/)
    .filter(Boolean)
    .flatMap((seg) => {
      const hl = seg.startsWith("[[");
      const clean = hl ? seg.slice(2, -2) : seg;
      return clean
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => ({ w, hl }));
    });
}

// Cada palavra/letra sobe de dentro de uma máscara (overflow-hidden): enquanto sobe, fica meio cortada.
export default function SplitText({
  text,
  as: Tag = "span",
  className,
  highlightClassName = "italic text-sage-300",
  delay = 0,
  stagger,
  by = "word",
  waitForReady = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const ready = useReady();
  const go = inView && (!waitForReady || ready);
  const step = stagger ?? (by === "char" ? 0.022 : 0.07);

  const words = parse(text);
  const plain = words.map((x) => x.w).join(" ");
  let i = 0;

  const unit = (content: string, key: string, hl: boolean) => {
    const order = i++;
    return (
      <span
        key={key}
        className="inline-block overflow-hidden align-bottom"
        style={{ padding: "0.16em 0.06em 0.2em", margin: "-0.16em -0.06em -0.2em" }}
      >
        <motion.span
          className={`inline-block will-change-transform ${hl ? highlightClassName : ""}`}
          style={{ transformOrigin: "0% 100%" }}
          initial={{ y: "120%", rotate: 5 }}
          animate={go ? { y: "0%", rotate: 0 } : undefined}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: delay + order * step }}
        >
          {content}
        </motion.span>
      </span>
    );
  };

  return (
    // Uma única cópia do texto no HTML (bom para buscadores). Por palavra, leitores de tela leem normalmente;
    // por letra, o rótulo vai em aria-label e as letras ficam ocultas para eles.
    <Tag ref={ref} className={className} aria-label={by === "char" ? plain : undefined}>
      {words.map(({ w, hl }, wi) => (
        <span key={`${w}-${wi}`} aria-hidden={by === "char" ? true : undefined} className="inline-block whitespace-nowrap">
          {by === "char"
            ? Array.from(w).map((c, ci) => unit(c, `${wi}-${ci}`, hl))
            : unit(w, `${wi}`, hl)}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
