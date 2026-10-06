import { marquee } from "@/lib/content";

// Faixa contínua com os temas de atuação (a lista é duplicada para o loop não ter emenda).
export default function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div
      aria-hidden
      className="relative mt-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] md:mt-28"
    >
      <ul className="flex w-max animate-marquee gap-3">
        {items.map((w, i) => (
          <li
            key={`${w}-${i}`}
            className="whitespace-nowrap rounded-full border border-paper/15 px-6 py-3 text-[0.8rem] tracking-wide text-paper/70"
          >
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}
