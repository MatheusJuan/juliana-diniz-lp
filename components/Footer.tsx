import Link from "next/link";
import { footer, LINKEDIN, nav } from "@/lib/content";
import { CookieSettingsButton } from "./CookieConsent";
import { Placeholder } from "./Section";

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 text-paper">
      <div className="mx-auto grid max-w-[1320px] gap-12 border-t border-paper/10 px-6 py-16 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/logo-horizontal-fundo-escuro.svg"
            alt="Juliana Diniz Sustentabilidade"
            width={6256}
            height={1685}
            className="h-12 w-auto"
          />
          <p className="mt-6 max-w-[22rem] font-serif text-[1.35rem] leading-snug text-paper/80">{footer.tagline}</p>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <p className="eyebrow mb-5 text-sage-300">Navegação</p>
          <ul className="space-y-3 text-[0.95rem] text-paper/80">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-sage-300">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow mb-5 text-sage-300">Contato</p>
          <ul className="flex flex-wrap gap-2 text-sage-300">
            <li>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-sage-300/60 px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] transition-colors hover:bg-sage-300 hover:text-navy"
              >
                LinkedIn ↗
              </a>
            </li>
            {footer.placeholders.map((p) => (
              <li key={p}>
                <Placeholder>{p}</Placeholder>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 px-6 py-6 text-center text-[0.75rem] tracking-wide text-paper/50 md:px-12">
        <p className="mb-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/politica-de-privacidade" className="underline decoration-sage-300/50 underline-offset-4 transition-colors hover:text-sage-300">
            Política de privacidade
          </Link>
          <CookieSettingsButton className="underline decoration-sage-300/50 underline-offset-4 transition-colors hover:text-sage-300" />
        </p>
        {footer.copyright} - Feito com <span aria-label="amor">❤</span> por{" "}
        <a
          href="https://www.matheusjuan.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-sage-300/50 underline-offset-4 transition-colors hover:text-sage-300"
        >
          Matheus Juan
        </a>
      </div>
    </footer>
  );
}
