import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-navy px-6 text-center text-paper">
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo/monograma-fundo-escuro.svg" alt="" width={552} height={647} className="mx-auto h-24 w-auto" />
        <p className="eyebrow mt-10 text-sage-300">Erro 404</p>
        <h1 className="mt-4 font-serif text-[clamp(2.4rem,6vw,4rem)] leading-tight">Página não encontrada</h1>
        <p className="mx-auto mt-4 max-w-[26rem] text-paper/70">O endereço pode ter mudado ou não existe mais.</p>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-full bg-sage-600 px-7 py-4 text-[0.74rem] font-medium uppercase tracking-[0.18em] text-paper transition-colors hover:bg-sage"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
