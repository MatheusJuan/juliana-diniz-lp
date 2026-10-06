"use client";

import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { leadForm, WHATSAPP } from "@/lib/content";

const OPEN_EVENT = "whatsapp-modal:open";

// Usado nos links de WhatsApp: abre o pop-up; sem JavaScript o link segue direto para o WhatsApp.
export function openWhatsApp(e?: MouseEvent) {
  e?.preventDefault();
  window.dispatchEvent(new Event(OPEN_EVENT));
}

const field =
  "w-full rounded-full border border-paper/15 bg-paper/[0.06] px-5 py-4 text-[0.92rem] text-paper outline-none transition-colors placeholder:text-paper/45 focus:border-sage-300 [color-scheme:dark]";

// A lista nativa do seletor ignora o fundo do campo: precisa de cor própria nas opções.
const opt = "bg-navy-950 text-paper";

// Seta do seletor (appearance-none remove a nativa).
const caret = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fcfdfd' stroke-opacity='.6' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
};

export default function WhatsAppModal() {
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  // Enquanto aberto: trava o scroll, foca o nome, fecha com Esc, segura o Tab dentro do pop-up e devolve o foco ao fechar.
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    lenis?.stop();
    nameRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !dialogRef.current) return;
      const f = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button, input, select");
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lenis?.start();
      prev?.focus?.();
    };
  }, [open, lenis]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const topic = leadForm.topics[Number(data.get("topic"))];
    const source = leadForm.sources[Number(data.get("source"))];
    if (!name || !topic || !source) return;
    const how = source.how[0].toUpperCase() + source.how.slice(1);
    const text = `Olá, Juliana! Meu nome é ${name}. ${how} e quero saber mais sobre ${topic.about}.`;
    window.open(`https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[300] grid place-items-center overflow-y-auto bg-navy-950/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="wa-title"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid w-full max-w-[60rem] overflow-hidden rounded-[1.75rem] border border-paper/10 bg-navy-950 text-paper shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] md:grid-cols-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-mobile.webp" alt="" className="hidden h-full w-full object-cover object-[50%_55%] md:block" />

            <div className="relative p-7 md:p-12">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full text-paper/80 transition-colors hover:bg-paper/10 hover:text-paper"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <p className="eyebrow inline-block rounded-full border border-paper/40 px-4 py-2 text-[0.62rem] text-paper/90">{leadForm.eyebrow}</p>
              <h2 id="wa-title" className="mt-6 font-serif text-[clamp(2rem,3.6vw,2.9rem)] leading-[1.05] tracking-[-0.02em]">
                {leadForm.title}
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/70">{leadForm.lead}</p>

              <form onSubmit={submit} className="mt-7 space-y-3">
                <input
                  ref={nameRef}
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="given-name"
                  placeholder="Seu nome"
                  aria-label="Seu nome"
                  className={field}
                />
                <select name="topic" required defaultValue="" aria-label="Sobre o que você quer falar" className={`${field} appearance-none bg-[length:1.1rem] bg-[position:right_1.1rem_center] bg-no-repeat`} style={caret}>
                  <option value="" disabled className={opt}>
                    Sobre o que você quer falar
                  </option>
                  {leadForm.topics.map((t, i) => (
                    <option key={t.label} value={i} className={opt}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <select name="source" required defaultValue="" aria-label="Como você conheceu a Juliana" className={`${field} appearance-none bg-[length:1.1rem] bg-[position:right_1.1rem_center] bg-no-repeat`} style={caret}>
                  <option value="" disabled className={opt}>
                    Como você conheceu a Juliana
                  </option>
                  {leadForm.sources.map((s, i) => (
                    <option key={s.label} value={i} className={opt}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-cream px-8 py-4 text-[0.74rem] font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:bg-sage-300 sm:w-auto"
                >
                  {leadForm.submit}
                </button>
              </form>

              <p className="mt-5 max-w-[26rem] text-[0.72rem] leading-relaxed text-paper/50">
                {leadForm.note}{" "}
                <Link href="/politica-de-privacidade" target="_blank" className="underline underline-offset-4 hover:text-sage-300">
                  Política de privacidade
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
