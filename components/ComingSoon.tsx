// Tela "Em breve": só a logo e a mensagem. Usada em app/page.tsx enquanto COMING_SOON (lib/site.ts) for true.
export default function ComingSoon() {
  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden bg-navy px-6 text-center text-paper">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-sage/20 blur-[150px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-sage-300/10 blur-[140px]" />

      <div className="relative flex w-full flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/logo-horizontal-fundo-escuro.svg"
          alt="Juliana Diniz Sustentabilidade"
          width={6256}
          height={1685}
          className="h-auto w-[min(88vw,720px)] animate-fade-up motion-reduce:animate-none"
          fetchPriority="high"
        />
        <span aria-hidden className="mt-12 block h-px w-14 bg-sage-300 md:mt-14" />
        <h1 className="mt-10 font-serif text-[clamp(2.6rem,8vw,5rem)] leading-[1.04] tracking-[-0.025em] [animation-delay:0.25s] animate-fade-up motion-reduce:animate-none">
          Em <span className="italic text-sage-300">breve</span>
        </h1>
        <p className="mt-5 max-w-[26rem] text-[1.02rem] leading-[1.7] text-paper/75 [animation-delay:0.45s] animate-fade-up motion-reduce:animate-none">
          Estamos preparando o novo site.
        </p>
      </div>
    </main>
  );
}
