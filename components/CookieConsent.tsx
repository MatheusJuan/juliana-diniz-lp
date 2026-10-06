"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "cookie-consent";
const OPEN_EVENT = "cookie-consent:open";
// Sem ID configurado, nada é carregado (o aviso aparece, mas não há rastreamento).
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

type Choice = "accepted" | "declined";
type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };
type ClarityWindow = Window & { clarity?: ClarityFn };

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

// Só é chamado depois do aceite.
function loadClarity() {
  if (!CLARITY_ID || document.getElementById("clarity-script")) return;
  const w = window as ClarityWindow;
  w.clarity =
    w.clarity ||
    function (...args: unknown[]) {
      (w.clarity!.q = w.clarity!.q || []).push(args);
    };
  const s = document.createElement("script");
  s.id = "clarity-script";
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(s);
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    if (choice === "accepted") loadClarity();
    // Espera o preloader sair antes de mostrar o aviso pela primeira vez.
    const t = choice ? undefined : window.setTimeout(() => setOpen(true), 3500);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener(OPEN_EVENT, reopen);
    };
  }, []);

  const choose = (choice: Choice) => {
    try {
      localStorage.setItem(KEY, choice);
    } catch {
      /* navegação privada: vale só nesta visita */
    }
    if (choice === "accepted") loadClarity();
    else (window as ClarityWindow).clarity?.("consent", false);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="Aviso de cookies"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-[200] rounded-[1.5rem] border border-paper/15 bg-navy-950/95 p-5 text-paper shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md md:max-w-[34rem] md:p-6"
        >
          <p className="text-[0.86rem] leading-relaxed text-paper/85">
            Uso cookies de análise (Microsoft Clarity) para entender como o site é usado e melhorá-lo. Só ativo se você aceitar. Saiba mais na{" "}
            <Link href="/politica-de-privacidade" className="font-medium text-paper underline underline-offset-4 hover:text-sage-300">
              política de privacidade
            </Link>
            .
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => choose("declined")}
              className="rounded-full border border-paper/25 px-6 py-2.5 text-[0.8rem] font-medium transition-colors hover:bg-paper/10"
            >
              Recusar
            </button>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="rounded-full bg-cream px-6 py-2.5 text-[0.8rem] font-medium text-navy transition-colors hover:bg-sage-300"
            >
              Aceitar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Reabre o aviso: a LGPD pede que revogar o consentimento seja tão fácil quanto dá-lo.
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      Preferências de cookies
    </button>
  );
}
